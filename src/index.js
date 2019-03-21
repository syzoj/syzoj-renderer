import MarkdownIt from 'markdown-it';
import MathdownItMath from 'markdown-it-math-loose';
import ObjectHash from 'object-hash';

import MathRenderer from './math-renderer';
import HighlightRenderer from './highlight-renderer';

export default async function render(input, cache, callbackFilter) {
  // Check cache first.
  let cacheKey;
  if (cache) {
    cacheKey = ObjectHash({
      type: "Markdown",
      task: input
    });

    let cachedResult = await cache.get(cacheKey);
    if (cachedResult) return cachedResult;
  }

  // Maths and highlights are rendered asynchronously, so a UUID placeholder is
  // returned to markdown-it during markdown rendering process. After markdown
  // and these finish rendering, replace the placeholder with rendered content
  // in markdown rendering result.
  let uuidReplaces = {};

  let mathRenderer = new MathRenderer(cache, (uuid, result) => {
    uuidReplaces[uuid] = result;
  });

  let highlightRenderer = new HighlightRenderer(cache, (uuid, result) => {
    uuidReplaces[uuid] = result;
  });

  const renderer = new MarkdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: false,
    highlight: (code, language) => highlightRenderer.addRenderTask(code, language)
  });

  renderer.use(MathdownItMath, {
    inlineOpen: '$',
    inlineClose: '$',
    blockOpen: '$$',
    blockClose: '$$',
    inlineRenderer: str => mathRenderer.addRenderTask(str, false),
    blockRenderer: str => mathRenderer.addRenderTask(str, true)
  });
  
  let htmlResult = renderer.render(input);
  if (callbackFilter) {
    // Useful for XSS filtering.
    htmlResult = callbackFilter(htmlResult);
  }
  
  // Do math and highlight rendering.
  await mathRenderer.doRender(uuid => htmlResult.indexOf(uuid) === -1);
  await highlightRenderer.doRender(uuid => htmlResult.indexOf(uuid) === -1);

  // Replace placeholders back.
  let replacedHtmlResult = htmlResult;
  for (let uuid in uuidReplaces) {
    replacedHtmlResult = replacedHtmlResult.replace(uuid, uuidReplaces[uuid]);
  }

  // Set cache.
  if (cache) {
    await cache.set(cacheKey, replacedHtmlResult);
  }

  return replacedHtmlResult;
}
