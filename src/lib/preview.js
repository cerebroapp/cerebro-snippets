require('../styles/preview.css');
require('!!style-loader!css-loader!../../node_modules/highlight.js/styles/solarized-dark.css');
const Highlight = require('react-highlight');

module.exports = (content, ext) => {
    return (
        <Highlight className={ext}>
            {content}
        </Highlight>
    );
}