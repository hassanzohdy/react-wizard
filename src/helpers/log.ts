import fs from "@flk/fs";
import directory from "./directory";
import formatDate from "./format-date";
import { mongezRoot } from "./paths";
import { Logging, LoggingMode } from "./types";

let isLogging: boolean = true;

let logPath: string;

let loggingMode: LoggingMode = "json";

const logFormat: string = "dd-M-yyyy h:M:s a";

function logMessage(message: string) {
  const messageParts = [`[${formatDate(logFormat)}]`, `[message]`, message];

  const logFile = fs.get(logPath);

  fs.put(logFile, messageParts.join(" - ") + "\n");
}

function logJson(message: any) {
  const messageParts = {
    date: formatDate(logFormat),
    ...message,
    // stack: new Error().stack!.replace(/^Error\s+/, "").split("\n"),
  };

  const messages = fs.getJson(logPath) as any[];

  messages.push(messageParts);

  fs.putJson(logPath, messages);
}

export default function log(message: any) {
  if (!isLogging) return;

  if (loggingMode === "log") {
    logMessage(message as string);
  } else if (loggingMode === "json") {
    logJson(message as any);
  }
}

export function logging(options: Logging = {}) {
  if (options.enabled !== undefined) {
    isLogging = Boolean(options.enabled);
  }

  if (options.as) {
    loggingMode = options.as;
  }

  directory(mongezRoot("logs"));

  logPath = mongezRoot("logs", formatDate("dd-M-yyyy") + `.${loggingMode}`);

  if (!fs.exists(logPath)) {
    loggingMode === "log" ? fs.put(logPath, "") : fs.putJson(logPath, []);
  }
}
