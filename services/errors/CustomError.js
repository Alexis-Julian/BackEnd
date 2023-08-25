export default class CustomError extends Error {
  constructor({ name = "Error", cause, message, code = 1 }) {
    super(message, { cause });
    this.name = name;
    this.code = code;
  }
}
