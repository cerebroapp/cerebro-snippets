import fs from 'fs';
const { search } = require('cerebro-tools');

export default (dir, query) => {
    let snippets = fs.readdirSync(dir, 'utf8');

    // remove .gitkeep from array
    let index = snippets.findIndex(file => file === '.gitkeep');
    snippets = [
        ...snippets.slice(0, index),
        ...snippets.slice(index + 1)
    ];

    // return first 5 results
    let matchedFiles = search(snippets, query);
    return matchedFiles.slice(0, 5);
}