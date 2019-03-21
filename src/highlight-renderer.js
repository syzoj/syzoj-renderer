
import AsyncRenderer from './async-renderer';
import highlight from './highlight';

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
    return await highlight(task.code, task.language);
  }
}
