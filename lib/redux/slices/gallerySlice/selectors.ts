/* Instruments */
import type { ReduxState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGalleryList = (state: ReduxState) => state.gallery.gallerylist;
export const selectGalleryObjects = (state: ReduxState) => state.gallery.objects;
export const selectGalleryScratch = (state: ReduxState) => state.gallery.scratch;
export const selectGalleryEditor = (state: ReduxState) => state.gallery.editor;
export const selectGalleryModal = (state: ReduxState) => state.gallery.modal;
export const selectGallerySelection = (state: ReduxState) => state.gallery.selectedlist;
export const selectGalleryMoveTarget = (state: ReduxState) => state.gallery.moveTarget;