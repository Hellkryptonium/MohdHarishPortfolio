type GitHubEvent = {
  type?: string;
  repo?: { name?: string };
  created_at?: string;
};

export type LiveStats = {
  leetCodeRating?: number;
  githubActivity: string[];
};

const fallbackStats: LiveStats = {
  leetCodeRating: 1749,
  githubActivity: [],
};

async function fetchLeetCodeRating() {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'mohd-harish-portfolio' },
      body: JSON.stringify({
        query: 'query userContestRanking($username: String!) { userContestRanking(username: $username) { rating } }',
        variables: { username: 'hell_233' },
      }),
    });
    if (!response.ok) return undefined;
    const data = await response.json() as { data?: { userContestRanking?: { rating?: number } } };
    return data.data?.userContestRanking?.rating;
  } catch {
    return undefined;
  }
}

async function fetchGitHubActivity() {
  try {
    const response = await fetch('https://api.github.com/users/Hellkryptonium/events/public?per_page=6', {
      next: { revalidate: 900 },
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'mohd-harish-portfolio' },
    });
    if (!response.ok) return [];
    const events = await response.json() as GitHubEvent[];
    return events
      .filter((event) => event.repo?.name && event.created_at)
      .slice(0, 4)
      .map((event) => `${formatEventType(event.type)} in ${event.repo?.name}`);
  } catch {
    return [];
  }
}

function formatEventType(type = 'Activity') {
  return type.replace('Event', '').replace(/([a-z])([A-Z])/g, '$1 $2');
}

export async function getLiveStats(): Promise<LiveStats> {
  const [leetCodeRating, githubActivity] = await Promise.all([
    fetchLeetCodeRating(),
    fetchGitHubActivity(),
  ]);

  return {
    leetCodeRating: leetCodeRating ?? fallbackStats.leetCodeRating,
    githubActivity: githubActivity.length > 0 ? githubActivity : fallbackStats.githubActivity,
  };
}