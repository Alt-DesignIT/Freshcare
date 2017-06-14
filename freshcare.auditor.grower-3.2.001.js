/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.auditor.grower = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'grower';
		ns1blankspace.objectParentName = 'auditor';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = nsFreshcare.data.growerText + 's';	
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		delete(nsFreshcare.admin.grower.data.newSiteCount);

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
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
			$('#ns1blankspaceControl').html('');		// v2.0.3b was not blanking this out after saving
			
			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
			oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename,contactbusiness.legalname' +
							',contactbusiness.agrisubscription.agricertificate.certificatenumber');
			oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.rows = 50;
			oSearch.sort('contactbusiness.modifieddate', 'desc');
			
			oSearch.getResults(function(oResponse) {nsFreshcare.auditor.grower.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">Click New to inform Freshcare of an unregistered Grower.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY UPDATED</td></tr>');		//v1.0.24
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Certificate</td>' +
								'<td class="ns1blankspaceCaption">Business</td>' +
								'<td class="ns1blankspaceCaption">Contact</td>' +
							'</tr>');

				// v3.1.0 Remove duplciates
				var iPreviousBusiness = '';
				$.each(oResponse.data.rows, function()
				{
					if (iPreviousBusiness != this.id)
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_certificate-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.agrisubscription.agricertificate.certificatenumber"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.tradename"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_name-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>' +
									'</tr>');
					}
					iPreviousBusiness = this.id;
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				oRoot = (oParam.rootNameSpace) ? oParam.rootNameSpace : nsFreshcare;
				oRoot.auditor.grower.search.send(event.target.id, {source: 1});
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
				
				// v2.0.4 SUP021367 Added person notes
				// v3.1.205 Added primarycontactperson filter - otherwise we get the wrong person!
				// v3.1.206 SUP023035 No longer searches for person mailing addresses abd searches for notes on business, not person
				var oSearch = new AdvancedSearch();		//
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.title' +
								',contactbusiness.contactperson.titletext,contactbusiness.contactperson.position,contactbusiness.contactperson.email' + 
								',contactbusiness.email,contactbusiness.faxnumber,contactbusiness.phonenumber' +
								',contactbusiness.contactperson.workphone,contactbusiness.contactperson.mobile,contactbusiness.contactperson.fax' + 
								',contactbusiness.contactperson.gender,contactbusiness.contactperson.gendertext,contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + ',contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 'text' + 
								',contactbusiness.mailingaddress1,contactbusiness.mailingaddress2,contactbusiness.mailingsuburb,contactbusiness.mailingstate,contactbusiness.mailingpostcode,contactbusiness.mailingcountry' +
								',contactbusiness.notes,contactbusiness.contactperson.preferredcommunication,contactbusiness.contactperson.preferredcommunicationtext' +
								',contactbusiness.contactperson.id,contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference' + 
								',contactbusiness.addresslink.address.address1,contactbusiness.addresslink.address.address2,contactbusiness.addresslink.address.addresssuburb' +
								',contactbusiness.addresslink.address.addressstate,contactbusiness.addresslink.address.addresspostcode,contactbusiness.addresslink.address.addresscountry' + 
								',contactbusiness.agribusiness.id,contactbusiness.primarycontactperson');

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.addFilter('contactbusiness.primarycontactperson', 'EQUAL_TO', 'field:contactbusiness.contactperson.id')
				oSearch.getResults(function(data) {nsFreshcare.auditor.grower.show(oParam, data)});
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
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					oSearch.addBracket("(");
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					oSearch.addOperator("or");
					oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
					oSearch.addBracket(")");
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.sort('contactbusiness.tradename', 'asc');
					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.auditor.grower.search.process(oParam, data)});
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
				//$(ns1blankspace.xhtml.container).hide();
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
										this["contactbusiness.tradename"] + ' ' + 
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
				
				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.auditor.grower.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'contactbusiness.tradename-space-contactbusiness.legalname-contactbusiness.contactperson.firstname-space-contactbusiness.contactperson.surname',
					more: oResponse.moreid,
					rows: 40,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.auditor.grower.search.send
				});   
				
			}	
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
							
			aHTML.push('<tr><td id="ns1blankspaceControlTrainer" class="ns1blankspaceControl">' +
							'Trainer</td></tr>');
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
		
			aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
							'Emails</td></tr>');

		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainContacts" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainTrainer" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.auditor.grower.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
			// if change here, change also in validate
			nsFreshcare.external.grower.details();
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress'});
			// if change here, change also in validate
			nsFreshcare.external.grower.address.show({step: 1});
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{
			// v3.1.205 SUP023021 Added Grower Contacts tab. Can set primary contacts
			ns1blankspace.show({selector: '#ns1blankspaceMainContacts', context: {inContext: false}});
			nsFreshcare.internal.entity.people.show(
				{
					primaryContact: ns1blankspace.objectContextData['contactbusiness.primarycontactperson'], 
					pageObject: 'grower',
					group: nsFreshcare.data.grower.categoryGrower,
					showGroups: false,
					showUsers: false,
					canAdd: true,
					canAddGroup: false,
					canRemove: true,
					canRemoveDirectly: false,
					canSetPrimary: true,
					canSetPrimaryDirectly: true,
					canUpdate: true,
					canUpdateDirectly: true
				});
		});
		
		$('#ns1blankspaceControlTrainer').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainTrainer'});
			nsFreshcare.auditor.grower.trainer();
		});
		
		$('#ns1blankspaceControlEmails').click(function(event)
		{
			var oFilters = [];

			oFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: '5'});
			
			if (nsFreshcare.data.switched != undefined && nsFreshcare.data.switched.id != undefined) {}
			else
			{
				oFilters.push({operation: 'addFilter', name: 'createduser', comparison: 'EQUAL_TO', value1: ns1blankspace.user.id});
			}

			oFilters.push({operation: 'addBracket', bracket: '('});

			oFilters.push({operation: 'addBracket', bracket: '('});
			oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectBusiness});
			oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
			oFilters.push({operation: 'addBracket', bracket: ')'});
			
			oFilters.push({operation: 'addOperator', operator: 'or'});
			oFilters.push({operation: 'addFilter', name: 'contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
			oFilters.push({operation: 'addBracket', bracket: ')'});

			ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});
			nsFreshcare.internal.entity.actions.show({filters: oFilters,
											 emailsOnly: true,
											 viewInTab: true,
											 xhtmlElementID: 'ns1blankspaceMainEmails',
											 functionRow: nsFreshcare.internal.entity.emails.row,
											 functionBind: nsFreshcare.internal.entity.emails.bind,
											 functionProcess: nsFreshcare.internal.entity.actions.process
											});
		});
		
	},

	show: 		function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;
		var oRoot = ns1blankspace.rootnamespace;

		if (oParam) {
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		if (iStep === 1) {
			nsFreshcare.auditor.grower.layout();
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
			if (iStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContext;
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactbusiness.tradename'];
				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['contactbusiness.contactperson.id'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'];
				
				$('#ns1blankspaceViewControlAction').button({disabled: false});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			
				oParam.step = 2;
				oParam.lastAudit = true;		// v1.0.26 required for memberships table
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.grower.show);
				oRoot.external.grower.memberships.search(oParam);
			}

			else if (iStep === 2) 
			{
				oParam.step = 3;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.grower.show);
				nsFreshcare.admin.grower.membership.layout(oParam);
				nsFreshcare.external.grower.trainers.search(oParam);
			}

			// v2.0.2 Changed from productGroups to growerSites as ProductGroups now at Membership level
			else if (iStep === 3) 
			{
				oParam.step = 4;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.grower.show);
				nsFreshcare.admin.grower.siteAddress.search(oParam);
			}

			else if (iStep === 4) 
			{
				oParam.step = 5;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.auditor.grower.show);
				nsFreshcare.person.groups.search(oParam);
			}

			else if (iStep === 5) 
			{
				oParam.step = 6;

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br />' + ns1blankspace.data.contactPersonText.formatXHTML());
				// v2.0.4 Removed search.send from newDestination and now passes object with id to init
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.auditor.grower.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.auditor.grower.summary()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this grower.</td></tr></table>');
					
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

			if (ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'] != '')
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
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) 
			{
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
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainers</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.trainers && ns1blankspace.objectContextData.trainers.length > 0) {
				// 
				var aValues = [];
				$.each(ns1blankspace.objectContextData.trainers, function() {
					aValues.push( this['contactbusiness.tradename'] );
				});
				aHTML.push(aValues.join('<br />'));
			} 
			else {
				aHTML.push('No Trainer assigned.')
			} 
			aHTML.push('</td></tr>');	
					

			// List Memberships
			// v1.0.26 added more columns and shaded expired certificates
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
					// v3.1.2 SUP022574 Added Audit Paid column
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
									(this['agrisubscription.agrilastaudit.paid'] == 'Y' ? 'Yes' : 'No') + '</td>');			
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricertificate.enddate'] + '</td>');			
					aHTML.push('</tr>');
				});
				/*.each(ns1blankspace.objectContextData.memberships, function() {
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

			
			// Check if we have any withdrawn memberships
			// Only show Register Audit button if we have at least 1 not-WD membership
			var aWithdrawnMemberships = $.grep(ns1blankspace.objectContextData.memberships
					, function(x) {return x['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD});

			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			if (aWithdrawnMemberships.length === 0
				|| (aWithdrawnMemberships.length > 0 && aWithdrawnMemberships.length < ns1blankspace.objectContextData.memberships.length))
			{
				aHTML.push('<tr><td><span id="ns1blankspaceGrowerRegisterAudit" class="ns1blankspaceAction">' +
							'Register Audit</span></td></tr>');
			}

			if (aWithdrawnMemberships.length > 0)
			{
				aHTML.push('<tr><td><span id="ns1blankspaceGrowerReinstateWithdrawn" class="ns1blankspaceAction">' +
							'Notify Freshcare to Reinstate</span></td></tr>');
			}

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			
			if (aWithdrawnMemberships.length === 0 
				|| (aWithdrawnMemberships.length > 0 && aWithdrawnMemberships.length < ns1blankspace.objectContextData.memberships.length))
			{

				$('#ns1blankspaceGrowerRegisterAudit').button(
				{
					label: 'Register Audit',
					icons:
					{
						primary: "ui-icon-clipboard"
					}
				})
				.click(function()
				{
					var oRoot = ns1blankspace.rootnamespace;
					oRoot.admin.audit.init(
					{
						contactBusiness: ns1blankspace.objectContext,
						contactPerson: ns1blankspace.data.contactPerson,
						contactBusinessText: ns1blankspace.data.contactBusinessText,
						contactPersonText: ns1blankspace.data.contactPersonText,
						"new": true
					});
				});
			}

			if (aWithdrawnMemberships.length > 0)
			{
				$('#ns1blankspaceGrowerReinstateWithdrawn').button(
				{
					label: 'Notify Freshcare to Reinstate',
					icons:
					{
						primary: "ui-icon-notice"
					}
				})
				.click(function()
				{

					var aHTML = [];

					// If more than one Withdrawn membership, let them select, otherwise, just send email
					if (aWithdrawnMemberships.length > 1) {

						if ($(ns1blankspace.xhtml.container).html() === '')
						{

							aHTML.push('<table class="ns1blankspaceSearchMedium">');
							$.each(aWithdrawnMemberships, function() {

								aHTML.push('<tr id="ns1blankspaceMembershipSearchRow_' + this.id + '">');
								aHTML.push('<td id="ns1blankspaceMembershipTitle_' + this.id + '" class="ns1blankspaceSearch">' + this['agrisubscription.membershiptext'] + '<td>');
								aHTML.push('</tr>');
							});
							aHTML.push('</table>');

							ns1blankspace.container.position({xhtmlElementID: this.id, topOffset: 10, setWidth: true});
							$(ns1blankspace.xhtml.container).show();
							$(ns1blankspace.xhtml.container).html(aHTML.join(''));

							$('td.ns1blankspaceSearch').click(function() 
							{
								var iMembership = this.id.split('_').pop();
								$(ns1blankspace.xhtml.container).html('');
								$(ns1blankspace.xhtml.container).hide();
								nsFreshcare.auditor.grower.reinstateWithdrawnMembership(
								{
									membershipText: $.map($.grep(aWithdrawnMemberships, function(x) {return x.id === iMembership})
													 , function(y) {return y['agrisubscription.membershiptext']}).shift(),
									contactBusiness: ns1blankspace.data.contactBusiness,
									contactBusinessText: ns1blankspace.data.contactBusinessText,
									contactPersonText: ns1blankspace.data.contactPersonText
								});
							});
						}
						else
						{
							$(ns1blankspace.xhtml.container).html('');
							$(ns1blankspace.xhtml.container).hide();
						}
					}
					else
					{
						nsFreshcare.auditor.grower.reinstateWithdrawnMembership(
						{
							membershipText: aWithdrawnMemberships['agrisubscription.membershiptext'],
							contactBusiness: ns1blankspace.data.contactBusiness,
							contactBusinessText: ns1blankspace.data.contactBusinessText,
							contactPersonText: ns1blankspace.data.contactPersonText
						});

					}

				});
			}

		}	
	},

	details: 	function() 
	{
		var oRoot = ns1blankspace.rootnamespace;
		oRoot.external.grower.details();
	},

	trainer: 	function ()
	{
		var aHTML = [];
		
		if ($('#ns1blankspaceMainTrainer').attr('data-loading') == '1') {
			$('#ns1blankspaceMainTrainer').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceTrainerColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceTrainerColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainTrainer').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			// v2.0.3c Now uses nsFreshcareSelectGrower to remove duplicates, plus added supplierstatus filtering
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Training Body' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceTrainerBusiness" class="nsFreshcareSelectGrower"' +
							' data-method="CONTACT_BUSINESS_SEARCH"' +
							' data-columns="tradename"' +
							' data-methodFilter="contactbusiness.tradename-TEXT_IS_LIKE|contactbusiness.legalname-TEXT_IS_LIKE|' +
												'contactbusiness.supplierstatus-EQUAL_TO-' + nsFreshcare.data.contactStatusActive + '|' +
												'contactbusiness.contactperson.persongroup-IN_LIST-' + nsFreshcare.data.groupTrainer.join(',') + '">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trainer' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceTrainerPerson" class="nsFreshcareSelectGrower"' +
							' data-method="CONTACT_PERSON_SEARCH"' +
							' data-columns="firstname-space-surname-space-openbracket-contactbusinesstext-closebracket"' +
							' data-parent="ns1blankspaceTrainerBusiness"' +
							' data-parent-search-id="contactbusiness"' +
							' data-parent-search-text="tradename"' +
							' data-methodFilter="contactperson.firstname-TEXT_IS_LIKE|contactperson.surname-TEXT_IS_LIKE|' +
												'contactperson.contactbusinesstext-TEXT_IS_LIKE|' +
												'contactperson.supplierstatus-EQUAL_TO-' + nsFreshcare.data.contactStatusActive + '|' +
												'contactperson.persongroup-IN_LIST-' + nsFreshcare.data.groupTrainer.join(',') + '"' +
							' data-click="nsFreshcare.auditor.grower.setTrainingBody">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Training Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceDate">' +
							'<input id="ns1blankspaceTrainerTrainingDate" class="ns1blankspaceDate">' +
							'</td></tr>');			

			$('#ns1blankspaceTrainerColumn1').html(aHTML.join(''));				

			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});
		}	
	},

	setTrainingBody: function()
	{
		if ($('#ns1blankspaceTrainerPerson').attr('data-id') != undefined && $('#ns1blankspaceTrainerBusiness').attr('data-id') === undefined)
		{
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			oSearch.addField('contactbusiness,contactbusinesstext');
			oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceTrainerPerson').attr('data-id'));
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status === 'OK')
				{
					$('#ns1blankspaceTrainerBusiness').attr('data-id', oResponse.data.rows[0].contactbusiness);
					$('#ns1blankspaceTrainerBusiness').val(oResponse.data.rows[0].contactbusinesstext);
				}
				else
				{
					$('#ns1blankspaceTrainerPerson').removeAttr('data-id');
					$('#ns1blankspaceTrainerBusiness').val('');
					ns1blankspace.status.error('Error setting Training Body. Please search for Trainer again.')
				}
			});
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
			var bRenderAudits = true;
			var bShowAuditRows = ns1blankspace.util.getParam(oParam, 'showAuditRows', {'default': true}).value;
			var bShowStatusRows = ns1blankspace.util.getParam(oParam, 'showStatusRows', {'default': true}).value;

			oParam.renderAudits = true;
			oParam.renderStatusTransactions = true;
			oParam.showAuditRows = bShowAuditRows;
			oParam.showStatusRows = bShowStatusRows;

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

	reinstateWithdrawnMembership: function(oParam)
	{
		var sMembershipText;
		var sContactBusiness;
		var sContactBusinessText;
		var sContactPersonText;
		var aHTML = [];

		if (oParam)
		{
			if (oParam.membershipText) {sMembershipText = oParam.membershipText;}
			if (oParam.contactBusiness) {sContactBusiness = oParam.contactBusiness}
			if (oParam.contactBusinessText) {sContactBusinessText = oParam.contactBusinessText}
			if (oParam.contactPersonText) {sContactPersonText = oParam.contactPersonText}
		}


		// Send an email to Freshcare to request that the grower's Membership Subscription be re-instated
		var sMessage = 'Grower: ' + sContactBusinessText + ', ' + sContactPersonText +
						'<br /><br />' +
						'Membership: ' + sMembershipText +
						'<br /><br />';

		nsFreshcare.external.grower.save.sendEmail({to: nsFreshcare.data.emailToAuditor,
											   subject: 'Certification Body ' + ns1blankspace.user.contactBusinessText + ' has requested a withdrawn grower be reinstated',
											   message: sMessage,
											   contactBusiness: sContactBusiness});
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
						}

						if ($('#ns1blankspaceMainAddress').html() == '')
						{
							$('#ns1blankspaceMainAddress').attr('data-loading', '1');
							nsFreshcare.external.grower.address.show({step: 1});
						}
					}

					if (oParam.membershipShowIndex < ns1blankspace.objectContextData.memberships.length)
					{
						if ($('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).html() == '')
						{
							oParam.onCompleteWhenCan = oParam.onComplete;
							oParam.onComplete = nsFreshcare.auditor.grower.save.validate;
							$('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).attr('data-loading', '1');
							oParam.membership = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id;
							oParam.membershipData = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex];
							oParam.membershipShowIndex += 1;
							nsFreshcare.auditor.grower.membership.show(oParam);
						}
						else
						{
							oParam.membershipShowIndex += 1;
							nsFreshcare.auditor.grower.save.validate(oParam);
						}
					}
					else
					{
						delete(oParam.membership);
						delete(oParam.membershipData);
						delete(oParam.membershipShowIndex);
						oParam.onComplete = oParam.functionSave;
						oParam.validateSaveStep = 2;
						nsFreshcare.auditor.grower.save.validate(oParam);
					}
				}

				// Now perform the validation
				else if (oParam.validateSaveStep === 2)
				{
					if ($('#ns1blankspaceMainDetails').html() != '') 
					{
						// v1.0.30 Now checks nsFreshcareSelected for scopes as line-through wasn't working
						// Check if at least one Scope selected
						if ($('.nsFreshcareScope.nsFreshcareSelected').length === 0) 
						{
							ns1blankspace.status.message('You must choose at least one Scope.');
							ns1blankspace.okToSave = false;
							return; 
						}

						// Validate madatory fields v2.0.21 Added
						if (ns1blankspace.okToSave) 
						{
							$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
							{										
								// v1.0.26 now validates data-id if combo
								if (($(this).val() === ''
					   					|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) {
									ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
									$(this).focus();
									ns1blankspace.okToSave = false;
									return false;
								}
							});
						}

						// Can't use data-mandatory checking above for radio controls so do it here
						if ($('input[name="radioSendPrintedCertificates"]:checked').val() === undefined) {

							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please indicate if printed Certificates are to be posted.');
							return;
						}

						// v3.1.0e Need to verify the email address
						if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsEmailUpdate').val() != '' && !nsFreshcare.util.validateEmail($('#ns1blankspaceDetailsEmailUpdate').val()))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please provide a valid email address for the Grower');
						}
					}

					if (ns1blankspace.okToSave && $('#ns1blankspaceMainAddress').html() != '') 
					{	// v2.0.21 Added
					
						if ($('#ns1blankspaceAddressManageContainer').is('*'))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please confirm or Cancel the changes to the Address before continuing');
							return false;
						}

						$('#ns1blankspaceMainAddress input[data-mandatory]').each(function() 
						{
							if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
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

						// v3.1.0 Now we need to make sure that if they're removing a site that it's not linked to a Membership
						$('#ns1blankspaceAddressRow2 .ns1blankspaceRowAddress').each(function()
						{
							var iAddressID = this.id.split('_').pop();
							if ($('#ns1blankspaceSiteValue_streetAddress1-' + iAddressID).css('text-decoration').indexOf('line-through') > -1)
							{
								$.each(ns1blankspace.objectContextData.memberships, function()
								{
									if ($.grep($('#ns1blankspaceMembership' + this.id + 'MembershipSiteUpdate .nsFreshcareSelected'), function(x)
										{
											return x.id.split('_').pop() == iAddressID;
										}).length > 0)
									{
										ns1blankspace.okToSave = false;
										nsFreshcare.external.grower.address.manageRow({xhtmlElementID: 'ns1blankspaceSiteChangeStatus-first_' + iAddressID});			
										ns1blankspace.status.message('An address you are trying to remove is linked to a Membership. Please remove it from the Membership first.');
										return false;
									}
								});
							}
						});
					}

					if (ns1blankspace.okToSave && ns1blankspace.objectContextData.memberships.length > 0)
					{
						$.each(ns1blankspace.objectContextData.memberships, function(x)
						{
							if ($('#ns1blankspaceMembership' + this.id).html() != '')
							{
								// v3.1.2 SUP022693 If Expiry month has changed, then must enter a reason. 
								// v3.1.201 SUP022970 Only applies if field is displayed
								if (ns1blankspace.okToSave && $('#ns1blankspaceMembership' + this.id + 'ExpiryMonthUpdate').is('*')
									&& this['agrisubscription.expirymonth'] != $('#ns1blankspaceMembership' + this.id + 'ExpiryMonthUpdate').attr('data-id'))
								{
									if ($('#ns1blankspaceMembership' + this.id + 'ExpiryChangeReason').val() == '')
									{
										ns1blankspace.status.message('Reason for changing Re-Certification Audit Due must be entered for Membership ' + this['agrisubscription.membershiptext']);
										ns1blankspace.okToSave = false;
										return false;
									}
									else if ($('input[name="radio' + this.id + 'UpdateCertificateExpiry"]:checked').val() == undefined)
									{
										ns1blankspace.status.message('You must indicate if the change to the Re-Certification Audit Due will apply to the current certificate for Membership ' + this['agrisubscription.membershiptext']);
										ns1blankspace.okToSave = false;
										return false;
									}
								}

								// v3.1.2 SUP022693 Must choose at least one Crop
								if (ns1blankspace.okToSave && $('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect').length === 0)
								{
									ns1blankspace.status.message('You must choose at least 1 crop for Membership ' + this['agrisubscription.membershiptext']);
									ns1blankspace.okToSave = false;
									return false;
								}
								
								// v3.1.2 SUP022744 Must add at least one scope value
								if (ns1blankspace.okToSave && $('#ns1blankspaceMembership' + this.id + 'ScopeUpdate .nsFreshcareSelected').length === 0)
								{
									ns1blankspace.status.message('You must choose at least 1 scope for Membership ' + this['agrisubscription.membershiptext']);
									ns1blankspace.okToSave = false;
									return false;
								}

								// Tick Fresh Produce or Wine grapes as applicable if no Product Groups selected 
								var iProductGroups = 0;
								if ($.grep($('#ns1blankspaceMainMembership' + this.id + ' .nsFreshcareProductGroup '), function(a) { return (!$(a).hasClass('nsFreshcareSelected'))}).length === 0) 
								{
									if (this.id != nsFreshcare.data.membershipWIN && this.id != nsFreshcare.data.membershipVIT)
									{
										nsFreshcare.external.grower.manageMultiRows('nsFreshcareProductGroup_' + nsFreshcare.data.grower.productGroupFreshProduce);
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
									ns1blankspace.status.message('You must choose at least 1 site for Membership ' + this['agrisubscription.membershiptext']);
									ns1blankspace.okToSave = false;
									return false;
								}
							}
						});
					}

					if (ns1blankspace.okToSave)
					{
						delete(oParam.validateSaveStep);
						oParam.step = 1;
						nsFreshcare.auditor.grower.save.send(oParam);
					}
				}
			}

			// Validate fields entered on new grower
			if (ns1blankspace.objectContext === -1) 
			{
				// Set defaults
				if ($('#ns1blankspaceDetailsLegalNameUpdate').val() == '' && $('#ns1blankspaceDetailsTradingNameUpdate').val() != '') 
				{
					$('#ns1blankspaceDetailsLegalNameUpdate').val($('#ns1blankspaceDetailsTradingNameUpdate').val());
				}

				// Validate that they've entered mandatory fields if new grower
				$('#ns1blankspaceMainDetails input[data-mandatory]').each( function() {

					if (($(this).attr('data-mandatory') === '1' && $(this).val() === '')
						|| ($(this).attr('data-method') && $(this).attr('data-id') === undefined)) 
					{
						// Find the caption first - either the data-caption attribute or whatever's left on the id after ns1blankspaceDetails
						var sCaption = $(this).attr('data-caption');
						if (sCaption === undefined) 
						{
							sCaption = $(this).attr('id').substr('ns1blankspaceDetails'.length);
						}
						if (sCaption === undefined) { sCaption = $(this).attr('id');}

						ns1blankspace.status.message(sCaption + ' is mandatory.');
						ns1blankspace.okToSave = false;
						return false;		// Discontinue the loop - check one at a time (for the time being)
					}
				});

				// v3.1.0e Need to verify the email address
				// v3.1.0g SUP022309 fixed ns1blankspaceDetailsEmailUPdate
				if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsEmailUpdate').val() != '' && !nsFreshcare.util.validateEmail($('#ns1blankspaceDetailsEmailUpdate').val()))
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Please provide a valid email address for the Grower');
				}

				if (ns1blankspace.okToSave && $('#ns1blankspaceMainTrainer').html() === '')
				{
					ns1blankspace.status.message('Please enter Trainer details');
					ns1blankspace.okToSave = false;
				}

				if (ns1blankspace.okToSave)
				{
					delete(oParam.validateSaveStep);
					oParam.step = 1;
					nsFreshcare.auditor.grower.save.send(oParam);
				}
			}
		}, 

		send: 		function (oParam, oResponse)
		{
			// Auditors have all changes emailed to Freshcare but can make direct updates to existing growers.
			var sDataPerson 			= '';
			var sDataBusiness 			= '';
			var sDataAgriBusiness 		= '';
			var aDataProductGroups 		= [];
			var aDataScopes 			= [];
			var aDataBusinessSites 		= [];
			var aDataMemberships 		= [];
			var aDataCertificates 		= [];
			var aDataMembershipSites 	= [];
			var aMessageHTML 			= [];
			//3.2.001 SUP022943 (tc) , new variables to store each data feild updated
			var aChangedFields 			= ns1blankspace.util.getParam(oParam, 'changedFields', {'default': []}).value;;
			var sChangedFieldsList 		= '';
			var bSiteAddressChanges		= 0 ; // 0 = false 1 = true

			if (oParam) 
			{
				 if (oParam.step === undefined) 	{oParam.step 			= 0;}
				 if (oParam.dataPerson) 			{sDataPerson 			= oParam.dataPerson;}
				 if (oParam.dataBusiness) 			{sDataBusiness 			= oParam.dataBusiness;}
				 if (oParam.dataAgriBusiness) 		{sDataAgriBusiness 		= oParam.dataAgriBusiness;}
				 if (oParam.dataProductGroups) 		{aDataProductGroups 	= oParam.dataProductGroups;}
				 if (oParam.dataScopes) 			{aDataScopes 			= oParam.dataScopes;}
				 if (oParam.dataBusinessSites)		{aDataBusinessSites 	= oParam.dataBusinessSites;}
				 if (oParam.dataMemberships) 		{aDataMemberships 		= oParam.dataMemberships;}
				 if (oParam.dataCertificates) 		{aDataCertificates 		= oParam.dataCertificates;}
				 if (oParam.dataMembershipSites) 	{aDataMembershipSites 	= oParam.dataMembershipSites;}
				 if (oParam.messageHTML) 			{aMessageHTML 			= oParam.messageHTML;}
				 if (oParam.changedFields) 			{aChangedFields 		= oParam.ChangedFields;}

			}
			else 
			{
				oParam = {
							step: 0,
						  	dataPerson: '',
						  	dataBusiness: '',
						  	dataAgriBusiness: '',
						  	dataProductGroups: [],
						  	dataScopes: [],
						  	dataBusinessSites: [],
						  	dataCertificates: [],
						  	dataMemberships: [],
						  	dataMembershipSites: [],
						  	messageHTML: [],
						  	changedFields: [],
						};
			}

			if (oParam.step === 0) 
			{
				nsFreshcare.auditor.grower.save.validate();
				nsFreshcare.data.saveError = [];
			}
			else if (oParam.step > 0) 
			{
				// we've just saved or are coming around to do a subsequent step
				if (oResponse) 
				{

					if (oResponse.status == 'OK')
					{
						ns1blankspace.status.message('Saved ' + oParam.updating);
					}
					else
					{
						nsFreshcare.data.saveError.push(['Error updating ' + oParam.updating + ': ' + oResponse.error.errornotes]);
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				}

				if (ns1blankspace.okToSave) 
				{
					if (oParam.step === 1) 
					{
						ns1blankspace.status.working();
						if ($('#ns1blankspaceMainDetails').html() != '') 
						{

							if (ns1blankspace.objectContext === -1) 
							{
								// New Grower - we just email these details
								
								if ($('#ns1blankspaceDetailsTradingNameUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Trading Name', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsTradingNameUpdate').val().formatXHTML(),
													freshcareUpdate: false}));
								}

								if ($('#ns1blankspaceDetailsLegalNameUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Legal Name', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsLegalNameUpdate').val().formatXHTML(),
													freshcareUpdate: false}));
								}

								if ($('#ns1blankspaceDetailsPositionUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Position', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsPositionUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsTitleUpdate').attr('data-id') != undefined) 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Title', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsTitleUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsGenderUpdate').attr('data-id') != undefined) 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Gender', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsGenderUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsFirstNameUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'First Name', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsFirstNameUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsSurnameUpdate').val() != '') 
								{
									// Updates to Surname aren't updated automatically - they are emailed and Freshcare performs the update
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Surname', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsSurnameUpdate').val().formatXHTML() }));
								}

								if ($('#ns1blankspaceDetailsPhoneUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Phone', 
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsPhoneUpdate').val().formatXHTML() }));
								}

								if ($('#ns1blankspaceDetailsMobileUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mobile',
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsMobileUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsEmailUpdate').val() != '') 
								{
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Email',
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsEmailUpdate').val().formatXHTML()}));
								}


							}
							else 
							{
								// Updating a Grower - combination of email and updates
								// v2.0.1 All updates are done direct but still emailed
								// v2.0.2 Sites, Product Groups, Membership Sites, Harvest Months and Crops moved to membership level

								if (nsFreshcare.user.role === 'admin' 
									&& $('#ns1blankspaceDetailsReferenceUpdate').val() != $('#ns1blankspaceDetailsReference').html().replace('&nbsp;','')) 
								{
									sDataBusiness += '&reference=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsReferenceUpdate').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Company Id',
																					 oldValue: ns1blankspace.objectContextData["contactperson.contactbusiness.reference"].formatXHTML(),
																					 newValue: $('#ns1blankspaceDetailsReferenceUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsTradingNameUpdate').val() != $('#ns1blankspaceDetailsTradingName').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Trading Name");
									sDataBusiness += '&tradename=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTradingNameUpdate').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Trading Name', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.tradename"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsTradingNameUpdate').val().formatXHTML(),
													freshcareUpdate: ((ns1blankspace.objectContext != -1) ? true : false)}));
								}

								if ($('#ns1blankspaceDetailsLegalNameUpdate').val() != $('#ns1blankspaceDetailsLegalName').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Legal Name");
									sDataBusiness += '&legalname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsLegalNameUpdate').val());  
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Legal Name', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.legalname"].formatXHTML()  : ''),
													newValue: $('#ns1blankspaceDetailsLegalNameUpdate').val().formatXHTML(),
													freshcareUpdate: ((ns1blankspace.objectContext != -1) ? true : false)}));
								}

								if ($('#ns1blankspaceDetailsABNUpdate').val() != $('#ns1blankspaceDetailsABN').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("ABN");
									sDataBusiness += '&abn=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsABNUpdate').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'ABN', 
													oldValue: ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML(),
													newValue: $('#ns1blankspaceDetailsABNUpdate').val().formatXHTML() }));
								}

								if ($('#ns1blankspaceDetailsPositionUpdate').val() != $('#ns1blankspaceDetailsPosition').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Position");
									sDataPerson += '&position=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPositionUpdate').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Position', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.position"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsPositionUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsTitleUpdate').attr('data-id') != $('#ns1blankspaceDetailsTitle').attr('data-id')) 
								{
									aChangedFields.push("Title");
									sDataPerson += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitleUpdate').attr('data-id')); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Title', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.titletext"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsTitleUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsGenderUpdate').attr('data-id') != $('#ns1blankspaceDetailsGender').attr('data-id')) 
								{
									aChangedFields.push("Gender");
									sDataPerson += '&gender=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsGenderUpdate').attr('data-id')); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Gender', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.gendertext"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsGenderUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsFirstNameUpdate').val() != $('#ns1blankspaceDetailsFirstName').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("First Name");
									sDataPerson += '&firstname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFirstNameUpdate').val()); 

									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'First Name', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.firstname"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsFirstNameUpdate').val().formatXHTML(),
													freshcareUpdate: ((ns1blankspace.objectContext != -1) ? true : false)}));
								}

								if ($('#ns1blankspaceDetailsSurnameUpdate').val() != $('#ns1blankspaceDetailsSurname').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Surname");
									sDataPerson += '&surname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSurnameUpdate').val()); 

									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Surname', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.surname"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsSurnameUpdate').val().formatXHTML(),
													freshcareUpdate: ((ns1blankspace.objectContext != -1) ? true : false) }));
								}

								if ($('#ns1blankspaceDetailsPhoneUpdate').val() != $('#ns1blankspaceDetailsPhone').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Phone");
									sDataPerson += '&phone=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPhoneUpdate').val()); 
								
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Phone', 
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsPhoneUpdate').val().formatXHTML() }));
								}

								if ($('#ns1blankspaceDetailsFaxUpdate').val() != $('#ns1blankspaceDetailsFax').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Fax");
									sDataPerson += '&fax=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFaxUpdate').val()); 
								
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Fax',
													oldValue: ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].formatXHTML(),
													newValue: $('#ns1blankspaceDetailsFaxUpdate').val().formatXHTML() }));
								}

								if ($('#ns1blankspaceDetailsMobileUpdate').val() != $('#ns1blankspaceDetailsMobile').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Mobile");
									sDataPerson += '&mobile=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMobileUpdate').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mobile',
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsMobileUpdate').val().formatXHTML()}));
								}

								if ($('#ns1blankspaceDetailsEmailUpdate').val() != $('#ns1blankspaceDetailsEmail').html().replace('&nbsp;','').formatXHTML()) 
								{
									aChangedFields.push("Email");
									sDataPerson += '&email=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEmailUpdate').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Email',
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.email"].formatXHTML() : ''),
													newValue: $('#ns1blankspaceDetailsEmailUpdate').val().formatXHTML()}));
								}

								if ($('input[name="radioSendPrintedCertificates"]:checked').val() != $('#ns1blankspaceDetailsSendPrintedCertificates').attr('data-id')) 
								{
									aChangedFields.push("Send Printed Certificates");
									sDataBusiness += '&se' + nsFreshcare.data.sendPrintedCertificatesId + '=' + ns1blankspace.util.fs($('input[name="radioSendPrintedCertificates"]:checked').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Send Printed Certificates?',
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId + "text"].formatXHTML() : ''),
													newValue: $('input[name="radioSendPrintedCertificates"]:checked').attr('data-text')}));
								}

								/*if ($('input[name="radioPreferredCommunication"]:checked').val() != $('#ns1blankspaceDetailsPreferredCommunication').attr('data-id')) 
								{
									sDataPerson += '&preferredcommunication=' + ns1blankspace.util.fs($('input[name="radioPreferredCommunication"]:checked').val()); 
									
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Preferred Communication Method',
													oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.contactperson.preferredcommunicationtext"].formatXHTML() : ''),
													newValue: $('input[name="radioPreferredCommunication"]:checked').attr('data-text')}));
								}*/

								// 2.0.4 SUP021367 Now updates existing notes - appends added details to the bottom and sends email
								if (ns1blankspace.objectContext != -1 && $('#ns1blankspaceDetailsNotesUpdate').val() != '') 
								{
									aChangedFields.push("Detail Notes");
									sDataBusiness += '&notes=' + ns1blankspace.util.fs(ns1blankspace.objectContextData['contactbusiness.notes'].formatXHTML() +
															   '\r\n' + $('#ns1blankspaceDetailsNotesUpdate').val());
									// Just send the new part in the email
									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Notes',
													oldValue: '',
													newValue: $('#ns1blankspaceDetailsNotesUpdate').val().formatXHTML(),
													freshcareUpdate: true }));
								}
							}
						}
						
						if ($('#ns1blankspaceMainAddress').html() != '') 
						{
							aChangedFields.push("Mailing Address");
							// v3.1.206 SUP023035 Now compares to business mailingaddress instead of person
							if ($('#ns1blankspaceAddressMailingAddress1Update').val() != ns1blankspace.objectContextData["contactbusiness.mailingaddress1"].formatXHTML()) 
							{
								sDataPerson += '&mailingaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress1Update').val()); 
								
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mailing Address 1',
												oldValue: ns1blankspace.objectContextData["contactbusiness.mailingaddress1"].formatXHTML(),
												newValue: $('#ns1blankspaceAddressMailingAddress1Update').val()}));
							}

							if ($('#ns1blankspaceAddressMailingAddress2Update').val() != ns1blankspace.objectContextData["contactbusiness.mailingaddress2"].formatXHTML()) 
							{
								sDataPerson += '&mailingaddress2=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress2Update').val()); 
								
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mailing Address 2',
												oldValue: ns1blankspace.objectContextData["contactbusiness.mailingaddress2"].formatXHTML(),
												newValue: $('#ns1blankspaceAddressMailingAddress2Update').val() }));
							}

							if ($('#ns1blankspaceAddressMailingSuburbUpdate').val() != ns1blankspace.objectContextData["contactbusiness.mailingsuburb"].formatXHTML()) 
							{
								sDataPerson += '&mailingsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingSuburbUpdate').val()); 
								
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mailing Suburb',
												oldValue: ns1blankspace.objectContextData["contactbusiness.mailingsuburb"].formatXHTML(),
												newValue: $('#ns1blankspaceAddressMailingSuburbUpdate').val()}));
							}

							if ($('#ns1blankspaceAddressMailingStateUpdate').val() != ns1blankspace.objectContextData["contactbusiness.mailingstate"].formatXHTML()) 
							{
								sDataPerson += '&mailingstate=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingStateUpdate').val()); 
								
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mailing State',
												oldValue: ns1blankspace.objectContextData["contactbusiness.mailingstate"].formatXHTML(),
												newValue: $('#ns1blankspaceAddressMailingStateUpdate').val()}));
							}

							if ($('#ns1blankspaceAddressMailingPostCodeUpdate').val() != ns1blankspace.objectContextData["contactbusiness.mailingpostcode"].formatXHTML()) 
							{
								sDataPerson += '&mailingpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingPostCodeUpdate').val()); 
								
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mailing Postcode',
												newValue: ns1blankspace.objectContextData["contactbusiness.mailingpostcode"].formatXHTML(),
												oldValue: $('#ns1blankspaceAddressMailingPostCodeUpdate').val()}));
							}

							if ($('#ns1blankspaceAddressMailingCountryUpdate').val() != ns1blankspace.objectContextData["contactbusiness.mailingcountry"].formatXHTML()) 
							{
								sDataPerson += '&mailingcountry=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingCountryUpdate').val()); 
								
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Mailing Country',
												oldValue: ns1blankspace.objectContextData["contactbusiness.mailingcountry"].formatXHTML(),
												newValue: $('#ns1blankspaceAddressMailingCountryUpdate').val()}));
							}

							
							// Site Addresses
							$('tr.ns1blankspaceRowAddress').each(function(index) 
							{

								var sFirstRowElement = $(this).children().first();
								var sAddressId = $(this).attr('id').split('_').pop();
								var sLinkId = $(sFirstRowElement).attr('data-linkid');
								var bChanged = false;
								var bRemoved = false;
								var bReactivate = false;
								var bNew = false;
								var bInactivate = false;
								
								var sNewAddress = '';
								var sOldAddress = '';
								var sNewStatus = '';

								sNewAddress = ($('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html() + ' ' +
											  $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html() + ' ' +
											  $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html() + ' ' +
											  $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html() + ' ' +
											  $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html()).formatXHTML();
								sNewStatus = $(this).attr('data-status');
								bRemoved = ($('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).css('text-decoration').indexOf('line-through') > -1);
								bNew = ($(this).attr('data-type') === 'new');

								if ($.trim(sNewAddress) != "") 
								{
									if (index === 0) 	// First one in the list - default address for the business also needs to be stored against ContactBusiness
									{
										// First, update the primary business and default site data
										var sOldAddress = ns1blankspace.objectContextData.sites[0].address1.formatXHTML() +  ' ' + 
														  ns1blankspace.objectContextData.sites[0].address2.formatXHTML() + ' ' + 
														  ns1blankspace.objectContextData.sites[0].addresssuburb.formatXHTML() +  ' ' + 
														  ns1blankspace.objectContextData.sites[0].addressstate.formatXHTML() + ' ' + 
														  ns1blankspace.objectContextData.sites[0].addresspostcode.formatXHTML();

										if (sNewAddress != sOldAddress) 
										{
											bSiteAddressChanges = 1;
											bChanged = true;
											sDataBusiness += '&streetaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html().formatXHTML());
											sDataBusiness += '&streetaddress2=' + ns1blankspace.util.fs($('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html().formatXHTML());
											sDataBusiness += '&streetsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html().formatXHTML());
											sDataBusiness += '&streetstate=' + ns1blankspace.util.fs($('#ns1blankspaceSiteValue_streetState-' + sAddressId).html().formatXHTML());
											sDataBusiness += '&streetpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html().formatXHTML());

											aDataBusinessSites.push({id: sAddressId,
																	 streetAddress1: $('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html().formatXHTML(),
																	 streetAddress2: $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html().formatXHTML(),
																	 streetSuburb: $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html().formatXHTML(),
																	 streetState: $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html().formatXHTML(),
																	 streetPostCode: $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html().formatXHTML(),
																	 status: '1',
																	 removed: bRemoved,
																	 'new': false
																	});
										}

									}
									else 
									{

										var oSite = $.grep(ns1blankspace.objectContextData.sites, function(a) { return a.id == sAddressId;}).shift();
										var sOldAddress = '';
										var sOldStatus = '';
										if (oSite) 
										{
											// This is an existing site we've updated
											var sOldAddress = oSite.address1.formatXHTML() +  ' ' + 
															  oSite.address2 .formatXHTML()+ ' ' + 
															  oSite.addresssuburb.formatXHTML() + ' ' + 
															  oSite.addressstate.formatXHTML() + ' ' + 
															  oSite.addresspostcode.formatXHTML();
											sOldStatus = oSite.status;
										}


										if (sNewAddress != sOldAddress || bRemoved || sOldStatus != sNewStatus) 
										{
											// Users can add, remove and update directly to Freshcare database
											// Email sent to Freshcare detailing all changes
											bChanged = true;
											bReactivate = (sOldStatus == '3' && sNewStatus != '3');
											bInactivate = (sOldStatus != '3' && sNewStatus === '3');

											aDataBusinessSites.push({id: (bNew ? '' : sAddressId),
																	 streetAddress1: $('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html().formatXHTML(),
																	 streetAddress2: $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html().formatXHTML(),
																	 streetSuburb: $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html().formatXHTML(),
																	 streetState: $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html().formatXHTML(),
																	 streetPostCode: $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html().formatXHTML(),
																	 removed: bRemoved,
																	 inactivate: bInactivate,
																	 reactivate: bReactivate,
																	 status: sNewStatus,
																	 'new': bNew
																	});
												
											if 		(bRemoved) 		{sNewAddress = "Site " + sOldAddress + " removed."; } 
											else if (bInactivate) 	{sNewAddress = "Site " + sOldAddress + " inactivated."; } 
											else if (bReactivate) 	{sOldAddress = "Site reactivated"; }
											else if (bNew) 			{sOldAddress = '[New Site added]'; }

											if ( bNew || bChanged || bRemoved || bReactivate || bInactivate ) 
											{
												bSiteAddressChanges = 1;
											}
										} 
									}

									if (bChanged) 
									{
										aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Site Address', 
												oldValue: sOldAddress , newValue: sNewAddress, freshcareUpdate: false }));
									}
								}		// New address is not blank
							});

							if (bSiteAddressChanges)
							{
								aChangedFields.push("Site Address Changes");
							}


						}


						// Trainer - New record only
						if ($('#ns1blankspaceMainTrainer').html() != '') 
						{

							if ($('#ns1blankspaceTrainerBusiness').val() != '') {
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Training Body',
												oldValue: '', newValue: $('#ns1blankspaceTrainerBusiness').val()}));
							}

							if ($('#ns1blankspaceTrainerPerson').val() != '') {
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Trainer',
											oldValue: '', newValue: $('#ns1blankspaceTrainerPerson').val()}));
							}

							if ($('#ns1blankspaceTrainerTrainingDate').val() != '') {
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Training Date',
											oldValue: '', newValue: $('#ns1blankspaceTrainerTrainingDate').val()}));
							}
						}

						// Memberships Loop through for each Membership if details have changed
						if (ns1blankspace.objectContext != -1)
						{
							$.each(ns1blankspace.objectContextData.memberships, function(index)
							{

								if ($('#ns1blankspaceMainMembership' + this.id).html() != '')
								{

									var iMembershipId = this.id;
									var sMembershipText = this['agrisubscription.membershiptext'];
									var sData = '';
									var aMembershipHTML = [];
									
									// v3.1.2 SUP022693 See if ExpiryMonth has changed and save reason as well. Not shown for all users so check first
									if ($('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').is('*')
										&& this['agrisubscription.expirymonth'] != $('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').attr('data-id'))
									{
										sData += '&expirymonth=' + $('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').attr('data-id') +
												 '&expirychangereason=' + ns1blankspace.util.fs($('#ns1blankspaceMembership' + iMembershipId + 'ExpiryChangeReason').val());
										
										aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{
											label: 'Expiry Month', 
											oldValue: this["agrisubscription.expirymonth"].formatXHTML(),
											newValue: $('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').val().formatXHTML() + 
													'<br /><strong>Reason for changing: </strong>' +
														$('#ns1blankspaceMembership' + iMembershipId + 'ExpiryChangeReason').val().formatXHTML()
										}));

										// v3.1.2 SUP022882 If user has specified that expiry date of current cert must change as a result, re-calculate expiry date
										if ($('input[name="radio' + iMembershipId + 'UpdateCertificateExpiry"]:checked').val() == 'Y')
										{
											aDataCertificates.push(
											{
												data: 'id=' + this['agrisubscription.agricertificate.id'] +
													 '&enddate=' + nsFreshcare.admin.certificate.certificateGetExpiry(
																{
																	auditDate: new Date(this['agrisubscription.agricertificate.audit.actualdate']),
																	expiry: new Date(this['agrisubscription.agricertificate.audit.actualdate']),
																	expiryMonths: (this['agrisubscription.agricodeofpractice.auditdueafter'] != '' ? parseInt(this['agrisubscription.agricodeofpractice.auditdueafter']) : '0'),
																	expiryAnniversary: ($('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').attr('data-id') != undefined ? parseInt($('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').attr('data-id')) : 0)
																}).toString('dd MMM yyyy')
											});
										}
									}


									var sCropsAfter = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
																function(x) {return $(x).html();}
																		).join(', ');

									// v2.0.3d Need to make sure we catch sceanrio where crops set to Wine Grapes
									sCropsAfter = (this['agrisubscription.membership'] === nsFreshcare.data.membershipWIN || this['agrisubscription.membership'] === nsFreshcare.data.membershipVIT)
													? 'Wine Grapes'
													: sCropsAfter;

									if (sCropsAfter != this['agrisubscription.crop'].formatXHTML()) 
									{
										aChangedFields.push("Crops");
										// We want to store and email the sorted values, displaying erroroneous values where applicable
										var aCropsSorted = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
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

										
										sData += '&crop=' + ns1blankspace.util.fs(((sCropsAfter === 'Wine Grapes') 
																					? sCropsAfter 
																					: $.map(aCropsSorted, function(x) {return x.value}).join(', '))); 
										
										aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Crops', 
														oldValue: this["agrisubscription.crop"].formatXHTML(),
														newValue: ((sCropsAfter === 'Wine Grapes') ? sCropsAfter : $.map(aCropsSorted, function(x) {return x.html}).join(', ').formatXHTML() )}
														));
									}

									if (nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembership' + iMembershipId + 'HarvestMonthsUpdate'}) 
										!= nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembership' + iMembershipId + 'HarvestMonths'})) 
									{
										aChangedFields.push("Harvest Months");
										sData += '&harvestmonth=' + ns1blankspace.util.fs(nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembership' + iMembershipId + 'HarvestMonthsUpdate'})); 
										
										aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Harvest Months',
														oldValue: this["agrisubscription.harvestmonth"].formatXHTML(),
														newValue: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembership' + iMembershipId + 'HarvestMonthsUpdate'}).formatXHTML()}));
									}

									if (sData != '')
									{
										aDataMemberships.push({id: iMembershipId,
																membershipText: sMembershipText,
																data: 'id=' + iMembershipId + sData});
									}

									// Get the list of Scopes before and after the changes. For after - we only want those that don't have a strikethrough
									// v3.1.2 SUP022744 Moved from Details tab
									var sScopesBefore = ($.map(ns1blankspace.objectContextData.memberships[index].scopeValues, function (a) {return a.scopetext.formatXHTML()})).join(', ');
									var sScopesAfter = ($.map($.grep($('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareScopeList'), 
																function(a) {return ($(a).css('text-decoration').indexOf('line-through') === -1)}), 
																	function(b) {return $(b).html().replace('<br>','')})
																	).join(', ');
									
									if (sScopesBefore != sScopesAfter) {

										aChangedFields.push("Certificate Scope");
										$('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareScopeList').each(function() 
										{
											if ($(this).attr('data-rowID') && $(this).attr('data-rowID') != '') {

												if ($(this).css('text-decoration').indexOf('line-through') > -1) {
													// We want to remove this row
													aDataScopes.push({data: 'id=' + $(this).attr('data-rowID') + '&remove=1',
																		  value: $(this).html().replace('<br>', '')});
												}
											}
											else 
											{	// If new, add it
												aDataScopes.push({	data: 'object=' + nsFreshcare.objectSubscription +
																	  '&objectcontext=' + iMembershipId +
																	  '&scope=' + $(this).attr('id').split('_').pop(),
																	value: $(this).html().replace('<br>', '')});
											}
										});
										
										aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Certificate Scope',
													oldValue: sScopesBefore, 
													newValue: sScopesAfter,
													freshcareUpdate: true}));
									}

									// Get the list of Product Groups before and after the changes.
									// Added formatXHTML()
									var sProductGroupsBefore = ($.map(ns1blankspace.objectContextData.memberships[index].productGroups, function (a) {return a.productcategorytext.formatXHTML()})).join(', ');
									var sProductGroupsAfter = ($.map($.grep($('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareProductGroupList'), 
																		function (a) {return $(a).css('text-decoration').indexOf('line-through') == -1}), 
																	function(b) {return $(b).html().replace('<br>','')}))
																.join(', ');
									if (sProductGroupsBefore != sProductGroupsAfter) 
									{
										aChangedFields.push("Product Category");
										$('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareProductGroupList').each(function() 
										{
											// If existing, see if we need to remove it
											if ($(this).attr('data-rowID') && $(this).attr('rowID') != '') 
											{

												if ($(this).css('text-decoration').indexOf('line-through') > -1) 
												{
													// We want to remove this row
													aDataProductGroups.push({data: 'id=' + $(this).attr('data-rowID') + '&remove=1',
																			 value: $(this).html().replace('<br>', '')});
												}
											}
											else 
											{	// If new, add it
												
												aDataProductGroups.push({data: 'subscription=' + iMembershipId +
																	  '&productcategory=' + $(this).attr('id').split('_').pop(),
																	   value: $(this).html().replace('<br>', '')});
											}
										});
										
										aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Category', 
															oldValue: sProductGroupsBefore, 
															newValue: sProductGroupsAfter}));
									}

									// Get the list of Membership Sites before and after the changes.
									// v2.0.3 added formatXHTML()
									var sMembershipSitesBefore = ($.map(ns1blankspace.objectContextData.memberships[index].membershipSites, function (a) 
																	{
																		return (a.address1 + ((a.address2) ? ' ' + a.address2 : '') + ' ' + a.addresssuburb + ' ' + a.addressstate + ' ' + a.addresspostcode).formatXHTML();
																	})
																 ).join('<br />');
									//
									var sMembershipSitesAfter = ($.map($.grep($('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareMembershipSiteList'), function (a) 
																	{
																		return $(a).css('text-decoration').indexOf('line-through') == -1}
																	), 
																	function(b) 
																	{return $(b).html().replace('<br>','').formatXHTML()})
																).join('<br />');
									
									if (sMembershipSitesBefore != sMembershipSitesAfter) 
									{
										aChangedFields.push("Membership Sites");
										$('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareMembershipSiteList').each(function() 
										{
											// If existing, see if we need to remove it
											if ($(this).attr('data-rowID') && $(this).attr('rowID') != '') 
											{

												if ($(this).css('text-decoration').indexOf('line-through') > -1) 
												{
													// We want to remove this row
													aDataMembershipSites.push({data: 'id=' + $(this).attr('data-rowID') + '&remove=1',
																			 value: $(this).html().replace('<br>', '')});
												}
											}
											else 
											{	// If new, add it
												
												aDataMembershipSites.push({data: 'objectcontext=' + iMembershipId +
																	  '&object=' + nsFreshcare.objectSubscription + 
																	  '&address=' + $(this).attr('id').split('_').pop(),
																	   value: $(this).html().replace('<br>', '')});
											}
										});
										
										aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Membership\'s Sites', 
													oldValue: sMembershipSitesBefore, 
													newValue: sMembershipSitesAfter}));
									}
									// If any changes to the membership area, add text to aMessageHTML
									if (aMembershipHTML.length > 0)
									{
										aMembershipHTML.unshift('<tr><td colspan="3">&nbsp;</td></tr>' +
																'<tr><td colspan="3"><strong>Changes to ' + this['agrisubscription.membershiptext'] + ' Membership:</strong></td></tr>');
										aMessageHTML.push(aMembershipHTML.join(''));
									}

									// v3.1.2 SUP022693 Notify user if they've updated Scope, Crops, Sites or Category and most recent audit is scopeExtension 
									if (this['agrisubscription.agrilastaudit.type'] == nsFreshcare.data.audit.typeScopeExtension && 
										(this['agrisubscription.crop'] != sCropsAfter
											|| aDataScopes.length > 0 || aDataProductGroups.length > 0 || aDataMembershipSites.length > 0))
									{
										ns1blankspace.container.confirm({title: 'Membership Scope changed!', 
																		 html: 'You have changed the scope of the ' + this['agrisubscription.membershiptext'] + ' membership.<br /><br />' +
																					'Please note that the most recent audit for this membership, dated ' + this['agrisubscription.agrilastaudit.actualdate'] +
																					', is a Scope Extension audit.<br /><br />' +
																					'Please check the Scope Extension tab on this Audit to ensure the certificate remains current.'});
									}
								}
							});
						}

						oParam.dataPerson 			= sDataPerson;
						oParam.dataBusiness 		= sDataBusiness;
						oParam.dataAgriBusiness 	= sDataAgriBusiness;
						oParam.dataProductGroups 	= aDataProductGroups;
						oParam.dataScopes 			= aDataScopes;
						oParam.dataBusinessSites 	= aDataBusinessSites;
						oParam.dataMemberships 		= aDataMemberships;
						oParam.dataMembershipSites 	= aDataMembershipSites;
						oParam.dataCertificates 	= aDataCertificates;
						oParam.messageHTML 			= aMessageHTML;
						oParam.changedFields 		= aChangedFields.join(', ');
						oParam.step = (ns1blankspace.objectContext == -1) ? 10 : 2;

					}
						
					// We only do a post if we're updating - otherwise we're just sending an email
					if (ns1blankspace.objectContext != -1 && oParam.step < 10) 
					{

						// Contact Person data
						if (oParam.step === 2) 
						{

							if (sDataPerson != '') 
							{
								oParam.updating = 'Person';

								sDataPerson = 'id=' + ns1blankspace.data.contactPerson + sDataPerson;
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('CONTACT_PERSON_MANAGE'),
									data: sDataPerson,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											oParam.step = 3;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 3;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

						// Contact Business data
						else if (oParam.step === 3) 
						{

							if (sDataBusiness != '') 
							{
								oParam.updating = 'Business';
								sDataBusiness = 'id=' + ns1blankspace.objectContext  + sDataBusiness;
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
									data: sDataBusiness,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											oParam.step = 4;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 4;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

						// Business sites
						else if (oParam.step === 4)
						{
							if (aDataBusinessSites.length > 0)
							{
								// v2.0.4 SUP021404 Changed oParam.removed to removeType: 3 = inactivate, 4 = remove, -1 = neither
								var aThisSite = aDataBusinessSites[0];
								oParam.removeType = (aThisSite.removed) ? 4 : ((aThisSite.inactivated) ? 3 : -1);
								oParam.increment = false;

								// Each row contains the data required for each CORE_LOCATION_ADDRESS_MANAGE call
								var sDataBusinessSites = 'id=';

								if (oParam.removeType > 0)
								{	// Remove / Inactivate the site
									sDataBusinessSites += aThisSite.id + 
														 ((oParam.removeType === 3) 
															? '&status=3' 
															: '&remove=1');
								}
								else 
								{	// Add / Update the Site
									if (!aThisSite['new'])
									{
										sDataBusinessSites += aThisSite.id;
									}
									else
									{
										oParam.newSite = true;
									}

									sDataBusinessSites += '&address1=' + ns1blankspace.util.fs(aThisSite.streetAddress1) +
														'&address2=' + ns1blankspace.util.fs(aThisSite.streetAddress2) +
														'&addresssuburb=' + ns1blankspace.util.fs(aThisSite.streetSuburb) +
														'&addressstate=' + ns1blankspace.util.fs(aThisSite.streetState) +
														'&addresspostcode=' + ns1blankspace.util.fs(aThisSite.streetPostCode) +
														'&addresscountry=Australia' +
														'&status=' + ns1blankspace.util.fs(aThisSite.status);
								}

								oParam.updating = 'Site ' + aThisSite.streetSuburb;
								
								aDataBusinessSites.shift();
								oParam = ns1blankspace.util.setParam(oParam, 'dataBusinessSites', aDataBusinessSites);
								if (aDataBusinessSites.length === 0) 
								{
									oParam.increment = true; 
								}

								// Only call _MANAGE if we're not removing as we have to remove links first
								if (oParam.removeType != 4)
								{
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_MANAGE'),
										data: sDataBusinessSites,
										dataType: 'json',
										success: function(oResponse) 
										{
											if (oResponse.status === 'OK')
											{
												// Now create link to Business if new Site
												if (oParam.newSite != undefined && oParam.newSite)
												{
													var sData = 'objectcontext=' + ns1blankspace.objectContext +
																'&object=' + nsFreshcare.objectBusiness + 
																'&address=' + oResponse.id;

													delete(oParam.newSite);

													$.ajax(
													{
														type: 'POST',
														url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
														data: sData,
														dataType: 'JSON',
														success: function(oResponse)
														{
															if (oResponse.status === 'OK')
															{
																if (oParam.increment) {oParam.step = 5;}
																nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
															}
															else
															{
																ns1blankspace.status.error(oResponse.error.errornotes);
																oParam.step = 10;
																nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
															}
														}
													});
												}
												
												// Remove the link to the site and any links on the Memberships if it's been removed
												else if (oParam.removeType == 3)
												{
													oParam.address = oResponse.id;
													if (oParam.increment) {oParam.step = 5;}
													
													oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.auditor.grower.save.send);
													nsFreshcare.admin.grower.siteAddress.remove(oParam);

												}
												else		// No need to create link, just continue
												{
													if (oParam.increment) {oParam.step = 5;}
													nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
												}

											}
											else
											{
												ns1blankspace.status.error(oResponse.error.errornotes);
												oParam.step = 10;
												nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
											}
										}
									});
								}
								else
								{
									oParam.address = aThisSite.id;
									if (oParam.increment) {oParam.step = 5;}

									oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.auditor.grower.save.send);
									nsFreshcare.admin.grower.siteAddress.remove(oParam);
								}

							}
							else
							{
								oParam.step = 5;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

						// AgriSubscription Data
						else if (oParam.step === 5) 
						{
							if (aDataMemberships.length > 0) 
							{
								var aThisMembership = aDataMemberships[0];
								oParam.increment = false;

								// Each row contains the data payload for each AGRI_SUBSCRIPTION_MANAGE call already formatted
								var sDataMemberships = aThisMembership.data;
								oParam.updating = 'Membership ' + aThisMembership.membershipText;
								
								aDataMemberships.shift();
								oParam = ns1blankspace.util.setParam(oParam, 'dataMemberships', aDataMemberships);
								if (aDataMemberships.length === 0) {
									oParam.increment = true; 
								}

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
									data: sDataMemberships,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											if (oParam.increment) {oParam.step = 6;}
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 6;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

						// Product Groups
						else if (oParam.step === 6)
						{

							if (aDataProductGroups.length > 0) 
							{
								var aThisProductGroup = aDataProductGroups[0];
								oParam.increment = false;

								// Each row contains the data payload for each AGRI_PRODUCT_GROUP_MANAGE call already formatted
								var sDataProductGroups = aThisProductGroup.data;
								oParam.updating = 'Product Group ' + aThisProductGroup.value;
								
								aDataProductGroups.shift();
								oParam = ns1blankspace.util.setParam(oParam, 'dataProductGroups', aDataProductGroups);
								if (aDataProductGroups.length === 0) {
									oParam.increment = true; 
								}

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_PRODUCT_GROUP_MANAGE'),
									data: sDataProductGroups,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											if (oParam.increment) {oParam.step = 7;}
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 7;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

						// Scope (Person Groups)
						else if (oParam.step === 7) 
						{

							if (aDataScopes.length > 0) 
							{
								oParam.increment = false;
								var aThisScope = aDataScopes[0];

								// v3.1.2 SUP022744 Changed from PERSONGRUP_MANAGe
								// Each row contains the data payload for each AGRI_OBJECT_SCOPE_MANAGE call already formatted
								var sDataScopes = aThisScope.data;
								oParam.updating = 'Certificate Scope ' + aThisScope.value;

								aDataScopes.shift();
								oParam = ns1blankspace.util.setParam(oParam, 'dataScopes', aDataScopes);
								if (aDataScopes.length == 0) {
									oParam.increment = true; 
								}

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
									data: sDataScopes,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											if (oParam.increment) {oParam.step = 8;}
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 8;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

						// Certificate data
						else if (oParam.step === 8)
						{
							if (aDataCertificates.length > 0) 
							{
								oParam.increment = false;
								var oThisCertificate = aDataCertificates[0];

								// Each row contains the data payload for each AGRI_CERTIFICATE_MANAGE call already formatted
								var sDataCertificates = oThisCertificate.data;
								oParam.updating = 'CB Certificate Number for ' + oThisCertificate.membershipText;

								aDataCertificates.shift();
								oParam = ns1blankspace.util.setParam(oParam, 'dataCertificates', aDataCertificates);
								if (aDataCertificates.length == 0) {
									oParam.increment = undefined; 
								}

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
									data: sDataCertificates,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											if (oParam.increment) {oParam.step = 9;}
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 9;
								nsFreshcare.auditor.grower.save.send(oParam);
							}

						}

						// Membership Sites data
						else if (oParam.step === 9)
						{
							if (aDataMembershipSites.length > 0) 
							{
								var aThisMembershipSite = aDataMembershipSites[0];
								oParam.increment = false;

								// Each row contains the data payload for each CORE_LOCATION_ADDRESS_LINK_MANAGE call already formatted
								var sDataMembershipSites = aThisMembershipSite.data;
								oParam.updating = 'Membership Site ' + aThisMembershipSite.value;
								
								aDataMembershipSites.shift();
								oParam = ns1blankspace.util.setParam(oParam, 'dataMembershipSites', aDataMembershipSites);
								if (aDataMembershipSites.length === 0) {
									oParam.increment = true; 
								}

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
									data: sDataMembershipSites,
									dataType: 'json',
									success: function(oResponse) 
									{
										if (oResponse.status === 'OK')
										{
											if (oParam.increment) {oParam.step = 10;}
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 

										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
											oParam.step = 10;
											nsFreshcare.auditor.grower.save.send(oParam, oResponse); 
										}
									}
								});
							}
							else 
							{ 
								oParam.step = 10;
								nsFreshcare.auditor.grower.save.send(oParam);
							}
						}

					}		
					
					// We're just emailing - go straight to step 10
					else if (ns1blankspace.objectContext === -1 && oParam.step <= 2)
					{
						oParam.step = 10;
						nsFreshcare.auditor.grower.save.send(oParam); 
					}

					// Send the email to Freshcare to indicate what's changed. Make sure we tell them if any errors have occurred
					else if (oParam.step === 10 && aMessageHTML.length > 0) 
					{
						// v3.1.0e SUP021974 Removed email that sent invalid crops notification as it now comes up when creating certs
						//var sSubject = 'Certification Body ' + ns1blankspace.user.contactBusinessText.formatXHTML() + ' has ' + 
						//				((ns1blankspace.objectContext == -1) 
						//					? 'added a notification of an unregistered grower.' 
						//					: 'updated grower ' + ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML()) ;

						// v3.2.001 SUP022943
						sChangedFieldsList	= 	oParam.changedFields;
						var sSubject 		= 	'CB Update : [Fields Updated] ' +  sChangedFieldsList;
						delete(oParam.step);
						delete(oParam.increment);
						delete(oParam.dataPerson);
						delete(oParam.dataBusiness);
						delete(oParam.dataAgriBusiness);
						delete(oParam.dataProductGroups);
						delete(oParam.dataScopes);
						delete(oParam.dataBusinessSites);
						delete(oParam.dataMemberships);
						delete(oParam.dataMembershipSites);
						delete(oParam.dataCertificates);
						delete(oParam.changedFields);
						ns1blankspace.inputDetected = false;		// v1.0.21 Was assuming edits had not been saved.

						var oEmailParam = {
											updateRows: aMessageHTML,
											subject: 	sSubject,
											to: 		nsFreshcare.data.emailToAuditor,
											from: 		ns1blankspace.user.email
										}
						// v3.1.0b Since now using rpc messaging, need to send from verified account if switched-in
						if (nsFreshcare.data.switched && nsFreshcare.data.switched.id != undefined) {oEmailParam.from = nsFreshcare.data.emailFromAuditor};

						if (ns1blankspace.objectContext != -1) 
						{
							oEmailParam.onComplete = nsFreshcare.auditor.grower.search.send;
						}
						else
						{
							oEmailParam.onComplete = nsFreshcare.auditor.grower.home;	
						}
						
						nsFreshcare.external.grower.save.sendEmail(oEmailParam);
					}
					else 
					{
						ns1blankspace.status.message('No updates made');
					}
				}
				
			}
		},

		process: 	function (oResponse, oParam)
		{	
			var bCallAgain = true;

			if (oParam) {
				if (oParam.callAgain != undefined) {bCallAgain = oParam.callAgain;}
			}

			if (oResponse.status == 'OK')
			{
				ns1blankspace.inputDetected = false;
				ns1blankspace.status.message('Saved');
			}
			else
			{
				nsFreshcare.data.saveError.push(['Error updating ' + oParam.updating + ': ' + oResponse.error.errornotes]);
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
			
			if (bCallAgain) {
				nsFreshcare.auditor.grower.save.send(oParam);
			}
		}
	}
}							
