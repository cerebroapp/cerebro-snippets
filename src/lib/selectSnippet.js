const fs = require('fs');
const path = require('path');
const preview = require('./preview');
const searchSnippet = require('./searchSnippet');

module.exports = (dir, query, actions) => {
    // get snippets & their content
    let snippets = searchSnippet(dir, query, actions);
    let fileContent = snippets.reduce((obj, item) => {
        obj[item] = fs.readFileSync(path.join(dir, item), 'utf8');
        return obj;
    }, {});

    return snippets.map(name => ({
        title: name,
        subtitle: 'copy content to clipboard',
        term: 'snip',
        clipboard: fileContent[name],
        onSelect: (ev) => actions.copyToClipboard(fileContent[name]),
        getPreview: () => preview(fileContent[name], (name.includes('.') ? name.split('.').pop() : 'nohighlight'))
    }));
}