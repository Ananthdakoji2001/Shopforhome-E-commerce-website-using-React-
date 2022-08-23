import React from 'react';
import Menu from './Menu';
// import '../styles.css';

 

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  //ananth
  <div style={{backgroundColor:'white'}}>
    <Menu />
    <div style={{height:'4rem' }}>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
