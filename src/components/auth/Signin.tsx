"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useAuth } from "@/components/context/useSession";
import { useRouter } from "next/navigation";
import styles from "./forms.module.css";

function Signin() {
  const { setAuthData, user } = useAuth();
  const route = useRouter();

  const [data, setData] = useState({
    username_or_email: "",
    password: "",
    type_account: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeAccount = (type: string) => {
    setData((prev) => ({
      ...prev,
      type_account: type,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(data)
      const response = await axios.post("/api/auth/signin", data);
      console.log(response.data.message)
      if (response.data.token) {
        setAuthData(response.data);
        toast.success("Successfully logged in");
        setTimeout(() => {
          route.push("/dashboard");
        }, 3000);
      } else {
        toast.error("Unable to login");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Failed signin");
    }
  };

  if (user) {
    route.push("/dashboard");
  } else {
    return (
      <>
        <Toaster richColors />
        <div className={styles.boxTypeAccount}>
          <div className={styles.centerOpc}>
            <p onClick={() => handleTypeAccount("client")}>Cliente</p>
            <p onClick={() => handleTypeAccount("dev")}>Desarrollador</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username_or_email"
            placeholder="Username"
            onChange={handleChange}
            className={styles.inputForm}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={styles.inputForm}
          />

          <div className={styles.boxBtn}>
            <input className={styles.realBtn} type="submit" value="Ingresar" />
          </div>
        </form>
      </>
    );
  }
}

export default Signin;
