// ToDo list:
// - Add export function to home page lists

/*!
 * Copyright 2012, ibCom Pty Ltd
 * http://ibCom.com
 * 01 APR 2013
 */
 

// Freshcare Coding Notes
// Use nsFreshcare.data for storing commonly used lookup values (such as Status id's, etc)
// Use ns1blankspace.data for storing data from the current record or values passed from another page

// v2.0.2 Includes Certification upgrades PLUS moving fields to Membership level

// Bootstrap: BASED ON 3.4.015
// .live() to .on()

var dToday = new Date();

var nsFreshcare = {};
ns1blankspace.rootnamespace = nsFreshcare;
ns1blankspace.rootnamespacetext = 'nsFreshcare';
nsFreshcare.version = '4.0.019b';
ns1blankspace.isLab = (location.host.indexOf('lab.') > -1);
nsFreshcare.siteLab = '310';
nsFreshcare.siteTest = '313';
nsFreshcare.siteBeta = '1611';
nsFreshcare.site = '1554';
nsFreshcare.personContext = undefined;
nsFreshcare.businessContext = undefined;
nsFreshcare.supportAdmin = false;

nsFreshcare.admin = {};
nsFreshcare.grower = {};
nsFreshcare.customer = {};
nsFreshcare.auditor = {};
nsFreshcare.trainer = {};
nsFreshcare.reviewer = {};
nsFreshcare.external = {};
nsFreshcare.internal = {};
nsFreshcare.option = {};

nsFreshcare.user = {};
nsFreshcare.user.role = '';
nsFreshcare.user.auditorReportUser = '1000278263';				// lab (admin@ausqual)

// Reverted these back to numeric v1.0.29
nsFreshcare.objectAudit = 107;
nsFreshcare.objectTrainingCourse = 181;
nsFreshcare.objectTrainingCourseAttendee = 215;
nsFreshcare.objectPerson = 32;
nsFreshcare.objectAuditIssue = 221;
nsFreshcare.objectDocument = 14;
nsFreshcare.objectBusiness = 12;
nsFreshcare.objectAction = 17;
nsFreshcare.objectSubscription = 108;
nsFreshcare.objectCertificate = 291;
nsFreshcare.objectTmpTrainee = 210;
nsFreshcare.objectProductCategory = 216;
nsFreshcare.objectLocation = 314;
nsFreshcare.objectScope = 326;
nsFreshcare.objectPersonGroup = 223;
nsFreshcare.objectMembership = 93;
nsFreshcare.objectCodeOfPractice = 351;

nsFreshcare.data = {};
nsFreshcare.data.businessCentric = true;		// as of v3.1.2
nsFreshcare.data.helpURL = 'https://freshcare-help.1blankspace.com/';
nsFreshcare.data.groupGrower = [];
nsFreshcare.data.allGroups = [];
nsFreshcare.data.groupGrowerText = [];
nsFreshcare.data.groupAuditor = [];
nsFreshcare.data.groupTrainer = [];
nsFreshcare.data.groupCustomer = [];
nsFreshcare.data.groupBoard = [];
nsFreshcare.data.groupAccountsContact = '2658';
nsFreshcare.data.businessGroupGrowerText = [];
nsFreshcare.data.documentForgotUsername = 105270;
nsFreshcare.data.eLearningBusiness = '1152494';

// v3.1.1i SUP022764 Added new roles
// v3.2.001 SUP023329 Added remaining roles
nsFreshcare.data.roles = 
{
	admin: '37',
	administrator: '73',
	auditor: '21',
	board: '55', 
	customer: '35',
	financial: '70',
	financialLimited: '71',
	financialReadOnly: '72',
	grower: '36',
	internalAuditor: '68',
	jasanz: '79',
	reviewer: '65',
	trainer: '34',
	xeroSuperUser: '92'
};

nsFreshcare.data.relationshipParentBusiness = '311';	// lab
nsFreshcare.data.contactStatusActive = '1';
nsFreshcare.data.contactStatusInactive = '3';
nsFreshcare.data.contactStatusPendingApproval = '9';	// lab
nsFreshcare.data.legacyCertificate = {};
nsFreshcare.data.currentCertificate = {};
nsFreshcare.data.jasanzCertificate = {};
nsFreshcare.data.attachmentTypeLogo = '47';				// dev
nsFreshcare.data.attachmentTypeSignature = '48';		// dev
nsFreshcare.data.attachmentTypeCertificate = '49'		// dev
nsFreshcare.data.attachmentTypeEmailImages = '50';		// dev
nsFreshcare.data.attachmentTypeCertificateExtension = '96';	// dev
nsFreshcare.data.actionTypeCertificate = '406';			// dev
nsFreshcare.data.actionTypeLateLoggedAudit = '407';		// dev
nsFreshcare.data.actionTypeAuditRejected = '420';		// dev
nsFreshcare.data.actionTypeEmailSent = '5';
nsFreshcare.data.actionTypeUserNotes = '413';			// dev
nsFreshcare.data.actionTypeLogFile = '428';				// dev
nsFreshcare.data.actionTypeRecertAuditLate = '433'		// dev
nsFreshcare.data.actionTypeOtherReason = '438'			// dev
nsFreshcare.data.actionTypeCertificateExtension = '445' // dev
nsFreshcare.data.actionTypeAuditTrail = '439'			// dev
nsFreshcare.data.reportingRoles = 
	[nsFreshcare.data.roles.admin, nsFreshcare.data.roles.auditor, nsFreshcare.data.roles.trainer, nsFreshcare.data.roles.customer];	// v3.2.016
nsFreshcare.data.userNameSuffix = 'freshcare';
nsFreshcare.data.growerText = 'Member';
nsFreshcare.data.growersmallText = 'member';
nsFreshcare.data.growersText = 'Members';
nsFreshcare.data.appName = 'FreshcareOnline';
nsFreshcare.data.businessName = 'Freshcare';	// v3.2.005
nsFreshcare.data.xeroStartDate = new Date('01 Sep 2017 00:00:01');
nsFreshcare.data.dummyCertBodyPerson = '1000395249';	// dev
nsFreshcare.data.automationsUser = '4926';
ns1blankspace.data.financialsUseAccountsContact = true;

// Structure Id's
nsFreshcare.data.sendPrintedCertificatesId = '2086';	//dev
nsFreshcare.data.userPasswordId = '2105';		// dev
nsFreshcare.data.userSubscriptionStart = '2106';		// dev
nsFreshcare.data.userSubscriptionExpires = '2107';		// dev
nsFreshcare.data.certificationBodyNumberId = '2095';	// dev
nsFreshcare.data.selfCertificationDateId = '2093';		// dev
nsFreshcare.data.jasanzDateId = '2094';					// dev
nsFreshcare.structureElementCrops = '2091';				// dev
nsFreshcare.structureElementCropGroups = '2374';		// dev
nsFreshcare.data.structureMembershipFees = 256;			// dev

nsFreshcare.data.emailToAdmin = "admin@freshcare.com.au";
nsFreshcare.data.emailToAuditor = "auditors@freshcare.com.au";
nsFreshcare.data.emailToCustomer = "customers@freshcare.com.au";
nsFreshcare.data.emailToGrower = "growers@freshcare.com.au";
nsFreshcare.data.emailToTrainer = "trainers@freshcare.com.au";	// 1.020 Changed from emailTrainer
nsFreshcare.data.emailFromAdmin = "admin@freshcare.com.au";
nsFreshcare.data.emailFromAuditor = 'noreply@freshcare.com.au';
nsFreshcare.data.emailFromCustomer = 'admin@freshcare.com.au';
nsFreshcare.data.emailFromTrainer = 'admin@freshcare.com.au';
nsFreshcare.data.emailFromGrower = 'admin@freshcare.com.au';
nsFreshcare.data.saveError = [];
nsFreshcare.data.stateDistanceEducation = '9';
nsFreshcare.data.membershipFSQ = '5';
nsFreshcare.data.membershipVIT = '29';
nsFreshcare.data.membershipWIN = '26';
nsFreshcare.data.membershipStatusActive = '2';

nsFreshcare.data.attachmentTypeReviewChecklist = '74';
nsFreshcare.data.attachmentTypeAuditReport = '73';

// v3.1.209 Add options to switch on/off features in forked namespaces
nsFreshcare.option.jasanzAccreditation = true;
nsFreshcare.option.auditManualApprovalFlag = true;
nsFreshcare.option.certBodySelfCertDate = true;
nsFreshcare.option.certBodyNumber = true;
nsFreshcare.option.certificationLevels = false;		// v3.1.209 SUP023095 Used by ECA - Levels of certification
nsFreshcare.option.certificateTypes = false;		// v3.1.209 SUPo23095 USed by ECA - A & B certificate types
nsFreshcare.option.carTypeReportTypes = false;		// v3.1.209 SUP023095 Used by ECA - Packing & Production report types
nsFreshcare.option.carTypeSeverity = true;			// v3.1.209 SUP023095 Not used by ECA
nsFreshcare.option.copJASANZDesc = true;			// v3.1.211 SUP023196 Not used by ECA
nsFreshcare.option.exportToXero = true;				// v3.2.010 SUP023329 Not used by ECA
nsFreshcare.option.qualifyingTraining = true;		// v3.2.020 SUP023422 Aydits must have qualirying training
nsFreshcare.option.trainingApplies = true;			// v3.2.020 SUP023422 Not yet used by ECA
nsFreshcare.option.validScopesStoredOn = nsFreshcare.objectMembership // v3.2.020 SUP023484 Valid Scopes stored against Membership
nsFreshcare.option.certTemplateStoredOn = nsFreshcare.objectMembership // v3.3.001 SUP023456 Cert Template on M/Ship
nsFreshcare.option.auditorCompetencies = true;		// v3.3.001 SUP023603 Auditors must be compliant for membership they're auditing
nsFreshcare.option.splitActionsAndEmails = true; 	// v4.0.001 Added for Freshmark
nsFreshcare.option.certificateExtension = 
{		// v4.0.012 
	is: true,						// Allows CB's and Admin to extend the date on certificate
	maxExtensionMonths: 6,			// max amount of months certificate can be extended
	maxAuditBeforeExpiryDays: 182	// max number of days audit can be conducted prior to expiry to prevent short-certificate
};		

nsFreshcare.data.switched = {};
nsFreshcare.data.viewFilter = {};
nsFreshcare.data.grower = {};
nsFreshcare.data.grower.subscription = {};
nsFreshcare.data.grower.productGroupFreshProduce = '5';
nsFreshcare.data.auditor = {};

nsFreshcare.data.audit = {};
nsFreshcare.data.audit.statusProposed = '1';
nsFreshcare.data.audit.statusCompleted = '2';
nsFreshcare.data.audit.statusCancelled = '3';
nsFreshcare.data.audit.resultStatusNoResult = '1';
nsFreshcare.data.audit.resultStatusPending = '2';
nsFreshcare.data.audit.resultStatusCompleted = '3';
nsFreshcare.data.audit.resultStatusConducted = '23';		//dev
nsFreshcare.data.audit.resultStatusAwaitingReview = '24';	//dev
nsFreshcare.data.audit.resultStatusApproved = '25';		//dev
nsFreshcare.data.audit.resultStatusRejected = '26';		//dev
nsFreshcare.data.audit.resultStatusSuspended = '30';	// dev

nsFreshcare.data.audit.typeInitial = '3';
nsFreshcare.data.audit.typeRecert = '1';
nsFreshcare.data.audit.typeScopeExtension = '29';		// dev
nsFreshcare.data.audit.typeUnannouncedInitial = '33';		// dev
nsFreshcare.data.audit.typeUnannouncedRecert = '34';		// dev

