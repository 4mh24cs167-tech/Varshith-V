import { GITHUB_ORG_URL, LINKEDIN_URL, EMAIL, PORTFOLIO_YEAR } from "../../data/site";

export function Footer({ inert }: { inert?: boolean }) {
  return (
    <footer className="site-footer" inert={inert}>
      <div className="container">
        <div className="footer-inner">
          <p className="footer-tagline">VARSHITH V</p>
          <nav className="footer-links" aria-label="Footer">
            <a className="footer-link" href={`mailto:${EMAIL}`}>Email</a>
            <a className="footer-link" href={GITHUB_ORG_URL} target="_blank" rel="noreferrer">GitHub</a>
            <a className="footer-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
          <p className="footer-copy">Built for impact. © {PORTFOLIO_YEAR}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;