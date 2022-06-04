import Notify from './Notify';

type Props = {
  editMode: boolean;
  content: string;
  title: string;
  onChange: (e: any) => void;
  type: string;
};

export const DynamicInput = (props: Props) => {
  return (
    <div className='relative'>
      <p className='text-[12px] text-gray-500 mb-2'>{props.title}</p>
      <section className='relative'>
        <input
          type={props.type}
          value={props.content ? props.content : ''}
          disabled={props.editMode}
          className='text-lg px-6 py-3 bg-blue-50 rounded-lg w-full'
          onChange={props.onChange}
        />
        {!props.content && <Notify />}
      </section>
    </div>
  );
};
