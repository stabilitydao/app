import React from 'react'

function WaitingForWalletChangeNetwork() {
    return (
        <div className="dark:text-white">
            <div className="my-5 flex flex-col items-center justify-center p-5">
                <div className='flex justify-center items-center mb-10 mt-10 '>
                    <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-stone-800 dark:border-white' />
                </div>
                <div className="font-Roboto my-10 text-2xl">Network change</div>
                <div className="font-Roboto">Confirm network change in your wallet</div>
            </div>
        </div>
    )
}

export default WaitingForWalletChangeNetwork