import React from 'react';
import styles from './detail.module.css';

const MarkerDetail: React.FC = () => {
  return (
    <>
      <h1 className={styles.title}>Your Content</h1>
      <div className={styles.outerMenu}>
        <input className={styles.checkboxToggle} type="checkbox" />
        <div className={styles.hamburger}>
          <div></div>
        </div>
        <div className={styles.menu}>
          <div>
            <div>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkerDetail;
