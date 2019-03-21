'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _mathjaxNodePage = require('mathjax-node-page');

var _mathjaxNodePage2 = _interopRequireDefault(_mathjaxNodePage);

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _asyncRenderer = require('./async-renderer');

var _asyncRenderer2 = _interopRequireDefault(_asyncRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatErrorMessage(message) {
  var htmlContext = (0, _escapeHtml2.default)(message.trim('\n')).split('\n').join('<br>');
  return '<span class="math-rendering-error-message">' + htmlContext + '</span>';
}

// This class is previously intented to call KaTeX and MathJax in _doRender
// to render asynchronously, but then I moved to render all maths within
// a single call to MathJax, so now this class overrides doRender and handle
// all tasks in a single function. And cache is NOT used.

var MathRenderer = function (_AsyncRenderer) {
  (0, _inherits3.default)(MathRenderer, _AsyncRenderer);

  function MathRenderer(cache, callbackAddReplace) {
    (0, _classCallCheck3.default)(this, MathRenderer);

    // Don't cache it since a page must be rendered in the same time.
    return (0, _possibleConstructorReturn3.default)(this, (MathRenderer.__proto__ || (0, _getPrototypeOf2.default)(MathRenderer)).call(this, null, callbackAddReplace));
  }

  (0, _createClass3.default)(MathRenderer, [{
    key: 'addRenderTask',
    value: function addRenderTask(texCode, displayMode) {
      return this._addRenderTask({
        texCode: texCode,
        displayMode: displayMode
      });
    }
  }, {
    key: 'doRender',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(callbackCheckFiltered) {
        var jsdom, document, tasks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task, uuid, math, scriptTag, divTag, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _task, result, errorMessage;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                jsdom = new _mathjaxNodePage2.default.JSDOM(), document = jsdom.window.document;
                tasks = this.tasks.filter(function (task) {
                  return !callbackCheckFiltered(task.uuid);
                });
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;

                for (_iterator = (0, _getIterator3.default)(tasks); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  task = _step.value;
                  uuid = task.uuid, math = task.task;
                  scriptTag = document.createElement('script');

                  scriptTag.type = 'math/tex';
                  if (math.displayMode) scriptTag.type += '; mode=display';
                  scriptTag.text = math.texCode;

                  divTag = document.createElement('div');

                  divTag.id = uuid;
                  divTag.appendChild(scriptTag);

                  document.body.appendChild(divTag);
                }

                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](5);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 13:
                _context.prev = 13;
                _context.prev = 14;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 16:
                _context.prev = 16;

                if (!_didIteratorError) {
                  _context.next = 19;
                  break;
                }

                throw _iteratorError;

              case 19:
                return _context.finish(16);

              case 20:
                return _context.finish(13);

              case 21:
                _context.next = 23;
                return new _promise2.default(function (resolve, reject) {
                  _mathjaxNodePage2.default.mjpage(jsdom, {
                    output: 'svg',
                    cssInline: false,
                    errorHandler: function errorHandler(id, wrapperNode, sourceFormula, sourceFormat, errors) {
                      wrapperNode.innerHTML = formatErrorMessage(errors.join('\n'));
                    }
                  }, {}, resolve);
                });

              case 23:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 26;


                for (_iterator2 = (0, _getIterator3.default)(tasks); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _task = _step2.value;
                  result = null;

                  try {
                    result = document.getElementById(_task.uuid).innerHTML;
                  } catch (e) {
                    errorMessage = 'Failed to render ' + (_task.task.displayMode ? 'display' : 'inline') + ' math: ' + _util2.default.inspect(_task.task.texCode) + '\n' + e.toString();

                    result = formatErrorMessage(errorMessage);
                  }

                  if (_task.task.displayMode) result = '<p style="text-align: center; ">' + result + '</p>';
                  this.callbackAddReplace(_task.uuid, result);
                }
                _context.next = 34;
                break;

              case 30:
                _context.prev = 30;
                _context.t1 = _context['catch'](26);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t1;

              case 34:
                _context.prev = 34;
                _context.prev = 35;

                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }

              case 37:
                _context.prev = 37;

                if (!_didIteratorError2) {
                  _context.next = 40;
                  break;
                }

                throw _iteratorError2;

              case 40:
                return _context.finish(37);

              case 41:
                return _context.finish(34);

              case 42:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 9, 13, 21], [14,, 16, 20], [26, 30, 34, 42], [35,, 37, 41]]);
      }));

      function doRender(_x) {
        return _ref.apply(this, arguments);
      }

      return doRender;
    }()
  }]);
  return MathRenderer;
}(_asyncRenderer2.default);

exports.default = MathRenderer;