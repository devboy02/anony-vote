"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import JoinedCard from "@/components/card/JoinedCard";
import PlusIcon from "@/components/icons/PlusIcon";
import * as Dialog from "@radix-ui/react-dialog";
import WorldcoinIcon from "@/components/icons/WorldcoinIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import { useEffect, useState } from "react";
import { useWalletClient, useChainId, useWaitForTransaction, useAccount, readContracts } from "wagmi";
import DaoABI from "@/abi/Dao.json";
import ConnectButton from "@/components/button/ConnectButton";
import axios from "axios";
import { Dao, DaoConfig, Member, Proposal } from "@/types";

const Page = () => {
  const [daos, setDaos] = useState<Dao[]>([]);
  const [name, setName] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [hash, setHash] = useState("");
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const { address: account } = useAccount();
  const { data: deployTx } = useWaitForTransaction({
    hash: hash as `0x${string}`,
  });

  const onCreateDao = async (e: any) => {
    e.preventDefault();
    const hash = await walletClient?.deployContract({
      abi: DaoABI.abi,
      bytecode: DaoABI.bytecode as `0x${string}`,
      args: [name, "", description],
    });
    setHash(hash!);
  };

  useEffect(() => {
    const postData = async () => {
      const contractAddress = deployTx?.contractAddress;
      if (contractAddress) {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/daos`, {
          key: contractAddress,
          contractAddress,
          name,
          xUsername,
          website,
          description,
          owner: account,
        });
      }
      console.log(deployTx);
    };
    postData();
  }, [deployTx]);

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

  const daoCards = daos.map((dao: any) => <JoinedCard {...dao} />);

  console.log("daos: ", daos);

  return (
    <div>
      <div className={"w-full flex justify-center pt-[92px]"}>
        <div className="flex flex-col gap-[64px] max-w-[912px]">
          <div className={"flex flex-col gap-[16px] w-full"}>
            <div className={"flex items-center justify-between"}>
              <p className={"pl-[28px] text-[32px] font-bold"}>Explore DAOs</p>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    className={
                      "mr-[32px] border border-2 border-black/5 rounded-full flex items-center px-[20px] py-[8px] gap-[8px]"
                    }
                  >
                    <PlusIcon />
                    <p>Add a DAO</p>
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-[#DBD3CC]/75 top-0 z-[3] data-[state=open]:animate-overlayShow fixed inset-0" />
                  <Dialog.Content className="data-[state=open]:animate-contentShow w-[512px] min-h-[600px]  rounded-3xl h-[calc(100vh-64px)] fixed z-[99] top-[50%] left-[50%] ] translate-x-[-50%] translate-y-[-50%]  focus:outline-none bg-[#F5EDE6] px-[44px] pb-[72px] pt-[28px] flex flex-col items-center overflow-y-scroll ">
                    <Dialog.Close asChild>
                      <button className="fixed top-[20px] left-[20px] rotate-45 p-[14px] rounded-full bg-[#F0E7DF] hover:bg-[#E9E0D8] active:bg-[#E0D7CF]">
                        <PlusIcon className={"opacity-75 w-[20px] h-[20px]"} />
                      </button>
                    </Dialog.Close>
                    <p className={"text-[24px] font-semibold"}>Create a DAO</p>
                    <form className={"w-full"}>
                      <div className={"flex flex-col items-center mt-[24px] w-full"}>
                        <img src="/examplepp.png" className={"w-32 h-32 rounded-full"} />
                        <div className="cursor-pointer text-[17px] relative overflow-hidden font-semibold border border-2 border-black/5 rounded-full flex items-center px-[20px] py-[8px] gap-[8px] mt-2">
                          <label>Upload Avatar</label>
                          <input
                            placeholder={""}
                            type="file"
                            className="w-full cursor-pointer h-full absolute opacity-0"
                          />
                        </div>

                        <input
                          className={
                            "w-full mt-[48px] outline-none text-[17px] bg-[#EBE1D8]/50 placeholder-[#756D66]  px-[24px] py-[14px] rounded-[12px] font-medium "
                          }
                          type="text"
                          placeholder={"Name"}
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                        <textarea
                          placeholder={"About"}
                          className={
                            "w-full mt-[8px] outline-none text-[17px] bg-[#EBE1D8]/50 placeholder-[#756D66] placeholder-medium px-[24px] py-[14px] rounded-[12px] resize-none font-medium"
                          }
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                        />
                        <div className={"relative w-full flex items-center mt-[48px]"}>
                          <input
                            className={
                              "w-full outline-none text-[17px] pl-[56px] bg-[#EBE1D8]/50 placeholder-[#756D66]  px-[24px] py-[14px] rounded-[12px] font-medium "
                            }
                            type="text"
                            placeholder={"Username"}
                            onChange={(e) => setXUsername(e.target.value)}
                            value={xUsername}
                          />
                          <TwitterIcon className={"absolute left-[16px]"} />
                        </div>
                        <div className={"relative w-full flex items-center mt-[8px]"}>
                          <input
                            className={
                              "w-full outline-none text-[17px] pl-[56px] bg-[#EBE1D8]/50 placeholder-[#756D66]  px-[24px] py-[14px] rounded-[12px] font-medium "
                            }
                            type="text"
                            placeholder={"Website"}
                            onChange={(e) => setWebsite(e.target.value)}
                            value={website}
                          />
                          <WorldcoinIcon className={"absolute left-[16px]"} />
                        </div>
                      </div>
                      <div className={"mt-4 bg-gradient-to-t from-[#F5EBE6] flex w-full items-center justify-center"}>
                        {account ? (
                          <button
                            className={"w-[320px] py-[14px] bg-[#00BBFF] rounded-full text-white"}
                            onClick={onCreateDao}
                          >
                            Create DAO
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
            <div className={"flex gap-[8px] flex-wrap "}>{daoCards}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
