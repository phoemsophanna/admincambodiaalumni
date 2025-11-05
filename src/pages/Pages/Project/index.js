import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjectList, refreshProjectList } from "../../../store/actions";
import { api } from "../../../config";
import DeleteModal from "../../../Components/Common/DeleteModal";

const ProjectMenu = () => {
	document.title = "Project | Admin & Dashboards";
	const [UID, setUID] = useState(null);
	const [deleteModal, setDeleteModal] = useState(false);

	const projectListSelector = createSelector(
		(state) => state.ProjectListReducer,
		(layout) => ({
			projects: layout.projects,
			isLoading: layout.isLoading,
		})
	);
	const { projects, isLoading } = useSelector(projectListSelector);
	const deleteProjectSelector = createSelector(
		(state) => state.ProjectListReducer,
		(layout) => layout
	);
	const projectSelector = useSelector(deleteProjectSelector);
	const dispatch = useDispatch();

	const handleRefresh = () => {
		dispatch(refreshProjectList());
	};

	const handleDelete = () => {
		if (UID) {
			dispatch(deleteProject(UID));
			if (!projectSelector.isLoading) {
				dispatch(fetchProjectList());
				setDeleteModal(false);
			}
		}
	};

	useEffect(() => {
		dispatch(fetchProjectList());
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
				Cell: (project) => <span className="fw-semibold">{project.row.original.title}</span>,
			},
			{
				Header: "Campaign Category",
				accessor: "category_id",
				filterable: false,
				Cell: (project) => <span className="fw-semibold">{project.row.original.category?.name}</span>,
			},
			{
				Header: "Progress",
				accessor: "inProgress",
				filterable: false,
				Cell: (project) => (
					<>
						{project.row.original.inProgress ? (
							<span className="badge bg-warning-subtle text-warning">IN PROGRESS</span>
						) : (
							<span className="badge bg-success-subtle text-success">COMPLETED</span>
						)}
					</>
				),
			},
			{
				Header: "Show in Homepage",
				accessor: "isDisplayHomepage",
				filterable: false,
				Cell: (project) => (
					<>
						{project.row.original.isDisplayHomepage ? (
							<span className="badge bg-success-subtle text-success">TRUE</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">FALSE</span>
						)}
					</>
				),
			},
			{
				// End Table
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (project) => (
					<>
						{project.row.original.isActive ? (
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
								<Link className="edit-item-btn" to={`/project-menu/edit/${cellProps.row.original.id}`}>
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
					<BreadCrumb title="Project Menu" pageTitle="Home" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<Link className="btn add-btn btn-primary" to="/project-menu/create">
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
												data={projects || []}
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
			<DeleteModal show={deleteModal} onDeleteClick={handleDelete} onCloseClick={() => setDeleteModal(false)} isLoading={projectSelector.isLoading} />
		</React.Fragment>
	);
};

export default ProjectMenu;
