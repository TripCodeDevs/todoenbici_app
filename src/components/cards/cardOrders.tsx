import React from "react";
import styles from "./card.module.css";
import {
  CiGrid31,
  CiTrash,
  CiEdit,
  CiRoute,
  CiCircleInfo,
  CiCircleCheck,
} from "react-icons/ci";
import axios from "axios";
import { useAuth } from "../context/useSession";
import { toast } from "sonner";

export interface orderItems {
  type_project: string;
  fullname: string;
  email: string;
  phone: string;
  meeting: string;
  meeting_day: string;
  status: string;
  developer: string;
  user: string;
  _id: string;
}

interface OrderCardProps {
  order: orderItems;
}

function CardOrders({ order }: OrderCardProps) {
  const { user } = useAuth();

  const handleDeleteOrder = async () => {

    const response = await axios.delete(
      `http://127.0.0.1:8000/order/remove/${user?.detailsUser._id}/${order._id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (response.status == 200) {
      toast.success("Eliminado exitosamente");
    } else {
      toast.error("Error al eliminar");
    }
  };

  return (
    <>
      <div className={styles.boxOrderItems}>
        <div className={styles.headerCard}>
          <div className={styles.title_header}>
            <CiGrid31 />
            <p>{order.type_project}</p>
          </div>
          <div className={styles.boxStatus}>
            <div className={styles.boxStatusText}>
              {order.status == "In Progress" ? (
                <CiCircleInfo className={styles.statusIconWait} />
              ) : (
                <CiCircleCheck className={styles.statusIconOk} />
              )}
            </div>
            <p className={styles.textStatus}>{order.status}</p>
          </div>
        </div>
        <p>Order_Id : {order._id}</p>
        <p>Meeting : {order.meeting}</p>
        <p>Meeting Day : {order.meeting_day}</p>
        <p>Developer : {order.developer}</p>

        <div className={styles.boxActions}>
          <div className={styles.subBoxActions}>
            <div
              className={styles.actionBtnDelete}
              onClick={() => handleDeleteOrder}
            >
              <div className={styles.centerBtn}>
                <div className={styles.boxIcon}>
                  <CiTrash />
                </div>
                <p>Delete</p>
              </div>
            </div>
            <div className={styles.actionBtnEdit}>
              <div className={styles.centerBtn}>
                <div className={styles.boxIcon}>
                  <CiEdit />
                </div>
                <p>Modify</p>
              </div>
            </div>
            <div className={styles.actionBtnProcess}>
              <div className={styles.centerBtn}>
                <div className={styles.boxIcon}>
                  <CiRoute />
                </div>
                <p>Process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOrders;
