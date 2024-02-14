
import buttontyles from '../employee_page/css_folder/button.module.css'
import { useState,useEffect,useRef } from 'react'

export default function Divbutton(props){

    const { data } = props;

    const buttonref = useRef(null);
    const swipingRef=useRef(null);

    const [isPresent,setIsPresent]=useState(false);

    useEffect(() => {
        console.log("divbutton data --> ", data);
    }, [data]);

   let  containerclicked=()=>{


    if(isPresent)
    {
        let containerElement=buttonref.current;
        containerElement.style.background='green';
        console.log('hi')
        let swipeElement=swipingRef.current;
        // swipeElement.style.right='0px'
        // swipeElement.style.left='unset'
        setIsPresent(false);

        swipeElement.classList.add(buttontyles.moved);

    }
    else{
        console.log('')

        let containerElement=buttonref.current;
        containerElement.style.background='red';
        let swipeElement=swipingRef.current;
        // swipeElement.style.right='unset'
        // swipeElement.style.left='0px'
        swipeElement.classList.remove(buttontyles.moved);

        setIsPresent(true);
    }

    

    }
    return (
        <div className={buttontyles.body}>
            <div ref={buttonref} onClick={containerclicked}className={buttontyles.container}>
                <span>P</span>
                <span>A</span>
               <div ref={swipingRef} className={buttontyles.swipe}></div>
            </div>
            
        </div>
    )
}