# TeggiTech Design System — Editorial Vibe

## Identity
- **Style**: Editorial / Magazine-style premium design studio
- **Mood**: Dark, sophisticated, high-end, asymmetric
- **Scale**: Refined (small, elegant sizing)

## Colors
| Token | Value | Usage |
|-------|-------|-------|
| Background | `#080808` | Page background |
| Text Primary | `white` | Headings, body |
| Text Secondary | `white/60` | Descriptions |
| Text Muted | `white/40` | Labels, metadata |
| Text Micro | `white/20` – `white/30` | Smallest labels, numbers |
| Accent | `blue-500` (`#3b82f6`) | Links, highlights, rotating tagline |
| Border | `white/10` | Dividers, card borders |
| Footer BG | `white` | Footer section inverts to light |
| Footer Text | `black` | Footer primary text |
| Footer Muted | `neutral-400` | Footer secondary text |
| Selection | `bg-blue-500 text-white` | Text selection highlight |

## Typography
- **Headings**: `font-serif`, lowercase italic, `tracking-tighter`, oversized (`text-[140px]` hero)
- **Labels/Micro**: `text-[10px]` or `text-[9px]`, `uppercase`, `tracking-widest` or `tracking-[0.2em]`–`tracking-[0.4em]`
- **Body**: `font-sans`, `text-sm`–`text-base`, `font-light`, `leading-relaxed`
- **Mono accent**: `font-mono` for small technical labels
- **Mix**: Serif + Sans-serif creates editorial contrast

## Layout
- **Grid**: 12-column grid (`grid-cols-12`) with asymmetric splits (8/4, 4/8, 6/6)
- **Spacing**: Generous — `pt-48`, `py-32`, `gap-12`, `gap-24`
- **Asymmetry**: Offset elements with `ml-32`, staggered card positions (`md:pt-24 lg:pt-48`)
- **Max width**: Content flows edge-to-edge with `px-6 md:px-12` padding (no max-w container on main sections)

## Components

### Navigation
- `mix-blend-difference` for overlay effect
- Logo: Bold tracking-tighter, sub-label with location
- Links: `text-xs uppercase tracking-[0.2em]`
- CTA: `rounded-full bg-white text-black`, hover transitions to accent

### Buttons / CTAs
- Minimal — text + expanding line: `w-8 h-[1px] bg-blue-500 group-hover:w-16`
- No heavy buttons in dark sections
- Footer uses underline links with `underline-offset-8`

### Cards (Project Cards)
- `border-l border-white/10` left border accent
- Number in `font-mono text-[10px] text-white/30`
- Image area: `aspect-[4/5]`, `grayscale` → `grayscale-0` on hover
- Title: `font-serif text-2xl lowercase`
- Category: `text-[10px] uppercase tracking-widest text-white/40`
- Arrow: fades in on hover with motion

### Section Headers
- Large serif italic headings + small uppercase description on opposite side
- 12-col grid with `items-baseline`

### Footer (Inverted)
- White background, black text
- Large serif italic CTA headline
- Email as underlined link
- Social icons row
- Newsletter input: minimal border-bottom style
- Bottom bar: `text-[9px] tracking-[0.3em]`

## Motion (Framer Motion)
- Entry: `opacity: 0, y: 40` → `opacity: 1, y: 0` with custom ease `[0.16, 1, 0.3, 1]`
- Parallax: `useScroll` + `useTransform` on hero image
- Rotating tagline: `AnimatePresence mode="wait"` with y-axis slide
- Hover: subtle translate on arrows via `variants`
- Staggered delays: 0.5s, 0.8s progression

## Noise / Texture
- Subtle grain overlay possible via noise SVG at low opacity
- `mix-blend-overlay` on image tints

