/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.setup.bulkupdate = 
{
	init: 	function (oParam) 
	{ 
			ns1blankspace.app.reset();
			$('#ns1blankspaceViewControlViewContainer').button(
					{
						label: 'Bulk Updates'
					});			
			nsFreshcare.setup.bulkupdate.show(); 
			nsFreshcare.setup.bulkupdate.data = {};
			nsFreshcare.setup.bulkupdate.userContinue = 1;
	},

	show: 	function (oParam) 
	{
			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.setup.bulkupdate.show();',
				move: false
			});

			if (ns1blankspace.setupView)
			{	
				$('#ns1blankspaceViewControlSetup').attr('checked', true);
				$('#ns1blankspaceViewControlSetup').button('refresh');
				ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.setup.bulkupdate.show()'});
			}	

			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

			var aHTML = [];
			
			aHTML.push('<table id="ns1blankspaceUpdateControlContainer">');
			
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlSetCertificateAudit" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Update Certificate Audit</td>' +
							'</tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlSetCertificatePrintOption" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Default Certificate Print Option</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlFixCertificationAchieved" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Fix Certification Achieved Date</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlRemoveCertificateActions" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Remove Certificate Data Actions</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlRemoveDuplicateProductGroups" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Remove Duplicate Product Groups</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlUpdateGrowerDetails" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Update Grower Details</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlSetCertificateSentDate" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Set Certificate Sent Date</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlUpdateParentBusinessRelationship" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Update Parent Business Relationship</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlRestoreAttendingTrainees" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Restore Attending Trainees</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('</table>');					
					
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			nsFreshcare.setup.bulkupdate.bind();

			ns1blankspace.xhtml.defaultElementID = '';
			
			var aHTML = [];
			
			aHTML.push('<div id="ns1blankspaceBulkUpdatesMain" class="ns1blankspaceControlMain">');
			aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
			aHTML.push('<td id="ns1blankspaceUpdateColumn1" class="ns1blankspaceColumn1Flexible"></td>');
			aHTML.push('</tr></table>');	
			aHTML.push('</div>');

			$('#ns1blankspaceMain').html(aHTML.join(''));

			if (ns1blankspace.xhtml.defaultElementID != '')
			{
				$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
				$('#' + ns1blankspace.xhtml.defaultElementID).click();
			}
	},

	bind: 	function ()
	{
		
		$('#ns1blankspaceControlSetCertificateAudit').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.setup.bulkupdate.updateCertificateAudit.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				});
		});

		$('#ns1blankspaceControlSetCertificatePrintOption').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				});
		});

		$('#ns1blankspaceControlFixCertificationAchieved').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.setup.bulkupdate.fixCertificationAchieved.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				});
		});

		$('#ns1blankspaceControlRemoveCertificateActions').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.setup.bulkupdate.removeCertificateActions.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				});
		});

		$('#ns1blankspaceControlRemoveDuplicateProductGroups').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				});
		});

		$('#ns1blankspaceControlUpdateGrowerDetails').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			var oParam = {
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				};
			oParam = nsFreshcare.setup.bulkupdate.updateGrowerDetails.setParams(oParam);
			nsFreshcare.setup.bulkupdate.showUpdate(oParam);
		});

		$('#ns1blankspaceControlSetCertificateSentDate').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			var oParam = {
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				};
			oParam = nsFreshcare.setup.bulkupdate.updateCertificateSentDate.setParams(oParam);
			nsFreshcare.setup.bulkupdate.showUpdate(oParam);
		});

		$('#ns1blankspaceControlUpdateParentBusinessRelationship').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			var oParam = {
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				};
			oParam = nsFreshcare.setup.bulkupdate.updateParentBusinessRelationships.setParams(oParam);
			nsFreshcare.setup.bulkupdate.showUpdate(oParam);
		});

		$('#ns1blankspaceControlCertDataStuffUp').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			var oParam = {
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				};
			oParam = nsFreshcare.setup.bulkupdate.updateECACertificateType.setParams(oParam);
			nsFreshcare.setup.bulkupdate.showUpdate(oParam);
		});

		$('#ns1blankspaceControlRestoreAttendingTrainees').click(function(event)
		{
			
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			var oParam = {
				show: false,
				xhtmlElementID: 'ns1blankspaceUpdateColumn1'
				};
			nsFreshcare.setup.bulkupdate.data.userContinue = 2;
			oParam = nsFreshcare.setup.bulkupdate.restoreAttendingTrainees.setParams(oParam);
			nsFreshcare.setup.bulkupdate.showUpdate(oParam);
		});
	},

	showUpdate: function(oParam)
	{
		var aHTML = [];
		var sXHTMLContext = oParam.xhtmlContext;

		nsFreshcare.setup.bulkupdate.data.userContinue = 1;

		aHTML.push('<table class="ns1blankspaceMain"><tr><td>');
		
		aHTML.push('<table id="ns1blankspaceSetupBulkUpdate' + sXHTMLContext + 'Progress" class="ns1blankspaceMain">');
			
		aHTML.push('<tr><td class="ns1blankspaceColumn1Flexible ns1blankspaceCaption">' + oParam.title + '</td>' +
					'<td style="width:170px;">&nbsp;</td></tr>' +
					'<tr><td class="ns1blankspaceSummary">' +
					oParam.description +
					'</td>' +
					'<td id="ns1blankspaceSetupBulkUpdate' + sXHTMLContext + '" data-label="Go">Go</td></tr>');
		
		aHTML.push('<tr><td class="ns1blankspaceCaption">Progress</td>' +
					'<td id="ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCount">' +
						'<span id="ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress"></span>' + 
						'<span id="ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountTotal"></span>' + 
					'</td></tr></tr></table>');
		
		$("#" + oParam.xhtmlElementID).html(aHTML.join(''));
		
		$('#ns1blankspaceSetupBulkUpdate' + sXHTMLContext)
			.button({
				label: 'Go'
			})
			.click(function()
			{
				if ($(this).attr('data-label') === 'Go')
				{
					$(this).button({label: 'Pause'});
					$(this).attr('data-label', 'Pause');
					oParam.progressTableId = "ns1blankspaceSetupBulkUpdate" + sXHTMLContext + "Progress";
					if (nsFreshcare.setup.bulkupdate.data.userContinue === 1)		// First time around
					{
						nsFreshcare.setup.bulkupdate.search(oParam);
					}
					else
					{
						var fFunctionUpdate = oParam.functionUpdate;
						oParam = nsFreshcare.setup.bulkupdate.data.continueParam;
						nsFreshcare.setup.bulkupdate.data.userContinue = 2;
						fFunctionUpdate(oParam);
					}
				}
				else
				{
					$(this).button({label: 'Continue'});
					$(this).attr('data-label', 'Go');
					nsFreshcare.setup.bulkupdate.data.userContinue = 0;
				}
			});

	},

	search: function(oParam)
	{
		var iMoreId;
		var iStartRow;
		var iRows;
		var aHTML = [];
		var iTotal = 0;
		var fFunctionUpdate;
		var sXHTMLContext;

		if (oParam)
		{	
			if (oParam.searchStep === undefined) {oParam.searchStep = 1}
			if (oParam.moreId) {iMoreId = oParam.moreId}
			if (oParam.startRow != undefined) {iStartRow = oParam.startRow}
			if (oParam.rows != undefined) {iRows = oParam.rows}
			if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
			if (oParam.functionUpdate) {fFunctionUpdate = oParam.functionUpdate}
			if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext}
		}
		else {oParam = {searchStep: 1}}

		if (oParam.search && oParam.search.method)
		{
			if (oParam.searchStep === 1)
			{
				// First add the progress bar
				aHTML.push('<tr><td>Finding and updating records</td>' +
									'<td><div id="ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar">&nbsp;</div></td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html(ns1blankspace.xhtml.loadingSmall);

				// Get a list of first 50 records
				var oSearch = new AdvancedSearch();
				oSearch.method = oParam.search.method;
				oSearch.addField(oParam.search.fields);
				if (oParam.search.filters)
				{
					$.each(oParam.search.filters, function()
					{
						oSearch.addFilter(this.field, this.comparison, this.value1, this.value2, this.value3, this.applyToSubSearchJoin);
					});
				}

				if (oParam.search.sortFields)
				{
					$.each(oParam.search.sortFields, function(oParam)
					{
						oSearch.sort(this.field, this.direction);
					});
				}

				if (oParam.search.customOptions)
				{
					$.each(oParam.search.customOptions, function()
					{
						oSearch.addCustomOption(this.option, this.value);
					});
				}

				oSearch.addSummaryField('count(*) progress');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.rows = Number(oResponse.rows);
							oParam.startRow = 1;
							oParam.moreId = oResponse.moreid;
							oParam.totalCount = Number(oResponse.summary.progress);
							
							// We don't have all the rows, call CORE_SEARCH_MORE and get them all
							if (oParam.rows < oParam.totalCount)
							{	
								oParam.searchStep = 2;	
								nsFreshcare.setup.bulkupdate.search(oParam);
							}
							else	// We have all the rows, let's process
							{	
								oParam.searchStep = 3;	
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.search);
								fFunctionUpdate(oParam);							
							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');		
							aHTML = ['<tr><td>Nothing to update</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

						}
					}
					else
					{
						$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');		
						aHTML = ['<tr><td>Error searching for records to update: ' + oResponse.error.errornotes + '</td></tr>'];
						$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
					}
				});
			}

			// If we need to get more records, get next 500 here and then call this again at end of processing this list
			else if (oParam.searchStep === 2)
			{
				if ($('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountTotal').html() === '')
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress').html('0');
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountTotal').html(' of ' + iTotal);
				}
				oParam.searchStep = (iStartRow + 500 > iTotal) ? 3 : 2;
				delete(oParam.dataIndex);

				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + iMoreId + '&startrow=' + iStartRow + '&rows=500&rf=JSON',
					dataType: 'JSON',
					rf: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								oParam.startRow = Number(oResponse.startrow);
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.search);
								fFunctionUpdate(oParam);							
							}
							else
							{
								$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');		
								aHTML = ['<tr><td>Nothing to update</td></tr>'];
								$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');		
							aHTML = ['<tr><td>Error searching for growers: ' + oResponse.error.errornotes + '</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
						}
					}
				});
			}
			
			// We're done. Tell the user
			else if (oParam.searchStep === 3)
			{
				ns1blankspace.status.message('Processing complete.');
				aHTML.push('<tr><td>Processing Complete</td>' +
									'<td>&nbsp;</td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				
				$('#ns1blankspaceSetupBulkUpdate' + sXHTMLContext)
					.button({
						label: 'Go'
					});

				nsFreshcare.setup.bulkupdate.data.userContinue = 1;
				delete(nsFreshcare.setup.bulkupdate.data.continueParam);
			}
		}
		else
		{
			fFunctionUpdate(oParam);
		}

	},

	updateCertificateAudit: 
	{

		show: 	function(oParam)
		{
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceMain"><tr><td>');
			
			aHTML.push('<table id="ns1blankspaceSetupBulkUpdateCertificateAuditProgress" class="ns1blankspaceMain">');
				
			aHTML.push('<tr><td class="ns1blankspaceColumn1Flexible ns1blankspaceCaption">Certificate Audit update</td>' +
						'<td style="width:170px;">&nbsp;</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						'Sets certificate.audit to the most recent Cert Recommended audit prior to Date Issued where Resulting M/Ship Status is Cert Recommended.' +
						'</td>' +
						'<td id="ns1blankspaceSetupBulkUpdateCertificateAudit">Go</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceCaption">Progress</td>' +
						'<td id="ns1blankspaceBulkUpdateCertificateAuditProgressCount">' +
							'<span id="ns1blankspaceBulkUpdateCertificateAuditProgressCountProgress"></span>' + 
							'<span id="ns1blankspaceBulkUpdateCertificateAuditProgressCountTotal"></span>' + 
						'</td></tr></tr></table>');
			
			$("#" + oParam.xhtmlElementID).html(aHTML.join(''));
			
			$('#ns1blankspaceSetupBulkUpdateCertificateAudit')
				.button({
					label: 'Go'
				})
				.click(function()
				{
					nsFreshcare.setup.bulkupdate.updateCertificateAudit.search({progressTableId: "ns1blankspaceSetupBulkUpdateCertificateAuditProgress"});
				});
		},

		search: function(oParam)
		{
			var iMoreId;
			var iStartRow;
			var iRows;
			var bNullAudit = true; //(nsFreshcare.sitesDev.indexOf(nsFreshcare.site) > -1) ? false : true ;
			var aHTML = [];
			var iTotal = 0;

			if (oParam)
			{	
				if (oParam.searchStep === undefined) {oParam.searchStep = 1}
				if (oParam.moreId) {iMoreId = oParam.moreId}
				if (oParam.startRow != undefined) {iStartRow = oParam.startRow}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
			}
			else {oParam = {searchStep: 1}}

			if (oParam.searchStep === 1)
			{
				// First add the progress bar
				aHTML.push('<tr><td>Finding and updating Certificates</td>' +
									'<td><div id="ns1blankspaceBulkUpdateCertificateAuditProgressBar">&nbsp;</div></td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html(ns1blankspace.xhtml.loadingSmall);

				// Certicate has just been created so we must have a date Issued that is ON OR AFTER the Audit Date
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_CERTIFICATE_SEARCH';
				oSearch.addField('agricertificate.subscription.contactbusinesstext,agricertificate.subscription.contactbusiness,agricertificate.audit' + 
								',agricertificate.subscription,agricertificate.subscription.membership.code,agricertificate.dateissued');
				//oSearch.addFilter('sent', 'EQUAL_TO', 'N');
				oSearch.addFilter('agricertificate.subscription.contactbusinesstext', 'IS_NOT_NULL');
				if (bNullAudit)
				{
					oSearch.addFilter('agricertificate.audit', 'IS_NULL'); 
				}
				oSearch.addSummaryField('count(*) progress');
				oSearch.sort('agricertificate.subscription.contactbusiness', 'asc');
				oSearch.sort('agricertificate.subscription', 'asc');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.rows = Number(oResponse.rows);
							oParam.startRow = 1;
							oParam.moreId = oResponse.moreid;
							oParam.totalCount = Number(oResponse.summary.progress);
							
							// We don't have all the rows, call CORE_SEARCH_MORE and process from here
							if (oParam.rows < oParam.totalCount)
							{	
								oParam.searchStep = 2;	
								nsFreshcare.setup.bulkupdate.updateCertificateAudit.search(oParam);
							}
							else	// We have all the rows, let's process
							{	
								oParam.searchStep = 3;	
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.updateCertificateAudit.search);
								nsFreshcare.setup.bulkupdate.updateCertificateAudit.update(oParam);							
							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html('');		
							aHTML = ['<tr><td>No unsent certificates to update</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

						}
					}
					else
					{
						$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html('');		
						aHTML = ['<tr><td>Error searching for unsent Certificates: ' + oResponse.error.errornotes + '</td></tr>'];
						$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
					}
				});
			}

			// If we need to get more Unsent Certificates records and there are less than 500 records, get ALL of them here and then process in one big loop
			// otherwise, get them in lots of 500
			else if (oParam.searchStep === 2)
			{
				if ($('#ns1blankspaceBulkUpdateCertificateAuditProgressCountTotal').html() === '')
				{
					$('#ns1blankspaceBulkUpdateCertificateAuditProgressCountProgress').html('0');
					$('#ns1blankspaceBulkUpdateCertificateAuditProgressCountTotal').html(' of ' + iTotal);
				}
				oParam.searchStep = (iStartRow + 500 > iTotal) ? 3 : 2;
				delete(oParam.dataIndex);

				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + iMoreId + '&startrow=' + iStartRow + '&rows=500&rf=JSON',
					dataType: 'JSON',
					rf: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.startRow = Number(oResponse.startrow);

							if (oResponse.data.rows.length > 0)
							{
								oParam.startRow = Number(oResponse.startrow);
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.updateCertificateAudit.search);
								nsFreshcare.setup.bulkupdate.updateCertificateAudit.update(oParam);							
							}
							else
							{
								$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html('');		
								aHTML = ['<tr><td>No unsent certificates to update</td></tr>'];
								$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html('');		
							aHTML = ['<tr><td>Error searching for unsent Certificates: ' + oResponse.error.errornotes + '</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
						}
					}
				});
			}
			
			// We're done. Tell the user
			else if (oParam.searchStep === 3)
			{
				ns1blankspace.status.message('Processing complete.');
				aHTML.push('<tr><td>Processing Complete</td>' +
									'<td>&nbsp;</td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
			}
		},

		update: function(oParam)
		{
			var oData;
			var oCertificateAudits = [];
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex) {iDataIndex = oParam.dataIndex}
				if (oParam.certificateAudits) {oCertificateAudits = oParam.certificateAudits}
			}

			if (iDataIndex === -1 && oData.length > 0)
			{
				if (oParam.startRow === 1)
				{	$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html('');	}
					/*.css('border', '1px solid #DCDCDC')
					.css('height', '10px')
					.css('width', '0%')
					.css('max-width', '100%')
					.css('background-color', 'orange')
					.css('font-size', '0.875em')	//' style="border:1px solid #DCDCDC;height: 10px;width: 0%;background-color: orange;font-size: 0.875em; color: #006EBA;"
					.css('color', '#006EBA')*/

				nsFreshcare.setup.bulkupdate.data.updateCertificateData = oData;
				iDataIndex = 0;
			}
			else if (oData.length === 0)
			{
				$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar').html('No unsent Certificates found');
			}

			if (iTotal > 500)		// We only show the progess count if we have over 500 records
			{
				$('#ns1blankspaceBulkUpdateCertificateAuditProgressCountProgress').html(iDataIndex + oParam.startRow);
			}

			
			if (iDataIndex < nsFreshcare.setup.bulkupdate.data.updateCertificateData.length)
			{
				var oThisRow = nsFreshcare.setup.bulkupdate.data.updateCertificateData[iDataIndex];

				var sContactBusinessText = oThisRow['agricertificate.subscription.contactbusinesstext'];
				var sMembershipText = oThisRow['agricertificate.subscription.membership.code'];
				var sDateIssued = oThisRow['agricertificate.dateissued'];
				var sCertificate = oThisRow.id; 

				iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
				$('#ns1blankspaceBulkUpdateCertificateAuditProgressBar')
					.progressbar({value: iPercentage});

				oCertificateAudits.push({certificate:oThisRow.id
										, membership: oThisRow['agricertificate.subscription.membership.code']
										, contactBusinessText: sContactBusinessText
										, auditBefore: oThisRow['agricertificate.audit']
										, auditAfter: undefined});

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('actualdate,membershipstatus,subscription,contactbusiness,contactbusinesstext');
				oSearch.addFilter('audit.subscription', 'EQUAL_TO', oThisRow['agricertificate.subscription']);
				//oSearch.addFilter('audit.membershipstatus', 'IN_LIST', 
				//					nsFreshcare.data.grower.subscriptionStatusIN + ',' + nsFreshcare.data.grower.subscriptionStatusCE);
				oSearch.addFilter('audit.actualdate', 'LESS_THAN_OR_EQUAL_TO', sDateIssued);
				oSearch.sort('actualdate', 'desc');
				oSearch.rows = 20;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							if (bPerformUpdate)
							{
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
									data: 'id=' + sCertificate + '&audit=' + oResponse.data.rows[0].id,
									dataType: 'JSON',
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											aHTML.push('<tr><td>Certificate updated: ' + sContactBusinessText + ' for ' + sMembershipText + '</td></tr>');
											$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
										}
										else
										{
											aHTML.push('<tr><td>Error updating Certificate: ' + sContactBusinessText + ' for ' + sMembershipText + 
														'<br/>' + oResponse.error.errornotes +'</td></tr>');
											$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
										}
										oParam.dataIndex = iDataIndex + 1;
										nsFreshcare.setup.bulkupdate.updateCertificateAudit.update(oParam);
									}

								});
							}
							else
							{
								aHTML.push('<tr><td>Certificate to be updated: ' + sContactBusinessText + ' for ' + sMembershipText + '</td></tr>');
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								oParam.dataIndex = iDataIndex + 1;
								oCertificateAudits[oCertificateAudits.length-1].auditAfter = oResponse.data.rows[0].id;
								oParam.certificateAudits = oCertificateAudits;
								nsFreshcare.setup.bulkupdate.updateCertificateAudit.update(oParam);
							}
						}
						else
						{
							aHTML.push('<tr><td>Cannot find corresponding audit: ' + sContactBusinessText + ' for ' + sMembershipText + 
										((oResponse.data.rows.length == 0)
										? '<br/>' + oResponse.error.errornotes
										: '') +
										'</td></tr>');
							$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							oParam.dataIndex = iDataIndex + 1;
							nsFreshcare.setup.bulkupdate.updateCertificateAudit.update(oParam);
						}
					}
					else
					{
						aHTML.push('<tr><td>Error finding audit: ' + sContactBusinessText + ' for ' + sMembershipText + 
									'<br/>' + oResponse.error.errornotes +'</td></tr>');
						$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
						oParam.dataIndex = iDataIndex + 1;
						nsFreshcare.setup.bulkupdate.updateCertificateAudit.update(oParam);
					}
				});

			}
			else
			{
				oParam.startRow = oParam.startRow + 500;
				nsFreshcare.setup.bulkupdate.updateCertificateAudit.search(oParam);
			}
		}

	},

	updateCertificatePrintOption: 
	{

		show: 	function(oParam)
		{
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceMain"><tr><td>');
			
			aHTML.push('<table id="ns1blankspaceSetupBulkUpdateCertificatePrintOptionProgress" class="ns1blankspaceMain">');
				
			aHTML.push('<tr><td class="ns1blankspaceColumn1Flexible ns1blankspaceCaption">Default Certificate Print Option</td>' +
						'<td style="width:170px;">&nbsp;</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						'Sets Send Printed Certificate question on grower record to No where it has not already been set.' +
						'</td>' +
						'<td id="ns1blankspaceSetupBulkUpdateCertificatePrintOption">Go</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceCaption">Progress</td>' +
						'<td id="ns1blankspaceBulkUpdateCertificatePrintOptionProgressCount">' +
							'<span id="ns1blankspaceBulkUpdateCertificatePrintOptionProgressCountProgress"></span>' + 
							'<span id="ns1blankspaceBulkUpdateCertificatePrintOptionProgressCountTotal"></span>' + 
						'</td></tr></tr></table>');
			
			$("#" + oParam.xhtmlElementID).html(aHTML.join(''));
			
			$('#ns1blankspaceSetupBulkUpdateCertificatePrintOption')
				.button({
					label: 'Go'
				})
				.click(function()
				{
					nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.search({progressTableId: "ns1blankspaceSetupBulkUpdateCertificatePrintOptionProgress"});
				});
		},

		search: function(oParam)
		{
			var iMoreId;
			var iStartRow;
			var iRows;
			var bNullAudit = (nsFreshcare.sitesDev.indexOf(nsFreshcare.site) > -1) ? false : true ;
			var aHTML = [];
			var iTotal = 0;

			if (oParam)
			{	
				if (oParam.searchStep === undefined) {oParam.searchStep = 1}
				if (oParam.moreId) {iMoreId = oParam.moreId}
				if (oParam.startRow != undefined) {iStartRow = oParam.startRow}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
			}
			else {oParam = {searchStep: 1}}

			if (oParam.searchStep === 1)
			{
				// First add the progress bar
				aHTML.push('<tr><td>Finding and updating Growers</td>' +
									'<td><div id="ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar">&nbsp;</div></td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html(ns1blankspace.xhtml.loadingSmall);

				// Look for all growers where se8659 is null or invalid
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.tradename,contactbusiness.se8659');
				oSearch.addBracket('(');
				//oSearch.addFilter('se8659', 'NOT_IN_LIST', $.map(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.id}).join(','));
				//oSearch.addOperator('or');
				oSearch.addFilter('se8659', 'IS_NULL');
				oSearch.addBracket(')');
				oSearch.addFilter('contactbusiness.contactperson.persongroup', 'IN_LIST', nsFreshcare.data.groupGrower.join(','));
				oSearch.addFilter('contactbusiness.contactperson.id', 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
				oSearch.addSummaryField('count(*) progress');
				oSearch.sort('contactbusiness.tradename', 'asc');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.rows = Number(oResponse.rows);
							oParam.startRow = 1;
							oParam.moreId = oResponse.moreid;
							oParam.totalCount = Number(oResponse.summary.progress);
							
							// We don't have all the rows, call CORE_SEARCH_MORE and get them all
							if (oParam.rows < oParam.totalCount)
							{	
								oParam.searchStep = 2;	
								nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.search(oParam);
							}
							else	// We have all the rows, let's process
							{	
								oParam.searchStep = 3;	
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.search);
								nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.update(oParam);							
							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html('');		
							aHTML = ['<tr><td>No growers to update</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

						}
					}
					else
					{
						$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html('');		
						aHTML = ['<tr><td>Error searching for growers: ' + oResponse.error.errornotes + '</td></tr>'];
						$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
					}
				});
			}

			// If we need to get more Unsent Certificates records, get ALL of them here and then process in one big loop
			else if (oParam.searchStep === 2)
			{
				if ($('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressCountTotal').html() === '')
				{
					$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressCountProgress').html('0');
					$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressCountTotal').html(' of ' + iTotal);
				}
				oParam.searchStep = (iStartRow + 500 > iTotal) ? 3 : 2;
				delete(oParam.dataIndex);

				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + iMoreId + '&startrow=' + iStartRow + '&rows=500&rf=JSON',
					dataType: 'JSON',
					rf: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								oParam.startRow = Number(oResponse.startrow);
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.search);
								nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.update(oParam);							
							}
							else
							{
								$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html('');		
								aHTML = ['<tr><td>No growers to update</td></tr>'];
								$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html('');		
							aHTML = ['<tr><td>Error searching for growers: ' + oResponse.error.errornotes + '</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
						}
					}
				});
			}
			
			// We're done. Tell the user
			else if (oParam.searchStep === 3)
			{
				ns1blankspace.status.message('Processing complete.');
				aHTML.push('<tr><td>Processing Complete</td>' +
									'<td>&nbsp;</td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
			}
		},

		update: function(oParam)
		{
			var oData;
			var oCertificateAudits = [];
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex) {iDataIndex = oParam.dataIndex}
				if (oParam.certificateAudits) {oCertificateAudits = oParam.certificateAudits}
			}

			if (iDataIndex === -1 && oData.length > 0)
			{
				if (oParam.startRow === 1)
				{	$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html('');	}
				nsFreshcare.setup.bulkupdate.data.updateCertificateData = oData;
				iDataIndex = 0;
			}
			else if (oData.length === 0)
			{
				$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar').html('No growers found');
			}

			if (nsFreshcare.setup.bulkupdate.data.printOptionNo === undefined)
			{
				nsFreshcare.setup.bulkupdate.data.printOptionNo = $.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, 
							 function(x) {return x.title === 'No'}),
					function(y) {return y.id})
				.shift();
			}

			if (iTotal > 500)		// We only show the progess count if we have over 500 records
			{
				$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressCountProgress').html(iDataIndex + oParam.startRow);
			}


			if (iDataIndex < nsFreshcare.setup.bulkupdate.data.updateCertificateData.length)
			{
				// We may have duplciates so we need to ignore these..
				var oThisRow = nsFreshcare.setup.bulkupdate.data.updateCertificateData[iDataIndex];
				var sContactBusinessText = oThisRow['contactbusiness.tradename'];
				var sData = '';

				iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
				$('#ns1blankspaceBulkUpdateCertificatePrintOptionProgressBar')
					.progressbar({value: iPercentage});

				if (iDataIndex == 0 
					|| (iDataIndex > 0 && oThisRow.id != nsFreshcare.setup.bulkupdate.data.updateCertificateData[iDataIndex - 1].id))
				{
					sData += 'id=' + oThisRow.id + '&se8659=' + ns1blankspace.util.fs(nsFreshcare.setup.bulkupdate.data.printOptionNo);
					if (bPerformUpdate)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
							data: sData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									aHTML.push('<tr><td>Grower updated: ' + sContactBusinessText + '</td></tr>');
									$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								}
								else
								{
									aHTML.push('<tr><td>Error updating grower: ' + sContactBusinessText + 
												'<br/>' + oResponse.error.errornotes +'</td></tr>');
									$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								}
								oParam.dataIndex = iDataIndex + 1;
								nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.update(oParam);
							}
						});
					}
					else
					{
						oParam.dataIndex = iDataIndex + 1;
						nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.update(oParam);
					}
				}
				else
				{
					oParam.dataIndex = iDataIndex + 1;
					nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.update(oParam);
				}

			}
			else
			{
				oParam.startRow = oParam.startRow + 500;
				nsFreshcare.setup.bulkupdate.updateCertificatePrintOption.search(oParam);
			}
		}
	},

	fixCertificationAchieved: 
	{

		show: 	function(oParam)
		{
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceMain"><tr><td>');
			
			aHTML.push('<table id="ns1blankspaceSetupBulkUpdateCertificationAchievedDateProgress" class="ns1blankspaceMain">');
				
			aHTML.push('<tr><td class="ns1blankspaceColumn1Flexible ns1blankspaceCaption">Fix Certification Achieved Date</td>' +
						'<td style="width:170px;">&nbsp;</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						'Changes the format of Certification Achieved date on existing Certificate Action records where its is currently set to dd mmm yyyy.' +
						'</td>' +
						'<td id="ns1blankspaceSetupBulkUpdateCertificationAchievedDate">Go</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceCaption">Progress</td>' +
						'<td id="ns1blankspaceBulkUpdateCertificationAchievedDateProgressCount">' +
							'<span id="ns1blankspaceBulkUpdateCertificationAchievedDateProgressCountProgress"></span>' + 
							'<span id="ns1blankspaceBulkUpdateCertificationAchievedDateProgressCountTotal"></span>' + 
						'</td></tr></tr></table>');
			
			$("#" + oParam.xhtmlElementID).html(aHTML.join(''));
			
			$('#ns1blankspaceSetupBulkUpdateCertificationAchievedDate')
				.button({
					label: 'Go'
				})
				.click(function()
				{
					nsFreshcare.setup.bulkupdate.fixCertificationAchieved.search({progressTableId: "ns1blankspaceSetupBulkUpdateCertificationAchievedDateProgress"});
				});
		},

		search: function(oParam)
		{
			var iMoreId;
			var iStartRow;
			var iRows;
			var aHTML = [];
			var iTotal = 0;

			if (oParam)
			{	
				if (oParam.searchStep === undefined) {oParam.searchStep = 1}
				if (oParam.moreId) {iMoreId = oParam.moreId}
				if (oParam.startRow != undefined) {iStartRow = oParam.startRow}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
			}
			else {oParam = {searchStep: 1}}

			if (oParam.searchStep === 1)
			{
				// First add the progress bar
				aHTML.push('<tr><td>Finding and updating Certification Actions</td>' +
									'<td><div id="ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar">&nbsp;</div></td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html(ns1blankspace.xhtml.loadingSmall);

				// Look for allactions where actiontype = nsFreshcare.data.actionTypeCertificate
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('description,subject,action.contactbusiness.tradename');
				oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
				oSearch.addSummaryField('count(*) progress');
				oSearch.sort('action.contactbusiness.tradename', 'asc');
				oSearch.sort('action.subject', 'asc');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.rows = Number(oResponse.rows);
							oParam.startRow = 1;
							oParam.moreId = oResponse.moreid;
							oParam.totalCount = Number(oResponse.summary.progress);
							
							// We don't have all the rows, call CORE_SEARCH_MORE and get them all
							if (oParam.rows < oParam.totalCount)
							{	
								oParam.searchStep = 2;	
								nsFreshcare.setup.bulkupdate.fixCertificationAchieved.search(oParam);
							}
							else	// We have all the rows, let's process
							{	
								oParam.searchStep = 3;	
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.fixCertificationAchieved.search);
								nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);							
							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html('');		
							aHTML = ['<tr><td>No Certificates to update</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

						}
					}
					else
					{
						$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html('');		
						aHTML = ['<tr><td>Error searching for Certificates: ' + oResponse.error.errornotes + '</td></tr>'];
						$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
					}
				});
			}

			// If we need to get more Certificates records, get ALL of them here and then process in one big loop
			else if (oParam.searchStep === 2)
			{
				if ($('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressCountTotal').html() === '')
				{
					$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressCountProgress').html('0');
					$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressCountTotal').html(' of ' + iTotal);
				}
				oParam.searchStep = (iStartRow + 500 > iTotal) ? 3 : 2;
				delete(oParam.dataIndex);

				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + iMoreId + '&startrow=' + iStartRow + '&rows=500&rf=JSON',
					dataType: 'JSON',
					rf: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								oParam.startRow = Number(oResponse.startrow);
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.fixCertificationAchieved.search);
								nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);							
							}
							else
							{
								$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html('');		
								aHTML = ['<tr><td>No certificates to update</td></tr>'];
								$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html('');		
							aHTML = ['<tr><td>Error searching for certificates: ' + oResponse.error.errornotes + '</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
						}
					}
				});
			}
			
			// We're done. Tell the user
			else if (oParam.searchStep === 3)
			{
				ns1blankspace.status.message('Processing complete.');
				aHTML.push('<tr><td>Processing Complete</td>' +
									'<td>&nbsp;</td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
			}
		},

		update: function(oParam)
		{
			var oData;
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;
			var bContinue = true;
			var bUpdate = true;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex) {iDataIndex = oParam.dataIndex}
			}

			if (iDataIndex === -1 && oData.length > 0)
			{
				if (oParam.startRow === 1)
				{	$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html('');	}
				nsFreshcare.setup.bulkupdate.data.updateCertificateData = oData;
				iDataIndex = 0;
			}
			else if (oData.length === 0)
			{
				$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar').html('No certificates found');
			}

			if (iTotal > 500)		// We only show the progess count if we have over 500 records
			{
				$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressCountProgress').html(iDataIndex + oParam.startRow);
			}


			if (iDataIndex < nsFreshcare.setup.bulkupdate.data.updateCertificateData.length)
			{
				var oThisRow = nsFreshcare.setup.bulkupdate.data.updateCertificateData[iDataIndex];
				var sContactBusinessText = oThisRow['action.contactbusiness.tradename'];
				var sData = '';
				var sCertificateData = oThisRow.description.formatXHTML();
				

				iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
				$('#ns1blankspaceBulkUpdateCertificationAchievedDateProgressBar')
					.progressbar({value: iPercentage});


				// Fix issue where data saved without correct encoding
				while (sCertificateData.indexOf('amp;') > -1)
				{
					sCertificateData = sCertificateData.formatXHTML();
				}
				var oCertificateData = JSON.parse(sCertificateData);

				oCertificateData = (oParam.certificateData) ? oParam.certificateData : oCertificateData;

				
				// Fix Re-Certification Date
				var sReCertificationDate = oCertificateData.reCertificationDate;
				if (sReCertificationDate && sReCertificationDate != '') 
				{
					if (sReCertificationDate.substr(0,9) === 'undefined')
					{
						if (nsFreshcare.sitesDev.indexOf(nsFreshcare.site) > -1 ) 
						{
							sReCertificationDate = oCertificateData.auditDate.substr(3);
						}
						else
						{
							bUpdate = false;
							aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '. Re-certification date invalid</td></tr>');
							$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
						}
					}

					// Fix Re-Certification Date
					/*else if (!isNaN(parseInt(sReCertificationDate.substr(0,2))))		// Format is dd MMM yyyy
					{
						sReCertificationDate = new Date(sReCertificationDate).toString('MMMM yyyy');
					}*/

					// Revert Re-Certification Date
					else if (isNaN(parseInt(sReCertificationDate.substr(0,2))))		// Format is MMMM yyyy
					{
						bContinue = false;
						bUpdate = false;
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AUDIT_SEARCH';
						oSearch.addField('codeofpractice,actualdate');
						oSearch.addFilter('id', 'EQUAL_TO', oCertificateData.audit);
						oSearch.rows = 1;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
							{
								if (oResponse.data.rows[0].codeofpractice != '')
								{	
									var oSearch = new AdvancedSearch();
									oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
									oSearch.addField('certificateexpiresafter');
									oSearch.addFilter('id', 'EQUAL_TO', oResponse.data.rows[0].codeofpractice);
									oSearch.rows = 1;
									oSearch.getResults(function(oResponse)
									{
										if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
										{
											// Let's work out the Re-certification Audit date
											var dActual = new Date(oCertificateData.auditDate);
											var dRecertDate = new Date(dActual.setMonth(dActual.getMonth() + parseInt(oResponse.data.rows[0].certificateexpiresafter)));
											oCertificateData.reCertificationDate = dRecertDate.toString('dd MMMM yyyy');
											oParam.certificateData = oCertificateData;
										}
										else
										{
											oParam.dataIndex = iDataIndex + 1;
											if (oResponse.status === 'ER')
											{
												bContinue = false;
												aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '.' + oResponse.error.errornotes + '</td></tr>');
											}
											else
											{
												aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '. Could not find COP</td></tr>');
											}
											$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
										}
										nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);
									});
								}
								else
								{
									oParam.dataIndex = iDataIndex + 1;
									aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '. COP is blank</td></tr>');
									$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
									nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);
								}

							}
							else
							{
								oParam.dataIndex = iDataIndex + 1;
								if (oResponse.status === 'ER')
								{
									bContinue = false;
									aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '.' + oResponse.error.errornotes + '</td></tr>');
								}
								else
								{
									aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '. Could not find Audit</td></tr>');
								}
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);
							}
							
						});
					}

					bUpdate = (sReCertificationDate != oCertificateData.reCertificationDate);
					bUpdate = (bUpdate) ? bUpdate : (oParam.certificateData != undefined);
				}
				oCertificateData.reCertificationDate = sReCertificationDate;

				
				// Fix CertificationAchieved Date
				/*var sCertificationAchieved = oCertificateData.certificationAchieved;
				if (sCertificationAchieved && sCertificationAchieved != '') 
				{
					// Check if we need to find the CertificationAchieved Date
					if (sCertificationAchieved.substr(0,9) === 'undefined' || isNaN(parseInt(sCertificationAchieved.substr(0,2))))	// Format is MMMM yyyy
					{
						bContinue = false;
						bUpdate = false;
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AUDIT_SEARCH';
						oSearch.addField('resultstatusdate');
						oSearch.addFilter('id', 'EQUAL_TO', oCertificateData.audit);
						oSearch.rows = 1;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
							{
								if (oResponse.data.rows[0].resultstatusdate != '')
								{	
									oCertificateData.certificationAchieved = (new Date(oResponse.data.rows[0].resultstatusdate)).toString('dd MMMM yyyy');
									oParam.certificateData = oCertificateData;
								}

							}
							else
							{
								oParam.dataIndex = iDataIndex + 1;
								if (oResponse.status === 'ER')
								{
									bContinue = false;
									aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '.' + oResponse.error.errornotes + '</td></tr>');
								}
								else
								{
									aHTML.push('<tr><td>Error! Certificate not updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '. Could not find Audit</td></tr>');
								}
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							}
							
							nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);
						});
					}
					else
					{
						bUpdate = (bUpdate) ? bUpdate : (oParam.certificateData != undefined);
					}
				}*/

				
				if (bContinue && bUpdate)
				{
					delete(oParam.certificateData);
					sData += 'id=' + oThisRow.id + '&description=' + ns1blankspace.util.fs(JSON.stringify(oCertificateData));
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
						data: sData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								aHTML.push('<tr><td>Certificate updated: ' + sContactBusinessText + ': ' + oCertificateData.versionNumber + '</td></tr>');
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));

								// Now remove and re-create PDF attachment if it exists
							}
							else
							{
								aHTML.push('<tr><td>Error updating certificate: ' + sContactBusinessText +  ': ' + oCertificateData.versionNumber + 
											'<br/>' + oResponse.error.errornotes +'</td></tr>');
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							}
							oParam.dataIndex = iDataIndex + 1;
							nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);
						}
					});
				}
				else if (bContinue)
				{
					oParam.dataIndex = iDataIndex + 1;
					nsFreshcare.setup.bulkupdate.fixCertificationAchieved.update(oParam);
				}

			}
			else
			{
				oParam.startRow = oParam.startRow + 500;
				nsFreshcare.setup.bulkupdate.fixCertificationAchieved.search(oParam);
			}
		}

	},

	removeCertificateActions: 
	{

		show: 	function(oParam)
		{
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceMain"><tr><td>');
			
			aHTML.push('<table id="ns1blankspaceSetupBulkUpdateRemoveCertificateActionsProgress" class="ns1blankspaceMain">');
				
			aHTML.push('<tr><td class="ns1blankspaceColumn1Flexible ns1blankspaceCaption">Remove Certificate Data Actions</td>' +
						'<td style="width:170px;">&nbsp;</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						'Removes Certificate Data Actions and any linked attachments.' +
						'</td>' +
						'<td id="ns1blankspaceSetupBulkUpdateRemoveCertificateActions">Go</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceCaption">Progress</td>' +
						'<td id="ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCount">' +
							'<span id="ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCountProgress"></span>' + 
							'<span id="ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCountTotal"></span>' + 
						'</td></tr></tr></table>');
			
			$("#" + oParam.xhtmlElementID).html(aHTML.join(''));
			
			$('#ns1blankspaceSetupBulkUpdateRemoveCertificateActions')
				.button({
					label: 'Go'
				})
				.click(function()
				{
					nsFreshcare.setup.bulkupdate.removeCertificateActions.search({progressTableId: "ns1blankspaceSetupBulkUpdateRemoveCertificateActionsProgress"});
				});
		},

		search: function(oParam)
		{
			var iMoreId;
			var iStartRow;
			var iRows;
			var bNullAudit = (nsFreshcare.sitesDev.indexOf(nsFreshcare.site) > -1) ? false : true ;
			var aHTML = [];
			var iTotal = 0;

			if (oParam)
			{	
				if (oParam.searchStep === undefined) {oParam.searchStep = 1}
				if (oParam.moreId) {iMoreId = oParam.moreId}
				if (oParam.startRow != undefined) {iStartRow = oParam.startRow}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
			}
			else {oParam = {searchStep: 1}}

			if (oParam.searchStep === 1)
			{
				// First add the progress bar
				aHTML.push('<tr><td>Finding Actions</td>' +
									'<td><div id="ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar">&nbsp;</div></td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html(ns1blankspace.xhtml.loadingSmall);

				// Any actions with a type of Certificate Data (nsFreshcare.data.attachmentTypeCertificate)
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('actiontype,contactbusiness,contactbusinesstext,object,objectcontext,subject,createduser,createdusertext,createddate');
				oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeCertificate);
				oSearch.addSummaryField('count(*) progress');
				oSearch.sort('contactbusinesstext', 'asc');
				oSearch.sort('subject', 'asc');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.rows = Number(oResponse.rows);
							oParam.startRow = 1;
							oParam.moreId = oResponse.moreid;
							oParam.totalCount = Number(oResponse.summary.progress);
							
							// We don't have all the rows, call CORE_SEARCH_MORE and process from here
							if (oParam.rows < oParam.totalCount)
							{	
								oParam.searchStep = 2;	
								nsFreshcare.setup.bulkupdate.removeCertificateActions.search(oParam);
							}
							else	// We have all the rows, let's process
							{	
								oParam.searchStep = 3;	
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.removeCertificateActions.search);
								nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);							
							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html('');		
							aHTML = ['<tr><td>No actions to remove</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

						}
					}
					else
					{
						$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html('');		
						aHTML = ['<tr><td>Error searching for Certificate Data actions: ' + oResponse.error.errornotes + '</td></tr>'];
						$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
					}
				});
			}

			// If we need to get more Action records and there are less than 500 records, get ALL of them here and then process in one big loop
			// otherwise, get them in lots of 500
			else if (oParam.searchStep === 2)
			{
				if ($('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCountTotal').html() === '')
				{
					$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCountProgress').html('0');
					$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCountTotal').html(' of ' + iTotal);
				}
				oParam.searchStep = (iStartRow + 500 > iTotal) ? 3 : 2;
				delete(oParam.dataIndex);

				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + iMoreId + '&startrow=' + iStartRow + '&rows=500&rf=JSON',
					dataType: 'JSON',
					rf: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.startRow = Number(oResponse.startrow);

							if (oResponse.data.rows.length > 0)
							{
								oParam.startRow = Number(oResponse.startrow);
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.removeCertificateActions.search);
								nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);							
							}
							else
							{
								$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html('');		
								aHTML = ['<tr><td>No Certificate Data actions to remove</td></tr>'];
								$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html('');		
							aHTML = ['<tr><td>Error searching for Certificate Data actions: ' + oResponse.error.errornotes + '</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
						}
					}
				});
			}
			
			// We're done. Tell the user
			else if (oParam.searchStep === 3)
			{
				ns1blankspace.status.message('Processing complete.');
				aHTML.push('<tr><td>Processing Complete</td>' +
									'<td>&nbsp;</td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
			}
		},

		update: function(oParam)
		{
			var oData;
			var oRemoveCertificateActions = [];
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;

			if (oParam)
			{
				if (oParam.removeActionsStep === undefined) {oParam.removeActionsStep = 1}
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex) {iDataIndex = oParam.dataIndex}
				if (oParam.actionAttachments) {oRemoveCertificateActions = oParam.actionAttachments}
			}

			if (iDataIndex === -1 && oData.length > 0)
			{
				if (oParam.startRow === 1)
				{	$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html('');	}

				nsFreshcare.setup.bulkupdate.data.removeCertificateActionData = oData;
				iDataIndex = 0;
			}
			else if (oData.length === 0)
			{
				$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar').html('No Certificate data actions found');
			}

			if (iTotal > 500)		// We only show the progess count if we have over 500 records
			{
				$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressCountProgress').html(iDataIndex + oParam.startRow);
			}

			
			if (iDataIndex < nsFreshcare.setup.bulkupdate.data.removeCertificateActionData.length)
			{
				var oThisRow = nsFreshcare.setup.bulkupdate.data.removeCertificateActionData[iDataIndex];

				var sContactBusinessText = oThisRow['contactbusinesstext'];
				var sAction = oThisRow.id; 

				// Find the Attachments
				if (oParam.removeActionsStep === 1)
				{
					iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
					$('#ns1blankspaceBulkUpdateRemoveCertificateActionsProgressBar')
						.progressbar({value: iPercentage});

					oRemoveCertificateActions.push({action:oThisRow.id
											, contactBusinessText: sContactBusinessText});

					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_ATTACHMENT_SEARCH';
					oSearch.addField('attachment,object,objectcontext');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAction);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', sAction); 
					oSearch.rows = 20;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								oParam.actionAttachments = oResponse.data.rows;
								oParam.removeActionsStep = 2;
								oParam.removeAttachmentIndex = 0;
							}
							else
							{
								delete(oParam.actionAttachments);
								oParam.removeActionsStep = 3;		// Remove the action
								delete(oParam.removeAttachmentIndex);
							}
						}
						else
						{
							aHTML.push('<tr><td>Error searching for attachments: ' + sContactBusinessText + 
										'<br/>' + oResponse.error.errornotes +'</td></tr>');
							$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							oParam.removeActionsStep = 1;
							oParam.dataIndex = iDataIndex + 1;
						}
						nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);
					});

				}

				// Remove the attachments (in oParam.actionAttachments)
				else if (oParam.removeActionsStep === 2)
				{
					if (oParam.actionAttachments.length > 0 && oParam.removeAttachmentIndex > -1 && bPerformUpdate)
					{
						var oThisAttachment = oParam.actionAttachments[oParam.removeAttachmentIndex];
						var sData = 'id=' + oThisAttachment.attachment + '&remove=1';
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_ATTACHMENT_MANAGE'),
							data: sData,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.removeAttachmentIndex = oParam.removeAttachmentIndex + 1;
									if (oParam.removeAttachmentIndex + 1 > oParam.actionAttachments.length)
									{
										delete(oParam.removeAttachmentIndex);
										delete(oParam.actionAttachments);
										oParam.removeActionsStep = 3;		// Delete the action
									}
								}
								else
								{
									aHTML.push('<tr><td>Error removing attachment: ' + sContactBusinessText + ' attachment: ' + oThisAttachment.id + 
												'<br/>' + oResponse.error.errornotes +'</td></tr>');
									$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
									delete(oParam.removeAttachmentIndex);
									delete(oParam.actionAttachments);
									oParam.removeActionsStep = 1;
									oParam.dataIndex = iDataIndex + 1;
								}
								nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);
							}
						});

					}
					else	// Just remove the action 
					{
						oParam.removeActionsStep = 3;
						nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);
					}
				}

				// Remove the action
				else if (oParam.removeActionsStep === 3)
				{
					if (bPerformUpdate)
					{
						$.ajax({
							type: 'POST',
							url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
							data: 'remove=1&id=' + sAction,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									aHTML.push('<tr><td>Action removed: ' + sContactBusinessText + '</td></tr>');
									$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								}
								else
								{
									aHTML.push('<tr><td>Error removing action: ' + sContactBusinessText + 
												'<br/>' + oResponse.error.errornotes +'</td></tr>');
									$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								}
								delete(oParam.removeAttachmentIndex);
								delete(oParam.actionAttachments);
								oParam.removeActionsStep = 1
								oParam.dataIndex = iDataIndex + 1;
								nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);
							}
						});
					}
					else	// Just go to the next record
					{
						delete(oParam.removeAttachmentIndex);
						delete(oParam.actionAttachments);
						oParam.removeActionsStep = 1
						oParam.dataIndex = iDataIndex + 1;
						nsFreshcare.setup.bulkupdate.removeCertificateActions.update(oParam);
					}
				}

			}
			else
			{
				oParam.startRow = oParam.startRow + 500;
				nsFreshcare.setup.bulkupdate.removeCertificateActions.search(oParam);
			}
		}

	},

	removeDuplicateProductGroups: 
	{

		show: 	function(oParam)
		{
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceMain"><tr><td>');
			
			aHTML.push('<table id="ns1blankspaceSetupBulkUpdateDuplicateProductGroupsProgress" class="ns1blankspaceMain">');
				
			aHTML.push('<tr><td class="ns1blankspaceColumn1Flexible ns1blankspaceCaption">Remove Duplicate Product Categories</td>' +
						'<td style="width:170px;">&nbsp;</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						'Removes duplicated Product Groups (Categories) from growers.' +
						'</td>' +
						'<td id="ns1blankspaceSetupBulkUpdateDuplicateProductGroups">Go</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceCaption">Progress</td>' +
						'<td id="ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCount">' +
							'<span id="ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCountProgress"></span>' + 
							'<span id="ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCountTotal"></span>' + 
						'</td></tr></tr></table>');
			
			$("#" + oParam.xhtmlElementID).html(aHTML.join(''));
			
			$('#ns1blankspaceSetupBulkUpdateDuplicateProductGroups')
				.button({
					label: 'Go'
				})
				.click(function()
				{
					nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.search({progressTableId: "ns1blankspaceSetupBulkUpdateDuplicateProductGroupsProgress"});
				});
		},

		search: function(oParam)
		{
			var iMoreId;
			var iStartRow;
			var iRows;
			var bNullAudit = (nsFreshcare.sitesDev.indexOf(nsFreshcare.site) > -1) ? false : true ;
			var aHTML = [];
			var iTotal = 0;

			if (oParam)
			{	
				if (oParam.searchStep === undefined) {oParam.searchStep = 1}
				if (oParam.moreId) {iMoreId = oParam.moreId}
				if (oParam.startRow != undefined) {iStartRow = oParam.startRow}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
			}
			else {oParam = {searchStep: 1}}

			if (oParam.searchStep === 1)
			{
				// First add the progress bar
				aHTML.push('<tr><td>Finding and updating Growers</td>' +
									'<td><div id="ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar">&nbsp;</div></td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
				$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html(ns1blankspace.xhtml.loadingSmall);

				// Get a list of all growers' subscriptions
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('contactbusinesstext,agrisubscription.membership.code');
				oSearch.addSummaryField('count(*) progress');
				oSearch.sort('contactbusinesstext', 'asc');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{

					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.rows = Number(oResponse.rows);
							oParam.startRow = 1;
							oParam.moreId = oResponse.moreid;
							oParam.totalCount = Number(oResponse.summary.progress);
							
							// We don't have all the rows, call CORE_SEARCH_MORE and get them all
							if (oParam.rows < oParam.totalCount)
							{	
								oParam.searchStep = 2;	
								nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.search(oParam);
							}
							else	// We have all the rows, let's process
							{	
								oParam.searchStep = 3;	
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.search);
								nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.update(oParam);							
							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html('');		
							aHTML = ['<tr><td>No growers to update</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

						}
					}
					else
					{
						$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html('');		
						aHTML = ['<tr><td>Error searching for growers: ' + oResponse.error.errornotes + '</td></tr>'];
						$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
					}
				});
			}

			// If we need to get more subscription ecords, get ALL of them here and then process in one big loop
			else if (oParam.searchStep === 2)
			{
				if ($('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCountTotal').html() === '')
				{
					$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCountProgress').html('0');
					$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCountTotal').html(' of ' + iTotal);
				}
				oParam.searchStep = (iStartRow + 500 > iTotal) ? 3 : 2;
				delete(oParam.dataIndex);

				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + iMoreId + '&startrow=' + iStartRow + '&rows=500&rf=JSON',
					dataType: 'JSON',
					rf: 'JSON',
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								oParam.startRow = Number(oResponse.startrow);
								oParam.data = oResponse.data.rows;
								oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.search);
								nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.update(oParam);							
							}
							else
							{
								$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html('');		
								aHTML = ['<tr><td>No growers to update</td></tr>'];
								$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));

							}
						}
						else
						{
							$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html('');		
							aHTML = ['<tr><td>Error searching for growers: ' + oResponse.error.errornotes + '</td></tr>'];
							$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
						}
					}
				});
			}
			
			// We're done. Tell the user
			else if (oParam.searchStep === 3)
			{
				ns1blankspace.status.message('Processing complete.');
				aHTML.push('<tr><td>Processing Complete</td>' +
									'<td>&nbsp;</td></tr>');
				$('#' + oParam.progressTableId).children().children().last().after(aHTML.join(''));
			}
		},

		update: function(oParam)
		{
			var oData;
			var oCertificateAudits = [];
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex) {iDataIndex = oParam.dataIndex}
				if (oParam.certificateAudits) {oCertificateAudits = oParam.certificateAudits}
			}

			if (iDataIndex === -1 && oData.length > 0)
			{
				if (oParam.startRow === 1)
				{	$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html('');	}
				nsFreshcare.setup.bulkupdate.data.updateSubscriptionData = oData;
				iDataIndex = 0;
				oParam.dataIndex = 0;
				oParam.removeProductGroupStep = 1;
			}
			else if (oData.length === 0)
			{
				$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar').html('No growers found');
			}

			if (iTotal > 500)		// We only show the progess count if we have over 500 records
			{
				$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressCountProgress').html(iDataIndex + oParam.startRow);
			}


			if (iDataIndex < nsFreshcare.setup.bulkupdate.data.updateSubscriptionData.length)
			{
				var oThisRow = nsFreshcare.setup.bulkupdate.data.updateSubscriptionData[iDataIndex];
				var sContactBusinessText = oThisRow['contactbusinesstext'].formatXHTML();
				var sData = '';

				if (oParam.removeProductGroupStep === 1)
				{

					iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
					$('#ns1blankspaceBulkUpdateDuplicateProductGroupsProgressBar')
						.progressbar({value: iPercentage});

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
					oSearch.addField('productcategory,productcategorytext');
					oSearch.addFilter('subscription', 'EQUAL_TO', oThisRow.id);
					oSearch.sort('productcategory', 'asc');
					oSearch.getResults(function(oResponse)
					{
						var aDuplicates = [];
						if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
						{
							aDuplicates = $.grep(oResponse.data.rows, function(x, index)
												{	
													return (index > 0) 
															? oResponse.data.rows[index - 1].productcategory === x.productcategory
															: false;
												});
						}

						if (aDuplicates.length > 0)
						{
							oParam.removeProductGroupStep = 2;
							oParam.duplicateProductGroups = aDuplicates;
						}
						else
						{
							oParam.dataIndex += 1;
						}
						nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.update(oParam);
					});

				}

				else if (oParam.removeProductGroupStep === 2)
				{

					if (oParam.duplicateProductGroups.length > 0)
					{
						sData += 'id=' + oParam.duplicateProductGroups[0].id + '&remove=1';
						if (bPerformUpdate)
						{
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_PRODUCT_GROUP_MANAGE'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										aHTML.push('<tr><td>Product Group removed from ' + sContactBusinessText + ' (' + oThisRow['agrisubscription.membership.code'] + '): ' + oParam.duplicateProductGroups[0].productcategorytext + '</td></tr>');
										$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
									}
									else
									{
										aHTML.push('<tr><td>Error removing product group from ' + sContactBusinessText + ' (' + oThisRow['agrisubscription.membership.code'] + '): ' + oParam.duplicateProductGroups[0].productcategorytext + 
													'<br/>' + oResponse.error.errornotes +'</td></tr>');
										$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
									}
									oParam.duplicateProductGroups.shift();
									nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.update(oParam);
								}
							});
						}
						else
						{
							aHTML.push('<tr><td>Product Group to be removed from ' + sContactBusinessText + ' (' + oThisRow['agrisubscription.membership.code'] + '): ' + oParam.duplicateProductGroups[0].productcategorytext + '</td></tr>');
							$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							oParam.duplicateProductGroups.shift();
							nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.update(oParam);
						}
					}
					else
					{
						delete(oParam.duplicateProductGroups);
						oParam.dataIndex = iDataIndex + 1;
						oParam.removeProductGroupStep = 1;
						nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.update(oParam);
					}
				}

			}
			else
			{
				oParam.startRow = oParam.startRow + 500;
				nsFreshcare.setup.bulkupdate.removeDuplicateProductGroups.search(oParam);
			}
		}
	},

	updateGrowerDetails: 
	{
		/* SUP021403 - Bulk update to set Country on all sites to Australia and make format of Harvest Months consistent across the board */
		setParams: function(oParam)
		{

			if (oParam === undefined) {oParam = {}}

			oParam.xhtmlContext = 'GrowerDetails';
			oParam.title = 'Update Harvest Months & Site Country';
			oParam.description = 'Fix Harvest Month format and set Site Country to Australia.';
			oParam.search = {};
			oParam.search.method = 'AGRI_SUBSCRIPTION_SEARCH';
			oParam.search.fields = 'contactbusinesstext,contactbusiness,agrisubscription.membership.code,harvestmonth';
			oParam.search.filters = [];
			oParam.search.sortFields = [];
			oParam.search.sortFields.push({field: 'contactbusinesstext', direction: 'asc'});
			oParam.functionUpdate = nsFreshcare.setup.bulkupdate.updateGrowerDetails.update;

			return oParam;
		},

		update: function(oParam)
		{
			var oData;
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = false;
			var iDataIndex = -1;
			var sXHTMLContext;
			var fFunctionUpdate;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex != undefined) {iDataIndex = oParam.dataIndex}
				if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.functionUpdate) {fFunctionUpdate = oParam.functionUpdate}
			}

			if (nsFreshcare.setup.bulkupdate.data.userContinue === 0)
			{	// User has pressed Pause - save all values in oParam to nsFreshcare.setup.bulkupdate.data.continueParam
				nsFreshcare.setup.bulkupdate.data.continueParam = oParam;
			}
			else
			{

				if (iDataIndex === -1 && oData.length > 0)
				{
					if (oParam.startRow === 1)
					{	$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');	}
					nsFreshcare.setup.bulkupdate.data.updateSubscriptionData = oData;
					iDataIndex = 0;
					oParam.dataIndex = 0;
					oParam.updateGrowerDetailsStep = 1;
					oParam.businessUpdated = false;
				}
				else if (oData.length === 0)
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('No growers found');
				}

				if (iTotal > 500)		// We only show the progess count if we have over 500 records
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress').html(iDataIndex + oParam.startRow);
				}


				if (iDataIndex < nsFreshcare.setup.bulkupdate.data.updateSubscriptionData.length)
				{
					var oThisRow = nsFreshcare.setup.bulkupdate.data.updateSubscriptionData[iDataIndex];
					var sContactBusinessText = oThisRow['contactbusinesstext'].formatXHTML();
					var sData = '';

					// Determine if Harvest Months is in correct format
					if (oParam.updateGrowerDetailsStep === 1)
					{
						oParam.businessUpdated = (iDataIndex > 0 && nsFreshcare.setup.bulkupdate.data.updateSubscriptionData[iDataIndex - 1].contactbusiness != oThisRow.contactbusiness)
												 ? false
												 : oParam.businessUpdated;

						iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
						$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar')
							.progressbar({value: iPercentage});

						var sOldHarvestMonths = oThisRow.harvestmonth;
						var sNewHarvestMonths = (sOldHarvestMonths != '')
												? nsFreshcare.trainer.grower.membership.harvestMonths.formatValues({values: sOldHarvestMonths}).join(',')
												: '';
						sNewHarvestMonths = $.map(sNewHarvestMonths.split(','),
												 function(x)
												 {
													var sReturn = '';
												 	if (nsFreshcare.util.isNumeric({value: x}) && Number(x) > 0 && Number(x) < 13)
												 	{ 	sReturn = nsFreshcare.data.months[Number(x) - 1].text}
												 	return sReturn;
												 }).join(',');
						sNewHarvestMonths = (sNewHarvestMonths.indexOf(',,') > -1)
											? sOldHarvestMonths
											: sNewHarvestMonths;

						if (sOldHarvestMonths != sNewHarvestMonths)
						{
							var sData = 'id=' + oThisRow.id + '&harvestmonths=' + ns1blankspace.util.fs(sNewHarvestMonths);
							if (!oParam.businessUpdated)
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + '</td></tr>');
								oParam.businessUpdated = true;
							}

							if (bPerformUpdate)
							{
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
									data: sData,
									rf: 'JSON',
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oThisRow['agrisubscription.membership.code'] + ': Harvest Months ' + 
															sOldHarvestMonths + ' --> ' + sNewHarvestMonths + '</td></tr>');
										}
										else
										{
											aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oThisRow['agrisubscription.membership.code'] + ': Harvest Months error ' + ' ' + sNewHarvestMonths + 
														'<br/>' + oResponse.error.errornotes +'</td></tr>');
										}
										$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
										
										// Check if this is the second or subsequent subscription for the current business, if so, go to the next record
										if (iDataIndex > 0 
											&& nsFreshcare.setup.bulkupdate.data.updateSubscriptionData[iDataIndex - 1].contactbusiness === oThisRow.contactbusiness)
										{
											oParam.updateGrowerDetailsStep = 1;
											oParam.dataIndex = iDataIndex + 1;
										}
										else
										{
											oParam.updateGrowerDetailsStep = 2;	
										}
										fFunctionUpdate(oParam);
									}
								});
							}
							else
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oThisRow['agrisubscription.membership.code'] + ': TEST Harvest Months ' + 
												sOldHarvestMonths + ' --> ' + sNewHarvestMonths + '</td></tr>');
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								// Check if this is the second or subsequent subscription for the current business, if so, go to the next record
								if (iDataIndex > 0 
									&& nsFreshcare.setup.bulkupdate.data.updateSubscriptionData[iDataIndex - 1].contactbusiness === oThisRow.contactbusiness)
								{
									oParam.updateGrowerDetailsStep = 1;
									oParam.dataIndex = iDataIndex + 1;
								}
								else
								{
									oParam.updateGrowerDetailsStep = 2;	
								}
								fFunctionUpdate(oParam);
							}
						}
						else
						{
							// Check if this is the second or subsequent subscription for the current business, if so, go to the next record
							if (iDataIndex > 0 
								&& nsFreshcare.setup.bulkupdate.data.updateSubscriptionData[iDataIndex - 1].contactbusiness === oThisRow.contactbusiness)
							{
								oParam.updateGrowerDetailsStep = 1;
								oParam.dataIndex = iDataIndex + 1;
							}
							else
							{
								oParam.updateGrowerDetailsStep = 2;	
							}
							fFunctionUpdate(oParam);
						}
					}

					// Search for site addresses that have no country
					else if (oParam.updateGrowerDetailsStep === 2)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
						oSearch.addField('addresssuburb,addresscountry');
						oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
						oSearch.addFilter('address.addresslink.objectcontext', 'EQUAL_TO', oThisRow.contactbusiness);
						oSearch.addFilter('addresscountry', 'IS_NULL');
						oSearch.getResults(function(oResponse)
						{
							var aAddressNoCountry = [];
							if (oResponse.status === 'OK')
							{
								aAddressNoCountry = oResponse.data.rows;
							}
							else
							{
								if (!oParam.businessUpdated)
								{
									aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + '</td></tr>');
									oParam.businessUpdated = true;
								}
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oThisRow['agrisubscription.membership.code'] + ': Sites Search Error ' + 
											'<br/>' + oResponse.error.errornotes +'</td></tr>');
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							}

							if (aAddressNoCountry.length > 0)
							{
								oParam.updateGrowerDetailsStep = 3;
								oParam.addressNoCountry = aAddressNoCountry;
							}
							else
							{
								oParam.dataIndex += 1;
								oParam.updateGrowerDetailsStep = 1;
							}
							fFunctionUpdate(oParam);
						});
					}

					// Update the address country on site and contactbusiness records
					else if (oParam.updateGrowerDetailsStep === 3)
					{

						if (oParam.addressNoCountry.length > 0)
						{
							if (!oParam.businessUpdated)
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + '</td></tr>');
								oParam.businessUpdated = true;
							}

							sData += 'id=' + oParam.addressNoCountry[0].id + '&addresscountry=Australia';
							if (bPerformUpdate)
							{
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('CORE_ADDRESS_LOCATION_MANAGE'),
									data: sData,
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
												data: 'id=' + oThisRow.contactbusiness + '&streetcountry=Australia',
												success: function(oResponse)
												{
													if (oResponse.status === 'OK')
													{
														aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oParam.addressNoCountry[0].addresssuburb + ': Site updated </td></tr>');
													}
													else
													{
														aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oParam.addressNoCountry[0].addresssuburb + ': ContactBusiness update error' + 
																	'<br/>' + oResponse.error.errornotes +'</td></tr>');
													}
													$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
													oParam.addressNoCountry.shift();
													fFunctionUpdate(oParam);
												}
											})
										}
										else
										{
											aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oParam.addressNoCountry[0].addresssuburb + ': Site update error' + 
														'<br/>' + oResponse.error.errornotes +'</td></tr>');
											$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
											oParam.addressNoCountry.shift();
											fFunctionUpdate(oParam);
										}
									}
								});
							}
							else
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + oParam.addressNoCountry[0].addresssuburb + ': TEST Site updated </td></tr>');
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								oParam.addressNoCountry.shift();
								fFunctionUpdate(oParam);
							}
						}
						else
						{
							delete(oParam.addressNoCountry);
							oParam.dataIndex = iDataIndex + 1;
							oParam.updateGrowerDetailsStep = 1;
							fFunctionUpdate(oParam);
						}
					}

				}
				else
				{
					oParam.startRow = oParam.startRow + 500;
					nsFreshcare.setup.bulkupdate.search(oParam);
				}
			}
		}
	},

	updateCertificateSentDate: 
	{
		/* SUP021406 - update new field agricertificate.sentdate to agricertificate.dateissued			
		*/
		setParams: function(oParam)
		{

			if (oParam === undefined) {oParam = {}}

			oParam.xhtmlContext = 'CertificateSentDate';
			oParam.title = 'Update Certificate Sent Date';
			oParam.description = 'Set Certificate Sent Date to same as Issued Date';
			oParam.search = {};
			oParam.search.method = 'AGRI_CERTIFICATE_SEARCH';
			oParam.search.fields = 'agricertificate.subscription.contactbusinesstext,agricertificate.subscription.membership.code,dateissued,sentdate';
			oParam.search.filters = [];
			oParam.search.filters.push({field: 'dateissued', comparison: 'IS_NOT_NULL'});
			oParam.search.sortFields = [];
			oParam.search.sortFields.push({field: 'agricertificate.subscription.contactbusinesstext', direction: 'asc'});
			oParam.functionUpdate = nsFreshcare.setup.bulkupdate.updateCertificateSentDate.update;

			return oParam;
		},

		update: function(oParam)
		{
			var oData;
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;
			var sXHTMLContext;
			var fFunctionUpdate;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex != undefined) {iDataIndex = oParam.dataIndex}
				if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.functionUpdate) {fFunctionUpdate = oParam.functionUpdate}
			}

			if (nsFreshcare.setup.bulkupdate.data.userContinue === 0)
			{	// User has pressed Pause - save all values in oParam to nsFreshcare.setup.bulkupdate.data.continueParam
				nsFreshcare.setup.bulkupdate.data.continueParam = oParam;
			}
			else
			{

				if (iDataIndex === -1 && oData.length > 0)
				{
					if (oParam.startRow === 1)
					{	$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');	}
					nsFreshcare.setup.bulkupdate.data.certificateData = oData;
					iDataIndex = 0;
					oParam.dataIndex = 0;
					oParam.updateCertificateSentDateStep = 1;
				}
				else if (oData.length === 0)
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('No growers found');
				}

				if (iTotal > 500)		// We only show the progess count if we have over 500 records
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress').html(iDataIndex + oParam.startRow);
				}


				if (iDataIndex < nsFreshcare.setup.bulkupdate.data.certificateData.length)
				{
					var oThisRow = nsFreshcare.setup.bulkupdate.data.certificateData[iDataIndex];
					var sContactBusinessText = oThisRow['agricertificate.subscription.contactbusinesstext'].formatXHTML();
					var sData = '';

					// Update date issued
					iPercentage = Math.round(((iDataIndex + oParam.startRow) / iTotal) * 100, 0);
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar')
						.progressbar({value: iPercentage});

					sData = 'id=' + oThisRow.id +
							'&sentdate=' + ns1blankspace.util.fs(oThisRow.dateissued);

					if (bPerformUpdate)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
							data: sData,
							rf: 'JSON',
							success: function(oResponse)
							{
								oParam.dataIndex = iDataIndex + 1;
								if (oResponse.status === 'OK')
								{
									aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + ' - ' + oThisRow['agricertificate.subscription.membership.code'] + '</td></tr>');
								}
								else
								{
									aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + ' - ' + oThisRow['agrisubscription.membership.code'] + 
												'<br/>' + oResponse.error.errornotes +'</td></tr>');
								}
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
								
								fFunctionUpdate(oParam);
							}
						});
					}
					else
					{
						aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + ' - ' + oThisRow['agricertificate.subscription.membership.code'] + '</td></tr>');
						$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
						oParam.dataIndex = iDataIndex + 1;
						fFunctionUpdate(oParam);
					}
				}
				else
				{
					oParam.startRow = oParam.startRow + 500;
					nsFreshcare.setup.bulkupdate.search(oParam);
				}
			}
		}
	},

	updateParentBusinessRelationships:
	{
		/* Parent Business relationships had incorrect Relationship Type and all need start date (join date of grower) */
		setParams: function(oParam)
		{
			if (oParam === undefined) {oParam = {}}

			oParam.xhtmlContext = 'ParentBusinessRelationship';
			oParam.title = 'Update Parent Business Relationships';
			oParam.description = 'Set Parent Business Relationship Type to correct value and update start date to join date of Egg Farmer';
			oParam.search = {};
			oParam.search.method = 'CONTACT_RELATIONSHIP_SEARCH';
			oParam.search.fields = 'relationship.contactbusinesstext,relationship.contactbusiness,relationship.othercontactbusinesstext,relationship.othercontactbusiness,' +
									'relationship.typetext,relationship.type,relationship.startdate,relationship.othercontactbusiness.agribusiness.joindate';
			oParam.search.filters = [{field: 'relationship.type', comparison: 'IN_LIST', value1: '3345,4081'}];
			oParam.search.sortFields = [{field: 'relationship.contactbusinesstext', direction: 'asc'}];
			oParam.functionUpdate = nsFreshcare.setup.bulkupdate.updateParentBusinessRelationships.update;

			return oParam;		
		},

		update: function(oParam)
		{
			var oData;
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;
			var sXHTMLContext;
			var fFunctionUpdate;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex != undefined) {iDataIndex = oParam.dataIndex}
				if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.functionUpdate) {fFunctionUpdate = oParam.functionUpdate}
			}

			if (nsFreshcare.setup.bulkupdate.data.userContinue === 0)
			{	// User has pressed Pause - save all values in oParam to nsFreshcare.setup.bulkupdate.data.continueParam
				nsFreshcare.setup.bulkupdate.data.continueParam = oParam;
			}
			else
			{
				if (iDataIndex === -1 && oData.length > 0)
				{
					if (oParam.startRow === 1)
					{	$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');	}
					nsFreshcare.setup.bulkupdate.data.parentBusinessData = oData;
					iDataIndex = 0;
					oParam.dataIndex = 0;
					oParam.updateCertificateSentDateStep = 1;
				}
				else if (oData.length === 0)
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('No growers found');
				}

				if (iTotal > 500)		// We only show the progess count if we have over 500 records
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress').html(iDataIndex + oParam.startRow);
				}


				if (iDataIndex < nsFreshcare.setup.bulkupdate.data.parentBusinessData.length)
				{
					var oThisRow = nsFreshcare.setup.bulkupdate.data.parentBusinessData[iDataIndex];
					var sContactBusinessText = oThisRow['relationship.othercontactbusinesstext'].formatXHTML();
					var sData = '';

					sData = 'id=' + oThisRow.id +
							/*'&type=4801' +*/
							'&startdate=' + oThisRow['relationship.othercontactbusiness.agribusiness.joindate'];
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
						data: sData,
						success: function(oResponse)
						{
							oParam.dataIndex = iDataIndex + 1;
							if (oResponse.status === 'OK')
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + ' - ' + oThisRow['relationship.othercontactbusiness.agribusiness.joindate'] + '</td></tr>');
							}
							else
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + 
											'<br/>' + oResponse.error.errornotes +'</td></tr>');
							}
							$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							
							fFunctionUpdate(oParam);
						}
					});
				}
			}
		}
	},

	updateECACertificateType:
	{
		/* Added certificateTypes for Packing & Production so must retro-populate from certifcateType */
		setParams: function(oParam)
		{
			if (oParam === undefined) {oParam = {}}

			oParam.xhtmlContext = 'ECACertificateTypes';
			oParam.title = 'Update ECA Certificate Types';
			oParam.description = 'Set Certificate Type for Packing & Production scopes';
			oParam.search = {};
			oParam.search.method = 'AGRI_CERTIFICATE_SEARCH';
			oParam.search.fields = 'agricertificate.subscription.contactbusinesstext,agricertificate.subscription' +
									',agricertificate.se13382,agricertificate.se13454,agricertificate.se13455';
			oParam.search.sortFields = [{field: 'agricertificate.subscription.contactbusinesstext', direction: 'asc'}];
			oParam.functionUpdate = nsFreshcare.setup.bulkupdate.updateECACertificateType.update;

			return oParam;		
		},

		update: function(oParam)
		{
			var oData;
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;
			var sXHTMLContext;
			var fFunctionUpdate;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex != undefined) {iDataIndex = oParam.dataIndex}
				if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.functionUpdate) {fFunctionUpdate = oParam.functionUpdate}
			}

			if (nsFreshcare.setup.bulkupdate.data.userContinue === 0)
			{	// User has pressed Pause - save all values in oParam to nsFreshcare.setup.bulkupdate.data.continueParam
				nsFreshcare.setup.bulkupdate.data.continueParam = oParam;
			}
			else
			{
				if (iDataIndex === -1 && oData.length > 0)
				{
					if (oParam.startRow === 1)
					{	$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');	}
					nsFreshcare.setup.bulkupdate.data.ecaCertificateType = oData;
					iDataIndex = 0;
					oParam.dataIndex = 0;
					oParam.updateECACertificateType = 1;
				}
				else if (oData.length === 0)
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('No egg farmers found');
				}

				if (iTotal > 500)		// We only show the progess count if we have over 500 records
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress').html(iDataIndex + oParam.startRow);
				}


				if (iDataIndex < nsFreshcare.setup.bulkupdate.data.ecaCertificateType.length)
				{
					var oThisRow = nsFreshcare.setup.bulkupdate.data.ecaCertificateType[iDataIndex];
					var sContactBusinessText = oThisRow['agricertificate.subscription.contactbusinesstext'].formatXHTML();
					var sData = '';

					// First Get scopes - only update relevant Certificate Type for the scopes that exist
					if (oParam.updateECACertificateType == 1)
					{
						delete(oParam.hasPackingScope);
						delete(oParam.hasProductionScope);

						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
						oSearch.addField('scope,scopetext');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', oThisRow['agricertificate.subscription']);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								oParam.hasPackingScope = ($.grep(oResponse.data.rows, function(x) {return x.scopetext.indexOf('Packing') > -1}).length > 0);
								oParam.hasProductionScope = ($.grep(oResponse.data.rows, function(x) 
											{return x.scopetext.indexOf('Production') > -1 || x.scopetext.indexOf('Rearing') > -1}).length > 0);

								oParam.updateECACertificateType = 2;
								fFunctionUpdate(oParam);
							}
						});
					}

					else if (oParam.updateECACertificateType == 2)
					{
						sData = 'id=' + oThisRow.id + 
								(oParam.hasPackingScope ? '&se13454=' + oThisRow['agricertificate.se13382'] : '') + 
								(oParam.hasProductionScope ? '&se13455=' + oThisRow['agricertificate.se13382'] : '');

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
							data: sData,
							success: function(oResponse)
							{
								oParam.dataIndex = iDataIndex + 1;
								if (oResponse.status === 'OK')
								{
									aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + ' - '  + 
										(oParam.hasPackingScope ? 'Packing ': '') + 
										(oParam.hasProductionScope ? 'Production ' : '') +
										'</td></tr>');
								}
								else
								{
									aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sContactBusinessText + 
												'<br/>' + oResponse.error.errornotes +'</td></tr>');
								}
								$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));

								oParam.updateECACertificateType = 1;
								
								fFunctionUpdate(oParam);
							}
						});
					}
				}
			}
		}
	},

	restoreAttendingTrainees:
	{
		/* Deleted Attending Trainees in error - restore from search results */
		setParams: function(oParam)
		{
			if (oParam === undefined) {oParam = {}}

			oParam.xhtmlContext = 'restoreTrainees';
			oParam.title = 'Restore Attending Trainees';
			oParam.description = 'Restore Attending Trainee from search results';
			oParam.data = nsFreshcare.setup.bulkupdate.restoreAttendingTrainees.data,
			oParam.functionUpdate = nsFreshcare.setup.bulkupdate.restoreAttendingTrainees.update;

			return oParam;		
		},

		data: 
		[
			/*{data: "course=2994&traineecontactbusiness=1363963&traineecontactperson=1000639044&attendingtrainee=Jennifer Honnery&firstname=Jennifer&surname=Honnery&paymentstatus=2&status=2"},*/
			{data: "course=2977&traineecontactbusiness=1363888&traineecontactperson=1000638952&attendingtrainee=Jodi Johnston&firstname=Jodi&surname=Johnston&paymentstatus=2&status=2"},
			{data: "course=2977&traineecontactbusiness=1363887&traineecontactperson=1000638951&attendingtrainee=Troy Della Franca&firstname=Troy&surname=Della Franc&paymentstatus=2&status=2"},
			{data: "course=2977&traineecontactbusiness=1363886&traineecontactperson=1000638949&attendingtrainee=Justin Omodei&firstname=Justin&surname=Omodei&paymentstatus=2&status=2"},
			{data: "course=2977&traineecontactbusiness=1363885&traineecontactperson=1000638948&attendingtrainee=John Higgins&firstname=John&surname=Higgins&paymentstatus=2&status=2"},
			{data: "course=2992&traineecontactbusiness=1363597&traineecontactperson=1000638654&attendingtrainee=Hasim Talukder&firstname=Hasim&surname=Talukder&paymentstatus=2&status=2"},
			{data: "course=2992&traineecontactbusiness=1363596&traineecontactperson=1000638653&attendingtrainee=Jenna Keller&firstname=Jenna&surname=Keller&paymentstatus=2&status=2"},
			{data: "course=2992&traineecontactbusiness=1363595&traineecontactperson=1000638652&attendingtrainee=Thi Vo&firstname=Thi&surname=Vo&paymentstatus=2&status=2"},
			{data: "course=2992&traineecontactbusiness=1363594&traineecontactperson=1000638648&attendingtrainee=Grace Nicol&firstname=Grace&surname=Nicol&paymentstatus=2&status=2"},
			{data: "course=2919&traineecontactbusiness=1363577&traineecontactperson=1000638619&attendingtrainee=Minh Nguyen&firstname=Minh&surname=Nguyen&paymentstatus=2&status=2"},
			{data: "course=2920&traineecontactbusiness=1363575&traineecontactperson=1000638616&attendingtrainee=Nguyen Minh Sang&firstname=&surname=&paymentstatus=2&status=2"},
			{data: "course=2975&traineecontactbusiness=1363513&traineecontactperson=1000638561&attendingtrainee=Parvinder Grewal&firstname=Parvinder&surname=Grewal&paymentstatus=2&status=2"},
			{data: "course=2975&traineecontactbusiness=1363510&traineecontactperson=1000638558&attendingtrainee=Jason Torenbeek&firstname=Jason&surname=Torenbeek&paymentstatus=2&status=2"},
			{data: "course=2975&traineecontactbusiness=1363509&traineecontactperson=1000638557&attendingtrainee=Daniel McLaughlin&firstname=Daniel&surname=McLaughlin&paymentstatus=2&status=2"},
			{data: "course=2975&traineecontactbusiness=1363507&traineecontactperson=1000638555&attendingtrainee=Harminder Singh&firstname=Harminder&surname=Singh&paymentstatus=2&status=2"},
			{data: "course=2975&traineecontactbusiness=1363506&traineecontactperson=1000638553&attendingtrainee=Vijayinder Singh&firstname=Vijayinder&surname=Singh&paymentstatus=2&status=2"},
			{data: "course=2975&traineecontactbusiness=1363505&traineecontactperson=1000638552&attendingtrainee=Ron Singh&firstname=Ron&surname=Singh&paymentstatus=2&status=2"},
			{data: "course=2949&traineecontactbusiness=1363416&traineecontactperson=1000638409&attendingtrainee=Donna Potter&firstname=Donna&surname=Potter&paymentstatus=2&status=2"},
			/*{data: "course=2941&traineecontactbusiness=1363368&traineecontactperson=1000638358&attendingtrainee=Jim Moye&firstname=Jim&surname=Moye&paymentstatus=2&status=2"},*/
			{data: "course=2937&traineecontactbusiness=1363352&traineecontactperson=1000638343&attendingtrainee=Kylie Carr&firstname=Kylie&surname=Carr&paymentstatus=2&status=2"},
			{data: "course=2913&traineecontactbusiness=1363351&traineecontactperson=1000638338&attendingtrainee=Alexander Russell&firstname=Alexander&surname=Russell&paymentstatus=2&status=2"},
			{data: "course=2954&traineecontactbusiness=1361692&traineecontactperson=1000636491&attendingtrainee=Timothy Morrisby&firstname=Timothy&surname=Morrisby&paymentstatus=2&status=2"},
			{data: "course=2924&traineecontactbusiness=1360849&traineecontactperson=1000635137&attendingtrainee=John Reeve&firstname=John&surname=Reeve&paymentstatus=2&status=2"},
			{data: "course=2923&traineecontactbusiness=1360843&traineecontactperson=1000635127&attendingtrainee=Vicheth Chau&firstname=Vicheth&surname=Chau&paymentstatus=2&status=2"},
			{data: "course=668&traineecontactbusiness=1258624&traineecontactperson=1000423985&attendingtrainee=Darrell Tinworth&firstname=Darrell&surname=Tinworth&paymentstatus=2&status=2"},
			{data: "course=2896&traineecontactbusiness=1165994&traineecontactperson=1000228755&attendingtrainee=Julie Veivers&firstname=Julie&surname=Veivers&paymentstatus=2&status=2"},
			{data: "course=1452&traineecontactbusiness=1360214&traineecontactperson=1000633282&attendingtrainee=Rudi Bartels&firstname=Rudi&surname=Bartels&paymentstatus=2&status=2"},
			{data: "course=2132&traineecontactbusiness=1238929&traineecontactperson=1000374279&attendingtrainee=Matthew Lauder&firstname=Matthew&surname=Lauder&paymentstatus=2&status=2"},
			{data: "course=2910&traineecontactbusiness=1358118&traineecontactperson=1000630898&attendingtrainee=Iolanda Totino&firstname=Iolanda&surname=Totino&paymentstatus=2&status=2"},
			{data: "course=2890&traineecontactbusiness=1358981&traineecontactperson=1000631380&attendingtrainee=James Burnett&firstname=James&surname=Burnett&paymentstatus=2&status=2"},
			{data: "course=2883&traineecontactbusiness=1359360&traineecontactperson=1000631952&attendingtrainee=Adrienne  Stevens&firstname=Adrienne &surname=Stevens&paymentstatus=2&status=2"},
			{data: "course=2887&traineecontactbusiness=1024265&traineecontactperson=1000066149&attendingtrainee=David Crossley&firstname=David&surname=Crossley&paymentstatus=2&status=2"},
			{data: "course=2886&traineecontactbusiness=1359278&traineecontactperson=1000631868&attendingtrainee=Sarah Williams&firstname=Sarah&surname=Williams&paymentstatus=2&status=2"},
			{data: "course=2881&traineecontactbusiness=1359266&traineecontactperson=1000631850&attendingtrainee=Joshua Galati &firstname=Joshua&surname=Galati &paymentstatus=2&status=2"},
			{data: "course=2883&traineecontactbusiness=1173574&traineecontactperson=1000253102&attendingtrainee=Emma Sippel&firstname=Emma&surname=Sippel&paymentstatus=2&status=2"},
			{data: "course=1681&traineecontactbusiness=1238389&traineecontactperson=1000365350&attendingtrainee=Mark Gilbert&firstname=Mark&surname=Gilbert&paymentstatus=2&status=2"},
			{data: "course=2878&traineecontactbusiness=1358717&traineecontactperson=1000631229&attendingtrainee=Luke Vanleer&firstname=Luke&surname=Vanleer&paymentstatus=2&status=2"},
			{data: "course=2878&traineecontactbusiness=1358717&traineecontactperson=1000631229&attendingtrainee=Christie Young&firstname=Christie&surname=Young&paymentstatus=2&status=2"},
			{data: "course=2861&traineecontactbusiness=1357816&traineecontactperson=1000630569&attendingtrainee=Jaswinder Singh&firstname=Jaswinder&surname=Singh&paymentstatus=2&status=2"},
			{data: "course=2859&traineecontactbusiness=1357791&traineecontactperson=1000630516&attendingtrainee=Jason Coolen&firstname=Jason&surname=Coolen&paymentstatus=2&status=2"},
			{data: "course=2852&traineecontactbusiness=1357486&traineecontactperson=1000628292&attendingtrainee=Isabelle Cox&firstname=Isabelle&surname=Cox&paymentstatus=2&status=2"},
			{data: "course=2851&traineecontactbusiness=1357454&traineecontactperson=1000628272&attendingtrainee=Karen Goldberg&firstname=Karen&surname=&paymentstatus=2&status=2"},
			{data: "course=2850&traineecontactbusiness=1135978&traineecontactperson=1000208036&attendingtrainee=Sandra  Knowles &firstname=Sandra&surname=KnowlesGoldberg&paymentstatus=2&status=2"},
			{data: "course=2253&traineecontactbusiness=1357287&traineecontactperson=1000627996&attendingtrainee=Robbie Wolton&firstname=Robbie&surname=Wolton&paymentstatus=2&status=2"},
			{data: "course=1204&traineecontactbusiness=1357167&traineecontactperson=1000627779&attendingtrainee=Etienne Theart&firstname=Etienne&surname=Theart&paymentstatus=2&status=2"},
			{data: "course=2844&traineecontactbusiness=1351719&traineecontactperson=1000627622&attendingtrainee=Kim Kirkwood&firstname=Kim&surname=Kirkwood&paymentstatus=2&status=2"},
			{data: "course=2836&traineecontactbusiness=1351714&traineecontactperson=1000627616&attendingtrainee=Paul Kelly&firstname=Paul&surname=Kelly&paymentstatus=2&status=2"},
			{data: "course=897&traineecontactbusiness=1245688&traineecontactperson=1000400476&attendingtrainee=Justin Jarrett&firstname=Justin & Pip&surname=Jarrett&paymentstatus=2&status=2"},
			{data: "course=2840&traineecontactbusiness=1231879&traineecontactperson=1000353061&attendingtrainee=Ashley Steven Wood&firstname=Ashley&surname=Steven Wood&paymentstatus=2&status=2"},
			{data: "course=2840&traineecontactbusiness=1231879&traineecontactperson=1000353061&attendingtrainee=Jon Bredenkamp&firstname=Jon&surname=Bredenkamp&paymentstatus=2&status=2"},
			{data: "course=2839&traineecontactbusiness=1351512&traineecontactperson=1000627295&attendingtrainee=Ryan Shadbolt&firstname=Ryan&surname=Shadbolt&paymentstatus=2&status=2"},
			{data: "course=2839&traineecontactbusiness=1351512&traineecontactperson=1000627295&attendingtrainee=Jake Shadbolt&firstname=Jake&surname=Shadbolt&paymentstatus=2&status=2"},
			{data: "course=2151&traineecontactbusiness=1315889&traineecontactperson=1000557153&attendingtrainee=Anthony Kraljevich&firstname=Anthony&surname=Kraljevich&paymentstatus=2&status=2"},
			{data: "course=2831&traineecontactbusiness=1334024&traineecontactperson=1000602481&attendingtrainee=Rebecca Fox&firstname=Rebecca&surname=Fox&paymentstatus=2&status=2"},
			{data: "course=2833&traineecontactbusiness=1025533&traineecontactperson=1000067420&attendingtrainee=Sarbjeet Singh&firstname=Sarbjeet&surname=Singh&paymentstatus=2&status=2"},
			{data: "course=2828&traineecontactbusiness=1025257&traineecontactperson=1000067142&attendingtrainee=Lien Do&firstname=Lien&surname=Do&paymentstatus=2&status=2"},
			{data: "course=2828&traineecontactbusiness=1244766&traineecontactperson=1000394260&attendingtrainee=Bradley Toy&firstname=Bradley&surname=Toy&paymentstatus=2&status=2"},
			{data: "course=2363&traineecontactbusiness=1121935&traineecontactperson=1000185942&attendingtrainee=Kevin Cibav&firstname=Kevin&surname=Cibav&paymentstatus=2&status=2"},
			{data: "course=635&traineecontactbusiness=1025643&traineecontactperson=1000067529&attendingtrainee=Rosemarie Wiltshire&firstname=Rosemarie&surname=Wiltshire&paymentstatus=2&status=2"},
			{data: "course=656&traineecontactbusiness=1024516&traineecontactperson=1000066400&attendingtrainee=Marian Bailey&firstname=Marian&surname=Bailey&paymentstatus=2&status=2"},
			{data: "course=550&traineecontactbusiness=1241317&traineecontactperson=1000386832&attendingtrainee=Desiree Marie &firstname=Desiree&surname=Marie&paymentstatus=2&status=2"},
			{data: "course=632&traineecontactbusiness=1023987&traineecontactperson=1000065869&attendingtrainee=Karen Osborne&firstname=Karen&surname=Osborne&paymentstatus=2&status=2"},
			{data: "course=692&traineecontactbusiness=1083214&traineecontactperson=1000128404&attendingtrainee=Dorianna Mangili&firstname=Dorianna&surname=Mangili&paymentstatus=2&status=2"},
			{data: "course=750&traineecontactbusiness=1351167&traineecontactperson=1000626473&attendingtrainee=Andrew Greensill&firstname=Andrew&surname=Greensill&paymentstatus=2&status=2"},
			{data: "course=2830&traineecontactbusiness=1233322&traineecontactperson=1000355484&attendingtrainee=Rob Glastonbury&firstname=Rob&surname=Glastonbury&paymentstatus=2&status=2"},
			{data: "course=534&traineecontactbusiness=1228606&traineecontactperson=1000346933&attendingtrainee=Michael Starkie&firstname=Michael&surname=Starkie&paymentstatus=2&status=2"},
			{data: "course=534&traineecontactbusiness=1228399&traineecontactperson=1000346516&attendingtrainee=Judi Eardley-Wilmot&firstname=Judi&surname=Eardley-Wilmot&paymentstatus=2&status=2"},
			{data: "course=607&traineecontactbusiness=1237270&traineecontactperson=1000363085&attendingtrainee=Lois Doeven&firstname=Lois&surname=Doeven&paymentstatus=2&status=2"},
			{data: "course=617&traineecontactbusiness=1235364&traineecontactperson=1000358821&attendingtrainee=Michael Bayles&firstname=Michael&surname=Bayles&paymentstatus=2&status=2"},
			{data: "course=616&traineecontactbusiness=1233187&traineecontactperson=1000355334&attendingtrainee=Mandy House&firstname=Mandy&surname=House&paymentstatus=2&status=2"},
			{data: "course=660&traineecontactbusiness=1234805&traineecontactperson=1000357936&attendingtrainee=Iole De Lisio&firstname=Iole&surname=De Lisio&paymentstatus=2&status=2"},
			{data: "course=625&traineecontactbusiness=1233235&traineecontactperson=1000355393&attendingtrainee=Dale Wenzel&firstname=Dale&surname=Wenzel&paymentstatus=2&status=2"},
			{data: "course=621&traineecontactbusiness=1115233&traineecontactperson=1000174966&attendingtrainee=Heather Gasparini&firstname=Heather&surname=Gasparini&paymentstatus=2&status=2"},
			{data: "course=762&traineecontactbusiness=1022743&traineecontactperson=1000064661&attendingtrainee=Karen Pershouse&firstname=Karen&surname=Pershouse&paymentstatus=2&status=2"},
			{data: "course=762&traineecontactbusiness=1024227&traineecontactperson=1000066110&attendingtrainee=Peter Sherriff&firstname=Peter&surname=Sherriff&paymentstatus=2&status=2"},
			{data: "course=762&traineecontactbusiness=1021956&traineecontactperson=1000067850&attendingtrainee=Joycelyn Sikes&firstname=Joycelyn&surname=Sikes&paymentstatus=2&status=2"},
			{data: "course=762&traineecontactbusiness=1021722&traineecontactperson=1000064081&attendingtrainee=Sandi Groves&firstname=Sandi&surname=Groves&paymentstatus=2&status=2"},
			{data: "course=770&traineecontactbusiness=1072343&traineecontactperson=1000116449&attendingtrainee=Melita Jurgens&firstname=Melita&surname=Jurgens&paymentstatus=2&status=2"},
			{data: "course=770&traineecontactbusiness=1242645&traineecontactperson=1000390821&attendingtrainee=Melissa Napier&firstname=Melissa&surname=Napier&paymentstatus=2&status=2"},
			{data: "course=770&traineecontactbusiness=1242642&traineecontactperson=1000390815&attendingtrainee=Connie Camilotto&firstname=Connie&surname=Camilotto&paymentstatus=2&status=2"},
			{data: "course=922&traineecontactbusiness=1023218&traineecontactperson=1000065115&attendingtrainee=Bruce Leslight&firstname=Bruce&surname=Leslight&paymentstatus=2&status=2"},
			{data: "course=764&traineecontactbusiness=1022763&traineecontactperson=1000064681&attendingtrainee=Kerry Hickmott&firstname=Kerry&surname=Hickmott&paymentstatus=2&status=2"},
			{data: "course=764&traineecontactbusiness=1021713&traineecontactperson=1000064072&attendingtrainee=Michael James&firstname=Michael&surname=James&paymentstatus=2&status=2"},
			/*{data: "course=763&traineecontactbusiness=1023703&traineecontactperson=1000065587&attendingtrainee=Joseph Visini&firstname=Joseph&surname=Visini&paymentstatus=2&status=2"},*/
			{data: "course=862&traineecontactbusiness=1241552&traineecontactperson=1000387093&attendingtrainee=Anna Lahey&firstname=Anna&surname=Lahey&paymentstatus=2&status=2"},
			{data: "course=836&traineecontactbusiness=1023352&traineecontactperson=1000065246&attendingtrainee=Leeanne Austin&firstname=Leeanne&surname=Austin&paymentstatus=2&status=2"},
			{data: "course=836&traineecontactbusiness=1024141&traineecontactperson=1000066024&attendingtrainee=Mark Pierantozzi&firstname=Mark&surname=Pierantozzi&paymentstatus=2&status=2"},
			{data: "course=836&traineecontactbusiness=1022399&traineecontactperson=1000064441&attendingtrainee=Franca Minchev&firstname=Franca&surname=Minchev&paymentstatus=2&status=2"},
			{data: "course=861&traineecontactbusiness=1023869&traineecontactperson=1000065751&attendingtrainee=Helen Morgan&firstname=Helen&surname=Morgan&paymentstatus=2&status=2"},
			{data: "course=861&traineecontactbusiness=1023878&traineecontactperson=1000065760&attendingtrainee=Megan MacDonald&firstname=Megan&surname=MacDonald&paymentstatus=2&status=2"},
			{data: "course=827&traineecontactbusiness=1024175&traineecontactperson=1000066058&attendingtrainee=Donna Sempf&firstname=Donna&surname=Sempf&paymentstatus=2&status=2"},
			{data: "course=750&traineecontactbusiness=1022746&traineecontactperson=1000064664&attendingtrainee=Peter Sandwell&firstname=Peter&surname=Sandwell&paymentstatus=2&status=2"},
			{data: "course=772&traineecontactbusiness=1024140&traineecontactperson=1000066023&attendingtrainee=Irina Polsoni&firstname=Irina&surname=Polsoni&paymentstatus=2&status=2"},
			{data: "course=552&traineecontactbusiness=1236946&traineecontactperson=1000362003&attendingtrainee=Jennifer Trebbin&firstname=Jennifer&surname=Trebbin&paymentstatus=2&status=2"},
			{data: "course=552&traineecontactbusiness=1235527&traineecontactperson=1000359103&attendingtrainee=Jill Larkin&firstname=Jill&surname=Larkin&paymentstatus=2&status=2"},
			{data: "course=483&traineecontactbusiness=1227445&traineecontactperson=1000345588&attendingtrainee=Sarah Zwynenberg&firstname=Sarah&surname=Zwynenberg&paymentstatus=2&status=2"},
			{data: "course=886&traineecontactbusiness=1101729&traineecontactperson=1000152872&attendingtrainee=Gina Torrisi&firstname=Gina&surname=Torrisi&paymentstatus=2&status=2"},
			{data: "course=1116&traineecontactbusiness=1023076&traineecontactperson=1000064975&attendingtrainee=Chris Fairley&firstname=Chris&surname=Fairley&paymentstatus=2&status=2"},
			{data: "course=1116&traineecontactbusiness=1023340&traineecontactperson=1000065235&attendingtrainee=Trish Sullivan&firstname=Trish&surname=Sullivan&paymentstatus=2&status=2"},
			{data: "course=854&traineecontactbusiness=1024694&traineecontactperson=1000066579&attendingtrainee=Gianninia  Bugno&firstname=Gianninia&surname=Bugno&paymentstatus=2&status=2"},
			{data: "course=1221&traineecontactbusiness=1022413&traineecontactperson=1000064450&attendingtrainee=Natalie Duffield&firstname=Natalie&surname=Duffield&paymentstatus=2&status=2"},
			{data: "course=1221&traineecontactbusiness=1024877&traineecontactperson=1000066762&attendingtrainee=Delmai Rosendahl&firstname=Delmai&surname=Rosendahl&paymentstatus=2&status=2"},
			{data: "course=977&traineecontactbusiness=1021710&traineecontactperson=1000064069&attendingtrainee=Donna Perkins&firstname=Donna&surname=Perkins&paymentstatus=2&status=2"},
			{data: "course=849&traineecontactbusiness=1022735&traineecontactperson=1000064653&attendingtrainee=Corrie Jarred&firstname=Corrie&surname=Jarred&paymentstatus=2&status=2"},
			{data: "course=849&traineecontactbusiness=1024960&traineecontactperson=1000066845&attendingtrainee=Janice Dellaway&firstname=Janice&surname=Dellaway&paymentstatus=2&status=2"},
			{data: "course=767&traineecontactbusiness=1023475&traineecontactperson=1000065363&attendingtrainee=Deanne Krieger&firstname=Deanne&surname=Krieger&paymentstatus=2&status=2"},
			{data: "course=754&traineecontactbusiness=1021648&traineecontactperson=1000064006&attendingtrainee=Alice Ekin&firstname=Alice&surname=Ekin&paymentstatus=2&status=2"},
			{data: "course=754&traineecontactbusiness=1023640&traineecontactperson=1000065525&attendingtrainee=Jen Randell&firstname=Jen&surname=Randell&paymentstatus=2&status=2"},
			{data: "course=756&traineecontactbusiness=1127177&traineecontactperson=1000195147&attendingtrainee=Carrie Grima&firstname=Carrie&surname=Grima&paymentstatus=2&status=2"},
			{data: "course=910&traineecontactbusiness=1025664&traineecontactperson=1000067550&attendingtrainee=David Turnbull&firstname=David&surname=Turnbull&paymentstatus=2&status=2"},
			{data: "course=910&traineecontactbusiness=1022871&traineecontactperson=1000064781&attendingtrainee=Narelle Heather&firstname=Narelle&surname=Heather&paymentstatus=2&status=2"},
			{data: "course=910&traineecontactbusiness=1022881&traineecontactperson=1000064791&attendingtrainee=Leonie Haase&firstname=Leonie&surname=Haase&paymentstatus=2&status=2"},
			{data: "course=982&traineecontactbusiness=1042473&traineecontactperson=1000080823&attendingtrainee=Ernst Tideman&firstname=Ernst&surname=Tideman&paymentstatus=2&status=2"},
			{data: "course=931&traineecontactbusiness=1022832&traineecontactperson=1000064743&attendingtrainee=Rhonda Robba&firstname=Rhonda&surname=Robba&paymentstatus=2&status=2"},
			{data: "course=931&traineecontactbusiness=1245656&traineecontactperson=1000400412&attendingtrainee=Elise Kemp&firstname=Elise&surname=Kemp&paymentstatus=2&status=2"},
			{data: "course=1121&traineecontactbusiness=1024647&traineecontactperson=1000066532&attendingtrainee=Donna Bombaci&firstname=Donna&surname=Bombaci&paymentstatus=2&status=2"},
			{data: "course=921&traineecontactbusiness=1014916&traineecontactperson=1000046916&attendingtrainee=Brenda Perri&firstname=Brenda&surname=Perri&paymentstatus=2&status=2"},
			{data: "course=921&traineecontactbusiness=1014909&traineecontactperson=1000046909&attendingtrainee=Belinda Mustica&firstname=Belinda&surname=Mustica&paymentstatus=2&status=2"},
			{data: "course=916&traineecontactbusiness=1025016&traineecontactperson=1000066901&attendingtrainee=Adrian Fowler&firstname=Adrian&surname=Fowler&paymentstatus=2&status=2"},
			{data: "course=916&traineecontactbusiness=1025016&traineecontactperson=1000066901&attendingtrainee=Sandra Fowler&firstname=Sandra&surname=Fowler&paymentstatus=2&status=2"},
			{data: "course=916&traineecontactbusiness=1023981&traineecontactperson=1000065863&attendingtrainee=Rien Silverstein&firstname=Rien&surname=Silverstein&paymentstatus=2&status=2"},
			{data: "course=916&traineecontactbusiness=1025138&traineecontactperson=1000067023&attendingtrainee=Safet Kutrolli&firstname=Safet&surname=Kutrolli&paymentstatus=2&status=2"},
			{data: "course=915&traineecontactbusiness=1023985&traineecontactperson=1000065867&attendingtrainee=Ginette Yosh&firstname=Ginette&surname=Yosh&paymentstatus=2&status=2"},
			{data: "course=829&traineecontactbusiness=1023008&traineecontactperson=1000064909&attendingtrainee=Graeme Currie&firstname=Graeme&surname=Currie&paymentstatus=2&status=2"},
			{data: "course=787&traineecontactbusiness=1024785&traineecontactperson=1000066670&attendingtrainee=Annie Ross&firstname=Annie&surname=Ross&paymentstatus=2&status=2"},
			{data: "course=706&traineecontactbusiness=1023961&traineecontactperson=1000065843&attendingtrainee=Lynne Sgambelloni&firstname=Lynne&surname=Sgambelloni&paymentstatus=2&status=2"},
			{data: "course=706&traineecontactbusiness=1023966&traineecontactperson=1000065848&attendingtrainee=Jane Casey&firstname=Jane&surname=Casey&paymentstatus=2&status=2"},
			{data: "course=706&traineecontactbusiness=1023957&traineecontactperson=1000065839&attendingtrainee=Helen McIntyre&firstname=Helen&surname=McIntyre&paymentstatus=2&status=2"},
			{data: "course=706&traineecontactbusiness=1025509&traineecontactperson=1000067395&attendingtrainee=Heather Kane&firstname=Heather&surname=Kane&paymentstatus=2&status=2"},
			{data: "course=701&traineecontactbusiness=1023337&traineecontactperson=1000065232&attendingtrainee=Carmel Santoro&firstname=Carmel&surname=Santoro&paymentstatus=2&status=2"},
			{data: "course=831&traineecontactbusiness=1023623&traineecontactperson=1000065508&attendingtrainee=Janice Madden&firstname=Janice&surname=Madden&paymentstatus=2&status=2"},
			{data: "course=933&traineecontactbusiness=1245514&traineecontactperson=1000400046&attendingtrainee=Lisa DiBartolo&firstname=Lisa&surname=DiBartolo&paymentstatus=2&status=2"},
			{data: "course=646&traineecontactbusiness=1022928&traineecontactperson=1000064836&attendingtrainee=Jennifer Poggioli&firstname=Jennifer&surname=Poggioli&paymentstatus=2&status=2"},
			{data: "course=646&traineecontactbusiness=1023492&traineecontactperson=1000065380&attendingtrainee=Rose Fisher&firstname=Rose&surname=Fisher&paymentstatus=2&status=2"},
			{data: "course=646&traineecontactbusiness=1021728&traineecontactperson=1000064087&attendingtrainee=Patricia Staples&firstname=Patricia&surname=Staples&paymentstatus=2&status=2"},
			{data: "course=646&traineecontactbusiness=1027260&traineecontactperson=1000068775&attendingtrainee=Emma Toffanello&firstname=Emma&surname=Toffanello&paymentstatus=2&status=2"},
			{data: "course=646&traineecontactbusiness=1024193&traineecontactperson=1000066076&attendingtrainee=Patricia Hatfield&firstname=Patricia&surname=Hatfield&paymentstatus=2&status=2"},
			{data: "course=846&traineecontactbusiness=1021788&traineecontactperson=1000064146&attendingtrainee=Deborah Nucifora&firstname=Deborah&surname=Nucifora&paymentstatus=2&status=2"},
			{data: "course=846&traineecontactbusiness=1023373&traineecontactperson=1000065270&attendingtrainee=Megan Cappella&firstname=Megan&surname=Cappella&paymentstatus=2&status=2"},
			{data: "course=846&traineecontactbusiness=1023355&traineecontactperson=1000065249&attendingtrainee=Marianne Pearce&firstname=Marianne&surname=Pearce&paymentstatus=2&status=2"},
			{data: "course=846&traineecontactbusiness=1023358&traineecontactperson=1000065252&attendingtrainee=Audrey Wah Day&firstname=Audrey&surname=Wah Day&paymentstatus=2&status=2"},
			{data: "course=846&traineecontactbusiness=1021772&traineecontactperson=1000064131&attendingtrainee=Chrissie Di Salvo&firstname=Chrissie&surname=Di Salvo&paymentstatus=2&status=2"},
			{data: "course=901&traineecontactbusiness=1024103&traineecontactperson=1000065985&attendingtrainee=Kathy Jonsson&firstname=Kathy&surname=Jonsson&paymentstatus=2&status=2"},
			{data: "course=901&traineecontactbusiness=1022431&traineecontactperson=1000064460&attendingtrainee=John Villella&firstname=John&surname=Villella&paymentstatus=2&status=2"},
			{data: "course=901&traineecontactbusiness=1022963&traineecontactperson=1000064865&attendingtrainee=Lyn Adams&firstname=Lyn&surname=Adams&paymentstatus=2&status=2"},
			{data: "course=901&traineecontactbusiness=1022212&traineecontactperson=1000064340&attendingtrainee=John Robinson&firstname=John&surname=Robinson&paymentstatus=2&status=2"},
			{data: "course=2812&traineecontactbusiness=1025126&traineecontactperson=1000067011&attendingtrainee=Sarah Mackin&firstname=Sarah&surname=Mackin&paymentstatus=2&status=2"},
			{data: "course=2826&traineecontactbusiness=1350962&traineecontactperson=1000626234&attendingtrainee=Ling Jian (Frank) Lin&firstname=Ling&surname=Jian (Frank) Lin&paymentstatus=2&status=2"},
			{data: "course=2824&traineecontactbusiness=1341713&traineecontactperson=1000622244&attendingtrainee=Barry Dunnet&firstname=Barry&surname=Dunnet&paymentstatus=2&status=2"},
			{data: "course=645&traineecontactbusiness=1022353&traineecontactperson=1000064416&attendingtrainee=Ladina Villella&firstname=Ladina&surname=Villella&paymentstatus=2&status=2"},
			{data: "course=645&traineecontactbusiness=1023622&traineecontactperson=1000065507&attendingtrainee=Mavis Davenport&firstname=Mavis&surname=Davenport&paymentstatus=2&status=2"},
			{data: "course=645&traineecontactbusiness=1022415&traineecontactperson=1000064451&attendingtrainee=Robyn Lowth&firstname=Robyn&surname=Lowth&paymentstatus=2&status=2"},
			{data: "course=794&traineecontactbusiness=1025169&traineecontactperson=1000067055&attendingtrainee=Vanessa Dickinson&firstname=Vanessa&surname=Dickinson&paymentstatus=2&status=2"},
			{data: "course=644&traineecontactbusiness=1014919&traineecontactperson=1000046919&attendingtrainee=Fred Cunzolo&firstname=Fred&surname=Cunzolo&paymentstatus=2&status=2"},
			{data: "course=644&traineecontactbusiness=1021877&traineecontactperson=1000064203&attendingtrainee=Pery Dass&firstname=Pery&surname=Dass&paymentstatus=2&status=2"},
			{data: "course=644&traineecontactbusiness=1021757&traineecontactperson=1000064116&attendingtrainee=Lorella Plozza&firstname=Lorella&surname=Plozza&paymentstatus=2&status=2"},
			{data: "course=644&traineecontactbusiness=1022287&traineecontactperson=1000064383&attendingtrainee=Carla Iacutone&firstname=Carla&surname=Iacutone&paymentstatus=2&status=2"},
			{data: "course=643&traineecontactbusiness=1025153&traineecontactperson=1000067039&attendingtrainee=Tracey Battistin&firstname=Tracey&surname=Battistin&paymentstatus=2&status=2"},
			{data: "course=643&traineecontactbusiness=1133599&traineecontactperson=1000203555&attendingtrainee=Daniel Delai&firstname=Daniel&surname=Delai&paymentstatus=2&status=2"},
			{data: "course=1404&traineecontactbusiness=1281540&traineecontactperson=1000466072&attendingtrainee=Daniel Berrigan&firstname=Daniel&surname=Berrigan&paymentstatus=2&status=2"},
			{data: "course=2754&traineecontactbusiness=1342517&traineecontactperson=1000623326&attendingtrainee=Kade Pride&firstname=Kade&surname=Pride&paymentstatus=2&status=2"},
			{data: "course=1519&traineecontactbusiness=1098435&traineecontactperson=1000148331&attendingtrainee=Ian Ryan&firstname=Ian&surname=Ryan&paymentstatus=2&status=2"},
			{data: "course=1265&traineecontactbusiness=1272744&traineecontactperson=1000442763&attendingtrainee=Susan Johnston&firstname=Susan&surname=Johnston&paymentstatus=2&status=2"},
			{data: "course=1517&traineecontactbusiness=1024701&traineecontactperson=1000066586&attendingtrainee=Loui Condoluci&firstname=Loui&surname=Condoluci&paymentstatus=2&status=2"},
			{data: "course=1568&traineecontactbusiness=1290905&traineecontactperson=1000489590&attendingtrainee=Leone McRae&firstname=Leone&surname=McRae&paymentstatus=2&status=2"},
			{data: "course=1373&traineecontactbusiness=1281235&traineecontactperson=1000463960&attendingtrainee=Leanne Pippo&firstname=Leanne&surname=Pippo&paymentstatus=2&status=2"},
			{data: "course=1323&traineecontactbusiness=1277473&traineecontactperson=1000454039&attendingtrainee=Glennis Orsida&firstname=Glennis&surname=Orsida&paymentstatus=2&status=2"},
			{data: "course=1303&traineecontactbusiness=1276223&traineecontactperson=1000450124&attendingtrainee=Carlo Tartaglia&firstname=Carlo&surname=Tartaglia&paymentstatus=2&status=2"},
			{data: "course=1147&traineecontactbusiness=1024915&traineecontactperson=1000066800&attendingtrainee=Jenni Blackshaw&firstname=Jenni&surname=Blackshaw&paymentstatus=2&status=2"},
			{data: "course=1147&traineecontactbusiness=1024934&traineecontactperson=1000066819&attendingtrainee=Maria Manuele&firstname=Maria&surname=Manuele&paymentstatus=2&status=2"},
			{data: "course=1147&traineecontactbusiness=1024951&traineecontactperson=1000066836&attendingtrainee=Maria Germano&firstname=Maria&surname=Germano&paymentstatus=2&status=2"},
			{data: "course=1147&traineecontactbusiness=1024032&traineecontactperson=1000065914&attendingtrainee=Alan Westbury&firstname=Alan&surname=Westbury&paymentstatus=2&status=2"},
			{data: "course=1146&traineecontactbusiness=1024031&traineecontactperson=1000065913&attendingtrainee=Paul Volta&firstname=Paul&surname=Volta&paymentstatus=2&status=2"},
			{data: "course=2782&traineecontactbusiness=1334365&traineecontactperson=1000603975&attendingtrainee=Dudley McMullen&firstname=Dudley&surname=McMullen&paymentstatus=2&status=2"},
			{data: "course=2782&traineecontactbusiness=1334365&traineecontactperson=1000603975&attendingtrainee=Peter Colley&firstname=Peter&surname=Colley&paymentstatus=2&status=2"},
			{data: "course=2782&traineecontactbusiness=1334365&traineecontactperson=1000603975&attendingtrainee=Jennifer Gralike&firstname=Jennifer&surname=Gralike&paymentstatus=2&status=2"},
			{data: "course=1148&traineecontactbusiness=1023334&traineecontactperson=1000065229&attendingtrainee=Megan Dunlop&firstname=Megan&surname=Dunlop&paymentstatus=2&status=2"},
			{data: "course=1149&traineecontactbusiness=1025007&traineecontactperson=1000066892&attendingtrainee=Maria Sibio&firstname=Maria&surname=Sibio&paymentstatus=2&status=2"},
			{data: "course=1149&traineecontactbusiness=1025012&traineecontactperson=1000066897&attendingtrainee=Antonetta Soares&firstname=Antonetta&surname=Soares&paymentstatus=2&status=2"},
			{data: "course=1144&traineecontactbusiness=1024468&traineecontactperson=1000066352&attendingtrainee=Michele Aumann&firstname=Michele&surname=Aumann&paymentstatus=2&status=2"},
			{data: "course=1143&traineecontactbusiness=1024930&traineecontactperson=1000066815&attendingtrainee=Julie Hillbrick&firstname=Julie&surname=Hillbrick&paymentstatus=2&status=2"},
			{data: "course=1143&traineecontactbusiness=1024940&traineecontactperson=1000066825&attendingtrainee=Peter Pinkerton&firstname=Peter&surname=Pinkerton&paymentstatus=2&status=2"},
			{data: "course=1143&traineecontactbusiness=1024037&traineecontactperson=1000065919&attendingtrainee=Harold Spargo&firstname=Harold&surname=Spargo&paymentstatus=2&status=2"},
			{data: "course=1143&traineecontactbusiness=1023833&traineecontactperson=1000065715&attendingtrainee=Adine Robb&firstname=Adine&surname=Robb&paymentstatus=2&status=2"},
			{data: "course=1143&traineecontactbusiness=1023833&traineecontactperson=1000065715&attendingtrainee=Kristy-Anne Chigwidden&firstname=Kristy-Anne&surname=Chigwidden&paymentstatus=2&status=2"},
			{data: "course=1187&traineecontactbusiness=1196148&traineecontactperson=1000279116&attendingtrainee=Andrew Hinton &firstname=Andrew&surname=Hinton&paymentstatus=2&status=2"},
			{data: "course=1187&traineecontactbusiness=1196148&traineecontactperson=1000279116&attendingtrainee=Henk Fledderus&firstname=Henk&surname=Fledderus&paymentstatus=2&status=2"},
			{data: "course=1187&traineecontactbusiness=1263671&traineecontactperson=1000440445&attendingtrainee=Terri Wheeler&firstname=Terri&surname=Wheeler&paymentstatus=2&status=2"},
			{data: "course=1187&traineecontactbusiness=1263671&traineecontactperson=1000440445&attendingtrainee=Mark West&firstname=Mark&surname=West&paymentstatus=2&status=2"},
			{data: "course=1183&traineecontactbusiness=1196148&traineecontactperson=1000279116&attendingtrainee=Henk Fledderus&firstname=Henk&surname=Fledderus&paymentstatus=2&status=2"},
			{data: "course=1183&traineecontactbusiness=1196148&traineecontactperson=1000279116&attendingtrainee=Andrew Hinton &firstname=Andrew&surname=Hinton&paymentstatus=2&status=2"},
			{data: "course=1183&traineecontactbusiness=1263671&traineecontactperson=1000440445&attendingtrainee=Daniel Ying&firstname=Daniel&surname=Ying&paymentstatus=2&status=2"},
			{data: "course=1183&traineecontactbusiness=1263671&traineecontactperson=1000440445&attendingtrainee=Terri Wheeler&firstname=Terri&surname=Wheeler&paymentstatus=2&status=2"},
			{data: "course=1183&traineecontactbusiness=1263671&traineecontactperson=1000440445&attendingtrainee=Mark West&firstname=Mark&surname=West&paymentstatus=2&status=2"},
			{data: "course=781&traineecontactbusiness=1024773&traineecontactperson=1000066658&attendingtrainee=Dave Radley&firstname=Dave&surname=Radley&paymentstatus=2&status=2"},
			{data: "course=781&traineecontactbusiness=1024773&traineecontactperson=1000066658&attendingtrainee=Chris Barton&firstname=Chris&surname=Barton&paymentstatus=2&status=2"},
			{data: "course=781&traineecontactbusiness=1022713&traineecontactperson=1000064631&attendingtrainee=Wendy Dwan&firstname=Wendy&surname=Dwan&paymentstatus=2&status=2"},
			{data: "course=1247&traineecontactbusiness=1263140&traineecontactperson=1000438958&attendingtrainee=Angello Morello&firstname=Angello&surname=Morello&paymentstatus=2&status=2"},
			{data: "course=1193&traineecontactbusiness=1263465&traineecontactperson=1000439495&attendingtrainee=Stuart Sharam&firstname=Stuart&surname=Sharam&paymentstatus=2&status=2"},
			{data: "course=1193&traineecontactbusiness=1263438&traineecontactperson=1000439475&attendingtrainee=Bronwyn Longbottom&firstname=Bronwyn&surname=Longbottom&paymentstatus=2&status=2"},
			{data: "course=1100&traineecontactbusiness=1263392&traineecontactperson=1000439408&attendingtrainee=Jodie Scholz&firstname=Jodie&surname=Scholz&paymentstatus=2&status=2"},
			{data: "course=1100&traineecontactbusiness=1263383&traineecontactperson=1000439395&attendingtrainee=John Lorke&firstname=John&surname=Lorke&paymentstatus=2&status=2"},
			{data: "course=1131&traineecontactbusiness=1263368&traineecontactperson=1000439363&attendingtrainee=Wayne Korber&firstname=Wayne&surname=Korber&paymentstatus=2&status=2"},
			{data: "course=1102&traineecontactbusiness=1263324&traineecontactperson=1000439297&attendingtrainee=Robert Hoey&firstname=Robert&surname=Hoey&paymentstatus=2&status=2"},
			{data: "course=1102&traineecontactbusiness=1263324&traineecontactperson=1000439297&attendingtrainee=Mark Hoey&firstname=Mark&surname=Hoey&paymentstatus=2&status=2"},
			{data: "course=1101&traineecontactbusiness=1263285&traineecontactperson=1000439246&attendingtrainee=Serena Williams&firstname=Serena&surname=Williams&paymentstatus=2&status=2"},
			{data: "course=1101&traineecontactbusiness=1263258&traineecontactperson=1000439218&attendingtrainee=Grant McAnaney&firstname=Grant&surname=McAnaney&paymentstatus=2&status=2"},
			{data: "course=1096&traineecontactbusiness=1263254&traineecontactperson=1000439214&attendingtrainee=Sharlee Hill&firstname=Sharlee&surname=Hill&paymentstatus=2&status=2"},
			{data: "course=1095&traineecontactbusiness=1263294&traineecontactperson=1000439263&attendingtrainee=Christine Argiro&firstname=Christine&surname=Argiro&paymentstatus=2&status=2"},
			{data: "course=1095&traineecontactbusiness=1263044&traineecontactperson=1000438676&attendingtrainee=Janet Smith&firstname=Janet&surname=Smith&paymentstatus=2&status=2"},
			{data: "course=1095&traineecontactbusiness=1263041&traineecontactperson=1000438671&attendingtrainee=Adam Smith&firstname=Adam&surname=Smith&paymentstatus=2&status=2"},
			{data: "course=1095&traineecontactbusiness=1263033&traineecontactperson=1000438664&attendingtrainee=Com Demis&firstname=Com&surname=Demis&paymentstatus=2&status=2"},
			{data: "course=1545&traineecontactbusiness=1115377&traineecontactperson=1000175155&attendingtrainee=Angus Galloway&firstname=Angus&surname=Galloway&paymentstatus=2&status=2"},
			{data: "course=1345&traineecontactbusiness=1278721&traineecontactperson=1000454175&attendingtrainee=Anthony Spiteri&firstname=Anthony&surname=Spiteri&paymentstatus=2&status=2"},
			{data: "course=1255&traineecontactbusiness=1177392&traineecontactperson=1000262294&attendingtrainee=John Stephens&firstname=John&surname=Stephens&paymentstatus=2&status=2"},
			{data: "course=1130&traineecontactbusiness=1116984&traineecontactperson=1000176981&attendingtrainee=Andrew Kaine&firstname=Andrew&surname=Kaine&paymentstatus=2&status=2"},
			{data: "course=2228&traineecontactbusiness=1342060&traineecontactperson=1000622708&attendingtrainee=Daniel Vedelago&firstname=Daniel&surname=Vedelago&paymentstatus=2&status=2"},
			{data: "course=2779&traineecontactbusiness=1342039&traineecontactperson=1000622686&attendingtrainee=Andrew Sciberras&firstname=Andrew&surname=Sciberras&paymentstatus=2&status=2"},
			{data: "course=2779&traineecontactbusiness=1342039&traineecontactperson=1000622686&attendingtrainee=Renee Sciberras&firstname=Renee&surname=Sciberras&paymentstatus=2&status=2"},
			{data: "course=2228&traineecontactbusiness=1341975&traineecontactperson=1000622624&attendingtrainee=Daniel Vedelago&firstname=Daniel&surname=Vedelago&paymentstatus=2&status=2"},
			{data: "course=1292&traineecontactbusiness=1341972&traineecontactperson=1000622620&attendingtrainee=Tanya Walker&firstname=Tanya&surname=Walker&paymentstatus=2&status=2"},
			{data: "course=2755&traineecontactbusiness=1341954&traineecontactperson=1000622573&attendingtrainee=Bethwyn Tansley&firstname=Bethwyn&surname=Tansley&paymentstatus=2&status=2"},
			{data: "course=2755&traineecontactbusiness=1341954&traineecontactperson=1000622573&attendingtrainee=Peter Reinbott&firstname=Peter&surname=Reinbott&paymentstatus=2&status=2"},
			{data: "course=2755&traineecontactbusiness=1341954&traineecontactperson=1000622573&attendingtrainee=Clayton Mattiazzi&firstname=Clayton&surname=Mattiazzi&paymentstatus=2&status=2"},
			{data: "course=2776&traineecontactbusiness=1341949&traineecontactperson=1000622568&attendingtrainee=Christina Mallias&firstname=Christina&surname=Mallias&paymentstatus=2&status=2"},
			{data: "course=2772&traineecontactbusiness=1341945&traineecontactperson=1000622561&attendingtrainee=Jennifer Rohde&firstname=Jennifer&surname=Rohde&paymentstatus=2&status=2"},
			{data: "course=2770&traineecontactbusiness=1341682&traineecontactperson=1000622181&attendingtrainee=Catherine Engelke&firstname=Catherine&surname=Engelke&paymentstatus=2&status=2"},
			{data: "course=2771&traineecontactbusiness=1341911&traineecontactperson=1000622521&attendingtrainee=John McLevy&firstname=John&surname=McLevy&paymentstatus=2&status=2"},
			{data: "course=2769&traineecontactbusiness=1341917&traineecontactperson=1000622545&attendingtrainee=Clare Moxham&firstname=Clare&surname=Moxham&paymentstatus=2&status=2"},
			{data: "course=2772&traineecontactbusiness=1244766&traineecontactperson=1000394260&attendingtrainee=Michael Frank&firstname=Michael&surname=Frank&paymentstatus=2&status=2"},
			{data: "course=2772&traineecontactbusiness=1281040&traineecontactperson=1000463133&attendingtrainee=James Bambridge&firstname=James&surname=Bambridge&paymentstatus=2&status=2"},
			{data: "course=2770&traineecontactbusiness=1341682&traineecontactperson=1000622181&attendingtrainee=Jim Engelke&firstname=Jim&surname=Engelke&paymentstatus=2&status=2"},
			{data: "course=2325&traineecontactbusiness=1022212&traineecontactperson=1000064340&attendingtrainee=&firstname=Sharon&surname=Robinson&paymentstatus=2&status=2"},
			{data: "course=1129&traineecontactbusiness=1260559&traineecontactperson=1000429029&attendingtrainee=Carolyn Burgi&firstname=Carolyn&surname=Burgi&paymentstatus=2&status=2"},
			{data: "course=1129&traineecontactbusiness=1260556&traineecontactperson=1000429016&attendingtrainee=Ann Hammond&firstname=Ann&surname=Hammond&paymentstatus=2&status=2"},
			{data: "course=1129&traineecontactbusiness=1260553&traineecontactperson=1000429010&attendingtrainee=Megan Lewis&firstname=Megan&surname=Lewis&paymentstatus=2&status=2"},
			{data: "course=782&traineecontactbusiness=1088289&traineecontactperson=1000134888&attendingtrainee=Keith Emmerton&firstname=Keith&surname=Emmerton&paymentstatus=2&status=2"},
			{data: "course=782&traineecontactbusiness=1259885&traineecontactperson=1000427267&attendingtrainee=Tim Hart&firstname=Tim&surname=Hart&paymentstatus=2&status=2"},
			{data: "course=1636&traineecontactbusiness=1293072&traineecontactperson=1000495872&attendingtrainee=Kevin Smith&firstname=Kevin&surname=Smith&paymentstatus=2&status=2"}
		],

		update: function(oParam)
		{
			var oData;
			var iRowCount = 0;
			var iTotal = 0;
			var sProgressTableId;
			var aHTML = [];
			var iPercentage = 0;
			var bPerformUpdate = true;
			var iDataIndex = -1;
			var sXHTMLContext;
			var fFunctionUpdate;

			if (oParam)
			{
				if (oParam.data) {oData = oParam.data}
				if (oParam.startRow != undefined) {iRowCount = oParam.startRow}
				if (oParam.totalCount != undefined) {iTotal = oParam.totalCount}
				if (oParam.progressTableId) {sProgressTableId = oParam.progressTableId}
				if (oParam.dataIndex != undefined) {iDataIndex = oParam.dataIndex}
				if (oParam.xhtmlContext) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.functionUpdate) {fFunctionUpdate = oParam.functionUpdate}
			}

			if (nsFreshcare.setup.bulkupdate.data.userContinue === 0)
			{	// User has pressed Pause - save all values in oParam to nsFreshcare.setup.bulkupdate.data.continueParam
				nsFreshcare.setup.bulkupdate.data.continueParam = oParam;
			}
			else
			{
				if (iDataIndex === -1 && oData.length > 0)
				{
					if (oParam.startRow === 1)
					{	$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('');	}
					nsFreshcare.setup.bulkupdate.data.restoreAttendingTrainees = oData;
					iDataIndex = 0;
					oParam.dataIndex = 0;
				}
				else if (oData.length === 0)
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressBar').html('No egg farmers found');
				}

				if (iTotal > 500)		// We only show the progess count if we have over 500 records
				{
					$('#ns1blankspaceBulkUpdate' + sXHTMLContext + 'ProgressCountProgress').html(iDataIndex + oParam.startRow);
				}


				if (iDataIndex < nsFreshcare.setup.bulkupdate.data.restoreAttendingTrainees.length)
				{
					var oThisRow = nsFreshcare.setup.bulkupdate.data.restoreAttendingTrainees[iDataIndex];
					var sData = oThisRow.data;

					$.ajax(
					{
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
						data: sData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sData + ' - '  + 
									oResponse.notes +
									'</td></tr>');
							}
							else
							{
								aHTML.push('<tr><td>' + (iDataIndex + oParam.startRow) + ' ' + sData + 
											'<br/>' + oResponse.error.errornotes +'</td></tr>');
							}
							$('#' + sProgressTableId).children().children().last().after(aHTML.join(''));
							
							oParam.dataIndex += 1;
							fFunctionUpdate(oParam);
						}
					});

				}
			}
		}
	}
}