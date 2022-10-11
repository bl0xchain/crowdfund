import { Badge, Button, Spinner, Tooltip } from "flowbite-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNetwork, connectWallet, loadWallet } from "../redux/slices/walletSlice";
import { getShortAddress } from "../services/utils";
import { FaLink, FaUnlink } from "react-icons/fa"
import { useRouter } from "next/router";

const Wallet = () => {
    const dispatch = useDispatch()
    const address = useSelector((state) => state.wallet.address)
    const status = useSelector((state) => state.wallet.status)
    const chainId = useSelector((state) => state.wallet.chainId)
    const router = useRouter()

    const handleConnect = () => {
        dispatch(connectWallet())
    }

    const addWalletListener = useCallback( () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log(accounts);
                dispatch(loadWallet())
            });
            window.ethereum.on("chainChanged", (chainid) => {
                console.log(chainid);
                dispatch(loadWallet())
            });
        }
    }, []);

    useEffect(() => {
        dispatch(loadWallet())
        addWalletListener()
        console.log(router.pathname)
    }, [])

    return (
        <>
        {
            address === "" ?
            <>
            {
                status == 'PENDING' ?
                <Button className="btn-flow" disabled={true}>
                    <div className="mr-3">
                        <Spinner size="sm" light={true} />
                    </div>
                    Connecting
                </Button> :
                <Button className="btn-flow" onClick={handleConnect}>
                    <FaLink className="md:hidden" />
                    <span className="hidden md:inline-block">CONNECT WALLET</span>
                </Button>
            }
            </>
             : 
            <>
            {
                status === 'CONNECTED' ?
                <span className="bg-blue-300 px-3 py-2 rounded-lg md:font-semibold text-xs md:text-md">
                    Connected: {getShortAddress(address)}
                </span> :
                <Tooltip content="Connect to Goerli Testnet" placement="left">
                    <Badge color="failure" icon={FaUnlink} size="sm" onClick={() => dispatch(changeNetwork())} className="px-3 cursor-pointer">
                        Wrong Network
                    </Badge>
                </Tooltip>
            }
            
            </>
        }
        </>
    )
}

export default Wallet;