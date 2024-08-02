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
			label: "Campaign Category",
			icon: "mdi mdi-shape-plus",
			link: "/campaign-categories",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "campaign",
			label: "Campaign",
			icon: "mdi mdi-briefcase-variant-outline",
			link: "/campaign-menu",
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
		{
			id: "performance-menu",
			label: "How It Work",
			icon: "mdi mdi-bullseye-arrow",
			link: "/how-it-work",
			click: function (e) {
				e.preventDefault();
			},
		},
		{
			id: "news-menu",
			label: "News & Events",
			icon: "mdi mdi-newspaper-variant-multiple",
			link: "/news-menu",
			click: function (e) {
				e.preventDefault();
			},
		},
		// {
		// 	id: "technology",
		// 	label: "Technology",
		// 	icon: "mdi mdi-xml",
		// 	link: "/technology",
		// 	click: function (e) {
		// 		e.preventDefault();
		// 	},
		// },
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
			link: "/site-setting/about-company",
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
			label: "Management",
			isHeader: true,
		},
		
		{
			id: "user",
			label: "User",
			icon: "mdi mdi-account-group",
			link: "/user-management",
			click: function (e) {
				e.preventDefault();
			},
		},
	];
	return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
