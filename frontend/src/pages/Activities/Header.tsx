
type Props = {
  view: string;
  setView: any;
  activity: any;
  filterData: any;
  setFilterData: any;
  setQuery: any;
  query: any;
  showFilter: any;
  setShowFilter: any;
  setFilterItem: any;
  toggleAdd: any;
};

export const Header = (props: Props) => {

  const handleFilter = (e: any) => {
    const searchWord = e.target.value;
    props.setQuery(searchWord)
    const newFilter = props.activity.filter((value: any) =>
      value.title.toLowerCase().includes(searchWord.toLowerCase())
    );

    if (searchWord !== "") {
      props.setFilterData(newFilter)
      props.setShowFilter(true)
    } else {
      props.setFilterData([])
      props.setShowFilter(!props.showFilter)
    }
    
  };

  const setFilter = (filter: string) => {
    console.log(filter);
    props.setQuery(filter)
    props.setShowFilter(false)
  }

  return (
    <div>
      <div className="flex justify-between relative">
        <section className="flex py-1 ">

          <button className="px-4 py-3 rounded-lg bg-blue-500 text-white mr-5"
          onClick={props.toggleAdd}
          >
            <i className="fa-solid fa-plus" />
          </button>

          <section className=" bg-blue-50 rounded-lg">
            <span className="p-2 ml-3 text-gray-400">
              <i className="fa-solid fa-magnifying-glass" />
            </span>
            <input
              type="text"
              className="text-lg px-4 py-2 bg-blue-50 rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none"
              onChange={handleFilter}
              value={props.query}
            />
            {props.filterData.slice(0, 15).length !== 0 && props.showFilter && (
              <div className="bg-white absolute no-scrollbar overflow-hidden z-10 h-[200px] w-[450px] top-16 rounded-lg px-4 py-2 overflow-y-auto">
                {props.filterData?.map((item: any) => (
                  <p className="p-3 cursor-pointer hover:bg-slate-100"
                  onClick={() => setFilter(item.title)}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            )}
          </section>
        </section>

        <section className="flex w-[70px] justify-between text-gray-400 h-[30px]">
          <i
            className={`fa-solid fa-calendar p-2 rounded-sm  hover:bg-gray-300 hover:text-white cursor-pointer ${
              props.view === "calendar" && "text-white bg-blue-500"
            }`}
            onClick={() => props.setView("calendar")}
          />
          <i
            className={`fa-solid fa-bars p-2 rounded-sm hover:bg-gray-300 hover:text-white  cursor-pointer ${
              props.view === "list" && "text-white bg-blue-500"
            }`}
            onClick={() => props.setView("list")}
          />
        </section>
      </div>
    </div>
  );
};
