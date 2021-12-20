export type Wizard = {
  /**
   * Cloneables command options
   */
  cloneables?: Cloneable;
  /**
   * Logging options
   */
  logging?: Logging;
};

export type Cloneable = {
  /**
   * Base url for all modules that can be used with the `path` attribute instead of adding `url`
   */
  baseUrl?: string;
  /**
   * Cloned modules list
   */
  modules?: CloneableModule[];
};

export type CloneableModule = ModuleSetup & {
  /**
   * Module name
   */
  name: string;
  /**
   * Download url
   */
  url?: string;
  /**
   * If `baseUrl` key is defined, then you can add the path instead of url
   */
  path?: string;
};

/**
 * Logging Mode
 *
 * `json` will be stored in array of objects that contains current logging
 * `log` will be stored in a `.log` file as normal text
 */
export type LoggingMode = "json" | "log";

export type Logging = {
  /**
   * Enable/Disable Logging
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Logging mode as
   *
   * @default json
   */
  as?: LoggingMode;
};

export type ModuleSetup = {
  /**
   * Module name
   */
  name: string;
  /**
   * Save module as
   */
  saveAs?: string;
  /**
   * Module version
   */
  version?: string;
  /**
   * Save module in app
   */
  app: string;
  /**
   * Path of the module in the app
   */
  route?: string;
  /**
   * Append options list
   */
  appendTo?: {
    /**
     * If set to true, then a sidebar option can be added in app/helpers/sidebar.ts file.
     * If set as string, then this will be marked as true and
     * will define the sidebar path that will contain the sidebar options data.
     * If set to false, neglect sidebar options.
     *
     * @default true
     */
    sidebar?: string | boolean;
    /**
     * If set to true, then a permission option can be added in app/helpers/permissions.ts file.
     * If set as string, then this will be marked as true and
     * will define the permission path that will contain the permission options data.
     * If set to false, neglect permission options.
     *
     * @default true
     */
    permissions?: string | boolean;
    /**
     * If set to `prepend`, then module will be injected in app-modules.json at the start of the modules array.
     * If set to `append`, then module will be injected in app-modules.json at the end of the modules array.
     * If set to `false`, then neglect adding it in the app modules list
     * If set to `true`, behave as default.
     *
     * @default prepend
     */
    appModule?: "append" | "prepend" | boolean;
  };
};
