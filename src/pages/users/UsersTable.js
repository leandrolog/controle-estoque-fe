import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalUsersUpdate from "./ModalUsersUpdate";
import InputFilter from "../../components/filter/InputFilter";

function UsersTable({getUsers, data}) {

    const [filter, setFilter] = useState('')

    const deleteProduct = async (userId) => {
        try {
            await HttpRequest.delete(`/user/${userId}`);
            getUsers()
        } catch (error) {
        }
    };
    useEffect(() => {
        getUsers()
    }, [])

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }
    const filteredData = data && data.filter((x) => {
        const userName = x.name.toLowerCase()
        const userFiltered = filter.toLowerCase()

        return userName.startsWith(userFiltered)
    })

    return (
        <div>
            <InputFilter
                title="Filtrar por nome"
                className="filter-input"
                type="text"
                value={filter}
                onChange={handleFilter}
            />
            <table className="table">
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Setor</th>
                    <th>Cargo</th>
                </tr>
                {filteredData && filteredData.map((x, i) => (
                    <tr key={i}>
                        <td>{x.name}</td>
                        <td>{x.email}</td>
                        <td>{x.department}</td>
                        <td>{x.role}</td>
                        {role === "ROLE_ADMIN" &&
                            <div className="products-btn">
                                <ModalUsersUpdate
                                    title="Edit"
                                    modalTitle="Edit product"
                                    data={x}
                                    dataId={x.userId}
                                    update={getUsers}
                                />
                            </div>
                        }
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default UsersTable
