
async function currentGasPrice(lib) {
    const price = await lib.eth.getGasPrice()
    const totalPrice = Number(price) + 12000000000
    const totalPriceString = totalPrice.toString()
    return totalPriceString
}

export default currentGasPrice