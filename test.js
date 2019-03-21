let md = `
# Header
$$a+b$$

$$
\\begin{align*}
x&=1\\\\
yyyy&=2
\\end{align*}
$$

<script>alert('xss')</script>

\`\`\`cpp
#include <cstdio>

int main() {
  return 0;
}
\`\`\`

$ \\newcommand\\qwq{\\mathop{\\text{qwq}}} $

$ \\qwq wq \\phi $
`;

let md2 = `
# Header
$$a+b$$

$$
\\begin{align*}
x&=1\\\\
yyyy&=2
\\end{align*}
$$

<script>alert('xss')</script>

\`\`\`cpp
#include <cstdio>

int main() {
  return 0;
}
\`\`\`

\\$\\$ \\newcommand\\qwq{\\mathop{\\text{qwq}}} \\$\\$

$ \\qwq wq \\phi $

$2\\begin$

$qwq$

1
2
3
4
5
6
7
`;

// console.log('<link href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" rel="stylesheet">');
console.log('<link href="./dist/math.css" rel="stylesheet">');

import { markdown } from './src/index';
import util from 'util';
let cache;
import Redis from 'redis';
let redisClient = Redis.createClient();
cache = {
  get: util.promisify(redisClient.get).bind(redisClient),
  set: util.promisify(redisClient.set).bind(redisClient),
};
// markdown(md, cache).then(html => {
//   console.log(html)
//   // process.exit();
// });

markdown(md2, null, null, {
  markdownIt: {
    breaks: true
  },
  markdownItMath: {
    inlineClose: 'qwqwqwqwq'
  },
  pygments: {
    options: {
      classprefix: 'menci-'
    }
  }
}).then(html => {
  console.log(html)
  // process.exit();
});

// let old = require('../syzoj/libs/markdown');
// old(md, html => console.log(html));

