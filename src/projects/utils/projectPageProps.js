export default (project) => {
  const props = {
    title: project.title,
    meta: [
      { property: "og:url", content: "https://mirari.ru/" + (project.alias || ("projects/" + project.id)) },
      { property: "og:title", content: project.title },
      { property: "og:description", content: "Страница проекта на Мирари" },
    ]
  }

  if (!!project.imageId) props.meta.push({
    property: "og:image",
    content: ("https://mirari.ru/api/images/" + project.imageId + "?q=80")
  });

  return props
}
