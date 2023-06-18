import './productTable.css'
import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalProductsUpdate from "./ModalProductsUpdate";

function ProductTable({getProducts, data}) {

    const deleteProduct = async (productId) => {
        try {
            await HttpRequest.delete(`/product/${productId}`);
            getProducts()
        } catch (error) {
        }
    };
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <table className="table">
                <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Fornecedor</th>
                    <th>Preço por unidade</th>
                </tr>
                {data && data.map((x, i) => (
                    <tr key={i}>
                        <td>{x.productName}</td>
                        <td>{x.quantity}</td>
                        <td>{x.supplier}</td>
                        <td>{x.unitPrice}</td>
                        {role === "ROLE_ADMIN" &&
                            <div className="products-btn">
                                <ModalProductsUpdate
                                    title="Edit"
                                    modalTitle="Edit product"
                                    data={x}
                                    dataId={x.productId}
                                    update={getProducts}
                                />
                                <button onClick={() => deleteProduct(x.productId)}>delete</button>
                            </div>
                        }
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ProductTable
