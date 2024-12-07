import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MapSelect() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const recent_maps = [
    {
      id: "ID!23e",
      active_players: 5,
      img: "https://imgcdn.stablediffusionweb.com/2024/4/4/d4a384e8-35f7-40df-bf6c-3c9ea21f07a5.jpg",
    },
    {
      id: "ID!23e",
      active_players: 5,
      img: "https://imgcdn.stablediffusionweb.com/2024/11/17/4d7dfe9c-2cba-445a-af74-d974d3275a63.jpg",
    },
    {
      id: "ID!23e",
      active_players: 5,
      img: "https://imgcdn.stablediffusionweb.com/2024/10/21/a914a10c-22f6-49b7-b668-a1686bed1738.jpg",
    },
  ];
  const explore_maps = [
    {
      id: "ID!23e",
      active_players: 5,
      img: "https://imgcdn.stablediffusionweb.com/2024/5/10/cd86f399-83b3-4397-96c4-03b09c029fa7.jpg",
    },
    {
      id: "ID!23e",
      active_players: 5,
      img: "https://imgcdn.stablediffusionweb.com/2024/11/9/8bd1e1aa-fae8-42e4-bcbf-a6785ea4db4b.jpg",
    },
    {
      id: "ID!23e",
      active_players: 5,
      img: "https://imgcdn.stablediffusionweb.com/2024/12/2/33cf264d-d538-42f6-a546-91a2f96d4d9d.jpg",
    },
  ];
  return (
    <div className="mt-2 mx-5">
      <div className="flex flex-row justify-end items-center space-x-4">
        <button className="btn btn-secondary" onClick={() => router.push(`/progress`)}> Progress 5%</button>
        <p className="bold">1000 points</p>
        <select
          className="select w-full max-w-xs"
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value)}
        >
          <option disabled selected>
            Select Language
          </option>
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Italian</option>
        </select>{" "}
      </div>

      <h1 className="text-2xl">Recent</h1>
      <div className="flex space-x-4 p-5">
        {recent_maps.map(item => (
          <div
            key={item.id}
            onClick={() => router.push(`/map_scene?id=${item.id}`)}
            className="card border w-[400px] h-[300px] p-0 relative cursor-pointer transition-all duration-300 hover:-translate-y-2"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
            <div className="card-body relative z-10">
              <h2 className="card-title text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-3xl">map {item.id}</h2>
              <p className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-sm absolute bottom-1 right-6 flex items-center gap-2">
                <span className="font-bold text-4xl">{item.active_players}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>{" "}
                players live
              </p>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mt-10 text-2xl">Explore </h1>
      <div className="flex space-x-4 p-5 mb-10">
        {explore_maps.map(item => (
          <div
            key={item.id}
            onClick={() => router.push(`/map_scene?id=${item.id}`)}
            className="card border w-[400px] h-[300px] p-0 relative cursor-pointer transition-all duration-300 hover:-translate-y-2"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
            <div className="card-body relative z-10">
              <h2 className="card-title text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-3xl">{item.id}</h2>
              <p className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-sm absolute bottom-1 right-6 flex items-center gap-2">
                <span className="font-bold text-4xl">{item.active_players}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>{" "}
                players live
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
