import { groq } from "next-sanity"
import { client } from "./client"

export const getAllCampaigns = async () => {
    const query = groq`*[_type == "campaign"] | order(_createdAt desc) {
        _id,
        title,
        description,
        "image": image.asset->url,
        imageUrl
      }`

    console.log("Sanity Query: Fetching campaigns"); // Debug için
    const response = await client.fetch(query);
    console.log("Sanity Query: Response length:", response?.length || 0); // Debug için
    return response;
}