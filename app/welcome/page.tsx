"use client";

import Welcome from "@/components/Welcome";
import { useAuthContext } from "@/firebase/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WelcomePage = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);
  return <Welcome />;
};

export default WelcomePage;
