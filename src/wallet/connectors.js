import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { networks, POLYGON, MUMBAI } from '@/src/wallet/networks'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { TorusConnector } from '@web3-react/torus-connector'
import { CloverConnector } from '@clover-network/clover-connector'
const supportedChainIds = [
  1, // mainnet
  3, // ropsten
  4, // rinkeby
  5, // goreli
  42, // kovan
  MUMBAI,
  250, // fantom
  4002, // fantom testnet
  POLYGON, // matic
  80001, // matic testnet
  100, // xdai
  56, // binance smart chain
  97, // binance smart chain testnet
  1287, // moonbase
  43114, // avalanche
  43113, // fuji
  128, // heco
  256, // heco testnet
  1666600000, // harmony
  1666700000, // harmony testnet
  66, // okex testnet
  65, // okex testnet
  42161, // arbitrum
  42220, // celo
  11297108109, // palm
  1285, // moonriver
]

const RPC = {
  POLYGON: networks[POLYGON].rpc,
  // 1: networks[1].rpc,
  3: networks[3].rpc,
  // 4: networks[4].rpc,
  MUMBAI: networks[MUMBAI].rpc,
}

export const walletconnect = new WalletConnectConnector({
  rpc: RPC,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  supportedChainIds,
});

export const injected = new InjectedConnector({
  supportedChainIds
})
export const walletlinkconnector = new WalletLinkConnector({
  url: 'https://stabilitydao.org/',
  appName: 'StabilityDao',
  appLogoUrl: 'https://stabilitydao.org/logo_nolines_256.png',
  darkMode: true,
})

export const torusconnector = new TorusConnector({
  chainId: POLYGON,
})
export const cloverconnector = new CloverConnector({
  supportedChainIds
})