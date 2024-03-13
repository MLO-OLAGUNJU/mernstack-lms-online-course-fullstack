import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" h-full w-full pt-20">
      <div className="h-[80%] w-[80%] m-auto flex items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
