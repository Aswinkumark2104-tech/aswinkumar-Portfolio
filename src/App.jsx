import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Code2, Download,
  ExternalLink, GraduationCap, Linkedin, Mail, Menu, MessageCircle, MousePointer2,
  Send, Sparkles, X, Zap, BarChart3, Brain, Users, Lightbulb, CheckCircle2
} from "lucide-react";

const LINKEDIN = "https://www.linkedin.com/in/aswinkumark2104/";
const sections = ["Home", "About", "Education", "Skills", "Projects", "Experience", "Certifications", "Contact"];

const projects = [
  {
    title: "SOFTIES ONLINE TOY STORE", category: "E-commerce",
    description: "An online toy store designed to provide an engaging shopping experience with toy products, customer accounts, order management and online shopping functionality.",
    url: "https://softiestoy.netlify.app/", tags: ["React", "E-commerce", "Supabase", "Netlify"], number: "01", visual: "softies"
  },
  {
    title: "KA CRANE SERVICE", category: "Business website",
    description: "A professional business website showcasing crane services, towing and recovery services and business information.",
    url: "https://kacraneservicekangayam.netlify.app/", tags: ["Web design", "Business website", "Netlify"], number: "02", visual: "crane"
  },
  {
    title: "JOLLY OH JHUMKANA", category: "Events",
    description: "An event management website designed to showcase celebrations and event services.",
    url: "https://jolly-oh-jhumkana.netlify.app/", tags: ["Web design", "Events", "Netlify"], number: "03", visual: "jolly"
  },
  {
    title: "HR EMPLOYEE ATTRITION ANALYSIS", category: "Academic analytics",
    description: "An academic data analytics project focused on understanding employee attrition patterns and exploring HR-related insights.",
    url: "", tags: ["HR analytics", "Excel", "Data analysis"], number: "04", visual: "analytics"
  }
];

const skillGroups = [
  { title: "Business & Marketing", icon: BarChart3, skills: ["Marketing", "Digital Marketing", "Business Strategy", "Customer Behaviour", "Communication"] },
  { title: "Analytics & Technology", icon: Code2, skills: ["Business Analytics", "Microsoft Excel", "Python", "R Programming", "Data Analysis", "Problem Solving"] },
  { title: "Personal Skills", icon: Brain, skills: ["Creative Thinking", "Leadership", "Teamwork", "Adaptability"] }
];

const education = [
  { step: "01", title: "SSLC", subtitle: "School Education", institution: "Sri Rajarajeswari Matric Hr. Sec. School", location: "Kangayam", qualification: "Secondary School Leaving Certificate", result: "73.6%", state: "Completed", short: "10TH" },
  { step: "02", title: "HSE", subtitle: "Higher Secondary Education", institution: "Sri Rajarajeswari Matric Hr. Sec. School", location: "Kangayam", qualification: "Higher Secondary Education", result: "81.3%", state: "Completed", short: "12TH" },
  { step: "03", title: "UG · BBA", subtitle: "Undergraduate", institution: "Sri Ramakrishna College of Arts and Science", location: "Coimbatore", qualification: "Bachelor of Business Administration (BBA)", result: "77%", state: "Completed", short: "BBA" },
  { step: "04", title: "PG · MBA", subtitle: "Postgraduate", institution: "Bannari Amman Institute of Technology", location: "Sathyamangalam", qualification: "Marketing & Business Analytics", result: "75%", state: "Currently Pursuing", short: "MBA" }
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
};

