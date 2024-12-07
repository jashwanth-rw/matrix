"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      {
          connectedAddress ?
          <div> hfadiv </div> :
        <div className="flex flex-row justify-between items-center m-10">
        <div className="flex-1">
          <div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
              <p className="text-xl">Hope you&apos;re doing well! This is a sample restaurant.</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <RainbowKitCustomConnectButton />

              <span className="my-2 my-3">or</span>
              <button className="flex items-center mx-10 py-3 px-6 rounded-full text-black bg-gray-200 text-lg hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 border border-red-500">
                <img
                  src="https://sui.directory/wp-content/uploads/2023/06/SupraOracles-Red-Light-Symbol-540x539.png"
                  alt="Supra Testnet Logo"
                  className="w-6 h-6 mr-2 animate-pulse"
                />
                Connect with Supra Testnet
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://img.craftpix.net/2024/09/Free-Tiny-Pixel-Hero-Sprites-With-Melee-Attacks-768x512.webp"
            alt="Placeholder Image"
            className="w-full aspect-4:3 rounded-xl"
          />
        </div>
      </div>}
    </>
  );
};

export default Home;
