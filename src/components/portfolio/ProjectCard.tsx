import type { Project } from '@/lib/portfolio';
import Image from 'next/image';

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm font-medium">
      {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="text-primary hover:text-foreground">Live site <span aria-hidden="true">-&gt;</span></a>}
      {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-primary hover:text-foreground">GitHub <span aria-hidden="true">-&gt;</span></a>}
      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="text-primary hover:text-foreground">Demo <span aria-hidden="true">-&gt;</span></a>}
    </div>
  );
}

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={featured ? 'border-t-2 border-foreground pt-6' : 'border-t border-border pt-5'}>
      {featured && (
        <div className="relative mb-6 flex min-h-48 items-end justify-between overflow-hidden bg-[#e7edf7] p-6 sm:min-h-64">
          {project.image && (
            <Image
              src={project.image}
              alt={`${project.name} project interface preview`}
              fill
              sizes="(max-width: 640px) 100vw, 896px"
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="relative z-10 font-mono text-xs uppercase tracking-[0.18em] text-white">Threat intelligence / event processing</span>
          <span className="relative z-10 hidden font-mono text-xs text-white/80 sm:block">01</span>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">{project.name}</p>
            <h3 className={featured ? 'max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl' : 'text-xl font-semibold tracking-tight'}>{project.title}</h3>
          </div>
        </div>
        <p className="max-w-2xl leading-7 text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {project.highlights.map((highlight) => <li key={highlight} className="before:mr-2 before:text-primary before:content-['+']">{highlight}</li>)}
        </ul>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}