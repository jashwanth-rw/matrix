export const MatrixDeployer = "0x86AFF9fDE176247fA09Dc8f1b691DB8C9318282b";
export const GlobalMatrixGateway = "0x26EBbDA4c2ee4C7f8FD83D2df1a35247F0Ec18C3";
const ArbitrumSepolia = "0x3fE39F4bF578a73CBE2D732D4dE988fD2Cc47103";
const OptimismSepolia = "0x4180b798C4D0dF1b92Aa7202A39fbD66c8Ea98d2";
const BaseSepolia = "0x3A57f4dbfb97b5184b5cBab76aeeB0b7049D6629";

export function getAddressByChainId(chainId: number): string | undefined {
  const chainToAddressMap: Record<number, string> = {
    421614: ArbitrumSepolia,
    11155420: OptimismSepolia,
    84532: BaseSepolia,
  };

  return chainToAddressMap[chainId];
}
