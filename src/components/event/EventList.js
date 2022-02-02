import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager"
import { useHistory } from "react-router-dom"


export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
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
                                        return <div className="event__gamer">{gamer.user.first_name}</div>
                                    })
                                }
                            </div>
                            <button onClick={() => history.push(`/events/edit/${event.id}`)}>Edit</button>
                            <button onClick={() => {deleteEvent(event.id).then(setEvents)}}>Delete</button>

                            <button 
                            className={event.joined ? "leave" : "join"}
                            onClick={() => {
                                event.joined
                                ? leaveEvent(event.id).then(setEvents)
                                : joinEvent(event.id).then(setEvents)
                            }}>{event.joined ? "Leave" : "Join"}</button>

                        </section>
                    })
                }
            </article>
        </>
    )
}