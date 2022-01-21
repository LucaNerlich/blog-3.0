// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

// Docusauraus.io config
// https://github.com/facebook/docusaurus/blob/main/website/docusaurus.config.js

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Luca Nerlich - Tech Documentation',
    tagline: 'A Blog ~ ish',
    url: 'https://lucanerlich.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    staticDirectories: ['public', 'static'],
    favicon: 'images/favicon.ico',
    organizationName: 'LucaNerlich',
    projectName: 'blog-3.0',
    trailingSlash: true,

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/LucaNerlich/blog-3.0/tree/main',
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: true,
                    remarkPlugins: [require('mdx-mermaid')],
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        'https://github.com/LucaNerlich/blog-3.0/tree/main/docs',
                    postsPerPage: 5,
                    feedOptions: {
                        type: 'all',
                        copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
                    },
                    blogSidebarCount: 'ALL',
                    blogSidebarTitle: 'All our posts',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                }
            }),
        ],
    ],

    plugins: [
        '@docusaurus/plugin-ideal-image',
        require.resolve('docusaurus-plugin-image-zoom')
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            hideableSidebar: true,
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },
            // https://crawler.algolia.com/admin/crawlers/418c876a-d3fa-4976-97e7-2706034e9ec8/overview
            // https://crawler.algolia.com/admin/crawlers/418c876a-d3fa-4976-97e7-2706034e9ec8/configuration/edit
            algolia: {
                appId: '9BZ1Z8DOXB',
                apiKey: '89c2de4e4cc51dabec31db32e7ee4e4f',
                indexName: 'lucanerlich',
                contextualSearch: true,
            },
            navbar: {
                hideOnScroll: true,
                title: 'Luca Nerlich',
                logo: {
                    alt: 'My Site Logo',
                    src: 'images/logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Documentation',
                    },
                    {
                        to: '/docs/category/projects',
                        label: 'Projects',
                        position: 'left'
                    },
                    {
                        to: '/docs/category/aem',
                        label: 'AEM',
                        className: "font-red",
                        position: 'left'
                    },
                    {
                        href: 'https://github.com/LucaNerlich/blog-3.0',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Documentation',
                                to: '/docs/intro',
                            },
                            {
                                label: 'Imprint',
                                to: '/imprint',
                            },
                        ],
                    },
                    {
                        title: 'Socials',
                        items: [
                            {
                                label: 'Xing',
                                href: 'https://www.xing.com/profile/Luca_Nerlich',
                            },
                            {
                                label: 'LinkedIn',
                                href: 'https://www.linkedin.com/in/lucanerlich/',
                            },
                        ],
                    },
                    {
                        title: 'Tech',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/LucaNerlich/blog-3.0',
                            },
                            {
                                label: 'Gitlab',
                                href: 'https://gitlab.com/lucanerlich',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Luca Nerlich - Built with Docusaurus v2.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['groovy', 'java', 'rust'],
            },
            zoom: {
                selector: '.markdown :not(em) > img',
                config: {
                    // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
                    background: {
                        light: 'rgb(255, 255, 255)',
                        dark: 'rgb(50, 50, 50)'
                    }
                }
            }
        }),
};

module.exports = config;
