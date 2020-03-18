"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAssetProxy = createAssetProxy;
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AssetProxy {
  constructor({
    url,
    file,
    path,
    field
  }) {
    _defineProperty(this, "url", void 0);

    _defineProperty(this, "fileObj", void 0);

    _defineProperty(this, "path", void 0);

    _defineProperty(this, "field", void 0);

    this.url = url ? url : window.URL.createObjectURL(file);
    this.fileObj = file;
    this.path = path;
    this.field = field;
  }

  toString() {
    return this.url;
  }

  async toBase64() {
    const blob = await fetch(this.url).then(response => response.blob());
    const result = await new Promise(resolve => {
      const fr = new FileReader();

      fr.onload = readerEvt => {
        var _readerEvt$target;

        const binaryString = ((_readerEvt$target = readerEvt.target) === null || _readerEvt$target === void 0 ? void 0 : _readerEvt$target.result) || '';
        resolve(binaryString.toString().split('base64,')[1]);
      };

      fr.readAsDataURL(blob);
    });
    return result;
  }

}

exports.default = AssetProxy;

function createAssetProxy({
  url,
  file,
  path,
  field
}) {
  return new AssetProxy({
    url,
    file,
    path,
    field
  });
}