/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
$.extend(true, nsFreshcare.setup, 
{
	cartype:
	{
		init: function (oParam) 
		{
			ns1blankspace.app.reset();

			ns1blankspace.object = 217;	
			ns1blankspace.objectName = 'cartype';
			ns1blankspace.objectParentName = 'setup';
			ns1blankspace.objectMethod = 'SETUP_AUDIT_ISSUE_SINTYPE';
			ns1blankspace.objectContextData = undefined;
			ns1blankspace.objectContext = -1;
			ns1blankspace.viewName = 'CAR Types';	

			oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
			oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
			ns1blankspace.app.set(oParam);
		},

		home: 		function (oParam, oResponse)
		{
			if (oResponse == undefined)
			{
				var aHTML = [];
				var dToday = new Date();
							
				aHTML.push('<table class="ns1blankspaceMain">');
				aHTML.push('<tr class="ns1blankspaceMain">' +
								'<td id="ns1blankspaceMostLikely" class="ins1blankspaceMain">' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								'</tr>');
				aHTML.push('</table>');					
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				$('#ns1blankspaceControl').html('');		
				
				var aHTML = [];
							
				aHTML.push('<table>');

				aHTML.push('<tr><td><div id="ns1blankspaceViewMembershipLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
				aHTML.push('<table>');
						
				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_AUDIT_ISSUE_SINTYPE_SEARCH';		
				oSearch.addField('code,title,membership,membershiptext,issuetype,issuetypetext');
				oSearch.sort('membershiptext', 'asc');
				oSearch.sort('issuetypetext', 'asc');
				oSearch.sort('code', 'asc');
				
				oSearch.getResults(function(oResponse) {nsFreshcare.setup.cartype.home(oParam, oResponse)});	
			}
			else
			{
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceNothing">Click New to create a new CAR Type.</td></tr>' +
									'</table>');
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">');
					aHTML.push('<tr>' + 
									'<td class="ns1blankspaceCaption">Membership</td>' +
									'<td class="ns1blankspaceCaption">CAR Severity</td>' +
									'<td class="ns1blankspaceCaption">Code</td>' +
									'<td class="ns1blankspaceCaption">Description</td>' +
								'</tr>');

					$.each(oResponse.data.rows, function()
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_code-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["membershiptext"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["issuetypetext"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["code"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["title"] + '</td>' +
									'</tr>');
					});
					
					aHTML.push('</table>');
				}
				
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					nsFreshcare.setup.cartype.search.send(event.target.id, {source: 1});
				});
			}
		},

		search: 	
		{
			send: 		function (sXHTMLElementId, oParam)
			{
				if (jQuery.type(sXHTMLElementId) === "object") 
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
					oSearch.method = 'SETUP_AUDIT_ISSUE_SINTYPE_SEARCH';
					oSearch.addField('code,title,membership,membershiptext,issuetype,issuetypetext,holdsupcertification,' +
									'createddate,createduser,createdusertext,modifieddate,modifieduser,modifiedusertext');

					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
					oSearch.getResults(function(data) {nsFreshcare.setup.cartype.show(oParam, data)});
				}
				else
				{
					if (sSearchText == undefined)
					{
						sSearchText = $('#ns1blankspaceViewControlSearch').val();
					}	
					
					if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
					{
						ns1blankspace.container.position({xhtmlElementID: sElementId});
						ns1blankspace.search.start();
						
						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_AUDIT_ISSUE_SINTYPE_SEARCH';
						oSearch.addField('membershiptext,issuetypetext,code,issuesintype.sintypecop.codeofpracticetext');
						
						oSearch.addBracket("(");
						if (iSource == ns1blankspace.data.searchSource.browse)
						{
							oSearch.addFilter('code', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('title', 'TEXT_STARTS_WITH', sSearchText);
						}
						else
						{	
							oSearch.addFilter('code', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('title', 'TEXT_IS_LIKE', sSearchText);
						}	
						oSearch.addBracket(')');

						oSearch.sort('code', 'asc');
						oSearch.rf = 'json';
						oSearch.getResults(function(data) {nsFreshcare.setup.cartype.search.process(oParam, data)});
					}
				}	
			},

			process: 	function (oParam, oResponse)
			{
				var iColumn = 0;
				var aHTML = [];
				var	iMaximumColumns = 1;
					
				ns1blankspace.search.stop();
				if (oResponse.data.rows.length == 0)
				{
					$(ns1blankspace.xhtml.searchContainer).html('<table class="ns1blankspaceSearchMedium"><tr><td class="ns1blankspaceSubNote">Nothing to show</td></tr></table>');
					//$(ns1blankspace.xhtml.container).hide();
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
						
						
						// SUP022688 v3.1.1f Now also shows COP
						aHTML.push('<td class="ns1blankspaceSearch" id="code' +
										'-' + this.id + '">' +
										this["membershiptext"] +
									'</td>'); 
						
						aHTML.push('<td class="ns1blankspaceSearch" id="title' +
										'-' + this.id + '">' +
										this["issuetypetext"] + '</td>');
										
						aHTML.push('<td class="ns1blankspaceSearch" id="title' +
										'-' + this.id + '">' +
										this["code"] + '</td>');

						aHTML.push('<td class="ns1blankspaceSearch" id="cop' +
										'-' + this.id +  '">' +
										this['issuesintype.sintypecop.codeofpracticetext'] + '</td>');
										
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
							more: (oResponse.morerows === "true")
						}));		
					
					$('td.ns1blankspaceSearch').click(function(event)
					{
						$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
						$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
						nsFreshcare.setup.cartype.search.send(event.target.id, {source: 1});
					});
					
					ns1blankspace.render.bind(
					{
						columns: 'membershiptext-column-issuetypetext-column-code',
						more: oResponse.moreid,
						startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
						functionSearch: nsFreshcare.setup.cartype.search.send
					});   
					
				}	
			}
		},						

		layout: 	function ()
		{
			var aHTML = [];
			var oContext = {inContext: false};		

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
							
				aHTML.push('<tr><td id="ns1blankspaceControlCOP" class="ns1blankspaceControl">' +
								'Codes of Practice</td></tr>');
							
				aHTML.push('</table>');		
			}
					
			aHTML.push('</table>');					
				
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainCOP" class="ns1blankspaceControlMain"></div>');
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			$('#ns1blankspaceControlSummary').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {all: true}});
				nsFreshcare.setup.cartype.summary();
			});
			
			$('#ns1blankspaceControlDetails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
				nsFreshcare.setup.cartype.details();
			});
			
			$('#ns1blankspaceControlCOP').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainCOP', context: {"new": false, action: true, actionOptions: true}});
				nsFreshcare.setup.cartype.codeOfPractice.show();
				/*nsFreshcare.setup.schemecodes.show(
				{
					name: 'Codes of Practice',
					xhtmlContext: 'COP',
					method: 'SETUP_AUDIT_ISSUE_SINTYPE_COP',
					allowNew: ns1blankspace.user.systemAdmin,
					allowDelete: ns1blankspace.user.systemAdmin,
					allowEdit: false,
					rows: 50,
					advancedSearch:
					{
						fields: 'codeofpractice,codeofpracticetext',
						filters: 
						[
							{
								name: 'sintype',
								comparison: 'EQUAL_TO',
								value1: ns1blankspace.objectContext
							}
						],
						sort: 
						[
							{name: 'codeofpracticetext', direction: 'asc'}
						]
					},
					manage: 
					{
						fields:
						[
							{
								name: 'codeofpracticetext',
								fieldname: 'codeofpractice',
								xhtmlContext: 'CodeOfPractice',
								label: 'Code of Practice',
								type: 'Select',
								mandatory: true,
								inputAttributes: 'data-method=AGRI_CODE_OF_PRACTICE_SEARCH data-columns=membershiptext-space-code'
							}
						]
					}
				});*/
			});
			
		},

		show: 		function (oParam, oResponse)
		{
			var aHTML = [];
			var iStep = 1;

			if (oParam) 
			{
				if (oParam.step) {iStep = oParam.step;}
			}
			else { oParam = {step: 1}}
			
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

			if (iStep === 1) 
			{
				nsFreshcare.setup.cartype.layout();
				$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
			}
			
			if (iStep === 1 && oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find CAR Type.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData['code']);
				$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData['issuetypetext'].formatXHTML() + '</span>');
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.setup.cartype.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.setup.cartype.summary()'});
			}	
		},	
			
		summary: 	function ()
		{
			var aHTML = [];
			
			if (ns1blankspace.objectContextData == undefined)
			{
				aHTML.push('<table><tr><td valign="top">Sorry can\'t find this CAR type.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				aHTML.push('<table class="ns1blankspaceMain">' +
							'<tr class="ns1blankspaceRow">' +
							'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
							'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:170px;"></td>' +
							'</tr>' +
							'</table>');				
				
				$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
			
				var aHTML = [];
			
				aHTML.push('<table class="ns1blankspace">');
				
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['membershiptext'] +
							'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">CAR Severity</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['issuetypetext'] +
							'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Code</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['code'].formatXHTML() +
							'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Description</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['title'].formatXHTML() +
							'</td></tr>');

				aHTML.push('</table>');					
				
				$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

				
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2">');

				aHTML.push('<tr><td><span id="ns1blankspaceMembershipNewCOP" class="ns1blankspaceAction">' +
							'Add COP</span></td></tr>');

				aHTML.push('</table>');					
			
				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

				
				$('#ns1blankspaceMembershipNewCOP')
					.button(
					{
						label: 'Add COP',
						icons: {primary: 'ui-icon-plus'}
					})
					.on("click", function()
					{
						$('td.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
						$('#ns1blankspaceControlCOP').addClass('ns1blankspaceHighlight');
						ns1blankspace.show({selector: '#ns1blankspaceMainCOP', context: {"new": false, action: true, actionOptions: true}});
						nsFreshcare.setup.cartype.codeOfPractice.show({add: true});
					});
			}	
		},

		details: 	function ()
		{
			var aHTML = [];
			
			if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
			{
				$('#ns1blankspaceMainDetails').attr('data-loading', '');
				
				aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2" style="width:250px;"></td>' +
								'</tr>' + 
								'</table>');					
				
				$('#ns1blankspaceMainDetails').html(aHTML.join(''));
				
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspace">');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Membership' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsMembership" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="Membership"' +
									' data-method="AGRI_MEMBERSHIP_SEARCH">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'CAR Severity' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsSeverity" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="CAR Severity"' +
									' data-method="SETUP_AUDIT_ISSUE_TYPE_SEARCH">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Code' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsCode" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Code">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Description' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsDescription" class="ns1blankspaceText" maxlength="300"' +
									' data-mandatory="1" data-caption="Description">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Holds up Certification?' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioHoldsUpCertY" name="radioHoldsUpCert"' +
									' data-mandatory="1" data-caption="Holds up Certification?" value="Y"/>Yes&nbsp;' +
								'<input type="radio" id="radioHoldsUpCertN" name="radioHoldsUpCert"' +
									' data-mandatory="1" data-caption="Holds up Certification?" value="N"/>No' +
								'</td></tr>');			
					
				aHTML.push('</table>');					
				
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
				
				if (ns1blankspace.objectContextData != undefined)
				{
					$('#ns1blankspaceDetailsMembership').val(ns1blankspace.objectContextData['membershiptext'].formatXHTML());
					$('#ns1blankspaceDetailsMembership').attr('data-id', ns1blankspace.objectContextData['membership']);
					$('#ns1blankspaceDetailsSeverity').val(ns1blankspace.objectContextData['issuetypetext'].formatXHTML());
					$('#ns1blankspaceDetailsSeverity').attr('data-id', ns1blankspace.objectContextData['issuetype'].formatXHTML());
					$('#ns1blankspaceDetailsCode').val(ns1blankspace.objectContextData['code'].formatXHTML());
					$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData['title']);
					$('[name="radioHoldsUpCert"][value="' + ns1blankspace.objectContextData["holdsupcertification"] + '"]').attr('checked', true);

				}
				else
				{
					$('[name="radioHoldsUpCert"][value="N"]').attr('checked', true);

				}			
			}	
		},

		codeOfPractice: 
		{
			search: function(oParam)
			{
				ns1blankspace.objectContextData.codesOfPractice = [];

				var oSearch = new AdvancedSearch()
				oSearch.method = 'SETUP_AUDIT_ISSUE_SINTYPE_COP_SEARCH';
				oSearch.addField('codeofpractice,codeofpracticetext');
				oSearch.addFilter('sintype', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.sort('codeofpracticetext', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						if (oResponse.data.rows.length > 0)
						{
							ns1blankspace.objectContextData.codesOfPractice = oResponse.data.rows;
							oParam.response = oResponse;
						}

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
			},

			show: function(oParam)
			{
				var aHTML = [];
				var oResponse;
				var bAddCOP = ns1blankspace.util.getParam(oParam, 'add', {"default": false}).value;
				if (oParam === undefined) {oParam = {}}

				if (ns1blankspace.objectContextData.codesOfPractice === undefined)
				{
					oParam.onComplete = nsFreshcare.setup.cartype.codeOfPractice.show;
					nsFreshcare.setup.cartype.codeOfPractice.search(oParam);
				}
				else
				{
					$('#ns1blankspaceMainCOP').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceCOPColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceCOPColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainCOP').html(aHTML.join(''));
					
					var aHTML = [];
				

					aHTML.push('<table id="ns1blankspaceMembershipCOP" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Code of Practice</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(ns1blankspace.objectContextData.codesOfPractice, function() 
					{

						aHTML.push('<tr id="ns1blankspaceCOPRow_' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow"' + 
										' id="ns1blankspaceCOPCode_' + this.id + 
										'">' +
											this["codeofpracticetext"] + 
										'</td>');

						aHTML.push('<td><span id="ns1blankspaceCOPRemove_' + this.id + '" ' + 
										'class="ns1blankspaceAction ns1blankspaceCOPRemove" ' + 
										'data-rowID="' + this.id + '"></span>' + 
										'</td>');
					});

					aHTML.push('</table>');

					$('#ns1blankspaceCOPColumn1').html(aHTML.join(''));

					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('<tr><td><span id="ns1blankspaceCOPAdd" class="ns1blankspaceAction" colspan="2"></span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceCOPColumn2').html(aHTML.join(''));

					$('.ns1blankspaceCOPRemove')
						.button(
						{
							icons: {primary: "ui-icon-close"}
						})
						.click(function(event) 
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

								var iRowID = ($(this).attr("data-rowID")) ? $(this).attr("data-rowID") : 'New';
								
								var aHTML = [];

								aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;"><tr>' +
											'<td><span id="ns1blankspaceCOPInactivate_' + iRowID + '" class="ns1blankspaceSearch">Remove</span></td>' +
											'</tr></table>');

								$(ns1blankspace.xhtml.container).html(aHTML.join(''));
								$(ns1blankspace.xhtml.container).show();
								$(ns1blankspace.xhtml.container).offset(
								{ 
									top: $('#' + ns1blankspace.xhtml.divID).offset().top,
									left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
								});

								$('#ns1blankspaceCOPInactivate_' + iRowID).click(function(event) 
								{

									var sID = $(this).attr('id').split('_')[1];
									$(ns1blankspace.xhtml.container).html('');
									$(ns1blankspace.xhtml.container).hide();
									
									nsFreshcare.setup.cartype.codeOfPractice.remove.validate({id: sID, 
																			confirmed: true, 
																			onComplete: nsFreshcare.setup.cartype.codeOfPractice.remove.send});
								})
								.css('cursor', 'pointer');

							}

						})
						.css('width', '25px')
						.css('height', '25px');
						
					$('#ns1blankspaceCOPAdd')
						.button(
						{
							label: 'Add COP',
							icons: {
								primary: "ui-icon-plus"
							}
						})
						.click(function() 
						{
							nsFreshcare.setup.cartype.codeOfPractice.add();
						});

					if (bAddCOP)
					{
						$('#ns1blankspaceCOPAdd').click();	
					}
				}
			},

			add: function(oParam)
			{
				var aHTML = [];

				aHTML.push('<tr id="ns1blankspaceMembershipCOP_New">' + 
							'<td class="ns1blankspaceRow">' +
							'<input id="ns1blankspaceCOPCode_New" class="ns1blankspaceSelect" ' +
								' data-method="AGRI_CODE_OF_PRACTICE_SEARCH" ' +
								' data-columns="code"' + 
								' data-methodFilter="code-TEXT_IS_LIKE|' +
													'membership-EQUAL_TO-' + ns1blankspace.objectContextData.membership + '|' + 
													'id-NOT_IN_LIST-' + $.map(ns1blankspace.objectContextData.codesOfPractice, function(x) {return x.codeofpractice}).join(',') + 
								'">' + 
							'</td>' +
							'<td><span id="ns1blankspaceMembershipCOPSave" class="ns1blankspaceAction">Save</span></td>' +
							'</tr>');

				$('#ns1blankspaceMembershipCOP').children().children().first().after(aHTML.join(''));
				$('#ns1blankspaceMembershipCOPSave')
					.button(
					{
						text: false,
						icons: {primary: 'ui-icon-disk'}
					})
					.css('width', '20px')
					.css('height', '20px')
					.click(function(event) 
					{
						nsFreshcare.setup.cartype.codeOfPractice.save.send({onComplete: nsFreshcare.setup.cartype.codeOfPractice.show, refresh: true});
					});
			},

			save: 
			{
				send: function(oParam)
				{
					var sData = '';

					if ($('#ns1blankspaceCOPCode_New').attr('data-id') != undefined && $('#ns1blankspaceCOPCode_New').attr('data-id') != '')
					{
						if ($.grep(ns1blankspace.objectContextData.codesOfPractice, function(x) {return x.codeofpractice === $('#ns1blankspaceCOPCode_New').attr('data-id')}).length === 0)
						{
							sData += '&codeofpractice=' + ns1blankspace.util.fs($('#ns1blankspaceCOPCode_New').attr('data-id')) +
									'&sintype=' + ns1blankspace.util.fs(ns1blankspace.objectContext);

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_AUDIT_ISSUE_SINTYPE_COP_MANAGE'),
								data: sData,
								rf: 'json',
								success: function(oResponse)
								{
									if (oResponse.status === 'OK')
									{
										ns1blankspace.status.message('COP Linked.');
										delete(ns1blankspace.objectContextData.codesOfPractice);
										nsFreshcare.setup.cartype.codeOfPractice.show();
									}
									else
									{
										ns1blankspace.status.error('COP not linked: ' + oResponse.error.errornotes);
									}
								}
							});
						}
						else
						{
							ns1blankspace.status.error('COP has already been added.');
						}
					}
					else
					{
						$('#ns1blankspaceMembershipCOP_New').remove();
					}
				}
			},

			remove:
			{
				validate: function(oParam)
				{
					// First, check if COP is in use and then remove if not...
					var sID = ns1blankspace.util.getParam(oParam, 'id', {"default": ''}).value;
					var bInUse = ns1blankspace.util.getParam(oParam, 'inUse').value;

					if (sID != '')
					{
						if (bInUse === undefined)
						{
							ns1blankspace.status.working('Checking if CAR Type already used for this COP...');

							var oSearch = new AdvancedSearch();
							oSearch.method = 'AUDIT_ISSUE_SEARCH';
							oSearch.addField('reference');
							oSearch.addFilter('sintype', 'EQUAL_TO', ns1blankspace.objectContext);
							oSearch.addFilter('auditissue.audit.codeofpractice', 'EQUAL_TO', sID);
							oSearch.rows = 1;
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.inUse = (oResponse.data.rows.length > 0);
									nsFreshcare.setup.cartype.codeOfPractice.remove.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error checking is CAR Type used: ' + oResponse.error.errornotes);
								}
							});
						}
						else
						{
							ns1blankspace.status.clear();
							if (bInUse === true)
							{
								if (oParam.onComplete)
								{
									ns1blankspace.util.onComplete(oParam);
								}
							}					
							else
							{
								ns1blankspace.status.error('Cannot remove COP as there is already a CAR with this CAR Type for this COP.');
							}
						}
					}
					else
					{
						ns1blankspace.status.message('No id passed to remove function. Cannot remove row.');
					}
				},

				send: function(oParam)
				{
					var sID = ns1blankspace.util.getParam(oParam, 'id', {"default": ''}).value;

					if (sID != '')
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('SETUP_AUDIT_ISSUE_SINTYPE_COP_MANAGE'),
							data: 'id=' + sID + '&remove=1',
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('COP sucessfully unlinked.');
									ns1blankspace.objectContextData.codesOfPractice = $.grep(ns1blankspace.objectContextData.codesOfPractice, function(x) {return x.id != sID});
									$('#ns1blankspaceCARRow_' + sID).remove();
									delete(ns1blankspace.objectContextData.codesOfPractice);
									nsFreshcare.setup.cartype.codeOfPractice.show(oParam);
								}
								else
								{
									ns1blankspace.status.error('Unable to unlink COP: ' + oResponse.error.errornotes);
								}
							}
						});
					}
								
				}
			}
		},

		save:
		{
			validate: function(oParam)
			{
				// Check that mandatory fields have been entered
				$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
				{
					if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
						return false;
					}
				});

				if (ns1blankspace.okToSave)
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

				if (oParam)
				{
					if (oParam.carSaveStep === undefined) {oParam.carSaveStep = 1}
				}
				else {oParam = {carSaveStep: 1}}

				// Validate entry
				if (oParam.carSaveStep === 1)
				{
					ns1blankspace.okToSave = true;
					oParam.onComplete = nsFreshcare.setup.cartype.save.send;
					oParam.carSaveStep = 2;
					nsFreshcare.setup.cartype.save.validate(oParam);
				}
				
				// Save record
				else if (oParam.carSaveStep === 2)
				{
					// v3.1.1g SUP022688 was saving id of description instead of val()
					sData += 'id=' + ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '') +
							'&membership=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsMembership').attr('data-id')) +
							'&issuetype=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSeverity').attr('data-id')) +
							'&code=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCode').val().formatXHTML()) +
							'&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDescription').val().formatXHTML()) +
							'&holdsupcertification=' + ns1blankspace.util.fs($('input[name="radioHoldsUpCert"]:checked').val());

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('SETUP_AUDIT_ISSUE_SINTYPE_MANAGE'),
						data: sData,
						rf: 'json',
						success: function(oResponse)
						{
							delete(oParam.carSaveStep);
							if (oResponse.status === 'OK')
							{
								ns1blankspace.inputDetected = false;
								var bNew = (ns1blankspace.objectContext === -1)

								ns1blankspace.status.message('CAR Type ' + (bNew ? 'added' : 'saved') + '.');
								ns1blankspace.objectContext = oResponse.id;
								if (bNew)
								{
									nsFreshcare.setup.cartype.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext});
								}
							}
							else
							{
								ns1blankspace.status.error('CAR Type not ' + (bNew ? 'added' : 'saved') + ': ' + oResponse.error.errornotes);
							}
						}
					});
				}
			}
		}
	}
});