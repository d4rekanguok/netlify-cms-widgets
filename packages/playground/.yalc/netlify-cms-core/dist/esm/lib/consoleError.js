"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = consoleError;

function consoleError(title, description) {
  console.error("%c \u26D4 ".concat(title, "\n") + "%c".concat(description, "\n\n"), 'color: black; font-weight: bold; font-size: 16px; line-height: 50px;', 'color: black;');
}