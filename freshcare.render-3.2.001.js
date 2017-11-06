/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.render = 
{
	form:
	{
		init: function(oParam)
		{
			ns1blankspace.app.reset();

			ns1blankspace.object = ns1blankspace.data.render.object;	
			ns1blankspace.objectName = ns1blankspace.data.render.objectName;
			ns1blankspace.objectParentName = ns1blankspace.data.render.objectParentName;
			ns1blankspace.objectMethod = ns1blankspace.data.render.objectMethod;
			ns1blankspace.viewName = ns1blankspace.data.render.viewName;	

			ns1blankspace.objectContextData = undefined;
			ns1blankspace.objectContext = -1;

			if ($.type(ns1blankspace.data.render.postInit) == 'function')
			{
				ns1blankspace.data.render.postInit(oParam);
			}
			
			oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", ns1blankspace.data.render.rootNamespace);
			oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", ns1blankspace.data.render.rootNameSpaceText);
			ns1blankspace.app.set(oParam);

		},

		getRenderObject: function()
		{
			var sParentNamespace = ns1blankspace.objectParentName;
			var sNamespace = ns1blankspace.objectName;
			var oRoot = (ns1blankspace.data.render.rootNamespace ? ns1blankspace.data.render.rootNamespace : ns1blankspace);
					
			if (sNamespace)
			{
				if (sParentNamespace)
				{
					var oNS = oRoot[sParentNamespace][sNamespace];
				}
				else
				{
					var oNS = oRoot[sNamespace];
				}
				return oNS['render'];
			}
		},

		processSearchObject: function(oSearchParms)
		{
			var oSearch = new AdvancedSearch();
			var sSortColumn = ns1blankspace.util.getParam(oSearchParms, 'sortColumn').value;
			var sSortDirection = ns1blankspace.util.getParam(oSearchParms, 'sortDirection').value

			if (oSearchParms)
			{
				oSearch.method = (oSearchParms.objectMethod ? oSearchParms.objectMethod : ns1blankspace.objectMethod + '_SEARCH');		
				oSearch.addField(oSearchParms.fields);

				if (oSearchParms.filters)
				{
					$.each(oSearchParms.filters, function()
					{
						if (this.operatorBefore) {oSearch.addOperator(this.operatorBefore)}
						if (this.bracketBefore) {oSearch.addBracket(this.bracketBefore)}

						oSearch.addFilter(this.name, this.comparison, this.value1, this.value2, this.value4, this.applyToSubSearchJoin)

						if (this.bracketAfter) {oSearch.addBracket(this.bracketAfter)}
						if (this.operatorAfter) {oSearch.addOperator(this.operatorAfter)}
					});
				}

				if (oSearchParms.customOptions)
				{
					$.each(oSearchParms, function()
					{
						oSearch.addCustomOption(this.name, this.value);
					});
				}

				if (oSearchParms.sorts)
				{
					$.each(oSearchParms.sorts, function()
					{
						oSearch.sort(this.name, this.direction);
					});
				}
				else if (sSortColumn)
				{
					oSearch.sort(sSortColumn, (sSortDirection ? sSortDirection : 'asc'));
				}
				
				oSearch.rows = (oSearchParms.rows ? oSearchParms.rows : 20);
				oSearch.rf = (oSearchParms.rf ? oSearchParms.rf : 'JSON');
			}

			return oSearch;
		},

		home: function(oParam, oResponse)
		{
			var oObject = ns1blankspace.util.getParam(oParam, 'renderObject', {'default': {}}).value;
			var oHome = ns1blankspace.util.getParam(oObject, 'home', {'default': {}}).value;
			var aControllers = ns1blankspace.util.getParam(oHome, 'control', {'default': []}).value;
			var oSearchParms = ns1blankspace.util.getParam(oHome, 'search', {'default': {}}).value;
			var oDisplay = ns1blankspace.util.getParam(oHome, 'display', {'default': {}}).value;
			var fFunctionShow = ns1blankspace.util.getParam(oHome, 'functionShow', {'default': nsFreshcare.render.form.home}).value;
			var sSortColumn;
			var sSortDirection;
			var oSortDefaults;

			if (oDisplay && oDisplay.sortHeaders === true)
			{
				oSortDefaults = $.grep(oDisplay.columns, function(x) {return x.defaultSort != undefined}).shift();
			}
			sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': (oSortDefaults ? oSortDefaults.name : 'modifieddate')}).value;
			sSortDirection = ns1blankspace.util.getParam(oParam, 
												'sortDirection', 
												{'default': (oSortDefaults ? (oSortDefaults.defaultSortDirection ? oSortDefaults.defaultSortDirection : 'desc') : 'desc')}).value;
			
			var aHTML = [];

			if (oResponse == undefined)
			{
				var aHTML = [];
							
				aHTML.push('<table class="ns1blankspaceMain">');
				aHTML.push('<tr class="ns1blankspaceMain">' +
								'<td id="ns1blankspaceHome" class="ins1blankspaceMain">' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								'</tr>');
				aHTML.push('</table>');					
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				var aHTML = [];
							
				aHTML.push('<table>');

				aHTML.push('<tr><td></td></tr>');
						
				if (aControllers && aControllers.length > 0)
				{
					$.each(aControllers, function()
					{
						aHTML.push('<tr class="ns1blankspaceControl">' +
									'<td id="ns1blankspaceControl' + this.name + '" class="ns1blankspaceControl" style="padding-top: 15px;">' + this.label + '</td>' +
									'</tr>');			
					});
				}

				aHTML.push('</table>');		
				
				$('#ns1blankspaceControl').html(aHTML.join(''));	
				
				if (aControllers && aControllers.length > 0)
				{
					$.each(aControllers, function(index, row)
					{
						$('#ns1blankspaceControl' + row.name).click(function(event)
						{	// v3.1.1 Was erroring as had this.onClick
							row.onClick(oParam);
						});
					});
				}
					
				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				
				if (oSearchParms)
				{
					var oSearch = nsFreshcare.render.form.processSearchObject($.extend({sortColumn: sSortColumn, sortDirection: sSortDirection}, oSearchParms));

					oSearch.getResults(function(oResponse) 
					{
						if (oResponse.status == 'OK')
						{
							fFunctionShow(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error("There was an error: " + oResponse.error.errornotes);
						}
					});	
				}
				else
				{
					ns1blankspace.status.error('There\'s a problem searching - no search parameters passed to Home. Please contact support');
				}
			}
			else
			{
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table id="ns1blankspaceHome">' +
									'<tr><td class="ns1blankspaceNothing">' + (oDisplay.textOnNew ? oDisplay.textOnNew : 'Click New to create a new record.') + '</td></tr>' +
									'</table>');
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="' + oDisplay.columns.length + '">' + (oDisplay.titleText ? oDisplay.titleText : 'MOST LIKELY.') + '</td></tr>');
					aHTML.push('<tr>');

					$.each(oDisplay.columns, function()
					{
						aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort" style="vertical-align: bottom;' + (this.style ? this.style : '') + '"');

						if (oDisplay.sortHeaders === true)
						{
							aHTML.push(' data-column="' + this.column + '"' +
										' data-sortdirection="' + ((sSortColumn == this.column) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"');
						}

						aHTML.push('>' + this.label + '</td>');
					});
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function(i, row)
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						if (oDisplay.columns)
						{
							$.each(oDisplay.columns, function()
							{
								aHTML.push('<td id="ns1blankspaceHome_' + this.name + '-' + row.id + 
														'" class="ns1blankspaceMostLikely"' +
														(this.style ? ' style="' + this.style + '"' : '') +
														'>' + row[this.column].formatXHTML() +
														'</td>');
							})
						}
						
						aHTML.push('</tr>');
					});
					
					aHTML.push('</table>');
				}
				
				$('#ns1blankspaceHome').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function()
				{
					var fFunctionClick = oDisplay.onClick;
					oParam.xhtmlElementID = this.id;
					fFunctionClick(oParam);
				});

				if (oDisplay.sortHeaders === true)
				{
					$('.ns1blankspaceHeaderSort')
						.css('cursor', 'pointer')
						.click(function()
						{
							oParam.sortColumn = $(this).attr('data-column');
							oParam.sortDirection = $(this).attr('data-sortdirection');

							nsFreshcare.render.form.home(oParam);
						});
				}
			}

		},

		search:
		{
			send: function(sXHTMLElementId, oParam)
			{
				if ($.type(sXHTMLElementId) === 'object') {oParam = sXHTMLElementId; sXHTMLElementId = oParam.xhtmlElementID}
				var aSearch = sXHTMLElementId.split('-');
				var sElementId = aSearch[0];
				var sSearchContext = ns1blankspace.util.getParam(oParam, 'searchContext', {'default': aSearch[1]}).value;
				var iMinimumLength = ns1blankspace.util.getParam(oParam, 'minimumLength', {'default': 0}).value;
				var iSource = ns1blankspace.util.getParam(oParam, 'source', {'default': ns1blankspace.data.searchSource.text}).value;
				var sSearchText = ns1blankspace.util.getParam(oParam, 'searchText').value;
				var iMaximumColumns = ns1blankspace.util.getParam(oParam, 'maximumColumns', {'default': '1'}).value;
				var iRows = ns1blankspace.util.getParam(oParam, 'rows', {'default': 20}).value;
				
				var oObject = $.extend({}, nsFreshcare.render.form.getRenderObject());
				var fFunctionShow = ns1blankspace.util.getParam(oObject.search.rowParameters, 'functionShow', {'default': nsFreshcare.render.form.show}),value;
				
				if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
				{
					$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
					
					ns1blankspace.objectContext = sSearchContext;
					
					var oSearch = nsFreshcare.render.form.processSearchObject(oObject.search.rowParameters);

					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
					oSearch.getResults(function(oResponse) 
					{
						if (oResponse.status == 'OK')
						{
							fFunctionShow(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error("There was an error: " + oResponse.error.errornotes);
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
						sSearchText = aSearch[1];
						if (sSearchText == '#') {sSearchText = '[0-9]'}
						sElementId = 'ns1blankspaceViewBrowse';
					}
					
					if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
					{
						ns1blankspace.search.start();
						var oSearchParms = $.extend({}, oObject)
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_PERSON_SEARCH';
						oSearch.addField('firstname,surname');
						
						if (iSource == ns1blankspace.data.searchSource.browse)
						{
							oSearch.addFilter('quicksearch', 'TEXT_STARTS_WITH', sSearchText);
						}
						else
						{	
							var aSearchText = sSearchText.split(' ');

							if (aSearchText.length > 1)
							{
								oSearch.addFilter('firstname', 'TEXT_STARTS_WITH', aSearchText[0]);
								oSearch.addFilter('surname', 'TEXT_STARTS_WITH', aSearchText[1]);
							}
							else
							{
								oSearch.addBracket('(');
								oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sSearchText);
								oSearch.addOperator('or');
								oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSearchText);
								oSearch.addBracket(')');
							}
						}	
						
						ns1blankspace.search.advanced.addFilters(oSearch);

						oSearch.getResults(function(data) {nsFreshcare.admin.contactPerson.search.process(oParam, data)});
					}
				}	

			},

			process: function(oParam)
			{

			}
		},

		layout: function(oParam)
		{
			// v3.2.001 SUP023329 Now passed parameters to displsyCondition
			var aHTML = [];
			var oObject = ns1blankspace.util.getParam(oParam, 'renderObject', {'default': {}}).value;
			var aTabs = ns1blankspace.util.getParam(oObject, 'tabs').value;

			if (oObject != undefined && aTabs != undefined)
			{
				// First create controlling links on LHS
				aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
				
				aHTML.push('<table class="ns1blankspaceControl">');
				
				if (ns1blankspace.objectContext == -1)
				{
					$.each($.grep(aTabs, function(x) {return x.showOnNew === true}), function()
					{
						if (this.displayCondition == undefined
							||($.type(this.displayCondition) == 'boolean' && this.displayCondition == true)  
							|| ($.type(this.displayCondition) == 'function' && this.displayCondition(this.displayConditionParams) === true))
						{
							aHTML.push('<tr><td id="ns1blankspaceControl' + this.name + '" class="ns1blankspaceControl' + 
											((this.defaultOnNew === true) ? ' ns1blankspaceHighlight' : '') + '">' +
											this.label + '</td></tr>');
						}											
					});
				}
				else
				{
					$.each(aTabs, function()
					{
						if (this.displayCondition == undefined
							||($.type(this.displayCondition) == 'boolean' && this.displayCondition == true) 
							|| ($.type(this.displayCondition) == 'function' && this.displayCondition(this.displayConditionParams) === true))
						{
							aHTML.push('<tr><td id="ns1blankspaceControl' + this.name + '" class="ns1blankspaceControl' + 
											((this.defaultTab === true) ? ' ns1blankspaceHighlight' : '') + '">' +
											this.label + '</td></tr>');
							if (this.breakAfter === true)
							{
								aHTML.push('<tr><td>&nbsp;</td></tr>');
							}
						}											
					});
				}
						
				aHTML.push('</table>');					
					
				$('#ns1blankspaceControl').html(aHTML.join(''));
				
				// Now add divs
				aHTML = [];

				$.each(aTabs, function()
				{
					aHTML.push('<div id="ns1blankspaceMain' + this.name + '" class="ns1blankspaceControlMain"></div>');
				});				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				

				// Now bind each controller
				$.each(aTabs, function()
				{
					var oThisTab = this;
					$('#ns1blankspaceControl' + this.name).on('click', function()
					{
						var fFunctionClick = oThisTab.functionClick;
						if (oThisTab.functionClickParams)
						{
							fFunctionClick(oThisTab.functionClickParams);
						}
						else
						{
							fFunctionClick({renderObject: oThisTab});
						}
					});
				});				

			}
			else
			{
				ns1blankspace.status.error('Cannot display page - no object passed.')
			}
		},

		show: function(oParam)
		{
		},

		tabs: 
		{
			show: function(oParam)
			{
				// Check if we have to get the parameters
				if (oParam.name && oParam.renderObject === undefined)
				{
					var oObject = nsFreshcare.render.form.getRenderObject();
					var oTabObject = $.extend({}, $.grep(oObject.tabs, function(x) {return x.name === oParam.name}).shift());
					oParam = $.extend(oParam, {renderObject: oTabObject});
				}
				else
				{
					// v3.1.0i SUP022247 renderObject can sometimes be the namespace object, other times, it's the tab object
					if (oParam.renderObject && oParam.renderObject.tabs)
					{
						var oTabObject = $.extend({}, $.grep(oParam.renderObject.tabs, function(x) {return x.name === oParam.name}).shift());
					}
					else
					{
						var oTabObject = ns1blankspace.util.getParam(oParam, 'renderObject', {'default': {}}).value;
					}
				}

				var aFields = ns1blankspace.util.getParam(oTabObject, 'fields', {'default': []}).value;
				var aColumns = ns1blankspace.util.getParam(oTabObject, 'columns', {'default': []}).value;
				var oShowParameters = ns1blankspace.util.getParam(oTabObject, 'showParameters', {'default': {selector: '#ns1blankspaceMain' + oTabObject.name}}).value;
				var bInputFields = $.grep(aFields, function(x) {return x.type === ns1blankspace.option.typeInput}).length > 0;
				var bContinue = true;
				var aHTML = [];

				$('#ns1blankspaceControl' + oTabObject.name).addClass('ns1blankspaceHighlight');
				ns1blankspace.show(oShowParameters);

				if (aColumns.length === 0)
				{
					for (var i = 1; i < Math.max.apply(Math,aFields.map(function(o){return o.displayColumn;})); i++)
					{
						aColumns.push({id: i, class: "ns1blankspaceContainer"});
					}
				}

				if (aFields != undefined)
				{
					// If no input fields, must check we have data first					
					if (!bInputFields && ns1blankspace.objectContextData == undefined)
					{
						aHTML.push('<table><tr><td valign="top">Sorry can\'t find this ' + ns1blankspace.viewName + 
										'.</td></tr></table>');
								
						$('#ns1blankspaceMain' + oTabObject.name).html(aHTML.join(''));
						bContinue = false;
					}
					// We have input fields, let check / set data-loading
					else if (bInputFields && $('#ns1blankspaceMain' + oTabObject.name).attr('data-loading') == '1')
					{
						$('#ns1blankspaceMain' + oTabObject.name).attr('data-loading', '');
					}
					// We have input fields but we've already drawn the screen - do nothing more
					else if (bInputFields && $('#ns1blankspaceMain' + oTabObject.name).attr('data-loading') != '1')
					{
						bContinue = false;						
					}

					// We need to render the display
					if (bContinue)
					{
						aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">');
						
						// Draw the columns and add them to the appropriate Div
						$.each(oTabObject.columns, function()
						{
							aHTML.push('<td id="ns1blankspace' + oTabObject.name + 'Column' + this.id + '"' + 
											' class="' + this.class + '"' + 
											((this.style) ? ' style="' + this.style + '"': '') + 
										'></td>');
						});
						
						aHTML.push('</tr></table>');				
						
						$('#ns1blankspaceMain' + oTabObject.name).html(aHTML.join(''));	
					
						
						// Now add each of the fields, column by column
						$.each(aColumns, function()
						{
							var aHTML = [];
							var iColumn = this.id;

							aHTML.push('<table class="ns1blankspace">');
							
							// Display fields for the current column
							// v3.1.215 Added style
							$.each($.grep(aFields, function(x) {return x.displayColumn == iColumn}), function()
							{
								var oThisField = this;
								var bDisplay = ($.type(this.displayCondition) == 'function' ? this.displayCondition() : true);
								
								if (bDisplay)
								{
									// Input field
									if (oThisField.type == ns1blankspace.option.typeInput)
									{
										// Caption
										if (oThisField.label)
										{
											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															oThisField.label +
															'</td></tr>');
										}

										if (oThisField.inputType != "Radio" && oThisField.inputType.indexOf("TextMulti") == -1)
										{
											aHTML.push('<tr class="ns1blankspace">' +
													'<td class="ns1blankspace' + this.inputType + '">' +
													'<input id="ns1blankspace' + oTabObject.name + this.name + '"' +
														' class="ns1blankspace' + this.inputType + (this.extraClass ? ' ' + this.extraClass : '') + '"' +
														' data-caption="' + (this.caption ? this.caption : this.label) + '"');
									
											if (this.mandatory === true)
											{
												aHTML.push(' data-mandatory="1"');
											}
											if ($.type(this.method) === 'string')
											{
												aHTML.push(' data-method="' + this.method + '"');
											}
											if ($.type(this.methodFilter) === 'string')
											{
												aHTML.push(' data-methodFilter="' + this.methodFilter + '"');
											}
											if ($.type(this.columns) === 'string')
											{
												aHTML.push(' data-columns="' + this.columns + '"');
											}
											if ($.type(this.parent) === 'parent')
											{
												aHTML.push(' data-parent="' + this.parent + '"');
											}
											if ($.type(this.multiselect) === 'string')
											{
												aHTML.push(' data-multiselect="' + this.multiselect + '"');
											}
											if ($.type(this.onClick) === 'string')
											{
												aHTML.push(' data-click="' + this.onClick + '"');
											}
											if ($.type(this.style) === 'string')
											{
												aHTML.push(' style="' + this.style + '"');
											}

											aHTML.push('></td></tr>');	
										}
										
										// Radio input
										else if (oThisField.inputType == "Radio" && $.type(oThisField.radioOptions) === 'object')
										{
											var oOptions = oThisField.radioOptions;
											var aRadioHTML = [];

											aHTML.push('<tr class="ns1blankspace">' +
														'<td class="ns1blankspaceRadio' + (oThisField.extraClass ? ' ' + oThisField.extraClass : '') + '"' +
															(oThisField.mandatory === true ? ' data-mandatory="1' : '') + 
															' data-caption="' + (oThisField.caption ? oThisFeld.caption : oThisField.label) + '"' 
															+ 'id="ns1blankspace' + oTabObject.name + oThisField.name + '">');

											$.each(oOptions.values, function()
											{
												aRadioHTML.push('<input type="radio" id="radio' + oThisField.name + this.value + '"' +
																' name="radio' + oThisField.name + '"' +
																' value="' + this.value + '"' +
																(this['default'] == true ? ' checked="checked"' : '') +
																'>' + this.label);
											});
											aHTML.push(aRadioHTML.join(oOptions.separator) + '</td></tr>');
										}

										// Textarea input
										else if (oThisField.inputType.indexOf('TextMulti') > -1)
										{
											var iRows = (oThisField.inputType == "TextMulti") ? 10 : 5;

											aHTML.push('<tr class="ns1blankspace">' +
														'<td class="ns1blankspace' + oThisField.inputType + '">' + 
															'<textarea id="ns1blankspace' + oTabObject.name + oThisField.name + '"' +
															' class="ns1blankspace' + oThisField.inputType + (oThisField.extraClass ? ' ' + oThisField.extraClass : '') + '"' +
															(oThisField.mandatory === true ? ' data-mandatory="1' : '') + 
															' data-caption="' + (oThisField.caption ? oThisFeld.caption : oThisField.label) + '"' +
															' rows="' + iRows + '" cols="35"' + 
															'></textarea></td></tr>');
										}
									}

									// Display only field
									else if (oThisField.type == ns1blankspace.option.typeReadOnly)
									{
										// Caption
										if (oThisField.label)
										{
											aHTML.push('<tr class="ns1blankspaceCaption">' +
															'<td class="ns1blankspaceCaption">' +
															oThisField.label +
															'</td></tr>');
										}

										aHTML.push('<tr><td id="ns1blankspace' + oTabObject.name + oThisField.name + '"' +
														' class="ns1blankspaceReadOnly' +  + (oThisField.extraClass ? oThisField.extraClass : '') + '"' +
														(oThisField.style ? ' style="' + oThisField.style + '"' : '') + '>' +
													'</td></tr>');
									}

									// Buttons / actions
									else if (oThisField.type == ns1blankspace.option.typeButton)
									{
										aHTML.push('<tr><td id="ns1blankspace' + oTabObject.name + oThisField.name + '"' +
														'class="ns1blankspaceAction' + (oThisField.extraClass ? oThisField.extraClass : '') + '"' +
														(oThisField.style ? ' style="' + oThisField.style + '"' : '') + '>' +
															oThisField.label +
													'</td></tr>');
									}

									// Filler field - just insert passed html
									else if (oThisField.type == ns1blankspace.option.typeFiller)
									{
										aHTML.push(oThisField.html);
									}
								}
							});

							aHTML.push('</table>');

							// Now add the HTML to the column
							$('#ns1blankspace' + oTabObject.name + 'Column' + iColumn).html(aHTML.join(''));

							// Bind any date pickers
							if ($.grep(aFields, function(x) {return x.inputType === 'Date'}).length > 0 )
							{
								$('.ns1blankspaceDate').datepicker({ dateFormat: 'dd M yy' });
							}

							if ($.grep(aFields, function(x) {return x.inputType === 'DateTime'}).length > 0 )
							{
								$('.ns1blankspaceDate').datetimepicker(
								{ 
									dateFormat: 'dd M yy',
									timeFormat: 'h:mm TT',
									stepMinute: 5,
									ampm: true
								});

							}

							// And bind any actions
							$.each($.grep(aFields, function(x) {return x.type === ns1blankspace.option.typeButton && x.displayColumn == iColumn}), function(i, f)
							{
								$('#ns1blankspace' + oTabObject.name + f.name)
									.button((f.buttonOptions ? f.buttonOptions : {label: f.label}))
									.on('click', f.buttonClick);
								if (f.buttonStyles)
								{
									$.each(f.buttonStyles, function()
									{
										$('#ns1blankspace' + oTabObject.name + f.name).css(this.name, this.value);
									});
								}
							});
						});

						if (ns1blankspace.objectContextData)
						{
							nsFreshcare.render.form.tabs.fill(oParam);
						}
					}
				}		
			},

			fill: function(oParam)
			{
				var oTabObject = ns1blankspace.util.getParam(oParam, 'renderObject', {'default': {}}).value;
				var aFields = ns1blankspace.util.getParam(oTabObject, 'fields', {'default': []}).value;
				var bInputFields = ns1blankspace.util.getParam(oTabObject, 'inputFields', {'default': false}).value;
				var aColumns = ns1blankspace.util.getParam(oTabObject, 'columns', {'default': []}).value;

				// v3.1.215 Caters for when field not in objectContextData
				$.each(aFields, function() 
				{
					var oThisField = this;

					// Input field
					var sValue = ns1blankspace.objectContextData[oThisField.column] || '';
					if (oThisField.type == ns1blankspace.option.typeInput)
					{
						if (oThisField.inputType === 'Select')
						{
							var sTextValue = ns1blankspace.objectContextData[oThisField.column + 'text'] || '';
							$('#ns1blankspace' + oTabObject.name + oThisField.name).val(sTextValue.formatXHTML());
							$('#ns1blankspace' + oTabObject.name + oThisField.name).attr('data-id', (sValue == '' ? undefined : sValue));
						}

						else if (oThisField.inputType === 'Radio')
						{
							$('[name="radio' + oThisField.name + '"][value="' + sValue + '"]').attr('checked', true);
						}

						else
						{
							$('#ns1blankspace' + oTabObject.name + oThisField.name).val(sValue.formatXHTML());
						}
					}

					// Display only field
					else
					{
						if ($.type(this.column) == 'string')
						{
							$('#ns1blankspace' + oTabObject.name + oThisField.name).html((sValue == '' ? '&nbsp;' : sValue.formatXHTML()));
						}
						else if ($.type(this.column) == 'function')
						{
							$('#ns1blankspace' + oTabObject.name + oThisField.name).html(oThisField.column());
						}
					}
				});
			}
		},

		save:
		{
			validate: function(oParam)
			{
				// Here we validate mandatory fields on each tab..
				// It's done asynchronously so that independent validation functions can be called if they exist
				var oObject = ns1blankspace.util.getParam(oParam, 'renderObject', {'default': {}}).value;
				var aTabs = ns1blankspace.util.getParam(oObject, 'tabs', {'default': []}).value;
				var fFunctionSave = ns1blankspace.util.getParam(oObject, 'functionSave', {'default': nsFreshcare.render.form.save.send}).value;

				// Check if our oParam is valid - we should have tabs array, otherwise, we can't save
				if (aTabs.length > 0)
				{
					if (oParam.validateSaveStep === undefined) {oParam.validateSaveStep = 1}

					// Validate mandatory fields
					if (oParam.validateSaveStep == 1)
					{
						// v3.1.2 See which tab we're on so we can retur to it later
						oParam.visibleTab = $('.ns1blankspaceControlMain:visible').attr('id');

						// Loop through all tabs that have input fields
						$.each($.grep(aTabs, function(x) {return ((x.fields) ? $.grep(x.fields, function(y) {return y.type == ns1blankspace.option.typeInput}) : []).length > 0}), function(i, tab)
						{
							// Only validate if it's been rendered
							if ($('#ns1blankspaceMain' + tab.name).html() != "")
							{
								// Validate all mandatory input fields on this tab
								$.each($.grep(tab.fields, function(x) {return x.type === ns1blankspace.option.typeInput && x.mandatory == true}), function()
								{
									// make sure it's in the DOM (may have been conditional)
									if ($('#ns1blankspace' + tab.name + this.name).is('*'))
									{
										if (this.inputType != 'Select' && this.inputType != 'Radio')
										{
											if ($('#ns1blankspace' + tab.name + this.name).val() === "")
											{
												ns1blankspace.okToSave = false;
											}
										}

										else if (this.inputType == 'Radio')
										{
											if ($('input[name="radio' + tab.name + this.name + '"]:checked').val() === undefined)
											{
												ns1blankspace.okToSave === false;												
											}
										}

										else if (this.inputType == "Select")
										{
											if ($('#ns1blankspace' + tab.name + this.name).val() === ""
												|| $('#ns1blankspace' + tab.name + this.name).attr('data-id') === "" 
												|| $('#ns1blankspace' + tab.name + this.name).attr('data-id') === undefined
												)
												ns1blankspace.okToSave = false;
										}
										
										if (!ns1blankspace.okToSave)
										{
											ns1blankspace.status.error((this.caption ? this.caption : this.label) + " must be entered.");
										}
									}
									return ns1blankspace.okToSave;		// Quit from loop if error
								});
							}
							return ns1blankspace.okToSave;		// Quit from loop if error
						});

						oParam.validateSaveStep = (ns1blankspace.okToSave) ? 2 : 10;
						nsFreshcare.render.form.save.validate(oParam);
					}

					// Check tab-based custom validations
					else if (oParam.validateSaveStep === 2)
					{
						// Here we check if there are any additional tab validation functions and call them
						// All tab validation function must be asynchronous and callback onComplete
						// We pass oParam plus any function specific params to the function (in that order)
						var aTabValidations = $.grep(aTabs, function(x) {return x.functionValidate != undefined});
						if (aTabValidations.length > 0)
						{
							if (oParam.tabValidationIndex === undefined) {oParam.tabValidationIndex = 0}

							if (ns1blankspace.okToSave && oParam.tabValidationIndex < aTabValidations.length)
							{
								var oThisTab = aTabValidations[oParam.tabValidationIndex];

								oParam.onComplete = nsFreshcare.render.form.save.validate;
								oParam.tabValidationIndex += 1;
								
								oThisTab.functionValidate(oParam, (oThisTab.functionValidateParams ? oParam.functionValidateParams : undefined));
							}
							else
							{
								delete(oParam.tabValidationIndex);
								oParam.validateSaveStep = (ns1blankspace.okToSave) ? 10 : 3;
								nsFreshcare.render.form.save.validate(oParam);
							}
						}
						else
						{
							oParam.validateSaveStep = 3;
							nsFreshcare.render.form.save.validate(oParam);
						}

					}

					// Check form-based custom validations
					// We render each tab first to make sure the fields exist
					else if (oParam.validateSaveStep === 3)
					{
						// Here we check if there are any additional form validation functions and call them
						// Validation function must be asynchronous and callback onComplete
						// We pass oParam plus any function specific params to the function (in that order)

						if (oParam.formValidateFunction)
						{
							// First render all tabs with inputs not yet rendered
							$.each($.grep(aTabs, function(x) {return ((x.fields) ? $.grep(x.fields, function(y) {return y.type == ns1blankspace.option.typeInput}) : []).length > 0}), function(i, tab)
							{
								if ($('#ns1blankspaceMain' + tab.name).html() === "")
								{
									$('#ns1blankspaceControl' + tab.name).click();
								}
							});

							oParam.onComplete = nsFreshcare.render.form.save.validate;
							oParam.validateSaveStep = 10;
							oParam.formValidateFunction(oParam, (oParam.formValidateFunctionParams ? oParam.formValidateFunctionParams : undefined));
						}
						else
						{
							oParam.validateSaveStep = 10;
							nsFreshcare.render.form.save.validate(oParam);
						}
					}

					else if (oParam.validateSaveStep === 10)
					{
						delete(oParam.validateSaveStep);
						delete(oParam.onComplete);
						if (ns1blankspace.okToSave)
						{
							fFunctionSave(oParam);
						}
					}
				}
				else
				{
					ns1blankspace.status.error('There\'s a problem validating the data you\'ve entered. Please contact support.');
					ns1blankspace.okToSave = false;
				}
			},

			send: function(oParam)
			{
				var oObject = ns1blankspace.util.getParam(oParam, 'renderObject', {'default': {}}).value;
				var fFunctionValidate = ns1blankspace.util.getParam(oObject, 'functionValidate', {'default': nsFreshcare.render.form.save.validate}).value;
				var aTabs = ns1blankspace.util.getParam(oObject, 'tabs', {'default': []}).value;

				if (oParam.saveStep === undefined) {oParam.saveStep = 1}

				// Validate form
				if (oParam.saveStep === 1)	
				{
					ns1blankspace.okToSave = true;
					oParam.functionSave = nsFreshcare.render.form.save.send;
					oParam.saveStep = 2;
					nsFreshcare.render.form.save.validate(oParam);
				}

				// Save root data
				else if (oParam.saveStep == 2)
				{
					var oData = {};

					// Loop thru all tabs where save.root is true and save fields where column doesn't contain a '.'
					// Only save if it's been updated
					$.each($.grep(aTabs, function(x) {return x.save && x.save.root === true}), function(i, tab)
					{
						// Make sure the tab's been rendered
						if ($('#ns1blankspaceMain' + tab.name).html() == "")
						{
							var fFunctionClick = $.grep(aTabs, function(x) {return x.save && x.save.root === true})[i].functionClick;
							if (fFunctionClick) 
							{
								fFunctionClick({name: tab.name});
							}
						}

						if ($('#ns1blankspaceMain' + tab.name).html() != "")
						{
							// Only look at input fields for the root
							$.each($.grep(tab.fields, function(x) {return x.type === ns1blankspace.option.typeInput && x.column.split('.').length == 1}), function()
							{
								var sNewValue;

								// make sure field has been rendered (may have been conditional)
								if ($('#ns1blankspace' + tab.name + this.name).is('*'))
								{
									
									if (this.inputType != "Select" && this.inputType != 'Radio') 
									{
										sNewValue = $('#ns1blankspace' + tab.name + this.name).val();
										if (sNewValue != undefined 
											&& (ns1blankspace.objectContext === -1 
												|| sNewValue != ns1blankspace.objectContextData[this.column])
											)
										{ 	oData[this.column] = sNewValue;	}
									}

									else if (this.inputType == 'Select')
									{
										sNewValue = $('#ns1blankspace' + tab.name + this.name).attr('data-id');
										if (sNewValue != undefined 
											&& (ns1blankspace.objectContext === -1 
												|| sNewValue != ns1blankspace.objectContextData[this.column])
											)
										{
											oData[this.column] = sNewValue;
											oData[this.column + 'text'] = $('#ns1blankspace' + tab.name + this.name).val();
										}
									}

									else if (this.inputType == 'Radio')
									{
										sNewValue = $('input[name="radio'+ this.name + '"]:checked').val();
										if (sNewValue != undefined 
											&& (ns1blankspace.objectContext === -1 
												|| sNewValue != ns1blankspace.objectContextData[this.column])
											)
										{	oData[this.column] = sNewValue;}
									}
								}
							});
						}
					});

					// Only save if there's something to update
					if (Object.keys(oData).length > 0)
					{
						if (ns1blankspace.objectContext != -1) {oData.id = ns1blankspace.objectContext}

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI(oObject.objectMethod + '_MANAGE'),
							data: oData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message(oObject.label + " saved.")
									if (ns1blankspace.objectContext === -1)
									{
										oParam.newRecord = true;
										ns1blankspace.objectContext = oResponse.id;
									}
									// Update ns1blankspace.objectContextData with the saved data v3.1.0i SUP022247 but only if existing record
									else
									{
										$.each(oData, function(key, value)
										{
											ns1blankspace.objectContextData[key] = value;
										});
									}

									oParam.saveStep = 3;
									nsFreshcare.render.form.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error("There was a problem saving the " + oObject.label + ': ' + oResponse.error.errornotes);
								}
							}
						});
					}
					
					// Nothing to save on root - go to next step
					else
					{
						oParam.saveStep = 3;
						nsFreshcare.render.form.save.send(oParam);
					}
				}

				// Now save additional tabs
				else if (oParam.saveStep == 3)
				{
					// Here we check if there are any additional tab save functions and call them
					// All tab save function must be asynchronous and callback onComplete
					// We pass oParam plus any function specific params to the function (in that order)
					var aTabSaves = $.grep(aTabs, function(x) {return x.functionSave != undefined});
					if (aTabSaves.length > 0)
					{
						if (oParam.tabSaveIndex === undefined) {oParam.tabSaveIndex = 0}

						if (ns1blankspace.okToSave && oParam.tabSaveIndex < aTabSaves.length)
						{
							var oThisTab = aTabSaves[oParam.tabSaveIndex];

							oParam.onComplete = nsFreshcare.render.form.save.send;
							oParam.tabSaveIndex += 1;
							
							oThisTab.functionSave(oParam, (oThisTab.functionSaveParams ? oThisTab.functionSaveParams : undefined));
						}
						else
						{
							delete(oParam.tabSaveIndex);
							oParam.saveStep = (ns1blankspace.okToSave) ? 10 : 4;
							nsFreshcare.render.form.save.send(oParam);
						}
					}
					else
					{
						oParam.saveStep = 4;
						nsFreshcare.render.form.save.send(oParam);
					}
				}

				// Now any form based save functions
				else if (oParam.saveStep == 4)
				{
					// Here we check if there are any additional form save functions and call them
					// Save function must be asynchronous and callback onComplete
					// We pass oParam plus any function specific params to the function (in that order)

					if (oObject.functionSaveForm)
					{
						oParam.onComplete = nsFreshcare.render.form.save.send;
						oParam.saveStep = 10;
						oObject.functionSaveForm(oParam, (oObject.functionSaveFormParams ? oObject.functionSaveFormParams : undefined));
					}
					else
					{
						oParam.saveStep = 10;
						nsFreshcare.render.form.save.send(oParam);

					}
				}

				// Now finish up
				else if (oParam.saveStep === 10)
				{
					delete(oParam.saveStep);
					ns1blankspace.inputDetected = false;

					// Re-draw form if a new record
					if (oParam.newRecord != undefined)
					{
						if (oParam.newRecord === true)
						{
							var sNS = (oObject.rootNameSpaceText) ? oObject.rootNameSpaceText : "ns1blankspace";
							sNS = (oObject.objectParentName) ? sNS + '.' + oObject.objectParentName : sNS;
							sNS += '.' + oObject.objectName + '.init';

							var fFunctionInit = ns1blankspace.util.toFunction(sNS);
							fFunctionInit({id: ns1blankspace.objectContext});
						}
						else
						{
							delete(oParam.newRecord);
						}
					}
					else
					{
						// v3.1.2 now re-display the tab viewed previously
						if (oParam.visibleTab) 
						{
							$('#' + oParam.visibleTab.replace('Main', 'Control')).click()
						}
					}
				}
			},

		}
	}
}