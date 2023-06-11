import UsersTable from "./UsersTable";
import {HttpRequest} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalUsers from "./ModalUsers";


function Users() {

    const [data, setData] = useState()

    const handleUsers = async () => {
        try {
            const response = await HttpRequest.get("/users")
            setData(response.data.content);
            console.log(response)
        } catch (error) {
            console.error("Erro ao obter os dados da tabela:", error);
        }
    }
    useEffect(() => {
        handleUsers()
    }, [])

    return (
        <div>
            <h1 className="title">Users</h1>
            <div className="button-container">
                <ModalUsers
                    data={data}
                    getUsers={handleUsers}
                    title="Adicionar"/>
            </div>
            <UsersTable
                getUsers={handleUsers}
                data={data}/>
        </div>
    )
}

export default Users;
