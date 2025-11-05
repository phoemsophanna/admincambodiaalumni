import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteService, fetchServiceList, refreshServiceList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";

const ServiceMenu = () => {
	document.title = "Service | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const serviceListSelector = createSelector(
		(state) => state.ServiceListReducer,
		(layout) => ({
			services: layout.services,
			isLoading: layout.isLoading,
		})
	);
	const { services, isLoading } = useSelector(serviceListSelector);
	const deleteServiceSelector = createSelector(
		(state) => state.ServiceListReducer,
		(layout) => layout
	);
	const serviceSelector = useSelector(deleteServiceSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshServiceList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteService(UID));
			if (!serviceSelector.isLoading) {
				dispatch(fetchServiceList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchServiceList());
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
				Header: "Image",
				accessor: "image",
				Cell: (service) => <span><img style={{ height: "70px" }} src={api.FILE_URI + service.row.original.image } /></span>
			},
			{
				Header: "Title",
				accessor: "title",
				filterable: false,
				Cell: (service) => <span className="fw-semibold">{service.row.original.title}</span>,
			},
			{
				// End Table
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (service) => (
					<>
						{service.row.original.isActive ? (
							<span className="badge bg-success-subtle text-success">ACTIVE</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
						)}
					</>
				),
			},
			{
				Header: "Ordering",
				accessor: "ordering",
				filterable: false,
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li className="list-inline-item" title="Edit">
								<Link className="edit-item-btn" to={`/services-menu/edit/${cellProps.row.original.id}`}>
									<i className="ri-pencil-fill align-bottom text-muted"></i>
								</Link>
							</li>
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
					<BreadCrumb title="Service Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<Link className="btn add-btn btn-primary" to="/services-menu/create">
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
												data={services || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={serviceSelector.isLoading} />
		</React.Fragment>
	);
};

export default ServiceMenu;
