/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.grower.certificate = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 108;	
		ns1blankspace.objectName = 'certificate';
		ns1blankspace.objectParentName = 'grower';
		ns1blankspace.objectMethod = 'AGRI_CERTIFICATE';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Certificates';	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);

		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
	},

	home: 		function (oParam, oResponse)
	{
		var dToday = new Date();

		if (oResponse == undefined)
		{
			var aHTML = [];
						
			aHTML.push('<table class="ns1blankspaceMain">');
			aHTML.push('<tr class="ns1blankspaceMain">' +
							'<td id="ns1blankspaceMostLikely" class="ins1blankspaceMain">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'</tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMain').html(aHTML.join(''));
			
			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_CERTIFICATE_SEARCH';		
			oSearch.addField('agricertificate.certificatenumber,agricertificate.dateissued,agricertificate.enddate,agricertificate.subscription.id' +
							',agricertificate.subscription.membershiptext,agricertificate.subscription.firstcertified,agricertificate.subscription.membership' +
							',agricertificate.subscription.status,agricertificate.audit');
			oSearch.addFilter("agricertificate.subscription.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agricertificate.subscription.membership.status", 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	//v1.0.24
			///oSearch.addFilter("agricertificate.enddate", 'GREATER_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy')); v1.0.24 done in summary
			oSearch.sort('agricertificate.subscription.membershiptext', 'asc');
			
			oSearch.getResults(function(oResponse) {nsFreshcare.grower.certificate.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">No certificates found.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="8">My Certificates</td></tr>');	//v1.0.24
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption">Membership</td>' +
								'<td class="ns1blankspaceCaption">Certificate</td>' +
								'<td class="ns1blankspaceCaption">First Certified</td>' +
								'<td class="ns1blankspaceCaption">Date Issued</td>' +
								'<td class="ns1blankspaceCaption">Expires</td>' +
								'<td>&nbsp;</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function() {
					// v1.0.21 Allow user to print all certificates unless WD or FM
					var dToday = new Date();
					var dExpiry = (this['agricertificate.enddate'] != '') 
									? (new Date(this['agricertificate.enddate'])) 
									: undefined;
					var bCertified = (dExpiry && dExpiry > dToday);
					// v3.3.001 SUP023456 Don't allow Cert printing here if Member is Suspended
					var bShowCert = !(this['agricertificate.subscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD 
									|| this['agricertificate.subscription.status'] === nsFreshcare.data.grower.subscriptionStatusFM
									|| this['agricertificate.subscription.status'] === nsFreshcare.data.grower.subscriptionStatusSP );
					bShowCert = (bShowCert) ? (this['agrisubscription.agricertificate.id'] != "") : bShowCert;		// v1.0.24 as per customer.grower

					aHTML.push('<tr class="ns1blankspaceRow">');
					aHTML.push('<td id="ns1blankspaceMostLikely_membership-' + this['agricertificate.subscription.id'] + '" class="ns1blankspaceMostLikely">' +
											this["agricertificate.subscription.membershiptext"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_certificate-' + this['agricertificate.subscription.id'] + '" class="ns1blankspaceMostLikely">' +
											this["agricertificate.certificatenumber"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_firstcertified-' + this['agricertificate.subscription.id'] + '" class="ns1blankspaceMostLikely">' +
											this["agricertificate.subscription.firstcertified"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_dateissued-' + this['agricertificate.subscription.id'] + '" class="ns1blankspaceMostLikely">' +
											this["agricertificate.dateissued"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_expires-' + this['agricertificate.subscription.id'] + '" class="ns1blankspaceMostLikely">' +
											this["agricertificate.enddate"] + '</td>' +
								'<td id="ns1blankspaceMostLikelyCertificate_' + this.id + '"' + 
											((bShowCert) ? ' class="ns1blankspaceCertificatePrint"': '') +
											' data-membership="' +  this['agricertificate.subscription.membership'] + '"' +
											' data-auditID="' + this['agricertificate.audit'] + '">' +
											'</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				ns1blankspace.objectContextData = undefined;
				nsFreshcare.grower.certificate.search.send(event.target.id, {source: 1});
			});

			$('.ns1blankspaceCertificatePrint').button({
				icons: {
					primary: 'ui-icon-print'
				}
			})
			.css('height', '20px')
			.css('width', '27px')
			.click(function(event) 
			{
				var oRoot = ns1blankspace.rootnamespace;
				var iAuditID = $(this).attr('data-auditID');
				var fFunctionPrint = (oRoot.admin && oRoot.admin.certificate && oRoot.admin.certificate.printIndividualCertificate) 
										? oRoot.admin.certificate.printIndividualCertificate 
										: nsFreshcare.admin.certificate.printIndividualCertificate;

				ns1blankspace.objectContextData = {};
				
				fFunctionPrint({audit: iAuditID,
							   certificate: this.id.split('_').pop(),
							   membership: $(this).attr('data-membership'),
							   xhtmlElementID: this.id});
			});

		}
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, oParam)
		{
			var aSearch = sXHTMLElementId.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[1];
			var iMinimumLength = 3;
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
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('agrisubscription.agricertificate.certificatenumber,agrisubscription.agricertificate.dateissued' +
								',agrisubscription.agricertificate.enddate,agrisubscription.agricertificate.id,agrisubscription.agricertificate.audit' +
								',agrisubscription.membershiptext,agrisubscription.firstcertified,agrisubscription.membership,agrisubscription.lastauditdate');
				oSearch.addCustomOption('lastaudit', ',,N');

				// v3.1.1. Was adding extended fields to object 32 (as it was wrong in init) and search was erroring
				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.grower.certificate.show(oParam, data)});
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
					ns1blankspace.container.position({xhtmlElementID: sElementId});
					ns1blankspace.search.start();
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
					oSearch.addField('agrisubscription.agricertificate.certificatenumber,agrisubscription.membershiptext');
					
					oSearch.addBracket("(");
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						if (sSearchText != "ALL") {
							oSearch.addFilter('agrisubscription.agricertificate.certificatenumber', 'TEXT_STARTS_WITH', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('agrisubscription.membershiptext', 'TEXT_STARTS_WITH', sSearchText);
						}
					}
					else
					{	
						oSearch.addFilter('agrisubscription.agricertificate.certificatenumber', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator("or");
						oSearch.addFilter('agrisubscription.membershiptext', 'TEXT_IS_LIKE', sSearchText);
					}	
					oSearch.addBracket(')');

					oSearch.addFilter("agrisubscription.contactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
					oSearch.addFilter("agrisubscription.agricertificate.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
					
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.grower.certificate.search.process(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var iColumn = 0;
			var aHTML = [];
			var	iMaximumColumns = 1;
				
			if (oResponse.data.rows.length == 0)
			{
				ns1blankspace.search.stop();
				$(ns1blankspace.xhtml.container).hide();
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
					
					aHTML.push('<td class="ns1blankspaceSearch" id="certificatenumber' +
									'-' + this.id + '">' +
									this["agrisubscription.agricertificate.certificatenumber"] +
								'</td>'); 
					
					aHTML.push('<td class="ns1blankspaceSearch" id="membership' +
									'-' + this.id + '">' +
									this["agrisubscription.membershiptext"] + '</td>');
									
					if (iColumn == iMaximumColumns)
					{
						aHTML.push('</tr>');
						iColumn = 0;
					}	
				});
		    	
				aHTML.push('</table>');
				
				$(ns1blankspace.xhtml.container).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
				
				ns1blankspace.search.stop();
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.container).html('&nbsp;');
					$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.grower.certificate.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'agrisubscription.agricertificate.certificatenumber-agrisubscription.membershiptext',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.grower.certificate.search.send
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext === -1) {
			// Not permitted  but I've left it in here just in case
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Details</td></tr>');
		}
		else {			
			// We don't really need to see the word Summary here - it just confuses the user..
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
							'&nbsp;</td></tr>');
		}
					
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.grower.certificate.summary();
		});

		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
			nsFreshcare.grower.certificate.summary();
		});
	},

	show: 		function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;

		if (oParam) {
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
		if (iStep === 1) {
			nsFreshcare.grower.certificate.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find certificate.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			ns1blankspace.objectContextData = oResponse.data.rows[0];
			
			// Growers cannot update or add any certificates
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
		
			$('#ns1blankspaceControlContext').html(ns1blankspace.objectContextData["agrisubscription.membershiptext"].formatXHTML());
			
			// v2.0.4 Removed search.send from newDestination and now passes object with id to init
			ns1blankspace.history.view({
				newDestination: 'nsFreshcare.grower.certificate.init({id: ' + ns1blankspace.objectContext + ')',
				move: false
				});
			
			ns1blankspace.history.control({functionDefault: 'nsFreshcare.grower.certificate.summary()'});
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this certificate.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agrisubscription.membershiptext'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">First Certified</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agrisubscription.firstcertified'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Date Issued</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agrisubscription.agricertificate.dateissued'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Expires</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agrisubscription.agricertificate.enddate'].formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Last Audit</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['agrisubscription.lastauditdate'].formatXHTML() +
						'</td></tr>');

			aHTML.push('</table>');

			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));

			aHTML = [];

			// v1.0.21 Allow user to print all certs unless WD, FM or cert doesn't exist!
			var dToday = new Date();
			var dExpiry = (ns1blankspace.objectContextData['agrisubscription.agricertificate.enddate'] != '') 
							? (new Date(ns1blankspace.objectContextData['agrisubscription.agricertificate.enddate'])) 
							: undefined;
			var bCertified = (dExpiry && dExpiry > dToday);
			var bShowCert = !(this['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD || this['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusFM);
			bShowCert = (bShowCert) ? (this['agrisubscription.agricertificate.id'] != "") : bShowCert;

			aHTML.push('<table class="ns1blankspaceColumn2">');
			aHTML.push('<tr><td>');
			if (bShowCert) {
				aHTML.push('<span id="ns1blankspaceSummaryCertificate" class="ns1blankspaceAction">Print Certificate</span>');
			}
			else {
				aHTML.push('&nbsp;');
			}
			aHTML.push('</td></tr></table>');

			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));


			$('#ns1blankspaceSummaryCertificate').button({
				label: 'Print',
				icons: {
					primary: 'ui-icon-print'
				}
			})
			.click(function(event) 
			{
				var oRoot = ns1blankspace.rootnamespace;
				var fFunctionPrint = (oRoot.admin && oRoot.admin.certificate && oRoot.admin.certificate.printIndividualCertificate) 
										? oRoot.admin.certificate.printIndividualCertificate 
										: nsFreshcare.admin.certificate.printIndividualCertificate;

				fFunctionPrint({audit: ns1blankspace.objectContextData["agrisubscription.agricertificate.audit"],
							   certificate: ns1blankspace.objectContextData["agrisubscription.agricertificate.id"],
							   membership: ns1blankspace.objectContextData["agrisubscription.membership"],
							   xhtmlElementID: this.id,
					 		   buttons: {label: 'Print', icons: {primary: 'ui-icon-print'}}
							});
			});
		}	
	},

	details: 	function() 
	{

		nsFreshcare.grower.certificate.summary();
	}

}							
