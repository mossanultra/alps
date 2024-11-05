import React, { ReactNode, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './modal-dialog.module.css';

type ModalDialogProps = {
  onClose: () => void;
  children: ReactNode;
};

const ModalDialog: React.FC<ModalDialogProps> = ({ onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // モーダル表示時にアニメーション開始
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <animated.div style={animation} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        {/* <button className={styles.closeButton} onClick={onClose}>閉じる</button> */}
      </animated.div>
    </div>
  );
};

export default ModalDialog;
