import { ethers } from "ethers";

const campaignABI = require(".abis/campaign-abi.json")
const campaignFactoryABI = require(".abis/campaign-factory-abi.json")

const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
);

const campaignFactoryContract = new ethers.Contract(
    '0x33C60052C996073B0afAE19B74897d4dFc08ad34',
    campaignFactoryABI,
    provider
);

const campaignContract = (contractAddress) => {
    return new ethers.Contract(
        contractAddress,
        campaignABI,
        provider
    );
} 

class CampaignService {
    async getCampaigns(category) {
        const query = campaignFactoryContract.filters.campaignCreated();
        if(category != "") {
            query = campaignFactoryContract.filters.campaignCreated(null,null,null,null,null,null,category);
        }
        const campaigns = await campaignFactoryContract.queryFilter(query);
        const data = campaigns.map((e) => {
            return {
                title: e.args.title,
                image: e.args.imgURI,
                owner: e.args.owner,
                timeStamp: parseInt(e.args.timestamp),
                amount: ethers.utils.formatEther(e.args.requiredAmount),
                address: e.args.campaignAddress
            }
        });
        return data;
    }
}

export default new CampaignService();