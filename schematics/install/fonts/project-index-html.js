"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const architect_options_1 = require("../../utils/architect-options");
/** Looks for the index HTML file in the given project and returns its path. */
function getIndexHtmlPath(project) {
    const buildOptions = architect_options_1.getArchitectOptions(project, 'build');
    if (!buildOptions.index) {
        throw new schematics_1.SchematicsException('No project "index.html" file could be found.');
    }
    return buildOptions.index;
}
exports.getIndexHtmlPath = getIndexHtmlPath;
//# sourceMappingURL=project-index-html.js.map