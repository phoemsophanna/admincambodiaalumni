import React from "react";
import {
	Badge,
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
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Spinner,
	FormGroup
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableList from "./TableList";
import { useState } from "react";
import Select from "react-select";
import withRouter from "../../../Components/Common/withRouter";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
	createMemberInformation,
	fetchMemberInformationDetail,
	resetMemberInformationShowDetail,
} from "../../../store/actions";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { createSelector } from "reselect";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../config";
import { locations } from "../../../common/data";
import { languages } from "prismjs";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MemberInformation = (props) => {
	const { id } = useParams();
	document.title = "Member Information | Admin & Dashboards";
	const dispatch = useDispatch();
	const [file, setFile] = useState([]);
	const [idCardFront, setIdCardFront] = useState([]);
	const [idCardBack, setIdCardBack] = useState([]);
	const [passport, setPassport] = useState([]);
	const [memberType, setMemberType] = useState("");
	const [location, setLocation] = useState();
	const [marital,setMarital] = useState("");
	const [address, setAddress] = useState({});
	const [placeBirth, setPlaceBirth] = useState({});
	const [dayDo, setDayDo] = useState({});
	const [againstHumanity, setAgainstHumanity] = useState("");
	const [politicalUse, setPoliticalUse] = useState("");

	const [documentType, setDocumentType] = useState("");

	const createMemberInformationSelector = createSelector(
		(state) => state.CreateMemberInformationReducer,
		(layout) => layout
	);

	const createMemberInformationDetailSelector = createSelector(
		(state) => state.MemberInformationDetailReducer,
		(layout) => ({
			memberInformation: layout.memberInformation,
			isLoading: layout.isLoading
		})
	);

	const { memberInformation, isLoading } = useSelector(createMemberInformationDetailSelector);
	// console.log(memberInformation);

	const useCreateMemberSelect = useSelector(createMemberInformationSelector);

	const memberValidation = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstname: memberInformation?.firstName || "",
			email: memberInformation?.email || "",
			lastname: memberInformation?.lastName || "",
			id: memberInformation?.member_information?.user_id || "",
			fullname: memberInformation?.member_information?.fullname || "",
			age: memberInformation?.member_information?.age || "",		
			city: memberInformation?.member_information?.city || "",		
			date: memberInformation?.member_information?.date || "",		
			documentType: memberInformation?.member_information?.documentType || "",		
			gender: memberInformation?.member_information?.gender || "",		
			idCardBack: memberInformation?.member_information?.idCardBack || "",		
			idCardFront: memberInformation?.member_information?.idCardFront || "",		
			identityNumber: memberInformation?.member_information?.identityNumber || "",
			location: memberInformation?.member_information?.location || "",		
			passport: memberInformation?.member_information?.passport || "",		
			phone: memberInformation?.member_information?.phone || "",		
			profile: memberInformation?.member_information?.profile || "",
			memberType: memberInformation?.memberType || "",
			//
			latinName: memberInformation?.member_information?.latinName || "",
			education: memberInformation?.member_information?.education || "",
			facebook: memberInformation?.member_information?.facebook || "",
			birth: memberInformation?.member_information?.birth || "",
			// Column father
			fatherName: memberInformation?.member_information?.father?.fatherName || "",
			fatherAge: memberInformation?.member_information?.father?.fatherAge || "",
			fatherJob: memberInformation?.member_information?.father?.fatherJob || "",
			//
			identityDate: memberInformation?.member_information?.identityDate || "",
			job: memberInformation?.member_information?.job || "",
			languages: memberInformation?.member_information?.languages || "",
			// Column mother
			motherName: memberInformation?.member_information?.mother?.motherName || "",
			motherAge: memberInformation?.member_information?.mother?.motherAge || "",
			motherJob: memberInformation?.member_information?.mother?.motherJob || "",
			//
			houseNumber: address?.houseNumber || "",
			streetNumber: address?.streetNumber || "",
			teamNumber: address?.teamNumber || "",
			phum: address?.phum || "",
			sangkat: address?.sangkat || "",
			khan: address?.khan || "",
			birthCity: placeBirth?.birthCity || "",
			birthHouseNumber: placeBirth?.birthHouseNumber || "",
			birthKhan: placeBirth?.birthKhan || "",
			birthPhum: placeBirth?.birthPhum || "",
			birthSangkat: placeBirth?.birthSangkat || "",
			birthStreetNumber: placeBirth?.birthStreetNumber || "",
			birthTeamNumber: placeBirth?.birthTeamNumber || "",
			khmerDay: dayDo?.khmerDay || "",
			khmerMonth: dayDo?.khmerMonth || "",
			khmerYear: dayDo?.khmerYear || "",
			khmerYears: dayDo?.khmerYears || "",
			latinDay: dayDo?.latinDay || "",
			latinMonth: dayDo?.latinMonth || "",
			latinYear: dayDo?.latinYear || "",
			placeDo: dayDo?.placeDo || "",
		},
		validationSchema: Yup.object({
			date: Yup.date().required(),
			age: Yup.number().required(),
			phone: Yup.string().required(),
			fullname: Yup.string().required(),
			firstname: Yup.string().required(),
			lastname: Yup.string().required(),
			identityNumber: Yup.string().required(),
		}),
		onSubmit: (values) => {
			values.documentType = documentType ? documentType : null;
			values.idCardBack = idCardBack?.length > 0 ? idCardBack[0]?.serverId : "";
			values.idCardFront = idCardFront?.length > 0 ? idCardFront[0]?.serverId : "";
			values.passport = passport?.length > 0 ? passport[0]?.serverId : "";
			values.profile = file?.length > 0 ? file[0]?.serverId : "";
			values.memberType = memberType ? memberType : null;
			values.location = location ? location.value : null;
			values.marital = marital;
			values.againstHumanity = againstHumanity;
			values.politicalUse = politicalUse;
			values.city = {houseNumber: values?.houseNumber,streetNumber: values?.streetNumber,teamNumber: values?.teamNumber,phum: values?.phum,sangkat: values?.sangkat,khan: values?.khan};
			values.placeBirth = {birthCity: values?.birthCity,birthHouseNumber: values?.birthHouseNumber,birthKhan: values?.birthKhan, birthPhum: values?.birthPhum, birthSangkat: values?.birthSangkat, birthStreetNumber: values?.birthStreetNumber,birthTeamNumber: values?.birthTeamNumber};
			values.father = {fatherAge: values?.fatherAge, fatherJob: values?.fatherJob, fatherName: values?.fatherName};
			values.mother = {motherAge: values?.motherAge, motherJob: values?.motherJob, motherName: values?.motherName};
			values.dayDo = {khmerDay: values?.khmerDay, khmerMonth: values?.khmerMonth, khmerYear: values?.khmerYear, khmerYears: values?.khmerYears, latinDay: values?.latinDay, latinMonth: values?.latinMonth, latinYear: values?.latinYear, placeDo: values?.placeDo};
			dispatch(createMemberInformation(values,props.router.navigate));
		},
	});

	console.log(memberValidation.errors);

	useEffect(() => {
		setDocumentType(memberInformation?.member_information?.documentType);
		setMemberType(memberInformation?.memberType);
		setPoliticalUse(memberInformation?.member_information?.politicalUse ? memberInformation?.member_information?.politicalUse : "");
		setMarital(memberInformation?.member_information?.marital ? memberInformation?.member_information?.marital : "");
		setAgainstHumanity(memberInformation?.member_information?.againstHumanity ? memberInformation?.member_information?.againstHumanity : "");
		setAddress(JSON.parse(memberInformation?.member_information?.city ? memberInformation?.member_information?.city : "{}"));
		setPlaceBirth(JSON.parse(memberInformation?.member_information?.placeBirth ? memberInformation?.member_information?.placeBirth : "{}"));
		setDayDo(JSON.parse(memberInformation?.member_information?.dayDo ? memberInformation?.member_information?.dayDo : "{}"));
		setLocation({ value: memberInformation?.member_information?.location, label: memberInformation?.member_information?.location });
		if (memberInformation?.member_information?.profile) {
			setFile([
				{
					source: memberInformation?.member_information?.profile,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setFile([]);
		}

		if (memberInformation?.member_information?.idCardFront) {
			setIdCardFront([
				{
					source: memberInformation?.member_information?.idCardFront,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setIdCardFront([]);
		}

		if (memberInformation?.member_information?.idCardBack) {
			setIdCardBack([
				{
					source: memberInformation?.member_information?.idCardBack,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setIdCardBack([]);
		}

		if (memberInformation?.member_information?.passport) {
			setPassport([
				{
					source: memberInformation?.member_information?.passport,
					options: {
						type: "local",
					},
				},
			]);
		} else {
			setPassport([]);
		}
	}, [memberInformation]);

	console.log(memberValidation);

	useEffect(() => {
		dispatch(fetchMemberInformationDetail(id));
		return () => {
			dispatch(resetMemberInformationShowDetail());
		};
	}, [dispatch]);

	return (
		<React.Fragment>
			<div className="page-content member-information">
				<Container fluid>
					<BreadCrumb title="Personal Information Management" pageTitle="Dashboard" />
					<Row>
						<Col lg={12}>
							<Card>
								<CardHeader>
									<Row className="justify-content-between align-items-center gy-3">
										<Col lg={3}>
											<h5 className="mt-2">Edit Personal Information</h5>
										</Col>
										<Col className="col-lg-auto">
											<div className="d-md-flex text-nowrap gap-2">
												<Link className="btn btn-outline-dark" to="/member-management">
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
							memberValidation.handleSubmit();
							return false;
						}}
						action="#"
					>
						<Row>
							<Col lg={8}>
								<Card>
									<CardBody>
										<Row>
											<Col lg={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="first-name-input">
														នាមខ្លួន (First Name)
													</Label>
													<Input
														type="text"
														className="form-control"
														id="first-name-input"
														placeholder="Enter firstname"
														name="firstname"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.firstname}
														invalid={memberValidation.touched.firstname && memberValidation.errors.firstname ? true : false}
													/>
													{memberValidation.touched.firstname && memberValidation.errors.firstname ? (
														<FormFeedback type="invalid">{memberValidation.errors.firstname}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col lg={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="last-name-input">
														នាមត្រកូល (Last Name)
													</Label>
													<Input
														type="text"
														className="form-control"
														id="last-name-input"
														placeholder="Enter lastname"
														name="lastname"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.lastname}
														invalid={memberValidation.touched.lastname && memberValidation.errors.lastname ? true : false}
													/>
													{memberValidation.touched.lastname && memberValidation.errors.lastname ? (
														<FormFeedback type="invalid">{memberValidation.errors.lastname}</FormFeedback>
													) : null}
												</div>
											</Col>
										</Row>
										<div className="mb-3">
											<Label className="form-label" htmlFor="email-input">
												អុីមែល (Email)
											</Label>
											<Input
												type="text"
												className="form-control"
												id="email-input"
												placeholder="Enter email"
												name="email"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.email}
											/>
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="phoneNumber-input">
												លេខទូរស័ព្ទ (Phone Number)
											</Label>
											<Input
												type="text"
												className="form-control"
												id="phoneNumber-input"
												placeholder="Enter information phone"
												name="phone"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.phone}
												invalid={memberValidation.touched.phone && memberValidation.errors.phone ? true : false}
											/>
											{memberValidation.touched.phone && memberValidation.errors.phone ? (
												<FormFeedback type="invalid">{memberValidation.errors.phone}</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="fullname-input">
												នាម និង គោត្តនាម
											</Label>
											<Input
												type="text"
												className="form-control"
												id="fullname-input"
												placeholder="នាម និង គោត្តនាម"
												name="fullname"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.fullname}
												invalid={memberValidation.touched.fullname && memberValidation.errors.fullname ? true : false}
											/>
											{memberValidation.touched.fullname && memberValidation.errors.fullname ? (
												<FormFeedback type="invalid">{memberValidation.errors.fullname}</FormFeedback>
											) : null}
										</div>
										<FormGroup className="mb-3">
											<Label for="select-news-gender">ភេទ</Label>
											<Input
												className="form-select p-2"
												id="select-news-gender"
												name="gender"
												type="select"
												onChange={memberValidation.handleChange}
												value={memberValidation.values.gender}
											>
												<option value="male" selected>
													ប្រុស
												</option>
												<option value="female">
													ស្រី
												</option>
											</Input>
										</FormGroup>
										<div className="mb-3">
											<Label className="form-label" htmlFor="latinName-input">
												ឈ្មេាះជាអក្សរឡាតាំង
											</Label>
											<Input
												type="text"
												className="form-control"
												id="latinName-input"
												placeholder="ឈ្មេាះជាអក្សរឡាតាំង"
												name="latinName"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.latinName}
												invalid={memberValidation.touched.latinName && memberValidation.errors.latinName ? true : false}
											/>
											{memberValidation.touched.latinName && memberValidation.errors.latinName ? (
												<FormFeedback type="invalid">{memberValidation.errors.latinName}</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<label className="form-label main-label">
												ស្ថានភាពគ្រួសារ
											</label>
											<div className="row">
												<div style={{display: "flex",alignItems: "center",gap: "5px", flex: "25%", maxWidth: "25%"}}>
													<input
														style={{width: "25px",height: "25px"}}
														type="radio"
														id="single"
														name="marital"
														value="single"
														checked={marital == "single"}
														onChange={(e) => setMarital(e.target.value)}
													/>
													<label htmlFor="single" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>នៅលីវ</label>
												</div>
												<div style={{display: "flex",alignItems: "center",gap: "5px",flex: "26%", maxWidth: "26%"}}>
													<input
														style={{width: "25px",height: "25px"}}
														type="radio"
														id="marry"
														name="marital"
														value="marry"
														checked={marital == "marry"}
														onChange={(e) => setMarital(e.target.value)}
													/>
													<label htmlFor="marry" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>រៀបការរួច</label>
												</div>
											</div>
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="birth-input">
												ថ្ងៃខែឆ្នាំកំណើត
											</Label>
											<Input
												type="date"
												className="form-control"
												id="birth-input"
												placeholder="Enter information date"
												name="birth"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.birth}
												invalid={memberValidation.touched.birth && memberValidation.errors.birth ? true : false}
											/>
											{memberValidation.touched.birth && memberValidation.errors.birth ? (
												<FormFeedback type="invalid">{memberValidation.errors.birth}</FormFeedback>
											) : null}
										</div>

										<FormGroup className="mb-3">
											<Label for="select-news-documentType">ប្រភេទអត្តសញ្ញាណ</Label>
											<Input
												className="form-select p-2"
												id="select-news-documentType"
												name="documentType"
												type="select"
												onChange={(e) => {setDocumentType(e.target.value)}}
												value={documentType}
											>
												<option value="ID_CARD" selected>
													អត្តសញ្ញាណប័ណ្ណ
												</option>
												<option value="PASSPORT">
													កាតលិខិតឆ្លងដែន
												</option>
											</Input>
										</FormGroup>
										<div className="mb-3">
											<Label className="form-label" htmlFor="identityNumber-input">
												លេខអត្តសញ្ញាណប័ណ្ណ / លេខលិខិតឆ្លងដែន
											</Label>
											<Input
												type="text"
												className="form-control"
												id="identityNumber-input"
												placeholder="Enter information age"
												name="identityNumber"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.identityNumber}
												invalid={memberValidation.touched.identityNumber && memberValidation.errors.identityNumber ? true : false}
											/>
											{memberValidation.touched.identityNumber && memberValidation.errors.identityNumber ? (
												<FormFeedback type="invalid">{memberValidation.errors.identityNumber}</FormFeedback>
											) : null}
										</div>
										<div className="mb-3">
											<Label className="form-label" htmlFor="identityDate-input">
												ចុះថ្ងៃទី
											</Label>
											<Input
												type="date"
												className="form-control"
												id="identityDate-input"
												placeholder="ចុះថ្ងៃទី"
												name="identityDate"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.identityDate}
												invalid={memberValidation.touched.identityDate && memberValidation.errors.identityDate ? true : false}
											/>
											{memberValidation.touched.identityDate && memberValidation.errors.identityDate ? (
												<FormFeedback type="invalid">{memberValidation.errors.identityDate}</FormFeedback>
											) : null}
										</div>

										{
											documentType == "ID_CARD" ? (
												<Row>
													<Col lg={6}>
														<div className="mb-3">
															<Label className="form-label" htmlFor="thumbnail-input">
																ID Card Back
															</Label>
															<div className="position-relative d-block mx-auto">
																<div style={{ width: "100%" }}>
																	<FilePond
																		labelIdle='<span class="filepond--label-action">Choose Image</span>'
																		files={idCardBack}
																		onupdatefiles={setIdCardBack}
																		allowMultiple={false}
																		maxFiles={1}
																		name="file"
																		server={`${api.BASE_URL}/save-image/users`}
																		className="filepond filepond-input-multiple"
																		stylePanelLayout="compact"
																	/>
																</div>
															</div>
														</div>
													</Col>
													<Col lg={6}>
														<div className="mb-3">
															<Label className="form-label" htmlFor="thumbnail-input">
																ID Card Front
															</Label>
															<div className="position-relative d-block mx-auto">
																<div style={{ width: "100%" }}>
																	<FilePond
																		labelIdle='<span class="filepond--label-action">Choose Image</span>'
																		files={idCardFront}
																		onupdatefiles={setIdCardFront}
																		allowMultiple={false}
																		maxFiles={1}
																		name="file"
																		server={`${api.BASE_URL}/save-image/users`}
																		className="filepond filepond-input-multiple"
																		stylePanelLayout="compact"
																	/>
																</div>
															</div>
														</div>
													</Col>
												</Row>
											) : (
												<div className="mb-3">
													<Label className="form-label" htmlFor="thumbnail-input">
														Passport Card
													</Label>
													<div className="position-relative d-block mx-auto">
														<div style={{ width: "100%" }}>
															<FilePond
																labelIdle='<span class="filepond--label-action">Choose Image</span>'
																files={passport}
																onupdatefiles={setPassport}
																allowMultiple={false}
																maxFiles={1}
																name="file"
																server={`${api.BASE_URL}/save-image/users`}
																className="filepond filepond-input-multiple"
																stylePanelLayout="compact"
															/>
														</div>
													</div>
												</div>
											)
										}

										<div className="mb-3">
											<label className="form-label main-label">
												ទីកន្លែងកំណើត
											</label>
											<div className="row g-3">
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ផ្ទះលេខ</label>
													<input
														type="text"
														className="form-control"
														id="birthHouseNumber"
														placeholder="ផ្ទះលេខ"
														name="birthHouseNumber"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthHouseNumber}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ផ្លូវលេខ</label>
													<input
														type="text"
														className="form-control"
														id="birthStreetNumber"
														placeholder="ផ្លូវលេខ"
														name="birthStreetNumber"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthStreetNumber}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ក្រុមទី</label>
													<input
														type="text"
														className="form-control"
														id="birthTeamNumber"
														placeholder="ក្រុមទី"
														name="birthTeamNumber"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthTeamNumber}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ភូមិ</label>
													<input
														type="text"
														className="form-control"
														id="birthPhum"
														placeholder="ភូមិ"
														name="birthPhum"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthPhum}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ឃុំ/សង្កាត់</label>
													<input
														type="text"
														className="form-control"
														id="birthSangkat"
														placeholder="ឃុំ/សង្កាត់"
														name="birthSangkat"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthSangkat}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ស្រុក/ខណ្ឌ</label>
													<input
														type="text"
														className="form-control"
														id="birthKhan"
														placeholder="ស្រុក/ខណ្ឌ"
														name="birthKhan"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthKhan}
													/>
												</Col>
												<Col md={12} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "30%"}}>រាជធានី/ខេត្ត</label>
													<input
														type="text"
														className="form-control"
														id="birthCity"
														placeholder="រាជធានី/ខេត្ត"
														name="birthCity"
														onChange={memberValidation.handleChange}
														value={placeBirth?.birthCity}
													/>
												</Col>
											</div>
										</div>

										<Row>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="fatherName-input">
														ឪពុកឈ្មោះ
													</Label>
													<Input
														type="text"
														className="form-control mb-3"
														id="fatherName-input"
														placeholder="ឪពុកឈ្មោះ"
														name="fatherName"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.fatherName}
														invalid={memberValidation.touched.fatherName && memberValidation.errors.fatherName ? true : false}
													/>
													<Input
														type="text"
														className="form-control mb-3"
														id="fatherAge-input"
														placeholder="អាយុ"
														name="fatherAge"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.fatherAge}
														invalid={memberValidation.touched.fatherAge && memberValidation.errors.fatherAge ? true : false}
													/>
													<Input
														type="text"
														className="form-control"
														id="fatherJob-input"
														placeholder="មុខរបរ"
														name="fatherJob"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.fatherJob}
														invalid={memberValidation.touched.fatherJob && memberValidation.errors.fatherJob ? true : false}
													/>
													{memberValidation.touched.fatherJob && memberValidation.errors.fatherJob ? (
														<FormFeedback type="invalid">{memberValidation.errors.fatherJob}</FormFeedback>
													) : null}
												</div>
											</Col>
											<Col md={6}>
												<div className="mb-3">
													<Label className="form-label" htmlFor="motherName-input">
														ម្ដាយឈ្មោះ
													</Label>
													<Input
														type="text"
														className="form-control mb-3"
														id="motherName-input"
														placeholder="ម្ដាយឈ្មោះ"
														name="motherName"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.motherName}
														invalid={memberValidation.touched.motherName && memberValidation.errors.motherName ? true : false}
													/>
													<Input
														type="text"
														className="form-control mb-3"
														id="motherAge-input"
														placeholder="អាយុ"
														name="motherAge"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.motherAge}
														invalid={memberValidation.touched.motherAge && memberValidation.errors.motherAge ? true : false}
													/>
													<Input
														type="text"
														className="form-control"
														id="motherJob-input"
														placeholder="មុខរបរ"
														name="motherJob"
														onChange={memberValidation.handleChange}
														onBlur={memberValidation.handleBlur}
														value={memberValidation.values.motherJob}
														invalid={memberValidation.touched.motherJob && memberValidation.errors.motherJob ? true : false}
													/>
												</div>
											</Col>
										</Row>
										
										<div className="mb-3">
											<Label className="form-label" htmlFor="education-input">
												កំរិតនៃការអប់រំ
											</Label>
											<Input
												type="text"
												className="form-control"
												id="education-input"
												placeholder="កំរិតនៃការអប់រំ"
												name="education"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.education}
												invalid={memberValidation.touched.education && memberValidation.errors.education ? true : false}
											/>
											{memberValidation.touched.education && memberValidation.errors.education ? (
												<FormFeedback type="invalid">{memberValidation.errors.education}</FormFeedback>
											) : null}
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="language-input">
												ភាសាបរទេស
											</Label>
											<Input
												type="text"
												className="form-control"
												id="language-input"
												placeholder="ភាសាបរទេស"
												name="languages"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.languages}
												invalid={memberValidation.touched.languages && memberValidation.errors.languages ? true : false}
											/>
											{memberValidation.touched.languages && memberValidation.errors.languages ? (
												<FormFeedback type="invalid">{memberValidation.errors.languages}</FormFeedback>
											) : null}
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="age-input">
												អាយុ
											</Label>
											<Input
												type="text"
												className="form-control"
												id="age-input"
												placeholder="អាយុ"
												name="age"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.age}
												invalid={memberValidation.touched.age && memberValidation.errors.age ? true : false}
											/>
											{memberValidation.touched.age && memberValidation.errors.age ? (
												<FormFeedback type="invalid">{memberValidation.errors.age}</FormFeedback>
											) : null}
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="job-input">
												ការងារ ឬ តួនាទីបច្ចុប្បន្ន 
											</Label>
											<Input
												type="text"
												className="form-control"
												id="job-input"
												placeholder="ការងារ ឬ តួនាទីបច្ចុប្បន្ន"
												name="job"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.job}
												invalid={memberValidation.touched.job && memberValidation.errors.job ? true : false}
											/>
											{memberValidation.touched.job && memberValidation.errors.job ? (
												<FormFeedback type="invalid">{memberValidation.errors.job}</FormFeedback>
											) : null}
										</div>

										<div className="mb-3">
											<label className="form-label main-label">
												ទីលំនៅបច្ចុប្បន្ន
											</label>
											<div className="row g-3">
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ផ្ទះលេខ</label>
													<input
														type="text"
														className="form-control"
														id="houseNumber"
														placeholder="ផ្ទះលេខ"
														name="houseNumber"
														onChange={memberValidation.handleChange}
														value={address?.houseNumber}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ផ្លូវលេខ</label>
													<input
														type="text"
														className="form-control"
														id="streetNumber"
														placeholder="ផ្លូវលេខ"
														name="streetNumber"
														onChange={memberValidation.handleChange}
														value={address?.streetNumber}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ក្រុមទី</label>
													<input
														type="text"
														className="form-control"
														id="teamNumber"
														placeholder="ក្រុមទី"
														name="teamNumber"
														onChange={memberValidation.handleChange}
														value={address?.teamNumber}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ភូមិ</label>
													<input
														type="text"
														className="form-control"
														id="phum"
														placeholder="ភូមិ"
														name="phum"
														onChange={memberValidation.handleChange}
														value={address?.phum}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ឃុំ/សង្កាត់</label>
													<input
														type="text"
														className="form-control"
														id="sangkat"
														placeholder="ឃុំ/សង្កាត់"
														name="sangkat"
														onChange={memberValidation.handleChange}
														value={address?.sangkat}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ស្រុក/ខណ្ឌ</label>
													<input
														type="text"
														className="form-control"
														id="khan"
														placeholder="ស្រុក/ខណ្ឌ"
														name="khan"
														onChange={memberValidation.handleChange}
														value={address?.khan}
													/>
												</Col>
											</div>
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="location-input">
												រាជធានី/ខេត្ត
											</Label>
											<Select
												options={locations}
												className="campaign-select-input"
												placeholder="Select Location"
												isClearable={true}
												isSearchable={true}
												onChange={setLocation}
												name="province"
												value={location}
												invalid={memberValidation.errors.province ? true : false}
											/>
											{memberValidation.errors.province ? (
												<FormFeedback type="invalid">{memberValidation.errors.province}</FormFeedback>
											) : null}
										</div>

										<div className="mb-3">
											<Label className="form-label" htmlFor="facebook-input">
												Facebook
											</Label>
											<Input
												type="text"
												className="form-control"
												id="facebook-input"
												placeholder="Enter facebook"
												name="facebook"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.facebook}
												invalid={memberValidation.touched.facebook && memberValidation.errors.facebook ? true : false}
											/>
											{memberValidation.touched.facebook && memberValidation.errors.facebook ? (
												<FormFeedback type="invalid">{memberValidation.errors.facebook}</FormFeedback>
											) : null}
										</div>

										<div className="mb-3">
											<label className="form-label main-label">
												តើអ្នកបាននិងកំពុងចូលរួមសកម្មភាពបម្រើឲ្យចលនាណាមួយនៅក្រៅប្រទេស ឬក្នុងប្រទេស ដើម្បី ប្រឆាំងនឹងមនុស្សជាតិដែរឬទេ?
											</label>
											<div className="row">
												<div style={{display: "flex",alignItems: "center",gap: "5px", flex: "25%", maxWidth: "25%"}}>
													<input
														style={{width: "25px",height: "25px"}}
														type="radio"
														id="agree"
														name="againstHumanity"
														value="agree"
														checked={againstHumanity == "agree"}
														onChange={(e) => setAgainstHumanity(e.target.value)}
													/>
													<label htmlFor="agree" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>បានចូលរួម</label>
												</div>
												<div style={{display: "flex",alignItems: "center",gap: "5px",flex: "26%", maxWidth: "26%"}}>
													<input
														style={{width: "25px",height: "25px"}}
														type="radio"
														id="disagree"
														name="againstHumanity"
														value="disagree"
														checked={againstHumanity == "disagree"}
														onChange={(e) => setAgainstHumanity(e.target.value)}
													/>
													<label  htmlFor="disagree" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>មិនបានចូលរួម</label>
												</div>
											</div>
											<div style={{display: `${againstHumanity ? "none" : "block"}`}} className="text-danger">
												សូមបំពេញព័ត៌មាននៅខាងលើនេះដោយត្រឹមត្រូវ!
											</div>
										</div>
										<div className="mb-3">
											<label className="form-label main-label">
												ខ្ញុំបាទ/នាងខ្ញុំសុំធានា និងអះអាងថា មិនយកតួនាទីជាសមាជិក ឫសកម្មភាពសមាគម ទៅបម្រើផល ប្រយោជន៍ឲ្យគណបក្សនយោបាយណាមួយឡើយ ។ <br />
												ខ្ញុំបាទ/នាងខ្ញុំ សូមធានា និងអះអាងថា អ្វីដែលបានរាបរាប់ខាងលើសុទ្ធតែជាការពិតទាំងអស់ បើសិន មានចំណុចណាមួយមិនពិត ខ្ញុំបាទ/នាងខ្ញុំសូមទទួលខុសត្រូវចំពោះមុខច្បាប់ជាធរមានដោយខ្លួនឯង ។
											</label>
											<div className="row">
												<div style={{display: "flex",alignItems: "center",gap: "5px", flex: "25%", maxWidth: "25%"}}>
													<input
														style={{width: "25px",height: "25px"}}
														type="radio"
														id="accept"
														name="politicalUse"
														value="accept"
														checked={politicalUse == "accept"}
														onChange={(e) => setPoliticalUse(e.target.value)}
													/>
													<label htmlFor="accept" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>យល់ព្រម</label>
												</div>
												<div style={{display: "flex",alignItems: "center",gap: "5px",flex: "26%", maxWidth: "26%"}}>
													<input
														style={{width: "25px",height: "25px"}}
														type="radio"
														id="reject"
														name="politicalUse"
														value="reject"
														checked={politicalUse == "reject"}
														onChange={(e) => setPoliticalUse(e.target.value)}
													/>
													<label  htmlFor="reject" style={{marginBottom: 0,fontSize: "14px",fontWeight: "600"}}>មិនយល់ព្រម</label>
												</div>
											</div>
											<div style={{display: `${politicalUse ? "none" : "block"}`}} className="text-danger">
												សូមបំពេញព័ត៌មាននៅខាងលើនេះដោយត្រឹមត្រូវ!
											</div>
										</div>

										<div className="mb-3">
											<label className="form-label main-label">
												ធ្វើនៅថ្ងៃ
											</label>
											<div className="row g-3">
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ថ្ងៃ</label>
													<input
														type="text"
														className="form-control"
														id="khmerDay"
														placeholder="ថ្ងៃ"
														name="khmerDay"
														onChange={memberValidation.handleChange}
														value={dayDo?.khmerDay}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ខែ</label>
													<input
														type="text"
														className="form-control"
														id="khmerMonth"
														placeholder="ខែ"
														name="khmerMonth"
														onChange={memberValidation.handleChange}
														value={dayDo?.khmerMonth}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ឆ្នាំ</label>
													<input
														type="text"
														className="form-control"
														id="khmerYear"
														placeholder="ឆ្នាំ"
														name="khmerYear"
														onChange={memberValidation.handleChange}
														value={dayDo?.khmerYear}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ព.ស</label>
													<input
														type="text"
														className="form-control"
														id="khmerYears"
														placeholder="ព.ស"
														name="khmerYears"
														onChange={memberValidation.handleChange}
														value={dayDo?.khmerYears}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ធ្វើនៅ</label>
													<input
														type="text"
														className="form-control"
														id="placeDo"
														placeholder="ធ្វើនៅ"
														name="placeDo"
														onChange={memberValidation.handleChange}
														value={dayDo?.placeDo}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ថ្ងៃទី</label>
													<input
														type="text"
														className="form-control"
														id="latinDay"
														placeholder="ថ្ងៃទី"
														name="latinDay"
														onChange={memberValidation.handleChange}
														value={dayDo?.latinDay}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ខែ</label>
													<input
														type="text"
														className="form-control"
														id="latinMonth"
														placeholder="ខែ"
														name="latinMonth"
														onChange={memberValidation.handleChange}
														value={dayDo?.latinMonth}
													/>
												</Col>
												<Col md={6} style={{display: "flex",alignItems: "center",gap: "5px"}}>
													<label style={{marginBottom: 0,fontSize: "14px",fontWeight: "600",flex: "40%"}}>ឆ្នាំ</label>
													<input
														type="text"
														className="form-control"
														id="latinYear"
														placeholder="ឆ្នាំ"
														name="latinYear"
														onChange={memberValidation.handleChange}
														value={dayDo?.latinYear}
													/>
												</Col>
											</div>
										</div>

										<div className="mb-3" hidden>
											<Label className="form-label" htmlFor="date-input">
												ថ្ងៃធ្វើលិខិត
											</Label>
											<Input
												type="date"
												className="form-control"
												id="date-input"
												placeholder="Enter information date"
												name="date"
												onChange={memberValidation.handleChange}
												onBlur={memberValidation.handleBlur}
												value={memberValidation.values.date}
												invalid={memberValidation.touched.date && memberValidation.errors.date ? true : false}
											/>
											{memberValidation.touched.date && memberValidation.errors.date ? (
												<FormFeedback type="invalid">{memberValidation.errors.date}</FormFeedback>
											) : null}
										</div>

										<FormGroup className="mb-3">
											<Label for="select-memberType">Member Type</Label>
											<Input
												className="form-select p-2"
												id="select-memberType"
												name="memberType"
												type="select"
												onChange={(e) => {setMemberType(e.target.value)}}
												value={memberType}
											>
												<option value="MEMBER" selected>
													MEMBER
												</option>
												<option value="ORGANIZATION">
													ORGANIZATION
												</option>
											</Input>
										</FormGroup>
									</CardBody>
								</Card>
							</Col>
							<Col lg={4}>
								<Card>
									<CardBody>
										<div className="mb-3">
											<Label className="form-label" htmlFor="thumbnail-input">
												Profile
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
														server={`${api.BASE_URL}/save-image/users`}
														className="filepond filepond-input-multiple"
														stylePanelLayout="circle"
													/>
												</div>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg={12}>
								<div className="text-start mb-4">
									{useCreateMemberSelect.isLoading ? (
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
											<i className="ri-save-3-line label-icon align-middle fs-16 me-2"></i> Save
										</Button>
									)}{" "}
									<Link className="btn btn-label btn-danger" to="/member-management">
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

export default withRouter(MemberInformation);
