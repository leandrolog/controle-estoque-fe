import './home.css'
import Button from "react-bootstrap/Button";


function Home() {

    return (
        <body>
        <header className="home-header">
            <h1 className="title-home">Controle de Inventario</h1>
            <div className="home-button">
                <a href="/login">
                    <Button className="button-home">
                        Log in
                    </Button>
                </a>
            </div>
        </header>
        <div className="home-body">

        </div>
        </body>
    )
}

export default Home
