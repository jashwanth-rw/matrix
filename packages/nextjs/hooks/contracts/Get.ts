import { ChainMatrixABI } from "../../abi/ChainMatrix";
import { GlobalMatrixGatewayABI } from "../../abi/GlobalMatrixGateway";
import { GlobalMatrixGateway, getAddressByChainId } from "../../contracts/DeployedAddress";
import { useReadContract } from "wagmi";

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
    address: getAddressByChainId(chainId) as `0x${string}`,
    functionName: "playerChainData",
    args: [address as `0x${string}`],
  });
  return { data, isLoading, error };
};

export const GetChatMessages = ({ addressSender, addressReceiver, chainId }: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: ChainMatrixABI,
    address: getAddressByChainId(chainId),
    functionName: "getChatMessages",
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
  });
  return { data, isLoading, error };
};

export const GetMapDetails = (mapId: any) => {
  const { data, isLoading, error } = useReadContract({
    abi: GlobalMatrixGatewayABI,
    address: GlobalMatrixGateway,
    functionName: "getMap",
    args: [mapId],
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

// Example to loop through players' data across chains
export const FetchPlayersFromAllChains = async () => {
  const chainIds = [421614, 11155420, 84532]; // Add more chain IDs if needed
  const playersByChain: Record<number, any[]> = {}; // Store results for each chain

  for (const chainId of chainIds) {
    const { data, isLoading, error } = GetNumberOfPlayersOnChain(chainId);

    if (isLoading) {
      console.log(`Loading data for chain ID ${chainId}...`);
      continue;
    }

    if (error) {
      console.error(`Error fetching data for chain ID ${chainId}: ${error}`);
      continue;
    }

    if (data) {
      console.log(`Data for chain ID ${chainId}:`, data);
      playersByChain[chainId] = Array.isArray(data) ? data : [data]; // Ensure data is an array
    }
  }
  return playersByChain;
};
