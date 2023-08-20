import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import EditModal from "../components/Profile/EditModal";
import ProfileForm from "../components/Profile/ProfileForm";


const EditProfile =  () => {
    const location = useLocation();
    const receivedData = location.state;    
    

    return (
        <EditModal user={receivedData}>
            <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">
                Edit Profile
            </h3>

            <ProfileForm type="edit" profile={receivedData}/>
        </EditModal>
    )
}

export default EditProfile; 