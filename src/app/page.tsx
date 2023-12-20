import Navbar from "@/components/navbar/NavBar";
import styles from "./page.module.css";
import Image from "next/image";

import {
  HiLightBulb,
  HiAnnotation,
  HiPresentationChartBar,
  HiStatusOnline,
} from "react-icons/hi";

import whiteScreen from "@/assets/WhiteScreen.webp";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import CardSteps from "@/components/cards/cardSteps";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className={styles.banner}>
        <div className={styles.partText}>
          <div className={styles.subPartText}>
            <p className={styles.subSlogan}>
              Clean and scalable code for your software
            </p>
            <p className={styles.slogan}>
              Ready to take your company or startup to the next level? Our
              software development expertise is your competitive advantage.{" "}
            </p>
            <div className={styles.boxBtn}>
              <Link className={styles.btnVisit} href="/dashboard">
                <p>Get Started</p>
                <div className={styles.boxIcon}>
                  <BsArrowRightShort />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.partImg}>
          <Image
            src={whiteScreen}
            className={styles.imgWhiteScreen}
            alt="WhiteScreen"
          />
        </div>
      </main>

      {/* <InfiniteSlider /> */}

      <main className={styles.mainInfo}>
        <div className={styles.boxcards}>
          <p className={styles.secondTitle}>Easy to Use Platform</p>
          <div className={styles.carrousel}>
            <div className={styles.subCarrousel}>
              <CardSteps
                text="We believe in the magic of ideas. Do you have a vision for a new startup or a business challenge that only software can solve? We'd love to hear about it."
                img=<HiLightBulb className={styles.icon} size={50} />
              />

              <CardSteps
                text="Contact us and share the details of your project. Our team of software development experts will verify your request and, once approved, a group of dedicated developers will be assigned to your cause."
                img=<HiAnnotation className={styles.icon} size={50} />
              />

              <CardSteps
                text="Together, we will create a custom plan to bring your vision to life. Every line of code and every design will be customized to meet your needs and exceed your expectations."
                img=<HiPresentationChartBar className={styles.icon} size={50} />
              />

              <CardSteps
                text="Keep full track of the development of your project. You will meet the talented professionals working on your application and you will be in constant communication to ensure that everything is to your liking."
                img=<HiStatusOnline className={styles.icon} size={50} />
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
