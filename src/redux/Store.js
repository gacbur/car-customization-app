import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import carDataReducer from './carData/carDataReducer'

const Store = createStore(carDataReducer, composeWithDevTools())

export default Store