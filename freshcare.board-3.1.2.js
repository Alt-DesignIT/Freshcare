/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.board = 
{
	home:
	{
		init: 	function (oParam) 
		{ 	// v3.1.2 reset object / objectcontext values
			ns1blankspace.object = undefined; 
			ns1blankspace.objectContext = -1;  
			nsFreshcare.board.home.show(); 
		},

		show: 	function (oParam) 
		{
			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionBind = (oRoot.board && oRoot.board.home && oRoot.board.home.bind)
								? oRoot.board.home.bind
								: nsFreshcare.board.home.bind;

			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.board.home.show();',
				move: false
			});

			if (ns1blankspace.setupView)
			{	
				$('#ns1blankspaceViewControlSetup').attr('checked', false);
				$('#ns1blankspaceViewControlSetup').button('refresh');
				ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.board.home.show()'});
			}	

			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

			var aHTML = [];
			
			aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
			
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			/*aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlNewCertificates" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'New Certificates</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');
			*/
			aHTML.push('</table>');					
					
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			fFunctionBind();

			//ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlNewCertificates';
			
			var aHTML = [];
			
			aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
			aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
			aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
			aHTML.push('</tr></table>');	
			aHTML.push('</div>');

			$('#ns1blankspaceMain').html(aHTML.join(''));

			if (ns1blankspace.xhtml.defaultElementID != '')
			{
				$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
				$('#' + ns1blankspace.xhtml.defaultElementID).click();
			};
		},

		bind: 	function ()
		{
			
			$('#ns1blankspaceControlNewCertificates').click(function(event)
			{
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
				ns1blankspace.xhtml.defaultElementID = this.id;
				
				nsFreshcare.board.home.newCertificates.show({
					show: false,
					xhtmlElementID: 'ns1blankspaceHomeColumn1'
					});
			});
		}		
	},

	freshcarereports:
	{
		init: function(oParam)
		{
			ns1blankspace.report.reports = [];
			ns1blankspace.report.dictionary = [];
			ns1blankspace.report.selectAttributes = [];
			ns1blankspace.report.reportGroups = [];

			nsFreshcare.admin.report.initData(oParam);
			nsFreshcare.board.freshcarereports.initData(oParam);

			var bAll = true;

			if (oParam != undefined)
			{
				if (oParam.all != undefined) {bAll = oParam.all}
			}

			ns1blankspace.app.reset();

			ns1blankspace.objectName = 'report';

			ns1blankspace.viewName = 'Freshcare Reports';

			ns1blankspace.app.set(oParam);

			ns1blankspace.app.context({all: true, inContext: false})
		},

		initData: 	function (oParam)
		{
			// First call admin.report.initData and then remove all but the reports we require					
			delete(ns1blankspace.report.reportGroups)

			ns1blankspace.report.reports = $.grep(ns1blankspace.report.reports, function(x)
			{
				return x.name === 'Subscription Performance Summary' ||
					   x.name === 'Subscription Performance';
			});

			// Remove group number so all reports will show without accordion
			ns1blankspace.report.reports = $.map(ns1blankspace.report.reports, function(x)
			{
				delete(x.group);
				return x;
			});

			// Call init function for forked app if it exists
			//if (oRoot.board && oRoot.board.report && oRoot.board.report.initData && $.type(oRoot.board.report.initData) === 'function')
			//{
			//	oRoot.board.report.initData();
			//}
		}
	},

	financialreports:
	{
		init: function(oParam)
		{
			var bInitialised = ns1blankspace.util.getParam(oParam, 'initialised', {"default": false}).value;

			ns1blankspace.visualise.data.styles.budget =
			[
			    {
			        color: "#949FB1",
			        highlight: "#A8B3C5",
			        series: "2"
			    },
			    {
			        color: "#46BFBD",
			        highlight: "#5AD3D1",
			        series: "2"
			    },
				{
			        color:"#F7464A",
			        highlight: "#FF5A5E",
			       	series: "1"
			    }
			  ]  

			ns1blankspace.app.reset();

			ns1blankspace.object = 284;
			ns1blankspace.objectParentName = 'board';
			ns1blankspace.objectName = 'financialreports';
			ns1blankspace.objectContextData = undefined;
			ns1blankspace.objectContext = -1;
			ns1blankspace.viewName = 'Financial Reports';
			
			if (!bInitialised)
			{
				ns1blankspace.financial.initData(oParam)
			}
			else
			{
			// ToDo: This wont work here (or will it?). Needs to be tested
				//ns1blankspace.app.set(oParam);
				nsFreshcare.board.financialreports.show(oParam);
			}	
			
		},

		show: 	function (oParam) 
		{
			var oRoot = ns1blankspace.rootnamespace;

			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.board.financialreports.show();',
				move: false
			});

			if (ns1blankspace.setupView)
			{	
				$('#ns1blankspaceViewControlSetup').attr('checked', false);
				$('#ns1blankspaceViewControlSetup').button('refresh');
				ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.board.financialreports.show()'});
			}	

			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

			var aHTML = [];
			
			aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
			
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlProfitAndLoss" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Profit & Loss</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');
			
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlBalanceSheet" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Balance Sheet</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');
			
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlBudget" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Budget</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlBudgetSummary" class="ns1blankspaceControl ns1blankspaceControlHome"' +
								' style="font-size:0.625em;display:none;">' +
								'Today</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlBudgetDetailed" class="ns1blankspaceControl ns1blankspaceControlHome"' +
								' style="font-size:0.625em;display:none;">' +
								'Month<br />by Month</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');
			
			aHTML.push('</table>');					
					
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			nsFreshcare.board.financialreports.bind();

			aHTML = [];
			
			aHTML.push('<div id="ns1blankspaceMainPL" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainBS" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainBudgetList" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainToday" class="ns1blankspaceControlMain"></div>');
			aHTML.push('<div id="ns1blankspaceMainProgress" class="ns1blankspaceControlMain"></div>');

			$('#ns1blankspaceMain').html(aHTML.join(''));
		},

		bind: function()
		{
			$('#ns1blankspaceControlProfitAndLoss').click(function(event)
			{
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
				
				ns1blankspace.show({selector: '#ns1blankspaceMainPL'});
				ns1blankspace.financial.profitLoss.show();
			});

			$('#ns1blankspaceControlBalanceSheet').click(function(event)
			{
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
				
				ns1blankspace.show({selector: '#ns1blankspaceMainBS'});
				ns1blankspace.financial.balanceSheet.show();
			});

			$('#ns1blankspaceControlBudget').click(function(event)
			{
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
				$('#ns1blankspaceControlBudgetSummary').hide();
				$('#ns1blankspaceControlBudgetDetailed').hide()
				
				ns1blankspace.show({selector: '#ns1blankspaceMainBudgetList'});
				nsFreshcare.board.financialreports.budget.show();
			});

			$('#ns1blankspaceControlBudgetSummary').click(function(event)
			{
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
				
				nsFreshcare.board.financialreports.budget.summary();
			});

			$('#ns1blankspaceControlBudgetDetailed').click(function(event)
			{
				$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
				$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
				
				nsFreshcare.board.financialreports.budget.detailed();
			});
		},

		budget:
		{
			init: function()
			{
				if (ns1blankspace.objectName != 'budget')
				{
					ns1blankspace.objectName = 'budget';
				}
			},

			search: function(oParam)
			{
				var iBudgetID = ns1blankspace.util.getParam(oParam, 'budgetID').value;
				var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.board.financialreports.budget.show}).value;

				var oSearch = new AdvancedSearch();
				oSearch.method = 'FINANCIAL_BUDGET_SEARCH';
				oSearch.addField('*');
				if (iBudgetID)
				{
					oSearch.addFilter('id', 'EQUAL_TO', iBudgetID);
				}
				oSearch.sort('enddate', 'desc');
				oSearch.rows = 10;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						
						if (iBudgetID && oResponse.data.rows.length > 0) 
						{
							// We need to remove 'budget' alias from each column
							var oData = oResponse.data.rows[0];
							ns1blankspace.objectContextData = {};
							$.each(Object.keys(oData), function(value, key)
							{
								ns1blankspace.objectContextData[key.split('.').pop()] = oData[key];
							});
						}
						fFunctionShow(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error('Unable to find Budget: ' + oResponse.error.errornotes);
					}
				});
			},

			show: function(oParam, oResponse)
			{
				// Get a list of last 10 budgets sorted in reverse chronological orders by end date and allow user to choose whether they see 
				// Summary (Today) or Detailed (Month by Month) tab
				var aHTML = [];


				if (oResponse === undefined)
				{
					ns1blankspace.financial.budget.data.refresh.summary = false;
					ns1blankspace.financial.budget.data.refresh.progress = true;
					ns1blankspace.financial.budget.data = {process: {}, planned: [], actual: [], totals: {}, refresh: {summary: true, progress: true}};

					aHTML.push('<table class="ns1blankspaceMain">');
					aHTML.push('<tr class="ns1blankspaceMain">' +
									'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
									ns1blankspace.xhtml.loading +
									'</td>' +
									'</tr>');
					aHTML.push('</table>');					
					
					$('#ns1blankspaceMainBudgetList').html(aHTML.join(''));
					
					// ToDo: Test this part!!!
					/*$vq.clear({queue: 'home'});
								
					$vq.add('<table class="ns1blankspaceMain">' + 
									'<tr class="ns1blankspaceMain">' +
									'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
									ns1blankspace.xhtml.loading +
									'</td></tr></table>', {queue: 'home'});					
					
					$vq.render('#ns1blankspaceBudget', {queue: 'home'});
										
					$vq.add('<table>' +
								'<tr><td><div id="ns1blankspaceViewReportLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>' +
								'</table>', {queue: 'home'});		
					
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);*/
					
					nsFreshcare.board.financialreports.budget.search();
				}
				else
				{
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">' +
										'<tr><td class="ns1blankspaceNothing">No budget records exist.</td></tr>' +
										'</table>');
						$('#ns1blankspaceMainBudgetList').html(aHTML.join(''));
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceMostLikely">');
						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENT</td></tr>');
						
						$.each(oResponse.data.rows, function(r, row)
						{					
							aHTML.push('<tr class="ns1blankspaceRow">');
						
							aHTML.push('<td id="ns1blankspaceMostLikely_daterange-' + row['budget.id'] + '" class="ns1blankspaceMostLikelySub">' +
													row['budget.startdate'] + ' to ' + row['budget.enddate'] + '</td>');

							aHTML.push('<td id="ns1blankspaceMostLikely_notes-' + row['budget.id'] + '" class="ns1blankspaceMostLikelySub" style="">' +
													row['budget.notes'] + '</td>');
																	
							aHTML.push('<td id="ns1blankspaceMostLikely_showToday-' + row['budget.id'] + '" class="ns1blankspaceMostLikely ns1blankspaceShowToday">' +
													'Budget Summary</td>');
							
							aHTML.push('<td id="ns1blankspaceMostLikely_showToday-' + row['budget.id'] + '" class="ns1blankspaceMostLikely ns1blankspaceShowDetail">' +
													'Detail</td>');
							
							aHTML.push('</tr>');
						});

						$('#ns1blankspaceMainBudgetList').html(aHTML.join(''));

					/*$vq.clear({queue: 'home'});
			
					if (oResponse.data.rows.length == 0)
					{
						$vq.add('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceNothing">No budget records exist.</td></tr>' +
									'</table>', {queue: 'home'});
					}
					else
					{
						$vq.add('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceCaption" colspan="4">MOST RECENT</td></tr>', {queue: 'home'});
						
						$.each(oResponse.data.rows, function(r, row)
						{					
							$vq.add('<tr class="ns1blankspaceRow">', {queue: 'home'});
						
							$vq.add('<td id="ns1blankspaceMostLikely_daterange-' + row.id + '" class="ns1blankspaceMostLikelySub">' +
													row.startdate + ' to ' + row.enddate + '</td>', {queue: 'home'});

							$vq.add('<td id="ns1blankspaceMostLikely_notes-' + row.id + '" class="ns1blankspaceMostLikelySub" style="">' +
													row.notes + '</td>', {queue: 'home'});
																	
							$vq.add('<td id="ns1blankspaceMostLikely_showToday-' + row.id + '" class="ns1blankspaceMostLikely ns1blankspaceShowToday">' +
													'Budget Summary</td>', {queue: 'home'});
							
							$vq.add('<td id="ns1blankspaceMostLikely_showToday-' + row.id + '" class="ns1blankspaceMostLikely ns1blankspaceShowDetail">' +
													'Detail</td>', {queue: 'home'});
							
							$vq.add('</tr>', {queue: 'home'});
						});
						
						$vq.add('</table>', {queue: 'home'});
					}
					
					$vq.render('#ns1blankspaceMostLikely', {queue: 'home'});*/
				
						$('td.ns1blankspaceShowToday').click(function(event)
						{
							var oParam = {functionShow: nsFreshcare.board.financialreports.budget.summary};
							$('.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
							$('#ns1blankspaceControlBudgetSummary').addClass('ns1blankspaceHighlight');

							ns1blankspace.objectContext = this.id.split('-').pop();
							oParam.budgetID = ns1blankspace.objectContext;

							nsFreshcare.board.financialreports.budget.search(oParam);
						});

						$('td.ns1blankspaceShowDetail').click(function(event)
						{
							var oParam = {functionShow: nsFreshcare.board.financialreports.budget.detailed};
							$('.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
							$('#ns1blankspaceControlBudgetDetailed').addClass('ns1blankspaceHighlight');
											
							ns1blankspace.objectContext = this.id.split('-').pop();
							oParam.budgetID = ns1blankspace.objectContext;
							nsFreshcare.board.financialreports.budget.search(oParam);
						});
					}
				}
			},

			summary: function(oParam)
			{
				// Show the 'Today' tab of the budget form
				$('#ns1blankspaceControlBudgetSummary').show();
				$('#ns1blankspaceControlBudgetDetailed').show()

				ns1blankspace.show({selector: '#ns1blankspaceMainToday'});
				oParam = ns1blankspace.util.setParam(oParam, 'onCompleteWhenCan',ns1blankspace.financial.budget.today.show);
				ns1blankspace.financial.budget.process.init(oParam);
			},

			detailed: function(oParam)
			{
				// Show the 'Month by Month' tab of the Budget form
				$('#ns1blankspaceControlBudgetSummary').show();
				$('#ns1blankspaceControlBudgetDetailed').show()

				ns1blankspace.show({selector: '#ns1blankspaceMainProgress'});
				oParam = ns1blankspace.util.setParam(oParam, 'onCompleteWhenCan',ns1blankspace.financial.budget.progress.show);
				ns1blankspace.financial.budget.process.init(oParam);
			}
		}
	}
}