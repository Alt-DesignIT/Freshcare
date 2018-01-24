/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
$.extend(true,nsFreshcare.setup, 
{
	membership:
	{
		init: function (oParam) 
		{
			ns1blankspace.app.reset();

			ns1blankspace.object = 93;	
			ns1blankspace.objectName = 'membership';
			ns1blankspace.objectParentName = 'setup';
			ns1blankspace.objectMethod = 'AGRI_MEMBERSHIP';
			ns1blankspace.objectContextData = undefined;
			ns1blankspace.objectContext = -1;
			ns1blankspace.viewName = 'Memberships';	

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
				oSearch.method = 'AGRI_MEMBERSHIP_SEARCH';		
				oSearch.addField('agrimembership.reference,agrimembership.code,agrimembership.title');
				oSearch.sort('agrimembership.reference', 'asc');
				
				oSearch.getResults(function(oResponse) {nsFreshcare.setup.membership.home(oParam, oResponse)});	
			}
			else
			{
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceNothing">Click New to create a new Membership.</td></tr>' +
									'</table>');
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">');
					aHTML.push('<tr>' + 
									'<td class="ns1blankspaceCaption">Code</td>' +
									'<td class="ns1blankspaceCaption">Title</td>' +
								'</tr>');

					$.each(oResponse.data.rows, function()
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_code-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["agrimembership.code"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["agrimembership.title"] + '</td>' +
									'</tr>');
					});
					
					aHTML.push('</table>');
				}
				
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					nsFreshcare.setup.membership.search.send(event.target.id, {source: 1});
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
					oSearch.method = 'AGRI_MEMBERSHIP_SEARCH';
					oSearch.addField('agrimembership.reference,agrimembership.code,agrimembership.title,agrimembership.priorityorder,agrimembership.status' +
										',agrimembership.statustext,agrimembership.jasanzaccredited');
										/*'agrimembership.amount,agrimembership.renewalamount,agrimembership.secondarymembershipfee,agrimembership.trainerroyaltyrate,' +
										'agrimembership.certificationroyaltyrate,');*/
										
					oSearch.addField(ns1blankspace.extend.elements());

					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
					oSearch.getResults(function(data) {nsFreshcare.setup.membership.show(oParam, data)});
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
						oSearch.method = 'AGRI_MEMBERSHIP_SEARCH';
						oSearch.addField('agrimembership.code,agrimembershiptitle');
						
						oSearch.addBracket("(");
						if (iSource == ns1blankspace.data.searchSource.browse)
						{
							oSearch.addFilter('agrimembership.code', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('agrimembership.title', 'TEXT_STARTS_WITH', sSearchText);
						}
						else
						{	
							oSearch.addFilter('agrimembership.code', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('agrimembership.title', 'TEXT_IS_LIKE', sSearchText);
						}	
						oSearch.addBracket(')');

						oSearch.sort('agrimembership.title', 'asc');
						oSearch.rf = 'json';
						oSearch.getResults(function(data) {nsFreshcare.setup.membership.search.process(oParam, data)});
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
						
						aHTML.push('<td class="ns1blankspaceSearch" id="code' +
										'-' + this.id + '">' +
										this["agrimembership.code"] +
									'</td>'); 
						
						aHTML.push('<td class="ns1blankspaceSearch" id="title' +
										'-' + this.id + '">' +
										this["agrimembership.title"] + '</td>');
										
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
						nsFreshcare.setup.membership.search.send(event.target.id, {source: 1});
					});
					
					ns1blankspace.render.bind(
					{
						columns: 'agrimembership.code-space-agrimembership.title',
						more: oResponse.moreid,
						startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
						functionSearch: nsFreshcare.setup.membership.search.send
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
							
				aHTML.push('<tr><td id="ns1blankspaceControlFees" class="ns1blankspaceControl">' +
								'Fees</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlCOP" class="ns1blankspaceControl">' +
								'Codes of Practice</td></tr>');
							
				aHTML.push('</table>');		
			}
					
			aHTML.push('</table>');					
				
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainFee" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainCOP" class="ns1blankspaceControlMain"></div>');
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			$('#ns1blankspaceControlSummary').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {all: true}});
				nsFreshcare.setup.membership.summary();
			});
			
			$('#ns1blankspaceControlDetails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
				nsFreshcare.setup.membership.details();
			});
			
			$('#ns1blankspaceControlFees').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainFee', refresh: true, context: {"new": false, action: true, actionOptions: true}});
				nsFreshcare.setup.membership.fees.show();
			});
			
			$('#ns1blankspaceControlCOP').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainCOP', context: {"new": false, action: true, actionOptions: true}});
				nsFreshcare.setup.membership.codeOfPractice.show();
			});


			ns1blankspace.extend.layout();
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
				nsFreshcare.setup.membership.layout();
				$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
			}
			
			if (iStep === 1 && oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find membership.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				// Get default COP
				if (iStep === 1) 
				{
					ns1blankspace.objectContextData = oResponse.data.rows[0];
					
					oParam.step = 10;
					oParam.defaultOnly = true;
					oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.setup.membership.show);
					nsFreshcare.setup.membership.codeOfPractice.search(oParam);
				}

				// Display
				else if (iStep === 10)
				{
					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData['agrimembership.title']);
					$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData['agrimembership.title'].formatXHTML() + '</span>');
					ns1blankspace.history.view({
						newDestination: 'nsFreshcare.setup.membership.init({id: ' + ns1blankspace.objectContext + '})',
						move: false
						});
					
					ns1blankspace.history.control({functionDefault: 'nsFreshcare.setup.membership.summary()'});
				}
			}	
		},	
			
		summary: 	function ()
		{
			var aHTML = [];
			
			if (ns1blankspace.objectContextData == undefined)
			{
				aHTML.push('<table><tr><td valign="top">Sorry can\'t find this membership.</td></tr></table>');
						
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
				
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Code</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agrimembership.code'] +
							'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Title</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agrimembership.title'] +
							'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Status</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['agrimembership.statustext'].formatXHTML() +
							'</td></tr>');

				if (ns1blankspace.data.defaultCOPText != '')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Default COP</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.data.defaultCOPText +
								'</td></tr>');
				}				
				else
				{
					aHTML.push('<tr><td class="ns1blankspaceSummarySummary">No Codes of Practice for this Membership</td></tr>');
				}

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
						nsFreshcare.setup.membership.codeOfPractice.show({newCOP: true});
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
				
				if (ns1blankspace.objectContext !== -1)
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Reference' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="nsFreshcareReadOnly">' +
										 ns1blankspace.objectContextData['agrimembership.reference'].formatXHTML() +
									'</td></tr>');			
				}

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
								'Title' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Title">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Priority Order' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsPriorityOrder" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Priority Order">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Status' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsStatus" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="Status"' +
									' data-method="SETUP_AGRI_MEMBERSHIP_STATUS_SEARCH">' +
								'</td></tr>');			
				/*	
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Initial Certification Fee $' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsCertFeeInitial" class="ns1blankspaceText"' +
									' data-numeric="1" data-caption="Initial Certification Fee">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Renewal Certification Fee $' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsCertFeeRenewal" class="ns1blankspaceText"' +
									' data-numeric="1" data-caption="Renewal Certification Fee">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Secondary Membership Fee $' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsSecondaryCertFee" class="ns1blankspaceText"' +
									' data-numeric="1" data-caption="Secondary Membership Fee">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Trainer Royalty Rate $' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsTrainerRoyalty" class="ns1blankspaceText"' +
									' data-numeric="1" data-caption="Trainer Royalty Rate">' +
								'</td></tr>');			
					
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Certification Body Royalty Rate $' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsAuditorRoyalty" class="ns1blankspaceText"' +
									' data-numeric="1" data-caption="Certification Body Royalty Rate">' +
								'</td></tr>');			
				*/	
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'JASANZ Accreddited?' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
									'<input type="radio" id="radioJASANZY" name="radioJASANZ" value="Y"/>Yes&nbsp;&nbsp;' +
									'<input type="radio" id="radioJASANZN" name="radioJASANZ" value="N"/>No' +
								'</td></tr>');			
					
				aHTML.push('</table>');					
				
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
				
				if (ns1blankspace.objectContextData != undefined)
				{
					$('#ns1blankspaceDetailsCode').val(ns1blankspace.objectContextData['agrimembership.code'].formatXHTML());
					$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData['agrimembership.title'].formatXHTML());
					$('#ns1blankspaceDetailsPriorityOrder').val(ns1blankspace.objectContextData['agrimembership.priorityorder'].formatXHTML());
					$('#ns1blankspaceDetailsStatus').val(ns1blankspace.objectContextData['agrimembership.statustext']);
					$('#ns1blankspaceDetailsStatus').attr('data-id', ns1blankspace.objectContextData['agrimembership.status']);
					//$('#ns1blankspaceDetailsCertFeeInitial').val(ns1blankspace.objectContextData['agrimembership.amount']);
					//$('#ns1blankspaceDetailsCertFeeRenewal').val(ns1blankspace.objectContextData['agrimembership.renewalamount'].formatXHTML());
					//$('#ns1blankspaceDetailsSecondaryCertFee').val(ns1blankspace.objectContextData['agrimembership.secondarymembershipfee'].formatXHTML());
					//$('#ns1blankspaceDetailsTrainerRoyalty').val(ns1blankspace.objectContextData['agrimembership.trainerroyaltyrate'].formatXHTML());
					//$('#ns1blankspaceDetailsAuditorRoyalty').val(ns1blankspace.objectContextData['agrimembership.certificationroyaltyrate'].formatXHTML());
					$('[name="radioJASANZ"][value="' + ns1blankspace.objectContextData["agrimembership.jasanzaccredited"] + '"]').attr('checked', true);

				}
				else
				{
					$('[name="radioJASANZ"][value="N"]').attr('checked', true);

				}			
			}	
		},

		fees: 
		{
			search: function(oParam)
			{
				if (nsFreshcare.data.membershipFees == undefined)
				{
					var oSearch = new AdvancedSearch()
					oSearch.method = 'SETUP_AGRI_MEMBERSHIP_FEE_TYPE_SEARCH';
					oSearch.addField('title'),
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							nsFreshcare.data.membershipFees = oResponse.data.rows;
							nsFreshcare.setup.membership.fees.search(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find Membership Fee Types: ' + oResponse.error.errornotes);
						}
					});
				}

				else 
				{
					var oSearch = new AdvancedSearch()
					oSearch.method = 'AGRI_MEMBERSHIP_FEE_SEARCH';
					oSearch.addField('type,typetext,amount,fromdate,todate,membership');
					oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.sort('typetext', 'asc');
					oSearch.sort('fromdate', 'desc');
					oSearch.rows = 100;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.response = oResponse;
							ns1blankspace.objectContextData.fees = oResponse.data.rows;

							if (oParam.onComplete)
							{
								ns1blankspace.util.onComplete(oParam);
							}
						}
						else
						{
							ns1blankspace.status.error('Unable to find Membership Fees: ' + oResponse.error.errornotes);
						}
					});
				}
			},

			show: function(oParam)
			{
				if (oParam === undefined) {oParam = {}}
				var aHTML = [];
				var oResponse;

				if (ns1blankspace.objectContextData.fees == undefined)
				{
					oParam.onComplete = nsFreshcare.setup.membership.fees.show;
					nsFreshcare.setup.membership.fees.search(oParam);
				}
				else
				{
					if (oResponse === undefined) 
					{
						oResponse = oParam.response;
					}

					$('#ns1blankspaceMainFee').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceFeeColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceFeeColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainFee').html(aHTML.join(''));
					
					var aHTML = [];
				

					aHTML.push('<table id="ns1blankspaceMembershipFee" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Fee Type</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Amount</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">From</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">To</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(ns1blankspace.objectContextData.fees, function() 
					{
						if (this.id != "")
						{
							aHTML.push('<tr id="ns1blankspaceFeeRow_' + this.id + '" data-rowID="' + this.id + '">');
							
							aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipFee"' + 
											' id="ns1blankspaceFeeType_' + this.id + 
											'">' +
												this.typetext + 
											'</td>');

							aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipFee"' + 
											' id="ns1blankspaceFeeDescription_' + this.id + 
											'">' +
												'$' + this.amount + 
											'</td>');

							aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipFee"' + 
											' id="ns1blankspaceFeeDefault_' + this.id + '"' +
											'">' +
												this.fromdate + 
											'</td>');
							
							aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipFee"' + 
											' id="ns1blankspaceFeeOrder_' + this.id + '"' +
											'">' +
												this.todate + 
											'</td>');

							aHTML.push('<td><span id="ns1blankspaceFeeRemove_' + this.id + '" ' + 
											'class="ns1blankspaceAction ns1blankspaceFeeRemove" ' + 
											'data-rowID="' + this.id + '"></span>' + 
											'</td>');
						}
					});

					aHTML.push('</table>');

					$('#ns1blankspaceFeeColumn1').html(aHTML.join(''));

					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('<tr><td><span id="ns1blankspaceFeeAdd" class="ns1blankspaceAction" colspan="2"></span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceFeeColumn2').html(aHTML.join(''));

					// When click on row, shows Fee details (and can edit) below.
					$('.ns1blankspaceRowMembershipFee').click(function(event) 
					{

						var sElementId = this.id.split('_').pop();
						var oThisFee = $.grep(ns1blankspace.objectContextData.fees, function(a) {return a.id == sElementId});

						nsFreshcare.setup.membership.fees.manage({add: false, 
															edit: true, 
															rowID: sElementId});

						if (oThisFee.length === 1) { 
							
							oThisFee = oThisFee[0];
							
							var oParam = 
							{
								xhtmlElementID: 'ns1blankspaceMembershipFeeColumn1',
								thisFee: oThisFee,
								edit: true
							}

							nsFreshcare.setup.membership.fees.details(oParam);
						}
						else 
						{
							$('#ns1blankspaceMembershipFeeColumn1').html('Fee details not found.');
						}
					});

					$('.ns1blankspaceFeeRemove')
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
											'<td><span id="ns1blankspaceFeeInactivate_' + iRowID + '" class="ns1blankspaceSearch">Remove</span></td>' +
											'</tr></table>');

								$(ns1blankspace.xhtml.container).html(aHTML.join(''));
								$(ns1blankspace.xhtml.container).show();
								$(ns1blankspace.xhtml.container).offset(
								{ 
									top: $('#' + ns1blankspace.xhtml.divID).offset().top,
									left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
								});

								$('#ns1blankspaceFeeInactivate_' + iRowID).click(function(event) 
								{

									var sID = $(this).attr('id').split('_').pop();
									$(ns1blankspace.xhtml.container).html('');
									$(ns1blankspace.xhtml.container).hide();
									
									nsFreshcare.setup.membership.fees.remove.send({id: sID, 
																			confirmed: true, 
																			onComplete: nsFreshcare.setup.membership.fees.remove.send});
								});

							}

						})
						.css('width', '25px')
						.css('height', '25px');
						
					$('#ns1blankspaceFeeAdd')
						.button(
						{
							label: 'Add Fee',
							icons: {
								primary: "ui-icon-plus"
							}
						})
						.click(function() 
						{
							nsFreshcare.setup.membership.fees.manage({add: true});

							if ($('#ns1blankspaceMembershipFeeActionContainer').children().length > 0) 
							{
								nsFreshcare.setup.membership.fees.details({xhtmlElementID: "ns1blankspaceMembershipFeeColumn1"});
							}
						});

				}
			},

			manage: function(oParam)
			{
				var bContinue = true;
				var sRowID = ns1blankspace.util.getParam(oParam, 'rowID').value;
				var bAdd = ns1blankspace.util.getParam(oParam, 'add', {"default": false}).value;

				// Work out if we scrap what's there already. If they're already adding a new one, don't do anything, otherwise, start again
				if ($('#ns1blankspaceMembershipFeeActionContainer').is('*')) 
				{
					if ($('#ns1blankspaceMembershipFeeMembership').attr('data-rowID') === '-1')
					{
						if (!bAdd) 
						{		// We were adding and now we've decided to view an existing one
							bContinue = confirm("Are you sure you want to cancel adding the Fee?");
						}
						else 
						{		// We were adding and now have clicked Add Fee again - remove the row (essentially cancel)
							$('#ns1blankspaceMembershipFeeActionContainer').remove();
							bContinue = false;
						}
					}
					else 
					{
						$('#ns1blankspaceMembershipFeeActionContainer').remove();
						bContinue = false;
					}
				}  

				if (bContinue) 
				{
					
					var aHTML = [];

					aHTML.push('<tr id="ns1blankspaceMembershipFeeActionContainer" data-rowID="' + sRowID + '">' +
									'<td id="ns1blankspaceMembershipFeeActionManage"' +
										' colspan="' + $('#ns1blankspaceMembershipFee').children().children().first().children().length + '">');
					aHTML.push('<table id="ns1blankspaceMembershipFeeManage" class="ns1blankspaceContainer nsFreshcareDetails ns1blankspaceBorder">');

					aHTML.push('<tr>' + 
								'<td id="ns1blankspaceMembershipFeeColumn1" class="ns1blankspaceColumn1" style="width:75%;"></td>' +
								'<td id="ns1blankspaceMembershipFeeColumn2" class="ns1blankspaceColumn2"></td>' +
								'</tr>');

					aHTML.push('</table>');
					aHTML.push('</td></tr>');

					if (bAdd) 
					{
						$('#ns1blankspaceMembershipFee').children().children().first().before(aHTML.join(''));
					}
					else 
					{
						$('#ns1blankspaceFeeRow_' + sRowID).after(aHTML.join(''));
					}

					aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('<tr><td>');
					aHTML.push('<span id="ns1blankspaceMembershipFeeSave" class="ns1blankspaceAction" colspan="2">Save</span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceMembershipFeeColumn2').html(aHTML.join(''));

					$('#ns1blankspaceMembershipFeeSave')
						.button(
						{
							label: 'Save',
							icons: {primary: 'ui-icon-disk'}
						})
						.click(function(event) 
						{
							nsFreshcare.setup.membership.fees.save.send({onComplete: nsFreshcare.setup.membership.fees.show, refresh: true});
						});
				}
			},

			details: function(oParam)
			{
				var aHTML = [];
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {"default": ''}).value;
				var bCanEdit = ns1blankspace.util.getParam(oParam, 'edit', {"default": true}).value;
				var oThisFee = ns1blankspace.util.getParam(oParam, 'thisFee').value;

				aHTML = [];

				aHTML.push('<table class="ns1blankspace">');

				aHTML.push('<tr class="ns1blankspace" style="display:none;">' +
								'<td id="ns1blankspaceMembershipFeeId" class="nsFreshcareReadOnly">' +
								'</td></tr>');		

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Fee Type' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
									'<input type="radio" id="radioFeeType1" name="radioFeeType"' +
										' value="' + $.map($.grep(nsFreshcare.data.membershipFees, function(x) {return x.title == 'Certification Body Royalty Rate'}), function(y) {return y.id}).shift() + '"/>' +
										'Certification Body Royalty Rate<br />' +
									'<input type="radio" id="radioFeeType2" name="radioFeeType"' +
										' value="' + $.map($.grep(nsFreshcare.data.membershipFees, function(x) {return x.title == 'Renewal Certification Fee'}), function(y) {return y.id}).shift() + '"/>' +
										'Certification Renewal Fee<br />' +
									'<input type="radio" id="radioFeeType3" name="radioFeeType"' +
										' value="' + $.map($.grep(nsFreshcare.data.membershipFees, function(x) {return x.title == 'Secondary Membership Fee'}), function(y) {return y.id}).shift() + '"/>' +
										'Secondary Membership Fee<br />' +
									'<input type="radio" id="radioFeeType4" name="radioFeeType"' +
										' value="' + $.map($.grep(nsFreshcare.data.membershipFees, function(x) {return x.title == 'Trainer Royalty Rate'}), function(y) {return y.id}).shift() + '"/>' +
										'Trainer Royalty Rate' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Amount' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipFeeAmount" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Amount">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Date From' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceDate">' +
								'<input id="ns1blankspaceMembershipFeeFrom" class="ns1blankspaceDate"' +
								' data-mandatory="1" data-caption="Date From">' +
								'</td></tr>');		

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Date To' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceDate">' +
								'<input id="ns1blankspaceMembershipFeeTo" class="ns1blankspaceDate"' +
								'</td></tr>');			

				aHTML.push('</table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));
				$('.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

				if (oThisFee != undefined) 
				{	
					$('#ns1blankspaceMembershipFeeId').html(oThisFee.id);
					$('#ns1blankspaceMembershipFeeAmount').val(oThisFee.amount);
					$('#ns1blankspaceMembershipFeeFrom').val(oThisFee.fromdate);
					$('#ns1blankspaceMembershipFeeTo').val(oThisFee.todate);
					$('[name="radioFeeType"][value="' + oThisFee.type + '"]').attr('checked', true);

				}
			},

			save: 
			{
				validate: function(oParam)
				{
					// Check that mandatory fields have been entered
					$('#ns1blankspaceMembershipFeeColumn1 input[data-mandatory]').each(function() 
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
						// Check user has selected a Fee Type
						if ($('[name="radioFeeType"]:checked').length == 0)
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message('Fee Type must be selected.');
							return false;
						}
					}

					// Ensure Date From is less than Date To

					// Ensure Date from is greater than the previous record's Date To

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
					var oData = {};

					if (oParam)
					{
						if (oParam.feeSaveStep === undefined) {oParam.feeSaveStep = 1}
					}
					else {oParam = {feeSaveStep: 1}}

					// Validate entry
					if (oParam.feeSaveStep === 1)
					{
						ns1blankspace.okToSave = true;
						oParam.onComplete = nsFreshcare.setup.membership.fees.save.send;
						oParam.feeSaveStep = 2;
						nsFreshcare.setup.membership.fees.save.validate(oParam);
					}
					
					// Save record
					else if (oParam.feeSaveStep === 2)
					{
						if ($('#ns1blankspaceMembershipFeeId').html() != '')
						{
							oData.id = $('#ns1blankspaceMembershipFeeId').html();
						}

						oData.object = nsFreshcare.objectMembership;
						oData.objectcontext = ns1blankspace.objectContext;
						oData.survey = nsFreshcare.data.structureMembershipFees;
						oData.type = $('input[name="radioFeeType"]:checked').val();
						oData.amount = $('#ns1blankspaceMembershipFeeAmount').val();
						oData.fromdate = $('#ns1blankspaceMembershipFeeFrom').val();
						oData.todate = $('#ns1blankspaceMembershipFeeTo').val(); 
						oData.membership = ns1blankspace.objectContext;

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_FEE_MANAGE'),
							data: oData,
							success: function(oResponse)
							{
								ns1blankspace.inputDetected = false;
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Fee Saved.');
									delete (ns1blankspace.objectContextData.fees);
									nsFreshcare.setup.membership.fees.show();
								}
								else
								{
									ns1blankspace.status.error('Fee not added: ' + oResponse.error.errornotes);
								}
							}
						})
					}
				}
			},

			remove:
			{
				send: function(oParam)
				{
					var sID = ns1blankspace.util.getParam(oParam, 'id', {"default": ''}).value;

					if (sID != '')
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_FEE_MANAGE'),
							data: 'id=' + sID + '&remove=1',
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Fee sucessfully removed.');
									ns1blankspace.objectContextData.fees = $.grep(ns1blankspace.objectContextData.fees, function(x) {return x.id != sID});
									$('#ns1blankspaceFeeRow_' + sID).remove();
								}
								else
								{
									ns1blankspace.status.error('Unable to remove Fee: ' + oResponse.error.errornotes);
								}
							}
						});
					}
								
				}
			}
		},

		codeOfPractice: 
		{
			search: function(oParam)
			{
				var bDefaultOnly = ns1blankspace.util.getParam(oParam, 'defaultOnly', {"default": false}).value;;

				ns1blankspace.data.defaultCOPText = '';
				ns1blankspace.data.defaultCOPID = '';
				
				var oSearch = new AdvancedSearch()
				oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
				oSearch.addField('agricodeofpractice.code,agricodeofpractice.description,agricodeofpractice.certificatetext,agricodeofpractice.isdefault,' +
									'agricodeofpractice.certificateexpiresafter,agricodeofpractice.auditdueafter,agricodeofpractice.membership,agricodeofpractice.displayorder');
				// v3.1.211 SUP023196 Added for Freshcare
				if (nsFreshcare.option.copJASANZDesc)
				{
					oSearch.addField('agricodeofpractice.secopjasanzdesc');
				}
				oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.objectContext);
				if (bDefaultOnly)
				{
					oSearch.addFilter('isdefault', 'EQUAL_TO', 'Y');
				}
				else
				{
					ns1blankspace.objectContextData.codesOfPractice = [];
				}
				// v3.1.1f SUP022688 Added displayorder sort
				oSearch.sort('displayorder', 'asc');
				oSearch.sort('code', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						if (oResponse.data.rows.length > 0)
						{
							if (bDefaultOnly)
							{
								ns1blankspace.data.defaultCOPText = oResponse.data.rows[0]['agricodeofpractice.code'] + ' - ' + oResponse.data.rows[0]['agricodeofpractice.description'].formatXHTML();
								ns1blankspace.data.defaultCOPID = oResponse.data.rows[0].id; 
							}
							else
							{
								ns1blankspace.objectContextData.codesOfPractice = oResponse.data.rows;
							}
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
				var bAddCOP = ns1blankspace.util.getParam(oParam, 'newCOP', {"default": false}).value;
				if (oParam === undefined) {oParam = {}}

				if (ns1blankspace.objectContextData.codesOfPractice === undefined)
				{
					oParam.onComplete = nsFreshcare.setup.membership.codeOfPractice.show;
					nsFreshcare.setup.membership.codeOfPractice.search(oParam);
				}
				else
				{
					if (oResponse === undefined) 
					{
						oResponse = oParam.response;
					}

					$('#ns1blankspaceMainCOP').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceCOPColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceCOPColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainCOP').html(aHTML.join(''));
					
					var aHTML = [];
				

					aHTML.push('<table id="ns1blankspaceMembershipCOP" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Code</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Description</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Default?</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Order</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(oResponse.data.rows, function() 
					{

						aHTML.push('<tr id="ns1blankspaceCOPRow_' + this.id + '">');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipCOP"' + 
										' id="ns1blankspaceCOPCode_' + this.id + 
										'">' +
											this["agricodeofpractice.code"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipCOP"' + 
										' id="ns1blankspaceCOPDescription_' + this.id + 
										'">' +
											this["agricodeofpractice.description"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipCOP"' + 
										' id="ns1blankspaceCOPDefault_' + this.id + '"' +
										'">' +
											this["agricodeofpractice.isdefault"] + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceRowMembershipCOP"' + 
										' id="ns1blankspaceCOPOrder_' + this.id + '"' +
										'">' +
											this["agricodeofpractice.displayorder"] + 
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

					// When click on row, shows COP details (and can edit) below.
					$('.ns1blankspaceRowMembershipCOP').click(function(event) 
					{

						var sElementId = this.id.split('_')[1];
						var oThisCOP = $.grep(ns1blankspace.objectContextData.codesOfPractice, function(a) {return a.id == sElementId});

						nsFreshcare.setup.membership.codeOfPractice.manage({add: false, 
															edit: true, 
															rowID: sElementId});

						if (oThisCOP.length === 1) { 
							
							oThisCOP = oThisCOP[0];
							
							var oParam = 
							{
								xhtmlElementID: 'ns1blankspaceMembershipCOPColumn1',
								thisCOP: oThisCOP,
								edit: true
							}

							nsFreshcare.setup.membership.codeOfPractice.details(oParam);
						}
						else 
						{
							$('#ns1blankspaceMembershipCOPColumn1').html('COP details not found.');
						}
					});

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
									
									nsFreshcare.setup.membership.codeOfPractice.remove.validate({id: sID, 
																			confirmed: true, 
																			onComplete: nsFreshcare.setup.membership.codeOfPractice.remove.send});
								});

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
							nsFreshcare.setup.membership.codeOfPractice.manage({add: true});

							if ($('#ns1blankspaceMembershipCOPActionContainer').children().length > 0) 
							{
								nsFreshcare.setup.membership.codeOfPractice.details({xhtmlElementID: "ns1blankspaceMembershipCOPColumn1"});
							}
						});

					if (bAddCOP)
					{
						$('#ns1blankspaceCOPAdd').click();	
					}
				}
			},

			manage: function(oParam)
			{
				var bContinue = true;
				var sRowID = ns1blankspace.util.getParam(oParam, 'rowID').value;
				var bAdd = ns1blankspace.util.getParam(oParam, 'add', {"default": false}).value;

				// Work out if we scrap what's there already. If they're already adding a new one, don't do anything, otherwise, start again
				if ($('#ns1blankspaceMembershipCOPActionContainer').is('*')) 
				{
					if ($('#ns1blankspaceMembershipCOPMembership').attr('data-membershipID') === '-1')
					{
						if (!bAdd) 
						{		// We were adding and now we've decided to view an existing one
							bContinue = confirm("Are you sure you want to cancel adding the COP?");
						}
						else 
						{		// We were adding and now have clicked Add CAR again - remove the row (essentially cancel)
							$('#ns1blankspaceMembershipCOPActionContainer').remove();
							bContinue = false;
						}
					}
					else 
					{
						$('#ns1blankspaceMembershipCOPActionContainer').remove();
						bContinue = false;
					}
				}  

				if (bContinue) 
				{
					
					var aHTML = [];

					aHTML.push('<tr id="ns1blankspaceMembershipCOPActionContainer">' +
									'<td id="ns1blankspaceMembershipCOPActionManage"' +
										' colspan="' + $('#ns1blankspaceMembershipCOP').children().children().first().children().length + '">');
					aHTML.push('<table id="ns1blankspaceMembershipCOPManage" class="ns1blankspaceContainer nsFreshcareDetails ns1blankspaceBorder">');

					aHTML.push('<tr>' + 
								'<td id="ns1blankspaceMembershipCOPColumn1" class="ns1blankspaceColumn1" style="width:75%;"></td>' +
								'<td id="ns1blankspaceMembershipCOPColumn2" class="ns1blankspaceColumn2"></td>' +
								'</tr>');

					aHTML.push('</table>');
					aHTML.push('</td></tr>');

					if (bAdd) 
					{
						$('#ns1blankspaceMembershipCOP').children().children().first().before(aHTML.join(''));
					}
					else 
					{
						$('#ns1blankspaceCOPRow_' + sRowID).after(aHTML.join(''));
					}

					aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('<tr><td>');
					aHTML.push('<span id="ns1blankspaceMembershipCOPSave" class="ns1blankspaceAction" colspan="2">Save</span>');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceMembershipCOPColumn2').html(aHTML.join(''));

					$('#ns1blankspaceMembershipCOPSave')
						.button(
						{
							label: 'Save',
							icons: {primary: 'ui-icon-disk'}
						})
						.click(function(event) 
						{
							nsFreshcare.setup.membership.codeOfPractice.save.send({onComplete: nsFreshcare.setup.membership.codeOfPractice.show, refresh: true});
						});
				}
			},

			details: function(oParam)
			{
				var aHTML = [];
				var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {"default": ''}).value;
				var bCanEdit = ns1blankspace.util.getParam(oParam, 'edit', {"default": true}).value;
				var oThisCOP = ns1blankspace.util.getParam(oParam, 'thisCOP').value;

				aHTML = [];

				aHTML.push('<table class="ns1blankspace">');

				aHTML.push('<tr class="ns1blankspace" style="display:none;">' +
								'<td id="ns1blankspaceMembershipCOPId" class="nsFreshcareReadOnly">' +
								'</td></tr>');		

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Code' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipCOPCode" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Code">' +
								'</td></tr>');		

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Description' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipCOPDescription" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Description">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Default?' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
									'<input type="radio" id="radioDefaultY" name="radioDefault" value="Y"/>Yes&nbsp;&nbsp;' +
									'<input type="radio" id="radioDefaultN" name="radioDefault" value="N"/>No' +
								'</td></tr>');	
				// v3.2.015 SUP023422 Added COP Based Training
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'COP-Based Training?' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
									'<input type="radio" id="radioCOPDefaultY" name="radioCOPDefault" value="Y"/>Yes&nbsp;&nbsp;' +
									'<input type="radio" id="radioCOPDefaultN" name="radioCOPDefault" value="N"/>No' +
								'</td></tr>');	
				// v3.2.015 SUP023422 Added COP Based Training
				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspaceCaption">' +
							'Crops' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceTraineeMembershipDetails">' +
							'<td class="ns1blankspace" id="ns1blankspaceMembershipCellCrops">' +
							'<input id="ns1blankspaceMembershipCropsUpdate"' +
								' class="ns1blankspaceSelect ns1blankspaceWatermark"' +
								' data-multiselect="true"' +
								' data-method="SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH"' +
								' data-methodFilter="title-TEXT_IS_LIKE|element-EQUAL_TO-' + nsFreshcare.structureElementCrops + '"' +
								' maxlength="300"' +
								' value="Search for valid Crops">' +
							'</td></tr>');	

				// v3.1.1f SUP022688 Added new field
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Display Order' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipCOPOrder" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Display Order">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Certificate Expires After (months)' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipCOPCertExpiresAfter" class="ns1blankspaceText"' +
									'data-caption="Certificate Expires After">' +
								'</td></tr>');			

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Audit Due After (months)' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipCOPAuditDueAfter" class="ns1blankspaceText"' +
									' data-caption="Audit Due After">' +
								'</td></tr>');			

				// v3.1.211 SUP023196 Added for Freshcare
				if (nsFreshcare.option.copJASANZDesc)
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'JASANZ Description' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceMembershipCOPJASANZDesc" class="ns1blankspaceText"' +
										'data-caption="JASANZ Description">' +
									'</td></tr>');			

				}

				aHTML.push('</table>');


				

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				if (oThisCOP != undefined) 
				{	

					$('#ns1blankspaceMembershipCOPId').html(oThisCOP.id);
					$('#ns1blankspaceMembershipCOPDescription').val(oThisCOP['agricodeofpractice.description'].formatXHTML());
					$('#ns1blankspaceMembershipCOPCode').val(oThisCOP['agricodeofpractice.code']);
					$('#ns1blankspaceMembershipCOPOrder').val(oThisCOP['agricodeofpractice.displayorder'].formatXHTML());
					$('#ns1blankspaceMembershipCOPCertExpiresAfter').val(oThisCOP['agricodeofpractice.certificateexpiresafter']);
					$('#ns1blankspaceMembershipCOPAuditDueAfter').val(oThisCOP['agricodeofpractice.auditdueafter']);
					$('[name="radioDefault"][value="' + oThisCOP["agricodeofpractice.isdefault"] + '"]').attr('checked', true);
					$('[name="radioCOPDefault"][value="' + oThisCOP["agricodeofpractice.isdefault"] + '"]').attr('checked', true);
					if (nsFreshcare.option.copJASANZDesc)
					{
						$('#ns1blankspaceMembershipCOPJASANZDesc').val(oThisCOP['agricodeofpractice.secopjasanzdesc']);
					}
				}
				else 
				{
					// Set defaults
					$('#ns1blankspaceMembershipCOPMembership').val(ns1blankspace.objectContextData['agrimembership.title'].formatXHTML());
					$('#ns1blankspaceMembershipCOPMembership').attr('data-id', ns1blankspace.objectContext);

					$('[name="radioDefault"][value="' + ((ns1blankspace.data.defaultCOPID === '') ? 'Y' : 'N') +'"]').attr('checked', true);
				}
				// v3.2.015 SUP023422 Added COP Based Training
				$('#radioCOPDefaultY').click(function(event)
				{
					$('.ns1blankspaceTraineeMembershipDetails').show();
				});
				$('#radioCOPDefaultN').click(function(event)
				{
					$('.ns1blankspaceTraineeMembershipDetails').hide();
				});

			},

			save: 
			{
				validate: function(oParam)
				{
					// Check that mandatory fields have been entered
					$('#ns1blankspaceMembershipCOPColumn1 input[data-mandatory]').each(function() 
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
						if ($('#ns1blankspaceMembershipCOPCertExpiresAfter').val() != ''
							&& (!nsFreshcare.util.isNumeric($('#ns1blankspaceMembershipCOPCertExpiresAfter').val()) || $('#ns1blankspaceMembershipCOPCertExpiresAfter').val().split('.').length > 1)
							)
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' must be a whole number.');
							return false;
						}
					}

					if (ns1blankspace.okToSave)
					{
						if ($('#ns1blankspaceMembershipCOPAuditDueAfter').val() != ''
							&& (!nsFreshcare.util.isNumeric($('#ns1blankspaceMembershipCOPAuditDueAfter').val()) || $('#ns1blankspaceMembershipCOPAuditDueAfter').val().split('.').length > 1)
							)
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' must be a number.');
							return false;
						}
					}

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
						if (oParam.copSaveStep === undefined) {oParam.copSaveStep = 1}
					}
					else {oParam = {copSaveStep: 1}}

					// Validate entry
					if (oParam.copSaveStep === 1)
					{
						ns1blankspace.okToSave = true;
						oParam.onComplete = nsFreshcare.setup.membership.codeOfPractice.save.send;
						oParam.copSaveStep = 2;
						nsFreshcare.setup.membership.codeOfPractice.save.validate(oParam);
					}
					
					// Save record
					else if (oParam.copSaveStep === 2)
					{
						sData += 'id=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPId').html()) +
								'&membership=' + ns1blankspace.util.fs(ns1blankspace.objectContext) +
								'&code=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPCode').val().formatXHTML()) +
								'&description=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPDescription').val().formatXHTML()) +
								'&isdefault=' + ns1blankspace.util.fs($('input[name="radioDefault"]:checked').val()) +
								'&displayorder=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPOrder').val().formatXHTML()) +
								'&certificateexpiresafter=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPCertExpiresAfter').val().formatXHTML()) +
								'&auditdueafter=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPAuditDueAfter').val().formatXHTML());
						if (nsFreshcare.option.copJASANZDesc)
						{
							sData += '&secopjasanzdesc=' + ns1blankspace.util.fs($('#ns1blankspaceMembershipCOPJASANZDesc').val().formatXHTML());
						}

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_CODE_OF_PRACTICE_MANAGE'),
							data: sData,
							rf: 'json',
							success: function(oResponse)
							{
								ns1blankspace.inputDetected = false;
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('COP Saved.');
									delete (ns1blankspace.objectContextData.codesOfPractice);
									nsFreshcare.setup.membership.codeOfPractice.show();
								}
								else
								{
									ns1blankspace.status.error('COP not added: ' + oResponse.error.errornotes);
								}
							}
						})
					}
				}
			},

			remove:
			{
				validate: function(oParam)
				{
					// First, check if COP is in use and then remove if not...
					var sID = ns1blankspace.util.getParam(oParam, 'id', {"default": ''}).value;
					var bInUse;

					if (sID != '')
					{
						if (bInUse === undefined)
						{
							ns1blankspace.status.loading('Checking if COP already used...');

							var oSearch = new AdvancedSearch();
							oSearch.method = 'AUDIT_SEARCH';
							oSearch.addField('reference');
							oSearch.addFilter('codeofpractice', 'EQUAL_TO', sID);
							oSearch.rows = 1;
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									oParam.inUseAudit = (oResponse.data.rows.length > 0);

									var oSearch = new AdvancedSearch();
									oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
									oSearch.addField('reference');
									oSearch.addFilter('codeofpractice', 'EQUAL_TO', sID);
									oSearch.rows = 1;
									oSearch.getResults(function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											oParam.inUseSubscription = (oResponse.data.rows.length > 0);
											oParam.bInUse = (oParam.inUseAudit || oParam.inUseSubscription);
											nsFreshcare.setup.membership.codeOfPractice.remove(oParam);
										}
										else
										{
											ns1blankspace.status.error(oResponse.error.errornotes);
										}
									});
								}
								else
								{
									ns1blankspace.status.error(oResponse.error.errornotes);
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
								var sText = ((oParam.inUseAudit === true) ? 'Audits' : '') + 
											((oParam.inUseSubscription) ? ((oParam.inUseAudit) ? ' and ' : '') + 'Subscriptions'  : '');

								ns1blankspace.status.error('Cannot remove COP. Already used in ' + sText);
							}
						}
					}
					else
					{
						ns1blankspace.status.message('No id passed to remove function. Cannot remove row.');
					}
				},

				send: function()
				{
					var sID = ns1blankspace.util.getParam(oParam, 'id', {"default": ''}).value;

					if (sID != '')
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_CODE_OF_PRACTICE_MANAGE'),
							data: 'id=' + sID + '&remove=1',
							rf: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('COP sucessfully removed.');
									ns1blankspace.objectContextData.codesOfPractice = $.grep(ns1blankspace.objectContextData.codesOfPractice, function(x) {return x.id != sID});
									$('#ns1blankspaceCARRow_' + sID).remove();
								}
								else
								{
									ns1blankspace.status.error('Unable to remove COP: ' + oResponse.error.errornotes);
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
					$('#ns1blankspaceMainDetails input[data-numeric]').each(function() 
					{
						if ($(this).val() != '' && $(this).attr('data-numeric') === "1"
							&& !nsFreshcare.util.isNumeric($(this).val()))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' must be a number.');
							return false;
						}
					});
				}

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
					if (oParam.membershipSaveStep === undefined) {oParam.membershipSaveStep = 1}
				}
				else {oParam = {membershipSaveStep: 1}}

				// Validate entry
				if (oParam.membershipSaveStep === 1)
				{
					ns1blankspace.okToSave = true;
					oParam.onComplete = nsFreshcare.setup.membership.save.send;
					oParam.membershipSaveStep = 2;
					nsFreshcare.setup.membership.save.validate(oParam);
				}
				
				// Save record
				else if (oParam.membershipSaveStep === 2)
				{
					if ($('#ns1blankspaceMainDetails').html() != '')
					{
						sData += '&code=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCode').val()) +
								'&title=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTitle').val()) +
								'&priorityorder=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPriorityOrder').val()) +
								'&status=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsStatus').attr('data-id')) +
								'&amount=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCertFeeInitial').val()) +
								'&renewalamount=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsCertFeeRenewal').val()) +
								'&secondarymembershipfee=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSecondaryCertFee').val()) +
								'&trainerroyaltyrate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsTrainerRoyalty').val()) +
								'&certificationroyaltyrate=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsAuditorRoyalty').val()) +
								'&jasanzaccredited=' + ns1blankspace.util.fs($('input[name="radioJASANZ"]:checked').val());
					}

					sData += ns1blankspace.extend.save();		//v3.1.209

					if (sData.length > 0)
					{
						sData = 'id=' + ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '') + sData;
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_MANAGE'),
							data: sData,
							rf: 'json',
							success: function(oResponse)
							{
								ns1blankspace.inputDetected = false;
								if (oResponse.status === 'OK')
								{
									var bNew = (ns1blankspace.objectContext === -1)

									ns1blankspace.status.message('Membership saved.');
									ns1blankspace.objectContext = oResponse.id;
									if (bNew)
									{
										nsFreshcare.setup.membership.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext});
									}
								}
								else
								{
									ns1blankspace.status.error('Membership not saved: ' + oResponse.error.errornotes);
								}
							}
						});
					}

				}
			}
		}
	}
});