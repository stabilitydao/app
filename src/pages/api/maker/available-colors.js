import {createClient} from "redis";
import {pmColors} from '@/src/wallet/pm'

export default async function handler(request, response) {
    const usedColorsDbKey = 'PROFIT_MAKER_USED_COLORS_1'

    const client = createClient({
        url: `redis://:${process.env.UPSTASH_PASSWORD}@global-set-gnu-32194.upstash.io:32194`
    });

    client.on("error", function(err) {
        throw err;
    });
    await client.connect()
    // await client.ping()

    let usedColors = await client.get(usedColorsDbKey)
    if (usedColors) {
        usedColors = JSON.parse(usedColors)
        const avaiableColors = {}
        Object.keys(pmColors).map(c => {
            if (!usedColors[c]) {
                avaiableColors[c] = pmColors[c]
            }
        })

        response.status(200).json(avaiableColors);
    } else {
        response.status(200).json(pmColors);
    }

    await client.disconnect();
}