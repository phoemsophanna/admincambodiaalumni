import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PROJECT_SHOW_DETAIL } from "./actionTypes";
import { fetchProjectDetailFail, fetchProjectDetailSuccess } from "./actions";
import { getProjectShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchProjectDetailSaga({ payload: { projectId } }) {
	try {
		const response = yield call(getProjectShowDetail, { id: projectId });
		if (response.status === "success") {
			yield put(fetchProjectDetailSuccess(response.model));
		} else {
			yield put(fetchProjectDetailFail(response));
		}
	} catch (error) {
		yield put(fetchProjectDetailFail(error));
	}
}

function* ProjectDetailSaga() {
	yield takeEvery(PROJECT_SHOW_DETAIL, fetchProjectDetailSaga);
}

export default ProjectDetailSaga;
