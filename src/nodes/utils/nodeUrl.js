export default (node, absolute = false) => (node.layer === 'Note') ? `/my/notes/${node.id}` : ((absolute ? 'https://mirari.ru/' : '/') + (node.alias ? node.alias : ('nodes/' + node.id)));
