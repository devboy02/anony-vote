import React, { useState } from "react";
import CalendarIcon from "@/components/icons/CalendarIcon";
import { UpcomingCard } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import PlusIcon from "../icons/PlusIcon";
import { useAccount } from "wagmi";
import ConnectButton from "../button/ConnectButton";
import axios from "axios";

const UpcomingCard = ({ daoName, text, startTime, proposalId, members }: UpcomingCard) => {
  const startDate = new Date((+startTime + 10800) * 1000);
  const startDateFormatted = `${startDate.toISOString().slice(5, 10)} ${startDate.toISOString().slice(11, 16)}`;

  const { address: account } = useAccount();
  const [inputError, setInputError] = useState("");
  const [chosenAddress, setChosenAddress] = useState("");

  const onCast = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vote`, {
      daoName,
      proposalId,
      voter: account,
      receiver: chosenAddress,
    });
  };

  const onInputChange = async (address: string) => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/vote?filterType=voter&filterValue=${account}`
    );
    if (result.data) {
      return setInputError("You have already voted.");
    }
    if (address.length !== 42) {
      return setInputError("Invalid address");
    }
    if (!members.includes(address)) {
      return setInputError("Address is not a member");
    }
    setInputError("");
    setChosenAddress(address);
  };
  return (
    <div className={"h-[288px] w-[440px] gap-[16px] flex flex-col  rounded-3xl p-[28px] pb-[22px] bg-[#F5EDE6]"}>
      <div className={"flex items-center gap-[12px] "}>
        <img
          src="https://s3.coinmarketcap.com/static/img/portraits/6310a2776eac787c457a1f09.png"
          alt=""
          className={"w-[32px] h-[32px] rounded-full object-cover"}
        />
        <p className={"text-[17px] text-black font-medium opacity-50 mix-blend-darken"}>{daoName}</p>
      </div>
      <p className={"text-[28px] font-semibold text-black line-clamp-3"} style={{ lineHeight: "36px" }}>
        {text}
      </p>
      <div className={"flex items-center justify-between mt-auto"}>
        <div className={"flex items-center gap-[8px] opacity-50 mix-blend-darken"}>
          <CalendarIcon />
          <p className={"text-[16px] font-medium text-black "}>{startDateFormatted}</p>
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className={
                "text-[17px] font-semibold leading-[24px] bg-white/50 text-black py-[8px] px-[20px] rounded-full"
              }
            >
              Vote for Speaker
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
              <p className={"text-[24px] font-semibold"}>Vote a Speaker</p>
              <form className={"w-full"}>
                <div className={"flex flex-col items-center mt-[24px] w-full"}>
                  <label htmlFor="address" className={"text-[16px] font-medium text-black opacity-50 mix-blend-darken"}>
                    Address
                  </label>
                  <input
                    type="search"
                    name="address"
                    id="address"
                    className={"w-[320px] h-[48px] rounded-full border border-[#E9E0D8] px-[20px] mt-[8px]"}
                    onChange={(e) => onInputChange(e.target.value)}
                  />
                  {inputError && <p className={"text-[14px] text-red-500 mt-[8px] font-medium"}>{inputError}</p>}
                </div>
                <div className={"mt-4 bg-gradient-to-t from-[#F5EBE6] flex w-full items-center justify-center"}>
                  {account ? (
                    <button
                      className={"w-[320px] py-[14px] bg-[#00BBFF] rounded-full text-white disabled:opacity-30"}
                      onClick={onCast}
                      disabled={!!inputError}
                    >
                      Cast your Vote
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
    </div>
  );
};

export default UpcomingCard;
