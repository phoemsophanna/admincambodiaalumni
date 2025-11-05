import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { VIDEO_SHOW_DETAIL } from "./actionTypes";
import { fetchVideoDetailFail, fetchVideoDetailSuccess } from "./actions";
import { getVideoShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchVideoDetailSaga({ payload: { campaignCategoryId } }) {
	try {
		const response = yield call(getVideoShowDetail, { id: campaignCategoryId });
		if (response.status === "success") {
			yield put(fetchVideoDetailSuccess(response.model));
		} else {
			yield put(fetchVideoDetailFail(response));
		}
	} catch (error) {
		yield put(fetchVideoDetailFail(error));
	}
}

function* VideoDetailSaga() {
	yield takeEvery(VIDEO_SHOW_DETAIL, fetchVideoDetailSaga);
}

export default VideoDetailSaga;
