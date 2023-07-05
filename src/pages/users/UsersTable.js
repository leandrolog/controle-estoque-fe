import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalUsersUpdate from "./ModalUsersUpdate";
import InputFilter from "../../components/filter/InputFilter";
import Paginate from "../../components/reactPaginate/Paginate";

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

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(filteredData && filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageItems = filteredData && filteredData.slice(offset, offset + itemsPerPage);
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

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
                {currentPageItems && currentPageItems.map((x, i) => (
                    <tr key={i}>
                        <td>{x.name}</td>
                        <td>{x.email}</td>
                        <td>{x.department}</td>
                        <td>{x.role}</td>
                        {role === "ROLE_ADMIN" &&
                            <div className="products-btn">
                                <ModalUsersUpdate
                                    title="Editar"
                                    modalTitle="Edit product"
                                    data={x}
                                    dataId={x.userId}
                                    update={getUsers}
                                />
                                <button onClick={() => (deleteProduct(x.userId))}>Deletar</button>
                            </div>
                        }
                    </tr>
                ))}
            </table>
            <Paginate
                handlePageChange={handlePageChange}
                pageCount={pageCount}
            />
        </div>
    )
}

export default UsersTable
