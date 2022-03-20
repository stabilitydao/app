import {createClient} from "redis";
import {pmColors} from '@/src/wallet/pm'

export default async function handler(request, response) {
    const usedColorsDbKey = 'PROFIT_MAKER_TESTNET_USED_COLORS'

    const client = createClient({
        url: `redis://:${process.env.UPSTASH_PASSWORD}@global-set-gnu-32194.upstash.io:32194`
    });

    await client.connect()
    let usedColors = await client.get(usedColorsDbKey)
    if (usedColors) {
        const avaiableColors = {}
        Object.keys(pmColors).map(c => {
            if (!usedColors.includes(c)) {
                avaiableColors[c] = pmColors[c]
            }
        })

        response.status(200).json(avaiableColors);
    } else {
        response.status(200).json(pmColors);
    }
}