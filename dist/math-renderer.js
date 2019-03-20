'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _katex = require('katex');

var _katex2 = _interopRequireDefault(_katex);

var _mathjaxNode = require('mathjax-node');

var _mathjaxNode2 = _interopRequireDefault(_mathjaxNode);

var _asyncRenderer = require('./async-renderer');

var _asyncRenderer2 = _interopRequireDefault(_asyncRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_mathjaxNode2.default.config({
  displayErrors: false // Don't log errors on console.
});

var MathRenderer = function (_AsyncRenderer) {
  _inherits(MathRenderer, _AsyncRenderer);

  function MathRenderer(cache, callbackAddReplace) {
    _classCallCheck(this, MathRenderer);

    return _possibleConstructorReturn(this, (MathRenderer.__proto__ || Object.getPrototypeOf(MathRenderer)).call(this, cache, callbackAddReplace));
  }

  _createClass(MathRenderer, [{
    key: 'addRenderTask',
    value: function addRenderTask(texCode, displayMode) {
      return this._addRenderTask({
        texCode: texCode,
        displayMode: displayMode
      });
    }
  }, {
    key: '_doRender',
    value: async function _doRender(task) {
      // Try KaTeX first, use MathJax if fails.
      var result = void 0;
      try {
        result = _katex2.default.renderToString(task.texCode, {
          displayMode: task.displayMode
        });
      } catch (e) {
        try {
          var typesetResult = await _mathjaxNode2.default.typeset({
            math: task.texCode,
            format: task.displayMode ? "TeX" : "inline-TeX",
            svg: true
          });
          result = typesetResult.svg;
        } catch (e) {
          result = '<span style="display: inline-block; border: 1px solid #000; ">' + ('<strong>' + e.toString() + '</strong>') + '</span>';
        }
      }

      if (task.displayMode) {
        result = '<p style="text-align: center; ">' + result + '</p>';
      }

      return result;
    }
  }]);

  return MathRenderer;
}(_asyncRenderer2.default);

exports.default = MathRenderer;