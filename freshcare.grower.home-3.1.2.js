/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.grower.home = 
{
	init: 	function (oParam) 
	{ 	// v3.1.2 reset object / objectcontext values
		ns1blankspace.object = undefined; 
		ns1blankspace.objectContext = -1;  
		nsFreshcare.grower.home.show(); 
	},

	show: 	function (oParam) 
	{

		ns1blankspace.history.view(
		{
			newDestination: 'nsFreshcare.grower.home.show();',
			move: false
		});

		if (ns1blankspace.setupView)
		{	
			$('#ns1blankspaceViewControlSetup').attr('checked', false);
			$('#ns1blankspaceViewControlSetup').button('refresh');
			ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.grower.home.show()'});
		}	

		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

		/*$('#ns1blankspaceViewControlViewContainer').button(
			{
				label: 'Growers'
			});*/

		var aHTML = [];
		
		aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
		
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlCARs" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Recent CARs</td>' +
						'</tr>');
		
		aHTML.push('<tr><td>&nbsp;</td></tr>');
		//aHTML.push(nsFreshcare.external.home.resources.buildElement());	v2.0.4 SUP021426 removed

		aHTML.push('</table>');					
				
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		nsFreshcare.grower.home.bind();
		ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlCARs';

		var aHTML = [];
		
		aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
		aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
		aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
		//aHTML.push('<td id="ns1blankspaceHomeColumn2" class="ns1blankspaceColumn2" style="width:300px;"></td>');
		aHTML.push('</tr></table>');	
		aHTML.push('</div>');

		$('#ns1blankspaceMain').html(aHTML.join(''));

		if (ns1blankspace.xhtml.defaultElementID != '')
		{
			$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
			$('#' + ns1blankspace.xhtml.defaultElementID).click();
		};
	},

	bind: 	function ()
	{
		
		$('#ns1blankspaceControlCARs').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.grower.home.recentCARs({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});

		//nsFreshcare.external.home.resources.bindElement();	v2.0.4 SUP021426 removed
		
	},

	recentCARs: function(oParam) 
	{

		var aHTML = [];
		var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
		var dToday = new Date();
		var iMaxStep = 4;
		var iMembership;
		var oThisMembership;

		if (oParam) 
		{
			if (oParam.recentCARsStep === undefined) {oParam.recentCARsStep = 1;}
			if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
			if (oParam.html) {aHTML = oParam.html;}
			if (oParam.membership) {iMembership = oParam.membership;}
		}


		if (oParam.recentCARsStep === 1) 
		{
			
			aHTML.push('<table><tr><td colspan="4">&nbsp;</td></tr>');

			aHTML.push('<td class="ns1blankspaceCaption">Membership</td>' +
						'<td class="ns1blankspaceCaption" style="text-align:right;">CARS Raised</td>' +
						'<td class="ns1blankspaceCaption" style="text-align:right;">Open CARS</td>' +
						'<td class="ns1blankspaceCaption" style="text-align:right;">Completed CARS</td>');
			aHTML.push('</tr>');

			$.each(nsFreshcare.data.growerMemberships, function() {

				if (this.status != nsFreshcare.data.grower.subscriptionStatusWD) {

					aHTML.push('<tr>');
					aHTML.push('<td id="ns1blankspaceHomeMembership_' + this['membership'] + '" class="ns1blankspace">' + 
									this['membershiptext'] + '</td>');

					aHTML.push('<td id="ns1blankspaceHomeRaisedCount_' + this['membership'] + '" class="ns1blankspace" style="text-align:right;">' + 
									ns1blankspace.xhtml.loadingSmall + '</td>');

					aHTML.push('<td id="ns1blankspaceHomeOpenCount_' + this['membership'] + '" class="ns1blankspace" style="text-align:right;">' + 
									ns1blankspace.xhtml.loadingSmall + '</td>');

					aHTML.push('<td id="ns1blankspaceHomeCompletedCount_' + this['membership'] + '" class="ns1blankspace" style="text-align:right;">' + 
									ns1blankspace.xhtml.loadingSmall + '</td>');

					aHTML.push('</tr>');
				}
			});

			// Tell user if no current memberships
			if ($.grep(nsFreshcare.data.growerMemberships, function(a) {return a.status != nsFreshcare.data.grower.subscriptionStatusWD}).length === 0)
			{
				aHTML.push('<tr><td colspan="4">No current memberships</td></tr>');
			}

			aHTML.push('</table>');

			$('#' + sXHTMLElementID).html(aHTML.join(''));

			oParam.recentCARsStep = 2;
			nsFreshcare.grower.home.recentCARs(oParam);

		}
		
		else if (oParam.recentCARsStep === 2) 
		{

			// Which Membership are we looking at?
			if (oParam.membershipIndex === undefined) 
			{
				oParam.membershipIndex = 0;
			}
			else 
			{
				oParam.membershipIndex = oParam.membershipIndex + 1;
			}

			// Make sure we've not incremented past the max # of memberships
			if (oParam.membershipIndex < nsFreshcare.data.growerMemberships.length) 
			{

				oThisMembership = nsFreshcare.data.growerMemberships[oParam.membershipIndex];

				if (oThisMembership['status'] != nsFreshcare.data.grower.subscriptionStatusWD) 
				{
					oParam.membership = oThisMembership.membership;

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AUDIT_SEARCH';
					oSearch.addField('actualdate');
					oSearch.addFilter('audit.subscription', 'EQUAL_TO', oThisMembership.id);
					oSearch.addFilter('audit.status', 'EQUAL_TO', nsFreshcare.data.audit.statusCompleted);
					oSearch.addFilter('audit.resultstatus', 'NOT_EQUAL_TO', nsFreshcare.data.audit.resultStatusNoResult);
					oSearch.rows = 1;
					oSearch.sort ('audit.actualdate', 'desc');
					oSearch.getResults(function(oResponse) 
					{

						if (oResponse.status === 'OK') 
						{

							if (oResponse.data.rows.length > 0) 
							{
								oParam = ns1blankspace.util.setParam(oParam, 'audit', oResponse.data.rows[0].id);
							}
							else 
							{
								oParam = ns1blankspace.util.setParam(oParam, 'audit', 'none');
							}

							oParam = ns1blankspace.util.setParam(oParam, 'recentCARsStep', 3);
							nsFreshcare.grower.home.recentCARs(oParam);
						}

					});
				}
				// 2.0.2 Wasn't recalling function if there was a withdrawn membership so it would stop.
				else
				{
					oParam = ns1blankspace.util.setParam(oParam, 'recentCARsStep', 2);
					nsFreshcare.grower.home.recentCARs(oParam);

				}
			}
			else 
			{
				oParam.recentCARsStep = 4;		// We're done - no more memberships to search
				nsFreshcare.grower.home.recentCARs(oParam);
			}
		}

		else if (oParam.recentCARsStep === 3) 
		{

			if (oParam.audit && oParam.audit != "none") 		// v1.0.23a Was trying to search for auditid = none
			{

				var iMembership = oParam.membership;

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_ISSUE_SEARCH';
				oSearch.addField('status');
				oSearch.addFilter('auditissue.audit', 'EQUAL_TO', oParam.audit);
				oSearch.addFilter('auditissue.status', 'IN_LIST', nsFreshcare.data.auditCAR.statusCompleted + ',' + nsFreshcare.data.auditCAR.statusToBeCompleted);
				oSearch.sort ('auditissue.status', 'asc');
				oSearch.getResults(function(oResponse) 
				{

					var iTotal = 0;
					var iOpen = 0;
					var iClosed = 0;

					if (oResponse.status === 'OK') 
					{

						iTotal = oResponse.data.rows.length;

						$.each(oResponse.data.rows, function() 
						{

							if (this.status === nsFreshcare.data.auditCAR.statusCompleted) 
							{
								iClosed++;
							}
							else if (this.status === nsFreshcare.data.auditCAR.statusToBeCompleted) 
							{
								iOpen++;
							}
						});
					}

					if (iTotal > 0) 
					{

						$('#ns1blankspaceHomeRaisedCount_' + iMembership).html(iTotal);
						if (iOpen > 0) 
						{
							$('#ns1blankspaceHomeOpenCount_' + iMembership).html(iOpen);
						}
						else 
						{
							$('#ns1blankspaceHomeOpenCount_' + iMembership).html('None');
						}
						if (iClosed > 0) 
						{
							$('#ns1blankspaceHomeCompletedCount_' + iMembership).html(iClosed);
						}
						else 
						{
							$('#ns1blankspaceHomeCompletedCount_' + iMembership).html('None');
						}
					}
					else 
					{
						$('#ns1blankspaceHomeRaisedCount_' + iMembership).html('None');
						$('#ns1blankspaceHomeOpenCount_' + iMembership).html('N/A');
						$('#ns1blankspaceHomeCompletedCount_' + iMembership).html('N/A');
					}

					oParam.recentCARsStep = 2;
					oParam.audit = undefined;
					oParam.membership = undefined;
					nsFreshcare.grower.home.recentCARs(oParam);
				});
			}				// oParam.audit passed
			else 
			{
				$('#ns1blankspaceHomeRaisedCount_' + iMembership).html('None');
				$('#ns1blankspaceHomeOpenCount_' + iMembership).html('N/A');
				$('#ns1blankspaceHomeCompletedCount_' + iMembership).html('N/A');
			}
		}	//CARsStep == 3
	},

	auditCARs: 	
	{

		search: function(oParam) 
		{

			var aStatusFilter = [];
			var aMembershipFilter = [];
			var aTypeFilter = [];

			$('.ns1blankspaceStatus').each(function() {
				if ($(this).attr('data-selected') === '1') {
					aStatusFilter.push(this.id.split('_')[1]);
				}
			});

			$('.ns1blankspaceSeverity').each(function() {
				if ($(this).attr('data-selected') === '1') {
					aTypeFilter.push(this.id.split('_')[1]);
				}
			});

			$('.ns1blankspaceMembership').each(function() {
				if ($(this).attr('data-selected') === '1') {
					aMembershipFilter.push(this.id.split('_')[1]);
				}
			});

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'audit';
			oSearch.method = 'AUDIT_ISSUE_SEARCH';
			oSearch.addField('auditissue.audit.agrisubscription.membershiptext,auditissue.audit.codeofpracticetext,auditissue.audit.typetext' +
							 ',auditissue.audit.actualdate,auditissue.audit.resultstatustext,auditissue.typetext,auditissue.details,auditissue.audit' +
							 ',auditissue.statustext,auditissue.datecompleted,auditissue.audit.auditbusinesstext,auditissue.audit.auditpersontext');
			oSearch.addFilter('auditissue.audit.contactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
			oSearch.addFilter('auditissue.status', 'IN_LIST', aStatusFilter.join(','));
			oSearch.addFilter('auditissue.type', 'IN_LIST', aTypeFilter.join(','));
			oSearch.addFilter('auditissue.audit.agrisubscription.membership', 'IN_LIST', aMembershipFilter.join(','));
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {
					nsFreshcare.grower.home.auditCARs.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{

			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Audit Issues';
			var dToday = new Date();
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).html() === ns1blankspace.xhtml.loading) {

				aHTML.push('<table id="ns1blankspaceHomeAuditCARs"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeAuditCARsResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceHomeAuditSearchRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
						   '<td id="ns1blankspaceHomeAuditCARsFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceHomeAuditSearchHandle" style="height:30px">Search Criteria</span>');
				$('#ns1blankspaceHomeAuditSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceHomeAuditCARsSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceAuditCARsMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">CAR Status</td></tr>');
				$.each(nsFreshcare.data.auditCAR.carStatus, function() {

					aHTML.push('<tr><td id="ns1blankspaceStatus_' + this.id + '" ' +
										'class="ns1blankspaceStatus nsFreshcareSelectable">' + this.title + '</td></tr>');
				});
				
				aHTML.push('<tr><td>&nbsp;</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">CAR Severity</td></tr>');
				$.each(nsFreshcare.data.auditCAR.carSeverity, function() {

					aHTML.push('<tr><td id="ns1blankspaceSeverity_' + this.id + '" ' +
										'class="ns1blankspaceSeverity nsFreshcareSelectable">' + this.title + '</td></tr>');
				});
				
				aHTML.push('<tr><td>&nbsp;</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Membership</td></tr>');
				$.each(nsFreshcare.data.growerMemberships, function() {

					aHTML.push('<tr><td id="ns1blankspaceMembership_' + this.membership + '"' +
										' data-selected="1"' +
										' class="ns1blankspaceMembership nsFreshcareSelectable nsFreshcareSelected">' + 
										this.membershiptext + '</td></tr>');
				});
				

				aHTML.push('</table>')

				$('#ns1blankspaceHomeAuditCARsFilter').html(aHTML.join(''));

				$('#ns1blankspaceSeverity_' + nsFreshcare.data.auditCAR.severityMajor)
					.addClass('nsFreshcareSelected')
					.attr('data-selected', "1");

				$('#ns1blankspaceSeverity_' + nsFreshcare.data.auditCAR.severityMinor)
					.addClass('nsFreshcareSelected')
					.attr('data-selected', "1");

				$('#ns1blankspaceStatus_' + nsFreshcare.data.auditCAR.statusToBeCompleted)
					.addClass('nsFreshcareSelected')
					.attr('data-selected', "1");

				$('#ns1blankspaceHomeAuditSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '40px')
				.click(function() {
					$('#ns1blankspaceHomeAuditSearchHandle').hide();
					$('#ns1blankspaceHomeAuditCARsFilter').show('slide', {direction: 'left'}, 1000);
				});
				$('#ns1blankspaceHomeAuditSearchHandle').hide();

				$('.ns1blankspaceStatus').click(function(event) {
					nsFreshcare.grower.home.auditCARs.toggleSelected(this.id);
				});

				$('.ns1blankspaceSeverity').click(function(event) {
					nsFreshcare.grower.home.auditCARs.toggleSelected(this.id);
				});

				$('.ns1blankspaceMembership').click(function(event) {
					nsFreshcare.grower.home.auditCARs.toggleSelected(this.id);
				});

				$('#ns1blankspaceHomeAuditCARsSearch').button({
					label: "Search"
				})
				.click(function() {

					ns1blankspace.okToSave = true;

					if ($('.ns1blankspaceStatus[data-selected="1"]').length === 0) {
						$('#ns1blankspaceAuditCARsMessage').html('Please choose at least one Status.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave && $('.ns1blankspaceSeverity[data-selected="1"]').length === 0) {
						$('#ns1blankspaceAuditCARsMessage').html('Please choose at least one Severity.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave && $('.ns1blankspaceMembership[data-selected="1"]').length === 0) {
						$('#ns1blankspaceAuditCARsMessage').html('Please choose at least one Membership.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave) {

						$('#ns1blankspaceHomeAuditCARsFilter').hide({duration: 200, complete: function() {

							$('#ns1blankspaceHomeAuditSearchHandle').show();
							$('#ns1blankspaceHomeAuditCARsResults').html(ns1blankspace.xhtml.loading);
							oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.grower.home.auditCARs.show)
							nsFreshcare.grower.home.auditCARs.search(oParam);
						}});

					}
					else {
						window.setTimeout('$("#ns1blankspaceAuditCARsMessage").fadeOut(4000)', 7000);
					}
				});

			}

			if (oResponse) {
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No CARs matching this criteria.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeAuditCARsResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomeAuditCARsResults').show(ns1blankspace.option.showSpeedOptions)}	
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
						aHTML.push('<table id="ns1blankspaceHomeAuditCARs" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Membership</td>');
					
					aHTML.push('<td class="ns1blankspaceHeaderCaption">COP</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Auditor</td>');
					
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Type</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Result Status</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Severity</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Details</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Status</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Date Completed</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.grower.home.auditCARs.row(this));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomeAuditCARsResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceHomeAuditCARsResults',
						xhtmlContext: 'HomeAuditCARs',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.grower.home.auditCARs.row,
						functionNewPage: 'nsFreshcare.grower.home.auditCARs.bind()',
						type: 'json'
					}); 	
					
					nsFreshcare.grower.home.auditCARs.bind();
				}
			}
		},

		row: 	function(oRow) 
		{

			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_membership-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.audit.agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_cop-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['auditissue.audit.codeofpracticetext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_auditor-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['auditissue.audit.auditpersontext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_actualdate-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.audit.actualdate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_type-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.audit.typetext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_resultstatus-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.audit.resultstatustext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_severity-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.typetext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_details-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.details'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_status-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.statustext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs_completed-' + oRow["auditissue.audit"] + '" class="ns1blankspaceRow">' +
									oRow['auditissue.datecompleted'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditCARs-' + oRow["auditissue.audit"] + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');

		},

		bind: 	function(oRow) 
		{

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{
				nsFreshcare.grower.audit.init();
				nsFreshcare.grower.audit.search.send(this.id, {showHome: false})
			})
			.css('width', '15px')
			.css('height', '18px');
		},

		toggleSelected: function(sXHTMLElementID) 
		{

			if ($('#' + sXHTMLElementID).attr('data-selected') === '1') {
				
				$('#' + sXHTMLElementID).attr('data-selected', '0');
				$('#' + sXHTMLElementID).removeClass('nsFreshcareSelected');
			}
			else {

				$('#' + sXHTMLElementID).attr('data-selected', '1')								
				$('#' + sXHTMLElementID).addClass('nsFreshcareSelected');
			}
		}
	}
}