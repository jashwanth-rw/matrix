"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-row justify-between  items-center m-10">
        <div className="flex-1">
          <div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
              <p className="text-xl " >Hope you&apos;re doing well! This is a sample restaurant.</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
            <button class="mx-10 py-3 px-[100px] rounded-full text-white bg-blue-500 text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Connect Wallet
            </button>
              or 
              <button class="mx-10 py-3 px-[100px] rounded-full text-black bg-gray-200 text-lg hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
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
      </div>
    </>
  );
};

export default Home;
