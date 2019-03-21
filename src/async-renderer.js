import UUID from 'uuid';
import ObjectHash from 'object-hash';

export default class AsyncRenderer {
  constructor(cache, callbackAddReplace) {
    this.cache = cache;
    this.callbackAddReplace = callbackAddReplace;
    this.tasks = [];
  }

  _addRenderTask(task) {
    let uuid = UUID();
    this.tasks.push({
      uuid: uuid,
      task: task
    });
    return uuid;
  }

  // Always cache render result by default.
  _shouldCache(task) {
    return true;
  }

  async _doRenderWrapper(task) {
    if (!this.cache || !this._shouldCache(task)) {
      return await this._doRender(task);
    }

    let cacheKey;
    
    if (this.cache) {
      cacheKey = ObjectHash({
        type: this.constructor.name,
        task: task
      });

      let cachedResult = await this.cache.get(cacheKey);
      if (cachedResult) return cachedResult;
    }

    let result = await this._doRender(task);

    if (this.cache) {
      await this.cache.set(cacheKey, result);
    }

    return result;
  }

  async doRender(callbackCheckFiltered) {
    await Promise.all(this.tasks.filter(task => !callbackCheckFiltered(task.uuid))
                                .map(async task => this.callbackAddReplace(task.uuid, await this._doRenderWrapper(task.task))));
  }
}
