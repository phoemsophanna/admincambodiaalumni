import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_VIDEO, DELETE_VIDEO } from "./actionTypes";
import { deleteVideo, postCreateVideo } from "../../../helpers/fakebackend_helper";
import {
	createVideoFailed,
	createVideoSuccessful,
	deleteVideoFailed,
	deleteVideoSuccessful,
} from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createVideoSaga({ payload: { campaignCategory } }) {
	try {
		const response = yield call(postCreateVideo, campaignCategory);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createVideoSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createVideoFailed(response.message));
		}
	} catch (error) {
		yield put(createVideoFailed(error));
	}
}

function* deleteVideoSaga({ payload: { campaignCategoryId } }) {
	try {
		const response = yield call(deleteVideo, campaignCategoryId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteVideoSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteVideoFailed(response.message));
		}
	} catch (error) {
		yield put(deleteVideoFailed(error));
	}
}

function* CreateVideoMainSaga() {
	yield takeEvery(SAVE_VIDEO, createVideoSaga);
	yield takeEvery(DELETE_VIDEO, deleteVideoSaga);
}

export default CreateVideoMainSaga;
