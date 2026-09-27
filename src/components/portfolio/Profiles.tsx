import { profiles } from '@/lib/portfolio';

export default function Profiles() {
  return (
    <section id="profiles" className="border-t border-border py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr]">
        <div>
          <p className="label">Proof of practice</p>
          <h2 className="section-heading">I keep learning in public.</h2>
          <p className="mt-4 max-w-sm leading-7 text-muted-foreground">Competitive programming, problem solving, and project work are part of the same engineering practice.</p>
        </div>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {profiles.map((profile) => (
            <a key={profile.name} href={profile.href} target="_blank" rel="noreferrer" className="group border-b border-border pb-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold group-hover:text-primary">{profile.name}</h3>
                <span className="text-primary" aria-hidden="true">-&gt;</span>
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground">@{profile.handle}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{profile.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}