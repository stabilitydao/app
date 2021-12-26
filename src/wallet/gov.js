import addresses, {ROPSTEN, MUMBAI, POLYGON} from "@stabilitydao/addresses";

const gov = {
    [POLYGON]: addresses[POLYGON].gov,
    [MUMBAI]: addresses[MUMBAI].gov,
    [ROPSTEN]: addresses[ROPSTEN].gov,
};

export {gov}
export default gov