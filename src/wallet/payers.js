import addresses, {ROPSTEN,MUMBAI} from "@stabilitydao/addresses";

const payers = {
    [MUMBAI]: addresses[MUMBAI].dPayers,
    [ROPSTEN]: addresses[ROPSTEN].dPayers,
};

export {payers}
export default payers