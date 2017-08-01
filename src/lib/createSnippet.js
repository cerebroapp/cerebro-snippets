const { clipboard } = require('electron');
const fs = require('fs');

module.exports = (dir, name) => {
    let title = `Create snippet called "${name}"`;
    let error = `Snippet name can't be empty`;

    return [{
        title: name == '' ? error : title,
        subtitle: 'save clipboard content in snippet',
        term: 'snipc',
        onSelect: () => {
            if (name != '') {
                // create snippet file
                fs.writeFile(`${dir}${name}`, clipboard.readText(), err => {
                    console.log(err);
                });
            }
        }
    }];
}