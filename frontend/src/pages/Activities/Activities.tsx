import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import { SideCard } from "./SideCard";
import { Header } from "./Header";
import { List } from "./List";
import { ModalActivities } from "./ModalActivities";
// import Dropdown from "../../components/Dropdown";
// import CardSkeleton from "../../components/Skeletons/CardSkeleton";


const Activities = () => {
  //for activities and filter for list
  const [activities, setActivities] = useState<any>(null);
  //for view
  const [view, setView] = useState<string>("calendar");
  //for modal
  const [showActivity, setShowActivity] = useState<boolean>(false);
  //for query
  const [query, setQuery] = useState<string>("");
  //for sideCard
  const [activitiesMonth, setActivitiesMonth] = useState<any>(null);
  //for show filter data
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any>([]);
  //for modal
  const [detailActivities, setDetailActivities] = useState<any>(null);

  //for filter activity by draft or done;
  const [filterBy, setFilterBy] = useState<string>("all");

  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/api/activities/getAllActivities?q=${query}`)
        .then((res) => {
          const allActivities = res.data;
          const structureActivities = allActivities.sort(
            (start: any, end: any) =>
              (new Date(start.end) as any) - (new Date(end.end) as any)
          );
          setActivities(structureActivities);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [filterData, query]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/api/activities/getAllActivities?q=`)
        .then((res) => {
          const allActivities = res.data;
          setActivitiesMonth(allActivities);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const viewDetailActivities = (e: any) => {
    setDetailActivities(e);
    setShowActivity(!showActivity);
  };

  useEffect(() => {
    if (!activities) return; 

    if (filterBy === "all") {
      setActivities(activitiesMonth)
    } else if (filterBy === "draft") {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end) as any) > new Date()
      );
      setActivities(filterActivity)
    } else {
      const filterActivity = activitiesMonth.filter(
        (item: any) => (new Date(item.end) as any) < new Date()
      );
      setActivities(filterActivity)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  return (
    <div className="h-full">
      <Navbar />

      <ModalActivities
        showActivity={showActivity}
        setShowActivity={setShowActivity}
        activity={detailActivities}
      />

      <div className="mt-28 px-5 lg:grid grid-cols-3 gap-16 max-w-[1500px] m-auto">
        <SideCard activities={activitiesMonth} />

        <section className=" col-span-2">
          {activities && (
            <div>
              <Header
                activity={activities}
                view={view}
                setView={setView}
                filterData={filterData}
                setFilterData={setFilterData}
                setQuery={setQuery}
                query={query}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                setFilterItem={setFilterBy}
              />

              {view === "calendar" ? (
                <div className="mt-10">
                  <Calendar
                    localizer={localizer}
                    events={activities}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={(e) => viewDetailActivities(e)}
                    style={{
                      height: 550,
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      padding: "20px",
                    }}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: "#3b82f6",
                        fontSize: "14px",
                      },
                    })}
                    views={["month"]}
                  />
                </div>
              ) : (
                <div className="first:rounded-t-lg">
                  <List activities={activities} 
                setFilterData={setFilterData} setFilterItem={setFilterBy} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Activities;
