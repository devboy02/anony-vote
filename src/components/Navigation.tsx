import React from "react";
import Link from "next/link";
import HomeIcon from "@/components/icons/HomeIcon";
import ExploreIcon from "@/components/icons/ExploreIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";

import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav
      className={"h-[calc(100vh-92px)] w-[256px] fixed top-[92px] left-0  flex flex-col gap-[32px] pl-[48px] pt-[16px]"}
    >
      <Link href={"/"} className={"flex items-center gap-[16px]"}>
        <HomeIcon className={"w-[28px] h-[28px]"} />
        <p className={"text-xl"}>Home</p>
      </Link>
      <Link href={"/explore"} className={"flex items-center gap-[16px]"}>
        <ExploreIcon className={"w-[28px] h-[28px]"} />
        <p className={"text-xl"}>Explore</p>
      </Link>
      <Link href={"/profile"} className={"flex items-center gap-[16px]"}>
        <ProfileIcon className={"w-[28px] h-[28px]"} />
        <p className={"text-xl"}>Profile</p>
      </Link>
    </nav>
  );
};

export default Navigation;
