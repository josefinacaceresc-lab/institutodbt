import { MapPin, ArrowUpRight } from "lucide-react";

export default function WDBTAConference() {
  return (
    <section
      className="wdbta-feature"
      id="wdbta-barcelona"
      data-testid="wdbta-conference-section"
      aria-label="Capítulo de Investigación WDBTA — Barcelona 2023"
    >
      <div className="wdbta-feature-inner">
        <div className="wdbta-feature-grid">
          {/* LEFT — Photo (hero figure, full color, gold passepartout) */}
          <figure
            className="wdbta-figure fade-up"
            data-testid="wdbta-conference-figure"
          >
            <span className="wdbta-figure-corner wdbta-figure-corner--tl" aria-hidden="true" />
            <span className="wdbta-figure-corner wdbta-figure-corner--tr" aria-hidden="true" />
            <span className="wdbta-figure-corner wdbta-figure-corner--bl" aria-hidden="true" />
            <span className="wdbta-figure-corner wdbta-figure-corner--br" aria-hidden="true" />

            <div className="wdbta-figure-frame">
              <img
                src="/media/wdbta-barcelona-2023.jpeg"
                alt="Capítulo de Investigación WDBTA en el Hospital de la Santa Creu i Sant Pau, Barcelona — Dra.(c) Josefina Cáceres Cortés junto a la élite investigadora mundial."
                loading="lazy"
                data-testid="wdbta-conference-photo"
              />
            </div>

            <figcaption className="wdbta-figure-caption">
              <span className="wdbta-caption-label">Archivo</span>
              <span className="wdbta-caption-rule" aria-hidden="true" />
              <span className="wdbta-caption-text">
                Hospital de la Santa Creu i Sant Pau · UAB, Barcelona ·
                Septiembre 2023
              </span>
            </figcaption>
          </figure>

          {/* RIGHT — Editorial text */}
          <div className="wdbta-copy">
            <span className="wdbta-copy-eyebrow">
              <span className="wdbta-copy-eyebrow-mark" aria-hidden="true" />
              Cumbre global · WDBTA 2023
            </span>

            <h2
              className="wdbta-copy-title dbt-serif"
              data-testid="wdbta-conference-title"
            >
              Capítulo de Investigación <em>WDBTA</em>
            </h2>

            <p className="wdbta-copy-body">
              La <strong>Dra.(c) Josefina Cáceres Cortés</strong> — única
              representante de Chile — junto a la élite investigadora mundial
              de WDBTA en el histórico recinto modernista del{" "}
              <strong>Hospital de la Santa Creu, Sant Pau</strong>.
              <span className="wdbta-copy-place"> Barcelona, España.</span>
            </p>

            <div className="wdbta-copy-meta">
              <div className="wdbta-meta-item">
                <dt>Sede</dt>
                <dd>UAB · Sant Pau</dd>
              </div>
              <span className="wdbta-meta-sep" aria-hidden="true" />
              <div className="wdbta-meta-item">
                <dt>Edición</dt>
                <dd>Septiembre 2023</dd>
              </div>
              <span className="wdbta-meta-sep" aria-hidden="true" />
              <div className="wdbta-meta-item">
                <dt>Representante Chile</dt>
                <dd>1 · JCC</dd>
              </div>
            </div>

            <a
              href="https://www.wdbta.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="wdbta-copy-link"
              data-testid="wdbta-conference-link"
            >
              <MapPin size={14} strokeWidth={1.8} />
              <span>Conocer la WDBTA</span>
              <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
