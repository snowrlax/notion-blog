import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 max-w-screen-xl w-full pt-12">
                <div className="col-span-8 p-2">
                    <div className="text-4xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex">
                        <div className="p-2 pr-4 flex flex-col justify-center">
                            <Avatar size="big" authorName={blog.author.name} />
                        </div>

                        <div className="">
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random Catchphrase about the authors ability to grab user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}