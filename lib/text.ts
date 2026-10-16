/** Small text helpers shared by several components. */

/** Split text on blank lines into paragraphs. */
export function toParagraphs(text?: string): string[] {
  return String(text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Make an image path work from any page.
 * "images/x.jpg" and "/images/x.jpg" both become "/images/x.jpg".
 */
export function imageSrc(path?: string): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  return "/" + path.replace(/^\/+/, "");
}
