
function sidebar() {
  return [
    {
      text: "介绍",
      link: "/"
    },
    {
      text: "debounce",
      link: "/core/debounce/index"
    }
  ]
}

export default {
  title: "JS-SS",

  description: "各种js手撕",

  themeConfig: {
    nav: [],

    sidebar: {
      "/": sidebar()
    },

    editLink: {
      pattern: '',
      text: '在GitHub上编辑此页'
    },
  }
};