import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../pages/Pages/Dashboard/Dashboard";

//login
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";

import Maintenance from "../pages/Pages/Maintenance/Maintenance";
import ComingSoon from "../pages/Pages/ComingSoon/ComingSoon";
import User from "../pages/Pages/User/User";
import PerformanceMenu from "../pages/Pages/Performance";
import PerformanceForm from "../pages/Pages/Performance/PerformanceForm";
import NewsMenu from "../pages/Pages/News";
import NewsForm from "../pages/Pages/News/NewsForm";
import CampaignCategory from "../pages/Pages/CampaignCategory/CampaignCategory";
import ProjectMenu from "../pages/Pages/Project";
import ProjectForm from "../pages/Pages/Project/ProjectForm";
import Testimonial from "../pages/Pages/Testimonial/Testimonial";
import Partner from "../pages/Pages/Partner/Partner";
import BannerMenu from "../pages/Pages/Banner";
import BannerForm from "../pages/Pages/Banner/BannerForm";
import AboutCompany from "../pages/Pages/SiteSetting/AboutCompany";
import Whoweare from "../pages/Pages/SiteSetting/Whoweare";
import SiteService from "../pages/Pages/SiteSetting/SiteService";
import WhyChooseUs from "../pages/Pages/SiteSetting/WhyChooseUs";
import SiteProject from "../pages/Pages/SiteSetting/SiteProject";
import SiteTestimonial from "../pages/Pages/SiteSetting/SiteTestimonial";
import SiteWebHosting from "../pages/Pages/SiteSetting/SiteWebHosting";
import TechNews from "../pages/Pages/SiteSetting/TechNews";
import ContactUs from "../pages/Pages/SiteSetting/ContactUs";
import SiteSkillset from "../pages/Pages/SiteSetting/SiteSkillset";
import PageBanner from "../pages/Pages/PageBanner/PageBanner";
import TermOfService from "../pages/Pages/SiteSetting/TermOfService";
import PrivacyPolicy from "../pages/Pages/SiteSetting/PrivacyPolicy";
import CampaignMenu from "../pages/Pages/Campaign";
import CampaignForm from "../pages/Pages/Campaign/CampaignForm";
import WithdrawMenu from "../pages/Pages/Withdraw";
import WithdrawForm from "../pages/Pages/Withdraw/WithdrawForm";
import HomePage from "../pages/Pages/SiteSetting/HomePage";
import AboutPage from "../pages/Pages/SiteSetting/AboutPage";
import Member from "../pages/Pages/Member/Member";
import Team from "../pages/Pages/Team/Team";

const authProtectedRoutes = [
	{ path: "/dashboard", component: <Dashboard /> },
	{ path: "/index", component: <Dashboard /> },

	//User Profile
	{ path: "/profile", component: <UserProfile /> },

	// Main
	{ path: "/slider-menu", component: <BannerMenu /> },
	{ path: "/slider-menu/create", component: <BannerForm /> },
	{ path: "/slider-menu/edit/:id", component: <BannerForm /> },
	{ path: "/campaign-categories", component: <CampaignCategory /> },
	{ path: "/teams", component: <Team /> },
	{ path: "/project-menu", component: <ProjectMenu /> },
	{ path: "/project-menu/create", component: <ProjectForm /> },
	{ path: "/project-menu/edit/:id", component: <ProjectForm /> },
	{ path: "/campaign-menu", component: <CampaignMenu /> },
	{ path: "/campaign-menu/create", component: <CampaignForm /> },
	{ path: "/campaign-menu/edit/:id", component: <CampaignForm /> },
	{ path: "/withdraw-menu", component: <WithdrawMenu /> },
	{ path: "/withdraw-menu/create", component: <WithdrawForm /> },
	{ path: "/withdraw-menu/edit/:id", component: <WithdrawForm /> },
	{ path: "/how-it-work", component: <PerformanceMenu /> },
	{ path: "/how-it-work/create", component: <PerformanceForm /> },
	{ path: "/how-it-work/edit/:id", component: <PerformanceForm /> },
	{ path: "/news-menu", component: <NewsMenu /> },
	{ path: "/news-menu/create", component: <NewsForm /> },
	{ path: "/news-menu/edit/:id", component: <NewsForm /> },
	{ path: "/partner", component: <Partner /> },
	{ path: "/testimonial", component: <Testimonial /> },
	{ path: "/term-service", component: <TermOfService /> },
	{ path: "/privacy-policy", component: <PrivacyPolicy /> },
	{ path: "/site-setting/about-company", component: <AboutCompany /> },
	{ path: "/site-setting/who-we-are", component: <Whoweare /> },
	{ path: "/site-setting/home-page", component: <HomePage /> },
	{ path: "/site-setting/about-page", component: <AboutPage /> },
	{ path: "/site-setting/service", component: <SiteService /> },
	{ path: "/site-setting/why-choose-us", component: <WhyChooseUs /> },
	{ path: "/site-setting/project", component: <SiteProject /> },
	{ path: "/site-setting/testimonial", component: <SiteTestimonial /> },
	{ path: "/site-setting/web-hosting", component: <SiteWebHosting /> },
	{ path: "/site-setting/tech-news", component: <TechNews /> },
	{ path: "/site-setting/contact-us", component: <ContactUs /> },
	{ path: "/site-setting/skillset", component: <SiteSkillset /> },
	{ path: "/page-banner", component: <PageBanner /> },
	{ path: "/user-management", component: <User /> },
	{ path: "/member-management", component: <Member /> },
	{
		path: "/",
		exact: true,
		component: <Navigate to="/dashboard" />,
	},
	{ path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
	// Authentication Page
	{ path: "/logout", component: <Logout /> },
	{ path: "/login", component: <Login /> },
	{ path: "/forgot-password", component: <ForgetPasswordPage /> },
	{ path: "/register", component: <Register /> },

	//AuthenticationInner pages
	{ path: "/pages-maintenance", component: <Maintenance /> },
	{ path: "/pages-coming-soon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
