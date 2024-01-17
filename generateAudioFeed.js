const fs = require('fs');
const yaml = require('js-yaml');
const xml2js = require('xml2js');
const crypto = require('crypto');
const https = require('https');
const {URL} = require('url');

const basepath = './static/sfs';

function convertToPubDateFormat(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Berlin'
    };
    return date.toLocaleDateString('en-GB', options) + ' +MEZ';
}

function toHash(string) {
    const hash = crypto.createHash('sha256');
    hash.update(string);
    return hash.digest('hex');
}

async function yamlObjectToXml(yamlObject) {
    const url = new URL(yamlObject.url);
    const options = {
        method: 'HEAD',
        host: url.hostname,
        path: url.pathname,
    };

    const getFileSize = new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            console.log('status', res.statusCode + ' ' + options.host + options.path);
            resolve(res.headers['content-length']);
        });
        req.on('error', reject);
        req.end();
    });

    const fileSize = await getFileSize;

    return {
        'title': yamlObject.title,
        'pubDate': convertToPubDateFormat(yamlObject.date),
        'guid': {
            _: toHash(yamlObject.url),
            $: {isPermaLink: 'false'},
        },
        'itunes:image': {
            $: {
                href: yamlObject.image ?? 'https://lucanerlich.com/images/avatar-ln.png',
            },
        },
        'description': yamlObject.description,
        'author': 'spam@spam.de',
        'itunes:explicit': 'false',
        'itunes:duration': yamlObject.seconds,
        'link': 'https://lucanerlich.com',
        'enclosure': {
            $: {
                url: yamlObject.url,
                length: fileSize,
                type: 'audio/mpeg',
            },
        },
    };
}

async function insertItemsToXMLFile(xmlFilePath, yamlObjects) {
    const data = fs.readFileSync(xmlFilePath);

    xml2js.parseString(data, async (err, result) => {
        if (err) {
            console.error(err);
            return;
        }

        result.rss.channel[0]['pubDate'] = convertToPubDateFormat(new Date().toDateString())
        result.rss.channel[0].item = await Promise.all(yamlObjects.map(yamlObjectToXml));

        const builder = new xml2js.Builder({
            renderOpts: {'pretty': true, 'indent': '    ', 'newline': '\n'},
            cdata: true
        });
        const xml = builder.buildObject(result);

        fs.writeFileSync(basepath + '.xml', xml);
    });
}

console.log('Creating audiofeed.xml');
const yamlData = fs.readFileSync(basepath + '.yaml', 'utf8');
const yamlObjects = yaml.load(yamlData);
insertItemsToXMLFile('./templates/rss-channel.xml', yamlObjects)
    .then(success => console.log('Successfully created audiofeed.xml'))
    .catch(error => console.error('Failed to generate audiofeed.xml', error));
