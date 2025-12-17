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
// Member Management
import MemberListSaga from "./member/list/saga";
import CreateMemberMainSaga from "./member/create/saga";
import MemberDetailSaga from "./member/detail/saga";
// Member Information
import CreateMemberInformationMainSaga from "./memberInformation/create/saga";
import MemberInformationDetailSaga from "./memberInformation/detail/saga";
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
// Campaign Category
import TeamListSaga from "./team/list/saga";
import CreateTeamMainSaga from "./team/create/saga";
import TeamDetailSaga from "./team/detail/saga";
// Project
import ProjectListSaga from "./project/list/saga";
import CreateProjectMainSaga from "./project/create/saga";
import ProjectDetailSaga from "./project/detail/saga";
// Service 
import ServiceListSaga from "./service/list/saga";
import CreateServiceMainSaga from "./service/create/saga";
import ServiceDetailSaga from "./service/detail/saga";
// Portfilo
import PortfolioListSaga from "./portfolio/list/saga";
import CreatePortfolioMainSaga from "./portfolio/create/saga";
import PortfolioDetailSaga from "./portfolio/detail/saga";
// Campaign
import CampaignListSaga from "./campaign/list/saga";
import CreateCampaignMainSaga from "./campaign/create/saga";
import CampaignDetailSaga from "./campaign/detail/saga";
// Withdraw
import WithdrawListSaga from "./withdraw/list/saga";
import CreateWithdrawMainSaga from "./withdraw/create/saga";
import WithdrawDetailSaga from "./withdraw/detail/saga";
// Testimonial
import TestimonialListSaga from "./testimonial/list/saga";
import CreateTestimonialMainSaga from "./testimonial/create/saga";
import TestimonialDetailSaga from "./testimonial/detail/saga";
// Partner
import PartnerListSaga from "./partner/list/saga";
import CreatePartnerMainSaga from "./partner/create/saga";
import PartnerDetailSaga from "./partner/detail/saga";
// Banner
import BannerListSaga from "./banner/list/saga";
import CreateBannerMainSaga from "./banner/create/saga";
import BannerDetailSaga from "./banner/detail/saga";
// Page Banner
import PageBannerListSaga from "./pageBanner/list/saga";
import CreatePageBannerMainSaga from "./pageBanner/create/saga";
import PageBannerDetailSaga from "./pageBanner/detail/saga";
import DashboardDetailSaga from "./dashboard/detail/saga";
// Site Setting
import SiteSettingSaga from "./siteSetting/saga";
import GalleryDetailSaga from "./gallery/detail/saga";
import GalleryListSaga from "./gallery/list/saga";
import CreateGalleryMainSaga from "./gallery/create/saga";
import VideoDetailSaga from "./video/detail/saga";
import VideoListSaga from "./video/list/saga";
import CreateVideoMainSaga from "./video/create/saga";
//
import DonorListSaga from "./donorList/list/saga";

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
		fork(MemberListSaga),
		fork(CreateMemberMainSaga),
		fork(MemberDetailSaga),
		// Member Information
		fork(MemberInformationDetailSaga),
		fork(CreateMemberInformationMainSaga),
		
		fork(PerformanceListSaga),
		fork(CreatePerformanceMainSaga),
		fork(PerformanceDetailSaga),
		fork(NewsListSaga),
		fork(CreateNewsMainSaga),
		fork(NewsDetailSaga),
		fork(CampaignCategoryListSaga),
		fork(CreateCampaignCategoryMainSaga),
		fork(CampaignCategoryDetailSaga),
		fork(TeamListSaga),
		fork(CreateTeamMainSaga),
		fork(TeamDetailSaga),
		fork(ProjectListSaga),
		fork(CreateProjectMainSaga),
		fork(ProjectDetailSaga),
		fork(CampaignListSaga),
		fork(CreateCampaignMainSaga),
		fork(CampaignDetailSaga),
		fork(WithdrawListSaga),
		fork(CreateWithdrawMainSaga),
		fork(WithdrawDetailSaga),
		fork(TestimonialListSaga),
		fork(CreateTestimonialMainSaga),
		fork(TestimonialDetailSaga),
		fork(PartnerListSaga),
		fork(CreatePartnerMainSaga),
		fork(PartnerDetailSaga),
		fork(BannerListSaga),
		fork(CreateBannerMainSaga),
		fork(BannerDetailSaga),
		fork(PageBannerListSaga),
		fork(CreatePageBannerMainSaga),
		fork(PageBannerDetailSaga),
		fork(SiteSettingSaga),
		fork(DashboardDetailSaga),
		// Service
		fork(ServiceDetailSaga),
		fork(ServiceListSaga),
		fork(CreateServiceMainSaga),
		// Project 
		fork(PortfolioListSaga),
		fork(PortfolioDetailSaga),
		fork(CreatePortfolioMainSaga),
		// Gallery
		fork(GalleryDetailSaga),
		fork(GalleryListSaga),
		fork(CreateGalleryMainSaga),
		fork(VideoDetailSaga),
		fork(VideoListSaga),
		fork(CreateVideoMainSaga),
		fork(DonorListSaga)
	]);
}
