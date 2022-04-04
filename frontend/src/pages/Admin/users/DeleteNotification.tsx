import axios from "axios";

type Props = {
    id: string
    show: boolean
    notificationHandler: () => void
    // eslint-disable-next-line no-empty-pattern
    setAllUser: ([]) => void;
    allUser: any;
}

export const DeleteNotification = (props: Props) => {

    const id = props.id

    const deleteUserHandler = () => {
        axios.post('/api/admin/deleteUser', { id }, {withCredentials: true})
        .then(res => {
            console.log(res);

            const updatedUser = [...props.allUser];
            const index = props.allUser.findIndex(
                (userId: any) => userId.id === id
            );
            updatedUser.splice(index);

            props.setAllUser(updatedUser);
        })
        .catch(err => {
            console.log(err);
        }) 
    }


  return (
    <>
    <div className={`w-full bg-[#00000055]  z-[100] inset-0 ${ props.show ? 'absolute' : 'hidden'}`} onClick={props.notificationHandler}  />
      
      <div className={`w-11/12 mx-auto mb-4 my-6 md:w-5/12 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white  rounded-md m-auto transform translate-y-[70%] translate-x-[40%] ${ props.show ? 'absolute' : 'hidden'} z-[200]`}>
        <div className="flex pb-3 items-center">
          <div className="-ml-1 text-gray-600 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={4} y1={7} x2={20} y2={7} />
              <line x1={10} y1={11} x2={10} y2={17} />
              <line x1={14} y1={11} x2={14} y2={17} />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
          <p className="text-lg text-gray-800  font-semibold pl-2">
            Delete This Account?
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 pb-3 font-normal">
          Are you sure want to delete this account? this action might will make user lose their account
        </p>
        <button className="focus:outline-none bg-red-400 transition duration-150 ease-in-out hover:bg-red-500 rounded text-white px-3 py-2 text-xs"
        onClick={deleteUserHandler}
        >
          Delete Account
        </button>
      </div>
    </>
  );
};
