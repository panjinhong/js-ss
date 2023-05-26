import fs from "fs";

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

generateSidebar();


function sidebar() {
  return [
    {
      text: "介绍",
      link: "/"
    },
    ...generateSidebar()
  ]
}

export default {
  title: "JS-SS",
  description: "各种js手撕",
  lastUpdated: true,
  cleanUrls: true,

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
  }
};