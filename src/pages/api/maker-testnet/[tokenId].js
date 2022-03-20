import Web3 from 'web3'
import {networks} from "../../../wallet/networks";
import addresses, {ROPSTEN,} from "@stabilitydao/addresses";
import pmAbi from '@/src/abis/pmAbi.json'
import {pmColors} from '@/src/wallet/pm'

// noinspection JSUnusedGlobalSymbols
export default async function handler(request, response) {
    const { tokenId } = request.query;

    // ropsten ProfitMakerTestnet
    const pmAddress = addresses[ROPSTEN].pm;

    const HOST = 'https://dev.stabilitydao.org'

    // todo get from redis

    const web3 = new Web3(new Web3.providers.HttpProvider(networks[3].rpc))
    const pm = new web3.eth.Contract(pmAbi, pmAddress);

    const res = await pm.methods.props(tokenId).call()
    const { color, epoch } = res;

    if (color > 0 && epoch > 0 && pmColors[color]) {
        // todo save to redis all

        response.status(200).json({
            'name': `PM #${tokenId}`,
            'description': `Profit Maker token #${tokenId}`,
            'attributes': [
                {
                    "trait_type": "Color",
                    "value":  pmColors[color].name,
                },
                {
                    "display_type": "number",
                    "trait_type": "Epoch",
                    "value": epoch
                }
            ],
            'image': `${HOST}/maker/${pmColors[color].name.toLowerCase().replace(/ /g,"-")}.mp4`
        });
    } else {
        response.status(404).end(`Profit Maker #${tokenId} not minted`)
    }
}