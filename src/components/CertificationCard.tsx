import { motion } from "framer-motion";

type CertificationCardProps = {
  title: string;
  issuer: string;
  date?: string;
  note?: string;
  badge: string;
  delay?: number;
};

export default function CertificationCard({
  title,
  issuer,
  date,
  note,
  badge,
  delay = 0,
}: CertificationCardProps) {
  return (
    <motion.li
      initial={{ transform: "translateY(-20px)", opacity: 0 }}
      whileInView={{ transform: "translateY(0px)", opacity: 100 }}
      transition={{ duration: 0.5, delay, ease: [0.39, 0.21, 0.12, 0.96] }}
      viewport={{ amount: 0.1, once: true }}
      className="shift flex flex-col items-center gap-4 border-2 border-accent bg-primary p-6 text-center sm:flex-row sm:text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={badge}
        alt=""
        width={120}
        height={120}
        className="flex-none border-2 border-accent object-contain bg-ivory"
      />
      <div>
        <h3 className="font-display text-xl uppercase">{title}</h3>
        <p className="mt-1 text-sm text-cobalt">{issuer}</p>
        {date && <p className="mt-1 text-xs text-mut">{date}</p>}
        {note && <p className="mt-3 text-sm text-text/85">{note}</p>}
      </div>
    </motion.li>
  );
}
