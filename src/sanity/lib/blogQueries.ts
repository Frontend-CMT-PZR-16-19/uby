import { groq } from "next-sanity"
import { client } from "./client"

export const getAllPosts = async () => {
    const query = groq`*[_type == "post"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        body,
        publishedAt,
        "image": mainImage.asset->url,
        "author": author-> {
            name,
            "image": image.asset->url
        },
        categories[]-> {
            title
        }
    }`

    console.log("Sanity Query: Fetching posts");
    const response = await client.fetch(query);
    console.log("Sanity Query: Posts response length:", response?.length || 0);
    return response;
}

export const getLatestPosts = async (limit: number = 4) => {
    const query = groq`*[_type == "post"] | order(_createdAt desc)[0...${limit}] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "image": mainImage.asset->url,
        "author": author-> {
            name
        }
    }`

    const response = await client.fetch(query);
    return response;
}

export const getPostBySlug = async (slug: string) => {
    const query = groq`*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        body,
        publishedAt,
        "image": mainImage.asset->url,
        "author": author-> {
            name,
            "image": image.asset->url
        },
        categories[]-> {
            title
        }
    }`

    const response = await client.fetch(query, { slug });
    return response;
}