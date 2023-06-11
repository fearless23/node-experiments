import { AsyncLocalStorage } from 'async_hooks';

export const asyncHookContext = new AsyncLocalStorage();

class GlobalAsyncHook {
  initialize (aws_context, lambda_event) {
    this.aws_context = aws_context;
    this.lambda_event = lambda_event;
  }

  get (key) {
    // this store is the store, when using asyncHookContext.run(store, callback)
    return new Proxy(this.aws_context._logger, {
      get (target, property, receiver) {
        const store = asyncHookContext.getStore();
        const i = store && store.get(key);
        target = i || target;
        return Reflect.get(target, property, receiver);
      },
    });
  }

  set (key, value) {
    const store = asyncHookContext.getStore();
    store && store.set(key, value);
  }

  get2 (key) {
    const store = asyncHookContext.getStore();
    const i = store && store.get(key);
    return i || this.aws_context._logger;
  }

  logger () {
    return new Proxy(this.aws_context._logger, {
      get (target, property, receiver) {
        const store = asyncHookContext.getStore();
        const i = store && store.get('logger');
        target = i || target;
        return Reflect.get(target, property, receiver);
      },
    });
  }

  event () {
    return new Proxy(this.lambda_event, {
      get (target, property, receiver) {
        const store = asyncHookContext.getStore();
        const i = store && store.get('event');
        target = i || target;
        return Reflect.get(target, property, receiver);
      },
    });
  }

  logger2 () {
    const store = asyncHookContext.getStore();
    const i = store && store.get('logger');
    return i || this.aws_context._logger;
  }

  context () {
    return new Proxy(this.aws_context, {
      get (target, property, receiver) {
        const store = asyncHookContext.getStore();
        const i = store && store.get('context');
        target = i || target;
        return Reflect.get(target, property, receiver);
      },
    });
  }
}

export const global_async_hook = new GlobalAsyncHook();

export const wrapper = (handler, options = {}) => (context, event) => {
  // this should be once, but for test doing it multiple times
  global_async_hook.initialize(context, event);
  const method = handler.name;
  const logger = context._logger.new_child({ method });
  const store = new Map();
  store.set('logger', logger);
  store.set('context', context);
  store.set('event', event);

  return asyncHookContext.run(store, async () => {
    const output = { };
    try {
      logger.debug(event, 'async_test');
      await handler(method, output);
    } catch (error) {
      logger.error(error, method);
      output.error = error.message;
    }
    return output;
  });
};
