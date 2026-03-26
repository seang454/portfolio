"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Database,
  FileCode2,
  Globe,
  Languages,
  LayoutGrid,
  Mail,
  MonitorCheck,
  ExternalLink,
  Palette,
  ScanText,
  Rocket,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Type,
  Workflow,
} from "lucide-react";
import {
  SiAnsible,
  SiCss,
  SiGit,
  SiGithub,
  SiDocker,
  SiGithubactions,
  SiGitlab,
  SiGrafana,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiNextdotjs,
  SiPostgresql,
  SiPrometheus,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import Navbar from "@/components/navbar";
import CapabilityFlow from "@/components/capability-flow";
import ContactMailForm from "@/components/contact-mail-form";
import CvDownloadGate from "@/components/cv-download-gate";
import HeroBlurIn from "@/components/hero-blur-in";
import TypewriterText from "@/components/typewriter-text";
import WorkflowBeam from "@/components/workflow-beam";
import { IconCloud } from "@/components/ui/icon-cloud";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Marquee } from "@/components/ui/marquee";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";

const copy = {
  en: {
    badge: "Full-Stack Developer • DevOps Learner",
    heroLead: "Welcome to my portfolio",
    heroTitleStart: "Hello, my name's",
    heroTitleName: "SIM PENGSEANG",
    heroDescription:
      "Java Spring Boot, React, Docker, Kubernetes, and CI/CD focused work with a calmer product-driven presentation.",
    primaryCta: "Explore projects",
    secondaryCta: "Contact me",
    cvGate: {
      trigger: "Download CV",
      title: "Request CV access",
      description:
        "Share a few details first so I can review who is downloading my CV.",
      steps: ["Your details", "Send request", "Download CV"],
      email: "Your email",
      location: "Your location",
      reason: "Why do you want to download my CV?",
      send: "Send request",
      unlockTitle: "Request sent",
      unlockDescription:
        "Your request has been sent for review. You will receive a secure CV download link by email after approval.",
      fallbackTitle: "Email app opened",
      fallbackDescription:
        "Your email app was opened with the CV request details. Send that email to complete the request.",
      note: "Your request is emailed for review first. Download is only allowed after approval.",
    },
    stackTitle: "Core stack",
    stackSubtitle: "Technology I use most often",
    ribbonTop: "FULL-STACK DEVELOPMENT",
    ribbonBottom: "DEVOPS AUTOMATION",
    aboutEyebrow: "About",
    aboutTitle: "I build clean, practical products for real-world delivery.",
    aboutBody: "Clear structure, practical tools, and delivery-focused engineering.",
    pillarsTitle: "What I bring",
    pillars: [
      "Spring Boot API design with authentication and maintainable backend structure",
      "Responsive React interfaces with stronger visual hierarchy and better UX decisions",
      "Docker, CI/CD, Kubernetes, and monitoring practice that supports real deployment thinking",
    ],
    showcaseEyebrow: "Capabilities",
    showcaseTitle: "A quieter, more intentional portfolio with proof-centered sections.",
    showcase: [
      {
        name: "Product-minded engineering",
        description:
          "Features are presented as outcomes, architecture, and delivery value instead of only screenshots.",
      },
      {
        name: "Automation-first mindset",
        description:
          "CI/CD, containers, and deployment workflow thinking are part of the story, not an afterthought.",
      },
      {
        name: "Bilingual presentation",
        description:
          "English and Khmer support make the portfolio more personal and more flexible for different audiences.",
      },
      {
        name: "Clean visual system",
        description:
          "The interface now uses fewer competing elements and gives each section more breathing room.",
      },
    ],
    projectsEyebrow: "Featured work",
    projectsTitle:
      "Project directions that connect application development with delivery and operations.",
    cards: [
      {
        title: "Full-Stack Business Platform",
        summary:
          "A product-style application with secure APIs, structured backend services, database workflows, and a polished frontend foundation.",
      },
      {
        title: "CI/CD Pipeline Automation",
        summary:
          "A delivery pipeline focused on build validation, automated packaging, and cleaner release flow.",
      },
      {
        title: "Monitoring and Reliability Lab",
        summary:
          "A practical observability setup that helps surface system health, performance, and debugging signals.",
      },
    ],
    contactEyebrow: "Contact",
    contactTitle:
      "If you need someone who can build features, improve systems, and keep growing into DevOps ownership, let’s talk.",
    contactBody:
      "Use the form to open your email app, or reach me directly at pengseangsim210@gmail.com.",
    form: {
      title: "Send a message",
      description: "Share your role, project, or collaboration idea.",
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send by email",
      note: "This form uses your email app through a mailto link.",
    },
  },
  kh: {
    badge: "Full-Stack Developer • DevOps Learner",
    heroLead: "សូមស្វាគមន៍មកកាន់ portfolio របស់ខ្ញុំ",
    heroTitleStart: "សួស្តី ខ្ញុំឈ្មោះ",
    heroTitleName: "SIM PENGSEANG",
    heroDescription:
      "ផ្តោតលើ Java Spring Boot, React, Docker, Kubernetes និង CI/CD ជាមួយការបង្ហាញបែប product ដែលស្ងប់ស្អាតជាងមុន។",
    primaryCta: "មើលគម្រោង",
    secondaryCta: "ទាក់ទងខ្ញុំ",
    cvGate: {
      trigger: "ទាញយក CV",
      title: "ស្នើសុំទាញយក CV",
      description:
        "សូមបំពេញព័ត៌មានខ្លីៗជាមុន ដើម្បីឱ្យខ្ញុំពិនិត្យអ្នកដែលចង់ទាញយក CV របស់ខ្ញុំ។",
      steps: ["ព័ត៌មានរបស់អ្នក", "ផ្ញើសំណើ", "ទាញយក CV"],
      email: "អ៊ីមែលរបស់អ្នក",
      location: "ទីតាំងរបស់អ្នក",
      reason: "ហេតុអ្វីបានជាអ្នកចង់ទាញយក CV?",
      send: "ផ្ញើសំណើ",
        unlockTitle: "បានផ្ញើសំណើហើយ",
        unlockDescription:
          "សំណើរបស់អ្នកត្រូវបានផ្ញើសម្រាប់ការពិនិត្យ។ បន្ទាប់ពីអនុម័ត អ្នកនឹងទទួលបានតំណទាញយក CV តាមអ៊ីមែល។",
        fallbackTitle: "បានបើក email app",
        fallbackDescription:
          "Email app របស់អ្នកត្រូវបានបើកជាមួយព័ត៌មានសំណើ CV។ សូមផ្ញើ email នោះដើម្បីបញ្ចប់សំណើ។",
        note: "សំណើនេះត្រូវបានផ្ញើទៅពិនិត្យមុន ហើយអាចទាញយកបានតែបន្ទាប់ពីអនុម័តប៉ុណ្ណោះ។",
    },
    stackTitle: "Core stack",
    stackSubtitle: "បច្ចេកវិទ្យាដែលខ្ញុំប្រើញឹកញាប់",
    ribbonTop: "FULL-STACK DEVELOPMENT",
    ribbonBottom: "DEVOPS AUTOMATION",
    aboutEyebrow: "អំពីខ្ញុំ",
    aboutTitle:
      "ខ្ញុំចង់ឱ្យ portfolio នេះមានអារម្មណ៍ដូចជាផលិតផលមួយដែលខ្ញុំចង់ដឹកជញ្ជូនដោយខ្លួនឯង។",
    aboutBody:
      "វាមានន័យថា structure ច្បាស់, ការប្រាស្រ័យទាក់ទងច្បាស់, ជម្រើសបច្ចេកវិទ្យាដែលមានហេតុផល និង section ដែលបង្ហាញភស្តុតាង។",
    pillarsTitle: "អ្វីដែលខ្ញុំអាចនាំមក",
    pillars: [
      "Spring Boot API design ជាមួយ authentication និង backend structure ដែលងាយថែទាំ",
      "React interface responsive ជាមួយ visual hierarchy និង UX ដែលប្រសើរឡើង",
      "Docker, CI/CD, Kubernetes និង monitoring practice សម្រាប់ការគិតពី deployment ពិតប្រាកដ",
    ],
    showcaseEyebrow: "សមត្ថភាព",
    showcaseTitle: "Portfolio ដែលស្ងប់ស្អាតជាងមុន និងផ្តោតលើភស្តុតាងការងារ។",
    showcase: [
      {
        name: "Engineering មានទិសដៅ product",
        description:
          "Feature ត្រូវបានបង្ហាញជាលទ្ធផល, architecture និង delivery value មិនមែនជារូបភាពតែប៉ុណ្ណោះ។",
      },
      {
        name: "Mindset ផ្តោតលើ automation",
        description:
          "CI/CD, container និង deployment workflow គឺជាផ្នែកមួយនៃរឿងរ៉ាវ មិនមែនបន្ថែមចុងក្រោយទេ។",
      },
      {
        name: "ការបង្ហាញពីរភាសា",
        description:
          "គាំទ្រភាសាអង់គ្លេស និងខ្មែរ ធ្វើឱ្យ portfolio មានលក្ខណៈផ្ទាល់ខ្លួន និងបត់បែនបាន។",
      },
      {
        name: "Visual system ស្អាត",
        description:
          "Interface មាន element ប្រកួតប្រជែងតិចជាងមុន ហើយឱ្យគ្រប់ section មានខ្យល់ដកដង្ហើម។",
      },
    ],
    projectsEyebrow: "គម្រោងសំខាន់",
    projectsTitle:
      "ទិសដៅគម្រោងដែលភ្ជាប់ application development ជាមួយ delivery និង operations។",
    cards: [
      {
        title: "Full-Stack Business Platform",
        summary:
          "Application បែប product ជាមួយ secure API, backend service structure, database workflow និង frontend foundation ស្អាត។",
      },
      {
        title: "CI/CD Pipeline Automation",
        summary:
          "Pipeline ដែលផ្តោតលើ build validation, automated packaging និង release flow ដែលស្អាតជាងមុន។",
      },
      {
        title: "Monitoring and Reliability Lab",
        summary:
          "Observability setup ជាក់ស្តែងសម្រាប់មើល system health, performance និង debugging signals។",
      },
    ],
    contactEyebrow: "ទំនាក់ទំនង",
    contactTitle:
      "បើអ្នកត្រូវការអ្នកដែលអាចបង្កើត feature, កែលម្អប្រព័ន្ធ និងបន្តរីកចម្រើនទៅ DevOps សូមទាក់ទងខ្ញុំ។",
    contactBody:
      "ប្រើ form ដើម្បីបើក email app របស់អ្នក ឬទាក់ទងមកខ្ញុំផ្ទាល់តាម pengseangsim210@gmail.com។",
    form: {
      title: "ផ្ញើសារ",
      description: "ប្រាប់អំពីតួនាទី គម្រោង ឬគំនិតសហការរបស់អ្នក។",
      name: "ឈ្មោះ",
      email: "អ៊ីមែល",
      message: "សារ",
      submit: "ផ្ញើតាម email",
      note: "Form នេះប្រើ email app របស់អ្នកតាម mailto link។",
    },
  },
} as const;

