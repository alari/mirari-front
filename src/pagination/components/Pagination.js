import './styles.css'

import React from 'react'
import {times, last, add, slice, map} from 'ramda'

import {
    RaisedButton
} from 'material-ui'

export default (props) => {

  const page = (limit, offset) => {
    return Math.floor((offset + limit) / limit)
  }

  const limitOffset = (page, limit) => {
    page = page || 1
    var offset = (page - 1) * limit
    return { offset, limit }
  }

  const pagesData = ({ limit, offset, total, itemsLength, cached }) => {
    let count = null
    let numbers = null
    let active = page(limit, offset)
    let lastPage = null
    let first = 1
    let prev = null
    let next = null

    if(total){
      count = Math.ceil(total / limit)
      numbers = times(add(1), count)
      lastPage = last(numbers)
      first = numbers[0]
    } else if(cached){
      count = Math.ceil(cached / limit)
      numbers = times(add(1), count)
      lastPage = last(numbers)
      first = numbers[0]
    } else if( 0 < itemsLength) {
      count = Infinity
      numbers = times(add(Math.max(1, active - 3)), 7)
      lastPage = Infinity
    } else {
      count = 0
      numbers = []
      lastPage = 0
      active = 0
      first = 0
    }

    if(first < active) {
      prev = active - 1
    }

    if(active < lastPage) {
      next = active + 1
    }

    return { count, active, prev, next, first, last: lastPage, numbers }
  }

  const pages = pagesData({limit: props.limit, offset: props.offset || 0, total: props.total, itemsLength: props.itemsLength, cached: false})

  const setPage = (n, append = false) => (e) => {
    const lo = {...limitOffset(n, props.limit), append:append}
    !!props.setPage ? props.setPage(lo) : console.log("goto page", n, lo)
  }

  return (
      <div className="Pagination">
        { (pages.active != pages.last) && <div className="Pagination-loadMore-container">
          <RaisedButton label="Загрузить ещё" fullWidth={true} className="Pagination-loadMore-btn" onClick={ setPage(pages.next, true) }/>
        </div> }

        <div className="Pagination-list">
          <div className="Pagination-item">
            <RaisedButton label="Назад" secondary={true} disabled={ pages.active == pages.first } onClick={ setPage(pages.prev) } />
          </div>

          {
            map((n) => {
              return <div className="Pagination-item" key={"page"+n}>
                <RaisedButton label={ n } secondary={ pages.active != n } disabled={pages.active == n } onClick={ setPage(n) }/>
              </div>
            }, pages.numbers)
          }

          <div className="Pagination-item">
            <RaisedButton label="Вперёд" secondary={true} disabled={pages.active == pages.last} onClick={ setPage(pages.next) } />
          </div>

        </div>
      </div>
  )
}
