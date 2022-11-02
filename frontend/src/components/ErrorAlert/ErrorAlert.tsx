import { FC } from 'react';
import './errorAlert.scss';

interface ErrorAlertProps {
  setIsError: (isError: boolean) => void;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ setIsError }) => {
  return (
    <div className="error-alert">
      <button className="error-close-button" onClick={() => setIsError(false)}>
        +
      </button>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
};

export default ErrorAlert;
