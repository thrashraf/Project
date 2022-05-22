import { Table } from '../../components/Table';
import useModal from '../../hooks/useModal';

export const Innovation = (props: any) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <div className=' max-w-7xl mx-auto relative top-14'>
        <Table isShowing={isShowing} toggle={toggle} />
      </div>
    </>
  );
};
