import BlogAndNews from "./BlogAndNews";
import { Events } from "./Events";

export default function BlogAndNewsAndEvents(){
    return(
        <div className="container mx-auto py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <BlogAndNews />
                </div>
                
                <div className="lg:col-span-1">
                    <Events />
                </div>
            </div>
        </div>
    )
}