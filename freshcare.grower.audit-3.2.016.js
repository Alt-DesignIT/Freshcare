/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
*/

// v3.2.015 SUP023421 Change 'Growers' to 'Members'
 
nsFreshcare.grower.audit = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 107;	
		ns1blankspace.objectName = 'audit';
		ns1blankspace.objectParentName = 'grower';
		ns1blankspace.objectMethod = 'AUDIT';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Audits';	
		ns1blankspace.data.audit = {};

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
		ns1blankspace.app.context({all: true, inContext: false});
	},

	home: 		function (oParam, oResponse)
	{
		if (oParam === undefined) {oParam = {};}

		if (oResponse == undefined)
		{
			var aHTML = [];
			var dToday = new Date();
						
			aHTML.push('<table class="ns1blankspaceMain">');
			aHTML.push('<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'</tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AUDIT_SEARCH';		
			oSearch.addField('audit.auditpersontext,audit.agrisubscription.membershiptext,audit.paid' +
							',audit.codeofpracticetext,audit.reference,audit.resultstatustext,audit.actualdate,audit.typetext');
			oSearch.addFilter("audit.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("audit.agrisubscription.membership.status", 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);		//v1.0.24
			oSearch.sort('audit.actualdate', 'desc');
			oSearch.rows = 20;
			
			oSearch.getResults(function(oResponse) {nsFreshcare.grower.audit.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			var aCARs = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">No audits found.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="7">My Audits</td></tr>');
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Audit Date</td>' +
								'<td class="ns1blankspaceCaption">Auditor</td>' +
								'<td class="ns1blankspaceCaption">Membership</td>' +
								'<td class="ns1blankspaceCaption">COP</td>' +
								'<td class="ns1blankspaceCaption">Result Status</td>' +
								'<td class="ns1blankspaceCaption">Paid?</td>' +
								'<td class="ns1blankspaceCaption">CARs (all)</td>' +
								'<td class="ns1blankspaceCaption">CARs (Major)</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					// v3.1.2 SUP022900 Added Paid flag
					aCARs.push({audit: this.id, allCARs: 0, majorCARs: 0});

					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_date-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["audit.actualdate"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_auditor-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["audit.auditpersontext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["audit.agrisubscription.membershiptext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_cop-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["audit.codeofpracticetext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_result-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["audit.resultstatustext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_paid-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["audit.paid"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_AllCARs-' + this.id + '" class="ns1blankspaceMostLikely">' +
											ns1blankspace.xhtml.loadingSmall + '</td>' +
								'<td id="ns1blankspaceMostLikely_MajorCARs-' + this.id + '" class="ns1blankspaceMostLikely">' +
											ns1blankspace.xhtml.loadingSmall + '</td>' +
								'</tr>');
					
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));

			if (aCARs.length > 0) {
				nsFreshcare.grower.audit.carsCount({cars: aCARs});
			}
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.grower.audit.search.send(event.target.id, {source: 1});
			});
		}
	},

	carsCount: 	function(oParam, oResponse) 
	{

		var iCARsStep = 1;
		var aCARs = [];

		if (oParam) {
			if (oParam.carsStep) {iCARsStep = oParam.carsStep}
			if (oParam.cars) {aCARs = oParam.cars}
		}


		if (iCARsStep === 1) {

			var oSearch = new AdvancedSearch();
			oSearch.method = "AUDIT_ISSUE_SEARCH";
			oSearch.addField('auditissue.audit,count(auditissue.id) allcars');
			oSearch.addFilter('auditissue.audit', 'IN_LIST', $.map(aCARs, function(a) {return a.audit}).join(','));
			oSearch.rows = 40;
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {

					$.each(oResponse.data.rows, function() {

						var iCount = this.allcars;
						var iAudit = this["auditissue.audit"];

						for (var i=0; i < aCARs.length; i++) {
							
							if (aCARs[i].audit === iAudit) {
								aCARs[i].allCARs = iCount;
							}
						}

						iCount = iCount;
					});
				}

				oParam.carsStep = 2;
				oParam.cars = aCARs;
				nsFreshcare.grower.audit.carsCount(oParam, oResponse);
			});
		}
		else if (iCARsStep === 2) {

			var oSearch = new AdvancedSearch();
			oSearch.method = "AUDIT_ISSUE_SEARCH";
			oSearch.addField('auditissue.audit,count(auditissue.id) majorcars');
			oSearch.addFilter('auditissue.audit', 'IN_LIST', $.map(aCARs, function(a) {return a.audit}).join(','));
			oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.auditCAR.severityMajor);
			oSearch.rows = 40;
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {

					$.each(oResponse.data.rows, function() {

						var iCount = this.majorcars;
						var iAudit = this["auditissue.audit"];

						for (var i=0; i < aCARs.length; i++) {
							
							if (aCARs[i].audit === iAudit) {
								aCARs[i].majorCARs = iCount;
							}
						}

						iCount = iCount;
					});
				}

				oParam.carsStep = 3;
				oParam.cars = aCARs;
				nsFreshcare.grower.audit.carsCount(oParam, oResponse);
			});
		}
		else if (iCARsStep === 3) {

			var aZeroes = [];

			$.each(aCARs, function() {

				if (this.allCARs > 0) {
					$('#ns1blankspaceMostLikely_AllCARs-' + this.audit).html(this.allCARs);
				}
				else {
					aZeroes.push({audit: this.audit, allCARs: true, majorCARs: true});
				}

				if (this.majorCARs > 0){
					$('#ns1blankspaceMostLikely_MajorCARs-' + this.audit).html(this.majorCARs);
				}
				else {
					aZeroes.push({audit: this.audit, allCARs: false, majorCARs: true});
				}
			});

			$.each(aZeroes, function() {

				if (this.majorCARs) {
					$('#ns1blankspaceMostLikely_MajorCARs-' + this.audit).html('');
				}
				if (this.allCARs) {
					$('#ns1blankspaceMostLikely_AllCARs-' + this.audit).html('');									
				}
			});

		}

	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
			var aSearch = sXHTMLElementId.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[1];
			var iMinimumLength = 3;
			var iSource = ns1blankspace.data.searchSource.text;
			var sSearchText;
			var iMaximumColumns = 1;
			var iRows = 10;
			var dToday = new Date();
			var sRole = nsFreshcare.user.role;

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
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.reference,audit.title,audit.type,audit.typetext,audit.contactbusiness,audit.contactbusinesstext,audit.contactperson,audit.contactpersontext' +
								',audit.agrisubscription.membership,audit.agrisubscription.membershiptext,audit.codeofpractice,audit.codeofpracticetext' +
								',audit.status,audit.statustext,audit.resultstatus,audit.resultstatustext,audit.resultstatusdate,audit.actualdate' +
								',audit.membershipstatus,audit.membershipstatustext,audit.auditbusiness,audit.auditbusinesstext,audit.modifieddate,audit.createddate' +
								',audit.auditperson,audit.auditpersontext,audit.description,audit.createduser,audit.createdusertext,audit.modifieduser,audit.modifiedusertext' + 
								',audit.agrisubscription.id,audit.paid');

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.grower.audit.show(oParam, data)});
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
					oSearch.addField('audit.auditbusinesstext,audit.auditpersontext,audit.resultstatustext,audit.actualdate');
					
					oSearch.addBracket("(");
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						if (sSearchText != 'ALL') {
							oSearch.addFilter('audit.auditpersontext', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('audit.auditbusinesstext', 'TEXT_STARTS_WITH', sSearchText);
						}
					}
					else
					{	
							oSearch.addFilter('audit.auditpersontext', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('audit.auditbusinesstext', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					oSearch.addFilter("audit.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					oSearch.sort('audit.actualdate', 'desc');
					oSearch.rows = 20;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.grower.audit.search.process(oParam, data)});
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

			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.search.stop();
				$(ns1blankspace.xhtml.container).hide();
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
									this["audit.auditbusinesstext"] + ' ' + 
								'</td>'); 
					
					aHTML.push('<td class="ns1blankspaceSearch" id="resultstatus' +
									'-' + this.id + '">' +
									this["audit.resultstatustext"] + '</td>');
									
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
				
				$(ns1blankspace.xhtml.container).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
				
				ns1blankspace.search.stop();
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.container).html('&nbsp;');
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.grower.audit.search.send(event.target.id, {source: 1, role: sRole});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'audit.auditbusinesstext,audit.resultstatustext,audit.actualdate',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.grower.audit.search.send
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext == -1)
		{	// Not permitted in grower logon but left here just in case ns1blankspace requires it
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Details</td></tr>');
							
		}
		else
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'&nbsp;</td></tr>');
						
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {all: true, inContext: false}});
			nsFreshcare.grower.audit.summary();
		});
		
	},

	show: 		function (oParam, oResponse)
	{
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		nsFreshcare.grower.audit.layout();
		
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
			
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["audit.agrisubscription.membershiptext"] + 
						'<br />' + ns1blankspace.objectContextData["audit.actualdate"]);
			$('#ns1blankspaceControlContext').attr('data-id', ns1blankspace.objectContextData['audit.contactbusiness']);

			ns1blankspace.app.context({all: true, inContext: false});
			
			// Go back to Grower if they click on Grower name
			// v3.2.016 Was looking at roleID instead of role
			$('#ns1blankspaceControlContext').click(function(event) 
			{
				var oRoot = ns1blankspace.rootnamespace;
				oRoot[nsFreshcare.user.role.toLowerCase()].grower.init({showHome: false});
				oRoot[nsFreshcare.user.role.toLowerCase()].grower.search.send('-' + $(this).attr('data-id'));
			});

			// v2.0.4 Removed search.send from newDestination and now passes object with id to init
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.grower.audit.init({id: ' + ns1blankspace.objectContext + ')',
				move: false
				});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.grower.audit.summary()'});
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this audit.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certification Body / Auditor</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.auditbusinesstext'] + ' (' + ns1blankspace.objectContextData['audit.auditpersontext'] + ')' +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership / COP</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['audit.agrisubscription.membershiptext'] + ' - ' + ns1blankspace.objectContextData['audit.codeofpracticetext'] +
						'</td></tr>');

			if (ns1blankspace.objectContextData['audit.actualdate'] != '') {
				
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

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">CARs</td></tr>' +
						'<tr><td class="ns1blankspaceSummary" id="ns1blankspaceSummaryCARs">' +
						ns1blankspace.xhtml.loadingSmall +
						'</td></tr>');
			
			aHTML.push('<tr class="nsFreshcareAuditReport" style="display: none;">' +
							'<td class="ns1blankspaceSummaryCaption">Audit Report</td></tr>' +
						'<tr class="nsFreshcareAuditReport" style="display: none;">' +
							'<td class="ns1blankspaceSummary" id="ns1blankspaceSummaryReport">' +
						'</td></tr>');
			
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			//v3.1.2  SUP022900 Added Paid
			aHTML = [];

			if (ns1blankspace.objectContextData['audit.paid'] != 'Y')
			{
				aHTML.push('<table class="ns1blankspace">')	;
							
				aHTML.push('<tr><td class="ns1blankspaceSummary nsFreshcareImportant">Audit has not been paid.</td></tr>');

				aHTML.push('</table>');					

				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
			}

			nsFreshcare.grower.audit.cars.show({xhtmlElementID: 'ns1blankspaceSummaryCARs'});
			nsFreshcare.grower.audit.report.show({xhtmlElementID: 'ns1blankspaceSummaryReport', showClass: "nsFreshcareAuditReport"})
		}	
	},

	cars: 	
	{
		show: 	function(oParam, oResponse) 
		{

			var aHTML = [];
			var sAuditStatus = ns1blankspace.objectContextData['audit.resultstatus'];

			if (oResponse === undefined && (oParam.response === undefined)) {
				oParam.audit = ns1blankspace.objectContext;
				oParam.onComplete =  nsFreshcare.grower.audit.cars.show;
				nsFreshcare.admin.audit.cars.search(oParam);
			}
			else {

				if (oResponse === undefined) {
					oResponse = oParam.response;
				}

				aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceCARsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'</table>');					
				
				$('#ns1blankspaceMainCARs').html(aHTML.join(''));
				
				if (oResponse.data.rows.length === 0) {
					aHTML.push('None.');
				}
				else {
	
					aHTML.push('<table id="ns1blankspaceAuditCARs" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Severity</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Status</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Details</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Date Completed</td>' + 
							    '</tr>');
					
					$.each(oResponse.data.rows, function() {

						var sClass = '';

						if (this["auditissue.severity"] === nsFreshcare.data.auditCAR.severityMajor) {
							sClass = ' nsFreshcareImportant';
						}

						aHTML.push('<tr id="ns1blankspaceCARRow_' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR' + sClass + '"' + 
										' id="ns1blankspaceCARSeverity_' + this.id + 
										'">' +
											this["auditissue.typetext"] + 
										'</td>');

						/*aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR"' + 
										' id="ns1blankspaceCARType_' + this.id + 
										'">' +
											this["auditissue.sintypetext"] + 
										'</td>');*/

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR' + sClass + '"' + 
										' id="ns1blankspaceCARStatus_' + this.id + 
										'">' +
											this["auditissue.statustext"] + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR' + sClass + '"' + 
										' id="ns1blankspaceCARDetails_' + this.id + 
										'">' +
											this['auditissue.details'] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowAuditCAR' + sClass + '"' + 
										' id="ns1blankspaceCARCompleted_' + this.id + 
										'">' +
											this['auditissue.datecompleted'] + 
										'</td>');

					});

					aHTML.push('</table>');
				}

				if (oParam.xhtmlElementID) {
					$('#' + oParam.xhtmlElementID).html(aHTML.join(''));
				}

			}
		}
	},

	report: 	
	{	/* v3.1.205 SUP023030 Added Audit report to Summary tab */
		show: 	function(oParam, oResponse) 
		{
			var aHTML = [];

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CORE_ATTACHMENT_SEARCH';
			oSearch.addField('filename,type,typetext,createddate,link');
			oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addField('type', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
			oSearch.sort('createddate', 'desc');
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					if (oResponse.data.rows.length > 0)
					{
						var oReport = oResponse.data.rows[0];

						aHTML.push('<table id="ns1blankspaceAuditReport" class="ns1blankspace">');

						aHTML.push('<tr id="ns1blankspaceReportRow_' + oReport.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceAttachmentName_' + oReport.id + 
										'"><a href="' + oReport.link + '" class="ns1blankspaceNoUnloadWarn">' +
											oReport.filename.formatXHTML() + '</a>' +
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow" id="ns1blankspaceAttachmentCreated-' + oReport.id + '">' +
										'Created on ' + oReport.createddate +
									'</td>');

						aHTML.push('</tr></table>');

						$('#' + oParam.xhtmlElementID).html(aHTML.join(''));
			
						if (oParam.showClass)
						{
							$('.' + oParam.showClass).show();
						}
					}
				}
				else
				{
					ns1blankspace.status.error('Error searching for Audit Report: ' + oResponse.error.errornotes);
				}
			});
		}
	}
}