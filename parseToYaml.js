const fs = require('fs');
const xml2js = require('xml2js');
const jsYaml = require('js-yaml');

const basepath = './static/sfs';

fs.readFile(basepath + '.xml', 'utf8', function (err, data) {
    if (err) {
        return console.log('Failed to read file: ' + err);
    }
    xml2js.parseString(data, function (err, result) {
        if (err) {
            return console.log('Failed to parse XML: ' + err);
        }

        let items = result.rss.channel[0].item;

        // clean up items
        items = items?.map(item => {
            let cleanedItem = {};
            for (let key in item) {
                switch (key) {
                    case 'itunes:image':
                        cleanedItem['image'] = item[key][0]['$']['href'];
                        break;
                    case 'enclosure':
                        cleanedItem['url'] = item[key][0]['$']['url'];
                        break;
                    case 'guid':
                    case 'author':
                    case 'itunes:author':
                    case 'itunes:episodeType':
                    case 'itunes:summary':
                    case 'content:encoded':
                        // ignore
                        break;
                    case 'itunes:duration':
                        cleanedItem['seconds'] = convertToSeconds(item[key][0]);
                        break;
                    case 'pubDate':
                        cleanedItem['date'] = convertToDate(item[key]);
                        break;
                    case 'description':
                        cleanedItem[key] = item[key][0].replace(/(\r\n|\r|\n)/g, '\n');
                        break;
                    default:
                        cleanedItem[key] = item[key][0];
                }
            }
            return cleanedItem;
        });

        let yamlStr = jsYaml.dump(items, {lineWidth: -1});
        fs.writeFile(basepath + '.yaml', yamlStr, 'utf8', function (err) {
            if (err) {
                return console.log('Failed to create YAML file: ' + err);
            }
            console.log('Converted XML to YAML successfully!');
        });
    });
});

function convertToDate(pubDateString) {
    const date = new Date(pubDateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    const hour = ('0' + date.getUTCHours()).slice(-2);
    const minute = ('0' + date.getUTCMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hour}:${minute}`;
}

function convertToSeconds(time) {
    if (time.includes(':')) {
        const splitTime = time.split(':');
        const hours = +splitTime[0];
        const minutes = +splitTime[1];
        const seconds = +splitTime[2];
        return hours * 3600 + minutes * 60 + seconds;
    } else if (isNaN(time)) { // Is not a number
        console.error('Invalid input');
        return 0;
    } else {
        return +time;
    }
}
