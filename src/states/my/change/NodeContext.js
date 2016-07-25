import "./style.css";
import React from 'react'
import NodeText from "nodes/components/NodeText"
import { Tab, Tabs, TextField } from "material-ui"
import NoteForm from "nodes/components/NoteForm";
import {getNodesList, nodePin, nodeUnpin} from "nodes/redux/actions";
import {connect} from "react-redux";
import {map, find} from "ramda";
import Button from "commons/button";
import {decorateWithState} from "commons/utils";

import ActionLockOpen from "material-ui/svg-icons/action/lock-open"
import ActionLockOutline from "material-ui/svg-icons/action/lock-outline"
import ContentClear from "material-ui/svg-icons/content/clear"

const mapStateToProps = (state) => ({
  pinned: state.nodes.pinned
})

const mapDispatchToProps = {
  loadNodes: (params) => getNodesList(params),
  pin: (nodeId, targetId) => nodePin(nodeId, targetId),
  unpin: (nodeId, targetId) => nodeUnpin(nodeId, targetId)
}

const NodeContext = ({node, state: {q = "", nodes = [], focus = false}, setState, loadNodes, pinned, pin, unpin}) => {

  const onNotesActive = () => {
    loadNodes({limit: 50, layer: "Note", _expand: "values*text", pinnedToId: node.id, key: 'pinned'})
  }

  const pinUnpin = (n) => () => {
    (isPinned(n) ? unpin(n.id, node.id) : pin(n.id, node.id)).then(({error = false, result}) => {
      if(!error) {
        const u = result.body
        find(m => m.id === u.id, nodes) && setState({nodes: map(m => m.id === u.id ? {...m, pinnedToNodeIds: u.pinnedToNodeIds} : m, nodes)})
      }
    })
  }

  const isPinned = (n) => n.pinnedToNodeIds.indexOf(node.id) > -1

  const fetchNotes = (q) => {
    loadNodes({limit: 50, layer: "Note", _expand: "values*text", q: q || undefined}).then(({error=false, result}) => {
      if (!error) {
        setState({nodes: result.body.values})
      }
    })
  }

  const onQChange = (e) => {
    setState({q: e.target.value})
    fetchNotes(e.target.value)
  }

  const onFocus = () => {
    setState({focus:true})
    fetchNotes(q)
  }

  const list = (!!q || focus) ? nodes : (pinned && pinned.values || [])

  console.log("q", q, "focus", focus, "list", list, "pinned", pinned)

  return (<Tabs>
    <Tab label="Предпросмотр">
      <div style={{paddingTop:'20px'}}><NodeText node={node}/></div>
    </Tab>
    { node.id ? <Tab label="Заметки" onActive={onNotesActive}>

      { !q && !focus && <NoteForm pinToNodeId={node.id}/> }

      <div><span><TextField
        hintText="Или искать по заметкам"
        floatingLabelText="Искать по заметкам"
        onChange={onQChange}
        value={ q }
        onFocus={onFocus}
        errorText={ q && list.length === 0 && "Ничего не найдено" }
      /></span>
      {(q || focus) && <Button icon={<ContentClear/>} onClick={() => setState({q: "", focus: false})}/>}
        </div>

      {map(n => <div className="NodeContext" key={n.id}>
        <div className="NodeContext-main"><NodeText node={n}/></div>
        <div className="NodeContext-controls">
          <Button icon={isPinned(n) ? <ActionLockOutline/> : <ActionLockOpen/>} size="m" color="default" onClick={pinUnpin(n)} />
        </div>
      </div>, list)}

    </Tab> : <Tab label="Заметки">
      <p>Тут будут заметки, когда вы сохраните черновик</p>
      <ul>
        <li>Пишешь заметки в заметки, боту или через веб</li>
        <li>При работе с черновиком ищешь по заметкам и их тексту</li>
        <li>Можно создать заметку прямо отсюда, в ходе работы с черновиком</li>
        <li>Можно припинить заметку к черновику и она будет тут в списке сверху</li>
      </ul>
    </Tab> }
  </Tabs>)
}

export default connect(mapStateToProps, mapDispatchToProps)(decorateWithState(NodeContext))
