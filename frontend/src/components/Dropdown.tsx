
type Props = {
    isOpen: boolean,
    setIsOpen: any,
    setFilterBy: any,
    // filter: string
}

const Dropdown = (props: Props) => {
  return (
    <section className="relative">
      <button
        className="text-gray-500 bg-white focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-2 py-2 text-center inline-flex items-center w-30 "
        onClick={() => props.setIsOpen(!props.isOpen)}
      >
         <i className="fa-solid fa-filter mr-3" />
        Filter
        
      </button>

      <div className={`${!props.isOpen && 'hidden'} absolute right-5 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow top-14 `}>
        <ul
          className="py-1 text-sm text-gray-700 "
          aria-labelledby="dropdownInformationButton"
        >
          <li onClick={() => props.setFilterBy('all')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              All
            </p>
          </li>
          <li onClick={() => props.setFilterBy('draft')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              Draft activities
            </p>
          </li>
          <li onClick={() => props.setFilterBy('done')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              Report activities
            </p>
          </li>
          
        </ul>
        
      </div>
    </section>
  );
};

export default Dropdown;
