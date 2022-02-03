import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { createEvent, getEvent, updateEvent } from "./EventManager.js"



export const EventForm = ({editEvent}) => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const { eventId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        if (editEvent) {
            getEvent(eventId).then((res) => {
                const eventToEdit = {
                    gameId: res.game.id,
                    description: res.description,
                    date: res.date,
                    time: res.time
                }
                setCurrentEvent(eventToEdit)
            })
        }
    },[eventId])

    useEffect(() => {
        getGames().then(setGames)
    }, [])

    const changeEventState = (domEvent) => {
        const event = Object.assign({}, currentEvent)
        if (domEvent.target.name === "eventId") {
            event[domEvent.target.name] = parseInt(domEvent.target.value)
        } else {
            event[domEvent.target.name] = domEvent.target.value
        }
        setCurrentEvent(event)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{editEvent ? " Edit Event" :"Register New Event"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select type="number" name="gameId" required autoFocus className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                            <option value="">Select a Game</option>
                            {
                                games.map((game) => {
                                    return <option key={game.id} value={game.id}>{game.title}</option>
                                })
                            }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="textarea" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        gameId: currentEvent.gameId,
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                    }

                    // Send PUT/POST request to your API
                    editEvent
                    ? updateEvent(eventId, event)
                    .then(() => history.push("/events"))
                    : createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">{editEvent? "Update  Event" : "Create"}</button>
        </form>
    )
}