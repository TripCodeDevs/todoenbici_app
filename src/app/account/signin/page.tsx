"use client";

import Signin from "@/components/auth/Signin";
import OneContent from "@/components/auth/oneContent";
import { useAuth } from "@/components/context/useSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function SigninPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <>
        <OneContent />
      </>
    );
  } else {
    router.push("/dashboard");
  }
}

export default SigninPage;
