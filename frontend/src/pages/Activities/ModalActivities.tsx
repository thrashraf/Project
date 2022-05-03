import React from "react";
import ModalUser from "../../components/ModalUser";
import More from "../../components/More";
import useEditMode from "../../hooks/useEditMode";
import useModal from "../../hooks/useModal";
import { useAppSelector } from '../../app/hooks';
import { activitiesSelector } from '../../features/activities/Activities';

type Props = {
  showActivity: boolean;
  setShowActivity: any;
};

export const ModalActivities = (props: Props) => {
  //for nav drop
  const { isShowing, toggle } = useModal();
  const { isEditMode, toggle: toggleEdit } = useEditMode();

  const { detailActivities } = useAppSelector(activitiesSelector);

  return (
    <ModalUser modal={props.showActivity} setModal={props.setShowActivity}>
      {console.log(detailActivities)}
      {detailActivities && (
        <div className="relative mx-auto bg-white max-w-md rounded-lg shadow z-50 ">
          <div className="flex flex-col">
            <section className="relative">
              <More isShowing={isShowing} toggle={toggle} id={detailActivities.id}/>
              <button
                type="button"
                onClick={() => props.setShowActivity(!props.showActivity)}
                className=" absolute top-2 right-2 text-black bg-transparent z-10 hover:bg-black hover:text-white  rounded-lg text-sm p-2 py-4 ml-auto inline-flex items-center"
                data-modal-toggle="authentication-modal"
              >
                <i className="fa-solid fa-xmark fa-lg" />
              </button>
            </section>
            <>
              <img
                src={
                  JSON.parse(detailActivities.img_url).length > 0
                    ? detailActivities.img_url
                    : "/assets/default-placeholder.jpg"
                }
                alt={detailActivities.title}
                className="rounded-t-lg h-[200px] w-full object-cover"
              />

              <section className="p-4">
                <section className="flex justify-between items-center text-gray-400 text-sm">
                  <p>
                    {detailActivities.start
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                  <p>{detailActivities.venue}</p>
                </section>

                <section className="mt-3">
                  <h1 className="font-bold">{detailActivities.title}</h1>
                  <section className="flex justify-between items-center mt-3 h-10">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      {detailActivities.organizer}
                    </span>
                  </section>
                </section>
              </section>
            </>
          </div>
        </div>
      )}
    </ModalUser>
  );
};
