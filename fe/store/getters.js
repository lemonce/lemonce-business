export const isLoggedIn = state => {
    return Boolean(state.user);
};

export const user = state => {
    return state.user;
};

export const limitList = state => {
    return state.limitList;
};

export const totalLimitCnt = state => {
    return state.limitList.length;
};

export const bindedLimitCnt = state => {
    return state.limitList.filter(limit => limit.machineCode).length;
};

export const unbindedLimitCnt = (state, getters) => {
    return getters.totalLimitCnt - getters.bindedLimitCnt;
};

export const modalShow = state => {
    return state.modalShow;
};

export const modalMessage = state => {
    return state.modalMessage;
}