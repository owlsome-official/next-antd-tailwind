import pino from "pino";

const formatters = {
  level(label) {
    return { level: label };
  },
};

export default class Logger {
  constructor(name = "logger") {
    this.logger = pino({
      name: name,
      base: undefined,
      colorize: process.env.NODE_ENV !== "production",
      formatters: formatters,
      timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    });
  }

  debug(...args) {
    this.logger.debug(...args);
  }

  info(...args) {
    this.logger.info(...args);
  }

  warn(...args) {
    this.logger.warn(...args);
  }

  error(...args) {
    this.logger.error(...args);
  }

  log(...args) {
    this.logger.info(...args);
  }

  trace(...args) {
    this.logger.trace(...args);
  }

  fatal(...args) {
    this.logger.fatal(...args);
  }

  child(...args) {
    return this.logger.child(...args);
  }
}

/*
## How to use?

>> instead of this:
console.log("object");

>> use this:
const logger = new Logger("test");
logger.error("object")

*/
