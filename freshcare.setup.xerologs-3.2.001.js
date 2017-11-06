/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
$.extend(true,nsFreshcare.setup, 
{
	xerologs:
	{
		init: function (oParam) 
		{
			ns1blankspace.app.reset();

			ns1blankspace.object = 93;	
			ns1blankspace.objectName = 'xerologs';
			ns1blankspace.objectParentName = 'setup';
			ns1blankspace.objectMethod = 'ACTION';
			ns1blankspace.objectContextData = undefined;
			ns1blankspace.objectContext = -1;
			ns1blankspace.viewName = 'Log Files';	

			oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
			oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
			ns1blankspace.app.set(oParam);
		},

		home: 		function (oParam, oResponse)
		{
			if (oResponse == undefined)
			{
				ns1blankspace.app.context({inContext: false});
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

				aHTML.push('<tr><td><div id="ns1blankspaceViewLogFilesLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
				aHTML.push('<table>');
						
				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';		
				oSearch.addField('duedatetime,subject,priority,text');
				oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeLogFile)
				oSearch.sort('duedatetime', 'desc');
				oSearch.rows = 100;
				
				oSearch.getResults(function(oResponse) {nsFreshcare.setup.xerologs.home(oParam, oResponse)});	
			}
			else
			{
				var aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceNothing">There are no Log Files yet.</td></tr>' +
									'</table>');
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">');
					aHTML.push('<tr>' + 
									'<td class="ns1blankspaceCaption">Date</td>' +
									'<td class="ns1blankspaceCaption">For</td>' +
								'</tr>');

					$.each(oResponse.data.rows, function()
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_code-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["duedatetime"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["subject"] + '</td>' +
									'</tr>');
					});
					
					aHTML.push('</table>');
				}
				
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));
			
				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					nsFreshcare.setup.xerologs.search.send(event.target.id, {source: 1});
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
					oSearch.method = 'ACTION_SEARCH';		
					oSearch.addField('duedatetime,subject,priority,text');
					oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeLogFile)

					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
					oSearch.getResults(function(data) {nsFreshcare.setup.xerologs.show(oParam, data)});
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
						
						var dSearchDate = Date.parse(sSearchText);
						var oSearch = new AdvancedSearch();
						oSearch.method = 'ACTION_SEARCH';		
						oSearch.addField('duedatetime,subject');
						oSearch.addFilter('actiontype', 'EQUAL_TO', nsFreshcare.data.actionTypeLogFile)
						
						oSearch.addBracket("(");
						oSearch.addFilter('subject', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator("or");
						oSearch.addFilter('text', 'TEXT_IS_LIKE', sSearchText);
						if (dSearchDate != null)
						{
							oSearch.addOperator('or');
							oSearch.addFilter('duedate', 'EQUAL_TO', dSearchDate.toString('dd MMM yyyy'));
						}
						oSearch.addBracket(')');

						oSearch.sort('duedatetime', 'desc');
						oSearch.rf = 'json';
						oSearch.rows = 40;
						oSearch.getResults(function(data) {nsFreshcare.setup.xerologs.search.process(oParam, data)});
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
						
						aHTML.push('<td class="ns1blankspaceSearch" id="date' +
										'-' + this.id + '">' +
										this["duedatetime"] +
									'</td>'); 
						
						aHTML.push('<td class="ns1blankspaceSearch" id="reference' +
										'-' + this.id + '">' +
										this["subject"] + '</td>');
										
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
						nsFreshcare.setup.xerologs.search.send(event.target.id, {source: 1});
					});
					
					ns1blankspace.render.bind(
					{
						columns: 'duedatetime-space-subject',
						more: oResponse.moreid,
						startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
						functionSearch: nsFreshcare.setup.xerologs.search.send,
						rows: 40
					});   
					
				}	
			}
		},						

		layout: 	function ()
		{
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
			}
					
			aHTML.push('</table>');					
				
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			$('#ns1blankspaceControlSummary').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {inContext: true}});
				nsFreshcare.setup.xerologs.summary();
			});
			
			$('#ns1blankspaceControlDetails').click(function(event)
			{
				ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: {inContext: true}});
				nsFreshcare.setup.xerologs.details();
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
				nsFreshcare.setup.xerologs.layout();
				$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
			}
			
			if (iStep === 1 && oResponse.data.rows.length == 0)
			{
				ns1blankspace.objectContextData = undefined;
				
				aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find Log File.</td></tr></table>');
						
				$('#ns1blankspaceMain').html(aHTML.join(''));
			}
			else
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData['duedatetime'] + ' ' + ns1blankspace.objectContextData.subject);
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.setup.xerologs.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.setup.xerologs.summary()'});
			}	
		},	
			
		summary: 	function ()
		{
			var aHTML = [];
			
			if (ns1blankspace.objectContextData == undefined)
			{
				aHTML.push('<table><tr><td valign="top">Sorry can\'t find this log file.</td></tr></table>');
						
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
				
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Date</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['duedatetime'] +
							'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Title</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['subject'] +
							'</td></tr>');

				aHTML.push('</table>');					
				
				$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

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
								'</tr>' + 
								'</table>');					
				
				$('#ns1blankspaceMainDetails').html(aHTML.join(''));
				
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspace">');
				
				if (ns1blankspace.objectContext !== -1)
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Log' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="nsFreshcareReadOnly" id="ns1blankspaceDetailsLog">' +
										 ns1blankspace.objectContextData['text'].formatXHTML().replace(/\r?\n|\r/g, '<br />') +
									'</td></tr>');			
				}

					
				aHTML.push('</table>');					
				
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
				
			}	
		},

		save:
		{
			send: function(oParam)
			{
				ns1blankspace.status.message('Log file records canot be changed.');
			}
		}
	}
});