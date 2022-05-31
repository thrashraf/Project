import { useEffect, useRef } from 'react';
import ModalContainer from '../../components/ModalContainer';
import Toast from '../../components/Toast';
import useInput from '../../hooks/useInput';
import axiosInstance from '../../utils/axiosInstance';

const KpiModal = ({ isShowing, toggle }: any) => {
  const eventsKpi = useInput('');
  const publicationKpi = useInput('');
  const innovationKpi = useInput('');

  const toastRef = useRef<any>(null);
  const status = useInput('');
  const message = useInput('');

  useEffect(() => {
    axiosInstance
      .get('/kpi/getKpi')
      .then((res) => {
        eventsKpi.setInput(res.data.event);
        publicationKpi.setInput(res.data.publication);
        innovationKpi.setInput(res.data.innovation);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateKpi = () => {
    if (!eventsKpi.value || !publicationKpi.value || !innovationKpi.value) {
      message.setInput('Please insert all the field!');
      status.setInput('error');
      toastRef.current.showToast();

      return;
    }

    const values = {
      event: eventsKpi.value,
      publication: publicationKpi.value,
      innovation: innovationKpi.value,
    };

    axiosInstance
      .post('/kpi/updateKpi', values)
      .then((res) => {
        message.setInput('Successful add 🎉');
        status.setInput('success');
        toastRef.current.showToast();

        toggle();
      })
      .catch((err) => {
        console.log(err);
        message.setInput('Something went wrong, Try again 🤔');
        status.setInput('error');
        toastRef.current.showToast();
      });
  };

  return (
    <ModalContainer isShowing={isShowing} hide={toggle}>
      <Toast ref={toastRef} message={message.value} status={status.value} />
      <div className='relative mx-auto bg-white max-w-lg rounded-lg shadow z-50 px-5 py-3'>
        <div className='flex justify-center flex-col'>
          <section className='my-5'>
            <p className='my-1  text-gray-400 ml-1'>
              Events KPI
              <span className='text-red-500'> *</span>
            </p>
            <input
              type='number'
              value={eventsKpi.value}
              onChange={eventsKpi.onChange}
              required
              className='bg-blue-50 px-3 py-3 rounded-lg outline-none w-full'
            />
          </section>

          <section className='my-5'>
            <p className='my-1  text-gray-400 ml-1'>
              Publication KPI
              <span className='text-red-500'> *</span>
            </p>
            <input
              type='number'
              value={publicationKpi.value}
              onChange={publicationKpi.onChange}
              required
              className='bg-blue-50 px-3 py-3 rounded-lg outline-none w-full'
            />
          </section>

          <section className='my-5'>
            <p className='my-1  text-gray-400 ml-1'>
              Innovation KPI
              <span className='text-red-500'> *</span>
            </p>
            <input
              type='number'
              value={innovationKpi.value}
              onChange={innovationKpi.onChange}
              required
              className='bg-blue-50 px-3 py-3 rounded-lg outline-none w-full'
            />
          </section>

          <section className=' flex justify-end my-5 mt-10'>
            <button
              className='flex hover:bg-black hover:text-white px-3 py-2  rounded-lg mr-5'
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              className='flex bg-blue-500 px-3 py-2 text-white rounded-lg'
              onClick={() => updateKpi()}
            >
              Update
            </button>
          </section>
        </div>
      </div>
    </ModalContainer>
  );
};

export default KpiModal;
