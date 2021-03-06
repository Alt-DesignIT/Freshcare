/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.grower.trainingcourse = 
{
	data: {},

	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = nsFreshcare.objectTrainingCourseAttendee;	
		ns1blankspace.objectName = 'trainingcourse';
		ns1blankspace.objectParentName = 'grower';
		ns1blankspace.objectMethod = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Training';	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);

		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
	},

	home: 		function (oParam, oResponse)
	{
		oParam = oParam || {};
		var dToday = new Date();
		oParam.homeStep = oParam.homeStep || 1

		// Search for My Training rows
		if (oParam.homeStep == 1)
		{
			var aHTML = [];
						
			aHTML.push('<table class="ns1blankspaceMain">');
			aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="6">My Training</td></tr>');
			aHTML.push('<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceHomeMyTraining" class="ns1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td></tr>');
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="6">Linked Training</td></tr>');
			aHTML.push('<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceHomeLinkedTraining" class="ns1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td></tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			oParam.homeStep = 2;
						
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			// v3.3.008 SUP023905 Added call to display Linked training	
			nsFreshcare.grower.trainingcourse.data.mytraining = {training: undefined};
					
			nsFreshcare.internal.entity.training.show(
			{
				xhtmlElementID: 'ns1blankspaceHomeMyTraining',
				xhtmlContext: 'my',
				sortColumn: 'agritraineeattendancelink.attendee.course.coursedate',
				sortDirection: 'desc',
				attachToObject: nsFreshcare.grower.trainingcourse.data.mytraining,
				contactBusiness: ns1blankspace.user.contactBusiness,
				functionBind: nsFreshcare.grower.trainingcourse.homeBind,
				homeStep: 2,
				onCompleteWhenCan: nsFreshcare.grower.trainingcourse.home,
				emptyMessage: "No direct training"
			});

			//nsFreshcare.grower.trainingcourse.home(oParam);
		}

		// Display Linked training
		else if (oParam.homeStep == 2)
		{
			nsFreshcare.grower.trainingcourse.data.linkedtraining = {training: undefined};
					
			nsFreshcare.internal.entity.training.show(
			{
				xhtmlElementID: 'ns1blankspaceHomeLinkedTraining',
				xhtmlContext: 'linked',
				sortColumn: 'agritraineeattendancelink.attendee.course.coursedate',
				sortDirection: 'desc',
				attachToObject: nsFreshcare.grower.trainingcourse.data.linkedtraining,
				linkedOnly: true,
				functionBind: nsFreshcare.grower.trainingcourse.homeBind,
				emptyMessage: "No linked training"
			});
		}
	},

	homeBind: function(oParam)
	{
		var sXHTMLElementId = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
		
		$('#' + sXHTMLElementId + ' .ns1blankspaceRowAttendanceLink')
		.css('cursor', 'pointer')
		.on('click', function()
		{
			var iLinkID = this.id.split('_').pop();
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_TRAINEE_ATTENDANCE_LINK_SEARCH';
			oSearch.addField('attendee');
			oSearch.addFilter('id', 'EQUAL_TO', iLinkID);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					if (oResponse.data.rows.length > 0)
					{
						nsFreshcare.grower.trainingcourse.search.send('-' + oResponse.data.rows[0].attendee, {source: 1});
					}
					else
					{
						ns1blankspace.status.error('Unable to find Training Attendee record');
					}
				}
				else
				{
					ns1blankspace.status.error('Error finding Training Attendee record: ' + oResponse.errorr.errornotes);;
				}
			})
		});
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
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
			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				
				// v3.4.008 SUP023948 Added Training Package to list
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';		
				oSearch.addField('agritrainingcourseattendee.course.trainercontactbusinesstext,agritrainingcourseattendee.course.trainercontactpersontext' +
								',agritrainingcourseattendee.course.title,agritrainingcourseattendee.course.package.codeofpracticetext,agritrainingcourseattendee.course.coursedate' +
								',agritrainingcourseattendee.course.package.membershiptext,agritrainingcourseattendee.attendingtrainee' +
								',agritrainingcourseattendee.course.statustext,agritrainingcourseattendee.course.package.title');
				oSearch.addFilter("agritrainingcourseattendee.traineecontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);

				// v3.1.1. Was adding extended fields to object 32 (as it was wrong in init) and search was erroring
				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.grower.trainingcourse.show(oParam, data)});
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
					oSearch.addField('agritrainingcourseattendee.course.package.membershiptext,agritrainingcourseattendee.course.coursedate');
					
					oSearch.addBracket("(");
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						if (sSearchText != "ALL") {
							oSearch.addFilter('agritrainingcourseattendee.course.package.membershiptext', 'TEXT_STARTS_WITH', sSearchText);
						}
					}
					else
					{	
						oSearch.addFilter('agritrainingcourseattendee.course.package.membershiptext', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					oSearch.addFilter("agritrainingcourseattendee.traineecontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.grower.trainingcourse.search.process(oParam, data)});
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
				aHTML.push('<table class="ns1blankspaceSearchMedium">');
					
				$.each(oResponse.data.rows, function()
				{
					iColumn = iColumn + 1;
					
					if (iColumn == 1)
					{
						aHTML.push('<tr class="ns1blankspaceSearch">');
					}
					
					aHTML.push('<td class="ns1blankspaceSearch" id="membership' +
									'-' + this.id + '">' +
									this["agritrainingcourseattendee.course.package.membershiptext"] +
								'</td>'); 
					
					aHTML.push('<td class="ns1blankspaceSearch" id="coursedate' +
									'-' + this.id + '">' +
									this["agritrainingcourseattendee.course.coursedate"] + '</td>');
									
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
				
				ns1blankspace.search.stop();
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.container).html('&nbsp;');
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.grower.trainingcourse.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'agritrainingcourseattendee.course.package.membershiptext-agritrainingcourseattendee.course.coursedate',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.grower.trainingcourse.search.send
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext === -1) {
			// Not permitted  but I've left it in here just in case
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Details</td></tr>');
		}
		else {			
			// We don't really need to see the word Summary here - it just confuses the user..
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
							'&nbsp;</td></tr>');
		}
					
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.grower.trainingcourse.summary();
		});

	},

	show: 		function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;

		if (oParam) {
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		if (iStep === 1) {
			nsFreshcare.grower.trainingcourse.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find training.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			ns1blankspace.objectContextData = oResponse.data.rows[0];
			
			// Growers cannot update or add any training
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["agritrainingcourseattendee.course.title"].formatXHTML());
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.grower.trainingcourse.init({id: ' + ns1blankspace.objectContext + ')',
				move: false
				});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.grower.trainingcourse.summary()'});
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this training.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.membershiptext'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training Package</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.title'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.title'].formatXHTML() +
						'<br /><span class="ns1blankspaceSubNote">(' + ns1blankspace.objectContextData['agritrainingcourseattendee.course.statustext'].formatXHTML() +
						')</span>' +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Code of Practice</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.package.codeofpracticetext'].formatXHTML() +
						'</td></tr>');

			// v3.4.008 SUP023948 Added Trainer person
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainer</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactbusinesstext'].formatXHTML() +
						'<br /><span class="ns1blankspaceSubNote">(' + 
								ns1blankspace.objectContextData['agritrainingcourseattendee.course.trainercontactpersontext'].formatXHTML() +
							')</span>' + 
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.course.coursedate'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Attending Trainee</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourseattendee.attendingtrainee'].formatXHTML() +
						'</td></tr>');

			aHTML.push('</table>');

			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
		}	
	},

	details: 	function() 
	{

		nsFreshcare.grower.trainingcourse.summary();
	}

}							
