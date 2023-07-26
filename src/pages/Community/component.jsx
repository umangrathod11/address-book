import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { EducationReport, GeoGraphyReport, VolunteerReport, Landing, MembersLanding } from './TabComponents';
import './style.css';
import { TABS, TAB_IDS } from '../../constants/general';
import NotFound from '../../components/NotFound';
import { Protected } from '../../components/Protected/Protected';


export const Community = () => {
    return (
        <div id="CommunityContainer">
            <div className="tabItems">
                {TABS.map(({ id, text }) => <Link to={`/${id}`}>{text}</Link>)}
            </div>
            <div className="tabComponent">
                <Routes>
                    <Route path="/" element={
                        <Protected>
                            <Landing />
                        </Protected>
                    } />
                    <Route path={`/${TAB_IDS.MEMBERS}/*`} element={
                        <Protected>
                            <MembersLanding />
                        </Protected>
                    }/>


                    <Route path={`/${TAB_IDS.EDUCATION_REPORT}`} element={
                        <Protected>
                            <EducationReport />
                        </Protected>
                    } />
                    <Route path={`/${TAB_IDS.GEO_GRAPHY_REPORT}`} element={
                        <Protected>
                            <GeoGraphyReport />
                        </Protected>
                    } />
                    <Route path={`/${TAB_IDS.VOLUNTEER_REPORT}`} element={
                        <Protected>
                            <VolunteerReport />
                        </Protected>
                    } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    )

}

Community.propTypes = {};