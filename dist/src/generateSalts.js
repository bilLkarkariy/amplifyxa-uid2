import { randomBytes } from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function base64url(buf) {
    return buf.toString('base64url');
}
export function generateSaltsMap(count) {
    const map = {};
    for (let i = 0; i < count; i += 1) {
        const salt = base64url(randomBytes(32));
        map[i.toString()] = salt;
    }
    return map;
}
export function run(bucketCount = 365) {
    if (Number.isNaN(bucketCount) || bucketCount <= 0)
        throw new Error('Invalid bucket count');
    const salts = generateSaltsMap(bucketCount);
    const targetDir = join(__dirname, '..', 'salts');
    const targetPath = join(targetDir, 'current.json');
    mkdirSync(targetDir, { recursive: true });
    writeFileSync(targetPath, JSON.stringify(salts, null, 2));
    // eslint-disable-next-line no-console
    console.log(`Generated ${bucketCount} salts -> ${targetPath}`);
}
export default run;
// If executed directly via "node generateSalts.js [count]", run immediately
if (import.meta.url === `file://${process.argv[1]}`) {
    const arg = process.argv[2] ? Number.parseInt(process.argv[2], 10) : 365;
    run(arg);
}
