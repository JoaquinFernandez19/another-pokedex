"use client";
import { Metadata } from "next";
import { PokeBall } from "./components/content/PokeBall";
export const metadata: Metadata = {
  title: "Pokecollect",
  icons: {
    icon: "/favicon.ico",
  },
};
export default function Home() {
  return <PokeBall />;
}
