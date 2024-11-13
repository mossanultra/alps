// Button.tsx
import React, { FC, ReactNode } from 'react';
import styles from './send-button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: ()=>void;
}

const Button: FC<ButtonProps> = ({ children ,onClick}) => {
  return <button className={styles.button} onClick={onClick}>{children}</button>;
};

export default Button;
