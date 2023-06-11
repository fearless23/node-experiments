import { async_helper } from './async_helper';
import { global_async_hook } from '../helpers/asyncContext';

export const async_test = async (method, output) => {
  const logger = global_async_hook.logger2();
  const event = global_async_hook.event();
  logger.append_child({ someotherProperty: 'Whose value is a large value' });
  // const context = global_async_hook.context();
  // const event = global_async_hook.event();
  logger.debug(event, 'EVENT');
  logger.debug('this is a debug');
  // throw new Error('hi');
  const helper = await async_helper({ handler_data: 'passing to nested' });
  output.helper = helper;
  output.event = event;
};
