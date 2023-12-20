"use client"

import Signup from "@/components/auth/Signup";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/context/useSession";
import { useRouter } from "next/navigation";

function SignupPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (user) {
    return (
      <>
        <Signup />
        <p>Already have an account? <Link href='/account/signup'>Signin</Link></p>
      </>
    );
  } else {
    router.push("/dashboard")
  }
}

export default SignupPage;
