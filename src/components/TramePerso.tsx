/* TRAME v2 — le perso anime dans les marges.
   - marcheur : descend la marge gauche au rythme du scroll
   - boucles fixes : salut, lecture, spin 3D, idle
   Decoratif : pointer-events none, tres grands ecrans, masque a l'impression,
   versions statiques si prefers-reduced-motion. */
import { useEffect, useRef, useState } from "react";

const FIXED = [
  { anim: "/trame/poses/anim_salut.png", still: "/trame/poses/pose_2_salut.png",
    side: "right" as const, top: "14%", w: 128, flip: true },
  { anim: "/trame/poses/anim_lecture.png", still: "/trame/poses/pose_3_lecture.png",
    side: "right" as const, top: "44%", w: 138, flip: false },
  { anim: "/trame/poses/anim_spin3d.png", still: "/trame/poses/pose_1_face.png",
    side: "right" as const, top: "72%", w: 130, flip: false },
  { anim: "/trame/poses/anim_idle.png", still: "/trame/poses/pose_1_face.png",
    side: "left" as const, top: "78%", w: 118, flip: false },
];

export default function TramePerso() {
  const walker = useRef<HTMLImageElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onMq);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (walker.current)
          walker.current.style.top = `calc(${6 + p * 76}vh)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener?.("change", onMq);
      cancelAnimationFrame(raf);
    };
  }, []);

  const src = (a: string, s: string) => (reduced ? s : a);

  return (
    <div aria-hidden
         className="no-print pointer-events-none fixed inset-0 z-0 hidden 2xl:block">
      {/* le marcheur de marge : il descend la page avec toi */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={walker} alt=""
           src={src("/trame/poses/anim_marche.png", "/trame/poses/pose_4_profil.png")}
           width={132}
           style={{ position: "absolute", left: "2vw", top: "6vh",
                    imageRendering: "pixelated", opacity: 0.94,
                    transition: reduced ? "none" : "top .25s linear" }} />
      {FIXED.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} alt="" src={src(p.anim, p.still)} width={p.w}
             style={{ position: "absolute", top: p.top, [p.side]: "2.2vw",
                      imageRendering: "pixelated", opacity: 0.92,
                      transform: p.flip ? "scaleX(-1)" : undefined }} />
      ))}
    </div>
  );
}
