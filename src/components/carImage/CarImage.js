import { ReactComponent as WK } from '../../assets/svg/car.svg';
import { ReactComponent as STANDARD } from '../../assets/svg/sedan-car-model.svg';
import { ReactComponent as UBER_RS2 } from '../../assets/svg/coupe-car.svg';
import { ReactComponent as PRO_RS3 } from '../../assets/svg/sportive-car.svg';

const CarImage = ({ model, pickedColor }) => {
    return (
        <>
            {model === "WK" && <WK fill={pickedColor} />}
            {model === "STANDARD" && <STANDARD fill={pickedColor} />}
            {model === "UBER RS2" && <UBER_RS2 fill={pickedColor} />}
            {model === "PRO RS3" && <PRO_RS3 fill={pickedColor} />}
        </>
    )
}

export default CarImage
