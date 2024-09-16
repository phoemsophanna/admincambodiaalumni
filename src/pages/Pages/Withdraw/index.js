import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteWithdraw, fetchWithdrawList, refreshWithdrawList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";

const WithdrawMenu = () => {
	document.title = "Withdraw | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const withdrawListSelector = createSelector(
		(state) => state.WithdrawListReducer,
		(layout) => ({
			withdraws: layout.withdraws,
			isLoading: layout.isLoading,
		})
	);
	const { withdraws, isLoading } = useSelector(withdrawListSelector);
	const deleteWithdrawSelector = createSelector(
		(state) => state.WithdrawListReducer,
		(layout) => layout
	);
	const withdrawSelector = useSelector(deleteWithdrawSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshWithdrawList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteWithdraw(UID));
			if (!withdrawSelector.isLoading) {
				dispatch(fetchWithdrawList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchWithdrawList());
	}, [dispatch]);

	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Title",
				accessor: "title",
				filterable: false,
				Cell: (withdraw) => (
					<div className="d-flex align-items-center">
						<div className="flex-shrink-0 me-3">
							<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
								{withdraw.row.original.campaign.campaignGallery?.length > 0 && withdraw.row.original.campaign.campaignGallery[0] ? (
									<img src={api.FILE_URI + withdraw.row.original.campaign.campaignGallery[0]} alt="" className="img-fluid d-block" />
								) : (
									<div className="mx-auto w-100 h-100">
										<div className="avatar-title bg-success-subtle text-success fs-24">
											<i className="mdi mdi-image-filter-hdr"></i>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{withdraw.row.original.campaign.campaignTile}
								</Link>
							</h5>
							<p className="text-muted mb-0 text-truncate" style={{ width: "100px" }}>
								<span className="fw-medium ">{withdraw.row.original.campaign.campaignTileKm}</span>
							</p>
						</div>
					</div>
				),
			},
			{
				Header: "Request Amount",
				accessor: "requestAmount",
				filterable: false,
				Cell: (withdraw) => <span className="fw-semibold">${withdraw.row.original.requestAmount.toFixed(2) || "0.00s"} USD</span>,
			},
			{
				Header: "Request By",
				accessor: "requestFrom",
				filterable: false,
				Cell: (withdraw) => <span className="fw-semibold">{withdraw.row.original.requestFrom?.name}</span>,
			},
			{
				Header: "Request Date",
				accessor: "requestDate",
				filterable: false,
				Cell: (withdraw) => <span className="fw-medium text-muted">{withdraw.row.original.requestDate}</span>,
			},
			{
				// End Table
				Header: "Status",
				accessor: "status",
				filterable: false,
				Cell: (withdraw) => (
					<>
						{withdraw.row.original.withdrawStatus === "PENDING" ? (
							<span className="badge bg-warning-subtle text-warning">PENDING</span>
						) : withdraw.row.original.withdrawStatus === "APPROVE" ? (
							<span className="badge bg-success-subtle text-success">APPROVED</span>
						) : withdraw.row.original.withdrawStatus === "REJECT" ? (
							<span className="badge bg-danger-subtle text-danger">REJECTED</span>
						) : null}
					</>
				),
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li className="list-inline-item" title="Edit">
								<Link className="edit-item-btn" to={`/withdraw-menu/edit/${cellProps.row.original.id}`}>
									<i className="ri-eye-line align-bottom text-muted"></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[]
	);

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Withdraw Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											{/* <Link className="btn add-btn btn-primary" to="/withdraw-menu/create">
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
												data={withdraws || []}
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
			<DeleteModal
				show={deleteModal}
				onDeleteClick={handleDelete}
				onCloseClick={() => setDeleteModal(false)}
				isLoading={withdrawSelector.isLoading}
			/>
		</React.Fragment>
	);
};

export default WithdrawMenu;
