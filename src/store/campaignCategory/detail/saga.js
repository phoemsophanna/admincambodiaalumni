import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { PROJECT_CATEGORY_SHOW_DETAIL } from "./actionTypes";
import { fetchCampaignCategoryDetailFail, fetchCampaignCategoryDetailSuccess } from "./actions";
import { getCampaignCategoryShowDetail } from "../../../helpers/fakebackend_helper";

function* fetchCampaignCategoryDetailSaga({ payload: { campaignCategoryId } }) {
	try {
		const response = yield call(getCampaignCategoryShowDetail, { id: campaignCategoryId });
		if (response.status === "success") {
			yield put(fetchCampaignCategoryDetailSuccess(response.model));
		} else {
			yield put(fetchCampaignCategoryDetailFail(response));
		}
	} catch (error) {
		yield put(fetchCampaignCategoryDetailFail(error));
	}
}

function* CampaignCategoryDetailSaga() {
	yield takeEvery(PROJECT_CATEGORY_SHOW_DETAIL, fetchCampaignCategoryDetailSaga);
}

export default CampaignCategoryDetailSaga;
