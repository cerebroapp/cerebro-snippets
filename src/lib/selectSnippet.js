import fs from 'fs';
import path from 'path';
import Preview from './preview';
import searchSnippet from './searchSnippet';

export default (dir, query, actions) => {
    let snippets = searchSnippet(dir, query, actions);
    let fileContent = snippets.reduce((obj, item) => {
        obj[item] = fs.readFileSync(path.join(dir, item), 'utf8');
        return obj;
    }, {});

    return snippets.map((name) => {
        const previewHighlight = name.includes('.') ? name.split('.').pop() : 'nohighlight';
        const previewContent = fileContent[name] || '';

        return {
            title: name,
            subtitle: 'copy content to clipboard',
            term: 'snip',
            clipboard: previewContent,
            onSelect: () => actions.copyToClipboard(previewContent),
            getPreview: () => (
                <Preview highlight={ previewHighlight } content={ previewContent } />
            ),
        }
    });
}