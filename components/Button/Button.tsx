// @ts-nocheck
import React from "react";
import styles from "./index.less";

console.log(styles, "===");

export default function Button({ name }: { name: string }): JSX.Element {
  return <div className="name">Button hello {name}</div>;
}
