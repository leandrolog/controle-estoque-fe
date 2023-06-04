import {toast} from "react-toastify";

export const NotifySuccess = () => toast.success("Bem Vindo!", {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
});
export const NotifyError = () => toast.error("Erro ao Entrar!", {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
});
