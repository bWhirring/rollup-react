'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Button(_a) {
  var name = _a.name;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "name"
  }, "Button hello ", name);
}

exports.Button = Button;
