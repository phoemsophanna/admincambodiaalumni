import React, { useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import withRouter from "../../../Components/Common/withRouter";

const LayoutNav = (props) => {
	useEffect(() => {
		console.log();
	}, [props]);
	const toggle = (tab) => {
		props.router.navigate(`/site-setting/${tab}`);
	};

	return (
		<React.Fragment>
			<Nav tabs className="nav-tabs">
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/about-company" })}
						onClick={() => {
							toggle("about-company");
						}}
					>
						About Company
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/contact-us" })}
						onClick={() => {
							toggle("contact-us");
						}}
					>
						Contact Us
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/home-page" })}
						onClick={() => {
							toggle("home-page");
						}}
					>
						Home Page
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/who-we-are" })}
						onClick={() => {
							toggle("who-we-are");
						}}
					>
						Who we are
					</NavLink>
				</NavItem>
				
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/skillset" })}
						onClick={() => {
							toggle("skillset");
						}}
					>
						Skillset
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/service" })}
						onClick={() => {
							toggle("service");
						}}
					>
						Service
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/why-choose-us" })}
						onClick={() => {
							toggle("why-choose-us");
						}}
					>
						Why choose us
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/project" })}
						onClick={() => {
							toggle("project");
						}}
					>
						Project
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/testimonial" })}
						onClick={() => {
							toggle("testimonial");
						}}
					>
						Testimonial
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/web-hosting" })}
						onClick={() => {
							toggle("web-hosting");
						}}
					>
						Web Hosting
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						style={{ cursor: "pointer" }}
						className={classnames({ active: props.router.location.pathname === "/site-setting/tech-news" })}
						onClick={() => {
							toggle("tech-news");
						}}
					>
						ព័ត៌មានបច្ចេកវិទ្យា
					</NavLink>
				</NavItem>
			</Nav>
		</React.Fragment>
	);
};

export default withRouter(LayoutNav);
