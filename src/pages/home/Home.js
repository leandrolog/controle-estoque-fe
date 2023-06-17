import './home.css'
import Button from "react-bootstrap/Button";


function Home() {

    return (
        <div className="home-body">
            <h1 className="title-home">Controle de Inventario</h1>
            <div className="home-button">
                <a href="/login">
                    <Button className="button-home">
                        Log in
                    </Button>
                </a>
            </div>
        </div>
    )
}

export default Home
