"use client";
import TwitterIcon from "@/components/icons/TwitterIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import PlusIcon from "@/components/icons/PlusIcon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import UpcomingCard from "@/components/card/UpcomingCard";
import CrosscircleIcon from "@/components/icons/CrosscircleIcon";
import { Dao, DaoConfig, Member, Proposal } from "@/types";
import axios from "axios";
import DaoABI from "@/abi/Dao.json";
import {
  readContracts,
  useAccount,
  useChainId,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
} from "wagmi";
import formatAddress from "@/utils/formatAddress";
import ConnectButton from "@/components/button/ConnectButton";

const initialProposalData = {
  name: "",
  description: "",
  startTime: "",
  endTime: "",
};

const DaoPage = ({ params }: { params: { daoAddress: string } }) => {
  const daoAddress = params.daoAddress;

  const [daos, setDaos] = useState<Dao[]>([]);
  const [newProposalData, setNewProposalData] = useState(initialProposalData);
  const { address: account } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });

  const updateProposal = (key: string, value: string) => {
    setNewProposalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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

  const dao = daos.find((dao) => dao.contractAddress === daoAddress);

  const isJoined = !!dao?.members.find((member) => member.address === account);
  const isUserModerator = !!dao?.members.find((member) => member.address === account && member.userType >= 1);
  const isUserCouncil = !!dao?.members.find((member) => member.address === account && member.userType >= 2);

  const onCreateProposal = async (e) => {
    e.preventDefault();
    const hash = await walletClient?.writeContract({
      address: dao?.contractAddress as any,
      abi: DaoABI.abi as any,
      functionName: "createNewProposal",
      args: [
        newProposalData.name,
        newProposalData.description,
        "",
        newProposalData.startTime,
        newProposalData.endTime,
        [],
        dao?.members.filter((member) => member.userType >= 1).map((member) => member.address),
      ],
    });
    console.log(hash);
  };

  const { config: joinConfig } = usePrepareContractWrite({
    address: dao?.contractAddress as any,
    abi: DaoABI.abi as any,
    functionName: "requestToJoin",
  });
  const { writeAsync: joinDao } = useContractWrite(joinConfig);

  const join = async () => {
    if (!isJoined) {
      await joinDao?.();
    }
  };

  const ban = async (address: string) => {
    if (address === account) {
      return alert("You can't ban yourself!");
    }
    if (isUserModerator) {
      const hash = await walletClient?.writeContract({
        address: dao?.contractAddress as any,
        abi: DaoABI.abi as any,
        functionName: "banUser",
        args: [address],
      });
      console.log(hash);
    }
  };

  const promote = async (address: string) => {
    if (address === account) {
      return alert("You can't promote yourself!");
    }
    if (isUserCouncil) {
      const hash = await walletClient?.writeContract({
        address: dao?.contractAddress as any,
        abi: DaoABI.abi as any,
        functionName: "updateMemberType",
        args: [address, 2],
      });
      console.log(hash);
    }
  };

  const memberCards = dao?.members.map((member) => (
    <div
      key={member.address}
      className={
        "w-[440px] h-[84px] bg-[#F5EDE6] p-[28px] pb-[22px] rounded-3xl flex items-center justify-between gap-[16px]"
      }
    >
      <div className="flex items-center gap-2">
        <img src="/examplepp.png" alt="" />
        <p>{formatAddress(member.address)}</p>
      </div>

      {isUserModerator && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => ban(member.address)}
            className={"bg-red-500 text-white py-[8px] rounded-full  px-[20px]"}
          >
            Ban
          </button>
          {isUserCouncil && (
            <button
              onClick={() => promote(member.address)}
              className={"bg-green-500 text-white py-[8px] rounded-full  px-[20px]"}
            >
              Promote
            </button>
          )}
        </div>
      )}
    </div>
  ));

  console.log("dao", dao);

  const proposalCards = dao?.proposals.map((proposal) => (
    <div className={"w-[440px] min-h-[144px] bg-[#F5EDE6] p-[28px] pb-[22px] rounded-3xl flex flex-col gap-[16px]"}>
      <div className={"flex items-center gap-[12px]"}>
        <img className={"w-[32px] aspect-square"} src="/examplepp.png" alt="" />
        <p className={"text-black/50 font-medium"}>vitalik.eth</p>
      </div>
      <p
        className={"h-[108px] text-black  text-[28px] font-semibold line-clamp-3 overflow-hidden whitespace-pre-wrap"}
        style={{ lineHeight: "36px" }}
      >
        {proposal.description}
      </p>
    </div>
  ));

  return (
    <div className={"min-h-screen w-full max-w-[928px] px-[16px] mx-auto flex flex-col pt-[96px]"}>
      <div className={"flex gap-[20px] h-[144px]"}>
        <img src="/examplepp.png" alt="example" className={"w-[144px] h-[144px] rounded-full"} />
        <div className={"h-full flex flex-col"}>
          <div className={"pl-[28px]"}>
            <p className={"text-[32px] font-bold"}>{dao?.name}</p>
            <p className={"text-[#756D66] mt-[8px] font-medium text-[17px]"}>{dao?.description}</p>
          </div>
          <div className={"flex mt-auto items-center gap-[8px]"}>
            <a
              href={`https://twitter.com/${dao?.xUsername}`}
              className={"flex rounded-full  items-center gap-[12px] px-[28px] py-[14px] bg-white"}
            >
              <TwitterIcon /> @{dao?.xUsername}
            </a>
            <a
              href={dao?.website}
              className={"flex rounded-full  items-center gap-[12px] px-[28px] py-[14px] bg-white"}
            >
              <LinkIcon /> {dao?.website}
            </a>
          </div>
        </div>
        <button
          onClick={!isJoined ? () => join() : undefined}
          className={
            !isJoined
              ? "rounded-full bg-[#00BBFF] h-fit w-[144px] text-white font-semibold px-[28px] py-[14px] mt-auto ml-auto"
              : "rounded-full bg-[#F5EDE6] h-fit w-[144px] text-black font-semibold px-[28px] py-[14px] mt-auto ml-auto"
          }
        >
          {isJoined ? "Joined" : "Join"}
        </button>
      </div>
      <Tabs.Root className={"mt-[72px]"}>
        <Tabs.List className={"flex items-center gap-[8px] ml-[8px] font-medium"}>
          <Tabs.Trigger
            value="tab1"
            className={
              "px-[20px] py-[8px] text-black/50 data-[state=active]:bg-white data-[state=active]:text-black rounded-lg"
            }
          >
            Proposal
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className={
              "px-[20px] py-[8px] text-black/50 data-[state=active]:bg-white data-[state=active]:text-black rounded-lg"
            }
          >
            Members
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className={"mt-[16px]"}>
          <div className={"flex flex-col gap-[16px] w-full"}>
            <div className={"flex gap-[16px] flex-wrap overflow-hidden "}>
              {proposalCards && proposalCards.length > 0 ? (
                proposalCards
              ) : (
                <div className={"flex flex-col gap-[16px] w-full"}>
                  <p className={"pl-[44px] text-[24px] font-semibold text-black opacity-50 mix-blend-darken"}>
                    No proposals
                  </p>
                </div>
              )}
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className={"bg-blue-500 self-start text-white py-[8px] rounded-full ml-[44px] px-[20px]"}>
                  New Proposal
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-[#DBD3CC]/75 top-0 z-[3] data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow w-[512px] min-h-[300px]  rounded-3xl fixed z-[99] top-[50%] left-[50%] ] translate-x-[-50%] translate-y-[-50%]  focus:outline-none bg-[#F5EDE6] px-[44px] pb-[72px] pt-[28px] flex flex-col items-center overflow-y-scroll ">
                  <Dialog.Close asChild>
                    <button className="fixed top-[20px] left-[20px] rotate-45 p-[14px] rounded-full bg-[#F0E7DF] hover:bg-[#E9E0D8] active:bg-[#E0D7CF]">
                      <PlusIcon className={"opacity-75 w-[20px] h-[20px]"} />
                    </button>
                  </Dialog.Close>
                  <p className={"text-[24px] font-semibold"}>Create a Proposal</p>
                  <form className={"w-full"}>
                    <div className={"flex flex-col items-center mt-[24px] w-full"}>
                      <input
                        className={
                          "w-full mt-[48px] outline-none text-[17px] bg-[#EBE1D8]/50 placeholder-[#756D66]  px-[24px] py-[14px] rounded-[12px] font-medium "
                        }
                        type="text"
                        placeholder={"Name"}
                        onChange={(e) => updateProposal("name", e.target.value)}
                        value={newProposalData.name}
                      />
                      <textarea
                        placeholder={"Description"}
                        className={
                          "w-full mt-[8px] outline-none text-[17px] bg-[#EBE1D8]/50 placeholder-[#756D66] placeholder-medium px-[24px] py-[14px] rounded-[12px] resize-none font-medium"
                        }
                        onChange={(e) => updateProposal("description", e.target.value)}
                        value={newProposalData.description}
                      />
                      <div className={"relative w-full flex items-center mt-[8px]"}>
                        <input
                          className={
                            "w-full outline-none text-[17px] bg-[#EBE1D8]/50 placeholder-[#756D66]  px-[24px] py-[14px] rounded-[12px] font-medium "
                          }
                          type="text"
                          placeholder={"Start Time"}
                          onChange={(e) => updateProposal("startTime", e.target.value)}
                          value={newProposalData.startTime}
                        />
                      </div>
                      <div className={"relative w-full flex items-center mt-[8px]"}>
                        <input
                          className={
                            "w-full outline-none text-[17px] bg-[#EBE1D8]/50 placeholder-[#756D66]  px-[24px] py-[14px] rounded-[12px] font-medium "
                          }
                          type="text"
                          placeholder={"End Time"}
                          onChange={(e) => updateProposal("endTime", e.target.value)}
                          value={newProposalData.endTime}
                        />
                      </div>
                    </div>
                    <div className={"mt-4 bg-gradient-to-t from-[#F5EBE6] flex w-full items-center justify-center"}>
                      {account ? (
                        <button
                          className={"w-[320px] py-[14px] bg-[#00BBFF] rounded-full text-white"}
                          onClick={onCreateProposal}
                        >
                          Create Proposal
                        </button>
                      ) : (
                        <ConnectButton />
                      )}
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </Tabs.Content>
        <Tabs.Content value="tab2" className={"mt-[16px]"}>
          <div className={"flex flex-col gap-[16px] w-full"}>
            <div className={"flex gap-[16px] flex-wrap overflow-hidden "}>{memberCards}</div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default DaoPage;
