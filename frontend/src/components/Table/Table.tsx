import { FC } from 'react';
import { DataResult } from '../../types/dataResults';
import Spinner from '../Spinner/Spinner';
import './table.scss';

interface TableData {
  data: DataResult[];
  setIsOpenEditModal: (isOpen: boolean) => void;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
  setIsOpenAddNewDataModal: (isOpen: boolean) => void;
  setId: (id: string) => void;
  loading: boolean;
}

const Table: FC<TableData> = ({
  data,
  setIsOpenEditModal,
  setIsOpenDeleteModal,
  setIsOpenAddNewDataModal,
  setId,
  loading,
}) => {
  const handleEdit: (id: string) => void = (id) => {
    setIsOpenEditModal(true);
    setId(id);
  };

  const handleDelete: (id: string) => void = (id) => {
    setIsOpenDeleteModal(true);
    setId(id);
  };

  return (
    <div className="table-with-data">
      {!loading ? (
        <div className="table-header">
          <h2>Rent Data</h2>
          <button onClick={() => setIsOpenAddNewDataModal(true)}>ADD</button>
        </div>
      ) : (
        <div className="table-header">
          <h2>Rent Data is loading...</h2>
        </div>
      )}

      <div className="table-wrapper">
        <table>
          <tbody>
            <tr>
              <th>Year</th>
              <th>Effective Rent</th>
              <th>Starting Rent</th>
              <th>Edit Data</th>
              <th>Delete Data</th>
            </tr>
            {!loading &&
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.year}</td>
                  <td>{item.effectiveRent}</td>
                  <td>{item.startingRent}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="edit-bttn">
                      EDIT
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="delete-bttn">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default Table;
