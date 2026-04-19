import { NAV_ITEMS, SITE, whatsappUrl } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="footer-root" data-testid="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-brand-mark">D</span>
            <div>
              <div className="footer-brand-name dbt-serif">{SITE.brandName}</div>
              <div className="footer-brand-sub">
                Único miembro institucional WDBTA en Chile · {SITE.brandSub}
              </div>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`footer-link-${n.label.toLowerCase()}`}
              >
                {n.label}
              </a>
            ))}
            <a href="#contacto" data-testid="footer-link-contacto">
              Contacto
            </a>
          </nav>

          <div className="footer-copy">
            © {year} {SITE.brandName} · Josefina Cáceres Cortés, Ph.D. · Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="whatsapp-float"
        data-testid="whatsapp-float-btn"
      >
        <i className="fa-brands fa-whatsapp" />
      </a>
    </>
  );
}
