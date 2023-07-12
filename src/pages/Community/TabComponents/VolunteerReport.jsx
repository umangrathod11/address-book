import React, { useContext } from 'react';
import { INTEREST_CONTRIBUTION, INTEREST_TO_TEXT } from '../../../constants/general';
import { getPersonNameLabel } from '../helper';
import { CommunityContext } from '../../../context/context';

export const VolunteerReport = () => {
    const { state } = useContext(CommunityContext);
    const { records } = state;
    const groupedData = {};

    INTEREST_CONTRIBUTION.map(obj => obj.value).forEach(interest => {
        groupedData[interest] = [];
    });
    
    records.forEach(obj => {
        obj.interests.forEach(interest => {
            groupedData[interest].push(obj);
        });
    });

    const sortedAreas = Object.keys(groupedData).sort((a, b) => groupedData[b].length - groupedData[a].length);

    return(
        <div id="volunteersList">
            {
                sortedAreas.map(interest => {
                    const persons = groupedData[interest].map(record => <div key={record.id}> { getPersonNameLabel(record) }</div>);

                    return (
                        <section key={interest}>
                            <div className='title'>{INTEREST_TO_TEXT[interest]}</div>
                            <div className='content'>
                                { persons.length ? persons : 'No Volunteers at this time'}
                            </div>
                            
                        </section>
                    );
                })
            }
        </div>
    )
}

VolunteerReport.propTypes = {};