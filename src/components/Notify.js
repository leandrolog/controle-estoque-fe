import {toast} from "react-toastify";

export const NotifySuccess = (message) => toast.success(message, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
});
export const NotifyError = (message) => toast.error(message, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
});
