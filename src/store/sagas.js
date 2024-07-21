import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ProfileSaga from "./auth/profile/saga";
import ChangePwdSaga from "./auth/changepwd/saga";
import FileStorageSaga from "./fileStorage/saga";
// User Management
import UserListSaga from "./user/list/saga";
import CreateUserMainSaga from "./user/create/saga";
import UserDetailSaga from "./user/detail/saga";
// Performance
import PerformanceListSaga from "./performance/list/saga";
import CreatePerformanceMainSaga from "./performance/create/saga";
import PerformanceDetailSaga from "./performance/detail/saga";
// News
import NewsListSaga from "./news/list/saga";
import CreateNewsMainSaga from "./news/create/saga";
import NewsDetailSaga from "./news/detail/saga";
// Campaign Category
import CampaignCategoryListSaga from "./campaignCategory/list/saga";
import CreateCampaignCategoryMainSaga from "./campaignCategory/create/saga";
import CampaignCategoryDetailSaga from "./campaignCategory/detail/saga";
// Project
import ProjectListSaga from "./project/list/saga";
import CreateProjectMainSaga from "./project/create/saga";
import ProjectDetailSaga from "./project/detail/saga";
// Campaign
import CampaignListSaga from "./campaign/list/saga";
import CreateCampaignMainSaga from "./campaign/create/saga";
import CampaignDetailSaga from "./campaign/detail/saga";
// Testimonial
import TestimonialListSaga from "./testimonial/list/saga";
import CreateTestimonialMainSaga from "./testimonial/create/saga";
import TestimonialDetailSaga from "./testimonial/detail/saga";
// Technology
import TechnologyListSaga from "./technology/list/saga";
import CreateTechnologyMainSaga from "./technology/create/saga";
import TechnologyDetailSaga from "./technology/detail/saga";
// Banner
import BannerListSaga from "./banner/list/saga";
import CreateBannerMainSaga from "./banner/create/saga";
import BannerDetailSaga from "./banner/detail/saga";
// Page Banner
import PageBannerListSaga from "./pageBanner/list/saga";
import CreatePageBannerMainSaga from "./pageBanner/create/saga";
import PageBannerDetailSaga from "./pageBanner/detail/saga";
// Site Setting
import SiteSettingSaga from "./siteSetting/saga";

export default function* rootSaga() {
	yield all([
		//public
		fork(LayoutSaga),
		fork(AccountSaga),
		fork(AuthSaga),
		fork(ProfileSaga),
		fork(ChangePwdSaga),
		fork(FileStorageSaga),
		fork(UserListSaga),
		fork(CreateUserMainSaga),
		fork(UserDetailSaga),
		fork(PerformanceListSaga),
		fork(CreatePerformanceMainSaga),
		fork(PerformanceDetailSaga),
		fork(NewsListSaga),
		fork(CreateNewsMainSaga),
		fork(NewsDetailSaga),
		fork(CampaignCategoryListSaga),
		fork(CreateCampaignCategoryMainSaga),
		fork(CampaignCategoryDetailSaga),
		fork(ProjectListSaga),
		fork(CreateProjectMainSaga),
		fork(ProjectDetailSaga),
		fork(CampaignListSaga),
		fork(CreateCampaignMainSaga),
		fork(CampaignDetailSaga),
		fork(TestimonialListSaga),
		fork(CreateTestimonialMainSaga),
		fork(TestimonialDetailSaga),
		fork(TechnologyListSaga),
		fork(CreateTechnologyMainSaga),
		fork(TechnologyDetailSaga),
		fork(BannerListSaga),
		fork(CreateBannerMainSaga),
		fork(BannerDetailSaga),
		fork(PageBannerListSaga),
		fork(CreatePageBannerMainSaga),
		fork(PageBannerDetailSaga),
		fork(SiteSettingSaga),
	]);
}
