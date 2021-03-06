import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// components
// import TableDropdown from "../Dropdowns/TableDropdown.js";

type Props = {
  reports: any;
  setReport: any;
  modal: boolean;
  setModal: any;
  verifyReport: any;
  selectedReport: any;
  setReportDetail: any;
};
export default function CardTable(props: Props, { color }: any) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color !== 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
        }
      >
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color !== 'light' ? 'text-blueGray-700' : 'text-white')
                }
              >
                Events
              </h3>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-wrap font-semibold text-center ' +
                    (color !== 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Title
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-wrap font-semibold text-center ' +
                    (color !== 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Date
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-wrap font-semibold text-center ' +
                    (color !== 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Status
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-wrap font-semibold text-center ' +
                    (color !== 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Submit By
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-wrap font-semibold text-center ' +
                    (color !== 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                >
                  Action
                </th>
                <th
                  className={
                    'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-pre-wrap font-semibold text-center ' +
                    (color !== 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {props.reports && props.reports.length > 0 ? (
                props.reports?.map((report: any, index: number) => {
                  return (
                    <tr key={index} className='text-center'>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4'>
                        <span
                          className='font-bold uppercase text-blue-500 hover:underline cursor-pointer'
                          onClick={() =>
                            navigate(`/verify-report/${report.id}`, {
                              state: report,
                            })
                          }
                        >
                          {report.title}
                        </span>
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4'>
                        {report.start.split('-').reverse().join('/')}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4'>
                        <i
                          className={`fas fa-circle ${
                            report.status === 'verified'
                              ? 'text-green-500'
                              : report.status === 'pending'
                              ? 'text-orange-500'
                              : 'text-red-500'
                          }  mr-2 `}
                        ></i>{' '}
                        {report.status}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4'>
                        <div className='flex items-center justify-around'>
                          <p>{report.owner}</p>
                        </div>
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4'>
                        <div className='flex items-center justify-around max-w-[300px]'>
                          <button
                            type='submit'
                            className=' bg-green-400 text-white p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-green-300 cursor-pointer w-[70px]  '
                            onClick={() => {
                              props.verifyReport();
                              props.setReportDetail('verified');
                              props.selectedReport(report);
                            }}
                          >
                            Verify
                          </button>
                          <button
                            type='submit'
                            className=' bg-red-400 text-white p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-300 cursor-pointer w-[70px] '
                            onClick={() => {
                              props.setModal!(!props.modal);
                              props.setReportDetail('declined', report.id);
                              props.selectedReport(report);
                            }}
                          >
                            Decline
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className='text-center flex w-full'>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-pre-wrap p-4'>
                    <span className='font-bold uppercase text-blue-500 hover:underline flex text-center'>
                      No item
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
