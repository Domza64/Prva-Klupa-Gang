"use server";

import { neon } from "@neondatabase/serverless";
import Vote from "./models/Vote";
import ActionResponse from "./models/ActionResponse";

export async function getVotes(): Promise<Vote[]> {
  // Simulate a delay for demonstration purposes
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const sql = neon(`${process.env.DATABASE_URL}`);

  const votes = await sql("SELECT * FROM potpisi");

  return votes.map((vote) => ({
    id: vote.id,
    username: vote.username,
    prva_klupa: vote.prva_klupa,
    created_at: vote.created_at,
  }));
}

export async function submitVote(
  _: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  // Simulate a delay for demonstration purposes
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  // Connect to the Neon database
  const sql = neon(`${process.env.DATABASE_URL}`);

  // Extract the username and comment from the form data
  const username = formData.get("username") as string;
  const isPrvaKlupa = formData.get("prvaKlupa") as string;

  // CREATE TABLE IF NOT EXISTS potpisi (id SERIAL PRIMARY KEY, username TEXT NOT NULL, prva_klupa BOOLEAN NOT NULL, created_at TIMESTAMP DEFAULT NOW());

  if (!username || username.length < 2 || username.length > 20) {
    return {
      success: false,
      error: "Username must be between 2 and 20 characters long.",
    };
  }

  await sql(
    "INSERT INTO potpisi (username, prva_klupa, created_at) VALUES ($1, $2, NOW())",
    [username, isPrvaKlupa ? true : false]
  );

  return {
    success: true,
  };
}
