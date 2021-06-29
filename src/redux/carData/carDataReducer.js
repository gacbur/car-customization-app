import { GET_CAR_DATA, CAR_DATA_LOADING, CAR_DATA_ERROR } from "./carDataConstants";

const InitialState = {
    carData: [],
    carDataLoading: false,
    carDataError: false
}

const carDataReducer = (state = InitialState, action) => {
    switch (action.type) {
        case GET_CAR_DATA:
            return {
                ...state,
                carData: action.payload,
            }
        case CAR_DATA_LOADING:
            return {
                ...state,
                carDataLoading: action.payload,
            }
        case CAR_DATA_ERROR:
            return {
                ...state,
                carDataError: action.payload,
            }
        default:
            return state
    }
}

export default carDataReducer