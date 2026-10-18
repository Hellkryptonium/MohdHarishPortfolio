import { profiles } from '@/lib/portfolio';
import { getLiveStats } from '@/lib/live';

export default async function Profiles() {
  const liveStats = await getLiveStats();
  const liveProfiles = profiles.map((profile) => {
    if (profile.name === 'LeetCode') return { ...profile, detail: `593+ solved · Contest rating ${Math.round(liveStats.leetCodeRating ?? 1749).toLocaleString()}` };
    return profile;
  });

  return (
    <section id="profiles" className="border-t border-border py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.5fr]">
        <div>
          <p className="label">Proof of practice</p>
          <h2 className="section-heading">I keep learning in public.</h2>
          <p className="mt-4 max-w-sm leading-7 text-muted-foreground">Competitive programming, problem solving, and project work are part of the same engineering practice.</p>
        </div>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {liveProfiles.map((profile) => (
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
      <div className="mt-12 border-t border-border pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-sm font-semibold">Recent GitHub activity</h3>
          <a href="https://github.com/Hellkryptonium" target="_blank" rel="noreferrer" className="text-sm text-primary hover:text-foreground">@Hellkryptonium -&gt;</a>
        </div>
        {liveStats.githubActivity.length > 0 ? (
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {liveStats.githubActivity.map((activity, index) => <li key={`${activity}-${index}`} className="border-b border-border pb-3">{activity}</li>)}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Recent public activity will appear here when available.</p>
        )}
      </div>
    </section>
  );
}