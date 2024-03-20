import { SignupInput } from "@snowrlax/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from '../config'

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
        const jwt = response.data.jwt
        localStorage.setItem('token', `Bearer ${jwt}`)
        navigate("/blogs")
    }
    
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signup" ? "Create an Account" : "Welcome Back!"}
                    </div>
                    <div className="text-slate-400">
                        {type === "signup" ? "Already have an account?" : "Don't have an Account?"}
                        <Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                            {type === "signup" ? "Sign In" : "Sign Up"}
                        </Link>
                    </div>
                </div>
                <div className="pt-6">
                    {type === "signup" ? <div> <LabelledInput label="Name" placeholder="pranav sonawnae" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />
                        <LabelledInput label="Username" placeholder="prnvsnwn" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }} /> </div> : null}

                    <LabelledInput label="Email" placeholder="pranav@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label={"Password"} type={"password"} placeholder={""} onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="text-center mt-6 w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5">
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div className="mb-2">
        <label className="block mb-0.5 text-sm font-semibold text-black-900 pt-2">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}