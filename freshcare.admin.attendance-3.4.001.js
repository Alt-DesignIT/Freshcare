/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.attendance = 
{
	data:
	{
		historyFields:
		[
			{name: 'traineecontactbusinesstext', caption: 'Attendee Business'},
			{name: 'traineecontactpersontext', caption: 'Linked Contact'},
			{name: 'attendingtrainee', caption: 'Attending Trainee'},
			{name: 'firstname', caption: 'Attendee First name'},
			{name: 'surname', caption: 'Attendee Surname'},
			{name: 'mobile', caption: 'Mobile'},
			{name: 'phone', caption: 'Phone'},
			{name: 'email', caption: 'Email'},
			{name: 'crop', caption: 'Crops'},
			{name: 'harvestmonth', caption: 'Harvest Months'}
		]
	},

	init: function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 215;	
		ns1blankspace.objectName = 'attendance';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Attendees';	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
	},

	home: 		function (oParam, oResponse)
	{
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
			
			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';	
			oSearch.addField('agritrainingcourseattendee.course.trainercontactbusinesstext,agritrainingcourseattendee.course.trainercontactpersontext' +
							',traineecontactbusinesstext,traineecontactbusiness,attendingtrainee,agritrainingcourseattendee.course.coursedate');
			oSearch.sort('modifieddate', 'desc');

			oSearch.rows = 40;
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer)
			{
				oSearch.addFilter("agritrainingcourseattendee.course.trainercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			}

			oSearch.getResults(function(oResponse) {nsFreshcare.admin.attendance.home(oParam, oResponse)});	
			
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">');
				aHTML.push('No Attendance rows exist.')
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
				{
					aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY UPDATED</td></tr>');
				}
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Trainer</td>' +
								'<td class="ns1blankspaceCaption">Trainee Business</td>' +
								'<td class="ns1blankspaceCaption">Attendee</td>' +
								'<td class="ns1blankspaceCaption">Course Date</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{

					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourseattendee.course.trainercontactbusinesstext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["traineecontactbusinesstext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["attendingtrainee"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourseattendee.course.coursedate"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.attendance.search.send(event.target.id, {source: 1});
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
			var iMinimumLength = 3;
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
			var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.admin.attendance.show}).value;
			var bSystemSearch = (oParam && oParam.functionShowSystem != undefined);

			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				if (!bSystemSearch) {$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);}
				
				ns1blankspace.objectContext = sSearchContext;
				
				// v3.4.001 SUP022964 Added trainercontactbusiness & seTempTraineeID
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'agri';
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
				oSearch.addField('agritrainingcourseattendee.course.trainercontactbusinesstext,agritrainingcourseattendee.course.trainercontactpersontext' +
								',traineecontactbusinesstext,traineecontactbusiness,attendingtrainee,agritrainingcourseattendee.course.coursedate' +
								',traineecontactpersontext,traineecontactperson,agritrainingcourseattendee.course.package.membership.code' +
								',agritrainingcourseattendee.course.package.codeofpracticetext,firstname,surname,mobile,phone,email,crop,harvestmonth' +
								',agritrainingcourseattendee.coursetext,agritrainingcourseattendee.course,agritrainingcourseattendee.course.statustext' +
								',agritrainingcourseattendee.course.trainercontactbusiness,setemptraineeid');
				oSearch.addField(ns1blankspace.option.auditFields);

				// v3.4.001 if functionShowSystem has been passed, we want to see snapshots
				if (!bSystemSearch)
				{
					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				}
				else
				{
					oSearch.addField('snapshotofid,snapshotcreateduser,snapshotcreatedusertext,snapshotmodifieduser,snapshotmodifiedusertext,snapshotcreateddate,snapshotmodifieddate');
					oSearch.addCustomOption('includesnapshots', 'Y');
					oSearch.addFilter('snapshotofid', 'EQUAL_TO', sSearchContext);
					oSearch.sort('snapshotcreateddate', 'desc');
					fFunctionShow = oParam.functionShowSystem;
				}
				oSearch.getResults(function(data) {fFunctionShow(oParam, data)});
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

					var sSurname = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').pop() : sSearchText;
					var sFirstName = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').shift() : sSearchText;
					var dSearchDate = Date.parse(sSearchText);	
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
					oSearch.addField('agritrainingcourseattendee.course.coursedate,traineecontactbusinesstext,traineecontactbusiness,attendingtrainee,agritrainingcourseattendee.coursetext,agritrainingcourseattendee.course');

					oSearch.addBracket("(");
					oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sFirstName);
					oSearch.addOperator((sFirstName != sSurname) ? 'and' : 'or');
					oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSurname);
					if (dSearchDate != null)
					{
						oSearch.addOperator('or');
						oSearch.addFilter('agritrainingcourseattendee.course.coursedate', 'EQUAL_TO', dSearchDate.toString('dd MMM yyyy'));
					}
					oSearch.addBracket(')');

					if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer)
					{
						oSearch.addFilter("agritrainingcourseattendee.course.trainercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					}
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.admin.attendance.search.process(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var iColumn = 0;
			var aHTML = [];
			var	iMaximumColumns = 1;
				
			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.search.stop();
				$(ns1blankspace.xhtml.container).hide();
			}
			else
			{	
				ns1blankspace.search.stop();

				aHTML.push('<table class="ns1blankspaceSearchMedium">');
					
				var sPreviousId = '';

				$.each(oResponse.data.rows, function()
				{
					iColumn = iColumn + 1;
					
					if (iColumn == 1)
					{
						aHTML.push('<tr class="ns1blankspaceSearch">');
					}
					
					aHTML.push('<td class="ns1blankspaceSearch" id="membership' +
									'-' + this.id + '">' +
									this['agritrainingcourseattendee.course.coursedate'] +
								'</td>'); 
					
					aHTML.push('<td class="ns1blankspaceSearch" id="title' +
									'-' + this.id + '">' +
									this.traineecontactbusinesstext + 
								'</td>');

					aHTML.push('<td class="ns1blankspaceSearch" id="title' +
									'-' + this.id + '">' +
									this.attendingtrainee + 
								'</td>');
									
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
				
				
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.container).html('&nbsp;');
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.admin.attendance.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'membershiptext-column-title',
					more: oResponse.moreid,
					rows: 40,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.attendance.search.send
				});   
				
			}	
		}
	},						

	remove: function(oParam)
	{	
		nsFreshcare.admin.attendance['delete'].validate(oParam);
	},

	'delete': 
	{
		validate: function(oParam)
		{
			ns1blankspace.container.confirm(
			{
				title: 'Confirm delete Attendance record',
				html: 'You are about to remove a trainee from a training course.<br /><br/>' +
						'All links to the training course and the trainee will be removed. ' +
						'Are you sure you want to this?',
				buttons:
				[
					{
						text: 'OK',
						click: function()
						{
							$(this).dialog('destroy');
							nsFreshcare.admin.trainingcourse.trainees.remove.process(
							{
								traineeID: ns1blankspace.objectContext,
								traineeBusiness: ns1blankspace.objectContextData.traineecontactbusiness,
								traineePerson: ns1blankspace.objectContextData.traineecontactperson,
								trainerBusiness: ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactbusiness'],
								courseID: ns1blankspace.objectContextData['agritrainingcourseattendee.course.coursedate'],
								functionPostRemove: nsFreshcare.admin.attendance.home
							});
						}
					},
					{
						text: 'Cancel',
						click: function()
						{
							$(this).dialog('destroy');
						}
					}
				]
			});
		}
	},

	layout: function ()
	{
		var aHTML = [];


		if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
		{
			var oContext = {inContext: false, 'new': true, action: false, actionOptions: false};
		}
		else
		{
			var oContext = {inContext: false, 'new': true, action: true, actionOptions: true};
		}
	
		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext == -1)
		{
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Details</td></tr>');
							
		}
		else
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Summary</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Details</td></tr>');
						
			if (nsFreshcare.option.qualifyingTraining)
			{
				aHTML.push('<tr><td id="ns1blankspaceControlLinks" class="ns1blankspaceControl">' +
								'Links</td></tr>');
			}

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlSystem" class="ns1blankspaceControl">' +
							'System</td></tr>');
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainLinks" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSystem" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		// context now set to true if admin
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			nsFreshcare.admin.attendance.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			console.log(oContext);
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			nsFreshcare.admin.attendance.details();
		});
		
		$('#ns1blankspaceControlLinks').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainLinks', context:  {inContext: false, 'new': true, action: true, actionOptions: true}});
			nsFreshcare.internal.entity.training.show({xhtmlElementID: 'ns1blankspaceMainLinks'});
		});
		
		// v3.4.001
		$('#ns1blankspaceControlSystem').click(function(event)
		{
			// History records, Modified dates, etc
			ns1blankspace.show({selector: '#ns1blankspaceMainSystem', refresh: true, context: {inContext: false}});
			nsFreshcare.util.system.search({xhtmlElementID: 'ns1blankspaceMainSystem', stripPrefix: true});
		});
	},

	show: function (oParam, oResponse)
	{
		oParam = oParam || {};
		var aHTML = [];

		oParam.step = oParam.step || 1;
		
		if (oParam.step == 1)
		{
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			nsFreshcare.admin.attendance.layout();
			
			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find training package.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				oParam.step = 2;
				nsFreshcare.admin.attendance.show(oParam);
			}
		}

		// Finish up
		else if (oParam.step == 2)
		{			
			// v3.4.001 Re-activated delete button as there is now a prompt and it also deletes linked rows
			//if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
			//{
			//	$('#ns1blankspaceViewControlAction').button({disabled: false});
			//	$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			//}

			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["agritrainingpackage.title"]);
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.admin.attendance.init({id: ' + ns1blankspace.objectContext + ')',
				move: false
				});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.attendance.summary()'});
		}	
	},	
		
	summary: function ()
	{
		var aHTML = [];
		var sWarningStyle = ' style="color: #ee8f00; font-size: 0.825em;"';
		var bShowWarning = (ns1blankspace.objectContextData['surname'] + ', ' + ns1blankspace.objectContextData['firstname']) 
							!= ns1blankspace.objectContextData['traineecontactpersontext'];


		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this training package.</td></tr></table>');
					
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
		
			aHTML.push('<table class="ns1blankspace">');
			
			if (ns1blankspace.objectContextData['traineecontactbusinesstext'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainer Business</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactbusinesstext'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainer</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactpersontext'] +
						'</td></tr>');

			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Attending Trainee</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['firstname'] + ' ' + ns1blankspace.objectContextData['surname'] +
						(bShowWarning ? '<span' + sWarningStyle + '>&nbsp;&nbsp;*This Trainee does not have a matching contact record</span>' : '' ) +
						'</td></tr>');
		
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course COP</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.membership.code'] + ' ' + ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.codeofpracticetext'] + 
						'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.coursedate'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Status</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.statustext'] +
						'</td></tr>');

			

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspaceGoToTrainingCourse" class="ns1blankspaceAction" style="width:100%;">' +
						'Go to Training Course</span></td></tr>');

			aHTML.push('<tr><td><span id="ns1blankspaceGoToGrower" class="ns1blankspaceAction" style="width:100%;">' +
						'Go To ' + nsFreshcare.data.growerText + '</span></td></tr>');

			// v3.4.001 SUP022964 Added button to take user to TempTrainee record
			if (ns1blankspace.objectContextData.setemptraineeid != '')
			{
				aHTML.push('<tr><td><span id="ns1blankspaceGoToTempTrainee" class="ns1blankspaceAction" style="width:100%;">' +
							'Go to original Trainee record</span></td></tr>');
			}

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			$('#ns1blankspaceGoToTrainingCourse').button(
			{
				label: 'Go to Training Course',
				icons:
				{
					primary: "ui-icon-clipboard"
				}
			})
			.click(function()
			{	
				nsFreshcare.admin.trainingcourse.init({id: ns1blankspace.objectContextData["agritrainingcourseattendee.course"]}); 

			});


			$('#ns1blankspaceGoToGrower').button(
			{
				label: 'Go To ' + nsFreshcare.data.growerText,
				icons:
				{
					primary: "ui-icon-clipboard"
				}
			})
			.click(function()
			{			
				nsFreshcare[nsFreshcare.user.roleLower].grower.init({id: ns1blankspace.objectContextData.traineecontactbusiness});
			});

			$('#ns1blankspaceGoToTempTrainee').button(
			{
				label: 'Go to original Trainee record',
				icons:
				{
					primary: "ui-icon-clipboard"
				}
			})
			.click(function()
			{			
				var sObject = (ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactbusiness'] == nsFreshcare.data.eLearningBusiness)
								? 'elearning' : 'grower';
				nsFreshcare.admin['new' + sObject].init({id: ns1blankspace.objectContextData.setemptraineeid});
			});
		}	
	},

	setCourseDate: 	function(oParam) 
	{

		var sXHTMLElementID = ns1blankspace.xhtml.divID;

		if (oParam) {
			if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
		}
		
		sXHTMLElementID = (sXHTMLElementID.substr(0,1) === '#') ? sXHTMLElementID.substr(1) : sXHTMLElementID;
		
		if ($('#' + sXHTMLElementID).attr('data-id') != undefined) {

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
			oSearch.addField('coursedate');
			oSearch.addFilter('id', 'EQUAL_TO', $('#' + sXHTMLElementID).attr('data-id'));
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0) {

					$('#ns1blankspaceDetailsTrainingDateUpdate').val(oResponse.data.rows[0].coursedate.formatXHTML());

				}
			});
		}
	},

	details: function() 
	{
		var aHTML = [];
		var dToday = new Date();
		var sWarningStyle = ' style="background-color: #ee8f00;"';
		var bShowWarning = (ns1blankspace.objectContextData['surname'] + ', ' + ns1blankspace.objectContextData['firstname']) 
							!= ns1blankspace.objectContextData['traineecontactpersontext'];
		
		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainDetails').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainDetails').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');

			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							'Training Course</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowTrainingCourseUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTrainingCourse" class="ns1blankspaceSelect' +
								((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ' nsFreshcareDisabled' : '') + '"' +
								' data-mandatory="1" data-caption="Training Course"' +
								' data-method="AGRI_EDUCATION_TRAINING_COURSE_SEARCH"' +
								' data-methodFilter="title-TEXT_IS_LIKE|location-TEXT_IS_LIKE' + 
													((nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer)
													? '|trainercontactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
												       'status-EQUAL_TO-' + nsFreshcare.data.trainingCourse.statusScheduled
												    : '') +  
												    '"' +
								' data-columns="title-space-coursedate-space-location"' +
								' data-click="nsFreshcare.admin.attendance.setCourseDate">' +
							'</td></tr>');		

			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Course Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsCourseDate" class="ns1blankspaceText nsFreshcareDisabled">' +
							'</td></tr>');	

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Membership' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsMembership" class="ns1blankspaceText nsFreshcareDisabled">' +
							'</td></tr>');	

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'COP' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsCOP" class="ns1blankspaceText nsFreshcareDisabled">' +
							'</td></tr>');	

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trainer Business' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTrainerBusiness" class="ns1blankspaceText nsFreshcareDisabled">' +
							'</td></tr>');	

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trainer' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTrainerPerson" class="ns1blankspaceText nsFreshcareDisabled">' +
							'</td></tr>');	


			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Attendee Business' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailTraineeBusiness" class="nsFreshcareSelectGrower' +
								((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ' nsFreshcareDisabled' : '') + '"' +
								' data-caption="Business"' +
								((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ' data-mandatory="1"' : '') + '"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' +
								' data-columns="tradename-space-contactbusiness.addresslink.address.addresssuburb"' +
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|contactbusiness.addresslink.address.addresssuburb-TEXT_IS_LIKE|' +
													 'contactbusiness.addresslink.address.status-EQUAL_TO-1|' +
													 'contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '"' +
								' data-click="nsFreshcare.util.defaultContactPerson">' +
							'</td></tr>');




			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Linked Contact Person' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailTraineePerson" class="nsFreshcareSelectGrower' +
								((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ' nsFreshcareDisabled' : '') + '"' +
								' data-mandatory="1" data-caption="Contact Person"' + 
								' data-method="CONTACT_PERSON_SEARCH"' +
								' data-columns="firstname-space-surname"' +
								' data-methodfilter="firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
										'contactperson.contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '|' +
										'persongroup-IN_LIST-' + nsFreshcare.data.grower.categoryGrower + ',' + 
																 nsFreshcare.data.groupTrainee  + ',' + 
																 nsFreshcare.data.groupELearningTrainee  + ',' + 
																 nsFreshcare.data.groupOtherContact + '"' + 
								' data-parent="ns1blankspaceDetailTraineeBusiness"' +
								' data-parent-search-id="contactbusiness"' +
								' data-parent-search-text="tradename"' + 
								' data-click="nsFreshcare.admin.trainingcourse.trainees.setMembershipValues">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Attendee First Name' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceDetailsFirst" class="ns1blankspaceText' + 
								((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ' nsFreshcareDisabled' : '') + '"' +
								(bShowWarning ? sWarningStyle : '')  +
								' data-mandatory="1" data-caption="First">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'Attendee Surname' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceDate">' +
							'<input id="ns1blankspaceDetailsSurname" class="ns1blankspaceText' + 
								((nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ' nsFreshcareDisabled' : '') + '"' + 
								(bShowWarning ? sWarningStyle : '')  +
								' data-mandatory="1" data-caption="Surname">' +
							'</td></tr>');


			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
							
			$('.nsFreshcareDisabled').attr('disabled', true);
			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});


			if (ns1blankspace.objectContextData != undefined)
			{
			
				$('#ns1blankspaceDetailsCourseDate').val(ns1blankspace.objectContextData["agritrainingcourseattendee.course.coursedate"].formatXHTML());
				$('#ns1blankspaceDetailsMembership').val(ns1blankspace.objectContextData["agritrainingcourseattendee.course.package.membership.code"].formatXHTML());
				$('#ns1blankspaceDetailsCOP').val(ns1blankspace.objectContextData["agritrainingcourseattendee.course.package.codeofpracticetext"].formatXHTML());
				$('#ns1blankspaceDetailsTrainerBusiness').val(ns1blankspace.objectContextData["agritrainingcourseattendee.course.trainercontactbusinesstext"].formatXHTML());
				$('#ns1blankspaceDetailsTrainerPerson').val(ns1blankspace.objectContextData["agritrainingcourseattendee.course.trainercontactpersontext"].formatXHTML());
				$('#ns1blankspaceDetailsFirst').val(ns1blankspace.objectContextData['firstname'].formatXHTML());
				$('#ns1blankspaceDetailsSurname').val(ns1blankspace.objectContextData['surname'].formatXHTML());
				
				$('#ns1blankspaceDetailsTrainingCourse').val(ns1blankspace.objectContextData['agritrainingcourseattendee.coursetext'].formatXHTML());
				$('#ns1blankspaceDetailsTrainingCourse').attr('data-id', ns1blankspace.objectContextData['agritrainingcourseattendee.course'].formatXHTML());
				$('#ns1blankspaceDetailTraineeBusiness').val(ns1blankspace.objectContextData['traineecontactbusinesstext'].formatXHTML());
				$('#ns1blankspaceDetailTraineeBusiness').attr('data-id', ns1blankspace.objectContextData['traineecontactbusiness'].formatXHTML());
				$('#ns1blankspaceDetailTraineePerson').val(ns1blankspace.objectContextData['traineecontactpersontext'].formatXHTML());
				$('#ns1blankspaceDetailTraineePerson').attr('data-id', ns1blankspace.objectContextData['traineecontactperson'].formatXHTML());

			}
			else {
				// Defaults go here
				
				var dToday = new Date();
				$('#ns1blankspaceDetailsAvailableFrom').val(dToday.toString('dd MMM yyyy'));
				$('#ns1blankspaceDetailsAvailableTo').val(dToday.toString('dd MMM yyyy'));

			}
		}	
	},

	defaultCOP: function() 
	{

		var iElementId = this.id;

		if (this.id != undefined) {

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
			oSearch.addField('code,description');
			oSearch.addFilter('membership', 'EQUAL_TO', iMembership);
			oSearch.addFilter('isdefault', 'EQUAL_TO', 'Y');
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {

					var oRow = oResponde.data.rows[0];
					$('#ns1blankspaceDetailsMembership').val(oRow.description);
					$('#ns1blankspaceDetailsMembership').attr('data-id', oRow.id);
				}
			});
		}
	},
	
	links: 
	{
		search: function(oParam, oResponse) 
		{
			nsFreshcare.internal.entity.training.search(oParam);
		}
	},

	save:     	
	{		
		validate: function(oParam)
		{
			var dFrom;
			var dTo;
			// Validate Mandatory fields
			$('input[data-mandatory]').each(function() 
			{										

				if (this.id.indexOf('Details') > -1 
					&& ($(this).val() === ''
			   		   || ($(this).attr('data-method') != undefined 
			   		   	  && ($(this).attr('data-id') === undefined || $(this).attr('data-id') === '')))
					) 
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
					return false;
				}
			});

			if (ns1blankspace.okToSave)
			{
				nsFreshcare.admin.attendance.save.send(oParam);
			}
		},

		send: 	function(oParam) 
		{
			
			var sData = 'id=';

			if (oParam === undefined) {oParam = {saveAttendeeStep: 1}}

			// Validate fields entered
			if (oParam.saveAttendeeStep === 1)
			{
				ns1blankspace.okToSave = true;
				oParam.saveAttendeeStep = 2;
				nsFreshcare.admin.attendance.save.validate(oParam);
			}

			// Save Package
			else if (oParam.saveAttendeeStep === 2)
			{
				sData += ((ns1blankspace.objectContext != -1) 
							? ns1blankspace.objectContext + '&course=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTrainingCourse').attr('data-id'))
							: '');
				sData += '&traineecontactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceDetailTraineeBusiness').attr('data-id')) +
						 '&traineecontactperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailTraineePerson').attr('data-id')) +
						 '&firstname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFirst').val()) +
						 '&surname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSurname').val()) +
						 '&attendingtrainee=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFirst').val()) + ' ' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSurname').val());

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
					data: sData,
					success: nsFreshcare.admin.attendance.save.process 
				});
			}
		},

		process: function(oResponse) 
		{
			var bNew = (ns1blankspace.objectContext === -1);
			if (oResponse.status === 'OK')
			{
				ns1blankspace.inputDetected = false;
				ns1blankspace.status.message('Attendee Saved');
				if (bNew)
				{
					ns1blankspace.objectContext = oResponse.id;
					nsFreshcare.admin.attendance.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext});
				}
			}
			else
			{
				ns1blankspace.status.error('Error saving Attendee:' + oResponse.error.errornotes);
			}
		}
	}
}