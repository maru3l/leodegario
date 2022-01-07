export default class ValidationError extends Error {
  constructor({errors = []}) {
    super('ValidationError');

    this.errors = errors;
  }
}
