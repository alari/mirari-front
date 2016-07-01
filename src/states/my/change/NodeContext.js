import React from 'react'
import NodeText from "nodes/components/NodeText"
import {Tab,Tabs} from "material-ui/Tabs"
import NoteForm from "nodes/components/NoteForm";
import {getNodesList,nodePin,nodeUnpin} from "nodes/redux/actions"
import {connect} from "react-redux";
import {map} from "ramda"
import Button from "commons/button"

const mapStateToProps = (state) => ({
  pinned: state.nodes.pinned
})

const mapDispatchToProps = {
  loadNodes: (params) => getNodesList(params),
  pin: (nodeId, targetId) => nodePin(nodeId, targetId),
  unpin: (nodeId, targetId) => nodeUnpin(nodeId, targetId)
}

const NodeContext = ({node, loadNodes, pinned, pin, unpin}) => {

  const onNotesActive = () => {
    loadNodes({limit: 50, layer: "Note", _expand:"values*text", pinnedToId: node.id})
  }

  const pinUnpin = (n) => () => {
    console.log("pinUnpin", isPinned(n))
    (isPinned(n) ? unpin(n.id, node.id) : pin(n.id, node.id)).then((r) => {
      console.log(r)
    })
  }

  const isPinned = (n) => n.pinnedToNodeIds.indexOf(node.id) > -1

  return (<Tabs>
  <Tab label="Предпросмотр"><div style={{paddingTop:'20px'}}><NodeText node={node} /></div></Tab>
  { node.id ? <Tab label="Заметки" onActive={onNotesActive}>

    <NoteForm pinToNodeId={node.id}/>

    {pinned && pinned.values && map(n => <div key={n.id}>
      <h3>{n.title}</h3>
      <NodeText node={n}/>
      <Button title={isPinned(n) ? "Открепить" : "Прикрепить"} onClick={pinUnpin} />
    </div>, pinned.values)}

  </Tab> : <Tab label="Заметки">
    <p>Тут будут заметки, когда вы сохраните черновик</p>
    <ul>
      <li>Пишешь заметки в заметки, боту или через веб</li>
      <li>При работе с черновиком ищешь по заметкам и их тексту</li>
      <li>Можно создать заметку прямо отсюда, в ходе работы с черновиком</li>
      <li>Можно припинить заметку к черновику и она будет тут в списке сверху</li>
    </ul>
  </Tab> }
</Tabs>)}

export default connect(mapStateToProps, mapDispatchToProps)(NodeContext)