## Code Reference
```tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X, Globe, Instagram, Twitter } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 md:px-12 flex justify-between items-end">
      <div className="flex flex-col">
        <span className="text-white font-bold tracking-tighter text-xl leading-none">TEGGITECH</span>
        <span className="text-white/50 text-[10px] uppercase tracking-widest mt-1">Dakar / Senegal</span>
      </div>

      <div className="hidden md:flex items-center gap-12 text-white/90 text-xs uppercase tracking-[0.2em] font-medium">
        {['Expertise', 'Work', 'Vision', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-500 transition-colors duration-300">
            {item}
          </a>
        ))}
        <button className="bg-white text-black px-5 py-2 hover:bg-blue-500 hover:text-white transition-all duration-500 rounded-full text-[10px]">
          START A PROJECT
        </button>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

const RotatingTagline = () => {
  const taglines = ["Web Platforms", "Mobile Ecosystems", "Digital Governance", "E-Commerce"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 overflow-hidden inline-flex align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={taglines[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-blue-500 block font-serif italic lowercase"
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const ProjectCard = ({ title, category, number }: { title: string; category: string; number: string }) => {
  return (
    <motion.div
      whileHover="hover"
      className="relative group cursor-pointer border-l border-white/10 pl-6 pb-12"
    >
      <div className="flex justify-between items-start mb-6">
        <span className="text-[10px] text-white/30 font-mono">{number}</span>
        <div className="overflow-hidden">
          <motion.div variants={{ hover: { x: 5, y: -5 } }}>
            <ArrowUpRight className="text-white/20 group-hover:text-blue-500 transition-colors" size={20} />
          </motion.div>
        </div>
      </div>

      <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mb-6 bg-neutral-900 flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-2xl bg-neutral-800 border border-white/5" />
      </div>

      <h4 className="text-white font-serif text-2xl lowercase tracking-tight mb-2">{title}</h4>
      <p className="text-white/40 text-[10px] uppercase tracking-widest">{category}</p>
    </motion.div>
  );
};

export default function Vibe4() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <main className="bg-[#080808] text-white min-h-screen selection:bg-blue-500 selection:text-white font-sans antialiased overflow-x-hidden">
      <Navbar />

      <section className="relative pt-48 pb-20 px-6 md:px-12 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-blue-500 text-xs font-mono uppercase tracking-[0.4em] block mb-6">
              Engineering Excellence / Dakar
            </span>
            <h1 className="text-6xl md:text-[120px] lg:text-[140px] font-serif leading-[0.85] tracking-tighter lowercase italic">
              We Craft <br />
              <span className="not-italic">Digital</span> <br />
              <span className="ml-0 md:ml-32 text-blue-500">Experiences</span>
            </h1>
          </motion.div>

          <div className="mt-16 max-w-md ml-0 md:ml-32">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white/60 text-sm md:text-base leading-relaxed font-light"
            >
              A premium design and development studio bridging the gap between hardware complexity
              and user-centric software. From West Africa to the world, we build for <RotatingTagline />.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 flex items-center gap-6"
            >
              <button className="group flex items-center gap-3 text-xs uppercase tracking-widest font-bold">
                View Case Studies
                <div className="w-8 h-[1px] bg-blue-500 group-hover:w-16 transition-all duration-500" />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:flex col-span-4 flex-col justify-between items-end text-right">
          <motion.div style={{ y }} className="w-full aspect-[3/4] bg-neutral-900 overflow-hidden relative border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-10" />
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-blue-500/10 blur-2xl" />
            </div>
            <div className="absolute bottom-6 right-6 z-20">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                    Laboratory 04-B / Dakar
                </p>
            </div>
          </motion.div>

          <div className="mt-auto space-y-2">
            <p className="text-white/20 text-[9px] uppercase tracking-widest leading-none">Collaborating with</p>
            <p className="text-white/80 text-xs font-serif italic">The Senegalese Government</p>
            <p className="text-white/80 text-xs font-serif italic">Regional Startups</p>
            <p className="text-white/80 text-xs font-serif italic">Global Enterprises</p>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 md:px-12 py-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-baseline mb-24">
          <div className="md:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif lowercase italic leading-tight">Featured <br /> Archives</h2>
          </div>
          <div className="md:col-span-8 flex justify-end">
            <p className="max-w-xs text-white/40 text-[11px] uppercase tracking-widest leading-loose">
              Selected projects that showcase our commitment to technical precision and aesthetic clarity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 md:gap-x-12">
          <ProjectCard number="01" title="TiakTiak Ecosystem" category="Marketplace / Logistics / Mobile" />
          <ProjectCard number="02" title="Revenue Manager" category="Fintech / Government / Web" />
          <div className="md:pt-24 lg:pt-48">
            <ProjectCard number="03" title="Saly Estate" category="Real Estate / Branding / Web" />
          </div>
        </div>
      </section>

      <footer id="contact" className="px-6 md:px-12 py-20 bg-white text-black relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6">
            <h3 className="text-5xl md:text-7xl font-serif italic lowercase tracking-tighter">Ready to <br /> escalate?</h3>
            <div className="mt-12 flex flex-col gap-4">
                <a href="mailto:hello@teggitech.sn" className="text-xl md:text-3xl font-light hover:text-blue-600 transition-colors underline underline-offset-8 decoration-neutral-200">
                    hello@teggitech.sn
                </a>
                <p className="text-neutral-400 text-xs uppercase tracking-widest mt-4">Plateau, Dakar, Senegal</p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-between items-end">
            <div className="flex gap-8">
                <Instagram size={20} className="text-neutral-400 hover:text-black cursor-pointer transition-colors" />
                <Twitter size={20} className="text-neutral-400 hover:text-black cursor-pointer transition-colors" />
                <Globe size={20} className="text-neutral-400 hover:text-black cursor-pointer transition-colors" />
            </div>

            <div className="text-right mt-24 md:mt-0">
                <p className="text-[10px] uppercase tracking-widest font-bold mb-4">Newsletter / Perspectives</p>
                <div className="flex border-b border-black pb-2 max-w-xs">
                    <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className="bg-transparent outline-none text-[10px] w-full placeholder:text-neutral-300"
                    />
                    <button className="text-[10px] font-bold">JOIN</button>
                </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-neutral-400">
            <p>© {new Date().getFullYear()} TeggiTech Agency. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Designed in Dakar / Built for the world</p>
        </div>
      </footer>
    </main>
  );
}
```
