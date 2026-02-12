import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteCampaign, fetchCampaignList, refreshCampaignList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";

const CampaignMenu = () => {
	document.title = "Campaign | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const campaignListSelector = createSelector(
		(state) => state.CampaignListReducer,
		(layout) => ({
			campaigns: layout.campaigns,
			isLoading: layout.isLoading,
		})
	);
	const { campaigns, isLoading } = useSelector(campaignListSelector);
	const deleteCampaignSelector = createSelector(
		(state) => state.CampaignListReducer,
		(layout) => layout
	);
	const campaignSelector = useSelector(deleteCampaignSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshCampaignList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteCampaign(UID));
			if (!campaignSelector.isLoading) {
				dispatch(fetchCampaignList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchCampaignList());
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
				Cell: (campaign) => (
					<div className="d-flex align-items-center">
						<div className="flex-shrink-0 me-3">
							<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
								{campaign.row.original.campaignGallery?.length > 0 && campaign.row.original.campaignGallery[0] ? (
									<img src={api.FILE_URI + campaign.row.original.campaignGallery[0]} alt="" className="img-fluid d-block" />
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
									{campaign.row.original.campaignTile}
								</Link>
							</h5>
							<p className="text-muted mb-0 text-truncate" style={{ width: "100px" }}>
								<span className="fw-medium ">{campaign.row.original.campaignTileKm}</span>
							</p>
						</div>
					</div>
				),
			},
			{
				Header: "Project Category",
				accessor: "campaignCategoryId",
				filterable: false,
				Cell: (campaign) => <span className="fw-semibold">{campaign.row.original.campaignCategory?.name}</span>,
			},
			{
				Header: "Goal",
				accessor: "goal",
				filterable: false,
				Cell: (campaign) => <span className="fw-semibold">${parseFloat(campaign.row.original.goal).toFixed(2)} USD</span>,
			},
			{
				Header: "Total Raised",
				accessor: "totalRaised",
				filterable: false,
				Cell: (campaign) => <span className="fw-semibold">${parseFloat(campaign.row.original.totalRaised).toFixed(2)} USD</span>,
			},
			{
				Header: "Date",
				accessor: "startDate",
				filterable: false,
				Cell: (campaign) => <div className="d-flex align-items-center">
				<div className="flex-grow-1">
					<p className="mb-0">
						<strong>From:</strong>{" "}<span className="fw-medium text-muted">{campaign.row.original.startDate}</span>
					</p>
					<p className="mb-0">
						<strong>To:</strong>{" "}<span className="fw-medium text-muted">{campaign.row.original.endDate}</span>
					</p>
				</div>
			</div>,
			},
			{
				Header: "Create by",
				accessor: "creatorId",
				filterable: false,
				Cell: (campaign) => (
					<div className="d-flex align-items-center">
						<div className="flex-grow-1">
							<h5 className="fs-14 mb-1">
								<Link to="#" className="text-body">
									{campaign.row.original.fullName}
								</Link>
							</h5>
						</div>
					</div>
				),
			},
			{
				// End Table
				Header: "Status",
				accessor: "status",
				filterable: false,
				Cell: (campaign) => (
					<>
						{
							campaign.row.original.ordering != -2 ? (
								<>
									{campaign.row.original.isActive ? (
										<span className="badge bg-success-subtle text-success">ACTIVE</span>
									) : (
										<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
									)}
								</>
							) : ""
						}
					</>
				),
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li className="list-inline-item" title="Edit">
								<Link className="edit-item-btn" to={`/campaign-menu/edit/${cellProps.row.original.id}`}>
									<i className="ri-eye-line align-bottom text-muted"></i>
								</Link>
							</li>
							{
								cellProps.row.original.ordering != -2 ? (
									<>
										<li className="list-inline-item" title="Delete">
											<Link
												className="remove-item-btn"
												onClick={() => {
													const LeadData = cellProps.row.original;
													setDeleteModal(true);
													setUID(LeadData.id);
												}}
												to="#"
											>
												<i className="ri-delete-bin-fill align-bottom text-muted"></i>
											</Link>
										</li>
									</>
								) : ""
							}
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
					<BreadCrumb title="Project Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<Link className="btn add-btn btn-primary" to="/campaign-menu/create">
												<i className="ri-add-fill me-1 align-bottom"></i> Create New
											</Link>
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
												data={campaigns || []}
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
				isLoading={campaignSelector.isLoading}
			/>
		</React.Fragment>
	);
};

export default CampaignMenu;
