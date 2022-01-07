export default class ValidatorError extends Error {
  constructor({type, path, message, field, params}) {
    super(message);

    this.name = 'ValidatorError';
    this.path = path;
    this.field = field;
    this.type = type;
    this.params = params;
  }
}
