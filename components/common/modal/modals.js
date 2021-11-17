import React from 'react'
import Modal from '@/components/common/modal/Modal'
import { WalletOption, Profile, NetworkOption } from '@/components/common/modal/submodals/'
import { useSelector, useDispatch } from 'react-redux'
import { updateIsNetworkOption, updateIsProfile, updateIsWalletOption } from '@/redux/slices/modalsSlice'

function Modals() {
    const dispatch = useDispatch()
    const IsNetworkOption = useSelector(state => state.modals.value.IsNetworkOption)
    const IsProfile = useSelector(state => state.modals.value.IsProfile)
    const IsModalOptionOpened = useSelector(state => state.modals.value.IsModalOptionOpened)

    return (
        <div>
            {
                IsNetworkOption &&
                <Modal title="Select a Network" onClose={() => dispatch(updateIsNetworkOption(false))} showCloseBtn>
                    <NetworkOption onClose={() => dispatch(updateIsNetworkOption(false))} />
                </Modal>
            }
            {
                IsProfile &&
                <Modal title="Account" onClose={() => dispatch(updateIsProfile(false))} showCloseBtn>
                    <Profile onClose={() => dispatch(updateIsProfile(false))} />
                </Modal>
            }
            {
                IsModalOptionOpened &&
                <Modal title="Select a Wallet" onClose={() => dispatch(updateIsWalletOption(false))} showCloseBtn>
                    <WalletOption onClose={() => dispatch(updateIsWalletOption(false))} />
                </Modal>
            }
        </div>
    )
}

export default Modals
