/* Instruments */
import type { ReduxState } from '@/lib/redux';

export const selectModalPage = (state: ReduxState) => state.modal.page;
export const selectModalOpen = (state: ReduxState) => state.modal.isOpen;
export const selectModalTrayOpen = (state: ReduxState) => state.modal.trayOpen;
export const selectModalTrayVisible = (state: ReduxState) => state.modal.trayVisible;
export const selectModalTrayPage = (state: ReduxState) => state.modal.trayPage;