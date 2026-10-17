"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// SVG Icons

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    megaphone: (
      <>
        <path d="m3 11 18-5v12L3 13v-2Z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    code: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
    pen: (
      <>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    chartUp: (
      <>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    headset: (
      <>
        <path d="M3 11v3a8 8 0 0 0 16 0v-3" />
        <path d="M21 14a2 2 0 0 1-2 2h-1v-4h1a2 2 0 0 1 2 2Z" />
        <path d="M5 12H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1v-5Z" />
      </>
    ),
    mapPin: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    mail: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
    chevronLeft: (
      <path d="m15 18-6-6 6-6" />
    ),
    chevronRight: (
      <path d="m9 18 6-6-6-6" />
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    instagram: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
    twitter: (
      <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    ),
    youtube: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <polygon points="10 15 15 12 10 9 10 15" />
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] || icons.arrowRight}
    </svg>
  );
}

const servicesData = [
  {
    icon: "megaphone",
    title: "Digital Marketing",
    desc: "Social media, content, email and performance marketing that delivers results.",
  },
  {
    icon: "search",
    title: "SEO",
    desc: "Improve your search rankings and get found by the right audience.",
  },
  {
    icon: "code",
    title: "Web Development",
    desc: "Modern, fast and scalable web applications tailored to your needs.",
  },
  {
    icon: "pen",
    title: "Branding & Design",
    desc: "Build a strong brand identity with creative and impactful designs.",
  },
  {
    icon: "target",
    title: "Paid Advertising",
    desc: "Targeted campaigns that bring quality leads and maximize ROI.",
  },
];

const projectsData = [
  {
    image: "/assets/project-1@3x.png",
    category: "SEO + Social Media",
    title: "E-Commerce Brand",
    metric: "+247% Organic Traffic",
  },
  {
    image: "/assets/project-2@3x.png",
    category: "Web Development",
    title: "EdTech Platform",
    metric: "2.5x Lead Generation",
  },
  {
    image: "/assets/project-3@3x.png",
    category: "Digital Marketing",
    title: "Healthcare Brand",
    metric: "+180% Engagement",
  },
  {
    image: "/assets/project-4@3x.png",
    category: "Branding & Design",
    title: "Local Business",
    metric: "New Brand Identity",
  },
];

