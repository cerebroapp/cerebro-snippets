import { app } from '@electron/remote';
import path from 'path';

const snippetsDir = path.join(app.getPath('userData'), 'plugins', 'node_modules', 'cerebro-snippets', 'snippets');
import icon from './icons/icon.png';
import deleteIcon from './icons/deleteIcon.png';

import initialize from './lib/initialize';
import selectSnippet from './lib/selectSnippet';
import createSnippet from './lib/createSnippet';
import deleteSnippet from './lib/deleteSnippet';

const plugin = ({ term, display, actions, settings }) => {
    let results = [];

    // split term into command and param
    let command = term.split(' ')[0];
    let param = term.split(' ')[1] || '';

    // list of available commands
    let commands = [
        {
            title: 'Create snippet',
            subtitle: 'from clipboard content',
            term: 'snipc',
            icon: icon,
            onSelect: (ev) => {
                ev.preventDefault();
                actions.replaceTerm('snipc ');
            }
        },
        {
            title: 'Search snippets',
            term: 'snip',
            icon: icon,
            onSelect: (ev) => {
                ev.preventDefault();
                actions.replaceTerm('snip ');
            }
        },
        {
            title: 'Delete snippets',
            term: 'snipd',
            icon: deleteIcon,
            onSelect: (ev) => {
                ev.preventDefault();
                actions.replaceTerm('snipd ');
            }
        }
    ];

    // handle different commands
    switch (command) {
        case 'snip':
            results = selectSnippet(snippetsDir, param, actions);
            break;
        case 'snipc':
            results = createSnippet(snippetsDir, param);
            break;
        case 'snipd':
            results = deleteSnippet(snippetsDir, param);
            break;
    }

    // search without keyword "snip"
    if (settings.disableSearchKeyword && param === '') {
        results = selectSnippet(snippetsDir, command, actions);
    }

    // add autocomplete for possible commands
    results = [
        ...results,
        ...commands.filter(item => (command !== item.term && item.term.indexOf(command) !== -1))
    ];

    // display results
    if (results.length > 0) {
        // add icon to results
        results.map(obj => {
            if (!obj.icon) {
                obj.icon = icon
            }
        });

        display(results);
    }
}

export default {
    initialize,
    fn: plugin,
    icon: icon,
    settings: {
        disableSearchKeyword: {
            type: "bool",
            label: 'Search without keyword "snip"',
            defaultValue: false,
        }
    }
};