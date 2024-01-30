type messagesList =
  | 'current_page'
  | 'close_browser'
  | 'entity_Initialization';

class PubSub {
  private handlers: {[key: string]: Function[]} = {};

  publish(msgName: messagesList, data: any) {
    if (!this.handlers[msgName]) return;
    this.handlers[msgName].forEach((handler) => handler(data));
  }

  subscribe(msgName: messagesList, handler: Function) {
    if (!this.handlers[msgName]) this.handlers[msgName] = [];
    this.handlers[msgName].push(handler);
  }
}

export const pubsub = new PubSub();
