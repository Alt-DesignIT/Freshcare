/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
// v3.1.1 SUP022427 Changed references from attendingtrainee to firstname and surname an split attendingtrainee field into two
// v3.2.015 SUP023421 Change 'Growers' to 'Members'

nsFreshcare.admin.trainingcourse = 
{
	data: 
	{
		historyFields:
		[
			{name: 'agritrainingcourse.reference', caption: 'Reference'},
			{name: 'agritrainingcourse.packagetext', caption: 'Training Package'},
			{name: 'agritrainingcourse.title', caption: 'Title'},
			{name: 'agritrainingcourse.trainercontactbusinesstext', caption: 'Training Organisation'},
			{name: 'agritrainingcourse.trainercontactpersontext', caption: 'Trainer'},
			{name: 'agritrainingcourse.coursedate', caption: 'Course Date'},
			{name: 'agritrainingcourse.location', caption: 'Location'},
			{name: 'agritrainingcourse.state', caption: 'State'},
			{name: 'agritrainingcourse.statustext', caption: 'Course Status'},
			{name: 'agritrainingcourse.details', caption: 'Details'}
		],
	},

	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = nsFreshcare.objectTrainingCourse;	
		ns1blankspace.objectName = 'trainingcourse';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'AGRI_EDUCATION_TRAINING_COURSE';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Training Courses';	
		ns1blankspace.data.trainingCourse = {};
		ns1blankspace.data.trainingCourse.trainingPackage = undefined;
		ns1blankspace.data.trainingCourse.trainingPackageText = undefined;
		ns1blankspace.data.trainingCourse.trainingPackageMembership = undefined;
		ns1blankspace.data.trainingCourse.trainerContactBusiness = undefined;
		ns1blankspace.data.trainingCourse.trainerContactBusinessText = undefined;
		ns1blankspace.data.trainingCourse.trainerContactPerson = undefined;
		ns1blankspace.data.trainingCourse.trainerContactPersonText = undefined;
		ns1blankspace.data.trainingCourse.newTrainee = undefined;
		ns1blankspace.data.trainingCourse.refresh = undefined;
		ns1blankspace.data.trainingCourse.growerReference = undefined;
		ns1blankspace.data.trainingCourse.growerBusiness = undefined;
		ns1blankspace.data.trainingCourse.growerPerson = undefined;
		ns1blankspace.data.trainingCourse.growerBusinessText = undefined;
		ns1blankspace.data.trainingCourse.growerPersonText = undefined;
		nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership = undefined;

		if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer) 
		{
			ns1blankspace.data.trainingCourse.trainerContactBusiness = ns1blankspace.user.contactBusiness;
			ns1blankspace.data.trainingCourse.trainerContactBusinessText = ns1blankspace.user.contactBusinessText;
			ns1blankspace.data.trainingCourse.trainerContactPerson = ns1blankspace.user.contactPerson;
			ns1blankspace.data.trainingCourse.trainerContactPersonText = ns1blankspace.user.commonName;
			// v3.1.209b SUP022867 Get unique list of memberships for this Trainer Business if we're a trainer user
			ns1blankspace.data.trainerBusinessMemberships = [];
			$.each(nsFreshcare.data.memberships, function(i, membership)
			{
				var aTrainerMemberships = $.grep(nsFreshcare.data.trainerMemberships, function(y) {return membership.id == y.membership && y.trainercontactpersontext != ''});
				if (aTrainerMemberships.length > 0)
				{
					ns1blankspace.data.trainerBusinessMemberships.push(aTrainerMemberships[0]);
				}
			});
		}

		if (oParam != undefined)
		{
			if (oParam.trainingPackage) {ns1blankspace.data.trainingCourse.trainingPackage = oParam.trainingPackage;}
			if (oParam.trainingPackageText) {ns1blankspace.data.trainingCourse.trainingPackageText = oParam.trainingPackageText;}
			if (oParam.trainingPackageMembership) {ns1blankspace.data.trainingCourse.trainingPackageMembership = oParam.trainingPackageMembership;}
			if (oParam.trainerContactBusiness) {ns1blankspace.data.trainingCourse.trainerContactBusiness = oParam.trainerContactBusiness;}
			if (oParam.trainerContactBusinessText) {ns1blankspace.data.trainingCourse.trainerContactBusinessText = oParam.trainerContactBusinessText;}
			if (oParam.trainerContactPerson) {ns1blankspace.data.trainingCourse.trainerContactPerson = oParam.trainerContactPerson;}
			if (oParam.trainerContactPersonText) {ns1blankspace.data.trainingCourse.trainerContactPersonText = oParam.trainerContactPersonText;}
			if (oParam.newTrainee) {ns1blankspace.data.trainingCourse.newTrainee = oParam.newTrainee;}
			if (oParam.refresh) {ns1blankspace.data.trainingCourse.refresh = oParam.refresh;}
			if (oParam.growerReference) {ns1blankspace.data.trainingCourse.growerReference = oParam.growerReference;}
			if (oParam.growerBusiness) {ns1blankspace.data.trainingCourse.growerBusiness = oParam.growerBusiness;}
			if (oParam.growerBusinessText) {ns1blankspace.data.trainingCourse.growerBusinessText = oParam.growerBusinessText;}
			if (oParam.growerPerson) {ns1blankspace.data.trainingCourse.growerPerson = oParam.growerPerson;}
			if (oParam.growerPersonText) {ns1blankspace.data.trainingCourse.growerPersonText = oParam.growerPersonText;}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);


		if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer) 
		{
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlAction').button({disabled: false});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
		}
	},

	home: 		function (oParam, oResponse)
	{
		if (oResponse == undefined)
		{
			var aHTML = [];
			var dToday = new Date();
						
			aHTML.push('<table class="ns1blankspaceMain">' + 
							'<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td></tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
								
			var aHTML = [];

			aHTML.push('<table>');
			aHTML.push('<tr><td><div id="ns1blankspaceViewTrainingCourseLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');

			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
			{
				aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td style="padding-top:15px;" id="ns1blankspaceControlCourseBrowser" class="ns1blankspaceControl">Training Course Browser</td>' +
							'</tr>');
			}

			aHTML.push('</table>');		
			
			$('#ns1blankspaceControl').html(aHTML.join(''));

			$('#ns1blankspaceControlCourseBrowser').click(function(event)
			{
				
				$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceMain').attr('data-loading', '1');
				ns1blankspace.xhtml.defaultElementID = this.id;
				
				nsFreshcare.trainer.home.courseStatus.show(
				{
					show: false,
					xhtmlElementID: 'ns1blankspaceMain'
				});
				
			});
										
			
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';		
			oSearch.addField('agritrainingcourse.statustext,agritrainingcourse.trainercontactbusiness,agritrainingcourse.trainercontactbusinesstext' +
							',agritrainingcourse.trainercontactperson,agritrainingcourse.trainercontactpersontext' +
							',agritrainingcourse.title,agritrainingcourse.coursedate,agritrainingcourse.location');

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) {

				oSearch.addFilter("agritrainingcourse.trainercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
				oSearch.addFilter('status', 'NOT_EQUAL_TO', nsFreshcare.data.trainingCourse.statusCancelled);
				oSearch.addFilter('agritrainingcourse.package.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive); 	//v1.0.24
			}
			else {
				// Only show scheduled (past) training courses by default or admin
				oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.trainingCourse.statusScheduled);
				oSearch.addFilter('coursedate', 'LESS_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
			}

			oSearch.rows = 40;
			oSearch.sort('coursedate', 'desc');

			oSearch.getResults(function(oResponse) {nsFreshcare.admin.trainingcourse.home(oParam, oResponse)});	
			
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">');
				if (nsFreshcare.data.trainerMemberships === undefined 
					|| (nsFreshcare.data.trainerMemberships && nsFreshcare.data.trainerMemberships.length === 0) )
					{
					aHTML.push('You are not registered as providing training for any Freshcare Memberships.');
				}
				else {
					aHTML.push('No ' + ((nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) ? 'scheduled (past)' : '') + ' training courses found.')
				}
				aHTML.push('</td></tr></table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST RECENTLY SCHEDULED</td></tr>');
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Status</td>' +
								((nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) ? '<td class="ns1blankspaceCaption">Trainer</td>' : '') +
								'<td class="ns1blankspaceCaption">Title</td>' +
								'<td class="ns1blankspaceCaption">Date</td>' +
								'<td class="ns1blankspaceCaption">Location</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceRow">');

					aHTML.push('<td id="ns1blankspaceMostLikely_status-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourse.statustext"] + '</td>' +
								((nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
									? '<td id="ns1blankspaceMostLikely_trainer-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourse.trainercontactbusinesstext"] + ' - ' + 
											this["agritrainingcourse.trainercontactpersontext"] + '</td>'
									: ''
								) +
								'<td id="ns1blankspaceMostLikely_course-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourse.title"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_date-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourse.coursedate"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_location-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["agritrainingcourse.location"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.trainingcourse.search.send(event.target.id, {source: 1});
			});
		}
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
			// Added ver 1.0.20
			if (jQuery.type(sXHTMLElementId) === "object") {
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
			var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.admin.trainingcourse.show}).value;
			var bSystemSearch = (oParam && oParam.functionShowSystem != undefined);

			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				if (!bSystemSearch) {$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);}
				
				ns1blankspace.objectContext = sSearchContext;
				
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = 'agri';
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
				oSearch.addField('agritrainingcourse.reference,agritrainingcourse.title,agritrainingcourse.details,agritrainingcourse.package.membershiptext' +
								',agritrainingcourse.state,agritrainingcourse.statetext,agritrainingcourse.coursedate,agritrainingcourse.location' +
								',agritrainingcourse.status,agritrainingcourse.statustext,agritrainingcourse.package,agritrainingcourse.packagetext' +
								',agritrainingcourse.trainercontactbusiness,agritrainingcourse.trainercontactbusinesstext,agritrainingcourse.attendeecount' + 
								',agritrainingcourse.trainercontactperson,agritrainingcourse.trainercontactpersontext,agritrainingcourse.package.membership' +
								',agritrainingcourse.package.codeofpractice,agritrainingcourse.package.codeofpracticetext,agritrainingcourse.package.membership.code');
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
					
					var dSearchDate = new Date(sSearchText);
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
					oSearch.addField('title,location,coursedate,status,statustext,trainercontactbusinesstext');
					
					// v3.1.1n Added reference to search
					// v3.2.005 Added course date into search
					oSearch.addBracket("(");
					oSearch.addFilter('location', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('trainercontactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('reference', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
					if (Date.parse(sSearchText) != null)
					{
						oSearch.addOperator('or');
						oSearch.addFilter('coursedate', 'EQUAL_TO', dSearchDate.toString('dd MMM yyyy'));
					}
					oSearch.addBracket(')');
					if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) 
					{	
						// v1.0.24 wasn't applying filters for non-admin users
						oSearch.addFilter("agritrainingcourse.trainercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
						oSearch.addFilter('status', 'NOT_EQUAL_TO', nsFreshcare.data.trainingCourse.statusCancelled);
						oSearch.addFilter('agritrainingcourse.package.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive); 	//v1.0.24
					}

					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.rows = 20;
					oSearch.sort("coursedate", "desc");
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.admin.trainingcourse.search.process(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{	// v3.2.005 Added Trainer business for admin users
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
					
				var sPreviousId = '';

				$.each(oResponse.data.rows, function()
				{
					iColumn = iColumn + 1;
					
					if (iColumn == 1)
					{
						aHTML.push('<tr class="ns1blankspaceSearch">');
					}
					
					aHTML.push('<td class="ns1blankspaceSearch" id="title' +
									'-' + this.id + '">' +
									this.title +
								'</td>'); 
					
					aHTML.push('<td class="ns1blankspaceSearch" id="coursedate' +
									'-' + this.id + '">' +
									this.coursedate + 
								'</td>');

					aHTML.push('<td class="ns1blankspaceSearch" id="status' +
									'-' + this.id + '">' +
									this.statustext + 
								'</td>');

					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
					{
						aHTML.push('<td class="ns1blankspaceSearch" id="status' +
										'-' + this.id + '">' +
										this.trainercontactbusinesstext + 
									'</td>');
					}
									
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
					nsFreshcare.admin.trainingcourse.search.send(event.target.id, {source: 1});
				});

				ns1blankspace.render.bind(
				{
					columns: 'title-column-coursedate-column-statustext' + (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin ? '-column-trainercontactbusinesstext' : ''),
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.trainingcourse.search.send
				});   
				
			}	
		}
	},						

	remove: function(oParam)
	{
		ns1blankspace.container.confirm({title: 'Cannot remove Training Course.', html: 'Feature not yet avaiable'});
		//nsFreshcare.admin.trainingCourse['delete'].validate(oParam);
	},

	'delete':
	{
		validate: function(oParam)
		{
			// Need to check if trainees have been invoices or if there are unprocessed trainees linked ot this course
		},

		send: function(oParam)
		{
			
		}
	},

	layout: 	function ()
	{
		var aHTML = [];

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
						
			aHTML.push('<tr><td id="ns1blankspaceControlTrainees" class="ns1blankspaceControl">' +
							'Trainees</td></tr>');
						
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlSystem" class="ns1blankspaceControl">' +
							'System</td></tr>');
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainTrainees" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainTraineesExport" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSystem" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			nsFreshcare.admin.trainingcourse.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			nsFreshcare.admin.trainingcourse.details();
		});
		
		$('#ns1blankspaceControlTrainees').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainTrainees', context: {inContext: false}});
			//$('#ns1blankspaceViewControlNew').button({disabled: true});
			nsFreshcare.admin.trainingcourse.trainees.show({step: 1});
		});

		// v3.4.001
		$('#ns1blankspaceControlSystem').click(function(event)
		{
			// History records, Modified dates, etc
			ns1blankspace.show({selector: '#ns1blankspaceMainSystem', refresh: true, context: {inContext: false}});
			nsFreshcare.util.system.search({xhtmlElementID: 'ns1blankspaceMainSystem'});
		});
	},

	show: 		function (oParam, oResponse)
	{
		// v3.2.020 SUP023422 Display 'Unprocessed' trainees on Trainees tab
		oParam = oParam || {};
		var aHTML = [];
		var sFunctionDefault = ns1blankspace.util.getParam(oParam, 'functionDefault', {'default': 'nsFreshcare.admin.trainingcourse.summary()', set: true}).value;
		oParam.showStep = oParam.showStep || 1;
		
		if (oParam.showStep == 1)
		{
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			nsFreshcare.admin.trainingcourse.layout();
		
			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find training course.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.trainingCourse.trainingPackage = ns1blankspace.objectContextData["agritrainingcourse.package"];
				ns1blankspace.data.trainingCourse.trainingPackageText = ns1blankspace.objectContextData["agritrainingcourse.packagetext"];
				ns1blankspace.data.trainingCourse.trainerContactBusiness = ns1blankspace.objectContextData["agritrainingcourse.trainercontactbusiness"];
				ns1blankspace.data.trainingCourse.trainerContactBusinessText = ns1blankspace.objectContextData["agritrainingcourse.trainercontactbusinesstext"];
				ns1blankspace.data.trainingCourse.trainerContactPerson = ns1blankspace.objectContextData["agritrainingcourse.trainercontactperson"];
				ns1blankspace.data.trainingCourse.trainerContactPersonText = ns1blankspace.objectContextData["agritrainingcourse.trainercontactpersontext"];
				ns1blankspace.data.trainingCourse.attendeeCount = Number(ns1blankspace.objectContextData["agritrainingcourse.attendeecount"])

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
				{
					$('#ns1blankspaceViewControlAction').button({disabled: false});
					$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					
				}
				else 
				{
					$('#ns1blankspaceViewControlNew').button({disabled: true});
				}
				oParam.showStep = 2;	// We need to determine whether we can invoice this training course if applicable
				nsFreshcare.admin.trainingcourse.show(oParam);
			}
		}

		// Determine if there's any unprocessed trainees
		else if (oParam.showStep === 2)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';
			oSearch.addField('businessname,firstname,surname');
			oSearch.addFilter('course', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.addFilter('sestatus', 'EQUAL_TO', '1');
			oSearch.rows = 50;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					ns1blankspace.data.trainingCourse.tempAttendees = oResponse.data.rows;
					oParam.showStep = (oResponse.data.rows.length > 0) ? 10 : 3;
					if (oResponse.data.rows.length > 0) {ns1blankspace.status.message('Unprocessed trainees exist for this Training Course!')}
					nsFreshcare.admin.trainingcourse.show(oParam);
				}
				else
				{
					ns1blankspace.status.error('Error finding unprocessed trainees: ' + oResponse.error.errornotes);
				}
			});
		}

		// See if already invoiced (only if status is Completed or Scheduled and the course is in the past)
		else if (oParam.showStep === 3)
		{
			var dCourse = (ns1blankspace.objectContextData['agritrainingcourse.coursedate'] != '') 
							? new Date(ns1blankspace.objectContextData['agritrainingcourse.coursedate']) 
							: new Date(dToday.toString('dd MMM yyyy'));

			// v3.2.020 SUP023559 Find invoice number if comp
			if ((ns1blankspace.objectContextData['agritrainingcourse.status'] === nsFreshcare.data.trainingCourse.statusScheduled
				 || ns1blankspace.objectContextData['agritrainingcourse.status'] == nsFreshcare.data.trainingCourse.statusCompleted)
				&& dCourse < (new Date(dToday.toString('dd MMM yyyy'))))
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
				oSearch.addField('reference');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourse);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.showStep = 10;
						if (oResponse.data.rows.length > 0)
						{
							ns1blankspace.data.trainingCourse.invoiceNumber = oResponse.data.rows[0].reference;
							ns1blankspace.data.trainingCourse.invoiceID = oResponse.data.rows[0].id;
						}
						nsFreshcare.admin.trainingcourse.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding related invoice: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				oParam.showStep = 10;
				ns1blankspace.data.trainingCourse.invoiceNumber = '';
				ns1blankspace.data.trainingCourse.invoiceID = '';
				nsFreshcare.admin.trainingcourse.show(oParam);
			}
		}

		else if (oParam.showStep === 10)
		{
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["agritrainingcourse.title"] +
					'<br /><span class="ns1blankspaceSub">' + ns1blankspace.objectContextData['agritrainingcourse.coursedate'] + '</span>');
			
			// v2.0.4 Removed search.send from newDestination and now passes object with id to init
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.admin.trainingcourse.init({id: ' + ns1blankspace.objectContext + ')',
				move: false
				});
			
			ns1blankspace.history.control(oParam);
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this training course.</td></tr></table>');
					
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
			
			if (ns1blankspace.objectContextData['agritrainingcourse.packagetext'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training Package</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingcourse.packagetext'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['agritrainingcourse.membershiptext'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Package Code of Practice</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingcourse.package.membership.code'] + ' ' +
							ns1blankspace.objectContextData['agritrainingcourse.package.codeofpracticetext'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusinesstext'] != '' 
				&& ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness'] != ns1blankspace.user.contactBusiness)
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training Body</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusinesstext'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['agritrainingcourse.location'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Location</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingcourse.location'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['agritrainingcourse.coursedate'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingcourse.coursedate'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Status</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingcourse.statustext'] +
						'</td></tr>');

			if (ns1blankspace.data.trainingCourse.invoiceNumber != '' && ns1blankspace.data.trainingCourse.invoiceNumber != undefined)
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Invoice Number</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.data.trainingCourse.invoiceNumber +
							'</td></tr>');
			}

			// v3.2.010 Added details to Summary tab
			if (ns1blankspace.objectContextData['details'])
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Notes</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.util.toBR(ns1blankspace.objectContextData.details.formatXHTML()) +
							'</td></tr>');
			}

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];

			aHTML.push('<table class="ns1blankspaceColumn2">');

			// v3.2.020 Added buton to go to Training Package			
			aHTML.push('<tr><td><span id="ns1blankspaceCourseViewPackage" class="ns1blankspaceAction" style="width:150px;">' +
						'View Package</span></td></tr>');

			// Conditionally add Add trainee button
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin || 
				(nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer 
				 	&& ns1blankspace.objectContextData['agritrainingcourse.status'] != nsFreshcare.data.trainingCourse.statusCompleted)) 
			{
				aHTML.push('<tr><td><span id="ns1blankspaceCourseAddTrainee" class="ns1blankspaceAction" style="width:150px;">' +
							'Add Trainee</span></td></tr>');
			}

			// Conditionally add Process New Trainees or Create Invoice or View Invoice button
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
			{
				if (ns1blankspace.data.trainingCourse.tempAttendees && ns1blankspace.data.trainingCourse.tempAttendees.length > 0)
				{
					aHTML.push('<tr><td><span id="ns1blankspaceCourseProcessNewTrainees" class="ns1blankspaceAction" style="width:150px;">' +
								'Process New Trainee</span></td></tr>');
				}

				else if ((ns1blankspace.data.trainingCourse.tempAttendees  === undefined || ns1blankspace.data.trainingCourse.tempAttendees.length == 0)
					&& ns1blankspace.data.trainingCourse.invoiceNumber === undefined && ns1blankspace.data.trainingCourse.attendeeCount > 0)
				{
					aHTML.push('<tr><td><span id="ns1blankspaceCourseCreateInvoice" class="ns1blankspaceAction" style="width:150px;">' +
								'Create Invoice</span></td></tr>');
				}

				else if (ns1blankspace.data.trainingCourse.invoiceNumber != undefined && ns1blankspace.data.trainingCourse.invoiceNumber != '')
				{
					aHTML.push('<tr><td><span id="ns1blankspaceCourseViewInvoice" class="ns1blankspaceAction"style="width:150px;">' +
								'View Invoice</span></td></tr>');
				}
			}

			aHTML.push('</table>');					

			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			$('#ns1blankspaceCourseViewPackage').button(
			{
				label: 'View Package',
				icons:
				{
					primary: "ui-icon-play"
				}
			})
			.click(function() 
			{
				nsFreshcare.admin.trainingpackage.init({id: ns1blankspace.objectContextData['agritrainingcourse.package']});
			});

			$('#ns1blankspaceCourseAddTrainee').button(
			{
				label: 'Add Trainee',
				icons:
				{
					primary: "ui-icon-person"
				}
			})
			.click(function() {
				ns1blankspace.show({selector: '#ns1blankspaceMainTrainees'});
				nsFreshcare.admin.trainingcourse.trainees.show({step: 1, 
													onCompleteWhenCan: nsFreshcare.admin.trainingcourse.trainees.add});
			});

			$('#ns1blankspaceCourseProcessNewTrainees').button(
			{
				label: 'Process New Trainees',
				icons:
				{
					primary: "ui-icon-document-b"
				}
			})
			.click(function() 
			{
				nsFreshcare.admin.newgrower.init();
			});

			$('#ns1blankspaceCourseCreateInvoice').button(
			{
				label: 'Create Invoice',
				icons:
				{
					primary: "ui-icon-calculator"
				}
			})
			.click(function() 
			{
				nsFreshcare.admin.trainingcourse.createInvoice();
			});

			$('#ns1blankspaceCourseViewInvoice').button(
			{
				label: 'View Invoice',
				icons:
				{
					primary: "ui-icon-calculator"
				}
			})
			.click(function() 
			{
				ns1blankspace.financial.invoice.init({id: ns1blankspace.data.trainingCourse.invoiceID});
			});

		}	
	},

	details: function()
	{
		var aHTML = [];
		var dToday = new Date();
		var iMembership = (ns1blankspace.data.trainingCourse && ns1blankspace.data.trainingCourse.trainingPackageMembership)
							? ns1blankspace.data.trainingCourse.trainingPackageMembership
							: (ns1blankspace.objectContextData 
								? ns1blankspace.objectContextData['agritrainingcourse.package.membership']
								: undefined);
		
		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainDetails').attr('data-loading', '');

			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer && iMembership != undefined)
			{
				nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership = 
					$.map($.grep(nsFreshcare.data.trainerMemberships, function(x) {return x.membership == iMembership && x.trainercontactperson != ''}), 
						function(y) {return y.trainercontactperson}).join(',');
			}

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
							'<td class="ns1blankspaceCaption">' +
							'Training Package' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td');

			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
			{
				aHTML.push('><input id="ns1blankspaceDetailsTrainingPackage" class="ns1blankspaceSelect"' +
							' data-method="AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH"' +
							' data-methodFilter="title-TEXT_IS_LIKE"' +
							' data-mandatory="1" data-caption="Training Package"' +
							' data-click="nsFreshcare.admin.trainingcourse.postPackageSelect"' +
							' data-columns="title-space-availablefrom-space-availableto">');
			}
			else
			{
				aHTML.push(' id="ns1blankspaceDetailsTrainingPackage" class="ns1blankspaceSummary">');
			}
			aHTML.push('</td></tr>');			

			aHTML.push('<tr id="ns1blankspaceDetailsReferenceCaption" class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Reference' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsReferenceValue" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Title' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Title">' +
							'</td></tr>');			
							
			// Trainers don't need to see the Trainer Business information - it's only ever themselves
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
			{
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Training Organisation' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspace">' +
								'<input id="ns1blankspaceDetailsTrainerBusiness" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Training Organisation"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' + 
								' data-click="nsFreshcare.admin.trainingcourse.postPackageSelect"' +
								' data-columns="tradename"' +
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|' +
													'contactbusiness.businessgroup-IN_LIST-' + nsFreshcare.data.businessGroupTrainer + '">' +
								'</td></tr>');
			}

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'Trainer' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTrainer" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Trainer"' +
								' data-method="CONTACT_PERSON_SEARCH"' +
								' data-columns="firstname-space-surname"' +
								' data-methodFilter="contactperson.persongroup-IN_LIST-' + nsFreshcare.data.groupTrainer.join(',') + '|' +
													'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE' +
													((nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer) 
														? '|contactperson.contactbusiness-EQUAL_TO-' + ns1blankspace.user.contactBusiness + 
														  '|id-IN_LIST-' + nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership + '"' 
														: '" data-Parent="ns1blankspaceDetailsTrainerBusiness"' +
															' data-parent-search-id="contactbusiness"' +
															' data-parent-search-text="tradename"') +
								'>' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'State' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsState" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="State"' +
								' data-method="SITE_STATE_SEARCH"');

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
				&& $.grep(nsFreshcare.data.trainerStates, function(a) {return a.state === nsFreshcare.data.stateDistanceEducation}).length == 0) 
			{
				aHTML.push(' |id-NOT_IN_LIST-' + nsFreshcare.data.stateDistanceEducation);
			}
			aHTML.push('">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Location' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceDetailsLocation" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Location">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Course Date' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsCourseDate" class="ns1blankspaceDate"' +
								' data-mandatory="1" data-caption="Course Date">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'Status' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsStatus" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Status"' +
								' data-method="SETUP_AGRI_TRAINING_COURSE_STATUS_SEARCH"');

			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) {
				aHTML.push(' data-cache="true"' + 
						   ' data-methodFilter="id-NOT_EQUAL_TO-' + nsFreshcare.data.trainingCourse.statusCompleted + '"');		// Don't show Completed option if non -admin
			}
			aHTML.push('></td></tr>');


			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

			aHTML = [];

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Details' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="30" id="ns1blankspaceDetailsDetails" class="ns1blankspaceTextMulti"></textarea>' +
							'</td></tr>');							
							

			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

			// Non-admin users are not allowed to set or edit Reference
			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) {
				if (ns1blankspace.objectContext == -1) {
					$('#ns1blankspaceDetailsReferenceCaption').hide();
					$('#ns1blankspaceDetailsReferenceValue').hide();
				}
				else {
					$('#ns1blankspaceDetailsReference').attr('disabled', true);
					$('#ns1blankspaceDetailsReference').addClass('nsFreshcareDisabled');
				}
			}


			if (ns1blankspace.objectContextData != undefined)
			{	
				$('#ns1blankspaceDetailsTrainingPackage').val(ns1blankspace.objectContextData['agritrainingcourse.packagetext'].formatXHTML());
				$('#ns1blankspaceDetailsTrainingPackage').html(ns1blankspace.objectContextData['agritrainingcourse.packagetext'].formatXHTML());
				$('#ns1blankspaceDetailsTrainingPackage').attr('data-id', ns1blankspace.objectContextData['agritrainingcourse.package']);
				$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData["agritrainingcourse.reference"].formatXHTML());
				$('#ns1blankspaceDetailsTrainer').val(ns1blankspace.objectContextData['agritrainingcourse.trainercontactpersontext'].formatXHTML());
				$('#ns1blankspaceDetailsTrainer').attr('data-id', ns1blankspace.objectContextData['agritrainingcourse.trainercontactperson']);
				$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData['agritrainingcourse.title'].formatXHTML());
				$('#ns1blankspaceDetailsDetails').val(ns1blankspace.objectContextData['agritrainingcourse.details'].formatXHTML());
				$('#ns1blankspaceDetailsState').val(ns1blankspace.objectContextData['agritrainingcourse.statetext'].formatXHTML());
				$('#ns1blankspaceDetailsState').attr('data-id', ns1blankspace.objectContextData['agritrainingcourse.state']);
				$('#ns1blankspaceDetailsLocation').val(ns1blankspace.objectContextData['agritrainingcourse.location'].formatXHTML());
				$('#ns1blankspaceDetailsCourseDate').val(ns1blankspace.objectContextData['agritrainingcourse.coursedate'].formatXHTML());
				$('#ns1blankspaceDetailsStatus').val(ns1blankspace.objectContextData['agritrainingcourse.statustext'].formatXHTML());
				$('#ns1blankspaceDetailsStatus').attr('data-id', ns1blankspace.objectContextData['agritrainingcourse.status']);

				// Trainers don't see Trainer business
				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
				{
					$('#ns1blankspaceDetailsTrainerBusiness').val(ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusinesstext'].formatXHTML());
					$('#ns1blankspaceDetailsTrainerBusiness').attr('data-id', ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness']);
				}

				// All fields to be disabled if trainer and Status == Completed
				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer)
				{ 
					if ($('#ns1blankspaceDetailsStatus').attr('data-id') === nsFreshcare.data.trainingCourse.statusCompleted) 
					{
						$('input:visible').attr('disabled', true);
						$('input:visible').addClass('nsFreshcareDisabled');
						$('textarea:visible').attr('disabled', true);
						$('textarea:visible').addClass('nsFreshcareDisabled');
						$('#ns1blankspaceViewControlSearch').removeClass('nsFreshcareDisabled');
						$('#ns1blankspaceViewControlSearch').attr('disabled', false);
					}
				}

				// v3.2.010 SUP023470 Was not calling this when populating data so values weren't set
				if ($('#ns1blankspaceDetailsTrainingPackage').attr('data-id'))
				{
					nsFreshcare.admin.trainingcourse.postPackageSelect();
				}
			}
			else 
			{
				// Defaults go here
				
				var dToday = new Date();
				// v3.1.1a Was erroring when user didn't start from Training Package page
				// v3.1.209b SUP022867 Added Training Package Membership to Package element
				if (ns1blankspace.data.trainingCourse && ns1blankspace.data.trainingCourse.trainingPackageText)
				{
					$('#ns1blankspaceDetailsTrainingPackage').val(ns1blankspace.data.trainingCourse.trainingPackageText.formatXHTML());
					$('#ns1blankspaceDetailsTrainingPackage').attr('data-id', ns1blankspace.data.trainingCourse.trainingPackage);
					$('#ns1blankspaceDetailsTrainingPackage').attr('data-membershipid', ns1blankspace.data.trainingCourse.trainingPackageMembership);
					$('#ns1blankspaceDetailsTitle').val(ns1blankspace.data.trainingCourse.trainingPackageText.formatXHTML());
					$('#ns1blankspaceDetailsStatus').val('Scheduled');
					$('#ns1blankspaceDetailsStatus').attr('data-id', nsFreshcare.data.trainingCourse.statusScheduled);
				}

				if (nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer)
				{
					$('#ns1blankspaceDetailsTrainingPackage').html(ns1blankspace.data.trainingCourse.trainingPackageText.formatXHTML());
					$('#ns1blankspaceDetailsTrainingPackage').attr('data-membershipid', ns1blankspace.data.trainingCourse.trainingPackageMembership);
					$('#ns1blankspaceDetailsTrainerBusiness').val(ns1blankspace.user.contactBusinessText.formatXHTML());
					$('#ns1blankspaceDetailsTrainerBusiness').attr('data-id', ns1blankspace.user.contactBusiness);
				}
				else
				{
					$('#ns1blankspaceDetailsTrainerBusiness')
						.val((ns1blankspace.data.trainingCourse.trainerContactBusinessText) ? ns1blankspace.data.trainingCourse.trainerContactBusinessText.formatXHTML() : '')
						.attr('data-id', ns1blankspace.data.trainingCourse.trainerContactBusiness);
					$('#ns1blankspaceDetailsTrainer')
						.val((ns1blankspace.data.trainingCourse.trainerContactPersonText) ? ns1blankspace.data.trainingCourse.trainerContactPersonText.formatXHTML() : '')
						.attr('data-id', ns1blankspace.data.trainingCourse.trainerContactPerson);
				}
				$('#ns1blankspaceDetailsCourseDate').val(dToday.toString('dd MMM yyyy'));
			}
		}	
	},

	postPackageSelect: function(oParam)
	{
		// v3.1.209b SUP022867 When admin user changes trainer business or package, filter list of Trainers. But only if we have both values
		// v3.1.210 SUP023232 Can also get package id if package selected
		oParam = oParam || {};
		var iMembership = ns1blankspace.util.getParam(oParam, 'membership', {'default': $('#ns1blankspaceDetailsTrainingPackage').attr('data-membershipid')}).value;
		var iTrainerBusiness = ns1blankspace.util.getParam(oParam, 'business', {'default': $('#ns1blankspaceDetailsTrainerBusiness').attr('data-id')}).value;
		var sTrainerFilter = $('#ns1blankspaceDetailsTrainer').attr('data-methodFilter');

		if (iMembership == undefined 
			&& (ns1blankspace.xhtml.divID == 'ns1blankspaceDetailsTrainingPackage' || $('#ns1blankspaceDetailsTrainingPackage').attr('data-id') != undefined))
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';
			oSearch.addField('membership');
			oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsTrainingPackage').attr('data-id'));
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					if (oResponse.data.rows.length > 0)
					{
						$('#ns1blankspaceDetailsTrainingPackage').attr('data-membershipid', oResponse.data.rows[0].membership);
						nsFreshcare.admin.trainingcourse.postPackageSelect(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find Package Membership: Selected package not found');
					}
				}
				else
				{
					ns1blankspace.status.error('Unable to find Package Membership: ' + oResponse.error.errornotes);
				}
			});
		}

		if (iMembership && iTrainerBusiness)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_MEMBERSHIP_TRAINER_SEARCH';
			oSearch.addField('trainercontactperson,trainercontactpersontext,membership');
			oSearch.addFilter('membership', 'EQUAL_TO', iMembership);
			oSearch.addFilter('trainercontactbusiness', 'EQUAL_TO', iTrainerBusiness);
			//oSearch.addFilter('trainercontactpersontext', 'IS_NOT_NULL');
			oSearch.rows = 50;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership = $.map(oResponse.data.rows, function(x) {return x.trainercontactperson}).join(',');
					if (sTrainerFilter.indexOf('id-IN_LIST') > -1)
					{
						sTrainerFilter = sTrainerFilter.substr(0, sTrainerFilter.indexOf('id-IN_LIST') - 1);
					}
					$('#ns1blankspaceDetailsTrainer').attr('data-methodFilter', sTrainerFilter + '|id-IN_LIST-' + nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership);

					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
			});
		}
	},

	save:     	
	{		
		validate: function(oParam) 
		{
			// Validate Mandatory fields
			// v1.0.26 data-id must be set on mandatory combos
			// v1.0.31 Was not resetting okToSave
			if (oParam.trainerValidateStep == undefined) {oParam.trainerValidateStep = 1}

			if (oParam.trainerValidateStep == 1)
			{	
				ns1blankspace.okToSave = true;

				$($.grep($('input'), function (a) {return $(a).attr('id').indexOf('ns1blankspaceDetails') > -1;})).each( function() {

					if ($(this).attr('data-mandatory') === '1' 
						&& ($(this).val() === ''
						   	|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) {

						// Find the caption first - either the data-caption attribute or whatever's left on the id after ns1blankspaceDetails
						var sCaption = $(this).attr('data-caption');
						if (sCaption === undefined) {
							sCaption = $(this).attr('id').substr('ns1blankspaceDetails'.length);
						}
						if (sCaption === undefined) { sCaption = $(this).attr('id');}

						ns1blankspace.status.message(sCaption + ' is mandatory.');
						ns1blankspace.okToSave = false;
						return false;		
					}
				});

				if (ns1blankspace.okToSave == true)
				{
					oParam.trainerValidateStep = 2;
					nsFreshcare.admin.trainingcourse.save.validate(oParam);
				}
			}

			// v3.1.209b SUP022867 Check if TrainerPerson has this membership 
			else if (oParam.trainerValidateStep == 2)
			{
				if (nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership == undefined)
				{
					// v3.2.010 membership not set when new record
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam.onComplete = nsFreshcare.admin.trainingcourse.save.validate;
					oParam.membership = ns1blankspace.data.trainingCourse.trainingPackageMembership || ns1blankspace.objectContextData['agritrainingcourse.package.membership'];
					nsFreshcare.admin.trainingcourse.postPackageSelect(oParam);
				}
				else
				{
					oParam.trainerValidateStep = 10;
					if (nsFreshcare.admin.trainingcourse.data.trainersWithThisMembership.indexOf($('#ns1blankspaceDetailsTrainer').attr('data-id')) == -1)
					{
						ns1blankspace.status.error('Trainer ' + $('#ns1blankspaceDetailsTrainer').val() + ' is not accredited to train for this training package.');
						ns1blankspace.okToSave = false;
					}
					nsFreshcare.admin.trainingcourse.save.validate(oParam);
				}
			}

			else if (oParam.trainerValidateStep == 10)
			{
				if (oParam && oParam.onComplete)
				{
					oParam.courseSaveStep = 2;
					ns1blankspace.util.onComplete(oParam);
				}
			}
		},

		send: 	function(oParam) 
		{
			var oData = {};

			if (oParam)
			{
				if (oParam.courseSaveStep === undefined) {oParam.courseSaveStep = 1;}
			}
			else
			{ 	oParam = {courseSaveStep: 1}}

			if (oParam.courseSaveStep === 1)
			{
				ns1blankspace.status.working();
				oParam.onComplete = nsFreshcare.admin.trainingcourse.save.send;
				nsFreshcare.data.saveError = [];
				nsFreshcare.admin.trainingcourse.save.validate(oParam);
			}

			// Save training Course data first
			else if (oParam.courseSaveStep === 2 && ns1blankspace.okToSave) 
			{
				// v3.1.1 SUP022512 Changed from sData to oData to allow update of ns1blankspace.objectContextData after save
				if (ns1blankspace.objectContext != -1)
				{ 	oData.id = ns1blankspace.objectContext; }

				oData.package = $('#ns1blankspaceDetailsTrainingPackage').attr('data-id');
				oData.packagetext = $('#ns1blankspaceDetailsTrainingPackage').val();
				oData.reference = $('#ns1blankspaceDetailsReference').val();
				oData.title = $('#ns1blankspaceDetailsTitle').val();

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin) 
				{
					oData.trainercontactbusiness = $('#ns1blankspaceDetailsTrainerBusiness').attr('data-id');
					oData.trainercontactperson = $('#ns1blankspaceDetailsTrainer').attr('data-id');
					oData.trainercontactbusinesstext = $('#ns1blankspaceDetailsTrainerBusiness').val();
					oData.trainercontactpersontext = $('#ns1blankspaceDetailsTrainer').val();
				}
				else 
				{
					// v3.1.1a SUP022550 was setting trainercontactbusiness to ns1blankspace.user.contactBusinessText
					oData.trainercontactbusiness = ns1blankspace.user.contactBusiness;
					oData.trainercontactperson = ns1blankspace.user.contactPerson;
					oData.trainercontactbusinesstext = ns1blankspace.user.contactBusinessText;
					oData.trainercontactpersontext = ns1blankspace.user.contactPersonText;
				}
				oData.state = $('#ns1blankspaceDetailsState').attr('data-id');
				oData.statetext = $('#ns1blankspaceDetailsState').val();
				oData.location = $('#ns1blankspaceDetailsLocation').val();
				oData.coursedate = $('#ns1blankspaceDetailsCourseDate').val();
				oData.status = $('#ns1blankspaceDetailsStatus').attr('data-id');
				oData.statustext = $('#ns1blankspaceDetailsStatus').val();
				oData.details = $('#ns1blankspaceDetailsDetails').val();

				oParam.data = oData;
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_MANAGE'),
					data: oData,
					dataType: 'JSON',
					success: function(oResponse) 
					{
						nsFreshcare.admin.trainingcourse.save.process(oParam, oResponse);
					}
				});
			}

		},

		process: function(oParam, oResponse) 
		{
			var oData = ns1blankspace.util.getParam(oParam, 'data', {'default': {}}).value;

			if (oResponse.status == 'OK')
			{
				ns1blankspace.status.message('Saved');
				if (ns1blankspace.objectContext === -1) {var bNew = true;}
				ns1blankspace.objectContext = oResponse.id;	
				ns1blankspace.inputDetected = false;
				
				if (bNew) {nsFreshcare.admin.trainingcourse.search.send('-' + ns1blankspace.objectContext)}
				else
				{
					$.each(Object.keys(oData), function(index, key)
					{
						if (key != 'id')
						{ns1blankspace.objectContextData['agritrainingcourse.' + key] = oData[key];}
					});
					// v3.3.008 SUP023843 Remove so that actions appear if status has changed
					$('#ns1blankspaceMainTrainees').attr('data-loading', '1');
					delete(ns1blankspace.objectContextData.courses); 	
				}
			}
			else
			{
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
		}
	},

	createInvoice: function(oParam)
	{
		var dCourse = ( ns1blankspace.objectContextData['agritrainingcourse.coursedate'] != '')
						? new Date( ns1blankspace.objectContextData['agritrainingcourse.coursedate'])
						: new Date(dToday.toString('dd MMM yyyy'));
		var sData = '';

		if (oParam)
		{
			if (oParam.courseCreateInvoiceStep === undefined) {oParam.courseCreateInvoiceStep = 1}
		}
		else {oParam = {courseCreateInvoiceStep: 1}}


		// Check if we can create the invoice and get the current list of attendees 
		if (oParam.courseCreateInvoiceStep === 1)
		{
			ns1blankspace.status.working('Creating Invoice...');
			if (ns1blankspace.data.trainingCourse.attendeeCount > 0
				&& ns1blankspace.objectContextData['agritrainingcourse.status'] === nsFreshcare.data.trainingCourse.statusScheduled
				&& dCourse < (new Date(dToday.toString('dd MMM yyyy')))
				&& (ns1blankspace.data.trainingCourse.tempAttendees  === undefined || ns1blankspace.data.trainingCourse.tempAttendees.length == 0))
			{
				oParam.courseCreateInvoiceStep = 2;
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.trainingcourse.createInvoice);
				nsFreshcare.admin.trainingcourse.trainees.search(oParam);
			}
			else
			{
				if (ns1blankspace.data.trainingCourse.attendeeCount === 0)
				{
					ns1blankspace.status.error('Cannot Create Invoice. There are no trainees for this training course!');
				}
				else if (ns1blankspace.objectContextData['agritrainingcourse.status'] != nsFreshcare.data.trainingCourse.statusScheduled)
				{
					ns1blankspace.status.error('Cannot Create Invoice. Status must be set to Scheduled.');
				}
				else if (dCourse >= (new Date(dToday.toString('dd MMM yyyy'))))
				{
					ns1blankspace.status.error('Cannot Create Invoice. Course date must be in the past.');
				}
				else if (ns1blankspace.data.trainingCourse.tempAttendees.length > 0)
				{
					ns1blankspace.status.error('Cannot Create Invoice. There are unprocessed new trainees.');
				}
				ns1blankspace.status.clear();
			}
		}

		// Determine royalty rate if not already determined 
		else if (oParam.courseCreateInvoiceStep === 2)
		{
			// v3.1.207 SUP023092 Was previously hard-coding royaltyrate - now looks for it against membership
			//oParam.courseCreateInvoiceStep = 3;
			//nsFreshcare.data.trainingCourse.royaltyRate = '82.50';
			//nsFreshcare.admin.trainingcourse.createInvoice(oParam);
			// v3.2.025 Was previously only getting royalty rate when not set - was ending up wrong if dates changed
		
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_MEMBERSHIP_FEE_SEARCH';
			oSearch.addField('type,typetext,amount');
			oSearch.addFilter('type', 'EQUAL_TO', '4');
			oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.objectContextData['agritrainingcourse.package.membership']);
			oSearch.addFilter('fromdate', 'LESS_THAN_OR_EQUAL_TO', ns1blankspace.objectContextData['agritrainingcourse.coursedate']);
			oSearch.addBracket('(');
			oSearch.addFilter('todate', 'GREATER_THAN_OR_EQUAL_TO', ns1blankspace.objectContextData['agritrainingcourse.coursedate']);
			oSearch.addOperator('or');
			oSearch.addFilter('todate', 'IS_NULL');
			oSearch.addBracket(')');
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
				{
					oParam.courseCreateInvoiceStep = 3;
					nsFreshcare.data.trainingCourse.royaltyRate = oResponse.data.rows[0].amount;
					nsFreshcare.admin.trainingcourse.createInvoice(oParam);
				}
				else
				{
					if (oResponse.data.rows.length === 0)
					{
						ns1blankspace.status.error('Invoice cannot be created. Royalty Rate cannot be found.');
					}
					else
					{
						ns1blankspace.status.error('Error finding Royalty Rate: ' + oResponse.error.errornotes);
					}
					ns1blankspace.status.clear();
				}
			});
		}

		// Get the id for financial account code 4-2100
		else if (oParam.courseCreateInvoiceStep === 3)
		{
			oParam.courseCreateInvoiceStep = 4;
			if (ns1blankspace.financial.data && ns1blankspace.financial.data.accounts)
			{
				oParam.financialAccount = $.map($.grep(ns1blankspace.financial.data.accounts, function(x) {return x.code === '4-2100' && x.type === '2'}),
												function(y) {return y.id}).shift();
				nsFreshcare.admin.trainingcourse.createInvoice(oParam);
			}
			else
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_FINANCIAL_ACCOUNT_SEARCH';
				oSearch.addField('code,title');
				oSearch.addFilter('code', 'EQUAL_TO', '4-2100');
				oSearch.addFilter('type', 'EQUAL_TO', '2');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
					{
						oParam.financialAccount = oResponse.data.rows[0].id;
						nsFreshcare.admin.trainingcourse.createInvoice(oParam);
					}
					else
					{
						if (oResponse.data.rows.length === 0)
						{
							ns1blankspace.status.error('Invoice cannot be created. Financial Account Code 4-2100 cannot be found.');
						}
						else
						{
							ns1blankspace.status.error('Error finding Finacial Account code: ' + oResponse.error.errornotes);
						}
						ns1blankspace.status.clear();
					}
				});
			}
		}

		// v3.2.100 SUP023329 Now get the accounts contact or primary contact person
		else if (oParam.courseCreateInvoiceStep === 4)
		{
			ns1blankspace.objectContextData.invoiceContactPerson = '';
			oParam.businessID = ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness'];
			oParam.variablePerson = 'ns1blankspace.objectContextData.invoiceContactPerson';
			oParam.courseCreateInvoiceStep = 5;
			oParam.onComplete = nsFreshcare.admin.trainingcourse.createInvoice;
			nsFreshcare.extend.financial.defaultContactPerson(oParam);
		}
		// Now create the invoice based on the Trainees
		else if (oParam.courseCreateInvoiceStep === 5)
		{
			// v3.1.209b SUP023067 added formatXHTML to stop invoice description showing &amp;
			sData = 'description=' + ns1blankspace.util.fs('Royalty Payments for Training Course ' + ns1blankspace.objectContextData['agritrainingcourse.title'].formatXHTML() + 
															' conducted on ' + ns1blankspace.objectContextData['agritrainingcourse.coursedate'] + 
															' at ' + ns1blankspace.objectContextData['agritrainingcourse.location']);
			sData += '&contactbusinesssentto=' + ns1blankspace.util.fs(ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness']) +
					 '&contactpersonsentto=' + ns1blankspace.util.fs(ns1blankspace.objectContextData.invoiceContactPerson) +
					 '&sent=N&sentdate=' + ns1blankspace.util.fs((new Date()).toString('dd MMM yyyy')) +
					 '&object=' + nsFreshcare.objectTrainingCourse +
					 '&objectcontext=' + ns1blankspace.objectContext;

			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
				data: sData,
				rf: 'json',
				success: function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.invoiceID = oResponse.id;
						oParam.courseCreateInvoiceStep = 6;
						nsFreshcare.admin.trainingcourse.createInvoice(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to create invoice: ' + oResponse.error.errornotes);
						ns1blankspace.status.clear();
					}
				}
			});

		}

		// Create line items
		else if (oParam.courseCreateInvoiceStep === 6)
		{
			if (oParam.lineItemIndex === undefined) {oParam.lineItemIndex = 0;}

			if (oParam.lineItemIndex < ns1blankspace.objectContextData.trainees.length)
			{
				var oThisTrainee = ns1blankspace.objectContextData.trainees[oParam.lineItemIndex];
				var sTraineeName = oThisTrainee.firstname.formatXHTML() + (oThisTrainee.firstname.formatXHTML() != '' ? ' ' : '') + oThisTrainee.surname.formatXHTML();

				sData = 'object=5' +
						'&objectcontext=' + oParam.invoiceID +
						'&amount=' + ns1blankspace.util.fs(nsFreshcare.data.trainingCourse.royaltyRate) +
						'&description=' + ns1blankspace.util.fs('Attendee: ' + sTraineeName) +
						'&financialaccount=' + oParam.financialAccount;

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('FINANCIAL_ITEM_MANAGE'),
					data: sData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.lineItemIndex += 1;
							nsFreshcare.admin.trainingcourse.createInvoice(oParam);
						}
						else
						{
							ns1blankspace.status.error('Line item for ' + sTraineeName + ' could not be added: ' + oResponse.error.errornotes);
							ns1blankspace.status.clear();
						}
					}
				});
			}
			else
			{
				oParam.courseCreateInvoiceStep = 7;
				delete(oParam.lineItemIndex);
				nsFreshcare.admin.trainingcourse.createInvoice(oParam);
			}
		}

		// Get Invoice Number
		else if (oParam.courseCreateInvoiceStep === 7)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
			oSearch.addField('reference');
			oSearch.addFilter('id', 'EQUAL_TO', oParam.invoiceID);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
				{
					oParam.courseCreateInvoiceStep = 10;
					ns1blankspace.data.trainingCourse.invoiceNumber = oResponse.data.rows[0].reference;
					ns1blankspace.data.trainingCourse.invoiceID = oResponse.data.rows[0].id;
					nsFreshcare.admin.trainingcourse.createInvoice(oParam);
				}
				else
				{
					if (oResponse.data.rows.length === 0)
					{
						ns1blankspace.status.error('Invoice has not been created. Please contact support!');
					}
					else
					{
						ns1blankspace.status.error('Error finding Invoice Number: ' + oResponse.error.errornotes);
					}
					ns1blankspace.status.clear();
				}
			});

		}
		// Finish up
		else if (oParam.courseCreateInvoiceStep === 10)
		{
			ns1blankspace.status.message('Invoice ' + ns1blankspace.data.trainingCourse.invoiceNumber + ' created.');
			//ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.admin.trainingcourse.summary();
		}
	},

	trainees: 	
	{
		search: function(oParam, oResponse) 
		{
			// v3.2.020 SUP023422 Display 'Unprocessed' trainees on Trainees tab
			var iCourse = ns1blankspace.objectContext;
			var iTraineeStep = 1;

			if (oParam) 
			{
				iCourse = (oParam.trainingCourse) ? oParam.trainingCourse : iCourse;
				if (oParam.traineeStep) {iTraineeStep = oParam.traineeStep; }
			}

			if (iTraineeStep === 1 && iCourse && ns1blankspace.objectContextData) 
			{

				ns1blankspace.objectContextData.courses = {};
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "agri";
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
				oSearch.addField('traineecontactbusiness,traineecontactbusinesstext,traineecontactperson,traineecontactpersontext' + 
								',attendingtrainee,firstname,surname,status,statustext,paymentstatus,paymentstatustext' +
								',agritrainingcourseattendee.traineecontactperson.firstname,agritrainingcourseattendee.traineecontactperson.surname' +
								',agritrainingcourseattendee.traineecontactbusiness.reference,harvestmonth,crop,email,phone,mobile');
				oSearch.addField(ns1blankspace.option.auditFields);		// v3.3.008
				oSearch.addFilter("course", "EQUAL_TO", iCourse);
				oSearch.sort("traineecontactbusinesstext", "asc");
				oSearch.rows = 50;
				oSearch.rf = 'json';
				oSearch.getResults(function(data) 
				{

					oParam = ns1blankspace.util.setParam(oParam, 'traineeStep', 2);
					nsFreshcare.admin.trainingcourse.trainees.search(oParam, data);
				});
			}
			else if (iTraineeStep === 2) 
			{
				if (oResponse.status === "OK") 
				{
					ns1blankspace.objectContextData.trainees = oResponse.data.rows;
					oParam = ns1blankspace.util.setParam(oParam, 'traineeStep', 3);
					ns1blankspace.util.setParam(oParam, "response", oResponse);
					nsFreshcare.admin.trainingcourse.trainees.search(oParam, oResponse);
				}
			}
			else if (iTraineeStep === 3) 
			{
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';
				oSearch.addField('businessname,firstname,surname');
				oSearch.addFilter('course', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addFilter('sestatus', 'EQUAL_TO', '1');
				oSearch.rows = 100;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.objectContextData.tempTrainees = oResponse.data.rows;
						oParam = ns1blankspace.util.setParam(oParam, 'traineeStep', 4);
						nsFreshcare.admin.trainingcourse.trainees.search(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error('Error finding unprocessed trainees: ' + oResponse.error.errornotes);
					}
				});		
				
			}
			else if (iTraineeStep === 4) 
			{
				// This is where we add in the call back function
				ns1blankspace.util.setParam(oParam, "traineeStep", undefined);
				ns1blankspace.util.onComplete(oParam);
			}
		},

		show: 	function(oParam, oResponse) 
		{
			// v3.2.020 SUP023422 Display 'Unprocessed' trainees on Trainees tab
			var aHTML = [];
			var bRefresh = (ns1blankspace.data.trainingCourse.refresh != undefined && ns1blankspace.data.trainingCourse.refresh);
			var bNew = (ns1blankspace.data.trainingCourse.newTrainee != undefined && ns1blankspace.data.trainingCourse.newTrainee);

			if (oParam) 
			{
				if (oParam.refresh != undefined) {bRefresh = oParam.refresh;}
				if (oParam.newTrainee != undefined) {bNew = oParam.newTrainee;}
			}
			else {oParam = {};}

			if (bRefresh) {ns1blankspace.show({selector: '#ns1blankspaceMainTrainees', refresh: true}); }

			if ($('#ns1blankspaceMainTrainees').attr('data-loading') == '1')
			{
				
				if (oResponse === undefined && (oParam.response === undefined)) {
					oParam = ns1blankspace.util.setParam(oParam, 'trainingCourse', ns1blankspace.objectContext);
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.trainingcourse.trainees.show);
					nsFreshcare.admin.trainingcourse.trainees.search(oParam);
				}
				else {

					if (oResponse === undefined) {
						oResponse = oParam.response;
					}

					$('#ns1blankspaceMainTrainees').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceTraineesColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceTraineesColumn2" class="ns1blankspaceColumn2Action" style="width:155px;"></td>' +
									'</tr>' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceshowUnprocessed" class="ns1blankspaceColumn1Flexible"></td>' +
									'</tr>' +
									'</table>');					
					
					$('#ns1blankspaceMainTrainees').html(aHTML.join(''));
					
					var aHTML = [];
				
	
					aHTML.push('<table id="ns1blankspaceCourseTrainees" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Company ID</td>' + 
									'<td class="ns1blankspaceHeaderCaption">Business</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Trainee</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(oResponse.data.rows, function() {
						aHTML.push(nsFreshcare.admin.trainingcourse.trainees.row(this));
					});

					aHTML.push('</table>');

					

					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceTraineesColumn1',
						xhtmlContext: 'Trainee',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == "true"),
						more: oResponse.moreid,
						rows: oResponse.rows,
						functionShowRow: nsFreshcare.admin.trainingcourse.trainees.row,
						functionOnNewPage: nsFreshcare.admin.trainingcourse.trainees.showUnprocessed,
						type: 'json'
					}); 	


					// Construct the 'Action' column (column 2)
					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2">');

					// Trainers can't add trainees after course is Completed
					if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin || 
						(nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer 
						 	&& ns1blankspace.objectContextData['agritrainingcourse.status'] != nsFreshcare.data.trainingCourse.statusCompleted)) {
						
						aHTML.push('<tr><td><span id="ns1blankspaceCourseTraineeAdd" class="ns1blankspaceAction" colspan="2">Add Trainee</span>');
					}

					aHTML.push('<tr><td><span id="ns1blankspaceCourseTraineesExport" class="ns1blankspaceAction" colspan="2">Export Trainees</span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceTraineesColumn2').html(aHTML.join(''));

					// If we're adding a grower to a training course from the Grower page, 
					// construct and set defaults for the New trainee to be added
					if (bNew) {
						nsFreshcare.admin.trainingcourse.trainees.manage({add: true});
						nsFreshcare.admin.trainingcourse.trainees.details({dataTraineeID: -1,
															dataCourseID: ns1blankspace.objectContext,
															dataCourseValue: ns1blankspace.objectContextData['agritrainingcourse.title'].formatXHTML(),
															xhtmlElementID: "ns1blankspaceCourseTraineeColumn1",
															xhtmlContext: "CourseTrainee",
															dataTraineeReferenceValue: ns1blankspace.data.trainingCourse.growerReference,
															dataTraineeBusinessID: ns1blankspace.data.trainingCourse.growerBusiness,
															dataTraineeBusinessValue: ns1blankspace.data.trainingCourse.growerBusinessText,
															dataTraineePersonID: ns1blankspace.data.trainingCourse.growerPerson,
															dataTraineePersonValue: ns1blankspace.data.trainingCourse.growerPersonText
														});
					}

					// Add Trainee button
					$('#ns1blankspaceCourseTraineeAdd').button({
							text: true,
							label: 'Add Trainee',
							icons: {
								primary: "ui-icon-person"
							}
					})
					.click(function() {

						nsFreshcare.admin.trainingcourse.trainees.add();

					});

					// Export Trainees button
					$('#ns1blankspaceCourseTraineesExport').button({
							text: true,
							label: 'Export Trainees',
							icons: {
								primary: "ui-icon-arrowthickstop-1-s"
							}
					})
					.click(function() {

						nsFreshcare.admin.trainingcourse.trainees["export"]();
					});

					$('#ns1blankspaceCourseTraineesExport').css('width', $('#ns1blankspaceCourseTraineeAdd').width());


					if (oParam.onComplete) {
						ns1blankspace.util.onComplete(oParam);
					}
				}
			}
		},

		showUnprocessed: function() 
		{
			// v3.2.020 SUP023422 Display 'Unprocessed' trainees on Trainees tab
			if (ns1blankspace.objectContextData.tempTrainees.length > 0)
			{
				var aHTML = [];

				aHTML.push('<table id="ns1blankspaceTraineeshowUnprocessed" class="ns1blankspace">');
				aHTML.push('<tr class="ns1blankspace"><td class="ns1blankspaceHeaderCaption ns1blankspaceTableCaption" colspan="3" height="20"></td></tr>' +
							'<tr class="ns1blankspace"><td class="ns1blankspaceCaption" colspan="3">Unprocessed Trainees</td></tr>' +
							'<tr><td class="ns1blankspaceHeaderCaption">Business Name</td>' + 
								'<td class="ns1blankspaceHeaderCaption">First Name</td>' + 
						        '<td class="ns1blankspaceHeaderCaption">Surname</td>' + 
						    '</tr>');

				$.each(ns1blankspace.objectContextData.tempTrainees, function() {

					aHTML.push('<tr id="ns1blankspaceshowUnprocessedRow_' + this.id + '">');
				
					aHTML.push('<td class="ns1blankspaceRow nsFreshcareInactive"' + 
									' id="ns1blankspaceBusinessName_' + this.id + 
									'">' +
										this.businessname + 
									'</td>');

					aHTML.push('<td class="ns1blankspaceRow nsFreshcareInactive"' + 
									' id="ns1blankspaceFirstName_' + this.id + 
									'">' +
										this.firstname + 
									'</td>');

					aHTML.push('<td class="ns1blankspaceRow nsFreshcareInactive"' + 
									' id="ns1blankspaceSurname_' + this.id + 
									'">' +
										this.surname +
									'</td>');
					aHTML.push('</tr>');
				});

				aHTML.push('</table>');

				$('#ns1blankspaceshowUnprocessed').html(aHTML.join(''));
			}
			
			nsFreshcare.admin.trainingcourse.trainees.bind();
		},

		row: 	function(oRow) 
		{
			var aHTML = [];

			aHTML.push('<tr id="ns1blankspaceTraineeRow_' + oRow.id + '">');
			
			aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowCourseTrainee"' + 
							' id="ns1blankspaceTraineeReference_' + oRow.id + 
							'">' +
								oRow["agritrainingcourseattendee.traineecontactbusiness.reference"] + 
							'</td>');

			aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowCourseTrainee"' + 
							' id="ns1blankspaceTraineeGrower_' + oRow.id + 
							'">' +
								oRow["traineecontactbusinesstext"] + 
							'</td>');

			aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowCourseTrainee"' + 
							' id="ns1blankspaceTraineeTrainee_' + oRow.id + 
							'">' +
								oRow["firstname"] + (oRow.firstname != '' ? ' ' : '') + oRow.surname +
							'</td>');

			if (ns1blankspace.objectContextData['agritrainingcourse.status'] != nsFreshcare.data.trainingCourse.statusCompleted) {
				aHTML.push('<td><span id="ns1blankspaceTraineeRemove_' + oRow.id + '" ' + 
								'class="ns1blankspaceAction ns1blankspaceTraineeRemove" ' + 
								'data-rowID="' + oRow.id + '">' +
								'<span id="ns1blankspaceTraineeOpen-' + oRow['traineecontactbusiness'] + '" ' + 
								'class="ns1blankspaceAction ns1blankspaceTraineeOpen" ' + 
								'data-rowID="' + oRow.id + '">' +
							'</td>');
			}
			else {
				aHTML.push('<td class="ns1blankspaceAction">&nbsp;</td>');
			}

			aHTML.push('</tr>');

			return aHTML.join('');
		},

		bind: 	function() 
		{
			var bCanRemove = (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin 
							|| (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
								&& ns1blankspace.objectContextData['agritrainingcourse.status'] != nsFreshcare.data.trainingCourse.statusCompleted)
							);

			// Open Training Course Trainee on the same form
			$('.ns1blankspaceRowCourseTrainee').click(function(event) 
			{
				var sElementId = this.id.split('_')[1];
				nsFreshcare.admin.trainingcourse.trainees.manage({add: false, rowID: sElementId});

				if ($('#ns1blankspaceCourseTraineeActionContainer').is('*'))
				{
					var oThisTrainee = $.grep(ns1blankspace.objectContextData.trainees, function(a) {return a.id == sElementId});

					if (oThisTrainee.length === 1) 
					{ 
						oThisTrainee = oThisTrainee[0];
						
						var oParam = {
							xhtmlContext: 'CourseTrainee',
							xhtmlElementID: 'ns1blankspaceCourseTraineeColumn1',
							dataTraineeID: sElementId,
							dataCourseID: ns1blankspace.objectContext,
							dataCourseValue: ns1blankspace.objectContextData['agritrainingcourse.title'].formatXHTML(),
							dataTraineeReferenceValue: oThisTrainee['agritrainingcourseattendee.traineecontactbusiness.reference'].formatXHTML(),
							dataTraineeBusinessID: oThisTrainee.traineecontactbusiness,
							dataTraineeBusinessValue: oThisTrainee.traineecontactbusinesstext.formatXHTML(),
							dataTraineePersonID: oThisTrainee.traineecontactperson,
							dataTraineePersonValue: oThisTrainee.traineecontactpersontext.formatXHTML(),
							dataAttendingTrainee: oThisTrainee.attendingtrainee.formatXHTML(),
							dataFirstName: oThisTrainee.firstname.formatXHTML(),
							dataSurname: oThisTrainee.surname.formatXHTML()
						}

						nsFreshcare.admin.trainingcourse.trainees.details(oParam);
					}
				}
				else 
				{
					$('#ns1blankspaceCourseTraineeColumn1').html('Trainee details not found.');
				}
			});

			// Can only remove Course if Admin or not Admin and Status is not Completed  
			if (bCanRemove) {

				$('.ns1blankspaceTraineeRemove').button({
					text: false,
					label: 'Remove',
					icons: {
						primary: "ui-icon-close"
					}
				})
				.click(function(event) {
					nsFreshcare.admin.trainingcourse.trainees.remove.show(this);
				})
				.css('width', '15px')
				.css('height', '20px');
			}	

			// Open Trainee (Grower) record
			$('.ns1blankspaceTraineeOpen').button({
					text: false,
					label: 'Open ' + nsFreshcare.data.growerText + ' record',
					icons: {
						primary: "ui-icon-play"
					}
				})
			.click(function(event) {
				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer) {
					nsFreshcare.trainer.grower.init({showHome: false});
					nsFreshcare.trainer.grower.search.send(this.id);
				}
				
			});
		},

		add: 	function() 
		{
			nsFreshcare.admin.trainingcourse.trainees.manage({add: true});

			if ($('#ns1blankspaceCourseTraineeActionContainer').children().length > 0) {
				nsFreshcare.admin.trainingcourse.trainees.details({dataTraineeID: -1,
													dataCourseID: ns1blankspace.objectContext,
													dataCourseValue: ns1blankspace.objectContextData['agritrainingcourse.title'].formatXHTML(),
													xhtmlElementID: "ns1blankspaceCourseTraineeColumn1",
													xhtmlContext: "CourseTrainee"});
				}
		},

		manage: function(oParam) 
		{
			// Displays the edit directly beneath the record being edited 
			// If a new Trainee, shows at top of list.
			var bAdd = true;
			var bContinue = true;
			var sRowID;

			if (oParam) {
				if (oParam.add != undefined) {bAdd = oParam.add;}
				if (oParam.rowID != undefined) {sRowID = oParam.rowID;}
			}

			// Work out if we scrap what's there already. If they're already adding a new one, don't do anything, otherwise, start again
			if ($('#ns1blankspaceCourseTraineeActionContainer').html() != '' && $('#ns1blankspaceCourseTraineeActionContainer').html() != undefined) {
				
				if ($('#ns1blankspaceCourseTrainee').attr('data-traineeID') === '-1') {
					
					if (!bAdd) {		// We were adding and now we've decided to view an existing one
						bContinue = confirm("Are you sure you want to cancel adding the Trainee?");
						if (bContinue) {$('#ns1blankspaceCourseTraineeActionContainer').remove();}

					}
					else {		// We were adding and now have clicked Add Trainee again - remove the row (essentially cancel)
						
						$('#ns1blankspaceCourseTraineeActionContainer').remove();
						bContinue = false;
					}
				}
				else {
					// If we've clicked another row, then display it, otherwise just remove the row
					if (sRowID != undefined && $('#ns1blankspaceCourseTrainee').attr('data-traineeID') === sRowID) {
						bContinue = false;
					}

					$('#ns1blankspaceCourseTraineeActionContainer').remove();
				}
			}  

			if (bContinue) {
				
				var aHTML = [];

				aHTML.push('<tr id="ns1blankspaceCourseTraineeActionContainer"><td id="ns1blankspaceCourseTraineeActionManage" ' + 
							'colspan="' + $('#ns1blankspaceCourseTrainees').children().children().first().children().length + '">');
				aHTML.push('<table id="ns1blankspaceCourseTrainee" class="ns1blankspaceContainer ns1blankspaceBorder nsFreshcareDetails"' +
							' data-traineeID="' + ((sRowID === undefined) ? '-1' : sRowID) + '">');

				aHTML.push('<tr>' + 
							'<td id="ns1blankspaceCourseTraineeColumn1" class="ns1blankspaceColumn1" style="width:70%;"></td>' +
							'<td id="ns1blankspaceCourseTraineeColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>');

				aHTML.push('</table>');
				aHTML.push('</td></tr>');

				if (bAdd) {
					$('#ns1blankspaceCourseTrainees').children().children().first().before(aHTML.join(''));
				}
				else {
					$('#ns1blankspaceTraineeRow_' + sRowID).after(aHTML.join(''));
				}

				aHTML = [];

				aHTML.push('<table class="ns1blankspaceColumn2">');
				aHTML.push('<tr><td>&nbsp;</td></tr>');

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin ||
					(nsFreshcare.user.roleID != nsFreshcare.data.roles.admin 
						&& ns1blankspace.objectContextData['agritrainingcourse.status'] != nsFreshcare.data.trainingCourse.statusCompleted)) {
					
					aHTML.push('<tr><td><span id="ns1blankspaceCourseTraineeSave" class="ns1blankspaceAction">Save</span></td></tr>');
				}

				aHTML.push('<tr><td>&nbsp;</td></tr>');
				if (bAdd) 
				{
					aHTML.push('<tr><td><span id="ns1blankspaceCourseTraineeNewGrower" class="ns1blankspaceAction">Add New ' + nsFreshcare.data.growerText + '</span></td></tr>');
				}

				// v3.4.001 SUP022964 Allow admin user to choose if searching for Member or Non-Member
				if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
				{
					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td>' +
									'<input type="checkbox" id="ns1blankspaceCourseTraineeNonGrower">' + 
										'<span style="font-size:0.75em;">Show Non-' + nsFreshcare.data.growersText +
								'</span></td></tr>');
				}

				aHTML.push('</table>');

				$('#ns1blankspaceCourseTraineeColumn2').html(aHTML.join(''));

				$('#ns1blankspaceCourseTraineeSave')
				.button({
					label: 'Save',
					icons: {
						primary: 'ui-icon-disk'
					}
				})
				.click(function(event) 
				{
					nsFreshcare.admin.trainingcourse.trainees.save.send({xhtmlContext: "CourseTrainee",
																		id: $('#ns1blankspaceCourseTrainee').attr('data-traineeID')});
				});

				$('#ns1blankspaceCourseTraineeNewGrower')
				.button({
					label: 'New ' + nsFreshcare.data.growerText,
					icons: {
						primary: 'ui-icon-plus'
					}
				})
				.css('width', '130px')
				.on('click', function(event) 
				{	// SUP022975 Now passes codeOfPractice & trainingDate to Trainer.grower
					nsFreshcare.trainer.grower.init(
					{
						"new": true,
						trainingCourse: ns1blankspace.objectContext,
						trainingCourseText: ns1blankspace.objectContextData["agritrainingcourse.title"],
						trainingPackage: ns1blankspace.objectContextData["agritrainingcourse.package"],
						trainingPackageText: ns1blankspace.objectContextData["agritrainingcourse.packagetext"],
						membershipText: ns1blankspace.objectContextData["agritrainingcourse.package.membershiptext"],
						membership: ns1blankspace.objectContextData["agritrainingcourse.package.membership"],
						codeOfPracticeText: ns1blankspace.objectContextData["agritrainingcourse.package.codeofpracticetext"],
						codeOfPractice: ns1blankspace.objectContextData["agritrainingcourse.package.codeofpractice"],
						trainingDate: ns1blankspace.objectContextData["agritrainingcourse.coursedate"],
						onCompleteSave: nsFreshcare.admin.trainingcourse.search.send,
						onCompleteSaveParam: {xhtmlElementID: '-' + ns1blankspace.objectContext}
					});
				});
			}
		},

		details: function(oParam) 
		{
			var aHTML = [];
			var sXHTMLElementID = '';
			var sCourseStatus = ns1blankspace.objectContextData['agritrainingcourse.status'];

			var sTraineeDataTraineeId = -1;
			var sTraineeDataCourseId;
			var sTraineeDataCourseValue;
			var sTraineeDataTraineeReferenceValue;
			var sTraineeDataTraineeBusinessId;
			var sTraineeDataTraineeBusinessValue;
			var sTraineeDataTraineePersonId;
			var sTraineeDataTraineePersonValue;
			var sTraineeDataAttendingTrainee;
			var sTraineeDataSurname;
			var sTraineeDataFirstName;
			var oTrainee;
			var oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == ns1blankspace.objectContextData['agritrainingcourse.package.membership']}).shift();
			var bGrowersOnly = !($('#ns1blankspaceCourseTraineeNonGrower').prop('checked'));

			if (oParam) 
			{
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID;}
				if (oParam.dataTraineeID != undefined) {sTraineeDataTraineeId = oParam.dataTraineeID;}
				if (oParam.dataCourseID != undefined) {sTraineeDataCourseId = oParam.dataCourseID;}
				if (oParam.dataCourseValue != undefined) {sTraineeDataCourseValue = oParam.dataCourseValue;}
				if (oParam.dataTraineeReferenceValue != undefined) {sTraineeDataTraineeReferenceValue = oParam.dataTraineeReferenceValue;}
				if (oParam.dataTraineeBusinessID != undefined) {sTraineeDataTraineeBusinessId = oParam.dataTraineeBusinessID;}
				if (oParam.dataTraineeBusinessValue != undefined) {sTraineeDataTraineeBusinessValue = oParam.dataTraineeBusinessValue;}
				if (oParam.dataTraineePersonID != undefined) {sTraineeDataTraineePersonId = oParam.dataTraineePersonID;}
				if (oParam.dataTraineePersonValue != undefined) {sTraineeDataTraineePersonValue = oParam.dataTraineePersonValue;}
				if (oParam.dataFirstName != undefined) {sTraineeDataFirstName = oParam.dataFirstName}
				if (oParam.dataAttendingTrainee != undefined) {sTraineeDataAttendingTrainee = oParam.dataAttendingTrainee;}
				if (oParam.dataSurname != undefined) {sTraineeDataSurname = oParam.dataSurname}
			}

			sTraineeDataTraineeId = (sTraineeDataTraineeId === -1 && ns1blankspace.object != nsFreshcare.objectTrainingCourse) ? ns1blankspace.objectContext : sTraineeDataTraineeId;
			sTraineeDataCourseId = (sTraineeDataCourseId === undefined) ? ns1blankspace.objectContextData['id'] : sTraineeDataCourseId;
			sTraineeDataCourseValue = (sTraineeDataCourseValue === undefined) ? ns1blankspace.objectContextData['agritrainingcourse.title'].formatXHTML() : sTraineeDataCourseValue;
			
			if (sTraineeDataTraineeId != -1)
			{
				oTrainee = $.grep(ns1blankspace.objectContextData.trainees, function(x) {return x.id == sTraineeDataTraineeId}).shift();
			}

			aHTML = [];

			aHTML.push('<table class="ns1blankspace">');

			//var aTrainerMemberships = $.map(nsFreshcare.data.trainerMemberships, function(a) { return a.membership});
			
			// Training Course is hidden as users are already in the context of training course
			aHTML.push('<tr id="ns1blankspaceTraineeDetailsCourseRow">' +
							'<td id="ns1blankspaceCourseTraineeTrainingCourse"' +
								' data-courseID="' + sTraineeDataCourseId + '">' + sTraineeDataCourseValue + 
							'</td></tr>');		

			// v3.1.2 SUP022744 Changed to use businessgroup filter
			// v3.4.001 SUP022964 Removed group & address filter if ns1blankspaceCourseTraineeNonGrower checked
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Company ID' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceCourseTraineeTraineeReference" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="Company ID"' +
								' data-selectGrowerClear="nsFreshcare.admin.trainingcourse.trainees.hideMembershipDetails"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' +
								' data-columns="reference-space-tradename-space-contactbusiness.addresslink.address.addresssuburb"' +
								' data-methodFilter="reference-TEXT_IS_LIKE' +
													 '|contactbusiness.addresslink.address.status-EQUAL_TO-1' +
													 '|contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '"' +
								' data-click="nsFreshcare.util.defaultContactPerson">' +
							'</td></tr>')

			// v3.1.2 SUP022744 Changed to use businessgroup filter
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Business' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceCourseTraineeTraineeBusiness" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="Business"' +
								' data-selectGrowerClear="nsFreshcare.admin.trainingcourse.trainees.hideMembershipDetails"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' +
								' data-columns="tradename-space-contactbusiness.addresslink.address.addresssuburb"' +
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|contactbusiness.addresslink.address.addresssuburb-TEXT_IS_LIKE|' +
													 'contactbusiness.addresslink.address.status-EQUAL_TO-1|' +
													 'contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '"' +
								' data-click="nsFreshcare.util.defaultContactPerson">' +
							'</td></tr>');			

			// v3.1.1 SUP022427 Added filter to include trainee personGroups
			// v3.1.2 SUP022744 Changed to use businessgroup filter
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Contact Person' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceCourseTraineeTraineePerson" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="Contact Person"' + 
								' data-selectGrowerClear="nsFreshcare.admin.trainingcourse.trainees.hideMembershipDetails"' +
								' data-method="CONTACT_PERSON_SEARCH"' +
								' data-columns="firstname-space-surname-space-pipe-space-contactbusinesstext"' +
								' data-methodfilter="firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
										'contactperson.contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '|' +
										'persongroup-IN_LIST-' + nsFreshcare.data.grower.categoryGrower + ',' + nsFreshcare.data.groupTrainee  + ',' + nsFreshcare.data.groupOtherContact + '"' + 
								' data-parent="ns1blankspaceCourseTraineeTraineeBusiness"' +
								' data-parent-search-id="contactbusiness"' +
								' data-parent-search-text="tradename"' + 
								' data-click="nsFreshcare.admin.trainingcourse.trainees.setMembershipValues">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Attending Trainee First Name' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceCourseTraineeAttendingTraineeFirstName" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Attending Trainee First Name">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Attending Trainee Surname' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceCourseTraineeAttendingTraineeSurname" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Attending Trainee Surname">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeTraineeDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Attending Trainee Phone' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeTraineeDetails">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceCourseTraineeAttendingTraineePhone" class="ns1blankspaceText"' +
								' data-caption="Attending Trainee Phone">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeTraineeDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Attending Trainee Mobile' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeTraineeDetails">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceCourseTraineeAttendingTraineeMobile" class="ns1blankspaceText"' +
								' data-caption="Attending Trainee Mobile">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeTraineeDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Attending Trainee Email' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeTraineeDetails">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceCourseTraineeAttendingTraineeEmail" class="ns1blankspaceText"' +
								' data-caption="Attending Trainee Email">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Harvest Months' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspace" id="ns1blankspaceCourseTraineeHarvestMonths">' +
							'</td></tr>');

			// v3.3.001 SUP023456 Now looks up corresponding crop list from Standard
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Crops' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspace" id="ns1blankspaceMembershipCellCrops">' +
							'<input id="ns1blankspaceMembershipCropsUpdate"' +
								' class="ns1blankspaceSelect ns1blankspaceWatermark"' +
								' data-multiselect="true"' +
								' data-method="SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH"' +
								' data-methodFilter="title-TEXT_IS_LIKE|element-EQUAL_TO-' + oStandard.secropslookup + '"' +
								' maxlength="300"' +
								' value="Search for valid Crops">' +
							'</td></tr>');

			// v3.1.2 SUP022744 Added Certificate Scopes
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Scope' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeMembershipDetails">' +
							'<td id="ns1blankspaceCourseTraineeScopeUpdate" class="ns1blankspaceText">' +
							'<table class="ns1blankspace" style="margin-bottom:7px;">');

			//$.each(nsFreshcare.data.scopeOptions, function() {
			//	aHTML.push('<tr><td id="ns1blankspaceCourseTraineeMembershipScopes_' + this.id + '" ' + 
			//					'class="nsFreshcareScope nsFreshcareSelectable">' + this.title + '</td>' + 
			//					'</tr>');
			//});
			aHTML.push('</table>' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Category' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeMembershipDetails">' +
							'<td id="ns1blankspaceCourseTraineeProductGroupUpdate" class="ns1blankspaceText">' +
							'<table class="ns1blankspace" style="margin-bottom:7px;">');

			$.each(nsFreshcare.data.productGroups, function() {
				aHTML.push('<tr><td id="ns1blankspaceCourseTraineeMembershipProductGroups_' + this[0] + '" ' + 
								'class="nsFreshcareProductGroup nsFreshcareSelectable">' + this[1] + '</td>' + 
								'</tr>');
			});
			aHTML.push('</table>' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Sites' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeMembershipDetails">' +
							'<td id="ns1blankspaceCourseTraineeMembershipSites" class="ns1blankspaceText">' +
							'</td></tr>');

			$('#' + sXHTMLElementID).html(aHTML.join(''));

			// v3.3.001 SUP023456 List & bind Scope Options
			nsFreshcare.admin.grower.membership.defaultScopeOptions(
			{
				xhtmlElementID: "ns1blankspaceCourseTraineeScopeUpdate", 
				membership: ns1blankspace.objectContextData['agritrainingcourse.package.membership']
			});

			// v3.4.001 SUP022964 Bind Show Non-Members checkbox
			$('#ns1blankspaceCourseTraineeNonGrower')
			.on('click', function()
			{
				if ($('#ns1blankspaceCourseTraineeNonGrower').prop('checked'))
				{
					// Move extra filters to data-extraFilters
					$.each($('#ns1blankspaceCourseTraineeColumn1 .nsFreshcareSelectGrower:visible'), function()
					{
						var aFilters = $(this).attr('data-methodFilter').split('|');
						$(this).attr('data-extraFilters', $.grep(aFilters, function(x)
						{
							var a = x.split('-');
							return a.length != 2;
						}).join('|'));
						$(this).attr('data-methodFilter', $.grep(aFilters, function(x)
						{
							var a = x.split('-');
							return a.length == 2;
						}).join('|'));
					});
					// Remove Mandatory for Company ID & Business
					$('#ns1blankspaceCourseTraineeTraineeReference').removeAttr('data-mandatory');
					$('#ns1blankspaceCourseTraineeTraineeBusiness').removeAttr('data-mandatory');
				}
				else
				{
					// Add extra filters back to data-methodFilter
					$.each($('#ns1blankspaceCourseTraineeColumn1 .ns1blankspaceSelect:visible'), function()
					{
						if ($(this).attr('data-extraFilters'))
						{
							$(this)
							.attr('data-methodFilter', $(this).attr('data-methodFilter') + '|' + $(this).attr('data-extraFilters'))
							.removeAttr('data-extraFilters');
						}
					});
					$('#ns1blankspaceCourseTraineeTraineeReference').attr('data-mandatory', '1');
					$('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-mandatory', '1');
				}
			});

			$('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').on('change', {trainee: oTrainee}, nsFreshcare.admin.trainingcourse.trainees.setTraineeValues);
			$('#ns1blankspaceCourseTraineeAttendingTraineeSurname').on('change', {trainee: oTrainee}, nsFreshcare.admin.trainingcourse.trainees.setTraineeValues);
			$('.ns1blankspaceTraineeMembershipDetails').hide();
			$('.ns1blankspaceTraineeTraineeDetails').hide();
			$('#ns1blankspaceCourseTraineeTrainingCourse').hide();
			$('#ns1blankspaceCourseTraineeTrainingCourse').attr('data-id', sTraineeDataCourseId);

			if (sTraineeDataTraineeId != -1 && sTraineeDataTraineeId != '') 
			{		
				
				$('#ns1blankspaceCourseTraineeTraineeReference').val(sTraineeDataTraineeReferenceValue.formatXHTML());
				$('#ns1blankspaceCourseTraineeTraineeReference').attr('data-id', sTraineeDataTraineeBusinessId);
				$('#ns1blankspaceCourseTraineeTraineeBusiness').val(sTraineeDataTraineeBusinessValue.formatXHTML());
				$('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id', sTraineeDataTraineeBusinessId);
				$('#ns1blankspaceCourseTraineeTraineePerson').val(sTraineeDataTraineePersonValue.formatXHTML());
				$('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id', sTraineeDataTraineePersonId);
				$('#ns1blankspaceCourseTraineeTraineePerson').attr('data-firstname', oTrainee['agritrainingcourseattendee.traineecontactperson.firstname']);
				$('#ns1blankspaceCourseTraineeTraineePerson').attr('data-surname', oTrainee['agritrainingcourseattendee.traineecontactperson.surname']);
				$('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val(sTraineeDataSurname.formatXHTML());
				$('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val(sTraineeDataFirstName.formatXHTML());

				// We disable all the fields if they're not admin and the Course is Completed 
				if (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin && 
					sCourseStatus === nsFreshcare.data.trainingCourse.statusCompleted
				   )
				{
					$('input:visible').attr('disabled', true);
					$('input:visible').addClass('nsFreshcareDisabled');
					$('#ns1blankspaceViewControlSearch').removeClass('nsFreshcareDisabled');
					$('#ns1blankspaceViewControlSearch').attr('disabled', false);
				}
				else
				{
					nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(
					{
						courseTraineeId: sTraineeDataTraineeId, 
						retrieve: true,
						contactBusiness: sTraineeDataTraineeBusinessId
					});

					if ($('#ns1blankspaceCourseTraineeTraineePerson').val() != 
						$('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val() + ', ' + $('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val())
					{	
						nsFreshcare.admin.trainingcourse.trainees.setTraineeValues({data: {trainee: oTrainee}});
					}
				}
			}
			else 
			{
				// Set defaults
				// v3.1.0 added default for reference
				if (sTraineeDataTraineeReferenceValue != undefined && sTraineeDataTraineeBusinessId != undefined) 
				{
					$('#ns1blankspaceCourseTraineeTraineeReference').val(sTraineeDataTraineeReferenceValue.formatXHTML());
					$('#ns1blankspaceCourseTraineeTraineeReference').attr('data-id', sTraineeDataTraineeBusinessId);
				}

				if (sTraineeDataTraineeBusinessValue != undefined && sTraineeDataTraineeBusinessId != undefined) 
				{
					$('#ns1blankspaceCourseTraineeTraineeBusiness').val(sTraineeDataTraineeBusinessValue.formatXHTML());
					$('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id', sTraineeDataTraineeBusinessId);
				}

				/*if (sTraineeDataTraineePersonValue != undefined && sTraineeDataTraineePersonId != undefined) 
				{
					$('#ns1blankspaceCourseTraineeTraineePerson').val(sTraineeDataTraineePersonValue.formatXHTML());
					$('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id', sTraineeDataTraineePersonId);
					$('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val(aTraineePersonName.shift());
					$('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val(aTraineePersonName.join(' '));
				}*/
			}
		},

		setTraineeValues: function(event) 
		{
			// If the user changes firstname or surname, they must enter phone, mobile, email 
			var sTraineeName = $('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val() + ' ' + $('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val();
			var oTrainee = (event.data) ? event.data.trainee : undefined;

			if (sTraineeName != $('#ns1blankspaceCourseTraineeTraineePerson').attr('data-firstname') + ' ' + $('#ns1blankspaceCourseTraineeTraineePerson').attr('data-surname'))
			{
				if (!$('.ns1blankspaceTraineeTraineeDetails').is(':visible'))
				{
					$('#ns1blankspaceCourseTraineeAttendingTraineePhone').val((oTrainee ? oTrainee.phone : ''));
					$('#ns1blankspaceCourseTraineeAttendingTraineeMobile').val((oTrainee ? oTrainee.mobile : ''));
					$('#ns1blankspaceCourseTraineeAttendingTraineeEmail').val((oTrainee ? oTrainee.email : ''));
					$('.ns1blankspaceTraineeTraineeDetails').show();
					
					$('#ns1blankspaceCourseTraineeAttendingTraineePhone').mask('99 9999 9999', {placeholder: " "});
					$('#ns1blankspaceCourseTraineeAttendingTraineeMobile').mask('9999 999 999', {placeholder: " "});
				}
			}
			else
			{
				// v3.3.002 SUP023800 Hide details if an existing trainee
				// v3.3.005 SUP023807 Only hide if name is different
				$('.ns1blankspaceTraineeTraineeDetails').hide();
				$('#ns1blankspaceCourseTraineeAttendingTraineePhone').val('');
				$('#ns1blankspaceCourseTraineeAttendingTraineeMobile').val('');
				$('#ns1blankspaceCourseTraineeAttendingTraineeEmail').val('');
			}
		},

		setMembershipValues: function(oParam) 
		{
			// Set Attending trainee and ask user to confirm/edit Crops, Harvest Months and Product Groups for the Membership 
			// - only if they don't already have this membership
			// v3.4.001 SUP022964 Determine if business / person selected is a Grower. If not, then don't need to check 
			// Membership, etc

			var iCourseTraineeId;
			var bRetrieve = false;

			if (oParam)
			{
				if (oParam.courseTraineeId) {iCourseTraineeId = oParam.courseTraineeId}
				if (oParam.retrieve) {bRetrieve = oParam.retrieve}
				if (oParam.setMembershipStep === undefined) {oParam.setMembershipStep = 0}
			}
			else
			{
				oParam = {setMembershipStep: 0}
			}

			// Set Attending Trainee to person Selected (unless bRetrieve) and get Crops / HArvest months, etc from priority Membership
			// If bRetrieve, revert Crops, harvestMonths, etc to those values already saved (if applicable)
			if (oParam.setMembershipStep === 0)
			{
				ns1blankspace.status.working();
				$('#ns1blankspaceCourseTraineeSave').attr('disabled', true);

				if (iCourseTraineeId === undefined)
				{
					var sXHTMLPersonID = ns1blankspace.xhtml.divID.replace('#', '');
					var sXHTMLBusinessID = sXHTMLPersonID.replace('Person', 'Business');
					var sXHTMLTraineeID = sXHTMLPersonID.replace('TraineePerson', 'AttendingTrainee');
					if ($('#' + sXHTMLPersonID).attr('data-firstname') + ' ' + $('#' + sXHTMLPersonID).attr('data-surname') != $('#' + sXHTMLPersonID).val())
					{	
						oParam.searchPerson = true;
						oParam.xhtmlPersonID = sXHTMLPersonID;
						oParam.xhtmlTraineeID = sXHTMLTraineeID;
					}
					else
					{
						$('#' + sXHTMLTraineeID + 'FirstName').val($('#' + sXHTMLPersonID).attr('data-firstname'));
						$('#' + sXHTMLTraineeID + 'Surname').val($('#' + sXHTMLPersonID).attr('data-surname'));
					}
				}
				else
				{
					var sXHTMLPersonID = 'ns1blankspaceCourseTraineeTraineePerson';
					var sXHTMLBusinessID = sXHTMLPersonID.replace('Person', 'Business');
					var sXHTMLTraineeID = sXHTMLPersonID.replace('TraineePerson', 'AttendingTrainee');
				}

				if (oParam.contactBusiness === undefined) {oParam.contactBusiness = $('#' + sXHTMLBusinessID).attr('data-id');}

				// v3.4.001 SUP022964 Determine if Selected Person / Business is a Member
				// But only if new row and box is ticked or existing row (we need this for validation)
				if ($('#ns1blankspaceCourseTraineeNonGrower').prop('checked') || iCourseTraineeId)
				{
					// v3.4.010 SUP023973 removes subsearch join and added or for group search
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_SEARCH';
					oSearch.addField('contactperson.persongroup.group,contactperson.contactbusiness.businessgroup.group');
					oSearch.addFilter('id', 'EQUAL_TO', $('#' + sXHTMLPersonID).attr('data-id'));
					oSearch.addBracket('(');
					oSearch.addFilter('contactperson.persongroup.group', 'IN_LIST', nsFreshcare.data.groupGrower.join(','));
					oSearch.addOperator('or');
					oSearch.addFilter('contactperson.contactbusiness.businessgroup.group', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);
					oSearch.addBracket(')');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.isMember = false;
							$.each(oResponse.data.rows, function()
							{
								if (this['contactperson.persongroup.group'])
								{
									oParam.isMember = (nsFreshcare.data.groupGrower.join(',').indexOf(this['contactperson.persongroup.grouptext']) > -1 );
									if (oParam.isMember) {return false;}
								}
								if (this['contactperson.contactbusiness.businessgroup.group'])
								{
									oParam.isMember = (this['contactperson.contactbusiness.businessgroup.group'] == nsFreshcare.data.businessGroupGrowerID);
									if (oParam.isMember) {return false;}
								}
							});

							if (!oParam.isMember && iCourseTraineeId)
							{
								$('#ns1blankspaceCourseTraineeNonGrower').prop('checked', true)
							}
							oParam.setMembershipStep = (oParam.isMember) ? 1 : 5;
							nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error determining if Trainee is a Member: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.isMember = true;		// v3.4.010 SUP023973 
					oParam.setMembershipStep = 1;
					nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
				}
			}
				
			// v3.4.001 Split out to step 1
			else if (oParam.setMembershipStep == 1)
			{
				// Now search for and then show Membership details for the user to confirm
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('crop,harvestmonth,membership,agrisubscription.contactbusiness.agribusiness.prioritymembership');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', oParam.contactBusiness);
				oSearch.sort('createddate' , 'asc');			// If we don't have a priority membership, get the first one entered
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						// We now have a list of ALL their current memberships
						// First work out if they have the Membership for this training Course
						// If not, we need to get the prioritymembership and get the values for it
						// If the membership already exists, we don't need to be in here..
						// v3.3.001 SUP023456 Get detaisl of Standard
						var iThisMembership = ns1blankspace.objectContextData["agritrainingcourse.package.membership"];
						var oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == iThisMembership}).shift();

						if ($.grep(oResponse.data.rows, function(x) {return x.membership === iThisMembership}).length === 0)
						{
							// This grower business doesn't already have this membership
							// First check if this is an existing CourseTrainee and if the calling program has asked us to retrieve existing details
							if (iCourseTraineeId != undefined && iCourseTraineeId != -1 && bRetrieve)
							{
								var oThisCourseTrainee = $.grep(ns1blankspace.objectContextData.trainees, function(x) {return x.id === iCourseTraineeId}).shift();
								
								nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceCourseTraineeHarvestMonths',
																						 values: oThisCourseTrainee.harvestmonth.formatXHTML(),
																						 update: true});

								nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembershipCellCrops',
																						 values: oThisCourseTrainee.crop.formatXHTML(),
																						 update: true,
																			 			 cropsTable: oStandard.secropslookup});
							}

							// This is a new trainee record or we've chosen a new Grower
							else
							{
								if (iThisMembership == nsFreshcare.data.membershipVIT || iThisMembership == nsFreshcare.data.membershipWIN)
								{
										nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembershipCellCrops',
																						 values: 'Wine Grapes',
																						 update: true,
																						 cropsTable: oStandard.secropslookup});									
								}

								if (oResponse.data.rows.length > 0)		// We have at least one membership
								{
									var oRow = oResponse.data.rows[0];
									oParam.prioritySubscription = oRow.id;

									nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceCourseTraineeHarvestMonths',
																							 values: oRow.harvestmonth.formatXHTML(),
																							 update: true});

									if (iThisMembership != nsFreshcare.data.membershipVIT && iThisMembership != nsFreshcare.data.membershipWIN)
									{
										nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembershipCellCrops',
																								 values: ((iThisMembership != nsFreshcare.data.membershipVIT && iThisMembership != nsFreshcare.data.membershipWIN) 
																								 			? oRow.crop.formatXHTML()
																								 			: 'Wine Grapes'),
																								 update: true,
																								 cropsTable: oStandard.secropslookup});
									}
								}
								// No membership has been added yet
								else
								{
									nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceCourseTraineeHarvestMonths',
																							 values: '',
																							 update: true});
									nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembershipCellCrops',
																								 values: '',
																								 update: true,
																								 cropsTable: oStandard.secropslookup});

								}
							}
							oParam.setMembershipStep = 2;
							nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
						}
						else
						{
							if (oParam.searchPerson)
							{
								oParam.setMembershipStep = 5;
								nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
							}
							else
							{
								var iSubscription = $.grep(oResponse.data.rows, function(x) {return x.membership === iThisMembership}).shift().id 
								$('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-subscription', iSubscription);
								$('#ns1blankspaceCourseTraineeSave').attr('disabled', false);
								ns1blankspace.status.clear();
							}
						}

					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}

			// Get Category (Product Groups) for default Subscription
			else if (oParam.setMembershipStep === 2)
			{
				var oSearch = new AdvancedSearch();

				if (iCourseTraineeId != undefined && iCourseTraineeId != -1 && bRetrieve)
				{
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_SEARCH';
					oSearch.addField('productcategory,productcategorytext');
					oSearch.addFilter('coursetrainee', 'EQUAL_TO', iCourseTraineeId);
					oSearch.sort('productcategorytext', 'asc');
				}
				else
				{
					oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
					oSearch.addField('productcategory,productcategorytext,agriproductgroup.subscription');
					oSearch.addFilter('agriproductgroup.subscription.contactbusiness', 'EQUAL_TO', oParam.contactBusiness);
					oSearch.addFilter('subscription', 'EQUAL_TO', oParam.prioritySubscription);
					oSearch.sort('subscription', 'asc');
					oSearch.sort('productcategorytext', 'asc');
				}

				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						var iSubscription = (oResponse.data.rows.length > 0) ? oResponse.data.rows[0]['agriproductgroup.subscription'] : '';
						oParam.prioritySubscription = (oParam.prioritySubscription) ? oParam.prioritySubscription : iSubscription;

						if (ns1blankspace.objectContextData["agritrainingcourse.package.membership"] == nsFreshcare.data.membershipVIT 
							|| ns1blankspace.objectContextData["agritrainingcourse.package.membership"] == nsFreshcare.data.membershipWIN)
						{
							// Hide all except Wine Grapes if the training Course is for Viticulture or Winery
							var iWineGrapes = $.map($.grep(nsFreshcare.data.productGroups, function(x) {return x[1] === 'Wine Grapes'}),
													function(y) {return y[0]}).pop();
							$.each($('.nsFreshcareProductGroup'), function()
							{
								if (this.id.split('_').pop() === iWineGrapes)
								{
									$(this).addClass('nsFreshcareSelected');
								}
								else
								{
									$(this).parent().hide();
								}
							});
						}
						else
						{
							$.each($.grep(oResponse.data.rows, function(x) {return x['agriproductgroup.subscription'] == iSubscription}), function()
							{
								$('#ns1blankspaceCourseTraineeMembershipProductGroups_' + this.productcategory).addClass('nsFreshcareSelected');
							});

							$('.nsFreshcareProductGroup').click(function()
							{
								$(this).toggleClass('nsFreshcareSelected');
							});

						}

						oParam.setMembershipStep = 3;
						nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}

			// v3.1.2 SUP022744 Get Scopes for default Subscription
			else if (oParam.setMembershipStep === 3)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('object,objectcontext,scope,scopetext');

				if (iCourseTraineeId != undefined && iCourseTraineeId != -1 && bRetrieve)
				{
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', iCourseTraineeId);
				}
				else
				{
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', oParam.prioritySubscription);
					oSearch.sort('objectcontext', 'asc');
				}
				oSearch.sort('scopetext', 'asc');

				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						var iSubscription = (oResponse.data.rows.length > 0) ? oResponse.data.rows[0].objectcontext : '';
						oParam.prioritySubscription = (oParam.prioritySubscription) ? oParam.prioritySubscription : iSubscription;

						if (ns1blankspace.objectContextData["agritrainingcourse.package.membership"] == nsFreshcare.data.membershipVIT 
							|| ns1blankspace.objectContextData["agritrainingcourse.package.membership"] == nsFreshcare.data.membershipWIN)
						{
							// Hide all except Winery if the training Course is for Viticulture or Winery
							var iWinery = $.map($.grep(nsFreshcare.data.scopeOptions, function(x) {return x.title == 'Winery'}),
												function(y) {return y.id}).shift();

							$.each($('.nsFreshcareScope'), function()
							{
								if (this.id.split('_').pop() === iWinery)
								{
									$(this).addClass('nsFreshcareSelected');
								}
								else
								{
									$(this).parent().hide();
								}
							});
						}
						else
						{
							$.each($.grep(oResponse.data.rows, function(x) {return x.objectcontext == iSubscription}), function()
							{
								$('#nsFreshcareScope-_' + this.scope).addClass('nsFreshcareSelected');
							});

							//$('.nsFreshcareScope').click(function()
							//{
							//	$(this).toggleClass('nsFreshcareSelected');
							//});

						}

						oParam.setMembershipStep = 4;
						nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}

			// Now get list of sites linked to default membership
			else if (oParam.setMembershipStep === 4)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('status,address1,address2,addresssuburb,addressstate,addresspostcode' +
								 ',address.addresslink.object,address.addresslink.objectcontext,address.addresslink.id');
				oSearch.addFilter('status', 'NOT_EQUAL_TO', '3')	// Onlt want active addresses
				oSearch.addBracket('(');
					oSearch.addBracket('(');
					oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
					oSearch.addFilter('address.addresslink.objectContext', 'EQUAL_TO', oParam.contactBusiness);
					oSearch.addBracket(')');
				if (iCourseTraineeId != undefined && iCourseTraineeId != -1 && bRetrieve)
				{
					oSearch.addOperator('or');
					oSearch.addBracket('(');
					oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
					oSearch.addFilter('address.addresslink.objectContext', 'EQUAL_TO', iCourseTraineeId);
					oSearch.addBracket(')');
				}
				else if (oParam.prioritySubscription && oParam.prioritySubscription != '')
				{
					oSearch.addOperator('or');
					oSearch.addBracket('(');
					oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectSubscription);
					oSearch.addFilter('address.addresslink.objectContext', 'EQUAL_TO', oParam.prioritySubscription);
					oSearch.addBracket(')');
				}
				oSearch.addBracket(')');
				oSearch.addFilter('type', 'EQUAL_TO', '1');
				oSearch.sort('address.addresslink.object', 'asc');
				oSearch.sort('status', 'asc');
				oSearch.sort('addresssuburb', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						var aHTML = [];
						var iCompareObject = (iCourseTraineeId != undefined && iCourseTraineeId != -1 && bRetrieve) 
							? nsFreshcare.objectTrainingCourseAttendee 
							: nsFreshcare.objectSubscription;

						aHTML.push('<table class="ns1blankspace" style="margin-bottom:7px;">');

						$.each($.grep(oResponse.data.rows, function(x) {return x["address.addresslink.object"] == nsFreshcare.objectBusiness}), function() 
						{
							var sAddress = (this.address1 + ((this.address2 != '') ? ' ' + this.address2 : '') + ' ' +
										   this.addresssuburb + ' ' + this.addressstate + ' ' + this.addresspostcode).formatXHTML();

							
							aHTML.push('<tr><td id="ns1blankspaceCourseTraineeSite_' + this.id + '" ' + 
											'class="nsFreshcareMembershipSite nsFreshcareSelectable">' + sAddress + '</td>' + 
											'</tr>');
						});
						aHTML.push('</table>');
						$('#ns1blankspaceCourseTraineeMembershipSites').html(aHTML.join(''));

						$.each($.grep(oResponse.data.rows, function(x) {return x["address.addresslink.object"] == iCompareObject}), function() 
						{
							$('#ns1blankspaceCourseTraineeSite_' + this.id).addClass('nsFreshcareSelected');
						});

						$('.nsFreshcareMembershipSite').click(function()
						{
							$(this).toggleClass('nsFreshcareSelected');
						});

						oParam.setMembershipStep = 5;
						nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}

			else if (oParam.setMembershipStep === 5)
			{
				if (oParam.searchPerson)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_SEARCH';
					oSearch.addField('firstname,surname');
					oSearch.addFilter('id', 'EQUAL_TO', $('#' + oParam.xhtmlPersonID).attr('data-id'));
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK' && oResponse.data.rows.length > 0)
						{
							$('#' + oParam.xhtmlTraineeID + 'FirstName').val(oResponse.data.rows[0].firstname.formatXHTML());
							$('#' + oParam.xhtmlTraineeID + 'Surname').val(oResponse.data.rows[0].surname.formatXHTML());
							// v3.3.008 SUP023843 Was not setting these values and always asking for contact details
							$('#' + oParam.xhtmlPersonID).attr('data-firstname', oResponse.data.rows[0].firstname.formatXHTML());
							$('#' + oParam.xhtmlPersonID).attr('data-surname', oResponse.data.rows[0].surname.formatXHTML());
							if (oParam.prioritySubscription)
							{	// We have to display extra information - go to step 10
								oParam.setMembershipStep = 10;
								nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
							}
							else
							{	// we're only here to get the person's name
								// v3.3.002 SUP023800 But make sure we check if we need to add trainee values as well
								nsFreshcare.admin.trainingcourse.trainees.setTraineeValues({});
								ns1blankspace.status.clear();
							}
						}
						else
						{
							if (oResponse.status == 'ER')
							{ns1blankspace.status.error('Error finding trainee contact: ' + oResponse.error.errornotes);}
						}
					});
				}
				else
				{
					oParam.setMembershipStep = 10;
					nsFreshcare.admin.trainingcourse.trainees.setMembershipValues(oParam);
				}
			}

			else if (oParam.setMembershipStep === 10)
			{
				if (oParam.isMember) {$('.ns1blankspaceTraineeMembershipDetails').show();}
				$('#ns1blankspaceCourseTraineeSave').attr('disabled', false);
				ns1blankspace.status.clear();
			}
		},

		hideMembershipDetails: function()
		{
			if ($('.ns1blankspaceTraineeMembershipDetails').is(':visible'))
			{

				$('.ns1blankspaceTraineeMembershipDetails').hide();
				$('#ns1blankspaceCourseTraineeMembershipSites').html('');
				$.each($('.nsFreshcareProductGroup'), function()
				{
					$(this).removeClass('nsFreshcareSelected');
				});
				$('#ns1blankspaceMembershipCropsUpdate_SelectRows').remove('');
				$('#ns1blankspaceMembershipCropsUpdate').addClass('ns1blankspaceWatermark');
				$('#ns1blankspaceMembershipCropsUpdate').attr('disabled', false);
				$('#ns1blankspaceCourseTraineeHarvestMonths').html('');
				$('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val('');
				$('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val('');
			}
		},

		"export":  function(oResponse, oParam) 
		{
			var aHTML = [];
			if (oResponse === undefined) {

				// First, make export div visible and show loading image

				ns1blankspace.show({selector: '#ns1blankspaceMainTraineesExport', refresh: true});

				// v2.0.4j SUP021746 Addresses all now coming from addresslink & startrow set to 0 on CORE_SEARCH_MORE
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
				oSearch.addField('attendingtrainee,firstname,surname,coursetext,agritrainingcourseattendee.traineecontactbusinesstext,agritrainingcourseattendee.traineecontactbusiness.reference' +
								',agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address1,agritrainingcourseattendee.traineecontactbusiness.addresslink.address.address2' +
								',agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresssuburb,agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addressstate' +
								',agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresspostcode,agritrainingcourseattendee.traineecontactbusiness.addresslink.address.addresscountry' +
								',agritrainingcourseattendee.course.trainercontactperson.firstname,agritrainingcourseattendee.course.trainercontactperson.surname,agritrainingcourseattendee.course.coursedate');
				oSearch.addFilter('course', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) trainees')
				oSearch.sort("traineecontactbusinesstext", "asc");
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse) {

					if (oResponse.status === 'OK' && oResponse.data.rows.length > 0) {

						var iCount = oResponse.summary.trainees;
						var sData = 'id=' + oResponse.moreid +
						'&startrow=0' + 
						'&rows=' + iCount;

						$.ajax({
							type: 'GET',
							url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
							data: sData,
							dataType: 'JSON',
							success: function(oResponse) {
								nsFreshcare.admin.trainingcourse.trainees["export"](oResponse, {count: iCount});
							}
						});
						
					}
					else {

						aHTML.push('<table class="ns1blankspace">');
						aHTML.push('<tr>');
						if (oResponse.data.rows.length === 0) {
							aHTML.push('No rows to export. Please add trainees to the training course before exporting.');
						}
						else {
							aHTML.push('<td class="ns1blankspaceSub">Error creating file. Please try again or contact Support.</td></tr>');
						}
						aHTML.push('</table>');
						
						$('#ns1blankspaceMainTraineesExport').html(aHTML.join(''));
					}
				});
			}
			else {

				if (oResponse.status == 'OK') {

					var oItems = oResponse.data.rows;
					var iCount = oParam.count;

					ns1blankspace.status.working('Creating file...');

					aHTML.push('<table style="margin: 10px; font-size:0.875em;">');
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceTextMulti">' +
									'<div id="ns1blankspaceFileContents" class="ns1blankspaceTextMulti" style="background-color:#F3F3F3; width:100%; font-family:Courier New; font-size:0.865em; white-space:pre; overflow:auto;">' +
										'</div>' +
									'</td></tr>' +
									'<tr>' +
									'<td class="ns1blankspaceTextMulti" id="ns1blankspaceFileDownload" style="padding-top:8px;"' +
									'</td></tr></table>');

					oParam.totalRows = iCount;
					oParam.name = 'Export Trainees';
					// v3.1.1 Added as didn't have export format when in admon login
					if ($.grep(ns1blankspace.setup.file["export"].formats, function (a) {return a.name == oParam.name}).length == 0)
					{
						nsFreshcare.trainer.setup.exports();
					}
					oParam.items = oItems;
					oParam.saveToFile = true;
					oParam.fileName = ns1blankspace.objectContextData['agritrainingcourse.reference'] + '_Trainees.csv';
					oParam.xhtmlElementID = 'ns1blankspaceFileDownload';

					$('#ns1blankspaceMainTraineesExport').html(aHTML.join(''));
					
					var sFile = ns1blankspace.setup.file["export"].process(oParam);

					//$('#ns1blankspaceFileContents').html(sFile);

				}
				else {
					aHTML.push('<table class="ns1blankspace">');
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceSub">Error creating file. Please try again or contact Support.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceMainTraineesExport').html(aHTML.join(''));
				}

				$('#ns1blankspaceBackToTrainees').button({
					label: "Back",
					icons: {
						primary: 'ui-icon-triangle-1-w'
					}
				})
				.click(function() {
					ns1blankspace.show({selector: '#ns1blankspaceMainTrainees'});
				})
			}
		},

		save: 	
		{
			validate: function(oParam) 
			{
				ns1blankspace.okToSave = true;

				// Validate Mandatory fields
				// v1.0.26 now checks data-id is set on mandatory combos
				// v3.1.1 SUP022427 Now validates email, phone, mobile entered if visible 
				$('#ns1blankspaceCourseTraineeColumn1 input').each( function() 
				{

					if ($(this).attr('data-mandatory') === '1' 
						&& ($(this).val() === ''
				 		  || ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) {

						// Find the caption first - either the data-caption attribute or whatever's left on the id after ns1blankspaceDetails
						var sCaption = $(this).attr('data-caption');
						if (sCaption === undefined) {
							sCaption = $(this).attr('id').substr('ns1blankspaceDetails'.length);
						}
						if (sCaption === undefined) { sCaption = $(this).attr('id');}

						ns1blankspace.status.message(sCaption + ' is mandatory.');
						ns1blankspace.okToSave = false;
						return false;		// Discontinue the loop - check one at a time (for the time being)
					}
				});

				if (ns1blankspace.okToSave && $('.ns1blankspaceTraineeTraineeDetails').is(":visible"))
				{
					// At least one of phone, mobile or email mus be populated
					if ($('#ns1blankspaceCourseTraineeAttendingTraineePhone').val() == '' && $('#ns1blankspaceCourseTraineeAttendingTraineeMobile').val() == ''
						&& $('#ns1blankspaceCourseTraineeAttendingTraineeEmail').val() == '')
					{
						ns1blankspace.status.message('You must enter at lease one of phone, mobile or email for the Attending Trainee.');
						ns1blankspace.okToSave = false;
					}
				}

				// v3.1.0 added validation for subscription details
				if (ns1blankspace.okToSave && $.grep($('.ns1blankspaceTraineeMembershipDetails'), function(x) {return $(x).is(':visible')}).length > 0)
				{

					if (ns1blankspace.okToSave && $('.nsFreshcareHarvestMonthsUpdate.nsFreshcareHarvestMonthsSelected').length == 0)
					{
						ns1blankspace.status.message('At least one Harvest Month must be selected.');
						ns1blankspace.okToSave = false;
						return false;		
					}	

					if (ns1blankspace.okToSave && $('#ns1blankspaceMembershipCropsUpdate_SelectRows').children().children().length == 0)
					{
						ns1blankspace.status.message('At least one Crop must be selected.');
						ns1blankspace.okToSave = false;
						return false;		
					}

					if (ns1blankspace.okToSave && $('.nsFreshcareProductGroup.nsFreshcareSelected').length == 0)
					{
						ns1blankspace.status.message('At least one Category must be selected.');
						ns1blankspace.okToSave = false;
						return false;		
					}

					if (ns1blankspace.okToSave && $('.nsFreshcareMembershipSite.nsFreshcareSelected').length == 0)
					{
						ns1blankspace.status.message('At least one Site must be selected.');
						ns1blankspace.okToSave = false;
						return false;		
					}
				}

				if (oParam)
				{
					oParam.saveAttendingTraineeStep = 2;
					nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
				}
			},

			send: 	function(oParam, oResponse) 
			{
				var sData = 'id=';
				var sID;
				var sXHTMLContext = 'TraineeDetail';

				if (oParam) 
				{
					if (oParam.saveAttendingTraineeStep === undefined) {oParam.saveAttendingTraineeStep = 1}
					if (oParam.xhtmlContext != undefined) {sXHTMLContext = oParam.xhtmlContext;}
					if (oParam.id != undefined) {sID = oParam.id;}
				}
				else 
				{	oParam = {saveAttendingTraineeStep: 1}}


				// Validate the AttendingTrainee record
				if (oParam.saveAttendingTraineeStep == 1)
				{
					ns1blankspace.status.working();
					nsFreshcare.admin.trainingcourse.trainees.save.validate(oParam);
				}

				// Save the AttendingTrainee record
				else if (oParam.saveAttendingTraineeStep == 2 && ns1blankspace.okToSave)
				{
					if (sID != -1 && sID != '-1' && sID != undefined) 
					{
						sData += sID;
						oParam.newTraineeRecord = false;
					}
					else
					{
						oParam.newTraineeRecord = true;
					}

					oParam.newMembership = false;

					// v3.1.0i SUP022311 status was sending 5 instead of attendeeStatusNewMembership
					sData += '&course=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeTrainingCourse').attr('data-id'));
					sData += '&traineecontactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id'));
					sData += '&traineecontactperson=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id'));
					sData += '&attendingtrainee=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val() + ' ' + $('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val());
					sData += '&firstname=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeAttendingTraineeFirstName').val());
					sData += '&surname=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeAttendingTraineeSurname').val());
					sData += '&status=' + ($('.ns1blankspaceTraineeMembershipDetails').is(':visible') 
											? ns1blankspace.util.fs(nsFreshcare.data.trainingCourse.attendeeStatusNewMembership)
											: ns1blankspace.util.fs(nsFreshcare.data.trainingCourse.attendeeStatusAttended));
					// We only set these fields when a new record - otherwise, they're not used.
					if (sID === -1) 
					{
						//sData += '&status=' + ns1blankspace.util.fs(nsFreshcare.data.trainingCourse.attendeeStatusAttended);
						sData += '&paymentstatus=' + ns1blankspace.util.fs(nsFreshcare.data.trainingCourse.attendeePaymentStatusDepositPaid);
					}

					// If an existing grower business with a new contact (attending trainee), save mobile, phone & email
					if ($('.ns1blankspaceTraineeTraineeDetails').is(':visible'))
					{
						sData += '&phone=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeAttendingTraineePhone').val());
						sData += '&mobile=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeAttendingTraineeMobile').val());
						sData += '&email=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeAttendingTraineeEmail').val());
					}

					// If it's an existing grower with a new membership, save Harvest Months and Crops values to training Course attendee record
					if ($('#ns1blankspaceCourseTraineeHarvestMonths').is(':visible'))
					{
						// If WIN / VIT, Crops will say Wine grapes. otherwise, get from multi-select list
						var sCrops = $('#ns1blankspaceMembershipCropsUpdate').val();
						var sCropsSorted = sCrops;
						if ($('#ns1blankspaceMembershipCropsUpdate').val().toLowerCase() !== 'wine grapes')
						{
							var aCropsSorted = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
													function(x) 
													{
														return {
																	html: (($(x).hasClass('ns1blankspaceError')) 
																			? '<span style="color:red;">' + $(x).html() + '</span>'
																			: $(x).html()), 
																	value: $(x).html(),
																	sortValue: $(x).html().toUpperCase()
																}
													})
													.sort(ns1blankspace.util.sortBy('value'));
							sCrops = $.map(aCropsSorted, function(x) {return x.value}).join(', ');

						}
						sData += '&crop=' + ns1blankspace.util.fs(sCrops);

						sData += '&harvestmonth=' + ns1blankspace.util.fs(
														nsFreshcare.admin.grower.membership.harvestMonths.store(
																	{xhtmlElementId: 'ns1blankspaceCourseTraineeHarvestMonths'}));

						oParam.newMembership = true;
					}

					// Check if trainee is for an existing contact for an existing membership
					oParam.existingMembershipContact = ($('.ns1blankspaceTraineeTraineeDetails').is(':visible') == false && $('#ns1blankspaceCourseTraineeHarvestMonths').is(':visible') == false);

					oParam.saveAttendingTraineeStep = 3;
					oParam.id = sID;

					delete(ns1blankspace.data.trainingCourse.growerReference);
					delete(ns1blankspace.data.trainingCourse.growerBusiness);
					delete(ns1blankspace.data.trainingCourse.growerBusinessText);
					delete(ns1blankspace.data.trainingCourse.growerPerson);
					delete(ns1blankspace.data.trainingCourse.growerPersonText);
					delete(ns1blankspace.data.trainingCourse.refresh);
					delete(ns1blankspace.data.trainingCourse.newTrainee);

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
						data: sData,
						dataType: 'JSON',
						success: function(oResponse) 
						{
							if (oResponse.status == 'OK')
							{
								oParam.id = oResponse.id;
								ns1blankspace.data.trainingCourse.attendeeCount += (sID == -1 ? 1 : 0);	// v3.3.008 Don't add if an existing record
								ns1blankspace.status.message('Training course attendee saved');
								nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving training course attendee: ' + oResponse.error.errornotes);
							}
						}
					});
				}

				// Check if there is a relationship to this Trainer and if not, add it or update if non-current
				else if (oParam.saveAttendingTraineeStep === 3)
				{

					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
					oSearch.addField('startdate,enddate');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness']);
					oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id'));
					oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.relationshipTrainer);
					oSearch.getResults(function(oResponse) 
					{

						var bLink = false;
						var dToday = new Date();
						var sLinkId;

						if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
						{
							var dStart = (oResponse.data.rows[0].startdate != '') ? new Date(oResponse.data.rows[0].startdate) : undefined;
							var dEnd = (oResponse.data.rows[0].enddate != '') ? new Date(oResponse.data.rows[0].enddate) : undefined;

							if (dStart && dEnd)
							{
								if (dStart > dToday || dEnd < dToday)
								{	sLinkId = oResponse.data.rows[0].id;}
							}
							else if (dStart)
							{
								if (dStart > dToday)
								{	sLinkId = oResponse.data.rows[0].id;}
							}
							else if (dEnd)
							{
								if (dEnd < dToday)
								{	sLinkId = oResponse.data.rows[0].id;}
							}

							if (sLinkId) {bLink = true;}

						}
						// No relationship exists
						else if (oResponse.data.rows.length === 0)
						{	bLink = true;	}

						
						if (bLink)
						{
							//v1.0.27 removed enddate parameter as back-end bug was causing it to be set to same as startdate
							var sData = 'id=' + ((sLinkId) ? sLinkId : '') +
										'&startdate=' + ns1blankspace.util.fs(dToday.toString('dd MMM yyyy'));
										 //+ '&enddate=';
							if (sLinkId === undefined)
							{
								// Can't update any of these fields. These are the values for a new link
								sData += '&contactbusiness=' + ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness'] +
										'&contactperson=' + ns1blankspace.objectContextData['agritrainingcourse.trainercontactperson'] +
										'&othercontactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id')) +
										'&othercontactperson=' + ns1blankspace.util.fs($('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id')) +
										'&type=' + nsFreshcare.data.relationshipTrainer;
							}
							// ns1blankspace.util.endpointURI()
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
								data: sData,
								dataType: 'JSON',
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.message('Trainee relationship saved');
										oParam.saveAttendingTraineeStep = 4;
										nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
									}
									else if (oResponse.status == 'ER')
									{
										ns1blankspace.status.error('Error adding trainee relationship: ' + oResponse.error.errornotes);
									}
								}
							});
						}
						else
						{
							if (oResponse.status == 'OK')
							{
								oParam.saveAttendingTraineeStep = 4;
								nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
							}
							else if (oResponse.status == 'ER')
							{
								ns1blankspace.status.error('Error finding trainer relationship: ' + oResponse.error.errornotes);
							}
						}
					});
				}

				// Save Product Groups (find and remove existing if not a new Trainee Record)
				else if (oParam.saveAttendingTraineeStep === 4)
				{
					if (oParam.newMembership)
					{
						if (oParam.newProductGroups === undefined)
						{
							oParam.newProductGroups = $.map($('#ns1blankspaceCourseTraineeProductGroupUpdate .nsFreshcareSelected'), 
															function(x) {return x.id.split('_').pop()});
						}

						// If an existing trainee record, search for existing product groups
						if (!oParam.newTraineeRecord && oParam.existingProductGroups === undefined)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_SEARCH';
							oSearch.addField('coursetrainee,productcategory');
							oSearch.addFilter('coursetrainee', 'EQUAL_TO', sID);
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.existingProductGroups = oResponse.data.rows;
									nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error finding product groups: ' + oResponse.error.errornotes);
								}
							});
						}

						// If an existing trainee record, delete existing product groups
						else if (!oParam.newTraineeRecord && oParam.existingProductGroups.length > 0)
						{
							var iTraineeProductGroupId = oParam.existingProductGroups.shift().id;	// this serves to remove the first row as well
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_MANAGE'),
								data: 'remove=1&id=' + iTraineeProductGroupId,
								rf: 'json',
								success: function(oResponse)
								{
									if (oResponse.status == 'OK')
									{
										ns1blankspace.status.message('Category added');
										nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
									}
									else
									{
										ns1blankspace.status.error('Error removing product group: ' + oResponse.error.errornotes);
									}
								}
							});
						}

						// Now save new product groups
						else if (oParam.newProductGroups.length > 0)
						{
							var sProductGroupId = oParam.newProductGroups.shift();
							
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_MANAGE'),
								data: 'coursetrainee=' + sID + '&productcategory=' + sProductGroupId,
								rf: 'json',
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.message('Category removed');
										if (oParam.newProductGroups.length === 0)
										{
											oParam.saveAttendingTraineeStep = 5;
											delete(oParam.existingProductGroups);
										}
										nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
									}
									else
									{
										ns1blankspace.status.error('Error adding product group: ' + oResponse.error.errornotes);
									}
								}
							});
						}
					}
					else
					{
						oParam.saveAttendingTraineeStep = 7;
						nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
					}
				}

				// Save Scopes (find and remove existing if not a new Trainee Record)
				// v3.1.2 SUP022744 Added this section as no longer uses PersonGroup
				else if (oParam.saveAttendingTraineeStep === 5)
				{
					if (oParam.newScopes === undefined)
					{
						oParam.newScopes = $.map($('#ns1blankspaceCourseTraineeScopeUpdate .nsFreshcareSelected'), 
														function(x) {return x.id.split('_').pop()});
					}

					// If an existing trainee record, search for existing scopes
					if (!oParam.newTraineeRecord && oParam.existingScopes === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
						oSearch.addField('object,objectcontext,scope,scopetext');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.existingScopes = oResponse.data.rows;
								nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding existing scopes: ' + oResponse.error.errornotes);
							}
						});
					}

					// If an existing trainee record, delete existing scopes
					else if (!oParam.newTraineeRecord && oParam.existingScopes.length > 0)
					{
						var iTraineeScopeId = oParam.existingScopes.shift().id;	// this serves to remove the first row as well
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
							data: 'remove=1&id=' + iTraineeScopeId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									ns1blankspace.status.message('Scope added');
									nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing existing scope: ' + oResponse.error.errornotes);
								}
							}
						});
					}

					// Now save new scopes
					else if (oParam.newScopes.length > 0)
					{
						var sScopeId = oParam.newScopes.shift();
						
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
							data: 'object=' + nsFreshcare.objectTrainingCourseAttendee + '&objectcontext=' + sID + '&scope=' + sScopeId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									if (oParam.newScopes.length === 0)
									{
										oParam.saveAttendingTraineeStep = 6;
										delete(oParam.existingScopes);
									}
									ns1blankspace.status.message('Scope removed');
									nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error saving scope: ' + oResponse.error.errornotes);
								}
							}
						});

					}
				}

				// Save Linked Sites (find and remove existing if not a new Trainee Record)
				else if (oParam.saveAttendingTraineeStep == 6)
				{
					if (oParam.newSites === undefined)
					{
						oParam.newSites = $.map($('#ns1blankspaceCourseTraineeMembershipSites .nsFreshcareSelected'), 
														function(x) {return x.id.split('_').pop()});
					}

					// If an existing trainee record, search for existing sites
					if (!oParam.newTraineeRecord && oParam.existingSites === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_LOCATION_ADDRESS_LINK_SEARCH';
						oSearch.addField('id');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.existingSites = oResponse.data.rows;
								nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding existing sites: ' + oResponse.error.errornotes);
							}
						});
					}

					// If an existing trainee record, delete existing sites
					else if (!oParam.newTraineeRecord && oParam.existingSites.length > 0)
					{
						var iTraineeSiteId = oParam.existingSites.shift().id;	// this serves to remove the first row as well
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
							data: 'remove=1&id=' + iTraineeSiteId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									ns1blankspace.status.message('Site added');
									nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing existing sites: ' + oResponse.error.errornotes);
								}
							}
						});
					}

					// Now save new sites
					else if (oParam.newSites.length > 0)
					{
						var sAddressId = oParam.newSites.shift();

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
							data: 'object=' + nsFreshcare.objectTrainingCourseAttendee + '&objectcontext=' + sID + '&address=' + sAddressId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Site added');
									oParam.saveAttendingTraineeStep = (oParam.newSites.length === 0) ? 7 : 6;
									nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);		
								}
								else
								{
									ns1blankspace.status.error('Error adding sites: ' + oResponse.error.errornotes);
								}
							}
						});
					}
				}

				// v3.3.001 SUP023422 Add attendance link if existing contact & membership
				else if (oParam.saveAttendingTraineeStep == 7)
				{
					if (oParam.existingMembershipContact)
					{
						// If existing record, check if contactbusiness / person needs to be updated on attendance link
						if (oParam.newTraineeRecord == false && oParam.attendanceLinkData == undefined)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'AGRI_TRAINEE_ATTENDANCE_LINK_SEARCH';
							oSearch.addField('attendee,contactbusiness,contactperson,subscription');
							oSearch.addFilter('attendee', 'EQUAL_TO', sID);
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									oParam.attendanceLinkData = {};
									if (oResponse.data.rows.length > 0)
									{
										var oRow = oResponse.data.rows[0];
										if (oRow.contactbusiness != $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id'))
										{
											oParam.attendanceLinkData.contactbusiness = $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id');
										}
										if (oRow.contactperson != $('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id'))
										{
											oParam.attendanceLinkData.contactperson = $('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id');
										}
										if (oRow.subscription != $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-subscription'))
										{
											oParam.attendanceLinkData.subscription = $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-subscription');
										}
										if (Object.keys(oParam.attendanceLinkData).length > 0)
										{
											oParam.attendanceLinkData.id = oRow.id;
										}
										else
										{
											oParam.saveAttendingTraineeStep = 10; 	// Nothing to update
										}
									}
									else
									{
										oParam.attendanceLinkData = 
										{
											attendee: sID,
											contactbusiness: $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id'),
											contactperson: $('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id'),
											subscription: $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-subscription')
										};
									}
									nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error finding attendance link: ' + oResponse.error.errornotes);
								}
							});
						}

						// New trainee - add attendance link
						else if (oParam.newTraineeRecord || oParam.attendanceLinkData != undefined)
						{
							if (oParam.attendanceLinkData == undefined)
							{
								oParam.attendanceLinkData = 
								{
									attendee: sID,
									contactbusiness: $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-id'),
									contactperson: $('#ns1blankspaceCourseTraineeTraineePerson').attr('data-id'),
									subscription: $('#ns1blankspaceCourseTraineeTraineeBusiness').attr('data-subscription')
								};
							}

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_TRAINEE_ATTENDANCE_LINK_MANAGE'),
								data: oParam.attendanceLinkData,
								success: function(oResponse)
								{
									if (oResponse.status == 'OK')
									{
										oParam.saveAttendingTraineeStep = 10;
										ns1blankspace.status.message('Attandance link added');
										nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
									}
									else
									{
										ns1blankspace.status.error('Error adding attendance link: ' + oResponse.error.errornotes);
									}
								}
							});
						}	
					}
					else
					{
						oParam.saveAttendingTraineeStep = 10;
						nsFreshcare.admin.trainingcourse.trainees.save.send(oParam);
					}
				}

				else if (oParam.saveAttendingTraineeStep == 10)
				{
					delete(oParam.existingSites);
					nsFreshcare.admin.trainingcourse.trainees.save.process(oParam);
				}
			},

			process: function(oParam) 
			{
				var ID;

				if (oParam) 
				{
					if (oParam.id != undefined) {sID = oParam.id}
				}

				ns1blankspace.status.clear();

				ns1blankspace.status.message('Trainee ' + ((sID == -1) ? 'Added' : 'Updated'));
				ns1blankspace.inputDetected = false;
					
				nsFreshcare.admin.trainingcourse.trainees.show({refresh: true});
			}
		},

		remove:
		{ 
			show: 	function(oElement) 
			{

				if (ns1blankspace.xhtml.divID === oElement.id) 
				{
					$(ns1blankspace.xhtml.container).html('');
					$(ns1blankspace.xhtml.container).hide();
					ns1blankspace.xhtml.divID = '';
				}
				else 
				{
					ns1blankspace.xhtml.divID = oElement.id;

					var iRowID = ($(oElement).attr("data-rowID")) ? $(oElement).attr("data-rowID") : 'New';
					
					var aHTML = [];
					aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
								'<td><span id="ns1blankspaceTraineeDelete_' + iRowID + '" class="ns1blankspaceSearch" style="font-size:0.625em;">Remove</span></td>' +
								'</tr></table>');

					$(ns1blankspace.xhtml.container).html(aHTML.join(''));
					$(ns1blankspace.xhtml.container).show();
					$(ns1blankspace.xhtml.container).offset(
					{ 
						top: $(oElement).offset().top,
						left: $(oElement).offset().left + $(oElement).width()
					});

					$('#ns1blankspaceTraineeDelete_' + iRowID)
					.css('cursor', 'pointer')
					.click(function() {
						nsFreshcare.admin.trainingcourse.trainees.remove.process({id: iRowID, element: oElement})
					});

				}
			},

			process: 	function(oParam)
			{
				oParam = oParam || {};
				//var oElement = ns1blankspace.util.getParam(oParam, 'element');	// v3.4.002 Wasn't getting this variable

				if (ns1blankspace.object == nsFreshcare.objectTrainingCourse && oParam.traineeID == undefined)
				{
					oParam.traineeID = oParam.id;
					oParam.traineeBusiness = $.map($.grep(ns1blankspace.objectContextData.trainees, 
												 function(x) {return x.id === oParam.traineeID}),
											function(y) {return y['traineecontactbusiness']}).shift();
					oParam.traineePerson = $.map($.grep(ns1blankspace.objectContextData.trainees, 
												 function(x) {return x.id === oParam.traineeID}),
											function(y) {return y['traineecontactperson']}).shift();
					oParam.trainerID = ns1blankspace.objectContextData['agritrainingcourse.trainercontactbusiness'];
					oParam.courseID = ns1blankspace.objectContextData.id;
					$(ns1blankspace.xhtml.container).html('');
					$(ns1blankspace.xhtml.container).hide();
				}

				var oElement = ns1blankspace.util.getParam(oParam, 'element').value;
				var sID = ns1blankspace.util.getParam(oParam, 'traineeID').value;
				var iTraineeBusiness = ns1blankspace.util.getParam(oParam, 'traineeBusiness').value;;
				var iTraineePerson = ns1blankspace.util.getParam(oParam, 'traineePerson').value;;
				var iCourseId = ns1blankspace.util.getParam(oParam, 'courseID').value;
				var iTrainerBusiness = ns1blankspace.util.getParam(oParam, 'trainerID').value;
				var bOtherLink = ns1blankspace.util.getParam(oParam, 'otherLinkExists', {'default': false}).value;
				var fFunctionPostRemove = ns1blankspace.util.getParam(oParam, 'functionPostRemove', 
						{'default': nsFreshcare.admin.trainingcourse.trainees.remove.postRemove}).value;

				if (oParam.removeAttendingTraineeStep === undefined) {oParam.removeAttendingTraineeStep = 0}
				
				// First, set up display
				// v3.3.005 Moved deleting attendee from first step to last in case of errors which caused orphans
				if (oParam.removeAttendingTraineeStep === 0)
				{
					ns1blankspace.status.working();

					oParam.removeAttendingTraineeStep = 1;
					nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
				}

				// v3.3.005 SUP023807 check for attendance links and audits
				else if (oParam.removeAttendingTraineeStep == 1)
				{
					if (oParam.attendanceLinks == undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_TRAINEE_ATTENDANCE_LINK_SEARCH';
						oSearch.addField('attendee,contactbusiness,contactperson,subscription');
						oSearch.addFilter('attendee', 'EQUAL_TO', sID);
						oSearch.rows = 50;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								oParam.attendanceLinks = oResponse.data.rows;
								nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding attendance links: ' + oResponse.error.errrnotes);
							}
						});
					}

					// Check if any liked audits and stop process if any exist
					else if (oParam.attendanceLinkAudits == undefined)
					{
						if (oParam.attendanceLinks.length > 0)
						{
							var oSearch = new AdvancedSearch()
							oSearch.method = 'AUDIT_SEARCH';
							oSearch.addField('id,sequalifyingtraininglink,audit.sequalifyingtraininglink.attendee.id,codeofpracticetext' +
											',actualdate,contactbusinesstext,audit.agrisubscription.membership.code');
							oSearch.addFilter('sequalifyingtraininglink', 'IN_LIST', $.map(oParam.attendanceLinks, function(x) {return x.id}).join(','));
							oSearch.rows = 100;
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									oParam.attendanceLinkAudits = oResponse.data.rows;
									// If there are any audits, we need to tell user they can't delete and display the Audit(s)
									if (oResponse.data.rows.length > 0)
									{
										ns1blankspace.status.clear();
										ns1blankspace.container.confirm( 
										{
											title: 'Cannot remove trainee!',
											html: 'The trainee is linked to the following Audit' + (oResponse.data.rows.length > 1 ? 's' : '') + ':<br /><br />' +
													$.map(oParam.attendanceLinkAudits, function(x)
														{
															return x['audit.agrisubscription.membership.code'] + ' ' + x.codeofpracticetext + 
															" Audit dated " + x.actualdate + " for " + x.contactbusinesstext.formatXHTML();
														}).join('<br />'),
											buttons:
											[
												{
													text: 'OK',
													click: function()
													{
														$(this).dialog('destroy');
													}
												}
											]
										});
									}
									else
									{
										nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
									}
								}
								else
								{
									ns1blankspace.status.error('Error finding linked Audits: ' + oResponse.error.errrnotes);
								}
							});
						}
						else
						{ 	// v3.3.008 SUP023843 No need to search audits if there aren't any links
							oParam.removeAttendingTraineeStep = 2;
							nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
						}
					}

					// If no linked audits, remove attendance links
					else if (oParam.attendanceLinks.length > 0)
					{
						var iID = oParam.attendanceLinks.shift().id;

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_TRAINEE_ATTENDANCE_LINK_MANAGE'),
							data: 'remove=1&id=' + iID,
							success: function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									ns1blankspace.status.message('Attendance Link removed');
									nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing attendance link: ' + oResponse.error.erronotes);
								}
							}
						});
					}

					else
					{
						oParam.removeAttendingTraineeStep = 2;
						nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
					}
				}

				// Check if we need to remove the relationship link to current trainer
				// Only do this if this attendance is the only one for the current member & trainer combo
				// Now, Check how many other non-cancelled training course attendances it's linked to for same trainer 
				else if (oParam.removeAttendingTraineeStep === 2)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
					oSearch.addField('traineecontactbusiness');
					oSearch.addFilter('traineecontactbusiness', 'EQUAL_TO', iTraineeBusiness);
					oSearch.addFilter('agritrainingcourseattendee.course.trainercontactbusiness', 'EQUAL_TO', iTrainerBusiness);
					oSearch.addFilter('agritrainingcourseattendee.course.status', 'NOT_EQUAL_TO', nsFreshcare.data.trainingCourse.statusCancelled);
					oSearch.addFilter('id', 'NOT_EQUAL_TO', sID); 	// v3.3.005 SUP023807 Now excludes attendee, not whole course
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length === 0)
							{	// We need to remove the relationship link. Go to step 3
								oParam.removeAttendingTraineeStep = 3;
							}
							else
							{	// There are other non-cancelled courses by this trainer. Don't remove the relationship
								oParam.removeAttendingTraineeStep = 4;
							}
							nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding other trainees trained by the same trainer: ' + oResponse.error.errornotes);
						}
					});
				}

				// Next, get the relationship link id to the current trainer and remove 
				else if (oParam.removeAttendingTraineeStep === 3)
				{
					var oSearch = new AdvancedSearch()
					oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
					oSearch.addField('contactbusiness,othercontactbusiness');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', iTrainerBusiness);
					oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', iTraineeBusiness);
					oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.relationshipTrainer);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{	
								var sData = 'id=' + oResponse.data.rows[0].id + '&remove=1';
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
									data: sData,
									dataType: 'JSON',
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											oParam.removeAttendingTraineeStep = 4;
											nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
										}
										else
										{
											ns1blankspace.status.error('Error removing Site links: ' + oResponse.error.errornotes);
										}
									}
								});
							}
							else 
							{
								oParam.removeAttendingTraineeStep = 4;
								nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
							}	
						}
						else
						{
							ns1blankspace.status.error('Error finding relationship links to this trainer: ' + oResponse.error.errornotes);
						}
					});
				}

				// Next, get any linked product groups and remove 
				else if (oParam.removeAttendingTraineeStep === 4)
				{
					if (oParam.productGroups === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_SEARCH';
						oSearch.addField('coursetrainee,productcategory');
						oSearch.addFilter('coursetrainee', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.productGroups = oResponse.data.rows;
								nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding linked Categories: ' + oResponse.error.erronotes);
							}
						});
					}

					else if (oParam.productGroups.length > 0)
					{
						var iTraineeProductGroupId = oParam.productGroups.shift().id;	// this serves to remove the first row as well
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_MANAGE'),
							data: 'remove=1&id=' + iTraineeProductGroupId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									if (oParam.productGroups.length === 0)
									{
										oParam.removeAttendingTraineeStep = 5;
									}
									nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing Categories: ' + oResponse.error.erronotes);
								}
							}
						});
					}

					else
					{
						oParam.removeAttendingTraineeStep = 5;
						nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
					}
				}

				// Next, get any linked scopes and remove 
				else if (oParam.removeAttendingTraineeStep === 5)
				{
					if (oParam.scopes === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
						oSearch.addField('object,objectcontext,scope');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.scopes = oResponse.data.rows;
								nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding linked Scopes: ' + oResponse.error.erronotes);
							}
						});
					}

					else if (oParam.scopes.length > 0)
					{
						var iTraineeScopeId = oParam.scopes.shift().id;	// this serves to remove the first row as well
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
							data: 'remove=1&id=' + iTraineeScopeId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									if (oParam.scopes.length === 0)
									{
										oParam.removeAttendingTraineeStep = 6;
									}
									nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing linked Scopes: ' + oResponse.error.erronotes);
								}
							}
						});
					}

					else
					{
						oParam.removeAttendingTraineeStep = 6;
						nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
					}
				}

				// Next, get any linked site and remove 
				else if (oParam.removeAttendingTraineeStep === 6)
				{
					if (oParam.sites === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CORE_LOCATION_ADDRESS_LINK_SEARCH';
						oSearch.addField('address');
						oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTrainingCourseAttendee);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.sites = oResponse.data.rows;
								nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding linked Sites: ' + oResponse.error.erronotes);
							}
						});
					}

					// Delete sites
					else if (oParam.sites.length > 0)
					{
						var iTraineeSiteId = oParam.sites.shift().id;	// this serves to remove the first row as well
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
							data: 'remove=1&id=' + iTraineeSiteId,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									if (oParam.sites.length === 0)
									{
										delete(oParam.sites);
										oParam.removeAttendingTraineeStep = 10;
									}
									nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing linked Sites: ' + oResponse.error.erronotes);
								}
							}
						});
					}

					else 
					{
						oParam.removeAttendingTraineeStep = 10;
						nsFreshcare.admin.trainingcourse.trainees.remove.process(oParam);
					}
				}

				// Now, remove the trainee from training course and row from the UI && Trainees data
				else if (oParam.removeAttendingTraineeStep === 10)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
						data: 'remove=1&id=' + sID,
						success: function(oResponse) 
						{
							if (oResponse.status === 'OK') 
							{
								fFunctionPostRemove(oParam);
							}
							else 
							{
								ns1blankspace.status.error('Error removing attendee: ' + oResponse.error.errornotes);
							}
						}
					});
				}
			},

			postRemove: function(oParam)
			{
				var sID = ns1blankspace.util.getParam(oParam, 'traineeID').value;

				ns1blankspace.data.trainingCourse.attendeeCount -= 1;
				$('#ns1blankspaceTraineeRow_' + sID).hide();
				ns1blankspace.objectContextData.trainees = 
					$.grep(ns1blankspace.objectContextData.trainees, function(a) { return a.id != sID});

				ns1blankspace.status.message('Trainee removed.');
			}
		}
	}
}