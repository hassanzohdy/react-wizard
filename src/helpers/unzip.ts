import { Extract } from "unzipper";
import * as fs from "fs";
import log from "./log";

export default async function unzip(zipFile: string, extractTo: string) {
  log({
    action: "unzipping",
    path: zipFile,
    extractTo,
  });

  return new Promise((resolve, reject) => {
    fs.createReadStream(zipFile)
      .pipe(Extract({ path: extractTo }))
      .on("close", () => {
        log({
          action: "unzipped",
          path: zipFile,
          extractTo,
        });
        resolve(extractTo);
      });
  });
}
