// runs on plugin start --> Create snippets dir so it can be used
import { app } from '@electron/remote';
import fs from 'fs';
import path from 'path';

const snippetsDir = path.join(app.getPath('userData'), 'plugins', 'node_modules', 'cerebro-snippets', 'snippets');

export default () => {
    if (!fs.existsSync(snippetsDir)) {
        fs.mkdirSync(snippetsDir);
    }
}