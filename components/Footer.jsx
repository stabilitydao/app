import React from 'react'

import {BsGithub, BsTelegram, BsTwitter, BsDiscord} from 'react-icons/bs'

function Footer() {
    return (
        <footer className="py-8 text-black border-t-2 border-gray-400 dark:text-white dark:bg-black ">
            <div className="container flex justify-center px-6 gap-x-4">
                <div className="text-right">
                    <h1 className="flex flex-row gap-x-1">
                        © 2021
                        Stability
                    </h1>
                    MIT license
                </div>
                <div className="w-px bg-gray-400">
                </div>
                <div className="self-center">
                    <a href="https://github.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsGithub className="text-3xl cursor-pointer" /></a>
                </div>
                <div className="self-center">
                    <a href="https://twitter.com/stabilitydao" target="_blank" rel="noopener noreferrer"><BsTwitter className="text-3xl cursor-pointer" /></a>
                </div>
                <div className="self-center">
                    <a href="https://t.me/stabilitydao" target="_blank" rel="noopener noreferrer" ><BsTelegram className="text-3xl " /></a>
                </div>
                <div className="self-center">
                    <a href="https://discord.gg/R3nnetWzC9" target="_blank" rel="noopener noreferrer" ><BsDiscord className="text-3xl " /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
