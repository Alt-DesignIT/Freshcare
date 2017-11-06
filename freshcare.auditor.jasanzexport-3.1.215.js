/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
 // v3.1.212 SUP023196 Removed Codes - no longer required
nsFreshcare.auditor.jasanzexport = 
{
	data: 
	{
		headers:
		{
			/* V3.1.212 SUP023196 Changed companyid from businessreference to certificatenumber */
			coreDetails:
			[
				{name: 'companyid', caption: 'ID Number', inView: true, field: 'agrisubscription.agricertificate.certificatenumber'},
				{name: 'type', caption: 'Type', inView: false, value: "Product"},
				{name: 'status', caption: 'Status', inView: false, value: 'Active'},
				{name: 'scope', caption: 'Description of Scope', inView: true, field: 'scope'},
				{name: 'firstissued', caption: 'Original Issue Date (YYYYMMDD)', inView: false, value: ''},
				{name: 'currentissue', caption: 'Current Issue Date (YYYYMMDD)', inView: true, field: 'agrisubscription.agricertificate.audit.resultstatusdate', format: "yyyyMMdd"},
				{name: 'expirydate', caption: 'Expiry Date (YYYYMMDD)', inView: true, field: 'agrisubscription.agricertificate.enddate', format: "yyyyMMdd"},
				{name: 'orgname', caption: 'Organisation Name', inView: true, field: 'agrisubscription.contactbusiness.legalname'},
				{name: 'orgtrading', caption: 'Organisation Trading As Name', inView: true, field: 'agrisubscription.contactbusiness.tradename'},
				{name: 'orgaddress', caption: 'Organisation Street Address', inView: true, field: 'agrisubscription.contactbusiness.mailingaddresscombined'},
				{name: 'orgsuburb', caption: 'Organisation City', inView: true, field: 'agrisubscription.contactbusiness.mailingsuburb'},
				{name: 'orgstate', caption: 'Organisation State', inView: true, field: 'agrisubscription.contactbusiness.mailingstate'},
				{name: 'orgcountry', caption: 'Organisation Country', inView: true, field: 'agrisubscription.contactbusiness.mailingcountry'},
				{name: 'orgpostcode', caption: 'Organisation Postcode', inView: true, field: 'agrisubscription.contactbusiness.mailingpostcode'},
				{name: 'orgemail', caption: 'Organisation Email', inView: false, value: ''},
				{name: 'licences', caption: 'Product Total No of Licences', inView: false, value: ''},
				{name: 'ghgassurance', caption: 'GHG Level of Assurance', inView: false, value: ''},
				{name: 'ghgmeasurement', caption: 'GHG Measurement Period', inView: false, value: ''},
				{name: 'personnelname', caption: 'Personnel Name of Person', inView: false, value: ''},
				{name: 'isdelete', caption: 'IsDelete', inView: false, value: ''}
			],

			exportSites:
			[
				{name: 'companyid', caption: 'ID Number', inView: true, field: 'agrisubscription.agricertificate.certificatenumber'},
				{name: 'addresscombined', caption: 'Site Street Address', inView: true, field: 'addresscombined'},
				{name: 'addresssuburb', caption: 'Site City', inView: true, field: 'addresssuburb'},
				{name: 'addressstate', caption: 'Site State', inView: true, field: 'addressstate'},
				{name: 'addresscountry', caption: 'Site Country', inView: true, value: 'Australia'},
				{name: 'addresspostcode', caption: 'Site Postcode', inView: true, field: 'addresspostcode'},
			],

			schemes:
			[
				{name: 'companyid', caption: 'ID Number', inView: true, field: 'agrisubscription.agricertificate.certificatenumber'},
				{name: 'scheme', caption: 'Scheme', inView: true, field: 'agrisubscription.membership.sejasanzdesc'},
				{name: 'standard', caption: 'Standard', inView: true, field: 'agrisubscription.agricodeofpractice.secopjasanzdesc'}	/* secopjasanzdesc */
			]
		}
	},

	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 108;	
		ns1blankspace.objectName = 'jasanzexport';
		ns1blankspace.objectParentName = 'auditor';
		ns1blankspace.objectMethod = 'AGRI_SUBSCRIPTION';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'JASANZ Export';	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);

		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
	},

	home: 		function (oParam, oResponse)
	{
		nsFreshcare.auditor.jasanzexport.summary();
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
			ns1blankspace.container.confirm({html: 'Search is not enabled for JASANZ Exports.'});
		}
	},						

	layout: 	function ()
	{
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext === -1) 
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Run Report</td></tr>');
		}
		else 
		{			
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Results</td></tr>');

			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Core Details</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlSites" class="ns1blankspaceControl">' +
							'Sites</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlSchemes" class="ns1blankspaceControl">' +
							'Schemes</td></tr>');
		}
					
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSites" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSchemes" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', refresh: true});
			nsFreshcare.auditor.jasanzexport.summary();
		});

		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', refresh: true});
			nsFreshcare.auditor.jasanzexport.details();
		});

		$('#ns1blankspaceControlSites').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSites', refresh: true});
			nsFreshcare.auditor.jasanzexport.sites();
		});

		$('#ns1blankspaceControlSchemes').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSchemes', refresh: true});
			nsFreshcare.auditor.jasanzexport.schemes();
		});
	},

	show: 	function (oParam, oResponse)
	{
		// Go and get the data when the user asks to run the report 
		// Get ALL data so it's all displayed on the relevant tabs and can be exported as soon as this process is finished
		if (oParam == undefined) {oParam = {}}
		var aHTML = [];
		var iCertBody = ns1blankspace.util.getParam(oParam, 'certBody', {'default': ns1blankspace.user.contactBusiness}).value;
		var aMemberships = ns1blankspace.util.getParam(oParam, 'memberships', {'default': [nsFreshcare.data.membershipFSQ]}).value;

		if (oParam.searchStep == undefined) {oParam.searchStep = 1}
		
		if (oParam.searchStep === 1) 
		{
			ns1blankspace.objectContext = '1';
			ns1blankspace.objectContextData = undefined;

			nsFreshcare.auditor.jasanzexport.data.subscriptions = [];
			nsFreshcare.auditor.jasanzexport.data.scopes = [];
			nsFreshcare.auditor.jasanzexport.data.sites = [];

			nsFreshcare.auditor.jasanzexport.data.coreDetails = [];
			nsFreshcare.auditor.jasanzexport.data.schemes = [];
			nsFreshcare.auditor.jasanzexport.data.exportSites = [];

			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

			nsFreshcare.auditor.jasanzexport.layout();
			$('#ns1blankspaceControlSummary').addClass('1blankspaceHighlight').attr('data-certBody', iCertBody);
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
			oParam.searchStep = 2;
			nsFreshcare.auditor.jasanzexport.show(oParam);
		}
		
		// Search for subscriptions
		else if (oParam.searchStep == 2)
		{
			// v3.1.215 Was filtering on certificate.enddate instead of subscription.enddate
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';		// secopjasanzdesc
			oSearch.addField('agrisubscription.contactbusiness.reference,agrisubscription.agricertificate.dateissued,agrisubscription.agricertificate.enddate' +
							',agrisubscription.contactbusiness.legalname,agrisubscription.contactbusiness.tradename,agrisubscription.agricertificate.certificatenumber' +
							',agrisubscription.membership.sejasanzdesc,agrisubscription.agricodeofpractice.secopjasanzdesc,agrisubscription.contactbusiness' +
							',agrisubscription.contactbusiness.mailingaddresscombined,agrisubscription.contactbusiness.mailingsuburb,agrisubscription.contactbusiness.mailingstate' +
							',agrisubscription.contactbusiness.mailingpostcode,agrisubscription.contactbusiness.mailingcountry,agrisubscription.agricertificate.audit.resultstatusdate');
			oSearch.addFilter('agrisubscription.membership.jasanzaccredited', 'EQUAL_TO', 'Y');
			oSearch.addFilter('agrisubscription.agricertificate.audit.auditbusiness.se' + nsFreshcare.data.jasanzDateId, 'LESS_THAN_OR_EQUAL_TO', 'field:agrisubscription.agricertificate.audit.actualdate');
			oSearch.addFilter('agrisubscription.agricertificate.dateissued', 'LESS_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
			oSearch.addBracket('(');
			oSearch.addFilter('agrisubscription.enddate', 'GREATER_THAN', dToday.toString('dd MMM yyyy'));
			oSearch.addOperator('or');
			oSearch.addFilter('agrisubscription.enddate', 'IS_NULL');
			oSearch.addBracket(')');

			if (aMemberships.length > 0)
			{
				oSearch.addFilter('agrisubscription.membership', 'IN_LIST', aMemberships.join(','));
			}
			if (iCertBody)
			{
				oSearch.addFilter('agrisubscription.agricertificate.audit.auditbusiness', 'EQUAL_TO', iCertBody);
			}
			oSearch.rows = 1000;
			oSearch.addSummaryField('count(*) count');
			oSearch.sort('agrisubscription.contactbusiness.reference', 'asc');
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					oParam.dataObject = 'subscriptions';
					nsFreshcare.auditor.jasanzexport.data[oParam.dataObject] = nsFreshcare.auditor.jasanzexport.data[oParam.dataObject].concat(oResponse.data.rows);
					nsFreshcare.auditor.jasanzexport.showSearchMore(oParam, oResponse);
				}
				else
				{
					ns1blankspace.status.error(oResponse.error.errornotes);
				}
			});
		}

		// Search for Scopes
		else if (oParam.searchStep == 3)
		{
			if (nsFreshcare.auditor.jasanzexport.data.subscriptions.length > 0)
			{
				var aSubscriptions = $.map(nsFreshcare.auditor.jasanzexport.data.subscriptions, function(x) {return x.id});
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('scopetext,objectcontext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
				oSearch.addFilter('objectcontext', 'IN_LIST', aSubscriptions.join(','));
				oSearch.sort('objectcontext', 'asc');
				oSearch.rows = 1000;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.dataObject = 'scopes';
						nsFreshcare.auditor.jasanzexport.data[oParam.dataObject] = nsFreshcare.auditor.jasanzexport.data[oParam.dataObject].concat(oResponse.data.rows);
						nsFreshcare.auditor.jasanzexport.showSearchMore(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}
			else
			{	// No subscriptions found - no point continuing
				oParam.searchStep = 10;
				nsFreshcare.auditor.jasanzexport.show(oParam);
			}
		}

		// Search for Sites
		else if (oParam.searchStep == 4)
		{
			var aSubscriptions = $.map(nsFreshcare.auditor.jasanzexport.data.subscriptions, function(x) {return x.id});
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
			oSearch.addField('address1,address2,addresssuburb,addresspostcode,addressstate,addresscountry,address.addresslink.objectcontext');
			oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectSubscription);
			oSearch.addFilter('address.addresslink.objectcontext', 'IN_LIST', aSubscriptions.join(','));
			oSearch.addFilter('type', 'EQUAL_TO', '1');		// Street
			oSearch.addFilter('status', 'NOT_EQUAL_TO', '3');		// Don't want inactive
			oSearch.sort('address.addresslink.objectcontext', 'asc');
			oSearch.rows = 1000;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					oParam.dataObject = 'sites';
					nsFreshcare.auditor.jasanzexport.data[oParam.dataObject] = nsFreshcare.auditor.jasanzexport.data[oParam.dataObject].concat(oResponse.data.rows);
					nsFreshcare.auditor.jasanzexport.showSearchMore(oParam, oResponse);
				}
				else
				{
					ns1blankspace.status.error(oResponse.error.errornotes);
				}
			});
		}

		// Collate data
		else if (oParam.searchStep == 5)
		{
			$.each(nsFreshcare.auditor.jasanzexport.data.subscriptions, function(i, subscription)
			{
				var aScopes = $.grep(nsFreshcare.auditor.jasanzexport.data.scopes, function(x) {return x.objectcontext == subscription.id});
				subscription.scope = $.map(aScopes, function(x) {return x.scopetext}).join(', ');

				var oCoreDetails = {};
				$.each(nsFreshcare.auditor.jasanzexport.data.headers.coreDetails, function(i, map)
				{
					oCoreDetails[map.caption] = (map.field) ? subscription[map.field].formatXHTML() : map.value;	
					if (map.format && oCoreDetails[map.caption] != '')
					{
						oCoreDetails[map.caption] = (new Date(oCoreDetails[map.caption])).toString(map.format);
					}
				});
				nsFreshcare.auditor.jasanzexport.data.coreDetails.push(oCoreDetails);

				var oSchemes = {};
				$.each(nsFreshcare.auditor.jasanzexport.data.headers.schemes, function(i, map)
				{
					oSchemes[map.caption] = (map.field) ? subscription[map.field].formatXHTML() : map.value;	
				});
				nsFreshcare.auditor.jasanzexport.data.schemes.push(oSchemes);
			});


			// Add Certificate Number to the Sites object
			$.each(nsFreshcare.auditor.jasanzexport.data.sites, function(i, site)
			{
				if (site['agrisubscription.agricertificate.certificatenumber'] == undefined)
				{
					var oSubscription = $.grep(nsFreshcare.auditor.jasanzexport.data.subscriptions, function(x) {return x.id == site['address.addresslink.objectcontext']}).shift();
					site['agrisubscription.agricertificate.certificatenumber'] = oSubscription['agrisubscription.agricertificate.certificatenumber']; 
				}
				site.addresscombined = (site.address1 + (site.address2 ? ' ' + site.address2 : '')).formatXHTML();

				var oSite = {};
				$.each(nsFreshcare.auditor.jasanzexport.data.headers.exportSites, function(i, map)
				{
					oSite[map.caption] = (map.field) ? site[map.field].formatXHTML() : map.value;	
				});
				nsFreshcare.auditor.jasanzexport.data.exportSites.push(oSite);
			});

			oParam.searchStep = 10;
			nsFreshcare.auditor.jasanzexport.show(oParam);
		}	
			
		else if (oParam.searchStep == 10)
		{
			ns1blankspace.objectContextData = 
			{
				id: '1',
				coreDetailsRows: nsFreshcare.auditor.jasanzexport.data.coreDetails.length,
				sitesRows: nsFreshcare.auditor.jasanzexport.data.exportSites.length,
				schemesRows: nsFreshcare.auditor.jasanzexport.data.schemes.length
			};
			
			// No updates can be done on this form
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
			$('#ns1blankspaceControlContext').html('JASANZ Certificates as at ' + (new Date()).toString('dd MMM yyyy'));
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.auditor.jasanzexport.summary({certBody: "' + iCertBody + '"})'});
		}	
	},	

	showSearchMore: function(oParam, oResponse)
	{
		var bMore;
		var iStart;
		var iRows;

		if (oResponse)
		{
			bMore = (oResponse.morerows == 'true');
			iRows = parseInt(oResponse.rows);
			iStart = parseInt(oResponse.startrow) + iRows;

			if (bMore)
			{
				$.ajax(
				{
					type: 'GET',
					url: ns1blankspace.util.endpointURI('CORE_SEARCH_MORE'),
					data: 'id=' + oResponse.moreid + '&startrow=' + iStart + '&rows=' + iRows,
					dataType: 'json',
					success: function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							nsFreshcare.auditor.jasanzexport.data[oParam.dataObject] = nsFreshcare.auditor.jasanzexport.data[oParam.dataObject].concat(oResponse.data.rows);
							nsFreshcare.auditor.jasanzexport.showSearchMore(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					}
				});
			}
			else
			{
				oParam.searchStep += 1;
				nsFreshcare.auditor.jasanzexport.show(oParam);
			}
		}
	},
		
	summary: 	function (oParam)
	{
		if (oParam == undefined) {oParam = {}}
		var iCertBody = ns1blankspace.util.getParam(oParam, 'certBody').value;
		var aHTML = [];

		if (iCertBody == undefined) {iCertBody = $('#ns1blankspaceControlSummary').attr('data-certBody')}
		
		if (nsFreshcare.internal.data.certificationBodies == undefined)
		{
			oParam.onComplete = nsFreshcare.auditor.jasanzexport.summary;
			nsFreshcare.internal.financial.invoice.certificationBodies(oParam);

		}
		else
		{
			if ($('#ns1blankspaceSummary').attr('data-loading') == undefined)
			{
				
				$('#ns1blankspaceSummary').attr('data-loading', '');
						
				nsFreshcare.auditor.jasanzexport.layout();
				$('#ns1blankspaceControlSummary').attr('data-certBody', iCertBody);

				aHTML.push('<table class="ns1blankspaceMain">' +
							'<tr class="ns1blankspaceRow">' +
							'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
							'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
							'</tr>' +
							'</table>');				
				
				$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
			
				// Only show counts if we have already searched for results
				if (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData)
				{
					var aHTML = [];
				
					aHTML.push('<table class="ns1blankspace">');
					
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption" style="color: #5B7F00;">Search Results</td></tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Core Details rows: ' +
									'<span style="font-weight: normal;">' + ns1blankspace.objectContextData.coreDetailsRows + '</span></td></tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Sites rows: ' +
									'<span style="font-weight: normal;">' + ns1blankspace.objectContextData.sitesRows + '</span></td></tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Schemes rows: ' +
									'<span style="font-weight: normal;">' + ns1blankspace.objectContextData.schemesRows + '</span></td></tr>');

					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Total rows: ' +
									'<span style="font-weight: normal;">' + 
										(ns1blankspace.objectContextData.coreDetailsRows +
										 ns1blankspace.objectContextData.sitesRows +
										 ns1blankspace.objectContextData.schemesRows) +
										'</span></td></tr>');

					aHTML.push('</table>');

					$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
				}

				aHTML = [];

				aHTML.push('<table class="ns1blankspaceColumn2">');
				aHTML.push('<tr><td>');

				aHTML.push('<span id="ns1blankspaceSummaryGenerateData"' +
							' class="ns1blankspaceAction" style="width: 135px;">Generate Data</span>');

				if (ns1blankspace.objectContext != -1)
				{
					aHTML.push('<br /><br /><span id="ns1blankspaceSummaryExportData"' +
								' class="ns1blankspaceAction" style="width: 135px;">Export Data</span>');
				}

				aHTML.push('</td></tr>');
				
				if (nsFreshcare.user.roleLower == 'admin')
				{
					aHTML.push('<tr><td>&nbsp;</td></tr>');

					aHTML.push('<tr><td>');
					aHTML.push('<table id="ns1blankspaceSummarySelectCertBody" class="ns1blankspace">' +
									'<tr><td class="ns1blankspaceSummaryCaption" style="font-size: 0.75em;">Select Certification Body</td></tr>');

					$.each(nsFreshcare.internal.data.certificationBodies, function()
					{
						aHTML.push('<tr><td id="ns1blankspaceSelectCertBody_' + this.id + '" class="ns1blankspaceSelectCertBody nsFreshcareSelectable' +
												(iCertBody && this.id == iCertBody ? ' nsFreshcareSelected' : '') + '"' +
										' data-value="' + this.id + '" data-selected="' + (iCertBody && this.id == iCertBody ? '1' : '0') + '">' + 
										this.value.formatXHTML() + '</td></tr>');
					});

					aHTML.push('</table></td></tr>');
				}

				aHTML.push('</td></tr></table>');

				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));


				$('.nsFreshcareSelectable')
					.css('cursor', 'pointer')
					.on('click', function()
					{
						$('#ns1blankspaceSummarySelectCertBody .nsFreshcareSelectable')
							.removeClass('nsFreshcareSelected')
							.attr('data-selected', '0');
						$(this)
							.addClass('nsFreshcareSelected')
							.attr('data-selected', '1');
					});

				$('#ns1blankspaceSummaryGenerateData')
					.button({label: 'Generate Data'})
					.on('click', function(event) 
					{
						if (nsFreshcare.user.roleLower == 'admin' && $('#ns1blankspaceSummarySelectCertBody .nsFreshcareSelected').length == 0)
						{
							ns1blankspace.status.error('You must choose a Certification Body');
						}
						else
						{
							ns1blankspace.status.clear();
							var oPassParam = {};
							if (nsFreshcare.user.roleLower == 'admin') 
							{
								oPassParam.certBody = $('#ns1blankspaceSummarySelectCertBody .nsFreshcareSelected').first().attr('id').split('_').pop();
							}
							nsFreshcare.auditor.jasanzexport.show(oPassParam);	
						}
					});

				$('#ns1blankspaceSummaryExportData')
					.button({label: 'Export Data'})
					.on('click', function()
					{
						var sFileName = "JASANZExport-" + dToday.toString('yyyy-MM-dd');
						if ((ns1blankspace.objectContextData.coreDetailsRows +
							 ns1blankspace.objectContextData.sitesRows +
							 ns1blankspace.objectContextData.schemesRows) > 0)
						{
							var exportData = alasql('SELECT INTO XLSX("' + sFileName + '.xlsx", ?) FROM ?',
											[
												[
													{sheetid: "Core Details", header: true},
													{sheetid: "Sites", header: true},
													{sheetid: "Schemes", header: true}
												],
												[
													nsFreshcare.auditor.jasanzexport.data.coreDetails,
													nsFreshcare.auditor.jasanzexport.data.exportSites,
													nsFreshcare.auditor.jasanzexport.data.schemes
												]
											]/*,
											function()
											{
												ns1blankspace.status.message('All Done!');
											}*/);
						}
						else
						{
							ns1blankspace.container.confirm({html: 'No data to export!', title: 'Cannot Export Data!'});
						}
					});
			}	
		}
	},

	details: function() 
	{
		nsFreshcare.auditor.jasanzexport.renderDataTab({tabContext: 'Details', rowData: 'coreDetails'});
	},

	sites: function()
	{
		nsFreshcare.auditor.jasanzexport.renderDataTab({tabContext: 'Sites', rowData: 'exportSites'});
	},

	schemes: function()
	{
		nsFreshcare.auditor.jasanzexport.renderDataTab({tabContext: 'Schemes', rowData: 'schemes'});
	},

	renderDataTab: 	function(oParam) 
	{
		var sTabContext = ns1blankspace.util.getParam(oParam, 'tabContext', {'default': 'Details'}).value;
		var sRowData = ns1blankspace.util.getParam(oParam, 'rowData', {'default': 'coreDetails'}).value;
		var aHTML = [];

		if ($('#ns1blankspaceMain' + sTabContext).attr('data-loading') == '1')
		{
			$('#ns1blankspaceMain' + sTabContext).attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspace' + sTabContext + 'Column1" class="ns1blankspaceColumn1">' + ns1blankspace.xhtml.loading + '</td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMain' + sTabContext).html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<table class="ns1blankspace" id="ns1blankspaceJASANZExport' + sTabContext + 'List"><tr>');

			// Get column headers from headers data
			$.each(nsFreshcare.auditor.jasanzexport.data.headers[sRowData], function()
			{
				if (this.inView) {aHTML.push('<td class="ns1blankspaceHeaderCaption">' + this.caption + '</td>')}
			});
			aHTML.push('</tr></table');

			$('#ns1blankspace' + sTabContext + 'Column1').html(aHTML.join(''));

			$.each(nsFreshcare.auditor.jasanzexport.data[sRowData], function(i, row)
			{
				aHTML = ['<tr>'];
				$.each(nsFreshcare.auditor.jasanzexport.data.headers[sRowData], function(j, mapping)
				{
					if (this.inView) {aHTML.push('<td class="ns1blankspaceRow">' + row[mapping.caption].formatXHTML() + '</td>')}
				});
				aHTML.push('</tr>');
				$("#ns1blankspaceJASANZExport" + sTabContext + "List tr").last().after(aHTML.join(''));
			});		
		}
	}

}							
