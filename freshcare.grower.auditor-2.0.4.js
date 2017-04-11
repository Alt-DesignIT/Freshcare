/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.grower.auditor = 
{
	init: 		function (oParam) {
					ns1blankspace.app.reset();

					ns1blankspace.object = 12;	
					ns1blankspace.objectName = 'auditor';
					ns1blankspace.objectParentName = 'grower';
					ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
					ns1blankspace.objectContextData = undefined;
					ns1blankspace.objectContext = -1;
					ns1blankspace.viewName = 'Certification Bodies';	
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
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
						oSearch.addField('contactbusiness.tradename,contactbusiness.phonenumber,contactbusiness.email,contactbusiness.faxnumber,contactbusiness.webaddress');
						oSearch.addFilter("contactbusiness.supplierstatus", "EQUAL_TO", nsFreshcare.data.contactStatusActive);
						//oSearch.addFilter("contactbusiness.contactperson.persongroup", "IN_LIST", nsFreshcare.data.groupAuditor.join(','));
						oSearch.addFilter("contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
						oSearch.addFilter("contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
						oSearch.addFilter("contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
						oSearch.addBracket("(");
						oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
						oSearch.addOperator("or");
						oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
						oSearch.addBracket(")");
						oSearch.sort('contactbusiness.tradename', 'asc');
						
						oSearch.getResults(function(oResponse) {nsFreshcare.grower.auditor.home(oParam, oResponse)});	
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">' +
											'<tr><td class="ns1blankspaceNothing">No certification bodies found.</td></tr>' +
											'</table>');
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceMostLikely">');
							aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="8">My Certification Bodies</td></tr>');	//v1.0.24
							aHTML.push('<tr>' + 
											'<td class="ns1blankspaceCaption">Certification Body</td>' +
											'<td class="ns1blankspaceCaption">Phone</td>' +
											'<td class="ns1blankspaceCaption">Fax</td>' +
											'<td class="ns1blankspaceCaption">Email</td>' +
											'<td class="ns1blankspaceCaption">Website</td>' +
										'</tr>');

							var iPreviousId;
							$.each(oResponse.data.rows, function() {

								if (iPreviousId != this.id) {
									aHTML.push('<tr class="ns1blankspaceRow">');
									aHTML.push('<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
															this["contactbusiness.tradename"] + '</td>' +
												'<td id="ns1blankspaceMostLikely_phone-' + this.id + '" class="ns1blankspaceMostLikely">' +
															this["contactbusiness.phonenumber"] + '</td>' +
												'<td id="ns1blankspaceMostLikely_fax' + this.id + '" class="ns1blankspaceMostLikely">' +
															this["contactbusiness.faxnumber"] + '</td>' +
												'<td id="ns1blankspaceMostLikely_email' + this.id + '" class="ns1blankspaceMostLikely">' +
															'<a href="mailto:' + this["contactbusiness.email"] + '">' + 
															this["contactbusiness.email"] + '</td>' +
												'<td id="ns1blankspaceMostLikely_website' + this.id + '" class="ns1blankspaceMostLikely">' +
															'<a href="' + this["contactbusiness.webaddress"] + '" target="_blank">' + 
															this["contactbusiness.webaddress"] + '</a></td>' +
												'</tr>');
								}
								iPreviousId = this.id
							});
							
							aHTML.push('</table>');
						}
						
						$('#ns1blankspaceMostLikely').html(aHTML.join(''));
					
						$('td.ns1blankspaceMostLikely').click(function(event)
						{
							nsFreshcare.grower.auditor.search.send(event.target.id, {source: 1});
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
										oSearch.addField('contactbusiness.tradename,contactbusiness.legalname,contactbusiness.phonenumber,contactbusiness.faxnumber' +
														',contactbusiness.email,contactbusiness.webaddress');

										oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
										oSearch.getResults(function(data) {nsFreshcare.grower.auditor.show(oParam, data)});
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
											oSearch.addField('contactbusiness.tradename,contactbusiness.legalname');
											
											oSearch.addBracket("(");
											if (iSource == ns1blankspace.data.searchSource.browse)
											{
												if (sSearchText != "ALL") {
													oSearch.addFilter('tradename', 'TEXT_STARTS_WITH', sSearchText);
													oSearch.addOperator("or");
													oSearch.addFilter('legalname', 'TEXT_STARTS_WITH', sSearchText);
												}
											}
											else
											{	
												oSearch.addFilter('tradename', 'TEXT_IS_LIKE', sSearchText);
												oSearch.addOperator("or");
												oSearch.addFilter('legalname', 'TEXT_IS_LIKE', sSearchText);
											}	
											oSearch.addBracket(')');

											oSearch.addFilter("supplierstatus", "EQUAL_TO", nsFreshcare.data.contactStatusActive);
											//oSearch.addFilter("contactbusiness.contactperson.persongroup", "IN_LIST", nsFreshcare.data.groupAuditor.join(','));
											oSearch.addFilter("contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
											oSearch.addFilter("contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
											oSearch.addFilter("contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
											oSearch.addBracket("(");
											oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
											oSearch.addOperator("or");
											oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
											oSearch.addBracket(")");
											
											oSearch.rf = 'json';
											oSearch.getResults(function(data) {nsFreshcare.grower.auditor.search.process(oParam, data)});
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
											
												aHTML.push('<td class="ns1blankspaceSearch" id="tradename' +
																'-' + this.id + '">' +
																this["contactbusiness.tradename"] +
															'</td>'); 
												
												aHTML.push('<td class="ns1blankspaceSearch" id="legalname' +
																'-' + this.id + '">' +
																this["contactbusiness.leganame"] + '</td>');
																
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
											nsFreshcare.grower.auditor.search.send(event.target.id, {source: 1});
										});
										
										ns1blankspace.render.bind(
										{
											columns: 'contactbusiness.tradename-contactbusiness.legalname',
											more: oResponse.moreid,
											rows: 20,
											startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
											functionSearch: nsFreshcare.grower.auditor.search.send
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
						// We don't really need to see the word Summary here - it just confuses the user..
						aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
										'&nbsp;</td></tr>');
					}
								
					aHTML.push('</table>');					
						
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
					
					$('#ns1blankspaceMain').html(aHTML.join(''));
					
					$('#ns1blankspaceControlDetails').click(function(event)
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
						nsFreshcare.grower.auditor.summary();
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
						nsFreshcare.grower.auditor.layout();
						$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
					}
					
					if (iStep === 1 && oResponse.data.rows.length == 0)
					{
						ns1blankspace.objectContextData = undefined;
						
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find certification body.</td></tr></table>');
								
						$('#ns1blankspaceMain').html(aHTML.join(''));
					}
					else
					{
						ns1blankspace.objectContextData = oResponse.data.rows[0];
						ns1blankspace.data.contactBusiness = ns1blankspace.objectContext;
						ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData["contactbusiness.tradename"];
						
						// Growers cannot update or add any customers
						$('#ns1blankspaceViewControlNew').button({disabled: true});
						$('#ns1blankspaceViewControlAction').button({disabled: true});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
					
						$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML());
						
						// v2.0.4 Removed search.send from newDestination and now passes object with id to init
						ns1blankspace.history.view({
							newDestination: 'nsFreshcare.grower.auditor.init({id: ' + ns1blankspace.objectContext + ')',
							move: false
							});
						
						ns1blankspace.history.control({functionDefault: 'nsFreshcare.grower.auditor.summary()'});
					}	
				},
		

	summary: 	function() {

					var aHTML = [];
					
					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td valign="top">Sorry can\'t find this certification body.</td></tr></table>');
								
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
						
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certification Body</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML() +
									'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['contactbusiness.phonenumber'].formatXHTML() + 
									'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Fax</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['contactbusiness.faxnumber'].formatXHTML() + 
									'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Email</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['contactbusiness.email'].formatXHTML() + 
									'</td></tr>');

						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Website</td></tr>' +
									'<tr><td class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData['contactbusiness.webaddress'].formatXHTML() + 
									'</td></tr>');

						aHTML.push('</table>');

						$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
					}	
				}

}							
