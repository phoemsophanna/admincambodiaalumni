import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_CAMPAIGN_LIST_FLAG, CAMPAIGN_LIST } from "./actionTypes";
import { fetchCampaignListFail, fetchCampaignListSuccess } from "./actions";
import { getCampaignList } from "../../../helpers/fakebackend_helper";

function* fetchCampaignListSaga() {
	try {
		const response = yield call(getCampaignList);
		if (response) {
			yield put(fetchCampaignListSuccess(response.data));
		} else {
			yield put(fetchCampaignListFail(response));
		}
	} catch (error) {
		yield put(fetchCampaignListFail(error));
	}
}

function* refreshCampaignListSaga() {
	try {
		const response = yield call(getCampaignList);
		if (response) {
			yield put(fetchCampaignListSuccess(response.data));
		} else {
			yield put(fetchCampaignListFail(response));
		}
	} catch (error) {
		yield put(fetchCampaignListFail(error));
	}
}

function* CampaignListSaga() {
	yield takeEvery(CAMPAIGN_LIST, fetchCampaignListSaga);
	yield takeEvery(REFRESH_CAMPAIGN_LIST_FLAG, refreshCampaignListSaga);
}

export default CampaignListSaga;
