import { FC, useState } from 'react';
import { apiBaseURL } from '../../constants/index';
import './deleteModal.scss';

interface DeleteModalProps {
  setIsOpenDeleteModal: (isOpen: boolean) => void;
  id: string;
  fetchData: () => void;
  setIsError: (isError: boolean) => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  setIsOpenDeleteModal,
  id,
  fetchData,
  setIsError,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteData = () => {
    setIsLoading(true);
    fetch(`${apiBaseURL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchData();
      })
      .then(() => {
        setIsLoading(false);
        setIsOpenDeleteModal(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsOpenDeleteModal(false);
        setIsError(true);
      });
  };

  return (
    <div className="delete-modal">
      <div className="delete-box">
        <button
          onClick={() => setIsOpenDeleteModal(false)}
          disabled={isLoading ? true : false}
          className="close-modal">
          +
        </button>
        <div className="delete-question">
          <p>Delete rent data</p>
          <p>Are you sure you want to delete this rent data?</p>
        </div>
        <div className="buttons">
          <button
            onClick={() => setIsOpenDeleteModal(false)}
            disabled={isLoading ? true : false}>
            No
          </button>
          <button
            onClick={() => {
              deleteData();
            }}
            disabled={isLoading ? true : false}>
            {isLoading ? 'Loading...' : 'Yes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
