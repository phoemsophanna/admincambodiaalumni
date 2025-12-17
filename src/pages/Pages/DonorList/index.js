import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteWithdraw, fetchDonorList, fetchWithdrawList, refreshDonorList, refreshWithdrawList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";
import dayjs from "dayjs";

const DonorListMenu = () => {
	document.title = "Donor List | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const donorListSelector = createSelector(
		(state) => state.DonorListReducer,
		(layout) => layout
	);
	const {donors, isLoading, total} = useSelector(donorListSelector);

	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshDonorList());
	};

	useEffect(() => {
		dispatch(fetchDonorList());
	}, [dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: "No",
				accessor: "id",
				Cell: (contact) => {
					return <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>
				},
				filterable: false,
			},
			{
				Header: "Name",
				accessor: "name",
				filterable: false,
				Cell: (donor) => (

					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{donor.row.original.user ? donor.row.original.user.name : "Anonymous" }
								</Link>
							</h5>
						</div>
					</div>
				),
			},
			{
				Header: "Date",
				accessor: "date",
				filterable: false,
				Cell: (donor) => <span className="fw-semibold">{dayjs(donor.row.original.donationDate).format("DD MMM YYYY")}</span>,
			},
			{
				Header: "Donation ($)",
				accessor: "donation",
				filterable: false,
				Cell: (donor) => <span className="fw-semibold">${(donor.row.original.amount).toFixed(2)}</span>,
			},
			{
				Header: "Payment Option",
				accessor: "paymentOption",
				filterable: false,
				Cell: (donor) => <span className="fw-medium text-muted">{donor.row.original.paymentMethod}</span>,
			}
		],
		[]
	);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Donor List Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											{/* <Link className="btn add-btn btn-primary" to="/donor-menu/create">
												<i className="ri-add-fill me-1 align-bottom"></i> Create New
											</Link> */}
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Button color="dark" className="btn" outline onClick={handleRefresh}>
													<i className="ri-refresh-line me-1 align-bottom"></i> Refresh
												</Button>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>

						<Col xs={12}>
							<Card id="contactList">
								<CardBody className="pt-0">
									<div>
										{!isLoading ? (
											<TableContainer
												columns={columns}
												data={donors || []}
												isGlobalFilter={true}
												isAddUserList={false}
												customPageSize={8}
												className="custom-header-css"
												divClass="table-responsive table-card mb-2"
												tableClass="align-middle table-nowrap"
												theadClass="table-light"
												isContactsFilter={true}
												SearchPlaceholder="Search for contact..."
												isPagination={true}
												totalDonation={total}
											/>
										) : (
											<Loader error={true} />
										)}
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default DonorListMenu;
