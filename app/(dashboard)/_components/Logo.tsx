import Image from "next/image";
import Link from "next/link";

import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className=" h-[35px] flex justify-center items-center flex-col">
        <Image
          src="/logo.png"
          alt="SkillUp Africa Logo"
          width={80}
          height={80}
        />
      </div>
    </Link>
  );
};

export default Logo;
