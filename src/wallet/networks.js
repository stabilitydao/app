const
    MAINNET = 1,
    POLYGON = 137,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    MUMBAI = 80001
;

const defaultNetwork = 137
const networkOrder = [137, 3, 80001]
const networks = {
    137: {
        name: "Polygon",
        fullname: "Polygon",
        color: "#8142ff",
        rpc: `${process.env.NEXT_PUBLIC_RPC_POLYGON}`,
        chainid: POLYGON,
        hexchainid: "0x89",
        symbol: "MATIC",
        explorerurl: "https://polygonscan.com/",
        blocktimeAvgSec: 2.9,
    },
    /*1: {
        name: "Ethereum",
        fullname: "Ethereum mainnet",
        color: "#0abb48",
        rpc: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
        chainid: 1,
        hexchainid: "0x1",
        symbol: "ETH",
        explorerurl: "https://etherscan.io/"
    },*/
    3: {
        name: "Ropsten",
        testnet: true,
        fullname: "Ropsten testnet",
        color: "#ff0000",
        rpc: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
        chainid: 3,
        hexchainid: "0x3",
        symbol: "ETH",
        explorerurl: "https://ropsten.etherscan.io/",
        blocktimeAvgSec: 13,
    },
    /*4: {
        name: "Rinkeby",
        fullname: "Rinkeby testnet",
        color: "#bbad10",
        rpc: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
        chainid: 4,
        hexchainid: "0x4",
        symbol: "ETH",
        explorerurl: "https://rinkeby.etherscan.io/"
    },*/
    80001: {
        name: "Mumbai",
        testnet: true,
        fullname: "Mumbai testnet",
        color: "#c342ff",
        rpc: `${process.env.NEXT_PUBLIC_RPC_MUMBAI}`,
        chainid: 80001,
        hexchainid: "0x13881",
        symbol: "MATIC",
        explorerurl: "https://mumbai.polygonscan.com/",
        blocktimeAvgSec: 2.9,
    }
}

export { networks, defaultNetwork, networkOrder, POLYGON, MAINNET, ROPSTEN, RINKEBY, GOERLI, KOVAN, MUMBAI }
export default networks