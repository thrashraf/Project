
type Props = {
    isOpen: boolean,
    setIsOpen: any,
    setFilter: any,
    filter: string
}

const Dropdown = (props: Props) => {
  return (
    <section className="relative">
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center w-30 "
        onClick={() => props.setIsOpen(!props.isOpen)}
      >
        {props.filter}
        <i className="ml-2 fa-solid fa-angle-down" />
      </button>

      <div className={`${!props.isOpen && 'hidden'} absolute right-1 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow top-12 `}>
        <ul
          className="py-1 text-sm text-gray-700 "
          aria-labelledby="dropdownInformationButton"
        >
          <li onClick={() => props.setFilter('Default')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              Default
            </p>
          </li>
          <li onClick={() => props.setFilter('date')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              Date
            </p>
          </li>
          <li onClick={() => props.setFilter('soon')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              Coming Soon
            </p>
          </li>
          <li onClick={() => props.setFilter('Completed')}>
            <p className="block py-2 px-4 hover:bg-gray-100 cursor-pointer">
              Completed
            </p>
          </li>
        </ul>
        
      </div>
    </section>
  );
};

export default Dropdown;
