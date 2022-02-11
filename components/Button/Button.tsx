import React from 'react';
import Test from './Test';
import styles from './index.less';

console.log(styles, 'styles');

export default function Button({ name }: { name: string }) {
  return (
    <>
      <div className='name'>Button11 {name}</div>
      <Test />
    </>
  );
}
