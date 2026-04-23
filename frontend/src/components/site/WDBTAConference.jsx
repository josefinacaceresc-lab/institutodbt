import { MapPin } from "lucide-react";

export default function WDBTAConference() {
  return (
    <section
      className="wdbta-dispatch"
      id="wdbta-barcelona"
      data-testid="wdbta-conference-section"
      aria-label="Capítulo de Investigación WDBTA — Barcelona 2023"
    >
      {/* Translucent background photo */}
      <div
        className="wdbta-dispatch-bg"
        data-testid="wdbta-conference-bg"
        aria-hidden="true"
      >
        <img
          src="/media/wdbta-barcelona-2023.jpeg"
          alt=""
          loading="lazy"
          draggable="false"
        />
      </div>
      {/* Navy overlay to mute the photo */}
      <div className="wdbta-dispatch-overlay" aria-hidden="true" />

      {/* Editorial vertical hairline ("wire") — surprise element */}
      <div className="wdbta-dispatch-wire" aria-hidden="true">
        <span className="wdbta-dispatch-wire-tick" />
        <span className="wdbta-dispatch-wire-tick wdbta-dispatch-wire-tick--mid" />
        <span className="wdbta-dispatch-wire-tick" />
      </div>

      {/* Content */}
      <div className="wdbta-dispatch-inner">
        {/* LEFT — Dispatch frame meta (only desktop) */}
        <div className="wdbta-dispatch-meta">
          <span className="wdbta-dispatch-frame-label">
            Dispatch · 2023
          </span>
          <div className="wdbta-dispatch-frame-divider" aria-hidden="true" />
          <span className="wdbta-dispatch-frame-tag">
            Capítulo de investigación
          </span>
        </div>

        {/* CENTER — Museum plaque card */}
        <article
          className="wdbta-dispatch-card fade-up"
          data-testid="wdbta-conference-card"
        >
          <span className="wdbta-dispatch-corner wdbta-dispatch-corner--tl" aria-hidden="true" />
          <span className="wdbta-dispatch-corner wdbta-dispatch-corner--tr" aria-hidden="true" />
          <span className="wdbta-dispatch-corner wdbta-dispatch-corner--bl" aria-hidden="true" />
          <span className="wdbta-dispatch-corner wdbta-dispatch-corner--br" aria-hidden="true" />

          <div className="wdbta-dispatch-surtitle">
            <span className="wdbta-dispatch-dot" aria-hidden="true" />
            Cumbre global · Septiembre 2023
          </div>

          <h2
            className="wdbta-dispatch-title dbt-serif"
            data-testid="wdbta-conference-title"
          >
            Capítulo de Investigación <em>WDBTA</em>
          </h2>

          <p className="wdbta-dispatch-body">
            La <strong>Dra. Josefina Cáceres Cortés</strong> — única
            representante de Chile — junto a la élite investigadora mundial
            en el histórico recinto modernista del Hospital de la Santa Creu
            i Sant Pau.
          </p>

          <div className="wdbta-dispatch-factline">
            <div>
              <dt>Sede</dt>
              <dd>UAB · Sant Pau</dd>
            </div>
            <span className="wdbta-dispatch-factline-sep" aria-hidden="true" />
            <div>
              <dt>País</dt>
              <dd>España</dd>
            </div>
            <span className="wdbta-dispatch-factline-sep" aria-hidden="true" />
            <div>
              <dt>Representante Chile</dt>
              <dd>1 · JCC</dd>
            </div>
          </div>

          <div
            className="wdbta-dispatch-location"
            data-testid="wdbta-conference-location"
          >
            <MapPin size={14} strokeWidth={1.8} />
            <span>Barcelona, España</span>
          </div>
        </article>
      </div>

      {/* Bottom hairline caption — full-width attribution */}
      <div className="wdbta-dispatch-footline">
        <span>— Photographed at the UAB gate · Hospital de la Santa Creu i Sant Pau</span>
      </div>
    </section>
  );
}
