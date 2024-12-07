import { useEffect, useState } from "react";
import { ChainMatrixABI } from "../../abi/ChainMatrix";
import { GlobalMatrixGatewayABI } from "../../abi/GlobalMatrixGateway";
import { GlobalMatrixGateway, getAddressByChainId } from "../../contracts/DeployedAddress";
import { useReadContract } from "wagmi";

const predefinedChainIds = [421614, 11155420, 84532];

export const GetPlayerChainID = (address: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: GlobalMatrixGatewayABI,
    address: GlobalMatrixGateway,
    functionName: "playerChainId",
    args: [address as `0x${string}`],
  });
  return { data, isLoading, error };
};

export const GetPlayerChainDetails = ({ address, chainId }: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: ChainMatrixABI,
    address: getAddressByChainId(chainId),
    functionName: "playerChainData",
    chainId: chainId,
    args: [address! as `0x${string}`],
  });
  return { data, isLoading, error };
};

export const GetChatMessages = ({ addressSender, addressReceiver, chainId }: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: ChainMatrixABI,
    address: getAddressByChainId(chainId),
    functionName: "getChatMessages",
    chainId: chainId,
    args: [addressSender as `0x${string}`, addressReceiver as `0x${string}`],
  });
  return { data, isLoading, error };
};

export const GetPlayerLocation = (address: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: GlobalMatrixGatewayABI,
    address: GlobalMatrixGateway,
    functionName: "getPlayerLocation",
    args: [address as `0x${string}`],
  });
  return { data, isLoading, error };
};

export const GetCloseProximityPlaters = () => {
  const { data, isLoading, error } = useReadContract({
    abi: GlobalMatrixGatewayABI,
    address: GlobalMatrixGateway,
    functionName: "getCloseProximityPlayers",
    args: [BigInt(1)],
  });
  return { data, isLoading, error };
};

export const GetMapDetails = () => {
  const { data, isLoading, error } = useReadContract({
    abi: GlobalMatrixGatewayABI,
    address: GlobalMatrixGateway,
    functionName: "getMap",
    args: [BigInt(1)],
  });
  return { data, isLoading, error };
};

export const GetProfileImage = (address: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: GlobalMatrixGatewayABI,
    address: GlobalMatrixGateway,
    functionName: "playerImage",
    args: [address as `0x${string}`],
  });
  return { data, isLoading, error };
};

// Function to fetch players' data from a specific chain
export const GetNumberOfPlayersOnChain = (chainId: number) => {
  const address = getAddressByChainId(chainId);

  if (!address) {
    console.error(`No contract address found for chain ID ${chainId}`);
    return { data: null, isLoading: false, error: "Invalid chain ID" };
  }

  // Fetch data from the contract using the resolved address
  const { data, isLoading, error } = useReadContract({
    abi: ChainMatrixABI,
    address,
    chainId: chainId,
    functionName: "getPlayersOnChain",
  });

  return { data, isLoading, error };
};

// Hook to fetch player data from all predefined chains
export const FetchPlayersFromAllChains = () => {
  const [playersByChain, setPlayersByChain] = useState<Record<number, any[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const results: Record<number, any[]> = {};

        for (const chainId of predefinedChainIds) {
          const { data, isLoading: chainLoading, error: chainError } = GetNumberOfPlayersOnChain(chainId);

          if (chainLoading) {
            console.log(`Loading data for chain ID ${chainId}...`);
            continue;
          }

          if (data) {
            console.log(`Data for chain ID ${chainId}:`, data);
            results[chainId] = Array.isArray(data) ? data : [data]; // Ensure data is an array
          }
        }

        setPlayersByChain(results);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return { data: playersByChain, isLoading, error };
};
