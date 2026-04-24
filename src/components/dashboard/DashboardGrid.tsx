import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { memo, type ReactNode } from 'react'
import { useDashboardContext } from '../../context/useDashboardContext'
import type { WidgetType } from '../../types/dashboard'

interface DashboardGridProps {
  widgets: Record<WidgetType, ReactNode>
}

function SortableItem({ id, children }: { id: WidgetType; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'opacity-70' : ''} ${id === 'aiChat' ? 'xl:col-span-2' : ''} transition-all duration-300`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

function DashboardGridComponent({ widgets }: DashboardGridProps) {
  const { widgetOrder, setWidgetOrder } = useDashboardContext()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = widgetOrder.indexOf(active.id as WidgetType)
    const newIndex = widgetOrder.indexOf(over.id as WidgetType)
    setWidgetOrder(arrayMove(widgetOrder, oldIndex, newIndex))
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {widgetOrder.map((id) => (
            <SortableItem key={id} id={id}>
              {widgets[id]}
            </SortableItem>
          ))}
        </section>
      </SortableContext>
    </DndContext>
  )
}

export const DashboardGrid = memo(DashboardGridComponent)