function SectionHeading({ eyebrow, title, accent }) {
  return <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
    <span className="eyebrow"><i />{eyebrow}</span>
    <h2>{title} <span>{accent}</span></h2>
  </motion.div>;
}

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap">
    <a className="brand" href="#home" aria-label="ASWINKUMAR K home"><span className="brand-mark">A<span>.</span></span><span>ASWINKUMAR K</span></a>
    <nav className={`glass-nav ${open ? "open" : ""}`} aria-label="Main navigation">
      {sections.map(item => <a key={item} className={active === item.toLowerCase() ? "active" : ""} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
      <a className="nav-connect" href="#contact" onClick={() => setOpen(false)}>Let's Connect <ArrowUpRight size={14}/></a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

function Portrait() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 45 });
  const onMove = (e) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - y) * 5, y: (x - 0.5) * 7 });
    setLight({ x: x * 100, y: y * 100 });
  };
  const reset = () => { setTilt({ x: 0, y: 0 }); setLight({ x: 50, y: 45 }); };
  return <div className="portrait-stage" ref={ref} onPointerMove={onMove} onPointerLeave={reset}>
    <div className="portrait-orbit orbit-one"/><div className="portrait-orbit orbit-two"/>
    <div className="portrait-glow" style={{ "--lx": `${light.x}%`, "--ly": `${light.y}%` }}/>
    <motion.div className="portrait-frame" animate={{ rotateX: tilt.x, rotateY: tilt.y }} transition={{ type: "spring", stiffness: 90, damping: 18 }}>
      <img src="/images/profile.png" alt="Portrait of ASWINKUMAR K" fetchPriority="high"/>
      <div className="portrait-shine"/>
    </motion.div>
    <div className="portrait-label"><span className="live-dot"/> OPEN TO OPPORTUNITIES</div>
    <div className="portrait-index">PROFILE / 2026</div>
  </div>;
}

function Hero() {
  const roles = ["Marketing Enthusiast", "Business Analytics Learner", "Creative Thinker", "Digital Marketing Learner", "Future Business Leader"];
  const [role, setRole] = useState(0);
  useEffect(() => { const id = setInterval(() => setRole(v => (v + 1) % roles.length), 2400); return () => clearInterval(id); }, []);
  return <section id="home" className="hero section-shell">
    <div className="hero-copy">
      <motion.div initial="hidden" animate="show" variants={reveal}>
        <span className="eyebrow"><i/> HELLO, I'M</span>
        <h1>ASWINKUMAR<br/><span className="gradient-text">K<span className="period">.</span></span></h1>
        <div className="hero-role"><span className="role-line"/> MBA STUDENT <b>·</b> MARKETING <b>·</b> BUSINESS ANALYTICS</div>
        <p className="hero-intro">Curious about people. Driven by ideas. Inspired to turn insights into meaningful impact.</p>
        <div className="typing-line"><span>Currently exploring</span><strong key={role}>{roles[role]}</strong><span className="typing-cursor">|</span></div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">Explore My Work <ArrowUpRight size={17}/></a>
          <a className="btn btn-glass" href="/resume.pdf" download><Download size={16}/> Download Resume</a>
        </div>
        <div className="hero-social"><a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a><span className="social-separator"/> <span>BASED IN INDIA</span></div>
      </motion.div>
    </div>
    <div className="hero-banner" aria-hidden="true"><img src="/images/portfolio-banner.png" alt="" fetchPriority="high"/></div>
    <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
    <div className="hero-side-note">CREATIVITY / STRATEGY / IMPACT</div>
  </section>;
}

function About() {
  const highlights = [
    { icon: GraduationCap, title: "MBA Student", text: "Learning to connect business ideas with practical outcomes." },
    { icon: BarChart3, title: "Marketing Interest", text: "Exploring customer behaviour, brand thinking and strategy." },
    { icon: Brain, title: "Business Analytics", text: "Interested in turning information into useful insights." },
    { icon: Code2, title: "Digital Projects", text: "Building digital experiences and practical web projects." }
  ];
  return <section id="about" className="section-shell section-pad">
    <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curiosity into" accent="possibility."/>
    <div className="about-grid">
      <motion.div className="about-statement" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span className="quote-mark">“</span>
        <p>I am <strong>ASWINKUMAR K</strong>, an MBA student with an interest in Marketing and Business Analytics. I enjoy exploring business strategies, understanding customer behaviour, analysing data and creating digital solutions. I am passionate about continuous learning, creativity and turning ideas into practical results.</p>
        <div className="signature-line"><span/> ALWAYS LEARNING, ALWAYS BUILDING</div>
      </motion.div>
      <div className="highlight-grid">{highlights.map((item, i) => <motion.article className="info-card" key={item.title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * .08 }}>
        <div className="card-icon"><item.icon size={20}/></div><h3>{item.title}</h3><p>{item.text}</p><span className="card-count">0{i + 1}</span>
      </motion.article>)}</div>
    </div>
  </section>;
}

