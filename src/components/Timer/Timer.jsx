import React, { useEffect, useState } from 'react';

export const Timer = () => {
    const [time, setTime] = useState(new Date().getTime());
    useEffect(() => {
        setTimeout(() => {
            setTime(oldTime => oldTime + 1000);
        }, 1000);
    });

    return(
        <div>
            Current Time : {time} - { new Date(time).toString() }
        </div>
    )
}