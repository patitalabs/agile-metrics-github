import * as express from 'express';
import { MetricsController } from './MetricsController';
import { AppConfig } from '../config/AppConfig';

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.post('/metrics/', MetricsController.postMetrics);
app.put('/metrics/', MetricsController.updateMetrics);

app.set('port', AppConfig.port());

export default app;
