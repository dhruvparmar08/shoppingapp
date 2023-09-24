import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

const UpDown = ({qualities, updatequalities, id}) => {
    const [quality, setQuality] = useState(qualities);

    const updatequality = (status) => {
        console.log("status", status);
        if(status === "minus") {
            if(quality > 1) {
                setQuality(quality - 1);
                updatequalities(id, quality - 1);
            } else {
                // remove
                // setQuality(0);
                updatequalities(id, 0);
            }
        } else {
            setQuality(quality + 1);
            updatequalities(id, quality+1);
        }
    }

    return (
        <>
            <Button variant="primary" style={{height: '40px'}} className="px-3 me-2" onClick={() => updatequality("minus")}>
                <FaMinus />
            </Button>

            <div className="form-outline">
                <input id="form1" min="0" name="quantity" value={quality} onChange={(e) => setQuality(e.target.value)} type="number" readOnly className="form-control" />
            </div>

            <Button variant="primary" style={{height: '40px'}} className="px-3 ms-2" onClick={() => updatequality("add")}>
                <FaPlus />
            </Button>
        </>
    )
}

export default UpDown;