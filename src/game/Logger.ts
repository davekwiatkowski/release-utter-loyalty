enum LogMode {
  Debug = 'Debug',
  Info = 'Info',
  Error = 'Error',
}

export class Logger<T extends Function> {
  private _context: string;

  constructor(x: T) {
    this._context = x.name;
  }

  logDebug(message: string, data?: any): void {
    this.log(message, LogMode.Debug, data);
  }

  logError(message: string, data?: any): void {
    this.log(message, LogMode.Error, data);
  }

  logInfo(message: string, data?: any): void {
    this.log(message, LogMode.Info, data);
  }

  log(message: string, mode: LogMode, data?: any) {
    const contextOut = `(${this._context})`;
    const modeOut = `[${mode}]`;
    const timeOut = new Date().toLocaleTimeString();
    const messageOut = `'${message}'`;
    switch (mode) {
      case LogMode.Debug:
        data
          ? console.debug(timeOut, modeOut, contextOut, messageOut, data)
          : console.debug(timeOut, modeOut, contextOut, messageOut);
        break;
      case LogMode.Info:
        data
          ? console.info(timeOut, modeOut, contextOut, messageOut, data)
          : console.info(timeOut, modeOut, contextOut, messageOut);
        break;
      case LogMode.Error:
        data
          ? console.error(timeOut, modeOut, contextOut, messageOut, data)
          : console.error(timeOut, modeOut, contextOut, messageOut);
        break;
      default:
        throw Error('No log mode of that type.');
    }
  }
}
