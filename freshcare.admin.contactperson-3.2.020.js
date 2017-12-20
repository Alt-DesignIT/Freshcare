/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.contactPerson = 
{
	data: {},
	access: function(oParam)
	{
		var oNS = nsFreshcare.data.roles;
		
		var aAccess =
		[
			{
				tab: 'Summary',
				create: [oNS.admin, oNS.internalAuditor],
				retrieve: [oNS.admin, oNS.internalAuditor, oNS.xeroSuperUser],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Details', 
				create: [oNS.admin, oNS.internalAuditor],
				retrieve: [oNS.admin, oNS.internalAuditor, oNS.xeroSuperUser],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Address',
				create: [oNS.admin, oNS.internalAuditor],
				retrieve: [oNS.admin, oNS.internalAuditor, oNS.xeroSuperUser],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Personal',
				create: [oNS.admin, oNS.internalAuditor],
				retrieve: [oNS.admin, oNS.internalAuditor, oNS.xeroSuperUser],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Groups',
				create: [],
				retrieve: [oNS.admin, oNS.internalAuditor],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Business',
				create: [],
				retrieve: [oNS.admin, oNS.internalAuditor, oNS.xeroSuperUser],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				// v3.2.020 SUP023422 Added COP Based Training
				tab: 'Training',
				create: [],
				retrieve: [oNS.admin, oNS.internalAuditor],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Xero',
				create: [],
				retrieve: [oNS.admin, oNS.xeroSuperUser],
				update: [oNS.xeroSuperUser],
				"delete": [oNS.admin]
			},
			{
				tab: 'Emails',
				create: [],
				retrieve: [oNS.admin, oNS.internalAuditor],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Actions',
				create: [],
				retrieve: [oNS.admin, oNS.internalAuditor],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			},
			{
				tab: 'Attachments',
				create: [],
				retrieve: [oNS.admin, oNS.internalAuditor],
				update: [oNS.admin, oNS.internalAuditor],
				"delete": [oNS.admin]
			}
		];
		return aAccess;
	},

	init: function(oParam)
	{
		if (oParam === undefined) {oParam = {}} 
		if (ns1blankspace.data.render === undefined) {ns1blankspace.data.render = {}} 

		//$.extend(oParam, {renderObject: nsFreshcare.admin.contactPerson.render});
		ns1blankspace.data.render = nsFreshcare.admin.contactPerson.render;
		//ns1blankspace.data.render.rootNameSpaceText = 'nsFreshcare';
		nsFreshcare.render.form.init(oParam);
	},

	home: function(oParam, oResponse)
	{
		if (oParam === undefined) {oParam = {}}

		$.extend(oParam, {renderObject: nsFreshcare.admin.contactPerson.render});
		nsFreshcare.render.form.home(oParam);
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
			//var oParam = Object.create(nsFreshcare.admin.contactPerson.render);

			var aSearch = sXHTMLElementId.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[1];
			var iMinimumLength = 0;
			var iSource = ns1blankspace.data.searchSource.text;
			var sSearchText;
			var iMaximumColumns = 1;
			
			if (oParam != undefined)
			{
				if (oParam.source != undefined) {iSource = oParam.source}
				if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
				if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
				if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
			}
			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_PERSON_SEARCH';
				oSearch.addField('firstname,surname,contactbusiness,contactbusinesstext,title,titletext,position,workphone,fax,mobile,email,' +
										 'customerstatus,customerstatustext,supplierstatus,supplierstatustext,gender,gendertext,sendnews,contactperson.primarycontactfor.id,' +
										 'streetaddress1,streetaddress2,streetsuburb,streetstate,streetpostcode,streetcountry,' +
										 'mailingaddress1,mailingaddress2,mailingsuburb,mailingstate,mailingpostcode,mailingcountry,notes,' +
										 'dateofbirth,rating,ratingtext,numberofchildren,otherfamilydetails,etag,contactperson.user.id,signature');

				oSearch.addField(ns1blankspace.option.auditFields);

				oSearch.addField(ns1blankspace.extend.elements());

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.admin.contactPerson.show(oParam, data)});
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
					ns1blankspace.search.start();
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_SEARCH';
					oSearch.addField('firstname,surname,contactbusinesstext');
					
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						if (sSearchText != 'ALL')
						{
							oSearch.addBracket('(');
							oSearch.addFilter('firstname', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('surname', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addBracket(')');
						}
					}
					else 
					{	
						var aSearchText = sSearchText.split(' ');

						if (aSearchText.length > 1)
						{
							oSearch.addFilter('firstname', 'TEXT_STARTS_WITH', aSearchText[0]);
							oSearch.addFilter('surname', 'TEXT_STARTS_WITH', aSearchText[1]);
						}
						else
						{
							oSearch.addBracket('(');
							oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addBracket(')');
						}
					}	
					oSearch.sort('firstname', 'asc');
					oSearch.sort('surname', 'asc');
					oSearch.sort('contactbusinesstext', 'asc');
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.getResults(function(data) {nsFreshcare.admin.contactPerson.search.process(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var iColumn = 0;
			var aHTML = [];
			var	iMaximumColumns = 1;
				
			ns1blankspace.search.stop();
				
			if (oResponse.data.rows.length == 0)
			{
				$(ns1blankspace.xhtml.searchContainer).html('<table class="ns1blankspaceSearchMedium"><tr><td class="ns1blankspaceSubNote">Nothing to show</td></tr></table>');
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
					
					// v3.1.0b SUP022213 Added contactbusinesstext to search
					aHTML.push('<td class="ns1blankspaceSearch" id="contactperson' +
									'-' + this.id + '">' +
									this.firstname + ' ' + this.surname +
									'</td>');
					
					aHTML.push('<td class="ns1blankspaceSearch" id="contactbusiness' +
									'-' + this.id + '">' +
									this.contactbusinesstext + '</td>');
									
					if (iColumn == iMaximumColumns)
					{
						aHTML.push('</tr>');
						iColumn = 0;
					}	
				});
		    	
				aHTML.push('</table>');

				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init(
					{
						html: aHTML.join(''),
						more: (oResponse.morerows == "true"),
						header: false
					}) 
				);		
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.admin.contactPerson.search.send(event.target.id, {source: 1});
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows and 1st & 2nd page of results now match formats
				ns1blankspace.render.bind(
				{
					columns: 'firstname-space-surname-column-contactbusinesstext',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.contactPerson.search.send
				});   
			}	
		}
	},						

	layout: function(oParam)
	{
		if (oParam === undefined) {oParam = {}} 
		$.extend(oParam, {renderObject: nsFreshcare.admin.contactPerson.render});
		nsFreshcare.render.form.layout(oParam);
	},

	show: 	function (oParam, oResponse)
	{
		ns1blankspace.app.clean();
		nsFreshcare.admin.contactPerson.layout();
		
		var aHTML = [];
		
		if (oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find contact person.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			$('#ns1blankspaceViewControlActionOptions').unbind('click');
			$('#ns1blankspaceViewControlActionOptions').on('click', function()
			{
				if (oParam == undefined) {oParam = {}}
				if ($(this).attr("disabled") != 'disabled')
				{
					oParam.element = this;
					oParam.xhtml = undefined;
					oParam.namespace = nsFreshcare.admin.contactPerson;
					namespaceText: 'nsFreshcare.admin.contactPerson';
					ns1blankspace.app.options.show(oParam);
				}	
			});
			ns1blankspace.objectContextData = oResponse.data.rows[0];
			
			ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData.contactbusiness;
			ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData.contactbusinesstext
			ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData.firstname + ' ' + ns1blankspace.objectContextData.surname;
			ns1blankspace.objectContextData.primarycontact = (ns1blankspace.objectContextData['contactperson.primarycontactfor.id'] != '' ? '1' : '0');

			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.firstname + 
						(ns1blankspace.objectContextData.firstname!==''?'<br />':'') + ns1blankspace.objectContextData.surname);
			$('#ns1blankspaceViewControlAction').button({disabled: false});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			
			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.admin.contactPerson.init({id: ' + ns1blankspace.objectContext + '})',
				move: false
			});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.render.form.tabs.show({name: "Summary"})'});
		}	
	},	

	details: function(oParam)
	{	//v3.1.0i SUP022247 added function
		nsFreshcare.render.form.tabs.show({name: 'Details'});
	},

	save:
	{
		send: function()
		{
			var oParam = $.extend({}, {renderObject: nsFreshcare.admin.contactPerson.render});
			nsFreshcare.admin.contactPerson.render.functionSave(oParam);
		}
	},
		
	isFavourite: function()
	{
		if (nsFreshcare.admin.contactPerson.data.isFavourite == undefined)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CORE_FAVOURITE_SEARCH';
			oSearch.addField('object,objectcontext');
			oSearch.addFilter('object', 'EQUAL_TO', ns1blankspace.object);
			oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.async = false;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					nsFreshcare.admin.contactPerson.data.isFavourite = (oResponse.data.rows.length > 0);
					nsFreshcare.admin.contactPerson.data.favouriteID = (oResponse.data.rows.length > 0 ? oResponse.data.rows[0].id : undefined);
				}
				else
				{
					ns1blankspace.status.error("Unable to determine Favourite status: " + oResponse.error.errornotes);
				}
			});
		}

	},

	functionCheckAccess: function(oParam)
	{
		oParam = oParam || {};
		var aTabs = ns1blankspace.util.getParam(oParam, 'tabs', {'default': []}).value;
		return nsFreshcare.util.roleHasAccess({access: nsFreshcare.admin.contactPerson.access, tabs: aTabs});
	},

	markAsFavourite: function()
	{
		var sData = '';
		var sAction = (nsFreshcare.admin.contactPerson.data.isFavourite === true ? 'un' : '');

		// We need to unmark and we should also have a favouriteID
		if (nsFreshcare.admin.contactPerson.data.isFavourite === true)
		{
			sData += 'remove=1&id=' + nsFreshcare.admin.contactPerson.data.favouriteID;
		}
		else
		{
			sData += 'object=' + ns1blankspace.object + '&objectcontext=' + ns1blankspace.objectContext;
		}
		
		$.ajax(
		{
			type: 'POST',
			url: ns1blankspace.util.endpointURI('CORE_FAVOURITE_MANAGE'),
			data: 'remove=1&id=' + nsFreshcare.admin.contactPerson.data.favouriteID,
			success: function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					ns1blankspace.status.message("Is " + (sAction == 'un' ? "now" : "no longer") + " a favourite");
					nsFreshcare.admin.contactPerson.data.isFavourite = !nsFreshcare.admin.contactPerson.data.isFavourite;
					nsFreshcare.render.form.tabs.show($.grep(nsFreshcare.admin.contactPerson.render.tabs, function(x) {return x.name == 'Summary'}).shift());
				}
				else
				{
					ns1blankspace.status.error("Unable to " + sAction + "mark as Favourite: " + oResponse.error.errornotes);
				}
			}
		});
	},
	training:
	{

		// v3.2.020 SUP023422 Added COP Based Training
		show: function(oParam)
		{
			var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'contactbusiness'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
			var aHTML = [];

			if (oResponse === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TRAINEE_ATTENDANCE_LINK_SEARCH';
				oSearch.addField('agritraineeattendancelink.attendee.course.coursedate' +
								',agritraineeattendancelink.attendee.course.trainercontactbusinesstext' +
								',agritraineeattendancelink.attendee.course.trainercontactpersontext' +
								',agritraineeattendancelink.attendee.course.package.membership.code' +
								',agritraineeattendancelink.attendee.course.package.codeofpracticetext' +
								',contactbusinesstext');		//,attendeecount
				oSearch.rows = ns1blankspace.option.defaultRows;
				oSearch.sort(sSortColumn, sSortDirection);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						aHTML = [];
				
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table border="0" cellspacing="0" cellpadding="0" width="750" style="margin-top:15px); margin-bottom:15px);">');
							aHTML.push('<tr>');
							aHTML.push('<td class="ns1blankspaceNothing">No training.</td>');
							aHTML.push('</tr>');
							aHTML.push('</table>');

							$('#ns1blankspaceTrainingColumn1').html(aHTML.join(''));		
						}
						else
						{
							aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceTrainingColumn1" class="ns1blankspaceColumn1Large">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'<td id="ns1blankspaceTrainingColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
							'</td>' +
							'</tr>' +
							'</table>');				
				
							$('#' + sXHTMLElementID).html(aHTML.join(''));
							
							var aHTML = [];
							
							aHTML.push('<table class="ns1blankspaceColumn2">');
							
							aHTML.push('<tr><td>' +
											'<span id="ns1blankspaceTrainingAdd" class="ns1blankspaceAction">Add</span>' +
											'</td></tr>');
											
							aHTML.push('</table>');					
							
							$('#ns1blankspaceTrainingColumn2').html(aHTML.join(''));
							
							$('#ns1blankspaceTrainingAdd')
								.button(
								{
									label: "Add Training"
								})
								.click(function() 
								{
									nsFreshcare.admin.trainer.addTrainingCourse();
								});
							
							
							aHTML = [];
					
						
							aHTML.push('<table border="0" cellspacing="0" cellpadding="0" class="ns1blankspace">');
							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
											' data-column="coursedate"' +
											' data-sortdirection="' + ((sSortColumn == "coursedate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
											'>Training Date</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
											' data-column="contactbusiness"' +
											' data-sortdirection="' + ((sSortColumn == "contactbusiness") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
											'>Trainer Business</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
											' data-column="contactpersontext"' +
											' data-sortdirection="' + ((sSortColumn == "contactpersontext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
											'>Trainer Person</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
											' data-column="membershipcode"' +
											' data-sortdirection="' + ((sSortColumn == "membershipcode") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
											'>Membership + COP</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
											' data-column="contactbusinesstext"' +
											' data-sortdirection="' + ((sSortColumn == "contactbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
											'>Business</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
							aHTML.push('</tr>');
							
							$.each(oResponse.data.rows, function()
							{
								aHTML.push(nsFreshcare.admin.contactPerson.training.row(this));
							});
							
							aHTML.push('</table>');
							
							ns1blankspace.render.page.show(
							{
								xhtmlElementID: 'ns1blankspaceTrainingColumn1',
								xhtmlContext: 'Training',
								xhtml: aHTML.join(''),
								showMore: (oResponse.morerows == "true"),
								more: oResponse.moreid,
								rows: ns1blankspace.option.defaultRows,
								functionShowRow: nsFreshcare.admin.contactPerson.training.row,
								functionNewPage: 'nsFreshcare.admin.contactPerson.training.bind()',
								type: 'json'
							}); 	
							
							nsFreshcare.admin.contactPerson.training.bind();
						}
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}
		},
		row: function(oRow)
		{
			// v3.2.020 SUP023422 Added COP Based Training
			var aHTML = [];
			aHTML.push('<tr id="ns1blankspaceTraining-' + oRow.id + '">');

			aHTML.push('<td id="ns1blankspaceTraining_coursedate-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow['agritraineeattendancelink.attendee.course.coursedate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceTraining_contactbusiness-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow['agritraineeattendancelink.attendee.course.trainercontactbusinesstext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceTraining_contactpersontext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow['agritraineeattendancelink.attendee.course.trainercontactpersontext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceTraining_membershipcode-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow['agritraineeattendancelink.attendee.course.package.membership.code'] + ' + ' + oRow['agritraineeattendancelink.attendee.course.package.codeofpracticetext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceTraining_contactbusinesstext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow['contactbusinesstext'] + '</td>');
			aHTML.push('<td id="ns1blankspaceTraining_select-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceSelect">' +
							'&nbsp;</td>');

			aHTML.push('</tr>');

			return aHTML.join('');
		},
		bind: function()
		{
			// v3.2.020 SUP023422 Added COP Based Training
			$('.ns1blankspaceHeaderSort')
				.on('click', function(event)
				{
					var oParam = 
					{
						xhtmlElementID: 'ns1blankspaceMainTraining',
						sortColumn: $(this).attr('data-column'),
						sortDirection: $(this).attr('data-sortdirection')
					}

					$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
					nsFreshcare.admin.contactPerson.training.show(oParam);
				})
				.css('cursor', 'pointer')

			$('.ns1blankspaceSelect')
				.button(
				{
					text: false,
					label: 'Open',
					icons: {primary: 'ui-icon-play'}
				})
				.on('click', function(event)
				{
					var sCourseId = this.id.split('-').pop();

					if (sCourseId)
					{
						nsFreshcare.admin.training.init({id: sCourseId});
					}
				})
				.css('height', '25px')
				.css('width', '25px');
		}
	}
}

nsFreshcare.admin.contactPerson.render =
{
	objectMethod: 'CONTACT_PERSON',
	label: 'Person',
	object: 32,
	objectName: 'contactPerson',
	objectParentName: 'admin',
	viewName: 'People',
	rootNamespace: nsFreshcare,
	rootNameSpaceText: 'nsFreshcare',
	postInit: function(oParam) 
	{
		ns1blankspace.contactPerson.data = {}, 
		ns1blankspace.data.contactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness').value;
		ns1blankspace.data.contactBusinessText = ns1blankspace.util.getParam(oParam, 'contactBusinessText').value;
	},
	functionSave: function(oParam)
	{
		nsFreshcare.render.form.save.send(oParam)
	},
	home: 
	{
		functionShow: function(oParam, oResponse)
		{
			nsFreshcare.render.form.home(oParam, oResponse);
		},
		control:
		[
			{
				name: 'Favourites', label: 'Favourites', 
				onClick: function() 
				{
					ns1blankspace.show({refresh: true});
					ns1blankspace.contactPerson.favourites.show({xhtmlElementID: "ns1blankspaceMain"});
				}
			},
			{
				name: 'ByGroup', label: 'Groups', 
				onClick: function() 
				{
					ns1blankspace.show({refresh: true});
					ns1blankspace.contactPerson.groups.search.show();
				}
			}
		],
		search:
		{
			fields: 'firstname,surname,contactbusinesstext,modifieddate',
			rows: 50,
			sorts:
			[
				{name: 'modifieddate', direction: 'desc'}
			]
		},
		display:
		{
			textOnNone: "Click New to create a Person Contact",
			titleText: 'MOST RECENTLY UPDATED',
			sortHeaders: true,
			columns:
			[
				{name: 'FirstName', label: 'First Name', column: 'firstname'},
				{name: "Surname", label: 'Surname', column: 'surname'},
				{name: "ContactBusinessText", label: 'Business', column: 'contactbusinesstext'},
				{name: 'LastModified', label: 'Last Updated', column: 'modifieddate', defaultSort: true, defaultSortDirection: 'desc'}
			],
			onClick: function(oParam) 
			{
				var sXHTMLElementId = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;

				nsFreshcare.admin.contactPerson.search.send(sXHTMLElementId, $.extend({source: 1}, {object: oParam.object}));
			}
		}
	},
	search:
	{
		viewportParameters:
		{
			fields: "firstname,surname,contactbusiness,contactbusinesstext" +
					ns1blankspace.option.auditFields,
			filters: 
			[
				{name: 'firstname', comparison: 'TEXT_IS_LIKE'}
			]
		},
		rowParameters:
		{	// v3.2.010 SUP023329 Only search xero fields if option is set
			fields: "firstname,surname,contactbusiness,contactbusinesstext,title,titletext,position,workphone,fax,mobile,email," +
					"customerstatus,customerstatustext,supplierstatus,supplierstatustext,gender,gendertext,sendnews,signature" +
					"streetaddress1,streetaddress2,streetsuburb,streetstate,streetpostcode,streetcountry," +
					"mailingaddress1,mailingaddress2,mailingsuburb,mailingstate,mailingpostcode,mailingcountry,notes," +
					"dateofbirth,rating,ratingtext,numberofchildren,otherfamilydetails,etag,contactperson.user.id" +
					(nsFreshcare.option.exportToXero ? ",sexeropersonid,sexeropersonupdated," : '') +
					ns1blankspace.option.auditFields,
			functionShow: function(oParam, oResponse) 
			{
				nsFreshcare.admin.contactPerson.show(oParam, oResponse);
			}
		}
	},
	tabs:
	[	/* v3.2.001 SUP023329 Now restricts access based on nsFreshcare.admin.contactPerson.access */
		{
			name: 'Summary',
			label: "Summary",
			showOnNew: false,
			defaultOnExisting: true,
			functionClick: function(oParam)
			{
				nsFreshcare.render.form.tabs.show(oParam);
				ns1blankspace.app.context(
				{
					inContext: false,
					'new': !nsFreshcare.util.roleHasAccess({action: 'create', access: nsFreshcare.admin.contactPerson.access, tabs: ['Summary']}),
					action: !nsFreshcare.util.roleHasAccess({action: 'update', access: nsFreshcare.admin.contactPerson.access, tabs: ['Summary']}),
					actionOptions: !nsFreshcare.util.roleHasAccess({action: 'delete', access: nsFreshcare.admin.contactPerson.access, tabs: ['Summary']}),
				});
			},
			columns: 
			[
				{id: 1, class: 'ns1blankspaceColumn1Flexible'},
				{id: 2, class: "ns1blankspaceColumn2", style: "width:247px;"}
			],
			fields:
			[
				{
					name: "Business",
					label: "Business Name",
					type: ns1blankspace.option.typeReadOnly,
					displayColumn: 1,
					column: 'contactbusinesstext'
				},
				{
					name: "Phone",
					label: "Phone",
					type: ns1blankspace.option.typeReadOnly,
					displayColumn: 1,
					column: 'workphone'
				},
				{
					name: "ModifiedDate",
					label: "Last Updated",
					type: ns1blankspace.option.typeReadOnly,
					displayColumn: 1,
					column: 'modifieddate'
				},
				{
					name: "ModifiedBy",
					label: "Updated By",
					type: ns1blankspace.option.typeReadOnly,
					displayColumn: 1,
					column: 'modifiedusertext'
				},
				{
					name: "FavouriteMark",
					label: "Mark As Favourite",
					style: 'font-size:0.75em; width:100px;',
					type: ns1blankspace.option.typeButton,
					displayColumn: 2,
					displayCondition: function() {return !nsFreshcare.admin.contactPerson.data.isFavourite},
					buttonClick: function() {nsFreshcare.admin.contactPerson.markAsFavourite()}
				},
				{
					name: "FavouriteUnMark",
					label: "Favourite",
					style: 'font-size:0.75em; width:100px;',
					type: ns1blankspace.option.typeButton,
					displayColumn: 2,
					displayCondition: function() {return nsFreshcare.admin.contactPerson.data.isFavourite},
					buttonOptions: {icons: {primary: 'ui-icon-star'}, label: "Favourite"},
					buttonStyles: [{name: 'font-size', value: '0.75em'}, {name: 'width', value: '100px'}],
					buttonClick: function() {nsFreshcare.admin.contactPerson.markAsFavourite()}
				},
				{
					displayColumn: 2,
					name: 'filler',
					type: ns1blankspace.option.typeFiller,
					html: '<tr><td style="padding-top:12px; padding-bottom:5px;">&nbsp;</td></tr>'
				},
				{
					name: "SendEmail",
					label: "Send Email",
					style: 'font-size:0.75em; width:100px;',
					type: ns1blankspace.option.typeButton,
					displayColumn: 2,
					displayCondition: function() {return ns1blankspace.objectContextData && ns1blankspace.objectContextData["email"] != ""},
					buttonOptions: {icons: {primary: 'ui-icon-mail-closed'}, label: "Send email"},
					buttonStyles: [{name: 'font-size', value: '0.75em'}, {name: 'width', value: '100px'}],
					buttonClick: function()
					{
						ns1blankspace.messaging.imap.init(
						{
							action: 1,
							emailTo: ns1blankspace.objectContextData.email,
							contactPersonTo: ns1blankspace.objectContextData.id,
							object: 32,
							objectContext: ns1blankspace.objectContextData.id
						});
					}
				},
				{
					name: "Email",
					type: ns1blankspace.option.typeReadOnly,
					displayColumn: 2,
					style: "font-size: 0.875em;",
					displayCondition: function() {return ns1blankspace.objectContextData && ns1blankspace.objectContextData["email"] != ""},
					column: function() {return (ns1blankspace.objectContextData.email != "" ? ns1blankspace.objectContextData.email.split('@').join('<br />@') : '')}
				},
				{
					displayColumn: 2,
					name: 'filler',
					type: ns1blankspace.option.typeFiller,
					html: '<tr><td style="padding-top:12px; padding-bottom:5px;">&nbsp;</td></tr>'
				},
				{
					name: "SendSMS",
					label: "Send SMS",
					style: 'font-size:0.75em; width:100px;',
					type: ns1blankspace.option.typeButton,
					displayColumn: 2,
					displayCondition: function() {return ns1blankspace.objectContextData && ns1blankspace.objectContextData["mobile"] != ""},
					buttonOptions: {icons: {primary: 'ui-icon-comment'}, label: "Send SMS"},
					buttonStyles: [{name: 'font-size', value: '0.75em'}, {name: 'width', value: '100px'}],
					buttonClick: function() {ns1blankspace.contactPerson.sms.show}
				},
				{
					name: "SMS",
					type: ns1blankspace.option.typeReadOnly,
					style: "font-size: 0.875em;",
					displayCondition: function() {return ns1blankspace.objectContextData && ns1blankspace.objectContextData["mobile"] != ""},
					column: "mobile",
				}
			]
		},
		{	/* v3.1.205 SUP023032 PrimaryContact defaults to False */
			name: 'Details',
			label: "Details",
			showOnNew: true,
			defaultOnNew: true,
			save: {root: true},
			functionClick: function(oParam)
			{
				nsFreshcare.render.form.tabs.show(oParam);
				ns1blankspace.app.context(
				{
					inContext: false,
					'new': !nsFreshcare.util.roleHasAccess({action: 'create', access: nsFreshcare.admin.contactPerson.access, tabs: ['Details']}),
					action: !nsFreshcare.util.roleHasAccess({action: 'update', access: nsFreshcare.admin.contactPerson.access, tabs: ['Details']}),
					actionOptions: !nsFreshcare.util.roleHasAccess({action: 'delete', access: nsFreshcare.admin.contactPerson.access, tabs: ['Details']}),
				});
			},
			columns: 
			[
				{id: 1, class: 'ns1blankspaceColumn1'},
				{id: 2, class: "ns1blankspaceColumn2"}
			],
			fields:
			[
				{
					name: "FirstName",
					label: "First Name",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'firstname',
					inputType: 'Text'
				},
				{
					name: "Surname",
					label: "Surname",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'surname',
					inputType: 'Text',
					mandatory: true
				},
				{
					name: "Title",
					label: "Title",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'title',
					inputType: 'Select',
					method: 'SETUP_CONTACT_TITLE_SEARCH'
				},
				{
					name: "Position",
					label: "Position",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'position',
					inputType: 'Text'
				},
				{
					name: "Email",
					label: "Email",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'email',
					inputType: 'Text'
				},
				{
					name: "Phone",
					label: "Phone",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'workphone',
					inputType: 'Text'
				},
				{
					name: "Mobile",
					label: "Mobile",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'mobile',
					inputType: 'Text'
				},
				{
					name: "Fax",
					label: "Fax",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'fax',
					inputType: 'Text'
				},
				{
					name: "CustomerStatus",
					label: "Customer Status",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'customerstatus',
					inputType: 'Select',
					method: 'SETUP_CONTACT_STATUS_SEARCH'
				},
				{
					name: "SupplierStatus",
					label: "Supplier Status",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'supplierstatus',
					inputType: 'Select',
					method: 'SETUP_CONTACT_STATUS_SEARCH'
				},
				{
					name: "Description",
					label: "Description / Notes",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'notes',
					inputType: 'TextMulti'
				},
				{
					name: "SendNews",
					label: "Send News?",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'sendnews',
					inputType: 'Radio',
					radioOptions: 
					{
						separator: "&nbsp;", 
						values: 
						[ 
							{label: 'Yes', value: "Y", "default": true}, 
							{label: 'No', value: "N"}
						]
					}
				},
				{
					name: "PrimaryContact",
					label: "Primary Contact?",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'primarycontact',
					inputType: 'Radio',
					radioOptions: 
					{
						separator: "&nbsp;", 
						values: 
						[ 
							{label: 'Yes', value: "1"}, 
							{label: 'No', value: "0", "default": true}
						]
					}
				},
				{	/* v3.1.0i SUP022247 added objectContextData condition to displayCondition */
					name: "EmailSignature",
					label: "Email Signature",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'signature',
					inputType: 'TextMultiSmall',
					displayCondition: function() {return ns1blankspace.objectContextData && ns1blankspace.objectContextData['contactperson.user.id'] != ''} 
				}
			]
		},
		{
			name: 'Address',
			label: 'Address',
			showOnNew: true,
			save: {root: true},
			functionClick: function(oParam)
			{
				nsFreshcare.render.form.tabs.show(oParam);
				ns1blankspace.app.context(
				{
					inContext: false,
					'new': !nsFreshcare.util.roleHasAccess({action: 'create', access: nsFreshcare.admin.contactPerson.access, tabs: ['Address']}),
					action: !nsFreshcare.util.roleHasAccess({action: 'update', access: nsFreshcare.admin.contactPerson.access, tabs: ['Address']}),
					actionOptions: !nsFreshcare.util.roleHasAccess({action: 'delete', access: nsFreshcare.admin.contactPerson.access, tabs: ['Address']}),
				});
			},
			columns: 
			[
				{id: 1, class: 'ns1blankspaceColumn1'},
				{id: 2, class: "ns1blankspaceColumn2"}
			],
			fields:
			[
				{
					name: "StreetAddress1",
					label: "Street",
					caption: "Street Address line 1",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'streetaddress1',
					inputType: 'Text'
				},
				{
					name: "StreetAddress2",
					caption: "Street Address line 1",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'streetaddress2',
					inputType: 'Text'
				},
				{
					name: "StreetSuburb",
					label: "Suburb",
					caption: "Street Suburb",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'streetsuburb',
					inputType: 'Text',
					extraClass: "ns1blankspaceSelectAddress"
				},
				{
					name: "StreetState",
					label: "State",
					caption: "Street State",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'streetstate',
					inputType: 'Text'
				},
				{
					name: "StreetPostCode",
					label: "Post Code",
					caption: "Street Post Code",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'streetpostcode',
					inputType: 'Text'
				},
				{
					name: "filler",
					displayColumn: 1,
					type: ns1blankspace.option.typeFiller,
					html: "<tr><td>&nbsp;</td></tr>"
				},
				{
					name: "Copy",
					label: "Copy to Mailing Address",
					type: ns1blankspace.option.typeButton,
					displayColumn: 1,
					inputType: "Button",
					style: "font-size: 0.825em;",
					buttonClick: function()
					{
						$('#ns1blankspaceAddressMailingAddress1').val($('#ns1blankspaceAddressStreetAddress1').val());
						$('#ns1blankspaceAddressMailingAddress2').val($('#ns1blankspaceAddressStreetAddress2').val());
						$('#ns1blankspaceAddressMailingSuburb').val($('#ns1blankspaceAddressStreetSuburb').val());
						$('#ns1blankspaceAddressMailingState').val($('#ns1blankspaceAddressStreetState').val());
						$('#ns1blankspaceAddressMailingPostCode').val($('#ns1blankspaceAddressStreetPostCode').val());
						$('#ns1blankspaceAddressMailingCountry').val($('#ns1blankspaceAddressStreetCountry').val());
					}
				},
				{
					name: "MailingAddress1",
					label: "Mailing",
					caption: "Mailing Address line 1",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'mailingaddress1',
					inputType: 'Text'
				},
				{
					name: "MailingAddress2",
					caption: "Mailing Address line 1",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'mailingaddress2',
					inputType: 'Text'
				},
				{
					name: "MailingSuburb",
					label: "Suburb",
					caption: "Mailing Suburb",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'mailingsuburb',
					inputType: 'Text',
					extraClass: "ns1blankspaceSelectAddress"
				},
				{
					name: "MailingState",
					label: "State",
					caption: "Mailing State",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'mailingstate',
					inputType: 'Text'
				},
				{
					name: "MailingPostCode",
					label: "Post Code",
					caption: "Mailing Post Code",
					type: ns1blankspace.option.typeInput,
					displayColumn: 2,
					column: 'mailingpostcode',
					inputType: 'Text'
				},
				{
					name: "filler",
					displayColumn: 2,
					type: ns1blankspace.option.typeFiller,
					html: "<tr><td>&nbsp;</td></tr>"
				},
				{
					name: "filler",
					displayColumn: 2,
					type: ns1blankspace.option.typeFiller,
					html: "<tr><td>&nbsp;</td></tr>"
				}
			]
		},
		{
			name: 'Personal',
			label: 'Personal',
			showOnNew: true,
			breakAfter: true,
			save: {root: true},
			functionClick: function(oParam)
			{
				nsFreshcare.render.form.tabs.show(oParam);
				ns1blankspace.app.context(
				{
					inContext: false,
					'new': !nsFreshcare.util.roleHasAccess({action: 'create', access: nsFreshcare.admin.contactPerson.access, tabs: ['Personal']}),
					action: !nsFreshcare.util.roleHasAccess({action: 'update', access: nsFreshcare.admin.contactPerson.access, tabs: ['Personal']}),
					actionOptions: !nsFreshcare.util.roleHasAccess({action: 'delete', access: nsFreshcare.admin.contactPerson.access, tabs: ['Personal']}),
				});
			},
			columns: 
			[
				{id: 1, class: 'ns1blankspaceColumn1'},
				{id: 2, class: "ns1blankspaceColumn2"}
			],
			fields:
			[
				{
					name: "DateOfBirth",
					label: "Date of Birth",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'dateofbirth',
					inputType: 'Date'
				},
				{
					name: "Children",
					label: "Number of Children",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'numberofchildren',
					inputType: 'Text'
				},
				{
					name: "Other",
					label: "Other Details",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'otherfamilydetails',
					inputType: 'TextMultiSmall'
				}
			]
		},
		{
			name: "Groups",
			label: 'Groups',
			showOnNew: false,
			displayCondition: nsFreshcare.admin.contactPerson.functionCheckAccess,
			displayConditionParams: {tabs: ['Actions']},
			functionClick: function()
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainGroups', refresh: true});
				ns1blankspace.contactPerson.groups.show();
			}
		},
		{
			name: 'Business',
			label: 'Business',
			showOnNew: true,
			breakAfter: false,
			save: {root: true},
			functionClick: function(oParam)
			{
				nsFreshcare.render.form.tabs.show(oParam);
				ns1blankspace.app.context(
				{
					inContext: false,
					'new': !nsFreshcare.util.roleHasAccess({action: 'create', access: nsFreshcare.admin.contactPerson.access, tabs: ['Business']}),
					action: !nsFreshcare.util.roleHasAccess({action: 'update', access: nsFreshcare.admin.contactPerson.access, tabs: ['Business']}),
					actionOptions: !nsFreshcare.util.roleHasAccess({action: 'delete', access: nsFreshcare.admin.contactPerson.access, tabs: ['Business']}),
				});
				if (ns1blankspace.data.contactBusiness)
				{	// v3.1.0i SUP022247 Added so that business defaults on new
					$('#ns1blankspaceBusinessBusiness').attr('data-id', ns1blankspace.data.contactBusiness);
					$('#ns1blankspaceBusinessBusiness').val(ns1blankspace.data.contactBusinessText.formatXHTML());		// v3.1.207 SUP023067
				}
			},
			columns: 
			[
				{id: 1, class: 'ns1blankspaceColumn1Large'},
				{id: 2, class: "ns1blankspaceColumn2Action", style: "width: 100px;"}
			],
			fields:
			[
				{
					name: "Business",
					label: "Trading Name",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'contactbusiness',
					inputType: 'Select',
					method: 'CONTACT_BUSINESS_SEARCH',
					methodFilter: 'tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE',
					columns: 'tradename-space-hyphen-space-legalname'
				},
				{	/* v3.1.1 Added button to view business */
					name: "GoToBusiness",
					label: "View Business",
					style: 'font-size:0.75em; width:100px;',
					type: ns1blankspace.option.typeButton,
					displayColumn: 2,
					displayCondition: function() {return ns1blankspace.data.contactBusiness && ns1blankspace.data.contactBusiness != ''},
					buttonClick: function() {ns1blankspace.contactBusiness.init({id: ns1blankspace.data.contactBusiness})}
				}
			]
		},
		{
			// v3.2.020 SUP023422 Added COP Based Training
			name: "Training",
			label: 'Training',
			showOnNew: false,
			displayCondition: nsFreshcare.admin.contactPerson.functionCheckAccess,
			displayConditionParams: {tabs: ['Actions']},
			functionClick: function()
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainTraining', refresh: true});
				nsFreshcare.admin.contactPerson.training.show({xhtmlElementID: 'ns1blankspaceMainTraining'});
			}
		},
		{
			name: "Xero",
			label: "Xero",
			showOnNew: false,
			displayCondition: function() {return nsFreshcare.option.exportToXero},		/* v3.2.010 Added */
			breakAfter: true,
			save: {root: true},
			functionClick: function(oParam)
			{
				nsFreshcare.render.form.tabs.show(oParam);
				ns1blankspace.app.context(
				{
					inContext: false,
					'new': !nsFreshcare.util.roleHasAccess({action: 'create', access: nsFreshcare.admin.contactPerson.access, tabs: ['Xero']}),
					action: !nsFreshcare.util.roleHasAccess({action: 'update', access: nsFreshcare.admin.contactPerson.access, tabs: ['Xero']}),
					actionOptions: !nsFreshcare.util.roleHasAccess({action: 'delete', access: nsFreshcare.admin.contactPerson.access, tabs: ['Xero']}),
				});
			},
			columns: 
			[
				{id: 1, class: 'ns1blankspaceColumn1Large'},
				{id: 2, class: "ns1blankspaceColumn2Action", style: "width: 100px;"}
			],
			fields:
			[
				{
					name: "XeroPersonID",
					label: "Xero Person ID",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'sexeropersonid',
					inputType: 'Text'
				},
				{	
					name: "XeroPersonUpdated",
					label: "Xero Person Updated",
					type: ns1blankspace.option.typeInput,
					displayColumn: 1,
					column: 'sexeropersonupdated',
					inputType: 'DateTime',
					extraClass: 'ns1blankspaceDate'
				}
			]		},
		{
			name: "Actions",
			label: 'Actions',
			showOnNew: false,
			displayCondition: nsFreshcare.admin.contactPerson.functionCheckAccess,
			displayConditionParams: {tabs: ['Actions']},
			functionClick: function()
			{
				// v3.1.2 SUP022468 Now calls actions.configure to get all linked contact's emails. 
				ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});
				var iActionTypes = $.map($.grep(nsFreshcare.data.actionTypes, function(x)
											{
												return x.id != '5' && x.id != '9' && x.id != '10';
											}),
											function(y) {return y.id}).join(',');

				// v3.1.0c SUP022215 Actiontypes don't show email types
				var aSearchFilters = [
										{name: 'Type', title: 'Type', selectMethod: 'SETUP_ACTION_TYPE_SEARCH', methodFilter: 'title-TEXT_IS_LIKE|id-NOT_IN_LIST-5,9,10', field: 'actiontype'},
										{name: 'ActionBy', title: 'Action By', selectMethod: 'SETUP_USER_SEARCH', columns: 'username-space-contactpersontext', methodFilter: 'username-TEXT_IS_LIKE|contactpersontext-TEXT_IS_LIKE', field: 'actionby'},
										{name: 'Description', title: 'Description', field: 'description', comparison: 'TEXT_IS_LIKE'}
									 ];

				// v3.1.2 SUP022468 Added conditions so that it also looks for all people's actions. 
				var oFilters = [];
				oFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				
				// v3.1.2 SUP022859 Only show CB emails if jasanz login
				// v3.2.015 SUP023422 Added COP Based Training
				if (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz)
				{
					if (ns1blankspace.objectContextData.auditorUsers == undefined) {ns1blankspace.objectContextData.auditorUsers = []}
					oFilters.push({operation: 'addFilter', name: 'actionby', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.auditorUsers, function(x) {return x.id}).join(',')});
				}

				oFilters.push({operation: 'addBracket', bracket: '('});

				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectPerson});
				oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});
				
				oFilters.push({operation: 'addOperator', operator: 'or'});
				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'contactperson', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});

				// v3.1.203 SUP022468 Not required
				/*if (ns1blankspace.objectContextData.contactbusiness != '')
				{
					oFilters.push({operation: 'addOperator', operator: 'or'});
					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContextData.contactbusiness});
					oFilters.push({operation: 'addBracket', bracket: ')'});
				}*/

				oFilters.push({operation: 'addBracket', bracket: ')'});
				
				// v3.1.0e Added functionBind as was not showing add button
				// v3.1.1f xhtmlElementID now set to MainActions
				// v3.1.213 SUP023256 Ws passing contactBusiness as ContactPerson
				nsFreshcare.internal.entity.actions.show
				({
					xhtmlElementID: 'ns1blankspaceMainActions',
					contactPerson: ns1blankspace.objectContext, 
					contactBusiness: (ns1blankspace.objectContextData ? ns1blankspace.objectContextData['contactbusiness']: undefined),
					contactBusinessText: (ns1blankspace.objectContextData ? ns1blankspace.objectContextData['contactbusinesstext']: undefined),
					object: '',
					objectContext: "",
					/*type: iActionTypes,*/
					searchFilters: aSearchFilters,
					filters: oFilters,
					actions: {add: true},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionBind: nsFreshcare.internal.entity.actions.bind
				});
			}
		},
		{
			name: "Emails",
			label: 'Emails',
			showOnNew: false,
			displayCondition: nsFreshcare.admin.contactPerson.functionCheckAccess,
			displayConditionParams: {tabs: ['Actions']},
			functionClick: function()
			{
				// v3.1.2 SUP022468 Now calls emails.configure to get all linked contact's emails. 
				ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});
				var oFilters = [];

				oFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: '5,9,10'});
				
				// v3.1.2 SUP022859 Only show CB emails if jasanz login
				// v3.2.015 SUP023422 Added COP Based Training
				if (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz)
				{
					if (ns1blankspace.objectContextData.auditorUsers == undefined) {ns1blankspace.objectContextData.auditorUsers = []}
					oFilters.push({operation: 'addFilter', name: 'actionby', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.auditorUsers, function(x) {return x.id}).join(',')});
				}

				oFilters.push({operation: 'addBracket', bracket: '('});

					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectPerson});
					oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
					oFilters.push({operation: 'addBracket', bracket: ')'});
				
				oFilters.push({operation: 'addOperator', operator: 'or'});

					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'contactperson', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
					oFilters.push({operation: 'addBracket', bracket: ')'});

				// v3.1.203 SUP022468 Not required
				/*if (ns1blankspace.objectContextData.contactbusiness != '')
				{ 
					oFilters.push({operation: 'addOperator', operator: 'or'});
					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContextData.contactbusiness});
					oFilters.push({operation: 'addBracket', bracket: ')'});
				}*/

				oFilters.push({operation: 'addBracket', bracket: ')'});

				nsFreshcare.internal.entity.actions.show(
				{
					filters: oFilters,
				 	emailsOnly: true,
				 	viewInTab: true,
				 	/*actions: {add: true},*/
				 	xhtmlElementID: 'ns1blankspaceMainEmails',
				 	functionRow: nsFreshcare.internal.entity.emails.row,
				 	functionBind: nsFreshcare.internal.entity.emails.bind,
				 	functionProcess: nsFreshcare.internal.entity.actions.process
				});
			}
		},
		{
			name: "Attachments",
			label: 'Attachments',
			showOnNew: false,
			displayCondition: nsFreshcare.admin.contactPerson.functionCheckAccess,
			displayConditionParams: {tabs: ['Actions']},
			functionClick: function()
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
				ns1blankspace.attachments.show();
			}
		}
	]
};

