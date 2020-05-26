/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
*/

// v3.2.015 SUP023421 Change 'Growers' to 'Members'
// v3.3.001 SUP023474 No longer has exceptions for pre-JASANZ CB's

nsFreshcare.auditor.home = 
{
	init: 	function (oParam) 
	{ 	// v3.1.2 reset object / objectcontext values
		ns1blankspace.object = undefined; 
		ns1blankspace.objectContext = -1; 
		nsFreshcare.auditor.home.show(); 
	},

	show: 	function (oParam) 
	{

		ns1blankspace.history.view(
		{
			newDestination: 'nsFreshcare.auditor.home.show();',
			move: false
		});

		if (ns1blankspace.setupView)
		{	
			// v4.0.001 Bootstrap
			$('#ns1blankspaceViewControlSetup').attr('checked', false);
			//$('#ns1blankspaceViewControlSetup').button('refresh');
			ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.auditor.home.show()'});
		}	

		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

		//$('#ns1blankspaceViewControlViewContainer').button(
		//	{
		//		label: 'Growers'
		//	});

		var aHTML = [];
		
		aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
		
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionAuditStatus" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Audits by Status</td>' +
						'</tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionAuditsDue" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Audits Due</td>' +
						'</tr>');
		
		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionAuditsOverdue" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Audits Overdue</td>' +
						'</tr>');
		
		aHTML.push('<tr><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionAuditsUnpaid" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Unpaid Audits</td>' +
						'</tr>');
		
		aHTML.push('<tr><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionPendingGrowers" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Pending ' + nsFreshcare.data.growerText + 's</td>' +
						'</tr>');
		
		aHTML.push('<tr><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionApprovedAudits" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Approved Audits</td>' +
						'</tr>');
		
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionNotApprovedAudits" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Rejected ' + (ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval ? '/ Conditionally Approved ' : '') + 'Audits</td>' +
						'</tr>');

		aHTML.push('</table>');					
				
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		nsFreshcare.auditor.home.bind();

		var aHTML = [];
		
		aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
		aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
		aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
		//aHTML.push('<td id="ns1blankspaceHomeColumn2" class="ns1blankspaceColumn2" style="width:300px;"></td>');
		aHTML.push('</tr></table>');	
		aHTML.push('</div>');

		$('#ns1blankspaceMain').html(aHTML.join(''));

		nsFreshcare.auditor.home.showStats({sXHTMLElementID: 'ns1blankspaceHomeColumn1'});

		//$('#ns1blankspaceHomeColumn2').html(ns1blankspace.xhtml.homeNotes);

		if (ns1blankspace.xhtml.defaultElementID != '')
		{
			$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
			$('#' + ns1blankspace.xhtml.defaultElementID).click();
		};
	},

	bind: 	function (oParam)
	{
		var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;

		$('#ns1blankspaceControlActionAuditStatus').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.auditStatus.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1',
				showLegalName: bShowLegalName
				});
		});

		$('#ns1blankspaceControlActionAuditsDue').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			//ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.auditor.home.auditsDue.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1',
				showLegalName: bShowLegalName
				})
		});

		$('#ns1blankspaceControlActionAuditsOverdue').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.auditsDue.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1',
				overdue: true,
				showLegalName: bShowLegalName
				})
		});

		$('#ns1blankspaceControlActionAuditsUnpaid').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.auditStatus.show(
			{
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1',
				showFilters: false,
				showLegalName: false,
				customFilters: 
				[
					{name: 'audit.paid', comparison: 'EQUAL_TO', value1: 'N'}
				]
			});
		});

		$('#ns1blankspaceControlActionPendingGrowers').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.pendingGrowers.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1',
				showLegalName: bShowLegalName
				});
		});

		$('#ns1blankspaceControlActionXMLTest').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.xmlTest.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1',
				showLegalName: bShowLegalName
				})
		});

		// v3.1.2 SUP022543 Added review task lists
		$('#ns1blankspaceControlActionApprovedAudits').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.auditsInReview.show(
				{
					mode: 3,
					resultStatusList: nsFreshcare.data.audit.resultStatusApproved, 
					xhtmlElementID: 'ns1blankspaceHomeColumn1', label: 'Approved Audits'
				});
		});

		// v3.1.2 SUP022543 Added review task lists
		$('#ns1blankspaceControlActionNotApprovedAudits').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.auditor.home.auditsInReview.show(
				{
					mode: 3, 
					resultStatusList: nsFreshcare.data.audit.resultStatusRejected + 
						(ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval ? ',' + ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval : ''), 
					xhtmlElementID: 'ns1blankspaceHomeColumn1',
					label: 'Rejected' + (ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval ? ' or Conditionally Approved Audits' : '')
				});
		});

	},

	showStats: function(oParam, oResponse) 
	{

		var aHTML = [];
		var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
		var dToday = new Date();
		var iMaxStep = 4;

		if (oParam) {
			if (oParam.showStatsStep === undefined) {oParam.showStatsStep = 1;}
			if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
			if (oParam.html) {aHTML = oParam.html;}
		}


		// Display the labels
		if (oParam.showStatsStep === 1) 
		{
			
			aHTML.push('<table><tr><td>&nbsp;</td><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceCaption" style="width:40%;">Your ' + nsFreshcare.data.growerText + 's:</td>' +
						'<td id="ns1blankspaceHomeGrowerCount" class="ns1blankspace" style="text-align:right;width:20%;">' + ns1blankspace.xhtml.loadingSmall + '</td>' +
						'<td>&nbsp;</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceCaption">Certified ' + nsFreshcare.data.growerText + 's:</td>' +
						'<td id="ns1blankspaceHomeCertifiedCount" class="ns1blankspace" style="text-align:right;">' + ns1blankspace.xhtml.loadingSmall + '</td>' +
						'<td>&nbsp;</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceCaption ns1blankspacePending" style="cursor:pointer;">Pending ' + nsFreshcare.data.growerText + 's:</td>' +
						'<td id="ns1blankspaceHomePendingCount" class="ns1blankspace ns1blankspacePending" style="text-align:right;cursor:pointer;">' + ns1blankspace.xhtml.loadingSmall + '</td>' +
						'<td>&nbsp;</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceCaption">Suspended ' + nsFreshcare.data.growerText + 's:</td>' +
						'<td id="ns1blankspaceHomeSuspendedCount" class="ns1blankspace" style="text-align:right;">' + ns1blankspace.xhtml.loadingSmall + '</td>' +
						'<td>&nbsp;</td></tr>');

			aHTML.push('</table>');

			$('#' + sXHTMLElementID).html(aHTML.join(''));

			$('.ns1blankspacePending').click(function() {
				
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');

				nsFreshcare.auditor.home.pendingGrowers.show({
					show: false,
					xhtmlElementID: 'ns1blankspaceHomeColumn1',
					go: true
				});
			});

			oParam.elementID = 'ns1blankspaceHomeGrowerCount';
			oParam.showStatsStep = 2;
		}
		
		// 
		else if (oParam.showStatsStep == 2) 
		{
			oParam.statusFilter = {name: "contactbusiness.agrisubscription.status",
								   comparison: "IN_LIST",
								   value: nsFreshcare.data.grower.subscriptionStatusCE + ',' + nsFreshcare.data.grower.subscriptionStatusIN};
			oParam.elementID = 'ns1blankspaceHomeCertifiedCount';
			oParam.showStatsStep = 3;
		}

		// 
		else if (oParam.showStatsStep == 3) 
		{
			oParam.statusFilter = {name: "contactbusiness.agrisubscription.status",
								   comparison: "IN_LIST",
								   value: nsFreshcare.data.grower.subscriptionStatusCP + ',' + nsFreshcare.data.grower.subscriptionStatusIP};
			oParam.elementID = 'ns1blankspaceHomePendingCount';
			oParam.showStatsStep = 4;
		}
		
		else if (oParam.showStatsStep == 4) 
		{
			oParam.statusFilter = {name: "contactbusiness.agrisubscription.status",
								   comparison: "EQUAL_TO",
								   value: nsFreshcare.data.grower.subscriptionStatusSP};
			oParam.elementID = 'ns1blankspaceHomeSuspendedCount';
			oParam.showStatsStep = 5;
		}

		
		var oSearch = new AdvancedSearch();
		oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
		oSearch.addSummaryField('count(id) growers');
		oSearch.addField('tradename');
		oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
		if (oParam.statusFilter != undefined) {
			oSearch.addFilter(oParam.statusFilter.name, oParam.statusFilter.comparison, oParam.statusFilter.value);
		}
		// 2.0.4h Added for consistency
		oSearch.addFilter('contactbusiness.agrisubscription.membership', 'IN_LIST', $.map(nsFreshcare.data.memberships, function(x) {return x.id}).join(','));
		oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
		oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
		oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
		oSearch.addBracket("(");
		oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
		oSearch.addOperator("or");
		oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
		oSearch.addBracket(")");
		oSearch.rows = 1;

		oSearch.getResults(function(oResponse) 
		{

			if (oResponse.status === 'OK') 
			{
				$('#' + oParam.elementID).html(oResponse.summary.growers);
			}
			
			if (oParam.showStatsStep <= iMaxStep) 
			{
				nsFreshcare.auditor.home.showStats(oParam);
			}
		});

	},

	auditStatus: 	
	{
		search: function(oParam) 
		{
			// v3.1.2 SUP022899 Now responds to showFilters and customFilters
			var bShowFilters = ns1blankspace.util.getParam(oParam, 'showFilters', {'default': true}).value;
			var aCustomFilters = ns1blankspace.util.getParam(oParam, 'customFilters', {'default': []}).value;
			var aResultStatusFilter = [];
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'audit.actualdate'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;

			if (bShowFilters)
			{
				$('.ns1blankspaceResultStatus').each(function() {
					if ($(this).attr('data-selected') === '1') {
						aResultStatusFilter.push(this.id.split('_')[1]);
					}
				});
			}

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'audit';
			oSearch.method = 'AUDIT_SEARCH';
			oSearch.addField('audit.agrisubscription.membershiptext,audit.contactbusinesstext,audit.contactperson.firstname,audit.contactperson.surname' +
							 ',audit.scheduleddate,audit.actualdate,audit.resultstatus,audit.resultstatustext,audit.contactbusiness,audit.contactbusiness.legalname');
			oSearch.addFilter('audit.auditbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
			if (bShowFilters)
			{
				oSearch.addFilter('audit.resultstatus', 'IN_LIST', aResultStatusFilter.join(','));
				oSearch.addFilter('audit.actualdate', 'BETWEEN', $('#ns1blankspaceAudit_From').val(), $('#ns1blankspaceAudit_To').val());
			}
			else if (aCustomFilters.length > 0)
			{	
				$.each(aCustomFilters, function()
				{
					oSearch.addFilter(this.name, this.comparison, this.value1, this.value2);
				});
			}
			oSearch.sort(sSortColumn, sSortDirection);	// v3.1.2 SUP022899
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {
					nsFreshcare.auditor.home.auditStatus.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{
			// v3.1.2 SUP022899 Now also runs Unpaid Audits report using showFilters parameter
			var bShow = ns1blankspace.util.getParam(oParam, 'show', {'default': false}).value;
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceHomeColumn1'}).value;
			var sLabel = ns1blankspace.util.getParam(oParam, 'label', {'default': 'Audits by Status'}).value;
			var aResultStatusValues = ns1blankspace.util.getParam(oParam, 'resultStatusValues').value;
			var dToday = new Date();
			var bShowFilters = ns1blankspace.util.getParam(oParam, 'showFilters', {'default': true}).value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'audit.actualdate'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;


			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') == '1') 
			{
				// 3.1.2 We need to get the ResultStatusValues and restrict  list if not JASANZ
				// v3.3.001 No longer need to restrict if not JASANZ
				if (bShowFilters && aResultStatusValues == undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_AUDIT_RESULT_STATUS_SEARCH';
					oSearch.addField('title,displayorder');
					oSearch.addFilter('id', 'NOT_EQUAL_TO', nsFreshcare.data.audit.resultStatusNoResult);
					oSearch.sort('displayorder', 'asc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.resultStatusValues = oResponse.data.rows;
							nsFreshcare.auditor.home.auditStatus.show(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding Result Status Values: ' + oResponse.error.errornotes);
						}
					});
				}
				// Now display
				else
				{
					$('#' + sXHTMLElementID).attr('data-loading', '');

					aHTML.push('<table id="ns1blankspaceHomeAuditStatus"><tr>');
					aHTML.push('<td id="ns1blankspaceHomeAuditStatusResults" class="ns1blankspaceColumn1Flexible"></td>');

					if (bShowFilters)
					{
						aHTML.push('<td id="ns1blankspaceHomeAuditSearchRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
							   '<td id="ns1blankspaceHomeAuditStatusFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
					}
					aHTML.push('</tr></table>');

					$('#' + sXHTMLElementID).html(aHTML.join(''));

					if (bShowFilters)
					{
						// Search criteria bar 'handle' - allows user to get the search criteria div back into view
						// v4.0.001 Bootstrap
						aHTML = [];
						aHTML.push('<span id="ns1blankspaceHomeAuditSearchHandle" style="height:25px" title="Search Criteria"></span>');
						$('#ns1blankspaceHomeAuditSearchRibbon').html(aHTML.join(''));

						// Filtering area
						aHTML = [];
						aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

						aHTML.push('<tr><td id="ns1blankspaceHomeAuditStatusSearch" class="ns1blankspaceAction">Search</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceAuditStatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Result Status</td></tr>');
						

						// v3.1.2 SUP022543 Now uses results from call to lookup table
						$.each(aResultStatusValues, function()
						{
							aHTML.push('<tr><td id="ns1blankspaceResultStatus_' + this.id + '" ' +
												'class="ns1blankspaceResultStatus nsFreshcareSelectable' +
												(this.id == nsFreshcare.data.audit.resultStatusPending ? ' nsFreshcareSelected" data-selected="1' : '') + '"' +
												'>' + 
												this.title + '</td></tr>');
						});
						
						aHTML.push('<tr><td>&nbsp;</td></tr>');
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Scheduled Date</td></tr>');
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">From:&nbsp;</td></tr>');
						aHTML.push('<tr><td><input id="ns1blankspaceAudit_From" class="ns1blankspaceDate"></td></tr>');
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">To:&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>'); 
						aHTML.push('<tr><td><input id="ns1blankspaceAudit_To" class="ns1blankspaceDate"></td></tr>');

						aHTML.push('</table>')

						$('#ns1blankspaceHomeAuditStatusFilter').html(aHTML.join(''));

						ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});

						var dStart = nsFreshcare.util.startFinancialYear();
						$('#ns1blankspaceAudit_From').val(dStart.toString('dd MMM yyyy'));
						$('#ns1blankspaceAudit_To').val(dToday.toString('dd MMM yyyy'));

						$('#ns1blankspaceHomeAuditSearchHandle').button({
							text: false,
							icons: {
								primary: 'ui-icon-arrowthickstop-1-w'
							}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() {
							$('#ns1blankspaceHomeAuditSearchHandle').hide();
							$('#ns1blankspaceHomeAuditStatusFilter').show('slide', {direction: 'left'}, 1000);
						});
						$('#ns1blankspaceHomeAuditSearchHandle').hide();

						$('.ns1blankspaceResultStatus').click(function() {

							if ($(this).attr('data-selected') === '1') {
								
								$(this).attr('data-selected', '0');
								$(this).removeClass('nsFreshcareSelected');
							}
							else {

								$(this).attr('data-selected', '1')								
								$(this).addClass('nsFreshcareSelected');
							}
						});

						$('#ns1blankspaceHomeAuditStatusSearch').button({
							label: "Search"
						})
						.click(function() {

							ns1blankspace.okToSave = true;

							if ($('.ns1blankspaceResultStatus[data-selected="1"]').length === 0) {
								$('#ns1blankspaceAuditStatusMessage').html('Please choose at least one Result Status.');
								ns1blankspace.okToSave = false;
							}

							if (ns1blankspace.okToSave) {

								var dFrom = new Date($('#ns1blankspaceAudit_From').val());
								var dTo = new Date($('#ns1blankspaceAudit_To').val());

								if ($('#ns1blankspaceAudit_From').val() === '' || $('#ns1blankspaceAudit_To').val() === '') {
									$('#ns1blankspaceAuditStatusMessage').html('Please enter both From and To dates.');
									ns1blankspace.okToSave = false;
								}
								else if (dFrom > dTo) {
									$('#ns1blankspaceAuditStatusMessage').html('From date must be after To date.');
									ns1blankspace.okToSave = false;
								}
							}

							if (ns1blankspace.okToSave) {

								$('#ns1blankspaceHomeAuditStatusFilter').hide({duration: 200, complete: function() {

									$('#ns1blankspaceHomeAuditSearchHandle').show();
									$('#ns1blankspaceHomeAuditStatusResults').html(ns1blankspace.xhtml.loading);
									oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.home.auditStatus.show)
									nsFreshcare.auditor.home.auditStatus.search(oParam);
								}});

							}
							else {
								window.setTimeout('$("#ns1blankspaceAuditStatusMessage").fadeOut(4000)', 7000);
							}
						});
					}
					else
					{
						nsFreshcare.auditor.home.auditStatus.search(oParam);
					}
				}
			}

			if (oResponse) 
			{
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No Audits matching this criteria.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeAuditStatusResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomeAuditStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					var sGrowerColumn = (ns1blankspace.rootnamespacetext == 'nsECA' ? 'audit.contactbusiness.legalname' : 'audit.contactbusinesstext');
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">&nbsp;</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomeAuditsByStatus" class="ns1blankspace">');
					}	
					
					// v3.1.2 SUP022899 Now allows sortable header
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.membershiptext"' +
									' data-sortdirection="' + ((sSortColumn == "audit.agrisubscription.membershiptext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>');

					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sGrowerColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sGrowerColumn) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + nsFreshcare.data.growerText + '</td>');

					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactpersontext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.contactpersontext') ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.actualdate"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.actualdate') ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Actual</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.resultstatustext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.resultstatustext') ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Result Status</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.auditor.home.auditStatus.row(this));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomeAuditStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeAuditStatusResults',
						xhtmlContext: 'HomeAuditStatus',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.auditor.home.auditStatus.row,
						functionOnNewPage: nsFreshcare.auditor.home.auditStatus.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
					
					//nsFreshcare.auditor.home.auditStatus.bind();
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['audit.contactbusinesstext'] != oRow['audit.contactbusiness.legalname'])
								? oRow['audit.contactbusiness.legalname'] + '<br />(' + oRow['audit.contactbusinesstext'] + ')'
								: oRow['audit.contactbusinesstext'];
			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_membership-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_contactbusiness-' + oRow['audit.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['audit.contactbusinesstext']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_contactperson-' + oRow['audit.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['audit.contactperson.firstname'] + ' ' + oRow['audit.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_actualdate-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.actualdate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_resultstatus-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.resultstatustext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus-' + oRow.id + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');

		},

		bind: 	function(oParam) 
		{

			$('td.ns1blankspaceRowContact').click(function() {
				nsFreshcare.auditor.grower.init({showHome: false});
				nsFreshcare.auditor.grower.search.send(this.id);
			})

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{	// v3.2.024 SUP023648 Now calls correct version of audit
				ns1blankspace.rootnamespace.admin.audit.init({showHome: false});
				ns1blankspace.rootnamespace.admin.audit.search.send(this.id)
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.auditor.home.auditStatus.search(oParam);
				});
		}
	},

	auditsDue: 	
	{
		search: function(oParam) 
		{
			// Need to find audits where
			//  - current subscriptions (CE,CP,IN,IP) 
			//  - the expiry date of the subscription is within the user-specified period  + 28 days
			//	- there has not been an audit for the corresponding subscription in the x months since the most recent audit

			var sSort = '';
			var dToday = new Date();
			var bOverdue = ns1blankspace.util.getParam(oParam, 'overdue', {'default': false}).value;

			sSort = $.grep($('.ns1blankspaceSort'), function(a) {return $(a).hasClass('nsFreshcareSelected')});
			sSort = $(sSort[0]).attr('data-sort');

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'agri';
			oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
			oSearch.addField('agrisubscription.membershiptext,agrisubscription.contactbusinesstext,agrisubscription.contactperson.firstname,agrisubscription.statustext' +
							',agrisubscription.contactperson.surname,agrisubscription.agricertificate.certificatenumber,agrisubscription.contactbusiness' +
							',agrisubscription.lastauditdate,agrisubscription.contactperson,agrisubscription.agricodeofpractice.auditdueafter,agrisubscription.contactbusiness.legalname');

			if (bOverdue) 
			{
				oSearch.addCustomOption('lastAudit', ',' + 
													 dToday.toString('dd MMM yyyy') + 
													 ',' + ((nsFreshcare.data.switched) ? 'N' : 'Y') +
													 ',Y');
			}
			else 
			{
				oSearch.addCustomOption('lastAudit', $('#ns1blankspaceDuePeriod_From').val() + ',' + 
													 $('#ns1blankspaceDuePeriod_To').val() + 
													 ',' + ((nsFreshcare.data.switched) ? 'N' : 'Y') + 
													 ',Y');
			}
			oSearch.addFilter('agrisubscription.status', 'IN_LIST', nsFreshcare.data.grower.subscriptionStatusCE + ',' +
																	nsFreshcare.data.grower.subscriptionStatusCP + ',' +
																	nsFreshcare.data.grower.subscriptionStatusIN + ',' +
																	nsFreshcare.data.grower.subscriptionStatusIP + ',' +
																	nsFreshcare.data.grower.subscriptionStatusAP);

			//oSearch.addFilter("agrisubscription.agricertificate.enddate", 'BETWEEN', dExpiryFrom, dExpiryTo);
			oSearch.addFilter("agrisubscription.contactperson", 'EQUAL_TO', 'field:agrisubscription.contactbusiness.primarycontactperson', '', '', 'Y');
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			
			if (sSort != undefined) {
				oSearch.sort(sSort, 'asc');
			}

			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					nsFreshcare.auditor.home.auditsDue.show(oParam, oResponse);
				}
				else
				{
					ns1blankspaceMembership.status.error(oResponse.error.errornotes);
				}
			});
	
		},

		show: 	function(oParam, oResponse) 
		{
			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sResultsElement = 'ns1blankspaceHomeAuditsDueResults';
			var sLabel = 'Audits by Status';
			var dToday = new Date();
			var bOverdue = false;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.overdue != undefined) {bOverdue = oParam.overdue}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') == '1') 
			{

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceHomeAuditsDue"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeAuditsDueResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceHomeAuditsDueSearchRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
						   '<td id="ns1blankspaceHomeAuditsDueFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// v4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceHomeAuditsDueSearchHandle" style="height:25px" title="Search Criteria"></span>');
				$('#ns1blankspaceHomeAuditsDueSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceHomeAuditsDueSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td>&nbsp;</td></tr>');

				if (!bOverdue) {
					aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Audits Due Between</td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">From:</td></tr>');
					aHTML.push('<tr><td><input id="ns1blankspaceDuePeriod_From" class="ns1blankspaceDate"></td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">To:</td></tr>'); 
					aHTML.push('<tr><td><input id="ns1blankspaceDuePeriod_To" class="ns1blankspaceDate"></td></tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
				}

				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Sort By</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceSortGrower"' +
								' class="ns1blankspaceSort nsFreshcareSelectable nsFreshcareSelected"' +
								' data-selected="1"' +
								' data-sort="agrisubscription.contactbusinesstext">' + nsFreshcare.data.growerText + '</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceSortCertificate"' +
								' class="ns1blankspaceSort nsFreshcareSelectable"' +
								' data-sort="agrisubscription.agricertificate.certificatenumber">Certificate</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceSortDate"' +
								' class="ns1blankspaceSort nsFreshcareSelectable"' +
								' data-sort="agrisubscription.lastauditdate">Last Audit date</td></tr>');
				aHTML.push('</table>')


				$('#ns1blankspaceHomeAuditsDueFilter').html(aHTML.join(''));

				if (!bOverdue) {
					ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});

					var dStart = nsFreshcare.util.startMonth();
					var dEnd = nsFreshcare.util.endMonth();
					$('#ns1blankspaceDuePeriod_From').val(dStart.toString('dd MMM yyyy'));
					$('#ns1blankspaceDuePeriod_To').val(dEnd.toString('dd MMM yyyy'));
				}

				$('#ns1blankspaceHomeAuditsDueSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() {
					$('#ns1blankspaceHomeAuditsDueSearchHandle').hide();
					$('#ns1blankspaceHomeAuditsDueFilter').show('slide', {direction: 'left'}, 1000);
				});
				$('#ns1blankspaceHomeAuditsDueSearchHandle').hide();

				// Bind click event of Sort selection
				// Exclusive selection
				$('.ns1blankspaceSort').click(function() {

					if ($(this).attr('data-selected') != '1') {

						$('.ns1blankspaceSort').removeClass('nsFreshcareSelected');
						$('.ns1blankspaceSort').attr('data-selected', '0');
						$(this).attr('data-selected', '1');
						$(this).addClass('nsFreshcareSelected');
					}
				});

				$('#ns1blankspaceHomeAuditsDueSearch').button({
					label: "Search"
				})
				.click(function() {

					ns1blankspace.okToSave = true;

					if (!bOverdue) {
						var dFrom = new Date($('#ns1blankspaceDuePeriod_From').val());
						var dTo = new Date($('#ns1blankspaceDuePeriod_To').val());

						if ($('#ns1blankspaceDuePeriod_From').val() === '' || $('#ns1blankspaceDuePeriod_To').val() === '') {
							$('#ns1blankspaceAuditStatusMessage').html('Please enter both From and To dates.');
							ns1blankspace.okToSave = false;
						}
						else if (dFrom > dTo) {
							$('#ns1blankspaceAuditStatusMessage').html('From date must be after To date.');
							ns1blankspace.okToSave = false;
						}
					}

					if (ns1blankspace.okToSave) {
						$('#ns1blankspaceHomeAuditsDueFilter').hide({duration: 200, complete: function() {

							$('#ns1blankspaceHomeAuditsDueSearchHandle').show();
							$('#ns1blankspaceHomeAuditsDueResults').html(ns1blankspace.xhtml.loading);
							oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.home.auditsDue.show)
							nsFreshcare.auditor.home.auditsDue.search(oParam);
						}});
					}
				})

			}

			if (oResponse) {
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + ((!bOverdue) ? "Audits matching this criteria" : "Overdue Audits") + '.</td></tr>');
					aHTML.push('</table>');

					$('#' + sResultsElement).html(aHTML.join(''));
					if (bShow) {$('#' + sResultsElement).show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomeAuditsDue" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Contact</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Certificate</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Audit Date</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Membership</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Status</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	
					{
						aHTML.push(nsFreshcare.auditor.home.auditsDue.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#' + sResultsElement).show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: sResultsElement,
						xhtmlContext: 'HomeAuditsDue',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.auditor.home.auditsDue.row,
						functionOnNewPage: nsFreshcare.auditor.home.pendingGrowers.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['agrisubscription.contactbusinesstext'] != oRow['agrisubscription.contactbusiness.legalname'])
								? oRow['agrisubscription.contactbusiness.legalname'] + '<br />(' + oRow['agrisubscription.contactbusinesstext'] + ')'
								: oRow['agrisubscription.contactbusinesstext'];
			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeAuditsDue_contactbusiness-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['agrisubscription.contactbusinesstext']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditsDue_contactperson-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['agrisubscription.contactperson.firstname'] + ' ' + oRow['agrisubscription.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditsDue_certificatenumber-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.agricertificate.certificatenumber'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditsDue_actualdate-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.lastauditdate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditsDue_membership-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeAuditsDue_membershipstatus-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.statustext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeAuditsDue-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');
		},
	},

	pendingGrowers: 
	{
		search: function(oParam) 
		{

			var aMembershipFilter = [];
			var dToday = new Date();

			$('.ns1blankspaceMembership').each(function() {
				if ($(this).attr('data-selected') === '1') {
					aMembershipFilter.push(this.id.split('_')[1]);
				}
			});

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
			oSearch.addField('agrisubscription.contactperson.firstname,agrisubscription.contactperson.surname,agrisubscription.contactbusiness.tradename' +
							',agrisubscription.contactbusiness.legalname,agrisubscription.membershiptext,agrisubscription.statustext,agrisubscription.contactperson' +
							',agrisubscription.contactbusiness,agrisubscription.lastauditdate,agrisubscription.contactbusinesstext');		//,agrisubscription.lastauditdate'		

			oSearch.addFilter("agrisubscription.status", "IN_LIST", nsFreshcare.data.grower.subscriptionStatusCP + ',' + nsFreshcare.data.grower.subscriptionStatusIP);
			if (aMembershipFilter.length > 0) 
			{
				oSearch.addFilter('agrisubscription.membership', 'IN_LIST', aMembershipFilter.join(','));
			}
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.addCustomOption('lastAudit', ',,' + ((nsFreshcare.data.switched) ? 'N' : 'Y'));		// 2.0.4h SUP021631 added last audit date
			oSearch.sort('agrisubscription.contactbusiness.tradename', 'asc');
			oSearch.getResults(function(oResponse) 
			{

				if (oResponse.status === 'OK') {
					nsFreshcare.auditor.home.pendingGrowers.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse)
		{

			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Pending ' + nsFreshcare.data.growerText + 's';
			var dToday = new Date();
			var bGo = false;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.go != undefined) {bGo = oParam.go;}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') == '1') {

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceHomePendingGrowers"><tr>');
				aHTML.push('<td id="ns1blankspaceHomePendingGrowersResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceHomeGrowerSearchRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
						   '<td id="ns1blankspaceHomePendingGrowersFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// v4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceHomeGrowerSearchHandle" style="height:25px" title="Search Criteria"></span>');
				$('#ns1blankspaceHomeGrowerSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceHomePendingGrowersSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspacePendingGrowersMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Membership</td></tr>');
				$.each(nsFreshcare.data.memberships, function() {
					aHTML.push('<tr><td id="ns1blankspaceMembership_' + this.id + '" ' +
										'class="ns1blankspaceMembership nsFreshcareSelectable nsFreshcareSelected" data-selected="1">' + 
											this.title + 
								'</td></tr>');
				});
				
				aHTML.push('</table>')

				$('#ns1blankspaceHomePendingGrowersFilter').html(aHTML.join(''));

				$('#ns1blankspaceHomeGrowerSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() {
					$('#ns1blankspaceHomeGrowerSearchHandle').hide();
					$('#ns1blankspaceHomePendingGrowersFilter').show('slide', {direction: 'left'}, 1000);
				});
				$('#ns1blankspaceHomeGrowerSearchHandle').hide();

				$('.ns1blankspaceMembership').click(function() {

					if ($(this).attr('data-selected') === '1') {
						
						$(this).attr('data-selected', '0');
						$(this).removeClass('nsFreshcareSelected');
					}
					else {

						$(this).attr('data-selected', '1')								
						$(this).addClass('nsFreshcareSelected');
					}
				});

				$('#ns1blankspaceHomePendingGrowersSearch').button({
					label: "Search"
				})
				.click(function() {
					nsFreshcare.auditor.home.pendingGrowers.searchGo(oParam);
				});

				if (bGo) {nsFreshcare.auditor.home.pendingGrowers.searchGo(oParam);}

			}

			if (oResponse) {
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + nsFreshcare.data.growerText + 's matching this criteria.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomePendingGrowersResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomePendingGrowersResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomePendingGrowers" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Contact</td>');
					
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Membership</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Membership Status</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Last Audit Date</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.auditor.home.pendingGrowers.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomePendingGrowersResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomePendingGrowersResults',
						xhtmlContext: 'HomePendingGrowers',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.auditor.home.pendingGrowers.row,
						functionOnNewPage: nsFreshcare.auditor.home.pendingGrowers.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
				}
			}
		},

		searchGo: function(oParam) 
		{

			ns1blankspace.okToSave = true;

			if ($('.ns1blankspaceMembership[data-selected="1"]').length === 0) {
				$('#ns1blankspacePendingGrowersMessage').html('Please choose at least one Membership');
				ns1blankspace.okToSave = false;
			}

			if (ns1blankspace.okToSave) {

				$('#ns1blankspaceHomePendingGrowersFilter').hide({duration: 200, complete: function() {

					$('#ns1blankspaceHomeGrowerSearchHandle').show();
					$('#ns1blankspaceHomePendingGrowersResults').html(ns1blankspace.xhtml.loading);
					oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.home.pendingGrowers.show)
					nsFreshcare.auditor.home.pendingGrowers.search(oParam);
				}});

			}
			else {
				window.setTimeout('$("#ns1blankspacePendingGrowersMessage").fadeOut(4000)', 7000);
			}
		},

		row: 	function(oRow, oParam) 
		{
			// 2.0.4h SUP021631 added last audit date
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['agrisubscription.contactbusinesstext'] != oRow['agrisubscription.contactbusiness.legalname'])
								? oRow['agrisubscription.contactbusiness.legalname'] + '<br />(' + oRow['agrisubscription.contactbusinesstext'] + ')'
								: oRow['agrisubscription.contactbusinesstext'];
			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomePendingGrowers_contactbusiness-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['agrisubscription.contactbusiness.tradename']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomePendingGrowers_contactperson-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['agrisubscription.contactperson.firstname'] + ' ' + oRow['agrisubscription.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomePendingGrowers_membership-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomePendingGrowers_membershipstatus-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.statustext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomePendingGrowers_lastaudit-' + oRow['agrisubscription.contactbusiness'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.lastauditdate'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomePendingGrowers-' + oRow.id + '"' +
							' data-subscription="' + oRow.id + '"' + 
							' data-contactbusiness="' + oRow['agrisubscription.contactbusiness'] + '"' + 
							' class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');
		},

		bind: 	function(oParam) 
		{

			$('td.ns1blankspaceRowContact').click(function() {
				nsFreshcare.auditor.grower.init({showHome: false});
				nsFreshcare.auditor.grower.search.send(this.id);
			})

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{
				var sThisId = this.id;
				// 2.0.4h SUP021631 Find last audit and go to that instead of grower record
				ns1blankspace.status.working();

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('membershipstatus,subscription');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO',  $('#' + sThisId).attr('data-contactbusiness'));
				oSearch.addFilter('subscription', 'EQUAL_TO', $('#' + sThisId).attr('data-subscription'));
				oSearch.addFilter('membershipstatus', 'IN_LIST', nsFreshcare.data.grower.subscriptionStatusCP + ',' + nsFreshcare.data.grower.subscriptionStatusIP);
				oSearch.sort('actualdate', 'desc');
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{	// v3.2.024 SUP023648 Now calls correct version of audit
							ns1blankspace.rootnamespace.admin.audit.init({showHome: false, id:oResponse.data.rows[0].id});
						}
						else
						{
							nsFreshcare.auditor.grower.init({showHome: false, id: $('#' + sThisId).attr('data-contactbusiness')});
						}
					}
				});
			})
			.css('width', '15px')
			.css('height', '18px');
		}
	},

	auditsInReview:
	{
		/* v3.1.2 SUP022543 Added review task list functions 
			SUP022886 Added Audit Business and Major CARs
		*/
		search: function(oParam, oResponse) 
		{
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'audit.contactbusiness.legalname'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			var sResultStatusList = ns1blankspace.util.getParam(oParam, 'resultStatusList', {'default': nsFreshcare.data.audit.resultStatusPending}).value;
			var dCompare = ns1blankspace.util.getParam(oParam, 'compareDate').value;	// v1.0.0a SUP021883 Now uses this instead of i to determine if filter on date

			if (oParam.searchAuditsToMoveStep === undefined) {oParam.searchAuditsToMoveStep = 1}

			if (oParam.searchAuditsToMoveStep == 1)
			{
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'audit';
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.agrisubscription.membership.code,audit.contactbusinesstext,audit.contactbusiness.legalname,audit.contactperson.firstname,audit.contactperson.surname' +
								 ',audit.scheduleddate,audit.actualdate,audit.resultstatus,audit.resultstatustext,audit.contactbusiness,audit.teamleadercontactpersontext,audit.auditbusinesstext' +
								 ',audit.auditpersontext');
				oSearch.addFilter('audit.auditbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.addFilter('audit.resultstatus', 'IN_LIST', sResultStatusList);		// v1.0.1a SUP021883 changed to sResultStatus list as wasn't responding to passed params
				if (dCompare)
				{
					oSearch.addFilter('actualdate', 'LESS_THAN', dCompare);			//v1.0.2a SUP022042 was previously greater_than
					oSearch.addBracket('(');
					oSearch.addFilter('membershipstatus', 'NOT_EQUAL_TO', '-1');	//v1.0.1a SUP021883 don't include lapsed audits
					oSearch.addOperator('or');
					oSearch.addFilter('membershipstatus', 'IS_NULL'); 				//v1.0.2a SUP022042 needed extra condition to show null values
					oSearch.addBracket(')');
				}

				oSearch.sort(sSortColumn, sSortDirection);
				oSearch.rows = 50;

				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK') 
					{
						oParam.searchAuditsToMoveStep = 2;
						nsFreshcare.auditor.home.auditsInReview.search(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error('Error finding audits: ' + oResponse.error.errornotes);
					}
				});
			}

			else if (oParam.searchAuditsToMoveStep == 2)
			{
				if (oResponse.data.rows.length > 0)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AUDIT_ISSUE_SEARCH';
					oSearch.addField('audit,status,type');
					oSearch.addFilter('audit', 'IN_LIST', $.map(oResponse.data.rows, function(x) {return x.id}).join(','));
					oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.auditCAR.statusToBeCompleted);

					oSearch.sort('audit', 'asc');
					oSearch.rows = 200;

					oSearch.getResults(function(oCARResponse)
					{
						if (oCARResponse.status === 'OK')
						{
							// Work out which audits only have open minor cars
							$.each(oResponse.data.rows, function(index, row)
							{
								oResponse.data.rows[index].openMajors = $.grep(oCARResponse.data.rows, function(x) {return x.audit === row.id && x.type === nsFreshcare.data.auditCAR.severityMajor}).length;
								if (oResponse.data.rows[index].openMajors == 0)
								{
									oResponse.data.rows[index].openMinors = $.grep(oCARResponse.data.rows, function(x) {return x.audit === row.id && x.type === nsFreshcare.data.auditCAR.severityMinor}).length;
								}
								else
								{	//v1.0.2a SUP022042 was using oParam.compare instead of compareDate
									oResponse.data.rows[index].openMinors = (oParam.compareDate != undefined) 
																			? -1 
																			: $.grep(oCARResponse.data.rows, function(x) {return x.audit === row.id && x.type === nsFreshcare.data.auditCAR.severityMinor}).length;
								}
							});

							// Now remove all the rows where openMinors < 0
							// v1.0.1a Only do this if dCompare has been passed
							if (oParam.compareDate)
							{
								oResponse.data.rows = $.grep(oResponse.data.rows, function(x) {return x.openMinors >= 0});
							}
							oParam.searchAuditsToMoveStep = 3;
							nsFreshcare.auditor.home.auditsInReview.search(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error('Error finding CARs: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.searchAuditsToMoveStep = 3;
					nsFreshcare.auditor.home.auditsInReview.search(oParam, oResponse);
				}
			}

			else if (oParam.searchAuditsToMoveStep === 3)
			{
				delete(oParam.searchAuditsToMoveStep);
				nsFreshcare.auditor.home.auditsInReview.show(oParam, oResponse);
			}
		},

		show: 	function(oParam, oResponse) 
		{
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = ns1blankspace.util.getParam(oParam, 'label', {'default' : 'Audits to Move'}).value;
			var dToday = new Date();
			var aHTML = [];
			var iMode = ns1blankspace.util.getParam(oParam, 'mode', {'default': 1}).value;		// 1 = no Status col, 2 = status row by teamleader, 3 = status row by auditor
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'audit.contactbusiness.legalname'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			
			if (oParam != undefined)
			{
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
			}

			
			if (oResponse == undefined)
			{
				nsFreshcare.auditor.home.auditsInReview.search(oParam);
			} 
			else
			{
				$('#' + sXHTMLElementID).attr('data-loading', '');

				aHTML.push('<table id="ns1blankspaceHomeAuditStatus"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeAuditStatusResults" class="ns1blankspaceColumn1Flexible"' +
								' data-mode="' + iMode + '"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + sLabel + '.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeAuditStatusResults').html(aHTML.join(''));
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceHomeAuditsByStatus" class="ns1blankspace">');
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.membership.code"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.membershiptextcode') ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Code</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactbusiness.legalname"' +
									' data-sortdirection="' + ((sSortColumn == "audit.contactbusiness.legalname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Business Name</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactperson.firstname"' +
									' data-sortdirection="' + ((sSortColumn == "audit.contactperson.firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.auditpersontext"' +
									' data-sortdirection="' + ((sSortColumn == "audit.auditpersontext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Auditor</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.actualdate"' +
									' data-sortdirection="' + ((sSortColumn == "audit.actualdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Audit Date</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-sortdirection="' + ((sSortColumn == "audit.resultstatustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									' data-column="audit.resultstatustext"' +
									'>Status</td>');
					if (ns1blankspace.rootnamespacetext == 'nsFreshcare')
					{
						aHTML.push('<td class="ns1blankspaceCaption"' +
									'>Open Major CARs</td>');
					}
					aHTML.push('<td class="ns1blankspaceCaption"' +
									'>Open Minor CARs</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	
					{
						aHTML.push(nsFreshcare.auditor.home.auditsInReview.row(this, oParam));
					});
					
					aHTML.push('</table>');

					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeAuditStatusResults',
						xhtmlContext: 'HomeAuditStatus',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 50,
						functionShowRow: nsFreshcare.auditor.home.auditsInReview.row,
						functionOnNewPage: nsFreshcare.auditor.home.auditsInReview.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
					
					//nsFreshcare.auditor.home.auditsInReview.bind();
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var aHTML = [];
			var sBusinessName = (oRow['audit.contactbusiness.legalname'] != oRow['audit.contactbusinesstext'])
								? oRow['audit.contactbusiness.legalname'] + '<br />(' + oRow['audit.contactbusinesstext'] + ')'
								: oRow['audit.contactbusiness.legalname']

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_membership-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.agrisubscription.membership.code'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_legalname-' + oRow['audit.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									sBusinessName + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_contactperson-' + oRow['audit.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['audit.contactperson.firstname'] + ' ' + oRow['audit.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_auditpersontext-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.auditpersontext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_actualdate-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.actualdate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_resultstatus-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.resultstatustext'] + '</td>');

			if (ns1blankspace.rootnamespacetext == 'nsFreshcare')
			{
				aHTML.push('<td id="ns1blankspaceHomeAuditStatus_MajorCARs-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['openMajors'] + '</td>');
			}
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_MinorCARs-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['openMinors'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus-' + oRow.id + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');
		},

		bind: 	function(oParam) 
		{

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{	// v3.2.024 SUP023648 Now calls correct version of audit
				ns1blankspace.rootnamespace.admin.audit.init({showHome: false});
				ns1blankspace.rootnamespace.admin.audit.search.send(this.id)
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.auditor.home.auditsInReview.show(oParam);
				});
		}
	}
}	

nsFreshcare.auditor.home.options = 
{
	show: 		function (oElement)
	{
		var aHTML = [];
		
		aHTML.push('<table id="ns1blankspaceHomeOptions" class="ns1blankspaceSearchMedium">');
			
		aHTML.push('<tr><td id="ns1blankspaceHomeOptionsFreshcareWebsite" class="ns1blankspaceRowSelect">' +
								'<a href="http://www.freshcare.com.au" target="_blank">' +
								'Freshcare Website</a></td></tr>');
						
		aHTML.push('</table>');
			
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
			$(ns1blankspace.xhtml.container).offset({ top: $(oElement).offset().top + $(oElement).height() + 7, left: $(oElement).offset().left });
			$(ns1blankspace.xhtml.container).html(aHTML.join(''));
		}
	}

}				
	
nsFreshcare.auditor.home.report = 
{
	initData: 	function (oParam)
	{
		// v1.0.24 Custom Export format added to all reports
		var bAll = true;
		var oRoot = ns1blankspace.rootnamespace;
		var sStreetAddresses = "contactbusiness.addresslink.address.address1-" +
								"contactbusiness.addresslink.address.address2-" +
								"contactbusiness.addresslink.address.addresssuburb-" +
								"contactbusiness.addresslink.address.addressstate-" + 
								"contactbusiness.addresslink.address.addresspostcode-" +
								"contactbusiness.addresslink.address.addresscountry"; 

		if (oParam != undefined)
		{
			if (oParam.all != undefined) {bAll = oParam.all}
		}
		
				
		// 2.0.4 Added sintypetext + auditactualdate to CAR report
		// 2.0.4 SUP021142 Changed showSort to true
		// v2.0.4d SUP021492 Now filters address.status in_list 1,2
		// v3.4.017 SUP023975 Added sintype.prefix and sintype.code to CAR report
		ns1blankspace.report.reportGroups = 
		[
			{id: 1, name: nsFreshcare.data.growerText + ' Info'},
			{id: 2, name: 'Certificates'},
			{id: 3, name: 'Competencies'}
		];

		ns1blankspace.report.reports =
		[
			{	/* Members
				v3.1.206 SUP023035 Now looks at business mailing address 
				v3.4.004 Added Re-Cert Audit month fields */
				name: 'My ' + nsFreshcare.data.growersText,
				object:  nsFreshcare.objectBusiness,
				objectName: "contactbusiness",
				group: 1,
				method: "CONTACT_BUSINESS_SEARCH",
				returnParameters: 'contactbusiness' +
								 ',contactbusiness.contactperson' +
								 ',contactbusiness.agrisubscription.agriproductgroup' +
								 ',contactbusiness.agrisubscription' +
								 ',contactbusiness.addresslink' +
								 ',contactbusiness.addresslink.address' +
								 ',contactbusiness.agrisubscription.agricertificate' +
								 ',contactbusiness.agrisubscription.agriobjectscope',
				functionSearch: nsFreshcare.auditor.grower.search.send,
				windowOpen: '/#/nsFreshcare-auditor.grower/id:',
				/* 'nsFreshcare.auditor.grower.init({showHome: false});nsFreshcare.auditor.grower.search.send(this.id)'*/
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
					[	/*3.1.1a SUP022555 Added filters for relationship start / enddate */
						/*v3.1.204 SUP023020 Added scope and removed persongroup selectAttributes */
						{
							name: "contactbusiness.relationshipotherbusiness.contactbusiness",
							comparison: "EQUAL_TO",
							value1: ns1blankspace.user.contactBusiness,
							value2: ""
						},
						{
							name: "contactbusiness.relationshipotherbusiness.type",
							comparison: "EQUAL_TO",
							value1: nsFreshcare.data.relationshipAuditor,
							value2: ""
						},
						{
							name: "contactbusiness.relationshipotherbusiness.startdate",
							comparison: "LESS_THAN_OR_EQUAL_TO",
							value1: dToday.toString("dd MMM yyyy"),
							value2: ""
						},
						{
							bracketBefore: '(',
							name: "contactbusiness.relationshipotherbusiness.enddate",
							comparison: "IS_NULL",
							value1: "",
							value2: "",
							operatorAfter: 'or'
						},
						{
							name: "contactbusiness.relationshipotherbusiness.enddate",
							comparison: "GREATER_THAN_OR_EQUAL_TO",
							value1: dToday.toString("dd MMM yyyy"),
							value2: "",
							bracketAfter: ')'
						},
						{
							name: "contactbusiness.contactperson.id",
							comparison: "EQUAL_TO",
							value1: "field:contactbusiness.primarycontactperson",
							value2: "",
							applyToSubSearchJoin: "Y"
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: "contactbusiness.agrisubscription.*"},
							name: 'contactbusiness.agrisubscription.membership.status',
							comparison: 'EQUAL_TO',
							value1: nsFreshcare.data.membershipStatusActive,
							value2: '',
							value3: ''
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: sStreetAddresses},
							name: 'contactbusiness.addresslink.object',
							comparison: 'EQUAL_TO',
							value1: nsFreshcare.objectBusiness,
							value2: ''
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: sStreetAddresses},
							name: 'contactbusiness.addresslink.objectcontext',
							comparison: 'EQUAL_TO',
							value1: 'field:id',
							value2: ''
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: sStreetAddresses},
							name: 'contactbusiness.addresslink.address.status',
							comparison: 'IN_LIST',
							value1: '1,2',
							value2: ''
						}
					],
					customOptions: 
					[
						{option: 'subsearchfilterjoinall', value: 'Y'}
					]
				},
				selectableParameters: 
				{
					fields: 
					[
						{groupTitle: nsFreshcare.data.growerText + ' Business Details'},
						{name: "contactbusiness.tradename"},
						{name: "contactbusiness.legalname"},
						{name: "contactbusiness.reference"},
						{name: "contactbusiness.abn"},
						{name: "contactbusiness.mailingaddress1"},
						{name: "contactbusiness.mailingaddress2"},
						{name: "contactbusiness.mailingsuburb"},
						{name: "contactbusiness.mailingstate"},
						{name: "contactbusiness.mailingpostcode"},
						{name: "contactbusiness.mailingcountry"},
						{name: "contactbusiness.addresslink.address.address1"},
						{name: "contactbusiness.addresslink.address.address2"},
						{name: "contactbusiness.addresslink.address.addresssuburb"},
						{name: "contactbusiness.addresslink.address.addressstate"},
						{name: "contactbusiness.addresslink.address.addresspostcode"},
						{name: "contactbusiness.addresslink.address.addresscountry"},
						{groupTitle: nsFreshcare.data.growerText + ' Contact Details'},
						{name: "contactbusiness.contactperson.position"},
						{name: "contactbusiness.contactperson.titletext"},
						{name: "contactbusiness.contactperson.mobile"},
						{name: "contactbusiness.contactperson.workphone"},
						{name: "contactbusiness.contactperson.email"},
						{name: "contactbusiness.contactperson.fax"},
						{name: "contactbusiness.contactperson.firstname"},
						{name: "contactbusiness.contactperson.surname"},
						{name: "contactbusiness.contactperson.persongrouptext"},
						{groupTitle: 'Membership Details'},
						{name: "contactbusiness.agrisubscription.membershiptext"},
						{name: "contactbusiness.agrisubscription.codeofpracticetext"},
						{name: "contactbusiness.agrisubscription.statustext"},
						{name: "contactbusiness.agrisubscription.lastauditdate"},
						{name: "contactbusiness.agrisubscription.crop"},
						{name: "contactbusiness.agrisubscription.harvestmonth"},
						{name: "contactbusiness.agrisubscription.expirymonth"},
						{name: "contactbusiness.agrisubscription.expirychangeddate"},
						{name: "contactbusiness.agrisubscription.expirychangedbyusertext"},
						{name: "contactbusiness.agrisubscription.expirychangereason"},
						/*{name: "contactbusiness.agrisubscription.agriproductgroup.productgrouptext"},*/
						{name: "contactbusiness.agrisubscription.agriproductgroup.productcategorytext"},
						{name: "contactbusiness.agrisubscription.agriobjectscope.scopetext"},
						{groupTitle: 'Certificate Details'},
						{name: "contactbusiness.agrisubscription.agricertificate.certificatenumber"},
						{name: "contactbusiness.agrisubscription.agricertificate.enddate"},
					]
				}
			},
			{
				/* Audits
				v3.1.2 SUP022574 Added Audit Paid field 
				v3.3.001 SUP023611 Added HArvest month filter */
				name: "My Audits",
				object:  nsFreshcare.objectPerson,
				objectName: "audit",
				group: 1,
				method: "AUDIT_SEARCH",
				returnParameters: 'audit' +
								 ',audit.contactperson' +
								 ',audit.contactbusiness' +
								 ',audit.agrisubscription' +
								 ',audit.agrisubscription.agriproductgroup' +
								 ',audit.agrisubscription.agriscope',
				showSort: true,
				functionSearch: nsFreshcare.admin.audit.search.send,
				windowOpen: '/#/nsFreshcare-auditor.grower/id:',
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
							name: "harvestmonthcheck", 
							type: "Check", 
							mandatory: false,
							caption: 'Only show Audits where outside of Harvest Months?' +
									'<br /><span class="ns1blankspaceSubNote">(You must include at least one Membership field in the report)</span>',
							"default": false
						}
					]
				},
				fixedParameters:
				{
					filters:
					[
						{
							name: "audit.auditbusiness",
							comparison: "EQUAL_TO",
							value1: ns1blankspace.user.contactBusiness,
							value2: ""
						},
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
				customOptions:
				[
					{
						includeEval: ns1blankspace.report.customFilterValue,
						includeParameters: {field: 'harvestmonthcheck', value: true},
						option: 'customfilter',
						value: '1'
					}
				],
				selectableParameters: 
				{
					fields: 
					[
						{groupTitle: nsFreshcare.data.growerText + ' & Auditor Details'},
						{name: "audit.contactbusinesstext"},
						{name: "audit.contactperson.firstname"},
						{name: "audit.contactperson.surname"},
						{name: "audit.auditpersontext"},
						{name: 'audit.teamleadercontactpersontext'},
						{groupTitle: 'Membership Details'},
						{name: "audit.agrisubscription.membershiptext"},
						{name: "audit.codeofpracticetext"},
						{name: 'audit.agrisubscription.harvestmonth'},
						{name: "audit.agrisubscription.expirymonth"},
						{name: 'audit.agrisubscription.harvestmonth'},
						{name: 'audit.agrisubscription.crop'},
						{name: "audit.agrisubscription.agriproductgroup.productcategorytext"},
						{name: "audit.agrisubscription.agriobjectscope.scopetext"},
						{name: 'audit.agrisubscription.agricertificate.certificatenumber'},
						{name: "audit.agrisubscription.agricertificate.dateissued"},
						{groupTitle: 'Audit Details'},
						{name: "audit.reference"},
						{name: "audit.actualdate"},
						{name: "audit.typetext"},
						{name: "audit.resultstatustext"},
						{name: "audit.resultstatusdate"},
						{name: 'audit.serecertauditmonth'},
						{name: 'audit.trainingduration'},
						{name: 'audit.paid'},
						{name: "audit.createddate"},
						{name: "audit.createdusertext"},
						{name: "audit.modifieddate"},
						{name: "audit.modifiedusertext"}
					]
				}
			},
			{
				name: "My CARs",
				object:  nsFreshcare.objectAuditIssue,
				objectName: "audit",
				group: 1,
				method: "AUDIT_ISSUE_SEARCH",
				returnParameters: 'auditissue' +
								 ',auditissue.audit' +
								 ',auditissue.sintype' +
								 ',auditissue.audit.contactbusiness',
				functionSearch: nsFreshcare.admin.audit.search.send,
				showSort: true,
				idColumn: "auditissue.audit",
				windowOpen: '/#/nsFreshcare-admin.audit/id:',
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
							name: "auditissue.audit.auditbusiness",
							comparison: "EQUAL_TO",
							value1: ns1blankspace.user.contactBusiness,
							value2: ""
						}
					]
				},
				selectableParameters:
				{
					fields:
					[
						{name: "auditissue.audit.contactbusinesstext"},
						{name: "auditissue.audit.contactpersontext"},
						{name: "auditissue.audit.contactbusiness.reference"},
						{name: "auditissue.audit.actualdate"},
						{name: "auditissue.typetext"},
						{name: "auditissue.sintype.prefix"},
						{name: "auditissue.sintype.code"},
						{name: "auditissue.sintypetext"},
						{name: "auditissue.details"},
						{name: "auditissue.resolution"},
						{name: "auditissue.statustext"},
						{name: "auditissue.modifieddate"}
					]
				}
			}
		]		

		// v2.0.4 SUP021383 Replaced 'Category' with 'Certificate Scope' and 'Product Group' with 'Category'
		ns1blankspace.report.dictionary =
		[ 
			
			{name: "contactbusiness.reference", caption: 'Company ID'},
			{name: "contactbusiness.tradename", caption: "Trading Name"},
			{name: "contactbusiness.legalname", caption: "Legal Name"},
			{name: "contactbusiness.modifieddate", caption: "Date Business updated"},
			{name: "contactbusiness.contactperson.firstname", caption: "First Name"},
			{name: "contactbusiness.contactperson.surname", caption: "Surname"},
			{name: "contactbusiness.contactperson.position", caption: 'Position'},
			{name: "contactbusiness.contactperson.titletext", caption: "Title"},
			{name: "contactbusiness.contactperson.mobile", caption: "Mobile"},
			{name: "contactbusiness.contactperson.workphone", caption: "Phone"},
			{name: "contactbusiness.contactperson.email", caption: "Email"},
			{name: "contactbusiness.contactperson.fax", caption: "Fax"},
			{name: 'contactbusiness.abn', caption: 'ABN'},
			{name: "contactbusiness.mailingaddress1", caption: "Mail Address 1"},
			{name: "contactbusiness.mailingaddress2", caption: "Mail Address 2"},
			{name: "contactbusiness.mailingsuburb", caption: "Mail Suburb"},
			{name: "contactbusiness.mailingstate", caption: "Mail State"},
			{name: "contactbusiness.mailingpostcode", caption: "Mail Post Code"},
			{name: "contactbusiness.mailingcountry", caption: "Mail Country"},
			{name: "contactbusiness.contactperson.persongrouptext", caption: "Person Type"},
			{name: "contactbusiness.contactperson.createdbytext", caption: "Created By"},
			{name: "contactbusiness.contactperson.createddate", caption: "Created Date"},
			{name: "contactbusiness.contactperson.modifiedbytext", caption: "Last Modified By"},
			{name: "contactbusiness.contactperson.modifieddate", caption: "Date Person updated"},
			{name: "contactbusiness.addresslink.address.address1", caption: "Street Address 1"},
			{name: "contactbusiness.addresslink.address.address2", caption: "Street Address 2"},
			{name: "contactbusiness.addresslink.address.addresssuburb", caption: "Street Suburb"},
			{name: "contactbusiness.addresslink.address.addressstate", caption: "Street State"},
			{name: "contactbusiness.addresslink.address.addresspostcode", caption: "Street Post Code"},
			{name: "contactbusiness.addresslink.address.addresscountry", caption: "Street Country"},
			{name: "contactbusiness.agrisubscription.crop", caption: "Crops"},
			{name: "contactbusiness.agrisubscription.harvestmonth", caption: "Harvest Months"},
			{name: "contactbusiness.agrisubscription.statustext", caption: nsFreshcare.data.growerText + " Status"},
			{name: "contactbusiness.agrisubscription.codeofpracticetext", caption: "Subscription COP"},
			{name: "contactbusiness.agrisubscription.lastauditdate", caption: "Last Audit Date"},
			{name: "contactbusiness.agrisubscription.membershiptext", caption: "Membership"},
			{name: "contactbusiness.agrisubscription.agricertificate.certificatenumber", caption: "Certificate Number"},
			{name: "contactbusiness.agrisubscription.expirymonth", caption: 'Re-Cert Audit Due Month'},
			{name: "contactbusiness.agrisubscription.expirychangeddate", caption: 'Re-Cert Audit Changed'},
			{name: "contactbusiness.agrisubscription.expirychangedbyusertext", caption: 'Re-Cert Audit Changed By'},
			{name: "contactbusiness.agrisubscription.expirychangereason", caption: 'Re-Cert Audit Change Reason'},
			{name: "contactbusiness.agrisubscription.agricertificate.enddate", caption: "Certificate Expiry"},
			/*name: "contactbusiness.agrisubscription.agriproductgroup.productgrouptext", caption: "Category"},*/
			{name: "contactbusiness.agrisubscription.modifieddate", caption: "Date Subscription updated"},
			{name: "contactbusiness.agrisubscription.laststatuschangedate", caption: "Date Status updated"},
			{name: "contactbusiness.agrisubscription.agricertificate.modifieddate", caption: "Date Certificate updated"},
			{name: "contactbusiness.agrisubscription.agriproductgroup.productcategorytext", caption: "Category"},
			{name: "contactbusiness.agrisubscription.agriobjectscope.scopetext", caption: 'Certificate Scope'},
					
			{name: "audit.auditpersontext", caption: "Auditor"},
			{name: "audit.contactperson.firstname", caption: nsFreshcare.data.growerText + " First Name"},
			{name: "audit.contactperson.surname", caption: nsFreshcare.data.growerText + " Surname"},
			{name: "audit.contactbusinesstext", caption: nsFreshcare.data.growerText + " Business"},
			{name: "audit.contactbusiness.legalname", caption: nsFreshcare.data.growerText + " Legal Name"},
			{name: "audit.contactbusiness.tradename", caption: nsFreshcare.data.growerText + " Trading Name"},
			{name: "audit.contactbusiness.reference", caption: nsFreshcare.data.growerText + " Reference"},
			{name: "audit.auditbusinesstext", caption: "Certification Body"},
			{name: "audit.auditpersontext", caption: "Auditor"},
			{name: "audit.codeofpracticetext", caption: "Code of Practice"},
			{name: "audit.reference", caption: "Reference"},
			{name: "audit.typetext", caption: "Title"},
			{name: "audit.statustext", caption: "Audit Status"},
			{name: "audit.resultstatustext", caption: "Result Status"},
			{name: "audit.resultstatusdate", caption: "Date Result Achieved"},
			{name: "audit.membershipstatustext", caption: "Resulting Membership Status"},
			{name: "audit.actualdate", caption: "Audit Date"},
			{name: "audit.scheduleddate", caption: "Scheduled Date"},
			{name: "audit.description", caption: "Details"},
			{name: 'audit.paid', caption: 'Audit Paid?'},
			{name: 'audit.serecertauditmonth', caption: 'Audit\'s Re-Cert Audit Due'},
			{name: 'audit.trainingduration', caption: 'Audit Duration'},
			{name: 'audit.teamleadercontactpersontext', caption: 'Reviewer'},
			{name: "audit.agrisubscription.membershiptext", caption: "Membership"},
			{name: 'audit.agrisubscription.harvestmonth', caption: 'Harvest Months'},
			{name: "audit.agrisubscription.expirymonth", caption: 'Membership Audit Due Month'},
			{name: 'audit.agrisubscription.harvestmonth', caption: 'Harvest Months'},
			{name: 'audit.agrisubscription.crop', caption: 'Crops'},
			{name: "audit.agrisubscription.agriproductgroup.productcategorytext", caption: 'Category'},
			{name: "audit.agrisubscription.agriobjectscope.scopetext", caption: 'Scope'},
			{name: "audit.agrisubscription.agricertificate.dateissued", caption: 'Date Issued'},
			{name: "audit.createdusertext", caption: "Audit Created By"},
			{name: "audit.createddate", caption: "Date Created"},
			{name: "audit.modifieddate", caption: "Date Last Updated"},
			{name: "audit.modifiedusertext", caption: "Audit Updated by"},

			{name: "auditissue.audit.contactbusinesstext", caption: nsFreshcare.data.growerText + " Business"},
			{name: "auditissue.audit.contactpersontext", caption: nsFreshcare.data.growerText + " Contact"},
			{name: "auditissue.audit.contactbusiness.reference", caption: nsFreshcare.data.growerText + " Company ID"},
			{name: "auditissue.audit.reference", caption: "Audit Reference"},
			{name: 'auditissue.audit.actualdate', caption: 'Audit Date'},
			{name: "auditissue.reference", caption: "CAR Reference"},
			{name: "auditissue.typetext", caption: "Severity"},
			{name: "auditissue.sintype.prefix", caption: 'Element Prefix'},
			{name: "auditissue.sintype.code", caption: 'Element #'},
			{name: "auditissue.sintypetext", caption: "Element Description"},
			{name: "auditissue.details", caption: "Details"},
			{name: "auditissue.resolution", caption: "Resolution Instructions"},
			{name: "auditissue.statustext", caption: "Status"},
			{name: "auditissue.modifieddate", caption: "Last Modified Date"}

		];

		// 2.0.4g Added audit.codeofpraacticetext selectAttribute
		ns1blankspace.report.selectAttributes = 			
		[
			{
				name: "contactperson.contactbusinesstext",
				columns: "tradename",
				methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|' +
							  'contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
							  'contactbusiness.relationshipotherbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipAuditor 
			},
			{
				name: "contactperson.createdbytext",
				columns: "firstname-space-surname",
				methodFilter: 'id-EQUAL_TO-' + ns1blankspace.user.id
			},
			{
				name: "audit.contactbusinesstext",
				columns: "tradename",
				methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|' +
							  'contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
							  'contactbusiness.relationshipotherbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipAuditor 
			},
			{
				name: "audit.auditbusinesstext",
				columns: "tradename",
				methodFilter: 'id-EQUAL_TO-' + ns1blankspace.user.contactBusiness
			},
			{
				name: "audit.auditpersontext",
				columns: "firstname-space-surname",
				methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
							  "contactperson.contactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness
			},
			{
				name: "audit.teamleadercontactpersontext",
				columns: "firstname-space-surname",
				methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
							  "contactperson.contactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness
			},
			{
				name: "audit.agrisubscription.membershiptext", 
				methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive
			},
			{
				name: "audit.codeofpracticetext", 
				columns: "code-space-membershiptext",
				methodFilter: "agricodeofpractice.membership.status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive
			},
			{
				name: "contactbusiness.agrisubscription.membershiptext", 
				methodFilter: "status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive
			},
			{
				name: "contactbusiness.agrisubscription.codeofpracticetext", 
				columns: "code-space-membershiptext",
				methodFilter: "agricodeofpractice.membership.status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive
			},
			{
				name: "auditissue.audit.contactbusinesstext",
				columns: "tradename",
				methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|' +
							  'contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
							  'contactbusiness.relationshipotherbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipAuditor 
			},
			{
				name: "auditissue.audit.contactpersontext",
				columns: "firstname-space-surname",
				methodFilter: 'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
							  'contactperson.contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
							  'contactperson.contactbusiness.relationshipotherbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipAuditor 
			}

		];

		// v3.1.0e SUP022237 as calling intData instead of initUnsentCertificatesReport
		nsFreshcare.admin.report.initUnsentCertificatesReport({group: 2});
		
		if (nsFreshcare.user.auditorReportUser.indexOf(ns1blankspace.user.contactPerson) > -1) 
		{
			// v2.0.4d SUP021492 Added filter for only current memberships as was exporting SaladGap. 
			//Also added hidden address2 and now filters on address.status 1,2
			// v4.0.015 Remove applytosubsearchjoin filters and added customoption
			ns1blankspace.report.reportGroups.push({id: 4, name: 'Exports'});
			ns1blankspace.report.data.lastmodified = (new Date()).toString('dd MMM yyyy');
			ns1blankspace.report.reports.push(
				{	/* v3.1.206 SUP023035 Now exports business mailing address */
					name: nsFreshcare.data.growerText + " Export",
					object:  nsFreshcare.objectPerson,
					objectName: "contactperson",
					group: 4,
					method: "CONTACT_BUSINESS_SEARCH",
					returnParameters: 'contactbusiness' +
									 ',contactbusiness.contactperson' +
									 ',contactbusiness.agrisubscription' +
									 ',contactbusiness.addresslink' +
									 ',contactbusiness.addresslink.address' +
									 ',contactbusiness.agrisubscription.agricertificate',
					summary: 'Export recently modified  ' + nsFreshcare.data.growersText,
					showSort: false,
					functionSearch: nsFreshcare.auditor.grower.search.send,
					windowOpen: '/#/nsFreshcare-auditor.grower/id:',
					customFilters: 
					{
						fields:
						[
							{
								name: "lastmodified", 
								type: "Date", 
								caption: "Last Modified Date",
								mandatory: true,
								"default": (new Date()).toString('dd MMM yyyy')
							}
						]
					},
					customExportFormat:
					{
						name: nsFreshcare.data.growerText + ' Export'
					},
					fixedParameters:
					{
						filters:
						[
							{
								name: "contactbusiness.relationshipotherbusiness.contactbusiness",
								comparison: "EQUAL_TO",
								value1: ns1blankspace.user.contactBusiness,
								value2: ""
							},
							{
								name: "contactbusiness.relationshipotherbusiness.type",
								comparison: "EQUAL_TO",
								value1: nsFreshcare.data.relationshipAuditor,
								value2: ""
							},
							{
								name: "contactbusiness.contactperson.id",
								comparison: "EQUAL_TO",
								value1: "field:contactbusiness.primarycontactperson",
								value2: "",
								applyToSubSearchJoin: "Y"
							},
							{
								name: 'contactbusiness.agrisubscription.membership.status',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.data.membershipStatusActive,
								value2: '',
								value3: ''
							},
							{
								name: 'contactbusiness.addresslink.object',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.objectBusiness,
								value2: ''
							},
							{
								name: 'contactbusiness.addresslink.objectcontext',
								comparison: 'EQUAL_TO',
								value1: 'field:id',
								value2: ''
							},
							{
								name: 'contactbusiness.addresslink.address.status',
								comparison: 'IN_LIST',
								value1: '1,2',
								value2: ''
							},
							{
								bracketBefore: "(",
								name: "contactbusiness.contactperson.modifieddate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: "",
								operatorAfter: "or"
							},
							{
								name: "contactbusiness.modifieddate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: "",
								operatorAfter: "or"
							},
							{
								name: "contactbusiness.agrisubscription.modifieddate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: "",
								operatorAfter: "or"
							},
							{
								name: "contactbusiness.agrisubscription.laststatuschangedate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: "",
								operatorAfter: "or"
							},
							{
								name: "contactbusiness.agrisubscription.agricertificate.modifieddate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: "",
								bracketAfter: ')'
							}
						],
						customOptions: 
						[
							{option: 'subsearchfilterjoinall', value: 'Y'}
						],
						fields: 
						[
							{name: "contactbusiness.reference", exportHeader: "Reference"},
							{name: "contactbusiness.tradename", exportHeader: "Trading Name"},
							{name: "contactbusiness.legalname", exportHeader: "Legal Name"},
							{name: "contactbusiness.contactperson.firstname", exportHeader: "First Name"},
							{name: "contactbusiness.contactperson.surname", exportHeader: "Surname"},
							{name: "contactbusiness.contactperson.email", exportHeader: "eMail"},
							{name: "contactbusiness.contactperson.workphone", exportHeader: "Phone"},
							{name: "contactbusiness.contactperson.mobile", exportHeader: "Mobile"},
							{name: "contactbusiness.contactperson.fax", exportHeader: "Fax"},
							{name: "contactbusiness.agrisubscription.crop", exportHeader: "Crops"},
							{name: "contactbusiness.agrisubscription.harvestmonth", exportHeader: "Harvest Month"},
							{
								name: "contactbusiness.addresslink.address.address1", 
								exportHeader: "Street Address", 
								processValue: nsFreshcare.auditor.home.report.streetAddressCombined
							},
							{	name: "contactbusiness.addresslink.address.address2", hidden: true},
							{name: "contactbusiness.addresslink.address.addresssuburb", exportHeader: "Street Suburb"},
							{name: "contactbusiness.addresslink.address.addressstate", exportHeader: "Street State"},
							{name: "contactbusiness.addresslink.address.addresspostcode", exportHeader: "Street Post Code"},
							{name: "contactbusiness.addresslink.address.addresscountry", exportHeader: "Street Country"},
										{name: "contactbusiness.addresslink.address.id", exportHeader: "Site ID"},
										{
											name: "contactbusiness.addresslink.address.status", 
											exportHeader: "Site Type", 
											processValue: nsFreshcare.auditor.home.report.siteType
										},
							{name: "contactbusiness.mailingaddresscombined", exportHeader: "Mail Address"},
							{name: "contactbusiness.mailingsuburb", exportHeader: "Mail Suburb"},
							{name: "contactbusiness.mailingstate", exportHeader: "Mail State"},
							{name: "contactbusiness.mailingpostcode", exportHeader: "Mail Post Code"},
							{name: "contactbusiness.mailingcountry", exportHeader: "Mail Country"},
							{name: "contactbusiness.agrisubscription.membershiptext", exportHeader: "Membership"},
							{name: "contactbusiness.agrisubscription.status.reference", exportHeader: "Membership Status"},
							{name: "contactbusiness.agrisubscription.agricertificate.certificatenumber", exportHeader: "Certificate Number"},
							{
								name: "contactbusiness.modifieddate", 
								exportHeader: "Last Modified", 
								processValue: nsFreshcare.auditor.home.report.convertGrowerLastModified
							},
							{name: "contactbusiness.contactperson.modifieddate"},
							{name: "contactbusiness.modifieddate"},
							{name: "contactbusiness.agrisubscription.modifieddate"},
							{name: "contactbusiness.agrisubscription.laststatuschangedate"},
							{name: "contactbusiness.agrisubscription.agricertificate.modifieddate"}
						]
					}
				}
			);

			ns1blankspace.report.reports.push(
				{
					name: "Audit Export",
					object:  nsFreshcare.objectAudit,
					objectName: "audit",
					group: 3,
					method: "AUDIT_SEARCH",
					returnParameters: 'audit' +
									 ',audit.contactperson' +
									 ',audit.contactbusiness' +
									 ',audit.agrisubscription.certificate',
					showSort: false,
					summary: 'Export recently modified Audits ',
					functionSearch: nsFreshcare.admin.audit.search.send,
					windowOpen: '#/nsFreshcare-admin.audit/id:',
					customFilters: 
					{
						fields:
						[
							{
								name: "lastmodified", 
								type: "Date", 
								caption: "Last Modified Date",
								mandatory: true,
								"default": (new Date()).toString('dd MMM yyyy')
							}
						]
					},
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
								name: "audit.auditbusiness",
								comparison: "EQUAL_TO",
								value1: ns1blankspace.user.contactBusiness,
								value2: ""
							},
							{
								name: "audit.modifieddate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: ""
							}
						],
						fields: 
						[
							{name: "audit.agrisubscription.membershiptext", exportHeader: "Membership"},
							{name: "audit.agrisubscription.agricertificate.certificatenumber", exportHeader: "Certificate Number"},
							{name: "audit.reference", exportHeader: "Reference"},
							{name: "audit.typetext", exportHeader: "Title"},
							{name: "audit.contactbusiness.reference", exportHeader: "Bus Reference"},
							{name: "audit.contactbusiness.tradename", exportHeader: nsFreshcare.data.growerText + " Trading Name"},
							{name: "audit.contactbusiness.legalname", exportHeader: nsFreshcare.data.growerText + " Legal Name"},
							{name: "audit.contactperson.firstname", exportHeader: nsFreshcare.data.growerText + " Name"},
							{name: "audit.contactperson.surname", exportHeader: nsFreshcare.data.growerText + " Surname"},
							{name: "audit.statustext", exportHeader: "Audit Status"},
							{name: "audit.resultstatustext", exportHeader: "Result Status"},
							{name: "audit.resultstatusdate", exportHeader: "Date Result Achieved"},
							{name: "audit.membershipstatustext", exportHeader: "Resulting Membership Status"},
							{name: "audit.auditbusinesstext", exportHeader: "Certification Body"},
							{name: "audit.auditpersontext", exportHeader: "Auditor"},
							{name: "audit.createdusertext", exportHeader: "Audit Created By"},
							{name: "audit.actualdate", exportHeader: "Audit Date"},
							{name: "audit.description", exportHeader: "Details"},
							{name: "audit.modifieddate", exportHeader: "Last Modified"}
						]
					}
				}
			);

			ns1blankspace.report.reports.push(
				{
					name: "CAR Export",
					object:  nsFreshcare.objectAuditIssue,
					objectName: "audit",
					group: 3,
					method: "AUDIT_ISSUE_SEARCH",
					returnParameters: 'auditissue' +
									 ',auditissue.audit' +
									 ',auditissue.audit.contactbusiness',
					summary: 'Export recently modified CARs',
					showSort: false,
					functionSearch: nsFreshcare.admin.audit.search.send,
					idColumn: "auditissue.audit",
					windowOpen: '/#/nsFreshcare-admin.audit/id:',
					customFilters: 
					{
						fields:
						[
							{
								name: "lastmodified", 
								type: "Date", 
								caption: "Last Modified Date",
								mandatory: true,
								"default": (new Date()).toString('dd MMM yyyy')
							}
						]
					},
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
								name: "auditissue.audit.auditbusiness",
								comparison: "EQUAL_TO",
								value1: ns1blankspace.user.contactBusiness,
								value2: ""
							},
							{
								name: "auditissue.modifieddate",
								comparison: "GREATER_THAN_OR_EQUAL_TO",
								value1: ["lastmodified"],
								value2: ""
							}
						],
						fields: 
						[
							{name: "auditissue.audit.contactbusiness.reference", exportHeader: "Bus Reference"},
							{name: "auditissue.audit.reference", exportHeader: "Audit Reference"},
							{name: "auditissue.reference", exportHeader: "Reference"},
							{name: "auditissue.typetext", exportHeader: "Type"},
							{name: "auditissue.details", exportHeader: "Details"},
							{name: "auditissue.resolution", exportHeader: "Resolution"},
							{name: "auditissue.statustext", exportHeader: "Status"},
							{name: "auditissue.modifieddate", exportHeader: "Last Modified"}
						]
					}
				}
			);

			ns1blankspace.report.dictionary.push({name: "audit.agrisubscription.agricertificate.certificatenumber", caption: "Certificate Number"});
			ns1blankspace.report.dictionary.push({name: "contactbusiness.legalname", caption: "Legal Name"});
			ns1blankspace.report.dictionary.push({name: "contactbusiness.addresslink.address.addresscountry", caption: "Street Country"});
			ns1blankspace.report.dictionary.push({name: "contactbusiness.mailingaddresscombined", caption: "Mailing Address"});
			ns1blankspace.report.dictionary.push({name: "contactbusiness.agrisubscription.status.reference", caption: "Membership Status"});
			ns1blankspace.report.dictionary.push({name: "contactbusiness.addresslink.address.id", caption: "Site ID"});
			ns1blankspace.report.dictionary.push({name: "contactbusiness.addresslink.address.status", caption: "Site Type"});
		}

		// v3.4.010 SUP023940 Add CompetencyMatrix report
		nsFreshcare.admin.report.initCompetencyMatrixReport({group: 3, personText: 'Auditors'});

		// Call init function for forked app if it exists
		if (oRoot.auditor && oRoot.auditor.report && oRoot.auditor.report.initData && $.type(oRoot.auditor.report.initData) === 'function')
		{
			oRoot.auditor.report.initData();
		}

		nsFreshcare.admin.report.filterReportList(oParam);
	},

	streetAddressCombined: function(oParam)
	{
		var oRow;

		if (oParam)
		{
			if (oParam.row) {oRow = oParam.row}
		}

		return oRow['contactbusiness.addresslink.address.address1'] + ((oRow['contactbusiness.addresslink.address.address2'] != '') 
																		? ' ' + oRow['contactbusiness.addresslink.address.address2']
																		: ''); 
	},

	convertGrowerLastModified: function(oParam) 
	{

		var sValue;
		var oRow;
		var d1;
		var d2;
		var aDates = [];
		var sMaxDateColumn;


		if (oParam) {
			if (oParam.row) {oRow = oParam.row}
		}

		if (oRow['contactbusiness.modifieddate'] != '') {
			aDates.push({date: new Date(oRow['contactbusiness.modifieddate']), column: 'contactbusiness.modifieddate'});
		}

		if (oRow['contactbusiness.contactperson.modifieddate'] != '') {
			aDates.push({date: new Date(oRow['contactbusiness.contactperson.modifieddate']), column: 'contactbusiness.contactperson.modifieddate'});
		}

		if (oRow['contactbusiness.agrisubscription.modifieddate'] != '') {
			aDates.push({date: new Date(oRow['contactbusiness.agrisubscription.modifieddate']), column: 'contactbusiness.agrisubscription.modifieddate'});
		}

		if (oRow['contactbusiness.agrisubscription.laststatuschangedate'] != '') {
			aDates.push({date: new Date(oRow['contactbusiness.agrisubscription.laststatuschangedate']), column: 'contactbusiness.agrisubscription.laststatuschangedate'});
		}

		if (oRow['contactbusiness.agrisubscription.agricertificate.modifieddate'] != '') {
			aDates.push({date: new Date(oRow['contactbusiness.agrisubscription.agricertificate.modifieddate']), column: 'contactbusiness.agrisubscription.agricertificate.modifieddate'});
		}

		var aSortedDates = aDates.sort(function(a, b) {
											return a.date - b.date
										});

		//ToDo: Determine which is the most recent date - top or bottom of array
		return oRow[aSortedDates[aSortedDates.length - 1].column];

	},

	siteType: function(oParam)
	{
		var oRow;

		if (oParam)
		{
			if (oParam.row) {oRow = oParam.row}
		}
		return ((oRow['contactbusiness.addresslink.address.status'] == '1') ? 'Primary' : 'Secondary');
	}
}

