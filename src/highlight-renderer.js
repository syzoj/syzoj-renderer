import Pygments from 'pygments-promise';
import EscapeHTML from 'escape-html';

import AsyncRenderer from './async-renderer';

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
    if (task.language === 'plain') {
      return EscapeHTML(task.code);
    }

    return Pygments.pygmentize(task.code, {
      lexer: task.language,
      format: 'html',
      options: {
        nowrap: true,
        classprefix: 'pl-'
      }
    });
  }
}
