import { groq } from "next-sanity"
import { client } from "./client"

export const getAllEvents = async () => {
    const query = groq`*[_type == "event"]{
        _id,
        title,
        "slug": slug.current,
        description,
        startDateTime,
        endDateTime,
        location,
        category,
        "image": image.asset->url
      }`

    const response = client.fetch(query);
    return response;
}

export const getEventBySlug = async (slug: string) => {
    const query = groq`*[_type == "event" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        description,
        startDateTime,
        endDateTime,
        location,
        category,
        "image": image.asset->url,
        content
      }`

    console.log("Sanity Query - Looking for slug:", slug); // Debug için
    const response = await client.fetch(query, { slug });
    console.log("Sanity Query - Response:", response ? "Found" : "Not found"); // Debug için
    return response;
}