import React from 'react';
import axios from 'axios';  

function getProfile(profileID, callback) 
{
    axios.get('/info/p/' + profileID)
    .then((res) => {
        return callback(res.data);
    });
};

function getElements (lst)
{
    if(lst)
    {
        return lst.map((item, index) =>(
        <p>{item}</p>
        ));
    }
}

function getName (profile)
{
    if(profile)
    {
        return(
            profile.firstName + ' ' + profile.lastName
        );
    }
}

export  {getElements, getName, getProfile};