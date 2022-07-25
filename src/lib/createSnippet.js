import { clipboard } from 'electron';
import fs from 'fs';
import path from 'path';

export default (dir, name) => {
    let title = `Create snippet called "${name}"`;
    let error = `Snippet name can't be empty`;

    return [{
        title: name === '' ? error : title,
        subtitle: 'save clipboard content in snippet',
        term: 'snipc',
        onSelect: () => {
            if (!name) {
                return;
            }

            fs.writeFile(path.join(dir, name), clipboard.readText(), err => {
                console.log(err);
            });
        }
    }];
}