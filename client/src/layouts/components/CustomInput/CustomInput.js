import { FormHelperText, TextField } from "@mui/material";
import React from "react";
export const CustomInput = (props) => {
    const {value,name,label, handleChange, error, type="string"} = props;
    const handleOnChange = React.useCallback(
        (event) => {
            handleChange(event.target.value);
        },
        [handleChange]
    );
    return (
        <div>
            <TextField
                id="outlined-basic"
                name={name}
                value={value}
                onChange={handleOnChange}
                label={label}
                variant="outlined"
                type={type}
            />
            {
                <FormHelperText id="component-error-text" className="errorText">{error}</FormHelperText>
            }
        </div>
    );
};
