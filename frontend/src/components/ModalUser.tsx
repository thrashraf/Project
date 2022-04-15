type Props = {
  children: any;
  modal: boolean
  setModal:  React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalUser = (props: Props) => {
  return (
    <div
      aria-hidden="true"
      className={`${props.modal ? null : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 w-full md:inset-0  md:h-full pt-[8%] `}
     
    >
        <div className="bg-[#00000055] fixed inset-0 "  onClick={() => props.setModal(!props.modal)} />
    
      <div className=" p-4 w-full h-full m-auto ">
        {/* <!-- Modal content --> */}
        {props.children}
      </div>
    </div>
  );
};

export default ModalUser;
