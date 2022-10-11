import { useState } from 'react';

export default function Tooltip({ title, children }) {
  const [tooltip, setTooltip] = useState(false);
  const showTooltip = () =>{
    setTooltip(true);
  };
  const closeTooltip = () =>{
    setTooltip(false);
  };
  return (
    <span
      className={'tooltip'}
      onMouseEnter={() => showTooltip()}
      onMouseLeave={() => closeTooltip()}
    >
      {tooltip && <div className={'tooltip-title'}>
        {title}
      </div>}
      {children}
    </span>
  );

}
