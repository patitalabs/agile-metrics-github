import * as axios from 'axios';
import * as https from 'https';
import * as http from 'http';

const httpsAgent = new https.Agent({ keepAlive: true });
const httpAgent = new http.Agent({ keepAlive: true });

export class CoreMetricsClient {
    private readonly host: string;

    constructor({ host }) {
        this.host = host;
    }

    async publish(entries:any, shouldReplaceEntries = false): Promise<any> {
        const fullUrl = `${this.host}/metrics/entries/`;

        const response = await axios.default({
            headers: { 'Content-Type': 'application/json' },
            method: shouldReplaceEntries? 'put':'post',
            url: fullUrl,
            data: {
                entries: entries
            },
            httpsAgent,
            httpAgent,
        });

        const json = response.data;
        if (json.errors) {
            throw new Error(...json.errors);
        }
        return json;
    }
}
