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

const mapStateToProps = (state) => ({
  pinned: state.nodes.pinned
})

const mapDispatchToProps = {
  loadNodes: (params) => getNodesList(params),
  pin: (nodeId, targetId) => nodePin(nodeId, targetId),
  unpin: (nodeId, targetId) => nodeUnpin(nodeId, targetId)
}

const NodeContext = ({node, state: {q = "", nodes = []}, setState, loadNodes, pinned, pin, unpin}) => {

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

  const onQChange = (e) => {
    setState({q: e.target.value})
    loadNodes({limit: 50, layer: "Note", _expand: "values*text", q: e.target.value}).then(({error=false, result}) => {
      if (!error) {
        setState({nodes: result.body.values})
      }
    })
  }

  const list = !!q ? nodes : (pinned && pinned.values || [])

  return (<Tabs>
    <Tab label="Предпросмотр">
      <div style={{paddingTop:'20px'}}><NodeText node={node}/></div>
    </Tab>
    { node.id ? <Tab label="Заметки" onActive={onNotesActive}>

      { !q && <NoteForm pinToNodeId={node.id}/> }

      <TextField
        hintText="Или искать по заметкам"
        floatingLabelText="Искать по заметкам"
        fullWidth={true}
        onChange={onQChange}
        value={ q }
        errorText={ q && list.length === 0 && "Ничего не найдено" }
      />
      {q && <span onClick={() => setState({q: ""})}>Очистить</span>}

      {map(n => <div className="NodeContext" key={n.id}>
        <div className="NodeContext-main"><NodeText node={n}/></div>
        <div className="NodeContext-controls">
          <Button title={isPinned(n) ? "Открепить" : "Прикрепить"} size="m" color="default" onClick={pinUnpin(n)} />
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
