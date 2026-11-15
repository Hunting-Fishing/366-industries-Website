"use client";

import { useEffect, useRef, useState } from "react";
import type { Character, Scene, Story, StudioStatus } from "./types";
import { deleteCharacter, exportStory, getCharacters, getStories, referencePicture, saveCharacter, saveStory } from "./storage";

type Tab = "create" | "characters" | "bookshelf";
type Event = { type: string; phase?: string; scene?: Scene; storyId?: string; token?: string; error?: string };
const starters = [
  { icon: "✦", title: "The lantern forest", subtitle: "A little fox. A very big secret.", setting: "A glowing woodland where every lantern holds a forgotten wish and an old tree has a door that only opens at twilight.",
    cast: [{ id: "starter-pip", name: "Pip", appearance: "Small rust-orange fox, cream muzzle and tail tip, large dark brown eyes, rounded ears, teal knitted scarf. Always the same scarf and coat markings.", personality: "Curious, gentle, a little nervous but brave when a friend needs help." }] },
  { icon: "♡", title: "Cali & Foxy's adventure", subtitle: "Two friends. Endless possibilities.", setting: "Whiskerton Lands, a bright magical world of cozy villages, secret garden paths and friendly surprises.",
    cast: [{ id: "starter-cali", name: "Cali", appearance: "A small three-legged cat. Rear LEFT leg completely missing: no stump, nub, replacement or fourth leg. Preserve the coat markings from any reference picture.", personality: "Determined, affectionate and adventurous. Moves confidently on three legs." },
    { id: "starter-foxy", name: "Foxy", appearance: "A small well-loved plush fox companion, soft orange fabric, cream muzzle and belly, friendly stitched eyes and rounded ears.", personality: "Loyal, playful and protective of Cali." }] },
  { icon: "☾", title: "The moon gardener", subtitle: "Some things grow in starlight.", setting: "A tiny greenhouse on the moon, where flowers glow like constellations and a missing seed could wake a sleeping planet.",
    cast: [{ id: "starter-nova", name: "Nova", appearance: "A small round mint-green robot, cream faceplate, two amber circular eyes, copper joints, a yellow satchel and a leaf sprout on its head.", personality: "Patient, inventive and fascinated by living things." }] }
];
function Mark({ small = false }: { small?: boolean }) {
  return <svg width={small ? 23 : 32} height={small ? 23 : 32} viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path d="M16 8C12 5 6 5 3 7v19c4-2 9-2 13 1 4-3 9-3 13-1V7c-3-2-9-2-13 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    <path d="M16 8v19M21 12l1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>;
}
function portrait(character: Character) {
  return character.reference ? <img src={character.reference} alt="" /> : <span aria-hidden="true">{character.name.slice(0, 1).toUpperCase()}</span>;
}
const blankCharacter = (): Character => ({ id: crypto.randomUUID(), name: "", appearance: "", personality: "" });

