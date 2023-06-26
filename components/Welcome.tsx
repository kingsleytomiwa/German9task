import Image from "next/image";
import icon from "@/assets/icon.svg";

const Welcome = () => {
  return (
    <div className="bg-white h-screen text-black pt-[9rem] mx-[1rem]">
      <div className="mx-auto space-y-[1rem]">
        <Image src={icon} alt="icon" className="mx-auto" />
        <h1 className="text-center font-semibold text-[1.9rem]">
          Congratulations!
        </h1>
        <p className="text-[1.2rem] font-light tracking-wide text-center px-[2rem] leading-[1.5rem]">
          You have successfully authenticated. Are you ready to see yor profile?
        </p>
      </div>
      <button className="bg-[#FFC529] w-full translate-y-[20rem] py-[0.7rem] text-[1.1rem] rounded-2xl">
        Open my Profile
      </button>
    </div>
  );
};

export default Welcome;
