import { motion } from "framer-motion";
import Link from "next/link";

type ProjectTileProps = {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  status?: string; // ex: "Prod — self-hosted" quand il n'y a pas de lien public
  delay?: number;
};

export default function ProjectTile({
  title,
  description,
  tags,
  url,
  status,
  delay = 0,
}: ProjectTileProps) {
  const Wrapper = url ? Link : "div";
  const wrapperProps = url ? { href: url, target: "_blank" as const } : {};

  return (
    <motion.li
      initial={{ transform: "translateY(-20px)", opacity: 0 }}
      whileInView={{ transform: "translateY(0px)", opacity: 100 }}
      transition={{ duration: 0.5, delay, ease: [0.39, 0.21, 0.12, 0.96] }}
      viewport={{ amount: 0.1, once: true }}
    >
      {/* @ts-expect-error Wrapper polymorphe Link/div */}
      <Wrapper
        {...wrapperProps}
        className="shift block h-full border-2 border-accent bg-primary p-5"
      >
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
      </Wrapper>
    </motion.li>
  );
}
