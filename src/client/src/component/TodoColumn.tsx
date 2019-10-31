import * as React from 'react'
import TodoItem from '../model/TodoItem'

interface Props {
  items: TodoItem[]
  headerLabel: React.ReactNode
  noItemsLabel: React.ReactNode
  children(item: TodoItem): React.ReactNode
}

export default function TodoColumn({ items, ...props }: Props) {
  return <div className="col">
    <h4>{props.headerLabel}</h4>
    {items.length === 0 ? props.noItemsLabel : null}
    {items.map(props.children)}
  </div>
}