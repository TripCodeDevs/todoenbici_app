import React, { useState, FormEvent } from "react";
import { toast, Toaster } from "sonner";
import styles from "./create.module.css";
import axios from "axios";
import { useAuth } from "../context/useSession";

interface UpdateOrdersProps {
  updateOrders: () => void;
}

function CreateOrder({ updateOrders }: UpdateOrdersProps) {
  const [fullname, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [description, setDescription] = useState("");
  // const [pdf_file, setFile] = useState<File | null>(null);
  const [type_project, setProjectType] = useState("");
  const [errorValidates, setErrorValidate] = useState("")

  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = user?.token;
    const id = user?.detailsUser._id;
    const email = user?.detailsUser.email;

    try {
      const formData = {
        type_project,
        fullname,
        email,
        phone,
        // pdf_file,
        token,
        user: id,
      };

      const response = await axios.post("/api/order", formData);
      toast.success(response.data);
      updateOrders();
    } catch (error) {
      console.log(error);
      toast.error("Error when requesting order");
    }
  };
  return (
    <>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>Elije el servicio que mas se adapte a tu necesidad</p>
        <div className={styles.selectedType}>
          <div className={styles.centerSelected}>
            <p
              className={
                type_project == "Desarrollo de marca"
                  ? styles.select
                  : styles.btnOpt
              }
              onClick={() => {
                setProjectType("Desarrollo de marca");
              }}
            >
              Desarrollo de marca
            </p>
            <p
              onClick={() => {
                setProjectType("Marketing Digital");
              }}
              className={
                type_project == "Marketing Digital"
                  ? styles.select
                  : styles.btnOpt
              }
            >
              Marketing Digital
            </p>
            <p
              className={
                type_project == "Desarrollo de software"
                  ? styles.select
                  : styles.btnOpt
              }
              onClick={() => {
                setProjectType("Desarrollo de software");
              }}
            >
              Desarrollo de software
            </p>
          </div>
        </div>
        <div className={styles.inputBox}>
          <div className={styles.centerForm}>
            <input
              className={styles.input_field}
              type="text"
              required
              value={fullname}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              name="name"
            />
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input_field}
              type="text"
              required
              // value={user?.detailsUser.email}
              name="email"
              placeholder="Email"
            />
          </div>
          <div className={styles.inputBox}>
            <input
              className={styles.input_field}
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              placeholder="Numero Telefonico"
            />
          </div>
          <div className={styles.inputBoxFile}>
            <p>
              Adjunte información sobre su idea o el problema que necesita
              resolver con nuestros servicios
            </p>
            <div className={styles.inputFiles}>
              <input
                type="file"
                name="resumen"
                // onChange={(e) => {
                //   const selectedFile = e.target.files
                //     ? e.target.files[0]
                //     : null;
                //   // setFile(selectedFile);
                // }}
              />
            </div>
          </div>
        </div>
        <div className={styles.boxBtnSubmit}>
          <button type="submit">Solicitar Cita</button>
        </div>
      </form>
    </>
  );
}

export default CreateOrder;
