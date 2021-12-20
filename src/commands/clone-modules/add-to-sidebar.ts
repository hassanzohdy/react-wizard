import fs from "@flk/fs";
import { toCamelCase } from "@mongez/reinforcements";
import { CloneableModule, ModuleSetup } from "./../../helpers/types";
import * as path from "path";

export default function addToSidebar(
  moduleInfo: CloneableModule,
  setupOptions: ModuleSetup,
  appName: string,
  moduleName: string,
  appDirectory: string
) {
  // check if sidebar is enabled
  if (
    moduleInfo?.appendTo?.sidebar === false ||
    setupOptions?.appendTo?.sidebar === false
  )
    return;

  let SidebarPath =
    moduleInfo?.appendTo?.sidebar || setupOptions?.appendTo?.sidebar;

  if (SidebarPath === true) {
    SidebarPath = "helpers/sidebar.ts";
  }

  let fullSidebarPath = path.resolve(appDirectory, SidebarPath as string);

  // TODO: check if file exists
  let SidebarFileContent = fs.get(fullSidebarPath) as string;

  const sidebarImportName = `${toCamelCase(moduleName)}Sidebar`;

  const importStatement = `import ${sidebarImportName} from "apps/${appName}/${SidebarPath!.replace(
    /.ts|.js|.tsx|.jsx$/,
    ""
  )}";`;

  if (SidebarFileContent.includes(importStatement)) return;

  SidebarFileContent = SidebarFileContent.replace(
    "// imports, DO NOT remove this line",
    `${importStatement}
// imports, DO NOT remove this line
`
  );
  SidebarFileContent = SidebarFileContent.replace(
    "// contents, DO NOT remove this line",
    `${sidebarImportName},
    // contents, DO NOT remove this line`
  );

  fs.put(fullSidebarPath, SidebarFileContent);
}
