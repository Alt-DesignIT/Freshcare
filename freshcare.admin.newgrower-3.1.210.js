/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
 // v3.1.210 replaced all dialog('close') with dialog('destroy')

nsFreshcare.admin.newgrower = 
{
	data:
	{
	},

	init: function (oParam) 
	{ 
		ns1blankspace.app.reset();

		ns1blankspace.object = 21;	
		ns1blankspace.objectName = 'newgrower';
		ns1blankspace.objectMethod = 'AGRI_TEMP_TRAINEE';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'New ' + nsFreshcare.data.growerText + 's';
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
		// v3.1.209 Search filters now namespace dependent
		var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'createddate'}).value;
		var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
		var oRoot = ns1blankspace.rootnamespace;
		var oNewGrowerRoot = (oRoot.admin && oRoot.admin.newgrower) ? oRoot.admin.newgrower : nsFreshcare.admin.newgrower;
		var aFilters = [{field: 'coursetext', comparison: 'IS_NOT_NULL'}];
		oNewGrowerRoot.data.objectContextData = undefined;
		if (oNewGrowerRoot.data && oNewGrowerRoot.data.search)
		{
			aFilters = (oNewGrowerRoot.data.search.filters) ? oNewGrowerRoot.data.search.filters : aFilters;
		}

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
			oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';		
			oSearch.addField('businessname,tradename,firstname,surname,suburb,state,createduser,createdusertext,createddate');		//,agritemptrainee.user.contactbusinesstext
			$.each(aFilters, function()
			{
				oSearch.addFilter(this.field, this.comparison, this.value1, this.value2, this.value3, this.applyToSubSearch);
			});
			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.newgrower.home(oParam, oResponse)});	
			
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">No new ' + nsFreshcare.data.growerText + 's found</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="businessname"' +
									' data-sortdirection="' + ((sSortColumn == "businessname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Legal Name</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="tradename"' +
									' data-sortdirection="' + ((sSortColumn == "tradename") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Trade name / Site</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="surname"' +
									' data-sortdirection="' + ((sSortColumn == "surname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Contact</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="suburb"' +
									' data-sortdirection="' + ((sSortColumn == "suburb") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Location</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="createddate"' +
									' data-sortdirection="' + ((sSortColumn == "createddate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Added On</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="createdusertext"' +
									' data-sortdirection="' + ((sSortColumn == "createdusertext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Added By</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_legalname-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["businessname"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_tradename-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["tradename"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_contact-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["firstname"] + ' ' + this["surname"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_location' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["suburb"] + ' ' + this["state"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_createdon' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["createddate"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_createdby' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["createdusertext"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.newgrower.search.send(event.target.id, {source: 1});
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.admin.newgrower.home(oParam);
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
			var oRoot = ns1blankspace.rootnamespace;
			var oNewGrowerRoot = (oRoot.admin && oRoot.admin.newgrower) ? oRoot.admin.newgrower : nsFreshcare.admin.newgrower;
			var sFields = 'abn,address1,address2,businessname,auditcontactbusiness,auditcontactbusinesstext' +
							',category,categorytext,codeofpractice,codeofpracticetext,country,course,coursetext,crop,email,fax,firstname,gender,gendertext' +
							',harvestmonth,jobtitle,joindate,mailingaddress1,mailingaddress2,mailingcountry,mailingpostcode,mailingstate,mailingsuburb' +
							',membership,membershiptext,mobile,notes,phone,postcode,sendprintedcertificates,state,suburb,surname,title,titletext,tradename' +
							',createddate,createduser,createdusertext,modifieddate,modifieduser,modifiedusertext';
			var aFilters = [{field: 'coursetext', comparison: 'IS_NOT_NULL'}];

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
				if (oNewGrowerRoot.data && oNewGrowerRoot.data.search)
				{
					sFields = (oNewGrowerRoot.data.search.fields) ? oNewGrowerRoot.data.search.fields : sFields;
					aFilters = (oNewGrowerRoot.data.search.filters) ? oNewGrowerRoot.data.search.filters : aFilters;
				}

				var oSearch = new AdvancedSearch();		
				oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';
				oSearch.addField(sFields);
				$.each(aFilters, function()
				{
					oSearch.addFilter(this.field, this.comparison, this.value1, this.value2, this.value3, this.applyToSubSearch);
				});

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.admin.newgrower.show(oParam, data)});
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
					oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';
					oSearch.addField('businessname,tradename,firstname,surname');
					
					oSearch.addBracket("(");
					oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('tradename', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('businessname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addBracket(')');

					oSearch.sort('businessname', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.admin.newgrower.search.process(oParam, data)});
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
									this["businessname"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="tradename-' + this.id + '">' +
									this["tradename"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="contact-' + this.id + '">' +
									this["firstname"] + ' ' + this.surname + '</td>'); 
					
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
					nsFreshcare.admin.newgrower.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'businessname-column-tradename-column-firstname-space-surname',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.newgrower.search.send
				});   
				
			}	
		}
	},						

	layout: function ()
	{
		var aHTML = [];
		var oContext = {inContext: false, 'new': true, action: false, actionOptions: false};		
		var oRoot = ns1blankspace.rootnamespace;
		var oNewGrowerRoot = (oRoot.admin && oRoot.admin.newgrower) ? oRoot.admin.newgrower : nsFreshcare.admin.newgrower;

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
						'Summary</td></tr>');
						
		aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
						'Details</td></tr>');
						
		aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
						'Address / Site</td></tr>');
	
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			var fFunction = (oNewGrowerRoot.summary) ? oNewGrowerRoot.summary : nsFreshcare.admin.newgrower.summary;
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			fFunction();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			var fFunction = (oNewGrowerRoot.details) ? oNewGrowerRoot.details : nsFreshcare.admin.newgrower.details;
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			fFunction();
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			var fFunction = (oNewGrowerRoot.address) ? oNewGrowerRoot.address : nsFreshcare.admin.newgrower.address;
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: oContext});
			fFunction();
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
			nsFreshcare.admin.newgrower.layout();
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
			// Set objectContextData & get Product Groups
			if (iShowStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['tradename'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['firstname'] + ' ' + ns1blankspace.objectContextData['surname'];

				$('#ns1blankspaceViewControlNew').button({disabled: true});
			
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_TRAINEE_PRODUCT_GROUP_SEARCH';
				oSearch.addField('trainee,traineetext,productcategory,productcategorytext')
				oSearch.addFilter('trainee', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === "OK")
					{
						oParam.showStep = 2;
						ns1blankspace.objectContextData.productGroups = oResponse.data.rows;
						nsFreshcare.admin.newgrower.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding Categories:' + oResponse.error.errornotes);
					}
				});
			}

			// Get CodeOfPractice & trainer details for the training course if not populated
			else if (iShowStep == 2)
			{
				if (ns1blankspace.objectContextData.codeofpractice === '' 
					|| ns1blankspace.objectContextData.trainercontactbusiness  == undefined || ns1blankspace.objectContextData.trainercontactperson === undefined)
				{
					// v3.1.208b SUP023149 Added coursedate
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
					oSearch.addField('trainercontactbusiness,trainercontactbusinesstext,trainercontactperson,trainercontactpersontext' +
									',agritrainingcourse.package.codeofpractice,agritrainingcourse.package.codeofpracticetext,coursedate');
					oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContextData.course);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.showStep = 3;
							if (oResponse.data.rows.length > 0)
							{
								ns1blankspace.objectContextData.coursedate = oResponse.data.rows[0]['coursedate'];
								ns1blankspace.objectContextData.codeofpractice = oResponse.data.rows[0]['agritrainingcourse.package.codeofpractice'];
								ns1blankspace.objectContextData.codeofpracticetext = oResponse.data.rows[0]['agritrainingcourse.package.codeofpracticetext'];
								ns1blankspace.objectContextData.trainercontactbusinesstext = oResponse.data.rows[0].trainercontactbusinesstext;
								ns1blankspace.objectContextData.trainercontactpersontext = oResponse.data.rows[0].trainercontactpersontext;
								ns1blankspace.objectContextData.trainercontactbusiness = oResponse.data.rows[0].trainercontactbusiness;
								ns1blankspace.objectContextData.trainercontactperson = oResponse.data.rows[0].trainercontactperson;
								nsFreshcare.admin.newgrower.show(oParam);
							}
							else
							{
								ns1blankspace.status.error('Training Course no longer exists');
							}
						}
						else
						{
							ns1blankspace.status.error('Unable to find Training Course: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.showStep = 3;
					nsFreshcare.admin.newgrower.show(oParam);
				}
			}

			// Get Object Scope (replaces Person Groups)
			else if (iShowStep == 3)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('object,objectcontext,scope,scopetext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTmpTrainee);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.showStep = 10;
						ns1blankspace.objectContextData.scopeValues = oResponse.data.rows; 
						// We need to map the scope values to person groups - DELETE ONCE ON SUBSCRIPTION
						// v3.1.204 SUP023020 Removed
						/*$.each(ns1blankspace.objectContextData.scopeValues, function()
						{
							var oThisScope = this;
							this.group = $.grep(nsFreshcare.data.businessGroupGrowerText, function(x) {return x.title === oThisScope.scopetext}).shift().id;
							this.grouptext = this.scopetext;
						});*/
						nsFreshcare.admin.newgrower.show(oParam);
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
					newDestination: 'nsFreshcare.admin.newgrower.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.newgrower.summary()'});
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
			
			if (ns1blankspace.objectContextData['businessname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['businessname'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['tradename'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trading and/or Site Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['tradename'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.data.contactPersonText +
						'</td></tr>');

			if (ns1blankspace.objectContextData['suburb'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Location</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['suburb'] + ' ' + ns1blankspace.objectContextData['state'] +
							'</td></tr>');
			}				
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['membershiptext'] + ' ' + ns1blankspace.objectContextData.codeofpracticetext + 
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainer</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['trainercontactbusinesstext'] + ' (' + ns1blankspace.objectContextData['trainercontactpersontext'] + ')' +
						'</td></tr>');
			
			// v3.1.208b SUP023149 Now shows coursedate instead of join date
			if (ns1blankspace.objectContextData.coursedate)
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['coursedate'] +
							'</td></tr>');
			}

			aHTML.push('</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspaceSummaryFindDuplicates" class="ns1blankspaceAction" style="width:150px;">' +
						'Find Potential Duplicates</span></td></tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td><span id="ns1blankspaceSummaryCreateGrower" class="ns1blankspaceAction" style="width:150px;">' +
						'Create ' + nsFreshcare.data.growerText + '</span></td></tr>');

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			
			$('#ns1blankspaceSummaryFindDuplicates')
				.button(
				{
					label: 'Find Potential Duplicates',
					icons: {primary: 'ui-icon-search'}
				})
				.on("click", function()
				{
					nsFreshcare.admin.newgrower.findDuplicates.show({xhtmlElementID: this.id});
				});

			$('#ns1blankspaceSummaryCreateGrower')
				.button(
				{
					label: 'Create ' + nsFreshcare.data.growerText,
					icons: {primary: 'ui-icon-plus'}
				})
				.on("click", function()
				{	
					ns1blankspace.container.confirm(
					{title: 'Add ' + nsFreshcare.data.growerText + '?', html: 'Are you sure you want to create this ' + nsFreshcare.data.growerText + '?',
						buttons: 
						[
							{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
								click: function() 
								{
									$(this).dialog('destroy');
									nsFreshcare.admin.newgrower.createNewGrower.send();
								}
							},
							{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
								click: function() 
								{
									$(this).dialog('destroy');
									return;
								}
							}
						]
					});
					
				});
		}	
	},

	details: 	function() 
	{
		var oRoot = ns1blankspace.rootnamespace;

		if (ns1blankspace.objectContextData['contactbusiness.reference'] === undefined)
		{
			ns1blankspace.objectContextData['contactbusiness.reference'] = '';
			ns1blankspace.objectContextData['contactbusiness.tradename'] = ns1blankspace.objectContextData.tradename;
			ns1blankspace.objectContextData['contactbusiness.legalname'] = ns1blankspace.objectContextData.businessname;
			ns1blankspace.objectContextData['contactbusiness.abn'] = ns1blankspace.objectContextData.abn;
			ns1blankspace.objectContextData['contactbusiness.notes'] = ns1blankspace.objectContextData.notes;
				
			ns1blankspace.objectContextData['contactbusiness.contactperson.position'] = ns1blankspace.objectContextData.jobtitle;
			ns1blankspace.objectContextData['contactbusiness.contactperson.title'] = ns1blankspace.objectContextData.title;
			ns1blankspace.objectContextData['contactbusiness.contactperson.titletext'] = ns1blankspace.objectContextData.titletext;
			ns1blankspace.objectContextData['contactbusiness.contactperson.gendertext'] = ns1blankspace.objectContextData.gendertext;
			ns1blankspace.objectContextData['contactbusiness.contactperson.gender'] = ns1blankspace.objectContextData.gender;
			ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] = ns1blankspace.objectContextData.firstname;
			ns1blankspace.objectContextData['contactbusiness.contactperson.surname'] = ns1blankspace.objectContextData.surname;
			ns1blankspace.objectContextData['contactbusiness.contactperson.email'] = ns1blankspace.objectContextData.email;
			ns1blankspace.objectContextData['contactbusiness.contactperson.notes'] = ns1blankspace.objectContextData.notes;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'] = ns1blankspace.objectContextData.mobile;
			ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'] = ns1blankspace.objectContextData.phone;
			ns1blankspace.objectContextData['contactbusiness.contactperson.fax'] = ns1blankspace.objectContextData.fax;

			// ToDo Need to convert agri-scope to person groups
		}

		oRoot.external.grower.details();
	},

	address: function (oParam)
	{
		if (ns1blankspace.objectContextData['contactbusiness.streetaddress1'] === undefined)
		{
			ns1blankspace.objectContextData['contactbusiness.streetaddress1'] = ns1blankspace.objectContextData.address1;
			ns1blankspace.objectContextData['contactbusiness.streetaddress2'] = ns1blankspace.objectContextData.address2;
			ns1blankspace.objectContextData['contactbusiness.streetsuburb'] = ns1blankspace.objectContextData.suburb;
			ns1blankspace.objectContextData['contactbusiness.streetstate'] = ns1blankspace.objectContextData.state;
			ns1blankspace.objectContextData['contactbusiness.streetpostcode'] = ns1blankspace.objectContextData.postcode;
			ns1blankspace.objectContextData['contactbusiness.streetcountry'] = ns1blankspace.objectContextData.country;
			ns1blankspace.objectContextData['contactbusiness.mailingaddress1'] = ns1blankspace.objectContextData.mailingaddress1;
			ns1blankspace.objectContextData['contactbusiness.mailingaddress2'] = ns1blankspace.objectContextData.mailingaddress2;
			ns1blankspace.objectContextData['contactbusiness.mailingsuburb'] = ns1blankspace.objectContextData.mailingsuburb;
			ns1blankspace.objectContextData['contactbusiness.mailingstate'] = ns1blankspace.objectContextData.mailingstate;
			ns1blankspace.objectContextData['contactbusiness.mailingpostcode'] = ns1blankspace.objectContextData.mailingpostcode;
			ns1blankspace.objectContextData['contactbusiness.mailingcountry'] = ns1blankspace.objectContextData.mailingcountry;
		}

		nsFreshcare.admin.grower.address({twoLineAddress: true, suburbUpper: true});	
	},

	findDuplicates: 
	{
		show: function(oParam)
		{
			// We need to try to find potential duplicates by looking for Growers with similar names in similar suburbs.
			var aHTML = [];
			var sXHTMLElementId = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;

			if ($(ns1blankspace.xhtml.dropDownContainer).html() === '')
			{
				aHTML.push('<table id="ns1blankspaceSummaryDuplicateSearch" class="ns1blankspace"' +
								' style="padding:2px; border: solid 1px #D0D0D0; background-color: #DDEABB;">');

				aHTML.push('<tr><td class="ns1blankspaceCaption">Business Name</td></tr>' +
							'<tr><td class="ns1blankspace"><input id="ns1blankspaceDuplicateSearchBusinessName" class="ns1blankspaceText" style="width:140px;"/></td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceCaption">Contact Name</td></tr>' +
							'<tr><td class="ns1blankspace"><input id="ns1blankspaceDuplicateSearchContactName" class="ns1blankspaceText" style="width:140px;"/></td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceCaption">Suburb</td></tr>' +
							'<tr><td class="ns1blankspace"><input id="ns1blankspaceDuplicateSearchSuburb" class="ns1blankspaceText" style="width:140px;"/></td></tr>');

				aHTML.push('<tr><td class="ns1blankspace" style="text-align:center;"><span id="ns1blankspaceDuplicateSearch">Search</span></td></tr>');

				aHTML.push('</table>');

				$(ns1blankspace.xhtml.dropDownContainer).css('width', parseInt($('#' + sXHTMLElementId).width()) + 'px');
				$(ns1blankspace.xhtml.dropDownContainer).show();
				$(ns1blankspace.xhtml.dropDownContainer).offset(
				{ 
					top: $('#' + sXHTMLElementId).offset().top + $('#' + sXHTMLElementId).height() + 5,
					left: $('#' + sXHTMLElementId).offset().left
				});
				$(ns1blankspace.xhtml.dropDownContainer).html(aHTML.join(''));
				$('#ns1blankspaceSummaryDuplicateSearch .ns1blankspaceText').css('width', parseInt($('#' + sXHTMLElementId).width()) - 10 + 'px');

				$('#ns1blankspaceDuplicateSearch')
					.button(
					{
						label: 'Search'
					})
					.on('click', function()
					{
						nsFreshcare.admin.newgrower.findDuplicates.search(
						{
							businessName: $('#ns1blankspaceDuplicateSearchBusinessName').val(),
							contactName: $('#ns1blankspaceDuplicateSearchContactName').val(),
							suburb: $('#ns1blankspaceDuplicateSearchSuburb').val()
						});
					});
			}
			else
			{
				$(ns1blankspace.xhtml.dropDownContainer).html('');
				$(ns1blankspace.xhtml.dropDownContainer).hide();
			}
		},

		search: function(oParam)
		{
			var sBusinessName = ns1blankspace.util.getParam(oParam, 'businessName', {'default': ''}).value;
			var sContactName = ns1blankspace.util.getParam(oParam, 'contactName', {'default': ''}).value;
			var sSuburb = ns1blankspace.util.getParam(oParam, 'suburb', {'default': ''}).value;
			var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
			var aSearch = [];
			var aHTML = [];

			if (oResponse === undefined)
			{
				// v3.1.204 SUP023020 Was still looking at persongroup
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('tradename,legalname,mailingaddress1,mailingaddress2,mailingsuburb,mailingstate,mailingpostcode,primarycontactperson' + 
								',contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.id' +
								',contactbusiness.addresslink.address.address1,contactbusiness.addresslink.address.address2,contactbusiness.addresslink.address.addresssuburb' +
								',contactbusiness.addresslink.address.addressstate,contactbusiness.addresslink.address.addresspostcode');
				oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);
				oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');

				if (sBusinessName != "")
				{
					oSearch.addBracket('(');

					aSearch = sBusinessName.split(' ');
					$.each(aSearch, function(index, value)
					{
						oSearch.addFilter('tradename', 'STRING_IS_LIKE', value);
						oSearch.addOperator('or');
						oSearch.addFilter('legalname', 'STRING_IS_LIKE', value);
						if (index < aSearch.length - 1)
						{
							oSearch.addOperator('or');
						}
					});
					oSearch.addBracket(')');

					if (sContactName != "" || sSuburb != "")
					{
						oSearch.addOperator('and');
					}
				}

				if (sContactName != "")
				{
					oSearch.addBracket('(');

					aSearch = sContactName.split(' ');
					$.each(aSearch, function(index, value)
					{
						oSearch.addFilter('contactbusiness.contactperson.firstname', 'STRING_IS_LIKE', value);
						oSearch.addOperator('or');
						oSearch.addFilter('contactbusiness.contactperson.surname', 'STRING_IS_LIKE', value);
						if (index < aSearch.length - 1)
						{
							oSearch.addOperator('or');
						}
					});
					oSearch.addBracket(')');

					if (sSuburb != "")
					{
						oSearch.addOperator('and');
					}
				}

				if (sSuburb != "")
				{
					oSearch.addBracket('(');

					aSearch = sSuburb.split(' ');
					$.each(aSearch, function(index, value)
					{
						oSearch.addFilter('contactbusiness.mailingsuburb', 'STRING_IS_LIKE', value);
						oSearch.addOperator('or');
						oSearch.addFilter('contactbusiness.addresslink.address.addresssuburb', 'STRING_IS_LIKE', value);
						if (index < aSearch.length - 1)
						{
							oSearch.addOperator('or');
						}
					});
					oSearch.addBracket(')');
				}

				oSearch.rows = 50;
				oSearch.sort('legalname', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						nsFreshcare.admin.newgrower.findDuplicates.search(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding duplicates: ' + oResponse.error.errornotes);
					}
				});
			}

			// We have a response. Display results on Summary tab and hide current SummaryColumn1 values
			else
			{
				if ($('#ns1blankspaceSummaryColumn1Table2').is('*'))
				{
					$('#ns1blankspaceSummaryColumn1Table2').remove();
				}

				aHTML.push('<table id="ns1blankspaceSummaryColumn1Table2" class="ns1blankspace"><tr>' +
								'<td id="ns1blankspaceSummaryDuplicateSearchResults"></td></tr></table>');

				$('#ns1blankspaceSummaryColumn1').html($('#ns1blankspaceSummaryColumn1').html() + aHTML.join(''));
				$('#ns1blankspaceSummaryColumn1Table1').hide();

				aHTML = [];

				aHTML.push('<table class="ns1blankspace"><tr>');

				aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="legalname" data-sortDirection="asc">Legal Name</td>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="tradename" data-sortDirection="asc">Trade / Site Name</td>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="contactbusiness.contactperson.firstname" data-sortDirection="asc">Contact</td>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="contactbusiness.addresslink.address.addresssuburb" data-sortDirection="asc">Location</td>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push(nsFreshcare.admin.newgrower.findDuplicates.row(this, oParam));
				});

				aHTML.push('</table>');

				$.extend(true, oParam,
				{
					xhtmlElementID: 'ns1blankspaceSummaryDuplicateSearchResults',
					xhtmlContext: 'Duplicates',
					xhtml: aHTML.join(''),
					showMore: (oResponse.morerows === 'true'),
					more: oResponse.moreid,
					rows: 50,
					functionShowRow: nsFreshcare.admin.newgrower.findDuplicates.row,
					functionOnNewPage: nsFreshcare.admin.newgrower.findDuplicates.bind,
				});
				ns1blankspace.render.page.show(oParam);
			}	
		},

		row: function(oRow, oParam)
		{
			var aHTML = [];
			var sContact = oRow['contactbusiness.contactperson.firstname'] + 
							((oRow['contactbusiness.contactperson.firstname'] != "") ? " " : "") +
							oRow['contactbusiness.contactperson.surname'] +
							((oRow.primarycontactperson === oRow['contactbusiness.contactperson.id']) 
								? '<br /><span style="font-size:0.75em;color:#A4A4A4;">(Primary contact)</span>'
								: '');

			aHTML.push('<tr>');

			aHTML.push('<td id="ns1blankspaceDuplicates_legalname-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.legalname + '</td>');

			aHTML.push('<td id="ns1blankspaceDuplicates_tradename-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.tradename + '</td>');
			
			aHTML.push('<td id="ns1blankspaceDuplicates_contact-' + oRow.id + '" class="ns1blankspaceRow">' +
								sContact + '</td>');

			aHTML.push('<td id="ns1blankspaceDuplicates_location-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow['contactbusiness.addresslink.address.addresssuburb'] + ' ' + oRow['contactbusiness.addresslink.address.addressstate'] + '</td>');

			aHTML.push('</tr>');

			return aHTML.join('');
		},

		bind: function(oParam)
		{

		}
	},

	remove: function(oParam)
	{
		// Here we remove the TEMP_TRAINEE record and then, if id is passed because we've just created the grower record, we open the grower record
		var oRoot = ns1blankspace.rootnamespace;
		var bGrowerCreated = (oParam.id != undefined)
		var iObjectContext = (bGrowerCreated) ? oRoot.admin.newgrower.data.objectContextData.id : ns1blankspace.objectContext;

		if (oParam.removeDataStep == undefined) {oParam.removeDataStep = 1}

		// Check for and remove child objectScope records
		if (oParam.removeDataStep === 1)
		{
			if (oParam.objectScope === undefined)
			{
				ns1blankspace.status.working('Removing source data..');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('objectcontext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTmpTrainee);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.objectScope = oResponse.data.rows;
						nsFreshcare.admin.newgrower.remove(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding scope: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				if (oParam.objectScopeIndex === undefined) {ns1blankspace.util.setParam(oParam, 'objectScopeIndex', 0)}

				if (oParam.objectScopeIndex < oParam.objectScope.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
						data: 'remove=1&id=' + oParam.objectScope[oParam.objectScopeIndex].id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.objectScopeIndex += 1;
								nsFreshcare.admin.newgrower.remove(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing scope: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.objectScopeIndex);
					delete(oParam.objectScope);
					oParam.removeDataStep += 1;
					nsFreshcare.admin.newgrower.remove(oParam);
				}
			}
		}

		// Remove any relationships if present
		else if (oParam.removeDataStep === 2)
		{
			if (oParam.relationships === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_BUSINESS_LINK_SEARCH';
				oSearch.addField('temptrainee');
				oSearch.addFilter('temptrainee', 'EQUAL_TO', iObjectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.relationships = oResponse.data.rows;
						nsFreshcare.admin.newgrower.remove(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding relationships: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				if (oParam.relationshipsIndex === undefined) {ns1blankspace.util.setParam(oParam, 'relationshipsIndex', 0)}

				if (oParam.relationshipsIndex < oParam.relationships.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_BUSINESS_LINK_MANAGE'),
						data: 'remove=1&id=' + oParam.relationships[oParam.relationshipsIndex].id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.relationshipsIndex += 1;
								nsFreshcare.admin.newgrower.remove(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing relationships: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.relationshipsIndex);
					delete(oParam.relationships);
					oParam.removeDataStep += 1;
					nsFreshcare.admin.newgrower.remove(oParam);
				}
			}
		}

		// Remove any product groups if present
		else if (oParam.removeDataStep === 3)
		{
			if (oParam.productGroups === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_TRAINEE_PRODUCT_GROUP_SEARCH';
				oSearch.addField('trainee');
				oSearch.addFilter('trainee', 'EQUAL_TO', iObjectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.productGroups = oResponse.data.rows;
						nsFreshcare.admin.newgrower.remove(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding categories: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				if (oParam.productGroupsIndex === undefined) {ns1blankspace.util.setParam(oParam, 'productGroupsIndex', 0)}

				if (oParam.productGroupsIndex < oParam.productGroups.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_PRODUCT_GROUP_MANAGE'),
						data: 'remove=1&id=' + oParam.productGroups[oParam.productGroupsIndex].id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.productGroupsIndex += 1;
								nsFreshcare.admin.newgrower.remove(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing product groups: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.productGroupsIndex);
					delete(oParam.productGroups);
					oParam.removeDataStep= 10;
					nsFreshcare.admin.newgrower.remove(oParam);
				}
			}
		}

		// Remove the original AGRI_TEMP_TRAINEE record
		else if (oParam.removeDataStep === 10)
		{
			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
				data: 'remove=1&id=' + iObjectContext,
				success: function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						// Now we display the egg farmer record
						delete(oParam.removeDataStep);
						delete(oRoot.admin.newgrower.data.objectContextData);
						ns1blankspace.status.clear();
						if (bGrowerCreated)
						{
							oRoot.admin.grower.init(oParam);
						}
						else
						{
							nsFreshcare.admin.newgrower.init();
						}
					}
					else
					{
						ns1blankspace.status.error('Error removing new grower record: ' + oResponse.error.errornotes);
					}
				}
			});
		}
	},

	save:
	{
		validate: function(oParam)
		{

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

				// If Legal Name not populated, set to Trading Name
				if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsLegalNameUpdate').val() === '')
				{
					$('#ns1blankspaceDetailsLegalNameUpdate').val($('#ns1blankspaceDetailsTradingNameUpdate').val());
				}

				// v3.1.0e Need to verify the email address
				if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsEmailUpdate').val() != '' && !nsFreshcare.util.validateEmail($('#ns1blankspaceDetailsEmailUpdate').val()))
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Please provide a valid email address for the Grower');
					return false;
				}

				if (ns1blankspace.okToSave && ns1blankspace.objectContext === -1 && $('#ns1blankspaceMainAddress').html() === '')
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Please add Address details for a new Grower');
					return false;
				}
			} 

			if (ns1blankspace.okToSave && $('#ns1blankspaceMainAddress').html() != '')
			{
				// First validate mandatory fields
				if (ns1blankspace.okToSave)
				{
					$('#ns1blankspaceMainAddress input[data-mandatory]').each(function() 
					{
						if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}
					});
				}
			}

			if (ns1blankspace.okToSave && oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
		},

		send: function(oParam)
		{
			var oTmpBusinessData = ns1blankspace.util.getParam(oParam, 'tmpBusinessData', {'default': {}}).value;
			var aTmpScopeData = ns1blankspace.util.getParam(oParam, 'tmpScopeData', {'default': []}).value;
			var aTmpCategoryData = ns1blankspace.util.getParam(oParam, 'tmpCategoryData', {'default': []}).value;
			var functionValidate = ns1blankspace.util.getParam(oParam, 'functionValidate', {'default': nsFreshcare.admin.newgrower.save.validate}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var aUpdatedScopes = [];
			var aUpdatedCategories = [];
			var iGrower = (nsFreshcare.data.businessGroupGrower) ? nsFreshcare.data.businessGroupGrower : nsFreshcare.data.businessGroupGrower;
			var fFunctionCollateData = (oRoot.admin && oRoot.admin.newgrower && oRoot.admin.newgrower.data && oRoot.admin.newgrower.data.functionCollateData)
										? oRoot.admin.newgrower.data.functionCollateData : undefined;


			if (oParam) {if (oParam.saveNewGrowerStep === undefined) {oParam.saveNewGrowerStep = 1}}
			else {oParam = {saveNewGrowerStep: 1}}

			// Cannot have new records here, so validation must have failed so we need to retrieve id and objectContextData
			if (ns1blankspace.objectContext === -1)
			{
				ns1blankspace.objectContextData = oRoot.admin.newgrower.data.objectContextData;
				ns1blankspace.objectContext = ns1blankspace.objectContextData.id;
			}

			// Collate data
			if (oParam.saveNewGrowerStep === 1)
			{
				ns1blankspace.okToSave = true;
				oParam.onComplete = nsFreshcare.admin.newgrower.save.send;
				oParam.saveNewGrowerStep = 2;
				functionValidate(oParam);
			}

			else if (oParam.saveNewGrowerStep === 2)
			{
				if ($('#ns1blankspaceMainDetails').html() != '')
				{
					oTmpBusinessData = 
					{
						id: ns1blankspace.objectContext,
						businessname: $('#ns1blankspaceDetailsLegalNameUpdate').val(),
						tradename: $('#ns1blankspaceDetailsTradingNameUpdate').val(),
						abn: $('#ns1blankspaceDetailsABNUpdate').val(),
						jobtitle: $('#ns1blankspaceDetailsPositionUpdate').val(),
						title: $('#ns1blankspaceDetailsTitleUpdate').attr('data-id'),
						gender: $('#ns1blankspaceDetailsGenderUpdate').attr('data-id'),
						firstname: $('#ns1blankspaceDetailsFirstNameUpdate').val(),
						surname: $('#ns1blankspaceDetailsSurnameUpdate').val(),
						phone: $('#ns1blankspaceDetailsPhoneUpdate').val(),
						mobile: $('#ns1blankspaceDetailsMobileUpdate').val(),
						fax: $('#ns1blankspaceDetailsFaxUpdate').val(),
						email: $('#ns1blankspaceDetailsEmailUpdate').val(),
						joindate: $('#ns1blankspaceDetailsJoinDateUpdate').val(),
						notes: $('#ns1blankspaceDetailsNotesUpdate').val(),
						harvestmonth: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate'}),
						auditcontactbusiness: ns1blankspace.objectContextData.auditcontactbusiness,
						codeofpractice: ns1blankspace.objectContextData.codeofpractice,
						membership: ns1blankspace.objectContextData.membership
					}

					// Calculate sorted crops data
					var sCrops = $('#ns1blankspaceMembershipCropsUpdate').val();
					var sCropsSorted = sCrops;
					if (sCrops != 'wine grapes')
					{
						var aCropsSorted = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
												function(x) 
												{
													return {
																value: $(x).html(),
																sortValue: $(x).html().toUpperCase()
															}
												})
												.sort(ns1blankspace.util.sortBy('value'));
						sCrops = $.map(aCropsSorted, function(x) {return x.value}).join(', ');

					}
					oTmpBusinessData.crop = sCrops;
					
					// Now generate scope data
					aUpdatedScopes = $.map($('#ns1blankspaceDetailsScopeUpdate td'), function(x)
												{
													var oRow = 
													{
														id: $('#nsFreshcareScopeList_' + x.id.split('_').pop()).attr('data-rowID'), 
														scope: x.id.split('_').pop(), 
														scopetext: $(x).html(),
														selected: $(x).hasClass('nsFreshcareSelected')
													}
													return oRow;
												});
					$.each(aUpdatedScopes, function()
					{
						if ((this.id === undefined || this.id === 'undefined') && this.selected)
						{
							aTmpScopeData.push(
							{
								object: nsFreshcare.objectTmpTrainee,
								objectContext: ns1blankspace.objectContext,
								scope: this.scope
							});
						}
						else if (this.id && !this.selected)
						{
							aTmpScopeData.push(
							{
								remove: '1',
								id: this.id
							});
						}
					});


					// Now generate category (Product Group) data
					aUpdatedCategories = $.map($('#ns1blankspaceDetailsProductGroupUpdate td'), function(x)
												{
													var oRow =  
													{
														id: $('#nsFreshcareProductGroupList_' + x.id.split('_').pop()).attr('data-rowID'), 
														category: x.id.split('_').pop(), 
														selected: $(x).hasClass('nsFreshcareSelected')
													};
													return oRow;
												});
					$.each(aUpdatedCategories, function()
					{
						if (this.id === undefined && this.selected)
						{
							aTmpCategoryData.push(
							{
								trainee: ns1blankspace.objectContext,
								productGroup: this.category
							});
						}
						else if (this.id && !this.selected)
						{
							aTmpCategoryData.push(
							{
								remove: '1',
								id: this.id
							});
						}
					});
				}

				if ($('#ns1blankspaceMainAddress').html() != '')
				{
					oTmpBusinessData.address1 = $('#ns1blankspaceAddressStreetAddress1').val();
					oTmpBusinessData.address2 = $('#ns1blankspaceAddressStreetAddress2').val();
					oTmpBusinessData.suburb = $('#ns1blankspaceAddressStreetSuburb').val();
					oTmpBusinessData.state = $('#ns1blankspaceAddressStreetState').val();
					oTmpBusinessData.postcode = $('#ns1blankspaceAddressStreetPostCode').val();
					oTmpBusinessData.country = $('#ns1blankspaceAddressStreetCountry').val();
					oTmpBusinessData.mailingaddress1 = $('#ns1blankspaceAddressMailingAddress1').val();
					oTmpBusinessData.mailingaddress2 = $('#ns1blankspaceAddressMailingAddress2').val();
					oTmpBusinessData.mailingsuburb = $('#ns1blankspaceAddressMailingSuburb').val();
					oTmpBusinessData.mailingstate = $('#ns1blankspaceAddressMailingState').val();
					oTmpBusinessData.mailingpostcode = $('#ns1blankspaceAddressMailingPostCode').val();
					oTmpBusinessData.mailingcountry = $('#ns1blankspaceAddressMailingCountry').val();
				}

				oParam.tmpBusinessData = oTmpBusinessData;
				oParam.tmpScopeData = aTmpScopeData;
				oParam.tmpCategoryData = aTmpCategoryData;
				oParam.saveNewGrowerStep = 3;

				// v3.1.0 For forking when need to specify more data
				// v3.1.209 Now uses fFunctionCollateData
				if (fFunctionCollateData)
				{
					oParam.onComplete = nsFreshcare.admin.newgrower.save.send;
					fFunctionCollateData(oParam);
				}
				else
				{
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Save AgriTmpBusiness
			else if (oParam.saveNewGrowerStep === 3)
			{
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
					data: oTmpBusinessData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.status.message('New ' + nsFreshcare.data.growerText + ' saved');
							oParam.saveNewGrowerStep = 4;
							nsFreshcare.admin.newgrower.save.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error saving new ' + nsFreshcare.data.growerText + ': ' + oResponse.error.errornotes);
						}
					}
				});
			}

			// Save ObjectScope
			else if (oParam.saveNewGrowerStep === 4)
			{
				if (oParam.saveObjectIndex === undefined) {oParam.saveObjectIndex = 0}

				if (oParam.saveObjectIndex < aTmpScopeData.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
						data: aTmpScopeData[oParam.saveObjectIndex],
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message(nsFreshcare.data.growerText + ' Scope saved');
								oParam.saveObjectIndex += 1;
								nsFreshcare.admin.newgrower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving new ' + nsFreshcare.data.growerText + ' Scope: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.saveObjectIndex);
					oParam.saveNewGrowerStep = 5;
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Save Category (product groups)
			else if (oParam.saveNewGrowerStep === 5)
			{
				if (oParam.saveObjectIndex === undefined) {oParam.saveObjectIndex = 0}

				if (oParam.saveObjectIndex < aTmpCategoryData.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_PRODUCT_GROUP_MANAGE'),
						data: aTmpCategoryData[oParam.saveObjectIndex],
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message(nsFreshcare.data.growerText + ' Category saved');
								oParam.saveObjectIndex += 1;
								nsFreshcare.admin.newgrower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving new ' + nsFreshcare.data.growerText + ' Category: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.saveObjectIndex);
					oParam.saveNewGrowerStep = 10;
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Re-display record
			else if (oParam.saveNewGrowerStep === 10)
			{
				ns1blankspace.inputDetected = false;
				nsFreshcare.admin.newgrower.init({id: ns1blankspace.objectContext});
			}
		}
	},

	createNewGrower:
	{
		data: {},

		send: function(oParam)
		{
			// This is the process to add the new grower to the db. We use the same code as in admin.grower.save but different functions for collecting details tab data
			var aRelationshipObject = [			
			{
				object: 'relationship',
				method: 'CONTACT_RELATIONSHIP_MANAGE',
				saveSource: 'relationshipsData',
				dataSource: '',
				dataSourcePrefix: 'relationship'
			}];

			if (oParam === undefined) {oParam = {}}
			
			nsFreshcare.admin.grower.data.saveObjects = nsFreshcare.admin.grower.data.saveObjects.concat(aRelationshipObject);
			oParam.functionValidate = nsFreshcare.admin.newgrower.save.validate;
			oParam.functionSaveDetails = nsFreshcare.admin.newgrower.createNewGrower.details;
			oParam.functionSaveAddress = nsFreshcare.admin.grower.save.address;
			oParam.functionSaveMore = nsFreshcare.admin.newgrower.createNewGrower.extendedTasks;
			oParam.newMembership = true;
			oParam.functionSearch = nsFreshcare.admin.newgrower.remove;

			// We have to render both the details and address tabs to make sure the data is picked up
			if ($('#ns1blankspaceMainDetails').html() === '')
			{
				$('#ns1blankspaceMainDetails').attr('data-loading', '1');
				nsFreshcare.admin.newgrower.details();
				$('#ns1blankspaceMainDetails').hide();
			}
			if ($('#ns1blankspaceMainAddress').html() === '')
			{
				$('#ns1blankspaceMainAddress').attr('data-loading', '1');
				nsFreshcare.admin.newgrower.address();
				$('#ns1blankspaceMainAddress').hide()
			}
			
			ns1blankspace.newGrower = true; 
			oParam.functionInvalidData = nsFreshcare.admin.newgrower.createNewGrower.dataError;
			nsFreshcare.admin.newgrower.data.objectContext = ns1blankspace.objectContext;
			nsFreshcare.admin.newgrower.data.objectContextData = ns1blankspace.objectContextData;
			ns1blankspace.objectContext = -1;
			nsFreshcare.admin.grower.save.send(oParam);
		},

		dataError: function()
		{
			ns1blankspace.objectContext = nsFreshcare.admin.newgrower.data.objectContext;
			ns1blankspace.objectContextData = nsFreshcare.admin.newgrower.data.objectContextData;
			delete(nsFreshcare.admin.newgrower.data.objectContext);
			delete(nsFreshcare.admin.newgrower.data.objectContextData);
		},

		details: function(oParam)
		{
			var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": nsFreshcare.admin.grower.save.send}).value;			
			var oBusinessData = ns1blankspace.util.getParam(oParam, 'businessData', {"default": {}}).value;
			var oPersonData	= ns1blankspace.util.getParam(oParam, 'personData', {"default": {}}).value;
			var oAgriBusinessData = ns1blankspace.util.getParam(oParam, 'agriBusinessData', {"default": {}}).value;
			var aBusinessGroupsData = ns1blankspace.util.getParam(oParam, 'businessGroupsData', {"default": []}).value;
			var aPersonGroupsData = ns1blankspace.util.getParam(oParam, 'personGroupsData', {"default": []}).value;
			var aSubscriptionsData = ns1blankspace.util.getParam(oParam, 'subscriptionsData', {"default": []}).value;
			var aSubscriptionCategoryData = ns1blankspace.util.getParam(oParam, 'subscriptionCategoryData', {"default": []}).value;
			var aSubscriptionScopeData = ns1blankspace.util.getParam(oParam, 'subscriptionScopeData', {"default": []}).value;
			var oSubscriptionStatusChangeData = ns1blankspace.util.getParam(oParam, 'subscriptionStatusChangeData', {"default": {}}).value;
			var aRelationshipsData = ns1blankspace.util.getParam(oParam, 'relationshipsData', {'default': []}).value;
			var aSubscriptionSitesLinkData = ns1blankspace.util.getParam(oParam, 'subscriptionSitesLinkData', {"default": []}).value;
			var oTrainingCourseAttendeeData = ns1blankspace.util.getParam(oParam, 'trainingCourseAttendeeData', {'default': {}}).value;

			// v3.1.206 SUP023052 Was not picking up notes that Trainer had entered
			var sNotes = ($('#ns1blankspaceDetailsNotesUpdate').val() != '')
							? $('#ns1blankspaceDetailsNotes').html()  + '\r\n' + $('#ns1blankspaceDetailsNotesUpdate').val()
							: $('#ns1blankspaceDetailsNotes').html();

			oBusinessData = $.extend(true, oBusinessData, 
			{
				reference: oParam.nextReference,
				tradename: $('#ns1blankspaceDetailsTradingNameUpdate').val(),
				legalname: $('#ns1blankspaceDetailsLegalNameUpdate').val(),
				abn: $('#ns1blankspaceDetailsABNUpdate').val(),
				phonenumber: $('#ns1blankspaceDetailsPhoneUpdate').val(),
				faxnumber: $('#ns1blankspaceDetailsFaxUpdate').val(),
				notes: sNotes,
				customerstatus: nsFreshcare.data.contactStatusActive
			});
			oBusinessData['se' + nsFreshcare.data.sendPrintedCertificatesId] = $.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'No'}),
																						function(y) {return y.id}).shift();

			oPersonData = $.extend(true, oPersonData,
			{
				firstname: $('#ns1blankspaceDetailsFirstNameUpdate').val(),
				surname: $('#ns1blankspaceDetailsSurnameUpdate').val(),
				title: $('#ns1blankspaceDetailsTitleUpdate').attr('data-id'),
				position: $('#ns1blankspaceDetailsPositionUpdate').val(),
				gender: $('#ns1blankspaceDetailsGenderUpdate').attr('data-id'),
				workphone: $('#ns1blankspaceDetailsPhoneUpdate').val(),
				fax: $('#ns1blankspaceDetailsFaxUpdate').val(),
				mobile: $('#ns1blankspaceDetailsMobileUpdate').val(),
				email: $('#ns1blankspaceDetailsEmailUpdate').val(),
				notes: sNotes,
				customerstatus: nsFreshcare.data.contactStatusActive,
				contactbusiness: ''
			});
		
			oAgriBusinessData = $.extend(true, oAgriBusinessData,
			{
				contactbusiness: '',
				joindate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),	
				prioritymembership: $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id')
			}) 

			// Only add business Group of 'Grower'
			aBusinessGroupsData.push(
			{
				group: nsFreshcare.data.businessGroupGrowerID,
				contactbusiness: ''
			});
			
			// v3.12 SUP022744 Only add person Group of 'Grower'
			aPersonGroupsData.push(
			{
				group: nsFreshcare.data.grower.categoryGrower,
				contactperson: ''
			});
			
			// v3.1.0 add to contactperson for easier identification. Later add to attending trainee contact
			aPersonGroupsData.push(
			{
				group: nsFreshcare.data.groupTrainee,
				contactperson: ''
			});

			// Add the Trainer relationship
			aRelationshipsData.push( 
			{
				contactbusiness: ns1blankspace.objectContextData.trainercontactbusiness,
				othercontactbusiness: '',
				type: nsFreshcare.data.relationshipTrainer,
				startdate: $('#ns1blankspaceDetailsTrainingDateUpdate').val()
			});

			var sCrops = $('#ns1blankspaceMembershipCropsUpdate').val();
			if (sCrops != 'wine grapes')
			{
				var aCropsSorted = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
										function(x) 
										{
											return {
														value: $(x).html(),
														sortValue: $(x).html().toUpperCase()
													}
										})
										.sort(ns1blankspace.util.sortBy('value'));
				sCrops = $.map(aCropsSorted, function(x) {return x.value}).join(', ');
			}

			// Subscription data
			aSubscriptionsData = [
			{
				contactbusiness: '',
				contactperson: '',
				membership: $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id'),
				startdate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),
				codeofpractice: ns1blankspace.objectContextData.codeofpractice,
				status: nsFreshcare.data.grower.subscriptionStatusTI,
				laststatuschangedate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),
				crop: sCrops,
				harvestmonth: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate'})
			}];

			// Status Change Data
			oSubscriptionStatusChangeData = 
			{
				subscription: '',
				changecontactbusiness: ns1blankspace.user.contactBusiness,
				changecontactperson: ns1blankspace.user.contactPerson,
				changedate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),
				tostatus: nsFreshcare.data.grower.subscriptionStatusTI
			};

			// Add Scope
			// v3.1.2 SUP022744 Now adds scope instead of persongroups
			$('.nsFreshcareScope.nsFreshcareSelected').each(function()
			{
				aSubscriptionScopeData.push(
				{
					scope: this.id.split('_').pop(), 
					object: nsFreshcare.objectSubscription,
					objectcontext: ''
				});
			});
			if (aSubscriptionScopeData.length === 0)
			{
				aSubscriptionScopeData.push(
				{
					scope: $.grep(nsFreshcare.data.scopeOptions, function(x) {return x.scopetext == 'Grower'}).shift().id, 
					object: nsFreshcare.objectSubscription,
					objectcontext: ''
				});			
			}

			// Category data
			$('.nsFreshcareProductGroup.nsFreshcareSelected').each(function()
			{
				aSubscriptionCategoryData.push(
				{
					productcategory: this.id.split('_').pop(), 
					subscription: ''
				});
			});

			// Training Course Attendee data
			// v3.1.2 SUP022932 Was not saving first and surname to attending trainee
			oTrainingCourseAttendeeData = 
			{
				traineecontactbusiness: '',
				traineecontactperson: '',
				course: $('#ns1blankspaceDetailsTrainingCourseUpdate').attr('data-id'),
				status: '1',
				attendingtrainee: $('#ns1blankspaceDetailsFirstNameUpdate').val() + ' ' + $('#ns1blankspaceDetailsSurnameUpdate').val(),
				firstname: $('#ns1blankspaceDetailsFirstNameUpdate').val(),
				surname: $('#ns1blankspaceDetailsSurnameUpdate').val()
			}


			oParam.detailsTab = true;
			oParam.businessData = oBusinessData;
			oParam.personData = oPersonData;
			oParam.agriBusinessData = oAgriBusinessData;
			oParam.businessGroupsData = aBusinessGroupsData;
			oParam.personGroupsData = aPersonGroupsData;
			oParam.subscriptionsData = aSubscriptionsData;
			oParam.subscriptionCategoryData = aSubscriptionCategoryData;
			oParam.subscriptionScopeData = aSubscriptionScopeData;
			oParam.subscriptionStatusChangeData = oSubscriptionStatusChangeData;
			oParam.relationshipsData = aRelationshipsData;
			oParam.subscriptionSitesLinkData = aSubscriptionSitesLinkData;
			oParam.trainingCourseAttendeeData = oTrainingCourseAttendeeData;

			nsFreshcare.admin.newgrower.data.objectContextData = ns1blankspace.objectContextData;
			ns1blankspace.objectContextData = undefined;

			fFunctionSave(oParam);
		},

		extendedTasks: function(oParam)
		{
			// We need to add relationship to the CB and parent business if applicable
			// Plus add trainee record to the TrainingCourse

			var oData = {};

			if (oParam.extendedTasksStep == undefined) {oParam.extendedTasksStep = 1}

			if (oParam.extendedTasksStep === 1)
			{
				if (oParam.addRelationshipIndex === undefined) {oParam.addRelationshipIndex = 0}

				if (oParam.relationshipsData && oParam.addRelationshipIndex < oParam.relationshipsData.length)
				{
					oData.contactbusiness = oParam.relationshipsData[oParam.addRelationshipIndex].contactbusiness;
					oData.othercontactbusiness = oParam.relationshipsData[oParam.addRelationshipIndex].othercontactbusiness;
					oData.type = oParam.relationshipsData[oParam.addRelationshipIndex].type;
					oData.startdate = oParam.relationshipsData[oParam.addRelationshipIndex].startdate;

					if (oData.contactbusiness === '' || oData.contactbusiness == undefined) { oData.contactbusiness = ns1blankspace.objectContext}
					if (oData.othercontactbusiness === '' || oData.othercontactbusiness == undefined) { oData.othercontactbusiness = ns1blankspace.objectContext}

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('relationship added');
								oParam.addRelationshipIndex += 1;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding relationship: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.addRelationshipIndex);
					oParam.extendedTasksStep = 2;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Create trainee record if required
			else if (oParam.extendedTasksStep === 2)
			{
				if (oParam.trainingCourseAttendeeData)
				{
					var oData = oParam.trainingCourseAttendeeData;
					
					oData.traineecontactbusiness = ns1blankspace.objectContext;
					oData.traineecontactperson = oParam.contactperson.id;

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.extendedTasksStep = 10;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding Trainee to training course: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					oParam.extendedTasksStep = 10;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Finish up and call back
			else if (oParam.extendedTasksStep === 10)
			{
				delete(oParam.extendedTasksStep);
				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	}
}