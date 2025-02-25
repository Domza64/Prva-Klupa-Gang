"use client";

import { getVotes } from "@/actions";
import Vote from "@/models/Vote";
import { useEffect, useState } from "react";

export default function VotesContainer() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllVotes, setShowAllVotes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getVotes();
      setVotes(data);
      setLoading(false);
    };

    fetchData();

    window.addEventListener("myCustomEvent", fetchData);

    return () => {
      window.removeEventListener("myCustomEvent", fetchData);
    };
  }, []);

  if (loading) {
    return <div className="mt-6">Učitavanje glasova...</div>;
  }

  const trueVotes = votes.filter((item) => item.prva_klupa === true).reverse();
  const falseVotes = votes
    .filter((item) => item.prva_klupa === false)
    .reverse();

  // Calculate the ratio of true vs false votes
  const totalVotes = votes.length;
  const trueRatio = totalVotes > 0 ? (trueVotes.length / totalVotes) * 100 : 0;
  const falseRatio =
    totalVotes > 0 ? (falseVotes.length / totalVotes) * 100 : 0;

  const displayedTrueVotes = showAllVotes ? trueVotes : trueVotes.slice(0, 10);
  const displayedFalseVotes = showAllVotes
    ? falseVotes
    : falseVotes.slice(0, 10);

  return (
    <div className="text-white my-6">
      <div className="flex flex-col items-center mb-10">
        <h3 className="text-xl font-bold mb-3">Omjer glasova</h3>
        <div className="flex h-12 w-full">
          <div
            className="bg-blue-500 text-center text-white flex items-center gap-1 justify-center"
            style={{ flex: trueRatio }}
          >
            <span>{trueRatio.toFixed(1)}%</span>
            <span className="font-bold">{"(" + trueVotes.length + ")"}</span>
          </div>
          <div
            className="bg-red-500 text-center text-white flex items-center gap-1 justify-center"
            style={{ flex: falseRatio }}
          >
            <span>{falseRatio.toFixed(1)}%</span>
            <span className="font-bold">{"(" + falseVotes.length + ")"}</span>
          </div>
        </div>
      </div>

      <div className="flex mb-10">
        <div className="flex-1 mr-5">
          <h3 className="text-lg font-bold mb-3">Prva Klupa Gang 🎓</h3>
          <ul className="list-none p-0">
            {displayedTrueVotes.map((item) => (
              <li
                key={item.id}
                className="mb-2 bg-gray-700 p-2 rounded-md flex justify-between shadow-md"
              >
                <span>{item.username}</span>
                <span className="text-sm text-gray-400 text-right">
                  {item.created_at.toDateString()}
                  <br />
                  {item.created_at.toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-3">Luzeri 🤡</h3>
          <ul className="list-none p-0">
            {displayedFalseVotes.map((item) => (
              <li
                key={item.id}
                className="mb-2 bg-gray-700 p-2 rounded-md flex justify-between shadow-md"
              >
                <span>{item.username}</span>
                <span className="text-sm text-gray-400 text-right">
                  {item.created_at.toDateString()}
                  <br />
                  {item.created_at.toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center">
        {(trueVotes.length > 10 || falseVotes.length > 10) && (
          <button
            className="underline text-white font-medium py-2 px-4 rounded-lg transition duration-300 shadow-lg"
            onClick={() => setShowAllVotes(!showAllVotes)}
          >
            {showAllVotes ? "Prikaži manje" : "Prikaži sve glasove"}
          </button>
        )}
      </div>
    </div>
  );
}
