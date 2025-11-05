import React, { useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { api } from "../../../config";
import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGalleryList } from "../../../store/actions";

const TableList = ({ onShowDetail, onDeleteGallery }) => {
	const campaignCategoryListSelector = createSelector(
		(state) => state.GalleryListReducer,
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
		dispatch(fetchGalleryList());
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
				Header: "Image",
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
								<Link className="remove-item-btn" onClick={() => onDeleteGallery(cellProps.row.original.id)} to="#">
									<i className="ri-delete-bin-fill align-bottom text-muted"></i>
								</Link>
							</li>
						</ul>
					);
				},
			},
		],
		[onShowDetail, onDeleteGallery]
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
								isAddGalleryList={false}
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
