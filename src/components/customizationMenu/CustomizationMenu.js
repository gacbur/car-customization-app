import React, { useEffect, useState } from 'react'

import Loading from '../Loading'
import CarImage from '../carImage/CarImage'

import { engineOptions, gearboxOptions, colorOptions } from './CustomizationMenuOptions'

import { useSelector } from 'react-redux'

import { IoLogoUsd } from 'react-icons/io'

import './CustomizationMenu.css'

const CustomizationMenu = ({ model }) => {

    const carData = useSelector(state => state.carData)
    const carDataLoading = useSelector(state => state.carDataLoading)
    const carDataError = useSelector(state => state.carDataError)

    const [pickedCustomizations, setPickedCustomizations] = useState({
        model,
        engine: {
            name: '2.0L 166BHP',
            price: 1100
        },
        gearbox: {
            name: 'manual',
            price: 0,
        },
        color: {
            name: 'black',
            price: 0,
        },
    })

    const [finalPrice, setFinalPrice] = useState()

    useEffect(() => {
        const { engine, gearbox, color } = pickedCustomizations
        const price = engine.price + gearbox.price + color.price
        setFinalPrice(price)

    }, [pickedCustomizations])

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
                name: 'black',
                price: 0,
            },
        })
    }, [model])

    const handlePickedCustomizations = (e, itemValue) => {
        const name = e.target.name

        if (name === "engine") {
            setPickedCustomizations({
                ...pickedCustomizations,
                [name]: itemValue
            })
        }

        if (name === 'gearbox') {
            setPickedCustomizations({
                ...pickedCustomizations,
                [name]: itemValue
            })
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
                                            disabled={carData[0].engine.find(item => item.name === pickedCustomizations.engine.name).gearbox.find(item => item === gearbox.name) ? false : true}
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
                        <div className="content-preview__wrapper">
                            <div className="price">
                                <h2><i><IoLogoUsd /></i>{finalPrice}</h2>
                            </div>
                            <div className="car-model">
                                <CarImage
                                    model={pickedCustomizations.model.name} pickedColor={pickedCustomizations.color.name}
                                />
                            </div>
                            <div className="car-custom-details">
                                <span className="detail"><p className="name">Engine:</p><p className="value">{pickedCustomizations.engine.name}</p></span>
                                <span className="detail"><p className="name">Gearbox:</p ><p className="value">{pickedCustomizations.gearbox.name}</p></span>
                                <span className="detail"><p className="name">Color:</p> <p className="value">{pickedCustomizations.color.name}</p></span>
                            </div>
                        </div>
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
        </div >
    )
}

export default CustomizationMenu
