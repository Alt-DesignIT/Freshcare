/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

//v3.1.204 SUP023020 Removed grower.grower,trainer funciton as not used.
nsFreshcare.grower.grower = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'grower';
		ns1blankspace.objectParentName = 'grower';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Freshcare Profile';	
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		delete(nsFreshcare.admin.grower.data.newSiteCount);

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		oParam = ns1blankspace.util.setParam(oParam, "showHome", false);
		ns1blankspace.app.set(oParam);
		
		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
		nsFreshcare.grower.grower.search.send('-' + ns1blankspace.user.contactBusiness, {showHome: false});
	},

	home: 		function (oParam, oResponse)
	{
		nsFreshcare.grower.grower.details();
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
				
				// v3.1.205 Still need to filter on primarycontactperson
				// v3.1.206 SUP023035 No longer searches for person mailing address and searches for notes on business, not person
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.title' +
								',contactbusiness.contactperson.titletext,contactbusiness.contactperson.position,contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 'text,contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 
								',contactbusiness.contactperson.email,contactbusiness.contactperson.workphone,contactbusiness.contactperson.mobile' +
								',contactbusiness.contactperson.fax,contactbusiness.contactperson.gender,contactbusiness.contactperson.gendertext' + 
								',contactbusiness.mailingaddress1,contactbusiness.mailingaddress2,contactbusiness.mailingsuburb,contactbusiness.mailingstate,contactbusiness.mailingpostcode,contactbusiness.mailingcountry' +
								',contactbusiness.notes' +
								',contactbusiness.contactperson.preferredcommunication,contactbusiness.contactperson.preferredcommunicationtext,contactbusiness.contactperson.id' + 
								',contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference'); 

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.addFilter('contactbusiness.primarycontactperson', 'EQUAL_TO', 'field:contactbusiness.contactperson.id')
				oSearch.getResults(function(data) {nsFreshcare.grower.grower.show(oParam, data)});
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
					oSearch.addFilter("id", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.grower.grower.search.process(oParam, data)});
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
					nsFreshcare.grower.grower.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'contactbusiness.tradename-space-contactbusiness.legalname-contactbusiness.contactperson.firstname-space-contactbusiness.contactperson.surname',
					more: oResponse.moreid,
					rows: 40,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.grower.grower.search.send
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext == -1) {}
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
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {all: true, inContext: false}});
			nsFreshcare.grower.grower.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.external.grower.details();
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.external.grower.address.show({step: 1});
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainContacts', context: {new: true, actionOptions: true, inContext: false}});
			//ns1blankspace.show({selector: '#ns1blankspaceMainContacts'});
			// v3.1.205 SUP023021 Now shows contacts 
			nsFreshcare.external.grower.contacts.show(
			{
				contactBusiness: ns1blankspace.objectContext,
				contactPerson: ns1blankspace.objectContextData['contactbusiness.primarycontactperson']
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
			nsFreshcare.grower.grower.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find profile information.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			if (iStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData['id'];
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactbusiness.tradename']
				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['contactbusiness.contactperson.id'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'];
				
				$('#ns1blankspaceViewControlAction').button({disabled: false});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			
				oParam.step = 2;
				oParam.lastAudit = true;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.grower.grower.show);
				oRoot.external.grower.memberships.search(oParam);
			}

			// v2.0.2 Changed from productGroups to growerSites as ProductGroups now at Membership level
			else if (iStep === 2) 
			{
				oParam.step = 3;
				nsFreshcare.admin.grower.membership.layout(oParam);
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.grower.grower.show);		//2.0.4h SUP021613 Was calling trainer.grower.show
				nsFreshcare.admin.grower.siteAddress.search(oParam);
			}


			else if (iStep === 3)
			{
				oParam.step = 4;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.grower.grower.show);
				nsFreshcare.person.groups.search(oParam);
			}

			else if (iStep === 4) 
			{
				oParam.step = 5;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.grower.grower.show);
				nsFreshcare.external.grower.trainers.search(oParam);
			}

			else if (iStep === 5) 
			{
				delete(oParam.step);

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br />' + ns1blankspace.data.contactPersonText.formatXHTML());
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.grower.grower.init({id: ' + ns1blankspace.objectContext + ')',
					move: false
					});
			
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.grower.grower.summary()'});
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
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trading Name</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactbusiness.tradename'] +
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
			
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) 
			{
				aHTML.push('<table class="ns1blankspace">');

				aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Membership</td>' +
								'<td class="ns1blankspaceHeaderCaption">COP</td>' +
								'<td class="ns1blankspaceHeaderCaption">Status</td>' +
								'<td class="ns1blankspaceHeaderCaption">Last Audit</td>' +
								'<td class="ns1blankspaceHeaderCaption">Expires</td>' +
							'<tr>');
				
				var bAuditPaidNote = false;		// v3.1.207 SUP023057 Added

				$.each(ns1blankspace.objectContextData.memberships, function() 
				{
					// Shade expired certificates
					var dToday = new Date();
					var dExpiry = (this['agrisubscription.agricertificate.enddate'] != '') 
									? (new Date(this['agrisubscription.agricertificate.enddate'])) 
									: undefined;
					var bCertified = (dExpiry && dExpiry > dToday);
					bAuditPaidNote = (!bAuditPaidNote && this['agrisubscription.agrilastaudit.paid'] == 'N') ? true : bAuditPaidNote;

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
					// v3.1.207 SUP023057 Added asterisk and note if not paid
					aHTML.push('<td class="ns1blankspaceRow' + 
									(this['agrisubscription.lastauditdate'] != '' && this['agrisubscription.agrilastaudit.paid'] == 'N' 
										? ' ns1blankspaceError' 
										: (bCertified ? '' : ' nsFreshcareNotCertified')) + 
									'">' +
									this['agrisubscription.lastauditdate'] + 
									(this['agrisubscription.agrilastaudit.paid'] == 'N' ? '*' : '') +
									'</td>');			
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricertificate.enddate'] + '</td>');			
					aHTML.push('</tr>');
				});
				aHTML.push('</table>'); 

				if (bAuditPaidNote)
				{
					aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size: 0.75em;">' +
									'& Certificate has not been issued due to unpaid Audit' +
								'</td></tr>');
				}
			} 
			else {
				aHTML.push('No Memberships')
			} 
			aHTML.push('</td></tr>');	
					
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
		}	
	},

	details: 	function() 
	{
		var oRoot = ns1blankspace.rootnamespace;
		oRoot.external.grower.details();
	},


	membership: 
	{
		show: 	function(oParam) 
		{
			var oRoot = ns1blankspace.rootnamespace;
			oRoot.external.grower.membership.show(oParam);
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

			// Validations if existing grower (growers can't add new growers..)
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
							$('#ns1blankspaceMainDetails').attr('data-loading', '1');
							nsFreshcare.external.grower.address.show({step: 1});
						}
					}

					if (oParam.membershipShowIndex < ns1blankspace.objectContextData.memberships.length)
					{
						if ($('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).html() == '')
						{
							oParam.onCompleteWhenCan = oParam.onComplete;
							oParam.onComplete = nsFreshcare.grower.grower.save.validate;
							$('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).attr('data-loading', '1');
							oParam.membership = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id;
							oParam.membershipData = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex];
							oParam.membershipShowIndex += 1;
							nsFreshcare.grower.grower.membership.show(oParam);
						}
						else
						{
							oParam.membershipShowIndex += 1;
							nsFreshcare.grower.grower.save.validate(oParam);
						}
					}
					else
					{
						delete(oParam.membership);
						delete(oParam.membershipData);
						delete(oParam.membershipShowIndex);
						oParam.onComplete = oParam.functionSave;
						oParam.validateSaveStep = 2;
						nsFreshcare.grower.grower.save.validate(oParam);
					}
				}

				// Now perform the validation
				else if (oParam.validateSaveStep === 2)
				{
					if ($('#ns1blankspaceMainDetails').html() != '') 
					{
						// Tick Fresh Produce if no Product Groups selected 
						var iProductGroups = 0;
						if ($.grep($('.nsFreshcareProductGroupList'), function(a) { return (!$(a).css('text-decoration') === 'line-through')}).length === 0) {
							nsFreshcare.external.grower.manageMultiRows('nsFreshcareProductGroup_' + nsFreshcare.data.grower.productGroupFreshProduce);
						}

						// Check if at least one Scope selected
						if ($.grep($('.nsFreshcareScopeList'), function(a) {return (!$(a).css('text-decoration') === 'line-through')}).length > 0) {
							nsFreshcare.status.message('You must choose at least one Scope.');
							ns1blankspace.okToSave = false;
							return; 
						}

						// Validate madatory fields v2.0.21 Added
						if (ns1blankspace.okToSave) {
							$('input[data-mandatory]').each(function() {										

								//v1.0.26 added check for data-id on mandatory combos
								if (this.id.indexOf('ns1blankspaceDetails') > -1 
									&& ($(this).val() === ''
					   					|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) {
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
							ns1blankspace.status.message('Please provide a valid email address');
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

						// Validate mandatory input fields - Mailing and Site addresses (including any new sites)
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
						delete(oParam.validateSaveStep);
						oParam.growerSaveStep = 2;
						nsFreshcare.grower.grower.save.send(oParam);
					}
				}
			}
		}, 

		send: 		function (oParam)
		{
			var oRoot = ns1blankspace.rootnamespace;
			if (oParam)
			{ 	if (oParam.growerSaveStep == undefined) 
				{
					oParam.growerSaveStep = (oParam.xhtmlElementID.substr(0,1) === '-' ? 3 : 1)
				}
			}
			else
			{ 	oParam = {growerSaveStep: 1}}
	
			
			if (ns1blankspace.objectContext != -1) 	
			{
				if (oParam.growerSaveStep == 1)
				{
					nsFreshcare.grower.grower.save.validate();
				}

				else if (oParam.growerSaveStep === 2)
				{
					ns1blankspace.status.working('Collating email..');
					if (ns1blankspace.okToSave) 
					{
						// All UPDATES are sent via email...
						ns1blankspace.inputDetected = false;
						nsFreshcare.external.grower.save.constructEmail({source: 'Grower',
																		messageTo: nsFreshcare.data.emailToGrower,
																		messageFrom: nsFreshcare.data.emailFromGrower,
																		growerSaveStep: 3,
																		saveEmail: false,
																		onComplete: nsFreshcare.grower.grower.save.send});
					}
				}
				
				else if (oParam.growerSaveStep === 3)
				{
					// v2.0.4 SUP021691 Tell the user the changes have been sent to Freshcare  
					ns1blankspace.container.confirm(
						{
							title: 'Profile Update', 
							html: 'Thank you for updating your Freshcare Profile. An email has been sent to the Freshcare Office with your requested changes.',
							buttons: [{label: 'OK', text: 'OK', click: function() 
										{
											$(this).dialog('close'); 
											nsFreshcare.grower.grower.init({showHome: false});
										}
									 }]
						}
					);
				}
			} 
		}
	}		
}							
