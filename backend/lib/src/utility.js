"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const enums_1 = require("../enums");
const util = require('util');
const tcpPortUsed = require('tcp-port-used');
const writeTemplate = require('./template');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);
const writeFile = util.promisify(require('fs').writeFile);
function getAngular2JsonPath() {
    return path.join(process.cwd(), "/../../", 'angular-cli.json');
}
exports.getAngular2JsonPath = getAngular2JsonPath;
function getAngular5JsonPath() {
    return path.join(process.cwd(), "/../../", 'angular.json');
}
exports.getAngular5JsonPath = getAngular5JsonPath;
function createConfigJSonFileIfNotPresent() {
    let localConfigPath = getLocalConfigFilePath();
    let isPresent = fs.existsSync(localConfigPath);
    if (!isPresent)
        fs.writeFileSync(localConfigPath, "");
}
exports.createConfigJSonFileIfNotPresent = createConfigJSonFileIfNotPresent;
function getLocalConfigFilePath() {
    // console.log("local config path :", path.join(process.cwd(), 'ng-bubble-local.json') );
    return path.join(process.cwd(), 'ng-bubble-local.json');
}
exports.getLocalConfigFilePath = getLocalConfigFilePath;
function getGlobalConfigFilePath() {
    return path.join(__dirname, "/../../", 'ng-bubble-global.json');
}
exports.getGlobalConfigFilePath = getGlobalConfigFilePath;
function runAppOnFreePort(app, port, ctrl) {
    return __awaiter(this, void 0, void 0, function* () {
        let inUse = yield tcpPortUsed.check(port, '127.0.0.1');
        while (inUse) {
            console.log(`Port ${port} is in use, trying ${port + 1}`);
            inUse = yield tcpPortUsed.check(++port, '127.0.0.1');
        }
        writeTemplate(port, ctrl);
        app.listen(port, function () {
            console.log('ng-bubble is Running on port ' + port);
            console.log("Please make sure to add following script into your index.html");
            console.log(`
        <script async src="http://localhost:${port}/assets/js/client.js"></script>
    `);
        });
    });
}
exports.runAppOnFreePort = runAppOnFreePort;
/*todo: redundant arguments*/
function openInIde(path, currentIde, codeText, data, lineNumber = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (data) lineNumber = await lineToOpen(path, data);
        let ideCmd = currentIde === enums_1.EIdeNames.WEBSTORM ? 'webstorm.exe' : `code -g`;
        yield exec(`${ideCmd} ${path}:${lineNumber ? lineNumber : ""}`);
    });
}
exports.openInIde = openInIde;
function getFileContent(path) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent;
        try {
            fileContent = yield readFile(path);
            return fileContent.toString();
        }
        catch (e) {
            console.log(e);
        }
        return fileContent;
    });
}
exports.getFileContent = getFileContent;
function setFileContent(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent;
        try {
            return yield writeFile(path, data);
        }
        catch (e) {
            console.log(e);
        }
        return null;
    });
}
exports.setFileContent = setFileContent;
function getLineNumberOfTextInFile(path, codeText) {
}
function exactMatchedFileIndex(foundItems, searchTerm) {
    // {folders: folders, files: files}
    let angularSuffix = '.component.html';
    let ionicSuffix = '.page.html';
    return foundItems.files.findIndex((file) => file.name === searchTerm + angularSuffix || file.name === searchTerm + ionicSuffix);
}
exports.exactMatchedFileIndex = exactMatchedFileIndex;
function areTwoSetsEqual(a, b) {
    return a.size === b.size && [...a].every(value => b.has(value));
}
exports.areTwoSetsEqual = areTwoSetsEqual;
//# sourceMappingURL=utility.js.map