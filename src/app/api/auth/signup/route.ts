import axios from "axios";
import { NextResponse } from "next/server";

interface reqProps {
  username: string;
  password: string;
  email: string;
  type_account: string;
}

export async function POST(req: Request) {
  try {
    const { username, password, email, type_account }: reqProps = await req.json();

    console.log(username, password, email, type_account);

    if (type_account == "client") {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signup/client",
        {
          username,
          password,
          email,
        }
      );

      return NextResponse.json({"message": response.data.message, data: response.data});
    } else if (type_account == "dev") {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signup/developer",
        {
          username,
          password,
          email,
        }
      );

      return NextResponse.json(response.data);
    }
  } catch (error) {
    console.error(error);
  }
}
