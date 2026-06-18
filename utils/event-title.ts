export function splitEventTitle(title: string): string[] | null {
  if (title.includes(" ")) return null;

  const mid = Math.ceil(title.length / 2);
  return [title.slice(0, mid), title.slice(mid)];
}
