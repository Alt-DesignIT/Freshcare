/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
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
		var sCARDataDetails;
		var sCARDataResolution;
		var sCARDataStatusId;
		var sCARDataStatusValue;
		var sCARDataCompleted;
		var sAuditDataResultStatus;
		var sAuditDataMembership;
		var sAuditDataCOP;
		var bCanEdit = true;

		if (oParam) {
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
			sCARDataDetails = (sCARDataDetails === undefined) ? ns1blankspace.objectContextData['auditissue.details'].formatXHTML() : sCARDataDetails;
			sCARDataResolution = (sCARDataResolution === undefined) ? ns1blankspace.objectContextData['auditissue.resolution'].formatXHTML() : sCARDataResolution;
			sCARDataStatusId = (sCARDataStatusId === undefined) ? ns1blankspace.objectContextData['auditissue.status'] : sCARDataStatusId;
			sCARDataStatusValue = (sCARDataStatusValue === undefined) ? ns1blankspace.objectContextData['auditissue.statustext'].formatXHTML() : sCARDataStatusValue;
			sCARDataCompleted = (sCARDataCompleted === undefined) ? ns1blankspace.objectContextData['auditissue.datecompleted'].formatXHTML() : sCARDataCompleted;
			sAuditDataResultStatus = (sAuditDataResultStatus === undefined) ? ns1blankspace.objectContextData['auditissue.audit.resultstatus'].formatXHTML() : sAuditDataResultStatus;
		}

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

		aHTML.push('<tr class="ns1blankspaceCaption">' +
						'<td class="ns1blankspaceCaption">' +
						'Reference' +
						'</td></tr>' +
						'<tr class="ns1blankspace">' +
						'<td class="ns1blankspaceText">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'Reference" class="ns1blankspaceText">' +
						'</td></tr>');		

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
						'CAR Type' +
						'</td></tr>' +
						'<tr class="ns1blankspace">' +
						'<td class="ns1blankspaceSelect">' +
						'<input id="ns1blankspace' + sXHTMLContext + 'CARType" class="ns1blankspaceSelect"' +
							' data-method="SETUP_AUDIT_ISSUE_SINTYPE_SEARCH"' +
							' data-columns="code-space-title"' +
							' data-methodfilter="code-TEXT_IS_LIKE|title-TEXT_IS_LIKE|' +
												'membership-EQUAL_TO-' + sAuditDataMembership + '|' +
												'issuesintype.sintypecop.codeofpractice-EQUAL_TO-' + sAuditDataCOP + '"' + 
							' data-Parent="ns1blankspace' + sXHTMLContext + 'Severity"' +
							' data-parent-search-id="issuetype"' +
							' data-parent-search-text="title">' +
						'</td></tr>');			

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
		$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});


		if (sCARDataIssueId != -1) {		// ns1blankspace.object != nsFreshcare.objectAudit && ns1blankspace.objectContext != -1

			$('#ns1blankspace' + sXHTMLContext + 'Reference').val(sCARDataReference);
			$('#ns1blankspace' + sXHTMLContext + 'Severity').val(sCARDataSeverityValue);
			$('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id', sCARDataSeverityId);
			$('#ns1blankspace' + sXHTMLContext + 'CARType').val(sCARDataCARTypeValue);
			$('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-id', sCARDataCARTypeId);
			$('#ns1blankspace' + sXHTMLContext + 'Details').val(sCARDataDetails);
			$('#ns1blankspace' + sXHTMLContext + 'Resolution').val(sCARDataResolution);
			$('#ns1blankspace' + sXHTMLContext + 'Status').val(sCARDataStatusValue);
			$('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id', sCARDataStatusId);
			$('#ns1blankspace' + sXHTMLContext + 'Completed').val(sCARDataCompleted);

			// We disable all the fields (except Status) if they're not admin and the audit is Completed or CAR is Completed
			// Or if the oPAram.edit flag is false
			if (nsFreshcare.user.role.toLowerCase() != 'admin' && 
				(!bCanEdit ||
				(sAuditDataResultStatus === nsFreshcare.data.audit.resultStatusCompleted
				|| sCARDataStatusId === nsFreshcare.data.auditCAR.statusCompleted))
			   )
			{
				// v3.1.209 SUP023002 Cleaned up code - more efficient
				$('#' + sXHTMLElementID + ' input')
					.addClass('nsFreshcareDisabled')
					.attr('disabled', true);
				$('#' + sXHTMLElementID + ' textarea')
					.addClass('nsFreshcareDisabled')
					.attr('disabled', true);

				// v2.0.4j SUP021619 Make sure Status is enabled when audit.resultstatus not Completed
				if (sAuditDataResultStatus != nsFreshcare.data.audit.resultStatusCompleted)
				{
					$('#ns1blankspace' + sXHTMLContext + 'Status').attr('disabled', false)
																  .removeClass('nsFreshcareDisabled');
				}
			}

		}
		else /*if (ns1blankspace.object === nsFreshcare.objectAudit 
			|| (ns1blankspace.object != nsFreshcare.objectAudit && ns1blankspace.objectContext === -1))*/
		{

			// Set defaults
			$('#ns1blankspace' + sXHTMLContext + 'Severity').val('Major CAR');
			$('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id', nsFreshcare.data.auditCAR.severityMajor);

			//$('#ns1blankspace' + sXHTMLContext + 'CARType').val('Major CAR');
			//$('#ns1blankspace' + sXHTMLContext + 'CARType').attr('data-id', '1');

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
			var sXHTMLContext = 'CARDetail';
			var dToday = new Date();
			var dJASANZ = nsFreshcare.admin.audit.jasanzDateGet();
			var dAudit = new Date(ns1blankspace.objectContextData['audit.actualdate']);


			if (oParam) {
				if (oParam.xhtmlContext) { sXHTMLContext = oParam.xhtmlContext;}
			}
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

			// v3.1.2 SUP022693 CAR Completed must be less than the expiry date of the most recent audit
			if (ns1blankspace.okToSave 
				&& $('#ns1blankspace' + sXHTMLContext + 'Completed').val() != '' && $('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id') === nsFreshcare.data.auditCAR.statusCompleted)
			{
				// v3.1.2 SUP022912 Need to determine if current audit is the current certificate audit or prior. 
				// If not and this audit has not yet created a certificate, then calculate the predicted expiry date and use that
				if ((ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.audit'] == ns1blankspace.objectContext
						|| ns1blankspace.objectContextData['audit.membershipstatus'] == nsFreshcare.data.grower.subscriptionStatusCE)
					 && ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.enddate'] != '')
				{
					var dExpiry = new Date(ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.enddate']);
				}
				else
				{
					// 
					if (dJASANZ <= dAudit && ns1blankspace.objectContextData['audit.agrisubscription.expirymonth'] == '')
					{
						ns1blankspace.status.message('CAR cannot be completed unless the Re-Certification Audit Due date has been set on the Membership.' );
						ns1blankspace.okToSave = false;
					}
					else
					{
						var dExpiry = nsFreshcare.admin.certificate.certificateGetExpiry(
						{
							auditDate: (new Date(ns1blankspace.objectContextData['audit.actualdate'])),
							expiry: (new Date(ns1blankspace.objectContextData['audit.agrisubscription.agricertificate.enddate'])),
							expiryMonths: parseInt(ns1blankspace.objectContextData['audit.codeofpractice.certificateexpiresafter']),
							expiryAnniversary: (ns1blankspace.objectContextData['audit.agrisubscription.expirymonth'] != '' 
													? parseInt(ns1blankspace.objectContextData['audit.agrisubscription.expirymonth']) 
													: 0)
						});
					}
				}

				var dCompleted = new Date($('#ns1blankspace' + sXHTMLContext + 'Completed').val());
				if (dCompleted > dExpiry)
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.error('Date Completed cannot be later than the Membership Expiry date of ' + dExpiry.toString('dd MMM yyyy') +
												'. If the Date you are entering date is correct, you will not be able to save the CAR and it will become invalid and the Audit will be lapsed.');
				}
			}

		},

		send: 	function (oParam) 
		{

			var sXHTMLContext = 'CARDetail';
			var sData = 'id=';
			var sID;
			ns1blankspace.okToSave = true;

			if (oParam) {
				if (oParam.xhtmlContext) { sXHTMLContext = oParam.xhtmlContext;}
			}

			this.validate(oParam);
			sID = $('#ns1blankspace' + sXHTMLContext + 'Audit').attr('data-issueid');

			if (ns1blankspace.okToSave) {

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
					success: function(oResponse) {nsFreshcare.admin.auditcar.save.process(oParam, oResponse)}
				});

			}

		},

		process: function(oParam, oResponse) 
		{

			var sXHTMLContext = 'CARDetail';
			var iCARSaveStep = 1;

			if (oParam) {
				if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext;}
				if (oParam.step) {sXHTMLContext = oParam.xhtmlContext;}
			}

			if (oResponse.status == 'OK')
			{
				ns1blankspace.status.message('CAR Saved');
				if (ns1blankspace.object != nsFreshcare.objectAudit && ns1blankspace.objectContext === -1) { var bNew = true; }

				// Check if this is the last Major CAR to be completed for this Audit and if so, ask user if they want to change
				// Audit Status to Certification Pending
				// v3.1.1f SUP022688 Also check for Critical CARs
				if (($('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityMajor 
						|| $('#ns1blankspace' + sXHTMLContext + 'Severity').attr('data-id') == nsFreshcare.data.auditCAR.severityCritical)
					&& $('#ns1blankspace' + sXHTMLContext + 'Status').attr('data-id') === nsFreshcare.data.auditCAR.statusCompleted) 
				{
					var bCheck = false;
					var iMajorCARCount = 0;
					var iCompletedCARCount = 0;
					var sThisId;
					var oThisIssue = $.grep(ns1blankspace.objectContextData.cars, function(a) {return a.id === oResponse.id});

					if (oThisIssue.length === 0) {
						// We've just added a new one
						bCheck = true;
					}
					else if (oThisIssue.length === 1) {
						
						oThisIssue = oThisIssue[0];
						if (oThisIssue['auditissue.statustext'] != $('#ns1blankspace' + sXHTMLContext + 'Status').val()) {
							// User has just changed it to Completed 
							bCheck = true;
							sThisId = oThisIssue.id;
						}
					}

					if (bCheck) {
						// now go and check all other CARs
						$($.grep(ns1blankspace.objectContextData.cars, function(a) 
								{return a['auditissue.type'] === nsFreshcare.data.auditCAR.severityMajor || a['auditissue.type'] === nsFreshcare.data.auditCAR.severityCritical}
							)).each(function(j, k) 
						{
							if (k.id != sThisId) {
								iMajorCARCount++;
							}

							if (k.id != sThisId && k['auditissue.status'] === nsFreshcare.data.auditCAR.statusCompleted) {
								iCompletedCARCount++;
							}	
						});

						// Now add in the current CAR
						iMajorCARCount++;
						iCompletedCARCount++;
					}

					if (iMajorCARCount === iCompletedCARCount && iMajorCARCount > 0) {
						// All of the Major CARs are Completed. Ask the user if they want to update the Audit Result Status

						ns1blankspace.container.confirm({html: "All of the Major & Critical CARs are now completed. You should change the Result Status of the Audit to Certification Recommended."});
					}

				}

				if (ns1blankspace.object != nsFreshcare.objectAudit) {
					ns1blankspace.objectContext = oResponse.id;	
				}
				ns1blankspace.inputDetected = false;
				
				if (bNew) {
					nsFreshcare.admin.auditcar.search.send('-' + ns1blankspace.objectContext)
				}
				else {
					ns1blankspace.util.onComplete(oParam);
				}
			}
			else
			{
				nsFreshcare.data.saveError.push(['Error updating Audit CAR: ' + oResponse.error.errornotes]);
				ns1blankspace.status.error(oResponse.error.errornotes);
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
							sMessageData = 'document=' + ns1blankspace.util.fs(nsFreshcare.data.documentEmailCARTemplate) +
										   '&applysystemtemplate=N' +
										   '&TEMPLATE_GROWERFIRSTNAME=' + ns1blankspace.util.fs(oParam.contactPersonFirstName.formatXHTML()) +
										   '&TEMPLATE_GROWERSURNAME=' + ns1blankspace.util.fs(oParam.contactPersonSurname.formatXHTML()) + 
										   '&TEMPLATE_GROWERTRADINGNAME=' + ns1blankspace.util.fs(oParam.contactBusinessText.formatXHTML()) + 
										   '&TEMPLATE_MEMBERSHIP=' + ns1blankspace.util.fs(oParam.auditMembershipText.formatXHTML()) + 
										   '&TEMPLATE_AUDITDATE=' + ns1blankspace.util.fs(oParam.auditDate) + 
										   '&TEMPLATE_AUDITORNAME=' + ns1blankspace.util.fs(oParam.auditorPersonText.formatXHTML()) + 
										   '&TEMPLATE_OPENCARSALL=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsHTML + sHTMLAfterCARs) + 
										   '&TEMPLATE_OPENCARSMAJOR=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsMajorHTML + sHTMLAfterCARs) + 
										   '&TEMPLATE_OPENCARSCRITICAL=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsCriticalHTML + sHTMLAfterCARs) + 
										   '&TEMPLATE_OPENCARSMINOR=' + ns1blankspace.util.fs(sHTMLBeforeCARs + sOpenCARsMinorHTML + sHTMLAfterCARs);

						}
						
						sMessageData += '&subject=' + ns1blankspace.util.fs(sSubject) +
									  '&to=' + ns1blankspace.util.fs(sContactPersonEmail) +
									  '&save=Y' + 
									  '&saveagainstcontactbusiness=' + ns1blankspace.util.fs(iContactBusiness) + 
									  '&saveagainstcontactperson=' + ns1blankspace.util.fs(iContactPerson) + 
									  '&saveagainstobject=' + ns1blankspace.util.fs(nsFreshcare.objectAudit) +
									  '&saveagainstobjectcontext=' + ns1blankspace.util.fs(ns1blankspace.objectContext) +
									  '&fromemail=' + ns1blankspace.util.fs(ns1blankspace.user.email);

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