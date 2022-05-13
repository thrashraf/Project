import { useState } from 'react';

const useInput = (initialValue: any) => {
  const [value, setValue] = useState<any>(initialValue);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const setInput = (value: any) => {
    setValue(value);
  };

  return {
    value,
    onChange: handleChange,
    setInput,
  };
};

export default useInput;
