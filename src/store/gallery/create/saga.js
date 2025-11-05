import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_GALLERY, DELETE_GALLERY } from "./actionTypes";
import { deleteGallery, postCreateGallery } from "../../../helpers/fakebackend_helper";
import {
	createGalleryFailed,
	createGallerySuccessful,
	deleteGalleryFailed,
	deleteGallerySuccessful,
} from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createGallerySaga({ payload: { campaignCategory } }) {
	try {
		const response = yield call(postCreateGallery, campaignCategory);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createGallerySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createGalleryFailed(response.message));
		}
	} catch (error) {
		yield put(createGalleryFailed(error));
	}
}

function* deleteGallerySaga({ payload: { campaignCategoryId } }) {
	try {
		const response = yield call(deleteGallery, campaignCategoryId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteGallerySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteGalleryFailed(response.message));
		}
	} catch (error) {
		yield put(deleteGalleryFailed(error));
	}
}

function* CreateGalleryMainSaga() {
	yield takeEvery(SAVE_GALLERY, createGallerySaga);
	yield takeEvery(DELETE_GALLERY, deleteGallerySaga);
}

export default CreateGalleryMainSaga;
