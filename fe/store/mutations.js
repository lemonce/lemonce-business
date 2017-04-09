export const updateUser = (state, user) => {
    state.user = user;
};

export const logout = state => {
    state.user = null;
};

export const updateLimitList = (state, list) => {
    state.limitList = list;
};

export const openModal = (state, message) => {
    state.modalMessage = message;
    state.modalShow = true;
};

export const closeModal = state => {
    state.modalShow = false;
};
