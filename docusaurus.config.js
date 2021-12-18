// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Luca Nerlich - Tech Documentation',
    tagline: 'A Blog ~ ish',
    url: 'https://blog.lucanerlich.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'images/favicon.ico',
    organizationName: 'LucaNerlich',
    projectName: 'blog-3.0',
    trailingSlash: false,

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/LucaNerlich/blog-3.0',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/LucaNerlich/blog-3.0',
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
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
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
                        to: '/docs/aem/intro',
                        label: 'AEM',
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
            },
        }),
};

module.exports = config;