// v3.1.205 SUP023030 Added Internal Document attachment type and changed requiredAttachmentTypes (added resultStatus param)
nsFreshcare.data.audit.auditorAttachments = 
[
	{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf'},
	{type: '79', typetext: 'Internal Document', fileExtension: 'pdf,doc,docx,xls,xlsx'}/*,
	{type: nsFreshcare.data.attachmentTypeCertificate, typetext: 'Certificate'}		FC CB's can't add Certificates*/
];

nsFreshcare.data.audit.requiredAttachmentTypes = 
[
	{type: '79', typetext: 'Internal Document', fileExtension: 'pdf,doc,docx,xls,xlsx', resultStatus: nsFreshcare.data.audit.resultStatusAwaitingReview},
	{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf', resultStatus: nsFreshcare.data.audit.resultStatusApproved},
	{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf', resultStatus: nsFreshcare.data.audit.resultStatusPending},
	{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf', resultStatus: nsFreshcare.data.audit.resultStatusCompleted}
];			

nsFreshcare.data.audit.reviewerRequiredAttachmentTypes = [];	// dev SUP022885 Tech Review Checklist no logner required

nsFreshcare.data.auditCAR = {};
nsFreshcare.data.auditCAR.statusCompleted = '2';
nsFreshcare.data.auditCAR.statusToBeCompleted = '1';
nsFreshcare.data.auditCAR.severityMinor = '1';
nsFreshcare.data.auditCAR.severityMajor = '2';
nsFreshcare.data.auditCAR.severityCritical = '3';		// v3.1.1f SUP022688 Added

// v3.2.006 SUP023436 Added project / projecttext to lineitem
nsFreshcare.data.financial = 
{
	invoice:
	{
		searchFields: 'contactbusinesssenttotext,contactbusinesssentto,contactpersonsenttotext,contactpersonsentto,invoice.contactbusinesssentto.legalname,' +
							'projecttext,project,projecttext,area,areatext,preadjustmentamount,' +
							'object,objectcontext,sexeroinvoiceid,sexeroinvoiceupdated,' +
							'reference,purchaseorder,sentdate,duedate,description,amount,tax,sent,frequency,creditamount,receiptamount,outstandingamount,' +
							'invoice.contactpersonsentto.email,' +
							'invoice.contactbusinesssentto.mailingaddress1,invoice.contactbusinesssentto.mailingaddress2,invoice.contactbusinesssentto.mailingpostcode,' +
							'invoice.contactbusinesssentto.mailingsuburb,invoice.contactbusinesssentto.mailingstate,invoice.contactbusinesssentto.mailingcountry,' +
							'invoice.contactbusinesssentto.streetaddress1,invoice.contactbusinesssentto.streetaddress2,invoice.contactbusinesssentto.streetpostcode,' +
							'invoice.contactbusinesssentto.streetsuburb,invoice.contactbusinesssentto.streetstate,invoice.contactbusinesssentto.streetcountry,' +
							'invoice.contactpersonsentto.email,invoice.contactbusinesssentto.email',

		FINANCIAL_ITEM_SEARCH: function()
		{	/* v3.2.004 Added ItemSearch fields */
			return 'lineitem.financialaccount,lineitem.financialaccount.code,lineitem.financialaccounttext,lineitem.tax,lineitem.issuedamount' +
					',lineitem.amount,lineitem.preadjustmentamount,lineitem.description,lineitem.object,lineitem.preadjustmenttax' +
					',lineitem.taxtype,lineitem.otherobject,lineitem.otherobjectcontext' +
					',lineitem.orderitem.quantity,lineitem.orderitem.product,lineitem.orderitem.producttext,lineitem.orderitem.unitcost,lineitem.orderitem.totalcost' +
					',lineitem.orderitem.order.reference,lineitem.orderitem.order,lineitem.project,lineitem.projecttext';
		},
		emailTo: function() {return ns1blankspace.objectContextData['invoice.contactpersonsentto.email']}
	}
};

nsFreshcare.data.trainingCourse = {};
nsFreshcare.data.trainingCourse.statusScheduled = '1';
nsFreshcare.data.trainingCourse.statusCompleted = '2';
nsFreshcare.data.trainingCourse.statusCancelled = '3';
nsFreshcare.data.trainingCourse.attendeeStatusAttended = '2';
nsFreshcare.data.trainingCourse.attendeeStatusNewMembership = '5';
nsFreshcare.data.trainingCourse.attendeeStatusNewContact = '6';
nsFreshcare.data.trainingCourse.attendeePaymentStatusDepositPaid = '2';

ns1blankspace.xhtml.logonNotes = undefined;
	
ns1blankspace.setupShow = true;

ns1blankspace.xhtml.viewContainer =
	'<ul class="nav navbar-nav">' +
		'<li class="hidden-xs hidden-sm">' +
		 	'<div class="btn-group">' +
 				'<button type="button" id="ns1blankspaceViewControlHome" class="btn btn-default glyphicon glyphicon-home"></button>' +
  				'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="ns1blankspaceHomeOptions" aria-haspopup="true" aria-expanded="false">' +
    				'<span class="caret"></span>' +
    				'<span class="sr-only">Toggle Dropdown</span>' +
				'</button>' +
				'<ul class="dropdown-menu">' +
				   '<li><a href="#" id="ns1blankspaceHomeOptionsCalendar">Calendar</a></li>' +
				   '<li >' +
				   	'<a id="ns1blankspaceHomeOptionsNewWindow" href="#" target="_blank">Open in a new window</a>' +
				   '</li>' +
				   (ns1blankspace.option.classicURI!=undefined?'<li><a href="#" id="ns1blankspaceHomeOptionsMyStartPage">Open as Classic</a></li>':'') +
				   '<li><a href="#" id="ns1blankspaceHomeOptionsConnections">' +
				   	'<div>Connections</div><div class="ns1blankspaceSubNote">Other webapps, websites..</div></a>' +
				   '</li>' +
				   '<li><a href="#" id="ns1blankspaceHomeOptionsSearch">' +
				   	'<div>Search & reporting</div><div class="ns1blankspaceSubNote">Export, update, email & SMS..</div></a>' +
				   '</li>' +
				    
				 '</ul>' +
			'</div>' +
		'</li>' +
		'<li style="margin-left:6px;" class="hidden-xs hidden-sm">' +
		 	'<div class="btn-group">' +
 				'<button type="button" class="btn btn-default glyphicon glyphicon-chevron-left" id="ns1blankspaceViewControlBack"></button>' +
 				'<button type="button" class="btn btn-default glyphicon glyphicon-chevron-up" id="ns1blankspaceViewControlRefresh"></button>' +
 				'<button type="button" class="btn btn-default glyphicon glyphicon-chevron-right" id="ns1blankspaceViewControlForward"></button>' +
			'</div>' +
		'</li>' +
		'<li style="margin-left:6px;" class="">' +
		 	'<div id="ns1blankspaceViewControlViewContainer">' +
				'<span id="ns1blankspaceViewControlView"></span>' +
			'</div>' +
		 '</li>' +
		 '<li style="margin-left:6px;" class="hidden-xs">' +
		 	'<div>' +
				'<input id="ns1blankspaceViewControlSearch" class="form-control' +
				(ns1blankspace.option.searchWatermark!=undefined?' ns1blankspaceWatermark" value="' + ns1blankspace.option.searchWatermark + '"':'"') +
				'>' +
			'</div>' +
		 '</li>' +
		 '<li style="margin-left:6px;" class="hidden-xs">' +
		 	'<button type="button" class="btn btn-default" id="ns1blankspaceViewControlNew">New</button>' +
		 '</li>' +
		 '<li style="margin-left:6px;" class="hidden-xs">' +
		 	'<div class="btn-group">' +
 				'<button type="button" class="btn btn-default" id="ns1blankspaceViewControlAction">Save</button>' +
 				'<button type="button" class="btn btn-default dropdown-toggle" id="ns1blankspaceViewControlActionOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    				'<span class="caret"></span>' +
    				'<span class="sr-only">Toggle Dropdown</span>' +
				'</button>' +
			'</div>' +
		'</li>' +
		'<li style="margin-left:6px;" class="hidden-xs">' +
		 	'<div id="ns1blankspaceViewControlActionStatus"></div>' +
		'</li>' +
		'</ul>' +
		'<ul class="nav navbar-nav pull-right hidden-xs">' +
		(ns1blankspace.setupShow?'<li style="margin-left:4px;">' +
									'<button type="button" class="btn btn-default glyphicon glyphicon-cog" id="ns1blankspaceViewControlSetup"></button>' +
									'</li>':'') +
		'<li style="margin-left:4px;">' +
			'<button type="button" class="btn btn-default glyphicon glyphicon-question-sign" id="ns1blankspaceViewControlHelp"></button>' +
		'</li>' +
	'</ul>';

//' + nsFreshcare.site + '
ns1blankspace.option.initialiseSpaceTemplate = 
	'/site/' + nsFreshcare.site + '/freshcare.setup.space-1.0.0.json';
ns1blankspace.option.typeInput = 1;
ns1blankspace.option.typeReadOnly = 2;
ns1blankspace.option.typeButton = 3;
ns1blankspace.option.typeFiller = 4;
ns1blankspace.option.typeHidden = 5;
ns1blankspace.option.returnToLast = false;
ns1blankspace.option.calendarActionTypes = '4';
ns1blankspace.option.actionTypeDefault = {id: '4', title: 'File Note'};
delete(ns1blankspace.option.messagingCheckURL) //= "https://mail.lab.ibcom.biz"; 		// v3.1.210 removed
ns1blankspace.option.passwordErrorMessage = '<br />Password needs to be at least 6 characters and contain at least 1 number.';
ns1blankspace.option.spaceTextMaximumLength = 20;	// v3.2.019 SUP023235 Governs the length of the space name
ns1blankspace.option.messagingShowChecking = true;
ns1blankspace.option.attachmentsAsURLs = false;		//v3.4.006
ns1blankspace.option.messagingCreateContacts = false; 	// v3.4.006
ns1blankspace.option.showActionText = true; 			// v3.4.007
ns1blankspace.option.defaultDatePickerOptions.position = 'bottom'; // v4.0.016 SUP024214

// v3.1.1b SUP022566 Added to parameterise number of items on 1st & 2nd pages of invoices
// v3.1.2 Moved to ns1blankspace.data.financial.invoice level
ns1blankspace.data.financial = (ns1blankspace.data.financial) ? ns1blankspace.data.financial : {};
ns1blankspace.data.financial.invoice = (ns1blankspace.data.financial.invoice) ? ns1blankspace.data.financial.invoice : {};
ns1blankspace.data.financial.invoice.maxPage1ScheduleRows = 8;
ns1blankspace.data.financial.invoice.maxPage2ScheduleRows = 30;

ns1blankspace.board = {financialreports: {}};

$(function()
{
	// v3.4.019 Set nsFreshcare.site since we can no longer use msOnDemandSiteID
	nsFreshcare.site = (ns1blankspace.isLab 
							? (location.host.indexOf('-test.') > -1 ? nsFreshcare.siteTest : nsFreshcare.siteLab) 
							: (location.host.indexOf('-test.') > -1 ? nsFreshcare.siteBeta : nsFreshcare.site) );

	ns1blankspace.xhtml._header =
		'<div id="ns1blankspaceLogo" style="width:70px; height:56px;float:left; "></div>' +
		'<div id="ns1blankspaceHeaderText" style="float:left; padding-top:28px;"><span id="nsFreshcareOnlineHeaderRole" style="color:#5B7F00;font-weight:bold;">FreshcareOnline' + 
		'</span><span style="vertical-align:bottom; color:#999999; x-font-size:0.625em;">&nbsp;&nbsp;' + nsFreshcare.version + '</span></div>' +
		'<div style="float:right; margin-right:3px;">' +
		'<div id="ns1blankspaceSpaceText" style="width:250px;"></div>' +
		'<div id="ns1blankspaceLogonName" style="width:250px;"></div></div>';

	ns1blankspace.xhtml.logonContainer =
	{
		"background": 'url(/site/' + nsFreshcare.site + '/freshcare.cover-1.0.0.jpg)',
		"background-size": 'cover',
		"height": '100vh'
	}

	ns1blankspace.themes = 
	[   
		{   title:     'Standard',    
	   		cssURI:    '',     
	   		xhtmlHeaderLogo: '<img src="/site/' + nsFreshcare.site + '/freshcare.logo-1.0.2.png" alt="Freshcare" height="48px">' 
	    }
	];

	ns1blankspace.xhtml.header =
		'<nav class="navbar navbar-default navbar-fixed-top">' +
	  		'<div class="container-fluid">' +
	  			'<div>' +
		  			'<div class="navbar-header" style="margin-bottom:4px;">' +
		      			'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#ns1blankspace-navbar-collapse-1" aria-expanded="false">' +
					        	'<span class="sr-only">Toggle navigation</span>' +
					        	'<span class="icon-bar"></span>' +
					       	'<span class="icon-bar"></span>' +
					        	'<span class="icon-bar"></span>' +
				      	'</button>' +
				      	'<a class="navbar-brand" style="padding-top:5px;" href="http://www.freshcare.com.au"><img id="ns1blankspaceNavigationLogo" style="height:48px;"'+
				      		' src="/site/' + nsFreshcare.site + '/freshcare.logo-1.0.2.png"></a>' +
				      		'<span class="navbar-brand" id="nsFreshcareOnlineHeaderRole" style="color:#5B7F00;font-weight:bold; margin-top: 5px;">FreshcareOnline' + 
						'</span><span class="navbar-brand" style="margin-top: 7px; color:#999999; font-size:0.625em;">' + nsFreshcare.version + '</span>' +
				    '</div>' +

				    '<div class="collapse navbar-collapse" id="ns1blankspace-navbar-collapse-1">' +
					    '<ul class="nav navbar-nav pull-right">' +
					        '<li>' +
					        	'<div class="text-right" id="ns1blankspaceSpaceText"></div>' +
					        	'<div id="ns1blankspaceLogonName"></div>' +
					       	'</li>' +
					    '</ul>' +
					'</div>' +
				'</div>' +
				'<div id="ns1blankspaceViewControl">' +

				'</div>' +
	  		'</div>' +
		'</nav>';

	window.setTimeout('nsFreshcare.app.init()', 100);
});


ns1blankspace.option.preLoad = function()
{
	var oRoot = ns1blankspace.rootnamespace;

	if (ns1blankspace.rootnamespacetext != 'nsFreshcare') 
	{
		// v3.4.019 Can no longer use msOnDemandSiteId
		// if (ns1blankspace.isLab)
		// {	nsFreshcare.site = '313'; }
		// else
		// { 	nsFreshcare.site = '1554'}
	}
	else
	{
		if (!ns1blankspace.isLab)
		{ns1blankspace.option.returnToLast = false;}
	}

	ns1blankspace.scripts = 
		$.map(ns1blankspace.scripts, function(x)
		{
			//if (x.nameSpace === '1blankspace.supportIssue') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.supportissue-2.0.9.js';}
			if (x.nameSpace === '1blankspace.messaging.imap') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.messaging.imap-3.6.5.js';}
			if (x.nameSpace === '1blankspace.messaging.conversation') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.messaging.conversation-2.0.6.js';}
			//if (x.nameSpace === '1blankspace.action') {x.source = (ns1blankspace.isLab ? 'jscripts' : 'site/1903') + '/1blankspace.action-3.6.1.js';}
			if (x.nameSpace === '1blankspace.action') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.action-3.6.4.js';}
			if (x.nameSpace === '1blankspace.contactPerson') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.contactperson-3.0.5.js';}
			if (x.nameSpace === '1blankspace.report') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.report-3.5.9.js';}		
			if (x.nameSpace === '1blankspace.financial') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.financial-2.0.4a.js';}
			if (x.nameSpace === '1blankspace.order') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.order-2.0.4.js';}
			if (x.nameSpace === '1blankspace.product') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.product-3.6.5.js';}
			if (x.nameSpace === '1blankspace.contactsearch') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.contactsearch-2.2.1.js';}
			if (x.nameSpace === '1blankspace.setup.financial') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.setup.financial-2.2.1.js';}	// v3.2.020
			if (x.nameSpace === '1blankspace.document') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.document-3.6.1.js';}

			// v3.1.1 Newer version of prod files available
			if (x.nameSpace === '1blankspace.financial.invoice') {x.source = '/jscripts/1blankspace.financial.invoice-2.0.3.js';}
			if (x.nameSpace === '1blankspace.financial.expense') {x.source = '/jscripts/1blankspace.financial.expense-2.0.2.js';}
			if (x.nameSpace === '1blankspace.financial.payment') {x.source = '/jscripts/1blankspace.financial.payment-2.0.2.js';}
			if (x.nameSpace === '1blankspace.financial.receipt') {x.source = '/jscripts/1blankspace.financial.receipt-2.0.1.js';}
			if (x.nameSpace === '1blankspace.financial.credit') {x.source = '/jscripts/1blankspace.financial.credit-2.0.1.js';}
			if (x.nameSpace === '1blankspace.financial.bankaccount') {x.source = '/jscripts/1blankspace.financial.bankaccount-2.0.1.js';}
			if (x.nameSpace === '1blankspace.util.local') {x.source = '/jscripts/1blankspace.util.local-2.0.3.js';}		// v3.3.001
			if (x.nameSpace === '1blankspace.format') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.format-3.3.1.js';} 	// changed from 2.0.9 v4.0.001
			if (x.nameSpace === '1blankspace.setup.file') {x.source = '/site/' + nsFreshcare.site + '/1blankspace.setup.file-2.0.003.js';}	// v3.1.209b
			if (x.nameSpace === '1blankspace.projectTask') {x.source = '/jscripts/1blankspace.project.task-2.0.1.js';} 
			if (x.nameSpace === '1blankspace.setup.structure') {x.source = '/' + (ns1blankspace.isLab ? 'jscripts' : 'site/1433') + '/1blankspace.setup.structure-2.0.4.js';} 
			//if (x.nameSpace === '1blankspace.setup.website') {x.source = '/jscripts/1blankspace.setup.website-2.0.5.js';}
			return x;
		});
	
		
	// v3.2.006 timezone & saml not yet on prod server
	ns1blankspace.scripts = $.grep(ns1blankspace.scripts, function(x) 
							{
								return x.nameSpace != '1blankspace.util.timezone' &&
									   x.nameSpace != 'ns1blankspace.util.saml' &&
									   x.nameSpace != 'mydigitalstructure.util'		// v4.0.001 conflicts with bootstrap modal
							});

	// 3.0.2b Added so that budget could show in ECA
	ns1blankspace.scripts.push({nameSpace: '1blankspace.visualise', source: (ns1blankspace.isLab ? '/jscripts' : '/site/' + nsFreshcare.site) + '/1blankspace.visualise-2.0.2.js'});
	ns1blankspace.scripts.push({nameSpace: '1blankspace.financial.budget', source: '/jscripts/1blankspace.financial.budget-2.0.1.js'});
	ns1blankspace.scripts.push({nameSpace: '1blankspace.setup.action', source: '/site/' + nsFreshcare.site + '/1blankspace.setup.action-2.0.0.js'});
	ns1blankspace.scripts.push({nameSpace: '1blankspace.util.convert', source: '/site/' + nsFreshcare.site + '/1blankspace.util.convert-2.0.0.js'});
}

// v2.0.4 SUP021426 Added resources to external menus
// v3.0.0 Reorganised groups and views
nsFreshcare.setup = 
[
	{	/* Admin */
		role: "Admin",
		viewGroups:
		[
			{
				id: 1,
				name: 'Contact',
				type: 1
			},
			{
				id: 2,
				name: 'Freshcare',
				type: 1
			},
			{
				id: 3,
				name: 'Operations',
				type: 1
			},
			{
				id: 4,
				name: 'Money',
				roles: ['financial', 'financialLimited', 'financialReadOnly'],
				type: 1
			},
			{
				id: 5,
				name: 'Financial',
				roles: ['financial', 'financialReadOnly'],
				type: 1
			},
			{
				id: 6,
				name: 'User',
				type: 2
			},
			{
				id: 7,
				name: 'Website',
				type: 2
			},
			{
				id: 8,
				name: 'Lookup',
				type: 2
			},
			{
				id: 9,
				name: 'Space',
				type: 2
			}
		],
		views:
		[
			{
				title: "Contact Search",
				namespace: 'contactsearch',
				endpoint: 'CONTACT_BUSINESS',
				show: true,
				group : 1,
				type: 1
			},			
			{
				title: nsFreshcare.data.growersText,
				namespace: "grower",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Membership Code",
							name: "contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodColumns: 'code',
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "Certificate",
							name: "contactbusiness.agrisubscription.agricertificate.certificatenumber",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Company Id",
							name: "contactbusiness.reference",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Location",
							name: "contactbusiness.streetsuburb",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						}
					],
					caption: "<br />More filters..",
					advanced: true
				}
			},
			{
				title: "Customers",
				namespace: "customer",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1,
				search: 
				{
					advanced: true,
					caption: "<br />More filters..",
					filters: 
					[
						{
							caption: "Active Only",
							name: "customerstatus",
							type: "Check",
							comparison: "EQUAL_TO",
							value: nsFreshcare.data.contactStatusActive
						}
					]
				}
			},
			{
				title: "Trainers",
				namespace: "trainer",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Certification Bodies",
				namespace: "certificationbody",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Businesses",
				namespace: "contactBusiness",
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "People",
				namespace: "contactPerson",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Email",
				parentNamespace: "messaging",
				namespace: "imap",
				endpoint: "MESSAGING_IMAP",
				show: true,
				group: 1,
				type: 1
			},
			{	/* v3.2.010 */
				title: "Conversations",
				parentNamespace: "messaging",
				namespace: "conversation",
				endpoint: "MESSAGING_CONVERSATION",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Training Packages",
				namespace: "trainingpackage",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TRAINING_PACKAGE",
				show: true,
				group: 2,
				type: 1,
				search: 
				{
					advanced: true,
					caption: "<br />More filters..",
					filters: 
					[
						{
							caption: "Available Packages Only",
							name: "availableto",
							type: "Check",
							comparison: "GREATER_THAN_OR_EQUAL_TO",
							value: dToday.toString('dd MMM yyyy')
						}
					]
				}
			},
			{
				title: "Training Courses",
				namespace: "trainingcourse",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TRAINING_COURSE",
				show: true,
				group: 2,
				type: 1,
				search: 
				{
					advanced: true,
					caption: "<br />More filters..",
					filters: 
					[
						{
							caption: 'Reference',
							name: 'reference',
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Location",
							name: "location",
							type: "Text",
							comparison: "TEXT_IS_LIKE",
							fixed: false
						},
						{
							caption: 'Membership',
							name: 'agritrainingcourse.package.membership',
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: 'Code of Practice',
							name: 'agritrainingcourse.package.codeofpractice',
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: 'AGRI_CODE_OF_PRACTICE_SEARCH',
							methodColumns: 'code',
							fixed: false
						},
						{
							caption: 'Package',
							name: 'Package',
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH',
							methodFilter: 'availablefrom-LESS_THAN_OR_EQUAL_TO-' + dToday.toString('dd MMM yyyy') + '|availableto-GREATER_THAN_OR_EQUAL_TO-' + dToday.toString('dd MMM yyyy')
						},
						{
							caption: "Course Date",
							name: "coursedate",
							type: 'Date',
							comparison: 'BETWEEN',
							fixed: false
						}
					]
				}
			},
			{
				title: "Audits",
				namespace: "audit",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AUDIT",
				show: true,
				group: 2,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Membership",
							name: "audit.contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: 'Result Status',
							name: 'audit.resultstatus',
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: 'SETUP_AUDIT_RESULT_STATUS_SEARCH',
							fixed: false
						},
						{
							caption: "Hide Lapsed Audits",
							name: "audit.membershipstatus",
							type: 'Check',
							comparison: 'NOT_EQUAL_TO',
							value: "-1",
							fixed: false
						},
						{
							caption: "Created",
							name: "audit.createddate",
							type: 'Date',
							comparison: 'BETWEEN',
							fixed: false
						}
					],
					caption: "<br />More filters..",
					advanced: true
				}
			},
			{
				title: "Certificates",
				namespace: "certificate",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_CERTIFICATE",
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "New " + nsFreshcare.data.growersText + " from Trainers",
				namespace: "newgrower",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TEMP_TRAINEE",
				show: true,
				group: 2,
				type: 1
			},
			{
				// v3.2.025 SUP022964 eLearning Trainees logged into Freshcare
				title: "New eLearning",
				namespace: "newelearning",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TEMP_TRAINEE",
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "New " + nsFreshcare.data.growerText + " Memberships",
				namespace: "newmemberships",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE",
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "New Trainees",
				namespace: "newtrainee",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE",
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "Attendees",
				namespace: "attendance",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE",
				show: true,
				group: 2,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Membership",
							name: "agritrainingcourseattendee.course.package.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "COP",
							name: "agritrainingcourseattendee.course.package.codeofpractice",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_CODE_OF_PRACTICE_SEARCH",
							methodFilter: 'agricodeofpractice.membership.code-TEXT_IS_LIKE|code-TEXT_IS_LIKE',
							methodColumns: 'agricodeofpractice.membership.code-space-code',
							fixed: false
						}
					],
					caption: "<br />More filters..",
				}
			},
			{
				title: "Create Links",
				namespace: "relationships",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_RELATIONSHIP",
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "JAS-ANZ Export",
				namespace: "jasanzexport",
				parentNamespace: "auditor",
				rootnamespace: nsFreshcare,
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "Freshcare Reports",
				namespace: "report",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "Actions",
				namespace: "action",
				endpoint: "ACTION",
				show: true,
				group: 3,
				type: 1,
				subNote: '& calendar',
				search: 
				{
					filters: 
					[
						{
							caption: "Action Type",
							name: "actiontype",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "SETUP_ACTION_TYPE_SEARCH",
							fixed: false
						},
						{
							caption: "Date From",
							name: "action.duedate",
							type: 'Date',
							comparison: 'GREATER_THAN_OR_EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date To",
							name: "action.duedate",
							type: 'Date',
							comparison: 'LESS_THAN_OR_EQUAL_TO',
							fixed: false
						},
						{
							caption: "Recipient Email",
							name: "action.recipient.email",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						}
					],
					caption: "<br />More filters..",
				}
			},
			{
				title: "Documents",
				namespace: "document",
				endpoint: "DOCUMENT",
				show: true,
				group: 3,
				type: 1
			},
			{
				title: "News",
				namespace: "news",
				endpoint: "NEWS",
				show: true,
				group: 3,
				type: 1
			},
			{
				title: "Projects",
				namespace: "project",
				endpoint: "PROJECT",
				show: true,
				group: 3,
				type: 1
			},
			{
				title: "Project Tasks",
				namespace: "projectTask",
				endpoint: "PROJECT_TASK",
				show: true,
				group: 3,
				type: 1
			},
			{
				title: "Products",
				namespace: "product",
				endpoint: "PRODUCT",
				show: true,
				group: 3,
				type: 1,
				search:
				{
					advanced: true
				}
			},
			{
				title: "Orders",
				namespace: "order",
				endpoint: "PRODUCT_ORDER",
				show: true,
				group: 3,
				type: 1
			},
			{
				title: "Invoices",
				parentNamespace: "financial",
				namespace: "invoice",
				endpoint: "FINANCIAL_INVOICE",
				show: true,
				group: 4,
				type: 1,
				roles: ['financial', 'financialLimited', 'financialReadOnly'],
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "sentdate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Expenses",
				parentNamespace: "financial",
				namespace: "expense",
				endpoint: "FINANCIAL_EXPENSE",
				show: true,
				group: 4,
				type: 1,
				roles: ['financial', 'financialReadOnly'],
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "accrueddate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Receipts",
				parentNamespace: "financial",
				namespace: "receipt",
				endpoint: "FINANCIAL_RECEIPT",
				show: true,
				group: 4,
				type: 1,
				roles: ['financial', 'financialLimited', 'financialReadOnly'],
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "receiveddate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Payments",
				parentNamespace: "financial",
				namespace: "payment",
				endpoint: "FINANCIAL_PAYMENT",
				show: true,
				group: 4,
				type: 1,
				roles: ['financial', 'financialReadOnly'],
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "paiddate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Credits",
				parentNamespace: "financial",
				namespace: "credit",
				endpoint: "FINANCIAL_CREDIT",
				show: true,
				group: 4,
				roles: ['financial', 'financialReadOnly'],
				type: 1
			},
			{
				title: "Financials",
				namespace: "financial",
				endpoint: "FINANCIAL",
				show: true,
				group: 5,
				type: 1,
				roles: ['financial', 'financialReadOnly'],
				subNote: 'P&L, Debtors..'
			},
			{
				title: "Bank Accounts",
				parentNamespace: "financial",
				namespace: "bankAccount",
				endpoint: "FINANCIAL_BANK_ACCOUNT",
				show: true,
				group: 5,
				type: 1,
				roles: ['financial', 'financialReadOnly'],
				subNote: 'Reconcile..'
			},
			{
				title: "Journals",
				parentNamespace: "financial",
				namespace: "journal",
				endpoint: "FINANCIAL_GENERAL_JOURNAL",
				show: true,
				group: 5,
				roles: ['financial', 'financialReadOnly'],
				type: 1
			},
			{
				title: "Payroll",
				parentNamespace: "financial",
				namespace: "payroll",
				endpoint: "FINANCIAL_PAYROLL",
				show: true,
				group: 5,
				roles: ['financial', 'financialReadOnly'],
				type: 1
			},
			{
				title: "Tax",
				parentNamespace: "financial",
				namespace: "tax",
				endpoint: "FINANCIAL_TAX",
				show: true,
				group: 5,
				roles: ['financial', 'financialReadOnly'],
				type: 1
			},
			{
				title: "Budget",
				parentNamespace: "financial",
				namespace: "budget",
				endpoint: "FINANCIAL_BUDGET",
				show: true,
				group: 5,
				roles: ['financial', 'financialReadOnly'],
				type: 1
			},
			{
				title: "Reporting",
				namespace: "report",
				parentNamespace: undefined,
				rootnamespace: ns1blankspace,
				endpoint: "",
				show: false,
				group: 1,
				type: 1
			},
			{
				title: "Users",
				namespace: "user",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "SETUP_USER",
				show: true,
				group: 6,
				type: 2
			},
			{
				title: "User Roles",
				parentNamespace: "setup",
				namespace: "userRole",
				endpoint: "SETUP_USER_ROLE", 
				show: true,
				group: 6,
				type: 2
			},
			{
				title: "Network Groups",
				parentNamespace: "setup",
				namespace: "networkGroup",
				endpoint: "SETUP_NETWORK_GROUP", 
				show: true,
				group: 6,
				type: 2
			},
			{
				title: "Messaging",
				parentNamespace: "setup",
				namespace: "messaging",
				endpoint: "SETUP_MESSAGING", 
				show: true,
				group: 6,
				type: 2
			},
			{
				title: "Websites & Webapps",
				parentNamespace: "setup",
				namespace: "website",
				endpoint: "SETUP_SITE", 
				show: true,
				group: 7,
				type: 2
			},
			{
				title: "Connections",
				namespace: "connect",
				endpoint: "CORE_URL", 
				show: true,
				group: 7,
				type: 2
			},
			{
				title: "Automation",
				parentNamespace: "setup",
				namespace: "automation",
				endpoint: "SETUP_AUTOMATION", 
				show: true,
				group: 7,
				type: 2
			},
			{
				title: "Xero Log Files",
				parentNamespace: "setup",
				namespace: "xerologs",
				rootNamespace: nsFreshcare,
				endpoint: "ACTION", 
				show: true,
				roles: ['xeroSuperUser'],
				group: 7,
				type: 2
			},
			{
				title: 'Actions',
				parentNamespace: "setup",
				namespace: "action",
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2
			},
			{
				title: 'Action Types',
				namespace: 'setup',
				namesuffix: 'actionTypes',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: 
				{
					viewName: 'Action Types', 
					method: 'SETUP_ACTION_TYPE', 
					search: {
								fields: 'title,showincalendar,displayorder,fixed',
								sort:   
								[
									{name: 'displayorder', direction: 'asc'},
									{name: 'title', direction: 'asc'}
								]
							}		
				}												
			},
			{
				title: "Financials",
				parentNamespace: "setup",
				namespace: "financial",
				endpoint: "SETUP_FINANCIAL", 
				show: true,
				group: 8,
				roles: ['financial', 'xeroSuperUser'],
				type: 2
			},
			{
				title: 'Person Groups',
				namespace: 'setup',
				namesuffix: 'contactPersonGroup',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: {viewName: 'Person Groups', method: 'SETUP_CONTACT_PERSON_GROUP'}														
			},
			{
				title: 'Business Groups',
				namespace: 'setup',
				namesuffix: 'contactBusinessGroup',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: {viewName: 'Business Groups', method: 'SETUP_CONTACT_BUSINESS_GROUP'}														
			},
			{
				title: "Project Templates",
				parentNamespace: "setup",
				namespace: "project",
				endpoint: "PROJECT", 
				show: true,
				group: 8,
				type: 2
			},
			{
				title: "Project Template Tasks",
				parentNamespace: "setup",
				namespace: "projectTask",
				endpoint: "PROJECT", 
				show: true,
				group: 8,
				type: 2
			},
			{
				title: 'Attachment Types',
				namespace: 'setup',
				namesuffix: 'attachmentTypes',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: 
				{
					viewName: 'Attachment Types', 
					method: 'SETUP_ATTACHMENT_TYPE', 
					search: {
								sort:   
								[
									{name: 'title'}
								]
							}		
				}												
			},
			{
				title: 'Memberships',
				rootnamespace: nsFreshcare,
				parentNamespace: 'setup',
				namespace: 'membership',
				endpoint: "AGRI", 
				show: true,
				group: 8,
				type: 2										
			},
			{
				title: 'Product Categories',
				namespace: 'setup',
				namesuffix: 'productCategory',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: {viewName: 'Product Categories', method: 'SETUP_PRODUCT_CATEGORY'}														
			},
			{
				title: 'Crops Maintenance',
				namespace: 'setup',
				namesuffix: 'growerCrops',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: 
				{
					viewName: 'Crops', 
					method: 'SETUP_STRUCTURE_ELEMENT_OPTION', 
					search: {
								filters:[
											{name: 'element', comparison: 'EQUAL_TO', value1: nsFreshcare.structureElementCrops}
										], 
								sort:   [
											{name: 'title'}
										]
							},
					save: '&element=' + nsFreshcare.structureElementCrops		
				}												
			},
			{
				title: 'Crop Groups Maintenance',
				namespace: 'setup',
				namesuffix: 'growerCropGroups',
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				param: 
				{
					viewName: 'Crop Groups', 
					method: 'SETUP_STRUCTURE_ELEMENT_OPTION', 
					search: {
								filters:[
											{name: 'element', comparison: 'EQUAL_TO', value1: nsFreshcare.structureElementCropGroups}
										], 
								sort:   [
											{name: 'title'}
										]
							},
					save: '&element=' + nsFreshcare.structureElementCropGroups		
				}												
			},
			{
				title: 'CAR Types',
				parentNamespace: 'setup',
				namespace: 'cartype',
				rootnamespace: nsFreshcare,
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2,
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Membership",
							name: "membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
					],
				}
			},
			{
				title: 'Scheme Codes',
				parentNamespace: 'setup',
				namespace: 'schemecodes',
				rootnamespace: nsFreshcare,
				endpoint: "SETUP", 
				show: true,
				group: 8,
				type: 2
			},
			{
				title: "My Account",
				parentNamespace: "setup",
				namespace: "space",
				endpoint: "ADMIN", 
				show: true,
				group: 9,
				type: 2
			},
			{
				title: "File Import",
				parentNamespace: "setup",
				namespace: "file",
				endpoint: "SETUP_IMPORT_MANAGE", 
				show: true,
				group: 9,
				type: 2
			},
			{
				title: "Other Spaces",
				parentNamespace: "developer",
				namespace: "space",
				endpoint: "ADMIN_SPACE_MANAGE", 
				show: true,
				group: 9,
				type: 2
			},
			{
				title: "Structures",
				parentNamespace: "setup",
				namespace: "structure",
				endpoint: "SETUP_STRUCTURE_MANAGE", 
				show: true,
				group: 9,
				type: 2
			},
			{
				title: "Support Issues",
				namespace: "supportIssue",
				endpoint: "SUPPORT_ISSUE_MANAGE", 
				show: true,
				group: 9,
				type: 2
			},
			{
				title: "Bulk Updates",
				rootnamespace: nsFreshcare,
				parentNamespace: "setup",
				namespace: "bulkupdate",
				show: true,
				group: 9,
				type: 2
			},
			{
				title: "Advanced Search",
				rootnamespace: nsFreshcare,
				namespace: "systemadmin",
				show: true,
				group: 9,
				type: 2
			}
		]
	},
	{	/* Internal Auditor
		v3.1.1e SUP022638 Added new role */
		role: 'Internal Auditor',
		viewGroups:
		[
			{
				id: 1,
				name: 'Contact',
				type: 1
			},
			{
				id: 3,
				name: 'Operations',
				type: 1
			}
		],
		views:
		[
			{
				title: "Trainers",
				namespace: "trainer",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Certification Bodies",
				namespace: "certificationbody",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Businesses",
				namespace: "contactBusiness",
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "People",
				namespace: "contactPerson",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Email",
				parentNamespace: "messaging",
				namespace: "imap",
				endpoint: "MESSAGING_IMAP",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Actions",
				namespace: "action",
				endpoint: "ACTION",
				show: true,
				group: 3,
				type: 1,
				subNote: '& calendar'
			},
			{
				title: "Projects",
				namespace: "project",
				endpoint: "PROJECT",
				show: true,
				group: 3,
				type: 1
			}
		]
	},
	{	/* JASANZ
		v3.1.2 SUP022859 Added new role */
		role: 'JASANZ',
		viewGroups:
		[
			{
				id: 1,
				name: 'Contact',
				type: 1
			},
			{
				id: 2,
				name: 'Freshcare',
				type: 1
			}
		],
		views:
		[
			{
				title: nsFreshcare.data.growersText,
				namespace: "grower",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				readOnly: true,
				group: 1,
				type: 1,
				search:
				{
					filters: 
					[
						{
							caption: "Membership Code",
							name: "contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodColumns: 'code',
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						}
					]
				}
			},
			{
				title: "Certification Bodies",
				namespace: "certificationbody",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				readOnly: true,
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Audits",
				namespace: "audit",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AUDIT",
				show: true,
				readOnly: true,
				group: 2,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Membership",
							name: "audit.contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "Hide Lapsed Audits",
							name: "audit.membershipstatus",
							type: 'Check',
							comparison: 'NOT_EQUAL_TO',
							value: "-1",
							fixed: false
						},
						{
							caption: "Created",
							name: "audit.createddate",
							type: 'Date',
							comparison: 'BETWEEN',
							fixed: false
						}
					],
					caption: "<br />More filters..",
					advanced: true
				}
			},
			{
				title: "Certificates",
				namespace: "certificate",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_CERTIFICATE",
				readOnly: true,
				show: true,
				group: 2,
				type: 1
			}
		]
	},
	{	/* Trainer */
		role: "Trainer",
		viewGroups:
		[
			{
				id: 1,
				name: 'Contacts'
			}
		],
		views:
		[
			{
				title: "Training Packages",
				namespace: "trainingpackage",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TRAINING_PACKAGE",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Training Courses",
				namespace: "trainingcourse",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TRAINING_COURSE",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Course Attendees",
				namespace: "attendance",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE",
				show: nsFreshcare.option.qualifyingTraining,
				group: 2,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Membership",
							name: "agritrainingcourseattendee.course.package.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "COP",
							name: "agritrainingcourseattendee.course.package.codeofpractice",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_CODE_OF_PRACTICE_SEARCH",
							methodFilter: 'agricodeofpractice.membership.code-TEXT_IS_LIKE|code-TEXT_IS_LIKE',
							methodColumns: 'agricodeofpractice.membership.code-space-code',
							fixed: false
						}
					],
					caption: "<br />More filters..",
				}
			},
			{
				title: "Trainees",
				namespace: "grower",
				parentNamespace: "trainer",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Freshcare Profile",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "freshcareprofile",
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Resources",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "resources",
				endpoint: "DOCUMENT_SEARCH",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Reporting",
				namespace: "report",
				parentNamespace: undefined,
				rootnamespace: ns1blankspace,
				endpoint: "",
				show: false,
				group: 1,
				type: 1
			}
		],
	},
	{	/* Auditor */
		role: "Auditor",
		viewGroups:
		[
			{
				id: 1,
				name: 'Contacts'
			}
		],
		views:
		[
			{
				title: nsFreshcare.data.growersText,
				namespace: "grower",
				parentNamespace: "auditor",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Membership Code",
							name: "contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodColumns: 'code',
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "Certificate",
							name: "contactbusiness.agrisubscription.agricertificate.certificatenumber",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Company Id",
							name: "contactbusiness.reference",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Location",
							name: "contactbusiness.streetsuburb",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						}
					],
					caption: "<br />More filters..",
					advanced: true
				}
			},
			{
				title: "Audits",
				namespace: "audit",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AUDIT",
				show: true,
				group: 1,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: nsFreshcare.data.growerText,
							name: "audit.contactbusiness",
							type: 'Select',
							method: "CONTACT_BUSINESS_SEARCH",
							methodFilter: "contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness + '|' +
										  "contactbusiness.relationshipotherbusiness.type-EQUAL_TO-" + nsFreshcare.data.relationshipAuditor,
							methodColumns: 'tradename',
							fixed: false
						},
						{
							caption: "Membership",
							name: "audit.contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "Hide Lapsed Audits",
							name: "audit.membershipstatus",
							type: 'Check',
							comparison: 'NOT_EQUAL_TO',
							value: "-1",
							fixed: false
						},
						{
							caption: "Created",
							name: "audit.createddate",
							type: 'Date',
							comparison: 'BETWEEN',
							fixed: false
						}
					],
					caption: "<br />More filters..",
					advanced: true
				}
			},
			{
				title: "Certificates",
				namespace: "certificate",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_CERTIFICATE",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Freshcare Profile",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "freshcareprofile",
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Resources",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "resources",
				endpoint: "DOCUMENT_SEARCH",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "JAS-ANZ Export",
				namespace: "jasanzexport",
				parentNamespace: "auditor",
				rootnamespace: nsFreshcare,
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Reporting",
				namespace: "report",
				parentNamespace: undefined,
				rootnamespace: ns1blankspace,
				endpoint: "",
				show: false,
				group: 1,
				type: 1
			}
		]
	},
	{	/* Reviewer */
		role: "Reviewer",
		viewGroups:
		[
			{
				id: 1,
				name: 'Contacts'
			}
		],
		views:
		[
			{
				title: "Audits",
				namespace: "audit",
				parentNamespace: "admin",
				rootnamespace: nsFreshcare,
				endpoint: "AUDIT",
				show: true,
				group: 1,
				type: 1,
				search: 
					{
						filters: 
						[
							{
								caption: nsFreshcare.data.growerText,
								name: "audit.contactbusiness",
								type: 'Select',
								method: "CONTACT_BUSINESS_SEARCH",
								methodFilter: "contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness + '|' +
											  "contactbusiness.relationshipotherbusiness.type-EQUAL_TO-" + nsFreshcare.data.relationshipAuditor + '|' +
											  "contactbusiness.customerstatus-EQUAL_TO-" + nsFreshcare.data.contactStatusActive,
								methodColumns: 'tradename',
								fixed: false
							},
							{
								caption: "Membership",
								name: "audit.contactbusiness.agrisubscription.membership",
								type: 'Select',
								comparison: 'EQUAL_TO',
								method: "AGRI_MEMBERSHIP_SEARCH",
								methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
								fixed: false
							},
							{
								caption: "Created",
								name: "audit.createddate",
								type: 'Date',
								comparison: 'BETWEEN',
								fixed: false
							}
						],
						caption: "<br />More filters..",
						advanced: true
					}
			},
			{
				title: "Freshcare Profile",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "freshcareprofile",
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Resources",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "resources",
				endpoint: "DOCUMENT_SEARCH",
				show: true,
				group: 1,
				type: 1
			}
		]
	},
	{	/* Customer */
		role: "Customer",
		viewGroups:
		[
			{
				id: 1,
				name: 'Contacts'
			}
		],
		views:
		[
			{
				title: "Suppliers",
				namespace: "grower",
				parentNamespace: "customer",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1,
				search: 
				{
					filters: 
					[
						{
							caption: "Certified Suppliers Only",
							name: "contactbusiness.agrisubscription.agricertificate.enddate",
							type: "Check",
							comparison: "GREATER_THAN_OR_EQUAL_TO",
							value: dToday.toString('dd MMM yyyy')
						},
						{
							caption: "Membership Code",
							name: "contactbusiness.agrisubscription.membership",
							type: 'Select',
							comparison: 'EQUAL_TO',
							method: "AGRI_MEMBERSHIP_SEARCH",
							methodColumns: 'code',
							methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive ,
							fixed: false
						},
						{
							caption: "Certificate",
							name: "contactbusiness.agrisubscription.agricertificate.certificatenumber",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Company Id",
							name: "contactbusiness.reference",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						},
						{
							caption: "Location",
							name: "contactbusiness.streetsuburb",
							type: 'Text',
							comparison: 'TEXT_IS_LIKE',
							fixed: false
						}
					],
					caption: "<br />More filters..",
					advanced: true
				}
			},
			{
				title: "Freshcare Profile",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "freshcareprofile",
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Resources",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "resources",
				endpoint: "DOCUMENT_SEARCH",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Reporting",
				namespace: "report",
				parentNamespace: undefined,
				rootnamespace: ns1blankspace,
				endpoint: "",
				show: false,
				group: 1,
				type: 1
			}

		]
	},
	{	/* Grower */
		role: 'Member',	
		viewGroups:
		[
			{
				id: 1,
				name: 'Contacts'
			}
		],
		views:
		[
			{
				title: "Freshcare Profile",
				rootnamespace: nsFreshcare,
				parentNamespace: "grower",
				namespace: "grower",
				endpoint: "CONTACT_BUSINESS",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Certificates",
				namespace: "certificate",
				parentNamespace: "grower",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_CERTIFICATE",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Customers",
				namespace: "customer",
				parentNamespace: "grower",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Audits",
				namespace: "audit",
				parentNamespace: "grower",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Certification Bodies",
				namespace: "auditor",
				parentNamespace: "grower",
				rootnamespace: nsFreshcare,
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Training",
				namespace: "trainingcourse",
				parentNamespace: "grower",
				rootnamespace: nsFreshcare,
				endpoint: "AGRI_TRAINING_COURSE_ATTENDEE",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Resources",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "resources",
				endpoint: "DOCUMENT_SEARCH",
				show: true,
				group: 1,
				type: 1
			}
		]
	},
	{	/* Board Member */
		role: "Board Member",
		viewGroups:
		[
			{
				id: 1,
				name: 'Freshcare'
			},
			{
				id: 2,
				name: 'Financial'
			},
			{
				id: 3,
				name: 'Xero',
				roles: ['xeroSuperUser']
			}
		],
		views:
		[
			{
				title: "Freshcare Reports",
				namespace: "freshcarereports",
				parentNamespace: "board",
				rootnamespace: nsFreshcare,
				show: true,
				group: 1,
				type: 1
			},

			{
				title: "Freshcare Profile",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "freshcareprofile",
				endpoint: "CONTACT_PERSON",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Resources",
				rootnamespace: nsFreshcare,
				parentNamespace: "external",
				namespace: "resources",
				endpoint: "DOCUMENT_SEARCH",
				show: true,
				group: 1,
				type: 1
			},
			{
				title: "Invoices",
				parentNamespace: "financial",
				namespace: "invoice",
				endpoint: "FINANCIAL_INVOICE",
				show: true,
				group: 2,
				type: 1,
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "sentdate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Expenses",
				parentNamespace: "financial",
				namespace: "expense",
				endpoint: "FINANCIAL_EXPENSE",
				show: true,
				group: 2,
				type: 1,
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "accrueddate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Receipts",
				parentNamespace: "financial",
				namespace: "receipt",
				endpoint: "FINANCIAL_RECEIPT",
				show: true,
				group: 2,
				type: 1,
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "receiveddate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Payments",
				parentNamespace: "financial",
				namespace: "payment",
				endpoint: "FINANCIAL_PAYMENT",
				show: true,
				group: 2,
				type: 1,
				search:
				{
					advanced: true,
					filters:
					[
						{
							caption: "Amount",
							name: "amount",
							type: 'Text',
							comparison: 'EQUAL_TO',
							fixed: false
						},
						{
							caption: "Date",
							name: "paiddate",
							type: 'Date',
							comparison: 'EQUAL_TO',
							fixed: false
						}
					],
				}
			},
			{
				title: "Credits",
				parentNamespace: "financial",
				namespace: "credit",
				endpoint: "FINANCIAL_CREDIT",
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "Financial Reports",
				namespace: "financialreports",
				parentNamespace: "board",
				rootnamespace: ns1blankspace,
				show: true,
				group: 2,
				type: 1
			},
			{
				title: "Financials Setup",
				parentNamespace: "setup",
				namespace: "financial",
				endpoint: "SETUP_FINANCIAL", 
				show: true,
				group: 3,
				roles: ['xeroSuperUser'],
				type: 1
			},
			{
				title: "Businesses",
				namespace: "contactBusiness",
				endpoint: "CONTACT_BUSINESS", 
				show: true,
				group: 3,
				roles: ['xeroSuperUser'],
				type: 1
			},
			{
				title: "People",
				parentNamespace: "admin",
				namespace: "contactPerson",
				endpoint: "CONTACT_PERSON", 
				rootNamespace: nsFreshcare,
				show: true,
				group: 3,
				roles: ['xeroSuperUser'],
				type: 1
			},
			{
				title: "Log Files",
				parentNamespace: "setup",
				namespace: "xerologs",
				rootNamespace: nsFreshcare,
				endpoint: "ACTION", 
				show: true,
				group: 3,
				roles: ['xeroSuperUser'],
				type: 1
			}
		]
	}
]

