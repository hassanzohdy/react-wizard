import fs from "@flk/fs";
import { root, src } from "./../../helpers/paths";
import { CloneableModule, ModuleSetup } from "./../../helpers/types";
import addPermissions from "./add-permissions";
import addToSidebar from "./add-to-sidebar";
import appendToAppModules from "./append-to-app-modules";

export default function setupModule(
  moduleInfo: CloneableModule,
  modulePath: string
) {
  // first step: Copy module files

  // TODO: handle if setup.json file does not exist
  const setupOptions = fs.getJson(modulePath + "/setup.json") as ModuleSetup;

  const appName: string = moduleInfo.app || setupOptions.app;

  const moduleName: string =
    moduleInfo.saveAs ||
    setupOptions.saveAs ||
    moduleInfo.name ||
    setupOptions.name;

  // TODO: if app directory does not exist, then throw an error
  const appDirectory = src("apps", appName);

  const saveTo = src("apps", appName, moduleName);

  if (!fs.isDirectory(saveTo)) {
    fs.makeDirectory(saveTo);
  }

  fs.copy(modulePath + "/module", saveTo);

  // Second Step: add module to app modules
  appendToAppModules(
    moduleInfo,
    setupOptions,
    appName,
    moduleName,
    appDirectory
  );

  // Third Step: add permissions to permissions file
  addPermissions(moduleInfo, setupOptions, appName, moduleName, appDirectory);

  // Forth Step: add permissions to sidebar file
  addToSidebar(moduleInfo, setupOptions, appName, moduleName, appDirectory);
}
