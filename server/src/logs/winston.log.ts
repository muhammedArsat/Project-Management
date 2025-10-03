import { createLogger, format, transports } from "winston";
import path from "path";

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: `${info.message}\n${info.stack}` });
  }
  return info;
});

const getCodeLine = format((info) => {
  const stack = new Error().stack?.split("\n")[10] || ""; // Adjust index if needed
  const match = stack.match(/\((.*):(\d+):(\d+)\)/);
  if (match) {
    const file = path.basename(match[1]);
    const line = match[2];
    info.codeLine = `${file}:${line}`;
  } else {
    info.codeLine = "unknown";
  }
  return info;
});

export const logger = createLogger({
  level: "info",
  format: format.combine(
    enumerateErrorFormat(),
    getCodeLine(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, codeLine }) => {
      return `${timestamp} - ${message} - ${codeLine}`;
    })
  ),
  transports: [new transports.Console()],
});