nsFreshcare.scripts =
[
	{
		nameSpace: 'freshcare.render',
		source: '/site/' + nsFreshcare.site + '/freshcare.render-4.0.016.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.util',
		source: '/site/' + nsFreshcare.site + '/freshcare.util-4.0.014.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.attendance',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.attendance-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.audit',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.audit-4.0.019a.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.auditcar',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.auditcar-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.certificationbody',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.certificationbody-4.0.019b.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.certificate',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.certificate-4.0.019.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.contactPerson',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.contactperson-3.4.007.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.customer',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.customer-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.grower',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.grower-4.0.015.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.home',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.home-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.newelearning',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.newelearning-4.0.016.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.newgrower',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.newgrower-4.0.016.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.newmemberships',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.newmemberships-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.newtrainee',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.newtrainee-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.relationships',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.relationships-4.0.015.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.report',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.report-4.0.019.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.trainer',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.trainer-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.trainingpackage',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.trainingpackage-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.trainingcourse',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.trainingcourse-4.0.009.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.user',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.user-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.admin.userswitch',
		source: '/site/' + nsFreshcare.site + '/freshcare.admin.userswitch-3.1.1e.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.auditor.grower',
		source: '/site/' + nsFreshcare.site + '/freshcare.auditor.grower-4.0.006.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.auditor.home',
		source: '/site/' + nsFreshcare.site + '/freshcare.auditor.home-4.0.015.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.auditor.jasanzexport',
		source: '/site/' + nsFreshcare.site + '/freshcare.auditor.jasanzexport-3.4.004.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.board',
		source: '/site/' + nsFreshcare.site + '/freshcare.board-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.customer.grower',
		source: '/site/' + nsFreshcare.site + '/freshcare.customer.grower-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.customer.home',
		source: '/site/' + nsFreshcare.site + '/freshcare.customer.home-4.0.015.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.external.grower',
		source: '/site/' + nsFreshcare.site + '/freshcare.external.grower-4.0.012.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.extend',
		source: '/site/' + nsFreshcare.site + '/freshcare.extend-4.0.019.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.external.resources',
		source: '/site/' + nsFreshcare.site + '/freshcare.external.resources-4.0.010.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: '1blankspace.grower.audit',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.audit-3.4.008.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.grower.auditor',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.auditor-2.0.4.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.grower.certificate',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.certificate-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.grower.customer',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.customer-3.4.005.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.grower.grower',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.grower-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.grower.home',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.home-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.grower.trainingcourse',
		source: '/site/' + nsFreshcare.site + '/freshcare.grower.trainingcourse-3.4.008.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.internal',
		source: '/site/' + nsFreshcare.site + '/freshcare.internal-4.0.016.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.help',
		source: '/site/' + nsFreshcare.site + '/freshcare.help-3.2.015.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.report',
		source: '/site/' + nsFreshcare.site + '/freshcare.report-4.0.019.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.reviewer.home',
		source: '/site/' + nsFreshcare.site + '/freshcare.reviewer.home-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.setup.bulkupdate',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.bulkupdate-4.0.012.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.external.freshcareprofile',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.freshcareprofile-4.0.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.setup.membership',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.membership-4.0.016.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.setup.cartype',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.cartype-4.0.010.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.setup.xerologs',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.xerologs-3.2.001.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.setup.schemecodes',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.schemecodes-4.0.016.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.setup.user',
		source: '/site/' + nsFreshcare.site + '/freshcare.setup.user-1.0.0.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.systemadmin',
		source: '/site/' + nsFreshcare.site + '/freshcare.systemadmin-4.0.015.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.trainer.grower',
		source: '/site/' + nsFreshcare.site + '/freshcare.trainer.grower-4.0.006.js',
		sourceNS: nsFreshcare
	},
	{
		nameSpace: 'freshcare.trainer.home',
		source: '/site/' + nsFreshcare.site + '/freshcare.trainer.home-4.0.001.js',
		sourceNS: nsFreshcare
	}
]

nsFreshcare.doLast = function() 
{

	// Initialize tooltip component
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

	// Initialize popover component
	$(function () {
	  $('[data-toggle="popover"]').popover()
	})

	// v3.1.207 Added for action template reminders - catching up to 1blankspace.control
	ns1blankspace.xhtml.templates.source.invoiceschedule = '/site/' + nsFreshcare.site + '/1blankspace.setup.financial.invoiceschedule-1.0.0.html';
	ns1blankspace.xhtml.templates.source.payment = '/site/' + nsFreshcare.site + '/1blankspace.setup.financial.payment-1.0.0.html';
	ns1blankspace.xhtml.templates.source.action = '/site/' + nsFreshcare.site + '/1blankspace.setup.action-1.0.0.html';

	ns1blankspace.option.showProductCodes = false;

	// v3.1.0 Now add additional fields to extend object for Person if not already there
	var oElementToAdd = 
	{
		backgroundcolour: "",
		caption: "Email Signature",
		category: "",
		categorytext: "",
		datatype: "3",
		datatypetext: "Text - Multi Line",
		description: "Email Signature",
		displayorder: "",
		hint: "",
		id: "signature",
		notes: "",
		notestype: "1",
		notestypetext: "Text - Multi Line",
		reference: "signature",
		structure: "",
		structuretext: "",
		textcolour: "",
		title: "Email Signature"
	};
	
	// 3.1.2 SUP022688 Added CAR Type Import
	ns1blankspace.setup.file.data.importObjects.push(
	{
		object: 217, 
		objectName: 'issuesintype',
		objectMethod: 'SETUP_AUDIT_ISSUE_SINTYPE',
		objectCaption: 'CAR Types'
	});

	ns1blankspace.setup.file['import'].data.rules.push({
		object: 217,
		include: true,
		name: 'issuesintype.membershiptext',
		datatype: 'numeric',
		inputtype: 'select',
		searchendpoint: 'AGRI',
		searchmethod: 'AGRI_MEMBERSHIP_SEARCH',
		searchName: 'code'
	});

	ns1blankspace.setup.file['import'].data.rules.push({
		object: 217,
		include: true,
		name: 'issuesintype.issuetypetext',
		datatype: 'numeric',
		inputtype: 'select',
		searchendpoint: 'SETUP',
		searchmethod: 'SETUP_AUDIT_ISSUE_TYPE_SEARCH',
		searchName: 'title'
	});


	// v3.3.001 SUP023569 Added COntactBusiness History Fields
	if (ns1blankspace.contactBusiness.data == undefined)
	{	ns1blankspace.contactBusiness.data = {};}

	ns1blankspace.contactBusiness.data.historyFields =
	[
		{name: 'reference', caption: 'Reference'},
		{name: 'tradename', caption: 'Trading Name'},
		{name: 'legalname', caption: 'Legal Name'},
		{name: 'abn', caption: 'ABN'},
		{name: 'suplierstatustext', caption: 'Supplier Status'},
		{name: 'suplierstatustext', caption: 'Customer Status'},
		{name: 'website', caption: 'Website'},
		{name: 'phonenumber', caption: 'Business Phone'},
		{name: 'faxnumber', caption: 'Fax Number'},
		{name: 'mailingaddress1', caption: 'Mailing Address'},
		{name: 'mailingaddress2', caption: 'Mailing Address 2'},
		{name: 'mailingsuburb', caption: 'Mailing Suburb'},
		{name: 'mailingstate', caption: 'Mailing State'},
		{name: 'mailingpostcode', caption: 'Mailing Post Code'},
		{name: 'mailingcountry', caption: 'Mailing Country'},
		{name: 'primarycontactpersontext', caption: 'Primary Contact Person'},
		{
			name: 'sexerocontactid', 
			caption: 'Xero Business ID', 
			include: function() {return nsFreshcare.option.exportToXero}
		},
		{
			name: 'sexerocontactupdated', 
			caption: 'Date Last Sent to Xero', 
			include: function() {return nsFreshcare.option.exportToXero}
		}
	];
	// v3.1.1 SUP022322 Add Audit to list of objects that can be searched when filtering on objecttext
	if (ns1blankspace.data.search)
	{
		if (ns1blankspace.data.search.length > 0)
		{
			ns1blankspace.data.search[0].rows.push({id: '107', title: 'Audit'});
		}

		// v3.1.2 SUP022693 Add object for FRESHCARE_MONTH_SEARCH
		// v3.1.205 SUP023036 Fixed spelling of February
		if ($.grep(ns1blankspace.data.search, function(x) {return x.method == 'FRESHCARE_MONTH_SEARCH'}).length == 0)
		{
			ns1blankspace.data.search.push(
			{
				method: 'FRESHCARE_MONTH_SEARCH',
				rows: 
				[
					{id: '',  title: '[Not specified]'},
					{id: '0',  title: '[Not specified]'},		// v4.0.001 Added 
					{id: '1',  title: 'January'},
					{id: '2', title: 'February'},
					{id: '3', title: 'March'},
					{id: '4',  title: 'April'},
					{id: '5',  title: 'May'},
					{id: '6',  title: 'June'},
					{id: '7',  title: 'July'},
					{id: '8',   title: 'August'},
					{id: '9',   title: 'September'},
					{id: '10',  title: 'October'},
					{id: '11',  title: 'November'},
					{id: '12',   title: 'December'}
				]
			});
			ns1blankspace.data.search[ns1blankspace.data.search.length -1].data = ns1blankspace.data.search[ns1blankspace.data.search.length -1].rows;
		}
	}

	
	ns1blankspace.messaging.imap.data.objects =
	[
		{
			id: 12,
			caption: 'Business',
			method: 'CONTACT_BUSINESS_SEARCH',
			columns: 'tradename',
			methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE'
		},
		{
			id: 32,
			caption: 'Person',
			method: 'CONTACT_PERSON_SEARCH',
			columns: 'firstname,surname,contactbusinesstext',
			methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE',
			setvalues: 'data-contactBusiness contactperson.contactbusiness'
		},
		{
			id: 107,
			caption: 'Audit',
			method: 'AUDIT_SEARCH',
			columns: 'reference,actualdate,contactbusinesstext',
			methodFilter: 'reference-TEXT_IS_LIKE|contactbusinesstext-TEXT_IS_LIKE',
			setvalues: 'data-contactBusiness audit.contactbusiness'
		},
		{
			id: 1,
			caption: 'Project',
			method: 'PROJECT_SEARCH',
			columns: 'reference,description',
			methodFilter: 'reference-TEXT_IS_LIKE|description-TEXT_IS_LIKE'
		},
		{
			id: 5,
			caption: 'Invoice',
			method: 'FINANCIAL_INVOICE_SEARCH',
			columns: 'reference,sentdate,contactbusinesssenttotext',
			methodFilter: 'reference-TEXT_IS_LIKE|contactbusinesssenttotext-TEXT_IS_LIKE',
			setvalues: 'data-contactBusiness invoice.contactbusinesssentto|data-contactPerson invoice.contactpersonsentto'
		},
		{
			id: 2,
			caption: 'Expense',
			method: 'FINANCIAL_EXPENSE_SEARCH',
			columns: 'reference,accrueddate,contactbusinesspaidtotext',
			methodFilter: 'reference-TEXT_IS_LIKE|contactbusinesspaidtotext-TEXT_IS_LIKE',
			setvalues: 'data-contactBusiness expense.contactbusinesspaidto|data-contactPerson expense.contactpersonpaidto'
		},
		{
			id:-32,
			caption: 'Selected Recipients'
		}
	]

	// Add fields to Invoice Template tags
	if (ns1blankspace.format && ns1blankspace.format.tags)
	{
		// v1.0.3 Added to overwrite standard invoice formatting
		// Add Invoice item Ex GST
		if ($.grep(ns1blankspace.format.tags, function(x) {return x.caption === 'Item Amount ex GST'}).length === 0)
		{
			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 2,
					caption: "Item Amount ex GST",
					method: "FINANCIAL_ITEM_SEARCH",
					source: 'calculate',
					sourceFunction: 'extend.format.itemAmountExGST',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.itemAmountExGST',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: 'lineitem'
				});
		}

		// Add Business mailing Addresses
		if ($.grep(ns1blankspace.format.tags, function(x) {return x.caption === 'Legal Name'}).length === 0)
		{
			// v3.1.1e SUP022621 Added Legal name
			// v3.1.2 SUP022625 All Mailing Address are now calculate fields
			ns1blankspace.format.tags.push(
			{
				object: 5,
				type: 1,
				caption: "Legal Name",
				source: 'invoice.contactbusinesssentto.legalname'
			});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Person (New Line)",
					source: 'calculate',
					sourceFunction: 'extend.format.personNewLine',
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceMethod: 'extend.format.personNewLine',
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceMethodRootNamespace: nsFreshcare,
					sourceGroup: "invoice"
				});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "First Name",
					source: 'invoice.contactpersonsentto.firstname'
				});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Surname",
					source: 'invoice.contactpersonsentto.surname'
				});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing Address Combined",
					source: 'calculate',
					sourceFunction: 'extend.format.mailingAddress',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingAddress',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});

			/*ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing Address 1",
					sourceFunction: 'extend.format.mailingAddress1',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingAddress1',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing Address 2",
					sourceFunction: 'extend.format.mailingAddress2',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingAddress2',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing Suburb",
					sourceFunction: 'extend.format.mailingSuburb',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingSuburb',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing State",
					sourceFunction: 'extend.format.mailingState',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingState',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});*/

			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing Postcode",
					sourceFunction: 'extend.format.mailingPostCode',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingPostCode',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});

			/*ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "Mailing Country",
					sourceFunction: 'extend.format.mailingCountry',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.mailingCountry',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: "invoice.contactbusinesssentto"
				});*/

			// v3.2.017 SUP023453 Added eWay Reference
			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "eWay Reference",
					source: 'calculate',
					sourceFunction: 'extend.format.eWayReference',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.eWayReference',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare',
					sourceGroup: 'invoice'
				});
		}

		// v3.1.1n SUP022585 Add Sent By & Sent By Email
		// User's Full Name
		if ($.grep(ns1blankspace.format.tags, function(x) {return x.caption === 'User Name'}).length === 0)
		{
			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "User Name",
					source: 'calculate',
					sourceFunction: 'extend.format.userFullName',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.userFullName',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare'
				});
		}

		// User's email 
		if ($.grep(ns1blankspace.format.tags, function(x) {return x.caption === 'User Email'}).length === 0)
		{
			ns1blankspace.format.tags.push(
				{
					object: 5,
					type: 1,
					caption: "User Email",
					source: 'calculate',
					sourceFunction: 'extend.format.userEmail',
					sourceFunctionRootNamespace: nsFreshcare,
					sourceFunctionRootNamespaceText: 'nsFreshcare',
					sourceMethod: 'extend.format.userEmail',
					sourceMethodRootNamespace: nsFreshcare,
					sourceMethodRootNamespaceText: 'nsFreshcare'
				});
		}

		// v4.0.001 Certificate Email fields
		if ($.grep(ns1blankspace.format.tags, function(x) {return x.caption === 'Certificate Number'}).length === 0)
		{
			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_MEMBERFIRSTNAME'
				/*caption: nsFreshcare.data.growerText + " First Name",
				source: 'calculate',
				sourceFunction: 'extend.format.templateGrowerFirstname',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_MEMBERSURNAME'
				/*caption: nsFreshcare.data.growerText + " Surname",
				source: 'calculate',
				sourceFunction: 'extend.format.templateGrowerSurname',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_MEMBERTRADINGNAME'
				/*caption: nsFreshcare.data.growerText + " Trading Name",
				source: 'calculate',
				sourceFunction: 'extend.format.templateGrowerTradename',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_CERTIFICATENUMBER'
				/*caption: "Certificate Number",
				source: 'calculate',
				sourceFunction: 'extend.format.templateCertificateNumber',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_MEMBERSHIP'
				/*caption: "Membership",
				source: 'calculate',
				sourceFunction: 'extend.format.templateMembership',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_AUDITDATE'
				/*caption: "Audit Date",
				source: 'calculate',
				sourceFunction: 'extend.format.templateAuditDate',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_CERTIFICATEEXPIRY'
				/*caption: "Certificate Expiry",
				source: 'calculate',
				sourceFunction: 'extend.format.templateCertificateExpiry',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectCertificate,
				type: 1,
				caption: 'TEMPLATE_AUDITORNAME'
				/*caption: "Auditor Name",
				source: 'calculate',
				sourceFunction: 'extend.format.templateAuditorName',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});
		}

		// v4.0.001 CAR Email Fields
		if ($.grep(ns1blankspace.format.tags, function(x) {return x.caption === 'Open CARs - All'}).length === 0)
		{
			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_MEMBERFIRSTNAME'
				/*caption: nsFreshcare.data.growerText + " First Name",
				source: 'calculate',
				sourceFunction: 'extend.format.templateGrowerFirstname',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_MEMBERSURNAME'
				/*caption: nsFreshcare.data.growerText + " Surname",
				source: 'calculate',
				sourceFunction: 'extend.format.templateGrowerSurname',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_MEMBERTRADINGNAME'
				/*caption: nsFreshcare.data.growerText + " Trading Name",
				source: 'calculate',
				sourceFunction: 'extend.format.templateGrowerTradename',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_MEMBERSHIP'
				/*caption: "Membership",
				source: 'calculate',
				sourceFunction: 'extend.format.templateMembership',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_AUDITDATE'
				/*caption: "Audit Date",
				source: 'calculate',
				sourceFunction: 'extend.format.templateAuditDate',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_AUDITORNAME'
				/*caption: "Auditor Name",
				source: 'calculate',
				sourceFunction: 'extend.format.templateAuditorName',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_OPENCARSALL'
				/*caption: "Open CARs - All",
				source: 'calculate',
				sourceFunction: 'extend.format.templateOpenCARsAll',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_OPENCARSMAJOR'
				/*caption: "Open CARs - Major",
				source: 'calculate',
				sourceFunction: 'extend.format.templateOpenCARsMajor',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare';*/
			});

			ns1blankspace.format.tags.push(
			{
				object: nsFreshcare.objectAuditIssue,
				type: 1,
				caption: 'TEMPLATE_OPENCARSMINOR'
				/*caption: "Open CARs - Minor",
				source: 'calculate',
				sourceFunction: 'extend.format.templateOpenCARsMinor',
				sourceFunctionRootNamespace: nsFreshcare,
				sourceFunctionRootNamespaceText: 'nsFreshcare'*/
			});
		}
	}
	
	// v3.1.215 SUP023190 Support Issue Defaults
	ns1blankspace.supportIssue.data.defaultUser = "31";
	ns1blankspace.supportIssue.data.defaultSeverity = "2";
	ns1blankspace.supportIssue.data.type.label1 = 'Bug Report';
	ns1blankspace.supportIssue.data.type.label2 = 'New Feature';
	ns1blankspace.supportIssue.data.type.toolTip['1'] = 'A problem has occurred';
	ns1blankspace.supportIssue.data.type.toolTip['2'] = 'Request for a change to the core or specialised system';
	ns1blankspace.supportIssue.data.severity.toolTip['0'] = 'Issue is preventing a large proportion of the users from doing any actions on the application or from using a major part of the system.';
	ns1blankspace.supportIssue.data.severity.toolTip['1'] = 'A material part of the application is not available or not working correctly. Users can perform day-to-day activities but with impaired performance or output.';
	ns1blankspace.supportIssue.data.severity.toolTip['2'] = 'A non-critical part of the application is not working correctly and a workaround is not available.';
	ns1blankspace.supportIssue.data.severity.toolTip['3'] = 'Part of the application is not working correctly but a workaround is available';
	ns1blankspace.supportIssue.data.severity.toolTip['4'] = 'Severity to be advised.'


	// v3.2.010 SUP023420
	ns1blankspace.contactsearch.data.businessColumns =
	[
		{column: 'tradename', label: 'Trading Name'},
		{column: 'legalname', label: 'Legal Name'},
		{column: function(oRow) 
				{return oRow.streetsuburb.formatXHTML() + ' ' + oRow.streetstate.formatXHTML()}, label: 'Location'},
		{column: 'phonenumber', label: 'Phone'},
		{column: 'streetsuburb', hidden: true},
		{column: 'streetstate', hidden: true},
		{
			column: nsFreshcare.extend.contactsearch.businesses.newPage,
			label: 'Business Type',
			newPage: true
		}
	];

	ns1blankspace.contactsearch.data.personColumns =
	[
		{column: 'firstname', label: 'First Name'},
		{column: 'surname', label: 'Surname'},
		{column: 'workphone', label: 'Phone'},
		{column: 'mobile', label: 'Mobile'},
		{column: 'email', label: 'Email'},
		{column: 'contactbusinesstext', label: 'Business'},
		{column: 'contactbusiness', hidden: true},
		{
			column: nsFreshcare.extend.contactsearch.people.newPage,
			label: 'Business Type',
			newPage: true
		}
	]

	// v3.4.001
	ns1blankspace.action.data.blobField = 'text';

	if (nsFreshcare.control.doVeryLast)
	{
		nsFreshcare.control.doVeryLast();
	}
}

