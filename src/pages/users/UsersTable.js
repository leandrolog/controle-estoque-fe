import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalUsersUpdate from "./ModalUsersUpdate";

function UsersTable({getUsers, data}) {

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

    return (
        <div>
            <table className="table">
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Setor</th>
                    <th>Cargo</th>
                </tr>
                {data && data.map((x, i) => (
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
                                <button onClick={() => deleteProduct(x.userId)}>delete</button>
                            </div>
                        }
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default UsersTable
