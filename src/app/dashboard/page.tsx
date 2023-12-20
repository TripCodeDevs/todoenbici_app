"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/context/useSession";
import styles from "./page.module.css";
import CreateOrder from "@/components/forms/createOrder";
import Navbar from "@/components/navbar/NavBar";
import Current from "@/components/optsDashboard/Current";
import History from "@/components/optsDashboard/History";
import Draft from "@/components/optsDashboard/Draft";
import axios from "axios";

function Dashboard() {
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [orders, setOrders] = useState([])
  const user_id: string | undefined = user?.detailsUser._id;

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const updateOrders = async () => {
    try {
      const response = await axios.post("/api/order/all", {user_id})
      const data = response.data
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  if (user?.detailsUser.status == "authenticated") {
    return (
      <>
        <Navbar />
        <div className={openForm ? styles.boxCreateTrue : styles.boxCreate}>
          <div className={styles.subBoxCreate}>
            <div className={styles.btnOpen} onClick={handleOpenForm}>
              {!openForm ? (
                <div>
                  <p>New Order</p>
                </div>
              ) : (
                <>
                  <div className={styles.introForm}>
                    <h2 className={styles.titleForm}>
                      Create your software with the best developers
                    </h2>
                    <p className={styles.subtitle}>
                      Once the order is created, you have to wait for a
                      developer to take charge of your project and he will
                      schedule an appointment for a virtual meeting.
                    </p>
                    <div className={styles.btns}>
                      <div className={styles.subBtns}>
                        <div
                          className={styles.btnCancelForm}
                          onClick={handleOpenForm}
                        >
                          Cancel Order
                        </div>
                        <div className={styles.btnSaveDraft}>Save in draft</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {openForm ? (
            <div className={styles.subBoxCreate}>
              <CreateOrder updateOrders={updateOrders} />
            </div>
          ) : null}
        </div>
        <Current />
      </>
    );
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/account/signin";
    }
  }
}

export default Dashboard;
