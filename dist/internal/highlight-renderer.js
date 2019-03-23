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
    var cacheKey, cachedResult, result, wrapper;
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

            options = (0, _objectAssignDeep2.default)({
              pygments: {
                lexer: language,
                format: 'html',
                options: {
                  nowrap: true,
                  classprefix: 'pl-'
                }
              },
              wrapper: ['<pre><code>', '</code></pre>'],
              expandTab: null
            }, options);

            if (!(language === 'plain')) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', (0, _escapeHtml2.default)(code));

          case 11:
            result = void 0;
            _context.prev = 12;

            if (!(typeof options.highlighter === 'function')) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return options.highlighter(code, language);

          case 16:
            result = _context.sent;
            _context.next = 22;
            break;

          case 19:
            _context.next = 21;
            return _pygmentsPromise2.default.pygmentize(code, (0, _objectAssignDeep2.default)({
              lexer: language
            }, options.pygments));

          case 21:
            result = _context.sent;

          case 22:
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context['catch'](12);

            result = (0, _escapeHtml2.default)(code);

          case 27:

            // Add wrapper.
            wrapper = Array.isArray(options.wrapper) ? options.wrapper : [];

            if (typeof wrapper[0] === 'string') result = wrapper[0] + result;
            if (typeof wrapper[1] === 'string') result = result + wrapper[1];

            // Expand tab.
            if (typeof options.expandTab === 'number' && options.expandTab > 0) {
              result = result.split('\t').join(' '.repeat(options.expandTab));
            }

            if (!cache) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return cache.set(cacheKey, result);

          case 34:
            return _context.abrupt('return', result);

          case 35:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 24]]);
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

    // markdown-it will wrap the highlighted result if it's not started with '<pre'.
    // Wrap the uuid with a <pre> tag to make sure markdown-it's result is valid HTML
    // to prevent filter function from parse error.

  }, {
    key: '_generateUUID',
    value: function _generateUUID(uuidGenerator) {
      return '<pre>' + uuidGenerator() + '</pre>';
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
                return highlight(task.code, task.language, this.cache, this.options, this.highlighter);

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