import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"

export const Blog = () => {
    const { id } = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    })
    
    if(loading || !blog) {
        return <div className="">
            Loading...
        </div>
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}