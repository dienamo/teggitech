"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Menu,
  X,
  Globe,
  Instagram,
  Twitter,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const locales = [
    { code: "fr" as const, label: "FR" },
    { code: "en" as const, label: "EN" },
    { code: "ar" as const, label: "ع" },
  ];

  return (
    <div className="flex items-center gap-3">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => router.replace(pathname, { locale: l.code })}
          className={cn(
            "text-[10px] uppercase tracking-widest transition-colors",
            locale === l.code
              ? "text-blue-600 font-bold"
              : "text-neutral-400 hover:text-neutral-900"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  const links = [
    { label: t("offers"), href: "#offres" },
    { label: t("expertises"), href: "#expertises" },
    { label: t("projects"), href: "#projets" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-end bg-white/80 backdrop-blur-md">
      <div className="flex flex-col">
        <span className="text-neutral-900 font-bold tracking-tighter text-xl leading-none">
          TEGGITECH
        </span>
        <span className="text-neutral-400 text-[10px] uppercase tracking-widest mt-1">
          Dakar / Senegal
        </span>
      </div>

      <div className="hidden md:flex items-center gap-12 text-neutral-600 text-xs uppercase tracking-[0.2em] font-medium">
        {links.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="hover:text-blue-600 transition-colors duration-300"
          >
            {item.label}
          </a>
        ))}
        <LanguageSwitcher />
        <button className="bg-neutral-900 text-white px-5 py-2 hover:bg-blue-600 transition-all duration-500 rounded-full text-[10px]">
          {t("cta").toUpperCase()}
        </button>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-neutral-900"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-neutral-900 text-white p-8 flex flex-col justify-center"
          >
            <button
              className="absolute top-8 right-8 text-white/60"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-3xl font-medium">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                {[
                  { code: "fr" as const, label: "FR" },
                  { code: "en" as const, label: "EN" },
                  { code: "ar" as const, label: "ع" },
                ].map((l) => (
                  <span
                    key={l.code}
                    className="text-[10px] uppercase tracking-widest text-white/40"
                  >
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const RotatingTagline = () => {
  const t = useTranslations("taglines");
  const taglines = [t("1"), t("2"), t("3"), t("4")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [taglines.length]);

  return (
    <div className="h-8 overflow-hidden inline-flex align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={taglines[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-blue-600 block font-serif italic lowercase"
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({
  title,
  category,
  number,
}: {
  title: string;
  category: string;
  number: string;
}) => {
  return (
    <motion.div
      whileHover="hover"
      className="relative group cursor-pointer border-l border-neutral-200 pl-6 pb-12"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] text-neutral-300 font-mono">
          {number}
        </span>
        <div className="overflow-hidden">
          <motion.div variants={{ hover: { x: 5, y: -5 } }}>
            <ArrowUpRight
              className="text-neutral-200 group-hover:text-blue-600 transition-colors"
              size={20}
            />
          </motion.div>
        </div>
      </div>

      <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6 bg-neutral-100 flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-2xl bg-neutral-200 border border-neutral-100" />
      </div>

      <h4 className="text-neutral-900 font-serif text-2xl lowercase tracking-tight mb-2">
        {title}
      </h4>
      <p className="text-neutral-400 text-[10px] uppercase tracking-widest">
        {category}
      </p>
    </motion.div>
  );
};

const OffersSection = () => {
  const t = useTranslations("offers");

  const offers = [
    {
      number: "01",
      title: t("conseil.title"),
      description: t("conseil.description"),
      capabilities: [
        t("conseil.cap1"),
        t("conseil.cap2"),
        t("conseil.cap3"),
        t("conseil.cap4"),
      ],
    },
    {
      number: "02",
      title: t("strategie.title"),
      description: t("strategie.description"),
      capabilities: [
        t("strategie.cap1"),
        t("strategie.cap2"),
        t("strategie.cap3"),
        t("strategie.cap4"),
      ],
    },
    {
      number: "03",
      title: t("delivery.title"),
      description: t("delivery.description"),
      capabilities: [
        t("delivery.cap1"),
        t("delivery.cap2"),
        t("delivery.cap3"),
        t("delivery.cap4"),
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const domains = [t("domain1"), t("domain2"), t("domain3"), t("domain4")];
  const sectors = [
    t("sector1"),
    t("sector2"),
    t("sector3"),
    t("sector4"),
    t("sector5"),
  ];

  return (
    <section
      id="offres"
      className="py-32 px-6 lg:px-12 overflow-hidden border-t border-neutral-200"
    >
      <header className="grid grid-cols-12 gap-12 items-baseline border-b border-neutral-200 pb-16 mb-24">
        <div className="col-span-12 lg:col-span-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-4"
          >
            {t("label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic lowercase text-6xl md:text-8xl tracking-tighter leading-[0.9]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-6 text-2xl md:text-3xl font-serif italic lowercase tracking-tight text-blue-600"
          >
            {t("headline")}
          </motion.p>
        </div>
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-300 leading-relaxed"
          >
            {t("description")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm font-light text-neutral-500 leading-relaxed"
          >
            {t("approach")}
          </motion.p>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-24 grid grid-cols-12 gap-12"
      >
        <div className="col-span-12 lg:col-span-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-300 block mb-6">
            {t("domainsLabel")}
          </span>
          <div className="flex flex-wrap gap-3">
            {domains.map((domain, i) => (
              <span
                key={i}
                className="border border-neutral-200 px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-500 hover:border-blue-600/40 hover:text-blue-600 transition-colors cursor-default"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-300 block mb-6">
            {t("sectorsLabel")}
          </span>
          <div className="flex flex-wrap gap-3">
            {sectors.map((sector, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-widest text-neutral-400 after:content-['·'] after:ml-3 after:text-neutral-200 last:after:content-none"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-12 gap-x-12 gap-y-24"
      >
        {offers.map((offer, index) => (
          <motion.div
            key={offer.number}
            variants={itemVariants}
            className={cn(
              "col-span-12 lg:col-span-4 group",
              index === 1 && "lg:mt-24",
              index === 2 && "lg:mt-48"
            )}
          >
            <div className="border-l border-neutral-200 pl-8 h-full flex flex-col">
              <div className="font-mono text-[10px] text-neutral-300 mb-8 flex justify-between items-center">
                <span>{offer.number}</span>
                <ArrowUpRight
                  size={14}
                  className="text-neutral-200 group-hover:text-blue-600 transition-colors"
                />
              </div>

              <h3 className="font-serif italic lowercase text-4xl mb-6 tracking-tight group-hover:text-blue-600 transition-colors duration-500">
                {offer.title}
              </h3>

              <p className="font-sans text-sm font-light text-neutral-500 leading-relaxed mb-10 max-w-sm">
                {offer.description}
              </p>

              <div className="mt-auto pt-8 border-t border-neutral-100">
                <ul className="space-y-3">
                  {offer.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-blue-600/30" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const ExpertisesSection = () => {
  const t = useTranslations("expertises");

  const poles = [
    {
      number: "01",
      title: t("product.title"),
      description: t("product.description"),
      capabilities: [
        t("product.cap1"),
        t("product.cap2"),
        t("product.cap3"),
        t("product.cap4"),
        t("product.cap5"),
      ],
    },
    {
      number: "02",
      title: t("engineering.title"),
      description: t("engineering.description"),
      capabilities: [
        t("engineering.cap1"),
        t("engineering.cap2"),
        t("engineering.cap3"),
        t("engineering.cap4"),
        t("engineering.cap5"),
      ],
    },
  ];

  return (
    <section
      id="expertises"
      className="py-32 px-6 lg:px-12 border-t border-neutral-200"
    >
      <header className="grid grid-cols-12 gap-12 items-baseline pb-16 mb-24">
        <div className="col-span-12 lg:col-span-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-4"
          >
            {t("label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic lowercase text-6xl md:text-8xl tracking-tighter leading-[0.9]"
          >
            {t("title")}
          </motion.h2>
        </div>
        <div className="col-span-12 lg:col-span-6 flex lg:justify-end">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-300 leading-relaxed max-w-xs"
          >
            {t("description")}
          </motion.p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {poles.map((pole, index) => (
          <motion.div
            key={pole.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className={cn("group", index === 1 && "lg:mt-32")}
          >
            <div className="border-l border-neutral-200 pl-8">
              <span className="font-mono text-[10px] text-neutral-300 block mb-8">
                {pole.number}
              </span>

              <h3 className="text-3xl md:text-5xl font-serif italic lowercase tracking-tight mb-8 group-hover:text-blue-600 transition-colors duration-500">
                {pole.title}
              </h3>

              <p className="text-sm font-light text-neutral-500 leading-relaxed mb-12 max-w-md">
                {pole.description}
              </p>

              <div className="border-t border-neutral-100 pt-8">
                <div className="grid grid-cols-2 gap-4">
                  {pole.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-blue-600/30" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <main className="bg-white text-neutral-900 min-h-screen selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />

      <section className="relative pt-48 pb-20 px-6 md:px-12 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-600 text-xs font-mono uppercase tracking-[0.4em] block mb-6">
              {t("hero.label")}
            </span>
            <h1 className="text-6xl md:text-[120px] lg:text-[140px] font-serif leading-[0.85] tracking-tighter lowercase italic">
              {t("hero.title1")} <br />
              <span className="not-italic">{t("hero.title2")}</span> <br />
              <span
                className={cn("text-blue-600", !isRtl && "ml-0 md:ml-32")}
              >
                {t("hero.title3")}
              </span>
            </h1>
          </motion.div>

          <div className={cn("mt-16 max-w-md", !isRtl && "ml-0 md:ml-32")}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-neutral-500 text-sm md:text-base leading-relaxed font-light"
            >
              {t("hero.description")} <RotatingTagline />.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 flex items-center gap-6"
            >
              <button className="group flex items-center gap-3 text-xs uppercase tracking-widest font-bold">
                {t("hero.cta")}
                <div className="w-8 h-[1px] bg-blue-600 group-hover:w-16 transition-all duration-500" />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:flex col-span-4 flex-col justify-between items-end text-right">
          <motion.div
            style={{ y }}
            className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden relative border border-neutral-200 shadow-2xl"
          >
            <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay z-10" />
            <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-blue-600/10 blur-2xl" />
            </div>
            <div className="absolute bottom-6 right-6 z-20">
              <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                {t("hero.imageLabel")}
              </p>
            </div>
          </motion.div>

          <div className="mt-auto space-y-2">
            <p className="text-neutral-300 text-[9px] uppercase tracking-widest leading-none">
              {t("hero.collaborators")}
            </p>
            <p className="text-neutral-700 text-xs font-serif italic">
              {t("hero.collaborator1")}
            </p>
            <p className="text-neutral-700 text-xs font-serif italic">
              {t("hero.collaborator2")}
            </p>
            <p className="text-neutral-700 text-xs font-serif italic">
              {t("hero.collaborator3")}
            </p>
          </div>
        </div>
      </section>

      <OffersSection />

      <ExpertisesSection />

      <section
        id="projets"
        className="px-6 md:px-12 py-32 border-t border-neutral-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline mb-24">
          <div className="md:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif lowercase italic leading-tight">
              {t("projects.title")} <br /> {t("projects.subtitle")}
            </h2>
          </div>
          <div className="md:col-span-8 flex justify-end">
            <p className="max-w-xs text-neutral-400 text-[11px] uppercase tracking-widest leading-loose">
              {t("projects.description")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 md:gap-x-12">
          <ProjectCard
            number="01"
            title={t("projects.project1.title")}
            category={t("projects.project1.category")}
          />
          <div className="lg:pt-24">
            <ProjectCard
              number="02"
              title={t("projects.project2.title")}
              category={t("projects.project2.category")}
            />
          </div>
          <div className="lg:pt-48">
            <ProjectCard
              number="03"
              title={t("projects.project3.title")}
              category={t("projects.project3.category")}
            />
          </div>
        </div>
      </section>

      <footer
        id="contact"
        className="px-6 md:px-12 py-20 bg-neutral-900 text-white relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <h3 className="text-5xl md:text-7xl font-serif italic lowercase tracking-tighter">
              {t("footer.title1")} <br /> {t("footer.title2")}
            </h3>
            <div className="mt-12 flex flex-col gap-4">
              <a
                href="mailto:hello@teggitech.sn"
                className="text-xl md:text-3xl font-light hover:text-blue-400 transition-colors underline underline-offset-8 decoration-neutral-600"
              >
                hello@teggitech.sn
              </a>
              <p className="text-neutral-400 text-xs uppercase tracking-widest mt-4">
                {t("footer.location")}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between items-end">
            <div className="flex gap-8">
              <Instagram
                size={20}
                className="text-neutral-400 hover:text-white cursor-pointer transition-colors"
              />
              <Twitter
                size={20}
                className="text-neutral-400 hover:text-white cursor-pointer transition-colors"
              />
              <Globe
                size={20}
                className="text-neutral-400 hover:text-white cursor-pointer transition-colors"
              />
            </div>

            <div className="text-right mt-24 md:mt-0">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-4">
                {t("footer.newsletter")}
              </p>
              <div className="flex border-b border-white pb-2 max-w-xs">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="bg-transparent outline-none text-[10px] w-full placeholder:text-neutral-500"
                />
                <button className="text-[10px] font-bold">
                  {t("footer.join").toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-neutral-400">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <p className="mt-4 md:mt-0">{t("footer.tagline")}</p>
        </div>
      </footer>
    </main>
  );
}
