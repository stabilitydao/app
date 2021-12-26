import React from 'react'
import Modal from '@/src/components/modal/Modal'
import { WalletOption, Profile, NetworkOption, Pending, WaitingForConfirm } from '@/src/components/modal/submodals'
import { useSelector, useDispatch } from 'react-redux'
import { updateIsNetworkOption, updateIsProfile, updateIsWalletOption, updateIsPending, updateIsWaitingForConfirm } from '@/redux/slices/modalsSlice'

function Modals() {
    const dispatch = useDispatch()
    const IsNetworkOption = useSelector(state => state.modals.value.IsNetworkOption)
    const IsProfile = useSelector(state => state.modals.value.IsProfile)
    const IsModalOptionOpened = useSelector(state => state.modals.value.IsModalOptionOpened)
    const IsModalPending = useSelector(state => state.modals.value.IsModalPending)
    const IsWaitingForConfirm = useSelector(state => state.modals.value.IsWaitingForConfirm)

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
            {
                IsModalPending &&
                <Modal title="Pending" onClose={() => dispatch(updateIsPending(false))} showCloseBtn>
                    <Pending onClose={() => dispatch(updateIsWalletOption(false))} />
                </Modal>
            }
            {
                IsWaitingForConfirm &&
                <Modal title="Waiting For Comfirm" onClose={() => dispatch(updateIsWaitingForConfirm(false))} showCloseBtn>
                    <WaitingForConfirm onClose={() => dispatch(updateIsWaitingForConfirm(false))} />
                </Modal>
            }
        </div>
    )
}

export default Modals
