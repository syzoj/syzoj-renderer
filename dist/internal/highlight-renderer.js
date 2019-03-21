'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlight = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var highlight = exports.highlight = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(code, language, cache, options) {
    var cacheKey, cachedResult, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cacheKey = void 0;

            if (!cache) {
              _context.next = 8;
              break;
            }

            cacheKey = (0, _objectHash2.default)({
              type: "Highlight",
              task: {
                code: code,
                language: language,
                options: options
              }
            });

            _context.next = 5;
            return cache.get(cacheKey);

          case 5:
            cachedResult = _context.sent;

            if (!cachedResult) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', cachedResult);

          case 8:
            if (!(language === 'plain')) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', (0, _escapeHtml2.default)(code));

          case 10:
            result = void 0;
            _context.prev = 11;

            console.log((0, _objectAssignDeep2.default)({
              lexer: language,
              format: 'html',
              options: {
                nowrap: true,
                classprefix: 'pl-'
              }
            }, options));
            _context.next = 15;
            return _pygmentsPromise2.default.pygmentize(code, (0, _objectAssignDeep2.default)({
              lexer: language,
              format: 'html',
              options: {
                nowrap: true,
                classprefix: 'pl-'
              }
            }, options));

          case 15:
            result = _context.sent;
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context['catch'](11);

            result = (0, _escapeHtml2.default)(code);

          case 21:
            if (!cache) {
              _context.next = 24;
              break;
            }

            _context.next = 24;
            return cache.set(cacheKey, result);

          case 24:
            return _context.abrupt('return', result);

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[11, 18]]);
  }));

  return function highlight(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _pygmentsPromise = require('pygments-promise');

var _pygmentsPromise2 = _interopRequireDefault(_pygmentsPromise);

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _objectAssignDeep = require('object-assign-deep');

var _objectAssignDeep2 = _interopRequireDefault(_objectAssignDeep);

var _asyncRenderer = require('./async-renderer');

var _asyncRenderer2 = _interopRequireDefault(_asyncRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighlightRenderer = function (_AsyncRenderer) {
  (0, _inherits3.default)(HighlightRenderer, _AsyncRenderer);

  function HighlightRenderer(cache, callbackAddReplace, options) {
    (0, _classCallCheck3.default)(this, HighlightRenderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HighlightRenderer.__proto__ || (0, _getPrototypeOf2.default)(HighlightRenderer)).call(this, cache, callbackAddReplace));

    _this.options = options;
    return _this;
  }

  (0, _createClass3.default)(HighlightRenderer, [{
    key: 'addRenderTask',
    value: function addRenderTask(code, language) {
      return this._addRenderTask({
        code: code,
        language: language,
        options: this.options
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
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(task) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return highlight(task.code, task.language, this.cache, this.options);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _doRender(_x5) {
        return _ref2.apply(this, arguments);
      }

      return _doRender;
    }()
  }]);
  return HighlightRenderer;
}(_asyncRenderer2.default);

exports.default = HighlightRenderer;