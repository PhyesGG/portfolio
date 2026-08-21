/* TRAME · OUTREMER — le perso pose dans les marges, a des endroits fixes
   de la PAGE (pas du viewport) : il defile normalement avec le scroll,
   il ne suit plus le visiteur. Decoratif : pointer-events none, tres
   grands ecrans, masque a l'impression, poses statiques si
   prefers-reduced-motion. */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const ITEMS = [
  { anim: "/trame/poses/anim_marche.png", still: "/trame/poses/pose_4_profil.png",
    side: "left" as const, top: "8%", w: 128, flip: false },
  { anim: "/trame/poses/anim_salut.png", still: "/trame/poses/pose_2_salut.png",
    side: "right" as const, top: "24%", w: 128, flip: true },
  { anim: "/trame/poses/anim_lecture.png", still: "/trame/poses/pose_3_lecture.png",
    side: "left" as const, top: "48%", w: 138, flip: false },
  { anim: "/trame/poses/anim_spin3d.png", still: "/trame/poses/pose_1_face.png",
    side: "right" as const, top: "66%", w: 130, flip: false },
  { anim: "/trame/poses/anim_idle.png", still: "/trame/poses/pose_1_face.png",
    side: "left" as const, top: "86%", w: 118, flip: false },
];

export default function TramePerso() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onMq);
    return () => mq.removeEventListener?.("change", onMq);
  }, []);

  // Le calque doit couvrir toute la hauteur du DOCUMENT (pas juste le
  // viewport) pour que les persos restent a leur place dans la page et
  // defilent avec le contenu au lieu de rester colles a l'ecran.
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        wrapRef.current.style.height = `${document.documentElement.scrollHeight}px`;
      }
    };
    measure();
    const raf1 = requestAnimationFrame(measure);
    const t1 = setTimeout(measure, 300);
    const t2 = setTimeout(measure, 1000); // apres chargement des images/polices
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [router.asPath]);

  const src = (a: string, s: string) => (reduced ? s : a);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="no-print pointer-events-none absolute left-0 top-0 right-0 z-0 hidden 2xl:block"
    >
      {ITEMS.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          alt=""
          src={src(p.anim, p.still)}
          width={p.w}
          style={{
            position: "absolute",
            top: p.top,
            [p.side]: "2.2vw",
            imageRendering: "pixelated",
            opacity: 0.92,
            transform: p.flip ? "scaleX(-1)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