function Education3D() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 75, damping: 24, mass: 0.32 });
  const keyframes = [0, 0.2, 0.47, 0.73, 1];
  const activePositions = [0, 0, 1, 2, 3];
  return <section id="education" className="section-shell section-pad education-section">
    <SectionHeading eyebrow="THE FOUNDATION" title="My learning" accent="journey."/>
    <p className="section-lead">Four milestones that shaped my academic journey, from school education to postgraduate studies.</p>
    {reduceMotion ? <div className="education-static-grid">{education.map(item => <article className={`education-glass-card ${item.step === "04" ? "mba-card" : ""}`} key={item.step}><EducationPanel item={item}/></article>)}</div> :
      <div className="education-scroll-track" ref={sectionRef}><div className="education-sticky-stage">
        <div className="education-stage-label"><span>ACADEMIC TIMELINE</span><span>SCROLL TO EXPLORE <i>↓</i></span></div>
        <div className="education-perspective">{education.map((item, index) => <Education3DPanel key={item.step} item={item} index={index} progress={smoothProgress} keyframes={keyframes} activePositions={activePositions}/>)}</div>
        <div className="education-progress-rail"><span style={{ scaleX: smoothProgress }}/></div><p className="education-hint">A JOURNEY OF CONTINUOUS LEARNING</p>
      </div></div>}
  </section>;
}

function Education3DPanel({ item, index, progress, keyframes, activePositions }) {
  const x = useTransform(progress, keyframes, activePositions.map(active => (index - active) * 330));
  const rotateY = useTransform(progress, keyframes, activePositions.map(active => Math.max(-48, Math.min(48, (index - active) * 35))));
  const z = useTransform(progress, keyframes, activePositions.map(active => 105 - Math.abs(index - active) * 205));
  const scale = useTransform(progress, keyframes, activePositions.map(active => 1 - Math.min(Math.abs(index - active), 2) * 0.17));
  const opacity = useTransform(progress, keyframes, activePositions.map(active => Math.max(0.18, 1 - Math.abs(index - active) * 0.34)));
  const spring = { stiffness: 90, damping: 26, mass: 0.35 };
  const style = { x: useSpring(x, spring), rotateY: useSpring(rotateY, spring), z: useSpring(z, spring), scale: useSpring(scale, spring), opacity: useSpring(opacity, spring) };
  return <motion.article className={`education-glass-card ${item.step === "04" ? "mba-card" : ""}`} style={style} aria-label={`${item.title}, ${item.institution}, ${item.result}`}><EducationPanel item={item}/></motion.article>;
}

function EducationPanel({ item }) {
  return <>
    <div className="education-card-glint" aria-hidden="true"/>
    <div className="education-card-top"><span className="education-index">MILESTONE / {item.step}</span><span className="education-status"><i/>{item.state}</span></div>
    <div className="education-card-core"><span className="education-kicker">ACADEMIC RECORD</span><h3>{item.title}</h3><p className="education-qualification">{item.qualification}</p><div className="education-institution">{item.institution}</div><div className="education-location"><span className="location-mark"/> {item.location}</div></div>
    <div className="education-result"><div><span>RESULT</span><strong>{item.result}</strong></div><span className="education-result-ring"><GraduationCap size={23}/></span></div>
    <span className="education-card-watermark">{item.short}</span>
  </>;
}

