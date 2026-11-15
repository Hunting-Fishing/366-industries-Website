import type { Character, Story } from "./types";

const DB_NAME = "366-tiny-worlds";
function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("characters", { keyPath: "id" });
      db.createObjectStore("stories", { keyPath: "id" });
    };
    request.onerror = () => reject(new Error("Your browser could not open the bookshelf."));
    request.onsuccess = () => resolve(request.result);
  });
}
async function access<T>(store: string, mode: IDBTransactionMode, operation: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, mode);
    const request = operation(transaction.objectStore(store));
    let value: T;
    request.onsuccess = () => { value = request.result as T; };
    transaction.oncomplete = () => { db.close(); resolve(value); };
    transaction.onerror = transaction.onabort = () => {
      db.close();
      reject(new Error("Your browser could not save this book. Export a copy before leaving."));
    };
  });
}
export const getCharacters = () => access<Character[]>("characters", "readonly", s => s.getAll());
export const getStories = () => access<Story[]>("stories", "readonly", s => s.getAll());
export const saveCharacter = (character: Character) => access("characters", "readwrite", s => s.put(character));
export const saveStory = (story: Story) => access("stories", "readwrite", s => s.put(story));
export const deleteCharacter = (id: string) => access("characters", "readwrite", s => s.delete(id));

export async function referencePicture(file: File): Promise<string> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 8_000_000)
    throw new Error("Choose a PNG, JPEG or WebP picture under 8 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width > 12000 || bitmap.height > 12000) throw new Error("Choose a smaller reference picture.");
    const scale = Math.min(1, 1024 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare the reference picture.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/webp", 0.84);
    if (image.length > 2_200_000) throw new Error("Choose a smaller reference picture.");
    return image;
  } finally { bitmap.close(); }
}
export function exportStory(story: Story) {
  // JSON keeps all pictures, character profiles and the continuation bookmark together.
  const url = URL.createObjectURL(new Blob([JSON.stringify({ version: 1, story }, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url; link.download = "tiny-worlds-" + story.id + ".json"; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
