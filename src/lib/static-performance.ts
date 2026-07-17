const GENERATED_STYLESHEET_PATTERN = /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/u;

export const getGeneratedStylesheetPath = (html: string): string => {
  const stylesheetPath = GENERATED_STYLESHEET_PATTERN.exec(html)?.[1];
  if (!stylesheetPath) throw new Error("Generated stylesheet link was not found in the Vite document.");
  return stylesheetPath;
};

export const inlineHomepageStylesheet = (html: string, stylesheet: string): string => {
  if (stylesheet.includes("</style>")) throw new Error("Generated stylesheet contains an unsafe closing style tag.");
  getGeneratedStylesheetPath(html);
  return html.replace(
    GENERATED_STYLESHEET_PATTERN,
    `<style data-homepage-inline-css>${stylesheet}</style>`,
  );
};
