import Web3 from 'web3'
import {networks} from "../../../wallet/networks";
import addresses, {MUMBAI,} from "@stabilitydao/addresses";
import pmAbi from '@/src/abis/pmAbi.json'
import {pmColors} from '@/src/wallet/pm'
import {createClient} from 'redis'

// noinspection JSUnusedGlobalSymbols
export default async function handler(request, response) {
    const { tokenId } = request.query;

    // MUMBAI ProfitMakerTestnet
    const pmAddress = addresses[MUMBAI].pm;

    const dbKey = `PROFIT_MAKER_TESTNET2_${tokenId}`
    const usedColorsDbKey = 'PROFIT_MAKER_TESTNET_USED_COLORS'

    const HOST = 'https://dev.stabilitydao.org'

    // get from redis
    const client = createClient({
        url: `redis://:${process.env.UPSTASH_PASSWORD}@global-set-gnu-32194.upstash.io:32194`,
    });
    /*client.on("error", function(err) {
        throw err;
    });*/
    await client.connect()
    const dbMetaData = await client.get(dbKey)

    if (dbMetaData) {
        response.status(200).json(dbMetaData);
    } else {
        const web3 = new Web3(new Web3.providers.HttpProvider(networks[3].rpc))
        const pm = new web3.eth.Contract(pmAbi, pmAddress);

        const res = await pm.methods.props(tokenId).call()
        const { color, epoch } = res;

        if (color > 0 && epoch > 0 && pmColors[color]) {

            const metadata = {
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
            }

            // save to redis all
            await client.set(dbKey, JSON.stringify(metadata))

            let usedColors = await client.get(usedColorsDbKey)
            if (usedColors) {
                usedColors.push(color)
            } else {
                usedColors = [color]
            }

            await client.set(usedColorsDbKey, JSON.stringify(usedColors))

            response.status(200).json(metadata);
        } else {
            response.status(404).end(`Profit Maker #${tokenId} not minted`)
        }
    }
}
