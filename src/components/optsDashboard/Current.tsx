"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useSession";
import CardOrders, { orderItems } from "../cards/cardOrders";
import styles from "./styles.module.css";

export const updateOrders = async (
  setOrders: React.Dispatch<React.SetStateAction<orderItems[]>>,
  user_id: string | undefined
) => {
  try {
    const response = await axios.post("/api/order/all", { user_id });
    const data = response.data;
    setOrders(data);
  } catch (error) {
    console.error("Error en la solicitud al servidor", error);
  }
};

function Current() {
  const [orders, setOrders] = useState<orderItems[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateOrders(setOrders, user?.detailsUser._id);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div className={styles.afterBoxOrder}>
      <h1 className={styles.activeOrdersTitle}>Ordenes activas</h1>
      {orders ? (
        <div className={styles.boxOrders}>
          {orders.map((order) => (
            <CardOrders key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <p>Loading dates...</p>
      )}
      {orders?.length == 0 ? <p>No orders</p> : null}
    </div>
  );
}

export default Current;
