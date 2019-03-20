import KaTeX from 'katex';
import MathJaxNode from 'mathjax-node';

import AsyncRenderer from './async-renderer';

MathJaxNode.config({
  displayErrors: false // Don't log errors on console.
});

export default class MathRenderer extends AsyncRenderer {
  constructor(cache, callbackAddReplace) {
    super(cache, callbackAddReplace);
  }

  addRenderTask(texCode, displayMode) {
    return this._addRenderTask({
      texCode: texCode,
      displayMode: displayMode
    });
  }

  async _doRender(task) {
    // Try KaTeX first, use MathJax if fails.
    let result;
    try {
      result = KaTeX.renderToString(task.texCode, {
        displayMode: task.displayMode
      });
    } catch (e) {
      try {
        let typesetResult = await MathJaxNode.typeset({
          math: task.texCode,
          format: task.displayMode ? "TeX" : "inline-TeX",
          svg: true
        });
        result = typesetResult.svg;
      } catch (e) {
        result = '<span style="display: inline-block; border: 1px solid #000; ">' +
                   `<strong>${e.toString()}</strong>` +
                 '</span>';
      }
    }

    if (task.displayMode) {
      result = `<p style="text-align: center; ">${result}</p>`;
    }

    return result;
  }
}
