import { useEffect, useState } from "react";
import { campaignService } from "../services/campaigns"

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState(null)

    useEffect(() => {
        campaignService
    }, [])

    return (
        <div className="border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4">
            Campaigns
        </div>
    )
}

export default Campaigns;