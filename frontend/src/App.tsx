import { FC, useState, useEffect } from 'react';
import AddNewDataModal from './components/AddNewDataModal/AddNewDataModal';
import BarChart from './components/Chart/BarChart';
import DeleteModal from './components/DeleteModal/DeleteModal';
import EditModal from './components/EditModal/EditModal';
import Table from './components/Table/Table';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import { apiBaseURL } from './constants';
import { DataResult } from './types/dataResults';
import { BarChartProps } from './types/barChart';
import { initialChartData } from './constants/initialChartData';

const App: FC = () => {
  const [data, setData] = useState<DataResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [chartData, setChartData] = useState<BarChartProps>();

  const [isError, setIsError] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenAddNewDataModal, setIsOpenAddNewDataModal] =
    useState<boolean>(false);

  const fetchData = () => {
    setLoading(true);
    fetch(apiBaseURL as string)
      .then((response) => response.json())
      .then((dataRes: DataResult[]) => {
        const sortedData = dataRes.sort((a, b) => (a.year > b.year ? 1 : -1));
        setData(sortedData);
        setChartData({
          labels: sortedData.map((sortedData: DataResult) => +sortedData.year),
          datasets: [
            {
              label: 'Effective Rent',
              data: sortedData.map(
                (sortedData: DataResult) => +sortedData.effectiveRent,
              ),
              backgroundColor: '#ffbb11',
              fill: true,
            },
            {
              label: 'Starting Rent',
              data: sortedData.map(
                (sortedData: DataResult) => +sortedData.startingRent,
              ),
              backgroundColor: '#50AF95',
              fill: true,
            },
          ],
        });
      })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      {isError && <ErrorAlert setIsError={setIsError} />}
      <Table
        data={data}
        setIsOpenEditModal={setIsOpenEditModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        setIsOpenAddNewDataModal={setIsOpenAddNewDataModal}
        setId={setId}
        loading={loading}
      />
      {chartData ? (
        <BarChart chartData={chartData} />
      ) : (
        <BarChart chartData={initialChartData} />
      )}
      {isOpenEditModal && (
        <EditModal
          setIsOpenEditModal={setIsOpenEditModal}
          data={data}
          id={id}
          fetchData={fetchData}
          setIsError={setIsError}
        />
      )}
      {isOpenDeleteModal && (
        <DeleteModal
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          id={id}
          fetchData={fetchData}
          setIsError={setIsError}
        />
      )}
      {isOpenAddNewDataModal && (
        <AddNewDataModal
          fetchData={fetchData}
          setIsOpenAddNewDataModal={setIsOpenAddNewDataModal}
          setIsError={setIsError}
        />
      )}
    </main>
  );
};

export default App;
