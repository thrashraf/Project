import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Skeleton from "../../components/Skeletons/Skeleton";
import Dropdown from "../../components/Dropdown";
import CardSkeleton from "../../components/Skeletons/CardSkeleton";

const Activities = () => {
  const [activities, setActivities] = useState<any>(null);
  const [filterActivities, setFilterActivities] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("Default");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/api/activities/getAllActivities")
        .then((res) => {
          const allActivities = res.data.allActivities;
          setActivities(allActivities);
          setFilterActivities(allActivities);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!activities || filter !== 'soon') return;
    const filteredActivities = activities.filter(
      (act: any) => act.act_date >= new Date().toISOString().slice(0, 10)
    );
    console.log(filteredActivities);
    setFilterActivities(filteredActivities)
  }, [activities, filter]);

  useEffect(() => {
    if (!activities || filter !== 'Completed') return;
    const filteredActivities = activities.filter(
      (act: any) => act.act_date <= new Date().toISOString().slice(0, 10)
    );
    console.log(filteredActivities);
    setFilterActivities(filteredActivities)
  }, [activities, filter]);

  useEffect(() => {
    if (!activities || filter !== 'Default') return;
    setFilterActivities(activities)
  }, [activities, filter]);

  return (
    <div>
      <Navbar />
      <div className="mt-20 px-5 ">
        <section className="flex justify-between items-center">
          <section>
            <h1 className="lg:text-2xl font-semibold">Activities</h1>
            <p className="text-xs text-gray-500 lg:text-xl">
              Manage all the activities
            </p>
          </section>

          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setFilter={setFilter}
            filter={filter}
          />
        </section>

        <div className="lg:grid grid-cols-3 w-full">
          {filterActivities ? (
            filterActivities.map((act: any, index: number) => (
              <section key={index} className="my-10">
                <div className="max-w-sm max-h-[350px] bg-white rounded-lg border border-gray-200 shadow-md ">
                  <a href="something">
                    <img
                      className="rounded-t-lg h-[150px] object-cover w-full "
                      src={act.img_url ? act.img_url : '/assets/default-placeholder.jpg'}
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="something">
                      <h5 className="mb-2  font-bold tracking-tight text-gray-900 ">
                        {act.title}
                      </h5>
                    </a>
                    <section className="flex justify-between mt-5 text-sm">
                      <p className="mb-3 text-gray-700 dark:text-gray-400">
                        {act.act_date.split('-').reverse().join('/')}
                      </p>
                      <p className="mb-3 text-gray-700 dark:text-gray-400">
                        {act.venue}
                      </p>
                    </section>

                    <section className="flex justify-between items-center mt-3 h-10">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {act.organizer}
                      </span>
                      {new Date().toISOString().slice(0, 10) > act.act_date && (
                        <button
                        className=" items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Create Report
                        <i className="ml-2 fa-solid fa-arrow-right-long" />
                      </button>
                      )}
                    </section>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <CardSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
