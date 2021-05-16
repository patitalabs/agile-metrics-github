import {Utils} from "../metrics/Utils";


export class AppConfig  {
 static port() {
     return process.env.PORT || 3000;
 }

 static isProduction() {
    return process.env.NODE_ENV === 'production';
 }

 static githubToken() {
     Utils.checkEnvVar('GITHUB_TOKEN');
     return process.env.GITHUB_TOKEN
 }

 static coreMetricsUrl() {
     Utils.checkEnvVar('CORE_METRICS_URL');
     return process.env.CORE_METRICS_URL
 }
}