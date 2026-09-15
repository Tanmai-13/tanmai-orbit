import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import {
  ArrowDownRight, ArrowUpRight, Award, BookOpen, Box, Braces, CheckCircle2,
  ChevronRight, Code2, Database, ExternalLink, Github, GraduationCap, Linkedin,
  Mail, MapPin, Menu, Phone, Send, Sparkles, Target, Terminal, Trophy, X,
} from "lucide-react";

import coreImage from "@/assets/tanmai-data-core-clean.png";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thirumuru Tanmai | Aspiring Software Developer | B.Tech AIML Student" },
      { name: "description", content: "Portfolio of Thirumuru Tanmai, a B.Tech Artificial Intelligence and Machine Learning student and aspiring software developer." },
      { property: "og:title", content: "Thirumuru Tanmai | Aspiring Software Developer" },
      { property: "og:description", content: "Explore Tanmai's projects, technical skills, education, certifications, and developer profiles." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const navItems = ["Home", "About", "Skills", "Projects", "Education", "Certifications", "Profiles", "Contact"];
const roles = ["Software Developer", "Python Developer", "AIML Enthusiast", "Problem Solver"];
const profileUrls = {
  github: "https://github.com/Tanmai-13/",
  linkedin: "https://www.linkedin.com/in/tanmai-tirumuru-39747b40a/",
  leetcode: "https://leetcode.com/u/THIRUMURUTANMAI/",
};

const projects = [
  { title: "Student Management System", summary: "A Python application for organizing student records with structured data handling and essential CRUD operations.", tags: ["Python", "JSON", "Data Handling", "CRUD", "Student Management"], url: "https://github.com/Tanmai-13/student-management-system", glyph: "{ }" },
  { title: "Sea Level Predictor", summary: "A data analysis project that visualizes historical measurements and predicts future sea level change.", tags: ["Python", "Data Analysis", "Data Visualization", "Prediction"], url: "https://github.com/Tanmai-13/sea_level_predictor", glyph: "↗" },
  { title: "Time Series Visualizer", summary: "A visualization project that explores time-series data through line, bar, and box plot analysis.", tags: ["Python", "Data Analysis", "Time Series", "Visualization"], url: "https://github.com/Tanmai-13/time_series_visualizer", glyph: "∿" },
  { title: "Medical Data Visualizer", summary: "A data science project that analyzes and visualizes medical examination data and relationships.", tags: ["Python", "Data Analysis", "Visualization", "Data Science"], url: "https://github.com/Tanmai-13/medical_data_visualizer", glyph: "+" },
  { title: "Demographic Data Analyzer", summary: "A Pandas-based analysis of demographic data, extracting meaningful population and education insights.", tags: ["Python", "Pandas", "Data Analysis", "Data Science"], url: "https://github.com/Tanmai-13/demographic-data-analyzer", glyph: "◫" },
  { title: "Mean, Variance & Standard Deviation Calculator", summary: "A NumPy calculator that computes key statistical measures across matrices and flattened data.", tags: ["Python", "Statistics", "NumPy", "Data Analysis"], url: "https://github.com/Tanmai-13/mean-var-project", glyph: "σ" },
];

const skills = [
  { title: "Programming", icon: Terminal, items: ["Python", "Java", "C"] },
  { title: "Web", icon: Code2, items: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Database", icon: Database, items: ["SQL", "MySQL", "MongoDB"] },
  { title: "Core Concepts", icon: Braces, items: ["Data Structures", "Problem Solving", "OOP", "DBMS", "AI / Machine Learning"] },
  { title: "Tools", icon: Box, items: ["Git", "GitHub", "VS Code"] },
];

const certificates = [
  { title: "Naventra Finance Frenzy '26", issuer: "GIST · Naventra", date: "2026", detail: "Certificate of Participation. Organized by Naventra at Geethanjali Institute of Science & Technology." },
  { title: "GenAI Powered Data Analytics Job Simulation", issuer: "Forage", date: "Sept 4, 2026", detail: "Exploratory data analysis, AI delinquency prediction, business reporting, and AI-powered collections." },
  { title: "Programming in C", issuer: "Infosys", date: "Oct 2025", detail: "Course certification in Programming in C." },
  { title: "Programming Fundamentals using Python", issuer: "Infosys", date: "Oct 2025", detail: "Course certification in programming fundamentals using Python." },
  { title: "Data Science", issuer: "Infosys", date: "Oct 2025", detail: "Course certification in Data Science." },
  { title: "Cyber Security", issuer: "Infosys", date: "Oct 2025", detail: "Course certification in Cyber Security." },
];

const profiles = [
  { name: "GitHub", handle: "@Tanmai-13", url: profileUrls.github, icon: Github },
  { name: "LinkedIn", handle: "Tanmai Tirumuru", url: profileUrls.linkedin, icon: Linkedin },
  { name: "LeetCode", handle: "THIRUMURUTANMAI", url: profileUrls.leetcode, icon: Code2 },
  { name: "CodeChef", handle: "same_fury_37", url: "https://www.codechef.com/users/same_fury_37", icon: Braces },
  { name: "GeeksforGeeks", handle: "tirumurud2j7", url: "https://www.geeksforgeeks.org/profile/tirumurud2j7", icon: Terminal },
  { name: "HackerRank", handle: "tirumurutanmai", url: "https://www.hackerrank.com/profile/tirumurutanmai", icon: Trophy },
  { name: "Google Skills", handle: "Public Profile", url: "https://www.skills.google/public_profiles/e7599f02-0988-4009-b2ba-e9e604a6328d", icon: Award },
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="mb-12 max-w-2xl"><p className="mb-3 font-mono text-xs uppercase text-primary">// {eyebrow}</p><h2 className="text-3xl font-bold sm:text-5xl">{title}</h2>{text && <p className="mt-4 leading-7 text-muted-foreground">{text}</p>}</div>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [formError, setFormError] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((current) => (current + 1) % roles.length), 2200);
    const sections = document.querySelectorAll("main section");
    sections.forEach((section) => section.classList.add("reveal-section"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  function moveCore(event: MouseEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    heroRef.current?.style.setProperty("transform", `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      setFormError("Please enter your name, a valid email, and a message of at least 10 characters.");
      return;
    }
    setFormError("");
    window.location.href = `mailto:tirumurutanmai@gmail.com?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)}`;
  }

  return (
    <main className="grid-surface min-h-screen bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_10%,color-mix(in_oklab,var(--accent)_13%,transparent),transparent_34%)]" />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:px-8" aria-label="Main navigation">
          <a href="#home" className="min-w-0 font-mono text-lg font-bold text-foreground"><span className="text-primary">&lt;</span>TANMAI<span className="text-primary">/&gt;</span></a>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:text-primary">{item}</a>)}
            <Button asChild size="sm" className="shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_24%,transparent)]"><a href="#contact">Let's Connect <ArrowDownRight /></a></Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
        </nav>
        {menuOpen && <div className="glass-panel border-x-0 px-5 py-5 lg:hidden">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 font-mono text-sm text-muted-foreground">{item}</a>)}</div>}
      </header>

      <section id="home" className="relative z-10 mx-auto grid min-h-[94vh] max-w-7xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 border border-border bg-card px-3 py-2 font-mono text-[10px] uppercase text-primary sm:text-xs"><span className="h-2 w-2 bg-primary shadow-[0_0_12px_var(--primary)]" /> B.Tech AIML Student • Aspiring Software Developer</div>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.04] sm:text-7xl lg:text-8xl">Hi, I'm <span className="text-glow text-primary">Tanmai.</span></h1>
          <div className="mt-5 flex min-h-9 items-center gap-3 font-mono text-base sm:text-xl"><span className="text-muted-foreground">I am a</span><span key={roles[roleIndex]} className="text-primary">{roles[roleIndex]}<span className="ml-1 animate-[blink_1s_infinite]">_</span></span></div>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">I build projects, strengthen my programming skills, and continuously learn to become a better software developer.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><a href="#projects">View Projects <ArrowDownRight /></a></Button>
            <Button asChild variant="outline" size="lg"><a href={resumeAsset.url} download="Thirumuru_Tanmai_Resume.pdf" target="_blank" rel="noreferrer">Download Resume <ArrowDownRight /></a></Button>
            <Button asChild variant="ghost" size="lg"><a href="#contact">Contact Me <ChevronRight /></a></Button>
          </div>
          <div className="mt-10 flex items-center gap-3">
            {[{ label: "GitHub", url: profileUrls.github, Icon: Github }, { label: "LinkedIn", url: profileUrls.linkedin, Icon: Linkedin }, { label: "LeetCode", url: profileUrls.leetcode, Icon: Code2 }].map(({ label, url, Icon }) => <Button key={label} asChild variant="outline" size="icon"><a href={url} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a></Button>)}
            <span className="ml-2 hidden font-mono text-[10px] uppercase text-muted-foreground sm:inline">Available online</span>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[540px]" onMouseMove={moveCore} onMouseLeave={() => heroRef.current?.style.removeProperty("transform")}>
          <div className="absolute inset-[8%] animate-[orbit_18s_linear_infinite] rounded-full border border-primary/20"><span className="absolute left-1/2 top-0 h-2 w-2 -translate-y-1/2 bg-primary shadow-[0_0_18px_var(--primary)]" /></div>
          <div ref={heroRef} className="absolute inset-[10%] transition-transform duration-300"><img src={coreImage} alt="Abstract luminous data core" width={1024} height={1024} className="h-full w-full object-contain drop-shadow-[0_0_45px_color-mix(in_oklab,var(--primary)_35%,transparent)]" /></div>
          <div className="glass-panel absolute left-0 top-[18%] px-4 py-3 font-mono text-[10px] text-muted-foreground"><span className="text-primary">01</span> / BUILD</div>
          <div className="glass-panel absolute bottom-[15%] right-0 px-4 py-3 font-mono text-[10px] text-muted-foreground"><span className="text-primary">&gt;_</span> KEEP LEARNING</div>
        </div>
      </section>

      <section id="about" className="relative z-10 border-y border-border bg-background/70 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="About me" title="Learning with intent. Building with curiosity." /><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="glass-panel p-7"><MapPin className="mb-6 h-8 w-8 text-primary" /><p className="text-lg leading-8">I'm a 3rd-year B.Tech Artificial Intelligence & Machine Learning student at Geethanjali Institute of Science & Technology in Kovur, Nellore.</p><p className="mt-5 leading-7 text-muted-foreground">I'm passionate about software development, consistent coding practice, and building projects that turn technical knowledge into real-world software solutions.</p></div><div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">{[["3rd Year", "B.Tech AIML"], ["9.35", "1st Year CGPA"], ["9.23", "2nd Year CGPA"], ["2028", "Expected Graduation"], ["Software Developer", "Career Goal"]].map(([value, label], index) => <div key={label} className={`bg-background p-6 ${index === 4 ? "col-span-2 sm:col-span-2" : ""}`}><p className="text-xl font-bold text-primary sm:text-2xl">{value}</p><p className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">{label}</p></div>)}</div></div></div></section>

      <section className="relative z-10 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Career focus" title="A foundation built one step at a time." text="My focus is strengthening software engineering fundamentals through continuous learning, practical building, and deliberate improvement." /><div className="grid grid-cols-1 border-l border-primary/40 sm:grid-cols-5 sm:border-l-0 sm:border-t">{["Learn", "Build", "Practice", "Improve", "Contribute"].map((step, index) => <div key={step} className="relative px-7 py-6 sm:px-3 sm:pt-8"><span className="absolute -left-[5px] top-8 h-2.5 w-2.5 bg-primary shadow-[0_0_14px_var(--primary)] sm:-top-[5px] sm:left-3" /><p className="font-mono text-[10px] text-primary">0{index + 1}</p><h3 className="mt-2 text-xl font-semibold">{step}</h3></div>)}</div></div></section>

      <section id="skills" className="relative z-10 border-y border-border bg-background/70 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Technical skills" title="The tools behind the work." text="Technologies and concepts I use while learning, solving problems, and building projects." /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{skills.map(({ title, icon: Icon, items }, index) => <article key={title} className={`glass-panel group p-6 transition-transform duration-300 hover:-translate-y-1 ${index === 3 ? "lg:col-span-2" : ""}`}><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-primary" /><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span></div><h3 className="mt-8 text-xl font-semibold">{title}</h3><div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs text-secondary-foreground">{item}</span>)}</div></article>)}</div></div></section>

      <section id="projects" className="relative z-10 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Featured projects" title="Projects that turned learning into practice." /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div></div></section>

      <section id="education" className="relative z-10 border-y border-border bg-background/70 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Education" title="My academic path." /><div className="mx-auto max-w-4xl border-l border-primary/40">{[
        { period: "2024 — 2028", title: "B.Tech — Artificial Intelligence & Machine Learning", place: "Geethanjali Institute of Science & Technology (GIST), Kovur, Nellore, Andhra Pradesh", detail: "Current: 3rd Year · 1st Year CGPA: 9.35 · 2nd Year CGPA: 9.23" },
        { period: "Intermediate", title: "Sri Chaitanya Arts and Science Junior College", place: "Intermediate Education", detail: "95%" },
        { period: "Schooling", title: "Z P P High School, Kodavaluru", place: "School Education", detail: "85%" },
      ].map((item, index) => <article key={item.title} className="relative pb-12 pl-8 last:pb-0"><span className="absolute -left-[7px] top-1.5 h-3 w-3 border-2 border-primary bg-background shadow-[0_0_12px_var(--primary)]" /><p className="font-mono text-xs uppercase text-primary">{item.period}</p><h3 className="mt-2 text-xl font-semibold sm:text-2xl">{item.title}</h3><p className="mt-2 text-muted-foreground">{item.place}</p><p className="mt-4 inline-block border border-border bg-secondary/50 px-3 py-2 font-mono text-xs">{item.detail}</p></article>)}</div></div></section>

      <section id="certifications" className="relative z-10 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Certifications & learning" title="Continuously expanding the toolkit." /><div className="grid gap-3 md:grid-cols-2">{certificates.map((certificate, index) => <Dialog key={certificate.title}><DialogTrigger asChild><Button variant="outline" className="h-auto w-full justify-start whitespace-normal rounded-md p-5 text-left"><Award className="h-6 w-6 text-primary" /><span className="min-w-0 flex-1"><span className="block text-base font-semibold">{certificate.title}</span><span className="mt-1 block font-mono text-[10px] text-muted-foreground">{certificate.issuer} · {certificate.date}</span></span><ArrowUpRight /></Button></DialogTrigger><DialogContent className="glass-panel"><DialogHeader><div className="mb-5 flex h-12 w-12 items-center justify-center border border-primary/30 bg-primary/10"><Award className="text-primary" /></div><DialogTitle>{certificate.title}</DialogTitle><DialogDescription className="pt-2">{certificate.issuer} · {certificate.date}</DialogDescription></DialogHeader><p className="leading-7 text-muted-foreground">{certificate.detail}</p><div className="mt-3 flex items-center gap-2 font-mono text-xs text-primary"><CheckCircle2 className="h-4 w-4" /> Certificate detail</div></DialogContent></Dialog>)}</div></div></section>

      <section className="relative z-10 border-y border-border bg-background/70 py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="glass-panel relative overflow-hidden p-7 sm:p-10"><div className="absolute right-0 top-0 font-mono text-[120px] font-bold leading-none text-primary/5">G</div><div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-xs uppercase text-primary">// Google Skills Profile</p><h2 className="mt-4 text-3xl font-bold">Learning in public.</h2><div className="mt-7 flex flex-wrap gap-3">{[["2025", "Member since"], ["Bronze League", "League"], ["1672", "Points"]].map(([value, label]) => <div key={label} className="border border-border bg-background/60 px-5 py-4"><p className="text-xl font-bold text-primary">{value}</p><p className="font-mono text-[10px] uppercase text-muted-foreground">{label}</p></div>)}</div></div><Button asChild size="lg"><a href="https://www.skills.google/public_profiles/e7599f02-0988-4009-b2ba-e9e604a6328d" target="_blank" rel="noreferrer">View Google Skills Profile <ExternalLink /></a></Button></div></div></div></section>

      <section id="profiles" className="relative z-10 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle eyebrow="Find me online" title="Developer profiles." /><div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{profiles.map(({ name, handle, url, icon: Icon }) => <a key={name} href={url} target="_blank" rel="noreferrer" className="group flex min-w-0 items-center gap-4 bg-background p-5 transition-colors hover:bg-secondary"><Icon className="h-6 w-6 shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block font-semibold">{name}</span><span className="block truncate font-mono text-[10px] text-muted-foreground">{handle}</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>)}</div></div></section>

      <section id="contact" className="relative z-10 border-t border-border bg-background/85 py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><SectionTitle eyebrow="Let's connect" title="Have something in mind? Let's talk." text="I'm always open to learning opportunities, thoughtful conversations, and connections in software development." /><div className="space-y-3"><a href="mailto:tirumurutanmai@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"><Mail className="h-4 w-4" /> tirumurutanmai@gmail.com</a><a href="tel:+919347025396" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"><Phone className="h-4 w-4" /> 9347025396</a></div><div className="mt-7 flex gap-2"><Button asChild size="icon" variant="outline"><a aria-label="Email Tanmai" href="mailto:tirumurutanmai@gmail.com"><Mail /></a></Button><Button asChild size="icon" variant="outline"><a aria-label="LinkedIn" href={profileUrls.linkedin} target="_blank" rel="noreferrer"><Linkedin /></a></Button><Button asChild size="icon" variant="outline"><a aria-label="GitHub" href={profileUrls.github} target="_blank" rel="noreferrer"><Github /></a></Button></div></div><form onSubmit={submitContact} className="glass-panel p-6 sm:p-8" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="font-mono text-xs text-muted-foreground">NAME<input name="name" autoComplete="name" className="mt-2 h-12 w-full border border-input bg-background/70 px-4 font-sans text-sm text-foreground outline-none focus:border-primary" placeholder="Your name" /></label><label className="font-mono text-xs text-muted-foreground">EMAIL<input name="email" type="email" autoComplete="email" className="mt-2 h-12 w-full border border-input bg-background/70 px-4 font-sans text-sm text-foreground outline-none focus:border-primary" placeholder="you@example.com" /></label></div><label className="mt-5 block font-mono text-xs text-muted-foreground">MESSAGE<textarea name="message" rows={6} className="mt-2 w-full resize-none border border-input bg-background/70 p-4 font-sans text-sm text-foreground outline-none focus:border-primary" placeholder="Tell me what's on your mind..." /></label>{formError && <p role="alert" className="mt-3 text-sm text-destructive">{formError}</p>}<Button type="submit" size="lg" className="mt-5 w-full sm:w-auto">Send Message <Send /></Button><p className="mt-3 text-xs text-muted-foreground">Opens your email app to send the message directly.</p></form></div></section>

      <footer className="relative z-10 border-t border-border bg-background py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-center text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8"><p>© 2026 Thirumuru Tanmai • Built with curiosity, code, and continuous learning.</p><a href="#home" className="font-mono text-primary">BACK TO TOP ↑</a></div></footer>
    </main>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const card = useRef<HTMLElement>(null);
  function tilt(event: MouseEvent<HTMLElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.current?.style.setProperty("transform", `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`);
  }
  return <article ref={card} onMouseMove={tilt} onMouseLeave={() => card.current?.style.removeProperty("transform")} className="glass-panel group flex min-h-[430px] flex-col overflow-hidden transition-transform duration-200"><div className="relative grid h-40 place-items-center overflow-hidden border-b border-border bg-secondary/45"><div className="absolute inset-0 grid-surface opacity-50" /><span className="relative font-mono text-6xl font-bold text-primary/80 drop-shadow-[0_0_20px_var(--primary)]">{project.glyph}</span><span className="absolute right-4 top-4 font-mono text-[10px] text-muted-foreground">PROJECT_0{index + 1}</span></div><div className="flex flex-1 flex-col p-6"><h3 className="text-xl font-semibold leading-7">{project.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="font-mono text-[10px] text-primary">#{tag.replaceAll(" ", "_")}</span>)}</div><Button asChild variant="outline" className="mt-auto w-full"><a href={project.url} target="_blank" rel="noreferrer">View on GitHub <Github /></a></Button></div></article>;
}