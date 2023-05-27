import fs from "fs";
import { defineConfig } from "vitepress";

function generateSidebar() {
  try {
    const folder = fs.readdirSync("docs/core");
    return (folder || []).map(item => {
      return { text: item, link: `/core/${item}/code` };
    });
  } catch {
    return [];
  }
  
}

function sidebar() {
  return [
    {
      text: "介绍",
      link: "/"
    },
    ...generateSidebar()
  ]
}

export default defineConfig({
  title: "JS-SS",
  description: "记录各种js手撕",

  lastUpdated: true,
  lastUpdatedText: "最后更新",
  
  cleanUrls: true,

  markdown: {
    theme: "vitesse-dark",
    lineNumbers: true,
  },

  head: [
    [
      'link', {
        rel: "icon",
        type: "image/png",
        href: "/logo.png"
      },
    ]
  ],

  themeConfig: {
    nav: [],

    sidebar: {
      "/": sidebar()
    },

    socialLinks: [
      {
        icon: 'github', link: 'https://github.com/panjinhong/js-ss'
      }
    ],

    editLink: {
      pattern: 'https://github.com/panjinhong/js-ss/tree/master/docs/:path',
      text: '在GitHub上编辑此页'
    },

    docFooter: {
      prev: "上一页",
      next: "下一页"
    },

    returnToTopLabel: "返回顶部",

    search: {
      provider: "local"
    },
  },

  base: "/js-ss"
});