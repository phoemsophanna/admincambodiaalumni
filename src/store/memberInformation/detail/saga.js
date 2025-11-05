import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { MEMBERINFORMATION_SHOW_DETAIL } from "./actionTypes";
import { fetchMemberInformationDetailFail, fetchMemberInformationDetailSuccess } from "./actions";
import { getMemberInformationShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchMemberInformationDetailSaga({ payload: { memberInformationId } }) {
	try {
		const response = yield call(getMemberInformationShowDetail, { id: memberInformationId });
		if (response.status === "success") {
			yield put(fetchMemberInformationDetailSuccess(response.model));
		} else {
			yield put(fetchMemberInformationDetailFail(response));
		}
	} catch (error) {
		yield put(fetchMemberInformationDetailFail(error));
	}
}

function* memberInformationDetailSaga() {
	yield takeEvery(MEMBERINFORMATION_SHOW_DETAIL, fetchMemberInformationDetailSaga);
}

export default memberInformationDetailSaga;
