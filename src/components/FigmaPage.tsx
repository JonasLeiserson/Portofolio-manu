import { Link } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { assets, pages, type El } from "@/data/pages";

type To =
  | "/" | "/mapa" | "/japon" | "/barcelona" | "/copenhagen" | "/abu-dhabi"
  | "/new-york" | "/mexico" | "/otros-rumbos" | "/bariloche" | "/mar-abierto";
type Hot = { x: number; y: number; w: number; h: number; to: To; label: string; r?: number; mobile?: string };

const NAV: Hot[] = [
  { x: 96, y: 40, w: 150, h: 40, to: "/mapa", label: "← EL MAPA" },
  { x: 266, y: 40, w: 130, h: 40, to: "/", label: "INICIO ↗" },
];

const HOTSPOTS: Record<string, Hot[]> = {
  Inicio: [{ x: 124, y: 738, w: 370, h: 78, to: "/mapa", label: "ABRIR EL ARCHIVO ↗", r: 1.5, mobile: "bg-[#77e68a] text-[#111827]" }],
  Mapa: [
    { x: 72, y: 420, w: 460, h: 510, to: "/japon", label: "Japón", r: 1.5 },
    { x: 610, y: 375, w: 430, h: 370, to: "/barcelona", label: "Barcelona", r: -2 },
    { x: 1098, y: 360, w: 335, h: 360, to: "/copenhagen", label: "Copenhagen", r: 2 },
    { x: 1480, y: 358, w: 350, h: 320, to: "/abu-dhabi", label: "Abu Dhabi", r: 1 },
    { x: 603, y: 800, w: 405, h: 205, to: "/new-york", label: "New York", r: -1.8 },
    { x: 1085, y: 773, w: 350, h: 220, to: "/mexico", label: "México", r: -1.2 },
    { x: 1481, y: 755, w: 335, h: 245, to: "/otros-rumbos", label: "Otros rumbos", r: -1.8 },
    { x: 70, y: 1000, w: 200, h: 40, to: "/", label: "VOLVÉ AL INICIO ↖" },
  ],
  OtrosRumbos: [
    { x: 1351, y: 976, w: 169, h: 42, to: "/bariloche", label: "BARILOCHE", r: -1.2, mobile: "bg-[#e69177] text-[#25473e]" },
    { x: 1612, y: 977, w: 133, h: 42, to: "/mar-abierto", label: "MAR ABIERTO", r: 1, mobile: "bg-[#e69177] text-[#25473e]" },
  ],
};

const MAP_CARDS: { to: To; title: string; sub: string; bg: string; img?: string | undefined }[] = [
  { to: "/japon", title: "JAPÓN", sub: "TOKYO: CALLES, TEMPLOS", bg: "bg-[#25473e] text-[#ede232]", img: assets["Mapa_rectangle"] },
  { to: "/barcelona", title: "BARCELONA", sub: "una ciudad que fue casa", bg: "bg-[#e69777] text-[#111827]", img: assets["Mapa_image44"] },
  { to: "/copenhagen", title: "COPENHAGEN", sub: "", bg: "bg-[#77e6c8] text-[#111827]", img: assets["Mapa_rectangle3"] },
  { to: "/abu-dhabi", title: "ABU DHABI", sub: "", bg: "bg-[#ff8c00] text-[#111827]", img: assets["Mapa_rectangle5"] },
  { to: "/new-york", title: "NEW YORK", sub: "conociendo el mundo con amistades", bg: "bg-[#111827] text-[#f5f2e8]", img: assets["Mapa_rectangle7"] },
  { to: "/mexico", title: "MÉXICO", sub: "COSTA MAYA", bg: "bg-[#87eabc] text-[#111827]", img: assets["Mapa_rectangle8"] },
  { to: "/otros-rumbos", title: "OTROS RUMBOS", sub: "paisajes, mar, gente", bg: "bg-[#e6b177] text-[#111827]" },
];

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

function rot(r: number) {
  return r ? { transform: `rotate(${r}deg)` } : undefined;
}

function Canvas({ id }: { id: string }) {
  const page = pages[id]!;
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useIso(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1920));
    ro.observe(el);
    setScale(el.clientWidth / 1920);
    return () => ro.disconnect();
  }, []);
  const hots = [...(id === "Inicio" || id === "Mapa" ? [] : NAV), ...(HOTSPOTS[id] ?? [])];
  return (
    <div ref={ref} className={`relative hidden w-full overflow-hidden md:block ${page.bg}`} style={{ aspectRatio: "1920 / 1080" }}>
      <div className={`absolute left-0 top-0 h-[1080px] w-[1920px] origin-top-left overflow-hidden ${page.bg}`} style={{ transform: `scale(${scale})` }}>
        {page.els.map((e: El, i) => {
          const style = { left: e.x, top: e.y, ...rot(e.r) };
          if (e.k === "img") return <img key={i} className={`absolute object-cover ${e.c}`} style={style} src={assets[e.s!] ?? ""} alt="" />;
          if (e.k === "p") return <p key={i} className={`absolute whitespace-pre-line ${e.c}`} style={style}>{e.t}</p>;
          return <div key={i} className={`absolute ${e.c}`} style={style} />;
        })}
        {hots.map((h) => (
          <Link key={h.label} to={h.to} aria-label={h.label} className="fig-hot absolute" style={{ left: h.x, top: h.y, width: h.w, height: h.h, ...rot(h.r ?? 0) }} />
        ))}
      </div>
    </div>
  );
}

