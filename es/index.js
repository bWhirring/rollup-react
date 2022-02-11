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

function Alert(_a) {
    var age = _a.age;
    return React.createElement(React.Fragment, null,
        "Alert ",
        age);
}

export { Alert, Button };
//# sourceMappingURL=index.js.map
