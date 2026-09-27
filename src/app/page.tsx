import Link from 'next/link';
import ProjectCard from '@/components/portfolio/ProjectCard';
import Experience from '@/components/portfolio/Experience';
import Skills from '@/components/portfolio/Skills';
import Profiles from '@/components/portfolio/Profiles';
import { achievements, otherProjects, projects } from '@/lib/portfolio';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8">
      <section className="grid min-h-[calc(100vh-5rem)] content-center gap-10 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div><p className="label mb-7">Mohd Harish / Software Engineer</p><h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">I build software systems across backend engineering, cloud infrastructure, AI, and cybersecurity.</h1><p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">Computer Science student focused on understanding systems deeply and shipping useful, maintainable software.</p><div className="mt-9 flex flex-wrap gap-5 text-sm font-semibold"><Link href="/work" className="bg-foreground px-5 py-3 text-background transition-colors hover:bg-primary">View my work <span aria-hidden="true">-&gt;</span></Link><a href="https://github.com/Hellkryptonium" target="_blank" rel="noreferrer" className="border border-border px-5 py-3 hover:border-foreground">GitHub <span aria-hidden="true">-&gt;</span></a></div></div>
        <div className="self-end border-l-2 border-primary pl-5 lg:mb-12"><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Current status</p><p className="mt-3 max-w-xs text-base leading-7">Currently building Togetherly and mentoring 100+ students in web development.</p></div>
      </section>
      <section id="work" className="border-t border-border py-20 sm:py-28"><div className="mb-12 flex items-end justify-between gap-5"><div><p className="label">Selected work</p><h2 className="section-heading">Systems I have built.</h2></div><Link href="/work" className="hidden text-sm font-semibold text-primary hover:text-foreground sm:block">View all work -&gt;</Link></div><ProjectCard project={projects[0]} featured /><div className="mt-16 grid gap-12 md:grid-cols-2"><ProjectCard project={projects[1]} /><ProjectCard project={projects[2]} /></div></section>
      <Experience /><Skills /><Profiles />
      <section className="border-t border-border py-20 sm:py-28"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr]"><div><p className="label">Achievements</p><h2 className="section-heading">Proof of consistent practice.</h2></div><ul className="grid gap-4 sm:grid-cols-2">{achievements.map((achievement) => <li key={achievement} className="border-b border-border pb-4 text-lg">{achievement}</li>)}</ul></div></section>
      <section className="border-t border-border py-20 sm:py-28"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="label">Writing</p><h2 className="section-heading">Notes from the work.</h2><p className="mt-4 max-w-lg leading-7 text-muted-foreground">An engineering notebook covering backend systems, cybersecurity, AI, and lessons learned while building.</p></div><Link href="/writing" className="text-sm font-semibold text-primary hover:text-foreground">Read the writing -&gt;</Link></div></section>
      <section className="border-t border-border py-20 sm:py-28"><p className="label">Other things I&apos;ve built</p><div className="mt-8">{otherProjects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></section>
      <section className="border-t-2 border-foreground py-20 sm:py-28"><p className="label">Get in touch</p><h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Let&apos;s build something thoughtful.</h2><a href="mailto:harishjs1006@gmail.com" className="mt-8 inline-block text-primary hover:text-foreground">harishjs1006@gmail.com -&gt;</a></section>
    </div>
  );
}
