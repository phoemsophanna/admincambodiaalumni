import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { REFRESH_PROJECT_CATEGORY_LIST_FLAG, PROJECT_CATEGORY_LIST } from "./actionTypes";
import { fetchCampaignCategoryListFail, fetchCampaignCategoryListSuccess } from "./actions";
import { getCampaignCategoryList } from "../../../helpers/fakebackend_helper";

function* fetchCampaignCategoryListSaga() {
	try {
		const response = yield call(getCampaignCategoryList);
		if (response) {
			yield put(fetchCampaignCategoryListSuccess(response.data));
		} else {
			yield put(fetchCampaignCategoryListFail(response));
		}
	} catch (error) {
		yield put(fetchCampaignCategoryListFail(error));
	}
}

function* refreshCampaignCategoryListSaga() {
	try {
		const response = yield call(getCampaignCategoryList);
		if (response) {
			yield put(fetchCampaignCategoryListSuccess(response.data));
		} else {
			yield put(fetchCampaignCategoryListFail(response));
		}
	} catch (error) {
		yield put(fetchCampaignCategoryListFail(error));
	}
}

function* CampaignCategoryListSaga() {
	yield takeEvery(PROJECT_CATEGORY_LIST, fetchCampaignCategoryListSaga);
	yield takeEvery(REFRESH_PROJECT_CATEGORY_LIST_FLAG, refreshCampaignCategoryListSaga);
}

export default CampaignCategoryListSaga;
