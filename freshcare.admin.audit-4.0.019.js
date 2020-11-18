/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

// For JASANZ Accreditation (from v3.1.2), we now have more than 3 Result Status values as CB's use this to manage the audit review process 
// It is also used by reviewers to approve the audit (they see summary, cars, attachments & notes)
// As at 3.3.001, this now applies to ALL Standards as they are Freshcare requirements, not JASANZ requirements

// v3.1.210 Replaced all dialog('close') with dialog('destroy')
// v3.2.015 SUP023421 Changed Grower to Member 

nsFreshcare.admin.audit = 
{
	data: 
	{
		historyFields:
		[	/* v3.1.215 changed titletext to typetext 
			   v3.3.001 Added training, qualifying training, jasanz, recert audit month fields */
			{name: 'audit.reference', caption: 'Reference'},
			{name: 'audit.type', caption: 'Title', display: 'audit.typetext'},
			{name: 'audit.contactbusiness', caption: nsFreshcare.data.growerText + ' Business', display: 'audit.contactbusinesstext'},
			{name: 'audit.contactperson', caption: 'Audit Contact', display: 'audit.contactpersontext'},
			{name: 'audit.agrisubscription.membership', caption: 'Membership', display: 'audit.agrisubscription.membershiptext'},
			{name: 'audit.codeofpractice', caption: 'Code of Practice', display: 'audit.codeofpracticetext'},
			{name: 'audit.actualdate', caption: 'Audit Date'},
			{name: 'audit.trainingduration', caption: 'Audit Duration'},
			{name: 'audit.trainercontactbusiness', caption: 'Trainer', display: 'audit.trainercontactbusinesstext'},
			{name: 'audit.trainingdate', caption: 'Training Date'},
			{name: 'audit.trainingrating', caption: 'Training Rating'},
			{name: 'audit.trainingnotes', caption: 'Training Notes'},
			{name: 'audit.resultstatus', caption: 'Result Status', display: 'audit.resultstatustext'},
			{name: 'audit.resultstatusdate', caption: 'Result Status Date'},
			{name: 'audit.auditbusiness', caption: 'Certification Body', display: 'audit.auditbusinesstext'},
			{name: 'audit.auditperson', caption: 'Auditor', display: 'audit.auditpersontext'},
			{name: 'audit.description', caption: 'Details'},
			{name: 'audit.membershipstatus', caption: 'Resulting Membership Status', display: 'audit.membershipstatustext'},
			{name: 'audit.paid', caption: 'Audit Paid?', display: 'audit.paid'},
			{name: 'audit.conditionsmet', caption: 'Approval Conditions Met?', display: 'audit.conditionsmet'},
			{name: 'audit.teamleadercontactperson', caption: 'Reviewer', display: 'audit.teamleadercontactpersontext'},
			{
				name: 'audit.sequalifyingtraininglink.id', 
				caption: 'Qualifying Training', 
				display: 'audit.sequalifyingtraininglink.attendee.attendingtrainee', 
				include: function() {return nsFreshcare.option.qualifyingTraining}
			},
			{
				name: 'audit.serecertauditmonth',
				caption: 'Audit\'s Re-Cert Audit Month',
				display: 'audit.serecertauditmonth'
			},
			{
				name: 'audit.semissingtraineename',
				caption: 'Missing Trainee Name',
				display: 'audit.semissingtraineename'
			},
			{
				name: 'audit.sejasanzaudit', 
				caption: 'JASANZ Audit', 
				display: 'audit.sejasanzaudit', 
				include: function() {return nsFreshcare.option.jasanzAccreditation}
			},
			{
				name: 'audit.seioasaudit', 
				caption: 'IOAS Audit', 
				display: 'audit.seioasaudit', 
				include: function() {return nsFreshcare.option.jasanzAccreditation}
			},
			{
				name: 'audit.seextensionmonths',
				caption: 'Extension Months',
				display: 'audit.seextensionmonths'
			}
		]
	},
	
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 107;	
		ns1blankspace.objectName = 'audit';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'AUDIT';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Audits';	
		ns1blankspace.data.audit = {};
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		ns1blankspace.data.membership = undefined;
		ns1blankspace.data.membershipText = undefined;
		ns1blankspace.data.subscription = undefined;
		ns1blankspace.data.subscriptionStatus = undefined;
		var bNew = false;

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
			if (oParam.contactPerson != undefined) {ns1blankspace.data.contactPerson = oParam.contactPerson;}
			if (oParam.contactPersonText != undefined) {ns1blankspace.data.contactPersonText = oParam.contactPersonText;}
			if (oParam.membership != undefined) {ns1blankspace.data.membership = oParam.membership;}
			if (oParam.membershipText != undefined) {ns1blankspace.data.membershipText = oParam.membershipText;}
			if (oParam.subscription != undefined) {ns1blankspace.data.subscription = oParam.subscription;}
			if (oParam["new"] != undefined) {bNew = oParam["new"];}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
		nsFreshcare.admin.auditcar.initGlobals();		//ToDo - remove thes when move addcar to own function
		nsFreshcare.admin.audit.readOnly = nsFreshcare.util.objectIsReadOnly();
		nsFreshcare.admin.audit.readOnly = nsFreshcare.util.objectIsReadOnly();
		delete(nsFreshcare.admin.audit.data.training);		//v3.3.001 SUP023763 
		delete(nsFreshcare.admin.audit.data.trainingCourses);		//v3.3.001 SUP023763 
		delete(nsFreshcare.admin.audit.data.traineeDetails);		// v3.3.001 SUP023763
		
		// v3.3.005 SUP023801 Clear out nsFreshcare.data.auditor if not the CB user as need to get new values each time
		if (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor)
		{
			nsFreshcare.data.auditor = undefined;
		}
		
		// For external users, cannot add a new audit from this form - have to go to New Grower
		if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && bNew && oParam.contactBusiness === undefined) 
		{
			nsFreshcare.auditor.grower.init({"new": true});
			ns1blankspace.status.message('Inform Freshcare of unregistered ' + nsFreshcare.data.growerText + '.');
		}
	},

	home: 		function (oParam, oResponse)
	{
		var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'audit.actualdate'}).value;
		var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
		var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.admin.audit.show}).value;
		
		if (oParam === undefined) {oParam = {};}

		if (oResponse == undefined)
		{
			var aHTML = [];
			var dToday = new Date();
						
			// Reviewers can't add new Audits or inform FC of unregistered growers
			
			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.reviewer)
			{
				ns1blankspace.app.context({all: true, inContext: false});
			}
						
			aHTML.push('<table class="ns1blankspaceMain">');
			aHTML.push('<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'</tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			// v3.1.2 SUP022859 ReadOnly can't add or delete Audit
			if (nsFreshcare.admin.audit.readOnly == true)
			{
				ns1blankspace.app.context({all: true, inContext: false});
			}

			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AUDIT_SEARCH';		
			oSearch.addField('audit.contactbusinesstext,audit.contactpersontext,audit.contactperson.firstname,audit.contactperson.surname,audit.agrisubscription.membershiptext' +
							',audit.codeofpracticetext,audit.reference,audit.resultstatustext,audit.actualdate,audit.auditpersontext,audit.auditbusinesstext,membershipstatus');
			oSearch.addField(ns1blankspace.option.auditFields);

			// v3.1.2 SUP022859 Only show JASANZ users audits for the selected CB if set
			if ((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)
				|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz && nsFreshcare.data.viewFilter.certificationBody)) 
			{
				oSearch.addFilter("audit.auditbusiness", "EQUAL_TO", (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? nsFreshcare.data.viewFilter.certificationBody : ns1blankspace.user.contactBusiness));
				oSearch.addFilter("audit.agrisubscription.membership.status", 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	//v1.0.24
				// v3.1.2 SUP022543 Reviewers only to see Audits assigned to them
				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer)
				{
					oSearch.addFilter('audit.teamleadercontactperson', 'EQUAL_TO', ns1blankspace.user.contactPerson);
					oSearch.addFilter('audit.resultstatus', 'IN_LIST',  nsFreshcare.data.audit.resultStatusAwaitingReview + ',' +
																		nsFreshcare.data.audit.resultStatusApproved + ',' + 
																		nsFreshcare.data.audit.resultStatusRejected +
																		(ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval
																			? ',' + ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval
																			: ''));
				}
			}
			oSearch.sort(sSortColumn, sSortDirection);
			oSearch.rows = 20;
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.audit.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.status === 'OK')
			{
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceNothing">' + 
									(nsFreshcare.user.roleID != nsFreshcare.data.roles.reviewer 
										? 'To add a new Audit, search for the ' + nsFreshcare.data.growerText + ' and click Register Audit.'
										: 'No Audits found.') +
									'</td></tr>' +
									'</table>');
				}
				else
				{
					var sCertBodyColumn = (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? 'audit.auditpersontext' : 'audit.auditbusinesstext';

					// v4.0.001 Bootstrap
					aHTML.push('<div class="ns1blankspaceCaption"' +
									'style="padding-left:8px; margin-bottom:10px; font-weight:500;">MOST RECENTLY CONDUCTED</div>');

					aHTML.push('<table id="ns1blankspaceMostLikely" class="table">');
					aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactbusinesstext"' +
									' data-methodsortdirection="' + ((sSortColumn == "audit.contactbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + nsFreshcare.data.growerText + '</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.membershiptext"' +
									' data-methodsortdirection="' + ((sSortColumn == "audit.agrisubscription.membershiptext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.codeofpracticetext"' +
									' data-methodsortdirection="' + ((sSortColumn == "audit.codeofpracticetext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>COP</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.resultstatustext"' +
									' data-methodsortdirection="' + ((sSortColumn == "audit.resultstatustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Result Status</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.actualdate"' +
									' data-methodsortdirection="' + ((sSortColumn == "audit.actualdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Audit Date</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sCertBodyColumn + '"' +
									' data-methodsortdirection="' + ((sSortColumn == sCertBodyColumn) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + ((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? 'Auditor' : 'Cert Body') + '</td>' +
								'</tr>');

					$.each(oResponse.data.rows, function()
					{
						aHTML.push('<tr class="ns1blankspaceRow">');

						aHTML.push('<td id="ns1blankspaceMostLikely_grower-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["audit.contactbusinesstext"] + ' (' + this["audit.contactpersontext"] + ')</td>' +
									'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["audit.agrisubscription.membershiptext"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_cop-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["audit.codeofpracticetext"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_result-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["audit.resultstatustext"] + 
												(this.membershipstatus == '-1' ? '<br /><span class="ns1blankspaceSubNote">(Lapsed)</span>' : '') + '</td>' +
									'<td id="ns1blankspaceMostLikely_date-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["audit.actualdate"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_auditor-' + this.id + '" class="ns1blankspaceMostLikely">' +
												((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) 
													? this["audit.auditpersontext"]
													: this["audit.auditbusinesstext"]) + '</td>' +
									'</tr>');
						
					});
					
					aHTML.push('</table>');
				}
				
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					nsFreshcare.admin.audit.search.send(event.target.id, {source: 1, role: "Auditor", functionShow: fFunctionShow});
				});
			}
			else
			{
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
		}
	},

	search: 	
	{
		send: 	function (sXHTMLElementId, oParam)
		{
			// Added ver 1.0.20
			if (jQuery.type(sXHTMLElementId) === "object") {
				oParam = sXHTMLElementId;
				if (oParam.xhtmlElementID) {sXHTMLElementId = oParam.xhtmlElementID}
			}
			var aSearch = sXHTMLElementId.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[1];
			var iMinimumLength = 0;
			var iSource = ns1blankspace.data.searchSource.text;
			var sSearchText;
			var iMaximumColumns = 1;
			var iRows = 10;
			var dToday = new Date();
			var sRole = nsFreshcare.user.roleID;
			var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.admin.audit.show}).value;
			var bSystemSearch = (oParam && oParam.functionShowSystem != undefined);

			if (oParam != undefined)
			{
				if (oParam.source != undefined) {iSource = oParam.source}
				if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
				if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
				if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
				if (oParam.role != undefined) {sRole = oParam.role}
			}
			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				if (!bSystemSearch)
				{
					$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				}
				
				ns1blankspace.objectContext = sSearchContext;
				delete(nsFreshcare.admin.audit.data.training);		//v3.3.001 SUP023763 
				delete(nsFreshcare.admin.audit.data.trainingCourses);		//v3.3.001 SUP023763 
				delete(nsFreshcare.admin.audit.data.traineeDetails);		// v3.3.001 SUP023763
				nsFreshcare.admin.audit.data.scopeExtension = {};
				
				// v3.1.2 SUP022912 Added certificateexpiresafter & expirymonth for calculating expiry date of certificate
				// v3.2.020 SUP023422 Added seQualifyingTraining fields
				// v3.3.001 SUP023563 Added serecertauditmonth
				// v4.0.013 SUp024144 Added seextensionmonths
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.reference,audit.title,audit.type,audit.typetext,audit.contactbusiness,audit.contactbusinesstext,audit.contactperson,audit.contactpersontext' +
								',audit.agrisubscription.membership,audit.agrisubscription.membershiptext,audit.codeofpractice,audit.codeofpracticetext,audit.agrisubscription.status' +
								',audit.status,audit.statustext,audit.resultstatus,audit.resultstatustext,audit.resultstatusdate,audit.actualdate,audit.scheduleddate,audit.serecertauditmonth' +
								',audit.membershipstatus,audit.membershipstatustext,audit.auditbusiness,audit.auditbusinesstext,audit.modifieddate,audit.createddate' +
								',audit.auditperson,audit.auditpersontext,audit.description,audit.createduser,audit.createdusertext,audit.modifieduser,audit.modifiedusertext' + 
								',audit.contactperson.email,audit.contactperson.firstname,audit.contactperson.surname,audit.contactperson.workphone,audit.contactperson.mobile,audit.subscription' +
								',audit.contactbusiness.streetaddress1,audit.contactbusiness.streetaddress2,audit.contactbusiness.streetsuburb,audit.contactbusiness.streetstate,audit.contactbusiness.streetpostcode' +
								',audit.trainercontactbusiness,audit.trainercontactbusinesstext,audit.trainingduration,audit.trainingrating,audit.trainingdate,audit.trainingnotes' +
								',audit.agrisubscription.agricertificate.audit,audit.teamleadercontactperson,audit.teamleadercontactpersontext,audit.teamleadercontactperson.email' +
								',audit.paid,audit.contactbusiness.legalname,audit.agrisubscription.agricertificate.enddate,audit.codeofpractice.certificateexpiresafter,audit.agrisubscription.expirymonth' +
								',audit.agrisubscription.firstcertified,audit.semissingtraineename,audit.agrisubscription.codeofpractice,sefullcertdata' +
								',audit.seextensionmonths');		
				
				// v3.1.2 SUP022693 Get JASANZ related fields if system supports JASANZ
				// v3.3.005 No longer gets CB's JASANZ date
				// v4.0.019 SUP024339 Now gets IOAS field
				if (nsFreshcare.data.jasanzDateId)
				{
					if (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor) {delete(nsFreshcare.data.auditor);}
					oSearch.addField('audit.auditbusiness.semanualauditapproval' +  
										',audit.auditbusiness.se' + nsFreshcare.data.selfCertificationDateId + ',audit.sejasanzaudit,audit.seioasaudit');
				}
				
				if (nsFreshcare.option.qualifyingTraining)
				{
					oSearch.addField('audit.sequalifyingtraininglink.id,audit.sequalifyingtraininglink.attendee.attendingtrainee,audit.codeofpractice.copbasedtraining' +
									',audit.sequalifyingtraininglink.attendee.course.coursedate,audit.sequalifyingtraininglink.attendee.course.package.membership.code' +
									',audit.sequalifyingtraininglink.attendee.course.package.codeofpracticetext,audit.sequalifyingtraininglink.attendee.course.status' +
									',audit.sequalifyingtraininglink.attendee.traineecontactbusinesstext,audit.sequalifyingtraininglink.attendee.id' +
									',audit.sequalifyingtraininglink.attendee.course.statustext');
				}

				// v3.1.209 SUP023095 Added certificationlevel if applicable
				if (nsFreshcare.option.certificationLevels == true)
				{
					oSearch.addField('audit.certificationlevel,audit.certificationleveltext,audit.certificationlevel.title');
				}

				// if functionShowSystem has been passed, we want to see snapshots
				if (!bSystemSearch)
				{
					oSearch.addFilter('id', 'IN_LIST', sSearchContext);
				}
				else
				{
					oSearch.addField('snapshotofid,snapshotcreateduser,snapshotcreatedusertext,snapshotmodifieduser,snapshotmodifiedusertext,snapshotcreateddate,snapshotmodifieddate');
					oSearch.addCustomOption('includesnapshots', 'Y');
					oSearch.addFilter('snapshotofid', 'EQUAL_TO', sSearchContext);
					oSearch.sort('snapshotcreateddate', 'desc');
					fFunctionShow = oParam.functionShowSystem;
				}

				oSearch.getResults(function(data) 
				{
					// v3.4.007 Now populates membershipstatustext if membershipstatus = "-1"
					if (data.data.rows.length > 0)
					{
						data.data.rows = $.map(data.data.rows, function(x) 
						{
							if (x['audit.membershipstatus'] == '-1')
							{	x['audit.membershipstatustext'] = 'Audit Lapsed'}
							return x;
						});
					}
					fFunctionShow(oParam, data)
				});
			}
			else
			{
				if (sSearchText == undefined)
				{
					sSearchText = $('#ns1blankspaceViewControlSearch').val();
				}	
				
				if (iSource == ns1blankspace.data.searchSource.browse)
				{
					iMinimumLength = 1;
					iMaximumColumns = 4;
					sSearchText = aSearch[1];
					if (sSearchText == '#') {sSearchText = '[0-9]'}
					sElementId = 'ns1blankspaceViewBrowse';
				}
				
				if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
				{
					ns1blankspace.container.position({xhtmlElementID: sElementId});
					ns1blankspace.search.start();
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AUDIT_SEARCH';
					oSearch.addField('audit.contactbusinesstext,audit.contactbusiness.legalname,audit.contactpersontext,audit.resultstatustext,' +
									'audit.actualdate,audit.agrisubscription.membership.code,membershipstatus');
					
					oSearch.addBracket("(");
					oSearch.addFilter('audit.contactperson.firstname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('audit.contactperson.surname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('audit.contactperson.contactbusiness.tradename', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('audit.contactperson.contactbusiness.legalname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('audit.reference', 'TEXT_IS_LIKE', sSearchText);		// v3.1.2 SUP022913 Added
					oSearch.addBracket(')');
					if ((sRole != nsFreshcare.data.roles.admin && sRole != nsFreshcare.data.roles.jasanz)
						|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz && nsFreshcare.data.viewFilter.certificationBody)) 
					{
						// Non-admin (particularly auditors) see only audits that their own business has audited
						// v3.1.2 SUP022859 Jasanz can only see currntly fitlered auditor if set
						// v1.0.24 Also, can't see audits for non-current memberships
						// v3.1.2 SUP022693 Check if ConditionalApproval defined on rootnamespace first
						oSearch.addFilter("audit.auditbusiness", "EQUAL_TO", (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? nsFreshcare.data.viewFilter.certificationBody : ns1blankspace.user.contactBusiness));
						oSearch.addFilter("audit.agrisubscription.membership.status", 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	//v1.0.24
						if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer)
						{
							oSearch.addFilter('audit.teamleadercontactperson', 'EQUAL_TO', ns1blankspace.user.contactPerson);
							oSearch.addFilter('audit.resultstatus', 'IN_LIST',  nsFreshcare.data.audit.resultStatusAwaitingReview + ',' +
																				nsFreshcare.data.audit.resultStatusApproved + ',' + 
																				nsFreshcare.data.audit.resultStatusRejected + 
																				(ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval
																					? ',' + ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval
																					: ''));
						}
					}

					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.sort('audit.actualdate', 'desc');
					oSearch.rows = 20;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) 
					{
						if (data.status == 'OK')
						{
							var oRoot = ns1blankspace.rootnamespace;
							if (oRoot.admin && oRoot.admin.audit && oRoot.admin.audit.search && oRoot.admin.audit.search.process)
							{
								oRoot.admin.audit.search.process(oParam, data)
							}
							else {nsFreshcare.admin.audit.search.process(oParam, data);}
						}
						else {ns1blankspace.status.error("Error finding Audits: " + data.error.errornotes)}
					});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var iColumn = 0;
			var aHTML = [];
			var	iMaximumColumns = 1;
			var sRole = nsFreshcare.user.role;
				
			if (oParam) {
				if (oParam.role != undefined) {sRole = oParam.role}
			}

			ns1blankspace.search.stop();
			if (oResponse.data.rows.length == 0)
			{
				$(ns1blankspace.xhtml.searchContainer).html('<table class="ns1blankspaceSearchMedium"><tr><td class="ns1blankspaceSubNote">Nothing to show</td></tr></table>');
				//$(ns1blankspace.xhtml.container).hide();
			}
			else
			{	
				aHTML.push('<table class="ns1blankspaceSearchMedium">');
					
				$.each(oResponse.data.rows, function()
				{
					iColumn = iColumn + 1;
					
					if (iColumn == 1)
					{
						aHTML.push('<tr class="ns1blankspaceSearch">');
					}
					
					aHTML.push('<td class="ns1blankspaceSearch" id="contactbusiness' +
									'-' + this.id + '">' +
									this["audit.contactbusinesstext"] + ' ' + 
								'</td>'); 
					
					// v2.0.4 SUP021409 Added Memebrship Code column
					aHTML.push('<td class="ns1blankspaceSearch" id="subscription' +
									'-' + this.id + '">' +
									this["audit.agrisubscription.membership.code"] + ' ' + 
								'</td>'); 

					// v3.4.010 Added Lapsed
					aHTML.push('<td class="ns1blankspaceSearch" id="resultstatus' +
									'-' + this.id + '">' +
									this["audit.resultstatustext"] + 
									(this.membershipstatus == '-1' ? '<br /><span class="ns1blankspaceSubNote">(Lapsed)</span>' : '') +
									'</td>');
									
					aHTML.push('<td class="ns1blankspaceSearch" id="actualdate' +
									'-' + this.id + '">' +
									this["audit.actualdate"] + '</td>');
									
					if (iColumn == iMaximumColumns)
					{
						aHTML.push('</tr>');
						iColumn = 0;
					}	
				});
		    	
				aHTML.push('</table>');
				
				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.admin.audit.search.send(event.target.id, {source: 1, role: sRole});
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows and 1st & 2nd page of results now match formats
				ns1blankspace.render.bind(
				{
					columns: 'audit.contactbusinesstext-column-audit.agrisubscription.membership.code-column-audit.resultstatustext-column-audit.actualdate',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.audit.search.send
				});   
			}	
		}
	},						

	remove: function(oParam)
	{
		// All details are removed when user confirms - Scope Extensions, CARs, Actions (notes, certificates) & related attachments
		var aText = [];
		var aButtons = [];
		var oData = {};
		var sMethod = '';

		if (oParam.removeAuditStep === undefined) 
		{
			ns1blankspace.container.confirm(
			{
				title: 'Delete Audit?', html: 'Are you sure you want to delete this Audit?',
				buttons: 
				[
					{text: "Yes", label: "Yes", icons: {primary: 'glyphicon-ok'},
						click: function() 
						{
							oParam.removeAuditStep = 0;
							$('#ns1blankspaceBootstrapDialog').modal('hide');
							nsFreshcare.admin.audit.remove(oParam);
						}
					},
					{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
						click: function() 
						{
							$('#ns1blankspaceBootstrapDialog').modal('hide');
							ns1blankspace.okToSave = false;
							return;
						}
					}
				]
			});
		}

		// Count Scope Extensions
		// v3.1.2 SUP022693 Added this section
		else if (oParam.removeAuditStep == 0)
		{
			ns1blankspace.status.working('Finding Scope Extensions');

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_CERTIFICATE_UPGRADE_SEARCH';
			oSearch.addField('audit');
			oSearch.addFilter('audit', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addSummaryField('count(*) countextensions');
			oSearch.rows = 50;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					oParam.countExtensions = oResponse.summary.countextensions;
					oParam.extensions = oResponse.data.rows;
					oParam.removeAuditStep = 1;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding Scope Extensions: ' + oResponse.error.errornotes);
				}
			});
		}

		// Count CARs
		else if (oParam.removeAuditStep === 1)
		{
			ns1blankspace.status.working('Finding CARs');

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AUDIT_ISSUE_SEARCH';
			oSearch.addField('reference');
			oSearch.addFilter('audit', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addSummaryField('count(*) countcars');
			oSearch.rows = 200;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					oParam.countCARs = oResponse.summary.countcars;
					oParam.cars = oResponse.data.rows;
					oParam.removeAuditStep = 2;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding CARs: ' + oResponse.error.errornotes);
				}
			});
		}

		// Count Actions
		else if (oParam.removeAuditStep === 2)
		{
			ns1blankspace.status.working('Finding Actions');

			var oSearch = new AdvancedSearch();
			oSearch.method = 'ACTION_SEARCH';
			oSearch.addField('subject');
			oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addSummaryField('count(*) countactions');
			oSearch.rows = 50;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					oParam.countActions = oResponse.summary.countactions;
					oParam.actions = oResponse.data.rows;
					oParam.removeAuditStep = 3;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding Actions: ' + oResponse.error.errornotes);
				}
			});
		}

		// Count Attachments
		else if (oParam.removeAuditStep === 3)
		{
			ns1blankspace.status.working('Finding Attachments');

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CORE_ATTACHMENT_SEARCH';
			oSearch.addField('attachment');
			oSearch.addBracket('(');
			oSearch.addBracket('(');
			oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addBracket(')');
			if (parseInt(oParam.countActions) > 0)
			{
				oSearch.addOperator('or')
				oSearch.addBracket('(');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAction);
				oSearch.addFilter('objectcontext', 'IN_LIST', $.map(oParam.actions, function(x) {return x.id}).join(','));
				oSearch.addBracket(')');
			}
			oSearch.addBracket(')');
			oSearch.addSummaryField('count(*) countattachments');
			oSearch.rows = 50;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					oParam.countAttachments = oResponse.summary.countattachments;
					oParam.attachments = oResponse.data.rows;
					oParam.removeAuditStep = 5;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding Attachments: ' + oResponse.error.errornotes);
				}
			});
		}

		// Ask user to confirm
		else if (oParam.removeAuditStep === 5)
		{
			ns1blankspace.status.clear();
			
			if (parseInt(oParam.countExtensions) > 0)
			{
				aText.push('<tr><td>' + oParam.countExtensions + ' Scope Exension' + ((oParam.countExtensions != '1') ? 's' : ''));
			}
			else {oParam.countExtensions = undefined}

			if (parseInt(oParam.countCARs) > 0)
			{
				aText.push('<tr><td>' + oParam.countCARs + ' CAR' + ((oParam.countCARs != '1') ? 's' : ''));
			}
			else {oParam.countCARs = undefined}

			if (parseInt(oParam.countActions) > 0)
			{
				aText.push('<tr><td>' + oParam.countActions + ' Action' + ((oParam.countActions != '1') ? 's' : ''));
			}
			else {oParam.countActions = undefined}

			if (parseInt(oParam.countAttachments) > 0)
			{
				aText.push('<tr><td>' + oParam.countAttachments + ' Attachment' + ((oParam.countAttachments != '1') ? 's' : ''));
			}
			else {oParam.countAttachments = undefined}

			// If we have something to delete, confirm it with the user and continue if they confirm
			$(ns1blankspace.xhtml.container).html('');
			$(ns1blankspace.xhtml.container).hide();
			if (aText.length > 0)
			{
				aText.unshift('<table><tr><td>The following data will be deleted when removing Audit. Continue deleting?</td></tr>');
				aText.push('</table>');
				
				aButtons =  [
								{text: "Yes", label: "Yes", icons: {primary: 'glyphicon-ok'},
									click: function() 
									{
										oParam.removeAuditStep = 6;
										$('#ns1blankspaceBootstrapDialog').modal('hide');
										nsFreshcare.admin.audit.remove(oParam);
									}
								},
								{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
									click: function() 
									{
										$('#ns1blankspaceBootstrapDialog').modal('hide');
										ns1blankspace.okToSave = false;
										return;
									}
								}
							];

				ns1blankspace.container.confirm({title: 'Delete Audit?',
												html: aText.join(''),
												buttons: aButtons});
			}
			else	// Just delete Audit record
			{
				oParam.removeAuditStep = 7;
				nsFreshcare.admin.audit.remove(oParam);
			}
		}

		// Perform deletion of rows
		else if (oParam.removeAuditStep === 6)
		{
			// Remove each Scope Extension 
			// v3.1.2 SUP022693 Added
			if (oParam.countExtensions && parseInt(oParam.countExtensions) > 0)
			{	
				// Check if we need to get more records
				if (oParam.extensions.length < parseInt(oParam.countExtensions))
				{
					oParam.rows = oParam.countExtensions;
					oParam.removeAuditStep = 1;
					oParam.nextStep = 6;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.working('Removing Scope Extensions');
					if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

					if (oParam.rowIndex < oParam.extensions.length)
					{
						oData.id = oParam.extensions[oParam.rowIndex].id;
						sMethod = 'AGRI_CERTIFICATE_UPGRADE_MANAGE';
						oParam.currentObject = 'countExtensions'
					}
					else
					{
						delete(oParam.countExtensions);
					}
				}
			}

			// Remove each CAR 
			if (oParam.countCARs && parseInt(oParam.countCARs) > 0)
			{	
				// Check if we need to get more records
				if (oParam.cars.length < parseInt(oParam.countCARs))
				{
					oParam.rows = oParam.countCARs;
					oParam.removeAuditStep = 1;
					oParam.nextStep = 6;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.working('Removing CARs');
					if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

					if (oParam.rowIndex < oParam.cars.length)
					{
						oData.id = oParam.cars[oParam.rowIndex].id;
						sMethod = 'AUDIT_ISSUE_MANAGE';
						oParam.currentObject = 'countCARs'
					}
					else
					{
						delete(oParam.countCARs);
					}
				}
			}

			// Remove each Action 
			else if (oParam.countActions && parseInt(oParam.countActions) > 0)
			{	
				// Check if we need to get more records
				if (oParam.actions.length < parseInt(oParam.countActions))
				{
					oParam.rows = oParam.countActions;
					oParam.removeAuditStep = 2;
					oParam.nextStep = 6;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.working('Removing Actions');
					if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

					if (oParam.rowIndex < oParam.actions.length)
					{
						oData.id = oParam.actions[oParam.rowIndex].id;
						sMethod = 'ACTION_MANAGE';
						oParam.currentObject = 'countActions'
					}
					else
					{
						delete(oParam.countActions);
					}
				}
			}

			// Remove each Attachment 
			else if (oParam.countAttachments && parseInt(oParam.countAttachments) > 0)
			{	
				// Check if we need to get more records
				if (oParam.attachments.length < parseInt(oParam.countAttachments))
				{
					oParam.rows = oParam.countAttachments;
					oParam.removeAuditStep = 2;
					oParam.nextStep = 6;
					nsFreshcare.admin.audit.remove(oParam);
				}
				else
				{
					ns1blankspace.status.working('Removing Attachments');
					if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

					if (oParam.rowIndex < oParam.attachments.length)
					{
						oData.id = oParam.attachments[oParam.rowIndex].attachment;
						sMethod = 'CORE_ATTACHMENT_MANAGE';
						oParam.currentObject = 'countAttachments'
					}
					else
					{
						delete(oParam.countAttachments);
						oParam.removeAuditStep = 7;
					}
				}
			}

			if (oData.id != undefined)
			{
				oData.remove = '1';
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI(sMethod),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							// Check if this was the last row for the object being removed and reset values if so
							if (oParam[oParam.currentObject] === undefined)
							{
								delete(oParam.rowIndex);
								delete(oParam.rows);
								delete(oParam.nextStep);
							}
							else
							{
								oParam.rowIndex += 1;
							}
							nsFreshcare.admin.audit.remove(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error removing records (' + sMethod + '):' + oResponse.error.errornotes);
						}
					}
				});
			}
			else
			{
				delete(oParam.rowIndex);
				delete(oParam.rows);
				delete(oParam.nextStep);
				if (oParam.countCARs === undefined && oParam.countActions == undefined && oParam.countAttachments === undefined)
				{
					oParam.removeAuditStep = 7;
				}
				nsFreshcare.admin.audit.remove(oParam);
			}
		}

		// Now delete the audit record
		else if (oParam.removeAuditStep === 7)
		{
			oData.remove = '1';
			oData.id = ns1blankspace.objectContext;
			var oRoot = ns1blankspace.rootnamespace;
			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('AUDIT_MANAGE'),
				data: oData,
				success: function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.status.message('Audit removed.');
						oRoot.admin.audit.init({showHome: true});
					}
					else
					{
						ns1blankspace.status.error('Error removing audit:' + oResponse.error.errornotes);
					}
				}
			});
		}
	},

	layout: 	function ()
	{
		var aHTML = [];
		var oParam = {};
		var oContext = {};
		var oRoot = ns1blankspace.rootnamespace;
		if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin)
		{
			oContext['new'] = true;
			oContext.action = (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor);
			oContext.inContext = false;
		}
		else {oContext = {inContext: true}}


		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext == -1)
		{
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Details</td></tr>');
							
			aHTML.push('<tr><td id="ns1blankspaceControlTrainee" class="ns1blankspaceControl">' +
							'Trainee</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlEvaluation" class="ns1blankspaceControl">' +
							'Training Evaluation</td></tr>');
							
			// v3.1.2 SUP022693 Added 
			aHTML.push('<tr><td id="ns1blankspaceControlExtension" class="ns1blankspaceControl">' +
							'Scope Extension</td></tr>');
							
		}
		else
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Summary</td></tr>');
			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.reviewer)
			{
				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
								'Details</td></tr>');
			}

			if (nsFreshcare.option.qualifyingTraining)
			{
				aHTML.push('<tr><td id="ns1blankspaceControlTrainee" class="ns1blankspaceControl">' +
								'Qualifying Trainee</td></tr>');
			}

			//aHTML.push('<tr><td id="ns1blankspaceControlSites" class="ns1blankspaceControl">' +
			//				'Sites</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlEvaluation" class="ns1blankspaceControl">' +
							'Training Evaluation</td></tr>');
							
			aHTML.push('<tr><td id="ns1blankspaceControlCARs" class="ns1blankspaceControl">' +
							'CARs</td></tr>');
		
			// v3.1.2 SUP022693 Added 
			aHTML.push('<tr><td id="ns1blankspaceControlExtension" class="ns1blankspaceControl">' +
							'Scope Extension</td></tr>');
							
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlSystem" class="ns1blankspaceControl">' +
							'System</td></tr>');
		
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr id="ns1blankspaceControlCertificatesRow"><td id="ns1blankspaceControlCertificates" class="ns1blankspaceControl">' +
							'Certificates</td></tr>');
							
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
							'Attachments</td></tr>');
							
			aHTML.push('<tr><td id="ns1blankspaceControlNotes" class="ns1blankspaceControl">' +
							'Notes</td></tr>');
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainTrainee" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSites" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainCARs" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSystem" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainEvaluation" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainExtension" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainCertificates" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainNotes" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor && ns1blankspace.objectContextData)
		{
			oContext = 
			{
				inContext: false, 'new': true, 
				action: (ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusCompleted 
							|| ns1blankspace.objectContextData['audit.membershipstatus'] == -1
						), 
				actionOptions: (ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusConducted)
			};
		}

		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext, refresh: true});
			nsFreshcare.admin.audit.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			nsFreshcare.admin.audit.details();
		});
		
		$('#ns1blankspaceControlTrainee').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainTrainee', context: oContext});
			nsFreshcare.admin.audit.trainee.show();
		});

		$('#ns1blankspaceControlSites').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSites'});
			nsFreshcare.admin.audit.sites.show();
		});
		
		$('#ns1blankspaceControlCARs').click(function(event)
		{
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer) {oParam.canEdit = false}
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer) {oParam.canRemove = false}
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer) {oParam.canAdd = false}
			delete(oParam.response);	// v3.3.007 SUP023831 Was not clearing this out prior to displaying 

			ns1blankspace.show({selector: '#ns1blankspaceMainCARs', context: {inContext: false}});
			nsFreshcare.admin.audit.cars.show(oParam);
		});
		
		$('#ns1blankspaceControlSystem').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSystem', context: {inContext: false}});
			nsFreshcare.util.system.search({xhtmlElementID: 'ns1blankspaceMainSystem', tablePrefix: 'audit'});
		});

		$('#ns1blankspaceControlEvaluation').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainEvaluation', context: oContext});
			nsFreshcare.admin.audit.evaluation();
		})
		.hide();		// Hidden until we know whether the Audit is an Initial Assessment or not.
		
		// v3.1.2 SUP022693 Added 
		$('#ns1blankspaceControlExtension').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainExtension', context: oContext});
			nsFreshcare.admin.audit.scopeExtension.show();
		})
		.hide();		// Hidden until we know whether the Audit is a Scope Extension or not.
		
		$('#ns1blankspaceControlCertificates').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainCertificates', context: {inContext: false}});
			nsFreshcare.admin.audit.certificates.search({xhtmlElementID: 'ns1blankspaceMainCertificates'});
		});

		$('#ns1blankspaceControlAttachments').click(function(event)
		{
			// v3.1.205 SUP023030 For admin, ALL attachment Types shown and limits displayed types for auditor, reviewer, jasanz, internal auditor
			var sRole = nsFreshcare.user.roleID;
			var aAttachmentTypes = (sRole == nsFreshcare.data.roles.admin || sRole == nsFreshcare.data.roles.auditor 
								|| sRole ==  nsFreshcare.data.roles.reviewer || sRole ==  nsFreshcare.data.roles.jasanz 
								|| sRole == nsFreshcare.data.roles.internalAuditor) 
									? nsFreshcare.data.audit.auditorAttachments.concat(nsFreshcare.data.audit.reviewerRequiredAttachmentTypes)
									: undefined;
			// v3.1.209 moved to admin.audit.attachments
			nsFreshcare.admin.audit.attachments({action: 'search', attachmentTypes: aAttachmentTypes});
		});

		$('#ns1blankspaceControlNotes').click(function(event)
		{
			// v3.1.2 SUP022859 Filter on ActionBy if filterUsers is defined 
			// v3.4.010 SUP023939 Added Other Reason
			// v4.0.012 SUP024144 Added CertificateExtension
			var sActionTypes = (nsFreshcare.user.roleID == nsFreshcare.data.roles.grower || nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer || nsFreshcare.user.roleID == nsFreshcare.data.roles.customer) 
								? [nsFreshcare.data.actionTypeUserNotes]
								: [nsFreshcare.data.actionTypeUserNotes, 
								  nsFreshcare.data.actionTypeLateLoggedAudit,
								  nsFreshcare.data.actionTypeAuditRejected,
								  nsFreshcare.data.actionTypeRecertAuditLate,
								  nsFreshcare.data.actionTypeOtherReason,
								  nsFreshcare.data.actionTypeCertificateExtension];
			var aActionBy = (ns1blankspace.objectContextData.filterUsers ? $.map(ns1blankspace.objectContextData.filterUsers, function(x) {return x.id}) : undefined);

			ns1blankspace.show({selector: '#ns1blankspaceMainNotes', refresh: true, context: {inContext: false}});
			nsFreshcare.internal.entity.notes.search(
		   	{
			   	object: nsFreshcare.objectAudit, 
				objectContext: ns1blankspace.objectContext,
				actionTypes: sActionTypes,
				actionBy: aActionBy,
				actions: {add: !nsFreshcare.admin.audit.readOnly},
				showReminder: true
		   	});
		});
	},

	show: 		function (oParam, oResponse)
	{
		if (oParam == undefined) {oParam = {}}

		if (oParam.showStep == undefined)
		{
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			nsFreshcare.admin.audit.layout();
			
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find audit.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				if (ns1blankspace.objectContextData['audit.membershipstatus'] === '-1')
				{
					ns1blankspace.objectContextData['audit.membershipstatustext'] = 'Audit Lapsed';
				}
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData['audit.contactbusiness'];
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['audit.contactbusinesstext'];
				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['audit.contactperson'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['audit.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['audit.contactperson.surname'];
				ns1blankspace.data.membership = ns1blankspace.objectContextData['audit.agrisubscription.membership'];
				ns1blankspace.data.membershipText = ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'];
				ns1blankspace.data.subscription = ns1blankspace.objectContextData['audit.subscription'];
				ns1blankspace.data.subscriptionStatus = ns1blankspace.objectContextData['audit.agrisubscription.status'];

				if (ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.audit'] === '')
				{
					$('#ns1blankspaceControlCertificatesRow').hide();				
				}
				oParam.showStep = (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz) ? 1 : 2;
				nsFreshcare.admin.audit.show(oParam);
			}	
		}

		// v3.1.2 SUP022859 For JASANZ, we need to find the user ids of the CB so we can filter the notes
		else if (oParam.showStep == 1)
		{
			ns1blankspace.objectContextData.filterUsers = [];
			var oSearch = new AdvancedSearch();
			oSearch.method = 'SETUP_USER_SEARCH';
			oSearch.addField('username');
			oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContextData['audit.auditbusiness']);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					ns1blankspace.objectContextData.filterUsers = oResponse.data.rows;
					oParam.showStep = 2;
					nsFreshcare.admin.audit.show(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding CB users: ' + oResponse.error.errornotes);
				}
			});
		}

		// v3.3.001 Need to find any "Missing Trainee Details" emails saved against audit 
		else if (oParam.showStep == 2)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'ACTION_SEARCH';
			oSearch.addField('subject,message,duedatetime');
			oSearch.addFilter('actiontype', 'EQUAL_TO', '5');
			oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addFilter('subject', 'TEXT_STARTS_WITH', 'Missing Trainee Details');
			oSearch.sort('duedate', 'desc');
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					ns1blankspace.objectContextData.traineeEmails = oResponse.data.rows;
					oParam.showStep = 3;
					nsFreshcare.admin.audit.show(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding Missing Trainee emails: ' + oResponse.error.errornotes);
				}
			});
		}

		// v3.3.005 SUP0238001 Get Cert Body options
		else if (oParam.showStep == 3)
		{
			// v3.1.2 SUP022543 Need to set auditor values for each Audit when logged in as Admin to determine JASANZ date
			oParam.showStep = 10;
			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor)
			{
				oParam.onComplete = nsFreshcare.admin.audit.show;
				oParam.contactBusiness = ns1blankspace.objectContextData['audit.auditbusiness'];
				nsFreshcare.control.getCertificationBodyOptions(oParam);
			}
			else
			{
				nsFreshcare.admin.audit.show(oParam);
			}
		}

		else if (oParam.showStep == 10)
		{
			delete(oParam.showStep);

			var dActualDate = (ns1blankspace.objectContextData["audit.actualdate"] != '')
								? new Date(ns1blankspace.objectContextData["audit.actualdate"])
								: undefined;
			var sActualDate = (dActualDate) ? dActualDate.toString('dd MMM yyyy') : '';
			
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["audit.contactbusinesstext"] + 
						'<br />' + sActualDate);
			$('#ns1blankspaceControlContext').attr('data-id', ns1blankspace.data.contactBusiness);
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor)
			{
				ns1blankspace.app.context({inContext: false, 'new': true, action: false, actionOptions: (ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusConducted)});
			}

			// v3.4.008 SUP023952 Also checks if UnannouncedInitial
			if (ns1blankspace.objectContextData['audit.type'] === nsFreshcare.data.audit.typeInitial
				|| ns1blankspace.objectContextData['audit.type'] === nsFreshcare.data.audit.typeUnannouncedInitial) 
			{
				$('#ns1blankspaceControlEvaluation').show();
			}
			else if (ns1blankspace.objectContextData['audit.type'] === nsFreshcare.data.audit.typeScopeExtension) 
			{
				$('#ns1blankspaceControlExtension').show();
			}
			// Go back to Grower if they click on Grower name
			// v3.2.016 Was trying to access oRoot[nsFreshcare.user.roleID]
			$('#ns1blankspaceControlContext')
			.css('cursor', 'pointer')
			.click(function(event) 
			{
				var oRoot = ns1blankspace.rootnamespace;
				oRoot[nsFreshcare.user.role.toLowerCase()].grower.init({showHome: false});
				oRoot[nsFreshcare.user.role.toLowerCase()].grower.search.send('-' + $(this).attr('data-id'));
			});

			// v2.0.4 Removed search.send from newDestination and now passes object with id to init
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.admin.audit.init({id: ' + ns1blankspace.objectContext + ', role: "' + nsFreshcare.user.role + '"})',
				move: false
				});
			
			ns1blankspace.history.control(
				{
					functionDefault: ns1blankspace.rootnamespacetext + '.admin.audit.summary()', 
					xhtmlElementID: (nsFreshcare.user.roleID == nsFreshcare.data.roles.reviewer ? 'ns1blankspaceControlSummary' : undefined)
				});
		}
	},	
		
	attachmentsUploadValidate: function(oParam)
	{
		// v3.1.2 SUP022897 We need to validate the document type if passed
		var aAttachmentTypes = nsFreshcare.admin.audit.getAttachmentTypes() || [];
		var iMaxFiles = ns1blankspace.util.getParam(oParam, 'maxFiles', {'default': 1}).value;
		var aHTML = [];

		$('#ns1blankspaceUploadStatus').html('');

		if (aAttachmentTypes.length > 0 && $.grep(aAttachmentTypes, function(x) {return x.fileExtension}).length > 0)
		{
			// For each Attachment Type input that's been set, check if we need to validate the fileType
			$.each($('.ns1blankspaceAttachmentType'), function(i, element)
			{
				// Check if attachment type has been set
				if ($(element).val().split('-').length > 1 && $(element).val().split('-').pop() != '')
				{
					var iFile = $(element).val().split('-').shift();
					var sUploadType = $(element).val().split('-').pop();
					var oAttachmentType = $.grep(aAttachmentTypes, function(x) {return x.type == sUploadType}).shift();
					
					if (oAttachmentType && $('#oFile' + iFile).val() != '')
					{
						// Now we check if the uploaded file's extension matches the specified fileExtension for the atatchmenttype
						// v3.1.207 SUP023064 May be multiple file extensions allowed
						if (oAttachmentType.fileExtension.indexOf($('#oFile' + iFile).val().split('.').pop().toLowerCase()) == -1)
						{
							aHTML.push('Attachments of type "' + $(element).find('option:selected').text() + 
										'" must have a file extension of .' + 
											oAttachmentType.fileExtension.split(',').join(', .'));
						}
					}

				}
			});

			if (aHTML.length > 0)
			{
				$('#ns1blankspaceUploadStatus').html(aHTML.join('<br />'));
				return false;
			}
			else {return true;}
		}
		else
		{
			return true;
		}
	},

	summary: 	function ()
	{
		// v3.3.001 SUP023474 Showing reviewer actions no longer JASANZ dependent
		var aHTML = [];
		var dAudit;
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this audit.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer)
			{
				nsFreshcare.admin.audit.reviewerSummary();
			}
			else
			{
				dAudit = new Date(ns1blankspace.objectContextData['audit.actualdate']);

				aHTML.push('<table class="ns1blankspaceMain">' +
							'<tr class="ns1blankspaceRow">' +
							'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
							'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:170px;"></td>' +
							'</tr>' +
							'</table>');				
				
				$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
			
				var aHTML = [];
			
				aHTML.push('<table class="ns1blankspace">');
				
				if (ns1blankspace.objectContextData['audit.contactbusinesstext'] != '')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">' + nsFreshcare.data.growerText + ' Business</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.objectContextData['audit.contactbusinesstext'] +
								'</td></tr>');
				}

				if (ns1blankspace.objectContextData['audit.contactperson.firstname'] + ns1blankspace.objectContextData['audit.contactperson.surname'] != '')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Audit Contact</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.objectContextData['audit.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['audit.contactperson.surname'] +
								'</td></tr>');
				}

				if (ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'] != '')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'] + ' (' + ns1blankspace.objectContextData['audit.codeofpracticetext'] + ')' +
								'</td></tr>');
				}				
				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) {

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certification Body</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['audit.auditbusinesstext'] +
									'</td></tr>');
				}

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Auditor</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.objectContextData['audit.auditpersontext'] +
								'</td></tr>');

				if (ns1blankspace.objectContextData['audit.teamleadercontactpersontext'] != '')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Reviewer</td></tr>' +
								'<tr><td class="ns1blankspaceSummary"' +
										' data-email="' + ns1blankspace.objectContextData['audit.teamleadercontactperson.email'] + '"' + 
										' data-id="' + ns1blankspace.objectContextData['audit.teamleadercontactperson'] + '">' +
									ns1blankspace.objectContextData['audit.teamleadercontactpersontext'] +
									'</td></tr>');
				}

				if (ns1blankspace.objectContextData['audit.actualdate'] != '') 
				{
					
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Audit Date</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['audit.actualdate'] +
									'</td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Result Status</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['audit.resultstatustext'] +
									'</td></tr>');
				}
				else {

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Scheduled Date</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['audit.scheduleddate'] +
									'</td></tr>');							
				}

				// v3.4.015 SUP023959 Added
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Re-Certification Audit Due</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
									nsFreshcare.util.getMonthName((ns1blankspace.objectContextData['audit.serecertauditmonth'] != ''
										? ns1blankspace.objectContextData['audit.serecertauditmonth']
										: ns1blankspace.objectContextData['audit.agrisubscription.expirymonth'])) +
									'</td></tr>');

				// v3.3.001 SUP023422 List Qualifying Training
				if (nsFreshcare.option.qualifyingTraining)
				{
					// v4.0.019 Changed sequalifyingtraininglink to sequalifyingtraininglink.id
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Qualifying Training</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">');
					if (ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'] != '' 
						&& ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'] != '0') 
					{
						aHTML.push('<table class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Training Date</td>' +
										'<td class="ns1blankspaceHeaderCaption">COP</td>' +
										'<td class="ns1blankspaceHeaderCaption">Attendee Business</td>' +
										'<td class="ns1blankspaceHeaderCaption">Attendee</td>' +
										'<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
										'<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
									'<tr>');
						
						var dToday = new Date();
						var dExpiry = (this['agrisubscription.agricertificate.enddate'] != '') 
										? (new Date(this['agrisubscription.agricertificate.enddate'])) 
										: undefined;
						var bCertified = (dExpiry && dExpiry > dToday);

						aHTML.push('<tr><td class="ns1blankspaceRow">' + 
										ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.course.coursedate'] + 
										'<br /><span class="ns1blankspaceSubNote">' + ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.course.statustext']  + '</span>' + 
									'</td>');
						aHTML.push('<td class="ns1blankspaceRow">' + 
										ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.course.package.membership.code'] + ' ' +
										ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.course.package.codeofpracticetext'] + '</td>');
						aHTML.push('<td class="ns1blankspaceRow">' + 
										ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.traineecontactbusinesstext'] + '</td>');
						aHTML.push('<td class="ns1blankspaceRow">' + 
										ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.attendingtrainee'] + '</td>');			
						aHTML.push('<td class="ns1blankspaceRow"><span id="ns1blankspaceSummaryTraineeLinkGoTo"></span></td>');	
						aHTML.push('</tr>');
						aHTML.push('</table>');
					} 
					else 
					{
						aHTML.push('<tr><td colspan="5" class="ns1blankspace">No Qualifying Training registered')
					} 
				}

				aHTML.push('</td></tr>');	

						
				aHTML.push('</table>');					
				
				$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

				aHTML = [];

				aHTML.push('<table class="ns1blankspaceColumn2">');
				aHTML.push('<tr><td><span id="ns1blankspaceAttachDocuments" class="ns1blankspaceAction" style="width:150px;">' +
							'Attach Documents</span></td></tr>');

				aHTML.push('<tr><td><span id="ns1blankspaceAddNote" class="ns1blankspaceAction" style="width:150px;">' +
							'Add Note</span></td></tr>');

				if (ns1blankspace.objectContextData['audit.resultstatus'] === nsFreshcare.data.audit.resultStatusAwaitingReview
					&& ns1blankspace.objectContextData['audit.teamleadercontactperson'] === '')
				{
					aHTML.push('<tr><td><span id="ns1blankspaceAssignReviewer" class="ns1blankspaceAction" style="width:150px;">' +
								'Assign to Reviewer</span></td></tr>');
				}
				else if (ns1blankspace.objectContextData['audit.teamleadercontactperson'] != '' 
					&& (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin || nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) )
				{
					aHTML.push('<tr><td><span id="ns1blankspaceRemoveReviewer" class="ns1blankspaceAction" style="width:150px;">' +
								'Remove Reviewer</span></td></tr>');
				}

				// Add a button to notify Freshcare to reinstate
				if (ns1blankspace.objectContextData['audit.agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD)
				{
					aHTML.push('<tr><td><span id="ns1blankspaceGrowerReinstateNotification" class="ns1blankspaceAction" style="width:150px;">' +
								'Notify Freshcare to Reinstate</span></td></tr>');
				}

				if (ns1blankspace.objectContextData.email != '' 
					&& ns1blankspace.objectContextData['audit.resultstatus'] === nsFreshcare.data.audit.resultStatusPending)
				{	
					var aHTML = [];
			
					aHTML.push('<tr><td><span id="ns1blankspaceGrowerCARNotification" class="ns1blankspaceAction" style="width:150px;">' +
								'Notify ' + nsFreshcare.data.growerText + '</span></td></tr>');
				}

				aHTML.push('</table>');					
			
				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
				
				nsFreshcare.admin.audit.summaryBind();
			}
		}	
	},

	reviewerSummary: function()
	{
		// v3.3.001 SUP023474 Showing approval options no longer dependent on JASANZ date
		var oRoot = ns1blankspace.rootnamespace;

		aHTML = [];

		aHTML.push('<table class="ns1blankspaceMain">' +
					'<tr class="ns1blankspaceRow">' +
					'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
					'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:170px;"></td>' +
					'</tr>' +
					'</table>');				
		
		$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
	
		var aHTML = [];
		var sPhone = (ns1blankspace.objectContextData['audit.contactperson.mobile'] != '') 
						? ns1blankspace.objectContextData['audit.contactperson.mobile']
						: ns1blankspace.objectContextData['audit.contactperson.workphone'];
	
		aHTML.push('<table class="ns1blankspace">');
		
		if (ns1blankspace.objectContextData['audit.contactbusinesstext'] != '')
		{
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">' + nsFreshcare.data.growerText + ' Business</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.contactbusinesstext'] +
						'</td></tr>');
		}

		if (ns1blankspace.objectContextData['audit.contactperson.firstname'] + ns1blankspace.objectContextData['audit.contactperson.surname'] != '')
		{
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Audit Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['audit.contactperson.surname'] +
						((sPhone != '') ? ' (Phone: ' + sPhone + ')' : '') + 
						'</td></tr>');
		}

		if (ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'] != '')
		{
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'] + ' (' + ns1blankspace.objectContextData['audit.codeofpracticetext'] + ')' +
						'</td></tr>');
		}				
		
		aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Auditor</td></tr>' +
					'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.auditpersontext'] +
						'</td></tr>');

		aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Audit Date</td></tr>' +
					'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.actualdate'] +
						'</td></tr>');

		aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Result Status</td></tr>' +
					'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.resultstatustext'] +
						'</td></tr>');
				
		aHTML.push('</table>');					
		
		$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

		aHTML = [];

		aHTML.push('<table class="ns1blankspaceColumn2">');

		// v3.2.025 Conditionally show buttons
		if (ns1blankspace.option.preventUpdates != true)
		{
			aHTML.push('<tr><td><span id="ns1blankspaceAttachDocuments" class="ns1blankspaceAction" style="width:150px;">' +
						'Attach Documents</span></td></tr>');

			aHTML.push('<tr><td><span id="ns1blankspaceAddNote" class="ns1blankspaceAction" style="width:150px;">' +
						'Add Note</span></td></tr>');

			if (ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusApproved)
			{
				aHTML.push('<tr><td><span id="ns1blankspaceApprove" class="ns1blankspaceAction" style="width:150px;">' +
							'Approve</span></td></tr>');
			}

			if (ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusRejected)
			{
				aHTML.push('<tr><td><span id="ns1blankspaceReject" class="ns1blankspaceAction" style="width:150px;">' +
							'Reject</span></td></tr>');
			}

			// v3.1.2 SUP022693 If Conditional Approval defined on rootnamespace, then show 'Conditionally Approve'
			if (oRoot.data.audit.resultStatusConditionalApproval 
				&& ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusConditionalApproval)
			{
				aHTML.push('<tr><td><span id="ns1blankspaceConditional" class="ns1blankspaceAction" style="width:150px;">' +
							'Conditionally Approve</span></td></tr>');
			}
		}
		
		aHTML.push('</table>');					
	
		$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

		nsFreshcare.admin.audit.summaryBind();
	},

	summaryBind: function()
	{
		var oRoot = ns1blankspace.rootnamespace;
		var oAuditRoot = (oRoot.admin && oRoot.admin.audit) ? oRoot.admin.audit : nsFreshcare.admin.audit;
		$('#ns1blankspaceGrowerCARNotification').button(
		{
			label: 'Notify ' + nsFreshcare.data.growerText + ' of CARs',
			icons:
			{
				primary: "ui-icon-alert"
			}
		})
		.click(function()
		{
			// v2.0.3g SUP021387 now passes contactBusiness
			// v2.0.4 SUP021408 Added auditMembership parameter & split first & surname
			var sAuditorPersonText = ns1blankspace.objectContextData['audit.auditpersontext'].split(',').pop() + ' ' + 
									ns1blankspace.objectContextData['audit.auditpersontext'].split(',').shift();
			nsFreshcare.admin.auditcar.notifyFreshcare(
			{
				audit: ns1blankspace.objectContext,
				contactBusiness: ns1blankspace.objectContextData["audit.contactbusiness"],
				contactBusinessText: ns1blankspace.objectContextData["audit.contactbusinesstext"],
				contactPerson: ns1blankspace.objectContextData["audit.contactperson"],
				contactPersonFirstName: ns1blankspace.objectContextData["audit.contactperson.firstname"], 
				contactPersonSurname: ns1blankspace.objectContextData["audit.contactperson.surname"],
				contactPersonEmail: ns1blankspace.objectContextData["audit.contactperson.email"],
				auditDate: ns1blankspace.objectContextData['audit.actualdate'],
				auditMembershipText: ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'],
				auditorPersonText: sAuditorPersonText,
				cars: ns1blankspace.objectContextData.cars
			});
		});

		$('#ns1blankspaceGrowerReinstateNotification').button(
		{
			label: 'Notify Freshcare to Reinstate',
			icons:
			{
				primary: "glyphicon-warning-sign"
			}
		})
		.click(function()
		{
			nsFreshcare.auditor.grower.reinstateWithdrawnMembership(
			{
				membershipText: ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'],
				contactPersonText: ns1blankspace.objectContextData["audit.contactperson.firstname"] + ' ' + ns1blankspace.objectContextData["audit.contactperson.surname"],
				contactBusiness: ns1blankspace.objectContextData["audit.contactbusiness"],
				contactBusinessText: ns1blankspace.objectContextData["audit.contactbusinesstext"]
			});
		});

		$('#ns1blankspaceAttachDocuments')
			.button({label: 'Attach Documents'})
			.on('click', function()
			{
				// 1.0.0e SUP021733 Now uses auditorAttachments instead of requiredAttachmenttypes
				// v3.1.209 SUP023095 Now checks to see if namespace has it's own attachments code and calls that

				if (oAuditRoot.attachments && ns1blankspace.rootnamespacetext != 'nsFreshcare')
				{
					oAuditRoot.attachments({action: 'add'});
				}
				else
				{	// v3.4.006 Moved aAttchmentTypes to function
					nsFreshcare.admin.audit.attachments({action: 'add', attachmentTypes: nsFreshcare.admin.audit.getAttachmentTypes()});
				}


			});

		$('#ns1blankspaceAssignReviewer')
			.button({label: 'Assign Reviewer'})
			.on('click', function(event)
			{
				nsFreshcare.admin.audit.assignReviewer({anyBusiness: ($(this).attr('data-anyBusiness') == "true")});
			});

		$('#ns1blankspaceRemoveReviewer')
			.button({label: 'Remove Reviewer'})
			.on('click', function(event)
			{
				// v3.2.019 SUP023533 Need to call namespace specific save function
				ns1blankspace.rootnamespace.admin.audit.save.send({removeReviewer: true});
			});

		$('#ns1blankspaceAddNote')
			.button({label: 'Add Note'})
			.on('click', function()
			{
				nsFreshcare.internal.entity.notes.add(
				{
					object: nsFreshcare.objectAudit,
					objectContext: ns1blankspace.objectContext,
					contactBusiness: ns1blankspace.objectContextData['audit.contactbusiness'],
					functionPostSave: nsFreshcare.internal.entity.notes.postSave,
					actionTypes: [nsFreshcare.data.actionTypeUserNotes, nsFreshcare.data.actionTypeRecertAuditLate]
				});
			});

		$('#ns1blankspaceApprove')
			.button({label: 'Approve'})
			.on('click', function()
			{
				// v3.1.209 Now uses rootnamespace save if exists
				// First validate  and then save
				if (oAuditRoot.save && oAuditRoot.save.send)
				{
					oAuditRoot.save.send({resultStatus: nsFreshcare.data.audit.resultStatusApproved, onComplete: oAuditRoot.save.send});
				}
				else
				{
					ns1blankspace.container.confirm({title: 'Cannot Approve!', html: 'There is an error with this app. Please contact support'})
				}
			});

		$('#ns1blankspaceReject')
			.button({label: 'Reject'})
			.on('click', function()
			{
				// v3.1.209 Now uses rootnamespace save if exists
				// First validate and then save
				if (oAuditRoot.save && oAuditRoot.save.send)
				{
					oAuditRoot.save.send({buttonElement: this, resultStatus: nsFreshcare.data.audit.resultStatusRejected, onComplete: oAuditRoot.save.send});
				}
				else
				{
					ns1blankspace.container.confirm({title: 'Cannot Reject!', html: 'There is an error with this app. Please contact support'})
				}
			});

		$('#ns1blankspaceConditional')
			.button({label: 'Conditionally Approve'})
			.on('click', function()
			{
				// v3.1.209 Now uses rootnamespace save if exists
				// First validate and then save
				if (oAuditRoot.save && oAuditRoot.save.send)
				{
					oAuditRoot.save.send({buttonElement: this, resultStatus:  oRoot.data.audit.resultStatusConditionalApproval, onComplete: oAuditRoot.save.send});
				}
				else
				{
					ns1blankspace.container.confirm({title: 'Cannot Reject!', html: 'There is an error with this app. Please contact support'})
				}
			});

		if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin && nsFreshcare.option.qualifyingTraining)
		{
			$('#ns1blankspaceSummaryTraineeLinkGoTo')
			.button({icons: {primary: 'glyphicon-play'}, text: 'View Training Attendance'})
			.on('click', function()
			{
				nsFreshcare.admin.attendance.init({id: ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.id']});
			});
		}
	},

	getAttachmentTypes: function()
	{
		// We don't just call audit.attachments here as attachmentTypes are different depending on role
		// v3.1.214 SUP023247 attachmentTypes are replicated from attachments tab 
		var sRole = nsFreshcare.user.roleID;
		var aAttachmentTypes = (sRole == nsFreshcare.data.roles.admin || sRole == nsFreshcare.data.roles.auditor || sRole == nsFreshcare.data.roles.reviewer || sRole == nsFreshcare.data.roles.jasanz || sRole == nsFreshcare.data.roles.internalAuditor) 
								? nsFreshcare.data.audit.auditorAttachments.concat(nsFreshcare.data.audit.reviewerRequiredAttachmentTypes)
								: undefined;
		return aAttachmentTypes;
	},

	attachments: function(oParam)
	{
		// v3.1.209 Moved to own function 
		// v3.4.007 ReadOnly variable used to disable if completed or lapsed audit
		// v3.4.008 SUP023064 Don't allow non-Admin to change a non-PDF Internal Doc to an Audit Report
		var sAction = ns1blankspace.util.getParam(oParam, 'action', {'default': 'search'}).value.toLowerCase();
		var aAttachmentTypes = ns1blankspace.util.getParam(oParam, 'attachmentTypes', {'default': []}).value;
		var sRole = nsFreshcare.user.roleID;
		var sHelpNotes = ns1blankspace.util.getParam(oParam, 'helpNotes', 
				{'default': "Documents of type 'Audit Report' are viewable by " + nsFreshcare.data.growersText + 
							". Please upload PDF documents only to prevent modification of audit reports."}).value;
		var bReadOnly = nsFreshcare.admin.audit.readOnly 
						|| (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
							&& (ns1blankspace.objectContextData['audit.membershipstatus'] == '-1'
								|| ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusCompleted))
		var fFunctionValidateType = (!bReadOnly && sRole != nsFreshcare.data.roles.admin)
									? nsFreshcare.admin.audit.validateAttachmentType
									: undefined;

		if (sAction == 'search')
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});

			// v3.1.2 SUP022897 Added helpNotes
			// v3.2.010 Removed attachmentType as was causing errors with 1blankspace.attachments
			nsFreshcare.admin.grower.attachments.search(
			   	{
				   	object: nsFreshcare.objectAudit, 
					objectContext: ns1blankspace.objectContext,
					actions: {add: !bReadOnly},
					maxFiles: 5, 
					attachmentTypes: aAttachmentTypes,
					functionPostUpdate: nsFreshcare.admin.grower.attachments.search,
					canRemoveAll: ((sRole == nsFreshcare.data.roles.reviewer || bReadOnly) ? false : true),
					canSetTypeAll: ((sRole == nsFreshcare.data.roles.reviewer || bReadOnly) ? false : true),
					functionValidate: nsFreshcare.admin.audit.attachmentsUploadValidate,
					functionValidateType: fFunctionValidateType,
					helpNotes: sHelpNotes
			   	});
		}
		else if (sAction == 'add')
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAttachments'/*, refresh: true*/});
			$('#ns1blankspaceMainAttachments')
				.html('<table><tr>' +
						'<td id="ns1blankspaceAttachmentsColumn1" class="ns1blankspaceColumn1Flexible">' +
						ns1blankspace.xhtml.loading + '</td>' +
						'<td id="ns1blankspaceAttachmentsColumn2" class="ns1blankspaceColumn2" style="width:100px; font-size:0.75em;">' +
							sHelpNotes +
						'</td></tr>' +
						'</table>');

			// v3.4.006 New version of 1bs.control
			ns1blankspace.attachments.add.file(
			{
				xhtmlElementID: 'ns1blankspaceMainAttachments',
				actions: {add: true},
				maxFiles: 5, 
				canRemoveAll: ((nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer) ? false : true),
				canSetTypeAll: ((nsFreshcare.user.roleID === nsFreshcare.data.roles.reviewer) ? false : true),
				attachmentTypes: aAttachmentTypes,
				attachmentType: $.map(aAttachmentTypes, function(x) {return x.type}).join(','),
				functionValidate: nsFreshcare.admin.audit.attachmentsUploadValidate,
				functionValidateType: fFunctionValidateType,
				functionPostUpdate: nsFreshcare.admin.grower.attachments.search
			});
		}
	},

	validateAttachmentType: function(oParam)
	{
		var sID = ns1blankspace.util.getParam(oParam, 'attachmentId').value;
		var oElement = ns1blankspace.util.getParam(oParam, 'element').value;
		var sFileName = $('#ns1blankspaceAttachment_filename-' + sID).attr('data-filename');
		var sNewType = $(oElement).attr('id').split('_').pop();

		if (sNewType == nsFreshcare.data.attachmentTypeAuditReport
			&& sFileName.split('.').pop().toLowerCase() != 'pdf')
		{
			ns1blankspace.okToSave = false;
			ns1blankspace.status.error('Audit Report documents must be PDF documents to prevent modification.')
		}
		nsFreshcare.admin.grower.attachments.manageType(oParam);
	},

	details: 	function ()
	{
		// v3.3.001 SUP023474 Showing JASANZ options no longer required as apply across the board for Freshcare
		var aHTML = [];
		var dToday = new Date();
		var dAudit = ns1blankspace.objectContext == -1 ? undefined : (new Date(ns1blankspace.objectContextData['audit.actualdate']));

		// Set up filtered list for Resulting membership Status
		if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
		{
			// v3.1.210 SUP023240 Had to change Audit Lapsed to _1 as search was using "-" to split id of result and ending up with ""
			var aValidValues =  [
									{id: nsFreshcare.data.grower.subscriptionStatusIP, title: 'Initial Pending'},
									{id: nsFreshcare.data.grower.subscriptionStatusIN, title: 'Initial Assessment'},
									{id: nsFreshcare.data.grower.subscriptionStatusCP, title: 'Certification Pending'},
									{id: nsFreshcare.data.grower.subscriptionStatusCE, title: 'Certification Recommended'},
									{id: nsFreshcare.data.grower.subscriptionStatusSP, title: 'Suspended'},
									{id: "_1", title: 'Audit Lapsed'},
								]
			var oStatusObject = {method: "SETUP_MEMBERSHIP_SUBSCRIPTION_STATUS_SEARCH",
										 xhtmlElementID: undefined, 
										 data: 
											{
												rows: aValidValues
											},
										 rows: aValidValues
										};
			if ($.grep(ns1blankspace.data.search, function(x) {return x.method === 'SETUP_MEMBERSHIP_SUBSCRIPTION_STATUS_SEARCH'}).length > 0)
			{
				ns1blankspace.data.search = $.map(ns1blankspace.data.search, function(x) 
																			 {return (x.method === 'SETUP_MEMBERSHIP_SUBSCRIPTION_STATUS_SEARCH') ? oStatusObject: x});
			}
			else
			{
				ns1blankspace.data.search.push(oStatusObject);
			}

			// v3.3.001 SUP023474 Now sets this on new and existing record on this tab for admin users
			nsFreshcare.data.auditor = {};
		}

		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainDetails').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainDetails').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Reference' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Title' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Title"' +
								' data-method="SETUP_AUDIT_TYPE_SEARCH"' +
								' data-click="nsFreshcare.admin.audit.showExtraTabs">' +
							'</td></tr>');			
							
			// v3.1.1f Was including relationshipother filter when logged in as admin
			// v3.1.2 SUP022744 Changed to businessgroup filter
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							nsFreshcare.data.growersText + ' Business' +
							'</td></tr>' +
							'<tr class="ns1blankspaceSelect">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsGrowerBusiness" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="Grower Business"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' + 
								' data-columns="contactbusiness.tradename"' +
								' data-click="nsFreshcare.util.defaultContactPerson"' + 
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|streetsuburb-TEXT_IS_LIKE|' +
													'contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + 
													(nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
		 												? '|contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' + 
		 													'contactbusiness.relationshipotherbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipAuditor + '|' +
		 													'contactbusiness.relationshipotherbusiness.startdate-LESS_THAN_OR_EQUAL_TO-' + dToday.toString("dd MMM yyyy") + '|' +
		 													'contactbusiness.relationshipotherbusiness.enddate-IS_NULL-'
		 												: '') +
									'">' +
							'</td></tr>');							
							
			// v3.1.1f Was including relationshipother filter when logged in as admin
			// v3.1.2 SUP022744 CHanged to businessgroup filter
			// v3.1.201 typo in person filter
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'Audit Contact' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsGrowerPerson" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="Audit Contact"' +
								' data-method="CONTACT_PERSON_SEARCH"' +
								' data-columns="firstname-space-surname"' +
								' data-methodFilter="firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
													'contactperson.contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '|' +
													(nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
														? '|contactperson.relationshipotherperson.contactperson-EQUAL_TO-' + ns1blankspace.user.contactPerson +'|' +
															'contactperson.relationshipotherperson.type-EQUAL_TO-' + nsFreshcare.data.relationshipAuditor +'|"' +
															'contactperson.relationshipotherperson.startdate-LESS_THAN_OR_EQUAL_TO-' + dToday.toString("dd MMM yyyy") + '|' +
															'contactperson.relationshipotherperson.enddate-IS_NULL-'
														: '' ) + '"' +
								' data-Parent="ns1blankspaceDetailsGrowerBusiness"' +
								' data-parent-search-id="contactbusiness"' +
								' data-parent-search-text="contactperson.contactbusinesstext">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Membership' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsMembership" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Membership"' +
								' data-method="AGRI_SUBSCRIPTION_SEARCH"' +
								' data-columns="membershiptext"' +
								' data-parent="ns1blankspaceDetailsGrowerBusiness"' +
								' data-parent-search-id="contactbusiness"' +
								' data-parent-search-text="tradename"' + 
								' data-click="nsFreshcare.admin.audit.setMembershipId">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Code of Practice' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsCOP" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Code of Practice"' +
								' data-method="AGRI_CODE_OF_PRACTICE_SEARCH"' +
								/* 2.0.4f removed ' data-methodFilter="isdefault-EQUAL_TO-Y"' + */
								' data-columns="code-space-description">' +
							'</td></tr>');

			// v3.1.2 No longer needed to be shown in UI
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideForNonAdmin" style="display:none;">' +
							'<td class="ns1blankspaceCaption">' +
							'Scheduled Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceHideForNonAdmin" style="display:none;">' +
							'<td class="ns1blankspaceDate">' +
							'<input id="ns1blankspaceDetailsScheduledDate" class="ns1blankspaceDate">' +
							'</td></tr>');			

			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Audit Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceDate">' +
							'<input id="ns1blankspaceDetailsActualDate" class="ns1blankspaceDate"' + 
								' data-mandatory="1" data-caption="Audit Date">' +
							'</td></tr>');			
			
			// v3.3.001 SUP023782 Added
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Audit Duration<br /><span class="ns1blankspaceSubNote">(Hours in half-hour increments)</span>' +
							'</td></tr>' +
							'<tr class="ns1blankspaceSelect">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsAuditDuration" class="ns1blankspaceText"' +
								' data-caption="Audit Duration" data-mandatory="1"' +
							'></td></tr>');							
							
			// v3.1.2 No longer needed to be shown in UI
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideForNonAdmin" style="display:none;">' +
							'<td class="ns1blankspaceCaption">' +
							'Audit Status' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText ns1blankspaceHideForNonAdmin" style="display:none;">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsStatus" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Audit Status"' +
								' data-method="SETUP_AUDIT_STATUS_SEARCH">' +
							'</td></tr>');
							
			// v3.3.001 SUP023474 No longer shows 'No Result' in drop-down
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Result Status' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsResultStatus" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Result Status"' +
								' data-click="nsFreshcare.admin.audit.showResultStatusDate"' +
								' data-method="SETUP_AUDIT_RESULT_STATUS_SEARCH"' +
								' data-methodFilter="id-NOT_EQUAL_TO-1"' + 
								' data-methodSortColumn="displayorder" data-methodsortDirection="asc">' +
							'</td></tr>');
				
			aHTML.push('<tr id="ns1blankspaceDetailsResultStatusDateCaption" class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'<span class="ns1blankspaceCaption" style="valign:bottom;">Date Result Achieved</span>' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsResultStatusDateValue" class="ns1blankspace">' +
							'<td class="ns1blankspaceDate">' +
							'<input id="ns1blankspaceDetailsResultStatusDate" class="ns1blankspaceDate">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Certification Body' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace"');

			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
			{
				// v3.1.2 SUP022744 Changed so that search is business-centric
				aHTML.push('><input id="ns1blankspaceDetailsCertBody" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Certification Body"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' + 
								' data-columns="tradename"' + 
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|' +
									  'contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupAuditor + '|' + 
									  'contactbusiness.supplierstatus-EQUAL_TO-' + nsFreshcare.data.contactStatusActive + '"');
				// v3.3.001 SUP023474 Added data-click
				if (nsFreshcare.option.jasanzAccreditation)
				{	
					aHTML.push(' data-click="nsFreshcare.control.getCertificationBodyOptions"');
				}
			}
			else 
			{
				aHTML.push(' id="ns1blankspaceDetailsCertBody">' + ns1blankspace.user.contactBusinessText);
			}
			aHTML.push('</td></tr>');							
							
			// v3.1.2 SUP022864 Added filter for supplierstaus
			// v3.3.001 SUP023603 Now looks at agrimembershiptrainer to ensure Auditor is allowed to audit current Membership
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'Auditor' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsAuditor" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Auditor"' +
								' data-method="AGRI_MEMBERSHIP_TRAINER_SEARCH"' +
								' data-idcolumn="agrimembershiptrainer.trainercontactperson"' +
								' data-columns="agrimembershiptrainer.trainercontactperson.firstname-space-agrimembershiptrainer.trainercontactperson.surname"' +
								' data-methodFilter="agrimembershiptrainer.trainercontactperson.firstname-TEXT_IS_LIKE' +
													'|agrimembershiptrainer.trainercontactperson.surname-TEXT_IS_LIKE' +
													'|agrimembershiptrainer.trainercontactperson.persongroup-IN_LIST-' + nsFreshcare.data.groupAuditor.join(',') +
													'|agrimembershiptrainer.trainercontactperson.supplierstatus-EQUAL_TO-' + nsFreshcare.data.contactStatusActive);

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) 
			{
				aHTML.push('|agrimembershiptrainer.trainercontactperson.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness) ;
			}
			aHTML.push('" data-parent="ns1blankspaceDetailsCertBody"' +
								' data-parent-search-id="agrimembershiptrainer.trainercontactperson.contactbusiness">' +
							'</td></tr>');

			// Stores id of Membership (as opposed to Subscription). Set when Subscription is selected
			aHTML.push('<tr id="ns1blankspaceDetailsMembershipHide"><td id="ns1blankspaceDetailsMembershipValue"></td><tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
			$('#ns1blankspaceDetailsMembershipStatusCaption').hide();
			$('#ns1blankspaceDetailsMembershipStatusValue').hide();
			$('#ns1blankspaceDetailsResultStatusDateCaption').hide();
			$('#ns1blankspaceDetailsResultStatusDateValue').hide();
			$('#ns1blankspaceDetailsMembershipHide').hide();

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) {
				$('.ns1blankspaceHideForNonAdmin').hide();
			}

			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) 
			{
				$('#ns1blankspaceDetailsResultStatusDate').attr('disabled', true);
				$('#ns1blankspaceDetailsResultStatusDate').addClass('nsFreshcareDisabled')
			}

			// v4.0.006 SUP024066 Datepick on change event wasn't firing
			$('#ns1blankspaceDetailsActualDate').on('dp.change', function(e) {nsFreshcare.admin.audit.setJASANZAuditFlag(e.date)});
			$('#ns1blankspaceDetailsCertBody').on('change', nsFreshcare.admin.audit.setJASANZAuditFlag);

			var aHTML = [];
				
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Details / Notes' +
							'</td></tr>' +
							'<tr class="ns1blankspaceTextMulti">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsDescription" class="ns1blankspaceTextMulti"' +
								' style="width: ' + (parseInt($('#ns1blankspaceDetailsColumn2').width()) - 5) + 'px;"' +
							'></textarea>' +
							'</td></tr>');
			
			aHTML.push('<tr id="ns1blankspaceDetailsLateLoggedNoteCaption" class="ns1blankspaceCaption" style="display:none;">' +
							'<td class="ns1blankspaceCaption">' +
							'Reason for Late Lodgement of Audit' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsLateLoggedNoteValue" class="ns1blankspaceTextMulti" style="display:none;">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsLateLoggedNote" class="ns1blankspaceTextMulti"' +
								' style="width: ' + (parseInt($('#ns1blankspaceDetailsColumn2').width()) - 5) + 'px;"' +
							'></textarea>' +
							'</td></tr>');
			
			// v3.1.2 SUP022574 Added new field
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							"Audit Paid?: "+
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceRadio">' +
							'<input type="radio" id="radioPaid1" name="radioPaid" value="Y" data-label="Yes"/>Yes&nbsp;&nbsp;&nbsp;' +
							'<input type="radio" id="radioPaid2" name="radioPaid" value="N" data-label="No"/>No' +
							'</td></tr>');

			// v3.3.001 SUP023474 Added new field
			// 4.0.019 SUO024339 Added IOAS flag
			if (nsFreshcare.option.jasanzAccreditation)
			{
				aHTML.push('<tr class="ns1blankspace ns1blankspaceShowIfJASANZ">' +
								'<td class="ns1blankspaceCaption">' +
								"JASANZ Audit?: "+
								'</td></tr>' +
								'<tr class="ns1blankspace ns1blankspaceShowIfJASANZ">' +
								'<td class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioJASANZ1" name="radioJASANZ" value="Y" data-label="Yes"/>Yes&nbsp;&nbsp;&nbsp;' +
								'<input type="radio" id="radioJASANZ2" name="radioJASANZ" value="N" data-label="No"/>No' +
								'</td></tr>');

				aHTML.push('<tr class="ns1blankspace ns1blankspaceShowIfIOAS">' +
								'<td class="ns1blankspaceCaption">' +
								"IOAS Audit?: "+
								'</td></tr>' +
								'<tr class="ns1blankspace ns1blankspaceShowIfIOAS">' +
								'<td class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioIOAS1" name="radioIOAS" value="Y" data-label="Yes"/>Yes&nbsp;&nbsp;&nbsp;' +
								'<input type="radio" id="radioIOAS2" name="radioIOAS" value="N" data-label="No"/>No' +
								'</td></tr>');
			}

			// v3.3.001 SUP023563 Added Re-Cert Audit Due month. 
			// v3.3.005 SUP023800 Show for admin or for auditors when the Audit is completed and is the audit for the current cert
			if (ns1blankspace.objectContext != -1
				&& (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin
				|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor 
					&& ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusCompleted
					&& ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.audit'] == ns1blankspace.objectContext)))
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption">' +
								"Re-Cert Audit Due: "+
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceSelect">' +
								'<input id="ns1blankspaceDetailsRecertAuditMonth" class="ns1blankspaceSelect"' +
									' data-method="FRESHCARE_MONTH_SEARCH"' +
									' data-cache="true"' +
								'</td></tr>');
			}

			if (ns1blankspace.objectContext != -1) 
			{

				// v4.0.012 SUP024144 Added new field
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption">' +
								"Months Certificate Extended by: "+
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText' +
								(nsFreshcare.user.roleID === nsFreshcare.data.roles.admin
									? '"><input id="ns1blankspaceDetailsExtensionMonths" class="ns1blankspaceText">'
									: ' ns1blankspaceReadOnly" id="ns1blankspaceDetailsExtensionMonths">') +
								'</td></tr>');

				aHTML.push('<tr id="ns1blankspaceDetailsMembershipStatusCaption" class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Resulting Membership Status' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsMembershipStatusValue" class="ns1blankspace">' + 
								'<td class="ns1blankspace"');

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
				{
					aHTML.push('><input id="ns1blankspaceDetailsMembershipStatus" class="ns1blankspaceSelect" ' +
								' data-cache="true"' + 
								' data-method="SETUP_MEMBERSHIP_SUBSCRIPTION_STATUS_SEARCH"' +
								' data-click="nsFreshcare.admin.audit.setMembershipStatusID">')
				}
				else
				{
					aHTML.push(' id="ns1blankspaceDetailsMembershipStatus" class="ns1blankspaceReadOnly">&nbsp;</td></tr>');
				}
				
				aHTML.push('<tr><td>&nbsp;</td></tr>');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Created By' +
								'</td></tr>' +
								'<tr  class="ns1blankspace">' + 
								'<td id="ns1blankspaceDetailsCreatedBy" class="ns1blankspaceReadOnly">&nbsp;' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Created On' +
								'</td></tr>' +
								'<tr  class="ns1blankspace">' + 
								'<td id="ns1blankspaceDetailsCreatedOn" class="ns1blankspaceReadOnly">&nbsp;' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Modified By' +
								'</td></tr>' +
								'<tr  class="ns1blankspace">' + 
								'<td id="ns1blankspaceDetailsModifiedBy" class="ns1blankspaceReadOnly">&nbsp;' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Modified On' +
								'</td></tr>' +
								'<tr  class="ns1blankspace">' + 
								'<td id="ns1blankspaceDetailsModifiedOn" class="ns1blankspaceReadOnly">&nbsp;' +
								'</td></tr>');
			}

			aHTML.push('</table>');					
				
			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));


			ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) 
			{
				$('#ns1blankspaceDetailsCertBody').addClass('nsFreshcareDisabled');
				$('#ns1blankspaceDetailsCertBody').attr('disabled', true);

				// If existing record and grower's Membership is WD, disable all fields. User must contact freshcare via grower form
				if (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData['audit.agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD)
				{

					$.each($.grep($('input,textarea'), function(x) {return x.id.indexOf('ns1blankspaceDetails') > -1}), function()
					{
						$(this).attr('disabled', true);
						$(this).addClass('nsFreshcareDisabled');
					});
				}

				// v2.0.4j SUP021619 We disable if not admin & resultstatus = Completed 
				// v3.1.0c SUP022226 and not new record
				// v3.4.007 Also disable if membershipstatus = -1 (Lapsed)
				if (ns1blankspace.objectContextData 
					&& (ns1blankspace.objectContextData['audit.resultstatus'] === nsFreshcare.data.audit.resultStatusCompleted
						|| ns1blankspace.objectContextData['audit.membershipstatus'] == -1
						)
					)
				{
					// All fields are to be disabled
					$('#ns1blankspaceMainDetails input').attr('disabled', true);
					$('#ns1blankspaceMainDetails input').addClass('nsFreshcareDisabled');
					$('#ns1blankspaceMainDetails textarea').addClass('nsFreshcareDisabled');
					$('#ns1blankspaceMainDetails textarea').attr('disabled', true);

					// v3.1.208 SUP023122 Don't disable Audit Paid if auditor 
					// v3.3.005 SUP023800 DOn't disable Re-Cert Audit Due if auditor and audit linked to current certificate
					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor)
					{
						$('[name="radioPaid"]').attr('disabled', false).removeClass('nsFreshcareDisabled');
						if (ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.audit'] == ns1blankspace.objectContext)
						{
							$('#ns1blankspaceDetailsRecertAuditMonth').attr('disabled', false).removeClass('nsFreshcareDisabled');
						}
					}
				}
			}

			if (ns1blankspace.objectContextData != undefined)
			{
				var sAuditDate = ((ns1blankspace.objectContextData['audit.actualdate'] != '')
								  ? (new Date(ns1blankspace.objectContextData['audit.actualdate'])).toString('dd MMM yyyy')
								  : '');

				var sResultStatusDate = ((ns1blankspace.objectContextData['audit.resultstatusdate'] != '')
								  ? (new Date(ns1blankspace.objectContextData['audit.resultstatusdate'])).toString('dd MMM yyyy')
								  : '');

				$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData["audit.reference"].formatXHTML());
				$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData['audit.typetext'].formatXHTML());
				$('#ns1blankspaceDetailsTitle').attr('data-id', ns1blankspace.objectContextData['audit.type'].formatXHTML());
				$('#ns1blankspaceDetailsGrowerBusiness').val(ns1blankspace.objectContextData['audit.contactbusinesstext'].formatXHTML());
				$('#ns1blankspaceDetailsGrowerBusiness').attr('data-id', ns1blankspace.objectContextData['audit.contactbusiness']);
				$('#ns1blankspaceDetailsGrowerPerson').val(ns1blankspace.objectContextData['audit.contactpersontext'].formatXHTML());
				$('#ns1blankspaceDetailsGrowerPerson').attr('data-id', ns1blankspace.objectContextData['audit.contactperson']);
				$('#ns1blankspaceDetailsMembership').val(ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'].formatXHTML());
				$('#ns1blankspaceDetailsMembership').attr('data-id', ns1blankspace.objectContextData['audit.subscription']);
				$('#ns1blankspaceDetailsCOP').val(ns1blankspace.objectContextData['audit.codeofpracticetext']);
				$('#ns1blankspaceDetailsCOP').attr('data-id', ns1blankspace.objectContextData['audit.codeofpractice'].formatXHTML());
				if (nsFreshcare.option.qualifyingTraining)
				{$('#ns1blankspaceDetailsCOP').attr('data-copBasedTraining', ns1blankspace.objectContextData['audit.codeofpractice.copbasedtraining'].formatXHTML());}
				$('#ns1blankspaceDetailsStatus').val(ns1blankspace.objectContextData['audit.statustext'].formatXHTML());
				$('#ns1blankspaceDetailsStatus').attr('data-id', ns1blankspace.objectContextData['audit.status']);
				$('#ns1blankspaceDetailsResultStatus').val(ns1blankspace.objectContextData['audit.resultstatustext'].formatXHTML());
				$('#ns1blankspaceDetailsResultStatus').attr('data-id', ns1blankspace.objectContextData['audit.resultstatus']);
				$('#ns1blankspaceDetailsResultStatusDate').val(sResultStatusDate);
				$('#ns1blankspaceDetailsGrowerBusiness').val(ns1blankspace.objectContextData['audit.contactbusinesstext'].formatXHTML());
				$('#ns1blankspaceDetailsGrowerBusiness').attr('data-id', ns1blankspace.objectContextData['audit.contactbusiness']);
				$('#ns1blankspaceDetailsCertBody').val(ns1blankspace.objectContextData['audit.auditbusinesstext'].formatXHTML());
				$('#ns1blankspaceDetailsCertBody').attr('data-id', ns1blankspace.objectContextData['audit.auditbusiness']);
				$('#ns1blankspaceDetailsAuditor').val(ns1blankspace.objectContextData['audit.auditpersontext'].formatXHTML());
				$('#ns1blankspaceDetailsAuditor').attr('data-id', ns1blankspace.objectContextData['audit.auditperson']);
				$('#ns1blankspaceDetailsScheduledDate').val(ns1blankspace.objectContextData['audit.scheduleddate']);
				$('#ns1blankspaceDetailsActualDate').val(sAuditDate);
				$('#ns1blankspaceDetailsAuditDuration').val(ns1blankspace.objectContextData['audit.trainingduration']);
				$('#ns1blankspaceDetailsDescription').html(ns1blankspace.objectContextData['audit.description'].formatXHTML());	 // ver 1.0.20
				$('#ns1blankspaceDetailsCreatedBy').html(ns1blankspace.objectContextData['audit.createdusertext'].formatXHTML());
				$('#ns1blankspaceDetailsCreatedOn').html(ns1blankspace.objectContextData['audit.createddate']);
				$('#ns1blankspaceDetailsModifiedBy').html(ns1blankspace.objectContextData['audit.modifiedusertext'].formatXHTML());
				$('#ns1blankspaceDetailsModifiedOn').html(ns1blankspace.objectContextData['audit.modifieddate']);
				$('#ns1blankspaceDetailsMembershipValue').html(ns1blankspace.objectContextData['audit.agrisubscription.membership']);
				$('[name="radioPaid"][value="' + ns1blankspace.objectContextData['audit.paid'] + '"]').attr('checked', true);
				$('[name="radioJASANZ"][value="' + ns1blankspace.objectContextData['audit.sejasanzaudit'] + '"]').prop('checked', true);
				$('[name="radioIOAS"][value="' + ns1blankspace.objectContextData['audit.seioasaudit'] + '"]').prop('checked', true);
				$("#ns1blankspaceDetailsExtensionMonths").val(ns1blankspace.objectContextData['audit.seextensionmonths']);
				

				// v3.3.001 SUP023563
				if ($('#ns1blankspaceDetailsRecertAuditMonth').is('*'))
				{
					// v3.3.005 SUP023800 If shown, always show as input
					if (ns1blankspace.objectContextData['audit.serecertauditmonth'] != '')
					{
						var sMonth = nsFreshcare.util.getMonthName(ns1blankspace.objectContextData['audit.serecertauditmonth']);
						$('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id', ns1blankspace.objectContextData['audit.serecertauditmonth']);
						$('#ns1blankspaceDetailsRecertAuditMonth').val(sMonth);
					}
					else
					{
						$('#ns1blankspaceDetailsRecertAuditMonth').val('Not set');
					}
				}

				// v3.4.007 Checks membershipstatus instead of membershipstatustext to catch Lapsed Audits
				if (ns1blankspace.objectContextData['audit.membershipstatus'] != '') 
				{
					// We can unhide the Resulting Membership Status rows
					//ToDo Create a PostClick function for this
					$('#ns1blankspaceDetailsMembershipStatusCaption').show();
					$('#ns1blankspaceDetailsMembershipStatusValue').show();
				}

				if ($('#ns1blankspaceDetailsResultStatus').attr('data-id') != nsFreshcare.data.auditResultStatusNoResult) 
				{
					// We can unhide the Result Achieved date rows
					//ToDo Create a PostClick function for this
					$('#ns1blankspaceDetailsResultStatusDateCaption').show();
					$('#ns1blankspaceDetailsResultStatusDateValue').show();
					// v3.1.205 SUP023033 Need to enable ResultStatus for ManualApproval CB's if status = 'Approved' or if Admin user
					nsFreshcare.admin.audit.showResultStatusDate();

					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
					{
						$('#ns1blankspaceDetailsResultStatusDate').attr('disabled', false).removeClass('nsFreshcareDisabled');
					}
				}

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
				{
					$('#ns1blankspaceDetailsMembershipStatus').val(ns1blankspace.objectContextData['audit.membershipstatustext'].formatXHTML());
					$('#ns1blankspaceDetailsMembershipStatus').attr('data-id', ns1blankspace.objectContextData['audit.membershipstatus']);
					$("#ns1blankspaceDetailsExtensionMonths").val(ns1blankspace.objectContextData['audit.seextensionmonths']);
					// v3.3.001 SUP023474 Now gets CertBody options if CertBody populated
					if (ns1blankspace.objectContextData['audit.auditbusiness'] != '')
					{
						nsFreshcare.control.getCertificationBodyOptions({contactBusiness: ns1blankspace.objectContextData['audit.auditbusiness']})
					}
					else
					{
						nsFreshcare.data.auditor = {};
					}
				}
				else
				{
					$("#ns1blankspaceDetailsExtensionMonths").html(ns1blankspace.objectContextData['audit.seextensionmonths']);
					$('#ns1blankspaceDetailsMembershipStatus').html(ns1blankspace.objectContextData['audit.membershipstatustext'].formatXHTML());
					if (ns1blankspace.objectContextData['audit.membershipstatustext'] === '')
					{
						$('#ns1blankspaceDetailsMembershipStatus').html('Not set');
					}
					$('#ns1blankspaceDetailsGrowerBusiness').attr('disabled', true);
					$('#ns1blankspaceDetailsMembership').attr('disabled', true);
				}

				// v3.3.001 SUP023782 Set Audit Duration as non-mandatory if Cert Recommended
				if (ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusCompleted)
				{
					$('#ns1blankspaceDetailsAuditDuration').removeAttr('data-mandatory');
				}

				// V3.3.001 SUP023603 Call SetMembershipId to set values/filter based on Membership
				nsFreshcare.admin.audit.setMembershipId({existing: true});

			}
			else 
			{
				// Defaults go here
				
				var dToday = new Date();
				if (ns1blankspace.data.contactBusiness && ns1blankspace.data.contactBusinessText) 
				{
					$('#ns1blankspaceDetailsGrowerBusiness').val(ns1blankspace.data.contactBusinessText.formatXHTML());
					$('#ns1blankspaceDetailsGrowerBusiness').attr('data-id', ns1blankspace.data.contactBusiness);
				}

				if (ns1blankspace.data.contactPerson && ns1blankspace.data.contactPersonText) 
				{
					$('#ns1blankspaceDetailsGrowerPerson').val(ns1blankspace.data.contactPersonText.formatXHTML());
					$('#ns1blankspaceDetailsGrowerPerson').attr('data-id', ns1blankspace.data.contactPerson);
				}
				
				if (nsFreshcare.option.jasanzAccreditation)
				{
					$('[name="radioJASANZ"][value="N"]').attr('checked', true);		// v3.3.001 SUP023474 Add JASANZ field
					$('[name="radioIOAS"][value="N"]').attr('checked', true);		// v4.0.019 SUP024339 Add IOAS field
				}

				if (ns1blankspace.data.membershipText && ns1blankspace.data.subscription) 
				{
					$('#ns1blankspaceDetailsMembership').val(ns1blankspace.data.membershipText.formatXHTML());
					$('#ns1blankspaceDetailsMembership').attr('data-id', ns1blankspace.data.subscription);
					// Call PostClick function for ns1blankspaceDetailsMembership. This should filter and default the COP combo
					nsFreshcare.admin.audit.setMembershipId();
				}

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) 
				{
					$('#ns1blankspaceDetailsCertBody').val(ns1blankspace.user.contactBusinessText.formatXHTML());
					$('#ns1blankspaceDetailsCertBody').attr('data-id', ns1blankspace.user.contactBusiness);
					// v3.4.004 SUP023897 Don't default the CB - user MUST choose it
					//$('#ns1blankspaceDetailsAuditor').val(ns1blankspace.user.commonName.formatXHTML());
					//$('#ns1blankspaceDetailsAuditor').attr('data-id', ns1blankspace.user.contactPerson);
					$('#ns1blankspaceDetailsAuditor').attr('data-parent', ns1blankspace.user.contactBusiness);
				}
				
				$('#ns1blankspaceDetailsScheduledDate').val(dToday.toString('dd MMM yyyy'));
				$('#ns1blankspaceDetailsStatus').val('Completed');
				$('#ns1blankspaceDetailsStatus').attr('data-id', nsFreshcare.data.audit.statusCompleted);
				
				$('#ns1blankspaceDetailsResultStatus').val('Conducted');		// v3.1.2 SUP022543 JASANZ changes
				$('#ns1blankspaceDetailsResultStatus').attr('data-id', nsFreshcare.data.audit.resultStatusConducted);

				$('[name="radioPaid"][value="Y"]').attr('checked', true);		// v3.1.2 SUP022574 Add Audit Paid field
			}
		}	
	},

	setMembershipStatusID: function()
	{
		// Special case for Audit Lapsed - if user has chosen Audit Lapsed, it's data-id will be "_1" - need to change to "-1"
		if ($('#ns1blankspaceDetailsMembershipStatus').attr('data-id') == "_1") 
		{
			$('#ns1blankspaceDetailsMembershipStatus').attr('data-id', '-1');
		}
	},

	setJASANZAuditFlag: function(flagType)
	{
		// v3.3.001 If audit is after JASANZ date, auto-set JASANZ Audit to Yes and disable if not admin user for new records
		// v3.3.005 SUP023801 JASANZ Date is now Membership-dependent
		// 4.0.019 SUP024339 works for either JASANZ or IOAS flag
		flagType = ($.type(flagType) == 'object') ? undefined : flagType;
		var dAudit = $('#ns1blankspaceDetailsActualDate').val();
		var dAccreditation;

		var bTwice = (flagType == undefined);
		flagType = flagType || 'JASANZ';

		// v4.0.019 SUP024339 Added ability to disable / hide applicable field if not accredited when existing record
		if ($('#ns1blankspaceDetailsMembership').attr('data-' + flagType.toUpperCase() + 'Membership') == 'Y')
		{
			if (nsFreshcare.data.auditor)
			{
				var oAccreditation = $.grep(nsFreshcare.data.auditor[flagType.toLowerCase() + 'Dates'], function(x) 
					{return x.membership == $('#ns1blankspaceDetailsMembershipValue').val()}).shift();

				// v3.4.016 Was enabling flag if not accredited
				if (oAccreditation)
				{
					if (oAccreditation.notes)
					{
						if (dAudit != '' && dAudit != undefined)
						{
							dAudit = new Date(dAudit);
							dAccreditation = new Date(oAccreditation.notes);
							if (ns1blankspace.objectContext == -1)
							{
								$('[name="radio' + flagType.toUpperCase() + '"][value="' + (dAudit >= dAccreditation ? 'Y' : 'N') + '"]').prop('checked', true);
							}
							// v3.3.005 SUP023800 Only disable flag for other than admin & auditor
							if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
								&& nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor)
							{
								$('[name="radio' + flagType.toUpperCase() + '"]').attr('disabled', (dAudit < dAccreditation));
							}
						}
						else // Audit date not specified - don't know if accredited as yet
						{
							if (ns1blankspace.objectContext == -1)
							{	$('[name="radio' + flagType.toUpperCase() + '"][value="N"]').prop('checked', true);}
							$('[name="radio' + flagType.toUpperCase() + '"]').attr('disabled', false);
						}
					}
					else 	// no date specified - not accredited
					{
						if (ns1blankspace.objectContext == -1)
						{	$('[name="radio' + flagType.toUpperCase() + '"][value="N"]').prop('checked', true);}
						$('[name="radio' + flagType.toUpperCase() + '"]').attr('disabled', true);
					}
				}
				else 	// No matching accreditation dates - not accredited
				{
					if (ns1blankspace.objectContext == -1)
					{	$('[name="radio' + flagType.toUpperCase() + '"][value="N"]').prop('checked', true);}
					$('[name="radio' + flagType.toUpperCase() + '"]').attr('disabled', true);
				}
			}

			else 
			{	// we don't know if they need to specify. Set to N and enable
				$('[name="radio' + flagType.toUpperCase() + '"][value="N"]').prop('checked', true);
				$('[name="radio' + flagType.toUpperCase() + '"]').attr('disabled', false);
			}
		}
		// Membership is not accredited - always set to No
		else
		{
			$('[name="radio' + flagType.toUpperCase() + '"][value="N"]').prop('checked', true);
		}

		if (bTwice)
		{
			nsFreshcare.admin.audit.setJASANZAuditFlag('IOAS');
		}
	},

	addActionReasonNote: function(oParam)
	{
		// allow user to add a reason for the rejection / conditional approval
		var aHTML = [];
		var oElement = ns1blankspace.util.getParam(oParam, 'buttonElement').value;
		var sButtonText = $('#' + oElement.id + ' .ui-button-text').first().html();
		var iResultStatus = ns1blankspace.util.getParam(oParam, 'resultStatus').value;

		if ($(ns1blankspace.xhtml.container).is(':visible')) 
		{
			$(ns1blankspace.xhtml.container).hide();
			$(ns1blankspace.xhtml.container).html(''); 

		}
		else
		{
			aHTML.push('<table class="ns1blankspaceSearchMedium">');

			aHTML.push('<tr><td class="ns1blankspaceCaption">Reason for ' + sButtonText.replace('Add ', '') + '</td></tr>');

			aHTML.push('<tr><td class="nsFreshcareTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceActionReason" class="nsFreshcareTextMulti"></textarea>' +
							'</td></tr>');

			aHTML.push('<tr><td>' +
							'<span class="ns1blankspaceAction" id="ns1blankspaceActionReasonAdd" data-resultStatus="' + iResultStatus + '"></span>' +
							'<span class="ns1blankspaceAction" id="ns1blankspaceActionReasonCancel"></span>' +
							'</td></tr>');

			aHTML.push('</table>');

			ns1blankspace.container.position({xhtmlElementID: this.id, topOffset: 10, setWidth: true});
			$(ns1blankspace.xhtml.container).show();
			$(ns1blankspace.xhtml.container).html(aHTML.join(''));

			$('#ns1blankspaceActionReasonAdd')
				.button({label: 'Save'})
				.click(function() 
				{
					if ($('#ns1blankspaceActionReason').val() != '')
					{
						var fFunctionSave = ns1blankspace.util.getParam(oParam, 'onComplete', {'default': nsFreshcare.admin.audit.save.send}).value;
						fFunctionSave(
						{
							resultStatus: $(this).attr('data-resultstatus'), 
							onComplete: oParam.onComplete,
							noteData: 'object=' + nsFreshcare.objectAudit +
									'&objectcontext=' + ns1blankspace.objectContext + 
									'&type=' + nsFreshcare.data.actionTypeAuditRejected +
									'&contactbusiness=' + ns1blankspace.data.contactBusiness +
									'&contactperson=' + ns1blankspace.data.contactPerson +
									'&description=' + ns1blankspace.util.fs($('#ns1blankspaceActionReason').val()) +
									'&duedate=' + ns1blankspace.util.fs(dToday.toString('dd MMM yyyy')) +
									'&status=1' + 
									'&lock=Y' +
									'&subject=' + ns1blankspace.util.fs('Reason for ' + ((iResultStatus === nsFreshcare.data.audit.resultStatusRejected) ? 'Rejection' : 'Conditional Approval'))
						});
					}
					else
					{
						ns1blankspace.status.error('Please enter a reason.');
					}
				});

			$('#ns1blankspaceActionReasonCancel')
				.button({label: 'Cancel'})
				.click(function() 
				{
					$(ns1blankspace.xhtml.container).hide();
					$(ns1blankspace.xhtml.container).html('');
				});
		}
	},

	setMembershipId: function(oParam, oResponse) 
	{
		// Sets Membership ID and defaults COP (if COP not already set)
		// v3.1.209 SUP023095 Now gets membership options if applicable
		// v3.3.001 SUP023603 Now also sets filter on Auditor
		// v4.0.016 SUP024205 Also finds subscription enddate

		if (oResponse === undefined) 
		{
			if (oParam == undefined) {oParam = {}}
			oParam.setMembershipStep = 1;

			if ($('#ns1blankspaceDetailsMembership').attr('data-id') != undefined) 
			{
				// If changing membership, user must re-select Auditor
				if (oParam.existing != true)
				{	$('#ns1blankspaceDetailsAuditor').val('').removeAttr('data-id');}

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('membership,status,membershiptext,expirymonth,codeofpractice,enddate');
				oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsMembership').attr('data-id'));
				oSearch.getResults(function(oResponse) {nsFreshcare.admin.audit.setMembershipId(oParam, oResponse)});
			}
		}
		else 
		{
			if (oParam.setMembershipStep == 1) 
			{
				if (oResponse.status === 'OK') 
				{
					if (oResponse.data.rows.length > 0) 
					{
						$('#ns1blankspaceDetailsMembershipValue').val(oResponse.data.rows[0].membership)
						ns1blankspace.data.subscriptionStatus = oResponse.data.rows[0].status;
						ns1blankspace.data.membershipText = oResponse.data.rows[0].membershiptext;
						ns1blankspace.data.subscription = oResponse.data.rows[0].id;
						// v3.4.015 SUP023981 Set current subscription's COP value - we may need it later. 
						ns1blankspace.data.codeofpractice = oResponse.data.rows[0].codeofpractice;
						ns1blankspace.data.subscriptionEnddate = oResponse.data.rows[0].enddate;

						// v3.3.001 SUP023563 now store expirymonth value from subscription
						$('#ns1blankspaceDetailsMembership')
							.attr('data-expirymonth', oResponse.data.rows[0].expirymonth)
							.attr('data-enddate', oResponse.data.rows[0].enddate);
						$('#ns1blankspaceDetailsMembershipValue').html(oResponse.data.rows[0].membership);
						if ($('#ns1blankspaceDetailsCOP').attr('data-methodFilter') == undefined) {$('#ns1blankspaceDetailsCOP').attr('data-methodFilter', '')}
						$('#ns1blankspaceDetailsCOP').attr('data-methodFilter', 
								$('#ns1blankspaceDetailsCOP').attr('data-methodFilter') +
								'|membership-EQUAL_TO-' + oResponse.data.rows[0].membership);
						var oMembership = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == oResponse.data.rows[0].membership}).shift();

						// v3.1.209 SUP023085 Set mandatory flag and toggle view as required for Cert Level Fields
						if (nsFreshcare.option.certificationLevels)
						{
							if (oMembership && oMembership.seshowcertlevel == 'Y')
							{
								$('#ns1blankspaceDetailsCertificationLevel').attr('data-mandatory', "1");
								$('.ns1blankspaceHideCertLevel').show();
							}
							else
							{
								$('.ns1blankspaceHideCertLevel').hide();	
								$('#ns1blankspaceDetailsCertificationLevel')
									.removeAttr('data-mandatory')
									.val('')
									.attr('data-id', '');
							}
						}

						// v3.3.001 SUP023603 Add Membership filter to auditors if using Auditor Competencies
						if (nsFreshcare.option.auditorCompetencies)
						{
							var aFilters = $('#ns1blankspaceDetailsAuditor').attr('data-methodFilter')
							aFilters = (aFilters != undefined) ? aFilters.split('|') : [];
							if ($.grep(aFilters, function(x) {return x.substr(0,10) == 'membership'}).length == 0)
							{
								aFilters.push('membership-EQUAL_TO-' + oResponse.data.rows[0].membership)
							}
							else
							{
								for (var i = 0; i < aFilters.length; i++)
								{
									if (aFilters[i].substr(0,10) == 'membership')
									{
										aFilters[i] = 'membership-EQUAL_TO-' + oResponse.data.rows[0].membership;
										i = aFilters.length;
									}
								};
							}
							$('#ns1blankspaceDetailsAuditor').attr('data-methodFilter', aFilters.join('|'));
						}

						// v3.3.001 SUP023474 Sets JASANZAudit Flag and shows relevant fields as applicable
						// v4.0.019 SUP024339 Sets IOASAudit Flag and shows relevant fields as applicable
						if (nsFreshcare.option.jasanzAccreditation)
						{
							if (oMembership)
							{
								$('#ns1blankspaceDetailsMembership').attr('data-JASANZMembership', oMembership.jasanzaccredited);
								ns1blankspace.data.jasanzMembership = oMembership.jasanzaccredited;
								if (oMembership.jasanzaccredited == 'Y')
								{	$('.ns1blankspaceShowIfJASANZ').show();}
								else
								{	$('.ns1blankspaceShowIfJASANZ').hide();}

								$('#ns1blankspaceDetailsMembership').attr('data-IOASMembership', oMembership.seioasaccredited);
								ns1blankspace.data.ioasMembership = oMembership.seioasaccredited;
								if (oMembership.seioasaccredited == 'Y')
								{	$('.ns1blankspaceShowIfIOAS').show();}
								else
								{	$('.ns1blankspaceShowIfIOAS').hide();}
							}
							nsFreshcare.admin.audit.setJASANZAuditFlag('JASANZ');
							nsFreshcare.admin.audit.setJASANZAuditFlag('IOAS');
						}
						else
						{
							$('.ns1blankspaceShowIfJASANZ').hide();
							$('.ns1blankspaceShowIfIOAS').hide();
						}

						// v3.1.2 Always search for COP
						oParam.setMembershipStep = 2;
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
						oSearch.addField('description,isdefault');
						if (nsFreshcare.option.qualifyingTraining)
						{
							oSearch.addField('copbasedtraining');
						}
						oSearch.addFilter('membership', 'EQUAL_TO', oResponse.data.rows[0].membership);
						// v3.4.015 Was defaulting on existing records
						if ($('#ns1blankspaceDetailsCOP').attr('data-id') != '' && oParam.existing)
						{
							oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsCOP').attr('data-id'))
						}
						else
						{
							oSearch.addFilter('isdefault', 'EQUAL_TO', 'Y');
						}
						oSearch.getResults(function(oResponse) {nsFreshcare.admin.audit.setMembershipId(oParam, oResponse)});
					}
					else
					{
						ns1blankspacestatus.error('Error: Subscription\'s Membership does not exist!');
					}
				}
				else
				{
					ns1blankspacestatus.error('Unable to find Membership: ' + oResponse.error.errornotes);
				}
			}
			else 
			{
				if (oResponse.status === 'OK') 
				{
					if (oResponse.data.rows.length > 0 
						&& $('#ns1blankspaceDetailsCOP').attr('data-id') != oResponse.data.rows[0].id) 
					{	// v3.2.020 SUP023422 Added copBasedTraining
						$('#ns1blankspaceDetailsCOP').val(oResponse.data.rows[0].description.formatXHTML());
						$('#ns1blankspaceDetailsCOP').attr('data-id', oResponse.data.rows[0].id);
						if (nsFreshcare.option.qualifyingTraining)
						{
							$('#ns1blankspaceDetailsCOP').attr('data-copBasedTraining', oResponse.data.rows[0].copbasedtraining)
						}
					}

					// v3.1.2 SUP022693 If it's a Scope Extension Audit then clear Scope Extension tab so we pick up correct values
					if ($('#ns1blankspaceDetailsTitle').attr('data-id') == nsFreshcare.data.audit.typeScopeExtension)
					{
						$('#ns1blankspaceMainExtension')
							.attr('data-loading', '1')
							.html('')
							.css('display', 'none');
						nsFreshcare.admin.audit.scopeExtension.show();
					}

				}
				else
				{
					ns1blankspacestatus.error('Unable to find Code of Practice: ' + oResponse.error.errornotes);
				}
			}
		}
	},

	assignReviewer: function(oParam, oResponse)
	{
		// v1.0.401 SUP023192 parameter to exclude other businesses added
		var bAnyBusiness = ns1blankspace.util.getParam(oParam, 'anyBusiness', {'default': false}).value;

		if (oParam && oParam.assignReviewerStep === undefined) {oParam.assignReviewerStep = 1}
		else if (oParam == undefined) {oParam = {assignReviewerStep: 1}}

		if ($(ns1blankspace.xhtml.container).is(':visible')) 
		{
			$(ns1blankspace.xhtml.container).hide();
			$(ns1blankspace.xhtml.container).html(''); 

		}
		else 
		{
			if (oParam.assignReviewerStep === 1) 
			{
				var oSearch = new AdvancedSearch();
				// v3.3.001 If using auditorCOmpetencies, search in AGRI_MEMBERSHIP_TRAINER
				if (nsFreshcare.option.auditorCompetencies == true)
				{
					oSearch.method = "AGRI_MEMBERSHIP_TRAINER_SEARCH";
					oSearch.addField('agrimembershiptrainer.trainercontactperson.firstname,agrimembershiptrainer.trainercontactperson.surname' +
									',agrimembershiptrainer.trainercontactperson.email,trainercontactperson');
					if (!bAnyBusiness)
					{
						oSearch.addFilter('trainercontactbusiness', 'EQUAL_TO', ns1blankspace.objectContextData['audit.auditbusiness']);
					}
					oSearch.addFilter('agrimembershiptrainer.trainercontactperson.supplierstatus', 'EQUAL_TO', nsFreshcare.data.contactStatusActive);
					oSearch.addFilter('agrimembershiptrainer.trainercontactperson.persongroup', 'EQUAL_TO', nsFreshcare.data.groupReviewer[0]);	
					oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.objectContextData['audit.agrisubscription.membership']);	
					oSearch.sort('agrimembershiptrainer.trainercontactperson.surname', 'asc');
					oSearch.rows = 40;
				}
				else
				{
					oSearch.method = "CONTACT_PERSON_SEARCH";
					oSearch.addField('firstname,surname,email');
					if (!bAnyBusiness)
					{
						oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContextData['audit.auditbusiness']);
					}
					oSearch.addFilter('supplierstatus', 'EQUAL_TO', nsFreshcare.data.contactStatusActive);
					oSearch.addFilter('persongroup', 'EQUAL_TO', nsFreshcare.data.groupReviewer[0]);	
					oSearch.sort('surname', 'asc');
					oSearch.rows = 40;
				}
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK')
					{
						if (nsFreshcare.option.auditorCompetencies)
						{
							oResponse.data.rows = $.map(oResponse.data.rows, function(x)
							{
								var oPerson = 
								{
									id: x.trainercontactperson,
									firstname: x['agrimembershiptrainer.trainercontactperson.firstname'],
									surname: x['agrimembershiptrainer.trainercontactperson.surname'],
									email: x['agrimembershiptrainer.trainercontactperson.email']
								};
								return oPerson;
							})
						}
						oParam.assignReviewerStep = 2;
						nsFreshcare.admin.audit.assignReviewer(oParam, oResponse);	
					}
					else
					{
						ns1blankspace.status.error('Unable to find reviewers: ' + oResponse.error.errornotes);
					}
				});
			}
			else if (oParam.assignReviewerStep === 2) 
			{
				var aHTML = [];

				$.each(oResponse.data.rows, function() 
				{
					aHTML.push('<tr id="ns1blankspaceReviewerSearchRow_' + this.id + '">');
					aHTML.push('<td id="ns1blankspaceReviewerName_' + this.id + '" class="ns1blankspaceSearch" data-email="' + this.email.formatXHTML() + '">' + 
									this.firstname.formatXHTML() + ' ' + this.surname.formatXHTML() + 
									'<td>');
					aHTML.push('</tr>');
				});

				if (aHTML.length === 0) 
				{
					aHTML.push('<tr><td id="ns1blankspaceAssignAuditReviewer" class="ns1blankspaceSearch">No reviewers found. Please contact administrator.</td></tr>')
				}
				
				aHTML.unshift('<table class="ns1blankspaceSearchMedium">');
				aHTML.push('</table>');

				ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceAssignReviewer', topOffset: 10, setWidth: true});
				$(ns1blankspace.xhtml.container).show();
				$(ns1blankspace.xhtml.container).html(aHTML.join(''));

				// v3.2.010 Was calling Freshcare's save if in forked version
				// v3.2.020 var fFuntionSave has incorrect spelling
				$('td.ns1blankspaceSearch').click(function() 
				{
					var iPersonID = this.id.split('_').pop();
					var fFunctionSave = (ns1blankspace.rootnamespace.admin.audit.save.send) 
						? ns1blankspace.rootnamespace.admin.audit.save.send 
						: nsFreshcare.admin.audit.save.send;

					if (nsFreshcare.util.isNumeric(iPersonID));
					{
						$(ns1blankspace.xhtml.container).hide();
						$(ns1blankspace.xhtml.container).html('');
						if (iPersonID != undefined) 
						{
							fFunctionSave({reviewerID: iPersonID, reviewerName: $(this).html(), reviewerEmail: $(this).attr('data-email')});
						}
					}
				});	

			}		
		}
	},		

	showExtraTabs: function() 
	{
		// v3.1.2 SUP022693 Now also asks user if they've updated Membership if 'Scope Extension' has been chosen. Make sure we clear it out if not selected
		$('#ns1blankspaceControlEvaluation').hide();
		$('#ns1blankspaceControlExtension').hide();

		if ($('#ns1blankspaceDetailsTitle').attr('data-id') === nsFreshcare.data.audit.typeScopeExtension)
		{
			if (ns1blankspace.data.subscription)
			{
				// v3.2.016 Was trying to access nsFreshcare[nsFreshcare.user.roleID] 
				// v4.0.007 SUP024067 Added name to each button
				var aButtons =  
				[
					{text: "Membership has been updated already.", icons: {primary: 'glyphicon-ok'},
						name: 'membershipUpdated',
						click: function() 
						{
							$('#ns1blankspaceBootstrapDialog').modal('hide');
							$('#ns1blankspaceControlExtension').show();
						}
					},
					{text: "Take me to the Membership and I'll update it now.", icons: {primary: 'ui-icon-close'}, 
						name: 'updateMembershipNow',
						click: function() 
						{
							$('#ns1blankspaceBootstrapDialog').modal('hide');
							
							nsFreshcare[nsFreshcare.user.role.toLowerCase()].grower.init({showHome: false, id: ns1blankspace.data.contactBusiness});
						}
					},
					{text: "Oops, I chose the wrong Audit Title.", icons: {primary: 'ui-icon-close'}, 
						name: 'madeAMistake',
						click: function() 
						{
							$('#ns1blankspaceBootstrapDialog').modal('hide');
						}
					}
				];

				ns1blankspace.container.confirm(
				{
					title: 'Scope Extension',
					html: 'You have chosen a Scope Extension audit. Please ensure you have updated the Membership prior to completing the Scope Extension tab.',
					buttons: aButtons
				});
			}
			else
			{
				ns1blankspace.container.confirm('Please choose the Membership below to display the Scope Extension tab.');
			}
		}
		else  
		{
			$('#ns1blankspaceMainExtension')
				.attr('data-loading', '1')
				.html('')
				.css('display', 'none');
			// v3.4.008 SUP023952 Also checks if UnannouncedInitial
			if ($('#ns1blankspaceDetailsTitle').attr('data-id') === nsFreshcare.data.audit.typeInitial
				|| $('#ns1blankspaceDetailsTitle').attr('data-id') === nsFreshcare.data.audit.typeUnannouncedInitial)
			{
				$('#ns1blankspaceControlEvaluation').show();
			}
		}
	},

	showResultStatusDate: function() 
	{
		// v3.3.001 SUP023474 This is no longer JASANZ date dependent
		var dActual = new Date($('#ns1blankspaceDetailsActualDate').val());
		var bManualAuditApproval = (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData['audit.auditbusiness.semanualauditapproval'] == 'Y')

		if ($('#ns1blankspaceDetailsResultStatus').attr('data-id') === nsFreshcare.data.audit.resultStatusPending ||
			$('#ns1blankspaceDetailsResultStatus').attr('data-id') === nsFreshcare.data.audit.resultStatusCompleted) 
		{
			$('#ns1blankspaceDetailsResultStatusDateCaption').show();
			$('#ns1blankspaceDetailsResultStatusDateValue').show();
			// v4.0.016 SUP024247 Must always have this enabled if setting to CertRecommended so CB can change
			if ($('#ns1blankspaceDetailsResultStatus').attr('data-id') == nsFreshcare.data.audit.resultStatusCompleted)
			{
				$('#ns1blankspaceDetailsResultStatusDate')
				.attr('disabled', false)
				.removeClass('nsFreshcareDisabled');
			}
		}

		// Admin have full control - this part only applies when the user has clicked on a Status
		if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin
			&& ns1blankspace.xhtml.divID == "ns1blankspaceDetailsResultStatus")
		{
			// Manual approval - enable Result Status Date if setting to Approved
			if (ns1blankspace.objectContext != -1 && bManualAuditApproval 
				&& $('#ns1blankspaceDetailsResultStatus').attr('data-id') == nsFreshcare.data.audit.resultStatusApproved)
			{
				$('#ns1blankspaceDetailsResultStatusDate').attr('disabled', false).removeClass('nsFreshcareDisabled');
			}
			// Not manual approval but CB is trying to Approve - set Approval date to today
			else if (ns1blankspace.objectContext != -1 && !bManualAuditApproval 
				&& $('#ns1blankspaceDetailsResultStatus').attr('data-id') == nsFreshcare.data.audit.resultStatusApproved)
			{
				$('#ns1blankspaceDetailsResultStatusDate').val(dToday.toString('dd MMM yyyy'));
			}
			// Manual approval - disable Result Status Date if NOT setting to Approved
			else if (ns1blankspace.objectContext != -1 && bManualAuditApproval 
				&& $('#ns1blankspaceDetailsResultStatus').attr('data-id') != nsFreshcare.data.audit.resultStatusApproved
				&& $('#ns1blankspaceDetailsResultStatus').attr('data-id') != nsFreshcare.data.audit.resultStatusCompleted)
			{
				$('#ns1blankspaceDetailsResultStatusDate').attr('disabled', true).addClass('nsFreshcareDisabled');
			}
		}
	},

	trainee: 
	{
		searchCOP: function(oParam)
		{
			var iCOP = ns1blankspace.util.getParam(oParam, 'cop').value;

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_CODE_OF_PRACTICE_QUALIFYING_TRAINING_SEARCH';
			oSearch.addField('codeofpractice,qualifyingcodeofpracticetext,qualifyingcodeofpractice' +
								',agriqualifyingtraining.codeofpractice.copbasedtraining');
			oSearch.addFilter('codeofpractice', 'EQUAL_TO', iCOP);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					delete(oParam.cop);
					oParam.qualifyingCOPs = $.map(oResponse.data.rows, function(x) {return x.qualifyingcodeofpractice});
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
				else
				{
					ns1blankspace.status.error(oResponse.error.errornotes);
					ns1blankspace.okToSave = false;
				}
			});
		},

		show: function(oParam)
		{
			// Column 1 has a list of possible training, 
			// column 2 has a button to tell Freshcare that the trainee wasn't found, plus lists emails already been sent
			oParam = oParam || {};
			var aHTML = [];
			var iContactBusiness;
			var aQualifyingCOPs = [];
			oParam.showTraineeStep = oParam.showTraineeStep || 1;


			if ($('#ns1blankspaceMainTrainee').attr('data-loading') == '1')
			{
				// Get qualifying COPs. Make sure user has selected a Membership & COP first
				if (oParam.showTraineeStep == 1)
				{
					var oMembership;
					var iMembership;

					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceTraineeColumn1" class="ns1blankspaceColumn1Flexible">' +
										ns1blankspace.xhtml.loading + '</td>' +
									'<td id="ns1blankspaceTraineeColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainTrainee').html(aHTML.join(''));
					

					if ($('#ns1blankspaceMainDetails').html() != '') 
					{
						iMembership = ns1blankspace.data.membership;
						iMembership = iMembership || $('#ns1blankspaceDetailsMembershipValue').val();
						oParam.cop = $('#ns1blankspaceDetailsCOP').attr('data-id'); 	
					}
					else if (ns1blankspace.objectContext != -1)
					{
						iMembership = ns1blankspace.objectContextData['audit.agrisubscription.membership']; 
						oParam.cop = ns1blankspace.objectContextData['audit.codeofpractice'];
					}

					if (iMembership)
					{
						oMembership = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == iMembership}).shift();
						if (oMembership && oParam.cop)
						{
							oParam.showTraineeStep = 2;
							// If COP has COPBasedTraining, get list of qualifying COPs first, otherwise get training for this membership
							if ($.grep(oMembership.codesOfPractice, function(x) {return x.id == oParam.cop}).shift().copbasedtraining == 'Y')
							{
								oParam.onComplete = nsFreshcare.admin.audit.trainee.show;
								nsFreshcare.admin.audit.trainee.searchCOP(oParam);
							}
							else
							{
								delete(oParam.cop);
								oParam.membership = iMembership;
								nsFreshcare.admin.audit.trainee.show(oParam);
							}
						}
						else
						{
							$('#ns1blankspaceTraineeColumn1').html('Please choose a Code of Practice for this audit.');
						}
					}
					else
					{
						$('#ns1blankspaceTraineeColumn1').html('Please choose a Membership for this audit.');
					}
				}

				// Now display actions and get list of qualifying training for user to choose from
				else if (oParam.showTraineeStep == 2)
				{
					$('#ns1blankspaceMainTrainee').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspace">');

					// v3.4.007 If can't edit Audit, then don't show this button
					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin
						|| ns1blankspace.objectContext == -1
						|| (ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted
							&& ns1blankspace.objectContextData['audit.membershipstatus'] != -1))
					{
						aHTML.push('<tr><td><span id="ns1blankspaceTraineeNotFound" class="ns1blankspaceAction" style="width:150px;">' +
									'Notify Freshcare of missing Trainee</span></td></tr>');
					}

					if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.traineeEmails.length > 0)
					{
						aHTML.push('<tr><td>&nbsp;</td></tr>');
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">Missing Trainee notifications sent to Freshcare:</td></tr>');
						$.each(ns1blankspace.objectContextData.traineeEmails, function()
						{
							var sText = this.message.formatXHTML();
							sText = sText.split('<b>Trainer').pop();
							sText = '<b>Trainer' + sText.split('Click').shift();
							aHTML.push('<tr><td class="ns1blankspaceSubNote" style="border: 1px solid #999999;">Sent: ' + this.duedatetime.substr(0, 17) + '<br />' +
								sText + '</td></tr>');
							aHTML.push('<tr><td>&nbsp;</td></tr>');
						});
					}

					aHTML.push('</table>');

					$('#ns1blankspaceTraineeColumn2').html(aHTML.join(''));

					if (ns1blankspace.objectContext == -1)
					{
						iContactBusiness = $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id');
					}
					else
					{
						if ($('#ns1blankspaceMainDetails').html() != '')
						{
							iContactBusiness = $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id');
						}
						else
						{
							iContactBusiness = ns1blankspace.objectContextData['audit.contactbusiness'];
						}
					}

					if (iContactBusiness)
					{
						nsFreshcare.internal.entity.training.show(
						{
							attachToObject: (ns1blankspace.objectContext == -1) ? nsFreshcare.admin.audit.data : ns1blankspace.objectContextData,
							xhtmlElementID: 'ns1blankspaceTraineeColumn1',
							functionBind: nsFreshcare.admin.audit.trainee.bind,
							contactBusiness: iContactBusiness,
							qualifyingCOPs: oParam.qualifyingCOPs,
							membership: oParam.membership,
							sortColumn: 'agritraineeattendancelink.attendee.course.coursedate',
							sortDirection: 'desc'
						});
					}
					else
					{
						$('#ns1blankspaceTraineeColumn1').html('Cannot find Member\'s Business. Please choose the Member from the Details tab');
						$('#ns1blankspaceMainTrainee').attr('data-loading', '1');
					}

					$('#ns1blankspaceTraineeNotFound')
					.button(
					{
						text: 'Notify Freshcare of missing Trainee'
					})
					.css('width', '150px')
					.css('cursor', 'pointer')
					.on('click', function()
					{
						// Ask user the Trainer name, training date and first/surname of trainee
						// Send email to Freshcare and add Member Name, Audit Date and Audit Reference
						// Save email to Audit + Member
						nsFreshcare.admin.audit.trainee.getTraineeDetails(oParam);
					});
				}
			}
		},

		bind: function(oParam)
		{
			// First, highlight the row if the trainee has already been selected
			// v4.0.019 Changed sequalifyingtraininglink to sequalifyingtraininglink.id
			if (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'] != '')
			{
				$.each($('#ns1blankspaceMainTrainee tr.ns1blankspaceRow'), function()
				{
					if ($(this).attr('id').split('_').pop() == ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'])
					{
						$(this).children().addClass('nsFreshcareSelected');
					}
				});
			}

			$('#ns1blankspaceAttendanceLinkRefresh')
			.button(
			{
				icons: {primary: 'glyphicon-refresh'},
			})
			.on('click', function()
			{
				$('#ns1blankspaceMainTrainee').attr('data-loading', '1');
				if (ns1blankspace.objectContext == -1)
				{ 	delete(nsFreshcare.admin.audit.data.training)}
				else
				{	delete(ns1blankspace.objectContextData.training)}
				nsFreshcare.admin.audit.trainee.show();
			}); 

			// If a user clicks on a row, toggle highlighting the row
			// Don't allow user to change if Certification Recommended
			// v3.4.007 Don't allow if audit is lapsed
			if (ns1blankspace.objectContext == -1 
				|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
				|| (ns1blankspace.objectContext != -1 
					&& ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted
					&& ns1blankspace.objectContextData['audit.membershipstatus'] != -1
					&& ns1blankspace.objectContextData['audit.agrisubscription.status'] != nsFreshcare.data.grower.subscriptionStatusWD))
			{
				$('#ns1blankspaceMainTrainee tr.ns1blankspaceRow').on('click', function()
				{
					var bRowHasClass = $(this).children().hasClass('nsFreshcareSelected');
					$('#ns1blankspaceMainTrainee tr.ns1blankspaceRow').children().removeClass('nsFreshcareSelected');
					if (!bRowHasClass)
					{
						$(this).children().addClass('nsFreshcareSelected');

					}
				})
				.css('cursor', 'pointer');
			}
		},

		getTraineeDetails: function()
		{
			var bEvaluation = ($('#ns1blankspaceMainEvaluation').html() != '');
			var aHTML = [];
			var oTraineeDetails = {};

			delete(nsFreshcare.admin.audit.data.traineeDetails);

			if ($('#ns1blankspaceMainTrainee tr.ns1blankspaceRow .nsFreshcareSelected').length == 0)
			{
				// Construct dialog
				aHTML.push('<table class="ns1blankspace">' +
								'<tr><td class="ns1blankspace">');

				//aHTML.push('<table class="ns1blankspace" style="border: 1px solid #d4d4d4;">'); 

				aHTML.push('<tr><td class="ns1blankspace" style="font-size: 1.0em;">' +
								'Please enter as much of the following information as you can to assist Freshcare in locating the missing trainee:' +
							'<br/>&nbsp;</td></tr>');

				aHTML.push('<tr>' +
								'<td class="ns1blankspaceCaption">Trainer</td></tr>' +
							'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceTraineeDetailsTrainer" class="ns1blankspaceText"' +
									' data-caption="Trainer" data-column="trainercontactbusiness"');
				aHTML.push('"></td></tr>');			

				// v4.0.001 Changed to div instead of select since on a dialog
				aHTML.push('<tr><td style="padding-bottom:5px;" id="ns1blankspaceTrainerSearchResults"></td></tr>');


				aHTML.push('<tr>' +
							'<td class="ns1blankspaceCaption">Course Type' +
								'<span class="ns1blankspaceSubNote"> (eg: FSQ4, ENV3, SC1)</span>' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
								'<td class="ns1blankspace">' +
								'<input id="ns1blankspaceTraineeDetailsCourseType" class="ns1blankspaceText"' +
									' data-caption="Course Type">' +
							'</td></tr>');			

				aHTML.push('<tr>' +
								'<td class="ns1blankspaceCaption">Date Training Completed</td></tr>' +
							'<tr class="ns1blankspace">' +
								'<td class="ns1blankspace">' +
								'<input id="ns1blankspaceTraineeDetailsTrainingDate" class="ns1blankspaceDate"' +
									' data-caption="Date Training Completed" data-column="trainingdate">' +
							'</td></tr>');			

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceCaption">Trainee First Name</td></tr>' +
							'<tr class="ns1blankspace">' +
								'<td class="ns1blankspace">' +
								'<input id="ns1blankspaceTraineeDetailsFirstName" class="ns1blankspaceText"' +
									' data-caption="Trainee First Name">' +
							'</td></tr>');			

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceCaption">Trainee Surname</td></tr>' +
							'<tr class="ns1blankspace">' +
								'<td class="ns1blankspace">' +
								'<input id="ns1blankspaceTraineeDetailsSurname" class="ns1blankspaceText"' +
									' data-caption="Trainee Surname">' +
							'</td></tr>');			

				// If not a new Audit, tell the user to click Save once they've added the Trainee details 
				// otherwise the email won't be sent
				if (ns1blankspace.objectContext != -1)
				{
					aHTML.push('<tr><td>&nbsp;</td></tr><tr><td class="ns1blankspaceCaption" style="color: red;">' +
									'Please save the Audit after clicking OK so that Freshcare will receive the notification.'+
								'</td></tr>');
				}

				aHTML.push('</table>');

				ns1blankspace.container.confirm(
				{
					title: 'Enter Trainee details',
					html: '<span style="font-size: 0.75em">' + aHTML.join('') + '</span>',
					buttons: 
					[
						{
							text: 'Cancel',
							click: function() 
							{
								oParam = undefined;
								$('#ns1blankspaceBootstrapDialog').modal('hide');
							}
						},
						{
							text: 'OK', 
							click: function() 
							{
								nsFreshcare.admin.audit.data.traineeDetails =
								{
									trainer: $('#ns1blankspaceTraineeDetailsTrainer').attr('data-id'),
									trainerText: $('#ns1blankspaceTraineeDetailsTrainer').val(),
									trainingDate: $('#ns1blankspaceTraineeDetailsTrainingDate').val(),
									traineeFirstName: $('#ns1blankspaceTraineeDetailsFirstName').val(),
									traineeSurname: $('#ns1blankspaceTraineeDetailsSurname').val(),
									courseType: $('#ns1blankspaceTraineeDetailsCourseType').val()
								};
								$('#ns1blankspaceBootstrapDialog').modal('hide');
							}
						}
					],
					bind: function(functionParams)
					{
						var aButtons = functionParams.buttons;
						$('#ns1blankspaceBootstrapDialog')
							.html(functionParams.html)
							.modal('show');
						$.each(aButtons, function()
						{
							$('#' + this.name).on('click', this.click);
						});

						// v4.0.016 SUP024214 changed to initDatePicker
						ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});
						
						$('.modal-dialog').css('width', '500');

						$('#ns1blankspaceTraineeDetailsTrainer').keyup(function()
						{
							if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
					        ns1blankspace.timer.delayCurrent = setTimeout('nsFreshcare.admin.audit.trainee.searchTrainers()', ns1blankspace.option.typingWait);
						});
						$('#ns1blankspaceTraineeDetailsTrainer').focus();
					}
				});
			}

			// Cannot notify freshcare if user has chosen a trainee
			else
			{
				ns1blankspace.container.confirm(
				{
					title: 'Warning!',
					html: 'You have already selected a qualifying trainee.<br /><br />' +
							'If you continue, the qualifying trainee you have selected will not be saved against this audit.<br /><br />' +
							'Are you sure you wish to continue?',
					buttons:
					[
						{
							text: 'Yes',
							click: function()
							{
								$('#ns1blankspaceMainTrainee tr.ns1blankspaceRow').children('.nsFreshcareSelected').toggleClass('nsFreshcareSelected');
								$('#ns1blankspaceBootstrapDialog').modal('hide');
								window.setTimeout('nsFreshcare.admin.audit.trainee.getTraineeDetails()', 1000);
							}
						},
						{
							text: 'No',
							click: function()
							{
								$('#ns1blankspaceBootstrapDialog').modal('hide');
							}
						}
					]
				})
			}
		},

		searchTrainers: function()
		{
			var sSearchText = $('#ns1blankspaceTraineeDetailsTrainer').val();

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			oSearch.addField('firstname,surname,contactbusinesstext,contactbusiness');
			oSearch.addFilter('contactperson.persongroup', 'IN_LIST', nsFreshcare.data.groupTrainer.join(','));
			oSearch.addBracket('(');
			oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sSearchText);
			oSearch.addOperator('or');
			oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSearchText);
			oSearch.addOperator('or');
			oSearch.addFilter('contactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
			oSearch.addBracket(')');
			oSearch.getResults(function(oResponse)
			{
				$('#ns1blankspaceTrainerSearchResults').html('');
				$('#ns1blankspaceTraineeDetailsTrainer')
					.attr('data-id', '')
					.val();

				if (oResponse.status == 'OK')
				{
					var aHTML = [];
					aHTML.push('<table class="ns1blankspace" style="font-size: 0.875em;">');
					$.each(oResponse.data.rows, function()
					{
						aHTML.push('<tr><td class="ns1blankspaceRow" id="trainerSearchResult-' + this.id + '"' +
											' data-businessID="' + this.contactbusiness + '">' +
											this.firstname + ' ' + this.surname + ' - ' + this.contactbusinesstext + 
										'</td></tr>');
					});

					if (aHTML.length == 1)
					{
						aHTML.push('<tr><td>No trainers found</td></tr>');
					}
					aHTML.push('</table');

					$('#ns1blankspaceTrainerSearchResults').html(aHTML.join(''));

					$('#ns1blankspaceTrainerSearchResults .ns1blankspaceRow')
					.css('cursor', 'pointer')
					.on("click", function()
					{
						$('#ns1blankspaceTraineeDetailsTrainer')
							.attr('data-id', $(this).data('businessID'))
							.val($(this).html());
						$('#ns1blankspaceTrainerSearchResults').html('');
					});
				}
				else
				{
					ns1blankspace.status.error('Unable to find trainer: ' + oResponse.error.errornotes);
				}
			});
		},

		getTraineeData: function(bNew)
		{
			// v3.4.009 Use bNew instead of objectContext == -1
			bNew = bNew || false;
			var oTraineeList = (bNew) ? nsFreshcare.admin.audit.data.training : ns1blankspace.objectContextData.training;
			var iQualifyingTraining;
			var oTraineeData;

			// v4.0.019 Changed sequalifyingtraininglink to sequalifyingtraininglink.id
			if ($('#ns1blankspaceMainTrainee').html() != '')
			{
				if ($('#ns1blankspaceMainTrainee tr.ns1blankspaceRow').children().hasClass('nsFreshcareSelected'))
				{
					iQualifyingTraining = $('#ns1blankspaceMainTrainee tr.ns1blankspaceRow .nsFreshcareSelected').first().attr('id').split('_').pop()
				}
				else if (!bNew)
				{
					iQualifyingTraining = ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'];
				}

				if (iQualifyingTraining && iQualifyingTraining != '0')
				{
					oTraineeData = $.grep(oTraineeList, function(x) {return x.id == iQualifyingTraining}).shift();
				}
			}
			return oTraineeData;
		}
	},

	cars: 		
	{
		search: function (oParam, oResponse) 
		{
			// v3.4.017 SUP023975 Added sort parameter
			oParam = oParam || {};
			var iAudit = oParam.audit || ns1blankspace.objectContext;
			var iStep = oParam.step || 1;
			var aSort = oParam.sort || [{name: 'auditissue.typetext', direction: 'asc'}];

			if (iStep === 1 && iAudit && ns1blankspace.objectContextData) 
			{
				ns1blankspace.objectContextData.cars = [];
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "audit";
				oSearch.method = 'AUDIT_ISSUE_SEARCH';
				oSearch.addField('auditissue.audit,auditissue.reference,auditissue.details,auditissue.datecompleted' +
								',auditissue.resolution,auditissue.modifieddate,auditissue.sintype.prefix' + 
								',auditissue.sintype,auditissue.sintypetext,auditissue.sintype.code' +
								',auditissue.status,auditissue.statustext,auditissue.type,auditissue.typetext');
				oSearch.addFilter("auditissue.audit", "EQUAL_TO", iAudit);
				$.each(aSort, function()
				{
					oSearch.sort(this.name, this.direction);	
				});
				oSearch.rf = 'json';
				oSearch.rows = 200;
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === "OK") 
					{
						ns1blankspace.objectContextData.cars = oResponse.data.rows;
						oParam.response = oResponse;
						delete(oParam.step);
						ns1blankspace.util.onComplete(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding CARs: ' + oResponse.error.errornotes);
					}
				});
			}
		},

		show: 	function (oParam, oResponse) 
		{
			oParam = oParam || {};
			var aHTML = [];
			var sAuditStatus = ns1blankspace.objectContextData['audit.resultstatus'];
			var iMembership = ns1blankspace.objectContextData['audit.agrisubscription.membership'];

			var bAuditDisabled = !(sAuditStatus == nsFreshcare.data.audit.resultStatusCompleted || ns1blankspace.objectContextData['audit.membershipstatus'] == -1)
			var bCanEdit = ns1blankspace.util.getParam(oParam, 'canEdit', {'default': true}).value;
			var bCanRemove = ns1blankspace.util.getParam(oParam, 'canRemove', {'default': bAuditDisabled}).value;
			var bCanAdd = ns1blankspace.util.getParam(oParam, 'canAdd', {'default': bAuditDisabled}).value;

			// If existing record and grower's Membership is WD, disable all fields. 
			if (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData['audit.agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD)
			{
				bCanEdit = false;
				bCanRemove = false;
				bCanAdd = false;
			}


			if (oParam.refresh == true)
			{
				delete(oParam.response);
				delete(oParam.refresh);
				ns1blankspace.show({selector: '#ns1blankspaceMainCARs', refresh: true});
			}

			if ($('#ns1blankspaceMainCARs').attr('data-loading') == '1')
			{
				if (oResponse === undefined && (oParam.response === undefined)) 
				{
					// v3.4.017 SUP023975 Added sort parameter
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.audit.cars.show);
					oParam.audit = ns1blankspace.objectContext;
					oParam.sort = [{name: 'auditissue.sintype.prefix', direction: 'desc'}, {name: 'auditissue.sintype.code', direction: 'asc'}];
					nsFreshcare.admin.audit.cars.search(oParam);
				}
				else 
				{
					if (oResponse === undefined) 
					{
						oResponse = oParam.response;
					}

					$('#ns1blankspaceMainCARs').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceCARsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceCARsColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainCARs').html(aHTML.join(''));
					
					var aHTML = [];
				
	
					aHTML.push('<table id="ns1blankspaceAuditCARs" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Severity</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">CAR Type</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Status</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Details</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Resolution</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(oResponse.data.rows, function() 
					{

						aHTML.push('<tr id="ns1blankspaceCARRow_' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR"' + 
										' id="ns1blankspaceCARSeverity_' + this.id + 
										'">' +
											this["auditissue.typetext"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR"' + 
										' id="ns1blankspaceCARType_' + this.id + 
										'">' +
											this["auditissue.sintype.prefix"] + this["auditissue.sintype.code"] + ' - ' + this["auditissue.sintypetext"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR"' + 
										' id="ns1blankspaceCARStatus_' + this.id + '"' +
										' data-id="' + this["auditissue.status"] + '"' +
										'">' +
											this["auditissue.statustext"] + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR"' + 
										' id="ns1blankspaceCARDetails_' + this.id + 
										'">' +
											this['auditissue.details'] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR"' + 
										' id="ns1blankspaceCARResolution_' + this.id + 
										'">' +
											this['auditissue.resolution'] + 
										'</td>');


						if (!bCanRemove) 
						{
							aHTML.push('<td class="ns1blankspaceAction">&nbsp;</td>');
						}
						else 
						{
							// v4.0.001 Bootstrap
							aHTML.push('<td><span id="ns1blankspaceCARRemove_' + this.id + '" ' + 
											'class="ns1blankspaceAction ns1blankspaceCARRemove" ' + 
											'data-rowID="' + this.id + '" title="Remove"></span>' + 
											'</td>');
						}
					});

					aHTML.push('</table>');

					$('#ns1blankspaceCARsColumn1').html(aHTML.join(''));

					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('<tr><td><span id="ns1blankspaceCARAdd" class="ns1blankspaceAction" colspan="2"></span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceCARsColumn2').html(aHTML.join(''));

					// When click on row, shows CAR details (and can edit if valid) below.
					$('.ns1blankspaceRowAuditCAR').click(function(event) {

						// v2.0.4j SUP021619 N/A
						// v3.1.209 SUP023002 Admin can now edit CARs at any time
						// v3.4.007 FC want users to be able to close out open CARs after set to Complete or audit is lapsed
						// Otherwise, lock CAR. Also, CB's Cannot ever update a Closed Critical CAR
						var sElementId = this.id.split('_').pop();
						var oThisIssue = $.grep(ns1blankspace.objectContextData.cars, function(a) {return a.id == sElementId}).shift();
						var bCanEditThis = nsFreshcare.user.roleID == nsFreshcare.data.roles.admin 
									|| (oThisIssue && oThisIssue['auditissue.status'] != nsFreshcare.data.auditCAR.statusCompleted && bCanEdit)
									|| (ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted 
											&& ns1blankspace.objectContextData['audit.membershipstatus'] != '-1'
											&& bCanEdit && oThisIssue
											&& (oThisIssue['auditissue.status'] != nsFreshcare.data.auditCAR.statusCompleted
											   || oThisIssue['auditissue.type'] != nsFreshcare.data.auditCAR.severityCritical))
									|| (oThisIssue == undefined && bCanEdit)

						/*nsFreshcare.user.roleID == nsFreshcare.data.roles.admin ||
												   (ns1blankspace.objectContextData['audit.membershipstatus'] != nsFreshcare.data.grower.subscriptionStatusIN 
														&& ns1blankspace.objectContextData['audit.membershipstatus'] != nsFreshcare.data.grower.subscriptionStatusCE
														&& bCanEdit)*/
						nsFreshcare.admin.audit.cars.manage(
						{
							add: false, 
							edit: bCanEditThis, 
							rowID: sElementId
						});

						if (oThisIssue != undefined) 
						{ 
							var oRoot = ns1blankspace.rootnamespace;
							var oParam = {
								xhtmlContext: 'AuditCAR',
								xhtmlElementID: 'ns1blankspaceAuditCARColumn1',
								dataIssueID: sElementId,
								dataAuditID: ns1blankspace.objectContext,
								dataAuditValue: ns1blankspace.objectContextData['audit.contactbusinesstext'].formatXHTML() + ' ' + ns1blankspace.objectContextData['audit.actualdate'].formatXHTML(),
								dataReference: oThisIssue['auditissue.reference'],
								dataSeverityID: oThisIssue['auditissue.type'],
								dataSeverityValue: oThisIssue['auditissue.typetext'].formatXHTML(),
								dataCARTypeID: oThisIssue['auditissue.sintype'],
								dataCARTypeValue: oThisIssue['auditissue.sintypetext'].formatXHTML(),
								dataCARTypePrefix: oThisIssue['auditissue.sintype.prefix'],
								dataCARTypeCode: oThisIssue['auditissue.sintype.code'],
								dataDetails: oThisIssue['auditissue.details'].formatXHTML(),
								dataResolution: oThisIssue['auditissue.resolution'].formatXHTML(),
								dataStatusID: oThisIssue['auditissue.status'],
								dataStatusValue: oThisIssue['auditissue.statustext'],
								dataCompleted: oThisIssue['auditissue.datecompleted'],
								dataAuditResultStatus: ns1blankspace.objectContextData['audit.resultstatus'],
								dataAuditMembership: ns1blankspace.objectContextData['audit.agrisubscription.membership'],
								dataAuditCOP: ns1blankspace.objectContextData['audit.codeofpractice'],
								edit: bCanEditThis
							}

							oRoot.admin.auditcar.details(oParam);
						}
						else {
							$('#ns1blankspaceAuditCARColumn1').html('CAR details not found.');
						}
					});

					// Can only remove CARs if Admin or not Admin and Audit Result Status is Pending/No Result  
					if (bCanRemove) {

						$('.ns1blankspaceCARRemove').button({
							icons: {primary: "glyphicon-remove"}
						})
						.click(function(event) 
						{
							if (ns1blankspace.xhtml.divID === this.id) {
								$(ns1blankspace.xhtml.container).html('');
								$(ns1blankspace.xhtml.container).hide();
								ns1blankspace.xhtml.divID = '';
							}
							else {
								ns1blankspace.xhtml.divID = this.id;

								var iRowID = ($(this).attr("data-rowID")) ? $(this).attr("data-rowID") : 'New';
								
								var aHTML = [];

								aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
											'<td><span id="ns1blankspaceCARInactivate_' + iRowID + '" class="ns1blankspaceSearch">Remove</span></td>' +
											'</tr></table>');

								$(ns1blankspace.xhtml.container)
									.html(aHTML.join(''))
									.show()
									.offset(
									{ 
										top: $('#' + ns1blankspace.xhtml.divID).offset().top,
										left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
									});
								$("#ns1blankspaceCARInactivate_" + iRowID)
									.css('cursor', 'pointer')
									.click(function(event) 
									{

										var sID = $(this).attr('id').split('_')[1];
										$(ns1blankspace.xhtml.container).html('');
										$(ns1blankspace.xhtml.container).hide();
										
										nsFreshcare.admin.auditcar.remove.send(
										{
											id: sID, 
											confirmed: true, 
											onComplete: nsFreshcare.admin.audit.cars.remove
										});
									});

							}
						});
				}	
					
					
					// Can only add CARs if Admin or not Admin and Audit Result Status is Pending/No Result 
					if (bCanAdd) 
					{

						$('#ns1blankspaceCARAdd').button({
							label: 'Add CAR',
							icons: {
								primary: "ui-icon-plus"
							}
						})
						.click(function() 
						{
							nsFreshcare.admin.audit.cars.manage({add: true});

							if ($('#ns1blankspaceAuditCARActionContainer').children().length > 0) 
							{
								var oRoot = ns1blankspace.rootnamespace;
								oRoot.admin.auditcar.details({dataIssueID: -1,
																	dataAuditID: ns1blankspace.objectContext,
																	dataAuditValue: ns1blankspace.objectContextData['audit.contactbusinesstext'].formatXHTML() + ' ' + ns1blankspace.objectContextData['audit.actualdate'].formatXHTML(),
																	dataAuditMembership: ns1blankspace.objectContextData['audit.agrisubscription.membership'],
																	dataAuditCOP: ns1blankspace.objectContextData['audit.codeofpractice'],
																	xhtmlElementID: "ns1blankspaceAuditCARColumn1",
																	xhtmlContext: "AuditCAR"});
								//nsFreshcare.admin.auditcar.initGlobals({onComplete: nsFreshcare.admin.auditcar.details,
								//										xhtmlElementID: "ns1blankspaceAuditCARActionManage"});
							}
						});
					}
				}
			}
		},

		manage: function(oParam) 
		{

			var bAdd = true;
			var bContinue = true;
			var sRowID;
			var bEdit = true;

			if (oParam) {
				if (oParam.add != undefined) {bAdd = oParam.add;}
				if (oParam.edit != undefined) {bEdit = oParam.edit;}
				if (oParam.rowID != undefined) {sRowID = oParam.rowID;}
			}

			// Work out if we scrap what's there already. If they're already adding a new one, don't do anything, otherwise, start again
			if ($('#ns1blankspaceAuditCARActionContainer').html() != '' && $('#ns1blankspaceAuditCARActionContainer').html() != undefined) {
				
				if ($('#ns1blankspaceAuditCARAudit').attr('data-issueID') === '-1') {
					
					if (!bAdd) {		// We were adding and now we've decided to view an existing one
						bContinue = confirm("Are you sure you want to cancel adding the CAR?");
					}
					else {		// We were adding and now have clicked Add CAR again - remove the row (essentially cancel)
						
						$('#ns1blankspaceAuditCARActionContainer').remove();
						bContinue = false;
					}
				}
				else {
					$('#ns1blankspaceAuditCARActionContainer').remove();
					bContinue = false;
				}
			}  

			if (bContinue) {
				
				var aHTML = [];

				aHTML.push('<tr id="ns1blankspaceAuditCARActionContainer"><td id="ns1blankspaceAuditCARActionManage" colspan="' + $('#ns1blankspaceAuditCARs').children().children().first().children().length + '">');
				aHTML.push('<table id="ns1blankspaceAuditCAR" class="ns1blankspaceContainer nsFreshcareDetails ns1blankspaceBorder">');

				aHTML.push('<tr>' + 
							'<td id="ns1blankspaceAuditCARColumn1" class="ns1blankspaceColumn1" style="width:75%;"></td>' +
							'<td id="ns1blankspaceAuditCARColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>');

				aHTML.push('</table>');
				aHTML.push('</td></tr>');

				if (bAdd) {
					$('#ns1blankspaceAuditCARs').children().children().first().before(aHTML.join(''));
				}
				else {
					$('#ns1blankspaceCARRow_' + sRowID).after(aHTML.join(''));
				}
				//$('#ns1blankspaceAuditCARs').children().children().last().after(aHTML.join(''));

				aHTML = [];

				aHTML.push('<table class="ns1blankspaceColumn2">');
				aHTML.push('<tr><td>');
				if (bEdit) 
				{
					aHTML.push('<span id="ns1blankspaceAuditCARSave" class="ns1blankspaceAction" colspan="2">Save</span>');
				}
				aHTML.push('</td></tr></table>');

				$('#ns1blankspaceAuditCARColumn2').html(aHTML.join(''));

				$('#ns1blankspaceAuditCARSave')
				.button({
					label: 'Save',
					icons: {
						primary: 'ui-icon-disk'
					}
				})
				.click(function(event) 
				{
					nsFreshcare.admin.auditcar.save.send({xhtmlContext: "AuditCAR",
															onComplete: nsFreshcare.admin.audit.cars.show,
															refresh: true});
				});
			}
		},

		remove: function(oParam) 
		{
			
			var sID;

			if (oParam) {
				if (oParam.id) {
					$('#ns1blankspaceCARRow_' + oParam.id).remove();
				}
			}
		}
	},

	sites: 		
	{
		search: function (oParam, oResponse) 
		{

			var iAudit = ns1blankspace.objectContext;
			var iStep = 1;

			if (oParam) {
				iAudit = (oParam.audit) ? oParam.audit : iAudit;
				if (oParam.step) {iStep = oParam.step; }
			}

			nsFreshcare.admin.grower.siteAddress.search({
							contactBusiness: ns1blankspace.objectContextData["audit.contactbusiness"],
							onComplete: nsFreshcare.admin.audit.sites.show});

			//ns1blankspace.util.setParam(oParam, "response", oResponse);
			//ns1blankspace.util.onComplete(oParam);
		},

		show: 	function (oParam, oResponse) 
		{

			var aHTML = [];

			if (oParam === undefined) {oParam = {};}

			if ($('#ns1blankspaceMainSites').attr('data-loading') == '1')
			{
				
				if (oResponse === undefined && (oParam.response === undefined)) {
					nsFreshcare.admin.audit.sites.search({
						audit: ns1blankspace.objectContext,
						onComplete: nsFreshcare.admin.audit.sites.show
					});
				}
				else {

					if (oResponse === undefined) {
						oResponse = oParam.response;
					}

					$('#ns1blankspaceMainSites').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceSitesColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceSitesColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainSites').html(aHTML.join(''));
					
					var aHTML = [];
				
	
					aHTML.push('<table id="ns1blankspaceAuditSites" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Street</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Suburb</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">State</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Post Code</td>' +
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					// Add the address of the main site from the contactbusiness record
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceRow"' + 
									' id="ns1blankspaceSiteAddress1_' + ns1blankspace.objectContextData['audit.contactbusiness'] + '">' +
										ns1blankspace.objectContextData['audit.contactbusiness.streetaddress1'] + 
									'</td>');
	
					aHTML.push('<td class="ns1blankspaceRow"' + 
									' id="ns1blankspaceSiteAddress2_' + ns1blankspace.objectContextData['audit.contactbusiness'] + '">' +
										ns1blankspace.objectContextData['audit.contactbusiness.streetaddress2'] + 
									'</td>');
	
					aHTML.push('<td class="ns1blankspaceRow"' + 
									' id="ns1blankspaceSiteSuburb_' + ns1blankspace.objectContextData['audit.contactbusiness'] + '">' +
										ns1blankspace.objectContextData['audit.contactbusiness.streetsuburb'] + 
									'</td>');
	
					aHTML.push('<td class="ns1blankspaceRow"' + 
									' id="ns1blankspaceSiteState_' + ns1blankspace.objectContextData['audit.contactbusiness'] + '">' +
										ns1blankspace.objectContextData['audit.contactbusiness.streetstate'] + 
									'</td>');
	
					aHTML.push('<td class="ns1blankspaceRow"' + 
									' id="ns1blankspaceSitePostCode_' + ns1blankspace.objectContextData['audit.contactbusiness'] + '">' +
										ns1blankspace.objectContextData['audit.contactbusiness.streetpostcode'] + 
									'</td>');

					aHTML.push('<td class="ns1blankspaceAction">&nbsp;</td>');

					aHTML.push('</tr>');
	
					// Now add any additional sites
					$.each(oResponse.data.rows, function() {

						aHTML.push('<tr id="ns1blankspaceSiteRow_' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceSiteAddress1_' + this.id + 
										'">' +
											this.streetaddress1 + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceSiteAddress2_' + this.id + 
										'">' +
											this.streetaddress2 + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceSiteSuburb_' + this.id + 
										'">' +
											this.streetsuburb + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceSiteState_' + this.id + 
										'">' +
											this.state + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceSitePostCode_' + this.id + 
										'">' +
											this.postcode + 
										'</td>');

						aHTML.push('</tr>');


						if (1 === 1) {
							aHTML.push('<td class="ns1blankspaceAction">&nbsp;</td>');
						}
						else {
							// ToDo Future function where users can specify which site(s) are included in the Audit
							aHTML.push('<td id="ns1blankspaceSiteSelect_' + this.id + '" ' + 
											'class="ns1blankspaceAction ns1blankspaceSiteSelect" ' + 
											'data-rowID="' + this.id + '">' + 
											'</td>');
						}
					});

					aHTML.push('</table>');

					$('#ns1blankspaceSitesColumn1').html(aHTML.join(''));

					$('.ns1blankspaceSiteSelect').button({
						icons: {
							primary: "ui-icon-plus"
						}
					})
					.click(function(event) {

						ns1blankspace.xhtml.divID = this.id;
						//ToDo This function will change the icon of the button plus the attribute of the row to say whether it's to be
						// included or excluded in the audit. The Save function will manage the process of linking sites to audits.
						// Also make sure this function is disabled when audit is for a withdrawn membership

					});
					
				}
			}
		}
	},

	evaluation: function()
	{
		// v3.4.009 added parametetr to getTraineeData call
		var aHTML = [];
		var dToday = new Date();
		
		var bMandatory = (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && ns1blankspace.objectContext === -1);
		var bDisabled = (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && ns1blankspace.objectContext != -1);
		var oTraineeData = nsFreshcare.admin.audit.trainee.getTraineeData((ns1blankspace.objectContext == -1));

		// If existing record and grower's Membership is WD, disable all fields. User must contact freshcare via grower form
		if (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData['audit.agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD)
		{
			bDisabled = true;
		}

		if ($('#ns1blankspaceMainEvaluation').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainEvaluation').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceEvaluationsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
							'<td id="ns1blankspaceEvaluationsColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainEvaluation').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			// v2.0.4i SUP021678 Removed filter on supplierstatus so that all trainers show
			// v3.2.020 SUP02346 Added data-column to element so can check if anything has changed
			var sName = nsFreshcare.admin.audit.getTraineeName().formatXHTML();
			if (sName != '')
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Evaluation of training for ' + sName +
								'</td></tr>');
			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trainer' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceEvaluationsTrainer" class="nsFreshcareSelectGrower"' +
								' data-caption="Trainer" data-column="trainercontactbusiness"' +
								((bMandatory) ? ' data-mandatory="1"' : '') +
								' data-click="nsFreshcare.admin.audit.setTrainerBusiness"' + 
								' data-method="CONTACT_PERSON_SEARCH"' +
								' data-columns="firstname-space-surname-space-hyphen-space-contactbusinesstext"' +
								' data-methodFilter="contactperson.firstname-TEXT_IS_LIKE|contactperson.surname-TEXT_IS_LIKE|' +
													'contactperson.contactbusinesstext-TEXT_IS_LIKE|' +
													'contactperson.persongroup-IN_LIST-' + nsFreshcare.data.groupTrainer.join(','));

			if ($('#ns1blankspaceDetails').html() != '' && $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id') != undefined) 
			{
				aHTML.push('|contactperson.contactbusiness.relationshipbusiness.othercontactbusiness-EQUAL_TO-' + $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id') + '|' + 
							'contactperson.contactbusiness.relationshipbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipTrainer + '|' +
							'contactperson.contactbusiness.relationshipbusiness.startdate-LESS_THAN_OR_EQUAL_TO-' + dToday.toString("dd MMM yyyy") + '|' +
							'contactperson.contactbusiness.relationshipbusiness.enddate-IS_NULL-');
			}
			aHTML.push('"></td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Training Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceEvaluationsTrainingDate" class="ns1blankspaceDate"' +
								' data-caption="Training Date" data-column="trainingdate"' +
								((bMandatory) ? ' data-mandatory="1"' : '') + '>' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Assessment Length (Hours)' +
							'</td></tr>' +
							'<tr class="ns1blankspaceSelect">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceEvaluationsAssessmentLength" class="ns1blankspaceText"' +
								' data-caption="Assessment Length" data-column="trainingduration"' +
								((bMandatory) ? ' data-mandatory="1"' : '') + '>' +
							'</td></tr>');							
							
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							"Please rate the Client's overall understanding of the Freshcare program: "+
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceRadio">' +
							'<input type="radio" id="radioRating1" name="radioRating" data-column="trainingrating" value="1" data-label="No Understanding"/>No understanding' +
							'<br /><input type="radio" id="radioRating2" name="radioRating" data-column="trainingrating" value="2" data-label="Basic Understanding"/>Basic understanding' +
							'<br /><input type="radio" id="radioRating3" name="radioRating" data-column="trainingrating" value="3" data-label="Average Understanding"/>Average understanding' +
							'<br /><input type="radio" id="radioRating4" name="radioRating" data-column="trainingrating" value="4" data-label="Good Understanding"/>Good understanding' +
							'<br /><input type="radio" id="radioRating5" name="radioRating" data-column="trainingrating" value="5" data-label="Excellent Understanding"/>Excellent understanding' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Comments / Areas of Concern' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="nsFreshcareTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceEvaluationsComments" class="nsFreshcareTextMulti" data-column="trainingnotes"' +
								' style="width: ' + (parseInt($('#ns1blankspaceEvaluationsColumn1').width()) - 5) + 'px;"' +
							'></textarea>' +
							'</td></tr>');
			
			aHTML.push('</table>');					
			
			$('#ns1blankspaceEvaluationsColumn1').html(aHTML.join(''));

			if (bDisabled) 
			{
				var aHTML = [];
					
				$.each($.grep($('input,textarea'), function(x) {return x.id.indexOf('ns1blankspaceEvaluation') > -1}), function()
				{
					$(this).attr('disabled', true);
					$(this).addClass('nsFreshcareDisabled');
				});

				aHTML.push('<table class="ns1blankspace">');
				
				// We only allow users to modify the Evaluation if the Membership isn't WD (SUP021619 v2.0.4j) and resultstatus <> Completed
				// v3.4.007 also block if membershipstatus = -1
				if (ns1blankspace.objectContext != -1 
					&& ns1blankspace.objectContextData['audit.agrisubscription.status'] != nsFreshcare.data.grower.subscriptionStatusWD 
					&& (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
						&& (ns1blankspace.objectContextData['audit.resultStatusCompleted'] != nsFreshcare.data.audit.resultStatusCompleted
							&& ns1blankspace.objectContextData['audit.membershipstatus'] != -1)
						))
				{
					aHTML.push('<tr><td><span id="ns1blankspaceEvaluationModify" class="ns1blankspaceAction" data-mode="modify">' +
														'Modify Results</span></td></tr>');
				}

				aHTML.push('</table>');					
					
				$('#ns1blankspaceEvaluationsColumn2').html(aHTML.join(''));

				$('#ns1blankspaceEvaluationModify').button({
					label: 'Modify',
					icons: {
						primary: 'ui-icon-pencil'
					}
				})
				.click(function() 
				{
					if ($(this).attr('data-mode') === 'modify') 
					{
						$(this).button({
							label: 'Cancel',
							icons: {
								primary: 'ui-icon-close'
							}
						})
						.attr('data-mode', 'cancel');

						$.each($('#ns1blankspaceMainEvaluation input'), function() 
						{
							$(this)
								.attr('data-mandatory', '1')
								.removeClass('nsFreshcareDisabled')
								.attr('disabled', false);
						});
						$('#ns1blankspaceEvaluationsComments')
							.removeClass('nsFreshcareDisabled')
							.attr('disabled', false);
					}
					else 
					{

						ns1blankspace.show({selector: '#ns1blankspaceMainEvaluation', refresh: true});
						nsFreshcare.admin.audit.evaluation();
					}

				});
			}

			ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});

			// v2.0.4j SUP021619 We disable if not admin & resultstatus has been set Completed
			// v3.2.005 only applies to existing records
			// v3.4.007 block also if membershipstatus = -1
			if (ns1blankspace.objectContext != -1 && nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
				&& (ns1blankspace.objectContextData['audit.resultstatus'] === nsFreshcare.data.audit.resultStatusCompleted
				|| ns1blankspace.objectContextData['audit.membershipstatus'] != -1)) 
			{
				// All fields are to be disabled
				$('#ns1blankspaceMainEvaluation input').attr('disabled', true);
				$('#ns1blankspaceMainEvaluation input').addClass('nsFreshcareDisabled');
				$('#ns1blankspaceMainEvaluation textarea').addClass('nsFreshcareDisabled');
				$('#ns1blankspaceMainEvaluation textarea').attr('disabled', true);
			}

			if (ns1blankspace.objectContextData != undefined)
			{
				$('#ns1blankspaceEvaluationsTrainer').attr('data-id', ns1blankspace.objectContextData["audit.trainercontactbusiness"]);
				$('#ns1blankspaceEvaluationsTrainer').val(ns1blankspace.objectContextData["audit.trainercontactbusinesstext"].formatXHTML());
				$('#ns1blankspaceEvaluationsTrainingDate').val(ns1blankspace.objectContextData['audit.trainingdate'].formatXHTML());
				$('#ns1blankspaceEvaluationsAssessmentLength').val(ns1blankspace.objectContextData['audit.trainingduration'].formatXHTML());
				$('#ns1blankspaceEvaluationsComments').val(ns1blankspace.objectContextData['audit.trainingnotes']);
				$('[name="radioRating"][value="' + ns1blankspace.objectContextData['audit.trainingrating'] + '"]').attr('checked', true);
			}
			// v3.3.001 SUP023763 Pre-populate if we have the data
			else if (oTraineeData || nsFreshcare.admin.audit.data.traineeDetails)
			{
				if (oTraineeData && oTraineeData['agritraineeattendancelink.attendee.course.trainercontactbusiness'])
				{
					$('#ns1blankspaceEvaluationsTrainer').attr('data-id', oTraineeData['agritraineeattendancelink.attendee.course.trainercontactbusiness']);
					$('#ns1blankspaceEvaluationsTrainer').val(oTraineeData['agritraineeattendancelink.attendee.course.trainercontactbusinesstext']);
				}
				else if (nsFreshcare.admin.audit.data.traineeDetails && nsFreshcare.admin.audit.data.traineeDetails.trainer)
				{
					$('#ns1blankspaceEvaluationsTrainer').attr('data-id', nsFreshcare.admin.audit.data.traineeDetails.trainer);
					$('#ns1blankspaceEvaluationsTrainer').val(nsFreshcare.admin.audit.data.traineeDetails.trainerText);
				}
			
				if (oTraineeData && oTraineeData['agritraineeattendancelink.attendee.course.coursedate'])
				{
					$('#ns1blankspaceEvaluationsTrainingDate').val(oTraineeData['agritraineeattendancelink.attendee.course.coursedate']);
				}
				else if (nsFreshcare.admin.audit.data.traineeDetails && nsFreshcare.admin.audit.data.traineeDetails.trainingDate)
				{
					$('#ns1blankspaceEvaluationsTrainingDate').val(nsFreshcare.admin.audit.data.traineeDetails.trainingDate);
				}
			}

			// v3.3.001 SUP023782 Pre-populate from Audit Duration on Details tab
			if ($('#ns1blankspaceMainDetails').html() != '')
			{
				$('#ns1blankspaceEvaluationsAssessmentLength').val($('#ns1blankspaceDetailsAuditDuration').val());
			}
		}	
	},

	getTraineeName: function()
	{
		sName = '';

		if ($('#ns1blankspaceMainTrainee').html() != '')
		{
			if (nsFreshcare.admin.audit.data.traineeDetails)
			{
				sName = nsFreshcare.admin.audit.data.traineeDetails.traineeFirstName + ' ' + nsFreshcare.admin.audit.data.traineeDetails.traineeSurname;
			}

			else if ($('#ns1blankspaceAttendanceLinks .nsFreshcareSelected').length > 0)
			{
				var sLinkId = $('#ns1blankspaceAttendanceLinks .nsFreshcareSelected').first().attr('id').split('_').pop();
				var aName = $('#ns1blankspaceAttendanceLinkContactPersontext_' + sLinkId).html().split(',');
				sName = aName[1] + ' ' + aName[0];
			}
		}

		else if (ns1blankspace.objectContextData)
		{
			if (ns1blankspace.objectContextData["audit.sequalifyingtraininglink.attendee.attendingtrainee"])
			{
				ns1blankspace.objectContextData["audit.sequalifyingtraininglink.attendee.attendingtrainee"].formatXHTML();
			}
			else if (ns1blankspace.objectContextData['audit.semissingtraineename'])
			{
				sName = ns1blankspace.objectContextData['audit.semissingtraineename'].formatXHTML();
			}
		}
		return sName;
	},

	scopeExtension:	
	{	/* v3.1.2. SUP022693 Added */
		search: function(oParam)
		{
			// Search for already entered scope extension values and
			// then search for most recent audit's certificate action and then search for Membership's scope fields
			// If existing record and grower's Membership is WD, disable all fields. User must contact freshcare via grower form
			var iSubscription = ($('#ns1blankspaceDetailsMembership').attr('data-id')) ? $('#ns1blankspaceDetailsMembership').attr('data-id') : ns1blankspace.data.subscription;
			
			if (oParam.extensionSearchStep == undefined) 
			{
				oParam.extensionSearchStep = 1;
				nsFreshcare.admin.audit.data.scopeExtension = {};
			}

			// Search for already entered Scope Extension values
			if (oParam.extensionSearchStep == 1)
			{
				if (ns1blankspace.objectContext != -1)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_CERTIFICATE_UPGRADE_SEARCH';
					oSearch.addField('object,objectcontext,subscription,audit,changedfield,changedvalue');
					oSearch.addFilter('audit', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addFilter('subscription', 'EQUAL_TO', iSubscription);
					oSearch.sort('object', 'asc');
					oSearch.sort('changedfield', 'asc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions = oResponse.data.rows;
							oParam.extensionSearchStep = 2;
							nsFreshcare.admin.audit.scopeExtension.search(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding Scope Extension records: ' + oResponse.error.errornotes);
							// v3.4.019 Now uses isLab flag
							if (ns1blankspace.isLab)
							{
								oParam.extensionSearchStep = 2;
								nsFreshcare.admin.audit.scopeExtension.search(oParam);
							}
						}
					});
				}
				else
				{
					nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions = [];
					oParam.extensionSearchStep = 2;
					nsFreshcare.admin.audit.scopeExtension.search(oParam);
				}
			}

			// Now search for Certificate actions on the most recent audit
			else if (oParam.extensionSearchStep == 2)
			{
				if (iSubscription)
				{
					// v4.0.012 SUP024157 Added filter to make sure we don't pick up scope extension audits
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AUDIT_SEARCH';
					oSearch.addField('actualdate,audit.agrisubscription.membership,audit.action.description,audit.action.duedate');
					oSearch.addFilter('audit.subscription', 'EQUAL_TO', iSubscription);
					oSearch.addFilter('id', 'NOT_EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addFilter('type', 'NOT_EQUAL_TO', nsFreshcare.data.audit.typeScopeExtension);
					oSearch.addFilter('audit.action.actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
					oSearch.sort('actualdate', 'desc');
					oSearch.sort('audit.action.createddate', 'desc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction = JSON.parse(oResponse.data.rows[0]['audit.action.description']);	
								oParam.extensionSearchStep = 3;
								nsFreshcare.admin.audit.scopeExtension.search(oParam);
							}
							else
							{
								ns1blankspace.status.error('Unable to find last Audit\'s Certificate.');
							}
						}
						else
						{
							ns1blankspace.status.error('Error searching for last Audit: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					ns1blankspace.container.confirm({title: 'Please choose the Membership below.'});
				}
			}

			// Find 'scope' items on Subscription - first up is Sites
			else if (oParam.extensionSearchStep == 3)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('address1,address2,addresssuburb,addressstate,addresspostcode,addresscountry,status,type,address.addresslink.id,address.addresslink.object,address.addresslink.objectcontext');
				oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('address.addresslink.objectcontext', 'EQUAL_TO', iSubscription);
				oSearch.addFilter('type', 'EQUAL_TO', '1');		// Street Addresses only
				oSearch.sort('address1', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						nsFreshcare.admin.audit.data.scopeExtension.subscriptionSites = oResponse.data.rows;
						oParam.extensionSearchStep = 4;
						nsFreshcare.admin.audit.scopeExtension.search(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error searching for Membership Sites: ' + oResponse.error.errornotes);
					}
				});
			}

			// Find Subscription Categories
			else if (oParam.extensionSearchStep == 4)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
				oSearch.addField('productcategory,productcategorytext,subscription');
				oSearch.addFilter('subscription', 'EQUAL_TO', iSubscription);
				oSearch.sort('productcategorytext', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						nsFreshcare.admin.audit.data.scopeExtension.subscriptionCategories = oResponse.data.rows;
						oParam.extensionSearchStep = 5;
						nsFreshcare.admin.audit.scopeExtension.search(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error searching for Membership Categories: ' + oResponse.error.errornotes);
					}
				});
			}

			// Find Subscription Scope
			else if (oParam.extensionSearchStep == 5)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('scope,scopetext,object,objectcontext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iSubscription);
				oSearch.sort('scopetext', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						nsFreshcare.admin.audit.data.scopeExtension.subscriptionScopes = oResponse.data.rows;
						oParam.extensionSearchStep = 6;
						nsFreshcare.admin.audit.scopeExtension.search(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error searching for Membership Scopes: ' + oResponse.error.errornotes);
					}
				});
			}

			// Find Subscription Crops
			else if (oParam.extensionSearchStep == 6)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('crop,harvestmonth');
				oSearch.addFilter('id', 'EQUAL_TO', iSubscription);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						nsFreshcare.admin.audit.data.scopeExtension.crops = oResponse.data.rows[0].crop;
						nsFreshcare.admin.audit.data.scopeExtension.harvestmonths = oResponse.data.rows[0].harvestmonth;
						oParam.extensionSearchStep = 10;
						nsFreshcare.admin.audit.scopeExtension.search(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error searching for Membership: ' + oResponse.error.errornotes);
					}
				});
			}

			// Call back to show function
			else if (oParam.extensionSearchStep == 10)
			{
				delete(oParam.extensionSearchStep);
				nsFreshcare.admin.audit.scopeExtension.show(oParam);
			}
		},

		show: function(oParam)
		{
			// Display list of 'scope' items as extracted from most recent audit's certificate action alongside current Subscription's values
			// User then chooses which items are 'new' and these 'new' items are saved into AGRI_CERTIFICATE_UPGRADE
			var aHTML = [];

			if (oParam == undefined) {oParam = {}}
			if (oParam.extensionShowStep == undefined) {oParam.extensionShowStep = 1}

			if (oParam.extensionShowStep == 1)
			{
				oParam.extensionShowStep = 2;
				nsFreshcare.admin.audit.scopeExtension.search(oParam);
			}

			else if (oParam.extensionShowStep == 2)
			{
				if ($('#ns1blankspaceMainExtension').attr('data-loading') == '1')
				{
					$('#ns1blankspaceMainExtension').attr('data-loading', '');
					
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceExtensionsRow1" class="ns1blankspaceColumn1Flexible"></td>' +
									'</tr>' + 
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceExtensionsRow2" class="ns1blankspaceColumn1Flexible"></td>' +
									'</tr>' + 
									'</table>');					
					
					$('#ns1blankspaceMainExtension').html(aHTML.join(''));
					
					
					var aHTML = [];
					aHTML.push('<table class="ns1blankspace">');

					// Display already-chosen Scope Upgrades first
					aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">Extended Scope Items</td></tr>');

					aHTML.push('<tr><td style="width:100%; border_bottom: 1px solid #A0A0A0;" colspan="2">');

					aHTML.push('<table id="ns1blankspaceScopeScopeItems" class="ns1blankspace">');

					$.each(nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions, function(i, extension)
					{
						var sType = '';
						var sValue = '';
						if (extension.object == nsFreshcare.objectScope) 
						{
							sType = 'Scope';
							sValue = $.map($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionScopes, function(x) {return x.id == extension.objectcontext}),
											function(y) {return y.scopetext}).shift();
						}
						if (extension.object == nsFreshcare.objectProductCategory) 
						{
							sType = 'Category';
							sValue = $.map($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionCategories, function(x) {return x.id == extension.objectcontext}),
											function(y) {return y.productcategorytext}).shift();
						}
						if (extension.object == nsFreshcare.objectLocation) 
						{
							sType = 'Site';
							sValue = $.map($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionSites, function(x) {return x.id == extension.objectcontext}),
											function(y) {return y.address1 + ' ' + (y.address2 ? ' ' + y.address2 : '') + y.addresssuburb + ' ' + y.addressstate + ' ' + y.addresspostcode}).shift();
						}
						if (extension.changedfield == 'crop') 
						{
							sType = 'Crops';
							sValue = extension.changedvalue;			// ToDo Need to split this out into individual crop values
						}

						aHTML.push('<tr>' +
										'<td class="ns1blankspaceRow">' + sType + '</td>' +
										'<td class="ns1blankspaceRow">' + sValue + '</td>' +
										'<td class="ns1blankspaceScopeExtensionRemove" style="width: 25px; text-align: right;"' +
											' data-object="' + extension.object + '" data-objectContext="' + extension.objectcontext + '" data-id="' + extension.id + '"' +
											' data-changedfield="' + extension.changedfield + '" data-changedvalue="' + extension.changedvalue + '"></td>' + 
									'</tr>');
					});

					if (nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions.length == 0)
					{
						aHTML.push('<tr id="ns1blankspaceScopeScopeItemsNothing"><td colspan="3">No items found</td></tr>');
					}
					aHTML.push('</table></td></tr>');

					aHTML.push('<tr><td colspan="2">&nbsp;</td></tr>');
					aHTML.push('<tr><td>&nbsp;</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTableCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Current Scope Values' +
									'</td>' +
									'<td style="text-align:right;">' +
										'<span class="ns1blankspaceAction" id="ns1blankspaceScopeDataToggle" title="Show Current Values"></span>' +
									'</td></tr>');

					aHTML.push('</table>');

					$('#ns1blankspaceExtensionsRow1').html(aHTML.join(''));

					// v3.4.007 Don't bind the buttons if the CB can't edit the audit
					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin || ns1blankspace.objectContext == -1
						|| (ns1blankspace.objectContext != -1 
							&& ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted
							&& ns1blankspace.objectContextData['audit.membershipstatus'] != -1))
					{
						$('.ns1blankspaceScopeExtensionRemove')
							.button(
							{
								text: 'Remove',
								icons: {primary: 'ui-icon-close'}
							})
							.on('click', function()
							{
								nsFreshcare.admin.audit.scopeExtension.remove(this);
							});

						$('#ns1blankspaceScopeDataToggle')
							.button(
							{
								text: false,
								icons: {primary: (nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions.length == 0 
													? 'glyphicon-chevron-up' : 'glyphicon-chevron-down')}
							})
							.attr('title', (nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions.length == 0 ? 'Hide' : 'Show') + ' Current Values')
							.on('click', function()
							{
								if ($(this).attr('title') == "Hide Current Values")
								{
									$(this).attr('title', 'Show Current Values')
									$(this).button('option', {icons: {primary: 'glyphicon-chevron-down'}})
									$('#ns1blankspaceScopeCurrentData').hide();
								}
								else
								{
									$(this).attr('title', 'Hide Current Values')
									$(this).button('option', {icons: {primary: 'glyphicon-chevron-up'}})
									$('#ns1blankspaceScopeCurrentData').hide();
								}
								/*if ($(this).button('option', 'label') == 'Hide Current Values')
								{
									$(this).button('option', 'label', 'Show Current Values');
									$(this).button('option', {icons: {primary: 'ui-icon-triangle-1-s'}})
									$('#ns1blankspaceScopeCurrentData').hide();
								}
								else
								{
									$(this).button('option', 'label', 'Hide Current Values');
									$(this).button('option', {icons: {primary: 'ui-icon-triangle-1-n'}})
									$('#ns1blankspaceScopeCurrentData').show();
								}*/
							});
					}

					// If there are any scopeextension rows with values that have been deleted, remove them automatically now
					$.each($('.ns1blankspaceScopeExtensionRemove'), function()
					{
						if ($(this).parent().children().eq(1).html() == 'undefined')
						{
							$(this).click();
						}
					});


					// Now show list of last Audit's data in the following order:
					// Scope, Category, Sites, Crops
					// LHS shows values from Certificate
					// RHS shows values from Subscription and allows user to select if a) not on certificate and b) not already in scopeExtension
					aHTML = [];

					aHTML.push('<table class="ns1blankspace">');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td><table class="ns1blankspace" id="ns1blankspaceScopeCurrentData">');

					aHTML.push('<tr><td class="ns1blankspaceCaption" style="text-align: center; width: 50%;">Current Certificate Values</td>' +
									'<td class="ns1blankspaceCaption" style="text-align: center;">Current Membership Values</td></tr>');

					aHTML.push('<tr><td colspan="2">');

					aHTML.push('<table class="ns1blankspace">');


					// Scopes
					aHTML.push('<tr><td colspan="2" style="background-color: #F0F0F0;" class="ns1blankspaceCaption">Scope</td></tr>');

					aHTML.push('<tr><td style="width: 50%; border-right: 1px solid #F0F0F0;"><table class="ns1blankspace">');
					var aCertificateValues = nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.certificateScope.split(', ').sort(function(a, b) {return a > b});
					$.each(aCertificateValues, function(i, scope)
					{
						var iScope = $.grep(nsFreshcare.data.scopeOptions, function(x) {return x.title.toLowerCase() == scope.toLowerCase()}).shift();
						if (iScope)
						{
							aHTML.push('<tr><td>' + scope + '</td></tr>');
						}
					});
					aHTML.push('</table></td>');

					aHTML.push('<td><table class="ns1blankspace" id="ns1blankspaceScopeMembershipScope">');
					$.each(nsFreshcare.admin.audit.data.scopeExtension.subscriptionScopes, function(i, scope)
					{
						var bChecked = ($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.certificateScope.split(', '), 
											function(x) {return x.toLowerCase() == scope.scopetext.toLowerCase()}).length == 0);
						
						var bShowCheck = (bChecked 
											&& $.grep(nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions, function(x) 
														{return x.object = nsFreshcare.objectScope && x.objectcontext == scope.id}).length == 0);

						if (scope.scopetext != '')
						{
							aHTML.push('<tr ' + (bShowCheck ? 'class="ns1blankspaceScopeExtensionHighlight"' : '') + '>' +
											'<td>' + scope.scopetext + '</td>' +
											'<td style="text-align:right;"' +
												' id="ns1blankspace-' + nsFreshcare.objectScope + '-' + scope.id + '" data-value="' + scope.scopetext + '">' +
												((bShowCheck)
													? '<span id="ns1blankspaceExtensionSubscriptionScope-' + scope.id + '"' +
														' data-scope="' + scope.scope + '" data-scopetext="' + scope.scopetext + '"' +
														' data-object="' + nsFreshcare.objectScope + '"' + 
														(bChecked ? ' class="ns1blankspaceScopeItemSelect" title="Add' : ' title="Remove') + ' Scope Item">' 
													: '') +
												'</td>' +
										'</tr>');
						}
					});
					aHTML.push('</table></td></tr>');


					// Categories
					aHTML.push('<tr><td style="border-right: 1px solid #F0F0F0;">&nbsp;</td><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td colspan="2" style="background-color: #F0F0F0;" class="ns1blankspaceCaption">Category</td></tr>');

					aHTML.push('<tr><td style="width: 50%; border-right: 1px solid #F0F0F0;"><table class="ns1blankspace">');
					var aCertificateValues = nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.category.split(', ').sort(function(a, b) {return a > b});
					$.each(aCertificateValues, function(i, category)
					{
						var iCategory = $.grep(nsFreshcare.data.productGroups, function(x) {return x[1].toLowerCase() == category.toLowerCase()}).shift();
						if (iCategory)
						{
							aHTML.push('<tr><td>' + category + '</td></tr>');
						}
					});
					aHTML.push('</table></td>');

					aHTML.push('<td><table class="ns1blankspace" id="ns1blankspaceScopeMembershipCategory">');
					$.each(nsFreshcare.admin.audit.data.scopeExtension.subscriptionCategories, function(i, category)
					{
						var bChecked = ($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.category.split(', '), 
											function(x) {return x.toLowerCase() == category.productcategorytext.toLowerCase()}).length == 0);

						var bShowCheck = (bChecked 
											&& $.grep(nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions, function(x) 
														{return x.object = nsFreshcare.objectProductCategory && x.objectcontext == category.id}).length == 0);

						if (category.productcategorytext != '')
						{
							aHTML.push('<tr ' + (bShowCheck ? 'class="ns1blankspaceScopeExtensionHighlight"' : '') + '>' +
											'<td>' + category.productcategorytext + '</td>' +
											'<td style="text-align:right;"' +
												' id="ns1blankspace-' + nsFreshcare.objectProductCategory + '-' + category.id + '" data-value="' + category.productcategorytext + '">' +
												((bShowCheck)
													? '<span id="ns1blankspaceExtensionSubscriptionCategory-' + category.id + '"' +
	 													' data-category="' + category.productcategory + '" data-categorytext="' + category.productcategorytext + '"' +
														' data-object="' + nsFreshcare.objectProductCategory + '" ' + 
	 													(bChecked ? ' class="ns1blankspaceScopeItemSelect" title="Add ' : ' title="Remove') + ' Scope Item">'
	 												: '') +
											'</td>' +
										'</tr>');
						}
					});
					aHTML.push('</table></td></tr>');


					// Sites
					aHTML.push('<tr><td style="border-right: 1px solid #F0F0F0;">&nbsp;</td><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td colspan="2" style="background-color: #F0F0F0;" class="ns1blankspaceCaption">Sites</td></tr>');

					aHTML.push('<tr><td style="width: 50%; border-right: 1px solid #F0F0F0;"><table class="ns1blankspace">');
					var aCertificateValues = nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.sites.sort(function(a, b) 
																	{return (a.streetCombined + ' ' + a.streetLocation) > (b.streetCombined + ' ' + b.streetLocation)});
					$.each(aCertificateValues, function(i, site)
					{
						aHTML.push('<tr><td style="font-size:0.75em;">' + site.streetCombined + ' ' + site.streetLocation + '</td></tr>');
					});
					aHTML.push('</table></td>');

					aHTML.push('<td><table class="ns1blankspace" id="ns1blankspaceScopeMembershipSite">');
					$.each(nsFreshcare.admin.audit.data.scopeExtension.subscriptionSites, function(i, site)
					{
						var sAddress = (site.address1 + (site.address2 ? ' ' + site.address2 : '') + ' ' + site.addresssuburb + ' ' + site.addressstate + ' ' + site.addresspostcode);
						var bChecked = ($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.sites, 
											function(x) {return (x.streetCombined + ' ' + x.streetLocation).toLowerCase() == sAddress.toLowerCase()}).length == 0);
						var bShowCheck = (bChecked 
											&& $.grep(nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions, function(x) 
														{return x.object = nsFreshcare.objectLocation && x.objectcontext == site.id}).length == 0);

						if (sAddress != '')
						{
							aHTML.push('<tr ' + (bShowCheck ? 'class="ns1blankspaceScopeExtensionHighlight"' : '') + '>' +
											'<td style="font-size:0.75em;">' + sAddress+ '</td>' +
											'<td style="text-align:right;font-size:0.75em;"' +
												' id="ns1blankspace-' + nsFreshcare.objectLocation + '-' + site.id + '" data-value="' + sAddress + '">' +
												((bShowCheck) 
													? '<span id="ns1blankspaceExtensionSubscriptionCategory-' + site.id + '"' +
	 													' data-linkid="' + site['address.addresslink.id'] + '" data-site="' + sAddress + '"' +
														' data-object="' + nsFreshcare.objectLocation + '"' + 
	 													(bChecked ? ' class="ns1blankspaceScopeItemSelect" title="Add' : ' title="Remove') + ' Scope Item">'
	 												: '') +
											'</td>' +
										'</tr>');
						}
					});
					aHTML.push('</table></td></tr>');



					// Crops
					aHTML.push('<tr><td style="border-right: 1px solid #F0F0F0;">&nbsp;</td><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td colspan="2" style="background-color: #F0F0F0;" class="ns1blankspaceCaption">Crops</td></tr>');

					aHTML.push('<tr><td style="width: 50%; border-right: 1px solid #F0F0F0;"><table class="ns1blankspace">');
					var aCertificateValues = nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.crops.split(', ').sort(function(a, b) {return a > b});
					$.each(aCertificateValues, function(i, crop)
					{
						aHTML.push('<tr><td>' + crop + '</td></tr>');
					});
					aHTML.push('</table></td>');

					aHTML.push('<td><table class="ns1blankspace" id="ns1blankspaceScopeMembershipCrop">');
					$.each(nsFreshcare.admin.audit.data.scopeExtension.crops.split(', '), function(i, crop)
					{
						var bChecked = ($.grep(nsFreshcare.admin.audit.data.scopeExtension.subscriptionAction.crops.split(', '), 
											function(x) {return x.toLowerCase() == crop.toLowerCase()}).length == 0);
						var bShowCheck = (bChecked 
											&& $.grep(nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions, function(x) 
														{return x.changedfield == 'crop' && x.changedvalue == crop}).length == 0);

						if (crop != '')
						{
							aHTML.push('<tr ' + (bShowCheck ? 'class="ns1blankspaceScopeExtensionHighlight"' : '') + '>' +
											'<td>' + crop + '</td>' +
											'<td style="text-align:right;"' +
												' id="ns1blankspace-crop-' + crop.replace(/ /g, '') + '" data-value="' + crop + '">' +
												((bShowCheck)
													? '<span id="ns1blankspaceExtensionSubscriptionCategory-' + crop.replace(/ /g, '') + '"' +
	 													' data-crop="' + crop + '" data-changedfield="crop"' +
	 													(bChecked ? ' class="ns1blankspaceScopeItemSelect" title="Add' : ' title="Remove') + ' Scope Item">'
	 												: '') +
											'</td>' +
										'</tr>');
						}
					});
					aHTML.push('</table></td></tr>');


					aHTML.push('</table>');

					$('#ns1blankspaceExtensionsRow2').html(aHTML.join(''));

					if (nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions.length > 0) {$('#ns1blankspaceScopeCurrentData').hide()}

					// v3.4.007 Don't bind the buttons if the CB can't edit the audit
					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin || ns1blankspace.objectContext == -1
						|| (ns1blankspace.objectContext != -1
							&& ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted
							&& ns1blankspace.objectContextData['audit.membershipstatus'] != -1))
					{
						nsFreshcare.admin.audit.scopeExtension.bind();
					}
				}
			}
		},

		bind: function()
		{
			$('.ns1blankspaceScopeItemSelect.ui-button').button('destroy');
			$('.ns1blankspaceScopeItemSelect')
				.button(
				{
					label: false,
					icons: {primary: 'glyphicon-ok'}
				})
				.attr('data-selected', '1');

			$('.ns1blankspaceScopeExtensionHighlight')
				.unbind('hover')
				.unbind('click');
			$('.ns1blankspaceScopeExtensionHighlight')
			.hover(
				function()
				{
					$(this)
					.css('background-color', '#D4D4D4')
					.css('cursor', 'pointer')

				},
				function()
				{
					$(this).css('background-color', 'transparent');
				}
			)
			.on('click', function() 
			{
				// We're on the row. Toggle the check icon in the  last table cell in the row 
				var oCheckElement = $(this).children().last().children().first();
				
				if ($(oCheckElement).attr('data-selected') == '1')
				{
					$(oCheckElement)
						.attr('data-selected', '0')
						.button('destroy');
				}
				else
				{
					$(oCheckElement)
						.attr('data-selected', '1')
						.attr('title', 'Add Scope Item')
						.button({label: false, icons: {primary: 'glyphicon-ok'}});
				}
			});
		},

		remove: function(oXHTMLElement)
		{
			var iObjectContext = $(oXHTMLElement).attr('data-objectContext');
			var iObject = $(oXHTMLElement).attr('data-object');
			var sChangedField = $(oXHTMLElement).attr('data-changedfield');
			var sChangedValue = $(oXHTMLElement).attr('data-changedvalue');
			var iRowID = $(oXHTMLElement).attr('data-id');
			var sScopeDesc = $($(oXHTMLElement).parent().children().first()).html();
			var sScopeText = $($(oXHTMLElement).parent().children().eq(1)).html()
			var sHTML = [];

			var oData = {id: iRowID, remove: '1'};
			var sCheckBoxID = 'ns1blankspace-' + (iObject ? iObject + '-' + iObjectContext: sChangedField + '-' + sChangedValue.replace(/ /g, ''));
													

			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_UPGRADE_MANAGE'),
				data: oData,
				success: function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						// Now we need to remove it from the UI and re-bind the corresponding row in the 'Current scope Values' section
						sHTML = '<span id="ns1blankspaceExtensionSubscription' + sScopeDesc + '-' + iObjectContext + '" style="width:25px;"' +
									' data-' + sScopeDesc.toLowerCase() + 'text="' + sScopeText + '"' +
									' data-object="' + iObject + '"' + 
									' data-selected="1"' + 
									' class="ns1blankspaceScopeItemSelect">';
						
						$('#' + sCheckBoxID).html(sHTML);
						nsFreshcare.admin.audit.scopeExtension.bind();

						// Now remove from scopeExtensions array and from UI
						nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions = 
							$.grep(nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions, function(x) {return x.id != iRowID});
						$(oXHTMLElement).parent().remove();

					}
					else
					{
						ns1blankspace.status.error('Error removing Scope Item: ' + oResponse.error.errornotes);
					}
				}
			});
		}
	},

	setTrainerBusiness: function()
	{	
		var sXHTMLElementID = ns1blankspace.xhtml.divID.replace('#', '');

		// v2.0.4 added so that we're saving the contactbusiness id of the trainer, not the contactperson id
		if ($('#' + sXHTMLElementID).attr('data-id'))
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			oSearch.addField('contactbusiness');
			oSearch.addFilter('id', 'EQUAL_TO', $('#' + sXHTMLElementID).attr('data-id'));
			oSearch.rows = 1;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
				{
					$('#' + sXHTMLElementID).attr('data-id', oResponse.data.rows[0].contactbusiness);
				}
				else
				{
					$('#' + sXHTMLElementID).removeAttr('data-id')
					ns1blankspace.status.error(oResponse.error.errornotes);
				}
			});
		}
	},

	certificates:
	{
		search: function(oParam)
		{
			// First find the 'Version' action records, then find the link to the corresponding PDF attachment - only most recent required

			var oRows = [];
			var oRoot = ns1blankspace.rootnamespace;

			var oSearch = new AdvancedSearch();
			oSearch.method = 'ACTION_SEARCH';
			oSearch.addField('subject,description,duedatetime,createddate,createdusertext,object,objectcontext,contactbusiness');
			oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
			oSearch.sort('createddate', 'desc');
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK')
				{
					if (oResponse.data.rows.length > 0)
					{
						oRows = $.map(oResponse.data.rows, function(x) 
							{
								return {id: x.id
									  , subject: x.subject
									  , description: x.description
									  , duedate: x.duedatetime
									  , createddate: x.createddate
									  , createdusertext: x.createdusertext
									  , object: x.objectcontext
									  , objectcontext: x.objectcontext
									  , contactbusiness: x.contactbusiness
									  , attachmentLink: undefined
									  , attachment: undefined
									}
							});

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_ATTACHMENT_SEARCH';
						oSearch.addField('title,attachment,link,createddate,createduser,objectcontext');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAction);
						oSearch.addFilter('objectcontext', 'IN_LIST', $.map(oResponse.data.rows, function(x) {return x.id}).join(','));
						oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.attachmentTypeCertificate);
						oSearch.sort('objectcontext', 'desc');
						oSearch.sort('createddate', 'desc');
						oSearch.getResults(function(oResponse) 
						{
							
							if (oResponse.status === 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									$.each(oRows, function() 
									{
										var sActionId = this.id;
										if (this.attachmentLink === undefined)
										{
											this.attachmentLink = $.map($.grep(oResponse.data.rows, function(x) {return x.objectcontext === sActionId})
																   , function(y) {return y.id})
															  .shift();
											this.attachment = $.map($.grep(oResponse.data.rows, function(x) {return x.objectcontext === sActionId})
																   , function(y) {return y.attachment})
															  .shift();
										}
									});
								}
								oResponse.data.rows = oRows;
							}

							oRoot.admin.audit.certificates.show(oParam, oResponse)
						});
					}
					else
					{
						oRoot.admin.audit.certificates.show(oParam, oResponse);
					}
				}
				else
				{
					oRoot.admin.audit.certificates.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse)
		{
			// v3.1.1 Added ability to remove certificate / certificate attachments.
			var sXHTMLElementID = 'ns1blankspaceMainCertificates';
			var aHTML = [];

			if (oParam)
			{
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID}
			}

			aHTML.push('<table class="ns1blankspaceContainer">' +
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceAuditCertificatesColumn1" class="ns1blankspaceColumn1Large">' +
						ns1blankspace.xhtml.loading +
						'</td>' +
						'<td id="ns1blankspaceAuditCertificatesColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
						'</td>' +
						'</tr>' +
						'</table>');				
			
			$('#' + sXHTMLElementID).html(aHTML.join(''));
			$('#ns1blankspaceMainCertificates').attr('data-loading', '');
			
			aHTML = [];		
						
			if (oResponse.status === 'OK')
			{
				if (oResponse.data.rows.length === 0)
				{
					aHTML.push('No Certificates');
					$('#ns1blankspaceAuditCertificatesColumn1').html(aHTML.join(''));	
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceAuditCertificates" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Version</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Created On</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Created By</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(oResponse.data.rows, function() 
					{
						var oCertificateData = JSON.parse(this.description);
						var sCertificateStyle = 'font-size:80%; padding:5px 5px 5px 0px;"'

						aHTML.push('<tr id="ns1blankspaceCertificateRow-' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow nsFreshcareCertificateVersionView"' + 
										' id="ns1blankspaceCertificateVersionNumber-' + this.id + 
										'">' +
											this.subject.split(': ').pop() + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow nsFreshcareCertificateVersionView"' + 
										' id="ns1blankspaceCertificateCreatedDate-' + this.id + 
										'">' +
											this.createddate + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow nsFreshcareCertificateVersionView"' + 
										' id="ns1blankspaceCertificateCreatedBy-' + this.id + 
										'">' +
											this.createdusertext + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow" style="width:100px;">' + 
										'<span id="ns1blankspaceCertificateAttachment-' + this.id + '"' +
										' class="' + ((this.attachmentLink != undefined) ? 'ns1blankspaceRowAuditCertificatePrint' : 'ns1blankspaceAuditCertificateNull') + '"' + 
										' data-link="/download/' + this.attachmentLink + '" title="Print">' +
											'</span>');
						
						if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
						{
							aHTML.push('<span id="ns1blankspaceCertificateRemove-' + this.id + '"' +
										' class="ns1blankspaceRowAuditCertificateRemove"' + 
										' style="text-align:right;"' +
										' data-attachment="' + this.attachment + '"' +
										' data-action="' + this.id + '" title="Remove">' +
											'</span>');
						}

						aHTML.push('</td>');

						aHTML.push('</tr>');

						aHTML.push('<tr id="ns1blankspaceActionDescriptionRow-' + this.id + '" class="nsFreshcareCertificateDescription">' +
									'<td colspan="4" style="border: 1px solid #DCDCDC; margin: 10px 0px 10px 0px; background-color: #DDEABB;">');
										
						aHTML.push('<table style="width:100%;"><tr><td colspan="2" style="padding: 5px 0px 5px 0px;">' +
										'<i>Certificate data for ' + this.subject.split(': ').pop() + '</i></td></tr>');

						aHTML.push('<td style="width:175px; font-weight:bold;' + sCertificateStyle + '>' +
										'Certificate Number</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.certificateNumber.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Code of Practice</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.codeOfPractice.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Business Name</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.growerBusinessName.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Trading Name</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.growerTradeName.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Sites</td>' +
										'<td style="' + sCertificateStyle + '>' + 
											$.map(oCertificateData.sites, 
												  function(x) {return x.streetCombined.formatXHTML() + ' ' + x.streetLocation.formatXHTML()})
											.join('<br />') + 
										'</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Crops</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.crops.formatXHTML() + '</td>' +
										'</tr>');

						// v4.0.001 Scope doesn't always exist so don't display if blank 
						if (oCertificateData.certificateScope)
						{
							aHTML.push('<td style="font-weight:bold;font-size:80%;font-size:80%;">' +
											'Scope</td>' +
											'<td style="' + sCertificateStyle + '>' + oCertificateData.certificateScope.formatXHTML() + '</td>' +
											'</tr>');
						}

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Category</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.category.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Audit Date</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.auditDate.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Certification Achieved</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.certificationAchieved.formatXHTML() + '</td>' +
										'</tr>');

						// v3.4.010 SUP023939 Was showing ReCert Audit Date instead of Recert Audit Due
						// v4.0.001 reCertificationDue is not always there - show reCertifictionDate if not
						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Re-certification Audit Due</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData[(oCertificateData.reCertificationDue ? 'reCertificationDue' : 'reCertificationDate')].formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Certificate Expiry</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.certificateExpiry.formatXHTML() + '</td>' +
										'</tr>');

						// v2.0.4 SUP021410 Added Reference number
						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Reference Number</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.auditReference.formatXHTML() + '</td>' +
										'</tr>');

						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'Certification Body</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.certificationBodyLegalName.formatXHTML() + '</td>' +
										'</tr>');

						// v3.3.001 SUP023474 Added JASANZAccredited
						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'JASANZ Audit</td>' +
										'<td style="' + sCertificateStyle + '>' + oCertificateData.jasanzAccredited + '</td>' +
										'</tr>');

						// v4.0.019 SUP024339 Added IOASAccredited
						aHTML.push('<td style="font-weight:bold;' + sCertificateStyle + '>' +
										'IOAS Audit</td>' +
										'<td style="' + sCertificateStyle + '>' + (oCertificateData.ioasAccredited || 'N') + '</td>' +
										'</tr>');

						aHTML.push('</table>');
						aHTML.push('</td></tr>');

					});

					aHTML.push('</table>');

					$('#ns1blankspaceAuditCertificatesColumn1').html(aHTML.join(''));	

					$('.ns1blankspaceAuditCertificateNull')

					$('.ns1blankspaceRowAuditCertificatePrint')
						.button({ icons: {primary: 'glyphicon-print'}})
						.click(function()
						{
							window.open($(this).attr('data-link'));
						});

					$('.nsFreshcareCertificateDescription').hide();

					$('.ns1blankspaceRowAuditCertificateRemove')
						.button({icons: {primary: 'ui-icon-close'}})
						.click(function()
						{
							if (ns1blankspace.xhtml.divID === this.id) 
							{
								$(ns1blankspace.xhtml.container).html('');
								$(ns1blankspace.xhtml.container).hide();
								ns1blankspace.xhtml.divID = '';
							}
							else 
							{
								ns1blankspace.xhtml.divID = this.id;

								var iActionID = $(this).attr("data-action");
								var iAttachmentID = $(this).attr("data-attachment");
								
								var aHTML = [];

								aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;">' +
											((iAttachmentID != 'undefined')
											? '<tr><td class="ns1blankspaceSearch"><span data-id="' + iAttachmentID + '" data-method="CORE_ATTACHMENT_MANAGE"' +
												' class="ns1blankspaceCertificateAuditRemove" data-object="Attachment">Remove Attachment</span></td></tr>'
											: '') +
											'<tr><td class="ns1blankspaceSearch"><span data-id="' + iActionID + '" data-method="ACTION_MANAGE"' +
												' class="ns1blankspaceCertificateAuditRemove"data-object="Action">Remove Action</span></td></tr>' +
											'</table>');

								$(ns1blankspace.xhtml.container).html(aHTML.join(''));
								$(ns1blankspace.xhtml.container).show();
								$(ns1blankspace.xhtml.container).offset(
								{ 
									top: $('#' + ns1blankspace.xhtml.divID).offset().top,
									left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
								});

								$('.ns1blankspaceCertificateAuditRemove')
								.css('cursor', 'pointer')
								.click(function(event) 
								{
									var sID = $(this).attr('data-id');
									var sMethod = $(this).attr('data-method');
									var sObject = $(this).attr('data-object');
									$(ns1blankspace.xhtml.container).html('');
									$(ns1blankspace.xhtml.container).hide();
									
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI(sMethod),
										data: 'remove=1&id=' + sID,
										success: function(oResponse)
										{
											if (oResponse.status === 'OK')
											{
												ns1blankspace.status.message(sObject + ' removed.');
												nsFreshcare.admin.audit.certificates.search({xhtmlElementID: 'ns1blankspaceMainCertificates'});
											}
											else
											{
												ns1blankspace.status.error('Error removing ' + sObject + ': ' + oResponse.error.errornotes);
											}
										}
									});
								});

							}

						});

					// v3.1.1f Added oParam to function call
					nsFreshcare.internal.entity.actions.bind(oParam);
				}

			}
			else
			{
				aHTML.push('Can\'t find Certificates');
				$('#' + ns1blankspaceAuditCertificatesColumn1).html(aHTML.join(''));	
			}
		}
	},

	save: 		
	{
		validate: 	function(oParam) 
		{
			// v1.0.26 added checks that if mandatory combo, data-id must be set
			// v3.3.001 SUP023474 JASANZ date based rules are now applied across the board
			var iResultStatus = ns1blankspace.util.getParam(oParam, 'resultStatus').value;
			var iMembership = ns1blankspace.util.getParam(oParam, 'membership', {'default': ''}).value;
			var iGrowerBusiness = ns1blankspace.util.getParam(oParam, 'growerBusiness', {'default': ''}).value;
			var iCOP = ns1blankspace.util.getParam(oParam, 'cop', {'default': ''}).value;

			var sResultStatusDate;
			var sActualDate;
			var sLateLoggedNote;
			var iMembership;
			var iSubscription;
			var dActual;
			var dResultStatus;
			var iAuditType;
			var iMembershipStatus;
			var iReCertAuditMonth;
			var oStandard;
			var oCOP;
			var iAuditDuration;
			var dLatestResultDate;

			var dNow = new Date(dToday.toString('dd MMM yyyy'));

			if (oParam === undefined) {oParam = {}}
			if (oParam.auditValidateStep === undefined) {oParam.auditValidateStep = 0}


			
			// If not auditor user, get auditor values
			if (oParam.auditValidateStep == 0)
			{
				// v3.4.007 Don't validate if audit is lapsed
				iMembershipStatus = (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
										? $('#ns1blankspaceDetailsMembershipStatus').attr('data-id') || (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.membershipstatus'])
										: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.membershipstatus']);
				oParam.auditValidateStep = (iMembershipStatus == '-1') ? 10 : 1;
				// v3.3.001 SUP023474 Now gets this when Details tab is opened so only get values if not set
				if (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor)
				{
					if (ns1blankspace.objectContext == -1)
					{
						oParam.certificationBody = $('#ns1blankspaceDetailsCertBody').attr('data-id');
					}
					else
					{
						oParam.certificationBody =  ($('#ns1blankspaceMainDetails').html() == '') 
														? ns1blankspace.objectContextData['audit.auditbusiness']
														: $('#ns1blankspaceDetailsCertBody').attr('data-id');
					}

					//oParam.auditValidateStep = 1;
					if (nsFreshcare.data.auditor.contactBusiness != oParam.certificationBody)
					{
						oParam.onCompleteWhenCan = oParam.onComplete;
						oParam.onComplete = nsFreshcare.admin.audit.save.validate;
						nsFreshcare.control.getCertificationBodyOptions(oParam);
					}
					else
					{
						nsFreshcare.admin.audit.save.validate(oParam);
					}
				}
				else
				{
					nsFreshcare.admin.audit.save.validate(oParam);
				}
			}

			else if (oParam.auditValidateStep === 1)
			{
				// v3.3.001 Set to Completed for all users
				// Status must be set to Completed (this is an old field no longer used in this UI but needs to default to Completed)
				if (ns1blankspace.okToSave) 
				{
					$('#ns1blankspaceDetailsStatus').attr('data-id', nsFreshcare.data.audit.statusCompleted); 
					$('#ns1blankspaceDetailsStatus').val('Completed') ; 
				}

				delete(oParam.certificationBody);
				// Check for mandatory fields and set comparison values to what's been entered (if anything has been entered, or saved values)
				if ($('#ns1blankspaceMainDetails').html() != '')
				{
					iResultStatus = $('#ns1blankspaceDetailsResultStatus').attr('data-id');
					sResultStatusDate = $('#ns1blankspaceDetailsResultStatusDate').val();
					sActualDate = $('#ns1blankspaceDetailsActualDate').val();
					sLateLoggedNote = $('#ns1blankspaceDetailsLateLoggedNote').val();
					iMembership = $('#ns1blankspaceDetailsMembershipValue').html();
					iSubscription = $('#ns1blankspaceDetailsMembership').attr('data-id');
					iGrowerBusiness = $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id');
					iCOP = $('#ns1blankspaceDetailsCOP').attr('data-id');
					iAuditType = $('#ns1blankspaceDetailsTitle').attr('data-id');
					iAuditDuration = $('#ns1blankspaceDetailsAuditDuration').val();
					// If other than admin, this field is displayed as HTML only
					iMembershipStatus = (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
											? $('#ns1blankspaceDetailsMembershipStatus').attr('data-id')
											: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.membershipstatus']);

					// Must default Scheduled date to Actual Date (as this is mandatory)
					if (ns1blankspace.okToSave 
						&& $('#ns1blankspaceDetailsScheduledDate').val() === '' 
						&& sActualDate != '') 
					{
							$('#ns1blankspaceDetailsScheduledDate').val(sActualDate);
					}

					// Must always have Title, Business/Person, Membership, COP, Actual Date, CB / Auditor, Status 
					$('input[data-mandatory]').each(function() 
					{										
						if (this.id.indexOf('Details') > -1 
							&& ($(this).val() === ''
					   		   || ($(this).attr('data-method') != undefined 
					   		   	  && ($(this).attr('data-id') === undefined || $(this).attr('data-id') === '')))) {
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}
					});

					// v3.1.2 SUP022574 Audit Paid is a mandatory radio control
					if (ns1blankspace.okToSave && $('input[name="radioPaid"]:checked').val() === undefined) {

						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Please indicate whether the Audit has been paid.');
						return;
					}

					// v3.3.001 SUP023474 JASANZ Audit is a mandatory radio control if nsFreshcare.option.jasanzAccreditation
					if (ns1blankspace.okToSave && nsFreshcare.option.jasanzAccreditation)
					{
						if ($('input[name="radioJASANZ"]:checked').val() === undefined) 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please indicate whether the Audit is a JASANZ Audit.');
							return;
						}
						if ($('input[name="radioIOAS"]:checked').val() === undefined) 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please indicate whether the Audit is an IOAS Audit.');
							return;
						}
					}
				}
				else
				{
					iResultStatus = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.resultstatus'] : '';
					if (oParam.resultStatus) {iResultStatus = oParam.resultStatus}	// To cater for when Reviewer clicks Approve or Reject
					sResultStatusDate = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.resultstatusdate'] : '';
					sActualDate = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.actualdate'] : '';
					sLateLoggedNote = '';
					iMembership = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.agrisubscription.membership'] : '';
					iSubscription = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.subscription'] : '';
					iGrowerBusiness = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.contactbusiness'] : '';
					iCOP = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.codeofpractice'] : '';
					iAuditDuration = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['audit.trainingduration'] : '';
					iMembershipStatus = (ns1blankspace.objectContext == -1) ? '' : ns1blankspace.objectContextData['audit.membershipstatus'];
					// v3.4.019 Was not setting this if Details not found
					oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == iMembership}).shift();
					oCOP = $.grep(oStandard.codesOfPractice, function(x) {return x.id == iCOP}).shift();
				}

				oParam.growerBusiness = iGrowerBusiness;
				oParam.cop = iCOP;
				oParam.membership = iMembership;
				dActual = (sActualDate != '') ? new Date(sActualDate) : undefined;
				dResultStatus = (sResultStatusDate != '') ? new Date(sResultStatusDate) : undefined;

				// v3.3.001 SUP023563 Get ReCertAuditMonth
				iReCertAuditMonth = nsFreshcare.admin.audit.save.getReCertAuditMonth(dActual);

				// v3.1.2 SUP022543 New validations for Result Status
				// Sometimes, the Membership Id doesn't get set - ask the user to re-select Membership to fix
				if (ns1blankspace.okToSave && (iMembership == '' || iMembership == undefined))
				{
					// MembershipId field is blank - user needs to re-select the membership
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('There is a problem with the Membership. Please choose it again to fix.');
					return;
				}
				else
				{
					oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == iMembership}).shift();
					oCOP = $.grep(oStandard.codesOfPractice, function(x) {return x.id == iCOP}).shift();
				}

				// 3.3.001 New audits must be logged with a Result Status of Conducted and "No Result" is not a valid option
				if (ns1blankspace.okToSave)
				{
					if (ns1blankspace.objectContext == -1 && iResultStatus != nsFreshcare.data.audit.resultStatusConducted)
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('When logging a new Audit, Result Status must be set to Conducted.');
						return;
					}
					else if (ns1blankspace.objectContext != -1 && iResultStatus == nsFreshcare.data.audit.resultStatusNoResult && nsFreshcare.user.roleID != nsFreshcare.data.roles.admin)
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Result Status of "No Result" not permitted.');
						return;
					}
				}

				// 3.1.2 SUP022693 Cannot have Audit Type of scope Extension where current Subscription status is not IN or CE
				if (ns1blankspace.okToSave && iAuditType == nsFreshcare.data.audit.typeScopeExtension)
				{
					if ((nsFreshcare.data.grower.subscriptionStatusCE + ',' + nsFreshcare.data.grower.subscriptionStatusIN).indexOf(ns1blankspace.data.subscriptionStatus) == -1)
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Membership Status must be either Initial Assessment or Certification Audit to log a Scope Extension audit.');
						return;
					}
				}

				// Check that result status transitions correctly - doesn't apply for admin users
				if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1 && nsFreshcare.user.roleID != nsFreshcare.data.roles.admin
					&& iResultStatus != ns1blankspace.objectContextData['audit.resultstatus'])
				{
					var iBeforeIndex = $.map($.grep(nsFreshcare.data.resultStatusOptions, 
												function(x) {return x.id == ns1blankspace.objectContextData['audit.resultstatus']}), 
											function(y) {return y.index})
											.shift();
					if (iBeforeIndex && $.inArray(iResultStatus, nsFreshcare.data.resultStatusOptions[iBeforeIndex].validOptions) == -1)
					{
						ns1blankspace.okToSave = false;
						var sValidOptions = $.map($.grep(nsFreshcare.data.resultStatusOptions, function(x) {return $.inArray(x.id, nsFreshcare.data.resultStatusOptions[iBeforeIndex].validOptions) > -1}),
													function(y) {return y.title}).join(', ')
						ns1blankspace.status.message('The change in Status is not permitted. Valid Status values are: ' + sValidOptions);
						return;
					}
					else if (iBeforeIndex == undefined)
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('The change in Status is not permitted.');
						return;
					}
				}

				// Actual Date cannot be in the future
				if (ns1blankspace.okToSave 
					&& sActualDate != '' && dActual > dToday) 
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Audit Date cannot be in the future.');
				} 

				// v3.3.001 SUP023782 Audit Duration must be in the format 99.9 and the decimal either 0 or 5. But only if not Cert Recommended
				if (ns1blankspace.okToSave && iResultStatus != nsFreshcare.data.audit.resultStatusCompleted)
				{
					if (Number(iAuditDuration) == 0)
					{
						ns1blankspace.okToSave = false
						ns1blankspace.status.message('Audit Duration cannot be zero.');
						return;
					}
					else if (iAuditDuration.indexOf('.') > -1
						&& Number(iAuditDuration).toString().split('.').pop() != 5 && Number(iAuditDuration.split('.').pop()) != 0)
					{
						ns1blankspace.okToSave = false
						ns1blankspace.status.message('Audit Duration must be entered in half hour increments.');
						return;
					}
					// Make sure using format with only 1 decimal place
					else
					{
						iAuditDuration = Number(iAuditDuration).toString();
						if ($('#ns1blankspaceDetailsAuditDuration').is('*'))
						{
							$('#ns1blankspaceDetailsAuditDuration').val(iAuditDuration);	
						}
						if ($('#ns1blankspaceEvaluationsAssessmentLength').is('*'))
						{
							$('#ns1blankspaceEvaluationsAssessmentLength').val(iAuditDuration);
						}
					}
				}

				// Result Status must be Pending or Recommended if membership status has been set (as this means that the audit's been processed)
				// SUP023456 If MembershipStatus is SP, then it's OK for any value of iResultStatus
				// v3.4.007 If MembershipStatus is -1, then it's OK for any value of iResultStatus
				if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1 
					&& ns1blankspace.objectContextData['audit.membershipstatus'] != ''
					&& ns1blankspace.objectContextData['audit.membershipstatus'] != -1
					&& ns1blankspace.objectContextData['audit.membershipstatus'] != nsFreshcare.data.grower.subscriptionStatusSP
					&& iResultStatus != nsFreshcare.data.audit.resultStatusPending
					&& iResultStatus != nsFreshcare.data.audit.resultStatusCompleted
					) 
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('This audit has been processed via Update Membership Status. ' +
									'Result Status must be either Pending or Recommended once processed.');
					return;
				}

				// Check and warn Admin users if it's a Withdrawn member
				// If Auditor, save cannot continue - they're not allowed to log Audits for Withdrawn growers
				if (ns1blankspace.okToSave 
					&& ns1blankspace.data.audit.subscriptionStatus === nsFreshcare.data.grower.subscriptionStatusWD) 
				{
					
					if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
					{
						ns1blankspace.status.message('WARNING! ' + nsFreshcare.data.growersText + ' is Withdrawn.');
					}
					else
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('This Membership is Withdrawn. Please notify Freshcare to reinstate.');
						return;
					}
				}

				// Cannot have Result Status of Recommended if open Major CARs exist   v3.1.1f SUP022688 or Critical CARs
				// v3.3.001 SUP023456 For SCS, cannot have ANY open CARs - see v3.4.015 below
				// v3.4.001 Don't bother checking if lapsed
				// v3.4.015 SUP023981 Use cop.seAllCARsStopCerts to determine if ALL CARs stop certification
				if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1 
					&& iResultStatus === nsFreshcare.data.audit.resultStatusCompleted
					&& iMembershipStatus != -1) 
				{
					if (ns1blankspace.objectContextData.cars.length > 0) 
					{
						var bAllCARs = (oCOP.seallcarsstopcerts == 'Y');

						if ($.grep(ns1blankspace.objectContextData.cars, function(x) {
											return x['auditissue.status'] === nsFreshcare.data.auditCAR.statusToBeCompleted 
													&& (bAllCARs
														|| (x['auditissue.type'] === nsFreshcare.data.auditCAR.severityMajor || x['auditissue.type'] === nsFreshcare.data.auditCAR.severityCritical))
										}
								   ).length > 0) 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Cannot recommend Certification when open ' + (bAllCARs ? '' : 'Major or Critical ') + 'CARs exist. ');
							return;
						}
					}
				} 
				// v3.3.001 SUP023456 If Status being changed from Suspended to anything else, cannot have any open Critical CARs
				else if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1
					&& iResultStatus != nsFreshcare.data.audit.resultStatusSuspended 
					&& ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusSuspended)
				{
					if (ns1blankspace.objectContextData.cars.length > 0) 
					{
						if ($.grep(ns1blankspace.objectContextData.cars, function(x) {
											return x['auditissue.status'] === nsFreshcare.data.auditCAR.statusToBeCompleted 
													&& x['auditissue.type'] === nsFreshcare.data.auditCAR.severityCritical
										}
								   ).length > 0) 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Cannot change Result Status from Suspended when open Critical CARs exist.');
							return;
						}
					}
				}
				// If Result Status is Certification Pending and all CARS are Closed , then must set to Cert Recommended
				else if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1
					&& iResultStatus == nsFreshcare.data.audit.resultStatusPending) 
				{
					// If Result Status is Certification Pending and all CARS are Closed, then must set to Cert Recommended
					// SUP021619 v2.0.4j Only check this if the user hasn't changed result Status from Cert Recommended (ie: they're reopening the audit)
					if (ns1blankspace.objectContextData.cars.length > 0
							&& ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusPending) 
					{
						if ($.grep(ns1blankspace.objectContextData.cars, function(x) {
											return x['auditissue.status'] === nsFreshcare.data.auditCAR.statusCompleted
										}
								   ).length === ns1blankspace.objectContextData.cars.length) 
						{
							ns1blankspace.container.confirm({html: 'All CARs are Closed. Please set Result Status to Certification Recommended.'});
						}
					}
					// If Result Status is Pending and no CARs exist, must prompt user to add CARs
					else if (ns1blankspace.objectContextData.cars.length === 0 
						&& iResultStatus === nsFreshcare.data.audit.resultStatusPending) 
					{
						ns1blankspace.container.confirm({html: 'Certification Pending. CARs must be added.'});
					}
				}

				// If Result Status is Pending or Recommended must have a Result Status Date
				if (ns1blankspace.okToSave
					&& (iResultStatus === nsFreshcare.data.audit.resultStatusPending 
						|| iResultStatus === nsFreshcare.data.audit.resultStatusCompleted)
					&& sResultStatusDate === '') 
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Date Result Achieved is required when Audit has a Result Status of Pending or Recommended.');
				}


				// We need to check Date Result Achieved. Latest of Date Approved or Date all Major CARs closed out
				// However, if cb's seManualAuditApproval = Y, then the user must enter this value
				if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1)
				{
					if (iResultStatus != ns1blankspace.objectContextData['audit.resultstatus'] 
						&& iResultStatus == nsFreshcare.data.audit.resultStatusApproved)
					{
						// v4.0.016 SUP024247 Only check resultstatusdate if manualauditapproval
						if (ns1blankspace.objectContextData['audit.auditbusiness.semanualauditapproval'] == 'Y'
							&& $('#ns1blankspaceDetailsResultStatusDate').val() == '')
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Date Result Achieved must be entered when the Audit is Approved.');
						}
						else if (ns1blankspace.objectContextData['audit.auditbusiness.semanualauditapproval'] == 'Y')
						{
							if (new Date($('#ns1blankspaceDetailsResultStatusDate').val()) > new Date(dToday.toString('dd MMM yyyy') + ' 23:56:59'))
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.status.message('Date Result Achieved cannot be in the future.');
							}
						}
					}
					
					// v4.0.017 SUP024247 No longer applicable to pending audits
					else if (ns1blankspace.objectContextData.cars 
						&& iResultStatus == nsFreshcare.data.audit.resultStatusCompleted)
					{
						var bAllCARs = (oCOP.seallcarsstopcerts == 'Y');
						var aCARList = $.grep(ns1blankspace.objectContextData.cars, function(x) 
						{
							return (bAllCARs || x['auditissue.type'] === nsFreshcare.data.auditCAR.severityMajor 
											|| x['auditissue.type'] === nsFreshcare.data.auditCAR.severityCritical)
						});

						$.each(aCARList, function()
						{
							if (this['auditissue.datecompleted'] != '')
							{
								// v4.0.016 SUP024247 Find the latest date of CAR closure
								if (dLatestResultDate == undefined) 
								{
									dLatestResultDate = new Date(this['auditissue.datecompleted']);
								}
								if ((new Date(this['auditissue.datecompleted'])) > dLatestResultDate)
								{
									dLatestResultDate = new Date(this['auditissue.datecompleted']);
								}
							}
						});

						// v4.0.016 SUP024247 Date entered for Result Status must not be in the future and must be on or after the date approved or latest CAR closure, whichever is later
						var dApproved = new Date(ns1blankspace.objectContextData['audit.resultstatusdate'] || dToday.toString('dd MMM yyyy'));
						// May not have a date if only minor CARS that aren't closed
						dLatestResultDate = dLatestResultDate || dApproved;
						var dMinDate = new Date(Math.max(dApproved, (dLatestResultDate || dApproved)));
						if (dResultStatus && (dResultStatus < dMinDate || dResultStatus > new Date(dToday.toString('dd MMM yyyy') + ' 23:56:59')))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Date Result Achieved cannot be in the future and must be on or after the date approved or ' +
															'the latest date of CAR closure, whichever is later.');
						}
					}
				}

				// Actual Date must be less than or equal to Result Status date
				if (ns1blankspace.okToSave 
					&& sActualDate != '' && sResultStatusDate != '') 
				{
					if (dActual > dResultStatus) 
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Audit Date cannot be after Date Result Achieved.');
						return;
					}
				} 

				// Check if a new Audit has been logged more than 10 days after audit. If so, user needs to add a comment to indicate why.
				if (ns1blankspace.okToSave 
					&& ns1blankspace.objectContext === -1 && sActualDate != '')
				{
					var dActual = new Date($('#ns1blankspaceDetailsActualDate').val());

					if (dActual.toString() != 'Invalid Date')
					{
						if (dActual < Date.today().addDays(-10) && $('#ns1blankspaceDetailsLateLoggedNote').val() == '')
						{
							if (!$('#ns1blankspaceMainDetails').is(':visible'))
							{
								$('#ns1blankspaceControlDetails').trigger('click');
							}
							$('#ns1blankspaceDetailsLateLoggedNoteCaption').show();
							$('#ns1blankspaceDetailsLateLoggedNoteValue').show();
							$('#ns1blankspaceDetailsLateLoggedNote').focus();
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please specify why the Audit has been logged more than 10 days after the Audit.')
						}
					}
				}
				
				// ------ LAST VALIDATION BEFORE CALLING STEP 2 -----
				// v3.3.001 SUP023563 If Cert Recommended and Membership Status is null or IP/CP, check to see if audit is more than 
				// 60 days prior to start of audit re-cert month and show WARNING message
				// v3.4.015 SUP023981 No need to check this if scopeextension
				if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1
					&& iResultStatus == nsFreshcare.data.audit.resultStatusCompleted
					&& (iMembershipStatus == '' 
						|| iMembershipStatus == nsFreshcare.data.grower.subscriptionStatusCP
						|| iMembershipStatus == nsFreshcare.data.grower.subscriptionStatusIP)
					)
				{
					oParam.validateResultStatus = iResultStatus;
					oParam.auditValidateStep = 2;

					// We need to find the expiry date
					if (iAuditType != nsFreshcare.data.audit.typeScopeExtension)
					{
						var oMembership = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == iMembership}).shift();
						var oCOP = (oMembership) ? $.grep(oMembership.codesOfPractice, function(x) {return x.id == iCOP}).shift() : {};
						var oAnniversary = nsFreshcare.admin.certificate.certificateGetExpiry(
						{
							auditDate: dActual,
							expiryMonths: parseInt(oCOP.auditdueafter),
							expiryAnniversary: iReCertAuditMonth,
							anniversaryStatus: true
						});

						// Audit is more than 60 days prior to beginning of Re-Cert Audit Due Month 
						// OR up to 2 months after end of Re-Cert Audit Due month
						// SUP023563 User must add a reason why audit is after Re-Cert Audit month
						// v3.4.010 SUP023939 User now also adds reason if > 60 days prior
						// v4.0.012 SUP024144 If certificateExtension, must have certificateExtension action
						if (oAnniversary.status == 1 || oAnniversary.status == 2 || oAnniversary.status == 4)
						{
							// v3.4.010 We have to first check if a note has already been added
							var oSearch = new AdvancedSearch();
							oSearch.method = 'ACTION_SEARCH';
							oSearch.addField('actiontype');
							oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
							oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
							oSearch.addFilter('actiontype', 'IN_LIST', 
									((oAnniversary.status == 4)
										? nsFreshcare.data.actionTypeCertificateExtension
										: nsFreshcare.data.actionTypeRecertAuditLate + ',' + nsFreshcare.data.actionTypeOtherReason)
									);
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									// If note already added, skip to step 2
									oParam.auditValidateStep = (oResponse.data.rows.length > 0) ? 2 : '1a';
									oParam.anniversary = (oResponse.data.rows.length > 0) ? undefined : oAnniversary;
									nsFreshcare.admin.audit.save.validate(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error searching for reason notes: ' + oResponse.error.errornotes);
								}
							});
						}
						else
						{
							nsFreshcare.admin.audit.save.validate(oParam);
						}
					}
					else
					{
						nsFreshcare.admin.audit.save.validate(oParam);
					}
				}
				else if (ns1blankspace.okToSave)
				{
					oParam.validateResultStatus = iResultStatus;
					oParam.auditValidateStep = 2;
					nsFreshcare.admin.audit.save.validate(oParam);
				}
			}

			// v3.4.010 SUP023939 Added this step as had to first search for actions
			// v4.0.012 SUP024144 Caters for certificateExtension
			else if (oParam.auditValidateStep == "1a")
			{
				oParam.auditValidateStep = 2;
				var oAnniversary = oParam.anniversary;
				delete(oParam.anniversary);

				ns1blankspace.container.confirm(
				{
					title: 'Limited Certificate Period!',
					html: oAnniversary.message + '<br /><br />'+
							'You will not be able to set the Audit to Certification Recommended ' +
							'until a reason has been added or the Re-Certification Audit Due date has been changed.' +
							(oAnniversary.status == 4
								? '<br /><br />Contact Freshcare if assistance required.'
								: ''),
					buttons:
					[
						{
							text: 'Record details',
							click: function()
							{
								$('#ns1blankspaceBootstrapDialog').modal('hide');
								// Allow user to add a note
								$.extend(oParam,
								{
									object: nsFreshcare.objectAudit,
									objectContext: ns1blankspace.objectContext,
									contactBusiness: ns1blankspace.objectContextData['audit.contactbusiness'],
									functionPostSave: nsFreshcare.admin.audit.save.validate,
									hidePriority: true,
									hideCancel: true,
									actionType: (oAnniversary.status == 4 ? nsFreshcare.data.actionTypeCertificateExtension : nsFreshcare.data.actionTypeRecertAuditLate),
									title: 'Provide a record',
									html: '<span style="font-size: 0.75em">Enter why the audit was undertaken outside the 60-day Re-Cert Audit month window:</span>',
									showActionTypes: (oAnniversary.status == 1),
									actionTypes: [nsFreshcare.data.actionTypeRecertAuditLate, nsFreshcare.data.actionTypeOtherReason],
									sortTypes: 'id'
								});
								nsFreshcare.internal.entity.notes.add(oParam);
							}
						},
						{
							text: 'Cancel Save',
							click: function()
							{
								$('#ns1blankspaceBootstrapDialog').modal('hide');
								ns1blankspace.okToSave = false;
								oParam.auditValidateStep = 10;
								nsFreshcare.admin.audit.save.validate(oParam);
							}
						}
					],
					close: function() 
					{
						$('#ns1blankspaceBootstrapDialog').modal('hide');
						nsFreshcare.admin.audit.save.validate(oParam);
					}
				});
			}

			// If Initial Audit and user hasn't clicked on Training Evaluation, they must enter this data.
			// v3.1.2 SUP022693 If Scope Extension and user hasn't clicked on scope Extension, they must enter this data
			// v3.4.008 SUP023952 Also applies if UnannouncedInitial
			// v3.4.015 SUP023981 If Scope Extension & COP has changed, don't require details on Scope Extension tab
			else if (oParam.auditValidateStep === 2)
			{
				// Only applies when new Audit
				if (ns1blankspace.okToSave && ns1blankspace.objectContext === -1)
				{
					if (($('#ns1blankspaceDetailsTitle').attr('data-id') === nsFreshcare.data.audit.typeInitial
							|| $('#ns1blankspaceDetailsTitle').attr('data-id') === nsFreshcare.data.audit.typeUnannouncedInitial)
						&& $('#ns1blankspaceMainEvaluation').html() === '')
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Qualifying Trainee and Training Evaluation data must be entered.');
						return;
					}
					else if ($('#ns1blankspaceDetailsTitle').attr('data-id') === nsFreshcare.data.audit.typeScopeExtension
						&& $('#ns1blankspaceMainExtension').html() === ''
						&& ($('#ns1blankspaceDetailsCOP').attr('data-id') == ns1blankspace.data.codeofpractice) 
							|| ns1blankspace.data.codeofpractice == undefined)
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Scope Extension data must be entered.');
						return;
					}

					// v3.3.001 SUP023763 On a new record, make sure Auditor has clicked on the Trainee tab and either
					// chosen a trainee or nominated to send details to Freshcare of missing trainee
					if (nsFreshcare.option.qualifyingTraining && 
						ns1blankspace.okToSave && nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor
						&& ($('#ns1blankspaceMainTrainee').html() === '' 
							|| ($('#ns1blankspaceMainTrainee').html() != ''
								&& $('#ns1blankspaceMainTrainee td.nsFreshcareSelected').length == 0 
								&& nsFreshcare.admin.audit.data.traineeDetails == undefined
								)))
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Either a qualifying Trainee must be selected or you must notify Freshcare of a missing trainee.');
						return;
					}
				}

				// Now check that user has entered values onto these tabs if they've been exposed
				// Trainee tab
				// If user has chosen or removed a qualifying training, set oParam.qualifyingTraining
				// v4.0.019 Changed sequalifyingtraininglink to sequalifyingtraininglink.id
				if (ns1blankspace.okToSave && $('#ns1blankspaceMainTrainee').html() != '') 
				{
					var sSavedQualifyingTraining = '';
					if (ns1blankspace.objectContext != -1)
					{
						sSavedQualifyingTraining = ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'];
						if (sSavedQualifyingTraining == '0') {sSavedQualifyingTraining = ''}
					}
					if ($('#ns1blankspaceMainTrainee td.nsFreshcareSelected').length > 0 
						&& sSavedQualifyingTraining != $('#ns1blankspaceMainTrainee td.nsFreshcareSelected').first().attr('id').split('_').pop())
					{
						oParam.qualifyingTraining = $('#ns1blankspaceMainTrainee td.nsFreshcareSelected').first().attr('id').split('_').pop();
					}
					else if ($('#ns1blankspaceMainTrainee td.nsFreshcareSelected').length == 0 && sSavedQualifyingTraining != '')
					{
						oParam.qualifyingTraining = '';
					}
				}

				// Trainer Evaluation tab
				if (ns1blankspace.okToSave && $('#ns1blankspaceMainEvaluation').html() != '') 
				{
					// Check Madatory fields on Evaluation tab
					$('input[data-mandatory]').each(function() {										

						if (this.id.indexOf('Evaluation') > -1 
							&& ($(this).val() === ''
							   || ($(this).attr('data-method') != undefined 
							   		&& ($(this).attr('data-id') === undefined || $(this).attr('data-id') === '')))) {
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}
					});
					
					// Can't use data-mandatory checking above for radio controls so do it here
					if ($('input[name="radioRating"]:checked').val() === undefined) {

						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Please choose a Client understanding rating.');
						return;
					}

					// Make sure training date is on or before audit date
					// V3.2.020 SUP023422 Trainng Date can be prior to Audit Date, but must be prior to today's date
					if ($('#ns1blankspaceEvaluationsTrainingDate').val() != '') 
					{
						var dTraining = new Date($('#ns1blankspaceEvaluationsTrainingDate').val());

						if (dTraining > dToday) 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Training date cannot be in the future.');
							return;
						}
					}

					// Assessment Hours must be numeric
					if (!nsFreshcare.util.isNumeric({value: $('#ns1blankspaceEvaluationsAssessmentLength').val(), zeroValid: false})) {

						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Assessent Length must be a number.');
						return;
					}
				}
				
				// Scope Extension tab
				else if (ns1blankspace.okToSave && $('#ns1blankspaceMainExtension').html() != '') 
				{	// Check that there's either a ScopeExtension row or user has selected at least one extension to be added
					// v3.4.015 SUP023981 Only check if COP is same as subscription's COP
					var iNewCOP = ($('#ns1blankspaceMainDetails').html() != '') ? $('#ns1blankspaceDetailsCOP').attr('data-id') : ns1blankspace.objectContextData['audit.codeofpractice'];
					if ((ns1blankspace.objectContext != -1 
						&& (nsFreshcare.admin.audit.data.scopeExtension.scopeExtensions.length == 0 
							&& (ns1blankspace.objectContextData['audit.agrisubscription.codeofpractice'] == iNewCOP)
							&& $('#ns1blankspaceScopeCurrentData').is('*')
							&& $('#ns1blankspaceScopeCurrentData .ns1blankspaceScopeItemSelect[data-selected="1"]').length == 0)) 
						|| (ns1blankspace.objectContext == -1 
							&& ns1blankspace.data.codeofpractice == iNewCOP
							&& $('#ns1blankspaceScopeCurrentData').is('*')
							&& $('#ns1blankspaceScopeCurrentData .ns1blankspaceScopeItemSelect[data-selected="1"]').length == 0))
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('You must choose at least one Scope Extension item.');
						return;
					}
				}

				if (ns1blankspace.okToSave)
				{
					oParam.auditValidateStep = 3;
					nsFreshcare.admin.audit.save.validate(oParam);
				}
			}

			// Now check if Grower has completed a corresponding training course for the selected membership
			// v3.3.001 SUP023422 Check that the training selected qualifies
			else if (oParam.auditValidateStep === 3)
			{
				oParam.auditValidateStep = 4;
				iResultStatus = iResultStatus || $('#ns1blankspaceDetailsResultStatus').attr('data-id');
				iResultStatus = iResultStatus || ns1blankspace.objectContextData['audit.resultstatus'];

				// Pre-processing to check if Grower has completed a corresponding training course for the selected membership
				// v3.3.001 SUP023422 Now uses AgriCOPQualifyingTraining to find COPs, but only if seQualifyingTraining is null 
				// 			and not Cert Recommended or changing to Cert Recommended
				// v4.0.019 Changed sequalifyingtraininglink to sequalifyingtraininglink.id
				if (nsFreshcare.option.qualifyingTraining && iMembership && ns1blankspace.objectContext != -1
					    && (iResultStatus == nsFreshcare.data.audit.resultStatusCompleted 
					    		&& ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted
					    	)
					)
				{

					// Qualifying training hasn't been chosen
					if ((ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'] == '' || ns1blankspace.objectContextData['audit.sequalifyingtraininglink.id'] == '0')
						&& (($('#ns1blankspaceMainTrainee').html() != '' && $('#ns1blankspaceMainTrainee .nsFreshcareSelected').length == 0)
							 || $('#ns1blankspaceMainTrainee').html() == ''))
					{
						delete(oParam.auditValidateStep);
						ns1blankspace.okToSave = false;
						ns1blankspace.container.confirm({title: 'Cannot save Audit!', 
													html: 'You must nominate qualifying training.<br /><br />' +
													'The Audit cannot be set to Certification Recommended until qualifying training has been selected.'});
						return;
					}

					// QualifyingTraining already chosen, make sure course is completed 
					// If Trainee tab open, get details from objectContextData.training (we know something has been selected as it's passed the condition above)
					// Otherwise, get details from objectContextData
					else if (($('#ns1blankspaceMainTrainee').html() != '' 
								&& (nsFreshcare.admin.audit.trainee.getTraineeData((ns1blankspace.objectContext == -1)))['agritraineeattendancelink.attendee.course.status'] != nsFreshcare.data.trainingCourse.statusCompleted)
							|| ($('#ns1blankspaceMainTrainee').html() == ''
								&& ns1blankspace.objectContextData['audit.sequalifyingtraininglink.attendee.course.status'] != nsFreshcare.data.trainingCourse.statusCompleted)
							)
					{
						delete(oParam.auditValidateStep);
						ns1blankspace.okToSave = false;
						ns1blankspace.container.confirm({title: 'Cannot save Audit!', 
													html: 'The selected qualifying training has not yet been completed.<br /><br />' +
													'The Audit cannot be set to Certification Recommended until the training has been completed.<br /><br />' +
													'Please follow-up with Freshcare if you believe this is not the case.'});
						return;
					}

					else
					{
						oParam.auditValidateStep = 4;
						nsFreshcare.admin.audit.save.validate(oParam);
					}
				}
				
				// Not using QualifyingTraining
				else if (!nsFreshcare.option.qualifyingTraining
					&& $('#ns1blankspaceMainDetails').html() != '' && iMembership)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
					oSearch.addField('status');
					oSearch.addFilter('agritrainingcourseattendee.course.package.membership', 'EQUAL_TO', $('#ns1blankspaceDetailsMembershipValue').html());
					oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness', 'EQUAL_TO', $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id'));
					oSearch.addFilter('agritrainingcourseattendee.course.status', 'EQUAL_TO', nsFreshcare.data.trainingCourse.statusCompleted);
					oSearch.rows = 1;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length == 0)
							{
								ns1blankspace.okToSave = false;
								
								ns1blankspace.status.message(nsFreshcare.data.growersText + ' has not completed appropriate training for this Membership' + 
									((oParam.fsqCOPIDs.length > 0) ? '/COP' : '') + 
									'.');
							}

							oParam.auditValidateStep = 4;
							nsFreshcare.admin.audit.save.validate(oParam);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
							ns1blankspace.okToSave = false;
						}
					});
				}
				else
				{
					oParam.auditValidateStep = 4;
					nsFreshcare.admin.audit.save.validate(oParam);
				}

			}

			// Check if relevant docs have been attached
			else if (oParam.auditValidateStep == 4)
			{
				var iSavedResultStatus = (ns1blankspace.objectContextData ? ns1blankspace.objectContextData['audit.resultstatus'] : '');

				if (oParam.documentsRequired == undefined)
				{
					oParam.documentsRequired = [];
					// v3.1.205 SUP023030 filter requiredAttachmentTypes on resultStatus
					// v3.1.205 SUP023030 If resultStatus has just changed to any in requiredAttachmentTypes, check if relevant documents have been attatched
					if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1 
							&& oParam.validateResultStatus != iSavedResultStatus
							&& $.inArray(oParam.validateResultStatus, $.map(nsFreshcare.data.audit.requiredAttachmentTypes, function(y) {return y.resultStatus})) > -1)
					{
						oParam.documentsRequired = $.map($.grep(nsFreshcare.data.audit.requiredAttachmentTypes, 
																function(y) {return y.resultStatus == oParam.validateResultStatus}), 
														function(x) {return x.type});
					}

					// Also check for Reviewer documents required
					if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1
							&& oParam.validateResultStatus != iSavedResultStatus
							&& $.inArray(oParam.validateResultStatus, $.map(nsFreshcare.data.audit.reviewerRequiredAttachmentTypes, function(y) {return y.resultStatus})) > -1)
					{
						oParam.documentsRequired = oParam.documentsRequired.concat($.map($.grep(nsFreshcare.data.audit.reviewerRequiredAttachmentTypes, 
																function(y) {return y.resultStatus == oParam.validateResultStatus}), 
														function(x) {return x.type}));
					}
				}

				// Now search for required attachments
				if (oParam.documentsRequired && oParam.documentsRequired.length > 0)
				{
					oParam.documentsRequired = oParam.documentsRequired.join(',');
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_ATTACHMENT_SEARCH';
					oSearch.addField('type,typetext');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addFilter('type', 'IN_LIST', oParam.documentsRequired);
					oSearch.rows = 50;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								$.each(oParam.documentsRequired.split(','), function(i, t)
								{
									if ($.grep(oResponse.data.rows, function(x) {return x.type === t}).length === 0)
									{
										var sTypeText = $.map($.grep(nsFreshcare.data.audit.requiredAttachmentTypes, 
															function(x) {return x.type == t && x.resultStatus == oParam.validateResultStatus}), 
														function(y) {return y.typetext});
										ns1blankspace.okToSave = false;
										ns1blankspace.status.error(sTypeText + ' must be attached before you can change Result Status to the selected value.');
										return false;
									}
								});
							}
							else
							{
								var oValidateObject = ($.grep(nsFreshcare.data.audit.requiredAttachmentTypes, function(x) {return x.resultStatus == oParam.validateResultStatus}).length > 0 )
														? $.grep(nsFreshcare.data.audit.requiredAttachmentTypes, function(x) {return x.resultStatus == oParam.validateResultStatus}) 
														: $.grep(nsFreshcare.data.audit.reviewerRequiredAttachmentTypes, function(x) {return x.resultStatus == oParam.validateResultStatus});
								ns1blankspace.okToSave = false;
								ns1blankspace.status.error('Document' + (oParam.documentsRequired.split(',').length > 1 ? 's' : '') + ' ' + 
															$.map($.grep(oValidateObject, function(y) {return $.inArray(y.type, oParam.documentsRequired.split(',')) > -1}), 
																	function(x) {return x.typetext}).join(', ') + 
															' must be attached before you can change Result Status to the selected value.');
							}

							if (ns1blankspace.okToSave)
							{
								delete(oParam.documentsRequired);
								delete(oParam.validateResultStatus);
								oParam.auditValidateStep = 10;
								nsFreshcare.admin.audit.save.validate(oParam);
							}
						}
						else
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.error('Error checking attached documents: ' + oResponse.error.errornotes);
						}
					});
				}
				// No validation necessary, move to next step
				else 
				{
					oParam.auditValidateStep = 10;
					nsFreshcare.admin.audit.save.validate(oParam);
				}
			}

			// Callback save function
			else if (oParam.auditValidateStep === 10)
			{
				if (oParam.onComplete && ns1blankspace.okToSave) 
				{
					delete(oParam.auditValidateStep);
					ns1blankspace.util.onComplete(oParam);
				}
			}
		},

		getReCertAuditMonth: function(dActual)
		{
			var iReCertAuditMonth = '';
			
			if ($('#ns1blankspaceMainDetails').html() != '')
			{
				iReCertAuditMonth = ($('#ns1blankspaceDetailsRecertAuditMonth').is('*') && $('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id')
										? $('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id')
										: (ns1blankspace.objectContext == -1 
											? $('#ns1blankspaceDetailsMembership').attr('data-expirymonth') 
											: ns1blankspace.objectContextData['audit.agrisubscription.expirymonth']));
				iReCertAuditMonth = (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData['audit.serecertauditmonth'] != '') 
										? ns1blankspace.objectContextData['audit.serecertauditmonth'] : iReCertAuditMonth;
				iReCertAuditMonth = iReCertAuditMonth || '0';
			}
			else
			{
				iReCertAuditMonth = (ns1blankspace.objectContext == -1) ? '0' : ns1blankspace.objectContextData['audit.agrisubscription.expirymonth'];
				iReCertAuditMonth = (ns1blankspace.objectContext == -1 && ns1blankspace.objectContextData['audit.serecertauditmonth'] != '') 
										? ns1blankspace.objectContextData['audit.serecertauditmonth'] : iReCertAuditMonth;
			}

			if (iReCertAuditMonth == '0')
			{
				iReCertAuditMonth = (dActual.getMonth() + 1).toString();
			}

			return iReCertAuditMonth;
		},

		send: 	function(oParam) 
		{
			oParam = oParam || {}
			var aMessageHTML = [];
			var sData = ns1blankspace.util.getParam(oParam, 'data', {'default': ''}).value;
			var sNoteData = ns1blankspace.util.getParam(oParam, 'noteData', {'default': ''}).value;
			var iResultStatus = ns1blankspace.util.getParam(oParam, 'resultStatus').value;
			var iAuditReviewer = ns1blankspace.util.getParam(oParam, 'reviewerID').value;
			var bRemoveReviewer = ns1blankspace.util.getParam(oParam, 'removeReviewer', {'default': false}).value;
			var sResultStatusDate = ns1blankspace.util.getParam(oParam, 'resultStatusDate').value;
			var iQualifyingTraining = ns1blankspace.util.getParam(oParam, 'qualifyingTraining').value;
			var bFromSummary = ns1blankspace.util.getParam(oParam, 'fromSummary', {'default': false}).value;
			var aScopeExtensions = [];
			var oData = {};
			dToday = new Date();

			if (oParam.saveAuditStep === undefined) {oParam.saveAuditStep = 1; ns1blankspace.okToSave = true;}

			// User has clicked on Approve / Reject audit button on Summary tab
			if (iResultStatus && sData === '')
			{
				// We need to validate that documentsRequired have been attached
				// v4.0.016 SUP024247 No longer sets resultstatusdate
				oParam.data = 'id=' + ns1blankspace.objectContext + '&resultstatus=' + iResultStatus;
				oParam.auditValidateStep = 1; 	// this will only check the required documents
				oParam.documentsRequired = $.map(nsFreshcare.data.audit.reviewerRequiredAttachmentTypes, function(x) {return x.type}).join(',');
				oParam.newAudit = true;		// This will make the audit re-display
				oParam.saveAuditStep = 4;		// We only need to save the data, no other data is saved when resultStatus is passed
				nsFreshcare.admin.audit.save.validate(oParam);
			}

			// User has clicked on Assign Reviewer button on Summary tab
			else if (iAuditReviewer && sData === '')
			{
				oParam.data = 'id=' + ns1blankspace.objectContext + '&teamleadercontactperson=' + iAuditReviewer;
				oParam.newAudit = true;		// This will make the audit re-display
				oParam.saveAuditStep = 4;		// We only need to save the data, no other data is saved when auditreviewer is passed
				nsFreshcare.admin.audit.save.send(oParam);
			}

			// User has clicked Remove Reviewer on Summary tab
			else if (bRemoveReviewer && sData === '')
			{
				oParam.data = 'id=' + ns1blankspace.objectContext + '&teamleadercontactperson=';
				oParam.newAudit = true;		// This will make the audit re-display
				oParam.saveAuditStep = 4;		// We only need to save the data, no other data is saved when auditreviewer is passed
				nsFreshcare.admin.audit.save.send(oParam);
			}
			
			// We are saving from the Save button
			// Initiate save data
			else if (oParam.saveAuditStep === 1) 
			{
				ns1blankspace.okToSave = true;

				// If we're not supposed to have Training Evaluation data but the user has inadvertently activated the tab,
				// we need to erase all of the data so it's not saved.
				// v3.2.020 SUP02346 Was not taking into account scenario where Details tab hadn't been clicked
				// v3.4.008 SUP023952 Also checks if UnannouncedInitial
				var sAuditType = ($('#ns1blankspaceMainDetails').html() == '') ? ns1blankspace.objectContextData['audit.type'] : $('#ns1blankspaceDetailsTitle').attr('data-id');
				if (sAuditType != nsFreshcare.data.audit.typeInitial && sAuditType != nsFreshcare.data.audit.typeUnannouncedInitial 
					&& $('#ns1blankspaceMainEvaluation').html() != '') 
				{
					$('#ns1blankspaceMainEvaluation').html('');
				}

				// Go and find the CARs if not already searched for
				// v3.4.019 Check for objectContextData, not objectContext
				if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.cars == undefined ) 
				{
					oParam.saveAuditStep = 2;
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.audit.save.send);
					nsFreshcare.admin.audit.cars.search(oParam);
				}
				else 
				{
					oParam.saveAuditStep = 2;
					nsFreshcare.admin.audit.save.send(oParam);
				}
			}

			// Validate what the user has entered
			else if (oParam.saveAuditStep == 2) 
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.audit.save.send);
				oParam.saveAuditStep = 3;
				nsFreshcare.admin.audit.save.validate(oParam);
			}


			// Now we create the save data
			else if (oParam.saveAuditStep === 3 && ns1blankspace.okToSave) 
			{
				if ($('#ns1blankspaceMainDetails').html() != '') 
				{
					oData['audit.reference'] = ($('#ns1blankspaceDetailsReference').val() != '') ? $('#ns1blankspaceDetailsReference').val() : undefined;
					oData['audit.type'] = $('#ns1blankspaceDetailsTitle').attr('data-id');
					oData['audit.typetext'] = $('#ns1blankspaceDetailsTitle').val();
					oData['audit.contactbusiness'] = $('#ns1blankspaceDetailsGrowerBusiness').attr('data-id');
					oData['audit.contactbusinesstext'] = $('#ns1blankspaceDetailsGrowerBusiness').val();
					oData['audit.contactperson'] = $('#ns1blankspaceDetailsGrowerPerson').attr('data-id');
					oData['audit.contactpersontext'] = $('#ns1blankspaceDetailsGrowerPerson').val();
					oData['audit.subscription'] = $('#ns1blankspaceDetailsMembership').attr('data-id');
					oData['audit.codeofpractice'] = $('#ns1blankspaceDetailsCOP').attr('data-id');
					oData['audit.codeofpracticetext'] = $('#ns1blankspaceDetailsCOP').val();
					oData['audit.status'] = $('#ns1blankspaceDetailsStatus').attr('data-id');
					oData['audit.statustext'] = $('#ns1blankspaceDetailsStatus').val();
					oData['audit.resultstatus'] = $('#ns1blankspaceDetailsResultStatus').attr('data-id');
					oData['audit.resultstatustext'] = $('#ns1blankspaceDetailsResultStatus').val();
					oData['audit.scheduleddate'] = $('#ns1blankspaceDetailsScheduledDate').val();
					oData['audit.actualdate'] = $('#ns1blankspaceDetailsActualDate').val();
					oData['audit.description'] = $('#ns1blankspaceDetailsDescription').val();
					oData['audit.paid'] = $('input[name="radioPaid"]:checked').val();		// v3.1.2 SUP022574
					oData['audit.serecertauditmonth'] = $('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id');		// v3.3.001 SUP023563
					oData['audit.sejasanzaudit'] = $('input[name="radioJASANZ"]:checked').val();			// v3.3.001 SUP023474
					oData['audit.seioasaudit'] = $('input[name="radioIOAS"]:checked').val();			// v4.0.019 SUP024339
					oData['audit.trainingduration'] = $('#ns1blankspaceDetailsAuditDuration').val();
					oData['audit.seextensionmonths'] = $('#ns1blankspaceDetailsExtensionMonths').val(); 	// v4.0.012 SUP024144
					oData['audit.resultstatusdate'] = $('#ns1blankspaceDetailsResultStatusDate').val(); 	// v4.0.018 SUP024247

					if ($('#ns1blankspaceDetailsReference').val() != '') {
						sData += '&reference=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsReference').val());
					}
					sData += '&type=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitle').attr('data-id'));
					sData += '&contactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsGrowerBusiness').attr('data-id'));
					sData += '&contactperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsGrowerPerson').attr('data-id'));
					sData += '&subscription=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMembership').attr('data-id'));
					sData += '&codeofpractice=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCOP').attr('data-id'));
					sData += '&status=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsStatus').attr('data-id'));
					sData += '&resultstatus=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsResultStatus').attr('data-id'));
					sData += '&auditbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCertBody').attr('data-id'));
					sData += '&auditperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAuditor').attr('data-id'));
					sData += '&resultstatusdate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsResultStatusDate').val());
					sData += '&scheduleddate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsScheduledDate').val());
					sData += '&actualdate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsActualDate').val());
					sData += '&description=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDescription').val());
					sData += '&paid=' + ns1blankspace.util.fs($('input[name="radioPaid"]:checked').val());		// v3.1.2 SUP022574
					sData += '&serecertauditmonth=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id'));
					sData += '&sejasanzaudit=' + $('input[name="radioJASANZ"]:checked').val();
					sData += '&seioasaudit=' + $('input[name="radioIOAS"]:checked').val();
					sData += '&trainingduration=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAuditDuration').val());
					sData += '&seextensionmonths=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsExtensionMonths').val());
					
					oParam.resultStatus = $('#ns1blankspaceDetailsResultStatus').attr('data-id');

					if ($('#ns1blankspaceDetailsLateLoggedNote').is(':visible') && $('#ns1blankspaceDetailsLateLoggedNote').val() != '')
					{	
						oParam.noteData += 'object=' + nsFreshcare.objectAudit +
									 '&type=' + nsFreshcare.data.actionTypeLateLoggedAudit +
									 '&contactbusiness=' + ns1blankspace.user.contactBusiness +
									 '&contactperson=' + ns1blankspace.user.contactPerson +
									 '&description=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsLateLoggedNote').val()) +
									 '&duedate=' + dToday.toString('dd MMM yyyy') +
									 '&status=1' +
									 '&lock=Y';
					}

					// Check if Result Status has changed to Awaiting Review and tell user that they must assign the reviewer on the summary page
					// SUP021689 But don't do it if the reviewer has already been assinged
					// v1.0.3f SUP022340 If changed to awaiting review, set oParam.reviewerID & oPAram.reviewerEmail so that email is sent to reviewer
					if ($('#ns1blankspaceDetailsResultStatus').attr('data-id') === nsFreshcare.data.audit.resultStatusAwaitingReview
						&& (ns1blankspace.objectContext === -1 
							|| (ns1blankspace.objectContext != -1 
								&& ns1blankspace.objectContextData['audit.resultstatus'] != $('#ns1blankspaceDetailsResultStatus').attr('data-id'))
							 )
						)
					{
						if (ns1blankspace.objectContextData['audit.teamleadercontactperson'] == '')
						{	// No teamleader set - tell user to set it before continuing
							oParam.dialogOptions = {title: 'Warning!', html: 'Please assign a reviewer from the summary tab.'};
						}
						else
						{	// teamleader set - we need to send email to reviewer
							oParam.reviewerID = ns1blankspace.objectContextData['audit.teamleadercontactperson'];
							oParam.reviewerEmail = ns1blankspace.objectContextData['audit.teamleadercontactperson.email'];
						}
					}

					// v3.1.210 SUP023240 Need to save Resulting Membership Status if admin user has changed it
					if (ns1blankspace.objectContext != -1 && nsFreshcare.user.roleID == nsFreshcare.data.roles.admin
						&& $('#ns1blankspaceDetailsMembershipStatus').attr('data-id') != ns1blankspace.objectContextData['audit.membershipstatus'])
					{
						sData += '&membershipstatus=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMembershipStatus').attr('data-id'));
					}

					// If user has sent a notification to FC of a missing trainee, save the Trainee Name
					if (nsFreshcare.admin.audit.data.traineeDetails)
					{
						sData += '&semissingtraineename=' + ns1blankspace.util.fs(nsFreshcare.admin.audit.data.traineeDetails.traineeFirstName + 
													 	' ' + nsFreshcare.admin.audit.data.traineeDetails.traineeSurname);
					}

					// v3.3.001 SUP023563 If subscription expirymonth is blank, update to audit month
					if ($('#ns1blankspaceDetailsMembership').attr('data-expirymonth') == '')
					{
						oParam.expiryMonth = ((new Date($('#ns1blankspaceDetailsActualDate').val())).getMonth() + 1).toString();
					}
				}

				if ($('#ns1blankspaceMainEvaluation').html() != '')
				{
					// v3.2.020 SUP02346 Now checks if anything has changed if existing record so not sending out emails with nothing having changed
					var sPrevName;
					if (ns1blankspace.objectContext != -1)
					{
						var bHasChanged = false;
						$.each($('#ns1blankspaceMainEvaluation [data-column]'), function()
						{
							if ($(this).hasClass('ns1blankspaceSelect') || $(this).hasClass('nsFreshcareSelectGrower'))
							{
								bHasChanged = ($(this).val() != ns1blankspace.objectContextData['audit.' + $(this).attr('data-column') + 'text']);
								if (bHasChanged) {$(this).attr('data-changed', '1');}
							}
							else if ($(this).hasClass('ns1blankspaceText') || $(this).is('textarea'))
							{
								bHasChanged = ($(this).val() != ns1blankspace.objectContextData['audit.' + $(this).attr('data-column')]);
								if (bHasChanged) {$(this).attr('data-changed', '1');}
							}
							else if ($(this).attr('type') == 'radio' && sPrevName != $(this).attr('name'))
							{
								bHasChanged = $('input[name="' + $(this).attr('name') + '"]:checked').val() != ns1blankspace.objectContextData['audit.' + $(this).attr('data-column')];
								if (bHasChanged) {$(this).attr('data-changed', '1');}
							}
							sPrevName = $(this).attr('name');
						});
					}

					if (ns1blankspace.objectContext == -1 || $('#ns1blankspaceMainEvaluation [data-changed="1"]').length > 0)
					{
						sData += '&trainercontactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceEvaluationsTrainer').attr('data-id'));
						sData += '&trainingdate=' + ns1blankspace.util.fs($('#ns1blankspaceEvaluationsTrainingDate').val());
						if (sData.indexOf('trainingduration=') == -1)		// Otherwise, it sends it twice and doubles the number!
						{
							sData += '&trainingduration=' + ns1blankspace.util.fs($('#ns1blankspaceEvaluationsAssessmentLength').val());
						}
						sData += '&trainingrating=' + ns1blankspace.util.fs($('input[name="radioRating"]:checked').val());
						sData += '&trainingnotes=' + ns1blankspace.util.fs($('#ns1blankspaceEvaluationsComments').val());
						oData['audit.trainercontactbusiness'] = $('#ns1blankspaceEvaluationsTrainer').attr('data-id');
						oData['audit.trainercontactbusinesstext'] = $('#ns1blankspaceEvaluationsTrainer').val();
						oData['audit.trainingdate'] = $('#ns1blankspaceEvaluationsTrainingDate').val();
						oData['audit.trainingduration'] = $('#ns1blankspaceEvaluationsAssessmentLength').val();
						oData['audit.trainingrating'] = $('input[name="radioRating"]:checked').val();
						oData['audit.trainingnotes'] = $('#ns1blankspaceEvaluationsComments').val();

						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
									label: nsFreshcare.data.growerText,
									oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.contactbusinesstext']),
									newValue: ($('#ns1blankspaceMainDetails').html() != '' ? $('#ns1blankspaceDetailsGrowerBusiness').val() : ns1blankspace.objectContextData['audit.contactbusinesstext']).formatXHTML()
								}));

						// v3.3.001 SUP023763 Add Trainee Name to email sent to FC
						var sName = nsFreshcare.admin.audit.getTraineeName();
						if (sName)
						{
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
										label: 'Trainee Name',
										oldValue: (ns1blankspace.objectContext == -1 
													? '' 
													: (ns1blankspace.objectContextData["audit.sequalifyingtraininglink.attendee.attendingtrainee"] != ''
														? ns1blankspace.objectContextData["audit.sequalifyingtraininglink.attendee.attendingtrainee"]
														: ns1blankspace.objectContextData['audit.semissingtraineename'])),
										newValue: sName
									}));
						}

						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
									label: 'Membership',
									oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.agrisubscription.membershiptext']),
									newValue: ($('#ns1blankspaceMainDetails').html() != '' ? $('#ns1blankspaceDetailsMembership').val() : ns1blankspace.objectContextData['audit.agrisubscription.membershiptext']).formatXHTML()
								}));
						
						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
									label: 'Audit Date',
									oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.actualdate']),
									newValue: ($('#ns1blankspaceMainDetails').html() != '' ? $('#ns1blankspaceDetailsActualDate').val() : ns1blankspace.objectContextData['audit.actualdate']).formatXHTML()
								}));

						if (ns1blankspace.objectContext == -1 || $('#ns1blankspaceEvaluationsTrainer').attr('data-changed') == '1')
						{
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
										label: $('#ns1blankspaceEvaluationsTrainer').attr('data-caption').formatXHTML(),
										oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.trainercontactbusinesstext']),
										newValue: $('#ns1blankspaceEvaluationsTrainer').val().formatXHTML()
									}));
						}

						if (ns1blankspace.objectContext == -1 || $('#ns1blankspaceEvaluationsTrainingDate').attr('data-changed') == '1')
						{
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
										label: $('#ns1blankspaceEvaluationsTrainingDate').attr('data-caption').formatXHTML(),
										oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.trainingdate']),
										newValue: $('#ns1blankspaceEvaluationsTrainingDate').val().formatXHTML()
									}));
						}

						if (ns1blankspace.objectContext == -1 || $('#ns1blankspaceEvaluationsAssessmentLength').attr('data-changed') == '1')
						{
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
										label: $('#ns1blankspaceEvaluationsAssessmentLength').attr('data-caption').formatXHTML(),
										oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.trainingduration']),
										newValue: $('#ns1blankspaceEvaluationsAssessmentLength').val().formatXHTML()
									}));
						}

						if (ns1blankspace.objectContext == -1 || $('#radioRating1').attr('data-changed') == '1')
						{
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
										label: "Client's understanding rating".formatXHTML(),
										oldValue: (ns1blankspace.objectContext == -1 ? '' : $('[name="radioRating"][value="' + ns1blankspace.objectContextData['audit.trainingrating'] + '"]').attr('data-label')),
										newValue: $('input[name="radioRating"]:checked').attr('data-label').formatXHTML()
									}));
						}

						if (ns1blankspace.objectContext == -1 || $('#ns1blankspaceEvaluationsComments').attr('data-changed') == '1')
						{
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({
										label: 'Comments',
										oldValue: (ns1blankspace.objectContext == -1 ? '' : ns1blankspace.objectContextData['audit.trainingnotes']),
										newValue: $('#ns1blankspaceEvaluationsComments').val().formatXHTML()
									}));
						}
						$('#ns1blankspaceMainEvaluation [data-changed="1"]').removeAttr('data-changed');

						// v3.1.0b Since now using rpc messaging, need to send from verified account
						// v3.1.215 SUP023190 Now sends from user.contactPerson instead of user.email
						// v3.2.005 SUP023190 Now sends replyto
						// v3.2.020 Now uses switched contactPerson when switched
						// v3.2.022 SUP023618 Needs to send emailFromAuditor when auditor user
						oParam.updateRows = aMessageHTML;
						oParam.to = nsFreshcare.data.emailToTrainer;
						oParam.from = (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin ? nsFreshcare.data.emailFromAuditor : ns1blankspace.user.contactPerson);
						/*oParam.from = ((nsFreshcare.data.switched && nsFreshcare.data.switched.id) 
										? nsFreshcare.data.switched.contactPerson
										: ((nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) 
											? nsFreshcare.data.emailFromAuditor 
											: ns1blankspace.user.contactPerson)); */
						oParam.replyTo = ((nsFreshcare.data.switched == undefined && nsFreshcare.data.switched.id == undefined) 
										? undefined
										: ns1blankspace.user.contactPerson);
						oParam.subject = 'Certification Body ' + ns1blankspace.user.contactBusinessText + ' has ' + 
									((ns1blankspace.objectContext == -1) 
										? 'added a new Initial Audit.' 
										: 'updated the Training Evaluation on an initial Audit ' + ns1blankspace.objectContextData['audit.reference'] + '.') ;
						oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.audit.save.process);
					}
				}

				// v3.1.2 SUP022693 Save Scope Extensions, but only if user has displayed Current Scope Values (to avoid saving ones they've previously removed)
				if ($('#ns1blankspaceMainExtension').html() != '' && $('#ns1blankspaceScopeCurrentData').is('*')) 
				{
					$.each($('#ns1blankspaceScopeCurrentData .ns1blankspaceScopeItemSelect[data-selected="1"]'), function()
					{
						if ($(this).attr('data-object'))
						{
							aScopeExtensions.push(
							{
								object: $(this).attr('data-object'),
								objectcontext: this.id.split('-').pop()
							});
						}
						else
						{
							aScopeExtensions.push(
							{
								changedfield: $(this).attr('data-changedfield'),
								changedvalue: $(this).attr('data-' + $(this).attr('data-changedfield'))
							});
						}
					});
				}
				oParam.scopeExtensions = aScopeExtensions;

				// v3.3.001 SUP023422 Save qualifying training link
				if ($('#ns1blankspaceMainTrainee').html() != '' )
				{
					// We need to remove / create the link
					if (oParam.qualifyingTraining != undefined)
					{
						var oTraineeData = nsFreshcare.admin.audit.trainee.getTraineeData((ns1blankspace.objectContext == -1));
						oTraineeData = oTraineeData || {};

						// v3.4.008 oTraineeData should be null if removing qualifyingTraining Link
						// v4.0.019 Changed sequalifyingtraininglink to sequalifyingtraininglink.id
						if (oParam.qualifyingTraining == '')
						{
							oTraineeData = {};
						}
						oData['audit.sequalifyingtraininglink.id'] = oParam.qualifyingTraining;
						oData['audit.sequalifyingtraininglink.attendee.id'] = oTraineeData['attendee'] || '';
						oData["audit.sequalifyingtraininglink.attendee.traineecontactbusinesstext"] = oTraineeData['agritraineeattendancelink.attendee.traineecontactbusiness'] || '';
						oData["audit.sequalifyingtraininglink.attendee.attendingtrainee"] = oTraineeData['agritraineeattendancelink.attendee.attendingtrainee'] || '';
						oData["audit.sequalifyingtraininglink.attendee.course.coursedate"] = oTraineeData['agritraineeattendancelink.attendee.course.coursedate'] || '';
						oData["audit.sequalifyingtraininglink.attendee.course.status"] = oTraineeData['agritraineeattendancelink.attendee.course.status'] || '';
						oData["audit.sequalifyingtraininglink.attendee.course.statustext"] = oTraineeData['agritraineeattendancelink.attendee.course.statustext'] || '';
						oData["audit.sequalifyingtraininglink.attendee.course.package.codeofpracticetext"] = oTraineeData['agritraineeattendancelink.attendee.course.package.codeofpracticetext'] || '';
						oData["audit.sequalifyingtraininglink.attendee.course.package.membership.code"] = oTraineeData['agritraineeattendancelink.attendee.course.package.membership.code'] || '';
						sData += '&sequalifyingtraininglink=' + oParam.qualifyingTraining;
					}
				}

				if (sData.length > 0 || aScopeExtensions.length > 0 || nsFreshcare.admin.audit.data.traineeDetails) 
				{
					// v3.1.2 Put current subscription value to oParam so we can use for ScopeExtension
					if ($('#ns1blankspaceMainDetails').html() != '')
					{
						oParam.subscription = $('#ns1blankspaceDetailsMembership').attr('data-id');
					}
					else {oParam.subscription = ns1blankspace.objectContextData['audit.subscription']}
					
					oParam.saveAuditStep = (sData.length > 0) ? 4 : 5;
					sData = 'id=' + ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '') + sData;
					oParam.data = sData;
					oParam.dataObject = oData;
					nsFreshcare.admin.audit.save.send(oParam);
				}
				else 
				{
					ns1blankspace.status.message('Nothing to Save');
				}
			}

			// Save the Audit record
			else if (oParam.saveAuditStep == 4)
			{
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AUDIT_MANAGE'),
					data: sData + '&datareturn=subscription,reference',
					dataType: 'json',
					success: function(oResponse) 
					{
						
						if (oResponse.status === 'OK')
						{
							oParam.newAudit = (ns1blankspace.objectContext === -1);
							// v2.0.2 Need to update this value in the object data otherwise adding / removing CARs logic is incorrect.
							if (ns1blankspace.objectContext != -1 && oParam.resultStatus != undefined && oParam.resultStatus != '') 
							{
								ns1blankspace.objectContextData['audit.resultstatus'] = oParam.resultStatus;
							}
							
							ns1blankspace.objectContext = oResponse.id;

							oParam.saveAuditStep = 5;
							nsFreshcare.admin.audit.save.send(oParam);
						}
						else
						{
							nsFreshcare.data.saveError.push(['Error updating Audit: ' + oResponse.error.errornotes]);
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					}
				});
			}

			// Now save the Note for late logged audits if applicable
			else if (oParam.saveAuditStep === 5)
			{
				if (sNoteData != '')
				{
					// v3.1.2 SUP022543 Notes may already have objectcontext
					// v3.2.022 SUP023618 No longer searches for reference as is returned with datareturn from save
					if (sNoteData.indexOf('&objectcontext') === -1)
					{
						sNoteData += '&objectcontext=' + ns1blankspace.objectContext +
									'&subject=' + 
											ns1blankspace.util.fs('Late Logged Audit by ' + ns1blankspace.user.contactBusinessText);
					}

					if (oParam.reference)
					{
						sNoteData += ns1blankspace.util.fs(': ' + oParam.reference + ' ');
					}

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
						data: sNoteData,
						dataType: 'JSON',
						success: function(oResponse) 
						{
							if (oResponse.status === 'ER')
							{
								ns1blankspace.status.error('Error saving note.');
							}
							oParam.saveAuditStep = 6;
							nsFreshcare.admin.audit.save.send(oParam);
						}
					});
				}
				else
				{
					oParam.saveAuditStep = 6;
					nsFreshcare.admin.audit.save.send(oParam);
				}
			}

			// Now save Scope Extension records
			else if (oParam.saveAuditStep == 6)
			{
				if (oParam.scopeExtensionIndex == undefined) {oParam.scopeExtensionIndex = 0}
				if (oParam.scopeExtensions == undefined) {oParam.scopeExtensions = aScopeExtensions}

				if (oParam.scopeExtensionIndex < oParam.scopeExtensions.length)
				{
					// v3.4.017 Was passing oData.audit.id and oData.audit.subscription
					// v3.4.019 Was passing audit id as id
					var oData = oParam.scopeExtensions[oParam.scopeExtensionIndex];
					oData.audit = ns1blankspace.objectContext;
					oData.subscription = oParam.subscription;
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_UPGRADE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								oParam.scopeExtensionIndex += 1;
								nsFreshcare.admin.audit.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving Scope Extension: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				// We're all done
				else
				{
					// If we've added scope Extensions, set data-loading to 1 so that it refreshes and re-display if visible
					if (oParam.scopeExtensions.length > 0)
					{
						$('#ns1blankspaceMainExtension').attr('data-loading', '1');
						if ($('#ns1blankspaceMainExtension:visible').length > 0)
						{
							$('#ns1blankspaceControlExtension').click();
						}
					}
					delete(oParam.scopeExtensionIndex);
					oParam.saveAuditStep = 7;
					nsFreshcare.admin.audit.save.send(oParam);
				}
			}

			// Save expirymonth to subscription if required
			else if (oParam.saveAuditStep == 7)
			{
				if (oParam.expiryMonth)
				{
					var oSubscriptionData =
					{
						id: oParam.subscription, 
						expirymonth: oParam.expiryMonth, 
						expirychangereason: 'Automatically set when Audit added.', 
						expirychangeddate: dToday.toString('dd MMM yyyy'), 
						expirychangedbyuser: ns1blankspace.user.id
					};

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
						data: oSubscriptionData,
						success: function(oResponse)
						{
							if (oResponse.status === 'ER')
							{
								ns1blankspace.status.error('Error updating Re-Cert Audit Month on Membership: ' + oResponse.error.errornotes);
							}
							else
							{
								ns1blankspace.status.message('Membership\'s expiry month updated.');
							}
							oParam.saveAuditStep = 8;
							nsFreshcare.admin.audit.save.send(oParam);
						}
					})
				}
				else
				{
					oParam.saveAuditStep = 8;
					nsFreshcare.admin.audit.save.send(oParam);
				}
			}

			//v3.4.008 SUP023809 Update details of Training Link if required
			// v3.4.009 Use oParam.newAudit, not objectContext == -1
			else if (oParam.saveAuditStep == 8)
			{
				if (oParam.qualifyingTraining != undefined && oParam.qualifyingTraining != '')
				{
					var oTraineeData = nsFreshcare.admin.audit.trainee.getTraineeData(oParam.newAudit);
					if (oTraineeData.subscription == '')
					{
						var oLinkData = 
						{
							id: oParam.qualifyingTraining,
							subscription: (oParam.newAudit)
											? $('#ns1blankspaceDetailsMembership').attr('data-id')
											: ns1blankspace.objectContextData['audit.subscription']
						};

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_TRAINEE_ATTENDANCE_LINK_MANAGE'),
							data: oLinkData,
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									oParam.saveAuditStep = 9;
									nsFreshcare.admin.audit.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error updating Training Link: ' + oResponse.error.errornotes);
								}
							}
						});
					}
					else
					{
						// v3.4.009 Was stopping if subscription was populated
						oParam.saveAuditStep = 9;
						nsFreshcare.admin.audit.save.send(oParam);
					}
				}
				else
				{
					oParam.saveAuditStep = 9;
					nsFreshcare.admin.audit.save.send(oParam);
				}
			}

			// v4.0.016 SUP024205 Remove subscription enddate if populated and new audit
			else if (oParam.saveAuditStep == 9)
			{
				if (oParam.newAudit && ns1blankspace.data.subscriptionEnddate != '')
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
						data: {id: oParam.subscription, enddate: ''},
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								ns1blankspace.status.message('Subscription end date removed');
								oParam.saveAuditStep = 10;
								nsFreshcare.admin.audit.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing subscription enddate: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					oParam.saveAuditStep = 10;
					nsFreshcare.admin.audit.save.send(oParam);
				}
			}

			else if (oParam.saveAuditStep == 10)
			{
				delete(oParam.saveAuditStep);
				nsFreshcare.admin.audit.save.process(oParam);
			}
		},

		process: function(oParam) 
		{
			// v3.2.020 Changed to be a stepped process so we make sure we cover all options
			var bNew = ns1blankspace.util.getParam(oParam, 'newAudit', {'default': false}).value;
			var oDialogOptions = ns1blankspace.util.getParam(oParam, 'dialogOptions', {'default': {html: '', title: 'Warning!'}}).value;
			var aDialogHTML = ns1blankspace.util.getParam(oParam, 'dialogHTML', {'default': [], set: true}).value;
			var bRefresh = false;
			var sHREF = window.location.href.split('/');
			sHREF.pop();
			sHREF = sHREF.join('/');

			ns1blankspace.status.message('Audit Saved');
			ns1blankspace.inputDetected = false;

			oParam.saveProcessStep = oParam.saveProcessStep || 1;
			
			// Send email regarding Training Evaluluation 			
			if (oParam.saveProcessStep == 1)
			{
				oParam.saveProcessStep += 1;
				if (oParam.updateRows != undefined) 
				{
					oParam.onComplete = nsFreshcare.admin.audit.save.process;
					nsFreshcare.external.grower.save.sendEmail(oParam);
				}
				else
				{	
					nsFreshcare.admin.audit.save.process(oParam);
				}
			}			

			// Check if Grower's Membership is Withdrawn and send email to Freshcare
			// v3.2.022 SUP023622 now sending correct from email
			else if (oParam.saveProcessStep == 2)
			{
				oParam.saveProcessStep += 1;
				if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && bNew 
					&& ns1blankspace.data.subscriptionStatus === nsFreshcare.data.grower.subscriptionStatusWD) 
				{
					oParam.onComplete = nsFreshcare.admin.audit.save.process;
					nsFreshcare.external.grower.save.sendEmail(
					{
						to: nsFreshcare.data.emailToAuditor,
						from: (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin ? nsFreshcare.data.emailFromAuditor : ns1blankspace.user.contactPerson),
						replyTo: ns1blankspace.user.contactPerson,
						subject: 'Audit logged for Withdrawn grower - ' + ns1blankspace.data.contactBusinessText.formatXHTML(),
						message: 'Auditor ' + ns1blankspace.user.contactBusinessText.formatXHTML() + ' has logged an Audit for grower ' +
								 ns1blankspace.data.contactBusinessText.formatXHTML() + ', whose Membership (' + 
								 ns1blankspace.data.membershipText.formatXHTML() + ') is Withdrawn.'
					});
				}
				else
				{
					nsFreshcare.admin.audit.save.process(oParam);
				}
			}

			// Check if reviewer has just been assigned and send them an email
			else if (oParam.saveProcessStep == 3)
			{
				oParam.saveProcessStep += 1;
				if (oParam.reviewerID && oParam.reviewerEmail != '')
				{
					oParam.onComplete = nsFreshcare.admin.audit.save.process;

					// v3.2.022 SUP023618 Needs to send emailFromAuditor when auditor user
					nsFreshcare.external.grower.save.sendEmail($.extend(oParam,
					{
						to: oParam.reviewerEmail,
						from: ((nsFreshcare.data.switched && nsFreshcare.data.switched.id) 
										? nsFreshcare.data.switched.contactPerson
										: ((nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) 
											? nsFreshcare.data.emailFromAuditor 
											: ns1blankspace.user.contactPerson)),
						replyTo: ((nsFreshcare.data.switched == undefined && nsFreshcare.data.switched.id == undefined) 
										? undefined
										: ns1blankspace.user.contactPerson),
						subject: 'Audit for ' + ns1blankspace.data.contactBusinessText.formatXHTML() + ' has been assigned to you for reviewing',
						message: 'Audit for ' + ns1blankspace.data.contactBusinessText.formatXHTML() + ' has been assigned to you for reviewing.<br /><br />' +
								'Click <a href="' + sHREF + '/#/' + ns1blankspace.rootnamespacetext + '-admin.audit/id:' + ns1blankspace.objectContext + '" target="_blank">here</a> to open the Audit.',
						sentToText: 'Reviewer'
					}));
				}
				else
				{
					if (oParam.reviewerID != undefined)
					{
						oParam.dialogHTML.push('No email has been sent to the reviewer to notify them that they have been assigned to this audit as they don\'t have an email address!');
					}	
					nsFreshcare.admin.audit.save.process(oParam);
				}
			}

			// v3.3.001 SUP023763 User has entered missing trainee details
			else if (oParam.saveProcessStep == 4)
			{
				oParam.saveProcessStep = 5;
				if (nsFreshcare.admin.audit.data.traineeDetails)
				{
					oParam.onComplete = nsFreshcare.admin.audit.save.process;
					delete(oParam.dataObject);		// force refresh

					nsFreshcare.external.grower.save.sendEmail($.extend(oParam,
					{
						to: nsFreshcare.data.emailToAuditor,
						from: ((nsFreshcare.data.switched && nsFreshcare.data.switched.id) 
										? nsFreshcare.data.switched.contactPerson
										: ((nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) 
											? nsFreshcare.data.emailFromAuditor 
											: ns1blankspace.user.contactPerson)),
						replyTo: ((nsFreshcare.data.switched == undefined && nsFreshcare.data.switched.id == undefined) 
										? undefined
										: ns1blankspace.user.contactPerson),
						subject: 'Missing Trainee Details for ' + ns1blankspace.data.contactBusinessText.formatXHTML(),
						// v3.3.002 SUP023800 Added CB's name to email
						message: ns1blankspace.user.contactBusinessText.formatXHTML() + ' has registered that Trainee details are missing for audit logged for ' + 
									ns1blankspace.data.contactBusinessText.formatXHTML() + '.<br /><br />' +
									(oParam.newAudit != true ? '<b>Audit Reference:</b> ' + ns1blankspace.objectContextData['audit.reference'] + '<br />': '') +
									'<b>Audit Date:</b> ' + (oParam.newAudit != true ? ns1blankspace.objectContextData['audit.actualdate'] : $('#ns1blankspaceDetailsActualDate').val())  + '<br />' +
									'<b>Membership:</b> ' + (oParam.newAudit != true ? ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'] : $('#ns1blankspaceDetailsMembership').val())  + '<br />' +
									'<b>Trainer</b>: ' + nsFreshcare.admin.audit.data.traineeDetails.trainerText.formatXHTML()  + '<br />' +
									'<b>Course Type</b>: ' + nsFreshcare.admin.audit.data.traineeDetails.courseType  + '<br />' +
									'<b>Date Training Completed</b>: ' + nsFreshcare.admin.audit.data.traineeDetails.trainingDate  + '<br />' +
									'<b>Trainee Name</b>: ' + nsFreshcare.admin.audit.data.traineeDetails.traineeFirstName +  ' ' + 
															  nsFreshcare.admin.audit.data.traineeDetails.traineeSurname + '<br /><br />' +								'Click <a href="' + sHREF + '/#/' + ns1blankspace.rootnamespacetext + '-admin.audit/id:' + ns1blankspace.objectContext + '" target="_blank">here</a> to open the Audit.',
						sentToText: 'Freshcare',
						contactBusiness: ns1blankspace.data.contactBusiness
					}));
				}
				else
				{
					nsFreshcare.admin.audit.save.process(oParam);
				}
			}

			// v3.3.005 SUP023800 Remind user they need to update the certificate if Re-Cert Audit month has been changed
			else if (oParam.saveProcessStep == 5)
			{
				oParam.saveProcessStep = 10;
				if ($('#ns1blankspaceDetailsRecertAuditMonth').is('*') 
					&& $('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id') != undefined
					&& $('#ns1blankspaceDetailsRecertAuditMonth').attr('data-id') != ns1blankspace.objectContextData['audit.serecertauditmonth'])
				{
					oParam.dialogHTML.push('You have changed the Re-Certification Audit Due Month. Please return to the Member\'s page to re-print the Certificate.')
				}
				nsFreshcare.admin.audit.save.process(oParam);
			}

			// Time to determine if we need to refresh
			else if (oParam.saveProcessStep == 10)
			{
				// v3.3.001 Refresh the data in ns1blanksapce.objectContextData
				if (!bNew) 
				{
					// v3.4.007 We've just changed to Completed and we're not admin - refresh to disable fields
					if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && $('#ns1blankspaceDetailsResultStatus').is('*') 
						&& $('#ns1blankspaceDetailsResultStatus').attr('data-id') == nsFreshcare.data.audit.statusCompleted
						&& ns1blankspace.objectContextData['audit.resultstatus'] != nsFreshcare.data.audit.statusCompleted)
					{
						bRefresh = true;
					}
					else
					{
						// Existing record: Update the data in objectContextData
						if (oParam.dataObject)
						{
							$.each(Object.keys(oParam.dataObject), function(index, key)
							{
								if (key != 'id' && oParam.dataObject[key] != undefined)
								{ns1blankspace.objectContextData[key] = oParam.dataObject[key];}
								//{ns1blankspace.objectContextData['audit.' + key] = oParam.dataObject[key];}
							});
							$('#ns1blankspaceMainCARs').attr('data-loading', '1');
						}
						else {bRefresh = true;}
					}
				}
				else {bRefresh = true;}

				// Show the dialog if applicable
				if (aDialogHTML.length > 0)
				{
					oDialogOptions.html = aDialogHTML.join('<br /><br />');
					ns1blankspace.container.confirm(oDialogOptions);
					if (oDialogOptions.buttons === undefined && bRefresh)
					{
						nsFreshcare.admin.audit.search.send('-' + ns1blankspace.objectContext);
					}
				}
				else if (bRefresh)
				{
					nsFreshcare.admin.audit.search.send('-' + ns1blankspace.objectContext);
				}
			}
		}
	}
}