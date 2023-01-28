import { Slider } from "@mui/material"
import { useState } from "react"

const RangeSlider = () => {
    const [value, setValue] = useState<number[]>([0, 100])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }
    return (
        <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
        />
    )
}

export default RangeSlider