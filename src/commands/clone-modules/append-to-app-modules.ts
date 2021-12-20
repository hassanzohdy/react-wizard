import fs from "@flk/fs";
import { CloneableModule, ModuleSetup } from "./../../helpers/types";

export default function appendToAppModules(
  moduleInfo: CloneableModule,
  setupOptions: ModuleSetup,
  appName: string,
  moduleName: string,
  appDirectory: string
) {
  // TODO: validate app module file exists
  // TODO: check if the append to app modules is set to false, then stop the following process
  const appModules = fs.getJson(
    appDirectory + `/${appName}-modules.json`
  ) as any;
  let appendToModule =
    moduleInfo?.appendTo?.appModule || setupOptions?.appendTo?.appModule;
  if (appendToModule === undefined || appendToModule === true) {
    appendToModule = "prepend";
  }

  if (
    appModules["modules"].find(
      (appModule: any) => appModule.module === moduleName
    )
  )
    return;

  if (appendToModule === "prepend") {
    (appModules["modules"] as any[]).unshift({
      entry: [moduleInfo.route || setupOptions.route],
      module: moduleName,
    });
  } else {
    (appModules["modules"] as any[]).push({
      entry: [moduleInfo.route || setupOptions.route],
      module: moduleName,
    });
  }

  fs.putJson(appDirectory + `/${appName}-modules.json`, appModules);
}
