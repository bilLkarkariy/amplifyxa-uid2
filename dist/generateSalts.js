import { randomBytes } from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function base64url(buf) {
    return buf.toString('base64url');
}
function generateSalts(count) {
    const map = {};
    for (let i = 0; i < count; i += 1) {
        const salt = base64url(randomBytes(32));
        map[i.toString()] = salt;
    }
    return map;
}
const bucketCount = process.argv[2] ? Number.parseInt(process.argv[2], 10) : 365; // default smaller for dev
if (Number.isNaN(bucketCount) || bucketCount <= 0) {
    throw new Error('Invalid bucket count');
}
const salts = generateSalts(bucketCount);
const targetDir = join(__dirname, '..', 'salts');
const targetPath = join(targetDir, 'current.json');
mkdirSync(targetDir, { recursive: true });
writeFileSync(targetPath, JSON.stringify(salts, null, 2));
console.log(`Generated ${bucketCount} salts -> ${targetPath}`);
