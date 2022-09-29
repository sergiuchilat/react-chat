import { useRef } from 'react';
import attachment from '../../assets/img/icons/attachment.svg';
import Tooltip from './Tooltip';

export default function FileUploader() {
  const fileInput = useRef(null);
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    console.log(fileUploaded);
  };
  return (
    <>
      <button
        onClick={() => handleClick()}
        className={'send-message'}
      >
        <img
          width={25}
          height={25}
          src={attachment}
          alt={'attachment'}
        />
      </button>

      <input
        ref={fileInput}
        style={{ display: 'none' }}
        type={'file'}
        onChange={(files) => handleChange(files)}
        multiple
      />
    </>
  );
}
