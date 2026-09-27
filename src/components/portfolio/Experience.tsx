import { experience } from '@/lib/portfolio';

export default function Experience() {
  return (
    <section id="experience" className="border-t border-border py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr]">
        <div>
          <p className="label">Experience</p>
          <h2 className="section-heading">Building with and for people.</h2>
        </div>
        <div className="divide-y divide-border">
          {experience.map((item) => (
            <article key={`${item.role}-${item.company}`} className="grid gap-3 py-7 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-8">
              <div>
                <h3 className="text-lg font-semibold">{item.role}</h3>
                <p className="mt-1 text-muted-foreground">{item.company}</p>
                {'link' in item && item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-primary hover:text-foreground">Read the SIH post -&gt;</a>}
                {item.details.length > 0 && <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}
              </div>
              <p className="font-mono text-xs text-muted-foreground sm:pt-1">{item.period}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}