import Pygments from 'pygments-promise';
import EscapeHTML from 'escape-html';
import ObjectHash from 'object-hash';
import ObjectAssignDeep from 'object-assign-deep';

import AsyncRenderer from './async-renderer';

export async function highlight(code, language, cache, options) {
  let cacheKey;
  if (cache) {
    cacheKey = ObjectHash({
      type: "Highlight",
      task: {
        code,
        language,
        options
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
    console.log(ObjectAssignDeep({
      lexer: language,
      format: 'html',
      options: {
        nowrap: true,
        classprefix: 'pl-'
      }
    }, options));
    result = await Pygments.pygmentize(code, ObjectAssignDeep({
      lexer: language,
      format: 'html',
      options: {
        nowrap: true,
        classprefix: 'pl-'
      }
    }, options));
  } catch (e) {
    result = EscapeHTML(code);
  }

  if (cache) {
    await cache.set(cacheKey, result);
  }

  return result;
}

export default class HighlightRenderer extends AsyncRenderer {
  constructor(cache, callbackAddReplace, options) {
    super(cache, callbackAddReplace);
    this.options = options;
  }

  addRenderTask(code, language) {
    return this._addRenderTask({
      code: code,
      language: language,
      options: this.options
    });
  }

  // Don't cache if language is plain -- it only need to be escaped, not highlighted.
  _shouldCache(task) {
    return task.language !== 'plain';
  }

  async _doRender(task) {
    return await highlight(task.code, task.language, this.cache, this.options);
  }
}
