// runs on plugin start --> Create snippets dir so it can be used
const remote = require('@electron/remote');
const fs = require('fs');
const path = require('path');

const snippetsDir = path.join(remote.app.getPath('userData'), 'plugins', 'node_modules', 'cerebro-snippets', 'snippets');

module.exports = () => {
    if (!fs.existsSync(snippetsDir)) {
        fs.mkdirSync(snippetsDir);
    }
}