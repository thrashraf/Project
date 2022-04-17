import ModalUser from "../../components/ModalUser";

type Props = {
  modal: boolean;
  setModal: any;
  id: any;
  verifyReport: any;
  message: string;
  setMessage: any
};

const DeclineModal = (props: Props) => {
  return (
    <ModalUser modal={props.modal} setModal={props.setModal}>
      <div className="relative p-4 w-full max-w-4xl h-full md:h-auto m-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center p-5 rounded-t border-b ">
            <h3 className="text-xl font-medium  ">Declined reason</h3>
            <button
              type="button"
              onClick={() => props.setModal(!props.modal)}
              className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="large-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 ">
            <textarea
              name=""
              value={props.message}
              onChange={(e) => props.setMessage(e.target.value)}
              cols={30}
              rows={10}
              className="bg-blue-50 px-3 py-2 rounded-lg outline-none w-full resize-none"
            ></textarea>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-end items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
            <button
              data-modal-toggle="large-modal"
              type="button"
              className="  bg-white hover:bg-red-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 mr-5"
            >
              Cancel
            </button>

            <button
              data-modal-toggle="large-modal"
              type="button"
              className="text-white bg-green-400 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
              onClick={() => {
                props.verifyReport("declined", props.id);
                props.setModal(!props.modal);
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </ModalUser>
  );
};

export default DeclineModal;
