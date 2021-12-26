import addresses, {ROPSTEN, MUMBAI, POLYGON} from "@stabilitydao/addresses";

const payers = {
    [POLYGON]: addresses[POLYGON].dPayers,
    [MUMBAI]: addresses[MUMBAI].dPayers,
    [ROPSTEN]: addresses[ROPSTEN].dPayers,
};

export {payers}
export default payers