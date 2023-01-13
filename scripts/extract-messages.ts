import fs from 'fs';
import path from 'path';

const duplicateKeys: string[] = [];

const extractMessages = (dirPath: string, extractedMessages: { [key: string]: string } | undefined = {}) => {
    const files = fs.readdirSync(dirPath);

    files.forEach(function (file) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            extractedMessages = extractMessages(dirPath + '/' + file, extractedMessages);
        }

        if (file.endsWith('intl.ts')) {
            const { messages } = require(path.join('../', dirPath, '/', file));

            if (messages) {
                Object.getOwnPropertyNames(messages).forEach(key => {
                    const msg = messages[key];

                    if (!msg.id || !msg.defaultMessage) {
                        throw 'No id or defaultMessage found in message!';
                    }

                    if (extractedMessages[msg.id]) {
                        duplicateKeys.push(msg.id);
                    }

                    extractedMessages[msg.id] = msg.defaultMessage;
                });
            }
        }
    });

    return extractedMessages;
};

const sortKeys = (messages: { [key: string]: string }) =>
    Object.keys(messages)
        .sort()
        .reduce((obj: { [key: string]: string }, key) => {
            obj[key] = messages[key];
            return obj;
        }, {});

console.debug('Extracting messages...');
const messages = extractMessages('src');
const orderedMessages = sortKeys(messages);

if (duplicateKeys.length) {
    throw `Duplicate keys found: ${JSON.stringify(duplicateKeys)}`;
}

fs.writeFile('./src/i18n/en.json', JSON.stringify(orderedMessages, null, '\t'), 'utf8', err => {
    if (err) {
        throw err;
    }
    console.debug('Messages extracted!');
});
