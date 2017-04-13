export const isLoggedIn = state => {
    return Boolean(state.user);
};

export const user = state => {
    return state.user;
};

export const bindList = state => {
    return state.limit.bindList;
};

export const limitInfo = state => {
    return state.limit.info;
};

export const modalShow = state => {
    return state.modalShow;
};

export const modalMessage = state => {
    return state.modalMessage;
}