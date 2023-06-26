"use client";

import { useState } from "react";
import google from "@/assets/google.svg";

import facebook from "@/assets/Facebook.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import signUp from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/signin";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebase_app from "@/firebase/firebase-config";

const Auth = () => {
  const auth = getAuth(firebase_app);
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signupHandler = async (event: any) => {
    event.preventDefault();
    try {
      const { result, error } = await signUp(email, password);
      if (error) {
        console.log(error);
        return;
      }
      console.log(result);
      router.push("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  const signinHandler = async (event: any) => {
    event.preventDefault();
    try {
      const { result, error } = await signIn(email, password);
      if (error) {
        console.log(error);
        return;
      }
      return router.push("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {}
  };

  // Sign in with Facebook
  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {}
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    setEmail("");
    setPassword("");
  };

  return (
    <section className="pt-[8rem] px-[1rem] text-black">
      <div>
        <h1 className="font-semibold text-[2rem]">Hello again!</h1>
        <p className="pt-[0.5rem] py-[1.5rem] text-[1.2rem] font-light tracking-wide">
          You've been missed...
        </p>
        <div>
          <div className="space-y-[1rem]">
            <input
              type="email"
              className="w-full h-[3.5rem] text-[1.2rem] font-light indent-5 rounded-xl border-[1px] border-[#979593]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full h-[3.8rem] text-[1.2rem] font-light indent-5  rounded-xl border-[1px] border-[#979593]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="pt-[0.8rem] font-[400] pb-[2rem]">Forgot password?</p>
        </div>
        <hr />
        <p className="bg-white w-[2rem] mx-auto text-center font-light text-[1.2rem] translate-y-[-1rem]">
          or
        </p>
        <div className="flex w-full justify-center gap-[1rem]">
          <button
            onClick={signInWithGoogle}
            className="bg-white w-full border-[1px] border-gray-300 py-[1rem] rounded-xl"
          >
            <Image src={google} alt="google" className="mx-auto" />
          </button>
          <button
            onClick={signInWithFacebook}
            className="bg-[#1877F2] w-full py-[1rem] rounded-xl"
          >
            <Image src={facebook} alt="facebook" className="mx-auto" />
          </button>
        </div>
        <div className="space-y-[0.7rem] translate-y-[80%]">
          {mode === "signin" ? (
            <button
              onClick={signinHandler}
              className="bg-[#FFC529] w-full py-[0.7rem] text-[1.1rem] rounded-2xl"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={signupHandler}
              className="bg-white border-2 py-[0.7rem] text-[1.1rem] rounded-2xl border-[#FFC529] text-[#FFC529] w-full"
            >
              Create an account
            </button>
          )}
          <button
            onClick={() =>
              handleModeChange(mode === "signin" ? "signup" : "signin")
            }
            className="bg-white border-2 py-[0.7rem] text-[1.1rem] rounded-2xl border-[#FFC529] text-[#FFC529] w-full"
          >
            {mode === "signin" ? "Create an account" : "Sign In"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
