export default (user) => ({
  title: user.name,
  meta: [
    {property:"og:url", content:"https://mirari.ru/"+(user.username || ("users/" + user.id))},
    {property:"og:type", content:"profile"},
    {property:"og:title", content:user.name},
    {property:"og:image", content:user.imageId ? ("https://mirari.ru/api/images/"+user.imageId+"?q=80") : user.avatarUrl},
    {property:"og:description", content: "Страница автора на Мирари"},
  ]
})
