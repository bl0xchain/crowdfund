import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { create } from 'ipfs-http-client'
import { toast } from 'react-toastify';
import {ethers} from 'ethers';
import CampaignFactory from "../services/abis/campaign-factory-abi.json"
import { useDispatch, useSelector } from "react-redux";
import { showPopUp } from "../redux/slices/walletSlice";

const CreateCampaign = () => {
    const projectId = '2FwJU9nopNtm7wEpkn8hS52E33V'
    const projectSecret = '749ebac6306b40895333522fa111e71d'
    const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

    const dispatch = useDispatch()
    const status = useSelector((state) => state.wallet.status)

    const [title, setTitle] = useState("")
    const [story, setStory] = useState("")
    const [requiredAmount, setRequiredAmount] = useState("")
    const [category, setCategory] = useState("Education")
    const [image, setImage] = useState(null)
    const [imageUri, setImageUri] = useState("")
    const [creating, setCreating] = useState(false)
    const [address, setAddress] = useState("")

    const client = create({
        host:'ipfs.infura.io',
        port:'5001',
        protocol: 'https',
        headers: {
            authorization: auth
        }
    })

    const handleUploadImage = async() => {
        if(image !== null) {
            try {
                const added = await client.add(image);
                setImageUri(added.path)
                toast.success('Create a campaign now!')
            } catch (error) {
                console.log(error)
                toast.warn(`Error Uploading Image`);
            }
        } else {
            toast.warn(`Select an Image first`);
        }
    }


    const handleCreateCampaign = async() => {
        if(title == '') {
            toast.error('Enter campaign title')
            return false
        }
        if(story == '') {
            toast.error('Enter campaign details')
            return false
        }
        if(requiredAmount == '') {
            toast.error('Enter required amount')
            return false
        }
        if(imageUri == '') {
            toast.error('Upload image to IPFS')
            return false
        }

        if(status !== 'CONNECTED') {
            dispatch(showPopUp())
        } else {
            setCreating(true)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                '0x33C60052C996073B0afAE19B74897d4dFc08ad34',
                CampaignFactory,
                signer
            );
            const amount = ethers.utils.parseEther(requiredAmount)
            const campaignData = await contract.createCampaign(
                title,
                amount,
                imageUri,
                category,
                story
            );
            await campaignData.wait();   
            setAddress(campaignData.to);
            setCreating(false)
        }

        
    }

    return (
        <div className="max-w-screen-xl mx-auto mt-16 border-gray-200 bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="mb-4">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="campaign-name"
                                value="Campaign Name"
                            />
                        </div>
                        <TextInput
                            id="campaign-name"
                            type="text"
                            sizing="md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="campaign-details"
                                value="Campaign Details"
                            />
                        </div>
                        <Textarea
                            id="campaign-details"
                            placeholder="Add campaign details..."
                            required={true}
                            rows={4}
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="required-amount"
                                    value="Required Amount (ETH)"
                                />
                            </div>
                            <TextInput
                                id="required-amount"
                                type="number"
                                sizing="md"
                                value={requiredAmount}
                                onChange={(e) => setRequiredAmount(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="category"
                                    value="Select Category"
                                />
                            </div>
                            <Select
                                id="category"
                                required={true}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Education</option>
                                <option>Health</option>
                                <option>Animal</option>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <div className="mb-2 block">
                                <Label
                                htmlFor="file"
                                value="Upload file"
                                />
                            </div>
                            <input className="block w-full p-1 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"
                            onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="mb-4">
                            <div className="mb-2 block">
                                <Label
                                htmlFor="file"
                                value="&nbsp;"
                                />
                            </div>
                            <Button onClick={handleUploadImage}>Upload file to IPFS</Button>
                        </div>
                    </div>
                    <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                </div>
            </div>
            <h2>Address: {address}</h2>
        </div>
    )
}

export default CreateCampaign;