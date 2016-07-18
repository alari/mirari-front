export default (node, absolute=false) => (absolute ? "https://mirari.ru/" : "/") + (node.alias ? node.alias : ("nodes/"+node.id))
