const networks = {
    1: {
        name: "Ethereum",
        fullname: "Ethereum mainnet",
        color: "#0abb48",
        rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
        chainid: 1,
        hexchainid: "0x1",
        symbol: "ETH",
        explorerurl: "https://etherscan.io/address/"
    },
    3: {
        name: "Ropsten",
        fullname: "Ropsten testnet",
        color: "#ff0000",
        rpc: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
        chainid: 3,
        hexchainid: "0x3",
        symbol: "ETH",
        explorerurl: "https://ropsten.etherscan.io/address/"
    },
    4: {
        name: "Rinkeby",
        fullname: "Rinkeby testnet",
        color: "#bbad10",
        rpc: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
        chainid: 4,
        hexchainid: "0x4",
        symbol: "ETH",
        explorerurl: "https://rinkeby.etherscan.io/address/"
    }
}
export { networks }