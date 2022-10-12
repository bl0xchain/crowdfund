import { Card, Select } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaClock, FaUserAlt } from "react-icons/fa";
import campaignService from "../services/campaigns"
import { getShortAddress } from "../services/utils";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState(null)
    const [category, setCategory] = useState("")

    useEffect(() => {
        campaignService.getCampaigns(category).then((data) => {
            setCampaigns(data)
        })
    }, [category])

    return (
        <div className="border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4">
            Campaigns {campaigns && campaigns.length}
            <div className="max-w-sm">
            <Select onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Animal">Animal</option>
            </Select>
            </div>
            { campaigns &&
                campaigns.map((campaign) => {
                    return (
                        <>
                        
                        <div className="max-w-sm" key={campaign.address}>
                            <Card
                                imgAlt={"Image for "+campaign.title}
                                imgSrc={"https://bl0xchain.infura-ipfs.io/ipfs/"+campaign.image}
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {campaign.title}
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                                </p>
                                <Link href={"/campaign/"+campaign.address}>
                                    <a
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                                        >
                                        Go to Campaign
                                    </a>
                                </Link>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><FaUserAlt className="inline-block mr-2" />{getShortAddress(campaign.owner)}</div>
                                    <div><FaClock className="inline-block mr-2" />{new Date(campaign.timeStamp * 1000).toLocaleString('US-in',{dateStyle:'medium'})}</div>
                                </div>
                            </Card>
                        </div>
                        </>
                    )
                })
            }
        </div>
    )
}

export default Campaigns;