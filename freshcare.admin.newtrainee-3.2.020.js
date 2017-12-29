/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 

nsFreshcare.admin.newtrainee = 
{
	data:
	{
	},

	init: function (oParam) 
	{ 
		ns1blankspace.app.reset();

		ns1blankspace.object = 21;	
		ns1blankspace.objectName = 'newtrainee';
		ns1blankspace.objectMethod = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'New Trainees';
		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", 'nsFreshcare');
		ns1blankspace.app.set(oParam);
	},

	home: 		function (oParam, oResponse)
	{
		// v3.2.020 SUP023422 Added membership filter to search
		var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'createddate'}).value;
		var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;

		ns1blankspace.app.context({'new': true, action: true, actionOptions: true, inContext: false});

		if (oParam == undefined) {oParam = {sortColumn: sSortColumn, sortDirection: sSortDirection}}
		if (oParam.homeStep === undefined) {oParam.homeStep = 1}

		// Get records where attendingtrainee different to traineecontatpersonname
		if (oParam.homeStep == 1)
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
			
			oParam.homeStep = 2;
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';		
			oSearch.addField('agritrainingcourseattendee.course.coursedate,agritrainingcourseattendee.course.trainercontactbusinesstext,traineecontactbusinesstext,course,traineecontactbusiness,' +
							'createddate,createduser,createdusertext,modifieddate,modifieduser,modifiedusertext,firstname,surname,agritrainingcourseattendee.traineecontactperson,' +
							'agritrainingcourseattendee.traineecontactperson.firstname,agritrainingcourseattendee.traineecontactperson.surname,traineecontactpersontext,attendingtrainee,' +
							'agritrainingcourseattendee.traineecontactbusiness.agrisubscription.id');	
			//oSearch.addFilter('traineecontactpersonname', 'NOT_EQUAL_TO', 'field:attendingtrainee');
			oSearch.addBracket('(');
			oSearch.addFilter('agritrainingcourseattendee.traineecontactperson.firstname', 'NOT_EQUAL_TO', 'field:firstname');
			oSearch.addOperator('or')
			oSearch.addFilter('agritrainingcourseattendee.traineecontactperson.surname', 'NOT_EQUAL_TO', 'field:surname');
			oSearch.addBracket(')');
			oSearch.addFilter('agritrainingcourseattendee.course.coursedate', 'GREATER_THAN_OR_EQUAL_TO', '01 Jul 2016')	// v3.1.1n SUP022916 Added as too hard to clear out list of 3400 trainees!
			oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.membership', 'EQUAL_TO', 'field:agritrainingcourseattendee.course.package.membership')
			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.newtrainee.home(oParam, oResponse)});	
			
		}
		
		// Now contsruct home page UI
		else if (oParam.homeStep == 2)
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">No new Trainees found</td></tr>' +
								'</table>');
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));		// v3.1.2 Added as was just waiting when no Trainees exist
				delete(oParam.homeStep);
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				// v3.2.015 SUP023422 Added COP Based Training
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="coursedate"' +
									' data-sortdirection="' + ((sSortColumn == "agritrainingcourseattendee.course.coursedate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Course Date</td>' +
								/*'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="createddate"' +
									' data-sortdirection="' + ((sSortColumn == "createdusertext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Added On</td>' + */
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="trainerbusinesstext"' +
									' data-sortdirection="' + ((sSortColumn == "agritrainingcourseattendee.course.trainercontactbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Trainer</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="traineecontactbusinesstext"' +
									' data-sortdirection="' + ((sSortColumn == "traineecontactbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>' + nsFreshcare.data.growerText + ' Business</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="firstname"' +
									' data-sortdirection="' + ((sSortColumn == "firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Attending Trainee</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="traineecontactpersonname"' +
									' data-sortdirection="' + ((sSortColumn == "traineecontactpersonname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>' + nsFreshcare.data.growerText + ' Contacts</td>' +
								'<td class="ns1blankspaceCaption"' +
									'>&nbsp;</td>' +
							'</tr>');

				// v3.1.2 SUP022510 Changed Link this contact to Merge COntact
				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceRow nsFreshcarePrimary" data-growerid="' + this.traineecontactbusiness + '" data-courseId="' + this.course + '" data-traineeid="' + this.id + '">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_coursedate-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourseattendee.course.coursedate"] + '</td>' +
								/*'<td id="ns1blankspaceMostLikely_createddate' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["createddate"] + '</td>' + */
								'<td id="ns1blankspaceMostLikely_trainerbusinesstext-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourseattendee.course.trainercontactbusinesstext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_traineecontactbusinesstext-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["traineecontactbusinesstext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_attendingtrainee-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["firstname"] + ' &nbsp;&nbsp;' + this["surname"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_traineecontactpersonname-' + this.id + '" class="ns1blankspaceMostLikely"' +
											' data-contactperson="' + this["agritrainingcourseattendee.traineecontactperson"] + '">' +
											this["agritrainingcourseattendee.traineecontactperson.firstname"] + ' &nbsp;&nbsp;' + this["agritrainingcourseattendee.traineecontactperson.surname"] + '</td>' +
								'<td style="vertical-align:middle; text-align: center;"><a href="#" class="nsFreshcareCreateLink"' +
												' data-contactId="' + this['agritrainingcourseattendee.traineecontactperson'] + '"' +
												' data-contactfirstname="' + this['agritrainingcourseattendee.traineecontactperson.firstname'] + '"' + 
												' data-contactsurname="' + this['agritrainingcourseattendee.traineecontactperson.surname'] + '"' +
												' data-traineeid="' +  this.id + '">Merge Contact</a></td>' + 
								'</tr>');
				});
				
				aHTML.push('</table>');

				$('#ns1blankspaceMostLikely').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					nsFreshcare.admin.newtrainee.search.send(event.target.id, {source: 1});
				});

				$('.ns1blankspaceHeaderSort')
					.css('cursor', 'pointer')
					.click(function()
					{
						oParam.sortColumn = $(this).attr('data-column');
						oParam.sortDirection = $(this).attr('data-sortdirection');

						nsFreshcare.admin.newtrainee.home(oParam);
					});	

				oParam.homeStep = 3;
				nsFreshcare.admin.newtrainee.home(oParam);	
			}
		}

		// Now search for contacts for each row on the home page
		else if (oParam.homeStep == 3)
		{
			var aGrowerIDs = $.map($('tr.ns1blankspaceRow'), function(x) {return $(x).attr('data-growerid')});

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			oSearch.addField('firstname,surname,contactbusiness,customerstatus,contactperson.contactbusiness.primarycontactperson');
			oSearch.addFilter('contactbusiness', 'IN_LIST', aGrowerIDs.join(','));
			oSearch.rows = 500;
			oSearch.getResults(function(oResponse)
			{
				var aHTML = [];

				if (oResponse.status == 'OK')
				{
					$.each($('tr.ns1blankspaceRow'), function(index, growerRow)
					{
						var aHTML = [];
						var aContacts = $.grep(oResponse.data.rows, function(x) {return x.contactbusiness == $(growerRow).attr('data-growerid')});

						if (aContacts && aContacts.length > 0)
						{
							$('#ns1blankspaceMostLikely_viewcontacts-' + $(growerRow).attr('data-growerid'))
								.html('<span class="ns1blankspaceGrowerViewContacts" id="viewGrowerContacts-' + $(growerRow).attr('data-growerid') + '"></span>');

							$.each(aContacts, function()
							{
								// Check if the contact already displayed is the primary contact and update that one
								if (this['contactperson.contactbusiness.primarycontactperson'] == this.id &&
									$('#ns1blankspaceMostLikely_traineecontactpersonname-' + $(growerRow).attr('data-traineeid')).attr('data-contactperson') === this['contactperson.contactbusiness.primarycontactperson'])
								{
									$('#ns1blankspaceMostLikely_traineecontactpersonname-' + $(growerRow).attr('data-traineeid'))
										.html($('#ns1blankspaceMostLikely_traineecontactpersonname-' + $(growerRow).attr('data-traineeid')).html() +
											'<br /><span style="font-size:0.75em;color:#A4A4A4;">Primary Contact</span>')
								}
								
								// Row is already displayed - don't display it again
								else if ($('#ns1blankspaceMostLikely_traineecontactpersonname-' + $(growerRow).attr('data-traineeid')).attr('data-contactperson') === this.id)
								{
									aHTML = aHTML;
								}
								// Just display a new row
								else
								{
									aHTML.push('<tr class="nsFreshcareSecondary ns1blankspaceRow" data-growerid="' + $(growerRow).attr('data-growerid') + '"' +
													' data-contactId="' + this.id + '"' +
													' data-traineeid="' + $(growerRow).attr('data-traineeid') + '">' +
													'<td colspan="4">&nbsp;</td>' +
													'<td class="ns1blankspaceMostLikely">' + this.firstname + ' &nbsp;&nbsp;' + this.surname + 
															(this['contactperson.contactbusiness.primarycontactperson'] == this.id 
																? '<br /><span style="font-size:0.75em;color:#A4A4A4;">Primary Contact</span>'
																: '') +
														'</td>' +
													'<td style="vertical-align:middle; text-align: center;"><a href="#" class="nsFreshcareCreateLink"' +
															' data-contactId="' + this.id + '"' +
															' data-contactfirstname="' + this.firstname + '"' + 
															' data-contactsurname="' + this.surname + '"' +
															' data-businessId="' + this.traineecontactbusiness + '"' +
															' data-subscritionId="' + this['agritrainingcourseattendee.traineecontactbusiness.agrisubscription.id'] + '"' +
															' data-traineeid="' +  $(growerRow).attr('data-traineeid') + '">Link this contact</a>' +
														'</td>' +
												'</tr>');
								}
							});

							if (aHTML.length > 0)
							{
								$(growerRow).after(aHTML.join(''));
							}
						}
					});
					nsFreshcare.admin.newtrainee.linkTrainee();

					// Now highlight every second 'row'
					var iCount = 1
					$.each($('tr.ns1blankspaceRow'), function(index, row)
					{
						var iGrowerId = $(row).attr('data-growerid');
						var iTraineeId = $(row).attr('data-traineeid');
						if ($(row).hasClass('nsFreshcarePrimary'))
						{
							if (iCount/2 - parseInt((iCount/2).toString()) > 0)
							{
								$(row).css('background-color', '#f2f2f2');
								$(".nsFreshcareSecondary[data-traineeid='" + iTraineeId + "']").css('background-color', '#f2f2f2');
								$(row).children().last().css('background-color', '#8FBC8F')
							}

							iCount ++;
						}
					});
				}
			});
		}
	},

	search: 	
	{
		// v3.2.020 SUP023422 Added new fields to search
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
			var oRoot = ns1blankspace.rootnamespace;
			var oNewGrowerRoot = (oRoot.admin && oRoot.admin.newgrower) ? oRoot.admin.newgrower : nsFreshcare.admin.newtrainee;

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
				oNewGrowerRoot.data.objectContextData = undefined;
				var oSearch = new AdvancedSearch();		
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
				oSearch.addField('agritrainingcourseattendee.course.coursedate,agritrainingcourseattendee.course.trainercontactbusinesstext,traineecontactbusinesstext,course,traineecontactbusiness,' +
							'agritrainingcourseattendee.course.packagetext,agritrainingcourseattendee.course.location,agritrainingcourseattendee.course.statetext,agritrainingcourseattendee.course.package.membershiptext,' +
							'agritrainingcourseattendee.traineecontactperson.firstname,agritrainingcourseattendee.traineecontactperson.surname,traineecontactpersontext,attendingtrainee,firstname,surname' +
							',agritrainingcourseattendee.course.title,phone,mobile,email,createddate,createduser,createdusertext,modifieddate,modifieduser,modifiedusertext,agritrainingcourseattendee.traineecontactbusiness.agrisubscription.id');

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.admin.newtrainee.show(oParam, data)});
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
					oSearch.addField('traineecontactbusinesstext,traineecontactpersontext,attendingtrainee,firstname,surname');
					
					oSearch.addBracket("(");
					oSearch.addFilter('traineecontactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('traineecontactpersontext', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addBracket(')');

					// v3.1.208b SUP023149 Wasn't restricting the search as per home page
					oSearch.addBracket('(');
					oSearch.addFilter('agritrainingcourseattendee.traineecontactperson.firstname', 'NOT_EQUAL_TO', 'field:firstname');
					oSearch.addOperator('or')
					oSearch.addFilter('agritrainingcourseattendee.traineecontactperson.surname', 'NOT_EQUAL_TO', 'field:surname');
					oSearch.addBracket(')');
					oSearch.addFilter('agritrainingcourseattendee.course.coursedate', 'GREATER_THAN_OR_EQUAL_TO', '01 Jul 2016')	// v3.1.1n SUP022916 Added as too hard to clear out list of 3400 trainees!
					oSearch.addFilter('agritrainingcourseattendee.traineecontactbusiness.agrisubscription.membership', 'EQUAL_TO', 'field:agritrainingcourseattendee.course.package.membership')
					oSearch.sort('traineecontactbusinesstext', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.admin.newtrainee.search.process(oParam, data)});
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
								'<td class="ns1blankspaceSearch" id="contact-' + this.id + '">' +
									this["traineecontactbusinesstext"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="trainee-' + this.id + '">' +
									this["traineecontactbusinesstext"] + '</td>'); 
					
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
					nsFreshcare.admin.newtrainee.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'traineecontactbusinesstext-column-traineecontactbusinesstext-column-traineecontactbusinesstext',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.newtrainee.search.send
				});   
				
			}	
		}
	},	

	linkTrainee: function ()
	{
		// v3.2.020 SUP023422 Now Creates attendance link
		// Now bind the nsFreshcareCreateLink button
		$('.nsFreshcareCreateLink')
			/*.button(
			{
				label: 'Link this contact',
				icons: {primary: 'ui-icon-link'}
			})*/
			.css("font-size", "0.5em")
			.css("font-weight", "bold")
			.css('color', '#2F4F4F')
			.on('click', function()
			{
				var oData = 
				{
					attendee: $(this).attr('data-traineeid'),
					contactbusiness: $(this).attr('data-businesstId'),
					contactperson: $(this).attr('data-contactId'),
					subscription: $(this).attr('data-subscriptionId')
				}

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_TRAINEE_ATTENDANCE_LINK_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							nsFreshcare.admin.newtrainee.home();
						}
						else
						{
							ns1blankspace.status.error('Error creating link: ' + oResponse.error.errornotes);
						}
					}
				});
			});
	},		

	layout: function ()
	{
		var aHTML = [];
		var oContext = {inContext: false, 'new': true, action: false, actionOptions: false};		
		var oRoot = ns1blankspace.rootnamespace;
		var oNewGrowerRoot = (oRoot.admin && oRoot.admin.newgrower) ? oRoot.admin.newgrower : nsFreshcare.admin.newtrainee;

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
						'Summary</td></tr>');
						
		aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
						'Details</td></tr>');
						
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			nsFreshcare.admin.newtrainee.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			nsFreshcare.admin.newtrainee.details();
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
			nsFreshcare.admin.newtrainee.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iShowStep === 1 && oResponse && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find Trainee.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			// Set objectContextData & get Product Groups
			if (iShowStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData['traineecontactbusiness'];
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['traineecontactbusinesstext'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['firstname'] + ' ' + ns1blankspace.objectContextData['surname'] ;

				$('#ns1blankspaceViewControlNew').button({disabled: true});
				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br /><span style="color:#A0A0A0;font-size:0.825em;">' + ns1blankspace.data.contactPersonText.formatXHTML() + '</span>');
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.admin.newtrainee.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.newtrainee.summary()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this Trainee.</td></tr></table>');
					
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
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.membershiptext'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training Package</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.packagetext'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.title'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.coursedate'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Location</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.location'] + ' ' + ns1blankspace.objectContextData['agritrainingcourseattendee.course.statetext'] +
						'</td></tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');
			// v3.2.015 SUP023422 Added COP Based Training
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">' + nsFreshcare.data.growerText + ' Business</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['traineecontactbusinesstext'] +
						'</td></tr>');
			// v3.2.015 SUP023422 Added COP Based Training
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">' + nsFreshcare.data.growerText + ' Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['traineecontactpersontext'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Attending Trainee</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData.firstname + ' ' + ns1blankspace.objectContextData.surname +
						'</td></tr>');

			aHTML.push('</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspaceSummaryAddTrainee" class="ns1blankspaceAction" style="width:150px;">' +
						'Add Trainee as Contact</span></td></tr>');

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			
			$('#ns1blankspaceSummaryAddTrainee')
				.button(
				{
					label: 'Add Trainee as Contact',
					icons: {primary: 'ui-icon-plus'}
				})
				.on("click", function()
				{
					nsFreshcare.admin.newtrainee.createNewTrainee.send({xhtmlElementID: this.id});
				});
		}	
	},

	details: 	function() 
	{
		var aHTML = [];
		var aName = ns1blankspace.objectContextData.attendingtrainee.formatXHTML().split(' ');
		
		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainDetails').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainDetails').html(aHTML.join(''));
			
			aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr>' +
							'<td style="width:50%;"class="ns1blankspaceCaption">Trainee First Name</td>' + 
							'<td style="width:50%;">&nbsp;</td>' +
						'</tr>' +
						'<tr class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsTraineeFirstName" class="nsFreshcareReadOnly" style="width:50%;">' + ns1blankspace.objectContextData.firstname.formatXHTML() + '</td>' +
							'<td class="ns1blankspaceText">' + 
								'<input id="ns1blankspaceDetailsTraineeFirstNameUpdate" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Trainee First Name" data-column="firstname"></td>' +
						'</tr>');			

			aHTML.push('<tr>' +
							'<td  style="width:50%;"class="ns1blankspaceCaption">Trainee Surname</td>' + 
							'<td style="width:50%;">&nbsp;</td>' +
						'</tr>' +
						'<tr class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsTraineeSurname" class="nsFreshcareReadOnly" style="width:50%;">' + ns1blankspace.objectContextData.surname.formatXHTML() + '</td>' +
							'<td class="ns1blankspaceText" style="width:50%;">' + 
								'<input id="ns1blankspaceDetailsTraineeSurnameUpdate" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Trainee Surname" data-column="surname"></td>' +
						'</tr>');			

			aHTML.push('<tr>' +
							'<td style="width:50%;" class="ns1blankspaceCaption">Phone</td>' + 
							'<td style="width:50%;">&nbsp;</td>' +
						'</tr>' +
						'<tr class="ns1blankspace" style="width:50%;">' +
							'<td id="ns1blankspaceDetailsPhone" class="nsFreshcareReadOnly" style="width:50%;">' + ns1blankspace.objectContextData.phone.formatXHTML() + '</td>' +
							'<td class="ns1blankspaceText">' + 
								'<input id="ns1blankspaceDetailsPhoneUpdate" class="ns1blankspaceText" data-column="phone"></td>' +
						'</tr>');			

			aHTML.push('<tr>' +
							'<td style="width:50%;" class="ns1blankspaceCaption">Mobile</td>' + 
							'<td style="width:50%;">&nbsp;</td>' +
						'</tr>' +
						'<tr class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsMobile" class="nsFreshcareReadOnly" style="width:50%;">' + ns1blankspace.objectContextData.mobile.formatXHTML() + '</td>' +
							'<td class="ns1blankspaceText" style="width:50%;">' + 
								'<input id="ns1blankspaceDetailsMobileUpdate" class="ns1blankspaceText" data-column="mobile"></td>' +
						'</tr>');			

			aHTML.push('<tr>' +
							'<td style="width:50%;" class="ns1blankspaceCaption">Email</td>' + 
							'<td style="width:50%;">&nbsp;</td>' +
						'</tr>' +
						'<tr class="ns1blankspace" style="width:50%;">' +
							'<td id="ns1blankspaceDetailsPhone" class="nsFreshcareReadOnly" style="width:50%;">' + ns1blankspace.objectContextData.email.formatXHTML() + '</td>' +
							'<td class="ns1blankspaceText">' + 
								'<input id="ns1blankspaceDetailsEmailUpdate" class="ns1blankspaceText" data-column="email"></td>' +
						'</tr>');			

			aHTML.push('</table>');

			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

			// Mask the relevant felds
			$('#ns1blankspaceDetailsMobileUpdate').mask('9999 999 999', {placeholder: " "});
			$('#ns1blankspaceDetailsPhoneUpdate').mask('99 9999 9999', {placeholder: " "});

			if (ns1blankspace.objectContextData)
			{
				$('#ns1blankspaceDetailsTraineeFirstNameUpdate').val(ns1blankspace.objectContextData.firstname.formatXHTML());
				$('#ns1blankspaceDetailsTraineeSurnameUpdate').val(ns1blankspace.objectContextData.surname.formatXHTML());
				$('#ns1blankspaceDetailsPhoneUpdate').val(ns1blankspace.objectContextData.phone.formatXHTML());
				$('#ns1blankspaceDetailsMobileUpdate').val(ns1blankspace.objectContextData.mobile.formatXHTML());
				$('#ns1blankspaceDetailsEmailUpdate').val(ns1blankspace.objectContextData.email.formatXHTML());
			}
		}

	},

	save:
	{	/* This allows the user to update the mobile, email, phone or Trainee name prior to saving to the DB */
		validate: function(oParam)
		{
			if (oParam === undefined) {oParam = {}};

			if ($('#ns1blankspaceMainDetails').html() != '')
			{
				// First validate mandatory fields
				$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
				{
					if (($(this).attr('data-mandatory') === '1' || ($(this).attr('data-mandatory') === '2' && ns1blankspace.objectContext != -1)) 
						&& $(this).val() === '') 
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
						return false;
					}
				});

				// At least one of phone, mobile or email must be populated
				if (ns1blankspace.okToSave 
					&& $('#ns1blankspaceDetailsPhoneUpdate').val() === ''
					&& $('#ns1blankspaceDetailsMobileUpdate').val() === ''
					&& $('#ns1blankspaceDetailsEmailUpdate').val() === '')
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('At least one of phone, mobile or email must be entered');
					return false;
				}
			}

			if (ns1blankspace.okToSave && oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
			else
			{
				return ns1blankspace.okToSave;
			}
		},

		send: function(oParam)
		{
			var oData = {id: ns1blankspace.objectContext};
			ns1blankspace.okToSave = true;

			if (nsFreshcare.admin.newtrainee.save.validate())
			{
				if ($('#ns1blankspaceMainDetails').html() != '')
				{
					$.each($('#ns1blankspaceMainDetails input'), function()
					{
						if ($(this).val() != '' && $(this).val() != $('#' + this.id.replace('Update', '')).val())
						{
							oData[$(this).attr('data-column')] = $(this).val();
						}
					});
				}

				if (Object.keys(oData).length > 1)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								ns1blankspace.inputDetected = false;
								ns1blankspace.status.message('Trainee saved');
								nsFreshcare.admin.newtrainee.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext});
							}
							else
							{
								ns1blankspace.status.error('Error saving Trainee: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					ns1blankspace.status.message('Nothing to save!');
				}
			}
		}
	},

	createNewTrainee:
	{
		// v3.2.020 SUP023422 Now adds attendance link
		data: {},

		send: function(oParam)
		{
			// This is the process to add the new trainee cotnact to the db. 
			// We need to add the contactperson record, add the group of Trainee, then upadte the Training Course attendee record
			var oData = {};

			if (oParam === undefined) {oParam = {}};
			if (oParam.createTraineeStep == undefined) {oParam.createTraineeStep = 1}
			
			if (oParam.createTraineeStep == 1)
			{
				ns1blankspace.okToSave = true;

				// We have to render the details tab to make sure the data is validated
				if ($('#ns1blankspaceMainDetails').html() === '')
				{
					$('#ns1blankspaceMainDetails').attr('data-loading', '1');
					nsFreshcare.admin.newtrainee.details();
					$('#ns1blankspaceMainDetails').hide();
				}

				// Validate and then add contact record
				if (nsFreshcare.admin.newtrainee.save.validate())
				{
					oData.contactbusiness = ns1blankspace.objectContextData.traineecontactbusiness;
					oData.surname = $('#ns1blankspaceDetailsTraineeSurnameUpdate').val();
					if (oData.surname === '') {oData.surname = $('#ns1blankspaceDetailsTraineeSurname').html()}
					oData.firstname = $('#ns1blankspaceDetailsTraineeFirstNameUpdate').val();
					if (oData.firstname === '') {oData.surname = $('#ns1blankspaceDetailsTraineeFirstName').html()}
					oData.phone = $('#ns1blankspaceDetailsPhoneUpdate').val();
					if (oData.phone == '') {oData.phone = $('#ns1blankspaceDetailsPhone').html()}
					oData.mobile = $('#ns1blankspaceDetailsMobileUpdate').val();
					if (oData.mobile === '') {oData.mobile = $('#ns1blankspaceDetailsMobile').html()}
					oData.email = $('#ns1blankspaceDetailsEmailUpdate').val();
					if (oData.email == '') {oData.email = $('#ns1blankspaceDetailsEmail').html()}
					oData.status = nsFreshcare.data.contactStatusActive;

					oParam.firstName = oData.firstname 
					oParam.surname = oData.surname;

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_PERSON_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								ns1blankspace.status.message('Contact added');
								oParam.createTraineeStep = 2;
								oParam.contactID = oResponse.id;
								nsFreshcare.admin.newtrainee.createNewTrainee.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding Contact: ' + oResponse.error.errornotes);
							}
						}
					});
				}
			}

			// Add the 'trainee' group
			else if (oParam.createTraineeStep == 2)
			{
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CONTACT_PERSON_GROUP_MANAGE'),
					data: {contactperson: oParam.contactID, group: nsFreshcare.data.groupTrainee},
					success: function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.status.message('Trainee group added');
							oParam.createTraineeStep = 3;
							nsFreshcare.admin.newtrainee.createNewTrainee.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error adding Group: ' + oResponse.error.errornotes);
						}
					}
				});
			}

			/// v3.1.1n SUP022919 add Additional Contact group
			else if (oParam.createTraineeStep == 3)
			{
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CONTACT_PERSON_GROUP_MANAGE'),
					data: {contactperson: oParam.contactID, group: nsFreshcare.data.groupOtherContact},
					success: function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.status.message('Additional Contact group added');
							oParam.createTraineeStep = 4;
							nsFreshcare.admin.newtrainee.createNewTrainee.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error adding Group: ' + oResponse.error.errornotes);
						}
					}
				});
			}

			// Update Course Attendee record
			else if (oParam.createTraineeStep == 4)
			{

				oData.id = ns1blankspace.objectContext;
				oData.traineecontactperson = oParam.contactID;
				oData.firstname = oParam.firstName;
				oData.surname = oParam.surname;
				
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.status.message('Course Attendee updated');
							oParam.createTraineeStep = 5;
							nsFreshcare.admin.newtrainee.createNewTrainee.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error updating Course Attendee: ' + oResponse.error.errornotes);
						}
					}
				})
			}
			else if (oParam.createTraineeStep == 5)
			{
				oData.attendee = ns1blankspace.objectContext;
				oData.contactbusiness = ns1blankspace.objectContextData.traineecontactbusiness;
				oData.contactperson = oParam.contactID;
				oData.subscription = ns1blankspace.objectContextData['agritrainingcourseattendee.traineecontactbusiness.agrisubscription.membership'];
				
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_TRAINEE_ATTENDANCE_LINK_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.status.message('Course Attendee updated');
							oParam.createTraineeStep = 10;
							nsFreshcare.admin.newtrainee.createNewTrainee.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error updating Course Attendee: ' + oResponse.error.errornotes);
						}
					}
				})
			}
			// redisplay home page
			else if (oParam.createTraineeStep == 10)
			{
				nsFreshcare.admin.newtrainee.home();
			}
		}
	}
}