import React, { useEffect, useRef, useState } from 'react'

const SuggectCard = (props) => {
    const { matchObj,inputvalue, index, updateColorObj, isColorObj  } = props

    const [isColor, setColor] = useState(false);
    
    const cardRef = useRef(null);


    useEffect(() => {
        if (isColor && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
            });
        }
    }, [isColor]);

    useEffect(()=>{
        setColor(isColorObj[matchObj.unique_id])
    }, [isColorObj])

    if(!matchObj){
        return null
    }

    const changeColor = (text) => {
        if (!inputvalue) {
            return text;
        }

        const regex = new RegExp(`(${inputvalue})`, 'gi');
        return text.split(regex).map((chunk, index) => (
            <span
                key={index}
                style={{
                    backgroundColor: inputvalue && chunk.toLowerCase() === inputvalue.toLowerCase() ? 'lightblue' : 'transparent',
                }}
            >
                {chunk}
            </span>
        ));
    };


    const handleMouseEnter = () => updateColorObj(matchObj.unique_id, true);

    const handleMouseLeave = () => updateColorObj(matchObj.unique_id, false);

    return (
        <div
            ref={cardRef}
            className={`suggestCardPar ${isColor ? 'highlighted' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            tabIndex="0"
        >
            <div className='name'>{changeColor(matchObj.name)}</div>
            <div className='address'>{changeColor(matchObj.address)}</div>
            <div className='pin'>{changeColor(matchObj.pincode)}</div>
            <div className='items'>Items: {matchObj.items && matchObj.items.map((item, i) => i + 1 > matchObj.items.length ? `${changeColor(item)},` : changeColor(item))}</div>
        </div>
    )
}


export default SuggectCard