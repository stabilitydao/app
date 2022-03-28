import {MUMBAI, POLYGON} from "./networks";

const pmColors = {
    1: {
        name: 'Deep Royal Blue',
        rgb: '#4768fd',
    },
    2: {
        name: 'Ambient Red',
        rgb: '#fd4747',
    },
    3: {
        name: 'Royal Purple',
        rgb: '#8447fd',
    },
    4: {
        name: 'Fresh Blueberries',
        rgb: '#2b44fd',
    },
    5: {
        name: 'Gentle Olive',
        rgb: '#00f7f7',
    },
    6: {
        name: 'Arctic Blue',
        rgb: '#1e62ba',
    },
    7: {
        name: 'Golden Nova',
        rgb: '#f7cc4a',
    },
   8: {
        name: 'Copper Innovation',
        rgb: '#f7814a',
    },
    9: {
        name: 'Emerald',
        rgb: '#4af750',
    },
    10: {
        name: 'Pink Rose',
        rgb: '#f74af4',
    },
}

const pmData = {
    [POLYGON]: {
        opensea: 'https://opensea.io/collection/profit-maker',
    },
    [MUMBAI]: {
        opensea: 'https://testnets.opensea.io/collection/profit-maker-testnet',
    },
}

export {pmColors, pmData}
