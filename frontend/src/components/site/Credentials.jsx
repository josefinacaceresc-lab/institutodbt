export default function Credentials() {
  return (
    <section
      className="cred-hero"
      id="acreditaciones"
      data-testid="credentials-hero-section"
      aria-label="Acreditaciones internacionales"
    >
      <div className="cred-hero-inner">
        <div className="cred-hero-grid">
          {/* LEFT — Editorial copy */}
          <div className="cred-hero-copy">
            <span className="cred-eyebrow">
              <span className="cred-eyebrow-line" aria-hidden="true" />
              Acreditaciones globales
            </span>
            <h2 className="cred-headline dbt-serif">
              La máxima distinción <em>clínica</em> en Chile.
            </h2>
            <p className="cred-sub">
              Somos la única institución del país acreditada como{" "}
              <strong>miembro institucional de la WDBTA</strong> y{" "}
              <strong>certificada por la ISST</strong>. Dos sellos
              internacionales que garantizan un estándar científico y ético
              sin precedentes en salud mental.
            </p>

            <div className="cred-rule" aria-hidden="true">
              <span />
              <span className="cred-rule-center" />
              <span />
            </div>

            <dl className="cred-factgrid">
              <div>
                <dt>País</dt>
                <dd>Único en Chile</dd>
              </div>
              <div>
                <dt>Acreditaciones</dt>
                <dd>WDBTA · ISST</dd>
              </div>
              <div>
                <dt>Dirección</dt>
                <dd>Ph.D. clínica</dd>
              </div>
            </dl>
          </div>

          {/* RIGHT — Asymmetric plaques */}
          <div className="cred-plaques" aria-label="Logos de acreditación">
            <a
              href="https://www.wdbta.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="cred-plaque cred-plaque--wdbta"
              data-testid="plaque-wdbta-logo"
              aria-label="World Dialectical Behavior Therapy Association — WDBTA"
            >
              <span className="cred-plaque-corner cred-plaque-corner--tl" aria-hidden="true" />
              <span className="cred-plaque-corner cred-plaque-corner--tr" aria-hidden="true" />
              <span className="cred-plaque-corner cred-plaque-corner--bl" aria-hidden="true" />
              <span className="cred-plaque-corner cred-plaque-corner--br" aria-hidden="true" />

              <div className="cred-plaque-frame">
                <img
                  src="/logos/wdbta.png"
                  alt="WDBTA — World Dialectical Behavior Therapy Association"
                  className="cred-plaque-img"
                />
              </div>
              <div className="cred-plaque-caption">
                <div className="cred-plaque-org dbt-serif">WDBTA</div>
                <div className="cred-plaque-subtitle">
                  World Dialectical Behavior Therapy Association
                </div>
                <div className="cred-plaque-role">Miembro institucional</div>
              </div>
            </a>

            <a
              href="https://schematherapysociety.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="cred-plaque cred-plaque--isst"
              data-testid="plaque-isst-logo"
              aria-label="International Society of Schema Therapy — ISST"
            >
              <span className="cred-plaque-corner cred-plaque-corner--tl" aria-hidden="true" />
              <span className="cred-plaque-corner cred-plaque-corner--tr" aria-hidden="true" />
              <span className="cred-plaque-corner cred-plaque-corner--bl" aria-hidden="true" />
              <span className="cred-plaque-corner cred-plaque-corner--br" aria-hidden="true" />

              <div className="cred-plaque-frame">
                <img
                  src="/logos/isst.jpg"
                  alt="ISST — International Society of Schema Therapy"
                  className="cred-plaque-img"
                />
              </div>
              <div className="cred-plaque-caption">
                <div className="cred-plaque-org dbt-serif">ISST</div>
                <div className="cred-plaque-subtitle">
                  International Society of Schema Therapy
                </div>
                <div className="cred-plaque-role">Certificación</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
