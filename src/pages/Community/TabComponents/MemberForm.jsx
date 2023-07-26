import React, { useState } from 'react';
import { TAB_IDS } from '../../../constants/general';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../../../helpers/auth';

export const MemberForm = () => {
    const navigate = useNavigate();
    const [record, setRecord] = useState({});
    const {
        id, name, phone, email, city,
    } = record;

    const handleSubmit = (e) => {
        if (    !record.name ||
                !record.phone ||
                !record.city ||
                !record.email
            ) {
                alert('Enter all values before submitting');
                return;
                /* there are better ways to validate forms, this is just a work around */
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    ...getAuthHeaders(),
                },
                body: JSON.stringify({
                    name: record.name,
                    phoneNumber: [record.phone],
                    email: record.email,
                    city: record.city,
                })
            };
          
            fetch(`https://t1m-addressbook-service.onrender.com/users`, requestOptions)
            .then(r => {
                console.log(' r in 1st then ', r);
                if (r.status >= 200 && r.status <= 299) {
                    return r.json();
                } else {
                    throw ('Something went wrong');
                }
                
                
            })
            .then(r => {
                console.log(' r in 2nd then ', r);
                navigate(`/${TAB_IDS.MEMBERS}`)
            })
            .catch(error => {
                // handle error by your self
                console.log('error ->> ', error);
            });
    }

    return (
        <div className="formContainer">
            {id ? <div className='fieldContainer'>
                <label>Id : {id}</label>
            </div> : null}
            {/* Name */}
            <div className='fieldContainer'>
                <label>Name</label>
                <input onChange={(e) => {
                    // setRecord((oldState) => ({ ...oldState, name: e.target.value }));
                    setRecord({ ...record, name: e.target.value });
                }} value={name} />
            </div>

            {/* Phone */}
            <div className='fieldContainer'>
                <label>Phone</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, phone: e.target.value }));
                }} value={phone} />
            </div>

            <div className='fieldContainer'>
                <label>Email</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, email: e.target.value }));
                }} value={email} />
            </div>

            {/* City */}
            <div className='fieldContainer'>
                <label>City</label>
                <input onChange={(e) => {
                    setRecord((oldState) => ({ ...oldState, city: e.target.value }));
                }} value={city} />
            </div>
           
            <div>
                <Button type="submit" variant="success" onClick={handleSubmit} >
                    {id ? 'Update' : 'Add'}
                </Button>
            </div>
        </div>
    )
}