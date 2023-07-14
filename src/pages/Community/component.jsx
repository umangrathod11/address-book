import React from 'react';
import { Link } from "react-router-dom"
import { TABS, TAB_IDS } from '../../constants/general';
import './style.css';



export const Community = () => {
    return (
        <div id="CommunityContainer">
            <div className="tabItems">
                {/* {TABS.map(({ id, text }) => {
                    return (
                        <div
                            key={id}
                            className="tabItem"
                        >
                            {text}
                        </div>);
                })} */}
                {
                    TABS.map(({ id, text }) => <Link to={`/${id}`} key={id}>{text}</Link>)
                }
            </div>
            <div className="tabComponent">
                
            </div>
        </div>
    )

}

Community.propTypes = {};
