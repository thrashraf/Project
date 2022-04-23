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
  const [activities, setActivities] = useState<any>(null);
  const [view, setView] = useState<string>("calendar");
  const [showActivity, setShowActivity] = useState<boolean>(false);

  const [detailActivities, setDetailActivities] = useState<any>(null);
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("/api/activities/getAllActivities")
        .then((res) => {
          const allActivities = res.data.allActivities;
          // const structureActivities = allActivities.map((data: any) => {
          //   return {
          //     ...data,
          //     start: new Date(data.start),
          //     end: new Date(data.end),
          //   };
          // });
          setActivities(allActivities);
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

  return (
    <div className="h-full">
      <Navbar />

      <ModalActivities
        showActivity={showActivity}
        setShowActivity={setShowActivity}
        activity={detailActivities}
      />

      <div className="mt-28 px-5 lg:grid grid-cols-3 gap-16 max-w-[1500px] m-auto">
        <SideCard activities={activities} />

        <section className=" col-span-2">
          {activities && (
            <div>
              <Header view={view} setView={setView} />

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
                <div className="first:rounded-t-lg mt-10">
                  <List activities={activities} />
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
