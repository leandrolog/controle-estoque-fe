import './productTable.css';
import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ProductTable from "./ProductTable";
import ModalProducts from "./ModalProducts";
import Paginate from "../../components/reactPaginate/Paginate";
function Products() {
    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const itemsPerPage = 10;

    const handleProducts = async (offset) => {
        try {
            const response = await HttpRequest.get(`/products?page=${offset}&size=${itemsPerPage}`);
            setData(response.data.content);
            setTotalPage(response.data.totalPages);
        } catch (error) {
            console.error("Erro ao obter os dados da tabela:", error);
        }
    };

    useEffect(() => {
        handleProducts()
    }, []);

    const handlePageClick = ({selected}) => {
        handleProducts(selected);
    };
    return (
        <div>
            <h1 className="title">Items</h1>
            {role === "ROLE_ADMIN" && (
                <div className="button-container">
                    <ModalProducts
                        getProducts={handleProducts}
                        data={data}
                        title="Adicionar"
                    />
                </div>
            )}
            <ProductTable getProducts={handleProducts} data={data}/>
            <Paginate
                pageCount={totalPage}
                onPageChange={handlePageClick}
            />
        </div>
    );
}

export default Products;
