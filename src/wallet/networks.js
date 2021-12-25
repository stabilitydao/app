const
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
    MUMBAI = 80001
;

const networks = {
    1: {
        name: "Ethereum",
        fullname: "Ethereum mainnet",
        color: "#0abb48",
        rpc: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
        chainid: 1,
        hexchainid: "0x1",
        symbol: "ETH",
        explorerurl: "https://etherscan.io/"
    },
    3: {
        name: "Ropsten",
        fullname: "Ropsten testnet",
        color: "#ff0000",
        rpc: `https://ropsten.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
        chainid: 3,
        hexchainid: "0x3",
        symbol: "ETH",
        explorerurl: "https://ropsten.etherscan.io/"
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
        fullname: "Mumbai testnet",
        color: "#8142ff",
        rpc: `${process.env.NEXT_PUBLIC_RPC_MUMBAI}`,
        chainid: 80001,
        hexchainid: "0x13881",
        symbol: "MATIC",
        explorerurl: "https://mumbai.polygonscan.com/"
    }
}

export { networks, MAINNET, ROPSTEN, RINKEBY, GOERLI, KOVAN, MUMBAI }
export default networks