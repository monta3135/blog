import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGemoji from "remark-gemoji";
import rehypeBudoux from "./src/plugins/rehype-budoux";

// GitHub Pages の URL に合わせて変更してください
// 例: username が "monta" で リポジトリ名が "blog" の場合
const SITE_URL = "https://monta3135.github.io";
const BASE_PATH = "/blog";

export default defineConfig({
    site: SITE_URL,
    base: BASE_PATH,
    integrations: [
        expressiveCode({
            themes: ["github-dark-default", "github-light-default"],
            defaultProps: {
                showLineNumbers: false,
            },
            styleOverrides: {
                borderRadius: "0.25rem",
                borderColor: "var(--border)",
                codeBackground: "var(--code-bg)",
            },
        }),
        mdx(),
        sitemap(),
    ],
    build: {
        format: "file",
    },
    prefetch: {
        defaultStrategy: "viewport",
        prefetchAll: true,
    },
    markdown: {
        syntaxHighlight: false,
        smartypants: false,
        remarkPlugins: [remarkGemoji],
        remarkRehype: {
            footnoteLabel: " ",
            footnoteBackLabel: "↩ 戻る",
            footnoteLabelTagName: "hr",
        },
        rehypePlugins: [
            rehypeSlug,
            rehypeBudoux,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "append",
                    properties: {
                        class: "heading-link",
                        ariaHidden: "true",
                        tabIndex: -1,
                    },
                },
            ],
        ],
    },
    image: {
        remotePatterns: [{ protocol: "https" }],
    },
});
