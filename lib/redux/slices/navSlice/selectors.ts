/* Instruments */
import type { ReduxState } from '@/lib/redux';

export const selectNavOpen = (state: ReduxState) => state.nav.isOpen;
export const selectPage = (state: ReduxState) => state.nav.page;
export const selectInnerNavOpen = (state: ReduxState) => state.nav.isInnerOpen;
export const selectInnerNavTab = (state: ReduxState) => state.nav.innerNavTab;
export const selectRightNavOpen = (state: ReduxState) => state.nav.rightNavOpen;
export const selectRightNavTab = (state: ReduxState) => state.nav.rightNavTab;
export const selectTrayOpen = (state: ReduxState) => state.nav.trayOpen;
export const selectTrayVisible = (state: ReduxState) => state.nav.trayVisible;
export const selectNavTabOpen = (state: ReduxState) => state.nav.navTabOpen;
export const selectTrayPage = (state: ReduxState) => state.nav.trayPage;
export const selectArrowsEnabled = (state: ReduxState) => state.nav.arrowsEnabled;
