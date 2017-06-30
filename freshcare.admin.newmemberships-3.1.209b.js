/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 

nsFreshcare.admin.newmemberships = 
{
	init: function (oParam) 
	{ 
		ns1blankspace.app.reset();

		ns1blankspace.object = 21;	
		ns1blankspace.objectName = 'newmemberships';
		ns1blankspace.objectMethod = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'New Memberships';
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", 'nsFreshcare');
		ns1blankspace.app.set(oParam);
	},

	home: 		function (oParam, oResponse)
	{
		var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'createddate'}).value;
		var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;

		ns1blankspace.app.context({'new': true, action: true, actionOptions: true, inContext: false});

		if (oParam == undefined) {oParam = {sortColumn: sSortColumn, sortDirection: sSortDirection}}

		if (oResponse == undefined)
		{
			var aHTML = [];
			var dToday = new Date();
						
			aHTML.push('<table class="ns1blankspaceMain">');
			aHTML.push('<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceMostLikely" class="ins1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'</tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			$('#ns1blankspaceControl').html('');		
			
			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';		
			oSearch.addField('traineecontactbusinesstext,attendingtrainee,agritrainingcourseattendee.course.package.membership.code,crop,harvestmonth'+
							',agritrainingcourseattendee.course.coursedate,traineecontactbusiness,createduser,createdusertext,createddate' +
							',agritrainingcourseattendee.course.package.codeofpracticetext,agritrainingcourseattendee.course.reference' +
							',traineecontactperson,agritrainingcourseattendee.course.package.membership,agritrainingcourseattendee.course.package.codeofpractice');		
			oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.trainingCourse.attendeeStatusNewMembership);
			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status == 'OK')
				{
					nsFreshcare.admin.newmemberships.home(oParam, oResponse);
				}
				else
				{
					ns1blankspace.status.error('Error finding new Membership records: ' + oResponse.error.errornotes);
				}
			});	
			
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">No new Memberships found</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');

				aHTML.push('<tr><td colspan="2">&nbsp;</td>' +
								'<td colspan="4" style="text-align: right;">' +
									'<span id="ns1blankspaceNewMembershipUpdate"' +
									' style="text-align:right; width:170px;"' +
									' class="ns1blankspaceAction">Add Memberships</span>&nbsp;&nbsp;' +
									'<span id="ns1blankspaceNewMembershipRemove"' +
									' style="text-align:right; width:150px;"' +
									' class="ns1blankspaceAction">Remove Rows</span>' +
								'</td>' +
							'</tr>');

				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="traineecontactbusinesstext"' +
									' data-sortdirection="' + ((sSortColumn == "traineecontactbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Grower Business</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="attendingtrainee"' +
									' data-sortdirection="' + ((sSortColumn == "attendingtrainee") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Attending Trainee</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agritrainingcourseattendee.course.package.membership.code"' +
									' data-sortdirection="' + ((sSortColumn == "agritrainingcourseattendee.course.package.membership.code") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Membership</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agritrainingcourseattendee.course.coursedate"' +
									' data-sortdirection="' + ((sSortColumn == "agritrainingcourseattendee.course.coursedate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Course Date</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="createdusertext"' +
									' data-sortdirection="' + ((sSortColumn == "createdusertext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Added By</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceMainRowOptionsSelect"' +
									' style="color:#B8B8B8; padding:4px; vertical-align:top;">' + 
									'<input type="checkbox" id="ns1blankspaceNewMembershipCheckAll" class="ns1blankspaceNewMembershipUpdate" checked="false">' +
									'</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceRow" id="ns1blankspaceMostLikelyUpdateInclude_row-' + this.id + '">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_grower-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["traineecontactbusinesstext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_trainee-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["attendingtrainee"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourseattendee.course.package.membership.code"] + ' - ' + 
											this["agritrainingcourseattendee.course.package.codeofpracticetext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_coursedate' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourseattendee.course.coursedate"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_createdby' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["createdusertext"] + '</td>' +
								'<td id="ns1blankspaceMostLikelyUpdate-' + this.id + '"' +
										' class="ns1blankspaceMainRowOptionsInclude"' +
										' style="color:#B8B8B8; padding:4px; vertical-align:top;">' + 
										'<input type="checkbox" id="ns1blankspaceMostLikelyUpdateInclude-' + this.id + '"' +
										' class="ns1blankspaceNewMembershipUpdateInclude" ' +
										' checked="false"' +
										' data-membership="' + this['agritrainingcourseattendee.course.package.membership'] +  '"' +
										' data-contactBusiness="' + this['traineecontactbusiness'] + '"' +
										' data-contactperson="' + this['traineecontactperson'] + '"' +
										' data-coursedate="' + this['agritrainingcourseattendee.course.coursedate'] + '"' +
										' data-codeOfPractice="' + this['agritrainingcourseattendee.course.package.codeofpractice'] + '"' +
										' data-harvestmoth="' + this['harvestmonth'] + '"' +
										' data-crop="' + this['crop'] + '"' +
										' data-attendingtrainee="' + this.attendingtrainee + '"' +
								'></td>');
					
					aHTML.push('</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.newmemberships.search.send(event.target.id, {source: 1});
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.admin.newmemberships.home(oParam);
				});

			$('#ns1blankspaceNewMembershipCheckAll')
			.click(function()
			{
				$('input.ns1blankspaceNewMembershipUpdateInclude').prop('checked', $(this).prop('checked'));
			});

			$('#ns1blankspaceNewMembershipUpdate')
				.button(
				{
					label: 'Add Memberships',
					icons: {primary: 'ui-icon-plus'} 
				})
				.click(function()
				{
					if ($('input.ns1blankspaceNewMembershipUpdateInclude:checked').length === 0)
					{
						ns1blankspace.container.confirm({title: 'No rows selected!', html: 'Please select rows to be processed.'});
					}
					else
					{
						var aTraineeData = $.map($('input.ns1blankspaceNewMembershipUpdateInclude:checked'), function(x)
						{
							var oData = 
							{
								traineecontactbusiness: $(x).attr('data-contactbusiness'),
								traineecontactperson:  $(x).attr('data-contactperson'),
								'agritrainingcourseattendee.course.package.membership': $(x).attr('data-membership'),
								'agritrainingcourseattendee.course.package.codeofpractice': $(x).attr('data-codeOfPractice'),
								'agritrainingcourseattendee.course.coursedate': $(x).attr('data-coursedate'),
								harvestmonth: $(x).attr('data-harvestmoth'),
								crop: $(x).attr('data-crop'),
								attendingtrainee: $(x).attr('data-attendingtrainee'),
								id: x.id.split('-').pop(),
								xhtmlElement: x
							}
							return oData;
						});

						nsFreshcare.admin.newmemberships.addMembership({traineeData: aTraineeData});
					}
				});

			// v3.1.209b SUP023104 Added ability to 'remove' to row - just changes the status
			$('#ns1blankspaceNewMembershipRemove')
				.button(
				{
					label: 'Remove Rows',
					icons: {primary: 'ui-icon-close'} 
				})
				.on('click', function()
				{
					if ($('input.ns1blankspaceNewMembershipUpdateInclude:checked').length === 0)
					{
						ns1blankspace.container.confirm({title: 'No rows selected!', html: 'Please select rows to be processed.'});
					}
					else
					{
						ns1blankspace.container.confirm(
						{
							title: 'Remove rows?',
							html: 'Are you sure you want to remove selected rows?',
							buttons: 
							[
								{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
									click: function() 
									{
										$(this).dialog('close');
										var aTraineeData = $.map($('input.ns1blankspaceNewMembershipUpdateInclude:checked'), function(x)
										{
											var oData = 
											{
												traineecontactbusiness: $(x).attr('data-contactbusiness'),
												traineecontactperson:  $(x).attr('data-contactperson'),
												'agritrainingcourseattendee.course.package.membership': $(x).attr('data-membership'),
												'agritrainingcourseattendee.course.package.codeofpractice': $(x).attr('data-codeOfPractice'),
												'agritrainingcourseattendee.course.coursedate': $(x).attr('data-coursedate'),
												harvestmonth: $(x).attr('data-harvestmoth'),
												crop: $(x).attr('data-crop'),
												attendingtrainee: $(x).attr('data-attendingtrainee'),
												id: x.id.split('-').pop(),
												xhtmlElement: x
											}
											return oData;
										});
										nsFreshcare.admin.newmemberships.addMembership({addMembershipStep: 7, traineeData: aTraineeData});
									}
								},
								{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
									click: function() 
									{
										$(this).dialog('close');
									}
								}
							]
						});
					}
				});
		}
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
			if (jQuery.type(sXHTMLElementId) === "object") 
			{
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
			var iRows = 40;
			var dToday = new Date();

			if (oParam)
			{
				if (oParam.source != undefined) {iSource = oParam.source}
				if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
				if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
				if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
			}
			else { oParam = {}}
			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				ns1blankspace.objectContextData = undefined;
	
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';		
				oSearch.addField('traineecontactbusinesstext,traineecontactpersontext,attendingtrainee,agritrainingcourseattendee.course.package.membership.code'+
								',agritrainingcourseattendee.course.coursedate,traineecontactbusiness,createduser,createdusertext,createddate' +
								',agritrainingcourseattendee.course.package.codeofpracticetext,agritrainingcourseattendee.course.reference' +
								',crop,harvestmonth,status,statustext,agritrainingcourseattendee.course.title,traineecontactperson' +
								',agritrainingcourseattendee.course.trainercontactbusinesstext,agritrainingcourseattendee.course.trainercontactpersontext' +
								',agritrainingcourseattendee.course.package.membership,agritrainingcourseattendee.course.package.codeofpractice');		

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status == 'OK')
					{
						nsFreshcare.admin.newmemberships.show(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error('Unable to find Trainer record: ' + oResponse.error.errornotes);
					}
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
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
					oSearch.addField('attendingtrainee,traineecontactbusinesstext,traineecontactpersontext');
					
					oSearch.addBracket("(");
					oSearch.addFilter('attendingtrainee', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('traineecontactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('traineecontactpersontext', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addBracket(')');

					oSearch.sort('traineecontactbusinesstext', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.admin.newmemberships.search.process(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var aHTML = [];
				
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
					aHTML.push('<tr class="ns1blankspaceSearch">');
				
					aHTML.push('<td class="ns1blankspaceSearch" id="businessname-' + this.id + '">' +
									this["traineecontactbusinesstext"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="trainee-' + this.id + '">' +
									this["attendingtrainee"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="contact-' + this.id + '">' +
									this["traineecontactpersontext"] + ' ' + this.surname + '</td>'); 
					
					aHTML.push('</tr>');
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
					nsFreshcare.admin.newmemberships.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'businessname-column-tradename-column-firstname-space-surname',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.newmemberships.search.send
				});   
				
			}	
		}
	},						

	layout: function ()
	{
		var aHTML = [];
		var oContext = {inContext: false, 'new': true, action: false, actionOptions: false};		

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
						'&nbsp;</td></tr>');
						
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			nsFreshcare.admin.newmemberships.summary();
		});
	},

	show: function (oParam, oResponse)
	{
		var aHTML = [];
		var iShowStep = 1;

		if (oParam) {if (oParam.showStep) {iShowStep = oParam.showStep;}}
		else { oParam = {showStep: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

		if (iShowStep === 1) 
		{
			nsFreshcare.admin.newmemberships.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iShowStep === 1 && oResponse && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find ' + nsFreshcare.data.growerText + '.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			// Set objectContextData & get Product Groups & Sites
			if (iShowStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['traineecontactbusinesstext'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['attendingtrainee'];

				$('#ns1blankspaceViewControlNew').button({disabled: true});
			
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_SEARCH';
				oSearch.addField('coursetrainee,productcategory,productcategorytext')
				oSearch.addFilter('coursetrainee', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === "OK")
					{
						oParam.showStep = 2;
						ns1blankspace.objectContextData.productGroups = oResponse.data.rows;
						nsFreshcare.admin.newmemberships.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding Categories:' + oResponse.error.errornotes);
					}
				});
			}

			// Get Sites
			else if (iShowStep == 2)
			{
				if (ns1blankspace.objectContextData.codeofpractice === '' 
					|| ns1blankspace.objectContextData.trainercontactbusiness  == undefined || ns1blankspace.objectContextData.trainercontactperson === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
					oSearch.addField('status,address1,address2,addresssuburb,addressstate,addresspostcode' +
									 ',address.addresslink.object,address.addresslink.objectcontext,address.addresslink.id');
					oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
					oSearch.addFilter('address.addresslink.objectContext', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.showStep = 3;
							ns1blankspace.objectContextData.sites = oResponse.data.rows;
							nsFreshcare.admin.newmemberships.show(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find linked sites: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.showStep = 3;
					nsFreshcare.admin.newmemberships.show(oParam);
				}
			}

			// Get Object Scope (replaces Person Groups)
			else if (iShowStep == 3)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('object,objectcontext,scope,scopetext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.showStep = 10;
						ns1blankspace.objectContextData.scopeValues = oResponse.data.rows; 
						// We need to map the scope values to person groups - DELETE ONCE ON SUBSCRIPTION
						/*$.each(ns1blankspace.objectContextData.scopeValues, function()
						{
							var oThisScope = this;
							this.group = $.grep(nsFreshcare.data.businessGroupGrowerText, function(x) {return x.title === oThisScope.scopetext}).shift().id;
							this.grouptext = this.scopetext;
						}); */ 		// v3.1.207 SUP023104 Remove this now that SCope is on Subscription
						nsFreshcare.admin.newmemberships.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find Scope values: ' + oResponse.error.errornotes);
					}
				});
			}

			// Display
			else if (iShowStep === 10)
			{

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br /><span style="color:#A0A0A0;font-size:0.825em;">' + ns1blankspace.data.contactPersonText.formatXHTML() + '</span>');
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.admin.newmemberships.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.newmemberships.summary()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this ' + nsFreshcare.data.growerText + '.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:170px;"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace" id="ns1blankspaceSummaryColumn1Table1">');
			
			if (ns1blankspace.objectContextData['traineecontactbusinesstext'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Grower Business</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['traineecontactbusinesstext'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['traineecontactpersontext'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Grower Primary Contact</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['traineecontactpersontext'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Attending Trainee</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['attendingtrainee'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training Course</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.title']  +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership / COP</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.membership.code'] + ' - ' + 
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.codeofpracticetext'] + 
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainer</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactbusinesstext'] + 
						' (' + ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactpersontext'] + ')' +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training Date</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.coursedate'] +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Crops</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['crop'] +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Harvest Months</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['harvestmonth'] +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Scopes</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						$.map(ns1blankspace.objectContextData.scopeValues, function(x) {return x.scopetext}).join(', ') +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Categories</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						$.map(ns1blankspace.objectContextData.productGroups, function(x) {return x.productcategorytext}).join(', ') +
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Sites</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						$.map(ns1blankspace.objectContextData.sites, function(x) 
							{
								return x.address1 + (x.address2 != '' ? ' ' + x.address2 : '') + ' ' +
										x.addresssuburb + ' ' + x.addressstate + ' ' + x.addresspostcode
							}).join('<br />') +
						'</td></tr>');
			
			aHTML.push('</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspaceSummaryAddMembership" class="ns1blankspaceAction" style="width:150px;">' +
						'Add Membership</span></td></tr>');

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			
			$('#ns1blankspaceSummaryAddMembership')
				.button(
				{
					label: 'Add Membership',
					icons: {primary: 'ui-icon-plus'}
				})
				.on("click", function()
				{
					oParam = 
					{
						traineeData: [ns1blankspace.objectContextData],
						xhtmlElementID: this.id
					};
					nsFreshcare.admin.newmemberships.addMembership(oParam);
				});

		}	
	},

	addMembership: function(oParam)
	{
		// Passed an array of items to update.
		var aTraineeData = ns1blankspace.util.getParam(oParam, 'traineeData', {'default': []}).value;
		var sMessage = '';

		if (oParam.addMembershipStep == undefined) {oParam.addMembershipStep = 1}
		if (oParam.traineeDataIndex == undefined) {oParam.traineeDataIndex = 0}

		if (oParam.traineeDataIndex < aTraineeData.length)
		{
			var oThisTrainee = aTraineeData[oParam.traineeDataIndex];

			// First check if the membership already exists
			if (oParam.addMembershipStep === 1)
			{
				sMessage = 'Checking if Membership exists..';
				if (oThisTrainee.xhtmlElement)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
				}
				else {ns1blankspace.status.working(sMessage);}
						
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('id');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', oThisTrainee['traineecontactbusiness']);
				oSearch.addFilter('membership', 'EQUAL_TO', oThisTrainee['agritrainingcourseattendee.course.package.membership']);
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{	// Membership already added - just update status of attendingtrainee record
							// v3.1.209b SUP023104 Was calling wrong step
							oParam.addMembershipStep = 7;
						}
						else
						{	// Membership doesn't exist - let's go and add it.
							oParam.addMembershipStep = 2;
						}
						nsFreshcare.admin.newmemberships.addMembership(oParam);
					}
					else
					{
						sMessage = 'Error finding subscription: ';
						if (oThisTrainee.xhtmlElement)
						{
							delete(oParam.addMembershipStep);
							oParam.traineeDataIndex += 1;
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
					}
				});
			}

			// Add Subscription record
			else if (oParam.addMembershipStep === 2)
			{
				sMessage = 'Adding Subscription record..';
				if (oThisTrainee.xhtmlElement)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
				}
				else {ns1blankspace.status.working(sMessage);}

				var oData = 
				{
					contactbusiness: oThisTrainee['traineecontactbusiness'],
					contactperson: oThisTrainee['traineecontactperson'],
					membership: oThisTrainee['agritrainingcourseattendee.course.package.membership'],
					codeofpractice: oThisTrainee['agritrainingcourseattendee.course.package.codeofpractice'],
					status: nsFreshcare.data.grower.subscriptionStatusTI,
					laststatuschangedate: oThisTrainee['agritrainingcourseattendee.course.coursedate'],
					startdate: oThisTrainee['agritrainingcourseattendee.course.coursedate'],
					harvestmonth: oThisTrainee['harvestmonth'],
					crop: oThisTrainee['crop']
				}

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.addMembershipStep = 3;
							oParam.subscriptionID = oResponse.id;
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else
						{
							sMessage = 'Error adding subscription: ';
							if (oThisTrainee.xhtmlElement)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
								delete(oParam.addMembershipStep);
								oParam.traineeDataIndex += 1;
								nsFreshcare.admin.newmemberships.addMembership(oParam);
							}
							else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
						}
					}
				});
			}

			// Add Category records
			else if (oParam.addMembershipStep === 3)
			{
				if (oThisTrainee.productGroups == undefined)
				{
					// We're processing from the home list so go and find the product groups for this record first
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_SEARCH';
					oSearch.addField('coursetrainee,productcategory,productcategorytext')
					oSearch.addFilter('coursetrainee', 'EQUAL_TO', oThisTrainee.id);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === "OK")
						{
							aTraineeData[oParam.traineeDataIndex].productGroups = oResponse.data.rows;
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else
						{
							sMessage = 'Error finding Categories: ';
							if (oThisTrainee.xhtmlElement)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
								delete(oParam.addMembershipStep);
								oParam.traineeDataIndex += 1;
								nsFreshcare.admin.newmemberships.addMembership(oParam);
							}
							else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
						}
					});					
				}
				
				// we have the product groups, let's add them to the subscription
				else
				{
					sMessage = 'Adding product categories..';
					if (oThisTrainee.xhtmlElement)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
					}
					else {ns1blankspace.status.working(sMessage);}

					if (oParam.categoryIndex == undefined) {oParam.categoryIndex = 0}

					if (oParam.categoryIndex < oThisTrainee.productGroups.length)
					{
						var oThisCategory = oThisTrainee.productGroups[oParam.categoryIndex];
						var oData = 
						{
							subscription: oParam.subscriptionID,
							productcategory: oThisCategory.productcategory
						};

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_PRODUCT_GROUP_MANAGE'),
							data: oData,
							success: function(oResponse)
							{
								oParam.categoryIndex += 1;
								if (oResponse.status === 'OK')
								{
									nsFreshcare.admin.newmemberships.addMembership(oParam);
								}
								else
								{
									sMessage = 'Error adding category: ';
									if (oThisTrainee.xhtmlElement)
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
										if (oParam.categoryIndex >= oThisTrainee.productGroups.length)
										{
											delete(oParam.addMembershipStep);
											oParam.traineeDataIndex += 1;
										}
										nsFreshcare.admin.newmemberships.addMembership(oParam);
									}
									else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
								}
							}
						});
					}
					else
					{
						delete(oParam.categoryIndex);
						oParam.addMembershipStep = 4;
						nsFreshcare.admin.newmemberships.addMembership(oParam);
					}
				}
			}

			// Move site records to Subscription
			else if (oParam.addMembershipStep === 4)
			{
				if (oThisTrainee.sites == undefined)
				{
					// We're processing from the home list so go and find the sites for this record first
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
					oSearch.addField('status,address1,address2,addresssuburb,addressstate,addresspostcode' +
									 ',address.addresslink.object,address.addresslink.objectcontext,address.addresslink.id');
					oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
					oSearch.addFilter('address.addresslink.objectContext', 'EQUAL_TO', oThisTrainee.id);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							aTraineeData[oParam.traineeDataIndex].sites = oResponse.data.rows;
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else
						{
							sMessage = 'Unable to find linked sites: ';
							if (oThisTrainee.xhtmlElement)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
								delete(oParam.addMembershipStep);
								oParam.traineeDataIndex += 1;
								nsFreshcare.admin.newmemberships.addMembership(oParam);
							}
							else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
						}
					});
				}
				
				// we have the sites, let's add them to the subscription
				else
				{
					sMessage = 'Adding sites..';
					if (oThisTrainee.xhtmlElement)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
					}
					else {ns1blankspace.status.working(sMessage);}

					if (oParam.siteIndex == undefined) {oParam.siteIndex = 0}

					if (oParam.siteIndex < oThisTrainee.sites.length)
					{
						var oThisSite = oThisTrainee.sites[oParam.siteIndex];
						var oData = 
						{
							id: oThisSite['address.addresslink.id'],
							object: nsFreshcare.objectSubscription,
							objectContext: oParam.subscriptionID,
							address: oThisSite.id
						};
						
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
							data: oData,
							success: function(oResponse)
							{
								oParam.siteIndex += 1;
								if (oResponse.status === 'OK')
								{
									nsFreshcare.admin.newmemberships.addMembership(oParam);
								}
								else
								{
									sMessage = 'Error adding sites: ';
									if (oThisTrainee.xhtmlElement)
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
										if (oParam.siteIndex >= oThisTrainee.sites[oParam.siteIndex])
										{
											delete(oParam.addMembershipStep);
											oParam.traineeDataIndex += 1;
										}
									}
									else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
								}
							}
						});
					}
					else
					{
						delete(oParam.siteIndex);
						oParam.addMembershipStep = 5;
						nsFreshcare.admin.newmemberships.addMembership(oParam);
					}
				}
			}

			// Move Scope records to Subscription
			// v3.1.2 SUP022744 Added
			else if (oParam.addMembershipStep === 5)
			{
				if (oThisTrainee.scopes == undefined)
				{
					// We're processing from the home list so go and find the SCopes for this record first
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
					oSearch.addField('scope,scopetext,object,objectcontext');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
					oSearch.addFilter('objectContext', 'EQUAL_TO', oThisTrainee.id);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							aTraineeData[oParam.traineeDataIndex].scopes = oResponse.data.rows;
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else
						{
							sMessage = 'Unable to find linked scopes: ';
							if (oThisTrainee.xhtmlElement)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
								delete(oParam.addMembershipStep);
								oParam.traineeDataIndex += 1;
								nsFreshcare.admin.newmemberships.addMembership(oParam);
							}
							else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
						}
					});
				}
				
				// we have the scopes, let's add them to the subscription
				else
				{
					sMessage = 'Adding scopes..';
					if (oThisTrainee.xhtmlElement)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
					}
					else {ns1blankspace.status.working(sMessage);}

					if (oParam.scopeIndex == undefined) {oParam.scopeIndex = 0}

					if (oParam.scopeIndex < oThisTrainee.scopes.length)
					{
						var oThisScope = oThisTrainee.scopes[oParam.scopeIndex];
						var oData = 
						{
							id: oThisScope.id,
							object: nsFreshcare.objectSubscription,
							objectContext: oParam.subscriptionID,
							scope: oThisScope.scope
						};
						
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
							data: oData,
							success: function(oResponse)
							{
								oParam.scopeIndex += 1;
								if (oResponse.status === 'OK')
								{
									nsFreshcare.admin.newmemberships.addMembership(oParam);
								}
								else
								{
									sMessage = 'Error adding scopes: ';
									if (oThisTrainee.xhtmlElement)
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
										if (oParam.scopeIndex >= oThisTrainee.scopes[oParam.scopeIndex])
										{
											delete(oParam.addMembershipStep);
											oParam.traineeDataIndex += 1;
										}
									}
									else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
								}
							}
						});
					}
					else
					{
						delete(oParam.scopeIndex);
						oParam.addMembershipStep = 6;
						nsFreshcare.admin.newmemberships.addMembership(oParam);
					}
				}
			}

			// Add Status Transaction record
			else if (oParam.addMembershipStep === 6)
			{
				sMessage = 'Adding Status Transaction..';
				if (oThisTrainee.xhtmlElement)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
				}
				else {ns1blankspace.status.working(sMessage);}

				var oData = 
				{
					subscription: oParam.subscriptionID,
					changedate: oThisTrainee['agritrainingcourseattendee.course.coursedate'],
					tostatus: nsFreshcare.data.grower.subscriptionStatusTI,
					changecontactbusiness: ns1blankspace.user.contactBusiness,
					changecontactperson: ns1blankspace.user.contactPerson
				};

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.addMembershipStep = 7;
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else
						{
							sMessage = 'Error adding status transaction: ';
							if (oThisTrainee.xhtmlElement)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
								delete(oParam.addMembershipStep);
								oParam.traineeDataIndex += 1;
								nsFreshcare.admin.newmemberships.addMembership(oParam);
							}
							else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
						}
					}
				});
			}

			// Change Status of Course Attendee record
			else if (oParam.addMembershipStep === 7)
			{
				sMessage = 'Updating trainee record..';
				if (oThisTrainee.xhtmlElement)
				{
					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, statusMessage: sMessage});
				}
				else {ns1blankspace.status.working(sMessage);}

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
					data: 'id=' + oThisTrainee.id + '&status=' + nsFreshcare.data.trainingCourse.attendeeStatusAttended,
					success: function(oResponse)
					{
						delete(oParam.addMembershipStep);
						if (oResponse.status === 'OK')
						{
							delete(oParam.subscriptionID);
							oParam.traineeDataIndex += 1

							if (oThisTrainee.xhtmlElement)
							{	// We're processing from the Home list so remove the row
								$(oThisTrainee.xhtmlElement).parent().parent().hide();
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, remove: true});
							}
							nsFreshcare.admin.newmemberships.addMembership(oParam);
						}
						else
						{
							sMessage = 'Error updating Trainee record: ';
							if (oThisTrainee.xhtmlElement)
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisTrainee.xhtmlElement, errorMessage: sMessage, errorNotes: oResponse.error.errornotes});
								oParam.traineeDataIndex += 1;
								nsFreshcare.admin.newmemberships.addMembership(oParam);
							}
							else {ns1blankspace.status.error(sMessage + oResponse.error.errornotes)}
						}
					}
				});
			}
		}
		else
		{
			nsFreshcare.admin.newmemberships.init({showHome: true});
		}
	}
}