const testimonialsData = [
  {
    quote:
      "“Xntrova transformed our online presence. Their team is professional, creative and truly understands our goals.”",
    avatar: "/assets/avatar-priya-96.png",
    name: "Priya Sharma",
    role: "Founder, Bloom & Co.",
    rating: 5,
  },
  {
    quote:
      "“Excellent communication, timely delivery and outstanding results. We've seen significant growth in just a few months.”",
    avatar: "/assets/avatar-rahul-96.png",
    name: "Rahul Mehta",
    role: "CEO, TechVibe",
    rating: 5,
  },
  {
    quote:
      "“Working with Xntrova helped us scale our digital reach by 180%. The attention to detail and technical execution were exceptional.”",
    avatar: "/assets/avatar-priya-96.png",
    name: "Ananya Roy",
    role: "Marketing Director, Nova Health",
    rating: 5,
  },
  {
    quote:
      "“The team at Xntrova delivered our modern e-commerce platform ahead of schedule. Highly recommended for any serious business.”",
    avatar: "/assets/avatar-rahul-96.png",
    name: "Vikram Singhania",
    role: "Head of Growth, Elevate Retail",
    rating: 5,
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextTestimonial = () => {
    setTestiIndex((prev) => (prev + 2 >= testimonialsData.length ? 0 : prev + 2));
  };

  const handlePrevTestimonial = () => {
    setTestiIndex((prev) => (prev - 2 < 0 ? Math.max(0, testimonialsData.length - 2) : prev - 2));
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSent(true);
    }, 600);
  };

  const visibleTestimonials = testimonialsData.slice(testiIndex, testiIndex + 2);

  return (
    <div className={styles.page} id="top">
      {/* Header */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.navbar}`}>
          <a href="#top" className={styles.logo} aria-label="Xntrova Homepage">
            <Image
              src="/assets/xntrova-logo-transparent@3x.png"
              alt="Xntrova"
              width={140}
              height={48}
              priority
              className={styles.logoHeaderImg}
            />
          </a>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Main Navigation">
            <a href="#top" className={`${styles.navLink} ${styles.navLinkActive}`} onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="#services" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Services
            </a>
            <a href="#about" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#portfolio" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Portfolio
            </a>
            <a href="#testimonials" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Testimonials
            </a>
            <a href="#contact" className={styles.navLink} onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <a href="#contact" className={styles.navCta}>
            Get Started <Icon name="arrowRight" size={14} />
          </a>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={24} />
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroContent}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                Digital Marketing &amp; Technology Agency
              </div>
              <h1 className={styles.heroTitle}>
                Build Your Brand.
                <br />
                Grow Your Business.
              </h1>
              <p className={styles.heroDesc}>
                We combine creative thinking, marketing expertise and modern technology to help brands achieve real
                growth in the digital world.
              </p>
              <div className={styles.heroActions}>
                <a href="#contact" className={styles.btnPrimary}>
                  Get a Free Consultation <Icon name="arrowRight" size={15} />
                </a>
                <a href="#services" className={styles.btnSecondary}>
                  Explore Our Services
                </a>
              </div>

              <div className={styles.trustBar}>
                <div className={styles.avatarStack} aria-hidden="true">
                  <Image src="/assets/avatar-priya-96.png" alt="Happy client" width={32} height={32} />
                  <Image src="/assets/avatar-rahul-96.png" alt="Happy client" width={32} height={32} />
                  <Image src="/assets/avatar-priya-96.png" alt="Happy client" width={32} height={32} />
                  <span className={styles.avatarFallback} style={{ display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, color: "#fff", background: "#3758ff" }}>
                    +
                  </span>
                </div>
                <div className={styles.trustStat}>
                  <strong>100+</strong>
                  <span>Happy Clients</span>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.ratingStat}>
                  <div className={styles.ratingValue}>
                    <span>★</span> 4.9/5
                  </div>
                  <small>Client Satisfaction</small>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroCompositeWrapper}>
                <Image
                  src="/assets/hero-composite@3x.png"
                  alt="Xntrova Digital Marketing &amp; Technology growth platform on MacBook with interactive analytics, SEO, Paid Ads, and Web Development"
                  width={990}
                  height={525}
                  priority
                  className={styles.heroCompositeImg}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.servicesSection} id="services">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderLeft}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} />
                  OUR SERVICES
                </div>
                <h2 className={styles.sectionTitle}>Everything You Need to Grow</h2>
                <p className={styles.sectionSubtitle}>
                  From strategy to execution, we offer end-to-end digital solutions to help your brand succeed online.
                </p>
              </div>
              <a href="#contact" className={styles.viewAllLink}>
                View All Services <Icon name="arrowRight" size={14} />
              </a>
            </div>

            <div className={styles.servicesGrid}>
              {servicesData.map((service) => (
                <article className={styles.serviceCard} key={service.title}>
                  <div className={styles.serviceIconWrap}>
                    <Icon name={service.icon} size={20} />
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.desc}</p>
                  <a href="#contact" className={styles.serviceLink}>
                    Learn More <Icon name="arrowRight" size={13} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection} id="about">
          <div className={`${styles.container} ${styles.aboutGrid}`}>
            <div className={styles.aboutVisual}>
              <div className={styles.aboutImgWrapper}>
                <Image
                  src="/assets/about-office@3x.png"
                  alt="Xntrova team collaborating in meeting room with Ideas. Strategy. Technology. Growth."
                  width={675}
                  height={384}
                  className={styles.aboutOfficeImg}
                />
              </div>
              <div className={styles.aboutTrustBadge}>
                <div className={styles.avatarStack}>
                  <Image src="/assets/avatar-priya-96.png" alt="Client" width={28} height={28} />
                  <Image src="/assets/avatar-rahul-96.png" alt="Client" width={28} height={28} />
                  <span
                    className={styles.avatarFallback}
                    style={{ width: 28, height: 28, display: "grid", placeItems: "center", fontSize: 9, fontWeight: 700, color: "#fff", background: "#7657ef" }}
                  >
                    +
                  </span>
                </div>
                <div className={styles.aboutTrustInfo}>
                  <strong>Trusted by 100+ brands</strong>
                  <span>across industries</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                ABOUT XNTROVA
              </div>
              <h2 className={styles.aboutTitle}>
                Your Growth Partner
                <br />
                in the Digital World
              </h2>
              <p className={styles.aboutDesc}>
                Xntrova Technologies is a digital marketing and technology agency focused on building powerful brands,
                creating meaningful digital experiences and driving measurable growth.
              </p>

              <div className={styles.aboutFeatures}>
                <div className={styles.aboutFeatureItem}>
                  <span className={styles.aboutFeatureIcon}>
                    <Icon name="sparkle" size={20} />
                  </span>
                  <strong>Creative Minds</strong>
                  <span>Fresh ideas, bold strategies.</span>
                </div>
                <div className={styles.aboutFeatureItem}>
                  <span className={styles.aboutFeatureIcon}>
                    <Icon name="shield" size={20} />
                  </span>
                  <strong>Tech Driven</strong>
                  <span>Modern tools, future ready.</span>
                </div>
                <div className={styles.aboutFeatureItem}>
                  <span className={styles.aboutFeatureIcon}>
                    <Icon name="chartUp" size={20} />
                  </span>
                  <strong>Results Focused</strong>
                  <span>Your growth is our priority.</span>
                </div>
              </div>

              <a href="#contact" className={styles.btnPrimary}>
                Learn More About Us <Icon name="arrowRight" size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.whyChooseUsSection}>
          <div className={`${styles.container} ${styles.whyGrid}`}>
            <div>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                WHY CHOOSE US
              </div>
              <h2 className={styles.whyLeftTitle}>Why Brands Trust Xntrova</h2>
              <p className={styles.whyLeftDesc}>
                We help businesses grow with the right mix of creativity, strategy and technology.
              </p>
            </div>

            <div className={styles.whyItemsRow}>
              <div className={styles.whyItem}>
                <span className={styles.whyItemIcon}>
                  <Icon name="chartUp" size={22} />
                </span>
                <strong>Proven Results</strong>
                <span>100+ happy clients and growing.</span>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyItemIcon}>
                  <Icon name="users" size={22} />
                </span>
                <strong>Expert Team</strong>
                <span>Skilled professionals in marketing &amp; tech.</span>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyItemIcon}>
                  <Icon name="shield" size={22} />
                </span>
                <strong>Transparent Process</strong>
                <span>Clear communication, no hidden costs.</span>
              </div>
              <div className={styles.whyItem}>
                <span className={styles.whyItemIcon}>
                  <Icon name="headset" size={22} />
                </span>
                <strong>Long-Term Support</strong>
                <span>We&apos;re with you, beyond launch.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className={styles.processSection}>
          <div className={`${styles.container} ${styles.processGrid}`}>
            <div>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot} />
                OUR PROCESS
              </div>
              <h2 className={styles.processLeftTitle}>
                Simple Process.
                <br />
                Powerful Results.
              </h2>
              <p className={styles.processLeftDesc}>
                We follow a streamlined approach to ensure your project is delivered on time and exceeds expectations.
              </p>
              <a href="#contact" className={styles.viewAllLink}>
                Learn More <Icon name="arrowRight" size={14} />
              </a>
            </div>

            <div className={styles.processStepsRow}>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>01</div>
                <strong className={styles.stepTitle}>Discover</strong>
                <span className={styles.stepDesc}>Understand your goals and audience.</span>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>02</div>
                <strong className={styles.stepTitle}>Plan</strong>
                <span className={styles.stepDesc}>Create a strategy in marketing &amp; tech.</span>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>03</div>
                <strong className={styles.stepTitle}>Transparent Process</strong>
                <span className={styles.stepDesc}>Bring ideas to life with precision.</span>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>04</div>
                <strong className={styles.stepTitle}>Long-Term Support</strong>
                <span className={styles.stepDesc}>Measure, optimize and scale launch.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Projects & Case Studies */}
        <section className={styles.projectsSection} id="portfolio">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionHeaderLeft}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} />
                  OUR WORK
                </div>
                <h2 className={styles.sectionTitle}>Selected Projects &amp; Case Studies</h2>
                <p className={styles.sectionSubtitle}>
                  Real results for real businesses. Here are some of our recent projects that showcase our expertise and
                  impact.
                </p>
              </div>
              <a href="#contact" className={styles.viewAllLink}>
                View All Projects <Icon name="arrowRight" size={14} />
              </a>
            </div>

            <div className={styles.projectsGrid}>
              {projectsData.map((project) => (
                <article className={styles.projectCard} key={project.title}>
                  <div className={styles.projectImageWrap}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={354}
                      height={90}
                      className={styles.projectImg}
                    />
                  </div>
                  <div className={styles.projectCardBody}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <strong className={styles.projectMetric}>{project.metric}</strong>
                    <div className={styles.projectArrowBtn} aria-hidden="true">
                      <Icon name="arrowRight" size={13} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials Section */}
        <section className={styles.testimonialsSection} id="testimonials">
          <div className={styles.container}>
            <div className={styles.testimonialHeader}>
              <div>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} />
                  CLIENT TESTIMONIALS
                </div>
                <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
                <p className={styles.sectionSubtitle}>
                  Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with
                  Xntrova.
                </p>
              </div>
              <div className={styles.sliderControls}>
                <button
                  className={styles.sliderBtn}
                  onClick={handlePrevTestimonial}
                  aria-label="Previous testimonials"
                >
                  <Icon name="chevronLeft" size={16} />
                </button>
                <button
                  className={styles.sliderBtn}
                  onClick={handleNextTestimonial}
                  aria-label="Next testimonials"
                >
                  <Icon name="chevronRight" size={16} />
                </button>
              </div>
            </div>

            <div className={styles.testimonialsGrid}>
              {visibleTestimonials.map((item) => (
                <article className={styles.testimonialCard} key={item.name}>
                  <p className={styles.testimonialQuote}>{item.quote}</p>
                  <div className={styles.testimonialClient}>
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={36}
                      height={36}
                      className={styles.clientAvatar}
                    />
                    <div className={styles.clientDetails}>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                    <div className={styles.stars} aria-label={`${item.rating} out of 5 stars`}>
                      {"★".repeat(item.rating)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Call-to-action Section */}
        <section className={styles.ctaSection} id="contact">
          <div className={styles.container}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaCardGlow} />
              <div className={styles.ctaCardGlowLeft} />

              <div className={styles.ctaGrid}>
                <div>
                  <div className={`${styles.eyebrow} ${styles.eyebrowDark}`}>
                    <span className={styles.eyebrowDot} />
                    LET&apos;S WORK TOGETHER
                  </div>
                  <h2 className={styles.ctaTitle}>Ready to Grow Your Brand?</h2>
                  <p className={styles.ctaDesc}>
                    Get in touch with us today and let&apos;s build something amazing together.
                  </p>

                  <div className={styles.contactDetailsRow}>
                    <div className={styles.contactItem}>
                      <span className={styles.contactItemIcon}>
                        <Icon name="mapPin" size={16} />
                      </span>
                      <span>Delhi, India</span>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactItemIcon}>
                        <Icon name="mail" size={16} />
                      </span>
                      <span>hello@xntrova.com</span>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactItemIcon}>
                        <Icon name="phone" size={16} />
                      </span>
                      <span>+91 98765 43210</span>
                    </div>
                  </div>
                </div>

                <div>
                  {formSent ? (
                    <div className={styles.formSuccessMsg}>
                      <div className={styles.successIcon}>✓</div>
                      <h4>Thank you for reaching out!</h4>
                      <p>Our team will get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form className={styles.contactForm} onSubmit={handleSubmitForm}>
                      <div className={styles.formRow}>
                        <input
                          type="text"
                          required
                          placeholder="Full name"
                          className={styles.formInput}
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          className={styles.formInput}
                        />
                      </div>
                      <textarea
                        required
                        placeholder="Your Message"
                        rows={3}
                        className={styles.formTextarea}
                      />
                      <button
                        type="submit"
                        className={styles.btnSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"} <Icon name="arrowRight" size={14} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <a href="#top" className={styles.logo} aria-label="Xntrova Homepage">
                <Image
                  src="/assets/xntrova-logo-white@3x.png"
                  alt="Xntrova"
                  width={125}
                  height={43}
                  className={styles.logoFooterImg}
                />
              </a>
              <span className={styles.footerTagline}>Digital Marketing · Technology · Growth</span>
            </div>

            <nav className={styles.footerNav} aria-label="Footer Navigation">
              <a href="#top" className={styles.footerNavLink}>
                Home
              </a>
              <a href="#services" className={styles.footerNavLink}>
                Services
              </a>
              <a href="#about" className={styles.footerNavLink}>
                About
              </a>
              <a href="#portfolio" className={styles.footerNavLink}>
                Portfolio
              </a>
              <a href="#testimonials" className={styles.footerNavLink}>
                Testimonials
              </a>
              <a href="#contact" className={styles.footerNavLink}>
                Contact
              </a>
            </nav>

            <div className={styles.footerSocials} aria-label="Social media links">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <Icon name="linkedin" size={15} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <Icon name="instagram" size={15} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="X (Twitter)">
                <Icon name="twitter" size={15} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
                <Icon name="youtube" size={15} />
              </a>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>© 2024 Xntrova Technologies. All rights reserved.</span>
            <div className={styles.footerLegal}>
              <a href="#top">Privacy Policy</a>
              <a href="#top">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
