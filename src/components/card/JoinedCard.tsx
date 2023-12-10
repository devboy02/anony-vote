import React from "react";
import VerifiedIcon from "@/components/icons/VerifiedIcon";
import Link from "next/link";
import { Dao } from "@/types";
import DaoABI from "@/abi/Dao.json";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

const JoinedCard = ({ name, contractAddress, members }: Dao) => {
  const { address: account } = useAccount();
  const isJoined = members.find((member) => member.address === account);

  const { config: joinConfig } = usePrepareContractWrite({
    address: contractAddress as any,
    abi: DaoABI.abi as any,
    functionName: "requestToJoin",
  });
  const { writeAsync: joinDao } = useContractWrite(joinConfig);

  const join = async () => {
    if (!isJoined) {
      await joinDao?.();
    }
  };
  return (
    <div className={"w-[296px] rounded-3xl h-[282px] flex flex-col items-center p-[28px] pb-[22px] bg-[#F5EDE6]"}>
      <img
        src="https://s3.coinmarketcap.com/static/img/portraits/6310a2776eac787c457a1f09.png"
        alt=""
        className={"w-[96px] aspect-square rounded-full"}
      />
      <div className={"mt-[20px] flex flex-col items-center gap-[4px]"}>
        <div className={"flex items-center gap-[6px]"}>
          <Link href={`/dao/${contractAddress}`} className={"text-[20px] font-medium text-black leading-[20px]"}>
            {name}
          </Link>
          <VerifiedIcon className={"opacity-50 mix-blend-mode-darken"} />
        </div>
        <div className={"flex items-center gap-[12px]"}>
          <div className="flex -space-x-[8px]">
            {[...Array(members.length).keys()].slice(0, 2).map((i) => (
              <img
                key={i}
                className="w-[28px] aspect-square border-2 rounded-full border-[#F5EDE6]"
                src="/examplepp.png"
                alt=""
              />
            ))}
          </div>
          <p className={"text-[15px] text-black opacity-50 mix-blend-mode-darken"}>{members.length} members</p>
        </div>
      </div>
      <button
        onClick={!isJoined ? () => join() : undefined}
        className={
          "mt-auto border border-black/[5%] text-[17px] px-[20px] py-[8px] leading-[24px] rounded-full font-semibold"
        }
      >
        {isJoined ? "Joined" : "Join"}
      </button>
    </div>
  );
};

export default JoinedCard;
