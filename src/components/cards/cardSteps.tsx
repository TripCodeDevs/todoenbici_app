import React, { ReactNode } from "react";
import styles from "./card.module.css";

interface CardProps {
  img: ReactNode;
  text: string;
}

function CardSteps(props: CardProps) {
  const { img, text } = props;
  return (
    <div className={styles.card}>
      <div className={styles.imgCard}>
        <div className={styles.under}>{img}</div>
      </div>
      <p className={styles.textContent}>{text}</p>
    </div>
  );
}

export default CardSteps;
