const InputWithLabel = ({type, defaultValue, title, onChange, placeholder, className, value}) => {

    return (
        <div className="input-container">
            <label className="label-title">{title}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                defaultValue={defaultValue}
            >
            </input>
        </div>
    )
}
export default InputWithLabel
