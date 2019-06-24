/*!
 * Copyright 2012, ibCom Pty Ltd
 * http://ibCom.com
 * 01 APR 2013
 */

nsFreshcare.util = 
{
	elementEdit: 
	{
		start: 	function(oParam) 
		{

			var sXHTMLElementID;
			var aElementID;
			var sInputElementID;
			var sHTML = '';
			var sAddClass = '';
			var sAddAttribute = '';
			var sFieldName = '';

			if (oParam) 
			{
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
			}
			else
			{
				oParam = {}
			}

			aElementID = sXHTMLElementID.split('-');
			sHTML = $('#' + sXHTMLElementID).html();

			if (sXHTMLElementID.substr(0,5) !== "INPUT") 
			{
				
				oParam.originalValue = sHTML;
				oParam.originalID = $('#' + sXHTMLElementID).attr('data-id');

				if ($('#' + sXHTMLElementID).attr("data-inputAddClass")) 
				{
					sAddClass = $('#' + sXHTMLElementID).attr("data-inputAddClass");
				}
				else
				{ 	sAddClass = " ns1blankspaceText"}

				if ($('#' + sXHTMLElementID).attr("data-inputAddAttribute")) 
				{
					var aAttributes = $('#' + sXHTMLElementID).attr("data-inputAddAttribute").split("data-");
					$.each(aAttributes, function() 
					{
						if (this.replace(/ /g, '') != '') 
						{
							sAddAttribute += ' data-' + this.split('=')[0] + '="' + this.split('=')[1] + '"'; + ' ';
						}
					});
				}

				if ($('#' + sXHTMLElementID).attr('data-fieldname'))
				{
					sFieldName = $('#' + sXHTMLElementID).attr('data-fieldname');
				}
				else
				{
					sFieldName = sXHTMLElementID.split('-').shift();
					sFieldName = sFieldName.split('_').pop();
				}

				// v3.0.0 now put 'INPUT' at the beginning instead of replacing
				sInputElementID = 'INPUT' + sXHTMLElementID;
				oParam.inputElementID = sInputElementID;
				
				sHTML = '<input id="' + sInputElementID + '"' +
								' class="' + sAddClass + '"' +
								' data-fieldname="' + sFieldName + '"' + 
								' ' + sAddAttribute + 
								' ' + ((oParam.originalID) ? ' data-id="' + oParam.originalID + '"' : '') + 
								' value="' + sHTML + '">'
				
				$('#' + sXHTMLElementID).html(sHTML);

				if ($('#' + sXHTMLElementID).hasClass("ns1blankspaceDate")) 
				{
					$('#' + sInputElementID).datepicker({
								dateFormat: 'dd M yy',
								changeYear: true,
								onClose: function(dateText, inst) {nsFreshcare.util.elementEdit.stop(oParam);}
					});
					
					$('#' + sInputElementID).datepicker('show');
				}
				else 
				{	
					setTimeout(function() { $('#' + sInputElementID).focus(); }, 100)
					
					// If it's a Select (combo) we need to do things differently
					if (sAddClass.indexOf('Select') > -1) 
					{
						ns1blankspace.xhtml.action = nsFreshcare.util.elementEdit.stop;

						//v1.0.21 Check if user has made a valid selection and cancel input if not
						$('#' + sInputElementID).focusout(function(event) 
						{
							
							setTimeout(function() 
							{
								nsFreshcare.util.elementEdit.moveOut(oParam);
								/*{
									elementInputID: sInputElementID, 
									originalValue: oParam.originalValue
								});*/
							}, 200);

						});

					}
					else 
					{
						$('#' + sInputElementID).focusout(function(event) 
						{
							nsFreshcare.util.elementEdit.stop(oParam);
						});
					}
				}	
			}
		},
	
		moveOut: function(oParam) 
		{		//v1.0.21 Function added

			var sInputElementID = oParam.inputElementID;

			if (oParam.originalValue == $('#' + sInputElementID).val() || $('#' + sInputElementID).val() === '') 
			{
				
				$(ns1blankspace.xhtml.container).html('');	
				nsFreshcare.util.elementEdit.stop(oParam);
			}
			else if ($('#' + sInputElementID) != '') 
			{
				//if user types in select field and doesn't select (or doesn't enter enough characters to search),
				// remove input elment and set back to original value (unless validation is not required)
			
				if (ns1blankspace.data.searchClicked === undefined) 
				{
					$('#' + sInputElementID).val(oParam.originalValue);
					$(ns1blankspace.xhtml.container).html('');	
					nsFreshcare.util.elementEdit.stop(oParam);
				}
			}
			ns1blankspace.data.searchClicked = undefined;
		},

		stop: 	function(oParam) 
		{

			var sXHTMLElementID = ns1blankspace.xhtml.divID;

			if (oParam) 
			{
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
				if (oParam.xhtmlInputElementID) {sXHTMLElementID = oParam.xhtmlInputElementID;}
			}

			if (sXHTMLElementID.substr(0,5) === "INPUT") {sXHTMLElementID = sXHTMLElementID.substr(5);}

			oParam.xhtmlElementID = sXHTMLElementID;

			// Perform validation
			ns1blankspace.okToSave = true;
			nsFreshcare.util.elementEdit.validate(oParam);

			// Save the value if required
			// v3.0.0b SUP021726 Was not removing the input when focus was lost and save wasn't required
			if (ns1blankspace.okToSave)
			{
				if (oParam.save)
				{
					nsFreshcare.util.elementEdit.save(oParam);	
				}
				$('#' + sXHTMLElementID).html($('#' + 'INPUT' + sXHTMLElementID).val());
			}			
		},
	
		validate: function(oParam) 
		{
			var sXHTMLElementID;
			var sInputElementID;
			var bMandatory = false;
			ns1blankspace.okToSave = true;

			if (oParam) 
			{
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
				if (oParam.inputElementID) {sInputElementID = oParam.inputElementID;}
				if (oParam.mandatory != undefined) {bMandatory = oParam.mandatory;}
			}

			if (bMandatory) 
			{
				if ($('#' + sInputElementID).val() == "") 
				{
					ns1blankspace.container.confirm({title: 'Validation error!', html: "You must enter a value in this field."});
					ns1blankspace.okToSave = false;
				}
			}

			if (oParam && oParam.functionValidate && ns1blankspace.okToSave) 
			{
			
				var fValidate = ns1blankspace.util.param(oParam, 'functionValidate').value;
				// if validation doesn't pass, then okToSave will be false
				fValidate(oParam);
			}
		},
	
		save: 	function(oParam) 
		{

			var sXHTMLElementID;
			var sInputElementID;
			var sMethod;
			var sValue;
			var sFieldName;

			if (oParam) {
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
				if (oParam.inputElementID) {sInputElementID = oParam.inputElementID;}
				if (oParam.method) {sMethod = oParam.method;}
			}

			ns1blankspace.okToSave = true;
			oParam.id = (sXHTMLElementID.split('-').length > 1) ? sXHTMLElementID.split('-').pop() : '';
			oParam = ns1blankspace.util.setParam(oParam, 'value', $('#' + sInputElementID).val());

			if (ns1blankspace.okToSave) 
			{
				
				if (sMethod === undefined) 
				{
					sMethod = $('#' + sXHTMLElementID).attr("data-method");
					if (sMethod === undefined) {sMethod = $('#' + sXHTMLElementID).attr("onDemandMethod");}
				}
				
				if (sMethod) 
				{
					var sValue = ($('#' + sInputElementID).attr('data-id') != "undefined" && $('#' + sInputElementID).attr('data-id') != '' && $('#' + sInputElementID).attr('data-id') != undefined) 
								? $('#' + sInputElementID).attr('data-id') 
								: $('#' + sInputElementID).val();
					var sFieldName = $('#' + sInputElementID).attr('data-fieldname');

					var sData = 'id=' + (sXHTMLElementID.split('-').length > 1) ? sXHTMLElementID.split('-').pop() : '';
					sData += '&' + sFieldName + '=' + ns1blankspace.util.fs(sValue);
					
					$.ajax({
						type: 'POST',
						url: ns1blankspace.util.endpointURI(sMethod),
						data: sData,
						dataType: 'json',
						success: function(oResponse) {

							if (oResponse.status === "OK" && oParam.functionPostSave) {

								var fPostSave = ns1blankspace.util.param(oParam, 'functionPostSave').value;
								fPostSave(oParam);
							}
						}

					});
				}
			}
			else 
			{
				$('#' + sXHTMLElementID).html(oParam.originalValue);
			}
		}
	},

	// v3.1.201 SUP022859 Can set an object as read only in the views and this function determines the value of the readonly flag
	objectIsReadOnly: function()
	{
		var oView = $.grep(ns1blankspace.views, function(x) {return x.namespace == ns1blankspace.objectName && x.parentNamespace == ns1blankspace.objectParentName}).shift();

		return (oView && oView.readOnly == true);
	},

	searchGrower: 
	{
		show: function(oParam, oResponse) 
		{
			// This function does a search for growers - removing duplicates where necessary
			// v3.2.010 Added hyphen to the list of separators
			var sXHTMLElementID;
			var sXHTMLInputElementID;
			var iXHTMLElementContextID;
			var sXHTMLParentInputElementID;
			var iSource = ns1blankspace.data.searchSource.text;
			var iMinimumLength = 1;
			var iMaximumColumns = 1;
			var sMethod;
			var sSearchText = '';
			var sColumns;
			var iColumn = 0;
			var sMethodFilter;
			var bMultiSelect;
			var fOnComplete;
			var sIDColumn = 'id';
				
			if (oParam != undefined)
			{
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.xhtmlInputElementID != undefined) {sXHTMLInputElementID = oParam.xhtmlInputElementID}
				if (oParam.xhtmlParentInputElementID != undefined) {sXHTMLParentInputElementID = oParam.xhtmlParentInputElementID}
				if (oParam.source != undefined) {iSource = oParam.source}
				if (oParam.minimumLength != undefined) {iMinimumLength = oParam.minimumLength}
				if (oParam.method != undefined) {sMethod = oParam.method}
				if (oParam.searchText != undefined) {sSearchText = oParam.searchText}
				if (oParam.sColumns != undefined) {sColumns = oParam.columns}
				if (oParam.methodFilter != undefined) {sMethodFilter = oParam.methodFilter}
				if (oParam.multiSelect != undefined) {bMultiSelect = oParam.multiSelect}
				if (oParam.idColumn != undefined) {sIDColumn = oParam.idColumn}
			}
			
			if (sXHTMLElementID != undefined)
			{
				var aXHTMLElementID = sXHTMLElementID.split('-');
				sXHTMLInputElementID = aXHTMLElementID[0];
				iXHTMLElementContextID = aXHTMLElementID[1];
			
				$.extend(true, oParam, {xhtmlInputElementID: sXHTMLInputElementID});
			
				var bCache = ($('#' + sXHTMLInputElementID).attr("data-cache") == "true")

				if (sMethod === undefined)
				{
					sMethod = $('#' + sXHTMLInputElementID).attr("onDemandMethod");
					if (sMethod === undefined) {sMethod = $('#' + sXHTMLInputElementID).attr("data-method")}	
				}
				
				if (sColumns === undefined)
				{
					sColumns = $('#' + sXHTMLInputElementID).attr("onDemandColumns");
					if (sColumns === undefined) {sColumns = $('#' + sXHTMLInputElementID).attr("data-columns")}
					if (sMethod == 'CONTACT_PERSON_SEARCH')
					{
						sColumns += ',contactbusiness,contactbusinesstext,contactperson.contactbusiness.reference';
					}
					if (sColumns != undefined) {$.extend(true, oParam, {columns: sColumns})};	
				}
				
				if (sXHTMLParentInputElementID === undefined)
				{
					sXHTMLParentInputElementID = $('#' + sXHTMLInputElementID).attr("data-parent")
					if (sXHTMLParentInputElementID != undefined) {$.extend(true, oParam, {xhtmlParentInputElementID: sXHTMLParentInputElementID})};	
				}

				if (sMethodFilter === undefined)
				{
					sMethodFilter = $('#' + sXHTMLInputElementID).attr("data-methodFilter");
				}

				if (sMethodFilter === undefined) {sMethodFilter = ''}

				if (bMultiSelect === undefined)
				{
					bMultiSelect = ($('#' + sXHTMLInputElementID).attr("data-multiselect") === "true");
					$.extend(true, oParam, {multiselect: bMultiSelect});
				}

				if (fOnComplete === undefined)
				{
					fOnComplete = ns1blankspace.util.toFunction($('#' + sXHTMLInputElementID).attr("data-click"));
					$.extend(true, oParam, {onComplete: fOnComplete});
				}

			}	
			
			if (iXHTMLElementContextID != undefined)
			{
				// v3.3.001 SUP023422 Set Business & reference if different to already selected when choose a person
				if ($('#' + sXHTMLElementID).attr('data-contactbusiness'))
				{
					var sBusinessInputID = sXHTMLInputElementID.replace('Person', 'Business');
					var sReferenceInputID = sXHTMLInputElementID.replace('Person', 'Reference');
					if ($('#' + sBusinessInputID).attr('data-id') != $('#' + sXHTMLElementID).attr('data-contactbusiness'))
					{
						$('#' + sBusinessInputID).attr('data-id', $('#' + sXHTMLElementID).attr('data-contactbusiness'));	
						$('#' + sBusinessInputID).val($('#' + sXHTMLElementID).attr('data-contactbusinesstext').formatXHTML());	
						$('#' + sReferenceInputID).val($('#' + sXHTMLElementID).attr('data-contactbusinessreference'));	
						$('#' + sReferenceInputID).attr('data-id', $('#' + sXHTMLElementID).attr('data-contactbusiness'));	
					}
				}
				$('#' + sXHTMLInputElementID).val(($('#' + sXHTMLElementID).html()).formatXHTML());
				$('#' + sXHTMLInputElementID).attr("data-id", iXHTMLElementContextID)
				$(ns1blankspace).hide();

				if (fOnComplete != undefined)
				{
					fOnComplete();
				}
			}
			else
			{
				if (sColumns === undefined) {sColumns = 'title'};

				if (sSearchText === '' && iSource === ns1blankspace.data.searchSource.text)
				{
					sSearchText = $('#' + sXHTMLInputElementID).val();
				}

				ns1blankspace.container.position({xhtmlElementID: sXHTMLInputElementID, topOffset: 10, setWidth: true});

				if (oResponse === undefined)
				{							
					if (sSearchText === '' && iSource === ns1blankspace.data.searchSource.text)
					{
						sSearchText = $('#' + sXHTMLInputElementID).val();
					}	
				
					if (sSearchText.length >= iMinimumLength || iSource === ns1blankspace.data.searchSource.all || bCache)
					{
						ns1blankspace.status.working();

						var aColumns = sColumns.split('-');	

						if (ns1blankspace.util.isMethodAdvancedSearch(sMethod))
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = sMethod;

							$.each(aColumns, function() 
							{
								if (this != 'space' && this != 'comma' && this != 'pipe' && 
									this != 'openbracket' && this != 'closebracket' && this != 'hyphen')
								{	
									oSearch.addField(this);
								}	
							});	

							if (!bCache && iSource === ns1blankspace.data.searchSource.text && sMethodFilter == '')
							{	
								$.each(aColumns, function(i) 
								{
									if (this != 'space' && this != 'comma' && this != 'pipe' && this != 'column' && 
										this != 'openbracket' && this != 'closebracket' && this != 'hyphen')
									{	
										if (i != 0)
										{
											oSearch.addOperator('or');
										}

										oSearch.addFilter(this, 'TEXT_IS_LIKE', sSearchText);
									}	
								});	
							}	
							
							if (sMethodFilter != '')
							{
								var aMethodFilters = sMethodFilter.split('|');

								var aFilterSearch = $.grep(aMethodFilters, function (a) {return a.split('-').length == 2;});

								if (!bCache && aFilterSearch.length > 0)
								{	
									oSearch.addBracket('(');

									$.each(aFilterSearch, function(i) 
									{
										var aMethodFilter = this.split('-');
									
										if (i != 0)
										{
											oSearch.addOperator('or');
										}
										
										oSearch.addFilter(aMethodFilter[0], aMethodFilter[1], sSearchText);
									});

									oSearch.addBracket(')');
								}

								var aFilterFixed = $.grep(aMethodFilters, function (a) {return a.split('-').length == 3;});
		
								$.each(aFilterFixed, function(i) 
								{
									var aMethodFilter = this.split('-');
								
									oSearch.addFilter(aMethodFilter[0], aMethodFilter[1], aMethodFilter[2]);
								});	
							}	

							if (sXHTMLParentInputElementID != undefined)
							{
								var sParentColumnID = $('#' + sXHTMLInputElementID).attr("data-parent-search-id")
								var sParentColumnText = $('#' + sXHTMLInputElementID).attr("data-parent-search-text")
								var sParentContextID = $('#' + sXHTMLParentInputElementID).attr("data-id");
								var sParentContextText = $('#' + sXHTMLParentInputElementID).val();
								
								if (sParentColumnID != undefined && (sParentContextID != undefined && sParentContextID != ''))
								{
									oSearch.addFilter(sParentColumnID, 'EQUAL_TO', sParentContextID);
								}
								else if	(sParentColumnText != undefined && sParentContextText != '')
								{
									oSearch.addFilter(sParentColumnText, 'TEXT_STARTS_WITH', sParentContextText);
								}
							}
							oSearch.rows = 100;
							oSearch.sort(aColumns[0], 'asc');
							oSearch.getResults(function(data){nsFreshcare.util.searchGrower.show(oParam, data)});
						}
						else
						{
							var sData = 'rows=100';

							if (iSource === ns1blankspace.data.searchSource.text)
							{	
								sData = '&' + aColumns[0] + '=' + ns1blankspace.util.fs(sSearchText);
							}	
							
							if (sXHTMLParentInputElementID != undefined)
							{
								var sParentColumnID = $('#' + sXHTMLInputElementID).attr("data-parent-search-id")
								var sParentColumnText = $('#' + sXHTMLInputElementID).attr("data-parent-search-text")
								var sParentContextID = $('#' + sXHTMLParentInputElementID).attr("data-id");
								var sParentContextText = $('#' + sXHTMLParentInputElementID).val();
								
								if (sParentColumnID != undefined && (sParentContextID != undefined && sParentContextID != ''))
								{
									sData = '&' + sParentColumnID + '=' + sParentContextID;
								}
							}

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI(sMethod),
								data: sData,
								dataType: 'json',
								success: function(data){nsFreshcare.util.searchGrower.show(oParam, data)}
							});
						}	
					}
					else
					{
						ns1blankspace.status.message('At least ' + iMinimumLength + ' letters')
					}
				}	
				else
				{
					ns1blankspace.status.message('');

					if (sColumns == undefined) {sColumns = 'title'}
					var aColumns = sColumns.split(',').shift().split('-');
					var aHTML = [];

					if (oResponse.data.rows.length === 0)
					{
						$(ns1blankspace.xhtml.container).hide();
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:' +
										$('#' + sXHTMLInputElementID).width() + 'px;">');
					
						var sPreviousId = '';
						$.each(oResponse.data.rows, function(i, v) 
						{ 
								
							if (sPreviousId != v.id) {
								iColumn = iColumn + 1;
						
								if (iColumn == 1)
								{
									aHTML.push('<tr class="ns1blankspaceSearch">');
								}
									
								if (sColumns.length == 0)
								{
									aHTML.push('<td class="ns1blankspaceSearch" id="' + sXHTMLInputElementID +
														'-' + v.id + '">' + v.title + '</td>');
								}
								else
								{
									var bNewTD = true;

									// v3.3.001 SUP023422 Now add contactbuiness attributes when searching aperson to auto-populate business
									aHTML.push('<td class="ns1blankspaceSearch" id="' + sXHTMLInputElementID +
													'-' + v.id + '"' + 
													(sMethod == 'CONTACT_PERSON_SEARCH' 
														? ' data-contactBusiness="' + v.contactbusiness + 
														  '" data-contactBusinessText="' + v.contactbusinesstext + 
														  '" data-contactBusinessReference="' + v['contactperson.contactbusiness.reference'] + '"'
														: '') +
													'>');

									$.each(aColumns, function(j, k) 
									{
										bNewTD = false;

										switch (k)
										{
											case 'space':
												aHTML.push(' ');
												break;

											case 'comma':
												aHTML.push(',');
												break;

											case 'pipe':
												aHTML.push('|');
												break;

											case 'openbracket':
												aHTML.push('(');
												break;

											case 'closebracket':
												aHTML.push(')');
												break;

											case 'hyphen':
												aHTML.push('-');
												break;

											default:

												if (bNewTD)
												{
													aHTML.push('</td><td class="ns1blankspaceSearch" id="' + sXHTMLInputElementID +
																'-' + v.id + '">');
												}				
															
												aHTML.push(v[k]);
												bNewTD = true;
										}
									});

									aHTML.push('</td>');
								}
						
								if (iColumn === iMaximumColumns)
								{
									aHTML.push('</tr>');
									iColumn = 0;
								}	
							}
							sPreviousId = v.id;
						});
		    	
						aHTML.push('</table>');
			
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
					
						$('td.ns1blankspaceSearch').click(function(event)
						{
							$(ns1blankspace.xhtml.container).hide(200);
							$.extend(true, oParam, {xhtmlElementID: event.target.id})
							if (bMultiSelect)
							{
								nsFreshcare.util.searchGrower.multiSelect.add(oParam);
							}
							else
							{
								nsFreshcare.util.searchGrower.show(oParam);
							}
						});
					}	
				}
			}		
		},

		start: 		function ()
		{
			var sElementStatusID = 'ns1blankspaceViewControlSearchStatus';
			var sElementID = 'ns1blankspaceViewControlSearch';
			$('#' + sElementStatusID).show();
			$('#' + sElementStatusID).html(ns1blankspace.xhtml.loadingSmall);
			//ns1blankspace.container.position({xhtmlElementID: sElementID, topOffset: 10});
			},

		stop:		function ()
		{
			var sElementID = 'ns1blankspaceViewControlSearchStatus';
			$('#' + sElementID).hide();
			$('#' + sElementID).html('');
		},

		multiSelect: 
		{
			add: 	function(oParam) 
			{

				var sXHTMLElementID = '';
				var sInputElementId;
				var sCellElementId;
				var sTableElementId;
				var aHTML = [];

				if (oParam) 
				{
					if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
				}

				sInputElementId = sXHTMLElementID.split('-')[0];
				sCellElementId = $('#' + sInputElementId).parent().attr('id');
				sTableElementId = sCellElementId.replace(/-/g, '_');
				sTableElementId = sTableElementId.replace('_input_', '_selectrows_');

				if ($('#' + sTableElementId).html() === undefined) 
				{
					aHTML.push('<table id="' + sTableElementId + '" style="width:100%;">');

				}

				// Make sure the value hasn't already been selected and then Insert the row that's just been clicked 
				if ($('#' + sInputElementId.replace('_input_', '_selectrows_') + '-' + sXHTMLElementID.split('-')[1]).html() === undefined) 
				{
					aHTML.push('<tr>' +
								'<td id="' + sInputElementId.replace('_input_', '_selectrows_') + '-' + sXHTMLElementID.split('-')[1] + '"' +
								   ' width="250px" class="ns1blankspaceMultiSelect">' +
								$('#' + sXHTMLElementID).html() + 
								'</td>' +
								'<td class="ns1blankspaceMultiRemove">Delete</td>' +
								'</tr>');
				}
				else 
				{ 
					ns1blankspace.status.message("Value has already been selected.");
					return;
				}
				

				if ($('#' + sTableElementId).html() === undefined) 
				{
					// Let's insert the table into the td following the input element
					aHTML.push('</table>');

					$('#' + sCellElementId).html($('#' + sCellElementId).html() + aHTML.join(''));
				}
				else 
				{
					// Insert the row into the table 
					$('#' + sTableElementId).append(aHTML.join(''));
				}

				// Now bind the remove button (we need to unbind all clicks first)
				$('.ns1blankspaceMultiRemove').unbind('click');
				$('.ns1blankspaceMultiRemove')
				.button({
						 text: false,
						 icons: {
							 primary: "ui-icon-close"
						}
				})
				.css('height', '15px')
				.css('width', '15px')
				.click( function(event) {
					// remove the row
					$(this).parent().remove();
				});
	
			}
		}				
	},

	system: 
	{	// v3.1.201 Moved to util and genericised it
		data: {},

		addSnapShot: function(oSearch, sSearchContext)
		{
			oSearch.addField('snapshotofid,snapshotcreateduser,snapshotcreatedusertext,snapshotmodifieduser,snapshotmodifiedusertext,snapshotcreateddate,snapshotmodifieddate');
			oSearch.addCustomOption('includesnapshots', 'Y');
			oSearch.addFilter('snapshotofid', 'EQUAL_TO', sSearchContext);
			oSearch.sort('snapshotcreateddate', 'desc');
			return oSearch;
		},

		search: function(oParam, oResponse)
		{
			// V3.1.0i Was using nsFreshcare as rootnamespace so wasn't showing correct history in eggs
			// v3.3.001 SUP023569 Allows nameSpace to be passed in case not using rootnamspace
			
			var sObject = ns1blankspace.util.getParam(oParam, 'objectName', {'default': ns1blankspace.objectName}).value;
			var sParentObject = ns1blankspace.util.getParam(oParam, 'objectParentName', {'default': ns1blankspace.objectParentName}).value;
			var oNS = ns1blankspace.util.getParam(oParam, 'nameSpace', {'default': ns1blankspace.rootnamespace}).value;
			if (sParentObject) {oNS = oNS[sParentObject]}
			oNS = oNS[sObject];


			if (oParam.systemStep === undefined) {oParam.systemStep = 1}

			// Search for history records
			if (oParam.systemStep === 1)
			{
				nsFreshcare.util.system.data.systemRows = undefined;
				oParam.xhtmlElementID = '-' + ns1blankspace.objectContext;
				oParam.functionShowSystem = nsFreshcare.util.system.search;
				oParam.systemStep = 2;
				oNS.search.send(oParam);
			}

			// Display history rows
			else if (oParam.systemStep === 2)
			{
				oParam.xhtmlElementID = 'ns1blankspaceMainSystem';
				nsFreshcare.util.system.show(oParam, oResponse);
			}
		},

		show: function(oParam, oResponse)
		{
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMainSystem'}).value;
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementSystemID', {'default': sXHTMLElementID}).value;
			var sPrefix = ns1blankspace.util.getParam(oParam, 'tablePrefix').value;
			var oSourceData = ns1blankspace.util.getParam(oParam, 'auditFieldsFrom', {'default': ns1blankspace.objectContextData}).value;
			var aHTML = [];
			var sIDPrefix = (sPrefix) ? sPrefix.replace(/\./g, '_') : '';

			aHTML.push('<table id="ns1blankspaceSystem" class="ns1blankspace">');
			aHTML.push('<tr><td id="ns1blankspaceSystemRow' + sIDPrefix + '1" class="ns1blankspaceContainer"></td></tr>');
			aHTML.push('<tr><td id="ns1blankspaceSystemRow' + sIDPrefix + '2" class="ns1blankspaceContainer"></td></tr>');
			aHTML.push('</table>');

			$('#' + sXHTMLElementID).html(aHTML.join(''));

			aHTML = [];

			aHTML.push('<table id="ns1blankspaceSystemHistory" style="border-bottom: 2px slid #e4e4e4;">');
		
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Created On</td><td class="ns1blankspaceSummaryCaption">Last Modified On</td></tr>');
			aHTML.push('<tr><td class="ns1blankspaceSummary">' + oSourceData[(sPrefix ? sPrefix + '.' : '') + 'createddate'] + ' </td>' +
							'<td class="ns1blankspaceSummary">' + oSourceData[(sPrefix ? sPrefix + '.' : '') + 'modifieddate'] + '</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Created By</td><td class="ns1blankspaceSummaryCaption">Last Modified By</td></tr>');
			aHTML.push('<tr><td class="ns1blankspaceSummary">' + oSourceData[(sPrefix ? sPrefix + '.' : '') + 'createdusertext'] + ' </td>' +
						'<td class="ns1blankspaceSummary">' + oSourceData[(sPrefix ? sPrefix + '.' : '') + 'modifiedusertext'] + ' </td></tr>');

			aHTML.push('</table>');

			$('#ns1blankspaceSystemRow' + sIDPrefix + '1').html(aHTML.join(''));

			aHTML = [];

			aHTML.push('<table id="ns1blankspaceSystemHistory">')
		
			aHTML.push('<tr class="ns1blankspaceCaption">');
			aHTML.push('<td class="ns1blankspaceHeaderCaption">Date / Who</td>');
			aHTML.push('<td class="ns1blankspaceHeaderCaption">Details Changed (Original / New Values)</td>');
			//aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
			aHTML.push('</tr>');

			if (oResponse.data.rows.length === 0)
			{
				aHTML.push('<tr><td colspan="4">No history.</td></tr>');
				aHTML.push('</table>');
				
				$('#ns1blankspaceSystemRow' + sIDPrefix + '2').html(aHTML.join('')).show(ns1blankspace.option.showSpeed);
			}
			else
			{
				$.each(oResponse.data.rows, function()
				{	
					aHTML.push(nsFreshcare.util.system.row(this, oParam));
				});
		    	
				aHTML.push('</table>');
				
				ns1blankspace.render.page.show(
				{
					xhtmlElementID: 'ns1blankspaceSystemRow' + sIDPrefix + '2',
					xhtmlContext: 'System',
					xhtml: aHTML.join(''),
					showMore: (oResponse.morerows === 'true'),
					more: oResponse.moreid,
					rows: ns1blankspace.option.defaultRows,
					functionShowRow: nsFreshcare.util.system.row,
					functionOnNewPage: nsFreshcare.util.system.bind
				}); 
			}
		},

		row: function(oRow, oParam)
		{
			// V3.1.0i Was using nsFreshcare as rootnamespace so wasn't showing correct history in eggs
			// v3.3.001 SUP023569 Allows nameSpace or historyFields array to be passed in case not using rootnamspace.
			var aHTMLDetails = [];
			var aHTML = [];
			var oPreviousRow;
			var aDifferences = [];
			var oSourceData = ns1blankspace.util.getParam(oParam, 'auditFieldsFrom', {'default': ns1blankspace.objectContextData}).value;
			var sPrefix = ns1blankspace.util.getParam(oParam, 'tablePrefix').value;
			var bStripPrefix = ns1blankspace.util.getParam(oParam, 'stripPrefix', {'default': false}).value;
			var sObject = ns1blankspace.util.getParam(oParam, 'objectName', {'default': ns1blankspace.objectName}).value;
			var sParentObject = ns1blankspace.util.getParam(oParam, 'objectParentName', {'default': ns1blankspace.objectParentName}).value;
			var oNS = ns1blankspace.util.getParam(oParam, 'nameSpace', {'default': ns1blankspace.rootnamespace}).value;
			if (sParentObject) {oNS = oNS[sParentObject]}
			oNS = oNS[sObject];

			var aHistoryFields = ns1blankspace.util.getParam(oParam, 'historyFields', {default: oNS.data.historyFields}).value;

			// Put current row into nsFreshcare.admin.audit.data.systemRows 
			if (nsFreshcare.util.system.data.systemRows === undefined) 
			{
				var oOriginalRow = {};
				if (bStripPrefix)
				{
					$.each(Object.keys(oSourceData), function(index, key) 
					{
						//oOriginalRow[key.split('.').pop()] = oSourceData[key];  // v3.4.001 changed back to below
						oOriginalRow[key.replace(sPrefix + '.', '')] = oSourceData[key];
						return 
					});
				}
				else {oOriginalRow = oSourceData}
				nsFreshcare.util.system.data.systemRows = [];
				nsFreshcare.util.system.data.systemRows.push(oOriginalRow);
			}
			nsFreshcare.util.system.data.systemRows.push(oRow);

			if (nsFreshcare.util.system.data.systemRows.length > 1) 
			{ 
				oPreviousRow = nsFreshcare.util.system.data.systemRows[nsFreshcare.util.system.data.systemRows.length - 2];

				// Work out the difference between this row and the last row and put into oDifferences
				// 3.3.001 Added conditional display of each field
				$.each(aHistoryFields, function()
				{
					if (($.type(this.include) == 'function' && this.include())
						|| $.type(this.include) != 'function')
					{
						if (oRow[this.name] != oPreviousRow[this.name])
						{
							aHTMLDetails.push('<tr>' +
												'<td width="20%" style="padding-bottom: 10px;"><strong>' + this.caption + '</strong></td>' +
											  	'<td width="40%" style="padding-bottom: 10px;">' + oRow[(this.display) ? this.display : this.name] + '</td>' +
											  	'<td width="40%" style="padding-bottom: 10px;">' + oPreviousRow[(this.display) ? this.display : this.name] + '</td>' +
											  '</tr>');
						}
					}
				});

				if (aHTMLDetails.length > 0)
				{
					aHTMLDetails.unshift('<table width="100%" style="border: 1px solid #d4d4d4; background-color: #efefef;">');
					aHTMLDetails.push('</table>');
				}
			}


			// v3.3.001 SUP023569 Don't show rows where there are no differences
			if (aHTMLDetails.length > 0)
			{
				aHTML.push('<tr id="ns1blankspaceSystemRow-' + oRow.id + '">');

				aHTML.push('<td id="ns1blankspaceSystem_datewho-' + oRow.id + '" class="ns1blankspaceRow" style="width: 100px;">' +
								oRow.snapshotcreateddate + '<br />' + 
								oRow.snapshotcreatedusertext.split('@').shift() + '<br />' + '@ ' + oRow.snapshotcreatedusertext.split('@').pop() + 
								'</td>');

				aHTML.push('<td id="ns1blankspaceSystem_details-' + oRow.id + '" class="ns1blankspaceRow">' +
								aHTMLDetails.join('') + 
								'</td>');

				aHTML.push('</tr>');
			}

			return aHTML.join('');			
		},

		bind: function(oParam)
		{
			$('.ns1blankspaceSystemRowDetails')
				.button(
				{
					icons: {primary: 'ui-icon-play'},
					text: false
				})
				.css('height', '20px')
				.css('width', '20px')
				.on('click', function()
				{	
					ns1blankspace.container.confirm({html: 'Not yet implemented'});
				});
		},

		actionHistory:
		{
			// v3.4.010 Search for and create audit trail for rows that have been removed
			search: function(oParam)
			{
				var iObject = ns1blankspace.util.getParam(oParam, 'object').value;
				var iObjectContext = ns1blankspace.util.getParam(oParam, 'objectcontext').value;
				var oAttachToObject = ns1blankspace.util.getParam(oParam, 'attachToObject').value;

				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('object,objectcontext,description,text,seauditobject,priority,duedatetime,actionby,actionbytext');
				oSearch.addField(ns1blankspace.option.auditFields);
				oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeAuditTrail);
				oSearch.addFilter('object', 'EQUAL_TO', iObject);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
				oSearch.rows = 500; 		
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oAttachToObject.auditTrail = oResponse.data.rows;
						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
					else
					{
						ns1blankspace.status.error('Error finding history data: ' + oResponse.error.errornotes);
					}
				});

			},

			save: function(oParam, oPreviousResponse)
			{
				// v3.4.010 Saves audit trail as an "action" - when removing something
				var oHistoryData = ns1blankspace.util.getParam(oParam, 'historyData').value;
				var fOnComplete = ns1blankspace.util.getParam(oParam, 'onComplete').value;
				oParam.historyDataStep = oParam.historyDataStep || 1;

				if (oHistoryData)
				{
					// Write 'created' history row
					if (oParam.historyDataStep == 1)
					{
						$.extend(oHistoryData,
						{
							duedate: oHistoryData.createddate,
							status: '1',
							actionby: oHistoryData.createduser,
							actiontype: nsFreshcare.data.actionTypeAuditTrail,
							priority: '1'
						});
						oParam.historyData = oHistoryData;
					}

					// Write 'removed' history data row
					else if (oParam.historyDataStep == 2)
					{
						oHistoryData.priority = '2';
						oHistoryData.duedate = (new Date()).toString('dd MMM yyyy hh:mm:ss');
						oHistoryData.actionby = ns1blankspace.user.id;
					}

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('ACTION_MANAGE'),
						data: oHistoryData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								oParam.historyDataStep ++;

								if (oParam.historyDataStep < 3)
								{
									nsFreshcare.util.system.actionHistory.save(oParam);
								}
								else
								{
									delete(oParam.historyData);
									delete(oParam.historyDataStep);
									if (fOnComplete)
									{
										if (oPreviousResponse)
										{
											delete (oParam.onComplete);
											fOnComplete(oParam, oPreviousResponse);
										}
										else
										{
											ns1blankspace.util.onComplete(oParam);
										}
									}
								}
							}
							else
							{
								ns1blankspace.status.error('Unable to save history: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					ns1blankspace.status.error('Unable to save history - no data passed.');
				}
			}
		}
	},

	startFinancialYear: function(aiAdjust) 	
	{
		var iAdjust = ($.type(aiAdjust) == 'number' ? aiAdjust : 0);
		var dNow = new Date();

		if (dNow.getMonth() > 5) {
			return new Date(dNow.getFullYear() + iAdjust, 6, 1);
		}
		else {
			return new Date(dNow.getFullYear() + (iAdjust -1), 6, 1);
		}
	},

	endFinancialYear: function(aiAdjust) 	
	{
		var iAdjust = ($.type(aiAdjust) == 'number' ? aiAdjust : 0);
		var dNow = new Date();

		if (dNow.getMonth() > 5) {
			return new Date(dNow.getFullYear() + (1 + iAdjust), 5, 30);
		}
		else {
			return new Date(dNow.getFullYear() + (iAdjust), 5, 30);
		}
	},

	startMonth: function(asDate) 
	{
		var dNow = new Date();

		if (asDate) {dNow = asDate}
		if ($.type(asDate) === 'string')
		{
			if (isValidDate(asDate))
			{
				dNow = new Date(asDate);
			}
		}

		dNow.setDate((new Date('01' + dNow.toString(' MMM yyyy'))).getDate());
		return new Date(dNow)
	},

	endMonth: function(asDate) 
	{
		var dNow = new Date();

		if (asDate) {dNow = asDate}
		if ($.type(asDate) === 'string')
		{
			if (isValidDate(asDate))
			{
				dNow = new Date(asDate);
			}
		}

		dNow.setMonth(dNow.getMonth() + 1);
		dNow.setDate((new Date('01' + dNow.toString(' MMM yyyy'))).getDate() - 1);
		return new Date(dNow)
	},

	businessPersonSelection: function(oEvent, oElement)
	{	// v1.0.26 moved out to it's own function to allow nsFreshcareSelectGrower to use it as well
		// What it does is to blank out the person if the user chooses another business
		// Based on the premise that if the user has pressed a key while in here, they're trying to search again so
		// when that happens, we clear out the data-id and subsequently the person's value and data-id
		// v3.3.001 Also, if use chooses a person only, the business is automatically populated

		if (oEvent.which != 9) 
		{
			// 9 is the TAb key - if we've pressed oElement, we've moved to a new field and this doesn't apply
			if ($(oElement).attr('data-id') === '') { $(oElement).removeAttr('data-id');}

			if ($(oElement).attr('data-id') != undefined && $(oElement).val() != '') {
				$(oElement).removeAttr('data-id');}

			if ($(oElement).attr('data-click') === "nsFreshcare.util.defaultContactPerson" 
				&& ($(oElement).attr('data-id') === undefined)) 
			{
				
				var sRootElement = oElement.id;
				var sReferenceElement = (sRootElement.indexOf('Reference') > -1) ? sRootElement : sRootElement.replace('Business', 'Reference');
				var sBusinessElement = (sRootElement.indexOf('Business') > -1) ? sRootElement : sRootElement.replace('Reference', 'Business');
				var sPersonElementId = sBusinessElement.replace('Business', 'Person');
				
				if (sRootElement != sBusinessElement) 
				{
					$('#' + sBusinessElement).val('');
					$('#' + sBusinessElement).removeAttr('data-id');
				}

				if (sRootElement != sReferenceElement) 
				{
					$('#' + sReferenceElement).val('');
					$('#' + sReferenceElement).removeAttr('data-id');
				}

				if (sPersonElementId.indexOf('Person') > -1) 
				{
					$('#' + sPersonElementId).val('');
					$('#' + sPersonElementId).removeAttr('data-id');
				}
			}

			if ($(oElement).attr('data-selectGrowerClear') != undefined)
			{
				var fFunction = ns1blankspace.util.toFunction($(oElement).attr('data-selectGrowerClear'));
				fFunction();
			}
		}
	},
	
	defaultContactPerson: function(oParam) 
	{

		// When user chooses a contactbusiness, this will automatically populate the contactperson with the default contactperson
		// Also works if user has searched for the 'Grower' ID (ie: business reference)
		// Assumes that...
		//  - sequence is Reference, Business, Person
		//  - the data-click is called from Business or Reference fields
		//  - must be at least Business & Person fields
		//  - must have the same pattern for the id of the Reference, Business and Person elements and that they contain the words Reference, Business & Person

		var sXHTMLRootID = ns1blankspace.xhtml.divID;
		var sXHTMLBusinessID = (ns1blankspace.xhtml.divID.indexOf('Reference') > -1) ? sXHTMLRootID.replace('Reference', 'Business') : sXHTMLRootID;
		var sXHTMLReferenceID = (ns1blankspace.xhtml.divID.indexOf('Reference') === -1) ? sXHTMLRootID.replace('Business', 'Reference') : sXHTMLRootID;
		var sXHTMLPersonID = sXHTMLBusinessID.replace('Business', 'Person');
		var sBusinessID = $('#' + sXHTMLRootID).attr('data-id');

		var bUpdateBusinessText = false;
		if (oParam) {
			if (oParam.updateBusinessText != undefined) {bUpdateBusinessText = oParam.updateBusinessText}
		}

		if (sBusinessID != undefined && $('#' + sXHTMLPersonID).val() === '') 
		{
			// v3.1.215 SUP023285 Also checks primarycontactperson - it takes precedence over contactbusiness.contactperson
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';
			oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.id' +
							',tradename,id,reference' +
							',contactbusiness.primarycontactperson,contactbusiness.primarycontactpersontext');
			oSearch.addFilter('id', 'EQUAL_TO', sBusinessID);
			
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					oRow = oResponse.data.rows[0];	// If multiple rows returned, we only want the first one.
					var sContactAlias = (oRow['contactbusiness.primarycontactpersontext'] != '') ? 'primarycontactperson' : 'contactperson';
					var sFirstName = (sContactAlias == 'primarycontactperson') ? oRow['contactbusiness.primarycontactpersontext'].split(', ').pop() : oRow['contactbusiness.contactperson.firstname'];
					var sSurname = (sContactAlias == 'primarycontactperson') ? oRow['contactbusiness.primarycontactpersontext'].split(', ').shift() : oRow['contactbusiness.contactperson.surname'];

					if (oRow['contactbusiness.' + sContactAlias + '.firstname'] + oRow['contactbusiness.' + sContactAlias + '.surname'] != '') 
					{
						// v3.1.1 Added data-person and data-surname attributes
						// Populate person field
						$('#' + sXHTMLPersonID).val(sFirstName.formatXHTML() + ' ' + sSurname.formatXHTML());
						$('#' + sXHTMLPersonID).attr('data-firstname', sFirstName.formatXHTML());
						$('#' + sXHTMLPersonID).attr('data-surname', sSurname.formatXHTML());
						$('#' + sXHTMLPersonID).attr('data-id', oRow['contactbusiness.' + sContactAlias + (sContactAlias == 'contactperson' ? '.id' : '')]);

						// Populate Reference field
						if (sXHTMLRootID.indexOf('Business') > -1) {
							$('#' + sXHTMLReferenceID).val(oRow['reference'].formatXHTML());
							$('#' + sXHTMLReferenceID).attr('data-id', oRow['id']);
						}
						else {bUpdateBusinessText = true;}		// Added v1.0.23

						if (bUpdateBusinessText)
						{
							// populate business field
							
							$('#' + sXHTMLBusinessID).val(oRow['tradename'].formatXHTML());
							$('#' + sXHTMLBusinessID).attr('data-id', oRow['id']);

						}

						// See if Person element has a data-click attribute and execute it
						if ($('#' + sXHTMLPersonID).attr('data-click') != undefined) {
							
							var fOnComplete = ns1blankspace.util.toFunction($('#' + sXHTMLPersonID).attr('data-click'));
							ns1blankspace.xhtml.divID = sXHTMLPersonID;
							if (fOnComplete != undefined) {
								fOnComplete();
							}
						}
					}
				}
			});
		}

	},	

	isNumeric: function(oParam)	
	{
		var bZeroValid = true;
		var sValue;

		if (oParam) 
		{
			if ($.type(oParam) === 'object')
			{
				if (oParam.value) {sValue = oParam.value}
				if (oParam.zeroValid != undefined) {bZeroValid = oParam.zeroValid;}
			}
			else
			{
				sValue = oParam;
			}
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

	stringToTitleCase: function(sString)
	{
		var aString = sString.split(' ');
		var aNewString = $.map(aString, function(x) {return x.substr(0,1).toUpperCase() + x.substr(1).toLowerCase()});
		return aNewString.join(' ');
	},

	rowFunction: function(oParam)
	{	// 3.0.1 Added this funciton
		// Call this when using functions on a table row - it will handle the showing / hiding of the 'second click' and then call appropriate update function as passed
		var sXHTMLElementClickID = ns1blankspace.util.getParam(oParam, 'xhtmlElementClickID').value;
		var sRowID = ns1blankspace.util.getParam(oParam, 'rowID').value;
		var aActions = ns1blankspace.util.getParam(oParam, 'clickActions').value; // Can pass array of multiple actions ({context, title, bind}) or clickContext and clickTitle
		var sContext = ns1blankspace.util.getParam(oParam, 'clickContext').value;
		var sTitle = ns1blankspace.util.getParam(oParam, 'clickTitle').value;
		var fBind = ns1blankspace.util.getParam(oParam, 'clickBind').value;
		var aHTML = [];

		if (aActions === undefined)
		{
			aActions = [{context: sContext, title: sTitle, bind: fBind}];
		}

		if (ns1blankspace.xhtml.divID === sXHTMLElementClickID) 
		{
			$(ns1blankspace.xhtml.container).html('');
			$(ns1blankspace.xhtml.container).hide();
			ns1blankspace.xhtml.divID = '';
		}
		else 
		{
			ns1blankspace.xhtml.divID = sXHTMLElementClickID;

			aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;">');
			$.each(aActions, function()
			{
				aHTML.push('<tr><td>' +
							'<span id="ns1blankspace' + this.context + '_' + sRowID + '" class="ns1blankspaceSearch">' + this.title + '</span>' +
							'</td></tr>');
			});
			aHTML.push('</table>');

			$(ns1blankspace.xhtml.container).html(aHTML.join(''));
			$(ns1blankspace.xhtml.container).show();
			$(ns1blankspace.xhtml.container).offset(
			{ 
				top: $('#' + ns1blankspace.xhtml.divID).offset().top,
				left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
			});

			$.each(aActions, function()
			{
				$('#ns1blankspace' + this.context + '_' + sRowID)
					.css('cursor', 'pointer')
					.click(function(event) 
					{
						$(ns1blankspace.xhtml.container).html('');
						$(ns1blankspace.xhtml.container).hide();
						
						fBind(oParam);
					});				
			});

			delete(oParam.clickContext);
			delete(oParam.clickTitle);
			delete(oParam.clickBind);
			delete(oParam.clickActions);
		}
	},

	validateEmail: function (email) 
	{		// v3.1.0e added
    	var bError = true;
    	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    	var aEmail = email.split(';')
    	$.each(aEmail, function()
    	{
	    	bError =  re.test(this.toString());
	    	return bError;
    	});

    	return bError;
	},
			
	getSearchFields: function(oParam)
	{
		var oRoot = ns1blankspace.rootnamespace;
		var xFields = oRoot.data;
		var sFields = ns1blankspace.util.getParam(oParam, 'fields').value;
		var sNameSpace = ns1blankspace.util.getParam(oParam, 'namespace').value;

		if (sNameSpace)
		{
			$.each(sNameSpace.split('.'), function()
			{
				if (xFields[this])
				{
					xFields = xFields[this];
				}
				else 
				{
					xFields = undefined;
					return false;
				}
			});
		}

		if (xFields)
		{
			if ($.type(xFields) == 'function')
			{
				sFields = xFields();
			}
			else if ($.type(xFields) == 'string')
			{
				sFields = xFields;
			}
			else
			{
				sFields = xFields;
			}
		}

		return sFields;
	},

	anyMatchInArray: function (target, toMatch) 
	{
	    "use strict";

	    var found, targetMap, i, j, cur;

	    found = false;
	    targetMap = {};

	    // Put all values in the `target` array into a map, where
	    //  the keys are the values from the array
	    for (i = 0, j = target.length; i < j; i++) {
	        cur = target[i];
	        targetMap[cur] = true;
	    }

	    // Loop over all items in the `toMatch` array and see if any of
	    //  their values are in the map from before
	    for (i = 0, j = toMatch.length; !found && (i < j); i++) {
	        cur = toMatch[i];
	        found = !!targetMap[cur];
	        // If found, `targetMap[cur]` will return true, otherwise it
	        //  will return `undefined`...that's what the `!!` is for
	    }

	    return found;
	},

	arrayCompare: function(arr1, arr2, bMutuallyExclusive)
	{
		var aReturn = [];
		bMutuallyExclusive = ($.type(bMutuallyExclusive) == 'boolean') ? bMutuallyExclusive : true;
		const objMap= {};
		  
		arr1.forEach((e1) => arr2.forEach((e2) => 
			{
				if (!bMutuallyExclusive && objMap[e1] == undefined)
				{
					objMap[e1] = 0;
				}
				if (e1 == e2)
				{
			       objMap[e1] = objMap[e1] + 1 || 1;
			    }
		  	}
		));
		if (bMutuallyExclusive)
		{
			aReturn = (Object.keys(objMap).map(e=>e));
		}
		else
		{
			aReturn = (arr1.length > 0 && arr2.length == 0) 
						? arr1 
						: $.grep(Object.keys(objMap), function(x) {return objMap[x] == 0});
		}

		return aReturn;
	},

	arraySum: function(aaArray, asElement)
	{	// v3.1.209b Added
		var iTotal = 0;

		if (aaArray)
		{
			$.each(aaArray, function(i, row)
			{
				if (asElement)
				{
					iTotal += parseInt(row[asElement]) || 0;
				}
				else
				{
					iTotal += parseInt(row) || 0;
				}
			});
		}
		return iTotal;
	},

	getRoles: function(oParam)
	{
		var oNS = ns1blankspace.util.getParam(oParam, 'nameSpace', {'default': nsFreshcare}).value;
		var aRoleNames = ns1blankspace.util.getParam(oParam, 'roleNames', {'default': []}).value;
		var aReturn = [];

		aReturn = $.map(aRoleNames, function(x) {return (oNS.data.roles[x] != undefined) ? oNS.data.roles[x] : ''});

		return $.grep(aReturn, function(x) {return x!= ''}).join(',');
	},

	roleHasAccess: function(oParam)
	{
		// when array that defines CRUD access for each tab is passed, along with tabs (array) and action for which access is requested
		// returns true or false depeneding on whether current role has access to this
		var sAction = ns1blankspace.util.getParam(oParam, 'action', {'default': 'retrieve'}).value;
		var aTabs = ns1blankspace.util.getParam(oParam, 'tabs').value;
		var aAccess = ns1blankspace.util.getParam(oParam, 'access', {'default': []}).value;		
		var aRoles = $.map(ns1blankspace.user.roles, function(x) {return x.id});

		if ($.type(aAccess) == 'function')
		{
			aAccess = aAccess();
		}
		
		var intersect = function(arr1, arr2)
		{
		    //We need to know which array is the shortest to avoid useless loops
		    if(arr2.length<arr1.length){
		        var temp = arr1;
		        arr1 = arr2;
		        arr2 = temp;
		    }
		    // Now, we are sure arr1 is the shortest
		    var result = [];
		    for(var i = 0; i<arr1.length; i++){
		        if(arr2.indexOf(arr1[i])>-1) result.push(arr1[i]);
		    }
		    return result;
		}

		var aAccessTabs = $.grep(aAccess, function(x) {return $.inArray(x.tab, aTabs) > -1});
		if (aAccessTabs)
		{
			return (intersect(aRoles, $.map(aAccessTabs, function(x) {return x[sAction]})).length > 0)
		}
		else {return false;}

	},

	getTabData: function(oParam)
	{
		var oData = ns1blankspace.util.getParam(oParam, 'data', {'default': {}}).value;
		var sTab = ns1blankspace.util.getParam(oParam, 'tab').value;

		if (sTab != undefined)
		{
			$.each($('#ns1blankspaceMain' + sTab + ' [data-column]'), function()
			{
				var sCol = $(this).attr('data-column');
				var sOrgVal = (ns1blankspace.objectContext == -1) ? "" : ns1blankspace.objectContextData[sCol].formatXHTML();
				
				if ($(this).hasClass('ns1blankspaceSelect'))
				{	
					if (ns1blankspace.objectContext == -1
						|| sOrgVal != $(this).attr('data-id'))
					{	
						oData[sCol] = $(this).attr('data-id');
						oData[sCol + 'text'] = $(this).val(); 
					}
				}
				else if ($(this).attr('type') == 'radio')
				{
					if ($(this).prop('checked'))
					{
						if (ns1blankspace.objectContext == -1
							|| sOrgVal != $(this).val() && $(this).val() != undefined)
						{	oData[sCol] = $(this).val();}
					}
				}
				else if ($(this).is("textarea"))
				{
					if (ns1blankspace.objectContext == -1
						|| sOrgVal.replace(/\r?\n|\r/g, "") != $(this).val().replace(/\r?\n|\r/g, ""))
					{	oData[sCol] = $(this).val();}
				}
				else
				{
					if (ns1blankspace.objectContext == -1
						|| sOrgVal != $(this).val())
					{	oData[sCol] = $(this).val();}
				}
			});
		}
		
		return oData;
	},

	getMonthName: function(iMonth)
	{	// v3.4.015 SUP023959 Added
		var aMonthVals = [];
		$.each(ns1blankspace.data.search, function() 
		{
		 	if (this.method == 'FRESHCARE_MONTH_SEARCH')
		 	{
		 		aMonthVals = this;
		 		return false;
		 	}
		 });
		aMonthVals = (aMonthVals) ? aMonthVals.data : [];
		var sMonth = $.grep(aMonthVals, function(x) {return x.id == iMonth}).shift();
		sMonth = (sMonth) ? sMonth.title : '';
		return sMonth;
	}
}

