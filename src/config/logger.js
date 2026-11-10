const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] ?? LOG_LEVELS.INFO;

function formatMessage(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length > 0 ? ' ' + JSON.stringify(meta) : '';
  return `[${timestamp}] [${level}] ${message}${metaStr}`;
}

function log(levelName, levelValue, message, meta) {
  if (levelValue <= currentLevel) {
    const formatted = formatMessage(levelName, message, meta);
    if (levelValue === LOG_LEVELS.ERROR) {
      console.error(formatted);
    } else if (levelValue === LOG_LEVELS.WARN) {
      console.warn(formatted);
    } else if (levelValue === LOG_LEVELS.INFO) {
      console.log(formatted);
    } else {
      console.log(formatted);
    }
  }
}

export const logger = {
  error: (message, meta) => log('ERROR', LOG_LEVELS.ERROR, message, meta),
  warn: (message, meta) => log('WARN', LOG_LEVELS.WARN, message, meta),
  info: (message, meta) => log('INFO', LOG_LEVELS.INFO, message, meta),
  debug: (message, meta) => log('DEBUG', LOG_LEVELS.DEBUG, message, meta)
};