'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AsyncRenderer = function () {
  function AsyncRenderer(cache, callbackAddReplace) {
    _classCallCheck(this, AsyncRenderer);

    this.cache = cache;
    this.callbackAddReplace = callbackAddReplace;
    this.tasks = [];
  }

  _createClass(AsyncRenderer, [{
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(task) {
        var cacheKey, cachedResult, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(callbackCheckFiltered) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Promise.all(this.tasks.filter(function (task) {
                  return !callbackCheckFiltered(task.uuid);
                }).map(function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(task) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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