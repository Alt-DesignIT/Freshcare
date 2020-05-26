/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
 // v3.2.015 SUP023421 Change 'Growers' to 'Members'

nsFreshcare.admin.auditcar = 
{
	init: 	function (oParam) {},

	initGlobals: 	function(oParam) 
	{

		if (oParam) {
			if (oParam.globalCARStep === undefined) { oParam.globalCARStep = 1;}
		}
		else {oParam = {globalCARStep: 1};}

		// Function to initialise carStatus, carSeverity & carCARType
		if (oParam.globalCARStep === 1) {

		  	if (nsFreshcare.data.auditCAR.carStatus === undefined) {
				nsFreshcare.data.auditCAR.carStatus = {};

				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "setup";
				oSearch.method = "SETUP_AUDIT_ISSUE_STATUS_SEARCH";
				oSearch.addField("title");
				oSearch.getResults(function(oResponse) {

					if (oResponse.status === "OK") {
						nsFreshcare.data.auditCAR.carStatus = oResponse.data.rows;
						$.each(oResponse.data.rows, function() {
							if (this.title.indexOf('To Be') > -1) {
								nsFreshcare.data.auditCAR.statusToBeCompleted = this.id;
							}
							else if (this.title.indexOf('Complete') > -1) {
								nsFreshcare.data.auditCAR.statusCompleted = this.id;
							}
						});
					}
					else {
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
					oParam.globalCARStep = 2;
					nsFreshcare.admin.auditcar.initGlobals(oParam);
				}); 
			}
			else {
				oParam.globalCARStep = 2;
			}

		}

		if (oParam.globalCARStep === 2 ) {
			if (nsFreshcare.data.auditCAR.carSeverity === undefined) {
				nsFreshcare.data.auditCAR.carSeverity = {};

				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "setup";
				oSearch.method = "SETUP_AUDIT_ISSUE_TYPE_SEARCH";
				oSearch.addField("title");
				oSearch.getResults(function(oResponse) {
				 //ns1blankspace.util.endpointURI("SETUP_AUDIT_ISSUE_TYPE_SEARCH")
				/*$.ajax({
					type: "GET",
					url: '/rpc/setup/?method=SETUP_AUDIT_ISSUE_TYPE_SEARCH',
					dataType: "JSON",
					success: function(oResponse) {*/

						if (oResponse.status === "OK") {
							nsFreshcare.data.auditCAR.carSeverity = oResponse.data.rows;
							$.each(oResponse.data.rows, function() {
								if (this.title.indexOf('Major CAR') > -1) {
									nsFreshcare.data.auditCAR.severityMajor = this.id;
								}
							});
						}
						else {
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
						oParam.globalCARStep = 3;
						nsFreshcare.admin.auditcar.initGlobals(oParam);
					//} 
				}); 
			}
			else {
				oParam.globalCARStep = 3;
			}

		}

		if (oParam.globalCARStep === 3)	{
			if (nsFreshcare.data.auditCAR.carCARType == undefined) {
				nsFreshcare.data.auditCAR.carCARType = {};

				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "setup";
				oSearch.method = "SETUP_AUDIT_ISSUE_SINTYPE_SEARCH";
				oSearch.addField("code,title,issuetype,membership");
				oSearch.rows = 100;
				oSearch.getResults(function(oResponse) {

					if (oResponse.status === "OK") {
						nsFreshcare.data.auditCAR.carCARType = oResponse.data.rows;
					}
					else {
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
					oParam.globalCARStep = 3;
					nsFreshcare.admin.auditcar.initGlobals(oParam);
				}); 
			}
			else {
				oParam.globalCARStep = 4;
			}
		}

		if (oParam.globalCARStep === 4) {
			ns1blankspace.util.onComplete(oParam);
		}
	},

	details: 	function(oParam) 
	{

		var aHTML = [];
		var sXHTMLElementID = '';
		var sXHTMLContext = 'CARDetail';

		var sCARDataIssueId = -1;
		var sCARDataAuditId;
		var sCARDataAuditValue;
		var sCARDataReference;
		var sCARDataSeverityId;
		var sCARDataSeverityValue;
		var sCARDataCARTypeId;
		var sCARDataCARTypeValue;
		var sCARDataCARTypeCode;
		var sCARDataCARTypePrefix;
		var sCARDataDetails;
		var sCARDataResolution;
		var sCARDataStatusId;
		var sCARDataStatusValue;
		var sCARDataCompleted;
		var sAuditDataResultStatus;
		var sAuditDataMembership;
		var sAuditDataCOP;
		var bCanEdit = true;
		var oStandard;

		// v3.4.018 CArTypePrtefix was being set to CarTypeCode
		if (oParam) 
		{
			if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID;}
			if (oParam.xhtmlContext != undefined) {sXHTMLContext = oParam.xhtmlContext;}
			if (oParam.dataIssueID != undefined) {sCARDataIssueId = oParam.dataIssueID;}
			if (oParam.dataAuditID != undefined) {sCARDataAuditId = oParam.dataAuditID;}
			if (oParam.dataAuditValue != undefined) {sCARDataAuditValue = oParam.dataAuditValue;}
			if (oParam.dataReference != undefined) {sCARDataReference = oParam.dataReference;}
			if (oParam.dataSeverityID != undefined) {sCARDataSeverityId = oParam.dataSeverityID;}
			if (oParam.dataSeverityValue != undefined) {sCARDataSeverityValue = oParam.dataSeverityValue;}
			if (oParam.dataCARTypeID != undefined) {sCARDataCARTypeId = oParam.dataCARTypeID;}
			if (oParam.dataCARTypeValue != undefined) {sCARDataCARTypeValue = oParam.dataCARTypeValue;}
			if (oParam.dataCARTypeCode != undefined) {sCARDataCARTypeCode = oParam.dataCARTypeCode;}
			if (oParam.dataCARTypePrefix != undefined) {sCARDataCARTypePrefix = oParam.dataCARTypePrefix;}
			if (oParam.dataDetails != undefined) {sCARDataDetails = oParam.dataDetails;}
			if (oParam.dataResolution != undefined) {sCARDataResolution = oParam.dataResolution;}
			if (oParam.dataStatusID != undefined) {sCARDataStatusId = oParam.dataStatusID;}
			if (oParam.dataStatusValue != undefined) {sCARDataStatusValue = oParam.dataStatusValue;}
			if (oParam.dataCompleted != undefined) {sCARDataCompleted = oParam.dataCompleted;}
			if (oParam.dataAuditResultStatus != undefined) {sAuditDataResultStatus = oParam.dataAuditResultStatus;}
			if (oParam.dataAuditMembership != undefined) {sAuditDataMembership = oParam.dataAuditMembership;}
			if (oParam.dataAuditCOP != undefined) {sAuditDataCOP = oParam.dataAuditCOP;}
			if (oParam.edit != undefined) {bCanEdit = oParam.edit;}
		}

		sCARDataIssueId = (sCARDataIssueId === -1 && ns1blankspace.object != nsFreshcare.objectAudit) ? ns1blankspace.objectContext : sCARDataIssueId;
		sCARDataAuditId = (sCARDataAuditId === undefined) ? ns1blankspace.objectContextData['auditissue.audit'] : sCARDataAuditId;
		sCARDataAuditValue = (sCARDataAuditValue === undefined) ? ns1blankspace.objectContextData['auditissue.audit.contactbusinesstext'].formatXHTML() + ' ' + ns1blankspace.objectContextData['auditissue.audit.actualdate'].formatXHTML() : sCARDataAuditValue;
		sAuditDataMembership = (sAuditDataMembership === undefined) ? ns1blankspace.objectContextData['auditissue.audit.agrisubscription.membership'] : sAuditDataMembership;				
		sAuditDataCOP = (sAuditDataCOP === undefined) ? ns1blankspace.objectContextData['auditissue.audit.codeodpractice'] : sAuditDataCOP;				
		
		if (sCARDataIssueId != -1) {		// Other values are only required if existing record
			sCARDataReference = (sCARDataReference === undefined) ? ns1blankspace.objectContextData['auditissue.reference'].formatXHTML() : sCARDataReference;
			sCARDataSeverityId = (sCARDataSeverityId === undefined) ? ns1blankspace.objectContextData['auditissue.type'] : sCARDataSeverityId;
			sCARDataSeverityValue = (sCARDataSeverityValue === undefined) ? ns1blankspace.objectContextData['auditissue.typetext'].formatXHTML() : sCARDataSeverityValue;
			sCARDataCARTypeId = (sCARDataCARTypeId === undefined) ? ns1blankspace.objectContextData['auditissue.sintype'] : sCARDataCARTypeId;
			sCARDataCARTypeValue = (sCARDataCARTypeValue === undefined) ? ns1blankspace.objectContextData['auditissue.sintypetext'].formatXHTML() : sCARDataCARTypeValue;
			sCARDataCARTypeCode = (sCARDataCARTypeCode === undefined) ? ns1blankspace.objectContextData['auditissue.sintype.code'].formatXHTML() : sCARDataCARTypeCode
			sCARDataCARTypePrefix = (sCARDataCARTypePrefix === undefined) ? ns1blankspace.objectContextData['auditissue.sintype.prefix'].formatXHTML() : sCARDataCARTypePrefix
			sCARDataDetails = (sCARDataDetails === undefined) ? ns1blankspace.objectContextData['auditissue.details'].formatXHTML() : sCARDataDetails;
			sCARDataResolution = (sCARDataResolution === undefined) ? ns1blankspace.objectContextData['auditissue.resolution'].formatXHTML() : sCARDataResolution;
			sCARDataStatusId = (sCARDataStatusId === undefined) ? ns1blankspace.objectContextData['auditissue.status'] : sCARDataStatusId;
			sCARDataStatusValue = (sCARDataStatusValue === undefined) ? ns1blankspace.objectContextData['auditissue.statustext'].formatXHTML() : sCARDataStatusValue;
			sCARDataCompleted = (sCARDataCompleted === undefined) ? ns1blankspace.objectContextData['auditissue.datecompleted'].formatXHTML() : sCARDataCompleted;
			sAuditDataResultStatus = (sAuditDataResultStatus === undefined) ? ns1blankspace.objectContextData['auditissue.audit.resultstatus'].formatXHTML() : sAuditDataResultStatus;
		}

		var oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == sAuditDataMembership}).shift();

		aHTML = [];

		aHTML.push('<table class="ns1blankspace">');

		aHTML.push('<tr id="ns1blankspace' + sXHTMLContext + 'AuditCaption" class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Audit' +
						'</td></tr>' +
						'<tr id="ns1blankspace' + sXHTMLContext + 'AuditValue" class="ns1blankspace">' +
						'<td class="ns1blankspaceSelect">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'Audit" class="ns1blankspaceSelect"' +
							' data-method="AUDIT_SEARCH"' +
							' data-columns="contactbusinesstext-space-actualdate"' +
							' data-methodfilter="contactbusinesstext-TEXT_IS_LIKE-sSearchText"' +
							' data-issueID="' + sCARDataIssueId + '">' +
						'</td></tr>');		

		// v3.4.017 SUP023975 Only show Reference if internal user
		if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
		{
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Reference' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspace' + sXHTMLContext + 'Reference" class="ns1blankspaceText">' +
							'</td></tr>');		
		}

		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Severity' +
						'</td></tr>' +
						'<tr class="ns1blankspace">' +
						'<td class="ns1blankspaceSelect">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'Severity" class="ns1blankspaceSelect"' +
							' data-mandatory="true" data-caption="Severity"' +
							' data-method="SETUP_AUDIT_ISSUE_TYPE_SEARCH">' +
						'</td></tr>');			

		// v2.0.4 SUP021405 Added filtering on code and title
		// v2.0.4b SUP021506 Only mandatory if Major CAR
		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'CAR Type<br /><span class="ns1blankspaceSubNote">If searching by Element, only use the number to search</span>' +
						'</td></tr>' +
						'<tr class="ns1blankspace">' +
						'<td class="ns1blankspaceSelect">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'CARType" class="ns1blankspaceSelect"' +
							' data-caption="CAR Type"' + 
							' data-method="SETUP_AUDIT_ISSUE_SINTYPE_SEARCH"' +
							' data-columns="prefix-code-space-hyphen-space-title"' +
							' data-methodfilter="prefix-TEXT_IS_LIKE|code-TEXT_IS_LIKE|title-TEXT_IS_LIKE|' +
												'membership-EQUAL_TO-' + sAuditDataMembership + '|' +
												'issuesintype.sintypecop.codeofpractice-EQUAL_TO-' + sAuditDataCOP + '"');
		// v3.3.001 SUP023456 Don't add parent or mandatory attributes if we're not filtering on Severity
		if (oStandard.sefiltercartypeonseverity == 'Y')
		{ 
			aHTML.push(' data-Parent="ns1blankspace' + sXHTMLContext + 'Severity"' +
							' data-parent-search-id="issuetype"' +
							' data-parent-search-text="title"');
		}
		else
		{
			aHTML.push(' data-mandatory="1"');
		}
		aHTML.push('></td></tr>');			

		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Details / Action Required' +
						'</td></tr>' +
						'<tr class="ns1blankspaceTextMulti">' +
						'<td class="ns1blankspaceTextMulti">' +
						'<textarea rows="5" cols="50" id="ns1blankspace' + sXHTMLContext + 'Details" class="nsFreshcareTextMulti"' +
							' data-mandatory="true" data-caption="Details"></textarea>' +
						'</td></tr>');

		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Resolution' +
						'</td></tr>' +
						'<tr class="ns1blankspaceTextMulti">' +
						'<td class="ns1blankspaceTextMulti">' +
						'<textarea rows="5" cols="50" id="ns1blankspace' + sXHTMLContext + 'Resolution" class="nsFreshcareTextMulti"></textarea>' +
						'</td></tr>');

		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Status' +
						'</td></tr>' +
						'<tr class="ns1blankspace">' +
						'<td class="ns1blankspaceSelect">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'Status" class="ns1blankspaceSelect"' +
							' data-mandatory="true" data-caption="Status"' +
							' data-method="SETUP_AUDIT_ISSUE_STATUS_SEARCH"' + 
							' data-click="nsFreshcare.admin.auditcar.postSelectStatus">' +
						'</td></tr>');			

		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Date Completed' +
						'</td></tr>' +
						'<tr class="ns1blankspace">' +
						'<td class="ns1blankspaceDate">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'Completed" class="ns1blankspaceDate">' +
						'</td></tr>');			

		$('#' + sXHTMLElementID).html(aHTML.join(''));

		$('#ns1blankspace' + sXHTMLContext + 'AuditCaption').hide();
		$('#ns1blankspace' + sXHTMLContext + 'AuditValue').hide();
		$('#ns1blankspace' + sXHTMLContext + 'Audit').attr('data-id', sCARDataAuditId);
		$('#ns1blankspace' + sXHTMLContext + 'Audit').val(sCARDataAuditValue);
		ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});


		if (sCARDataIssueId != -1) {		// ns1blankspace.object != nsFreshcare.objectAudit && ns1blankspace.objectContext != -1

			if ($('#ns1blankspace' + sXHTMLContext + 'Reference').is('*'))
			{
				$('#ns1blankspace' + sXHTMLContext + 'Reference').val(sCARDataReference);
			}
			$('#ns1blankspace' + sXHTMLContext + 'Severity').val(sCARDataSeverityValue);
			$('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id', sCARDataSeverityId);
			$('#ns1blankspace' + sXHTMLContext + 'CARType').val(sCARDataCARTypePrefix + sCARDataCARTypeCode + ' - ' + sCARDataCARTypeValue);
			$('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-id', sCARDataCARTypeId);
			$('#ns1blankspace' + sXHTMLContext + 'Details').val(sCARDataDetails);
			$('#ns1blankspace' + sXHTMLContext + 'Resolution').val(sCARDataResolution);
			$('#ns1blankspace' + sXHTMLContext + 'Status').val(sCARDataStatusValue);
			$('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id', sCARDataStatusId);
			$('#ns1blankspace' + sXHTMLContext + 'Completed').val(sCARDataCompleted);

			// We disable all the fields if not bCanEdit
			if (!bCanEdit)
			{
				// v3.1.209 SUP023002 Cleaned up code - more efficient
				$('#' + sXHTMLElementID + ' input')
					.addClass('nsFreshcareDisabled')
					.attr('disabled', true);
				$('#' + sXHTMLElementID + ' textarea')
					.addClass('nsFreshcareDisabled')
					.attr('disabled', true);
			}

			// v3.4.007 If audit Completed or lapsed and CAR is open, only allow CB to change Resolution, Status & date compelte
			else if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin
					&& bCanEdit && sCARDataStatusId == nsFreshcare.data.auditCAR.statusToBeCompleted
					&& (ns1blankspace.objectContextData['audit.resultstatus'] == nsFreshcare.data.audit.resultStatusCompleted
						|| ns1blankspace.objectContextData['audit.membershipstatus'] == '-1'))
			{
				$('#ns1blankspace' + sXHTMLContext + 'Reference').attr('disabled', true).addClass('nsFreshcareDisabled');
				$('#ns1blankspace' + sXHTMLContext + 'Severity').attr('disabled', true).addClass('nsFreshcareDisabled');
				$('#ns1blankspace' + sXHTMLContext + 'CARType').attr('disabled', true).addClass('nsFreshcareDisabled');
				$('#ns1blankspace' + sXHTMLContext + 'Details').attr('disabled', true).addClass('nsFreshcareDisabled');
			}

		}
		else 
		{

			// Set defaults
			$('#ns1blankspace' + sXHTMLContext + 'Severity').val('Major CAR');
			$('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id', nsFreshcare.data.auditCAR.severityMajor);

			$('#ns1blankspace' + sXHTMLContext + 'Status').val('To Be Completed');
			$('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id', '1');
		}
	},

	postSelectSeverity: 	function() 
	{

		var sXHTMLContext = 'CARDetail';
		if (ns1blankspace.viewName === 'Audits') {
			sXHTMLContext = 'AuditCAR';
		}

		if ($('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') != undefined) {
			$('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-filter');
		}
	},

	postSelectStatus: function() 
	{
		var sXHTMLContext = 'CARDetail';
		var dToday = new Date();
		if (ns1blankspace.viewName === 'Audits') {
			sXHTMLContext = 'AuditCAR';
		}

		if ($('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id') === nsFreshcare.data.auditCAR.statusCompleted) {
			$('#ns1blankspace' + sXHTMLContext + 'Completed').val(dToday.toString('dd MMM yyyy'));
		}
		else {
			$('#ns1blankspace' + sXHTMLContext + 'Completed').val('');
		}
	},

	save: 	
	{
		validate: function(oParam) 
		{
			// v3.3.001 SUP023474 JASANZ Date rules now applid across the board
			oParam = oParam || {};
			var sXHTMLContext = 'CARDetail';
			var dToday = new Date();
			var dAudit = new Date(ns1blankspace.objectContextData['audit.actualdate']);
			var oThisIssue = (oParam.issueID != '-1') ? $.grep(ns1blankspace.objectContextData.cars, function(x) {return x.id == oParam.issueID}).shift() : undefined;
			oParam.validateCARStep = oParam.validateCARStep || 1;

			if (oParam.xhtmlContext) { sXHTMLContext = oParam.xhtmlContext;}

			if (oParam.validateCARStep == 1)
			{
				// Check that mandatory fields have been entered
				$('input[data-mandatory]').each(function() {

					if (this.id.indexOf(sXHTMLContext) > -1 && $(this).val() === '') {
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
						return false;
					}
				});

				// v2.0.4b SUP021506 Only mandatory if Major CAR
				// v3.1.1d SUP022604 Was checking serverity instead of CAR Type
				if (ns1blankspace.okToSave
					&& $('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') === nsFreshcare.data.auditCAR.severityMajor
					&& ($('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-id') == undefined || $('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-id') == ''))
				{
					ns1blankspace.status.message('CAR Type is mandatory when logging a Major CAR');
					ns1blankspace.okToSave = false;
				}

				// Set Completed date when appropriate
				if ($('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id') === nsFreshcare.data.auditCAR.statusCompleted
					&& $('#ns1blankspace' + sXHTMLContext + 'Completed').val() === '') 
				{
					$('#ns1blankspace' + sXHTMLContext + 'Completed').val(dToday.toString('dd MMM yyyy'));
				}

				// Completed date cannot be in the future
				if (ns1blankspace.okToSave && $('#ns1blankspace' + sXHTMLContext + 'Completed').val() != '' 
					&& (new Date($('#ns1blankspace' + sXHTMLContext + 'Completed').val())) > (new Date(dToday.toString('dd MMM yyyy'))))
				{
					ns1blankspace.status.message('Completed date cannot be in the future');
					ns1blankspace.okToSave = false;
				}

				// v3.3.001 Email from Angela 23 Oct 2018. Remove check for Expiry Date must be after CAR Completed date.

				// v3.3.001 SUP023456 If Critical CAR, then prompt to indicate that Member will be suspended after saving the CAR
				if (ns1blankspace.okToSave
					&& $('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') === nsFreshcare.data.auditCAR.severityCritical
					&& (oParam.issueID == '-1' || (oThisIssue['auditissue.type'] != nsFreshcare.data.auditCAR.severityCritical)))
				{
					ns1blankspace.container.confirm(
					{
						html: 'You have logged this CAR as Critical, which will result in the Member\'s certification being suspended, effective immediately.<br /><br />' +
								'Are you sure you intended to log a Critical CAR?',
						buttons: 
						[
							{
								text: 'Yes',
								click: function()
								{
									$('#ns1blankspaceBootstrapDialog').modal('hide');
									oParam.validateCARStep = 2;
									nsFreshcare.admin.auditcar.save.validate(oParam);
								}
							},
							{
								text: 'No',
								click: function()
								{
									$('#ns1blankspaceBootstrapDialog').modal('hide');
									ns1blankspace.okToSave = false;
								}
							}
						]
					});
				}
				else
				{
					oParam.validateCARStep = 2;
					nsFreshcare.admin.auditcar.save.validate(oParam);
				}
			}
			
			else if (oParam.validateCARStep == 2)
			{
				if (ns1blankspace.okToSave)
				{
					delete(oParam.validateCARStep);
					nsFreshcare.admin.auditcar.save.send(oParam);
				}
			}
		},

		send: 	function (oParam) 
		{

			oParam = oParam || {};
			var sXHTMLContext = 'CARDetail';
			var sData = 'id=';
			var sID = ns1blankspace.util.getParam(oParam, 'issueID').value;
			oParam.saveCARStep = oParam.saveCARStep || 1;

			if (oParam.xhtmlContext) { sXHTMLContext = oParam.xhtmlContext;}

			if (oParam.saveCARStep == 1)
			{
				ns1blankspace.okToSave = true;
				oParam.saveCARStep = 2;
				oParam.issueID = $('#ns1blankspace' + sXHTMLContext + 'Audit').attr('data-issueid');
				nsFreshcare.admin.auditcar.save.validate(oParam);
			}

			else if (oParam.saveCARStep == 2) 
			{

				if (ns1blankspace.viewName === 'Audit CARs' && ns1blankspace.objectContext === -1) {
					sData += ns1blankspace.objectContext;
				}
				else if (ns1blankspace.object === nsFreshcare.objectAudit && sID != undefined && sID != -1) {
					sData += sID;
				}

				sData += '&audit=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Audit').attr('data-id'));
				sData += '&reference=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Reference').val());
				sData += '&type=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id'));
				sData += '&sintype=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-id'));
				sData += '&details=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Details').val());
				sData += '&resolution=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Resolution').val());
				sData += '&status=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id'));
				sData += '&datecompleted=' + ns1blankspace.util.fs($('#ns1blankspace' + sXHTMLContext + 'Completed').val());

				$.ajax({
					type: 'POST',
					url: ns1blankspace.util.endpointURI("AUDIT_ISSUE_MANAGE"),
					data: sData,
					dataType: "JSON",
					success: function(oResponse) 
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.status.message('CAR Saved');
							delete(oParam.saveCARStep);
							oParam.carID = oResponse.id;
							nsFreshcare.admin.auditcar.save.process(oParam);
						}
						else
						{
							nsFreshcare.data.saveError.push(['Error updating Audit CAR: ' + oResponse.error.errornotes]);
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					}
				});

			}

		},

		process: function(oParam)
		{
			oParam = oParam || {};
			var sXHTMLContext = 'CARDetail';
			var iCARSaveStep = 1;
			var oThisIssue = ns1blankspace.util.getParam(oParam, 'thisIssue').value;
			oParam.processCARStep = oParam.processCARStep || 0;
			var oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == ns1blankspace.objectContextData['audit.agrisubscription.membership']}).shift();
			var oCOP = $.grep(oStandard.codesOfPractice, function(x) {return x.id == ns1blankspace.objectContextData['audit.codeofpractice']}).shift();
			if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext;}
			if (oParam.step) {sXHTMLContext = oParam.xhtmlContext;}

			// v3.4.010 SUP023214 Find the most recent status transaction for the subscription 
			if (oParam.processCARStep == 0)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_MEMBERSHIP_STATUS_CHANGE_SEARCH';
				oSearch.addField('changedate,tostatus,modifieduser,reason,agrisubscriptionstatuschange.subscription.status' +
								',agrisubscriptionstatuschange.subscription.laststatuschangedate');
				oSearch.addFilter('subscription', 'EQUAL_TO', ns1blankspace.objectContextData['audit.subscription']);
				oSearch.sort('changedate', 'desc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.lastStatusChange = oResponse.data.rows.shift();
						oParam.secondLastStatusChange = oResponse.data.rows.shift();
						oParam.processCARStep = 1;
						nsFreshcare.admin.auditcar.save.process(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding most recent Membership status data: ' + oResponse.error.errornotes);
					}
				});
			}

			// v3.3.001 SUP023456 Check if this is a new Critical CAR and if so, flag to add SP history row if not already added
			// Also, update audit result and resulting membership status and send email to admin
			else if (oParam.processCARStep == 1)
			{
				var oThisIssue = $.grep(ns1blankspace.objectContextData.cars, function(a) {return a.id === oParam.carID}).shift();
				oParam.thisIssue = oThisIssue;
				oParam.processCARStep = 2;
				oParam.statusUpdateData = [];
				var dStatus = (oParam.lastStatusChange) ? new Date(oParam.lastStatusChange.changedate) : undefined;

				if ($('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityCritical) 
				{
					// v3.3.001 SUP023456 If new or just changed to Critical CAR then this is a new Critical CAR
					if ((oThisIssue == undefined || oThisIssue['auditissue.severity'] != nsFreshcare.data.auditCAR.severityCritical)
						&& $('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityCritical)
					{
						// If new Critical CAR and Membership Status <> SP, change Membership status to SP
						if (ns1blankspace.objectContextData['audit.agrisubscription.status'] != nsFreshcare.data.grower.subscriptionStatusSP)
						{
							// v3.4.010 SUP023214 If last status added by automation, remove it if after changedate
							if (oParam.lastStatusChange.modifieduser == nsFreshcare.data.automationsUser
								&& dStatus > new Date(ns1blankspace.objectContextData['audit.actualdate']))
							{
								oParam.statusUpdateData.push(
								{
									id: oParam.lastStatusChange.id,
									remove: '1'
								});
								ns1blankspace.objectContextData['audit.agrisubscription.status'] = oParam.secondLastStatusChange.tostatus;
							}

							oParam.statusUpdateData.push(
							{
								subscription: ns1blankspace.objectContextData['audit.subscription'],
								fromstatus: ns1blankspace.objectContextData['audit.agrisubscription.status'],
								tostatus: nsFreshcare.data.grower.subscriptionStatusSP,
								changedate: ns1blankspace.objectContextData['audit.actualdate'],		// Set to Audit Date
								changecontactbusiness: ns1blankspace.user.contactBusiness,
								changecontactperson: ns1blankspace.user.contactPerson,
								reason: 'Critical CAR Logged at audit dated ' + ns1blankspace.objectContextData['audit.actualdate']
							});
							// Update Audit Result Status and Resulting Membership Status to Suspended
							oParam.auditData = 
							{
								id: ns1blankspace.objectContext,
								resultstatus: nsFreshcare.data.audit.resultStatusSuspended,
								membershipstatus: nsFreshcare.data.grower.subscriptionStatusSP
							};

							oParam.to = nsFreshcare.data.emailToAdmin;
							oParam.from = (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin ? nsFreshcare.data.emailFromAuditor : ns1blankspace.user.contactPerson);
							oParam.replyTo = ns1blankspace.user.contactPerson;
							oParam.contactBusiness = ns1blankspace.objectContextData['audit.contactbusiness'];
							oParam.subject = 'Critical CAR logged - ' + ns1blankspace.data.contactBusinessText.formatXHTML();
							oParam.message = 'Auditor ' + ns1blankspace.user.contactBusinessText.formatXHTML() + ' has logged a Critical CAR for grower ' +
										 ns1blankspace.data.contactBusinessText.formatXHTML() + ' against Audit ' + ns1blankspace.objectContextData['audit.reference'] +
										 ' dated ' + ns1blankspace.objectContextData['audit.actualdate'] + '.';
						}
					}
				}
				nsFreshcare.admin.auditcar.save.process(oParam);
			}

			// Check if last Major / Critical CAR and flag user warning and/or update Membership Status
			else if (oParam.processCARStep == 2)
			{
				oParam.processCARStep = 3;
				// Check if last Major CAR to be completed and if so, ask user if they want to change Audit Status to Pending
				// v3.1.1f SUP022688 Also check for Critical CARs - "Major" means Major & Criitcal
				// v3.3.001 SUP023456 If last Critical CAR to be closed, automatically change Membership Status to IP/CP 
				// v3.4.015 SUP023981 if oCOP.seallcarsstopcerts = Y, then check ALL CArs are closed
				if ($('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id') === nsFreshcare.data.auditCAR.statusCompleted
					&& (oCOP.seallcarsstopcerts == 'Y'
						|| $('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityMajor 
						|| $('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityCritical)
					)
				{
					var bCheck = false;
					var iMajorCARCount = 0;
					var iCriticalCARCount = 0
					var iCompletedCARCount = 0;
					var iCompletedCriticalCount = 0;
					var sThisId = (oThisIssue == undefined) ? undefined : oThisIssue.id;
					var dLastCritical = Date.parse(ns1blankspace.objectContextData['audit.actualdate']);

					// Only check if status has changed
					if (oThisIssue == undefined
						|| (oThisIssue['auditissue.statustext'] != $('#ns1blankspace' + sXHTMLContext + 'Status').val()) )
					{
						bCheck = true;
						iMajorCARCount += 1;
						iCompletedCARCount += 1;
						if ($('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityCritical)
						{	
							iCriticalCARCount += 1; iCompletedCriticalCount += 1;
							dLastCritical = (Date.parse($('#ns1blankspaceAuditCARCompleted').val()) > dLastCritical)
												? Date.parse($('#ns1blankspaceAuditCARCompleted').val())
												: dLastCritical;
						}
					}

					if (bCheck) 
					{	// now go and check all other CARs
						$($.grep(ns1blankspace.objectContextData.cars, function(a) 
								{return oCOP.seallcarsstopcerts == 'Y'
										|| a['auditissue.type'] === nsFreshcare.data.auditCAR.severityMajor 
										|| a['auditissue.type'] === nsFreshcare.data.auditCAR.severityCritical}
							)).each(function(index, car) 
						{
							if (car.id != sThisId) 
							{
								iMajorCARCount += 1;
								if (car['auditissue.type'] == nsFreshcare.data.auditCAR.severityCritical)
								{
									iCriticalCARCount += 1;
								}
								if (car['auditissue.status'] === nsFreshcare.data.auditCAR.statusCompleted) 
								{
									iCompletedCARCount += 1;
									if (car['auditissue.type'] == nsFreshcare.data.auditCAR.severityCritical)
									{
										iCompletedCriticalCount += 1;
									}
									dLastCritical = (Date.parse($('#ns1blankspaceAuditCARCompleted').val()) > dLastCritical)
														? Date.parse($('#ns1blankspaceAuditCARCompleted').val())
														: dLastCritical;
								}
							}
						});

					}

					// All of the Major CARs are Completed. Ask the user if they want to update the Audit Result Status
					// v3.3.001 SUP023456 Does not apply for SCS as must close Minors as well
					if (iMajorCARCount === iCompletedCARCount && iMajorCARCount > 0 
						&& ns1blankspace.objectContextData['audit.agrisubscription.membership'] != nsFreshcare.data.membershipSCS) 
					{
						oParam.carCompletedMessage = true;
					}
					// v3.3.001 SUP023456 If Last Critical to be closed, update Audit.MembershipStatus to blank and Subscription.Status to Pending
					// Ensure Status is currently SP or about to add an SP status update row
					if (iCriticalCARCount == iCompletedCriticalCount && iCriticalCARCount > 0
						&& (ns1blankspace.objectContextData['audit.agrisubscription.status'] == nsFreshcare.data.grower.subscriptionStatusSP
							|| oParam.statusUpdateData.length > 0))
					{
						var sToStatus = nsFreshcare.data.grower.subscriptionStatusCP;
						var dStatus = (oParam.lastStatusChange) ? new Date(oParam.lastStatusChange.changedate) : undefined;
						if (ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.enddate'] == ''
							&& ns1blankspace.objectContextData['audit.agrisubscription.firstcertified'] == '')
						{	sToStatus = nsFreshcare.data.grower.subscriptionStatusIP}
						
						// v3.4.010 SUP023214 If last status added by automation, remove it if after dLastCritical
						if (oParam.lastStatusChange.modifieduser == nsFreshcare.data.automationsUser
							&& dStatus > dLastCritical)
						{
							oParam.statusUpdateData.push(
							{
								id: oParam.lastStatusChange.id,
								remove: '1'
							});
							ns1blankspace.objectContextData['audit.agrisubscription.status'] = oParam.secondLastStatusChange.tostatus;
						}

						oParam.statusUpdateData.push(
						{
							subscription: ns1blankspace.objectContextData['audit.subscription'],
							fromstatus: (oParam.statusUpdateData.length > 0 
											? nsFreshcare.data.grower.subscriptionStatusSP 
											: ns1blankspace.objectContextData['audit.agrisubscription.status']),
							tostatus: sToStatus,
							changedate: dLastCritical.toString('dd MMM yyyy'),
							changecontactbusiness: ns1blankspace.user.contactBusiness,
							changecontactperson: ns1blankspace.user.contactPerson,
							reason: 'All Critical CARs Closed. Audit dated ' + ns1blankspace.objectContextData['audit.actualdate']
						});

						// Update Audit Result Status to Conducted and Resulting Membership Status to Cert Pending
						oParam.auditData = 
						{
							id: ns1blankspace.objectContext,
							resultstatus: nsFreshcare.data.audit.resultStatusConducted,
							membershipstatus: ''
						};

						ns1blankspace.container.confirm(
						{
							title: 'Certification Status Update!',
							html: 'All of the Critical CARs are now closed. Certification Status will be updated as necessary.',
							buttons:
							[
								{
									text: 'OK',
									click: function()
									{
										$('#ns1blankspaceBootstrapDialog').modal('hide');
										nsFreshcare.admin.auditcar.save.process(oParam);
									}
								}
							]
						});
					}
					else
					{
						nsFreshcare.admin.auditcar.save.process(oParam);
					}
				}
				else
				{
					nsFreshcare.admin.auditcar.save.process(oParam);
				}
			}
	
			// Add Status History and update audit if Critical CAR logged
			else if (oParam.processCARStep == 3)
			{
				oParam.updateStatusIndex = oParam.updateStatusIndex || 0;

				if (oParam.updateStatusIndex < oParam.statusUpdateData.length)
				{
					var oData = oParam.statusUpdateData[oParam.updateStatusIndex];
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oData.remove == undefined)
								{
									var oStatus = $.grep(nsFreshcare.data.grower.subscriptionStatus, function(x) {return x.id == oData.tostatus}).shift();
									ns1blankspace.objectContextData['audit.agrisubscription.status'] = oStatus.id;
									ns1blankspace.objectContextData['audit.agrisubscription.statustext'] = oStatus.title;
								}
								oParam.updateStatusIndex += 1;
								nsFreshcare.admin.auditcar.save.process(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error updating Membership Status: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					// Now update Audit Result Status
					delete(oParam.updateStatusIndex);
					oParam.processCARStep = 4;

					if (oParam.auditData)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AUDIT_MANAGE'),
							data: oParam.auditData,
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									var sMembershipStatusText = $.map($.grep(nsFreshcare.data.grower.subscriptionStatus, function(x) {return x.id == oParam.auditData.membershipstatus}),
																	function(y) {return y.title} ).shift();
									sMembershipStatusText = sMembershipStatusText || '';
									ns1blankspace.objectContextData['audit.resultstatus'] = oParam.auditData.resultstatus;
									ns1blankspace.objectContextData['audit.resultstatustext'] = (oParam.auditData.resultstatus == nsFreshcare.data.audit.resultStatusConducted ? 'Conducted' : 'Suspended');
									ns1blankspace.objectContextData['audit.membershipstatus'] = oParam.auditData.membershipstatus;
									ns1blankspace.objectContextData['audit.membershipstatustext'] = sMembershipStatusText;
									delete(oParam.auditData);
									if ($('#ns1blankspaceDetailsResultStatus').is('*'))
									{
										$('#ns1blankspaceDetailsResultStatus')
											.val(ns1blankspace.objectContextData['audit.resultstatustext'])
											.attr('data-id', ns1blankspace.objectContextData['audit.resultstatus']);
										$('#ns1blankspaceDetailsMembershipStatus')
											.val(ns1blankspace.objectContextData['audit.membershipstatustext'])
											.attr('data-id', ns1blankspace.objectContextData['audit.membershipstatus']);
									}
									nsFreshcare.admin.auditcar.save.process(oParam);
								}
							}
						});
					}
					else
					{
						nsFreshcare.admin.auditcar.save.process(oParam);
					}
				}
			}

			// Send email to admin if Critical CAR has been raised
			else if (oParam.processCARStep == 4)
			{
				oParam.processCARStep = 5;
				if (oParam.replyTo)
				{
					oParam.refresh = true;		// Required in order to force CARs list to refresh itself
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam.onComplete = nsFreshcare.admin.auditcar.save.process;
					nsFreshcare.external.grower.save.sendEmail(oParam);
				}
				else
				{
					nsFreshcare.admin.auditcar.save.process(oParam);
				}
			}

			// CARs are completed - tell user to change result status
			else if (oParam.processCARStep == 5)
			{
				oParam.processCARStep = 10;
				if (oParam.carCompletedMessage)
				{
					ns1blankspace.container.confirm(
					{
						title: 'Attention!',
						html: "All of the Major & Critical CARs are now completed. You should change the Result Status of the Audit to Certification Recommended.",
						buttons: 
						[
							{
								text: 'OK', click: function() 
								{
									$('#ns1blankspaceBootstrapDialog').modal('hide');
									nsFreshcare.admin.auditcar.save.process(oParam);
								}
							}
						]
					});
				}
				else
				{
					nsFreshcare.admin.auditcar.save.process(oParam);
				}
			}

			// Refresh
			else if (oParam.processCARStep == 10)
			{
				var bNew = false;

				if (ns1blankspace.object != nsFreshcare.objectAudit) 
				{
					bNew = (ns1blankspace.objectContext === -1)
					ns1blankspace.objectContext = oResponse.id;	
				}
				ns1blankspace.inputDetected = false;
				delete(oParam.processCARStep);
				
				if (bNew) 
				{
					nsFreshcare.admin.auditcar.search.send('-' + ns1blankspace.objectContext)
				}
				else 
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	remove: 
	{
		send: 	function(oParam) 
		{

			var bConfirmed;
			var sIssueId;
			var sData = '';

			if (oParam) {
				if (oParam.confirmed != undefined) {bConfirmed = oParam.confirmed;}
				if (oParam.id != undefined) {sIssueId = oParam.id}
			}

			if (sIssueId) {

				if (bConfirmed === undefined) {
					bConfirmed = confirm("Are you sure you want to remove this CAR?");
				}

				if (bConfirmed) {
					
					sData += 'remove=1&id=' + sIssueId;
					$.ajax({
						type: 'POST',
						url: ns1blankspace.util.endpointURI("AUDIT_ISSUE_MANAGE"),
						data: sData,
						dataType: "JSON",
						success: function(oResponse) {nsFreshcare.admin.auditcar.remove.process(oParam, oResponse)}
					});
				}
			}
		},

		process: function (oParam, oResponse) 
		{

			if (oResponse.status == 'OK')
			{
				ns1blankspace.status.message('Removed');
				ns1blankspace.util.onComplete(oParam);
			}
			else
			{
				nsFreshcare.data.saveError.push(['Error updating Audit CAR: ' + oResponse.error.errornotes]);
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
		}
	},

	notifyFreshcare: 	function(oParam) 
	{
		// v2.0.3g SUP021387 Added contactBusiness parameter to save against grower and now uses rpc EMAIL_SEND
		// v2.0.4 SUP021408 Now uses documentEmailCARTemplate to send email (if exists, otherwise revert to original)
		
		var iAudit;
		var iContactPerson;
		var sContactPersonText;
		var sContactPersonEmail;
		var sAuditDate;
		var oCars;
		var sMessageData = '';
		var iContactBusiness;
		var sTemplateContent;

		if (oParam) 
		{
			if (oParam.audit) {iAudit = oParam.audit;}
			if (oParam.contactPerson) {iContactPerson = oParam.contactPerson;}
			if (oParam.contactBusiness) {iContactBusiness = oParam.contactBusiness;}
			if (oParam.contactPersonFirstName && oParam.contactPersonSurname) {sContactPersonText = oParam.contactPersonFirstName + ' ' + oParam.contactPersonSurname;}
			if (oParam.contactPersonEmail) {sContactPersonEmail = oParam.contactPersonEmail;}
			if (oParam.auditDate) {sAuditDate = oParam.auditDate;}
			if (oParam.cars) {oCars = oParam.cars;}
			if (oParam.templateContent != undefined) {sTemplateContent = oParam.templateContent;}
		}

		if (iAudit && sContactPersonEmail) 
		{

			ns1blankspace.status.working();
			
			if (oCars === undefined && oParam.response === undefined) 
			{
				oParam = ns1blankspace.util.setParam(oParam, "audit", iAudit);
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.auditcar.notifyFreshcare);
				nsFreshcare.admin.audit.cars.search(oParam);
			}
			else if (oCars === undefined && oParam.response) 
			{
				oParam.cars = oParam.response.data.rows;
				delete(oParam.response);
				nsFreshcare.admin.auditcar.notifyFreshcare(oParam);
			}

			else 
			{

				var oOpenCARs = $.grep(oCars, function(a) {return a['auditissue.status'] === nsFreshcare.data.auditCAR.statusToBeCompleted});

				if (oCars && oOpenCARs && oOpenCARs.length > 0) 
				{
					// v2.0.4 SUP021408 Search for document template before contining
					if (sTemplateContent === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'DOCUMENT_SEARCH';
						oSearch.addField('url,content');
						if (nsFreshcare.data.documentEmailCARTemplate === undefined)
						{
							oSearch.addFilter('url', 'EQUAL_TO', 'carTemplate-' + ns1blankspace.user.contactBusiness);
						}
						else
						{
							oSearch.addFilter('id', 'EQUAL_TO', nsFreshcare.data.documentEmailCARTemplate);
						}
						
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									oParam.templateContent = oResponse.data.rows[0].content.formatXHTML();
									if (nsFreshcare.data.documentEmailCARTemplate === undefined) {nsFreshcare.data.documentEmailCARTemplate = oResponse.data.rows[0].id}
								}
								else
								{
									oParam.templateContent = '';
								}
								nsFreshcare.admin.auditcar.notifyFreshcare(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding email template: ' + oResponse.error.errornotes);
							}
						});
					}

					// Construct Message
					// v2.0.4 SUP021408 If template exists, use it. Otherwise use old version
					// v3.1.1f SUP022688 Added CriticalCars template item
					else
					{
						var aHTML = [];
						// v2.0.4o SUP022027 Added Grower Name & Contact
						var sSubject = oParam.auditMembershipText.formatXHTML() + ' - Outstanding CARs Reminder - ' + 
										oParam.contactBusinessText.formatXHTML() + ' (' + oParam.contactPersonFirstName.formatXHTML() + ' ' + oParam.contactPersonSurname.formatXHTML() + ')';
						
						var sOpenCARsHTML = $.map(oOpenCARs, function(x)
												 	{return '<tr><td>' + x['auditissue.typetext'].formatXHTML() + '</td><td>' + x['auditissue.details'].formatXHTML() + '</td></tr>'}
												 ).join('');
						var sOpenCARsMajorHTML = $.map($.grep(oOpenCARs, function(y) {return y['auditissue.type'] === nsFreshcare.data.auditCAR.severityMajor}), function(x)
												 	{return '<tr><td>' + x['auditissue.typetext'].formatXHTML() + '</td><td>' + x['auditissue.details'].formatXHTML() + '</td></tr>'}
												 ).join('');
						var sOpenCARsCriticalHTML = $.map($.grep(oOpenCARs, function(y) {return y['auditissue.type'] === nsFreshcare.data.auditCAR.severityCritical}), function(x)
												 	{return '<tr><td>' + x['auditissue.typetext'].formatXHTML() + '</td><td>' + x['auditissue.details'].formatXHTML() + '</td></tr>'}
												 ).join('');
						var sOpenCARsMinorHTML = $.map($.grep(oOpenCARs, function(y) {return y['auditissue.type'] === nsFreshcare.data.auditCAR.severityMinor}), function(x)
												 	{return '<tr><td>' + x['auditissue.typetext'].formatXHTML() + '</td><td>' + x['auditissue.details'].formatXHTML() + '</td></tr>'}
												 ).join('');

						var sHTMLBeforeCARs = '<table style="width:800px;"><tr><td><b>Severity</b></td><td><b>Details</b></td></tr>';
						var sHTMLAfterCARs = '</table>';


						// Template not available
						if (sTemplateContent === '')
						{
							aHTML.push('<table style="width:800px;">');
							aHTML.push('<tr><td>Dear ' + sContactPersonText + '<td><tr>');
							aHTML.push('</tr><td>You have the following Corrective Action Records (CARs) outstanding:</td></tr>');
							aHTML.push('<tr><td>&nbsp;</td></tr>');

							// Add in the details of the CARs - needs to be preceded by a table element as this hasn't been added yet
							aHTML.push('<tr><td>');
							aHTML.push(sHTMLBeforeCARs);
							aHTML.push(sOpenCARsHTML);
							aHTML.push(sHTMLAfterCARs + '</td></tr>');

							aHTML.push('<tr><td>&nbsp;</td></tr>');
							aHTML.push('<tr><td>Please provide information to your auditor to close these issues and complete your audit.</td></tr>');
							aHTML.push('<tr><td>All major issues must be closed within 1 month of the date of audit which was conducted on ' + sAuditDate + '.</td></tr>');

							aHTML.push('<tr><td>&nbsp;</td></tr>');
							aHTML.push('<tr><td>Regards</td></tr>');

							aHTML.push('<tr><td>' + ns1blankspace.user.contactBusinessText + '</td></tr>');
							aHTML.push('</table>');
							
							sMessageData = 'message=' + ns1blankspace.util.fs(aHTML.join('')) +
										   '&applysystemtemplate=Y';
						}

						// Use the template
						else
						{
							// v4.0.001 MEMBER and GROWER fields now available interchangeably
							sMessageData = 'document=' + ns1blankspace.util.fs(nsFreshcare.data.documentEmailCARTemplate) +
										   '&applysystemtemplate=N' +
										   '&TEMPLATE_GROWERFIRSTNAME=' + ns1blankspace.util.fs(oParam.contactPersonFirstName.formatXHTML()) +
										   '&TEMPLATE_MEMBERFIRSTNAME=' + ns1blankspace.util.fs(oParam.contactPersonFirstName.formatXHTML()) +
										   '&TEMPLATE_GROWERSURNAME=' + ns1blankspace.util.fs(oParam.contactPersonSurname.formatXHTML()) + 
										   '&TEMPLATE_MEMBERSURNAME=' + ns1blankspace.util.fs(oParam.contactPersonSurname.formatXHTML()) + 
										   '&TEMPLATE_GROWERTRADINGNAME=' + ns1blankspace.util.fs(oParam.contactBusinessText.formatXHTML()) + 
										   '&TEMPLATE_MEMBERTRADINGNAME=' + ns1blankspace.util.fs(oParam.contactBusinessText.formatXHTML()) + 
										   '&TEMPLATE_MEMBERSHIP=' + ns1blankspace.util.fs(oParam.auditMembershipText.formatXHTML()) + 
										   '&TEMPLATE_AUDITDATE=' + ns1blankspace.util.fs(oParam.auditDate) + 
										   '&TEMPLATE_AUDITORNAME=' + ns1blankspace.util.fs(oParam.auditorPersonText.formatXHTML()) + 
										   '&TEMPLATE_OPENCARSALL=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsHTML + sHTMLAfterCARs) + 
										   '&TEMPLATE_OPENCARSMAJOR=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsMajorHTML + sHTMLAfterCARs) + 
										   '&TEMPLATE_OPENCARSCRITICAL=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsCriticalHTML + sHTMLAfterCARs) + 
										   '&TEMPLATE_OPENCARSMINOR=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsMinorHTML + sHTMLAfterCARs);

						}
						
						// v3.1.215 SUP023190 Now sends from user.contactPerson instead of user.email
						// v3.2.005 SUP023190 Needed to add ReplyTo email to make this work
						sMessageData += '&subject=' + ns1blankspace.util.fs(sSubject) +
									  '&to=' + ns1blankspace.util.fs(sContactPersonEmail) +
									  '&save=Y' + 
									  '&saveagainstcontactbusiness=' + ns1blankspace.util.fs(iContactBusiness) + 
									  '&saveagainstcontactperson=' + ns1blankspace.util.fs(iContactPerson) + 
									  '&saveagainstobject=' + ns1blankspace.util.fs(nsFreshcare.objectAudit) +
									  '&saveagainstobjectcontext=' + ns1blankspace.util.fs(ns1blankspace.objectContext) +
									  '&replyto=' + ns1blankspace.util.fs(ns1blankspace.user.contactPerson) +
									  '&fromemail=' + ns1blankspace.util.fs(nsFreshcare.user.roleID != nsFreshcare.data.roles.admin ? nsFreshcare.data.emailFromAuditor : ns1blankspace.user.contactPerson);

						$.ajax({
							type: 'POST',
							url: '/rpc/messaging/?method=MESSAGING_EMAIL_SEND',
							data: sMessageData,
							dataType: 'json',
							success: function(data) 
							{
								if (data.status === 'OK') 
								{
									ns1blankspace.status.message('Email sent to ' + sContactPersonText);
								}
								else 
								{
									ns1blankspace.status.error(data.error.errornotes);
								}
							}
						});
					}
				}
				else 
				{
					if (oCars.length === 0)
					{
						ns1blankspace.status.message('No CARs added - please add CARs or change Result Status to Certification Recommended.');
					}
					else
					{
						ns1blankspace.status.message('No open CARs to send - please finalise Audit.');
					}
				}
			}
		}
		else
		{
			if (sContactPersonEmail === undefined)
			{
				ns1blankspace.status.error('This grower has no email address!');
			}
			else
			{
				ns1blankspace.status.error('Audit record cannot be found');
			}
		}
	}
}