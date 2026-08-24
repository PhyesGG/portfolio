import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Modal from "@/components/Modal";

type ProjectTileProps = {
  title: string;
  description: string;
  tags: string[];
  url?: string; // lien externe (depot public) — prioritaire sur `detail`
  detail?: string[]; // fiche explicative ouverte en modal, aucune sortie du site
  logo?: string; // logo affiche dans la fiche modale (peut etre une URL externe)
  status?: string; // ex: "Prod" quand il n'y a pas de lien public
  delay?: number;
};

export default function ProjectTile({
  title,
  description,
  tags,
  url,
  detail,
  logo,
  status,
  delay = 0,
}: ProjectTileProps) {
  const [open, setOpen] = useState(false);
  const hasDetail = !url && !!detail?.length;

  const cardInner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl uppercase leading-tight">
          {title}
        </h3>
        {url ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-none fill-noir"
            viewBox="0 0 16 16"
          >
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg>
        ) : (
          <span className="badge-gold whitespace-nowrap px-2 py-0.5 text-[10px] uppercase tracking-wider">
            {status ?? "Prod"}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-text/85">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="border border-accent/50 px-2 py-0.5 text-xs text-mut"
          >
            {t}
          </span>
        ))}
      </div>
      {hasDetail && (
        <p className="mt-3 text-xs text-cobalt underline underline-offset-2">
          Voir la fiche
        </p>
      )}
    </>
  );

  return (
    <motion.li
      initial={{ transform: "translateY(-20px)", opacity: 0 }}
      whileInView={{ transform: "translateY(0px)", opacity: 100 }}
      transition={{ duration: 0.5, delay, ease: [0.39, 0.21, 0.12, 0.96] }}
      viewport={{ amount: 0.1, once: true }}
    >
      {url ? (
        <Link
          href={url}
          target="_blank"
          className="shift block h-full border-2 border-accent bg-primary p-5"
        >
          {cardInner}
        </Link>
      ) : hasDetail ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shift block h-full w-full border-2 border-accent bg-primary p-5 text-left"
          >
            {cardInner}
          </button>
          <Modal open={open} setOpen={setOpen}>
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt=""
                className="-mx-4 -mt-4 mb-3 h-16 w-[calc(100%+2rem)] border-b-2 border-accent object-cover object-center sm:h-20 md:-mx-6 md:-mt-6 md:h-24 md:w-[calc(100%+3rem)]"
              />
            )}
            <h2 className="font-display text-2xl uppercase">{title}</h2>
            <div className="mt-4 flex flex-col gap-3">
              {detail!.map((p, i) => (
                <p key={i} className="text-sm text-text/85">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="border border-accent/50 px-2 py-0.5 text-xs text-mut"
                >
                  {t}
                </span>
              ))}
            </div>
          </Modal>
        </>
      ) : (
        <div className="block h-full border-2 border-accent bg-primary p-5">
          {cardInner}
        </div>
      )}
    </motion.li>
  );
}
