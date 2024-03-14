import Image from "next/image";

import React from "react";

const Logo = () => {
  return (
    <div>
      <Image src="/logo.png" alt="SkillUp Africa Logo" width={80} height={80} />
    </div>
  );
};

export default Logo;
