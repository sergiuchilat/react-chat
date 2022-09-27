import { useSelector } from 'react-redux';
export default function CustomSnackbar() {

  const snackbar = useSelector((state) => state.snackBar);

  return (
    <div className={'snackBar'}>
      <h2>{ snackbar.message }</h2>
      <a href={'/'}>Reload</a>
    </div>
  );
}
