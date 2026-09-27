import ProjectCard from '@/components/portfolio/ProjectCard';
import { otherProjects, projects } from '@/lib/portfolio';

export const metadata = { title: 'Work - Mohd Harish' };

export default function WorkPage() {
  return <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 sm:py-28"><p className="label">Selected work</p><h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Software built around real problems.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">A selection of systems spanning cybersecurity, university networking, payments, and digital wallets.</p><div className="mt-20 space-y-20"><ProjectCard project={projects[0]} featured /><div className="grid gap-16 md:grid-cols-2"><ProjectCard project={projects[1]} /><ProjectCard project={projects[2]} /></div></div><div className="mt-28 border-t border-border pt-12"><p className="label">Other things I&apos;ve built</p><div className="mt-8">{otherProjects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></div></div>;
}