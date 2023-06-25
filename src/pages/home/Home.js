import './home.css'
import Button from "react-bootstrap/Button";


function Home() {

    return (
        <div className="home-body">
            <div>
                <h1 className="home-title">EstoqueFlex</h1>
            </div>
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
