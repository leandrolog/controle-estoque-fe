import InputWithLabel from "./inputWithLabel/InputWithLabel";
import {useState} from "react";


const FilterComponent = ({data}) => {

    const [filterData, setFilterData] = useState('');

    const handleInputChange = (e) => {
        setFilterData(e.target.value)
    }
    const filteredData = data && data.filter((x) =>
        x.toLowerCase().includes(filterData.toLowerCase())
    );


    return (
        <div>
            <InputWithLabel
                type="text"
                value={filterData}
                onChange={handleInputChange}
                placeholder="Digite"
            />
            <ul>
                {filteredData.map((x, i) => (
                    <li key={i}>
                        {x}
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default FilterComponent;
