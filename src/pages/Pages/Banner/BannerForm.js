import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormFeedback,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Row,
	Spinner,
	TabContent,
	TabPane,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import classnames from "classnames";
import { Link, useParams } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { createBanner, fetchBannerDetail, resetBannerShowDetail } from "../../../store/actions";
import withRouter from "../../../Components/Common/withRouter";
import { api } from "../../../config";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const BannerForm = (props) => {
	const { id } = useParams();
	document.title = `Slider: ${id ? "Edit" : "create"} | Admin & Dashboards`;
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);

	const createBannerSelector = createSelector(
		(state) => state.CreateBannerReducer,
		(layout) => layout
	);
	const useBannerSelect = useSelector(createBannerSelector);
	const createBannerDetailSelector = createSelector(
		(state) => state.BannerDetailReducer,
		(layout) => ({
			banner: layout.banner,
			isLoading: layout.isLoading,
		})
	);
	const { banner, isLoading } = useSelector(createBannerDetailSelector);

	const [titleTap, settitleTap] = useState("ENG");
	const titleTapToggle = (tab) => {
		if (titleTap !== tab) {
			settitleTap(tab);
		}
	};

	useEffect(() => {
		if (id) dispatch(fetchBannerDetail(id));

		return () => {
			dispatch(resetBannerShowDetail());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (banner) {
			if (banner.image) {
				setFile([
					{
						source: banner.image,
						options: {
							type: "local",
						},
					},
				]);
			} else {
				setFile([]);
			}
		}
	}, [banner]);

	const bannerValidation = useFormik({
		enableReinitialize: true,

		initialValues: {
			id: id || "",
			title: banner ? banner.title : "",
			titleKh: banner ? banner.titleKh : "",
			subtitle: banner ? banner.subtitle : "",
			subtitleKh: banner ? banner.subtitleKh : "",
			linkLabel: banner ? banner.linkLabel : "",
			linkLabelKh: banner ? banner.linkLabelKh : "",
			linkTo: banner ? banner.linkTo : "",
			redirectNewTap: banner ? (banner.redirectNewTap === 1 ? true : false) : false,
			description: banner ? banner.description : "",
			descriptionKh: banner ? banner.descriptionKh : "",
			ordering: banner ? banner.ordering : 0,
			isActive: banner ? (banner.isActive === 1 ? true : false) : true,
			image: banner ? banner.image : "",
		},
		onSubmit: (values) => {
			values.image = file?.length > 0 ? file[0]?.serverId : "";
			dispatch(createBanner(values, props.router.navigate));
		},
	});

	return (
		<React.Fragment>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Slider Menu" pageTitle="Dashboard" pageLink="/slider-menu" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">{id ? "Edit" : "Create"} Slider</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/slider-menu">
													<i className="ri-arrow-go-back-line me-1 align-bottom"></i> Back
												</Link>
											</div>
										</Col>
									</Row>
								</CardHeader>
							</Card>
						</Col>
					</Row>

					<Form
						onSubmit={(e) => {
							e.preventDefault();
							bannerValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									<CardHeader>
										<div className="align-items-center d-flex">
											<div className="flex-shrink-0">
												<Nav tabs className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0">
													<NavItem>
														<NavLink
															style={{ cursor: "pointer" }}
															className={classnames({ active: titleTap === "ENG" })}
															onClick={() => {
																titleTapToggle("ENG");
															}}
														>
															English
														</NavLink>
													</NavItem>
													<NavItem>
														<NavLink
															style={{ cursor: "pointer" }}
															className={classnames({ active: titleTap === "KHM" })}
															onClick={() => {
																titleTapToggle("KHM");
															}}
														>
															Khmer
														</NavLink>
													</NavItem>
												</Nav>
											</div>
										</div>
									</CardHeader>
									<CardBody>
										<TabContent activeTab={titleTap}>
											<TabPane tabId="ENG" id="eng">
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-title-input">
														Slider Title
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-title-input"
														placeholder="Enter banner title"
														name="title"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.title}
														invalid={bannerValidation.touched.title && bannerValidation.errors.title ? true : false}
													/>
													{bannerValidation.touched.title && bannerValidation.errors.title ? (
														<FormFeedback type="invalid">{bannerValidation.errors.title}</FormFeedback>
													) : null}
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-subtitle-input">
														Subtitle
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-subtitle-input"
														placeholder="Enter banner subtitle"
														name="subtitle"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.subtitle}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="description-input">
														Description
													</Label>
													<textarea
														className="form-control"
														id="description-input"
														rows="3"
														placeholder="Enter description"
														name="description"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.description}
													></textarea>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-linkLabel-input">
														Label
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-linkLabel-input"
														placeholder="Enter banner label"
														name="linkLabel"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.linkLabel}
													/>
												</div>
											</TabPane>
											<TabPane tabId="KHM" id="khm">
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-titleKh-input">
														Slider Title
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-titleKh-input"
														placeholder="Enter banner title"
														name="titleKh"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.titleKh}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-subtitleKh-input">
														Subtitle
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-subtitleKh-input"
														placeholder="Enter banner subtitle"
														name="subtitleKh"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.subtitleKh}
													/>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="descriptionKh-input">
														Description
													</Label>
													<textarea
														className="form-control"
														id="descriptionKh-input"
														rows="3"
														placeholder="Enter description"
														name="descriptionKh"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.descriptionKh}
													></textarea>
												</div>
												<div className="mb-3">
													<Label className="form-label" htmlFor="banner-linkLabelKh-input">
														Label
													</Label>
													<Input
														type="text"
														className="form-control"
														id="banner-linkLabelKh-input"
														placeholder="Enter banner label"
														name="linkLabelKh"
														onChange={bannerValidation.handleChange}
														onBlur={bannerValidation.handleBlur}
														value={bannerValidation.values.linkLabelKh}
													/>
												</div>
											</TabPane>
										</TabContent>
										<div className="mb-3">
											<Label className="form-label" htmlFor="banner-linkTo-input">
												Redirect To
											</Label>
											<Input
												type="text"
												className="form-control"
												id="banner-linkTo-input"
												placeholder="Enter banner link"
												name="linkTo"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												value={bannerValidation.values.linkTo}
											/>
										</div>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="redirectNewTap"
												name="redirectNewTap"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												checked={bannerValidation.values.redirectNewTap}
											/>
											<Label className="form-check-label" for="redirectNewTap">
												Redirect: <span className="fw-bolder">{bannerValidation.values.redirectNewTap ? "New Tab" : "Static"}</span>
											</Label>
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Thumbnail
											</Label>
											<div className="position-relative d-block mx-auto">
												<div style={{ width: "100%" }}>
													<FilePond
														labelIdle='<span class="filepond--label-action">Choose Image</span>'
														files={file}
														onupdatefiles={setFile}
														allowMultiple={false}
														maxFiles={1}
														name="file"
														server={`${api.BASE_URL}/save-image/banner`}
														className="filepond filepond-input-multiple"
														stylePanelLayout="compact"
													/>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={4}>
								<Card>
									<CardHeader>
										<div className="fw-bold">Published</div>
									</CardHeader>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="banner-ordering-input">
												Ordering
											</Label>
											<Input
												type="number"
												className="form-control"
												id="banner-ordering-input"
												placeholder="Enter banner ordering"
												name="ordering"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												value={bannerValidation.values.ordering}
											/>
										</div>
										<div className="form-check form-switch form-switch-md mb-3" dir="ltr">
											<Input
												type="checkbox"
												className="form-check-input"
												id="isActive"
												name="isActive"
												onChange={bannerValidation.handleChange}
												onBlur={bannerValidation.handleBlur}
												checked={bannerValidation.values.isActive}
											/>
											<Label className="form-check-label" for="isActive">
												Status: <span className="fw-bolder">{bannerValidation.values.isActive ? "Active" : "In-Active"}</span>
											</Label>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useBannerSelect.isLoading ? (
										<Button color="primary" className="btn-load">
											<span className="d-flex align-items-center">
												<Spinner size="sm" className="flex-shrink-0">
													Loading...
												</Spinner>
												<span className="flex-grow-1 ms-2">Loading...</span>
											</span>
										</Button>
									) : (
										<Button type="submit" color="primary" className="btn-label">
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save Banner
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/slider-menu">
										<i className="ri-close-line label-icon align-middle fs-16 me-2"></i> Discus
									</Link>
								</div>
							</Col>
						</Row>
					</Form>
				</Container>
			</div>
		</React.Fragment>
	);
};

export default withRouter(BannerForm);
