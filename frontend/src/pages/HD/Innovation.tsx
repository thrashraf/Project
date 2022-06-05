import { Table } from '../../components/Table';
import useModal from '../../hooks/useModal';

export const Innovation = (props: any) => {
  const { isShowing, toggle } = useModal();

  return (
    <div className=''>
      <div className='  mx-auto relative top-14 bg-white p-4'>
        <Table isShowing={isShowing} toggle={toggle} />
      </div>
    </div>
  );
};
