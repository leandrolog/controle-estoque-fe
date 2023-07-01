import './productTable.css';
import {HttpRequest, role} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ProductTable from "./ProductTable";
import ModalProducts from "./ModalProducts";

function Products() {
    const [data, setData] = useState();

    const handleProducts = async () => {

        try {
            const response = await HttpRequest.get(`/products`);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao obter os dados da tabela:", error);
        }
    };
    useEffect(() => {
            handleProducts()
    }, []);
    return (
        <div>
            <h1 className="title">Estoque</h1>
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
        </div>
    );
}

export default Products;
