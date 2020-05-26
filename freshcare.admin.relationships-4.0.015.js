/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
// v3.2.015 SUP023421 Change 'Growers' to 'Members'

nsFreshcare.admin.relationships = 
{
	data: {},

	init: function (oParam)
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 225;
		ns1blankspace.objectName = 'relationships';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'CONTACT_RELATIONSHIP'
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Relationships';
		
		var bShowHome = true;
		var bNew = false;
		
		if (oParam != undefined)
		{
			if (oParam.showHome != undefined) {bShowHome = oParam.showHome}
			if (oParam.showNew != undefined) {bNew = oParam.showNew}
			if (oParam.contactBusiness) {nsFreshcare.admin.relationships.data.contactBusiness = oParam.contactBusiness}
			if (oParam.contactBusinessText) {nsFreshcare.admin.relationships.data.contactBusinessText = oParam.contactBusinessText}
			if (oParam.contactPerson) {nsFreshcare.admin.relationships.data.contactPerson = oParam.contactPerson}
			if (oParam.contactPersonText) {nsFreshcare.admin.relationships.data.contactPersonText = oParam.contactPersonText}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
	},

	home: function (oParam, oResponse)
	{
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
					
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlCustomerSuppliers" class="ns1blankspaceControl">Customers requesting Supplier links</td>' +
							'</tr>');	

			/*aHTML.push('<tr><td>&nbsp;</td></tr>');		
						
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlByGrowerCertBody" class="ns1blankspaceControl">Growers requesting CB links</td>' +
							'</tr>');	*/
										
			aHTML.push('</table>');		
			
			$('#ns1blankspaceControl').html(aHTML.join(''));	
										
			$('#ns1blankspaceControlCustomerSuppliers').click(function(event)
			{
				// v3.2.005 SUP023367 Added filters & fields so that picks up Grower and Customer's primary contactperson
				$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceMain').attr('data-loading', '1');
				
				oParam = {};
				oParam.xhtmlElementID = 'ns1blankspaceMain';
				oParam.label = 'Customer / Supplier Links';
				oParam.xhtmlContext = 'CustomerSupplierLinks';
				oParam.linkType = nsFreshcare.data.relationshipSupplier;
				
				oParam.searchFilters = 
				[
					{name: 'linktype', comparison: 'EQUAL_TO', value1: nsFreshcare.data.relationshipSupplier},
					{name: 'agritempbusinesslink.othercontactbusiness.primarycontactperson', comparison: 'EQUAL_TO', value1: 'field:agritempbusinesslink.othercontactbusiness.contactperson.id'},
					{name: 'agritempbusinesslink.contactbusiness.primarycontactperson', comparison: 'EQUAL_TO', value1: 'field:agritempbusinesslink.contactbusiness.contactperson.id'}
				];

				oParam.columns = [
									{title: nsFreshcare.data.growerText, name: 'ContactBusinessText', field: 'contactbusinesstext'},
									{title: nsFreshcare.data.growerText+' Contact', name: 'ContactPersonText', 
										functionCalculate: function(x) 
										{
											return x['agritempbusinesslink.contactbusiness.contactperson.firstname'] +
												' ' + x['agritempbusinesslink.contactbusiness.contactperson.surname']
										}
									},
									{title: 'Customer', name: 'OtherContactBusinessText', field: 'othercontactbusinesstext'},
									{title: 'Date Requested', name: 'CreatedDate', field: 'createddate'},
									{name: 'ContactPersonFirst', field: 'agritempbusinesslink.contactbusiness.contactperson.firstname', hidden: true},
									{name: 'ContactPersonLast', field: 'agritempbusinesslink.contactbusiness.contactperson.surname', hidden: true},
									{name: 'OtherContactPersonFirst', field: 'agritempbusinesslink.othercontactbusiness.contactperson.firstname', hidden: true},
									{name: 'OtherContactPersonLast', field: 'agritempbusinesslink.othercontactbusiness.contactperson.surname', hidden: true},
									{name: 'ContactBusiness', field: 'contactbusiness', hidden: true},
									{name: 'ContactPerson', field: 'agritempbusinesslink.contactbusiness.primarycontactperson', hidden: true},
									{name: 'OtherContactBusiness', field: 'othercontactbusiness', hidden: true},
									{name: 'OtherContactPerson', field: 'agritempbusinesslink.othercontactbusiness.primarycontactperson', hidden: true},
									{name: 'LinkType', field: 'linktype', hidden: true},
									{name: 'ContactPersonEmail', field: 'agritempbusinesslink.contactbusiness.contactperson.email', hidden: true},
									{name: 'OtherContactPersonEmail', field: 'agritempbusinesslink.othercontactbusiness.contactperson.email', hidden: true}
								 ];

				oParam.sortColumn = 'contactbusinesstext';
				oParam.sortDirection = 'asc';
				oParam.functionProcess = nsFreshcare.admin.relationships.linkRequests.process;
				oParam.functionSearch = nsFreshcare.admin.relationships.linkRequests.search;
				oParam.functionShow = nsFreshcare.admin.relationships.linkRequests.show;
				oParam.functionBind = nsFreshcare.admin.relationships.linkRequests.bindNoEmail;
				
				nsFreshcare.admin.relationships.linkRequests.show(oParam);
			});

			$('#ns1blankspaceControlByGrowerCertBody').click(function(event)
			{
				$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceMain').attr('data-loading', '1');
				
				oParam = {};
				oParam.xhtmlElementID = 'ns1blankspaceMain';

				oParam.label = 'Cert Body / ' + nsFreshcare.data.growerText + 'Links';
				oParam.xhtmlContext = 'CertBodyGrowerLinks';
				oParam.linkType = nsFreshcare.data.relationshipAuditor;
				
				oParam.searchFilters = [{name: 'linktype', comparison: 'EQUAL_TO', value1: nsFreshcare.data.relationshipAuditor}];
				oParam.columns = [
									{title: 'Certification Body', name: 'ContactBusinessText', field: 'contactbusinesstext'},
									{name: 'ContactPersonText', field: 'contactpersontext', hidden: true},
									{title: nsFreshcare.data.growerText, name: 'OtherContactBusinessText', field: 'othercontactbusinesstext'},
									{title: nsFreshcare.data.growerText + ' Contact', name: 'OtherContactPersonText', field: 'othercontactpersontext'},
									{name: 'ContactBusiness', field: 'contactbusiness', hidden: true},
									{name: 'ContactPerson', field: 'contactperson', hidden: true},
									{name: 'OtherContactBusiness', field: 'othercontactbusiness', hidden: true},
									{name: 'OtherContactPerson', field: 'othercontactperson', hidden: true},
									{name: 'LinkType', field: 'linktype', hidden: true},
									{name: 'ContactPersonEmail', field: 'relationship.contactperson.email', hidden: true},
									{name: 'OtherContactPersonEmail', field: 'relationship.othercontactperson.email', hidden: true}
								 ];

				oParam.sortColumn = 'contactbusinesstext';
				oParam.sortDirection = 'asc';
				oParam.functionProcess = nsFreshcare.admin.relationships.linkRequests.process;
				oParam.functionSearch = nsFreshcare.admin.relationships.linkRequests.search;
				oParam.functionShow = nsFreshcare.admin.relationships.linkRequests.show;
				
				nsFreshcare.admin.relationships.linkRequests.show(oParam);
			});
			
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';		
			oSearch.addField('contactbusinesstext,othercontactbusinesstext,typetext');
			oSearch.rows = 20;
			oSearch.sort('modifieddate', 'desc');
			
			oSearch.getResults(function(data) {nsFreshcare.admin.relationships.home(oParam, data)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table>' +
								'<tr><td class="ns1blankspaceNothing">' +
								'Click New to create a link.</td></tr></table>');
			}
			else
			{
				// v4.0.001 Bootstrap
				aHTML.push('<div class="ns1blankspaceCaption"' +
								'style="padding-left:8px; margin-bottom:10px; font-weight:500;">MOST RECENTLY MODIFIED</div>');

				aHTML.push('<table id="ns1blankspaceMostLikely" class="table">');
				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + 
											'" class="ns1blankspaceMostLikely">' +
											this.contactbusinesstext.formatXHTML() + 
											' is &nbsp;<span style="font-style: italic;">' + this.typetext + '</span>&nbsp; for ' +
											this.othercontactbusinesstext +
											'</td>');
					
					aHTML.push('</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.relationships.search.send(event.target.id, {source: 1});
			});
		}
	},

	search: 	
	{
		send: function (sXHTMLElementId, oParam)
		{
			
			if (jQuery.type(sXHTMLElementId).toLowerCase() === "object") 
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
			var iRows = 10;
			
			if (oParam != undefined)
			{
				if (oParam.source != undefined) {iSource = oParam.source}
				if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
				if (oParam.rows != undefined) {iRows = oParam.rows}
				if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
				if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
				if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
			}
			
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{							
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
				oSearch.addField('contactbusinesstext,contactbusiness,othercontactbusinesstext,othercontactbusiness,typetext,' +
								'type,startdate,enddate,description,contactpersontext,contactperson,othercontactperson,othercontactpersontext');

				oSearch.addField(ns1blankspace.option.auditFields);
				
				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.rf = 'json';
				oSearch.getResults(function(data) {nsFreshcare.admin.relationships.show(oParam, data)}) 
				
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
					ns1blankspace.search.start();
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
					oSearch.addField('contactbusinesstext,othercontactbusinesstext,typetext');
					
					oSearch.addBracket('(');
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						oSearch.addFilter('contactbusinesstext', 'TEXT_STARTS_WITH', sSearchText);
						oSearch.addOperator('or');
						oSearch.addFilter('othercontactbusinesstext', 'TEXT_STARTS_WITH', sSearchText);
					}
					else
					{	
						oSearch.addFilter('contactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator('or');
						oSearch.addFilter('othercontactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					oSearch.getResults(function(data) {nsFreshcare.admin.relationships.search.process(oParam, data)});
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
				$(ns1blankspace.xhtml.searchContainer).html('<table class="ns1blankspaceSearchMedium"><tr><td class="ns1blankspaceSubNote">Nothing to show</td></tr></table>');
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
					
					aHTML.push('<td class="ns1blankspaceSearch" id="contactbusiness' +
									'-' + this.id + '">' +
									this.contactbusinesstext + 
									'</td>');
					
					aHTML.push('<td class="ns1blankspaceSearch" id="type' +
									'-' + this.id + '">' +
									this.typetext + 
									'</td>');
					
					aHTML.push('<td class="ns1blankspaceSearch" id="othercontactbusiness' +
									'-' + this.id + '">' +
									this.othercontactbusinesstext + '</td>');
									
					if (iColumn == iMaximumColumns)
					{
						aHTML.push('</tr>');
						iColumn = 0;
					}	
				});
		    	
				aHTML.push('</table>');
				
				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init(
					{
						html: aHTML.join(''),
						more: (oResponse.morerows == "true"),
						header: false
					}) 
				);		
				
				$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
				
				ns1blankspace.search.stop();
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.admin.relationships.search.send(event.target.id, {source: 1});
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows and 1st & 2nd page of results now match formats
				ns1blankspace.render.bind(
				{
					columns: 'contactbusinesstext-column-typetext-column-othercontactbusinesstext',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.relationships.search.send
				});   
				
			}	
		},
	},						

	layout:	function ()
	{
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">Details</td></tr>');

		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
			nsFreshcare.admin.relationships.details();
		});
	},

	show: function (oParam, oResponse)
	{
		ns1blankspace.app.clean();

		nsFreshcare.admin.relationships.layout();
		
		var aHTML = [];
		
		if (oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find contact relationship.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			ns1blankspace.objectContextData = oResponse.data.rows[0];
			
			ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData.contactbusiness;
			ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData.contactbusinesstext;
			
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.contactbusinesstext);
			$('#ns1blankspaceViewControlAction').button({disabled: false});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
			
			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.admin.relationships.init({id: ' + ns1blankspace.objectContext + '})',
				move: false
			});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.relationships.details()', xhtmlElementID: 'ns1blankspaceControlDetails'});
		}	
	},		

	summary: function (oParam)
	{
		var aHTML = [];
		var dStart;
		var dEnd;
		var dToday = new Date();

		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this relationship.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'<td id="ns1blankspaceSummaryColumn2" style="width:300px;"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];

			dEnd = (ns1blankspace.objectContextData.enddate != '') 
					? new Date(ns1blankspace.objectContextData.enddate)
					: dToday;
		
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr><td id="ns1blankspaceSummaryBusiness" class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData.contactbusinesstext +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">' + ((dEnd < dToday) ? 'was' : 'is') + '</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceSummaryType" class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData.typetext +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">for</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceSummaryOtherBusiness" class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData.othercontactbusinesstext +
						'</td></tr>');

			if (ns1blankspace.objectContextData.startdate != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">From</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryStart" class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData.startdate +
							'</td></tr>');
			}				
							
			if (ns1blankspace.objectContextData.enddate != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">To</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryStart" class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData.enddate +
							'</td></tr>');
			}				
				
			if (ns1blankspace.objectContextData.description != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Notes</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryNotes" class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData.description +
							'</td></tr>');
			}				
					
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

		}	
	},

	details: function ()
	{
		var aHTML = [];
		var bUseLast = false;
		
		if (ns1blankspace.objectContext === -1 
			&& nsFreshcare.admin.relationships.data.lastSavedBusiness != undefined)
		{
			if (confirm("Do you want to keep the business / person details for the new relationship record?", 'Yes', 'No'))
			{
				bUseLast = true;
			}
		}

		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainDetails').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">');
			aHTML.push('<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMainDetails').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Business' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsBusiness" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Business"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' + 
								' data-columns="tradename"' +
								' data-click="nsFreshcare.util.defaultContactPerson"' + 
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Person' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsPerson" class="ns1blankspaceSelect"' +
								' data-caption="Person"' +
								' data-method="CONTACT_PERSON_SEARCH"' + 
								' data-columns="firstname-space-surname"' +
								' data-parent="ns1blankspaceDetailsBusiness"' +
								' data-parent-search-id="contactbusiness"' +
								' data-parent-search-text="tradename"' + 
								' data-methodFilter="firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Is' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspace">' +
							'<input id="ns1blankspaceDetailsType" class="ns1blankspaceSelect"' +
								' data-method="CONTACT_RELATIONSHIP_TYPE_SEARCH">' +
							'</td></tr>');							
							
			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'For Business' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsForBusiness" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="For Business"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' + 
								' data-columns="tradename"' +
								' data-click="nsFreshcare.util.defaultContactPerson"' + 
								' data-methodFilter="tradename-TEXT_IS_LIKE|legalname-TEXT_IS_LIKE">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption">' +
							'For Person' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsForPerson" class="ns1blankspaceSelect"' +
								' data-caption="For Person"' +
								' data-method="CONTACT_PERSON_SEARCH"' + 
								' data-columns="firstname-space-surname"' +
								' data-parent="ns1blankspaceDetailsForBusiness"' +
								' data-parent-search-id="contactbusiness"' +
								' data-parent-search-text="tradename"' + 
								' data-methodFilter="firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE|' +
													'contactperson.contactbusiness.id-NOT_EQUAL_TO-' + $('#ns1blankspaceDetailsBusiness').attr('data-id') + '"' +
								'>' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Start Date' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsStart" class="ns1blankspaceDate"' +
								' data-mandatory="1 data-caption="Start Date">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'End Date' +
							'</td></tr>' +
							'<tr class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsEnd" class="ns1blankspaceDate">' +
							'</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
			
			var aHTML = [];
				
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Description / Notes' +
							'</td></tr>' +
							'<tr class="ns1blankspaceTextMulti">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsDescription" class="ns1blankspaceTextMulti"></textarea>' +
							'</td></tr>');
			
			aHTML.push('</table>');					
				
			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

			ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});

			if (ns1blankspace.objectContextData != undefined)
			{
				// v3.2.018 SUP023500 Added formatXHTML to description
				$('#ns1blankspaceDetailsBusiness').val(ns1blankspace.objectContextData.contactbusinesstext.formatXHTML());
				$('#ns1blankspaceDetailsBusiness').attr('data-id', ns1blankspace.objectContextData.contactbusiness);
				$('#ns1blankspaceDetailsPerson').val(ns1blankspace.objectContextData.contactpersontext.formatXHTML());
				$('#ns1blankspaceDetailsPerson').attr('data-id', ns1blankspace.objectContextData.contactperson);
				$('#ns1blankspaceDetailsType').val(ns1blankspace.objectContextData.typetext.formatXHTML());
				$('#ns1blankspaceDetailsType').attr('data-id', ns1blankspace.objectContextData.type);
				$('#ns1blankspaceDetailsForBusiness').val(ns1blankspace.objectContextData.othercontactbusinesstext.formatXHTML());
				$('#ns1blankspaceDetailsForBusiness').attr('data-id', ns1blankspace.objectContextData.othercontactbusiness);
				$('#ns1blankspaceDetailsForPerson').val(ns1blankspace.objectContextData.othercontactpersontext.formatXHTML());
				$('#ns1blankspaceDetailsForPerson').attr('data-id', ns1blankspace.objectContextData.othercontactperson);
				$('#ns1blankspaceDetailsStart').val(ns1blankspace.objectContextData.startdate);
				$('#ns1blankspaceDetailsEnd').val(ns1blankspace.objectContextData.enddate);
				$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData.description.formatXHTML());
			}
			else
			{
				if (bUseLast)
				{	
					$('#ns1blankspaceDetailsBusiness').val(nsFreshcare.admin.relationships.data.lastSavedBusinessText);
					$('#ns1blankspaceDetailsBusiness').attr('data-id', nsFreshcare.admin.relationships.data.lastSavedBusiness);
					$('#ns1blankspaceDetailsPerson').val(nsFreshcare.admin.relationships.data.lastSavedPersonText);
					$('#ns1blankspaceDetailsPerson').attr('data-id', nsFreshcare.admin.relationships.data.lastSavedPerson);
					$('#ns1blankspaceDetailsType').val(nsFreshcare.admin.relationships.data.lastSavedTypeText);
					$('#ns1blankspaceDetailsType').attr('data-id', nsFreshcare.admin.relationships.data.lastSavedType);
				}
				else 
				{
					// v4.0.001 Was erroring if contactBusinessText wasn't defined
					if (nsFreshcare.admin.relationships.data.contactBusiness && nsFreshcare.admin.relationships.data.contactBusinessText)
					{
						$('#ns1blankspaceDetailsBusiness').val(nsFreshcare.admin.relationships.data.contactBusinessText.formatXHTML());
						$('#ns1blankspaceDetailsBusiness').attr('data-id', nsFreshcare.admin.relationships.data.contactBusiness);
					}
					if (nsFreshcare.admin.relationships.data.contactPerson)
					{
						$('#ns1blankspaceDetailsPerson').val(nsFreshcare.admin.relationships.data.contactPersonText.formatXHTML());
						$('#ns1blankspaceDetailsPerson').attr('data-id', nsFreshcare.admin.relationships.data.contactPerson);
					}
				}
				$('#ns1blankspaceDetailsStart').val((new Date()).toString('dd MMM yyyy'));
			}
		}	
	},

	linkRequests: 
	{
		search: function(oParam)
		{
			var aFields = [];
			var aSearchFilters = [];
			var sFields;
			var sSortColumn = '';
			var sSortDirection;

			if (oParam)
			{
				if (oParam.searchFilters) {aSearchFilters = oParam.searchFilters}
				if (oParam.columns) {aFields = oParam.columns}
				if (oParam.sortColumn != undefined) {sSortColumn = oParam.sortColumn}
				if (oParam.sortDirection != undefined) {sSortDirection = oParam.sortDirection}
			}

			ns1blankspace.status.working();
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_TEMP_BUSINESS_LINK_SEARCH';

			// Process the field list
			if (aFields.length > 0)
			{
				sFields = $.map($.grep(aFields, function(x) {return x.field}), function(y) {return y.field}).join(',');
			}

			if (sFields != undefined && sFields != '')
			{
				oSearch.addField(sFields);
	
				// Process the filters
				if (aSearchFilters.length > 0)
				{
					// v4.0.015 Removed ApplyToSubSearchJoin filter parameter
					$.each(aSearchFilters, function()
					{
						oSearch.addFilter(this.name, this.comparison, this.value1, this.value2, this.value3);
					});
				}

				// Process the sort 
				if (sSortColumn != '')
				{
					oSearch.sort(sSortColumn, sSortDirection);
				}

				oSearch.rows = 200;
				oSearch.getResults(function(oResponse)
				{
					ns1blankspace.status.clear();

					if (oResponse.status === 'OK')
					{
						nsFreshcare.admin.relationships.linkRequests.show(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}
			else
			{
				ns1blankspace.status.error('No fields passed to search. Please contact support.');
				return;
			}
		},

		show: function(oParam, oResponse)
		{
			// Allows for generic display of links Processing list

			var dToday = new Date();
			var sXHTMLElementID = 'ns1blankspaceLinksColumn1';
			var sLabel = 'Create / Delete Links.';
			var sXHTMLContext = 'Links';
			var sSortColumn = '';
			var sSortDirection;
			var aFilters = [];
			var aColumns = [];
			var fFunctionProcess;
			var fFunctionSearch;
			var fFunctionShow;
			var fFunctionBind = nsFreshcare.admin.relationships.linkRequests.bind;

			if (oParam != undefined)
			{
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.xhtmlContext != undefined) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.filters != undefined) {aFilters = oParam.filters}
				if (oParam.columns != undefined) {aColumns = oParam.columns}
				if (oParam.functionProcess != undefined) {fFunctionProcess = oParam.functionProcess}
				if (oParam.functionSearch != undefined) {fFunctionSearch = oParam.functionSearch}
				if (oParam.functionShow != undefined) {fFunctionShow = oParam.functionShow}
				if (oParam.functionBind != undefined) {fFunctionBind = oParam.functionBind}
				if (oParam.sortColumn != undefined) {sSortColumn = oParam.sortColumn}
				if (oParam.sortDirection!= undefined) {sSortDirection = ((oParam.sortDirection === 'asc') ? 'desc' : 'asc')}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') 
			{

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<div id="ns1blankspaceLinksBulkMain" class="ns1blankspaceControlMain">');
				aHTML.push('<table id="ns1blankspaceLinksBulkContainer"><tr>');
				aHTML.push('<td id="ns1blankspaceLinksBulkColumn1" class="ns1blankspaceColumn1Flexible"></td>');
				aHTML.push('</tr></table>');	
				aHTML.push('</div>');
				
				$('#' + sXHTMLElementID).html(aHTML.join(''));


				aHTML.push('<table id="ns1blankspaceLinks' + sXHTMLContext + '"><tr>');
				aHTML.push('<td id="ns1blankspaceLinks' + sXHTMLContext + 'Results" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceLinks' + sXHTMLContext + 'SearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
						   '<td id="ns1blankspaceLinks' + sXHTMLContext + 'Filter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#ns1blankspaceLinksBulkColumn1').html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// V4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceLinks' + sXHTMLContext + 'SearchHandle" style="height:25px" title="Search Criteria"></span>');
				aHTML.push('<span id="ns1blankspaceLinks' + sXHTMLContext + 'Process" style="height:25px" title="Create Links"></span>');
				aHTML.push('<span id="ns1blankspaceLinks' + sXHTMLContext + 'Delete" style="height:25px" title="Delete Links"></span>');
				$('#ns1blankspaceLinks' + sXHTMLContext + 'SearchRibbon').html(aHTML.join(''));

				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceLinks' + sXHTMLContext + 'Search" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceLinks' + sXHTMLContext + 'StatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

				// Filtering area
				if (aFilters.length > 0)
				{
					$.each(aFilters, function()
					{
						var oFilter = this;
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">' + oFilter.title + '</td></tr>');

						if ($.type(oFilter.values) === 'string')
						{
							oFilter.values = nsFreshcare.internal.data[oFilter.values];
						}

						$.each(oFilter.values, function(index)
						{
							aHTML.push('<tr><td id="ns1blankspace' + oFilter.name + '_' + this.id + '" ' +
												'class="ns1blankspace' + oFilter.name + ' nsFreshcareSelectable ' + 
													((oFilter.selected === 'all' || (oFilter.selected === 'first' && index === 0)) ? 'nsFreshcareSelected" data-selected="1"' : '"') +
												'>' + 
												this.value.formatXHTML() + 
										'</td></tr>');
						});
						
						aHTML.push('<tr><td>&nbsp;</td></tr>');							
					});

					aHTML.push('</table>');

				}
				$('#ns1blankspaceLinks' + sXHTMLContext + 'Filter').html(aHTML.join(''));

				// Bind the Search Handle (hides the search criteria area)
				$('#ns1blankspaceLinks' + sXHTMLContext + 'SearchHandle')
					.button(
					{
						text: false,
						icons: {primary: 'ui-icon-arrowthickstop-1-w'}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() 
					{
						$('#ns1blankspaceLinks' + sXHTMLContext + 'SearchHandle').hide();
						$('#ns1blankspaceLinks' + sXHTMLContext + 'Filter').show('slide', {direction: 'left'}, 500);
					});

				// Bind the Process button
				$('#ns1blankspaceLinks' + sXHTMLContext + 'Process')
					.button({
						text: false,
						icons: { primary: 'ui-icon-check'}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() 
					{
						oParam.operation = 'Create';
						fFunctionProcess(oParam);
					});
				$('#ns1blankspaceLinks' + sXHTMLContext + 'Process').hide();

				// Bind the Delete button
				$('#ns1blankspaceLinks' + sXHTMLContext + 'Delete')
					.button({
						text: false,
						icons: { primary: 'ui-icon-close'}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() 
					{
						oParam.operation = 'Delete';
						fFunctionProcess(oParam);
					});
				$('#ns1blankspaceLinks' + sXHTMLContext + 'Delete').hide();

				// Bind Filter(s)
				$.each(aFilters, function()
				{
					var sName = this.name;
					if (this.maxSelect === 1)
					{
						$('.ns1blankspace' + this.name).click(function() 
						{
							$('.ns1blankspace' + sName).removeClass('nsFreshcareSelected');
							$('.ns1blankspace' + sName).attr('data-selected','0');
							
							$(this).addClass('nsFreshcareSelected');
							$(this).attr('data-selected', '1');
						});
					}
					else
					{
						$('.ns1blankspace' + this.name).click(function() 
						{
							$(this).attr('data-selected',(($(this).hasClass('nsFreshcareSelected')) ? '0' : '1'));
							$(this).toggleClass('nsFreshcareSelected');
							
						});
					}

				});

				// Bind the Search button
				$('#ns1blankspaceLinks' + sXHTMLContext + 'Search')
					.button({
						label: "Search"
					})
					.click(function() 
					{
						ns1blankspace.okToSave = true;

						if (aFilters.length > 0)
						{
							$.each(aFilters, function()
							{
								if ($('.ns1blankspace' + this.name + '[data-selected="1"]').length === 0) 
								{
									$('#ns1blankspaceLinks' + sXHTMLContext + 'StatusMessage').html('Please choose at least one ' + this.title + '.');
									ns1blankspace.okToSave = false;
								}
								else
								{
									oParam['filter.' + this.name] = $.map($('.ns1blankspace' + this.name + '[data-selected="1"]'), function(x) {return $(x).attr('id').split('_').pop()});
								}
							});
						}

						if (ns1blankspace.okToSave) 
						{
							$('#ns1blankspaceLinks' + sXHTMLContext + 'Filter').hide(
							{duration: 200, complete: function() 
								{

								$('#ns1blankspaceLinks' + sXHTMLContext + 'SearchHandle').show();
								$('#ns1blankspaceLinks' + sXHTMLContext + 'Process').show();
								$('#ns1blankspaceLinks' + sXHTMLContext + 'Delete').show();
								$('#ns1blankspaceLinks' + sXHTMLContext + 'Results').html(ns1blankspace.xhtml.loading);
								oParam = ns1blankspace.util.setParam(oParam, "onComplete", fFunctionShow)

								fFunctionSearch(oParam);
								}
							});

						}
						else 
						{
							window.setTimeout('$("#ns1blankspaceLinks' + sXHTMLContext + 'StatusMessage").fadeOut(4000)', 7000);
						}
					});

				$('#ns1blankspaceLinks' + sXHTMLContext + 'Search').click();
			}

			if (oResponse) 
			{	
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No records</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceLinks' + sXHTMLContext + 'Results').html(aHTML.join(''));
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceLinks' + sXHTMLContext + '" class="ns1blankspace">');
					
					aHTML.push('<tr class="ns1blankspaceCaption">');

					// Add in the column headers with sorting if applicable
					$.each($.grep(aColumns, function(x) {return x.hidden == undefined || x.hidden === false}), function()
					{
						aHTML.push('<td class="ns1blankspaceHeaderCaption' + ((sSortColumn != '') ? ' ns1blankspaceHeaderSort' : '') + '"' +
									' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
									' data-column="' + this.field + '"' +
									' data-sortdirection="' + ((sSortColumn == this.field) ? sSortDirection : 'asc') + '">' +
										this.title + 
									'</td>');
					});

					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceMainRowOptionsSelect"' +
								' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;">' + 
								'<input type="checkbox" id="ns1blankspaceLinks' + sXHTMLContext + 'CheckAll"' +
									' class="ns1blankspaceLinks' + sXHTMLContext + '" checked="false">' +
								'</td>');

					aHTML.push('</tr>');

					nsFreshcare.admin.relationships.data.linkBulkParams = oParam;
					
					$.each(oResponse.data.rows, function() 	
					{
						aHTML.push(nsFreshcare.admin.relationships.linkRequests.row(this));
					});
					
					aHTML.push('</table>');

					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceLinks' + sXHTMLContext + 'Results',
						xhtmlContext: 'Links' + sXHTMLContext,
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.admin.relationships.linkRequests.row,
						functionNewPage: fFunctionBind + '()',
						type: 'json'
					}); 	
					
					fFunctionBind();
				}
			}
		},

		row: function(oRow)
		{
			var aColumns = nsFreshcare.admin.relationships.data.linkBulkParams.columns;
			var sXHTMLContext = nsFreshcare.admin.relationships.data.linkBulkParams.xhtmlContext;
			var sGroupAtColumn = nsFreshcare.admin.relationships.data.linkBulkParams.groupAtColumn;
			var sGroupAtValue = nsFreshcare.admin.relationships.data.linkBulkParams.groupAtValue;
			var aHTML = [];
			
			// Determine if we need to repeat the header for the GroupAt. No need to add sorting here as only required on top header
			if (sGroupAtColumn && sGroupAtValue && sGroupAtValue != oRow[sGroupAtColumn])
			{
				aHTML.push('<tr><td colspan="' + $.grep(aColumns, function(x) {return x.hidden == undefined || x.hidden === false}).length + '">&nbsp;</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">');
				$.each($.grep(aColumns, function(x) {return x.hidden == undefined || x.hidden === false}), function()
				{
					aHTML.push('<td class="ns1blankspaceHeaderCaption"' +
									' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
									'>' +
									this.title + 
								'</td>');
				});
				aHTML.push('</tr>');
			}

			if (sGroupAtColumn)
			{
				nsFreshcare.admin.relationships.data.linkBulkParams.groupAtValue = oRow[sGroupAtColumn];
			}

			aHTML.push('<tr id="ns1blankspaceLink' + sXHTMLContext + 'Include_row-' + oRow.id + '" class="ns1blankspaceRow">');

			$.each($.grep(aColumns, function(x) {return x.hidden == undefined || x.hidden === false}), function()
			{
				var sValue;
				if (this.functionCalculate != undefined)
				{
					sValue = this.functionCalculate(oRow);
				}
				else {sValue = oRow[this.field]}

				aHTML.push('<td id="ns1blankspaceLinks' + sXHTMLContext + '_' + this.name + '-' + oRow.id + '"' +
								' class="ns1blankspaceRow' + ((this.elementEditClass) ? ' ' + this.elementEditClass : '') + '">' +
										sValue + 
							'</td>');
			});
						

			aHTML.push('<td id="ns1blankspaceLinks' + sXHTMLContext + '-' + oRow.id + '"' +
						' class="ns1blankspaceMainRowOptionsInclude"' +
						' style="color:#B8B8B8; padding:4px; vertical-align:top;">' + 
						'<input type="checkbox" id="ns1blankspaceLink' + sXHTMLContext + 'Include-' + oRow.id + '"' +
						' class="ns1blankspaceLink' + sXHTMLContext + 'Include" ' +
						' checked="false"');

			$.each(aColumns, function()
			{
				var sValue;
				if (this.functionCalculate != undefined)
				{
					sValue = this.functionCalculate(oRow);
				}
				else {sValue = oRow[this.field]}

				aHTML.push(' data-' + this.name + '="' + sValue + '"');
			});

			aHTML.push('></td>');

			return aHTML.join('');
		},

		bind: function()
		{
			var sXHTMLContext = nsFreshcare.admin.relationships.data.linkBulkParams.xhtmlContext;
			var aEditClasses = $.grep(nsFreshcare.admin.relationships.data.linkBulkParams.columns, function(x) {return x.elementEditClass && x.elementEditClass != ''});
			
			$('#ns1blankspaceLinks' + sXHTMLContext + 'CheckAll').click(function()
			{
				// v4.0.001 Was using attr('checked')
				if ($(this).prop('checked'))
				{
					$('input.ns1blankspaceLink' + sXHTMLContext + 'Include').prop('checked', true);
				}
				else
				{
					$('input.ns1blankspaceLink' + sXHTMLContext + 'Include').prop('checked', false);
				}
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					delete(nsFreshcare.admin.relationships.data.linkBulkParams.groupAtValue);
					var oParam = nsFreshcare.admin.relationships.data.linkBulkParams;
					var fFunctionSearch = oParam.functionSearch;

					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					oParam.membershipStatusSearchStep = 2;
					fFunctionSearch(oParam);
				});

			if (aEditClasses.length > 0)
			{
				var aClassesBound = [];
				$.each(aEditClasses, function()
				{
					if ($.inArray(this.elementEditClass, aClassesBound) === -1)
					{
						$('.' + this.elementEditClass).click(function(event)
						{
							nsFreshcare.util.elementEdit.start({xhtmlElementID: event.target.id,
																save: this.elementEditSave,
																mandatory: this.elementEditMandatory,
																functionValidate: nsFreshcare.internal.financial.validateLineItemAmount,
																onComplete: nsFreshcare.util.elementEdit.stop
															});
						});
						aClassesBound.push(this.elementEditClass);
					}
				});
			}
		},

		process: function(oParam)
		{
			var iRowIndex = 0;
			var iOperation;
			var sData = '';
			var oThisElement;
			var iRelationshipId;
			var sLabel = '';
			var sXHTMLContext = '';
			var aFilters = [];

			if (oParam)
			{
				if (oParam.operation != undefined) {iOperation = ((oParam.operation === 'Create') ? 0 : 1)}
				if (oParam.successful === undefined) {oParam.successful = false}
				if (oParam.label != undefined) {sLabel = oParam.label}
				if (oParam.xhtmlContext != undefined) {sXHTMLContext = oParam.xhtmlContext}
				if (oParam.filters != undefined) {aFilters = oParam.filters}
				if (oParam.rowIndex != undefined) {iRowIndex = oParam.rowIndex}
			}

			if (oParam.linksProcessStep === undefined) 
			{
				oParam.linksProcessStep = 1;
				oParam.rowIndex = iRowIndex;
				if (confirm('Are you sure you want to ' + oParam.operation + ' selected ' + sLabel + '?', 'Yes', 'No'))
				{
					// Disable all the check boxes first so user can't change them part way through processing
					$('#ns1blankspaceLinks' + sXHTMLContext + 'CheckAll').attr('disabled', true);
					$('.ns1blankspaceLinks' + sXHTMLContext + 'Include').attr('disabled', true);
					$('#ns1blankspaceLinks' + sXHTMLContext + 'Process').attr('disabled', true);
					$('#ns1blankspaceLinks' + sXHTMLContext + 'Delete').attr('disabled', true);
					$('#ns1blankspaceLinks' + sXHTMLContext + 'SearchHandle').attr('disabled', true);

					if (aFilters.length > 0)
					{
						$.each(aFilters, function()
						{
							oParam['filter.' + this.name] = $.map($('.ns1blankspace' + this.name + '[data-selected="1"]'), function(x) {return $(x).attr('id').split('_').pop()});
						});
					}

					oParam.linksProcessStep = (iOperation === 0) ? 2 : 4;

					nsFreshcare.admin.relationships.data.linkCreateData = $('input.ns1blankspaceLink' + sXHTMLContext + 'Include:checked');
					
					nsFreshcare.admin.relationships.linkRequests.process(oParam);

					$('#ns1blankspaceLinks' + sXHTMLContext + 'CheckAll').attr('disabled', false);
					$('.ns1blankspaceLinks' + sXHTMLContext + 'Include').attr('disabled', false);
					$('#ns1blankspaceLinks' + sXHTMLContext + 'Process').attr('disabled', false);
					$('#ns1blankspaceLinks' + sXHTMLContext + 'Delete').attr('disabled', false);
					$('#ns1blankspaceLinks' + sXHTMLContext + 'SearchHandle').attr('disabled', false);
				}
				else
				{
					delete(nsFreshcare.admin.relationships.data.linkCreateData);
					delete(oParam.linksProcessStep);
					delete(oParam.rowIndex);
					iRowIndex = 999;
				}
			}

			else
			{
				if (iRowIndex < nsFreshcare.admin.relationships.data.linkCreateData.length)
				{
					oThisElement = nsFreshcare.admin.relationships.data.linkCreateData[iRowIndex];
					iRelationshipId = $(oThisElement).attr('id').split('-').pop();

					// Check to see if the link already exists
					if (oParam.linksProcessStep === 2)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Checking if link already exists..'});

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
						oSearch.addField('contactbusiness,type');
						oSearch.addFilter('contactbusiness', 'EQUAL_TO', $(oThisElement).attr('data-contactbusiness'));
						oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', $(oThisElement).attr('data-othercontactbusiness'));
						//oSearch.addFilter('type', 'EQUAL_TO', $(oThisElement).attr('data-linktype'));
						oSearch.rows = 1;
						oSearch.addSummaryField('count (*) linkcount');
						oSearch.getResults(function(oResponse)
						{
							var sErrorNote;

							if (oResponse.status === 'OK')
							{
								// v3.1.1i SUP022770 Now checks if a 'DO NOT  LINK' link already exists as well
								if ($.grep(oResponse.data.rows, function(x) {return x.type == $(oThisElement).attr('data-linktype') 
																			     || x.type == nsFreshcare.data.relationshipDoNotLink}).length == 0)
								{
									oParam.linksProcessStep = 3;
								}
								else
								{
									if ($.grep(oResponse.data.rows, function(x) {return x.type == nsFreshcare.data.relationshipDoNotLink}).length > 0)
									{
										sErrorNote = 'The ' + nsFreshcare.data.growerText + ' has requested that this Supplier not be linked.';
									}
									else
									{
										sErrorNote = (Number(oResponse.summary.linkcount) > 1) 
														? $.grep(oResponse.data.rows, function(x) {return x.type == $(oThisElement).attr('data-linktype')}).length + ' of these links already exist.'
														: 'This link already exists.';
									}
									oParam.linksProcessStep = 10;
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Link could not be created.',
																errorNotes: sErrorNote});

								}
							}
							else
							{
								oParam.linksProcessStep = 10;
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Link could not be created.',
															errorNotes: oResponse.error.errornotes});
							}						

							nsFreshcare.admin.relationships.linkRequests.process(oParam);
						});
					}	
							
					// Now Create the link
					else if (oParam.linksProcessStep === 3)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Creating relationship link..'});

						sData += 'contactbusiness=' + ns1blankspace.util.fs($(oThisElement).attr('data-contactbusiness')) +
								'&contactperson=' + ns1blankspace.util.fs($(oThisElement).attr('data-contactperson')) +
								'&othercontactbusiness=' + ns1blankspace.util.fs($(oThisElement).attr('data-othercontactbusiness')) +
								'&othercontactperson=' + ns1blankspace.util.fs($(oThisElement).attr('data-othercontactperson')) +
								'&type=' + ns1blankspace.util.fs($(oThisElement).attr('data-linktype')) +
								'&startdate=' + ns1blankspace.util.fs((new Date()).toString('dd MMM yyyy'));

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
							data: sData,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.linksProcessStep = 4;
									oParam.linkSuccessful = true;
								}
								else
								{
									oParam.linkSuccessful = false;
									oParam.linkCreateError = oResponse.error.errornotes;
									oParam.linksProcessStep = 10;
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Link could not be created.',
																errorNotes: oResponse.error.errornotes});
								}
								nsFreshcare.admin.relationships.linkRequests.process(oParam);
							}
						});
					}

					// Delete the temporary link
					else if (oParam.linksProcessStep === 4)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Deleting link request..'});

						sData = 'remove=1&id=' + ns1blankspace.util.fs(iRelationshipId);

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_TEMP_BUSINESS_LINK_MANAGE'),
							data: sData,
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.linksProcessStep = (iOperation == 0) ? 5 : 10;
									oParam.linkRemoveSuccessful = true;
									oParam.successful = (iOperation === 0) ? oParam.successful : true;
								}
								else
								{
									oParam.linkRemoveSuccessful = false;
									oParam.linkRemoveError = oResponse.error.errorNotes;
									if (iOperation === 0 && oParam.linkSuccessful)
									{	// If the link creation was sucessful but the delete failed, we still need to send the email out to the Grower and Customer
										oParam.linksProcessStep = 5;
									}
									else
									{
										oParam.linksProcessStep = 10;
									}
									oParam.linksProcessStep = 10;
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Link request could not be deleted.',
																errorNotes: oResponse.error.errornotes});
								}
								nsFreshcare.admin.relationships.linkRequests.process(oParam);
							}
						});
					}

					// Send email to Customer
					else if (oParam.linksProcessStep === 5)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Sending email to customer..'});

						if ($(oThisElement).attr('data-othercontactpersonemail') != '')
						{
							// v3.1.0i SUP022398 No longer does BCC to admin and sends from emailToAdmin
							sData = 'subject=' + ns1blankspace.util.fs('Notification of link to Supplier') +
									'&message=' + ns1blankspace.util.fs("As requested, Supplier  " + $(oThisElement).attr('data-contactbusinesstext') + " has been linked to your business.") + 
									'&to=' + ns1blankspace.util.fs($(oThisElement).attr('data-othercontactpersonemail')) +
									'&fromemail=' + ns1blankspace.util.fs(nsFreshcare.data.emailToAdmin) +
									'&save=Y' +
									'&saveagainstcontactbusiness=' + ns1blankspace.util.fs($(oThisElement).attr('data-othercontactbusiness'));

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
								data: sData,
								rf: 'json',
								success: function(oResponse)
								{
									oParam.linksProcessStep = 6;	
									if (oResponse.status === 'OK')
									{
										oParam.successful = true;
									}
									else
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																	errorMessage: 'Email to Supplier could not be sent.',
																	errorNotes: oResponse.error.errornotes});
									}
									nsFreshcare.admin.relationships.linkRequests.process(oParam);
								}
							});
						}
						else 	// No email
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
														errorMessage: 'Email to Supplier could not be sent.',
														errorNotes: 'No email address'});
							oParam.linksProcessStep = 6;	
							nsFreshcare.admin.relationships.linkRequests.process(oParam);
						}
					}

					// Send email to Grower (Supplier)
					else if (oParam.linksProcessStep === 6)
					{
						nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Sending email to grower..'});

						if ($(oThisElement).attr('data-contactpersonemail') != '')
						{
							// v3.1.0i SUP022398 No longer does BCC to admin & sends from emailToAdmin
							// v3.2.022 SUP023608 Changed text of message
							sData = 'subject=' + ns1blankspace.util.fs('Notification of link to Customer') +
									'&message=' + ns1blankspace.util.fs("You have been linked as a Supplier for Customer " + $(oThisElement).attr('data-othercontactbusinesstext') + 
																		". You were sent an email notifying you of this request 8 days ago, and as you have not notified us otherwise, " +
																		"the link has now been established. If you would like this link removed or further information, please contact us: " +
																		'<a href="mailto:admin@freshcare.com.au">admin@freshcare.com.au</a> / 1300 853 508') + 
									'&to=' + ns1blankspace.util.fs($(oThisElement).attr('data-contactpersonemail')) +
									'&fromemail=' + ns1blankspace.util.fs(nsFreshcare.data.emailToAdmin) +
									'&save=Y' +
									'&saveagainstcontactbusiness=' + ns1blankspace.util.fs($(oThisElement).attr('data-contactbusiness')) +
									'&saveagainstcontactperson=' + ns1blankspace.util.fs($(oThisElement).attr('data-contactperson'));

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
								data: sData,
								rf: 'json',
								success: function(oResponse)
								{
									oParam.linksProcessStep = 10;		
									if (oResponse.status === 'OK')
									{
										oParam.growerEmailSuccessful = true;
									}
									else
									{
										oParam.growerEmailSuccessful = false;
										oParam.growerEmailError = oResponse.error.errornotes;
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																	errorMessage: 'Email to ' + nsFreshcare.data.growerText + ' could not be sent.',
																	errorNotes: oResponse.error.errornotes});
									}
									nsFreshcare.admin.relationships.linkRequests.process(oParam);
								}
							});
						}
						else 	// No Email address - tell user
						{
							oParam.growerEmailSuccessful = false;
							oParam.growerEmailError = oResponse.error.errornotes;
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
														errorMessage: 'Email to ' + nsFreshcare.data.growerText + ' could not be sent.',
														errorNotes: 'No email address'});
							oParam.linksProcessStep = 10;		
							nsFreshcare.admin.relationships.linkRequests.process(oParam);
						}
					}

					else if (oParam.linksProcessStep === 10)
					{
						oParam.rowIndex = iRowIndex + 1;

						if (oParam.successful)		
						{
							if (iOperation === 0 && !oParam.growerEmailSuccessful)
							{	// Supplier email sucessful but Grower email was not - put Grower email error back on page
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Customer email sent but Email to ' + nsFreshcare.data.growerText + ' failed.',
															errorNotes: oParam.growerEmailError});
							}
							else if (iOperation === 0 && !oParam.linkRemoveSuccessful)
							{	// Link create was successful (because oParam.successful) but link remove wasn't - put link remove error back on page
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Customer & ' + nsFreshcare.data.growerText + ' email sent but link request not removed.',
															errorNotes: oParam.linkRemoveError});
							}
							else
							{	// Process was a succcess, remove status row
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, remove: true});
								$(oThisElement).parent().parent().remove();
							}
						}

						delete(oParam.successful);
						delete(oParam.linkSuccessful);
						delete(oParam.growerEmailSuccessful);
						oParam.linksProcessStep = (iOperation === 0) ? 2 : 4;
						nsFreshcare.admin.relationships.linkRequests.process(oParam);

					}
				}
				else
				{
					if (nsFreshcare.admin.relationships.data.linkCreateData.length == 0)
					{
						ns1blankspace.status.error('There are no line items to process');
					}
					else
					{
						ns1blankspace.status.message('Processing completed');
					}
					delete(nsFreshcare.admin.relationships.data.linkCreateData);
					delete(oParam.linksProcessStep);
					delete(oParam.rowIndex);
				}
			}
		},

		bindNoEmail: function(oParam)
		{
			nsFreshcare.admin.relationships.linkRequests.bind();

			// If the Grower or Customer has no email, add nsFreshcareImportant class and add hover message that the contact has no email
			$.each($('.ns1blankspaceLinkCustomerSupplierLinksInclude:visible'), function()
			{	
				var oRowId = this.id.split('-').pop();

				// Check customer email first
				if ($(this).attr('data-othercontactpersonemail') == '')
				{
					$('#ns1blankspaceLinksCustomerSupplierLinks_OtherContactBusinessText-' + oRowId)
						.addClass('nsFreshcareImportant')
						.hover(
							function(event) 
							{
								var sId = this.id.split('-').pop();
								$('#ns1blankspaceMultiUseDialog').show();
									
								ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceLinksCustomerSupplierLinks_OtherContactBusinessText-' + sId, topOffset: 10, xhtmlElementContainerID: 'ns1blankspaceMultiUseDialog'});

								$('#ns1blankspaceMultiUseDialog').html('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
												'<td><span class="ns1blankspaceSearch" style="font-size:0.625em;">Customer has no email address!</span></td>' +
												'</tr></table>');
							},
							function() 
							{
								$('#ns1blankspaceMultiUseDialog').hide();
								$('#ns1blankspaceMultiUseDialog').html('');
							}
						);
				}

				// Now check grower email
				if ($(this).attr('data-contactpersonemail') == '')
				{
					$('#ns1blankspaceLinksCustomerSupplierLinks_ContactPersonText-' + oRowId)
						.addClass('nsFreshcareImportant')
						.hover(
							function(event) 
							{
								var sId = this.id.split('-').pop();
								$('#ns1blankspaceMultiUseDialog').show();
									
								ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceLinksCustomerSupplierLinks_ContactPersonText-' + sId, topOffset: 10, xhtmlElementContainerID: 'ns1blankspaceMultiUseDialog'});
								$('#ns1blankspaceMultiUseDialog').html('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
												'<td><span class="ns1blankspaceSearch" style="font-size:0.625em;">' + nsFreshcare.data.growerText + ' has no email address!</span></td>' +
												'</tr></table>');
							},
							function() 
							{
								$('#ns1blankspaceMultiUseDialog').hide();
								$('#ns1blankspaceMultiUseDialog').html('');
							}
						);
				}
			});
		}
	},

	save:
	{
		validate: function(oParam)
		{
			
			$('input[data-mandatory]').each(function() 
			{
				if (($(this).val() === ''
	   				|| ($(this).attr('data-method') != undefined && $(this).attr('data-id') === undefined))) 
				{
					ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
					$(this).focus();
					ns1blankspace.okToSave = false;
					return false;
				}
			});

			if (ns1blankspace.okToSave)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
				oSearch.addField('id');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', $('#ns1blankspaceDetailsBusiness').attr('data-id'));
				oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', $('#ns1blankspaceDetailsForBusiness').attr('data-id'));
				oSearch.addFilter('type', 'EQUAL_TO', $('#ns1blankspaceDetailsForType').attr('data-id'))
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (oResponse.data.rows.length === 0)
						{
							oParam.relationshipSaveStep = 2;
							nsFreshcare.admin.relationships.save.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('This relationship already exists');
							if (confirm('Relationship already exists - would you like to open this record?', 'Yes', 'No'))
							{
								ns1blankspace.status.clear();
								nsFreshcare.admin.relationships.search.send({xhtmlElementID: '-' + oResponse.data.rows[0].id});
							}
						}
					}
					else
					{
						ns1blankspace.status.error('Error searching for existing relationship');
					}
				})
			}
		},

		send: function(oParam)
		{
			var sData = 'id=';

			if (oParam === undefined) {oParam = {relationshipSaveStep: 1}}

			if (oParam.relationshipSaveStep === 1)
			{
				ns1blankspace.okToSave = true;
				nsFreshcare.admin.relationships.save.validate(oParam);
			}
			else if (oParam.relationshipSaveStep === 2)
			{
				if (ns1blankspace.okToSave)
				{
					sData += (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '';
					sData += '&contactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsBusiness').attr('data-id')) +
							 '&contactperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPerson').attr('data-id')) +
							 '&othercontactbusiness=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsForBusiness').attr('data-id')) +
							 '&othercontactperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsForPerson').attr('data-id')) +
							 '&type=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsType').attr('data-id')) +
							 '&startdate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsStart').val()) +
							 '&enddate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEnd').val()) +
							 '&description=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDescription').val());

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
						data: sData,
						rf: 'json',
						success: function(oResponse)
						{
							if (oParam == undefined) {oParam = {}}

							oParam.response = oResponse;
							if (ns1blankspace.objectContext == -1)
							{
								nsFreshcare.admin.relationships.data.lastSavedBusiness = $('#ns1blankspaceDetailsBusiness').attr('data-id');
								nsFreshcare.admin.relationships.data.lastSavedBusinessText = $('#ns1blankspaceDetailsBusiness').val();
								nsFreshcare.admin.relationships.data.lastSavedPerson = $('#ns1blankspaceDetailsPerson').attr('data-id');
								nsFreshcare.admin.relationships.data.lastSavedPersonText = $('#ns1blankspaceDetailsPerson').val();
								nsFreshcare.admin.relationships.data.lastSavedType = $('#ns1blankspaceDetailsType').attr('data-id');
								nsFreshcare.admin.relationships.data.lastSavedTypeText = $('#ns1blankspaceDetailsType').val();
							}
							nsFreshcare.admin.relationships.save.process(oParam);
						}
					})
				}
			}
		},

		process: function(oParam)
		{
			var oResponse = oParam.response;
			var bNew;

			if (oResponse.status === 'OK')
			{
				bNew = (ns1blankspace.objectContext === -1);
				ns1blankspace.objectContext = oResponse.id;
				ns1blankspace.inputDetected = false;	// v3.3.001 Wasn't setting to any value!!
				ns1blankspace.status.message('Relationship link ' + ((bNew) ? 'added' : 'saved') + '.');
				nsFreshcare.admin.relationships.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext});
			}
			else
			{
				ns1blankspace.status.error(oResponse.error.errornotes);
			}
		}
	}
}