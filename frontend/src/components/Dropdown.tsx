const Dropdown = ({ ...props }: any) => {
  return (
    <section className='relative'>
      <button
        className=' text-white hover:bg-slate-100 hover:text-black focus:outline-none focus:ring-blue-300 font-medium px-4 rounded-md py-2 text-center inline-flex items-center w-30 '
        onClick={() => props.setIsOpen(!props.isOpen)}
      >
        <i className={props.icon} />
        {props.filterBy ? props.filterBy : props.title}
      </button>

      <div
        className={`${
          !props.isOpen && 'hidden'
        } absolute right-5 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow top-14 `}
      >
        <ul
          className='py-1 text-sm text-gray-700 '
          aria-labelledby='dropdownInformationButton'
        >
          {props.navdropArr?.map((item: any, index: number) => (
            <li onClick={() => props.setFilterBy(item)}>
              <p
                className='block py-2 px-4 hover:bg-gray-100 cursor-pointer'
                key={index}
              >
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Dropdown;
