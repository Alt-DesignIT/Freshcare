/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

 // v3.1.0 Now refers to stored id of structure fields, not reference
 // v3.1.210 replaced all dialog('close') with dialog('destroy')

nsFreshcare.external.freshcareprofile = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 32;	
		ns1blankspace.objectName = 'freshcareprofile';
		ns1blankspace.objectParentName = 'external';
		ns1blankspace.objectMethod = 'CONTACT_PERSON';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Freshcare Profile';	
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;

		nsFreshcare.external.freshcareprofile.data = {};

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
		
		ns1blankspace.app.context({new: true, actionOptions: true, inContext: false});
	},

	home: 		function (oParam, oResponse)
	{
		nsFreshcare.external.freshcareprofile.search.send('-' + ns1blankspace.user.contactPerson);
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
				
				// v3.1.1 SUP022434 Added contactperson.reference
				// v3.1.206 SUP023035 Now looks at business mailing address
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_PERSON_SEARCH';
				oSearch.addField('contactperson.firstname,contactperson.surname,contactperson.title,contactperson.titletext,contactperson.position,contactperson.reference' +
								',contactperson.email,contactperson.workphone,contactperson.mobile,contactperson.fax,contactperson.gender,contactperson.gendertext' + 
								',contactperson.contactbusiness.mailingaddress1,contactperson.contactbusiness.mailingaddress2,contactperson.contactbusiness.mailingsuburb' +
								',contactperson.contactbusiness.mailingstate,contactperson.contactbusiness.mailingpostcode,contactperson.contactbusiness.mailingcountry,contactperson.notes' +
								',contactperson.preferredcommunicationtext,contactperson.preferredcommunication,contactperson.contactbusiness' + 
								',contactperson.contactbusiness.tradename,contactperson.contactbusiness.legalname,contactperson.contactbusiness.abn' + 
								',contactperson.contactbusiness.streetaddress1,contactperson.contactbusiness.streetaddress2' + 
								',contactperson.contactbusiness.streetsuburb,contactperson.contactbusiness.streetstate' + 
								',contactperson.contactbusiness.streetpostcode,contactperson.contactbusiness.streetcountry' + 
								',contactperson.contactbusiness.reference,contactperson.displayphone,contactperson.displaymobile' +
								',contactperson.contactbusiness.se' + nsFreshcare.data.selfCertificationDateId +
								',contactperson.contactbusiness.se' + nsFreshcare.data.jasanzDateId +  
								',contactperson.contactbusiness.se' + nsFreshcare.data.certificationBodyNumberId);
				oSearch.addFilter('contactperson.contactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.external.freshcareprofile.show(oParam, data)});
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
					oSearch.method = 'CONTACT_PERSON_SEARCH';
					oSearch.addField('contactperson.firstname,contactperson.surname,contactperson.supplierstatus,contactperson.customerstatus');
					oSearch.addFilter('contactperson.contactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
					
					oSearch.addBracket("(");
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						if (sSearchText != "ALL") {
							oSearch.addFilter('contactperson.firstname', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('contactperson.surname', 'TEXT_STARTS_WITH', sSearchText);
						}
					}
					else
					{	
						oSearch.addFilter('contactperson.firstname', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator("or");
						oSearch.addFilter('contactperson.surname', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					if (nsFreshcare.user.role.toLowerCase() === 'trainer' || nsFreshcare.user.role.toLowerCase() === 'auditor') {
						oSearch.addFilter("contactperson.supplierstatus", "EQUAL_TO", nsFreshcare.data.contactStatusActive);
					}
					else if (nsFreshcare.user.role.toLowerCase() === 'grower' || nsFreshcare.user.role.toLowerCase() === 'customer') {
						oSearch.addFilter("contactperson.customerstatus", "EQUAL_TO", nsFreshcare.data.contactStatusActive);
					}
					
					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.external.freshcareprofile.search.process(oParam, data)});
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
					if (sPreviousId != this.id) {
						iColumn = iColumn + 1;
						
						if (iColumn == 1)
						{
							aHTML.push('<tr class="ns1blankspaceSearch">');
						}
						
						aHTML.push('<td class="ns1blankspaceSearch" id="contactperson' +
										'-' + this.id + '">' +
										this["contactperson.firstname"] + ' ' + this["contactperson.surname"] + '</td>');
										
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
					nsFreshcare.external.freshcareprofile.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'contactperson.firstname-space-contactperson.surname',
					more: oResponse.moreid,
					rows: 40,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.external.freshcareprofile.search.send
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		var aHTML = [];
		var oRoot = ns1blankspace.rootnamespace;

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
						'Summary</td></tr>');
					
		aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
						'Details</td></tr>');
					
		// v3.1.2 Reviewers don't see other CB contacts
		if (nsFreshcare.user.role.toLowerCase() != 'reviewer')
		{
			aHTML.push('<tr><td id="ns1blankspaceControlContacts" class="ns1blankspaceControl">' +
							'Other Contacts</td></tr>');
		}

		aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
						'Address</td></tr>');
		
		if (nsFreshcare.user.role.toLowerCase() === 'trainer') 
		{				
			aHTML.push('<tr><td id="ns1blankspaceControlAccreditation" class="ns1blankspaceControl">' +
							'Training Scope / Locations</td></tr>');
		}

		if (nsFreshcare.user.role.toLowerCase() === 'auditor') 
		{				
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlCertificateImages" class="ns1blankspaceControl">' +
							'Images</td></tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlCertificateTemplate" class="ns1blankspaceControl">' +
							'Certificate Email Template</td></tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlCARTemplate" class="ns1blankspaceControl">' +
							'CAR Email Template</td></tr>');
		}

		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainContacts" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAccreditation" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainImages" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainCertificateTemplate" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainCARTemplate" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {all: true, inContext: false}});
			nsFreshcare.external.freshcareprofile.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {new: true, actionOptions: true, inContext: false}});
			oRoot.external.freshcareprofile.details();
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: {new: true, actionOptions: true, inContext: false}});
			oRoot.external.freshcareprofile.address();
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainContacts', context: {all: true, inContext: false}});
			nsFreshcare.external.grower.contacts.show();
		});
		
		$('#ns1blankspaceControlAccreditation').click(function(event)
		{
			// v3.1.209b SUP022867 Now uses admin accredittion function
			ns1blankspace.show({selector: '#ns1blankspaceMainAccreditation', context: {new: true, actionOptions: true, inContext: false}});
			//nsFreshcare.external.freshcareprofile.accreditation();
			nsFreshcare.admin.trainer.accreditation();
		});
		
		$('#ns1blankspaceControlCertificateImages').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainImages', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.external.freshcareprofile.certificateImages();
		});
		
		$('#ns1blankspaceControlCertificateTemplate').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainCertificateTemplate', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.external.freshcareprofile.certificateTemplate();
		});
		
		$('#ns1blankspaceControlCARTemplate').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainCARTemplate', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.external.freshcareprofile.carTemplate();
		});
	},

	show: 		function (oParam, oResponse)
	{
		var aHTML = [];

		if (oParam) 
		{	if (oParam.showStep == undefined) {oParam.showStep = 1;}}
		else { oParam = {showStep: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		if (oParam.showStep === 1) {
			nsFreshcare.external.freshcareprofile.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		$('#ns1blankspaceViewControlNew').button({disabled: true});

		if (oParam.showStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry, can\'t find your ' + nsFreshcare.data.spaceText + ' profile details.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			if (oParam.showStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData['contactperson.contactbusiness'];
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactperson.contactbusiness.tradename'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactperson.surname'];

				ns1blankspace.app.context({new: true, actionOptions: true, inContext: false});
		
				oParam.showStep = 2;
				if (nsFreshcare.user.role.toLowerCase() === 'trainer') 
				{
					// Get Trainer States
					oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.external.freshcareprofile.show);
					nsFreshcare.external.freshcareprofile.trainerStates(oParam);
				}
				else 
				{
					nsFreshcare.external.freshcareprofile.show(oParam);
				}
			}

			// v3.1.1 SUP022434 Get person groups for primary contact
			else if (oParam.showStep === 2) 
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_PERSON_GROUP_SEARCH';
				oSearch.addField('contactperson,group,grouptext');
				oSearch.addFilter('contactperson', 'EQUAL_TO', ns1blankspace.objectContextData.id);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.objectContextData.personGroups = oResponse.data.rows;
						oParam.showStep = 9;
						nsFreshcare.external.freshcareprofile.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding groups: ' + oResponse.error.errornotes);
					}
				});
			}

			else if (oParam.showStep === 9) 
			{

				$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["contactperson.firstname"] + ' ' + 
														ns1blankspace.objectContextData["contactperson.surname"]);
				// v2.0.4 Removed search.send from newDestination and now passes object with id to init
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.external.freshcareprofile.init({id: ' + ns1blankspace.objectContext + ')',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.external.freshcareprofile.summary()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find profile information.</td></tr></table>');
					
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
			
			if (ns1blankspace.objectContextData['contactperson.contactbusiness.tradename'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trading Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactperson.contactbusiness.tradename'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['contactperson.contactbusiness.legalname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactperson.contactbusiness.legalname'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactperson.surname'] +
						'</td></tr>');

			if (ns1blankspace.objectContextData['contactperson.workphone'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactperson.workphone'] +
							'</td></tr>');
			}

			// Certification Bodies log in as a head office so don't have a mobile
			if (ns1blankspace.objectContextData['contactperson.mobile'] != '' && nsFreshcare.user.role.toLowerCase() != 'auditor')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Mobile</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactperson.mobile'] +
							'</td></tr>');
			}				
			
			// Trainers: List Accredited Memberships
			// v3.1.208c SUP022867 Now only shows unique list of memberships
			if (nsFreshcare.user.role.toLowerCase() === 'trainer') {
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Training COP</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">');
				if (nsFreshcare.data.trainerMemberships && nsFreshcare.data.trainerMemberships.length > 0) {
					aHTML.push('<table class="ns1blankspace">');

					$.each(nsFreshcare.data.memberships, function(i, x)
					{
						if ($.grep(nsFreshcare.data.trainerMemberships, function(y) {return x.id == y.membership && y.trainercontactpersontext != ''}).length > 0)
						{
							aHTML.push('<tr><td class="ns1blankspace">' + x.title.formatXHTML() + '</td></tr>');
						}
					});

					aHTML.push('</table>');
				} 
				else {
					aHTML.push('None found. Please contact Freshcare.')
				} 
				aHTML.push('</td></tr>');	
			}

			// Growers: List all Memberships			
			if (nsFreshcare.user.role.toLowerCase() === 'grower') {
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Memberships</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">');

				if (nsFreshcare.data.growerMemberships && nsFreshcare.data.growerMemberships.length > 0) {
					aHTML.push('<table class="ns1blankspace">');

					// 
					$.each(nsFreshcare.data.growerMemberships, function() {
						aHTML.push('<tr><td class="ns1blankspace">' + this.membershiptext + '</td></tr>');

					});
					aHTML.push('</table>');
				} 
				else {
					aHTML.push(' None found. Please contact ' + nsFreshcare.spaceText + '.')
				} 
				aHTML.push('</td></tr>');	
			}
			
			aHTML.push('</table>');		
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			if (ns1blankspace.rootNameSpaceText == 'nsFreshcare' 
				&& (nsFreshcare.user.role.toLowerCase() === 'trainer' || nsFreshcare.user.role.toLowerCase() === 'auditor')) 
			{
				aHTML.push('<tr><td><span id="ns1blankspaceGoToWebsiteProfile" class="ns1blankspaceAction">' +
							'Please email ' + nsFreshcare.spaceText + ' if you want to update your profile</span></td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceReportComparison" style="font-size:0.625em;color:#B8B8B8;">' +
							'To update your profile, please <a href="mailto:' + nsFreshcare.data.emailToAdmin + '">email</a> ' + nsFreshcare.spaceText + '</td></tr>');
			}

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			$('#ns1blankspaceGoToWebsiteProfile').button(
			{
				label: 'View my freshcare.com.au profile',
				/*icons:
				{
					primary: "ui-icon-play"
				}*/
			})
			.click(function()
			{
				var	sTrainerURL = ns1blankspace.user.contactBusinessText;
				sTrainerURL = sTrainerURL.replace(/ /g, ""); 
				sTrainerURL = sTrainerURL.replace(/&/g, "and");

				sTrainerURL = 'http://www.freshcare.com.au/' + sTrainerURL + '/ContactDetails/' + ns1blankspace.user.contactPerson;
				window.open(sTrainerURL);
			});
		}	
	},

	details: 	function() 
	{

		var aHTML = [];
		
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
			var oElements = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trading Name' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowTradingName" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsTradingName" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			oElements.push('TradingName');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Legal Name' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowLegalName" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsLegalName" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			oElements.push('LegalName');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'ABN' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowABN" class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td id="ns1blankspaceDetailsABN" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			oElements.push('ABN');

			// v3.1.1 SUP022434  Added Trainer ID but only if person is a Trainer
			if ($.grep(ns1blankspace.objectContextData.personGroups, function(x) {return x.group == nsFreshcare.data.groupTrainer.toString()}).length > 0)
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Trainer ID' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowReference" class="ns1blankspace">' +
								'<td id="ns1blankspaceDetailsReference" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');			
				oElements.push('Reference');

			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'First Name' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowFirstName" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsFirstName" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			oElements.push('FirstName');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Surname' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSurname" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSurname" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			oElements.push('Surname');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Phone' + 
							((nsFreshcare.user.role.toLowerCase() === 'trainer') 
								? '<span id="ns1blankspaceWebsiteShowPhone" style="font-size:0.75em;font-weight:normal;vertical-align:bottom;">' 
								: '') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowPhone" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsPhone" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			oElements.push('Phone');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Mobile' +
							((nsFreshcare.user.role.toLowerCase() === 'trainer') 
								? '<span id="ns1blankspaceWebsiteShowMobile" style="font-size:0.75em;font-weight:normal;vertical-align:bottom;">' 
								: '') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowMobile" class="nsFreshcareReadOnly">' +
							'<td id="ns1blankspaceDetailsMobile" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			oElements.push('Mobile');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'Fax' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowFax" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
							'<td id="ns1blankspaceDetailsFax" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			oElements.push('Fax');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Email' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowEmail" class="nsFreshcareReadOnly">' +
							'<td id="ns1blankspaceDetailsEmail" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			oElements.push('Email');

			// v3.1.2 If we're an Auditor, we need to ask them for Certification Body Number
			if (nsFreshcare.user.role.toLowerCase() === 'auditor')
			{	
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Certification Body Number' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowCertificationBodyNumber" class="nsFreshcareReadOnly">' +
								'<td id="ns1blankspaceDetailsCertificationBodyNumber" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				oElements.push('CertificationBodyNumber');

			}

			aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'Notes' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowNotes" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
							'<td id="ns1blankspaceDetailsNotes" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			oElements.push('Notes');

			aHTML.push('</table>');					
			
			if (ns1blankspace.objectContext != -1) {
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
			}
			
			var aHTML = [];
				
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Trading Name' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowTradingNameUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTradingNameUpdate" class="ns1blankspaceText" data-mandatory="1" data-caption="Trading Name">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Legal Name' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowLegalNameUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsLegalNameUpdate" class="ns1blankspaceText">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'ABN' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceHideOnNew" id="ns1blankspaceDetailsRowABNUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsABNUpdate" class="ns1blankspaceText">' +
							'</td></tr>');			
							
			// v3.1.1 SUP022434  Added Trainer ID but only if person is a Trainer
			if ($.grep(ns1blankspace.objectContextData.personGroups, function(x) {return x.group == nsFreshcare.data.groupTrainer.toString()}).length > 0)
			{
				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								((ns1blankspace.objectContext === -1) ? 'Trainer ID' : '&nbsp;') +
								'</td></tr>' +
								'<tr class="ns1blankspace ns1blankspaceHideOnNew" id="ns1blankspaceDetailsRowReferenceUpdate">' +
								'<td class="ns1blankspaceReadOnly" style="font-size:0.875em;">Updates not Permitted' +
								'</td></tr>');			
								
			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'First Name' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowFirstNameUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsFirstNameUpdate" class="ns1blankspaceText" data-caption="First Name">' +
							'</td></tr>');			//data-mandatory="1" 

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Surname' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowSurnameUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsSurnameUpdate" class="ns1blankspaceText" data-mandatory="1" data-caption="Surname">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((nsFreshcare.user.role.toLowerCase() === 'trainer') 
								? '<span id="ns1blankspaceWebsiteShowPhoneUpdate" style="font-size:0.75em;font-weight:normal;vertical-align:bottom;cursor:pointer;color:#A9C529;">' + 
								  ((ns1blankspace.objectContextData['contactperson.displayphone'] != 'Y') ? 'Show' : "Don't show") + ' on website'
								: '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowPhoneUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsPhoneUpdate" class="ns1blankspaceText" data-mandatory="1" data-caption="Phone">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((nsFreshcare.user.role.toLowerCase() === 'trainer') 
								? '<span id="ns1blankspaceWebsiteShowMobileUpdate" style="font-size:0.75em;font-weight:normal;vertical-align:bottom;cursor:pointer;color:#A9C529;">' + 
								  ((ns1blankspace.objectContextData['contactperson.displaymobile'] != 'Y') ? 'Show' : "Don't show") + ' on website'
								: '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowMobileUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsMobileUpdate" class="ns1blankspaceText">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Fax' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspaceText ns1blankspaceHideOnNew" id="ns1blankspaceDetailsRowFaxUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsFaxUpdate" class="ns1blankspaceText">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Email' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowEmailUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsEmailUpdate" class="ns1blankspaceText">' +
							'</td></tr>');
				
			// v3.1.2 If we're an Auditor, show Certification Body Number
			if (nsFreshcare.user.role.toLowerCase() === 'auditor')
			{	
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								((ns1blankspace.objectContext === -1) ? 'Certification Body Number' : '&nbsp;') +
								'</td></tr>' +
								'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowCertificationBodyNumberUpdate">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsCertificationBodyNumberUpdate" class="ns1blankspaceText">' +
								'</td></tr>');
			}

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Notes' : '&nbsp;') +
							'</td></tr>' +
							'<tr class="ns1blankspaceTextMulti"  id="ns1blankspaceDetailsRowNotesUpdate">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsNotesUpdate" class="ns1blankspaceTextMulti"></textarea>' +
							'</td></tr>');
				
			aHTML.push('</table>');					
				
			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

			// Mask the relevant felds
			$('#ns1blankspaceDetailsABNUpdate').mask('99 999 999 999', {placeholder: " "});
			$('#ns1blankspaceDetailsMobileUpdate').mask('9999 999 999', {placeholder: " "});
			$('#ns1blankspaceDetailsPhoneUpdate').mask('99 9999 9999', {placeholder: " "});
			$('#ns1blankspaceDetailsFaxUpdate').mask('99 9999 9999', {placeholder: " "});

			if (ns1blankspace.objectContextData)
			{
				// we have to set the values on the left and right hand sides
				var aValues = [];
				$('#ns1blankspaceDetailsReference').html(ns1blankspace.objectContextData["contactperson.contactbusiness.reference"].formatXHTML());
				$('#ns1blankspaceDetailsTradingName').html(ns1blankspace.objectContextData["contactperson.contactbusiness.tradename"].formatXHTML());
				$('#ns1blankspaceDetailsLegalName').html(ns1blankspace.objectContextData["contactperson.contactbusiness.legalname"].formatXHTML());
				$('#ns1blankspaceDetailsABN').html(ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].formatXHTML());
				$('#ns1blankspaceDetailsReference').html(ns1blankspace.objectContextData["contactperson.reference"].formatXHTML());
				$('#ns1blankspaceDetailsFirstName').html(ns1blankspace.objectContextData["contactperson.firstname"].formatXHTML());
				$('#ns1blankspaceDetailsSurname').html(ns1blankspace.objectContextData["contactperson.surname"].formatXHTML());
				$('#ns1blankspaceDetailsEmail').html(ns1blankspace.objectContextData["contactperson.email"].formatXHTML());
				$('#ns1blankspaceDetailsMobile').html(ns1blankspace.objectContextData["contactperson.mobile"].formatXHTML());
				$('#ns1blankspaceDetailsPhone').html(ns1blankspace.objectContextData["contactperson.workphone"].formatXHTML());
				$('#ns1blankspaceDetailsFax').html(ns1blankspace.objectContextData["contactperson.fax"].formatXHTML());
				
				$('#ns1blankspaceDetailsTradingNameUpdate').val(ns1blankspace.objectContextData["contactperson.contactbusiness.tradename"].formatXHTML());
				$('#ns1blankspaceDetailsLegalNameUpdate').val(ns1blankspace.objectContextData["contactperson.contactbusiness.legalname"].formatXHTML());
				$('#ns1blankspaceDetailsGenderUpdate').val(ns1blankspace.objectContextData["contactperson.gendertext"].formatXHTML());
				$('#ns1blankspaceDetailsGenderUpdate').attr('data-id', ns1blankspace.objectContextData["contactperson.gender"].formatXHTML());
				$('#ns1blankspaceDetailsFirstNameUpdate').val(ns1blankspace.objectContextData["contactperson.firstname"].formatXHTML());
				$('#ns1blankspaceDetailsSurnameUpdate').val(ns1blankspace.objectContextData["contactperson.surname"].formatXHTML());
				$('#ns1blankspaceDetailsEmailUpdate').val(ns1blankspace.objectContextData["contactperson.email"].formatXHTML());

				// If we're an Auditor, show Certification Body Number
				if (nsFreshcare.user.role.toLowerCase() === 'auditor')
				{	// Moved to below until internal upgrade
				}

				// If we're an auditor, show Certification Body Number
				if (nsFreshcare.user.role.toLowerCase() === 'auditor')
				{
					$('#ns1blankspaceDetailsCertificationBodyNumber').html(ns1blankspace.objectContextData["contactperson.contactbusiness.se" + nsFreshcare.data.certificationBodyNumberId].formatXHTML());
					$('#ns1blankspaceDetailsCertificationBodyNumberUpdate').val(ns1blankspace.objectContextData["contactperson.contactbusiness.se" + nsFreshcare.data.certificationBodyNumberId].formatXHTML());
				}

				// Mask ABN
				if (ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].length > 0 && ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].indexOf(' ') === -1) {
					$('#ns1blankspaceDetailsABNUpdate').val(ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].substr(0,2) + ' ' + 
															ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].substr(2,3) + ' ' + 
															ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].substr(5,3) +
															ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].substr(8));
				}
				else {
					$('#ns1blankspaceDetailsABNUpdate').val(ns1blankspace.objectContextData["contactperson.contactbusiness.abn"].formatXHTML());
				}

				//Mask Mobile
				if (ns1blankspace.objectContextData["contactperson.mobile"].length > 0 && ns1blankspace.objectContextData["contactperson.mobile"].indexOf(' ') === -1) {
					$('#ns1blankspaceDetailsMobileUpdate').val(ns1blankspace.objectContextData["contactperson.mobile"].substr(0,4) + ' ' +
															   ns1blankspace.objectContextData["contactperson.mobile"].substr(4,3) + ' ' +
															   ns1blankspace.objectContextData["contactperson.mobile"].substr(7));
				}
				else {
					$('#ns1blankspaceDetailsMobileUpdate').val(ns1blankspace.objectContextData["contactperson.mobile"].formatXHTML());
				}

				// Mask work phone
				if (ns1blankspace.objectContextData["contactperson.workphone"].length > 0 && ns1blankspace.objectContextData["contactperson.workphone"].indexOf(' ') === -1) {
					$('#ns1blankspaceDetailsPhoneUpdate').val(ns1blankspace.objectContextData["contactperson.workphone"].substr(0,2) + ' ' + 
															  ns1blankspace.objectContextData["contactperson.workphone"].substr(2,4) + ' ' +
															  ns1blankspace.objectContextData["contactperson.workphone"].substr(6));
				}
				else {
					$('#ns1blankspaceDetailsPhoneUpdate').val(ns1blankspace.objectContextData["contactperson.workphone"].formatXHTML());
				}

				// Mask Fax
				if (ns1blankspace.objectContextData["contactperson.fax"].length > 0 && ns1blankspace.objectContextData["contactperson.fax"].indexOf(' ') === -1) {
					$('#ns1blankspaceDetailsFaxUpdate').val(ns1blankspace.objectContextData["contactperson.fax"].substr(0,2) + ' ' +
															ns1blankspace.objectContextData["contactperson.fax"].substr(2,4) + ' ' +
															ns1blankspace.objectContextData["contactperson.fax"].substr(6));
				}	
				else {
					$('#ns1blankspaceDetailsFaxUpdate').val(ns1blankspace.objectContextData["contactperson.fax"].formatXHTML());
				}

				if (nsFreshcare.user.role.toLowerCase() === 'trainer' ) {

					if (ns1blankspace.objectContextData['contactperson.displayphone'] != 'Y') {
					 	$('#ns1blankspaceWebsiteShowPhone')
					 		.html('&nbsp;(Not shown on website)')
					 		.attr('data-show', 'No');
					 	$('#ns1blankspaceWebsiteShowPhoneUpdate')
					 		.attr('data-show', 'No')
					}
					else {
					 	$('#ns1blankspaceWebsiteShowPhone')
					 		.html('&nbsp;(Shown on website)')
					 		.attr('data-show', 'Yes');
					 	$('#ns1blankspaceWebsiteShowPhoneUpdate')
					 		.attr('data-show', 'Yes')
					}

					if (ns1blankspace.objectContextData['contactperson.displaymobile'] != 'Y') {
					 	$('#ns1blankspaceWebsiteShowMobile')
					 		.html('&nbsp;(Not shown on website)')
					 		.attr('data-show', 'No'); 
					 	$('#ns1blankspaceWebsiteShowMobileUpdate')
					 		.attr('data-show', 'No'); 
					}
					else {
					 	$('#ns1blankspaceWebsiteShowMobile')
					 		.html('&nbsp;(Shown on website)')
					 		.attr('data-show', 'Yes');
					 	$('#ns1blankspaceWebsiteShowMobileUpdate')
					 		.attr('data-show', 'Yes'); 
					}
				}
				
				$.each(oElements, function() 
				{
					var iMax = Math.max($('#ns1blankspaceDetailsRow' + this + 'Update').height(), $('#ns1blankspaceDetailsRow' + this).height());
					$('#ns1blankspaceDetailsRow' + this + 'Update').height(iMax);
					$('#ns1blankspaceDetailsRow' + this).height(iMax);
				});
			}

			// Bind Show on Website fields for Trainers
			$('#ns1blankspaceWebsiteShowPhoneUpdate').click(function() {

				if ($(this).html().indexOf("Don't") > -1) {
					$(this)
						.html('Show on website')
						.attr('data-show', 'No'); 
				}
				else {
					$(this)
						.html("Don't show on website")
						.attr('data-show', 'Yes'); 
				}
			});

			$('#ns1blankspaceWebsiteShowMobileUpdate').click(function() {

				if ($(this).html().indexOf("Don't") > -1) {
					$(this)
						.html('Show on website')
						.attr('data-show', 'No'); 
				}
				else {
					$(this)
						.html("Don't show on website")
						.attr('data-show', 'Yes'); 
				}
			});
		}	
	},

	address: 	function() 
	{

		var aHTML = [];

		if ($('#ns1blankspaceMainAddress').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainAddress').attr('data-loading', '');
				
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceAddressColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceAddressColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' +
							'</table>');					
			
			$('#ns1blankspaceMainAddress').html(aHTML.join(''));
			
			var aHTML = [];
			var oElements = [];

			aHTML.push('<table class="ns1blankspace">');
	
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Street Address' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowStreetAddress1" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressStreetAddress1" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('StreetAddress1');

			aHTML.push('<tr id="ns1blankspaceAddressRowStreetAddress2" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressStreetAddress2" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('StreetAddress2');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Suburb' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowStreetSuburb" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressStreetSuburb" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('StreetSuburb');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'State' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowStreetState" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressStreetState" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('StreetState');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Post Code' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowStreetPostCode" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressStreetPostCode" class="ns1blankspaceText nsFreshcareReadOnly">' +
							'</td></tr>');				
			oElements.push('StreetPostCode');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Country' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowStreetCountry" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressStreetCountry" class="nsFreshcareReadOnly">' +
							'</td></tr>');						
			oElements.push('StreetCountry');
			
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption" style="padding-top:12px;">' +
							'Mailing Address' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowMailingAddress1" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressMailingAddress1" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('MailingAddress1');
							
			aHTML.push('<tr id="ns1blankspaceAddressRowMailingAddress2" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressMailingAddress2" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('MailingAddress2');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Suburb' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowMainingSuburb" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressMailingSuburb" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('MailingSuburb');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'State' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowMailingState" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressMailingState" class="nsFreshcareReadOnly">' +
							'</td></tr>');
			oElements.push('MailingState');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Post Code' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowMailingPostCode" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressMailingPostCode" class="nsFreshcareReadOnly">' +
							'</td></tr>');				
			oElements.push('MailingPostCode');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Country' +
							'</td></tr>' +
							'<tr id="ns1blankspaceAddressRowMailingCountry" class="ns1blankspace">' +
							'<td id="ns1blankspaceAddressMailingCountry" class="nsFreshcareReadOnly">' +
							'</td></tr>');						
			oElements.push('MailingCountry');
			
			aHTML.push('</table>');					
			
			$('#ns1blankspaceAddressColumn1').html(aHTML.join(''));

			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace">');
					
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowStreetAddress1Update">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetAddress1Update" class="ns1blankspaceText">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspace" id="ns1blankspaceAddressRowStreetAddress2Update">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetAddress2Update" class="ns1blankspaceText">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowStreetSuburbUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetSuburbUpdate" class="ns1blankspaceText ns1blankspaceSelectAddress">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowStreetStateUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetStateUpdate" class="ns1blankspaceText">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowStreetPostCodeUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetPostCodeUpdate" class="ns1blankspaceText">' +
							'</td></tr>');				
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowStreetCountryUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetCountryUpdate" class="ns1blankspaceText">' +
							'</td></tr>');						
			
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td id="ns1blankspaceAddressCopy" style="text-align:right;font-size:0.825em;">' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowMailingAddress1Update">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingAddress1Update" class="ns1blankspaceText">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspace" id="ns1blankspaceAddressRowMailingAddress2Update">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingAddress2Update" class="ns1blankspaceText">' +
							'</td></tr>');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowMailingSuburbUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingSuburbUpdate" class="ns1blankspaceText ns1blankspaceSelectAddress">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowMailingStateUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingStateUpdate" class="ns1blankspaceText">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowMailingPostCodeUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingPostCodeUpdate" class="ns1blankspaceText">' +
							'</td></tr>');				
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr class="ns1blankspace" id="ns1blankspaceAddressRowMailingCountryUpdate">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingCountryUpdate" class="ns1blankspaceText">' +
							'</td></tr>');						
			
			//aHTML.push('<tr><td>&nbsp;</td></tr>' +
			//				'<tr><td id="ns1blankspaceAddressCopy" style="font-size:0.825em;">' +
			//				'</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceAddressColumn2').html(aHTML.join(''));

			$('#ns1blankspaceAddressCopy').button({
				label: 'Copy Street to Mailing'
			})
			.click(function() {

				$('#ns1blankspaceAddressMailingAddress1Update').val($('#ns1blankspaceAddressStreetAddress1Update').val());
				$('#ns1blankspaceAddressMailingAddress2Update').val($('#ns1blankspaceAddressStreetAddress2Update').val());
				$('#ns1blankspaceAddressMailingSuburbUpdate').val($('#ns1blankspaceAddressStreetSuburbUpdate').val());
				$('#ns1blankspaceAddressMailingStateUpdate').val($('#ns1blankspaceAddressStreetStateUpdate').val());
				$('#ns1blankspaceAddressMailingPostCodeUpdate').val($('#ns1blankspaceAddressStreetPostCodeUpdate').val());
				$('#ns1blankspaceAddressMailingCountryUpdate').val($('#ns1blankspaceAddressStreetCountryUpdate').val());

			});
			
			if (ns1blankspace.objectContextData != undefined)
			{
				// v3.1.206 SUP023035 Nowlooks at business mailing address
				$('#ns1blankspaceAddressStreetAddress1').html(ns1blankspace.objectContextData['contactperson.contactbusiness.streetaddress1']);
				$('#ns1blankspaceAddressStreetAddress2').html(ns1blankspace.objectContextData['contactperson.contactbusiness.streetaddress2']);
				$('#ns1blankspaceAddressStreetSuburb').html(ns1blankspace.objectContextData['contactperson.contactbusiness.streetsuburb']);
				$('#ns1blankspaceAddressStreetState').html(ns1blankspace.objectContextData['contactperson.contactbusiness.streetstate']);
				$('#ns1blankspaceAddressStreetPostCode').html(ns1blankspace.objectContextData['contactperson.contactbusiness.streetpostcode']);
				$('#ns1blankspaceAddressStreetCountry').html(ns1blankspace.objectContextData['contactperson.contactbusiness.streetcountry']);
				$('#ns1blankspaceAddressMailingAddress1').html(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingaddress1']);
				$('#ns1blankspaceAddressMailingAddress2').html(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingaddress2']);
				$('#ns1blankspaceAddressMailingSuburb').html(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingsuburb']);
				$('#ns1blankspaceAddressMailingState').html(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingstate']);
				$('#ns1blankspaceAddressMailingPostCode').html(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingpostcode']);
				$('#ns1blankspaceAddressMailingCountry').html(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingcountry']);

				$('#ns1blankspaceAddressStreetAddress1Update').val(ns1blankspace.objectContextData['contactperson.contactbusiness.streetaddress1']);
				$('#ns1blankspaceAddressStreetAddress2Update').val(ns1blankspace.objectContextData['contactperson.contactbusiness.streetaddress2']);
				$('#ns1blankspaceAddressStreetSuburbUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.streetsuburb']);
				$('#ns1blankspaceAddressStreetStateUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.streetstate']);
				$('#ns1blankspaceAddressStreetPostCodeUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.streetpostcode']);
				$('#ns1blankspaceAddressStreetCountryUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.streetcountry']);
				$('#ns1blankspaceAddressMailingAddress1Update').val(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingaddress1']);
				$('#ns1blankspaceAddressMailingAddress2Update').val(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingaddress2']);
				$('#ns1blankspaceAddressMailingSuburbUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingsuburb']);
				$('#ns1blankspaceAddressMailingStateUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingstate']);
				$('#ns1blankspaceAddressMailingPostCodeUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingpostcode']);
				$('#ns1blankspaceAddressMailingCountryUpdate').val(ns1blankspace.objectContextData['contactperson.contactbusiness.mailingcountry']);
			}

			$.each(oElements, function() 
			{
				if ($('#ns1blankspaceAddress' + this).html() === '' ) {
					$('#ns1blankspaceAddress' + this).html('&nbsp;');
				}

				var iMax = Math.max($('#ns1blankspaceAddressRow' + this + 'Update').height(), $('#ns1blankspaceAddressRow' + this).height());
				$('#ns1blankspaceAddressRow' + this + 'Update').height(iMax);
				$('#ns1blankspaceAddressRow' + this).height(iMax);
			});
		}	
	},

	manageMultiRows: 	function(sXHTMLElementID) 
	{

		var sRowID = sXHTMLElementID.split("_")[1];
		var sFieldName = 'State';

		if ($('#' + sXHTMLElementID).hasClass("nsFreshcareSelected") === false) {
			
			$('#' + sXHTMLElementID).addClass("nsFreshcareSelected");

			if ($('#nsFreshcare' + sFieldName + 'List_' + sRowID).html() != "" && $('#nsFreshcare' + sFieldName + 'List_' + sRowID).html() != undefined) {
				// Already exists
				if ($('#nsFreshcare' + sFieldName + 'List_' + sRowID).attr("data-rowID")) {
					// This is an existing row - remove any strikethrough
					$('#nsFreshcare' + sFieldName + 'List_' + sRowID).css('text-decoration', "none");
				}
			}
			else {
				// New row added during this edit - add it to the list
				$('#ns1blankspaceAccreditation' + sFieldName)
				.append('<span id="nsFreshcare' + sFieldName + 'List_' + sRowID + '" ' + 
						'class="nsFreshcare' + sFieldName + 'List"><br />' + 
							$('#ns1blankspaceAccreditation' + sFieldName + '_' + sRowID).html() + 
						'</span>');
			}
		}
		else {		// We're removing the row
			$('#' + sXHTMLElementID).removeClass("nsFreshcareSelected");

			if ($('#nsFreshcare' + sFieldName + 'List_' + sRowID).html() != "" && $('#nsFreshcare' + sFieldName + 'List_' + sRowID).html() != undefined) {
				// Already exists
				if ($('#nsFreshcare' + sFieldName + 'List_' + sRowID).attr("data-rowID")) {
					// This is an existing row - remove any strikethrough
					$('#nsFreshcare' + sFieldName + 'List_' + sRowID).css('text-decoration', "line-through");
				}
				else {
					// New row added during this edit - just remove it
					$('#nsFreshcare' + sFieldName + 'List_' + sRowID).remove();
				}
			}
		}
	},

	trainerStates: 	function(oParam, oResponse) 
	{

		var iStep = 1;

		if (oParam) {
			if (oParam.trainerStatesStep) {iStep = oParam.trainerStatesStep;}
		}
		else {
			oParam = {trainerStatesStep: 1};
		}

		if (iStep === 1 && oResponse === undefined) {
			
			ns1blankspace.objectContextData.state = {};

			var oSearch = new AdvancedSearch();
			oSearch.method = "AGRI_TRAINER_STATE_SEARCH";
			oSearch.addField('state,statetext');
			oSearch.addFilter('contactperson', 'EQUAL_TO', ns1blankspace.objectContext);
			oSearch.sort('statetext', 'asc');
			oSearch.rows = 20;
			oSearch.getResults(function(oResponse) {

				oParam.trainerStatesStep = 2;
				nsFreshcare.external.freshcareprofile.trainerStates(oParam, oResponse);
			});
		}
		else if (iStep === 2 && oResponse) {

			if (oResponse.status === 'OK') {

				ns1blankspace.objectContextData.states = oResponse.data.rows;
				ns1blankspace.util.onComplete(oParam);
			}
		}		
	},		

	validStates: 	function(oParam, oResponse) 
	{

		var iStep = 1;

		if (oParam) {
			if (oParam.statesStep) {iStep = oParam.statesStep;}
		}
		else {
			oParam = {statesStep: 1};
		}

		if (iStep === 1 && oResponse === undefined) {
			
			ns1blankspace.objectContextData.state = {};

			var oSearch = new AdvancedSearch();
			oSearch.method = "SITE_STATE_SEARCH";
			oSearch.addField('title');
			oSearch.sort('title', 'asc');
			oSearch.rows = 20;
			oSearch.getResults(function(oResponse) {

				oParam.statesStep = 2;
				nsFreshcare.external.freshcareprofile.validStates(oParam, oResponse);
			});
		}
		else if (iStep === 2 && oResponse) {

			if (oResponse.status === 'OK') {

				nsFreshcare.data.validStates = oResponse.data.rows;
				ns1blankspace.util.onComplete(oParam);
			}
		}		
	},	

	certificateTemplate: function(oParam)
	{
		
		var sDocumentContent;
		var iDocumentId;
		var aHTML = [];

		if (oParam)
		{
			if (oParam.documentContent) {sDocumentContent = oParam.documentContent}
			if (oParam.documentId) {iDocumentId = oParam.documentId}
		}	
		else {oParam = {}}

		if ($('#ns1blankspaceMainCertificateTemplate').attr('data-loading') == '1')
		{
			aHTML = [];
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceCertificateTemplateRow1" class="ns1blankspaceColumn1"></td>' +
						'</tr>' + 
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceCertificateTemplateRow2" class="ns1blankspaceColumn1"></td>' +
						'</tr>' + 
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceCertificateTemplateRow3" class="ns1blankspaceColumn1"></td>' +
						'</tr>' + 
						'</table>');		
			
			$('#ns1blankspaceMainCertificateTemplate').html(aHTML.join(''));
				
			if (sDocumentContent == undefined || sDocumentContent === '')
			{
				// Certificate template is stored in a document with the url set to the contactbusiness id of the currently logged on user
				// If this document doesn't exist, get the default document so they can modify and save
				var oSearch = new AdvancedSearch();
				oSearch.method = 'DOCUMENT_SEARCH';
				oSearch.addField('content');
				if (iDocumentId === undefined)
				{
					oSearch.addFilter('url', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				}
				else
				{
					oSearch.addFilter('id', 'EQUAL_TO', iDocumentId);
				}

				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK') 
					{	
						if (oResponse.data.rows.length > 0)
						{
							oParam.documentContent = oResponse.data.rows[0].content.formatXHTML();
							if (oParam.documentContent != '')
							{
								oParam.documentId = oResponse.data.rows[0].id;
								nsFreshcare.data.documentEmailCertificateTemplate = oParam.documentId;
							}
							else
							{
								oParam.documentId = nsFreshcare.data.documentCertificateTemplateDefault;
							}
						}
						else
						{	oParam.documentId = nsFreshcare.data.documentCertificateTemplateDefault; 	}
						nsFreshcare.external.freshcareprofile.certificateTemplate(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
				
			}
			else
			{
				$('#ns1blankspaceMainCertificateTemplate').attr('data-loading', '');
				
				// v2.0.4 SUP021408 Add email preview (send to CB)
				if (nsFreshcare.data.documentEmailCertificateTemplate != undefined 
					&& oParam.documentId === nsFreshcare.data.documentEmailCertificateTemplate)
				{
					aHTML = [];
					aHTML.push('<table><tr><td style="width:75%;">&nbsp;</td>' +
								'<td><span id="ns1blankspaceCertificateTemplatePreview"' +
								' class="ns1blankspaceAction" style="text-align:right;"></span></td></tr>' +
								'</table>');
					$('#ns1blankspaceCertificateTemplateRow1').html(aHTML.join(''));

					$('#ns1blankspaceCertificateTemplatePreview')
						.button({label: 'Send Preview Email'})
						.click(function()
						{
							var sData = 'to=' + ns1blankspace.util.fs(ns1blankspace.user.email) +
										'&subject=' + ns1blankspace.util.fs(nsFreshcare.data.appName.replace('Online', '') + ' Certificate - [' + nsFreshcare.data.growerText + ' Business Name]') + 
										'&applysystemtemplate=N' +
										'&document=' + ns1blankspace.util.fs(nsFreshcare.data.documentEmailCertificateTemplate);
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.message('Email sent to ' + ns1blankspace.user.email)
									}
									else
									{
										ns1blankspace.status.error('Email not sent: ' + ns1blankspace.error.errornotes);
									}
								}
							});
						});
				}

				var sHTML = sDocumentContent;
				aHTML = [];

				for (edId in tinyMCE.editors) 
										tinyMCE.editors[edId].destroy(true);
									
				ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;

				aHTML.push('<table class="ns1blankspace">');
						
				aHTML.push('<tr><td class="ns1blankspaceSummary" style="font-size:75%;"><br />' +
								((oParam.documentId === nsFreshcare.data.documentCertificateTemplateDefault) 
									? 'A default email template has been provided above. ' + 
									  'If you attach your logo or any other images on the Images tab (in the Email Template Images section), ' +
									  'you can insert it into this template by clicking the Insert/Edit Image icon. <br /><br />'
									: '') + 
								'You can insert the following merge fields into your email as follows (copied exactly as shown below): <br /><br />' +
								'[TEMPLATE_GROWERFIRSTNAME]<br />' +
								'[TEMPLATE_GROWERSURNAME]<br />' +
								'[TEMPLATE_GROWERTRADINGNAME]<br />' +
								'[TEMPLATE_CERTIFICATENUMBER]<br />' +
								'[TEMPLATE_MEMBERSHIP]<br />' +
								'[TEMPLATE_AUDITDATE]<br />' +
								'[TEMPLATE_CERTIFICATEEXPIRY]<br />' +
								'[TEMPLATE_AUDITORNAME]<br />' +
							'</td></tr></table>');

				$('#ns1blankspaceCertificateTemplateRow3').html(aHTML.join(''));

				aHTML = [];
			
				aHTML.push('<table class="ns1blankspace">');
						
				aHTML.push('<tr class="ns1blankspaceMainTextMulti">' +
								'<td class="ns1blankspaceMainTextMulti">' +
								'<textarea rows="10" cols="60" name="ns1blankspaceCertificateTemplateText"' + 
								' id="ns1blankspaceCertificateTemplateText' + ns1blankspace.counter.editor +
								'" class="ns1blankspaceTextMultiLarge tinymceAdvanced"></textarea>' +
								'</td></tr>');
								
				aHTML.push('</table>');					
				
				$('#ns1blankspaceCertificateTemplateRow2').html(aHTML.join(''));

				nsFreshcare.external.freshcareprofile.data.emailCertificateTemplateEditor = 'ns1blankspaceCertificateTemplateText' + ns1blankspace.counter.editor;
				$('#ns1blankspaceCertificateTemplateText' + ns1blankspace.counter.editor).val(sHTML);
					
				tinyMCE.init(
				{
					mode : "none",
					height : "415px", 
					width : "100%",
					theme : "advanced",

					theme_advanced_path : false,

					plugins : "table,advimage,advlink,emotions,iespell,insertdatetime,templateFields,preview,media,fullscreen,print,visualchars,nonbreaking,pagebreak,style,paste,searchreplace,print,contextmenu", 

					theme_advanced_buttons1_add_before : "forecolor,backcolor", 
					theme_advanced_buttons1_add : "fontselect,fontsizeselect", 
			 
					theme_advanced_buttons2_add : "separator,insertdate,inserttime,preview,zoom,separator,nonbreaking,pagebreak,visualchars", 
					theme_advanced_buttons2_add_before: "cut,copy,paste,pasteword,separator,search,replace,separator", 
					
					theme_advanced_buttons3_add_before : "tablecontrols,separator", 
					theme_advanced_buttons3_add : "emotions,iespell,fullscreen,print,templateFields,media,selectall,advhr",
			 
					
					plugin_insertdate_dateFormat : "%d-%m-%y", 
					plugin_insertdate_timeFormat : "%H:%M:%S", 
				
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_resizing : true,
				
					font_size_style_values : "8pt,10pt,12pt,14pt,18pt,24pt,36pt",
					
					extended_valid_elements : "style,input[accept|accesskey|align<bottom?left?middle?right?top|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|onblur|onchange|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|size|style|tabindex|title],ol[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|start|style|title|type],div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],li[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title|type|value],iframe[src|width|height|name|align|frameborder|scrolling|marginheight|marginwidth]",

					fullscreen_new_window : true, 
					fullscreen_settings : 
					{ 
						theme_advanced_path_location : "top" 
					}, 
					relative_urls : false, 
					remove_script_host : false, 
					convert_urls : false, 
					visual : true, 
					gecko_spellcheck : true,
					content_css : ns1blankspace.xhtml.editorCSS,
					
					external_link_list_url : "/ondemand/core/?method=CORE_EDITOR_LINK_SEARCH", 
					external_image_list_url : "/ondemand/core/?method=CORE_EDITOR_IMAGE_SEARCH&excludesite=1&object=12&objectcontext=" + ns1blankspace.user.contactBusiness, 
					media_external_list_url : "/ondemand/core/?method=CORE_EDITOR_MEDIA_SEARCH&object=12&objectcontext=" + ns1blankspace.user.contactBusiness,

					TemplateLinkType : "0"

				});				
				
				tinyMCE.execCommand('mceAddControl', false, 'ns1blankspaceCertificateTemplateText' + ns1blankspace.counter.editor);	
			}	
		}	

	},

	carTemplate: function(oParam)
	{
		// v2.0.4 SUP021408 Added carTemplate
		var sDocumentContent;
		var iDocumentId;
		var aHTML = [];

		if (oParam)
		{
			if (oParam.documentContent) {sDocumentContent = oParam.documentContent}
			if (oParam.documentId) {iDocumentId = oParam.documentId}
		}	
		else {oParam = {}}

		if ($('#ns1blankspaceMainCARTemplate').attr('data-loading') == '1')
		{
			aHTML = [];
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceCARTemplateRow1" class="ns1blankspaceColumn1"></td>' +
						'</tr>' + 
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceCARTemplateRow2" class="ns1blankspaceColumn1"></td>' +
						'</tr>' + 
						'<tr class="ns1blankspaceContainer">' +
						'<td id="ns1blankspaceCARTemplateRow3" class="ns1blankspaceColumn1"></td>' +
						'</tr>' + 
						'</table>');		
			
			$('#ns1blankspaceMainCARTemplate').html(aHTML.join(''));
				
			if (sDocumentContent == undefined || sDocumentContent === '')
			{
				// CAR template is stored in a document with the url set to 'carTemplate-' + contactbusiness id of the currently logged on user
				// If this document doesn't exist, get the default document so they can modify and save
				var oSearch = new AdvancedSearch();
				oSearch.method = 'DOCUMENT_SEARCH';
				oSearch.addField('content');
				if (iDocumentId === undefined)
				{
					oSearch.addFilter('url', 'EQUAL_TO', 'carTemplate-' + ns1blankspace.user.contactBusiness);
				}
				else
				{
					oSearch.addFilter('id', 'EQUAL_TO', iDocumentId);
				}

				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK') 
					{	
						if (oResponse.data.rows.length > 0)
						{
							oParam.documentContent = oResponse.data.rows[0].content.formatXHTML();
							if (oParam.documentContent != '')
							{
								oParam.documentId = oResponse.data.rows[0].id;
								nsFreshcare.data.documentEmailCARTemplate = oParam.documentId;
							}
							else
							{
								oParam.documentId = nsFreshcare.data.documentCARTemplateDefault;
							}
						}
						else
						{	oParam.documentId = nsFreshcare.data.documentCARTemplateDefault; 	}
						nsFreshcare.external.freshcareprofile.carTemplate(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
				
			}
			else
			{
				$('#ns1blankspaceMainCARTemplate').attr('data-loading', '');
				
				// v2.0.4 SUP021408 Add email preview (send to CB)
				if (nsFreshcare.data.documentEmailCARTemplate != undefined 
					&& oParam.documentId === nsFreshcare.data.documentEmailCARTemplate)
				{
					aHTML = [];
					aHTML.push('<table><tr><td style="width:75%;">&nbsp;</td>' +
								'<td><span id="ns1blankspaceCARTemplatePreview""' +
								' class="ns1blankspaceAction" style="text-align:right;"></span></td></tr>' +
								'</table>');
					$('#ns1blankspaceCARTemplateRow1').html(aHTML.join(''));

					$('#ns1blankspaceCARTemplatePreview')
						.button({label: 'Send Preview Email'})
						.click(function()
						{
							var sData = 'to=' + ns1blankspace.util.fs(ns1blankspace.user.email) +
										'&subject=' + ns1blankspace.util.fs('[Audit Membership] Audit - Outstanding CARs Reminder') + 
										'&applysystemtemplate=N' +
										'&document=' + ns1blankspace.util.fs(nsFreshcare.data.documentEmailCARTemplate);
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.message('Email sent to ' + ns1blankspace.user.email)
									}
									else
									{
										ns1blankspace.status.error('Email not sent: ' + ns1blankspace.error.errornotes);
									}
								}
							});
						});
				}

				var sHTML = sDocumentContent;
				aHTML = [];

				for (edId in tinyMCE.editors) 
										tinyMCE.editors[edId].destroy(true);
									
				ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;

				aHTML.push('<table class="ns1blankspace">');
						
				aHTML.push('<tr><td class="ns1blankspaceSummary" style="font-size:75%;"><br />' +
								((oParam.documentId === nsFreshcare.data.documentCARTemplateDefault) 
									? 'A default email template has been provided above.<br /><br />' 
									: '') + 
							  	'If you attach your logo or any other images on the Images tab (in the Email Template Images section), ' +
							  	'you can insert it into this template by clicking the Insert/Edit Image icon. <br /><br />' +
								'You can also insert the following merge fields into your email as follows (copied exactly as shown below): <br /><br />' +
								'[TEMPLATE_GROWERFIRSTNAME]<br />' +
								'[TEMPLATE_GROWERSURNAME]<br />' +
								'[TEMPLATE_GROWERTRADINGNAME]<br />' +
								'[TEMPLATE_MEMBERSHIP]<br />' +
								'[TEMPLATE_AUDITDATE]<br />' +
								'[TEMPLATE_AUDITORNAME]<br />' +
								'[TEMPLATE_OPENCARSALL]<br />' +
								'[TEMPLATE_OPENCARSMAJOR]<br />' +
								'[TEMPLATE_OPENCARSMINOR]<br />' +
							'</td></tr></table>');

				$('#ns1blankspaceCARTemplateRow3').html(aHTML.join(''));

				aHTML = [];
			
				aHTML.push('<table class="ns1blankspace">');
						
				aHTML.push('<tr class="ns1blankspaceMainTextMulti">' +
								'<td class="ns1blankspaceMainTextMulti">' +
								'<textarea rows="10" cols="60" name="ns1blankspaceCARTemplateText"' + 
								' id="ns1blankspaceCARTemplateText' + ns1blankspace.counter.editor +
								'" class="ns1blankspaceTextMultiLarge tinymceAdvanced"></textarea>' +
								'</td></tr>');
								
				aHTML.push('</table>');					
				
				$('#ns1blankspaceCARTemplateRow2').html(aHTML.join(''));

				
				nsFreshcare.external.freshcareprofile.data.emailCARTemplateEditor = 'ns1blankspaceCARTemplateText' + ns1blankspace.counter.editor;
				$('#ns1blankspaceCARTemplateText' + ns1blankspace.counter.editor).val(sHTML);
					
				tinyMCE.init(
				{
					mode : "none",
					height : "415px", 
					width : "100%",
					theme : "advanced",

					theme_advanced_path : false,

					plugins : "table,advimage,advlink,emotions,iespell,insertdatetime,templateFields,preview,media,fullscreen,print,visualchars,nonbreaking,pagebreak,style,paste,searchreplace,print,contextmenu", 

					theme_advanced_buttons1_add_before : "forecolor,backcolor", 
					theme_advanced_buttons1_add : "fontselect,fontsizeselect", 
			 
					theme_advanced_buttons2_add : "separator,insertdate,inserttime,preview,zoom,separator,nonbreaking,pagebreak,visualchars", 
					theme_advanced_buttons2_add_before: "cut,copy,paste,pasteword,separator,search,replace,separator", 
					
					theme_advanced_buttons3_add_before : "tablecontrols,separator", 
					theme_advanced_buttons3_add : "emotions,iespell,fullscreen,print,templateFields,media,selectall,advhr",
			 
					
					plugin_insertdate_dateFormat : "%d-%m-%y", 
					plugin_insertdate_timeFormat : "%H:%M:%S", 
				
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_resizing : true,
				
					font_size_style_values : "8pt,10pt,12pt,14pt,18pt,24pt,36pt",
					
					extended_valid_elements : "style,input[accept|accesskey|align<bottom?left?middle?right?top|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|onblur|onchange|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|size|style|tabindex|title],ol[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|start|style|title|type],div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],li[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title|type|value],iframe[src|width|height|name|align|frameborder|scrolling|marginheight|marginwidth]",

					fullscreen_new_window : true, 
					fullscreen_settings : 
					{ 
						theme_advanced_path_location : "top" 
					}, 
					relative_urls : false, 
					remove_script_host : false, 
					convert_urls : false, 
					visual : true, 
					gecko_spellcheck : true,
					content_css : ns1blankspace.xhtml.editorCSS,
					
					external_link_list_url : "/ondemand/core/?method=CORE_EDITOR_LINK_SEARCH", 
					external_image_list_url : "/ondemand/core/?method=CORE_EDITOR_IMAGE_SEARCH&excludesite=1&object=12&objectcontext=" + ns1blankspace.user.contactBusiness, 
					media_external_list_url : "/ondemand/core/?method=CORE_EDITOR_MEDIA_SEARCH&object=12&objectcontext=" + ns1blankspace.user.contactBusiness,

					TemplateLinkType : "0"

				});				
				
				tinyMCE.execCommand('mceAddControl', false, 'ns1blankspaceCARTemplateText' + ns1blankspace.counter.editor);	
			}	
		}	

	},

	certificateImages: function(oParam)
	{
		// We need to display and allow user to add / change images for Email Template Logo, Certificate Logo and Certificate Signature
		var aHTML = [];
		var oResponse;
		var oCertificateLogo;
		var oCertificateSignature;

		if (oParam) 
		{
			if (oParam.response) {oResponse = oParam.response}
		}
		else {oParam = {}}

		//if ($('#ns1blankspaceMainImages').attr('data-loading') === '1')
		//{

			if (oResponse === undefined) 
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_ATTACHMENT_SEARCH';
				oSearch.addField('attachment,link,filename,publiclocation,type,typetext,description,publictype');
				oSearch.addFilter('type', 'IN_LIST', nsFreshcare.data.attachmentTypeSignature + ',' + nsFreshcare.data.attachmentTypeLogo + ',' + nsFreshcare.data.attachmentTypeEmailImages);
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectBusiness);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.sort('type', 'asc');
				oSearch.sort('createddate', 'desc');
				//oSearch.addFilter('description', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						nsFreshcare.external.freshcareprofile.certificateImages(oParam);
					}
				});
			}
			else
			{
				$('#ns1blankspaceMainImages').attr('data-loading', '');
				
				oCertificateLogo = $.grep(oResponse.data.rows, function(x) {return x.type === nsFreshcare.data.attachmentTypeLogo}).shift();
				oCertificateSignature = $.grep(oResponse.data.rows, function(x) {return x.type === nsFreshcare.data.attachmentTypeSignature}).shift();

				aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceImagesRow1" class="ns1blankspaceColumn1Large"></td></tr>' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceImagesRow2" class="ns1blankspaceColumn1Large"></td></tr>' +
								'</tr></table>');					
				
				$('#ns1blankspaceMainImages').html(aHTML.join(''));
				
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspace" style="width:100%;">');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption" colspan="3">' +
								'Certificate Logo' +
								'</td></tr>');
							
				aHTML.push('<tr class="ns1blankspace">' +
								'<td>' +
									'<table style="width:100%; padding: 10px; border: 1px solid #CCCCCC;"><tr>' +
										'<td id="ns1blankspaceImagesLogoImage"' +
										' style="width:170px; height:80px; border:1px solid #DCDCDC; text-align: left; vertical-align: left;">');
				
				aHTML.push('<a href="#" id="ns1blankspaceImagesLogoFilenameBrowse"' +
							((oCertificateLogo) ? ' data-attachmentid="' + oCertificateLogo.attachment + '"' : '') + '>' +
							((oCertificateLogo) ? '<img src="' + oCertificateLogo.publiclocation + '" border="1" />' : 'Click to choose file') + '</td>' +
							'<td id="ns1blankspaceImagesLogoFilename" style="padding-left: 10px; font-style: italic; font-size: 0.75em;">' +
								((oCertificateLogo) ? oCertificateLogo.filename.formatXHTML() : '&nbsp;') + '</td>');
				
				aHTML.push('</tr></table></td></tr>');

				aHTML.push('<tr><td>&nbsp;</td></tr>')


				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption" colspan="3">' +
								'Certificate Signature' +
								'</td></tr>');
							
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceReadOnly">' +
								'<table style="width:100%; padding: 10px; border: 1px solid #CCCCCC;"><tr>' +
									'<td id="ns1blankspaceImagesSignatureImage"' +
									' style="width:170px; height:80px; border:1px solid #DCDCDC; text-align: left; vertical-align: left;">');
				
				aHTML.push('<a href="#" id="ns1blankspaceImagesSignatureFilenameBrowse"' +
							((oCertificateSignature) ? ' data-attachmentid="' + oCertificateSignature.attachment + '"' : '') + '>' +
							((oCertificateSignature) ? '<img src="' + oCertificateSignature.publiclocation + '" border="1" />' : 'Click to choose file') + '</td>' +
							'<td id="ns1blankspaceImagesSignatureFilename" style="padding-left: 10px; font-style: italic; font-size: 0.75em;">' +
								((oCertificateSignature) ? oCertificateSignature.filename.formatXHTML() : '&nbsp;') + '</td>');
				
				aHTML.push('</tr></table></td></tr>');

				aHTML.push('<tr><td>&nbsp;</td></tr>');
				

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption" colspan="3">' +
								'Email Template Images' +
								'</td></tr>');
							
				aHTML.push('</table>');

				$('#ns1blankspaceImagesRow1').html(aHTML.join(''));

				ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceImagesRow2',
												attachmentType: nsFreshcare.data.attachmentTypeEmailImages,
												object: nsFreshcare.objectBusiness,
												objectContext: ns1blankspace.user.contactBusiness,
												showAdd: true,
												functionPostUpdate: nsFreshcare.external.freshcareprofile.certificateImages,
												inputs: ['publictype'],
												publicType: '2'
											}); 							

				$('#ns1blankspaceImagesLogoFilenameBrowse').click(function() 
				{
					var sAttachmentId = $(this).attr('data-attachmentid');
					var aInputParams = (sAttachmentId) ? [{id: 'id', value: sAttachmentId}] : [];

					$('#ns1blankspaceImagesLogoImage').html(ns1blankspace.attachments.upload.show({object: nsFreshcare.objectBusiness,
																		objectContext: ns1blankspace.data.contactBusiness,
																		attachmentType: nsFreshcare.data.attachmentTypeLogo,
																		url: '/rpc/attach/?method=ATTACH_FILE&rf=TEXT',
																		publicType: '2',
																		inputParams: aInputParams
																	}));

					$('#ns1blankspaceUpload').button(
						{
							label: "Upload"
						})
						.click(function() {
							 nsFreshcare.external.freshcareprofile.uploadImages.process({functionPostUpdate: nsFreshcare.external.freshcareprofile.certificateImages});
						});
				});	

				$('#ns1blankspaceImagesSignatureFilenameBrowse').click(function() 
				{
					/*$('#ns1blankspaceImagesSignatureImage').html(nsFreshcare.external.freshcareprofile.attachImages.show({context: 'Signature',
																		  attachmentType: nsFreshcare.data.attachmentTypeEmailImages}));*/

					var sAttachmentId = $(this).attr('data-attachmentid');
					var aInputParams = (sAttachmentId) ? [{id: 'id', value: sAttachmentId}] : [];

					$('#ns1blankspaceImagesSignatureImage').html(ns1blankspace.attachments.upload.show({object: nsFreshcare.objectBusiness,
																		objectContext: ns1blankspace.data.contactBusiness,
																		attachmentType: nsFreshcare.data.attachmentTypeSignature,
																		url: '/rpc/attach/?method=ATTACH_FILE&rf=TEXT',
																		publicType: '2',
																		inputParams: aInputParams
																	}));

					$('#ns1blankspaceUpload').button(
						{
							label: "Upload"
						})
						.click(function() {
							 nsFreshcare.external.freshcareprofile.uploadImages.process({functionPostUpdate: nsFreshcare.external.freshcareprofile.certificateImages});
						});
				});	
			}	
		//}

	},

	uploadImages:
	{
		process: function(oParam)
		{
				ns1blankspace.param = {};
				if (oParam != undefined) {ns1blankspace.param = oParam};
				
				$('#ns1blankspaceUploadStatus').html('Uploading..');
				var oForm = document.ns1blankspaceFileUpload;
			  	oForm.submit();
			 	nsFreshcare.external.freshcareprofile.uploadImages.status();
				ns1blankspace.timer.delay = setInterval('nsFreshcare.external.freshcareprofile.uploadImages.status()', 1000);
		},

		status:		function (oParam)
		{
			var oDivStatus = document.getElementById('ns1blankspaceFileUploadStatus');
			var oFrame = document.getElementById('ns1blankspaceUploadProxy');
			var sStatus;
			var sCurrentState;

			var fFunctionPostUpdate = ns1blankspace.attachments.show;
			
			if (ns1blankspace.param != undefined)
			{
				if (ns1blankspace.param.functionPostUpdate != undefined) {fFunctionPostUpdate = ns1blankspace.param.functionPostUpdate}
			}
			
			if (oFrame !== null)
			{	
				if (oFrame.contentDocument.body.innerHTML != '') 
				{
					if (oFrame.contentDocument.body.innerHTML.split('|').shift() === 'OK')
					{	sCurrentState = 'complete';	}
				}
				else 
				{
					sCurrentState = oFrame.contentDocument.body.innerHTML;
				}
			}	
		 
			if (sCurrentState === 'complete') 
			{
				clearInterval(ns1blankspace.timer.delay);

				if (oDivStatus != null)
				{
					oDivStatus.setAttribute("class", "");
					oDivStatus.style.display = 'none';
				}
				
				$('#ns1blankspaceUploadStatus').html('File Upload Complete...');
				fFunctionPostUpdate();
				
			}
		}
	},

	save: 		
	{
		validate: function(oParam) 
		{

			ns1blankspace.okToSave = true;

			if ($('#ns1blankspaceMainDetails').html() != '')
			{
				// Set defaults
				if ($('#ns1blankspaceDetailsLegalNameUpdate').val() == '' && $('#ns1blankspaceDetailsTradingNameUpdate').val() != '') 
				{
					$('#ns1blankspaceDetailsLegalNameUpdate').val($('#ns1blankspaceDetailsTradingNameUpdate').val());
				}

				// Validate that they've entered mandatory fields 
				$($.grep($('input'), function (a) {return $(a).attr('id').indexOf('ns1blankspaceDetails') > -1;})).each( function() 
				{

					//v1.0.26 added check for data-id on mandatory combos
					if ($(this).attr('data-mandatory') === '1' 
						&& ($(this).val() === ''
					   		|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) 
					{

						// Find the caption first - either the data-caption attribute or whatever's left on the id after ns1blankspaceDetails
						var sCaption = $(this).attr('data-caption');
						if (sCaption === undefined) {
							sCaption = $(this).attr('id').substr('ns1blankspaceDetails'.length);
						}
						if (sCaption === undefined) { sCaption = $(this).attr('id');}

						ns1blankspace.status.message(sCaption + ' is mandatory.');
						ns1blankspace.okToSave = false;
						return false;		// Discontinue the loop - check one at a time 
					}
				});
			}

			if (ns1blankspace.okToSave) 
			{

				if ($('#ns1blankspaceMainAddress').html() != '') 
				{
					// Check mandatory address fields
					var aMandatoryAddressFields = [];
					aMandatoryAddressFields.push('Address1');
					aMandatoryAddressFields.push('Suburb');
					aMandatoryAddressFields.push('State');
					aMandatoryAddressFields.push('PostCode');

					for (var i = 0; i < 2; i++) 
					{
						
						if (ns1blankspace.okToSave) {
							$(aMandatoryAddressFields).each(function() {

								if ($('#ns1blankspaceAddress' + ((i === 0) ? 'Street' : 'Mailing') + this + 'Update').val() === '') {

									ns1blankspace.status.message(((i === 0) ? 'Street ' : 'Mailing ') + this + ' is mandatory.');
									ns1blankspace.okToSave = false;
									return false;		// Discontinue the loop
								}
							});
						}
					}
				}
			}

			if (ns1blankspace.okToSave) 
			{

				if ($('#ns1blankspaceMainAccreditation').html() != '') {
					// Check if at least one State selected
					if ($.grep($('.nsFreshcareState'), function(a) {return $(a).hasClass('nsFreshcareSelected')}).length === 0) {
						ns1blankspace.status.message('You must choose at least one State.');
						ns1blankspace.okToSave = false;
						return; 
					}

				}
			}

			if (ns1blankspace.okToSave)
			{
				oParam.profileSaveStep = 2;
				nsFreshcare.external.freshcareprofile.save.send(oParam);
			}

		}, 

		documentToFolder: function(oParam)
		{
			var sFolder;
			var sDocument;
			var sLink;

			if (oParam)
			{
				if (oParam.folder) {sFolder = oParam.folder}
				if (oParam.document) {sDocument = oParam.document}
				if (oParam.link != undefined) {sLink = oParam.link}
			}

			if (sDocument && sFolder)
			{
				if (sLink === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'DOCUMENT_FOLDER_LINK_SEARCH';
					oSearch.addField('document,folder');
					oSearch.addFilter('document', 'EQUAL_TO', sDocument);
					oSearch.addFilter('folder', 'EQUAL_TO', sFolder);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								delete(oParam.document);
								delete(oParam.folder);
								ns1blankspace.util.onComplete(oParam);
							}
							else
							{
								oParam.link = '';
								nsFreshcare.external.freshcareprofile.save.documentToFolder(oParam);
							}
						}
						else
						{
							ns1blankspace.status.error('Error finding document folder: ' + oResponse.error.errornotes);
						}
					});
				}

				else
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('DOCUMENT_FOLDER_LINK_MANAGE'),
						data: 'folder=' + sFolder + '&document=' + sDocument,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								delete(oParam.document);
								delete(oParam.folder);
								delete(oParam.link);
								ns1blankspace.util.onComplete(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving document to folder: ' + oResponse.error.errornotes);
							}

						}
					});
				}
			}
		},

		replaceContentImages: function(oParam, oResponse)
		{
			var sContent = ns1blankspace.util.getParam(oParam, 'content', {'default': ''}).value;;
			var aAttachments = ns1blankspace.util.getParam(oParam, 'attachmentList', {'default': []}).value;		// List of ids to find the public attachment location

			var aContent = [];
			var oRoot = ns1blankspace.rootnamespace;
			// 3.0.0a Added as not all browser versions like window.lcoation.origin
			var sBaseURL = window.location.href.split('://').pop();		
			sBaseURL = window.location.href.split('://').shift() + '://' + sBaseURL.split('/').shift();
			var sURL = ($.inArray(oRoot.site, oRoot.sitesDev.split(',')) > -1) 
						? sBaseURL 
						: 'https://' + ns1blankspace.rootnamespacetext.replace('ns', '') + '.1blankspace.com';

			if (oResponse === undefined)
			{
				aContent = sContent.split(' src="');
				$.each(aContent, function(index, contentData)
				{
					// Check if contentData is an img src that we need to change
					if (contentData.substr(0,10) === '/security/')
					{
						var sSrc = contentData.split('"').shift();
						var iAttachment = sSrc.split('AttachmentId=').pop();		// It's the last thing in the src
						
						if ($.grep(aAttachments, function(x) {return x.id == iAttachment}).length == 0)
						{	aAttachments.push({id: iAttachment});	}

						aContent[index] = 'public_' + iAttachment + '"' + contentData.substr(sSrc.length + 1);
					}
				});
				sContent = aContent.join(' src="');

				if (aAttachments.length > 0)		// We need to replace the img src, so go and find the location first
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_ATTACHMENT_SEARCH';
					oSearch.addField('attachment,publiclocation,filename');
					oSearch.addFilter('attachment', 'IN_LIST', $.map(aAttachments, function(x) {return x.id}).join(','));
					oSearch.rows = 40;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (oResponse.data.rows.length === aAttachments.length)
							{
								aAttachments = oResponse.data.rows;
								oParam.attachmentList = aAttachments;
								oParam.content = sContent;
								nsFreshcare.external.freshcareprofile.save.replaceContentImages(oParam, oResponse);
							}
							else
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.container.confirm({html: 'At least one of your images in the Certificate Template are invalid. Please reload the images and try again.'});
							}
						}
					});
				}
				else
				{
					delete(oParam.attachmentList);
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
			}

			// Now replace the public_[attachmentid] with the publiclocation for each attachment
			else
			{
				$.each(aAttachments, function(index, attachment)
				{
					for (i = 0; (sContent.split('public_' + attachment.attachment).length - 1); i++)
					{
						sContent = sContent.replace('public_' + attachment.attachment, sURL + attachment.publiclocation);
					}
				});

				tinyMCE.get(oParam.editor).setContent(sContent);
				delete(oParam.editor);
				delete(oParam.attachmentList);
				ns1blankspace.okToSave = true;
				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}

		},

		send: 	function (oParam)
		{
			// External users can update their profile but it all occurs via email.
			// With the exception of the CB's Certificate Email Template and logo / signature attachments
			// Also direct updates when admin switched-in updating SelfCertification & JASANZ dates

			var oElements = [];
			var oChangedElements;
			var aMessageHTML = [];
			var sTemplateData = '';
			var iProfileSaveStep = 1;
			var sBusinessData = '';

			if (oParam) 
			{
				 if (oParam.profileSaveStep === undefined) {oParam.profileSaveStep = 1;}
			}
			else {oParam = {profileSaveStep: 1}}

			// Validate
			if (oParam.profileSaveStep === 1)
			{
				ns1blankspace.okToSave = true;
				nsFreshcare.external.freshcareprofile.save.validate(oParam);
			}

			// Save direct changes (for CB's updating Certificate Template)
			else if (ns1blankspace.okToSave && oParam.profileSaveStep === 2)
			{
				if ($('#ns1blankspaceMainCertificateTemplate').html() != '') 
				{
					// we have a record already, just update the content
					if (nsFreshcare.data.documentEmailCertificateTemplate != undefined && nsFreshcare.data.documentEmailCertificateTemplate != nsFreshcare.data.documentCertificateTemplateDefault)
					{
						sTemplateData += 'id=' + nsFreshcare.data.documentEmailCertificateTemplate;
					}		
					else 	// New document - set required values
					{
						sTemplateData += 'url=' + ns1blankspace.user.contactBusiness +
										'&title=' + ns1blankspace.util.fs('Certificate Email Template - ' + ns1blankspace.user.contactBusinessText) +
										'&public=Y&status=2';
					}						
					
					// 3.0.1 SUP021730 Images not showing in emails as img src doesn't refer to public doc so need to replace (agghhh!)
					// We know we have an image we need to replace in there somewhere
					if (tinyMCE.get(nsFreshcare.external.freshcareprofile.data.emailCertificateTemplateEditor).getContent().indexOf(' src="/security/') > -1)
					{
						ns1blankspace.okToSave = false;
						sTemplateData = '';		// Stop code from going into next section
						oParam.content = tinyMCE.get(nsFreshcare.external.freshcareprofile.data.emailCertificateTemplateEditor).getContent();
						oParam.editor = nsFreshcare.external.freshcareprofile.data.emailCertificateTemplateEditor;
						oParam.onComplete = nsFreshcare.external.freshcareprofile.save.send;
						nsFreshcare.external.freshcareprofile.save.replaceContentImages(oParam);
					}
					else
					{
						sTemplateData += '&content=' + ns1blankspace.util.fs(tinyMCE.get(nsFreshcare.external.freshcareprofile.data.emailCertificateTemplateEditor).getContent());
					}
				}

				if (sTemplateData != '')
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('DOCUMENT_MANAGE'),
						data: sTemplateData,
						dataType: 'JSON',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.templateData = sTemplateData;
								oParam.profileSaveStep = 3;
								ns1blankspace.status.message('Certificate email template saved');
								nsFreshcare.data.documentEmailCertificateTemplate = oResponse.id;		//v2.0.3f SUP021385

								// v2.0.4 SUP021408 Now saves template to Templates folder
								oParam.onComplete = nsFreshcare.external.freshcareprofile.save.send;
								oParam.document = nsFreshcare.data.documentEmailCertificateTemplate;
								oParam.folder = nsFreshcare.data.folderDocumentTemplates;
								nsFreshcare.external.freshcareprofile.save.documentToFolder(oParam);
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
							}
						}
					});
				}
				else if (ns1blankspace.okToSave)
				{
					oParam.profileSaveStep = 5;
					nsFreshcare.external.freshcareprofile.save.send(oParam);
				}
			}

			// Save direct changes (for CB's updating CAR Template)
			else if (ns1blankspace.okToSave && oParam.profileSaveStep === 3)
			{
				// v2.0.4 SUP021408 Now saves CAR Template as well
				if ($('#ns1blankspaceMainCARTemplate').html() != '') 
				{
					// we have a record already, just update the content
					if (nsFreshcare.data.documentEmailCARTemplate != undefined && nsFreshcare.data.documentEmailCARTemplate != nsFreshcare.data.documentCARTemplateDefault)
					{
						sTemplateData += 'id=' + nsFreshcare.data.documentEmailCARTemplate;
					}		
					else 	// New document - set required values
					{
						sTemplateData += 'url=' + ns1blankspace.util.fs('carTemplate-' + ns1blankspace.user.contactBusiness) +
										'&title=' + ns1blankspace.util.fs('CAR Email Template - ' + ns1blankspace.user.contactBusinessText) +
										'&public=Y&status=2';
					}						
					
					// 3.0.1 SUP021730 Images not showing in emails as img src doesn't refer to public doc so need to replace (agghhh!)
					// We know we have an image we need to replace in there somewhere
					if (tinyMCE.get(nsFreshcare.external.freshcareprofile.data.emailCARTemplateEditor).getContent().indexOf(' src="/security/') > -1)
					{
						ns1blankspace.okToSave = false;
						sTemplateData = '';		// Stop code from going into next section
						oParam.content = tinyMCE.get(nsFreshcare.external.freshcareprofile.data.emailCARTemplateEditor).getContent();
						oParam.editor = nsFreshcare.external.freshcareprofile.data.emailCARTemplateEditor;
						oParam.onComplete = nsFreshcare.external.freshcareprofile.save.send;
						nsFreshcare.external.freshcareprofile.save.replaceContentImages(oParam);
					}
					else
					{
						sTemplateData += '&content=' + ns1blankspace.util.fs(tinyMCE.get(nsFreshcare.external.freshcareprofile.data.emailCARTemplateEditor).getContent());
					}
				}

				if (sTemplateData != '')
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('DOCUMENT_MANAGE'),
						data: sTemplateData,
						dataType: 'JSON',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.templateData = sTemplateData;
								oParam.profileSaveStep = 5;		// v3.1.2 Step 4 was to save Cb No, Self-Cert & JASANZ dates but now removed
								ns1blankspace.status.message('CAR email template saved');
								nsFreshcare.data.documentEmailCARTemplate = oResponse.id;	

								oParam.onComplete = nsFreshcare.external.freshcareprofile.save.send;
								oParam.document = nsFreshcare.data.documentEmailCARTemplate;
								oParam.folder = nsFreshcare.data.folderDocumentTemplates;
								nsFreshcare.external.freshcareprofile.save.documentToFolder(oParam);
									
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
							}
						}
					});
				}
				else if (ns1blankspace.okToSave)
				{
					oParam.profileSaveStep = 5;
					nsFreshcare.external.freshcareprofile.save.send(oParam);
				}
			}

			else if (ns1blankspace.okToSave && oParam.profileSaveStep === 5) 	
			{
				// All remaining changes are sent via email...

				if ($('#ns1blankspaceMainDetails').html() != '') 
				{
					oElements.push({element: 'TradingName', caption: 'Trading Name'});
					oElements.push({element: 'LegalName', caption: 'Legal Name'});
					oElements.push({element: 'ABN', caption: 'ABN'});
					oElements.push({element: 'FirstName', caption: 'First Name'});
					oElements.push({element: 'Surname', caption: 'Surname'});
					oElements.push({element: 'Phone', caption: 'Phone'});
					oElements.push({element: 'Mobile', caption: 'Mobile'});
					oElements.push({element: 'Fax', caption: 'Fax'});
					oElements.push({element: 'Email', caption: 'Email'});
					// If we're an Auditor, send Certification Body Number
					if (nsFreshcare.user.role.toLowerCase() === 'auditor')
					{
						oElements.push({element: 'CertificationBodyNumber', caption: 'Certification Body Number'});
					}

					oChangedElements = $.grep(oElements, function(a) 
					{
						var sOriginal = ($('#ns1blankspaceDetails' + a.element).html() === '&nbsp;') ? '' : $('#ns1blankspaceDetails' + a.element).html();
						return $('#ns1blankspaceDetails' + a.element + 'Update').val() != sOriginal;
					});

					if (oChangedElements.length > 0) 
					{

						$.each(oChangedElements, function() 
						{

							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: this.caption,
										 oldValue: $('#ns1blankspaceDetails' + this.element).html(), 
										 newValue: $('#ns1blankspaceDetails' + this.element + 'Update').val()
										}));
						});
					}

					if (nsFreshcare.user.role.toLowerCase() === 'trainer') 
					{
						// They can select 'show on website' fields
						if ($('#ns1blankspaceWebsiteShowPhoneUpdate').attr('data-show') != $('#ns1blankspaceWebsiteShowPhone').attr('data-show')) {
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: 'Show Phone on website?',
										 oldValue: $('#ns1blankspaceWebsiteShowPhone').attr('data-show'), 
										 newValue: $('#ns1blankspaceWebsiteShowPhoneUpdate').attr('data-show')
										}));
						}

						if ($('#ns1blankspaceWebsiteShowMobileUpdate').attr('data-show') != $('#ns1blankspaceWebsiteShowMobile').attr('data-show')) {
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: 'Show Mobile on website?',
										 oldValue: $('#ns1blankspaceWebsiteShowMobile').attr('data-show'), 
										 newValue: $('#ns1blankspaceWebsiteShowMobileUpdate').attr('data-show')
										}));
						}
					}

					if ($('#ns1blankspaceDetailsNotesUpdate').val != '') 
					{
						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Notes',
									oldValue: '', newValue: $('#ns1blankspaceDetailsNotesUpdate').val()}));
					}
				}

				if ($('#ns1blankspaceMainAddress').html() != '') 
				{

					oElements = [];
					oElements.push({element: 'StreetAddress1', caption: 'Street Address 1'});
					oElements.push({element: 'StreetAddress2', caption: 'Street Address 2'});
					oElements.push({element: 'StreetSuburb', caption: 'Street Suburb'});
					oElements.push({element: 'StreetState', caption: 'Street Post Code'});
					oElements.push({element: 'StreetCountry', caption: 'Street Country'});
					oElements.push({element: 'MailingAddress1', caption: 'Mailing Address 1'});
					oElements.push({element: 'MailingAddress2', caption: 'Mailing Address 2'});
					oElements.push({element: 'MailingSuburb', caption: 'Mailing Suburb'});
					oElements.push({element: 'MailingState', caption: 'Mailing Post Code'});
					oElements.push({element: 'MailingCountry', caption: 'Mailing Country'});

					oChangedElements = $.grep(oElements, function(a) {
						var sOriginal = ($('#ns1blankspaceAddress' + a.element).html() === '&nbsp;') ? '' : $('#ns1blankspaceAddress' + a.element).html();
						return $('#ns1blankspaceAddress' + a.element + 'Update').val() != sOriginal;
					});

					if (oChangedElements.length > 0) {

						$.each(oChangedElements, function() {

							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: this.caption,
										 oldValue: $('#ns1blankspaceAddress' + this.element).html(), 
										 newValue: $('#ns1blankspaceAddress' + this.element + 'Update').val()
										}));
						});
					}
				}

				if ($('#ns1blankspaceMainContacts').html() != '') 
				{

					// ToDo: If any new contacts, add them and send updates for existing contacts
					var bChanged = false;
					var sOldContact = '';
					var sNewContact = '';

					$('tr.ns1blankspaceContactRow').each(function() {

						var sRowID = this.id.split('_')[1];

						if ($(this).attr('data-type') === 'new') 
						{
							// A new contact

							sNewContact = $('#ns1blankspaceContactFirstName_' + sRowID).val() + 
										  $('#ns1blankspaceContactSurname_' + sRowID).val() + 
										  $('#ns1blankspaceContactSurname_' + sRowID).val() +
										  $('#ns1blankspaceContactMobile_' + sRowID).val() +
										  $('#ns1blankspaceContactPhone_' + sRowID).val(); 

							if (sNewContact.length > 0) 
							{
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
											{label: 'Contact',
											 oldValue: '[New Contact]', 
											 newValue: '<table>' +
											 			 	'<tr><td style="font-weight:bold;">Name</td>' + 
											 			 		'<td>' + $('#ns1blankspaceContactFirstName_' + sRowID).val() + ' ' + $('#ns1blankspaceContactSurname_' + sRowID).val() + '</td></tr>' +
											 			 	'<tr><td style="font-weight:bold;">Email</td>' +
											 			 		'<td>' + $('#ns1blankspaceContactEmail_' + sRowID).val() + '</td></tr>' +
											 			 	'<tr><td style="font-weight:bold;">Mobile</td>' +
											 			 		'<td>' + $('#ns1blankspaceContactMobile_' + sRowID).val() + '</td></tr>' +
											 			 	'<tr><td style="font-weight:bold;">Phone</td>' +
											 			 		'<td>' + $('#ns1blankspaceContactPhone_' + sRowID).val() + '</td></tr>' +
											 			 '</table>'
											}));
							}
						}
						else 
						{
							// An existing contact - let's check if it's been changed

							if ($('#ns1blankspaceContactName_' + sRowID).css('text-decoration') == 'line-through') 
							{
								// A deleted record

								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
											{label: 'Contact',
											 oldValue: $('#ns1blankspaceContactName_' + sRowID).html(), 
											 newValue: 'Contact to be removed.'
											}));
							}
							else 
							{

								sNewContact = '<table>' +
								 			 	'<tr><td style="font-weight:bold;">Name</td>' + 
								 			 		'<td>' + $('#ns1blankspaceContactValue_name_' + sRowID).html() + '</td></tr>' +
											  	'<tr><td style="font-weight:bold;">Email</td>' +
											 		'<td>' + $('#ns1blankspaceContactValue_email_' + sRowID).html() + '</td></tr>' +
											  	'<tr><td style="font-weight:bold;">Mobile</td>' +
											 		'<td>' + $('#ns1blankspaceContactValue_mobile_' + sRowID).html() + '</td></tr>' +
											  	'<tr><td style="font-weight:bold;">Phone</td>' +
											 		'<td>' + $('#ns1blankspaceContactValue_phone_' + sRowID).html() + '</td></tr>' +
											   '</table>';
								
								var oContact = $.grep(ns1blankspace.objectContextData.contacts, function(a) { return a.id == sRowID;});
								
								if (oContact.length > 0) 
								{
									oContact = oContact[0];
									sOldContact = '<table>' +
									 			 	'<tr><td style="font-weight:bold;">Name</td>' + 
									 			 		'<td>' + oContact['contactperson.firstname'] + ' ' + oContact['contactperson.surname'] + '</td></tr>' +
												  	'<tr><td style="font-weight:bold;">Email</td>' +
											 			'<td>' + oContact['contactperson.email'] + '</td></tr>' +
												  	'<tr><td style="font-weight:bold;">Mobile</td>' +
											 			'<td>' + oContact['contactperson.mobile'] + '</td></tr>' +
												  	'<tr><td style="font-weight:bold;">Phone</td>' +
											 			'<td>' + oContact['contactperson.workphone'] +'</td></tr>' +
											 	  '</table>';
								}

								if (sOldContact != sNewContact) 
								{

									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
												{label: 'Contact',
												 oldValue: sOldContact, 
												 newValue: sNewContact
												}));
								}
							}

						}
					});
				}		//Contacts div not blank

				if ($('#ns1blankspaceMainAccreditation').html() != '') 
				{

					var sStatesBefore = ($.map(ns1blankspace.objectContextData.states, function (a) {return a.statetext})).join(', ');
					var sStatesAfter = ($.map($.grep($('.nsFreshcareStateList'), function (a) {return $(a).css('text-decoration') != 'line-through'}), function(a) {return $(a).html().replace('<br>','')})).join(', ');
					if (sStatesBefore != sStatesAfter) {

						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'States where Training offered', 
									oldValue: sStatesBefore, newValue: sStatesAfter}));
					}
			
				}

				if (aMessageHTML.length > 0) 
				{

					// Send email to relevant email address
					var sTo = nsFreshcare.data.emailToAdmin;
					var sFrom = nsFreshcare.data.emailFromAdmin;

					switch (nsFreshcare.user.role.toLowerCase())
					{
						case 'auditor':
							sTo = nsFreshcare.data.emailToAuditor;
							sFrom = nsFreshcare.data.emailFromAuditor;
							break;
						case 'trainer':
							sTo = nsFreshcare.data.emailToTrainer;
							sFrom = nsFreshcare.data.emailFromTrainer;
							break;
						case 'customer':
							sTo = nsFreshcare.data.emailToCustomer;
							sFrom = nsFreshcare.data.emailFromCustomer;
							break;
						case 'grower':
							sTo = nsFreshcare.data.emailToGrower;
							sFrom = nsFreshcare.data.emailFromGrower;
							break;
					}

					nsFreshcare.data.saveError = [];
					ns1blankspace.inputDetected = false;
					nsFreshcare.external.grower.save.sendEmail(
					{
						profileSaveStep: 6,
						updateRows: aMessageHTML,
						to: sTo,
						from: sFrom,
						subject: nsFreshcare.user.role + ' ' + ns1blankspace.data.contactPersonText.formatXHTML() + 
								' from ' + ns1blankspace.data.contactBusinessText.formatXHTML() + ' has updated their Freshcare profile',
						onComplete: nsFreshcare.external.freshcareprofile.save.send
					});

				}
				else if (oParam.templateData === undefined)
				{
					ns1blankspace.status.message('No changes made.');
				}
			}

			// v2.0.4 SUP021691 Tell the user the changes have been sent to Freshcare  
			else if (ns1blankspace.okToSave && oParam.profileSaveStep === 6) 	
			{
				ns1blankspace.container.confirm({title: 'Profile Update', 
												html: 'Thank you for updating your Freshcare Profile. An email has been sent to the Freshcare Office with your requested changes.',
												buttons: [{label: 'OK', text: 'OK', click: function() 
																		{
																			$(this).dialog('destroy'); 
																			nsFreshcare.external.freshcareprofile.init({id: ns1blankspace.user.contactPerson});
																		}
														 }]
												});
			}
		}
	}

}							
