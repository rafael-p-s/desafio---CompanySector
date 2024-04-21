import React from "react";
import styles from "./index.module.css";
export function NavBar(props) {
  return (
    <>
      <div className={styles.NavBar}>
        <h1>{props.children}</h1>
      </div>
    </>
  );
}
