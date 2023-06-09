import {HttpRequest, user_id} from "../../services/HttpRequest";
import {useEffect, useState} from "react";

function Profile() {

    const [data, setData] = useState()


    console.log("data", user_id)
    const handleProfile = async(userId) => {
        await HttpRequest.put(`user/${userId}`)
    }
    useEffect(() => {
        handleProfile()
    }, [])

    return (
        <h1>Perfil</h1>
    )
}

export default Profile;
