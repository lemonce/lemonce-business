
export const openModal = (state, message) => {
	state.modalMessage = message;
	state.modalShow = true;
};

export const closeModal = state => {
	state.modalShow = false;
};

export const toggleNavList = state => {
	state.showNavList = !state.showNavList;
};

export const hideNavList = state => {
	state.showNavList = false;
};
