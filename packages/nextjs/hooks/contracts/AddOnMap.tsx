"use client";

import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { GlobalMatrixGatewayABI } from "~~/abi/GlobalMatrixGateway";
import { GlobalMatrixGateway } from "~~/contracts/DeployedAddress";

const AddOnMap = () => {
  const { writeContractAsync } = useWriteContract();
  const [address, setAddress] = useState("");
  const addOnMap = async () => {
    try {
      await writeContractAsync({
        abi: GlobalMatrixGatewayABI,
        address: GlobalMatrixGateway,
        functionName: "addPlayerInMap",
        args: [address, BigInt(1)],
      });
      setAddress("");
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <>
      <div>
        <label>
          Name:
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter Address" />
        </label>
      </div>
      <button
        onClick={addOnMap}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Create Agent
      </button>
    </>
  );
};

export default AddOnMap;
