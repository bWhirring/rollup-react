import React from "react";
import "./index.less";

export default function Button({ name }: { name: string }): JSX.Element {
  return <div className="name">Button hello {name}</div>;
}