function Skills() {
  return <section id="skills" className="section-shell section-pad">
    <SectionHeading eyebrow="WHAT I BRING" title="Skills &" accent="strengths."/>
    <p className="section-lead">A growing mix of business understanding, analytical curiosity and people skills.</p>
    <div className="skills-grid">{skillGroups.map((group, i) => <motion.article className="skill-panel" key={group.title} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * .1 }}>
      <div className="skill-panel-head"><div className="card-icon"><group.icon size={20}/></div><h3>{group.title}</h3></div>
      <div className="skill-chips">{group.skills.map(skill => <span key={skill}>{skill}<i/></span>)}</div>
    </motion.article>)}</div>
    <p className="edit-note">Skills are presented without unverified proficiency scores.</p>
  </section>;
}

function ProjectVisual({ type }) {
  return <div className={`project-visual visual-${type}`}>
    <div className="visual-grid"/>
    {type === "softies" && <><span className="visual-orb">✳</span><div className="visual-word">SOFTIES<span>PLAY • LEARN • GROW</span></div><div className="toy-shapes"><i/><i/><i/></div></>}
    {type === "crane" && <><div className="crane-sun"/><div className="crane-arm"/><div className="crane-base"/><span className="visual-word">KA<span>CRANE SERVICE</span></span></>}
    {type === "jolly" && <><div className="party-confetti">✦　✧　✹</div><span className="visual-word">JOLLY OH<br/>JHUMKANA<span>MAKE IT A MOMENT</span></span><div className="party-circle"/></>}
    {type === "analytics" && <><div className="chart-bars"><i/><i/><i/><i/><i/><i/></div><span className="visual-word">PEOPLE<br/>ANALYTICS<span>FIND THE PATTERN</span></span></>}
    <span className="visual-code">PROJECT / {type.toUpperCase()}</span>
  </div>;
}

function Projects() {
  const [selected, setSelected] = useState(null);
  return <section id="projects" className="section-shell section-pad">
    <SectionHeading eyebrow="SELECTED WORK" title="Ideas made" accent="digital."/>
    <p className="section-lead">A selection of business, web and academic projects that reflect my interest in building and learning.</p>
    <div className="projects-grid">{projects.map((project, i) => <motion.article className="project-card" key={project.number} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * .08 }}>
      <button className="project-open" onClick={() => setSelected(project)} aria-label={`View details for ${project.title}`}><ProjectVisual type={project.visual}/><span className="project-open-icon"><ArrowUpRight size={18}/></span></button>
      <div className="project-meta"><span>{project.category}</span><span>{project.number} / 04</span></div>
      <h3>{project.title}</h3><p>{project.description}</p>
      <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-links"><button onClick={() => setSelected(project)}>Explore project <ArrowRight size={15}/></button>{project.url && <a href={project.url} target="_blank" rel="noreferrer">Live website <ExternalLink size={14}/></a>}</div>
    </motion.article>)}</div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)} role="presentation"><div className="project-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X/></button><span className="eyebrow"><i/> PROJECT / {selected.number}</span><h3>{selected.title}</h3><p>{selected.description}</p><div className="tag-row">{selected.tags.map(t => <span key={t}>{t}</span>)}</div>{selected.url ? <a className="btn btn-primary" href={selected.url} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={16}/></a> : <p className="edit-note">Add a project link or presentation when available.</p>}</div></div>}
  </section>;
}

function Experience() {
  return <section id="experience" className="section-shell section-pad">
    <SectionHeading eyebrow="GROWING PROFESSIONALLY" title="Experience &" accent="learning."/>
    <motion.article className="experience-card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="experience-icon"><BriefcaseBusiness size={25}/></div>
      <div className="experience-main"><span className="eyebrow"><i/> INTERNSHIP</span><h3>Podaran Foods</h3><p className="experience-sub">Internship · Role and duration to be added</p><p>Add a short summary of your responsibilities, skills learned and key contributions here. Keep the details specific to your actual internship experience.</p><div className="tag-row"><span>Practical learning</span><span>Professional growth</span></div></div>
      <span className="experience-number">01</span>
    </motion.article>
  </section>;
}

