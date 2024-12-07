import Chat from "~~/components/chat";

export default function Map_scene() {
    return (
        <div className="flex flex-row justify-start items-start mt-2 h-full">
            <div className="w-3/5 h-full">
                <div className="card w-full h-full border p-0">
                    <div className="card-body ">
                        <h2 className="card-title bg-green-200 h-[75vh] ">Card 1</h2>
                    </div>
                </div>
            </div>
            <div className="w-2/5 h-full w-[40vw] flex flex-col justify-center items-center">
                <div className="flex-2">
                    <div className="card w-full h-[60vh] border">
                        <Chat/>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="card w-full border">
                        <div className="card-body ">
                            <h2 className="card-title">Card 3</h2>
                            <div className="flex">
                            <button className="outline outline-black m-2 p-2">up</button>
                            <button className="outline outline-black m-2 p-2">down</button>
                            <button className="outline outline-black m-2 p-2">right</button>
                            <button className="outline outline-black m-2 p-2">left</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}