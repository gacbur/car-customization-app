import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { getCarData, carDataLoading, carDataError } from '../../redux/carData/carDataActions'

import CustomizationMenu from '../customizationMenu/CustomizationMenu'

import './MainContent.css'

const MainContent = () => {

    const dispatch = useDispatch()

    const URL = 'https://car-customization-api.herokuapp.com/cars'

    const carModelButtons = [
        { id: 0, model: "PRO RS3" },
        { id: 1, model: "UBER RS2" },
        { id: 2, model: "STANDARD" },
        { id: 3, model: "WK" }
    ]

    const [model, setModel] = useState({
        name: "",
        imagePath: ""
    })

    const handleGetCarData = async (e) => {
        try {
            dispatch(carDataLoading(true))
            const response = await axios.get(URL, { params: { id: e.target.id } })
            const carData = await response.data
            dispatch(getCarData(carData))
            setModel({
                name: carData[0].model,
                imagePath: carData[0].imagePath
            })
            dispatch(carDataLoading(false))
        }
        catch (err) {
            console.log(err)
            dispatch(carDataLoading(false))
            dispatch(carDataError(true))
        }
    }

    return (
        <div className="main-content">
            <div className="main-content__car-model-buttons">
                {carModelButtons.map(car => {
                    return (
                        <button
                            key={car.id}
                            id={car.id}
                            className={`car-model-btn ${car.model === model.name && 'active'}`}
                            onClick={(e) => handleGetCarData(e)}
                        >
                            {car.model}
                        </button>
                    )
                })}
            </div>
            <CustomizationMenu model={model} />
        </div>
    )
}

export default MainContent
