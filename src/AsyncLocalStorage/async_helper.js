import { helpers } from '../helpers';
import { global_async_hook } from '../helpers/asyncContext';

const chat_user_operations = helpers.getstreamio.chat_operations.user;

export const async_helper = async (data) => {
  const method = async_helper.name;
  const logger = global_async_hook.logger2();
  // const event = global_async_hook.event();
  logger.append_child({ helper: 'async_helper' });
  const output = { success: true, data };
  try {
    logger.debug('NESTED ASYNC HELPER');
    const random = Math.random() > 0.6;
    if (random) throw new Error('randomly error');
    const stats = await chat_user_operations.get(logger, {}, 1);
    logger.info({ stats: stats.length }, 'STATS');
    output.stats = stats;
  } catch (error) {
    logger.error(error, method);
    output.error = error.message;
    output.success = false;
  }

  return output;
};
