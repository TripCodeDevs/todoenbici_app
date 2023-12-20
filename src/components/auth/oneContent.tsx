import { main } from "@cloudinary/url-gen/qualifiers/videoCodecProfile";
import React, { useState } from "react";
import styles from "./oneContent.module.css";
import Image from "next/image";

import logoTripCode from "@/assets/logo-tripcode.png";
import Signin from "./Signin";
import Signup from "./Signup";

function OneContent() {
  const [selectLogin, setSelectLogin] = useState("signin");
  return (
    <>
      <main className={styles.main}>
        <div className={styles.centerDiv}>
          <div className={styles.headerLogin}>
            <div className={styles.boxImageLogo}>
              <Image
                className={styles.logoIcon}
                src={logoTripCode}
                alt="logo"
              />
            </div>
            <p>Accede a nuestros servicios</p>
          </div>
          <div className={styles.optionAccess}>
            <div className={styles.btnsCenter}>
              <p
                className={
                  selectLogin == "signin"
                    ? styles.btnInitSelected
                    : styles.btnInit
                }
                onClick={() => setSelectLogin("signin")}
              >
                Iniciar Sesion
              </p>
              <p
                className={
                  selectLogin == "signup"
                    ? styles.btnregisterSelected
                    : styles.btnregister
                }
                onClick={() => setSelectLogin("signup")}
              >
                Crear Cuenta
              </p>
            </div>
          </div>
          {selectLogin == "signin" ? <Signin /> : null}
          {selectLogin == "signup" ? <Signup /> : null}
        </div>
      </main>
    </>
  );
}

export default OneContent;
