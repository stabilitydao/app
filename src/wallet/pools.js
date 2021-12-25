import addresses, {ROPSTEN, MUMBAI} from "@stabilitydao/addresses";

const pools = {
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