/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.trainer.home = 
{
	init: 	function (oParam) 
	{ 	// v3.1.2 reset object / objectcontext values
		ns1blankspace.object = undefined; 
		ns1blankspace.objectContext = -1; 
		nsFreshcare.trainer.home.show(); 
	},

	show: 	function (oParam) {

					ns1blankspace.history.view(
					{
						newDestination: 'nsFreshcare.trainer.home.show();',
						move: false
					});

					if (ns1blankspace.setupView)
					{	
						$('#ns1blankspaceViewControlSetup').attr('checked', false);
						$('#ns1blankspaceViewControlSetup').button('refresh');
						ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.trainer.home.show()'});
					}	

					$('#ns1blankspaceViewControlAction').button({disabled: true});
					$('#ns1blankspaceViewControlNew').button({disabled: true});
					$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

					/*$('#ns1blankspaceViewControlViewContainer').button(
						{
							label: 'Trainees'
						});*/

					var aHTML = [];
					
					aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
					
					aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

					aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td id="ns1blankspaceControlActionCourseStatus" class="ns1blankspaceControl ns1blankspaceControlHome">' +
										'Courses by Status</td>' +
									'</tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					//aHTML.push(nsFreshcare.external.home.resources.buildElement());	v2.0.4 SUP021426 removed

					aHTML.push('</table>');					
							
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					nsFreshcare.trainer.home.bind();

					var aHTML = [];
					
					aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
					aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
					aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
					//aHTML.push('<td id="ns1blankspaceHomeColumn2" class="ns1blankspaceColumn2" style="width:300px;"></td>');
					aHTML.push('</tr></table>');	
					aHTML.push('</div>');

					$('#ns1blankspaceMain').html(aHTML.join(''));

					//$('#ns1blankspaceHomeColumn2').html(ns1blankspace.xhtml.homeNotes);

					if (ns1blankspace.xhtml.defaultElementID != '')
					{
						$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
						$('#' + ns1blankspace.xhtml.defaultElementID).click();
					};
				},

	bind: 	function ()
			{
				
				$('#ns1blankspaceControlActionCourseStatus').click(function(event)
				{
					$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
					$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
					ns1blankspace.xhtml.defaultElementID = this.id;
					
					nsFreshcare.trainer.home.courseStatus.show({
						show: false,
						xhtmlElementID: 'ns1blankspaceHomeColumn1'
						});
				});

				//nsFreshcare.external.home.resources.bindElement();	v2.0.4 SUP021426 removed
				
			},

	courseStatus: 	{

				search: function(oParam, oResponse) {

							// We can either be doing a count of the number of each type or the full search of records for the report
							// If we are looking at one of the Scheduled status types (Finalise, Scheduled future or Scheduled past), then we
							// must do another pass to work out which ones have been invoiced as these show in the Finalise list

							var sCourseStatusFilter;
							var bCount = false;
							var dToday = new Date();
							dToday = new Date(dToday.toString('dd MMM yyyy'));
							var iScheduledStep;
							var sScheduledFilter;
							var sCourseStatusFilter;

							if (oParam) {
								if (oParam.count != undefined) {bCount = oParam.count;}
								if (oParam.scheduledStep) {iScheduledStep = oParam.scheduledStep;} 
								if (oParam.courseStatus) {sCourseStatusFilter = oParam.courseStatus;}
							}
							else {
								oParam = {};
							}

							if (!bCount) {
								$('.ns1blankspaceCourseStatus').each(function() {
									if ($(this).hasClass('nsFreshcareSelected')) {
										sCourseStatusFilter = this.id.split('_')[1];
									}
								});
							}
							else {
								if (sCourseStatusFilter === undefined) {
									sCourseStatusFilter = $('.ns1blankspaceCourseStatus').first().attr('id').split('_')[1];
								}
							}

							if (iScheduledStep === undefined) {
								var oSearch = new AdvancedSearch();
								oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';		
								if (bCount) {
										oSearch.addField('id,status,coursedate');
										oSearch.addSummaryField('count(*) coursecount');
								}
								else {
									oSearch.addField('agritrainingcourse.statustext,agritrainingcourse.trainercontactbusiness,agritrainingcourse.trainercontactbusinesstext' +
													',agritrainingcourse.trainercontactperson,agritrainingcourse.trainercontactpersontext' +
													',agritrainingcourse.title,agritrainingcourse.coursedate,agritrainingcourse.location' +
													',agritrainingcourse.package.codeofpracticetext');
													//',agritrainingcourse.package.codeofpractice.code');
								}

								if (nsFreshcare.user.role.toLowerCase() != 'admin') {
									oSearch.addFilter("agritrainingcourse.trainercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
									oSearch.addFilter("agritrainingcourse.package.membership.status", 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	//v1.0.24
								}

								if (sCourseStatusFilter.split('-').length > 1) {
									// We are filtering scheduled courses - work out which one and apply filter accordingly
									// If we're only doing a count, then don't filter - we'll do that in the results
									if (!bCount) {
										sScheduledFilter = sCourseStatusFilter.split('-')[1];

										switch (sScheduledFilter)
										{
											case '1': 		// Course to Finalise - these have invoices linked
												break;

											case '2': 		// Scheduled (future) - these are before today and no invoice linked
												oSearch.addFilter('agritrainingcourse.coursedate', 'GREATER_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
												break;

											case '3': 		// Scheduled (past)  - these are after today and no invoice linked
												oSearch.addFilter('agritrainingcourse.coursedate', 'LESS_THAN', dToday.toString('dd MMM yyyy'));
												break;
										}
									}
									sCourseStatusFilter = sCourseStatusFilter.split('-')[0];

								}

								oSearch.addFilter('status', 'EQUAL_TO', sCourseStatusFilter);
								oSearch.sort('coursedate', 'desc');
								oSearch.rows = ((bCount && sCourseStatusFilter != nsFreshcare.data.trainingCourse.statusScheduled) ? 1 : 100);
								oSearch.getResults(function(oResponse) {

									if (oResponse.status === 'OK') {
										
										oParam.courseStatus = sCourseStatusFilter;
										if (bCount) {
											oParam.countResponse = oResponse;
										}
										else {
											oParam.listResponse = oResponse;
										}

										if (sCourseStatusFilter === nsFreshcare.data.trainingCourse.statusScheduled) {
											
											// Initial search - now we need to search for linked invoices 
											oParam.scheduledStep = 2;
											oParam.courseStatus = sCourseStatusFilter;
											oParam.scheduledFilter = sScheduledFilter;

											nsFreshcare.trainer.home.courseStatus.search(oParam, oResponse);
										}
										else {
											if (bCount) {
												// Add the number in brackets to the end of the Status filter. This section only applies for Cancelled & Completed
												// For Shceudled, it is added after searching for linked invoices
												$('#ns1blankspaceCourseStatus_' + sCourseStatusFilter)
													.html($('#ns1blankspaceCourseStatus_' + sCourseStatusFilter).html() + ' (' + oResponse.summary.coursecount + ')');

												oParam.courseStatus = $('#ns1blankspaceCourseStatus_' + sCourseStatusFilter).parent().next().find('td').attr('id').split('_')[1];

												nsFreshcare.trainer.home.courseStatus.search(oParam);
											}
											else {
											
												nsFreshcare.trainer.home.courseStatus.show(oParam, oResponse);
											}
										}
									}
								});

							}
							else if (iScheduledStep === 2) {

								// Now search for linked invoices
								if (oResponse.data.rows.length > 0) {
									var aCourseIds = $.map(oResponse.data.rows, function(a) { return a.id});
									var oSearch = new AdvancedSearch();
									oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
									oSearch.addField('objectcontext');
									oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourse);	
									oSearch.addFilter('objectcontext', 'IN_LIST', aCourseIds.join(','));
									oSearch.rows = 100;
									oSearch.getResults(function(oResponse) {

										if (oResponse.status === 'OK') {
											oParam.scheduledStep = 3;
											nsFreshcare.trainer.home.courseStatus.search(oParam, oResponse);
										}
									});
								}
								else {
									// There are no records with this status & date range, just 'display' the report
									nsFreshcare.trainer.home.courseStatus.show(oParam, oResponse);
								}
							}
							else if (iScheduledStep === 3) {

								// Now we need to remove rows from listResponse according to the Scheduled filter we're applying
								// oResponse is the list of linked invoices
								// oParam.listResponse or oParam.countResponse are the initial trainingcourse search results
								var aInvoiceIds = $.map(oResponse.data.rows, function(a) {return a.objectcontext});

								if (!bCount) {
									switch (oParam.scheduledFilter)
									{
										case '1':
											oParam.listResponse.data.rows = $.grep(oParam.listResponse.data.rows, function(a)
																			{	// Return all records where the id is in the list of invoice ids
																				return aInvoiceIds.join(',').indexOf(a.id) > -1
																			});
											break;

										case '2':
											oParam.listResponse.data.rows = $.grep(oParam.listResponse.data.rows, function(a)
																			{	// Return all records where the id is NOT in the list of invoice ids
																				return aInvoiceIds.join(',').indexOf(a.id) === -1
																			});
											break;

										case '3':
											oParam.listResponse.data.rows = $.grep(oParam.listResponse.data.rows, function(a)
																			{	// Return all records where the id is NOT in the list of invoice ids
																				return aInvoiceIds.join(',').indexOf(a.id) === -1
																			});
											break;
									}

									nsFreshcare.trainer.home.courseStatus.show(oParam, oResponse);
								}
								else {

									var iCount = 0;

									// Courses to Finalise - all recordss returned where id is in list of invoice ids
									iCount = $.grep(oParam.countResponse.data.rows, function(a)
														{	// Return all records where the id is in the list of invoice ids
															return aInvoiceIds.join(',').indexOf(a.id) > -1;
														});
									$('#ns1blankspaceCourseStatus_' + sCourseStatusFilter + '-1')
										.html($('#ns1blankspaceCourseStatus_' + sCourseStatusFilter + '-1').html() + ' (' + iCount.length + ')');

									// Scheduled (Future) - all records where id is not in list and course date is in the future
									iCount = $.grep(oParam.countResponse.data.rows, function(a)
														{	// Return all records where the id is NOT in the list of invoice ids and date is in the future
															var dCourse = new Date(a.coursedate);
															return aInvoiceIds.join(',').indexOf(a.id) === -1 && dCourse >= dToday;
														});

									$('#ns1blankspaceCourseStatus_' + sCourseStatusFilter + '-2')
										.html($('#ns1blankspaceCourseStatus_' + sCourseStatusFilter + '-2').html() + ' (' + iCount.length + ')');

									// Scheduled (Future) - all records where id is not in list and course date is in the past
									iCount = $.grep(oParam.countResponse.data.rows, function(a)
														{	// Return all records where the id is NOT in the list of invoice ids and date is in the past
															var dCourse = new Date(a.coursedate);
															return aInvoiceIds.join(',').indexOf(a.id) === -1 && dCourse < dToday;
														});

									$('#ns1blankspaceCourseStatus_' + sCourseStatusFilter + '-3')
										.html($('#ns1blankspaceCourseStatus_' + sCourseStatusFilter + '-3').html() + ' (' + iCount.length + ')');

								}

							}

						},

				show: 	function(oParam, oResponse) {

							var bShow = false;
							var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
							var sLabel = 'Courses by Status';
							var dToday = new Date();
							var oListResponse;
							
							if (oParam != undefined)
							{
								if (oParam.show != undefined) {bShow = oParam.show}
								if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
								if (oParam.label != undefined) {sLabel = oParam.label}
								if (oParam.listResponse) {oListResponse = oParam.listResponse;}
							}

							var aHTML = [];
							
							// First, let's construct the display and filtering areas
							if ($('#' + sXHTMLElementID).attr('data-loading') == '1') {

								$('#ns1blankspaceHomeColumn1').attr('data-loading', '');
								aHTML.push('<table id="ns1blankspaceHomeCourseStatus"><tr>');
								aHTML.push('<td id="ns1blankspaceHomeCourseStatusResults" class="ns1blankspaceColumn1Flexible"></td>' +
										   '<td id="ns1blankspaceHomeCourseSearchRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
										   '<td id="ns1blankspaceHomeCourseStatusFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
								aHTML.push('</tr></table>');

								$('#' + sXHTMLElementID).html(aHTML.join(''));

								// Search criteria bar 'handle' - allows user to get the search criteria div back into view
								aHTML = [];
								aHTML.push('<span id="ns1blankspaceHomeCourseSearchHandle" style="height:25px">Search Criteria</span>');
								$('#ns1blankspaceHomeCourseSearchRibbon').html(aHTML.join(''));

								// Filtering area
								aHTML = [];
								aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');
								aHTML.push('<tr><td id="ns1blankspaceHomeCourseStatusSearch" class="ns1blankspaceAction">Search</td></tr>');
								aHTML.push('<tr><td id="ns1blankspaceCourseStatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');
								aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Status</td></tr>');
								aHTML.push('<tr><td id="ns1blankspaceCourseStatus_' + nsFreshcare.data.trainingCourse.statusCancelled + '" ' +
													'class="ns1blankspaceCourseStatus nsFreshcareSelectable">Cancelled</td></tr>');
								aHTML.push('<tr><td id="ns1blankspaceCourseStatus_' + nsFreshcare.data.trainingCourse.statusCompleted + '" ' +
													'class="ns1blankspaceCourseStatus nsFreshcareSelectable">Completed</td></tr>');
								aHTML.push('<tr><td id="ns1blankspaceCourseStatus_' + nsFreshcare.data.trainingCourse.statusScheduled + '-1" ' +
													'class="ns1blankspaceCourseStatus nsFreshcareSelectable">Courses to Finalise</td></tr>');
								aHTML.push('<tr><td id="ns1blankspaceCourseStatus_' + nsFreshcare.data.trainingCourse.statusScheduled + '-2" ' +
													'class="ns1blankspaceCourseStatus nsFreshcareSelectable">Scheduled (Future)</td></tr>');
								aHTML.push('<tr><td id="ns1blankspaceCourseStatus_' + nsFreshcare.data.trainingCourse.statusScheduled + '-3" ' +
													'class="ns1blankspaceCourseStatus nsFreshcareSelectable nsFreshcareSelected">Scheduled (Past)</td></tr>');
								
								aHTML.push('</table>')

								$('#ns1blankspaceHomeCourseStatusFilter').html(aHTML.join(''));

								$('#ns1blankspaceHomeCourseSearchHandle').button({
									text: false,
									icons: {
										primary: 'ui-icon-arrowthickstop-1-w'
									}
								})
								.css('width', '12px')
								.css('height', '25px')
								.click(function() {
									$('#ns1blankspaceHomeCourseSearchHandle').hide();
									$('#ns1blankspaceHomeCourseStatusFilter').show('slide', {direction: 'left'}, 1000);
								});
								$('#ns1blankspaceHomeCourseSearchHandle').hide();

								$('.ns1blankspaceCourseStatus').click(function() {

									if ($(this).hasClass('nsFreshcareSelected')) {
										
										$(this).removeClass('nsFreshcareSelected');
									}
									else {

										$('.ns1blankspaceCourseStatus').removeClass('nsFreshcareSelected');
										$(this).addClass('nsFreshcareSelected');
										$('#ns1blankspaceHomeCourseStatusFilter').hide({duration: 200, complete: function() {

											$('#ns1blankspaceHomeCourseSearchHandle').show();
											$('#ns1blankspaceHomeCourseStatusResults').html(ns1blankspace.xhtml.loading);
											nsFreshcare.trainer.home.courseStatus.search();
										}});

									}
								});

								$('#ns1blankspaceHomeCourseStatusSearch').button({
									label: "Search"
								})
								.click(function() {

									ns1blankspace.okToSave = true;

									if ($.grep($('.ns1blankspaceCourseStatus'), function(a) {return $(a).hasClass('nsFreshcareSelected')}).length === 0) {
										$('#ns1blankspaceCourseStatusMessage').html('Please choose at least one Status.');
										ns1blankspace.okToSave = false;
									}

									if (ns1blankspace.okToSave) {

										//oParam = {onComplete", nsFreshcare.trainer.home.courseStatus.show)
										$('#ns1blankspaceHomeCourseStatusFilter').hide({duration: 200, complete: function() {

											$('#ns1blankspaceHomeCourseSearchHandle').show();
											$('#ns1blankspaceHomeCourseStatusResults').html(ns1blankspace.xhtml.loading);
											nsFreshcare.trainer.home.courseStatus.search();
										}});
									}
									else {
										window.setTimeout('$("#ns1blankspaceCourseStatusMessage").fadeOut(4000)', 7000);
									}
								});

								nsFreshcare.trainer.home.courseStatus.search({count: true});

							}

							if (oListResponse) {
								
								if (oListResponse.data.rows.length == 0)
								{
									aHTML.push('<table class="ns1blankspaceHome">');
									aHTML.push('<tr><td class="ns1blankspaceNothing">No Training Courses matching this criteria.</td></tr>');
									aHTML.push('</table>');

									$('#ns1blankspaceHomeCourseStatusResults').html(aHTML.join(''));
									if (bShow) {$('#ns1blankspaceHomeCourseStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
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
										aHTML.push('<table id="ns1blankspaceHomeCoursesByStatus" class="ns1blankspace">');
									}	
									
									aHTML.push('<tr class="ns1blankspaceCaption">');
									//aHTML.push('<td class="ns1blankspaceHeaderCaption">Status</td>');
									
									if (nsFreshcare.user.role.toLowerCase() === 'admin') {
										aHTML.push('<td class="ns1blankspaceHeaderCaption">Trainer Business</td>');
									}
									aHTML.push('<td class="ns1blankspaceHeaderCaption">Trainer</td>');
									aHTML.push('<td class="ns1blankspaceHeaderCaption">Course</td>');
									
									aHTML.push('<td class="ns1blankspaceHeaderCaption">Training Date</td>');
									aHTML.push('<td class="ns1blankspaceHeaderCaption">Location</td>');
									aHTML.push('<td class="ns1blankspaceHeaderCaption">COP</td>');
									aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
									aHTML.push('</tr>');

									$.each(oListResponse.data.rows, function() 	{
										aHTML.push(nsFreshcare.trainer.home.courseStatus.row(this));
									});
									
									aHTML.push('</table>');

									if (bShow) {$('#ns1blankspaceHomeCourseStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
									
									ns1blankspace.render.page.show(
									{
										xhtmlElementID: 'ns1blankspaceHomeCourseStatusResults',
										xhtmlContext: 'HomeCourseStatus',
										xhtml: aHTML.join(''),
										showMore: (oResponse.morerows == 'true'),
										more: oResponse.moreid,
										rows: 20,
										functionShowRow: nsFreshcare.trainer.home.courseStatus.row,
										functionNewPage: 'nsFreshcare.trainer.home.courseStatus.bind()',
										type: 'json'
									}); 	
									
									nsFreshcare.trainer.home.courseStatus.bind();
								}
							}
						},

				row: 	function(oRow) {

							var aHTML = [];
				
							aHTML.push('<tr class="ns1blankspaceRow">');
										
							//aHTML.push('<td id="ns1blankspaceHomeCourseStatus_status-' + oRow.id + '" class="ns1blankspaceRow">' +
							//						oRow['agritrainingcourse.statustext'] + '</td>');
						
							if (nsFreshcare.user.role.toLowerCase() === 'admin') {
								aHTML.push('<td id="ns1blankspaceHomeCourseStatus_trainerbusiness-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
														oRow['agritrainingcourse.trainercontactbusinesstext'] + '</td>');
							}

							aHTML.push('<td id="ns1blankspaceHomeCourseStatus_trainerperson-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
													oRow['agritrainingcourse.trainercontactpersontext'] + '</td>');

							aHTML.push('<td id="ns1blankspaceHomeCourseStatus_title-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
													oRow['agritrainingcourse.title'] + '</td>');

							aHTML.push('<td id="ns1blankspaceHomeCourseStatus_coursedate-' + oRow.id + '" class="ns1blankspaceRow">' +
													oRow['agritrainingcourse.coursedate'] + '</td>');

							aHTML.push('<td id="ns1blankspaceHomeCourseStatus_location-' + oRow.id + '" class="ns1blankspaceRow">' +
													oRow['agritrainingcourse.location'] + '</td>');

							aHTML.push('<td id="ns1blankspaceHomeCourseStatus_cop-' + oRow.id + '" class="ns1blankspaceRow">' +
													oRow['agritrainingcourse.package.codeofpracticetext'] + '</td>');

							aHTML.push('<td id="ns1blankspaceHomeCourseStatus-' + oRow.id + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

							return aHTML.join('');

						},

				bind: 	function(oRow) {

							$('.ns1blankspaceMainRowOptionsSelect').button( {
								text: false,
								icons: {
									primary: "ui-icon-play"
								}
							})
							.click(function()
							{
								nsFreshcare.admin.trainingcourse.init({showHome: false});
								nsFreshcare.admin.trainingcourse.search.send(this.id)
							})
							.css('width', '15px')
							.css('height', '18px');
						}

			}

}	

nsFreshcare.trainer.home.options = 
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

nsFreshcare.trainer.home.report = 
{
	initData: 	function (oParam)
	{
		// v1.0.24 added customExportFormat to all reports, added filters on membershipstatus to report and selectAttributes
		// v3.1.206 SUP023035 Now reports on business mailing address
		var bAll = true;
		var sStreetAddresses = "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address1-" +
								"agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address2-" +
								"agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresssuburb-" +
								"agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addressstate-" + 
								"agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresspostcode-" +
								"agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresscountry"; 

		if (oParam != undefined)
		{
			if (oParam.all != undefined) {bAll = oParam.all}
		}
		
		// 2.0.4 SUP021142 Changed showSort to true	& fixed scriptOpen to open in new tab	
		ns1blankspace.report.reports =
			[
				{
					name: "My Trainees",
					object:  nsFreshcare.objectTrainingCourse,
					objectName: "trainingcourse",
					method: "AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH",
					returnParameters: 'agritrainingcourseattendee' +
									 ',agritrainingcourseattendee.course' +
									 ',agritrainingcourseattendee.traineecontactperson' +
									 ',agritrainingcourseattendee.course.package' +
									 ',agritrainingcourseattendee.traineecontactperson.agrisubscription' +
									 ',agritrainingcourseattendee.traineecontactbusiness.addresslink' +
									 ',agritrainingcourseattendee.traineecontactbusiness.addresslink.address',
					functionSearch: nsFreshcare.trainer.grower.search.send,
					scriptOpen: 'window.open("/#/nsFreshcare-trainer.grower/id:" + this.id.split("-").pop())',
					showSort: true,
					idColumn: 'agritrainingcourseattendee.traineecontactbusiness',
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
								name: "agritrainingcourseattendee.course.trainercontactbusiness",
								comparison: "EQUAL_TO",
								value1: ns1blankspace.user.contactBusiness,
								value2: ""
							},
							{
								name: "agritrainingcourseattendee.course.package.membership.status",
								comparison: "EQUAL_TO",
								value1: nsFreshcare.data.membershipStatusActive,
								value2: ""
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sStreetAddresses},
								name: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.object',
								comparison: 'EQUAL_TO',
								value1: nsFreshcare.objectBusiness,
								value2: ''
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sStreetAddresses},
								name: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.objectcontext',
								comparison: 'EQUAL_TO',
								value1: 'field:agritrainingcourseattendee.traineecontactbusiness',
								value2: ''
							},
							{
								includeEval: ns1blankspace.report.fieldIncluded,
								includeParameters: {fields: sStreetAddresses},
								name: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.status',
								comparison: 'EQUAL_TO',
								value1: '1',
								value2: ''
							}
						]
					},
					selectableParameters: 
					{	/* 3.1.0i changed group to grouTitle 
						   3.1.1 SUP022467 missed the first group! */
						fields: 
						[
							{groupTitle: "Trainee"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.reference"},
							{name: "agritrainingcourseattendee.traineecontactbusinesstext"},
							{name: "agritrainingcourseattendee.traineecontactperson.firstname"},
							{name: "agritrainingcourseattendee.traineecontactperson.surname"},
							{name: "agritrainingcourseattendee.attendingtrainee"},
							{name: "agritrainingcourseattendee.traineecontactperson.workphone"},
							{name: "agritrainingcourseattendee.traineecontactperson.mobile"},
							{name: "agritrainingcourseattendee.traineecontactperson.email"},
							{name: "agritrainingcourseattendee.traineecontactperson.fax"},
							{groupTitle: "Trainee Address"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.mailingaddress1"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.mailingaddress2"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.mailingsuburb"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.mailingstate"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.mailingpostcode"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.mailingcountry"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address1"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address2"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresssuburb"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addressstate"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresspostcode"},
							{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresscountry"},
							{groupTitle: "Training Course"},
							{name: "agritrainingcourseattendee.coursetext"},
							{name: "agritrainingcourseattendee.course.coursedate"},
							{name: "agritrainingcourseattendee.course.package.codeofpracticetext"},
							{name: "agritrainingcourseattendee.course.packagetext"},
							{groupTitle: "Membership"},
							{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.membershiptext"},
							{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.codeofpracticetext"},
							{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.statustext"},
							{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.lastauditdate"}

						]
					}
				}
			]		

		ns1blankspace.report.dictionary =
			[ 
				
				{name: "agritrainingcourseattendee.traineecontactbusiness.reference", caption: "Company ID"},
				{name: "agritrainingcourseattendee.traineecontactbusinesstext", caption: "Business Name"},
				{name: "agritrainingcourseattendee.traineecontactperson.firstname", caption: "First Name"},
				{name: "agritrainingcourseattendee.traineecontactperson.surname", caption: "Surname"},
				{name: "agritrainingcourseattendee.attendingtrainee", caption: "Attending Trainee"},
				{name: "agritrainingcourseattendee.traineecontactperson.workphone", caption: "Phone"},
				{name: "agritrainingcourseattendee.traineecontactperson.mobile", caption: "Mobile"},
				{name: "agritrainingcourseattendee.traineecontactperson.email", caption: "Email"},
				{name: "agritrainingcourseattendee.traineecontactperson.fax", caption: "Fax"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.mailingaddress1", caption: "Mailing Address 1"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.mailingaddress2", caption: "Mailing Address 2"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.mailingsuburb", caption: "Mailing Suburb"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.mailingstate", caption: "Mailing State"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.mailingpostcode", caption: "Mailing Postcode"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.mailingcountry", caption: "Mailing Country"},
				{name: "agritrainingcourseattendee.coursetext", caption: "Course"},
				{name: "agritrainingcourseattendee.course.coursedate", caption: "Course Date"},
				{name: "agritrainingcourseattendee.course.package.codeofpracticetext", caption: "Training COP"},
				{name: "agritrainingcourseattendee.course.packagetext", caption: "Training Package"},
				{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.statustext", caption: "Grower Status"},
				{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.codeofpracticetext", caption: "Subscription COP"},
				{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.lastauditdate", caption: "Last Audit Date"},
				{name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.membershiptext", caption: "Membership"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address1", caption: "Street Address 1"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address2", caption: "Street Address 2"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresssuburb", caption: "Street Suburb"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addressstate", caption: "Street State"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresspostcode", caption: "Street Post Code"},
				{name: "agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresscountry", caption: "Street Country"},

				{name: "agritrainingcourseattendee.createdbytext", caption: "Created By"},
				{name: "agritrainingcourseattendee.createddate", caption: "Created Date"},
				{name: "agritrainingcourseattendee.modifiedbytext", caption: "Last Modified By"},
				{name: "agritrainingcourseattendee.modifieddate", caption: "Last Modified Date"}
						
			];

		ns1blankspace.report.selectAttributes = 			
			[
				{
					name: "agritrainingcourseattendee.traineecontactbusinesstext", 
					columns: "tradename-comma-space-contactbusiness.relationshipotherbusiness.contactbusiness.addresslink.address.addresssuburb",
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|' +
						    'contactbusiness.relationshipotherbusiness.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
							'contactbusiness.relationshipotherbusiness.type-EQUAL_TO-' + nsFreshcare.data.relationshipTrainer + '|' +
							'contactbusiness.relationshipotherbusiness.contactbusiness.addresslink.address.status-EQUAL_TO-1'
				},
				{
					name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.codeofpracticetext", 
					columns: "code-space-membershiptext",
					methodFilter: "agricodeofpractice.membership-IN_LIST-" + $.map(nsFreshcare.data.trainerMemberships, function(a) {return a.membership}).join(',')
				},
				{
					name: "agritrainingcourseattendee.course.package.codeofpracticetext",
					columns: "code-space-membershiptext",
					methodFilter: "agricodeofpractice.membership-IN_LIST-" + $.map(nsFreshcare.data.trainerMemberships, function(a) {return a.membership}).join(',')
				},
				{
					name: "agritrainingcourseattendee.coursetext",
					columns: "title-comma-space-location",
					methodFilter: "title-TEXT_IS_LIKE|location-TEXT_IS_LIKE|" +
								  "trainercontactbusiness-EQUAL_TO-" + ns1blankspace.user.contactBusiness + '|' + 
								  "agritrainingcourse.package.membership.status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive
				},
				{
					name: "agritrainingcourseattendee.course.packagetext",
					columns: "title-comma-space-membershiptext",
					methodFilter: 'title-TEXT_IS_LIKE|' +
								  "membership-IN_LIST-" + $.map(nsFreshcare.data.trainerMemberships, function(a) {return a.membership}).join(',')
				},
				{
					name: "agritrainingcourseattendee.traineecontactperson.agrisubscription.membershiptext",
					methodFilter: "id-IN_LIST-" + $.map(nsFreshcare.data.trainerMemberships, function(a) {return a.membership}).join(',')
				},
				{
					name: "agritrainingcourseattendee.createdbytext",
					columns: "title",
					methodFilter: 'id-EQUAL_TO-' + ns1blankspace.user.id
				},
				{
					name: "agritrainingcourseattendee.modifiedbytext",
					columns: "firstname-space-surname",
					methodFilter: 'id-EQUAL_TO-' + ns1blankspace.user.id
				}
			];
	}

}	

nsFreshcare.trainer.setup = 
{
	// v2.0.4j SUP021746 Street address was looking at addressaddress
	// v3.1.1 SUP022427 Chnanged attendingtrainee to firstname + surname
	exports: 	function() 
	{

		if ($.grep(ns1blankspace.setup.file["export"].formats, function(x) {return x.name === 'Export Trainees'}).length === 0) 
		{
			ns1blankspace.setup.file["export"].formats.push(
			{
				name: 'Export Trainees',
				header:
				[
					{
						line: 1,
						fields:
						[
							{value: 'Attending Trainee,'},
							{value: 'Business,'},
							{value: 'Company Id,'},
							{value: 'Address 1,'},
							{value: 'Address 2,'},
							{value: 'State,'},
							{value: 'Suburb,'},
							{value: 'Post Code,'},
							{value: 'Country,'},
							{value: 'Course,'},
							{value: 'Trainer,'},
							{value: 'Course Date'}
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
									 	 	return x.firstname.formatXHTML() + ' ' + x.surname.formatXHTML();
									 }
							},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusinesstext'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.reference'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address1'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address2'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addressstate'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresssuburb'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresspostcode'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresscountry'},
							{value: '","'},
							{field: 'coursetext'},
							{value: '","'},
							{field: 'agritrainingcourseattendee.course.trainercontactperson.firstname'},
							{value: ' '},
							{field: 'agritrainingcourseattendee.course.trainercontactperson.surname'},
							{value: '",'},
							{field: 'agritrainingcourseattendee.course.coursedate'}
						]
					}
				],
				footer:
				[]
			});
		}
	}
}
