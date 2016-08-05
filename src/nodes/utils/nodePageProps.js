import nodeUrl from './nodeUrl';

export default (n) => ({
  title: n.title,
  meta: [
    { property: "og:url", content: nodeUrl(n, true) },
    { property: "og:type", content: "article" },
    { property: "og:title", content: n.title },
    {
      property: "og:image",
      content: (n.imageId || n.user.imageId) ? ("https://mirari.ru/api/images/" + (n.imageId || n.user.imageId) + "?q=80") : n.user.avatarUrl
    },
    {
      property: "og:description",
      content: (n.description || ((n.text && n.text.content) ? n.text.content.substring(0, 300) : n.title))
    },
  ]
})
