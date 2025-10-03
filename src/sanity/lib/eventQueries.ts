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