export const MatrixDeployer = "0x86AFF9fDE176247fA09Dc8f1b691DB8C9318282b";
export const GlobalMatrixGateway = "0x26EBbDA4c2ee4C7f8FD83D2df1a35247F0Ec18C3";
const ArbitrumSepolia = "0xEc04D080B79a8882f049D43e6521B10EDda2B2d6";
const OptimismSepolia = "0x4ec61E20968B7E1BEDe1b4f5922D738FC57F1347";
const BaseSepolia = "0xD1f054993B189aCd1761e3b7a31840C6e14eD10c";

export function getAddressByChainId(chainId: number): string | undefined {
  const chainToAddressMap: Record<number, string> = {
    421614: ArbitrumSepolia,
    11155420: OptimismSepolia,
    84532: BaseSepolia,
  };

  return chainToAddressMap[chainId];
}
