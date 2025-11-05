import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_CAMPAIGN, DELETE_CAMPAIGN } from "./actionTypes";
import { deleteCampaign, postCreateCampaign } from "../../../helpers/fakebackend_helper";
import { createCampaignFailed, createCampaignSuccessful, deleteCampaignFailed, deleteCampaignSuccessful } from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createCampaignSaga({ payload: { campaign, history } }) {
	try {
		const response = yield call(postCreateCampaign, campaign);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createCampaignSuccessful(response.message));
			history("/campaign-menu");
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createCampaignFailed(response.message));
		}
	} catch (error) {
		yield put(createCampaignFailed(error));
	}
}

function* deleteCampaignSaga({ payload: { campaignId } }) {
	try {
		const response = yield call(deleteCampaign, campaignId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteCampaignSuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteCampaignFailed(response.message));
		}
	} catch (error) {
		yield put(deleteCampaignFailed(error));
	}
}

function* CreateCampaignMainSaga() {
	yield takeEvery(SAVE_CAMPAIGN, createCampaignSaga);
	yield takeEvery(DELETE_CAMPAIGN, deleteCampaignSaga);
}

export default CreateCampaignMainSaga;