export default function TinyWorlds() {
  const [tab, setTab] = useState<Tab>("create");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [books, setBooks] = useState<Story[]>([]);
  const [selected, setSelected] = useState<Character[]>([]);
  const [hero, setHero] = useState("");
  const [setting, setSetting] = useState("");
  const [style, setStyle] = useState("storybook");
  const [story, setStory] = useState<Story | null>(null);
  const [page, setPage] = useState(0);
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<StudioStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState("writing");
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [editor, setEditor] = useState<Character | null>(null);
  const [referenceBusy, setReferenceBusy] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [ready, setReady] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const inFlight = useRef(false);
  const editorDialog = useRef<HTMLDialogElement>(null);
  const restartDialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  async function refreshStatus() {
    try {
      const response = await fetch("/api/tiny-worlds", { cache: "no-store" });
      if (!response.ok) throw new Error();
      setStatus(await response.json());
    } catch { setError("We could not reach the story studio. Refresh the connection and try again."); }
  }
  useEffect(() => {
    void refreshStatus();
    Promise.all([getCharacters(), getStories()]).then(([cast, saved]) => {
      setCharacters(cast); setBooks(saved.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    }).catch(() => setSaveError("Browser storage is unavailable. You can still read and create, but export each story to keep it."))
      .finally(() => setReady(true));
    return () => abort.current?.abort();
  }, []);
  useEffect(() => {
    if (editor && editorDialog.current && !editorDialog.current.open) editorDialog.current.showModal();
    if (!editor) editorDialog.current?.close();
  }, [editor]);
  useEffect(() => {
    if (confirmRestart) restartDialog.current?.showModal();
    else restartDialog.current?.close();
  }, [confirmRestart]);

  async function keepStory(next: Story) {
    setBooks(previous => [next, ...previous.filter(b => b.id !== next.id)]);
    try { await saveStory(next); setSaveError(""); }
    catch (e) { setSaveError(e instanceof Error ? e.message : "This story could not be saved. Export a copy."); }
  }
  async function keepCharacter(character: Character) {
    setCharacters(previous => [...previous.filter(c => c.id !== character.id), character]);
    try { await saveCharacter(character); }
    catch { setSaveError("Your character could not be saved on this browser. Keep a story export with their profile."); }
  }
  function selectStarter(index: number) {
    const starter = starters[index];
    setSelected(starter.cast); setHero(""); setSetting(starter.setting); setError("");
  }
  function toggleCharacter(character: Character) {
    if (selected.some(c => c.id === character.id)) setSelected(selected.filter(c => c.id !== character.id));
    else if (selected.length < 4) setSelected([...selected, character]);
    else setError("Your story can have up to four returning characters.");
  }
  function newAdventure(cast = selected) {
    setSelected(cast); setStory(null); setPage(0); setIdea(""); setSetting(""); setError(""); setTab("create"); setConfirmRestart(false);
  }
  async function createStory(event: React.FormEvent) {
    event.preventDefault();
    const cast = selected.length ? selected : [{
      id: crypto.randomUUID(), name: hero.split(",")[0].trim().slice(0, 80),
      appearance: hero.trim(), personality: "Curious, kind, and ready for an adventure."
    }];
    if (!cast[0]?.name || !setting.trim()) { setError("Tell us who your character is and where their adventure begins."); return; }
    for (const character of cast) await keepCharacter(character);
    const base: Story = { id: crypto.randomUUID(), title: "A new adventure", setting, style, cast, scenes: [], token: "", updatedAt: new Date().toISOString() };
    await generate("start", base);
  }
  async function generate(action: "start" | "continue" | "illustrate", base: Story, nextIdea?: string) {
    if (inFlight.current) return;
    inFlight.current = true; setBusy(true); setError(""); setPhase(action === "illustrate" ? "painting" : "writing");
    const controller = new AbortController(); abort.current = controller;
    let latest = base, completed = false, checkpoint = false;
    const references = base.cast.filter(c => c.reference).map(c => ({ id: c.id, image: c.reference }));
    const applyEvent = async (event: Event) => {
      if (event.type === "phase" && event.phase) { setPhase(event.phase); return; }
      if (event.type === "error") throw new Error(event.error || "This page could not be created.");
      if ((event.type === "checkpoint" || event.type === "complete") && event.scene && event.storyId && event.token) {
        const scene = event.scene;
        const previous = latest.scenes.filter(s => s.id !== scene.id && s.chapter !== scene.chapter);
        latest = { ...latest, id: event.storyId, token: event.token, title: previous[0]?.title || scene.title,
          scenes: [...previous, scene], updatedAt: new Date().toISOString() };
        checkpoint = true; completed = event.type === "complete";
        setStory(latest); setPage(latest.scenes.length - 1); setIdea("");
        await keepStory(latest);
        // The first finished scene is the appearance anchor for characters without an uploaded reference.
        if (completed && scene.image && latest.scenes.length === 1) {
          for (const character of latest.cast) if (!character.reference) await keepCharacter({ ...character, reference: scene.image });
        }
      }
    };
    try {
      const response = await fetch("/api/tiny-worlds", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({
          action, token: base.token, cast: base.cast, setting: base.setting, style: base.style,
          idea: nextIdea, references, anchor: base.scenes[0]?.image || undefined
        })
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "This page could not be created. Try again.");
      }
      if (!response.body) throw new Error("The story connection was interrupted.");
      const reader = response.body.getReader(), decoder = new TextDecoder();
      let pending = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          pending += decoder.decode(value, { stream: true });
          let newline;
          while ((newline = pending.indexOf("\n")) !== -1) {
            const line = pending.slice(0, newline); pending = pending.slice(newline + 1);
            if (line.trim()) await applyEvent(JSON.parse(line));
          }
        }
        pending += decoder.decode();
        if (pending.trim()) await applyEvent(JSON.parse(pending));
        if (!completed) throw new Error(checkpoint ? "Your page is saved. Retry its illustration to finish it." : "The story connection ended early. Try again.");
      } finally { reader.releaseLock(); }
    } catch (e) {
      setError(controller.signal.aborted
        ? (checkpoint ? "Your written page is saved. You can retry its illustration." : "Creation stopped. Your previous story is safe.")
        : e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      inFlight.current = false; setBusy(false); abort.current = null;
      setTimeout(() => heading.current?.focus(), 0);
    }
  }
  function openBook(book: Story) { setStory(book); setPage(book.scenes.length - 1); setTab("create"); setError(""); }
  const scene = story?.scenes[page];
  const latestPage = story ? page === story.scenes.length - 1 : false;
  const canGenerate = Boolean(status?.configured && status?.authenticated);
  const statusNotice = status && !status.configured
    ? "Story creation is being connected. Build your cast and choose an adventure while we get it ready."
    : status && !status.authenticated ? "Sign in to your 366 account to bring your story to life." : "";
  const currentCast = story?.cast || selected;

  return <div className="tw">
    <a className="tw-skip" href="#tw-main">Skip to story studio</a>
    <header className="tw-header">
      <a className="tw-logo" href="/tiny-worlds"><Mark /><span>Tiny Worlds<small>A 366 INDUSTRIES STORY STUDIO</small></span></a>
      <nav aria-label="Story studio">
        {(["create", "characters", "bookshelf"] as Tab[]).map(value =>
          <button key={value} className={tab === value ? "active" : ""} disabled={busy} aria-current={tab === value ? "page" : undefined}
            onClick={() => { setTab(value); setError(""); }}>{value === "create" ? "Story studio" : value === "characters" ? "My characters" : "Bookshelf"}
            {value === "bookshelf" && books.length > 0 && <span className="tw-count">{books.length}</span>}</button>)}
      </nav>
      <a href="/" className="tw-parent">366 Industries <span aria-hidden="true">↗</span></a>
    </header>
    <main id="tw-main" className="tw-main">
      {error && <div role="alert" className="tw-notice error"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss message">×</button></div>}
      {saveError && <div role="alert" className="tw-notice">{saveError}{story && <button onClick={() => exportStory(story)}>Export story</button>}</div>}
      {tab === "create" && !story && <>
        <section className="tw-intro">
          <div className="tw-intro-copy"><div className="tw-eyebrow"><span/> BIG ADVENTURES START SMALL</div>
            <h1>A little idea.<br/>An entire <em>world.</em></h1>
            <p>Dream up a character. Open a door.<br/>Make a story that follows your imagination.</p>
            <div className="tw-feature-line"><span>✦ Illustrated with AI</span><span>♡ Characters that stay with you</span></div>
          </div>
          <div className="tw-cover">
            <img src="/assets/tiny-worlds-cover.webp" alt="A small fox in a teal scarf discovers a lantern-lit tree house in an enchanted forest." />
            <div className="tw-cover-caption"><span>ONCE UPON YOUR IMAGINATION</span><strong>What will you discover?</strong></div>
            <span className="tw-cover-label"><Mark small/> Your next adventure awaits</span>
          </div>
        </section>
        <section className="tw-create-grid" aria-label="Create your story">
          <form className="tw-compose" onSubmit={createStory}>
            <div className="tw-section-heading"><div><span className="tw-eyebrow">THE FIRST PAGE</span><h2>Every story starts with you.</h2></div><span className="tw-small-spark">✧</span></div>
            <label className="tw-label" htmlFor="tw-hero"><span className="tw-step">1</span> Meet your main character</label>
            {selected.length ? <div className="tw-cast-selection">
              {selected.map(c => <div key={c.id} className="tw-cast-chip"><div className="tw-avatar">{portrait(c)}</div><div><strong>{c.name}</strong><small>Appearance remembered</small></div><button type="button" onClick={() => setSelected(selected.filter(x => x.id !== c.id))} aria-label={"Remove " + c.name + " from this cast"}>×</button></div>)}
              <button type="button" className="tw-text-button" onClick={() => setEditor(blankCharacter())}>+ Add a friend</button>
            </div> : <input id="tw-hero" value={hero} onChange={e => setHero(e.target.value)} maxLength={1500} required placeholder="Pip, a tiny orange fox with a teal scarf…" />}
            <div className="tw-field-meta"><span>Keep the little details that make them unique.</span><button type="button" onClick={() => setTab("characters")}>Choose saved characters ↗</button></div>
            <label className="tw-label" htmlFor="tw-setting"><span className="tw-step">2</span> Where does it all begin?</label>
            <textarea id="tw-setting" value={setting} onChange={e => setSetting(e.target.value)} required maxLength={1500} rows={3} placeholder="A lantern-lit forest where the trees whisper forgotten wishes…" />
            <fieldset className="tw-styles"><legend><span className="tw-step">3</span> Give your world a look</legend>
              {[["storybook", "✦", "Storybook"], ["watercolor", "◉", "Watercolor"], ["clay", "◒", "Soft clay"]].map(([id, icon, label]) =>
                <label key={id} className={style === id ? "selected" : ""}><input type="radio" name="art-style" value={id} checked={style === id} onChange={() => setStyle(id)}/><span aria-hidden="true">{icon}</span>{label}</label>)}
            </fieldset>
            {statusNotice && <div className="tw-setup-note">{statusNotice}{status?.configured && !status.authenticated && <a href="/login">Sign in ↗</a>}</div>}
            {!status && <button type="button" className="tw-text-button" onClick={() => void refreshStatus()}>Refresh connection</button>}
            <button className="tw-primary tw-start" disabled={busy || !ready || !canGenerate} type="submit">{busy ? <><span className="tw-spinner"/> Opening your world…</> : <>Create my story <span aria-hidden="true">✦</span></>}</button>
            <small className="tw-form-foot">Your words. Your choices. A new illustration on every page.</small>
          </form>
          <aside className="tw-starters"><div className="tw-eyebrow">A SPARK OF INSPIRATION</div><h2>Not sure where to begin?</h2><p>Borrow a little idea. Make it your own.</p>
            {starters.map((starter, index) => <button className={"tw-starter tw-starter-" + index} key={starter.title} onClick={() => selectStarter(index)} disabled={busy}><span className="tw-starter-icon">{starter.icon}</span><span><strong>{starter.title}</strong><small>{starter.subtitle}</small></span><span aria-hidden="true">↗</span></button>)}
            <div className="tw-continuity"><span aria-hidden="true">♡</span><h3>Familiar faces. New adventures.</h3><p>Save your characters, add a reference picture, and bring the same friends into every new world.</p><button onClick={() => setTab("characters")}>Meet your cast <span aria-hidden="true">→</span></button></div>
          </aside>
        </section>
      </>}
      {tab === "create" && story && scene && <>
        <div className="tw-reader-top"><div><span className="tw-eyebrow">YOUR LIVING STORYBOOK</span><h1>{story.title}</h1></div>
          <div className="tw-reader-actions"><button disabled={busy} onClick={() => exportStory(story)}>Export book ↓</button><button disabled={busy} onClick={() => setConfirmRestart(true)}>↺ Restart</button></div>
        </div>
        <div className="tw-reader-grid">
          <article className="tw-book" aria-busy={busy}>
            <div className="tw-scene-image">{scene.image ? <img src={scene.image} alt={scene.illustration} /> : <div className="tw-image-empty"><Mark/><strong>{busy ? "A little color. A little wonder." : "An illustration is waiting."}</strong><p>{busy ? "Bringing your characters into this scene…" : scene.imageError || "Your words are saved. Finish this page with an illustration."}</p>
              {!busy && <button className="tw-primary" disabled={!canGenerate || !latestPage} onClick={() => void generate("illustrate", story)}>Retry illustration ✦</button>}
            </div>}
              <span className="tw-page-label">CHAPTER {String(scene.chapter).padStart(2, "0")}</span>
            </div>
            <div className="tw-page-text"><span className="tw-eyebrow">AND SO THE STORY GOES…</span><h2 ref={heading} tabIndex={-1}>{scene.title}</h2>
              {scene.choice && <div className="tw-your-choice">You chose: {scene.choice}</div>}
              {scene.text.split(/\n+/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              <div className="tw-page-controls"><button onClick={() => setPage(page - 1)} disabled={page === 0 || busy} aria-label="Previous chapter">←</button><span>{page + 1} / {story.scenes.length}</span><button onClick={() => setPage(page + 1)} disabled={latestPage || busy} aria-label="Next chapter">→</button></div>
            </div>
          </article>
          <aside className="tw-story-sidebar">
            <div className="tw-cast-panel"><span className="tw-eyebrow">YOUR TRAVELING COMPANIONS</span>{currentCast.map(c => <div className="tw-cast-row" key={c.id}><div className="tw-avatar">{portrait(c)}</div><div><strong>{c.name}</strong><small>{c.personality}</small></div></div>)}
              <details><summary>Character &amp; world memory</summary>{currentCast.map(c => <p key={c.id}><strong>{c.name}</strong><br/>{c.appearance}</p>)}<p><strong>Your world</strong><br/>{story.setting}</p><small>Character details stay fixed for this adventure. Edit saved characters for the next one.</small></details>
            </div>
            <div className="tw-next"><span className="tw-eyebrow">YOU TURN THE PAGE</span><h2>What happens next?</h2>
              {latestPage ? <>
                {scene.choices.map((choice, i) => <button className="tw-choice" key={choice} disabled={busy || !scene.image || !canGenerate} onClick={() => void generate("continue", story, choice)}><span>{String(i + 1).padStart(2, "0")}</span>{choice}<b aria-hidden="true">→</b></button>)}
                <div className="tw-or"><span/>or follow your own imagination<span/></div>
                <form onSubmit={e => { e.preventDefault(); if (idea.trim()) void generate("continue", story, idea); }}>
                  <label className="tw-sr" htmlFor="tw-idea">Your idea for the next scene</label><textarea id="tw-idea" value={idea} onChange={e => setIdea(e.target.value)} maxLength={1200} rows={3} placeholder="What if they discover…" disabled={busy}/>
                  <button className="tw-primary" disabled={busy || !idea.trim() || !scene.image || !canGenerate}>Write my next page <span aria-hidden="true">↗</span></button>
                </form>
                {statusNotice && <p className="tw-setup-note">{statusNotice}{!status?.authenticated && <a href="/login">Sign in ↗</a>}</p>}
              </> : <p>This is an earlier chapter. <button className="tw-text-button" onClick={() => setPage(story.scenes.length - 1)}>Return to the latest page →</button></p>}
            </div>
          </aside>
        </div>
      </>}
      {tab === "characters" && <section className="tw-library">
        <div className="tw-library-top"><div><span className="tw-eyebrow">THE PEOPLE IN YOUR PAGES</span><h1>Small characters.<br/><em>Lasting friendships.</em></h1><p>Save their appearance, personality, and reference picture. Bring them back in any story.</p></div><button className="tw-primary" onClick={() => setEditor(blankCharacter())}>+ Create a character</button></div>
        {!ready ? <p role="status">Opening your character collection…</p> : characters.length === 0 ? <div className="tw-empty"><Mark/><h2>Your cast is waiting to meet you.</h2><p>Create a friend or start with Cali &amp; Foxy.</p><button className="tw-primary" onClick={() => { selectStarter(1); setTab("create"); }}>Begin with Cali &amp; Foxy →</button></div> :
        <div className="tw-character-grid">{characters.map(c => <article key={c.id} className="tw-character-card">
          <div className="tw-character-picture">{portrait(c)}<span>APPEARANCE SAVED</span></div><div className="tw-character-body"><h2>{c.name}</h2><p>{c.personality}</p><details><summary>Appearance details</summary><p>{c.appearance}</p></details><div className="tw-character-actions"><button className={selected.some(x => x.id === c.id) ? "tw-primary" : "tw-secondary"} aria-pressed={selected.some(x => x.id === c.id)} onClick={() => toggleCharacter(c)}>{selected.some(x => x.id === c.id) ? "✓ In your cast" : "+ Add to cast"}</button><button className="tw-text-button" onClick={() => setEditor({ ...c })}>Edit</button></div></div>
        </article>)}</div>}
        {selected.length > 0 && <div className="tw-cast-tray"><span>{selected.map(c => c.name).join(" + ")}<small>{selected.length} / 4 characters selected</small></span><button className="tw-primary" onClick={() => { newAdventure(selected); }}>Start an adventure →</button></div>}
      </section>}
      {tab === "bookshelf" && <section className="tw-library">
        <div className="tw-library-top"><div><span className="tw-eyebrow">WORLDS WORTH COMING BACK TO</span><h1>Your <em>bookshelf.</em></h1><p>Every choice, every chapter, every little adventure.</p></div><button className="tw-primary" onClick={() => newAdventure([])}>+ A new story</button></div>
        {!ready ? <p role="status">Opening your bookshelf…</p> : books.length === 0 ? <div className="tw-empty"><Mark/><h2>The first page is still unwritten.</h2><p>Your stories will find a home here.</p><button className="tw-primary" onClick={() => setTab("create")}>Dream up a world ✦</button></div> :
        <div className="tw-books-grid">{books.map(book => <article className="tw-saved-book" key={book.id}><button onClick={() => openBook(book)} className="tw-book-open">
          <div className="tw-saved-cover">{book.scenes.find(s => s.image)?.image ? <img src={book.scenes.find(s => s.image)!.image!} alt=""/> : <Mark/>}<span>{book.scenes.length} CHAPTER{book.scenes.length === 1 ? "" : "S"}</span></div>
          <div><h2>{book.title}</h2><p>{book.cast.map(c => c.name).join(" & ")}</p><small>Continue the adventure →</small></div></button><button className="tw-same-cast" onClick={() => newAdventure(book.cast.map(c => characters.find(saved => saved.id === c.id) || c))}>New adventure with this cast ↗</button>
        </article>)}</div>}
      </section>}
      {busy && <div className="tw-progress" role="status" aria-live="polite"><span className="tw-spinner"/><div><strong>{phase === "writing" ? "Following your imagination…" : "Painting your little world…"}</strong><small>{phase === "writing" ? "Remembering your characters and writing the next page." : "Matching familiar faces, adding a little magic. This can take a minute or two."}</small></div><button onClick={() => abort.current?.abort()}>Stop</button></div>}
    </main>
    <footer className="tw-footer"><span><Mark small/> A little wonder goes a long way.</span><span>Saved on this browser · Export to keep a backup</span><a href="/">Made by 366 Industries ↗</a></footer>
    <dialog ref={editorDialog} className="tw-dialog" onCancel={() => setEditor(null)} onClose={() => setEditor(null)}>
      {editor && <form onSubmit={async e => {
        e.preventDefault();
        const saved = { ...editor, name: editor.name.trim(), appearance: editor.appearance.trim(), personality: editor.personality.trim() || "Curious and kind." };
        if (!saved.name || !saved.appearance) return;
        await keepCharacter(saved);
        setSelected(previous => previous.some(c => c.id === saved.id) ? previous.map(c => c.id === saved.id ? saved : c) : previous.length < 4 ? [...previous, saved] : previous);
        setEditor(null);
      }}><div className="tw-dialog-heading"><div><span className="tw-eyebrow">A FRIEND TO REMEMBER</span><h2>Your character card</h2></div><button type="button" onClick={() => setEditor(null)} aria-label="Close character editor">×</button></div>
        <label className="tw-label" htmlFor="tw-name">Their name</label><input id="tw-name" value={editor.name} required maxLength={80} onChange={e => setEditor({ ...editor, name: e.target.value })} placeholder="Cali"/>
        <label className="tw-label" htmlFor="tw-appearance">What makes them look like them?</label><textarea id="tw-appearance" value={editor.appearance} required maxLength={1500} rows={3} onChange={e => setEditor({ ...editor, appearance: e.target.value })} placeholder="Coat or skin color, eyes, clothes, shape, unique details…"/>
        <label className="tw-label" htmlFor="tw-personality">Their personality</label><textarea id="tw-personality" value={editor.personality} maxLength={800} rows={2} onChange={e => setEditor({ ...editor, personality: e.target.value })} placeholder="Brave, curious, and always looking out for a friend…"/>
        <label className="tw-reference-upload"><div className="tw-avatar">{portrait(editor)}</div><span><strong>{referenceBusy ? "Preparing picture…" : "Add a reference picture"}</strong><small>PNG, JPEG or WebP · Helps keep their appearance consistent</small></span><input type="file" accept="image/png,image/jpeg,image/webp" disabled={referenceBusy} onChange={async e => {
          const file = e.target.files?.[0]; if (!file) return; setReferenceBusy(true);
          try { const reference = await referencePicture(file); setEditor(previous => previous ? { ...previous, reference } : null); }
          catch (err) { setError(err instanceof Error ? err.message : "Could not load this picture."); }
          finally { setReferenceBusy(false); }
        }}/></label>
        {editor.reference && <button type="button" className="tw-text-button" onClick={() => setEditor({ ...editor, reference: undefined })}>Remove reference picture</button>}
        <div className="tw-dialog-actions">{characters.some(c => c.id === editor.id) && <button type="button" className="tw-text-button" onClick={async () => {
          try { await deleteCharacter(editor.id); setCharacters(characters.filter(c => c.id !== editor.id)); setSelected(selected.filter(c => c.id !== editor.id)); setEditor(null); }
          catch { setError("This character could not be removed."); }
        }}>Remove from collection</button>}<button className="tw-primary" disabled={referenceBusy}>Save character ♡</button></div>
      </form>}
    </dialog>
    <dialog ref={restartDialog} className="tw-dialog tw-restart" onCancel={() => setConfirmRestart(false)} onClose={() => setConfirmRestart(false)}>
      <Mark/><h2>A fresh first page?</h2><p>Your current book stays on the bookshelf. Keep your cast for a new adventure, or start with someone new.</p><div className="tw-restart-options"><button className="tw-primary" onClick={() => newAdventure((story?.cast || []).map(c => characters.find(saved => saved.id === c.id) || c))}>New adventure, same cast</button><button className="tw-secondary" onClick={() => newAdventure([])}>Start with new characters</button><button className="tw-text-button" onClick={() => setConfirmRestart(false)}>Keep reading</button></div>
    </dialog>
  </div>;
}
