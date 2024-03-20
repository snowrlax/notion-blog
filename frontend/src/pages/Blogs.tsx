import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeletons } from "../components/Skeletons"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs()

    if (loading) {
    return <div className="">
        <Appbar />
        <div className="flex justify-center w-full">
            <div>
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
            </div>
        </div>
    </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="">
                {
                    blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"19 Mar 2024"}
                        />
                    ))
                }
            </div>
        </div>
    </div>
}