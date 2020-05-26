/*
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
 
// v1.0.2 Changes for fields at subscription level: Crop, ProductGroup Sites
// v3.2.015 SUP023421 Change 'Growers' to 'Members'

nsFreshcare.admin.certificate = 
{
	data: 
	{},

	init: 	function (oParam) 
	{ 
		ns1blankspace.app.reset();
		$('#ns1blankspaceViewControlViewContainer').button(
		{
			label: 'Certificates'
		});			
		ns1blankspace.objectMethod = 'AGRI_CERTIFICATE';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectName = 'certificate';
		nsFreshcare.admin.certificate.data = {};
		nsFreshcare.admin.certificate.show(); 
	},

	show: 	function (oParam) 
	{
		var fFunctionBind = ns1blankspace.util.getParam(oParam, 'functionBind', {'default': nsFreshcare.admin.certificate.bind}).value;
		nsFreshcare.admin.certificate.readOnly = nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz;

		ns1blankspace.history.view(
		{
			newDestination: 'nsFreshcare.admin.certificate.show();',
			move: false
		});

		if (ns1blankspace.setupView)
		{	
			$('#ns1blankspaceViewControlSetup').attr('checked', false);
			$('#ns1blankspaceViewControlSetup').button('refresh');
			ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.admin.certificate.show()'});
		}	

		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

		var aHTML = [];
		
		aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
		
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlUpdateMembershipStatus" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Update Membership Status</td>' +
						'</tr>');
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlCertificatesToBeCreated" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Certificates to be Created</td>' +
						'</tr>');
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControlCertificatesToSend" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'Certificates Ready for Sending</td>' +
						'</tr>');
		
		aHTML.push('<tr><td>&nbsp;</td></tr>');
		aHTML.push('</table>');					
				
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		fFunctionBind();

		ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlUpdateMembershipStatus';
		
		var aHTML = [];
		
		aHTML.push('<div id="ns1blankspaceCertificatesMain" class="ns1blankspaceControlMain">');
		aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
		aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
		aHTML.push('</tr></table>');	
		aHTML.push('</div>');
		aHTML.push('<div id="ns1blankspaceCertificatesPreview" class="ns1blankspaceControlMain">');

		$('#ns1blankspaceMain').html(aHTML.join(''));

		if (ns1blankspace.xhtml.defaultElementID != '')
		{
			$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
			$('#' + ns1blankspace.xhtml.defaultElementID).click();
		}
	},

	bind: 	function ()
	{
		
		$('#ns1blankspaceControlUpdateMembershipStatus').click(function(event)
		{
			
			$('#ns1blankspaceCertificatesPreview').hide();
			$('#ns1blankspaceCertificatesMain').show();
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.admin.certificate.updateMembershipStatus.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});

		$('#ns1blankspaceControlCertificatesToBeCreated').click(function(event)
		{
			$('#ns1blankspaceCertificatesPreview').hide();
			$('#ns1blankspaceCertificatesMain').show();
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.admin.certificate.certificatesToBeCreated.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});

		$('#ns1blankspaceControlCertificatesToSend').click(function(event)
		{
			$('#ns1blankspaceCertificatesPreview').hide();
			$('#ns1blankspaceCertificatesMain').show();
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.admin.certificate.certificatesToSend.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});
	},

	getCertificationBodyStartDates: function(oParam)
	{
		var iStep = 1;

		if (oParam)
		{
			if (oParam.cbStartDateStep) {iStep = oParam.cbStartDateStep}
		}
		else
		{ oParam = {cbStartDateStep: 1}}

		if (iStep === 1)
		{
			// v3.1.0a Changed se2093 & se2094 to correct structure element values
			// v3.3.005 SUP023801 No longer need to get JASANZ dates as JASANZAudit flag is the source of truth
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';
			oSearch.addField('tradename,se' + nsFreshcare.data.selfCertificationDateId + ',se' + nsFreshcare.data.jasanzDateId);
			oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupAuditor);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					oParam.cbStartDateStep = 2;
					nsFreshcare.admin.certificate.data.certBodyStartDates = oResponse.data.rows;
					nsFreshcare.admin.certificate.getCertificationBodyStartDates(oParam);
				}
				else
				{
					ns1blankspace.status.error(oReponse.error.errornotes);
				}
			});
			
		}
		else if (iStep === 2)
		{
			delete(oParam.cbStartDateStep);
			if (oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	updateMembershipStatus: 	
	{
		search: function(oParam) 
		{

			// Check whether this is best way to search as may miss out on audits where the grower wasn't audited to the default COP
			// v1.0.2 Now filters on Self Certification Date (contactbusiness.se2093) depending on whether admin or auditor
			var dToday = new Date();
			var sResultStatusFilter = '';
			var dTodayLess30 = new Date();
			dTodayLess30.setDate(dTodayLess30.getDate() - 30);
			var dTodayLess14 = new Date();
			dTodayLess14.setDate(dTodayLess14.getDate() - 14);
			
			$('.ns1blankspaceResultStatus').each(function() 
			{
				if ($(this).attr('data-selected') === '1') {
					sResultStatusFilter = this.id.split('_').pop();
				}
			});

			
			if (nsFreshcare.admin.certificate.data == undefined) {nsFreshcare.admin.certificate.data = {}}

			if (oParam)
			{
				if (oParam.membershipStatusSearchStep === undefined) {oParam.membershipStatusSearchStep = 1}
			}
			else {oParam = {membershipStatusSearchStep: 1}}

			
			// Get the dates that CB's start Self Certification
			if (nsFreshcare.admin.certificate.data.certBodyStartDates === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.updateMembershipStatus.search);
				nsFreshcare.admin.certificate.getCertificationBodyStartDates(oParam);
			}

			// populate membershipCOP object
			else if (oParam.membershipStatusSearchStep === 1)
			{
				if (nsFreshcare.admin.certificate.data.membershipCOP === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
					oSearch.addField('membership,code,certificateexpiresafter');
					oSearch.addFilter('isdefault', 'EQUAL_TO', 'Y');
					oSearch.addFilter('agricodeofpractice.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);
					oSearch.sort('certificateexpiresafter', 'asc');
					oSearch.getResults(function(oResponse)
					{

						if (oResponse.status == 'OK')
						{
							nsFreshcare.admin.certificate.data.membershipCOP = oResponse.data.rows;
							oParam.membershipStatusSearchStep = 2;
							nsFreshcare.admin.certificate.updateMembershipStatus.search(oParam);
						}
						else
						{
							ns1blankspace.status.message = 'Contact Support. No Memberships found.'
						}
					});
				}
				else
				{
					oParam.membershipStatusSearchStep = 2;
					nsFreshcare.admin.certificate.updateMembershipStatus.search(oParam);
				}
			}

			// Search for audits
			else if (oParam.membershipStatusSearchStep === 2)
			{
				// Create object containing unique expiryMonths and the membershipIds that correspond to this expiryMonths value
				var oMemberships = [];
				var sPreviousExpiryMonths = '';
				$.each(nsFreshcare.admin.certificate.data.membershipCOP, function()
				{
					if (this.certificateexpiresafter != sPreviousExpiryMonths)
					{
						oMemberships.push({expiryMonths: this.certificateexpiresafter, memberships: this.membership});
					}
					else
					{
						var sMembership = this.membership;
						var sExpiryMonths = this.certificateexpiresafter;
						$.each(oMemberships, function()
						{
							if (this.expiryMonths == sExpiryMonths)
							{
								this.memberships = this.memberships + ',' + sMembership;
							}
						});
					}
					sPreviousExpiryMonths = this.certificateexpiresafter;
				});

				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'audit';
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.reference,audit.agrisubscription.membership.code,audit.auditbusinesstext,audit.contactbusinesstext,audit.contactpersontext' +
								',audit.agrisubscription.agricertificate.certificatenumber,audit.actualdate,audit.auditpersontext,audit.resultstatusdate,audit.codeofpracticetext' +
								',audit.agrisubscription.id,audit.agrisubscription.status,audit.contactbusiness,audit.codeofpractice,audit.resultstatus' +
								',audit.auditbusiness,audit.auditperson,audit.paid,audit.type');
				
				// Membership Subscription start / end dates must be current
				oSearch.addFilter('audit.agrisubscription.startdate', 'LESS_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy') + ' 23:59:59')
				oSearch.addBracket('(');
				oSearch.addFilter('audit.agrisubscription.enddate', 'GREATER_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy') + ' 23:59:59');
				oSearch.addOperator('or');
				oSearch.addFilter('audit.agrisubscription.enddate', 'IS_NULL');
				oSearch.addBracket(')');
				
				// Non-withdrawn subscriptions only
				oSearch.addFilter('audit.agrisubscription.status', 'NOT_EQUAL_TO', nsFreshcare.data.grower.subscriptionStatusWD);

				// v3.1.2 SUP022574 Only paid audits
				// v3.1.207 SUP023057 Removed and now appears in Certs to be Created
				//oSearch.addFilter('audit.paid', 'EQUAL_TO', 'Y');
				
				// Currently selected Result Status
				oSearch.addFilter('resultstatus', 'IN_LIST', sResultStatusFilter);
				
				// Resulting Membership Status has to be null if filtering on Cert Pending or Null, CP or IP if Cert Recommended
				// v3.3.001 SUP023456 Must also display those where membershipstatus is Suspended
				// v3.3.003 SUP023800 Was also filtering Pending on CP
				if (sResultStatusFilter === nsFreshcare.data.audit.resultStatusPending)
				{
					oSearch.addBracket('(');
					oSearch.addFilter('membershipstatus', 'IS_NULL');		
					oSearch.addOperator('or');
					oSearch.addFilter('membershipstatus', 'EQUAL_TO', nsFreshcare.data.grower.subscriptionStatusSP);								
					oSearch.addBracket(')');
				}
				else if (sResultStatusFilter === nsFreshcare.data.audit.resultStatusCompleted)
				{
					oSearch.addBracket('(');
					oSearch.addFilter('membershipstatus', 'IS_NULL');		
					oSearch.addOperator('or');
					oSearch.addFilter('membershipstatus', 'IN_LIST', nsFreshcare.data.grower.subscriptionStatusCP + ',' + 
																	 nsFreshcare.data.grower.subscriptionStatusIP + ',' +
																	 nsFreshcare.data.grower.subscriptionStatusSP);	
					oSearch.addBracket(')');
				}

				// For Pending, only show audits where audit date was is more than 30 days ago as they have 30 days to close them out
				// v3.3.001 SUP023456 SCS allow only 14 days to close out
				// v3.1.2 SUP022911 COmpare to Audit Date, not result status date
				if (sResultStatusFilter === nsFreshcare.data.audit.resultStatusPending)
				{
					oSearch.addBracket('(');
						oSearch.addBracket('(');
						oSearch.addFilter('actualdate', 'LESS_THAN', dTodayLess30.toString('dd MMM yyyy') + ' 00:00:00');
						oSearch.addFilter('audit.agrisubscription.membership', 'NOT_EQUAL_TO', nsFreshcare.data.membershipSCS);
						oSearch.addBracket(')');

						oSearch.addOperator('or');
						
						oSearch.addBracket('(');
						oSearch.addFilter('actualdate', 'LESS_THAN', dTodayLess14.toString('dd MMM yyyy') + ' 00:00:00');
						oSearch.addFilter('audit.agrisubscription.membership', 'EQUAL_TO', nsFreshcare.data.membershipSCS);
						oSearch.addBracket(')');
					oSearch.addBracket(')');
					
					// v3.1.2 SUP022693 ScopeExtension is a special audit type which is only processed if CE
					oSearch.addFilter('type', 'NOT_EQUAL_TO', nsFreshcare.data.audit.typeScopeExtension);
				}

				// Add filters for each group of Memberships that has the same expiryMonths - Some have 37 months, some have 13 months
				// SUP021235: Expiry months are actually to be calculated as 12months & 28days or 36months & 28days
				//			  Expiry months will be changed to 12 months and 36 months where applicable so just need to then adjust for 28 days
				// v2.0.4b SUP021495 Need to compare actualdate to expiry date of each individual certificate
				oSearch.addBracket('(');
				$.each(oMemberships, function(index)
				{
					var dMonthsAgo = new Date();
					dMonthsAgo.setMonth(dMonthsAgo.getMonth() - Number(this.expiryMonths));
					dMonthsAgo.setDate(dMonthsAgo.getDate()  - 28);

					oSearch.addBracket('(');
					oSearch.addFilter('audit.agrisubscription.membership', 'IN_LIST', this.memberships);
					oSearch.addFilter('audit.actualdate', 'BETWEEN', dMonthsAgo.toString('dd MMM yyyy') + ' 00:00:00', dToday.toString('dd MMM yyyy') + ' 23:59:59');
					oSearch.addBracket(')');

					if (index + 1 < oMemberships.length)
					{
						oSearch.addOperator('or');
					}

				});
				oSearch.addBracket(')');

				// Filter on Auditor Business if not Admin user
				// v3.1.2 SUP022859 Only show JASANZ users audits for the selected CB if set
				if ((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)
					|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz && nsFreshcare.data.viewFilter.certificationBody)) 
				{
					oSearch.addFilter("audit.auditbusiness", "EQUAL_TO", (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? nsFreshcare.data.viewFilter.certificationBody : ns1blankspace.user.contactBusiness));
				}
				else
				{	// v3.0.0 Now shows all of them and allows user to filter by Cert Body
					//oSearch.addFilter('audit.auditbusiness', 'NOT_IN_LIST', nsFreshcare.admin.certificate.data.managedCBs.join(','));
				}

				if (oParam.sortColumn)
				{
					oSearch.sort(oParam.sortColumn, oParam.sortDirection);
				}
				else
				{
					oSearch.sort('audit.actualdate', 'desc');
				}
				oSearch.rows = 50;

				oSearch.getResults(function(oResponse) {

					if (oResponse.status === 'OK') 
					{
						delete(oParam.membershipStatusSearchStep);
						nsFreshcare.admin.certificate.updateMembershipStatus.show(oParam, oResponse);
					}
				});
			}
		},

		show: 	function(oParam, oResponse) 
		{

			// Shows all Audits that have not been processed and allow user to Update Subscription Status

			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Update Membership Status.';
			var dToday = new Date();
			var sSortColumn = '';
			var sSortDirection;
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.sortColumn != undefined) {sSortColumn = oParam.sortColumn}
				if (oParam.sortDirection!= undefined) {sSortDirection = ((oParam.sortDirection === 'asc') ? 'desc' : 'asc')}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			// Filter on Result Status only
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') 
			{

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceCertificateUpdateStatus"><tr>');
				aHTML.push('<td id="ns1blankspaceCertificateUpdateStatusResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceCertificateUpdateStatusSearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
						   '<td id="ns1blankspaceCertificateUpdateStatusFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// v4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceCertificateUpdateStatusSearchHandle" style="height:25px" title-"Search Criteria"></span>');
				// v3.1.2 SUP022859 ReadOnly users can't update
				if (!(nsFreshcare.admin.certificate.readOnly == true))
				{
					aHTML.push('<span id="ns1blankspaceCertificateUpdateStatusUpdate" style="height:25px" title="Update"></span>');
				}
				$('#ns1blankspaceCertificateUpdateStatusSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceCertificateUpdateStatusSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceCertificateUpdateStatusStatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

				// v3.1.0d Added data-value attribute
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Audit Result Status</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceResultStatus_' + nsFreshcare.data.audit.resultStatusPending + '" ' +
									'class="ns1blankspaceResultStatus nsFreshcareSelectable nsFreshcareSelected"' +
									' data-selected="1" data-value="' + nsFreshcare.data.audit.resultStatusPending + '">Certification Pending</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceResultStatus_' + nsFreshcare.data.audit.resultStatusCompleted + '" ' +
									'class="ns1blankspaceResultStatus nsFreshcareSelectable"' +
									' data-value="' + nsFreshcare.data.audit.resultStatusCompleted + '">Certification Recommended</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceResultStatus_' + nsFreshcare.data.audit.resultStatusNoResult + '" ' +
									'class="ns1blankspaceResultStatus nsFreshcareSelectable"' +
									' data-value="' + nsFreshcare.data.audit.resultStatusNoResult + '">No Result</td></tr>');
				
				aHTML.push('</table>')

				$('#ns1blankspaceCertificateUpdateStatusFilter').html(aHTML.join(''));

				$('#ns1blankspaceCertificateUpdateStatusSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() {
					$('#ns1blankspaceCertificateUpdateStatusSearchHandle').hide();
					$('#ns1blankspaceCertificateUpdateStatusFilter').show('slide', {direction: 'left'}, 1000);
				});

				// v3.1.2 SUP022859 Radonly can't do any updates, just look
				if (!(nsFreshcare.admin.certificate.readOnly == true))
				{
					$('#ns1blankspaceCertificateUpdateStatusUpdate').button({
						text: false,
						icons: { primary: 'ui-icon-check'}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() 
					{
						// Can only update Cert Pending & Cert Recommended audits
						if ($('.nsFreshcareSelected').first().attr('data-value') === nsFreshcare.data.audit.resultStatusPending
							|| $('.nsFreshcareSelected').first().attr('data-value') === nsFreshcare.data.audit.resultStatusCompleted)
						{
							ns1blankspace.container.confirm(
							{
								html: 'Are you sure you want to update Membership Status records for "' + $('.nsFreshcareSelected').first().html() + '" Audits?',
								buttons:
								[
									{
										text: 'Yes',
										click: function()
										{
											// Disable all the check boxes first so user can't change them part way through processing
											$('.ns1blankspaceCertificateStatusUpdateCheckAll').attr('disabled', true);
											$('.ns1blankspaceCertificateStatusInclude').attr('disabled', true);
											$('#ns1blankspaceCertificateUpdateStatusUpdate').attr('disabled', true);
											$('#ns1blankspaceCertificateUpdateStatusSearchHandle').attr('disabled', true);
											$('#ns1blankspaceBootstrapDialog').modal('hide');

											nsFreshcare.admin.certificate.updateMembershipStatus.process({resultStatus: $('.nsFreshcareSelected').first().attr('id').split('_').pop()})
										}
									},
									{
										text: 'No',
										click: function() {$('#ns1blankspaceBootstrapDialog').modal('hide');}
									}
								]
							});
						}
					});
				}
				$('#ns1blankspaceCertificateUpdateStatusUpdate').hide();

				$('.ns1blankspaceResultStatus').click(function() {

					$('.ns1blankspaceResultStatus').removeClass('nsFreshcareSelected');
					$('.ns1blankspaceResultStatus').attr('data-selected','0');
					
					$(this).addClass('nsFreshcareSelected');
					$(this).attr('data-selected', '1');
				});

				$('#ns1blankspaceCertificateUpdateStatusSearch').button({
					label: "Search"
				})
				.click(function() {

					ns1blankspace.okToSave = true;

					if ($('.ns1blankspaceResultStatus[data-selected="1"]').length === 0) {
						$('#ns1blankspaceCertificateUpdateStatusStatusMessage').html('Please choose at least one Result Status.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave) {

						nsFreshcare.admin.certificate.data.resultStatusSelected = $('.ns1blankspaceResultStatus[data-selected="1"]').first()
						$('#ns1blankspaceCertificateUpdateStatusFilter').hide({duration: 200, complete: function() {

							$('#ns1blankspaceCertificateUpdateStatusSearchHandle').show();
							$('#ns1blankspaceCertificateUpdateStatusUpdate').show();
							$('#ns1blankspaceCertificateUpdateStatusResults').html(ns1blankspace.xhtml.loading);
							oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.certificate.updateMembershipStatus.show)
							nsFreshcare.admin.certificate.updateMembershipStatus.search(oParam);
						}});

					}
					else {
						window.setTimeout('$("#ns1blankspaceCertificateUpdateStatusStatusMessage").fadeOut(4000)', 7000);
					}
				});

			}

			if (oResponse) {
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No Audits require status updates.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceCertificateUpdateStatusResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceCertificateUpdateStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					var sBusinessColumn = (bShowLegalName) ? 'audit.contactbusiness.legalname' : 'audit.contactbusinesstext';

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
						aHTML.push('<table id="ns1blankspaceCertificateUpdateStatus" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditReference"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.reference"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.reference') ? sSortDirection : 'asc') + '">' +
									'Audit Reference</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortMembership"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.membership.code"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.membership.code') ? sSortDirection : 'asc') + '">' +
									'COP</td>');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortGrowerBusiness"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? sSortDirection : 'asc') + '">' +
									nsFreshcare.data.growerText + ' Business</td>');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortGrower"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactpersontext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.contactpersontext') ? sSortDirection : 'asc') + '">' +
									nsFreshcare.data.growerText + '</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortCertificateNumber"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.agricertificate.certificatenumber"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.agricertificate.certificatenumber') ? sSortDirection : 'asc') + '">' +
									'Certificate Number</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditDate"' +
									' data-column="audit.actualdate"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.actualdate') ? sSortDirection : 'asc') + '"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort">' +
									'Audit Date</td>');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditor"' +
									' data-column="audit.' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) ? 'auditpersontext' : 'auditbusinesstext') + '"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) ? 'auditpersontext' : 'auditbusinesstext')) 
															? sSortDirection 
															: 'asc') + '"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort">' +
									'Auditor</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortResultStatus"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.resultstatusdate"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.resultstatusdate') ? sSortDirection : 'asc') + '">' +
									'Result Status Date</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortCOP"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.paid"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.paid') ? sSortDirection : 'asc') + '">' +
									'Paid?</td>');

					if ($('#ns1blankspaceResultStatus_' + nsFreshcare.data.audit.resultStatusNoResult).hasClass('nsFreshcareSelected') )
					{
						aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					}
					else
					{
						//'<input type="checkbox" id="ns1blankspaceCertificateStatusUpdateCheckAll" class="ns1blankspaceCertificateStatusUpdate" checked="false">' +
						aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceMainRowOptionsSelect"' +
									' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top; width: 20px;">' + 
									'<input type="checkbox"' + 
										' class="ns1blankspaceCertificateStatusUpdateCheckAll ns1blankspaceCertificateStatusUpdate" checked="false">' +
									'</td>');
					}
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.admin.certificate.updateMembershipStatus.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceCertificateUpdateStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceCertificateUpdateStatusResults',
						xhtmlContext: 'CertificatesUpdateStatus',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 50,
						functionShowRow: nsFreshcare.admin.certificate.updateMembershipStatus.row,
						functionOnNewPage: nsFreshcare.admin.certificate.updateMembershipStatus.bind,
						type: 'json',
						showLegalName: bShowLegalName
					}); 	
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
			
			var sAuditorName = ((oRow['audit.auditpersontext'].split(', ').length > 1) 
																? oRow['audit.auditpersontext'].split(', ').pop() + ' '
																: '')
								+ oRow['audit.auditpersontext'].split(', ').shift();
			var dActual = (oRow['audit.actualdate'] != '') ? new Date(oRow['audit.actualdate']) : undefined;
			var dResult = (oRow['audit.resultstatusdate'] != '') ? new Date(oRow['audit.resultstatusdate']) : undefined;

			// v3.4.007 SUP023917 Merged M/Ship & COP and added Paid flag
			if (dActual && dResult && ((dResult - dActual)/86400000) <= 365 || $('#ns1blankspaceResultStatus_3').hasClass('nsFreshcareSelected') )
			{
				aHTML.push('<tr id="ns1blankspaceCertificateUpdateStatusInclude_row-' + oRow.id + '" class="ns1blankspaceRow">');
							
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_reference-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
										oRow['audit.reference'] + '</td>');

				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_membership-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
										oRow['audit.agrisubscription.membership.code'] + ' ' + oRow['audit.codeofpracticetext'] + '</td>');

				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_business-' + oRow.id + '" class="ns1blankspaceRow">' +
										((bShowLegalName) ? sBusinessName : oRow['audit.contactbusinesstext']) + '</td>');
			
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_contact-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['audit.contactpersontext'] + '</td>');
			
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_certificate-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['audit.agrisubscription.agricertificate.certificatenumber'] + '</td>');
			
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_auditdate-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['audit.actualdate'] + '</td>');
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_auditor-' + oRow.id + '" class="ns1blankspaceRow">' +
										((nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) ? oRow['audit.auditbusinesstext'] : sAuditorName) +
										'</td>');
			
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_statusdate-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['audit.resultstatusdate'] + '</td>');
			
				aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus_paid-' + oRow.id + '" class="ns1blankspaceRow">' +
										oRow['audit.paid'] + '</td>');
			
				if (oRow['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusPending && oRow['audit.resultstatus'] != nsFreshcare.data.audit.resultStatusCompleted)
				{
					aHTML.push('<td id="ns1blankspaceCertificateUpdateStatus-' + oRow.id + '" class="ns1blankspaceMainRowOptionsGoTo"></td>');
				}
				else
				{
					aHTML.push('<td id="ns1blankspaceCertificatesUpdateStatus-' + oRow.id + '"' +
								' class="ns1blankspaceMainRowOptionsInclude"' +
								' style="color:#B8B8B8; padding:4px; vertical-align:top; width: 20px;">' + 
								'<input type="checkbox" id="ns1blankspaceCertificateUpdateStatusInclude-' + oRow.id + '"' +
								' class="ns1blankspaceCertificateStatusInclude" ' +
								' checked="false"' +
								' data-subscriptionStatus="' + oRow['audit.agrisubscription.status'] +  '"' +
								' data-contactBusiness="' + oRow['audit.contactbusiness'] + '"' +
								' data-auditContactBusiness="' + oRow['audit.auditbusiness'] + '"' +
								' data-auditContactPerson="' + oRow['audit.auditperson'] + '"' +
								' data-subscription="' + oRow['audit.agrisubscription.id'] + '"' +
								' data-auditCodeOfPractice="' + oRow['audit.codeofpractice'] + '"' +
								' data-auditType="' + oRow['audit.type'] + '"' +
								' data-resultStatusDate="' + oRow['audit.resultstatusdate'] + '"' +
								' data-resultStatus="' + oRow['audit.resultstatus'] + '">' +
							'</td>');
				}
			}

			return aHTML.join('');
		},

		bind: 	function()
		{
			$('.ns1blankspaceMainRowOptionsGoTo:visible')
				.button({
					text: false,
					icons: {primary: 'ui-icon-play'}
				})
				.css('width', '15px')
				.css('height', '18px')
				.click(function()
				{
					var oRoot = ns1blankspace.rootnamespace;
					oRoot.admin.audit.init({showHome: false});
					oRoot.admin.audit.search.send(this.id);

				});

			// v3.3.002 SUP023800 Only bind td, not tr
			$('td.ns1blankspaceRow:visible')
				.css('cursor', 'pointer')
				.css('width', '15px')
				.css('height', '18px')
				.click(function()
				{
					window.open(document.location.origin + '/#/nsFreshcare-admin.audit/id:' + this.id.split('-').pop());
				});

			// v3.4.007 SUP023917 Now only operates on current page
			$('.ns1blankspaceCertificateStatusUpdateCheckAll:visible').click(function()
			{
				if ($(this).prop('checked'))
				{
					$('input.ns1blankspaceCertificateStatusInclude:visible').prop('checked', true);
				}
				else
				{
					$('input.ns1blankspaceCertificateStatusInclude:visible').prop('checked', false);
				}
			});

			$('.ns1blankspaceHeaderSort:visible')
				.css('cursor', 'pointer')
				.click(function()
				{
					var oParam = {};
					var oRoot = ns1blankspace.rootnamespace;
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					oParam.membershipStatusSearchStep = 2;
					oRoot.admin.certificate.updateMembershipStatus.search(oParam);
				});
		},
		
		process: function(oParam)
		{
			// Perform the actual update to the Membership Status on the records that the user has ticked
			// Using rules below, add a new record to AgriSubscriptionStatusChange, update AgriSubscription.Status and Audit.MembershipStatus
			// Current 		
			// Mem    	Audit 		Audit
			// Status 	Pending 	Recommended
			// AD 		IP/CP **	IN/CE** 	** If completed Audits logged > 1, set to CP/CE, otherwise set to IP/IN
			// AP 		CP 			CE
			// CE 		CP 			CE
			// CP 		CP 			CE
			// DR 		IP/CP **	IN/CE** 	** If completed Audits logged > 1, set to CP/CE, otherwise set to IP/IN
			// FM 		IP 			IN
			// IN 		CP 			CE
			// IP 		CP 			IN/CE* 		*  If only one Audit record exists, then IN, otherwise CE
			// SP 		IP/CP **	IN/CE** 	** If completed Audits logged > 1, set to CP/CE, otherwise set to IP/IN
			// TE 		IP/CP 		IN/CE **	** If completed Audits logged > 1, set to CP/CE, otherwise set to IP/IN
			// TI 		IP 			IN
			// WD 		Not applicable - not shown
			// RM 		IP/CP**		IN/CE**		** If completed Audits logged > 1, set to CP/CE, otherwise set to IP/IN
			// If the Actual Audit Date and the Result Status Date are more than 12 months apart then the Audit cannot be counted and must be lapsed.
			// IF auditType = scopeExension, then just update the Audit Status to the same as the current Subscription

			// v3.4.010 SUP023214 Before determining new value for status, cehck to see if most recent status was added
			//   		by automationUser and if it's dated after resultStatusDate, delete it and use the previous status

			oParam = oParam || {updateMembershipStatusStep: 0, updateStatusIndex: -1, successful: false};
			var dToday = new Date();
			var sData = 'id=';
			var sNewStatus;
			var iUpdateStatusIndex = -1;

			if (oParam.updateMembershipStatusStep === undefined) {oParam.updateMembershipStatusStep = 0}
			if (oParam.newStatus) {sNewStatus = oParam.newStatus}
			if (oParam.updateStatusIndex != undefined) {iUpdateStatusIndex = oParam.updateStatusIndex}
			if (oParam.successful === undefined) {oParam.successful = false;}


			if (iUpdateStatusIndex == -1)
			{
				nsFreshcare.admin.certificate.data.updateStatusChecked = $("input.ns1blankspaceCertificateStatusInclude:checked");
				iUpdateStatusIndex = 0;
				oParam.updateStatusIndex = 0;
			}	

			if (iUpdateStatusIndex < nsFreshcare.admin.certificate.data.updateStatusChecked.length)
			{
				var oThisElement = nsFreshcare.admin.certificate.data.updateStatusChecked[iUpdateStatusIndex];
				var dChange = new Date($(oThisElement).attr('data-resultStatusDate'));

				// Find most recent status records and change subscriptionStatus if automationUser & after dChange
				if (oParam.updateMembershipStatusStep == 0)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_MEMBERSHIP_STATUS_CHANGE_SEARCH';
					oSearch.addField('changedate,fromstatus,tostatus,modifieduser,reason,agrisubscriptionstatuschange.subscription.status' +
									',agrisubscriptionstatuschange.subscription.laststatuschangedate');
					oSearch.addFilter('subscription', 'EQUAL_TO', $(oThisElement).attr('data-subscription'));
					oSearch.sort('changedate', 'desc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							var oLastStatus = oResponse.data.rows.shift();
							if (oLastStatus)
							{
								if (oLastStatus.modifieduser == nsFreshcare.data.automationsUser
									&& dChange < new Date(oLastStatus.changedate))
								{
									var oData = {id: oLastStatus.id, remove: '1'};
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE'),
										data: oData,
										success: function(oResponse)
										{
											if (oResponse.status == 'OK')
											{
												$(oThisElement).attr('data-subscriptionstatus', oLastStatus.fromstatus);
												oParam.updateMembershipStatusStep = 1;
												nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
											}
											else
											{
												nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																			errorMessage: 'Error removing automated status history row: ',
																			errorNotes: oResponse.error.errornotes});
												oParam.updateMembershipStatusStep = 6;
												oParam.successful = false;
												nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
											}
										}
									});
								}
								// v3.4.011 Was not going anywhere if not automations user
								else
								{
									oParam.updateMembershipStatusStep = 1;
									nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
								}
							}
							// v3.4.011 Was not going anywhere if no status rows
							else
							{
								oParam.updateMembershipStatusStep = 1;
								nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
							}
						}
						else
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
														errorMessage: 'Error finding most recent Membership status data: ',
														errorNotes: oResponse.error.errornotes});
							oParam.updateMembershipStatusStep = 6;
							oParam.successful = false;
							nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
						}
					});
				}

				// Work out the value for the new Subscription Status
				else if (oParam.updateMembershipStatusStep === 1)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Determining new Membership Status'});

					switch ($(oThisElement).attr('data-subscriptionstatus'))
					{
						case nsFreshcare.data.grower.subscriptionStatusFM:
						case nsFreshcare.data.grower.subscriptionStatusTI:
						{
							if ($(oThisElement).attr('data-resultstatus') === nsFreshcare.data.audit.resultStatusPending)
							{	
								oParam.newStatus = nsFreshcare.data.grower.subscriptionStatusIP;
							}
							else if ($(oThisElement).attr('data-resultstatus') === nsFreshcare.data.audit.resultStatusCompleted)
							{
								oParam.newStatus = nsFreshcare.data.grower.subscriptionStatusIN;
							}

							oParam.updateMembershipStatusStep = 3;
							break;
						}

						case nsFreshcare.data.grower.subscriptionStatusAP:
						case nsFreshcare.data.grower.subscriptionStatusCE:
						case nsFreshcare.data.grower.subscriptionStatusCP:
						case nsFreshcare.data.grower.subscriptionStatusIN:
						case nsFreshcare.data.grower.subscriptionStatusIP:
						{

							if ($(oThisElement).attr('data-resultstatus') === nsFreshcare.data.audit.resultStatusPending)
							{	
								oParam.updateMembershipStatusStep = 3;
								oParam.newStatus = nsFreshcare.data.grower.subscriptionStatusCP;
							}
							else if ($(oThisElement).attr('data-resultstatus') === nsFreshcare.data.audit.resultStatusCompleted)
							{
								// v3.1.2. SUP022693 If a scopeExtension Audit, just set to the same SubcriptionStatus value
								// TODO - deternine if subscription status record shuld be added or not
								if ($(oThisElement).attr('data-subscriptionstatus') != nsFreshcare.data.grower.subscriptionStatusIP)
								{
									oParam.newStatus = nsFreshcare.data.grower.subscriptionStatusCE;
									oParam.updateMembershipStatusStep = 3;
								}
								else
								{	// Special Case - need to check how many completed audits
									oParam.updateMembershipStatusStep = 2;
									oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.updateMembershipStatus.process);
									oParam.xhtmlElementID = oThisElement.id;
									nsFreshcare.admin.certificate.updateMembershipStatus.completedAudits(oParam);
								}
							}

							break;
						}

						// v3.1.206 SUP023057 Added DR
						case nsFreshcare.data.grower.subscriptionStatusSP:
						case nsFreshcare.data.grower.subscriptionStatusAD:
						case nsFreshcare.data.grower.subscriptionStatusTE:
						case nsFreshcare.data.grower.subscriptionStatusRM:
						case nsFreshcare.data.grower.subscriptionStatusDR:
						{
							// Special Case - need to check how many completed audits
							oParam.updateMembershipStatusStep = 2;
							oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.updateMembershipStatus.process);
							oParam.xhtmlElementID = oThisElement.id;
							nsFreshcare.admin.certificate.updateMembershipStatus.completedAudits(oParam);

							break;
						}
					}

					if (oParam.updateMembershipStatusStep > 2)
					{
						nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
					}

				}

				// We have a value for the number of Audits so we can work out new Membership Status for Suspended growers
				else if (oParam.updateMembershipStatusStep === 2)
				{
					if ($(oThisElement).attr('data-resultstatus') === nsFreshcare.data.audit.resultStatusPending)
					{	
						oParam.newStatus = (nsFreshcare.admin.certificate.data.completedAudits > 1) ? nsFreshcare.data.grower.subscriptionStatusCP : nsFreshcare.data.grower.subscriptionStatusIP;
					}
					else
					{
						oParam.newStatus = (nsFreshcare.admin.certificate.data.completedAudits > 1) ? nsFreshcare.data.grower.subscriptionStatusCE : nsFreshcare.data.grower.subscriptionStatusIN;
					}

					delete(nsFreshcare.admin.certificate.data.completedAudits);
					oParam.updateMembershipStatusStep = 3;
					nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
				}

				// Now that we've worked out the new status value, let's now process..
				// First we add the transaction record
				else if (oParam.updateMembershipStatusStep === 3)
				{
					// v3.4.015 SUP023981 If Scope Extension, DON'T add row
					if ($(oThisElement).attr('data-auditType') == nsFreshcare.data.audit.typeScopeExtension)
					{
						oParam.newStatus = $(oThisElement).attr('data-subscriptionstatus');
						oParam.updateMembershipStatusStep = 5;		// Update the audit
						nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
					}
					else
					{

						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Adding record of Membership Status change.'});

						sData += '&fromstatus=' + ns1blankspace.util.fs($(oThisElement).attr('data-subscriptionstatus')) +
								 '&tostatus=' + ns1blankspace.util.fs(oParam.newStatus) +
								 '&reason=' + ns1blankspace.util.fs('Updated from Audit Result') +
								 '&subscription=' + ns1blankspace.util.fs($(oThisElement).attr('data-subscription')) +
								 '&changedate=' + ns1blankspace.util.fs($(oThisElement).attr('data-resultStatusDate')) +
								 '&changecontactbusiness=' + ns1blankspace.util.fs($(oThisElement).attr('data-auditContactBusiness')) +
								 '&changecontactperson=' + ns1blankspace.util.fs($(oThisElement).attr('data-auditContactPerson'));

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE'),
							data: sData,
							dataType: 'JSON',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.updateMembershipStatusStep = 4;
									nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
								}
								else
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Error adding record of Membership Status change.',
																errorNotes: oResponse.error.errornotes});
									oParam.updateMembershipStatusStep = 6;
									oParam.successful = false;
									nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
								}
							}
						});
					}
				}

				// Now we update the Subscription record
				else if (oParam.updateMembershipStatusStep === 4)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Updating Membership Status.'});

					sData += ns1blankspace.util.fs($(oThisElement).attr('data-subscription')) +
							'&status=' + ns1blankspace.util.fs(oParam.newStatus) +
							'&laststatuschangedate=' + ns1blankspace.util.fs($(oThisElement).attr('data-resultstatusdate')) +
							'&codeofpractice=' + ns1blankspace.util.fs($(oThisElement).attr('data-auditcodeofpractice'));

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
						data: sData,
						dataType: 'JSON',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.updateMembershipStatusStep = 5;
								nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Error updating Membership Status.',
															errorNotes: oResponse.error.errornotes});
								oParam.updateMembershipStatusStep = 6;
								oParam.successful = false;
								nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
							}
						}
					});

				}

				// Lastly, we update the Audit record and remove the row from the UI
				else if(oParam.updateMembershipStatusStep === 5)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Updating Audit Resulting Membership Status.'});

					var sXHTMLElementID = oThisElement.id;
					sData += ns1blankspace.util.fs(oThisElement.id.split('-')[1]) +
							'&membershipstatus=' + ns1blankspace.util.fs(oParam.newStatus);

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AUDIT_MANAGE'),
						data: sData,
						dataType: 'JSON',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								$('#' + sXHTMLElementID).parent().parent().fadeOut(1000);
								$('#' + sXHTMLElementID).parent().parent().remove();

								oParam.updateMembershipStatusStep = 6;
								oParam.successful = true;
								nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Error updating Audit resulting Membership Status.',
															errorNotes: oResponse.error.errornotes});
								oParam.updateMembershipStatusStep = 6;
								nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
							}
						}
					});

				}

				// Reset values and call the loop again
				else if (oParam.updateMembershipStatusStep === 6)
				{

					delete(oParam.updateMembershipStatusStep);
					oParam.updateStatusIndex = iUpdateStatusIndex + 1;
					if (oParam.successful)		// Process was a succcess, remove status row
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, remove: true});
					}
					else
					{
						oParam.successful = false;
					}

					nsFreshcare.admin.certificate.updateMembershipStatus.process(oParam);
				}
			}
			else
			{
				ns1blankspace.status.message('Processing complete.');
			}

		},

		completedAudits: function(oParam)
		{
			var sXHTMLElementID;

			if (oParam)
			{
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID}
			}

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AUDIT_SEARCH';
			oSearch.addField('reference');
			oSearch.addFilter('contactbusiness', 'EQUAL_TO', $('#' + sXHTMLElementID).attr('data-contactbusiness'));
			oSearch.addFilter('audit.agrisubscription.id', 'EQUAL_TO', $('#' + sXHTMLElementID).attr('data-subscription'));
			oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.audit.statusCompleted);
			oSearch.rows = 2;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					nsFreshcare.admin.certificate.data.completedAudits = oResponse.data.rows.length;
				}
				
				if (oParam && oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			});
		}
	},

	certificatesToBeCreated: 
	{
		search: function(oParam) 
		{
			var oRoot = ns1blankspace.rootnamespace;
			var aMembershipFilter = [];
			
			$('.ns1blankspaceMembership').each(function() {
				if ($(this).attr('data-selected') === '1') {
					aMembershipFilter.push(this.id.split('_')[1]);
				}
			});

			
			if (nsFreshcare.admin.certificate.data == undefined) {nsFreshcare.admin.certificate.data = {}}

			if (oParam)
			{
				if (oParam.certificatesToBeCreatedStep === undefined) {oParam.certificatesToBeCreatedStep = 1}
			}
			else {oParam = {certificatesToBeCreatedStep: 1}}

			// Get the dates that CB's start Self Certification
			if (nsFreshcare.admin.certificate.data.certBodyStartDates === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', oRoot.admin.certificate.certificatesToBeCreated.search);
				nsFreshcare.admin.certificate.getCertificationBodyStartDates(oParam);
			}

			// Search for Certs to be created
			else if (oParam.certificatesToBeCreatedStep === 1)
			{
				// v3.3.001 SUP023565 Added serecertaudtimonth & audit.agrisubscription.membership
				// v3.3.001 Added withdrawndate and paid flag
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'audit';
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.reference,audit.agrisubscription.membership.code,audit.auditbusiness,audit.auditbusinesstext,audit.contactbusinesstext,audit.contactpersontext,audit.type' +
								',audit.agrisubscription.agricertificate.certificatenumber,audit.actualdate,audit.auditpersontext,audit.resultstatusdate,audit.codeofpracticetext' +
								',audit.subscription,audit.agrisubscription.status,audit.contactbusiness,audit.codeofpractice,audit.contactperson,audit.agrisubscription.expirymonth,audit.serecertauditmonth' +
								',audit.codeofpractice.certificateexpiresafter,audit.agrisubscription.codeofpractice,audit.agrisubscription.agricertificate.id,audit.agrisubscription.agricertificate.startdate' +
								',audit.contactperson.firstname,audit.contactperson.surname,audit.agrisubscription.agricertificate.sentdate,audit.agrisubscription.agricertificate.dateissued' +
								',audit.agrisubscription.membership,audit.agrisubscription.withdrawndate,audit.paid' +
								',audit.agrisubscription.firstcertified,audit.seextensionmonths');
				
				// Audit Result Status of Certification Recommended (Completed)
				oSearch.addFilter('resultstatus', 'EQUAL_TO', nsFreshcare.data.audit.resultStatusCompleted);
				
				// Apply Membership filter as selected
				oSearch.addFilter('audit.agrisubscription.membership', 'IN_LIST', aMembershipFilter.join(','));

				// Filter on Auditor Business if not Admin user
				// v3.1.2 SUP022859 Only show JASANZ users audits for the selected CB if set
				if ((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)
					|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz && nsFreshcare.data.viewFilter.certificationBody)) 
				{
					oSearch.addFilter("audit.auditbusiness", "EQUAL_TO", (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? nsFreshcare.data.viewFilter.certificationBody : ns1blankspace.user.contactBusiness));
				}
				else
				{	// v3.0.0 Now shows all of them and allows user to filter by Cert Body
					//oSearch.addFilter('audit.auditbusiness', 'NOT_IN_LIST', nsFreshcare.admin.certificate.data.managedCBs.join(','));
				}

				// v3.3.001 Now filters paid in removeDuplicates area
				//oSearch.addFilter('audit.paid', 'EQUAL_TO', 'Y');
				
				// For Re-certifications, need to have Resulting Membership Status in (5,2) (IN,CE), Subscription Status of 5,2 (IN,CE) and
				// The Audit date after the Certificate date issued of if no certificate, audit after Withdrawn date
				oSearch.addBracket('(');

				oSearch.addBracket('(');

					// CE Audit's Resulting Membership Status
					oSearch.addFilter('audit.membershipstatus', 'IN_LIST', 
										nsFreshcare.data.grower.subscriptionStatusIN + ',' + nsFreshcare.data.grower.subscriptionStatusCE);
					
					// CE / IN Membership Subscription Status
					oSearch.addFilter('audit.agrisubscription.status', 'IN_LIST', 
										nsFreshcare.data.grower.subscriptionStatusIN + ',' + nsFreshcare.data.grower.subscriptionStatusCE);
					
					// Audit Date is after certificate Issue date 
					// If no certificate, actual date must be after most recent withdrawn date OR the SecondLastStatus is IP,CP,AP,AD,SP,FM and this status is CE
					oSearch.addBracket('(');
					oSearch.addFilter('audit.actualdate', 'GREATER_THAN', 'field:audit.agrisubscription.agricertificate.dateissued');
					oSearch.addOperator('or');
						oSearch.addBracket('(');
						oSearch.addFilter('audit.agrisubscription.agricertificate.id', 'IS_NULL');
						oSearch.addOperator('and');
							oSearch.addBracket('(');
							oSearch.addFilter('audit.actualdate', 'GREATER_THAN', 'field:audit.agrisubscription.withdrawndate');
							oSearch.addOperator('or');
								oSearch.addBracket('(');
								// v2.0.4 SUP021471 Added CP, AP, SP, FM
								// v3.1.203 SUP022990 Added AD
								// v3.1.204 SUP023001 Added RM and TE
								// v3.1.206 SUP023057 Added DR
								oSearch.addFilter('audit.agrisubscription.secondlaststatus', 'IN_LIST', 
													nsFreshcare.data.grower.subscriptionStatusIP + ',' + 
													nsFreshcare.data.grower.subscriptionStatusCP + ',' +
													nsFreshcare.data.grower.subscriptionStatusAP + ',' +
													nsFreshcare.data.grower.subscriptionStatusAD + ',' +
													nsFreshcare.data.grower.subscriptionStatusSP + ',' +
													nsFreshcare.data.grower.subscriptionStatusDR + ',' +
													nsFreshcare.data.grower.subscriptionStatusRM + ',' +
													nsFreshcare.data.grower.subscriptionStatusTE + ',' +
													nsFreshcare.data.grower.subscriptionStatusFM);
								oSearch.addOperator('and');
								oSearch.addFilter('audit.membershipstatus', 'EQUAL_TO', nsFreshcare.data.grower.subscriptionStatusCE);
								oSearch.addBracket(')');
							oSearch.addBracket(')');
						oSearch.addBracket(')');
					oSearch.addBracket(')');

				oSearch.addBracket(')');

				oSearch.addOperator('or');


				// For Initial Assessments, need to have Resulting Memberhsip Status = 5 (IN), Subscription Status of 5 (IN) and
				// no Certificate
				// v3.1.2 SUP022693 It is possible to have a certificate if the audit is a Scope Extension
				oSearch.addBracket('(')

					// IN Audit's Resulting Membership Status
					oSearch.addFilter('audit.membershipstatus', 'EQUAL_TO', nsFreshcare.data.grower.subscriptionStatusIN);
					
					// IN Membership Subscription Status
					oSearch.addFilter('audit.agrisubscription.status', 'EQUAL_TO', nsFreshcare.data.grower.subscriptionStatusIN);
					 
					// Certificate doesn't exist or does exist if ScopeExtension audit
					oSearch.addBracket('(');
					oSearch.addFilter('audit.agrisubscription.agricertificate.id', 'IS_NULL');
					oSearch.addOperator('or');
					oSearch.addBracket('(');
					oSearch.addFilter('audit.agrisubscription.agricertificate.id', 'IS_NOT_NULL');
					oSearch.addFilter('audit.type', 'EQUAL_TO', nsFreshcare.data.audit.typeScopeExtension);
					// v4.0.007 SUP024067 Was still showing Scope Extensions audits even if cert had been issued
					//oSearch.addFilter('audit.agrisubscription.agricertificate.dateissued', 'LESS_THAN', dToday.toString('dd MMM yyyy') + ' 00:00:00');
					oSearch.addFilter('audit.actualdate', 'GREATER_THAN', 'field:audit.agrisubscription.agricertificate.dateissued');
					oSearch.addBracket(')');
					oSearch.addBracket(')');

				oSearch.addBracket(')');

				oSearch.addBracket(')');

				if (oParam.sortColumn)
				{
					oSearch.sort(oParam.sortColumn, oParam.sortDirection);
				}
				else
				{
					oSearch.sort('audit.contactbusinesstext', 'asc');
					oSearch.sort('audit.actualdate', 'desc');
				}

				oSearch.rows = 500;		// v3.3.001 Get ALL rows

				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK') 
					{
						nsFreshcare.admin.certificate.certificatesToBeCreated.show(oParam, oResponse);
					}
				});
			}
		},

		show: 	function(oParam, oResponse) 
		{

			// Lists growers who are due to receive a Certificate and allows user to 'create' certificate records

			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Certificates to be Created.';
			var dToday = new Date();
			var sSortColumn = '';
			var sSortDirection;
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.sortColumn != undefined) {sSortColumn = oParam.sortColumn}
				if (oParam.sortDirection!= undefined) {sSortDirection = ((oParam.sortDirection === 'asc') ? 'desc' : 'asc')}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			// Filter on Membership only
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') 
			{

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceCertificatesToBeCreated"><tr>');
				aHTML.push('<td id="ns1blankspaceCertificatesToBeCreatedResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceCertificatesToBeCreatedSearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
						   '<td id="ns1blankspaceCertificatesToBeCreatedFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// v4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceCertificatesToBeCreatedSearchHandle" style="height:25px" title="Search Criteria"></span>');
				if (!nsFreshcare.admin.certificate.readOnly)
				{
					aHTML.push('<span id="ns1blankspaceCertificatesToBeCreatedUpdate" style="height:25px" title="Update"></span>');
				}
				$('#ns1blankspaceCertificatesToBeCreatedSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceCertificatesToBeCreatedSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceCertificatesToBeCreatedStatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Membership</td></tr>');

				$.each(nsFreshcare.data.memberships, function() 
				{
					aHTML.push('<tr><td id="ns1blankspaceMembership_' + this.id + '" ' +
										'class="ns1blankspaceMembership nsFreshcareSelectable nsFreshcareSelected" data-selected="1">' + 
											this.title + 
								'</td></tr>');
				});
				
				aHTML.push('</table>')

				$('#ns1blankspaceCertificatesToBeCreatedFilter').html(aHTML.join(''));

				$('#ns1blankspaceCertificatesToBeCreatedSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() {
					$('#ns1blankspaceCertificatesToBeCreatedSearchHandle').hide();
					$('#ns1blankspaceCertificatesToBeCreatedFilter').show('slide', {direction: 'left'}, 1000);
				});

				// v3.1.2 SUP022859 Radonly can't do any updates, just look
				if (!(nsFreshcare.admin.certificate.readOnly == true))
				{
					$('#ns1blankspaceCertificatesToBeCreatedUpdate').button({
						text: false,
						icons: { primary: 'ui-icon-check'}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() 
					{
						ns1blankspace.container.confirm(
						{
							html: 'Are you sure you want to create the selected Certificates?',
							buttons:
							[
								{
									text: 'Yes',
									click: function()
									{
										// Disable all the check boxes first so user can't change them part way through processing
										$('.ns1blankspaceCertificatesToBeCreatedCheckAll').attr('disabled', true);
										$('.ns1blankspaceCertificateCreateInclude').attr('disabled', true);
										$('#ns1blankspaceCertificatesToBeCreatedUpdate').attr('disabled', true);
										$('#ns1blankspaceCertificatesToBeCreatedSearchHandle').attr('disabled', true);
										$('#ns1blankspaceBootstrapDialog').modal('hide');

										nsFreshcare.admin.certificate.certificatesToBeCreated.process();
		
										$('.ns1blankspaceCertificateCreateInclude').attr('disabled', false);
										$('.ns1blankspaceCertificatesToBeCreatedCheckAll').attr('disabled', false);
										$('#ns1blankspaceCertificatesToBeCreatedUpdate').attr('disabled', false);
										$('#ns1blankspaceCertificatesToBeCreatedSearchHandle').attr('disabled', false);
									}
								},
								{
									text: 'No',
									click: function() {$('#ns1blankspaceBootstrapDialog').modal('hide');}
								}
							]
						});
					});
				}

				$('#ns1blankspaceCertificatesToBeCreatedUpdate').hide();
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

				$('#ns1blankspaceCertificatesToBeCreatedSearch').button({
					label: "Search"
				})
				.click(function() 
				{
					var oRoot = ns1blankspace.rootnamespace;
					ns1blankspace.okToSave = true;

					if ($('.ns1blankspaceMembership[data-selected="1"]').length === 0) {
						$('#ns1blankspaceCertificatesToBeCreatedStatusMessage').html('Please choose at least one Membership.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave) {

						$('#ns1blankspaceCertificatesToBeCreatedFilter').hide({duration: 200, complete: function() {

							$('#ns1blankspaceCertificatesToBeCreatedSearchHandle').show();
							$('#ns1blankspaceCertificatesToBeCreatedUpdate').show();
							$('#ns1blankspaceCertificatesToBeCreatedResults').html(ns1blankspace.xhtml.loading);
							oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.certificate.certificatesToBeCreated.show)
							oRoot.admin.certificate.certificatesToBeCreated.search(oParam);
						}});

					}
					else {
						window.setTimeout('$("#ns1blankspaceCertificatesToBeCreatedStatusMessage").fadeOut(4000)', 7000);
					}
				});

			}

			if (oResponse) 
			{
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No Certificates to be created.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceCertificatesToBeCreatedResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceCertificatesToBeCreatedResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					var sBusinessColumn = (bShowLegalName) ? 'audit.contactbusiness.legalname' : 'audit.contactbusinesstext';

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
						aHTML.push('<table id="ns1blankspaceCertificatesToBeCreated" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditReference"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.reference"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.reference') ? sSortDirection : 'asc') + '">' +
									'Audit Reference</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortMembership"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.membership.code"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.membership.code') ? sSortDirection : 'asc') + '">' +
									'Membership</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortGrowerBusiness"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? sSortDirection : 'asc') + '">' +
									nsFreshcare.data.growerText + ' Business</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortGrower"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactpersontext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.contactpersontext') ? sSortDirection : 'asc') + '">' +
									nsFreshcare.data.growerText + '</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortCertificateNumber"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.agricertificate.certificatenumber"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.agricertificate.certificatenumber') ? sSortDirection : 'asc') + '">' +
									'Certificate Number</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditDate"' +
									' data-column="audit.actualdate"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.actualdate') ? sSortDirection : 'asc') + '"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort">' +
									'Audit Date</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditor"' +
									' data-column="audit.' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) ? 'auditpersontext' : 'auditbusinesstext') + '"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) ? 'auditpersontext' : 'auditbusinesstext')) 
															? sSortDirection 
															: 'asc') + '"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort">' +
									'Auditor</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortCOP"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.codeofpracticetext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.codeofpracticetext') ? sSortDirection : 'asc') + '">' +
									'COP</td>');

					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceMainRowOptionsSelect"' +
								' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top; width: 20px;">' + 
								'<input type="checkbox" class="ns1blankspaceCertificatesToBeCreatedCheckAll ns1blankspaceCertificatesToBeCreated" checked="false">' +
								'</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.admin.certificate.certificatesToBeCreated.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceCertificatesToBeCreatedResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceCertificatesToBeCreatedResults',
						xhtmlContext: 'CertificatesToBeCreated',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: oResponse.rows,
						functionShowRow: nsFreshcare.admin.certificate.certificatesToBeCreated.row,
						functionOnNewPage: nsFreshcare.admin.certificate.certificatesToBeCreated.removeDuplicates,
						type: 'json',
						showLegalName: bShowLegalName
					}); 	
					
					;
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			// v3.1.2 SUP022693 Added auditType, auditBusiness, Cert StartDate & subscriptionExpiryMonth
			// We need to work out if there is already a row on the page for the same contactbusiness + subscription
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['audit.contactbusinesstext'] != oRow['audit.contactbusiness.legalname'])
								? oRow['audit.contactbusiness.legalname'] + '<br />(' + oRow['audit.contactbusinesstext'] + ')'
								: oRow['audit.contactbusinesstext'];
			var aHTML = [];
			var sAuditorName = ((oRow['audit.auditpersontext'].split(', ').length > 1) 
																? oRow['audit.auditpersontext'].split(', ').pop() + ' '
																: '')
								+ oRow['audit.auditpersontext'].split(', ').shift();
			
			aHTML.push('<tr id="ns1blankspaceCertificatesToBeCreatedInclude_row-' + oRow.id + '" class="ns1blankspaceRow"' +
							' data-auditorBusiness="' + oRow['audit.auditbusiness'] + '">');
						
			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_reference-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['audit.reference'] + '</td>');

			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_membership-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['audit.agrisubscription.membership.code'] + '</td>');

			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_business-' + oRow.id + '" class="ns1blankspaceRow">' +
									((bShowLegalName) ? sBusinessName : oRow['audit.contactbusinesstext']) + '</td>');
		
			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_contact-' + oRow.id + '" class="ns1blankspaceRow">' + 
									oRow['audit.contactpersontext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_certificate-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.agrisubscription.agricertificate.certificatenumber'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_auditdate-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.actualdate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_auditor-' + oRow.id + '" class="ns1blankspaceRow">' +
										((nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) ? oRow['audit.auditbusinesstext'] : sAuditorName) +
										'</td>');
		
			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated_cop-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow['audit.codeofpracticetext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceCertificatesToBeCreated-' + oRow.id + '"' +
						' style="color:#B8B8B8; padding:4px; vertical-align:top; width: 20px;">' + 
						'<input type="checkbox" id="ns1blankspaceCertificatesToBeCreatedInclude-' + oRow.id + '"' +
						' class="ns1blankspaceCertificateCreateInclude" ' +
						' checked="false"' +
						' data-contactBusiness="' + oRow['audit.contactbusiness'] + '"' +
						' data-contactPerson="' + oRow['audit.contactperson'] + '"' +
						' data-contactBusinessText="' + oRow['audit.contactbusinesstext'] + '"' +
						' data-growerFirstName="' + oRow['audit.contactperson.firstname'] + '"' +
						' data-growerSurname="' + oRow['audit.contactperson.surname'] + '"' +
						' data-growerEmail="' + oRow['audit.contactperson.email'] + '"' +
						' data-subscription="' + oRow['audit.subscription'] + '"' +
						' data-subscriptionCOP="' + oRow['audit.agrisubscription.codeofpractice'] +  '"' +
						' data-auditDate="' + oRow['audit.actualdate'] + '"' +
						' data-audit="' + oRow['id'] + '"' +
						' data-membership="' + oRow['audit.agrisubscription.membership'] + '"' +
						' data-auditAuditor="' + sAuditorName + '"' +
						' data-auditBusiness="' + oRow['audit.auditbusiness'] + '"' +
						' data-certificateExpiryMonths="' + oRow['audit.codeofpractice.certificateexpiresafter'] + '"' +
						' data-certificate="' + oRow['audit.agrisubscription.agricertificate.id'] + '"' +
						' data-certificateNumber="' + oRow['audit.agrisubscription.agricertificate.certificatenumber'] + '"' +
						' data-certificateStart="' + oRow['audit.agrisubscription.agricertificate.startdate'] + '"' +
						' data-resultStatusDate="' + oRow['audit.resultstatusdate'] + '"' +
						' data-auditCOP="' + oRow['audit.codeofpractice'] + '"' +
						' data-auditType="' + oRow['audit.type'] + '"' +
						' data-subscriptionExpiryMonth="' + oRow['audit.agrisubscription.expirymonth'] + '"' +
						' data-optingToPrint="' + oRow['audit.contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 'text'] + '"' +
						' data-recertauditmonth="' + oRow['audit.serecertauditmonth'] + '"' +
						' data-withdrawnDate="' + oRow['audit.agrisubscription.withdrawndate'] + '"' +
						' data-firstcertified="' + oRow['audit.agrisubscription.firstcertified'] + '"' +
						' data-paid="' + oRow['audit.paid'] + '"' +
						' data-fullCertdata="' + oRow['audit.sefullcertdata'] + '"' +
						' data-extensionmonths="' + oRow['audit.seextensionmonths'] + '"' + 
					'></td>');

			return aHTML.join('');
		},

		removeDuplicates: function()
		{
			// We have to remove any rows that have the same contactbusiness and subscription. Remove any after the first one
			// v3.3.001 Single query was including audits prior to withdrawn date if no certificate. Filter for audit paid and
			//          determining whether audit is after withdrawn date is included here to catch all scenarios
			var sPreviousContactBusiness = '';
			var sPreviousSubscription = '';

			$.each($('tr.ns1blankspaceRow'), function() 
			{
				var bRemove = false;
				var oIncludeElement = $(this).children().last().children().first();
				var dAudit = new Date($(oIncludeElement).attr('data-auditdate'));
				var dWithdrawn = ($(oIncludeElement).attr('data-withdrawnDate')) ? new Date($(oIncludeElement).attr('data-withdrawnDate')) : undefined;

				// Remove rows where not Paid 
				if ($(oIncludeElement).attr('data-paid') == 'N')
				{
					bRemove = true;	
				}
				else if (dWithdrawn)
				{	// Remove rows where audit is prior to withdrawn date in case query has picked these up as part of the OR
					if (dAudit <= dWithdrawn)
					{
						bRemove = true;
					}
				}

				// We only want the first row - sorted by reverse chronological order
				if (sPreviousContactBusiness + sPreviousSubscription === 
					$(oIncludeElement).attr('data-contactbusiness') + $(oIncludeElement).attr('data-subscription'))
				{
					bRemove = true;	
				}

				if (bRemove)
				{
					$(this).remove();
				}

				sPreviousContactBusiness = $(oIncludeElement).attr('data-contactbusiness');
				sPreviousSubscription = $(oIncludeElement).attr('data-subscription');
			});

			nsFreshcare.admin.certificate.certificatesToBeCreated.bind();
		},

		bind: 	function()
		{
			// v2.0.4m SUP021838 Check All button was being bound by id which wasn't unique
			$('.ns1blankspaceCertificatesToBeCreated').unbind('click');
			$('.ns1blankspaceCertificatesToBeCreated').click(function()
			{
				if ($(this).prop('checked'))
				{
					$('input.ns1blankspaceCertificateCreateInclude').prop('checked', true);
				}
				else
				{
					$('input.ns1blankspaceCertificateCreateInclude').prop('checked', false);
				}
			});

			// v3.3.002 SUP023800 Only bind td, not tr
			$('td.ns1blankspaceRow:visible')
				.css('cursor', 'pointer')
				.css('width', '15px')
				.css('height', '18px')
				.click(function()
				{
					window.open(document.location.origin + '/#/nsFreshcare-admin.audit/id:' + this.id.split('-').pop());
				});

			$('.ns1blankspaceHeaderSort:visible')
				.css('cursor', 'pointer')
				.click(function()
				{
					var oRoot = ns1blankspace.rootnamespace;
					var oParam = {};
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					oRoot.admin.certificate.certificatesToBeCreated.search(oParam);
				});
		},
		
		process: function(oParam)
		{
			// 'Create' the certificates
			// For new Certificates:
			// 		Determine certificate number (either new number if no Certs at all or get number from another membership)
			//		Create Certificate record - startdate, dateissued, enddate, sent (N)
			//		Update Subscription record - firstcertified, COP
			// For Existing Certificates
			//		Update Certificate record - dateissued, enddate, sent(N)
			//		Update Subscription record if Audit COP is higher than Subscription COP
			//
			// Date Issued is set to system date
			// Enddate is set to last day of month as specific on audit.agrisubscription.expirymonth or Audit Date + x months as per COP record if expirymonth is blank

			var dToday = new Date();
			var sData = 'id=';
			var iCreateCertificatesIndex = -1;
			var oRoot = ns1blankspace.rootnamespace;

			if (nsFreshcare.admin.certificate.data == undefined) {nsFreshcare.admin.certificate.data = {}}

			if (oParam)
			{
				if (oParam.certificatesToBeCreatedStep === undefined) {oParam.certificatesToBeCreatedStep = 1}
				if (oParam.createCertificatesIndex != undefined) {iCreateCertificatesIndex = oParam.createCertificatesIndex}
				if (oParam.successful === undefined) {oParam.successful = false;}
			}
			else 
			{	
				oParam = {certificatesToBeCreatedStep: 1, createCertificatesIndex: -1}
			}

			if (iCreateCertificatesIndex === -1)
			{
				nsFreshcare.admin.certificate.data.createCertificatesChecked = $("input.ns1blankspaceCertificateCreateInclude:checked");
				iCreateCertificatesIndex = 0;
				oParam.createCertificatesIndex = 0;
				ns1blankspace.status.clear();
			}	


			// Loop through each selected row
			if (iCreateCertificatesIndex < nsFreshcare.admin.certificate.data.createCertificatesChecked.length)
			{
				var oThisElement = nsFreshcare.admin.certificate.data.createCertificatesChecked[iCreateCertificatesIndex];

				// Check to see if record has required information 
				if (oParam.certificatesToBeCreatedStep === 1)
				{
					// reset the data at the beginning of each loop
					nsFreshcare.admin.certificate.data.certificateNumber = undefined;			
					nsFreshcare.admin.certificate.data.certificateId = undefined;			

					nsFreshcare.admin.certificate.data.contactBusiness = $(oThisElement).attr('data-contactBusiness');
					nsFreshcare.admin.certificate.data.contactBusinessText = $(oThisElement).attr('data-contactBusinessText');
					nsFreshcare.admin.certificate.data.subscription = $(oThisElement).attr('data-subscription');
					nsFreshcare.admin.certificate.data.cropsValid = true;
					nsFreshcare.admin.certificate.data.subscriptionExpiryMonth = undefined;
					nsFreshcare.admin.certificate.data.auditExpiryMonth = undefined;
					nsFreshcare.admin.certificate.data.firstCertified = $(oThisElement).attr('data-firstcertified');

					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Checking for mandatory information.'});
					oParam.thisElement = oThisElement;

					if ($(oThisElement).attr('data-contactbusiness'))
					{
						oRoot.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
					}
					else
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
													errorMessage: 'Can not find ' + nsFreshcare.data.growerText + ' business.'});
						oParam.certificatesToBeCreatedStep = 10;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				}

				// Get Certificate Number and id of Certificate record if existing
				else if (oParam.certificatesToBeCreatedStep === 2)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Establishing ' + nsFreshcare.data.growerText + '\'s Certificate number.'});
					oParam.certificatesToBeCreatedStep = 21;

					// 3.0.1 SUP021724  Was not setting certificate id and ends up as undefined later
					if ($(oThisElement).attr('data-certificate') != '')
					{
						nsFreshcare.admin.certificate.data.certificateId = $(oThisElement).attr('data-certificate');
					}
					if ($(oThisElement).attr('data-certificateNumber') === '' && nsFreshcare.admin.certificate.data.certificateNumber === undefined)
					{
						// Go and find the CertificateNumber
						oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.certificatesToBeCreated.process);
						oParam.thisElement = oThisElement;
						oRoot.admin.certificate.certificatesToBeCreated.certificateNumber(oParam);
					}
					else
					{
						// Get the CertificateId
						if ($(oThisElement).attr('data-certificateNumber') === '')
						{	$(oThisElement).attr('data-certificateNumber') === nsFreshcare.admin.certificate.data.certificateNumber}
						else
						{	nsFreshcare.admin.certificate.data.certificateNumber === $(oThisElement).attr('data-certificateNumber') === ''}

						nsFreshcare.admin.certificate.data.certificateNumber = $(oThisElement).attr('data-certificateNumber');

						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_CERTIFICATE_SEARCH';
						oSearch.addField('certificatenumber');
						oSearch.addFilter('subscription', 'EQUAL_TO', nsFreshcare.admin.certificate.data.subscription);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
							{
								nsFreshcare.admin.certificate.data.certificateId = oResponse.data.rows[0].id;
							}
							else if (oResponse.status != 'OK')
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Error finding existing Certificate id.',
															errorNotes: oResponse.error.errornotes});
								oParam.certificatesToBeCreatedStep = 10;
							}
							
							nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
						});
						
					}
				}

				
				// v3.1.2 SUP022693 Get values for auditor.selfCert if undefined or not on correct business
				else if (oParam.certificatesToBeCreatedStep == 21)
				{
					if (nsFreshcare.data.auditor === undefined || nsFreshcare.data.auditor.contactBusiness == undefined
						|| nsFreshcare.data.auditor.contactBusiness != $(oThisElement).attr('data-auditBusiness'))
					{
						nsFreshcare.data.auditor = {}; 	// v4.0.001 SUP024039 Clear these out if different business
						ns1blankspace.util.setParam(oParam, 'onCompleteWhenCan', oParam.onComplete);
						ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.certificatesToBeCreated.process);
						oParam.certificationBody = $(oThisElement).attr('data-auditBusiness');
						oParam.certificatesToBeCreatedStep = 3;
						nsFreshcare.control.getCertificationBodyOptions(oParam);
					}
					else
					{
						oParam.certificatesToBeCreatedStep = 3;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				}

				// Update / Add Certificate record
				else if (oParam.certificatesToBeCreatedStep === 3)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Creating Certificate record.'});
					if (nsFreshcare.admin.certificate.certificatesToBeCreated.alternateCreateCertificate != undefined)
					{
						oParam.certificatesToBeCreatedStep = 4;
						oParam.thisElement = oThisElement;
						nsFreshcare.admin.certificate.certificatesToBeCreated.alternateCreateCertificate(oParam);
					}
					else
					{
						// Work out expiry date - AuditDate + ExpiryMonths + 28 days if expiryMonth is blank
						// If expiryMonth is set, use last day of Expiry Month
						// v3.3.001 SUP023563 If recertauditmonth set on Audit, use this - otherwise use expirymonths from subscription
						// v4.0.012 SUP024144 Added ExtensionGranted
						var dAudit = new Date($(oThisElement).attr('data-auditDate'));
						var iExpiryAnniversary = ($(oThisElement).attr('data-recertauditmonth') != ''
													? parseInt($(oThisElement).attr('data-recertauditmonth'))
													: ($(oThisElement).attr('data-subscriptionExpiryMonth') != '' 
														? parseInt($(oThisElement).attr('data-subscriptionExpiryMonth')) 
														: 0)
												 );

						var dExpiry = nsFreshcare.admin.certificate.certificateGetExpiry(
						{
							auditDate: (new Date($(oThisElement).attr('data-auditDate'))),
							expiry: (new Date($(oThisElement).attr('data-auditDate'))),
							expiryMonths: parseInt($(oThisElement).attr('data-certificateExpiryMonths')),
							expiryAnniversary: iExpiryAnniversary,
							extensionMonths: $(oThisElement).attr('data-extensionmonths')
						});

						iExpiryAnniversary = (iExpiryAnniversary == 0 ? (dExpiry.getMonth() + 1) : iExpiryAnniversary);

						if (nsFreshcare.admin.certificate.data.certificateId != undefined && nsFreshcare.admin.certificate.data.certificateId != '')
						{	
							sData += nsFreshcare.admin.certificate.data.certificateId;
							// SUP021724 3.0.1 Now updates certificate number as well if blanks - and similarly updates the startdate, etc
							// v3.1.2 Was updating startdate with auditid insted of existing startdate
							 if (nsFreshcare.admin.certificate.data.certificateNumber != undefined && nsFreshcare.admin.certificate.data.certificateNumber != '')
							 {	
							 	sData += '&startdate=' + ns1blankspace.util.fs(($(oThisElement).attr('data-certificateStart')) ? $(oThisElement).attr('data-certificateStart') : dToday.toString('dd MMM yyyy')) +
										'&subscription=' + nsFreshcare.admin.certificate.data.subscription + 
										'&certificatenumber=' + ns1blankspace.util.fs(nsFreshcare.admin.certificate.data.certificateNumber);
							 }
						}
						else	// New certificate - set startdate & subscription id
						{
							// 2.0.4l Added certificatenumber - was not being populated
							sData += '&startdate=' + ns1blankspace.util.fs(dToday.toString('dd MMM yyyy')) +
									'&subscription=' + nsFreshcare.admin.certificate.data.subscription;
							if (nsFreshcare.admin.certificate.data.certificateNumber != '' && nsFreshcare.admin.certificate.data.certificateNumber != undefined)
							{ 	
								sData += '&certificatenumber=' + ns1blankspace.util.fs(nsFreshcare.admin.certificate.data.certificateNumber);
							}
						}

						// v3.1.2 SUP022693 Don't change Expiry Date if a Scope Extension Audit 
						sData += '&sent=N' +
								 '&dateissued=' + ns1blankspace.util.fs(dToday.toString('dd MMM yyyy')) +
								 '&audit=' + $(oThisElement).attr('data-audit') + 
								 ($(oThisElement).attr('data-auditType') != nsFreshcare.data.audit.typeScopeExtension 
								 	? '&enddate=' + ns1blankspace.util.fs(dExpiry.toString('dd MMM yyyy')) 
								 	: '');

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
							data: sData,
							dataType: 'JSON',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.certificatesToBeCreatedStep = 4;
									// v3.1.2 SUP022693 Only save iExpiryAnniversary when not previously set
									if (iExpiryAnniversary != 0 && $(oThisElement).attr('data-subscriptionExpiryMonth') == '')
									{
										nsFreshcare.admin.certificate.data.subscriptionExpiryMonth = iExpiryAnniversary;
									}
									// v3.3.001 SUP023563 Set auditrecertmonth when not already set
									if (iExpiryAnniversary != 0 && $(oThisElement).attr('data-recertauditmonth') == '')
									{
										nsFreshcare.admin.certificate.data.auditExpiryMonth = iExpiryAnniversary;	
									}
								}
								else
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Error creating/updating Certificate record.',
																errorNotes: oResponse.error.errornotes});
									oParam.certificatesToBeCreatedStep = 10;
								}
								nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
							}

						});
					}
				}

				
				// Update Subscription record
				else if (oParam.certificatesToBeCreatedStep === 4)
				{
					
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Updating membership subscription.'});
					sData += nsFreshcare.admin.certificate.data.subscription;

					// Add FirstCertified for new Certificates
					// v3.4.001 Now cecks to see if Subscription's FirstCertified field is already set
					if (nsFreshcare.admin.certificate.data.certificateId === undefined && nsFreshcare.admin.certificate.data.firstCertified == '')
					{
						sData += '&firstcertified=' + ns1blankspace.util.fs($(oThisElement).attr('data-auditDate'));
					}

					// If the COP on the Audit is higher than the COP on the subscription
					if ($(oThisElement).attr('data-subscriptionCOP') < $(oThisElement).attr('data-auditCOP') 
						|| $(oThisElement).attr('data-subscriptionCOP') === '')
					{
						sData += '&codeofpractice=' + ns1blankspace.util.fs($(oThisElement).attr('data-auditCOP'));
					}

					// v3.1.2 SUP022693 If subscriptionExpiryMonth is defined, we need to update the subscription.expirymonth
					if (nsFreshcare.admin.certificate.data.subscriptionExpiryMonth)
					{
						sData += '&expirymonth=' + nsFreshcare.admin.certificate.data.subscriptionExpiryMonth;
					}

					oParam.certificatesToBeCreatedStep = 5;

					if (sData.split('&').length > 1)
					{
						// Only call the Manage if there's something to update..
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
							data: sData,
							dataType: 'JSON',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									$(oThisElement).parent().parent().fadeOut(1000);
									$(oThisElement).parent().parent().remove();
									oParam.successful = true;
								}
								else
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Error updating Membership subscription record.',
																errorNotes: oResponse.error.errornotes});
								}
								nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
							}
						});
					}
					else
					{
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				}

				// Update Audit record
				else if (oParam.certificatesToBeCreatedStep === 5)
				{
					oParam.certificatesToBeCreatedStep = 10;
					// v3.3.001 SUP023563 Update Audit.serecertauditmonth if auditExpiryMonth has been set
					// v3.4.015 SUP023981 Update seFullCertData flag if COP has been updated and it's a Scope Extension audit
					if (nsFreshcare.admin.certificate.data.auditExpiryMonth
						|| ($(oThisElement).attr('data-auditType') == nsFreshcare.data.audit.typeScopeExtension
							&& $(oThisElement).attr('data-auditCOP') != $(oThisElement).attr('data-subscriptionCOP')))
					{
						var sData = 'id=' + $(oThisElement).attr('data-audit');
						if (nsFreshcare.admin.certificate.data.auditExpiryMonth)
						{
							sData += '&serecertauditmonth=' + nsFreshcare.admin.certificate.data.auditExpiryMonth;
						}
						if ($(oThisElement).attr('data-auditType') == nsFreshcare.data.audit.typeScopeExtension
							&& $(oThisElement).attr('data-auditCOP') != $(oThisElement).attr('data-subscriptionCOP'))
						{
							sData += '&sefullcertdata=Y' ;
						}
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AUDIT_MANAGE'),
							data: sData,
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Audit\'s Re-cert Audit month updated'});
									oParam.successful = true;
								}
								else
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Error updating Audit\s Re-Cert Audit month.',
																errorNotes: oResponse.error.errornotes});
								}
								nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
							}
						});
					}
					else
					{
						oParam.successful = true;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				}

				// Reset values and go through loop again
				else if (oParam.certificatesToBeCreatedStep === 10)
				{
					delete(oParam.certificatesToBeCreatedStep);
					delete(oParam.thisElement);
					oParam.createCertificatesIndex = iCreateCertificatesIndex + 1;
					if (oParam.successful)		// Process was a succcess, remove status row
					{
						$(oThisElement).parent().parent().fadeOut(1000);
						$(oThisElement).parent().parent().remove();
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, remove: true});
					}
					delete(oParam.successful);

					nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
				}
			}

		},

		validateCertificateData: function(oParam)
		{
			// v3.1.0b Was erroring as didn't have oThisElement
			oParam = oParam || {};
			var oThisElement = ns1blankspace.util.getParam(oParam, 'thisElement').value;
			var dAudit = new Date($(oThisElement).attr('data-auditdate'));
			oParam.validateCertificateDataStep = oParam.validateCertificateDataStep || 1;
			// Certificates cannot be created if the following information is missing:
			// Trading name
			// Legal name
			// Scope
			// Category
			// Site address
			// Crops - and crops must all be valid values. 
			// Re-Certification Audit Due
			// Also Cannot be created if audit is more than 60 days prior to re-cert audit due month - v3.3.001 SUP023563

			// v3.1.0e SUP021974 We now validate crops so need crop data first
			if (oParam.validateCertificateDataStep == 1)
			{
				oParam.validateCertificateDataStep = 2;
				var oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == $(oThisElement).attr('data-membership')}).shift();
				oParam.cropsTable = oStandard.secropslookup;
				if (nsFreshcare.data.crops === undefined)
				{
					// v3.3.001 SUP023456 Need to make sure we're looking up the correct crops table
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData);
					nsFreshcare.admin.grower.membership.crops.getList(oParam);
				}
				else
				{
					nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
				}
			}
			
			// Get business & subscription data
			else if (oParam.validateCertificateDataStep == 2)
			{
				oParam.validateCertificateDataStep = 3;
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.tradename,contactbusiness.legalname,contactbusiness.streetaddress1,contactbusiness.addresslink.address.addresssuburb' +
								',contactbusiness.agrisubscription.crop,contactbusiness.agrisubscription.expirymonth' +
								',contactbusiness.agrisubscription.agriproductgroup.productcategorytext');
				oSearch.addFilter('contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
				oSearch.addFilter('contactbusiness.agrisubscription.id', 'EQUAL_TO', nsFreshcare.admin.certificate.data.subscription);
				oSearch.addFilter('id', 'EQUAL_TO', $(oThisElement).attr('data-contactbusiness'));
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.validateCertificateData = oResponse.data.rows[0];
							nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
						}
						else
						{	// v3.3.001 Changed so that the error is more meaningful
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
														errorMessage: 'Certificate cannot be created: ' +
																		'Please check that the ' + nsFreshcare.data.growerText + ' has a primary site address and a primary contact.'});
							oParam.certificatesToBeCreatedStep = 10;
							nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
						}
					}
					else
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
													errorMessage: 'Error checking mandatory information.',
													errorNotes: oResponse.error.errornotes});
						delete(oParam.validateCertificateData);
						oParam.certificatesToBeCreatedStep = 10;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				});
			}

			// Get Product Category data
			// v3.1.2 Now searches for child records 
			else if (oParam.validateCertificateDataStep == 3)
			{
				//oParam.validateCertificateData && oParam.validateCertificateData.categories == undefined)
				oParam.validateCertificateDataStep = 4;
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
				oSearch.addField('productcategorytext');
				oSearch.addFilter('subscription', 'EQUAL_TO', nsFreshcare.admin.certificate.data.subscription);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.validateCertificateData.categories = oResponse.data.rows;
						nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
					}
					else
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
													errorMessage: 'Error checking mandatory information.',
													errorNotes: oResponse.error.errornotes});
						delete(oParam.validateCertificateData);
						oParam.certificatesToBeCreatedStep = 10;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				});
			}

			// Get Scope data
			// v3.1.2 Now searches for child records 
			else if (oParam.validateCertificateDataStep == 4)
			{
				//oParam.validateCertificateData && oParam.validateCertificateData.scopes == undefined)
				oParam.validateCertificateDataStep = 5;
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('scopetext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', nsFreshcare.admin.certificate.data.subscription);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.validateCertificateData.scopes = oResponse.data.rows;
						nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
					}
					else
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
													errorMessage: 'Error checking mandatory information.',
													errorNotes: oResponse.error.errornotes});
						delete(oParam.validateCertificateData);
						oParam.certificatesToBeCreatedStep = 10;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				});
			}

			// Get Site data
			// v3.1.2 Now searches for child records 
			else if (oParam.validateCertificateDataStep == 5)
			{
				//oParam.validateCertificateData && oParam.validateCertificateData.sites == undefined
				oParam.validateCertificateDataStep = 6;
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('address1,address2,addresssuburb');
				oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('address.addresslink.objectcontext', 'EQUAL_TO', nsFreshcare.admin.certificate.data.subscription);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.validateCertificateData.sites = oResponse.data.rows;
						nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
					}
					else
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
													errorMessage: 'Error checking mandatory information.',
													errorNotes: oResponse.error.errornotes});
						delete(oParam.validateCertificateData);
						oParam.certificatesToBeCreatedStep = 10;
						nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
					}
				});
			}

			// Check if audit has a Recert Audit late note
			else if (oParam.validateCertificateDataStep == 6)
			{
				// v3.3.001 SUP023563 Now checks audit date compared to re-cert audit month
				// v3.4.015 SUP023981 Don't check if scope extension
				// v4.0.012 SP024144 Added extensionMonths
				oParam.validateCertificateDataStep = 7;
				if ($(oThisElement).attr('data-auditType') != nsFreshcare.data.audit.typeScopeExtension)
				{
					oParam.validateCertificateData.anniversaryCheck = nsFreshcare.admin.certificate.certificateGetExpiry(
					{
						auditDate: new Date($(oThisElement).attr('data-auditdate')),
						expiryMonths: parseInt($(oThisElement).attr('data-certificateexpirymonths')),
						expiryAnniversary: $(oThisElement).attr('data-recertauditmonth') || $(oThisElement).attr("data-subscriptionexpirymonth"),
						anniversaryStatus: true,
						extensionMonths: $(oThisElement).attr('data-extensionmonths'),
					});

					if (oParam.validateCertificateData.anniversaryCheck.status == 1
						|| oParam.validateCertificateData.anniversaryCheck.status == 2
						|| oParam.validateCertificateData.anniversaryCheck.status == 4)
					{	// We're just after the anniversary month - check if user has entered a note
						// v3.4.010 SUP023939 Added Other Reason note type to list to be searched
						// v4.0.013 SPU024144 Search for Certificate Extension note if == 4
						var oSearch = new AdvancedSearch();
						oSearch.method = 'ACTION_SEARCH';
						oSearch.addField('id,actiontype,actiontypetext,description');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', $(oThisElement).attr('data-audit'));
						oSearch.addFilter('actiontype', 'IN_LIST', 
							(oParam.validateCertificateData.anniversaryCheck.status == 4)
								? nsFreshcare.data.actionTypeCertificateExtension
								: nsFreshcare.data.actionTypeRecertAuditLate + ',' + nsFreshcare.data.actionTypeOtherReason
							);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{	// We found a note - remove the message and change status to 0 as it's OK to continue
									oParam.validateCertificateData.anniversaryCheck.status = 0;
									delete(oParam.validateCertificateData.anniversaryCheck.message);
								}
								nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Error checking for re-cert audit late note.',
															errorNotes: oResponse.error.errornotes});
								delete(oParam.validateCertificateData);
								oParam.certificatesToBeCreatedStep = 10;
								nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
							}
						});
					}
					else
					{
						nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
					}
				}
				else
				{
					nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
				}
			}

			// Determine if crops are valid
			else if (oParam.validateCertificateDataStep == 7)
			{
				oParam.validateCertificateDataStep = 10;
				if (oParam.validateCertificateData['contactbusiness.agrisubscription.crop'] != '')
				{
					oParam.validateOnly = true;
					oParam.values = oParam.validateCertificateData['contactbusiness.agrisubscription.crop'];
					oParam.onComplete = nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData;
					nsFreshcare.admin.grower.membership.crops.show(oParam);
				}
				else
				{
					nsFreshcare.admin.certificate.certificatesToBeCreated.validateCertificateData(oParam);
				}
			}

			// Check all relevant values have been added
			else if (oParam.validateCertificateDataStep == 10)
			{
				//oParam.validateCertificateData && oParam.validateCertificateData.categories 
				//&& oParam.validateCertificateData.scopes && oParam.validateCertificateData.sites)
				// Check that values are populated
				var oRow = oParam.validateCertificateData;
				var aErrorMessage = [];
				
				if (oRow['contactbusiness.tradename'] === '')
				{
					aErrorMessage.push('Trading Name');
				}

				if (oRow['contactbusiness.legalname'] === '')
				{
					aErrorMessage.push('Legal Name');
				}
				
				// v3.1.2 SUP022744 CHanged to look at sites linked to subscription for correct validation
				if (oRow.sites.length == 0 ||
					$.grep(oRow.sites, function(x) {return (x.address1 + x.address2 + x.addresssuburb) != ''}).length == 0)
				{
					aErrorMessage.push('Site Address');
				}
				
				// v3.3.001 Can use Re-Cert Audit Month on audit too. SUP023474 No longer JASANZ only
				if (oRow['contactbusiness.agrisubscription.expirymonth'] === '' 
					&& oThisElement && $(oThisElement).attr('data-recertauditmonth') == '' )
				{
					aErrorMessage.push('Re-Certification Audit Due');
				}
				
				if ($(oThisElement).attr('data-resultstatusdate') == '')
				{
					aErrorMessage.push('Result Status Date');
				}

				if (oRow['contactbusiness.agrisubscription.crop'] === '')
				{
					aErrorMessage.push('Crops');
				}
				
				if (oRow.scopes.length == 0)
				{
					aErrorMessage.push('Scope');	
				}
				
				if (oRow.categories.lenth === 0)
				{
					aErrorMessage.push('Category');
				}

				if (aErrorMessage.length > 0)
				{
					aErrorMessage[0] = 'The following grower details are blank: ' + aErrorMessage[0];
				}

				// v3.1.0e SUP021974 Crops must be valid values
				if (nsFreshcare.admin.certificate.data.cropsValid === false)
				{
					aErrorMessage.push('Some or all Crop values are invalid.');
				}

				// v3.3.001 SUP023563 Now adds message if anniversary date incorrect
				if (oParam.validateCertificateData.anniversaryCheck && oParam.validateCertificateData.anniversaryCheck.status > 0)
				{
					aErrorMessage.push(oParam.validateCertificateData.anniversaryCheck.message);
				}

				if (aErrorMessage.length > 0)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
												errorMessage: 'Certificate cannot be created: ' + aErrorMessage.join(', ') + '.'});
					oParam.certificatesToBeCreatedStep = 10;
				}
				else
				{
					oParam.certificatesToBeCreatedStep = 2;
				}
				delete(oParam.validateCertificateData);
				delete(oParam.validateCertificateDataStep); 		// v3.4.007 Was returning back to step 10 instead of step 1
				nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
			}
			
			// Something went wrong - display error
			else
			{
				nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
											errorMessage: 'Error checking mandatory information.',
											errorNotes: 'Some information is missing or invalid'});
				delete(oParam.validateCertificateData);
				delete(oParam.validateCertificateDataStep);
				oParam.certificatesToBeCreatedStep = 10;
				nsFreshcare.admin.certificate.certificatesToBeCreated.process(oParam);
			}
		},

		certificateNumber: function(oParam)
		{
			// New Certificate number is determined by:
			//		First two characters of membership.reference +
			//		First digit of the Grower's Street Postcode
			//		0 - padded Grower's reference number (padded to the left)
			var oThisElement;

			if (oParam)
			{
				if (oParam.certificateNumberStep === undefined) {oParam.certificateNumberStep = 1}
				if (oParam.thisElement != undefined) {oThisElement = oParam.thisElement}
			}
			else {oParam = {certificateNumberStep : 1}}

			// See if another certificate exists on another subscription for this grower and if so, use that Certificate number
			if (oParam.certificateNumberStep === 1)
			{

				nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Checking for existing Certificate.'});

				// v2.0.4o Removed second call - get all the info we need in one call
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('agrisubscription.agricertificate.certificatenumber,agrisubscription.membership.reference' +
								',agrisubscription.contactbusiness.streetpostcode,agrisubscription.contactbusiness.reference');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', nsFreshcare.admin.certificate.data.contactBusiness);
				//oSearch.addFilter('id', 'NOT_EQUAL_TO', nsFreshcare.admin.certificate.data.subscription);		
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							var aCertificates = $.map($.grep(oResponse.data.rows, function(x) 
															{return x['agrisubscription.agricertificate.certificatenumber'] })
												 	 , function(y) 
												   		{ return y['agrisubscription.agricertificate.certificatenumber']}
												  	 );
							if (aCertificates.length > 0)
							{
								nsFreshcare.admin.certificate.data.certificateNumber = aCertificates.shift();
							}
							else
							{
								var sCertificateNumber = oResponse.data.rows[0]['agrisubscription.membership.reference'].substr(0,2) +
														oResponse.data.rows[0]['agrisubscription.contactbusiness.streetpostcode'].substr(0,1);

								var sCertificateSuffix = oResponse.data.rows[0]['agrisubscription.contactbusiness.reference'];
								for (var i = sCertificateSuffix.length; i < 5; i++)
								{
									sCertificateSuffix = '0' + sCertificateSuffix;
								}

								nsFreshcare.admin.certificate.data.certificateNumber = sCertificateNumber + sCertificateSuffix;
							}
						}

						oParam.certificateNumberStep = 2;
						if (nsFreshcare.admin.certificate.data.certificateNumber === undefined)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
														errorMessage: 'Error generating new Certificate number.',
														errorNotes: oResponse.error.errornotes});
							oParam.certificatesToBeCreatedStep = 10;
						}
					}
					else
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
													errorMessage: 'Error searching for existing Certificate.',
													errorNotes: oResponse.error.errornotes});
						oParam.certificatesToBeCreatedStep = 10;
						oParam.certificateNumberStep = 2;
					}
					
					nsFreshcare.admin.certificate.certificatesToBeCreated.certificateNumber(oParam);
				});
			}

			
			// Call back
			else if (oParam.certificateNumberStep === 2)
			{
				if (oParam.onComplete)
				{
					delete(oParam.certificateNumberStep);
					delete(oParam.thisElement);

					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	certificatesToSend:
	{
		search: function(oParam) 
		{
			var sEmailFilter;
			var oRoot = ns1blankspace.rootnamespace;
	
			if (oParam)
			{
				if (oParam.emailOption) {sEmailFilter = oParam.emailOption}
				if (oParam.certificatesToSendStep === undefined) {oParam.certificatesToSendStep = 1}
			}
			else {oParam = {certificatesToSendStep: 1}}

			// Get the dates that CB's start Self Certification
			if (nsFreshcare.admin.certificate.data.certBodyStartDates === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', oRoot.admin.certificate.certificatesToSend.search);
				nsFreshcare.admin.certificate.getCertificationBodyStartDates(oParam);
			}

			// Search for Unsent Certificates
			else if (oParam.certificatesToSendStep === 1)
			{
				// v2.0.4b SUP021507 audit.action.createddate was included which would show growers twice if more than one action.
				// v3.1.2 Added type, auditbusiness & expirymonth
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'audit';
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.reference,audit.agrisubscription.membership.code,audit.auditbusiness,audit.auditbusinesstext,audit.contactbusinesstext,audit.contactpersontext,audit.contactperson' +
								',audit.agrisubscription.agricertificate.certificatenumber,audit.actualdate,audit.auditpersontext,audit.resultstatusdate,audit.codeofpracticetext,audit.type' +
								',audit.agrisubscription.id,audit.agrisubscription.status,audit.contactbusiness,audit.codeofpractice,audit.agrisubscription.agricertificate.id' +
								',audit.contactperson.email,audit.contactperson.firstname,audit.contactperson.surname,audit.contactbusiness.legalname,audit.agrisubscription.expirymonth' +
								',audit.agrisubscription.membership,audit.auditbusiness,audit.contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 'text' +
								',audit.agrisubscription.agricertificate.dateissued,audit.agrisubscription.agricertificate.sentdate,audit.sefullcertdata');
				
				// Certificate not sent
				oSearch.addFilter('audit.agrisubscription.agricertificate.sent', 'EQUAL_TO', 'N');

				// Only where CertificateID equals the Audit ID
				oSearch.addFilter('id', 'EQUAL_TO', 'field:audit.agrisubscription.agricertificate.audit');

				// Email Filter
				if (sEmailFilter === '1')
				{	
					// Growers with email 
					oSearch.addFilter('audit.contactperson.email', 'IS_NOT_NULL');
					oSearch.addFilter('audit.contactperson.email', 'TEXT_IS_LIKE', '@');
					oSearch.addFilter('audit.contactperson.email', 'TEXT_IS_LIKE', '.');
					
					// v2.0.4 SUP021406 Only show Certs where sentdate before issueddate if viewing email list (so that growers who opt to print don't get sent twice)
					// v2.0.4a SUP021493 Or sentdate is null
					oSearch.addBracket('(');
					oSearch.addFilter('audit.agrisubscription.agricertificate.sentdate', 'LESS_THAN', 'field:audit.agrisubscription.agricertificate.dateissued');
					oSearch.addOperator('or');
					oSearch.addFilter('audit.agrisubscription.agricertificate.sentdate', 'IS_NULL');
					oSearch.addBracket(')');
				}
				else if (sEmailFilter === '2')
				{	
					// Growers with no email
					oSearch.addBracket('(');
					oSearch.addFilter('audit.contactperson.email', 'IS_NULL');
					oSearch.addOperator('or');
					oSearch.addFilter('audit.contactperson.email', 'TEXT_IS_NOT_LIKE', '@');
					oSearch.addOperator('or');
					oSearch.addFilter('audit.contactperson.email', 'TEXT_IS_NOT_LIKE', '.');
					oSearch.addBracket(')');
				}
				else if (sEmailFilter === '3')
				{
					// Growers who have an email but have opted to also have their certs printed
					// v3.1.215 SUP023287 Now compares to iPrintOptionYes
					var iPrintOptionYes = $.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title === 'Yes'})
											   , function(y) {return y.id}).shift();
					oSearch.addFilter('audit.contactperson.email', 'IS_NOT_NULL');
					oSearch.addFilter('audit.contactperson.email', 'TEXT_IS_LIKE', '@');
					oSearch.addFilter('audit.contactperson.email', 'TEXT_IS_LIKE', '.');
					oSearch.addFilter('audit.contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId, 'EQUAL_TO', iPrintOptionYes);
				}

				// Filter on Auditor Business if not Admin user
				// v3.1.2 SUP022859 Only show JASANZ users audits for the selected CB if set
				if ((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)
					|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz && nsFreshcare.data.viewFilter.certificationBody)) 
				{
					oSearch.addFilter("audit.auditbusiness", "EQUAL_TO", (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? nsFreshcare.data.viewFilter.certificationBody : ns1blankspace.user.contactBusiness));
				}
				else
				{	// v3.0.0 Now shows all of them and allows user to filter by Cert Body
					//oSearch.addFilter('audit.auditbusiness', 'NOT_IN_LIST', nsFreshcare.admin.certificate.data.managedCBs.join(','));
				}

				if (oParam.sortColumn)
				{
					oSearch.sort(oParam.sortColumn, oParam.sortDirection);
				}
				else
				{
					oSearch.sort('audit.contactbusinesstext', 'asc');
				}

				oSearch.rows = 50;

				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK') 
					{
						nsFreshcare.admin.certificate.certificatesToSend.show(oParam, oResponse);
					}
				});
			}
			else
			{
				ns1blankspace.status.message('Processing complete.');
			}
		},

		show: 	function(oParam, oResponse) 
		{
			// Shows all Certificates that have not yet been sent

			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Certificates Ready for Sending.';
			var dToday = new Date();
			var sSortColumn = '';
			var sSortDirection;
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.sortColumn) {sSortColumn = oParam.sortColumn}
				if (oParam.sortDirection) {sSortDirection = oParam.sortDirection}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			// Filter on Growers Emailing 'Status' only
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') 
			{

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceCertificatesReadyToSend"><tr>');
				aHTML.push('<td id="ns1blankspaceCertificatesReadyToSendResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceCertificatesReadyToSendSearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
						   '<td id="ns1blankspaceCertificatesReadyToSendFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// v4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceCertificatesReadyToSendSearchHandle" style="height:25px" title="Search Criteria"></span>');
				if (!nsFreshcare.admin.certificate.readOnly)
				{
					aHTML.push('<span id="ns1blankspaceCertificatesReadyToSendPreview" style="height:25px" title="Preview"></span>');
					aHTML.push('<span id="ns1blankspaceCertificatesReadyToSendUpdate" style="height:25px" title="Send"></span>');
					aHTML.push('<span id="ns1blankspaceCertificatesReadyToSendMarkAsSent" style="height:25px" title="Mark as Sent"></span>');
				}
				$('#ns1blankspaceCertificatesReadyToSendSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceCertificatesReadyToSendSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceCertificatesReadyToSendStatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Filter by</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceEmailStatus_1" ' +
									'class="ns1blankspaceEmailStatus nsFreshcareSelectable nsFreshcareSelected" data-selected="1">' + nsFreshcare.data.growersText + ' with email</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceEmailStatus_2" ' +
									'class="ns1blankspaceEmailStatus nsFreshcareSelectable">' + nsFreshcare.data.growersText + ' with no email</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceEmailStatus_3" ' +
									'class="ns1blankspaceEmailStatus nsFreshcareSelectable">' + nsFreshcare.data.growersText + ' opting to print</td></tr>');
				
				
				aHTML.push('</table>')

				$('#ns1blankspaceCertificatesReadyToSendFilter').html(aHTML.join(''));

				$('#ns1blankspaceCertificatesReadyToSendSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() 
				{
					$('#ns1blankspaceCertificatesReadyToSendSearchHandle').hide();
					$('#ns1blankspaceCertificatesReadyToSendFilter').show('slide', {direction: 'left'}, 1000);
				});

				$('#ns1blankspaceCertificatesReadyToSendPreview').button({
					text: false,
					icons: { primary: 'ui-icon-document'}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() 
				{
					var oRoot = ns1blankspace.rootnamespace;
					var iSendOption = $('.nsFreshcareSelected').attr('id').split('_').pop();
					oRoot.admin.certificate.certificatesToSend.process({sendOperation: iSendOption, preview: true});
				});
				$('#ns1blankspaceCertificatesReadyToSendPreview').hide();

				// v3.1.2 SUP022859 Radonly can't do any updates, just look
				if (!(nsFreshcare.admin.certificate.readOnly == true))
				{
					$('#ns1blankspaceCertificatesReadyToSendUpdate').button({
						text: false,
						icons: { primary: 'ui-icon-check'}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() 
					{
						var iSendOption = $('.nsFreshcareSelected').attr('id').split('_').pop();
						var oRoot = ns1blankspace.rootnamespace;
						ns1blankspace.container.confirm(
						{
							html: 'Are you sure you want to ' + ((iSendOption === '1') ? 'send' : 'process, then export') + ' the selected Certificates?',
							buttons:
							[
								{
									text: 'Yes',
									click: function()
									{
										$('#ns1blankspaceBootstrapDialog').modal('hide');
										oRoot.admin.certificate.certificatesToSend.process({sendOperation: iSendOption});
									}
								},
								{
									text: 'No',
									click: function() {$('#ns1blankspaceBootstrapDialog').modal('hide');}
								}
							]
						});
					});
				}
				$('#ns1blankspaceCertificatesReadyToSendUpdate').hide();

				$('#ns1blankspaceCertificatesReadyToSendMarkAsSent').button({
					text: false,
					icons: { primary: 'ui-icon-check'}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() 
				{
					var iSendOption = $('.nsFreshcareSelected').attr('id').split('_').pop();
					var oRoot = ns1blankspace.rootnamespace;
					if (confirm('Are you sure you want to mark the selected Certificates as sent?\r\n\r\nYou will no longer be able to export Certificate details once Certificates are marked as sent.', 'Yes', 'No'))
					{
						oRoot.admin.certificate.certificatesToSend.process({sendOperation: iSendOption, updateSentFlagOnly: true});
					}

				});
				$('#ns1blankspaceCertificatesReadyToSendMarkAsSent').hide();

				$('.ns1blankspaceEmailStatus').click(function() 
				{

					$('.ns1blankspaceEmailStatus').removeClass('nsFreshcareSelected');
					$('.ns1blankspaceEmailStatus').attr('data-selected','0');
					
					$(this).addClass('nsFreshcareSelected');
					$(this).attr('data-selected', '1');

				});

				$('#ns1blankspaceCertificatesReadyToSendSearch').button({
					label: "Search"
				})
				.click(function() 
				{
					var oRoot = ns1blankspace.rootnamespace;
					var iSendOption = $('.nsFreshcareSelected').attr('id').split('_').pop();;

					ns1blankspace.okToSave = true;

					if ($('.ns1blankspaceEmailStatus[data-selected="1"]').length === 0) {
						$('#ns1blankspaceCertificatesReadyToSendStatusMessage').html('Please choose at least one filter.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave) {

						$('#ns1blankspaceCertificatesReadyToSendFilter').hide({duration: 200, complete: function() {

							$('#ns1blankspaceCertificatesReadyToSendSearchHandle').show();
							$('#ns1blankspaceCertificatesReadyToSendPreview').show();
							$('#ns1blankspaceCertificatesReadyToSendUpdate').show();
							if (iSendOption != '1')
							{
								$('#ns1blankspaceCertificatesReadyToSendUpdate').button({icons: {primary: 'ui-icon-arrowthickstop-1-s'}});
								$('#ns1blankspaceCertificatesReadyToSendMarkAsSent').show();
							}
							else
							{
								$('#ns1blankspaceCertificatesReadyToSendUpdate').button({icons: {primary: 'ui-icon-check'}});
								$('#ns1blankspaceCertificatesReadyToSendMarkAsSent').hide();
							}
							$('#ns1blankspaceCertificatesReadyToSendResults').html(ns1blankspace.xhtml.loading);
							oParam.emailOption = $.map( $.grep($('.ns1blankspaceEmailStatus'), function(x) {return $(x).hasClass('nsFreshcareSelected')})
													  , function(y) {return y.id.split('_').pop()}).shift();

							$('#ns1blankspaceCertificatesReadyToSendUpdate').attr('title', ((iSendOption === '1') ? 'Send' : 'Export'));
							oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.certificate.certificatesToSend.show)
							oRoot.admin.certificate.certificatesToSend.search(oParam);
						}});

					}
					else {
						window.setTimeout('$("#ns1blankspaceCertificatesReadyToSendStatusMessage").fadeOut(4000)', 7000);
					}
				});

			}

			if (oResponse) 
			{
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No Certificates waiting to be sent.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceCertificatesReadyToSendResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceCertificatesReadyToSendResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					var sBusinessColumn = (bShowLegalName) ? 'audit.contactbusiness.legalname' : 'audit.contactbusinesstext';

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
						aHTML.push('<table id="ns1blankspaceCertificatesReadyToSend" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditReference"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.reference"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.reference') ? sSortDirection : 'asc') + '">' +
									'Audit Reference</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortMembership"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.membership.code"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.membership.code') ? sSortDirection : 'asc') + '">' +
									'Membership</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortGrowerBusiness"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? sSortDirection : 'asc') + '">' +
									nsFreshcare.data.growerText + ' Business</td>');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortGrower"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.contactpersontext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.contactpersontext') ? sSortDirection : 'asc') + '">' +
									nsFreshcare.data.growerText + '</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortCertificateNumber"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.agrisubscription.agricertificate.certificatenumber"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.agrisubscription.agricertificate.certificatenumber') ? sSortDirection : 'asc') + '">' +
									'Certificate Number</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditDate"' +
									' data-column="audit.actualdate"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.actualdate') ? sSortDirection : 'asc') + '"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort">' +
									'Audit Date</td>');
					aHTML.push('<td id="ns1blankspaceUpdateStatusSortAuditor"' +
									' data-column="audit.' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) ? 'auditpersontext' : 'auditbusinesstext') + '"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor) ? 'auditpersontext' : 'auditbusinesstext')) 
															? sSortDirection 
															: 'asc') + '"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort">' +
									'Auditor</td>');

					aHTML.push('<td id="ns1blankspaceUpdateStatusSortCOP"' +
									' class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="audit.codeofpracticetext"' +
									' data-sortdirection="' + ((sSortColumn == 'audit.codeofpracticetext') ? sSortDirection : 'asc') + '">' +
									'COP</td>');

					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceMainRowOptionsSelect"' +
								' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top; width: 20px;">' + 
								'<input type="checkbox" class="ns1blankspaceCertificatesToBeCreatedCheckAll ns1blankspaceCertificatesToBeCreated" checked="false">' +
								'</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.admin.certificate.certificatesToBeCreated.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceCertificatesReadyToSendResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceCertificatesReadyToSendResults',
						xhtmlContext: 'CertificatesToBeCreated',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 50,
						functionShowRow: nsFreshcare.admin.certificate.certificatesToBeCreated.row,
						functionOnNewPage: nsFreshcare.admin.certificate.certificatesToSend.bind,
						type: 'json',
						showLegalName: bShowLegalName
					}); 	
				}
			}
		},

		bind: 	function()
		{
			// v3.3.002 SUP023800 Only bind td, not tr
			$('td.ns1blankspaceRow:visible')
				.css('cursor', 'pointer')
				.css('width', '15px')
				.css('height', '18px')
				.click(function()
				{
					window.open(document.location.origin + '/#/nsFreshcare-admin.audit/id:' + this.id.split('-').pop());
				});

			// v3.4.007 SUP023917 Now only operates on current page
			$('.ns1blankspaceCertificatesToBeCreatedCheckAll:visible').click(function()
			{
				if ($(this).prop('checked'))
				{
					$('input.ns1blankspaceCertificateCreateInclude:visible').prop('checked', true);
				}
				else
				{
					$('input.ns1blankspaceCertificateCreateInclude:visible').prop('checked', false);
				}
			});

			$('.ns1blankspaceHeaderSort:visible')
				.css('cursor', 'pointer')
				.click(function()
				{
					var oRoot = ns1blankspace.rootnamespace;
					var oParam = {};
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					oRoot.admin.certificate.certificatesToSend.search(oParam);
				});
		},
		
		process: function(oParam)
		{
			// Generate the Certificates. We attach a PDF to the 'Version' record regardless of the sending option. 
			// If printing, user can just update the Sent Flag
			// Generating the certificates is a three-step process: 
			// Step 1:
			//		Create an Action record of type Certificate that contains a JSON of all the data to be included in  the Certificate
			// Step 2:
			//		Generate the PDF from the saved JSON and attach to the Version action record
			//	Step 3 - Emailing:
			//		Email to the grower and save email against Grower 
			//		On Success of email, set CertificateSent to Y
			//	Step 2 - Printing:
			// 		Go to CertificateMailMerge report that lists the JSON, plus any other selected fields (for mailing purposes) to export file	
			//		

			var oRoot = ns1blankspace.rootnamespace;
			var oCertificate = {};
			var oCertificateData;
			var iSendOperation;
			var iSendCertificatesIndex = -1;
			var bPreview = false;
			var bUpdateSentFlagOnly = false;

			if (nsFreshcare.admin.certificate.data == undefined) {nsFreshcare.admin.certificate.data = {}}

			if (oParam)
			{
				if (oParam.sendCertificatesStep == undefined) {oParam.sendCertificatesStep = 1}
				if (oParam.certificateData) {oCertificateData = oParam.certificateData}
				if (oParam.sendOperation) {iSendOperation = oParam.sendOperation}
				if (oParam.successful === undefined) {oParam.successful = false;}
				if (oParam.sendCertificatesIndex != undefined) {iSendCertificatesIndex = oParam.sendCertificatesIndex}
				if (oParam.preview != undefined) {bPreview = oParam.preview}
				if (oParam.updateSentFlagOnly != undefined) {bUpdateSentFlagOnly = oParam.updateSentFlagOnly}
			}
			else {oParam = {sendCertificatesStep: 1}}

			if (iSendCertificatesIndex === -1)
			{
				nsFreshcare.admin.certificate.data.sendCertificatesChecked = $("input.ns1blankspaceCertificateCreateInclude:checked");
				iSendCertificatesIndex = 0;
				oParam.sendCertificatesIndex = 0;
				oParam.generateNew = true; 		// v3.1.0i SUP022440 If we're in this area, we want to be able to generate new certificates
				delete(nsFreshcare.admin.certificate.data.certificateBackground);
				delete(nsFreshcare.admin.certificate.data.certificateText);
			}	

			if (bUpdateSentFlagOnly && oParam.sendCertificatesStep === 1) {oParam.sendCertificatesStep = 8}


			// Loop through each selected row
			if (iSendCertificatesIndex < nsFreshcare.admin.certificate.data.sendCertificatesChecked.length)
			{
				var oThisElement = nsFreshcare.admin.certificate.data.sendCertificatesChecked[iSendCertificatesIndex];
				oParam.thisElement = oThisElement;
				
				// First, call GetCertificateData to put data into oParam.certificateData
				if (oParam.sendCertificatesStep === 1)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Extracting Certificate data.'});

					oParam.sendCertificatesStep = 2;
					oParam.audit = $(oThisElement).attr('data-audit');
					oParam.certificate = $(oThisElement).attr('data-certificate');
					oParam.membership =  $(oThisElement).attr('data-membership');
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.certificatesToSend.process);
					
					oRoot.admin.certificate.certificateGetData(oParam);
				}

				
				// Add CertificateData action for new certificate 
				else if (oParam.sendCertificatesStep === 2)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Creating Certificate version information.'});

					oParam.sendCertificatesStep = 3;
					/*if (iSendOperation === '1'|| bPreview)		// Emailing or Previewing
					{	oParam.sendCertificatesStep = 3;	}
					else							// Printing (we need to update the Sent flag for this row)
					{	oParam.sendCertificatesStep = 6;	}*/

					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.certificatesToSend.process);
					nsFreshcare.admin.certificate.checkForNewVersion(oParam);
				}


				// Create the PDF and get the attachmentlink value (if it wasn't set in checkForNewVersion)
				else if (oParam.sendCertificatesStep === 3)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Merging Certificate data with template.'});

					oParam.onComplete = nsFreshcare.admin.certificate.certificatesToSend.process;

					if (bPreview)
					{
						oParam.sendCertificatesStep = 6;		// We're previewing - next step is 6
					}
					else
					{
						oParam.sendCertificatesStep = (iSendOperation === '1') ? 4 : 10;	// if email go to 4, otherwise go to 10
						oParam.successful = (iSendOperation === '1') ? false : true;		// We keep status mesage if not emailing
					}

					// We only need to go here if we're previewing or we don't have an attachment link
					if (bPreview || oParam.attachmentLink === undefined)
					{
						// Make sure we have values in nsFreshcare.data.auditor for selfcertdate
						if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
						{
							nsFreshcare.data.auditor.selfCertificationDate = $.map($.grep(nsFreshcare.admin.certificate.data.certBodyStartDates, 
																							function(x) {return x.id === oParam.certificationBody}),
																				  function(y) {return y['se' + nsFreshcare.data.selfCertificationDateId]}).shift();
						}

						// Call the appropriate cert creation function dependent on whether pre-selfCert date or after 
						var dSelfCertDate = (nsFreshcare.data.auditor.selfCertificationDate != '') ? new Date(nsFreshcare.data.auditor.selfCertificationDate) : dToday;
						var dIssued = new Date(oParam.certificateDateIssued);

						if (dIssued < dSelfCertDate)
						{
							nsFreshcare.admin.certificate.legacyCertificatePrint(oParam);
						}
						else
						{
							nsFreshcare.admin.certificate.currentCertificatePrint(oParam);
						}
					}
					else
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}

				// Get the id for the document to merge with the email
				else if (oParam.sendCertificatesStep === 4)
				{
					if (nsFreshcare.data.documentEmailCertificateTemplate === undefined)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Searching for email template.'});

						var oSearch = new AdvancedSearch();
						oSearch.method = 'DOCUMENT_SEARCH';
						oSearch.addField('url');
						oSearch.addFilter('url', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
						oSearch.rows = 1;
						oSearch.getResults(function(oResponse)
						{
							// We don't reset the sendCertificatesStep on fail as we don't want to continue at all if no template
							if (oResponse.status === 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{	
									nsFreshcare.data.documentEmailCertificateTemplate = oResponse.data.rows[0].id;	
									oParam.sendCertificatesStep = 5;
									nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
								}
								else
								{	
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Processing stopped: No Certificate Email template added. Please create via Freshcare Profile area.'});
								}
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Processing stopped: Error finding Certificate email template.',
															errorNotes: oResponse.error.errornotes});
							}
						});
					}
					else
					{
						oParam.sendCertificatesStep = 5;
						nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
					}
				}


				// Send the email with the PDF attached
				else if (oParam.sendCertificatesStep === 5)
				{
					oParam.sendCertificatesStep = 9;		// Update the sent flag
					oParam.contactBusiness = $(oThisElement).attr('data-contactBusiness');
					oParam.contactPerson = $(oThisElement).attr('data-contactPerson');
					oParam.growerFirstName = $(oThisElement).attr('data-growerFirstName');
					oParam.growerSurname = $(oThisElement).attr('data-growerSurname');
					oParam.growerEmail = $(oThisElement).attr('data-growerEmail');
					oParam.auditorName = $(oThisElement).attr('data-auditAuditor');
					oParam.thisElement = oThisElement;
					oParam.onComplete = nsFreshcare.admin.certificate.certificatesToSend.process;
					oParam.emailSubject = 'Freshcare' + (oParam.membershipCode ? ' ' + oParam.membershipCode : '') + ' Certificate - ' + oParam.certificateData.growerBusinessName;
					nsFreshcare.admin.certificate.emailCertificateToGrower(oParam);
				}

				// We're previewing, make sure we have the certificate background first, 
				// then add the returned html to the ns1blankspace.admin.certificate.data.certificateText
				else if (oParam.sendCertificatesStep === 6)
				{
					if (nsFreshcare.admin.certificate.data.certificateText === undefined) {nsFreshcare.admin.certificate.data.certificateText = ''}

					// First check if we already have the background text in memory (we reset this before creating / previewing certificates each time)
					if (nsFreshcare.admin.certificate.data.certificateBackground === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'DOCUMENT_SEARCH';
						oSearch.addField('content');
						oSearch.addFilter('id', 'EQUAL_TO', nsFreshcare.data.documentCertificateBackground);
						oSearch.getResults(function(oResponse) 
						{

							if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
							{
								// Split at </style> tag to remove merge template field at the end and add back the </style> tag

								nsFreshcare.admin.certificate.data.certificateBackground = oResponse.data.rows[0].content.formatXHTML().split('</style>').shift();
								nsFreshcare.admin.certificate.data.certificateBackground += '</style>';

								nsFreshcare.admin.certificate.certificatesToSend.process(oParam);

							}
							else
							{
								// Error finding background. Cannot continue
								sErrorMessage = 'Error finding certificate background';
								var sErrorNotes = (oResponse.status === 'ER') ? oResponse.error.errorNotes : undefined;
								ns1blankspace.status.error('Processing stopped..');
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
							}
						});
					}

					// We have the text of the background.Add oParam.html to oParam.certificateText
					else
					{
						nsFreshcare.admin.certificate.data.certificateText += oParam.html;
						delete(oParam.html);
						oParam.successful = true;		// v2.0.3c Was not removing the progress row
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Waiting to preview..'});
						oParam.sendCertificatesStep = 10;
						nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
					}
				}

				// We're just updating the Sent Flag - make sure the action record has been created against the certificate. If not, don't mark as sent
				else if(oParam.sendCertificatesStep === 8) 
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'ACTION_SEARCH';
					oSearch.addField('createddate');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', $(oThisElement).attr('data-audit'));
					oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
					oSearch.sort('createddate', 'desc');
					oSearch.rows = 1;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
						{
							// v2.0.4 SUP021422 Update the duedate on the action if we're setting the sent flag only ie: we're not emailing
							if (bUpdateSentFlagOnly)
							{
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
									data: 'id=' + oResponse.data.rows[0].id + '&duedate=' + ns1blankspace.util.fs((new Date()).toString('dd MMM yyyy HH:mm:ss')),
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											oParam.sendCertificatesStep = 9;
											nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
										}
										else
										{
											oParam.sendCertificatesStep = 10;
											nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement
																					, errorMessage: 'Error updating Certificate Sent Date on action'
																					, errorNotes: oResponse.error.errorNotes});
										}
									}
								});
							}
							else
							{	
								oParam.sendCertificatesStep = 9;
								nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
							}
						}
						else
						{
							if (oResponse.status === 'ER')
							{
								sErrorMessage = 'Error searching for Certificate data';
							}
							else
							{
								sErrorMessage = 'Not marked as sent: ' + nsFreshcare.data.growerText + ' Certificate data has not been exported.'
							}
							oParam.sendCertificatesStep = 10;
							var sErrorNotes = (oResponse.status === 'ER') ? oResponse.error.errorNotes : undefined;
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
							nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
						}
						
					});
				}

				// Update the Sent flag for this Grower
				else if (oParam.sendCertificatesStep === 9)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Marking Certificate as sent.'});

					// v2.0.4 SUP021406 don't update Sent flag if we're emailing & grower has opted for printed cert - just the certificate.sentdate
					var sData = 'id=' + $(oThisElement).attr('data-certificate') + 
								((iSendOperation === '1' && $(oThisElement).attr('data-optingToPrint') === 'Yes')
									? ''
									: '&sent=Y') +
								'&sentdate=' + ns1blankspace.util.fs(dToday.toString('dd MMM yyyy'));
								//((nsFreshcare.sitesDev.indexOf(nsFreshcare.site) === -1) ? '&sent=Y' : '');

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
						data: sData,
						dataType: 'JSON',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Certificate sent.'});
								oParam.successful = true;
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Error marking Certificate as sent.',
															errorNotes: oResponse.error.errornotes});
							}
							oParam.sendCertificatesStep = 10;
							nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
						}
					});
				}

				// Reset values and call loop again
				else if (oParam.sendCertificatesStep === 10)
				{
					delete(oParam.sendCertificatesStep);
					delete(oParam.thisElement);
					delete(oParam.certificateData);
					delete(oParam.contactBusiness);
					delete(oParam.contactPerson);
					delete(oParam.audit);
					delete(oParam.certificate);
					delete(oParam.certificateDateIssued);
					delete(oParam.codeOfPractice);
					delete(oParam.copAuditDueAfter);
					delete(oParam.growerBusiness);
					delete(oParam.growerPerson);
					delete(oParam.growerFirstName);
					delete(oParam.growerSurname);
					delete(oParam.growerEmail);
					delete(oParam.auditorName);
					delete(oParam.membership);
					delete(oParam.membershipCode);
					delete(oParam.subscription);
					delete(oParam.template);
					delete(oParam.attachmentLink);
					delete(oParam.emailSubject);

					oParam.sendCertificatesIndex = iSendCertificatesIndex + 1;
					if (oParam.successful)		// Process was a succcess, remove status row
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, remove: true});
						if (!bPreview) {$(oThisElement).parent().parent().remove();}		// v2.0.3c only remove if sent
					}
					delete(oParam.successful);

					nsFreshcare.admin.certificate.certificatesToSend.process(oParam);
				}

			}
			else
			{

				// Previewing the certificates - open window and display html
				if (bPreview)
				{
					if (nsFreshcare.admin.certificate.data.certificateText && nsFreshcare.admin.certificate.data.certificateText != '')
					{
						nsFreshcare.admin.certificate.printPreview.show();
					}
				}

				if (iSendOperation != '1' && !bUpdateSentFlagOnly && !bPreview)
				{
					// We're not emailing, not previewing and not only updating sent flag - take users to the export report
					// Open the report page on the Unsent Certificates export report

					if (ns1blankspace.report.reports == undefined || ns1blankspace.report.reports.length == 0)
					{
						nsFreshcare.admin.report.init({showHome: false});
					}

					// Set the defaults for the custom filters
					// v3.2.016 was trying to set passedData['noemailoption'] = {}
					if (iSendOperation === '2')
					{
						ns1blankspace.report.reports.passedData = {noemailoption: 'Yes', printoption: 'No'};
					}
					else if (iSendOperation === '3')
					{
						ns1blankspace.report.reports.passedData = {noemailoption: 'No', printoption: 'Yes'};
					}

					// Now we need to make sure it's only looking for unsent Certificates 
					ns1blankspace.objectMethod = 'AGRI_CERTIFICATE';		// V3.1.203 SUP022991 Added _SEARCH
					ns1blankspace.report.reports.passedData.certificateid;
					$.each(ns1blankspace.report.reports, function()
					{
						if (this.method === ns1blankspace.objectMethod + '_SEARCH')
						{
							var oThisReport = this;
							// V3.1.203 SUP022991 Was assigning variables below instead of comparing
							$.each(oThisReport.fixedParameters.filters, function()
							{
								if (this.name == 'agricertificate.id')
								{	
									this.value1 = undefined;
								}
								else if (this.name == 'agricertificate.sent')
								{
									this.comparison = 'EQUAL_TO';
									this.value1 = 'N';
								}
							});
						}
					});
					nsFreshcare.admin.report.init({all: false});
				}
			}
		}
	},

	checkForNewVersion: function(oParam)
	{
		// Check to see if the data passed in oParam.certificateData is the same as the most recent CertificateData action
		// If not, increment the version number and create a new action.

		// This function is not called during bulk report (on Certificates page) so error messages can be displayed in the status area

		// v3.1.0i SUP022305 if !generateNew - we only print if action and PDF exists against action so don't generate a new certificate
		// v3.4.010 SUP023761 If showDifferences is true, show the user the differences and ask if they still want to create new one

		oParam = oParam || {}
		var oPreviousCertificate = ns1blankspace.util.getParam(oParam, 'previousCertificate').value;
		var bShowDifferences = ns1blankspace.util.getParam(oParam, 'showDifferences', {'default': false}).value;
		var iAudit;
		var sVersion = '';
		var oCertificate;			// Certificate id
		var sErrorMessage = '';

		if (oParam.certificateData) 
		{
			oCertificate = oParam.certificateData;
			if (oParam.certificateData.audit) {iAudit = oParam.certificateData.audit}
		}
		else if (oParam.audit) {iAudit = oParam.audit}
		oParam.checkNewVersionStep = oParam.checkNewVersionStep || 1;

		
		// Find most recent CertificateData action record for this audit
		if (oParam.checkNewVersionStep === 1)
		{
			if (iAudit)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('subject,description');
				oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAudit);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iAudit);
				oSearch.sort('createddate', 'desc');
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.previousCertificate = JSON.parse(oResponse.data.rows[0].description.formatXHTML());
							if (oParam.generateNew == false) 
							{
								oParam.certificateData = $.extend({}, oParam.previousCertificate);
							}
							oParam.actionID = oResponse.data.rows[0].id;
							oParam.checkNewVersionStep = 2;
						}
						else if (oParam.generateNew == false)
						{
							oParam.checkNewVersionStep = 10;
							delete(oParam.actionID);
							delete(oParam.attachmentLink);
						}
						else {oParam.checkNewVersionStep = 2;}
						
					}
					else
					{
						sErrorMessage = 'Error finding Certificate version record';
						oParam.checkNewVersionStep = 10;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
						}
					}
					nsFreshcare.admin.certificate.checkForNewVersion(oParam);
				});
			}
			else
			{
				sErrorMessage = 'Audit not passed. Cannot create Certificate.';
				oParam.checkNewVersionStep = 10;
				if (oParam.sendCertificatesStep)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
					oParam.sendCertificatesStep = 10;
				}
				else
				{
					ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
				}
				nsFreshcare.admin.certificate.checkForNewVersion(oParam);
			}
		}

		// Now compare previous and current certificate data 
		else if (oParam.checkNewVersionStep === 2)
		{
			var sAuditReference = oParam.certificateData.auditReference.split('-').shift();
			if (oPreviousCertificate != undefined)
			{
				// Remove Version number from both objects so that comparison is equal
				var sPreviousVersion = oPreviousCertificate.versionNumber;		// This one will be correct version we'll use later
				var sNewVersion = oCertificate.versionNumber;
				var sPreviousReference = oPreviousCertificate.auditReference;	// This one will be correct version we'll use later
				var sNewReference = oCertificate.auditReference;
				var sVersionNumber = '';
				var aCertificateKeys = [];
				var oPreviousCertificateSorted = {};
				var oCertificateSorted = {};

				delete(oPreviousCertificate.versionNumber);
				delete(oCertificate.versionNumber);
				delete(oPreviousCertificate.auditReference);
				delete(oCertificate.auditReference);

				// v3.1.202 Pre v3.1.2, these fields weren't included 
				// - if it's found in new but not in old, add same value to old so that new cert isn't created
				if (oCertificate.auditType && oPreviousCertificate.auditType == undefined)
				{
					oPreviousCertificate.auditType = oCertificate.auditType;
					oPreviousCertificate.auditTypeText = oCertificate.auditTypeText;
					oPreviousCertificate.reCertificationDue = oCertificate.reCertificationDue;
					oPreviousCertificate.certificateExpiryDate = oCertificate.certificateExpiryDate;
				}
				// v3.4.015 SUP023981 Added 
				if (oCertificate.fullCertificateData && oPreviousCertificate.fullCertificateData == undefined)
				{
					oPreviousCertificate.fullCertificateData = oCertificate.fullCertificateData;
				}

				// v3.1.202 Now we need to sort them the same so that when we Stringify, they are the same
				// v3.1.204 Was not creating old and new certificate data correctly
				aCertificateKeys = Object.keys(oCertificate).sort(ns1blankspace.util.sortBy(0));
				$.each(aCertificateKeys, function(key, value)
				{
					oPreviousCertificateSorted[value] = oPreviousCertificate[value];
					oCertificateSorted[value] = oCertificate[value];
				});

				// Determine if the data is different and create a new version number if so
				// v2.0.3a Removed formatXHTML() from oPreviousCertificate
				if (JSON.stringify(oPreviousCertificateSorted) != JSON.stringify(oCertificateSorted) )
				{
					// Show differences to user and let them decide if they want to create new version
					if (bShowDifferences)
					{
						var aHTML = [];

						aHTML.push('<table class="ns1blankspace">');

						aHTML.push('<tr><td style="height: 200px; border: 1px solid #d4d4d4;">');

						aHTML.push('<div style="height:255px; overflow:scroll;"><table class="ns1blankspace" id="ns1blankspaceSearchBusinessResults"' +
										' style="max-height: 300px; overflow-y:auto;"></div>');

						aHTML.push('<tr>' +
										'<td class="ns1blankspaceHeaderCaption" width="20%"></td>' +
										'<td class="ns1blankspaceHeaderCaption" width="40%"><b>Existing Certificate Data</b></td>' +
										'<td class="ns1blankspaceHeaderCaption" width="40%"><b>New Certificate Data</b></td>' +
									'</tr>');

						$.each(Object.keys(oPreviousCertificateSorted), function(index, key)
						{
							var bDifferent = false;
							if (key == 'sites')
							{
								bDifferent = ($.map(oPreviousCertificateSorted.sites, function(x) {return x.streetCombined + ' ' + x.streetLocation}).join('<br />') 
											!= $.map(oCertificateSorted.sites, function(x) {return x.streetCombined + ' ' + x.streetLocation}).join('<br />'))
							}
							else if (key == "scopeExtension")
							{	// v3.4.017 Ignore ScopeExtension - if upgrading ScopeExtension data, will show on normal fields
								bDifferent = false;
							}
							else {bDifferent = (oPreviousCertificateSorted[key] != oCertificateSorted[key])}

							if (bDifferent)
							{
								aHTML.push(nsFreshcare.admin.certificate.getDifferencesHTML(oPreviousCertificateSorted, oCertificateSorted, key));
							}
						});

						aHTML.push('</table>');
						

						var aButtons =
						[
							{
								text: 'Create new version',
								click: function()
								{
									// **** IF CHANGES MADE HERE, then must also change ELSE section below *****////
									// v3.4.019 SUP024014 Was calculating the vrsio number incorrectly
									var aPreviousVersion = sPreviousVersion.split('-');
									sVersionNumber = (Number(aPreviousVersion.pop()) + 1).toString();
									sVersionNumber = (sVersionNumber.length > 1) ? sVersionNumber : '0' + sVersionNumber;
									oParam.certificateData.auditReference = sAuditReference + '-' + sVersionNumber;

									aPreviousVersion.push(sVersionNumber);
									oParam.certificateData.versionNumber = aPreviousVersion.join('-');

									oParam.checkNewVersionStep = '2a';
									$('#ns1blankspaceBootstrapDialog').modal('hide');
									nsFreshcare.admin.certificate.checkForNewVersion(oParam);
								}
							},
							{
								text: 'Use existing version',
								click: function()
								{
									oParam.certificateData = oPreviousCertificateSorted;
									oParam.certificateData.versionNumber = sPreviousVersion;
									oParam.certificateData.auditReference = sPreviousReference;
									oParam.checkNewVersionStep = '2b';
									$('#ns1blankspaceBootstrapDialog').modal('hide');
									nsFreshcare.admin.certificate.checkForNewVersion(oParam);
								}
							},
							{
								text: 'Cancel',
								click: function()
								{
									oParam.printIndividualCertStep = 10;
									oParam.checkNewVersionStep = 10;
									$('#ns1blankspaceBootstrapDialog').modal('hide');
									nsFreshcare.admin.certificate.checkForNewVersion(oParam);
								}
							}
						];

						ns1blankspace.container.confirm(
						{
							html: '<span style="font-size: 0.75em">' + aHTML.join('') + '</span>',
							title: 'A new version of the Certificate will be created...',
							buttons: aButtons,
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
								$('.modal-dialog').css('width', '800px');
							}
						});
					}
					else
					{
						// **** IF CHANGES MADE HERE, then must also change "Create new version" section above *****////
						// v3.4.019 SUP024014 Was calculating the vrsio number incorrectly
						var aPreviousVersion = sPreviousVersion.split('-');
						sVersionNumber = (Number(aPreviousVersion.pop()) + 1).toString();
						sVersionNumber = (sVersionNumber.length > 1) ? sVersionNumber : '0' + sVersionNumber;
						oParam.certificateData.auditReference = sAuditReference + '-' + sVersionNumber;

						aPreviousVersion.push(sVersionNumber);
						oParam.certificateData.versionNumber = aPreviousVersion.join('-');

						oParam.checkNewVersionStep = '2a';
						nsFreshcare.admin.certificate.checkForNewVersion(oParam);
					}
				}
				else
				{
					// Data is the same - put the previous version number into the oParam.Certificate.versionNumber
					oParam.certificateData.versionNumber = sPreviousVersion;
					oParam.certificateData.auditReference = sPreviousReference;
					oParam.checkNewVersionStep = '2b';
					nsFreshcare.admin.certificate.checkForNewVersion(oParam);
				}
			}
			
			// There was no previous data. Create the new version number and create the action record
			else
			{
				// v2.0.4f SUP021543 Cert version Number changed from certnumber + Membership code + number to
				// Cert number + audit reference + number
				if (oParam.generateNew == true)
				{
					oParam.certificateData.auditReference = sAuditReference + '-01';
					oParam.certificateData.versionNumber = oCertificate.certificateNumber + '-' + sAuditReference + '-01';
					oParam.checkNewVersionStep = 3;
				}
				else
				{
					delete(oParam.actionID);
					oParam.checkNewVersionStep = 10;
				}
				nsFreshcare.admin.certificate.checkForNewVersion(oParam);
			}
		}

		// v3.4.010 SUP023761 Creates the new version
		else if (oParam.checkNewVersionStep == '2a')
		{

			oParam.checkNewVersionStep = 3;			// This will create the action
			delete(oParam.actionID);
			nsFreshcare.admin.certificate.checkForNewVersion(oParam);
		}

		// v3.4.010 SUP023761 No change in data - find the attachment link
		else if (oParam.checkNewVersionStep == '2b')
		{
			// Now we need to Find the attachment link if it exists (so we don't re-generate the PDF)
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CORE_ATTACHMENT_SEARCH';
			oSearch.addField('link,filename');
			oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAction);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', oParam.actionID);
			oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.attachmentTypeCertificate);
			oSearch.rows = 1;
			oSearch.sort('modifieddate', 'desc');
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					if (oResponse.data.rows.length > 0)
					{
						oParam.attachmentLink = oResponse.data.rows[0].id;
					}
					else
					{
						delete(oParam.attachmentLink);
					}
					oParam.checkNewVersionStep = 10		// Go to the call-back
				}
				else
				{
					sErrorMessage = 'Error finding attached PDF';
					oParam.checkNewVersionStep = 10;
					if (oParam.sendCertificatesStep)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
						oParam.sendCertificatesStep = 10;
					}
					else
					{
						ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
					}
				}
				nsFreshcare.admin.certificate.checkForNewVersion(oParam);
			});
		}

		// We create the action record 
		else if (oParam.checkNewVersionStep === 3)
		{

			var sData = 'object=' + ns1blankspace.util.fs(nsFreshcare.objectAudit) +
			 			'&objectcontext=' + ns1blankspace.util.fs(iAudit) +
			 			'&actiontype=' + ns1blankspace.util.fs(nsFreshcare.data.actionTypeCertificate) +
			 			'&contactbusiness=' + ns1blankspace.util.fs(oParam.growerBusiness) +
			 			'&description=' + ns1blankspace.util.fs(JSON.stringify(oCertificate)) +
			 			'&lock=Y' +
			 			'&status=1' +
			 			'&subject=' + ns1blankspace.util.fs('Certificate version: ' + oCertificate.versionNumber);

			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
				data: sData,
				dataType: 'JSON',
				success: function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.actionID = oResponse.id;
						sErrorMessage = 'New Certificate version: ' + oCertificate.versionNumber;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: sErrorMessage});
						}
						else
						{	ns1blankspace.status.message(sErrorMessage);	}

						oParam.checkNewVersionStep = 10;
					}
					else
					{
						sErrorMessage = 'Error creating new Certificate version';
						oParam.checkNewVersionStep = 10;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
						}
					}
					nsFreshcare.admin.certificate.checkForNewVersion(oParam);
				}
			});
		}

		// Execute call-back
		else if (oParam.checkNewVersionStep === 10)
		{
			delete(oParam.checkNewVersionStep);
			delete(oParam.previousCertificate);

			if (oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	getDifferencesHTML: function(oBefore, oAfter, sKey)
	{
		var aMappings =
		[
			{name: 'audit', caption: 'Audit ID'},
			{name: 'auditDate', caption: 'Audit Date'},
			{name: 'auditType', caption: 'Audit Type'},
			{name: 'category', caption: 'Category'},
			{name: 'certificateExpiry', caption: 'Expiry Date'},
			{name: 'certificateExpiryDate', caption: 'Expiry Date'},
			{name: 'certificateNumber', caption: 'Certification Number'},
			{name: 'certificateScope', caption: 'Scope'},
			{name: 'certificationAchieved', caption: 'Certification Granted Date'},
			{name: 'certificationBodyAddress', caption: 'CB Address'},
			{name: 'certificationBodyLegalName', caption: 'CB Legal Name'},
			{name: 'certificationBodyNumber', caption: 'CB Number'},
			{name: 'codeOfPractice', caption: 'Code of Practice'},
			{name: 'crops', caption: 'Crops'},
			{name: 'growerBusinessName', caption: 'Member Legal Name'},
			{name: 'growerTradeName', caption: 'Member Trading Name'},
			{name: 'jasanzAccredited', caption: 'JASANZ Certificate'},
			{name: 'logoImage', caption: 'CB Logo'},
			{name: 'reCertificationDate', caption: 'Re-Certificate Audit Date'},
			{name: 'reCertificationDue', caption: 'Re-Certificate Audit Due'},
			{name: 'signatureImage', caption: 'CB Signature Image'},
			{name: 'sites', caption: 'Sites'}
		];

		var sCaption = $.map($.grep(aMappings, function(x) {return x.name == sKey}), function(y) {return y.caption}).shift();
		var sBefore = oBefore[sKey];
		var sAfter = oAfter[sKey];
		var sHTML = '';

		if (sKey == 'sites')
		{
			sBefore = $.map(oBefore.sites, function(x) {return x.streetCombined + ' ' + x.streetLocation}).join('<br />');
			sAfter = $.map(oAfter.sites, function(x) {return x.streetCombined + ' ' + x.streetLocation}).join('<br />');
		}

		sHTML = '<tr>' +
					'<td class="ns1blankspaceRow ns1blankspaceCaption">' + sCaption + '</td>' +
					'<td class="ns1blankspaceRow">' + sBefore + '</td>' +
					'<td class="ns1blankspaceRow">' + sAfter + '</td>' +
					'</tr>';

		return sHTML;
	},

	printIndividualCertificate: function(oParam) 
	{
		// v3.1.0i SUP022305 If grower, trainer or customer, alert the user if no action or PDF exists - DO NOT GENERATE NEW CERT

		// Call the getData and Merge / Print function then reset icons
		// Output Options are:  1 - View PDF
		//						2 - Email using template with PDF attatchment
		//						3 - Export data via reporting area

		var sXHTMLElementId;
		var oButtons = {icons: {primary: 'ui-icon-print'}};
		var sOutputOption = '1';
		var iCertificate;
		var oResponse;
		var oRoot = ns1blankspace.rootnamespace;

		if (oParam) 
		{
			if (oParam.printIndividualCertStep === undefined) {oParam.printIndividualCertStep = 1}
			if (oParam.xhtmlElementID) {sXHTMLElementId = oParam.xhtmlElementID}
			if (oParam.certificate) {iCertificate = oParam.certificate}
			if (oParam.outputOption) {sOutputOption = oParam.outputOption}
			if (oParam.response) {oResponse = oParam.response}
		}
		else {oParam = {printIndividualCertStep: 1}}


		// Change the current button to a waiting icon so they don't hit print again. 
		if (oParam.printIndividualCertStep === 1 && sXHTMLElementId != ns1blankspace.xhtml.divID) 
		{

			$('#' + sXHTMLElementId)
				.button('destroy')
				.html(ns1blankspace.xhtml.loadingSmall);

			ns1blankspace.xhtml.divID = sXHTMLElementId;

			nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
		}

		// Get the certificate data
		else if (oParam.printIndividualCertStep === 1)
		{
			oParam.printIndividualCertStep = 2;

			// v3.1.0i SUP022305 For Growers, trainers & customers, never get Cert Data - we only print if PDF exists against action
			// v3.4.007 Moved from previous 'step' as not certain it always ended up here
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.grower 
				|| nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer 
				|| nsFreshcare.user.roleID === nsFreshcare.data.roles.customer)
			{
				oParam.generateNew = false;
				nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
			}
			else 
			{	
				oParam.generateNew = true;
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.printIndividualCertificate);
				nsFreshcare.data.auditor = {};		// v2.0.2 Need to reset this as could be different to current auditor
				oRoot.admin.certificate.certificateGetData(oParam);
			}
		}

		// Compare to last certificate data and save action / create new version if necessary
		else if (oParam.printIndividualCertStep === 2)
		{
			// v3.1.1 SUP022472 Needed to check if oParam.certifiateData existed
			if (oParam.audit || (oParam.certificateData && oParam.certificateData.audit))
			{
				// v4.0.001 SUP024039 CB's can only print/email/export their own certificates
				if (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor
					|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor
						&& oParam.certificationBody == ns1blankspace.user.contactBusiness))
				{
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.printIndividualCertificate);
					oParam.printIndividualCertStep = 3;
					nsFreshcare.admin.certificate.checkForNewVersion(oParam);
				}
				else
				{
					ns1blankspace.container.confirm(
					{
						title: 'No access to Certificate!',
						html: 'You are not the issuer of ' +
							  oParam.certificateData.growerBusinessName + "'\s current " +
							  oParam.membershipCode + ' certificate ' +
							  'so you are not permitted to print, email or export ' +
							  'the current certificate\'s details.'
					});
					oParam.printIndividualCertStep = 10;
					nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
				}
			}
			else
			{
				ns1blankspace.status.error('No Audit ID - Cannot print Certificate.');
				oParam.printIndividualCertStep = 10;
				nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
			}
		}

		// Determine which cert to print & call relevant PDF creation function
		// 'legacy' prints in format from Classic, 'current' is the format used when creating certs in the new UI
		else if (oParam.printIndividualCertStep === 3)
		{
			// No PDF attached to action - we need to create the PDF (regardless of whether we're viewing / email or not)
			if (oParam.generateNew === true && oParam.attachmentLink == undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.printIndividualCertificate);

				var dSelfCertDate = (nsFreshcare.data.auditor.selfCertificationDate != '') ? new Date(nsFreshcare.data.auditor.selfCertificationDate) : dToday;
				var dIssued = new Date(oParam.certificateDateIssued);

				if (dIssued < dSelfCertDate)
				{
					nsFreshcare.admin.certificate.legacyCertificatePrint(oParam);
				}
				else
				{
					nsFreshcare.admin.certificate.currentCertificatePrint(oParam);
				}
			}

			// we already have an attached PDF, do whatever outputOption passed
			else if (oParam.generateNew == true || (!oParam.generateNew && oParam.actionID && oParam.attachmentLink))
			{
				// View PDF
				if (sOutputOption === '1')		
				{
					window.open('/download/' + oParam.attachmentLink);
					oParam = ns1blankspace.util.setParam(oParam, 'printed', true);
					oParam.printIndividualCertStep = 10;
					nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
				}
				
				// Send Email
				else if (sOutputOption === '2')	
				{
					// First we need to find email template. Do this in step 4
					oParam.printIndividualCertStep = 4;
					nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
				}
				
				// Export 
				else if (sOutputOption === '3')		
				{
					
					if (oResponse === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_CERTIFICATE_SEARCH';
						oSearch.addField('agricertificate.audit.action.description,agricertificate.audit,agricertificate.certificatenumber');
						// v3.1.2 SUP022859 Only show JASANZ users audits for the selected CB if set
						if ((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)
							|| (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz && nsFreshcare.data.viewFilter.certificationBody)) 
						{
							oSearch.addFilter("agricertificate.audit.auditbusiness", "EQUAL_TO", (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz ? nsFreshcare.data.viewFilter.certificationBody : ns1blankspace.user.contactBusiness));
						}
						oSearch.addFilter('agricertificate.id', 'EQUAL_TO', iCertificate);
						oSearch.addFilter('agricertificate.audit.action.actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
						oSearch.rows = 1;
						// v2.0.4i SUP021489 Was sorting by certificate created date
						oSearch.sort('agricertificate.audit.action.createddate', 'desc');
						oSearch.rf = 'JSON';
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.response = oResponse;
								nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
							}
						});
					}
					else
					{
						delete(oParam.response);
						if (oResponse.data.rows.length == 0)
						{
							var sErrorText = 'Certificate data cannot be exported because ' + ns1blankspace.user.contactBusinessText + ' is not the current auditor for this grower'
							if (oParam.exportElementId)
							{
								$('#' + oParam.exportElementId).html(sErrorText);
							}
							else
							{
								ns1blankspace.status.error(sErrorText);
							}
						}
						else
						{
							// v3.1.0i SUP022352 Now makes download link with unique id
							var oItems = oResponse.data.rows;
							var iCount = oItems.length;
							var aHTML = [];
							var sMembershipID = (oParam.xhtmlElementID.split('-').length > 1) ? '-' + oParam.xhtmlElementID.split('-').pop() : '';

							ns1blankspace.status.working('Creating file...');

							aHTML.push('<table style="margin: 10px; font-size:1.0em;">');
							aHTML.push('<tr>');
							aHTML.push('<td class="ns1blankspaceTextMulti">' +
											'<div id="ns1blankspaceFileContents"' +
												' class="ns1blankspaceTextMulti"' +
												' style="background-color:#F3F3F3; width:100%; font-family:Courier New; font-size:0.865em; white-space:pre; overflow:auto;">' +
												'</div>' +
											'</td></tr>' +
											'<tr>' +
											'<td class="ns1blankspaceTextMulti" id="ns1blankspaceFileDownload' + sMembershipID + '">' +
											'</td></tr></table>');

							// Add the export format if not aready done so
							nsFreshcare.admin.setup.exports();
							oParam.totalRows = iCount;
							oParam.name = 'Unsent Mailed Certificates';
							oParam.items = oItems;
							oParam.saveToFile = true;
							oParam.fileName = nsFreshcare.admin.certificate.report.extractCertificateData(oItems[0], 
																										{name: "versionNumber"}) 
												+ '.csv';

							oParam.originalXHTMLElementID = oParam.xhtmlElementID;
							oParam.xhtmlElementID = 'ns1blankspaceFileDownload' + sMembershipID;

							$('#' + oParam.exportElementId).html(aHTML.join(''));
							
							var sFile = ns1blankspace.setup.file["export"].process(oParam);
							oParam.printIndividualCertStep = 10;
							oParam.xhtmlElementID = oParam.originalXHTMLElementID;
							nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
						}
					}

				}
			}

			// v3.1.0i SUP022305 If we're not generating a new one and we don't have an action or a PDF, then alert the user
			else if (!oParam.generateNew && (oParam.actionID == undefined || oParam.attachmentLink == undefined))
			{

				var sMessage = 'The Freshcare Certificate for this audit has not yet been issued' + 
								((nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer || nsFreshcare.user.roleID == nsFreshcare.data.roles.customer)
											? ' by the Certification Body. Please contact the Freshcare Office if you require assistance.'
											: '. Please contact your Certification Body for assistance.');

				ns1blankspace.container.confirm({html: sMessage, title: 'Certificate cannot be printed!',
												buttons: [{text: "OK", icons: {primary: 'ui-icon-check'}, 
														click: function() 
														{
															$('#ns1blankspaceBootstrapDialog').modal('hide');
															oParam.printIndividualCertStep = 10;
															nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
														}}]})
			}
		}


		// Find email template
		else if (oParam.printIndividualCertStep === 4)
		{
			if (nsFreshcare.data.documentEmailCertificateTemplate === undefined)
			{

				var oSearch = new AdvancedSearch();
				oSearch.method = 'DOCUMENT_SEARCH';
				oSearch.addField('url');
				oSearch.addFilter('url', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{	
							nsFreshcare.data.documentEmailCertificateTemplate = oResponse.data.rows[0].id;	
							oParam.printIndividualCertStep = 5;
						}
						else
						{	
							ns1blankspace.status.error('No Certificate Email template. Please create via Freshcare Profile area.');
							oParam.printIndividualCertStep = 10;
						}
					}
					else
					{
						ns1blankspace.status.error('Error finding Certificate email template: ' + oResponse.error.errornotes);
						oParam.printIndividualCertStep = 10;
					}

					nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
				});
			}
			else
			{
				oParam.printIndividualCertStep = 5;
				nsFreshcare.admin.certificate.printIndividualCertificate(oParam);
			}
		}

		// Send Email using template
		else if (oParam.printIndividualCertStep === 5)
		{
			oParam.printIndividualCertStep = 10;
			oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.printIndividualCertificate);
			oParam.emailSubject = 'Freshcare' + (oParam.membershipCode ? ' ' + oParam.membershipCode : '') + ' Certificate - ' + oParam.certificateData.growerBusinessName;
			nsFreshcare.admin.certificate.emailCertificateToGrower(oParam);
		}

		// Reset print button to original values
		else if (oParam.printIndividualCertStep === 10)
		{
			delete(oParam.printIndividualCertStep);
			if (oParam.buttons) {oButtons = oParam.buttons}

			$('#' + sXHTMLElementId)
				.html('')
				.button(oButtons);

			delete(oParam.printed);
			ns1blankspace.xhtml.divID = undefined;
		}	
	},

	certificateGetExpiry: function(oParam)
	{
		// v3.1.209 SUP023095 Changed so that ECA can use same logic - now compares to dExpiryMonthStart instead of JASANZDate
		// v3.3.001 SUP023474 Expiry Month is applicable across the board for Freshcare now, not JASANZ Date dependent
		//					  Now uses 60 days before start of ExpiryMonth, not 2 months			
		// v4.0.012 SUP024144 Applies certificateExtension rules

		var dAudit = ns1blankspace.util.getParam(oParam, 'auditDate').value;
		var dExpiryMonthStart = ns1blankspace.util.getParam(oParam, 'expiryMonthStart', {'default': dAudit}).value;
		var dExpiry = ns1blankspace.util.getParam(oParam, 'expiry').value;
		var iExpiryMonths = ns1blankspace.util.getParam(oParam, 'expiryMonths').value;
		var iExpiryAnniversary = ns1blankspace.util.getParam(oParam, 'expiryAnniversary').value;
		var anniversaryStatus = ns1blankspace.util.getParam(oParam, 'anniversaryStatus').value;
		var iDaysToAnniversary = 0;
		var oAnniversary;
		var iExtensionMonths = ns1blankspace.util.getParam(oParam, 'extensionMonths', {'default': 0}).value;
		if (iExtensionMonths == "") {iExtensionMonths = 0} else {iExtensionMonths = parseInt(iExtensionMonths)}

		var bCertificateExtension = nsFreshcare.option.certificateExtension.is;
		var iDaysBefore = (bCertificateExtension) ? nsFreshcare.option.certificateExtension.maxAuditBeforeExpiryDays : 60;

		dAudit = new Date(dAudit.toString('dd MMM yyyy'));

		if (dAudit < dExpiryMonthStart || iExpiryAnniversary == 0)
		{
			dExpiry = new Date(dAudit.toString('dd MMM yyyy'));		// v3.1.203 SUP022986 Needs to add months to Audit date, not current expiry
			dExpiry.addMonths(iExpiryMonths);
			dExpiry.addDays(28);
			iExpiryAnniversary = (dAudit >= dExpiryMonthStart) ? (dExpiry.getMonth() + 1) : 0;
		}
		else
		{
			// SUP022693 If the Audit is in the iDaysBefore days before the beginning of the ExpiryAnniversary Month, (v3.3.001 SUP023474 changed from 2 mths to 60 days)
			//		Add # Months to Anniversary + iExpiry months to get the end month of expiry
			// 		Else, we set end month of expiry to number of months between Audit date and Anniversary month

			// SUP022948 To find MonthsToAnniversary
			// 		If the number of months between ExpiryAnniversary and Audit Date <= 0, Add 12 months to difference
			// 		If MonthsToAnniversary is either 1 or 2, add ExpiryMonths to result, otherwise, add ExpiryMonths - 12
			// Add iMonthsToAnniversary to Audit Date to find Expiry date and then get the end of month date

			var dAnniversaryStart = new Date(dAudit.getFullYear() + (iExpiryAnniversary - (dAudit.getMonth() + 1) >= 0 ? 0 : 1) + '-' + iExpiryAnniversary + '-01');
			var iMonthsToAniversary = (iExpiryAnniversary - (dAudit.getMonth() + 1)) < 0
									? (iExpiryAnniversary - (dAudit.getMonth() + 1)) + 12
									: iExpiryAnniversary - (dAudit.getMonth() + 1);
			
			// v3.3.001 SUP023563 Determine whether audit in within eligible period for re-cert audit month
			if (anniversaryStatus) 
			{
				oAnniversary = {};
				iDaysToAnniversary = parseInt((dAnniversaryStart - dAudit) / 86400000);
				// Months 10 & 11 are when the audit is AFTER the recert audit month
				if (iMonthsToAniversary == 10 || iMonthsToAniversary == 11)
				{
					oAnniversary.status = 2;
					oAnniversary.message = 'Audit undertaken after Member\'s set ReCert Audit Month.<br /><br />' +
									'Please record details of why this occurred or update Re-Certification Audit Due Month on the Member\'s Membership Page to continue.<br /><br />' +
									'Contact Freshcare if assistance required.';
				}				
				// SUP024144 Audit is too far before anniversary month and iDaysBefore has been extended
				else if (iDaysBefore != 60 
					&& ((iMonthsToAniversary >= 4 && iMonthsToAniversary <= 9) 
						|| (iDaysToAnniversary > 60 && iDaysBefore <= iDaysBefore)))
				{
					oAnniversary.status = 4; 
					oAnniversary.message = 'Audit date is more than ' + iDaysBefore + ' days prior to Members set ReCert Audit Month.<br /><br />' +
									'Update to Re-Certification Audit Due required on the Member\'s Membership Page before continuing.<br /><br />' +
									'<span style="color: red;">* Extraordinary circumstances allow for extended certificates - ' +
									'click the "Record details" button below if applicable</span>';
				}
				// These months when the audit is too far BEFORE the anniversary month. Also if month 3 and iDaysToAnniversary > iDaysBefore 
				else if ((iMonthsToAniversary >= 4 && iMonthsToAniversary <= 9) || iDaysToAnniversary > iDaysBefore)
				{
					oAnniversary.status = 1;
					oAnniversary.message = 'Audit date is more than ' + iDaysBefore + ' days prior to Members set ReCert Audit Month.<br /><br />' +
									'Update to Re-Certification Audit Due required on the Member\'s Membership Page before continuing.<br /><br />' +
									'Contact Freshcare if assistance required.';
				}
				// The audit is iDaysBefore days or less prior to the anniversary month (months 1 or 2) or it's month 12
				else
				{
					oAnniversary.status = 0;
				}
			}
			// v3.4.001 Was changing dAudit when calling addMonths
			if (dAudit >= dAnniversaryStart.add({days: (iDaysBefore * -1)}))
			{	// Within the eligible period to get a full x months from expirymonths
				dExpiry = (new Date(dAudit)).addMonths(iMonthsToAniversary + iExpiryMonths);		// Add ExpiryMonths
			}
			else
			{
				dExpiry = (new Date(dAudit)).addMonths(iMonthsToAniversary + (iExpiryMonths - 12));	// Add ExpiryMonths less 12
			}
			dExpiry = (dExpiry).addMonths(iExtensionMonths);

		}

		// Now get the end date of the dExpiry month (First day of following month less one day)
		// v4.0.012 SUP024144 Add iExtensionMonths 
		if (dAudit >= dExpiryMonthStart)
		{
			dExpiry = new Date(dExpiry.getFullYear(), dExpiry.getMonth() + 1, 1);
			dExpiry.addDays(-1);
		}

		return (oAnniversary != undefined ? oAnniversary : dExpiry);
	},

	certificateGetData: function(oParam) 
	{
		// Fields needed:
		// Grower Business name
		// Grower Site Address(es)
		// Grower Person Groups (comma delimited)
		// Grower Categories (comma delimited)
		// Membership Code of Practice
		// Certificate Number & Expiry Date & Recertification Audit Date
		// Certification Body
		
		var iCertificate;
		var iGrowerBusiness;
		var iGrowerPerson;
		var sGrowerBusiness;
		var iSubscription;
		var iMembership;
		var iCodeOfPractice;
		var sCertificate;
		var sCertificateDateIssued;
		var oSiteAddresses = {};
		var iCertificateGetDataStep = 1;
		var oCertificate = {};
		var sErrorMessage = '';
		var aExtensions = [];

		if (oParam) {
			if (oParam.certificate) {iCertificate = oParam.certificate}
			if (oParam.certificateGetDataStep) {iCertificateGetDataStep = oParam.certificateGetDataStep}
			if (oParam.growerBusiness) {iGrowerBusiness = oParam.growerBusiness}
			if (oParam.growerPerson) {iGrowerPerson = oParam.growerPerson}
			if (oParam.subscription) {iSubscription = oParam.subscription}
			if (oParam.membership) {iMembership = oParam.membership}
			if (oParam.codeOfPractice) {iCodeOfPractice = oParam.codeOfPractice}
			if (oParam.certificateDateIssued) {sCertificateDateIssued = oParam.certificateDateIssued}
			
		}
		else {oParam.certificateData = {}}


		if (iCertificate) 
		{
			// We're getting Certificate, Subscription, Audit, COP & Business details
			if (iCertificateGetDataStep === 1) 
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Certificate'});	}

				// v1.0.2 We no longer get any addresses here as we need to get them all from locationaddress
				// v3.1.2 Now searches for as much information as it can in this call. Added COP, Audit data so steps 2 and 3 not required
				// v3.3.001 SUP023563 Added serecertauditmonth. SUP023474 Added sejasanzaudit
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_CERTIFICATE_SEARCH';
				oSearch.addField('agricertificate.certificatenumber,agricertificate.externalcertificatenumber,agricertificate.enddate,agricertificate.dateissued,agricertificate.audit' +
								',agricertificate.subscription.id,agricertificate.subscription.membership.code,agricertificate.subscription.membership.jasanzaccredited' + 
								',agricertificate.subscription.codeofpractice,agricertificate.subscription.contactperson,agricertificate.subscription.membership,agricertificate.audit.sejasanzaudit' +
								',agricertificate.subscription.contactbusiness,agricertificate.subscription.contactbusiness.tradename,agricertificate.subscription.contactbusiness.legalname' +
								',agricertificate.subscription.crop,agricertificate.audit,agricertificate.subscription.expirymonth,agricertificate.audit.actualdate' +
								',agricertificate.audit.codeofpractice.description,agricertificate.audit.codeofpractice.auditdueafter,agricertificate.audit.auditbusinesstext' +
								',agricertificate.audit.auditbusiness,agricertificate.audit.reference,agricertificate.audit.resultstatusdate,agricertificate.audit.serecertauditmonth' +
								',agricertificate.audit.auditpersontext,agricertificate.audit.type,agricertificate.audit.typetext,agricertificate.subscription.expirychangeddate' +
								',agricertificate.audit.sefullcertdata,agricertificate.audit.seextensionmonths');
				oSearch.addFilter('id', 'EQUAL_TO', iCertificate);
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK') 
					{
						if (oResponse.data.rows.length > 0)
						{
							var oRow = oResponse.data.rows[0];
							var aErrors = [];

							if (oParam.certificateData === undefined) 
							{
								oParam.certificateData = {};
								oParam.certificateData['certificateNumber'] = oRow['agricertificate.certificatenumber'].formatXHTML();
								oParam.certificateData['certificateNumberCertBody'] = oRow['agricertificate.externalcertificatenumber'].formatXHTML();
								oParam.certificateData['certificateExpiry'] = oRow['agricertificate.enddate'].formatXHTML();
								oParam.certificateData['growerBusinessName'] = oRow['agricertificate.subscription.contactbusiness.legalname'].formatXHTML();
								oParam.certificateData['growerTradeName'] = oRow['agricertificate.subscription.contactbusiness.tradename'].formatXHTML();
								oParam.certificateData['crops'] = oRow['agricertificate.subscription.crop'].formatXHTML();
								oParam.certificateData['audit'] = oRow['agricertificate.audit'];
								// v3.2.017 SUP023494 JasanzAccredited uses value stored in sejasanzaudit as the single point of truth
								oParam.certificateData['jasanzAccredited'] = (oRow['agricertificate.audit.sejasanzaudit'] == "Y" ? 'Y' : 'N');
								oParam.certificateData.fullCertificateData = (oRow['agricertificate.audit.sefullcertdata'] == "Y" ? 'Y' : 'N');

								oParam.membership = oRow['agricertificate.subscription.membership'];
								oParam.membershipCode = oRow['agricertificate.subscription.membership.code'].formatXHTML();
								oParam.growerBusiness = oRow['agricertificate.subscription.contactbusiness'];
								oParam.growerPerson = oRow['agricertificate.subscription.contactperson'];
								oParam.subscription = oRow['agricertificate.subscription.id'];
								oParam.codeOfPractice = oRow['agricertificate.audit.codeofpractice'];
								oParam.certificateData.codeOfPractice = oRow['agricertificate.audit.codeofpractice.description'].formatXHTML();
								oParam.copAuditDueAfter = oRow['agricertificate.audit.codeofpractice.auditdueafter'];
								oParam.certificateDateIssued = oRow['agricertificate.dateissued'];

								oParam.certificateData['auditDate'] = oRow['agricertificate.audit.actualdate'];
								oParam.certificateData['certificationBodyLegalName'] = oRow['agricertificate.audit.auditbusinesstext'].formatXHTML();
								oParam.certificateData['certificationAchieved'] = oRow['agricertificate.audit.resultstatusdate'];
								oParam.certificateData.auditReference = oRow['agricertificate.audit.reference'];
								oParam.certificateData.auditTypeText = oRow['agricertificate.audit.typetext'];
								oParam.certificateData.auditType = oRow['agricertificate.audit.type'];
								oParam.certificationBody = oRow['agricertificate.audit.auditbusiness'];
								oParam.auditorName = oRow['agricertificate.audit.auditpersontext'].formatXHTML();

								if (oRow['agricertificate.audit'] == '')
								{
									aErrors.push('Audit record');
								}
								if (oRow['agricertificate.subscription.id'] == '')
								{
									aErrors.push('Subscription record');
								}
								if (oRow['agricertificate.audit.codeofpractice'] == '')
								{
									aErrors.push('Code Of Practice values');
								}
								if (oRow['agricertificate.subscription.contactbusiness'] == '')
								{
									aErrors.push('' + nsFreshcare.data.growerText + ' record');
								}
								if (oRow['agricertificate.subscription.membership'] == '')
								{
									aErrors.push('Membership values')
								}

								if (aErrors.length == 0)
								{
									var dActual = new Date(oParam.certificateData.auditDate);
									oParam.certificateData.auditDate = dActual.toString('dd MMMM yyyy');

									var dCertificationAchieved = new Date(oParam.certificateData.certificationAchieved);
									oParam.certificateData.certificationAchieved = dCertificationAchieved.toString('dd MMMM yyyy');

									var dExpiryChanged = (oRow['agricertificate.subscription.expirychangeddate'] != '') ? new Date(oRow['agricertificate.subscription.expirychangeddate']) : undefined;
									var dCertificateIssued = (oRow['agricertificate.dateissued'] != '') ? new Date(oRow['agricertificate.dateissued']) : undefined;
									var iExpiryAnniversary = (oRow['agricertificate.audit.serecertauditmonth']
																? parseInt(oRow['agricertificate.audit.serecertauditmonth'])
																: (oRow['agricertificate.subscription.expirymonth'] != '' 
																	? parseInt(oRow['agricertificate.subscription.expirymonth']) 
																	: 0))

									// v3.1.2 SUP022693 Now stores the month of Expiry to RecertificationDue 
									// v3.3.004 SUP023800 Must always recalculate expiry date in case data has changed to impact it
									// v4.0.011 SUP022693 Above applies, except when a Scope Extension Audit
									// v4.0.012 SUP024144 Added extensionMonths field
									if (oRow['agricertificate.audit.type'] != nsFreshcare.data.audit.typeScopeExtension)
									{
										oParam.certificateData.certificateExpiryDate = nsFreshcare.admin.certificate.certificateGetExpiry(
										{
											auditDate: dActual,
											expiry: new Date(oParam.certificateData.certificateExpiry),
											expiryMonths: (oParam.copAuditDueAfter != '' ? parseInt(oParam.copAuditDueAfter) : '0'),
											expiryAnniversary: iExpiryAnniversary,
											extensionMonths: oRow['agricertificate.audit.seextensionmonths']
										}).toString('dd MMM yyyy');
										oParam.certificateData.certificateExpiry = oParam.certificateData.certificateExpiryDate.toString('dd MMM yyyy');
									}	
									else
									{
										oParam.certificateData.certificateExpiryDate = oRow['agricertificate.enddate'];
									}

									// Get the Re-certification Audit date (not really ise anymore but calculated for backward compatibility )
									if (oParam.certificateData.auditDate && oParam.copAuditDueAfter) 
									{
										var dRecertDate = new Date(dActual.setMonth(dActual.getMonth() + Number(oParam.copAuditDueAfter)));
										oParam.certificateData.reCertificationDate = dRecertDate.toString('MMMM yyyy');
									}
									
									// v4.0.012 SUP024144 If certificate extended, don't change reCertDue date. 
									// Assumes that seextensionmonths can't be set until after cert has been created
									if (oRow['agricertificate.audit.seextensionmonths'] == '')
									{
										oParam.certificateData.reCertificationDue = (new Date(oParam.certificateData.certificateExpiryDate)).toString('MMMM yyyy');
									}
									else
									{
										oParam.certificateData.reCertificationDue = (new Date(oParam.certificateData.certificateExpiryDate)).addMonths(-1 * parseInt(oRow['agricertificate.audit.seextensionmonths'])).toString('MMMM yyyy');
									}
									
									oParam.certificateGetDataStep = (oParam.certificateData.auditType == nsFreshcare.data.audit.typeScopeExtension) ? 31 : 4;
								}
								else
								{
									// ToDo v3.1.2 Add error reporting for missing data or call relevant step
									sErrorMessage = 'Unable to find the following data:<br /><br/>' + aErrors.join('<br />') + '<br /><br />Please contact support.';
									oParam.certificateGetDataStep = 10;
									if (oParam.sendCertificatesStep)
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
										oParam.sendCertificatesStep = 10;
									}
									else
									{
										ns1blankspace.status.error(sErrorMessage);
									}
								}
							}
							else {oParam.certificateGetDataStep = (oParam.certificateData.auditType == nsFreshcare.data.audit.typeScopeExtension) ? 31 : 4;}

							if (oParam.certificateData.certificateExpiry) 	// Convert to dd MMMM yyyy format
							{
								// v3.1.202 SUP022978 Was giving a UTC date and causing new cert versions to be created. certificateExpiry was also not being converted to a date first
								oParam.certificateData.certificateExpiryDate = new Date(oParam.certificateData.certificateExpiry).toString('dd MMM yyyy')
								oParam.certificateData.certificateExpiry = (new Date(oParam.certificateData.certificateExpiryDate).toString('dd MMMM yyyy'));
							}
						} 
						else
						{
							sErrorMessage = 'Certificate record not found.';
							oParam.certificateGetDataStep = 10;
							if (oParam.sendCertificatesStep)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
								oParam.sendCertificatesStep = 10;
							}
							else
							{
								ns1blankspace.status.error(sErrorMessage);
							}
						}

						nsFreshcare.admin.certificate.certificateGetData(oParam);
					}
					else
					{
						sErrorMessage = 'Error finding Certificate record';
						oParam.certificateGetDataStep = 10;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
						}
					}
				}); 

			}
			
			// v3.1.2 SUP022693 Find the Scope Extension records if required
			else if (iCertificateGetDataStep === 31) 
			{	// We don't end up in here unless a Scope Extension Audit
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Scope Extension data'});	}

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_CERTIFICATE_UPGRADE_SEARCH';
				oSearch.addField('audit,subscription,object,objectcontext,changedfield,changedvalue');
				oSearch.addFilter('audit', 'EQUAL_TO', oParam.certificateData.audit);
				oSearch.addFilter('subscription', 'EQUAL_TO', iSubscription);
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK' 
						&& (oResponse.data.rows.length > 0 || (oParam.certificateData.fullCertificateData)))
					{
						oParam.certificateData.scopeExtension = oResponse.data.rows;
						oParam.certificateGetDataStep = 32;
					}
					else
					{
						sErrorMessage = (oResponse != 'OK') ? 'Error finding Scope Extension data' : 'No Scope Extension rows exist for Scope Extension audit - cannot generate Certificate.'
						oParam.certificateGetDataStep = 10;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
						}
					}
					nsFreshcare.admin.certificate.certificateGetData(oParam);
				});
			}

			// v3.1.2 SUP022693 Find Last Audit's Certificate reference number (Scope Extension Only)
			else if (iCertificateGetDataStep == 32)
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Certificate Reference'});	}

				// v4.0.012 SUP024157 Added filter to make sure we don't pick up scope extension audits
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('actualdate,membershipstatus,audit.action.subject');
				oSearch.addFilter('subscription', 'EQUAL_TO', iSubscription);
				oSearch.addFilter('id', 'NOT_EQUAL_TO', oParam.certificateData.audit);
				oSearch.addFilter('type', 'NOT_EQUAL_TO', nsFreshcare.data.audit.typeScopeExtension);
				oSearch.addFilter('audit.action.actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
				oSearch.addFilter('membershipstatus', 'IN_LIST', nsFreshcare.data.grower.subscriptionStatusIN + ',' + nsFreshcare.data.grower.subscriptionStatusCE);
				oSearch.sort('actualdate', 'desc');
				oSearch.sort('audit.action.createddate', 'desc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK' && oResponse.data.rows.length > 0)
					{
						// We only want the most recent record as this should be the most recent Audit
						oParam.certificateData.scopeExtension.certificationAuditReference = 'AUD' + oResponse.data.rows[0]['audit.action.subject'].split('AUD').pop();

						// If Crops were changed, we set the crop value here as it doesn't require another call
						aExtensions = $.grep(oParam.certificateData.scopeExtension, function(x) {return x.changedfield == 'crop'});
						if (aExtensions.length > 0)
						{
							oParam.certificateData.crops = $.map(aExtensions, function(x) {return x.changedvalue.formatXHTML()}).join(', ');
						}
						else
						{
							if (oParam.certificateData.fullCertificateData != 'Y') 		// v3.4.015 SUP023981 Refer to old cert unless all data reqd
							{
								oParam.certificateData.crops = 'Refer to Freshcare Certificate ' + oParam.certificateData.scopeExtension.certificationAuditReference;
							}
						}
						oParam.certificateGetDataStep = 4;
					}
					else
					{
						sErrorMessage = (oResponse != 'OK') ? 'Error finding Certification Audit' : 'No previous certified Audit exists for Scope Extension audit - cannot generate Certificate.'
						oParam.certificateGetDataStep = 10;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errorNotes);
						}
					}
					nsFreshcare.admin.certificate.certificateGetData(oParam);
				});
			}

			// We're getting Product Category data 
			// v1.0.3a Changed from Scope to Category
			else if (iCertificateGetDataStep === 4) 
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Category'});	}

				// v1.0.2 Added subscription filter
				// v3.1.2 SUP022693 If ScopeExtension, search for list of Category records against ScopeExension, otherwise, list all
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
				oSearch.addField('productcategorytext');
				oSearch.addFilter('subscription', 'EQUAL_TO', oParam.subscription);
				if (oParam.certificateData.scopeExtension)
				{
					aExtensions = $.grep(oParam.certificateData.scopeExtension, function(x) {return x.object == nsFreshcare.objectProductCategory});
					if (aExtensions.length > 0)
					{
						oSearch.addFilter('id', 'IN_LIST', $.map(aExtensions, function(x) {return x.objectcontext}).join(','));
					}
				}
				oSearch.getResults(function(oResponse) 
				{

					if (oResponse.status === 'OK') 
					{
						// If ScopeExtension Audit and no ScopeExtension values for category, set to "Refer to Freshcare Certificate "
						// v3.4.015 SUP023981 Unless fullCertificateData = 'Y'
						oParam.certificateData['category'] = (oParam.certificateData.scopeExtension == undefined 
															  || (oParam.certificateData.scopeExtension && oResponse.data.rows.length > 0 
															  		&& (aExtensions.length > 0 || oParam.certificateData.fullCertificateData == 'Y')))
																? $.map(oResponse.data.rows, function(a) {return a.productcategorytext.formatXHTML()}).join(', ')
																: 'Refer to Freshcare Certificate ' + oParam.certificateData.scopeExtension.certificationAuditReference;

						oParam.certificateGetDataStep = 5;
					}
					if (oResponse.status != 'OK' || oParam.certificateData.category == '')
					{
						sErrorMessage = (oResponse.status != 'OK') ? 'Error finding category': 'Error: Category cannot be found.';
						oParam.certificateGetDataStep = 10;
						var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
						}
					}
					nsFreshcare.admin.certificate.certificateGetData(oParam);
				}); 
			}

			// We're getting Sites data
			else if (iCertificateGetDataStep === 5) 
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Sites'});	}

				// No longer calls siteAddress.search as we're using location_addresses
				// v3.1.2 SUP022693 If ScopeExtension, search for list of Site records against ScopeExension, otherwise, list all
				// v3.3.001 SUP023706 Get only active site addresses
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('address1,address2,addresssuburb,addressstate,addresspostcode,reference');
				oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('address.addresslink.objectcontext', 'EQUAL_TO', oParam.subscription);
				oSearch.addFilter('status', 'NOT_EQUAL_TO', '3');			// Active ones are 1 & 2
				if (oParam.certificateData.scopeExtension)
				{
					aExtensions = $.grep(oParam.certificateData.scopeExtension, function(x) {return x.object == nsFreshcare.objectLocation});
					if (aExtensions.length > 0)
					{
						oSearch.addFilter('id', 'IN_LIST', $.map(aExtensions, function(x) {return x.objectcontext}).join(','));
					}
				}
				oSearch.sort('id', 'asc');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK' && oResponse.data.rows.length > 0) 
					{
						oParam.certificateData.sites = [];
						var aSites = $.map(oResponse.data.rows, function(x) 
													{
														return {'streetCombined': x.address1.formatXHTML() + ((x.address2 != '') ? ' ' + x.address2.formatXHTML() : ''),
																'streetLocation': x.addresssuburb.formatXHTML() + ' ' + x.addressstate.formatXHTML() + ' ' + x.addresspostcode.formatXHTML()}
													});
						// If ScopeExtension Audit and no ScopeExtension values for Site, set to "Refer to Freshcare Certificate "
						oParam.certificateData.sites = (oParam.certificateData.scopeExtension == undefined 
														|| (oParam.certificateData.scopeExtension && aSites.length > 0 
															&& (aExtensions.length > 0 || oParam.certificateData.fullCertificateData == 'Y')))
																? aSites
																: [{streetCombined: 'Refer to Freshcare Certificate', streetLocation: oParam.certificateData.scopeExtension.certificationAuditReference}];
						oParam.certificateGetDataStep = 6;
					}
					if (oResponse.status != 'OK' || oParam.certificateData.sites.length == 0)
					{
						sErrorMessage = (oResponse.status != 'OK') ? 'Error finding Sites': 'Error: Sites cannot be found.';
						oParam.certificateGetDataStep = 10;
						var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
						}
					}

					nsFreshcare.admin.certificate.certificateGetData(oParam);
				});
			}

			// v2.0.3a We're getting Scope data
			// v3.1.2 Now looks to AGri_Scope table
			else if (iCertificateGetDataStep === 6) 
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Scope'});	}

				// v3.1.2 SUP022693 If ScopeExtension, search for list of Scope records against ScopeExension, otherwise, list all
				// v4.0.012 Make sure we only search for valid scopes for the current membership
				var aValidScopes = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == oParam.membership}).shift().validScopes;
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('scopetext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', oParam.subscription);
				oSearch.addFilter('scope', 'IN_LIST', $.map(aValidScopes, function(x) {return x.scope}).join(','));
				if (oParam.certificateData.scopeExtension)
				{
					aExtensions = $.grep(oParam.certificateData.scopeExtension, function(x) {return x.object == nsFreshcare.objectScope});
					if (aExtensions.length > 0)
					{
						oSearch.addFilter('id', 'IN_LIST', $.map(aExtensions, function(x) {return x.objectcontext}).join(','));
					}
				}
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK' && oResponse.data.rows.length > 0) 
					{
						// If ScopeExtension Audit and no ScopeExtension values for category, set to "Refer to Freshcare Certificate "
						oParam.certificateData.certificateScope = (oParam.certificateData.scopeExtension == undefined 
																	|| (oParam.certificateData.scopeExtension && oResponse.data.rows.length > 0 
																		&& (aExtensions.length > 0 || oParam.certificateData.fullCertificateData == 'Y')))
																? $.map(oResponse.data.rows, function(a) {return a.scopetext.formatXHTML()}).join(', ')
																: 'Refer to Freshcare Certificate ' + oParam.certificateData.scopeExtension.certificationAuditReference;

						oParam.certificateGetDataStep = 7;
					}
					if (oResponse.status != 'OK' || oParam.certificateData.certificateScope == '')
					{
						sErrorMessage = (oResponse.status != 'OK') ? 'Error finding Scope': 'Error: Scope cannot be found.';
						oParam.certificateGetDataStep = 10;
						var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
							oParam.sendCertificatesStep = 10;
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
						}
					}

					nsFreshcare.admin.certificate.certificateGetData(oParam);
				}); 

			}

			// If Current format Certificate, get the Certification Body data if not already set
			else if (iCertificateGetDataStep === 7)
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Certification Body mailing address'});	}

				// Get values for auditor.selfCert if undefined or it's a different business (v4.0.001 SUP024039)
				if (nsFreshcare.data.auditor === undefined || nsFreshcare.data.auditor === {} 
					|| nsFreshcare.data.auditor.contactBusiness != oParam.certificationBody
					|| nsFreshcare.data.auditor.selfCertificationDate === undefined)
				{
					nsFreshcare.data.auditor = {}; 	// Set to blank so that it picks up ALL new values
					ns1blankspace.util.setParam(oParam, 'onCompleteWhenCan', oParam.onComplete);
					ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.certificate.certificateGetData);
					nsFreshcare.control.getCertificationBodyOptions(oParam);
				}
				else
				{
					// v3.2.018 SUP023622 Added dTodayShort variable
					var dTodayShort = new Date(dToday.toString('dd MMM yyyy'));
					var dIssued = new Date(oParam.certificateDateIssued);
					var dSelfCertDate = (nsFreshcare.data.auditor.selfCertificationDate != '') ? new Date(nsFreshcare.data.auditor.selfCertificationDate) : dToday;
					var dAudit = new Date(oParam.certificateData.auditDate);

					// v4.0.001 SUP024039 ALWAYs do this, not just when self-certified
					//if (dIssued >= dSelfCertDate)		// If we're on or after the self Cert date
					//{
						if (nsFreshcare.data.auditor.streetAddress == undefined)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'CONTACT_BUSINESS_SEARCH';
							oSearch.addField('se' + nsFreshcare.data.certificationBodyNumberId + ',legalname,streetaddress1,streetaddress2,streetpostcode,streetsuburb,streetstate');
							oSearch.addFilter('id', 'EQUAL_TO', oParam.certificationBody);
							oSearch.rows = 1;
							oSearch.getResults(function(oResponse)
							{

								if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
								{
									var oRow = oResponse.data.rows[0];
									// v2.0.3e CB Address always to show on two lines
									nsFreshcare.data.auditor.certificationBodyNumber = oRow['se' + nsFreshcare.data.certificationBodyNumberId].formatXHTML();
									nsFreshcare.data.auditor.streetAddress = oRow.streetaddress1.formatXHTML() +
																     ((oRow.streetaddress2 != '') ? ' ' + oRow.streetaddress2.formatXHTML() : '') + '<br />' +
																     oRow.streetsuburb.formatXHTML() + ' ' + 
																     oRow.streetstate.formatXHTML() + ' ' +
																     oRow.streetpostcode.formatXHTML();
									nsFreshcare.data.auditor.legalName = oRow.legalname.formatXHTML();

									oParam.certificateData['certificationBodyNumber'] = nsFreshcare.data.auditor.certificationBodyNumber;
									oParam.certificateData['certificationBodyAddress'] = nsFreshcare.data.auditor.streetAddress;
									oParam.certificateGetDataStep = 8;
									nsFreshcare.admin.certificate.certificateGetData(oParam);
								}
								else
								{
									sErrorMessage = (oResponse.status != 'OK') ? 'Processing stopped: Error finding Certification Body address': 'Processing stopped: Certification Body address cannot be found.';
									var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
									if (oParam.sendCertificatesStep)
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
									}
									else
									{
										ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
									}
								}
							});
						}
						else
						{
							if (nsFreshcare.data.auditor.streetAddress.replace(/ /g,'') === '')
							{
								sErrorMessage = 'Processing stopped: Certification Body mailing address is blank. ' +
									'Please ' + (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor ? 'update via Freshcare Profile' : 'contact Certification Body') + ' to continue.';
								if (oParam.sendCertificatesStep)
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
								}
								else
								{
									ns1blankspace.status.error(sErrorMessage);
								}
							}
							else
							{
								// V3.1.0e SUP022248 Was dropping off address after previewing as these values were not being set
								oParam.certificateData['certificationBodyNumber'] = nsFreshcare.data.auditor.certificationBodyNumber;
								oParam.certificateData['certificationBodyAddress'] = nsFreshcare.data.auditor.streetAddress;
								oParam.certificateGetDataStep = 8;
								nsFreshcare.admin.certificate.certificateGetData(oParam);
							}
						}
					//}
					//else
					//{
					//	oParam.certificateGetDataStep = 9;
					//	nsFreshcare.admin.certificate.certificateGetData(oParam);
					//}
				}
			}
			
			// Get the id of the CB Logo and Signature images
			else if (iCertificateGetDataStep === 8)
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Searching for Certification Body logo & signature images'});	}

				if (nsFreshcare.data.auditor.certificateLogoImage === undefined || nsFreshcare.data.auditor.certificateLogoImage === '' ||
					nsFreshcare.data.auditor.certificateSignatureImage === undefined || nsFreshcare.data.auditor.certificateSignatureImage ==='')
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_ATTACHMENT_SEARCH';
					oSearch.addField('type,filename,attachment,publiclocation,publictype');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectBusiness);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', oParam.certificationBody);
					oSearch.addFilter('type', 'IN_LIST', nsFreshcare.data.attachmentTypeLogo + ',' + nsFreshcare.data.attachmentTypeSignature);
					oSearch.sort('type', 'asc');
					oSearch.sort('createddate', 'asc');	// We want the most recently uploaded one last - this will be the last value it sets
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
						{
							$.each(oResponse.data.rows, function()
							{
								if (this.type === nsFreshcare.data.attachmentTypeLogo)
								{
									oParam.certificateData['logoImage'] = this.publiclocation.formatXHTML();
									nsFreshcare.data.auditor.certificateLogo = this.attachment;
									nsFreshcare.data.auditor.certificateLogoImage = this.publiclocation.formatXHTML();
								}

								if (this.type === nsFreshcare.data.attachmentTypeSignature)
								{
									oParam.certificateData['signatureImage'] = this.publiclocation.formatXHTML();
									nsFreshcare.data.auditor.certificateSignatureId = this.attachment;
									nsFreshcare.data.auditor.certificateSignatureImage = this.publiclocation.formatXHTML();
								}
							});

							// v2.0.3b Added check to see if images were found
							if (oParam.certificateData.signatureImage === undefined || oParam.certificateData.signatureImage === '' ||
								oParam.certificateData.logoImage === undefined || oParam.certificateData.logoImage === '')
							{
								sErrorMessage = (oResponse.status != 'OK') ? 'Processing stopped: Error finding Certification Body logo or signature': 'Processing stopped: Certification Body logo or signature cannot be found.';
								var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
								if (oParam.sendCertificatesStep)
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
								}
								else
								{
									ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
								}
							}
							else
							{
								oParam.certificateGetDataStep = 9;	
								nsFreshcare.admin.certificate.certificateGetData(oParam);
							}
						}
						else
						{
							sErrorMessage = (oResponse.status != 'OK') ? 'Processing stopped: Error finding Certification Body logo or signature': 'Processing stopped: Certification Body logo or signature cannot be found.';
							var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
							if (oParam.sendCertificatesStep)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
							}
							else
							{
								ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
							}
						}
					});

				}
				else
				{
					oParam.certificateGetDataStep = 9;
					oParam.certificateData.logoImage = nsFreshcare.data.auditor.certificateLogoImage;
					oParam.certificateData.signatureImage = nsFreshcare.data.auditor.certificateSignatureImage;
					nsFreshcare.admin.certificate.certificateGetData(oParam);
				}
			}

			// First compile all relevant Certificate information into oParam.certificateData (for comparing to ACTION if necessary)
			else if (iCertificateGetDataStep === 9) 
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Compiling Certificate Data'});	}

				if (oParam.certificateData)
				{
					oCertificate = oParam.certificateData;
					oParam.background = nsFreshcare.data.documentCertificateBackground;

					// Now determine the template text to use
					nsFreshcare.admin.certificate.certificateGetTemplate(oParam);
					if (oParam.template === undefined)
					{
						ns1blankspace.status.error('Unable to determine Certificate Template');
					}
				}
				else
				{
					sErrorMessage = 'Error: Certificate data not set.';
					if (oParam.sendCertificatesStep)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
						oParam.sendCertificatesStep = 10;
					}
					else
					{
						ns1blankspace.status.error(sErrorMessage);
					}
				}
				oParam.certificateGetDataStep = 10;
				nsFreshcare.admin.certificate.certificateGetData(oParam);
			}


			else if (iCertificateGetDataStep === 10)
			{
				// Now call back the onComplete function
				delete(oParam.certificateGetDataStep);
				delete(oParam.response);
				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}

			}
		}
		else 
		{
			sErrorMessage = 'Error: No parameters passed to certificateGetData.';
			if (oParam.sendCertificatesStep)
			{
				nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
				oParam.sendCertificatesStep = 10;
			}
			else
			{
				ns1blankspace.status.error(sErrorMessage);
			}
		}
	},

	certificateGetTemplate: function(oParam)
	{
		// Work out which certificate template to use.
		// Critieria is:
		// If certificate date issued is before CB self-certified date, use legacy templates
		// If certificate date issued is after or on CB self-certified date,
		//    if membership id jasanz accredited and Audit's JASANZAudit flag is Y, use jasanz templates
		//	  otherwise use fc templates

		// Mandatory parameters are:
		// membership (non-blank)
		// certificateData.jasanzAccredited
		// certificateDateIssued (non-blank)
		// Also must have nsFreshcare.data.auditor.selfCertificationDate (non-blank)

		// v3.3.001 Template docs stored on nsFreshcare.data.memberships object

		var bValidParms = (oParam != undefined);
		oParam = oParam || {}
		var dIssued;
		var dAudit;
		var dSelfCertStart;
		var dTodayShort = new Date(dToday.toString('dd MMM yyyy'));
		var oMembership;

		if (oParam.membership == undefined || oParam.membership == '') {bValidParms = false;}
		if (oParam.certificateData.jasanzAccredited == undefined) {bValidParms = false;}
		if (oParam.certificateDateIssued == undefined || oParam.certificateDateIssued === '') {bValidParms = false;}
		if (oParam.certificateData.auditDate == undefined || oParam.certificateData.auditDate === '') {bValidParms = false;}
		if (nsFreshcare.data.auditor == undefined || nsFreshcare.data.auditor.selfCertificationDate == undefined) 
		{bValidParms = false}

		if (bValidParms)
		{
			dIssued = new Date(oParam.certificateDateIssued);
			dAudit = new Date(oParam.certificateData.auditDate);
			dSelfCertStart = (nsFreshcare.data.auditor.selfCertificationDate === '') ? dToday : new Date(nsFreshcare.data.auditor.selfCertificationDate);
			oMembership = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == oParam.membership}).shift();
			
			// First check whether the certificate was issued before the Self-Certification date - we use legacyCertificate templates, regardless
			// v2.0.3a Was using <= operator
			if (dIssued < dSelfCertStart)
			{
				// v3.1.1 SUP022472 Wasn't setting correct background document for Legacy Certificates
				oParam.background = nsFreshcare.data.legacyCertificate.documentCertificateBackground;
				oParam.template = oMembership.secertificatetextlegacy;
				oParam.certificateData.jasanzAccredited = 'N';
			}

			// Now check if jasanz accredited and apply templates accordingly
			// v3.3.001 SUP023424 Now gets page 2 template as well
			else 
			{
				// If JASANZ Audit (already set in certificateGetData), apply jasanzCertificate templates
				if (oParam.certificateData.jasanzAccredited === 'Y')
				{
					oParam.template = oMembership.secertificatetextjasanz;
				}
				else
				{
					oParam.template = oMembership.secertificatetextfc;
				}
				oParam.templatePage2 = oMembership.secertificatetextpage2;
			}
		}
	},

	legacyCertificatePrint: function(oParam) 
	{
		// we have all the data, now we just need to merge it with the nominated data template and create the pdf with the appropriate background

		var iBackground;
		var iTemplate;
		var dToday = new Date();
		var sFileName = 'Certificate' + ((oParam.membershipCode) ? '_' + oParam.membershipCode: '') + '_' + dToday.toString('yyyy-MMM-dd');
		var oData;
		var sErrorMessage = '';

		if (oParam) 
		{
			if (oParam.template) {iTemplate = oParam.template}
			if (oParam.background) {iBackground = oParam.background}
			if (oParam.certificateData) 
			{	
				oData = oParam.certificateData;
				if (oData.versionNumber) {sFileName = 'Certificate_' + oData.versionNumber}
			}
		}

		if (oParam.html === undefined && oData != undefined) {

			var oSearch = new AdvancedSearch();
			oSearch.method = 'DOCUMENT_SEARCH';
			oSearch.addField('content');
			oSearch.addFilter('id', 'IN_LIST', iTemplate); 	//  + ',' + iBackground
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					if (oResponse.data.rows.length > 0)
					{
						var sHTML = oResponse.data.rows[0].content.formatXHTML();

						// Do the replace
						if (oData.growerBusinessName) 
						{ 
							// If TradeName & LegalName are different, we need to put "Trading as" on second line
							// 1.0.25 Second toLowerCase didn't have trailing parentheses
							if (oData.growerBusinessName.toLowerCase() != oData.growerTradeName.toLowerCase()) 
							{
								sHTML = sHTML.replace('{{GROWER_BUSINESS_NAME}}', 
														oData.growerBusinessName.formatXHTML() + '<br />' +
														'<span class="certbody">trading as</span><br />' +
														oData.growerTradeName.formatXHTML());
							}
							else 
							{
								sHTML = sHTML.replace('{{GROWER_BUSINESS_NAME}}', oData.growerBusinessName.formatXHTML());
							}
						}

						if (oData.sites) 
						{
							
							// If only 1 site, we put this on two lines, otherwise one line for each site.
							if (oData.sites.length === 1) 
							{
								
								sHTML = sHTML.replace('{{GROWER_SITE_ADDRESSES}}', oData.sites[0].streetCombined.formatXHTML() + '<br />' + oData.sites[0].streetLocation.formatXHTML());
							} 
							else 
							{


								var aSites = [];
								$.each(oData.sites, function() 
								{
									aSites.push(this.streetCombined.formatXHTML() + ' ' + this.streetLocation.formatXHTML());
								});
								sHTML = sHTML.replace('{{GROWER_SITE_ADDRESSES}}', aSites.join('<br />'));
							}
						}

						if (oData.codeOfPractice) {sHTML = sHTML.replace('{{MEMBERSHIP_CODE_OF_PRACTICE_DESCRIPTION}}', oData.codeOfPractice.formatXHTML())}

						if (oData.category) {sHTML = sHTML.replace('{{GROWER_PERSON_GROUPS}}', oData.category.formatXHTML())}

						if (oData.certificateScope) {sHTML = sHTML.replace('{{GROWER_PRODUCT_CATEGORIES}}', oData.certificateScope.formatXHTML())}

						if (oData.certificateNumber) {sHTML = sHTML.replace('{{GROWER_CERTIFICATE_NUMBER}}', oData.certificateNumber.formatXHTML())}

						if (oData.auditDate) {sHTML = sHTML.replace('{{CERTIFICATION_AUDIT_DATE}}', oData.auditDate.formatXHTML())}

						if (oData.reCertificationDate) {sHTML = sHTML.replace('{{RE-CERTIFICATION_AUDIT_DATE}}', oData.reCertificationDate.formatXHTML())}
						
						if (oData.certificationBodyLegalName) {sHTML = sHTML.replace('{{CERTIFICATION_BODY}}', oData.certificationBodyLegalName.formatXHTML())}

						if (oData.certificateExpiry) {sHTML = sHTML.replace('{{CERTIFICATE_EXPIRY_DATE}}', oData.certificateExpiry.formatXHTML())} 

						oParam = ns1blankspace.util.setParam(oParam, 'html', sHTML);
						//oParam.html = sHTML;

						nsFreshcare.admin.certificate.legacyCertificatePrint(oParam);
					}
					else
					{
						sErrorMessage = 'Processing stopped. Cannot find Certificate merge template.';
						if (oParam.sendCertificatesStep)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
						}
						else
						{
							ns1blankspace.status.error(sErrorMessage);
						}
					}
				}
				else
				{
					sErrorMessage = 'Processing stopped. Error finding Certificate merge template.';
					if (oParam.sendCertificatesStep)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errornotes});
					}
					else
					{
						ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errornotes);
					}
				}
			});
		}
		else if (oData === undefined)
		{
			sErrorMessage = 'Certificate data not passed to PDF creation function. Cannot create PDF.';
			if (oParam.sendCertificatesStep)
			{
				nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
			}
			else
			{
				ns1blankspace.status.error(sErrorMessage);
			}
		}
		else 
		{
			// We've merged data, now time to create PDF  / return HTML and either open it or callback the promise.

			// We're previewing - just callback the promise as html is already in oParam
			if (oParam.preview != undefined && oParam.preview)
			{
				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}

			// we're creating the PDF
			else 	
			{
				// v2.0.4b SUP021508 Need to force to use ondemand until I can properly test rpc
				//sFileName = sFileName + '.pdf';
				var sData = 'object=' + nsFreshcare.objectAction +
							'&objectcontext=' + oParam.actionID +
							'&filename=' + ns1blankspace.util.fs(sFileName) +
							'&xhtmlcontent=' + ns1blankspace.util.fs(oParam.html) +
							'&document=' + iBackground +
							'&attachmenttype=' + nsFreshcare.data.attachmentTypeCertificate;

				var sMargins = '&topmargin=0&bottommargin=0&leftmargin=0.1&rightmargin=0';

				/*var sBaseURL = window.location.href.split('://').pop();		
				sBaseURL = window.location.href.split('://').shift() + '://' + sBaseURL.split('/').shift();
				var sData = 'object=' + nsFreshcare.objectAction +
							'&objectcontext=' + oParam.actionID +
							'&filename=' + ns1blankspace.util.fs(sFileName) +
							'&xhtmlbody=' + ns1blankspace.util.fs(oParam.html) +
							'&title=' + ns1blankspace.util.fs('Certificate ' + oData.versionNumber) +
							'&attachmenttype=' + nsFreshcare.data.attachmentTypeCertificate +
							'&xhtmlbody_baseurl=' + ns1blankspace.util.fs(sBaseURL);*/

				if (nsFreshcare.supportAdmin) {sData += '&DebugFileName=' + sFileName.replace(".pdf", '.html')} // v4.0.006 rpc version

				delete(oParam.template);
				delete(oParam.background);
				delete(oParam.html);
				
				$.ajax(
				{
					type: 'POST',
					url: '/ondemand/core/?method=CORE_PDF_CREATE&rf=JSON',
					data: sData + sMargins,
					rf: 'JSON',
					success: function(oResponse) 
					{

						if (oResponse.status === 'OK') 
						{
							oParam.attachmentLink = oResponse.AttachmentLink.toString();
							//oParam.attachmentLink = oResponse.attachmentlink.toString();
							if (oParam.onComplete != undefined)
							{
								ns1blankspace.util.onComplete(oParam);
							}
							else
							{
								window.open('/download/' + oResponse.AttachmentLink);
								//window.open('/download/' + oResponse.attachmentlink);
							}
						}
						else
						{
							sErrorMessage = 'Error creating PDF';
							if (oParam.sendCertificatesStep)
							{
								oParam.sendCertificatesStep = 10;
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errornotes});
								if (oParam.onComplete)
								{
									ns1blankspace.util.onComplete(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errornotes);
							}
						}
					}
				});
			}
		}
	},

	currentCertificatePrint: function(oParam)
	{
		// Data is passed via oParam.certificateData.
		// now we just need to merge it with the nominated data template and either:
		// 		a) create the pdf with the appropriate background OR
		//		b) return the html generated from the merge (to use in the preview) if oParam.preview is true
		// This function is only called when the Membership is JAS-ANZ accredited

		oParam = oParam || {};
		var iBackground;
		var iTemplate;
		var dToday = new Date();
		var sFileName = '';
		var oData;
		var sErrorMessage = '';
		var iTotalPages = 1;
		var iTemplatePage2;
		var bSitesOnPg2 = false;
		var iSitePages = 0;
		var bCropsOnPg2 = false;
		var iCropPages = 0;
		var bMixedPages = false;
		var sHTMLPage2 = '';
		var iThisPage = 1;

		if (oParam.template) {iTemplate = oParam.template}
		if (oParam.background) {iBackground = oParam.background}
		if (oParam.certificateData) {oData = oParam.certificateData}
		if (oParam.templatePage2) {iTemplatePage2 = oParam.templatePage2}

		sFileName = 'Certificate' + ((oParam.membershipCode) ? '_' + oParam.membershipCode: '') +  
									((oParam.certificateData.versionNumber) ? '_' + oParam.certificateData.versionNumber : '');
		if (oParam.certificateData) 
		{	
			oData = oParam.certificateData;
			if (oData.versionNumber) {sFileName = 'Certificate_' + oData.versionNumber}
		}

		if (oParam.html === undefined && oData != undefined) 
		{
			// SUP022082 v2.0.4o Now uses rpc CORE_PDF_CREATE so that new template can be used
			var oSearch = new AdvancedSearch();
			oSearch.method = 'DOCUMENT_SEARCH';
			oSearch.addField('content');
			oSearch.addFilter('id', 'IN_LIST', iTemplate + ',' + iBackground + (iTemplatePage2 ? ',' + iTemplatePage2 : ''));
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0) 
				{
					// v3.3.001 SUP023424 Now allows for a 2-page certificate. Factors that will influence whether a 2nd page is 
					// generated are sites and crops lists. More than 10 sites or crops length > 500 or > 5 sites and crops length > 300
					// For each 20 Sites, an extra page is required
					// For each 1200 crops characters, an extra page is required
					var sBackground = $.map($.grep(oResponse.data.rows, function(x) {return x.id == iBackground}), function(y) {return y.content.formatXHTML()}).shift();
					var sHTML = $.map($.grep(oResponse.data.rows, function(x) {return x.id == iTemplate}), function(y) {return y.content.formatXHTML()}).shift();

					// v4.0.007 SUP024070 Changed from 10 sites to 9
					bSitesOnPg2 = (oData.sites.length > 9 || (oData.sites.length > 5 && oData.crops.length > 300));
					bCropsOnPg2 = (oData.crops.length > 500 || (oData.sites.length > 5 && oData.crops.length > 300));

					// Work out how many pages altogether
					// If sum of remainder for both is greater than 1, then need to add an extra page to each.
					iSitePages = parseInt(oData.sites.length / 20);
					iCropPages = parseInt(oData.crops.length / 1200);
					if (bSitesOnPg2 && bCropsOnPg2)
					{
						bMixedPages = true;
						if ((parseFloat(oData.sites.length / 20) - iSitePages) + (parseFloat(oData.crops.length / 1200) - iCropPages) > 1)
						{
							iSitePages += 1;
							iCropPages += 1;
						}
						else
						{
							iSitePages += 1;
							bMixedPages = true;
						}
					}
					else
					{
						if (bSitesOnPg2) {iSitePages += 1;}
						if (bCropsOnPg2) {iCropPages += 1;}
					}
					iTotalPages = 1 + iSitePages + iCropPages;

					

					if (iTotalPages > 1 && iTemplatePage2)
					{
						// Get the class used for the background in page 1. This way, we don't have to set up lots of different page 2 docs
						// Set up second page HTML for us to replace header info
						sHTML = sHTML.replace('</body>', '');
						sHTML = sHTML.replace('</html>', '');
						var sPageClass = sHTML.split('<table class="').pop();
						sPageClass = sPageClass.split('"').shift();
						sHTMLPage2 = $.map($.grep(oResponse.data.rows, function(x) {return x.id == iTemplatePage2}), function(y) {return y.content.formatXHTML()}).shift();
						sHTMLPage2 = sHTMLPage2.replace('CertificatePageTwo', sPageClass);
					}

					// Do the replace
					if (oData.growerBusinessName) 
					{ 
						// If TradeName & LegalName are different, we need to put "Trading as" on second line
						// 1.0.25 Second toLowerCase didn't have trailing parentheses
						// v3.1.2 SUP022693 Trading Name to be in larger font while Legal name to be in smaller font
						// v3.3.001 SUP023424 Larger font not required for _ONE_LINE version
						if (oData.growerBusinessName.toLowerCase() != oData.growerTradeName.toLowerCase()) 
						{
							sHTML = sHTML.replace(/{{GROWER_BUSINESS_NAME}}/g, 
													'<span class="certBodyMedium"><strong/>' + oData.growerBusinessName.formatXHTML() + '</strong></span><br />' +
													'<span class="certBodyMedium">Trading as</span><br />' +
													'<span class="CertHeaderNew"><strong/>' + oData.growerTradeName.formatXHTML() + '</strong></span>');
							sHTMLPage2 = sHTMLPage2.replace(/{{GROWER_BUSINESS_NAME_ONE_LINE}}/g, 
													'<span class="certBody"><strong/>' + oData.growerBusinessName.formatXHTML() + '</strong></span>&nbsp;' +
													'<span class="CertBody">Trading as</span>&nbsp;' +
													'<span class="CertBody"><strong/>' + oData.growerTradeName.formatXHTML() + '</strong></span>');
						}
						else 
						{
							sHTML = sHTML.replace(/{{GROWER_BUSINESS_NAME}}/g, '<span class="CertHeaderNew"><strong/>' + oData.growerBusinessName.formatXHTML() + '</strong></span>');
							sHTMLPage2 = sHTMLPage2.replace(/{{GROWER_BUSINESS_NAME_ONE_LINE}}/g, '<span class="certBodyMedium"><strong/>' + oData.growerBusinessName.formatXHTML() + '</strong></span>');
						}
					}

					if (oData.codeOfPractice) 
					{
						sHTML = sHTML.replace(/{{MEMBERSHIP_CODE_OF_PRACTICE_DESCRIPTION}}/g, oData.codeOfPractice.formatXHTML());
						sHTMLPage2 = sHTMLPage2.replace(/{{MEMBERSHIP_CODE_OF_PRACTICE_DESCRIPTION}}/g, oData.codeOfPractice.formatXHTML());
					}

					if (oData.certificateNumber) 
					{
						sHTML = sHTML.replace(/{{GROWER_CERTIFICATE_NUMBER}}/g, oData.certificateNumber.formatXHTML());
						sHTMLPage2 = sHTMLPage2.replace(/{{GROWER_CERTIFICATE_NUMBER}}/g, oData.certificateNumber.formatXHTML());
					}

					if (oData.certificateScope) {sHTML = sHTML.replace(/{{GROWER_PERSON_GROUPS}}/g, oData.certificateScope.formatXHTML())}
					if (oData.certificateScope) {sHTML = sHTML.replace(/{{GROWER_SCOPE}}/g, oData.certificateScope.formatXHTML())}

					if (oData.category) {sHTML = sHTML.replace(/{{GROWER_PRODUCT_CATEGORIES}}/g, oData.category.formatXHTML())}
					if (oData.category) {sHTML = sHTML.replace(/{{GROWER_CATEGORY}}/g, oData.category.formatXHTML())}

					if (oData.sites) 
					{
						
						var aSites = [];
						$.each(oData.sites, function() {
							aSites.push(this.streetCombined.formatXHTML() + ' ' + this.streetLocation.formatXHTML());
						});
						// v3.3.001 SUP023424 Put sites on 2nd page if more than 10
						if (bSitesOnPg2)
						{
							sHTML = sHTML.replace(/{{GROWER_SITE_ADDRESSES}}/g, 'Please see following page' + (iTotalPages > 2 ? 's': '') + ' for list of sites.');
						}
						else
						{
							sHTML = sHTML.replace(/{{GROWER_SITE_ADDRESSES}}/g, aSites.join('<br />'));
							aSites = [];	// Remove sites from the list so they don't end up on page 2
						}
					}

					// v3.4.010 SUP023981 Add scope extension previous audit reference if fullCertificateData = 'Y'
					if (oData.fullCertificateData == 'Y')
					{
						oData.auditTypeText += ' - ' + oData.scopeExtension.certificationAuditReference;
					}
					if (oData.auditTypeText) {sHTML = sHTML.replace(/{{AUDIT_TYPE}}/g, oData.auditTypeText.formatXHTML())}

					// v3.3.001 SUP023424 Put crops on 2nd page if more than 500 chars long
					if (oData.crops) 
					{
						if (bCropsOnPg2)
						{
							sHTML = sHTML.replace(/{{CROPS}}/g, 'Please see following page' + (iTotalPages > 2 ? 's': '') + ' for list of crops.')
						}
						else
						{
							sHTML = sHTML.replace(/{{CROPS}}/g, oData.crops);
							oData.crops = '';		// blank out crops so they don't end up on page 2
						}
					}

					if (oData.auditDate) {sHTML = sHTML.replace(/{{CERTIFICATION_AUDIT_DATE}}/g, oData.auditDate.formatXHTML())}

					if (oData.certificationAchieved) {sHTML = sHTML.replace(/{{CERTIFICATION_ACHIEVED_DATE}}/g, oData.certificationAchieved.formatXHTML())}

					if (oData.reCertificationDue) {sHTML = sHTML.replace(/{{RE-CERTIFICATION_AUDIT_DUE}}/g, oData.reCertificationDue.formatXHTML())}

					if (oData.reCertificationDate) {sHTML = sHTML.replace(/{{RE-CERTIFICATION_AUDIT_DATE}}/g, oData.reCertificationDate.formatXHTML())}

					if (oData.certificateExpiry) {sHTML = sHTML.replace(/{{CERTIFICATE_EXPIRY_DATE}}/g, oData.certificateExpiry.formatXHTML())} 

					if (oData.auditReference) 
					{
						sHTML = sHTML.replace(/{{CERTIFICATE_AUDIT_REFERENCE}}/g, oData.auditReference.formatXHTML());
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATE_AUDIT_REFERENCE}}/g, oData.auditReference.formatXHTML());
					} 

					if (oData.versionNumber) {sHTML = sHTML.replace(/{{CERTIFICATE_VERSION_NUMBER}}/g, oData.versionNumber.formatXHTML())} 

					if (oData.certificationBodyLegalName) 
					{
						sHTML = sHTML.replace(/{{CERTIFICATION_BODY}}/g, oData.certificationBodyLegalName.formatXHTML());
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATION_BODY}}/g, oData.certificationBodyLegalName.formatXHTML());
					}

					if (oData.certificationBodyAddress) 
					{
						sHTML = sHTML.replace(/{{CERTIFICATION_BODY_ADDRESS}}/g, oData.certificationBodyAddress.formatXHTML());
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATION_BODY_ADDRESS}}/g, oData.certificationBodyAddress.formatXHTML());
					}

					if (oData.certificationBodyNumber && oData.certificationBodyNumber != '') 
					{	
						sHTML = sHTML.replace(/{{CERTIFICATION_BODY_NUMBER}}/g, '<br />Certification Body Number: ' + oData.certificationBodyNumber.formatXHTML())
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATION_BODY_NUMBER}}/g, '<br />Certification Body Number: ' + oData.certificationBodyNumber.formatXHTML())
					}
					else
					{
						sHTML = sHTML.replace(/{{CERTIFICATION_BODY_NUMBER}}/g, '');
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATION_BODY_NUMBER}}/g, '');
					}

					if (oData.signatureImage) 
					{
						sHTML = sHTML.replace(/{{CERTIFICATION_BODY_SIGNATURE_IMAGE}}/g, '<img src="' + oData.signatureImage + '">');
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATION_BODY_SIGNATURE_IMAGE}}/g, '<img src="' + oData.signatureImage + '">');
					}	//

					if (oData.logoImage) 
					{
						sHTML = sHTML.replace(/{{CERTIFICATION_BODY_LOGO_IMAGE}}/g, '<img src="' + oData.logoImage + '">' );			
						sHTMLPage2 = sHTMLPage2.replace(/{{CERTIFICATION_BODY_LOGO_IMAGE}}/g, '<img src="' + oData.logoImage + '">' );			
					}

					// V3.3.001 Now shows page number x of y
					sHTML = sHTML.replace(/{{PAGE_NO}}/g, '1');
					sHTML = sHTML.replace(/{{TOTAL_PAGES}}/g, iTotalPages);
					sHTMLPage2 = sHTMLPage2.replace(/{{TOTAL_PAGES}}/g, iTotalPages);

					// Now we render 2nd and subsequent pages if required
					if (bSitesOnPg2 || bCropsOnPg2)
					{
						iThisPage += 1;

						while (iThisPage <= iTotalPages)
						{
							// Set up page and replace page number
							var sHTMLPage = sHTMLPage2;
							var aPageSites = [];
							var aPageCrops = [];
							sHTMLPage = sHTMLPage.replace(/{{PAGE_NO}}/g, iThisPage);

							// Render sites
							if (aSites.length > 0)
							{
								aPageSites = aSites.splice(0,20);
								sHTMLPage = sHTMLPage.replace(/{{GROWER_SITE_ADDRESSES_PAGE_2}}/g, aPageSites.join('<br />') +
																(aSites.length > 0 ? '<br />Continued on next page..' : ''));
								sHTMLPage = sHTMLPage.replace(/{{GROWER_SITE_LABEL_PAGE_2}}/g, 'Sites:');
							}
							else
							{
								sHTMLPage = sHTMLPage.replace(/{{GROWER_SITE_ADDRESSES_PAGE_2}}/g, '');
								sHTMLPage = sHTMLPage.replace(/{{GROWER_SITE_LABEL_PAGE_2}}/g, '');
							}

							// Now render Crops
							if (aSites.length == 0 && ((aPageSites.length > 0 && bMixedPages) || (aPageSites.length == 0 && !bMixedPages))
								&& oData.crops.length > 0)
							{
								// if mixedpage and more than 1 page of crops - how many to go on first page?
								var aCrops = oData.crops.split(', ');
								var iCropChars = 1200;
								if (bMixedPages)
								{
									iCropChars = (20 - aPageSites.length) * 60; 			// approx 60 chars per line
									bMixedPages = false;
								}
								aPageCrops = oData.crops.substr(0, iCropChars).split(', ');
								var iPageLen = aPageCrops.length;
								if (aCrops[iPageLen - 1] != aPageCrops[iPageLen - 1])
								{
									iPageLen -= 1;
									aPageCrops.length = iPageLen;
								}
								oData.crops = aCrops.splice(iPageLen).join(', ');
								sHTMLPage = sHTMLPage.replace(/{{CROPS_PAGE_2}}/g, aPageCrops.join(', ') +
																(oData.crops.length > 0 ? ',  Continued on next page..' : ''));
								sHTMLPage = sHTMLPage.replace(/{{CROPS_LABEL_PAGE_2}}/g, 'Crops:')
							}
							else
							{
								sHTMLPage = sHTMLPage.replace(/{{CROPS_LABEL_PAGE_2}}/g, '')
								sHTMLPage = sHTMLPage.replace(/{{CROPS_PAGE_2}}/g, '')
							}

							sHTML += sHTMLPage;
							iThisPage += 1;
						}
					}

					oParam.html = sBackground + sHTML + '</body></html>';
					nsFreshcare.admin.certificate.currentCertificatePrint(oParam);
				}
				else
				{
					sErrorMessage = 'Processing stopped. Error finding Certificate merge template.';
					var sErrorNotes = (oResponse.status != 'OK') ? oResponse.error.errorNotes : undefined;
					if (oParam.sendCertificatesStep)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: sErrorNotes});
					}
					else
					{
						ns1blankspace.status.error(sErrorMessage + ': ' + sErrorNotes);
					}
				}
			});
		}
		else if (oData === undefined)
		{
			sErrorMessage = 'Certificate data not passed to PDF creation function. Cannot create PDF.';
			if (oParam.sendCertificatesStep)
			{
				nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage});
			}
			else
			{
				ns1blankspace.status.error(sErrorMessage);
			}
		}
		else 
		{
			// We've merged data, now time to create PDF  / return HTML and either open it or callback the promise.

			// We're previewing - just callback the promise as html is already in oParam
			if (oParam.preview != undefined && oParam.preview)
			{
				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}

			// we're creating the PDF
			else 	
			{
				// SUP022082 Changed to rpc CORE_PDF_CREATE
				var sBaseURL = window.location.href.split('://').pop();		
				sBaseURL = window.location.href.split('://').shift() + '://' + sBaseURL.split('/').shift();
				var sData = 'object=' + nsFreshcare.objectAction +
							'&objectcontext=' + oParam.actionID +
							'&filename=' + ns1blankspace.util.fs(sFileName) +
							'&xhtmlbody=' + ns1blankspace.util.fs(oParam.html) +
							'&title=' + ns1blankspace.util.fs('Certificate ' + oData.versionNumber) +
							'&attachmenttype=' + nsFreshcare.data.attachmentTypeCertificate +
							'&xhtmlbody_baseurl=' + ns1blankspace.util.fs(sBaseURL);

				if (nsFreshcare.supportAdmin) {sData += '&DebugFileName=' + sFileName.replace(".pdf", '.html')} // v4.0.006 rpc version

				delete(oParam.template);
				delete(oParam.background);
				delete(oParam.html);		// v2.0.4p Need to remove or creates the same certiticate the next time round

				$.ajax({
					type: 'POST',
					url: '/rpc/core/?method=CORE_PDF_CREATE&rf=JSON',
					data: sData,
					rf: 'JSON',
					success: function(oResponse) 
					{

						if (oResponse.status === 'OK') 
						{
							// v3.1.0a oResponse now has lower case attachmentlink in rpc
							delete(oParam.html);
							oParam.attachmentLink = oResponse.attachmentlink.toString();
							if (oParam.onComplete)
							{
								ns1blankspace.util.onComplete(oParam);
							}
							else
							{
								window.open('/download/' + oResponse.attachmentlink);
							}
						}
						else 
						{

							sErrorMessage = 'Error creating PDF';
							if (oParam.sendCertificatesStep)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errornotes});
								oParam.sendCertificatesStep = 10;
								if (oParam.onComplete)
								{
									ns1blankspace.util.onComplete(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error(sErrorMessage + ': ' + oResponse.error.errornotes);
							}
						}
					}
				});
			}

		}
	},

	emailCertificateToGrower: function(oParam)
	{
		// v2.0.4 SUP021422 Now updates duedate on corresponding certificate action when email is sent
		// v3.0.0a SUP021731: Certificate Email Template - Subject Title to contain whaterver's passed from calling program or default
		// v3.1.2 SUP022889 Added M/Ship COde to email Subject
		var sGrowerEmail;
		var sContactBusiness;
		var sGrowerFirstName;
		var sGrowerSurname;
		var sAuditorName;
		var sAttachmentLink;
		var sErrorMessage = '';
		var oThisElement;
		var iEmailCertificateStep = 1;
		var sSubject = ns1blankspace.util.getParam(oParam, 'emailSubject', 
							{'default': nsFreshcare.user.spaceText + (oParam.membershipCode ? ' ' + oParam.membershipCode : '') + ' Certificate - ' + oParam.certificateData.growerBusinessName}).value;

		if (oParam)
		{
			if (oParam.growerEmail) {sGrowerEmail = oParam.growerEmail}
			if (oParam.contactPerson) {sContactPerson = oParam.contactPerson}
			if (oParam.contactBusiness) {sContactBusiness = oParam.contactBusiness}
			if (oParam.growerFirstName) {sGrowerFirstName = oParam.growerFirstName}
			if (oParam.growerSurname) {sGrowerSurname = oParam.growerSurname}
			if (oParam.auditorName) {sAuditorName = oParam.auditorName}
			if (oParam.thisElement) {oThisElement = oParam.thisElement}
			if (oParam.attachmentLink) {sAttachmentLink = oParam.attachmentLink}
			if (oParam.emailCertificateStep) {iEmailCertificateStep = oParam.emailCertificateStep}
		}
		else {oParam = {}}

		// v3.4.019 Now uses isLab flag
		sGrowerEmail = (!ns1blankspace.isLab) ? sGrowerEmail : 'cassandra.buono@alt-designit.com.au';
		sAuditorName = (sAuditorName.split(', ').length > 1) ? sAuditorName.split(', ').pop() + ' ' + sAuditorName.split(', ').shift() : sAuditorName;

		if (sAttachmentLink)
		{

			if (iEmailCertificateStep === 1)
			{
				if (oParam.sendCertificatesStep)
				{	nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Sending email to ' + nsFreshcare.data.growerText + '.'});}

				// Use document and applsystemtemplate=N to change background template
				// We save the email against the contactbusiness but get the attachment from the action
				// v2.0.4 SUP021408 Changed documentEmailTemplate to documentEmailCertificateTemplate
				// v2.0.4e Added fromemail so that is always sent from Cert Body email address
				// 3.0.0 SUP021713 Now shows spaceText (with 'Ltd' replaced) so that forked apps can use it as well
				// v3.1.215 SUP023190 Now sends to contactPerson instead of email so that it gets correct user alias
				// v3.2.005 SUP023190 Needed to add ReplyTo email to make this work
				// v3.2.022 SUP023622 emailFromAuditor now set when switching in
				var sData = 'to=' + ns1blankspace.util.fs(sGrowerEmail) +
							'&subject=' + ns1blankspace.util.fs(sSubject) + 
							'&save=Y' +
							'&replyto=' + ns1blankspace.util.fs(ns1blankspace.user.contactPerson) +
							'&fromemail=' + ns1blankspace.util.fs((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin ? nsFreshcare.data.emailFromAuditor : ns1blankspace.user.contactPerson)) +
							'&applysystemtemplate=N' +
							'&copyattachmentsfromobject=' + ns1blankspace.util.fs(nsFreshcare.objectAction) +
							'&copyattachmentsfromobjectcontext=' + ns1blankspace.util.fs(oParam.actionID) +
							'&copyattachmentsfromobjectattachmentlink=' + ns1blankspace.util.fs(sAttachmentLink.split('/').pop()) +
							'&saveagainstcontactbusiness=' + ns1blankspace.util.fs(sContactBusiness) +
							'&saveagainstcontactperson=' + ns1blankspace.util.fs(sContactPerson) +
							'&saveagainstobject=' + ns1blankspace.util.fs(nsFreshcare.objectBusiness) +
							'&saveagainstobjectcontext=' + ns1blankspace.util.fs(sContactBusiness) +
							'&document=' + ns1blankspace.util.fs(nsFreshcare.data.documentEmailCertificateTemplate);
				//((nsFreshcare.data.switched && nsFreshcare.data.switched.id) 
				//				? nsFreshcare.data.switched.contactPerson
				//				: ((nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor) 
				//					? nsFreshcare.data.emailFromAuditor 
				//					: ns1blankspace.user.contactPerson));

				// Add template fields to postdata
				// Available fields are: 
				// growerfirstname
				// growersurname
				// growertradingname
				// certificatenumber
				// membershipcodeofpractice
				// auditdate
				// certificateexpiry
				// emailsignature
				// v4.0.001 Added MEMBER template fields so that either can be used
				sData += '&TEMPLATE_GROWERFIRSTNAME=' + ns1blankspace.util.fs(sGrowerFirstName) +
						 '&TEMPLATE_MEMBERFIRSTNAME=' + ns1blankspace.util.fs(sGrowerFirstName) +
						 '&TEMPLATE_GROWERSURNAME=' + ns1blankspace.util.fs(sGrowerSurname) +
						 '&TEMPLATE_MEMBERSURNAME=' + ns1blankspace.util.fs(sGrowerSurname) +
						 '&TEMPLATE_GROWERTRADINGNAME=' + ns1blankspace.util.fs(oParam.certificateData.growerBusinessName) +
						 '&TEMPLATE_MEMBERTRADINGNAME=' + ns1blankspace.util.fs(oParam.certificateData.growerBusinessName) +
						 '&TEMPLATE_CERTIFICATENUMBER=' + ns1blankspace.util.fs(oParam.certificateData.certificateNumber) +
						 '&TEMPLATE_MEMBERSHIP=' + ns1blankspace.util.fs(oParam.certificateData.codeOfPractice) +
						 '&TEMPLATE_AUDITDATE=' + ns1blankspace.util.fs(oParam.certificateData.auditDate) +
						 '&TEMPLATE_CERTIFICATEEXPIRY=' + ns1blankspace.util.fs(oParam.certificateData.certificateExpiry) +
						 '&TEMPLATE_AUDITORNAME=' + ns1blankspace.util.fs(sAuditorName)
						 // v3.2.004 SUP023223 No longer uses emailSignature
						 //'&TEMPLATE_EMAILSIGNATURE=' + ns1blankspace.util.fs(nsFreshcare.user.emailSignature);

				//	url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
				$.ajax(
				{
					type: 'POST',
					url: '/rpc/messaging/?method=MESSAGING_EMAIL_SEND',
					data: sData,
					dataType: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oParam.sendCertificatesStep)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, statusMessage: 'Email sent to ' + nsFreshcare.data.growerText}); 
							}
							else
							{
								ns1blankspace.status.message('Email sent to ' + nsFreshcare.data.growerText);
							}
							oParam.emailCertificateStep = 2;
							nsFreshcare.admin.certificate.emailCertificateToGrower(oParam);
						}
						else
						{
							sErrorMessage = 'Unable to send email to ' + sGrowerEmail + ((oParam.sendCertificatesStep === undefined) ? ': ' + oResponse.error.errornotes : '');
							if (oParam.sendCertificatesStep)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errornotes});
								oParam.sendCertificatesStep = 10;
							}
							else
							{
								ns1blankspace.status.error(sErrorMessage);
								oParam.printIndividualCertStep = 10;
							}
						}
					}
				});
			}

			// Update action record to indicate that it's been sent - set duedate to current date
			else if (iEmailCertificateStep === 2)
			{
				sData = 'id=' + oParam.actionID + '&duedate=' + ns1blankspace.util.fs((new Date()).toString('dd MMM yyyy HH:mm:ss'));
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
					data: sData,
					rf: 'json',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.sendCertificatesStep = 9;		// Update the Sent flag and the UI
						}
						else
						{
							sErrorMessage = 'Unable to set Certificate sent date on action ' + oParam.certificateData.versionNumber + ((oParam.sendCertificatesStep === undefined) ? ': ' + oResponse.error.errornotes : '');
							if (oParam.sendCertificatesStep)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oParam.thisElement, errorMessage: sErrorMessage, errorNotes: oResponse.error.errornotes});
								oParam.sendCertificatesStep = 10;
							}
							else
							{
								ns1blankspace.status.error(sErrorMessage);
								oParam.printIndividualCertStep = 10;
							}
						}

						// v2.0.4c SUP021509 Was returning to here with emailCertificateStep still set to 2 so email not going out.
						delete (oParam.emailCertificateStep);

						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
				});
			}
		}
		else
		{
			sErrorMessage = 'Email not sent. No PDF attachment created.';
			if (oParam.sendCertificatesStep)
			{	
				nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
											errorMessage: sErrorMessage});
				oParam.sendCertificatesStep = 10;
			}
			else
			{
				ns1blankspace.status.error(sErrorMessage);
				oParam.printIndividualCertStep = 10;
			}

			delete(oParam.emailCertificateStep);
			if (oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	rowStatus: function(oParam)
	{
		var sProcessRowId;
		var sStatusRowId;
		var sStatusCellId;
		var iColumns = 0;
		var oCheckedElement;
		var sStatusMessage;
		var sErrorMessage;
		var aHTML = [];
		var bRemove = false;
		var sMessageClass;
		var sResponseError;

		if (oParam)
		{
			if (oParam.xhtmlElement) {oCheckedElement = oParam.xhtmlElement}
			if (oParam.statusMessage) {sStatusMessage = oParam.statusMessage}
			if (oParam.errorMessage) {sErrorMessage = oParam.errorMessage}
			if (oParam.errorNotes) {sResponseError = oParam.errorNotes}
			if (oParam.remove != undefined) {bRemove = oParam.remove}
		}

		if (oCheckedElement)
		{
			sProcessRowId = oCheckedElement.id.split('-').shift() + '_row-' + oCheckedElement.id.split('-').pop();
			sStatusRowId = oCheckedElement.id.split('-').shift() + '_statusRow-' + oCheckedElement.id.split('-').pop();
			sStatusCellId = oCheckedElement.id.split('-').shift() + '_statusCell-' + oCheckedElement.id.split('-').pop();
			iColumns = $('#' + sProcessRowId).children().length;

			if (!$('#' + sStatusRowId).is('*'))		// Status row doesn't exist yet
			{
				// Insert the Status row, remove the border from under the original row
				aHTML.push('<tr id="' + sStatusRowId + '"><td id="' + sStatusCellId + '" class="ns1blankspaceRow ns1blankspaceRowCertificateStatus" colspan="' + iColumns + '"></td></tr>');
				$('#' + sProcessRowId).after(aHTML.join(''));

				$.each($('#' + sProcessRowId).children(), function()
				{
					$(this).removeClass('ns1blankspaceRow');
					$(this).addClass('nsFreshcareRowNoBorder');
				});
			}
			
			if (bRemove)
			{
				$('#' + sStatusRowId).remove();
				$.each($('#' + sProcessRowId).children(), function()
				{
					$(this).removeClass('nsFreshcareRowNoBorder');
					$(this).addClass('ns1blankspaceRow');
				});

			}
			else 	// We're updating the Status
			{
				if (sStatusMessage)
				{
					$('#' + sStatusCellId).css('color', '#EE8F00');
				}
				else
				{
					$('#' + sStatusCellId).css('color', 'red');
					if (sResponseError != undefined)
					{
						$('#' + sStatusCellId).attr('data-responseError', sResponseError);
						$('#' + sStatusCellId).hover(
							function(event)
							{
								var sElementId = this.id;
								
								$('#ns1blankspaceToolTip').html('Error: ' + $(this).attr('data-responseerror'));	
								$('#ns1blankspaceToolTip').css('font-size', '0.75em');
								$('#ns1blankspaceToolTip').show();
								
								$('#ns1blankspaceToolTip').offset({ top: $(this).offset().top, 
																		 left: $(this).offset().left + $(this).width() });
							},
							function(event)
							{
								$('#ns1blankspaceToolTip').html('');
								$('#ns1blankspaceToolTip').hide();
							});

						ns1blankspace.status.error(sResponseError);
					}
					// v3.1.0e SUP021974 Katie wants the message at the top as well if ANY errors occur during the processing
					else if (sErrorMessage)
					{
						ns1blankspace.status.error('An error has occurred during processing. Please see below for details.')
					}
				}

				$('#' + sStatusCellId).html((sStatusMessage != undefined) ? sStatusMessage : sErrorMessage);

			}

		}
	},

	printPreview:
	{
		show: 	function() 
			{

				$('.ns1blankspaceRowCertificateStatus').hide();
				var windowCertificates = window.open('', 'CertificatePreview');
				windowCertificates.document.write(nsFreshcare.admin.certificate.printPreview.layout(), 'width=770');

				/*	$('#ns1blankspaceCertificatesPreview').html(nsFreshcare.admin.certificate.printPreview.layout());
					$('#ns1blankspaceCertificatesMain').hide();
					$('#ns1blankspaceCertificatesPreview').show();
				*/
			},

		layout: function() 
			{

				var aHTML = [];
				
				//OPTIONAL GET DOCUMENT
				
				if (nsFreshcare.admin.certificate.data.certificateText)
				{
					aHTML.push(nsFreshcare.admin.certificate.data.certificateBackground + nsFreshcare.admin.certificate.data.certificateText);
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceHomeContainer" class="ns1blankspace">');
						
					aHTML.push('<tr><td id="ns1blankspaceHelp" class="ns1blankspace">' +
										'Nothing to Preview' +
										'</td>' +
									'</tr>');
									
					aHTML.push('</table>');
				}
				
				return aHTML.join('');

			}
	},

	report: 
	{
		extractCertificateData: function(oRow, oParam)
		{
			var sName;
			var oCertificateData;
			var sReturn = '';

			if (oParam)
			{
				if (oParam.name) {sName = oParam.name}
			}

			if (oRow && sName)
			{
				// v3.4.004 SUP023895 Now allows either agricertificate or audit base to calculate data
				if (oRow['agricertificate.audit.action.description'] || oRow['audit.action.description'])
				{
					if (oRow['audit.action.description'])
					{
						oCertificateData = JSON.parse(oRow['audit.action.description']);
					}
					else
					{
						oCertificateData = JSON.parse(oRow['agricertificate.audit.action.description']);
					}
					// v3.1.1j SUP022892 report-3.1.2 has field that didn't yet exist in v3.1.1
					// v3.2.025 Was returning 'undefined' if value was undefined
					if (sName != 'sites' && oCertificateData[sName])
					{
						sReturn = (oCertificateData[sName] && oCertificateData != 'undefined' ? oCertificateData[sName].formatXHTML() : '');
					}
					else if (sName == 'sites')		// 3.1.1k
					{
						
						if (oCertificateData.sites)
						{
							sReturn = $.map(oCertificateData.sites, function(x) {return (x.streetCombined + ' ' + x.streetLocation).formatXHTML()}).join('\n');
						}
					}
				}
			}

			return sReturn;
		}
	}

}