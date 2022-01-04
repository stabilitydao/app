import addresses, {ROPSTEN, MUMBAI, POLYGON} from "@stabilitydao/addresses";

const gov = {
    [POLYGON]: addresses[POLYGON].gov,
    [MUMBAI]: addresses[MUMBAI].gov,
    [ROPSTEN]: addresses[ROPSTEN].gov,
};

const tl = {
    [POLYGON]: addresses[POLYGON].govTl,
    [MUMBAI]: addresses[MUMBAI].govTl,
    [ROPSTEN]: addresses[ROPSTEN].govTl,
};

const splitter = {
    [POLYGON]: addresses[POLYGON].splitter,
    [MUMBAI]: addresses[MUMBAI].splitter,
    [ROPSTEN]: addresses[ROPSTEN].splitter,
};

export {gov, tl, splitter}
export default gov