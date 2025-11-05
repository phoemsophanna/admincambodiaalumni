import React, { useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { api } from "../../../config";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCampaignCategoryList } from "../../../store/actions";

const TableList = ({ onShowDetail, onDeleteCampaignCategory }) => {
	const campaignCategoryListSelector = createSelector(
		(state) => state.CampaignCategoryListReducer,
		(layout) => ({
			campaignCategories: layout.campaignCategories,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { campaignCategories, isLoading, success } = useSelector(campaignCategoryListSelector);
	const dispatch = useDispatch();

	console.log(campaignCategories);

	useEffect(() => {
		dispatch(fetchCampaignCategoryList());
	}, [dispatch]);

	// Column
	const columns = useMemo(
		() => [
			{
				Header: "ID",
				accessor: "id",
				Cell: (contact) => <span className="fw-semibold">{parseInt(contact.row.id) + 1}</span>,
				filterable: false,
			},
			{
				Header: "Category's Name",
				accessor: "name",
				filterable: false,
				Cell: (item) => (
					<div className="d-flex align-items-center">
						<div className="flex-shrink-0 me-3">
							<div className="avatar-sm bg-light rounded p-1 d-flex align-items-center">
								{item.row.original.image ? (
									<img src={api.FILE_URI + item.row.original.image} alt="" className="img-fluid d-block" />
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
									{item.row.original.name}
								</Link>
							</h5>
							<p className="text-muted mb-0 text-truncate" style={{ width: "250px" }}>
								<span className="fw-medium ">{item.row.original.nameKh}</span>
							</p>
						</div>
					</div>
				),
			},
			{
				Header: "Ordering",
				accessor: "ordering",
				filterable: false,
			},
			{
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (campaignCategory) => (
					<>
						{campaignCategory.row.original.isActive == 1 ? (
							<span className="badge bg-success-subtle text-success">ACTIVE</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">IN-ACTIVE</span>
						)}
					</>
				),
			},
			{
				Header: "Display on Homepage",
				accessor: "isDisplayHomePage",
				filterable: false,
				Cell: (campaignCategory) => (
					<>
						{campaignCategory.row.original.isDisplayHomePage ? (
							<span className="badge bg-success-subtle text-success">DISPLAY</span>
						) : (
							<span className="badge bg-danger-subtle text-danger">HIDE</span>
						)}
					</>
				),
			},
			{
				Header: "Action",
				Cell: (cellProps) => {
					return (
						<ul className="list-inline hstack gap-2 mb-0">
							<li className="list-inline-item" title="Edit">
								<Link className="edit-item-btn" to="#" onClick={() => onShowDetail(cellProps.row.original.id)}>
									<i className="ri-pencil-fill align-bottom text-muted"></i>
								</Link>
							</li>
							<li className="list-inline-item" title="Delete">
								<Link className="remove-item-btn" onClick={() => onDeleteCampaignCategory(cellProps.row.original.id)} to="#">
									<i className="ri-delete-bin-fill align-bottom text-muted"></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[onShowDetail, onDeleteCampaignCategory]
	);
	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columns}
								data={campaignCategories || []}
								isGlobalFilter={true}
								isAddCampaignCategoryList={false}
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
		</React.Fragment>
	);
};

export default TableList;