const techStack = [
  { name: "Spring Boot", icon: SiSpringboot, tone: "#6DB33F" },
  { name: "Java", icon: FaJava, tone: "#EA6B22" },
  { name: "React", icon: SiReact, tone: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, tone: "#3178C6" },
  { name: "PostgreSQL", icon: SiPostgresql, tone: "#336791" },
  { name: "Docker", icon: SiDocker, tone: "#2496ED" },
  { name: "Jenkins", icon: SiJenkins, tone: "#D24939" },
  { name: "GitHub Actions", icon: SiGithubactions, tone: "#2088FF" },
  { name: "Kubernetes", icon: SiKubernetes, tone: "#326CE5" },
  { name: "Prometheus", icon: SiPrometheus, tone: "#E6522C" },
  { name: "Grafana", icon: SiGrafana, tone: "#F46800" },
] as const;

const projectStacks = [
  ["Spring Boot", "React", "PostgreSQL", "Java"],
  ["Jenkins", "GitHub Actions", "Docker", "Kubernetes"],
  ["Prometheus", "Grafana", "Docker", "Kubernetes"],
] as const;
const liveProjects = [
  {
    title: "DocuHub",
    summary:
      "A live document-focused platform with a polished interface, cleaner reading flow, and a more product-style user experience.",
    href: "https://www.docuhub.me/",
    cta: "Live site",
    domain: "www.docuhub.me",
    status: "Live",
    image: "https://www.docuhub.me/_next/image?q=75&url=%2Fhero-section%2Fhero-section-image.png&w=1080",
    metadataTitle: "Docuhub - Academic Paper Management & Research Platform",
    metadataDescription:
      "Discover, share, and collaborate on academic excellence through research documents, discussion, and mentorship.",
  },
  {
    title: "Deploy Project Two",
    summary:
      "A real deployed web project that shows practical publishing, release readiness, and delivery thinking in production.",
    href: "https://delployprojecttowo.vercel.app/",
    cta: "Live site",
    domain: "delployprojecttowo.vercel.app",
    status: "Live",
    metadataTitle: "Deploy Project Two",
    metadataDescription:
      "Release-focused deployment project with production-style publishing.",
  },
  {
    title: "Homework RUPP",
    summary:
      "A live academic-focused web project for coursework or homework presentation with a clean published deployment.",
    href: "https://homework-rupp.vercel.app/",
    cta: "Live site",
    domain: "homework-rupp.vercel.app",
    status: "Live",
    metadataTitle: "Homework RUPP",
    metadataDescription:
      "A deployed university-style homework project published on Vercel.",
  },
] as const;
const techStackRows = [techStack.slice(0, 6), techStack.slice(6)] as const;

