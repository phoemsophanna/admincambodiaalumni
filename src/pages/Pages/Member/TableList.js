import React, { useMemo, useState } from "react";
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";

// Config
import { api } from "../../../config";

import Loader from "../../../Components/Common/Loader";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMemberList } from "../../../store/actions";

const TableList = ({ onShowDetail, onDeleteMember }) => {
	const memberListSelector = createSelector(
		(state) => state.MemberListReducer,
		(layout) => ({
			members: layout.members,
			message: layout.message,
			isLoading: layout.isLoading,
			success: layout.success,
			error: layout.error,
		})
	);
	const { members, isLoading, success } = useSelector(memberListSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMemberList());
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
				Header: "Name",
				accessor: "name",
				filterable: false,
				Cell: (contact) => (
					<>
						<div className="d-flex align-items-center">
							<div className="flex-shrink-0">
								{contact.row.original.image ? (
									<img
										src={contact.row.original.loginWith !== 3 ? api.FILE_URI + contact.row.original.image : contact.row.original.image}
										alt=""
										className="avatar-xxs rounded-circle"
									/>
								) : (
									<div className="flex-shrink-0 avatar-xs me-2">
										<div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">{contact.row.original.name.charAt(0)}</div>
									</div>
								)}
							</div>
							<div className="flex-grow-1 ms-2 name">{contact.row.original.name}</div>
						</div>
					</>
				),
			},
			{
				Header: "Email",
				accessor: "email",
				filterable: false,
			},
			{
				Header: "Phone No",
				accessor: "phoneNumber",
				filterable: false,
			},
			{
				Header: "Register With",
				accessor: "loginWith",
				filterable: false,
				Cell: (member) => (
					<>
						{member.row.original.loginWith === 1 ? (
							<span className="badge bg-primary-subtle text-primary">Phone Number</span>
						) : member.row.original.loginWith === 2 ? (
							<span className="badge bg-primary-subtle text-primary">Email</span>
						) : member.row.original.loginWith === 3 ? (
							<span className="badge bg-primary-subtle text-primary">Google</span>
						) : (
							<span className="badge bg-primary-subtle text-primary">-</span>
						)}
					</>
				),
			},
			{
				Header: "Member Type",
				accessor: "memberType",
				filterable: false,
				Cell: (member) => (
					<>
						{member.row.original.memberType === "MEMBER" ? (
							<span className="badge bg-light-subtle text-primary">MEMBER</span>
						) : member.row.original.memberType === "ORGANIZATION" ? (
							<span className="badge bg-light-subtle text-primary">ORGANIZATION</span>
						) : (
							<span className="badge bg-light-subtle text-primary">-</span>
						)}
					</>
				),
			},
			{
				Header: "Status",
				accessor: "isActive",
				filterable: false,
				Cell: (member) => (
					<>
						{member.row.original.isActive ? (
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
						</ul>
					);
				},
			},
		],
		[onShowDetail]
	);
	return (
		<React.Fragment>
			<Card id="contactList">
				<CardBody className="pt-0">
					<div>
						{success && !isLoading ? (
							<TableContainer
								columns={columns}
								data={members || []}
								isGlobalFilter={true}
								isAddMemberList={false}
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
