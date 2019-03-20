import Pygments from 'pygments-promise';

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

  async _doRender(task) {
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
