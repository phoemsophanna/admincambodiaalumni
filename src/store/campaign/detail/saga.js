import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { CAMPAIGN_SHOW_DETAIL } from "./actionTypes";
import { fetchCampaignDetailFail, fetchCampaignDetailSuccess } from "./actions";
import { getCampaignShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchCampaignDetailSaga({ payload: { campaignId } }) {
	try {
		const response = yield call(getCampaignShowDetail, { id: campaignId });
		if (response.status === "success") {
			yield put(fetchCampaignDetailSuccess(response.model));
		} else {
			yield put(fetchCampaignDetailFail(response));
		}
	} catch (error) {
		yield put(fetchCampaignDetailFail(error));
	}
}

function* CampaignDetailSaga() {
	yield takeEvery(CAMPAIGN_SHOW_DETAIL, fetchCampaignDetailSaga);
}

export default CampaignDetailSaga;
