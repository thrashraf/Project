import { useState } from "react";

const useInput = (initialValue: any) => {
    const [value, setValue] = useState<any>(initialValue);

    const handleChange = (e: any) => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default useInput;