import { GET_CAR_DATA, CAR_DATA_LOADING, CAR_DATA_ERROR } from './carDataConstants'

export const getCarData = (carData) => {
    return {
        type: GET_CAR_DATA,
        payload: carData
    }
}

export const carDataLoading = (loading) => {
    return {
        type: CAR_DATA_LOADING,
        payload: loading
    }
}

export const carDataError = (error) => {
    return {
        type: CAR_DATA_ERROR,
        payload: error
    }
}