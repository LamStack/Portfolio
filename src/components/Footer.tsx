import { socials } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-dim">
        <p>© {new Date().getFullYear()} Lamees Adel. Built with Next.js & a lot of coffee.</p>
        <div className="flex items-center gap-4">
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan transition">
            GitHub
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan transition">
            LinkedIn
          </a>
          <a href={`mailto:${socials.email}`} className="hover:text-cyan transition">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
