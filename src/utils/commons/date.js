import moment from 'moment';

export const parseDateToAppFormat = date => date && moment(date, 'DD/MM/YYYY HH:mm:ss');
