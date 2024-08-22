import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { MEMBER_SHOW_DETAIL } from "./actionTypes";
import { fetchMemberDetailFail, fetchMemberDetailSuccess } from "./actions";
import { getMemberShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchMemberDetailSaga({ payload: { memberId } }) {
	try {
		const response = yield call(getMemberShowDetail, { id: memberId });
		if (response.status === "success") {
			yield put(fetchMemberDetailSuccess(response.model));
		} else {
			yield put(fetchMemberDetailFail(response));
		}
	} catch (error) {
		yield put(fetchMemberDetailFail(error));
	}
}

function* memberDetailSaga() {
	yield takeEvery(MEMBER_SHOW_DETAIL, fetchMemberDetailSaga);
}

export default memberDetailSaga;
