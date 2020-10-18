enum LogMode {
  Debug = 'Debug',
  Info = 'Info',
  Error = 'Error',
}

function log(context: object, message: string, mode: LogMode, data?: any) {
  const modeOut = `[${mode}]`;
  const contextOut = `(${context.constructor.name})`;
  const timeOut = new Date().toLocaleTimeString();
  const messageOut = `'${message}'`;
  switch (mode) {
    case LogMode.Debug:
      console.log(timeOut, modeOut, contextOut, messageOut, data, context);
      break;
    case LogMode.Info:
      console.log(timeOut, modeOut, contextOut, messageOut, data);
      break;
    case LogMode.Error:
      console.error(timeOut, modeOut, contextOut, messageOut, data);
      break;
    default:
      throw Error('Now log mode of that type.');
  }
}

export function logDebug(context: object, message: string, data?: any): void {
  log(context, message, LogMode.Debug, data);
}

export function logError(context: object, message: string, data?: any): void {
  log(context, message, LogMode.Error, data);
}

export function logInfo(context: object, message: string, data?: any): void {
  log(context, message, LogMode.Info, data);
}
