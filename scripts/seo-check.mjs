import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const indexPath = resolve("index.html");
const html = readFileSync(indexPath, "utf8");
const failures = [];

const requireMatch = (label, pattern) => {
  if (!pattern.test(html)) failures.push(label);
};

requireMatch("Arabic language and RTL document direction", /<html\s+[^>]*lang=["']ar-AE["'][^>]*dir=["']rtl["']/i);
requireMatch("non-empty title", /<title>\s*[^<]+\s*<\/title>/i);
requireMatch("meta description", /<meta\s+name=["']description["']\s+content=["'][^"']+["']/i);
requireMatch("homepage canonical", /<link\s+rel=["']canonical["']\s+href=["']https:\/\/yacht-dxb\.com\/["']/i);
requireMatch("index/follow robots", /<meta\s+name=["']robots["']\s+content=["']index,\s*follow["']/i);
requireMatch("visible H1", /<h1(?:\s[^>]*)?>[\s\S]*?[^\s<][\s\S]*?<\/h1>/i);

const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
if (jsonLdBlocks.length === 0) {
  failures.push("JSON-LD");
} else {
  for (const [, source] of jsonLdBlocks) {
    try {
      JSON.parse(source);
    } catch {
      failures.push("valid JSON-LD");
      break;
    }
  }
}

if (!/<body[^>]*>[\s\S]*?<main(?:\s[^>]*)?>[\s\S]*?[^\s<][\s\S]*?<\/main>/i.test(html)) {
  failures.push("visible main content");
}

if (failures.length > 0) {
  console.error(`SEO baseline failed: ${failures.join(", ")}`);
  process.exit(1);
}

console.log("SEO baseline passed for index.html");
