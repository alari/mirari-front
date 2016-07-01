import React from 'react'
import NodeText from "nodes/components/NodeText"
import {Tab,Tabs} from "material-ui/Tabs"

export default ({node}) => <Tabs>
  <Tab label="Предпросмотр"><div style={{paddingTop:'20px'}}><NodeText node={node} /></div></Tab>
  <Tab label="Заметки">
    <p>Тут будут заметки</p>
    <ul>
      <li>Пишешь заметки в заметки, боту или через веб</li>
      <li>При работе с черновиком ищешь по заметкам и их тексту</li>
      <li>Можно создать заметку прямо отсюда, в ходе работы с черновиком</li>
      <li>Можно припинить заметку к черновику и она будет тут в списке сверху</li>
    </ul>
  </Tab>
</Tabs>
