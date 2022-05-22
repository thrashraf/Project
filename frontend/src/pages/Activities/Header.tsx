import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  activitiesSelector,
  handleFilter,
  setFilterHandler,
  setViewHandler,
} from '../../features/activities/Activities';
import useModal from '../../hooks/useModal';

type Props = {
  toggleAdd: any;
  showView: boolean;
};

export const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const { view, activities, filterData, query, showFilter, setFilterItem } =
    useAppSelector(activitiesSelector);

  const { isShowing, toggle } = useModal();
  const { isShowing: showListTooltip, toggle: toggleListTooltip } = useModal();
  const { isShowing: showAddToolTip, toggle: toggleAddToolTip } = useModal();

  // const setFilter = (filter: string) => {
  //   console.log(filter);
  //   props.setQuery(filter)
  //   props.setShowFilter(false)
  // }

  return (
    <div>
      <div className='flex justify-between relative'>
        <section className='flex py-1 '>
          {props.showView && (
            <button
              className='px-4 py-3 rounded-lg bg-white text-black mr-5'
              onClick={props.toggleAdd}
              onMouseEnter={toggleAddToolTip}
              onMouseLeave={toggleAddToolTip}
            >
              <i className='fa-solid fa-plus' />
            </button>
          )}

          <div
            className={`${
              showAddToolTip ? 'visible' : 'hidden'
            } px-3 py-1 bg-slate-600 rounded-lg absolute -top-10 -left-6 w-26 text-white`}
          >
            Add new Event
          </div>

          <section className=' bg-white rounded-lg'>
            <span className='p-2 ml-3 text-gray-400'>
              <i className='fa-solid fa-magnifying-glass' />
            </span>
            <input
              type='text'
              placeholder='search by title and organizer'
              className='text-lg px-4 py-2 bg-white rounded-t-lg rounded-b-lg  w-[400px] focus:outline-none'
              onChange={(e) => dispatch(handleFilter(e.target.value))}
              value={query}
            />
            {filterData.slice(0, 15).length !== 0 && showFilter && (
              <div className='bg-white absolute shadow-md no-scrollbar overflow-hidden z-10 h-[200px] w-[450px] top-16 rounded-lg px-4 py-2 overflow-y-auto'>
                {filterData?.map((item: any, index: number) => (
                  <p
                    className='p-3 cursor-pointer hover:bg-slate-100'
                    onClick={() => dispatch(setFilterHandler(item.title))}
                    key={index}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            )}
          </section>
        </section>
        {props.showView && (
          <section className='flex w-[70px] justify-between text-gray-400 h-[30px] relative'>
            <i
              className={`fa-solid fa-calendar p-2 rounded-sm  hover:bg-gray-300 hover:text-white cursor-pointer $
              ${view === 'calendar' && 'text-black bg-white'}`}
              onClick={() => dispatch(setViewHandler('calendar'))}
              onMouseEnter={toggle}
              onMouseLeave={toggle}
            />
            {console.log(isShowing)}
            <div
              className={`${
                isShowing ? 'visible' : 'hidden'
              } px-3 py-1 bg-slate-600 rounded-lg absolute -top-10 -left-16 w-36 text-white`}
            >
              Calendar View
            </div>
            <i
              className={`fa-solid fa-bars p-2 rounded-sm hover:bg-gray-300 hover:text-white  cursor-pointer ${
                view === 'list' && 'text-black bg-white'
              }`}
              onMouseEnter={toggleListTooltip}
              onMouseLeave={toggleListTooltip}
              onClick={() => dispatch(setViewHandler('list'))}
            />
            <div
              className={`${
                showListTooltip ? 'visible' : 'hidden'
              } px-3 py-1 bg-slate-600 rounded-lg absolute -top-10 -left-6 w-26 text-white`}
            >
              List View
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
