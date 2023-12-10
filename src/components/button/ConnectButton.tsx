"use client";

import React from "react";
import { Button } from "../ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import formatAddress from "@/utils/formatAddress";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  return (
    <Button onClick={() => open()} variant="outline">
      {address ? formatAddress(address) : "Connect Wallet"}
    </Button>
  );
};

export default ConnectButton;
