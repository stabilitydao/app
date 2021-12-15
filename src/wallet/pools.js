import addresses, {ROPSTEN} from "@stabilitydao/addresses";

const pools = {
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