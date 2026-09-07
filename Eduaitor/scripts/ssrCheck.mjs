import { createServer } from "vite";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { MemoryRouter } from "react-router-dom";

const vite = await createServer({
  root: "D:/EduAitor-Website/Eduaitor",
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: FeatureLanding } = await vite.ssrLoadModule(
    "/src/Components/FeatureLandingPage.jsx"
  );
  const { default: DemoRequestForm } = await vite.ssrLoadModule(
    "/src/Components/DemoRequestForm.jsx"
  );
  const { ContactPopupProvider } = await vite.ssrLoadModule(
    "/src/Components/ContactPopup.jsx"
  );
  const { featureLandingPages } = await vite.ssrLoadModule(
    "/src/data/featureLandingPages.jsx"
  );

  for (const page of featureLandingPages) {
    const el = React.createElement(
      MemoryRouter,
      { initialEntries: [page.path] },
      React.createElement(
        ContactPopupProvider,
        null,
        React.createElement(FeatureLanding, { page })
      )
    );
    const html = renderToStaticMarkup(el);
    const counters = {
      faq: (html.match(/fl-faq__q/g) || []).length,
      form: (html.match(/fl-form/g) || []).length,
      shots: (html.match(/fl-screenshot/g) || []).length,
      h1: (html.match(/<h1/g) || []).length,
    };
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const words = text.split(" ").length;
    console.log(
      `${page.path} | words=${words} | h1=${counters.h1} faq=${counters.faq} form=${counters.form} screenshots=${counters.shots}`
    );
  }
} catch (err) {
  console.error("RENDER ERROR:", err.message);
  process.exitCode = 1;
} finally {
  await vite.close();
}