nsFreshcare.app = 
{
	init: function() 
	{
		/// ************** Need to copy this over to other app's app.init function if this is changed **************** ///					
		ns1blankspace.control.doLast = nsFreshcare.control.doLast;
		ns1blankspace.option.postInit = 'nsFreshcare.control.init';

		// Bind app-specific classes such as nsFreshcareSelectGrower
		nsFreshcare.app.bindClasses();

		// Add in Freshcare scripts
		//Bootstrap:
		//nsFreshcare.site = msOnDemandSiteId;
		$('#ns1blankspaceLogo').html('<img src="/site/' + nsFreshcare.site + '/logo.png" alt="Freshcare">');
		ns1blankspace.user.site = nsFreshcare.site;
		nsFreshcare.app.loadScripts(nsFreshcare.scripts, nsFreshcare);
		
		// Put product Groups list into memory
		nsFreshcare.app.initCommonVariables();
		if (ns1blankspace.option.passwordExpiry == undefined) {ns1blankspace.option.passwordExpiry = {}}
		ns1blankspace.option.passwordExpiry.site = nsFreshcare.site;
		ns1blankspace.option.passwordExpiry.days = 365;

		// SUP022082 v2.0.4o Added in cufon fonts for Trebuchet MS
		if (ns1blankspace.rootnamespacetext == 'nsFreshcare')
		{	Cufon.replace('.trebuchet-ms', { fontFamily: 'Trebuchet MS', hover: true }); }
	},

	bindClasses: function()
	{
		$(document).on('keyup', 'input.ns1blankspaceSelect', function(e) 
		{
			var oEvent = e;
			var oElement = this;
			nsFreshcare.util.businessPersonSelection(oEvent, oElement);		// v1.0.26 moved this code out to function
		});	
		
		// v3.3.001 SUP023795 Now reacts to nsFreshcareSelected and radio clicks
		$(document).on('click', '.nsFreshcareSelectable', function()
		{
			if ($(this).attr('data-1blankspace') != 'ignore')
			{
				ns1blankspace.inputDetected = true;
			}
		});

		$(document).on('click', '.nsFreshcareHarvestMonthsSelected', function()
		{
			if ($(this).attr('data-1blankspace') != 'ignore')
			{
				ns1blankspace.inputDetected = true;
			}
		});

		$(document).on('click', ':radio', function()
		{
			if ($(this).attr('data-1blankspace') != 'ignore')
			{
				ns1blankspace.inputDetected = true;
			}
		});

		$(document).on('focusout', 'input.nsFreshcareSelectGrower', function() 
		{	
			$(this).removeClass('ns1blankspaceHighlight');
		});

		$(document).on('focusin', 'input.nsFreshcareSelectGrower', function() 
		{		
			$('input.ns1blankspaceHighlight').removeClass('ns1blankspaceHighlight');

			$(this).addClass('ns1blankspaceHighlight');
			
			ns1blankspace.xhtml.divID = this.id;
			
			$(ns1blankspace.xhtml.container).html('');
			$(ns1blankspace.xhtml.container).show();
			$(ns1blankspace.xhtml.container).offset(
			{ 
				top: $('#' + ns1blankspace.xhtml.divID).offset().top,
				left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width() - 10
			});
					
			$(ns1blankspace.xhtml.container).html('<span id="ns1blankspaceSelectOptions" class="ns1blankspaceSelectOptions"></span>');
			
			$('#ns1blankspaceSelectOptions').button(
			{
				text: false,
				icons: {
					primary: "ui-icon-triangle-1-s"
				}
			})
			.click(function()
			{
				nsFreshcare.util.searchGrower.show({xhtmlElementID: ns1blankspace.xhtml.divID, source: 4});
			})
			.css('width', '14px')
			.css('height', '21px')
		});
			
		$(document).on('keyup', 'input.nsFreshcareSelectGrower', function(e)
		{
			var oEvent = e;
			var oElement = this;
			// v3.3.001 SUP023422 was not blanking out id when user cleared field
			if ($(this).val().length == 0) {$(this).attr('data-id', '')}
			nsFreshcare.util.businessPersonSelection(oEvent, oElement);		// Added same funcitonality as ns1blankspaceSelect

			if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
		
			var sFunction = "nsFreshcare.util.searchGrower.show({xhtmlElementID: ns1blankspace.xhtml.divID," +
								"source: 1," +
								"minimumLength: 1});"
		
			ns1blankspace.timer.delayCurrent = setTimeout(sFunction, ns1blankspace.option.typingWait);
		});	
		
	},

	loadScripts: function(aScripts, oRoot)
	{
		$.each(aScripts, function()
		{
			var iSite = oRoot.site;

			if (this.source != '') 
			{
				var aSource = this.source.split('/');
				if (this.sourceNS)
				{
					iSite = this.sourceNS.site;
				}
				
				aSource[2] = iSite;

				ns1blankspace.app.loadScript(aSource.join('/'));
			}	
		});
	},

	initCommonVariables: 	function() 
	{

		//bootstrap:
		//nsFreshcare.site = msOnDemandSiteId;

		nsFreshcare.data.months = [];
		nsFreshcare.data.months.push({value: '1', text: 'Jan'});
		nsFreshcare.data.months.push({value: '2', text: 'Feb'});
		nsFreshcare.data.months.push({value: '3', text: 'Mar'});
		nsFreshcare.data.months.push({value: '4', text: 'Apr'});
		nsFreshcare.data.months.push({value: '5', text: 'May'});
		nsFreshcare.data.months.push({value: '6', text: 'Jun'});
		nsFreshcare.data.months.push({value: '7', text: 'Jul'});
		nsFreshcare.data.months.push({value: '8', text: 'Aug'});
		nsFreshcare.data.months.push({value: '9', text: 'Sep'});
		nsFreshcare.data.months.push({value: '10', text: 'Oct'});
		nsFreshcare.data.months.push({value: '11', text: 'Nov'});
		nsFreshcare.data.months.push({value: '12', text: 'Dec'});

		if (ns1blankspace.isLab) 
		{

			// dev values
			nsFreshcare.data.relationshipParentBusiness = '311';	// lab
			nsFreshcare.data.trainingCourse.attendeeStatusAttended = 4;
			nsFreshcare.data.stateDistanceEducation = '9';

			// New documents v2.0.1
			nsFreshcare.data.documentCertificateBackground = '6502';		// v4.0.019
			nsFreshcare.data.legacyCertificate.documentCertificateTextFSQ = '5986';		
			nsFreshcare.data.legacyCertificate.documentCertificateTextOther = '6041';		
			nsFreshcare.data.currentCertificate.documentCertificateTextFSQ = '6230';		
			nsFreshcare.data.currentCertificate.documentCertificateTextOther = '6231';		
			nsFreshcare.data.jasanzCertificate.documentCertificateTextFSQ = '6260';		
			nsFreshcare.data.jasanzCertificate.documentCertificateTextOther = '6261';		
			nsFreshcare.data.documentCertificateTemplateDefault = '6044';		// v2.0.4 SUP021408 changed from documentEmailTemplateDefault 
			nsFreshcare.data.documentCARTemplateDefault = '6062';				// + added documentCertificateTemplateDefault & flderDocumentTemplates
			nsFreshcare.data.folderDocumentTemplates = '446';

			// Old documents v1.0.??
			nsFreshcare.data.legacyCertificate.documentCertificateText = '5986';		
			nsFreshcare.data.legacyCertificate.documentCertificateBackground = '6229';		
			nsFreshcare.data.legacyCertificate.documentCertificateBackgroundFSQ = '5985';		
			nsFreshcare.data.legacyCertificate.documentCertificateBackgroundOther = '5989';	
			nsFreshcare.data.currentCertificate.documentCertificateText = '6035';		

			nsFreshcare.data.emailToAdmin = "cassandra.buono@alt-designit.com.au";
			nsFreshcare.data.emailToAuditor = "cassandra.buono@alt-designit.com.au" //;katie@freshcare.com.au";
			nsFreshcare.data.emailToCustomer = "cassandra.buono@alt-designit.com.au" //;katie@freshcare.com.au";
			nsFreshcare.data.emailToGrower = "cassandra.buono@alt-designit.com.au" //;katie@freshcare.com.au";
			nsFreshcare.data.emailToTrainer = "cassandra.buono@alt-designit.com.au" //;katie@freshcare.com.au";
			nsFreshcare.data.emailFromAuditor = "noreply@freshcare.com.au";
			nsFreshcare.data.emailFromCustomer = "cassandra.buono@alt-designit.com.au";
			nsFreshcare.data.emailFromGrower = "cassandra.buono@alt-designit.com.au";
			nsFreshcare.data.emailFromTrainer = "cassandra.buono@alt-designit.com.au";
			nsFreshcare.data.emailFromAdmin = "cassandra.buono@alt-designit.com.au";
		}
		else 
		{

			// Production values
			nsFreshcare.data.relationshipParentBusiness = '3345';	// prod
			nsFreshcare.data.trainingCourse.attendeeStatusNewMembership = '3';	// prod
			nsFreshcare.data.trainingCourse.attendeeStatusNewContact = '4';		// prod
			nsFreshcare.data.grower.productGroupFreshProduce = '2';	// prod
			nsFreshcare.data.contactStatusPendingApproval = '8';		// prod
			nsFreshcare.data.stateDistanceEducation = '9';
			nsFreshcare.data.actionTypeUserNotes = '1448';			
			nsFreshcare.data.sendPrintedCertificatesId = '8659';	// prod
			nsFreshcare.data.actionTypeCertificate = '1197';		// prod
			nsFreshcare.data.actionTypeLateLoggedAudit = '1199'		// prod
			nsFreshcare.data.actionTypeAuditRejected = '1469';		// prod
			nsFreshcare.data.actionTypeLogFile = '1548';			// prod
			nsFreshcare.data.actionTypeRecertAuditLate = '1559';	// prod 	v3.3.003 SUP023800 Wrong id!
			nsFreshcare.data.actionTypeOtherReason = '1584'			// prod
			nsFreshcare.data.actionTypeAuditTrail = '1585'			// prod
			nsFreshcare.data.actionTypeCertificateExtension = '1682'	// prod
			nsFreshcare.data.userPasswordId = '13367';				// prod
			nsFreshcare.data.userSubscriptionStart = '13368';		// prod
			nsFreshcare.data.userSubscriptionExpires = '13369';		// prod
			nsFreshcare.data.certificationBodyNumberId = '13235';	// prod
			nsFreshcare.data.selfCertificationDateId = '13214';		// prod
			nsFreshcare.data.jasanzDateId = '13215';				// prod
			nsFreshcare.structureElementCrops = '13213';			// prod
			nsFreshcare.structureElementCropGroups = '13729';		// prod
			//nsFreshcare.user.auditorReportUser = '1000062759';				// prod (admin@sciqualnew: 1000062759)
			nsFreshcare.user.auditorReportUser = '1000062753';				// prod (admin@ausqual: 1000062753)

			// New documents v2.0.1
			nsFreshcare.data.legacyCertificate.documentCertificateBackground = '56171';		
			nsFreshcare.data.documentCertificateBackground = '148795';		// v4.0.019
			nsFreshcare.data.legacyCertificate.documentCertificateTextFSQ = '56172';		
			nsFreshcare.data.legacyCertificate.documentCertificateTextOther = '56173';		
			nsFreshcare.data.currentCertificate.documentCertificateTextFSQ = '71204';		
			nsFreshcare.data.currentCertificate.documentCertificateTextOther = '71279';		
			nsFreshcare.data.jasanzCertificate.documentCertificateTextFSQ = '89599';			//'56174';		v3.1.2 SUP022693 Changed
			nsFreshcare.data.jasanzCertificate.documentCertificateTextOther = '89600'			//'56175';		v3.1.2 SUP022693 Changed		
			nsFreshcare.data.documentCertificateTemplateDefault = '56293';
			nsFreshcare.data.documentCARTemplateDefault = '61971';
			nsFreshcare.data.folderDocumentTemplates = '3772';

			nsFreshcare.data.attachmentTypeLogo = '272';	
			nsFreshcare.data.attachmentTypeSignature = '273';	
			nsFreshcare.data.attachmentTypeCertificate = '274';
			nsFreshcare.data.attachmentTypeEmailImages = '295';
			nsFreshcare.data.attachmentTypeCertificateExtension = '464';

			nsFreshcare.data.audit.typeInitial = '1';
			nsFreshcare.data.audit.typeRecert = '2';

			nsFreshcare.data.auditCAR.severityCritical = '7';

			nsFreshcare.data.audit.typeScopeExtension = '27';		
			nsFreshcare.data.audit.typeUnannouncedInitial = '31';	
			nsFreshcare.data.audit.typeUnannouncedRecert = '32';	

			nsFreshcare.data.audit.resultStatusConducted = '17';		
			nsFreshcare.data.audit.resultStatusAwaitingReview = '18';	
			nsFreshcare.data.audit.resultStatusApproved = '19';			
			nsFreshcare.data.audit.resultStatusRejected = '20';			
			nsFreshcare.data.audit.resultStatusSuspended = '21';	// v3.4.004 Hadn't specified this yet

			nsFreshcare.data.attachmentTypeReviewChecklist = '337';
			nsFreshcare.data.attachmentTypeAuditReport = '336';
			// v3.1.206 fileExtension was not included on Audit Report
			nsFreshcare.data.audit.auditorAttachments = 
			[
				{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf'},
				{type: '351', typetext: 'Internal Document', fileExtension: 'pdf,doc,docx,xls,xlsx'},
				{type: nsFreshcare.data.attachmentTypeSupportingEvidence}/*,
				{type: nsFreshcare.data.attachmentTypeCertificate, typetext: 'Certificate'} */
			];
			// v3.3.001 SUP023474 Now also checks for Audit Report when Approved
			nsFreshcare.data.audit.requiredAttachmentTypes = 
			[
				{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf', resultStatus: nsFreshcare.data.audit.resultStatusApproved},
				{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf', resultStatus: nsFreshcare.data.audit.resultStatusPending},
				{type: nsFreshcare.data.attachmentTypeAuditReport, typetext: 'Audit Report', fileExtension: 'pdf', resultStatus: nsFreshcare.data.audit.resultStatusCompleted},
				{type: '351', typetext: 'Internal Document', fileExtension: 'pdf,doc,docx,xls,xlsx', resultStatus: nsFreshcare.data.audit.resultStatusAwaitingReview}
			];			
			nsFreshcare.data.audit.reviewerRequiredAttachmentTypes = [];		// SUP022885 Tech Review Checklist no longer required

			// v3.1.1i SUP022764 Added
			nsFreshcare.data.roles.admin = '23';
			nsFreshcare.data.roles.auditor = '24';
			nsFreshcare.data.roles.administrator = '87';
			nsFreshcare.data.roles.board = '49';
			nsFreshcare.data.roles.customer = '26';
			nsFreshcare.data.roles.financial = '85';
			nsFreshcare.data.roles.financialLimited = '84';
			nsFreshcare.data.roles.financialReadOnly = '86';
			nsFreshcare.data.roles.grower = '27';
			nsFreshcare.data.roles.internalAuditor = '81';
			nsFreshcare.data.roles.jasanz = '91';
			nsFreshcare.data.roles.reviewer = '76';
			nsFreshcare.data.roles.trainer = '25';
			nsFreshcare.data.roles.xeroSuperUser = '98';

			nsFreshcare.data.dummyCertBodyPerson = '1000663091';	
			nsFreshcare.data.automationsUser = '39381';
			nsFreshcare.data.reportingRoles = 
				[nsFreshcare.data.roles.admin, nsFreshcare.data.roles.auditor, nsFreshcare.data.roles.trainer, nsFreshcare.data.roles.customer];	// v3.2.016

			nsFreshcare.data.groupAccountsContact = '7498';
			nsFreshcare.data.eLearningBusiness = '1367308';		// 3.2.010 SUP023469

			ns1blankspace.option.actionReminderTemplate = '95939';	// v3.1.203 Prod reminder template
			delete(ns1blankspace.option.messagingCheckURL) //= "https://api.mydigitalstructure.com/"; 		// v3.0.010 removed
		}

		// v3.2.001 SUP023329 Common location to store id's of roles
		nsFreshcare.app.getInternalRoles();
		nsFreshcare.app.getExternalRoles();
	},

	getInternalRoles: function()
	{
		nsFreshcare.data.rolesInternal = 
		[
			nsFreshcare.data.roles.admin,
			nsFreshcare.data.roles.administrator,
			nsFreshcare.data.roles.board,
			nsFreshcare.data.roles.financial,
			nsFreshcare.data.roles.financialLimited,
			nsFreshcare.data.roles.financialReadOnly,
			nsFreshcare.data.roles.internalAuditor,
			nsFreshcare.data.roles.jasanz,
			nsFreshcare.data.roles.xeroSuperUser
		];
	},

	getExternalRoles: function()
	{
		nsFreshcare.data.rolesExternal = 
		[
			nsFreshcare.data.roles.auditor,
			nsFreshcare.data.roles.customer,
			nsFreshcare.data.roles.grower,
			nsFreshcare.data.roles.trainer
		]

	}
}

nsFreshcare.control = 
{
	doLast: function() 
	{
		// Do these after loading all of the scripts - basically redefines the ns1blankspace namespace where applicable
		//nsFreshcare.doLast()
		window.setTimeout('nsFreshcare.doLast()', 1000);
	},
 
	redirectScripts: function()
	{
		// Here we re-alias ns1blankspace scripts that have been overwritten in Freshcare namespace - but only after relevant files have been loaded
		if (ns1blankspace.report && nsFreshcare.report && nsFreshcare.data.reportInit != true)
		{
			ns1blankspace.report.reports = [];
			ns1blankspace.report.reportGroups = [];
			ns1blankspace.report.dictionary = [];
			ns1blankspace.report.selectAttributes = [];
			ns1blankspace.report.showExport = true;
			// Replace reporting functions
			ns1blankspace.report.init = nsFreshcare.report.init;
			nsFreshcare.data.reportInit = true;
		}

		if (ns1blankspace.setup && ns1blankspace.setup.automation && ns1blankspace.setup.networkGroup
			&& ns1blankspace.setup.messaging && ns1blankspace.setup.networkGroup
			&& ns1blankspace.setup.financial && nsFreshcare.admin.user && nsFreshcare.admin.user.networkGroups
			&& nsFreshcare.extend && nsFreshcare.data.setupInit != true)
		{
			ns1blankspace.setup.automation.summary = nsFreshcare.control.setup.automation.summary;
			ns1blankspace.setup.networkGroup.users.add = nsFreshcare.admin.user.networkGroups.members.add;
			ns1blankspace.setup.home = nsFreshcare.extend.setup.codes.home;
			ns1blankspace.setup.messaging.summary = nsFreshcare.extend.setup.messaging.summary;		// v3.1.1 SUP022293
			ns1blankspace.setup.messaging.search.send = nsFreshcare.extend.setup.messaging.search.send;		// v3.1.215 SUP023190
			ns1blankspace.setup.messaging.details = nsFreshcare.extend.setup.messaging.details;		// v3.1.215 SUP023190
			ns1blankspace.setup.messaging.save.send = nsFreshcare.extend.setup.messaging.save.send;		// v3.1.215 SUP023190
			ns1blankspace.setup.file["import"].upload.show = nsFreshcare.extend.setup.file["import"].upload.show 	// v3.1.2 SUP022688 
			ns1blankspace.setup.user.access.show = nsFreshcare.admin.user.access.show;		// v3.1.207 SUP023058
			//ns1blankspace.setup.file['export'].saveToFile = ns1blankspace.report.saveToFile;		// 3.1.209
			ns1blankspace.setup.financial.template.show = nsFreshcare.extend.setup.financial.template.show 		// v4.0.001
			ns1blankspace.setup.financial.template.save = nsFreshcare.extend.setup.financial.template.save 		// v4.0.001
			nsFreshcare.data.setupInit = true;
		}
			
		if (ns1blankspace.contactBusiness && nsFreshcare.internal && nsFreshcare.internal.contactBusiness && nsFreshcare.data.internalInit != true)
		{
			ns1blankspace.contactBusiness.home = nsFreshcare.internal.contactBusiness.home;
			ns1blankspace.contactBusiness.layout = nsFreshcare.internal.contactBusiness.layout;
			ns1blankspace.contactBusiness.search.send = nsFreshcare.internal.contactBusiness.search.send;
			ns1blankspace.contactBusiness.show = nsFreshcare.internal.contactBusiness.show;
			ns1blankspace.contactBusiness.save.send = nsFreshcare.internal.contactBusiness.save.send;
			ns1blankspace.contactBusiness.summary = nsFreshcare.internal.contactBusiness.summary;	// v3.1.0i SUP022247
			ns1blankspace.contactBusiness.details = nsFreshcare.internal.contactBusiness.details;	// v3.1.204 SUP023015
			ns1blankspace.contactBusiness.groups.add = nsFreshcare.internal.entity.groups.add;	// v3.1.0i SUP022250
			ns1blankspace.actions.edit = nsFreshcare.internal.entity.actions.edit; 		// v3.1.202 SUP022613
			ns1blankspace.actions.save = nsFreshcare.internal.entity.actions.save; 		// v3.1.202 SUP022613
			nsFreshcare.data.internalInit = true;
		}

		if (ns1blankspace.contactPerson && nsFreshcare.render && nsFreshcare.admin.contactPerson && nsFreshcare.data.renderInit != true)
		{
			ns1blankspace.contactPerson.init = nsFreshcare.admin.contactPerson.init;		// v3.1.0i SUP022247
			ns1blankspace.contactPerson.search.send = nsFreshcare.admin.contactPerson.search.send;		// v3.1.0i SUP022247
			ns1blankspace.contactPerson.groups.add = nsFreshcare.internal.entity.groups.add;	// v3.1.0i SUP022250
			nsFreshcare.data.renderInit = true;
		}

		if (ns1blankspace.control && ns1blankspace.control.views && ns1blankspace.control.setView && nsFreshcare.control.setView && nsFreshcare.data.controlInit != true)
		{
			ns1blankspace.control.views.show = nsFreshcare.control.views.show;		// v2.0.3b
			ns1blankspace.control.setView = nsFreshcare.control.setView;
			nsFreshcare.data.controlInit = true;
		}

		if (ns1blankspace.document && nsFreshcare.extend && nsFreshcare.extend.document && nsFreshcare.data.documentInit != true)
		{
			//ns1blankspace.setup.networkGroup.groups.add = nsFreshcare.extend.document.networkGroup.add;		// v1.0.402
			//ns1blankspace.document.details = nsFreshcare.extend.document.details;
			//ns1blankspace.document.add = nsFreshcare.extend.document.add;		// v3.1.210
			//ns1blankspace.document.save.send = nsFreshcare.extend.document.save.send;
			ns1blankspace.document.edit = nsFreshcare.extend.document.edit;		// v3.1.215
			nsFreshcare.data.documentInit = true;
		}

		if (ns1blankspace.contactsearch && nsFreshcare.extend && nsFreshcare.data.contactSearchInit != true)
		{
			ns1blankspace.contactsearch.businesses.bind = nsFreshcare.extend.contactsearch.businesses.bind;
			ns1blankspace.contactsearch.people.bind = nsFreshcare.extend.contactsearch.people.bind;
			nsFreshcare.data.contactSearchInit = true;
		}

		if (ns1blankspace.action && nsFreshcare.extend && nsFreshcare.data.actionInit != true)
		{
			//ns1blankspace.action.next10 = nsFreshcare.extend.action.next10;
			ns1blankspace.action.summary = nsFreshcare.extend.action.summary; 	// v3.4.004 SUP022735
			nsFreshcare.data.actionInit = true;
		}

		if (ns1blankspace.attachments && nsFreshcare.control.attachments && nsFreshcare.data.attachmentsInit != true)
		{
			//ns1blankspace.attachments.show = nsFreshcare.control.attachments.show;								// v3.1.1f SUP022623 ibs improvement
			//ns1blankspace.attachments.bind = nsFreshcare.control.attachments.bind;								// v3.1.1f SUP022623 ibs improvement
			//ns1blankspace.attachments.add = nsFreshcare.control.attachments.add;
			//ns1blankspace.attachments.upload.show = nsFreshcare.control.attachments.upload.show;
			//ns1blankspace.attachments.upload.status = nsFreshcare.control.attachments.upload.status;
			nsFreshcare.data.attachmentsInit = true;
		}

		if (ns1blankspace.financial && ns1blankspace.financial.invoice && ns1blankspace.financial.expense 
			&& ns1blankspace.financial.receipt && ns1blankspace.financial.credit && ns1blankspace.financial.payment && ns1blankspace.setup.financial
			&& nsFreshcare.internal && nsFreshcare.extend && nsFreshcare.data.financialInit != true)
		{
			ns1blankspace.financial.invoice.home = nsFreshcare.internal.financial.invoice.home;
			// Added v3.1.0 Calls freshcare.extend.util.ondemandPDFCreate instead of 1blankspace version
			ns1blankspace.financial.invoice.summary["default"] = nsFreshcare.extend.financial.invoice.summary["default"];
			//ns1blankspace.financial.invoice.summary.show = nsFreshcare.extend.financial.invoice.summary.show;		// v3.1.1 SUP022524
			ns1blankspace.financial.invoice.search.send = nsFreshcare.extend.financial.invoice.search.send;
			ns1blankspace.financial.invoice.email.init = nsFreshcare.extend.financial.invoice.email.init;			// v3.1.1 SUP022524
			ns1blankspace.financial.invoice.email.render = nsFreshcare.extend.financial.invoice.email.render;		// v3.1.0e SUP022278
			ns1blankspace.financial.invoice.email.show = nsFreshcare.extend.financial.invoice.email.show;			// v3.1.0g SUP022278
			ns1blankspace.financial.invoice.email.send = nsFreshcare.extend.financial.invoice.email.send;			// v3.1.0g SUP022278
			ns1blankspace.financial.invoice.save.send = nsFreshcare.extend.financial.invoice.save.send;				// v3.1.1 SUP022504
			ns1blankspace.financial.invoice.layout = nsFreshcare.extend.financial.invoice.layout;					// v3.1.1f SUP022623
			ns1blankspace.financial.invoice.show = nsFreshcare.extend.financial.invoice.show;						// v3.1.1f SUP022623
			ns1blankspace.financial.invoice.details = nsFreshcare.extend.financial.invoice.details;					// v3.1.1i SUP022764
			ns1blankspace.financial.invoice.receipt.show = nsFreshcare.extend.financial.invoice.receipt.show;		// v3.1.1f SUP022623 Bug in 1bs

			ns1blankspace.financial.expense.home = nsFreshcare.extend.financial.expense.home;						// v3.1.1i SUP022764
			ns1blankspace.financial.expense.layout = nsFreshcare.extend.financial.expense.layout;
			ns1blankspace.financial.expense.show = nsFreshcare.extend.financial.expense.show;						// v3.1.1f SUP022623
			ns1blankspace.financial.expense.payment.show = nsFreshcare.extend.financial.expense.payment.show;		// v3.1.1f SUP022623 Bug in 1bs
			ns1blankspace.financial.receipt.home = nsFreshcare.extend.financial.receipt.home;						// v3.1.1i SUP022764
			ns1blankspace.financial.receipt.layout = nsFreshcare.extend.financial.receipt.layout;					// v3.1.1f SUP022623
			ns1blankspace.financial.receipt.show = nsFreshcare.extend.financial.receipt.show;						// v3.1.1f SUP022623
			ns1blankspace.financial.receipt.invoice.show = nsFreshcare.extend.financial.receipt.invoice.show;		// v3.1.2  1bs Not paginating
			ns1blankspace.financial.credit.home = nsFreshcare.extend.financial.credit.home;							// v3.1.1i SUP022764
			ns1blankspace.financial.credit.search.send = nsFreshcare.extend.financial.credit.search.send;			// v3.2.001 SUP023329
			ns1blankspace.financial.credit.layout = nsFreshcare.extend.financial.credit.layout;						// v3.1.1f SUP022623
			ns1blankspace.financial.credit.show = nsFreshcare.extend.financial.credit.show;							// v3.1.1f SUP022623
			ns1blankspace.financial.credit.details = nsFreshcare.extend.financial.credit.details;						// v3.1.1f SUP022623
			ns1blankspace.financial.credit.save = nsFreshcare.extend.financial.credit.save;							// v3.2.001 SUP023329
			ns1blankspace.financial.journal.home = nsFreshcare.extend.financial.journal.home;	 					// v3.1.1i SUP022764
			ns1blankspace.financial.journal.layout = nsFreshcare.extend.financial.journal.layout;					// v3.1.1i SUP022764
			ns1blankspace.financial.journal.summary = nsFreshcare.extend.financial.journal.summary;					// v3.1.1i SUP022764
			ns1blankspace.financial.journal.show = nsFreshcare.extend.financial.journal.show;						// v3.1.1i SUP022764
			ns1blankspace.financial.credit.appliedTo.show = nsFreshcare.extend.financial.credit.appliedTo.show;		// v3.1.1f SUP022623 Bug in 1bs
			ns1blankspace.financial.credit.appliedTo.remove = nsFreshcare.extend.financial.credit.appliedTo.remove;	// v3.1.1f SUP022765 Bug in 1bs
			ns1blankspace.financial.payment.home = nsFreshcare.extend.financial.payment.home;						// v3.1.1i SUP022764
			ns1blankspace.financial.payment.layout = nsFreshcare.extend.financial.payment.layout;					// v3.1.1f SUP022623
			ns1blankspace.financial.payment.show = nsFreshcare.extend.financial.payment.show;						// v3.1.1f SUP022623

			ns1blankspace.financial.item.show = nsFreshcare.extend.financial.item.show;
			ns1blankspace.financial.item.row = nsFreshcare.extend.financial.item.row;
			ns1blankspace.financial.item.edit = nsFreshcare.extend.financial.item.edit;
			ns1blankspace.financial.item.save = nsFreshcare.extend.financial.item.save;
			
			// V3.1.209 now uses 1blankspace setup.financial for templates
			ns1blankspace.setup.financial.accounts.show = nsFreshcare.extend.setup.financial.accounts.show;
			ns1blankspace.setup.financial.home = nsFreshcare.extend.setup.financial.home;							// v3.2.001 SUP023329
			//ns1blankspace.setup.financial.template.show = nsFreshcare.extend.setup.financial.template.show;
			//ns1blankspace.setup.financial.home = nsFreshcare.extend.setup.financial.home; 						//v3.1.0e SUP022234
			//ns1blankspace.setup.financial.save.send = nsFreshcare.extend.setup.financial.save.send; 				//v3.1.0e SUP022234
			//ns1blankspace.util.initTemplate = nsFreshcare.extend.util.initTemplate; 								//v3.1.0e SUP022234

			ns1blankspace.actions.show = nsFreshcare.extend.actions.show;											// v3.1.1f SUP022623 Bug in 1bs
			ns1blankspace.actions.bind = nsFreshcare.extend.actions.bind;											// v3.1.1f SUP022623 1bs improvement

			ns1blankspace.financial.invoicing.unsent.show = nsFreshcare.extend.financial.invoicing.unsent.show;		// v3.1.2
			ns1blankspace.financial.invoicing.unsent.row = nsFreshcare.extend.financial.invoicing.unsent.row;		// v3.1.2
			ns1blankspace.financial.invoicing.unsent.preview.showHide = nsFreshcare.extend.financial.invoicing.unsent.preview.showHide;		// 3.1.2
			ns1blankspace.financial.invoicing.unsent.preview.init = nsFreshcare.extend.financial.invoicing.unsent.preview.init;		// v3.1.2
			ns1blankspace.financial.invoicing.unsent.email = nsFreshcare.extend.financial.invoicing.unsent.email;		// v3.1.2

			ns1blankspace.financial.util.codes = nsFreshcare.extend.financial.util.codes;								// v3.2.001
			nsFreshcare.data.financialInit = true;
		}
	
		if (ns1blankspace.project && ns1blankspace.projectTask && nsFreshcare.extend && nsFreshcare.data.projectInit != true)
		{
			ns1blankspace.project.layout = nsFreshcare.extend.project.layout;						// v3.1.1i SUP022768
			ns1blankspace.projectTask.layout = nsFreshcare.extend.projectTask.layout;				// v3.1.1i SUP022768
			nsFreshcare.data.projectInit = true;
		}

		if (ns1blankspace.order && nsFreshcare.extend && nsFreshcare.data.orderInit != true)
		{
			ns1blankspace.order.details = nsFreshcare.extend.order.details;						// v3.2.001 SUP023329
			nsFreshcare.data.orderInit = true;
		}

		if (ns1blankspace.format && nsFreshcare.extend && nsFreshcare.data.formatInit != true)
		{
			ns1blankspace.format.render = nsFreshcare.extend.format.render;
			ns1blankspace.format.process = nsFreshcare.extend.format.process;
			ns1blankspace.format.editor.init = nsFreshcare.extend.format.editor.init;		
			nsFreshcare.data.formatInit = true;
		}

		// v3.1.2 Added due to bug in 1blankspace version (order.items.rows doesn't exist)
		if (ns1blankspace.order)
		{
			ns1blankspace.order.items.rows = ns1blankspace.order.items.row;
		}

		// 3.1.0 Added so that Signature comes from Person record, not Messaging Account
		ns1blankspace.messaging.imap.data.signatureFrom = 'CONTACTPERSON';
	},

	init: 		function(oParam) 
	{
		var oRoot = ns1blankspace.rootnamespace;
		if (oParam === undefined) {oParam = {controlInitStep: 0}}
		else if (oParam.controlInitStep === undefined) {oParam.controlInitStep = 0}

		//ns1blankspace.debug.enabled = true;

		nsFreshcare.control.redirectScripts();


		if (oParam.controlInitStep === 0) 
		{
			var oRootNamespace = ns1blankspace.rootnamespace;

			ns1blankspace.status.working();
			ns1blankspace.xhtml.viewControl = undefined;
			
			// Update header

			if (ns1blankspace.isLab) 
			{
				$('#ns1blankspaceLogo').html('<img src="/site/' + oRootNamespace.site + '/logo.png" alt="' + ns1blankspace.user.contactBusinessText + '">');
			}
				
			// determine Role
			if (ns1blankspace.user.roles) 
			{
				var aRoles = $.map(ns1blankspace.user.roles, function(a) { return a.title});
				
				// v3.1.1i Added multi-role support for Admin users and now shows error in confirm as status element isn't yet in DOM
				// v3.2.001 SUP023329 Now allows multi-roles for all internal roles
				if (ns1blankspace.user.roles.length > 1 
					&& $.grep(ns1blankspace.user.roles, function(x) {return $.inArray(x.id, nsFreshcare.data.rolesExternal) > -1}).length > 0) 
				{
					ns1blankspace.container.confirm({html: 'Invalid configuration - user has more than one role. Please contact support.'});
					return;
				}
				else if (aRoles.length === 0) 
				{
					ns1blankspace.container.confirm({html: 'Invalid configuration - user has no roles. Please contact support.'});
					return;
				}
				else 
				{
					nsFreshcare.user.role = ($.grep(aRoles, function(x) {return x.toLowerCase() == 'admin'}).length == 0) ? aRoles[0] : 'Admin';
					nsFreshcare.user.roleLower = nsFreshcare.user.role.toLowerCase();
					nsFreshcare.user.roleID = $.map($.grep(ns1blankspace.user.roles, function(x) {return x.title == nsFreshcare.user.role}), function(y) {return y.id}).shift();

					if (nsFreshcare.user.role != 'Admin') 
					{
						var sHeaderText = (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) 
							 	? "Certification Bodie" 
								: ((nsFreshcare.user.roleID != nsFreshcare.data.roles.grower) ? nsFreshcare.user.role : nsFreshcare.data.growerText);
						
						$('#nsFreshcareOnlineHeaderRole').html(nsFreshcare.data.appName + ' for ' + sHeaderText + (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? '' : 's'));		
						$('#ns1blankspaceViewControlSetupContainer').hide();				
					}
					else
					{
						ns1blankspace.setupShow = true;
						$('#nsFreshcareOnlineHeaderRole').html(nsFreshcare.data.appName);		
						$('#ns1blankspaceViewControlSetupContainer').show();
					}

					// v3.1.209 Now sets ns1blanksapce.supportAdmin at the same time
					if (1 == 0)		//(ns1blankspace.isLab)
					{
						nsFreshcare.supportAdmin = true;
					}
					else
					{	
						nsFreshcare.supportAdmin = (ns1blankspace.user.logonName.split('@').shift() === 'ibcom' || ns1blankspace.isLab);
					}
					ns1blankspace.supportAdmin = nsFreshcare.supportAdmin;

					// v3.1.1i SUP022764 Added freshcareAdministrator role
					// v3.1.207 SUP023058 Removed the dependency on ns1blankspace.user.systemadmin
					nsFreshcare.freshcareAdministrator = ($.grep(ns1blankspace.user.roles, function(x) {return x.id == nsFreshcare.data.roles.administrator}).length > 0);
					ns1blankspace.report.showUpdate = (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin);
					ns1blankspace.report.showEmail = (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin);
					ns1blankspace.report.showSMS = (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin);
				}
			}
			else 
			{
				// no roles configured - cannot continue
				ns1blankspace.status.error('Invalid configuration - no roles defined. Please contact support.');
				return;
			}

			// Added condition v1.023 otherwise was showing this for admin@sciqual as well
			if (ns1blankspace.user.logonName.substr(ns1blankspace.user.logonName.length - 2) === 'new') 
			{
				nsFreshcare.user.auditorReportUser += '1000062759';				// prod (admin@ausqual: 1000062753)
			}

			// v3.4.001 Now checks for Network Groups and saves against nsFreshcare.user object. 
			var oSearch = new AdvancedSearch();
			oSearch.method = 'SETUP_USER_NETWORK_GROUP_SEARCH';
			oSearch.addField('networkgroup,networkgrouptext,disabled');
			oSearch.addFilter('user', 'EQUAL_TO', ns1blankspace.user.id);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					nsFreshcare.user.networkGroups = oResponse.data.rows;
					oParam.controlInitStep = 1;
					nsFreshcare.control.init(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error searching for network groups: ' + oResponse.error.errornotes);
				}
			})
		}

		// Get RelationshipTypes
		else if (oParam.controlInitStep === 1) 
		{
			if (nsFreshcare.data.relationshipAuditor === undefined) 
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				oParam.controlInitStep = 2;
				nsFreshcare.control.relationshipTypes(oParam);
			}
			else
			{
				oParam.controlInitStep = 2;
				nsFreshcare.control.init(oParam);
			}
		}

		// Get Freshcare Memberships
		else if (oParam.controlInitStep === 2) 
		{
			oParam.controlInitStep = 3;
			if (nsFreshcare.data.memberships === undefined) 
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				nsFreshcare.control.freshcareMemberships(oParam);
			}
			else
			{
				nsFreshcare.control.init(oParam);
			}
		}

		// Get PersonGroups & Scope options
		else if (oParam.controlInitStep === 3) 
		{
			if (nsFreshcare.data.groupGrower.length === 0) 
			{
				oParam.businessGroups = true;
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				nsFreshcare.control.groups(oParam);
			}
			else if (nsFreshcare.data.scopeOptions == undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				nsFreshcare.control.getScopeOptions(oParam);
			}
			else
			{
				oParam.controlInitStep = 4;
				nsFreshcare.control.init(oParam);
			}
		}

		// Get Subscription Status
		else if (oParam.controlInitStep === 4) 
		{
			if (nsFreshcare.data.grower.subscriptionStatus === undefined) 
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				nsFreshcare.control.subscriptionStatus(oParam);
			}
			else
			{
				oParam.controlInitStep = 5;
				nsFreshcare.control.init(oParam);
			}
		}

		// Get Product Groups
		else if (oParam.controlInitStep === 5) 
		{
			if (nsFreshcare.data.productGroups === undefined) 
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				oParam.controlInitStep = 6;
				nsFreshcare.control.freshcareProductGroups(oParam);
			}
			else
			{
				oParam.controlInitStep = 6;
				nsFreshcare.control.init(oParam);
			}
		}

		// Setup Views
		else if (oParam.controlInitStep === 6) 
		{
			
			// Setup views. Extract list from nsFreshcare.setup, replace ns1blankspace.views and push profile options
			ns1blankspace.views = [];
			ns1blankspace.viewGroups = [];
			$($.grep(nsFreshcare.setup, function (a) {return a.role == nsFreshcare.user.role;})).each(function(i, j) 
			{
				$.each(j.views, function() 
				{	
					// We couldn't add this into the view when setting up as the user.contactBusiness is undefined at that point
					// v3.1.1i SUP022764 Now ensure we have the correct role for the menu item (initially only applies to admin users but may change in future)
					// v3.2.015 SUP023421 Now uses roleID
					if (this.roles == undefined
						|| nsFreshcare.util.anyMatchInArray($.map(ns1blankspace.user.roles, function(x) {return x.id}), nsFreshcare.util.getRoles({roleNames: this.roles}).split(',')))
					{
						if (this.namespace == "audit" && this.parentNamespace == "admin") 
						{
							if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor)
							{	
								this.search.filters.unshift(							
									{
										caption: "Auditor",
										name: "audit.auditperson",
										type: 'Select',
										method: "CONTACT_PERSON_SEARCH",
										methodFilter: "contactperson.contactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness,
										methodColumns: 'firstname-space-surname',
										comparison: 'EQUAL_TO',
										fixed: false
									});
							}
							// v3.1.1e SUP022638 Now applies also to internal auditor
							else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin || nsFreshcare.user.roleID === nsFreshcare.data.roles.internalAuditor)
							{
								// v3.1.204 SUP023020 Was using persongroup
								// v3.2.024 Was using groupAuditor instead of businessGroupAuditor
								this.search.filters.unshift(							
								{
									caption: "Cert Body",
									name: "audit.auditbusiness",
									type: 'Select',
									comparison: 'EQUAL_TO',
									method: "CONTACT_BUSINESS_SEARCH",
									methodFilter: "tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|" +
												  "contactbusiness.businessgroup-EQUAL_TO-" + nsFreshcare.data.businessGroupAuditor + '|' + 
												  "contactbusiness.primarycontactperson-EQUAL_TO-field:contactbusiness.contactperson.id",
									methodColumns: 'tradename',
									fixed: false
								});

								this.search.filters.unshift(							
								{
									caption: nsFreshcare.data.growerText,
									name: "audit.contactbusiness",
									type: 'Select',
									method: "CONTACT_BUSINESS_SEARCH",
									methodFilter: "tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|" +
												  "contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness + '|' +
												  "contactbusiness.relationshipotherbusiness.type-EQUAL_TO-" + nsFreshcare.data.relationshipAuditor,
									methodColumns: 'tradename',
									fixed: false
								});
							}
						}

						// Need to set correct structureElement for crops maintenance for prod
						if (this.namesuffix === 'growerCrops')
						{
							this.param.search.filters[0].value1 = nsFreshcare.structureElementCrops;
							this.param.save = '&element=' + nsFreshcare.structureElementCrops;
						}

						// v3.3.001 SUP023456 Need to set correct structureElement for crop Group maintenance for prod
						if (this.namesuffix === 'growerCropGroups')
						{
							this.param.search.filters[0].value1 = nsFreshcare.structureElementCropGroups;
							this.param.save = '&element=' + nsFreshcare.structureElementCropGroups;
						}

						// v3.4.004 
						if (this.namespace == 'trainingpackage' && nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
						{
							this.search.filters.push(
							{
								caption: "Relates to..",
								name: 'segrouptype',
								type: 'Select',
								comparison: 'EQUAL_TO',
								method: "SETUP_CONTACT_BUSINESS_GROUP_SEARCH",
								methodColumns: 'title',
								methodFilter: "id-IN_LIST-" + nsFreshcare.data.businessGroupGroweriD + ',' +
															  nsFreshcare.data.businessGroupAuditor + ',' + 
															  nsFreshcare.data.businessGroupCustomer + ',' + 
															  nsFreshcare.data.businessGroupTrainer,
								fixed: false
							});
						}
						ns1blankspace.views.push(this);
					}
				});

				$.each(j.viewGroups, function() 
				{	
					// v3.1.1i SUP022764 Now ensure we have the correct role for the menu item (initially only applies to admin users but may change in future)
					if (this.roles == undefined
						|| nsFreshcare.util.anyMatchInArray($.map(ns1blankspace.user.roles, function(x) {return x.id}), nsFreshcare.util.getRoles({roleNames: this.roles}).split(',')))
					{
						ns1blankspace.viewGroups.push(this);
					}
				});

				// 3.0.1a ns1blankspace.viewGroupsSetup = this.viewGroupsSetup;
			});

			oParam.controlInitStep = 7;
			nsFreshcare.control.init(oParam);
		}

		// Get role-specific information
		else if (oParam.controlInitStep === 7) 
		{
			// v3.1.1e SUP022638 Now applies also to internal auditor
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin || nsFreshcare.user.roleID === nsFreshcare.data.roles.internalAuditor || nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz) 
			{
				if (nsFreshcare.data.sendPrintedCertificatesOptions === undefined)
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.sendPrintedCertificatesOptions(oParam);
				}
				else if (nsFreshcare.data.actionTypes === undefined)
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.getActionTypes(oParam);
				}
				else
				{
					ns1blankspace.home.show = nsFreshcare.admin.home.init;
					oParam.controlInitStep = 8;
					nsFreshcare.control.init(oParam);
				}
			}
			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.grower) 
			{
				ns1blankspace.home.show = nsFreshcare.grower.home.init;
				ns1blankspace.home.options.show = nsFreshcare.auditor.home.options.show;

				// Growers need some initial values set - get these now
				if (nsFreshcare.data.growerMemberships === undefined) 
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.setupGrower(oParam);
				}
				else if (nsFreshcare.data.sendPrintedCertificatesOptions === undefined)
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.sendPrintedCertificatesOptions(oParam);
				}
				else
				{
					oParam.controlInitStep = 8;
					nsFreshcare.control.init(oParam);
				}
			}

			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.customer) 
			{
				ns1blankspace.home.show = nsFreshcare.customer.home.init;
				ns1blankspace.home.options.show = nsFreshcare.auditor.home.options.show;
				ns1blankspace.report.initData = nsFreshcare.customer.home.report.initData;

				// Customers need some initial values set - get these now
				if (nsFreshcare.data.customerExSuppliers === undefined) 
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.setupCustomer(oParam);
				}
				else 
				{
					oParam.controlInitStep = 8;
					nsFreshcare.control.init(oParam);
				}
			}

			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) 
			{

				ns1blankspace.home.show = nsFreshcare.auditor.home.init;
				ns1blankspace.report.initData = nsFreshcare.auditor.home.report.initData;
				ns1blankspace.home.options.show = nsFreshcare.auditor.home.options.show;
				
				if (nsFreshcare.data.sendPrintedCertificatesOptions === undefined)
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.sendPrintedCertificatesOptions(oParam);
				}
				else if (nsFreshcare.data.auditor.selfCertificationDate === undefined)
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.getCertificationBodyOptions(oParam);
				}
				else if (nsFreshcare.data.auditor.selfCertificationDate != undefined)
				{	
					
					// Check if we need to remove Certificates from the menu
					var dSelfCert = ((nsFreshcare.data.auditor.selfCertificationDate != '') 
							? new Date(nsFreshcare.data.auditor.selfCertificationDate) 
							: new Date(dToday.toString('dd MMM yyyy')));
					if ((dSelfCert > dToday))
					{
						var iIndex;
						$.each(ns1blankspace.views, function(index)
						{
							if (this.title == 'Certificates') {iIndex = index;}
						});
						ns1blankspace.views.splice(iIndex, 1);
					}

					if (nsFreshcare.user.auditorReportUser.indexOf(ns1blankspace.user.contactPerson) > -1) 
					{
						nsFreshcare.auditor.setup.exports();
					}

					oParam.controlInitStep = 8;
					nsFreshcare.control.init(oParam);
				}
				
			}

			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer) 
			{
				ns1blankspace.home.show = nsFreshcare.trainer.home.init;
				ns1blankspace.report.initData = nsFreshcare.trainer.home.report.initData;
				ns1blankspace.home.options.show = nsFreshcare.trainer.home.options.show;
				
				// Trainers need some initial values set - get these now
				if (nsFreshcare.data.trainerMemberships === undefined) 
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
					nsFreshcare.control.setupTrainer(oParam);
				}
				else 
				{
					oParam.controlInitStep = 8;
					nsFreshcare.control.init(oParam);
				}
			}

			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.board) 
			{
				ns1blankspace.home.show = nsFreshcare.board.home.init;
				//ns1blankspace.report.initData = nsFreshcare.board.report.initData;
				ns1blankspace.home.options.show = nsFreshcare.auditor.home.options.show;
				ns1blankspace.board.financialreports = nsFreshcare.board.financialreports;
				
				oParam.controlInitStep = 8;
				nsFreshcare.control.init(oParam);
			}

			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer)
			{
				ns1blankspace.home.show = nsFreshcare.reviewer.home.init;
				ns1blankspace.home.options.show = nsFreshcare.auditor.home.options.show;

				oParam.controlInitStep = 8;
				nsFreshcare.control.init(oParam);
			}

			// The role is other than this above - call the next round
			else 
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.control.init);
				oParam.controlInitStep = 8;
				nsFreshcare.control.init(oParam);
			}
		}

		// Get Result Status Transitions
		else if (oParam.controlInitStep === 8)
		{	// Added v3.1.2 SUP022543 Add reviewer functionality to Freshcare base. This is NOT a recursive call
			nsFreshcare.control.getResultStatusOptions();
			
			oParam.controlInitStep = 9;
			nsFreshcare.control.init(oParam);
		}

		// If rootnamespace isn't Freshcare we may have some other initialisation steps to do
		else if (oParam.controlInitStep === 9)
		{
			oParam.controlInitStep = 10;
			if (ns1blankspace.rootnamespacetext != 'nsFreshcare' && oRoot.control && oRoot.control.init)
			{
				oParam.onComplete = nsFreshcare.control.init;
				oRoot.control.init(oParam);
			}
			else 
			{
				nsFreshcare.control.init(oParam);
			}

		}

		else if (oParam.controlInitStep === 10) 
		{		// Added 1.0.23 to handle hash parameters
			delete(oParam.controlInitStep);
			ns1blankspace.status.clear();
			// v4.0.001 Don't returnToLast if lab and switched-in
			if (ns1blankspace.isLab)
			{
				if (nsFreshcare.data.switched.id)
				{
					ns1blankspace.option.returnToLast = false;	
				}
				else 
				{
					ns1blankspace.option.returnToLast = true;
				}
			}


			ns1blankspace.app.postInit();

			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
			{
				$('#ns1blankspaceViewControlHelp')
					.unbind('click');
				$('#ns1blankspaceViewControlHelp')
					.on('click', function(event)
					{
						nsFreshcare.control.help.show(this);
					});
			}

			if (nsFreshcare.data.switched != undefined && nsFreshcare.data.switched.id != undefined)
			{
				$('#ns1blankspaceSpaceText').unbind('click');
				$('#ns1blankspaceLogonName').unbind('click');
				$('#ns1blankspaceLogonName').click(nsFreshcare.admin.user.switchBackClick);
			}
			
			// v2.0.4o SUP022084 support issue button should not be visible to external users

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) 
			{		
				// External logons can't switch-in to other spaces or use setup area so disable these features
				$('#ns1blankspaceSpaceText').unbind('click');
				$('#ns1blankspaceViewControlSetupContainer').hide();
				$('#ns1blankspaceViewControlHelp').hide();		
			}
			else
			{
				$('#ns1blankspaceViewControlSetupContainer').show();
				$('#ns1blankspaceViewControlHelp').show();		
			}

		}
	},

	home: 		
	{

		init: 	function() 
		{
			// Dummy function to prevent ns1blankspace.home from appearing
		},
		show: 	function() 
		{
			// Dummy function to prevent ns1blankspace.home from appearing
			var aHTML = [];

			aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
			aHTML.push('<td id="ns1blankspaceHomeClumn1" class="ns1blankspaceColumn1Flexible">' + ns1blankspace.xhtml.loading + '</td>');
			aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible">Default Home</td>');
			aHTML.push('</tr></table>');	

			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
	},

	help:
	{
		show: function (oElement)
		{
			if ($(ns1blankspace.xhtml.container).attr('data-initiator') == oElement.id)
			{
				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				$(ns1blankspace.xhtml.container).attr('data-initiator', '');
			}
			else
			{
				$(ns1blankspace.xhtml.container).attr('data-initiator', oElement.id);
				$(ns1blankspace.xhtml.container).html("&nbsp;");
				$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
				$(ns1blankspace.xhtml.container).offset({ top: $(oElement).offset().top + $(oElement).height() - 3, left: $(oElement).offset().left});
				$(ns1blankspace.xhtml.container).html(this.layout());
					
				nsFreshcare.control.help.bind();
			}	
		},

		layout:function ()
		{
			var aHTML = [];

			aHTML.push('<table style="width: 232px; font-size: 0.875em;" id="ns1blankspaceControlUser" class="ns1blankspaceViewControlContainer">');
				
			aHTML.push('<tr>' +
							'<td id="nsFreshcareControlHelpShow" class="ns1blankspaceViewControl">' +
							'Help Menu</td></tr>');

			aHTML.push('<tr>' +
							'<td id="nsFreshcareControlSupportIssueShow" class="ns1blankspaceViewControl">' +
							'Support Issues</td></tr>');
						
			aHTML.push('<tr>' +
							'<td id="nsFreshcareControlSupportIssueNew" class="ns1blankspaceViewControl">' +
							'Log Support Issue</td></tr>');		
						
			aHTML.push('</table>');
			
			return aHTML.join('');
		},

		bind:function ()
		{
			$('#nsFreshcareControlHelpShow').click(function(event)
			{
				nsFreshcare.help.show();
			})
			
			$('#nsFreshcareControlSupportIssueShow').click(function(event)
			{
				$(this).html(ns1blankspace.xhtml.loadingSmall);
				ns1blankspace.supportIssue.init();
			});

			$('#nsFreshcareControlSupportIssueNew').click(function(event)
			{
				$(this).html(ns1blankspace.xhtml.loadingSmall);
				ns1blankspace.supportIssue.init({"new": true});
			});
		}

	},

	relationshipTypes: 	function(oParam, oResponse) 
	{
		// Get Freshcare Relationshiptypes

		if (oResponse) 
		{
			if (oResponse.status == 'OK') 
			{	
				$.each(oResponse.data.rows, function() {
					switch (this.title.toUpperCase())
					{
						case 'AUDITOR':
							nsFreshcare.data.relationshipAuditor = this.id;
							break;
						case 'CUSTOMER':
							nsFreshcare.data.relationshipCustomer = this.id;
							break;
						case 'DO NOT LINK':
							nsFreshcare.data.relationshipDoNotLink = this.id;
							break;
						case 'SUPPLIER':
							nsFreshcare.data.relationshipSupplier = this.id;
							break;
						case 'TRAINER':
							nsFreshcare.data.relationshipTrainer = this.id;
							break;
					}
				});
			}

			if (oParam && oParam.onComplete) {
				ns1blankspace.util.onComplete(oParam);
			}

		}
		else 
		{
			// v3.0.1 changed to AdvancedSearch
			var oSearch = new AdvancedSearch();
			oSearch.method = 'SETUP_CONTACT_RELATIONSHIP_TYPE_SEARCH';
			oSearch.addField('title');
			oSearch.rows = 50;
			oSearch.getResults(function(oResponse)
			{
				nsFreshcare.control.relationshipTypes(oParam, oResponse);
			});
		}
	},
	
	groups: 	function(oParam, oResponse) 
	{
		// Get the person Group ids that relate to each entity type
		
			var bSearchBusiness = false;

			if (oParam) {
				if (oParam.businessGroups != undefined) {bSearchBusiness = oParam.businessGroups}
				if (oParam.groupsStep === undefined) {oParam.groupsStep = 1;}
			}

			if (oParam.groupsStep === 1) {

				if (oResponse === undefined) {
					
					// v3.1.0 Changed to AdvancedSearch
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_CONTACT_PERSON_GROUP_SEARCH';
					oSearch.addField('title');
					oSearch.rows = 500;
					oSearch.getResults(function(oResponse) 
					{
						nsFreshcare.control.groups(oParam, oResponse);
					});
				}	
				else {

					if (oResponse.status == 'OK') {	
						nsFreshcare.data.groupGrowerText = [];
						nsFreshcare.data.groupGrower = [];
						nsFreshcare.data.groupAuditor = [];
						nsFreshcare.data.groupCustomer = [];
						nsFreshcare.data.groupTrainer = [];
						nsFreshcare.data.groupBoard = [];
						nsFreshcare.data.groupTrainee = '';
						nsFreshcare.data.groupReviewer = [];
						nsFreshcare.data.groupInternalAuditor = [];

						nsFreshcare.data.allGroups = [];
						


						// v3.1.1e SUP022638 Added Internal Auditor to allGroups
						$.each(oResponse.data.rows, function() {	

							switch (this.title.toUpperCase())
							{
								case 'ACCOUNTS CONTACT':
									nsFreshcare.data.groupAccountsContact = this.id.toString();		// Don't need this in allGroups
									break;
								case 'ADDITIONAL CONTACT':
									nsFreshcare.data.groupOtherContact = this.id.toString();		// Don't need this in allGroups
									break;
								case 'AUDITOR':
									nsFreshcare.data.groupAuditor.push(this.id);
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'BOARD MEMBER':
									nsFreshcare.data.groupBoard.push(this.id);
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'CUSTOMER':
									nsFreshcare.data.groupCustomer.push(this.id);
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'ELEARNING TRAINEE': 
									nsFreshcare.data.groupELearningTrainee = this.id.toString();		// Don't need this in allGroups
									break;
								case 'MEMBER':
									nsFreshcare.data.groupGrower.push(this.id);
									nsFreshcare.data.groupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.grower.categoryGrower = this.id;
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'MARKETING GROUP':
									nsFreshcare.data.groupGrower.push(this.id);
									nsFreshcare.data.groupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'PACKER':
									nsFreshcare.data.groupGrower.push(this.id);
									nsFreshcare.data.groupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'REVIEWER':
									nsFreshcare.data.groupReviewer.push(this.id);
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'INTERNAL AUDITOR':
									nsFreshcare.data.groupInternalAuditor.push(this.id);
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'TRAINEE': 
									nsFreshcare.data.groupTrainee = this.id.toString();		// Don't need this in allGroups
									break;
								case 'TRAINER':
									nsFreshcare.data.groupTrainer.push(this.id);
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'TRANSPORTER':
									nsFreshcare.data.groupGrower.push(this.id);
									nsFreshcare.data.groupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.allGroups.push(this.id);
									break;
								case 'WINERY':
									nsFreshcare.data.groupGrower.push(this.id);
									nsFreshcare.data.groupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.allGroups.push(this.id);
									break;
								otherwise:
									break;
							}
						});
					}

					oResponse = undefined;
					oParam.groupsStep = 2;
					nsFreshcare.control.groups(oParam);
				}
			}

			else if (oParam.groupsStep === 2) 
			{			// v1.0.24 changed to else

				if (oResponse === undefined && bSearchBusiness) 
				{
					// v3.1.0 changed to AS
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_CONTACT_BUSINESS_GROUP_SEARCH';
					oSearch.addField('title');
					oSearch.rows = 50;
					oSearch.getResults(function(oResponse)
					{
						nsFreshcare.control.groups(oParam, oResponse);
					});
				}
				else if (oResponse) 
				{

					if (oResponse.status === 'OK') 
					{

						nsFreshcare.data.businessGroupGrowerText = [];
						nsFreshcare.data.businessGroupGrower = [];
						nsFreshcare.data.businessGroupGrowerID = '';		// v3.1.2 SUP022744 Added to reference busines Group of 'Grower' only
						nsFreshcare.data.portalGroups = []					// v3.2.010 Added - used for global contact search
						
						$.each(oResponse.data.rows, function() 
						{
							// v3.1.204 SUP023020 Removed all other groups as only Grower now required not that Scope is on Membership
							switch (this.title.toUpperCase())
							{
								case 'MEMBER':
									nsFreshcare.data.businessGroupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.businessGroupGrower.push(this.id);
									nsFreshcare.data.businessGroupGrowerID = this.id;
									nsFreshcare.data.portalGroups.push({id: this.id, portal: this.title});
									break;
								/*case 'MARKETING GROUP':
									nsFreshcare.data.businessGroupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.businessGroupGrower.push(this.id);
									break;
								case 'PACKER':
									nsFreshcare.data.businessGroupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.businessGroupGrower.push(this.id);
									break;
								case 'TRANSPORTER':
									nsFreshcare.data.businessGroupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.businessGroupGrower.push(this.id);
									break;
								case 'WINERY':
									nsFreshcare.data.businessGroupGrowerText.push({id: this.id, title: this.title});
									nsFreshcare.data.businessGroupGrower.push(this.id);
									break; */
								case 'TRAINER':
									nsFreshcare.data.businessGroupTrainer = this.id;
									nsFreshcare.data.portalGroups.push({id: this.id, portal: this.title});
									break;
								case 'AUDITOR':
									nsFreshcare.data.businessGroupAuditor = this.id;
									nsFreshcare.data.portalGroups.push({id: this.id, portal: this.title});
									break;
								case 'BOARD MEMBER':
									nsFreshcare.data.businessGroupBoard = this.id;
									nsFreshcare.data.portalGroups.push({id: this.id, portal: this.title});
									break;
								case 'CUSTOMER':
									nsFreshcare.data.businessGroupCustomer = this.id;
									nsFreshcare.data.portalGroups.push({id: this.id, portal: this.title});
									break;
								otherwise:
									break;
							}
						});
					}

					oParam.groupsStep = 3;
				}
				else if (!bSearchBusiness) {
					oParam.groupsStep = 3;
				}
			}

			if (oParam.groupsStep === 3) {

				delete(oParam.groupsStep);
				if (oParam && oParam.onComplete) {
					ns1blankspace.util.onComplete(oParam);
				}
			}

	},

	subscriptionStatus: 	function(oParam, oResponse) 
	{
		// v3.1.206 SUP023057 Added statusDR
		if (oResponse) 
		{
			if (oResponse.status === 'OK') 
			{
				nsFreshcare.data.grower.subscriptionStatus = [];
				$.each(oResponse.data.rows, function() 
				{
					var sReference = '';
					if (this.title == 'Audit Deferred') 
					{
						nsFreshcare.data.grower.subscriptionStatusAD = this.id;
						sReference = 'AD';
					}
					if (this.title == 'Audit Pending') 
					{
						nsFreshcare.data.grower.subscriptionStatusAP = this.id;
						sReference = 'AP';
					}
					if (this.title == 'Certification Audit') 
					{
						nsFreshcare.data.grower.subscriptionStatusCE = this.id;
						sReference = 'CE'
					}
					if (this.title == 'Certification Pending') 
					{
						nsFreshcare.data.grower.subscriptionStatusCP = this.id;
						sReference = 'CP';
					}
					if (this.title == 'Foundation Member') 
					{
						nsFreshcare.data.grower.subscriptionStatusFM = this.id;
						sReference = 'FM';
					}
					if (this.title == 'Initial Assessment') 
					{
						nsFreshcare.data.grower.subscriptionStatusIN = this.id;
						sReference = 'IN';
					}
					if (this.title == 'Initial Pending') 
					{
						nsFreshcare.data.grower.subscriptionStatusIP = this.id;
						sReference = 'IP';
					}
					if (this.title == 'Reinstated Member') 
					{
						nsFreshcare.data.grower.subscriptionStatusRM = this.id;
						sReference = 'RM';
					}
					if (this.title == 'Suspended') 
					{
						nsFreshcare.data.grower.subscriptionStatusSP = this.id;
						sReference = 'SP';
					}
					if (this.title == 'Debtor') 
					{
						nsFreshcare.data.grower.subscriptionStatusDR = this.id;
						sReference = 'DR';
					}
					if (this.title == 'Training Existing Members') 
					{
						nsFreshcare.data.grower.subscriptionStatusTE = this.id;
						sReference = 'TE';
					}
					if (this.title == 'Training Initial') 
					{
						nsFreshcare.data.grower.subscriptionStatusTI = this.id;
						sReference = 'TI';
					}
					if (this.title == 'Withdraw from program') 
					{
						nsFreshcare.data.grower.subscriptionStatusWD = this.id;
						sReference = 'WD';
					}
					nsFreshcare.data.grower.subscriptionStatus.push({id: this.id, reference: sReference, title: this.title});	
				});

				if (oParam && oParam.onComplete) 
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
			else
			{
				ns1blankspace.status.error('Unable to find Subscription Status values: ' + oResponse.status.error);
			}

		}
		else 
		{
			$.ajax(
			{
				type: 'GET',
				url: ns1blankspace.util.endpointURI('SETUP_AGRI_SUBSCRIPTION_STATUS_SEARCH'),
				success: function(oResponse) {nsFreshcare.control.subscriptionStatus(oParam, oResponse) }
			});

		}
	},

	freshcareMemberships: 	function(oParam, oResponse) 
	{
		// Get a list of available Memberships 
		oParam = oParam || {};
		oParam.freshcareMembershipsStep = oParam.freshcareMembershipsStep || 1;

		// v4.0.019 SUP024339 Added IOAS flag to search
		if (oParam.freshcareMembershipsStep === 1) 
		{
			if (oResponse === undefined) 
			{
				nsFreshcare.data.memberships = [];
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_MEMBERSHIP_SEARCH';
				oSearch.addField('code,description,priorityorder,reference,status,statustext,title,jasanzaccredited,seioasaccredited');
				oSearch.addField(ns1blankspace.option.auditFields);
				oSearch.addField(ns1blankspace.extend.elements({object: nsFreshcare.objectMembership}));
				oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);
				oSearch.getResults(function(oResponse) {nsFreshcare.control.freshcareMemberships(oParam, oResponse)});
			}
			else 
			{
				if (oResponse.status === 'OK') 
				{
					nsFreshcare.data.memberships = oResponse.data.rows;
				}

				oParam.freshcareMembershipsStep = 2;
				nsFreshcare.control.freshcareMemberships(oParam);
			}
		}

		// v3.2.020 SUP023484 Added codesOfPractice to memberships data
		else if (oParam.freshcareMembershipsStep == 2)
		{
			if (oResponse === undefined) 
			{	// v3.4.015 SUP023981 Added seAllCARsStopCerts
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
				oSearch.addField('code,description,auditdueafter,certificateexpiresafter,certificatetext' +
								',isdefault,copbasedtraining,membership,seallcarsstopcerts');
				oSearch.addField(ns1blankspace.extend.elements({object: nsFreshcare.objectCodeOfPractice}));
				oSearch.rows = 200;
				oSearch.getResults(function(oResponse) {nsFreshcare.control.freshcareMemberships(oParam, oResponse)});
			}
			else 
			{
				if (oResponse.status === 'OK') 
				{
					$.each(nsFreshcare.data.memberships, function(i, oMembership)
					{
						oMembership.codesOfPractice = $.grep(oResponse.data.rows, function(x) {return x.membership == oMembership.id});
					});
				}
				// v3.2.020 SUP023484 Now sets specific Membership Id's in additional method that can be overwritten in forked version
				nsFreshcare.control.freshcareMembershipsStore(oParam);
				oParam.freshcareMembershipsStep = 3;
				nsFreshcare.control.freshcareMemberships(oParam);
			}
		}

		// v3.2.020 SUP023484 Added valid scopes to memberships / cop data
		else if (oParam.freshcareMembershipsStep == 3)
		{
			if (oResponse === undefined) 
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('scope,scopetext,object,objectcontext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.option.validScopesStoredOn);
				oSearch.getResults(function(oResponse) {nsFreshcare.control.freshcareMemberships(oParam, oResponse)});
			}
			else 
			{
				if (oResponse.status === 'OK') 
				{
					if (nsFreshcare.option.validScopesStoredOn == nsFreshcare.objectMembership)
					{
						$.each(nsFreshcare.data.memberships, function(i, oMembership)
						{
							oMembership.validScopes = $.grep(oResponse.data.rows, function(x) {return x.objectcontext == oMembership.id});
						});
					}
					else if (nsFreshcare.option.validScopesStoredOn == nsFreshcare.objectCodeOfPractice)
					{
						$.each(nsFreshcare.data.memberships, function(i, oMembership)
						{
							$.each(oMembership.codesOfPractice, function(j, oCodeOfPractice)
							{
								oCodeOfPractice.validScopes = $.grep(oResponse.data.rows, function(x) {return x.objectcontext == oCodeOfPractice.id});
							});
						});
					}
				}
				// v3.2.020 SUP023484 Now sets specific Membership Id's in additional method that can be overwritten in forked version
				nsFreshcare.control.freshcareMembershipsStore(oParam);
				delete(oParam.freshcareMembershipsStep);
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	freshcareMembershipsStore: function(oParam)
	{
		// v3.3.001 SUP023456 Added SCS
		nsFreshcare.data.membershipFSQ = $.map(
										   $.grep(nsFreshcare.data.memberships, function(x) {
										   									return x.title.indexOf('Food Safety') > -1
										   							    }),
										  function(y) {return y.id})[0];
	
		nsFreshcare.data.membershipVIT = $.map(
										   $.grep(nsFreshcare.data.memberships, function(x) {
										   									return x.code === 'VIT'
										   							    }),
										  function(y) {return y.id})[0];
	
		nsFreshcare.data.membershipWIN = $.map(
										   $.grep(nsFreshcare.data.memberships, function(x) {
										   									return x.code === 'WIN'
										   							    }),
										  function(y) {return y.id})[0];

		nsFreshcare.data.membershipSCS = $.map(
										   $.grep(nsFreshcare.data.memberships, function(x) {
										   									return x.code === 'SCS'
										   							    }),
										  function(y) {return y.id})[0];
	},

	freshcareProductGroups: function(oParam)
	{
		// Get a list of product groups (Category)

		nsFreshcare.data.productGroups = [];

		var oSearch = new AdvancedSearch();
		oSearch.endPoint = 'agri';
		oSearch.method = 'AGRI_PRODUCT_GROUP_CATEGORY_SEARCH';
		oSearch.addField('title');
		oSearch.getResults(function(oResponse) 
		{
			if (oResponse.status === 'OK') 
			{
				nsFreshcare.data.productGroups = $.map(oResponse.data.rows, function(x) {return [[x.id, x.title]]});
				delete(oParam.freshcareProductGroupStep);
				ns1blankspace.util.onComplete(oParam);
			}
			else
			{
				ns1blankspace.status.error('Error finding product groups: ' + oResponse.error.errornotes);
			}

		});
	},

	getScopeOptions: function(oParam)
	{
		var oSearch = new AdvancedSearch();
		oSearch.method = 'SETUP_AGRI_SCOPE_SEARCH';
		oSearch.addField('title')
		oSearch.sort('title', 'asc');
		oSearch.getResults(function(oResponse)
		{
			if (oResponse.status == 'OK')
			{
				nsFreshcare.data.scopeOptions = oResponse.data.rows;
				
				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
			else
			{
				ns1blankspace.status.error('Error finding grower scope values: ' + oResponse.error.errornotes);
			}
		}); 
	},

	getResultStatusOptions: function()
	{	// Added v3.1.2 SUP022543
		// Since Result Status table doesn't have displayorder, we need this to make sure audit transitions are valid
		// each row contains the id of the from value and then the validOptions object contains the valid to values
		// v3.1.2 SUP022888 Adjust Result Status Options if auditor can manually approve audits
		// v3.3.001 SUP023474 Removed No Result from valid transitions 
		var bManualApproval = (nsFreshcare.data.auditor && nsFreshcare.data.auditor.manualAuditApproval == 'Y');

		nsFreshcare.data.resultStatusOptions = [];
		nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusNoResult, title: 'No Result',
												validOptions: 
												[
													nsFreshcare.data.audit.resultStatusConducted,
													nsFreshcare.data.audit.resultStatusPending, 
													nsFreshcare.data.audit.resultStatusCompleted
												]
											});

		nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusConducted, title: 'Conducted',
												validOptions: 
												[
													(bManualApproval ? nsFreshcare.data.audit.resultStatusApproved : nsFreshcare.data.audit.resultStatusAwaitingReview)
												]
											});

		// v3.3.001 SUP023456 If set to Suspended, can only update to Conducted. System will check to see if open Critical CARs
		nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusSuspended, title: 'Suspended',
												validOptions: 
												[
													nsFreshcare.data.audit.resultStatusConducted
												]
											});

		nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusAwaitingReview, title: 'Awaiting Review',
												validOptions: 
												[
													nsFreshcare.data.audit.resultStatusApproved, 
													nsFreshcare.data.audit.resultStatusRejected
												]
											});

		if (bManualApproval)
		{
			nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusApproved, title: 'Approved',
													validOptions: 
													[
														nsFreshcare.data.audit.resultStatusPending, 
														nsFreshcare.data.audit.resultStatusCompleted
													]
												});
		}
		else
		{
			nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusApproved, title: 'Approved',
													validOptions: 
													[
														nsFreshcare.data.audit.resultStatusRejected,
														nsFreshcare.data.audit.resultStatusPending, 
														nsFreshcare.data.audit.resultStatusCompleted
													]
												});
		}

		// 3.2.025 SUP023656 Reviewer can now change from Rejected to Approved
		nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusRejected, title: 'Rejected',
												validOptions: 
													[
														nsFreshcare.data.audit.resultStatusApproved,
														nsFreshcare.data.audit.resultStatusAwaitingReview
													]
												});
		nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusPending, title: 'Certification Pending',
												validOptions: 
												[
													nsFreshcare.data.audit.resultStatusCompleted
												]
											});

		/*nsFreshcare.data.resultStatusOptions.push({index: nsFreshcare.data.resultStatusOptions.length, id: nsFreshcare.data.audit.resultStatusCompleted, title: 'Certification Recommended',
												validOptions: 
												[
													nsFreshcare.data.audit.resultStatusPending
												]
											}); */
	},

	sendPrintedCertificatesOptions: function(oParam, oResponse)
	{

		// Get the options from Structure element 8659 (Send Printed Certificate)
		// v3.1.0 changed to AS and now points to structureelemtn.alias
		nsFreshcare.data.sendPrintedCertificatesOptions = {};
		if (oResponse === undefined)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH';
			oSearch.addField('title,displayorder,points,defaultvalue,element');
			oSearch.addFilter('element', 'EQUAL_TO', nsFreshcare.data.sendPrintedCertificatesId);
			oSearch.getResults(function(oResponse)
			{
				nsFreshcare.control.sendPrintedCertificatesOptions(oParam, oResponse);
			});
		}
		else
		{

			if (oResponse.status === 'OK')
			{
				nsFreshcare.data.sendPrintedCertificatesOptions = oResponse.data.rows;

				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}

	},

	getCertificationBodyOptions: function(oParam)
	{
		// Get the values for Structure element 2093 (self Certification Date) and 2094 (JASANZ Date)
		// v3.3.001 SUP023474 Now 
		oParam = oParam || {};
		var iContactBusiness = ns1blankspace.user.contactBusiness;
		var bFromAdminAudit = (oParam.contactBusiness == undefined && oParam.certificationBody == undefined 
				&& nsFreshcare.user.roleID == nsFreshcare.data.roles.admin);

		// v2.0.3f Was replacing iContactperson with certificationBody instead of iContactBusiness (SUP021385)
		if (oParam.contactBusiness) {iContactBusiness = oParam.contactBusiness}
		if (oParam.certificationBody) {iContactBusiness = oParam.certificationBody}
		if (oParam.cbOptionsStep === undefined) 
		{
			oParam.cbOptionsStep = (nsFreshcare.data.selfCertificationDateId) ? 1 : 3;
		}

		if (bFromAdminAudit)
		{
			iContactBusiness = $('#' + ns1blankspace.xhtml.divID.replace('#', '')).attr('data-id');
		}

		if (nsFreshcare.data.auditor === undefined) {nsFreshcare.data.auditor = {}};

		if (oParam.cbOptionsStep === 1)
		{
			// v3.1.0a Changed se2093 / se2094 to structure references
			// v3.1.2 SUP022888 Added Manual Audit Approval
			if (bFromAdminAudit) {delete(oParam.onComplete);}

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';
			oSearch.addField('se' + nsFreshcare.data.selfCertificationDateId + ',semanualauditapproval');	// ',se' + nsFreshcare.data.jasanzDateId + 
			oSearch.addFilter('id', 'EQUAL_TO', iContactBusiness);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
				{
					nsFreshcare.data.auditor.contactBusiness = iContactBusiness;			// v3.1.2 added
					nsFreshcare.data.auditor.selfCertificationDate = oResponse.data.rows[0]['se' + nsFreshcare.data.selfCertificationDateId];
					nsFreshcare.data.auditor.manualAuditApproval = oResponse.data.rows[0].semanualauditapproval;
					oParam.cbOptionsStep = 2;
					nsFreshcare.control.getCertificationBodyOptions(oParam);
				}
				else if (oResponse.status == 'ER')
				{
					ns1blankspace.status.error(oResponse.error.errornotes);
				}
				else if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.status.error('Unable to find Certification Body');
				}
			});
		}
		// v3.3.005 SUP023801 Now get JASANZ date from AGRI_MEMBERSHIP_TRAINER
		// v4.0.019 SUP024339 Also get IOAS dates at the same time
		else if (oParam.cbOptionsStep === 2)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_MEMBERSHIP_TRAINER_SEARCH';
			oSearch.addField('membership,membershiptext,trainercontactbusiness,trainercontactbusinesstext,notes,seaccreditation');
			oSearch.addFilter('trainercontactbusiness', 'EQUAL_TO', iContactBusiness);
			oSearch.addFilter('trainercontactperson', 'EQUAL_TO', nsFreshcare.data.dummyCertBodyPerson);	// Use this Until person not mandatory
			oSearch.addFilter('seaccreditation', 'IS_NOT_NULL');
			oSearch.addBracket('(');
			oSearch.addFilter('agrimembershiptrainer.membership.jasanzaccredited', 'EQUAL_TO', 'Y');
			oSearch.addOperator('or');
			oSearch.addFilter('agrimembershiptrainer.membership.seioasaccredited', 'EQUAL_TO', 'Y');
			oSearch.addBracket(')');
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					nsFreshcare.data.auditor.jasanzDates = $.grep(oResponse.data.rows, function(x) {return x.seaccreditation == 'jasanz'});
					nsFreshcare.data.auditor.ioasDates = $.grep(oResponse.data.rows, function(x) {return x.seaccreditation == 'ioas'});
					oParam.cbOptionsStep = 4;
					nsFreshcare.control.getCertificationBodyOptions(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding JASANZ/IOAS dates: ' + oResponse.error.errornotes);
				}
			});
		}

		// We only do this if we're not using Self Cert and JASANZ dates
		else if (oParam.cbOptionsStep === 3)
		{
			nsFreshcare.data.auditor.selfCertificationDate = '';
			nsFreshcare.data.auditor.jasanzDate = '';
			oParam.cbOptionsStep = 4;
			nsFreshcare.control.getCertificationBodyOptions(oParam);
		}

		else if (oParam.cbOptionsStep === 4)
		{
			delete(oParam.cbOptionsStep);
			if (oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
			else if (oParam.contactBusiness == undefined && oParam.certificationBody == undefined)
			{
				nsFreshcare.admin.audit.setJASANZAuditFlag();
			}
		}
	},

	getActionTypes: function(oParam)
	{
		// Get list of Action Types
		if (oParam)
		{
			if (oParam.actionTypeStep === undefined) {oParam.actionTypeStep = 1}
		}

		if (nsFreshcare.data.actionTypes === undefined) {nsFreshcare.data.actionTypes = []}

		if (oParam.actionTypeStep === 1)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'SETUP_ACTION_TYPE_SEARCH';
			oSearch.addField('title,displayorder,fixed');
			oSearch.sort('displayorder', 'asc');
			oSearch.sort('title', 'asc');
			oSearch.rows = 100;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					nsFreshcare.data.actionTypes = oResponse.data.rows;
					oParam.actionTypeStep = 2;
					nsFreshcare.control.getActionTypes(oParam);
				}
				else 
				{
					ns1blankspace.status.error(oResponse.error.errornotes);
				}
			});
		}

		else if (oParam.actionTypeStep === 2)
		{
			delete(oParam.actionTypeStep);
			if (oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	setupTrainer: 	function(oParam) 
	{
		// Get a list of Memberships that the trainer is accredited to
		// v1.0.209b Updated so acts differently for admin and trainer users
		if (oParam == undefined) {oParam = {}}
		var iTrainerBusiness = ns1blankspace.util.getParam(oParam, 'trainerBusiness', {'default': ns1blankspace.user.contactBusiness}).value;
		var iDefaultTrainerPerson = ns1blankspace.util.getParam(oParam, 'defaultTrainerPerson', {'default': ns1blankspace.user.contactPerson}).value;
		var sTrainerPerson = ns1blankspace.util.getParam(oParam, 'trainerPerson').value;
		var bStateSearch = ns1blankspace.util.getParam(oParam, 'stateSearch', {'default': true}).value;
		var sStoreObject = ns1blankspace.util.getParam(oParam, 'storeObject', {'default': 'trainerMemberships'}).value;

		if (oParam.setupTrainerStep == undefined) {oParam.setupTrainerStep = 1}

		// Setup export formats for reports & Trainee Export
		if (nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer)
		{
			nsFreshcare.trainer.setup.exports();
		}

		if (oParam.setupTrainerStep === 1) 
		{
			nsFreshcare.data[sStoreObject] = [];
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_MEMBERSHIP_TRAINER_SEARCH';
			oSearch.addField('membership,membershiptext,trainercontactperson,trainercontactpersontext,agrimembershiptrainer.membership.code');
			oSearch.addFilter('trainercontactbusiness', 'EQUAL_TO', iTrainerBusiness);
			if (sTrainerPerson)		// only if explicitly passed
			{
				oSearch.addFilter('trainercontactperson', 'IN_LIST', sTrainerPerson);
			}
			oSearch.addFilter('agrimembershiptrainer.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	//v1.024
			oSearch.sort('trainercontactpersontext', 'asc');
			oSearch.sort('membershiptext', 'asc');
			oSearch.rows = 500;
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					nsFreshcare.data[sStoreObject] = oResponse.data.rows;
				}
				else
				{
					ns1blankspace.status.error('Unable to find Trainer Memberships: ' + oResponse.error.errornotes);
				}

				oParam.setupTrainerStep = bStateSearch ? 2 : 3;
				nsFreshcare.control.setupTrainer(oParam);
			});
		}
		
		else if (oParam.setupTrainerStep === 2) 
		{
			nsFreshcare.data.trainerStates = [];
			oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_TRAINER_STATE_SEARCH';
			oSearch.addField('state,statetext');
			oSearch.addFilter('contactperson', 'EQUAL_TO', iDefaultTrainerPerson);
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					nsFreshcare.data.trainerStates = oResponse.data.rows;
				}
				else
				{
					ns1blankspace.status.error('Unable to find Trainer States: ' + oResponse.error.errornotes);
				}
				oParam.setupTrainerStep = 3;
				nsFreshcare.control.setupTrainer(oParam);
			});
		}

		else if (oParam.setupTrainerStep == 3)
		{
			delete(oParam.setupTrainerStep);
			delete(oParam.trainerBusiness);
			delete(oParam.trainerPerson);
			delete(oParam.stateSearch);
			ns1blankspace.util.onComplete(oParam);
		}
	},

	setupCustomer: 	function(oParam, oResponse) 
	{

		// we need to get a list of growers who have requested not to be linked to this Customer
		var dToday = new Date();
		if (oParam == undefined) {
			oParam = {setupCustomerStep: 1}
		}
		else if (oParam.setupCustomerStep === undefined) {
			oParam.setupCustomerStep = 1;
		}

		if (oParam.setupCustomerStep === 1) {

			if (oResponse === undefined) {

				nsFreshcare.data.customerExSuppliers = {};
				nsFreshcare.data.customerExSupplierList = [];
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
				oSearch.addField('contactperson,contactpersontext,contactbusiness,contactbusinesstext,type,typetext,startdate,enddate');
				oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.addFilter("relationship.type", "EQUAL_TO", nsFreshcare.data.relationshipDoNotLink);
				oSearch.addFilter("relationship.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addBracket("(");
				oSearch.addFilter("relationship.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addOperator("or");
				oSearch.addFilter("relationship.enddate", 'IS_NULL');
				oSearch.addBracket(")");
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse) {nsFreshcare.control.setupCustomer(oParam, oResponse)});
			}
			else {
				if (oResponse.status === 'OK') {
					nsFreshcare.data.customerExSuppliers = oResponse.data.rows;
					nsFreshcare.data.customerExSupplierList = 
						$.map(nsFreshcare.data.customerExSuppliers, function(a) {
							return a.contactbusiness;
						});

					delete(oParam.setupCustomerStep);
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	setupGrower: 	function(oParam, oResponse) 
	{

		// Get a list of Memberships that the grower has
		var dToday = new Date();

		if (oParam == undefined) {
			oParam = {setupGrowerStep: 1}
		}
		else if (oParam.setupGrowerStep === undefined) {
			oParam.setupGrowerStep = 1;
		}

		if (oParam.setupGrowerStep === 1) {

			if (oResponse === undefined) {

				nsFreshcare.data.growerMemberships = {};
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'agri';
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('membership,membershiptext,contactperson,contactpersontext,status');
				oSearch.addFilter('agrisubscription.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	// 1.0.24 Added
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse) {nsFreshcare.control.setupGrower(oParam, oResponse)});
			}
			else {

				if (oResponse.status === 'OK') {
					nsFreshcare.data.growerMemberships = oResponse.data.rows;
				}

				oResponse = undefined;
				oParam.setupGrowerStep = 2;
			}
		}

		// Get the list of customers who the grower has requested not to be linked 
		if (oParam.setupGrowerStep === 2) {

			if (oResponse === undefined) {

				nsFreshcare.data.growerExCustomers = {};
				nsFreshcare.data.growerExCustomerList = [];

				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
				oSearch.addField('othercontactperson,othercontactpersontext,othercontactbusiness,othercontactbusinesstext,type,typetext,startdate,enddate');
				oSearch.addFilter('contactperson', 'EQUAL_TO', ns1blankspace.user.contactPerson);
				oSearch.addFilter("relationship.type", "EQUAL_TO", nsFreshcare.data.relationshipDoNotLink);
				oSearch.addFilter("relationship.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addBracket("(");
				oSearch.addFilter("relationship.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addOperator("or");
				oSearch.addFilter("relationship.enddate", 'IS_NULL');
				oSearch.addBracket(")");
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse) {nsFreshcare.control.setupGrower(oParam, oResponse)});
			}
			else {
				if (oResponse.status === 'OK') {
					nsFreshcare.data.growerExCustomers = oResponse.data.rows;
					nsFreshcare.data.growerExCustomerList = 
						$.map(nsFreshcare.data.growerExCustomers, function(a) {
							return a.othercontactperson;
						});

					oParam.setupGrowerStep = 3;
				}
			}
		}
		
		if (oParam.setupGrowerStep === 3) {

			delete(oParam.setupGrowerStep);
			nsFreshcare.admin.auditcar.initGlobals(oParam);
		}
	},

	// v3.2.005 SUP022047 Now allows users to enter their certificate number / Company ID and get their logon
	getLogon:
	{
		show: function()
		{
			var aHTML = [];

			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceLogon">' +
							'<td class="ns1blankspaceLogonCaption" style="font-size: 0.75em; padding-bottom: 10px; padding-top: 10px;">' +
							'Enter either your Certification Number or <br />your Company ID to retrieve your logon name:' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceLogon">' +
							'<td class="ns1blankspaceLogonCaption">' +
							'Certification Number' +
							'</td></tr>' +
							'<tr><td class="ns1blankspaceLogon" style="padding-bottom:10px;">' +
							'<input id="ns1blankspaceGetLogonCertificateNumber" class="ns1blankspaceLogon">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceLogon">' +
							'<td class="ns1blankspaceLogonCaption" style="padding-bottom: 10px;">' +
							'or...' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceLogon">' +
							'<td class="ns1blankspaceLogonCaption">' +
							'Company ID' +
							'</td></tr>' +
							'<tr><td class="ns1blankspaceLogon" style="padding-bottom:10px;">' +
							'<input id="ns1blankspaceGetLogonCompanyID" class="ns1blankspaceLogon">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceLogon">' +
							'<td class="ns1blankspaceLogon">' +
							'<span id="ns1blankspaceGetLogon" class="ns1blankspaceLogon ns1blankspaceAction">Send Logon Name</span>' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceLogon">' +
							'<td id="ns1blankspaceGetLogonStatus" class="ns1blankspaceLogon" colspan=2>' +
							'&nbsp;' +
							'</td></tr>');
							
			aHTML.push('</table>');					
			
			ns1blankspace.container.show(
								{
									xhtmlElementID: 'ns1blankspaceViewControl',
									xhtml: aHTML.join(''),
									forceShow: true,
									offsetTop: -15
								});	
			
			$('#ns1blankspaceGetLogonCertificateNumber').focus();
			
			$('#ns1blankspaceGetLogon').button(
			{
				label: "Get Logon Name"
			})
			.click(function()
			{
				nsFreshcare.control.getLogon.send();
			});
		},

		send: function()
		{	
			var oParam = {};

			if ($('#ns1blankspaceGetLogonCertificateNumber').val() === '' && $('#ns1blankspaceGetLogonCompanyID').val() == '' )
			{
				$('#ns1blankspaceGetLogonStatus').html('You must enter either a Certification Number or a Company ID.');
			}
			else
			{
				$('#tns1blankspaceGetPasswordStatus').html('Sending Logon Name...');
								
				var sData = 'site=' + mydigitalstructureSiteId + '&freshcare=Y&document=' + nsFreshcare.data.documentForgotUsername +
							($('#ns1blankspaceGetLogonCertificateNumber').val() != '' ? '&certificationnumber=' + $('#ns1blankspaceGetLogonCertificateNumber').val() : '') +
							($('#ns1blankspaceGetLogonCompanyID').val() != '' ? '&idnumber=' + $('#ns1blankspaceGetLogonCompanyID').val() : '');

				if ($('#ns1blankspaceGetLogonCertificateNumber').val() != '') {oParam.type = 'Certification Number'}
				if ($('#ns1blankspaceGetLogonCompanyID').val() != '') {oParam.type = 'Company ID'}
				$('#ns1blankspaceGetLogonStatus').html(ns1blankspace.xhtml.loadingSmall);
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('SITE_SEND_PASSWORD'),
					data: sData,
					dataType: 'json',
					success: function(oResponse) {nsFreshcare.control.getLogon.process(oResponse, oParam)}
				})
			}
		},

		process: function(oResponse, oParam)
		{	
			if (oResponse.status === 'OK')
			{
				ns1blankspace.logon.show({message: 'Your Logon Name has been emailed to you at ' + oResponse.emailto.formatXHTML() + '.'})
				//$('#ns1blankspaceGetPasswordStatus').html('Your password has been emailed to you at ' + oResponse.emailto.formatXHTML() + '.');
			}
			else
			{
				if (oResponse.error.errornotes.toLowerCase().indexOf("no 'to' set for email subject") > -1)
				{
					$('#ns1blankspaceGetLogonStatus').html(nsFreshcare.data.businessName + ' does not have an email registered for your business so we cannot email your user name. ' +
															'<br />Please contact the ' + nsFreshcare.data.businessName + ' offices.')
				}
				else
				{
					$('#ns1blankspaceGetLogonStatus').html('Can not find this ' + oParam.type + '!' +
													'<br />Please contact the ' + nsFreshcare.data.businessName + ' offices.');
				}
			}
		}
	},

	views:
	{
		show: function()
		{
			if (ns1blankspace.xhtml.viewControl == undefined)
			{
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceViewControlContainer">');	 
				aHTML.push('<tr class="ns1blankspaceViewControl">');

				$.each(ns1blankspace.viewGroups, function(i, v)
				{
					var oViewGroup = $.grep(ns1blankspace.views, function (a) {return a.group == v.id && a.show == true && a.type == 1;});

					if (oViewGroup.length > 0)
					{
						//oViewGroup.sort(ns1blankspace.util.sortBy('order'))

						aHTML.push('<td class="ns1blankspaceViewControlColumn">');
						aHTML.push('<table class="ns1blankspaceViewControlColumn">');

						//bootstrap:
						aHTML.push('<tr><td><div id="ns1blankspaceView' + v.name + '" class="ns1blankspaceViewImage"></div>' +
										'</td></tr>');	

						$.each(oViewGroup, function(j, k)
						{
							aHTML.push('<tr class="ns1blankspaceViewControl">' +
										'<td class="ns1blankspaceViewControl">' +
										'<span id="ns1blankspaceViewControl_' + (k.parentNamespace!==undefined?k.parentNamespace + '_':'') + k.namespace +
										'" class="ns1blankspaceViewControl">' + k.title + '</span>');

							if (k.subNote !== undefined)
							{	
								aHTML.push('<br /><div class="ns1blankspaceSubNote" style="margin-top:2px;">' + 
										 k.subNote + '</div>');
							}	

							aHTML.push('</td></tr>');
						});

						aHTML.push('</table>');
						aHTML.push('</td>');
					}	
				});

				aHTML.push('</tr>');

				aHTML.push('<tr class="ns1blankspaceViewControl">');

				// Only show reporting for roles who have access to it
				if ($.grep(nsFreshcare.data.reportingRoles, function(x) {return x === nsFreshcare.user.roleID}).length > 0)
				{
					aHTML.push('<td class="ns1blankspaceViewControl" colspan=' + ns1blankspace.viewGroups.length + 
									' style="text-align: right; color: #999999; font-size:0.825em; padding-top:6px;">' +
									'<span id="ns1blankspaceViewControl_report" class="ns1blankspaceViewControl">' +
									((nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) ? 'Search... report, export, update, email and SMS' : 'Search & Reporting...') +
									'</span></td>');
								aHTML.push('</tr></table>');
				}

				ns1blankspace.xhtml.viewControl = aHTML.join('');
			}

			//bootstrap
			var iTopOffset = (ns1blankspace.option.bootstrap?7:5);

			ns1blankspace.container.show(
			{
				xhtmlElementID: 'ns1blankspaceViewControlViewContainer',
				xhtml: ns1blankspace.xhtml.viewControl,
				topOffset: iTopOffset
			});	

			ns1blankspace.control.views.bind();						
		}
	},

	setup: 
	{
		/*views: 
		{
			show: function() 
			{
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceViewControlContainer">');
				aHTML.push('<tr class="ns1blankspaceViewControl">');
				
				var aHTMLViewport = [];

				aHTML.push('<td class="ns1blankspaceViewControlColumn">');
				aHTML.push('<table class="ns1blankspaceViewControlColumn">');

				$.each(ns1blankspace.viewGroupsSetup, function(i, v)
				{
					var oViewGroup = $.grep(ns1blankspace.views, function (a) {return a.group == v.id && a.show == true && a.type == 2;});

					if (oViewGroup.length > 0)
					{
						oViewGroup.sort(ns1blankspace.util.sortBy('order'))

						aHTML.push('<td class="ns1blankspaceViewControlColumn">');
						aHTML.push('<table class="ns1blankspaceViewControlColumn">');

						aHTML.push('<tr><td><div id="ns1blankspaceViewSetup' + v.name + '" class="ns1blankspaceViewImage"></div>' +
										'</td></tr>');	

						$.each(oViewGroup, function(j, k)
						{
							aHTML.push('<tr class="ns1blankspaceViewControl">' +
										'<td class="ns1blankspaceViewControl">' +
										'<span id="ns1blankspaceViewControl_' + 
											((k.parentNamespace !== undefined) ? k.parentNamespace + '_' : '') + 
											k.namespace +
											((k.namesuffix != undefined) ? '_' + k.namesuffix : '') + '"' +
										((k.namesuffix != undefined) ? ' data-namesuffix="' + k.namesuffix + '"' : '') + 
										' class="ns1blankspaceViewControl">' + k.title + '</span>');

							if (k.subNote !== undefined)
							{	
								aHTML.push('<br /><div class="ns1blankspaceSubNote" style="margin-top:2px;">' + 
										 k.subNote + '</div>');
							}	

							aHTML.push('</td></tr>');
						});

						aHTML.push('</table>');
						aHTML.push('</td>');
					}	
				});

				aHTML.push('</tr></table>');
				
				ns1blankspace.container.show(
				{
					xhtmlElementID: 'ns1blankspaceViewControlViewContainer',
					xhtml: aHTML.join('')
				});	

				ns1blankspace.control.setup.views.bind();	
			},

			bind: function()
			{
				ns1blankspace.control.setup.views.bind();
			}
		},*/

		automation:
		{
			summary: function()
			{
				var aHTML = [];
				
				if (ns1blankspace.objectContextData == undefined)
				{
					aHTML.push('<table><tr><td valign="top">Sorry can\'t find automation.</td></tr>');
					aHTML.push('<tr>&nbsp;</tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					aHTML.push('<table class="ns1blankspace">' +
								'<tr>' +
								'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td>' +
								'</tr>' +
								'</table>');			
					
					$('#ns1blankspaceMainSummary').html(aHTML.join(''));

					var aHTML = [];

					aHTML.push('<table>');
					
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Automation ID</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.id +
									'</td></tr>');
									
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Endpoint</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.endpoint +
									'</td></tr>');
									
					aHTML.push('</table>');					
					
					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

					var aHTML = [];
						
					
					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td>' +
									'<a href="/ondemand/setup/?method=SETUP_AUTOMATION_RUN&ct=text/html&id=' + ns1blankspace.objectContext + '&fulldebug=1"' +
									' target="_blank" id="ns1blankspaceMainSummaryAutomationTestRun">Test Run</a>' +
									'</td></tr>');
													
					aHTML.push('<tr><td>' +
									'<a href="/ondemand/setup/?method=SETUP_AUTOMATION_RUN&ct=text/html&id=' + ns1blankspace.objectContext + '&aslive=1"' +
									' target="_blank" id="ns1blankspaceMainSummaryAutomationTestRun">Force Run</a>' +
									'</td></tr>');
													
					aHTML.push('</table>');					
					
					$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));		
				}	
			}
		}
	},

	setView: 
	{
		"default": 	function ()
		{
			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin) {
				nsFreshcare.admin.home.show();
			}
			else if (nsFreshcare.user.roleID == nsFreshcare.data.roles.grower) {
				nsFreshcare.grower.certificate.init({showHome: true});
			}
			else if (nsFreshcare.user.roleID == nsFreshcare.data.roles.customer) {
				nsFreshcare.customer.grower.init({showHome: true});
			}
			else if (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) {
				nsFreshcare.auditor.grower.init({showHome: true});
			}
			else if (nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer) {
				nsFreshcare.trainer.grower.init({showHome: true});
			}
			else if (nsFreshcare.user.roleID == nsFreshcare.data.roles.board) {
				nsFreshcare.board.home.init({showHome: true});
			}
			$('#ns1blankspaceViewControlViewContainer').button({label: ns1blankspace.option.defaultView})
		},

		setup:	function ()
		{
			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && ns1blankspace.util.toFunction('nsFreshcare.setup.freshcareprofile.init') !== undefined)
			{	
				nsFreshcare.setup.freshcareprofile.init();
			}
			else if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin && ns1blankspace.util.toFunction('nsFreshcare.admin.user.init') !== undefined)
			{
				nsFreshcare.admin.user.init();
			}
			else
			{
				ns1blankspace.setupView = false;
				ns1blankspace.control.setView["default"]();
			}	
		}
	},

	attachments:
	{
		show: function (oParam)
		{	
			// v3.1.1i SUP022715 Responds to ns1blankspace.param
			var sXHTMLElementID = 'ns1blankspaceMainAttachments';
			var iObject = ns1blankspace.object;
			var iObjectContext = ns1blankspace.objectContext;
			var bShowAdd = true;
			var iAttachmentType;
			var oActions = {add: true};
			var sHelpNotes;
			var oContext = {inContext: false};

			var sSortBy = ns1blankspace.util.getParam(oParam, 'sortBy', {"default": 'filename'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {"default": 'asc'}).value;
			
			ns1blankspace.param = oParam;		

			if (oParam != undefined)
			{
				if (oParam.object != undefined) {iObject = oParam.object}
				if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
				if (oParam.objectName != undefined) {sObjectName = oParam.objectName}
				if (oParam.showAdd != undefined) {bShowAdd = oParam.showAdd}
				if (oParam.attachmentType != undefined ) {iAttachmentType = oParam.attachmentType}
				if (oParam.xhtmlElementID != undefined ) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.actions != undefined) {oActions = oParam.actions}
				if (oParam.helpNotes != undefined) {sHelpNotes = oParam.helpNotes}
				if (oParam.context != undefined) {oContext = oParam.context}
			}
			
			if (oActions.add)
			{
				if (ns1blankspace.app.context) {ns1blankspace.app.context(oContext)};

				var aHTML = [];
							
				aHTML.push('<table>' +
							'<tr>' +
							'<td id="ns1blankspaceAttachmentsColumn1" class="ns1blankspaceColumn1Flexible">' +
							ns1blankspace.xhtml.loading + '</td>' +
							'<td id="ns1blankspaceAttachmentsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td></tr>' +
							'</table>');					
					
				$('#' + sXHTMLElementID).html(aHTML.join(''));

				oParam = ns1blankspace.util.setParam(oParam, 'xhtmlElementID', 'ns1blankspaceAttachmentsColumn1');
				
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceColumn2">');
				
				aHTML.push('<tr><td class="ns1blankspaceAction">' +
								'<span id="ns1blankspaceAttachmentsAdd">Add</span>' +
								'</td></tr>');

				if (sHelpNotes != undefined)
				{
					aHTML.push('<tr><td class="ns1blankspaceAction">' +
								'<hr />' +
								'</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceAttachmentsAddHelpNotes" class="ns1blankspaceAction" style="font-size:0.75em;color:#404040;">' +
								sHelpNotes +
								'</td></tr>');
				}
				
				aHTML.push('</table>');					
				
				$('#ns1blankspaceAttachmentsColumn2').html(aHTML.join(''));
			
				$('#ns1blankspaceAttachmentsAdd').button(
				{
					label: "Add"
				})
				.click(function()
				{
					 ns1blankspace.attachments.add(oParam);
				});

				sXHTMLElementID = 'ns1blankspaceAttachmentsColumn1';
			}
			
			if (iObjectContext != -1)
			{	
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_ATTACHMENT_SEARCH';
				oSearch.addField('type,filename,title,description,download,modifieddate,attachment,bucket,createddate,createdusertext');
				oSearch.addFilter('object', 'EQUAL_TO', iObject);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
				oSearch.rows = ns1blankspace.option.defaultRows;
				
				if (iAttachmentType != undefined)
				{
					oSearch.addFilter('type', 'EQUAL_TO', iAttachmentType);
				}
				
				oSearch.sort(sSortBy, sSortDirection);
				oSearch.getResults(function(data) {ns1blankspace.attachments.process(data, oParam)});
			}
		},

		add: function(oParam)
		{
			var fFunctionValidate = ns1blankspace.util.getParam(oParam, 'functionValidate').value;

			$('#ns1blankspaceAttachmentsColumn1').html(ns1blankspace.attachments.upload.show(oParam));
			
			$('#ns1blankspaceUpload').button(
				{
					label: "Upload"
				})
				.click(function() 
				{
					if (fFunctionValidate == undefined || fFunctionValidate(oParam))
					{
						ns1blankspace.attachments.upload.process(oParam);
					}
				});
			
			$("select").change(function() 
				{
					aValue = ($(this).val()).split('-')	
					$('#filetype' + aValue[0]).val(aValue[1])
				});
		},

		bind:	function (oParam)
		{	
			// v3.1.1i SUP022715 Responds to ns1blankspace.param
			var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID', {"default": 'ns1blankspaceRenderPage_Action-0'}).value;
			var oActions = ns1blankspace.util.getParam(oParam, 'actions').value;
			if (oActions == undefined)
			{
				oActions = ns1blankspace.util.getParam(ns1blankspace.param, 'actions', {'default': {remove: true, add: true}}).value;
			}

			if (oActions.add == undefined) {oActions.add = true}
			if (oActions.remove == undefined) {oActions.remove = true}

			if (oActions.remove == true)
			{
				$('span.ns1blankspaceAttachmentsRemove:not(".ui-button")').button(
				{
					text: false,
					icons: {primary: "ui-icon-close"}
				})
				.click(function()
				{
					ns1blankspace.remove(
					{
						xhtmlElementID: this.id,
						method: 'CORE_ATTACHMENT_MANAGE',
						parentLevel: 2,
						ifNoneMessage: 'No attachments.'
					});
				})
				.css('width', '15px')
				.css('height', '20px')	
			}
		},

		upload: 
		{
			show: function(oParam)
			{
				oParam = (oParam === undefined) ? ns1blankspace.param : oParam;
				var aHTML = [];

				var iMaxFiles = 1
				var iObject = ns1blankspace.object
				var lObjectContext = ns1blankspace.objectContext
				var sLabel = '';
				var sObjectName = '';
				var iAttachmentType = '';
				var bShowUpload = true;
				var sXHTML = '';
				var sHelpNotes;
				var aInputs = [];
				var sURL = '/ondemand/attach/';
				var aInputParams = [];
				var iPublicType;
				var aAttachmentTypes = ns1blankspace.util.getParam(oParam, 'attachmentTypes', {'default': []}).value;
				
				if (oParam != undefined)
				{
					if (oParam.maxFiles != undefined) {iMaxFiles = oParam.maxFiles}
					if (oParam.object != undefined || iObject === '') {iObject = oParam.object}
					if (oParam.objectName != undefined) {sObjectName = oParam.objectName}
					if (oParam.objectContext != undefined ) {lObjectContext = oParam.objectContext}
					if (oParam.label != undefined) {sLabel = oParam.label}
					if (oParam.attachmentType != undefined) {iAttachmentType = oParam.attachmentType}
					if (oParam.showUpload != undefined) {bShowUpload = oParam.showUpload}
					if (oParam.xhtml != undefined) {sXHTML = oParam.xhtml}
					if (oParam.helpNotes != undefined) {sHelpNotes = oParam.helpNotes}
					if (oParam.inputs != undefined) {aInputs = oParam.inputs}
					if (oParam.url != undefined) {sURL = oParam.url}
					if (oParam.inputParams != undefined) {aInputParams = oParam.inputParams}
					if (oParam.publicType != undefined) {iPublicType = oParam.publicType}
				}	

				$('[name="ns1blankspaceFileUpload"]').remove();

				aHTML.push('<form name="ns1blankspaceFileUpload" action="' + sURL + '" ' +
								'enctype="multipart/form-data" method="POST" target="ns1blankspaceUploadProxy" accept-charset="utf-8">' +
								'<input type="hidden" name="maxfiles" id="maxfiles" value="' + iMaxFiles + '">' +
								'<input type="hidden" name="object" id="object" value="' + iObject + '">' +
								'<input type="hidden" name="objectcontext" id="objectcontext" value="' + lObjectContext + '">');
						
				for (var i = 0; i < iMaxFiles; i++) 	
				{
					aHTML.push('<input type="hidden" name="filetype' + i + '" id="filetype' + i + '" value="' + iAttachmentType + '">');
				}

				$.each(aInputs, function ()
				{	
					aHTML.push('<input type="hidden" name="' + this + '" id="' + this + '" value="">');
				});

				for (var i = 0; i < iMaxFiles; i++) 	
				{
					$.each(aInputParams, function ()
					{	
						aHTML.push('<input type="hidden" name="' + this.id + i + '" id="' + this.id + i + '" value="' + (this.value || '') + '">');
					});
				}

				if (iPublicType)
				{
					for (var i = 0; i < iMaxFiles; i++) 	
					{
						aHTML.push('<input type="hidden" name="publictype' + i + '" id="publictype' + i + '" value="' + iPublicType + '">');
					}
				}	

				aHTML.push(sXHTML);
				
				if (sLabel != '') 
				{
					aHTML.push('<div id="ns1blankspaceUploadLabel" class="ns1blankspaceUpload">' + sLabel + '</div>');
				}	
					
				for (var i = 0; i < iMaxFiles; i++) 	
				{
					aHTML.push('<div id="ns1blankspaceUploadFile' + i + '" class="ns1blankspaceUpload" style="padding:3px;">' +
									'<input class="ns1blankspaceUpload" type="file" name="oFile' + i + '" id="oFile' + i + '">');
					
					if (aAttachmentTypes.length > 0)
					{
						aHTML.push('<select class="ns1blankspaceAttachmentType">');
						
						aHTML.push('<option class="optionType" id="optionType-' + i + '--' +
											'" value="' + i + '-">' +
											'[Not Set]' +
											'</option>');
											
						$.each(aAttachmentTypes, function(index, t) 
						{
							aHTML.push('<option class="optionType" id="optionType-' + i + '-' + index + '-' + t.type +
											'" value="' + i + '-' + t.type + '">' +
											t.typetext +
											'</option>');
						});
					
						aHTML.push('</select>');
						
					}
					aHTML.push('</div>');
				}

				if (bShowUpload)
				{
					aHTML.push('<span id="ns1blankspaceUpload" class="ns1blankspaceAction" style="margin-top:10px;"></span>');
					aHTML.push('<br /><br /><span id="ns1blankspaceUploadStatus" class="ns1blankspaceUpload"></span>');
				}	
					
				aHTML.push('<iframe style="display:none;" name="ns1blankspaceUploadProxy" id="ns1blankspaceUploadProxy" class="ns1blankspaceUpload" frameborder="0"></iframe>' +
								'</form>');
				
				return aHTML.join('');
			},

			status: function()
			{
				var oDivStatus = document.getElementById('ns1blankspaceFileUploadStatus');
				var oFrame = document.getElementById('ns1blankspaceUploadProxy');
				var sStatus;
				var sCurrentState;

				var fFunctionPostUpdate = ns1blankspace.attachments.show;
				
				if (ns1blankspace.param != undefined)
				{
					if (ns1blankspace.param.functionPostUpdate != undefined) {fFunctionPostUpdate = ns1blankspace.param.functionPostUpdate}
				}
				
				if (oFrame !== null)
				{	
					if (oFrame.readyState) 
					{
						//IE
						sCurrentState = oFrame.readyState;
					}
					else 
					{
						//FF
						if (oFrame.contentDocument.body.innerHTML === 'OK') 
						{
							sCurrentState = 'complete';
						}
						else 
						{
							sCurrentState = oFrame.contentDocument.body.innerHTML;
						}
					}
				}	
			 
				if (sCurrentState === 'complete') 
				{
					clearInterval(ns1blankspace.timer.delay);

					if (oDivStatus != null)
					{
						oDivStatus.setAttribute("class", "");
						oDivStatus.style.display = 'none';
					}
					
					$('#ns1blankspaceUploadStatus').html('File Upload Complete...');
					fFunctionPostUpdate(ns1blankspace.param);
					
				}
			}
		}
	}
}

