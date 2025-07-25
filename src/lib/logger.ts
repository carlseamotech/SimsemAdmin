// src/lib/logger.ts

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const isProduction = process.env.NODE_ENV === 'production';

const log = (level: LogLevel, message: string, ...args: unknown[]) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;

  // In production, only log warnings and errors
  if (isProduction && level !== 'WARN' && level !== 'ERROR') {
    return;
  }

  const logMethod = level === 'ERROR' ? console.error : level === 'WARN' ? console.warn : console.log;

  if (args.length > 0) {
    logMethod(prefix, message, ...args);
  } else {
    logMethod(prefix, message);
  }
};

const logger = {
  debug: (message: string, ...args: unknown[]) => log('DEBUG', message, ...args),
  info: (message: string, ...args: unknown[]) => log('INFO', message, ...args),
  warn: (message: string, ...args: unknown[]) => log('WARN', message, ...args),
  error: (message: string, ...args: unknown[]) => log('ERROR', message, ...args),
};

export default logger;
