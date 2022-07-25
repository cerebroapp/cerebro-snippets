import fs from 'fs';
import path from 'path';
import icon from '../icons/deleteIcon.png';
import searchSnippet from './searchSnippet';

export default (dir, query) => {
    let snippets = searchSnippet(dir, query);

    return snippets.map(name => ({
        title: `Delete snippet "${name}"`,
        icon: icon,
        term: 'snipd',
        onSelect: () => fs.unlinkSync(path.join(dir, name))
    }));
}