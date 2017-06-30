/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

 // v3.1.201 Changed nsFreshcare.data.roles.readOnly to financialReadOnly
// v3.1.210 replaced all dialog('close') with dialog('destroy')

nsFreshcare.extend = 
{
	financial:
	{
		userIsReadOnly: function()
		{	// v3.1.1i Moved to a function instead of recalculating each time
			// v3.1.1m Changed to nsFreshcare.user == undefined
			var bReadOnly = false;
			return (nsFreshcare.user == undefined 
								|| (nsFreshcare.user && 
									(nsFreshcare.user.role.toLowerCase() == 'board member' 
										|| $.grep(ns1blankspace.user.roles, function(x) {return x.id == nsFreshcare.data.roles.financialReadOnly}).length > 0)
									)
					);
		},

		actions:
		{
			bind: function()
			{
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly(); 
				ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});

				// We want to exclude emails & SMS as they're already on the Emails tab
				var iActionTypes = $.map($.grep(nsFreshcare.data.actionTypes, function(x)
											{
												return x.id != '5' && x.id != '9' && x.id != '10';
											}),
											function(y) {return y.id}).join(',');

				var aFilters = [];
				aFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				aFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: ns1blankspace.object});
				aFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});

				nsFreshcare.internal.entity.actions.show(
				{
					xhtmlElementID: 'ns1blankspaceMainActions',
					contactBusiness: ns1blankspace.objectContext, 
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					object: '',
					objectContext: "",
					filters: aFilters,
					showDescription: true,
					actions: {add: !bReadOnly,
									  remove: !bReadOnly},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionBind: nsFreshcare.internal.entity.actions.bind
				});
			}
		},

		emails:
		{
			bind: function()
			{
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});

				// We only want emails & SMS 
				var iActionTypes = '5,9,10';

				var aFilters = [];
				aFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				aFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: ns1blankspace.object});
				aFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});

				nsFreshcare.internal.entity.actions.show(
				{
					xhtmlElementID: 'ns1blankspaceMainEmails',
					xhtmlContext: 'Emails',
					contactBusiness: ns1blankspace.objectContext, 
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					object: '',
					objectContext: "",
					filters: aFilters,
					emailsOnly: true,
					actions: {add: !bReadOnly,
									  remove: !bReadOnly},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionRow: nsFreshcare.internal.entity.emails.row,
					functionBind: nsFreshcare.internal.entity.emails.bind
				});
			}
		},

		item:
		{
			show: function(oParam, oResponse)
			{
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				var iObject = ns1blankspace.object;
				var iObjectContext = ns1blankspace.objectContext;
				var sNamespace;
				var bRefresh = false;
				
				if (oParam != undefined)
				{
					if (oParam.object != undefined) {iObject = oParam.object}
					if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
					if (oParam.namespace != undefined) {sNamespace = oParam.namespace}
					if (oParam.refresh != undefined) {bRefresh = oParam.refresh}		
				}
				else
				{
					oParam = {}
				}	
					
				if (oResponse == undefined)
				{	
					if (!bRefresh)
					{	
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');

						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceItemColumn1" class="ns1blankspaceColumn1Flexible">' +
										ns1blankspace.xhtml.loading + '</td>' +
										'<td id="ns1blankspaceItemColumn2" class="ns1blankspaceColumn2" style="width:275px;"></td>' +
										'</tr>');

						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainItem').html(aHTML.join(''));
						
						var aHTML = [];
						
						// v3.1.1f SUP022623 Board can't add 
						if (!bReadOnly)
						{
							aHTML.push('<table class="ns1blankspaceColumn2">' +
											'<tr><td class="ns1blankspaceAction">' +
											'<span id="ns1blankspaceItemAdd">Add</span>' +
											'</td></tr></table>');					
						}

						$('#ns1blankspaceItemColumn2').html(aHTML.join(''));
					
						$('#ns1blankspaceItemAdd').button(
						{
							label: "Add"
						})
						.click(function()
						{
							oParam = ns1blankspace.util.setParam(oParam, 'xhtmlElementID', undefined);
							oParam = ns1blankspace.util.setParam(oParam, 'step', 1);
							ns1blankspace.financial.item.edit(oParam);
						});										
					}

					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_ITEM_SEARCH';
					oSearch.addField(nsFreshcare.util.getSearchFields({fields: '*', namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCH'}));
					oSearch.addFilter('object', 'EQUAL_TO', iObject);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
					$.each(nsFreshcare.util.getSearchFields({fields: [{name: 'financialaccounttext', direction: 'asc'}], namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCHSort'}), function()
					{
						oSearch.sort(this.name, this.direction);
					});
					
					oSearch.getResults(function(data) {ns1blankspace.financial.item.show(oParam, data)});
				}
				else
				{
					var aHTML = [];
					var h = -1;
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">No items.</td></tr></table>');

						$('#ns1blankspaceItemColumn1').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table class="ns1blankspace">');

						aHTML.push('<tr>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption">Description</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption style="width:125px;">Account</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">Amount</td>');
						aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">' +
										ns1blankspace.option.taxVATCaption + '</td>');

						aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
						aHTML.push('</tr>');

						$.each(oResponse.data.rows, function()
						{
							aHTML.push(nsFreshcare.extend.financial.item.row(this));
						});
						
						aHTML.push('</table>');

						// v2.0.4b SUP022579 Now paginates items
						$.extend(true, oParam,
						{
							xhtmlElementID: 'ns1blankspaceItemColumn1',
							xhtmlContext: 'Item',
							xhtml: aHTML.join(''),
							showMore: ($(oResponse).attr('morerows') == "true"),
							more: $(oResponse).attr('moreid'),
							rows: ns1blankspace.option.defaultRows,
							functionShowRow: nsFreshcare.extend.financial.item.row,
							functionOnNewPage: nsFreshcare.extend.financial.item.bind
					   	});
						ns1blankspace.render.page.show(oParam); 	

						//$('#ns1blankspaceItemColumn1').html(aHTML.join(''));
					}
				}	
			},

			row: function(oRow)
			{	// v2.0.4b SUP022579 Added as wasn't paginating items
				var aHTML = [];
				if (oRow.id == undefined) {oRow.id = oRow['lineitem.id']}

				aHTML.push('<tr class="ns1blankspaceRow">');
										
				aHTML.push('<td id="ns1blankspaceItem_description-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow['lineitem.description'] + '</td>');
				
				aHTML.push('<td id="ns1blankspaceItem_financialaccounttext-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow['lineitem.financialaccounttext'] + '</td>');

				aHTML.push('<td id="ns1blankspaceItem_amount-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
								oRow['lineitem.amount'] + '</td>');

				aHTML.push('<td id="ns1blankspaceItem_tax-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceSub" style="text-align:right;">' +
								oRow['lineitem.tax'] + '</td>');

				aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">');
				aHTML.push('<span id="ns1blankspaceRowItem_options_remove-' + oRow.id + '" class="ns1blankspaceItemRemove"></span>');
				aHTML.push('<span id="ns1blankspaceRowItem_options_edit-' + oRow.id + '" class="ns1blankspaceItemEdit"' +
								' data-amount="' + oRow['lineitem.amount'] + '"' +
								' data-tax="' + oRow['lineitem.tax'] + '"' +
								' data-taxtype="' + oRow['lineitem.taxtype'] + '"' +
								' data-financialaccount="' + oRow['lineitem.financialaccount'] + '"' +
								' data-financialaccounttext="' + oRow['lineitem.financialaccounttext'] + '"' +
								' data-description="' + oRow['lineitem.description'] + '"' +
								' data-project="' + oRow['lineitem.project'] + '"' +
								' data-projecttext="' + oRow['lineitem.projecttext'] + '"' +
								'></span>');
				aHTML.push('</td></tr>');

				return aHTML.join('');
			},

			bind: function(oParam)
			{	// v2.0.4b SUP022579 Added as wasn't paginating items
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID').value;

				// v3.1.1f SUP022623 Freshcare Board can't edit or remove
				if (!bReadOnly)
				{
					$('#' + sXHTMLContainerID + ' .ns1blankspaceItemRemove').button(
					{
						text: false,
						icons: {
							primary: "ui-icon-close"
						}
					})
					.click(function()
					{
						ns1blankspace.remove(
						{
							xhtmlElementID: this.id,
							method: 'FINANCIAL_ITEM_MANAGE',
							ifNoneMessage: 'No items.'
						});
					})
					.css('width', '15px')
					.css('height', '17px');

					$('#' + sXHTMLContainerID + ' .ns1blankspaceItemEdit').button(
					{
						text: false,
						icons:
						{
							primary: "ui-icon-pencil"
						}
					})
					.click(function()
					{
						oParam = ns1blankspace.util.setParam(oParam, 'xhtmlElementID', this.id);
						oParam = ns1blankspace.util.setParam(oParam, 'step', 1);
						ns1blankspace.financial.item.edit(oParam)
					})
					.css('width', '15px')
					.css('height', '17px');
				}
			},

			edit: function(oParam, oResponse)
			{
				var iFinancialAccountType;

				var iType = ns1blankspace.util.getParam(oParam, 'type', {"default": 1}).value;		
				var iStep = ns1blankspace.util.getParam(oParam, 'step', {"default": 1}).value;
				var sNamespace = ns1blankspace.util.getParam(oParam, 'namespace').value;
				var iID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value;
				var bShowAccount = ns1blankspace.util.getParam(oParam, 'showAccount', {"default": (ns1blankspace.financial.data.settings.taxreportcalculationmethod == 1)}).value;
				
				if (sNamespace === 'expense' || sNamespace === 'payment') {iType = 2}

				if (oResponse == undefined)
				{
					if (iStep == 1)
					{
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');

						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceItemEditColumn1"></td>' +
										'<td id="ns1blankspaceItemEditColumn2" style="width:50px;"></td>' +
										'</tr>');

						aHTML.push('</table>');					
						
						$('#ns1blankspaceItemColumn2').html(aHTML.join(''));

						var aHTML = [];
									
						aHTML.push('<table class="ns1blankspaceColumn2a">' +
										'<tr><td><span id="ns1blankspaceItemEditSave" class="ns1blankspaceAction">' +
										'Save</span></td></tr>' +
										'<tr><td><span id="ns1blankspaceItemEditCancel" class="ns1blankspaceAction">' +
										'Cancel</span></td></tr>' +
										'</table>');					
						
						$('#ns1blankspaceItemEditColumn2').html(aHTML.join(''));
						
						$('#ns1blankspaceItemEditSave').button(
						{
							text: "Save"
						})
						.click(function()
						{
							ns1blankspace.financial.item.save(oParam)
						})
						.css('width', '65px');

						$('#ns1blankspaceItemEditCancel').button(
						{
							text: "Cancel"
						})
						.click(function()
						{
							var aHTML = [];
						
							aHTML.push('<table class="ns1blankspaceColumn2">' +
											'<tr><td class="ns1blankspaceAction">' +
											'<span id="ns1blankspaceItemAdd">Add</span>' +
											'</td></tr></table>');					
							
							$('#ns1blankspaceItemColumn2').html(aHTML.join(''));
						
							$('#ns1blankspaceItemAdd').button(
							{
								label: "Add"
							})
							.click(function()
							{
								oParam = ns1blankspace.util.setParam(oParam, 'xhtmlElementID', undefined);
								oParam = ns1blankspace.util.setParam(oParam, 'step', 1);
								ns1blankspace.financial.item.edit(oParam);
							});						
						})
						.css('width', '65px');

						var aHTML = [];
						
						// v1.0.8 Now allows user to see all account types
						var sAccountType = '';
						if (sNamespace === 'payment') {sAccountType = 'expense'}
						else if (sNamespace === 'expense') {sAccountType = 'expense'}
						else if (sNamespace === 'invoice') {sAccountType = 'revenue'}
						else if (sNamespace === 'receipt') {sAccountType = 'revenue'}
						aHTML.push('<table class="ns1blankspaceColumn2" style="width:200px;">');
				
						if (bShowAccount || sNamespace === 'expense' || sNamespace === 'invoice')
						{
							aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'<span class="ns1blankspaceCaption">Account&nbsp;</span>' +
											'<span style="font-weight:normal; font-size:0.625em; text-align:right; padding-left:10px; vertical-align:bottom;">Show All Accounts</span>' +
											'<input type="checkbox" id="ns1blankspaceItemShowAll">' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceItemAccount" class="ns1blankspaceText">' +
										'</td></tr>');
							
							aHTML.push('<tr><td style="padding-bottom:5px;" id="ns1blankspaceItemAddSearchResults">' +
											'<span class="ns1blankspaceSub" style="font-size:0.75em;">Press <i>enter</i> to see all<br />or just start typing.</span></td></tr>');
						}	

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Amount' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceItemAmount" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										ns1blankspace.option.taxVATCaption + ' Type' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceFinancialTaxCode" class="ns1blankspaceRadio">' +
										ns1blankspace.xhtml.loadingSmall +
										'</td></tr>');	

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										ns1blankspace.option.taxVATCaption + ' Amount' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceItemTax" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Project' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceItemProject" class="ns1blankspaceSelect"' +
										' data-method="PROJECT_SEARCH"' +
										' data-columns="reference-space-description"' +
										' data-methodFilter="reference-TEXT_IS_LIKE|description-TEXT_IS_LIKE">' +
									'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Description' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceTextMulti">' +
										'<textarea id="ns1blankspaceItemDescription" class="ns1blankspaceTextMulti"' +
											' style="height:50px; width:200px;" rows="3" cols="35" ></textarea>' +
										'</td></tr>');		
		
						aHTML.push('</table>');		
						
						$('#ns1blankspaceItemEditColumn1').html(aHTML.join(''));

						var iTaxType = 1;

						if (iID !== undefined)
						{
							iTaxType = ns1blankspace.util.getData(oParam, 'data-taxtype').value
							$('#ns1blankspaceItemAmount').val(ns1blankspace.util.getData(oParam, 'data-amount').value);
							$('#ns1blankspaceItemTax').val(ns1blankspace.util.getData(oParam, 'data-tax').value);
							$('#ns1blankspaceItemDescription').val(ns1blankspace.util.getData(oParam, 'data-description').value);
							$('#ns1blankspaceItemAccount').val(ns1blankspace.util.getData(oParam, 'data-financialaccounttext').value);
							$('#ns1blankspaceItemAccount').attr('data-id', ns1blankspace.util.getData(oParam, 'data-financialaccount').value);
							$('#ns1blankspaceItemProject').val(ns1blankspace.util.getData(oParam, 'data-projecttext').value);
							$('#ns1blankspaceItemProject').attr('data-id', ns1blankspace.util.getData(oParam, 'data-project').value);
						}	

						ns1blankspace.financial.util.tax.codes(
						{
							xhtmlElementID: 'ns1blankspaceFinancialTaxCode',
							id: iTaxType,
							type: iType
						});

						$('#ns1blankspaceItemAmount').keyup(function()
						{
							ns1blankspace.financial.util.tax.calculate(
							{
								amountXHTMLElementID: 'ns1blankspaceItemAmount',
								taxXHTMLElementID: 'ns1blankspaceItemTax'
							});
						});

						$('[name="radioTaxCode"]').click(function()
						{
							ns1blankspace.financial.util.tax.calculate(
							{
								amountXHTMLElementID: 'ns1blankspaceItemAmount',
								taxXHTMLElementID: 'ns1blankspaceItemTax'
							});
						});

						$('#ns1blankspaceItemAccount').keyup(function()
						{
							oParam = ns1blankspace.util.setParam(oParam, 'step', 2);
							if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)}
					        ns1blankspace.timer.delayCurrent = setTimeout('ns1blankspace.financial.item.edit(' + JSON.stringify(oParam) + ')', ns1blankspace.option.typingWait);
						});
		
						$('#ns1blankspaceItemAccount').focus();

						if (iID === undefined)
						{
							var iFinancialAccountType = (iType==1?2:1);
							// v1.0.8 Now allows user to see all account types
							var oData = $.grep(ns1blankspace.financial.data.accounts, function (a)
							{ 
								if ($('#ns1blankspaceItemShowAll').prop('checked') == true)
								{
									return (a.postable == 'Y')
								}
								else
								{
									return (a.type == iFinancialAccountType && a.postable == 'Y')
								}
							});

							if (oData.length < 21)
							{	
								oParam = ns1blankspace.util.setParam(oParam, 'step', 3);
								ns1blankspace.financial.item.edit(oParam, oData);
							}	
						}	
					}
					if (iStep == 2)
					{	
						ns1blankspace.status.working();

						var iFinancialAccountType = (iType==1?2:1);
						var sSearch = $('#ns1blankspaceItemAccount').val()

						if (sSearch == '')
						{
							var oData = $.grep(ns1blankspace.financial.data.accounts, function (a)
							{ 
								if ($('#ns1blankspaceItemShowAll').prop('checked') == true)
								{
									return (a.postable == 'Y')
								}
								else
								{
									return (a.type == iFinancialAccountType && a.postable == 'Y')
								}
							});
						}
						else
						{
							sSearch = sSearch.toLowerCase();
							var oData = $.grep(ns1blankspace.financial.data.accounts, function (a)
							{
								if ($('#ns1blankspaceItemShowAll').prop('checked') == true)
								{
									return ((a.title).toLowerCase().indexOf(sSearch) != -1 && a.postable == 'Y')
								}
								else
								{
									return (a.type == iFinancialAccountType && (a.title).toLowerCase().indexOf(sSearch) != -1 && a.postable == 'Y')
								}
							});
						}	

						oParam = ns1blankspace.util.setParam(oParam, 'step', 3);
						ns1blankspace.financial.item.edit(oParam, oData);
					}
				}
				else
				{
					ns1blankspace.status.message('');

					var aHTML = [];
					
					if (oResponse.length == 0)	
					{
						aHTML.push('<table class="ns1blankspace">' +
										'<tr><td class="ns1blankspaceNothing">No accounts.</td></tr>' + 
										'</table>');

						$('#ns1blankspaceItemAddSearchResults').html(aHTML.join(''));		
					}
					else
					{	
						aHTML.push('<table class="ns1blankspace" style="font-size:0.875em;">');
						
						$.each(oResponse, function() 
						{ 
							aHTML.push('<tr class="ns1blankspaceRow">'+ 
											'<td id="ns1blankspaceItem_title-' + this.id + '-' + this.taxtype + '" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
											this.title + '</td></tr>');	
						});
						
						aHTML.push('</table>');

						$('#ns1blankspaceItemAddSearchResults').html(aHTML.join(''))
						
						$('.ns1blankspaceRowSelect')
						.click(function()
						{
							var sID = this.id;
							var aID = sID.split('-');

							$('#ns1blankspaceItemAccount').attr('data-id', aID[1]);
							$('#ns1blankspaceItemAccount').val($(this).html());
							$('#ns1blankspaceItemAddSearchResults').html('');

							if (aID[2] != '')
							{
								$('[name="radioTaxCode"][value="' + aID[2] + '"]').attr('checked', true);

								ns1blankspace.financial.util.tax.calculate(
								{
									amountXHTMLElementID: 'ns1blankspaceItemAmount',
									taxXHTMLElementID: 'ns1blankspaceItemTax'
								});

								$('#ns1blankspaceItemAmount').focus();
							}

						});
					}
				}	
			},

			save: function(oParam)
			{
				var sNamespace = ns1blankspace.util.getParam(oParam, 'namespace').value;

				ns1blankspace.status.working();

				var iAccount = ns1blankspace.util.getParam(oParam, 'account').value;
				var iID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {index: 1}).value;
				var cAmount = $('#ns1blankspaceItemAmount').val();
				if (cAmount == '') {cAmount = 0}
				var cTax = $('#ns1blankspaceItemTax').val();
				if (cTax == '') {cTax = 0}
				var iProject = $('#ns1blankspaceItemProject').attr('data-id');

				var oData = {}
				
				if (iID !== undefined) {oData.id = iID}
				if (iAccount === undefined) {iAccount = $('#ns1blankspaceItemAccount').attr('data-id')}

				oData.object = ns1blankspace.object;
				oData.objectcontext = ns1blankspace.objectContext;
				oData.financialaccount = iAccount;
				oData.amount = cAmount;
				oData.tax = cTax;
				oData.taxtype = $('input[name="radioTaxCode"]:checked').val();
				oData.project = iProject;
				oData.description = $('#ns1blankspaceItemDescription').val();
					
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('FINANCIAL_ITEM_MANAGE'),
					data: oData,
					dataType: 'json',
					success: function(oResponse)
					{
						ns1blankspace.status.message('Saved');

						var sData = 'object=' + ns1blankspace.object;
						sData += '&objectcontext=' + ns1blankspace.objectContext;
						
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('FINANCIAL_ITEM_COMPLETE'),
							data: sData,
							dataType: 'json',
							success: function(oResponse)
							{	
								oParam.refresh = true;
								ns1blankspace.financial.item.show(oParam);
								ns1blankspace.financial[sNamespace].refresh();
								if (iID === undefined)
								{	
									$('#ns1blankspaceItemAmount').val('');
									$('#ns1blankspaceItemTax').val('');
									$('#ns1blankspaceItemDescription').val('');
								}
								else
								{
									var aHTML = [];
								
									aHTML.push('<table class="ns1blankspaceColumn2">' +
													'<tr><td class="ns1blankspaceAction">' +
													'<span id="ns1blankspaceItemAdd">Add</span>' +
													'</td></tr></table>');					
									
									$('#ns1blankspaceItemColumn2').html(aHTML.join(''));
								
									$('#ns1blankspaceItemAdd').button(
									{
										label: "Add"
									})
									.click(function()
									{
										oParam = ns1blankspace.util.setParam(oParam, 'xhtmlElementID', undefined);
										oParam = ns1blankspace.util.setParam(oParam, 'step', 1);
										ns1blankspace.financial.item.edit(oParam);
									});						
								}	
							}
						});
					}
				});
			},
		},

		invoice:
		{
			search:
			{
				send: function(sXHTMLElementID, oParam)
				{
					var aSearch = sXHTMLElementID.split('-');
					var sElementID = aSearch[0];
					var sSearchContext = aSearch[1];
					var iMinimumLength = 0;
					var iSource = ns1blankspace.data.searchSource.text;
					var sSearchText;
					var iMaximumColumns = 1;
					var iRows = 10;

					// v3.1.1e SUP022621 Added legalname
					// v3.1.2 SUP022625 Added street address & credit / receipted / OS amts
					var sFields = 'contactbusinesssenttotext,contactbusinesssentto,contactpersonsenttotext,contactpersonsentto,invoice.contactbusinesssentto.legalname,' +
									'projecttext,project,projecttext,area,areatext,' +
									'object,objectcontext,' +
									'reference,purchaseorder,sentdate,duedate,description,amount,tax,sent,frequency,creditamount,receiptamount,outstandingamount,' +
									'invoice.contactpersonsentto.email,' +
									'invoice.contactbusinesssentto.mailingaddress1,invoice.contactbusinesssentto.mailingaddress2,invoice.contactbusinesssentto.mailingpostcode,' +
									'invoice.contactbusinesssentto.mailingsuburb,invoice.contactbusinesssentto.mailingstate,invoice.contactbusinesssentto.mailingcountry,' +
									'invoice.contactbusinesssentto.streetaddress1,invoice.contactbusinesssentto.streetaddress2,invoice.contactbusinesssentto.streetpostcode,' +
									'invoice.contactbusinesssentto.streetsuburb,invoice.contactbusinesssentto.streetstate,invoice.contactbusinesssentto.streetcountry';
					
					if (oParam != undefined)
					{
						if (oParam.source != undefined) {iSource = oParam.source}
						if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
						if (oParam.rows != undefined) {iRows = oParam.rows}
						if (oParam.searchContext != undefined) {sSearchContext = oParam.searchContext}
						if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
						if (oParam.maximumColumns != undefined) {iMaximumColumns = oParam.maximumColumns}
					}
					
					if (sSearchContext != undefined  && iSource != ns1blankspace.data.searchSource.browse)
					{
						$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
						
						ns1blankspace.objectContext = sSearchContext;
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
						oSearch.addField(nsFreshcare.util.getSearchFields({fields: sFields, namespace: 'financial.invoice.searchFields'}));
						oSearch.addField(ns1blankspace.option.auditFields);
						
						oSearch.rf = 'json';
						oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
						
						oSearch.getResults(function(oResponse) 
						{
							if (oResponse.status == 'OK')
							{
								ns1blankspace.financial.invoice.show(oParam, oResponse)	
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
							}
						});
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
							var aSearch = sSearch.split('-');
							sSearchText = aSearch[1];
						}
						
						if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
						{
							ns1blankspace.search.start();

							var oSearch = new AdvancedSearch();
							oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
							oSearch.addField(nsFreshcare.util.getSearchFields({fields: sFields, namespace: 'financial.invoice.searchFields'}));
							
							oSearch.addBracket('(');
							oSearch.addFilter('reference', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('invoice.contactbusinesssentto.tradename', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator('or');
							oSearch.addFilter('invoice.contactpersonsentto.surname', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addBracket(')');

							ns1blankspace.search.advanced.addFilters(oSearch);
							
							oSearch.sort('reference', 'desc');

							oSearch.getResults(function(data) {ns1blankspace.financial.invoice.search.process(oParam, data)});	
						}
					};	
				}
			},

			layout: function()
			{	// v3.1.1f SUP022623 Aliased as board members can't add attachments or actions and need 'read-only' access
				var aHTML = [];
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				
				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Details</td></tr>');

					if (!ns1blankspace.option.quickInvoice)
					{
						aHTML.push('<tr><td style="padding-top:5px;">' +
										'<span class="ns1blankspaceSub" style="font-size:0.75em;">Enter these details and then click Save to enter the invoice items.</span></td></tr>');
					}	
				}
				else
				{	
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
									'Details</td></tr>');
					
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlItem" class="ns1blankspaceControl">' +
									'Items</td></tr>');
				
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlReceipts" class="ns1blankspaceControl">' +
									'Receipts</td></tr>');
									
					aHTML.push('<tr><td id="ns1blankspaceControlCredit" class="ns1blankspaceControl">' +
									'Credits</td></tr>');
																
					aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
									'GL</td></tr>');
								
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
									'Actions</td></tr>');
								
					if (!bReadOnly)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
										'Emails</td></tr>');
					}
								
					aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
									'Attachments</td></tr>');
				}
								
				aHTML.push('</table>');					
						
				$('#ns1blankspaceControl').html(aHTML.join(''));
				
				var aHTML = [];

				aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainItem" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainCredit" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainReceipt" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				$('#ns1blankspaceControlSummary').click(function(event)
				{	// v3.1.209 Added parameter to summary.show call
					ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.invoice.summary.show({object: '5', checkForSchedule: true});
				});

				$('#ns1blankspaceControlDetails').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.invoice.details();
				});
				
				$('#ns1blankspaceControlItem').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainItem', refresh: true});
					ns1blankspace.financial.item.show({namespace: 'invoice'});
				});
				
				$('#ns1blankspaceControlCredit').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainCredit', refresh: true});
					ns1blankspace.financial.util.credit.show({namespace: 'invoice'});
				});
				
				$('#ns1blankspaceControlReceipts').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainReceipt', refresh: true});
					ns1blankspace.financial.invoice.receipt.init({actions: {add: !bReadOnly}, options: {remove: !bReadOnly, view: true}});
				});
				
				$('#ns1blankspaceControlGL').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainTransaction', refresh: true});
					ns1blankspace.financial.transactions.show();
				});

				$('#ns1blankspaceControlActions').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't add actions
					nsFreshcare.extend.financial.actions.bind();
				});

				$('#ns1blankspaceControlEmails').click(function(event)
				{	// v3.1.1f Added as Freshcare want to split actions & emails
					nsFreshcare.extend.financial.emails.bind();
				});

				$('#ns1blankspaceControlAttachments').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't attach documents
					ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
					ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments', 
													actions: {add: !bReadOnly,
														  remove: !bReadOnly}});
				});			
			},

			show: function (oParam, oResponse)
			{	// v3.1.1f SUP022623 Aliased as board members can't add save or delete
				var bShowItems = ns1blankspace.util.getParam(oParam, 'showItems', {"default": false}).value;
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();

				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				ns1blankspace.financial.invoice.layout();
				
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.objectContextData = undefined;
					
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find the invoice.</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					ns1blankspace.financial.invoice.receipt.refresh();

					ns1blankspace.objectContextData = oResponse.data.rows[0];
					
					// v3.1.1f SUP022623 Board Members can't save or delete
					if (bReadOnly) 
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					else
					{
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					}

					$('#ns1blankspaceControlContext').html(
						'<span id="ns1blankspaceControlContext_reference">' + ns1blankspace.objectContextData.reference + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_sentdate" class="ns1blankspaceSub">' + ns1blankspace.objectContextData.sentdate + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_amount" class="ns1blankspaceSub">$' + ns1blankspace.objectContextData.amount + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_outstanding" class="ns1blankspaceSub"></span>');
						
					ns1blankspace.history.view(
					{
						newDestination: 'ns1blankspace.financial.invoice.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
					});
					
					if (bShowItems)
					{
						$('.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
						$('#ns1blankspaceControlItem').addClass('ns1blankspaceHighlight');
						$('#ns1blankspaceControlItem').click();
					}
					else
					{	
						ns1blankspace.history.control({functionDefault: 'ns1blankspace.financial.invoice.summary.show()'});
					}	
				}	
			},		
		
			summary:
			{	
				show: function (oParam)
				{	/* To be removed */
					// v3.1.1 Aliased because upgrade 1blankspace version now calls different template init that doens't work with lineitemtemplates
					var aHTML = [];
					var bUseTemplate = false;
					
					if (oParam)
					{
						if (oParam.useTemplate != undefined) {bUseTemplate = oParam.useTemplate}
					}
					else
					{
						oParam = {}
					}

					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find the invoice.</td></tr></table>');
								
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));
					}
					else
					{
						if (ns1blankspace.financial.summaryUseTemplate || bUseTemplate)
						{	
							$('#ns1blankspaceSummaryColumn1').html(ns1blankspace.xhtml.loading);
							oParam.onComplete = ns1blankspace.financial.invoice.summary["default"];
							ns1blankspace.util.initTemplate(oParam);
						}	
						else
						{
							ns1blankspace.financial.invoice.summary["default"](oParam);
						}
					}	
				},

				"default": function (oParam)
				{
					// ***************** Aliased in Freshmark - changes to be made in both if required ******************
					// v3.1.2 Now calls pre-processing step prior to rendering page
					// v3.1.209 Uses ns1bs.format.templates.get to get relevant template
					var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
					var aHTML = [];
					var bUseTemplate = ns1blankspace.util.getParam(oParam, 'useTemplate', {'default': false}).value;

					if (oParam == undefined) {oParam = {}}

					if (ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find the invoice.</td></tr></table>');
								
						$('#ns1blankspaceMainSummary').html(aHTML.join(''));
					}
					else
					{
						if (oParam.summaryDefaultStep == undefined && ns1blankspace.data.financial && ns1blankspace.data.financial.invoice 
							&& $.type(ns1blankspace.data.financial.invoice.functionRenderPreProcess) == 'function')
						{
							oParam.summaryDefaultStep = 1;
							oParam.onComplete = ns1blankspace.financial.invoice.summary["default"];
							ns1blankspace.data.financial.invoice.functionRenderPreProcess(oParam);
						}
						else
						{
							delete(oParam.summaryDefaultStep);

							aHTML.push('<table class="ns1blankspaceMain">' +
											'<tr class="ns1blankspaceRow">' +
											'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
											'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:80px;"></td>' +
											'</tr>' +
											'</table>');				

							$('#ns1blankspaceMainSummary').html(aHTML.join(''));	

							var aHTML = [];
							var oTemplate = ns1blankspace.format.templates.get(oParam);

							if (oTemplate != undefined && (ns1blankspace.financial.summaryUseTemplate || bUseTemplate))
							{
								aHTML.push(ns1blankspace.format.render(
									{
										object: 5, 
										template: 'invoice', 
										xhtmlTemplate: oTemplate.xhtml,
										objectOtherData: oParam.objectOtherData
									}));
								$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
							}
							else
							{
								aHTML.push('<table class="ns1blankspace">' +
											'<tr class="ns1blankspaceRow">' +
											'<td id="ns1blankspaceSummaryColumn1A" class="ns1blankspaceColumn1Flexible"></td>' +
											'<td id="ns1blankspaceSummaryColumn1B" class="ns1blankspaceColumn1Flexible"></td>' +
											'</tr>' +
											'</table>');

								$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

								var aHTML = [];

								aHTML.push('<table class="ns1blankspace">');
								
								if (ns1blankspace.objectContextData.contactbusinesssenttotext != '')
								{

									aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Business</td></tr>' +
													'<tr><td id="ns1blankspaceSummaryBusiness" class="ns1blankspaceSummary">' +
													ns1blankspace.objectContextData.contactbusinesssenttotext +
													'</td></tr>');
								}
								
								if (ns1blankspace.objectContextData.contactpersonsenttotext != '')
								{
									aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Person</td></tr>' +
													'<tr><td id="ns1blankspaceSummaryPerson" class="ns1blankspaceSummary">' +
													ns1blankspace.objectContextData.contactpersonsenttotext +
													'</td></tr>');
								}
								
								if (ns1blankspace.objectContextData.sent == 'Y')
								{
									aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Sent Date</td></tr>' +
													'<tr><td id="ns1blankspaceSummarySentDate" class="ns1blankspaceSummary">' +
													ns1blankspace.objectContextData.sentdate +
													'</td></tr>');

									aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Due Date</td></tr>' +
													'<tr><td id="ns1blankspaceSummaryDueDate" class="ns1blankspaceSummary">' +
													ns1blankspace.objectContextData.duedate +
													'</td></tr>');	
								}
									
								aHTML.push('</table>');			
							
								$('#ns1blankspaceSummaryColumn1A').html(aHTML.join(''));

								var aHTML = [];

								if (ns1blankspace.objectContextData.description != '')
								{
									aHTML.push('<table class="ns1blankspaceColumn2">');
									aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Description</td></tr>' +
													'<tr><td id="ns1blankspaceSummaryDescription" class="ns1blankspaceSummary">' +
													ns1blankspace.objectContextData.description +
													'</td></tr>');
									aHTML.push('</table>');
								}
								
								$('#ns1blankspaceSummaryColumn1B').html(aHTML.join(''));				
							
							}

							var aHTML = [];

							aHTML.push('<table class="ns1blankspaceColumn2">');
															
							if (ns1blankspace.xhtml.templates['invoice'] != '')
							{
								if (ns1blankspace.financial.summaryUseTemplate || bUseTemplate)
								{
									aHTML.push('<tr><td><span id="ns1blankspaceSummaryCreatePDF"' +
													' class="ns1blankspaceAction ns1blankspaceNoUnloadWarn" style="width:75px;">' +
													'PDF</span></td></tr>');
								}
								else
								{				
									aHTML.push('<tr><td>' +
													'<span id="ns1blankspaceSummaryView" class="ns1blankspaceAction" style="width:75px;">' +
													'View</span></td></tr>');
								}

								if (!bReadOnly)
								{	// v3.1.1f SUP022623 Freshcare Board Members can't send emails
									aHTML.push('<tr><td>' +
												'<span id="ns1blankspaceSummaryEmail" class="ns1blankspaceAction" style="width:75px;">' +
												'Email</span></td></tr>');
								}

								if (ns1blankspace.objectContextData.sent == 'N')
								{	
									aHTML.push('<tr><td style="padding-top:15px;" class="ns1blankspaceSummaryCaption">Not sent</td></tr>');			
								}

								aHTML.push('</table>');					
								
								$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
								
								if (ns1blankspace.financial.summaryUseTemplate || bUseTemplate)
								{
									$('#ns1blankspaceSummaryCreatePDF').button(
									{
										label: 'PDF'
									})
									.click(function(event)
									{
										// v3.1.2 Now puts site url into any src elements
										// v3.1.2 Now passes baseURL
										var sHTML = $('#ns1blankspaceSummaryColumn1').html();
										var sUrl = document.location.origin;

										// v3.1.0g SUP022278 reverted back to 1blankspace pdf creation
										// v3.1.0i now passes xhtmlElementID to avoid double-creating the PDF
										var sBaseURL = window.location.href.split('://').pop();		
										sBaseURL = window.location.href.split('://').shift() + '://' + sBaseURL.split('/').shift();
										//sHTML = sHTML.replace(/ src="site/g,' src="' + sUrl + '/site')
										ns1blankspace.pdf.create(
										{
											xhtmlElementID: 'ns1blankspaceSummaryCreatePDF',
											xhtmlContent: sHTML,
											filename: ns1blankspace.objectContextData.reference + '.pdf',
											open: false,
											baseURLBody: sBaseURL
										});
									});
								}		
								else		
								{	
									$('#ns1blankspaceSummaryView').button(
									{
										label: 'View'
									})
									.click(function(event)
									{	
										//nsFreshcare.extend.financial.invoice.summary.show({useTemplate: true});
										oParam.useTemplate = true;
										ns1blankspace.financial.invoice.summary["default"](oParam);
									});
								}

								$('#ns1blankspaceSummaryEmail').button(
								{
									label: 'Email'
								})
								.click(function(event)
								{
									// v3.1.1 SUP022524 Need to blank out what's on summary tab as it messes with the output
									if (ns1blankspace.financial.summaryUseTemplate || bUseTemplate)
									{
										$('#ns1blankspaceSummaryColumn1').html('');
										delete(ns1blankspace.objectContextData.xhtml);
									}
									ns1blankspace.financial.invoice.email.init();
								});
							}	
						}
					}	
				}
			},

			details: function ()
			{
				//v3.1.1i aliased as need readonly access to Invoice Details
				var aHTML = [];
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
					
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
									'Business' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsContactBusinessSentTo" class="ns1blankspaceSelect"' +
										' data-method="CONTACT_BUSINESS_SEARCH"' +
										' data-columns="tradename">' +
									'</td></tr>');	
						
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Person' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsContactPersonSentTo" class="ns1blankspaceSelect"' +
										' data-method="CONTACT_PERSON_SEARCH"' +
										' data-columns="firstname-space-surname"' +
										' data-parent="ns1blankspaceDetailsContactBusinessSentTo"' +
										' data-parent-search-id="contactbusiness"' +
										' data-parent-search-text="tradename">' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Purchase Order Number' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsPurchaseOrderReference" class="ns1blankspaceText">' +
									'</td></tr>');	
					
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceDate">' +
									'<input id="ns1blankspaceDetailsSentDate" class="ns1blankspaceDate">' +
									'</td></tr>');		
										
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Due Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceDate">' +
									'<input id="ns1blankspaceDetailsDueDate" class="ns1blankspaceDate">' +
									'</td></tr>');

					if (ns1blankspace.objectContext == -1 && ns1blankspace.option.quickInvoice)
					{
						aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Account' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceItemAccount" class="ns1blankspaceText">' +
									'</td></tr>');
						
						aHTML.push('<tr><td style="padding-bottom:5px;" id="ns1blankspaceItemAddSearchResults">' +
										'<span class="ns1blankspaceSub" style="font-size:0.75em;">Press <i>enter</i> to see all or just start typing.</span></td></tr>');
				
						aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Amount' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceItemAmount" class="ns1blankspaceText">' +
										'</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									ns1blankspace.option.taxVATCaption + ' Type' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceFinancialTaxCode" class="ns1blankspaceRadio">' +
									ns1blankspace.xhtml.loadingSmall +
									'</td></tr>');	

						aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									ns1blankspace.option.taxVATCaption + ' Amount' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceItemTax" class="ns1blankspaceText">' +
									'</td></tr>');
					}

					aHTML.push('</table>');
					
					$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));

					ns1blankspace.financial.util.tax.codes(
					{
						xhtmlElementID: 'ns1blankspaceFinancialTaxCode',
						id: 1,
						type: 1
					});

					$('#ns1blankspaceItemAmount').keyup(function()
					{
						ns1blankspace.financial.util.tax.calculate(
						{
							amountXHTMLElementID: 'ns1blankspaceItemAmount',
							taxXHTMLElementID: 'ns1blankspaceItemTax'
						});
					});

					$('[name="radioTaxCode"]').click(function()
					{
						ns1blankspace.financial.util.tax.calculate(
						{
							amountXHTMLElementID: 'ns1blankspaceItemAmount',
							taxXHTMLElementID: 'ns1blankspaceItemTax'
						});
					});

					$('#ns1blankspaceItemAccount').keyup(function()
					{
						oParam = ns1blankspace.util.setParam(oParam, 'step', 2);
						if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
				        ns1blankspace.timer.delayCurrent = setTimeout('ns1blankspace.financial.item.edit(' + JSON.stringify(oParam) + ')', ns1blankspace.option.typingWait);
					});
	
					$('#ns1blankspaceItemAccount').focus();
					
					$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});
					
					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspace">');

					var bSent = false;

					if (ns1blankspace.objectContextData)
						{bSent = (ns1blankspace.objectContextData.sent == 'Y')}

					if (bSent && !bReadOnly)	//v3.1.1i
					{	
						aHTML.push('<tr><td>' +
									'<span id="ns1blankspaceDetailUndoSend" class="ns1blankspaceAction">Mark as unsent</span>' +
									'</td></tr>');
					}
					else
					{	
						aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Sent' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceRadio">' +
									'<input type="radio" id="radioSentN" name="radioSent" value="N"/>No' +
									'&nbsp;&nbsp;<input type="radio" id="radioSentY" name="radioSent" value="Y"/>Yes' +
									'</td></tr>');
					}	
						
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Description' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceTextMulti">' +
									'<textarea id="ns1blankspaceDetailsDescription" class="ns1blankspaceTextMulti" rows="5" cols="35" style="height:150px;"></textarea>' +
									'</td></tr>');	

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Create Copy' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceRadio">' +
									'<input type="radio" id="radioFrequency9" name="radioFrequency" value="9"/>Never' +
									'<br /><input type="radio" id="radioFrequency4" name="radioFrequency" value="4"/>Next Month' +
									'<br /><input type="radio" id="radioFrequency5" name="radioFrequency" value="5"/>In 3 Months' +
									'<br /><input type="radio" id="radioFrequency7" name="radioFrequency" value="7"/>In 1 Year' +
									'</td></tr>');					
									
					aHTML.push('</table>');					
						
					$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

					$('#ns1blankspaceDetailUndoSend').button().click(function()
					{
						var sID = this.id;
						var aID = sID.split('-');
						var iStatus = aID[1];
						
						$.ajax(
						{
							type: 'GET',
							url: ns1blankspace.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
							data: 'override_LockedSent=Y&sent=N&id=' + ns1blankspace.objectContext,
							dataType: 'json',
							success: function(oResponse) {ns1blankspace.financial.invoice.search.send('-' + ns1blankspace.objectContext)}
						});
					});

					// v3.1.207 SUP023067 Ampersands fixed 
					if (ns1blankspace.objectContextData != undefined)
					{
						$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData.reference.formatXHTML());
						$('#ns1blankspaceDetailsPurchaseOrderReference').val(ns1blankspace.objectContextData.purchaseorder.formatXHTML());
						$('#ns1blankspaceDetailsContactBusinessSentTo').attr('data-id', ns1blankspace.objectContextData.contactbusinesssentto);
						$('#ns1blankspaceDetailsContactBusinessSentTo').val(ns1blankspace.objectContextData.contactbusinesssenttotext.formatXHTML());
						$('#ns1blankspaceDetailsContactPersonSentTo').attr('data-id', ns1blankspace.objectContextData.contactpersonsentto);
						$('#ns1blankspaceDetailsContactPersonSentTo').val(ns1blankspace.objectContextData.contactpersonsenttotext.formatXHTML());	
						$('[name="radioSent"][value="' + ns1blankspace.objectContextData.sent + '"]').prop('checked', true);
						$('#ns1blankspaceDetailsSentDate').val(ns1blankspace.objectContextData.sentdate);
						$('#ns1blankspaceDetailsDueDate').val(ns1blankspace.objectContextData.duedate);
						$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData.description.formatXHTML());
						$('[name="radioFrequency"][value="' + ns1blankspace.objectContextData.frequency + '"]').prop('checked', true);
					}
					else
					{
						$('[name="radioSent"][value="' + ns1blankspace.financial.data.settings.defaultinvoicesentvalue + '"]').prop('checked', true);
						$('[name="radioFrequency"][value="9"]').prop('checked', true);
						$('#ns1blankspaceDetailsSentDate').val(Date.today().toString("dd MMM yyyy"));
					}
				}	
			},

			email:
			{
				init: function (oParam)
				{	// v3.1.1 Aliased because upgrade 1blankspace version now calls different template init that doens't work with lineitemtemplates
					ns1blankspace.status.working('Creating...');
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', ns1blankspace.financial.invoice.email.render);
					ns1blankspace.util.initTemplate(oParam);
				},

				render: function (oParam, oResponse)
				{	// v3.1.0e SUP022278 Aliased because need lineitem alias on FINANCIAL_ITEM_SEARCH results
					// v3.1.0i SUP022278 Now does search for 500 rows to make sure we get all line_item rows
					// v3.1.2 (Freshmark) Now calls pre-processing function before calling format.render

					var iMode = ns1blankspace.util.getParam(oParam, 'mode', {"default": 1}).value;	//1=Show, 2=Just Send
					var iFormat = ns1blankspace.util.getParam(oParam, 'format', {"default": 1}).value;	//1=HTML, 2=PDF
					var sTemplate = ns1blankspace.util.getParam(oParam, 'template', {'default': 'invoice'}).value;

					oResponse = (oResponse == undefined) ? oParam.response : oResponse;

					if (oResponse == undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_ITEM_SEARCH';
						oSearch.addField(nsFreshcare.util.getSearchFields(
								{
									fields: 'lineitem.financialaccounttext,lineitem.tax,lineitem.issuedamount,lineitem.amount,lineitem.description,lineitem.object', 
									namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCH'
								}));
						oSearch.addFilter('object', 'EQUAL_TO', '5');
						oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
						oSearch.rows = 500;
						$.each(nsFreshcare.util.getSearchFields({fields: [{name: 'id', direction: 'asc'}], namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCHSort'}), function()
						{
							oSearch.sort(this.name, this.direction);
						});
						oSearch.getResults(function(data)
						{
							//oParam.template = "invoice";
							if (ns1blankspace.data.financial && ns1blankspace.data.financial.invoice 
								&& $.type(ns1blankspace.data.financial.invoice.functionRenderPreProcess) == 'function')
							{
								oParam.response = data;
								oParam.onComplete = nsFreshcare.extend.financial.invoice.email.render;
								ns1blankspace.data.financial.invoice.functionRenderPreProcess(oParam);
							}
							else
							{
								nsFreshcare.extend.financial.invoice.email.render(oParam, data);
							}
						});
					}	
					else
					{
						delete(oParam.response);
						ns1blankspace.objectContextData.xhtml = ns1blankspace.format.render(
						{
							object: 5,
							xhtmlTemplate: ns1blankspace.xhtml.templates[sTemplate],
							objectData: ns1blankspace.objectContextData,
							objectOtherData: (oParam.objectOtherData ? oParam.objectOtherData : oResponse.data.rows),
							template: sTemplate
						});

						ns1blankspace.status.clear();

						if (iMode == 1)
						{
							ns1blankspace.financial.invoice.email.show(oParam);
						}
						else
						{
							ns1blankspace.financial.invoice.email.send(oParam);
						}
					}		
				},

				show: function (oParam)
				{
					ns1blankspace.format.editor.init();

					var aHTML = [];

					aHTML.push('<table class="ns1blankspace" cellspacing=0 cellpadding=0>');
		
					aHTML.push('<tr><td>')

						aHTML.push('<table class="ns1blankspace" style="width:100%;" cellspacing=0 cellpadding=0>');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' +
										'To</td>' +
										'<td class="ns1blankspaceCaption">' +
										'From</td></tr>' +
										'<tr>' +
										'<td class="ns1blankspaceText" style="padding-right:15px; padding-left:0px;">' +
										'<input id="ns1blankspaceEmailTo" class="ns1blankspaceText">' +
										'</td><td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceEmailFrom" class="ns1blankspaceSelect"' +
													' data-method="SETUP_MESSAGING_ACCOUNT_SEARCH"' +
													' data-methodFilter="type-EQUAL_TO-5"' +
													' data-customOption="hasaccess-Y"' +
													' data-columns="email">' +
										'</td></tr>');

						aHTML.push('</table>');											

					aHTML.push('</td></tr>')

					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceEmailSubject" class="ns1blankspaceText" style="width:80%;">' +
									' <div style="font-size:0.875em; color:#999999; float:right; margin-top:6px;">' +
										'<input type="checkbox" id="ns1blankspaceEmailAttachPDF" checked="true">Attach a PDF</div>' +
									'</td></tr>');	

					ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;		

					aHTML.push('<tr class="ns1blankspaceTextMulti">' +
									'<td class="ns1blankspaceTextMulti">' +
									'<textarea rows="30" cols="50" id="ns1blankspaceMessageText' +
										ns1blankspace.counter.editor + '" editorcount="' + ns1blankspace.counter.editor + '" class="ns1blankspaceTextMulti"></textarea>' +
									'</td></tr>');

					aHTML.push('</table>');					
		
					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

					var sMessage = (ns1blankspace.objectContextData.xhtml) ? ns1blankspace.objectContextData.xhtml : (ns1blankspace.user.emailSignature ? ns1blankspace.user.emailSignature : '');

					// v3.1.202 SUP022980 Freshcare don't want this to show
					//$('#ns1blankspaceMessageText' + ns1blankspace.counter.editor).val(sMessage);

					// 3.1.2 Now calls generic function so compatible with MCEv3
					ns1blankspace.format.editor.init({selector: 'ns1blankspaceMessageText' + ns1blankspace.counter.editor});

					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspaceColumn2">' +
									'<tr><td><span id="ns1blankspaceEmailSend" class="ns1blankspaceAction">' +
									'Send</span></td></tr>' +
									'<tr><td><span id="ns1blankspaceEmailCancel" class="ns1blankspaceAction">' +
									'Cancel</span></td></tr>' +
									'</table>');					
					
					$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));
					
					$('#ns1blankspaceEmailAttachPDF')
						.on('click', function()
						{
							tinyMCE.editors[ns1blankspace.counter.editor].destroy(true);

							$('#ns1blankspaceMessageText' + ns1blankspace.counter.editor).attr('id', 'ns1blankspaceMessageText' + (ns1blankspace.counter.editor + 1));
							$('#ns1blankspaceMessageText' + ns1blankspace.counter.editor).attr('editorcount', ns1blankspace.counter.editor);
							ns1blankspace.counter.editor = ns1blankspace.counter.editor + 1;
							if ($(this).prop('checked'))
							{
								$('#ns1blankspaceMessageText' + ns1blankspace.counter.editor).val('');
							}
							else
							{
								$('#ns1blankspaceMessageText' + ns1blankspace.counter.editor).val(sMessage);
							}
							ns1blankspace.format.init({selector: 'ns1blankspaceMessageText' + ns1blankspace.counter.editor});
						});

					$('#ns1blankspaceEmailSend').button(
					{
						text: "Send"
					})
					.click(function()
					{
						if ($('#ns1blankspaceEmailAttachPDF:checked').length == 0)
						{
							ns1blankspace.financial.invoice.email.send(oParam)
						}
						else
						{
							// v3.1.2 Now passes baseurl
							var sBaseURL = window.location.href.split('://').pop();		
							sBaseURL = window.location.href.split('://').shift() + '://' + sBaseURL.split('/').shift();
							oParam.baseURLBody = sBaseURL;
							oParam = ns1blankspace.util.setParam(oParam, 'onComplete', ns1blankspace.financial.invoice.email.send);
							oParam = ns1blankspace.util.setParam(oParam, 'xhtmlContent', ns1blankspace.objectContextData.xhtml);
							oParam = ns1blankspace.util.setParam(oParam, 'filename', ns1blankspace.objectContextData.reference + '.pdf');
							oParam = ns1blankspace.util.setParam(oParam, 'open', false);

							ns1blankspace.pdf.create(oParam);
						}	
					})
					.css('width', '65px');

					$('#ns1blankspaceEmailCancel').button(
					{
						text: "Cancel"
					})
					.click(function()
					{
						ns1blankspace.financial.invoice.summary.show();
					})
					.css('width', '65px');

					//$('#ns1blankspaceEmailFrom').val(ns1blankspace.user.email);
					$('#ns1blankspaceEmailTo').val(ns1blankspace.objectContextData['invoice.contactpersonsentto.email']);
					$('#ns1blankspaceEmailSubject').val(ns1blankspace.user.contactBusinessText + ' Invoice ' + ns1blankspace.objectContextData['reference']);

					if (ns1blankspace.objectContextData['invoice.contactpersonsentto.email'] == '')
					{
						$('#ns1blankspaceEmailTo').focus();
					}
				},	

				send: function(oParam, oResponse)
				{	// v3.1.0g SUP022278 Want to use rpc email
					var iMode = ns1blankspace.util.getParam(oParam, 'mode', {"default": 1}).value;

					//1=Show, 2=Just Send

					var iFormat = ns1blankspace.util.getParam(oParam, 'format', {"default": 1}).value;

					//1=HTML, 2=PDF

					var iAttachmentLink = ns1blankspace.util.getParam(oParam, 'attachmentLink').value;

					if (iMode == 1)
					{
						var sTo = $('#ns1blankspaceEmailTo').val();
						var sSubject = $('#ns1blankspaceEmailSubject').val();
						var sMessage = tinyMCE.get('ns1blankspaceMessageText' + ns1blankspace.counter.editor).getContent();
					}	
					else
					{	
						var sTo = ns1blankspace.objectContextData['invoice.contactpersonsentto.email'];
						var sSubject = ns1blankspace.objectContextData.reference;
						var sMessage = ns1blankspace.objectContextData.xhtml;
					}	

					if (sTo == '')
					{
						ns1blankspace.status.error('No email address')
					}
					else
					{	
						ns1blankspace.status.working('Emailing...');

						if (ns1blankspace.objectContextData.xhtml == '')
						{
							ns1blankspace.status.error('Nothing to email');
						}	
						else
						{
							var oData = 
							{
								subject: sSubject,
								message: sMessage,
								to: sTo,
								saveagainstobject: 5,
								saveagainstobjectcontext: ns1blankspace.objectContext,
								send: 'Y',
								applysystemtemplate: 'Y'
							}

							if (iAttachmentLink !== undefined)
							{
								oData.copyattachmentsfromobject = 5;
								oData.copyattachmentsfromobjectcontext = ns1blankspace.objectContext;
								oData.copyattachmentsfromobjectattachmentlink = iAttachmentLink;
							}	

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
								data: oData,
								dataType: 'json',
								global: false,
								success: function (data)
								{
									if (data.status == 'OK')
									{
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
											data: 'sent=Y&id=' + ns1blankspace.objectContext,
											dataType: 'json',
											global: false,
											success: function (data)
											{
												ns1blankspace.status.message('Emailed');
												ns1blankspace.financial.invoice.summary.show();
											}
										});
									}
									else
									{
										ns1blankspace.status.error('Could not send email')
									}
								}
							});
						}
					}	
				}	
			},

			receipt:
			{
				show: function (oParam, oResponse)
				{	// v3.1.1f Correctly responds to options and actions parameters
					var iObjectContext = ns1blankspace.util.getParam(oParam, 'readOnly', {'default': ns1blankspace.objectContext}).value;
					var oOptions = ns1blankspace.util.getParam(oParam, 'options', {'default': {view: true, remove: true}}).value;
					var oActions = ns1blankspace.util.getParam(oParam, 'actions', {'default': {add: true}}).value;
					
					if (oParam == undefined) {oParam = {}}
					if (oOptions.view == undefined) {oOptions.view = true}
					if (oOptions.remove == undefined) {oOptions.remove = true}
					if (oActions.add == undefined) {oActions.add = true}
						
					if (oResponse == undefined)
					{	
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');

						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceReceiptColumn1" class="ns1blankspaceColumn1Flexible">' +
										ns1blankspace.xhtml.loading + '</td>' +
										'<td id="ns1blankspaceReceiptColumn2" class="ns1blankspaceColumn2" style="width: 350px;"></td>' +
										'</tr>');
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainReceipt').html(aHTML.join(''));	
					
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');
						
						aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceReceiptAdd" class="ns1blankspaceAction">Add</span>' +
										'</td></tr>');
						
						aHTML.push('</table>');					
						
						//$('#ns1blankspaceReceiptColumn2').html(aHTML.join(''));
					
						if (oActions.add)
						{
							$('#ns1blankspaceReceiptAdd').button(
							{
								label: "Add"
							})
							.click(function() {
								 ns1blankspace.financial.invoice.receipt.edit(oParam);
							});
					
							ns1blankspace.financial.invoice.receipt.edit(oParam);
						}		

						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_RECEIPT_INVOICE_SEARCH';
						oSearch.addField('appliesdate,amount,receiptinvoice.receipt.reference,receiptinvoice.receipt.amount,receiptinvoice.receipt.id');
						oSearch.addFilter('invoice', 'EQUAL_TO', iObjectContext);
						oSearch.sort('appliesdate', 'asc');
						oSearch.rows = 1000;
						oSearch.getResults(function(data) {ns1blankspace.financial.invoice.receipt.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
						var h = -1;
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspace">' +
											'<tr><td class="ns1blankspaceNothing">No receipts.</td></tr>' + 
											'</table>');

							$('#ns1blankspaceReceiptColumn1').html(aHTML.join(''));
						}
						else
						{
							//var oReceipts = ns1blankspace.util.unique({key: 'receiptinvoice.receipt.reference', data: oResponse.data.rows});
							var oReceipts = oResponse.data.rows;
					
							aHTML.push('<table class="ns1blankspace" id="ns1blankspaceFinancialInvoiceReceipts">');
							aHTML.push('<tr>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">Amount</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
							aHTML.push('</tr>');

							$.each(oReceipts, function(r, receipt)
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
															
								aHTML.push('<td id="ns1blankspaceReceipt_date-' + receipt.id + '" class="ns1blankspaceRow">' +
												receipt['appliesdate'] + '</td>');

								
								aHTML.push('<td id="ns1blankspaceReceipt_amount-' + receipt.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
												receipt['amount'] + '</td>');
		
								aHTML.push('<td style="width:60px; text-align:right;" class="ns1blankspaceRow">');
									
								if (oOptions.remove)
								{	
									aHTML.push('<span id="ns1blankspaceReceipt_options_remove-' + this.id + '" class="ns1blankspaceReceiptRemove"></span>');
								}

								if (oOptions.view)
								{
									aHTML.push('<span id="view-' + receipt['receiptinvoice.receipt.id'] + '" class="ns1blankspaceView"></span>');
								}
									
								aHTML.push('</td></tr>');
							});
							
							aHTML.push('</table>');

							$('#ns1blankspaceReceiptColumn1').html(aHTML.join(''));
							
							$('#ns1blankspaceFinancialInvoiceReceipts .ns1blankspaceReceiptRemove').button( {
								text: false,
								icons: {
									primary: "ui-icon-close"
								}
							})
							.click(function()
							{
								ns1blankspace.remove(
								{
									xhtmlElementID: this.id,
									method: 'FINANCIAL_RECEIPT_INVOICE_MANAGE',
									ifNoneMessage: 'No receipts.',
									onComplete: ns1blankspace.financial.receipt.refresh
								});
							})
							.css('width', '15px')
							.css('height', '17px');

							$('#ns1blankspaceFinancialInvoiceReceipts .ns1blankspaceView').button(
							{
								text: false,
								icons:
								{
									primary: "ui-icon-play"
								}
							})
							.click(function()
							{
								ns1blankspace.financial.receipt.init({id: (this.id).split('-')[1]})
							})
							.css('width', '15px')
							.css('height', '17px');
					}
					}	
				}
			},

			save:
			{
				send: function(oParam, oResponse)
				{
					if (oParam == undefined) {oParam = {}}
					var oData = ns1blankspace.util.getParam(oParam, 'data', {'default': {}}).value;
					
					if (oResponse == undefined)
					{
						ns1blankspace.status.working();
						
						oData = (ns1blankspace.objectContext == -1) ? {} :{id: ns1blankspace.objectContext};	
						if ($('#ns1blankspaceMainDetails').html() != '')
						{
							
							oData.reference = $('#ns1blankspaceDetailsReference').val();
							oData.purchaseorder = $('#ns1blankspaceDetailsPurchaseOrderReference').val();
							oData.sentdate = $('#ns1blankspaceDetailsSentDate').val();
							oData.duedate = $('#ns1blankspaceDetailsDueDate').val();
							oData.description = $('#ns1blankspaceDetailsDescription').val();
							oData.contactbusinesssentto = $('#ns1blankspaceDetailsContactBusinessSentTo').attr("data-id");
							oData.contactpersonsentto = $('#ns1blankspaceDetailsContactPersonSentTo').attr("data-id");
							oData.contactbusinesssenttotext = $('#ns1blankspaceDetailsContactBusinessSentTo').val();
							oData.contactpersonsenttotext = $('#ns1blankspaceDetailsContactPersonSentTo').val();
							oData.sent = $('input[name="radioSent"]:checked').val();
							oData.frequency = $('input[name="radioFrequency"]:checked').val();
						}

						oParam.data = oData;
						
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
							data: oData,
							dataType: 'json',
							success: function(data) {ns1blankspace.financial.invoice.save.send(oParam, data)}
						});
						
					}
					else
					{			
						if (oResponse.status == 'OK')
						{	
							ns1blankspace.status.message('Saved');
							
							if (ns1blankspace.objectContext == -1)
							{
								ns1blankspace.objectContext = oResponse.id;
								ns1blankspace.financial.invoice.search.send('-' + ns1blankspace.objectContext, {source: 1});
							}	
							else
							{
								$.each(Object.keys(oData), function(index, key)
								{
									if (key != 'id')
									{ns1blankspace.objectContextData[key] = oData[key];}
								});
							}
							ns1blankspace.inputDetected = false;	// v3.1.209 Was not doing this on existing records
						}
						else
						{
							ns1blankspace.status.error('Could not save the invoice!');
						}
					}	
				}
			}
		},

		expense:
		{
			home: function (oParam, oResponse)
			{
				// v3.1.1i SUP022764 Now hides To Be Paid section on Home page
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				
				if (oResponse == undefined)
				{
					var aHTML = [];
					var h = -1;
								
					aHTML.push('<table class="ns1blankspaceMain">' + 
									'<tr class="ns1blankspaceMain">' +
									'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
									ns1blankspace.xhtml.loading +
									'</td></tr>' + 
									'</table>');					
					
					$('#ns1blankspaceMain').html(aHTML.join(''));
					
					if (!bReadOnly)
					{
						var aHTML = [];

						aHTML.push('<table>');
						aHTML.push('<tr><td><div id="ns1blankspaceViewFinancialLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');

						aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td style="padding-top:15px;" id="ns1blankspaceControlOutstanding" class="ns1blankspaceControl">To Be Paid<br /><span class="ns1blankspaceSub" style="font-size:0.75em;">Create a file<br />for payment</span></td>' +
									'</tr>');

						if (ns1blankspace.option.expenseShowImages)
						{
							aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td style="padding-top:15px;" id="ns1blankspaceControlExpenseImages" class="ns1blankspaceControl">' +
											'Payment<br />Receipts<br /><span class="ns1blankspaceSub" style="font-size:0.75em;">photos</span></td>' +
									'</tr>');
						}

						aHTML.push('</table>');		
						
						$('#ns1blankspaceControl').html(aHTML.join(''));
					}
					else 		// v3.1.1i
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}


					$('#ns1blankspaceControlOutstanding').click(function(event)
					{
						ns1blankspace.financial.expense.outstanding.init();
					});

					$('#ns1blankspaceControlExpenseImages').click(function(event)
					{
						ns1blankspace.financial.payment.images.show();
					});		
					
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_EXPENSE_SEARCH';
					oSearch.addField('reference,description,amount,accrueddate,contactbusinesspaidtotext,contactpersonpaidtotext,object,objectcontext');
					oSearch.rows = 10;
					oSearch.sort('modifieddate', 'desc');
					oSearch.getResults(function (data) {ns1blankspace.financial.expense.home(oParam, data)});
				}
				else
				{
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to create an expense.</td></tr>');
						aHTML.push('</table>');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST LIKELY</td></tr>');
						
						$.each(oResponse.data.rows, function()
						{				
							aHTML.push('<tr class="ns1blankspaceRow">');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:50px;">' +
													this.reference + '</td>');	

							aHTML.push('<td id="ns1blankspaceMostLikely_amount-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:50px;text-align:right;padding-left:10px;padding-right:10px;">' +
													'$' + this.amount + '</td>');

							aHTML.push('<td id="ns1blankspaceMostLikely_date-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;text-align:right;padding-right:15px;">' +
													this.accrueddate + '</td>');

							var sContact = this.contactbusinesspaidtotext
							if (sContact == '') {sContact = this.contactpersonpaidtotext}
							
							aHTML.push('<td id="ns1blankspaceMostLikely_contact-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													sContact + '</td>');
								
							aHTML.push('</tr>');
						});
						
						aHTML.push('</tbody></table>');
					}
					
					$('#ns1blankspaceMostLikely').html(aHTML.join(''));
				
					$('td.ns1blankspaceMostLikely').click(function(event)
					{
						ns1blankspace.financial.expense.search.send(event.target.id, {source: 1});
					});
				}
			},

			layout: function()
			{	// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
				var aHTML = [];
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();

				if (bReadOnly) {ns1blankspace.app.context({all: true, inContext: false});}
			
				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Details</td></tr>');
				}
				else
				{	
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
									'Details</td></tr>');
					
					aHTML.push('<tr><td id="ns1blankspaceControlItem" class="ns1blankspaceControl">' +
									'Items</td></tr>');
				
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlPayments" class="ns1blankspaceControl">' +
									'Payments</td></tr>');

					aHTML.push('<tr><td id="ns1blankspaceControlCredit" class="ns1blankspaceControl">' +
									'Credits</td></tr>');
												
					aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
									'GL</td></tr>');
								
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
									'Actions</td></tr>');
								
					if (!bReadOnly)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
										'Emails</td></tr>');
					}

					aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
									'Attachments</td></tr>');
				}
								
				aHTML.push('</table>');					
						
				$('#ns1blankspaceControl').html(aHTML.join(''));
				
				var aHTML = [];

				aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainItem" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainCredit" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainPayment" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				$('#ns1blankspaceControlSummary').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.expense.summary();
				});

				$('#ns1blankspaceControlDetails').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.expense.details();
				});
				
				$('#ns1blankspaceControlItem').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainItem', refresh: true});
					ns1blankspace.financial.item.show({namespace: 'expense'});
				});
				
				$('#ns1blankspaceControlCredit').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainCredit', refresh: true});
					ns1blankspace.financial.util.credit.show();
				});
				
				$('#ns1blankspaceControlPayments').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainPayment', refresh: true});
					ns1blankspace.financial.expense.payment.show({actions: {add: !bReadOnly}, options: {remove: !bReadOnly, view: true}});
				});
				
				$('#ns1blankspaceControlGL').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainTransaction', refresh: true});
					ns1blankspace.financial.transactions.show();
				});

				$('#ns1blankspaceControlActions').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't add actions
					nsFreshcare.extend.financial.actions.bind();
				});

				$('#ns1blankspaceControlEmails').click(function(event)
				{	// v3.1.1f Added as Freshcare want to split actions & emails
					nsFreshcare.extend.financial.emails.bind();
				});

				$('#ns1blankspaceControlAttachments').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't attach documents
					ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
					ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments', 
													actions: {add: !bReadOnly,
														  remove: !bReadOnly}});
				});			
			},

			show: function (oParam, oResponse)
			{	// v3.1.1f SUP022623 Aliased as board members can't add sve or delete
				ns1blankspace.app.clean();
				ns1blankspace.financial.expense.layout();
				
				var aHTML = [];
				var h = -1;
				
				if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.objectContextData = undefined;
					
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find the expense.</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					ns1blankspace.financial.expense.payment.refresh();

					ns1blankspace.objectContextData = oResponse.data.rows[0];
					
					// v3.1.1f SUP022623 Board Members can't save or delete
					if (bReadOnly) 
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					else
					{
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					}

					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.reference +
						'<br /><span id="ns1blankspaceControlContext_accrueddate" class="ns1blankspaceSub">' + ns1blankspace.objectContextData.accrueddate + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_amount" class="ns1blankspaceSub">$' + ns1blankspace.objectContextData.amount + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_outstanding" class="ns1blankspaceSub"></span>');
						
					ns1blankspace.history.view(
					{
						newDestination: 'ns1blankspace.financial.expense.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
					});
					
					ns1blankspace.history.control({functionDefault: 'ns1blankspace.financial.expense.summary()'});
				}	
			},	

			payment:
			{
				show: function (oParam, oResponse)
				{	// v3.1.1f SUP022623 Responds correctly yo options and actions parameters
					var iObjectContext = ns1blankspace.util.getParam(oParam, 'readOnly', {'default': ns1blankspace.objectContext}).value;
					var oOptions = ns1blankspace.util.getParam(oParam, 'options', {'default': {view: true, remove: true}}).value;
					var oActions = ns1blankspace.util.getParam(oParam, 'actions', {'default': {add: true}}).value;
					
					if (oParam == undefined) {oParam = {}}
					if (oOptions.view == undefined) {oOptions.view = true}
					if (oOptions.remove == undefined) {oOptions.remove = true}
					if (oActions.add == undefined) {oActions.add = true}
							
					if (oResponse == undefined)
					{	
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');

						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspacePaymentColumn1" class="ns1blankspaceColumn1Flexible">' +
										ns1blankspace.xhtml.loading + '</td>' +
										'<td id="ns1blankspacePaymentColumn2" class="ns1blankspaceColumn2" style="width: 350px;"></td>' +
										'</tr>');
						
						aHTML.push('</table>');					
						
						$('#ns1blankspaceMainPayment').html(aHTML.join(''));	
						
						if (oActions != undefined)
						{	
							var aHTML = [];
							
							aHTML.push('<table class="ns1blankspaceColumn2">');
							
							if (oActions.add)
							{
								aHTML.push('<tr><td>' +
											'<span id="ns1blankspacePaymentAdd" class="ns1blankspaceAction">Add</span>' +
											'</td></tr>');
							}
							
							aHTML.push('</table>');					
							
							//$('#ns1blankspacePaymentColumn2').html(aHTML.join(''));
						
							$('#ns1blankspacePaymentAdd').button(
							{
								label: "Add"
							})
							.click(function() {
								 ns1blankspace.financial.expense.payment.edit(oParam);
							})
						}
						
						if (oActions.add) {ns1blankspace.financial.expense.payment.edit(oParam);}

						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_PAYMENT_EXPENSE_SEARCH';
						oSearch.addField('appliesdate,amount,paymentexpense.payment.reference,paymentexpense.payment.amount,paymentexpense.payment.id');
						oSearch.addFilter('expense', 'EQUAL_TO', iObjectContext);
						oSearch.sort('appliesdate', 'asc');
						oSearch.rows = 1000;
						oSearch.getResults(function(data) {ns1blankspace.financial.expense.payment.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
						
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspace">' +
											'<tr><td class="ns1blankspaceNothing">No payments.</td></tr>' + 
											'</table>');

							$('#ns1blankspacePaymentColumn1').html(aHTML.join(''));
						}
						else
						{
							//var oPayments = ns1blankspace.util.unique({key: 'paymentexpense.payment.reference', data: oResponse.data.rows});
							var oPayments = oResponse.data.rows;

							aHTML.push('<table class="ns1blankspace" id="ns1blankspaceFinancialExpensePayments">');
							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">Amount</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
							aHTML.push('</tr>');

							$.each(oPayments, function(p, payment)
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
															
								aHTML.push('<td id="ns1blankspaceReceipt_date-' + this.id + '" class="ns1blankspaceRow">' +
												this['appliesdate'] + '</td>');

								
								aHTML.push('<td id="ns1blankspaceReceipt_amount-' + this.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
												this['amount'] + '</td>');
		
								aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">');
									
								if (oOptions.remove)
								{
									aHTML.push('<span id="ns1blankspacePayment_options_remove-' + this.id + '" class="ns1blankspaceRemove"></span>');
								}
								if (oOptions.view)
								{
									aHTML.push('<span id="ns1blankspacePayment_options_view-' + payment['paymentexpense.payment.id'] + '" class="ns1blankspaceView"></span>');
								}
									
								aHTML.push('</td></tr>');
							});
							
							aHTML.push('</table>');

							$('#ns1blankspacePaymentColumn1').html(aHTML.join(''));
							
							$('#ns1blankspaceFinancialExpensePayments .ns1blankspaceRemove').button(
							{
								text: false,
								icons: {
									primary: "ui-icon-close"
								}
							})
							.click(function()
							{
								ns1blankspace.remove(
								{
									xhtmlElementID: this.id,
									method: 'FINANCIAL_PAYMENT_EXPENSE_MANAGE',
									ifNoneMessage: 'No payments.',
									onComplete: ns1blankspace.financial.expense.refresh
								});
							})
							.css('width', '15px')
							.css('height', '17px');

							$('#ns1blankspaceFinancialExpensePayments .ns1blankspaceView').button(
							{
								text: false,
								icons:
								{
									primary: "ui-icon-play"
								}
							})
							.click(function()
							{
								ns1blankspace.financial.payment.init({id: (this.id).split('-')[1]})
							})
							.css('width', '15px')
							.css('height', '17px');
						}
					}	
				}
			}
		},

		receipt:
		{
			home: function (oParam, oResponse)
			{	// v3.1.1i SUP022764 Aliased to respond to ReadOnly
				if (oResponse == undefined)
				{
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
					aHTML.push('</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));	

					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_RECEIPT_SEARCH';
					oSearch.addField('reference,description,contactbusinessreceivedfromtext,contactpersonreceivedfromtext,receiveddate,amount');
					oSearch.rows = 10;
					oSearch.sort('modifieddate', 'desc');
					oSearch.getResults(function (data) {ns1blankspace.financial.receipt.home(oParam, data)});
				}
				else
				{
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to add a receipt.</td></tr>');
						aHTML.push('</table>');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST LIKELY</td></tr>');
						
						$.each(oResponse.data.rows, function()
						{					
							aHTML.push('<tr class="ns1blankspaceRow">');
								
							aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:50px;">' +
													this.reference + '</td>');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Amount-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:50px;text-align:right;">' +
													'$' + this.amount + '</td>');
																	
							aHTML.push('<td id="ns1blankspaceMostLikely_Date-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;">' +
													this.receiveddate + '</td>');
																									
							var sContact = this.contactbusinessreceivedfromtext;
							if (sContact == '') {sContact = this.contactpersonreceivedfromtext}
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Contact-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													sContact + '</td>');
								
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');
					}
					
					$('#ns1blankspaceMostLikely').html(aHTML.join(''));
				
					$('td.ns1blankspaceMostLikely').click(function(event)
					{
						 ns1blankspace.financial.receipt.search.send(event.target.id, {source: 1});
					});
				}
			},

			layout:	function ()
			{	// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
				var aHTML = [];
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();

				if (bReadOnly) {ns1blankspace.app.context({all: true, inContext: false});}
				
				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Details</td></tr>');
				}
				else
				{	
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
									'Details</td></tr>');
					
					aHTML.push('</table>');					
				
					if (ns1blankspace.objectContext != -1)
					{
						aHTML.push('<table class="ns1blankspaceControl">');

						aHTML.push('<tr><td id="ns1blankspaceControlItem" class="ns1blankspaceControl">' +
									'Items</td></tr>');

						aHTML.push('</table>');
					}	

					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlInvoices" class="ns1blankspaceControl">' +
									'Invoices</td></tr>');

					aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
									'GL</td></tr>');
								
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
									'Actions</td></tr>');
								
					if (!bReadOnly)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
										'Emails</td></tr>');
					}
								
					aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
									'Attachments</td></tr>');
				}
								
				aHTML.push('</table>');					
						
				$('#ns1blankspaceControl').html(aHTML.join(''));

				var aHTML = [];

				aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainInvoice" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainItem" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				$('#ns1blankspaceControlSummary').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.receipt.summary();
				});

				$('#ns1blankspaceControlDetails').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.receipt.details();
				});
				
				$('#ns1blankspaceControlItem').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainItem', refresh: true});
					ns1blankspace.financial.item.show({namespace: 'receipt'});
				});

				$('#ns1blankspaceControlInvoices').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainInvoice', refresh: true});
					ns1blankspace.financial.receipt.invoice.show({actions: {add: !bReadOnly}, options: {remove: !bReadOnly, view: true}});
				});
				
				$('#ns1blankspaceControlGL').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainTransaction', refresh: true});
					ns1blankspace.financial.transactions.show();
				});

				$('#ns1blankspaceControlActions').click(function(event)
				{	// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
					nsFreshcare.extend.financial.actions.bind();
				});

				$('#ns1blankspaceControlEmails').click(function(event)
				{	// v3.1.1f Added as Freshcare want to split actions & emails
					nsFreshcare.extend.financial.emails.bind();
				});

				$('#ns1blankspaceControlAttachments').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't attach documents
					ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
					ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments', 
													actions: {add: !bReadOnly,
														  remove: !bReadOnly}});
				});			
			},

			show: function (oParam, oResponse)
			{	// v3.1.1f SUP022623 Aliased as board members can't add sve or delete
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				
				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				ns1blankspace.financial.receipt.layout();
				
				var aHTML = [];
				var h = -1;
				
				if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.objectContextData = undefined;
					
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this receipt.</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					ns1blankspace.objectContextData = oResponse.data.rows[0];
					
					// v3.1.1f SUP022623 Board Members can't save or delete
					if (bReadOnly) 
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					else
					{
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					}
							
					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.reference +
						'<br /><span id="ns1blankspaceControlContext_receiveddate" class="ns1blankspaceSub">' + ns1blankspace.objectContextData.receiveddate + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_amount" class="ns1blankspaceSub">$' + ns1blankspace.objectContextData.amount + '</span>');
						
					ns1blankspace.history.view(
					{
						newDestination: 'ns1blankspace.financial.receipt.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
					});
					
					ns1blankspace.history.control({functionDefault: 'ns1blankspace.financial.receipt.summary()'});
				}	
			},

			invoice:
			{
				show: function(oParam, oResponse)
				{	// v3.1.2 Aliased as was not paginating
					var iObjectContext = ns1blankspace.objectContext;
					var oOptions = {view: true, remove: true};
					var oActions = {add: true};
					
					if (oParam != undefined)
					{
						if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
						if (oParam.options != undefined) {oOptions = oParam.options}
						if (oParam.actions != undefined) {oActions = oParam.actions}
					}		
					else {oParam = {}}
						
					if (oResponse == undefined)
					{	
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');
						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceInvoiceColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
										'<td id="ns1blankspaceInvoiceColumn2" class="ns1blankspaceColumn2" style="width:200px;></td>' +
										'</tr>');
						aHTML.push('</table>');					
										
						$('#ns1blankspaceMainInvoice').html(aHTML.join(''));
						
						if (oActions != undefined)
						{	
							var aHTML = [];
											
							aHTML.push('<table class="ns1blankspaceColumn2">');
							
							if (oActions.add)
							{
								aHTML.push('<tr><td class="ns1blankspaceAction">' +
											'<span id="ns1blankspaceInvoiceAdd">Add</span>' +
											'</td></tr>');
							}
							
							aHTML.push('</table>');					
							
							$('#ns1blankspaceInvoiceColumn2').html(aHTML.join(''));
						
							$('#ns1blankspaceInvoiceAdd').button(
							{
								label: "Add"
							})
							.click(function() {
								 ns1blankspace.financial.receipt.invoice.edit(oParam);
							})
						}
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'FINANCIAL_RECEIPT_INVOICE_SEARCH';
						oSearch.addField('invoice,invoicetext,appliesdate,amount,tax');
						oSearch.addFilter('receipt', 'EQUAL_TO', iObjectContext);
						oSearch.sort('invoicetext', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.financial.receipt.invoice.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
					
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspace">' +
											'<tr><td class="ns1blankspaceNothing">No invoices.</td></tr>' + 
											'</table>');

							$('#ns1blankspaceInvoiceColumn1').html(aHTML.join(''));
						}
						else
						{
							aHTML.push('<table class="ns1blankspace">');
							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Reference</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">Amount</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">Tax</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
							aHTML.push('</tr>');
							
							$.each(oResponse.data.rows, function()
							{
								aHTML.push(nsFreshcare.extend.financial.receipt.invoice.row(this, oParam));
							});
							
							aHTML.push('</table>');

							$.extend(true, oParam,
							{
								xhtmlElementID: 'ns1blankspaceInvoiceColumn1',
								xhtmlContext: 'Receipt',
								xhtml: aHTML.join(''),
								showMore: ($(oResponse).attr('morerows') == "true"),
								more: $(oResponse).attr('moreid'),
								rows: ns1blankspace.option.defaultRows,
								functionShowRow: nsFreshcare.extend.financial.receipt.invoice.row,
								functionOnNewPage: nsFreshcare.extend.financial.receipt.invoice.bind
						   	});
							ns1blankspace.render.page.show(oParam); 	
							
						}
					}	
				},

				row: function(oRow, oParam)
				{
					var aHTML = [];
					var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {'default': ns1blankspace.objectContext}).value;
					var oOptions = ns1blankspace.util.getParam(oParam, 'options', {'default': {view: true, remove: true}}).value;

					aHTML.push('<tr class="ns1blankspaceRow">');
												
					aHTML.push('<td id="ns1blankspaceReceipt_reference-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow.invoicetext + '</td>');
																
					aHTML.push('<td id="ns1blankspaceReceipt_date-' + oRow.id + '" class="ns1blankspaceRow">' +
									oRow.appliesdate + '</td>');

					aHTML.push('<td id="ns1blankspaceReceipt_amount-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
									oRow.amount + '</td>');

					aHTML.push('<td id="ns1blankspaceReceipt_tax-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
									oRow.tax + '</td>');

					aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">');
						
					if (oOptions.remove)
					{	
						aHTML.push('<span id="ns1blankspaceInvoice_options_remove-' + oRow.id + '" class="ns1blankspaceInvoiceRemove"></span>');
					};	

					aHTML.push('<span id="ns1blankspaceInvoice_options_view-' + oRow.invoice + '" class="ns1blankspaceInvoiceView"></span>');
					
					aHTML.push('</td></tr>');

					return aHTML.join('');
				},

				bind: function(oParam)
				{
					var oOptions = ns1blankspace.util.getParam(oParam, 'options', {'default': {view: true, remove: true}}).value;
					var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID').value;

					if (oOptions.remove) 
					{
						$('#' + sXHTMLContainerID + ' .ns1blankspaceInvoiceRemove').button( {
							text: false,
							icons: {
								primary: "ui-icon-close"
							}
						})
						.click(function() {
							ns1blankspace.financial.receipt.invoice.remove({xhtmlElementID: this.id});
						})
						.css('width', '15px')
						.css('height', '17px')
					}
				
					$('#' + sXHTMLContainerID + ' span.ns1blankspaceInvoiceView').button( {
						text: false,
						icons: {
							primary: "ui-icon-play"
						}
					})
					.click(function() {
						ns1blankspace.financial.invoice.init({id: (this.id).split('-')[1]})
					})
					.css('width', '15px')
					.css('height', '17px')	
				}
			}
		},

		payment:
		{
			home: function (oParam, oResponse)
			{	// v3.1.1i SUP022764 Aliased to respond to ReadOnly
				if (oResponse == undefined)
				{
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

					if (ns1blankspace.option.paymentShowImages)
					{
						aHTML.push('<tr class="ns1blankspaceControl">' +
								'<td style="padding-top:15px;" id="ns1blankspaceControlPaymentImages" class="ns1blankspaceControl">' +
										'Payment<br />Receipts<br /><span class="ns1blankspaceSub" style="font-size:0.75em;">photos</span></td>' +
								'</tr>');
					}

					aHTML.push('</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));

					$('#ns1blankspaceControlPaymentImages').click(function(event)
					{
						ns1blankspace.financial.payment.images.show();
					});		

					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_PAYMENT_SEARCH';
					oSearch.addField('reference,description,contactbusinesspaidtotext,contactpersonpaidtotext,paiddate,amount');
					oSearch.rows = 10;
					oSearch.sort('modifieddate', 'desc');
					oSearch.getResults(function (data) {ns1blankspace.financial.payment.home(oParam, data)});
				}
				else
				{
					var aHTML = [];
			
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to add a payment.</td></tr>');
						aHTML.push('</table>');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST LIKELY</td></tr>');
						
						$.each(oResponse.data.rows, function()
						{					
							aHTML.push('<tr class="ns1blankspaceRow">');
						
							aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:50px;">' +
													this.reference + '</td>');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Amount-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:50px;text-align:right;">' +
													'$' + this.amount + '</td>');
																	
							aHTML.push('<td id="ns1blankspaceMostLikely_Date-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;">' +
													this.paiddate + '</td>');
																									
							var sContact = this.contactbusinesspaidtotext;
							if (sContact == '') {sContact = this.contactpersonpaidtotext}
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Contact-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													sContact + '</td>');
								
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');
					}
					
					$('#ns1blankspaceMostLikely').html(aHTML.join(''));
				
					$('td.ns1blankspaceMostLikely').click(function(event)
					{
						 ns1blankspace.financial.payment.search.send(event.target.id, {source: 1});
					});
				}
			},

			layout: function ()
			{		// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
				var aHTML = [];
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				
				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Details</td></tr>');
				}
				else
				{	
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
									'Details</td></tr>');
					
					aHTML.push('</table>');					
				
					if (ns1blankspace.objectContext != -1)
					{
						aHTML.push('<table class="ns1blankspaceControl">');

						aHTML.push('<tr><td id="ns1blankspaceControlItem" class="ns1blankspaceControl">' +
									'Items</td></tr>');

						aHTML.push('</table>');
					}	

					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlExpenses" class="ns1blankspaceControl">' +
									'Expenses</td></tr>');
												
					aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
									'GL</td></tr>');
								
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
									'Actions</td></tr>');
								
					if (!bReadOnly)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
										'Emails</td></tr>');
					}
								
					aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
									'Attachments</td></tr>');
				}
								
				aHTML.push('</table>');					
						
				$('#ns1blankspaceControl').html(aHTML.join(''));

				var aHTML = [];

				aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainItem" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainExpense" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				

				$('#ns1blankspaceControlSummary').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.payment.summary();
				});

				$('#ns1blankspaceControlDetails').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.payment.details();
				});
				
				$('#ns1blankspaceControlItem').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainItem', refresh: true});
					ns1blankspace.financial.item.show({namespace: 'payment'});
				});

				$('#ns1blankspaceControlCredit').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainCredit', refresh: true});
					ns1blankspace.financial.util.credit.show({namespace: 'payment'});
				});

				$('#ns1blankspaceControlExpenses').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainExpense', refresh: true});
					ns1blankspace.financial.payment.expense.show({actions: {add: !bReadOnly}, options: {remove: !bReadOnly, view: true}});
				});
				
				$('#ns1blankspaceControlGL').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainTransaction', refresh: true});
					ns1blankspace.financial.transactions.show();
				});

				$('#ns1blankspaceControlActions').click(function(event)
				{	// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
					nsFreshcare.extend.financial.actions.bind();
				});

				$('#ns1blankspaceControlEmails').click(function(event)
				{	// v3.1.1f Added as Freshcare want to split actions & emails
					nsFreshcare.extend.financial.emails.bind();
				});

				$('#ns1blankspaceControlAttachments').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't attach documents
					ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
					ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments', 
													actions: {add: bReadOnly,
														  remove: bReadOnly}});
				});			
			},

			show: function (oParam, oResponse)
			{	// v3.1.1f SUP022623 Aliased as board members can't add sve or delete
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();

				ns1blankspace.app.clean();
				ns1blankspace.financial.payment.layout();
				
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.objectContextData = undefined;
					
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this payment.</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					ns1blankspace.objectContextData = oResponse.data.rows[0];
					
					// v3.1.1f SUP022623 Board Members can't save or delete
					if (bReadOnly) 
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					else
					{
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					}
							
					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.reference +
						'<br /><span id="ns1blankspaceControlContext_paiddate" class="ns1blankspaceSub">' + ns1blankspace.objectContextData.paiddate + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_amount" class="ns1blankspaceSub">$' + ns1blankspace.objectContextData.amount + '</span>');
						
					ns1blankspace.history.view(
					{
						newDestination: 'ns1blankspace.financial.payment.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
					});
					
					ns1blankspace.history.control({functionDefault: 'ns1blankspace.financial.payment.summary()'});
				}	
			}
		},

		credit:
		{
			home: function (oParam, oResponse)
			{	// v3.1.1i SUP022764 Aliased for readOnly
				if (oResponse == undefined)
				{
					var aHTML = [];
								
					if (nsFreshcare.extend.financial.userIsReadOnly())
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}

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
					aHTML.push('</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));	

					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_CREDIT_NOTE_SEARCH';
					oSearch.addField('reference,contactbusinesstext,amount,notes,type,typetext,creditdate');
					oSearch.rows = 10;
					oSearch.sort('modifieddate', 'desc');
					oSearch.getResults(function(data) {ns1blankspace.financial.credit.home(oParam, data)});
				}
				else
				{
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to add a credit (note).</td></tr>');
						aHTML.push('</table>');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST LIKELY</td></tr>');
						
						$.each(oResponse.data.rows, function()
						{					
							aHTML.push('<tr class="ns1blankspaceRow">');
								
							aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:60px;">' +
													this.reference + '</td>');

							aHTML.push('<td id="ns1blankspaceMostLikely_Type-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:150px; padding-left:10px;">' +
													this.typetext + '</td>');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Amount-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:50px;text-align:right;">' +
													'$' + this.amount + '</td>');
																	
							aHTML.push('<td id="ns1blankspaceMostLikely_Date-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;">' +
													this.creditdate + '</td>');
																									
							var sContact = this.contactbusinesstext;
							//if (sContact == '') {sContact = this.contactpersonreceivedfromtext}
							
							aHTML.push('<td id="ns1blankspaceMostLikely_Contact-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													sContact + '</td>');
								
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');
					}
					
					$('#ns1blankspaceMostLikely').html(aHTML.join(''));
				
					$('td.ns1blankspaceMostLikely').click(function(event)
					{
						 ns1blankspace.financial.credit.search.send(event.target.id, {source: 1});
					});
				}
			},

			layout:	function ()
			{	// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				var aHTML = [];

				if (bReadOnly) {ns1blankspace.app.context({all: true, inContext: false});}
				
				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Details</td></tr>');
				}
				else
				{	
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
									'Details</td></tr>');
					
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlAppliedTo" class="ns1blankspaceControl">' +
									'Applied To</td></tr>');
										
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
												
					aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
									'GL</td></tr>');
								
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
									'Actions</td></tr>');
								
					if (!bReadOnly)
					{
						aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
										'Emails</td></tr>');
					}
								
					aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
									'Attachments</td></tr>');
				}
								
				aHTML.push('</table>');					
						
				$('#ns1blankspaceControl').html(aHTML.join(''));

				var aHTML = [];

				aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAppliedTo" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				$('#ns1blankspaceControlSummary').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.credit.summary();
				});

				$('#ns1blankspaceControlDetails').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.credit.details();
				});
				
				$('#ns1blankspaceControlAppliedTo').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainAppliedTo', refresh: true});
					ns1blankspace.financial.credit.appliedTo.show({actions: {add: !bReadOnly}, options: {remove: !bReadOnly, view: true}});
				});
				
				$('#ns1blankspaceControlGL').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainTransaction', refresh: true});
					ns1blankspace.financial.transactions.show();
				});

				$('#ns1blankspaceControlActions').click(function(event)
				{	// v3.1.1f SUP022623 Now prevents board members from adding attachments / actions
					nsFreshcare.extend.financial.actions.bind();
				});

				$('#ns1blankspaceControlEmails').click(function(event)
				{	// v3.1.1f Added as Freshcare want to split actions & emails
					nsFreshcare.extend.financial.emails.bind();
				});

				$('#ns1blankspaceControlAttachments').click(function(event)
				{	// v3.1.1f SUP022623 Board Members can't attach documents
					ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
					ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments', 
													actions: {add: bReadOnly,
														  remove: bReadOnly}});
				});			
			},

			show: function (oParam, oResponse)
			{	// v3.1.1f SUP022623 Aliased as board members can't add sve or delete
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				ns1blankspace.app.clean();
				ns1blankspace.financial.credit.layout();
				
				var aHTML = [];
				var h = -1;
				
				if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.objectContextData = undefined;
					
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this credit (note).</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					ns1blankspace.objectContextData = oResponse.data.rows[0];
					
					// v3.1.1f SUP022623 Board Members can't save or delete
					if (bReadOnly) 
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					else
					{
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					}
							
					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.reference +
						'<br /><span id="ns1blankspaceControlContext_date" class="ns1blankspaceSub">' + ns1blankspace.objectContextData.creditdate + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_amount" class="ns1blankspaceSub">$' + ns1blankspace.objectContextData.amount + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_tobeapplied" class="ns1blankspaceSub"></span>');
						
					ns1blankspace.financial.credit.refresh();
													
					ns1blankspace.history.view(
					{
						newDestination: 'ns1blankspace.financial.credit.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
					});
					
					ns1blankspace.history.control({functionDefault: 'ns1blankspace.financial.credit.summary()'});
				}	
			},

			appliedTo:
			{
				show: function (oParam, oResponse)
				{	// v3.1.1f SUP022623 Responds to options and actions parameters
					var iObjectContext = ns1blankspace.util.getParam(oParam, 'readOnly', {'default': ns1blankspace.objectContext}).value;
					var oOptions = ns1blankspace.util.getParam(oParam, 'options', {'default': {view: true, remove: true}}).value;
					var oActions = ns1blankspace.util.getParam(oParam, 'actions', {'default': {add: true}}).value;
					
					if (oParam == undefined) {oParam = {}}
					if (oOptions.view == undefined) {oOptions.view = true}
					if (oOptions.remove == undefined) {oOptions.remove = true}
					if (oActions.add == undefined) {oActions.add = true}
							
						
					if (oResponse == undefined)
					{	
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceContainer">');
						aHTML.push('<tr class="ns1blankspaceContainer">' +
										'<td id="ns1blankspaceAppliedToColumn1" class="ns1blankspaceColumn1Flexible">' +
										ns1blankspace.xhtml.loading + '</td>' +
										'<td id="ns1blankspaceAppliedToColumn2" class="ns1blankspaceColumn2" style="width: 200px;"></td>' +
										'</tr>');
						aHTML.push('</table>');					
										
						$('#ns1blankspaceMainAppliedTo').html(aHTML.join(''));
								
						if (oActions.add)
						{
							var aHTML = [];
											
							aHTML.push('<table class="ns1blankspaceColumn2">');
							
							aHTML.push('<tr><td class="ns1blankspaceAction">' +
											'<span id="ns1blankspaceApplyToAdd">&nbsp;</span>' +
											'</td></tr>');

							aHTML.push('</table>');					
							
							$('#ns1blankspaceAppliedToColumn2').html(aHTML.join(''));
					
							$('#ns1blankspaceApplyToAdd').button(
							{
								label: "Apply"
							})
							.click(function() {
								 ns1blankspace.financial.credit.appliedTo.edit(oParam);
							});
						}
						
						var oSearch = new AdvancedSearch();
						
						if (ns1blankspace.objectContextData.type == '1')
						{	
							oSearch.method = 'FINANCIAL_INVOICE_CREDIT_NOTE_SEARCH';
							oSearch.addField('appliesdate,amount,invoicetext,invoice');
						}
						else
						{
							oSearch.method = 'FINANCIAL_EXPENSE_CREDIT_NOTE_SEARCH';
							oSearch.addField('appliesdate,amount,expensetext,expense');
						}	

						oSearch.addFilter('credit', 'EQUAL_TO', iObjectContext);
						oSearch.sort('appliesdate', 'asc');
						oSearch.getResults(function(data) {ns1blankspace.financial.credit.appliedTo.show(oParam, data)});
					}
					else
					{
						var aHTML = [];
					
						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table class="ns1blankspace">' +
											'<tr><td class="ns1blankspaceNothing">Hasn\'t been applied.</td></tr>' + 
											'</table>');

							$('#ns1blankspaceAppliedToColumn1').html(aHTML.join(''));
						}
						else
						{
							aHTML.push('<table id="ns1blankspaceCreditAppliedTo" class="ns1blankspace">');

							aHTML.push('<tr class="ns1blankspaceCaption">');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Reference</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">Date</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right;">Amount</td>');
							aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
							aHTML.push('</tr>');

							var iID;
							
							$.each(oResponse.data.rows, function()
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
															
								aHTML.push('<td id="ns1blankspaceCreditAppliedTo_date-' + this.id + '" class="ns1blankspaceRow">' +
												this[(ns1blankspace.objectContextData.type=='1'?'invoice':'expense') + 'text'] + '</td>');

								aHTML.push('<td id="ns1blankspaceCreditAppliedTo_date-' + this.id + '" class="ns1blankspaceRow">' +
												this.appliesdate + '</td>');
								
								aHTML.push('<td id="ns1blankspaceCreditAppliedTo_amount-' + this.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
												this.amount + '</td>');
		
								aHTML.push('<td style="width:60px;text-align:right;" class="ns1blankspaceRow">');
													
								iID = this[(ns1blankspace.objectContextData.type=='1'?'invoice':'expense')];
											
								if (oOptions.remove)
								{
									aHTML.push('<span id="ns1blankspaceCreditAppliedTo_options_remove-' + this.id + '" class="ns1blankspaceAppliedToRemove"></span>');
								}
								if (oOptions.view)
								{
									aHTML.push('<span id="ns1blankspaceCreditAppliedTo_options_view-' + iID + '" class="ns1blankspaceAppliedToView"></span>');
								}
									
								aHTML.push('</td></tr>');
							});
							
							aHTML.push('</table>');

							$('#ns1blankspaceAppliedToColumn1').html(aHTML.join(''));
						
							$('#ns1blankspaceCreditAppliedTo .ns1blankspaceAppliedToRemove').button( {
								text: false,
								icons: {
									primary: "ui-icon-close"
								}
							})
							.click(function() {
								ns1blankspace.financial.credit.appliedTo.remove({xhtmlElementID: this.id});
							})
							.css('width', '15px')
							.css('height', '17px');
							
							$('#ns1blankspaceCreditAppliedTo .ns1blankspaceAppliedToView').button( {
								text: false,
								icons: {
									primary: "ui-icon-play"
								}
							})
							.click(function() {
								if (ns1blankspace.objectContextData.type == '1')
								{
									ns1blankspace.financial.invoice.init({id: (this.id).split('-')[1]})
								}
								else
								{
									ns1blankspace.financial.expense.init({id: (this.id).split('-')[1]})
								}	
							})
							.css('width', '15px')
							.css('height', '17px');	
						}
					}	
				},

				remove: function(oParam)
				{	// v3.1.1i SUP022765 This function hasn't been coded in 1blanksapce
					oParam.method = (ns1blankspace.objectContextData.type == '1') ? 'FINANCIAL_INVOICE_CREDIT_NOTE_MANAGE' : 'FINANCIAL_EXPENSE_CREDIT_NOTE_MANAGE';
					ns1blankspace.remove(oParam);
				}
			}	
		},

		journal:
		{
			home: 		function (oParam, oResponse)
			{	// v3.1.1i SUP022764 Aliased for readOnly

				if (oResponse == undefined)
				{
					var aHTML = [];
								
					if (nsFreshcare.extend.financial.userIsReadOnly())
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}

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
					aHTML.push('</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));	

					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'FINANCIAL_GENERAL_JOURNAL_SEARCH';
					oSearch.addField('area,areatext,description,id,journaldate,object,objecttext,objectcontext,' +
										'project,projecttext,reference,status,statustext');
					oSearch.rows = 10;
					oSearch.sort('modifieddate', 'desc');
					oSearch.getResults(function(data) {ns1blankspace.financial.journal.home(oParam, data)});
				}
				else
				{
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceNothing">Click New to add a general journal.</td></tr>');
						aHTML.push('</table>');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">MOST LIKELY</td></tr>');
						
						$.each(oResponse.data.rows, function()
						{					
							aHTML.push('<tr class="ns1blankspaceRow">');
								
							aHTML.push('<td id="ns1blankspaceMostLikely_Title-' + this.id + '" class="ns1blankspaceMostLikely" style="width:60px;">' +
													this.reference + '</td>');
									
							aHTML.push('<td id="ns1blankspaceMostLikely_Date-' + this.id + '" class="ns1blankspaceMostLikelySub" style="width:90px;">' +
													this.journaldate + '</td>');

							aHTML.push('<td id="ns1blankspaceMostLikely_Description-' + this.id + '" class="ns1blankspaceMostLikelySub">' +
													this.description + '</td>');
																										
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');
					}
					
					$('#ns1blankspaceMostLikely').html(aHTML.join(''));
				
					$('td.ns1blankspaceMostLikely').click(function(event)
					{
						 ns1blankspace.financial.journal.search.send(event.target.id, {source: 1});
					});
				}
			},

			layout:	function ()
			{	// v3.1.1i SUP022764 readonly access
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				var aHTML = [];
				
				if (bReadOnly) {ns1blankspace.app.context({all: true, inContext: false});}

				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Details</td></tr>');
				}
				else
				{	
					aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
									'Summary</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
									'Details</td></tr>');
					
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
					
					aHTML.push('<tr><td id="ns1blankspaceControlItems" class="ns1blankspaceControl">' +
									'Items</td></tr>');
										
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
												
					aHTML.push('<tr><td id="ns1blankspaceControlGL" class="ns1blankspaceControl">' +
									'GL</td></tr>');
								
					aHTML.push('</table>');					
				
					aHTML.push('<table class="ns1blankspaceControl">');
				
					aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
									'Actions</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
									'Attachments</td></tr>');
				}
								
				aHTML.push('</table>');					
						
				$('#ns1blankspaceControl').html(aHTML.join(''));

				var aHTML = [];

				aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainItem" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainTransaction" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
				aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				$('#ns1blankspaceControlSummary').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.journal.summary();
				});

				$('#ns1blankspaceControlDetails').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: !bReadOnly}});
					ns1blankspace.financial.journal.details();
				});
				
				$('#ns1blankspaceControlItems').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainItem', refresh: true});
					ns1blankspace.financial.journal.item.show();
				});
				
				$('#ns1blankspaceControlGL').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainTransaction', refresh: true});
					ns1blankspace.financial.transactions.show();
				});

				$('#ns1blankspaceControlActions').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});
					ns1blankspace.actions.show({xhtmlElementID: 'ns1blankspaceMainActions'});
				});

				$('#ns1blankspaceControlAttachments').click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
					ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments', 
													actions: {add: !bReadOnly,
														  remove: !bReadOnly}});
				});			
			},

			show: function (oParam, oResponse)
			{	// v3.1.1i SUP022764 readonly access
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				ns1blankspace.app.clean();
				ns1blankspace.financial.journal.layout();
				
				var aHTML = [];
				var h = -1;
				
				if (oResponse.data.rows.length == 0)
				{
					ns1blankspace.objectContextData = undefined;
					
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this general journal.</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					ns1blankspace.objectContextData = oResponse.data.rows[0];

					ns1blankspace.financial.journal.refresh();
					
					ns1blankspace.objectContextData.locked = false;
					if (ns1blankspace.objectContextData.status === '2') {ns1blankspace.objectContextData.locked = true;}

					// v3.1.1i SUP022764 readonly access
					if (bReadOnly || ns1blankspace.objectContextData.locked) 
					{
						ns1blankspace.app.context({all: true, inContext: false});
					}
					else
					{
						$('#ns1blankspaceViewControlAction').button({disabled: false});
						$('#ns1blankspaceViewControlActionOptions').button({disabled: false});
					}

					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData.reference +
						'<br /><span id="ns1blankspaceControlContext_date" class="ns1blankspaceSub">' + ns1blankspace.objectContextData.journaldate + '</span>' +
						'<br /><span id="ns1blankspaceControlContext_balance" class="ns1blankspaceSub"></span>');
						
					ns1blankspace.history.view(
					{
						newDestination: 'ns1blankspace.financial.journal.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
					});
					
					ns1blankspace.history.control({functionDefault: 'ns1blankspace.financial.journal.summary()'});
				}	
			},

			summary: function (oParam)
			{	// v3.1.1i SUP022764 readonly access
				var aHTML = [];
				var bUseTemplate = false;
				var bReadOnly = nsFreshcare.extend.financial.userIsReadOnly();
				
				if (oParam)
				{
					if (oParam.useTemplate != undefined) {bUseTemplate = oParam.useTemplate}
				}

				if (ns1blankspace.objectContextData == undefined)
				{
					aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find the general journal.</td></tr></table>');
							
					$('#ns1blankspaceMainSummary').html(aHTML.join(''));
				}
				else
				{
					aHTML.push('<table class="ns1blankspaceMain">' +
									'<tr class="ns1blankspaceRow">' +
									'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:200px;"></td>' +
									'</tr>' +
									'</table>');				
					
					$('#ns1blankspaceMainSummary').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<table class="ns1blankspace">');
																
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Journal Date</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryJournalDate" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.journaldate +
										'</td></tr>');
					
					if (ns1blankspace.objectContextData.description != '')
					{
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Description</td></tr>' +
										'<tr><td id="ns1blankspaceSummaryDescription" class="ns1blankspaceSummary">' +
										ns1blankspace.objectContextData.description +
										'</td></tr>');
					}
					
					aHTML.push('</table>');		

					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

					if (!bReadOnly)
						{
						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');
						
						aHTML.push('<tr><td class="ns1blankspaceSummaryCaption" style="padding-bottom:10px;">' +
										ns1blankspace.objectContextData.statustext +
										'</td></tr>');				
				
						if (ns1blankspace.objectContextData.status == 1)
						{										
							aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceSummaryActionStatus-2" class="journalAction ns1blankspaceAction">Finalise</span>' +
										'</td></tr>');			
						}
						
						if (ns1blankspace.objectContextData.status == 2)
						{	
							aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceSummaryActionStatus-1" class="journalAction ns1blankspaceAction">Undo</span>' +
										'</td></tr>');

							//aHTML.push('<tr><td>' +
							//			'<span id="ns1blankspaceSummaryActionReverse" class="journalAction ns1blankspaceAction">Reverse</span>' +
							//			'</td></tr>');
						}
										
						aHTML.push('</table>');					
						
						$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
										
						$('span.journalAction').button(
						{
							
						})
						.click(function() {
							
							var sID = this.id;
							var aID = sID.split('-');
							var iStatus = aID[1];
							
							$.ajax(
							{
								type: 'GET',
								url: ns1blankspace.util.endpointURI('FINANCIAL_GENERAL_JOURNAL_MANAGE'),
								data: 'status=' + iStatus + '&id=' + ns1blankspace.objectContext,
								dataType: 'json',
								success: function(oResponse) {ns1blankspace.financial.journal.search.send('-' + ns1blankspace.objectContext)}
							});
						})
						.css('width', '100px');	
					}
				}	
			},
		},

		invoicing:
		{
			unsent:
			{
				show: function(oParam, oResponse)
				{
					if (ns1blankspace.xhtml.templates['invoice'] == '')
					{
						var aHTML = [];
							
						aHTML.push('<table id="ns1blankspaceInvoicingUnsent" class="ns1blankspaceColumn2">' +
												'<tr><td class="ns1blankspaceSub">No invoice template has been set up.</td></tr></table>');

						$('#ns1blankspaceInvoicingColumn2').html(aHTML.join(''));
					}	
					else
					{
						if (oResponse == undefined)
						{	
							$('#ns1blankspaceInvoicingColumn2').html(ns1blankspace.xhtml.loading);
							ns1blankspace.financial.invoicing.data.unsent = [];
							var sFields = 'reference,amount,description,contactbusinesssentto,contactbusinesssenttotext,contactpersonsentto,contactpersonsenttotext,' +
											'invoice.contactpersonsentto.email,invoice.contactbusinesssentto.email';

							var oSearch = new AdvancedSearch();
							oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
							oSearch.addField(nsFreshcare.util.getSearchFields({fields: sFields, namespace: 'financial.invoice.searchFields'}));
							oSearch.addFilter('sent', 'EQUAL_TO', 'N');
							oSearch.rows = 100;
							oSearch.sort('reference', 'asc');
							oSearch.getResults(function(data) {ns1blankspace.financial.invoicing.unsent.show(oParam, data)});
						}
						else
						{
							var aHTML = [];
							
							if (oResponse.data.rows.length == 0)
							{
								aHTML.push('<table id="ns1blankspaceInvoicingUnsent" class="ns1blankspaceColumn2">' +
												'<tr><td class="ns1blankspaceSub">No unsent invoices.</td></tr></table>');

								$('#ns1blankspaceInvoicingColumn3').html('');
							}
							else
							{
								var aHTML = [];
										
								aHTML.push('<table class="ns1blankspaceColumn2">');
										
								aHTML.push('<tr><td><span id="ns1blankspaceFinancialUnsentPreview" class="ns1blankspaceAction">' +
												'Preview</span></td></tr>');

								aHTML.push('<tr><td id="ns1blankspaceFinancialUnsentPreviewStatus" style="padding-top:5px; padding-bottom:12px; font-size:0.75em;" class="ns1blankspaceSub">' +
												'If you wish, generate a preview on selected invoices before emailing</td></tr>');

								aHTML.push('<tr><td><span id="ns1blankspaceFinancialUnsentEmail" class="ns1blankspaceAction">' +
												'Email</span></td></tr>');

								aHTML.push('<tr><td id="ns1blankspaceFinancialUnsentEmailStatus" style="padding-top:10px; font-size:0.75em;" class="ns1blankspaceSub"></td></tr>');

								aHTML.push('</table>');					
								
								$('#ns1blankspaceInvoicingColumn3').html(aHTML.join(''));
								
								$('#ns1blankspaceFinancialUnsentPreview').button(
								{
									label: 'Preview',
									icons:
									{
										primary: "ui-icon-document"
									}
								})
								.click(function()
								{	
									ns1blankspace.financial.invoicing.unsent.preview.init(oParam)
								})
								.css('width', '90px');

								$('#ns1blankspaceFinancialUnsentEmail').button(
								{
									label: 'Email',
									icons:
									{
										primary: "ui-icon-mail-open"
									}
								})
								.click(function()
								{	
									oParam = {onComplete: ns1blankspace.financial.invoicing.unsent.email};
									ns1blankspace.financial.invoicing.unsent.preview.init(oParam)
								})
								.css('width', '90px');

								var aHTML = [];

								aHTML.push('<table id="ns1blankspaceInvoicingUnsent" class="ns1blankspaceColumn2" style="font-size:0.875em;">' +
											'<tr class="ns1blankspaceHeaderCaption">' +
											'<td class="ns1blankspaceHeaderCaption" style="width:10px;"><span class="ns1blankspaceInvoicingUnsentSelectAll"></span></td>' +
											'<td class="ns1blankspaceHeaderCaption">Reference</td>' +
											'<td class="ns1blankspaceHeaderCaption" style="width:100px;">Contact</td>' +
											'<td class="ns1blankspaceHeaderCaption">Description</td>' +
											'<td class="ns1blankspaceHeaderCaption" style="width:60px; text-align:right;">Amount</td>' +
											'<td class="ns1blankspaceHeaderCaption" style="width:50px; text-align:right;">&nbsp;</td>' +
											'</tr>');

								$(oResponse.data.rows).each(function() 
								{
									aHTML.push(ns1blankspace.financial.invoicing.unsent.row(this));
								});
								
								aHTML.push('</table>');
							}
							
							ns1blankspace.render.page.show(
							{
								type: 'JSON',
								xhtmlElementID: 'ns1blankspaceInvoicingColumn2',
								xhtmlContext: 'InvoicingUnsent',
								xhtml: aHTML.join(''),
								showMore: (oResponse.morerows == "true"),
								more: oResponse.moreid,
								rows: 100,
								functionShowRow: ns1blankspace.financial.invoicing.unsent.row,
								functionOpen: undefined,
								functionNewPage: 'ns1blankspace.financial.invoicing.unsent.bind()'
							}); 

							ns1blankspace.financial.invoicing.unsent.bind();   	
						}
					}	
				},

				row: function (oRow)	
				{
					var aHTML = [];

					oRow.hasEmail = false;
					
					var sContact = oRow['contactbusinesssenttotext'];
					if (sContact == '') {sContact = oRow['contactpersonsenttotext']}

					if (oRow['invoice.contactpersonsentto.email'] != '')
					{
						oRow.hasEmail = true;
						sContact += '<br /><span style="font-size:0.725em;" class="ns1blankspaceSub">' + oRow['invoice.contactpersonsentto.email'] + '</span>';
					}
					else if (oRow['invoice.contactbusinesssentto.email'] != '')
					{
						oRow.hasEmail = true;
						sContact += '<br /><span style="font-size:0.725em;" class="ns1blankspaceSub">' + oRow['invoice.contactbusinesssentto.email'] + '</span>';
					}

					ns1blankspace.financial.invoicing.data.unsent.push(oRow);

					aHTML.push('<tr class="ns1blankspaceRow" id="ns1blankspaceUnsent_container-' + oRow["id"] + '">' +
									'<td class="ns1blankspaceRow ns1blankspaceSub" id="ns1blankspaceUnsent_selectContainer-' + oRow["id"] + '">' +
									'<input type="checkbox" checked="checked" id="ns1blankspaceUnsent_select-' + oRow["id"] + '"' + 
									' title="' + oRow["reference"] + '" /></td>');

					aHTML.push('<td id="ns1blankspaceUnsent_reference-' + oRow["id"] + '" class="ns1blankspaceRow">' +
										oRow.reference + '</td>');

					aHTML.push('<td id="ns1blankspaceUnsent_contact-' + oRow["id"] + '" class="ns1blankspaceRow">' +
										sContact + '</td>');

					aHTML.push('<td id="ns1blankspaceUnsent_description-' + oRow["id"] + '" class="ns1blankspaceRow">' +
									oRow["description"] + '</td>'); 

					aHTML.push('<td id="ns1blankspaceUnsent_amount-' + oRow["id"] + '" class="ns1blankspaceRow" style="text-align:right;">' +
									oRow["amount"] + '</td>'); 

					aHTML.push('<td style="text-align:right;" class="ns1blankspaceRow">');

					aHTML.push('<span style="margin-right:5px;" id="ns1blankspaceUnsent_option_preview-' + oRow['id'] + '"' +
									' class="ns1blankspaceRowPreview"></span>');

					aHTML.push('<span id="ns1blankspaceUnsent_option-' + oRow['id'] + '-1"' +
									' class="ns1blankspaceRowView"></span></td>');
					aHTML.push('</tr>');

					return aHTML.join('');
				},

				preview:
				{
					init:		function (oParam)
					{
						var iDataIndex = 0;

						if (oParam == undefined) {oParam = {}}
						if (oParam.previewInitStep == undefined) {oParam.previewInitStep = 1}
						if (oParam.dataIndex != undefined) {iDataIndex = oParam.dataIndex}

						if (oParam.previewInitStep == 1)
						{	
							ns1blankspace.financial.invoicing.data.unsentEmail = [];

							if ($('#ns1blankspaceInvoicingUnsent input:checked').length > 0)
							{	
								$('#ns1blankspaceFinancialUnsentPreviewStatus').html('<span style="font-size:2.25em;" class="ns1blankspaceSub">' +
											'<span id="ns1blankspaceFinancialUnsentPreviewStatusIndex">1</span>/' + $('#ns1blankspaceInvoicingUnsent input:checked').length + 
											'</span>');
							}
							else
							{
								ns1blankspace.status.error('No invoices selected')
							}	

							$('#ns1blankspaceInvoicingUnsent input:checked').each(function() 
							{
								var iID = (this.id).split('-')[1]

								var oData = $.grep(ns1blankspace.financial.invoicing.data.unsent, function (a) {return a.id == iID;})[0]

								if (oData)
								{
									ns1blankspace.financial.invoicing.data.unsentEmail.push(oData);
								}
							});

							oParam.previewInitStep = 2;
							ns1blankspace.financial.invoicing.unsent.preview.init(oParam);
						}			

						else if (oParam.previewInitStep == 2)
						{
							if (iDataIndex < ns1blankspace.financial.invoicing.data.unsentEmail.length)
							{	
								$('#ns1blankspaceFinancialUnsentPreviewStatusIndex').html(iDataIndex + 1);

								var oData = ns1blankspace.financial.invoicing.data.unsentEmail[iDataIndex];
								if (oParam.rowStep == undefined)
								{
									oParam.rowStep = 1;
									if (ns1blankspace.data.financial && ns1blankspace.data.financial.invoice 
										&& $.type(ns1blankspace.data.financial.invoice.functionRenderPreProcess) == 'function')
									{
										oParam.data = oData;
										if (oParam.onComplete) {oParam.onCompleteWhenCan = oParam.onComplete}
										oParam.onComplete = ns1blankspace.financial.invoicing.unsent.preview.init;
										ns1blankspace.data.financial.invoice.functionRenderPreProcess(oParam);	
									}
									else
									{
										ns1blankspace.financial.invoicing.unsent.preview.init(oParam);
									}
								}
								else
								{
									delete(oParam.rowStep);
									delete(oParam.data);
									var sFields = 'financialaccounttext,tax,issuedamount,amount,description,object';

									$('#ns1blankspaceUnsent_option_preview-' + oData.id).html(ns1blankspace.xhtml.loadingSmall)

									var oSearch = new AdvancedSearch();
									oSearch.method = 'FINANCIAL_ITEM_SEARCH';
									oSearch.addField(nsFreshcare.util.getSearchFields({fields: sFields, namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCH'}));
									oSearch.addFilter('object', 'EQUAL_TO', 5);
									oSearch.addFilter('objectcontext', 'EQUAL_TO', oData.id);
									$.each(nsFreshcare.util.getSearchFields({fields: [{name: 'id', direction: 'asc'}], namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCHSort'}), function()
									{
										oSearch.sort(this.name, this.direction);
									})
									oSearch.rows = 500;
									oSearch.getResults(function(oResponse)
									{
										oParam.previewInitStep = 2;
										oParam.dataIndex = iDataIndex + 1;
										ns1blankspace.financial.invoicing.data.unsentEmail[iDataIndex].items = oResponse.data.rows;

										$('#ns1blankspaceUnsent_option_preview-' + oData.id).html('');
										$('#ns1blankspaceUnsent_option_preview-' + oData.id).addClass('ns1blankspaceRowPreviewDone');

										$('#ns1blankspaceUnsent_option_preview-' + oData.id).button(
										{
											text: false,
											icons:
											{
												primary: "ui-icon-document"
											}
										})
										.click(function() {
											ns1blankspace.financial.invoicing.unsent.preview.showHide({xhtmlElementID: this.id, objectOtherData: oParam.objectOtherData});
										})
										.css('width', '15px')
										.css('height', '20px');

										ns1blankspace.financial.invoicing.unsent.preview.init(oParam);
									});
								}
							}
							else
							{
								$('#ns1blankspaceFinancialUnsentPreviewStatus').fadeOut(3000);
								delete oParam.dataIndex;
								delete oParam.previewInitStep;
								delete(oParam.objectOtherData);
								ns1blankspace.util.onComplete(oParam);
							}	
						}						
					},
					
					showHide: 	function (oParam)
					{
						var sXHTMLElementID;
						var sID;

						if (ns1blankspace.util.param(oParam, 'xhtmlElementID').exists)
						{
							sXHTMLElementID = ns1blankspace.util.param(oParam, 'xhtmlElementID').value
							sID = ns1blankspace.util.param(oParam, 'xhtmlElementID', '-').values[1];
						}

						if ($('#ns1blankspaceUnsent_container_preview-' + sID).length != 0)
						{
							$('#ns1blankspaceUnsent_container_preview-' + sID).remove();
						}
						else
						{
							var sHTML = 'No preview';

							var oInvoice = $.grep(ns1blankspace.financial.invoicing.data.unsentEmail, function (a) {return a.id == sID;})[0];

							if (oInvoice)
							{
								sHTML = ns1blankspace.format.render(
								{
									object: 5,
									objectContext: oInvoice.id,
									xhtmlTemplate: ns1blankspace.xhtml.templates['invoice'],
									objectData: oInvoice,
									objectOtherData: (oParam.objectOtherData ? oParam.objectOtherData : oInvoice.items),
									template: "invoice"
								});

								oInvoice.xhtml = sHTML;
							}	

							$('#ns1blankspaceUnsent_container-' + sID).after('<tr id="ns1blankspaceUnsent_container_preview-' + sID + '">' +
											'<td colspan=5><div style="background-color: #F3F3F3; padding:8px;" class="ns1blankspaceScale85">' + sHTML + '</div></td></tr>')
						}
					}			
				},

				email: 	function (oParam)
				{		
					if (oParam == undefined) {oParam = {}}
					if (oParam.dataIndex == undefined) {oParam.dataIndex = 0}
					if (oParam.emailSendStep == undefined) {oParam.emailSendStep = 1}
		
					if (oParam.dataIndex < ns1blankspace.financial.invoicing.data.unsentEmail.length)
					{
						var oInvoice = ns1blankspace.financial.invoicing.data.unsentEmail[oParam.dataIndex];

						// Get html for invoice
						if (oParam.emailSendStep == 1)
						{
							$('#ns1blankspaceFinancialUnsentEmailStatus').html('<span style="font-size:2.25em;" class="ns1blankspaceSub">' +
								'<span id="ns1blankspaceFinancialUnsentPreviewStatusIndex">' + (oParam.dataIndex + 1) + '</span>/' + ns1blankspace.financial.invoicing.data.unsentEmail.length + 
								'</span>');

							var sHTML = 'No preview';

							if (oInvoice)
							{
								sHTML = ns1blankspace.format.render(
								{
									object: 5,
									objectContext: oInvoice.id,
									xhtmlTemplate: ns1blankspace.xhtml.templates['invoice'],
									objectData: oInvoice,
									objectOtherData: oInvoice.items,
									template: 'invoice'
								});

								oInvoice.xhtml = sHTML;
								oParam.emailSendStep = 2;
							}
							else
							{
								nsFreshcare.admin.certificate.rowStatus({xhtmlElement: $('#ns1blankspaceUnsent_reference-' + oInvoice.id), 
															errorMessage: 'Invoice record not found.'});
								oParam.dataIndex += 1;
							}

							ns1blankspace.financial.invoicing.unsent.email(oParam);
						}

						// Convert to PDF
						else if (oParam.emailSendStep == 2)
						{
							// oInvoice has to be valid or we don't get to here
							// 3.1.2 Now passes base url
							var sHTML = oInvoice.xhtml;
							var sBaseURL = window.location.href.split('://').pop();		
							sBaseURL = window.location.href.split('://').shift() + '://' + sBaseURL.split('/').shift();

							oParam.emailSendStep = 3;
							$.extend(oParam, 
							{
								/*xhtmlElementID: 'ns1blankspaceUnsent_option_preview-' + oInvoice.id,*/
								xhtmlContent: sHTML,
								filename: oInvoice.reference + '.pdf',
								open: false,
								object: 5,
								objectContext: oInvoice.id,
								onComplete: ns1blankspace.financial.invoicing.unsent.email,
								leftmargin: 1,
								rightmargin: 1,
								topmargin: 1,
								bottommargin: 1,
								baseURLBody: sBaseURL
							});
							ns1blankspace.pdf.create(oParam);
						}

						// Send email
						else if (oParam.emailSendStep == 3)
						{
							var sTo;
							sTo = oInvoice['invoice.contactpersonsentto.email'];
							if (sTo == '') {sTo = oInvoice['invoice.contactbusinesssentto.email']};

							// Change preview button so that it now opens the PDF file so it can be printed
							$('#ns1blankspaceUnsent_option_preview-' + oInvoice.id)
								.attr('data-attachmentlink', oParam.attachmentLink)
								.unbind('click')
								.on('click', function()
								{
									window.open('/download/' + $(this).attr('data-attachmentlink'));
								});


							if (sTo != '')
							{	
								var oRoot = ns1blankspace.rootnamespace;
								sTo = (oRoot.sitesDev && oRoot.sitesDev.indexOf(oRoot.site.toString()) > -1) ? 'cassandra.buono@alt-designit.com.au' : sTo;
								var oData = 
								{
									subject: 'Invoice: ' + oInvoice.description.formatXHTML(),
									message: 'Please see attached',
									to: sTo,
									object: 5,
									objectContext: oInvoice.id,
									copyattachmentsfromobject: 5,
									copyattachmentsfromobjectcontext: oInvoice.id,
									copyattachmentsfromobjectattachmentlink: oParam.attachmentLink.split('/').pop()
								}

								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
									data: oData,
									dataType: 'json',
									global: false,
									success: function (data)
									{
										if (data.status == 'OK')
										{
											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('FINANCIAL_INVOICE_MANAGE'),
												data: 'sent=Y&id=' + oInvoice.id,
												dataType: 'json',
												global: false,
												success: function (data)
												{
													$('#ns1blankspaceUnsent_selectContainer-' + oInvoice.id).html('Emailed');
													//oInvoice.response = data;
													oParam.dataIndex = oParam.dataIndex + 1;
													oParam.emailSendStep = 1;  
													ns1blankspace.financial.invoicing.unsent.email(oParam);
												}
											});
										}
										else
										{
											$('#ns1blankspaceUnsent_selectContainer-' + oInvoice.id).html('Error');
											$('#ns1blankspaceUnsent_selectContainer-' + oInvoice.id).attr('title', data.error.errornotes);
										}
									}
								});
							}
							else
							{
								$('#ns1blankspaceUnsent_selectContainer-' + oInvoice.id).html('No email');
								oParam.dataIndex = oParam.dataIndex + 1;
								oParam.emailSendStep = 1;  
								ns1blankspace.financial.invoicing.unsent.email(oParam);
							}	
						}
					}
				}																			
			}
		}
	},

	action:
	{
		next10: 	function (oParam, oResponse)
		{	
			var sXHTMLElementID = 'ns1blankspaceMainNext10';
			var sDate;

			if (oParam != undefined)
			{
				if (oParam.xhtmlElementID != undefined)
				{
					sXHTMLElementID = oParam.xhtmlElementID;
				}	
			}	
			
			if (oResponse == undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('contactperson,actionby,actionbytext,actionreference,actiontype,actiontypetext,billingstatus,' +
									'billingstatustext,completed,completedtime,contactbusiness,contactbusinesstext,contactperson,' +
									'contactpersontext,date,description,duedate,duedatetime,object,objectcontext,objecttext,' +
									'priority,prioritytext,status,statustext,subject,text,totaltimehrs,totaltimemin');
				oSearch.addFilter('actionby', 'EQUAL_TO', ns1blankspace.user.id);
				oSearch.addFilter('status', 'NOT_EQUAL_TO', 1);
				oSearch.addFilter('duedate', 'GREATER_THAN_OR_EQUAL_TO', 'hour', '0', 'start_of_today');

				oSearch.rows = 20
				oSearch.sort('duedate', 'asc');
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK')
					{
						nsFreshcare.extend.action.next10(oParam, oResponse)
					}
					else
					{
						ns1blankspace.status.error('Cannot find actions: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				var aHTML = [];
			
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspace"><tr><td class="ns1blankspaceNothing">Nothing scheduled.</td></tr></table>');
					
					$('#' + sXHTMLElementID).html(aHTML.join(''));
					$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeed);
				}
				else
				{
					aHTML.push('<table>');
					
					$.each(oResponse.data.rows, function()
					{
						var sClass = (this.priority === '' || parseInt(this.priority) <= 2) ? '' : ' nsFreshcareImportant';
						aHTML.push('<tr>');
											
						aHTML.push('<td id="tdAction_date-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRow">' +
											this.duedate + '</td>');

						sDate = '&nbsp;';
						var oDate = Date.parse(this.duedate);
								
						if (oDate != null)
						{ 			
							if (oDate.getHours() != 0 && oDate.getMinutes() != 0)
							{
								sDate = oDate.toString('h:mm TT');
							}
						}
						
						aHTML.push('<td id="ns1blankspaceAction_time-' + this.id + '" class="ns1blankspaceRow' + sClass + '" >' +
										sDate + '</td>');
						
						aHTML.push('<td id="ns1blankspaceAction_reference-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect' + sClass + '">' +
											this.subject + '</td>');
						
						aHTML.push('<td id="ns1blankspaceAction_contact-' + this.contactperson + '" class="ns1blankspaceRow ns1blankspaceRowSelectContact' + sClass + '">' +
										this.contactpersontext + '</td>');
						
						aHTML.push('<td id="ns1blankspaceAction_description-' + this.id + '" class="ns1blankspaceRow' + sClass + '">' +
										this.description + '</td>');
						
						aHTML.push('<td id="tdAction_options-' + this.id + '" class="ns1blankspaceRows" >' + 
										'<span id="ns1blankspaceActionComplete_' + this.id + '" class="ns1blankspaceAction ns1blankspaceActionComplete">Complete</span>' + 
										'<span id="ns1blankspaceActionPriority_' + this.id + '"' +
											' class="ns1blankspaceAction ns1blankspaceActionPriority"' +
											' data-priority="' + this.priority + '">Priority</span>' +
									'</td>');
						
						aHTML.push('</tr>');
					});
					
					aHTML.push('</table>');

					$('#' + sXHTMLElementID).html(aHTML.join(''));
					$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeed);
					
					$('td.ns1blankspaceRowSelect').click(function(event)
					{
						ns1blankspace.action.search.send(event.target.id, {source: 1});
					});
					
					$('td.ns1blankspaceRowSelectContact').click(function(event)
					{
						ns1blankspace.contactPerson.search.init();
						ns1blankspace.contactPerson.search.send(event.target.id, {source: 1});
					});
					
					$('span.ns1blankspaceActionComplete')
					.button(
					{
						label: 'Complete',
						text: false,
						icons: {primary: 'ui-icon-check'}
					})
					.css('height', '20px')
					.css('width', '20px')
					.on('click', function()
					{
						var oElement = this;
						var sID = oElement.id.split('_').pop();
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
							data: 'id=' + sID + '&status=1',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									// Remove the row
									$(oElement).parent().parent().remove();
								}
								else
								{
									ns1blankspace.status.error('Unable to Complete: ' + oResponse.error.errornotes);
								}
							}
						})
					});	

					$('span.ns1blankspaceActionPriority')
					.button(
					{
						label: 'Priority',
						text: false,
						icons: {primary: 'ui-icon-notice'}
					})
					.css('height', '20px')
					.css('width', '20px')
					.on('click', function()
					{
						var oElement = this;
						var sID = oElement.id.split('_').pop();
						var iPriority = $(oElement).attr('data-priority');
						var iNewPriority = '';
						if (iPriority == '' || parseInt(iPriority) <= 2 )	// Not set, Low or Medium
						{
							iNewPriority = '3';
						}
						else {iNewPriority = '1'}

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
							data: 'id=' + sID + '&priority=' + iNewPriority,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									$(oElement).attr('data-priority', iNewPriority);
									if (iNewPriority == '3')
									{// Add 'Important' class to add
										$(oElement).parent().parent().children().addClass('nsFreshcareImportant');
									}
									else
									{
										$(oElement).parent().parent().children().removeClass('nsFreshcareImportant');
									}
								}
								else
								{
									ns1blankspace.status.error('Unable to set Priority: ' + oResponse.error.errornotes);
								}
							}
						})
					});	
				}
			}	
		}
	},

	project:
	{
		layout: function()
		{	// v3.1.1i SUP022768 Aliased as want actions & emails split
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
			
			aHTML.push('<table class="ns1blankspaceControl">');
			
			if (ns1blankspace.objectContext == -1)
			{
				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
								'Details</td></tr>');		
			}
			else
			{
				aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
								'Summary</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
								'Details</td></tr>');

				aHTML.push('</table>');		
			
				aHTML.push('<table class="ns1blankspaceControl">');

				aHTML.push('<tr><td id="ns1blankspaceControlDescription" class="ns1blankspaceControl">' +
								'Description</td></tr>');

				aHTML.push('</table>');		
			
				aHTML.push('<table class="ns1blankspaceControl">');
			
				aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
								'Actions</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
								'Emails</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
								'Attachments</td></tr>');
			}	
			
			aHTML.push('</table>');					
						
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDescription" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainTasks" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainTaskDetails" class="ns1blankspaceControlMain"></div>');			
			aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));

			$('#ns1blankspaceControlSummary').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
				ns1blankspace.project.summary();
			});
			
			$('#ns1blankspaceControlDetails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
				ns1blankspace.project.details();
			});

			$('#ns1blankspaceControlDescription').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDescription'});
				ns1blankspace.project.description();
			});

			$('#ns1blankspaceControlTasks').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainTasks'});
				ns1blankspace.project.tasks.show();
			});

			$('#ns1blankspaceControlActions').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});

				// We want to exclude emails & SMS as they're already on the Emails tab
				var iActionTypes = $.map($.grep(nsFreshcare.data.actionTypes, function(x)
											{
												return x.id != '5' && x.id != '9' && x.id != '10';
											}),
											function(y) {return y.id}).join(',');

				var aFilters = [];
				aFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				aFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: ns1blankspace.object});
				aFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});

				nsFreshcare.internal.entity.actions.show(
				{
					xhtmlElementID: 'ns1blankspaceMainActions',
					contactBusiness: ns1blankspace.objectContext, 
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					object: '',
					objectContext: "",
					filters: aFilters,
					showDescription: true,
					actions: {add: true,
								remove: true},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionBind: nsFreshcare.internal.entity.actions.bind
				});
			});
			
			$('#ns1blankspaceControlEmails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});

				// We only want emails & SMS 
				var iActionTypes = '5,9,10';

				var aFilters = [];
				aFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				aFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: ns1blankspace.object});
				aFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});

				nsFreshcare.internal.entity.actions.show(
				{
					xhtmlElementID: 'ns1blankspaceMainEmails',
					xhtmlContext: 'Emails',
					contactBusiness: ns1blankspace.objectContext, 
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					object: '',
					objectContext: "",
					filters: aFilters,
					emailsOnly: true,
					actions: {add: true, remove: true},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionRow: nsFreshcare.internal.entity.emails.row,
					functionBind: nsFreshcare.internal.entity.emails.bind
				});
			});

			$('#ns1blankspaceControlAttachments').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
				ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments'});
			});
		}
	},

	projectTask:
	{
		layout: function()
		{	// v3.1.1i SUP022768 Aliased as want actions & emails split
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
			
			aHTML.push('<table class="ns1blankspaceControl">');
			
			if (ns1blankspace.objectContext == -1)
			{
				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
								'Details</td></tr>');		

				aHTML.push('<tr><td id="ns1blankspaceControlDescription" class="ns1blankspaceControl">' +
								'Description</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceControlScheduling" class="ns1blankspaceControl">' +
								'Scheduling</td></tr>');
			}
			else
			{
				aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
								'Summary</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
								'Details</td></tr>');

				aHTML.push('</table>');		
			
				aHTML.push('<table class="ns1blankspaceControl">');

				aHTML.push('<tr><td id="ns1blankspaceControlDescription" class="ns1blankspaceControl">' +
								'Description</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceControlScheduling" class="ns1blankspaceControl">' +
								'Scheduling</td></tr>');

				aHTML.push('</table>');		
			
				aHTML.push('<table class="ns1blankspaceControl">');
			
				aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
								'Actions</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
								'Emails</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
								'Attachments</td></tr>');
			}	
			
			aHTML.push('</table>');					
						
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDescription" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainScheduling" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));

			$('#ns1blankspaceControlSummary').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
				ns1blankspace.projectTask.summary();
			});
			
			$('#ns1blankspaceControlDetails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
				ns1blankspace.projectTask.details();
			});

			$('#ns1blankspaceControlDescription').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDescription'});
				ns1blankspace.projectTask.description();
			});

			$('#ns1blankspaceControlScheduling').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainScheduling'});
				ns1blankspace.projectTask.scheduling();
			});

			$('#ns1blankspaceControlActions').click(function(event)
			{
				ns1blankspace.show({selector: "#ns1blankspaceMainActions", refresh: true});

				// We want to exclude emails & SMS as they're already on the Emails tab
				var iActionTypes = $.map($.grep(nsFreshcare.data.actionTypes, function(x)
											{
												return x.id != '5' && x.id != '9' && x.id != '10';
											}),
											function(y) {return y.id}).join(',');

				var aFilters = [];
				aFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				aFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: ns1blankspace.object});
				aFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});

				nsFreshcare.internal.entity.actions.show(
				{
					xhtmlElementID: 'ns1blankspaceMainActions',
					contactBusiness: ns1blankspace.objectContext, 
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					object: '',
					objectContext: "",
					filters: aFilters,
					showDescription: true,
					actions: {add: true,
								remove: true},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionBind: nsFreshcare.internal.entity.actions.bind
				});
			});

			$('#ns1blankspaceControlEmails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});

				// We only want emails & SMS 
				var iActionTypes = '5,9,10';

				var aFilters = [];
				aFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				aFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: ns1blankspace.object});
				aFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});

				nsFreshcare.internal.entity.actions.show(
				{
					xhtmlElementID: 'ns1blankspaceMainEmails',
					xhtmlContext: 'Emails',
					contactBusiness: ns1blankspace.objectContext, 
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					object: '',
					objectContext: "",
					filters: aFilters,
					emailsOnly: true,
					actions: {add: true, remove: true},
					functionProcess: nsFreshcare.internal.entity.actions.process,
					functionRow: nsFreshcare.internal.entity.emails.row,
					functionBind: nsFreshcare.internal.entity.emails.bind
				});
			});

			$('#ns1blankspaceControlAttachments').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
				ns1blankspace.attachments.show({xhtmlElementID: 'ns1blankspaceMainAttachments'});
			});
		}
	},

	format:
	{
		render: function (oParam)
		{	
			var sXHTMLTemplate = ns1blankspace.util.getParam(oParam, 'xhtmlTemplate').value;
			var sTemplate = ns1blankspace.util.getParam(oParam, 'template', {'default': 'invoice'}).value;
			var iObject = ns1blankspace.util.getParam(oParam, 'object', {'default': ns1blankspace.object}).value;
			var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {'default': ns1blankspace.objectContext}).value;
			var oObjectData = ns1blankspace.util.getParam(oParam, 'objectData', {'default': ns1blankspace.objectContextData}).value;
			var oObjectOtherData = ns1blankspace.util.getParam(oParam, 'objectOtherData').value;
			var sXHTMLRendered;
			var sXHTMLLineItemTemplate = '';
			var aSourceMethods = [];
			var oXHTML;
			var aXHTML = [];


			sXHTMLTemplate = '<div id="ns1blankspaceTemplatePage1">' + sXHTMLTemplate + '</div>';
			sXHTMLTemplate = (sXHTMLTemplate).replace(/\[\[/g,'<span class="template">');
			sXHTMLTemplate = (sXHTMLTemplate).replace(/\]\]/g,'</span>');

			var sXHTMLLineItemTemplate = ns1blankspace.format.templates.get({object: iObject, titleText: 'schedule'});
			if (sXHTMLLineItemTemplate)
			{
				sXHTMLLineItemTemplate = sXHTMLLineItemTemplate.xhtml;
				sXHTMLLineItemTemplate = '<div id="ns1blankspaceTemplatePage2" style="display:none;">' + sXHTMLLineItemTemplate + '</div>';
				sXHTMLLineItemTemplate = sXHTMLLineItemTemplate.replace(/\[\[/g,'<span class="template">');
				sXHTMLLineItemTemplate = sXHTMLLineItemTemplate.replace(/\]\]/g,'</span>');
				sXHTMLLineItemTemplate = '<p id="pageBreak2" style="page-break-before:always;">&nbsp;</p>' + sXHTMLLineItemTemplate;
			}

			$(ns1blankspace.xhtml.container).html(sXHTMLTemplate + sXHTMLLineItemTemplate);
			oXHTML = $(ns1blankspace.xhtml.container);

			$('span.template', oXHTML).each(function(i,e) 
			{
				var oTemplateTag = $.grep(ns1blankspace.format.tags, function (a) { return a.caption == $(e).html() && a.object == iObject; }).shift();

				if (oTemplateTag)
				{
					$(e).html('');
					$(e).attr('data-format-tag', oTemplateTag.caption);
					$(e).attr('data-format-source', oTemplateTag.source);

					if (oTemplateTag.sourceFunction)
					{
						$(e).attr('data-format-source-function', oTemplateTag.sourceFunction);
						$(e).attr('data-format-source-function-namespace', oTemplateTag.sourceFunctionRootNamespaceText);
					}

					if (oTemplateTag.sourceGroup)
					{
						$(e).attr('data-format-source-group', oTemplateTag.sourceGroup);
					}
					else
					{
						$(e).attr('data-format-source-group', oTemplateTag.source.split('.').shift());
					}

					if (oTemplateTag.object == iObject && oTemplateTag.type == 1)
					{
						var sSourceFunction = $(e).attr('data-format-source-function');

						if (sSourceFunction)
						{
							var oRoot = (oTemplateTag.sourceFunctionRootNamespace) ? oTemplateTag.sourceFunctionRootNamespace : ns1blankspace;
							var fFunction = ns1blankspace.util.toFunction(sSourceFunction, oRoot);

							$(e).html(fFunction(oObjectData));
						}
						else if (oObjectData[oTemplateTag.source])
						{	
							$(e).html(oObjectData[oTemplateTag.source]);
						}
						else
						{
							if (oObjectData[oTemplateTag.source.split('.').pop()])
							{	
								$(e).html(oObjectData[oTemplateTag.source.split('.').pop()]);
							}
						}	
					}

					if (oTemplateTag.object == iObject && oTemplateTag.type == 2)
					{
						if ($.grep(aSourceMethods, function (a) { return a.method == oTemplateTag.method; }).length == 0)
						{
							aSourceMethods.push({method: oTemplateTag.method, 
												group: ((oTemplateTag.sourceGroup) ? oTemplateTag.sourceGroup : oTemplateTag.source.split('.').shift())});
						}	
					}
				}			
			});

			//TYPE = 2 - subtables - need to gather up

			var sHTML = $(oXHTML).html();

			if (aSourceMethods.length != 0)
			{	
				$(aSourceMethods).each(function() 
				{
					if (oObjectOtherData === undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = this.method;
						oSearch.addField(nsFreshcare.util.getSearchFields({fields: '*', namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCH'}));
						oSearch.addFilter('object', 'EQUAL_TO', iObject);
						oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
						oSearch.rows = 500;
						// 1.0.3 Added so that line items show in the right order (the way they're added into the doc causes them to be reversed)
						$.each(nsFreshcare.util.getSearchFields({fields: [{name: 'id', direction: 'asc'}], namespace: 'financial.' + ns1blankspace.objectName + '.FINANCIAL_ITEM_SEARCHSort'}), function()
						{
							oSearch.sort(this.name, (this.direction == 'asc' ? 'desc' : 'asc'));
						})

						// v3.1.213 SUP023248 Need to pass xhtml to process function
						var oTmp = {group: this.group, template: oParam.template, xhtml: sHTML};		// Need 'template' in process function
						oSearch.getResults(function(oResponse) 
						{
							if (oResponse.status == 'OK')			
							{
								ns1blankspace.format.process(oTmp, oResponse.data.rows)
							}
							else
							{
								ns1blankspace.status.error('Unable to find line items: ' + oResponse.error.errornotes);
							}
						});
					}
					else
					{
						oParam.group = this.group;
						oParam.xhtml = sHTML;
						sHTML = ns1blankspace.format.process(oParam, oObjectOtherData)
					}
				});
			}	

			return sHTML;
		},

		process: function (oParam, aRows)
		{	/* To be removed */
			//v3.1.0e Now only puts iMaxPage1Items lines on first page and if more, they all go on second pages
			// We determine if we're on the first page if the text 'linitem' doesn't appear in the template name
			// v3.1.1b SUP022566 Added parameters for page1 & page2 lineitems

			if (ns1blankspace.data.financial == undefined) {ns1blankspace.data.financial = {}}
			if (ns1blankspace.data.financial.invoice == undefined) {ns1blankspace.data.financial.invoice = {maxPage1ScheduleRows: 5, maxPage2ScheduleRows: 30}}

			var sTemplate = ns1blankspace.util.getParam(oParam, 'template').value;
			var oXHTML = document;
			var iMaxPage1Items = ns1blankspace.data.financial.invoice.maxPage1ScheduleRows;		
			var iMaxPage2Items = ns1blankspace.data.financial.invoice.maxPage2ScheduleRows;	
			var sPage1LineItemText = '<i>See Attached Schedule for Item Details.</i>';	// ToDo Make this configurable
			var iObject = ns1blankspace.util.getParam(oParam, 'object', {'default': ns1blankspace.object}).value;
			var iPage1Rows = aRows.length;
			var iPage2Rows = 0;
			var iMaxPages = 1;

			if (ns1blankspace.util.param(oParam, 'xhtml').exists)
			{
				$(ns1blankspace.xhtml.container).html(ns1blankspace.util.param(oParam, 'xhtml').value)
				oXHTML = $(ns1blankspace.xhtml.container);
			}

			var aTR = [];
			var sTRID = 'template-' + oParam.group;

			if (ns1blankspace.format.templates.get({object: iObject, titleText: 'schedule'}) != undefined)	// Lineitem template exists
			{
				iPage1Rows = (aRows.length > iMaxPage1Items) ? 0 : aRows.length;
				iPage2Rows = (aRows.length > iMaxPage1Items) ? iMaxPage2Items : 0;
				iMaxPages = (iPage2Rows > 0) ? 2 : 1;
				
				// If there are more items that can fit on a second page, we need to add more lineitem templates to the document up to as many pages are required
				if (aRows.length > iMaxPage2Items)
				{
					var sXHTMLLineItemTemplate = $('#ns1blankspaceTemplatePage2').html();

					var iRemainingRows = aRows.length - iMaxPage2Items;
					while (iRemainingRows > 0)
					{
						iMaxPages += 1;
						iRemainingRows = iRemainingRows - iMaxPage2Items; 
						$('#ns1blankspaceTemplatePage1').parent().html($('#ns1blankspaceTemplatePage1').parent().html() + 
															'<p style="page-break-before:always;">&nbsp;</p><div id="ns1blankspaceTemplatePage' + iMaxPages + '">' +
															sXHTMLLineItemTemplate + '</div>');
						oXHTML = $('#ns1blankspaceTemplatePage1').parent();
					} 
				}
			} 

			// We need to put Page1LineitemText onto page 1 if we have more than one page
			if (iPage2Rows > 0)
			{
				// Get the template row and put sPage1LineItemText into it
				$('#ns1blankspaceTemplatePage1 [data-format-source-group="' + oParam.group + '"]', oXHTML).each(function(i) 
				{
					var oTR = $(this).closest('tr');
					var sTRXHTML = '<td colspan="' + oTR.children().length + '">' + sPage1LineItemText + '</td>';

					$(oTR)
						.addClass(sTRID)
						.html(sTRXHTML);
				});	
				$('#ns1blankspaceTemplatePage2').show();
			}
			else
			{
				$('#pageBreak2').remove();
			}

			// Get the html for the row so that we can replace tags with the data
			$('#ns1blankspaceTemplatePage' + (iPage1Rows > 0 ? '1' : '2') + ' [data-format-source-group="' + oParam.group + '"]', oXHTML).each(function(i) 
			{
				$('#ns1blankspaceTemplatePage' + (iPage1Rows > 0 ? '1' : '2') + ' [data-format-source-group="' + oParam.group + '"]:first', oXHTML).closest('tr').clone()

				var oTR = $(this).closest('tr');
				var sTRXHTML = $(oTR).html();
				$(oTR).addClass(sTRID);

				$(sTRXHTML).each(function()
				{
					$(this).find('span.template').each(function(i,e) 
					{
						$(e).html($(e).attr('data-format-source'));
					});

					aTR.push($(this).html());
				});
			});	

			sTRXHTML = aTR.join('');

			$(aRows).each(function(index, row)
			{	
				var oRow = row;
				var iPage = (iPage1Rows > 0 ? 1 : 2);
				if (iPage > 1)
				{
					for (var i = iPage; i <= iMaxPages; i++)
					{
						var iLow = ((i - 2) * iMaxPage2Items);
						var iHigh = ((i - 1) * iMaxPage2Items);
						if (index >= iLow && index < iHigh)
						{
							iPage = i;
							i = iMaxPages + 1;
						}
					}
				}

				var oTRClone = $('#ns1blankspaceTemplatePage' + iPage + ' [data-format-source-group="' + oParam.group + '"]:first', oXHTML).closest('tr').clone();

				oTRClone.find('[data-format-source]').each(function()
				{
					var sSource = $(this).attr('data-format-source');
					var sSourceFunction = $(this).attr('data-format-source-function');

					if (sSourceFunction)
					{
						var oRoot = ($(this).attr('data-format-source-function-namespace') != '') 
											? window[$(this).attr('data-format-source-function-namespace')] 
											: ns1blankspace;
						var fFunction = ns1blankspace.util.toFunction(sSourceFunction, oRoot);
						$(this).html(fFunction(oRow));
					}
					else if (oRow[sSource])
					{	
						$(this).html(oRow[sSource]);
					}
					else
					{
						var aSource = (sSource).split('.');
						sSource = aSource[aSource.length-1];

						if (oRow[sSource])
						{	
							$(this).html(oRow[sSource]);
						}
					}	
				});

				$('#ns1blankspaceTemplatePage' + iPage + ' [data-format-source-group="' + oParam.group + '"]:first', oXHTML).closest('tr').parent().after(oTRClone);
					
				//$('#ns1blankspaceTemplatePage' + iPage + ' [data-format-source-group="' + oParam.group + '"]:first', oXHTML).closest('tr').remove();

			});

			if (ns1blankspace.util.param(oParam, 'xhtml').exists)
			{return $(oXHTML).html()}
		},

		itemAmountExGST: function(oRow)
		{
			var iAmount = 0;
			var iGST = 0;
			var sAmount = (oRow['lineitem.amount']) ? oRow['lineitem.amount'] : oRow['amount'];
			var sTax = (oRow['lineitem.tax']) ? oRow['lineitem.tax'] : oRow['tax'];

			iAmount = (nsFreshcare.extend.util.isNumeric({value: sAmount.replace(/,/g, '')}) ? Number(sAmount.replace(/,/g, '')) : 0);
			iGST = (nsFreshcare.extend.util.isNumeric({value: sTax.replace(/,/g, '')}) ? Number(sTax.replace(/,/g, '')) : 0);
			
			return (iAmount - iGST).formatMoney();
		},

		mailingAddress: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			var sAddressLine1 = '';
			var sAddressLine2 = '';

			sAddressLine1 = oRow['invoice.contactbusinesssentto.mailingaddress1'];
			sAddressLine2 = oRow['invoice.contactbusinesssentto.mailingaddress2'];

			if (sAddressLine1 + sAddressLine2 == '')
			{
				sAddressLine1 = oRow['invoice.contactbusinesssentto.streetaddress1'];
				sAddressLine2 = oRow['invoice.contactbusinesssentto.streetaddress2'];
			}

			return (sAddressLine1 + ((sAddressLine2 != '') ? ' <br />' + sAddressLine2 : ''));
		},

		mailingAddress1: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			return (oRow['invoice.contactbusinesssentto.mailingaddress1'] == '' 
					? oRow['invoice.contactbusinesssentto.streetaddress1'] 
					: oRow['invoice.contactbusinesssentto.mailingaddress1']);
		},

		mailingAddress2: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			return (oRow['invoice.contactbusinesssentto.mailingaddress2'] == '' 
					? oRow['invoice.contactbusinesssentto.streetaddress2'] 
					: oRow['invoice.contactbusinesssentto.mailingaddress2']);
		},

		mailingSuburb: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			return (oRow['invoice.contactbusinesssentto.mailingsuburb'] == '' 
					? oRow['invoice.contactbusinesssentto.streetsuburb'] 
					: oRow['invoice.contactbusinesssentto.mailingsuburb']);
		},

		mailingState: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			return (oRow['invoice.contactbusinesssentto.mailingstate'] == '' 
					? oRow['invoice.contactbusinesssentto.streetstate'] 
					: oRow['invoice.contactbusinesssentto.mailingstate']);
		},

		mailingPostCode: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			return (oRow['invoice.contactbusinesssentto.mailingpostcode'] == '' 
					? oRow['invoice.contactbusinesssentto.streetpostcode'] 
					: oRow['invoice.contactbusinesssentto.mailingpostcode']);
		},

		mailingCountry: function(oRow)
		{
			// v3.1.2 SUP022625 Now uses Street address if mailing not populated
			return (oRow['invoice.contactbusinesssentto.mailingcountry'] == '' 
					? oRow['invoice.contactbusinesssentto.streetcountry'] 
					: oRow['invoice.contactbusinesssentto.mailingcountry']);
		},

		personNewLine: function(oRow)
		{
			var sPersonText = '';

			sPersonText = oRow['contactpersonsenttotext'];
			if (sPersonText != '')
			{
				sPersonText = '<br />' + sPersonText.split(', ').pop() + ((sPersonText.split(', ').length > 1) ? ' ' + sPersonText.split(', ').shift() : '');
			}

			return sPersonText;
		},

		/* v3.1.1n SUP022585 Add Sent By & Sent By Email */
		userFullName: function(oRow)
		{
			return ns1blankspace.user.commonName;
		},

		userEmail: function(oRow)
		{
			return ns1blankspace.user.email;
		},

		editor: 
		{	/* To Be removed */
			init:	function (oParam)
			{
				var sHeight = ns1blankspace.util.getParam(oParam, 'height', {"default": '370px'}).value;
				var sWidth = ns1blankspace.util.getParam(oParam, 'width', {"default": '100%'}).value;
				var bDynamicTags = ns1blankspace.util.getParam(oParam, 'dynamicTags', {"default": false}).value;
				var sVersion = ns1blankspace.util.getParam(oParam, 'version').value;
				var sTheme = ns1blankspace.util.getParam(oParam, 'theme', {"default": 'advanced'}).value;
				var sXHTMLElement = ns1blankspace.util.getParam(oParam, 'xhtmlElement', {"default": 'textarea'}).value;
				var sSelector = ns1blankspace.util.getParam(oParam, 'selector', {"default": sXHTMLElement}).value;
				var iObject = ns1blankspace.util.getParam(oParam, 'object', {"default": '32'}).value;
				var aToolbars = ns1blankspace.util.getParam(oParam, 'toolbars').value;
				var bSimple = ns1blankspace.util.getParam(oParam, 'simple', {"default": false}).value;
				var oInit = ns1blankspace.util.getParam(oParam, 'init').value;
				var fOnInit = ns1blankspace.util.getParam(oParam, 'onInit').value;
				var sContentCSS = ns1blankspace.util.getParam(oParam, 'contentCSS').value;

				var sAdditional = '';

				if (sVersion == undefined && tinyMCE != undefined )
				{
					sVersion = tinyMCE.majorVersion;
				}

				if (sTheme == 'advanced' && sVersion == '4') {sTheme = 'modern'}

				if (ns1blankspace.option.richTextEditing)
				{
					if (bDynamicTags) {sAdditional = 'dynamicTags,'}

					if (sVersion == '4')
					{	
						if (sSelector && sSelector.indexOf('#') == -1) {sSelector = '#' + sSelector}
						if (oInit == undefined)
						{	
							oInit = 
							{
								selector: sSelector,
								theme: "modern",
								skin: 'light',
								height : sHeight, 
								width : sWidth,
								plugins:
								[
						                "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
						                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
						                "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
						        ],

						        menubar: false,
						        statusbar : false,
						        toolbar_items_size: 'small',

						        style_formats:
						        [
						                {title: 'Bold text', inline: 'b'}
						        ],

						        templates: '/ondemand/core/?method=CORE_DYNAMIC_TAG_SEARCH',
						        link_list: '/rpc/core/?method=CORE_EDITOR_LINK_SEARCH',
						        image_list: '/rpc/core/?method=CORE_EDITOR_IMAGE_SEARCH',

						        browser_spellcheck: true,
						        content_css: sContentCSS,
						        convert_urls: false
							}

							if (bSimple)
							{
								oInit.toolbar1 = 'bold italic underline | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect';
								oInit.toolbar2 = 'forecolor backcolor | cut copy paste | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code';
							}	
							else
							{	
								if (aToolbars == undefined)
								{
									oInit.toolbar1 = 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | formatselect fontselect fontsizeselect | fullscreen';
						        	oInit.toolbar2 = 'forecolor backcolor | cut copy paste | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code';
						        	oInit.toolbar3 = 'table | hr removeformat | subscript superscript | charmap emoticons | ltr rtl | visualchars visualblocks nonbreaking pagebreak | template';
								}
								else
								{
									$.each(aToolbars, function (t, toolbar)
									{
										oInit['toolbar' + (t+1)] = toolbar;
									});
								}
							}

							if (fOnInit != undefined)
							{
								oInit.init_instance_callback = fOnInit;
							}	
						}	
					}
					else if (sVersion == '3')
					{
						if (sSelector && sSelector.indexOf('#') == 0) {sSelector = sSelector.substr(1)}
						var oInit = 
						{
							mode : "none",
							height : sHeight, 
							width : "100%",
							theme : sTheme,

							theme_advanced_path : false,

							plugins : "table,advimage,advlink,emotions,iespell,insertdatetime," + sAdditional + "preview,media,fullscreen,print,visualchars,nonbreaking,pagebreak,style,paste,searchreplace,print,contextmenu", 

							theme_advanced_buttons1_add_before : "forecolor,backcolor", 
							theme_advanced_buttons1_add : "fontselect,fontsizeselect", 
					 
							theme_advanced_buttons2_add : "separator,insertdate,inserttime,preview,zoom,separator,nonbreaking,pagebreak", 
							theme_advanced_buttons2_add_before: "cut,copy,paste,pasteword,separator,search,replace,separator", 
							
							theme_advanced_buttons3_add_before : "tablecontrols,separator", 
							theme_advanced_buttons3_add : "emotions,iespell,fullscreen,print," + sAdditional + "media,selectall,advhr",
					 
							plugin_insertdate_dateFormat : "%d-%m-%y", 
							plugin_insertdate_timeFormat : "%H:%M:%S", 
						
							theme_advanced_toolbar_location : "top",
							theme_advanced_toolbar_align : "left",
							theme_advanced_resizing : true,
						
							font_size_style_values : "8pt,10pt,12pt,14pt,18pt,24pt,36pt",
							
							extended_valid_elements : "style,input[accept|accesskey|align<bottom?left?middle?right?top|alt|checked<checked|class|dir<ltr?rtl|disabled<disabled|id|ismap<ismap|lang|maxlength|name|onblur|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onselect|readonly<readonly|size|src|style|tabindex|title|type<button?checkbox?file?hidden?image?password?radio?reset?submit?text|usemap|value],select[class|dir<ltr?rtl|disabled<disabled|id|lang|multiple<multiple|name|onblur|onchange|onclick|ondblclick|onfocus|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|size|style|tabindex|title],ol[class|compact<compact|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|start|style|title|type],div[align<center?justify?left?right|class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title],li[class|dir<ltr?rtl|id|lang|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|style|title|type|value],iframe[src|width|height|name|align|frameborder|scrolling|marginheight|marginwidth],article,section",

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
							TemplateLinkType : iObject,
							content_css : ns1blankspace.xhtml.editorCSS,
							
							external_link_list_url : "/ondemand/core/?method=CORE_EDITOR_LINK_SEARCH", 
							external_image_list_url : "/ondemand/core/?method=CORE_EDITOR_IMAGE_SEARCH&object=19&objectcontext=" + ns1blankspace.objectContext, 
							media_external_list_url : "/ondemand/core/?method=CORE_EDITOR_MEDIA_SEARCH&object=19&objectcontext=" + ns1blankspace.objectContext
						}
					}	

					tinyMCE.init(oInit);
					if (sVersion == '3' && sSelector)
					{
						tinyMCE.execCommand('mceAddControl', false, sSelector);
					}								
				}
			}
		}
	},

	setup:
	{
		codes:
		{
			home:	function (oParam, oResponse)
			{
				var bAdvancedSearch = ns1blankspace.util.isMethodAdvancedSearch(ns1blankspace.setup.method + '_SEARCH');

				if (oResponse === undefined)
				{
					var aHTML = [];

					aHTML.push('<table class="ns1blankspace">');
					aHTML.push('<tr><td id="ns1blankspaceSetup">' +
									ns1blankspace.xhtml.loading + 
									'</td></tr></table>');					
					
					$('#ns1blankspaceMain').html(aHTML.join(''));
					
					var aHTML = [];

					aHTML.push('<table>' +
						'<tr><td><div id="ns1blankspaceViewProjectLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>' +
						'</table>');		
					
					$('#ns1blankspaceControl').html(aHTML.join(''));

					ns1blankspace.status.message('Click value to edit.');
					
					if (bAdvancedSearch)
					{
						if (ns1blankspace.setup.searchParam == undefined)
						{
							ns1blankspace.setup.searchParam = {fields: 'title'}
						}	

						var oSearch = new AdvancedSearch();
						oSearch.method = ns1blankspace.setup.method + '_SEARCH';
						if (ns1blankspace.setup.searchParam.fields)
						{
							oSearch.addField(ns1blankspace.setup.searchParam.fields);
						}
						else
						{
							oSearch.addField('title');
						}	
						
						if (ns1blankspace.setup.searchParam.filters)
						{
							$.each(ns1blankspace.setup.searchParam.filters, function()
							{
								if (this.name && this.comparison)
								{
									oSearch.addFilter(this.name, this.comparison, this.value1, this.value2, this.value3, this.applyToSubSearch);
								}
							});
						}

						if (ns1blankspace.setup.searchParam.sort)
						{
							$.each(ns1blankspace.setup.searchParam.sort, function()
							{
								if (this.name)
								{
									oSearch.sort(this.name, (this.direction) ? this.direction : 'asc');
								}
							});
							
						}
						oSearch.rows = 500;
						oSearch.rf = 'json'
						oSearch.getResults(function(oResponse)
						{
							nsFreshcare.extend.setup.codes.home(oParam, oResponse);
						});
					}
					else
					{
						$.ajax(
						{
							type: 'GET',
							url: ns1blankspace.util.endpointURI(ns1blankspace.setup.method + '_SEARCH'),
							data: 'rows=500',
							dataType: 'json',
							success: function(data) {
								nsFreshcare.extend.setup.codes.home(oParam, data)
							}
						});
					}
				}
				else
				{
					var aHTML = [];
					
					aHTML.push('<table id="ns1blankspaceSetupContainer">');
	
					aHTML.push('<tr class="ns1blankspaceRow">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Title</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption" style="text-align:right"><span id="ns1blankspaceSetupAdd">Add</span></td>');
					aHTML.push('</tr>');
					
					if (oResponse.data.rows.length === 0)
					{
						aHTML.push('<tr id="ns1blankspaceNothingToShow"><td class="ns1blankspaceNothing">Nothing to show.</td></tr>');

						$('#ns1blankspaceSetup').html('Nothing to show.');
					}
					else
					{	
						$.each(oResponse.data.rows, function()
						{
							aHTML.push('<tr class="ns1blankspaceRow">');
										
							aHTML.push('<td id="td_ns1blankspaceSetup-' + this.id + 
											'" class="ns1blankspaceRow ns1blankspaceSetup" style="cursor: pointer;">' +
											this.title + '</td>');
							
							aHTML.push('<td class="ns1blankspaceRow" style="width:30px;text-align:right;">' +
											'<span id="ns1blankspaceSetup_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span></td>');

						
							aHTML.push('</tr>');
						});
					}

					aHTML.push('</table>');

					$('#ns1blankspaceSetup').html(aHTML.join(''));
						
					$('#ns1blankspaceSetupAdd').button({
							text: false,
							 icons: {
								 primary: "ui-icon-plus"
							}
						})
						.click(function() {
							ns1blankspace.setup.add()
						})
						.css('width', '15px')
						.css('height', '20px')	
						
					$('td.ns1blankspaceSetup').click(function(event)
					{
						ns1blankspace.setup.edit.start(event.target.id);
					});
					
					$('.ns1blankspaceRowRemove').button(
					{
						text: false,
						icons:
						{
							 primary: "ui-icon-close"
						}
					})
					.click(function()
					{
						ns1blankspace.remove(
						{
							xhtmlElementID: this.id,
							method: ns1blankspace.setup.method + '_MANAGE',
							parentLevel: 2,
							ifNoneMessage: 'No ' + ns1blankspace.setup.name
						});
					})
					.css('width', '15px')
					.css('height', '20px');
							
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				}	
			}
		},

		financial:
		{
			accounts:
			{
				show: function(oParam, oResponse)
				{
					var iStep = 1;
					var iType;
					var iParentAccount;

					if (oParam != undefined)
					{
						if (oParam.step != undefined) {iStep = oParam.step}
						if (oParam.type != undefined) {iType = oParam.type}
						if (oParam.parentAccount != undefined) {iParentAccount = oParam.parentAccount}
					}
						
					if (iStep == 1)
					{
						var aHTML = [];
										
						aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceSetupAccountColumnType" style="width:100px;padding-right:5px;font-size:0.875em;" class="ns1blankspaceColumn1">' +
										ns1blankspace.xhtml.loading + '</td>' +
									'<td id="ns1blankspaceSetupAccountColumnList" style="width:200px;padding-right:5px;font-size:0.875em;" class="ns1blankspaceColumn2">' +
									'</td>' +
									'<td id="ns1blankspaceSetupAccountColumnEdit" style="width:280px;padding-right:15px;font-size:0.875em;" class="ns1blankspaceColumn2">' +
									'</td>' +
									'<td id="ns1blankspaceSetupAccountColumnAction" class="ns1blankspaceColumn2">' +
									'</td>' +
									'</tr>' +
									'</table>');				
								
						$('#ns1blankspaceMainFinancialAccount').html(aHTML.join(''));
						
						if (ns1blankspace.financial.rootAccount == undefined)
						{	
							var oSearch = new AdvancedSearch();
							oSearch.method = 'SETUP_FINANCIAL_ACCOUNT_SEARCH';
							oSearch.addField('title');
							oSearch.addFilter('parentaccount', 'IS_NULL');
							oSearch.async = false;
							oSearch.rows = 1;
							
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.data.rows.length != 0)
								{
									ns1blankspace.financial.rootAccount = oResponse.data.rows[0].id;
								}
								else
								{
									ns1blankspace.financial.rootAccount = -1;
								}	
							});	
						}

						if (ns1blankspace.financial.rootAccount == -1)
						{
							//Set up default
						}
						else
						{
							if (oResponse == undefined && ns1blankspace.financial.data.accounts === undefined)
							{
								var oSearch = new AdvancedSearch();
								oSearch.method = 'SETUP_FINANCIAL_ACCOUNT_SEARCH';
								oSearch.addField('title,parentaccount,parentaccounttext,postable,type,code');
								oSearch.rows = 200;
								oSearch.sort('code', 'asc');
								oSearch.getResults(function(data) {ns1blankspace.setup.financial.accounts.show(oParam, data)})	
							}
							else
							{
								var aHTML = [];
									
								if (oResponse !== undefined) {ns1blankspace.financial.data.accounts = oResponse.data.rows}
								ns1blankspace.financial.data.rootAccounts =  $.grep(ns1blankspace.financial.data.accounts, function (a) { return a.parentaccount == ns1blankspace.financial.rootAccount; })
								ns1blankspace.setup.financial.accounts.tree(ns1blankspace.financial.rootAccount); 

								aHTML.push('<table id="ns1blankspaceAccountType" class="ns1blankspace">' +
												'<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceSetupFinancialAccountType-1-'+ 
												($.grep(ns1blankspace.financial.data.rootAccounts, function (a) { return (a.title).indexOf('Expense') != -1; }))[0].id +
												'" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
												'Expenses</td>' +
												'</tr>' +
												'<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceSetupFinancialAccountType-2-' +
												($.grep(ns1blankspace.financial.data.rootAccounts, function (a) { return (a.title).indexOf('Revenue') != -1; }))[0].id +
												'" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
												'Revenue</td>' +
												'</tr>' +
												'<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceSetupFinancialAccountType-3-' +
												($.grep(ns1blankspace.financial.data.rootAccounts, function (a) { return (a.title).indexOf('Asset') != -1; }))[0].id +
												'" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
												'Asset</td>' +
												'</tr>' +
												'<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceSetupFinancialAccountType-4-' +
												($.grep(ns1blankspace.financial.data.rootAccounts, function (a) { return (a.title).indexOf('Liability') != -1; }))[0].id +
												'" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
												'Liability</td>' +
												'</tr>' +
												'<tr class="ns1blankspaceRow">' +
												'<td id="ns1blankspaceSetupFinancialAccountType-5-' +
												($.grep(ns1blankspace.financial.data.rootAccounts, function (a) { return (a.title).indexOf('Equity') != -1; }))[0].id +
												'" class="ns1blankspaceRow ns1blankspaceRowSelect">' +
												'Equity</td>' +
												'</tr>' +
												'</table>');					
										
								$('#ns1blankspaceSetupAccountColumnType').html(aHTML.join(''));

								$('#ns1blankspaceAccountType td.ns1blankspaceRowSelect').click(function(event)
								{
									var sXHTMLElementId = this.id;
									var aId = sXHTMLElementId.split('-');
									
									ns1blankspace.setup.financial.accounts.show({type: aId[1], parentAccount: aId[2], step: 2});
								});
							}
						}	
					}	
					else if (iStep == 2)
					{
						ns1blankspace.financial.currentAccount = iParentAccount;

						if (oResponse == undefined)
						{
							$('#ns1blankspaceSetupAccountColumnList').html(ns1blankspace.xhtml.loadingSmall);
							$('#ns1blankspaceSetupAccountColumnEdit').html('');
							$('#ns1blankspaceSetupAccountColumnAction').html('');

							var aHTML = [];

							aHTML.push('<table class="ns1blankspaceColumn2">' +
											'<tr><td>' +
											'<span id="ns1blankspaceAccountAdd" class="ns1blankspaceAction">Add</span>' +
											'</td></tr>' +
											'</table>');					
							
							$('#ns1blankspaceSetupAccountColumnEdit').html(aHTML.join(''));
						
							$('#ns1blankspaceAccountAdd').button(
							{
								label: "Add"
							})
							.click(function()
							{
								$.extend(true, oParam, {step: 4, xhtmlElementID: ""});
								ns1blankspace.setup.financial.accounts.show(oParam);
							})

							var oItems = $.grep(ns1blankspace.financial.data.accounts, function (a) { return a.parentaccount == iParentAccount; });
							ns1blankspace.setup.financial.accounts.show(oParam, oItems);
						}
						else
						{
							var aHTML = [];

							aHTML.push('<table id="ns1blankspaceSetupFinancialFinancialAccount" class="ns1blankspaceColumn2">');
						
							if (($.grep(ns1blankspace.financial.data.rootAccounts, function (a) { return a.id == iParentAccount; })).length == 0)
							{
								aHTML.push('<tr class="ns1blankspaceCaption">');
								aHTML.push('<td class="ns1blankspaceCaption" colspan=2>' +
												'<div style="float:left;""><span id="ns1blankspaceAccountParent-' +
												($.grep(ns1blankspace.financial.data.accounts, function (a) { return a.id == iParentAccount; }))[0].parentaccount +
												 '" class="ns1blankspaceRow ns1blankspaceRowOptionsParent">Add</span></div>' +
												'<div style="float:left;margin-left:3px;margin-top:3px;">' + ($.grep(ns1blankspace.financial.data.accounts, function (a) { return a.id == iParentAccount; }))[0].title
												+ '</div></td>');
								aHTML.push('</tr>');
							}
							
							if (oResponse.length == 0)
							{
								aHTML.push('<tr><td class="ns1blankspaceNothing">No sub-accounts.</td></tr></table>');
							}
							else
							{		
								$(oResponse).each(function()
								{
									aHTML.push('<tr class="ns1blankspaceRow">');
									
									if (this.postable == 'Y')
									{
										aHTML.push('<td id="ns1blankspaceFinancialAccount_title-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect"' +
															' title="">' +
															((this.code != '') ? this.code + ' - ' : '') + this.title + '</td>');
									}
									else
									{	
										aHTML.push('<td style="font-weight:600;" id="ns1blankspaceFinancialAccount_title-' + this.id + '" class="ns1blankspaceRow ns1blankspaceRowSelect"' +
															' title="">' +
															this.title + '</td>');
									}						
											
									aHTML.push('<td class="ns1blankspaceRow" style="width:20px;">' +
															'<span id="ns1blankspaceAccountChildren-' + this.id + '" class="ns1blankspaceRow' +
															(this.postable != 'Y' ? ' ns1blankspaceRowOptionsChildren">Next' : '">') + '</span>' +
															'</td>');						
																												
									aHTML.push('</tr>');
								});
							
								aHTML.push('</table>');
							}
						
							$('#ns1blankspaceSetupAccountColumnList').html(aHTML.join(''));
						
							$('#ns1blankspaceSetupFinancialFinancialAccount .ns1blankspaceRowOptionsParent').button(
							{
								text: false,
								icons: {
									primary: "ui-icon-triangle-1-w"
								}
							})
							.click(function() {
								var aId = (this.id).split('-');
								$.extend(true, oParam, {step: 2, parentAccount: aId[1]});
								ns1blankspace.setup.financial.accounts.show(oParam);
							})
							.css('width', '15px')
							.css('height', '17px');

							$('#ns1blankspaceSetupFinancialFinancialAccount .ns1blankspaceRowOptionsChildren').button(
							{
								text: false,
								icons: {
									primary: "ui-icon-triangle-1-e"
								}
							})
							.click(function() {
								var aId = (this.id).split('-');
								$.extend(true, oParam, {step: 2, parentAccount: aId[1]});
								ns1blankspace.setup.financial.accounts.show(oParam);
							})
							.css('width', '15px')
							.css('height', '17px');

							$('#ns1blankspaceSetupFinancialFinancialAccount td.ns1blankspaceRowSelect').click(function()
							{
								$.extend(true, oParam, {step: 4, xhtmlElementID: this.id});
								ns1blankspace.setup.financial.accounts.show(oParam);
							})
						}
					}
					else if (iStep == 4)
					{
						var sID; 
						var iType;
						var sXHTMLElementID;

						if (oParam != undefined)
						{
							if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
							if (oParam.type != undefined) {iType = oParam.type}
						}
						
						if (sXHTMLElementID != undefined)
						{
							var aXHTMLElementID = sXHTMLElementID.split('-');
							var sID = aXHTMLElementID[1];
						}	
					
						var iTaxType = (iType==1?2:1)

						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2">');

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Code' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceFinancialAccountCode" class="ns1blankspaceText">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Title' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceFinancialAccountTitle" class="ns1blankspaceText">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Parent' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceSelect">' +
										'<input id="ns1blankspaceFinancialAccountParentAccount" class="ns1blankspaceSelect"' +
											' data-method="SETUP_FINANCIAL_ACCOUNT_SEARCH"' +
											' data-columns="title">' +
										'</td></tr>');	
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Can transactions be linked to this account?' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioPostableY" name="radioPostable" value="Y"/>Yes' +
											'<br /><input type="radio" id="radioPostableN" name="radioPostable" value="N"/>No (it is a header account)' +
										'</td></tr>');

						if (iTaxType == 2)
						{	
							aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Cost of sale' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRadio">' +
										'<input type="radio" id="radioCOSY" name="radioCOS" value="Y"/>Yes' +
										'<br /><input type="radio" id="radioCOSN" name="radioCOS" value="N"/>No' +
										'</td></tr>');
						}	

						if (iTaxType == 1 || iTaxType == 2)
						{
							aHTML.push('<tr class="ns1blankspaceCaption">' +
											'<td class="ns1blankspaceCaption">' +
											ns1blankspace.option.taxVATCaption + ' Type' +
											'</td></tr>' +
											'<tr class="ns1blankspace">' +
											'<td id="ns1blankspaceFinancialTaxCode" class="ns1blankspaceRadio">' +
											ns1blankspace.xhtml.loadingSmall +
											'</td></tr>');
						}

						aHTML.push('</table>');					
						
						$('#ns1blankspaceSetupAccountColumnEdit').html(aHTML.join(''));
						
						$('#ns1blankspaceFinancialAccountCode').focus();

						var aHTML = [];
						
						aHTML.push('<table class="ns1blankspaceColumn2" style="font-size:0.875em">');
								
						aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceFinancialAccountEditSave" class="ns1blankspaceAction" style="width:70px;">' +
										'Save</span></td></tr>');
					
						aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceFinancialAccountEditRemove" class="ns1blankspaceAction" style="width:70px;">' +
										'Delete</span></td></tr>');

						aHTML.push('<tr><td>' +
										'<span id="ns1blankspaceFinancialAccountEditCancel" class="ns1blankspaceAction" style="width:70px;">' +
										'Cancel</span></td></tr>');
										
						aHTML.push('</table>');		

						$('#ns1blankspaceSetupAccountColumnAction').html(aHTML.join(''));
						
						$('#ns1blankspaceFinancialAccountEditSave').button(
						{
							text: "Save"
						})
						.click(function() 
						{
							ns1blankspace.status.working();

							var sData = 'type=' + iType;
							sData += '&id=' + ns1blankspace.util.fs(sID);
							sData += '&code=' + ns1blankspace.util.fs($('#ns1blankspaceFinancialAccountCode').val());
							sData += '&title=' + ns1blankspace.util.fs($('#ns1blankspaceFinancialAccountTitle').val());
							sData += '&parentaccount=' + ns1blankspace.util.fs($('#ns1blankspaceFinancialAccountParentAccount').attr("data-id"));
							sData += '&postable=' + ns1blankspace.util.fs($('input[name="radioPostable"]:checked').val());

							if ($('input[name="radioCOS"]').length != 0)
							{
								sData += '&expensecostofsale=' + ns1blankspace.util.fs($('input[name="radioCOS"]:checked').val());
							}	

							if ($('input[name="radioTaxCode"]').length != 0)
							{	
								sData += '&taxtype=' + ns1blankspace.util.fs($('input[name="radioTaxCode"]:checked').val());
							}

							var oAdd =
							{
								"items": [], 
								"code": $('#ns1blankspaceFinancialAccountCode').val(),
								"title": $('#ns1blankspaceFinancialAccountTitle').val(),
								"parentaccount": $('#ns1blankspaceFinancialAccountParentAccount').attr("data-id"),
								"postable": $('input[name="radioPostable"]:checked').val(),
								"taxtype": $('input[name="radioTaxCode"]:checked').val()
							}
										
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_FINANCIAL_ACCOUNT_MANAGE'),
								data: sData,
								dataType: 'json',
								success: function(data)
								{
									if (data.status == "OK")
									{
										ns1blankspace.status.message('Saved');

										$.extend(true, oAdd, {id: data.id});
										
										var bNew = true;

										$(ns1blankspace.financial.data.accounts).each(function(i) 
										{
											if (this.id == data.id) {ns1blankspace.financial.data.accounts[i] = oAdd; bNew = false}
										});

										if (bNew) {(ns1blankspace.financial.data.accounts).unshift(oAdd)}

										$.extend(true, oParam, {step: 2});
										ns1blankspace.setup.financial.accounts.show(oParam)
									}
									else
									{
										ns1blankspace.status.error(data.error.errornotes);
									}
								}
							});
						});

						$('#ns1blankspaceFinancialAccountEditRemove').button(
						{
							text: "Delete"
						})
						.click(function() 
						{
							ns1blankspace.status.working();

							var oData =
							{
								remove: 1,
								id: sID
							}
								
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_FINANCIAL_ACCOUNT_MANAGE'),
								data: oData,
								dataType: 'json',
								success: function(data)
								{
									if (data.status == 'OK')
									{
										ns1blankspace.status.message('Removed');

										ns1blankspace.financial.data.accounts =
														ns1blankspace.util.remove(ns1blankspace.financial.data.accounts, 'id', sID);
										
										$.extend(true, oParam, {step: 2});
										ns1blankspace.setup.financial.accounts.show(oParam)
									}
									else
									{
										ns1blankspace.status.error(data.error.errornotes);
									}
								}
							});
						});

						$('#ns1blankspaceFinancialAccountEditCancel').button(
						{
							text: "Cancel"
						})
						.click(function() 
						{
							$.extend(true, oParam, {step: 2});
							ns1blankspace.setup.financial.accounts.show(oParam);
						});

						if (sID != undefined)
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'SETUP_FINANCIAL_ACCOUNT_SEARCH';
							oSearch.addField('title,description,parentaccount,parentaccounttext,postable,expensecostofsale,taxtype,code');
							oSearch.addFilter('id', 'EQUAL_TO', sID);
							oSearch.getResults(function(data) {
									$.extend(true, oParam, {step: 5});
									ns1blankspace.setup.financial.accounts.show(oParam, data)
									});
						}
						else
						{
							$('#ns1blankspaceFinancialAccountParentAccount').val(($.grep(ns1blankspace.financial.data.accounts, function (a) { return a.id == ns1blankspace.financial.currentAccount; })[0].title).formatXHTML());
							$('#ns1blankspaceFinancialAccountParentAccount').attr('data-id', ns1blankspace.financial.currentAccount);
							$('[name="radioPostable"][value="Y"]').attr('checked', true);
							$('[name="radioCOS"][value="N"]').attr('checked', true);

							if (iType == 1 || iType == 2)
							{
								ns1blankspace.financial.util.tax.codes(
								{
									xhtmlElementID: 'ns1blankspaceFinancialTaxCode',
									id: 1,
									type: iType
								});
							}	
						}
					}
					else if (iStep == 5)
					{
						if (oResponse.data.rows.length != 0)
						{
							var oObjectContext = oResponse.data.rows[0];
							$('#ns1blankspaceFinancialAccountCode').val((oObjectContext.code).formatXHTML());
							$('#ns1blankspaceFinancialAccountTitle').val((oObjectContext.title).formatXHTML());
							$('#ns1blankspaceFinancialAccountParentAccount').val(($.grep(ns1blankspace.financial.data.accounts, function (a) { return a.id == oObjectContext.parentaccount; })[0].title).formatXHTML());
							$('#ns1blankspaceFinancialAccountParentAccount').attr('data-id', oObjectContext.parentaccount);
							$('[name="radioPostable"][value="' + oObjectContext.postable + '"]').attr('checked', true);
							$('[name="radioCOS"][value="' + oObjectContext.expensecostofsale + '"]').attr('checked', true);

							var iTaxType = (iType==1?2:1)

							if (iTaxType == 1 || iTaxType == 2)
							{
								ns1blankspace.financial.util.tax.codes(
								{
									xhtmlElementID: 'ns1blankspaceFinancialTaxCode',
									id: oObjectContext.taxtype,
									type: iTaxType
								});
							}	
						}
					}	
				}
			}
		},

		messaging:
		{
			summary: function()
			{
				// 3.1.1 SUP022293 Added Ful Refresh functionality
				var aHTML = [];
				
				if (ns1blankspace.objectContextData == undefined)
				{
					aHTML.push('<table><tr><td valign="top">Sorry can\'t find this messaging IMAP account.</td></tr></table>');
							
					$('#ns1blankspaceMain').html(aHTML.join(''));
				}
				else
				{
					aHTML.push('<table class="ns1blankspaceMain">' +
								'<tr class="ns1blankspaceRow">' +
								'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Large"></td>' +
								'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:230px;"></td>' +
								'</tr>' +
								'</table>');				
					
					$('#ns1blankspaceMainSummary').html(aHTML.join(''));

					var aHTML = [];

					aHTML.push('<table class="ns1blankspace">');
					
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Email</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryEmail" class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.email +
									'</td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Incoming Server (IMAP)</td></tr>' +
									'<tr><td id="ns1blankspaceSummaryServer" class="ns1blankspaceSummary">' +
									ns1blankspace.objectContextData.server +
									'</td></tr>');			
					
					aHTML.push('</table>');					
					
					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

					var aHTML = [];
					
					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td id="ns1blankspaceVerificationContainer" class="ns1blankspaceSummaryCaption">');

					if (ns1blankspace.objectContextData.verification == '2')
					{
						aHTML.push('SUSPENDED</td></tr><tr><td class="ns1blankspaceSubNote" style="padding-top:8px;">This messaging account has been suspended.</td></tr>')
					}
					
					if (ns1blankspace.objectContextData.verification == '3')
					{
						aHTML.push('VERIFIED</td></tr><tr><td class="ns1blankspaceSubNote" style="padding-top:8px;">This messaging account can<br />now send emails.</td></tr>')
					}
					
					if (ns1blankspace.objectContextData.verification == '1' || ns1blankspace.objectContextData.verification == undefined)
					{
						aHTML.push('NOT VERIFIED')
						aHTML.push('</td></tr>');
						aHTML.push('<tr><td class="ns1blankspaceSubNote" style="padding-top:8px;">Send a request for verification to <a href="mailto:verify@ibcom.biz">verify@ibcom.biz</a>.</td></tr>');
					}		

					// Now allows system admin user to verify the account
					if (ns1blankspace.objectContextData.verification != '3' && ns1blankspace.user.systemAdmin == true)
					{
						aHTML.push('<tr><td class="ns1blankspaceAction" id="ns1blankspaceConfirmVerification">Confirm Verification</td></tr>');
					}
					
					// User can now do a full refresh on their account as well

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td><span class="ns1blankspaceAction" id="ns1blankspaceAccountFullRefresh">Cache Refresh</span></td></tr>');

					aHTML.push('</table>');								
					
					$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));

					$('#ns1blankspaceConfirmVerification')
					.button(
					{
						label: 'Confirm Verification'
					})
					.on('click', function()
					{
						var oButtons = 
						[
							{
								text: "Yes", icons: {primary: 'ui-icon-check'}, 
								click: function() 
								{
									$(this).dialog('destroy');
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('SETUP_MESSAGING_ACCOUNT_MANAGE'),
										data: {id: ns1blankspace.objectContext, verification: '3'},
										success: function(data) {ns1blankspace.setup.messaging.search.send('-' + ns1blankspace.objectContext)}
									});
								}
							},
							{
								text: "No", icons: {primary: 'ui-icon-check'}, 
								click: function() {$(this).dialog('destroy')}
							}
						];

						ns1blankspace.container.confirm(
						{
							title: 'Verify Messaging Account',
							html: 'Has the email user received and clicked on the link in the Amazon SES email to verify the account or have you added the TXT records to the domain sucessfully?',
							buttons: oButtons
						});
					});
				
					$('#ns1blankspaceAccountFullRefresh')
					.button(
					{
						label: 'Full Cache Refresh'
					})
					.on('click', function()
					{
						var oButtons = 
						[
							{
								text: "Yes", icons: {primary: 'ui-icon-check'}, 
								click: function() 
								{
									$(this).dialog('destroy');
									nsFreshcare.extend.setup.messaging.fullRefresh({account: ns1blankspace.objectContext});
								}
							},
							{
								text: "No", icons: {primary: 'ui-icon-check'}, 
								click: function() {$(this).dialog('destroy')}
							}
						];

						ns1blankspace.container.confirm(
						{
							title: 'Full Account Cache Refresh',
							html: 'Are you sure you want to do a full email account cache refresh? This could take some time.',
							buttons: oButtons
						});
					});
				}	
			},

			fullRefresh: function(oParam)
			{
				// 3.1.1 SUP022293 Added Full Refresh functionality
				var iAccount = ns1blankspace.util.getParam(oParam, 'account').value;
				var sCheckParams = ns1blankspace.util.getParam(oParam, 'checkParams', {'default': ''}).value;
				oParam.localParms = ns1blankspace.util.getParam(oParam, "localParms", {'default': {}}).value

				if (iAccount == undefined)
				{
					ns1blankspace.status.error('No messaging account passed. Please contact support.');
				}
				else
				{
					var oData = ($.type("sCheckParams") == 'object') ? sCheckParams : {};
					if (sCheckParams != "")
					{
						$.each(sCheckParams.split('&'), function()
						{
							oData[this.split('=').shift()] = this.split('=').pop();
						});
					}

					oData.account = iAccount;
					oData.fullrefresh = (oParam.localParms.startIndex == undefined) ? '1' : '0';
					if (oParam.localParms.startIndex != undefined) {oData.startIndex = oParam.localParms.startIndex;}
					if (oParam.localParms.stopIndex != undefined) {oData.stopIndex = oParam.localParms.stopIndex;}

					ns1blankspace.status.working('Searching for emails' + 
												((oParam.localParms.startIndex) 
													? " from row " + oParam.localParms.startIndex + " to " + oParam.localParms.stopIndex + " of " + oParam.localParms.fullCount
													: ": Most recent 100")
												);
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_CACHE_CHECK'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.newrows == '100')
								{
									ns1blankspace.status.message('Retrieving older emails..')
									oParam.localParms.fullCount = (oParam.localParms.stopIndex == undefined) ? oResponse.stopIndex : oParam.localParms.fullCount;
									oParam.localParms.startIndex = Number(oResponse.startindex) - 100;
									oParam.localParms.stopIndex = Number(oResponse.stopindex) - 100;
									if (oParam.localParms.startIndex < 0) {oParam.localParms.startIndex = 0}
									if (oParam.localParms.stopIndex < 0) {oParam.localParms.stopIndex = 0}
									nsFreshcare.extend.setup.messaging.fullRefresh(oParam)
								}
								else if (oResponse.newrows == undefined)
								{	// POssible that CACHE_CHECK already runing
									if (oResponse.warning)
									{
										ns1blankspace.status.error("Caching process is already running on this account. Please log off and try again.");
										delete(oParam.localParms);
									}
								}
								else
								{	
									delete(oParam.localParms);
									ns1blankspace.status.message('Account Cache Refreshed..');
									if (oParam.onComplete)
									{
										ns1blankspace.util.onComplete(oParam);
									}
								}
							}
							else
							{
								delete(oParam.localParms);
								ns1blankspace.status.error('Error refreshing account cache: ' + 
											((oResponse.error.errorcode == '3') ? "You do not have access to this account." : oResponse.error.errornotes));
							}
						}
					});
				}
			}
		},

		file:
		{
			"import":
			{
				upload:
				{
					show: function (oParam, oResponse)
					{
						$('#ns1blankspaceFileImportShowColumn1').html(
							'<table class="ns1blankspaceColumn2"><tr><td>' +
								ns1blankspace.xhtml.loading + '</td></tr></table>');

						var bInitialised = false;

						// v3.1.2 Aliased because Freshcare passes ns1blankspace.param aso oParam is defined - we need to make sure object isn't undefined
						if (oParam == undefined || oParam.object == undefined)
						{
							oParam = {};
							oParam.object = ns1blankspace.setup.file["import"].data.object;
						}

						if (oParam.initialised != undefined) {bInitialised = oParam.initialised}

						if (!bInitialised)
						{	
							oParam.onComplete = ns1blankspace.setup.file["import"].upload.show;
							ns1blankspace.setup.file.util.getFields(oParam);
						}
						else
						{	
							if (oResponse == undefined)
							{	
								var oSearch = new AdvancedSearch();
								oSearch.method = 'CORE_ATTACHMENT_SEARCH';
								oSearch.addField('type,filename,description,download,modifieddate,attachment');
								oSearch.addFilter('object', 'EQUAL_TO', ns1blankspace.object);
								oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);		
								oSearch.sort('id', 'desc');
								oSearch.getResults(function(data) {ns1blankspace.setup.file["import"].upload.show(oParam, data)});
							}
							else
							{	
								if (oResponse.data.rows.length != 0)
								{	
									ns1blankspace.setup.file["import"].data.attachment = oResponse.data.rows[0].id;

									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('CORE_ATTACHMENT_READ'),
										data: 'allcolumnstext=Y&id=' + ns1blankspace.util.fs(oResponse.data.rows[0].id),
										success: function(data)
										{
											var aHTML = [];

											aHTML.push('<table class="ns1blankspaceColumn2" id="ns1blankspaceUploadFields">' +
															'<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceHeaderCaption" style="width:5px;" colspan="2">Match Using</td>' +
															'<td class="ns1blankspaceHeaderCaption">Sample</td>' +
															'</tr>');

											var sClass = '';
											var bFieldErrors = false;
											var bTooManyRows = (data.rowlimit == 'Y');

											ns1blankspace.setup.file["import"].data.fields = [];
											ns1blankspace.setup.file["import"].data.keyFields = [];

											var oRow = data.data.rows[0];

											for (var key in oRow)
											{					
												if (key != 'dataerrors')
												{														
													sClass = '';

													var aKey = $.grep(ns1blankspace.setup.file.data.fields, function (a) {return (a.name).split('.')[1] == key && a.include;});

													if (aKey.length == 0)
													{
														sClass = ' ns1blankspaceError';
														bFieldErrors = true;
													}
													else
													{
														ns1blankspace.setup.file["import"].data.fields.push(key);
													}	

													aHTML.push('<tr>');

													aHTML.push('<td class="ns1blankspaceRow">' +
																'<input type="checkbox" id="ns1blankspaceTemplate_key-' + key + '" /></td>');

													aHTML.push('<td id="ns1blankspaceTemplate_caption_' + key + '" class="ns1blankspaceRow' + sClass + '">' +
																key + '</td>');

													aHTML.push('<td style="font-size:0.75em;" class="ns1blankspaceRow ns1blankspaceSub">' +
																	oRow[key] + '</td></tr>');
												}																			   
											}

											aHTML.push('</table>');

											$('#ns1blankspaceFileImportShowColumn1').html(aHTML.join(''));

											$('#ns1blankspaceUploadFields [type="checkbox"] :first').prop('checked', true)

											var aHTML = [];
							
											aHTML.push('<table class="ns1blankspaceColumn2">');

											if (bFieldErrors)
											{
												aHTML.push('<tr><td style="font-size:0.875em;" class="ns1blankspaceSub">' +
															'Some of the fields in the file have invalid names.  ' +
															' You will need to fix this and then re-upload the file.' +
															'</td></tr>');
											}
											else if (bTooManyRows)
											{
												aHTML.push('<tr><td style="font-size:0.875em;" class="ns1blankspaceSub">' +
															'There is a 500 record limit per upload.<br /><br >Please split the file up into 500 record files.' +
															'</td></tr>');
											}
											else
											{
												aHTML.push('<tr><td><span id="ns1blankspaceUploadShow" class="ns1blankspaceAction">' +
															'Check all data</span></td></tr>');

												aHTML.push('<tr><td style="padding-top:10px; font-size:0.75em;" class="ns1blankspaceSub">' +
															'This will check all data and report any data errors.<br /><br />' +
															' You can then proceed to import the data into your space.' +
															'</td></tr>');
											}	

											aHTML.push('</table>');					
											
											$('#ns1blankspaceFileImportShowColumn2').html(aHTML.join(''));
											
											$('#ns1blankspaceUploadShow').button(
											{
												text: "Check all"
											})
											.click(function()
											{	
												if ($('#ns1blankspaceUploadFields input:checked').length == 0)
												{
													ns1blankspace.status.error("Need at least one key");
												}
												else
												{
													ns1blankspace.setup.file["import"].data.keys = [];
													$('#ns1blankspaceUploadFields input:checked').each(function()
													{
														ns1blankspace.setup.file["import"].data.keys.push((this.id).split('-')[1]);
													})
													 				 
													ns1blankspace.setup.file["import"].upload.validate(oParam);
												}	
											});
										}
									});
								}	
							}	
						}
					},

				}
			}
		}
	},

	util:
	{
	 	
		initTemplate: function (oParam)
		{	// v3.1.0e Now does second pass to see if corresponding lineitem template exists
			var sTemplate = 'invoice';

			if (ns1blankspace.util.param(oParam, 'template').exists) {sTemplate = ns1blankspace.util.param(oParam, 'template').value}
			if (oParam.initTemplateStep == undefined) {oParam.initTemplateStep = 1}

			if (oParam.initTemplateStep === 2) {sTemplate += 'lineitem'}

			if (ns1blankspace.xhtml.templates[sTemplate] == undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'DOCUMENT_SEARCH';
				oSearch.addField('title,content');
				oSearch.addFilter('type', 'EQUAL_TO', 10);
				oSearch.addFilter('title', 'EQUAL_TO', (sTemplate).toUpperCase() + ' TEMPLATE');

				oSearch.getResults(function(oResponse)
				{
					if (oResponse.data.rows.length == 0) 
					{
						// No template set up as yet - find default template document if it exists
						if (ns1blankspace.xhtml.templates.source[sTemplate] !== undefined)
						{	
							$.ajax(
							{
								type: 'GET',
								url: ns1blankspace.xhtml.templates.source[sTemplate],
								dataType: 'text',
								global: false,
								success: function(data)
								{
									ns1blankspace.xhtml.templates[sTemplate] = data;
									if (oParam.initTemplateStep == 1)
									{
										oParam.initTemplateStep = 2;
										ns1blankspace.util.initTemplate(oParam);
									}
									else
									{
										delete(oParam.initTemplateStep);
										ns1blankspace.util.onComplete(oParam);
									}
								},
								error: function(data)
								{
									ns1blankspace.xhtml.templates[sTemplate] = '';
									ns1blankspace.xhtml.templates.document[sTemplate] = '';
									if (oParam.initTemplateStep == 1)
									{
										oParam.initTemplateStep = 2;
										ns1blankspace.util.initTemplate(oParam);
									}
									else
									{
										delete(oParam.initTemplateStep);
										ns1blankspace.util.onComplete(oParam);
									}
								}
							});	
						}
						// If no default template for lineitem, just go to callback function
						else if (oParam.initTemplateStep == 2)
						{
							delete(oParam.initTemplateStep);
							ns1blankspace.util.onComplete(oParam);
						}	
					}
					else
					{
						ns1blankspace.xhtml.templates[sTemplate] = (oResponse.data.rows[0].content).formatXHTML();
						ns1blankspace.xhtml.templates.document[sTemplate] = oResponse.data.rows[0].id;
						if (oParam.initTemplateStep == 1)
						{
							oParam.initTemplateStep = 2;
							ns1blankspace.util.initTemplate(oParam);
						}
						else
						{
							delete(oParam.initTemplateStep);
							ns1blankspace.util.onComplete(oParam);
						}
					}
				});		
			}
			else
			{
				delete(oParam.initTemplateStep);
				ns1blankspace.util.onComplete(oParam);
			}
		},

		isNumeric: function(oParam)
		{
			var bZeroValid = true;
			var sValue;

			if (oParam) {
				if (oParam.value) {sValue = oParam.value}
				if (oParam.zeroValid != undefined) {bZeroValid = oParam.zeroValid;}
			}

			if (sValue) {

				if (!isNaN(new Number(sValue))) {
					return true;
				}
				else { 
					return false;
				}
			}
			else {
				return false;
			}
		},

		ondemandPDFCreate: function(oParam, sReturn)
		{		// Added v1.0.5 as new PDFCreate needs styles..
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {"default": 'ns1blankspaceSummaryCreatePDF'}).value;
			var iObject = ns1blankspace.util.getParam(oParam, 'object', {"default": ns1blankspace.object}).value;
			var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {"default": ns1blankspace.objectContext}).value;
			var sFileName = ns1blankspace.util.getParam(oParam, 'filename', {"default": ns1blankspace.objectContextData.id + '.pdf'}).value;
			var sXHTMLContent = ns1blankspace.util.getParam(oParam, 'xhtmlContent', {"default": ''}).value;
			var bOpen = ns1blankspace.util.getParam(oParam, 'open', {"default": false}).value;
			var fOnComplete = ns1blankspace.util.getParam(oParam, 'onComplete').value;
			var bReplace = ns1blankspace.util.getParam(oParam, 'replace', {"default": false}).value;
			var iLeftMargin = ns1blankspace.util.getParam(oParam, 'leftmargin').value;
			var iRightMargin = ns1blankspace.util.getParam(oParam, 'rightmargin').value;
			var iTopMargin = ns1blankspace.util.getParam(oParam, 'topmargin').value;
			var iBottomMargin = ns1blankspace.util.getParam(oParam, 'bottommargin').value;
			var iOrientation = ns1blankspace.util.getParam(oParam, 'orientation', {"default": 1}).value;
			var bLink = ns1blankspace.util.getParam(oParam, 'link', {"default": false}).value;
			var sLinkText = ns1blankspace.util.getParam(oParam, 'linkText', {"default": "Download&nbsp;&raquo;"}).value;

			if (bReplace)
			{	
				sXHTMLContent = sXHTMLContent.replace(/https/g,'http');
				sXHTMLContent = sXHTMLContent.replace(/app.alt-enter.com/g,'[[host]]');
				sXHTMLContent = sXHTMLContent.replace(/app.1blankspace.com/g,'[[host]]');
			}	
											
			if (sReturn === undefined)
			{
				$('#' + sXHTMLElementID).button(
				{
					label: 'Creating'
				});
				
				var oData =
				{
					rf: 'TEXT',
					object: iObject,
					objectcontext: iObjectContext,
					filename: sFileName,
					xhtmlcontent: sXHTMLContent,
					orientation: iOrientation
				}

				if (iLeftMargin !== undefined) {oData.leftmargin = iLeftMargin}
				if (iRightMargin !== undefined) {oData.rightmargin = iRightMargin}
				if (iTopMargin !== undefined) {oData.topmargin = iTopMargin}
				if (iBottomMargin !== undefined) {oData.bottommargin = iBottomMargin}
				
				$.ajax(
				{
					type: 'POST',
					url: '/ondemand/core/?method=CORE_PDF_CREATE',
					data: oData,
					dataType: 'text',
					success: function(data) {nsFreshcare.extend.util.ondemandPDFCreate(oParam, data)}
				});
			}	
			else	
			{
				var aReturn = sReturn.split('|');

				if (fOnComplete === undefined)
				{	
					if (aReturn[1])
					{
						if (bOpen)
						{
							window.open('/download/' + aReturn[1])	
						}
						else
						{
							if (bLink && sXHTMLElementID !== undefined)
							{
								$('#' + sXHTMLElementID).button("destroy");
								$('#' + sXHTMLElementID).html('<a href="/download/' + aReturn[1] + '" target="_blank">' + sLinkText + '</a>');
							}
							else
							{	
								$('#' + sXHTMLElementID).button("destroy");
								$('#' + sXHTMLElementID).button(
								{
									label: 'Open'
								})
								.click(function(event)
								{
									window.open('/download/' + aReturn[1])
								});
							}	
						}	
					}
					else
					{
						$('#' + sXHTMLElementID).button("destroy");
						$('#' + sXHTMLElementID).button(
						{
							label: 'Error'
						})
						.click(function(event)
						{
							window.alert('An error occured while creating the PDF.');
						});
					}
				}
				else
				{
					oParam.attachmentLink = aReturn[1];
					delete oParam.onComplete;
					fOnComplete(oParam);
				}	
			}	
		}	
	},

	actions:
	{
		show: function (oParam)
		{
			// v3.1.1f Changed to use getParam and now sets ContainerID to ElementID
			var aHTML = [];
			var sXHTMLElementContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMainActions'}).value;
			var sXHTMLElementID = 'ns1blankspaceActionsColumn1';
			var bShowAdd = ns1blankspace.util.getParam(oParam, 'showAdd', {'default': false}).value;
			var oActions = ns1blankspace.util.getParam(oParam, 'actions', {'default': {add: false}}).value;
			var oContext = ns1blankspace.util.getParam(oParam, 'context', {'default': {inContext: false}}).value;
			var aSearchFilters = ns1blankspace.util.getParam(oParam, 'searchFilters', {'default': []}).value;
			var iObject = ns1blankspace.util.getParam(oParam, 'object', {'default': ns1blankspace.object}).value;
			var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectContext', {'default': ns1blankspace.objectContext}).value;
			var sObjectName = ns1blankspace.util.getParam(oParam, 'objectName', {'default': ns1blankspace.objectName}).value;
			var iType = ns1blankspace.util.getParam(oParam, 'actionType').value;
			iType = ns1blankspace.util.getParam(oParam, 'type').value;
			var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness').value;
			var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson').value;
			var iContactBusinessText = ns1blankspace.util.getParam(oParam, 'contactBusinessText').value;
			var iContactPersonText = ns1blankspace.util.getParam(oParam, 'contactPersonText').value;

			// v3.1.210 SUP023227 Now passes functionPostSave to edit so that once done editing, it calls back to correct show function
			if (oParam == undefined) {oParam = {}}
			if (oParam.functionPostSave == undefined) {oParam.functionPostSave = nsFreshcare.extend.actions.show}
			oParam.xhtmlElementID = sXHTMLElementID;
							
			// v3.1.1f Added so that parameters could be used in other actions functions
			ns1blankspace.actions.data = oParam;

			if (ns1blankspace.app.context) {ns1blankspace.app.context(oContext)};

			var aHTML = [];
			var h = -1;	
						
			// v3.1.210 SUP023227 removed formFactor options
			aHTML.push('<table id="ns1blankspace" class="ns1blankspace">' +
						'<tr>' +
						'<td id="ns1blankspaceActionsColumn1" class="ns1blankspaceColumn1Flexible">' +
						ns1blankspace.xhtml.loading +
						'</td><td id="ns1blankspaceActionsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td></tr>' +
						'</table>');					
				
			$('#' + sXHTMLElementContainerID).html(aHTML.join(''));
			
			if (oActions.add)
			{
				var aHTML = [];
				
				aHTML.push('<table id="tablens1blankspaceActionsColumn2" class="ns1blankspaceColumn2">');
				
				aHTML.push('<tr><td class="ns1blankspaceAction">' +
								'<span id="ns1blankspaceActionsAdd">Add</span>' +
								'</td></tr>');
										
				aHTML.push('</table>');					
				
				$('#ns1blankspaceActionsColumn2').html(aHTML.join(''));
			}
			
			// v2.1.8 Moved from section below as was preventing actions from displaying when user had no Add permissions
			oParam.xhtmlElementID = 'ns1blankspaceActionsColumn1';
			
			$('#ns1blankspaceActionsAdd').button(
			{
				label: "Add"
			})
			.click(function()
			{
				ns1blankspace.actions.edit(oParam);
			});
			
			if (iObjectContext != -1)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('subject,duedate,actiontype,actiontypetext');

				if (iType) {oSearch.addFilter('actiontype', 'EQUAL_TO', iType)};

				if (iObject != undefined && iObject != '') {oSearch.addFilter('object', 'EQUAL_TO', iObject)};
				if (iObjectContext != undefined && iObjectContext != '') {oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext)};
				
				if (iContactBusiness) {oSearch.addFilter('contactbusiness', 'EQUAL_TO', iContactBusiness)};
				if (iContactPerson) {oSearch.addFilter('contactperson', 'EQUAL_TO', iContactPerson)};

				oSearch.sort('modifieddate', 'desc')

				oSearch.getResults(function(data) {ns1blankspace.actions.process(oParam, data)});
			}
		},

		bind: function (oParam)
		{
			// v2.1.8 Responds to passed oActions.remove parameter or values saved against ns1blankspace.actions.data
			var sXHTMLContainerID = ns1blankspace.util.getParam(oParam, 'xhtmlContainerID', {"default": 'ns1blankspaceRenderPage_Action-0'}).value;
			var oActions = ns1blankspace.util.getParam(oParam, 'actions').value;
			if (oActions == undefined)
			{
				oActions = ns1blankspace.util.getParam(ns1blankspace.actions.data, 'actions', {'default': {remove: true}}).value;
			}

			if (oActions.remove == true)
			{
				$('#' + sXHTMLContainerID + ' .ns1blankspaceRowRemove').button(
				{
					text: false,
					icons:
					{
						primary: "ui-icon-close"
					}
				})
				.click(function()
				{
					ns1blankspace.remove(
					{
						xhtmlElementID: this.id,
						method: 'ACTION_MANAGE',
						parentLevel: 2,
						ifNoneMessage: 'No actions.'
					});
				})
				.css('width', '15px')
				.css('height', '17px');
			}
				
			// 3.1.1g SUP022716 Was including this in condition above
			$('#' + sXHTMLContainerID + ' td.ns1blankspaceRowSelect').click(function()
			{
				ns1blankspace.action.init({id: (this.id).split('-')[1]})
			});
		}
	}
}
