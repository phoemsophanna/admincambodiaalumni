import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_VIDEO_LIST_FLAG, VIDEO_LIST } from "./actionTypes";
import { fetchVideoListFail, fetchVideoListSuccess } from "./actions";
import { getVideoList } from "../../../helpers/fakebackend_helper";

function* fetchVideoListSaga() {
	try {
		const response = yield call(getVideoList);
		if (response) {
			yield put(fetchVideoListSuccess(response.data));
		} else {
			yield put(fetchVideoListFail(response));
		}
	} catch (error) {
		yield put(fetchVideoListFail(error));
	}
}

function* refreshVideoListSaga() {
	try {
		const response = yield call(getVideoList);
		if (response) {
			yield put(fetchVideoListSuccess(response.data));
		} else {
			yield put(fetchVideoListFail(response));
		}
	} catch (error) {
		yield put(fetchVideoListFail(error));
	}
}

function* VideoListSaga() {
	yield takeEvery(VIDEO_LIST, fetchVideoListSaga);
	yield takeEvery(REFRESH_VIDEO_LIST_FLAG, refreshVideoListSaga);
}

export default VideoListSaga;
