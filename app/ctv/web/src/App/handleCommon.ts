import { NavigateFunction } from "react-router-dom";
import { HeaderSelections, HeaderSelected } from "@src/component/Header/HeaderLeft/type";

export const InitComponent = (
    isSignin: boolean, navigate: 
    NavigateFunction, 
    headerSelected: HeaderSelected
) => {
    if (!isSignin) {
        navigate('/signin')
    } else {
        // switch(headerSelected) { 
        //     case HeaderSelections.HOME: { 
        //         navigate('/')
        //         break; 
        //     } 
        //     case HeaderSelections.LIVE: { 
        //         navigate('/live')
        //         break; 
        //     } 
        //     default: { 
        //         //statements; 
        //         break; 
        //     } 
        // } 
    }
    const myId = sessionStorage.getItem("myId");
    if (myId === null) {
        navigate('/signin')
    }
}