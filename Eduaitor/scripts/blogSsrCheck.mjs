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
  const { default: Blogs } = await vite.ssrLoadModule("/src/Pages/Blogs.jsx");
  const { default: BlogDetail } = await vite.ssrLoadModule("/src/Pages/BlogDetail.jsx");

  const blogsHtml = renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      { initialEntries: ["/blogs"] },
      React.createElement(Blogs)
    )
  );
  console.log("Blogs page rendered, length:", blogsHtml.length);

  const detailHtml = renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      { initialEntries: ["/blog/some-post"] },
      React.createElement(BlogDetail)
    )
  );
  console.log("BlogDetail page rendered, length:", detailHtml.length);
  console.log("OK");
} catch (err) {
  console.error("RENDER ERROR:", err.message);
  process.exitCode = 1;
} finally {
  await vite.close();
}