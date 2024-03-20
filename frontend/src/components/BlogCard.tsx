import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    id: string,
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="">
                    <Avatar authorName={authorName} />
                </div>
                <div className="font-extralight text-center pl-2 flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center text-sm flex-col pl-2">
                    <Circle />
                </div>
                <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + " ..."}
            </div>
            <div className="text-slate-700 font-thin text-sm pt-4">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>

        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 bg-slate-700 rounded-full">

    </div>
}

export function Avatar({ authorName, size = "small" }: { authorName: string, size?: string }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 
    ${size === "big" ? "w-10 h-10" : "w-6 h-6"}`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 ${size === "big" ? "text-md" : "text-xs"}`}>{authorName[0].toUpperCase()}</span>
    </div>
}