export const Events = () => {
       const arr = [
        {
            title: "Event Title 1",
            date: "June 15, 2024",
            location: "New York, NY"
        },
        {
            title: "Event Title 2",
            date: "July 20, 2024",
            location: "Los Angeles, CA"
        },
       ]
    return (
        <div className="p-4">
            {arr.map((item)=>(<ul className="space-y-4 pb-2">
                <li className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-150 ease-in-out cursor-pointer">
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.date}</p>
                    <p className="text-gray-600">{item.location}</p>
                </li>
            </ul>
            ))}
        </div>
    )
}