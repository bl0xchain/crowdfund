import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Wallet from "./Wallet";

const Header = () => {
    const Router = useRouter();
    return (
        <Navbar
            fluid={true}
            rounded={true}
            >
            <Link href="/">
                <a className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CROWDFUND</span>
                </a>
            </Link>
            <div className="flex md:order-2">
                <Wallet />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link href="/">
                    <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Campaigns</a>
                </Link>
                <Link href="create-campaign">
                    <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Create Campaign</a>
                </Link>
                <Link href="dashboard">
                    <a className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Dashboard</a>
                </Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;