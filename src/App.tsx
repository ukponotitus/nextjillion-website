import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

type IconName =
  | "arrow"
  | "spark"
  | "code"
  | "globe"
  | "brain"
  | "layers"
  | "briefcase"
  | "book"
  | "clock"
  | "signal"
  | "play"
  | "check"
  | "search"
  | "chevron"
  | "mail"
  | "menu"
  | "close"
  | "external"
  | "compass"
  | "users"
  | "phone";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3-1.2 4.2a5 5 0 0 1-3.6 3.6L3 12l4.2 1.2a5 5 0 0 1 3.6 3.6L12 21l1.2-4.2a5 5 0 0 1 3.6-3.6L21 12l-4.2-1.2a5 5 0 0 1-3.6-3.6Z" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-3 3 3 3" />
        <path d="m16 9 3 3-3 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0 0 5 3 3 0 0 0 2 5.5A3 3 0 0 0 12 20V5.5a2.5 2.5 0 0 0-2.5-1Z" />
        <path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1 0 5 3 3 0 0 1-2 5.5A3 3 0 0 1 12 20M8 11h4M15 8v4" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3-9 5 9 5 9-5-9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" />
        <path d="M8 8h8M8 12h6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    signal: (
      <>
        <path d="M5 20v-4M10 20v-8M15 20V8M20 20V4" />
      </>
    ),
    play: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 6 4-6 4Z" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    external: (
      <>
        <path d="M15 4h5v5M14 10l6-6" />
        <path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 4-4 2 2-4 4-2Z" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    phone: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M10 5h4M11 18h2" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const nav = [
  ["Home", "/"],
  ["About", "/about"],
  ["Technology", "/technology"],
  ["Products", "/products"],
  ["Academy", "/academy"],
  ["Contact", "/contact"],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="/" aria-label="Nextjillion home">
      <svg className="logo-symbol" viewBox="0 0 58 48" aria-hidden="true">
        <defs>
          <linearGradient id="nextjillion-a" x1="5" y1="7" x2="49" y2="42">
            <stop stopColor="#6D00FF" />
            <stop offset="0.55" stopColor="#5147E5" />
            <stop offset="1" stopColor="#244CCB" />
          </linearGradient>
          <linearGradient id="nextjillion-b" x1="45" y1="3" x2="20" y2="45">
            <stop stopColor="#11C5E8" />
            <stop offset="0.5" stopColor="#267CEC" />
            <stop offset="1" stopColor="#5147E5" />
          </linearGradient>
        </defs>
        <path
          d="M4 36V17.5c0-4 1.4-6.8 4.3-8.5 3-1.7 6-.9 8.7 2l23 25H27L12.5 20.4V36H4Z"
          fill="url(#nextjillion-a)"
        />
        <path
          d="M54 11.5V31c0 4.4-1.6 7.4-4.9 8.9-3.2 1.5-6.2.5-9-2.5L17.5 12.8h13L45.5 29V13.7L54 11.5Z"
          fill="url(#nextjillion-b)"
        />
      </svg>
      <span>NEXTJILLION</span>
    </a>
  );
}

