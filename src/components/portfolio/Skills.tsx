import { skillGroups } from '@/lib/portfolio';

export default function Skills() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr]">
        <div>
          <p className="label">Engineering toolkit</p>
          <h2 className="section-heading">A practical stack for real systems.</h2>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-semibold">{group}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{skills.join(' / ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}