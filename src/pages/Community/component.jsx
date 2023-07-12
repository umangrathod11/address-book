import React, { useContext } from 'react';
import { TABS, TAB_IDS } from '../../constants/general';
import { MemberForm, MembersList, EducationReport, GeoGraphyReport, VolunteerReport } from './TabComponents';
import { CommunityContext } from '../../context/context';
import './style.css';

const TAB_ID_WISE_COMPONENTS = {
    [TAB_IDS.ADD_MEMBER]: MemberForm,
    [TAB_IDS.EDUCATION_REPORT]: EducationReport,
    [TAB_IDS.GEO_GRAPHY_REPORT]: GeoGraphyReport,
    [TAB_IDS.VOLUNTEER_REPORT]: VolunteerReport,
    [TAB_IDS.VIEW_MEMBERS]: MembersList,
};

export const Community = () => {
    const { state, communityActions } = useContext(CommunityContext);
    const { tabId } = state;
    const ComponentToRender = TAB_ID_WISE_COMPONENTS[tabId];

    return (
        <div id="CommunityContainer">
            <div className="tabItems">
                {TABS.map(({ id, text }) => {
                    return (
                        <div
                            onClick={(e) => communityActions.changeTab(id)}
                            key={id}
                            className={`tabItem ${tabId === id ? 'activeItab' : ''}`}
                        >
                            {text}
                        </div>);
                })}
            </div>
            <div className="tabComponent">
                <ComponentToRender />
            </div>
        </div>
    )

}

Community.propTypes = {};