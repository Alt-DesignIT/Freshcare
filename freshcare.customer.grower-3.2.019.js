/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
// v3.2.015 SUP023421 Change 'Growers' to 'Members'

nsFreshcare.customer.grower = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'grower';
		ns1blankspace.objectParentName = 'customer';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Suppliers';	
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
		//$('#ns1blankspaceViewControlAction').button({disabled: true});
		//$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
	},

	home: 		function (oParam, oResponse)
	{
		var dToday = new Date();

		if (oResponse == undefined)
		{
			var aHTML = [];
						
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
			oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename,contactbusiness.addresslink.address.addresssuburb' +
							',contactbusiness.agrisubscription.membershiptext,contactbusiness.agrisubscription.lastauditdate' +
							',contactbusiness.agrisubscription.codeofpracticetext,contactbusiness.agrisubscription.membership.code' +
							',contactbusiness.agrisubscription.agricertificate.certificatenumber,contactbusiness.agrisubscription.agricertificate.dateissued' +
							',contactbusiness.agrisubscription.agricertificate.enddate');
			oSearch.addCustomOption('lastaudit', ',,N');
			oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
			if (nsFreshcare.data.customerExSupplierList.length > 0) {
				oSearch.addFilter("id", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
			}
			oSearch.addFilter('contactbusiness.agrisubscription.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	// v1.0.24 Only show current Memberships
			oSearch.addFilter("contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
			oSearch.addFilter("contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.addFilter('contactbusiness.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
			oSearch.addFilter('contactbusiness.addresslink.objectcontext', 'EQUAL_TO', 'field:id');
			oSearch.addFilter('contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
			oSearch.rows = 40;
			oSearch.sort('contactbusiness.modifieddate', 'desc');
			
			oSearch.getResults(function(oResponse) {nsFreshcare.customer.grower.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">Click New to add a Supplier.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="8">MOST RECENTLY UPDATED</td></tr>');		//v1.0.24
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Business</td>' +
								'<td class="ns1blankspaceCaption">Contact</td>' +
								'<td class="ns1blankspaceCaption">Location</td>' +
								'<td class="ns1blankspaceCaption">Membership</td>' +
								'<td class="ns1blankspaceCaption">Certificate Number</td>' +
								'<td class="ns1blankspaceCaption">Date Issued</td>' +
								'<td class="ns1blankspaceCaption">COP</td>' +
								'<td class="ns1blankspaceCaption">Last Audit</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					var dExpiry = ((this["contactbusiness.agrisubscription.agricertificate.enddate"] != '') ? new Date(this["contactbusiness.agrisubscription.agricertificate.enddate"]) : undefined);
					var sClass = '';
					var dIssued = ((this["contactbusiness.agrisubscription.agricertificate.dateissued"] != '') ? new Date(this["contactbusiness.agrisubscription.agricertificate.dateissued"]) : undefined);;
					var sIssued = this["contactbusiness.agrisubscription.agricertificate.dateissued"];
					if (dExpiry) {
						
						if (dExpiry < dToday) { sClass = ' nsFreshcareNotCertified';}
					} 
					else { sClass = ' nsFreshcareNotCertified'; }

					if (dIssued) {
						sIssued = dIssued.toString('dd MMM yyyy');
					}

					aHTML.push('<tr class="ns1blankspaceRow">');
					aHTML.push('<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.tradename"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_name-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_location-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.addresslink.address.addresssuburb"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_membership-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.agrisubscription.membership.code"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_certificate-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.agrisubscription.agricertificate.certificatenumber"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_dateissued-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											sIssued + '</td>' +
								'<td id="ns1blankspaceMostLikely_codeofpractice-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.agrisubscription.codeofpracticetext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_lastaudit-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.agrisubscription.lastauditdate"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.customer.grower.search.send(event.target.id, {source: 1});
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
			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionProcess = (oRoot.customer && oRoot.customer.grower && oRoot.customer.grower.search && oRoot.customer.grower.search.process) 
									? oRoot.customer.grower.search.process
									: nsFreshcare.customer.grower.search.process;

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
				
				// v3.1..205 still need to filter on primarycontactperson
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.id' + 
								',contactbusiness.tradename,contactbusiness.legalname' + 
								',contactbusiness.addresslink.address.addresssuburb,contactbusiness.addresslink.address.addressstate');

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.addFilter('contactbusiness.primarycontactperson', 'EQUAL_TO', 'field:contactbusiness.contactperson.id')
				oSearch.addFilter('contactbusiness.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
				oSearch.addFilter('contactbusiness.addresslink.objectcontext', 'EQUAL_TO', 'field:id');
				oSearch.addFilter('contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
				oSearch.getResults(function(data) {nsFreshcare.customer.grower.show(oParam, data)});
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
					oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.id' +
									',contactbusiness.tradename,contactbusiness.addresslink.address.addresssuburb');
					
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
						oSearch.addOperator("or");
						oSearch.addFilter('contactbusiness.addresslink.address.addresssuburb', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
					oSearch.addFilter('contactbusiness.agrisubscription.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	// v1.0.24 Only show current Memberships
					if (nsFreshcare.data.customerExSupplierList.length > 0) {
						oSearch.addFilter("id", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
					}
					oSearch.addFilter("contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					oSearch.addFilter("contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
					oSearch.addFilter("contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					oSearch.addBracket("(");
					oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					oSearch.addOperator("or");
					oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
					oSearch.addBracket(")");
					oSearch.addFilter('contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {fFunctionProcess(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var iColumn = 0;
			var aHTML = [];
			var	iMaximumColumns = 1;
			var oRoot = ns1blankspace.rootnamespace;
			// v3.0.1a SUP021911 had oroot instead of oRoot
			var fFunctionSearch = (oRoot.customer && oRoot.customer.grower && oRoot.customer.grower.search && oRoot.customer.grower.search.send) 
									? oRoot.customer.grower.search.send
									: nsFreshcare.customer.grower.search.send;
				
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
										this["contactbusiness.tradename"] +
									'</td>'); 
						
						aHTML.push('<td class="ns1blankspaceSearch" id="contactperson' +
										'-' + this.id + '">' +
										this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>');
										
						aHTML.push('<td class="ns1blankspaceSearch" id="location' +
										'-' + this.id + '">' +
										this["contactbusiness.addresslink.address.addresssuburb"] + '</td>');
										
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
					fFunctionSearch(event.target.id, {source: 1});
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows and 1st & 2nd page of results now match formats
				ns1blankspace.render.bind(
				{
					columns: 'contactbusiness.tradename-column-contactbusiness.contactperson.firstname-space-contactbusiness.contactperson.surname-column-contactbusiness.addresslink.address.addresssuburb',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: fFunctionSearch
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
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Link Suppliers to your business</td></tr>');
		}
		else 
		{			
			// We don't really need to see the word Summary here - it just confuses the user..
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
							'&nbsp;</td></tr>');
		}
					
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		// v3.2.015 Was no way to show summary if Main div showed blank
		$('#ns1blankspaceControlContext').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.customer.grower.summary();
		});

		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
			nsFreshcare.customer.grower.details();
		});
	},

	show: 		function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;
		var oRoot = ns1blankspace.rootnamespace;
		var fFunctionMemberships = (oRoot.external && oRoot.external.grower && oRoot.external.grower.memberships && oRoot.external.grower.memberships.search)
									? oRoot.external.grower.memberships.search
									: nsFreshcare.external.grower.memberships.search;
		var sRootInit = (oRoot.customer && oRoot.customer.grower && oRoot.customer.grower.init) ? ns1blankspace.rootnamespacetext : 'nsFreshcare'; 
		var sRootSummary = (oRoot.customer && oRoot.customer.grower && oRoot.customer.grower.summary) ? ns1blankspace.rootnamespacetext : 'nsFreshcare';

		if (oParam) {
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		if (iStep === 1) 
		{
			if (oRoot.customer && oRoot.customer.grower && oRoot.customer.grower.layout)
			{
				oRoot.customer.grower.layout();
			}
			else
			{
				nsFreshcare.customer.grower.layout();
			}
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find supplier.</td></tr></table>');
					
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
				
				// Customers cannot update any grower details
				$('#ns1blankspaceViewControlAction').button({disabled: true});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
			
				oParam.step = 2;
				oParam = ns1blankspace.util.setParam(oParam, "contactBusiness", ns1blankspace.data.contactBusiness);
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.grower.show);
				oParam = ns1blankspace.util.setParam(oParam, "lastAudit", true);		//1.0.21 Last Audit added
				fFunctionMemberships(oParam);
			}

			// v2.0.4 SUP021318 Now get any CARs for this Membership
			else if (iStep === 2)
			{
				if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0)
				{
					// v2.0.4d SUP021518 Only get CARs when there has actually been an audit!
					if ($.grep(ns1blankspace.objectContextData.memberships, function(x) {return x['agrisubscription.lastauditdate'] != 0}).length > 0)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AUDIT_ISSUE_SEARCH';
						oSearch.addField('sintypetext,status,auditissue.audit.subscription');
						oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.auditCAR.statusToBeCompleted);
						// v3.2.005SUP023307 Only show Major CARs
						oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.auditCAR.severityMajor);

						// We only want CARs against the most recent audit for each subscription
						oSearch.addBracket('(');
						oSearch.addBracket('(');
						$.each($.grep(ns1blankspace.objectContextData.memberships, function(x) {return x['agrisubscription.lastauditdate'] != 0}), function(index)
						{
							oSearch.addFilter('auditissue.audit.subscription', 'EQUAL_TO', this.id);
							oSearch.addFilter('auditissue.audit.actualdate', 'EQUAL_TO', this['agrisubscription.lastauditdate']);
							if ((index + 1) < $.grep(ns1blankspace.objectContextData.memberships, function(x) {return x['agrisubscription.lastauditdate'] != 0}).length)
							{
								oSearch.addBracket(')');
								oSearch.addOperator('or');
								oSearch.addBracket('(');
							}
						});
						oSearch.addBracket(')');
						oSearch.addBracket(')');
						oSearch.sort('auditissue.audit.subscription', 'asc');
						oSearch.rows = 50;
						oSearch.getResults(function(oResponse)
						{
							oParam.step = 3;
							if (oResponse.status == 'OK' && oResponse.data.rows.length > 0)
							{
								$.each(ns1blankspace.objectContextData.memberships, function()
								{
									var sThisSubscription = this.id;

									this.cars = $.grep(oResponse.data.rows, function(x) {return x['auditissue.audit.subscription'] === sThisSubscription});
								});
								nsFreshcare.customer.grower.show(oParam);
							}
							else if (oResponse.status == 'ER')
							{
								ns1blankspace.status.error(oResponse.error.erronotes);
							}
							else
							{
								nsFreshcare.customer.grower.show(oParam);
							}
						});
					}

					else
					{
						oParam.step = 3;
						ns1blankspace.objectContextData.memberships = $.map(ns1blankspace.objectContextData.memberships, function(x) {x.cars = []; return x;});
						nsFreshcare.customer.grower.show(oParam);
					}
				}
				else
				{
					oParam.step = 3;
					nsFreshcare.customer.grower.show(oParam);
				}
			}

			else if (iStep === 3) 
			{

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br />' + ns1blankspace.data.contactPersonText.formatXHTML());

				// v2.0.4 Removed search.send from newDestination and now passes object with id to init
				// v3.1.1 SUP022472 Missing closing } from newDestination parameter
				ns1blankspace.history.view({
					newDestination: sRootInit + '.customer.grower.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: sRootSummary + '.customer.grower.summary()'});
			}
		}	
	},	

	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this ' + nsfreshcare.data.growerText + ' .</td></tr></table>');
					
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
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trading Name</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML() +
						'</td></tr>');

			if (ns1blankspace.objectContextData['contactbusiness.legalname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.legalname'].formatXHTML() +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'].formatXHTML() + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'].formatXHTML() +
						'</td></tr>');

			if (ns1blankspace.objectContextData['contactbusiness.addresslink.address.addresssuburb'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Location</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.addresslink.address.addresssuburb'].formatXHTML() + ' ' +
							ns1blankspace.objectContextData['contactbusiness.addresslink.address.addressstate'].formatXHTML() +
							'</td></tr>');
			}


			// List Memberships
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Memberships</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) 
			{
				aHTML.push('<table class="ns1blankspace">');

				aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Membership</td>' +
								'<td class="ns1blankspaceHeaderCaption">COP</td>' +
								'<td class="ns1blankspaceHeaderCaption">Status</td>' +
								'<td class="ns1blankspaceHeaderCaption">Last Audit</td>' +
								'<td class="ns1blankspaceHeaderCaption">Open Major CARs</td>' +
								'<td class="ns1blankspaceHeaderCaption">Expires</td>' +
							'<tr>');
				
				var bAuditPaidNote = false;		// v3.1.207 SUP023057 Added
				$.each(ns1blankspace.objectContextData.memberships, function() 
				{
					// v1.0.21 Allow print for all certificates except if WD or FM. Shade expired certificates as per Supplier home
					// If correct Status, check if certificate exists via agricertificate.id
					var dToday = new Date();
					var dExpiry = (this['agrisubscription.agricertificate.enddate'] != '') 
									? (new Date(this['agrisubscription.agricertificate.enddate'])) 
									: undefined;
					var bCertified = (dExpiry && dExpiry > dToday);
					var bShowCert = !(this['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD || this['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusFM);
					bShowCert = (bShowCert) ? (this['agrisubscription.agricertificate.id'] != "") : bShowCert;

					var sCARsText = '';
					bAuditPaidNote = (!bAuditPaidNote && this['agrisubscription.agrilastaudit.paid'] == 'N') ? true : bAuditPaidNote;

					if (this.cars)
					{
						//var bMRLCAR = $.grep(this.cars, function(x) {return x.details.indexOf('F4.8') > -1}).length > 0;
						var bMRLCAR = $.grep(this.cars, function(x) {return x.sintypetext.indexOf(' MRL') > -1}).length > 0;
						if (bMRLCAR && this.cars.length > 1)
						{
							sCARsText = 'CARs Outstanding, MRL Required';
						}
						else if (bMRLCAR)
						{
							sCARsText = 'MRL Required';
						}
						else if (this.cars.length > 0)
						{
							sCARsText = 'CARs Outstanding';
						}
					}

					aHTML.push('<tr><td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.membershiptext'] + '</td>');

					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricodeofpractice.code'] + '</td>');

					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.statustext'] + '</td>');

					// v3.1.2 SUP022900 Now shows audit date in red if not paid
					// v3.1.207 SUP023057 Added asterisk and note if not paid
					aHTML.push('<td class="ns1blankspaceRow' + 
									(this['agrisubscription.lastauditdate'] != '' && this['agrisubscription.agrilastaudit.paid'] == 'N' 
										? ' ns1blankspaceError' 
										: (bCertified ? '' : ' nsFreshcareNotCertified')) + 
									'">' +
									this['agrisubscription.lastauditdate'] + 
									(this['agrisubscription.agrilastaudit.paid'] == 'N' ? '*' : '') +
									'</td>');			// v1.0.21 added

					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									sCARsText + '</td>');			// v2.0.4 added

					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricertificate.enddate'] + '</td>');			// v1.0.25 added

					aHTML.push('<td id="ns1blankspaceSummaryMembershipCertificate_' + this['agrisubscription.agricertificate.id'] + '"' +
							' class="ns1blankspaceRow' + 
								((bShowCert) ? ' ns1blankspaceSummaryCertificate' : '') + '"' +
								' data-membership="' +  this['agrisubscription.membership'] + '"' +
								' data-auditID="' + this['agrisubscription.agricertificate.audit'] + '"></td>');
					aHTML.push('</tr>');
				});
				aHTML.push('</table>');

				if (bAuditPaidNote)
				{
					aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size: 0.75em;">' +
									'* Certificate has not been issued due to unpaid Audit' +
								'</td></tr>');
				}
			} 
			else {
				aHTML.push('No Memberships')
			} 
			aHTML.push('</td></tr>');	
					
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			$('.ns1blankspaceError')
				.hover(
				function(event)
				{
					var sElementId = this.id;
					
					$('#ns1blankspaceToolTip').html('Audit has not been paid');	
					$('#ns1blankspaceToolTip').css('font-size', '0.75em');
					$('#ns1blankspaceToolTip').show();
					
					$('#ns1blankspaceToolTip').offset({ top: $(this).offset().top, 
															 left: $(this).offset().left + $(this).width() });
				},
				function(event)
				{
					$('#ns1blankspaceToolTip').html('');
					$('#ns1blankspaceToolTip').hide();
				});


			$('.ns1blankspaceSummaryCertificate').button({
				icons: {
					primary: 'ui-icon-print'
				}
			})
			.css('height', '15px')
			.css('width', '20px')
			.click(function(event) {

				nsFreshcare.admin.certificate.printIndividualCertificate({audit: $(this).attr('data-auditID'),
																	   certificate: this.id.split('_').pop(),
																	   membership: $(this).attr('data-membership'),
																	   xhtmlElementID: this.id});
			});
		}	
	},

	details: 	function() 
	{

		// Details tab is only used when the user is adding a new request to link to a Grower
		var aHTML = [];
		
		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			nsFreshcare.data.grower.email = '';		// v1.0.22 Clear grower email when adding new

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
			
			// v3.1.204 SUP023020 Next 3 fields were still looking at persongroup
			// v3.2.006 v3.2.007 SUP023452 Was filtering businessgroup on array value. 
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Company ID' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsSupplierReference" class="nsFreshcareSelectGrower"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' +
								' data-columns="reference-space-tradename-space-contactbusiness.addresslink.address.addresssuburb"' +
								' data-methodFilter="reference-TEXT_IS_LIKE|' +
													 'contactbusiness.addresslink.address.status-EQUAL_TO-1|' +
													 'contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '|' +
													 'contactbusiness.agrisubscription.status-NOT_IN_LIST-' + nsFreshcare.data.grower.subscriptionStatusWD + ',' +
													 														  nsFreshcare.data.grower.subscriptionStatusFM + '"' +
								' data-click="nsFreshcare.util.defaultContactPerson">' +
							'</td></tr>')

			// v3.2.006 Was filtering businessgroup on array value
			// v3.2.019 SUP023534 was filtreing contactperson.contactbusiness.businessgroup
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							nsFreshcare.data.growerText + ' Business' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsSupplierBusiness" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="' + nsFreshcare.data.growerText + ' Business"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' +
								' data-columns="tradename-space-contactbusiness.addresslink.address.addresssuburb"' +
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE|streetsuburb-TEXT_IS_LIKE|' +
									'contactbusiness.addresslink.address.status-EQUAL_TO-1|' +
									'businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrowerID + '|' +
									'contactbusiness.agrisubscription.status-NOT_IN_LIST-' + nsFreshcare.data.grower.subscriptionStatusWD + ',' +
																					  nsFreshcare.data.grower.subscriptionStatusFM);
			// v3.1.1i SUP022770 Not required here as was causing Customers to think that the Grower didn't exist and creatign more work for FC
			//if (nsFreshcare.data.customerExSupplierList.length > 0) {
			//	aHTML.push('|id-NOT_IN_LIST-' + nsFreshcare.data.customerExSupplierList.join(','));
			//}
			aHTML.push('"' +
								' data-click="nsFreshcare.util.defaultContactPerson">' +
							'</td></tr>');			

			// v3.1.215 SUP023285 Now looks at business linked to subscription, not person and only finds active primary contacts
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							nsFreshcare.data.growerText + ' Contact' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceDetailsSupplierPerson" class="nsFreshcareSelectGrower"' +
								' data-mandatory="1" data-caption="' + nsFreshcare.data.growerText + ' Contact"' + 
								' data-method="CONTACT_PERSON_SEARCH"' +
								' data-columns="firstname-space-surname"' +
								' data-methodfilter="firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
									'customerstatus-EQUAL_TO-' + nsFreshcare.data.contactStatusActive + '|' +
									'contactperson.contactbusiness.primarycontactperson-EQUAL_TO-field:contactperson.id|' + 
									'contactperson.contactbusiness.businessgroup-EQUAL_TO-' + nsFreshcare.data.businessGroupGrower + '|' +
									'contactperson.contactbusiness.agrisubscription.status-NOT_IN_LIST-' + nsFreshcare.data.grower.subscriptionStatusWD + ',' +
									 													   nsFreshcare.data.grower.subscriptionStatusFM);
			// v3.1.1i SUP022770 Not required here anymore
			//if (nsFreshcare.data.customerExSupplierList.length > 0) {
			//	aHTML.push('|contactperson.contactbusiness.id-NOT_IN_LIST-' + nsFreshcare.data.customerExSupplierList.join(','));
			//}
			aHTML.push('"' + 
								' data-parent="ns1blankspaceDetailsSupplierBusiness"' +
								' data-parent-search-id="contactperson.contactbusiness"' +
								' data-parent-search-text="contactperson.contactbusiness.tradename"' + 
								' data-click="nsFreshcare.customer.grower.setGrowerDetails">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Location' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="nsFreshcareText">' +
								'<input id="ns1blankspaceDetailsLocation" class="ns1blankspaceText">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Certificate Number' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="nsFreshcareText">' +
								'<input id="ns1blankspaceDetailsCertificate" class="ns1blankspaceText">' +
							'</td></tr>');			

			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

			aHTML = [];

			aHTML.push('<table class="ns1blankspace"');

			aHTML.push('<tr><td id="ns1blankspaceDetailsSearchSupplier" style="font-size:0.75em;">Search</td>');
			aHTML.push('<td style="width:10px;">&nbsp;</td>');
			aHTML.push('<td id="ns1blankspaceDetailsClearSupplier" style="font-size:0.75em;">Clear</td></tr>');
			aHTML.push('</table>');

			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

			$('#ns1blankspaceDetailsSearchSupplier').button({
				label: 'Search',
				icons: {
					primary: 'ui-icon-search'
				}
			})
			.click(function() {

				nsFreshcare.customer.grower.searchSupplier({searchSupplierStep: 1});
			});

			$('#ns1blankspaceDetailsClearSupplier').button({
				label: 'Clear',
				icons: {
					primary: 'ui-icon-close'
				}
			})
			.click(function() {

				nsFreshcare.customer.grower.clearSupplier();
			});
		}
	},

	setGrowerDetails: 	function() 
	{

		// v1.0.26 Now checks if Business has been selectd and if not, populates both Business & Reference
		nsFreshcare.data.grower.email = '';		// v1.0.22 Clear grower email before searching
		
		if ($('#ns1blankspaceDetailsSupplierPerson').attr('data-id') != undefined) {

			$('#ns1blankspaceDetailsLocation').val();
			$('#ns1blankspaceDetailsCertificate').val();

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			oSearch.addField('contactperson.agrisubscription.agricertificate.certificatenumber,contactperson.contactbusiness.addresslink.address.addresssuburb' +
				',contactperson.email,contactperson.contactbusiness.tradename,contactperson.contactbusiness.id,contactperson.contactbusiness.reference');
			oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsSupplierPerson').attr('data-id'));
			oSearch.addFilter('contactperson.contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {

					if (oResponse.data.rows.length >= 1) {

						$('#ns1blankspaceDetailsLocation').val(oResponse.data.rows[0]['contactperson.contactbusiness.addresslink.address.addresssuburb'].formatXHTML())
						$('#ns1blankspaceDetailsCertificate').val(oResponse.data.rows[0]['contactperson.agrisubscription.agricertificate.certificatenumber'].formatXHTML())
						nsFreshcare.data.grower.email = oResponse.data.rows[0]['contactperson.email'].formatXHTML();

						// v1.0.26 Now set Business & reference if not already set
						if ($('#ns1blankspaceDetailsSupplierBusiness').attr('data-id') === undefined || $('#ns1blankspaceDetailsSupplierReference').attr('data-id') == undefined)
						{
							$('#ns1blankspaceDetailsSupplierBusiness').val(oResponse.data.rows[0]['contactperson.contactbusiness.tradename'].formatXHTML() + ' ' + oResponse.data.rows[0]['contactperson.contactbusiness.addresslink.address.addresssuburb'].formatXHTML());
							$('#ns1blankspaceDetailsSupplierBusiness').attr('data-id', oResponse.data.rows[0]['contactperson.contactbusiness.id']);
							$('#ns1blankspaceDetailsSupplierReference').val(oResponse.data.rows[0]['contactperson.contactbusiness.reference'].formatXHTML());
							$('#ns1blankspaceDetailsSupplierReference').attr('data-id', oResponse.data.rows[0]['contactperson.contactbusiness.id']);
						}
					}
				}
			});
		}

	},

	searchSupplier: function(oParam, oResponse) 
	{

		var iStep = 1;

		if (oParam) {
			if (oParam.searchSupplierStep) {iStep = oParam.searchSupplierStep;}
		}
		else {
			oParam = {searchSupplierStep: 1};
		}

		if ($(ns1blankspace.xhtml.container).is(':visible')) {
			$(ns1blankspace.xhtml.container).hide();
			$(ns1blankspace.xhtml.container).html(''); 

		}
		else {

			if (iStep === 1 && oResponse === undefined) 
			{
				// Search for growers matching the criteria
				// v3.1.204 SUP023020 Was still looking at persongroup
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename,contactbusiness.contactperson.id' +
								',contactbusiness.reference,contactbusiness.addresslink.address.addresssuburb' +
								',contactbusiness.agrisubscription.agricertificate.certificatenumber');
				oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);
				oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
				oSearch.addFilter('contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
				// v1.0.27 Doesn't include Withdrawn or FM growers in search results
				oSearch.addFilter('contactbusiness.agrisubscription.status', 'NOT_IN_LIST', nsFreshcare.data.grower.subscriptionStatusWD + ',' +
																							nsFreshcare.data.grower.subscriptionStatusFM);
				// v3.1.1i SUP022770 Not required here
				//if (nsFreshcare.data.customerExSupplierList.length > 0) {
				//	oSearch.addFilter("id", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
				//}

				if ($('#ns1blankspaceDetailsSupplierReference').val() != '') {
					
					if ($('#ns1blankspaceDetailsSupplierReference').attr('data-id') != undefined) {

						oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsSupplierReference').attr('data-id'));
					}
					else {
						oSearch.addFilter('contactbusiness.reference', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsSupplierReference').val());	
					}
				}

				if ($('#ns1blankspaceDetailsSupplierBusiness').val() != '') {
					
					if ($('#ns1blankspaceDetailsSupplierBusiness').attr('data-id') != undefined) {

						oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceDetailsSupplierBusiness').attr('data-id'));
					}
					else {
						oSearch.addBracket('(');
						oSearch.addFilter('contactbusiness.tradename', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsSupplierBusiness').val());	
						oSearch.addOperator('or');
						oSearch.addFilter('contactbusiness.legalname', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsSupplierBusiness').val());	
						oSearch.addBracket(')');
					}
				}

				if ($('#ns1blankspaceDetailsSupplierPerson').val() != '') {
					
					if ($('#ns1blankspaceDetailsSupplierPerson').attr('data-id') != undefined) {

						oSearch.addFilter('contactbusiness.contactperson.id', 'EQUAL_TO', $('#ns1blankspaceDetailsSupplierPerson').attr('data-id'));
					}
					else {

						var sFirstName = $('#ns1blankspaceDetailsSupplierPerson').val();
						var sSurname = $('#ns1blankspaceDetailsSupplierPerson').val();

						if (sFirstName.indexOf(' ') > -1) {
							sFirstName = sFirstName.substr(0, sFirstName.indexOf(' '));
							sSurname = sFirstName.substr(sSurname.indexOf(' '));
						}
						oSearch.addBracket('(');
						oSearch.addFilter('contactbusiness.contactperson.firstname', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsSupplierPerson').val());	
						oSearch.addOperator(((sFirstName === sSurname) ? 'or' : 'and'));
						oSearch.addFilter('contactbusiness.contactperson.surname', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsSupplierPerson').val());	
						oSearch.addBracket(')');
					}
				}

				if ($('#ns1blankspaceDetailsLocation').val() != '') {
					
					oSearch.addFilter('contactbusiness.addresslink.address.addresssuburb', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsLocation').val());
				}

				if ($('#ns1blankspaceDetailsCertificate').val() != '') {
					
					oSearch.addFilter('contactbusiness.agrisubscription.agricertificate.certificatenumber', 'TEXT_IS_LIKE', $('#ns1blankspaceDetailsCertificate').val());
				}
				
				oSearch.rows = 100;
				oSearch.getResults(function(oResponse) {nsFreshcare.customer.grower.searchSupplier({searchSupplierStep: 2}, oResponse)});
			
			}
			else if (iStep === 2 && oResponse) {

				// Now Display the results for the user to select one

				var aHTML = [];
				aHTML.push('<table class="ns1blankspaceSearchMedium">');

				if (oResponse.status === 'OK') {

					var sPreviousId = '';
					$.each(oResponse.data.rows, function() {

						if (sPreviousId != this.id) {
							aHTML.push('<tr id="ns1blankspaceSupplierSearchRow_' + this['contactbusiness.contactperson.id'] + '">');
							aHTML.push('<td id="ns1blankspaceSupplierReference_' + this['id'] + '" class="ns1blankspaceSearch">' + 
											this['contactbusiness.reference'] + '<td>');
							aHTML.push('<td id="ns1blankspaceSupplierBusiness_' + this['id'] + '" class="ns1blankspaceSearch">' + 
											this['contactbusiness.tradename'] + '<td>');
							aHTML.push('<td id="ns1blankspaceSupplierPerson_' + this['id'] + '" class="ns1blankspaceSearch">' + 
											this['contactbusiness.contactperson.firstname'] + ' ' + this['contactbusiness.contactperson.surname'] + '<td>');
							aHTML.push('<td id="ns1blankspaceSupplierLocation_' + this['id'] + '" class="ns1blankspaceSearch">' + 
											this['contactbusiness.addresslink.address.addresssuburb'] + '<td>');
							aHTML.push('<td id="ns1blankspaceSupplierCertificate_' + this['id'] + '" class="ns1blankspaceSearch">' + 
											this['contactbusiness.agrisubscription.agricertificate.certificatenumber'] + '<td>');
							aHTML.push('</tr>');
						}
						sPreviousId = this.id;
					});

				}
				else {
					aHTML.push('<tr><td id="ns1blankspaceAddTrainingCourse" class="ns1blankspaceSearch">' +
									'No matching suppliers found. Please revise the search criteria and try again.</td></tr>')
				}

				aHTML.push('</table>');

				ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceDetailsSearchSupplier', topOffset: 10, setWidth: true});
				$(ns1blankspace.xhtml.container).show();
				$(ns1blankspace.xhtml.container).html(aHTML.join(''));

				$('td.ns1blankspaceSearch').click(function() {

					var sBusinessId = this.id.split('_')[1];
					var sPersonId = $(this).parent().attr('id').split('_')[1];

					$(ns1blankspace.xhtml.container).hide();
					if (sBusinessId) {

						$('#ns1blankspaceDetailsSupplierReference').attr('data-id', sBusinessId);
						$('#ns1blankspaceDetailsSupplierReference').val($('#ns1blankspaceSupplierReference_' + sBusinessId).html());
						$('#ns1blankspaceDetailsSupplierBusiness').attr('data-id', sBusinessId);
						$('#ns1blankspaceDetailsSupplierBusiness').val($('#ns1blankspaceSupplierBusiness_' + sBusinessId).html().formatXHTML());
						$('#ns1blankspaceDetailsSupplierPerson').val($('#ns1blankspaceSupplierPerson_' + sBusinessId).html().formatXHTML());
						$('#ns1blankspaceDetailsSupplierPerson').attr('data-id', sPersonId);
						$('#ns1blankspaceDetailsLocation').val($('#ns1blankspaceSupplierLocation_' + sBusinessId).html().formatXHTML());
						$('#ns1blankspaceDetailsCertificate').val($('#ns1blankspaceSupplierCertificate_' + sBusinessId).html().formatXHTML());
					}
					$(ns1blankspace.xhtml.container).html('');
					// v3.2.019 SUP023534 Was not setting customer email when using Search button
					nsFreshcare.customer.grower.setGrowerDetails();
				});	
			}		
		}
	},

	clearSupplier: 	function () 
	{

		$('#ns1blankspaceDetailsSupplierReference').removeAttr('data-id');
		$('#ns1blankspaceDetailsSupplierReference').val('');
		$('#ns1blankspaceDetailsSupplierBusiness').removeAttr('data-id');
		$('#ns1blankspaceDetailsSupplierBusiness').val('');
		$('#ns1blankspaceDetailsSupplierPerson').removeAttr('data-id');
		$('#ns1blankspaceDetailsSupplierPerson').val('');
		$('#ns1blankspaceDetailsLocation').val('');
		$('#ns1blankspaceDetailsCertificate').val('');
		nsFreshcare.data.grower.email = '';		// v1.0.22 Clear grower email as well

	},

	save: 		
	{
		validate: 	function() 
		{
			
			ns1blankspace.okToSave = true;

			// Validate that they've entered mandatory fields
			$($.grep($('input'), function (a) {return $(a).attr('id').indexOf('ns1blankspaceDetails') > -1;})).each( function() {

				// v1.0.26 now also checks that combos have their data-id set
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

		}, 

		send: 		function (oParam)
		{
			// Adding a new supplier just adds a record to AGRI_TEMP_BUSINESS_LINK
			// No UPDATES are possible.
			var sData = '';
			var aMessageHTML = [];
			var aGrowerMessageHTML = [];
			var bRelationshipValid = false;
			var bEmailAdmin = true;
			var bEmailGrower = true;
			var sSubject = 'A new Supplier link has been requested';
			var sReason = '';

			if (oParam) 
			{
				if (oParam.supplierSaveStep == undefined) {oParam.supplierSaveStep = 1}
				if (oParam.relationshipValid != undefined) {bRelationshipValid = oParam.relationshipValid}
				if (oParam.emailGrower != undefined) {bEmailGrower = oParam.emailGrower}
				if (oParam.emailAdmin != undefined) {bEmailAdmin = oParam.emailAdmin}
				if (oParam.reason != undefined) {sReason = oParam.reason}
				if (oParam.subject != undefined) {sSubject = oParam.subject}
			}
			else {oParam = {supplierSaveStep: 1};}

			if (ns1blankspace.objectContext != -1) 	
			{
				//If this is the case, we shouldn't be in here
				return;
			} 
			
			if (oParam.supplierSaveStep === 1) 
			{
				
				nsFreshcare.customer.grower.save.validate();
				nsFreshcare.data.saveError = [];

				if (ns1blankspace.okToSave) 
				{
					ns1blankspace.status.working();

					// Need to see if link already exists first
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
					oSearch.addField('contactbusiness,startdate,enddate,type');
					oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', ns1blankspace.user.contactBusiness);
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', $('#ns1blankspaceDetailsSupplierBusiness').attr('data-id'));
					oSearch.addFilter('type', 'IN_LIST', nsFreshcare.data.relationshipSupplier + ',' + nsFreshcare.data.relationshipDoNotLink);
					oSearch.getResults(function(oResponse) {

						if (oResponse.status === 'OK') 
						{
							var sReason = '';
							var bValid = true;
							
							$.each(oResponse.data.rows, function() 
							{

								if (this.type === nsFreshcare.data.relationshipSupplier) 
								{

									var dToday = new Date();
									var dStart = new Date(dToday.toString('dd MM yyyy'));		//v1.0.24 We must always have a start date
									var dEnd;

									if (this.startdate != '') {dStart = new Date(this.startdate)}
									if (this.enddate != '') {dEnd = new Date(this.enddate)}

									if (dStart && dStart > dToday) 
									{
										bValid = false;
										bEmailGrower = false;
										sReason = 'the Customer already has a link to this ' + nsFreshcare.data.growerText + ' but it starts in the future.';
										sSubject = 'An existing Suplier link has been requested';
										ns1blankspace.status.error('This link is set to start on ' + this.startdate + '. Please contact Freshcare for further assistance if required.')
									}

									if (dEnd && dEnd < dToday) 
									{
										bValid = false;
										bEmailGrower = false;
										sReason = 'the Customer already has a link to this ' + nsFreshcare.data.growerText + ' but it has ended.';
										sSubject = 'Supplier link reactivation request';
										//ns1blankspace.status.error('You already have a link to this Supplier but it has ended.');
										// v1.0.24 Freshcare don't want any message here
									}

									if ((dEnd && dStart && dStart <= dToday && dEnd >= dToday) 
										|| (dStart && dStart < dToday && this.enddate === '')) 
									{
										bValid = false;
										bEmailAdmin = false;
										bEmailGrower = false;
										ns1blankspace.status.error('This Supplier is currently linked to you.');
										ns1blankspace.okToSave = false;
									}
								}

								if (this.type === nsFreshcare.data.relationshipDoNotLink) 
								{

									bValid = false;
									bEmailGrower = false;
									bEmailAdmin - false;
									sReason = '';
									sSubject = '';
									ns1blankspace.okToSave = false;
									ns1blankspace.status.error('Link request is denied. Please contact Freshcare for further assistance.');
								}

								if (!bValid) {return false;}		// Quit out of loop
							});

							// v1.0.24 now displays error message clearly for user to see before wiped out by 'Sent to freschare' message
							if (!bValid) 
							{
								$('#ns1blankspaceStatusError').trigger('click');
							}

							oParam.supplierSaveStep = 2;
							oParam.relationshipValid = bValid;
							oParam.relationshipReason = sReason;
							oParam.emailAdmin = bEmailAdmin;
							oParam.emailGrower = bEmailGrower;
							oParam.subject = sSubject;
							oParam.reason = sReason;
							nsFreshcare.customer.grower.save.send(oParam);
						}
					});
				}
			}
			
			else if (oParam.supplierSaveStep === 2) 
			{		// v1.0.22 Was previously just an if - code continued without proper values
			
				if (ns1blankspace.okToSave) 
				{
					aMessageHTML.push('<table><tr><td>' + nsFreshcare.user.roleID + ' ' + ns1blankspace.user.contactBusinessText + ' has requested a link to grower ' +
										$('#ns1blankspaceDetailsSupplierBusiness').val().formatXHTML() + '</td></tr></table>');

					aGrowerMessageHTML.push('<table><tr><td>' +
											'Dear ' + $('#ns1blankspaceDetailsSupplierPerson').val().formatXHTML() + ' (' + $('#ns1blankspaceDetailsSupplierBusiness').val().formatXHTML() + ')' +
											'<br /><br/>' +
											'Customer, ' + ns1blankspace.user.contactBusinessText.formatXHTML() + ' has requested that you be linked to their approved supplier list within FreshcareOnline, enabling them to view your Freshcare Certificate.' +
											'<br /><br />' +
											ns1blankspace.user.contactBusinessText.formatXHTML() + ' may be your direct customer; or they may wish to include you on their approved list as they regularly purchase your product from one of your direct customers, for supply to an end customer that requires supply only from certified grower.' +
											'<br /><br />' +
											'FreshcareOnline allows for independent verification of your status, quickly and easily without the end customer having to obtain a printed copy of your Freshcare Certificate.' +
											'<br /><br />' +
											'No action is required by you if you consent to be linked to ' + ns1blankspace.user.contactBusinessText.formatXHTML() + '. This link will be established after 3 business days from the date of this email.' +
											'<br /><br />' +
											'If you do not wish to be included on ' + ns1blankspace.user.contactBusinessText.formatXHTML() + "'s approved supplier list, please contact Freshcare by sending an email to " + '<a href="mailto:admin@freshcare.com.au">admin@freshcare.com.au</a>.' +
											'<br /><br />' +
											'Thank you.' +
											'<br /><br />' +
											'Regards,<br />' +
											'The Freshcare Team<br />' +
											'T: 1300 853 508<br />' + 
											'E: <a href="mailto:admin@freshcare.com.au">admin@freshcare.com.au</a><br />');

					if (bRelationshipValid) 
					{
						
						sData += '&contactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSupplierBusiness').attr('data-id'));
						sData += '&contactperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSupplierPerson').attr('data-id'));
						sData += '&othercontactbusiness=' + ns1blankspace.user.contactBusiness;
						sData += '&othercontactperson=' + ns1blankspace.user.contactPerson;
						sData += '&linktype=' + nsFreshcare.data.relationshipSupplier;
					}
					else 
					{

						aMessageHTML.push('<table><tr><td>However, this relationship request has not been added because ' +
											sReason.formatXHTML() + '</td></tr></table>');

					}


					var oParam = {message: aGrowerMessageHTML.join(''),
								 step2Message: aMessageHTML.join(''),
								 emailGrower: bEmailGrower,
								 emailAdmin: bEmailAdmin,
								 subject: sSubject,
								 wait: !bRelationshipValid,
								 onComplete: nsFreshcare.customer.grower.save.process,
								 onCompleteWhenCan: nsFreshcare.customer.grower.init };

					if (bRelationshipValid) 
					{		// We add the link request and call .process
						
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_TEMP_BUSINESS_LINK_MANAGE'),
							data: sData,
							dataType: 'json',
							success: function(oResponse) { nsFreshcare.customer.grower.save.process(oParam, oResponse); }
						});
					}
					else 
					{	// Just call .process to send relevant emails
						nsFreshcare.customer.grower.save.process(oParam, {status: "OK"});
					}
				}

			}
			
		},

		process: 	function (oParam, oResponse)
		{	
			if (oParam) {
				if (oParam.saveCustomerStep === undefined) {oParam.saveCustomerStep = 1;}
			}
			if (oResponse === undefined) {
				oResponse = oParam.response;
			}

			if (oResponse.status == 'OK') 
			{
				ns1blankspace.inputDetected = false;
				if (oParam.saveCustomerStep == 1) 
				{
					// Send email to grower, but only if they have a valid email address ver 1.0.20
					// Also check we neeed to send email to them v1.0.24

					oParam.response = oResponse;		
					oParam.saveCustomerStep = 2;
					if (oParam.emailGrower 
						&& nsFreshcare.data.grower.email != undefined 
						&& nsFreshcare.data.grower.email != '' 
						&& nsFreshcare.data.grower.email.indexOf('@') > -1) 
					{
						ns1blankspace.status.message('Request sent to ' + nsFreshcare.data.growerText);
						oParam.to = nsFreshcare.data.grower.email;
						oParam.from = nsFreshcare.data.emailFromAdmin;
						nsFreshcare.external.grower.save.sendEmail(oParam);
					}
					else 
					{	
						ns1blankspace.util.onComplete(oParam, oResponse);		 
					}
				}
				else 
				{
					// Send email to Admin
					oParam.message = oParam.step2Message;
					delete(oParam.step2Message);
					oParam.to = nsFreshcare.data.emailToCustomer;
					oParam.from = nsFreshcare.data.emailFromCustomer;
					if (oParam.emailAdmin)
					{
						// v3.1.0i SUP022341 Indicate that a request was sent to Freshcare if not sent to the Grower (otherwise, user only sees one message)
						if (!oParam.emailGrower)
						{
							ns1blankspace.status.message("Request sent to Freshcare");
						}
						nsFreshcare.external.grower.save.sendEmail(oParam);
					}
					else
					{
						ns1blankspace.util.onComplete(oParam, oResponse);
					}
				}
			}
			else {
				nsFreshcare.data.saveError.push(['Error adding supplier link: ' + oResponse.error.errornotes]);
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
			
		}
	}	
}							
