import { GET_CAR_DATA, CAR_DATA_LOADING, CAR_DATA_ERROR } from "./carDataConstants";

const InitialState = {
    carData: [],
    carDataLoading: true,
    carDataError: false
}

const carDataReducer = (state = InitialState, action) => {
    switch (action.type) {
        case GET_CAR_DATA:
            return {
                carData: [...action.payload],
                ...state,
            }
        case CAR_DATA_LOADING:
            return {
                carDataLoading: action.payload,
                ...state,
            }
        case CAR_DATA_ERROR:
            return {
                carDataError: action.payload,
                ...state
            }
        default:
            return state
    }
}

export default carDataReducer