
export const openModal = (state, message) => {
	state.modalMessage = message;
	state.modalShow = true;
};

export const closeModal = state => {
	state.modalShow = false;
};
