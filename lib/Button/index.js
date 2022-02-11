'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Test() {
    return React__default["default"].createElement(React__default["default"].Fragment, null, "TEST");
}

var styles = {"name":"index_name__9etpH"};

console.log(styles, 'styles');
function Button(_a) {
    var name = _a.name;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("div", { className: 'name' },
            "Button11 ",
            name),
        React__default["default"].createElement(Test, null)));
}

module.exports = Button;
//# sourceMappingURL=index.js.map
