import Image from "next/image";

export const BlogAndNews = () => {

    const arr = [1,2,3]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-4">
            {arr.map((item) => (
                <div key={item} className="flex flex-col hover: transition-transform duration-150 ease-in-out cursor-pointer">
                    <div className="w-full h-68 bg-red-500 ">
                        <Image 
                            src={`/images/${item}.jpg`}
                            alt={`Blog post ${item}`} 
                            width={500}
                            height={300} 
                        />
                        <div className="bg-white p-2">
                            <h2 className="text-lg font-bold mb-2 text-gray-700">Blog Post Title {item}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}