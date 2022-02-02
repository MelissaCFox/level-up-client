import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGame, getGameTypes, updateGame } from './GameManager.js'


export const GameForm = ({editGame}) => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        if (gameId){
            getGame(gameId).then((res) => {
                const gameToEdit = {
                    skillLevel: res.skill_level,
                    numberOfPlayers: res.number_of_players,
                    title: res.title,
                    maker: res.maker,
                    gameTypeId: res.game_type.id
                }
                setCurrentGame(gameToEdit)
            })
        }
    },[gameId])

    useEffect(() => {
        getGameTypes().then(setGameTypes)
    }, [])

    const changeGameState = (event) => {
        const game = Object.assign({}, currentGame)
        if (event.target.name === "gameTypeId" || event.target.name === "numberOfPlayers" || event.target.name === "skillLevel") {
            game[event.target.name] = parseInt(event.target.value)
        } else {
            game[event.target.name] = event.target.value
        }
        setCurrentGame(game)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" max="10" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select type="number" name="gameTypeId" required autoFocus className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                            <option value="">Select a Game Type</option>
                            {
                                gameTypes.map((type) => {
                                    return <option key={type.id} value={type.id}>{type.label}</option>
                                })
                            }
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }
                    
                    // Send PUT/POST request to your API
                    editGame
                    ? updateGame(gameId, game)
                        .then(() => history.push("/games"))
                    : createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">{editGame ? "Update Game" : "Create"}</button>
        </form>
    )
}