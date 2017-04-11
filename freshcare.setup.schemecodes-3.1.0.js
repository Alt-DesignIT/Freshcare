/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

// This page allows users to set up the following code sets:
//
// Product Groups (Category)
// Audit Type
// Audit Status
// Audit Result Status
// CAR Severity
// CAR Types
// Subscription Status

$.extend(true, nsFreshcare.setup,
{
	schemecodes:
	{
		init: function (oParam) 
		{
			ns1blankspace.app.reset();
			ns1blankspace.viewName = 'Scheme Codes';	
			var oRootNameSpace = ns1blankspace.rootnamespace;

			$('#ns1blankspaceViewControlViewContainer').button(
			{
				label: 'Scheme Codes'
			});			

			// v3.1.0 Remoed CAR Types as now in separate file
			nsFreshcare.setup.schemecodes.setConfiguration = 
			[
				{
					name: 'Subscription Status',
					xhtmlContext: 'SubscriptionStatus',
					method: 'SETUP_AGRI_SUBSCRIPTION_STATUS',
					allowNew: (nsFreshcare.supportAdmin),
					allowDelete: false,
					allowEdit: (nsFreshcare.supportAdmin),
					advancedSearch: 
					{
						fields: 'reference,title,definition',
						sort:
						[
							{name: 'reference', direction: 'asc'}
						]
					},
					manage:
					{
						fields:
						[
							{
								name: 'reference',
								xhtmlContext: 'Reference',
								label: 'Code',
								type: 'Text',
								mandatory: false
							},
							{
								name: 'title',
								xhtmlContext: 'Title',
								label: 'Description',
								type: 'Text',
								mandatory: true
							},
							{
								name: 'definition',
								xhtmlContext: 'Definition',
								label: 'Definition',
								type: 'Text',
								mandatory: false
							}
						]
					}
				},
				{
					name: 'Category',
					xhtmlContext: 'ProductGroups',
					method: 'AGRI_PRODUCT_GROUP_CATEGORY',
					allowNew: (nsFreshcare.supportAdmin),
					allowDelete: false,
					allowEdit: (nsFreshcare.supportAdmin),
					advancedSearch: 
					{
						fields: 'title',
						sort:
						[
							{name: 'code', direction: 'asc'}
						]
					},
					manage:
					{
						fields:
						[
							/*{
								name: 'code',
								xhtmlContext: 'Code',
								label: 'Code',
								type: 'Text',
								mandatory: false
							},*/
							{
								name: 'title',
								xhtmlContext: 'Title',
								label: 'Description',
								type: 'Text',
								mandatory: true
							}
						]
					}
				},
				{
					name: 'Scope Options',
					xhtmlContext: 'ScopeOptions',
					method: 'SETUP_AGRI_SCOPE',
					allowNew: ['nsFreshcare', 'supportAdmin'],
					allowDelete: false,
					allowEdit: ['nsFreshcare', 'supportAdmin'],
					advancedSearch: 
					{
						fields: 'title',
						sort:
						[
							{name: 'title', direction: 'asc'}
						]
					},
					manage:
					{
						fields:
						[
							{
								name: 'title',
								xhtmlContext: 'Title',
								label: 'Description',
								type: 'Text',
								mandatory: true
							}
						]
					}
				},
				{
					name: 'Audit Types',
					xhtmlContext: 'AuditType',
					method: 'SETUP_AUDIT_TYPE',
					allowNew: (nsFreshcare.supportAdmin),
					allowDelete: false,
					allowEdit: (nsFreshcare.supportAdmin),
					manage: {}
				},
				{
					name: 'Audit Status',
					xhtmlContext: 'AuditStatus',
					method: 'SETUP_AUDIT_STATUS',
					allowNew: (nsFreshcare.supportAdmin),
					allowDelete: false,
					allowEdit: (nsFreshcare.supportAdmin),
					manage: 
					{
						fields:
						[
							{
								name: 'title',
								xhtmlContext: 'Title',
								label: 'Description',
								type: 'Text',
								mandatory: true
							}
						]
					}
				},
				{
					name: 'Audit Result Status',
					xhtmlContext: 'AuditResult Status',
					method: 'SETUP_AUDIT_RESULT_STATUS',
					allowNew: (nsFreshcare.supportAdmin),
					allowDelete: false,
					allowEdit: (nsFreshcare.supportAdmin),
					manage: {}
				},
				{
					name: 'CAR Severity',
					xhtmlContext: 'CARSeverity',
					method: 'SETUP_AUDIT_ISSUE_TYPE',
					allowNew: (nsFreshcare.supportAdmin),
					allowDelete: false,
					allowEdit: (nsFreshcare.supportAdmin),
					advancedSearch: {},
					manage: {}
				}
			]

			oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
			oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
			oParam = ns1blankspace.util.setParam(oParam, "namespace", "schemecodes");
			oParam = ns1blankspace.util.setParam(oParam, "parentNamespace", "setup");

			if (ns1blankspace.rootnamespacetext != 'nsFreshcare' && oRootNameSpace.setup && oRootNameSpace.setup.addSchemeCodes)
			{
				nsFreshcare.setup.schemecodes.setConfiguration.push(oRootNameSpace.setup.addSchemeCodes);
				if (oRootNameSpace.control.setupSchemeCodes)
				{
					oRootNameSpace.control.setupSchemeCodes();	
				}
			}
			nsFreshcare.setup.data = {};
			//nsFreshcare.setup.data.functionSetupHome = ns1blankspace.setup.home;
			//ns1blankspace.setup.home = nsFreshcare.setup.schemecodes.home;

			oParam.showHome = true;
			ns1blankspace.app.set(oParam);
			//nsFreshcare.setup.schemecodes.home(); 
		},

		home: function(oParam, oResponse)
		{
			var aHTML = [];
						
			// Show the home page - the alternative is when we have returned from searching in the viewport search
			if (oParam && oResponse === undefined)
			{
				$('#ns1blankspaceViewControlAction').button({disabled: true});
				$('#ns1blankspaceViewControlNew').button({disabled: true});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

				$('#ns1blankspaceMain').html('');

				var aHTML = [];

				aHTML.push('<table>');
				aHTML.push('<tr><td><div id="ns1blankspaceViewSchemeCodesLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');

				$.each(nsFreshcare.setup.schemecodes.setConfiguration, function(index, data)
				{
					aHTML.push('<tr class="ns1blankspaceControl">' +
								'<td style="padding-top:15px;" id="ns1blankspaceControl_' + index + '"' +
									' data-context="' + data.xhtmlContext + '"' + 
									' class="ns1blankspaceControl ns1blankspaceControlElement">' + data.name + '</td>' +
								'</tr>');

				});

				aHTML.push('</table>');		
				
				$('#ns1blankspaceControl').html(aHTML.join(''));

				$('.ns1blankspaceControlElement').on('click', function(event)
				{
					var oThisElement = this;
					var iIndex = oThisElement.id.split('_').pop();
					var oParam = nsFreshcare.setup.schemecodes.setConfiguration[iIndex];
					
					$('#ns1blankspaceMain').html(ns1blankspace.xhtml.loading);
					$('#ns1blankspaceMain').attr('data-loading', '1');

					nsFreshcare.setup.schemecodes.show(oParam);
				});

				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			}
			else
			{
				if (ns1blankspace.setup.method)
				{
					oParam = $.grep(nsFreshcare.setup.schemecodes.setConfiguration, function(x) {return x.method == ns1blankspace.setup.method}).shift();
					nsFreshcare.setup.schemecodes.show(oParam, oResponse);
				}
			}
		},

		show: function(oParam, oResponse)
		{
			var aHTML = [];

			if (oResponse === undefined)
			{
				// First, eval the booleans if necessary
				if ($.type(oParam.allowNew) === 'array')
				{
					var oEval = ns1blankspace.rootnamespace;
					$.each(oParam.allowNew, function(i, v)
					{
						if (i == 0)
						{
							if (v === 'nsFreshcare') {oEval = nsFreshcare;}
							else if (v === '') {oEval = ns1blankspace;}
						}
						else
						{
							if (oEval)
							{
								oEval = oEval[v];
							}
						}
					});
					if (oEval) {oParam.allowNew = oEval}
				}

				if ($.type(oParam.allowEdit) === 'array')
				{
					var oEval = ns1blankspace.rootnamespace;
					$.each(oParam.allowEdit, function(i, v)
					{
						if (i == 0)
						{
							if (v === 'nsFreshcare') {oEval = nsFreshcare;}
							else if (v === '') {oEval = ns1blankspace;}
						}
						else
						{
							if (oEval)
							{
								oEval = oEval[v];
							}
						}
					});
					if (oEval) {oParam.allowNew = oEval}
				}

				if ($.type(oParam.allowDelete) === 'array')
				{
					var oEval = ns1blankspace.rootnamespace;
					$.each(oParam.allowDelete, function(i, v)
					{
						if (i == 0)
						{
							if (v === 'nsFreshcare') {oEval = nsFreshcare;}
							else if (v === '') {oEval = ns1blankspace;}
						}
						else
						{
							if (oEval)
							{
								oEval = oEval[v];
							}
						}
					});
					if (oEval) {oParam.allowNew = oEval}
				}

				aHTML.push('<table class="ns1blankspace">');
				aHTML.push('<tr><td id="ns1blankspaceSchemeCodes">' +
								ns1blankspace.xhtml.loading + 
								'</td></tr></table>');					
				
				$('#ns1blankspaceMain').html(aHTML.join(''));

				ns1blankspace.setup.method = oParam.method;
				ns1blankspace.setup.searchParam = (oParam.advancedSearch) ? oParam.advancedSearch : {};

				if (oParam.advancedSearch != undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = oParam.method + '_SEARCH';

					oSearch.addField((oParam.advancedSearch.fields) ? oParam.advancedSearch.fields : 'title');

					if (oParam.advancedSearch.filters && oParam.advancedSearch.filters.length > 0)
					{
						$.each(oParam.advancedSearch.filters, function()
						{
							if (this.addBracketBefore)
							{
								oSearch.addBracket(this.addBracketBefore);
							}
							if (this.addOperatorBefore)
							{
								oSearch.addOperator(this.addOperatorBefore);
							}

							oSearch.addFilter(this.name, this.comparison, this.value1, this.value2, this.value3, this.applyToSubSearch);

							if (this.addOperatorAfter)
							{
								oSearch.addOperator(this.addOperatorAfter);
							}
							if (this.addBracketAfter)
							{
								oSearch.addBracket(this.addBracketAfter);
							}
						});
					}

					if (oParam.advancedSearch.customOptions && oParam.advancedSearch.customOptions.length > 0)
					{
						$.each(oParam.advancedSearch.customOptions, function()
						{
							oSearch.addCustomOption(this.name, this.value);
						});
					}

					if (oParam.advancedSearch.sort && oParam.advancedSearch.sort.length > 0)
					{
						$.each(oParam.advancedSearch.sort, function()
						{
							oSearch.sort(this.name, (this.direction) ? this.direction : 'asc');
						});
					}
					else
					{
						oSearch.sort('title', 'asc');
					}

					oSearch.rows = (oParam.advancedSearch.rows) ? oParam.advancedSearch.rows : 200;
					oSearch.rf = 'json';
					oSearch.getResults(function(oResponse) {nsFreshcare.setup.schemecodes.show(oParam, oResponse)})
				}

				else
				{
					$.ajax(
					{
						type: 'GET',
						url: ns1blankspace.util.endpointURI(oParam.method + '_SEARCH') + '&rf=json',
						dataType: 'json',
						rows: ((oParam.search && oParam.search.rows) ? oParam.search.rows : 200),
						success: function(oResponse) {nsFreshcare.setup.schemecodes.show(oParam, oResponse)}
					});
				}
			}

			else
			{
				if (oResponse.status === 'OK')
				{
					var aFields = (oParam.manage && oParam.manage.fields && oParam.manage.fields.length > 0)
									? oParam.manage.fields
									: [{name: 'title', xhtmlContext: 'Title', label: 'Description', type: 'Text', mandatory: true}];
					if (oParam.manage === undefined) 
					{oParam.maanage = {fields: aFields}}
					else if (oParam.manage.fields === undefined || oParam.manage.fields.length === 0)
					{oParam.manage.fields = aFields}

					var iColSpan = aFields.length + ((oParam.allowDelete) ? 1 : 0) - ((oParam.allowNew) ? 1 : 0); 

					aHTML.push('<table id="ns1blankspaceSetupContainer">');
					aHTML.push('<tr><td style="color:#B8B8B8; padding:10px 5px 10px 5px; background-color:#F8F8F8; vertical-align:middle;"' +
									((iColSpan > 1) ? ' colspan="' + iColSpan + '"' : '') + 
										'>' + oParam.name + '</td>' + 
									((oParam.allowNew === true) 
										? '<td style="color:#B8B8B8; padding:10px 5px 10px 5px; background-color:#F8F8F8; vertical-align:middle; text-align:right;">' +
												'<span id="ns1blankspaceSetupAdd">Add</span></td>' 
										: '') + 
								'</tr>');
					aHTML.push('<tr>');

					$.each(aFields, function()
					{
						aHTML.push('<td class="ns1blankspaceHeaderCaption">' + this.label + '</td>')
					});
									 +
					aHTML.push('</tr>');
					
					$.each(oResponse.data.rows, function()
					{	
						var oRow = this;
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						$.each(aFields, function()
						{
							aHTML.push('<td id="ns1blankspaceSchemeCodes_' + this.name + '-' + oRow.id + '"' + 
													' class="ns1blankspaceRowEdit ns1blankspaceRow"' +
													' data-fieldname="' + ((this.fieldname) ? this.fieldname : this.name) + '"' + 
													' data-inputAddClass="ns1blankspace' + this.type + '"' + 
													((this.inputAttributes) ? ' data-inputAddAttribute="' + this.inputAttributes + '"' : '') + 
													' data-mandatory="' + ((this.mandatory != undefined && this.mandatory === true) ? '1' : '0') + '"' + 
													((this.type === 'Select') ? ' data-id="' + oRow[this.name.substr(0, this.name.length - 4)] + '"' : '') + 
													' data-column="' + this.name + '">' +
													oRow[this.name] + 
													'</td>');
						});

						if (oParam.allowDelete)
						{
							aHTML.push('<td class="ns1blankspaceRow" style="width:30px;text-align:right;">' +
												'<span id="ns1blankspaceSetup_options_remove-' + oRow.id + '"' +
												' class="ns1blankspaceRowRemove"></span>' +
										'</td>');	
						}

						aHTML.push('</tr>');
					});

					aHTML.push('</table>');

					$('#ns1blankspaceSchemeCodes').html(aHTML.join(''));

					$('#ns1blankspaceSetupAdd')
					.button(
					{
						text: false,
						icons: {primary: "ui-icon-plus"}
					})
					.css('height', '20px')
					.css('width', '20px')
					.on('click', function(event)
					{
						nsFreshcare.setup.schemecodes.add(oParam);
					});

					if (oParam.allowEdit)
					{
						$('.ns1blankspaceRowEdit').click(function(event)
						{
							nsFreshcare.util.elementEdit.start(
							{
								xhtmlElementID: event.target.id,
								save: true,
								mandatory: ($('#' + event.target.id).attr("data-mandatory") == "1"),
								onComplete: nsFreshcare.util.elementEdit.stop,
								method: oParam.method + '_MANAGE'
							});
						});
					}

					$('.ns1blankspaceRowRemove')
					.on('click', function(event)
					{
						var oThisElement = this;
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI(oParam.method + '_MANAGE'),
							data: 'remove=1&id=' + oThisElement.id.split('-').pop(),
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspaceRow.status.message(oParam.name + ' removed');
									$(oThisElement).parent().remove();
								}
								else
								{
									ns1blankspace.status.error(oResponse.error.errornotes);
								}
							}
						});
					})
					.button(
					{
						icons: {primary: 'ui-icon-close'}
					})
					.css('height', '20px')
					.css('width', '20px');
				}
				else
				{
					ns1blankspace.status.error(oResponse.error.errornotes);
				}
			}
		},

		add: function(oParam)
		{
			// We've made sure manage.fields has been defined prior to calling this function
			var aHTML = [];
				
			aHTML.push('<tr class="ns1blankspaceRow">');

			$.each(oParam.manage.fields, function()
			{
				aHTML.push('<td id="td_ns1blankspaceSetup_' + ((this.fieldname) ? this.fieldname : this.name) + '"' +
								' class="ns1blankspaceRow ns1blankspaceSetup ns1blankspaceRowAdd"' +
								' data-inputAddClass="ns1blankspace' + this.type + '"' + 
								((this.inputAttributes) ? ' data-inputAddAttribute="' + this.inputAttributes + '"' : '') + 
								' data-column="' + this.name + '"' +
								' data-fieldname="' + ((this.fieldname) ? this.fieldname : this.name) + '"' + 
								((this.mandatory === true) ? ' data-mandatory="1"' : '') + 
								 '>' +
							'</td>');
				
			});
								
			aHTML.push('<td class="ns1blankspaceRow" style="width:30px;text-align:right;">' +
									'<span id="ns1blankspaceSetup_options_save-" class="ns1blankspaceRowAction" data-action="save"></span>' +
									'<span id="ns1blankspaceSetup_options_remove-" class="ns1blankspaceRowAction" data-action="remove"></span>' +
									'</td>');

			aHTML.push('</tr>');
					
			$('#ns1blankspaceSetupContainer .ns1blankspaceHeaderCaption').first().parent().after(aHTML.join(''));	
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceSetupAdd').button({disabled: true});
			
			if (oParam.manage.fields.length === 1)
			{
				nsFreshcare.util.elementEdit.start(
				{
					xhtmlElementID: $('.ns1blankspaceRowAdd').first().attr('id'), 
					save: true,
					method: oParam.method + '_MANAGE'
				});
			}
			else
			{
				// We need to go to the special code that waits until all fields are populated and then saves
				$('#ns1blankspaceSetup_options_save-')
					.button({text: false, label: 'Save', icons: {primary: 'ui-icon-check'}})
					.on('click', function()
					{
						nsFreshcare.setup.schemecodes.edit.save(this, oParam);
					});
				nsFreshcare.setup.schemecodes.edit.start();
			}
		},

		search:
		{
			send: function(sXHTMLElementID)
			{
				ns1blankspace.setup.search.send(sXHTMLElementID);
			}
		},

		edit:
		{
			start: function()
			{
				$.each($('.ns1blankspaceRowAdd'), function()
				{
					var oElement = this;
					var sElementID = this.id;
					var sActionElementID = '#' + sElementID.split('-').shift() + '-options-' + sElementID.split('-').pop();
					var sHTML = $('#' + sElementID).html();
					var sElementInputID = sElementID.replace('td', 'input');
					var sAddAttributes = $(oElement).attr('data-inputAddAttribute');
					
					sHTML = '<input style="width:100%;" id="' + sElementInputID + '"' +
								' class="ns1blankspace' + (($(oElement).attr('data-inputAddClass')) ? ' ' + $(oElement).attr('data-inputAddClass') : '') + '"' +
								(($(oElement).attr('data-mandatory') === "1") ? ' data-mandatory="1"' : '') + 
								(($(oElement).attr('data-fieldname')) ? ' data-fieldname="' + $(oElement).attr('data-fieldname') + '"' : '') + 
								'">'
					
					$('#' + sElementID).html(sHTML);
					$('.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

					if (sAddAttributes && sAddAttributes != '')
					{
						$.each(sAddAttributes.split('|'), function()
						{
							$('#' + sElementInputID).attr(this.split('=').shift(), this.split('=').pop());
						});
					}
				});
			},
			
			save: function(oElement, oParam)
			{
				var oData = {};
				var sID = oElement.id.split('-').pop();

				if (oParam.method)
				{
					oData.id = sID;
					$.each(oParam.manage.fields, function()
					{
						if (this.type === 'Select')
						{
							oData[this.fieldname] = $('#input_ns1blankspaceSetup_' + this.fieldname).attr('data-id');
						}
						else
						{
							oData[this.name] = $('#input_ns1blankspaceSetup_' + this.name).val()
						}
					});

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI(oParam.method + '_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.inputDetected = false;
								// Need to add id back onto row if this was a new record and also add a remove button beside the save
								if (sID === undefined || sID === '')
								{
									$(oElement).attr('id', $(oElement).attr('id') + oResponse.id);
									$.each($(oElement).parent().children(), function()
									{
										$(this).attr("id", $(this).attr("id") + oResponse.id);
									});
									if (oParam.allowDelete == true)
									{
										$('#' + oElement.id.replace('save', 'remove'))
											.button({text: false, label: 'Remove', icons: {primary: 'ui-icon-close'}})
											.on('click', function() {ns1blankspace.setup.remove(this.id)});
									}
								}

								ns1blankspace.status.message(oParam.name + ' saved');
							}
							else
							{
								ns1blankspace.status.error('Error saving ' + oParam.name + ': ' + oResponse.error.errornotes);
							}
						}
					})
				}
			}
		}
	}
});