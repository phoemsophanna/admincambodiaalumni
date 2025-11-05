import { combineReducers } from "redux";

// Front
import Layout from "./layouts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import Profile from "./auth/profile/reducer";
import ChangePwdUser from "./auth/changepwd/reducer";
// File Storage
import FileStorage from "./fileStorage/reducer";
// User Management
import UserListReducer from "./user/list/reducer";
import CreateUserReducer from "./user/create/reducer";
import UserDetailReducer from "./user/detail/reducer";
// Member Management
import MemberListReducer from "./member/list/reducer";
import CreateMemberReducer from "./member/create/reducer";
import MemberDetailReducer from "./member/detail/reducer";
// Member Information
import CreateMemberInformationReducer from "./memberInformation/create/reducer";
import MemberInformationDetailReducer from "./memberInformation/detail/reducer";

import PerformanceListReducer from "./performance/list/reducer";
import CreatePerformanceReducer from "./performance/create/reducer";
import PerformanceDetailReducer from "./performance/detail/reducer";
import NewsListReducer from "./news/list/reducer";
import CreateNewsReducer from "./news/create/reducer";
import NewsDetailReducer from "./news/detail/reducer";
import CampaignCategoryListReducer from "./campaignCategory/list/reducer";
import CreateCampaignCategoryReducer from "./campaignCategory/create/reducer";
import CampaignCategoryDetailReducer from "./campaignCategory/detail/reducer";
import TeamListReducer from "./team/list/reducer";
import CreateTeamReducer from "./team/create/reducer";
import TeamDetailReducer from "./team/detail/reducer";
import ProjectListReducer from "./project/list/reducer";
import CreateProjectReducer from "./project/create/reducer";
import ProjectDetailReducer from "./project/detail/reducer";
import CampaignListReducer from "./campaign/list/reducer";
import CreateCampaignReducer from "./campaign/create/reducer";
import CampaignDetailReducer from "./campaign/detail/reducer";
import WithdrawListReducer from "./withdraw/list/reducer";
import CreateWithdrawReducer from "./withdraw/create/reducer";
import WithdrawDetailReducer from "./withdraw/detail/reducer";
import TestimonialListReducer from "./testimonial/list/reducer";
import CreateTestimonialReducer from "./testimonial/create/reducer";
import TestimonialDetailReducer from "./testimonial/detail/reducer";
import PartnerListReducer from "./partner/list/reducer";
import CreatePartnerReducer from "./partner/create/reducer";
import PartnerDetailReducer from "./partner/detail/reducer";
import BannerListReducer from "./banner/list/reducer";
import CreateBannerReducer from "./banner/create/reducer";
import BannerDetailReducer from "./banner/detail/reducer";
import SiteSettingReducer from "./siteSetting/reducer";
import PageBannerListReducer from "./pageBanner/list/reducer";
import CreatePageBannerReducer from "./pageBanner/create/reducer";
import PageBannerDetailReducer from "./pageBanner/detail/reducer";
import dashboardDetailReducer from "./dashboard/detail/reducer";
// Service 
import ServiceListReducer from "./service/list/reducer";
import CreateServiceReducer from "./service/create/reducer";
import ServiceDetailReducer from "./service/detail/reducer";

// Project
import PortfolioListReducer from "./portfolio/list/reducer";
import CreatePortfolioReducer from "./portfolio/create/reducer";
import PortfolioDetailReducer from "./portfolio/detail/reducer";

// Gallery 
import GalleryListReducer from "./gallery/list/reducer";
import CreateGalleryReducer from "./gallery/create/reducer";
import GalleryDetailReducer from "./gallery/detail/reducer";
import VideoDetailReducer from "./video/detail/reducer";
import VideoListReducer from "./video/list/reducer";
import CreateVideoReducer from "./video/create/reducer";

const rootReducer = combineReducers({
	// public
	Layout,
	Login,
	Account,
	Profile,
	ChangePwdUser,
	FileStorage,
	// Management
	UserListReducer,
	CreateUserReducer,
	UserDetailReducer,
	// Management
	MemberListReducer,
	CreateMemberReducer,
	MemberDetailReducer,
	// Member Information
	CreateMemberInformationReducer,
	MemberInformationDetailReducer,
	// Performance
	PerformanceListReducer,
	CreatePerformanceReducer,
	PerformanceDetailReducer,
	// News
	NewsListReducer,
	CreateNewsReducer,
	NewsDetailReducer,
	// Campaign Category
	CampaignCategoryListReducer,
	CreateCampaignCategoryReducer,
	CampaignCategoryDetailReducer,
	// Project
	ProjectListReducer,
	CreateProjectReducer,
	ProjectDetailReducer,
	// Campaign
	CampaignListReducer,
	CreateCampaignReducer,
	CampaignDetailReducer,
	// Withdraw
	WithdrawListReducer,
	CreateWithdrawReducer,
	WithdrawDetailReducer,
	// Testimonial
	TestimonialListReducer,
	CreateTestimonialReducer,
	TestimonialDetailReducer,
	// Partner
	PartnerListReducer,
	CreatePartnerReducer,
	PartnerDetailReducer,
	// Banner
	BannerListReducer,
	CreateBannerReducer,
	BannerDetailReducer,
	// Site Setting
	SiteSettingReducer,
	// Page Banner
	PageBannerListReducer,
	CreatePageBannerReducer,
	PageBannerDetailReducer,
	TeamListReducer,
	CreateTeamReducer,
	TeamDetailReducer,
	//Service
	ServiceListReducer,
	CreateServiceReducer,
	ServiceDetailReducer,
	//Project
	PortfolioListReducer,
	CreatePortfolioReducer,
	PortfolioDetailReducer,
	// Gallery
	GalleryDetailReducer,
	GalleryListReducer,
	CreateGalleryReducer,
	// Video 
	VideoDetailReducer,
	VideoListReducer,
	CreateVideoReducer,
	dashboardDetailReducer
});

export default rootReducer;
