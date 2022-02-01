import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game">{event.game.title}</div>
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">{event.time}</div>
                        <div className="event__organizer">Brought to you by: {event.organizer.user.first_name} {event.organizer.user.last_name}</div>
                        <div className="event__attendees">Attendees:
                            {
                                event.attendees.map((gamer) => {
                                    return <div className="event__gamer">{gamer.id}</div>
                                })
                            }
                        </div>

                    </section>
                })
            }
        </article>
    )
}