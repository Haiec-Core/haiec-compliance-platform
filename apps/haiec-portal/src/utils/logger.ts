import debug from "debug";

const isDevEnvironment = process.env.NODE_ENV === "development";

type LogFunction = (...args: (string | number | boolean | object)[]) => void;

interface Logger {
  log: LogFunction;
  error: LogFunction;
}

function createLogger(scope: string): Logger {
  const logger = debug(`app:${scope}`);

  return {
    log: (...args: Parameters<typeof logger>) => {
      if (isDevEnvironment) {
        logger(...args);
      }
    },
    error: (...args: Parameters<typeof logger>) => {
      if (isDevEnvironment) {
        logger.extend("error")(...args);
      }
    },
  };
}

export const middlewareLogger = createLogger("middleware");
