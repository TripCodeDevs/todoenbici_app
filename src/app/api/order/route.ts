import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      type_project,
      fullname,
      email,
      phone,
      token,
      user,
      meeting_day,
      meeting,
      developer,
    } = await req.json();

    const response = await axios.post(
      "http://127.0.0.1:8000/order/create",
      {
        type_project,
        fullname,
        email,
        phone,
        meeting,
        meeting_day,
        developer,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data.message);
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { order_id, user_id, token } = await req.json();

    const response = await axios.delete(
      `http://127.0.0.1:8000/orders/remove/${user_id}/${order_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data.message);
  } catch (error) {
    return NextResponse.json("Error al eliminar orden");
  }
}
