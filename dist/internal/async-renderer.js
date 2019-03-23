'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AsyncRenderer = function () {
  function AsyncRenderer(cache, callbackAddReplace) {
    (0, _classCallCheck3.default)(this, AsyncRenderer);

    this.cache = cache;
    this.callbackAddReplace = callbackAddReplace;
    this.tasks = [];
  }

  (0, _createClass3.default)(AsyncRenderer, [{
    key: '_generateUUID',
    value: function _generateUUID(uuidGenerator) {
      return uuidGenerator();
    }
  }, {
    key: '_addRenderTask',
    value: function _addRenderTask(task) {
      var uuid = this._generateUUID(_uuid2.default);
      this.tasks.push({
        uuid: uuid,
        task: task
      });
      return uuid;
    }
  }, {
    key: 'doRender',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(callbackCheckFiltered) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _promise2.default.all(this.tasks.filter(function (task) {
                  return !callbackCheckFiltered(task.uuid);
                }).map(function () {
                  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(task) {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.t0 = _this;
                            _context.t1 = task.uuid;
                            _context.next = 4;
                            return _this._doRender(task.task);

                          case 4:
                            _context.t2 = _context.sent;
                            return _context.abrupt('return', _context.t0.callbackAddReplace.call(_context.t0, _context.t1, _context.t2));

                          case 6:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function doRender(_x) {
        return _ref.apply(this, arguments);
      }

      return doRender;
    }()
  }]);
  return AsyncRenderer;
}();

exports.default = AsyncRenderer;