"use client";

import React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { GlobalMatrixGatewayABI } from "~~/abi/GlobalMatrixGateway";
import { GlobalMatrixGateway } from "~~/contracts/DeployedAddress";

const CreateAgent = () => {
  const { writeContractAsync } = useWriteContract();

  const createAgent = async () => {
    console.log("Here");
    const jsonBody = {
      name: "name",
      description: "description",
    };
    const fullDesc = JSON.stringify(jsonBody);
    try {
      await writeContractAsync({
        abi: GlobalMatrixGatewayABI,
        address: GlobalMatrixGateway,
        functionName: "createObject",
        args: [fullDesc, BigInt(421614)],
      });
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <button
      onClick={createAgent}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center "
    >
      Create Agent
    </button>
  );
};

export default CreateAgent;
