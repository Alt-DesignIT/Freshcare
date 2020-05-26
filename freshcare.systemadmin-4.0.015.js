

nsFreshcare.systemadmin = 
{

	init: 	function (oParam) 
			{ 
					ns1blankspace.app.reset();
					$('#ns1blankspaceViewControlViewContainer').button(
							{
								label: 'System Admin'
							});			
					nsFreshcare.systemadmin.show(); 
					nsFreshcare.systemadmin.data = {};
					nsFreshcare.systemadmin.params = {};
			},

	show: 	function (oParam) 
			{

					ns1blankspace.history.view(
					{
						newDestination: 'nsFreshcare.systemadmin.show();',
						move: false
					});

					/*if (ns1blankspace.setupView)
					{	
						$('#ns1blankspaceViewControlSetup').attr('checked', false);
						$('#ns1blankspaceViewControlSetup').button('refresh');
						ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.systemadmin.show()'});
					}	*/

					$('#ns1blankspaceViewControlAction').button({disabled: true});
					$('#ns1blankspaceViewControlNew').button({disabled: true});
					$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

					var aHTML = [];
					
					aHTML.push('<table id="ns1blankspaceUpdateControlContainer">');
					
					aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

					aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td id="ns1blankspaceControlRequestSearch" class="ns1blankspaceControl ns1blankspaceControlHome">' +
										'Advanced Search</td>' +
									'</tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');

					aHTML.push('</table>');					
							
					$('#ns1blankspaceControl').html(aHTML.join(''));
					
					nsFreshcare.systemadmin.bind();

					ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlRequestSearch';
					
					var aHTML = [];
					
					aHTML.push('<div id="ns1blankspaceBulkUpdatesMain" class="ns1blankspaceControlMain">');
					aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
					aHTML.push('<td id="ns1blankspaceUpdateColumn1" class="ns1blankspaceColumn1Flexible"></td>');
					aHTML.push('</tr></table>');	
					aHTML.push('</div>');

					$('#ns1blankspaceMain').html(aHTML.join(''));

					if (ns1blankspace.xhtml.defaultElementID != '')
					{
						$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
						$('#' + ns1blankspace.xhtml.defaultElementID).click();
					}
			},

	bind: 	function ()
			{
				
				$('#ns1blankspaceControlRequestSearch').click(function(event)
				{
					
					$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
					$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
					ns1blankspace.xhtml.defaultElementID = this.id;
					
					nsFreshcare.systemadmin.requestSearch.send({
						show: false,
						xhtmlElementID: 'ns1blankspaceUpdateColumn1'
						});
				});

			},

	requestSearch: 
	{
		send: function(oParam, oResponse)
			{	// Area to use for ad-hoc advanced searches

				var sXHTMLElementId = 'ns1blankspaceUpdateColumn1';
				var bGoTo = false;
				var fOpen = '';
				var aFields = [];
				var iFilterCount = 0;
				var oNewPageParam = {};			// populate this when new page functionality required
				var aFiltersHTML = [];

				/*oNewPageParam = {
									endpoint: "core",
									method: "CORE_ATTACHMENT_SEARCH",
									name: "createddate",
									multiRows: false,
									sourceName: "ns1blankspace.systemadmin.listAuditAttachments",
									compareColumn: "objectcontext",
									extraColumns: {
													columns: 
													[
														{
															name: 'report', title: 'Audit report', 
															filters:
															[
																{name: "type", comparison: "EQUAL_TO", value1: "237"}
															]
														}
													]
												  },
									moreFilters: {
													filters: 
													[
														{name: "object", comparison: "EQUAL_TO", value1: giObjectAudit, value2: ""},
														{name: "type", comparison: "IN_LIST", value1: "237", value2: ""}
													]
												}
								};
								*/
								
				if (oParam != undefined)
				{
					if (oParam.xhtmlElementID != undefined) {sXHTMLElementId = oParam.xhtmlElementID}
					if (oParam.goTo != undefined) {bGoTo = oParam.goTo}
					if (oParam.fields != undefined) {aFields = oParam.fields.split(',')}
				}	
				else 
				{
					oParam = {}
				}

				/*if (bGoTo)
				{	
					if (iObject == giObjectAudit)
					{	fOpen = 'interfaceHomeOptionsAuditTasksGoTo(sXHTMLElementId)';		}
					else if (iObject == giObjectBusiness)
					{	fOpen = 'interfaceHomeOptionsBusinessTasksGoTo(sXHTMLElementId)';		}
					else if (iObject == giObjectOpportunity)
					{	fOpen = 'interfaceHomeOptionsQuoteTasksGoTo(sXHTMLElementId)';		}
					else if (iObject == giObjectIssue)
					{	fOpen = 'interfaceHomeOptionsIssueTasksGoTo(sXHTMLElementId)';		}
				}*/
				
				// v4.0.015 no longer processes applytosubsearch
				var aHTML = [];
				
				aHTML.push('<table id="ns1blankspaceSystemAdminSearchCriteria"><tr><td class="ns1blankspace">Method</td>' + 
							'<td><input id="ns1blankspaceHomeTestMethod" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Fields</td>' + 
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea style="width: 100%;" rows="5" cols="35" id="ns1blankspaceHomeTestFields" class="ns1blankspaceTextMulti"></textarea>' +
							'</td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Rows</td>' + 
							'<td><input id="ns1blankspaceHomeTestRows" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Filters</td><td><span id="ns1blankspaceHomeFilterAdd">Add Filter</span><span id="ns1blankspaceHomeFilterClear">Clear Filter</span></td></tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Name</td>' + 
							'<td><input id="ns1blankspaceHomeTestFilterName" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Comparison</td>' + 
							'<td><input id="ns1blankspaceHomeTestFilterComparison" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Value1</td>' + 
							'<td><input id="ns1blankspaceHomeTestFilterValue1" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Value2</td>' + 
							'<td><input id="ns1blankspaceHomeTestFilterValue2" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace">Value3</td>' + 
							'<td><input id="ns1blankspaceHomeTestFilterValue3" class="ns1blankspaceText"></td><tr>');
				
				aHTML.push('<tr><td class="ns1blankspace" id="ns1blankspaceHomeFiltersList" colspan=2"></td>' + 
							'<tr>');

				aHTML.push('<tr><td><span id="ns1blankspaceHomeTestRun">Run</span></td><td class="ns1blankspace ns1blankspaceImportant" id="ns1blankspaceHomeFiltersErrors" colspan=2"></td>' + 
							'<tr>');
							
				aHTML.push('</table>');
				
				aHTML.push('<table id="ns1blankspaceSystemAdminSearchUpdate"><tr><td><span id="ns1blankspaceSearchUpdateRows" style="align:right;"><span></td></tr></table>');
				
				aHTML.push('<table id="ns1blankspaceSystemAdminSearchResults"><tr><td id="ns1blankspaceSystemAdminSearchResultsRows"></td></tr></table>');
				
				$('#' + sXHTMLElementId).html(aHTML.join(''));
				
				$('#ns1blankspaceSystemAdminSearchUpdate')
					.hide()
					.button(
						{	label: "Update Rows" })
					.click(function() 
					{
						var fUpdateRows = oParam.functionUpdateRows
						fUpdateRows();
					});
					
				$('#ns1blankspaceSystemAdminSearchResults').hide();
				
				oParam.originalXHTMLElementId = oParam.xhtmlElementId;
				oParam.xhtmlElementId = "ns1blankspaceSystemAdminSearchResultsRows";
				
				if (nsFreshcare.systemadmin.params) 
				{
					if (nsFreshcare.systemadmin.params.method) { $('#ns1blankspaceHomeTestMethod').val(nsFreshcare.systemadmin.params.method)}
					if (nsFreshcare.systemadmin.params.fields) { $('#ns1blankspaceHomeTestFields').val(nsFreshcare.systemadmin.params.fields)}
					if (nsFreshcare.systemadmin.params.filters) 
					{ 	
						iFilterCount += 1;

						$.each(nsFreshcare.systemadmin.params.filters, function() 
						{
							aFiltersHTML.push('<tr><td id="filterRemove_' + iFilterCount + '"" class="1blankspaceSystemAdminFilterRemove"></td>' +
											'<td id="filterItem_' + iFilterCount + '" data-filter="' + this + '">' + this.replace(/\^/g, " ") + '</td></tr>');
						});

						if (aFiltersHTML.length > 0)
						{
							aFiltersHTML.unshift('<table id="1blankspaceSystemAdminFilters">');
							aFiltersHTML.push('</table>');
						}
						$('#ns1blankspaceHomeFiltersList').html(aFiltersHTML.join(''));
						$('.1blankspaceSystemAdminFilterRemove')
						.button(
						{	icons: 
							{
								primary: 'ui-icon-cancel'
							}
						})
						.click(function(event)
						{
							$(this).parent().remove();
							//nsFreshcare.systemadmin.requestSearch.removeFilter(this.id);
							iFilterCount -= 1;
						});
					}
					if (nsFreshcare.systemadmin.params.rows) { $('#ns1blankspaceHomeTestRows').val(nsFreshcare.systemadmin.params.rows)}
				}
				
				$('#ns1blankspaceHomeFilterAdd')
					.button({label: 'Add'})
					.click(function() 
					{
						var sFilter = '';
						var aFilterHTML = [];
						gbOkToSave = true;
						$('#ns1blankspaceHomeFiltersErrors').html('');
						
						if ($('#ns1blankspaceHomeTestFilterName').val() == '') {
							$('#ns1blankspaceHomeFiltersErrors').html($('#ns1blankspaceHomeFiltersErrors').html() + 'Name must be specified<br />');
							gbOkToSave = false;
						}
						
						if ($('#ns1blankspaceHomeTestFilterComparison').val() == '') {
							$('#ns1blankspaceHomeFiltersErrors').html($('#ns1blankspaceHomeFiltersErrors').html() + 'Comparison must be specified<br />');
							gbOkToSave = false;
						}
						
						if (gbOkToSave) 
						{
							sFilter =  $('#ns1blankspaceHomeTestFilterName').val() + 
																	 '^^' + $('#ns1blankspaceHomeTestFilterComparison').val().toUpperCase() + 
																	 '^^' + $('#ns1blankspaceHomeTestFilterValue1').val() + 
																	 '^^' + $('#ns1blankspaceHomeTestFilterValue2').val() +
																	 '^^' + $('#ns1blankspaceHomeTestFilterValue3').val();
							aFilterHTML.push('<tr><td id="filterRemove_' + iFilterCount + '"" class="1blankspaceSystemAdminFilterRemove"></td>' + 
																		'<td id="filterItem_' + iFilterCount + '" data-filter="' + sFilter + '">' + sFilter.replace(/\^/g, " ") + '</td></tr>');
							if ($('#1blankspaceSystemAdminFilters').is('*') && $('#1blankspaceSystemAdminFilters').children().children().length > 0)
							{
								$('#1blankspaceSystemAdminFilters')
									.children().children().last().after(aFilterHTML.join(''));
							}
							else
							{
								aFilterHTML.unshift('<table id="1blankspaceSystemAdminFilters">');
								aFilterHTML.push('</table>');
								$('#ns1blankspaceHomeFiltersList').html(aFilterHTML.join(''));
							}

							$('#ns1blankspaceHomeTestFilterName').val('');
							$('#ns1blankspaceHomeTestFilterComparison').val('');
							$('#ns1blankspaceHomeTestFilterValue1').val('');
							$('#ns1blankspaceHomeTestFilterValue2').val('');
							$('#ns1blankspaceHomeTestFilterValue3').val('');
							
							$('.1blankspaceSystemAdminFilterRemove')
							.button(
							{	icons: 
								{
									primary: 'ui-icon-cancel'
								}
							})
							.click(function(event)
							{
								$(this).parent().remove();
								//nsFreshcare.systemadmin.requestSearch.removeFilter(this.id);
								iFilterCount -= 1;
							});
							iFilterCount+= 1;
						}
						
					});
				
				$('#ns1blankspaceHomeFilterClear')
					.button({label: 'Clear'})
					.click(function() 
					{
						$('#ns1blankspaceHomeFiltersList').html('');
					});
				
				$('#ns1blankspaceHomeTestRun')
					.button({label: 'Run'})
					.click(function() {
					
						gbOkToSave = true;
						$('#ns1blankspaceHomeFiltersErrors').html('');

						if ($('#ns1blankspaceHomeTestMethod').val() == '') {
							$('#ns1blankspaceHomeFiltersErrors').html($('#ns1blankspaceHomeFiltersErrors').html() + 'Method must be specified<br />');
							gbOkToSave = false;
						}
						if ($('#ns1blankspaceHomeTestFields').val() == '') {
							$('#ns1blankspaceHomeFiltersErrors').html($('#ns1blankspaceHomeFiltersErrors').html() + 'Fields must be specified<br />');
							gbOkToSave = false;
						}
						
						if (gbOkToSave) {
							
							nsFreshcare.systemadmin.params = {};
							oParam.fields = $('#ns1blankspaceHomeTestFields').val();
							nsFreshcare.systemadmin.params.fields = $('#ns1blankspaceHomeTestFields').val();
							nsFreshcare.systemadmin.params.method = $('#ns1blankspaceHomeTestMethod').val();
							nsFreshcare.systemadmin.params.rows = ($('#ns1blankspaceHomeTestRows').val() != "") ? $('#ns1blankspaceHomeTestRows').val() : 20;
							nsFreshcare.systemadmin.params.filters = $.map($('#1blankspaceSystemAdminFilters [data-filter]'), function(x) {return $(x).attr('data-filter')});
							
							/*$.each(nsFreshcare.systemadmin.params.filters, function(a) 
							{
								var aFilter = this.split('</span>');
								
								a = aFilter[aFilter.length - 1];
							});*/
							
							if (oNewPageParam) 
							{
								oParam.newPageParam = oNewPageParam;
								nsFreshcare.systemadmin.params.newPageParam = oNewPageParam;
							}
							
							$('#ns1blankspaceSystemAdminSearchCriteria').hide();
							if (oParam.functionUpdateRows)
							{
								$('#ns1blankspaceSystemAdminSearchUpdate').show();
							}
							$('#ns1blankspaceSystemAdminSearchResults').show();
							
							var oSearch = new AdvancedSearch();
							oSearch.method = $('#ns1blankspaceHomeTestMethod').val().toUpperCase();
							oSearch.addField($('#ns1blankspaceHomeTestFields').val());
							oSearch.addSummaryField('count(*) resultcount');
							if ($('#ns1blankspaceHomeFiltersList').html() != '') 
							{
								var aFilters = $.map($('#1blankspaceSystemAdminFilters [data-filter]'), function(x) {return $(x).attr('data-filter')});
							
								$.each(aFilters, function() 
								{
									var sFilter = this;
									var aThisFilter = sFilter.split('^^');
									var sValue1 = (aThisFilter.length > 2) ? aThisFilter[2]: undefined;
									var sValue2 = (aThisFilter.length > 3) ? aThisFilter[3]: undefined;
									var sValue3 = (aThisFilter.length > 4) ? aThisFilter[4]: undefined;
									if (aThisFilter[0] != '') {
									
										oSearch.addFilter(aThisFilter[0], aThisFilter[1].toUpperCase(), sValue1, sValue2, sValue3);
									}
								});
							}
							oSearch.rows = ($('#ns1blankspaceHomeTestRows').val() != "") ? $('#ns1blankspaceHomeTestRows').val() : 20;
							oSearch.rf = 'JSON';
							oSearch.getResults(function(oResponse) {nsFreshcare.systemadmin.requestSearch.show(oParam, oResponse)});
						}
					});
				},
				
		show: 	function(oParam, oResponse)
				{
					var sXHTMLElementId = 'ns1blankspaceUpdateColumn1';
					var bGoTo = false;
					var fOpen = '';
					var aFields = [];
					var iFilterCount = 0;
					var sFunctionNewPage;
					var oNewPageParam;


					if (oParam != undefined)
					{
						if (oParam.xhtmlElementId != undefined) {sXHTMLElementId = oParam.xhtmlElementId}
						if (oParam.goTo != undefined) {bGoTo = oParam.goTo}
						if (oParam.fields != undefined) {aFields = oParam.fields.split(',')}
						if (oParam.newPageParam != undefined) {oNewPageParam = oParam.newPageParam}
					}	
					else 
					{
						oParam = {}
					}

					var aHTML = [];
					
					if (oResponse.status === 'OK')
					{

						if (oResponse.data.rows.length == 0)
						{
							aHTML.push('<table id="tableHomeOption" class="interfaceMasterHomeOptions">');
							aHTML.push('<tbody>');
							aHTML.push('<tr class="ns1blankspaceCaption">' +
											'<td class="ns1blankspaceRowNothing">No records.</td></tr>');
							aHTML.push('</tbody></table>');

							$('#' + sXHTMLElementId).html(aHTML.join(''));
						
						}
						else
						{
							aHTML.push('<table id="tableHomeOption">');
							
							aHTML.push('<tbody>');
							aHTML.push('<tr class="interfaceHomeOptionCaption">');
							$.each(aFields, function() {
								
								aHTML.push('<td class="interfaceHomeOptionCaption">' + this + '</td>');
							} );
							
							if (oNewPageParam.extraColumns && oNewPageParam.extraColumns.columns && oNewPageParam.extraColumns.columns.length > 0)
							{
								$.each(oNewPageParam.extraColumns.columns, function()
								{
									aHTML.push('<td class="interfaceHomeOptionCaption">' + this.title + '</td>');
								});
							}
							aHTML.push('<td class="interfaceHomeOptionCaptionOptions">&nbsp;</td>');
							aHTML.push('</tr>');

							$.each(oResponse.data.rows, function()	{
								aHTML.push(nsFreshcare.systemadmin.requestSearch.row(this, oParam));
							});
							
							aHTML.push('</tbody></table>');

							if (oNewPageParam)
							{	
								sFunctionNewPage = 
									/*'interfaceMasterHomeOptionsNewPage({' + */
									oNewPageParam.sourceName + '({' +
											'sourceName: "' + oNewPageParam.sourceName + '", ' + 
											'endpoint: "' + oNewPageParam.endpoint + '", ' +
											'method: "' +  oNewPageParam.method + '", ' + 
											'name: "' + oNewPageParam.name + '", ' + 
											'compareColumn: "' + oNewPageParam.compareColumn + '", ' + 
											'columnContext: "NewPage", ' + 
											'xhtmlContext: "HomeOption"';
									
									if (oNewPageParam.moreFilters) 
									{
										sFunctionNewPage += ', moreFilters: {filters: [';
										var aMoreFilters = [];
										
										$.each(oNewPageParam.moreFilters.filters, function() {
												aMoreFilters.push('{' +
													'name: "' + this.name + '", ' +
													'comparison: "' + this.comparison + '", ' +
													'value1: "' + this.value1 + '", ' +
													'value2: "' + this.value2 + '"' +
												'} ');
										});
										
										sFunctionNewPage += aMoreFilters.join(',') + ']}';
									}
									sFunctionNewPage +=	'})';
							}
							
							ns1blankspace.render.page.show(
							{
								xhtmlElementID: sXHTMLElementId,
								xhtmlContext: "HomeOption",
								xhtml: aHTML.join(''),
								showMore: (oResponse.morerows == "true"),
								more: oResponse.moreid,
								type: 'JSON',
								rows: ((nsFreshcare.systemadmin.params && nsFreshcare.systemadmin.params.rows) ? nsFreshcare.systemadmin.params.rows : giReturnRows),
								functionShowRow: nsFreshcare.systemadmin.requestSearch.row,
								functionNewPage: sFunctionNewPage
							}); 	
							
							/*if (oNewPageParam)
							{
								oNewPageParam.columnContext = "NewPage";
								oNewPageParam.xhtmlContext = "HomeOption";
								//interfaceMasterHomeOptionsNewPage(oNewPageParam);	
								ns1blankspace.systemadmin.listAuditAttachments(oNewPageParam);
							}*/
							
						}
					}
				
				},
				
		row: function(oRow, oParam)
				{
						var aHTML = [];
						var bShowSeparators = false;
						var sSeparator = (bShowSeparators)?"|":"";
						var sEoL = (bShowSeparators)?"^^":"";
						var sContext = "HomeOption";
						if (oParam) 
						{
							if (oParam.fields) 
							{
								var aCols = oParam.fields.split(',');
							}
						}
						else
						{
							var aCols = $.map($('td.interface' + sContext + 'Caption:visible'), function(a) {return $(a).html()});
						}
						
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						$.each(aCols, function() 
						{
							aHTML.push('<td id="tdHomeOption-' + this.replace(/\./g, '_') +'-' + oRow.id + '" class="ns1blankspaceRow" data-columnName="' + this + '">' +
												oRow[this] + sSeparator + '</td>');
						});
						
						if (nsFreshcare.systemadmin.params.newPageParam)
						{
							if (nsFreshcare.systemadmin.params.newPageParam.extraColumns && nsFreshcare.systemadmin.params.newPageParam.extraColumns.columns && nsFreshcare.systemadmin.params.newPageParam.extraColumns.columns.length > 0)
							{
								$.each(nsFreshcare.systemadmin.params.newPageParam.extraColumns.columns, function() 
								{
									aHTML.push('<td id="tdHomeOption_' + this.name + '-' + oRow.id + '" class="ns1blankspaceRow interfaceHomeNewPage" data-columnName="NewPage">&nbsp;' +
														 '</td>');
									
								});
							}
							else
							{
								aHTML.push('<td id="tdHomeOption_NewPage-' + oRow.id + '" class="ns1blankspaceRow interfaceHomeNewPage" data-columnName="NewPage">&nbsp;' +
													 '</td>');
							}
						}
						
						aHTML.push('<td id="tdHomeOption-' + oRow.id + '" class="ns1blankspaceRowOptionsSelect' + sContext + '">&nbsp;</td>');
						
						aHTML.push('</tr>');
						
						return aHTML.join('');
				},
				
		removeFilter: 	function(sXHTMLElementId)
				{
					var aFiltersList = $('#ns1blankspaceHomeFiltersList').html().split('<br>');
					var sRemoveRow = sXHTMLElementId.split('_')[1];
					var iCurrentRow = 0;
					var aNewList = [];
					
					$.each(aFiltersList, function()
					{
						if (iCurrentRow != parseInt(sRemoveRow))
						{
							aNewList.push(this);
						}
					});
					
					$('#ns1blankspaceHomeFiltersList').html(aNewList.join('<br />'));
				}
		
	}			
}


