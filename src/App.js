import './App.css';
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

function App() {

    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            return navigate('/login')
        }

    }, [])
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default App;
