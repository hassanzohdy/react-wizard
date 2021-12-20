import * as fs from "fs";
import customFs from "@flk/fs";
import axios from "axios";
import { basename } from "path";
import * as stream from "stream";
import { promisify } from "util";
import log from "./log";

const finished = promisify(stream.finished);

export default async function downloadFile(
  url: string,
  saveTo: string
): Promise<string> {
  const fileName = basename(url);
  if (!customFs.isDirectory(saveTo)) {
    customFs.makeDirectory(saveTo);
  }

  log({
    action: "downloading",
    path: url,
    saveTo,
  });

  const filePath = `${saveTo}/${fileName}`;

  const writer = fs.createWriteStream(filePath);

  let response = await axios({
    method: "get",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(writer);
  await finished(writer);

  log({
    action: "downloaded",
    path: url,
    saveTo,
  });

  return filePath;
}
