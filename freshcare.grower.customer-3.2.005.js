/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.grower.customer = 
{
	init: 		function (oParam) {
					ns1blankspace.app.reset();

					ns1blankspace.object = 12;	
					ns1blankspace.objectName = 'customer';
					ns1blankspace.objectParentName = 'grower';
					ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
					ns1blankspace.objectContextData = undefined;
					ns1blankspace.objectContext = -1;
					ns1blankspace.viewName = 'Customers';	
					ns1blankspace.data.contactPerson = undefined;
					ns1blankspace.data.contactPersonText = undefined;
					ns1blankspace.data.contactBusiness = undefined;
					ns1blankspace.data.contactBusinessText = undefined;

					oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
					oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
					ns1blankspace.app.set(oParam);

					$('#ns1blankspaceViewControlNew').button({disabled: true});
					$('#ns1blankspaceViewControlAction').button({disabled: true});
					$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
					
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
						
						// v3.2.005 SUP023376 Reinstated primarycontaCt filter and removed active filter, plus now looks at business, not persongroup
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
						oSearch.addField('contactbusiness.tradename' +
										',contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname');
						oSearch.addFilter("contactbusiness.businessgroup", "EQUAL_TO", nsFreshcare.data.businessGroupCustomer);
						oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
						if (nsFreshcare.data.growerExCustomerList.length > 0) {
							oSearch.addFilter("id", "NOT_IN_LIST", nsFreshcare.data.growerExCustomerList.join(','));
						}
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
						oSearch.addBracket("(");
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
						oSearch.addOperator("or");
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
						oSearch.addBracket(")");
						oSearch.sort('contactbusiness.tradename', 'asc');
						
						oSearch.getResults(function(oResponse) {nsFreshcare.grower.customer.home(oParam, oResponse)});	
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">' +
											'<tr><td class="ns1blankspaceNothing">No customers found.</td></tr>' +
											'</table>');
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">');
							aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="8">My Customers</td></tr>');		// Changed from My Current Csutomers
							aHTML.push('<tr>' + 
											'<td class="ns1blankspaceCaption">Business Name</td>' +
											'<td class="ns1blankspaceCaption">Contact Person</td>' +
										'</tr>');

							var sPreviousId = '';
							$.each(oResponse.data.rows, function() {

								if (sPreviousId != this.id) {
									aHTML.push('<tr class="ns1blankspaceRow">');
									aHTML.push('<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
															this["contactbusiness.tradename"] + '</td>' +
												'<td id="ns1blankspaceMostLikely_contact-' + this.id + '" class="ns1blankspaceMostLikely">' +
															this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>' +
												'</tr>');
								}
								sPreviousId = this.id;
							});
							
							aHTML.push('</table>');
						}
						
						$('#ns1blankspaceMostLikely').html(aHTML.join(''));
					
						$('td.ns1blankspaceMostLikely').click(function(event)
						{
							nsFreshcare.grower.customer.search.send(event.target.id, {source: 1});
						});

					}
				},

	search: 	{
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
										
										var oSearch = new AdvancedSearch();
										oSearch.method = 'CONTACT_BUSINESS_SEARCH';
										oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.title' +
														',contactbusiness.contactperson.titletext,contactbusiness.contactperson.position,contactbusiness.contactperson.email' +
														',contactbusiness.contactperson.workphone,contactbusiness.contactperson.mobile,contactbusiness.contactperson.fax,contactbusiness.contactperson.displayphone' +
														',contactbusiness.contactperson.gender,contactbusiness.contactperson.gendertext,contactbusiness.contactperson.id,contactbusiness.contactperson.displaymobile' + 
														',contactbusiness.contactperson.mailingaddress1,contactbusiness.contactperson.mailingaddress2,contactbusiness.contactperson.mailingsuburb' +
														',contactbusiness.contactperson.mailingstate,contactbusiness.contactperson.mailingpostcode,contactbusiness.contactperson.mailingcountry' +
														',contactbusiness.contactperson.notes,contactbusiness.contactperson.preferredcommunicationtext,contactbusiness.contactperson.preferredcommunication' +
														',contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference' + 
														',contactbusiness.streetaddress1,contactbusiness.streetaddress2,contactbusiness.streetsuburb,contactbusiness.streetstate' + 
														',contactbusiness.streetpostcode,contactbusiness.streetcountry');
										oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
										oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
										oSearch.getResults(function(data) {nsFreshcare.grower.customer.show(oParam, data)});
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
											oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename');
											
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

											oSearch.addFilter("contactbusiness.contactperson.customerstatus", "EQUAL_TO", nsFreshcare.data.contactStatusActive);
											// Not sure whether to add this here as it might show the wrong Primary Contact
											//oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
											oSearch.addFilter("contactbusiness.contactperson.persongroup", "IN_LIST", nsFreshcare.data.groupCustomer.join(','));
											if (nsFreshcare.data.growerExCustomerList.length > 0) {
												oSearch.addFilter("id", "NOT_IN_LIST", nsFreshcare.data.growerExCustomerList.join(','));
											}
											oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
											oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
											oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
											oSearch.addBracket("(");
											oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
											oSearch.addOperator("or");
											oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
											oSearch.addBracket(")");
											
											oSearch.rf = 'json';
											oSearch.getResults(function(data) {nsFreshcare.grower.customer.search.process(oParam, data)});
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
											
												aHTML.push('<td class="ns1blankspaceSearch" id="contactbusiness' +
																'-' + this.id + '">' +
																this["contactbusiness.tradename"] +
															'</td>'); 
												
												aHTML.push('<td class="ns1blankspaceSearch" id="contactperson' +
																'-' + this.id + '">' +
																this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>');
																
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
											nsFreshcare.grower.customer.search.send(event.target.id, {source: 1});
										});
										
										ns1blankspace.render.bind(
										{
											columns: 'contactbusiness.tradename-contactbusiness.contactperson.firstname-space-contactbusiness.contactperson.surname',
											more: oResponse.moreid,
											rows: 20,
											startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
											functionSearch: nsFreshcare.grower.customer.search.send
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
						aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
										'Details</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
										'Address</td></tr>');
					}
								
					aHTML.push('</table>');					
						
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
					aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
					
					$('#ns1blankspaceMain').html(aHTML.join(''));
					
					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
						nsFreshcare.grower.customer.details();
					});

					$('#ns1blankspaceControlAddress').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAddress'});
						nsFreshcare.grower.customer.address();
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
						nsFreshcare.grower.customer.layout();
						$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
					}
					
					if (iStep === 1 && oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find customer.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];
						ns1blankspace.data.contactPerson = ns1blankspace.objectContextData["contactbusiness.contactperson.id"];
						ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData["contactbusiness.contactbusiness.firstname"] + ' ' + ns1blankspace.objectContextData["contactbusiness.contactbusiness.surname"];
						ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData["id"];
						ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData["contactbusiness.tradename"];
						
						// Growers cannot update or add any customers
						$('#ns1blankspaceViewControlNew').button({disabled: true});
						$('#ns1blankspaceViewControlAction').button({disabled: true});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
					
						$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML());
						
						// v2.0.4 Removed search.send from newDestination and now passes object with id to init
						ns1blankspace.history.view({
							newDestination: 'nsFreshcare.grower.customer.init({id: ' + ns1blankspace.objectContext + ')',
							move: false
							});
						
						ns1blankspace.history.control({functionDefault: 'nsFreshcare.grower.customer.summary()'});
					}	
				},
		
	summary:    function() {
					nsFreshcare.grower.customer.details();
				},

	details: 	function() {

					var aHTML = [];
					
					$('#ns1blankspaceMainDetails').attr('data-loading', '');
					
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
									'</tr>' + 
									'</table>');					
					
					$('#ns1blankspaceMainDetails').html(aHTML.join(''));
					
					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspace">');
					
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Trading Name' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceDetailsTradingName" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');			
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Legal Name' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceDetailsLegalName" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');			
									
					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
									'<td class="ns1blankspaceCaption">' +
									'ABN' +
									'</td></tr>' +
									'<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceDetailsABN" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');			
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'First Name' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceDetailsFirstName" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');			

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Surname' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceDetailsSurname" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');			
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Phone' + 
									((nsFreshcare.user.role.toLowerCase() === 'trainer') 
										? '<span id="ns1blankspaceWebsiteShowPhone" style="font-size:0.75em;font-weight:normal;vertical-align:bottom;">' 
										: '') +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceDetailsPhone" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Mobile' +
									((nsFreshcare.user.role.toLowerCase() === 'trainer') 
										? '<span id="ns1blankspaceWebsiteShowMobile" style="font-size:0.75em;font-weight:normal;vertical-align:bottom;">' 
										: '') +
									'</td></tr>' +
									'<tr class="nsFreshcareReadOnly">' +
									'<td id="ns1blankspaceDetailsMobile" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
									'<td class="ns1blankspaceCaption">' +
									'Fax' +
									'</td></tr>' +
									'<tr class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceDetailsFax" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Email' +
									'</td></tr>' +
									'<tr class="nsFreshcareReadOnly">' +
									'<td id="ns1blankspaceDetailsEmail" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');
						
					aHTML.push('</table>');					
					
					$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

					if (ns1blankspace.objectContextData)
					{
						var aValues = [];
						$('#ns1blankspaceDetailsReference').html(ns1blankspace.objectContextData["contactbusiness.reference"].formatXHTML());
						$('#ns1blankspaceDetailsTradingName').html(ns1blankspace.objectContextData["contactbusiness.tradename"].formatXHTML());
						$('#ns1blankspaceDetailsLegalName').html(ns1blankspace.objectContextData["contactbusiness.legalname"].formatXHTML());
						$('#ns1blankspaceDetailsABN').html(ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML());
						$('#ns1blankspaceDetailsFirstName').html(ns1blankspace.objectContextData["contactbusiness.contactperson.firstname"].formatXHTML());
						$('#ns1blankspaceDetailsSurname').html(ns1blankspace.objectContextData["contactbusiness.contactperson.surname"].formatXHTML());
						$('#ns1blankspaceDetailsEmail').html(ns1blankspace.objectContextData["contactbusiness.contactperson.email"].formatXHTML());
						$('#ns1blankspaceDetailsMobile').html(ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].formatXHTML());
						$('#ns1blankspaceDetailsPhone').html(ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].formatXHTML());
						$('#ns1blankspaceDetailsFax').html(ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].formatXHTML());
					}	
				},

	address: 	function() {

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
					
		
						aHTML.push('<table class="ns1blankspace">');
				
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Street Address' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressStreetAddress1" class="nsFreshcareReadOnly">' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressStreetAddress2" class="nsFreshcareReadOnly">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Suburb' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressStreetSuburb" class="nsFreshcareReadOnly">' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'State' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressStreetState" class="nsFreshcareReadOnly">' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Post Code' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressStreetPostCode" class="ns1blankspaceText nsFreshcareReadOnly">' +
										'</td></tr>');				
										
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Country' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressStreetCountry" class="nsFreshcareReadOnly">' +
										'</td></tr>');						
						
						$('#ns1blankspaceAddressColumn1').html(aHTML.join(''));

						aHTML = [];

						aHTML.push('<table class="ns1blankspace">');	//v1.0.26 Added to prevent IE8 errors
				
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Mailing Address' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressMailingAddress1" class="nsFreshcareReadOnly">' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressMailingAddress2" class="nsFreshcareReadOnly">' +
										'</td></tr>');
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Suburb' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressMailingSuburb" class="nsFreshcareReadOnly">' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'State' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressMailingState" class="nsFreshcareReadOnly">' +
										'</td></tr>');
										
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Post Code' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressMailingPostCode" class="nsFreshcareReadOnly">' +
										'</td></tr>');				
										
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Country' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceAddressMailingCountry" class="nsFreshcareReadOnly">' +
										'</td></tr>');						
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceAddressColumn2').html(aHTML.join(''));

						if (ns1blankspace.objectContextData != undefined)
						{
							$('#ns1blankspaceAddressStreetAddress1').html(ns1blankspace.objectContextData['contactbusiness.streetaddress1']);
							$('#ns1blankspaceAddressStreetAddress2').html(ns1blankspace.objectContextData['contactbusiness.streetaddress2']);
							$('#ns1blankspaceAddressStreetSuburb').html(ns1blankspace.objectContextData['contactbusiness.streetsuburb']);
							$('#ns1blankspaceAddressStreetState').html(ns1blankspace.objectContextData['contactbusiness.streetstate']);
							$('#ns1blankspaceAddressStreetPostCode').html(ns1blankspace.objectContextData['contactbusiness.streetpostcode']);
							$('#ns1blankspaceAddressStreetCountry').html(ns1blankspace.objectContextData['contactbusiness.streetcountry']);
							$('#ns1blankspaceAddressMailingAddress1').html(ns1blankspace.objectContextData['contactbusiness.contactperson.mailingaddress1']);
							$('#ns1blankspaceAddressMailingAddress2').html(ns1blankspace.objectContextData['contactbusiness.contactperson.mailingaddress2']);
							$('#ns1blankspaceAddressMailingSuburb').html(ns1blankspace.objectContextData['contactbusiness.contactperson.mailingsuburb']);
							$('#ns1blankspaceAddressMailingState').html(ns1blankspace.objectContextData['contactbusiness.contactperson.mailingstate']);
							$('#ns1blankspaceAddressMailingPostCode').html(ns1blankspace.objectContextData['contactbusiness.contactperson.mailingpostcode']);
							$('#ns1blankspaceAddressMailingCountry').html(ns1blankspace.objectContextData['contactbusiness.contactperson.mailingcountry']);
						}
					}	
				}
}							
