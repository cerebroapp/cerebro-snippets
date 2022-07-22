const fs = require('fs');
const path = require('path');
const searchSnippet = require('./searchSnippet');
const icon = require('../icons/deleteIcon.png');

module.exports = (dir, query) => {
    // get snippets
    let snippets = searchSnippet(dir, query);

    return snippets.map(name => ({
        title: `Delete snippet "${name}"`,
        icon: icon,
        term: 'snipd',
        onSelect: () => fs.unlinkSync(path.join(dir, name))
    }));
}