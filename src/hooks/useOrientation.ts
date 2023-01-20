import { useEffect, useState } from "react"
import { Dimensions } from "react-native"

const useOrientation = () => {

    const [screenInfo, setScreenInfo] = useState(Dimensions.get("screen"))

    useEffect(() => {

        const onChange = (result: any) => {
            setScreenInfo(result.screen)
        }

        let handlerDimension = Dimensions.addEventListener("change", onChange)

        return () => handlerDimension.remove()
    })

    return {
        ...screenInfo,
        isLandscape: screenInfo.height < screenInfo.width,
        tablet: screenInfo.width > 1000
    }

}

export default useOrientation;