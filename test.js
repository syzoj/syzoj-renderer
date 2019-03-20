let md = `
# Header
$$a+b$$

$$
\\begin{align*}
x&=1\\\\
yyyy&=2
\\end{align***}
$$

<script>alert('xss')</script>

\`\`\`cpp
#include <cstdio>

int main() {
  return 0;
}
\`\`\`
`;

console.log('<link href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" rel="stylesheet">');

import renderMarkdown from '.';
import util from 'util';
import Redis from 'redis';
let redisClient = Redis.createClient();
renderMarkdown(md, {
  get: util.promisify(redisClient.get).bind(redisClient),
  set: util.promisify(redisClient.set).bind(redisClient),
}).then(html => {
  console.log(html)
  process.exit();
});

// let old = require('../syzoj/libs/markdown');
// old(md, html => console.log(html));

