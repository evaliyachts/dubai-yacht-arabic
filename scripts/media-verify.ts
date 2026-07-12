import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { yachts } from "../src/data/yachts";
import { isNeutralYachtMedia } from "../src/data/yacht-media";

const webpDimensions = (buffer: Buffer): [number, number] => {
  const chunk = buffer.subarray(12, 16).toString();
  if (chunk === "VP8X") return [1 + buffer.readUIntLE(24, 3), 1 + buffer.readUIntLE(27, 3)];
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
  }
  if (chunk === "VP8 ") {
    for (let offset = 20; offset < buffer.length - 10; offset += 1) {
      if (buffer[offset] === 0x9d && buffer[offset + 1] === 0x01 && buffer[offset + 2] === 0x2a) {
        return [buffer.readUInt16LE(offset + 3) & 0x3fff, buffer.readUInt16LE(offset + 5) & 0x3fff];
      }
    }
  }
  throw new Error(`Unsupported WebP header: ${chunk}`);
};

const remoteMedia = yachts.flatMap((yacht) =>
  yacht.media.filter((media) => !isNeutralYachtMedia(media)).map((media) => ({ yacht, media })),
);
const failures: string[] = [];
let cursor = 0;

const fetchWithRetry = async (url: string) => {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await fetch(url);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

async function verifyWorker() {
  while (cursor < remoteMedia.length) {
    const { yacht, media } = remoteMedia[cursor++];
    let url: URL;
    try {
      url = new URL(media.path);
    } catch {
      failures.push(`${yacht.id}: media URL is not absolute (${media.path})`);
      continue;
    }
    if (url.protocol !== "https:" || url.hostname !== "yacht.fra1.cdn.digitaloceanspaces.com") {
      failures.push(`${yacht.id}: media URL has an unapproved authority (${media.path})`);
      continue;
    }
    if (media.path.startsWith("hhttps://")) {
      failures.push(`${yacht.id}: media URL retains the corrected hhttps typo (${media.path})`);
      continue;
    }

    try {
      const response = await fetchWithRetry(media.path);
      if (!response.ok) {
        failures.push(`${yacht.id}: ${response.status} for ${media.path}`);
        continue;
      }
      if (!response.headers.get("content-type")?.startsWith("image/webp")) {
        failures.push(`${yacht.id}: unexpected content type for ${media.path}`);
        continue;
      }
      const dimensions = webpDimensions(Buffer.from(await response.arrayBuffer()));
      if (dimensions[0] !== media.width || dimensions[1] !== media.height) {
        failures.push(
          `${yacht.id}: dimension mismatch for ${media.path} (${dimensions.join("x")} != ${media.width}x${media.height})`,
        );
      }
    } catch (error) {
      failures.push(`${yacht.id}: request failed for ${media.path} (${error instanceof Error ? error.message : String(error)})`);
    }
  }
}

for (const yacht of yachts) {
  if (new Set(yacht.media.map((media) => media.path)).size !== yacht.media.length) {
    failures.push(`${yacht.id}: gallery contains duplicate URLs`);
  }
  if (isNeutralYachtMedia(yacht.media[0])) {
    const localPath = resolve("public", yacht.media[0].path.replace(/^\//, ""));
    if (!existsSync(localPath)) failures.push(`${yacht.id}: neutral fallback is missing`);
  }
}

await Promise.all(Array.from({ length: 6 }, verifyWorker));

if (failures.length > 0) {
  console.error(`Media verification failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Media verification passed (${remoteMedia.length} reachable production images, 1 local fallback)`,
);
