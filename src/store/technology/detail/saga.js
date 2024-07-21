import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { TECHNOLOGY_SHOW_DETAIL } from "./actionTypes";
import { fetchTechnologyDetailFail, fetchTechnologyDetailSuccess } from "./actions";
import { getTechnologyShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchTechnologyDetailSaga({ payload: { technologyId } }) {
	try {
		const response = yield call(getTechnologyShowDetail, { id: technologyId });
		if (response.status === "success") {
			yield put(fetchTechnologyDetailSuccess(response.model));
		} else {
			yield put(fetchTechnologyDetailFail(response));
		}
	} catch (error) {
		yield put(fetchTechnologyDetailFail(error));
	}
}

function* TechnologyDetailSaga() {
	yield takeEvery(TECHNOLOGY_SHOW_DETAIL, fetchTechnologyDetailSaga);
}

export default TechnologyDetailSaga;
