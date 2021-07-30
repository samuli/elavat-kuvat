export default async function Fetcher(url: string): Promise<Record<string, unknown>> {
  const res = await fetch(url);
  return res.json();
}
