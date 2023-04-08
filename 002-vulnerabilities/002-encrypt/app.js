import { 
    constants, 
    generateKeyPair, 
    publicEncrypt,
    publicDecrypt,
    privateDecrypt,
    privateEncrypt,
    randomUUID,
    createHash
} from 'node:crypto';
import express from 'express';
import * as url from 'url';
import { join } from 'node:path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(join(__dirname, 'public')));

export const page = (view, data = {}) =>
  (req, res) => res.render(view, data);


let keys = new Map();

app.get('/asymetric', page('index'));

app.get('/asymetric/genkey', (req, res) => {
    const keyType = req.query.type;
    const keyName = req.query.keyName || randomUUID();
    const modulusLength = parseInt(req.query.modulus||'4096');
    const validKeyTypes = [
        'rsa', 
        'ed25519', 
        'x25519',
        'dsa', 
        'ed448',
        'x448'
    ];
    if(!validKeyTypes.includes(keyType)) {
        res.status(400)
            .end(`Key type ${keyType} not in ${validKeyTypes.toString()}
            Inform it with the query param: "?type"
            `);
        return;
    }
    const options = { 
        modulusLength, 
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret'
        } 
    };
    generateKeyPair(keyType, options, (err, publicKey, privateKey) => {
        if(err) return res.status(500).send(err.message);
        const response = {publicKey, keyName};
        keys.set(`privateKey:${keyName}`, privateKey);
        keys.set(`publicKey:${keyName}`, publicKey);
        res.render('index', response);
    });
});

app.post('/asymetric/private-decrypt', (req, res) => {
    const decripted = privateDecrypt(
        {
            key: keys.get(`privateKey:${req.body.keyName}`),
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
            passphrase: 'top secret'
        }, 
        Buffer.from(req.body.text, 'base64')
    );
    const message = decripted.toString('utf8');

    console.log(`Here goes the message: ${message}`);

    res.render('index', {
        publicKey: keys.get(`publicKey:${req.body.keyName}`),
        keyName: req.body.keyName,
        decripted: message
    });
});

app.get('/simetric/hash', page('simetric'));

app.post('/simetric/hash', (req, res) => {
    const data = createHash('sha256')
        .update(req.body.text)
        .digest('base64');
    res.render('simetric', { encripted: data });
});

app.listen(8080, '0.0.0.0', () => {
    console.log('Encription service running on port: 8080');
});
