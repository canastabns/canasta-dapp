import React from 'react';

import {Link} from 'react-router-dom';

import style from './style.module.scss';
 
const BaseLink = ({styles={}, onClick=()=>{}, to='', children, ...rest}) => <Link onClick={onClick} to={to} className={`${style.link} ${styles}`} {...rest}>{children}</Link>;

export default BaseLink;
