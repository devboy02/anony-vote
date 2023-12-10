"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JoinedCard from "@/components/card/JoinedCard";
import { Dao, DaoConfig, Member, Proposal } from "@/types";
import { readContracts, useAccount } from "wagmi";
import axios from "axios";
import DaoABI from "@/abi/Dao.json";
import WorldcoinIcon from "@/components/icons/WorldcoinIcon";
// import { useLogin } from "@lens-protocol/react";

const Page = () => {
  const [daos, setDaos] = useState<Dao[]>([]);
  const { address: account } = useAccount();
  useEffect(() => {
    const getDaos = async () => {
      const daosResult = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/daos`);
      const daos: Dao[] = await Promise.all(
        daosResult.data.map(async (dao: DaoConfig) => {
          const methods = ["proposalCount", "memberCount"];
          const [{ result: proposalCount }, { result: memberCount }] = await readContracts({
            contracts: methods.map((method) => ({
              abi: DaoABI.abi as any,
              address: dao.contractAddress as `0x${string}`,
              functionName: method,
            })),
          });
          const proposals: Proposal[] = await Promise.all(
            [...Array(Number(proposalCount!)).keys()].map(async (proposalId) => {
              const [{ result }] = await readContracts({
                contracts: [
                  {
                    abi: DaoABI.abi as any,
                    address: dao.contractAddress as `0x${string}`,
                    functionName: "proposals",
                    args: [proposalId],
                  },
                ],
              });
              return {
                id: Number(result?.[0]),
                name: result?.[1],
                description: result?.[2],
                document: result?.[3],
                createTime: result?.[4].toString(),
                startTime: result?.[5].toString(),
                endTime: result?.[6].toString(),
                status: Number(result?.[7]),
                requester: result?.[8],
                dao: result?.[9],

                speakers: result?.[10],
                moderators: result?.[11],
              } as Proposal;
            })
          );
          const members: Member[] = await Promise.all(
            [...Array(Number(memberCount!)).keys()].map(async (memberId) => {
              const [{ result }] = await readContracts({
                contracts: [
                  {
                    abi: DaoABI.abi as any,
                    address: dao.contractAddress as `0x${string}`,
                    functionName: "getMemberFromId",
                    args: [memberId],
                  },
                ],
              });

              return {
                address: result?.[0],
                userType: Number(result?.[1]), //0 - member, 1 - moderator, 2 - council
                level: Number(result?.[2]),
                status: Number(result?.[3]), //active, waiting approval , banned
                createTime: result?.[4].toString(),
                updateTime: result?.[5].toString(),
              } as Member;
            })
          );

          return {
            ...dao,
            proposals,
            members,
          };
        })
      );
      setDaos(daos);
    };

    getDaos();
  }, []);

  const userDaos = daos.filter((dao) => dao.members.find((member) => member.address === account));
  const joinedDaosCards = userDaos.map((dao) => <JoinedCard {...dao} />);

  // LENS PROTOCOL

  /* const { execute, loading, data: lensData, error } = useLogin();

  const loginWithLens = (profileId: any) => {
    execute({
      address: account,
      profileId: profileId,
    });
  }; */

  // @ts-ignore
  return (
    <div className={"min-h-screen w-full max-w-[928px]  mx-auto flex flex-col pt-[96px]"}>
      <div className={"flex gap-[20px] h-[144px]"}>
        <img src="/examplepp.png" alt="example" className={"w-[144px] h-[144px] rounded-full"} />
        <div className={"flex flex-col gap-[20px]"}>
          <Select>
            <SelectTrigger className="outline-none text-[32px] border-none bg-transparent font-medium">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className={"z-[999]"}>
              <SelectItem value="test">
                <p>name.eth </p>
              </SelectItem>{" "}
              <SelectItem value="test2">
                <p>name.eth </p>
              </SelectItem>
              <SelectItem value="test3">
                <p>name.eth </p>
              </SelectItem>
            </SelectContent>
          </Select>
          <div className={"flex items-center gap-[32px]"}>
            <div className={"bg-white px-[28px] py-[14px] flex w-fit rounded-full items-center gap-[8px]"}>
              <div className={"bg-green-400 rounded-full w-[12px] aspect-square"} />
              <p>4.25 dots</p>
            </div>
            <div className={"flex items-center gap-[8px]"}>
              <button className={"bg-white px-[28px] py-[14px] flex w-fit rounded-full items-center gap-[8px]"}>
                <WorldcoinIcon />
                Verify Via World ID
              </button>
              {/*               <button onClick={!lensData ? loginWithLens : undefined} className={"bg-white px-[28px] py-[14px] flex w-fit rounded-full items-center gap-[8px]"}>
                {lensData ? `Logged in as ${lensData.profile.id}` : "Verify Via Lens"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className={"w-full flex flex-col gap-[32px] mt-[64px]"}>
        <p className={"text-[24px] leading-[32px] font-semibold text-black/50 pl-[28px]"}>Joined DAOs</p>
        <div className={"flex gap-[8px] flex-wrap "}>{joinedDaosCards}</div>
      </div>
    </div>
  );
};

export default Page;
