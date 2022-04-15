
type Props = {
  editMode: boolean;
  content: string;
  title: string;
  onChange: (e: any) => void;
};

export const DynamicInput = (props: Props) => {
  return (
    <div>
      <p className="text-[12px] text-gray-500 mb-2">{props.title}</p>
      <h1
        className="text-lg px-6 py-3 bg-blue-50 rounded-lg"
        style={props.editMode ? { display: "none" } : { display: "block" }}
      >
        {props.content}
      </h1>
      <input
        type="text"
        value={props.content}
        style={props.editMode ? { display: "block" } : { display: "none" }}
        className="text-lg px-6 py-3 bg-blue-50 rounded-lg w-full"
        onChange={props.onChange}
      />
    </div>
  );
};
