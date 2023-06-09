import './productTable.css'
import {HttpRequest} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ProductTable from "./ProductTable";
import {Button} from "react-bootstrap";
import ModalProducts from "./ModalProducts";

function Products() {

    const [data, setData] = useState()

    const handleProducts = async () => {
        try {
            const response = await HttpRequest.get("/products")
            setData(response.data.content);
        } catch (error) {
            console.error("Erro ao obter os dados da tabela:", error);
        }
    }
    useEffect(() => {
        handleProducts()
    }, [])

    return (
        <div>
            <h1 className="title">Items</h1>
            <div className="button-container">
                <ModalProducts
                    getProducts={handleProducts}
                    data={data}
                    title="Adicionar"/>
            </div>
            <ProductTable getProducts={handleProducts} data={data}/>
        </div>
    )
}

export default Products;
