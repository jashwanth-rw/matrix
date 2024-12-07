import { useState } from 'react';

export default function MapSelect() {
    const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
    const maps=[{
        id : "ID!23e",
        active_players : 5,
        img : "",
    },
    {
        id : "ID!23e",
        active_players : 5,
        img : ""
    },
    {
        id : "ID!23e",
        active_players : 5,
        img : ""
    }];
    return (
        <div className='mt-2 mx-5'>
           <div className='flex items-center justify-between  mx-2 '>
            <div>
                Your Agents
            </div>
           <div className="flex flex-row justify-end items-center space-x-4">
            <button className="btn btn-secondary"> Progress 5%</button>
            <p className='bold'>1000 points</p>
            <select className="select w-full max-w-xs" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option disabled selected>Select Language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Italian</option>
            </select> </div>
           </div>

            <h1>Recent</h1>
            <div className='flex space-x-4'>

            {maps.map((item)=>
                <div className="card border w-[400px] h-[300px] p-0">
                    <div className="card-body ">
                        <h2 className="card-title  ">map {item.id}</h2>
                        <p>{item.active_players} players live</p>
                    </div>
                </div>
            )}
            </div>

            <h1 className='mt-10'>Explore </h1>
            <div className='flex space-x-4'>

            {maps.map((item)=>
                <div className="card border w-[400px] h-[300px] p-0">
                    <div className="card-body ">
                        <h2 className="card-title  ">{item.id}</h2>
                    </div>
                </div>
            )}
            </div>

        </div>
    )
}