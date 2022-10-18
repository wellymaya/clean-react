import React from 'react';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: Props) => {
  return (
    <div>
      <div className={Styles.inputWrap}>
        <input {...props} />
        <span className={Styles.status}>🔴</span>
      </div>
    </div>
  );
};

export default Input;
