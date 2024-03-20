export const Skeletons = () => {
    return <div role="status" className="animate-pulse">
        <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="">
                    <div className="h-6 w-6 bg-gray-200 rounded-full mb-4"></div>
                </div>
                <div className="flex justify-center flex-col text-sm pl-2">
                    <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4 ml-2"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-700 font-thin text-sm pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
    </div>

}