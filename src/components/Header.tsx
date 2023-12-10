"use client";

import React from "react";
import LoginButton from "./button/LoginButton";
import { useState } from "react";
import { UserStatus } from "@/interface";


const Header = () => {
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.LOGGED_OUT);

  return (
    <header className="flex z-[2] w-full min-h-[92px] items-center justify-between px-[48px] fixed top-0 left-0 bg-[#FAF5F0] ">
      <img src="/logo.svg" alt="logo" />
      <LoginButton setUserStatus={setUserStatus}/>
    </header>
  );
};

export default Header;
