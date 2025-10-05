import { BlogAndNews } from "./BlogAndNews";
import { Events } from "./Events";

export default function app(){
    return(
        <div className="flex flex-col md:flex-row container mx-auto gap-4">
            <div className="flex-3 bg-green-400 py-12">
            <BlogAndNews />
            </div>
            <div className="flex-1 bg-red-400 py-12">
            <Events />
            </div>
        </div>
    )
}