function Certifications() {
  const certs = ["Deloitte Data Analytics", "NoviTech Data Analytics", "Stock Market Operations"];
  return <section id="certifications" className="section-shell section-pad">
    <SectionHeading eyebrow="CONTINUOUS LEARNING" title="Certifications &" accent="credentials."/>
    <div className="cert-grid">{certs.map((cert, i) => <motion.article className="cert-card" key={cert} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * .1 }}>
      <div className="cert-art"><div className="cert-seal"><CheckCircle2 size={25}/></div><span>LEARNING RECORD / 0{i + 1}</span><strong>{cert.split(" ").slice(0, 2).join(" ")}</strong></div>
      <div className="cert-info"><span className="eyebrow">CERTIFICATION</span><h3>{cert}</h3><p>Add certificate image, completion date or verification link.</p><span className="cert-placeholder">CERTIFICATE LINK TO BE ADDED</span></div>
    </motion.article>)}</div>
  </section>;
}

function Contact() {
  const [form, setForm] = useState({ from_name: "", reply_to: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const busy = status === "sending";
  const update = e => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key) {
      setStatus("error"); setFeedback("Contact form setup is incomplete. Please connect EmailJS using the README instructions."); return;
    }
    setStatus("sending"); setFeedback("");
    try {
      await emailjs.send(service, template, { ...form, to_name: "ASWINKUMAR K" }, { publicKey: key });
      setStatus("success"); setFeedback("Your message has been sent. Thank you for reaching out!");
      setForm({ from_name: "", reply_to: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error"); setFeedback("Message could not be sent. Please try again or connect through LinkedIn.");
    }
  }
  return <section id="contact" className="section-shell section-pad contact-section">
    <SectionHeading eyebrow="START A CONVERSATION" title="Let's create" accent="something meaningful."/>
    <div className="contact-grid">
      <div className="contact-copy"><h3>Have an opportunity,<br/><span className="gradient-text">project or idea?</span></h3><p>Let's connect and explore how we can create something meaningful together.</p>
        <a className="contact-link" href={LINKEDIN} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Linkedin/></span><span><small>CONNECT PROFESSIONALLY</small><strong>LinkedIn</strong></span><ArrowUpRight/></a>
        <div className="contact-note"><Sparkles size={16}/> Open to learning, collaboration and professional opportunities.</div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="form-heading"><span>YOUR MESSAGE</span><span>01 — 04</span></div>
        <label>Full name<input name="from_name" value={form.from_name} onChange={update} placeholder="Your name" required maxLength="100"/></label>
        <label>Email address<input name="reply_to" type="email" value={form.reply_to} onChange={update} placeholder="you@example.com" required maxLength="150"/></label>
        <label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="What would you like to discuss?" required maxLength="150"/></label>
        <label>Message<textarea name="message" value={form.message} onChange={update} placeholder="Write your message..." rows="4" required maxLength="3000"/></label>
        <button className="btn btn-primary submit-btn" disabled={busy}>{busy ? "Sending..." : "Send Message"} {busy ? <span className="spinner"/> : <Send size={16}/>}</button>
        {feedback && <p className={`form-feedback ${status}`} role="status">{feedback}</p>}
      </form>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer section-shell"><div className="footer-top"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>ASWINKUMAR K</span></a><p>Building Ideas. Creating Impact.<br/>Growing Through Learning.</p><a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={15}/></a></div><div className="footer-bottom"><span>© 2026 ASWINKUMAR K. ALL RIGHTS RESERVED.</span><div><a href="#home">HOME</a><a href="#about">ABOUT</a><a href="#projects">PROJECTS</a><a href="#contact">CONTACT</a><a href={LINKEDIN} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></div></footer>;
}

function App() {
  const [active, setActive] = useState("home");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(s => { const el = document.getElementById(s.toLowerCase()); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return <div className="app">
    <motion.div className="scroll-progress" style={{ scaleX }}/>
    <div className="ambient ambient-blue"/><div className="ambient ambient-rose"/><div className="grid-overlay"/>
    <Navbar active={active}/>
    <main><Hero/><About/><Education3D/><Skills/><Projects/><Experience/><Certifications/><Contact/></main>
    <Footer/>
    <a className="floating-link" href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="Connect on LinkedIn"><Linkedin size={18}/></a>
  </div>;
}

export default App;
