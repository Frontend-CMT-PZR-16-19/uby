import { groq } from "next-sanity"
import { client } from "./client"

export const getAllEvents = async () => {
    const query = groq`*[_type == "event"]{
        _id,
        title,
        "slug": slug.current,
        description,
        startDateTime,
        endDateTime
      }`

    const response = client.fetch(query);
    return response;
}