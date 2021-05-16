import app from './app';
import { Logger } from '../metrics/Logger';

const server = app.listen(app.get('port'), () => {
  Logger.info(
    `  App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  );
  Logger.info('  Press CTRL-C to stop\n');
});

export default server;
