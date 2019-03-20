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
  }, {
    key: '_doRenderWrapper',
    value: async function _doRenderWrapper(task) {
      if (!this.cache) return await this._doRender(task);

      var cacheKey = void 0;

      if (this.cache) {
        cacheKey = (0, _objectHash2.default)({
          type: this.constructor.name,
          task: task
        });

        var cachedResult = await this.cache.get(cacheKey);
        if (cachedResult) return cachedResult;
      }

      var result = await this._doRender(task);

      if (this.cache) {
        await this.cache.set(cacheKey, result);
      }

      return result;
    }
  }, {
    key: 'doRender',
    value: async function doRender(callbackCheckFiltered) {
      var _this = this;

      await Promise.all(this.tasks.filter(function (task) {
        return !callbackCheckFiltered(task.uuid);
      }).map(async function (task) {
        return _this.callbackAddReplace(task.uuid, (await _this._doRenderWrapper(task.task)));
      }));
    }
  }]);

  return AsyncRenderer;
}();

exports.default = AsyncRenderer;