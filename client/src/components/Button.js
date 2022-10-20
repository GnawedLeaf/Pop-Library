import React from 'react'
import './Button.css'

//Array of styles and sizes to change to when the screen changes size
const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

//exporting a button with an inbuilt function and is exporting these other properties like type and onClick and buttonstyle etc 
export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) =>{
    //checks if the button in quesiton has its own style, if it has then use that button style if not then use the first button style in the button style array (ie btn--primary)
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle: STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES [0];

    return(
        //onClick ={onClick} type = {type} means to follow whatever the button has already
        //btn ${checkButtonStyle} ${checkButtonSize} means that the button will be set to the btn--primary and btn--medium upon checking 
        // `` create strings in js 
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick ={onClick} type = {type}>
            {children}
        </button>
    )
}



