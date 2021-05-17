import * as express from 'express';
import { MetricsController } from '../api/MetricsController';
import { AppConfig } from './AppConfig';

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.post('/utils/', MetricsController.postMetrics);
app.put('/utils/', MetricsController.updateMetrics);

app.set('port', AppConfig.port());

export default app;
