import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App";

interface HelmetContext {
  helmet?: HelmetServerState;
}

export interface RenderedRoute {
  appHtml: string;
  headHtml: string;
}

export const renderRoute = (url: string): RenderedRoute => {
  const helmetContext: HelmetContext = {};
  const appHtml = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes enableClientEffects={false} />
      </StaticRouter>
    </AppProviders>,
  );

  const helmet = helmetContext.helmet;
  if (!helmet) {
    throw new Error(`Helmet did not produce metadata for ${url}`);
  }

  const headHtml = [
    helmet.title.toString(),
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
    helmet.noscript.toString(),
    helmet.style.toString(),
  ]
    .filter(Boolean)
    .join("\n");

  return { appHtml, headHtml };
};