const NAV_TEXT = ["← EL MAPA", "INICIO ↗"];

function mobileText(e: El) {
  let c = e.c.replace(/\b(top|left|w|h)-\S+/g, "").replace(/\btext-(\[\d+px\]|\dxl|xl|lg|base|sm)\b/g, "");
  const big = c.includes("font-archivo-black");
  const size = big ? (/text-5xl|text-3xl/.test(e.c) ? "text-2xl" : "text-4xl") : /text-(sm|base)\b/.test(e.c) ? "text-sm" : "text-xl";
  return `${c} ${size}`;
}

function Mobile({ id }: { id: string }) {
  const page = pages[id]!;
  const els = page.els;
  const hot = HOTSPOTS[id] ?? [];
  const hotLabels = hot.map((h) => h.label.trim());
  const texts = els
    .filter((e) => e.k === "p" && !NAV_TEXT.includes(e.t!) && !hotLabels.includes(e.t!.trim()))
    .filter((e) => id !== "Mapa" || e.y < 400)
    .filter((e) => !els.some((d, j) => d.k === "div" && d.w < 1900 && d.x <= e.x && e.x <= d.x + d.w && d.y <= e.y && e.y <= d.y + d.h && els.slice(j).some((im) => im.k === "img" && im.x >= d.x && im.x <= d.x + d.w && im.y >= d.y && im.y <= d.y + d.h)))
    .sort((a, b) => a.y - b.y || a.x - b.x);
  const photos = els
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => e.k === "img")
    .map(({ e, i }) => {
      const frame = els.slice(0, i).reverse().find((d) => d.k === "div" && d.w < 1900 && d.x <= e.x + 2 && e.x <= d.x + d.w && d.y <= e.y + 2 && e.y <= d.y + d.h && !d.c.includes("bg-[#111827] rounded-sm") );
      const bg = frame?.c.match(/bg-\[#\w+\]/)?.[0] ?? "";
      return { e, bg };
    });
  return (
    <div className={`min-h-screen px-5 pb-12 pt-6 md:hidden ${page.bg}`}>
      {id !== "Inicio" && id !== "Mapa" && (
        <nav className="mb-8 flex gap-6">
          <Link to="/mapa" className="font-space-grotesk text-sm font-bold tracking-[1px] text-current">← EL MAPA</Link>
          <Link to="/" className="font-space-grotesk text-sm font-bold tracking-[1px] text-[#ff8c00]">INICIO ↗</Link>
        </nav>
      )}
      <div className="flex flex-col gap-3">
        {texts.map((e, i) => (
          <p key={i} className={`whitespace-pre-line break-words ${mobileText(e)}`}>{e.t}</p>
        ))}
      </div>
      {hot.filter((h) => h.mobile).length > 0 && (
        <div className="mt-8 flex flex-wrap gap-4">
          {hot.filter((h) => h.mobile).map((h) => (
            <Link key={h.label} to={h.to} className={`font-space-grotesk px-6 py-4 text-lg font-bold ${h.mobile}`} style={rot(h.r ?? 0)}>{h.label}</Link>
          ))}
        </div>
      )}
      {id === "Mapa" && (
        <div className="mt-8 grid gap-6">
          {MAP_CARDS.map((c, i) => (
            <Link key={c.to} to={c.to} className={`flex items-center gap-4 rounded p-4 ${c.bg}`} style={rot(HOTSPOTS["Mapa"]?.find((h) => h.to === c.to)?.r ?? 0)}>
              {c.img && <img src={c.img} alt={c.title} className="h-28 w-24 shrink-0 rounded-sm border-[6px] border-[#f5f2e8] object-cover" />}
              <div className="min-w-0">
                <p className="font-archivo-black text-2xl">{c.title}</p>
                {c.sub && <p className="font-caveat text-xl font-bold">{c.sub}</p>}
              </div>
            </Link>
          ))}
          <Link to="/" className="font-space-grotesk text-base font-bold text-[#111827]">VOLVÉ AL INICIO ↖</Link>
        </div>
      )}
      {id !== "Mapa" && (
        <>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {photos.map(({ e, bg }, i) => (
              <div key={i} className={`rounded-sm p-2.5 ${bg}`} style={rot(e.r)}>
                <img src={assets[e.s!] ?? ""} alt="" className="block w-full rounded-sm object-cover" style={{ aspectRatio: `${e.w} / ${e.h}` }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function FigmaPage({ id }: { id: string }) {
  return (
    <main>
      <Canvas id={id} />
      <Mobile id={id} />
    </main>
  );
}
