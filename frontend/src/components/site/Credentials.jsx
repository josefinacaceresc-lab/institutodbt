export default function Credentials() {
  return (
    <section className="credentials-strip" data-testid="credentials-strip" aria-label="Acreditaciones internacionales">
      <div className="container-x">
        <div className="credentials-inner">
          <div className="credentials-label">
            <span className="label label-center">Acreditaciones internacionales</span>
            <p>
              Los únicos respaldos oficiales en Chile para DBT y Schema Therapy.
            </p>
          </div>
          <div className="credentials-logos">
            <a
              href="https://www.wdbta.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="credentials-logo"
              data-testid="credentials-wdbta"
              aria-label="World Dialectical Behavior Therapy Association"
            >
              <img src="/logos/wdbta.png" alt="WDBTA" />
              <span>Miembro institucional WDBTA</span>
            </a>
            <div className="credentials-divider" aria-hidden="true" />
            <a
              href="https://schematherapysociety.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="credentials-logo"
              data-testid="credentials-isst"
              aria-label="International Society of Schema Therapy"
            >
              <img src="/logos/isst.jpg" alt="ISST" />
              <span>Certificación ISST</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
