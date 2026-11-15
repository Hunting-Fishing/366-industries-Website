import type { Metadata } from "next";
import TinyWorlds from "./studio";
import "./tiny-worlds.css";

export const metadata: Metadata = {
  title: "Tiny Worlds — Your imagination, illustrated",
  description: "Create a living storybook with returning characters, illustrated scenes, and a new adventure in every choice."
};
export default function TinyWorldsPage() { return <TinyWorlds />; }
