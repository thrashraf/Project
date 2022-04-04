import { HTMLInputTypeAttribute } from "react";

interface props {
  placeholder: HTMLInputTypeAttribute;
  type: HTMLInputTypeAttribute;
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className="bg-blue-50 px-3 py-3 rounded-lg outline-none w-full"
      value={props.value}
      onChange={props.onChange}
    />
  );
};


