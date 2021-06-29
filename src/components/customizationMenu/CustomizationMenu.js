import React, { useEffect, useState } from 'react'

import Loading from '../Loading'

import { useSelector } from 'react-redux'

import './CustomizationMenu.css'

const CustomizationMenu = ({ model }) => {

    const carData = useSelector(state => state.carData)
    const carDataLoading = useSelector(state => state.carDataLoading)
    const carDataError = useSelector(state => state.carDataError)

    const [pickedCustomizations, setPickedCustomizations] = useState({
        model: model,
        engine: {
            name: '2.0L 166BHP',
            price: 1100
        },
        gearbox: {
            name: 'manual',
            price: 0,
        },
        color: {
            name: 'red',
            price: 0,
        },
    })

    const engineOptions = [
        {
            name: "5.2L 532BHP",
            price: 3400
        },
        {
            name: "4.2L 443BHP",
            price: 2150
        },
        {
            name: "3.6L 374BHP",
            price: 1700
        },
        {
            name: "2.0L 166BHP",
            price: 1100
        }
    ]

    const gearboxOptions = [
        {
            name: "manual",
        },
        {
            name: "automatic",
            price: 600
        }
    ]

    const colorOptions = [
        {
            name: "red",
            price: 0
        },
        {
            name: "gray",
            price: 160
        },
        {
            name: "brown",
            price: 120
        },
        {
            name: "black",
            price: 200,
        },
        {
            name: "gold",
            price: 500
        },
    ]

    useEffect(() => {
        console.log(pickedCustomizations)
    }, [pickedCustomizations.model])

    useEffect(() => {
        setPickedCustomizations({
            model: model,
            engine: {
                name: '2.0L 166BHP',
                price: 1100
            },
            gearbox: {
                name: 'manual',
                price: 0,
            },
            color: {
                name: 'red',
                price: 0,
            },
        })
    }, [model])

    const handlePickedCustomizations = (e, itemValue) => {
        const name = e.target.name
        console.log(name)
        console.log(itemValue)

        if (name === "engine") {
            setPickedCustomizations({
                ...pickedCustomizations,
                [name]: itemValue
            })
        }

        if (name === 'gearbox') {
            if (pickedCustomizations.engine.name === "5.2L 532BHP") {
                setPickedCustomizations({
                    ...pickedCustomizations,
                    [name]: itemValue
                })
            }
        }

        if (name === 'color') {
            setPickedCustomizations({
                ...pickedCustomizations,
                [name]: itemValue
            })
        }
    }

    return (
        <div className="customization-menu">
            {
                carDataLoading && carData.length === 0 ? <div className="customization-menu__loading">
                    <Loading />
                </div> : null
            }
            {
                carData.length > 0 && <div className="customization-menu__content">
                    <div className="content-options">
                        <h1 className="car-model">{carData[0].model}</h1>
                        <div className="engine">
                            <h2>Engine</h2>
                            <div className="engine-options">
                                {engineOptions.map(engine => {
                                    return (
                                        <button
                                            className={`engine-btn ${pickedCustomizations.engine.name === engine.name && 'active'}`}
                                            name="engine"
                                            onClick={(e) => handlePickedCustomizations(e, engine)}
                                            disabled={carData[0].engine.find(item => item.name === engine.name) ? false : true}
                                        >
                                            {engine.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="gearbox">
                            <h2>Gearbox</h2>
                            <div className="gearbox-options">
                                {gearboxOptions.map(gearbox => {
                                    return (
                                        <button
                                            className={`gearbox-btn ${pickedCustomizations.gearbox.name === gearbox.name && 'active'}`}
                                            name="gearbox"
                                            onClick={(e) => handlePickedCustomizations(e, gearbox)}
                                            disabled={pickedCustomizations.engine.name !== "5.2L 532BHP" && gearbox.name === "automatic"}
                                        >
                                            {gearbox.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="color">
                            <h2>Color</h2>
                            <div className="color-options">
                                {colorOptions.map(color => {
                                    return (
                                        <button
                                            className={`color-btn ${pickedCustomizations.color.name === color.name && 'active'}`}
                                            name="color"
                                            onClick={(e) => handlePickedCustomizations(e, color)}
                                            style={{ backgroundColor: `${color.name}` }}
                                        >
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="content-preview">
                        {/* {pickedCustomizations.engine.name}<br />
                        {pickedCustomizations.gearbox}<br />
                        {pickedCustomizations.color}<br /> */}
                    </div>
                </div>
            }
            {
                carData.length === 0 && !carDataError && !carDataLoading ? <div className="customization-menu__pick-car">
                    Pick a car you want to customize.
                </div>
                    :
                    null
            }
            {
                carDataError && <div className="customization-menu__error">
                    Sorry, we couldn't load picked car data, Try refreshing the page!
                </div>
            }
        </div>
    )
}

export default CustomizationMenu