import './inputFilter.css'

const InputFilter = ({className, type, value, onChange, title}) => {

    return(
        <div className="filter-container">
            <label>{title}</label>
            <input
                className={className}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    )

}
export default InputFilter;
