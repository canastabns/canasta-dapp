let app = 'app';

export const setAppName = name => app = name;

export const createReduxName = name => `${app}/${name}`;

export const createActionName = name => `${app}/${name}`;

export const createActionCreator = (type, payload) => ({type, payload});
