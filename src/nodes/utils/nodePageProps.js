export default (n) => ({
  title: n.title,
    meta: [
    {property:"og:url", content:"/nodes/"+n.id},
    {property:"og:type", content:"article"},
    {property:"og:title", content:n.title},
    {property:"og:image", content:n.user.imageId ? ("/api/images/"+n.user.imageId+"?q=80&w=250&h=250&m=cover") : n.user.avatarUrl},
    {property:"og:description", content: (n.description || ((n.text && n.text.content) ? n.text.content.substring(0,255) : n.title))},
  ]
})
