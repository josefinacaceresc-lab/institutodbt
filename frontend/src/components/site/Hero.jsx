import { ArrowRight } from "lucide-react";
import { HERO_STATS } from "@/data/site";

export default function Hero() {
  return (
    <section className="hero" id="inicio" data-testid="hero-section">
      <div className="hero-inner">
        <div className="hero-eyebrow" data-testid="hero-eyebrow">
          Único Miembro Institucional WDBTA en Chile
        </div>

        <h1 className="dbt-serif">
          Donde la ciencia encuentra a las <em>personas</em>
        </h1>

        <p className="hero-sub">
          Dirigido por la{" "}
          <strong>Dra.(c) Josefina Cáceres Cortés, Ph.D.(c)</strong> — el centro
          de salud mental más avanzado de Chile. Combinamos el tratamiento
          DBT de mayor evidencia científica con Schema Therapy y tecnología
          clínica propia, bajo el único sello institucional{" "}
          <strong>WDBTA</strong> del país.
        </p>

        <a
          href="#contacto"
          className="hero-cta"
          data-testid="hero-cta-solicitar-hora"
        >
          Solicitar hora
          <ArrowRight size={16} strokeWidth={2} />
        </a>

        <div className="hero-stats" data-testid="hero-stats">
          {HERO_STATS.map((s) => (
            <div key={s.label} data-testid={`hero-stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="hero-stat-num dbt-serif">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
