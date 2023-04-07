import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';
import app from './app.js';

const httpServer = http.createServer(app);

const options = {
    key: readFileSync('./key.pem'),
    cert: readFileSync('./cert.pem')
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(8443, '0.0.0.0', () => {
    console.log('Secure app listening at https://0.0.0.0:8443');
});
httpServer.listen(8080, '0.0.0.0', () => {
    console.log('App listening at http://0.0.0.0:8080');
});
