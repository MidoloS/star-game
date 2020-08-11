import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './Game.sass'

const Game = () => {
    // active representa los botones, si estan activos o inactivos. Creo un array de 9 true's. Eso representa que al inicio todos los botones
    // Estan disponibles
    const [active, setActive] = useState([...Array(9).keys()].reduce(acc => acc.concat(true), []))
    const [stars, setStars] = useState([...Array(Math.round(Math.random() * 9)).keys()])
    const [suma, setSuma] = useState(0)

    // Realizar la suma y bloquea el boton
    const handleClick = (value) => {
        setSuma((suma + value + 1), () => {
            if (suma === stars.length) {
                setSuma(0); 
                setStars(randomStars()) // Generar nuevas estrellas
            }
        }) 
        setActive(activeButtons(value)) // Bloquea el boton
    }

    const activeButtons = value => active.reduce((acc, actual, i) => i === value ? acc.concat(!actual) : acc.concat(actual), [])
    const randomStars = () => [...Array(Math.round(Math.random() * 10)).keys()]


    return (
        <div className="game">
            <h1 onClick={() => console.log(suma === stars.length, suma, stars)}>Pick 1 or more numbers that sum to the number of stars</h1>
            <div className="panel">
                <div className="stars">
                    {
                        stars.map(el => <div key={el}><i className="fas fa-star"></i></div>)
                    }
                    
                </div>
                <div className="numbers">
                    {
                        [...Array(9).keys()] 
                            .map(el => (
                                    active[el] ?
                                    <button onClick={() => handleClick(el)}>
                                        {el+1}
                                    </button>
                                    : <button disabled>{el+1}</button>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Game;