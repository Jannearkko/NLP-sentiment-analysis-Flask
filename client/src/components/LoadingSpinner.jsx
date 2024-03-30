import { ReactComponent as Spinner } from '../icons/cogwheel.svg';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <Spinner className="animate-spin h-5 w-5" />
    </div>
  );
}

export default LoadingSpinner;