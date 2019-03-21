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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(task) {
        var result, typesetResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Try KaTeX first, use MathJax if fails.
                result = void 0;
                _context.prev = 1;

                result = _katex2.default.renderToString(task.texCode, {
                  displayMode: task.displayMode
                });
                _context.next = 17;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context['catch'](1);
                _context.prev = 7;
                _context.next = 10;
                return _mathjaxNode2.default.typeset({
                  math: task.texCode,
                  format: task.displayMode ? "TeX" : "inline-TeX",
                  svg: true
                });

              case 10:
                typesetResult = _context.sent;

                result = typesetResult.svg;
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t1 = _context['catch'](7);

                result = '<span style="display: inline-block; border: 1px solid #000; ">' + ('<strong>' + _context.t1.toString() + '</strong>') + '</span>';

              case 17:

                if (task.displayMode) {
                  result = '<p style="text-align: center; ">' + result + '</p>';
                }

                return _context.abrupt('return', result);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 5], [7, 14]]);
      }));

      function _doRender(_x) {
        return _ref.apply(this, arguments);
      }

      return _doRender;
    }()
  }]);

  return MathRenderer;
}(_asyncRenderer2.default);

exports.default = MathRenderer;