/* TRAME · OUTREMER — hero de page : une scene en pleine largeur,
   titre en cartouche noir (lisible quel que soit le fond). */
const SCENES = {
  marcheurs: { src: "/trame/scenes/outremer_1_marcheurs.jpg", pos: "center 62%" },
  lampadaire: { src: "/trame/scenes/outremer_2_lampadaire.jpg", pos: "center 45%" },
  cercles: { src: "/trame/scenes/outremer_3_cercles.jpg", pos: "center 55%" },
  tours: { src: "/trame/scenes/outremer_4_tours.jpg", pos: "center 40%" },
} as const;

type Props = {
  scene: keyof typeof SCENES;
  title?: string;
  subtitle?: string;
};

export default function HeroOutremer({ scene, title, subtitle }: Props) {
  const s = SCENES[scene];
  return (
    <section
      className="relative w-full overflow-hidden border-b-2 border-noir no-print"
      style={{ height: "min(52vh, 520px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src}
        alt=""
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "cover", objectPosition: s.pos }}
      />
      {(title || subtitle) && (
        <div className="absolute bottom-8 left-6 md:left-12">
          {title && (
            <h1 className="plate-noir font-display text-3xl md:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="plate-noir mt-2 text-sm md:text-base">{subtitle}</p>
          )}
        </div>
      )}
    </section>
  );
}
