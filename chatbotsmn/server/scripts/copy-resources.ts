import * as shell from 'shelljs';
import * as fs from 'fs';
import * as path from 'path';

let out = 'dist';
createFolderIfNotExist(out);

out = path.join(out, 'config');

createFolderIfNotExist(out);

shell.cp('-R', 'src/config/*.yml', 'dist/config');

const clientDist = path.join(__dirname, '..', '..', 'target', 'classes');

if (fs.existsSync(clientDist)) {
  shell.cp('-R', clientDist, out);
}

function createFolderIfNotExist(outDir: string): void {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
}
