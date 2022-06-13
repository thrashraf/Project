import Notify from './Notify';

type Props = {
  editMode: boolean;
  content: string;
  title: string;
  onChange: (e: any) => void;
  type: string;
};

export const DynamicInput = ({
  editMode,
  content,
  title,
  onChange,
  type,
  validatePhoneNum,
}: any) => {
  return (
    <div className='relative'>
      <p className='text-[12px] text-gray-500 mb-2'>{title}</p>
      <section className='relative'>
        <input
          type={type}
          value={content ? content : ''}
          disabled={editMode}
          className='text-lg px-6 py-3 bg-blue-50 rounded-lg w-full'
          onChange={onChange}
          onKeyPress={(e) => validatePhoneNum(e)}
        />
        {!content && <Notify />}
      </section>
    </div>
  );
};
