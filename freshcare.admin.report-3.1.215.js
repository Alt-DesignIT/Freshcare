/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

 // v3.1.1 SUP021618 Added selectAttributes for Business lookups
 // v3.1.206 SUP023035 Moved grower / cb/ trainer / customer mailing addresses to business
// v3.1.210 replaced all dialog('close') with dialog('destroy')
 
nsFreshcare.admin.report = 
{
	init: function (oParam) 
	{
		ns1blankspace.report.reports = [];
		ns1blankspace.report.dictionary = [];
		ns1blankspace.report.selectAttributes = [];
		ns1blankspace.report.reportGroups = [];

		nsFreshcare.admin.report.initData(oParam);

		var bAll = true;

		if (oParam != undefined)
		{
			if (oParam.all != undefined) {bAll = oParam.all}
		}

		ns1blankspace.app.reset();

		ns1blankspace.objectName = 'report';

		ns1blankspace.viewName = 'Freshcare Reports';

		ns1blankspace.app.set(oParam);

		ns1blankspace.app.context({all: true, inContext: false})
	},

	initData: function(oParam)
	{
		// v3.1.0i SUP022271 contactbusiness.agrisubscription.status.reference didn't have Dictionary entry
		
		var sBusinessStreetAddresses = "contactbusiness.addresslink.address.address1-" +
								"contactbusiness.addresslink.address.address2-" +
								"contactbusiness.addresslink.address.addresssuburb-" +
								"contactbusiness.addresslink.address.addressstate-" + 
								"contactbusiness.addresslink.address.addresspostcode-" +
								"contactbusiness.addresslink.address.addresscountry"; 
		var sSubscriptionStreetAddresses = "agrisubscription.contactbusiness.addresslink.address.address1-" +
								"agrisubscription.contactbusiness.addresslink.address.address2-" +
								"agrisubscription.contactbusiness.addresslink.address.addresssuburb-" +
								"agrisubscription.contactbusiness.addresslink.address.addressstate-" + 
								"agrisubscription.contactbusiness.addresslink.address.addresspostcode-" +
								"agrisubscription.contactbusiness.addresslink.address.addresscountry"; 

		ns1blankspace.report.reportGroups = 
		[
			{id: 1, name: 'Growers'},
			{id: 2, name: 'Certification'},
			{id: 3, name: 'Training'},
			{id: 4, name: 'Customers'},
			{id: 5, name: 'Memberships'}
		];
 
		if (ns1blankspace.report.reports === undefined || ns1blankspace.report.reports.length === 0)
		{
			ns1blankspace.report.reports = 
			[
				{	/* Growers from Subscription 
					v3.1.2 Added Audit Paid field */
					name: 'Growers',
					group: 1,
					object: nsFreshcare.objectSubscription,
					objectText: 'Subscription',
					objectName: 'agrisubscription',
					method: 'AGRI_SUBSCRIPTION_SEARCH',
					returnParameters: 'agrisubscription' +
									 ',agrisubscription.contactbusiness' +
									 ',agrisubscription.contactbusiness.contactperson' +
									 ',agrisubscription.contactbusiness.contactperson.user'+
									 ',agrisubscription.contactbusiness.contactperson.persongroup'+
									 ',agrisubscription.agriproductgroup' +
									 ',agrisubscription.agriobjectscope' +
									 ',agrisubscription.agrilastcourse' +
									 ',agrisubscription.agrilastcourse.package' +
									 ',agrisubscription.agrilastcourse.attendee' +
									 ',agrisubscription.contactbusiness.addresslink' +
									 ',agrisubscription.contactbusiness.addresslink.address' +
									 ',agrisubscription.agricertificate' +
									 ',agrisubscription.status' +
									 ',agrisubscription.agricertificate.audit' +
									 ',agrisubscription.agricertificate.audit.action' + 
									 ',agrisubscription.agrilastaudit',
					functionSearch: nsFreshcare.admin.grower.search.send,
					idColumn: 'agrisubscription.contactbusiness',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					windowOpen: '/#/nsFreshcare-admin.grower/id:',
					showSort: true,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					fixedParameters:
					{
						filters:
						[	
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: 'agrisubscription.contactbusiness.contactperson.persongroup.grouptext'},
								name: 'agrisubscription.contactbusiness.contactperson.id',
								comparison: 'EQUAL_TO',
								value1: 'field:agrisubscription.contactbusiness.primarycontactperson',
								value2: '',
								value3: '',
								applyToSubSearch: 'Y'
							},
							{
								name: 'agrisubscription.membership.status',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.data.membershipStatusActive,
								value2: '',
								value3: ''
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sSubscriptionStreetAddresses},
								name: 'agrisubscription.contactbusiness.addresslink.object',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.objectBusiness,
								value2: ''
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sSubscriptionStreetAddresses},
								name: 'agrisubscription.contactbusiness.addresslink.objectcontext',
								comparison: 'EQUAL_TO',
								value1: 'field:agrisubscription.contactbusiness',
								value2: ''
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sSubscriptionStreetAddresses},
								name: 'agrisubscription.contactbusiness.addresslink.address.status',
								comparison: 'EQUAL_TO',
								value1: '1',
								value2: ''
							}
						]
					},
					customOptions:
					[
						{option: 'lastaudit', value: ',,N'}
					],
					selectableParameters: 
					{
						fields: 
						[
							{groupTitle: 'Grower Business Details'},
							{name: "agrisubscription.contactbusiness.tradename"},
							{name: "agrisubscription.contactbusiness.legalname"},
							{name: "agrisubscription.contactbusiness.reference"},
							{name: "agrisubscription.contactbusiness.abn"},
							{name: 'agrisubscription.contactbusiness.primarycontactpersontext'},
							{name: "agrisubscription.contactbusiness.mailingaddress1"},
							{name: "agrisubscription.contactbusiness.mailingaddress2"},
							{name: "agrisubscription.contactbusiness.mailingsuburb"},
							{name: "agrisubscription.contactbusiness.mailingstate"},
							{name: "agrisubscription.contactbusiness.mailingpostcode"},
							{name: "agrisubscription.contactbusiness.mailingcountry"},
							{name: "agrisubscription.contactbusiness.addresslink.address.address1"},
							{name: "agrisubscription.contactbusiness.addresslink.address.address2"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addresssuburb"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addressstate"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addresspostcode"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addresscountry"},
							{name: "agrisubscription.contactbusiness.notes"},
							{name: "agrisubscription.contactbusiness.createddate"},
							{name: "agrisubscription.contactbusiness.createdusertext"},
							{name: "agrisubscription.contactbusiness.modifieddate"},
							{name: "agrisubscription.contactbusiness.modifiedusertext"},
							{groupTitle: 'Grower Contact Details'},
							{name: "agrisubscription.contactbusiness.contactperson.firstname"},
							{name: "agrisubscription.contactbusiness.contactperson.surname"},
							{name: "agrisubscription.contactbusiness.contactperson.titletext"},
							{name: "agrisubscription.contactbusiness.contactperson.position"},
							{name: "agrisubscription.contactbusiness.contactperson.mobile"},
							{name: "agrisubscription.contactbusiness.contactperson.workphone"},
							{name: "agrisubscription.contactbusiness.contactperson.email"},
							{name: "agrisubscription.contactbusiness.contactperson.fax"},
							{name: "agrisubscription.contactbusiness.contactperson.user.username"},
							{name: "agrisubscription.contactbusiness.contactperson.user.se" + nsFreshcare.data.userPasswordId},
							{name: 'agrisubscription.contactbusiness.contactperson.persongroup.grouptext'},
							{groupTitle: 'Membership Details'},
							{name: "agrisubscription.membershiptext"},
							{name: "agrisubscription.codeofpracticetext"},
							{name: "agrisubscription.statustext"},
							{name: "agrisubscription.laststatuschangedate"},
							{name: "agrisubscription.startdate"},
							{name: "agrisubscription.enddate"},
							{name: "agrisubscription.crop"},
							{name: "agrisubscription.harvestmonth"},
							{name: "agrisubscription.agriproductgroup.productcategorytext"},
							{name: "agrisubscription.agriobjectscope.scopetext"},
							{groupTitle: 'Certificate Details'},
							{name: "agrisubscription.agricertificate.certificatenumber"},
							{name: "agrisubscription.agricertificate.sentdate"},
							{name: "agrisubscription.agricertificate.dateissued"},
							{name: "agrisubscription.agricertificate.enddate"},
							{name: 'agrisubscription.agricertificate.audit.action.subject', caption: 'Certificate Reference'},
							{
								name: "agrisubscription.auditDaysBeforeSent", 
								caption: 'Days to Send Certificate<br /><span class="ns1blankspaceSubNote">(Please include Issued & Sent Dates)</span>',
								exportHeader: "Days to Send Certificate", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.report.daysBetween,
								processParameter: {date1: 'agrisubscription.agricertificate.dateissued', date2: 'agrisubscription.agricertificate.sentdate'}
							},
							{name: 'agrisubscription.agricertificate.audit.actualdate'},
							{name: "agrisubscription.agricertificate.audit.auditbusinesstext"},
							{groupTitle: 'Most Recent Audit Details'},
							{name: "agrisubscription.agrilastaudit.actualdate", caption: 'Last Audit Date'},
							{name: 'agrisubscription.agrilastaudit.paid', caption: 'Last Audit Paid?'},
							{name: 'agrisubscription.agrilastaudit.auditbusinesstext', caption: 'Certification Body'},
							{name: 'agrisubscription.agrilastaudit.auditpersontext', caption: 'Auditor'},
							{groupTitle: 'Membership Training Course Details'},
							{name: 'agrisubscription.agrilastcourse.coursedate'},
							{name: 'agrisubscription.agrilastcourse.package.codeofpracticetext'},
							{name: 'agrisubscription.agrilastcourse.trainercontactbusinesstext'},
							{name: 'agrisubscription.agrilastcourse.trainercontactpersontext'},
							{name: 'agrisubscription.agrilastcourse.attendee.attendingtrainee'},
							{name: 'agrisubscription.agrilastcourse.statetext'}
						]
					}
				},
				{	/* Growers from Speed Check 
					v3.1.2 Added Audit Paid field */
					name: 'Growers Speed Check',
					group: 1,
					object: nsFreshcare.objectSubscription,
					objectText: 'Subscription',
					objectName: 'agrisubscription',
					method: 'AGRI_SUBSCRIPTION_SEARCH',
					returnParameters: 'agrisubscription' +
									 ',agrisubscription.contactbusiness' +
									 ',agrisubscription.contactbusiness.contactperson' +
									 ',agrisubscription.contactbusiness.contactperson.user'+
									 ',agrisubscription.contactbusiness.contactperson.persongroup'+
									 ',agrisubscription.agriproductgroup' +
									 ',agrisubscription.agriobjectscope' +
									 ',agrisubscription.agrilastcoursecached' +
									 ',agrisubscription.agrilastcoursecached.package' +
									 ',agrisubscription.agrilastcoursecached.attendee' +
									 ',agrisubscription.contactbusiness.addresslink' +
									 ',agrisubscription.contactbusiness.addresslink.address' +
									 ',agrisubscription.agricertificate' +
									 ',agrisubscription.status' +
									 ',agrisubscription.agricertificate.audit' +
									 ',agrisubscription.agricertificate.audit.action' + 
									 ',agrisubscription.agrilastauditcached',
					functionSearch: nsFreshcare.admin.grower.search.send,
					idColumn: 'agrisubscription.contactbusiness',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					windowOpen: '/#/nsFreshcare-admin.grower/id:',
					showSort: true,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					fixedParameters:
					{
						filters:
						[	
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: 'agrisubscription.contactbusiness.contactperson.persongroup.grouptext'},
								name: 'agrisubscription.contactbusiness.contactperson.id',
								comparison: 'EQUAL_TO',
								value1: 'field:agrisubscription.contactbusiness.primarycontactperson',
								value2: '',
								value3: '',
								applyToSubSearch: 'Y'
							},
							{
								name: 'agrisubscription.membership',
								comparison: 'IN_LIST',
								value1: $.map(nsFreshcare.data.memberships, function(x) {return x.id}).join(','),
								value2: '',
								value3: ''
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sSubscriptionStreetAddresses},
								name: 'agrisubscription.contactbusiness.addresslink.object',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.objectBusiness,
								value2: '',
								applyToSubSearch: 'Y'
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sSubscriptionStreetAddresses},
								name: 'agrisubscription.contactbusiness.addresslink.objectcontext',
								comparison: 'EQUAL_TO',
								value1: 'field:agrisubscription.contactbusiness',
								value2: '',
								applyToSubSearch: 'Y'
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sSubscriptionStreetAddresses},
								name: 'agrisubscription.contactbusiness.addresslink.address.status',
								comparison: 'EQUAL_TO',
								value1: '1',
								value2: '',
								applyToSubSearch: 'Y'
							}
						]
					},
					selectableParameters: 
					{
						fields: 
						[
							{groupTitle: 'Grower Business Details'},
							{name: "agrisubscription.contactbusiness.tradename"},
							{name: "agrisubscription.contactbusiness.legalname"},
							{name: "agrisubscription.contactbusiness.reference"},
							{name: "agrisubscription.contactbusiness.abn"},
							{name: 'agrisubscription.contactbusiness.primarycontactpersontext'},
							{name: "agrisubscription.contactbusiness.mailingaddress1"},
							{name: "agrisubscription.contactbusiness.mailingaddress2"},
							{name: "agrisubscription.contactbusiness.mailingsuburb"},
							{name: "agrisubscription.contactbusiness.mailingstate"},
							{name: "agrisubscription.contactbusiness.mailingpostcode"},
							{name: "agrisubscription.contactbusiness.mailingcountry"},
							{name: "agrisubscription.contactbusiness.addresslink.address.address1"},
							{name: "agrisubscription.contactbusiness.addresslink.address.address2"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addresssuburb"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addressstate"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addresspostcode"},
							{name: "agrisubscription.contactbusiness.addresslink.address.addresscountry"},
							{name: "agrisubscription.contactbusiness.notes"},
							{name: "agrisubscription.contactbusiness.createddate"},
							{name: "agrisubscription.contactbusiness.createdusertext"},
							{name: "agrisubscription.contactbusiness.modifieddate"},
							{name: "agrisubscription.contactbusiness.modifiedusertext"},
							{groupTitle: 'Grower Contact Details'},
							{name: "agrisubscription.contactbusiness.contactperson.firstname"},
							{name: "agrisubscription.contactbusiness.contactperson.surname"},
							{name: "agrisubscription.contactbusiness.contactperson.titletext"},
							{name: "agrisubscription.contactbusiness.contactperson.position"},
							{name: "agrisubscription.contactbusiness.contactperson.mobile"},
							{name: "agrisubscription.contactbusiness.contactperson.workphone"},
							{name: "agrisubscription.contactbusiness.contactperson.email"},
							{name: "agrisubscription.contactbusiness.contactperson.fax"},
							{name: "agrisubscription.contactbusiness.contactperson.user.username"},
							{name: "agrisubscription.contactbusiness.contactperson.user.se" + nsFreshcare.data.userPasswordId},
							{name: 'agrisubscription.contactbusiness.contactperson.persongroup.grouptext'},
							{groupTitle: 'Membership Details'},
							{name: "agrisubscription.membershiptext"},
							{name: "agrisubscription.codeofpracticetext"},
							{name: "agrisubscription.statustext"},
							{name: "agrisubscription.laststatuschangedate"},
							{name: "agrisubscription.firstcertified"},
							{name: "agrisubscription.startdate"},
							{name: "agrisubscription.enddate"},
							{name: "agrisubscription.crop"},
							{name: "agrisubscription.harvestmonth"},
							{name: "agrisubscription.agriproductgroup.productcategorytext"},
							{name: "agrisubscription.agriobjectscope.scopetext"},
							{groupTitle: 'Certificate Details'},
							{name: "agrisubscription.agricertificate.certificatenumber"},
							{name: "agrisubscription.agricertificate.sentdate"},
							{name: "agrisubscription.agricertificate.dateissued"},
							{name: "agrisubscription.agricertificate.enddate"},
							{name: 'agrisubscription.agricertificate.audit.action.subject', caption: 'Certificate Reference'},
							{
								name: "agrisubscription.auditDaysBeforeSent", 
								caption: 'Days to Send Certificate<br /><span class="ns1blankspaceSubNote">(Please include Issued & Sent Dates)</span>',
								exportHeader: "Days to Send Certificate", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.report.daysBetween,
								processParameter: {date1: 'agrisubscription.agricertificate.dateissued', date2: 'agrisubscription.agricertificate.sentdate'}
							},
							{groupTitle: 'Most Recent Audit Details'},
							{name: "agrisubscription.agrilastauditcached.actualdate", caption: 'Last Audit Date'},
							{name: 'agrisubscription.agrilastauditcached.paid', caption: 'Last Audit Paid?'},
							{name: 'agrisubscription.agrilastauditcached.auditbusinesstext', caption: 'Certification Body'},
							{name: 'agrisubscription.agrilastauditcached.auditpersontext', caption: 'Auditor'},
							{groupTitle: 'Membership Training Course Details'},
							{name: 'agrisubscription.agrilastcoursecached.coursedate'},
							{name: 'agrisubscription.agrilastcoursecached.package.codeofpracticetext'},
							{name: 'agrisubscription.agrilastcoursecached.trainercontactbusinesstext'},
							{name: 'agrisubscription.agrilastcoursecached.trainercontactpersontext'},
							{name: 'agrisubscription.agrilastcoursecached.attendee.attendingtrainee'},
							{name: 'agrisubscription.agrilastcoursecached.statetext'}
						]
					}
				},
				{
					name: 'CARs',
					group: 1,
					object: 197,
					objectText: 'Audit Issue',
					objectName: 'auditissue',
					method: 'AUDIT_ISSUE_SEARCH',
					returnParameters: 'auditissue' +
									 ',auditissue.sintype' +
									 ',auditissue.audit' +
									 ',auditissue.audit.contactbusiness' +
									 ',auditissue.audit.contactperson' +
									 ',auditissue.audit.agrisubscription' +
									 ',auditissue.audit.agrisubscription.membership',
					functionSearch: nsFreshcare.admin.audit.search.send,
					idColumn: 'auditissue.audit',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					windowOpen: '/#/nsFreshcare-admin.audit/id:',
					showSort: true,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					selectableParameters: 
					{
						fields: 
						[
							{groupTitle: 'Grower Details'},
							{name: "auditissue.audit.contactbusiness.tradename"},
							{name: "auditissue.audit.contactbusiness.legalname"},
							{name: "auditissue.audit.contactbusiness.reference"},
							{name: "auditissue.audit.contactbusiness.contactperson.firstname"},
							{name: "auditissue.audit.contactbusiness.contactperson.surname"},
							{name: "auditissue.audit.contactbusiness.contactperson.mobile"},
							{name: "auditissue.audit.contactbusiness.contactperson.workphone"},
							{name: "auditissue.audit.contactbusiness.contactperson.email"},
							{groupTitle: 'Audit Details'},
							{name: "auditissue.audit.reference"},
							{name: "auditissue.audit.actualdate"},
							{name: "auditissue.audit.typetext"},
							{name: "auditissue.audit.agrisubscription.membership.code"},
							{name: "auditissue.audit.codeofpracticetext"},
							{name: "auditissue.audit.resultstatustext"},
							{name: "auditissue.audit.auditbusinesstext"},
							{name: "auditissue.audit.auditpersontext"},
							{groupTitle: 'CAR Details'},
							{name: "auditissue.reference"},
							{name: "auditissue.typetext"},
							{name: "auditissue.sintype.code"},
							{name: "auditissue.sintypetext"},
							{name: "auditissue.statustext"},
							{name: "auditissue.details"},
							{name: "auditissue.datecompleted"},
							{name: "auditissue.resolution"},
							{name: "auditissue.createddate"},
							{name: "auditissue.createdusertext"},
							{name: "auditissue.modifieddate"},
							{name: "auditissue.modifiedusertext"}
						]
					}
				},
				{	/* Certification Bodies
					v3.1.2 SUP022744 Now filters on businessgroup */
					name: 'Certification Bodies',
					group: 2,
					object: nsFreshcare.objectBusiness,
					objectText: 'Business',
					objectName: 'contactbusiness',
					method: 'CONTACT_BUSINESS_SEARCH',
					returnParameters: 'contactbusiness' +
									 ',contactbusiness.contactperson',
					functionSearch: nsFreshcare.admin.grower.search.send,
					windowOpen: '/#/nsFreshcare-admin.auditor/id:',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					showSort: true,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					fixedParameters:
					{
						filters:
						[	
							{
								name: "contactbusiness.businessgroup",
								comparison: "EQUAL_TO",
								value1: nsFreshcare.data.businessGroupAuditor,
								value2: "",
								value3: "",
								applyToSubSearch: "Y"
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: "contactbusiness.primarycontactperson"},
								name: "contactbusiness.contactperson.id",
								comparison: "EQUAL_TO",
								value1: "field:contactbusiness.primarycontactperson",
								value2: "",
								value3: "",
								applyToSubSearch: "Y"
							}
						]
					},
					selectableParameters: 
					{
						fields: 
						[
							{name: "contactbusiness.tradename"},
							{name: "contactbusiness.legalname"},
							{name: "contactbusiness.reference"},
							{name: "contactbusiness.abn"},
							{name: "contactbusiness.contactperson.position"},
							{name: "contactbusiness.contactperson.titletext"},
							{name: "contactbusiness.contactperson.mobile"},
							{name: "contactbusiness.contactperson.workphone"},
							{name: "contactbusiness.contactperson.email"},
							{name: "contactbusiness.contactperson.fax"},
							{name: "contactbusiness.contactperson.firstname"},
							{name: "contactbusiness.contactperson.surname"},
							{name: "contactbusiness.mailingaddress1"},
							{name: "contactbusiness.mailingaddress2"},
							{name: "contactbusiness.mailingsuburb"},
							{name: "contactbusiness.mailingstate"},
							{name: "contactbusiness.mailingpostcode"},
							{name: "contactbusiness.mailingcountry"},
							{name: "contactbusiness.streetaddress1"},
							{name: "contactbusiness.streetaddress2"},
							{name: "contactbusiness.streetsuburb"},
							{name: "contactbusiness.streetstate"},
							{name: "contactbusiness.streetpostcode"},
							{name: "contactbusiness.streetcountry"},
							{name: "contactbusiness.se" + nsFreshcare.data.certificationBodyNumberId},
							{name: "contactbusiness.se" + nsFreshcare.data.selfCertificationDateId},
							{name: "contactbusiness.se" + nsFreshcare.data.jasanzDateId},
							{name: "contactbusiness.createddate"},
							{name: "contactbusiness.createdusertext"},
							{name: "contactbusiness.modifieddate"},
							{name: "contactbusiness.modifiedusertext"}
						]
					}
				},
				{	/* Audits */
					name: "Audits",
					object:  nsFreshcare.objectAudit,
					objectName: "audit",
					group: 2,
					method: "AUDIT_SEARCH",
					returnParameters: 'audit' +
									 ',audit.contactperson' +
									 ',audit.contactbusiness' +
									 ',audit.agrisubscription.agricertificate' +
									 ',audit.agrisubscription',
					showSort: true,
					functionSearch: nsFreshcare.admin.audit.search.send,
					windowOpen: '/#/nsFreshcare-admin.audit/id:',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					fixedParameters:
					{
						filters:
						[
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: "audit.agrisubscription.*"},
								name: 'audit.agrisubscription.membership.status',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.data.membershipStatusActive,
								value2: '',
								value3: ''
							}
						]
					},
					selectableParameters: 
					{	/* v3.1.1f SUP022657 Added Training Evaluation fields */
						fields: 
						[
							{groupTitle: 'Grower & Auditor Details'},
							{name: "audit.contactbusinesstext"},
							{name: "audit.contactperson.firstname"},
							{name: "audit.contactperson.surname"},
							{name: "audit.auditbusinesstext"},
							{name: "audit.auditpersontext"},
							{groupTitle: 'Membership Details'},
							{name: "audit.agrisubscription.membershiptext"},
							{name: "audit.codeofpracticetext"},
							{groupTitle: 'Audit Details'},
							{name: "audit.reference"},
							{name: "audit.typetext"},
							{name: "audit.statustext"},
							{name: "audit.resultstatustext"},
							{name: "audit.resultstatusdate"},
							{name: "audit.membershipstatustext"},
							{name: "audit.scheduleddate"},
							{name: "audit.actualdate"},
							{name: "audit.paid"},
							{name: "audit.agrisubscription.enddate"},
							{name: 'audit.agrisubscription.agricertificate.certificatenumber'},
							{name: "audit.agrisubscription.agricertificate.dateissued"},
							{name: 'audit.teamleadercontactpersontext'},
							{name: "audit.description"},
							{
								name: "audit.daysBeforeLogged", 
								caption: 'Days to Lodge<br /><span class="ns1blankspaceSubNote">(Please include Audit & Created Date)</span>',
								exportHeader: "Days to Lodge", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.report.daysBetween,
								processParameter: {date1: 'audit.actualdate', date2: 'audit.createddate'}
							},
							{name: "audit.createddate"},
							{name: "audit.createdusertext"},
							{name: "audit.modifieddate"},
							{name: "audit.modifiedusertext"},
							{groupTitle: 'Training Evaluation Details'},
							{name: 'audit.trainercontactbusinesstext'},
							{name: 'audit.trainingdate'},
							{name: 'audit.trainingduration'},
							{name: 'audit.trainingrating'},
							{name: 'audit.trainingnotes'}
						]
					}
				},
				{	/* Trainers
					v3.1.1 SUP022434 Added Trainer ID */
					name: 'Trainers',
					group: 3,
					object: nsFreshcare.objectBusiness,
					objectText: 'Business',
					objectName: 'contactbusiness',
					method: 'CONTACT_BUSINESS_SEARCH',
					returnParameters: 'contactbusiness' +
									 ',contactbusiness.contactperson',
					functionSearch: nsFreshcare.admin.grower.search.send,
					windowOpen: '/#/nsFreshcare-admin.trainer/id:',
					showSort: true,
					scriptOnNewPage: ns1blankspace.report.search.bind,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					fixedParameters:
					{
						filters:
						[	/* v3.1.1 SUP022437 Now only looks at Trainer businessgroup in filter */
							{
								name: "contactbusiness.businessgroup",
								comparison: "EQUAL_TO",
								value1: nsFreshcare.data.businessGroupTrainer
							},
							/*{
								name: "contactbusiness.contactperson.persongroup",
								comparison: "IN_LIST",
								value1: nsFreshcare.data.groupTrainer.join(','),
								value2: "",
								value3: "",
								applyToSubSearch: "N"
							},*/
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: "contactbusiness.primarycontactpersontext"},
								name: "contactbusiness.contactperson.id",
								comparison: "EQUAL_TO",
								value1: "field:contactbusiness.primarycontactperson",
								value2: "",
								value3: "",
								applyToSubSearch: "N"
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: "contactbusiness.contactperson.*"},
								name: "contactbusiness.contactperson.persongroup",
								comparison: "IN_LIST",
								value1: nsFreshcare.data.groupTrainer.join(',')
							}						
						]
					},
					selectableParameters: 
					{
						fields: 
						[
							{groupTitle: 'Trainer Business Details'},
							{name: "contactbusiness.tradename"},
							{name: "contactbusiness.legalname"},
							{name: "contactbusiness.reference"},
							{name: "contactbusiness.abn"},
							{name: "contactbusiness.streetaddress1"},
							{name: "contactbusiness.streetaddress2"},
							{name: "contactbusiness.streetsuburb"},
							{name: "contactbusiness.streetstate"},
							{name: "contactbusiness.streetpostcode"},
							{name: "contactbusiness.streetcountry"},
							{name: "contactbusiness.supplierstatustext", caption: 'Trainer Business Status'},
							{name: "contactbusiness.primarycontactpersontext"},
							{name: "contactbusiness.createddate"},
							{name: "contactbusiness.createdusertext"},
							{name: "contactbusiness.modifieddate"},
							{name: "contactbusiness.modifiedusertext"},
							{groupTitle: 'Trainer Details'},
							{name: "contactbusiness.contactperson.reference", caption: 'Trainer ID'},
							{name: "contactbusiness.contactperson.position"},
							{name: "contactbusiness.contactperson.titletext"},
							{name: "contactbusiness.contactperson.mobile"},
							{name: "contactbusiness.contactperson.workphone"},
							{name: "contactbusiness.contactperson.email"},
							{name: "contactbusiness.contactperson.fax"},
							{name: "contactbusiness.contactperson.firstname"},
							{name: "contactbusiness.contactperson.surname"},
							{name: "contactbusiness.mailingaddress1"},
							{name: "contactbusiness.mailingaddress2"},
							{name: "contactbusiness.mailingsuburb"},
							{name: "contactbusiness.mailingstate"},
							{name: "contactbusiness.mailingpostcode"},
							{name: "contactbusiness.mailingcountry"},
							{name: "contactbusiness.contactperson.supplierstatustext", caption: 'Trainer Status'},
							{name: "contactbusiness.contactperson.displayphone"},
							{name: "contactbusiness.contactperson.displaymobile"},
							{name: "contactbusiness.primarycontactpersontext"},
							{name: "contactbusiness.contactperson.createddate"},
							{name: "contactbusiness.contactperson.createdusertext"},
							{name: "contactbusiness.contactperson.modifieddate"},
							{name: "contactbusiness.contactperson.modifiedusertext"}
						]
					}
				},
				{	/* Training COurses */
					name: 'Training Course Report',
					group: 3,
					object: nsFreshcare.objectBusiness,
					objectText: 'Training Course',
					objectName: 'agritrainingcourse',
					method: 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH',
					returnParameters: 'agritrainingcourse' +
								',agritrainingcourse.package' +
								',agritrainingcourse.package.codeofpractice' +
								',agritrainingcourse.attendee',
					functionSearch: nsFreshcare.admin.trainingcourse.search.send,
					windowOpen: '/#/nsFreshcare-admin.trainingcourse/id:',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					showSort: true,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					selectableParameters:
					{
						fields:
						[
							{groupTitle: 'Package Details'},
							{name: 'agritrainingcourse.packagetext'},
							{name: 'agritrainingcourse.package.codeofpracticetext'},
							{name: 'agritrainingcourse.package.membershiptext'},
							{name: 'agritrainingcourse.package.statustext'},
							{name: 'agritrainingcourse.package.details'},
							{groupTitle: 'Course Details'},
							{name: 'agritrainingcourse.trainercontactbusinesstext'},
							{name: 'agritrainingcourse.trainercontactpersontext'},
							{name: 'agritrainingcourse.reference'},
							{name: 'agritrainingcourse.title'},
							{name: 'agritrainingcourse.details'},
							{name: 'agritrainingcourse.statetext'},
							{name: 'agritrainingcourse.location'},
							{name: 'agritrainingcourse.coursedate'},
							{name: 'agritrainingcourse.statustext'},
							{name: 'agritrainingcourse.attendeecount'},
							{name: 'agritrainingcourse.createddate'},
							{name: 'agritrainingcourse.createdusertext'},
							{name: 'agritrainingcourse.modifieddate'},
							{name: 'agritrainingcourse.modifiedusertext'},
							{groupTitle: 'Attendee Details'},
							{name: 'agritrainingcourse.attendee.traineecontactbusinesstext'},
							{name: 'agritrainingcourse.attendee.traineecontactpersontext'},
							{name: 'agritrainingcourse.attendee.attendingtrainee'}
						]
					}
				},
				{	/* Customers
					v3.1.209 Added */
					name: 'Customers',
					group: 4,
					object: nsFreshcare.objectBusiness,
					objectText: 'Business',
					objectName: 'contactbusiness',
					method: 'CONTACT_BUSINESS_SEARCH',
					returnParameters: 'contactbusiness' +
									 ',contactbusiness.contactperson',
					functionSearch: nsFreshcare.admin.grower.search.send,
					windowOpen: '/#/nsFreshcare-admin.customer/id:',
					showSort: true,
					scriptOnNewPage: ns1blankspace.report.search.bind,
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					fixedParameters:
					{
						filters:
						[	
							{
								name: "contactbusiness.businessgroup",
								comparison: "EQUAL_TO",
								value1: nsFreshcare.data.businessGroupCustomer
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: "contactbusiness.primarycontactpersontext"},
								name: "contactbusiness.contactperson.id",
								comparison: "EQUAL_TO",
								value1: "field:contactbusiness.primarycontactperson",
								value2: "",
								value3: "",
								applyToSubSearch: "N"
							}						
						]
					},
					selectableParameters: 
					{
						fields: 
						[
							{groupTitle: 'Customer Business Details'},
							{name: "contactbusiness.tradename"},
							{name: "contactbusiness.legalname"},
							{name: "contactbusiness.reference"},
							{name: "contactbusiness.abn"},
							{name: "contactbusiness.streetaddress1"},
							{name: "contactbusiness.streetaddress2"},
							{name: "contactbusiness.streetsuburb"},
							{name: "contactbusiness.streetstate"},
							{name: "contactbusiness.streetpostcode"},
							{name: "contactbusiness.streetcountry"},
							{name: "contactbusiness.mailingaddress1"},
							{name: "contactbusiness.mailingaddress2"},
							{name: "contactbusiness.mailingsuburb"},
							{name: "contactbusiness.mailingstate"},
							{name: "contactbusiness.mailingpostcode"},
							{name: "contactbusiness.mailingcountry"},
							{name: "contactbusiness.supplierstatustext", caption: 'Customer Business Status'},
							{name: "contactbusiness.primarycontactpersontext"},
							{name: "contactbusiness.createddate"},
							{name: "contactbusiness.createdusertext"},
							{name: "contactbusiness.modifieddate"},
							{name: "contactbusiness.modifiedusertext"},
							{groupTitle: 'Trainer Details'},
							{name: "contactbusiness.contactperson.reference", caption: 'Customer Number'},
							{name: "contactbusiness.contactperson.position"},
							{name: "contactbusiness.contactperson.titletext"},
							{name: "contactbusiness.contactperson.mobile"},
							{name: "contactbusiness.contactperson.workphone"},
							{name: "contactbusiness.contactperson.email"},
							{name: "contactbusiness.contactperson.fax"},
							{name: "contactbusiness.contactperson.firstname"},
							{name: "contactbusiness.contactperson.surname"},
							{name: "contactbusiness.contactperson.supplierstatustext", caption: 'Customer Contact Status'},
							{name: "contactbusiness.contactperson.createddate"},
							{name: "contactbusiness.contactperson.createdusertext"},
							{name: "contactbusiness.contactperson.modifieddate"},
							{name: "contactbusiness.contactperson.modifiedusertext"}
						]
					}
				},
				{	/* Subscription Performance Summary */
					name: 'Subscription Performance Summary',
					group: 5,
					object: nsFreshcare.objectSubscription,
					objectText: 'Membership Subscription',
					objectName: 'agrisubscription',
					method: 'AGRI_SUBSCRIPTION_SEARCH',
					summary: 'This report shows grouped breakdowns of subscription status counts.',
					showFixedParameters: false,
					scriptReportFilters: nsFreshcare.admin.report.subscriptionPerformanceSummary.filters,
					scriptReportSearch: nsFreshcare.admin.report.subscriptionPerformanceSummary.search,
					scriptReportProcess: nsFreshcare.admin.report.subscriptionPerformanceSummary.process,
					showSort: false,
					returnParameters: 'agrisubscription',
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					customFilters:
					{
						fields:
						[
							{
								name: 'membership',
								caption: 'Membership',
								type: 'Select',
								method: 'AGRI_MEMBERSHIP_SEARCH',
								mandatory: true,
								'default': 'Freshcare Food Safety & Quality',
								defaultID: '1',
								methodFilter: 'code-TEXT_IS_LIKE|title-TEXT_IS_LIKE|status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive
							},
							{
								name:'endDate',
								comparison: 'LESS_THAN_OR_EQUAL_TO',
								type: 'Date',
								caption: 'End Date',
								mandatory: true,
								"default": function() {return dToday.toString('dd MMM yyyy')}
							}
						]
					}
				},
				{	/* Subscription Performance */
					name: 'Subscription Performance',
					group: 5,
					object: nsFreshcare.objectSubscription,
					objectText: 'Membership Subscription',
					objectName: 'agrisubscription',
					method: 'AGRI_SUBSCRIPTION_SEARCH',
					summary: 'This report shows a breakdown of subscription status counts by month.',
					showFixedParameters: false,
					scriptReportFilters: nsFreshcare.admin.report.subscriptionPerformance.filters,
					scriptReportSearch: nsFreshcare.admin.report.subscriptionPerformance.search,
					scriptReportProcess: nsFreshcare.admin.report.subscriptionPerformance.process,
					showSort: false,
					returnParameters: 'agrisubscription',
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					customFilters:
					{
						fields:
						[
							{
								name:'startDate',
								comparison: 'GREATER_THAN_OR_EQUAL_TO',
								type: 'Date',
								caption: 'Start Date',
								mandatory: true,
								"default": function() {return nsFreshcare.util.startFinancialYear().toString('dd MMM yyyy')}
							},
							{
								name: 'endDate',
								comparison: 'LESS_THAN_OR_EQUAL_TO',
								type: 'Date',
								caption: 'End Date',
								"default": function() {return dToday.toString('dd MMM yyyy')}
							}
						]
					}
				},
				{	/* Advanced Certification */
					name: 'Advanced Certification Report',
					group: 5,
					object: nsFreshcare.objectSubscription,
					objectText: 'Membership Subscription',
					objectName: 'agrisubscription',
					method: 'AGRI_SUBSCRIPTION_SEARCH',
					summary: 'This report shows grower, subscription and last audit details.',
					/*scriptOnNewPage: nsFreshcare.admin.report.newPage.advancedCertification,*/
					showFixedParameters: false,
					showSort: false,
					returnParameters: 'agrisubscription' +
								',agrisubscription.contactbusiness' +
								',agrisubscription.contactbusiness.contactperson' +
								',agrisubscription.membership' +
								',agrisubscription.agricertificate' +
								',agrisubscription.status',
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					customFilters:
					{
						fields:
						[
							{
								name:'status',
								comparison: 'IN_LIST',
								type: 'Select',
								caption: 'Membership Status',
								method: 'SETUP_AGRI_SUBSCRIPTION_STATUS_SEARCH',
								methodFilter: 'reference-TEXT_IS_LIKE|title-TEXT_IS_LIKE',
								multiSelect: true
							},
							{
								name: 'nonCertified',
								type: 'Check',
								caption: 'Show only Non-Certified Memberships'
							}
						]
					},
					customOptions:
					[
						{option: 'lastaudit', value: ',,N'},
						{option: "statuschange", value: "," + dToday.toString('dd MMM yyyy') + ' 23:59:59,'}
					],
					fixedParameters:
					{
						fields:
						[
							{name: 'agrisubscription.contactbusiness.tradename'},
							{name: 'agrisubscription.contactpersontext'},
							{name: 'agrisubscription.membership.code'},
							{name: 'agrisubscription.codeofpracticetext'},
							{name: 'agrisubscription.status.reference'},
							{name: 'agrisubscription.laststatuschangedate'},
							{name: 'agrisubscription.agrilastaudit.id', hidden: true}, 
							{name: "agrisubscription.agrilastaudit.actualdate"},
							{name: "agrisubscription.agrilastaudit.resultstatusdate"},
							{name: "agrisubscription.agrilastaudit.resultstatustext"},
							{name: 'agrisubscription.agricertificate.certificatenumber'},
							{name: 'agrisubscription.agricertificate.dateissued'},
							{name: 'agrisubscription.agricertificate.enddate'},
							{name: 'agrisubscription.agrisubscriptionstatuschange.tostatustext', caption: 'Last Status Change'},
							{name: 'agrisubscription.contactbusiness.mailingaddress1'},
							{name: 'agrisubscription.contactbusiness.mailingaddress2'},
							{name: 'agrisubscription.contactbusiness.mailingsuburb'},
							{name: 'agrisubscription.contactbusiness.mailingpostcode'},
							{name: 'agrisubscription.contactbusiness.mailingstate'},
							{name: 'agrisubscription.contactbusiness.contactperson.workphone'},
							{name: 'agrisubscription.contactbusiness.contactperson.email'}
						],
						filters:
						[
							{	/* v3.1.206 SUP023035 Now business (not person) centric */
								name: 'agrisubscription.contactbusiness.primarycontactperson',
								comparison: 'EQUAL_TO',
								value1: 'field:agrisubscription.contactbusiness.contactperson.id'
							},
							{
								includeEval: ns1blankspace.report.customFilterValue,
								includeParameters: {field: 'status', comparison: 'NOT_EQUAL_TO', value: ''},
								bracketBefore: '(',
								name: 'agrisubscription.agricertificate.id',
								comparison: 'IS_NULL',
								operatorAfter: 'or'
							},
							{
								includeEval: ns1blankspace.report.customFilterValue,
								includeParameters: {field: 'nonCertified', value: true},
								name: 'agrisubscription.agricertificate.id',
								comparison: 'IS_NULL',
								operatorAfter: 'or'
							},
							{
								includeEval: ns1blankspace.report.customFilterValue,
								includeParameters: {field: 'nonCertified', value: true},
								name: 'agrisubscription.agricertificate.enddate',
								comparison: 'LESS_THAN_OR_EQUAL_TO',
								value1: dToday.toString('dd MMM yyyy') + ' 23:59:59',
								bracketAfter: ')' 
							}
						],
						sorts:
						[
							{name: 'agrisubscription.contactbusinesstext', direction: 'asc'}
						]
					}
				},
				{	/* Subscription & Transaction Status Differ */
					name: 'Subscription and Transaction Status Differ',
					group: 5,
					object: nsFreshcare.objectSubscription,
					objectText: 'Membership Subscription',
					objectName: 'agrisubscription',
					method: 'AGRI_SUBSCRIPTION_SEARCH',
					summary: 'This report shows growers where Subscription Status differs from the last Status Change Transaction.',
					showSort: false,
					returnParameters: 'agrisubscription,' +
									  'agrisubscription.contactbusiness,' +
									  'agrisubscription.agrisubscriptionstatuschange',
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					customOptions:
					[
						{option: "statuschange", value: "," + dToday.toString('dd MMM yyyy') + ' 23:59:59,'}
					],
					fixedParameters:
					{
						fields:
						[
							{name: 'agrisubscription.statustext', caption: 'Subscription Status'},
							{name: 'agrisubscription.agrisubscriptionstatuschange.tostatustext', caption: 'Last Status Change'},
							{name: 'agrisubscription.contactbusiness.tradename'},
							{name: 'agrisubscription.contactpersontext'}
						],
						filters:
						[
							{
								name: 'agrisubscription.status',
								comparison: 'NOT_EQUAL_TO',
								value1: 'field:agrisubscription.agrisubscriptionstatuschange.tostatus'
							}
						]
					}
				}
			];
		}

		if (ns1blankspace.report.dictionary === undefined || ns1blankspace.report.dictionary.length == 0)
		{
			ns1blankspace.report.dictionary = 
			[
				{name: "contactbusiness.reference", caption: 'Company ID'},
				{name: "contactbusiness.tradename", caption: "Trading Name"},
				{name: "contactbusiness.legalname", caption: "Legal Name"},
				{name: "contactbusiness.createddate", caption: "Date Business created"},
				{name: "contactbusiness.createdusertext", caption: "Business created by"},
				{name: "contactbusiness.modifieddate", caption: "Date Business updated"},
				{name: "contactbusiness.modifiedusertext", caption: "Business updated by"},
				{name: "contactbusiness.mailingaddress1", caption: "Mail Address 1"},
				{name: "contactbusiness.mailingaddress2", caption: "Mail Address 2"},
				{name: "contactbusiness.mailingsuburb", caption: "Mail Suburb"},
				{name: "contactbusiness.mailingstate", caption: "Mail State"},
				{name: "contactbusiness.mailingpostcode", caption: "Mail Post Code"},
				{name: "contactbusiness.mailingcountry", caption: "Mail Country"},
				{name: "contactbusiness.contactperson.reference", caption: "Contact Reference"},
				{name: "contactbusiness.contactperson.firstname", caption: "First Name"},
				{name: "contactbusiness.contactperson.surname", caption: "Surname"},
				{name: "contactbusiness.contactperson.position", caption: 'Position'},
				{name: "contactbusiness.contactperson.titletext", caption: "Title"},
				{name: "contactbusiness.contactperson.mobile", caption: "Mobile"},
				{name: "contactbusiness.contactperson.workphone", caption: "Phone"},
				{name: "contactbusiness.contactperson.email", caption: "Email"},
				{name: "contactbusiness.contactperson.fax", caption: "Fax"},
				{name: 'contactbusiness.abn', caption: 'ABN'},
				{name: "contactbusiness.streetaddress1", caption: 'Street Address 1'},
				{name: "contactbusiness.streetaddress2", caption: 'Street Address 2'},
				{name: "contactbusiness.streetsuburb", caption: 'Street Suburb'},
				{name: "contactbusiness.streetstate", caption: 'Street State'},
				{name: "contactbusiness.streetpostcode", caption: 'Street Post Code'},
				{name: "contactbusiness.streetcountry", caption: 'Street Country'},
				{name: "contactbusiness.primarycontactpersontext", caption: 'Primary Contact'},
				{name: "contactbusiness.se" + nsFreshcare.data.certificationBodyNumberId, caption: 'Certification Body Number'},
				{name: "contactbusiness.se" + nsFreshcare.data.selfCertificationDateId, caption: 'Self-Certificaion Date'},
				{name: "contactbusiness.se" + nsFreshcare.data.jasanzDateId, caption: 'JASANZ Date'},
				{name: 'contactbusiness.auditDaysBeforeSent', caption: 'Days to Send Certificate<br /><span class="ns1blankspaceSubNote">(Please include Issued & Sent Dates)</span>'},
				{name: "contactbusiness.contactperson.persongrouptext", caption: "Person Group"},
				{name: "contactbusiness.contactperson.displayphone", caption: "Display Phone on Website?"},
				{name: "contactbusiness.contactperson.displaymobile", caption: "Display Mobile on Website?"},
				{name: "contactbusiness.contactperson.createdusertext", caption: "Created By"},
				{name: "contactbusiness.contactperson.createddate", caption: "Created Date"},
				{name: "contactbusiness.contactperson.modifiedusertext", caption: "Last Modified By"},
				{name: "contactbusiness.contactperson.modifieddate", caption: "Date Person updated"},
				{name: "contactbusiness.addresslink.address.address1", caption: "Street Address 1"},
				{name: "contactbusiness.addresslink.address.address2", caption: "Street Address 2"},
				{name: "contactbusiness.addresslink.address.addresssuburb", caption: "Street Suburb"},
				{name: "contactbusiness.addresslink.address.addressstate", caption: "Street State"},
				{name: "contactbusiness.addresslink.address.addresspostcode", caption: "Street Post Code"},
				{name: "contactbusiness.addresslink.address.addresscountry", caption: "Street Country"},
				{name: "contactbusiness.agrisubscription.crop", caption: "Crops"},
				{name: "contactbusiness.agrisubscription.harvestmonth", caption: "Harvest Months"},
				{name: "contactbusiness.agrisubscription.statustext", caption: "Grower Status"},
				{name: "contactbusiness.agrisubscription.status.reference", caption: 'Grower Status'},
				{name: "contactbusiness.agrisubscription.codeofpracticetext", caption: "Membership COP"},
				{name: "contactbusiness.agrisubscription.lastauditdate", caption: "Last Audit Date"},
				{name: "contactbusiness.agrisubscription.membershiptext", caption: "Membership"},
				{name: "contactbusiness.agrisubscription.membership.code", caption: "Membership"},
				{name: "contactbusiness.agrisubscription.modifieddate", caption: "Date Subscription updated"},
				{name: "contactbusiness.agrisubscription.laststatuschangedate", caption: "Date Status updated"},
				{name: "contactbusiness.agrisubscription.agricertificate.certificatenumber", caption: "Certificate"},
				{name: "contactbusiness.agrisubscription.agricertificate.enddate", caption: "Certificate Expiry"},
				{name: "contactbusiness.agrisubscription.agricertificate.dateissued", caption: "Certificate Issued Date"},
				{name: "contactbusiness.agrisubscription.agricertificate.sentdate", caption: "Certificate Sent Date"},
				{name: "contactbusiness.agrisubscription.agriproductgroup.productcategorytext", caption: "Category"},
				{name: "contactbusiness.agrisubscription.agriobjectscope.scopetext", caption: 'Certificate Scope'},
				{name: "contactbusiness.agrisubscription.agricertificate.modifieddate", caption: "Date Certificate updated"},
				{name: 'contactbusiness.agrisubscription.agrilastcourse.coursedate', caption: 'Course Date'},
				{name: 'contactbusiness.agrisubscription.agrilastcourse.trainercontactbusinesstext', caption: 'Trainer Business'},
				{name: 'contactbusiness.agrisubscription.agrilastcourse.trainercontactpersontext', caption: 'Trainer'},
				{name: 'contactbusiness.agrisubscription.agrilastcourse.attendee.attendingtrainee', caption: 'Attending Trainee'},
				{name: 'contactbusiness.agrisubscription.agrilastcourse.statetext', caption: 'Training State'},
				{name: 'contactbusiness.agrisubscription.agrilastcoursecached.coursedate', caption: 'Course Date'},
				{name: 'contactbusiness.agrisubscription.agrilastcoursecached.trainercontactbusinesstext', caption: 'Trainer Business'},
				{name: 'contactbusiness.agrisubscription.agrilastcoursecached.trainercontactpersontext', caption: 'Trainer'},
				{name: 'contactbusiness.agrisubscription.agrilastcoursecached.attendee.attendingtrainee', caption: 'Attending Trainee'},
				{name: 'contactbusiness.agrisubscription.agrilastcoursecached.statetext', caption: 'Training State'},

				{name: 'agritrainingcourse.trainercontactbusinesstext', caption: 'Trainer Business'},
				{name: 'agritrainingcourse.trainercontactpersontext', caption: 'Trainer'},
				{name: 'agritrainingcourse.packagetext', caption: 'Package Title'},
				{name: 'agritrainingcourse.package.codeofpracticetext', caption: 'COP'},
				{name: 'agritrainingcourse.package.membershiptext', caption: 'Membership'},
				{name: 'agritrainingcourse.package.statustext', caption: 'Package Status'},
				{name: 'agritrainingcourse.package.details', caption: 'Package Details'},
				{name: 'agritrainingcourse.reference', caption: 'Reference'},
				{name: 'agritrainingcourse.title', caption: 'Course Title'},
				{name: 'agritrainingcourse.details', caption: 'Course Details'},
				{name: 'agritrainingcourse.statetext', caption: 'State'},
				{name: 'agritrainingcourse.location', caption: 'Location'},
				{name: 'agritrainingcourse.coursedate', caption: 'Course Date'},
				{name: 'agritrainingcourse.statustext', caption: 'Course Status'},
				{name: 'agritrainingcourse.attendeecount', caption: 'Attendee Count'},
				{name: 'agritrainingcourse.createddate', caption: 'Create Date'},
				{name: 'agritrainingcourse.createdusertext', caption: 'Created By'},
				{name: 'agritrainingcourse.modifieddate', caption: 'Last Modified'},
				{name: 'agritrainingcourse.modifiedusertext', caption: 'Last Modified By'},
				{name: 'agritrainingcourse.attendee.traineecontactbusinesstext', caption: 'Attendee Business'},
				{name: 'agritrainingcourse.attendee.traineecontactpersontext', caption: 'Attendee Contact'},
				{name: 'agritrainingcourse.attendee.attendingtrainee', caption: 'Attending Trainee'},

				{name: 'agrisubscription.contactpersontext', caption: 'Grower Contact'},
				{name: 'agrisubscription.contactbusiness.tradename', caption: 'Grower Trading Name'},
				{name: 'agrisubscription.contactbusiness.legalname', caption: 'Grower Legal Name'},
				{name: 'agrisubscription.contactbusiness.reference', caption: 'Company ID'},
				{name: 'agrisubscription.contactbusiness.abn', caption: 'Grower ABN'},
				{name: 'agrisubscription.codeofpracticetext', caption: 'Subscription COP'},
				{name: "agrisubscription.firstcertified", caption: 'First Certified'},
				{name: 'agrisubscription.startdate', caption: 'Membership Start'},
				{name: 'agrisubscription.enddate', caption: 'Membership End'},
				{name: 'agrisubscription.crop', caption: 'Crops'},
				{name: 'agrisubscription.harvestmonth', caption: 'Harvest Months'},
				{name: "agrisubscription.contactbusiness.notes", caption: 'Notes'},
				{name: "agrisubscription.agriproductgroup.productcategorytext", caption: 'Product Category'},
				{name: 'agrisubscription.statustext', caption: 'Membership Status'},
				{name: 'agrisubscription.status.reference', caption: 'Membership Status'},
				{name: 'agrisubscription.laststatuschangedate', caption: 'Status Date'},
				{name: 'agrisubscription.auditDaysBeforeSent', caption: 'Days to Send Certificate<br /><span class="ns1blankspaceSubNote">(Please include Issued & Sent Dates)</span>'},
				{name: 'agrisubscription.contactbusiness.createddate', caption: 'Business Created On'},
				{name: 'agrisubscription.contactbusiness.createdusertext', caption: 'Business Created By'},
				{name: 'agrisubscription.contactbusiness.modifieddate', caption: 'Business Modified On'},
				{name: 'agrisubscription.contactbusiness.modifiedusertext', caption: 'Business Modified By'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.address1', caption: 'Street Address 1'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.address2', caption: 'Street Address 2'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.addresssuburb', caption: 'Street Suburb'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.addressstate', caption: 'Street State'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.addresspostcode', caption: 'Street Postcode'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.addresscountry', caption: 'Street Country'},
				{name: 'agrisubscription.contactbusiness.addresslink.address.address1', caption: 'Street Address 1'},
				{name: 'agrisubscription.contactbusiness.primarycontactpersontext', caption: "Primary Contact Person"},
				{name: 'agrisubscription.contactbusiness.contactperson.persongrouptext', caption: "Person Group"},
				{name: 'agrisubscription.contactbusiness.contactperson.firstname', caption: 'Grower First Name'},
				{name: 'agrisubscription.contactbusiness.contactperson.persongroup.grouptext', caption: 'Person Group'},
				{name: 'agrisubscription.contactbusiness.contactperson.surname', caption: 'Grower Surname'},
				{name: 'agrisubscription.contactbusiness.contactperson.email', caption: 'Grower Email'},
				{name: 'agrisubscription.contactbusiness.contactperson.position', caption: 'Grower Position'},
				{name: 'agrisubscription.contactbusiness.contactperson.titletext', caption: 'Grower Title'},
				{name: 'agrisubscription.contactbusiness.contactperson.workphone', caption: 'Grower Phone'},
				{name: 'agrisubscription.contactbusiness.contactperson.fax', caption: 'Grower Fax'},
				{name: 'agrisubscription.contactbusiness.contactperson.mobile', caption: 'Grower Mobile'},
				{name: 'agrisubscription.contactbusiness.mailingaddress1', caption: 'Mailing Address 1'},
				{name: 'agrisubscription.contactbusiness.mailingaddress2', caption: 'Mailing Address 2'},
				{name: 'agrisubscription.contactbusiness.mailingsuburb', caption: 'Mailing Suburb'},
				{name: 'agrisubscription.contactbusiness.mailingstate', caption: 'Mailing State'},
				{name: 'agrisubscription.contactbusiness.mailingpostcode', caption: 'Mailing Postcode'},
				{name: 'agrisubscription.contactbusiness.mailingcountry', caption: 'Mailing Country'},
				{name: "agrisubscription.contactbusiness.contactperson.user.username", caption: 'User name'},
				{name: "agrisubscription.contactbusiness.contactperson.user.se" + nsFreshcare.data.userPasswordId, caption: "Initial Password"},	/* SUP021103 */
				{name: 'agrisubscription.membershiptext', caption: 'Membership'},
				{name: 'agrisubscription.membership.code', caption: 'Membership Code'},
				{name: 'agrisubscription.agricertificate.certificatenumber', caption: 'Certification Number'}, /* v3.1.213 SUP023249 Removed 'Freshcare' */
				{name: 'agrisubscription.agricertificate.dateissued', caption: 'Certificate Date Issued'},
				{name: 'agrisubscription.agricertificate.enddate', caption: 'Certificate Expiry Date'},
				{name: 'agrisubscription.agricertificate.sentdate', caption: 'Certificate Sent Date'},
				{name: "agrisubscription.agricertificate.sent", caption: "Certificate Sent?"},
				{name: "agrisubscription.agricertificate.audit.actualdate", caption: "Certificate Audit Date"},
				{name: "agrisubscription.agricertificate.audit.auditbusinesstext", caption: "Certificate Audit CB"},
				{name: 'agrisubscription.trainingcodeofpracticetext', caption: 'Training COP'},
				{name: 'agrisubscription.trainingtrainercontactbusinesstext', caption: 'Trainer Business'},
				{name: 'agrisubscription.trainingtrainercontactpersontext', caption: 'Trainer Person'},
				{name: "agrisubscription.agriobjectscope.scopetext", caption: 'Certificate Scope'},
				{name: 'agrisubscription.auditactualdate', caption: 'Latest Audit'},
				{name: 'agrisubscription.auditstatustext', caption: 'Status'},
				{name: 'agrisubscription.auditauditbusinesstext', caption: 'Certification Body'},
				{name: 'agrisubscription.auditauditpersontext', caption: 'Auditor'},
				{name: 'agrisubscription.agricertificate.audit.action.subject', caption: 'Certificate Reference'},
				{name: 'agrisubscription.agrisubscriptionstatuschange.tostatustext', caption: 'Last Status Change'},
				{name: 'agrisubscription.agrilastaudit.auditbusinesstext', caption: 'Cert Body'},
				{name: 'agrisubscription.agrilastaudit.auditpersontext', caption: 'Auditor'},
				{name: 'agrisubscription.agrilastaudit.paid', caption: 'Audit Paid?'},
				{name: 'agrisubscription.agrilastaudit.actualdate', caption: 'Last Audit Date'},
				{name: 'agrisubscription.agrilastaudit.se' + nsFreshcare.data.auditPaidId, caption: 'Audit Paid?'},
				{name: 'agrisubscription.agrilastaudit.resultstatustext', caption: 'Audit Result Status'},
				{name: 'agrisubscription.agrilastaudit.resultstatusdate', caption: 'Result Status Date'},
				{name: 'agrisubscription.agrilastcourse.coursedate', caption: 'Course Date'},
				{name: 'agrisubscription.agrilastcourse.trainercontactbusinesstext', caption: 'Trainer Business'},
				{name: 'agrisubscription.agrilastcourse.trainercontactpersontext', caption: 'Trainer'},
				{name: 'agrisubscription.agrilastcourse.attendee.attendingtrainee', caption: 'Attending Trainee'},
				{name: 'agrisubscription.agrilastcourse.statetext', caption: 'Training State'},
				{name: 'agrisubscription.agrilastcourse.package.codeofpracticetext', caption: 'Training Course COP'},
				{name: 'agrisubscription.agrilastauditcached.auditbusinesstext', caption: 'Cert Body'},
				{name: 'agrisubscription.agrilastauditcached.auditpersontext', caption: 'Auditor'},
				{name: 'agrisubscription.agrilastauditcached.paid', caption: 'Audit Paid?'},
				{name: 'agrisubscription.agrilastauditcached.actualdate', caption: 'Last Audit Date'},
				{name: 'agrisubscription.agrilastauditcached.se' + nsFreshcare.data.auditPaidId, caption: 'Audit Paid?'},
				{name: 'agrisubscription.agrilastauditcached.resultstatustext', caption: 'Audit Result Status'},
				{name: 'agrisubscription.agrilastauditcached.resultstatusdate', caption: 'Result Status Date'},
				{name: 'agrisubscription.agrilastcoursecached.coursedate', caption: 'Course Date'},
				{name: 'agrisubscription.agrilastcoursecached.trainercontactbusinesstext', caption: 'Trainer Business'},
				{name: 'agrisubscription.agrilastcoursecached.trainercontactpersontext', caption: 'Trainer'},
				{name: 'agrisubscription.agrilastcoursecached.attendee.attendingtrainee', caption: 'Attending Trainee'},
				{name: 'agrisubscription.agrilastcoursecached.statetext', caption: 'Training State'},
				{name: 'agrisubscription.agrilastcoursecached.package.codeofpracticetext', caption: 'Training Course COP'},
						
				{name: "audit.contactperson.firstname", caption: "Grower First Name"},
				{name: "audit.contactperson.surname", caption: "Grower Surname"},
				{name: "audit.contactbusinesstext", caption: "Grower Trading Name"},
				{name: "audit.contactbusiness.legalname", caption: "Grower Legal name"},
				{name: "audit.contactbusiness.tradename", caption: "Grower Trading Name"},
				{name: "audit.contactbusiness.reference", caption: "Grower Company ID"},
				{name: "audit.auditbusinesstext", caption: "Certification Body"},
				{name: "audit.auditpersontext", caption: "Auditor"},
				{name: "audit.codeofpracticetext", caption: "Code of Practice"},
				{name: "audit.reference", caption: "Reference"},
				{name: "audit.paid", caption: "Paid?"},
				{name: "audit.typetext", caption: "Title"},
				{name: "audit.statustext", caption: "Audit Status"},
				{name: "audit.resultstatustext", caption: "Result Status"},
				{name: "audit.resultstatusdate", caption: "Date Result Achieved"},
				{name: "audit.membershipstatustext", caption: "Resulting Membership Status"},
				{name: "audit.actualdate", caption: "Audit Date"},
				{name: "audit.scheduleddate", caption: "Scheduled Date"},
				{name: 'audit.teamleadercontactpersontext', caption: "Reviewer"},
				{name: "audit.trainercontactbusinesstext", caption: "Trainer Business"},
				{name: "audit.trainingdate", caption: 'Training Date'},
				{name: "audit.trainingduration", caption: "Training Duration"},
				{name: "audit.trainingrating", caption: 'Training Rating'},
				{name: "audit.trainingnotes", caption: 'Training notes'},
				{name: "audit.agrisubscription.membershiptext", caption: "Membership"},
				{name: 'audit.agrisubscription.agricertificate.certificatenumber', caption: 'Certificate Number'},
				{name: "audit.agrisubscription.agricertificate.dateissued", caption: "Certificate Issued"},
				{name: "audit.agrisubscription.enddate", caption: 'Subscription End Date'},
				{name: "audit.description", caption: "Details"},
				{name: "audit.createdusertext", caption: "Audit Created By"},
				{name: "audit.createddate", caption: "Created Date"},
				{name: "audit.modifieddate", caption: "Last Updated Date"},
				{name: "audit.modifiedusertext", caption: "Last Updated By"},

				{name: "auditissue.audit.contactbusiness.tradename", caption: 'Grower Trading Name'},
				{name: "auditissue.audit.contactbusiness.legalname", caption: 'Grower Legal Name'},
				{name: "auditissue.audit.contactbusiness.reference", caption: 'Company ID'},
				{name: "auditissue.audit.contactbusiness.contactperson.firstname", caption: 'Grower Contact First Name'},
				{name: "auditissue.audit.contactbusiness.contactperson.surname", caption: 'Grower Contact Surname'},
				{name: "auditissue.audit.contactbusiness.contactperson.mobile", caption: 'Grower Contact Mobile'},
				{name: "auditissue.audit.contactbusiness.contactperson.workphone", caption: 'Grower Contact Phone'},
				{name: "auditissue.audit.contactbusiness.contactperson.email", caption: 'Grower Contact Email'},
				{name: "auditissue.audit.reference", caption: 'Audit Reference'},
				{name: "auditissue.audit.actualdate", caption: 'Audit Date'},
				{name: "auditissue.audit.typetext", caption: 'Audit Title'},
				{name: "auditissue.audit.agrisubscription.membership.code", caption: 'Membership'},
				{name: "auditissue.audit.codeofpracticetext", caption: 'Audit COP'},
				{name: "auditissue.audit.resultstatustext", caption: 'Result Status'},
				{name: "auditissue.audit.auditbusinesstext", caption: 'Certification Body'},
				{name: "auditissue.audit.auditpersontext", caption: 'Auditor'},
				{name: "auditissue.reference", caption: 'CAR Reference'},
				{name: "auditissue.typetext", caption: 'Severity'},
				{name: "auditissue.sintypetext", caption: 'CAR Type Description'},
				{name: "auditissue.sintype.code", caption: 'CAR Type'},
				{name: "auditissue.statustext", caption: 'CAR Status'},
				{name: "auditissue.datecompleted", caption: 'Completed Date'},
				{name: "auditissue.details", caption: 'Details'},
				{name: "auditissue.resolution", caption: 'Resolution'},
				{name: "auditissue.createddate", caption: 'Created On'},
				{name: "auditissue.createdusertext", caption: 'Created By'},
				{name: "auditissue.modifieddate", caption: 'Last Modified On'},
				{name: "auditissue.modifiedusertext", caption: 'Last Modified By'}
			];
		}

		// v3.1.0e SUP022243 Added Select Attributes for required fields
		if (ns1blankspace.report.selectAttributes === undefined || ns1blankspace.report.selectAttributes.length == 0)
		{
			ns1blankspace.report.selectAttributes = 			
			[
				{
					name: "agrisubscription.membershiptext",
					methodFilter: 'status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive
				},
				{
					name: "agritrainingcourse.trainercontactbusinesstext",
					columns: "tradename",
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|businessgroup-IN_LIST-' + nsFreshcare.data.businessGroupTrainer 
				},
				{
					name: "agritrainingcourse.createdusertext",
					columns: "firstname-space-surname",
					methodFilter: 'id-EQUAL_TO-' + ns1blankspace.user.id
				},
				{
					name: "agritrainingcourse.modifiedusertext",
					columns: "firstname-space-surname",
					methodFilter: 'id-EQUAL_TO-' + ns1blankspace.user.id
				},
				{
					name: "contactbusiness.createdusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "contactbusiness.modifiedusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "contactperson.createdusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "contactperson.modifiedusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "contactbusiness.contactperson.createdusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "contactbusiness.contactperson.modifiedusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "audit.contactbusinesstext",
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID +
								'|primarycontactperson-EQUAL_TO-field:contactbusiness.contactperson.id',
				},
				{
					name: "audit.auditbusinesstext",
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				},
				{
					name: "auditissue.audit.auditbusinesstext",
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				},
				{
					name: "auditissue.audit.auditpersontext",
					columns: 'firstname-space-surname',
					methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|persongroup-IN_LIST-' + nsFreshcare.data.groupAuditor.join(',')
				},
				{
					name: "auditissue.audit.contactbusinesstext",
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID +
								'|primarycontactperson-EQUAL_TO-field:contactbusiness.contactperson.id',
				},
				{
					name: "auditissue.createdusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "auditissue.modifiedusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "audit.auditbusinesstext",
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				},
				{
					name: "audit.auditpersontext",
					columns: 'firstname-space-surname',
					methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|persongroup-IN_LIST-' + nsFreshcare.data.groupAuditor.join(',')
				},
				{
					name: "audit.modifiedusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "audit.createdusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "agritrainingcourse.trainercontactpersontext",
					columns: 'firstname-space-surname',
					methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|persongroup-IN_LIST-' + nsFreshcare.data.groupTrainer.join(',')
				},
				{
					name: "agritrainingcourse.modifiedusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: "agritrainingcourse.createdusertext",
					columns: 'user.contactperson.firstname-space-user.contactperson.surname',
					methodFilter: 'user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.surname-TEXT_IS_LIKE'
				},
				{
					name: 'agritrainingcourse.attendee.traineecontactpersontext', 
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID +
								'|primarycontactperson-EQUAL_TO-field:contactbusiness.contactperson.id',
				},
				{	/* v3.1.204 SUP020320 Filter now matches what is searched when adding Trainees */
					name: 'agritrainingcourse.attendee.attendingtrainee', 
					columns: 'firstname-space-surname',
					methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|persongroup-IN_LIST-' + nsFreshcare.data.grower.categoryGrower + ',' + 
									nsFreshcare.data.groupTrainee  + ',' + nsFreshcare.data.groupOtherContact,
				},
				{	/* v3.1.205 SUP023047 Supply column and filters for Cert Bodies */
					name: 'agrisubscription.agrilastaudit.auditbusinesstext',
					columns: 'tradename',
					methodFilter: 'businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				},
				{	/* v3.1.205 SUP023047 Supply column and filters for Cert Bodies */
					name: 'agrisubscription.agrilastauditcached.auditbusinesstext',
					columns: 'tradename',
					methodFilter: 'businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				},
				{	/* v3.1.206 SUP023047 Supply column and filters for Auditors */
					name: 'agrisubscription.agrilastauditcached.auditpersontext',
					columns: 'firstname-space-surname-space-hyphen-space-contactbusinesstext',
					methodFilter: 'contactperson.contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				},
				{
					name: 'agrisubscription.agrilastcoursecached.trainercontactbusinesstext',
					columns: 'tradename',
					methodFilter: 'businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupTrainer
				},
				{
					name: 'agrisubscription.agrilastcoursecached.trainercontactpersontext',
					columns: 'firstname-space-surname-space-hyphen-space-contactbusinesstext',
					methodFilter: 'contactperson.contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupTrainer
				},
				{
					name: 'audit.codeofpracticetext',
					columns: 'code',
					methodFilter: 'code-TEXT_IS_LIKE'
				},
				{
					name: 'agrisubscription.codeofpracticetext',
					columns: 'code',
					methodFilter: 'code-TEXT_IS_LIKE'
				},
				{
					name: "agrisubscription.agricertificate.audit.auditbusinesstext",
					columns: 'tradename',
					methodFilter: 'tradename-TEXT_IS_LIKE|businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor
				}
			]
		}

		nsFreshcare.admin.report.initUnsentCertificatesReport({group: 2});
		
		// Now extend dictionary if applicable
		if (ns1blankspace.objectExtended)
		{
			$.each(ns1blankspace.report.reports, function() {
				var iObject = this.object;
				var sObjectname = this.objectName;

				$($.grep(ns1blankspace.extend.structure, function (a) {return a.object == iObject;})).each(function(i,v)
				{
					$(v.elements).each(function(j,k)
					{
						var sCaption = (k.caption == "") ? k.title : k.caption;
						if (k.datatype == 2) {	
							ns1blankspace.report.dictionary.push({name: sObjectname + '.se' + k.id + 'text', caption: sCaption});
						}	
						else {
							ns1blankspace.report.dictionary.push({name: sObjectname + '.se' + k.id, caption: sCaption});
						}
					});
				})	
			});

			// v3.1.2 SUP022574 Need to manually push agrilastaudit structure elements if not already added
			if ($.grep(ns1blankspace.extend.structure, function(x) {return x['structureobjectlink.object.prefix'].toLowerCase() === 'agrilastaudit'}).length == 0)
			{
				var oAuditElements = {};
				$.each(ns1blankspace.extend.structure, function(index, structure) 
				{
					if (structure.object == '107')
					{
						$.each(Object.keys(structure), function()
						{
							oAuditElements[this] = structure[this];
						});
					}
				});
				oAuditElements['structureobjectlink.object.prefix'] = 'agrilastaudit';
				oAuditElements.objecttext = 'Audit';
				ns1blankspace.extend.structure.push(oAuditElements);
			}
		}

		// Now add other fields to reports above as defined in control file
		if (ns1blankspace.data.control && ns1blankspace.data.control.report && ns1blankspace.data.control.report.dictionary)
		{
			$.each(ns1blankspace.data.control.report.dictionary, function()
			{
				ns1blankspace.report.dictionary.push({name: this.name, caption: this.caption});
			});
		}

		nsFreshcare.admin.report.filterReportList(oParam);
	},

	initUnsentCertificatesReport: function(oParam)
	{
		// v3.1.2 Added Audit Type & ReCertificationAuditDue  removed 'option's as wasn't coded
		// v3.1.206 SUP023035 Now looks at Bus Mailing address and primary contact of business for email address
		if ($.grep(ns1blankspace.report.reports, function(x) {return x.name === 'Unsent Mailed Certificates'}).length === 0)
		{
			ns1blankspace.report.reports.push(
				{
					name: "Unsent Mailed Certificates",
					object:  nsFreshcare.objectCertificate,
					objectName: "certificate",
					group: (oParam && oParam.group) ? oParam.group : 1,
					method: "AGRI_CERTIFICATE_SEARCH",
					returnParameters: 'agricertificate' +
									 ',agricertificate.audit' +
									 ',agricertificate.subscription' +
									 ',agricertificate.subscription.contactbusiness' +
									 ',agricertificate.subscription.contactbusiness.contactperson' +
									 ',agricertificate.audit.action',
					functionSearch: nsFreshcare.admin.audit.search.send,
					summary: 'Certificate Details for Mail Merging',
					showSort: false,
					idColumn: "agricertificate.audit",
					windowOpen: '/#/nsFreshcare-admin.audit/id:',
					scriptOnNewPage: ns1blankspace.report.search.bind,
					removeMultiplesAt: 'agricertificate.audit',
					customExportFormat:
					{
						headers:
						{
							captionsAsHeaders: true,
							delimiter: ',',
							surroundWith: '"'
						},
						items:
						{
							delimiter: ',',
							surroundWith: '"'
						}
					},
					customExportFormat: {name: "Unsent Mailed Certificates"},
					fixedParameters:
					{
						fields:
						[
							{
								name: "agricertificate.audit.action.description",
								hidden: true
							},
							{
								name: "agricertificate.subscription.contactbusinesstext",
								hidden: true
							},
							{
								name: "agricertificate.audit.action.description.growerBusinessName", 
								exportHeader: "Grower Legal Name", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'growerBusinessName'}
							},
							{
								name: "agricertificate.audit.action.description.growerTradeName", 
								exportHeader: "Grower Trading Name", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'growerTradeName'}
							},
							{
								name: "agricertificate.audit.action.description.codeOfPractice", 
								exportHeader: "Code of Practice", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'codeOfPractice'}
							},
							{
								name: "agricertificate.audit.action.description.certificateNumber", 
								exportHeader: "Certificate Number", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'certificateNumber'}
							},
							{		/* v2.0.3g SUP021399 Freshcare want the Audit Reference exported here, not the certificate version */
								name: "agricertificate.audit.action.description.auditReference", 
								exportHeader: "Version Number", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'auditReference'}
							},
							{
								name: "agricertificate.audit.action.description.auditType", 
								exportHeader: "Audit Type", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'auditTypeText'}
							},
							{
								name: "agricertificate.audit.action.description.sites", 
								exportHeader: "Sites", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'sites'}
							},
							{
								name: "agricertificate.audit.action.description.crops", 
								exportHeader: "Crops", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'crops'}
							},
							{
								name: "agricertificate.audit.action.description.certificateScope", 
								exportHeader: "Certificate Scope", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'certificateScope'}
							},
							{
								name: "agricertificate.audit.action.description.category", 
								exportHeader: "Category", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'category'}
							},
							{
								name: "agricertificate.audit.action.description.auditDate", 
								exportHeader: "Audit Date", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'auditDate'}
							},
							{
								name: "agricertificate.audit.action.description.certificationAchieved", 
								exportHeader: "Certification Achieved", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'certificationAchieved'}
							},
							{
								name: "agricertificate.audit.action.description.certificateExpiry", 
								exportHeader: "Certificate Expiry", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'certificateExpiry'}
							},
							{
								name: "agricertificate.audit.action.description.reCertificationDate", 
								exportHeader: "Re-certification Date", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'reCertificationDate'}
							},
							{
								name: "agricertificate.audit.action.description.reCertificationDue", 
								exportHeader: "Re-certification Due", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'reCertificationDue'}
							},
							{
								name: "agricertificate.audit.action.description.jasanzAccredited", 
								exportHeader: "JASANZ Accredited", 
								headerOnly: true,
								processFunction: nsFreshcare.admin.certificate.report.extractCertificateData,
								processParameter: {name: 'jasanzAccredited'}
							}
						],
						filters:
						[
							{
								includeEval: nsFreshcare.admin.report.roleFilter,
								name: "agricertificate.audit.auditbusiness",
								comparison: "EQUAL_TO",
								value1: ns1blankspace.user.contactBusiness,
								value2: "",
							},
							{
								name: "agricertificate.sent",
								comparison: "EQUAL_TO",
								value1: 'N',
								value2: ""
							},
							{
								name: "agricertificate.audit.action.description",
								comparison: 'IS_NOT_NULL',
								value1: '',
								value2: ''
							},
							{	// v3.1.203 SUP022991 Re-instated unsentCertificateOptions below 
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'certificateidoption'},
								name: "agricertificate.id",
								comparison: "EQUAL_TO",
								value1: ns1blankspace.report.data.certificateid,
								value2: ""
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: 'agricertificate.subscription.contactbusiness.contactperson.*'},
								name: "agricertificate.subscription.contactbusiness.contactperson.id",
								comparison: "EQUAL_TO",
								value1: 'field:agricertificate.subscription.contactbusiness.primarycontactperson',
								value2: "",
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'noemailoption'},
								name: "agricertificate.subscription.contactbusiness.contactperson.id",
								comparison: "EQUAL_TO",
								value1: 'field:agricertificate.subscription.contactbusiness.primarycontactperson',
								value2: "",
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'noemailoption'},
								bracketBefore: '(',
								name: "agricertificate.subscription.contactbusiness.contactperson.email",
								comparison: "IS_NULL",
								value1: '',
								value2: "",
								operatorAfter: 'or'
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'noemailoption'},
								name: "agricertificate.subscription.contactbusiness.contactperson.email",
								comparison: "TEXT_IS_NOT_LIKE",
								value1: '@',
								value2: "",
								operatorAfter: 'or'
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'noemailoption'},
								name: "agricertificate.subscription.contactbusiness.contactperson.email",
								comparison: "TEXT_IS_NOT_LIKE",
								value1: '.',
								value2: "",
								bracketAfter: ')'
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'printoption'},
								name: "agricertificate.subscription.contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId + "text",
								comparison: "EQUAL_TO",
								value1: 'Yes',
								value2: "",
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'printoption'},
								name: "agricertificate.subscription.contactbusiness.contactperson.email",
								comparison: "IS_NOT_NULL",
								value1: '',
								value2: "",
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'printoption'},
								name: "agricertificate.subscription.contactbusiness.contactperson.email",
								comparison: "TEXT_IS_LIKE",
								value1: '@',
								value2: "",
							},
							{
								includeEval: nsFreshcare.admin.report.includeUnsentCertificateOptions,
								includeParameters: {name: 'printoption'},
								name: "agricertificate.subscription.contactbusiness.contactperson.email",
								comparison: "TEXT_IS_LIKE",
								value1: '.',
								value2: "",
							},
							{
								name: "agricertificate.audit.action.actiontype",
								comparison: "EQUAL_TO",
								value1: nsFreshcare.data.actionTypeCertificate,
								value2: "",
								value3: '',
								applyToSubSearch: 'Y'
							}
						],
						sort:
						[	/* 2.0.3g SUP021370 Added membershiptext search back in */
							{name: 'agricertificate.subscription.contactbusinesstext', direction: 'asc'},
							{name: 'agricertificate.subscription.membershiptext', direction: 'asc'},
							{name: 'agricertificate.audit.action.createddate', direction: 'desc'}
						]
					},
					selectableParameters:
					{
						fields:
						[
							{name: "agricertificate.subscription.contactbusinesstext"},
							{name: "agricertificate.subscription.contactbusiness.contactperson.firstname"},
							{name: "agricertificate.subscription.contactbusiness.contactperson.surname"},
							{name: "agricertificate.subscription.contactbusiness.mailingaddresscombined"},
							{name: "agricertificate.subscription.contactbusiness.mailingsuburb"},
							{name: "agricertificate.subscription.contactbusiness.mailingstate"},
							{name: "agricertificate.subscription.contactbusiness.mailingpostcode"},
							{name: "agricertificate.subscription.contactbusiness.mailingcountry"},
							{name: "agricertificate.subscription.contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId + "text"},
							{name: "agricertificate.modifieddate"}
						]
					}
				}
			);
		
			ns1blankspace.report.dictionary.push
			(
				{name: "agricertificate.subscription.contactbusinesstext", caption: "Grower Business Name"},
				{name: "agricertificate.subscription.contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId + "text", caption: 'Opting to Print'},
				{name: "agricertificate.subscription.contactbusiness.contactperson.firstname", caption: 'Grower Contact First Name'},
				{name: "agricertificate.subscription.contactbusiness.contactperson.surname", caption: 'Grower Contact Surname'},
				{name: "agricertificate.subscription.contactbusiness.mailingaddresscombined", caption: 'Mailing Address'},
				{name: "agricertificate.subscription.contactbusiness.mailingsuburb", caption: 'Mailing State'},
				{name: "agricertificate.subscription.contactbusiness.mailingstate", caption: 'Mailing Suburb'},
				{name: "agricertificate.subscription.contactbusiness.mailingpostcode", caption: 'Mailing Post Code'},
				{name: "agricertificate.subscription.contactbusiness.mailingcountry", caption: 'Mailing Country'},
				{name: "agricertificate.audit.action.description", caption: 'Certificate Data'},
				{name: "agricertificate.audit.action.description.certificateNumber", caption: 'Certificate Number'},
				{name: "agricertificate.audit.action.description.certificateExpiry", caption: 'Certificate Expiry'},
				{name: "agricertificate.audit.action.description.growerBusinessName", caption: 'Grower Business Name'},
				{name: "agricertificate.audit.action.description.growerTradeName", caption: 'Grower Trading Name'},
				{name: "agricertificate.audit.action.description.auditType", caption: 'Audit Type'},
				{name: "agricertificate.audit.action.description.sites", caption: 'Sites'},
				{name: "agricertificate.audit.action.description.crops", caption: 'Crops'},
				{name: "agricertificate.audit.action.description.jasanzAccredited", caption: 'JASANZ Certificate?'},
				{name: "agricertificate.audit.action.description.codeOfPractice", caption: 'Code of Practice'},
				{name: "agricertificate.audit.action.description.auditDate", caption: 'Audit Date'},
				{name: "agricertificate.audit.action.description.certificationAchieved", caption: 'Certification Achieved'},
				{name: "agricertificate.audit.action.description.reCertificationDate", caption: 'Re-certification Date'},
				{name: "agricertificate.audit.action.description.reCertificationDue", caption: 'Re-certification Due'},
				{name: "agricertificate.audit.action.description.certificateScope", caption: 'Certificate Scope'},
				{name: "agricertificate.audit.action.description.category", caption: 'Category'},
				{name: "agricertificate.audit.action.description.versionNumber", caption: 'Certificate Version'},
				{name: "agricertificate.audit.action.description.auditReference", caption: 'Version Number'},
				{name: "agricertificate.modifieddate", caption: 'Last Modified'}
			);
			
			// v3.0.2b SUP022110 Added here so we have the format already initiated
			nsFreshcare.admin.setup.exports();
		}
	},

	filterReportList: function(oParam)
	{

		var bAll = true;

		if (oParam != undefined)
		{
			if (oParam.all != undefined) {bAll = oParam.all}
		}
				
		if (!bAll)
		{
			var sMethod = ns1blankspace.objectMethod;;
			var sParentNamespace = ns1blankspace.objectParentName;
			var sNamespace = ns1blankspace.objectName;

			if (sMethod == undefined)
			{	
				if (sParentNamespace)
				{
					var sMethod = (sParentNamespace).toUpperCase() + '_' + (sNamespace).toUpperCase();
				}
				else
				{
					var sMethod = (sNamespace).toUpperCase();
				}
			}
				
			if (sMethod)
			{
				sMethod += '_SEARCH';

				ns1blankspace.report.reports = $.grep(ns1blankspace.report.reports, function (a) {return a.method == sMethod})
			}	
		}	
	},

	includeUnsentCertificateOptions: function(oParam)
	{
		var sName;
		var bReturn = false;

		if (oParam)
		{
			if (oParam.name) {sName = oParam.name}
		}
		
		if (sName)
		{
			if (ns1blankspace.report.data[sName] === 'Yes')
			{bReturn = true;}
		}

		return bReturn;
	},

	trainingCourseAttendeeCount: function(oParam)
	{
		var oRow;

		if (oParam)
		{
			if (oParam.row) {oRow = oParam.row}
		}

		if (oRow != undefined && oParam.response === undefined)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
			oSearch.addField('traineecontactbusiness');
			oSearch.addSummaryField('count(*) attendeecount');
			oSearch.addFilter('course', 'EQUAL_TO', iCourse);
			oSearch.rows = 1;
			oSearch.getResults(function(oResponse)
			{
				oParam.response = oResponse;
				nsFreshcare.admin.report.trainingCourseAttendeeCount(oParam);
			});
		}
		else if (oParam.response)
		{
			if (oParam.response.status == 'OK')
			{
				oParam.row.attendeecount = oParam.response.summary.attendeecount;
			}
			else
			{
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
			delete(oParam.response);
		}
	},

	roleFilter: function()
	{
		return (nsFreshcare.user.role.toLowerCase() != 'admin');
	},

	daysBetween: function(oRow, oParam)
	{
		var dDate1;
		var dDate2;
		var iReturn = '';		// return this if any errors

		if (oParam)
		{
			if (oParam.date1) {dDate1 = oParam.date1}
			if (oParam.date2) {dDate2 = oParam.date2}
		}

		if (oRow)
		{
			if (oParam)
			{
				if (oParam.date1)
				{
					dDate1 = oRow[oParam.date1];
					dDate2 = oRow[oParam.date2];

					if (dDate1 != undefined && dDate1 != '')
					{
						dDate1 = new Date(new Date(dDate1).toString('dd MMM yyyy'));

						if (dDate2 != undefined && dDate2 != '')
						{
							dDate2 = new Date(new Date(dDate2).toString('dd MMM yyyy'));
						}
						// v3.1.207 SUP023068 Was returning milliseconds!
						iReturn = parseInt((dDate2 - dDate1)/86400000);
					}
				}
			}
		}
		return iReturn.toString();
	},

	newPage:
	{
		fsqReport: function(oParam)
		{
			// We have to get most recent training course and the most recent audit for the current contactbusiness + membership
			// 
			// contactbusiness.id (id) and contactbusiness.agrisubscription.membership are fixedparameters so always there
			// We can determine the current page number using $('.ns1blankspaceRenderHeaderPageSelected').first().html()
			// We can determine which rows have been displayed by checking for ns1blankspace.report.data.resultRows.page

			var iPage;
			var aIDList;
			var oPageRows;
			var iResponseRows = ((ns1blankspace.report.config.rowsPerPage && ns1blankspace.report.config.rowsPerPage > 0) 
								? ns1blankspace.report.config.rowsPerPage 
								: ns1blankspace.option.defaultRows);

			if (oParam)
			{
				if (oParam.fsqReportStep === undefined) {oParam.fsqReportStep = 1}
				if (oParam.idList) {aIDList = oParam.idList}
				if (oParam.page != undefined) {iPage = oParam.page}
			}
			else {oParam = {fsqReportStep: 1}}

			if (iPage === undefined) {iPage = Number($('.ns1blankspaceRenderHeaderPageSelected').first().html())}
			if (ns1blankspace.report.data.exporting === true && oParam.rows) {iResponseRows = oParam.rows}

			oPageRows = $.grep(ns1blankspace.report.data.resultRows, function(x) {return x.page === iPage});

			// Get a unique list of the contactbusiness & membership
			if (aIDList === undefined)
			{
				ns1blankspace.status.working('Finding Training Courses & Audits');

				aIDList = [];
				$.each(oPageRows, function(i, r)
				{
					if ($.grep(aIDList, function(x) {return x.contactBusiness == r['agrisubscription.contactbusiness.id'] && x.membership === r['agrisubscription.membership.id']}).length === 0)
					{
						aIDList.push({contactBusiness: r['agrisubscription.contactbusiness.id'], membership: r['agrisubscription.membership.id']});
					}
				});
				oParam.idList = aIDList;
			}

			// First get most recent training courses
			if (oParam.fsqReportStep === 1)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
				oSearch.addField('agritrainingcourseattendee.course.package.codeofpracticetext,agritrainingcourseattendee.course.coursedate,agritrainingcourseattendee.course.package.membership,' +
								'agritrainingcourseattendee.course.trainercontactbusinesstext,agritrainingcourseattendee.course.trainercontactbusiness,' +
								'traineecontactbusiness,agritrainingcourseattendee.course.package.membership');
				$.each(aIDList, function(index)
				{
					oSearch.addBracket('(');
					oSearch.addFilter('traineecontactbusiness', 'EQUAL_TO', this.contactBusiness);
					oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.membership', 'EQUAL_TO', 'field:agritrainingcourseattendee.course.package.membership');
					oSearch.addFilter('agritrainingcourseattendee.course.package.membership', 'EQUAL_TO', this.membership);
					oSearch.addBracket(')');
					if ((index + 1) < aIDList.length)
					{
						oSearch.addOperator('or');
					}
				});
				oSearch.sort('traineecontactbusiness', 'asc')
				oSearch.sort('agritrainingcourseattendee.course.package.membership', 'asc');
				oSearch.sort('agritrainingcourseattendee.course.coursedate', 'desc');
				
				oSearch.rows = 10 * iResponseRows;
				
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						// Loop through results and add values to ns1blankspace.report.data.resultRows
						// We want only the first record for each traineecontactbusiness & course.package.membership
						var iLastBusiness = '';
						var iLastMembership = '';
						var oUpdateRows = [];
						$.each(oResponse.data.rows, function()
						{
							if (this.traineecontactbusiness + this['agritrainingcourseattendee.course.package.membership'] != iLastBusiness + iLastMembership)
							{
								oUpdateRows.push({contactBusiness: this.traineecontactbusiness, 
												  membership: this['agritrainingcourseattendee.course.package.membership'], 
												  trainingcodeofpracticetext: this['agritrainingcourseattendee.course.package.codeofpracticetext'],
												  trainingtrainercontactbusinesstext: this['agritrainingcourseattendee.course.trainercontactbusinesstext']
												});
							}

							iLastBusiness = this.traineecontactbusiness;
							iLastMembership = this['agritrainingcourseattendee.course.package.membership'];
						});
						
						// Now loop through oUpdateRows, find the corresponding value in ns1blankspace.report.data.resultRows and update it
						$.each(oUpdateRows, function(i, b)
						{
							ns1blankspace.report.data.resultRows = $.map(ns1blankspace.report.data.resultRows, function(x)
																		{
																			var oReturn = x;
																			if (b.contactBusiness === x['agrisubscription.contactbusiness.id'] && b.membership === x['agrisubscription.membership.id'])
																			{	
																				oReturn['agrisubscription.trainingcodeofpracticetext'] = b.trainingcodeofpracticetext
																				oReturn['agrisubscription.trainingtrainercontactbusinesstext'] = b.trainingtrainercontactbusinesstext
																			}
																			return oReturn;
																		});
						});

						oParam.fsqReportStep = 2;
						nsFreshcare.admin.report.newPage.fsqReport(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding training courses: ' + oResponse.error.errornotes);
					}
				});			
			}

			// Now find the most recent audit
			else if (oParam.fsqReportStep === 2)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('contactbusiness,audit.agrisubscription.membership,actualdate,statustext,auditbusinesstext,auditpersontext');
				$.each(aIDList, function(index)
				{
					oSearch.addBracket('(');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', this.contactBusiness);
					oSearch.addFilter('audit.agrisubscription.membership', 'EQUAL_TO', this.membership);
					oSearch.addBracket(')');
					if ((index + 1) < aIDList.length)
					{
						oSearch.addOperator('or');
					}
				});

				oSearch.sort('contactbusiness', 'asc');
				oSearch.sort('audit.agrisubscription.membership', 'asc');
				oSearch.sort('audit.actualdate', 'desc');

				oSearch.rows = 10 * iResponseRows;
				
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						// Loop through results and add values to ns1blankspace.report.data.resultRows
						// We want only the first record for each contactbusiness & agrisubscription.membership
						var iLastBusiness = '';
						var iLastMembership = '';
						var oUpdateRows = [];
						$.each(oResponse.data.rows, function()
						{
							if (this.contactbusiness + this['audit.agrisubscription.membership'] != iLastBusiness + iLastMembership)
							{
								oUpdateRows.push({contactBusiness: this.contactbusiness, 
												  membership: this['audit.agrisubscription.membership'], 
												  auditactualdate: this['actualdate'],
												  auditstatustext: this['statustext'],
												  auditauditbusinesstext: this['auditbusinesstext'],
												  auditauditpersontext: this['auditpersontext']
												});
							}

							iLastBusiness = this.contactbusiness;
							iLastMembership = this['audit.agrisubscription.membership'];
						});
						
						// Now loop through oUpdateRows, find the corresponding value in ns1blankspace.report.data.resultRows and update it
						$.each(oUpdateRows, function(i, b)
						{
							ns1blankspace.report.data.resultRows = $.map(ns1blankspace.report.data.resultRows, function(x)
																		{
																			var oReturn = x;
																			if (b.contactBusiness === x['agrisubscription.contactbusiness.id'] && b.membership === x['agrisubscription.membership.id'])
																			{	
																				oReturn['agrisubscription.auditactualdate'] = b.auditactualdate;
																				oReturn['agrisubscription.auditstatustext'] = b.auditstatustext;
																				oReturn['agrisubscription.auditauditbusinesstext'] = b.auditauditbusinesstext;
																				oReturn['agrisubscription.auditauditpersontext'] = b.auditauditpersontext;
																			}
																			return oReturn;
																		});
						});

						oParam.fsqReportStep = (ns1blankspace.report.data.exporting === true) ? 4 : 3;
						nsFreshcare.admin.report.newPage.fsqReport(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding audits: ' + oResponse.error.errornotes);
					}
				});
			}

			// Call function to add data to UI rows
			else if (oParam.fsqReportStep === 3)
			{
				ns1blankspace.report.newPageShow();
				oParam.fsqReportStep = 4;
				nsFreshcare.admin.report.newPage.fsqReport(oParam);
			}

			// Remove rows from display and resultRows based on custom filter parameters for Training Course / Audit mandatory
			else if (oParam.fsqReportStep === 4)
			{
				// Check if user has requested only rows that have a Training Course
				if (ns1blankspace.report.data.courseMandatory)
				{
					// If so, remove rows where no course was found from resultRows
					if (ns1blankspace.report.data.exporting === true)
					{
						$.each(oPageRows, function(i, r)
						{
							if (r['agrisubscription.trainingcodeofpracticetext'] === '' 
								&& r['agrisubscription.trainingtrainercontactbusinesstext'] === '')
							{
								ns1blankspace.report.data.resultRows = $.grep(ns1blankspace.report.data.resultRows, function(x) {return x.id != r.id});
							}
						});
					}
					// remove rows where no course was found from UI and resultRows
					else
					{

						$.each($('tr.ns1blankspaceRow:visible'), function()
						{
							var iSubscriptionId = $(this).children().first().attr('id').split('_').pop();

							if (($('#agrisubscription_trainingcodeofpracticetext_' + iSubscriptionId).html() + 
								$('#agrisubscription_trainingtrainercontactbusinesstext_' + iSubscriptionId).html()) === '')
							{
								$(this).remove();
								ns1blankspace.report.data.resultRows = $.grep(ns1blankspace.report.data.resultRows, function(x) {return x.id != iSubscriptionId});
							}
						});
					}
				}


				// Check if user has requested only rows that have an Audit
				if (ns1blankspace.report.data.auditMandatory)
				{
					// If so, remove rows where no audit was found from resultRows
					if (ns1blankspace.report.data.exporting === true)
					{
						$.each(ns1blankspace.report.data.resultRows, function(i, r)
						{
							if (this['agrisubscription.auditactualdate'] === ''
								&& this['agrisubscription.auditstatustext'] === ''
								&& this['agrisubscription.auditauditbusinesstext'] === ''
								&& this['agrisubscription_auditauditpersontext'] === '')
							{
								ns1blankspace.report.data.resultRows = $.grep(ns1blankspace.report.data.resultRows, function(x) {return x.id != r.id});
							}
						});
					}
					// remove rows where no audit was found from UI and resultRows
					{

						$.each($('tr.ns1blankspaceRow:visible'), function()
						{
							var iSubscriptionId = $(this).children().first().attr('id').split('_').pop();

							if (($('#agrisubscription_auditactualdate_' + iSubscriptionId).html() + 
								$('#agrisubscription_auditstatustext_' + iSubscriptionId).html() + 
								$('#agrisubscription_auditauditbusinesstext_' + iSubscriptionId).html() + 
								$('#agrisubscription_auditauditpersontext_' + iSubscriptionId).html()) === '')
							{
								$(this).remove();
								ns1blankspace.report.data.resultRows = $.grep(ns1blankspace.report.data.resultRows, function(x) {return x.id != iSubscriptionId});
							}
						});
					}
				}

				oParam.fsqReportStep = 5;
				nsFreshcare.admin.report.newPage.fsqReport(oParam);
			}

			// Processing finished, remove 'working'
			else if (oParam.fsqReportStep === 5)
			{
				ns1blankspace.status.clear();
				delete(oParam.fsqReportStep);
				delete(oParam.idList);
				if (ns1blankspace.report.data.exporting === true)
				{
					ns1blankspace.report["export"](oParam);
				}
			}
		},

		advancedCertification: function (oParam)
		{
			// Finds details of the latest audit as returned from AGRI_SUBSCRIPTION_SEARCH and populates them

			// contactbusiness.id (id) and contactbusiness.agrisubscription.membership are fixedparameters so always there
			// We can determine the current page number using $('.ns1blankspaceRenderHeaderPageSelected').first().html()
			// We can determine which rows have been displayed by checking for ns1blankspace.report.data.resultRows.page

			var iPage;
			var aIDList;
			var oPageRows;

			if (oParam)
			{
				if (oParam.certificationReportStep === undefined) {oParam.certificationReportStep = 1}
				if (oParam.idList) {aIDList = oParam.idList}
				if (oParam.page != undefined) {iPage = oParam.page}
			}
			else {oParam = {certificationReportStep: 1}}

			if (iPage === undefined) {iPage = Number($('.ns1blankspaceRenderHeaderPageSelected').first().html())}

			oPageRows = $.grep(ns1blankspace.report.data.resultRows, function(x) {return x.page === iPage});

			// Get a unique list of the contactbusiness & membership
			if (aIDList === undefined)
			{
				ns1blankspace.status.working('Finding Audits');

				aIDList = [];
				$.each(oPageRows, function(i, r)
				{
					if ($.grep(aIDList, function(x) {return x == r['agrisubscription.lastauditid']}).length === 0 && r['agrisubscription.lastauditid'] != '')
					{
						aIDList.push(r['agrisubscription.lastauditid']);
					}
				});
				oParam.idList = aIDList;
			}

			// Search for audits
			if (oParam.certificationReportStep == 1)
			{
				// First, initialise values in resultrows if not already done. 
				ns1blankspace.report.data.resultRows = $.map(ns1blankspace.report.data.resultRows, function(x)
				{
					x['agrisubscription.audit.actualdate'] = (x['agrisubscription.audit.actualdate'] === undefined) ? '' : x['agrisubscription.audit.actualdate'];
					x['agrisubscription.audit.resultstatusdate'] = (x['agrisubscription.audit.resultstatusdate'] === undefined) ? '' : x['agrisubscription.audit.resultstatusdate'];
					x['agrisubscription.audit.resultstatustext'] = (x['agrisubscription.audit.resultstatustext']) ? '' : x['agrisubscription.audit.resultstatustext'];

					return x;
				});

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('actualdate,resultstatusdate,resultstatustext');
				oSearch.addFilter('id', 'IN_LIST', aIDList.join(','));
				oSearch.rows = 100;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							$.each(ns1blankspace.report.data.resultRows, function(i, r)
							{
								var iIndex = $.grep($.map(oResponse.data.rows, function(x, index) {return {index: index, auditID: x.id}}), 
																			function(y) {return y.auditID === r['agrisubscription.lastauditid']}).shift();

								if (iIndex)
								{
									r['agrisubscription.audit.actualdate'] = oResponse.data.rows[iIndex.index].actualdate;
									r['agrisubscription.audit.resultstatusdate'] = oResponse.data.rows[iIndex.index].resultstatusdate;
									r['agrisubscription.audit.resultstatustext'] = oResponse.data.rows[iIndex.index].resultstatustext;

								}
							});
						}

						ns1blankspace.status.clear();
						delete(oParam.idList);
						nsFreshcare.admin.report.newPage.advancedCertification(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding Audits: ' + oResponse.error.errornotes);
					}
				});
			}

			// Call next step
			else if (oParam.certificationReportStep === 2)
			{
				delete(oParam.certificationReportStep);
				// Add new data to UI / export
				if (ns1blankspace.report.data.exporting === true)
				{
					ns1blankspace.report["export"](oParam);
				}
				else
				{
					ns1blankspace.report.newPageShow();
				}
			}
		}
	},

	subscriptionPerformanceSummary:
	{
		data: 
		{
			options:
			[
				{id: '1', label: 'State', 'default': true, column: 'agrisubscription.contactbusiness.addresslink.address.addressstate'},
				{id: '2', label: 'Trainer', column: 'agritrainingcourseattendee.course.trainercontactbusinesstext'},
				{id: '3', label: 'Certification Body', column: 'audit.auditbusinesstext'}
			]
		},

		filters: function(oParam)
		{
			// Allow user to choose between State, Trainer and Auditor
			var aHTML = [];
			var aRadioHTML = [];
			var aOptions = nsFreshcare.admin.report.subscriptionPerformanceSummary.data.options;

			aHTML.push('<tr>');
			aHTML.push('<td style="width:200px; color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:middle;" colspan="2"' +
							' id="ns1blankspaceReport_caption_audititemtype_itemtypetext_groupby" class="ns1blankspaceReport">' +
							'Group By' +
						'</td>');
			
			aHTML.push('<td style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:middle;"' +
								' class="ns1blankspaceReport">' +
							'</td>');

			aHTML.push('<td style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:middle;"' +
								' id="ns1blankspaceReport_input_audititemtype_itemtypetext_groupby_text"' +
								' class="ns1blankspaceReport">');
			
			//Add each option as a radio
			$.each(aOptions, function()
			{
				aRadioHTML.push('<input type="radio" id="radioGroupBy' + this.id + '"' +
								' name="radioGroupBy"' +
								' value="' + this.id + '"' +
								(this['default'] == true ? ' checked="checked"' : '') +
								'>' + this.label);
			});
			
			aHTML.push(aRadioHTML.join('<br />') + '</td>');

			aHTML.push('</tr>');


			return aHTML.join('');
		},

		search: function(oParam, oResponse)
		{
			var dEnd;
			var iOption = $('input[name="radioGroupBy"]:checked').val();
			var oButtons = 
			[
				{
					text: "Yes", icons: {primary: 'ui-icon-check'}, 
					click: function() 
					{
						$(this).dialog('destroy');
						oParam.reportSearchStep = 1;
						nsFreshcare.admin.report.subscriptionPerformanceSummary.search(oParam);
					}
				},
				{
					text: "No", icons: {primary: 'ui-icon-check'}, 
					click: function() {$(this).dialog('destroy')}
				}
			];

			if (oParam.reportSearchStep === undefined) 
			{
				if (iOption == 2 && 1 == 0)
				{	ns1blankspace.container.confirm({title: 'Warning!', html: 'The Trainer report takes a while to run. Are you sure you want to continue?', buttons: oButtons})}
				else
				{ 	oParam.reportSearchStep = 1}
			}

			// Search for subscriptions and group if possible
			if (oParam.reportSearchStep === 1)
			{
				if (oResponse === undefined)
				{
					ns1blankspace.report.search.checkCustomFilters(oParam);
					if (ns1blankspace.okToSave === true)
					{
						dEnd = new Date(ns1blankspace.report.data.endDate);

						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults = [];
						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.outputData = [];
						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.traineeData = [];
						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData = [];
						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.uniqueTrainees = [];

						ns1blankspace.status.working('Finding subscription records. Rows 1 to 1000...');

						var oSearch = new AdvancedSearch();

						switch (iOption)
						{
							case '1':
								// By State: v3.1.209 Changed this for business-centric
								oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
								oSearch.addField('agrisubscription.contactbusiness.addresslink.address.addressstate,count(agrisubscription.contactbusiness.addresslink.address.addressstate) GroupCount');
								oSearch.addFilter('agrisubscription.contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');		// We only want the primary address
								oSearch.addFilter('agrisubscription.contactbusiness.id', 'IS_NOT_NULL');
								oSearch.addFilter('startdate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 00:00:00');
								oSearch.addBracket('(');
								oSearch.addFilter('enddate', 'GREATER_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 23:59:59');
								oSearch.addOperator('or');
								oSearch.addFilter('enddate', 'IS_NULL');
								oSearch.addBracket(')');
								oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.report.data.membership);
								break;

							case '2':
								// By Trainer
								// v3.1.209 SUP023066 Search for all courseattendees & related trainers before the enddate and group by Trainer & Subscription
								oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
								oSearch.addField('agritrainingcourseattendee.course.trainercontactbusinesstext' +
												',agritrainingcourseattendee.traineecontactbusiness.agrisubscription.id,count(*) GroupCount');
								oSearch.addFilter('agritrainingcourseattendee.course.package.membership', 'EQUAL_TO', 
													'field:agritrainingcourseattendee.traineecontactbusiness.agrisubscription.membership');		//, '', '', 'Y'
								oSearch.addFilter('agritrainingcourseattendee.course.package.membership', 'EQUAL_TO', ns1blankspace.report.data.membership);
								oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.membership', 'EQUAL_TO', ns1blankspace.report.data.membership);
								oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.contactbusiness.id', 'IS_NOT_NULL');
								oSearch.addFilter('agritrainingcourseattendee.course.coursedate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy'));
								oSearch.addFilter("agritrainingcourseattendee.traineecontactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipTrainer);
								oSearch.addFilter("agritrainingcourseattendee.traineecontactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dEnd.toString("dd MMM yyyy"));
								oSearch.addBracket("(");
								oSearch.addFilter("agritrainingcourseattendee.traineecontactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dEnd.toString("dd MMM yyyy"));
								oSearch.addOperator("or");
								oSearch.addFilter("agritrainingcourseattendee.traineecontactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
								oSearch.addBracket(")");
								oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.startdate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 00:00:00');
								oSearch.addBracket('(');
								oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.enddate', 'GREATER_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 23:59:59');
								oSearch.addOperator('or');
								oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.enddate', 'IS_NULL');
								oSearch.addBracket(')');
								oSearch.sort('agritrainingcourseattendee.course.trainercontactbusiness', 'asc');
								oSearch.sort('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.id', 'asc');
								break;

							case '3':
								// By CB
								// v3.1.209 Search for all audits & related auditors before enddate and group by Auditor and Subscription
								oSearch.method = 'AUDIT_SEARCH';
								oSearch.addField('audit.auditbusinesstext,audit.subscription,count(id) GroupCount');
								oSearch.addFilter('actualdate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy'));
								oSearch.addFilter("audit.agrisubscription.contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
								oSearch.addFilter("audit.agrisubscription.contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dEnd.toString("dd MMM yyyy"));
								oSearch.addBracket("(");
								oSearch.addFilter("audit.agrisubscription.contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dEnd.toString("dd MMM yyyy"));
								oSearch.addOperator("or");
								oSearch.addFilter("audit.agrisubscription.contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
								oSearch.addBracket(")");
								oSearch.addFilter('audit.agrisubscription.contactbusiness.relationshipotherbusiness.contactbusiness',
												'EQUAL_TO', 'field:auditbusiness');
								oSearch.addFilter('audit.agrisubscription.startdate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 00:00:00');
								oSearch.addBracket('(');
								oSearch.addFilter('audit.agrisubscription.enddate', 'GREATER_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 23:59:59');
								oSearch.addOperator('or');
								oSearch.addFilter('audit.agrisubscription.enddate', 'IS_NULL');
								oSearch.addBracket(')');
								oSearch.addFilter('audit.agrisubscription.membership', 'EQUAL_TO', ns1blankspace.report.data.membership);
								oSearch.addFilter('audit.agrisubscription.contactbusiness.id', 'IS_NOT_NULL');
								oSearch.sort('audit.auditbusiness', 'asc');
								oSearch.sort('audit.subscription', 'asc');
								break;

							default:
								oSearch.addField('id');
						}

						oSearch.addSummaryField('count(*) countall');
						oSearch.rows = 1000;
						oSearch.getResults(function(oResponse)
						{
							nsFreshcare.admin.report.subscriptionPerformanceSummary.search(oParam, oResponse);
						});
					}
				}
				else
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.report.data.moreID = oResponse.moreid;		// v3.1.1 SUP022435 Was erroring as this value not set on export
						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults = 
							nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults.concat(oResponse.data.rows);
						// $.each(oResponse.data.rows, function() {nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults.push(this)});

						if (oResponse.morerows === 'true')
						{
							if (oParam.countAll === undefined) {oParam.countAll = oResponse.summary.countall}
							var iStartRow = parseInt(oResponse.startrow) + parseInt(oResponse.rows);
							var iRows = (parseInt(oParam.countAll) >= iStartRow + parseInt(oResponse.rows)) 
										? oResponse.rows 
										: parseInt(oParam.countAll) - iStartRow;
							ns1blankspace.status.working('Finding subscription records. Rows ' + iStartRow + ' to ' + (iStartRow + parseInt(oResponse.rows)) + ' ...');
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
								data: 'id=' + oResponse.moreid + '&rows=' + iRows + '&startrow=' + iStartRow,
								success: function(oResponse)
								{
									nsFreshcare.admin.report.subscriptionPerformanceSummary.search(oParam, oResponse);
								}
							});
						}
						else
						{
							oParam.reportSearchStep = (iOption != '1') ? 2 : 10;
							delete(oParam.countAll);
							nsFreshcare.admin.report.subscriptionPerformanceSummary.search(oParam);
						}	
					}
					else
					{
						ns1blankspace.status.error('Error finding subscriptions: ' + oResponse.error.errornotes);
					}
				}
			}	

			// v3.1.209 SUP023066 Changed the way trainer/certbody report gets results
			else if (oParam.reportSearchStep === 2)
			{
				// Use searchResults and do a count of how many rows per Trainer/AuditBusiness - we don't use the 'groupCount' as this counts each
				// individual attendee/audit, not the subscription
				var sBusinessField = (iOption == '2') ? 'agritrainingcourseattendee.course.trainercontactbusinesstext' : 'audit.auditbusinesstext';
				var aReportOutput = [];
				
				$.each(nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults, function(i, resultRow)
				{
					oBusinessRow = $.grep(aReportOutput, function(x) {return x[sBusinessField] == resultRow[sBusinessField]}).shift();

					if (oBusinessRow)
					{
						aReportOutput[oBusinessRow.index].groupcount += 1;
					}
					else
					{
						var oData = {groupcount: 1, index: aReportOutput.length};
						oData[sBusinessField] = resultRow[sBusinessField];
						aReportOutput.push(oData);
					}
				});

				aReportOutput.sort(ns1blankspace.util.sortBy(sBusinessField));
				nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData = aReportOutput;
				oParam.reportSearchStep = 10;
				nsFreshcare.admin.report.subscriptionPerformanceSummary.search(oParam);
			}

			// Let's process the data now.
			else if (oParam.reportSearchStep === 10)
			{
				delete(oParam.resultIndex);
				delete(oParam.reportSearchStep);
				// In the case where the data was grouped on the first call, we need to put this into outputData as this is what's processed
				if (nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData == undefined || nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData.length === 0)
				{
					nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData = [];
					$.each(nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults, function()
					{
						nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData.push(this);
					});
				}
				nsFreshcare.admin.report.subscriptionPerformanceSummary.process(oParam);
			}
		},

		process: function(oParam)
		{
			// The processing step puts the data into summaryData and then updates parameters for output to report
			var iOption = $('input[name="radioGroupBy"]:checked').val();
			var oOption = nsFreshcare.admin.report.subscriptionPerformanceSummary.data.options[parseInt(iOption) - 1];
			var aResultRows = [];			// Rows of objects and the itemtypes they have
			var oResponse = {};				// Used to create dummy response to pass to ns1blankspace.report.search.show
			var iTotal = 0;
			var sColumn = oOption.column

			ns1blankspace.status.working('Processing data...');

			$.each(nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData, function()
			{
				aResultRows.push({groupcount: this.groupcount.toString()});
				aResultRows[aResultRows.length - 1][sColumn] = this[oOption.column];
				iTotal += parseInt(this.groupcount);
			});

			aResultRows.push({groupcount: iTotal.toString() });
			aResultRows[aResultRows.length - 1][sColumn] = 'Total (' + aResultRows.length + ' rows)';
			//ns1blankspace.report.data.moreID = (ns1blankspace.report.data.moreID) ? ns1blankspace.report.data.moreID : oResponse.moreid;

			oResponse.status = 'OK';
			oResponse.morerows = 'false';
			oResponse.moreid = "";
			oResponse.summary = {count: aResultRows.length.toString()}
			oResponse.data = {rows: aResultRows};

			// Now set parameter values so that report will display and export using standard functions
			ns1blankspace.report.data.outputParameters = [];
			ns1blankspace.report.data.outputParameters.push({name: oOption.column, caption: oOption.label});
			ns1blankspace.report.data.outputParameters.push({name: 'groupcount', caption: 'Subscriptions'});

			ns1blankspace.report.data.containsContactPerson = false;
			ns1blankspace.report.data.fullDataSet = true;
			ns1blankspace.report.data.resultRows = [];		

			nsFreshcare.admin.report.subscriptionPerformanceSummary.data.summaryData = [];
			//nsFreshcare.admin.report.subscriptionPerformanceSummary.data.outputData = [];
			//nsFreshcare.admin.report.subscriptionPerformanceSummary.data.searchResults = [];
			delete(oParam.monthsToSearch);

			$('#ns1blankspaceReportSearch').hide();
			ns1blankspace.status.clear();
			ns1blankspace.report.search.show(oParam, oResponse);
		}
	},

	subscriptionPerformance:
	{
		data: {},

		filters: function(oParam)
		{
			// We need to construct the membership filters - multi select so cehck boxes
			var aHTML = [];
			var aRadioHTML = [];

			aHTML.push('<tr>');
			aHTML.push('<td style="width:200px; color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:middle;" colspan="2"' +
							' id="ns1blankspaceReport_caption_audititemtype_itemtypetext_groupby" class="ns1blankspaceReport">' +
							'Membership' +
						'</td>');
			
			aHTML.push('<td style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:middle;"' +
								' class="ns1blankspaceReport">Is in list' +
							'</td>');

			aHTML.push('<td style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:middle;"' +
								' id="ns1blankspaceReport_input_membership_text"' +
								' class="ns1blankspaceReport">');
			
			//Multiselect
			aHTML.push('<input id="ns1blankspaceReport_input_membership_text_1"' +
							' class="ns1blankspaceSelect"' + 
							' data-method="AGRI_MEMBERSHIP_SEARCH"' +
							' data-methodFilter="title-TEXT_IS_LIKE|code-TEXT_IS_LIKE|status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive + '"' +
							' data-multiselect="true"' +
							' data-mandatory="1" data-caption="Membership"' +
							'></td>');
			
			aHTML.push('</tr>');


			return aHTML.join('');

		},

		search: function(oParam, oResponse)
		{
			var dStart;
			var dEnd;
			var dCalculate;

			if (oParam.reportSearchStep === undefined) {oParam.reportSearchStep = 1}

			// Search for latest tostatus for each month
			if (oParam.reportSearchStep === 1)
			{
				// Work out the months we need to search through
				if (oParam.monthsToSearch === undefined)
				{
					ns1blankspace.okToSave = true;
					ns1blankspace.report.search.checkCustomFilters(oParam);
					// Now get values for Membership
					if (ns1blankspace.okToSave)
					{
						ns1blankspace.report.data.membership = $.map($('#ns1blankspaceReport_input_membership_text_1_SelectRows .ns1blankspaceMultiSelect'), function(x)
						{
							return x.id.split('-').pop();
						}).join(',');

						if (ns1blankspace.report.data.membership === undefined) 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.error('You must choose a Membership');
						}
					}

					dStart = new Date(ns1blankspace.report.data.startDate);
					dEnd = new Date(ns1blankspace.report.data.endDate);
					dCalculate = nsFreshcare.util.startMonth(dStart);

					nsFreshcare.admin.report.subscriptionPerformance.data.monthData = {};
					oParam.monthsToSearch = [];
					while (dCalculate <= dEnd)
					{
						nsFreshcare.admin.report.subscriptionPerformance.data.monthData["month" + dCalculate.getFullYear() + '-' + dCalculate.getMonth()] = [];
						oParam.monthsToSearch.push({month: dCalculate.getMonth(), year: dCalculate.getFullYear()});
						dCalculate = new Date(dCalculate.setMonth(dCalculate.getMonth() + 1));
					}
				}
				else
				{
					dStart = new Date(ns1blankspace.report.data.startDate);
					dEnd = new Date(ns1blankspace.report.data.endDate);
				}

				if (ns1blankspace.okToSave === true)
				{

					if (oParam.monthIndex === undefined) {oParam.monthIndex = 0}

					if (oParam.monthIndex < Object.keys(oParam.monthsToSearch).length)
					{
						var aMonths = oParam.monthsToSearch;
						var sThisMonthReference = "month" + aMonths[oParam.monthIndex].year + '-' + aMonths[oParam.monthIndex].month;
						var dMonthStart = new Date(aMonths[oParam.monthIndex].year, aMonths[oParam.monthIndex].month, "01");

						var dMonthEnd = nsFreshcare.util.endMonth(new Date(dMonthStart.toString('dd MMM yyyy')));

						ns1blankspace.status.working('Finding membership transaction records for ' + dMonthStart.toString('MMM yyyy') + '...');

						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
						oSearch.addField('agrisubscription.agrisubscriptionstatuschange.tostatus,count(agrisubscription.agrisubscriptionstatuschange.tostatus) GroupCount');
						oSearch.addCustomOption('statuschange', ',' + dMonthEnd.toString('dd MMM yyyy') + ' 23:59:59,');
						//oSearch.addFilter('agrisubscription.contactbusiness.id', 'IS_NOT_NULL');
						oSearch.addBracket('(');
						oSearch.addFilter('enddate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 23:59:59');
						oSearch.addOperator('or');
						oSearch.addFilter('enddate', 'IS_NULL');
						oSearch.addBracket(')');
						oSearch.addSummaryField('count(*) countall');
						oSearch.addFilter('membership', 'IN_LIST', ns1blankspace.report.data.membership)
						oSearch.rows = 100;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								$.each(oResponse.data.rows, function() 
								{nsFreshcare.admin.report.subscriptionPerformance.data.monthData["month" + aMonths[oParam.monthIndex].year + '-' + aMonths[oParam.monthIndex].month].push(this)});

								oParam.monthIndex += 1;
								delete(oParam.countAll);
								nsFreshcare.admin.report.subscriptionPerformance.search(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding transactions: ' + oResponse.error.errornotes);
							}
						});
					}

					// We've done all of the months, let's now go and get the WD and New records
					else
					{
						oParam.reportSearchStep = 2;
						delete(oParam.monthIndex);
						nsFreshcare.admin.report.subscriptionPerformance.search(oParam);	
					}
				}
			}	

			// Let's find the WD and New records for each month
			else if (oParam.reportSearchStep === 2)
			{
				dStart = new Date(ns1blankspace.report.data.startDate);
				dEnd = new Date(ns1blankspace.report.data.endDate);
				var aMonths = oParam.monthsToSearch;

				if (oParam.monthIndex === undefined) 
				{
					oParam.monthIndex = 0; 
					nsFreshcare.admin.report.subscriptionPerformance.data.extraData = {}
					$.each(aMonths, function()
					{
						nsFreshcare.admin.report.subscriptionPerformance.data.extraData["month" + this.year + '-' + this.month] = [];
					});
				}

				if (oParam.monthIndex < Object.keys(aMonths).length)
				{
					var sThisMonthReference = "month" + aMonths[oParam.monthIndex].year + '-' + aMonths[oParam.monthIndex].month;
					var dMonthStart = new Date(aMonths[oParam.monthIndex].year, aMonths[oParam.monthIndex].month, "01");

					var dMonthEnd = nsFreshcare.util.endMonth(new Date(dMonthStart.toString('dd MMM yyyy')));

					ns1blankspace.status.working('Finding New & WD growers for ' + dMonthStart.toString('MMM yyyy') + '...');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
					oSearch.addField('agrisubscription.agrisubscriptionstatuschange.tostatus,count(agrisubscription.agrisubscriptionstatuschange.tostatus) GroupCount');
					oSearch.addCustomOption('statuschange', dMonthStart.toString('dd MMM yyyy') +  ' 00:00:00,' + dMonthEnd.toString('dd MMM yyyy') + ' 23:59:59,');
					oSearch.addFilter('agrisubscription.contactbusiness.id', 'IS_NOT_NULL');
					//oSearch.addBracket('(');
					//oSearch.addFilter('enddate', 'LESS_THAN_OR_EQUAL_TO', dEnd.toString('dd MMM yyyy') + ' 23:59:59');
					//oSearch.addOperator('or');
					//oSearch.addFilter('enddate', 'IS_NULL');
					//oSearch.addBracket(')');
					//oSearch.addFilter('status', 'NOT_EQUAL_TO', nsFreshcare.data.grower.subscriptionStatusWD);
					oSearch.addSummaryField('count(*) countall');
					oSearch.addFilter('membership', 'IN_LIST', ns1blankspace.report.data.membership)
					oSearch.rows = 100;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							$.each(oResponse.data.rows, function() 
							{
								nsFreshcare.admin.report.subscriptionPerformance.data.extraData["month" + 
									aMonths[oParam.monthIndex].year + '-' + aMonths[oParam.monthIndex].month].push(this)
							});

							oParam.monthIndex += 1;
							delete(oParam.countAll);
							nsFreshcare.admin.report.subscriptionPerformance.search(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding New & WD growers: ' + oResponse.error.errornotes);
						}
					});
				}

				// We've done all of the months, let's now go and process the data
				else
				{
					oParam.reportSearchStep = 3;
					delete(oParam.monthIndex);
					nsFreshcare.admin.report.subscriptionPerformance.search(oParam);	
				}

			}

			// All data has been found. Let's process it
			else if (oParam.reportSearchStep === 3)
			{
				delete(oParam.reportSearchStep);
				nsFreshcare.admin.report.subscriptionPerformance.process(oParam);
			}

		},

		process: function(oParam)
		{
			// The processing step does the following:
			// - created aResultRows shell with each subscription status and months array to put counts
			// Loops through each monthData and adds the count of each subscriptionStatus to aResultRows
			// Puts dummy values into parameters so that report canbe displayed 

			ns1blankspace.status.working('Processing data...');

			var aMonthsToSearch = ns1blankspace.util.getParam(oParam, 'monthsToSearch', {'default': []}).value;
			var oResponse = {};				// Used to create dummy response to pass to ns1blankspace.report.search.show
			var aResultRows = [];			// Rows of objects and the itemtypes they have

			$.each(nsFreshcare.data.grower.subscriptionStatus, function(index, subscription)
			{
				var oRow = {id: subscription.id, reference: subscription.reference, title: subscription.title};

				$.each(aMonthsToSearch, function(monthIndex, month)
				{
					var sMonthRef = "month" + month.year + '-' + month.month;
					var aThisSub = $.grep(nsFreshcare.admin.report.subscriptionPerformance.data.monthData[sMonthRef], function(x)
										{
											return x['agrisubscription.agrisubscriptionstatuschange.tostatus'] === subscription.id
										});

					oRow[month.year.toString() + month.month.toString()] = (aThisSub.length > 0) ? parseInt(aThisSub.shift().groupcount) : 0;
				});
				aResultRows.push(oRow);
			});

			// Now we sort resultRows, remove the WD row as we need to add the totals, fillers and new rows in
			aResultRows.sort(ns1blankspace.util.sortBy('reference'));
			var oRowWD = aResultRows.pop();

			// Calculate and insert Total row
			var aMonthsTotal = {id: '', reference: 'TOTAL', title: 'TOTAL Members'};
			$.each(aResultRows, function(index, status)
			{
				// Add the contents of each month to aMonthsTotal
				$.each(aMonthsToSearch, function(monthIndex, month)
				{
					if (aMonthsTotal[month.year.toString() + month.month.toString()] == undefined) {aMonthsTotal[month.year.toString() + month.month.toString()] = 0}
					aMonthsTotal[month.year.toString() + month.month.toString()] += status[month.year.toString() + month.month.toString()];
				});
			});
			aResultRows.push(aMonthsTotal);
			
			// Filler rows
			var aMonthsTotal = {id: '', reference: '', title: ''}
			$.each(aMonthsToSearch, function(monthIndex, month) {aMonthsTotal[month.year.toString() + month.month.toString()] = ''});
			aResultRows.push(aMonthsTotal);
			aResultRows.push(aMonthsTotal);
			
			// Calculate and insert NEW row
			// v3.1.209 SUP023066 changed to growerText. Now uses the sum of the groupcount instead of legth
			var aMonthsTotal = {id: '', reference: 'NEW', title: 'NEW ' + nsFreshcare.data.growerText + 's'};
			$.each(aMonthsToSearch, function(monthIndex, month)
			{
				var sMonthRef = "month" + month.year + '-' + month.month;
				aMonthsTotal[month.year.toString() + month.month.toString()] = nsFreshcare.util.arraySum(
							$.grep(nsFreshcare.admin.report.subscriptionPerformance.data.extraData[sMonthRef], function(x)
													{
														return x['agrisubscription.agrisubscriptionstatuschange.tostatus'] === nsFreshcare.data.grower.subscriptionStatusTI ||
															   x['agrisubscription.agrisubscriptionstatuschange.tostatus'] === nsFreshcare.data.grower.subscriptionStatusRM ||
															   x['agrisubscription.agrisubscriptionstatuschange.tostatus'] === nsFreshcare.data.grower.subscriptionStatusFM;
													}), 'groupcount');
			});
			aResultRows.push(aMonthsTotal);

			// Calculate and insert WD row
			// v3.1.209 SUP023066 Now uses the sum of the groupcount instead of length
			var aMonthsTotal = {id: '', reference: 'WD', title: 'WD Withdrawn from Program'};
			$.each(aMonthsToSearch, function(monthIndex, month)
			{
				var sMonthRef = "month" + month.year + '-' + month.month;
				aMonthsTotal[month.year.toString() + month.month.toString()] = nsFreshcare.util.arraySum(
						$.grep(nsFreshcare.admin.report.subscriptionPerformance.data.extraData[sMonthRef], function(x)
									{
										return x['agrisubscription.agrisubscriptionstatuschange.tostatus'] === nsFreshcare.data.grower.subscriptionStatusWD;
									}), 'groupcount');
			});
			aResultRows.push(aMonthsTotal);
			
			// Calculate and insert  Change row
			var aMonthsTotal = {id: '', reference: '', title: 'Change in Membership'};
			var iNewIndex = 0;
			var iWDIndex = 0;
			$.each(aResultRows, function(index, row) 
			{
				if (row.reference === 'NEW') {iNewIndex = index}
				if (row.reference === 'WD') {iWDIndex = index;}
			});	

			// Calculate the difference between NEW and WD columns for each month
			$.each(aMonthsToSearch, function(monthIndex, month)
			{
				aMonthsTotal[month.year.toString() + month.month.toString()] = aResultRows[iNewIndex][month.year.toString() + month.month.toString()]
										- aResultRows[iWDIndex][month.year.toString() + month.month.toString()];
			});
			aResultRows.push(aMonthsTotal);

			oResponse.status = 'OK';
			oResponse.morerows = 'false';
			oResponse.moreid = '';
			oResponse.summary = {count: aResultRows.length.toString()}
			oResponse.data = {rows: aResultRows};

			// Now set parameter values so that report will display and export using standard functions
			ns1blankspace.report.data.outputParameters = [];
			ns1blankspace.report.data.outputParameters.push({name: 'title', caption: 'Membership Status'});
			$.each(aMonthsToSearch, function(i, x)
			{
				ns1blankspace.report.data.outputParameters.push({name: x.year.toString() + x.month.toString(), caption: (new Date(x.year, x.month, '01')).toString('MMM yyyy')});
			});

			ns1blankspace.report.data.containsContactPerson = false;
			ns1blankspace.report.data.resultRows = [];		
			ns1blankspace.report.data.fullDataSet = true;		//  v3.1.209 SUP023066 Was erroring when export as needs this 

			nsFreshcare.admin.report.subscriptionPerformance.data = {};
			delete(oParam.monthsToSearch);

			$('#ns1blankspaceReportSearch').hide();
			ns1blankspace.status.clear();
			ns1blankspace.report.search.show(oParam, oResponse);
		}
	}
}

