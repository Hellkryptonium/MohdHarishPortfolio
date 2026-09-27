export const metadata = { title: 'Resume - Mohd Harish' };

export default function ResumePage() {
  return <div className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8 sm:py-28"><p className="label">Resume</p><h1 className="mt-5 text-5xl font-semibold tracking-tight">Mohd Harish</h1><p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">The current resume PDF is available here. The portfolio does not duplicate its contents so the document remains the source of truth.</p><a href="/assets/MohdHarish_Resume.pdf" target="_blank" rel="noreferrer" className="mt-8 inline-block bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-primary">Open resume -&gt;</a></div>;
}