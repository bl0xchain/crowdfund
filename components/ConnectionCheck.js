import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changeNetwork, connectWallet, hidePopUp } from "../redux/slices/walletSlice";

const ConnectionCheck = () => {
    const dispatch = useDispatch()

    const show = useSelector((state) => state.wallet.popUp)
    const status = useSelector((state) => state.wallet.status)

    const onClose = () => {
        dispatch(hidePopUp())
    }

    useEffect(() => {
        if(status === 'CONNECTED' ) {
            dispatch(hidePopUp())
        }
    }, [status])

    return (
        <Modal
            show={show}
            size="md"
            popup={true}
            onClose={onClose}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <FaExclamationCircle className="mx-auto mb-4 h-10 w-10 text-gray-400 dark:text-gray-200" />
                    {
                        status === 'INVALID_CHAIN' ?
                        <>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                You are on wrong network. Please change network to <br /><span className="text-yellow-400 font-bold">Rinkeby</span> <br />to complete the transaction.
                            </h3>
                            <div className="mt-4 flex justify-center">
                                <Button onClick={()=>dispatch(changeNetwork())}>Change Network</Button>
                            </div>
                        </> : 
                        <>
                        {
                            status === 'NOT_CONNECTED' ? 
                            <>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Your wallet is not Connected. Please connect wallet to do transaction.
                                </h3>
                                <div className="mt-4 flex justify-center">
                                    <Button onClick={()=>dispatch(connectWallet())}>Connect Wallet</Button>
                                </div>
                            </> :
                            <>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Your wallet is not Connected. Please connect wallet to do transaction.
                                </h3>
                            </>
                        }
                        </>
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConnectionCheck;