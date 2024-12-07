"use client";

import { useEffect } from "react";
import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import {
  FetchPlayersFromAllChains,
  GetChatMessages,
  GetCloseProximityPlaters,
  GetMapDetails,
  GetNumberOfPlayersOnChain,
  GetPlayerChainDetails,
  GetPlayerChainID,
  GetPlayerLocation,
  GetProfileImage,
} from "~~/hooks/contracts/Get";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

// export const metadata = getMetadata({
//   title: "Debug Contracts",
//   description: "Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way",
// });

const Debug: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const {
    data: playerChainID,
    isLoading: loadingPlayerChainID,
    error: playerChainIDError,
  } = GetPlayerChainID(connectedAddress);
  const {
    data: playerChainDetails,
    isLoading: loadingPlayerChainDetails,
    error: playerChainDetailsError,
  } = GetPlayerChainDetails({ address: connectedAddress, chainId: 421614 });
  const {
    data: chatMessages,
    isLoading: loadingChatMessages,
    error: chatMessagesError,
  } = GetChatMessages({
    addressSender: connectedAddress,
    addressReceiver: "0x0133eb00D73847A81E08F1b410700CC963947657",
    chainId: 421614,
  });
  const {
    data: playerLocation,
    isLoading: loadingPlayerLocation,
    error: playerLocationError,
  } = GetPlayerLocation(connectedAddress);
  const {
    data: closeProximityPlayers,
    isLoading: loadingCloseProximityPlayers,
    error: closeProximityPlayersError,
  } = GetCloseProximityPlaters();
  const { data: mapDetails, isLoading: loadingMapDetails, error: mapDetailsError } = GetMapDetails();
  const {
    data: profileImage,
    isLoading: loadingProfileImage,
    error: profileImageError,
  } = GetProfileImage(connectedAddress);
  const {
    data: numberOfPlayersOnChain,
    isLoading: loadingNumberOfPlayersOnChain,
    error: numberOfPlayersOnChainError,
  } = GetNumberOfPlayersOnChain(421614);
  const {
    data: playersFromAllChains,
    isLoading: loadingPlayersFromAllChains,
    error: playersFromAllChainsError,
  } = FetchPlayersFromAllChains();

  useEffect(() => {
    console.log("playerChainID is changed", playerChainID, typeof playerChainID);
  }, [playerChainID]);
  useEffect(() => {
    console.log("playerChainDetails is changed", playerChainDetails, typeof playerChainDetails);
  }, [playerChainDetails]);
  useEffect(() => {
    console.log("chatMessages is changed", chatMessages, typeof chatMessages);
  }, [chatMessages]);
  useEffect(() => {
    console.log("playerLocation is changed", playerLocation, typeof playerLocation);
  }, [playerLocation]);
  useEffect(() => {
    console.log("closeProximityPlayers is changed", closeProximityPlayers, typeof closeProximityPlayers);
  }, [closeProximityPlayers]);
  useEffect(() => {
    console.log("mapDetails is changed", mapDetails, typeof mapDetails);
  }, [mapDetails]);
  useEffect(() => {
    console.log("profileImage is changed", profileImage, typeof profileImage);
  }, [profileImage]);
  useEffect(() => {
    console.log("numberOfPlayersOnChain is changed", numberOfPlayersOnChain, typeof numberOfPlayersOnChain);
  }, [numberOfPlayersOnChain]);
  useEffect(() => {
    console.log("playersFromAllChains is changed", playersFromAllChains, typeof playersFromAllChains);
  }, [playersFromAllChains]);

  return (
    <>
      <DebugContracts />
      <div className="text-center mt-8 bg-secondary p-10">
        {loadingPlayerChainID ? (
          <p>Loading Player Chain ID...</p>
        ) : playerChainIDError ? (
          <p>Error: {playerChainIDError.message}</p>
        ) : (
          <p>Player Chain ID: {Number(playerChainID)}</p>
        )}

        {/* {loadingPlayerChainDetails ? (
          <p>Loading Player Chain Details...</p>
        ) : playerChainDetailsError ? (
          <p>Error: {playerChainDetailsError.message}</p>
        ) : (
          <p>Player Chain Details: {JSON.stringify(playerChainDetails)}</p>
        )} */}

        {loadingChatMessages ? (
          <p>Loading Chat Messages...</p>
        ) : chatMessagesError ? (
          <p>Error: {chatMessagesError.message}</p>
        ) : (
          <p>Chat Messages: {JSON.stringify(chatMessages)}</p>
        )}

        {loadingPlayerLocation ? (
          <p>Loading Player Location...</p>
        ) : playerLocationError ? (
          <p>Error: {playerLocationError.message}</p>
        ) : (
          <p>Player Location: {Number(playerLocation![0])}</p>
        )}

        {loadingCloseProximityPlayers ? (
          <p>Loading Close Proximity Players...</p>
        ) : closeProximityPlayersError ? (
          <p>Error: {closeProximityPlayersError.message}</p>
        ) : (
          <p>Close Proximity Players: {JSON.stringify(closeProximityPlayers)}</p>
        )}

        {/* {loadingMapDetails ? (
          <p>Loading Map Details...</p>
        ) : mapDetailsError ? (
          <p>Error: {mapDetailsError.message}</p>
        ) : (
          <p>Map Details: {JSON.stringify(mapDetails)}</p>
        )} */}

        {loadingProfileImage ? (
          <p>Loading Profile Image...</p>
        ) : profileImageError ? (
          <p>Error: {profileImageError.message}</p>
        ) : (
          <p>Profile Image: {JSON.stringify(profileImage)}</p>
        )}

        {loadingNumberOfPlayersOnChain ? (
          <p>Loading Number of Players on Chain...</p>
        ) : (
          <p>Number of Players on Chain: {Number(numberOfPlayersOnChain)}</p>
        )}

        {loadingPlayersFromAllChains ? (
          <p>Loading Players from All Chains...</p>
        ) : (
          <p>Players from All Chains: {JSON.stringify(playersFromAllChains)}</p>
        )}
      </div>
    </>
  );
};

export default Debug;
