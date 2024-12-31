import updateShoulders from "./commands/updateShoulders";

let instance;

class CommandRegistry {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;

    this.interactions = new Map();
    this.registerCommands();
  }
  register(command, callback) {
    this.interactions.set(command, (params) => callback(params));
  }
  unregister(command) {
    this.interactions.delete(command);
  }
  execute(command, params) {
    try {
      this.interactions.get(command)(params);
    } catch (error) {
      throw new Error(error);
    }
  }
  getCommands() {
    return this.interactions.keys();
  }
  registerCommands() {
    this.interactions.set(
      updateShoulders.name,
      updateShoulders.exec.bind(this)
    );
  }
}

const commandRegistry = Object.freeze(new CommandRegistry());
export default commandRegistry;
