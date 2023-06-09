import UsersTable from "./UsersTable";
import {HttpRequest} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalUsers from "./ModalUsers";


function Users() {

    const [data, setData] = useState()
    const [totalPage, setTotalPage] = useState(0);
    const itemsPerPage = 10;

    const handleUsers = async (offset) => {
        try {
            const response = await HttpRequest.get(`/users`)
            setData(response.data);
            setTotalPage(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao obter os dados da tabela:", error);
        }
    }
    const handlePageClick = ({selected}) => {
        handleUsers(selected);
    };

    useEffect(() => {
        handleUsers()
    }, [])

    return (
        <div>
            <h1 className="title">Usuários</h1>
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
