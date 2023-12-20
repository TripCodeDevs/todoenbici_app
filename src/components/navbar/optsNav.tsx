import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const handleLogout = () => {
  sessionStorage.removeItem("userData");
  window.location.reload();
};

function OptsNav() {
  return (
    <>
      <Link href="/developers" className={styles.login}>
        Working with us
      </Link>
      <Link href="/dashboard" className={styles.login}>
        Dashboard
      </Link>
      <div onClick={handleLogout} className={styles.login}>
        Logout
      </div>
    </>
  );
}

export default OptsNav;
