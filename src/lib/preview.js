import Highlight from 'react-highlight';
import '!!style-loader!css-loader!../../node_modules/highlight.js/styles/solarized-dark.css';
import '../styles/preview.css';

export default ({ highlight, content }) => (
    <Highlight className={highlight}>
        {content}
    </Highlight>
);
