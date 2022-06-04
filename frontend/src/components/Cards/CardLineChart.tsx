import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { activitiesSelector } from '../../features/activities/Activities';
import { adminSelector } from '../../features/admin/Admin';
import { innovationSelector } from '../../features/Innovation/Innovation';
import { publicationSelector } from '../../features/Publication/Publication';
import { useAppSelector } from '../../app/hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CardLineChart() {
  const { eventKpi, publicationKpi, innovationKpi }: any =
    useAppSelector(adminSelector);

  const { activities } = useAppSelector(activitiesSelector);
  const { allPublication } = useAppSelector(publicationSelector);
  const { allInnovation } = useAppSelector(innovationSelector);

  const actual = [
    allPublication?.filter(
      (item: any) =>
        new Date(item.year).getFullYear() === new Date().getFullYear()
    ).length,
    allInnovation?.filter(
      (item: any) =>
        new Date(item.year).getFullYear() === new Date().getFullYear()
    ).length,
    activities?.filter(
      (item: any) =>
        new Date(item.year).getFullYear() === new Date().getFullYear()
    ).length,
  ];

  const target = [eventKpi, publicationKpi, innovationKpi];
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white'>
        <div className='rounded-t mb-0 px-4 py-3 bg-transparent'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full max-w-full flex-grow flex-1'>
              <h6 className='uppercase mb-1 text-xs font-semibold'>
                KPI Overview
              </h6>
              <h2 className='text-black text-xl font-semibold'></h2>
            </div>
          </div>
        </div>
        <div className='p-4 flex-auto'>
          {/* Chart */}
          <div className='relative h-350-px text-white'>
            {target && actual ? (
              <Bar
                data={{
                  labels: ['Events', 'Publications', 'Innovation'],
                  datasets: [
                    {
                      label: 'Actual',
                      backgroundColor: '#FFCE56',
                      data: actual,
                      xAxisID: 'bar-x-axis2',
                      stack: 'background',
                    },

                    {
                      label: 'Target',
                      backgroundColor: '#36A2EB',
                      data: target,
                      xAxisID: 'bar-x-axis1',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  aspectRatio: 2,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        padding: 40,
                      },
                    },
                  },
                  scales: {
                    label: {
                      display: false, // Hide X axis labels
                    },
                  },
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
