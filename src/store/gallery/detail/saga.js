import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { GALLERY_SHOW_DETAIL } from "./actionTypes";
import { fetchGalleryDetailFail, fetchGalleryDetailSuccess } from "./actions";
import { getGalleryShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchGalleryDetailSaga({ payload: { campaignCategoryId } }) {
	try {
		const response = yield call(getGalleryShowDetail, { id: campaignCategoryId });
		if (response.status === "success") {
			yield put(fetchGalleryDetailSuccess(response.model));
		} else {
			yield put(fetchGalleryDetailFail(response));
		}
	} catch (error) {
		yield put(fetchGalleryDetailFail(error));
	}
}

function* GalleryDetailSaga() {
	yield takeEvery(GALLERY_SHOW_DETAIL, fetchGalleryDetailSaga);
}

export default GalleryDetailSaga;
