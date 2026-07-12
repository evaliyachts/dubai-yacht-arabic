import type { YachtRecord } from "./yachts";

const YACHT_KEYS = new Set(["id", "slug", "name", "lengthFt", "guestCapacity", "yearBuilt", "pricePerHour", "minimumDuration", "numberOfBedrooms", "availability", "featured", "priority", "media"]);
const MEDIA_KEYS = new Set(["type", "path", "altAr", "width", "height", "rightsRecordId", "featured", "priority"]);
const AVAILABILITY = new Set(["available", "unavailable", "on-request"]);
const PROHIBITED_PUBLIC_TEXT = /evali|evaliyacht|إڤالي|إيفالي|ايفالي/i;

const objectValue = (value: unknown, label: string): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
};
const stringValue = (value: unknown, label: string) => {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} must be a non-empty string`);
  return value;
};
const positive = (value: unknown, label: string) => {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) throw new Error(`${label} must be positive`);
};
const optionalBoolean = (value: unknown, label: string) => {
  if (value !== undefined && typeof value !== "boolean") throw new Error(`${label} must be boolean`);
};
const optionalPriority = (value: unknown, label: string) => {
  if (value !== undefined && (!Number.isInteger(value) || (value as number) < 0)) throw new Error(`${label} must be a non-negative integer`);
};

export const validateYachtRecords = (input: unknown): YachtRecord[] => {
  if (!Array.isArray(input)) throw new Error("Yacht catalogue must be an array");
  const ids = new Set<string>();
  const slugs = new Set<string>();

  return input.map((value, yachtIndex) => {
    const label = `yacht[${yachtIndex}]`;
    const record = objectValue(value, label);
    const unknown = Object.keys(record).filter((key) => !YACHT_KEYS.has(key));
    if (unknown.length) throw new Error(`${label} contains unknown fields: ${unknown.join(", ")}`);

    const id = stringValue(record.id, `${label}.id`);
    const slug = stringValue(record.slug, `${label}.slug`);
    const name = stringValue(record.name, `${label}.name`);
    if (ids.has(id)) throw new Error(`Duplicate yacht id: ${id}`);
    if (slugs.has(slug)) throw new Error(`Duplicate yacht slug: ${slug}`);
    ids.add(id);
    slugs.add(slug);
    if (slug.includes("/") || slug !== slug.trim()) throw new Error(`${label}.slug is invalid`);
    if (PROHIBITED_PUBLIC_TEXT.test(`${name} ${slug}`)) throw new Error(`${label} exposes prohibited branding`);
    if (name.includes("استأجار") || name.startsWith("أجار يخت") || slug.startsWith("يجار-")) {
      throw new Error(`${label} contains malformed Arabic public wording`);
    }

    for (const key of ["lengthFt", "guestCapacity", "yearBuilt", "pricePerHour", "minimumDuration"] as const) positive(record[key], `${label}.${key}`);
    if (record.numberOfBedrooms !== undefined) positive(record.numberOfBedrooms, `${label}.numberOfBedrooms`);
    if (record.availability !== undefined && !AVAILABILITY.has(record.availability as string)) throw new Error(`${label}.availability is invalid`);
    optionalBoolean(record.featured, `${label}.featured`);
    optionalPriority(record.priority, `${label}.priority`);

    if (!Array.isArray(record.media) || record.media.length === 0) throw new Error(`${label}.media must not be empty`);
    record.media.forEach((mediaValue, mediaIndex) => {
      const mediaLabel = `${label}.media[${mediaIndex}]`;
      const media = objectValue(mediaValue, mediaLabel);
      const unknownMedia = Object.keys(media).filter((key) => !MEDIA_KEYS.has(key));
      if (unknownMedia.length) throw new Error(`${mediaLabel} contains unknown fields: ${unknownMedia.join(", ")}`);
      if (media.type !== "image") throw new Error(`${mediaLabel}.type must be image`);
      const path = stringValue(media.path, `${mediaLabel}.path`);
      const altAr = stringValue(media.altAr, `${mediaLabel}.altAr`);
      positive(media.width, `${mediaLabel}.width`);
      positive(media.height, `${mediaLabel}.height`);
      stringValue(media.rightsRecordId, `${mediaLabel}.rightsRecordId`);
      optionalBoolean(media.featured, `${mediaLabel}.featured`);
      optionalPriority(media.priority, `${mediaLabel}.priority`);
      if (PROHIBITED_PUBLIC_TEXT.test(`${path} ${altAr}`)) throw new Error(`${mediaLabel} exposes prohibited branding`);
    });
    return record as unknown as YachtRecord;
  });
};
