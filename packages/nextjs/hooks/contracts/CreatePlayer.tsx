"use client";

import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { GlobalMatrixGatewayABI } from "~~/abi/GlobalMatrixGateway";
import { GlobalMatrixGateway } from "~~/contracts/DeployedAddress";

const CreatePlayer = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState(0);
  const { writeContractAsync } = useWriteContract();

  const createPlayer = async () => {
    // addPlayerInMap(address player, uint256 mapId)
    try {
      await writeContractAsync({
        abi: GlobalMatrixGatewayABI,
        address: GlobalMatrixGateway,
        functionName: "createPlayer",
        args: [name, address, BigInt(chain)],
      });
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div>
      <h2>Create Player</h2>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address" />
        </label>
      </div>
      <div>
        <label>
          Chain:
          <input
            type="number"
            value={chain}
            onChange={e => setChain(Number(e.target.value))}
            placeholder="Enter chain"
          />
        </label>
      </div>
      <button onClick={createPlayer}>Create Player</button>
    </div>
  );
};

export default CreatePlayer;
