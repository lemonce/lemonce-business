export const updateUser = (state, user) => {
    state.user = user;
};

export const logout = state => {
    state.user = null;
};

export const updateBindList = (state, list) => {
    state.limit.bindList = list;
};

export const updateLimitInfo = (state, info) => {
    state.limit.info = info;
}

export const openModal = (state, message) => {
    state.modalMessage = message;
    state.modalShow = true;
};

export const closeModal = state => {
    state.modalShow = false;
};
