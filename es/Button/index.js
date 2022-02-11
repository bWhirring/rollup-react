import React from 'react';

function Test() {
    return React.createElement(React.Fragment, null, "TEST");
}

var styles = {"name":"index_name__9etpH"};

console.log(styles, 'styles');
function Button(_a) {
    var name = _a.name;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'name' },
            "Button11 ",
            name),
        React.createElement(Test, null)));
}

export { Button as default };
//# sourceMappingURL=index.js.map
