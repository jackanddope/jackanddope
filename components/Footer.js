export default function Footer() {
  return (
    <footer className="footer-glass relative text-center py-10 mt-20">
      <div className="footer-divider" />
      <p className="footer-text mt-6">
        © {new Date().getFullYear()} Neon Console. All Rights Reserved.
      </p>
      <div className="footer-lights mt-4">
        <span className="light-dot cyan"></span>
        <span className="light-dot magenta"></span>
        <span className="light-dot yellow"></span>
      </div>
    </footer>
  );
}
