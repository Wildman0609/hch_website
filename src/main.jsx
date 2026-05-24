import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X
} from "lucide-react";
import "./styles.css";

const services = [
  {
    icon: HeartPulse,
    title: "Person-centred care",
    text: "Daily support designed around individual routines, preferences, and wellbeing."
  },
  {
    icon: ShieldCheck,
    title: "Safe, reliable teams",
    text: "Clear standards, careful oversight, and dependable communication for families."
  },
  {
    icon: Users,
    title: "Community focus",
    text: "A warm home environment where people can stay connected and active."
  }
];

const highlights = [
  "Residential care",
  "Respite stays",
  "Family updates",
  "Activities programme"
];

function App() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HCH home">
          <span>HCH</span>
        </a>
        <button
          className="icon-button mobile-only"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#care" onClick={() => setMenuOpen(false)}>Care</a>
          <a href="#home" onClick={() => setMenuOpen(false)}>The Home</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <div className="photo-grid">
            <img
              src="https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=1200&q=80"
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="hero-content">
          <p className="eyebrow">A new home for HCH online</p>
          <h1>HCH</h1>
          <p className="intro">
            A calm, practical website foundation for presenting care services, the home,
            visiting information, and family contact routes.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#contact">
              Contact HCH <ArrowRight size={18} />
            </a>
            <a className="secondary-action" href="#care">View care options</a>
          </div>
        </div>
      </section>

      <section className="band" id="care">
        <div className="section-heading">
          <p className="eyebrow">Care</p>
          <h2>Built for clear information and quick next steps.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="split-section" id="home">
        <div>
          <p className="eyebrow">The Home</p>
          <h2>A simple structure ready for real HCH content.</h2>
          <p>
            This first version gives the project a clean visual direction and the core
            sections a care home website needs. The copy, photography, forms, and domain
            can be replaced as the project takes shape.
          </p>
        </div>
        <div className="check-list" aria-label="Website content areas">
          {highlights.map((item) => (
            <div className="check-row" key={item}>
              <CheckCircle2 size={20} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Ready for enquiries, visits, and referrals.</h2>
        </div>
        <div className="contact-actions">
          <a href="tel:+440000000000">
            <Phone size={18} aria-hidden="true" />
            Call
          </a>
          <a href="mailto:hello@example.com">
            <CalendarCheck size={18} aria-hidden="true" />
            Arrange a visit
          </a>
          <a href="#top">
            <MapPin size={18} aria-hidden="true" />
            Location
          </a>
        </div>
      </section>

      <footer>
        <span>HCH</span>
        <span>Temporary launch site</span>
        <Sparkles size={16} aria-hidden="true" />
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
