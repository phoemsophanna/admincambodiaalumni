import { APIClient } from "./api_helper";
import * as url from "./url_helper";
const api = new APIClient();
// Gets the logged in user data from local session
export const getLoggedInUser = () => {
	const user = localStorage.getItem("user");
	if (user) return JSON.parse(user);
	return null;
};
// //is user is logged in
export const isUserAuthenticated = () => {
	return getLoggedInUser() !== null;
};
// Register Method
export const postFakeRegister = (data) => api.create(url.POST_FAKE_REGISTER, data);
// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);
// postForgetPwd
export const postFakeForgetPwd = (data) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);
// Edit profile
export const postJwtProfile = (data) => api.create(url.POST_EDIT_JWT_PROFILE, data);
export const postFakeProfile = (data) => api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);
// Register Method
export const postJwtRegister = (url, data) => {
	return api.create(url, data).catch((err) => {
		var message;
		if (err.response && err.response.status) {
			switch (err.response.status) {
				case 404:
					message = "Sorry! the page you are looking for could not be found";
					break;
				case 500:
					message = "Sorry! something went wrong, please contact our support team";
					break;
				case 401:
					message = "Invalid credentials";
					break;
				default:
					message = err[1];
					break;
			}
		}
		throw message;
	});
};
// Login Method
export const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);
// postForgetPwd
export const postJwtForgetPwd = (data) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);
// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);
// User
export const postLogin = (data) => api.create(url.POST_LOGIN, data);
export const getUserDetail = () => api.get(url.USER_DETAIL, null);
export const putUpdateUser = (body) => api.put(url.UPDATE_USER, body);
export const putChangePwdUser = (body) => api.put(url.UPDATE_PWD_USER, body);
// File Storage
export const postFileStorage = (body) => api.create(url.FILE_STORAGE_UPLOAD, body);
// User Management
export const getUserList = () => api.get(url.USER_MANAGEMENT_URI, null);
export const postCreateUser = (body) => api.create(url.USER_MANAGEMENT_URI, body);
export const getUserShowDetail = (param) => api.get(`${url.USER_MANAGEMENT_URI}/detail`, param);
export const deleteUser = (userId) => api.delete(`${url.USER_MANAGEMENT_URI}/delete/${userId}`, null);
// Performance Management
export const getPerformanceList = () => api.get(url.PERFORMANCE_MANAGEMENT_URI, null);
export const postCreatePerformance = (body) => api.create(url.PERFORMANCE_MANAGEMENT_URI, body);
export const getPerformanceShowDetail = (param) => api.get(`${url.PERFORMANCE_MANAGEMENT_URI}/detail`, param);
export const deletePerformance = (userId) => api.delete(`${url.PERFORMANCE_MANAGEMENT_URI}/delete/${userId}`, null);
// News Management
export const getNewsList = () => api.get(url.NEWS_MANAGEMENT_URI, null);
export const postCreateNews = (body) => api.create(url.NEWS_MANAGEMENT_URI, body);
export const getNewsShowDetail = (param) => api.get(`${url.NEWS_MANAGEMENT_URI}/detail`, param);
export const deleteNews = (userId) => api.delete(`${url.NEWS_MANAGEMENT_URI}/delete/${userId}`, null);
// Campaign Category Management
export const getCampaignCategoryList = () => api.get(url.PROJECT_CATEGORY_MANAGEMENT_URI, null);
export const postCreateCampaignCategory = (body) => api.create(url.PROJECT_CATEGORY_MANAGEMENT_URI, body);
export const getCampaignCategoryShowDetail = (param) => api.get(`${url.PROJECT_CATEGORY_MANAGEMENT_URI}/detail`, param);
export const deleteCampaignCategory = (userId) => api.delete(`${url.PROJECT_CATEGORY_MANAGEMENT_URI}/delete/${userId}`, null);
// Project Management
export const getProjectList = () => api.get(url.PROJECT_MANAGEMENT_URI, null);
export const postCreateProject = (body) => api.create(url.PROJECT_MANAGEMENT_URI, body);
export const getProjectShowDetail = (param) => api.get(`${url.PROJECT_MANAGEMENT_URI}/detail`, param);
export const deleteProject = (userId) => api.delete(`${url.PROJECT_MANAGEMENT_URI}/delete/${userId}`, null);
// Campaign Management
export const getCampaignList = () => api.get(url.CAMPAIGN_MANAGEMENT_URI, null);
export const postCreateCampaign = (body) => api.create(url.CAMPAIGN_MANAGEMENT_URI, body);
export const getCampaignShowDetail = (param) => api.get(`${url.CAMPAIGN_MANAGEMENT_URI}/detail`, param);
export const deleteCampaign = (userId) => api.delete(`${url.CAMPAIGN_MANAGEMENT_URI}/delete/${userId}`, null);
// Testimonial Management
export const getTestimonialList = () => api.get(url.TESTIMONIAL_URI, null);
export const postCreateTestimonial = (body) => api.create(url.TESTIMONIAL_URI, body);
export const getTestimonialShowDetail = (param) => api.get(`${url.TESTIMONIAL_URI}/detail`, param);
export const deleteTestimonial = (userId) => api.delete(`${url.TESTIMONIAL_URI}/delete/${userId}`, null);
// Partner Management
export const getPartnerList = () => api.get(url.TECHNOLOGY_URI, null);
export const postCreatePartner = (body) => api.create(url.TECHNOLOGY_URI, body);
export const getPartnerShowDetail = (param) => api.get(`${url.TECHNOLOGY_URI}/detail`, param);
export const deletePartner = (userId) => api.delete(`${url.TECHNOLOGY_URI}/delete/${userId}`, null);
// Banner Management
export const getBannerList = () => api.get(url.BANNERS_URI, null);
export const postCreateBanner = (body) => api.create(url.BANNERS_URI, body);
export const getBannerShowDetail = (param) => api.get(`${url.BANNERS_URI}/detail`, param);
export const deleteBanner = (userId) => api.delete(`${url.BANNERS_URI}/delete/${userId}`, null);
// Site Setting Management
export const getSiteSettingDetail = (type) => api.get(`${url.SITE_SETTING_URI}/${type}`, null);
export const postSaveSiteSetting = (body) => api.create(url.SITE_SETTING_URI, body);
// PageBanner Management
export const getPageBannerList = () => api.get(url.PAGE_BANNER_URI, null);
export const postCreatePageBanner = (body) => api.create(url.PAGE_BANNER_URI, body);
export const getPageBannerShowDetail = (param) => api.get(`${url.PAGE_BANNER_URI}/detail`, param);
export const deletePageBanner = (userId) => api.delete(`${url.PAGE_BANNER_URI}/delete/${userId}`, null);
