import React from 'react'
import Modal from '@/src/components/modal/Modal'
import {
    WalletOption,
    Profile,
    NetworkOption,
    Pending,
    WaitingForConfirm,
    TxSubmitted, DelegateProfitToken, DelegateMakerToken
} from '@/src/components/modal/submodals'
import { useSelector, useDispatch } from 'react-redux'
import {
    updateIsNetworkOption,
    updateIsProfile,
    updateIsWalletOption,
    updateIsPending,
    updateIsWaitingForWalletTxConfirm,
    updateIsTxSubmitted, updateIsWaitingForChangeNetwork, updateDelegateProfitToken, updateDelegateMakerToken
} from '@/redux/slices/modalsSlice'
import WaitingForWalletChangeNetwork from "@/src/components/modal/submodals/WaitingForWalletChangeNetwork";

function Modals() {
    const dispatch = useDispatch()
    const IsNetworkOption = useSelector(state => state.modals.value.IsNetworkOption)
    const IsProfile = useSelector(state => state.modals.value.IsProfile)
    const IsModalOptionOpened = useSelector(state => state.modals.value.IsModalOptionOpened)
    const IsModalPending = useSelector(state => state.modals.value.IsModalPending)
    const IsWaitingForWalletTxConfirm = useSelector(state => state.modals.value.IsWaitingForWalletTxConfirm)
    const IsWaitingForChangeNetwork = useSelector(state => state.modals.value.IsWaitingForChangeNetwork)
    const IsTxSubmitted = useSelector(state => state.modals.value.IsTxSubmitted)
    const IsDelegateProfitToken = useSelector(state => state.modals.value.IsDelegateProfitToken)
    const IsDelegateMakerToken = useSelector(state => state.modals.value.IsDelegateMakerToken)

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
                IsWaitingForWalletTxConfirm &&
                <Modal title={''} onClose={() => dispatch(updateIsWaitingForWalletTxConfirm(false))} showCloseBtn>
                    <WaitingForConfirm onClose={() => dispatch(updateIsWaitingForWalletTxConfirm(false))} />
                </Modal>
            }
            {
                IsTxSubmitted &&
                <Modal title={''} onClose={() => dispatch(updateIsTxSubmitted(false))} showCloseBtn>
                    <TxSubmitted onClose={() => dispatch(updateIsTxSubmitted(false))} />
                </Modal>
            }
            {
                IsWaitingForChangeNetwork &&
                <Modal title={''} onClose={() => dispatch(updateIsWaitingForChangeNetwork(false))} showCloseBtn>
                    <WaitingForWalletChangeNetwork onClose={() => dispatch(updateIsWaitingForChangeNetwork(false))} />
                </Modal>
            }
            {
                IsDelegateProfitToken &&
                <Modal title={'Delegate Vote'} onClose={() => dispatch(updateDelegateProfitToken(false))} showCloseBtn>
                    <DelegateProfitToken onClose={() => dispatch(updateDelegateProfitToken(false))} />
                </Modal>
            }
            {
                IsDelegateMakerToken &&
                <Modal title={'Delegate Vote'} onClose={() => dispatch(updateDelegateMakerToken(false))} showCloseBtn>
                    <DelegateMakerToken onClose={() => dispatch(updateDelegateMakerToken(false))} />
                </Modal>
            }
        </div>
    )
}

export default Modals
