'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsyncRenderer = function () {
  function AsyncRenderer(cache, callbackAddReplace) {
    (0, _classCallCheck3.default)(this, AsyncRenderer);

    this.cache = cache;
    this.callbackAddReplace = callbackAddReplace;
    this.tasks = [];
  }

  (0, _createClass3.default)(AsyncRenderer, [{
    key: '_addRenderTask',
    value: function _addRenderTask(task) {
      var uuid = (0, _uuid2.default)();
      this.tasks.push({
        uuid: uuid,
        task: task
      });
      return uuid;
    }

    // Always cache render result by default.

  }, {
    key: '_shouldCache',
    value: function _shouldCache(task) {
      return true;
    }
  }, {
    key: '_doRenderWrapper',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(task) {
        var cacheKey, cachedResult, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.cache || !this._shouldCache(task))) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return this._doRender(task);

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
                cacheKey = void 0;

                if (!this.cache) {
                  _context.next = 12;
                  break;
                }

                cacheKey = (0, _objectHash2.default)({
                  type: this.constructor.name,
                  task: task
                });

                _context.next = 9;
                return this.cache.get(cacheKey);

              case 9:
                cachedResult = _context.sent;

                if (!cachedResult) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', cachedResult);

              case 12:
                _context.next = 14;
                return this._doRender(task);

              case 14:
                result = _context.sent;

                if (!this.cache) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return this.cache.set(cacheKey, result);

              case 18:
                return _context.abrupt('return', result);

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _doRenderWrapper(_x) {
        return _ref.apply(this, arguments);
      }

      return _doRenderWrapper;
    }()
  }, {
    key: 'doRender',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(callbackCheckFiltered) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _promise2.default.all(this.tasks.filter(function (task) {
                  return !callbackCheckFiltered(task.uuid);
                }).map(function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(task) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.t0 = _this;
                            _context2.t1 = task.uuid;
                            _context2.next = 4;
                            return _this._doRenderWrapper(task.task);

                          case 4:
                            _context2.t2 = _context2.sent;
                            return _context2.abrupt('return', _context2.t0.callbackAddReplace.call(_context2.t0, _context2.t1, _context2.t2));

                          case 6:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function doRender(_x2) {
        return _ref2.apply(this, arguments);
      }

      return doRender;
    }()
  }]);
  return AsyncRenderer;
}();

exports.default = AsyncRenderer;