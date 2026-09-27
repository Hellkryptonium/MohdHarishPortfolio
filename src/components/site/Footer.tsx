import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>Mohd Harish. Software engineer and computer science student.</p>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-foreground">About</Link>
          <a href="mailto:harishjs1006@gmail.com" className="hover:text-foreground">Email</a>
          <a href="https://www.linkedin.com/in/mohd-harish-126a58256/" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}