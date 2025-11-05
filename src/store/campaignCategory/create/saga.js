import { call, delay, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { SAVE_PROJECT_CATEGORY, DELETE_PROJECT_CATEGORY } from "./actionTypes";
import { deleteCampaignCategory, postCreateCampaignCategory } from "../../../helpers/fakebackend_helper";
import {
	createCampaignCategoryFailed,
	createCampaignCategorySuccessful,
	deleteCampaignCategoryFailed,
	deleteCampaignCategorySuccessful,
} from "./actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* createCampaignCategorySaga({ payload: { campaignCategory } }) {
	try {
		const response = yield call(postCreateCampaignCategory, campaignCategory);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(createCampaignCategorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(createCampaignCategoryFailed(response.message));
		}
	} catch (error) {
		yield put(createCampaignCategoryFailed(error));
	}
}

function* deleteCampaignCategorySaga({ payload: { campaignCategoryId } }) {
	try {
		const response = yield call(deleteCampaignCategory, campaignCategoryId);
		if (response.status === "success") {
			toast.success(response.message, { autoClose: 3000 });
			yield put(deleteCampaignCategorySuccessful(response.message));
		} else {
			toast.error(response.message, { autoClose: 3000 });
			yield put(deleteCampaignCategoryFailed(response.message));
		}
	} catch (error) {
		yield put(deleteCampaignCategoryFailed(error));
	}
}

function* CreateCampaignCategoryMainSaga() {
	yield takeEvery(SAVE_PROJECT_CATEGORY, createCampaignCategorySaga);
	yield takeEvery(DELETE_PROJECT_CATEGORY, deleteCampaignCategorySaga);
}

export default CreateCampaignCategoryMainSaga;
