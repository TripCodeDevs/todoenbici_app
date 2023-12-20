import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { username_or_email, password, type_account } = await req.json();
    console.log({ username_or_email, password, type_account})

    if (type_account == "client") {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signin/client",
        {
          username_or_email,
          password,
        }
      );

      const token = await response.data.token;
      console.log(token)

      if (token) {
        const detailsUser = await axios.post(
          "http://127.0.0.1:8000/auth/verify/token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return NextResponse.json({ token, detailsUser: detailsUser.data });
      }
    } else if (type_account == "dev") {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signin/developer",
        {
          username_or_email,
          password,
        }
      );

      const token = response.data.token;

      if (token) {
        const detailsUser = await axios.post(
          "http://127.0.0.1:8000/auth/verify/token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return NextResponse.json({ token, detailsUser: detailsUser.data });
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error al conectar login" });
  }
}
