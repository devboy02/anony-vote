"use client";

import UpcomingCard from "@/components/card/UpcomingCard";
import JoinedCard from "@/components/card/JoinedCard";
import { Dao, DaoConfig, Member, Proposal } from "@/types";
import { readContracts, useAccount } from "wagmi";
import axios from "axios";
import DaoABI from "@/abi/Dao.json";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProposalCard from "@/components/card/ProposalCard";


export default function Home() {
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

  console.log("daos", daos);

  const userDaos = daos.filter((dao) => dao.members.find((member) => member.address === account));
  const proposals = userDaos.map((dao) => dao.proposals).flat();
  const activeProposals = proposals.filter(
    (proposal) => +proposal.startTime * 1000 < Date.now() && +proposal.endTime * 1000 > Date.now()
  );
  const upcomingProposals = proposals.filter((proposal) => +proposal.startTime * 1000 > Date.now());

  const activeProposalCards = activeProposals.map((proposal) => (
    <ProposalCard
      color={"#00BBFF"}
      daoName={userDaos.find((dao) => dao.proposals.find((s) => s.id === proposal.id))?.name || ""}
      name={proposal.name}
      proposalId={proposal.id.toString()}
    />
  ));

  const upcomingProposalsCards = upcomingProposals.map((proposal) => (
    <UpcomingCard
      daoName={userDaos.find((dao) => dao.proposals.find((s) => s.id === proposal.id))?.name || ""}
      text={proposal.name}
      startTime={proposal.startTime}
      proposalId={proposal.id.toString()}
      members={
        userDaos
          .find((dao) => dao.proposals.find((s) => s.id === proposal.id))
          ?.members.map((member) => member.address) || []
      }
    />
  ));

  const joinedDaosCards = userDaos.map((dao) => <JoinedCard {...dao} />);

  return (
    <div className={"w-full flex justify-center pt-[92px]"}>
      <div className="flex flex-col gap-[64px] max-w-[912px]">
        <div className={"flex flex-col gap-[16px] w-full"}>
          <p className={"pl-[28px] text-[32px] font-bold"}>Happening Now</p>
          <div className={"flex gap-[16px] flex-wrap overflow-hidden "}>
            {activeProposalCards.length > 0 ? (
              activeProposalCards
            ) : (
              <div className={"flex flex-col gap-[16px] w-full"}>
                <p className={"pl-[44px] text-[24px] font-semibold text-black opacity-50 mix-blend-darken"}>
                  No active proposals
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={"flex flex-col gap-[16px] w-full"}>
          <p className={"pl-[44px] text-[24px] font-semibold text-black opacity-50 mix-blend-darken"}>Upcoming</p>
          <div className={"flex gap-[16px] flex-wrap overflow-hidden "}>
            {upcomingProposalsCards.length > 0 ? (
              upcomingProposalsCards
            ) : (
              <div className={"flex flex-col gap-[16px] w-full"}>
                <p className={"pl-[44px] text-[24px] font-semibold text-black opacity-50 mix-blend-darken"}>
                  No upcoming proposals
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={"flex flex-col gap-[16px] w-full"}>
          <p className={"pl-[44px] text-[24px] font-semibold text-black opacity-50 mix-blend-darken"}>Joined DAOs</p>
          <div className={"flex gap-[8px] flex-wrap "}>
            {joinedDaosCards.length > 0 ? (
              joinedDaosCards
            ) : (
              <div className={"flex flex-col gap-[16px] w-full"}>
                <p className={"pl-[44px] text-[24px] font-semibold text-black opacity-50 mix-blend-darken"}>
                  No joined DAOs. Go join one from <Link href={"/explore"}>Explore</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
