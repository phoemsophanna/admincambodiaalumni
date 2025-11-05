import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_GALLERY_LIST_FLAG, GALLERY_LIST } from "./actionTypes";
import { fetchGalleryListFail, fetchGalleryListSuccess } from "./actions";
import { getGalleryList } from "../../../helpers/fakebackend_helper";

function* fetchGalleryListSaga() {
	try {
		const response = yield call(getGalleryList);
		if (response) {
			yield put(fetchGalleryListSuccess(response.data));
		} else {
			yield put(fetchGalleryListFail(response));
		}
	} catch (error) {
		yield put(fetchGalleryListFail(error));
	}
}

function* refreshGalleryListSaga() {
	try {
		const response = yield call(getGalleryList);
		if (response) {
			yield put(fetchGalleryListSuccess(response.data));
		} else {
			yield put(fetchGalleryListFail(response));
		}
	} catch (error) {
		yield put(fetchGalleryListFail(error));
	}
}

function* GalleryListSaga() {
	yield takeEvery(GALLERY_LIST, fetchGalleryListSaga);
	yield takeEvery(REFRESH_GALLERY_LIST_FLAG, refreshGalleryListSaga);
}

export default GalleryListSaga;
