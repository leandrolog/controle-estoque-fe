import './productTable.css'
import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalProductsUpdate from "./ModalProductsUpdate";
import InputFilter from "../../components/filter/InputFilter";

function ProductTable({getProducts, data}) {

    const [filter, setFilter] = useState('')
    const deleteProduct = async (productId) => {
        try {
            await HttpRequest.delete(`/product/${productId}`);
            getProducts()
        } catch (error) {
        }
    };
    const filteredData = data && data.filter((x) => {
        const productName = x.productName.toLowerCase();
        const filterLowerCase = filter && filter.toLowerCase();

        return productName.startsWith(filterLowerCase);
    })
    const handleFilter = (e) => {
        setFilter(e.target.value)
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <InputFilter
                title="Filtrar por item"
                className="filter-input"
                type="text"
                value={filter}
                onChange={handleFilter}
            />
            <table className="table">
                <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Fornecedor</th>
                    <th>Preço por unidade</th>
                </tr>
                {filteredData && filteredData.map((x, i) => (
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
                            </div>
                        }
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ProductTable