// Added v2.0.2 for exporting individual certificates
nsFreshcare.admin.setup = {

	exports: 	function() 
	{
		// v3.1.203 SUP022985 Fields were not aligned correctly
		if ($.grep(ns1blankspace.setup.file["export"].formats, function(x) {return x.name === 'Unsent Mailed Certificates'}).length === 0) 
		{
			ns1blankspace.setup.file["export"].formats.push(
				{
					name: 'Unsent Mailed Certificates',
					header:
					[
						{
							line: 1,
							fields:
							[
								{value: 'Grower Business Name,'},
								{value: 'Grower Trading Name,'},
								{value: 'Code of Practice,'},
								{value: 'Certificate Number,'},
								{value: 'Version Number,'},
								{value: 'Audit Type,'},
								{value: 'Sites,'},
								{value: 'Crops,'},
								{value: 'Certificate Scope,'},
								{value: 'Category,'},
								{value: 'Audit Date,'},
								{value: 'ReCertification Audit Due,'},
								{value: 'Certification Achieved,'},
								{value: 'Certificate Expiry,'},
								{value: 'Re-certification Date,'},
								{value: 'JASANZ Certificate?'}
							]
						}
					],
					item:
					[
						{
							fields:
							[
								{value: '"'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "growerBusinessName"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "growerTradeName"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "codeOfPractice"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "certificateNumber"});
									}
								},
								{value: '","'},
								{		/* v2.0.3g SUP021399 Freshcare want the Audit Reference exported here, not the certificate version */
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "auditReference"});
									}
								},
								{value: '","'},
								{		/* v3.1.202 SUP022978 Was missing from export file */
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "auditTypeText"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "sites"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "crops"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "certificateScope"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "category"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "auditDate"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "reCertificationDue"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "certificationAchieved"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "certificateExpiry"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "reCertificationDate"});
									}
								},
								{value: '","'},
								{
									calculate: function(x) {
										 return nsFreshcare.admin.certificate.report.extractCertificateData(x, {name: "jasanzAccredited"});
									}
								},
								{value: '"'}
							]
						}
					],
					footer:
					[]
				});
		}
	}
}
