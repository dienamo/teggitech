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
  Smartphone,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LanguageSwitcher = ({ dark = false }: { dark?: boolean }) => {
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
              ? "text-blue-400 font-bold"
              : dark
                ? "text-white/40 hover:text-white"
                : "text-neutral-500 hover:text-neutral-900"
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
    { label: t("mobile"), href: "#mobile" },
    { label: t("projects"), href: "#projets" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:py-8 md:px-12 flex justify-between items-end bg-white/80 backdrop-blur-md">
      <div className="flex flex-col">
        <span className="text-neutral-900 font-bold tracking-tighter text-xl leading-none">
          TEGGITECH
        </span>
        <span className="text-neutral-500 text-[10px] uppercase tracking-widest mt-1">
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
        className="md:hidden text-neutral-900 z-[70] relative"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-neutral-900 text-white flex flex-col"
          >
            <div className="px-6 py-5 flex items-end">
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tighter text-xl leading-none">
                  TEGGITECH
                </span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                  Dakar / Senegal
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6">
              <div className="flex flex-col gap-6">
                {links.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="text-white/20 font-mono text-[10px]">
                      0{i + 1}
                    </span>
                    <span className="text-3xl font-medium group-hover:text-blue-400 transition-colors">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="px-6 pb-10">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-white text-neutral-900 py-4 text-xs uppercase tracking-widest font-bold text-center rounded-full"
              >
                {t("cta")}
              </a>
              <div className="mt-6 flex items-center justify-between">
                <LanguageSwitcher dark />
                <span className="text-white/20 text-[9px] uppercase tracking-widest">
                  Dakar, Senegal
                </span>
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
    <span className="inline-flex h-[1.625em] overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={taglines[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-blue-600 block font-serif italic lowercase"
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
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
      className="py-16 md:py-32 px-6 lg:px-12 overflow-hidden border-t border-neutral-200"
    >
      <header className="grid grid-cols-12 gap-6 md:gap-12 items-baseline border-b border-neutral-200 pb-10 md:pb-16 mb-12 md:mb-24">
        <div className="col-span-12 lg:col-span-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-4"
          >
            {t("label")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic lowercase text-4xl md:text-8xl tracking-tighter leading-[0.9]"
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
            className="mt-4 md:mt-6 text-xl md:text-3xl font-serif italic lowercase tracking-tight text-blue-600"
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
            className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-600 leading-relaxed"
          >
            {t("description")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-base font-medium text-neutral-700 leading-relaxed"
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
        className="mb-12 md:mb-24 grid grid-cols-12 gap-6 md:gap-12"
      >
        <div className="col-span-12 lg:col-span-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-6">
            {t("domainsLabel")}
          </span>
          <div className="flex flex-wrap gap-3">
            {domains.map((domain, i) => (
              <span
                key={i}
                className="border border-neutral-200 px-4 py-2 text-xs uppercase tracking-widest text-neutral-600 hover:border-blue-600/40 hover:text-blue-600 transition-colors cursor-default"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-6">
            {t("sectorsLabel")}
          </span>
          <div className="flex flex-wrap gap-3">
            {sectors.map((sector, i) => (
              <span
                key={i}
                className="text-xs uppercase tracking-widest text-neutral-600 after:content-['·'] after:ml-3 after:text-neutral-300 last:after:content-none"
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
        className="grid grid-cols-12 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-24"
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
              <div className="font-mono text-[10px] text-neutral-500 mb-8 flex justify-between items-center">
                <span>{offer.number}</span>
                <ArrowUpRight
                  size={14}
                  className="text-neutral-200 group-hover:text-blue-600 transition-colors"
                />
              </div>

              <h3 className="font-serif italic lowercase text-3xl md:text-4xl mb-4 md:mb-6 tracking-tight group-hover:text-blue-600 transition-colors duration-500">
                {offer.title}
              </h3>

              <p className="font-sans text-base font-medium text-neutral-700 leading-relaxed mb-10 max-w-sm">
                {offer.description}
              </p>

              <div className="mt-auto pt-8 border-t border-neutral-100">
                <ul className="space-y-3">
                  {offer.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-blue-600/30" />
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
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
      className="py-16 md:py-32 px-6 lg:px-12 border-t border-neutral-200"
    >
      <header className="grid grid-cols-12 gap-6 md:gap-12 items-baseline pb-10 md:pb-16 mb-12 md:mb-24">
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
            className="font-serif italic lowercase text-4xl md:text-8xl tracking-tighter leading-[0.9]"
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
            className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-600 leading-relaxed max-w-xs"
          >
            {t("description")}
          </motion.p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
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
              <span className="font-mono text-[10px] text-neutral-500 block mb-8">
                {pole.number}
              </span>

              <h3 className="text-3xl md:text-5xl font-serif italic lowercase tracking-tight mb-8 group-hover:text-blue-600 transition-colors duration-500">
                {pole.title}
              </h3>

              <p className="text-base font-medium text-neutral-700 leading-relaxed mb-12 max-w-md">
                {pole.description}
              </p>

              <div className="border-t border-neutral-100 pt-8">
                <div className="grid grid-cols-2 gap-4">
                  {pole.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-blue-600/30" />
                      <span className="font-mono text-xs uppercase tracking-widest text-neutral-600">
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

const MobileSection = () => {
  const t = useTranslations("mobile");

  const features = [
    { number: "01", title: t("feature1.title"), description: t("feature1.description") },
    { number: "02", title: t("feature2.title"), description: t("feature2.description") },
    { number: "03", title: t("feature3.title"), description: t("feature3.description") },
  ];

  const techs = [t("tech1"), t("tech2"), t("tech3"), t("tech4"), t("tech5")];

  return (
    <section id="mobile" className="py-16 md:py-32 px-6 lg:px-12 border-t border-neutral-200 overflow-hidden">
      <div className="grid grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-24">
        <div className="col-span-12 lg:col-span-7">
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
            className="font-serif italic lowercase text-4xl md:text-8xl tracking-tighter leading-[0.9]"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 md:mt-6 text-xl md:text-3xl font-serif italic lowercase tracking-tight text-blue-600"
          >
            {t("headline")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 md:mt-8 text-base font-medium text-neutral-700 leading-relaxed max-w-lg"
          >
            {t("description")}
          </motion.p>
        </div>

        <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-[180px] h-[360px] md:w-[220px] md:h-[440px] rounded-[32px] md:rounded-[40px] border-2 border-neutral-200 bg-neutral-50 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-200 rounded-b-2xl" />
              <div className="absolute inset-4 top-10 rounded-[28px] bg-gradient-to-br from-blue-600/10 to-blue-600/5 flex flex-col items-center justify-center gap-4">
                <Smartphone className="text-blue-600/40" size={48} />
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600/30" />
                  <span className="w-2 h-2 rounded-full bg-blue-600/20" />
                  <span className="w-2 h-2 rounded-full bg-blue-600/10" />
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-neutral-200" />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-blue-600/5 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-600/10 blur-xl" />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-24 border-y border-neutral-200 py-8 md:py-12">
        {[
          { label: t("stat1Label"), value: t("stat1Value") },
          { label: t("stat2Label"), value: t("stat2Value") },
          { label: t("stat3Label"), value: t("stat3Value") },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="font-mono text-[7px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 block mb-2 md:mb-3">
              {stat.label}
            </span>
            <span className="text-sm md:text-2xl font-serif italic lowercase tracking-tight text-neutral-900">
              {stat.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group"
          >
            <div className="border-l border-neutral-200 pl-8">
              <span className="font-mono text-[10px] text-neutral-500 block mb-6">
                {feature.number}
              </span>
              <h3 className="text-2xl font-serif italic lowercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-base font-medium text-neutral-700 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 md:mt-24 pt-8 md:pt-12 border-t border-neutral-100"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 block mb-6">
          {t("techLabel")}
        </span>
        <div className="flex flex-wrap gap-3">
          {techs.map((tech, i) => (
            <span
              key={i}
              className="border border-neutral-200 px-4 py-2 text-xs uppercase tracking-widest text-neutral-600 hover:border-blue-600/40 hover:text-blue-600 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ProjectsSection = () => {
  const t = useTranslations("projects");

  const projects = [
    {
      title: t("project1.title"),
      description: t("project1.description"),
      tag: t("project1.tag"),
      year: t("project1.year"),
      url: t("project1.url"),
    },
    {
      title: t("project2.title"),
      description: t("project2.description"),
      tag: t("project2.tag"),
      year: t("project2.year"),
      url: t("project2.url"),
    },
    {
      title: t("project3.title"),
      description: t("project3.description"),
      tag: t("project3.tag"),
      year: t("project3.year"),
      url: t("project3.url"),
    },
  ];

  return (
    <section id="projets" className="py-16 md:py-32 px-6 lg:px-12 border-t border-neutral-200">
      <header className="mb-12 md:mb-24">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-4"
        >
          {t("label")}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic lowercase text-4xl md:text-8xl tracking-tighter leading-[0.9]"
        >
          {t("title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-6 text-xl md:text-3xl font-serif italic lowercase tracking-tight text-blue-600"
        >
          {t("headline")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-base font-medium text-neutral-700 leading-relaxed max-w-lg"
        >
          {t("description")}
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group border border-neutral-200 p-8 md:p-10 hover:border-blue-600/30 transition-colors duration-500 block"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-mono">
                {project.tag}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400">
                  {project.year}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-neutral-300 group-hover:text-blue-600 transition-colors"
                />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif italic lowercase tracking-tight mb-4 group-hover:text-blue-600 transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-base font-medium text-neutral-700 leading-relaxed">
              {project.description}
            </p>
          </motion.a>
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

      <section className="relative pt-28 md:pt-48 pb-12 md:pb-20 px-6 md:px-12 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-600 text-xs font-mono uppercase tracking-[0.4em] block mb-6">
              {t("hero.label")}
            </span>
            <h1 className="text-5xl md:text-[120px] lg:text-[140px] font-serif leading-[0.85] tracking-tighter lowercase italic">
              {t("hero.title1")} <br />
              <span className="not-italic">{t("hero.title2")}</span> <br />
              <span
                className={cn("text-blue-600", !isRtl && "ml-0 md:ml-32")}
              >
                {t("hero.title3")}
              </span>
            </h1>
          </motion.div>

          <div className={cn("mt-10 md:mt-16 max-w-md", !isRtl && "ml-0 md:ml-32")}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-neutral-700 text-base md:text-lg leading-relaxed font-medium"
            >
              {t("hero.description")} <RotatingTagline />.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 flex items-center gap-6"
            >
              <button className="group flex items-center gap-3 text-sm uppercase tracking-widest font-bold">
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
            <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center relative">
              <div className="w-1/2 h-1/2 rounded-full bg-blue-600/10 blur-2xl" />
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.07]"
                viewBox="0 0 400 530"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="80" y1="0" x2="80" y2="530" stroke="currentColor" strokeWidth="0.5" />
                <line x1="160" y1="0" x2="160" y2="530" stroke="currentColor" strokeWidth="0.5" />
                <line x1="240" y1="0" x2="240" y2="530" stroke="currentColor" strokeWidth="0.5" />
                <line x1="320" y1="0" x2="320" y2="530" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="106" x2="400" y2="106" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="212" x2="400" y2="212" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="318" x2="400" y2="318" stroke="currentColor" strokeWidth="0.5" />
                <line x1="0" y1="424" x2="400" y2="424" stroke="currentColor" strokeWidth="0.5" />

                <circle cx="80" cy="106" r="3" fill="currentColor" />
                <circle cx="240" cy="106" r="3" fill="currentColor" />
                <circle cx="160" cy="212" r="3" fill="currentColor" />
                <circle cx="320" cy="212" r="3" fill="currentColor" />
                <circle cx="80" cy="318" r="3" fill="currentColor" />
                <circle cx="240" cy="318" r="3" fill="currentColor" />
                <circle cx="160" cy="424" r="3" fill="currentColor" />
                <circle cx="320" cy="424" r="3" fill="currentColor" />

                <path d="M80 106 L160 212" stroke="currentColor" strokeWidth="0.8" />
                <path d="M240 106 L320 212" stroke="currentColor" strokeWidth="0.8" />
                <path d="M160 212 L240 318" stroke="currentColor" strokeWidth="0.8" />
                <path d="M320 212 L240 318" stroke="currentColor" strokeWidth="0.8" />
                <path d="M80 318 L160 424" stroke="currentColor" strokeWidth="0.8" />
                <path d="M240 318 L320 424" stroke="currentColor" strokeWidth="0.8" />

                <rect x="140" y="140" width="120" height="80" rx="4" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
                <text x="200" y="185" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace">SYS.04-B</text>

                <circle cx="200" cy="265" r="30" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="200" cy="265" r="12" fill="currentColor" opacity="0.3" />

                <path d="M80 106 L80 60 L160 60 L160 106" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
                <path d="M240 424 L320 424 L320 480 L240 480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
              </svg>
            </div>
            <div className="absolute bottom-6 right-6 z-20">
              <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                {t("hero.imageLabel")}
              </p>
            </div>
          </motion.div>

          <div className="mt-auto space-y-2">
            <p className="text-neutral-500 text-xs uppercase tracking-widest leading-none">
              {t("hero.collaborators")}
            </p>
            <p className="text-neutral-700 text-sm font-serif italic">
              {t("hero.collaborator1")}
            </p>
            <p className="text-neutral-700 text-sm font-serif italic">
              {t("hero.collaborator2")}
            </p>
            <p className="text-neutral-700 text-sm font-serif italic">
              {t("hero.collaborator3")}
            </p>
          </div>
        </div>
      </section>

      <OffersSection />

      <ExpertisesSection />

      <MobileSection />

      <ProjectsSection />

      <footer
        id="contact"
        className="px-6 md:px-12 py-12 md:py-20 bg-neutral-900 text-white relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <h3 className="text-3xl md:text-7xl font-serif italic lowercase tracking-tighter">
              {t("footer.title1")} <br /> {t("footer.title2")}
            </h3>
            <div className="mt-12 flex flex-col gap-4">
              <a
                href="mailto:hello@teggitech.sn"
                className="text-xl md:text-3xl font-normal hover:text-blue-400 transition-colors underline underline-offset-8 decoration-neutral-600"
              >
                hello@teggitech.sn
              </a>
              <p className="text-neutral-400 text-sm uppercase tracking-widest mt-4">
                {t("footer.location")}
              </p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-end items-start md:items-end">
          </div>
        </div>

        <div className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-neutral-400">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <p className="mt-4 md:mt-0">{t("footer.tagline")}</p>
        </div>
      </footer>
    </main>
  );
}
