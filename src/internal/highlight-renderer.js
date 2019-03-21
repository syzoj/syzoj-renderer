import Pygments from 'pygments-promise';
import EscapeHTML from 'escape-html';
import ObjectHash from 'object-hash';

import AsyncRenderer from './async-renderer';

export async function highlight(code, language, cache) {
  let cacheKey;
  if (cache) {
    cacheKey = ObjectHash({
      type: "Highlight",
      task: {
        code,
        language
      }
    });

    const cachedResult = await cache.get(cacheKey);
    if (cachedResult) return cachedResult;
  }

  if (language === 'plain') {
    return EscapeHTML(code);
  }

  let result;
  try {
    result = await Pygments.pygmentize(code, {
      lexer: language,
      format: 'html',
      options: {
        nowrap: true,
        classprefix: 'pl-'
      }
    });
  } catch (e) {
    result = EscapeHTML(code);
  }

  if (cache) {
    await cache.set(cacheKey, result);
  }

  return result;
}

export default class HighlightRenderer extends AsyncRenderer {
  constructor(cache, callbackAddReplace) {
    super(cache, callbackAddReplace);
  }

  addRenderTask(code, language) {
    return this._addRenderTask({
      code: code,
      language: language
    });
  }

  // Don't cache if language is plain -- it only need to be escaped, not highlighted.
  _shouldCache(task) {
    return task.language !== 'plain';
  }

  async _doRender(task) {
    return await highlight(task.code, task.language, this.cache);
  }
}