function Button({
  href,
  children,
  secondary = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`button ${secondary ? "button-secondary" : ""}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <Icon name={external ? "external" : "arrow"} size={18} />
    </a>
  );
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <motion.header
      className="header"
      initial={{ y: -76 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-wrap">
        <Logo />
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={path === href || (href !== "/" && path.startsWith(href)) ? "active" : ""}
            >
              {label}
            </a>
          ))}
          <Button href="/contact">Discuss a project</Button>
        </nav>
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>
    </motion.header>
  );
}

function SectionHead({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={`section-head ${center ? "center" : ""}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}

const services = [
  {
    icon: "code" as IconName,
    title: "Software Development",
    text: "Scalable, dependable software tailored to the way your business works.",
  },
  {
    icon: "globe" as IconName,
    title: "Web Applications",
    text: "Modern, responsive platforms that turn complex tasks into clear experiences.",
  },
  {
    icon: "phone" as IconName,
    title: "Mobile Applications",
    text: "Thoughtful iOS and Android experiences built around how people work on the move.",
  },
  {
    icon: "brain" as IconName,
    title: "AI & Automation",
    text: "Intelligent systems that reduce repetitive work and improve productivity.",
  },
  {
    icon: "layers" as IconName,
    title: "Digital Products",
    text: "From early product thinking to useful, functional digital experiences.",
  },
  {
    icon: "briefcase" as IconName,
    title: "Business Solutions",
    text: "Purpose-built technology for operational and organisational challenges.",
  },
];

const courses = [
  {
    slug: "frontend-web-development",
    category: "Web Development",
    title: "Frontend Web Development",
    desc: "Build polished, responsive interfaces with HTML, CSS, JavaScript and React.",
    instructor: "Instructor to be announced",
    level: "Beginner",
    duration: "10 weeks",
    tone: "blue",
  },
  {
    slug: "backend-web-development",
    category: "Web Development",
    title: "Backend Web Development",
    desc: "Create APIs, databases and server-side applications built for real products.",
    instructor: "Instructor to be announced",
    level: "Intermediate",
    duration: "10 weeks",
    tone: "cyan",
  },
  {
    slug: "data-analysis-foundations",
    category: "Data Analysis",
    title: "Data Analysis Foundations",
    desc: "Turn raw data into useful insights with spreadsheets, SQL and visualisation.",
    instructor: "Instructor to be announced",
    level: "Beginner",
    duration: "8 weeks",
    tone: "violet",
  },
  {
    slug: "graphic-design-essentials",
    category: "Graphic Design",
    title: "Graphic Design Essentials",
    desc: "Learn visual hierarchy, typography, colour and practical brand design.",
    instructor: "Instructor to be announced",
    level: "Beginner",
    duration: "6 weeks",
    tone: "navy",
  },
  {
    slug: "digital-marketing-strategy",
    category: "Digital Marketing",
    title: "Digital Marketing Strategy",
    desc: "Plan campaigns, understand audiences and measure meaningful marketing results.",
    instructor: "Instructor to be announced",
    level: "Beginner",
    duration: "6 weeks",
    tone: "coral",
  },
  {
    slug: "python-programming",
    category: "Programming",
    title: "Python Programming",
    desc: "Learn programming fundamentals and build useful applications with Python.",
    instructor: "Instructor to be announced",
    level: "Beginner",
    duration: "8 weeks",
    tone: "green",
  },
  {
    slug: "applied-ai-essentials",
    category: "Artificial Intelligence",
    title: "Applied AI Essentials",
    desc: "Understand modern AI concepts and use intelligent tools responsibly.",
    instructor: "Instructor to be announced",
    level: "Intermediate",
    duration: "5 weeks",
    tone: "violet",
  },
  {
    slug: "ui-ux-design",
    category: "Product Design",
    title: "UI/UX & Product Design",
    desc: "Research, structure and design digital experiences people can use with confidence.",
    instructor: "Instructor to be announced",
    level: "Beginner",
    duration: "8 weeks",
    tone: "amber",
  },
];

const courseCategories = [
  {
    slug: "web-development",
    name: "Web Development",
    description: "Frontend and backend skills for building complete modern web products.",
    icon: "globe" as IconName,
  },
  {
    slug: "data-analysis",
    name: "Data Analysis",
    description: "Work with data, find patterns and communicate useful insights.",
    icon: "signal" as IconName,
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    description: "Build visual communication skills for brands, products and campaigns.",
    icon: "layers" as IconName,
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description: "Plan and improve practical campaigns across digital channels.",
    icon: "compass" as IconName,
  },
  {
    slug: "programming",
    name: "Programming",
    description: "Develop computational thinking and practical software skills.",
    icon: "code" as IconName,
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    description: "Understand AI concepts, tools and responsible real-world applications.",
    icon: "brain" as IconName,
  },
  {
    slug: "product-design",
    name: "Product Design",
    description: "Design useful, accessible and intuitive digital experiences.",
    icon: "spark" as IconName,
  },
];

function TechVisual() {
  return (
    <motion.div
      className="system-visual"
      aria-label="Illustration of a production software delivery workspace"
      initial={{ opacity: 0, x: 40, rotateY: -5 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="system-window">
        <div className="system-bar">
          <div className="window-controls">
            <i />
            <i />
            <i />
          </div>
          <span>Delivery workspace</span>
          <b>
            <i /> Production ready
          </b>
        </div>
        <div className="system-shell">
          <aside>
            <div className="system-logo">N</div>
            {["Overview", "Architecture", "Experience", "Delivery"].map((item, index) => (
              <span className={index === 1 ? "selected" : ""} key={item}>
                <i />
                {item}
              </span>
            ))}
          </aside>
          <div className="system-main">
            <div className="system-heading">
              <div>
                <small>CLIENT PLATFORM / ARCHITECTURE</small>
                <strong>Production blueprint</strong>
              </div>
              <span>v1.0</span>
            </div>
            <div className="system-modules">
              {[
                ["01", "Experience layer", "Web · Mobile · Dashboard"],
                ["02", "Service layer", "API · Authentication · Logic"],
                ["03", "Intelligence", "AI workflows · Automation"],
                ["04", "Data foundation", "Secure · Structured · Scalable"],
              ].map(([number, title, text], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.09 }}
                >
                  <span>{number}</span>
                  <i>
                    <b />
                    <b />
                    <b />
                  </i>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </motion.div>
              ))}
            </div>
            <div className="system-release">
              <div className="release-ring">
                <span>96</span>
              </div>
              <div>
                <small>DELIVERY READINESS</small>
                <strong>Quality gates passed</strong>
                <p>Design system · Accessibility · Security · Performance</p>
              </div>
              <span className="release-status">Ready</span>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="mobile-preview"
        initial={{ opacity: 0, y: 35, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mobile-speaker" />
        <div className="mobile-app-head">
          <div className="mobile-app-logo">N</div>
          <span>
            <small>MOBILE WORKSPACE</small>
            <b>Project overview</b>
          </span>
          <i />
        </div>
        <div className="mobile-highlight">
          <small>PRODUCT EXPERIENCE</small>
          <strong>Work that moves with you.</strong>
          <span>
            View activity <Icon name="arrow" size={11} />
          </span>
        </div>
        <div className="mobile-actions">
          <div>
            <Icon name="check" size={14} />
            <span>
              <b>Approvals</b>
              <small>Review items</small>
            </span>
          </div>
          <div>
            <Icon name="signal" size={14} />
            <span>
              <b>Insights</b>
              <small>View progress</small>
            </span>
          </div>
        </div>
        <div className="mobile-activity">
          <span>Recent activity</span>
          <i />
          <i />
          <i />
        </div>
        <div className="mobile-nav">
          <b />
          <i />
          <i />
          <i />
        </div>
      </motion.div>
      <motion.div
        className="system-float system-float-top"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon name="check" size={15} />
        <span>
          <small>Interface system</small>
          <b>24 components aligned</b>
        </span>
      </motion.div>
      <motion.div
        className="system-float system-float-bottom"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <span className="pulse-dot" />
        <span>
          <small>Deployment</small>
          <b>All systems operational</b>
        </span>
      </motion.div>
    </motion.div>
  );
}

function Hero({
  eyebrow,
  title,
  text,
  children,
  visual = true,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  children?: ReactNode;
  visual?: boolean;
}) {
  return (
    <section className={`hero ${visual ? "" : "simple-hero"}`}>
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          <p>{text}</p>
          {children && <div className="hero-actions">{children}</div>}
        </motion.div>
        {visual && <TechVisual />}
      </div>
    </section>
  );
}

function ServiceCard({ item, numbered }: { item: (typeof services)[0]; numbered?: string }) {
  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
    >
      <div className="service-icon">{numbered || <Icon name={item.icon} />}</div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <a href="/technology">
        Learn more <Icon name="arrow" size={16} />
      </a>
    </motion.article>
  );
}

function CourseCard({ course }: { course: (typeof courses)[0] }) {
  return (
    <motion.article
      className="course-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -7 }}
    >
      <div className={`course-art ${course.tone}`}>
        <span>Sample course</span>
        <Icon
          name={
            courseCategories.find((category) => category.name === course.category)?.icon || "code"
          }
          size={34}
        />
        <b>{course.category}</b>
      </div>
      <div className="course-body">
        <span className="course-category">{course.category}</span>
        <h3>{course.title}</h3>
        <p>{course.desc}</p>
        <div className="course-meta">
          <span>
            <Icon name="signal" size={15} />
            {course.level}
          </span>
          <span>
            <Icon name="clock" size={15} />
            {course.duration}
          </span>
        </div>
        <div className="course-footer">
          <span>{course.instructor}</span>
          <a href={`/academy/courses/${course.slug}`}>
            View course <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function MindraPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`mindra-panel ${compact ? "compact" : ""}`}>
      <div className="mindra-copy">
        <div className="mindra-logo">
          <img src="/brand/mindra-logo.png" alt="Mindra" />
        </div>
        <span className="product-label">AI content creation · Social automation</span>
        <h3>Turn one idea into content that travels further.</h3>
        <p>
          Mindra helps creators, businesses and organisations transform video, audio, text and
          images into publish-ready social content.
        </p>
        <ul>
          <li>AI-powered content creation</li>
          <li>Video repurposing</li>
          <li>Content calendar and publishing</li>
        </ul>
        <Button href="https://mindra.online" external>
          Explore Mindra
        </Button>
      </div>
      <div className="mindra-live-preview">
        <img
          src="/brand/mindra-preview.png"
          alt="Mindra interface preview: one platform to create, repurpose and publish content"
        />
        <span>Live product design from mindra.online</span>
      </div>
    </div>
  );
}

function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <span className="eyebrow light">Take the next step</span>
          <h2>Have an idea? Let’s build something meaningful.</h2>
          <p>
            Whether you need a technology partner or want to develop your skills, we’re ready to
            help you move forward.
          </p>
        </div>
        <div className="cta-actions">
          <Button href="/contact">Discuss a project</Button>
          <Button href="/academy" secondary>
            Explore courses
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo light />
            <p>
              Building digital products, developing software solutions and equipping people with
              practical technology skills.
            </p>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/technology">Technology</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h4>Academy</h4>
            <a href="/academy">All courses</a>
            <a href="/academy/categories/web-development">Web development</a>
            <a href="/academy/categories/data-analysis">Data analysis</a>
            <a href="/academy/categories/graphic-design">Graphic design</a>
            <a href="/academy/categories/digital-marketing">Digital marketing</a>
          </div>
          <div>
            <h4>Product</h4>
            <a href="https://mindra.online" target="_blank" rel="noreferrer">
              Mindra ↗
            </a>
            <h4 className="footer-sub">Connect</h4>
            <span>Contact details coming soon</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nextjillion. All rights reserved.</span>
          <div>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Hero
        eyebrow="Software · AI · Digital Products · Technology Education"
        title="We build digital products people trust and businesses rely on."
        text="From custom software and AI-powered products to practical online courses, Nextjillion helps businesses build better technology and people develop the skills to build what comes next."
      >
        <Button href="/contact">Discuss your project</Button>
        <Button href="/academy" secondary>
          Explore courses
        </Button>
      </Hero>
      <section className="delivery-strip" aria-label="Core delivery capabilities">
        <div className="container">
          {[
            ["01", "Product strategy"],
            ["02", "UI & UX design"],
            ["03", "Web & mobile apps"],
            ["04", "Full-stack engineering"],
            ["05", "AI & automation"],
          ].map(([number, label]) => (
            <div key={label}>
              <span>{number}</span>
              <b>{label}</b>
            </div>
          ))}
        </div>
      </section>
      <section className="intro-section">
        <div className="container intro-grid">
          <span className="section-index">01 — WHY WE EXIST</span>
          <Reveal>
            <h2>
              Serious engineering.
              <br />
              Thoughtful experiences.
            </h2>
            <p>
              Good software is more than working code. It is a clear product experience, a sound
              technical foundation and a system your organisation can operate with confidence.
            </p>
            <p>
              We bring strategy, interface design and engineering into one delivery process—so every
              decision connects back to the people using the product and the business behind it.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section delivery-standard">
        <div className="container">
          <div className="delivery-standard-head">
            <SectionHead
              eyebrow="A higher delivery standard"
              title="Built with the discipline your project deserves."
              copy="Our process is designed to make complexity visible, decisions deliberate and delivery accountable."
            />
            <span className="standard-mark">NEXT / SYSTEMS / 01</span>
          </div>
          <div className="standard-grid">
            {[
              [
                "Product clarity",
                "We define the problem, user flows and success criteria before complexity becomes expensive.",
                "Discovery · Scope · Roadmap",
              ],
              [
                "Interface quality",
                "We design coherent, accessible experiences backed by reusable systems—not disconnected screens.",
                "UX · UI · Design systems",
              ],
              [
                "Engineering confidence",
                "We structure software for security, maintainability and the realities of long-term operation.",
                "Architecture · QA · Handover",
              ],
            ].map(([title, text, meta], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
              >
                <span>0{index + 1}</span>
                <div className="standard-diagram">
                  <i />
                  <i />
                  <i />
                  <b />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>{meta}</small>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft" id="divisions">
        <div className="container">
          <SectionHead
            eyebrow="One company, two connected strengths"
            title="Built to create. Built to teach."
            copy="Our divisions work together around a shared belief: technology creates the most value when people can build it, understand it and use it well."
          />
          <div className="division-grid">
            <article className="division-card technology">
              <div className="division-top">
                <span>01</span>
                <Icon name="code" size={30} />
              </div>
              <h3>
                Nextjillion
                <br />
                Technologies
              </h3>
              <p>
                We design and build software, digital products and intelligent solutions that help
                businesses work smarter and grow.
              </p>
              <ul>
                {[
                  "Software development",
                  "Web applications",
                  "Mobile applications",
                  "AI and automation",
                  "Digital product development",
                  "Business technology solutions",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Button href="/technology" secondary>
                Explore technology
              </Button>
            </article>
            <article className="division-card academy">
              <div className="division-top">
                <span>02</span>
                <Icon name="book" size={30} />
              </div>
              <h3>
                Nextjillion
                <br />
                Academy
              </h3>
              <p>
                Practical online education that helps people develop relevant skills, build real
                projects and grow professionally.
              </p>
              <ul>
                {[
                  "Software development courses",
                  "Artificial intelligence",
                  "Web development",
                  "Digital skills",
                  "Project-based learning",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Button href="/academy" secondary>
                Explore academy
              </Button>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Technology capabilities"
            title="From ideas to working technology."
            copy="We combine clear thinking, strong engineering and practical delivery to build technology that works in the real world."
          />
          <div className="services-grid">
            {services.map((x, i) => (
              <ServiceCard item={x} key={x.title} numbered={`0${i + 1}`} />
            ))}
          </div>
          <div className="section-action">
            <Button href="/contact">Discuss a project</Button>
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container">
          <SectionHead
            eyebrow="Featured product"
            title="Products built by Nextjillion."
            copy="We develop digital products that solve practical problems and create lasting value."
          />
          <MindraPanel compact />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="split-head">
            <SectionHead
              eyebrow="Nextjillion Academy"
              title="Learn the skills. Build the future."
              copy="Practical technology education for people who want to learn, build and grow."
            />
            <Button href="/academy" secondary>
              Explore all courses
            </Button>
          </div>
          <div className="prototype-note">
            Prototype catalogue · Course details are editable sample content
          </div>
          <div className="course-grid">
            {courses.slice(0, 3).map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead
            eyebrow="Why Nextjillion"
            title="More than technology. A commitment to progress."
            center
          />
          <div className="values-grid">
            {[
              ["spark", "Practical Innovation", "Solutions grounded in real problems."],
              [
                "code",
                "Technical Excellence",
                "Quality engineering and thoughtful implementation.",
              ],
              ["book", "Continuous Learning", "People and technology should keep evolving."],
              ["compass", "Future-Focused", "Built for adaptability and long-term value."],
            ].map(([icon, title, text]) => (
              <div className="value-card" key={title}>
                <Icon name={icon as IconName} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function About() {
  const values = [
    ["Innovation", "Explore better ways to solve real problems."],
    ["Integrity", "Build trust through honesty and responsible action."],
    ["Excellence", "Take pride in thoughtful, high-quality work."],
    ["Learning", "Stay curious and keep moving forward."],
    ["Collaboration", "Create stronger outcomes together."],
    ["Impact", "Focus on work that creates meaningful value."],
  ];
  return (
    <>
      <Hero
        eyebrow="About Nextjillion"
        title="Building what comes next."
        text="Nextjillion exists to build useful technology, develop innovative digital products and help people become active participants in the evolving digital economy."
      />
      <section className="section">
        <div className="container story-grid">
          <div>
            <span className="eyebrow">Our story</span>
            <h2>
              Two connected ideas.
              <br />
              One clear purpose.
            </h2>
          </div>
          <div className="story-copy">
            <p>
              Nextjillion is a technology company built around two connected areas of focus:
              building technology and developing people through education.
            </p>
            <p>
              Our technology work transforms ideas and operational challenges into digital
              solutions. Our academy helps people build the practical skills to participate in that
              same future.
            </p>
            <p>
              Together, they create a company that doesn’t simply deliver software—it grows the
              capability to imagine, build and improve what comes next.
            </p>
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container mission-grid">
          <article>
            <span>Mission</span>
            <h3>
              Build practical technology solutions and provide accessible, relevant education that
              helps businesses and people move forward.
            </h3>
          </article>
          <article>
            <span>Vision</span>
            <h3>
              Become a globally recognised technology company that creates valuable products, solves
              meaningful problems and develops the next generation of technology talent.
            </h3>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What guides us" title="Values for work that matters." />
          <div className="value-list">
            {values.map(([a, b], i) => (
              <div key={a}>
                <span>0{i + 1}</span>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section architecture">
        <div className="container">
          <SectionHead
            eyebrow="Our brand architecture"
            title="Designed to grow without losing focus."
            copy="One parent brand connects our technology capabilities, owned products and practical education."
            center
          />
          <div className="arch-map">
            <div className="arch-root">
              <Logo light />
              <span>Building Technology. Developing People.</span>
            </div>
            <div className="arch-lines" />
            <div className="arch-branches">
              <article>
                <Icon name="code" />
                <h3>Technologies</h3>
                <p>Web, mobile, AI, automation and digital solutions.</p>
              </article>
              <article className="product">
                <span className="mindra-mini">m</span>
                <h3>Mindra</h3>
                <p>An owned AI content product within our portfolio.</p>
              </article>
              <article>
                <Icon name="book" />
                <h3>Academy</h3>
                <p>Courses, programming, AI and digital skills.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function Technology() {
  const detailed = [
    [
      "Custom Software Development",
      "Software applications designed around specific business requirements—not generic workarounds.",
      "code",
    ],
    [
      "Web Application Development",
      "Modern web platforms, operational dashboards, portals and responsive business applications.",
      "globe",
    ],
    [
      "Mobile Application Development",
      "Purposeful iOS and Android applications designed for performance, usability and reliable everyday use.",
      "phone",
    ],
    [
      "AI & Automation",
      "AI integrations, intelligent applications and workflow automation that improve how work gets done.",
      "brain",
    ],
    [
      "Digital Product Development",
      "Product discovery, MVP development, product engineering and considered continuous improvement.",
      "layers",
    ],
    [
      "Technology Consulting",
      "Technical strategy, architecture guidance and practical implementation support.",
      "compass",
    ],
  ];
  return (
    <>
      <Hero
        eyebrow="Nextjillion Technologies"
        title="We turn ideas into technology."
        text="From web and mobile applications to AI-powered systems, we help organisations transform ideas and operational challenges into useful digital solutions."
      >
        <Button href="/contact">Discuss your project</Button>
      </Hero>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Capabilities"
            title="Technology built around real needs."
            copy="We work from the problem outward, bringing product thinking, design and engineering together."
          />
          <div className="detailed-services">
            {detailed.map(([title, text, icon], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <div className="detail-icon">
                  <Icon name={icon as IconName} size={28} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <Icon name="arrow" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="A clear path from problem to product."
            copy="A collaborative process designed to reduce uncertainty, maintain momentum and create better outcomes."
          />
          <div className="process-grid">
            {[
              ["Discovery", "Understand the problem and requirements."],
              ["Planning", "Define the approach and project scope."],
              ["Design", "Create user-focused experiences."],
              ["Development", "Build, test and refine the solution."],
              ["Delivery", "Deploy, support and improve."],
            ].map(([a, b], i) => (
              <div key={a}>
                <b>0{i + 1}</b>
                <i />
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function Products() {
  return (
    <>
      <Hero
        eyebrow="Nextjillion Products"
        title="Technology products designed to solve real problems."
        text="We develop and operate digital products that make useful technology more accessible and practical."
      />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Featured product"
            title="Meet Mindra."
            copy="A focused AI workspace for turning ideas and source material into content ready for the channels that matter."
          />
          <MindraPanel />
        </div>
      </section>
      <section className="section soft">
        <div className="container product-features">
          <SectionHead
            eyebrow="What it helps you do"
            title="Create once. Repurpose intelligently."
          />
          <div>
            {[
              ["spark", "Create with AI", "Generate captions, ideas and useful social content."],
              ["play", "Repurpose media", "Turn video, audio, text and images into new formats."],
              ["layers", "Plan content", "Organise ideas in a practical content calendar."],
              ["globe", "Publish", "Schedule and publish on supported social platforms."],
            ].map(([icon, a, b]) => (
              <article key={a}>
                <Icon name={icon as IconName} />
                <h3>{a}</h3>
                <p>{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="product-future">
        <div className="container">
          <span>OUR PRODUCT PORTFOLIO</span>
          <h2>Built to expand with the problems we solve.</h2>
          <p>
            Mindra is our first featured product. This portfolio is intentionally designed to
            welcome future Nextjillion products without diluting the parent brand.
          </p>
        </div>
      </section>
      <CTA />
    </>
  );
}

function Academy() {
  const categories = ["All", ...courseCategories.map((category) => category.name)];
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (active === "All" || c.category === active) &&
          c.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [active, search],
  );
  return (
    <>
      <Hero
        eyebrow="Nextjillion Academy"
        title="Build skills that move you forward."
        text="Learn technology through practical courses designed to help you understand concepts, develop useful skills and build real-world projects."
      >
        <Button href="#catalogue">Explore courses</Button>
      </Hero>
      <section className="section" id="catalogue">
        <div className="container">
          <SectionHead
            eyebrow="Learning areas"
            title="Choose a direction. Build practical ability."
            copy="Each learning area has its own page, giving every discipline room for focused courses and future learning paths."
          />
          <div className="category-page-grid">
            {courseCategories.map((category) => (
              <a href={`/academy/categories/${category.slug}`} key={category.slug}>
                <Icon name={category.icon} size={25} />
                <span>{category.name}</span>
                <p>{category.description}</p>
                <i>
                  View learning area <Icon name="arrow" size={15} />
                </i>
              </a>
            ))}
          </div>
          <div className="split-head">
            <SectionHead
              eyebrow="Course catalogue"
              title="Find your next learning path."
              copy="Prototype courses below demonstrate the catalogue experience and can be replaced when final course content is supplied."
            />
            <div className="search-box">
              <Icon name="search" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses"
                aria-label="Search courses"
              />
            </div>
          </div>
          <div className="filter-row" aria-label="Course categories">
            {categories.map((c) => (
              <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>
                {c}
              </button>
            ))}
          </div>
          {filtered.length ? (
            <div className="course-grid academy-grid">
              {filtered.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={30} />
              <h3>No courses found</h3>
              <p>Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
      <section className="section dark-section benefits">
        <div className="container">
          <SectionHead eyebrow="Why learn with us" title="Learning designed for doing." />
          <div className="benefit-grid">
            {[
              "Practical, project-based learning",
              "Structured learning paths",
              "Technology-focused instruction",
              "Skills for real projects",
              "Portfolio-building opportunities",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <Icon name="check" />
                <h3>{x}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function CategoryPage({ slug }: { slug: string }) {
  const category = courseCategories.find((item) => item.slug === slug);
  if (!category) return <NotFound />;
  const categoryCourses = courses.filter((course) => course.category === category.name);
  return (
    <>
      <section className="category-hero">
        <div className="container">
          <div className="breadcrumbs">
            <a href="/academy">Academy</a>
            <span>/</span>
            <span>{category.name}</span>
          </div>
          <div className="category-hero-content">
            <div className="category-hero-icon">
              <Icon name={category.icon} size={34} />
            </div>
            <span className="eyebrow">Learning area</span>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <Button href="#category-courses">Browse courses</Button>
          </div>
        </div>
      </section>
      <section className="section" id="category-courses">
        <div className="container">
          <SectionHead
            eyebrow={`${categoryCourses.length} prototype ${categoryCourses.length === 1 ? "course" : "courses"}`}
            title={`Learn ${category.name.toLowerCase()} by building.`}
            copy="These editable course pages demonstrate how this learning area can grow as final curriculum and instructor details are supplied."
          />
          <div className="course-grid">
            {categoryCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
          {categoryCourses.length === 1 && (
            <div className="category-coming">
              More {category.name.toLowerCase()} courses can be added here without redesigning the
              academy.
            </div>
          )}
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Explore more" title="Other learning areas." />
          <div className="category-link-row">
            {courseCategories
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <a href={`/academy/categories/${item.slug}`} key={item.slug}>
                  {item.name} <Icon name="arrow" size={15} />
                </a>
              ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

function CourseDetail({ slug }: { slug: string }) {
  const course = courses.find((c) => c.slug === slug) || courses[0];
  const modules = [
    [
      "Getting Started",
      "Set up your tools and understand the core ideas behind the course.",
      "4 lessons",
    ],
    [
      "Core Concepts",
      "Build a strong understanding through guided practical exercises.",
      "6 lessons",
    ],
    [
      "Applying Your Skills",
      "Use what you have learned to solve structured challenges.",
      "5 lessons",
    ],
    [
      "Practical Project",
      "Bring the skills together in a complete portfolio-ready project.",
      "4 lessons",
    ],
  ];
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="course-hero">
        <div className="container">
          <div className="breadcrumbs">
            <a href="/academy">Academy</a>
            <span>/</span>
            <a
              href={`/academy/categories/${courseCategories.find((item) => item.name === course.category)?.slug}`}
            >
              {course.category}
            </a>
          </div>
          <div className="course-hero-grid">
            <div>
              <span className="eyebrow">{course.category} · Sample course</span>
              <h1>{course.title}</h1>
              <p>
                {course.desc} This page is an editable prototype until final curriculum and
                enrolment details are supplied.
              </p>
              <div className="course-hero-meta">
                <span>
                  <Icon name="signal" />
                  {course.level}
                </span>
                <span>
                  <Icon name="clock" />
                  {course.duration}
                </span>
                <span>
                  <Icon name="globe" />
                  Online
                </span>
              </div>
              <Button href="#enrol">Enrol now</Button>
            </div>
            <div className={`course-video ${course.tone}`}>
              <button aria-label="Play course introduction placeholder">
                <Icon name="play" size={48} />
              </button>
              <span>Course introduction placeholder</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container course-layout">
          <main>
            <SectionHead eyebrow="Course overview" title="What you’ll learn." />
            <p>
              This sample course is structured to turn foundational understanding into practical
              ability through guided exercises and a complete project.
            </p>
            <div className="outcomes">
              {[
                "Understand the course’s core concepts",
                "Apply skills through focused exercises",
                "Build a practical end-to-end project",
                "Develop a foundation for further learning",
              ].map((x) => (
                <div key={x}>
                  <Icon name="check" size={18} />
                  {x}
                </div>
              ))}
            </div>
            <div className="curriculum">
              <SectionHead eyebrow="Curriculum" title="Course modules." />
              <div>
                {modules.map((m, i) => (
                  <article key={m[0]} className={open === i ? "open" : ""}>
                    <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                      <span>0{i + 1}</span>
                      <div>
                        <h3>{m[0]}</h3>
                        <small>{m[2]}</small>
                      </div>
                      <Icon name="chevron" />
                    </button>
                    {open === i && <p>{m[1]}</p>}
                  </article>
                ))}
              </div>
            </div>
          </main>
          <aside id="enrol">
            <span>Course details</span>
            <dl>
              <div>
                <dt>Instructor</dt>
                <dd>{course.instructor}</dd>
              </div>
              <div>
                <dt>Level</dt>
                <dd>{course.level}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Online learning</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>To be announced</dd>
              </div>
            </dl>
            <Button href="/contact">Enquire to enrol</Button>
            <small>Enrolment is not yet connected to a learning platform.</small>
          </aside>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Keep learning" title="Related sample courses." />
          <div className="course-grid">
            {courses
              .filter((c) => c.slug !== course.slug)
              .slice(0, 3)
              .map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    ["name", "email", "type", "subject", "message"].forEach((k) => {
      if (!String(form.get(k) || "").trim()) next[k] = "This field is required.";
    });
    if (form.get("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(form.get("email"))))
      next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  }
  return (
    <>
      <Hero
        eyebrow="Contact Nextjillion"
        title="Let’s create something meaningful."
        text="Whether you’re looking to build a software solution, explore a partnership or learn with Nextjillion Academy, we’d like to hear from you."
      />
      <section className="section contact-section">
        <div className="container">
          <div className="contact-paths">
            {[
              [
                "briefcase",
                "Business & software",
                "Web and mobile development, AI, automation and technology solutions.",
                "Discuss a project",
              ],
              [
                "book",
                "Academy enquiries",
                "Help with online courses, learning paths and enrolment.",
                "Ask about courses",
              ],
              [
                "users",
                "Partnerships",
                "Collaboration and strategic partnership opportunities.",
                "Explore partnerships",
              ],
            ].map(([icon, a, b, c]) => (
              <article key={a}>
                <Icon name={icon as IconName} />
                <h3>{a}</h3>
                <p>{b}</p>
                <a href="#contact-form">
                  {c}
                  <Icon name="arrow" size={16} />
                </a>
              </article>
            ))}
          </div>
          <div className="contact-grid" id="contact-form">
            <div>
              <span className="eyebrow">Send an enquiry</span>
              <h2>Tell us what you’re thinking.</h2>
              <p>
                Share a little about what you want to build, learn or explore. This prototype form
                demonstrates validation and submission states; backend delivery will be connected
                later.
              </p>
              <div className="contact-note">
                <Icon name="mail" />
                <div>
                  <b>Contact details</b>
                  <span>Official email and address will be added when supplied.</span>
                </div>
              </div>
            </div>
            <form onSubmit={submit} noValidate>
              <div className="field-row">
                <Field name="name" label="Full name" error={errors.name} />
                <Field name="email" label="Email address" type="email" error={errors.email} />
              </div>
              <Field name="organisation" label="Organisation" optional />
              <label className={errors.type ? "invalid" : ""}>
                Enquiry type
                <select name="type" defaultValue="">
                  <option value="" disabled>
                    Select an enquiry type
                  </option>
                  <option>Software Development</option>
                  <option>AI and Automation</option>
                  <option>Academy and Courses</option>
                  <option>Partnership</option>
                  <option>General Enquiry</option>
                </select>
                {errors.type && <small>{errors.type}</small>}
              </label>
              <Field name="subject" label="Subject" error={errors.subject} />
              <label className={errors.message ? "invalid" : ""}>
                Message
                <textarea name="message" rows={5} placeholder="How can we help?" />
                {errors.message && <small>{errors.message}</small>}
              </label>
              <button
                className="submit-button"
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading"
                  ? "Sending…"
                  : status === "success"
                    ? "Message ready"
                    : "Send enquiry"}
                <Icon name={status === "success" ? "check" : "arrow"} size={18} />
              </button>
              {status === "success" && (
                <div className="form-success">
                  Thank you. This prototype has validated your message successfully. Backend
                  delivery will be connected later.
                </div>
              )}
              {status === "error" && Object.keys(errors).length > 0 && (
                <div className="form-error">Please review the highlighted fields.</div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  optional,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <label className={error ? "invalid" : ""}>
      {label}
      {optional && <span> (optional)</span>}
      <input name={name} type={type} />
      {error && <small>{error}</small>}
    </label>
  );
}

function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>This page is still taking shape.</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Button href="/">Return home</Button>
    </section>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.25 });
  useEffect(() => {
    const pageName =
      path === "/"
        ? "Building Technology. Developing People."
        : path.startsWith("/academy/courses/")
          ? "Course Details"
          : path
              .split("/")
              .filter(Boolean)
              .map((part) => part[0].toUpperCase() + part.slice(1))
              .join(" · ");
    document.title = `${pageName} — Nextjillion`;
  }, [path]);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (
        !a ||
        a.target ||
        a.origin !== window.location.origin ||
        (a.hash && a.pathname === window.location.pathname)
      )
        return;
      e.preventDefault();
      history.pushState({}, "", a.href);
      setPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const pop = () => setPath(window.location.pathname);
    document.addEventListener("click", click);
    window.addEventListener("popstate", pop);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("popstate", pop);
    };
  }, []);
  let page: ReactNode;
  if (path === "/") page = <Home />;
  else if (path === "/about") page = <About />;
  else if (path === "/technology") page = <Technology />;
  else if (path === "/products") page = <Products />;
  else if (path === "/academy") page = <Academy />;
  else if (path.startsWith("/academy/courses/"))
    page = <CourseDetail slug={path.split("/").pop() || ""} />;
  else if (path.startsWith("/academy/categories/"))
    page = <CategoryPage slug={path.split("/").pop() || ""} />;
  else if (path === "/contact") page = <Contact />;
  else page = <NotFound />;
  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
      <Header path={path} />
      <AnimatePresence mode="wait">
        <motion.main
          key={path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          {page}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}

export default App;
