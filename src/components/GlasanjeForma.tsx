"use client";

import { submitVote } from "@/actions";
import ActionResponse from "@/models/ActionResponse";
import { useActionState, useEffect, useState } from "react";

const initialState: ActionResponse = {
  success: false,
};

export default function GlasanjeForma() {
  const [state, action, isPending] = useActionState(submitVote, initialState);
  const [displayForm, setDisplayForm] = useState(true);

  useEffect(() => {
    if (state.success) {
      setDisplayForm(false);
      window.dispatchEvent(new CustomEvent("myCustomEvent"));
    }
  }, [state.success]);

  return !displayForm ? (
    <h2 className="text-xl font-medium my-4">Hvala na glasanju!</h2>
  ) : (
    <form
      action={action}
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-white"
    >
      <h2 className="text-2xl font-bold mb-4">Glasaj za svoju sudbinu!</h2>
      {state.error && <div className="text-red-500 mb-4">{state.error}</div>}
      <input
        className="bg-gray-700 border-2 border-blue-500 text-white p-2 rounded-md mb-3 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        name="username"
        min={2}
        max={20}
        placeholder="Unesi svoje ime"
        required
      />
      <label className="text-gray-300 flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          name="prvaKlupa"
          defaultChecked
          className="w-5 h-5"
        />
        Prva Klupa Gang 🔥
      </label>
      <button
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        type="submit"
      >
        {isPending ? "Glasanje..." : "Pošalji glas!"}
      </button>
    </form>
  );
}
