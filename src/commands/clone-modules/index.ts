import { mongezRoot } from "./../../helpers/paths";
import * as path from "path";
import directory from "./../../helpers/directory";
import unzip from "./../../helpers/unzip";
import downloadFile from "./../../helpers/download-file";
import setupModule from "./setup-module";
import { CloneableModule, Wizard } from "./../../helpers/types";

async function prepareFile(
  moduleInfo: CloneableModule,
  url: string
): Promise<string> {
  const filePath = await downloadFile(
    url,
    mongezRoot(`cloneables/${moduleInfo.name}/downloads/`)
  );

  return filePath;
}

export default async function cloneModules(wizard: Wizard) {
  directory(mongezRoot("cloneables"));

  for (let moduleInfo of wizard.cloneables?.modules!) {
    const modulePath = mongezRoot(`cloneables/${moduleInfo.name}`);

    directory(modulePath);

    const fileUrl =
      moduleInfo.url ||
      path.resolve(wizard.cloneables?.baseUrl!, moduleInfo.path!);

    const filePath = await prepareFile(moduleInfo, fileUrl);

    await unzip(filePath, modulePath);

    setupModule(moduleInfo, modulePath);
  }
}
