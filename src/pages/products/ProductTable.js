import './productTable.css'
import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ModalProductsUpdate from "./ModalProductsUpdate";
import InputFilter from "../../components/filter/InputFilter";
import Paginate from "../../components/reactPaginate/Paginate";

function ProductTable({getProducts, data}) {

    const [filter, setFilter] = useState('')
    const filteredData = data && data.filter((x) => {
        const productName = x.productName.toLowerCase();
        const filterLowerCase = filter && filter.toLowerCase();

        return productName.startsWith(filterLowerCase);
    })
    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(filteredData && filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageItems = filteredData && filteredData.slice(offset, offset + itemsPerPage);
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

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
                {currentPageItems && currentPageItems.map((x, i) => (
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
            <Paginate
                pageCount={pageCount}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default ProductTable
