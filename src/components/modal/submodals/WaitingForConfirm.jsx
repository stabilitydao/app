import React from 'react'

function WaitingForConfirm() {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <div className="h-16 my-5 flex flex-row items-center justify-center gap-x-4">
                <h1 className="font-Roboto  text-2xl">Waiting For Confirm</h1>
                <div className='flex justify-center items-center '>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-warn-gray-800 dark:border-white'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForConfirm