'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _markdownItMath = require('markdown-it-math');

var _markdownItMath2 = _interopRequireDefault(_markdownItMath);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _mathRenderer = require('./math-renderer');

var _mathRenderer2 = _interopRequireDefault(_mathRenderer);

var _highlightRenderer = require('./highlight-renderer');

var _highlightRenderer2 = _interopRequireDefault(_highlightRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function render(input, cache, callbackFilter) {
  // Check cache first.
  var cacheKey = void 0;
  if (cache) {
    cacheKey = (0, _objectHash2.default)({
      type: "Markdown",
      task: input
    });

    var cachedResult = await cache.get(cacheKey);
    if (cachedResult) return cachedResult;
  }

  // Maths and highlights are rendered asynchronously, so a UUID placeholder is
  // returned to markdown-it during markdown rendering process. After markdown
  // and these finish rendering, replace the placeholder with rendered content
  // in markdown rendering result.
  var uuidReplaces = {};

  var mathRenderer = new _mathRenderer2.default(cache, function (uuid, result) {
    uuidReplaces[uuid] = result;
  });

  var highlightRenderer = new _highlightRenderer2.default(cache, function (uuid, result) {
    uuidReplaces[uuid] = result;
  });

  var renderer = new _markdownIt2.default({
    html: true,
    breaks: false,
    linkify: true,
    typographer: false,
    highlight: function highlight(code, language) {
      return highlightRenderer.addRenderTask(code, language);
    }
  });

  renderer.use(_markdownItMath2.default, {
    inlineOpen: '$',
    inlineClose: '$',
    blockOpen: '$$',
    blockClose: '$$',
    inlineRenderer: function inlineRenderer(str) {
      return mathRenderer.addRenderTask(str, false);
    },
    blockRenderer: function blockRenderer(str) {
      return mathRenderer.addRenderTask(str, true);
    }
  });

  var htmlResult = renderer.render(input);
  if (callbackFilter) {
    // Useful for XSS filtering.
    htmlResult = callbackFilter(htmlResult);
  }

  // Do math and highlight rendering.
  await mathRenderer.doRender(function (uuid) {
    return htmlResult.indexOf(uuid) === -1;
  });
  await highlightRenderer.doRender(function (uuid) {
    return htmlResult.indexOf(uuid) === -1;
  });

  // Replace placeholders back.
  var replacedHtmlResult = htmlResult;
  for (var uuid in uuidReplaces) {
    replacedHtmlResult = replacedHtmlResult.replace(uuid, uuidReplaces[uuid]);
  }

  // Set cache.
  if (cache) {
    await cache.set(cacheKey, replacedHtmlResult);
  }

  return replacedHtmlResult;
};