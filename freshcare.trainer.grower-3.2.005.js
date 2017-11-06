/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.trainer.grower = 
{
	init: function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'grower';
		ns1blankspace.objectParentName = 'trainer';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Trainees';	
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		ns1blankspace.data.grower = {};
		ns1blankspace.data.grower.trainingCourse = undefined;
		ns1blankspace.data.grower.trainingCourseText = undefined;
		ns1blankspace.data.grower.trainingPackage = undefined;
		ns1blankspace.data.grower.trainingPackageText = undefined;
		ns1blankspace.data.grower.membershipText = undefined;
		ns1blankspace.data.grower.membership = undefined;
		delete(nsFreshcare.admin.grower.data.newSiteCount);

		if (oParam != undefined)
		{
			if (oParam.trainingCourse != undefined) {ns1blankspace.data.grower.trainingCourse = oParam.trainingCourse;}
			if (oParam.trainingCourseText != undefined) {ns1blankspace.data.grower.trainingCourseText = oParam.trainingCourseText;}
			if (oParam.trainingPackage != undefined) {ns1blankspace.data.grower.trainingPackage = oParam.trainingPackage;}
			if (oParam.trainingPackageText != undefined) {ns1blankspace.data.grower.trainingPackageText = oParam.trainingPackageText;}
			if (oParam.membership != undefined) {ns1blankspace.data.grower.membership = oParam.membership;}
			if (oParam.membershipText != undefined) {ns1blankspace.data.grower.membershipText = oParam.membershipText;}
			if (oParam.onCompleteSave != undefined) {ns1blankspace.data.grower.onCompleteSave = oParam.onCompleteSave}
			if (oParam.onCompleteSaveParam != undefined) {ns1blankspace.data.grower.onCompleteSaveParam = oParam.onCompleteSaveParam}
		}	

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
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
			oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename');
			oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
			oSearch.addFilter("contactbusiness.contactperson.customerstatus", "EQUAL_TO", nsFreshcare.data.contactStatusActive);
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipTrainer);
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.rows = 40;
			oSearch.sort('contactbusiness.modifieddate', 'desc');
			
			oSearch.getResults(function(oResponse) {nsFreshcare.trainer.grower.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length === 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">Click New to add a Trainee.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY UPDATED</td></tr>');
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Business</td>' +
								'<td class="ns1blankspaceCaption">Contact</td>' +
							'</tr>');

				// v3.1.0 remove duplicates
				var sPreviousId = "";
				$.each(oResponse.data.rows, function()
				{
					if (sPreviousId != this.id)
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.tradename"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_name-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>' +
									'</tr>');
					}
					sPreviousId = this.id
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.trainer.grower.search.send(event.target.id, {source: 1});
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
			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				
				// v3.1.205 Still need to search for primarycontactperson
				// v3.1.206 SUP023035 Removed search for person mailing address and now finds notes on business
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.title' + 
								',contactbusiness.contactperson.titletext,contactbusiness.contactperson.position,contactbusiness.contactperson.gender' +
								',contactbusiness.contactperson.email,contactbusiness.contactperson.workphone,contactbusiness.contactperson.id' + 
								',contactbusiness.contactperson.mobile,contactbusiness.contactperson.fax,contactbusiness.contactperson.gendertext' + 
								',contactbusiness.mailingaddress1,contactbusiness.mailingaddress2,contactbusiness.mailingsuburb,contactbusiness.mailingstate,contactbusiness.mailingpostcode,contactbusiness.mailingcountry' +
								',contactbusiness.notes,contactbusiness.contactperson.preferredcommunication,contactbusiness.contactperson.preferredcommunicationtext' + 
								',contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference,contactbusiness.primarycontactperson');
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipTrainer);
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addBracket("(");
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addOperator("or");
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
				oSearch.addBracket(")");

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.addFilter('contactbusiness.primarycontactperson', 'EQUAL_TO', 'field:contactbusiness.contactperson.id')
				oSearch.getResults(function(data) {nsFreshcare.trainer.grower.show(oParam, data)});
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
					oSearch.method = 'CONTACT_BUSINESS_SEARCH';
					oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename,contactbusiness.legalname');
					
					oSearch.addBracket("(");
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						if (sSearchText != "ALL") {
							oSearch.addFilter('contactbusiness.contactperson.firstname', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('contactbusiness.contactperson.surname', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('contactbusiness.tradename', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('contactbusiness.legalname', 'TEXT_STARTS_WITH', sSearchText);
						}
					}
					else
					{	
						oSearch.addFilter('contactbusiness.contactperson.firstname', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator("or");
						oSearch.addFilter('contactbusiness.contactperson.surname', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator("or");
						oSearch.addFilter('contactbusiness.tradename', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator("or");
						oSearch.addFilter('contactbusiness.legalname', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipTrainer);
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					oSearch.addBracket("(");
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					oSearch.addOperator("or");
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
					oSearch.addBracket(")");
					oSearch.sort("contactbusiness.tradename", "asc");
					
					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.trainer.grower.search.process(oParam, data)});
				}
			}	
		},

		process: function (oParam, oResponse)
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
					if (sPreviousId != this.id) {
						iColumn = iColumn + 1;
						
						if (iColumn == 1)
						{
							aHTML.push('<tr class="ns1blankspaceSearch">');
						}
						
						aHTML.push('<td class="ns1blankspaceSearch" id="contactbusiness' +
										'-' + this.id + '">' +
										this["contactbusiness.tradename"] + '</td>' + 
									'<td class="ns1blankspaceSearch" id="contactbusiness' +
										'-' + this.id + '">' +
										this["contactbusiness.legalname"] +
									'</td>'); 
						
						aHTML.push('<td class="ns1blankspaceSearch" id="contactperson' +
										'-' + this.id + '">' +
										this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>');
										
						if (iColumn == iMaximumColumns)
						{
							aHTML.push('</tr>');
							iColumn = 0;
						}	
					}
					sPreviousId = this.id;
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
					nsFreshcare.trainer.grower.search.send(event.target.id, {source: 1});
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows and 1st & 2nd page of results now match formatsns1blankspace.render.bind(
				ns1blankspace.render.bind(
				{
					columns: 'contactbusiness.tradename-space-contactbusiness.legalname-column-contactbusiness.contactperson.firstname-space-contactbusiness.contactperson.surname',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.trainer.grower.search.send
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
							
			aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
							'Address / Sites</td></tr>');
		}
		else
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Summary</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Details</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlContacts" class="ns1blankspaceControl">' +
							'Other Contacts</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
							'Address / Sites</td></tr>');
		
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainContacts" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.trainer.grower.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.external.grower.details();
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{	//, context: {inContext: false}
			ns1blankspace.show({selector: '#ns1blankspaceMainContacts', context: {new: true, actionOptions: true, inContext: false}});
			// v3.1.1 SUP022427 Now shows contacts with groups Grower + Other Contact
			// v3.1.205 SUP023021 Was not passing objectContext and picking up Trainer's contacts. Doh!
			// v3.2.005 SUP023369 Now filters inactive contacts
			nsFreshcare.external.grower.contacts.show(
			{
				contactBusiness: ns1blankspace.objectContext,
				contactPerson: ns1blankspace.objectContextData['contactbusiness.primarycontactperson'],
				statusField: 'supplier',
				hideInactive: true
			});
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.trainer.grower.address();
		});
	},

	show: function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;
		var oRoot = ns1blankspace.rootnamespace;

		if (oParam) 
		{
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		if (iStep === 1) 
		{
			nsFreshcare.trainer.grower.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find grower.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			oParam.contactBusiness = ns1blankspace.objectContext;

			if (iStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['contactbusiness.contactperson.id'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'];
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContext;
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactbusiness.tradename'];

				$('#ns1blankspaceViewControlAction').button({disabled: false});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			
				oParam.step = 2;
				oParam.lastAudit = true;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.trainer.grower.show);
				oRoot.external.grower.memberships.search(oParam);
			}

			else if (iStep === 2) 
			{
				oParam.step = 3;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.trainer.grower.show);
				nsFreshcare.admin.grower.membership.layout(oParam);
				nsFreshcare.external.grower.auditors.search(oParam);
			}

			// v2.0.2 Changed from productGroups to growerSites as ProductGroups now at Membership level
			else if (iStep === 3) 
			{
				oParam.step = 5;		// v3.1.2 SUP022744 Step 4 used to search for persongroups
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.trainer.grower.show);
				nsFreshcare.admin.grower.siteAddress.search(oParam);
			}

			else if (iStep === 5) 
			{
				oParam.step = 6;

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br />' + ns1blankspace.data.contactPersonText.formatXHTML());
				
				// v2.0.4 Removed search.send from newDestination and now passes object with id to init
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.trainer.grower.init({id: ' + ns1blankspace.objectContext + ')',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.trainer.grower.summary()'});
			}
		}	
			},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this trainee.</td></tr></table>');
					
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
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Company ID</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactbusiness.reference'] +
						'</td></tr>');

			if (ns1blankspace.objectContextData['contactbusiness.legalname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.legalname'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'] +
						'</td></tr>');

			if (ns1blankspace.objectContextData['contactperson.workphone'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Mobile</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'] +
							'</td></tr>');
			}				
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certificate Number</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) {
				$.each(ns1blankspace.objectContextData.memberships, function() {

					if (this['agrisubscription.agricertificate.certificatenumber'] != "" ) {
						aHTML.push(this['agrisubscription.agricertificate.certificatenumber']);
						return false;		// We only want the first non-blank one as they're all the same
					}
				});
			}
			else {
				aHTML.push('No Certificate.');
			}
			aHTML.push('</td></tr>');


			// List Trainers
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certification Body</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.auditors && ns1blankspace.objectContextData.auditors.length > 0) {
				// 
				var aValues = [];
				$.each(ns1blankspace.objectContextData.auditors, function() {
					aValues.push( this['contactbusiness.tradename'] );
				});
				aHTML.push(aValues.join('<br />'));
			} 
			else {
				aHTML.push('No Certification Body assigned.')
			} 
			aHTML.push('</td></tr>');	
					

			// List Memberships
			// v1.0.26 added more columns to Memberships table and shaded expired ones
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Memberships</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) {
				aHTML.push('<table class="ns1blankspace">');

				aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Membership</td>' +
								'<td class="ns1blankspaceHeaderCaption">COP</td>' +
								'<td class="ns1blankspaceHeaderCaption">Status</td>' +
								'<td class="ns1blankspaceHeaderCaption">Last Audit</td>' +
								'<td class="ns1blankspaceHeaderCaption">Expires</td>' +
							'<tr>');
				
				$.each(ns1blankspace.objectContextData.memberships, function() {
					
					// Shade expired certificates
					var dToday = new Date();
					var dExpiry = (this['agrisubscription.agricertificate.enddate'] != '') 
									? (new Date(this['agrisubscription.agricertificate.enddate'])) 
									: undefined;
					var bCertified = (dExpiry && dExpiry > dToday);

					aHTML.push('<tr><td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.membershiptext'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricodeofpractice.code'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.statustext'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.lastauditdate'] + '</td>');			
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricertificate.enddate'] + '</td>');			
					aHTML.push('</tr>');
				});
				/*$.each(ns1blankspace.objectContextData.memberships, function() {
					aHTML.push('<tr><td class="ns1blankspaceRow">' + this['agrisubscription.membershiptext'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow">' + this['agrisubscription.statustext'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow">' + this['agrisubscription.agricodeofpractice.code'] + '</td></tr>');
				});*/
				aHTML.push('</table>');
			} 
			else {
				aHTML.push('No Memberships')
			} 
			aHTML.push('</td></tr>');	
					
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspaceGrowerAddToTrainingCourse" class="ns1blankspaceAction">' +
						'Add to Training Course</span></td></tr>');

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			$('#ns1blankspaceGrowerAddToTrainingCourse').button(
			{
				label: 'Add to Training Course',
				icons:
				{
					primary: "ui-icon-clipboard"
				}
			})
			.click(function()
			{
				
				nsFreshcare.trainer.grower.addToTrainingCourse();
			});
		}	
	},

	details: 	function() 
	{
		var oRoot = ns1blankspace.rootnamespace;
		oRoot.external.grower.details();
	},

	postPackageClick: function(oResponse) 
	{

		// v2.0.2 Now sets Product Groups, Category & Crop if user selects VIT or WIN membership

		if (oResponse === undefined) {
				if ($('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-id') != undefined && $('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-id') != '') {

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';
				oSearch.addField('membership,codeofpractice');
				oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-id'));
				oSearch.getResults(nsFreshcare.trainer.grower.postPackageClick);
			}
		}
		else {

			if (oResponse.status === 'OK') 
			{

				var oRow = oResponse.data.rows[0];
				$('#ns1blankspaceDetailsMembershipUpdate').attr('data-id', oRow.membership);
				$('#ns1blankspaceDetailsMembershipUpdate').attr('data-COP', oRow.codeofpractice);

				// v2.0.2
				// For WIN & VIT Memberships, Crops are set to Wine grapes, Product Groups set to Wine Grapes
				// For VIT, Category = Grower, for WIN, Category = Winery and user can't change these settings
				if (oRow.membership === nsFreshcare.data.membershipWIN || oRow.membership === nsFreshcare.data.membershipVIT)
				{
					var iWineGrapes = $.map($.grep(nsFreshcare.data.productGroups, function(x) {return x[1].toLowerCase() === 'wine grapes'}),
										function(y) {return y[0]}).shift();

					// v3.1.0i SUP022304 changed grep to look at scopeOPtions
					var iWinery = $.map($.grep(nsFreshcare.data.scopeOptions, function(x) {return x.title == 'Winery'}),
										function(y) {return y.id}).shift();

					// Set Crops to Wine Grapes and disable
					$('#ns1blankspaceMembershipCropsUpdate').val('Wine Grapes');
					$('#ns1blankspaceMembershipCropsUpdate').attr('disabled', true);	
					$('#ns1blankspaceMembershipCropsUpdate').addClass('nsFreshcareDisabled');	
					
					// Hide other options for Product Groups
					$.each($('.nsFreshcareProductGroup'), function() 
					{
						if (this.id.split('_').pop() != iWineGrapes)
						{
							$(this).removeClass('nsFreshcareSelected');
							$(this).parent().hide();
						}
						else
						{
							$(this).addClass('nsFreshcareSelected');
						}

					});

					// Hide other options for Scopes
					$.each($('.nsFreshcareScope'), function() 
					{
						if (   (oRow.membership === nsFreshcare.data.membershipWIN && this.id.split('_').pop() != iWinery)
							|| (oRow.membership === nsFreshcare.data.membershipVIT && this.id.split('_').pop() != iWinery))
						{
							$(this).removeClass('nsFreshcareSelected');
							$(this).parent().hide();
						}
						else
						{
							$(this).addClass('nsFreshcareSelected');
						}
					});
				}
				else
				{
					// Enable crops field
					$('#ns1blankspaceMembershipCropsUpdate').attr('disabled', false);

					// Show hidden Product Groups rows
					$.each($('.nsFreshcareProductGroup'), function() 
					{
						if (!$(this).is(':visible'))
						{
							$(this).parent().show();
						}
					});

					$.each($('.nsFreshcareScope'), function() 
					{
						if (!$(this).is(':visible'))
						{
							$(this).parent().show();
						}
					});
				}
			}
		}
	},

	address: 	function() 
	{

		if (ns1blankspace.objectContext === -1) {
			// This function is used when adding a new Trainee as they are only permitted to add the mailing & street address
			// v1.0.24 added suburbCase param
			nsFreshcare.admin.grower.address({twoLineAddress: true, suburbUpper: true});	
		}
		else {
			nsFreshcare.external.grower.address.show({step: 1});
		}
	},

	addToTrainingCourse: 	function(oParam, oResponse) 
	{

		var iStep = 1;

		if (oParam) {
			if (oParam.addToCourseStep) {iStep = oParam.addToCourseStep;}
		}
		else {
			oParam = {addToCourseStep: 1};
		}

		if ($(ns1blankspace.xhtml.container).is(':visible')) {
			$(ns1blankspace.xhtml.container).hide();
			$(ns1blankspace.xhtml.container).html(''); 

		}
		else {

			if (iStep === 1 && oResponse === undefined) {
				var oSearch = new AdvancedSearch();
				oSearch.method = "AGRI_EDUCATION_TRAINING_COURSE_SEARCH";
				oSearch.addField('title,coursedate,location');
				oSearch.addFilter('trainercontactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.trainingCourse.statusScheduled);
				oSearch.addFilter('agritrainingcourse.package.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	//v1.0.24
				oSearch.sort('coursedate', 'asc');
				oSearch.rows = 40;
				oSearch.getResults(function(oResponse) {

					nsFreshcare.trainer.grower.addToTrainingCourse({addToCourseStep: 2}, oResponse);
				});
			}
			else if (iStep === 2 && oResponse) {

				var aHTML = [];

				if (oResponse.status === 'OK') {

					$.each(oResponse.data.rows, function() {

						aHTML.push('<tr id="ns1blankspaceCourseSearchRow_' + this.id + '">');
						aHTML.push('<td id="ns1blankspaceCourseTitle_' + this.id + '" class="ns1blankspaceSearch">' + this.title + '<td>');
						aHTML.push('<td id="ns1blankspaceCourseLocation_' + this.id + '" class="ns1blankspaceSearch">' + this.location + '<td>');
						aHTML.push('<td id="ns1blankspaceCourseDate_' + this.id + '" class="ns1blankspaceSearch">' + this.coursedate + '<td>');
						aHTML.push('</tr>');
					});
				}

				if (aHTML.length === 0) {
					aHTML.push('<tr><td id="ns1blankspaceAddTrainingCourse" class="ns1blankspaceSearch">No scheduled Training Courses found. Click to add a training course.</td></tr>')
				}
				
				aHTML.unshift('<table class="ns1blankspaceSearchMedium">');
				aHTML.push('</table>');

				ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceGrowerAddToTrainingCourse', topOffset: 10, setWidth: true});
				$(ns1blankspace.xhtml.container).show();
				$(ns1blankspace.xhtml.container).html(aHTML.join(''));

				$('td.ns1blankspaceSearch').click(function() {

					var sCourseId = this.id.split('_')[1];

					$(ns1blankspace.xhtml.container).hide();
					$(ns1blankspace.xhtml.container).html('');
					if (sCourseId != undefined) 
					{

						var oParam = {functionDefault: 'nsFreshcare.admin.trainingcourse.trainees.show()',
										growerReference: ns1blankspace.objectContextData['contactbusiness.reference'], 
										growerBusiness: ns1blankspace.objectContext,
										growerPerson: ns1blankspace.objectContextData['contactbusiness.contactperson.id'],
										growerBusinessText: ns1blankspace.objectContextData['contactbusiness.tradename'],
										growerPersonText: ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'],
										newTrainee: true,
										refresh: true,
										showHome: false};
						nsFreshcare.admin.trainingcourse.init(oParam);
						nsFreshcare.admin.trainingcourse.search.send('-' + sCourseId, oParam);
					}
				});	

				$('#ns1blankspaceAddTrainingCourse').click(function() {
					nsFreshcare.admin.trainingpackage.init();
				});
			}		
		}
	},		

	membership: 
	{
		show: 	function(oParam) 
		{
			var oRoot = ns1blankspace.rootnamespace;
			var aHTML = [];
			var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
			var oMembership = ns1blankspace.util.getParam(oParam, 'membershipData').value;

			oParam.renderAudits = false;
			oParam.renderStatusTransactions = false;
			oParam.showAuditRows = false;
			oParam.showStatusRows = false;

			if (iMembership == undefined || oMembership == undefined) 
			{
				alert('Sorry can\'t find this membership.');
			}
			else
			{
				oRoot.external.grower.membership.show(oParam);
			}
		}
	},

	save: 	
	{
		validate: 	function(oParam) 
		{
			// v3.1.0 Now exposes all input tabs before validating to allow cross-validation
			if (oParam === undefined) {oParam = {validateSaveStep: 1}; ns1blankspace.okToSave = true;}
			else 
			{
				if (oParam.validateSaveStep === undefined) 
				{
					oParam.validateSaveStep = 1
					if (oParam.onComplete) {oParam.functionSave = oParam.onComplete}
					ns1blankspace.okToSave = true;
				}
			}


			// Validations if existing grower
			if (ns1blankspace.objectContext != -1) 
			{
				// First make sure all tabs have been exposed so we can cross-validate
				if (oParam.validateSaveStep === 1)
				{
					if (oParam.membershipShowIndex === undefined) 
					{
						ns1blankspace.status.working('Validating data...')
						oParam.membershipShowIndex = 0;
						if ($('#ns1blankspaceMainDetails').html() == '')
						{
							$('#ns1blankspaceMainDetails').attr('data-loading', '1');
							nsFreshcare.external.grower.details();
							$('#ns1blankspaceMainDetails').hide();
						}

						if ($('#ns1blankspaceMainAddress').html() == '')
						{
							$('#ns1blankspaceMainAddress').attr('data-loading', '1');
							nsFreshcare.external.grower.address.show({step: 1});
							$('#ns1blankspaceMainAddress').hide();
						}
					}

					if (oParam.membershipShowIndex < ns1blankspace.objectContextData.memberships.length)
					{
						if ($('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).html() == '')
						{
							oParam.onCompleteWhenCan = oParam.onComplete;
							oParam.onComplete = nsFreshcare.trainer.grower.save.validate;
							$('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).attr('data-loading', '1');
							$('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).hide();
							oParam.membership = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id;
							oParam.membershipData = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex];
							oParam.membershipShowIndex += 1;
							nsFreshcare.trainer.grower.membership.show(oParam);
						}
						else
						{
							oParam.membershipShowIndex += 1;
							nsFreshcare.trainer.grower.save.validate(oParam);
						}
					}
					else
					{
						delete(oParam.membership);
						delete(oParam.membershipData);
						delete(oParam.membershipShowIndex);
						oParam.onComplete = oParam.functionSave;
						oParam.validateSaveStep = 2;
						nsFreshcare.trainer.grower.save.validate(oParam);
					}
				}

				// Now perform the validation
				else if (oParam.validateSaveStep === 2)
				{
					if ($('#ns1blankspaceMainDetails').html() != '') 
					{
						// Check if at least one SCope selected
						if ($('.nsFreshcareScope.nsFreshcareSelected').length == 0) 
						{	// 2.0.4h SUP021634 cahnged to certification scope
							ns1blankspace.status.message('You must choose at least one Certification Scope.');
							ns1blankspace.okToSave = false;
							return; 
						}

						// Validate madatory fields v2.0.21 Added
						if (ns1blankspace.okToSave) 
						{
							$('input[data-mandatory]').each(function() {										

								//v1.0.26 added check for data-id on mandatory combos
								if (this.id.indexOf('ns1blankspaceDetails') > -1 
									&& ($(this).val() === ''
					   					|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) 
								{
									ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
									$(this).focus();
									ns1blankspace.okToSave = false;
									return false;
								}
							});
						}

						// v3.1.0e Need to verify the email address
						if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsEmailUpdate').val() != '' && !nsFreshcare.util.validateEmail($('#ns1blankspaceDetailsEmailUpdate').val()))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please provide a valid email address for the Grower');
						}
					}

					// v2.0.21 Added
					if (ns1blankspace.okToSave && $('#ns1blankspaceMainAddress').html() != '') 
					{	
						if ($('#ns1blankspaceAddressManageContainer').is('*'))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please confirm or Cancel the changes to the Address before continuing');
							return false;
						}

						// Validate mandatory fields - Mailing addresses
						$('#ns1blankspaceMainAddress input[data-mandatory]').each(function() 
						{										
							if ($(this).val() === '') 
							{
								ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
								$(this).focus();
								ns1blankspace.okToSave = false;
								return false;
							}
						});

						// v3.1.0 Also validates all sites data
						$('#ns1blankspaceMainAddress .ns1blankspaceGrowerAddressRowEdit[data-mandatory]').each(function() 
						{
							if ($(this).attr('data-mandatory') === '1' && $(this).html() === '') 
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
								return false;
							}
						});

						// v3.1.0 Trainers don't actually update the data - they only send to freshcare so we let them remove sites and Freshcare can follow this up if
						// linked to a Membership
					}

					if (ns1blankspace.okToSave && ns1blankspace.objectContextData.memberships.length > 0)
					{
						$.each(ns1blankspace.objectContextData.memberships, function(x)
						{
							if ($('#ns1blankspaceMembership' + this.id).html() != '')
							{
								// v2.0.4h SUP021634 Will default to Wine Grapes if applicable, otherwise it errors
								var iProductGroups = 0;
								if ($.grep($('#ns1blankspaceMainMembership' + this.id + ' .nsFreshcareProductGroup '), function(a) { return (!$(a).hasClass('nsFreshcareSelected'))}).length === 0) 
								{
									if (this.id != nsFreshcare.data.membershipWIN && this.id != nsFreshcare.data.membershipVIT)
									{
										ns1blankspace.status.message('You must choose at least one Scope.');
										ns1blankspace.okToSave = false;
										return; 
									}
									else
									{
										var iWineGrapes = $.map($.grep(nsFreshcare.data.grower.productGroups, function(x) {return x[1] === 'Wine Grapes'}),
																function(y) {return y[0]}).shift();
										nsFreshcare.external.grower.manageMultiRows('nsFreshcareProductGroup_' + iWineGrapes);
									}
								}

								// v2.0.4o SUP022032 Validate at least one site chosen
								if (ns1blankspace.okToSave && $('#ns1blankspaceMembership' + this.id + 'MembershipSiteUpdate .nsFreshcareSelected').length === 0)
								{
									ns1blankspace.status.message('You must choose at least 1 site for Membership ' + this.membershiptext);
									ns1blankspace.okToSave = false;
									return false;
								}
							}
						});
					}

					if (ns1blankspace.okToSave)
					{
						oParam.step = 1;
						delete(oParam.validateSaveStep);
						nsFreshcare.trainer.grower.save.send(oParam);
					}
				}
			}

			// Validate fields entered on new grower
			if (ns1blankspace.objectContext === -1)
			{
				if ($('#ns1blankspaceMainDetails').html() != '') 
				{
					// Set defaults
					if ($('#ns1blankspaceDetailsLegalNameUpdate').val() == '' && $('#ns1blankspaceDetailsTradingNameUpdate').val() != '') {
						$('#ns1blankspaceDetailsLegalNameUpdate').val($('#ns1blankspaceDetailsTradingNameUpdate').val());
					}

					// Validate that they've entered mandatory fields if new grower
					// v1.0.24 Was checking data-mandatory = true but it's equal to 1!
					// v1.0.26 now checks for data-id on mandatory combos
					$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
					{										
						if ($(this).val() === ''
				  			 	|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined)) 
						{
							// Find the caption first - either the data-caption attribute or whatever's left on the id after ns1blankspaceDetails
							var sCaption = $(this).attr('data-caption');
							if (sCaption === undefined) {
								sCaption = $(this).attr('id').substr('ns1blankspaceDetails'.length);
							}
							if (sCaption === undefined) { sCaption = $(this).attr('id');}

							ns1blankspace.status.message(sCaption + ' is mandatory.');
							$(this).focus();
							ns1blankspace.okToSave = false;
							return false;		// Discontinue the loop - check one at a time (for the time being)
						}
					});

					// Check if at least one Category selected 
					// 2.0.4h SUP021634 Now required Catrgory to be mandtory instead of setting to Fresh Produce if not selected
					if ($.grep($('.nsFreshcareProductGroup'), function(a) {return $(a).hasClass('nsFreshcareSelected')}).length === 0) 
					{
						ns1blankspace.status.message('You must choose at least one Category.');
						ns1blankspace.okToSave = false;
						return; 
					}

					// Check if at least one Certification Scope selected
					if ($.grep($('.nsFreshcareScope'), function(a) {return $(a).hasClass('nsFreshcareSelected')}).length === 0) 
					{
						ns1blankspace.status.message('You must choose at least one Certification Scope.');
						ns1blankspace.okToSave = false;
						return; 
					}

					// We also need to make sure the membership has been populated
					if (ns1blankspace.okToSave 
						&& ($('#ns1blankspaceDetailsMembershipUpdate').attr('data-id') === ''
							 || $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id') === undefined)) 
					{
							ns1blankspace.status.message('Training Package Membership has not been set. Please re-select Training Package.');
							ns1blankspace.okToSave = false;
							return false;		
					}
				}

				// Now check addresses
				if (ns1blankspace.okToSave) 
				{
					if ($('#ns1blankspaceMainAddress').html() === '') 
					{
						ns1blankspace.status.message('Please enter Address / Site information.');
						ns1blankspace.okToSave = false;
						return false;
					}
					else 
					{
						// Check mandatory address fields
						if (ns1blankspace.okToSave)
						{
							$.each($('#ns1blankspaceMainAddress input[data-mandatory]'), function()
							{
								if ($(this).val() === "")
								{
									ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
									$(this).focus();
									ns1blankspace.okToSave = false;
									return false;		// Discontinue the loop - check one at a time (for the time being)
								}
							});
						}
					}
				}

				if (ns1blankspace.okToSave)
				{
					oParam.step = 1;
					delete(oParam.validateSaveStep);
					nsFreshcare.trainer.grower.save.send(oParam);
				}
			}

		}, 

		send: 		function (oParam)
		{
			// Trainers can add new but all updates are emailed to Freshcare
			var sDataTrainee = ns1blankspace.util.getParam(oParam, 'dataTrainee', {'default': 'id='}).value
			var sDataProductGroups = ns1blankspace.util.getParam(oParam, 'dataProductGroups', {'default': ''}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var aScopeElements = ns1blankspace.util.getParam(oParam, 'dataScopeElements', {'default': []}).value;
			var iGrower = $.map($.grep(nsFreshcare.data.businessGroupGrowerText, function(x) {return x.title == 'Grower'}),
								function(y) {return y.id}).shift();


			if (oParam) {if (oParam.step === undefined) {oParam.step = 0;}}
			else {oParam = {step: 0}}

			if (oParam.step === 0)
			{
				nsFreshcare.data.saveError = [];
				nsFreshcare.trainer.grower.save.validate();
			}

			else if (oParam.step >= 1)
			{
				if (oParam.step === 1 && ns1blankspace.objectContext != -1) 	
				{
					// All UPDATES are sent via email...
					ns1blankspace.status.working('Collating email');
					if (ns1blankspace.okToSave) 
					{	
						// v3.1.0 SUP022053 don't save the email
						ns1blankspace.inputDetected = false;
						oRoot.external.grower.save.constructEmail({source: 'Trainer',
																		messageTo: nsFreshcare.data.emailToTrainer,
																		messageFrom: nsFreshcare.data.emailFromTrainer,
																		saveEmail: false,
																		onComplete: nsFreshcare.trainer.grower.search.send});
					}
					return;
				}
				else 	// A new trainee - add to AGRI_TEMP_TRAINEE
				{
					// Add trainee Business / person
					if (oParam.step === 1) 
					{
						ns1blankspace.status.working();
						if ($('#ns1blankspaceMainDetails').html() != '') 
						{
							sDataTrainee += '&membership=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMembershipUpdate').attr('data-id')); 
							sDataTrainee += '&codeofpractice=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMembershipUpdate').attr('data-COP')); 
							sDataTrainee += '&course=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTrainingCourseUpdate').attr('data-id')); 
							sDataTrainee += '&tradename=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTradingNameUpdate').val()); 
							sDataTrainee += '&businessname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsLegalNameUpdate').val());  
							sDataTrainee += '&abn=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsABNUpdate').val()); 
							sDataTrainee += '&firstname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFirstNameUpdate').val()); 
							sDataTrainee += '&surname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSurnameUpdate').val()); 
							sDataTrainee += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitleUpdate').attr('data-id')); 
							sDataTrainee += '&jobtitle=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPositionUpdate').val()); 
							sDataTrainee += '&gender=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsGenderUpdate').attr('data-id')); 
							sDataTrainee += '&phone=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPhoneUpdate').val()); 
							sDataTrainee += '&fax=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFaxUpdate').val()); 
							sDataTrainee += '&mobile=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMobileUpdate').val()); 
							sDataTrainee += '&email=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEmailUpdate').val()); 
							sDataTrainee += '&harvestmonth=' + ns1blankspace.util.fs(nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate'})); 
							sDataTrainee += '&joindate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTrainingDateUpdate').val()); 
							sDataTrainee += '&notes=' +  ns1blankspace.util.fs($('#ns1blankspaceDetailsNotesUpdate').val());
							
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
							sDataTrainee += '&crop=' + ns1blankspace.util.fs(sCrops);

							// Get the Scope data
							var aScopeElements = $('.nsFreshcareScope.nsFreshcareSelected');
							
							if (aScopeElements.length > 0) 
							{
								// v3.1.204 SUP023020 No longer used
								//sDataTrainee += '&category=' + ns1blankspace.util.fs($(aScopeElements).first().attr('data-groupid')); 
								aScopeElements = $.map(aScopeElements, function(x) 
														{
															var row =  
															{
																scope: x.id.split('_').pop(),
																scopetext: $(x).html(),
																object: (ns1blankspace.objectContext == -1 ? nsFreshcare.objectTmpTrainee : nsFreshcare.objectSubscription),
																objectcontext: (ns1blankspace.objectContext == -1 ? undefined : ns1blankspace.objectContext),
																id: (ns1blankspace.objectContext == -1 ? undefined : $('#nsFreshcareScopeList_' + x.id.split('_').pop()).attr('data-rowid'))
															}
															return row;
														});
							}

						}
						
						if ($('#ns1blankspaceMainAddress').html() != '') 
						{
							sDataTrainee += '&mailingaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress1').val()); 
							sDataTrainee += '&mailingaddress2=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress2').val()); 
							sDataTrainee += '&mailingsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingSuburb').val()); 
							sDataTrainee += '&mailingstate=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingState').val()); 
							sDataTrainee += '&mailingpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingPostCode').val()); 
							sDataTrainee += '&mailingcountry=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingCountry').val()); 

							sDataTrainee += '&address1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetAddress1').val()); 
							sDataTrainee += '&address2=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetAddress2').val()); 
							sDataTrainee += '&suburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetSuburb').val()); 
							sDataTrainee += '&state=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetState').val()); 
							sDataTrainee += '&postcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetPostCode').val()); 
							sDataTrainee += '&country=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetCountry').val()); 
						}

						oParam.dataScopeElements = aScopeElements;

						if (sDataTrainee != "") 
						{
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
								data: sDataTrainee,
								dataType: 'json',
								success: function(oResponse) 
								{ 
									if (oResponse.status === 'OK')
									{
										oParam.step = 2; 
										oParam.traineeID = oResponse.id
										ns1blankspace.status.message(nsFreshcare.data.growerText + ' details added.')
										nsFreshcare.trainer.grower.save.send(oParam); 
									}
									else
									{
										ns1blankspace.status.error(oResponse.error.errornotes);
									}
								}
							});
						}
						else
						{
							oParam.step = 2; 
							nsFreshcare.trainer.grower.save.process(oResponse, oParam); 
						}
					}

					// Now we have to add the Product Groups one by one
					else if (oParam.step === 2) 
					{
						var oRows;
						oParam.rowIndex = (oParam.rowIndex === undefined) ? 0 : oParam.rowIndex;
						
						oRows = $('.nsFreshcareProductGroup.nsFreshcareSelected');
						if (oParam.rowIndex < oRows.length)
						{
							// v2.0.4 SUP021383 Replaced 'Product Group' with 'Category'
							var oThisRow = oRows[oParam.rowIndex];
							var sDataProductGroups = 'productgroup=' + oThisRow.id.split('_')[1] + '&trainee=' + oParam.traineeID;
							oParam.updating = 'Category ' + $(oThisRow).html();
							
							//ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_PRODUCT_GROUP_MANAGE')
							$.ajax(
							{
								type: 'POST',
								url: '/rpc/agri/?method=AGRI_TEMP_TRAINEE_PRODUCT_GROUP_MANAGE',
								data: sDataProductGroups,
								dataType: 'json',
								success: function(oResponse) 
								{ 
									if (oResponse.status === 'OK')
									{
										oParam.step = 2;
										oParam.rowIndex ++;
										ns1blankspace.status.message(oParam.updating);
										nsFreshcare.trainer.grower.save.send(oParam); 
									}
									else
									{
										ns1blankspace.status.error(oResponse.error.errornotes);
									}
								}
							});
						}
						else
						{	
							oParam.step = 3;
							delete(oParam.rowIndex);
							nsFreshcare.trainer.grower.save.send(oParam); 
						}
					}

					// Add Scope data
					else if (oParam.step === 3)
					{
						var oRows = aScopeElements;
						oParam.rowIndex = (oParam.rowIndex === undefined) ? 0 : oParam.rowIndex;
						
						if (oParam.rowIndex < oRows.length)
						{
							var oDataScope = oRows[oParam.rowIndex];
							if (oDataScope.objectContext === undefined) {oDataScope.objectContext = oParam.traineeID}
							oParam.updating = 'Scope ' + oDataScope.scopetext;
							
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
								data: oDataScope,
								dataType: 'json',
								success: function(oResponse) 
								{ 
									if (oResponse.status === 'OK')
									{
										oParam.step = 3;
										oParam.rowIndex ++;
										ns1blankspace.status.message(oParam.updating);
										nsFreshcare.trainer.grower.save.send(oParam); 
									}
									else
									{
										ns1blankspace.status.error(oResponse.error.errornotes);
									}
								}
							});
						}
						else
						{	
							oParam.step = 10;
							delete(oParam.rowIndex);
							// 2.0.4h SUP021638 Added alert message.
							// v3.1.215 SUP023315 Added text to title and moved to step 3
							ns1blankspace.container.confirm(
							{
								html: 'The new grower will appear on your training course once approved by Freshcare.', 
								title: 'Please note:',
								buttons: 
								[
									{text: "OK",
										click: function() 
										{
											$(this).dialog('destroy');
											nsFreshcare.trainer.grower.save.send(oParam); 
										}
									}
								]
							});

						}
					}

					// Complete process and notify user
					else if (oParam.step === 10) 
					{
						if (ns1blankspace.data.grower.onCompleteSave)
						{
							var fOnCompleteSave = ns1blankspace.data.grower.onCompleteSave;
							var oOnCompleteSaveParam = ns1blankspace.data.grower.onCompleteSaveParam;
							delete(nsFreshcare.trainer.grower.onCompleteSave);
							delete(nsFreshcare.trainer.grower.onCompleteSaveParam);

							if ($.type(fOnCompleteSave) === 'function')
							{
								nsFreshcare.admin.trainingcourse.init({showHome: false});
								fOnCompleteSave(oOnCompleteSaveParam);
							}
						}
						else
						{
							nsFreshcare.trainer.grower.init();
							nsFreshcare.trainer.grower.home();
						}
					}
				}			
			}
		},

		process: 	function (oResponse, oParam)
		{	
			var bCallAgain = true;

			if (oParam) 
			{
				if (oParam.callAgain != undefined) {bCallAgain = oParam.callAgain;}
			}

			if (oResponse.status == 'OK')
			{
				ns1blankspace.inputDetected = false;
				ns1blankspace.status.message('New Trainee added');
				if (oParam.traineeID === undefined) 
				{
					oParam.traineeID = oResponse.id;
				}
			}
			else
			{
				nsFreshcare.data.saveError.push(['Error adding Trainee: ' + oResponse.error.errornotes]);
				ns1blankspace.status.error(oResponse.error.errornotes);
				ns1blankspace.okToSave = false;
			}

			if (bCallAgain) 
			{
				nsFreshcare.trainer.grower.save.send(oParam);
			}
		}
	}			
}							
