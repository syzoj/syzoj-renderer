# syzoj-renderer
SYZOJ's renderer for markdown, math and highlight.

# Example
```javascript
let { markdown, highlight } = require('syzoj-renderer');

console.log(await markdown(text));
console.log(await highlight(code, language));
```

# API
## `async markdown(text, [cache, filterFunction, options])`
`text` is the Markdown text to be rendered.

`cache` is `null` or a object with two functions to manipulate a Key-Value store (`key` is hashed before passing to `cache`):

* `async get(string key)`
* `async set(string key, string value)`

`filterFunction(html)` is a function to filter rendered HTML. It can be used to prevent XSS attack. Should return filtered HTML.

`options` is a object, may contain:

* `markdownIt`: overrides default options in `new MarkdownIt(options)`. (See [markdown-it](https://github.com/markdown-it/markdown-it))
* `markdownItMath`: overrides default options in `markdownIt.use(MathdownItMath, options)`. (See [markdown-it-math-loose](https://github.com/Menci/markdown-it-math-loose))
* `pygments`: overrides default options in `Pygments.pygmentize(code, options)`. (See [pygments-promise](https://github.com/Menci/pygments-promise))

Return rendered HTML. Won't throw.

## `async highlight(code, language[, cache, options])`
`code` is the code to be highlighted. `language` is `code`'s language.

`cache` is same as the parameter in `markdown()`.

`options` overrides default options in `Pygments.pygmentize(code, options)`. (See [pygments-promise](https://github.com/Menci/pygments-promise))

Return highlighted code in HTML. Won't throw.

# Notes
* Markdown backend is [markdown-it](https://github.com/markdown-it/markdown-it).
    * GFM is supported.
    * By default, `linkify` and `html` are enabled, `typographer` and `breaks` are disabled.
* Code highlight backend is [pygments](https://pygments.org), which requires pygments to be installed.
    * If no `pygmentize` is available, it'll always return unhighlighted code.
    * `pygmentize`'s default commandline arguments are: `pygmentize -l <language> -f html -P nowrap=true -P classprefix=pl-`.
    * A theme CSS is required to display highlighted code properly.
* Math backend is [mathjax-node-page](https://github.com/pkra/mathjax-node-page).
    * Maths are rendered to `<svg>` HTML elements, `dist/math.css` is required to display properly.
    * Maths with spaces within dollar sign like `$ a+b $` will work.
    * Complex maths like `$ \sum\limits_{i=0}^na_i $` won't be broken by Markdown.
    * Maths that failed to render would result in displaying error message.

# License
[AGPL-3.0](LICENSE). Contact me if you *really* want this to be MIT license.
