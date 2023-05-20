import React from 'react'
import { BUTTONS, EVENTS } from '../consts'

export function navigate (href) {
  window.history.pushState({}, null, href)
  // create a custom event
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handlerClick = (event) => {
    const IsMainEvent = event.button === BUTTONS.PRIMARY
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if (IsMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }
  return (
        <a href={to} onClick={handlerClick} target={target} {...props}/>
  )
}
