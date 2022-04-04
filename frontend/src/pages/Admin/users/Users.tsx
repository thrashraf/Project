import React, { useEffect, useState } from "react";
import { Modal } from '../../../components/Modal';
import { DeleteNotification } from './DeleteNotification';
import { Table } from "./Table";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllUser } from '../../../features/admin/Admin';
import { userSelector } from '../../../features/user/User';
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
} 

type props = {
  tabs: number
}

const Users = (props: props) => {

  //? show more menu
  const [showMore, setShowMore] = useState<string>("");
  //? show Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  //? show delete notification
  const [showNotification, setShowNotification] = useState<boolean>(false);

    //? store all user
    const [allUser, setAllUser] = useState<User[]>();

    //show one detail user to pass into modal
    const [user, setUser] = useState<Object>({});



    const dispatch = useAppDispatch();

    const { token } = useAppSelector(userSelector);
  
    useEffect(() => {
      console.log(token);
      dispatch(getAllUser(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  const showMoreHandler = (id: string, user: object) => {
    setUser(user);
    setShowMore(id);
  };

  const modalHandler = () => {
    setShowModal(!showModal)
  };

  const notificationHandler = () => {
    setShowNotification(!showNotification)
  };

  return (
    <div className={`py-5 md:w-4/5 w-11/12 ${props.tabs === 1 ? null : 'hidden'}`}>
      <Modal
        show={showModal}
        modalHandler={modalHandler}
        user={user}
        allUser={allUser}
        setAllUser={setAllUser}
      />
      <DeleteNotification
        show={showNotification}
        notificationHandler={notificationHandler}
        id={showMore}
        allUser={allUser}
        setAllUser={setAllUser}
      />
      {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
      <Table
        allUser={allUser}
        showMore={showMore}
        showMoreHandler={showMoreHandler}
        modalHandler={modalHandler}
        notificationHandler={notificationHandler}
      />
    </div>
  );
};


export default Users
