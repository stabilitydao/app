import React from 'react'

function Footer() {
    return (
        <footer className="py-8 text-black border-t-2 border-gray-400 dark:text-white dark:bg-black ">
            <div className="text-center">
                <h1 className="flex flex-row justify-center text-center gap-x-1">
                    © 2021
                    <a className="hover:underline" href="https://github.com/stabilitydao" target="_blank">
                        Stability
                    </a>
                </h1>
                MIT license
            </div>
        </footer>
    )
}

export default Footer
