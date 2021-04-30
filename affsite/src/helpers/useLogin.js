import { useState } from "react";

function getLocalStorageData(key,initialValues) {
    if(localStorage.getItem(key))
        return JSON.parse(localStorage.getItem(key));
    else 
        return initialValues;
}

export function useLogin(key,initialValues) {
    const [values, setValues] = useState(getLocalStorageData(key,initialValues));
    localStorage.setItem(key,JSON.stringify(values));

    return [
        values,
        (e) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
    ]
}