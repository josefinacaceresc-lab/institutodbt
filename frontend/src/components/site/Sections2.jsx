import { Cpu, ArrowUpRight } from "lucide-react";
import { PUBLICATIONS, TEAM, TESTIMONIALS, SITE } from "@/data/site";

export function ResearchSection() {
  return (
    <section className="section-pad sec-navy" id="ciencia">
      <div className="container-x" style={{ textAlign: "center" }}>
        <span className="label label-center">Investigación aplicada</span>
        <h2
          className="dbt-serif"
          style={{ color: "#fff", marginTop: "0.8rem", marginBottom: "1rem" }}
        >
          Capítulo de Investigación WDBTA
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 580,
            margin: "0 auto 3rem",
            fontSize: 15,
          }}
        >
          El Instituto DBT Chile es miembro activo del capítulo de investigación
          de la WDBTA, participando en estudios sobre eficacia de DBT en
          población latinoamericana.
        </p>

        <a
          href={SITE.researchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="research-card fade-up"
          data-testid="research-card-lakaira"
        >
          <div className="research-header">
            <span className="research-icon">
              <Cpu size={28} strokeWidth={1.5} />
            </span>
            <div style={{ textAlign: "left" }}>
              <span className="label" style={{ marginBottom: "0.3rem" }}>
                NexariaLabs · IA Clínica
              </span>
              <h3
                className="dbt-serif"
                style={{ color: "#fff", fontSize: "1.6rem", marginTop: "0.4rem" }}
              >
                LaKaira AI
              </h3>
            </div>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              textAlign: "left",
              fontSize: 14,
              marginBottom: "1.5rem",
              lineHeight: 1.8,
            }}
          >
            Sistema de inteligencia artificial para manejo de desregulación
            emocional. Basado en los principios de DBT, Principio de Energía
            Libre (Friston) y teoría de la información. Primer proyecto de IA
            clínica DBT en América Latina.
          </p>
          <div
            className="research-tag-row"
            style={{ justifyContent: "flex-start" }}
          >
            <span className="research-tag">Free Energy Principle</span>
            <span className="research-tag">DBT Framework</span>
            <span
              className="research-tag"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Ver proyecto
              <ArrowUpRight size={12} strokeWidth={2} />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}

export function PublicationsSection() {
  return (
    <section className="section-pad" id="publicaciones">
      <div className="container-x">
        <span className="label">Producción científica</span>
        <h2 className="dbt-serif" style={{ marginTop: "0.8rem" }}>
          Publicaciones — Cáceres Cortés, J.
        </h2>
        <div className="publications-list" data-testid="publications-list">
          {PUBLICATIONS.map((p) => (
            <div
              key={p.title}
              className="pub-item fade-up"
              data-testid={`pub-${p.year}`}
            >
              <div className="pub-year dbt-serif">{p.year}</div>
              <div>
                <div className="pub-title">{p.title}</div>
                <div className="pub-journal">{p.journal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="section-pad sec-cream" id="equipo">
      <div className="container-x">
        <div className="heading-center">
          <span className="label label-center">Quiénes somos</span>
          <h2 className="dbt-serif" style={{ marginTop: "1rem" }}>
            Equipo clínico
          </h2>
        </div>
        <div className="team-grid" data-testid="team-grid">
          {TEAM.map(([initials, name, role, bio]) => (
            <div
              key={name}
              className="team-card fade-up"
              data-testid={`team-${initials.toLowerCase()}`}
            >
              <div className="team-initials dbt-serif">{initials}</div>
              <h3>{name}</h3>
              <div className="team-role">{role}</div>
              <p>{bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-pad" id="testimonios">
      <div className="container-x">
        <div className="heading-center">
          <span className="label label-center">Experiencias</span>
          <h2 className="dbt-serif" style={{ marginTop: "1rem" }}>
            Qué dicen nuestros pacientes
          </h2>
        </div>
        <div className="testimonials-grid" data-testid="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card fade-up"
              data-testid={`testimonial-${i}`}
            >
              <div className="testimonial-text">{t.text}</div>
              <div className="testimonial-author">{t.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
