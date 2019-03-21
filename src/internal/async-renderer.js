import UUID from 'uuid';

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

  async doRender(callbackCheckFiltered) {
    await Promise.all(this.tasks.filter(task => !callbackCheckFiltered(task.uuid))
                                .map(async task => this.callbackAddReplace(task.uuid, await this._doRender(task.task))));
  }
}
