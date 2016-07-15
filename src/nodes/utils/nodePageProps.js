export default (n) => ({
  title: n.title,
    meta: [
    {property:"og:url", content:"https://mirari.ru/nodes/"+n.id},
    {property:"og:type", content:"article"},
    {property:"og:title", content:n.title},
    {property:"og:image", content:n.user.imageId ? ("https://mirari.ru/api/images/"+n.user.imageId+"?q=80") : n.user.avatarUrl},
    {property:"og:description", content: (n.description || ((n.text && n.text.content) ? n.text.content.substring(0,300) : n.title))},
  ]
})
