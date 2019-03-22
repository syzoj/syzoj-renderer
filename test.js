let md = `
|1|1|3|4|5|
|-|-|-|-|-|
|1|1|2|2|6|
|1|1|2|2|7|
|1|4|3|5|5|`;

console.log('<link href="./dist/math.css" rel="stylesheet">');
console.log('<style>td { border: 1px solid #000; }</style>');

import { markdown } from './src/index';
import util from 'util';
let cache;
// import Redis from 'redis';
// let redisClient = Redis.createClient();
// cache = {
//   get: util.promisify(redisClient.get).bind(redisClient),
//   set: util.promisify(redisClient.set).bind(redisClient),
// };

markdown(md, null, null, {
  markdownIt: {
    breaks: true
  },
  markdownItMath: {
    inlineClose: '$'
  },
  markdownItMergeCells: false,
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

