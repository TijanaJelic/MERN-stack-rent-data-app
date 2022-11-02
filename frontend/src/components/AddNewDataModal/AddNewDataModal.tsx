import { useState, FC } from 'react';
import { apiBaseURL } from '../../constants/index';
import './addNewData.scss';

interface PostDataProps {
  fetchData: () => void;
  setIsOpenAddNewDataModal: (isOpen: boolean) => void;
  setIsError: (isError: boolean) => void;
}

const AddNewDataModal: FC<PostDataProps> = ({
  fetchData,
  setIsOpenAddNewDataModal,
  setIsError,
}) => {
  const [year, setYear] = useState<number>();
  const [effectiveRent, setEffectiveRent] = useState<number>();
  const [startingRent, setStartingRent] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const postData = () => {
    fetch(apiBaseURL as string, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        year: year,
        effectiveRent: effectiveRent,
        startingRent: startingRent,
      }),
    })
      .then(() => {
        fetchData();
      })
      .then(() => {
        setIsOpenAddNewDataModal(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsOpenAddNewDataModal(false);
        setIsError(true);
      });
  };

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    postData();
  };

  return (
    <div className="add-new-data-modal">
      <div className="add-new-data-box">
        <div className="add-new-data-form">
          <button
            onClick={() => setIsOpenAddNewDataModal(false)}
            disabled={isLoading ? true : false}
            className="close-modal">
            +
          </button>
          <p>Add new data</p>
          <form onSubmit={(e) => submitData(e)}>
            <div className="input-box">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                min={0}
                name="year"
                id="year"
                placeholder="Year"
                onChange={(e) => setYear(+e.target.value)}
                value={year || ''}
              />
            </div>
            <div className="input-box">
              <label htmlFor="effectiveRent">Effective Rent</label>
              <input
                type="number"
                min={0}
                name="effectiveRent"
                id="effectiveRent"
                placeholder="Effective Rent"
                onChange={(e) => setEffectiveRent(+e.target.value)}
                value={effectiveRent || ''}
              />
            </div>
            <div className="input-box">
              <label htmlFor="startingRent">Starting Rent</label>
              <input
                type="number"
                min={0}
                name="startingRent"
                id="startingRent"
                placeholder="Starting Rent"
                onChange={(e) => setStartingRent(+e.target.value)}
                value={startingRent || ''}
              />
            </div>
            <button
              type="submit"
              disabled={
                !year || !effectiveRent || !startingRent || isLoading
                  ? true
                  : false
              }>
              {isLoading ? 'Loading...' : 'ADD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewDataModal;
