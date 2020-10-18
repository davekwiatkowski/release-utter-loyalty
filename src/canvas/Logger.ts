enum LogMode {
  Debug = 'Debug',
  Info = 'Info',
  Error = 'Error',
}

function log(message: string, mode: LogMode, data?: any) {
  const modeOut = `[${mode}]`;
  const timeOut = new Date().toLocaleTimeString();
  const messageOut = `'${message}'`;
  switch (mode) {
    case LogMode.Debug:
      data
        ? console.debug(timeOut, modeOut, messageOut, data)
        : console.debug(timeOut, modeOut, messageOut);
      break;
    case LogMode.Info:
      data
        ? console.info(timeOut, modeOut, messageOut, data)
        : console.info(timeOut, modeOut, messageOut);
      break;
    case LogMode.Error:
      data
        ? console.error(timeOut, modeOut, messageOut, data)
        : console.error(timeOut, modeOut, messageOut);
      break;
    default:
      throw Error('No log mode of that type.');
  }
}

export function logDebug(message: string, data?: any): void {
  log(message, LogMode.Debug, data);
}

export function logError(message: string, data?: any): void {
  log(message, LogMode.Error, data);
}

export function logInfo(message: string, data?: any): void {
  log(message, LogMode.Info, data);
}
