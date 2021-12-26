import addresses, {ROPSTEN, MUMBAI, POLYGON} from "@stabilitydao/addresses";

const pools = {
    [POLYGON]: {
        "Dividend Minter": {
            stake: 'PROFIT',
            earn: 'SDIV',
            contract: addresses[POLYGON].dPool,
        },
    },
    [MUMBAI]: {
        "Dividend Minter": {
            stake: 'PROFIT',
            earn: 'SDIV',
            contract: addresses[MUMBAI].dPool,
        },
    },
    [ROPSTEN]: {
        "Dividend Minter": {
            stake: 'PROFIT',
            earn: 'SDIV',
            contract: addresses[ROPSTEN].dPool,
        },
    },
};

export {pools}
export default pools