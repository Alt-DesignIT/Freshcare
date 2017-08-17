/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.trainingpackage = 
{
	init: function (oParam) 
	{
					ns1blankspace.app.reset();

					ns1blankspace.object = 106;	
					ns1blankspace.objectName = 'trainingpackage';
					ns1blankspace.objectParentName = 'admin';
					ns1blankspace.objectMethod = 'AGRI_EDUCATION_TRAINING_PACKAGE';
					ns1blankspace.objectContextData = undefined;
					ns1blankspace.objectContext = -1;
					ns1blankspace.viewName = 'Training Packages';	

					oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
					oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
					ns1blankspace.app.set(oParam);

					if (nsFreshcare.user.role.toLowerCase() != 'admin') {
						// External users can't add or edit training packages
						$('#ns1blankspaceViewControlNew').button({disabled: true});
						$('#ns1blankspaceViewControlAction').button({disabled: true});
					}
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
			oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';		
			oSearch.addField('agritrainingpackage.membership,agritrainingpackage.membershiptext,agritrainingpackage.title,agritrainingpackage.availablefrom' +
							',agritrainingpackage.availableto');

			if (nsFreshcare.user.role.toLowerCase() != 'admin') 
			{
				// Force search to return 0 rows if there are no memberships listed against the trainer as it will show all of them
				if (nsFreshcare.data.trainerMemberships != undefined && nsFreshcare.data.trainerMemberships.length > 0) {
					var aTrainerMemberships = $.map(nsFreshcare.data.trainerMemberships, function(a) { return a.membership});
					oSearch.addFilter("agritrainingpackage.membership", "IN_LIST", aTrainerMemberships.join(','));
				}
				else {
					oSearch.addFilter("agritrainingpackage.id", "EQUAL_TO", '-99');
				}

				// Only show current training packages
				oSearch.addFilter('availablefrom', 'LESS_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
				oSearch.addOperator('and');
				oSearch.addBracket('(');
				oSearch.addFilter('availableto', 'GREATER_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
				oSearch.addOperator('or');
				oSearch.addFilter('availableto', 'IS_NULL');
				oSearch.addBracket(')');
			}

			oSearch.rows = 40;
			// v1.0.24 sorts by date if admin, otherwise alphabetical
			if (nsFreshcare.user.role.toLowerCase() === 'admin')
			{
				oSearch.sort('agritrainingpackage.modifieddate', 'desc');
			}
			else
			{
				oSearch.sort('agritrainingpackage.membershiptext', 'asc');
			}

			oSearch.getResults(function(oResponse) {nsFreshcare.admin.trainingpackage.home(oParam, oResponse)});	
			
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">');
				if (nsFreshcare.user.role.toLowerCase() === 'trainer' 
					&& (nsFreshcare.data.trainerMemberships === undefined 
						|| (nsFreshcare.data.trainerMemberships && nsFreshcare.data.trainerMemberships.length === 0))
					)
				{
					aHTML.push('You are not registered as providing training for any Freshcare Memberships.');
				}
				else 
				{
					aHTML.push('No training packages found.')
				}
				
				if (nsFreshcare.user.role.toLowerCase() === 'trainer' )
				{
					aHTML.push(' Please contact Freshcare.</td></tr>' +
									'</table>');
				}
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				if (nsFreshcare.user.role.toLowerCase() === 'admin')
				{
					aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY UPDATED</td></tr>');
				}
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Title</td>' +
								'<td class="ns1blankspaceCaption">Membership</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					var bAvailable = false;
					var dToday = new Date((new Date()).toString('dd MMM yyyy'));
					var dFrom = new Date((this['agritrainingpackage.availablefrom'] != '') ? this['agritrainingpackage.availablefrom'] : '');
					var dTo = new Date((this['agritrainingpackage.availableto'] != '') ? this['agritrainingpackage.availableto'] : '');

					bAvailable = (dFrom <= dToday && dTo >= dToday);

					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + '" class="ns1blankspaceMostLikely' + ((bAvailable) ? '' : ' nsFreshcareInactive') + '">' +
											this["agritrainingpackage.title"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely' + ((bAvailable) ? '' : ' nsFreshcareInactive') + '">' +
											this["agritrainingpackage.membershiptext"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.trainingpackage.search.send(event.target.id, {source: 1});
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
						
						if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
						{
							$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
							
							ns1blankspace.objectContext = sSearchContext;
							
							var oSearch = new AdvancedSearch();
							oSearch.endPoint = 'agri';
							oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';
							oSearch.addField('agritrainingpackage.reference,agritrainingpackage.title,agritrainingpackage.details' +
											',agritrainingpackage.availablefrom,agritrainingpackage.availableto,agritrainingpackage.membership' +
											',agritrainingpackage.membershiptext,agritrainingpackage.codeofpractice,agritrainingpackage.codeofpracticetext');

							oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
							oSearch.getResults(function(data) {nsFreshcare.admin.trainingpackage.show(oParam, data)});
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
								oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';
								oSearch.addField('title,membershiptext');
								
								oSearch.addBracket("(");
								if (iSource == ns1blankspace.data.searchSource.browse)
								{
									if (sSearchText != "ALL") {
										oSearch.addFilter('membershiptext', 'TEXT_STARTS_WITH', sSearchText);
										oSearch.addOperator("or");
										oSearch.addFilter('title', 'TEXT_STARTS_WITH', sSearchText);
										oSearch.addOperator("or");
										oSearch.addFilter('details', 'TEXT_STARTS_WITH', sSearchText);
									}
								}
								else
								{	
									oSearch.addFilter('membershiptext', 'TEXT_IS_LIKE', sSearchText);
									oSearch.addOperator("or");
									oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
									oSearch.addOperator("or");
									oSearch.addFilter('details', 'TEXT_IS_LIKE', sSearchText);
								}	
								oSearch.addBracket(')');

								if (nsFreshcare.user.role.toLowerCase() != 'admin') {

									// Force search to return 0 rows if there are no memberships listed against the trainer as it will show all of them
									if (nsFreshcare.data.trainerMemberships != undefined && nsFreshcare.data.trainerMemberships.length > 0) {
										var aTrainerMemberships = $.map(nsFreshcare.data.trainerMemberships, function(a) { return a.membership});
										oSearch.addFilter("membership", "IN_LIST", aTrainerMemberships.join(','));
									}
									else {
										oSearch.addFilter("id", "EQUAL_TO", '-99');
									}

									// Only show current training packages
									oSearch.addFilter('availablefrom', 'LESS_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
									oSearch.addOperator('and');
									oSearch.addBracket('(');
									oSearch.addFilter('availableto', 'GREATER_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
									oSearch.addOperator('or');
									oSearch.addFilter('availableto', 'IS_NULL');
									oSearch.addBracket(')');
								}
								else
								{
									ns1blankspace.search.advanced.addFilters(oSearch);

								}

								oSearch.rows = 40;
								oSearch.rf = 'json';
								oSearch.getResults(function(data) {nsFreshcare.admin.trainingpackage.search.process(oParam, data)});
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
												this.membershiptext +
											'</td>'); 
								
								aHTML.push('<td class="ns1blankspaceSearch" id="title' +
												'-' + this.id + '">' +
												this.title + 
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
							
							ns1blankspace.search.stop();
							
							$('td.ns1blankspaceSearch').click(function(event)
							{
								$(ns1blankspace.xhtml.container).html('&nbsp;');
								$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions)
								nsFreshcare.admin.trainingpackage.search.send(event.target.id, {source: 1});
							});
							
							ns1blankspace.render.bind(
							{
								columns: 'membershiptext-column-title',
								more: oResponse.moreid,
								rows: 40,
								startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
								functionSearch: nsFreshcare.admin.trainingpackage.search.send
							});   
							
						}	
					}
	},						

	layout: function ()
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
						
			aHTML.push('<tr><td id="ns1blankspaceControlCourses" class="ns1blankspaceControl">' +
							'Training Courses</td></tr>');
						
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainCourses" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		// context now set to true if admin
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: (nsFreshcare.user.role.toLowerCase() === 'admin')}});
			nsFreshcare.admin.trainingpackage.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: (nsFreshcare.user.role.toLowerCase() === 'admin')}});
			nsFreshcare.admin.trainingpackage.details();
		});
		
		$('#ns1blankspaceControlCourses').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainCourses', context: {inContext: (nsFreshcare.user.role.toLowerCase() === 'admin')}});
			nsFreshcare.admin.trainingpackage.trainingCourses.show({step: 1});
		});
		
	},

	show: function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;

		if (oParam) {
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		nsFreshcare.admin.trainingpackage.layout();
		
		if (oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find training package.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			ns1blankspace.objectContextData = oResponse.data.rows[0];
			
			if (nsFreshcare.user.role.toLowerCase() === 'admin') 
			{
				$('#ns1blankspaceViewControlAction').button({disabled: false});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			}
		
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["agritrainingpackage.title"]);
			
			//v2.0.4 Removed search.send from newDestination and now passes object with id to init
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.admin.trainingpackage.init({id: ' + ns1blankspace.objectContext + ')',
				move: false
				});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.trainingpackage.summary()'});
		}	
	},	
		
	summary: function ()
	{
		var aHTML = [];
		
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
			
			if (ns1blankspace.objectContextData['agritrainingpackage.membershiptext'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingpackage.membershiptext'] + ' (' + ns1blankspace.objectContextData['agritrainingpackage.codeofpracticetext'] + ')' +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Title</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agritrainingpackage.title'] +
						'</td></tr>');

			if (ns1blankspace.objectContextData['agritrainingpackage.availablefrom'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Available From</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingpackage.availablefrom'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['agritrainingpackage.availableto'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Available To</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agritrainingpackage.availableto'] +
							'</td></tr>');
			}

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspacePackageAddCourse" class="ns1blankspaceAction">' +
						'Add Training Course</span></td></tr>');

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			$('#ns1blankspacePackageAddCourse').button(
			{
				label: 'Add Training Course',
				icons:
				{
					primary: "ui-icon-clipboard"
				}
			})
			.click(function()
			{
				// v3.1.209b SUP022867 Added membership to paramerters
				var oParam = 
				{
					"new": true,
					trainingPackageText: ns1blankspace.objectContextData["agritrainingpackage.title"],
					trainingPackage: ns1blankspace.objectContext,
					trainingPackageMembership: ns1blankspace.objectContextData['agritrainingpackage.membership']
				};

				if (nsFreshcare.user.role.toLowerCase() != 'admin') {
					oParam.trainerContactBusiness = ns1blankspace.user.contactBusiness;
					oParam.trainerContactPerson = ns1blankspace.user.contactPerson;												
					oParam.trainerContactBusinessText = ns1blankspace.user.contactBusinessText;
					oParam.trainerContactPersonText = ns1blankspace.user.commonName;												
				}
				nsFreshcare.admin.trainingcourse.init(oParam);
			});
		}	
	},

	details: function() 
	{

		var aHTML = [];
		var dToday = new Date();
		
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
							'<td class="ns1blankspaceCaption">' +
							'Reference' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Title' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceText' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '"' +
								' data-mandatory="1" data-caption="Title">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'Available From' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceDate">' +
							'<input id="ns1blankspaceDetailsAvailableFrom" class="ns1blankspaceDate' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '"' +
								' data-mandatory="1" data-caption="Available From">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Available To' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsAvailableTo" class="ns1blankspaceDate' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '"' +
								' data-mandatory="1" data-caption="Available To">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Membership' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsMembership" class="ns1blankspaceSelect' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '"' +
								' data-click="nsFreshcare.admin.trainingpackage.defaultCOP"' +
								' data-mandatory="1" data-caption="Membership"' +
								' data-method="AGRI_MEMBERSHIP_SEARCH"' +
								' data-columns="code-space-description">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Code of Practice' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsCOP" class="ns1blankspaceSelect' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '"' +
								' data-mandatory="1" data-caption="Code of Practice"' +
								' data-method="AGRI_CODE_OF_PRACTICE_SEARCH"' +
								' data-parent="ns1blankspaceDetailsMembership"' +
								' data-parent-search-id="membership"' +
								' data-parent-search-text="description"' + 
								' data-columns="code-space-description">' +
							'</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

			aHTML = [];
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Details' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="nsFreshcareTextMulti">' +
							'<textarea rows="5" cols="35" id="ns1blankspaceDetailsDetails" class="ns1blankspaceTextMulti' + 
								((nsFreshcare.user.role.toLowerCase() != 'admin') ? ' nsFreshcareDisabled' : '') + '"></textarea>' +
							'</td></tr>');							

			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));
							
			$('.nsFreshcareDisabled').attr('disabled', true);
			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});


			if (ns1blankspace.objectContextData != undefined)
			{
				$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData["agritrainingpackage.reference"].formatXHTML());
				$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData['agritrainingpackage.title'].formatXHTML());
				$('#ns1blankspaceDetailsDetails').val(ns1blankspace.objectContextData['agritrainingpackage.details'].formatXHTML());
				$('#ns1blankspaceDetailsAvailableFrom').val(ns1blankspace.objectContextData['agritrainingpackage.availablefrom'].formatXHTML());
				$('#ns1blankspaceDetailsAvailableTo').val(ns1blankspace.objectContextData['agritrainingpackage.availableto'].formatXHTML());
				$('#ns1blankspaceDetailsMembership').val(ns1blankspace.objectContextData['agritrainingpackage.membershiptext'].formatXHTML());
				$('#ns1blankspaceDetailsMembership').attr('data-id', ns1blankspace.objectContextData['agritrainingpackage.membership']);
				$('#ns1blankspaceDetailsCOP').val(ns1blankspace.objectContextData['agritrainingpackage.codeofpracticetext'].formatXHTML());
				$('#ns1blankspaceDetailsCOP').attr('data-id', ns1blankspace.objectContextData['agritrainingpackage.codeofpractice']);
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

	trainingCourses: 
	{
		search: function(oParam, oResponse) 
		{

			var iPackage = ns1blankspace.objectContext;
			var iCourseStep = 1;

			if (oParam) {
				iPackage = (oParam.trainingPackage) ? oParam.trainingPackage : iPackage;
				if (oParam.courseStep) {iCourseStep = oParam.courseStep; }
			}

			if (iCourseStep === 1 && iPackage && ns1blankspace.objectContextData) {

				ns1blankspace.objectContextData.courses = {};
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "agri";
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
				oSearch.addField('title,details,coursedate,trainercontactbusiness,trainercontactbusinesstext' + 
								',trainercontactperson,trainercontactpersontext,status,statustext');
				oSearch.addFilter("package", "EQUAL_TO", iPackage);
				if (nsFreshcare.user.role.toLowerCase() != 'admin') {
					oSearch.addFilter("trainercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
				}
				oSearch.sort("coursedate", "desc");
				oSearch.rf = 'json';
				oSearch.getResults(function(data) {

					oParam = ns1blankspace.util.setParam(oParam, 'courseStep', 2);
					nsFreshcare.admin.trainingpackage.trainingCourses.search(oParam, data);
				});
			}
			else if (iCourseStep === 2) {
				if (oResponse.status === "OK") {
					ns1blankspace.objectContextData.trainingCourses = oResponse.data.rows;
					oParam = ns1blankspace.util.setParam(oParam, 'courseStep', 3);
					nsFreshcare.admin.trainingpackage.trainingCourses.search(oParam, oResponse);
				}
			}
			else if (iCourseStep === 3) {
				// This is where we add in the call back function
				ns1blankspace.util.setParam(oParam, "response", oResponse);
				ns1blankspace.util.setParam(oParam, "courseStep", undefined);
				ns1blankspace.util.onComplete(oParam);
			}
		},

		show: 	function(oParam, oResponse) 
		{

			var aHTML = [];
			var bRefresh = false;

			if (oParam) {
				if (oParam.refresh != undefined) {bRefresh = oParam.refresh;}
			}
			else {oParam = {};}

			if (bRefresh) {ns1blankspace.show({selector: '#ns1blankspaceMainCourses', refresh: true}); }

			if ($('#ns1blankspaceMainCourses').attr('data-loading') == '1')
			{
				
				if (oResponse === undefined && (oParam.response === undefined)) {
					nsFreshcare.admin.trainingpackage.trainingCourses.search({
						trainingPackage: ns1blankspace.objectContext,
						onComplete: nsFreshcare.admin.trainingpackage.trainingCourses.show
					});
				}
				else {

					if (oResponse === undefined) {
						oResponse = oParam.response;
					}

					$('#ns1blankspaceMainCourses').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceCoursesColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceCoursesColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainCourses').html(aHTML.join(''));
					
					var aHTML = [];
				
	
					aHTML.push('<table id="ns1blankspacePackageCourses" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Title</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Details</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Course Date</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Trainer</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Status</td>' + 
							        '<td class="ns1blankspaceHeaderCaption" id="ns1blankspacePackageCourseAdd">&nbsp;</td>' +
							    '</tr>');
					
					$.each(oResponse.data.rows, function() {

						aHTML.push('<tr id="ns1blankspaceCourseRow_' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowPackageCourse"' + 
										' id="ns1blankspaceCourseTitle_' + this.id + 
										'">' +
											this["title"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowPackageCourse"' + 
										' id="ns1blankspaceCourseDetail_' + this.id + 
										'">' +
											this["details"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowPackageCourse"' + 
										' id="ns1blankspaceCourseDate_' + this.id + 
										'">' +
											this["coursedate"] + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowPackageCourse"' + 
										' id="ns1blankspaceCourseTrainer_' + this.id + 
										'">' +
											this['trainercontactpersontext'] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowPackageCourse"' + 
										' id="ns1blankspaceCourseStatus_' + this.id + 
										'">' +
											this['statustext'] + 
										'</td>');


						aHTML.push('<td id=ns1blankspaceCourseActions">' +
										'<span id="ns1blankspaceCourseShow-' + this.id + '" ' + 
										'class="ns1blankspaceAction ns1blankspaceCourseShow" ' + 
										'data-rowID="' + this.id + '"></span>');

						if (this['status'] != nsFreshcare.data.trainingCourse.statusCompleted) {
							aHTML.push('<span id="ns1blankspaceCourseRemove_' + this.id + '" ' + 
											'class="ns1blankspaceAction ns1blankspaceCourseRemove" ' + 
											'data-rowID="' + this.id + '"></span>');
						}
						aHTML.push('</td></tr>');
					});

					aHTML.push('</table>');

					$('#ns1blankspaceCoursesColumn1').html(aHTML.join(''));

					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('<tr><td><span id="ns1blankspaceCourseAdd" class="ns1blankspaceAction" colspan="2">Add Training Course</span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceCourseColumn2').html(aHTML.join(''));

					// Add new Training Course
					$('#ns1blankspacePackageCourseAdd').button({
							text: false,
							label: 'Add Training Course',
							icons: {
								primary: "ui-icon-plus"
							}
					})
					.css('width', '15px')
					.css('height', '20px')
					.click(function() 
					{
						// v3.1.215 SUP023303 Was not passing membership
						var oParam = 
						{
							"new": true,
							trainingPackageText: ns1blankspace.objectContextData["agritrainingpackage.title"],
							trainingPackage: ns1blankspace.objectContext,
							trainingPackageMembership: ns1blankspace.objectContextData["agritrainingpackage.membership"]
						};

						if (nsFreshcare.user.role.toLowerCase() != 'admin') {
							oParam.trainerContactBusiness = ns1blankspace.user.contactBusiness;
							oParam.trainerContactPerson = ns1blankspace.user.contactPerson;												
							oParam.trainerContactBusinessText = ns1blankspace.user.contactBusinessText;
							oParam.trainerContactPersonText = ns1blankspace.user.commonName;												
						}
						nsFreshcare.admin.trainingcourse.init(oParam);
					});

					// Open Training Course
					$('.ns1blankspaceCourseShow').click(function(event) {

						nsFreshcare.admin.trainingcourse.init({showHome: false});
						nsFreshcare.admin.trainingcourse.search.send(this.id)

					})
					.button({
							text: false,
							label: 'Open',
							icons: {
								primary: "ui-icon-play"
							}
					})
					.css('width', '15px')
					.css('height', '20px');

					// Remove Course  
					$('.ns1blankspaceCourseRemove').button({
						text: false,
						label: 'Remove',
						icons: {
							primary: "ui-icon-close"
						}
					})
					.click(function(event) 
					{

						if (ns1blankspace.xhtml.divID === this.id) {
							$(ns1blankspace.xhtml.container).html('');
							$(ns1blankspace.xhtml.container).hide();
							ns1blankspace.xhtml.divID = '';
						}
						else 
						{
							ns1blankspace.xhtml.divID = this.id;

							var iRowID = ($(this).attr("data-rowID")) ? $(this).attr("data-rowID") : 'New';
							
							var aHTML = [];

							aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
										'<td><span id="ns1blankspaceCourseDelete_' + iRowID + '" class="ns1blankspaceSearch">Remove</span></td>' +
										'</tr></table>');

							$(ns1blankspace.xhtml.container).html(aHTML.join(''));
							$(ns1blankspace.xhtml.container).show();
							$(ns1blankspace.xhtml.container).offset(
							{ 
								top: $('#' + ns1blankspace.xhtml.divID).offset().top,
								left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
							});

							$('#ns1blankspaceCourseDelete_' + iRowID).click(function(event) 
							{
								var sID = $(this).attr('id').split('_')[1];
								$(ns1blankspace.xhtml.container).html('');
								$(ns1blankspace.xhtml.container).hide();
								
								$.ajax({
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_MANAGE'),
									data: 'remove=1&id=' + sID,
									success: function(oResponse) {

										if (oResponse.status === 'OK') {
											$('#ns1blankspaceCourseRow_' + sID).remove();
											ns1blankspace.objectContextData.trainingCourses = 
												$.grep(ns1blankspace.objectContextData.trainingCourses, function(a) { return a.id != sID});
										}
										else {
											ns1blankspace.status.error('Cannot delete');
										}
									}
								});
							});

						}

					})
					.css('width', '15px')
					.css('height', '20px');
				}	
			}
		}

	},

	save:     	
	{		
		validate: function(oParam)
		{
			var dFrom;
			var dTo;

			// Validate Mandatory fields, plus that From is less than To
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
				if (isValidDate($('#ns1blankspaceDetailsAvailableFrom').val()) && isValidDate($('#ns1blankspaceDetailsAvailableTo').val()) )
				{
					dFrom = new Date($('#ns1blankspaceDetailsAvailableFrom').val());
					dTo = new Date($('#ns1blankspaceDetailsAvailableTo').val());
					
					ns1blankspace.okToSave = (dFrom < dTo);
					if (!ns1blankspace.okToSave)
					{
						ns1blankspace.status.error('Available From must be before Available To');
					}
				}
			}

			if (ns1blankspace.okToSave)
			{
				nsFreshcare.admin.trainingpackage.save.send(oParam);
			}
		},

		send: 	function(oParam) 
		{
			var sData = 'id=';

			if (oParam === undefined) {oParam = {savePackageStep: 1}}

			// Validate fields entered
			if (oParam.savePackageStep === 1)
			{
				ns1blankspace.okToSave = true;
				oParam.savePackageStep = 2;
				nsFreshcare.admin.trainingpackage.save.validate(oParam);
			}

			// Save Package
			else if (oParam.savePackageStep === 2)
			{
				sData += ((ns1blankspace.objectContext != -1) 
							? ns1blankspace.objectContext + '&reference=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsReference').val())
							: '');
				sData += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitle').val()) +
						 '&availablefrom=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAvailableFrom').val()) +
						 '&availableto=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAvailableTo').val()) +
						 '&membership=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMembership').attr('data-id')) +
						 '&codeofpractice=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCOP').attr('data-id')) +
						 '&details=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDetails').val());

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_PACKAGE_MANAGE'),
					data: sData,
					success: nsFreshcare.admin.trainingpackage.save.process 
				});
			}
		},

		process: function(oResponse) 
		{
			var bNew = (ns1blankspace.objectContext === -1);
			if (oResponse.status === 'OK')
			{
				ns1blankspace.inputDetected = false;
				ns1blankspace.status.message('Package Saved');
				if (bNew)
				{
					ns1blankspace.objectContext = oResponse.id;
					nsFreshcare.admin.trainingpackage.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext});
				}
			}
			else
			{
				ns1blankspace.status.error('Error saving Package:' + oResponse.error.errornotes);
			}
		}
	}
}