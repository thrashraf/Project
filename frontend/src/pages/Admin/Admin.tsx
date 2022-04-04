import { Sidebar } from "./Sidebar";
import Users from './users';
import { useState } from "react";

const Admin = () => {

  const [tabs, setTabs] = useState<number>(0);

  return (
      <div className="flex flex-no-wrap " >
      
        {/* Sidebar starts */}
        <div className="z-50">
          <Sidebar setTabs={setTabs} tabs={tabs}/>
        </div>
        {/* Sidebar ends */}
        <Users tabs={tabs}/>

    </div>
  );
};


export default Admin;