const heroOrbitOuter = [SiDocker, SiKubernetes, SiGithubactions, SiPrometheus] as const;
const heroOrbitInner = [SiReact, SiSpringboot, SiPostgresql, FaJava] as const;
const showcaseIcons = [Globe, Workflow, Sparkles, MonitorCheck] as const;
const cloudIcons = [
  <SiHtml5 key="html5" size={42} color="#E34F26" />,
  <SiCss key="css3" size={42} color="#1572B6" />,
  <SiTailwindcss key="tailwind" size={42} color="#06B6D4" />,
  <SiJavascript key="javascript" size={42} color="#F7DF1E" />,
  <SiReact key="react" size={42} color="#61DAFB" />,
  <SiNextdotjs key="nextjs" size={42} color="#111111" />,
  <SiSpringboot key="spring" size={42} color="#6DB33F" />,
  <SiGithub key="github" size={42} color="#181717" />,
  <SiGitlab key="gitlab" size={42} color="#FC6D26" />,
  <SiJenkins key="jenkins" size={42} color="#D24939" />,
  <SiKubernetes key="kubernetes" size={42} color="#326CE5" />,
  <SiPrometheus key="prometheus" size={42} color="#E6522C" />,
  <SiGithubactions key="github-actions" size={42} color="#2088FF" />,
  <SiAnsible key="ansible" size={42} color="#EE0000" />,
  <SiGit key="git" size={42} color="#F05032" />,
] as const;

