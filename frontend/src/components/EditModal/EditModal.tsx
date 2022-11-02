import { FC, useState } from 'react';
import { apiBaseURL } from '../../constants/index';
import { DataResult } from '../../types/dataResults';
import './editModal.scss';

interface EditModalProps {
  setIsOpenEditModal: (isOpen: boolean) => void;
  data: DataResult[];
  id: string;
  fetchData: () => void;
  setIsError: (isError: boolean) => void;
}

const EditModal: FC<EditModalProps> = ({
  setIsOpenEditModal,
  data,
  id,
  fetchData,
  setIsError,
}) => {
  const item = data.find((item) => item._id === id);
  const [year, setYear] = useState<number | undefined>(item?.year);
  const [effectiveRent, setEffectiveRent] = useState<number | undefined>(
    item?.effectiveRent,
  );
  const [startingRent, setStartingRent] = useState<number | undefined>(
    item?.startingRent,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateData = () => {
    console.log(`${apiBaseURL}/${id}`);
    fetch(`${apiBaseURL}/${id}`, {
      method: 'PATCH',
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
        setIsLoading(false);
        setIsOpenEditModal(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsOpenEditModal(false);
        setIsError(true);
      });
  };

  const submitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    updateData();
  };

  return (
    <div className="edit-modal">
      <div className="edit-form">
        <button
          onClick={() => setIsOpenEditModal(false)}
          disabled={isLoading ? true : false}
          className="close-modal">
          +
        </button>
        <p>Edit data</p>
        <form onSubmit={submitData}>
          <div className="input-box">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              onChange={(e) => setYear(+e.target.value)}
              defaultValue={item?.year}
              min={1}
              id="year"
              name="year"
            />
          </div>
          <div className="input-box">
            <label htmlFor="effectiveRent">Effective Rent</label>
            <input
              type="number"
              min={1}
              onChange={(e) => setEffectiveRent(+e.target.value)}
              defaultValue={item?.effectiveRent}
              id="effectiveRent"
              name="effectiveRent"
            />
          </div>
          <div className="input-box">
            <label htmlFor="startingRent">Starting Rent</label>
            <input
              type="number"
              min={1}
              onChange={(e) => setStartingRent(+e.target.value)}
              defaultValue={item?.startingRent}
              id="startingRent"
              name="startingRent"
            />
          </div>
          <button
            type="submit"
            disabled={
              !year ||
              !effectiveRent ||
              !startingRent ||
              isLoading ||
              (year === item?.year &&
                effectiveRent === item?.effectiveRent &&
                startingRent === item?.startingRent)
                ? true
                : false
            }>
            {isLoading ? 'Loading...' : 'EDIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