nsFreshcare.person = 
{
	groups: 
	{
		search: function(oParam, oResponse) 
		{

			var iContactPerson = ns1blankspace.data.contactPerson;

			if (oParam) {iContactPerson = (oParam.contactPerson) ? oParam.contactPerson : iContactPerson; }

			if (oResponse === undefined && iContactPerson && ns1blankspace.objectContextData) {

				ns1blankspace.objectContextData.personGroups = {};
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "contact";
				oSearch.method = 'CONTACT_PERSON_GROUP_SEARCH';
				oSearch.addField('group,grouptext,contactperson');
				oSearch.addFilter("contactperson", "EQUAL_TO", iContactPerson);
				oSearch.addFilter("group", "IN_LIST", nsFreshcare.data.groupGrower.join(',') + ',' + nsFreshcare.data.groupTrainer.join(',') + ',' +
													  nsFreshcare.data.groupCustomer.join(',') + ',' + nsFreshcare.data.groupAuditor.join(','));
				oSearch.rf = 'json';
				oSearch.async = false;
				oSearch.getResults(function(oResponse) {
					nsFreshcare.person.groups.search(oParam, oResponse);
				});
			}
			else if (oResponse && iContactPerson && ns1blankspace.objectContextData) 
			{
				if (oResponse.status === "OK") {
					ns1blankspace.objectContextData.personGroups = oResponse.data.rows;
				}

				if (oParam && oParam.onComplete) {
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	}		
}

ns1blankspace.logon.show = function(oParam)
{		// Added v1.022 - change 'get it' to 'forgotten'
	var aHTML = [];
	var h = -1;
	var sXHTMLElementID = '#ns1blankspaceViewControl';
	var sMessage = '';
	
	ns1blankspace.logonInitialised = false;

	if (oParam != undefined)
	{
		if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
		if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
		if (oParam.message != undefined) {sMessage = oParam.message}
	}	
		
	$('#ns1blankspaceViewControl').html('');
	$('#ns1blankspaceSpaceText').html('<div style="font-size:0.875em; margin-top:12px;">' + nsFreshcare.version + '</div>');
	$('#ns1blankspaceLogonName').html('');

	aHTML.push('<table id="ns1blankspaceLogonContainer">');
	
	aHTML.push('<tr><td style="width:235px; padding-right:25px;">');

	//bootstrap:
	aHTML.push('<form><table id="ns1blankspaceLogon" class="ns1blankspaceLogonContainer" style="width:235px;">');

	aHTML.push('<tr>' +
					'<td class="ns1blankspaceLogonCaption">' +
					'Logon Name' +
					'</td>')

	aHTML.push('<td class="ns1blankspaceLogonSub" style="padding-right:2px;">' +
					'<span id="ns1blankspaceLogonForgot" style="cursor: pointer;font-size: 0.825em;">forgotten logon</span></td></tr>');

	aHTML.push('<tr><td colspan=2 style="padding-bottom: 10px;">' +
					'<input id="ns1blankspaceLogonLogonName" class="ns1blankspaceLogon">' +
					'</td></tr>');
					
	aHTML.push('<tr>' +
					'<td class="ns1blankspaceLogonCaption">' +
					'Password' +
					'</td>')

	aHTML.push('<td class="ns1blankspaceLogonSub" style="padding-right:2px;">' +
					'<span id="ns1blankspacePasswordSend" style="cursor: pointer;font-size: 0.825em;">forgotten password</span>' +
					'</td></tr>');

	aHTML.push('<tr><td class="ns1blankspaceLogonText" colspan=2 style="padding-bottom: 15px;">' +
					'<input id="ns1blankspaceLogonPassword" class="ns1blankspaceLogon" type="password">' +
					'</td></tr>');

	aHTML.push('<tr class="ns1blankspacePasswordCodeContainer" style="display:none;">' +
					'<td class="ns1blankspaceLogonCaption">' +
					'Code</td>');

	aHTML.push('<td class="ns1blankspaceLogonSub" style="padding-right:2px;">' +
					'<span id="ns1blankspacePasswordCodeSend" style="cursor: pointer;">resend</span>' +
					'</td></tr>');

	aHTML.push('<tr class="ns1blankspacePasswordCodeContainer" style="display:none;"><td class="ns1blankspaceLogonText" colspan=2 style="padding-bottom: 15px;">' +
					'<input id="ns1blankspaceLogonPasswordCode" class="ns1blankspaceLogon" type="password">' +
					'</td></tr>');

	aHTML.push('<tr>' +
				'<td class="ns1blankspaceLogon" style="width:110px">' +
				'<span id="ns1blankspaceLogonSend">Logon</span>' +
				'</td>');

	aHTML.push('<td id="ns1blankspaceLogonStatus" style="vertical-align:middle;">' +
				'&nbsp;' +
				'</td></tr>');

	aHTML.push('<tr><td id="ns1blankspaceLogonMessage" class="ns1blankspaceSub" colspan=2 style="padding-top: 15px;">' +
				sMessage + '</td></tr>');

	// v4.0.016 Added Privacy policy
	aHTML.push('<tr><td class="1blankspaceSub" colspan="2" style="padding-top: 15px;">' +
				'<a style="font-weight:500; color:#80A82B;" target="_blank"' +
					' href="https://www.freshcare.com.au/wp-content/uploads/Freshcare-Privacy-Policy-Ref1907.pdf">' +
					'Freshcare privacy policy</a></td></tr>' );

	aHTML.push('</table>');					
	
	if (ns1blankspace.xhtml.logonNotes)
	{	
		aHTML.push('</td><td class="ns1blankspaceLogonNotes">');
	
		aHTML.push('<table class="ns1blankspace"><tr><td>' +
						ns1blankspace.xhtml.logonNotes +
						'</td></tr></table>');
	}

	if (ns1blankspace.xhtml.logonNotesFooter)
	{	
		aHTML.push('</td></tr><tr><td style="padding:8px; padding-top:15px;" class="ns1blankspaceLogonNotesFooter">' +
					ns1blankspace.xhtml.logonNotesFooter);
	}				

	aHTML.push('</td></tr></table></form>');
	
	$('#ns1blankspaceMain').html('');
	$('#ns1blankspaceControl').html('');

	ns1blankspace.container.show(
	{
		xhtmlElementID: 'ns1blankspaceViewControl',
		xhtml: aHTML.join(''),
		forceShow: true,
		offsetTop: 8
	});	

	var sLogonName = $.cookie('mydigitalstucturelogonname')
	
	if (sLogonName != '' && sLogonName != null)
	{
		$('#ns1blankspaceLogonLogonName').val(sLogonName);
		$('#ns1blankspaceLogonRemember').attr('checked', true);
		if (!$('#ns1blankspaceLogonPassword').is(':focus')) {$('#ns1blankspaceLogonPassword').focus()}
	}
	else
	{
		if (!$('#ns1blankspaceLogonLogonName').is(':focus')) {$('#ns1blankspaceLogonLogonName').focus()}
	}
	
	$('#ns1blankspaceLogonSend').button(
	{
		label: "Logon"
	})
	.click(function() 
	{
		ns1blankspace.logon.init();
	});	

	$('#ns1blankspaceLogonLogonName').keypress(function(e)
	{
	    if (e.which === 13)
	    {
	        ns1blankspace.logon.init();
	    }
	});

	$('#ns1blankspaceLogonPassword').keypress(function(e)
	{
	    if (e.which === 13)
	    {
	        ns1blankspace.logon.init();
	    }
	});

	$('#ns1blankspaceLogonForgot').click(function()
	{
		nsFreshcare.control.getLogon.show();
	});

	$('#ns1blankspacePasswordSend').click(function()
	{
		ns1blankspace.logon.getPassword.show();
	});

	$('#ns1blankspacePasswordCodeSend').click(function()
	{
		ns1blankspace.logonInitialised = false;
		ns1blankspace.logon.init();
	});
}


ns1blankspace.logon.getPassword.process = function (oResponse)
{	// added v1.022 Adds email address to status message and returns to logon page
	if (oResponse.status === 'OK')
	{
		ns1blankspace.logon.show({message: 'Your password has been emailed to you at ' + oResponse.emailto.formatXHTML() + '.'})
	}
	else
	{
		$('#ns1blankspaceGetPasswordStatus').html('Can not find this logon name!');
	}
};

ns1blankspace.logon.changePassword.show = function(oParam)
{	// Added v3.1.0 SUP022122
	var aHTML = [];
	var h = -1;
	var sXHTMLElementID = 'ns1blankspaceViewControl';
	
	if (oParam != undefined)
	{
		if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
	}	
	
	aHTML.push('<table id="ns1blankspaceLogonChangePasswordContainer" class="ns1blankspaceViewControlContainer">');
	
	aHTML.push('<tr>' +
					'<td class="ns1blankspaceLogonCaption">' +
					'Current Password' +
					'</td></tr>' +
					'<tr><td class="ns1blankspaceLogonInput">' +
					'<input id="ns1blankspaceLogonCurrentPassword" class="ns1blankspaceLogon" type="password">' +
					'</td></tr>');
					
	aHTML.push('<tr>' +
					'<td class="ns1blankspaceLogonCaption">' +
					'New Password' +
					'</td></tr>' +
					'<tr><td class="ns1blankspaceLogonInput">' +
					'<input id="ns1blankspaceLogonNewPassword" class="ns1blankspaceLogon" type="password">' +
					'</td></tr>');

	aHTML.push('<tr class="ns1blankspaceLogon">' +
					'<td class="ns1blankspaceLogonCaption">' +
					'Confirm Password' +
					'</td></tr>' +
					'<tr><td class="ns1blankspaceLogonInput">' +
					'<input id="ns1blankspaceLogonNewPasswordConfirm" class="ns1blankspaceLogon" type="password">' +
					'</td></tr>');
					
	aHTML.push('<tr class="ns1blankspaceLogon">' +
					'<td class="ns1blankspaceLogon">' +
					'<span id="ns1blankspaceLogonChangePassword" class="ns1blankspaceAction">Change Password</span>' +
					'</td></tr>');
					
	aHTML.push('<tr class="ns1blankspaceLogon">' +
					'<td id="ns1blankspaceLogonChangePasswordStatus" class="ns1blankspaceLogon" style="font-size:0.625em;" colspan=2>' +
					'&nbsp;' +
					'</td></tr>');
					
	aHTML.push('</table>');					
	
	ns1blankspace.container.show(
						{
							xhtmlElementID: sXHTMLElementID,
							xhtml: aHTML.join(''),
							forceShow: true,
							offsetTop: -3,
							offsetLeft: 24
						});	
	
	$('#ns1blankspaceLogonChangePasswordStatus').html(ns1blankspace.option.passwordErrorMessage);
	$('#ns1blankspaceLogonCurrentPassword').focus();
	
	$('#ns1blankspaceLogonChangePassword').button(
	{
		label: "Change Password"
	})
	.click(function()
	{
		ns1blankspace.logon.changePassword.send();
	});	
	
	$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeed);
}


var isValidDate = function(value, userFormat) 
{

	var
	userFormat = userFormat || 'mm/dd/yyyy', // default format

	delimiter = /[^mdy]/.exec(userFormat)[0],
	theFormat = userFormat.split(delimiter),
	theDate = value.split(delimiter),

	isDate = function (date, format) 
	{
		var m, d, y
		var sValidMonths = '';

	    for (var i = 0, len = format.length; i < len; i++) 
	    {
	      if (/m/.test(format[i])) m = date[i]
	      if (/d/.test(format[i])) d = date[i]
	      if (/y/.test(format[i])) y = date[i]
	    }

		if (m.length > 2) 
		{
			var aMonths = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',');
			aMonths = $.map(aMonths, function(a) {return (m.length == 3) ? a.substr(0,3) : a;});
			m = $.inArray(m, aMonths);
			m += 1;
		}
	    return (
	      m > 0 && m < 13 &&
	      y && y.length === 4 &&
	      d > 0 && d <= (new Date(y, m, 0)).getDate()
	    )
	}
	return isDate(theDate, theFormat)
}


