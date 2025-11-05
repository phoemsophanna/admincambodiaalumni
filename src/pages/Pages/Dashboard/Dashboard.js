import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Widgets from "./Widgets";
import { projectsWidgets } from "../../../common/data";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../../../Components/Common/withRouter";
import {
	fetchDashboardDetail
} from "../../../store/actions";

const Dashboard = () => {
	document.title = "Dashboard | Admin & Dashboard";
	const dispatch = useDispatch();
	
	const createMemberDetailSelector = createSelector(
		(state) => state.dashboardDetailReducer,
		(layout) => ({dashboard: layout.dashboard})
	);

	const {dashboard} = useSelector(createMemberDetailSelector);

	useEffect(() => {
		dispatch(fetchDashboardDetail());
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Dashboard" pageTitle="Home" />
					<Row className="project-wrapper">
						<Col xxl={12}>
							<Widgets projectsWidgets={dashboard || []} />
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(Dashboard);
