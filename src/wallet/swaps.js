import {POLYGON, MAINNET, MUMBAI, RINKEBY, ROPSTEN} from "./networks";

const buyLinks = {
    [POLYGON]: 'https://app.uniswap.org/#/swap?inputCurrency=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&outputCurrency=0x48469a0481254d5945E7E56c1Eb9861429c02f44',
    [MAINNET]: null,
    [ROPSTEN]: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x29E4d6c08e3AD060Dc2fC8DCE70AaB8C8c57563F',
    [RINKEBY]: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x7D68ECf1762bA27120d0f98BFcFa0da67eb15860',
    [MUMBAI]: 'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x108abca337e88a9fc1de96b0ec323f476b35cd44',
}

const lpv3 = {
    [POLYGON]: {
        USDCETH: '0x45dDa9cb7c25131DF268515131f647d726f50608',
        ETH: '0xd3B1f11f0ff29Add929941095C696D464D6961FC',
    },
    [MAINNET]: {
        DAIETH: '0xC2e9F25Be6257c210d7Adf0D4Cd6E3E881ba25f8',
    },
    [ROPSTEN]: {
        ETH: '0x596B3535C42B6ff7dfF16EdE1f9DfC7e0CA5828A',
        DAIETH: '0x40FDe2952a0674a3E77707Af270af09800657293',
    },
    [RINKEBY]: {
        ETH: '0x7393853a7B478bE670B69ead8c3AA2b2D44C7CBC',
    },
    [MUMBAI]: {
        ETH: '0x9c5752145652849e0DeB9F8643dBbb0eAD7E1c50',
        DAIETH: '0x765fDB41ea7Fd9fF26C8DD4eEa20A4248f106622',
    },
}

export { buyLinks, lpv3 }
