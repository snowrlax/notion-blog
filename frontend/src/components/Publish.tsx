import axios from "axios"
import { Appbar } from "./Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    return <div>
        <Appbar />
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={e => {
                    setTitle(e.target.value)
                }} type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl font-bold rounded-lg mb-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Title" />
                <TextEditor onChange={(e => {
                    setContent(e.target.value)
                })} />
                <button onClick={ async() => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content
                    }, {
                        headers: {
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }} type="button" className="text-gray-900 border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">Submit</button>
            </div>
        </div>
    </div>
}

function TextEditor({onChange}: {onChange : (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="">
        <textarea onChange={onChange} id="message" rows={8} className="block p-2.5 w-full text-md font-light text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
    </div>
}