function StackIcons({ items }: { items: readonly string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {items.map((item) => {
        const tech = techStack.find((entry) => entry.name === item);
        if (!tech) return null;
        const Icon = tech.icon;
        return (
          <div key={item} className="project-tech-chip" title={item} aria-label={item}>
            <Icon className="h-4 w-4" style={{ color: tech.tone }} />
          </div>
        );
      })}
    </div>
  );
}

function TechMarqueeCard({
  name,
  Icon,
  tone,
}: {
  name: string;
  Icon: (props: { className?: string; style?: React.CSSProperties }) => React.ReactNode;
  tone: string;
}) {
  return (
    <article className="tech-marquee-card">
      <div
        className="tech-marquee-icon"
        style={{ color: tone, boxShadow: `inset 0 0 0 1px ${tone}22` }}
      >
        <Icon className="h-7 w-7" />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">{name}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">Core workflow technology</p>
      </div>
    </article>
  );
}

function ProjectPreviewImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  if (src.startsWith("http")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className="project-preview-image" loading="lazy" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      className="project-preview-image"
      width={1200}
      height={630}
    />
  );
}

export default function Home() {
  const { i18n } = useTranslation();
  const locale = i18n.language === "kh" ? "kh" : "en";
  const t = copy[locale];
  const aboutHighlights = [
    {
      title: "Full-Stack",
      detail: "Spring Boot, React, PostgreSQL",
      icon: <LayoutGrid className="h-4 w-4" />,
    },
    {
      title: "DevOps",
      detail: "Docker, CI/CD, Kubernetes, Prometheus",
      icon: <Workflow className="h-4 w-4" />,
    },
  ];
  const aboutProofs = [
    {
      title: locale === "kh" ? "API + Backend" : "API + Backend",
      detail: t.pillars[0],
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      title: locale === "kh" ? "Frontend UX" : "Frontend UX",
      detail: t.pillars[1],
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      title: locale === "kh" ? "Delivery Flow" : "Delivery Flow",
      detail: t.pillars[2],
      icon: <Rocket className="h-4 w-4" />,
    },
  ];

  return (
    <main className="page-grid relative overflow-hidden">
      <Navbar />

      <section id="home" className="hero-surface relative isolate overflow-hidden">
        <RetroGrid
          className="opacity-28"
          angle={70}
          cellSize={50}
          opacity={0.48}
          animationDuration={42}
          lightLineColor="rgba(26,51,67,0.24)"
          darkLineColor="rgba(255,255,255,0.11)"
        />
        <div className="hero-bg-overlay absolute inset-0" />

        <div className="relative mx-auto min-h-screen w-full max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:px-10">
          <div className="hero-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.88fr] lg:items-center">
              <div className="flex max-w-2xl flex-col gap-4 sm:gap-5">
                <HeroBlurIn
                  delay={0.05}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] backdrop-blur"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                  {t.badge}
                </HeroBlurIn>

                <HeroBlurIn delay={0.14}>
                  <p className="text-lg font-medium text-[var(--accent-strong)] sm:text-xl">
                    {t.heroLead}
                  </p>
                </HeroBlurIn>

                <div className="max-w-4xl">
                  <TypewriterText
                    text={t.heroTitleStart}
                    tag="h1"
                    delay={0.2}
                    duration={2.9}
                    loop={true}
                    loopDelay={5}
                    persistCursor={false}
                    className="text-5xl font-semibold leading-[1.04] tracking-[-0.065em] text-foreground sm:text-6xl xl:text-7xl"
                  />
                  <TypewriterText
                    text={t.heroTitleName}
                    tag="p"
                    delay={3.4}
                    duration={3.1}
                    loop={true}
                    loopDelay={5.4}
                    cursorClassName="text-[var(--accent-strong)]/80"
                    className="hero-accent mt-2 text-5xl font-semibold leading-[1.04] tracking-[-0.065em] sm:text-6xl xl:text-7xl"
                  />
                </div>

                <HeroBlurIn delay={0.32}>
                  <p className="max-w-xl text-lg leading-9 text-[var(--muted)] sm:text-xl">
                    {t.heroDescription}
                  </p>
                </HeroBlurIn>

                <HeroBlurIn delay={0.42} className="pt-2 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    className="h-13 rounded-full bg-[var(--accent-strong)] px-7 text-[var(--accent-contrast)] hover:opacity-90"
                  >
                    <a href="#projects">
                      {t.primaryCta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-13 rounded-full px-7">
                    <a href="#contact">
                      <Mail className="h-4 w-4" />
                      {t.secondaryCta}
                    </a>
                  </Button>
                  <CvDownloadGate
                    copy={t.cvGate}
                  />
                </HeroBlurIn>
              </div>

                <div className="relative">
                  <div className="hero-orbit-stage">
                    <div className="hero-orbit-center" aria-hidden="true">
                      <div className="hero-orbit-center-core" />
                    </div>
                    <OrbitingCircles
                      radius={202}
                      iconSize={78}
                      speed={0.62}
                      className="hero-orbit-node"
                    >
                      {heroOrbitOuter.map((Icon, index) => (
                        <div key={`outer-${index}`} className="hero-orbit-chip">
                          <Icon className="h-8 w-8 text-[var(--accent-strong)]" />
                        </div>
                      ))}
                    </OrbitingCircles>
                    <OrbitingCircles
                      radius={128}
                      iconSize={70}
                      speed={0.78}
                      reverse
                      className="hero-orbit-node"
                      >
                        {heroOrbitInner.map((Icon, index) => (
                          <div key={`inner-${index}`} className="hero-orbit-chip hero-orbit-chip-inner">
                            <Icon className="h-7 w-7 text-[#3d93ff]" />
                          </div>
                        ))}
                     </OrbitingCircles>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
      <section className="mx-auto w-full px-5 py-10 sm:px-8 lg:px-10">
        <div className="stack-showcase">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="section-kicker">{t.stackTitle}</p>
              <h2 className="stack-showcase-title mt-4">{t.stackSubtitle}</h2>
            </div>
          </div>

          <div className="tech-marquee-shell">
            <Marquee pauseOnHover className="[--duration:34s] [--gap:1.25rem] py-1">
              {techStackRows[0].map(({ name, icon: Icon, tone }) => (
                <TechMarqueeCard key={name} name={name} Icon={Icon} tone={tone} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:38s] [--gap:1.25rem] py-1">
              {techStackRows[1].map(({ name, icon: Icon, tone }) => (
                <TechMarqueeCard key={name} name={name} Icon={Icon} tone={tone} />
              ))}
            </Marquee>
            <div className="tech-marquee-fade tech-marquee-fade-left" aria-hidden="true" />
            <div className="tech-marquee-fade tech-marquee-fade-right" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto w-full max-w-7xl px-5 py-18 sm:px-8 lg:px-10"
      >
        <div className="about-cloud-card">
          <div className="about-cloud-copy">
            <p className="section-kicker">{t.aboutEyebrow}</p>
            <h2
              className={[
                "section-title about-cloud-title mt-4",
                locale === "kh" ? "about-cloud-title-kh" : "",
              ].join(" ")}
            >
              {t.aboutTitle}
            </h2>
            <p
              className={[
                "about-cloud-body mt-6 max-w-2xl text-base text-[var(--muted)]",
                locale === "kh" ? "about-cloud-body-kh" : "leading-8",
              ].join(" ")}
            >
              {t.aboutBody}
            </p>

            <div className="about-cloud-highlights">
              {aboutHighlights.map((item) => (
                <div key={item.title} className="about-cloud-highlight">
                  <span className="about-cloud-highlight-icon">{item.icon}</span>
                  <div className="about-cloud-highlight-copy">
                    <span className="about-cloud-highlight-value">{item.title}</span>
                    <span className="about-cloud-highlight-label">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <p className="section-kicker">{t.pillarsTitle}</p>
              <div className="about-cloud-pillars">
                {aboutProofs.map((item, index) => (
                  <div key={item.title} className="about-cloud-feature">
                    <div className="about-cloud-feature-top">
                      <span className="feature-index about-cloud-feature-index">{`0${index + 1}`}</span>
                      <span className="about-cloud-feature-icon">{item.icon}</span>
                    </div>
                    <h3 className="about-cloud-feature-title">{item.title}</h3>
                    <p className="about-cloud-feature-description">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-cloud-visual">
            <div className="about-cloud-shell">
              <IconCloud icons={[...cloudIcons]} />
            </div>
          </div>
        </div>
      </section>



      <section className="relative mx-auto w-full max-w-[100rem] overflow-hidden px-0 py-2">
        <div className="ribbon-stage">
          <div className="ribbon-track ribbon-track-top">
            <Marquee className="[--duration:40s] [--gap:2rem] py-0">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={`top-${index}`} className="ribbon-label">
                  {t.ribbonTop} •
                </span>
              ))}
            </Marquee>
          </div>

          <div className="ribbon-track ribbon-track-bottom">
            <Marquee reverse className="[--duration:38s] [--gap:2rem] py-0">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={`bottom-${index}`} className="ribbon-label">
                  {t.ribbonBottom} ✦
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-2 sm:px-8 lg:px-10">
        <div className="mb-8">
          <p className="section-kicker">{t.showcaseEyebrow}</p>
          <h2 className="section-title mt-4 max-w-4xl">{t.showcaseTitle}</h2>
        </div>
        <div className="showcase-grid">
          {t.showcase.map((item, index) => {
            const Icon = showcaseIcons[index];

            return (
              <article key={item.name} className="showcase-card">
                <div className="showcase-card-visual">
                  {index === 0 ? (
                    <CapabilityFlow
                      centerIcon={<Globe className="h-7 w-7 text-foreground" />}
                      centerLabel={locale === "kh" ? "Product" : "Product"}
                      leftNodes={[
                        {
                          key: "api",
                          label: "API",
                          icon: (
                            <SiSpringboot className="h-5 w-5" style={{ color: "#6DB33F" }} />
                          ),
                        },
                        {
                          key: "ui",
                          label: "UI",
                          icon: <SiReact className="h-5 w-5" style={{ color: "#61DAFB" }} />,
                        },
                        {
                          key: "types",
                          label: "Types",
                          icon: (
                            <SiTypescript className="h-5 w-5" style={{ color: "#3178C6" }} />
                          ),
                        },
                      ]}
                      rightNodes={[
                        {
                          key: "data",
                          label: "Data",
                          icon: (
                            <SiPostgresql className="h-5 w-5" style={{ color: "#336791" }} />
                          ),
                        },
                        {
                          key: "release",
                          label: "Ship",
                          icon: <SiDocker className="h-5 w-5" style={{ color: "#2496ED" }} />,
                        },
                        {
                          key: "docs",
                          label: "Specs",
                          icon: <FileCode2 className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                      ]}
                    />
                  ) : index === 1 ? (
                    <div className="showcase-visual-beam">
                      <WorkflowBeam locale={locale} />
                    </div>
                  ) : index === 2 ? (
                    <CapabilityFlow
                      centerIcon={<Languages className="h-7 w-7 text-foreground" />}
                      centerLabel={locale === "kh" ? "Bilingual" : "Bilingual"}
                      leftNodes={[
                        {
                          key: "english",
                          label: "English",
                          icon: <Type className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "clear",
                          label: "Clear",
                          icon: <ScanText className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "global",
                          label: "Global",
                          icon: <Globe className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                      ]}
                      rightNodes={[
                        {
                          key: "khmer",
                          label: "Khmer",
                          icon: <Languages className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "personal",
                          label: "Personal",
                          icon: <Sparkles className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "audience",
                          label: "Audience",
                          icon: <Mail className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                      ]}
                    />
                  ) : (
                    <CapabilityFlow
                      centerIcon={<LayoutGrid className="h-7 w-7 text-foreground" />}
                      centerLabel={locale === "kh" ? "System" : "System"}
                      leftNodes={[
                        {
                          key: "spacing",
                          label: "Space",
                          icon: <MonitorCheck className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "hierarchy",
                          label: "Focus",
                          icon: <ShieldCheck className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "color",
                          label: "Color",
                          icon: <Palette className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                      ]}
                      rightNodes={[
                        {
                          key: "layout",
                          label: "Layout",
                          icon: <LayoutGrid className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "responsive",
                          label: "Responsive",
                          icon: <Smartphone className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                        {
                          key: "clarity",
                          label: "Clarity",
                          icon: <Database className="h-5 w-5 text-[var(--accent-strong)]" />,
                        },
                      ]}
                    />
                  )}
                </div>

                <div className="showcase-card-body">
                  <div className="showcase-card-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="showcase-card-title">{item.name}</h3>
                  <p className="showcase-card-description">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto w-full max-w-7xl px-5 py-18 sm:px-8 lg:px-10"
      >
        <div className="mb-10">
          <p className="section-kicker">{t.projectsEyebrow}</p>
          <h2 className="section-title mt-4 max-w-4xl">{t.projectsTitle}</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {t.cards.map((card, index) => {
            const iconMap = [BriefcaseBusiness, Rocket, MonitorCheck] as const;
            const Icon = iconMap[index];
            const liveProject = liveProjects[index];
            const cardTitle = liveProject?.title ?? card.title;
            const cardSummary = liveProject?.summary ?? card.summary;
            const previewTitle = liveProject?.metadataTitle ?? cardTitle;
            const previewDescription = liveProject?.metadataDescription ?? cardSummary;
            return (
              <article key={card.title} className="project-panel">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-kicker">
                      {locale === "kh" ? `គម្រោង ${index + 1}` : `Project ${index + 1}`}
                    </p>
                    {!liveProject ? (
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                        {cardTitle}
                      </h3>
                    ) : null}
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {!liveProject ? (
                  <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                    {cardSummary}
                  </p>
                ) : null}

                {liveProject ? (
                  <a
                    href={liveProject.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-preview"
                  >
                    {liveProject.image ? (
                      <div className="project-preview-media">
                        <ProjectPreviewImage
                          src={liveProject.image}
                          alt={`${cardTitle} preview`}
                        />
                      </div>
                    ) : null}

                    <div className="project-preview-top">
                      <div className="project-preview-domain-wrap">
                        <span className="project-preview-dot" aria-hidden="true" />
                        <span className="project-preview-domain">{liveProject.domain}</span>
                      </div>
                      <div className="project-preview-top-actions">
                        <span className="project-preview-status">{liveProject.status}</span>
                        <span className="project-preview-arrow">
                          <ExternalLink className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    <div className="project-preview-body">
                      <div className="project-preview-content">
                        <p className="project-preview-title">{previewTitle}</p>
                        <p className="project-preview-summary">{previewDescription}</p>
                        <span className="project-preview-link">
                          {liveProject.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      </div>
                    </div>
                  </a>
                ) : null}

                <StackIcons items={projectStacks[index]} />

                <div className="mt-8 flex gap-3">
                  {liveProject ? (
                    <a
                      href={liveProject.href}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action"
                    >
                      {liveProject.cta}
                    </a>
                  ) : (
                    <a href="#contact" className="project-action">
                      Demo
                    </a>
                  )}
                  <a href="#contact" className="project-action">
                    Code
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto grid w-full max-w-7xl gap-6 px-5 pb-24 pt-2 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10"
      >
        <div className="section-block">
          <p className="section-kicker">{t.contactEyebrow}</p>
          <h2 className="section-title mt-4">{t.contactTitle}</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">
            {t.contactBody}
          </p>

          <div className="mt-8 grid gap-4">
            <div className="feature-tile">
              <FaJava className="h-4 w-4 text-[var(--accent-strong)]" />
              <p className="text-sm leading-7 text-[var(--muted)]">
                Java, Spring Boot, REST API design
              </p>
            </div>
            <div className="feature-tile">
              <SiReact className="h-4 w-4 text-[var(--accent-strong)]" />
              <p className="text-sm leading-7 text-[var(--muted)]">
                React, responsive UI, component-driven frontend
              </p>
            </div>
            <div className="feature-tile">
              <SiPostgresql className="h-4 w-4 text-[var(--accent-strong)]" />
              <p className="text-sm leading-7 text-[var(--muted)]">
                PostgreSQL, Docker, Kubernetes, monitoring
              </p>
            </div>
          </div>
        </div>

        <ContactMailForm copy={t.form} />
      </section>
      </div>
    </main>
  );
}

