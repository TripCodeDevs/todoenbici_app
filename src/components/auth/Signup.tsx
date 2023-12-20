"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import styles from "./forms.module.css";

function Signup() {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    type_account: "client"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(data)
      const response = await axios.post("/api/auth/signup", data);
      toast.success(response.data.message);
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "/account/signin";
        }
      }, 3000);
    } catch (error) {
      toast.error("Failed registration");
    }
  };

  return (
    <>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={data.username}
          className={styles.inputForm}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
          className={styles.inputForm}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className={styles.inputForm}
        />

        <div className={styles.boxBtn}>
          <input className={styles.realBtn} type="submit" value="Registrar" />
        </div>
      </form>
    </>
  );
}

export default Signup;
