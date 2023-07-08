import React, { useEffect, useState } from 'react';

export const Timer = () => {
    const [time, setTime] = useState(new Date().getTime());
    useEffect(() => {
        setInterval(() => {
            setTime(oldTime => {
                console.log( new Date(oldTime).toString() , ' --> ',  new Date(oldTime + 1000).toString() );
                return oldTime + 1000;
            });
        }, 3000);
    }, []);
    
    return(
        <div>
            Current Time : {time} - { new Date(time).toString() }
        </div>
    )
}
    /*  
        here dependency array is empty,
        so this effect will be executed when componnet will mount
        In react 18, effect gets executed twice, but in older react only once.
        In order to execute effect only once (on mount), you can unwrap the App component from StrictMode component.
        But it is not recommended.
    */