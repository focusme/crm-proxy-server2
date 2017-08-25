const MarkdownIt =require('markdown-it');
const linkTarget = require('./linkTargetPlugin')

var hljs = require('highlight.js'); // https://highlightjs.org/

let md = new MarkdownIt({
    html: true, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: true, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
    linkify: true, // Autoconvert URL-like text to links
    typographer: false,
    quotes: '“”‘’',
    highlight: function(str, lang) {

        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
}).use(linkTarget);

module.exports = function(text) {
  // if(marked) {
  //   // Initialize
  //   // var markedOptions = {};
  //   //
  //   //
  //   // // Update options
  //   // if(this.options && this.options.renderingConfig && this.options.renderingConfig.singleLineBreaks === false) {
  //   //   markedOptions.breaks = false;
  //   // } else {
  //   //   markedOptions.breaks = true;
  //   // }
  //   //
  //   // if(this.options && this.options.renderingConfig && this.options.renderingConfig.codeSyntaxHighlighting === true && window.hljs) {
  //   //   markedOptions.highlight = function(code) {
  //   //     return window.hljs.highlightAuto(code).value;
  //   //   };
  //   // }
  //   //
  //   //
  //   // // Set options
  //   // marked.setOptions(markedOptions);
  //
  //
  //   // Return
  //   return marked(text);
  // }

  return md.render(text+'')
};
