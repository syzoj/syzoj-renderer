'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pygmentsPromise = require('pygments-promise');

var _pygmentsPromise2 = _interopRequireDefault(_pygmentsPromise);

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
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

  function highlight(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return highlight;
}();