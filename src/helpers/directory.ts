import fs from "@flk/fs";

export default function directory(directory: string) {
  if (!fs.isDirectory(directory)) {
    fs.makeDirectory(directory);
  }
}
