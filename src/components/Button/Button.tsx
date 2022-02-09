import React from "react";
import styles from "./style/Button.less";

console.log(styles, React, "ReactReact1");

export default function Button({ name }: { name: string }): JSX.Element {
  return <>Button hello {name}</>;
}
