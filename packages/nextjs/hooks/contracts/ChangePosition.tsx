"use client";

import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { GlobalMatrixGatewayABI } from "~~/abi/GlobalMatrixGateway";
import { GlobalMatrixGateway } from "~~/contracts/DeployedAddress";

const ChangePosition = () => {
  const [address, setAddress] = useState("");
  const [positionX, setpositionX] = useState(0);
  const [positionY, setpositionY] = useState(0);
  const { writeContractAsync } = useWriteContract();

  const changePosition = async () => {
    try {
      await writeContractAsync({
        abi: GlobalMatrixGatewayABI,
        address: GlobalMatrixGateway,
        functionName: "updatePlayerLocation",
        args: [address, BigInt(positionX), BigInt(positionY)],
      });
    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div>
      <h2>Change Position</h2>
      <div>
        <label>
          Address:
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address" />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            type="number"
            value={positionX}
            onChange={e => setpositionX(Number(e.target.value))}
            placeholder="Enter Position x"
          />
        </label>
      </div>
      <div>
        <label>
          Chain:
          <input
            type="number"
            value={positionY}
            onChange={e => setpositionY(Number(e.target.value))}
            placeholder="Enter Position Y"
          />
        </label>
      </div>
      <button onClick={changePosition}>Change Position</button>
    </div>
  );
};

export default ChangePosition;
