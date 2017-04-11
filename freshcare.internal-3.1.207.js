/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.internal = 
{
	data: {},

	financial: 
	{
		data: 
		{
			certificationFeesFrom: '2007-07-01 00:00:00',
			royaltyFeesFrom: '2007-07-01 00:00:00'
		},

		invoice:
		{
			home: function(oParam, oResponse)
			{
				if (oResponse == undefined)
				{
					// v3.1.1i SUP022764 ReadOnly access to prevent user from Adding
					if (nsFreshcare.extend.financial.userIsReadOnly())
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					var aHTML = [];
								
					aHTML.push('<table class="ns1blankspaceMain">' + 
									'<tr class="ns1blankspaceMain">' +
									'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
									ns1blankspace.xhtml.loading +
									'</td></tr>' + 
									'</table>');					
					
					$('#ns1blankspaceMain').html(aHTML.join(''));
										
					var aHTML = [];

					aHTML.push('<table>');
					aHTML.push('<tr><td><div id="ns1blankspaceViewFinancialLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');

					// v3.1.1 SUP022525 Don't want Board Members being able to perform these functions
					if (!nsFreshcare.extend.financial.userIsReadOnly())
					{
						aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td style="padding-top:15px;" id="ns1blankspaceControlRoyaltyPayments" class="ns1blankspaceControl">Royalty Payments</td>' +
									'</tr>');

						aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td style="padding-top:15px;" id="ns1blankspaceControlCertificationFees" class="ns1blankspaceControl">Certification Fees</td>' +
									'</tr>');

						aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td style="padding-top:15px;" id="ns1blankspaceControlInvoicing" class="ns1blankspaceControl">Unsent Invoices<br />' +
										'<span class="ns1blankspaceSub" style="font-size:0.75em;">Email & Print</span></td>' +
									'</tr>');
					}
					else
					{	// v3.1.1f SUP022623 Board Members can't save or delete
						ns1blankspace.app.context({all: true, inContext: false});
					}
					aHTML.push('</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));

					$('#ns1blankspaceControlInvoicing').click(function(event)
					{
						$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
						$('#ns1blankspaceMain').attr('data-loading', '1');

						oParam = {xhtmlElementID: 'ns1blankspaceMain'};
						nsFreshcare.internal.financial.invoice.unsentInvoices.show(oParam);
					});
												
					$('#ns1blankspaceControlRoyaltyPayments').click(function(event)
					{
						$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
						$('#ns1blankspaceMain').attr('data-loading', '1');
						
						oParam = {};
						oParam.xhtmlElementID = 'ns1blankspaceMain';
						oParam.label = 'Create Royalty Payment Invoices';
						oParam.xhtmlContext = 'RoyaltyPayment';
						oParam.accountCode = '054';
						oParam.invoiceDescription = 'Freshcare Royalty Fees - Initial Assesments / Annual Audits completed on the following dates: ';
						
						oParam.filters = [
											{name: 'CertificationBody', title: 'Certification Body', values: 'certificationBodies', field: 'auditbusiness'}
										 ];
						oParam.columns = [
											{title: 'Cert Body', name: 'CertificationBodyText', field: 'auditbusinesstext'},
											{title: 'Membership', name: 'MembershipText', field: 'audit.agrisubscription.membership.code'},
											{title: 'Audit Title', name: 'TitleText', field: 'typetext'},
											{title: 'Reference', name: 'Reference', field: 'reference'},
											{title: 'Grower', name: 'GrowerText', field: 'contactbusinesstext'},
											{title: 'Audit Date', name: 'AuditDate', field: 'actualdate'},
											{title: 'Invoice Amount', name: 'InvoiceAmt', 
												functionCalculate: nsFreshcare.internal.financial.invoice.commissions.getMembershipFee,
												functionCalculateParam: {feeType: '1'}, /* Cert Body Raoyalty Rate */
												elementEditClass: 'nsFreshcareInvoicesBulkEdit', elementEditSave: false, elementEditMandatory: true
											},
											{name: 'CertificationBody', field: 'auditbusiness', hidden: true}
										 ];

						oParam.sortColumn = 'actualdate';
						oParam.sortDirection = 'asc';
						oParam.groupAtColumn = 'auditbusiness';
						oParam.functionProcess = nsFreshcare.internal.financial.invoice.commissions.process;
						oParam.functionSearch = nsFreshcare.internal.financial.invoice.commissions.search;
						oParam.functionShow = nsFreshcare.internal.financial.invoice.commissions.show;
						
						oParam.onComplete = nsFreshcare.internal.financial.invoice.commissions.show;
						nsFreshcare.internal.financial.invoice.certificationBodies(oParam);
					});
												
					$('#ns1blankspaceControlCertificationFees').click(function(event)
					{
						$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
						$('#ns1blankspaceMain').attr('data-loading', '1');

						oParam = {};
						oParam.xhtmlElementID = 'ns1blankspaceMain';
						oParam.label = 'Create Certification Fee Invoices';
						oParam.xhtmlContext = 'CertificationFees';
						oParam.accountCode = '010';
						oParam.invoiceDescription = 'Freshcare Certification Fees';
						
						oParam.filters = [
											{name: 'CertificationBody', title: 'Certification Body', values: 'certificationBodies', field: 'auditbusiness'}
										 ];
						oParam.columns = [
											{title: 'Cert Body', name: 'CertificationBodyText', field: 'auditbusinesstext'},
											{title: 'Membership', name: 'MembershipText', field: 'audit.agrisubscription.membership.code'},
											{title: 'Audit Title', name: 'TitleText', field: 'typetext'},
											{title: 'Reference', name: 'Reference', field: 'reference'},
											{title: 'Grower', name: 'GrowerText', field: 'contactbusinesstext'},
											{title: 'Audit Date', name: 'AuditDate', field: 'actualdate'},
											{title: 'Invoice Amount', name: 'InvoiceAmt', 
												functionCalculate: nsFreshcare.internal.financial.invoice.commissions.calculateLineItemAmount,
												elementEditClass: 'nsFreshcareInvoicesBulkEdit', elementEditSave: false, elementEditMandatory: true
											},
											{name: 'CertificationBody', field: 'auditbusiness', hidden: true}
										 ];

						oParam.sortColumn = 'actualdate';
						oParam.sortDirection = 'asc';

						oParam.groupAtColumn = 'auditbusiness';

						oParam.functionProcess = nsFreshcare.internal.financial.invoice.commissions.process;
						oParam.functionSearch = nsFreshcare.internal.financial.invoice.commissions.search;
						oParam.functionShow = nsFreshcare.internal.financial.invoice.commissions.show;
						
						oParam.onComplete = nsFreshcare.internal.financial.invoice.commissions.show;
						nsFreshcare.internal.financial.invoice.certificationBodies(oParam);
					});
												
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
					oSearch.addField('reference,description,contactbusinesssenttotext,contactpersonsenttotext,duedate,amount');
					oSearch.rows = 10;
					oSearch.sort('modifieddate', 'desc');
					oSearch.getResults(function (data) {ns1blankspace.financial.invoice.home(oParam, data)});
				}
				else
				{
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to add an invoice.</td></tr>');
						aHTML.push('</table>');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST RECENT</td></tr>');
						
						$.each(oResponse.data.rows, function()
						{					
							aHTML.push('<tr class="ns1blankspaceRow">');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:50px;">' +
													this.reference + '</td>');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Amount-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:50px;text-align:right;padding-left:10px;padding-right:10px;">' +
													'$' + this.amount + '</td>');
																	
							aHTML.push('<td id="ns1blankspaceMostLikely_DueDate-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;text-align:right;padding-right:15px;">' +
													this.duedate + '</td>');
																									
							var sContact = this.contactbusinesssenttotext;
							if (sContact == '') {sContact = this.contactpersonsenttotext}
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Contact-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													sContact + '</td>');
								
							aHTML.push('<td id="ns1blankspaceMostLikely_Description-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													this.description + '</td>');
								
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');
					}
					
					$('#ns1blankspaceMostLikely').html(aHTML.join(''));
				
					$('td.ns1blankspaceMostLikely').click(function(event)
					{
						 ns1blankspace.financial.invoice.search.send(event.target.id, {source: 1});
					});
				}
			},

			certificationBodies: function(oParam)
			{
				if (nsFreshcare.internal.data.certificationBodies === undefined)
				{
					// v3.1.2 No longer looks for contactperson
					// v3.1.202 Looks for contatperson, but no longer filters on persongroup (contactperson is required for invoice recipient)
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_BUSINESS_SEARCH';
					oSearch.addField('tradename,contactbusiness.contactperson.id');
					oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupAuditor);
					oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
					oSearch.sort('tradename', 'asc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							nsFreshcare.internal.data.certificationBodies = $.map(oResponse.data.rows, function(x) 
																				 	 {return {id: x.id, value: x.tradename, contactPerson: x['contactbusiness.contactperson.id']}}
																				  );
							if (oParam.onComplete)
							{
								ns1blankspace.util.onComplete(oParam);
							}
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					});
				}
				else
				{
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
			},

			commissions: 	
			{
				search: function(oParam)
				{
					// Searches for all Completed Audits that haven't yet been billed (not linked to a line item) and were on/after conducted after relevant date
					// v3.0.2b Added variable start date for cert and royalty fees

					var sAccountCode;
					var sAuditorFilter;
					var sSortColumn = '';
					var sSortDirection;
					var aFilters = [];
					var sStartDate;

					if (oParam)
					{
						if (oParam.certificationFeesSearchStep === undefined) {oParam.certificationFeesSearchStep = 0}
						if (oParam.sortColumn != undefined) {sSortColumn = oParam.sortColumn}
						if (oParam.sortDirection != undefined) {sSortDirection = oParam.sortDirection}
						if (oParam.filters != undefined) {aFilters = oParam.filters}
						if (oParam.accountCode != undefined) {sAccountCode = oParam.accountCode}
					}

					oParam.financialAccount = $.map($.grep(ns1blankspace.financial.data.accounts, function(x) {return x.code === oParam.accountCode && x.type === '2'}),
												function(y) {return y.id}).shift();

					sStartDate = (oParam.accountCode === '010') ? nsFreshcare.internal.financial.data.certificationFeesFrom : nsFreshcare.internal.financial.data.royaltyFeesFrom;

					if (nsFreshcare.internal.data.invoiceBulkParams) {delete(nsFreshcare.internal.data.invoiceBulkParams.groupAtValue)}

					// Find all CBs
					if (oParam.certificationFeesSearchStep === 0)
					{
						ns1blankspace.status.working();

						if (nsFreshcare.internal.data == undefined) {nsFreshcare.internal.data = {}}

						if (nsFreshcare.internal.data.certificationBodies === undefined)
						{
							oParam.onComplete = nsFreshcare.internal.financial.invoice.commissions.search;
							nsFreshcare.internal.financial.invoice.certificationBodies(oParam);
						}
						else
						{
							oParam.certificationFeesSearchStep = 1;
							nsFreshcare.internal.financial.invoice.commissions.search(oParam);
						}
					}

					else if (oParam.certificationFeesSearchStep == 1)
					{
						nsFreshcare.data.membershipFees = [];

						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_MEMBERSHIP_FEE_SEARCH';
						oSearch.addField('type,typetext,amount,fromdate,todate,membership');
						//oSearch.method = 'AGRI_MEMBERSHIP_SEARCH';
						//oSearch.addField('structuredata,typetext,semembershipfeeamount,fromdate,semembershipfeeto');
						oSearch.addFilter('membership', 'IN_LIST', $.map(nsFreshcare.data.memberships, function(x) {return x.id}).join(','))
						oSearch.sort('typetext', 'asc');
						oSearch.sort('fromdate', 'desc');
						oSearch.rows = 100;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								oParam.certificationFeesSearchStep = 2;
								nsFreshcare.data.membershipFees = oResponse.data.rows;
								nsFreshcare.internal.financial.invoice.commissions.search(oParam);
							}
							else
							{
								ns1blankspace.status.error('Unable to find Membership Fees: ' + oResponse.error.errornotes);
							}
						});
					}

					else if (oParam.certificationFeesSearchStep === 2)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AUDIT_SEARCH';
						oSearch.addField('reference,typetext,actualdate,contactbusiness,contactbusinesstext,auditbusiness,auditbusinesstext,audit.contactbusiness.agribusiness.prioritymembership,' + 
										'audit.agrisubscription.membership,audit.agrisubscription.membership.code');
						oSearch.addFilter('actualdate', 'GREATER_THAN_OR_EQUAL_TO', sStartDate);
						oSearch.addFilter('status', 'EQUAL_TO', nsFreshcare.data.audit.statusCompleted);
						oSearch.addCustomOption('DoesNotHaveFinancialAccount', oParam.financialAccount);		

						// Add the customised filters - the filter values are stored as an array against oParam
						$.each(aFilters, function()
						{
							var sParameter = 'filter.' + this.name;
							if (oParam[sParameter] && oParam[sParameter].length > 0)
							{
								oSearch.addFilter(this.field, 'IN_LIST', oParam[sParameter].join(','));
							}
						});

						// Process the sort - always keep Certification Body as the primary sort order
						oSearch.sort('auditbusinesstext', 'asc');
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
								delete(oParam.certificationFeesSearchStep);
								nsFreshcare.internal.financial.invoice.commissions.show(oParam, oResponse);
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
							}
						});
					}

				},

				show: function(oParam, oResponse)
				{
					// Allows for generic display of commission Processing list

					var dToday = new Date();
					var sXHTMLElementID = 'ns1blankspaceInvoiceColumn1';
					var sLabel = 'Create Invoices.';
					var sXHTMLContext = 'Invoice';
					var sSortColumn = '';
					var sSortDirection;
					var aFilters = [];
					var aColumns = [];
					var fFunctionProcess;
					var fFunctionSearch;
					var fFunctionShow;
					var fFunctionBind = nsFreshcare.internal.financial.invoice.commissions.bind;

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
						
						aHTML.push('<div id="ns1blankspaceInvoicesBulkMain" class="ns1blankspaceControlMain">');
						aHTML.push('<table id="ns1blankspaceInvoicesBulkContainer"><tr>');
						aHTML.push('<td id="ns1blankspaceInvoicesBulkColumn1" class="ns1blankspaceColumn1Flexible"></td>');
						aHTML.push('</tr></table>');	
						aHTML.push('</div>');
						
						$('#' + sXHTMLElementID).html(aHTML.join(''));


						aHTML.push('<table id="ns1blankspaceInvoice' + sXHTMLContext + '"><tr>');
						aHTML.push('<td id="ns1blankspaceInvoice' + sXHTMLContext + 'Results" class="ns1blankspaceColumn1Flexible"></td>' +
								   '<td id="ns1blankspaceInvoice' + sXHTMLContext + 'SearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
								   '<td id="ns1blankspaceInvoice' + sXHTMLContext + 'Filter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
						aHTML.push('</tr></table>');

						$('#ns1blankspaceInvoicesBulkColumn1').html(aHTML.join(''));

						// Search criteria bar 'handle' - allows user to get the search criteria div back into view
						aHTML = [];
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle" style="height:25px">Search Criteria</span>');
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'Process" style="height:25px">Create Invoices</span>');
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchRibbon').html(aHTML.join(''));

						aHTML = [];
						aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

						aHTML.push('<tr><td id="ns1blankspaceInvoice' + sXHTMLContext + 'Search" class="ns1blankspaceAction">Search</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceInvoice' + sXHTMLContext + 'StatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

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

							$('#ns1blankspaceInvoice' + sXHTMLContext + 'Filter').html(aHTML.join(''));
						}

						// Bind the Search Handle (hides the search criteria area)
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').button({
							text: false,
							icons: {
								primary: 'ui-icon-arrowthickstop-1-w'
							}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() {
							$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').hide();
							$('#ns1blankspaceInvoice' + sXHTMLContext + 'Filter').show('slide', {direction: 'left'}, 500);
						});

						// Bind the Process button
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Process').button({
							text: false,
							icons: { primary: 'ui-icon-check'}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() 
						{
							if (confirm('Are you sure you want to create ' + sLabel + ' for ' 
								+ $.map($('.nsFreshcareSelected'), function(x) {return $(x).html()}).join(', ') + '?', 'Yes', 'No'))
							{
								// Disable all the check boxes first so user can't change them part way through processing
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'CheckAll').attr('disabled', true);
								$('.ns1blankspaceInvoice' + sXHTMLContext + 'Include').attr('disabled', true);
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'Process').attr('disabled', true);
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').attr('disabled', true);

								if (aFilters.length > 0)
								{
									$.each(aFilters, function()
									{
										oParam['filter.' + this.name] = $.map($('.ns1blankspace' + this.name + '[data-selected="1"]'), function(x) {return $(x).attr('id').split('_').pop()});
									});
								}
								fFunctionProcess(oParam);

								$('#ns1blankspaceInvoice' + sXHTMLContext + 'CheckAll').attr('disabled', false);
								$('.ns1blankspaceInvoice' + sXHTMLContext + 'Include').attr('disabled', false);
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'Process').attr('disabled', false);
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').attr('disabled', false);
							}
							//$('#ns1blankspaceInvoice' + sXHTMLContext + 'Process').hide();
						});
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Process').hide();

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
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Search').button({
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
										$('#ns1blankspaceInvoice' + sXHTMLContext + 'StatusMessage').html('Please choose at least one ' + this.title + '.');
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
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'Filter').hide(
								{duration: 200, complete: function() 
									{

									$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').show();
									$('#ns1blankspaceInvoice' + sXHTMLContext + 'Process').show();
									$('#ns1blankspaceInvoice' + sXHTMLContext + 'Results').html(ns1blankspace.xhtml.loading);
									oParam = ns1blankspace.util.setParam(oParam, "onComplete", fFunctionShow)

									fFunctionSearch(oParam);
									}
								});

							}
							else 
							{
								window.setTimeout('$("#ns1blankspaceInvoice' + sXHTMLContext + 'StatusMessage").fadeOut(4000)', 7000);
							}
						});

					}

					if (oResponse) 
					{	
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspaceHome">');
							aHTML.push('<tr><td class="ns1blankspaceNothing">No records</td></tr>');
							aHTML.push('</table>');

							$('#ns1blankspaceInvoice' + sXHTMLContext + 'Results').html(aHTML.join(''));
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceInvoice' + sXHTMLContext + '" class="ns1blankspace">');
							
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
										'<input type="checkbox" id="ns1blankspaceInvoices' + sXHTMLContext + 'CheckAll"' +
											' class="ns1blankspaceInvoice' + sXHTMLContext + '" checked="false">' +
										'</td>');

							aHTML.push('</tr>');

							nsFreshcare.internal.data.invoiceBulkParams = oParam;
							
							$.each(oResponse.data.rows, function() 	
							{
								aHTML.push(nsFreshcare.internal.financial.invoice.commissions.row(this));
							});
							
							aHTML.push('</table>');

							ns1blankspace.render.page.show(
							{
								xhtmlElementID: 'ns1blankspaceInvoice' + sXHTMLContext + 'Results',
								xhtmlContext: 'Invoices' + sXHTMLContext,
								xhtml: aHTML.join(''),
								showMore: (oResponse.morerows == 'true'),
								more: oResponse.moreid,
								rows: 200,
								functionShowRow: nsFreshcare.internal.financial.invoice.commissions.row,
								functionNewPage: fFunctionBind + '()',
								type: 'json'
							}); 	
							
							fFunctionBind();
						}
					}
				},

				row: function(oRow)
				{
					var aColumns = nsFreshcare.internal.data.invoiceBulkParams.columns;
					var sXHTMLContext = nsFreshcare.internal.data.invoiceBulkParams.xhtmlContext;
					var sGroupAtColumn = nsFreshcare.internal.data.invoiceBulkParams.groupAtColumn;
					var sGroupAtValue = nsFreshcare.internal.data.invoiceBulkParams.groupAtValue;
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
						nsFreshcare.internal.data.invoiceBulkParams.groupAtValue = oRow[sGroupAtColumn];
					}

					aHTML.push('<tr id="ns1blankspaceInvoices' + sXHTMLContext + 'Include_row-' + oRow.id + '" class="ns1blankspaceRow">');

					$.each($.grep(aColumns, function(x) {return x.hidden == undefined || x.hidden === false}), function()
					{
						var sValue;
						if (this.functionCalculate != undefined)
						{
							if (this.functionCalculateParam)
							{
								$.extend(oRow, this.functionCalculateParam);
							}
							sValue = this.functionCalculate(oRow);
						}
						else {sValue = oRow[this.field]}

						aHTML.push('<td id="ns1blankspaceInvoices' + sXHTMLContext + '_' + this.name + '-' + oRow.id + '"' +
										' class="ns1blankspaceRow' + ((this.elementEditClass) ? ' ' + this.elementEditClass : '') + '">' +
												sValue + 
									'</td>');
					});
								

					aHTML.push('<td id="ns1blankspaceInvoices' + sXHTMLContext + '-' + oRow.id + '"' +
								' class="ns1blankspaceMainRowOptionsInclude"' +
								' style="color:#B8B8B8; padding:4px; vertical-align:top;">' + 
								'<input type="checkbox" id="ns1blankspaceInvoice' + sXHTMLContext + 'Include-' + oRow.id + '"' +
								' class="ns1blankspaceInvoice' + sXHTMLContext + 'Include" ' +
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
					var sXHTMLContext = nsFreshcare.internal.data.invoiceBulkParams.xhtmlContext;
					var aEditClasses = $.grep(nsFreshcare.internal.data.invoiceBulkParams.columns, function(x) {return x.elementEditClass && x.elementEditClass != ''});
					
					$('#ns1blankspaceInvoices' + sXHTMLContext + 'CheckAll').click(function()
					{

						if ($(this).attr('checked'))
						{
							$('input.ns1blankspaceInvoice' + sXHTMLContext + 'Include').prop('checked', true);
						}
						else
						{
							$('input.ns1blankspaceInvoice' + sXHTMLContext + 'Include').prop('checked', false);
						}
					});

					$('.ns1blankspaceHeaderSort')
						.css('cursor', 'pointer')
						.click(function()
						{
							delete(nsFreshcare.internal.data.invoiceBulkParams.groupAtValue);
							var oParam = nsFreshcare.internal.data.invoiceBulkParams;
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
																		functionValidate: nsFreshcare.internal.financial.invoice.commissions.validateLineItemAmount,
																		onComplete: nsFreshcare.util.elementEdit.stop
																	});
								});
								aClassesBound.push(this.elementEditClass);
							}
						});
					}
				},

				getMembershipFee: function(oParam)
				{	// v3.1.207 SUP023092 Added to allow FC to specify different mem fees from 1 Apr 2017
					var sFeeType = ns1blankspace.util.getParam(oParam, 'feeType').value;
					var iMembership = ns1blankspace.util.getParam(oParam, 'audit.agrisubscription.membership').value;
					var sAuditDate = ns1blankspace.util.getParam(oParam, 'actualdate', {'default': dToday.toString('dd MMM yyyy')}).value;
					var dAudit = new Date(sAuditDate);
					var sReturnAmount = '0';

					var aThisFees = $.grep(nsFreshcare.data.membershipFees, function(x) {return x.membership == iMembership && x.type == sFeeType});
					
					$.each(aThisFees, function()
					{
						this.fromDate = (this.fromdate == '') ? new Date(dToday.toString('dd MMM yyyy')) : new Date(this.fromdate);
						this.toDate = (this.todate == '') ? new Date(dToday.toString('dd MMM yyyy') + ' 23:59:59') : new Date(this.todate + ' 23:59:59');

						if (dAudit >= this.fromDate && dAudit <= this.toDate)
						{
							sReturnAmount = this.amount;
							return false;
						}
					});

					return sReturnAmount;
				},

				calculateLineItemAmount: function(oRow)
				{
					var sReturn;

					if (oRow['audit.contactbusiness.agribusiness.prioritymembership'] === oRow['audit.agrisubscription.membership'])
					{
						oRow.feeType = '2';		// Certification Renewal Fee
						//sReturn = oRow['audit.agrisubscription.membership.renewalamount'];
					}
					else
					{
						oRow.feeType = '3';	// Secondary Membership Fee
						//sReturn = oRow['audit.agrisubscription.membership.secondarymembershipfee'];
					}
					return nsFreshcare.internal.financial.invoice.commissions.getMembershipFee(oRow);
				},

				validateLineItemAmount: function(oParam)
				{
					bValid = nsFreshcare.util.isNumeric({value: $('#' + oParam.inputElementID).val()});
					if (!bValid)
					{
						ns1blankspace.status.error($('#' + oParam.inputElementID).val() + ' is not a valid amount.');
						ns1blankspace.okToSave = false;
					}

					return bValid;
				},
				
				process: function(oParam)
				{
					// Here we need to create an invoice for each Certification Body listed with line items against the account code passed
					var sXHTMLContext;
					var sAccountCode;
					var iRowIndex = 0;
					var iInvoiceId;
					var sData = '';
					var oThisElement;
					var oThisCertBody;
					var iAuditid;
					var bNewCertBody = false;

					if (oParam)
					{
						if (oParam.xhtmlContext != undefined) {sXHTMLContext = oParam.xhtmlContext}
						if (oParam.rowIndex != undefined) {iRowIndex = oParam.rowIndex}
						if (oParam.invoiceID != undefined) {iInvoiceId = oParam.invoiceID}
						if (oParam.successful === undefined) {oParam.sucessful = false}
					}

					if (oParam.bulkInvoiceCreateStep === undefined) 
					{
						oParam.bulkInvoiceCreateStep = 1;
						nsFreshcare.internal.data.invoiceCreateData = $('input.ns1blankspaceInvoice' + sXHTMLContext + 'Include:checked');
						oParam.rowIndex = iRowIndex;
					}

					if (iRowIndex < nsFreshcare.internal.data.invoiceCreateData.length)
					{

						oThisElement = nsFreshcare.internal.data.invoiceCreateData[iRowIndex];
						oThisCertBody = $.grep(nsFreshcare.internal.data.certificationBodies, function(x) {return x.id === $(oThisElement).attr('data-certificationbody')}).shift();
						iAuditId = $(oThisElement).attr('id').split('-').pop();

						// First Create the Certification Body Invoice record
						if (oParam.bulkInvoiceCreateStep === 1)
						{
							sData += 'contactbusinesssentto=' + $(oThisElement).attr('data-certificationbody') +
									'&contactpersonsentto=' + oThisCertBody.contactPerson +
									'&description=' + ns1blankspace.util.fs(oParam.invoiceDescription) +
									'&sent=N' +
									'&sentdate=' + ns1blankspace.util.fs((new Date()).toString('dd MMM yyyy'));

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
								data: sData,
								rf: 'json',
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										oParam.invoiceID = oResponse.id;
										oParam.bulkInvoiceCreateStep = 2;
										nsFreshcare.internal.financial.invoice.commissions.process(oParam);
									}
									else
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																	errorMessage: 'Invoice could not be created.',
																	errorNotes: oResponse.error.errornotes});
									}
								}

							});
						}

						// Now, add all of the line items to the invoice
						else if (oParam.bulkInvoiceCreateStep === 2)
						{
							var lAmount = Number(($('#ns1blankspaceInvoices' + sXHTMLContext + '_InvoiceAmt-' + iAuditId).html() != $(oThisElement).attr('data-invoiceamt')) 
											? $('#ns1blankspaceInvoices' + sXHTMLContext + '_InvoiceAmt-' + iAuditId).html()
											: $(oThisElement).attr('data-invoiceamt'));
							var lTax = lAmount - (lAmount / (1 + (10/100)));
							lTax = Math.round(lTax * 100) / 100;

							sData += 'description=' + ns1blankspace.util.fs($(oThisElement).attr('data-auditdate') + ' ' +
																			$(oThisElement).attr('data-reference') + ' ' +
																			$(oThisElement).attr('data-membershiptext') + ' ' +
																			$(oThisElement).attr('data-growertext')) +
									'&object=5' +
									'&objectcontext=' + oParam.invoiceID +
									'&otherobject=' + nsFreshcare.objectAudit +
									'&otherobjectcontext=' + iAuditId + 
									'&amount=' + ns1blankspace.util.fs(lAmount) +
									'&tax=' + ns1blankspace.util.fs(lTax) +
									'&taxtype=1' +
									'&capital=N' +
									'&financialaccount=' + ns1blankspace.util.fs(oParam.financialAccount);

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('FINANCIAL_ITEM_MANAGE'),
								data: sData,
								rf: 'json',
								success: function(oResponse)
								{
									oParam.bulkInvoiceCreateStep = 3;
									if (oResponse.status === 'OK')
									{
										oParam.successful = true;
									}
									else
									{
										nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																	errorMessage: 'Line Item could not be created.',
																	errorNotes: oResponse.error.errornotes});
									}
									nsFreshcare.internal.financial.invoice.commissions.process(oParam);
								}
							});
						}

						// Increment the row index and remove the row(s) from the UI
						else if (oParam.bulkInvoiceCreateStep === 3)
						{
							// We reset the step to 1 only if we're about to change Certification Body as this creates an invoice record
							if ((iRowIndex  + 1) < nsFreshcare.internal.data.invoiceCreateData.length 
								&& oThisCertBody.id != $(nsFreshcare.internal.data.invoiceCreateData[iRowIndex + 1]).attr('data-certificationbody'))
							{
								oParam.bulkInvoiceCreateStep = 1;	
							}
							else
							{
								oParam.bulkInvoiceCreateStep = 2;
							}
							
							oParam.rowIndex = iRowIndex + 1;
							if (oParam.successful)		// Process was a succcess, remove status row
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, remove: true});
								$(oThisElement).parent().parent().remove();
							}
							delete(oParam.successful);
							nsFreshcare.internal.financial.invoice.commissions.process(oParam);
						}
					}
					else
					{
						if (nsFreshcare.internal.data.invoiceCreateData.length == 0)
						{
							ns1blankspace.status.error('There are no line items to process');
						}
						else
						{
							ns1blankspace.status.message('Processing completed');
							delete(nsFreshcare.internal.data.invoiceCreateData);
						}
					}
				}
			},

			unsentInvoices:
			{
				search: function(oParam)
				{
					var sSortColumn = 'reference';
					var sSortDirection = 'asc';
					var sEmailFilter = '';

					if (oParam)
					{
						if (oParam.sortColumn) {sSortColumn = oParam.sortColumn}
						if (oParam.sortDirection) {sSortDirection = oParam.sortDirection}
						if (oParam.invoiceSearchStep === undefined) {oParam.invoiceSearchStep = 1}
						if (oParam.filterEmail) {sEmailFilter = oParam.filterEmail}
					}
					else {oParam = {invoiceSearchStep: 1}}

					if (oParam.invoiceSearchStep === 1)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
						oSearch.addField('invoice.contactbusinesssentto,invoice.contactbusinesssenttotext,invoice.contactpersonsentto,invoice.contactpersonsenttotext,' +
										'invoice.reference,invoice.sentdate,invoice.description,invoice.amount,invoice.duedate,invoice.contactpersonsentto.email');
						oSearch.addFilter('sent', 'EQUAL_TO', 'N');
						if (sEmailFilter != '')
						{
							if (sEmailFilter === 'Yes')
							{
								oSearch.addFilter('invoice.contactpersonsentto.email', 'IS_NOT_NULL');
								oSearch.addFilter('invoice.contactpersonsentto.email', 'TEXT_IS_LIKE', '@');
								oSearch.addFilter('invoice.contactpersonsentto.email', 'TEXT_IS_LIKE', '.');
							}
							else
							{
								oSearch.addBracket('(');
								oSearch.addFilter('invoice.contactpersonsentto.email', 'IS_NULL');
								oSearch.addOperator('or');
								oSearch.addFilter('invoice.contactpersonsentto.email', 'TEXT_IS_NOT_LIKE', '@');
								oSearch.addOperator('or');
								oSearch.addFilter('invoice.contactpersonsentto.email', 'TEXT_IS_NOT_LIKE', '.');
								oSearch.addBracket(')');
							}
						}
						oSearch.sort(sSortColumn, sSortDirection);
						oSearch.rows = 50;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								delete(oParam.invoiceSearchStep);
								nsFreshcare.internal.financial.invoice.unsentInvoices.show(oParam, oResponse);
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
							}
						});
					}
				},

				show: function(oParam, oResponse)
				{
					var dToday = new Date();
					var sXHTMLElementID = 'ns1blankspaceInvoiceColumn1';
					var sLabel = 'Unsent Invoices.';
					var sXHTMLContext = 'Unsent';
					var sSortColumn = '';
					var sSortDirection;
					var aFilters = [];
					var aColumns = [];

					if (oParam != undefined)
					{
						if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
						if (oParam.label != undefined) {sLabel = oParam.label}
						if (oParam.filters != undefined) {aFilters = oParam.filters}
						if (oParam.columns != undefined) {aColumns = oParam.columns}
						if (oParam.sortColumn != undefined) {sSortColumn = oParam.sortColumn}
						if (oParam.sortDirection!= undefined) {sSortDirection = ((oParam.sortDirection === 'asc') ? 'desc' : 'asc')}
						if (oParam.xhtmlContext === undefined) {oParam.xhtmlContext = sXHTMLContext}
					}

					var aHTML = [];
					
					// First, let's construct the display and filtering areas
					if ($('#' + sXHTMLElementID).attr('data-loading') === '1') 
					{

						$('#' + sXHTMLElementID).attr('data-loading', '');
						
						aHTML.push('<div id="ns1blankspaceInvoicesBulkMain" class="ns1blankspaceControlMain">');
						aHTML.push('<table id="ns1blankspaceInvoicesBulkContainer"><tr>');
						aHTML.push('<td id="ns1blankspaceInvoicesBulkColumn1" class="ns1blankspaceColumn1Flexible"></td>');
						aHTML.push('</tr></table>');	
						aHTML.push('</div>');
						aHTML.push('<div id="ns1blankspaceInvoiceHidden" style="display: none;">' +
										'<input id="ns1blankspaceEmailTo">' +
										'<input id="ns1blankspaceEmailSubject">' +
										'<input id="ns1blankspaceMessageText">' +
									'</div>');
						
						$('#' + sXHTMLElementID).html(aHTML.join(''));


						aHTML.push('<table id="ns1blankspaceInvoice' + sXHTMLContext + '"><tr>');
						aHTML.push('<td id="ns1blankspaceInvoice' + sXHTMLContext + 'Results" class="ns1blankspaceColumn1Flexible"></td>' +
								   '<td id="ns1blankspaceInvoice' + sXHTMLContext + 'SearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
								   '<td id="ns1blankspaceInvoice' + sXHTMLContext + 'Filter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
						aHTML.push('</tr></table>');

						$('#ns1blankspaceInvoicesBulkColumn1').html(aHTML.join(''));

						// Search criteria bar 'handle' - allows user to get the search criteria div back into view
						aHTML = [];
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle" style="height:25px" class="ns1blankspaceInvoiceAction">Search Criteria</span>');
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'Email" style="height:25px" class="ns1blankspaceInvoiceAction">Email Invoices</span>');
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'Print" style="height:25px" class="ns1blankspaceInvoiceAction">Print Invoices</span>');
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'Delete" style="height:25px" class="ns1blankspaceInvoiceAction">Delete Invoices</span>');
						aHTML.push('<span id="ns1blankspaceInvoice' + sXHTMLContext + 'Complete" style="height:25px" class="ns1blankspaceInvoiceAction">Mark as Sent</span>');
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchRibbon').html(aHTML.join(''));

						aHTML = [];
						aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

						aHTML.push('<tr><td id="ns1blankspaceInvoice' + sXHTMLContext + 'Search" class="ns1blankspaceAction">Search</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceInvoice' + sXHTMLContext + 'StatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

						// Filtering area - we're filtering on Has email and No Email
						aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Has Email Address?</td></tr>');
						aHTML.push('<tr><td id="ns1blankspaceHasEmail_Yes" ' +
											'class="ns1blankspaceHasEmail nsFreshcareSelectable nsFreshcareSelected" data-selected="1">' +
											'Yes' + 
									'</td></tr>');

						aHTML.push('<tr><td id="ns1blankspaceHasEmail_No" ' +
											'class="ns1blankspaceHasEmail nsFreshcareSelectable">' +
											'No' + 
									'</td></tr>');

						aHTML.push('</table>');

						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Filter').html(aHTML.join(''));


						// Bind the Search Handle (hides the search criteria area)
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').button({
							text: false,
							icons: {
								primary: 'ui-icon-arrowthickstop-1-w'
							}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() {
							$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').hide();
							$('#ns1blankspaceInvoice' + sXHTMLContext + 'Filter').show('slide', {direction: 'left'}, 500);
						});

						// Bind the Email button
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Email').button({
							text: false,
							icons: { primary: 'ui-icon-mail-closed'}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() 
						{
							if (confirm('Are you sure you want to email Invoices to the selected Businesses?', 'Yes', 'No'))
							{
								// Disable all the check boxes first so user can't change them part way through processing
								$('.ns1blankspaceInvoiceAction').attr('disabled', true);

								oParam.functionProcess = nsFreshcare.internal.financial.invoice.unsentInvoices.email;
								oParam.process = 'email';
								nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
							}
							
						});
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Email').hide();


						// Bind the Print button
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Print').button({
							text: false,
							icons: { primary: 'ui-icon-print'}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() 
						{
							if (confirm('Are you sure you want to print Invoices for the selected Businesses?', 'Yes', 'No'))
							{
								// Disable all the check boxes first so user can't change them part way through processing
								$('.ns1blankspaceInvoiceAction').attr('disabled', true);

								nsFreshcare.internal.data.invoiceHTML = [];
								oParam.functionProcess = nsFreshcare.internal.financial.invoice.unsentInvoices.print;
								oParam.process = 'print';
								nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
							}
							
						});
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Print').hide();


						// Bind the Delete button
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Delete').button({
							text: false,
							icons: { primary: 'ui-icon-close'}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() 
						{
							if (confirm('Are you sure you want to delete the selected Invoices?', 'Yes', 'No'))
							{
								// Disable all the check boxes first so user can't change them part way through processing
								$('.ns1blankspaceInvoiceAction').attr('disabled', true);

								oParam.functionProcess = nsFreshcare.internal.financial.invoice.unsentInvoices['delete'];
								oParam.process = 'delete';
								nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
							}
							
						});
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Delete').hide();


						// Bind the Complete button
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Complete').button({
							text: false,
							icons: { primary: 'ui-icon-check'}
						})
						.css('width', '12px')
						.css('height', '25px')
						.click(function() 
						{
							if (confirm('Are you sure you want mark the selected Invoicesas Sent?', 'Yes', 'No'))
							{
								// Disable all the check boxes first so user can't change them part way through processing
								$('.ns1blankspaceInvoiceAction').attr('disabled', true);

								oParam.functionProcess = nsFreshcare.internal.financial.invoice.unsentInvoices.complete;
								oParam.process = 'complete';
								nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
							}
							
						});
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Complete').hide();


						// Bind Filter
						$('.ns1blankspaceHasEmail').click(function() 
						{
							$('.ns1blankspaceHasEmail').removeClass('nsFreshcareSelected');
							$('.ns1blankspaceHasEmail').attr('data-selected','0');
							
							$(this).addClass('nsFreshcareSelected');
							$(this).attr('data-selected', '1');
						});


						// Bind the Search button
						$('#ns1blankspaceInvoice' + sXHTMLContext + 'Search').button({
							label: "Search"
						})
						.click(function() 
						{
							ns1blankspace.okToSave = true;

							if ($('.ns1blankspaceHasEmail[data-selected="1"]').length == 0)
							{
								ns1blankspace.status.error('Please choose a Has Email option.')
								ns1blankspace.okToSave = false;
							}
							else
							{
								if ($('.ns1blankspaceHasEmail[data-selected="1"]').length == 1)
								{
									oParam.filterEmail = $('.ns1blankspaceHasEmail[data-selected="1"]').first().html();
								}
								else
								{
									delete(oParam.filterEmail);
								}
							}
							
							if (ns1blankspace.okToSave) 
							{
								$('#ns1blankspaceInvoice' + sXHTMLContext + 'Filter').hide(
								{duration: 200, complete: function() 
									{

									$('#ns1blankspaceInvoice' + sXHTMLContext + 'SearchHandle').show();
									if (oParam.filterEmail === 'Yes' || oParam.filterEmail === undefined)
									{
										$('#ns1blankspaceInvoice' + sXHTMLContext + 'Email').show();
									}
									$('#ns1blankspaceInvoice' + sXHTMLContext + 'Print').show();
									$('#ns1blankspaceInvoice' + sXHTMLContext + 'Delete').show();
									$('#ns1blankspaceInvoice' + sXHTMLContext + 'Complete').show();
									$('#ns1blankspaceInvoice' + sXHTMLContext + 'Results').html(ns1blankspace.xhtml.loading);
									oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.internal.financial.invoice.unsentInvoices.show)

									nsFreshcare.internal.financial.invoice.unsentInvoices.search(oParam);
									}
								});

							}
							else 
							{
								window.setTimeout('$("#ns1blankspaceInvoice' + sXHTMLContext + 'StatusMessage").fadeOut(4000)', 7000);
							}
						});

					}

					if (oResponse) 
					{	
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspaceHome">');
							aHTML.push('<tr><td class="ns1blankspaceNothing">No records</td></tr>');
							aHTML.push('</table>');

							$('#ns1blankspaceInvoice' + sXHTMLContext + 'Results').html(aHTML.join(''));
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceInvoice' + sXHTMLContext + '" class="ns1blankspace">');
							
							aHTML.push('<tr class="ns1blankspaceCaption">');

							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
										' data-column="reference"' +
										' data-sortdirection="asc">' +
										'Reference' + 
										'</td>');

							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
										' data-column="contactbusinesstext"' +
										' data-sortdirection="asc">' +
										'Business' + 
										'</td>');

							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
										' data-column="description"' +
										' data-sortdirection="asc">' +
										'Description' + 
										'</td>');

							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
										' data-column="amount"' +
										' data-sortdirection="asc">' +
										'Amount' + 
										'</td>');

							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;"' +
										' data-column="sentdate"' +
										' data-sortdirection="asc">' +
										'Sent Date' + 
										'</td>');

							aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceMainRowOptionsSelect"' +
										' style="color:#B8B8B8; padding:4px; background-color:#F8F8F8; vertical-align:top;">' + 
										'<input type="checkbox" id="ns1blankspaceInvoices' + sXHTMLContext + 'CheckAll"' +
											' class="ns1blankspaceInvoice' + sXHTMLContext + ' ns1blankspaceInvoiceAction" checked="false">' +
										'</td>');

							aHTML.push('</tr>');

							nsFreshcare.internal.data.invoiceBulkParams = oParam;
							
							$.each(oResponse.data.rows, function() 	
							{
								aHTML.push(nsFreshcare.internal.financial.invoice.unsentInvoices.row(this));
							});
							
							aHTML.push('</table>');

							ns1blankspace.render.page.show(
							{
								xhtmlElementID: 'ns1blankspaceInvoice' + sXHTMLContext + 'Results',
								xhtmlContext: 'Invoices' + sXHTMLContext,
								xhtml: aHTML.join(''),
								showMore: (oResponse.morerows == 'true'),
								more: oResponse.moreid,
								rows: 20,
								functionShowRow: nsFreshcare.internal.financial.invoice.commissions.row,
								functionOnNewPage: nsFreshcare.internal.financial.invoice.unsentInvoices.bind,
								type: 'json'
							}); 	
							
							nsFreshcare.internal.financial.invoice.unsentInvoices.bind();
						}
					}
				},

				row: function(oRow)
				{
					var aHTML = [];

					aHTML.push('<tr id="ns1blankspaceInvoiceUnsentInclude_row-' + oRow.id + '">');

					aHTML.push('<td id="ns1blankspaceInvoicesUnsent_reference-' + oRow.id + '"' +
									' class="ns1blankspaceRow">' +
											oRow['invoice.reference'] + 
								'</td>');

					aHTML.push('<td id="ns1blankspaceInvoicesUnsent_contactbusinesssenttotext-' + oRow.id + '"' +
									' class="ns1blankspaceRow">' +
											oRow['invoice.contactbusinesssenttotext'] + 
								'</td>');

					aHTML.push('<td id="ns1blankspaceInvoicesUnsent_description-' + oRow.id + '"' +
									' class="ns1blankspaceRow">' +
											oRow['invoice.description'] + 
								'</td>');

					aHTML.push('<td id="ns1blankspaceInvoicesUnsent_amount-' + oRow.id + '"' +
									' class="ns1blankspaceRow">' +
											oRow['invoice.amount'] + 
								'</td>');

					aHTML.push('<td id="ns1blankspaceInvoicesUnsent_sentdate-' + oRow.id + '"' +
									' class="ns1blankspaceRow">' +
											oRow['invoice.sentdate'] + 
								'</td>');

					aHTML.push('<td id="ns1blankspaceInvoicesUnsent-' + oRow.id + '"' +
								' class="ns1blankspaceMainRowOptionsInclude"' +
								' style="color:#B8B8B8; padding:4px; vertical-align:top;">' + 
								'<input type="checkbox" id="ns1blankspaceInvoiceUnsentInclude-' + oRow.id + '"' +
								' class="ns1blankspaceInvoiceUnsentInclude ns1blankspaceInvoiceAction" ' +
								' checked="false"');

					aHTML.push(' data-contactbusiness="' + oRow['invoice.contactbusinesssentto'] + '"' +
							   ' data-contactbusinesstext="' + oRow['invoice.contactbusinesssenttotext'] + '"' +
							   ' data-contactperson="' + oRow['invoice.contactpersonsentto'] + '"' +
							   ' data-contactpersontext="' + oRow['invoice.contactpersonsenttotext'] + '"' +
							   ' data-reference="' + oRow['invoice.reference'] + '"' +
							   ' data-amount="' + oRow['invoice.amount'] + '"' +
							   ' data-sentdate="' + oRow['invoice.sentdate'] + '"' +
							   ' data-duedate="' + oRow['invoice.duedate'] + '"' +
							   ' data-description="' + oRow['invoice.description'] + '"' +
							   ' data-email="' + oRow['invoice.contactpersonsentto.email'] + '"' +
							   ' data-id="' + oRow['id'] + '"');

					aHTML.push('</td></tr>')

					return aHTML.join('');
				},

				bind: function()
				{
					$('#ns1blankspaceInvoicesUnsentCheckAll').click(function()
					{

						if ($(this).attr('checked'))
						{
							$('input.ns1blankspaceInvoiceUnsentInclude').prop('checked', true);
						}
						else
						{
							$('input.ns1blankspaceInvoiceUnsentInclude').prop('checked', false);
						}
					});

					$('.ns1blankspaceHeaderSort')
						.css('cursor', 'pointer')
						.click(function()
						{
							var oParam = nsFreshcare.internal.data.invoiceBulkParams;

							oParam.sortColumn = $(this).attr('data-column');
							oParam.sortDirection = $(this).attr('data-sortdirection');
							$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));

							nsFreshcare.internal.financial.invoice.unsentInvoices.search(oParam);
						});
				},

				process: function(oParam)
				{
					var iRowIndex = 0;
					var iInvoiceId;
					var sData = '';
					var oThisElement;
					var fFunctionProcess;
					var sProcess;

					if (oParam)
					{
						if (oParam.xhtmlContext != undefined) {sXHTMLContext = oParam.xhtmlContext}
						if (oParam.rowIndex != undefined) {iRowIndex = oParam.rowIndex}
						if (oParam.invoiceID != undefined) {iInvoiceId = oParam.invoiceID}
						if (oParam.successful === undefined) {oParam.sucessful = false}
						if (oParam.functionProcess) {fFunctionProcess = oParam.functionProcess}
						if (oParam.process) {sProcess = oParam.process}
					}

					if (oParam.unsentInvoiceProcessStep === undefined) 
					{
						// The 'complete' & 'delete' functions don't need the item rows or invoiceTemplate documents, all others do
						oParam.unsentInvoiceProcessStep = (sProcess === 'complete' || sProcess == 'delete') ? 4 : 1;
						nsFreshcare.internal.data.invoiceSendData = $('input.ns1blankspaceInvoiceUnsentInclude:checked');
						oParam.rowIndex = iRowIndex;
					}

					if (iRowIndex < nsFreshcare.internal.data.invoiceSendData.length)
					{
						oThisElement = nsFreshcare.internal.data.invoiceSendData[iRowIndex];
						iInvoiceId = oThisElement.id.split('-').pop();
						if (oThisElement.invoiceData === undefined)
						{
							oThisElement.invoiceData = {}
							oThisElement.invoiceData.id = iInvoiceId;
							oThisElement.invoiceData['invoice.contactbusinesssentto'] = $(oThisElement).attr('data-contactbusiness');
							oThisElement.invoiceData['invoice.contactbusinesssenttotext'] = $(oThisElement).attr('data-contactbusinesstext');
							oThisElement.invoiceData['invoice.contactpersonsentto'] = $(oThisElement).attr('data-contactperson');
							oThisElement.invoiceData['invoice.contactpersonsenttotext'] = $(oThisElement).attr('data-contactpersontext');
							oThisElement.invoiceData['invoice.reference'] = $(oThisElement).attr('data-reference');
							oThisElement.invoiceData['invoice.amount'] = $(oThisElement).attr('data-amount');
							oThisElement.invoiceData['invoice.sentdate'] = $(oThisElement).attr('data-sentdate');
							oThisElement.invoiceData['invoice.duedate'] = $(oThisElement).attr('data-duedate');
							oThisElement.invoiceData['invoice.description'] = $(oThisElement).attr('data-description');
							oThisElement.invoiceData['invoice.contactpersonsentto.email'] = $(oThisElement).attr('data-email');
							nsFreshcare.internal.data.invoiceSendData[iRowIndex] = oThisElement;
						}

						ns1blankspace.status.working();

						// If we need the item rows, get them first
						if (oParam.unsentInvoiceProcessStep === 1)
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Finding Invoice line items.'});

							var oSearch = new AdvancedSearch();
							oSearch.method = 'FINANCIAL_ITEM_SEARCH';
							oSearch.addField('description,amount,tax,object,objectcontext');
							oSearch.addFilter('object', 'EQUAL_TO', '5');
							oSearch.addFilter('objectcontext', 'EQUAL_TO', iInvoiceId);
							oSearch.rows = 100;
							oSearch.sort('description', 'asc');
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									nsFreshcare.internal.data.invoiceSendData[iRowIndex].invoiceData.items = oResponse.data.rows;
									oParam.unsentInvoiceProcessStep = 2;
								}
								else
								{
									nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
																errorMessage: 'Invoice could not be ' + sProcess + ((sProcess.substr(sProcess.length - 1,1) == 'e') ? 'd' : 'ed') + '.',
																errorNotes: oResponse.error.errornotes});
									oParam.unsentInvoiceProcessStep = 10;
								}
								nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
							});
						}

						// Get the Invoice template document
						else if (oParam.unsentInvoiceProcessStep === 2)
						{
							oParam.template = 'invoice';
							oParam.onComplete = nsFreshcare.internal.financial.invoice.unsentInvoices.process;
							oParam.unsentInvoiceProcessStep = 4;
							ns1blankspace.util.initTemplate(oParam);
						}

						// Get the Invoice Schedule template document
						else if (oParam.unsentInvoiceProcessStep === 3)
						{
							oParam.template = 'invoice schedule';
							oParam.onComplete = nsFreshcare.internal.financial.invoice.unsentInvoices.process;
							oParam.unsentInvoiceProcessStep = 4;
							ns1blankspace.util.initTemplate(oParam);
						}

						// Now call the function that processes the row
						else if (oParam.unsentInvoiceProcessStep === 4)
						{
							oParam.unsentInvoiceProcessStep = 10;
							oParam.invoiceData = oThisElement.invoiceData;
							oParam.thisElement = oThisElement;
							fFunctionProcess(oParam);
						}

						// Complete the processing of this invoice
						else if (oParam.unsentInvoiceProcessStep === 10)
						{
							oParam.rowIndex = iRowIndex + 1;
							oParam.unsentInvoiceProcessStep = 1;
							if (oParam.successful)		// Process was a succcess, remove status row
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, remove: true});
								$(oThisElement).parent().parent().remove();
							}
							delete(oParam.successful);
							delete(oParam.invoiceData);
							delete(oParam.thisElement);

							nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
						}
					}
					else
					{
						delete(oParam.successful);
						delete (oParam.unsentInvoiceProcessStep);
						delete(oParam.rowIndex);
						$('.ns1blankspaceInvoiceAction').attr('disabled', false);

						if (nsFreshcare.internal.data.invoiceSendData.length == 0)
						{
							ns1blankspace.status.error('There are no line items to process');
						}
						else
						{
							ns1blankspace.status.message('Processing completed');
							delete(nsFreshcare.internal.data.invoiceSendData);

							// We need to compile the html and send to a separate window so that the invoice can be printed
							if (sProcess === 'print')
							{
								nsFreshcare.internal.financial.invoice.unsentInvoices.printPreview.show();
							}
						}
					}
				},

				print: function(oParam)
				{
					var oInvoice;
					var oInvoiceItems;
					var sXHTML = '';
					var oThisElement;
					var aHTML = [];

					if (oParam)
					{
						if (oParam.invoiceData) 
						{
							oInvoice = oParam.invoiceData;
							oInvoiceItems = oInvoice.items;
						}
						if (oParam.thisElement) {oThisElement = oParam.thisElement}
					}

					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Creating Invoice...'});

					// Replace values in xhtml invoice template with values from invoice
					if (ns1blankspace.xhtml.templates['invoice'] != undefined)
					{
						aHTML.push(ns1blankspace.format.render({object: 5, 
																xhtmlTemplate: ns1blankspace.xhtml.templates['invoice'],
																objectContext: oInvoice.id,
																objectData: oInvoice,
																objectOtherData: oInvoiceItems}));

						aHTML.push('<p><!-- pagebreak --></p>');

						nsFreshcare.internal.data.invoiceHTML.push(aHTML.join(''));
					}

					nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
				},

				printPreview:
				{
					show: 	function() 
					{

						$('.ns1blankspaceRowCertificateStatus').hide();
						var windowInvoicePrintPreview = window.open('', 'InvoicePrintPreview');
						windowInvoicePrintPreview.document.write(nsFreshcare.internal.financial.invoice.unsentInvoices.printPreview.layout(), 'width=770');

						/*	$('#ns1blankspaceCertificatesPreview').html(nsFreshcare.admin.certificate.printPreview.layout());
							$('#ns1blankspaceCertificatesMain').hide();
							$('#ns1blankspaceCertificatesPreview').show();
						*/
					},

					layout: function() 
					{

						var aHTML = [];
						
						//OPTIONAL GET DOCUMENT
						
						if (nsFreshcare.internal.data.invoiceHTML)
						{
							aHTML.push(/*nsFreshcare.admin.certificate.data.certificateBackground + */ nsFreshcare.internal.data.invoiceHTML);
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceHomeContainer" class="ns1blankspace">');
								
							aHTML.push('<tr><td id="ns1blankspaceHelp" class="ns1blankspace">' +
												'Nothing to Preview' +
												'</td>' +
											'</tr>');
											
							aHTML.push('</table>');
						}
						
						return aHTML.join('');

					}
				},

				email: function(oParam)
				{
					var oInvoice;
					var oInvoiceItems;
					var sData = '';
					var aHTML = [];
					var oThisElement;

					if (oParam)
					{
						if (oParam.invoiceData) 
						{
							oInvoice = oParam.invoiceData;
							oInvoiceItems = oInvoice.items;
						}
						if (oParam.unsentInvoiceEmailStep === undefined) {oParam.unsentInvoiceEmailStep = 1}
						if (oParam.thisElement) {oThisElement = oParam.thisElement}
					}
					else {oParam = {unsentInvoiceEmailStep: 1}}

					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Creating Invoice...'});

					// Replace values in xhtml invoice template with values from invoice
					if (oParam.unsentInvoiceEmailStep === 1)
					{
						if (ns1blankspace.xhtml.templates['invoice'] != undefined)
						{
							aHTML.push(ns1blankspace.format.render({object: 5,
																	xhtmlTemplate: ns1blankspace.xhtml.templates['invoice'],
																	objectData: oInvoice,
																	objectOtherData: oInvoiceItems}));

							oParam = ns1blankspace.util.setParam(oParam, 'xhtmlElementID', 'ns1blankspaceInvoiceUnsentInclude_statusCell-' + oInvoice.id);
							oParam = ns1blankspace.util.setParam(oParam, 'mode', 2);	// Just send
							oParam = ns1blankspace.util.setParam(oParam, 'format', 2);	// PDF
							oParam = ns1blankspace.util.setParam(oParam, 'onCompleteWhenCan', oParam.onComplete);
							oParam = ns1blankspace.util.setParam(oParam, 'onComplete', ns1blankspace.financial.invoice.email.send);
							oParam = ns1blankspace.util.setParam(oParam, 'xhtmlContent', aHTML.join(''));
							oParam = ns1blankspace.util.setParam(oParam, 'filename', oInvoice['invoice.reference'] + '.pdf');
							oParam = ns1blankspace.util.setParam(oParam, 'open', false);

							ns1blankspace.objectContext = oInvoice.id;
							ns1blankspace.objectContextData = {};
							ns1blankspace.objectContextData.contactpersonsentto = oInvoice['invoice.contactpersonsentto'];
							ns1blankspace.objectContextData['invoice.contactpersonsentto.email'] = oInvoice['invoice.contactpersonsentto.email'];
							ns1blankspace.objectContextData.xhtml = aHTML.join('');
							ns1blankspace.objectContextData.reference = oInvoice['invoice.reference'];
							oParam.unsentInvoiceEmailStep = 2;

							ns1blankspace.pdf.create(oParam);
						}

						else
						{
							nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
														errorMessage: 'Invoice template does not exist - cannot create Invoices.'});
						}
					}

					else if (oParam.unsentInvoiceEmailStep === 2)
					{
						delete(ns1blankspace.objectContext);
						ns1blankspace.objectContextData = {};

						delete (oParam.unsentInvoiceEmailStep);
						delete(oParam.filename);
						delete(oParam.xhtmlContent);
						delete(oParam.open);
						delete(oParam.invoice)

						if (oParam.onComplete)
						{
							oParam.success = true;
							ns1blankspaceInvoiceAction.util.onComplete(oParam);
						}
					}
				},

				"delete": function(oParam)
				{
					var oInvoice;
					var sData = '';
					var oThisElement;

					if (oParam)
					{
						if (oParam.invoiceData) {oInvoice = oParam.invoiceData}
						if (oParam.thisElement) {oThisElement = oParam.thisElement}
					}

					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Deleting Invoice...'});

					sData = 'remove=1&id=' + oInvoice.id;
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspaceInvoiceAction.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
						data: sData,
						rf: 'json',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.successful = true;
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Invoice could not be deleted.',
															errorNotes: oResponse.error.errornotes});
							}
							nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
						}
					});
				},

				complete: function(oParam)
				{
					var oInvoice;
					var sData = '';
					var oThisElement;

					if (oParam)
					{
						if (oParam.invoiceData) {oInvoice = oParam.invoiceData}
						if (oParam.thisElement) {oThisElement = oParam.thisElement}
					}

					nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, statusMessage: 'Marking Invoice as Sent...'});

					sData = 'sent=Y&id=' + oInvoice.id;
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspaceInvoiceAction.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
						data: sData,
						rf: 'json',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.successful = true;
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: oThisElement, 
															errorMessage: 'Invoice could not be marked as Sent.',
															errorNotes: oResponse.error.errornotes});
							}
							nsFreshcare.internal.financial.invoice.unsentInvoices.process(oParam);
						}
					});
				}
			}
		}
	},

	entity:
	{
		search: 
		{
			row: function(oRow)
			{
				var aHTML = [];

				var sStatusColumn = $('#ns1blankspaceViewControlSearch').attr('data-statuscolumn');
				var sBusinessInactive = (oRow[sStatusColumn] != nsFreshcare.data.contactStatusActive) ? ' nsFreshcareInactive' : '';
				var sContactInactive = (oRow['contactbusiness.contactperson.' + sStatusColumn] != nsFreshcare.data.contactStatusActive) ? ' nsFreshcareInactive' : '';

				aHTML.push('<tr id="ns1blankspaceEntitySearchRow-' + oRow.id + '">');

				aHTML.push('<td id="ns1blankspaceEntitySearch_tradename-' + oRow.id + '" class="ns1blankspaceSearch' + sBusinessInactive + '">' +
								oRow['tradename'] + 
								'</td>');

				aHTML.push('<td id="ns1blankspaceEntitySearch_contactname-' + oRow.id + '"' +
								' class="ns1blankspaceSearch' + sContactInactive + '"' +
								' data-contactperson="' + oRow['contactbusiness.contactperson.id'] + '">' +
								oRow['contactbusiness.contactperson.firstname'] + ' ' + oRow['contactbusiness.contactperson.surname'] + 
								'</td>');

				aHTML.push('</tr>');

				return aHTML.join('');

			}
		},

		details: function(oParam)
		{
			var sStatusColumn = ns1blankspace.util.getParam(oParam, 'statusColumn').value;
			var aHTML = [];
			var sSourceNamespace = ns1blankspace.util.getParam(oParam, 'sourceNamespace').value;
			var oNS = ns1blankspace.rootnamespace;
			oNS = (ns1blankspace.objectParentName) ? oNS[ns1blankspace.objectParentName] : oNS;
			oNS = oNS[ns1blankspace.objectName];
			
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
				
				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								'Reference' +
								'</td></tr>' +
								'<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Reference">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Trading Name' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsTradingName" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Trading Name">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Legal Name' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsLegalName" class="ns1blankspaceText"' +
									' data-caption="Legal Name">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'ABN' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsABN" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="ABN">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Status' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetails' +  ((sStatusColumn == 'supplierstatus') ? 'Supplier' : 'Customer') + 'Status" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="Status"' +
									' data-method="SETUP_CONTACT_STATUS_SEARCH"' +
									'>' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Website Address' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsWebsite" class="ns1blankspaceText">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Phone' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsPhone" class="ns1blankspaceText"' +
									' data-caption="Phone">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Fax' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsFax" class="ns1blankspaceText"' +
									' data-caption="Fax">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Email' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsEmail" class="ns1blankspaceText"' +
									' data-caption="Email">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								'Primary Contact' +
								'</td></tr>' +
								'<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsPrimaryContact" class="ns1blankspaceSelect"' +
										' data-mandatory="1" data-caption="Primary Contact"' +
										' data-method="CONTACT_PERSON_SEARCH"' +
										' data-columns="firstname-space-surname"' + 
										' data-methodFilter="contactbusiness-EQUAL_TO-' + ns1blankspace.objectContext + '">' +
								'</td></tr>');		

				// If we're viewing CB's, show Certificate and JASANZ Start dates
				if (sSourceNamespace == 'certificationbody')
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Certification Body Number' +
									'</td></tr>' +
									'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowCertificationBodyNumberUpdate">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsCertificationBodyNumber" class="ns1blankspaceText">' +
									'</td></tr>');
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Self Certificaton Date' +
									'</td></tr>' +
									'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowSelfCertificationDateUpdate">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsSelfCertificationDate" class="ns1blankspaceDate">' +
									'</td></tr>');
						
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'JASANZ Date' +
									'</td></tr>' +
									'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowJASANZDateUpdate">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsJASANZDate" class="ns1blankspaceDate">' +
									'</td></tr>');
						
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Manual Audit Approval?' +
									'</td></tr>' +
									'<tr class="ns1blankspaceText" id="ns1blankspaceDetailsRowJASANZDateUpdate">' +
									'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceDetailsManualAuditApproval" class="ns1blankspaceRadio"' +
											'<input type="radio" id="radioManualAuditApproval1" name="radioManualAuditApproval" data-text="Yes" value="Y"/>Yes' +
											'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioManualAuditApproval2" name="radioManualAuditApproval" data-text="No" value="N"/>No' +
									'</td></tr>');
				}

				aHTML.push('</table>');					
				
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
				
				var aHTML = [];
					
				aHTML.push('<table class="ns1blankspace">');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Notes' +
								'</td></tr>' +
								'<tr class="ns1blankspaceTextMulti">' +
								'<td class="ns1blankspaceTextMulti">' +
								'<textarea rows="10" cols="35" id="ns1blankspaceDetailsDescription" class="ns1blankspaceTextMulti"></textarea>' +
								'</td></tr>');
				
				aHTML.push('</table></td></tr>');

				if (ns1blankspace.objectContext === -1)
				{
					aHTML.push('<tr><td>&nbsp;</td></tr>' +
								'<tr><td class="ns1blankspaceAction" style="text-align:right;">' +
									'<span id="ns1blankspaceDetailsNext">Next</span>'+
								'</td></tr>');
				}

				aHTML.push('</table>' +
								'</td></tr>');

				aHTML.push('</table>');					
					
				$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

				if (ns1blankspace.objectContext === -1) {$('.ns1blankspaceHideOnNew').hide();}

				$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

				$('#ns1blankspaceDetailsNext')
					.button({label: 'Next'})
					.on('click', function()
					{
						ns1blankspace.show({selector: '#ns1blankspaceMainAddress'});
						$('td.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
						$('#ns1blankspaceControlAddress').addClass('ns1blankspaceHighlight')
						nsFreshcare.admin.grower.address({suburbUpper: true});
					});

				// v3.1.2 SUP022569 Disable fields if readOnly
				if (oNS.readOnly == true)
				{
					$('#ns1blankspaceMainDetails input').attr('disabled', true).addClass('nsFreshcareDisabled');
					$('#ns1blankspaceMainDetails textarea').attr('disabled', true).addClass('nsFreshcareDisabled');
				}

				// Mask the relevant fields
				$('#ns1blankspaceDetailsABN').mask('99 999 999 999', {placeholder: " "});
				$('#ns1blankspaceDetailsPhone').mask('99 9999 9999', {placeholder: " "});
				$('#ns1blankspaceDetailsFax').mask('99 9999 9999', {placeholder: " "});

				if (ns1blankspace.objectContextData != undefined)
				{
					$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData['contactbusiness.reference'].formatXHTML());
					$('#ns1blankspaceDetailsTradingName').val(ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML());
					$('#ns1blankspaceDetailsLegalName').val(ns1blankspace.objectContextData['contactbusiness.legalname'].formatXHTML());
					$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData['contactbusiness.abn'].formatXHTML());
					$('#ns1blankspaceDetailsWebsite').val(ns1blankspace.objectContextData['contactbusiness.webaddress'].formatXHTML());
					$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData['contactbusiness.phonenumber'].formatXHTML());
					$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData['contactbusiness.faxnumber'].formatXHTML());
					$('#ns1blankspaceDetailsEmail').val(ns1blankspace.objectContextData['contactbusiness.email'].formatXHTML());
					$('#ns1blankspaceDetailsPrimaryContact').val(ns1blankspace.objectContextData['contactbusiness.primarycontactpersontext'].formatXHTML());
					$('#ns1blankspaceDetailsPrimaryContact').attr('data-id', ns1blankspace.objectContextData['contactbusiness.primarycontactperson'].formatXHTML());
					$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData['contactbusiness.notes'].formatXHTML());

					// v3.1.2 If we're looking at a CB, show CB Number and Self Cert / JASANZ start dates & Manual Audit Aproval
					if (sSourceNamespace == 'certificationbody')
					{
						$('#ns1blankspaceDetailsCertificationBodyNumber').val(ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.certificationBodyNumberId].formatXHTML());
						$('#ns1blankspaceDetailsSelfCertificationDate').val(ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.selfCertificationDateId].formatXHTML().replace(' 00:00:00', ''));
						$('#ns1blankspaceDetailsJASANZDate').val(ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.jasanzDateId].formatXHTML().replace(' 00:00:00', ''));
						$('[name="radioManualAuditApproval"][value="' + ns1blankspace.objectContextData['contactbusiness.semanualauditapproval'] + '"]').attr('checked', true);
					}

					if ($('#ns1blankspaceDetailsSupplierStatus').is('*'))
					{
						$('#ns1blankspaceDetailsSupplierStatus').attr('data-id', ns1blankspace.objectContextData['contactbusiness.supplierstatus']);
						$('#ns1blankspaceDetailsSupplierStatus').val(ns1blankspace.objectContextData['contactbusiness.supplierstatustext'].formatXHTML());
					}

					if ($('#ns1blankspaceDetailsCustomerStatus').is('*'))
					{
						$('#ns1blankspaceDetailsCustomerStatus').attr('data-id', ns1blankspace.objectContextData['contactbusiness.customerstatus']);
						$('#ns1blankspaceDetailsCustomerStatus').val(ns1blankspace.objectContextData['contactbusiness.customerstatustext'].formatXHTML());
					}

					// Mask ABN
					if (ns1blankspace.objectContextData["contactbusiness.abn"].length > 0 && ns1blankspace.objectContextData["contactbusiness.abn"].indexOf(' ') === -1) 
					{
						$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData["contactbusiness.abn"].substr(0,2) + ' ' + 
																ns1blankspace.objectContextData["contactbusiness.abn"].substr(2,3) + ' ' + 
																ns1blankspace.objectContextData["contactbusiness.abn"].substr(5,3) + ' ' +
																ns1blankspace.objectContextData["contactbusiness.abn"].substr(8));
					}
					else 
					{
						$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML());
					}

					// Mask work phone
					if (ns1blankspace.objectContextData["contactbusiness.phonenumber"].length > 0 && ns1blankspace.objectContextData["contactbusiness.phonenumber"].indexOf(' ') === -1) 
					{
						$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData["contactbusiness.phonenumber"].substr(0,2) + ' ' + 
																  ns1blankspace.objectContextData["contactbusiness.phonenumber"].substr(2,4) + ' ' +
																  ns1blankspace.objectContextData["contactbusiness.phonenumber"].substr(6));
					}
					else 
					{
						$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData["contactbusiness.phonenumber"].formatXHTML());
					}

					// Mask Fax
					if (ns1blankspace.objectContextData["contactbusiness.faxnumber"].length > 0 && ns1blankspace.objectContextData["contactbusiness.faxnumber"].indexOf(' ') === -1) 
					{
						$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData["contactbusiness.faxnumber"].substr(0,2) + ' ' +
																ns1blankspace.objectContextData["contactbusiness.faxnumber"].substr(2,4) + ' ' +
																ns1blankspace.objectContextData["contactbusiness.faxnumber"].substr(6));
					}	
					else 
					{
						$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData["contactbusiness.faxnumber"].formatXHTML());
					}

				}
				else
				{
					$('#ns1blankspaceDetailsSupplierStatus').val('Active');
					$('#ns1blankspaceDetailsSupplierStatus').attr('data-id', nsFreshcare.data.contactStatusActive);

					if (sSourceNamespace == 'certificationbody')
					{
						$('[name="radioManualAuditApproval"][value="N"]').attr('checked', true);
					}
				}
			}	
		},

		people:
		{
			search: function(oParam)
			{
				var iPrimaryContact = ns1blankspace.util.getParam(oParam, 'primaryContact').value;
				var fFunctionOnComplete = ns1blankspace.util.getParam(oParam, 'onComplete', {"default": nsFreshcare.internal.entity.people.show}).value;
				var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'surname'}).value;
				var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
				var sStatusColumn = ns1blankspace.util.getParam(oParam, 'statusColumn').value;

				ns1blankspace.data.defaultCOPText = '';
				ns1blankspace.data.defaultCOPID = '';
				
				// NOTE: This call will return 2 rows when a contact has more than one user linked to it.
				var oSearch = new AdvancedSearch()
				oSearch.method = 'CONTACT_PERSON_SEARCH';
				oSearch.addField('firstname,surname,email,workphone,mobile,supplierstatus,supplierstatustext,customerstatus,customerstatustext,reference,' +
								'contactperson.contactbusiness.primarycontactperson,title,titletext,fax,position,contactperson.contactbusiness.primarycontactperson,' +
								'streetaddress1,streetaddress2,streetsuburb,streetstate,streetpostcode,streetcountry,contactperson.user.username,contactperson.user.id,' +
								'mailingaddress1,mailingaddress2,mailingsuburb,mailingstate,mailingpostcode,mailingcountry,gender,gendertext,' +
								'createddate,createduser,createdusertext,modifieddate,modifieduser,modifiedusertext');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				if (iPrimaryContact)
				{
					oSearch.addFilter('id', 'NOT_EQUAL_TO', iPrimaryContact);
				}
				
				// v3.1.205 SUP023021 CB's can now see inactive contacts. Internal and CB's are the only users who use entity.people.search
				//if (nsFreshcare.user.role.toLowerCase() != 'admin' && nsFreshcare.user.role.toLowerCase() != 'jasanz')
				//{
				//	oSearch.addFilter(sStatusColumn, 'EQUAL_TO', nsFreshcare.data.contactStatusActive);
				//}
				oSearch.sort(sSortColumn, sSortDirection);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						// v3.1.0i SUP022250 Set to null and add rows in .row() function
						ns1blankspace.objectContextData.people = [];

						if (fFunctionOnComplete)
						{
							oParam.onComplete = fFunctionOnComplete;
							ns1blankspace.util.onComplete(oParam);
						}
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			},

			show: function(oParam)
			{
				var aHTML = [];
				var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {"default": 'ns1blankspaceMainContacts'}).value;
				var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'surname'}).value;
				var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
				var bAddPerson = ns1blankspace.util.getParam(oParam, 'newPerson', {"default": false}).value;
				var sStatusColumn = ns1blankspace.util.getParam(oParam, 'statusColumn').value;
				var sFunctionDetails = ns1blankspace.util.getParam(oParam, 'functionDetails', {"default": "nsFreshcare.internal.entity.people.details"}).value;
				var sFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": "nsFreshcare.internal.entity.people.save.send"}).value;
				var bAddContact = ns1blankspace.util.getParam(oParam, 'addContact', {"default": false}).value;
				var sPageObject = ns1blankspace.util.getParam(oParam, 'pageObject', {'default': 'grower'}).value;
				var bCanAdd = ns1blankspace.util.getParam(oParam, 'canAdd', {'default': true}).value;
				var bCanUpdate
				var aHTML = [];

				if (sStatusColumn === undefined) {sStatusColumn = (oParam.pageObject === 'grower' || oParam.pageObject === 'auditor') ? 'customerstatus' : 'supplierstatus'}

				if (oParam === undefined) {oParam = {}}
				if (oParam.statusColumn === undefined) {oParam.statusColumn = sStatusColumn;}
				if (oParam.xhtmlElementID === undefined) {oParam.xhtmlElementID = sXHTMLElementID}

				if (!bAddContact && ($('#' + sXHTMLElementID).attr('data-loading') === '1' || oResponse === undefined))
				{
					$('#' + sXHTMLElementID).attr('data-loading', '');
					//ns1blankspace.objectContextData.people
					oParam.onComplete = nsFreshcare.internal.entity.people.show;
					nsFreshcare.internal.entity.people.search(oParam);
				}
				else
				{

					aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceBusinessContactColumn1" class="ns1blankspaceColumn1Large"' +
									' data-statuscolumn="' + sStatusColumn + '" data-functionDetails="' + sFunctionDetails + '"' +
									' data-pageobject="' + sPageObject + '" data-functionDetails="' + sFunctionDetails + '"' +
									' data-functionSave="' + sFunctionSave + '"' +
									'>' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								/*'<td id="ns1blankspaceEntityPeopleColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
								'</td>' +*/
								'</tr>' +
								'</table>');				
					
					$('#' + sXHTMLElementID).html(aHTML.join(''));
					
					aHTML = [];
					
					// Add in the (sortable) header
					aHTML.push('<table border="0" cellspacing="0" cellpadding="0" class="ns1blankspace" id="ns1blankspaceEntityPeopleTable">');
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="firstname"' +
									' data-sortdirection="' + ((sSortColumn == "firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>First Name</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="surname"' +
									' data-sortdirection="' + ((sSortColumn == "surname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Surname</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="mobile"' +
									' data-sortdirection="' + ((sSortColumn == "mobile") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Mobile</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="phonenumber"' +
									' data-sortdirection="' + ((sSortColumn == "phonenumber") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Phone</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="email"' +
									' data-sortdirection="' + ((sSortColumn == "email") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Email</td>');
					if (oParam.showGroups === true)
					{
						aHTML.push('<td class="ns1blankspaceHeaderCaption">Groups</td>');
					}
					aHTML.push('<td class="ns1blankspaceHeaderCaption" width="65px">' + (bCanAdd ? '<span id="ns1blankspaceBusinessContactAdd">&nbsp;</span>' : '') + '</td>');
					aHTML.push('</tr>');
					
					if (bAddContact || oResponse.data.rows.length == 0)
					{
						aHTML.push('<tr>');
						aHTML.push('<td class="ns1blankspaceNothing" colspan="">No people. Click + to add.</td>');
						aHTML.push('</tr>');
						aHTML.push('</table>');

						$('#ns1blankspaceBusinessContactColumn1').html(aHTML.join(''));		
						nsFreshcare.internal.entity.people.bind(oParam);
						
						if (bAddContact)	// Used when Add Contact is clicked from Summary tab (if available)
						{
							oParam.add = true;
							nsFreshcare.internal.entity.people.manage(oParam);

							if ($('#ns1blankspaceEntityPeopleActionContainer').children().length > 0) 
							{
								oParam.xhtmlElementEditID = "ns1blankspaceEntityPeopleRow2";
								nsFreshcare.internal.entity.people.details(oParam);
							}
						}
					}
					else
					{
						$.each(oResponse.data.rows, function()
						{
							aHTML.push(nsFreshcare.internal.entity.people.row(this, oParam));
						});
						
						aHTML.push('</table>');
						
						$.extend(oParam,
						{
							xhtmlElementID: 'ns1blankspaceBusinessContactColumn1',
							xhtmlContext: 'EntityPeople',
							xhtml: aHTML.join(''),
							showMore: (oResponse.morerows == "true"),
							more: oResponse.moreid,
							rows: ns1blankspace.option.defaultRows,
							functionShowRow: nsFreshcare.internal.entity.people.row,
							functionOnNewPage: nsFreshcare.internal.entity.people.newPage,
							type: 'json'
						}); 		
						delete(oParam.response);
						ns1blankspace.render.page.show(oParam);
						//nsFreshcare.internal.entity.people.bind();
					}
				}
			},

			row: function(oRow, oParam)
			{	// v3.1.205 SUP023021 Pending Approval now in different colour
				var aHTML = [];
				var sStatusColumn = $('#ns1blankspaceBusinessContactColumn1').attr('data-statuscolumn');
				var sClass = (oRow[sStatusColumn] == nsFreshcare.data.contactStatusActive) 
							? '' 
							: (oRow[sStatusColumn] == nsFreshcare.data.contactStatusPendingApproval ? ' nsFreshcarePending' : ' nsFreshcareInactive');
				var bCanAddGroup = ns1blankspace.util.getParam(oParam, 'canAddGroup', {'default': false}).value;
				var bCanRemove = ns1blankspace.util.getParam(oParam, 'canRemove', {'default': false}).value;
				var bCanRemoveDirectly = ns1blankspace.util.getParam(oParam, 'canRemoveDirectly', {'default': false}).value;
				var bCanUpdate = ns1blankspace.util.getParam(oParam, 'canUpdate', {'default': false}).value;
				var bCanUpdateDirectly = ns1blankspace.util.getParam(oParam, 'canUpdateDirectly', {'default': false}).value;
				var bCanSetPrimary = ns1blankspace.util.getParam(oParam, 'canSetPrimary', {'default': false}).value;
				var bCanSetPrimaryDirectly = ns1blankspace.util.getParam(oParam, 'canSetPrimaryDirectly', {'default': false}).value;

				ns1blankspace.objectContextData.people.push(oRow);

				aHTML.push('<tr id="ns1blankspaceEntityPeopleRow-' + oRow.id + '" class="nsFreshcareEntityPeopleRow"' +
								((oRow['contactperson.contactbusiness.primarycontactperson'] === oRow.id) ? ' data-primarycontact="1"' : '') +
								((oRow['contactperson.user.id'] != '') ? ' data-userid="' + oRow['contactperson.user.id'] + '"' : '') +
								'>');

				aHTML.push('<td id="ns1blankspaceEntityPeople_firstname-' + oRow.id + '" data-directupdate="' + bCanUpdateDirectly + '"' +
								' class="ns1blankspaceRow ns1blankspaceRowBusinessContact' + sClass + '">' +
								oRow.firstname + 
								((oRow['contactperson.contactbusiness.primarycontactperson'] === oRow.id) 
									? '<br /><span style="font-size:0.75em;color:#A4A4A4;">(Primary contact)</span>'
									: '') + 
								'</td>');

				aHTML.push('<td id="ns1blankspaceEntityPeople_surname-' + oRow.id + '" data-directupdate="' + bCanUpdateDirectly + '"' +
								' class="ns1blankspaceRow ns1blankspaceRowBusinessContact' + sClass + '">' +
								oRow.surname + 
								((oRow['contactperson.user.id'] != '') ? '<br /><span style="font-size:0.75em;color:#A4A4A4;">(User: ' + oRow['contactperson.user.username'] + ')</span>' : '') +
								'</td>');

				aHTML.push('<td id="ns1blankspaceEntityPeople_mobile-' + oRow.id + '" data-directupdate="' + bCanUpdateDirectly + '"' +
								' class="ns1blankspaceRow ns1blankspaceRowBusinessContact' + sClass + '">' +
								oRow.mobile + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityPeople_workphone-' + oRow.id + '" data-directupdate="' + bCanUpdateDirectly + '"' +
								' class="ns1blankspaceRow ns1blankspaceRowBusinessContact' + sClass + '">' +
								oRow.workphone + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityPeople_email-' + oRow.id + '" data-directupdate="' + bCanUpdateDirectly + '"' +
								' class="ns1blankspaceRow ns1blankspaceRowBusinessContact' + sClass + '">' +
								oRow.email + '</td>');

				if (oParam.showGroups === true)
				{
					aHTML.push('<td id="ns1blankspaceEntityPeople_groups-' + oRow.id + '" class="ns1blankspaceRow' + sClass + '"' +
									' style="font-size:0.75em;color:#A4A4A4;">' +
									ns1blankspace.xhtml.loadingSmall + '</td>');
				}

				aHTML.push('<td id="ns1blankspaceEntityPeople_select-' + oRow.id + '" class="ns1blankspaceRow">');
				
				if (bCanAddGroup)
				{
					aHTML.push('<span class="ns1blankspaceBusinessContactGroupAdd" id="ns1blankspaceBusinessContactGroupAdd-' + oRow.id + '"' +
											' data-rowid="' + oRow.id + '"></span>');
				}

				if ((bCanRemove || bCanSetPrimary) 
					&& oRow['contactperson.contactbusiness.primarycontactperson'] != oRow.id)		// Can't remove primary contact 
				{
					if (bCanRemove)
					{
						if (nsFreshcare.user.role.toLowerCase() == 'admin'
							|| (nsFreshcare.user.role.toLowerCase() != 'admin' && oRow[sStatusColumn] != nsFreshcare.data.contactStatusInactive))
						{
							aHTML.push('<span class="ns1blankspaceBusinessContactRemove" id="ns1blankspaceBusinessContactRemove-' + oRow.id + '"' +
												' data-rowid="' + oRow.id + '"' +
												' data-directupdate="' + bCanRemoveDirectly + '"' +
												'></span>');
						}
						else
						{
							aHTML.push('<span class="ns1blankspaceBusinessContactReactivate" id="ns1blankspaceBusinessContactReactivate-' + oRow.id + '"' +
												' data-rowid="' + oRow.id + '"' +
												'></span>');
						}
					}

					if (bCanSetPrimary)
					{	// v3.1.205 SUP023015 Can only set Primary Contatct if Active 
						if (oRow[sStatusColumn] == nsFreshcare.data.contactStatusActive)
						{
							aHTML.push('<span class="ns1blankspaceBusinessContactPrimary" id="ns1blankspaceBusinessContactPrimary-' + oRow.id + '"' +
												' data-rowid="' + oRow.id + '"' +
												' data-contactbusiness="' + ns1blankspace.objectContext + '"' +
												' data-primarycontact="' + oRow['contactperson.contactbusiness.primarycontactperson'] + '"' +
												' data-directupdate="' + bCanSetPrimaryDirectly + '"' +
												'></span>');
						}
					}
				}
				//else
				//{
				//	aHTML.push('<td id="ns1blankspaceEntityPeople_select-' + oRow.id + '" class="ns1blankspaceRow">&nbsp;');
				//}

				aHTML.push('</td></tr>');

				return aHTML.join('');
			},

			newPage: function(oParam)
			{
				var bShowGroups = ns1blankspace.util.getParam(oParam, 'showGroups', {'default': false}).value;
				var bShowUsers = ns1blankspace.util.getParam(oParam, 'showUsers', {'default': false}).value;
				// oParam.newPageStep = (oParam.newPageStep == undefined) ? 1 : oParam.newPageStep;
				var bShowTraining = ns1blankspace.util.getParam(oParam, 'showTrainingCourses', {'default': false}).value;

				if (oParam.newPageStep == undefined)
				{
					oParam.newPageStep = (bShowGroups) ? 1 : ((bShowUsers) ? 2 : 4);
				}

				// Find the person groups this contact has
				if (oParam.newPageStep === 1 && $('.nsFreshcareEntityPeopleRow:visible').length > 0)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_GROUP_SEARCH';
					oSearch.addField('contactperson,group,grouptext');
					oSearch.addFilter('contactperson', 'IN_LIST', $.map($('.nsFreshcareEntityPeopleRow:visible'), function(x) {return x.id.split('-').pop()}).join(','));
					oSearch.addFilter('grouptext', 'IS_NOT_NULL');		// v3.1.1 added to prevent blank rows from showing
					oSearch.rows = 200;			// v3.1.205 SUP022917 Was only finding first 20 and consequently not getting all groups
					oSearch.sort('contactperson', 'asc');
					oSearch.sort('grouptext', 'asc');
					oSearch.getResults(function(oResponse) 
					{
						if (oResponse.status === 'OK')
						{
							oParam.personGroups = oResponse.data.rows;
							oParam.users = [];
							oParam.newPageStep = (bShowUsers) ? 3 : 3;
							oParam.users = (bShowUsers) ? undefined : [];
							
							// v3.1.1 SUP022434 Put list of Groups onto each person's row
							ns1blankspace.objectContextData.people = $.map(ns1blankspace.objectContextData.people, function(oPerson)
							{
								if (oPerson.groups === undefined)
								{
									oPerson.groups = $.grep(oResponse.data.rows, function(x) {return x.contactperson === oPerson.id});
								}
								return oPerson;
							});
							nsFreshcare.internal.entity.people.newPage(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find groups: ' + oResponse.error.errornotes);
						}
					});
				}
				// Find the contacts who also have user accounts
				else if (oParam.newPageStep === 2)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_USER_SEARCH';
					oSearch.addField('username,contactperson');
					oSearch.addFilter('contactperson', 'IN_LIST', $.map($('.nsFreshcareEntityPeopleRow:visible'), function(x) {return x.id.split('-').pop()}).join(','));
					oSearch.sort('contactperson', 'asc');
					oSearch.getResults(function(oResponse) 
					{
						if (oResponse.status === 'OK')
						{
							oParam.users = oResponse.data.rows;
							oParam.newPageStep = 3;
							nsFreshcare.internal.entity.people.newPage(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find users: ' + oResponse.error.errornotes);
						}
					});
				}
				// indicate the person groups and the contacts who are users on each row where applicable
				else if (oParam.newPageStep === 3)
				{
					$.each($('.nsFreshcareEntityPeopleRow:visible'), function(i, oRowElement)
					{
						var sThisPerson = oRowElement.id.split('-').pop();
						var oGroups = $.grep(oParam.personGroups, function(x) {return x.contactperson === sThisPerson});
						var aGroupText = [];
						var sUserText = '';

						// Indicate if person is linked to a user record.
						if (oParam.users && oParam.users.length > 0)
						{
							sUserText = $.map($.grep(oParam.users, function(x) {return x.contactperson === sThisPerson}),
												function(y) {return y.username.formatXHTML()});
							if (sUserText != '')
							{
								$('#ns1blankspaceEntityPeople_surname-' + sThisPerson).html($('#ns1blankspaceEntityPeople_surname-' + sThisPerson).html() + 	
																	'<br /><span style="font-size:0.75em;color:#A4A4A4;">(User: ' + sUserText + ')</span>')
							}
						}

						$.each(oGroups, function()
						{
							var sOptionsText = $('#ns1blankspaceEntityPeople_select-' + sThisPerson).html();
							// Check if a reviewer and not already a user and add 'Create User' button
							if (nsFreshcare.data.groupReviewer && this.group === nsFreshcare.data.groupReviewer[0])
							{
								if ($(oRowElement).attr('data-userid') === undefined)
								{
									$('#ns1blankspaceEntityPeople_select-' + sThisPerson).html(sOptionsText +
												'<span class="ns1blankspaceBusinessContactCreateUser" id="ns1blankspaceBusinessContactCreateUser-' + sThisPerson + '"' +
													' data-rowid="' + sThisPerson + '">Create User</span>');
								}
							}

							// v3.1.1 SUP022434 wasn't showing remove group because binds only visible elements
							aGroupText.push('<div id="nsFreshcareEntityPeopleGroupsDiv-' + this.id + '" class="nsFreshcareEntityPeopleGroupsDiv" data-id="' + this.id + '">' +
												'<span data-id="' + this.id + '">' + this.grouptext + '</span>&nbsp;' +
												((oParam.canAddGroup === true)
													?'<span class="nsFreshcareEntityPeopleGroupsRemove"' +
													 ' data-id="' + this.id + '"' +
													 ' id="nsFreshcareEntityPeopleGroupRemove-' + this.id + '"></span>'
													: '') +
											'</div>');
						});

						if (aGroupText.length > 0)
						{
							$('#ns1blankspaceEntityPeople_groups-' + sThisPerson)
								.html(aGroupText.join('<br />'));
							$('#ns1blankspaceBusinessContactGroupAdd-' + sThisPerson).attr('data-groups', $.map(oGroups, function(x) {return x.id}).join(','));
						}
						else
						{
							$('#ns1blankspaceEntityPeople_groups-' + sThisPerson).html('');
						}
					});
					oParam.newPageStep = (bShowTraining) ? 4 : 5;
					nsFreshcare.internal.entity.people.newPage(oParam);
				}

				// v3.1.0 Get most recent training course for each contact & Membership
				else if (oParam.newPageStep === 4)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
					oSearch.addField('agritrainingcourseattendee.course.title,agritrainingcourseattendee.course.coursedate,agritrainingcourseattendee.course.location,' +
									'agritrainingcourseattendee.course.package.codeofpracticetext,agritrainingcourseattendee.course.package.membership,traineecontactperson,' +
									'agritrainingcourseattendee.course.id');
					oSearch.addFilter('traineecontactperson', 'IN_LIST', $.map($('.nsFreshcareEntityPeopleRow:visible'), function(x) {return x.id.split('-').pop()}).join(','));
					oSearch.sort('traineecontactperson', 'asc');
					oSearch.sort('agritrainingcourseattendee.course.package.membership', 'asc');
					oSearch.sort('agritrainingcourseattendee.course.coursedate', 'desc');
					oSearch.rows = 50
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							$.each(ns1blankspace.objectContextData.people, function()
							{
								var aMembershipCourses = [];
								var iPerson = this.id;
								$.each(oResponse.data.rows, function()
								{	// Add a row to aMembershipCourses if row for this membership & person doesn't already exist
									var oThisRow = this;
									if (oThisRow.traineecontactperson == iPerson)
									{
										if ($.grep(aMembershipCourses, function(x) {return x['agritrainingcourseattendee.course.package.membership'] === oThisRow['agritrainingcourseattendee.course.package.membership']}).length == 0)
										{
											aMembershipCourses.push(oThisRow);
										}
									}
								});

								// Now add aMembershipCourses as an object on the corresponding people row
								ns1blankspace.objectContextData.people = $.map(ns1blankspace.objectContextData.people, function(x) {x.trainingCourses = aMembershipCourses; return x;});
							});

							oParam.newPageStep = 5;
							nsFreshcare.internal.entity.people.newPage(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find training courses: ' + oResponse.error.errornotes);
						}
					});

				}
				else
				{
					delete(oParam.newPageStep);
					nsFreshcare.internal.entity.people.bind(oParam);
				}
			},

			bind: function(oParam)
			{
				// v3.1.0i SUP022250 Now binds only visible elements
				// v3.1.1 visible elements weren't working as often hidden to start with. Now using xhtmlContainerID
				var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID', {"default": 'ns1blankspaceRenderPage_Action-0'}).value;
				var bCanUpdate = ns1blankspace.util.getParam(oParam, 'canUpdate', {'default': true}).value;
				var bCanAdd = ns1blankspace.util.getParam(oParam, 'canAdd', {'default': true}).value;

				$('#' + sXHTMLContainerID + ' .ns1blankspaceHeaderSort')
					.on('click', function(event)
					{
						$.extend(true, oParam, 
						{
							xhtmlElementID: 'ns1blankspaceMainContacts',
							sortColumn: $(this).attr('data-column'),
							sortDirection: $(this).attr('data-sortdirection')
						});

						$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
						$('#ns1blankspaceMainContacts').attr('data-loading', '1');
						nsFreshcare.internal.entity.people.show(oParam);
					})
					.css('cursor', 'pointer')

				// When click on row, shows Contact details (and can edit) below.
				$('#' + sXHTMLContainerID + ' .ns1blankspaceRowBusinessContact').click(function(event) 
				{
					var sContactId = this.id.split('-').pop();
					var oThisContact = $.grep(ns1blankspace.objectContextData.people, function(a) {return a.id == sContactId}).shift();
					var sFunctionDetails = $('#ns1blankspaceBusinessContactColumn1').attr('functionDetails');
					var fFunctionDetails = ($.type(sFunctionDetails) === 'string') 
											? ns1blankspace.util.toFunction(sFunctionDetails, nsFreshcare) 
											: nsFreshcare.internal.entity.people.details;
					var sFunctionSave = $('#ns1blankspaceBusinessContactColumn1').attr('functionSave');
					var fFunctionSave = ($.type(sFunctionDetails) === 'string') 
											? ns1blankspace.util.toFunction(sFunctionSave, nsFreshcare) 
											: nsFreshcare.internal.entity.people.save.send;

					// Set nsFreshcare.internal.entity.people.inputDetected to current value in case user has updated other tabs - we then reset it on Save
					nsFreshcare.internal.entity.people.inputDetected = ns1blankspace.inputDetected;

					$.extend(true, oParam,
					{
						newPerson: false, 
						rowID: sContactId,
						functionSave: fFunctionSave,
						primaryContact: (($(this).parent().attr('data-primarycontact') === '1') ? sContactId : undefined)
					});
					nsFreshcare.internal.entity.people.manage(oParam);

					if (oThisContact) 
					{ 
						$.extend(true, oParam,
						{
							xhtmlElementEditID: 'ns1blankspaceEntityPeopleRow2',
							thisContact: oThisContact,
							functionSave: fFunctionSave
						});

						fFunctionDetails(oParam);
					}
					else 
					{
						$('#ns1blankspaceEntityPeopleRow2').html('Contact details not found.');
					}
				})
				.css('cursor', 'pointer');

				// User can remvoe contact
				$('#' + sXHTMLContainerID + ' .ns1blankspaceBusinessContactRemove')
					.button(
					{
						text: false,
						label: ((nsFreshcare.user.role.toLowerCase() === 'admin') ? 'Remove' : 'Inactivate'),
						icons: {primary: "ui-icon-close"}
					})
					.click(function(event) 
					{
						var iRowID = ($(this).attr("data-rowid")) ? $(this).attr("data-rowid") : 'New';

						if ($('#ns1blankspaceEntityPeopleRow-' + iRowID).attr('data-userid'))
						{
							ns1blankspace.container.confirm({html: 'This contact is linked to a user record and cannot be removed.'});
						}
						else if ($('#ns1blankspaceEntityPeopleRow-' + iRowID).attr('data-primarycontact'))
						{
							ns1blankspace.container.confirm({html: 'Primary contact cannot be removed.'});
						}
						else
						{	// We remove if admin, otherwise, just inactivate 
							$.extend(true, oParam,
							{
								rowID: iRowID, 
								xhtmlElementClickID: this.id,
								clickContext: 'ContactInactivate',
								clickTitle: ((nsFreshcare.user.role.toLowerCase() === 'admin') ? 'Remove' : 'Inactivate'),
								clickBind: ((nsFreshcare.user.role.toLowerCase() === 'admin') 
												? nsFreshcare.internal.entity.people.remove.validate 
												: nsFreshcare.internal.entity.people.remove.setContactStatus),
								newStatus: nsFreshcare.data.contactStatusInactive,
								newStatusText: 'Inactivated',
								confirmed: true, 
								onComplete: ((nsFreshcare.user.role.toLowerCase() === 'admin') ? nsFreshcare.internal.entity.people.remove.send : undefined)
							});
							
							nsFreshcare.util.rowFunction(oParam);
						}
					})
					.css('width', '20px')
					.css('height', '20px');
					
				// v3.1.205 SUP023021 User can reactivate contact
				$('#' + sXHTMLContainerID + ' .ns1blankspaceBusinessContactReactivate')
					.button(
					{
						text: false,
						label: 'Reactivate',
						icons: {primary: "ui-icon-check"}
					})
					.click(function(event) 
					{
						var iRowID = ($(this).attr("data-rowid")) ? $(this).attr("data-rowid") : 'New';

						$.extend(true, oParam,
						{
							rowID: iRowID, 
							xhtmlElementClickID: this.id,
							clickContext: 'ContactReactivate',
							clickTitle: 'Reactivate',
							clickBind: nsFreshcare.internal.entity.people.remove.setContactStatus,
							newStatus: nsFreshcare.data.contactStatusActive,
							newStatusText: 'Reactived',
							confirmed: true
						});
						
						nsFreshcare.util.rowFunction(oParam);
					})
					.css('width', '20px')
					.css('height', '20px');
					
				// User can set primary contact
				$('#' + sXHTMLContainerID + ' .ns1blankspaceBusinessContactPrimary')
					.button(
					{
						text: false,
						label: 'Set as Primary Contact',
						icons: {primary: "ui-icon-person"}
					})
					.click(function(event) 
					{
						var iRowID = ($(this).attr("data-rowid")) ? $(this).attr("data-rowid") : 'New';
							
						$.extend(true, oParam,
						{
							rowID: iRowID, 
							xhtmlElementClickID: this.id,
							clickContext: 'ContactSetPrimary',
							clickTitle: 'Set as Primary Contact',
							clickBind: nsFreshcare.internal.entity.people.primary.validate,
							pageObject: $('#ns1blankspaceBusinessContactColumn1').attr('data-pageobject')
						});
						nsFreshcare.util.rowFunction(oParam);
					})
					.css('width', '20px')
					.css('height', '20px');
					
				// User can add a new contact
				if (bCanAdd)
				{
					$('#ns1blankspaceBusinessContactAdd')
						.button(
						{
							text: false,
							label: 'Add Contact',
							icons: {primary: "ui-icon-plus"}
						})
						.click(function() 
						{
							oParam.add = true;
							delete(oParam.thisContact);
							nsFreshcare.internal.entity.people.manage(oParam);

							if ($('#ns1blankspaceEntityPeopleActionContainer').children().length > 0) 
							{
								oParam.xhtmlElementEditID =  "ns1blankspaceEntityPeopleRow2";
								nsFreshcare.internal.entity.people.details(oParam);
							}
						})
						.css('width', '20px')
						.css('height', '20px');
				}

				// Show contact's groups
				$('#' + sXHTMLContainerID + ' .nsFreshcareEntityPeopleGroupsDiv')
					.hover(
						function()
						{
							if (!$('#nsFreshcareEntityPeopleGroupRemove-' + $(this).attr('data-id')).is(':visible'))
							{
								$('#nsFreshcareEntityPeopleGroupRemove-' + $(this).attr('data-id')).show();
							}
						},
						function()
						{
							$('#nsFreshcareEntityPeopleGroupRemove-' + $(this).attr('data-id')).hide();
						}
					);

				// Remove Group
				$('#' + sXHTMLContainerID + ' .nsFreshcareEntityPeopleGroupsRemove')
					.button(
					{
						label: 'x'
					})
					.css('width', '8px')
					.css('height', '8px')
					.css('margin', '0px')
					.on('click', function()
					{
						var sPersonId = $(this).parent().parent().parent().attr('id').split('-').pop();
						$.extend(true, oParam, 
						{
							groupID: $(this).attr('data-id'), 
							personID: sPersonId
						});
						nsFreshcare.internal.entity.people.group.remove(oParam);
					}).each(function()
					{
						$.each($(this).children(), function()
						{
							if ($(this).hasClass('ui-button-text'))
							{
								$(this)
									.css('padding', '0px')
									.css('line-height', '0.75em')
							}	
						});
						$(this).hide();
					});

				// Add Group
				$('#' + sXHTMLContainerID + ' .ns1blankspaceBusinessContactGroupAdd')
					.button(
					{
						text: false,
						label: 'Add Group',
						icons: {primary: 'ui-icon-link'}
					})
					.css('width', '20px')
					.css('height', '20px')
					.on('click', function()
					{
						oParam.xhtmlElementGroupID = this.id;
						nsFreshcare.internal.entity.people.group.add.show(oParam);
					});

				// Create user
				$('#' + sXHTMLContainerID + ' .ns1blankspaceBusinessContactCreateUser')
					.button(
					{
						text: false,
						label: 'Create Reviewer user',
						icons: {primary: 'ui-icon-circle-plus'}
					})
					.on('click', function()
					{
						var oRowId = this.id.split('-').pop();

						// First check if we have a mobile & email address
						if ($('#ns1blankspaceEntityPeople_mobile-' + oRowId).html() === '' ||
							$('#ns1blankspaceEntityPeople_email-' + oRowId).html() === '')
						{
							ns1blankspace.container.confirm({html: 'Users must have an email address and a mobile number. Please add these before creating the user.'});
						}
						else
						{
							$.extend(true, oParam,
							{
								xhtmlElementUserID: this.id,
								contactBusiness: ns1blankspace.objectContext,
								contactPerson: oRowId,
								customUserName: true,
								role: 'Reviewer',
								onComplete: nsFreshcare.internal.entity.people.search
							});
							nsFreshcare.internal.entity.user.add.show(oParam);
						}
					})
					.css('width', '20px')
					.css('height', '20px');
			},

			group:
			{
				remove: function(oParam)
				{
					var sID = ns1blankspace.util.getParam(oParam, 'groupID').value;
					var sThisPerson = ns1blankspace.util.getParam(oParam, 'personID').value;

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_PERSON_GROUP_MANAGE'),
						data: 'remove=1&id=' + sID,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								var sGroups = $('#ns1blankspaceBusinessContactGroupAdd-' + sThisPerson).attr('data-groups');
								sGroups = $.grep(sGroups.split(','), function(x) {return x != sID}).join(',');

								$('#ns1blankspaceBusinessContactGroupAdd-' + sThisPerson).attr('data-groups', sGroups);
								$('#nsFreshcareEntityPeopleGroupsDiv-' + sID).remove();
							}
							else
							{
								ns1blankspace.status.error('Unable to remove Person Group: ' + oResponse.status.error);
							}
						}
					});
				},

				add:
				{
					show: function(oParam)
					{
						var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementGroupID').value;
						var sCurrentGroups = $('#' + sXHTMLElementID).attr('data-groups');

						if (ns1blankspace.xhtml.divID === sXHTMLElementID) 
						{
							$(ns1blankspace.xhtml.container).html('');
							$(ns1blankspace.xhtml.container).hide();
							ns1blankspace.xhtml.divID = '';
						}
						else 
						{
							ns1blankspace.xhtml.divID = sXHTMLElementID;

							var iRowID = $('#' + sXHTMLElementID).attr("data-rowid");
							
							var aHTML = [];

							aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
										'<td id="ns1blankspaceContactAddGroup_' + iRowID + '" class="ns1blankspaceSearch"' +
											'data-elementid="' + sXHTMLElementID + '">' + ns1blankspace.xhtml.loadingSmall + '</td>' +
										'</tr></table>');

							$(ns1blankspace.xhtml.container).html(aHTML.join(''));
							$(ns1blankspace.xhtml.container).show();
							$(ns1blankspace.xhtml.container).offset(
							{ 
								top: $('#' + ns1blankspace.xhtml.divID).offset().top,
								left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
							});

							nsFreshcare.internal.entity.people.group.add.search({currentGroups: sCurrentGroups, xhtmlContainerID: 'ns1blankspaceContactAddGroup_' + iRowID});
						}

					},

					search: function(oParam)
					{
						var sCurrentGroups = ns1blankspace.util.getParam(oParam, 'currentGroups', {'default': ''}).value;
						var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID').value;
						var sContactPersonId = sXHTMLContainerID.split('_').pop();

						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_CONTACT_PERSON_GROUP_TYPE_SEARCH';
						oSearch.addField('title');
						if (sCurrentGroups != '')
						{
							oSearch.addFilter('id', 'NOT_IN_LIST', sCurrentGroups);
						}
						oSearch.rows = 50;
						oSearch.sort('title', 'asc');
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								var aHTML = [];

								aHTML.push('<table><tr>');

								$.each(oResponse.data.rows, function()
								{
									aHTML.push('<tr><td id="nsFreshcareEntityPeopleGroupAdd-' + this.id + '"' +
													' class="nsFreshcareEntityPeopleGroupAddGroup"' +
													' data-id="' + this.id + '">' + 
												this.title.formatXHTML() + '</td></tr>');
								});
								aHTML.push('</tr></table>');

								$('#' + sXHTMLContainerID).html(aHTML.join('')); 

								$('.nsFreshcareEntityPeopleGroupAddGroup')
									.on('click', function()
									{
										var oThisElement = this;
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('CONTACT_PERSON_GROUP_MANAGE'),
											data: 'contactperson=' + sContactPersonId + '&group=' + $(this).attr('data-id'),
											success: function(oResponse)
											{
												if (oResponse.status === 'OK')
												{
													var sGroupDiv = '<div id="nsFreshcareEntityPeopleGroupsDiv-' + oResponse.id + '"' +
																		' class="nsFreshcareEntityPeopleGroupsDiv" data-id="' + oResponse.id + '"' +
																		' style="font-size: 0.75em;">' +
																	'<span data-id="' + oResponse.id + '">' + $(oThisElement).html() + '</span>' +
																	'<span class="nsFreshcareEntityPeopleGroupsRemove" data-id="' + oResponse.id + '"></span>' +
																'</div>';
													$('#ns1blankspaceEntityPeople_groups-' + sContactPersonId)
														.html($('#ns1blankspaceEntityPeople_groups-' + sContactPersonId).html() + '<br />' + sGroupDiv);
												}
												else
												{
													ns1blankspace.status.error('Unable to add group: ' + oResponse.error.errornotes);
												}
											}
										});
									});
							}
						});
					}
				}
			},

			manage: function(oParam)
			{
				// v3.1.2 SUP022859 Now responds toc canUpate, canAdd & showGoTo
				var bContinue = true;
				var sRowID = ns1blankspace.util.getParam(oParam, 'rowID').value;
				var bAdd = ns1blankspace.util.getParam(oParam, 'add').value;
				if (bAdd == undefined) {bAdd = ns1blankspace.util.getParam(oParam, 'canAdd', {"default": false}).value;}
				var bGoTo = ns1blankspace.util.getParam(oParam, 'showGoTo', {"default": true}).value;
				var bUpdate = ns1blankspace.util.getParam(oParam, 'canUpdate', {"default": true}).value;
				var fFunctionDetails = ns1blankspace.util.getParam(oParam, 'functionDetails').value;
				var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {'default': nsFreshcare.internal.entity.people.save.send}).value;

				// Work out if we scrap what's there already. If they're already adding a new one, don't do anything, otherwise, start again
				if ($('#ns1blankspaceEntityPeopleActionContainer').is('*')) 
				{
					if ($('#ns1blankspaceEntityPeopleContactBusiness').attr('data-id') === '-1')
					{
						if (!bAdd) 
						{		// We were adding and now we've decided to view an existing one
							bContinue = confirm("Are you sure you want to cancel adding the Person?");
						}
						else 
						{		// We were adding and now have clicked Add Person again - remove the row (essentially cancel)
							$('#ns1blankspaceEntityPeopleActionContainer').remove();
							bContinue = false;
						}
					}
					else 
					{
						$('#ns1blankspaceEntityPeopleActionContainer').remove();
						bContinue = false;
					}
				}  

				if (bContinue) 
				{
					var aHTML = [];

					aHTML.push('<tr id="ns1blankspaceEntityPeopleActionContainer">' +
									'<td id="ns1blankspaceEntityPeopleActionManage"' +
										' colspan="' + $('#ns1blankspaceEntityPeopleTable').children().children().first().children().length + '">');
					aHTML.push('<table id="ns1blankspaceEntityPeopleManage" class="ns1blankspaceContainer nsFreshcareDetails ns1blankspaceBorder" style="border-width:3px;">');

					aHTML.push('<tr>' + 
								'<td id="ns1blankspaceEntityPeopleRow1" class="ns1blankspaceColumn1" style="width:50%;"></td></tr>' +
								'<tr><td id="ns1blankspaceEntityPeopleRow2" class="ns1blankspaceColumn1" style="width:50%;"></td>' +
								'</tr>');

					aHTML.push('</table>');
					aHTML.push('</td></tr>');

					if (bAdd) 
					{
						$('#ns1blankspaceEntityPeopleTable').children().children().first().after(aHTML.join(''));
					}
					else 
					{
						$('#ns1blankspaceEntityPeopleRow-' + sRowID).after(aHTML.join(''));
					}

					// Row 1 contains the header & the Save button
					aHTML = [];

					aHTML.push('<table class="ns1blankspace"><tr>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption"><strong>Contact Details</strong></td>');
					aHTML.push('<td style="text-align: right;" class="ns1blankspaceHeaderCaption">' +
									((sRowID) 
										? '<span id="ns1blankspaceEntityPeopleGoTo" class="ns1blankspaceAction"' +
										  ' data-id="' + sRowID + '"' +
										  '>&nbsp;</span>&nbsp;&nbsp;'
										: '') +
									'<span id="ns1blankspaceEntityPeopleSave" class="ns1blankspaceAction"' +
									((sRowID) ? ' data-id="' + sRowID + '"' : '') +
									'>&nbsp;</span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceEntityPeopleRow1').html(aHTML.join(''));

					if (bUpdate)
					{
						$('#ns1blankspaceEntityPeopleSave')
							.button(
							{
								label: 'Save',
								icons: {primary: 'ui-icon-disk'}
							})
							.click(function(event) 
							{
								$.extend(true, oParam,
								{
									onComplete: nsFreshcare.internal.entity.people.show, 
									refresh: true, 
									id: $(this).attr('data-id')
								});
								fFunctionSave(oParam);
							});
					}

					if (bGoTo)
					{
						$('#ns1blankspaceEntityPeopleGoTo')
							.button(
							{
								label: 'Go To Person',
								icons: {primary: 'ui-icon-play'}
							})
							.on('click', function()
							{
								nsFreshcare.admin.contactPerson.init({id: sRowID});
							});
					}
				}
			},

			details: function(oParam)
			{
				// v3.1.2 SUP022859 Now responds to canUpate, canAdd & showGoTo
				var aHTML = [];
				var sXHTMLElementEditID = ns1blankspace.util.getParam(oParam, 'xhtmlElementEditID', {"default": ''}).value;
				var bUpdate = ns1blankspace.util.getParam(oParam, 'canUpdate', {"default": true}).value;
				var oThisContact = ns1blankspace.util.getParam(oParam, 'thisContact').value;
				var sStatusColumn = $('#ns1blankspaceBusinessContactColumn1').attr('data-statuscolumn');
				var iPersonGroup = ns1blankspace.util.getParam(oParam, 'group').value;
				var bShowGroups = ns1blankspace.util.getParam(oParam, 'showGroups', {'default': false}).value;
				var bHasReference = (oThisContact && bShowGroups && $.grep(oThisContact.groups, function(x) {return x.group == nsFreshcare.data.groupTrainer}).length > 0) ? true : false;

				aHTML = [];

				aHTML.push('<table class="ns1blankspace">');

				// Row for storing contactbusinessid
				aHTML.push('<tr class="ns1blankspace" style="display:none;">' +
								'<td id="ns1blankspaceBusinessContactId" class="nsFreshcareReadOnly" style="width:50%;"' +
								((iPersonGroup) ? ' data-persongroup="' + iPersonGroup + '"' : '') +  
								'>' +
								'</td>' +
								'<td style="width:50%;"></td></tr>');		

				if (bHasReference)
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption" width="50%">' +
									'Trainer ID' +
									'</td><td class="ns1blankspaceCaption">&nbsp;</td>' +
								'</tr>');
					
					aHTML.push('<tr class="ns1blankspace"><td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceBusinessContactReference" class="ns1blankspaceText"' +
										' data-caption="Trainer ID" tabindex="5">' +
									'</td>' +
									'<td class="ns1blankspaceText">&nbsp;' +
									'</td></tr>');			
				}

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption" width="50%">' +
								'Title' +
								'</td><td class="ns1blankspaceCaption">' +
								'<span style="valign:bottom;padding-right:50px;">Street Address</span>&nbsp;' +
								'<span id="ns1blankspaceContactCopyStreetAddressFromBusiness"' +
									' style="text-align:right;font-size:0.625em;" class="ns1blankspaceAction">&nbsp;</span>' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace"><td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactTitle" class="ns1blankspaceSelect"' +
									' data-caption="Title" tabindex="10"' +
									' data-method="SETUP_CONTACT_TITLE_SEARCH">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactStreetAddress1" class="ns1blankspaceText"' +
									' data-caption="Street Address 1" tabindex="210">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'First Name' +
								'</td><td class="ns1blankspaceCaption">' +
								'&nbsp;' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactFirstName" class="ns1blankspaceText"' +
									' data-caption="First Name" tabindex="12">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactStreetAddress2" class="ns1blankspaceText"' +
									' data-caption="Street Address 2" tabindex="220">' +
								'</td></tr>');		

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Surname' +
								'</td><td class="ns1blankspaceCaption">' +
								'Suburb / State / Post Code' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactSurname" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Surname" tabindex="30">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactStreetSuburb" class="ns1blankspaceText ns1blankspaceSelectAddress"' +
									' style="width:50%;" tabindex="230"' +
									' data-suburbCase="upper"' +
									' data-caption="Street Suburb">&nbsp;' +
								'<input id="ns1blankspaceBusinessContactStreetState" class="ns1blankspaceText"' +
									' style="width:15%;" tabindex="233"' +
									' data-caption="Street State">&nbsp;' +
								'<input id="ns1blankspaceBusinessContactStreetPostCode" class="ns1blankspaceText"' +
									' style="width:25%;" tabindex="235"' +
									' data-caption="Street Post Code">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Position' +
								'</td><td class="ns1blankspaceCaption">' +
								'Country' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactPosition" class="ns1blankspaceText"' +
									' data-caption="Position" tabindex="40">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactStreetCountry" class="ns1blankspaceText"' +
									' data-caption="Street Country" tabindex="240">' +
								'</td></tr>');		

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Gender' +
								'</td>' +
								'<td class="ns1blankspaceCaption">&nbsp' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactGender" class="ns1blankspaceSelect"' +
									' data-caption="Gender" tabindex="45"' +
									' data-method="SETUP_CONTACT_PERSON_GENDER_SEARCH">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'</td><td>&nbsp;</td>' +
								'</tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'<span style="valign:bottom;padding-right:120px;">Phone</span>&nbsp;' +
								'<span style="padding-right:15px;">&nbsp;</span>' +
								'<span id="ns1blankspaceContactCopyPhoneFromBusiness"' +
									' style="text-align:right;font-size:0.625em;" class="ns1blankspaceAction">&nbsp;</span>' +
								'</td>' +
								'<td class="ns1blankspaceCaption">' +
								'<span style="vertical-align:bottom;padding-right:40px;">Mailing Address</span>&nbsp;' +
								'<span id="ns1blankspaceContactCopyMailingAddressFromBusiness"' +
									' style="text-align:right;font-size:0.625em;" class="ns1blankspaceAction">&nbsp;</span>' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactPhone" class="ns1blankspaceText"' +
									'data-caption="Phone" tabindex="50">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactMailingAddress1" class="ns1blankspaceText"' +
									' data-caption="Mailing Address 1" tabindex="260">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Mobile' +
								'</td>' +
								'<td class="ns1blankspaceCaption">' +
								'&nbsp;' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactMobile" class="ns1blankspaceText"' +
									' data-caption="Mobile" tabindex="60">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactMailingAddress2" class="ns1blankspaceText"' +
									' data-caption="Mailing Address 2" tabindex="270">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'<span style="vertical-align:bottom;padding-right:120px;">Fax</span>&nbsp;' +
								'<span style="padding-right:37px;">&nbsp;</span>' +
								'<span id="ns1blankspaceContactCopyFaxFromBusiness"' +
									' style="text-align:right;font-size:0.625em;" class="ns1blankspaceAction">&nbsp;</span>' +
								'</td>' +
								'<td class="ns1blankspaceCaption">' +
								'Suburb / State / Post Code' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactFax" class="ns1blankspaceText"' +
									' data-caption="Fax" tabindex="70">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactMailingSuburb" class="ns1blankspaceText ns1blankspaceSelectAddress"' +
									' style="width:50%;"  tabindex="280"' +
									' data-suburbCase="upper"' +
									' data-caption="Mailing Suburb">&nbsp;' +
								'<input id="ns1blankspaceBusinessContactMailingState" class="ns1blankspaceText"' +
									' style="width:15%;" tabindex="283"' +
									' data-caption="Mailing State">&nbsp;' +
								'<input id="ns1blankspaceBusinessContactMailingPostCode" class="ns1blankspaceText"' +
									' style="width:25%;" tabindex="285"' +
									' data-caption="Mailing Post Code">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'<span style="vertical-align:bottom;padding-right:120px;">Email</span>&nbsp;' +
								'<span style="padding-right:20px;">&nbsp;</span>' +
								'<span id="ns1blankspaceContactCopyEmailFromBusiness"' +
									' style="text-align:right;font-size:0.625em;" class="ns1blankspaceAction">&nbsp;</span>' +
								'</td>' +
								'<td class="ns1blankspaceCaption">' +
								'Country' +
								'</td></tr>');
				
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactEmail" class="ns1blankspaceText"' +
									' data-caption="Email" tabindex="80">' +
								'</td>' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactMailingCountry" class="ns1blankspaceText"' +
									' data-caption="Mailing Country" tabindex="290">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideNonAdmin">' +
								'<td class="ns1blankspaceCaption">' +
								'Status' +
								'</td>' +
								'<td class="ns1blankspaceCaption">' +
								(oParam.showTrainingCourses === true ? 'Recent Training Courses' : '&nbsp;') +
								'</td></tr>');								

				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideNonAdmin">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceBusinessContactStatus" class="ns1blankspaceSelect"' +
									' data-caption="Status" tabindex="90" data-statuscolumn="' + sStatusColumn + '"' +
									' data-method="SETUP_CONTACT_STATUS_SEARCH">' +
								'</td>' +
								'<td class="ns1blankspaceText');

				if (oParam.showTrainingCourses === true)
				{
					aHTML.push(' nsFreshcareReadOnly" id="ns1blankspaceBusinessContactTrainingCourses">');
				}
				else {aHTML.push('">&nbsp;')}

				aHTML.push('</td></tr>');

				aHTML.push('</table>');

				$('#' + sXHTMLElementEditID).html(aHTML.join(''));

				if (nsFreshcare.user.role.toLowerCase() !== 'admin')
				{
					$('.ns1blankspaceHideNonAdmin').hide();
				}

				// v3.1.2 SUP022859 Disable all fields and buttons if readOnly
				if (!bUpdate)
				{
					$('#' + sXHTMLElementEditID + ' input').attr('disabled', true).addClass('nsFreshcareDisabled');
				}
				else
				{
					// Bind the 'Copy from Business' buttons
					$('#ns1blankspaceContactCopyPhoneFromBusiness')
						.button(
						{
							label: 'Copy from Business'
						})
						.on('click', function()
						{	// v3.1.205 if not exisiting, don't update
							if (ns1blankspace.objectContextData['contactbusiness.phonenumber'])
							{$('#ns1blankspaceBusinessContactPhone').val(ns1blankspace.objectContextData['contactbusiness.phonenumber'].formatXHTML());}
						});

					$('#ns1blankspaceContactCopyFaxFromBusiness')
						.button(
						{
							label: 'Copy from Business'
						})
						.on('click', function()
						{	// v3.1.205 if not exisiting, don't update
							if (ns1blankspace.objectContextData['contactbusiness.faxnumber'])
							{$('#ns1blankspaceBusinessContactFax').val(ns1blankspace.objectContextData['contactbusiness.faxnumber'].formatXHTML());}
						});

					$('#ns1blankspaceContactCopyEmailFromBusiness')
						.button(
						{
							label: 'Copy from Business'
						})
						.on('click', function()
						{	// v3.1.205 if not exisiting, don't update
							if (ns1blankspace.objectContextData['contactbusiness.email'])
							{$('#ns1blankspaceBusinessContactEmail').val(ns1blankspace.objectContextData['contactbusiness.email'].formatXHTML());}
						});

					$('#ns1blankspaceContactCopyStreetAddressFromBusiness')
						.button(
						{
							label: 'Copy from Business'
						})
						.on('click', function()
						{
							// v3.1.204 SUP023021 Needs to work for both ECA, Freshcare Growers (with sites) and Freshcare other entities
							var oData = ns1blankspace.objectContextData;
							if (ns1blankspace.objectContextData.sites && ns1blankspace.objectContextData.sites.length > 0)
							{
								oData = $.map(ns1blankspace.objectContextData.sites, function(x) 
								{
									var o = {};
									o['contactbusiness.streetaddress1'] = x.address1;
									o['contactbusiness.streetaddress2'] = x.address2;
									o['contactbusiness.streetsuburb'] = x.addresssuburb;
									o['contactbusiness.streetstate'] = x.addressstate;
									o['contactbusiness.streetpostcode'] = x.addresspostcode;
									o['contactbusiness.streetcountry'] = x.addresscountry;
									return o;
								}).shift();
							}
							else if (oData['contactbusiness.streetaddress1'] == undefined)
							{
								oData['contactbusiness.streetaddress'] = '';
								oData['contactbusiness.streetaddress2'] = '';
								oData['contactbusiness.streetsuburb'] = '';
								oData['contactbusiness.streetstate'] = '';
								oData['contactbusiness.streetpostcode'] = '';
								oData['contactbusiness.streetcountry'] = '';
							}
							$('#ns1blankspaceBusinessContactStreetAddress1').val(oData['contactbusiness.streetaddress1'].formatXHTML());
							$('#ns1blankspaceBusinessContactStreetAddress2').val(oData['contactbusiness.streetaddress2'].formatXHTML());
							$('#ns1blankspaceBusinessContactStreetSuburb').val(oData['contactbusiness.streetsuburb'].formatXHTML());
							$('#ns1blankspaceBusinessContactStreetState').val(oData['contactbusiness.streetstate'].formatXHTML());
							$('#ns1blankspaceBusinessContactStreetPostCode').val(oData['contactbusiness.streetpostcode'].formatXHTML());
							$('#ns1blankspaceBusinessContactStreetCountry').val(oData['contactbusiness.streetcountry'].formatXHTML());
						});

					$('#ns1blankspaceContactCopyMailingAddressFromBusiness')
						.button(
						{
							label: 'Copy from Business'
						})
						.on('click', function()
						{
							$('#ns1blankspaceBusinessContactMailingAddress1').val(ns1blankspace.objectContextData['contactbusiness.mailingaddress1'].formatXHTML());
							$('#ns1blankspaceBusinessContactMailingAddress2').val(ns1blankspace.objectContextData['contactbusiness.mailingaddress2'].formatXHTML());
							$('#ns1blankspaceBusinessContactMailingSuburb').val(ns1blankspace.objectContextData['contactbusiness.mailingsuburb'].formatXHTML());
							$('#ns1blankspaceBusinessContactMailingState').val(ns1blankspace.objectContextData['contactbusiness.mailingstate'].formatXHTML());
							$('#ns1blankspaceBusinessContactMailingPostCode').val(ns1blankspace.objectContextData['contactbusiness.mailingpostcode'].formatXHTML());
							$('#ns1blankspaceBusinessContactMailingCountry').val(ns1blankspace.objectContextData['contactbusiness.mailingcountry'].formatXHTML());
						});
				}

				$('#ns1blankspaceBusinessContactMobile').mask('9999 999 999', {placeholder: " "});
				$('#ns1blankspaceBusinessContactPhone').mask('99 9999 9999', {placeholder: " "});
				$('#ns1blankspaceBusinessContactFax').mask('99 9999 9999', {placeholder: " "});

				if (oThisContact != undefined) 
				{	// v3.1.207 SUP023067 Added .formatXHTML() to non-address / name fields
					$('#ns1blankspaceBusinessContactId').html(oThisContact.id);
					$('#ns1blankspaceBusinessContactReference').val(oThisContact.reference);
					$('#ns1blankspaceBusinessContactTitle').val(oThisContact['titletext']);
					$('#ns1blankspaceBusinessContactTitle').attr('data-id', oThisContact['title']);
					$('#ns1blankspaceBusinessContactFirstName').val(oThisContact['firstname'].formatXHTML());
					$('#ns1blankspaceBusinessContactSurname').val(oThisContact['surname'].formatXHTML());
					$('#ns1blankspaceBusinessContactGender').val(oThisContact['gendertext']);
					$('#ns1blankspaceBusinessContactGender').attr('data-id', oThisContact['gender']);
					$('#ns1blankspaceBusinessContactEmail').val(oThisContact['email'].formatXHTML());
					$('#ns1blankspaceBusinessContactPhone').val(oThisContact['workphone'].formatXHTML());
					$('#ns1blankspaceBusinessContactFax').val(oThisContact['fax'].formatXHTML());
					$('#ns1blankspaceBusinessContactMobile').val(oThisContact['mobile'].formatXHTML());
					$('#ns1blankspaceBusinessContactPosition').val(oThisContact['position'].formatXHTML());
					$('#ns1blankspaceBusinessContactStatus').val(oThisContact[sStatusColumn + 'text']);
					$('#ns1blankspaceBusinessContactStatus').attr('data-id', oThisContact[sStatusColumn]);
					$('#ns1blankspaceBusinessContactStreetAddress1').val(oThisContact['streetaddress1'].formatXHTML());
					$('#ns1blankspaceBusinessContactStreetAddress2').val(oThisContact['streetaddress2'].formatXHTML());
					$('#ns1blankspaceBusinessContactStreetSuburb').val(oThisContact['streetsuburb'].formatXHTML());
					$('#ns1blankspaceBusinessContactStreetState').val(oThisContact['streetstate'].formatXHTML());
					$('#ns1blankspaceBusinessContactStreetPostCode').val(oThisContact['streetpostcode'].formatXHTML());
					$('#ns1blankspaceBusinessContactStreetCountry').val(oThisContact['streetcountry'].formatXHTML());
					$('#ns1blankspaceBusinessContactMailingAddress1').val(oThisContact['mailingaddress1'].formatXHTML());
					$('#ns1blankspaceBusinessContactMailingAddress2').val(oThisContact['mailingaddress2'].formatXHTML());
					$('#ns1blankspaceBusinessContactMailingSuburb').val(oThisContact['mailingsuburb'].formatXHTML());
					$('#ns1blankspaceBusinessContactMailingState').val(oThisContact['mailingstate'].formatXHTML());
					$('#ns1blankspaceBusinessContactMailingPostCode').val(oThisContact['mailingpostcode'].formatXHTML());
					$('#ns1blankspaceBusinessContactMailingCountry').val(oThisContact['mailingcountry'].formatXHTML());

					if (oParam.showTrainingCourses == true)
					{
						aHTML = [];
						aHTML.push('<table>');
						$.each(oThisContact.trainingCourses, function()
						{
							aHTML.push('<tr>' +
											'<td class="ns1blankspaceRow ns1blankspaceContactTrainingCourse"' +
												' id="ns1blankspaceContactTrainingCourseDate-' + this['agritrainingcourseattendee.course.id'] + '"' +
												' style="font-size:0.75em;">' + this['agritrainingcourseattendee.course.coursedate'] + '</td>' +
											'<td class="ns1blankspaceRow ns1blankspaceContactTrainingCourse"' +
												' id="ns1blankspaceContactTrainingCourseTitle-' + this['agritrainingcourseattendee.course.id'] + '"' +
												' style="font-size:0.75em;">' + this['agritrainingcourseattendee.course.title'] + '</td>' +
											'<td class="ns1blankspaceRow ns1blankspaceContactTrainingCourse"' +
												' id="ns1blankspaceContactTrainingCourseCOP-' + this['agritrainingcourseattendee.course.id'] + '"' +
												' style="font-size:0.75em;">' + this['agritrainingcourseattendee.course.package.codeofpracticetext'] + '</td>' +
										'</tr>')
						});
						aHTML.push('</table>');

						$('#ns1blankspaceBusinessContactTrainingCourses').html(aHTML.join(''));

						$('.ns1blankspaceContactTrainingCourse')
							.css('cursor', 'pointer')
							.on('click', function()
							{
								var iId = this.id.split('-').pop()
								nsFreshcare.admin.trainingcourse.init({id: iId});
							});
					}
				}
				else 
				{
					// Set defaults
					$('#ns1blankspaceEntityPeopleContactBusiness').val(ns1blankspace.data.contactBusinessText.formatXHTML());
					$('#ns1blankspaceEntityPeopleContactBusiness').attr('data-id', ns1blankspace.objectContext);

					$('#ns1blankspaceBusinessContactStreetCountry').val('Australia');
					$('#ns1blankspaceBusinessContactMailingCountry').val('Australia');

					// v3.1.205 SUP023021 Auditors don't need approval to add contacts
					if (nsFreshcare.user.role.toLowerCase() === 'admin' || nsFreshcare.user.role.toLowerCase() === 'auditor')
					{
						$('#ns1blankspaceBusinessContactStatus').val('Active');
						$('#ns1blankspaceBusinessContactStatus').attr('data-id', nsFreshcare.data.contactStatusActive);
					}
					else
					{
						$('#ns1blankspaceBusinessContactStatus').val('Pending Approval');
						$('#ns1blankspaceBusinessContactStatus').attr('data-id', nsFreshcare.data.contactStatusPendingApproval);
					}
				}
				delete(oParam.xhtmlElementEditID);
			},

			primary:
			{
				validate: function(oParam)
				{
					var sID = ns1blankspace.util.getParam(oParam, 'rowID').value;
					var sPageObject = ns1blankspace.util.getParam(oParam, 'pageObject', {'default': 'grower'}).value;

					ns1blankspace.okToSave = true;

					if (ns1blankspace.inputDetected === true)
					{
						ns1blankspace.container.confirm({html: 'Please save changes you\'ve made on other tabs before changing the Primary Contact.'});
						ns1blankspace.okToSave = false;
					}

					// If an external user, Contact must have email and mobile specified 
					if (ns1blankspace.okToSave 
						&& (sPageObject === 'grower' || sPageObject === 'certificationbody' || sPageObject === 'trainer' || sPageObject === 'customer'))
					{
						if ($('#ns1blankspaceEntityPeople_mobile-' + sID).html() === '')
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please enter a mobile number for the primary contact');
						}

						if ($('#ns1blankspaceEntityPeople_email-' + sID).html() === '')
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Please enter an email address for the primary contact');
						}
					}

					if (ns1blankspace.okToSave)
					{
						nsFreshcare.internal.entity.people.primary.send(oParam);
					}
				},

				send: function(oParam)
				{
					// v3.1.205 SUP023021 Freshcare have asked that if the Primary Contact is changed
					// that the new primary contact is linked to the user record (if there is a user record)

					var sID = ns1blankspace.util.getParam(oParam, 'rowID').value;
					var sPageObject = ns1blankspace.util.getParam(oParam, 'pageObject', {'default': 'grower'}).value;
					var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementClickID').value;
					var sContactBusiness;
					var sPrimaryContact;
					var sData = '';
					var oRoot = ns1blankspace.rootnamespace;
					var bGrowerPage = (sPageObject === 'grower');

					if (oParam.savePrimaryContactStep === undefined) {oParam.savePrimaryContactStep = 1}

					if (sID && sXHTMLElementID)
					{
						// Save the primary contact to the business
						if (oParam.savePrimaryContactStep === 1)
						{
							sContactBusiness = $('#' + sXHTMLElementID).attr('data-contactbusiness');
							sPrimaryContact = $('#' + sXHTMLElementID).attr('data-primarycontact');

							sData = 'id=' + sContactBusiness + '&primarycontactperson=' + sID;

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										// Now we need to set the contactperson on the user record for this business to new primarycontact 
										oParam.savePrimaryContactStep = 2;
										nsFreshcare.internal.entity.people.primary.send(oParam);
									}
									else
									{
										ns1blankspace.status.error('Unable to set as primary contact: ' + oResponse.error.errornotes);
									}
								}
							});
						}

						// Find user record and update
						else if (oParam.savePrimaryContactStep === 2)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'SETUP_USER_SEARCH';
							oSearch.addField('username,contactperson,contactbusiness,user.contactperson.persongroup');
							oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
							oSearch.sort('username', 'asc');
							oSearch.getResults(function(oResponse)
							{
								var iUserID;
								if (oResponse.status === 'OK')
								{
									if (oResponse.data.rows.length > 0)
									{
										if (sPageObject === 'certificationbody')
										{
											// We need to find the auditor user - we don't want to update the reviewer user (for eggs)
											iUserID = $.map($.grep(oResponse.data.rows, function(x) {return x['user.contactperson.persongroup'] == nsFreshcare.data.groupAuditor}),
																						function(y) {return y.id}).shift();
										}
										else
										{
											iUserID = oResponse.data.rows[0].id;
										}

										if (iUserID != undefined)
										{
											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
												data: 'id=' + iUserID + '&contactperson=' + sID,
												success: function(oResponse)
												{
													if (oResponse.status === 'OK')
													{
														ns1blankspace.status.message('Primary User account updated.');
														oParam.savePrimaryContactStep = 3;
														nsFreshcare.internal.entity.people.primary.send(oParam);
													}
													else
													{
														ns1blankspace.status.error('Error updating primary user account: ' + oResponse.error.errornotes);
													}
												}
											});
										}
									}
									else // There is no user, just continue
									{
										oParam.savePrimaryContactStep = 3;
										nsFreshcare.internal.entity.people.primary.send(oParam);
									}
								}
							});
						}

						// Send email to Freshcare
						else if (oParam.savePrimaryContactStep === 3)
						{
							oParam.savePrimaryContactStep = 4;
							if (nsFreshcare.user.role.toLowerCase() === 'auditor' || nsFreshcare.user.role.toLowerCase() === 'grower' || nsFreshcare.user.role.toLowerCase() === 'trainer')
							{
								$.extend(oParam, false,
								{
									to: nsFreshcare.data.emailToAdmin,
									from: nsFreshcare.data['emailFrom' + nsFreshcare.user.role],
									subject: nsFreshcare.user.role + ' ' + ns1blankspace.user.contactBusinessText + ' has changed a primary contact',
									message: nsFreshcare.user.role + ' ' + ns1blankspace.user.contactBusinessText + ' has changed the primary contact against ' + ns1blankspace.data.contactBusinessText, 
									contactBusiness: ns1blankspace.objectContext,
									onComplete: nsFreshcare.internal.entity.people.primary.send
								});

								nsFreshcare.external.grower.save.sendEmail(oParam);
							}
							else
							{
								nsFreshcare.internal.entity.people.primary.send(oParam);
							}
						}

						else if (oParam.savePrimaryContactStep === 4)
						{
							delete(oParam.savePrimaryContactStep);
							// Redisplay the record as the Primary Contact is shown on the Details tab for Growers and in the Control panel for all others
							// Work out which init function to call!
							if (nsFreshcare.user.role.toLowerCase() != 'admin')
							{	// We're viewing a grower page

								if (oRoot[nsFreshcare.user.role.toLowerCase()] && oRoot[nsFreshcare.user.role.toLowerCase()].grower)
								{
									oRoot[nsFreshcare.user.role.toLowerCase()].grower.init({id: ns1blankspace.objectContext});
								}
								else
								{
									nsFreshcare[nsFreshcare.user.role.toLowerCase()].grower.init({id: ns1blankspace.objectContext});
								}
							}
							else
							{
								if (oRoot.admin[sPageObject])
								{
									oRoot.admin[sPageObject].init({id: ns1blankspace.objectContext});	
								}
								else
								{
									nsFreshcare.admin[sPageObject].init({id: ns1blankspace.objectContext});
								}
							}
						}
					}
					else
					{
						ns1blankspace.status.error('Cannot set primary contact: Invalid data passed to program.');
					}
				}
			},

			remove:
			{
				validate: function(oParam)
				{
					var sID = ns1blankspace.util.getParam(oParam, 'id').value;

					if (oParam && oParam.removeContactStep == undefined) {oParam.removeContactStep = 2}

					// Check that contact is not linked to an audit (as auditperson)
					if (oParam.removeContactStep == 2)
					{
						ns1blankspace.status.working('Searching for linked audits..')
						var oSearch = new AdvancedSearch();
						oSearch.method = "AUDIT_SEARCH";
						oSearch.addField('reference');
						oSearch.addFilter('auditperson', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									ns1blankspace.status.error('Cannot remove contact as they are linked to Audits as the auditor');
								}
								else
								{
									oParam.removeContactStep = 3;
									nsFreshcare.internal.entity.people.remove.validate(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error('Error looking for linked audit records: ' + oResponse.error.errornotes);
							}
						});
					}
					

					// Check that contact is not linked to a training course (as trainercontactperson)
					if (oParam.removeContactStep == 3)
					{
						ns1blankspace.status.working('Searching for linked training courses..')
						var oSearch = new AdvancedSearch();
						oSearch.method = "AGRI_EDUCATION_TRAINING_COURSE_SEARCH";
						oSearch.addField('reference');
						oSearch.addFilter('trainercontactperson', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									ns1blankspace.status.error('Cannot remove contact as they are linked to Training Courses as the trainer');
								}
								else
								{
									oParam.removeContactStep = 4;
									nsFreshcare.internal.entity.people.remove.validate(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error('Error looking for linked training courses: ' + oResponse.error.errornotes);
							}
						});
					}
					
					// Check that contact is not linked to any actions
					if (oParam.removeContactStep == 4)
					{
						ns1blankspace.status.working('Searching for linked actions / activities..')
						var oSearch = new AdvancedSearch();
						oSearch.method = "ACTION_SEARCH";
						oSearch.addField('subject');
						oSearch.addFilter('contactperson', 'EQUAL_TO', sID);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									ns1blankspace.status.error('Cannot remove contact as there are linked actions / activities');
								}
								else
								{
									oParam.removeContactStep = 10;
									nsFreshcare.internal.entity.people.remove.validate(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error('Error looking for linked actions: ' + oResponse.error.errornotes);
							}
						});
					}
					
					// CAll the call-back function - all good if we got to here!
					else if (oParam.removeContactStep == 10)
					{
						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
				},

				send: function(oParam)
				{
					var sData = '';

					if (oParam && oParam.rowID)
					{
						sData += 'id=' + oParam.rowID + '&remove=1';

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_PERSON_MANAGE'),
							data: sData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Contact removed');
									$('#' + ns1blankspace.xhtml.divID).parent().parent().remove();
									if (ns1blankspace.objectContextData['contactbusiness.primarycontactperson']
										&& ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] === oParam.id)
									{
										ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] = '';
									}
									ns1blankspace.objectContextData.people = $.grep(ns1blankspace.objectContextData.people, function(x) {x.id != oParam.id});
								}
								else
								{
									ns1blankspace.status.error('Error removing contact: ' + oResponse.error.errornotes);
								}
							}

						});
					}
				},

				setContactStatus: function(oParam)
				{	// v3.1.205 SUP023021 Changed so that can setStatus instead of just inactivate
					var sStatusColumn = $('#ns1blankspaceBusinessContactColumn1').attr('data-statuscolumn');
					var sData = '';
					var sContactName = '';
					var iStatus = ns1blankspace.util.getParam(oParam, 'newStatus').value;
					var sStatus = ns1blankspace.util.getParam(oParam, 'newStatusText').value;

					if (oParam && oParam.rowID && iStatus)
					{
						sData = 'id=' + oParam.rowID + '&' + sStatusColumn + '=' + iStatus;
						sContactName = $.map($.grep(ns1blankspace.objectContextData.people, function(x) {return x.id === oParam.rowID}),
												function(y) {return y.firstname + ' ' + y.surname}).shift();
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_PERSON_MANAGE'),
							data: sData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Contact ' + sStatus);
									$('#' + ns1blankspace.xhtml.divID).parent().parent().remove();


									if (ns1blankspace.objectContextData['contactbusiness.primarycontactperson']
										&& ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] === oParam.id)
									{
										ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] = '';
									}
									ns1blankspace.objectContextData.people = $.grep(ns1blankspace.objectContextData.people, function(x) {x.id != oParam.id});

									// Need to send email notification if grower or auditor or trainer are inactivating
									if (iStatus == nsFreshcare.data.contactStatusInactive
										&& (nsFreshcare.user.role.toLowerCase() === 'auditor' 
											|| nsFreshcare.user.role.toLowerCase() === 'grower' 
											|| nsFreshcare.user.role.toLowerCase() === 'trainer'))
									{
										nsFreshcare.external.grower.save.sendEmail(
										{
											to: nsFreshcare.data.emailToAdmin,
											from: nsFreshcare.data['emailFrom' + nsFreshcare.user.role],
											subject: nsFreshcare.user.role + ' ' + ns1blankspace.user.contactBusinessText + ' has inactivated a contact',
											message: nsFreshcare.user.role + ' ' + ns1blankspace.user.contactBusinessText + ' has inactivated contact ' + sContactName + ' from ' + ns1blankspace.data.contactBusinessText, 
											contactBusiness: ns1blankspace.objectContext
										});
									}
								}
								else
								{
									ns1blankspace.status.error('Error changing contact status: ' + oResponse.error.errornotes);
								}
							}

						});
					}

				}
			},

			save:
			{
				validate: function(oParam)
				{
					var sPageObject = ns1blankspace.util.getParam(oParam, 'pageObject', {'default': 'grower'}).value;
					var sID = ns1blankspace.util.getParam(oParam, 'id').value;
					var bFirstContact = (ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] == '' 
								&& (ns1blankspace.objectContextData.people === undefined || ns1blankspace.objectContextData.people.length == 0));
					var oThisContact = (sID != undefined) ? $.grep(ns1blankspace.objectContextData.people, function(x) {return x.id == sID}).shift() : undefined;
					var bShowGroups = ns1blankspace.util.getParam(oParam, 'showGroups', {'default': false}).value;
					var bHasReference = (oThisContact && bShowGroups && $.grep(oThisContact.groups, function(x) {return x.group == nsFreshcare.data.groupTrainer}).length > 0
											&& $('#ns1blankspaceBusinessContactStatus').attr('data-id') == nsFreshcare.data.contactStatusActive) ? true : false;

					if (oParam.validatePersonStep == undefined) {oParam.validatePersonStep = 1}

					// Check for mandatory
					if (oParam.validatePersonStep === 1)
					{
						$('#ns1blankspaceEntityPeopleRow2 input[data-mandatory]').each(function() 
						{
							if ($(this).is(':visible') && $(this).attr('data-mandatory') === '1' && $(this).val() === '') 
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
								return false;
							}
						});

						if (ns1blankspace.okToSave && ((sID != undefined && oParam.primaryContact === sID) || (sID === undefined && bFirstContact)) 
							&& (sPageObject === 'grower' || sPageObject === 'certificationbody' || sPageObject === 'customer' || sPageObject === 'trainer' ))
						{
							if ($('#ns1blankspaceBusinessContactMobile').val() == ''
								|| $('#ns1blankspaceBusinessContactEmail').val() == ''
								)
							{
								ns1blankspace.status.message('Mobile and Email must be entered for Primary Contacts.');
								ns1blankspace.okToSave = false;
							}
						}
						// Email, Phone or Mobile must be populated if external user updating
						else if (ns1blankspace.okToSave && nsFreshcare.user.role.toLowerCase() != 'admin')
						{
							if ($('#ns1blankspaceBusinessContactPhone').val() == ''
								&& $('#ns1blankspaceBusinessContactMobile').val() == ''
								&& $('#ns1blankspaceBusinessContactEmail').val() == ''
								)
							{
								ns1blankspace.status.message('At least one of Phone, Mobile or Email must be entered.');
								ns1blankspace.okToSave = false;
							}
						}
						
						// v3.1.1 SUP022434 Added validation for Trainer ID
						// v3.1.1f SUP022652 Validating not working as didn't have # in id selector. Also only need to check this when the contact in inactive
						if (ns1blankspace.okToSave && bHasReference 
							&& $('#ns1blankspaceBusinessContactReference').is('*') && $('#ns1blankspaceBusinessContactReference').val() == '')
						{
								ns1blankspace.status.message('Please enter a Trainer ID.');
								ns1blankspace.okToSave = false;
						}

						if (ns1blankspace.okToSave)
						{
							oParam.validatePersonStep = 2;
							nsFreshcare.internal.entity.people.save.validate(oParam);
						}
					}

					// Now check for duplicates 
					else if (oParam.validatePersonStep === 2)
					{
						var sName = (($('#ns1blankspaceBusinessContactFirstName').val() != '') ? $('#ns1blankspaceBusinessContactFirstName').val().formatXHTML() + ' ' : '') +
									$('#ns1blankspaceBusinessContactSurname').val().formatXHTML();

						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_PERSON_SEARCH';
						oSearch.addField('firstname,surname');
						oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
						if (oParam.id)
						{
							oSearch.addFilter('id', 'NOT_EQUAL_TO', oParam.id);
						}
						oSearch.addFilter('firstname', 'EQUAL_TO', $('#ns1blankspaceBusinessContactFirstName').val().formatXHTML());
						oSearch.addFilter('surname', 'EQUAL_TO', $('#ns1blankspaceBusinessContactSurname').val().formatXHTML());
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									ns1blankspace.okToSave = false;
									ns1blankspace.status.message('Contact ' + sName + ' already exists.');
								}
								else
								{
									oParam.validatePersonStep = 3;
									nsFreshcare.internal.entity.people.save.validate(oParam)
								}
							}
							else
							{
								ns1blankspace.status.error('Error finding duplicates: ' + oResponse.error.errornotes);
							}
						});
					}

					// If bHasReference, make sure it's unique for the corresponding group
					else if (oParam.validatePersonStep === 3)
					{
						if (bHasReference)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'CONTACT_PERSON_SEARCH';
							oSearch.addField('reference,firstname,surname');
							oSearch.addFilter('reference', 'EQUAL_TO', $('#ns1blankspaceBusinessContactReference').val());
							if (sID != undefined)
							{
								oSearch.addFilter('id', 'NOT_EQUAL_TO', sID);
							}
							oSearch.addFilter('persongroup', 'EQUAL_TO', nsFreshcare.data.groupTrainer.join(','));
							oSearch.rows = 1;
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status == 'OK')
								{
									if (oResponse.data.rows.length > 0)
									{
										ns1blankspace.status.message('Trainer ID already in use by ' + oResponse.data.rows[0].firstname + ' ' + oResponse.data.rows[0].surname +'.');
										ns1blankspace.okToSave = false;
									}
									else
									{
										oParam.validatePersonStep = 4;
										nsFreshcare.internal.entity.people.save.validate(oParam);
									}
								}
								else
								{
									ns1blankspace.status.error('Error checking Trainer ID: ' + oResponse.error.errornotes);
								}
							});
						}
						else
						{
							oParam.validatePersonStep = 4;
							nsFreshcare.internal.entity.people.save.validate(oParam);
						}
					}


					else if (oParam.validatePersonStep === 4)
					{
						delete(oParam.validatePersonStep);
						if (ns1blankspace.okToSave)
						{
							oParam.savePersonStep = 2;
							nsFreshcare.internal.entity.people.save.send(oParam);
						}
						else
						{
							delete(oParam.savePersonStep);
						}
					}
				},

				send: function(oParam)
				{
					var sID = ns1blankspace.util.getParam(oParam, 'id').value;
					var fFunctionPostSave = ns1blankspace.util.getParam(oParam, 'functionPostSave', {'default': nsFreshcare.internal.entity.people.show}).value;
					var oNewData = ns1blankspace.util.getParam(oParam, 'newData').value;
					var oRoot = ns1blankspace.rootnamespace;
					var sPageObject = ns1blankspace.util.getParam(oParam, 'pageObject', {'default': 'grower'}).value;
					var oThisContact = (sID != undefined) ? $.grep(ns1blankspace.objectContextData.people, function(x) {return x.id == sID}).shift() : undefined;
					var bShowGroups = ns1blankspace.util.getParam(oParam, 'showGroups', {'default': false}).value;
					var bHasReference = (oThisContact && bShowGroups && $.grep(oThisContact.groups, function(x) 
											{return x.group == nsFreshcare.data.groupTrainer}).length > 0) ? true : false;

					if (oParam)
					{ if (oParam.savePersonStep == undefined) {oParam.savePersonStep = 1}}
					else {oParam = {savePersonStep: 1}}

					// Validate data entry
					if (oParam.savePersonStep === 1)
					{
						ns1blankspace.status.working('Validating data entry..')
						ns1blankspace.okToSave = true;
						nsFreshcare.internal.entity.people.save.validate(oParam);
					}

					// Construct data 
					else if (oParam.savePersonStep === 2)
					{
						// The new values are added to ns1blankspace.objectContextData.peopleUpdates
						// The code in the save method of the 'parent' object can then use this as necessary
						if (ns1blankspace.objectContextData.peopleUpdates === undefined) {ns1blankspace.objectContextData.peopleUpdates = []}

						// Also need to specify captions for sending the email. Put this into ns1blankspace.objectContextData.peopleUpdateCaptions
						ns1blankspace.objectContextData.peopleUpdateCaptions = 
						{
							title: 'Title',
							firstname: 'First Name',
							surname: 'Surname',
							position: 'Position',
							gender: 'Gender',
							workphone: 'Phone',
							mobile: 'Mobile',
							fax: 'Fax',
							email: 'Email',
							supplierstatus: 'Status',
							customerstatus: 'Status',
							streetaddress1: 'Street Address line 1',
							streetaddress2: 'Street Address line 2',
							streetsuburb: 'Street Suburb',
							streetstate: 'Street State',
							streetpostcode: 'Street Post Code',
							streetcountry: 'Street Country',
							mailingaddress1: 'Mailing Address line 1',
							mailingaddress2: 'Mailing Address line 2',
							mailingsuburb: 'Mailing Suburb',
							mailingstate: 'Mailing State',
							mailingpostcode: 'Mailing Post Code',
							mailingcountry: 'Mailing Country'
						}

						if (bHasReference)
						{
							ns1blankspace.objectContextData.peopleUpdateCaptions.reference = "Trainer ID";
						}

						// Get the values already stored in peopleUpdates if it exists and remove this row - we'll push it back later
						var oData = $.grep(ns1blankspace.objectContextData.peopleUpdates, function(x) {return x.id === sID}).shift();
						ns1blankspace.objectContextData.peopleUpdates = $.grep(ns1blankspace.objectContextData.peopleUpdates, function(x) {return x.id != sID})
						oData = (oData == undefined) ? {id: sID} : oData;

						if (bHasReference)
						{
							oData.reference = $('#ns1blankspaceBusinessContactReference').val();
						}
						oData.title = $('#ns1blankspaceBusinessContactTitle').attr('data-id');
						oData.titletext = $('#ns1blankspaceBusinessContactTitle').val();
						oData.firstname = $('#ns1blankspaceBusinessContactFirstName').val().formatXHTML();
						oData.surname = $('#ns1blankspaceBusinessContactSurname').val().formatXHTML();
						oData.position = $('#ns1blankspaceBusinessContactPosition').val().formatXHTML();
						oData.gender = $('#ns1blankspaceBusinessContactGender').attr('data-id');
						oData.gendertext = $('#ns1blankspaceBusinessContactGender').val().formatXHTML();
						oData.workphone = $('#ns1blankspaceBusinessContactPhone').val().formatXHTML();
						oData.mobile = $('#ns1blankspaceBusinessContactMobile').val().formatXHTML();
						oData.fax = $('#ns1blankspaceBusinessContactFax').val().formatXHTML();
						oData.email = $('#ns1blankspaceBusinessContactEmail').val().formatXHTML();
						oData[$('#ns1blankspaceBusinessContactStatus').attr('data-statuscolumn')] = $('#ns1blankspaceBusinessContactStatus').attr('data-id');
						oData[$('#ns1blankspaceBusinessContactStatus').attr('data-statuscolumn') + 'text'] = $('#ns1blankspaceBusinessContactStatus').val().formatXHTML();
						oData.streetaddress1 = $('#ns1blankspaceBusinessContactStreetAddress1').val().formatXHTML();
						oData.streetaddress2 = $('#ns1blankspaceBusinessContactStreetAddress2').val().formatXHTML();
						oData.streetsuburb = $('#ns1blankspaceBusinessContactStreetSuburb').val().formatXHTML();
						oData.streetstate = $('#ns1blankspaceBusinessContactStreetState').val().formatXHTML();
						oData.streetpostcode = $('#ns1blankspaceBusinessContactStreetPostCode').val().formatXHTML();
						oData.streetcountry = $('#ns1blankspaceBusinessContactStreetCountry').val().formatXHTML();
						oData.mailingaddress1 = $('#ns1blankspaceBusinessContactMailingAddress1').val().formatXHTML();
						oData.mailingaddress2 = $('#ns1blankspaceBusinessContactMailingAddress2').val().formatXHTML();
						oData.mailingsuburb = $('#ns1blankspaceBusinessContactMailingSuburb').val().formatXHTML();
						oData.mailingstate = $('#ns1blankspaceBusinessContactMailingState').val().formatXHTML();
						oData.mailingpostcode = $('#ns1blankspaceBusinessContactMailingPostCode').val().formatXHTML();
						oData.mailingcountry = $('#ns1blankspaceBusinessContactMailingCountry').val().formatXHTML();

						oParam.savePersonStep = (oParam.canUpdateDirectly === true || sID === undefined) ? 3 : 10;
						ns1blankspace.objectContextData.peopleUpdates.push(oData);
						oParam.newData = oData;
						nsFreshcare.internal.entity.people.save.send(oParam);
					}

					// Perform direct changes to contact record 
					else if (oParam.savePersonStep === 3)
					{
						// If an existing record, compare and only update changes, otherwise if new, add contactbusiness to the data
						var oData = {}
						if (sID != undefined)
						{
							var oThisContact = $.grep(ns1blankspace.objectContextData.people, function(x) {return x.id === sID}).shift();
							$.each(oNewData, function(key, value)
							{
								if (oThisContact[key] != value)
								{
									oData[key] = value;
									if (oNewData.id != undefined) {oData.id = sID;}
								}
							});
							delete(oParam.group);		// Id existing record, we don't want to add a group
						}
						else
						{
							oData = oNewData;
							oData.contactbusiness = ns1blankspace.objectContext;
						}

						if (Object.keys(oData).length > 0)
						{
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('CONTACT_PERSON_MANAGE'),
								data: oData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.inputDetected = nsFreshcare.internal.entity.people.inputDetected;
										ns1blankspace.status.message('Person saved');
										oParam.personID = oResponse.id;
										oParam.savePersonStep = (oParam.group) ? 4 : 5;

										nsFreshcare.internal.entity.people.save.send(oParam);
									}
									else
									{
										ns1blankspace.status.error('Unable to save Person: ' + oResponse.error.errornotes);
										delete(oParam.savePersonStep);
									}
								}
							});
						}
						else
						{
							ns1blankspace.inputDetected = nsFreshcare.internal.entity.people.inputDetected;
							ns1blankspace.status.message('No change to Contact. Nothing to save!')							
						}
					}

					// Now add person group if necessary
					else if (oParam.savePersonStep === 4)
					{
						sData = 'group=' + oParam.group + '&contactperson=' + oParam.personID;

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_PERSON_GROUP_MANAGE'),
							data: sData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Persongroup saved');
									oParam.savePersonStep = 5;
									nsFreshcare.internal.entity.people.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Unable to save Person Group: ' + oResponse.error.errornotes);
									delete(oParam.savePersonStep);
								}
							}
						});
					}

					// Now set primarycontactperson if first person to be added to this business
					else if (oParam.savePersonStep === 5)
					{
						if ((ns1blankspace.objectContextData && ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] === '') &&
							(ns1blankspace.objectContextData.people == undefined || ns1blankspace.objectContextData.people.length === 0))
						{
							sData = 'id=' + ns1blankspace.objectContext + '&primarycontactperson=' + oParam.personID;

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.message('Primary Contact saved');
										oParam = {savePersonStep: 10}
										if (oRoot.admin[sPageObject])
										{
											oParam.functionPostSave = oRoot.admin[sPageObject].init;	
										}
										else
										{
											oParam.functionPostSave = nsFreshcare.admin[sPageObject].init;
										}
										oParam.id = ns1blankspace.objectContext;
										nsFreshcare.internal.entity.people.save.send(oParam);
									}
									else
									{
										ns1blankspace.status.error('Unable to save Primary Contact: ' + oResponse.error.errornotes);
										delete(oParam.savePersonStep);
									}
								}
							});
						}
						else
						{
							oParam.savePersonStep = 10
							nsFreshcare.internal.entity.people.save.send(oParam);
						}
					}

					// Finish up and call onCOmplete
					else if (oParam.savePersonStep === 10)
					{
						delete(oParam.addContact);
						delete(oParam.savePersonStep);
						// If external user updating grower - Work out which object save function to call and set functionPostSave
						// v3.1.204 SUP023021 Now calls fFunctionPostSave if it exists, otherwise, call relevant grower.save.send
						if (fFunctionPostSave)
						{
							fFunctionPostSave(oParam);
						}
						else if (nsFreshcare.user.role.toLowerCase() != 'admin' && sPageObject === 'grower')
						{	// We're viewing a grower page

							if (oRoot[nsFreshcare.user.role.toLowerCase()] && oRoot[nsFreshcare.user.role.toLowerCase()].grower && oRoot[nsFreshcare.user.role.toLowerCase()].grower.save)
							{
								fFunctionPostSave = oRoot[nsFreshcare.user.role.toLowerCase()].grower.save.send;
							}
							else
							{
								fFunctionPostSave = nsFreshcare[nsFreshcare.user.role.toLowerCase()].grower.save.send;
							}
							//oParam = {id: ns1blankspace.objectContext};
						}
					}
				}
			}
		},

		groups:
		{
			show: function (oParam, oResponse)
			{	
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMainGroups'}).value;
				var sLabel = ns1blankspace.util.getParam(oParam, 'label', {'default': "groups"}).value;
				var sContextGroup = ns1blankspace.util.getParam(oParam, 'contextGroup').value;
				var iOption = 1;
				
				if (oParam != undefined)
				{
					if (oParam.label != undefined) {sLabel = oParam.label}
					if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				}

				if (oResponse == undefined)
				{
					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceContactBusinessGroupsColumn1" class="ns1blankspaceColumn1Flexible">' +
								ns1blankspace.xhtml.loading + '</td>' +
								'<td id="ns1blankspaceContactBusinessGroupsColumn2" style="width: 150px;" class="ns1blankspaceColumn2Action"></td>' +
								'</tr>' +
								'</table>');				
					
					$('#ns1blankspaceMainGroups').html(aHTML.join(''));
					
					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td>' +
									'<span id="ns1blankspaceContactBusinessGroupsAdd" class="ns1blankspaceAction">Add to group</span>' +
									'</td></tr>');													
					aHTML.push('</table>');					
					
					$('#ns1blankspaceContactBusinessGroupsColumn2').html(aHTML.join(''));
					
					$('#ns1blankspaceContactBusinessGroupsAdd').button(
					{
						label: "Add to group"
					})
					.click(function() {
						ns1blankspace.container.position(
						{
							xhtmlElementID: 'ns1blankspaceContactBusinessGroupsAdd',
							leftOffset: -50,
							topOffset: -280
						});
						ns1blankspace.contactBusiness.groups.add(oParam);
					});
				
					var oSearch = new AdvancedSearch();
					oSearch.endPoint = 'contact';
					oSearch.method = 'CONTACT_BUSINESS_GROUP_SEARCH';
					oSearch.addField('contactbusiness,contactbusinesstext,group,grouptext');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.rows = 100;
					oSearch.sort('grouptext', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.internal.entity.groups.show(oParam, data)});
				}
				else
				{
					
					var aHTML = [];
				
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table>' +
										'<tr><td class="ns1blankspaceNothing">No groups.</td></tr>' +
										'</table>');

						$('#ns1blankspaceContactBusinessGroupsColumn1').html(aHTML.join(''));		
					}
					else
					{
						aHTML.push('<table class="ns1blankspace">');
						
						$.each(oResponse.data.rows, function()
						{	
							if (this.grouptext != '')
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
												
								aHTML.push('<td id="ns1blankspaceGroups-title-' + this.id + '" class="ns1blankspaceRow">' +
														this.grouptext + '</td>');
								
								aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
												'<span id="ns1blankspaceGroups_remove-' + this.id + '"' +
												' data-groupid="' + this.group + '"' +
												' class="ns1blankspaceRow ns1blankspaceGroupsRemove">&nbsp;</span></td>');
			
								aHTML.push('</tr>');
							}					
						});
						
						aHTML.push('</table>');

						$('#ns1blankspaceContactBusinessGroupsColumn1').html(aHTML.join(''));
						
						$('.ns1blankspaceGroupsRemove').button( {
							text: false,
							 icons: {
								 primary: "ui-icon-close"
							}
						})
						.click(function() 
						{
							var oParam = 
							{
								onComplete: ns1blankspace.contactBusiness.groups.remove, 
								removeGroup: $(this).attr('data-groupid'),
								context: 'Business',
								group: sContextGroup,
								xhtmlElementID: this.id
							};
							nsFreshcare.internal.entity.groups.remove.validate(oParam);
						})
						.css('width', '15px')
						.css('height', '20px')
					}
					
				}	
			},	

			remove:
			{
				validate: function(oParam)
				{
					var sGroup = ns1blankspace.util.getParam(oParam, 'group').value;
					var iRemoveGroup = ns1blankspace.util.getParam(oParam, 'removeGroup').value;
					var sContext = ns1blankspace.util.getParam(oParam, 'context').value;
					var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
					var fFunctionRemoveGroup = ns1blankspace.util.getParam(oParam, 'onComplete').value;
					var iContextGroup;
					var bContinue = ns1blankspace.util.getParam(oParam, 'continue', {'default': false}).value;

					if (iRemoveGroup)
					{
						iContextGroup = (sContext === 'Business') ? nsFreshcare.data.businessGroupGrowerID : nsFreshcare.data.grower.categoryGrower;

						if (iRemoveGroup == iContextGroup)
						{
							ns1blankspace.container.confirm(
							{
								title: 'Warning!!',
								html: 'You have chosen to remove a reserved group (' + sGroup + '). Removing this group will remove functionality related to this reserved group.' +
										'<br /><br />Are you sure you want to remove this group?',
								buttons:
								[
									{text: "Yes", icons: {primary: 'ui-icon-check'},
										click: function() 
										{
											oParam.continue = true;
											delete(oParam.removeGroup);
											$(this).dialog('close');
											nsFreshcare.internal.entity.groups.remove.validate(oParam);
										}
									},
									{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
										click: function() 
										{
											$(this).dialog('close');
											return;
										}
									}
								]
							});
						}
						else
						{
							oParam.continue = true;
							delete(oParam.removeGroup);
							nsFreshcare.internal.entity.groups.remove.validate(oParam);
						}
					}
					else
					{
						if (bContinue && fFunctionRemoveGroup)
						{
							fFunctionRemoveGroup((sContext == 'Business' ? sXHTMLElementID : oParam));
						}
						//ns1blankspace.status.error('No id passed to validation function. Please contact support.');
					}
				}
			},

			add: function (oParam, oResponse)
			{
				// v3.1.0i SUP022250 Aliased as 1blankspace version wasn't using advanced search and didn't cater for Buisness & person 	
				// v3.1.1 SUP022511 NOw sorts by title and use can filter list
				var sXHTMLContext = ns1blankspace.objectName.replace('contact', '');
				sXHTMLContext = sXHTMLContext.substr(0,1).toUpperCase() + sXHTMLContext.substr(1);
				var sXHTMLContainerID = "ns1blankspaceContactPersonGroupsColumn2".replace('Person', (sXHTMLContext == 'Business' ? 'Business' : 'Person'));
				var sXHTMLGroupTypeContainerID = sXHTMLContainerID.replace('Column2', 'GroupTypes');
				var sXHTMLContainerElement = $('#' + sXHTMLContainerID).children().first().children().children().last();

				if ($('#' + sXHTMLGroupTypeContainerID).is('*'))
				{
					$('#' + sXHTMLGroupTypeContainerID).remove();
				}
				else
				{
					if (oResponse == undefined)
					{
						ns1blankspace.status.clear();
						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_CONTACT_' + sXHTMLContext.toUpperCase() + '_GROUP_SEARCH';
						oSearch.addField('title');
						oSearch.sort("title", 'asc');
						oSearch.rows = 20;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								nsFreshcare.internal.entity.groups.add(oParam, oResponse);
							}
							else
							{
								ns1blankspace.util.error('Error finding Groups: ' + oResponse.error.errornotes);
							}
						});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspaceSearchMedium">' + 
											'<tr><td class="ns1blankspaceNothing">No groups.</td></tr>' + 
											'</table>');

							$(sXHTMLContainerElement).after(aHTML.join(''));
						}
						else
						{
							aHTML.push('<table class="ns1blankspaceSearchMedium" style="font-size:0.875em;">');
							
							if (oResponse.morerows == "true")
							{
								aHTML.push('<tr><td class="ns1blankspaceSelect">' +
												'<input class="ns1blankspaceSelect" id="ns1blankspaceGroupsAddSelect"' +
														' data-context="' + sXHTMLContext + '"' + 
														' data-method="SETUP_CONTACT_' + sXHTMLContext.toUpperCase() + '_GROUP_SEARCH"' +
														' data-methodFilter="title-TEXT_IS_LIKE"' +
														' data-click="nsFreshcare.internal.entity.groups.select">' +
												'</td></tr>');
							}

							$.each(oResponse.data.rows, function()
							{	
								aHTML.push('<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceGroupsAdd-title-' + this.id + '"' +
													' data-context="' + sXHTMLContext + '"' + 
													' class="ns1blankspaceRowSelect ns1blankspaceGroupsAddRowSelect">' +
														this.title + '</td>');
								
								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');

							$(sXHTMLContainerElement).after(aHTML.join(''));
							
							$('td.ns1blankspaceGroupsAddRowSelect').click(function(event)
							{
								nsFreshcare.internal.entity.groups.select(event.target.id);
							});
						}
					}
				}	
			},

			select: function(sXHTMLElementID)
			{
				var sXHTMLContext = '';
				if (sXHTMLElementID == undefined)
				{
					sXHTMLElementID = '--' + $('#' + ns1blankspace.xhtml.divID).attr('data-id');
					sXHTMLContext = $('#' + ns1blankspace.xhtml.divID).attr('data-context');
					$('#' + ns1blankspace.xhtml.divID).val();
					$('#' + ns1blankspace.xhtml.divID).removeAttr('data-id')
				}
				else
				{
					sXHTMLContext = $('#' + sXHTMLElementID).attr('data-context');
				}
				ns1blankspace['contact' + sXHTMLContext].groups.select(sXHTMLElementID);
			}
		},

		actions:
		{
			search: function(oParam)
			{
				var iObject = ns1blankspace.util.getParam(oParam, 'object', {'default': ns1blankspace.object}).value;
				var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {'default': ns1blankspace.objectContext}).value;
				var iType = ns1blankspace.util.getParam(oParam, 'type').value;
				var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness').value;
				var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson').value;
				var iUser = ns1blankspace.util.getParam(oParam, 'user').value;
				var iActionBy = ns1blankspace.util.getParam(oParam, 'actionBy').value;
				var oFilters = ns1blankspace.util.getParam(oParam, 'filters', {'default': []}).value;
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceActionsColumn1'}).value;
				var fFunctionProcess = ns1blankspace.util.getParam(oParam, 'functionProcess', {'default': ns1blankspace.actions.process}).value;
				var aSearchFilters = ns1blankspace.util.getParam(oParam, 'type', {'default': []}).value;
				
				if (oParam == undefined) {oParam = {};}
				
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				if (oParam.emailsOnly === true)		// We want emails
				{
					oSearch.addField('subject,duedate,duedatetime,actiontype,actiontypetext,message,contactpersontext,createduser,createdusertext,actionby,actionbytext,emailsent');
				}
				else
				{
					oSearch.addField('subject,duedate,actiontype,actiontypetext,description,actionby,actionbytext');
				}

				if (1==1)
				{
					// Set up Action Type search filters
					var oFilter;
					oFilter = $.grep(aSearchFilters, function(x) {return x.field === 'actiontype'});
					if (oFilter.length > 0)
					{
						if (oFilter[0].values)
						{
							if ($('.ns1blankspace' + oFilter[0].name).hasClass('nsFreshcareSelected').length > 0)
							{
								iType = $.map($('.ns1blankspace' + oFilter[0].name).hasClass('nsFreshcareSelected'), function(x) {return x.id.split('-').pop()}).join(',');
							}
						}
						else if ($('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id') != undefined
							&& $('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id') != ''
							)
						{
							iType = $('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id');
						}
					}

					// Set up object search filter
					// This currently isn't working as need to cover scenario where object is also in oFilters - would need to overwrite existing filter
					// if this was the case, including objectcontext (of course, unless object is the same)
					/*oFilter = $.grep(aSearchFilters, function(x) {return x.field === 'object'});
					if (oFilter.length > 0)
					{
						if (oFilter[0].values)
						{
							if ($('.ns1blankspace' + oFilter[0].name).hasClass('nsFreshcareSelected').length > 0)
							{
								iObject = $.map($('.ns1blankspace' + oFilter[0].name).hasClass('nsFreshcareSelected'), function(x) {return x.id.split('-').pop()}).join(',');
							}
						}
						else if ($('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id') != undefined
							&& $('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id') != ''
							)
						{
							iObject = $('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id');
						}
					}*/
					
					// Set up actionby search filter
					oFilter = $.grep(aSearchFilters, function(x) {return x.field === 'actionby'});
					if (oFilter.length > 0)
					{
						if (oFilter[0].values)
						{
							if ($('.ns1blankspace' + oFilter[0].name).hasClass('nsFreshcareSelected').length > 0)
							{
								iActionBy = $.map($('.ns1blankspace' + oFilter[0].name).hasClass('nsFreshcareSelected'), function(x) {return x.id.split('-').pop()}).join(',');
							}
						}
						else if ($('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id') != undefined
							&& $('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id') != ''
							)
						{
							iActionBy = $('#ns1blankspaceActionFilter_' + oFilter[0].name).attr('data-id');
						}
						if (iActionBy)
						{
							oFilters.push({operation: 'addFilter', name: 'actionby', comparison: 'EQUAL_TO', value1: iActionBy});
						}
					}
					
					// Set up description filter
					oFilter = $.grep(aSearchFilters, function(x) {return x.field === 'description'});
					if (oFilter.length > 0)
					{
						if ($('#ns1blankspaceActionFilter_' + oFilter[0].name).val() != '')
						{
							oSearch.addFilter('description', ((oFilter[0].comparison) ? oFilter[0].comparison : 'TEXT_IS_LIKE'), $('#ns1blankspaceActionFilter_' + oFilter[0].name).val());
						}		
					}

					//if (iObject != undefined && iObject != '') {oSearch.addFilter('object', 'EQUAL_TO', iObject)};
					//if (iObjectContext != undefined && iObjectContext != '') {oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext)};
					//if (iType) {oSearch.addFilter('actiontype', 'IN_LIST', iType)};
					//if (iContactBusiness) {oSearch.addFilter('contactbusiness', 'EQUAL_TO', iContactBusiness)};
					//if (iContactPerson) {oSearch.addFilter('contactperson', 'EQUAL_TO', iContactPerson)};
					//if (iActionBy) {oSearch.addFilter('actionby', 'EQUAL_TO', iActionBy)}
					//if (iUser) {oSearch.addFilter('createduser', 'EQUAL_TO', iUser)}
				}

				if (oFilters.length > 0)
				{
					$.each(oFilters, function()
					{
						if (this.operation == 'addFilter')
						{
							// Special processing required for actions types where 'fixed' filter passed can be modified by SearchFilters
							var oThisFilter = $.extend({}, this);
							if (oThisFilter.name == 'actiontype' && iType)
							{
								if (oThisFilter.comparison == 'EQUAL_TO')
								{
									oThisFilter.comparison = 'IN_LIST'; oThisFilter.value1 = (iType.indexOf(',') > -1 ? ',' : '') + iType;
								}
								else if (oThisFilter.comparison == 'IN_LIST')
								{
									oThisFilter.value1 = (iType.indexOf(',') > -1 ? ',' : '') + iType;
								}
								else if (oThisFilter.comparison == 'NOT_EQUAL_TO' && oThisFilter.value1 != iType)
								{
									oThisFilter.comparison = 'EQUAL_TO'; oThisFilter.value1 = iType;
								}
								// ToDo cater for multi-select actiontype
								else if (oThisFilter.comparison == 'NOT_IN_LIST' && oThisFilter.value1.indexOf(iType) == -1)
								{
									oSearch.addFilter('actiontype', 'IN_LIST', iType);
								}
							}
							oSearch.addFilter(oThisFilter.name, oThisFilter.comparison, oThisFilter.value1, oThisFilter.value2, oThisFilter.value3, oThisFilter.applyToSubSearch);	
						}
						else if (this.operation === 'addBracket')
						{
							oSearch.addBracket(this.bracket);
						}
						else if (this.operation === 'addOperator')
						{
							oSearch.addOperator(this.operator);
						}
						
					});
				}
				
				oSearch.sort('duedate', 'desc')		//v3.0.1c SUP021988 changed to duedate
				
				oSearch.getResults(function(oResponse) 
				{
					oParam.xhtmlElementID = sXHTMLElementID;
					oParam.response = oResponse;
					fFunctionProcess(oParam, oResponse)
				});
			},

			show: function(oParam)
			{
				// v3.1.1f Changed to use getParam and now sets ContainerID to ElementID & sets xhtmlContext based on emailsOnly
				var aHTML = [];
				var sXHTMLElementContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMainActions'}).value;
				var bShowAdd = ns1blankspace.util.getParam(oParam, 'showAdd', {'default': false}).value;
				var oActions = ns1blankspace.util.getParam(oParam, 'actions', {'default': {add: false}}).value;
				var oContext = ns1blankspace.util.getParam(oParam, 'context', {'default': {inContext: false}}).value;
				var aSearchFilters = ns1blankspace.util.getParam(oParam, 'searchFilters', {'default': []}).value;
				var sXHTMLContext = (ns1blankspace.util.getParam(oParam, 'emailsOnly', {'default': false}).value ? 'Emails' : 'Actions');
				var sXHTMLElementID = 'ns1blankspace' + sXHTMLContext + 'Column1';
				
				if (oParam == undefined) {oParam = {}}
				oParam.xhtmlElementID = sXHTMLElementID;
				oParam.xhtmlContext = sXHTMLContext;
							
				ns1blankspace.actions.data = oParam;			// v3.1.1f SUP022623 to allow board member persmissions

				aHTML.push('<table id="ns1blankspace" class="ns1blankspace">' +
							'<tr>' +
							'<td id="ns1blankspace' + sXHTMLContext + 'Column1" class="ns1blankspaceColumn1Flexible">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'<td id="ns1blankspace' + sXHTMLContext + 'Column2" class="ns1blankspaceColumn2" style="display:none;">' +
							'</td>' +
							((aSearchFilters.length > 0)
							? '<td id="ns1blankspace' + sXHTMLContext + 'SearchRibbon" class="ns1blankspaceColumn2" style="width:10px;"></td>' + 
								'<td id="ns1blankspace' + sXHTMLContext + 'Filter" class="ns1blankspaceColumn2" style="width:150px;"></td>'
								: '') +
							'</tr><table>');
											
				$('#' + sXHTMLElementContainerID).html(aHTML.join(''));
					
				if (ns1blankspace.app.context) {ns1blankspace.app.context(oContext)};

				if (aSearchFilters.length > 0)
				{
					aHTML = [];
					aHTML.push('<span id="ns1blankspace' + sXHTMLContext + 'SearchHandle" style="height:20px;">Search Criteria</span>');
					$('#ns1blankspace' + sXHTMLContext + 'SearchRibbon').html(aHTML.join(''));

					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

					aHTML.push('<tr><td id="ns1blankspace' + sXHTMLContext + 'Search" class="ns1blankspaceAction">Search</td></tr>');

					aHTML.push('<tr><td id="ns1blankspace' + sXHTMLContext + 'StatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');

					// Filtering area
					if (aSearchFilters.length > 0)
					{
						$.each(aSearchFilters, function()
						{
							var oFilter = this;
							aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">' + oFilter.title + '</td></tr>');

							if (oFilter.values)
							{
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
							}
							else if (oFilter.selectMethod)
							{
								aHTML.push('<tr><td><input id="ns1blankspaceActionFilter_' + oFilter.name + '" ' +
													'class="ns1blankspaceSelect"' + 
													' data-method="' + oFilter.selectMethod + '"' +
														((oFilter.methodFilter) ? ' data-methodFilter="' + oFilter.methodFilter + '"': '') +
														((oFilter.columns) ? ' data-columns="' + oFilter.columns + '"': '') +
													'></td></tr>');
							}
							else 
							{
								aHTML.push('<tr><td><input id="ns1blankspaceActionFilter_' + oFilter.name + '" ' +
													'class="ns1blankspace' + ((oFilter.type) ? oFilter.type : 'Text' ) + '"' + 
													'></td></tr>');
							}

							aHTML.push('<tr><td>&nbsp;</td></tr>');							
						});

						aHTML.push('</table>');

						$('#ns1blankspace' + sXHTMLContext + 'Filter').html(aHTML.join(''));
					}

					// Bind the Search Handle (hides the search criteria area)
					$('#ns1blankspace' + sXHTMLContext + 'SearchHandle').button({
						text: false,
						icons: {
							primary: 'ui-icon-arrowthickstop-1-w'
						}
					})
					.css('width', '12px')
					.css('height', '25px')
					.click(function() {
						$('#ns1blankspace' + sXHTMLContext + 'SearchHandle').hide();
						$('#ns1blankspace' + sXHTMLContext + 'Filter').show('slide', {direction: 'left'}, 500);
					});

					// Bind Filter(s)
					$.each($.grep(aSearchFilters, function(x) {return x.selectMethod === undefined && x.values != undefined}), function()
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
					$('#ns1blankspace' + sXHTMLContext + 'Search').button({
						label: "Search"
					})
					.click(function() 
					{
						ns1blankspace.okToSave = true;

						if (aSearchFilters.length > 0)
						{
							$.each($.grep(aSearchFilters, function(x) {return x.mandatory === true}), function()
							{
								if ($('.ns1blankspace' + this.name + '[data-selected="1"]').length === 0) 
								{
									$('#ns1blankspace' + sXHTMLContext + 'StatusMessage').html('Please choose at least one ' + this.title + '.');
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
							$('#ns1blankspace' + sXHTMLContext + 'Filter').hide(
							{duration: 200, 
							complete: function() 
								{
									$('#ns1blankspace' + sXHTMLContext + 'SearchHandle').show();
									$('#' + sXHTMLElementID).html(ns1blankspace.xhtml.loading);
									oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.internal.entity.actions.show);

									nsFreshcare.internal.entity.actions.search(oParam);
								}
							});

						}
						else 
						{
							window.setTimeout('$("#ns1blankspace' + sXHTMLContext + 'StatusMessage").fadeOut(4000)', 7000);
						}
					});
				}

				if (oParam.response == undefined)
				{
					nsFreshcare.internal.entity.actions.search(oParam);
				}
			},

			process: function(oParam, oResponse)
			{	
				var aHTML = [];
				var bShowDescription = false;
				var sXHTMLElementID = 'ns1blankspaceActionsColumn1';
				var fFunctionRow = nsFreshcare.internal.entity.actions.row;
				var fFunctionBind = ns1blankspace.actions.bind;
				var bEmailsOnly = false;
				var oActions = {add: false};
				var sXHTMLContext = ns1blankspace.util.getParam(oParam, 'xhtmlContext', {'default': 'Actions'}).value;
				
				if (oParam != undefined)
				{
					if (oParam.xhtmlElementID != undefined ) {sXHTMLElementID = oParam.xhtmlElementID}
					if (oParam.showDescription != undefined ) {bShowDescription = oParam.showDescription}
					if (oParam.functionRow != undefined ) {fFunctionRow = oParam.functionRow}
					if (oParam.functionBind != undefined ) {fFunctionBind = oParam.functionBind}
					if (oParam.emailsOnly != undefined) {bEmailsOnly = oParam.emailsOnly}
					if (oParam.actions) {oActions = oParam.actions}
				}	

				aHTML.push('<table id="ns1blankspaceActions" class="ns1blankspace">');
			
				aHTML.push('<tr class="ns1blankspaceCaption">');
				if (bEmailsOnly && nsFreshcare.user.role.toLowerCase() === 'admin')		// Column for incoming / outgoing icons
				{
					aHTML.push('<td class="ns1blankspaceHeaderCaption" style="font-size:0.875em;">&nbsp;</td>');
				}
				
				// v3.1.2 SUP022468 Switched columns so duedate is first and reduced font size
				aHTML.push('<td class="ns1blankspaceHeaderCaption" style="font-size:0.875em;">Date</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption" style="font-size:0.875em;">Subject</td>');
				// no need to show Type for emails - it's in column 1 or for Auditors, they're all outgoing
				if (!bEmailsOnly)
				{	
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Type</td>');	
				}

				// v3.1.0 SUP022052 Added ActionBy column
				aHTML.push('<td class="ns1blankspaceHeaderCaption" style="font-size:0.875em;">Action By</td>');	
				aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;font-size=0.875em;">' +
								((oActions.add === true) ? '<span id="ns1blankspaceActionsAdd">&nbsp;</span>' : '&nbsp;') +
							'</td>');
				aHTML.push('</tr>');

				if (oResponse.data.rows.length === 0)
				{
					aHTML.push('<tr><td class="ns1blankspaceNothing" colspan="5">No actions.</td>' +
									'</tr>');
					
					$('#' + sXHTMLElementID).html(aHTML.join(''));
					$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeed);
					fFunctionBind(oParam);
				}
				else
				{
					$.each(oResponse.data.rows, function()
					{	
						aHTML.push(fFunctionRow(this, oParam));
					});
			    	
					aHTML.push('</table>');
					
					// v3.1.1 SUP022317 Now creates oRenderParam which is merged with oParam
					var oRenderParam = $.extend(oParam, 
					{
						xhtmlElementID: sXHTMLElementID,
						xhtmlContext: sXHTMLContext,
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows === 'true'),
						more: oResponse.moreid,
						rows: ns1blankspace.option.defaultRows,
						functionShowRow: fFunctionRow,
						functionOnNewPage: fFunctionBind,
					});
					ns1blankspace.render.page.show(oRenderParam); 
				}
			},

			bind: function(oParam)
			{
				// v3.1.0i SUP022250 Now binds only visible elements
				if (oParam == undefined) {oParam = {}}
				var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID', {"default": 'ns1blankspaceRenderPage_Action-0'}).value;
				sXHTMLContainerID = ($('#' + sXHTMLContainerID).is('*') ? sXHTMLContainerID : oParam.xhtmlElementID);
				var sXHTMLContext = ns1blankspace.util.getParam(ns1blankspace.actions.data, 'xhtmlContext', {'default': 'Actions'}).value;

				// v3.1.2 SUP022468 Was selecting by class instead of id
				$('#ns1blankspace' + sXHTMLContext + 'Add')
				.button({
					text: false,
					label: "Add",
					icons: {primary: 'ui-icon-plus'}
				})
				.css('height', '20px')
				.css('width', '20px')
				.click(function()
				{
					$('#ns1blankspaceActionsColumn2')
						.show()
						.css('width', '100px');

					// v3.1.0e Was sending objectContext as contactBusiness
					var oParam = {};
					if (ns1blankspace.object == nsFreshcare.objectBusiness) {oParam.contactBusiness = ns1blankspace.objectContext}
					if (ns1blankspace.object == nsFreshcare.objectPerson) {oParam.contactPerson = ns1blankspace.objectContext}
					ns1blankspace.actions.edit(oParam);
				});

				// v3.1.1f Now correctly responds to pagination
				$('#' + sXHTMLContainerID + ' .nsFreshcareCertificateVersionView')
					.click(function()
					{
						var sRowId = this.id.split('-').pop();
						
						if ($('#ns1blankspaceActionDescriptionRow-' + sRowId).is(':visible'))
						{
							$('#ns1blankspaceActionDescriptionRow-' + sRowId).hide();
						}
						else
						{
							$('#ns1blankspaceActionDescriptionRow-' + sRowId).show();
						}
					});

				ns1blankspace.actions.bind(oParam);				
			},

			row: function(oRow, oParam)
			{
				// v3.1.0 SUP022052 Added ActionBy
				// v3.1.2 SUP022468 Reduced font and changed duedate to be first
				var bShowDescription = ns1blankspace.util.getParam(oParam, 'showDescription', {"default": false}).value;

				var aHTML = [];

				aHTML.push('<tr>');

				aHTML.push('<td id="ns1blankspaceAction_date-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow">' +
								oRow.duedate + '</td>');

				aHTML.push('<td id="ns1blankspaceAction_subject-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
								oRow.subject + '</td>');

				aHTML.push('<td id="ns1blankspaceAction_type-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow">' +
								oRow.actiontypetext + '</td>');
				
				aHTML.push('<td id="ns1blankspaceAction_actionby-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow">' +
								oRow.actionbytext + '</td>');

				if (bShowDescription)
				{
					aHTML.push('<td id="ns1blankspaceAction_description-' + oRow.id + '" style="0.75em;" class="ns1blankspaceRow">' +
									oRow.description + '</td>');
				}					
				
				aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' + 			
								'<span id="ns1blankspaceAction_options_remove-' + oRow.id + '" class="ns1blankspaceRowRemove"></span>' +
								'</td>');

				aHTML.push('</tr>');

				return aHTML.join('');
			},

			edit: function(oParam, oResponse)
			{
				var iActionID = -1;
				var dStartDate = new Date();
				var dEndDate = dStartDate;
				var sXHTMLElementID = 'ns1blankspaceActionsColumn1';
				var iOffsetHeight = 5;
				var iOffsetLeft = 0;
			
				if (oParam != undefined)
				{
					if (oParam.actionID != undefined) {iActionID = oParam.actionID};
					if (oParam.id != undefined) {iActionID = oParam.id};
					if (oParam.startDate != undefined) {dStartDate = oParam.startDate};
					if (oParam.endDate != undefined) {dEndDate = oParam.endDate};
					if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID};
					if (oParam.offsetHeight != undefined) {iOffsetHeight = oParam.offsetHeight};
					if (oParam.offsetLeft != undefined) {iOffsetLeft = oParam.offsetLeft};
				}	

				if (iActionID != -1 && oResponse === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'ACTION_SEARCH';
					oSearch.addField('subject,actiontype');
					oSearch.rf = 'json';
					oSearch.addFilter('id', 'EQUAL_TO', iActionID);	
					oSearch.getResults(function(data) {ns1blankspace.actions.edit(oParam, data)});
				}
				else
				{
					var aHTML = [];
				
					aHTML.push('<table class="ns1blankspaceMain">' +
									'<tr class="ns1blankspaceRow">' +
									'<td id="ns1blankspaceEditColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceEditColumn2" class="ns1blankspaceColumn2" style="width:200px;"></td>' +
									'</tr>' +
									'</table>');
					
					$('#' + sXHTMLElementID).html(aHTML.join(''));

					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceActionAddSave" class="ns1blankspaceAction">Save</span>' +
										'<td></tr>');
					

					aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceActionAddCancel" class="ns1blankspaceAction">Cancel</span>' +
										'<td></tr>');

					aHTML.push('</table>');						

					$('#' + (sXHTMLElementID).replace('Column1', 'Column2')).html(aHTML.join(''));

					$('#ns1blankspaceActionAddCancel').button(
					{
						label: 'Cancel',
					})
					.click(function()
					{
						ns1blankspace.actions.show(oParam);
					})
					.css('width', '75px');

					$('#ns1blankspaceActionAddSave').button(
					{
						label: 'Save',
					})
					.click(function()
					{
						ns1blankspace.actions.save(oParam,
						{
							id: iActionID,
							subject: $('#ns1blankspaceActionAddSubject').val(),
							type: $('#ns1blankspaceActionAddType').attr('data-id'),
							date: $('#ns1blankspaceActionAddDate').val(),
							description: $('#ns1blankspaceActionAddDescription').val(),
							priority: ($('#ns1blankspaceActionAddImportant').attr('checked') ? 3 : 2),
							actionBy: $('#ns1blankspaceActionAddActionBy').attr('data-id'),
							status: $('input[name="radioActionStatus"]:checked').val()
						});
					})
					.css('width', '75px');
					
					var aHTML = [];

					aHTML.push('<table class="ns1blankspace">');

					aHTML.push('<tr><td class="ns1blankspaceCaption">Subject</td></tr>' + 
									'<tr><td><input id="ns1blankspaceActionAddSubject" class="ns1blankspaceText">' + 
									'</td></tr>');
					
					aHTML.push('<tr>' +
									'<td class="ns1blankspaceCaption">' +
									'Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceDate">' +
									'<input id="ns1blankspaceActionAddDate" class="ns1blankspaceDate">' +
									'</td></tr>');		

					// v3.1.202 Now filters out Emails and SMS types
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Type' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceActionAddType" class="ns1blankspaceSelect"' +
											' data-method="SETUP_ACTION_TYPE_SEARCH"' +
											' data-methodFilter="id-NOT_IN_LIST-5,9,10|title-TEXT_IS_LIKE"' + 
											' data-cache="true">' +
									'</td></tr>');		
											
					aHTML.push('<tr><td class="ns1blankspaceCaption">Description</td></tr>' + 
									'<tr><td>' +
									'<textarea rows="510 cols="35" id="ns1blankspaceActionAddDescription" class="ns1blankspaceTextMulti" style="width:100%; height:200px;"></textarea>' +
									'</td></tr>');

					aHTML.push('</table>');
					
					$('#ns1blankspaceEditColumn1').html(aHTML.join(''));

					$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

					$('#ns1blankspaceActionAddSubject').focus();

					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">');

					aHTML.push('<tr><td class="ns1blankspaceCheck">' +
										'<input type="checkbox" id="ns1blankspaceActionAddImportant"/>&nbsp;Important!<td></tr>');	
						
					aHTML.push('</td></tr>');				

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Status' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceRadio">' +
									'<input type="radio" id="radioActionStatus2" name="radioActionStatus" value="2"/>Not Started' +
										'<br /><input type="radio" id="radioActionStatus4" name="radioActionStatus" value="4"/>In Progress' +
										'<br /><input type="radio" id="radioActionStatus1" name="radioActionStatus" value="1"/>Completed' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Action By' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceActionAddActionBy" class="ns1blankspaceSelect"' +
											' data-method="SETUP_USER_SEARCH"' +
											' data-columns="user.contactperson.firstname-space-user.contactperson.surname"' +
											' data-methodFilter="user.contactperson.firstname-TEXT_IS_LIKE|user.contactperson.firstname-TEXT_IS_LIKE|username-TEXT_IS_LIKE">' +
									'</td></tr>');	
					
					aHTML.push('</table>');
					
					$('#ns1blankspaceEditColumn2').html(aHTML.join(''));

					$('input.ns1blankspaceDate').datetimepicker(
					{ 
						dateFormat: 'dd M yy',
						timeFormat: 'h:mm TT',
						stepMinute: 5,
						ampm: true
					});

					if (oResponse != undefined)
					{	
						if (oResponse.data.rows.length === 0)
						{	
							$('#ns1blankspaceActionAddSubject').val(oResponse.data.rows[0].subject.formatXHTML());
							$('#ns1blankspaceActionAddType').val(oResponse.data.rows[0].typetext.formatXHTML());
							$('#ns1blankspaceActionAddType').attr('data-id', oResponse.data.rows[0].type);
							$('#ns1blankspaceActionAddDescription').val(oResponse.data.rows[0].description);
							$('#ns1blankspaceActionAddActionBy').val(oResponse.data.rows[0].actionbytext.formatXHTML());
							$('#ns1blankspaceActionAddActionBy').attr('data-id', oResponse.data.rows[0].actionby);
							$('[name="radioActionStatus"][value="' + oResponse.data.rows[0].status + '"]').attr('checked', true);
						}	
					}
					else
					{
						$('#ns1blankspaceActionAddDate').val($.fullCalendar.formatDate(new Date(), 'dd MMM yyyy h:mm TT'));
						if (ns1blankspace.option.actionTypeDefault)
						{
							$('#ns1blankspaceActionAddType').val(ns1blankspace.option.actionTypeDefault.title.formatXHTML());
							$('#ns1blankspaceActionAddType').attr('data-id', ns1blankspace.option.actionTypeDefault.id);
						}
						$('[name="radioActionStatus"][value="1"]').attr('checked', true);
						$('#ns1blankspaceActionAddActionBy').val(ns1blankspace.user.logonName.formatXHTML());
						$('#ns1blankspaceActionAddActionBy').attr('data-id', ns1blankspace.user.id);
					}	
				}
			},

			save: 		function (oParam, oData, oResponse)
			{
				if (oResponse === undefined)
				{
					var oSaveData = {};
					var iType = ns1blankspace.data.actionTypes.fileNote;
					var iStatus = 1;
					var iHours;
					var dDate = Date.today().toString("dd-MMM-yyyy");
					var dEndDate;
					var iActionBy = ns1blankspace.user.id;
					var iObject = ns1blankspace.object;
					var iObjectContext = ns1blankspace.objectContext;
					var fPostSave = ns1blankspace.actions.show;
					
					if (oData != undefined)
					{
						if (oData.type != undefined) {iType = oData.type}
						if (oData.status != undefined) {iStatus = oData.status}
						if (oData.hours != undefined) {iHours = oData.hours}
						if (oData.date != undefined) {dDate = oData.date}
						if (oData.endDate != undefined) {dEndDate = oData.endDate}
						if (oData.actionBy != undefined) {iActionBy = oData.actionBy}
					
						oSaveData.object = iObject;
						oSaveData.objectcontext = iObjectContext;
						oSaveData.subject = oData.subject;
						oSaveData.description = oData.description;
						oSaveData.priority = oData.priority;
						oSaveData.status = iStatus;
						oSaveData.actiontype = iType;
						oSaveData.date = dDate;
						oSaveData.actionby = iActionBy;
						oSaveData.contactbusiness = oParam.contactBusiness;
						oSaveData.contactperson = oParam.contactPerson;
						
						if (iHours != undefined)
						{
							oSaveData.totaltimehours = iHours;
						}
						
						if (dEndDate != undefined)
						{
							oSaveData.enddate = dEndDate;
						}
						
						if (oData.otherData != undefined)
						{
							$.each(oData.otherData.split('&'), function()
							{
								if (this.toString() != '')
								{
									var aText = this.toString().split('=');
									oSaveData[aText[0]] = aText[1];
								}
							});
						}
							  
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
							data: oSaveData,
							dataType: 'json',
							success: function(data) {ns1blankspace.actions.show(oParam, oData, data);}
						});
					}
					else
					{
						
					}
				}
				else	
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.status.message('Action saved');
						fPostSave(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				}
			}				
		},

		notes:
		{
			search: function(oParam)
			{
				var iObject = ns1blankspace.util.getParam(oParam, 'object', {'default': ns1blankspace.object}).value;
				var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {'default': ns1blankspace.objectContext}).value;
				var iActionType = ns1blankspace.util.getParam(oParam, 'actionType', {'default': nsFreshcare.data.actionTypeUserNotes}).value;
				var aActionBy = ns1blankspace.util.getParam(oParam, 'actionBy').value;

				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('duedate,actionby,actionbytext,description,priority,createddate,modifieddate,modifieduser,modifiedusertext,actiontype,actiontypetext');
				oSearch.addFilter('object', 'EQUAL_TO', iObject);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
				oSearch.addFilter('actiontype', 'IN_LIST', iActionType);

				// v3.1.2 SUP022859 Added actionby filter
				if (aActionBy && aActionBy.length > 0)
				{
					oSearch.addFilter('actionby', 'IN_LIST', aActionBy.join(','));
				}

				oSearch.sort('duedate', 'desc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						nsFreshcare.internal.entity.notes.show(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error('Error finding notes: ' + oResponse.error.errornotes);
					}
				});
			},

			show: function(oParam, oResponse)
			{
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMainNotes'}).value;
				var bShowAdd = ns1blankspace.util.getParam(oParam, 'showAdd', {'default': false}).value;
				var oActions = ns1blankspace.util.getParam(oParam, 'actions', {'default': {add: false}}).value;
				var oContext = ns1blankspace.util.getParam(oParam, 'context', {'default': {inContext: false}}).value;
				var aHTML = [];

				aHTML.push('<table id="ns1blankspaceNotes" class="ns1blankspace">');
			
				aHTML.push('<tr class="ns1blankspaceCaption">');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">By</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">Type</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">Description</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">' +
								((oActions.add) ? '<span id="ns1blankspaceNotesAdd">&nbsp;</span>' : '&nbsp;') +
							'</td>');
				aHTML.push('</tr>');

				if (oResponse.data.rows.length === 0)
				{
					aHTML.push('<tr><td colspan="4">No notes.</td></tr>');
					aHTML.push('</table>');
					
					$('#' + sXHTMLElementID).html(aHTML.join(''));
					$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeed);
					nsFreshcare.internal.entity.notes.bind(oParam);
				}
				else
				{
					$.each(oResponse.data.rows, function()
					{	
						aHTML.push(nsFreshcare.internal.entity.notes.row(this));
					});
			    	
					aHTML.push('</table>');
					
					$.extend(true, oParam,
					{
						xhtmlElementID: sXHTMLElementID,
						xhtmlContext: 'Note',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows === 'true'),
						more: oResponse.moreid,
						rows: ns1blankspace.option.defaultRows,
						functionShowRow: nsFreshcare.internal.entity.notes.row,
						functionOnNewPage: nsFreshcare.internal.entity.notes.bind
					});
					ns1blankspace.render.page.show(oParam); 
				}
			},

			postSave: function(oParam)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainNotes', refresh: true});
				nsFreshcare.internal.entity.notes.search(oParam);
			},

			row: function(oRow)
			{
				var aHTML = [];
				var sClass = (oRow.priority === '3') ? ' nsFreshcareImportant' : '';
				var sClassEdit = (nsFreshcare.user.role.toLowerCase() === 'admin' 
									|| (nsFreshcare.user.role.toLowerCase() === 'auditor' && oRow.actionbytext === ns1blankspace.user.logonName)) 
								? ' nsFreshcareNoteEdit' 
								: '';
				var sCreated = oRow.createddate.substr(0, oRow.createddate.length - 3);
				var sModified = oRow.modifieddate.substr(0, oRow.modifieddate.length - 3);

				aHTML.push('<tr id="ns1blankspaceNoteRow-' + oRow.id + '">');

				aHTML.push('<td id="ns1blankspaceNote_date-' + oRow.id + '" class="ns1blankspaceRow' + sClass + '"' +'>' +
								sCreated + 
								((oRow['modifieddate'] != oRow.createddate) 
									? '<br /><span style="font-size:0.75em;color:#A4A4A4;">(Modified ' + sModified + '<br />&nbsp;by ' + oRow.modifiedusertext + ')</span>'
									: '') + 
								'</td>');

				aHTML.push('<td id="ns1blankspaceNote_by-' + oRow.id + '" class="ns1blankspaceRow' + sClass + '">' +
								oRow.actionbytext.formatXHTML() + 
								'</td>');

				aHTML.push('<td id="ns1blankspaceNote_type-' + oRow.id + '" class="ns1blankspaceRow' + sClass + '"' +'>' +
								oRow.actiontypetext.formatXHTML() + '</td>');

				aHTML.push('<td id="ns1blankspaceNote_description-' + oRow.id + '" class="ns1blankspaceRow' + sClass + sClassEdit + '"' +
								' data-fieldname="description">' +
								oRow.description.formatXHTML() + '</td>');

				aHTML.push('<td class="ns1blankspaceRow">' +
								'<span id="ns1blankspaceNote_priority-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowPriority"' +
									' data-priority="' + oRow.priority + '">' +
									'&nbsp;</span>' +
								((nsFreshcare.user.role.toLowerCase() === 'admin')
									? '<span id="ns1blankspaceNote_remove-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceNoteRemove"' +
										' data-rowID="' + oRow.id + '">' +
										'&nbsp;</span>' 
									: '') +
							'</td>');

				aHTML.push('</td>')

				return aHTML.join('');
			},

			bind: function(oParam)
			{
			
				// v3.1.0i SUP022250 Now binds only visible elements
				$('.ns1blankspaceRowPriority:visible')
					.button({icons: {primary: 'ui-icon-notice'}})
					.on('click', function()
					{
						nsFreshcare.internal.entity.notes.setPriority({xhtmlElementID: this.id, priority: $(this).attr('data-priority')});
					})
					.css('height', '25px')
					.css('width', '25px');

				$(".ns1blankspaceRowPriority[data-priority='2']")
					.css('color', 'red');

				$('#ns1blankspaceNotesAdd:visible')
					.button(
					{
						text: false,
						label: 'Add note',
						icons: {primary: 'ui-icon-plus'}
					})
					.on('click', function()
					{
						oParam.functionPostSave = nsFreshcare.internal.entity.notes.postSave;
						oParam.contactBusiness = ns1blankspace.data.contactBusiness
						nsFreshcare.internal.entity.notes.add(oParam);
					});

				$('.nsFreshcareNoteEdit:visible')
					.css('cursor', 'pointer')
					.on('click', function(event)
					{
						nsFreshcare.util.elementEdit.start(
							{
								xhtmlElementID: event.target.id,
								save: true,
								method: 'ACTION_MANAGE',
								mandatory: true,
								onComplete: nsFreshcare.util.elementEdit.stop
							});
					});

				$('.ns1blankspaceNoteRemove:visible')
					.button({label: 'Remove', text: false, icons: {primary: 'ui-icon-close'}})
					.css('width', '25px')
					.css('height', '25px')
					.on('click', function()
					{
						if (ns1blankspace.xhtml.divID === this.id) 
						{
							$(ns1blankspace.xhtml.container).html('');
							$(ns1blankspace.xhtml.container).hide();
							ns1blankspace.xhtml.divID = '';
						}
						else 
						{
							ns1blankspace.xhtml.divID = this.id;

							var iRowID = ($(this).attr("data-rowid")) ? $(this).attr("data-rowid") : 'New';
							
							var aHTML = [];

							aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
										'<td><span id="ns1blankspaceNoteInactivate_' + iRowID + '"' +
											' class="ns1blankspaceSearch" data-parentid="' + this.id + '">' +
											'Remove</span></td>' +
										'</tr></table>');

							$(ns1blankspace.xhtml.container).html(aHTML.join(''));
							$(ns1blankspace.xhtml.container).show();
							$(ns1blankspace.xhtml.container).offset(
							{ 
								top: $('#' + ns1blankspace.xhtml.divID).offset().top,
								left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
							});

							$('#ns1blankspaceNoteInactivate_' + iRowID)
								.css('cursor', 'pointer')
								.click(function(event) 
								{
									var sID = this.id.split('_').pop();
									var oParentElement = $(this).attr('data-parentid');
									$(ns1blankspace.xhtml.container).html('');
									$(ns1blankspace.xhtml.container).hide();
									
									if (sID != '' && sID != undefined)
									{
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
											data: 'remove=1&id=' + sID,
											success: function(oResponse)
											{
												if (oResponse.status === 'OK')
												{
													$($('#' + oParentElement).parent().parent()).remove();
												}
												else
												{
													ns1blankspace.status.error('Error removing note: ' + oResponse.error.errornotes);
												}
											}
										});
									}
									
								});
						}
					});
			},

			add: function(oParam)
			{
				var sXHTMLElementID = 'divInterfaceMasterViewportControlOptions';
				var iObject = ns1blankspace.util.getParam(oParam, 'object', {'default': ns1blankspace.object}).value;
				var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {'default': ns1blankspace.objectContext}).value;
				var bAll = ns1blankspace.util.getParam(oParam, 'all', {'default': false}).value;;
				var fFunctionPostSave = ns1blankspace.util.getParam(oParam, 'functionPostSave', {'default': nsFreshcare.internal.entity.notes.search}).value;
				var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness').value;
				var bShowReminder = ns1blankspace.util.getParam(oParam, 'showReminder', {'default': false}).value;
				var aHTML = [];
				
				aHTML.push('<table id="ns1blankspaceAddNote">');
				
				aHTML.push('<tr><td class="ns1blankspace">' +
									'Note<td></tr>' +
									'<tr><td class="ns1blankspace">' +
									'<textarea rows="10" cols="35" id="ns1blankspaceAddNoteDescription" class="ns1blankspaceTextMulti"></textarea>' +
									'</td></tr>');
									
				aHTML.push('<tr><td><input type="checkbox" id="ns1blankspaceAddNoteHighPriority"/>&nbsp;Important?' + 
							'</td></tr>');
					
				if (bShowReminder)
				{
					aHTML.push('<tr><td>' + 
									'<span> Send me a reminder on: </span><span><input id="ns1blankspaceAddNoteReminder" style="width:100px;" class="ns1blankspaceDate"/></span>' + 
								'</td></tr>');
				}

				aHTML.push('<tr><td id="ns1blankspaceAddNoteStatus" style="font-size:0.75em; color: red;"></td></tr>');
					
				aHTML.push('</table>');						
				
				$('#divInterfaceDialog').html(aHTML.join(''));

				$('#ns1blankspaceAddNoteDescription')
					.on('change', function()
					{
						if ($('#ns1blankspaceAddNoteStatus').html() != '')
						{
							$('#ns1blankspaceAddNoteStatus').html('');
						}
					});
				
				$('#divInterfaceDialog').dialog(
				{
					width: 300,
					resizable: false,
					modal: true,
					title: 'Add Note',
					open: function()
					{	// bind the date
						$('.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});
					},
					buttons: 
					{
						"Cancel": function() 
						{
							$( this ).dialog( "close" );
						},
						"Add Note": function(event) 
						{
							var bReminderValid = !bShowReminder;
							if (!bReminderValid) {bReminderValid = $('#ns1blankspaceAddNoteReminder').val() === ''}
							if (!bReminderValid) 
							{
								bReminderValid = isValidDate($('#ns1blankspaceAddNoteReminder').val(), 'dd mmm yyyy') 
												 && new Date($('#ns1blankspaceAddNoteReminder').val() + ' 23:59:59') > dToday; 
							}

							if ($('#ns1blankspaceAddNoteDescription').val() != '' && bReminderValid)
							{
								var oData = 
								{
									id: '',
									title: '',
									description: $('#ns1blankspaceAddNoteDescription').val().formatXHTML(),
									type: nsFreshcare.data.actionTypeUserNotes,
									priority: ($('#ns1blankspaceAddNoteHighPriority').attr('checked') ? '3' : '2'),
									status: '1', /* completed */
									contactbusiness: iContactBusiness,
									object: iObject,
									objectContext: iObjectContext,
									duedate: (bReminderValid) ? $('#ns1blankspaceAddNoteReminder').val() : dToday.toString('dd MMM yyyy')
								}
								oParam.data = oData;
								oParam.onComplete = fFunctionPostSave;
								oParam.dialogElementID = this.id;

								nsFreshcare.internal.entity.notes.save(oParam);
							}
							else
							{
								if (bReminderValid)
								{
									$('#ns1blankspaceAddNoteStatus').html('Please enter a note!');
								}
								else
								{
									$('#ns1blankspaceAddNoteStatus').html('Reminder date must be a valid date after today!');
								}
							}
						}
					}
				});
			},

			setPriority: function(oParam)
			{
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
				var iPriority = ns1blankspace.util.getParam(oParam, 'priority', {'default': '3'}).value;
				var iRowID = sXHTMLElementID.split('-').pop();
				var sData = 'id=' + iRowID + '&priority=' + ((iPriority === '2') ? '3' : '2');

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
					data: sData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							if (iPriority === '2')		// Low
							{
								$('#' + sXHTMLElementID).attr('data-priority', '3');
								$("#ns1blankspaceNoteRow-" + iRowID + ' .ns1blankspaceRow')
									.addClass('nsFreshcareImportant');
							}
							else 					// Important
							{
								$('#' + sXHTMLElementID).attr('data-priority', '2');
								$("#ns1blankspaceNoteRow-" + iRowID + ' .ns1blankspaceRow')
									.removeClass('nsFreshcareImportant');
							}
						}
						else
						{
							ns1blankspace.status.error('Unable to update importance: ' + oResponse.error.errornotes);
						}
					}
				});
			},

			save: function(oParam)
			{
				var oData = ns1blankspace.util.getParam(oParam, 'data').value;
				var sDialogElementID = ns1blankspace.util.getParam(oParam, 'dialogElementID').value;

				if (oData != undefined)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								$('#' + sDialogElementID).dialog( "close" );
								delete(oParam.data);
								if (oParam.onComplete)
								{
									ns1blankspace.util.onComplete(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error('Unable to save Note: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					ns1blankspace.status.error('Unable to save Note: no data passed');
				}
				
			}
		},

		emails:
		{
			bind: function(oParam)
			{
				// v3.0.1a changed to nsFreshcareEmailView
				// v3.1.0i SUP022250 Now binds only visible elements

				var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID', {"default": 'ns1blankspaceRenderPage_Emails-0'}).value;

				// v3.1.1f copied below from admin.grower.emails
				$('.ns1blankspaceRowActionMessage').hide();

				//v3.0.1a SUP021899 changed to RowShow
				// v3.1.1i Limited to current cotnainer
				$('#' + sXHTMLContainerID + ' .ns1blankspaceRowShow').click(function()
				{
					var iActionId = this.id.split('-').pop();
					var aHTML = [];

					nsFreshcare.admin.grower.emails.detail.show({xhtmlElementID: this.id});

				});

				// v3.1.1i Limited to current cotnainer
				$('#' + sXHTMLContainerID + ' span.ns1blankspaceRowSelect')
					.button(
					{
						text: false,
						label: 'View / Edit',
						icons: {primary: 'ui-icon-play'}
					})
					.css('width', '15px')
					.css('height', '17px')
					.click(function()
					{
						ns1blankspace.action.init({id: (this.id).split('-').pop()});
					});

				ns1blankspace.actions.bind(oParam);
			},

			row: function(oRow, oParam)
			{	// v3.1.1f Moved from grower.admin.emails
				var aHTML = [];
				var bAdmin = (nsFreshcare.user.role.toLowerCase() === 'admin');

				// v3.1.0c remove draft emails from the list
				if (oRow.actiontype == '5' && oRow.emailsent == 'N')
				{
					return '';
				}
				else
				{
					aHTML.push('<tr id="ns1blankspaceActionRow-' + oRow.id + '">');

					if (bAdmin)
					{
						aHTML.push('<td class="ns1blankspaceRow">' +
										'<span id="ns1blankspaceAction_type-' + oRow.id + '" class="ns1blankspaceRow">');
						if (oRow.actiontype === '5')		// outgoing email
						{
							aHTML.push('<img src="/site/' + nsFreshcare.site + '/outgoing-email-icon_15x24.jpg">')
						}
						if (oRow.actiontype === '9')		// incoming email
						{
							aHTML.push('<img src="/site/' + nsFreshcare.site + '/incoming-email_15x24.jpg">')
						}
						if (oRow.actiontype === '10')		// sms
						{
							aHTML.push('<img src="/site/' + nsFreshcare.site + '/sms-icon_15x24.jpg">')
						}
						aHTML.push('</span></td>');
					}

					aHTML.push('<td id="ns1blankspaceAction_date-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow ns1blankspaceRowShow">' +
									oRow.duedate.formatXHTML() + '</td>');

					aHTML.push('<td id="ns1blankspaceAction_subject-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow ns1blankspaceRowShow">' +
									oRow.subject.formatXHTML() + '</td>');

					//v3.1.0 SUP022052  Added Action By
					aHTML.push('<td id="ns1blankspaceAction_actionby-' + oRow.id + '" style="font-size:0.75em;" class="ns1blankspaceRow">' +
									oRow.actionbytext + '</td>');

					if (bAdmin)
					{
						aHTML.push('<td class="ns1blankspaceRow">' +
										'<span id="ns1blankspaceAction_options_select-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
											'&nbsp;</span>' +
									'</td>');
					}

					aHTML.push('</tr>');

					// v2.0.4 SUP021483 Now puts unformatted message into td as was causing some rows not to show
					aHTML.push('<tr id="ns1blankspaceActionRow_Message-' + oRow.id + '"' +
									' class="ns1blankspaceRowActionMessage" data-dateTime="' + oRow.duedatetime + '">' +
								'<td id="ns1blankspaceAction_Message-' + oRow.id + '" colspan="4"' +
									' style="border: 2px solid #DCDCDC; padding: 10px; margin: 10px; background-color: #F2F2F2;">' + 
									oRow.message + '</td>' +
								'</tr>');
					return aHTML.join('');
				}
			}
		},

		relationships:
		{
			search: function(oParam)
			{
				// We only get the busines relationships - the rest should fall into place from here for Growers, Trainers, etc
				var sRelationshipTypes = ns1blankspace.util.getParam(oParam, 'relationshipTypes').value;

				if (ns1blankspace.objectContextData.relationships === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
					oSearch.addField('contactbusiness,contactbusinesstext,contactperson,contactpersontext,' +
									'othercontactbusiness,othercontactbusinesstext,othercontactperson,othercontactpersontext,startdate,enddate,type,typetext');
					oSearch.addBracket('(');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addOperator('or');
					oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addBracket(')');
					if (sRelationshipTypes)
					{
						oSearch.addFilter('type', 'IN_LIST', sRelationshipTypes);
					}
					oSearch.sort('type', 'asc');
					oSearch.sort('startdate', 'asc');
					//oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.relationshipAuditor);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.objectContextData.relationships = oResponse.data.rows;
							ns1blankspace.objectContextData.relationshipMoreRows = oResponse.morerows;
							ns1blankspace.objectContextData.relationshipMoreID = oResponse.moreid;
							nsFreshcare.internal.entity.relationships.search(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding Relationships: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
			},

			show: function(oParam)
			{
				var aHTML = [];
				oParam = (oParam === undefined) ? {} : oParam;

				if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.relationships === undefined)
				{
					oParam.onComplete = nsFreshcare.internal.entity.relationships.show;
					nsFreshcare.internal.entity.relationships.search(oParam);
				}
				else
				{
					// We need to display both 'directions' of relationships
					$('#ns1blankspaceMainRelationships').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceEntityRelationshipsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceEntityRelationshipsColumn2" class="ns1blankspaceColumn2Action" style="width:100px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainRelationships').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td>' +
									'<span id="ns1blankspaceEntityRelationshipsAdd" class="ns1blankspaceAction">Add</span>' +
									'</td></tr>');
									
					aHTML.push('</table>');					
					
					$('#ns1blankspaceEntityRelationshipsColumn2').html(aHTML.join(''));
					
					$('#ns1blankspaceEntityRelationshipsAdd').button(
					{
						label: "Add"
					})
					.click(function() 
					{	
						delete(nsFreshcare.admin.relationships.data.lastSavedBusiness);
						nsFreshcare.admin.relationships.init(
						{
							contactBusiness: ns1blankspace.objectContext,
							contactBusinessText: ns1blankspace.data.contactBusinessText,
							contactPerson: ns1blankspace.data.contactPerson,
							contactPersonText: ns1blankspace.data.contactPersonText,
							"new": true
						});
					})
					.css('width', '75px')
					
					aHTML = [];
					
					if (ns1blankspace.objectContextData.relationships.length == 0)
					{
						aHTML.push('<table border="0" cellspacing="0" cellpadding="0" width="750" style="margin-top:15px); margin-bottom:15px);">');
						aHTML.push('<tr>');
						aHTML.push('<td class="ns1blankspaceNothing">No relationships.</td>');
						aHTML.push('</tr>');
						aHTML.push('</table>');

						$('#ns1blankspaceEntityRelationshipsColumn1').html(aHTML.join(''));		
					}
					else
					{
					
						aHTML.push('<table border="0" cellspacing="0" cellpadding="0" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Business</td>' + 
								        /*'<td class="ns1blankspaceHeaderCaption">Person</td>' + */
								        '<td class="ns1blankspaceHeaderCaption">Type</td>' + 
								        '<td class="ns1blankspaceHeaderCaption">Business</td>' + 
								        /*'<td class="ns1blankspaceHeaderCaption">Person</td>' + */
								        '<td class="ns1blankspaceHeaderCaption">Start</td>' + 
								        '<td class="ns1blankspaceHeaderCaption">End</td>' + 
								        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
								    '</tr>');
						
						$.each(ns1blankspace.objectContextData.relationships, function() 
						{
							aHTML.push(nsFreshcare.internal.entity.relationships.row(this));
						});

						aHTML.push('</table>');

						ns1blankspace.render.page.show(
						{
							xhtmlElementID: 'ns1blankspaceEntityRelationshipsColumn1',
							xhtmlContext: 'EntityRelationships',
							xhtml: aHTML.join(''),
							showMore: (ns1blankspace.objectContextData.relationshipMoreRows == "true"),
							more: ns1blankspace.objectContextData.relationshipMoreID,
							rows: ns1blankspace.option.defaultRows,
							functionShowRow: nsFreshcare.internal.entity.relationships.row,
							functionOnNewPage: nsFreshcare.internal.entity.relationships.bind,
							type: 'json'
						}); 	
						
						//nsFreshcare.internal.entity.relationships.bind();
					}
				}
			},

			row: function(oRow)
			{
				var aHTML = [];
				var sContactPerson = oRow.contactpersontext.formatXHTML();
				var sOtherContactPerson = oRow.othercontactpersontext.formatXHTML();

				sContactPerson = (sContactPerson.split(', ').length > 1) ? sContactPerson.split(', ').pop() + ' ' + sContactPerson.split(', ').shift() : sContactPerson;
				sOtherContactPerson = (sOtherContactPerson.split(', ').length > 1) ? sOtherContactPerson.split(', ').pop() + ' ' + sOtherContactPerson.split(', ').shift() : sOtherContactPerson;

				aHTML.push('<tr id="ns1blankspaceEntityRelationshipRow_' + oRow.id + '" class="ns1blankspaceEntityRelationshipRow">');

				aHTML.push('<td class="ns1blankspaceRow ns1blankspaceEntityRelationshipContactBusiness"' + 
								' id="ns1blankspaceEntityRelationshipValue_business_' + oRow.id + '"' +
								' data-contactbusiness="' + oRow['contactbusiness'] + '"' + 
								' data-relationshiptype="' + oRow['type'] + '"' + 
								' data-businesstype="primary"' + 
								'>' +
									oRow["contactbusinesstext"] + 
									((sContactPerson != '') ? '<br /><span style="font-size:0.75em; color:#C0C0C0;">(' + sContactPerson + ')</span>' : '') + 
								'</td>');

				aHTML.push('<td class="ns1blankspaceRow"' + 
								' id="ns1blankspaceEntityRelationshipValue_type_' + oRow.id +  '"' +
								'>' +
									'is <b>' +  oRow["typetext"] + '</b> for ' +
								'</td>');

				aHTML.push('<td class="ns1blankspaceRow ns1blankspaceEntityRelationshipContactBusiness"' + 
								' id="ns1blankspaceEntityRelationshipValue_othercontactbusiness_' + oRow.id + '"' +
								' data-contactbusiness="' + oRow['othercontactbusiness'] + '"' + 
								' data-relationshiptype="' + oRow['type'] + '"' + 
								' data-businesstype="other"' + 
								'>' +
									oRow["othercontactbusinesstext"] + 
									((sOtherContactPerson != '') ? '<br /><span style="font-size:0.75em; color:#C0C0C0;">(' + sOtherContactPerson + ')</span>' : '') + 
								'</td>');
				
				aHTML.push('<td class="ns1blankspaceRow"' + 
								' id="ns1blankspaceEntityRelationshipValue_startdate' + oRow.id + '"' +
								'>' +
									oRow['startdate'] + 
								'</td>');

				aHTML.push('<td class="ns1blankspaceRow"' + 
								' id="ns1blankspaceEntityRelationshipValue_enddate' + oRow.id +  '"' +
								'>' +
									oRow['enddate'] + 
								'</td>');

				aHTML.push('<td width="65px">' +
								'<span id="ns1blankspaceEntityRelationshipRemove_' + oRow.id + '" ' + 
									'class="ns1blankspaceAction ns1blankspaceEntityRelationshipRemove" ' + 
									'data-rowID="' + oRow.id + '" data-action="remove">Remove</span>&nbsp;' + 
								'<span id="ns1blankspaceEntityRelationshipShow_' + oRow.id + '" ' + 
									'class="ns1blankspaceAction ns1blankspaceEntityRelationshipShow" ' + 
									'data-rowID="' + oRow.id + '">Go To</span>' + 
								'</td>');

				return aHTML.join('');
			},

			bind: function()
			{
				// v3.1.0i SUP022250 Now binds only visible elements
				// v3.1.1 SUP022449 Visible element binding not working so now restricts to current page
				var sPageId = $('.ns1blankspaceRenderPage_EntityRelationships:visible').first().attr('id');

				$('#'+ sPageId + ' .ns1blankspaceEntityRelationshipRemove')
					.button(
					{
						text: false,
						label: 'Remove Relationship',
						icons: {primary: 'ui-icon-close'}
					})
					.on('click', function(event)
					{
						var oParam = {xhtmlElementID: this.id};
						nsFreshcare.internal.entity.relationships.remove(oParam);
					});

				$('#'+ sPageId + ' .ns1blankspaceEntityRelationshipShow')
					.button(
					{
						text: false,
						label: 'Open Relationship',
						icons: {primary: 'ui-icon-play'}
					})
					.on('click', function(event)
					{
						var oParam = {xhtmlElementID: 'ns1blankspaceMainDetails', id: $(this).attr('data-rowID')};
						nsFreshcare.admin.relationships.init(oParam);
					});

				$('#'+ sPageId + ' .ns1blankspaceEntityRelationshipContactBusiness')
					.css('cursor', 'pointer')
					.on('click', function(event)
					{
						var iBusinessId = $(this).attr('data-contactbusiness');
						var oRoot = ns1blankspace.rootnamespace;

						if ($(this).attr('data-businesstype') === 'primary')
						{
							if ($(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipAuditor)
							{
								nsFreshcare.admin.certificationbody.init({id: iBusinessId});
							}
							else if ($(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipTrainer)
							{
								nsFreshcare.admin.trainer.init({id: iBusinessId});
							}
							else if ($(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipCustomer)
							{
								nsFreshcare.admin.customer.init({id: iBusinessId});
							}
							else if ($(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipSupplier)
							{
								oRoot.admin.grower.init({id: iBusinessId});
							}
							else
							{
								ns1blankspace.contactBusiness.init({id: iBusinessId});
							}
						}
						else if ($(this).attr('data-businesstype') === 'other')
						{
							if ($(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipSupplier)
							{
								nsFreshcare.admin.customer.init({id: iBusinessId});
							}
							else if ($(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipAuditor 
								|| $(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipParentBusiness 
								|| $(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipTrainer
								|| $(this).attr('data-relationshiptype') === nsFreshcare.data.relationshipCustomer)
							{
								oRoot.admin.grower.init({id: iBusinessId});
							}
							else
							{
								ns1blankspace.contactBusiness.init({id: iBusinessId});
							}
						}
						else
						{
							ns1blankspace.contactBusiness.init({id: iBusinessId});
						}
						
					});
			},

			add: function(oParam)
			{
				
			},

			remove:  function(oParam)
			{
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;

				if (ns1blankspace.xhtml.divID === sXHTMLElementID) 
				{
					$(ns1blankspace.xhtml.container).html('');
					$(ns1blankspace.xhtml.container).hide();
					ns1blankspace.xhtml.divID = '';
				}
				else 
				{
					ns1blankspace.xhtml.divID = sXHTMLElementID;

					var iRowID = ($('#' + sXHTMLElementID).attr("data-rowID")) ? $('#' + sXHTMLElementID).attr("data-rowID") : 'New';
					
					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
								'<td><span id="ns1blankspaceRelationshipRemove_' + iRowID + '" class="ns1blankspaceSearch">Remove</span></td>' +
								'</tr></table>');

					$(ns1blankspace.xhtml.container).html(aHTML.join(''));
					$(ns1blankspace.xhtml.container).show();
					$(ns1blankspace.xhtml.container).offset(
					{ 
						top: $('#' + ns1blankspace.xhtml.divID).offset().top,
						left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
					});

					$('#ns1blankspaceRelationshipRemove_' + iRowID).on('click', function(event) 
					{

						var sID = this.id.split('_').pop();
						$(ns1blankspace.xhtml.container).html('');
						$(ns1blankspace.xhtml.container).hide();
						
						nsFreshcare.internal.entity.relationships.save({id: sID, 
																remove: true, 
																onComplete: nsFreshcare.internal.entity.relationships.show});
					});
				}
			},

			edit: function(oParam)
			{

			},

			save:  function(oParam)
			{
				sData = '';
				sID = '';
				bRemove = false;

				if (oParam)
				{
					if (oParam.id) {sID = oParam.id} 
					if (oParam.remove != undefined) {bRemove = oParam.remove}
				}

				if (bRemove && sID != '')
				{
					sData += 'id=' + sID + '&remove=1';
				}
				else if (!bRemove)
				{
					sData += 'id=' + sID +
							((oParam.contactbusiness) ? '&contactbusiness=' + oParam.contactbusiness : '') + 
							((oParam.contactperson) ? '&contactperson=' + oParam.contactperson  : '') + 
							((oParam.type) ? '&type=' + oParam.type  : '') + 
							((oParam.othercontactbusiness) ? '&othercontactbusiness=' + oParam.othercontactbusiness  : '') + 
							((oParam.othercontactperson) ? '&othercontactperson=' + oParam.othercontactperson  : '') + 
							((oParam.startdate) ? '&startdate=' + ns1blankspace.util.fs(oParam.startdate)  : '') + 
							((oParam.endddate) ? '&enddate=' + ns1blankspace.util.fs(oParam.enddate)  : '')
				}

				if (sData != '')
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
						data: sData,
						dataType: 'json',
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								ns1blankspace.status.message('Relationship ' + ((bRemove) ? 'removed' : ((sID === '') ? 'added' : 'saved') + '.'));
								if (oParam.onComplete)
								{
									delete(ns1blankspace.objectContextData.relationships);
									ns1blankspace.util.onComplete(oParam);
								}
							}
							else
							{
								ns1blankspace.status.error('Unable to ' + ((bRemove) ? 'remove' : ((sID === '') ? 'add' : 'save') + ' relationship'));
							}
						}
					});
				}
			}
		},

		user:
		{
			getDetails: function(oParam)
			{
				var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson', {'default': ''}).value;
				var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness', {'default': ''}).value;

				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_USER_SEARCH';
				oSearch.addField('username,contactbusiness,contactperson,disabled,se' + nsFreshcare.data.userPasswordId + ',' +
								'user.contactperson.supplierstatus,user.contactperson.customerstatus');
				oSearch.addBracket('(');
				if (iContactPerson != '')
				{	
					oSearch.addFilter('contactperson', 'EQUAL_TO', iContactPerson);	
					oSearch.addOperator('or');
				}
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', iContactBusiness);
				oSearch.addBracket(')');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.objectContextData.user = oResponse.data.rows;
						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
					else
					{
						ns1blankspace.status.error('Error finding user: ' + oResponse.error.errornotes);
					}
				});
			},

			add: 
			{
				show: function(oParam)
				{
					var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementUserID').value;
					sXHTMLElementID = (sXHTMLElementID) ? sXHTMLElementID : ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
					var bCustomUserName = ns1blankspace.util.getParam(oParam, 'customUserName', {'default': false}).value;
					var sPrefix = ns1blankspace.util.getParam(oParam, 'prefix', {'default': ''}).value;
					var aHTML = [];
					oParam = (oParam === undefined) ? {} : oParam;

					if ($(ns1blankspace.xhtml.container).is(':visible')) 
					{
						$(ns1blankspace.xhtml.container).hide();
						$(ns1blankspace.xhtml.container).html(''); 

					}
					else 
					{
						aHTML.push('<table class="ns1blankspaceSearchMedium"><tr>' +
										'<td class="ns1blankspaceCaption" style="font-size:0.875em;">Enter user name' + ((bCustomUserName) ? '' : ' prefix') +':</td></tr>');

						aHTML.push('<tr><td><input id="ns1blankspaceSummaryUserPrefix" class="ns1blankspaceText"' +
											' style="width:' + ((bCustomUserName) ? '200' : '120') + 'px;" value="' + sPrefix + '">' +
										'&nbsp;' +
										((bCustomUserName) ? '' : '<span style="font-size:0.875em;">@' + nsFreshcare.data.userNameSuffix + '</span>') +
										'</td></tr>');

						aHTML.push('<tr><td><span id="ns1blankspaceSummaryUserAddGo" class="ns1blankspaceAction">' +
										'Add User</td></tr>');

						aHTML.push('</table>');

						ns1blankspace.container.position({xhtmlElementID: sXHTMLElementID, topOffset: 10, setWidth: true});
						$(ns1blankspace.xhtml.container).show();
						$(ns1blankspace.xhtml.container).html(aHTML.join(''));

						$('#ns1blankspaceSummaryUserAddGo')
						.button(
						{
							label: 'Add'
						})
						.click(function() 
						{
							if ($('#ns1blankspaceSummaryUserPrefix').val() === '')
							{
								ns1blankspace.status.error('You must enter a user name prefix.');
							}
							else
							{
								oParam.userName = $('#ns1blankspaceSummaryUserPrefix').val() + ((!bCustomUserName) ? '@' + nsFreshcare.data.userNameSuffix : '');
								$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
								$(ns1blankspace.xhtml.container).html(''); 
								nsFreshcare.internal.entity.user.add.process(oParam);
							}
						});
					}
				},

				process: function(oParam)
				{
					var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson', {'default': ''}).value;
					var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness', {'default': ''}).value;
					var sUserName = ns1blankspace.util.getParam(oParam, 'userName').value;
					var sRole = ns1blankspace.util.getParam(oParam, 'role').value;
					var sData = '';
					var dToday = new Date();

					if (oParam && oParam.addUserStep === undefined) {oParam.addUserStep = 1}

					if (iContactPerson && sUserName && sRole)
					{
						// Save user
						if (oParam.addUserStep === 1)
						{
							ns1blankspace.status.working();
							sData += 'username=' + ns1blankspace.util.fs(sUserName) +
									'&contactbusiness=' + ((iContactBusiness) ? iContactBusiness : ns1blankspace.user.contactBusiness) +
									'&contactperson=' + iContactPerson +
									'&unrestrictedaccess=Y' +
									'&disabled=N' +
									'&passwordexpiry=' + dToday.toString('dd MMM yyyy');

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.working('User record added');
										oParam.userID = oResponse.id;
										oParam.initialPassword = oResponse.password;
										oParam.addUserStep = 2;
										nsFreshcare.internal.entity.user.add.process(oParam);
									}
									else
									{
										ns1blankspace.status.error('Unable to create user record: ' + oResponse.error.errornotes);
									}
								}
							});
						}

						// Save initial password to user record
						else if (oParam.addUserStep === 2)
						{
							sData = 'id=' + oParam.userID + 
									'&se' + nsFreshcare.data.userPasswordId + '=' + oParam.initialPassword;

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
								data: sData,
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.working('Initial password saved');
										oParam.addUserStep = 3;
										nsFreshcare.internal.entity.user.add.process(oParam);
									}
									else
									{
										ns1blankspace.status.error('Unable to save initial password: ' + oResponse.error.errornotes);
									}
								}
							});
						}

						// Add role - search for list of roles first
						else if (oParam.addUserStep === 3)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'SETUP_ROLE_SEARCH';
							oSearch.addField('title');
							oSearch.addFilter('title', 'EQUAL_TO', sRole);
							oSearch.getResults(function(oResponse) 
							{
								if (oResponse.status === 'OK')
								{
									oParam.userRoles = oResponse.data.rows;
									oParam.addUserStep = 4;
									nsFreshcare.internal.entity.user.add.process(oParam)
								}
								else
								{
									ns1blankspace.status.error('Unable to find user roles: ' + oResponse.error.errornotes);
								}
							});
						}

						// Now add relevant role
						else if (oParam.addUserStep === 4)
						{
							var iRole = (oParam.userRoles.length > 0) ? oParam.userRoles[0].id : undefined;
							if (iRole)
							{
								sData = 'user=' + oParam.userID + 
										'&role=' + iRole;

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('SETUP_USER_ROLE_MANAGE'),
									data: sData,
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											ns1blankspace.status.working('Role ' + sRole + ' added.');
											oParam.addUserStep = 5;
											nsFreshcare.internal.entity.user.add.process(oParam);
										}
										else
										{
											ns1blankspace.status.error('Unable to add role ' + sRole + ': ' + oResponse.error.errornotes);
										}
									}
								});
							}
							else
							{
								ns1blankspace.status.error('Unable to add role: ' + sRole + ' does not exist.');
							}
						}

						// Add network group - search for list of network groups first
						else if (oParam.addUserStep === 5)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'SETUP_NETWORK_GROUP_SEARCH';
							oSearch.addField('title');
							oSearch.addFilter('title', 'EQUAL_TO', sRole);
							oSearch.getResults(function(oResponse) 
							{
								if (oResponse.status === 'OK')
								{
									oParam.networkGroups = oResponse.data.rows;
									oParam.addUserStep = 6;
									nsFreshcare.internal.entity.user.add.process(oParam)
								}
								else
								{
									ns1blankspace.status.error('Unable to find network groups: ' + oResponse.error.errornotes);
								}
							});
						}

						// Now add relevant network group
						else if (oParam.addUserStep === 6)
						{
							var iNetworkGroup = (oParam.networkGroups.length > 0) ? oParam.networkGroups[0].id : undefined;
							if (iNetworkGroup)
							{
								sData = 'user=' + oParam.userID + 
										'&networkgroup=' + iNetworkGroup +
										'&type=1';

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('SETUP_USER_NETWORK_GROUP_MANAGE'),
									data: sData,
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											ns1blankspace.status.working('Network Group ' + sRole + ' added.');
											oParam.addUserStep = 10;
											nsFreshcare.internal.entity.user.add.process(oParam);
										}
										else
										{
											ns1blankspace.status.error('Unable to add network group ' + sRole + ': ' + oResponse.error.errornotes);
										}
									}
								});
							}
							else
							{
								ns1blankspace.status.error('Unable to add network group: ' + sRole + ' does not exist.');
							}
						}

						// Call back function
						else if (oParam.addUserStep === 10)
						{
							ns1blankspace.status.clear();
							if (oParam.onComplete)
							{
								oParam.xhtmlElementID = '-' + ns1blankspace.objectContext;
								ns1blankspace.inputDetected = false;
								ns1blankspace.util.onComplete(oParam);
							}
						}
					}
					else
					{
						if (iContactPerson === undefined || iContactPerson === '')
						{
							ns1blankspace.status.error('You must chose a primary contact to be the user representative.');
						}
						else if (sUserName === undefined || sUserName === '')
						{
							ns1blankspace.status.error('You must specify a user name.');
						}
						else if (sRole === undefined || sRole === '')
						{
							ns1blankspace.status.error('Role not passed. Please contact support');
						}
					}
				}
			}
		},

		invoices:
		{
			show: function(oParam)
			{
				var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
				var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'sentdate'}).value;
				var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
				var aHTML = [];

				if (oResponse === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
					oSearch.addField('reference,sentdate,duedate,description,amount,tax,receiptamount,creditamount');
					oSearch.addFilter('contactbusinesssentto', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.rows = ns1blankspace.option.defaultRows;
					oSearch.sort(sSortColumn, sSortDirection);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.response = oResponse;
							nsFreshcare.internal.entity.invoices.show(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					});
				}

				else
				{
					aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceEntityInvoicesColumn1" class="ns1blankspaceColumn1Large">' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								'<td id="ns1blankspaceEntityInvoicesColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
								'</td>' +
								'</tr>' +
								'</table>');				
					
					$('#' + sXHTMLElementID).html(aHTML.join(''));
					
					aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table border="0" cellspacing="0" cellpadding="0" width="750" style="margin-top:15px); margin-bottom:15px);">');
						aHTML.push('<tr>');
						aHTML.push('<td class="ns1blankspaceNothing">No invoices.</td>');
						aHTML.push('</tr>');
						aHTML.push('</table>');

						$('#ns1blankspaceEntityInvoicesColumn1').html(aHTML.join(''));		
					}
					else
					{
					
						aHTML.push('<table border="0" cellspacing="0" cellpadding="0" class="ns1blankspace">');
						aHTML.push('<tr class="ns1blankspaceCaption">');
						aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' data-column="reference"' +
										' data-sortdirection="' + ((sSortColumn == "reference") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
										'>Reference</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' data-column="sentdate"' +
										' data-sortdirection="' + ((sSortColumn == "sentdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
										'>Sent</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' data-column="description"' +
										' data-sortdirection="' + ((sSortColumn == "description") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
										'>Description</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
										' data-column="amount"' +
										' data-sortdirection="' + ((sSortColumn == "amount") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
										'>Amount</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption">Outstanding</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
						aHTML.push('</tr>');
						
						$.each(oResponse.data.rows, function()
						{
							aHTML.push(nsFreshcare.internal.entity.invoices.row(this));
						});
						
						aHTML.push('</table>');
						
						ns1blankspace.render.page.show(
						{
							xhtmlElementID: 'ns1blankspaceEntityInvoicesColumn1',
							xhtmlContext: 'EntityInvoices',
							xhtml: aHTML.join(''),
							showMore: (oResponse.morerows == "true"),
							more: oResponse.moreid,
							rows: ns1blankspace.option.defaultRows,
							functionShowRow: nsFreshcare.internal.entity.invoices.row,
							functionNewPage: 'nsFreshcare.internal.entity.invoices.bind()',
							type: 'json'
						}); 	
						
						nsFreshcare.internal.entity.invoices.bind();
					}
				}
			},

			row: function(oRow)
			{
				var aHTML = [];
				var iAmount = (nsFreshcare.util.isNumeric(oRow.amount.replace(/,/g, ''))) ? Number(oRow.amount.replace(/,/g, '')) : 0;
				var iReceipts = (nsFreshcare.util.isNumeric(oRow.receiptamount.replace(/,/g, ''))) ? Number(oRow.receiptamount.replace(/,/g, '')) : 0; 
				var iCredits = (nsFreshcare.util.isNumeric(oRow.creditamount.replace(/,/g, ''))) ? Number(oRow.creditamount.replace(/,/g, '')) : 0;  
				var iOutstanding = iAmount - (iReceipts + iCredits);

				aHTML.push('<tr id="ns1blankspaceEntityInvoices-' + oRow.id + '">');

				aHTML.push('<td id="ns1blankspaceEntityInvoices_reference-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.reference + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityInvoices_sentdate-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.sentdate + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityInvoices_description-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.description + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityInvoices_amount-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
								(iAmount).formatMoney(2, ".", ",") + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityInvoices_outstanding-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
								(iOutstanding).formatMoney(2, ".", ",") + '</td>');

				aHTML.push('<td id="ns1blankspaceEntityInvoices_select-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceSelect">' +
								'&nbsp;</td>');

				aHTML.push('</tr>');

				return aHTML.join('');
			},

			bind: function()
			{
				// v3.1.0i SUP022250 Now binds only visible elements
				$('.ns1blankspaceHeaderSort:visible')
					.on('click', function(event)
					{
						var oParam = 
						{
							xhtmlElementID: 'ns1blankspaceMainInvoices',
							sortColumn: $(this).attr('data-column'),
							sortDirection: $(this).attr('data-sortdirection')
						}

						$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
						nsFreshcare.internal.entity.invoices.show(oParam);
					})
					.css('cursor', 'pointer')

				$('.ns1blankspaceSelect:visible')
					.button(
					{
						text: false,
						label: 'Open',
						icons: {primary: 'ui-icon-play'}
					})
					.on('click', function(event)
					{
						var sInvoiceId = this.id.split('-').pop();

						if (sInvoiceId)
						{
							ns1blankspace.financial.invoice.init({id: sInvoiceId});
						}
					})
					.css('height', '25px')
					.css('width', '25px');
			}
		},

		save:
		{
			validate: function(oParam)
			{
				var sXHTMLTabElementID = ns1blankspace.util.getParam(oParam, 'xhtmlTabElementID', {'default': 'ns1blankspaceMainDetails'}).value;

				if (sXHTMLTabElementID === 'ns1blankspaceMainDetails' && $('#' + sXHTMLTabElementID).html() != '')
				{
					// First validate mandatory fields
					$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
					{
						if ($(this).is(':visible') && $(this).attr('data-mandatory') === '1' && $(this).val() === '') 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}
					});

					// If Legal Name not populated, set to Trading Name
					if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsLegalName').val() === '')
					{
						$('#ns1blankspaceDetailsLegalName').val($('#ns1blankspaceDetailsTradingName').val());
					}

					if (ns1blankspace.okToSave && ns1blankspace.objectContext === -1 && $('#ns1blankspaceMainAddress').html() === '')
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Please add Address details for a new Trainer');
						return false;
					}

					if (oParam.xhtmlTabElementID === undefined) {sXHTMLTabElementID = 'ns1blankspaceMainAddress'}
				} 

				if (ns1blankspace.okToSave && sXHTMLTabElementID === 'ns1blankspaceMainAddress' && $('#' + sXHTMLTabElementID).html() != '')
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

				if (ns1blankspace.okToSave)
				{
					if (oParam && oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
					else
					{
						nsFreshcare.internal.entity.save.send(oParam);
					}
				}
			},

			send: function(oParam)
			{
				// Need to add business group when new record
				var sData = '';
				var iBusinessGroup = ns1blankspace.util.getParam(oParam, 'businessGroup').value;
				var fFunctionPostSave = ns1blankspace.util.getParam(oParam, 'functionPostSave').value;

				if (oParam === undefined) {oParam = {saveEntityStep: 1}}
				else if (oParam.saveEntityStep === undefined) {oParam.saveEntityStep = 1}

				// Validate
				if (oParam.saveEntityStep === 1)
				{
					ns1blankspace.okToSave = true;
					ns1blankspace.status.working('Validating data entered');
					oParam.saveEntityStep = 2;
					nsFreshcare.internal.entity.save.validate(oParam);
				}

				// Get data
				else if (oParam.saveEntityStep === 2)
				{
					if (ns1blankspace.okToSave)
					{
						ns1blankspace.status.working('Saving Business details');
						if ($('#ns1blankspaceMainDetails').html() != '')
						{
							sData += '&reference=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsReference').val().formatXHTML());
							sData += '&tradename=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTradingName').val().formatXHTML());
							sData += '&legalname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsLegalName').val().formatXHTML());
							sData += '&abn=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsABN').val().formatXHTML());
							sData += '&webaddress=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsWebsite').val().formatXHTML());
							sData += '&phonenumber=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPhone').val().formatXHTML());
							sData += '&faxnumber=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFax').val().formatXHTML());
							sData += '&email=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsEmail').val().formatXHTML());
							sData += '&primarycontactperson=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPrimaryContact').attr('data-id'));
							sData += '&notes=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDescription').val().formatXHTML());
							if ($('#ns1blankspaceDetailsSupplierStatus').is('*'))
							{
								sData += '&supplierstatus=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSupplierStatus').attr('data-id'));
							}
							if ($('#ns1blankspaceDetailsCustomerStatus').is('*'))
							{
								sData += '&customerstatus=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCustomerStatus').attr('data-id'));
							}

							// v3.1.2 Now saves CB No, Self-Cert & JASANZ dates & Manual Audit Approval
							if ($('#ns1blankspaceDetailsCertificationBodyNumber').is('*'))
							{
								sData += '&se' + nsFreshcare.data.certificationBodyNumberId + '=' + ($('#ns1blankspaceDetailsCertificationBodyNumber').val());
								sData += '&se' + nsFreshcare.data.selfCertificationDateId + '=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSelfCertificationDate').val());
								sData += '&se' + nsFreshcare.data.jasanzDateId + '=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsJASANZDate').val());
								sData += '&semanualauditapproval=' + ns1blankspace.util.fs($('input[name="radioManualAuditApproval"]:checked').val());
							}
						}

						if ($('#ns1blankspaceMainAddress').html() != '')
						{
							sData += '&streetaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetAddress1').val().formatXHTML());
							sData += '&streetaddress2=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetAddress2').val().formatXHTML());
							sData += '&streetsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetSuburb').val().formatXHTML());
							sData += '&streetstate=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetState').val().formatXHTML());
							sData += '&streetpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetPostCode').val().formatXHTML());
							sData += '&streetcountry=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetCountry').val().formatXHTML());
							sData += '&mailingaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress1').val().formatXHTML());
							sData += '&mailingaddress2=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress2').val().formatXHTML());
							sData += '&mailingsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingSuburb').val().formatXHTML());
							sData += '&mailingstate=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingState').val().formatXHTML());
							sData += '&mailingpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingPostCode').val().formatXHTML());
							sData += '&mailingcountry=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingCountry').val().formatXHTML());
						}

						if (sData != "")
						{
							sData = 'id=' + ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '') + sData;
							oParam.saveEntityStep = 3;
							oParam.data = sData;
							nsFreshcare.internal.entity.save.send(oParam);
						}
						else
						{
							ns1blankspace.status.message('Nothing to save!');
						}
					}
				}

				// Save ContactBusiness
				else if (oParam.saveEntityStep == 3)
				{
					if (oParam.data)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
							data: oParam.data,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									if (ns1blankspace.objectContext == -1)
									{
										oParam["new"] = true;
										ns1blankspace.objectContext = oResponse.id;
										oParam.saveEntityStep = 4;
									}
									else {oParam.saveEntityStep = 10}
									nsFreshcare.internal.entity.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error saving Business: ' + oResponse.error.errornotes);
								}
							}
						});
					}
				}

				// Add Business Group
				else if (oParam.saveEntityStep === 4)
				{
					sData = 'contactbusiness=' + ns1blankspace.objectContext +
							'&group=' + iBusinessGroup;
					
					ns1blankspace.status.working('Saving Business group');
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_GROUP_MANAGE'),
						data: sData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.saveEntityStep = 10;
								nsFreshcare.internal.entity.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding businessgroup: ' + oResponse.error.errornotes);
							}
						}
					});
				}

				// Finish up - call search if new
				else if (oParam.saveEntityStep === 10)
				{
					ns1blankspace.inputDetected = false;
					//if (oParam["new"] === true)
					//{
						ns1blankspace.status.clear();
						if (fFunctionPostSave)
						{
							oParam = {xhtmlElementID: '-' + ns1blankspace.objectContext};
							fFunctionPostSave(oParam);
						}
					//}
				}
			}
		}
	},

	contactBusiness:
	{
		search:
		{
			send: function (sXHTMLElementId, oParam)
			{
				
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
					
					// v3.1.204 SUP023015 Added supplierstatus to search
					var oSearch = new AdvancedSearch();
					oSearch.endPoint = 'contact';
					oSearch.method = 'CONTACT_BUSINESS_SEARCH';
					oSearch.addField( 'reference,tradename,legalname,phonenumber,faxnumber,industry,industrytext,' +
										'createddate,abn,customerstatus,customerstatustext,supplierstatus,supplierstatustext' + 
										',webaddress,area,areatext,' +
										'streetaddress1,streetaddress2,streetsuburb,streetpostcode,streetstate,streetcountry' + 
										',mailingaddress1,mailingaddress2,mailingsuburb,mailingpostcode,mailingstate,mailingcountry,' +
										'notes,primarycontactperson,modifieddate,' +
										'directdebitaccountname,directdebitaccountnumber,directdebitbank,directdebitbranchnumber');

					oSearch.addField(ns1blankspace.option.auditFields);
					
					//oSearch.addField(ns1blankspace.extend.elements());
					
					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {ns1blankspace.contactBusiness.show(oParam, data)}) 
					
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
						oSearch.method = 'CONTACT_BUSINESS_SEARCH';
						oSearch.addField('tradename,legalname');
						
						if (iSource == ns1blankspace.data.searchSource.browse)
						{
							oSearch.addFilter('quicksearch', 'TEXT_STARTS_WITH', sSearchText);
						}
						else
						{	
							oSearch.addFilter('quicksearch', 'TEXT_IS_LIKE', sSearchText);
						}	

						ns1blankspace.search.advanced.addFilters(oSearch);
						
						oSearch.getResults(function(data) {ns1blankspace.contactBusiness.search.process(oParam, data)});
					}
				}
			}
		},

		layout: function()
		{
			
			// v3.1.1 SUP022441 Added Emails tab
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
			
			aHTML.push('<table class="ns1blankspaceControl">');
			
			if (ns1blankspace.objectContext == -1)
			{
				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">Details</td></tr>');
								
				aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">Address</td></tr>');				
			}
			else
			{
				aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">Summary</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">Details</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">Address</td></tr>');
			
				aHTML.push('</table>');					
			
				aHTML.push('<table class="ns1blankspaceControl">');
				aHTML.push('<tr><td id="ns1blankspaceControlPeople" class="ns1blankspaceControl">People</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceControlGroups" class="ns1blankspaceControl">Groups</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceControlRelationships" class="ns1blankspaceControl">Relationships</td></tr>');
						
				aHTML.push('</table>');

				aHTML.push('<table class="ns1blankspaceControl">');
				aHTML.push('<tr><td id="ns1blankspaceControlFinancial" class="ns1blankspaceControl">Financials</td></tr>');
				aHTML.push('</table>');		
			
				aHTML.push('<table class="ns1blankspaceControl">');
			
				aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">Emails</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">Actions</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">Attachments</td></tr>');
			}
					
			aHTML.push('</table>');					
				
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainGroups" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainRelationships" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainPeople" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainFinancials" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			$('#ns1blankspaceControlSummary').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
				ns1blankspace.contactBusiness.summary();
			});
			
			$('#ns1blankspaceControlDetails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
				ns1blankspace.contactBusiness.details();
			});
			
			
			$('#ns1blankspaceControlAddress').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainAddress'});
				ns1blankspace.contactBusiness.address();
			});
			
			$('#ns1blankspaceControlPeople').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainPeople', refresh: true});
				ns1blankspace.contactBusiness.people.show();
			});

			$('#ns1blankspaceControlGroups').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainGroups', refresh: true});
				ns1blankspace.contactBusiness.groups.show();
			});

			$('#ns1blankspaceControlRelationships').click(function(event)
			{
				delete(ns1blankspace.objectContextData.relationships);
				ns1blankspace.show({selector: '#ns1blankspaceMainRelationships', refresh: true});
				nsFreshcare.internal.entity.relationships.show();
			});
			
			$('#ns1blankspaceControlFinancial').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainFinancials', refresh: true});
				ns1blankspace.contactBusiness.financials();
			});
			
			$('#ns1blankspaceControlActions').click(function(event)
			{
				// v3.1.2 SUP022468 Now calls 'configure' so that it also looks for all people's actions. 
				ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});
				nsFreshcare.admin.grower.actions.configure();
			});
			
			$('#ns1blankspaceControlEmails').click(function()
			{
				// v3.1.0c added email tab
				// v3.1.2 SUP022468 Now calls 'configure' so that it also looks for all people's emails. 
				ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});
				nsFreshcare.admin.grower.emails.configure();
			});

			$('#ns1blankspaceControlAttachments').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
				ns1blankspace.attachments.show();
			});

			//ns1blankspace.extend.layout();
		},

		show:  function (oParam, oResponse)
		{
			ns1blankspace.app.clean();

			ns1blankspace.contactBusiness.layout();
			
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td valign="top">Sorry can\'t find contact business.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData.contactbusiness;
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData.contactbusinesstext;
				
				$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.tradename);
				$('#ns1blankspaceViewControlAction').button({disabled: false});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
				
				ns1blankspace.history.view(
				{
					newDestination: 'ns1blankspace.contactBusiness.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
				});
				
				ns1blankspace.history.control({functionDefault: 'ns1blankspace.contactBusiness.summary()'})
			}	
		},		
		
		home: function(oParam, oResponse)
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
								'<td id="ns1blankspaceControlFavourites" class="ns1blankspaceControl">Favourites</td>' +
								'</tr>');			
							
				aHTML.push('<tr class="ns1blankspaceControl">' +
								'<td id="ns1blankspaceControlByGroup" class="ns1blankspaceControl">Groups</td>' +
								'</tr>');	
											
				aHTML.push('</table>');		
				
				$('#ns1blankspaceControl').html(aHTML.join(''));	
											
				$('#ns1blankspaceControlFavourites').click(function(event)
				{
					ns1blankspace.show({refresh: true});
					ns1blankspace.contactBusiness.favourites.show({xhtmlElementID: "ns1blankspaceMain"});
				});

				$('#ns1blankspaceControlByGroup').click(function(event)
				{
					ns1blankspace.show({refresh: true});
					nsFreshcare.internal.contactBusiness.groups.search.show();
				});
				
				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
				oSearch.addField('tradename,legalname');
				oSearch.rows = 10;
				oSearch.sort('modifieddate', 'desc');
				
				oSearch.getResults(function(data) {nsFreshcare.internal.contactBusiness.home(oParam, data)});	
			}
			else
			{
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table>' +
									'<tr><td class="ns1blankspaceNothing">' +
									'Click New to create a business.</td></tr></table>');
				}
				else
				{
					aHTML.push('<table>');
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceCaption">MOST LIKELY</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function()
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + 
												'" class="ns1blankspaceMostLikely">' +
												this.tradename + ' ' +
												this.legalname +
												'</td>');
						
						aHTML.push('</tr>');
					});
					
					aHTML.push('</table>');
				}
				
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					ns1blankspace.contactBusiness.search.send(event.target.id, {source: 1});
				});
			}
		},

		summary: function (oParam, oResponse)		
		{
			var aHTML = [];
			
			if (ns1blankspace.objectContextData == undefined)
			{
				aHTML.push('<table><tr><td valign="top">Sorry can\'t find this business.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				if (oResponse == undefined)
				{
					aHTML.push('<table class="ns1blankspaceMain">' +
								'<tr class="ns1blankspaceRow">' +
								'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'<td id="ns1blankspaceSummaryColumn2" style="width:300px;"></td>' +
								'</tr>' +
								'</table>');				
					
					$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
				
					var aHTML = [];
				
					aHTML.push('<table class="ns1blankspace">');
					
					if (ns1blankspace.objectContextData.phonenumber != '')
					{
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryPhone" class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.phonenumber +
									'</td></tr>');
					}

					if (ns1blankspace.objectContextData.streetsuburb != '')
					{
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Location</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryLocation" class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.streetsuburb + ' ' + ns1blankspace.objectContextData.streetstate +
									'</td></tr>');
					}				
									
					if (ns1blankspace.objectContextData.customerstatus != '')
					{
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Status</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryStatus" class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.customerstatustext +
									'</td></tr>');
					}				
						
					if (ns1blankspace.objectContextData.notes != '')
					{
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Notes</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryNotes" class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.notes +
									'</td></tr>');
					}				
							
					// v3.1.2 Make sure we have this field in the results
					if (ns1blankspace.objectContextData.modifieddate != '' && ns1blankspace.objectContextData.modifieddate != undefined) 
					{
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Last Updated</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryLastUpdated" class="ns1blankspaceSummary">' +
										(new Date(ns1blankspace.objectContextData.modifieddate)).toString("dd MMM yyyy") +
										'</td></tr>');
					}
												
					aHTML.push('</table>');					
					
					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

					var aHTML = [];
			
					aHTML.push('<table class="ns1blankspaceColumn2">');

					aHTML.push('<tr><td id="ns1blankspaceFavourite" class="ns1blankspaceSummaryCaption" style="padding-bottom:15px;">' +
								ns1blankspace.xhtml.loadingSmall + 
								'</td></tr>');	

					if (ns1blankspace.objectContextData.webaddress != '')
					{	
						if ((ns1blankspace.objectContextData.webaddress).indexOf('http') == -1)
						{
							ns1blankspace.objectContextData.webaddressURI = 'http://' + ns1blankspace.objectContextData.webaddress;
						}

						aHTML.push('<tr><td class="ns1blankspaceSummary" style="padding-bottom:10px;">' +
									'<a href="' + ns1blankspace.objectContextData.webaddressURI + '" target="_blank">' + 
									ns1blankspace.objectContextData.webaddress + '</a>' +
									'</td></tr>');	
					}

					aHTML.push('</table>');					
					
					$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

					// v3.1.0i SUP022247 Converted to advanced search
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_FAVOURITE_SEARCH';
					oSearch.addField('id');
					oSearch.addFilter('object', 'EQUAL_TO', '12');
					oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.contactBusiness.summary(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error('Unable to determine favourite status: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					var bFavourite = false;
					var iFavouriteID;
					var oButton =
					{
						text: true,
						label: 'Mark as<br />favourite',
					}

					if (oResponse.data.rows.length != 0)
					{
						oButton =
						{
							text: true,
							label: 'Favourite',
							icons:
							{
							primary: "ui-icon-star"
							}
						}

						sFavourite = 'Remove';
						bFavourite = true;
						iFavouriteID = oResponse.data.rows[0].id;
					}

					$('#ns1blankspaceFavourite').html('<input type="checkbox" ' + (bFavourite?'checked="checked" ':'') + 'id="ns1blankspaceContactBusinessFavourite"/>' +
							'<label for="ns1blankspaceContactBusinessFavourite" style="font-size:0.75em; width:100px;">&nbsp;</label>');

					$('#ns1blankspaceContactBusinessFavourite').button(oButton)
					.click(function()
					{
						var oData = 
						{
							object: ns1blankspace.object,
							objectContext: ns1blankspace.objectContext
						}	

						if (bFavourite)
						{
							ns1blankspace.status.message('No longer a favourite');
							oData.remove = 1;
							oData.id = iFavouriteID;
						}
						else
						{
							ns1blankspace.status.message('Is now a favourite');
						}

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_FAVOURITE_MANAGE'),
							data: oData,
							dataType: 'json',
							success: function ()
							{
								ns1blankspace.contactBusiness.summary();
							}
						});							
					})
				}	
			}	
		},

		details: function()
		{
			// v3.1.204 SUP023015 Forked so that could display both customer & supoplier status
			var aHTML = [];
			
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
								'Reference' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Legal Name' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsLegalName" class="ns1blankspaceText">' +
								'</td></tr>');			
								
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Trading Name' +
								'</td></tr>' +
								'<tr class="ns1blankspaceSelect">' +
								'<td class="ns1blankspaceSelect">' +
								'<input id="ns1blankspaceDetailsTradeName" class="ns1blankspaceText">' +
								'</td></tr>');							
								
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption">' +
								'Industry' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsIndustry" class="ns1blankspaceSelect"' +
									' data-method="SETUP_CONTACT_INDUSTRY_SEARCH">' +
								'</td></tr>');

				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption">' +
								'ABN' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsABN" class="ns1blankspaceText">' +
								'</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Phone' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsPhone" class="ns1blankspaceText">' +
								'</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Fax' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsFax" class="ns1blankspaceText">' +
								'</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Web Address' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsWebAddress" class="ns1blankspaceText">' +
								'</td></tr>');
								
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Customer Status' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsCustomerStatus" class="ns1blankspaceSelect"' + 
								  'data-method="SETUP_CONTACT_STATUS_SEARCH">' +
								'</td></tr>');
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Supplier Status' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsSupplierStatus" class="ns1blankspaceSelect"' + 
								  'data-method="SETUP_CONTACT_STATUS_SEARCH">' +
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

				if (ns1blankspace.objectContextData != undefined)
				{
					$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData.reference.formatXHTML());
					$('#ns1blankspaceDetailsTradeName').val(ns1blankspace.objectContextData.tradename.formatXHTML());
					$('#ns1blankspaceDetailsLegalName').val(ns1blankspace.objectContextData.legalname.formatXHTML());
					$('#ns1blankspaceDetailsIndustry').val(ns1blankspace.objectContextData.industrytext.formatXHTML());
					$('#ns1blankspaceDetailsIndustry').attr('data-id', ns1blankspace.objectContextData.industry);
					$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData.abn.formatXHTML());
					$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData.phonenumber.formatXHTML());
					$('#ns1blankspaceDetailsWebAddress').val(ns1blankspace.objectContextData.webaddress.formatXHTML());
					$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData.faxnumber.formatXHTML());
					$('#ns1blankspaceDetailsCustomerStatus').val(ns1blankspace.objectContextData.customerstatustext.formatXHTML());
					$('#ns1blankspaceDetailsCustomerStatus').attr('data-id', ns1blankspace.objectContextData.customerstatus);
					$('#ns1blankspaceDetailsSupplierStatus').val(ns1blankspace.objectContextData.supplierstatustext.formatXHTML());
					$('#ns1blankspaceDetailsSupplierStatus').attr('data-id', ns1blankspace.objectContextData.supplierstatus);
					$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData.notes.formatXHTML());
				}
				
				$('#ns1blankspaceDetailsTitle').keyup(function(event)
				{
					$(ns1blankspace.xhtml.container).hide(200);
					ns1blankspace.search.send(event.target.id);
				});
			}	
		},

		groups: 	
		{							
			show: 		function (oParam, oResponse)
			{	
				var sXHTMLElementID = 'ns1blankspaceMainGroups';
				var sLabel = "groups";
				var iOption = 1;
				
				if (oParam != undefined)
				{
					if (oParam.label != undefined) {sLabel = oParam.label}
					if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				}

				if (oResponse == undefined)
				{
					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceContactBusinessGroupsColumn1" class="ns1blankspaceColumn1Flexible">' +
								ns1blankspace.xhtml.loading + '</td>' +
								'<td id="ns1blankspaceContactBusinessGroupsColumn2" style="width: 150px;" class="ns1blankspaceColumn2Action"></td>' +
								'</tr>' +
								'</table>');				
					
					$('#ns1blankspaceMainGroups').html(aHTML.join(''));
					
					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td>' +
									'<span id="ns1blankspaceContactBusinessGroupsAdd" class="ns1blankspaceAction">Add to group</span>' +
									'</td></tr>');													
					aHTML.push('</table>');					
					
					$('#ns1blankspaceContactBusinessGroupsColumn2').html(aHTML.join(''));
					
					$('#ns1blankspaceContactBusinessGroupsAdd').button(
					{
						label: "Add to group"
					})
					.click(function() {
						ns1blankspace.container.position(
						{
							xhtmlElementID: 'ns1blankspaceContactBusinessGroupsAdd',
							leftOffset: -50,
							topOffset: -280
						});
						ns1blankspace.contactBusiness.groups.add(oParam);
					});
				
					var oSearch = new AdvancedSearch();
					oSearch.endPoint = 'contact';
					oSearch.method = 'CONTACT_BUSINESS_GROUP_SEARCH';
					oSearch.addField('contactbusiness,contactbusinesstext,group,grouptext');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.rows = 100;
					oSearch.sort('grouptext', 'asc');
					oSearch.getResults(function(data) {ns1blankspace.contactBusiness.groups.show(oParam, data)});
				}
				else
				{
					
					var aHTML = [];
				
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table>' +
										'<tr><td class="ns1blankspaceNothing">No groups.</td></tr>' +
										'</table>');

						$('#ns1blankspaceContactBusinessGroupsColumn1').html(aHTML.join(''));		
					}
					else
					{
						aHTML.push('<table class="ns1blankspace">');
						
						$.each(oResponse.data.rows, function()
						{	
							if (this.grouptext != '')
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
												
								aHTML.push('<td id="ns1blankspaceGroups-title-' + this.id + '" class="ns1blankspaceRow">' +
														this.grouptext + '</td>');
								
								aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
												'<span id="ns1blankspaceGroups_remove-' + this.id + 
												'" class="ns1blankspaceRow ns1blankspaceGroupsRemove">&nbsp;</span></td>');
			
								aHTML.push('</tr>');
							}					
						});
						
						aHTML.push('</table>');

						$('#ns1blankspaceContactBusinessGroupsColumn1').html(aHTML.join(''));
						
						$('.ns1blankspaceGroupsRemove').button( {
							text: false,
							 icons: {
								 primary: "ui-icon-close"
							}
						})
						.click(function() {
							ns1blankspace.contactBusiness.groups.remove(this.id)
						})
						.css('width', '15px')
						.css('height', '20px')
					}
					
				}	
			},	

			add: 		function (oParam, oResponse)
			{
					
				if ($(ns1blankspace.xhtml.container).attr('data-initiator') == 'ns1blankspaceContactBusinessGroupsAdd')
				{
					$(ns1blankspace.xhtml.container).slideUp(500);
					$(ns1blankspace.xhtml.container).attr('data-initiator', '');
				}
				else
				{
					if (oResponse == undefined)
					{
						$.ajax(
						{
							type: 'GET',
							url: ns1blankspace.util.endpointURI('SETUP_CONTACT_BUSINESS_GROUP_SEARCH'),
							dataType: 'json',
							success: function(data){ns1blankspace.contactBusiness.groups.add(oParam, data)}
						});
					}
					else
					{
						ns1blankspace.container.position(
						{
							xhtmlElementID: 'ns1blankspaceContactBusinessGroupsAdd',
							topOffset: -50,
							leftOffset: -257
						});

						$(ns1blankspace.xhtml.container).attr('data-initiator', 'ns1blankspaceContactBusinessGroupsAdd')
						
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspaceSearchMedium">' + 
											'<tr><td class="ns1blankspaceNothing">No groups.</td></tr>' + 
											'</table>');

							$(ns1blankspace.xhtml.container).html(aHTML.join(''));
							$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						}
						else
						{
							aHTML.push('<table class="ns1blankspaceSearchMedium" style="font-size:0.875em;">');
							
							$.each(oResponse.data.rows, function()
							{	
								aHTML.push('<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceGroupsAdd-title-' + this.id + '" class="ns1blankspaceRowSelect ns1blankspaceGroupsAddRowSelect">' +
														this.title + '</td>');
								
								aHTML.push('</tr>');
							});
							
							aHTML.push('</table>');

							$(ns1blankspace.xhtml.container).html(aHTML.join(''));
							$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
							
							$('td.ns1blankspaceGroupsAddRowSelect').click(function(event)
							{
								ns1blankspace.contactBusiness.groups.select(event.target.id);
							});
						}
					}
				}	
			},

			select: 	function (sXHTMLElementId)
			{

				var aSearch = sXHTMLElementId.split('-');
				var sElementId = aSearch[0];
				var sSearchContext = aSearch[2];
				
				$('#' + sXHTMLElementId).fadeOut(500);
				
				var sData = 'contactbusiness=' + ns1blankspace.objectContext +
							'&group=' + sSearchContext;
							
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_GROUP_MANAGE'),
					data: sData,
					dataType: 'json',
					success: function(data){ns1blankspace.contactBusiness.groups.show()}
				});
			},

			remove: 	function (sXHTMLElementId)
			{
				var aSearch = sXHTMLElementId.split('-');
				var sElementId = aSearch[0];
				var sSearchContext = aSearch[1];
				
				var sData = 'remove=1&id=' + sSearchContext;
							
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_GROUP_MANAGE'),
					data: sData,
					dataType: 'json',
					success: function(data){$('#' + sXHTMLElementId).parent().parent().fadeOut(500)}
				});	
			},

			search: 	
			{
				show: 		function (oParam, oResponse)
				{
					var sXHTMLElementID = 'ns1blankspaceMain';
					var sLabel = "groups";
					var iOption = 1;
					
					if (oParam != undefined)
					{
						if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
					}

					if (oResponse == undefined)
					{
						$.ajax(
						{
							type: 'GET',
							url: ns1blankspace.util.endpointURI('SETUP_CONTACT_BUSINESS_GROUP_SEARCH'),
							dataType: 'json',
							success: function(data) {ns1blankspace.contactBusiness.groups.search.show(oParam, data)}
						});
					}
					else
					{
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceContactBusinessByGroupColumn1" style="width:150px;border-right-style:solid;border-width:1px;border-color:#B8B8B8;padding-right:15px;">' +
									'</td>' +
									'<td id="ns1blankspaceContactBusinessByGroupColumn2" class="ns1blankspaceColumn1Large" style="padding-left:15px;">' +
									'</td>' +
									'</tr>' +
									'</table>');				
						
						$('#ns1blankspaceMain').html(aHTML.join(''));
						
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspace">' +
											'<tr><td class="ns1blankspaceNothing">No groups.</td></tr>' + 
											'</table>');

							$('#ns1blankspaceContactBusinessByGroupColumn1').html(aHTML.join(''));
						}
						else
						{
							aHTML.push('<table class="ns1blankspace">');
							
							$.each(oResponse.data.rows, function()
							{
								aHTML.push('<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceContactBusinessByGroup_title-' + this.id +
												'-' + this.title +
												'" class="ns1blankspaceRowSelect ns1blankspaceRowSelectByGroup">' +
												this.title + '</td></tr>');
							});
							
							aHTML.push('</table>');

							$('#ns1blankspaceContactBusinessByGroupColumn1').html(aHTML.join(''));
										
							$('td.ns1blankspaceRowSelectByGroup').click(function(event)
							{
								ns1blankspace.contactBusiness.groups.search.process({xhtmlElementID: event.target.id});
							});
						}
					}	
				},	

				process: 	function (oParam, oResponse)
				{
					var sXHTMLElementID;
					
					if (oParam != undefined)
					{
						if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
					}

					var aXHTMLElementId = sXHTMLElementID.split('-')
					
					if (oResponse == undefined)
					{
						$('#ns1blankspaceContactBusinessByGroupColumn2').html(ns1blankspace.xhtml.loading);
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_BUSINESS_GROUP_SEARCH';
						oSearch.addField('contactbusiness,businessgroup.contactbusiness.tradename,group,grouptext');
						oSearch.addFilter('group', 'EQUAL_TO', aXHTMLElementId[1]);
						oSearch.sort('businessgroup.contactbusiness.tradename', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.contactBusiness.groups.search.process(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table><tr>' +
												'<td class="ns1blankspaceNothing">No contacts.</td></tr>' +
												'</table>');
						}
						else
						{		
							aHTML.push('<table class="ns1blankspace" id="ns1blankspaceContactBusinessGroup">');
		
							aHTML.push('<tr class="ns1blankspaceCaption">' + 
											'<td colspan=2 class="ns1blankspaceCaption">' + aXHTMLElementId[2] + '</td>' +
											'</tr>');
							
							$.each(oResponse.data.rows, function()
							{
								aHTML.push(ns1blankspace.contactBusiness.groups.search.row(this));
							});
							
							aHTML.push('</table>');
						}
						
						ns1blankspace.render.page.show(
						{
							xhtmlElementID: 'ns1blankspaceContactBusinessByGroupColumn2',
							xhtmlContext: 'ContactBusinessGroupsContacts',
							xhtml: aHTML.join(''),
							showMore: (oResponse.data.morerows == "true"),
							more: oResponse.moreid,
							rows: ns1blankspace.option.defaultRows,
							functionShowRow: ns1blankspace.contactBusiness.groups.search.row,
							functionNewPage: 'ns1blankspace.contactBusiness.groups.search.bind()',
							type: 'json'
						}); 	
						
						ns1blankspace.contactBusiness.groups.search.bind();
					}	
				},	

				row: 		function (oRow)
				{
					var aHTML = [];
					
					aHTML.push('<tr class="ns1blankspaceRow">');
		
					aHTML.push('<td id="ns1blankspaceContactBusinessGroup_tradename-' + oRow.contactbusiness + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
											oRow["businessgroup.contactbusiness.tradename"] + '</td>');

					aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
									'<span id="ns1blankspaceContactBusinessGroup_remove-' + oRow.id + 
									'" class="ns1blankspaceRow ns1blankspaceGroupsRemove">&nbsp;</span>' +
									'</td>');
					
					aHTML.push('</tr>');
								
					return aHTML.join('');
				},

				bind: 		function ()
				{
					// v3.1.0i SUP022250 Now binds only visible elements  ********************************************************************
					$('#ns1blankspaceContactBusinessGroup td.ns1blankspaceRowSelect')
					.click(function()
					{
						var aID = (this.id).split('-');
						ns1blankspace.contactBusiness.init({id: aID[1]});
					});

					$('#ns1blankspaceContactBusinessGroup .ns1blankspaceGroupsRemove').button(
					{
						text: false,
						icons:
						{
							 primary: "ui-icon-close"
						}
					})
					.click(function()
					{
						ns1blankspace.contactBusiness.groups.remove(this.id)
					})
					.css('width', '15px')
					.css('height', '20px');
				}
			}
		},	

		save:
		{
			send: function()
			{
				ns1blankspace.status.working();

				var sData = 'id=';
				
				if (ns1blankspace.objectContext != -1)
				{
					sData += ns1blankspace.objectContext;
				} 
				
				if ($('#ns1blankspaceMainDetails').html() != '')
				{	// v3.1.204 SUP023015 Now saves both customer & supplier status
					sData += '&reference=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsReference').val());
					sData += '&legalname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsLegalName').val());
					sData += '&tradename=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTradeName').val());
					sData += '&industry=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsIndustry').attr('data-id'));
					sData += '&abn=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsABN').val());
					sData += '&phonenumber=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPhone').val());
					sData += '&faxnumber=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFax').val());
					sData += '&webaddress=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsWebAddress').val());
					//sData += '&area=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsArea').val());
					sData += '&customerstatus=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCustomerStatus').attr('data-id'));
					sData += '&supplierstatus=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSupplierStatus').attr('data-id'));
					sData += '&notes=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDescription').val());
				}
				
				if ($('#ns1blankspaceMainAddress').html() != '')
				{
					sData += '&streetaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetAddress1').val());
					sData += '&streetsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetSuburb').val());
					sData += '&streetstate=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetState').val());
					sData += '&streetpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetPostCode').val());
					sData += '&streetcountry=' + ns1blankspace.util.fs($('#ns1blankspaceAddressStreetCountry').val());
					sData += '&mailingaddress1=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingAddress1').val());
					sData += '&mailingsuburb=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingSuburb').val());
					sData += '&mailingstate=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingState').val());
					sData += '&mailingpostcode=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingPostCode').val());
					sData += '&mailingcountry=' + ns1blankspace.util.fs($('#ns1blankspaceAddressMailingCountry').val());
				}

				if ($('#ns1blankspaceMainFinancials').html() != '')
				{
					sData += '&directdebitbranchnumber=' + ns1blankspace.util.fs($('#ns1blankspaceFinancialsBSB').val());
					sData += '&directdebitaccountnumber=' + ns1blankspace.util.fs($('#ns1blankspaceFinancialsAccountNumber').val());
					sData += '&directdebitaccountname=' + ns1blankspace.util.fs($('#ns1blankspaceFinancialsAccountName').val());
				}	

				//sData += ns1blankspace.extend.save();
				
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
					data: sData,
					dataType: 'json',
					success: ns1blankspace.contactBusiness.save.process
				});
			}
		}
	},

	document:
	{
		details: function()
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
				
				aHTML.push('<table class="ns1blankspace">');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Title' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceText">' +
								'</td></tr>');	

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'URL' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsURL" class="ns1blankspaceText">' +
								'</td></tr>');	

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Document Summary' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceTextMulti">' +
								'<textarea rows="10" cols="35" id="ns1blankspaceDetailsSummary" class="ns1blankspaceMainTextMulti" style="width:100%;"></textarea>' +
								'</td></tr>');

				aHTML.push('</table>');					
				
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
				
				var aHTML = [];
					
				aHTML.push('<table class="ns1blankspace">');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Status' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioStatus1" name="radioStatus" value="1"/>Draft<br />' +
								'<input type="radio" id="radioStatus2" name="radioStatus" value="2"/>Approved<br />' +
								'<input type="radio" id="radioStatus3" name="radioStatus" value="3"/>Under Review<br />' +
								'<input type="radio" id="radioStatus4" name="radioStatus" value="3"/>To Be linked to Folders' +
								'</td></tr>');	

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Share with internal users' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioInternalY" name="radioInternal" value="Y"/>Yes' +
								'<br /><input type="radio" id="radioInternalN" name="radioInternal" value="N"/>No' +
								'</td></tr>');	

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption" style="padding-top:10px;">' +
								'Share with external users' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioPublicY" name="radioPublic" value="Y"/>Yes&nbsp;<span class="ns1blankspaceSub">(Public)</span>' +
								'<br /><input type="radio" id="radioPublicN" name="radioPublic" value="N"/>No&nbsp;<span class="ns1blankspaceSub">(Private)</span>' +
								'</td></tr>');	
				
				aHTML.push('</table>');					
					
				aHTML.push('<table class="ns1blankspace" style="margin-top:10px;">' +
								'<tr>' + 
								'<td class="ns1blankspaceCaption" id="ns1blankspaceDocumentNetworkGroupsCaption">Shared With</td>' +
								'<td style="padding-right:10px; text-align:right;">' +
								'<span class="ns1blankspaceAction" id="ns1blankspaceDocumentNetworkGroupsAdd"></span></td>' +
								'</tr>');

				aHTML.push('<td colspan=2 class="ns1blankspaceText" id="ns1blankspaceDocumentNetworkGroups">' +
								'<table><tr><td class="ns1blankspaceNothing">No one.</td></tr></table> ' +
								'</td></tr>');

				aHTML.push('</table>');

				$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

				if (ns1blankspace.objectContextData != undefined)
				{
					$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData.title);
					$('#ns1blankspaceDetailsURL').val(ns1blankspace.objectContextData.url);
					$('#ns1blankspaceDetailsSummary').val(ns1blankspace.objectContextData.summary);
					$('[name="radioStatus"][value="' + ns1blankspace.objectContextData.status + '"]').attr('checked', true);
					$('[name="radioPublic"][value="' + ns1blankspace.objectContextData.public + '"]').attr('checked', true);
					$('[name="radioInternal"][value="' + ns1blankspace.objectContextData.internal + '"]').attr('checked', true);
				}
				else
				{
					$('[name="radioStatus"][value="1"]').attr('checked', true);
					$('[name="radioPublic"][value="N"]').attr('checked', true);
					$('[name="radioInternal"][value="Y"]').attr('checked', true);
				}

				if (ns1blankspace.objectContext != -1)
				{	
					ns1blankspace.setup.networkGroup.groups.init(
					{
						xhtmlElementContainerID: 'ns1blankspaceDocumentNetworkGroups',
						xhtmlElementAddID: 'ns1blankspaceDocumentNetworkGroupsAdd',
						object: 14,
						objectcontext: ns1blankspace.objectContext
					});
				}	
			}	
		},

		save:
		{
			send: function ()
			{
				ns1blankspace.status.working();
				
				var sData = '_=1';
				
				if (ns1blankspace.objectContext != -1)
				{
					sData += '&id=' + ns1blankspace.objectContext	
				}	
					
				if ($('#ns1blankspaceMainDetails').html() != '')
				{
					sData += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitle').val());
					sData += '&url=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsURL').val());
					sData += '&public=' + ns1blankspace.util.fs($('input[name="radioPublic"]:checked').val());
					sData += '&summary=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSummary').val());
					sData += '&internal=' + ns1blankspace.util.fs($('input[name="radioInternal"]:checked').val());
					sData += '&status=' + ns1blankspace.util.fs($('input[name="radioStatus"]:checked').val());
				}
				
				if ($('#ns1blankspaceMainEdit').html() != '')
				{
					sData += '&details=' + ns1blankspace.util.fs(tinyMCE.get('ns1blankspaceEditText' + ns1blankspace.counter.editor).getContent());
				}
				
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('DOCUMENT_MANAGE'),
					data: sData,
					dataType: 'json',
					success: ns1blankspace.document.save.process
				});	
			},
		}
	}
} 