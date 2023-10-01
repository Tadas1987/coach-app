import { Dispatch, FC, SetStateAction } from 'react';
import {  MdChevronRight } from 'react-icons/md';

interface Props {
  handleExpand: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
}

export const ExpandButton: FC<Props> = (props) => {
  const {handleExpand, isExpanded} = props;
  const buttonClass = isExpanded ? 'expand-button expand-button-expanded' : 'expand-button';

  return (
    <button onClick={() => handleExpand(!isExpanded)} className={buttonClass}>
      <MdChevronRight />
    </button>
  );
};
