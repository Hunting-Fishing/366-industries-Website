export type Character = {
  id: string; name: string; appearance: string; personality: string; reference?: string;
};
export type Scene = {
  id: string; chapter: number; title: string; text: string; choices: string[];
  illustration: string; image: string | null; imageError?: string; choice?: string;
};
export type Story = {
  id: string; title: string; setting: string; style: string; cast: Character[];
  scenes: Scene[]; token: string; updatedAt: string;
};
export type StudioStatus = { configured: boolean; authenticated: boolean };
