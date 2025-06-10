#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { hash, verify } from '../src/index.js';
const [, , cmd, ...args] = process.argv;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const saltsPath = join(__dirname, '..', 'salts', 'current.json');
let salts = {};
try {
    salts = JSON.parse(readFileSync(saltsPath, 'utf8'));
}
catch {
    console.error('Salts file not found. Run "npm run rotate" first.');
    process.exit(1);
}
function dayOfYear(d) {
    return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(d.getFullYear(), 0, 0)) / 86400000);
}
switch (cmd) {
    case 'hash': {
        const email = args[0];
        if (!email) {
            console.error('Usage: uid2 hash <email>');
            process.exit(1);
        }
        const bucket = dayOfYear(new Date()).toString();
        const salt = salts[bucket];
        if (!salt) {
            console.error(`No salt for bucket ${bucket}`);
            process.exit(1);
        }
        console.log(hash(email, salt));
        break;
    }
    case 'verify': {
        const email = args[0];
        const uid = args[1];
        if (!email || !uid) {
            console.error('Usage: uid2 verify <email> <uid2>');
            process.exit(1);
        }
        const saltValues = Object.values(salts);
        console.log(verify(email, uid, saltValues) ? 'OK' : 'KO');
        break;
    }
    case 'rotate': {
        const buckets = args[0] || '1000000';
        // eslint-disable-next-line global-require, import/no-dynamic-require
        await import('../src/generateSalts.js').then((m) => m.default?.(Number.parseInt(buckets, 10))).catch(() => { });
        break;
    }
    default:
        console.log('Usage: uid2 <hash|verify|rotate> ...');
        process.exit(1);
}
