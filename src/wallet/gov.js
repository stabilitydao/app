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

const govData = {
    [POLYGON]: {
        tally: 'https://www.tally.xyz/governance/eip155:137:0x6214Ba4Ce85C0A6F6025b0d63be7d65214463226',
    },
    [MUMBAI]: {
        tally: 'https://www.tally.xyz/governance/eip155:80001:0x3e77B810760dEb33e7ebc5270Aa1C348De43a74F',
    },
}

export {gov, tl, splitter, govData}
export default gov