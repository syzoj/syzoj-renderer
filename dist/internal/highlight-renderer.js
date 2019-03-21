'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlight = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var highlight = exports.highlight = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(code, language) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(language === 'plain')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', (0, _escapeHtml2.default)(code));

          case 2:
            _context.next = 4;
            return _pygmentsPromise2.default.pygmentize(code, {
              lexer: language,
              format: 'html',
              options: {
                nowrap: true,
                classprefix: 'pl-'
              }
            });

          case 4:
            return _context.abrupt('return', _context.sent);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function highlight(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _pygmentsPromise = require('pygments-promise');

var _pygmentsPromise2 = _interopRequireDefault(_pygmentsPromise);

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _asyncRenderer = require('./async-renderer');

var _asyncRenderer2 = _interopRequireDefault(_asyncRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var HighlightRenderer = function (_AsyncRenderer) {
  _inherits(HighlightRenderer, _AsyncRenderer);

  function HighlightRenderer(cache, callbackAddReplace) {
    _classCallCheck(this, HighlightRenderer);

    return _possibleConstructorReturn(this, (HighlightRenderer.__proto__ || Object.getPrototypeOf(HighlightRenderer)).call(this, cache, callbackAddReplace));
  }

  _createClass(HighlightRenderer, [{
    key: 'addRenderTask',
    value: function addRenderTask(code, language) {
      return this._addRenderTask({
        code: code,
        language: language
      });
    }

    // Don't cache if language is plain -- it only need to be escaped, not highlighted.

  }, {
    key: '_shouldCache',
    value: function _shouldCache(task) {
      return task.language !== 'plain';
    }
  }, {
    key: '_doRender',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(task) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return highlight(task.code, task.language);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _doRender(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _doRender;
    }()
  }]);

  return HighlightRenderer;
}(_asyncRenderer2.default);

exports.default = HighlightRenderer;