nsFreshcare.auditor.setup = 
{
	exports: 	function() 
	{
		if ($.grep(ns1blankspace.setup.file["export"].formats, function(x) {return x.name === nsFreshcare.data.growerText + ' Export'}).length === 0) {
			ns1blankspace.setup.file["export"].formats.push(
					{	/* v3.1.206 SUP023035 Now exports business mailing address */
						name: nsFreshcare.data.growerText + ' Export',
						header:
						[
							{
								line: 1,
								fields:
								[
									{value: 'Business Reference,'},
									{value: 'Business Name,'},
									{value: 'Legal Name,'},
									{value: 'First Name,'},
									{value: 'Surname,'},
									{value: 'eMail,'},
									{value: 'Phone,'},
									{value: 'Mobile,'},
									{value: 'Fax,'},
									{value: 'Crop,'},
									{value: 'Harvest Month,'},
									{value: 'Street Address,'},
									{value: 'Street Suburb,'},
									{value: 'Street Post Code,'},
									{value: 'Street State,'},
									{value: 'Street Country,'},
									{value: 'Site ID,'},
									{value: 'Site Type,'},
									{value: 'Mail Address,'},
									{value: 'Mail Suburb,'},
									{value: 'Mail Post Code,'},
									{value: 'Mail State,'},
									{value: 'Mail Country,'},
									{value: 'Membership,'},
									{value: 'Invoice Cycle,'},
									{value: 'Membership Status,'},
									{value: 'Certificate Number,'},
									{value: 'Last Modified'}
								]
							}
						],

						item:
						[
							{
								fields:
								[
									{
										mapField: 'contactbusiness.reference',
										calculate: function(x) {return '"' + x['contactbusiness.reference'] + '",'}
									},
									{
										mapField: 'contactbusiness.tradename',
										calculate: function(x) {return '"' + x['contactbusiness.tradename'] + '",'}
									},
									{
										mapField: "contactbusiness.legalname",
										calculate: function(x) {return '"' + x["contactbusiness.legalname"] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.firstname',
										calculate: function(x) {return '"' + x['contactbusiness.contactperson.firstname'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.surname',
										calculate: function(x) {return '"' + x['contactbusiness.contactperson.surname'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.email',
										calculate: function(x) {return '"' + x['contactbusiness.contactperson.email'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.workphone',
										calculate: function(x) {return '"' + x['contactbusiness.contactperson.workphone'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.mobile',
										calculate: function(x) {return '"' + x['contactbusiness.contactperson.mobile'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.fax',
										calculate: function(x) {return '"' + x['contactbusiness.contactperson.fax'] + '",'}
									},
									{
										mapField: 'contactbusiness.agrisubscription.crop',
										calculate: function(x) {return '"' + x['contactbusiness.agrisubscription.crop'] + '",'}
									},
									{
										mapField: 'contactbusiness.agrisubscription.harvestmonth',
										calculate: function(x) {return '"' + x['contactbusiness.agrisubscription.harvestmonth'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.address1',
										calculate: function(x) {return '"' + nsFreshcare.auditor.home.report.streetAddressCombined({row: x}) + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addresssuburb',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addresssuburb'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addresspostcode',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addresspostcode'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addressstate',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addressstate'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addresscountry',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addresscountry'] + '",'}
									},
									{	/* v2.0.4n SUP021947 requested by AusQual */
										mapField: 'contactbusiness.addresslink.address.id',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.id'] + '",'}
									},
									{	/* v2.0.4n SUP021947 requested by AusQual */
										mapField: 'contactbusiness.addresslink.address.status',
										calculate: function(x) 
												   {
												   	 return '"' + 
												   	 	((x['contactbusiness.addresslink.address.status'] === '1') ? 'Primary' : 'Secondary') + 
												   	 	'",';
												   }
									},
									{
										mapField: 'contactbusiness.contactperson.mailingaddresscombined',
										calculate: function(x) {return '"' + x['contactbusiness.mailingaddresscombined'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.mailingsuburb',
										calculate: function(x) {return '"' + x['contactbusiness.mailingsuburb'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.mailingpostcode',
										calculate: function(x) {return '"' + x['contactbusiness.mailingpostcode'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.mailingstate',
										calculate: function(x) {return '"' + x['contactbusiness.mailingstate'] + '",'}
									},
									{
										mapField: 'contactbusiness.contactperson.mailingcountry',
										calculate: function(x) {return '"' + x['contactbusiness.mailingcountry'] + '",'}
									},
									{
										mapField: 'contactbusiness.agrisubscription.membershiptext',
										calculate: function(x) {return '"' + x['contactbusiness.agrisubscription.membershiptext'] + '",'}
									},
									{value: '"",'},
									{
										mapField: 'contactbusiness.agrisubscription.status.reference',
										calculate: function(x) {return '"' + x['contactbusiness.agrisubscription.status.reference'] + '",'}
									},
									{
										mapField: 'contactbusiness.agrisubscription.agricertificate.certificatenumber',
										calculate: function(x) {return '"' + x['contactbusiness.agrisubscription.agricertificate.certificatenumber'] + '",'}
									},
									{
										mapField: "contactbusiness.modifieddate",
										calculate: function(x) {
											var d = new Date(nsFreshcare.auditor.home.report.convertGrowerLastModified({row: x}));
											return d.toString('dd/MM/yyyy');
										}
									}
								]
							}
						],
						footer:
						[]
					}						
				);
			}
	
		if ($.grep(ns1blankspace.setup.file["export"].formats, function(x) {return x.name === nsFreshcare.data.growerText + ' Export - Sites'}).length === 0) {
			ns1blankspace.setup.file["export"].formats.push(
					{
						name: nsFreshcare.data.growerText + ' Export - Sites',
						header:
						[
							{
								line: 1,
								fields:
								[
									{value: 'Business Reference,'},
									{value: 'Business Name,'},
									{value: 'Legal Name,'},
									{value: 'First Name,'},
									{value: 'Surname,'},
									{value: 'eMail,'},
									{value: 'Phone,'},
									{value: 'Mobile,'},
									{value: 'Fax,'},
									{value: 'Crop,'},
									{value: 'Harvest Month,'},
									{value: 'Street Address,'},
									{value: 'Street Suburb,'},
									{value: 'Street Post Code,'},
									{value: 'Street State,'},
									{value: 'Street Country,'},
									{value: 'Mail Address,'},
									{value: 'Mail Suburb,'},
									{value: 'Mail Post Code,'},
									{value: 'Mail State,'},
									{value: 'Mail Country,'},
									{value: 'Membership,'},
									{value: 'Invoice Cycle,'},
									{value: 'Membership Status,'},
									{value: 'Certificate Number,'},
									{value: 'Last Modified'}
								]
							}
						],

						item:
						[
							{
								fields:
								[
									{
										mapField: 'contactbusiness.reference',
										calculate: function(x) {return '"' + x['contactbusiness.reference'] + '",'}
									},
									{
										mapField: 'contactbusiness.tradename',
										calculate: function(x) {return '"' + x['contactbusiness.tradename'] + '",'}
									},
									{
										mapField: "contactbusiness.legalname",
										calculate: function(x) {return '"' + x["contactbusiness.legalname"] + '",'}
									},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{
										mapField: 'contactbusiness.addresslink.address.address1',
										calculate: function(x) {return '"' + nsFreshcare.auditor.home.report.streetAddressCombined({row: x}) + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addresssuburb',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addresssuburb'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addresspostcode',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addresspostcode'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addressstate',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addressstate'] + '",'}
									},
									{
										mapField: 'contactbusiness.addresslink.address.addresscountry',
										calculate: function(x) {return '"' + x['contactbusiness.addresslink.address.addresscountry'] + '",'}
									},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{value: '"",'},
									{
										mapField: "contactbusiness.modifieddate",
										calculate: function(x) {
											var d = new Date(x['contactbusiness.modifieddate']);
											return d.toString('dd/MM/yyyy');
										}
									}
								]
							}
						],
						footer:
						[]
					}						
				);
			}
	}
}
