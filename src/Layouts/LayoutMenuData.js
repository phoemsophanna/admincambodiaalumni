import React from "react";

const Navdata = () => {
	const menuItems = [
		{
			label: "Menu",
			isHeader: true,
		},
		{
			id: "dashboard",
			label: "Dashboard",
			icon: "mdi mdi-speedometer",
			link: "/dashboard",
			click: function (e) {
				e.preventDefault();
			},
		},

		{
			id: "campaign-categories",
			label: "Project Category",
			icon: "mdi mdi-shape-plus",
			link: "/campaign-categories",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "campaign",
			label: "Project",
			icon: "mdi mdi-briefcase-variant-outline",
			link: "/campaign-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "donor-list",
			label: "Donor List",
			icon: "mdi mdi-briefcase-variant-outline",
			link: "/donor-list-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "gallery",
			label: "Gallery",
			icon: "mdi mdi-image",
			link: "/gallery",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "video",
			label: "Video",
			icon: "mdi mdi-video-outline",
			link: "/video",
			click: function (e) {
				e.preventDefault();
			},
		},

		// {
		// 	id: "project",
		// 	label: "Project",
		// 	icon: "mdi mdi-briefcase-variant-outline",
		// 	link: "/project-menu",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
		// {
		// 	id: "services",
		// 	label: "Service",
		// 	icon: "mdi mdi-file-settings-outline",
		// 	link: "/services-menu",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
		// {
		// 	id: "projects",
		// 	label: "Project",
		// 	icon: "mdi mdi-post",
		// 	link: "/portfolios-menu",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
		// {
		// 	id: "performance-menu",
		// 	label: "How It Work",
		// 	icon: "mdi mdi-bullseye-arrow",
		// 	link: "/how-it-work",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
		{
			id: "news-menu",
			label: "News & Events",
			icon: "mdi mdi-newspaper-variant-multiple",
			link: "/news-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "partner",
			label: "Partner",
			icon: "mdi mdi-xml",
			link: "/partner",
			click: function (e) {
				e.preventDefault();
			},
		},
		
		{
			label: "pages",
			isHeader: true,
		},
		// {
		// 	id: "testimonial",
		// 	label: "Testimonial",
		// 	icon: "mdi mdi-comment-quote-outline",
		// 	link: "/testimonial",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
		{
			id: "site-setting",
			label: "Site Setting",
			icon: "mdi mdi-tune",
			link: "/site-setting/home-page",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "slider-menu",
			label: "Slider",
			icon: "mdi mdi-play-box-outline",
			link: "/slider-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "page-banner",
			label: "Page Banner",
			icon: "mdi mdi-image-album",
			link: "/page-banner",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "term-service",
			label: "Term of Service",
			icon: "mdi mdi-text-box-search-outline",
			link: "/term-service",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "privacy-policy",
			label: "Privacy Policy",
			icon: "mdi mdi-text-box-check-outline",
			link: "/privacy-policy",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "donation-term",
			label: "Donation Terms and Privacy",
			icon: "mdi mdi-text-box-check-outline",
			link: "/donation-term",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			label: "Management",
			isHeader: true,
		},
		{
			id: "team",
			label: "Team",
			icon: "mdi mdi-account-group",
			link: "/teams",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "user",
			label: "Admin User",
			icon: "mdi mdi-account-group",
			link: "/user-management",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "member-user",
			label: "Member User",
			icon: "mdi mdi-account-group",
			link: "/member-management",
			click: function (e) {
				e.preventDefault();
			},
		},
	];
	return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
