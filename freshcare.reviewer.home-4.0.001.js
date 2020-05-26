/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.reviewer.home = 
{
	init: 	function (oParam) 
	{
		ns1blankspace.object = undefined; 
		ns1blankspace.objectContext = -1; 
		nsFreshcare.reviewer.home.show(); 
	},

	show: 	function (oParam) 
	{

		ns1blankspace.history.view(
		{
			newDestination: 'nsFreshcare.reviewer.home.show();',
			move: false
		});

		// v4.0.001 Bootstrap
		if (ns1blankspace.setupView)
		{	
			$('#ns1blankspaceViewControlSetup').attr('checked', false);
			//$('#ns1blankspaceViewControlSetup').button('refresh');
			ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.reviewer.home.show()'});
		}	

		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

		var aHTML = [];
		
		aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
		
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionAuditsForReview" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Audits for Review</td>' +
						'</tr>');

		aHTML.push('<tr class="ns1blankspaceControl"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlActionAuditsAwaitingAmendments" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Audits Awaiting Amendments</td>' +
						'</tr>');

		aHTML.push('</table>');					
				
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		nsFreshcare.reviewer.home.bind();
		$('#ns1blankspaceControlActionAuditsForReview').addClass('ns1blankspaceHighlight');
		$('#ns1blankspaceControlActionAuditsForReview').click();

		var aHTML = [];
		
		aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
		aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
		aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
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
		$('#ns1blankspaceControlActionAuditsForReview').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			// v1.0.0c SUP021717 Changed mode to 2 - need to filter on teamleadercontactperson
			nsFreshcare.reviewer.home.auditsList.show({mode: 2, resultStatusList: nsFreshcare.data.audit.resultStatusAwaitingReview, xhtmlElementID: 'ns1blankspaceHomeColumn1', label: 'Audits for Review'});
		});

		// v3.2.025 Was not checking if resultStatusCOnditionalApproval was defined
		$('#ns1blankspaceControlActionAuditsAwaitingAmendments').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			
			nsFreshcare.reviewer.home.auditsList.show({mode: 2, 
											resultStatusList: nsFreshcare.data.audit.resultStatusRejected + 
												(ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval != undefined
																			? ',' + ns1blankspace.rootnamespace.data.audit.resultStatusConditionalApproval
																			: ''), 
											xhtmlElementID: 'ns1blankspaceHomeColumn1',
											label: 'Audits awaiting Amendments'});
		});
	},

	auditsList: 	
	{
		search: function(oParam) 
		{
			var sResultStatusList = ns1blankspace.util.getParam(oParam, 'resultStatusList').value;
			var iMode = ns1blankspace.util.getParam(oParam, 'mode', {'default': 1}).value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'audit.contactbusiness.legalname'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'audit';
			oSearch.method = 'AUDIT_SEARCH';
			oSearch.addField('audit.agrisubscription.membershiptext,audit.contactbusinesstext,audit.contactbusiness.legalname,audit.contactperson.firstname,audit.contactperson.surname' +
							 ',audit.scheduleddate,audit.actualdate,audit.resultstatus,audit.resultstatustext,audit.contactbusiness,audit.teamleadercontactpersontext,audit.auditbusinesstext');
			oSearch.addFilter('audit.resultstatus', 'IN_LIST', sResultStatusList);
			if (iMode === 2)
			{	oSearch.addFilter('audit.teamleadercontactperson', 'EQUAL_TO', ns1blankspace.user.contactPerson);}
			else
			{	oSearch.addFilter('audit.auditbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);}

			oSearch.sort(sSortColumn, sSortDirection);

			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					nsFreshcare.reviewer.home.auditsList.show(oParam, oResponse);
				}
				else
				{
					ns1blankspace.status.error('Error finding audits: ' + oResponse.error.errornotes);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Audits for Review';
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
				nsFreshcare.reviewer.home.auditsList.search(oParam);
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
									' data-column="audit.agrisubscription.membershiptext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.membershiptext') ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactbusiness.legalname"' +
									' data-sortdirection="' + ((sSortColumn == "audit.contactbusiness.legalname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Business Name</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactperson.firstname"' +
									' data-sortdirection="' + ((sSortColumn == "audit.contactperson.firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.auditbusinesstext"' +
									' data-sortdirection="' + ((sSortColumn == "audit.auditbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Certification Body</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.actualdate"' +
									' data-sortdirection="' + ((sSortColumn == "audit.actualdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Audit Date</td>');
					if (iMode >= 2)
					{
						aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
										' data-sortdirection="' + ((sSortColumn == "audit.resultstatustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
										' data-column="audit.resultstatustext"' +
										'>Status</td>');
					}
					aHTML.push('<td class="ns1blankspaceCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	
					{
						aHTML.push(nsFreshcare.reviewer.home.auditsList.row(this, oParam));
					});
					
					aHTML.push('</table>');

					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeAuditStatusResults',
						xhtmlContext: 'HomeAuditStatus',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.reviewer.home.auditsList.row,
						functionOnNewPage: nsFreshcare.reviewer.home.auditsList.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var iMode = $('#ns1blankspaceHomeAuditStatusResults').attr('data-mode');
			var aHTML = [];
			var sBusinessName = (oRow['audit.contactbusiness.legalname'] != oRow['audit.contactbusinesstext'])
								? oRow['audit.contactbusiness.legalname'] + '<br />(' + oRow['audit.contactbusinesstext'] + ')'
								: oRow['audit.contactbusiness.legalname']

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_membership-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_legalname-' + oRow['audit.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									sBusinessName + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_contactperson-' + oRow['audit.contactbusiness'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['audit.contactperson.firstname'] + ' ' + oRow['audit.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_certbody-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.auditbusinesstext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeAuditStatus_actualdate-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.actualdate'] + '</td>');
			if (iMode >= '2')
			{
				aHTML.push('<td id="ns1blankspaceHomeAuditStatus_resultstatus-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['audit.resultstatustext'] + '</td>');
			}

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
			{
				var oRoot = ns1blankspace.rootnamespace;
				oRoot.admin.audit.init({showHome: false});
				oRoot.admin.audit.search.send(this.id);
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.reviewer.home.auditsList.show(oParam);
				});
		}
	}
}	

