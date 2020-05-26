/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.customer.home = 
{
	init: 	function (oParam) 
	{ 	// v3.1.2 reset object / objectcontext values
		ns1blankspace.object = undefined; 
		ns1blankspace.objectContext = -1; 
		 nsFreshcare.customer.home.show(); 
	},

	show: 	function (oParam) 
	{
			// v3.1.0e SUP022244 Will now work with history
			ns1blankspace.objectContext = -1;
			ns1blankspace.object = undefined;
			ns1blankspace.objectContextData = undefined;
			ns1blankspace.objectName = 'home';
			ns1blankspace.objectParentName = 'customer';

			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionBind = (oRoot.customer && oRoot.customer.home && oRoot.customer.home.bind)
								? oRoot.customer.home.bind
								: nsFreshcare.customer.home.bind;

			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.customer.home.show();',
				move: false
			});

			if (ns1blankspace.setupView)
			{	
				// v4.0.001 Bootstrap
				$('#ns1blankspaceViewControlSetup').attr('checked', false);
				//$('#ns1blankspaceViewControlSetup').button('refresh');
				ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.customer.home.show()'});
			}	

			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

			/*$('#ns1blankspaceViewControlViewContainer').button(
				{
					label: 'Growers'
				});*/

			var aHTML = [];
			
			aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
			
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlNewCertificates" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'New Certificates</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlSuppliers2MonthCertification" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Expiring Suppliers</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlSuppliersNotCertified" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Suppliers Not Certified</td>' +
							'</tr>');
			
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlSuppliersChangedStatus" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Supplier Status Changes</td>' +
							'</tr>');
			
			aHTML.push('<tr><td>&nbsp;</td></tr>');
			//aHTML.push(nsFreshcare.external.home.resources.buildElement());	v2.0.4 SUP021426 removed

			aHTML.push('</table>');					
					
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			fFunctionBind();

			ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlNewCertificates';
			
			var aHTML = [];
			
			aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
			aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
			aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
			//aHTML.push('<td id="ns1blankspaceHomeColumn2" class="ns1blankspaceColumn2" style="width:300px;"></td>');
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
			
			nsFreshcare.customer.home.newCertificates.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});

		$('#ns1blankspaceControlSuppliers2MonthCertification').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.customer.home.suppliersExpiring.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});

		$('#ns1blankspaceControlSuppliersNotCertified').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.customer.home.suppliersNotCertified.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});

		$('#ns1blankspaceControlSuppliersChangedStatus').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.customer.home.supplierStatus.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				})
		});

		//nsFreshcare.external.home.resources.bindElement();	v2.0.4 SUP021426 removed
		
	},

	newCertificates: 	
	{

		search: function(oParam) 
		{
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'agrisubscription.contactbusiness.tradename'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			var dToday = new Date();
			var dMonthAgo = new Date();
			dMonthAgo.setMonth(dMonthAgo.getMonth() -1);

			if (oParam)
			{	oParam.sortColumn = sSortColumn; oParam.sortDirection = sSortDirection;}

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'agri';
			oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
			oSearch.addField('agrisubscription.contactbusiness.tradename,agrisubscription.contactbusiness.legalname,agrisubscription.contactbusiness.addresslink.address.addresssuburb' +
							',agrisubscription.contactperson.firstname,agrisubscription.contactperson.surname,agrisubscription.contactbusiness.id' +
							',agrisubscription.membershiptext,agrisubscription.codeofpracticetext,agrisubscription.statustext' +
							',agrisubscription.agricertificate.dateissued,agrisubscription.agricertificate.certificatenumber');

			oSearch.addFilter('agrisubscription.agricertificate.dateissued', 'BETWEEN', dMonthAgo.toString('dd MMM yyyy'), dToday.toString('dd MMM yyyy'));
			if (nsFreshcare.data.customerExSupplierList.length > 0) {
				oSearch.addFilter("agrisubscription.contactbusiness", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
			}
			oSearch.addFilter('agrisubscription.membership.status', 'EQUAL_TO', '2');	// v1.0.24 Only show current Memberships
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.objectcontext', 'EQUAL_TO', 'field:agrisubscription.contactbusiness');
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');

			oSearch.sort(sSortColumn, sSortDirection);

			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					nsFreshcare.customer.home.newCertificates.show(oParam, oResponse);
				}
				else
				{
					ns1blankspace.status.error('Error finding Supplier Certificates: ' + oResponse.error.errornotes);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{
			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Suppliers with Certificate issued in last month.';
			var dToday = new Date();
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'agrisubscription.contactbusiness.tradename'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionSearch = (oRoot.customer && oRoot.customer.home && oRoot.customer.home.newCertificates && oRoot.customer.home.newCertificates.search)
									? oRoot.customer.home.newCertificates.search
									: nsFreshcare.customer.home.newCertificates.search;
			var sSupplierText = ns1blankspace.util.getParam(oParam, 'supplierText', {'default': 'Supplier'}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') 
			{

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceHomeNewCertificates"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeNewCertificatesResults" class="ns1blankspaceColumn1Flexible"></td>'); 
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.newCertificates.show)
				fFunctionSearch(oParam);
			}
			else if (oResponse === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.newCertificates.show)
				fFunctionSearch(oParam);
			}

			if (oResponse) 
			{
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + sSupplierText + 's with new Certificates in the last month.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeNewCertificatesResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomeNewCertificatesResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomeNewCertificates" class="ns1blankspace">');
					}	
					
					var sBusinessColumn = (bShowLegalName) ? 'agrisubscription.contactbusiness.legalname' : 'agrisubscription.contactbusiness.tradename';
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.contactperson.firstname"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.contactperson.firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.contactbusiness.addresslink.address.addresssuburb"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.addresslink.address.addresssuburb") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Location</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.membershiptext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.membershiptext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.codeofpracticetext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.codeofpracticetext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>COP</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.statustext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.statustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Status</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.agricertificate.certificatenumber"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.agricertificate.certificatenumber") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Certificate Number</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.agricertificate.dateissued"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.agricertificate.dateissued") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Date Issued</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	
					{
						aHTML.push(nsFreshcare.customer.home.newCertificates.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomeNewCertificatesResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeNewCertificatesResults',
						xhtmlContext: 'HomeNewCertificates',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.customer.home.newCertificates.row,
						functionOnNewPage: nsFreshcare.customer.home.newCertificates.bind,
						type: 'json'
					}); 
					ns1blankspace.render.page.show(oParam);	
					
					//nsFreshcare.customer.home.newCertificates.bind(oParam);
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['agrisubscription.contactbusiness.tradename'] != oRow['agrisubscription.contactbusiness.legalname'])
								? oRow['agrisubscription.contactbusiness.legalname'] + '<br />(' + oRow['agrisubscription.contactbusiness.tradename'] + ')'
								: oRow['agrisubscription.contactbusiness.tradename'];
			var aHTML = [];

			// v1.0.24 COlumns in wrong order compared to headers
			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_contactbusiness-' + oRow['agrisubscription.contactbusiness.id'] + '"' +
								' class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['agrisubscription.contactbusiness.tradename']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_contactperson-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['agrisubscription.contactperson.firstname'] + ' ' + oRow['agrisubscription.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_location-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.contactbusiness.addresslink.address.addresssuburb'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_membership-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_cop-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.codeofpracticetext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_status-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.statustext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_number-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.agricertificate.certificatenumber'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates_issued-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.agricertificate.dateissued'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNewCertificates-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');

		},

		bind: 	function(oParam) 
		{

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{
				nsFreshcare.customer.grower.init({showHome: false});
				nsFreshcare.customer.grower.search.send(this.id, {source: 1});
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.customer.home.newCertificates.show(oParam);
				});
		}
	},

	suppliersExpiring: 	
	{

		search: function(oParam) 
		{

			var dToday = new Date();

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'agri';
			oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
			oSearch.addField('agrisubscription.contactbusiness.tradename,agrisubscription.contactbusiness.addresslink.address.addresssuburb' +
							',agrisubscription.contactperson.firstname,agrisubscription.contactperson.surname,agrisubscription.contactbusiness.id' +
							',agrisubscription.membershiptext,agrisubscription.codeofpracticetext,agrisubscription.statustext,agrisubscription.lastauditdate' +
							',agrisubscription.agricertificate.enddate');

			if (nsFreshcare.data.customerExSupplierList.length > 0) {
				oSearch.addFilter("agrisubscription.contactbusiness", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
			}
			oSearch.addFilter('agrisubscription.membership.status', 'EQUAL_TO', '2');	// v1.0.24 Only show current Memberships
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.objectcontext', 'EQUAL_TO', 'field:agrisubscription.contactbusiness');
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');
			oSearch.addCustomOption('Certificate2MonthsExpiry', 'Y');
			oSearch.addCustomOption('LastAudit', ',,N');
			oSearch.sort('agrisubscription.contactbusiness.tradename', 'asc');

			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {
					nsFreshcare.customer.home.suppliersExpiring.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{
			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Suppliers with Certificates expiring in 2 Months';
			var dToday = new Date();
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'agrisubscription.contactbusiness.tradename'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionSearch = (oRoot.customer && oRoot.customer.home && oRoot.customer.home.suppliersExpiring && oRoot.customer.home.suppliersExpiring.search)
									? oRoot.customer.home.suppliersExpiring.search
									: nsFreshcare.customer.home.suppliersExpiring.search;
			var sSupplierText = ns1blankspace.util.getParam(oParam, 'supplierText', {'default': 'Supplier'}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') {

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceHomeSuppliersExpiring"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiringResults" class="ns1blankspaceColumn1Flexible"></td>'); 
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.suppliersExpiring.show)
				fFunctionSearch(oParam);
			}
			else if (oResponse === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.suppliersExpiring.show)
				fFunctionSearch(oParam);
			}

			if (oResponse) {
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + sSupplierText + 's with Certificates expiring in 2 months.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeSuppliersExpiringResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomeSuppliersExpiringResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomeSuppliersExpiring" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');

					var sBusinessColumn = (bShowLegalName) ? 'agrisubscription.contactbusiness.legalname' : 'agrisubscription.contactbusiness.tradename';
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.contactperson.firstname"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.contactperson.firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.contactbusiness.addresslink.address.addresssuburb"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.addresslink.address.addresssuburb") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Location</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.membershiptext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.membershiptext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.agricertificate.enddate"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.agricertificate.enddate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Certificate Expiry</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.lastauditdate"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.lastauditdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Last Audit Date</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.statustext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.statustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Status</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.codeofpracticetext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.codeofpracticetext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>COP</td>');
					aHTML.push('<td class="ns1blankspaceCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.customer.home.suppliersExpiring.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomeSuppliersExpiringResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeSuppliersExpiringResults',
						xhtmlContext: 'HomeSuppliersExpiring',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.customer.home.suppliersExpiring.row,
						functionOnNewPage: nsFreshcare.customer.home.suppliersExpiring.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
					
					//nsFreshcare.customer.home.suppliersExpiring.bind(oParam);
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['agrisubscription.contactbusiness.tradename'] != oRow['agrisubscription.contactbusiness.legalname'])
								? oRow['agrisubscription.contactbusiness.legalname'] + '<br />(' + oRow['agrisubscription.contactbusiness.tradename'] + ')'
								: oRow['agrisubscription.contactbusiness.tradename'];
			var aHTML = [];
			// v1.0.24 COlumns in wrong order compaed to headers

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_contactbusiness-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['agrisubscription.contactbusiness.tradename']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_contactperson-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['agrisubscription.contactperson.firstname'] + ' ' + oRow['agrisubscription.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_location-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.contactbusiness.addresslink.address.addresssuburb'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_membership-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_expiry-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.agricertificate.enddate'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_lastaudit-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.lastauditdate'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_status-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.statustext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring_cop-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.codeofpracticetext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSuppliersExpiring-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');

		},

		bind: 	function(oParam) 
		{

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{
				nsFreshcare.customer.grower.init({showHome: false});
				nsFreshcare.customer.grower.search.send(this.id, {source: 1});
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.customer.home.suppliersExpiring.show(oParam);
				});
		}

	},

	suppliersNotCertified: 	
	{

		search: function(oParam) 
		{

			var dToday = new Date();

			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'agri';
			oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
			oSearch.addField('agrisubscription.contactbusiness.tradename,agrisubscription.contactbusiness.addresslink.address.addresssuburb' +
							',agrisubscription.contactperson.firstname,agrisubscription.contactperson.surname,agrisubscription.contactbusiness.id' +
							',agrisubscription.membershiptext,agrisubscription.codeofpracticetext,agrisubscription.statustext' +
							',agrisubscription.agricertificate.enddate,agrisubscription.agricertificate.certificatenumber');

			oSearch.addFilter('agrisubscription.agricertificate.enddate', 'LESS_THAN', dToday.toString('dd MMM yyyy'));
			if (nsFreshcare.data.customerExSupplierList.length > 0) {
				oSearch.addFilter("agrisubscription.contactbusiness", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
			}
			oSearch.addFilter('agrisubscription.membership.status', 'EQUAL_TO', '2');	// v1.0.24 Only show current Memberships
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("agrisubscription.contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.objectcontext', 'EQUAL_TO', 'field:agrisubscription.contactbusiness');
			oSearch.addFilter('agrisubscription.contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');

			oSearch.sort('agrisubscription.contactbusiness.tradename', 'asc');

			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {
					nsFreshcare.customer.home.suppliersNotCertified.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{
			var bShow = false;
			var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
			var sLabel = 'Suppliers Not Certified.';
			var dToday = new Date();
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'agrisubscription.contactbusiness.tradename'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionSearch = (oRoot.customer && oRoot.customer.home && oRoot.customer.home.suppliersNotCertified && oRoot.customer.home.suppliersNotCertified.search)
									? oRoot.customer.home.suppliersNotCertified.search
									: nsFreshcare.customer.home.suppliersNotCertified.search;
			var sSupplierText = ns1blankspace.util.getParam(oParam, 'supplierText', {'default': 'Supplier'}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') {

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceHomeNotCertified"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeNotCertifiedResults" class="ns1blankspaceColumn1Flexible"></td>'); 
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.suppliersNotCertified.show)
				fFunctionSearch(oParam);
			}
			else if (oResponse === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.suppliersNotCertified.show)
				fFunctionSearch(oParam);
			}

			if (oResponse) 
			{
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No uncertified ' + sSupplierText + 's.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeNotCertifiedResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomeNotCertifiedResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomeNotCertified" class="ns1blankspace">');
					}	
					
					var sBusinessColumn = (bShowLegalName) ? 'agrisubscription.contactbusiness.legalname' : 'agrisubscription.contactbusiness.tradename';
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.contactperson.firstname"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.contactperson.firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.contactbusiness.addresslink.address.addresssuburb"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.addresslink.address.addresssuburb") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Location</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.membershiptext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.membershiptext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.codeofpracticetext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.codeofpracticetext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>COP</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.statustext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.statustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Status</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.agricertificate.certificatenumber"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.agricertificate.certificatenumber") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Certificate Number</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscription.agricertificate.enddate"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscription.agricertificate.enddate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Date Expired</td>');
					aHTML.push('<td class="ns1blankspaceCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.customer.home.suppliersNotCertified.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomeNotCertifiedResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeNotCertifiedResults',
						xhtmlContext: 'HomeNotCertified',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.customer.home.suppliersNotCertified.row,
						functionOnNewPage: nsFreshcare.customer.home.suppliersNotCertified.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
					
					//nsFreshcare.customer.home.suppliersNotCertified.bind(oParam);
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['agrisubscription.contactbusiness.tradename'] != oRow['agrisubscription.contactbusiness.legalname'])
								? oRow['agrisubscription.contactbusiness.legalname'] + '<br />(' + oRow['agrisubscription.contactbusiness.tradename'] + ')'
								: oRow['agrisubscription.contactbusiness.tradename'];
			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeNotCertified_contactbusiness-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['agrisubscription.contactbusiness.tradename']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeNotCertified_contactperson-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['agrisubscription.contactperson.firstname'] + ' ' + oRow['agrisubscription.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeNotCertified_location-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.contactbusiness.addresslink.address.addresssuburb'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNotCertified_membership-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNotCertified_cop-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.codeofpracticetext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNotCertified_status-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.statustext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNotCertified_number-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.agricertificate.certificatenumber'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNotCertified_issued-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscription.agricertificate.enddate'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeNotCertified-' + oRow['agrisubscription.contactbusiness.id'] + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');

		},

		bind: 	function(oParam) 
		{

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{
				nsFreshcare.customer.grower.init({showHome: false});
				nsFreshcare.customer.grower.search.send(this.id, {source: 1});
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.customer.home.suppliersNotCertified.show(oParam);
				});
		}

	},

	supplierStatus: 	
	{

		search: function(oParam) 
		{

			var aResultStatusFilter = [];
			var dToday = new Date();

			$('.ns1blankspaceResultStatus').each(function() {
				if ($(this).attr('data-selected') === '1') {
					aResultStatusFilter.push(this.id.split('_')[1]);
				}
			});
			
			var oSearch = new AdvancedSearch();
			oSearch.endPoint = 'agri';
			oSearch.method = 'AGRI_MEMBERSHIP_STATUS_CHANGE_SEARCH';
			oSearch.addField('agrisubscriptionstatuschange.subscription.contactbusiness.tradename,agrisubscriptionstatuschange.subscription.contactbusiness.addresslink.address.addresssuburb' +
							',agrisubscriptionstatuschange.subscription.contactperson.firstname,agrisubscriptionstatuschange.subscription.contactperson.surname' +
							',agrisubscriptionstatuschange.subscription.membershiptext,agrisubscriptionstatuschange.subscription.codeofpracticetext' +
							',agrisubscriptionstatuschange.subscription.statustext,agrisubscriptionstatuschange.changedate,agrisubscriptionstatuschange.subscription.contactbusiness.id' +
							',agrisubscriptionstatuschange.fromstatustext,agrisubscriptionstatuschange.tostatustext');

			if (nsFreshcare.data.customerExSupplierList.length > 0) {
				oSearch.addFilter("agrisubscriptionstatuschange.subscription.contactbusiness.id", "NOT_IN_LIST", nsFreshcare.data.customerExSupplierList.join(','));
			}
			oSearch.addFilter('agrisubscriptionstatuschange.subscription.membership.status', 'EQUAL_TO', '2');	// v1.0.24 Only show current Memberships
			oSearch.addFilter("agrisubscriptionstatuschange.subscription.contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", ns1blankspace.user.contactBusiness);
			oSearch.addFilter("agrisubscriptionstatuschange.subscription.contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipSupplier);
			oSearch.addFilter("agrisubscriptionstatuschange.subscription.contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addBracket("(");
			oSearch.addFilter("agrisubscriptionstatuschange.subscription.contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
			oSearch.addOperator("or");
			oSearch.addFilter("agrisubscriptionstatuschange.subscription.contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
			oSearch.addBracket(")");
			if ($('#ns1blankspaceChange_From').val() != '') {

				oSearch.addFilter("agrisubscriptionstatuschange.changedate", "GREATER_THAN_OR_EQUAL_TO", $('#ns1blankspaceChange_From').val());
			}
			if ($('#ns1blankspaceChange_To').val() != '') {

				oSearch.addFilter("agrisubscriptionstatuschange.changedate", "LESS_THAN_OR_EQUAL_TO", $('#ns1blankspaceChange_To').val());
			}

			oSearch.sort('agrisubscriptionstatuschange.subscription.contactbusiness.tradename', 'asc');
			oSearch.sort('agrisubscriptionstatuschange.changedate', 'desc');
			oSearch.addFilter('agrisubscriptionstatuschange.subscription.contactbusiness.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
			oSearch.addFilter('agrisubscriptionstatuschange.subscription.contactbusiness.addresslink.objectcontext', 'EQUAL_TO', 'field:agrisubscriptionstatuschange.subscription.contactbusiness');
			oSearch.addFilter('agrisubscriptionstatuschange.subscription.contactbusiness.addresslink.address.status', 'EQUAL_TO', '1');

			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK') {
					nsFreshcare.customer.home.supplierStatus.show(oParam, oResponse);
				}
			});
		},

		show: 	function(oParam, oResponse) 
		{
			var bShow = false;
			var sXHTMLElementID = 'Suppliers recently changed Status';
			var dToday = new Date();
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'agrisubscription.contactbusiness.tradename'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'asc'}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var fFunctionSearch = (oRoot.customer && oRoot.customer.home && oRoot.customer.home.supplierStatus && oRoot.customer.home.supplierStatus.search)
									? oRoot.customer.home.supplierStatus.search
									: nsFreshcare.customer.home.supplierStatus.search;
			var sSupplierText = ns1blankspace.util.getParam(oParam, 'supplierText', {'default': 'Supplier'}).value;
			
			if (oParam != undefined)
			{
				if (oParam.show != undefined) {bShow = oParam.show}
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.label != undefined) {sLabel = oParam.label}
			}

			var aHTML = [];
			
			// First, let's construct the display and filtering areas
			if ($('#' + sXHTMLElementID).attr('data-loading') === '1') {

				$('#' + sXHTMLElementID).attr('data-loading', '');
				
				aHTML.push('<table id="ns1blankspaceHomeSupplierStatus"><tr>');
				aHTML.push('<td id="ns1blankspaceHomeSupplierStatusResults" class="ns1blankspaceColumn1Flexible"></td>' +
						   '<td id="ns1blankspaceHomeAuditSearchRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
						   '<td id="ns1blankspaceHomeSupplierStatusFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementID).html(aHTML.join(''));

				// Search criteria bar 'handle' - allows user to get the search criteria div back into view
				// v4.0.001 Bootstrap
				aHTML = [];
				aHTML.push('<span id="ns1blankspaceHomeSupplierStatusSearchHandle" style="height:25px" title="Search Criteria"></span>');
				$('#ns1blankspaceHomeAuditSearchRibbon').html(aHTML.join(''));

				// Filtering area
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

				aHTML.push('<tr><td id="ns1blankspaceHomeSupplierStatusSearch" class="ns1blankspaceAction">Search</td></tr>');

				aHTML.push('<tr><td id="ns1blankspaceSupplierStatusMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Change Date</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">From:&nbsp;</td></tr>');
				aHTML.push('<tr><td><input id="ns1blankspaceChange_From" class="ns1blankspaceDate"></td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">To:&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>'); 
				aHTML.push('<tr><td><input id="ns1blankspaceChange_To" class="ns1blankspaceDate"></td></tr>');

				aHTML.push('</table>')

				$('#ns1blankspaceHomeSupplierStatusFilter').html(aHTML.join(''));

				ns1blankspace.util.initDatePicker({select: 'input.ns1blankspaceDate'});

				var dStart = nsFreshcare.util.startMonth();
				$('#ns1blankspaceChange_From').val(dStart.toString('dd MMM yyyy'));
				$('#ns1blankspaceChange_To').val(dToday.toString('dd MMM yyyy'));

				$('#ns1blankspaceHomeSupplierStatusSearchHandle').button({
					text: false,
					icons: {
						primary: 'ui-icon-arrowthickstop-1-w'
					}
				})
				.css('width', '12px')
				.css('height', '25px')
				.click(function() {
					$('#ns1blankspaceHomeSupplierStatusSearchHandle').hide();
					$('#ns1blankspaceHomeSupplierStatusFilter').show('slide', {direction: 'left'}, 1000);
				});
				$('#ns1blankspaceHomeSupplierStatusSearchHandle').hide();

				$('#ns1blankspaceHomeSupplierStatusSearch').button({
					label: "Search"
				})
				.click(function() {

					ns1blankspace.okToSave = true;

					var dFrom = new Date($('#ns1blankspaceAudit_From').val());
					var dTo = new Date($('#ns1blankspaceAudit_To').val());

					if ($('#ns1blankspaceChange_From').val() === '' || $('#ns1blankspaceChange_To').val() === '') {
						$('#ns1blankspaceSupplierStatusMessage').html('Please enter both From and To dates.');
						ns1blankspace.okToSave = false;
					}
					else if (dFrom > dTo) {
						$('#ns1blankspaceSupplierStatusMessage').html('From date must be after To date.');
						ns1blankspace.okToSave = false;
					}

					if (ns1blankspace.okToSave) {

						$('#ns1blankspaceHomeSupplierStatusFilter').hide({duration: 200, complete: function() {

							$('#ns1blankspaceHomeSupplierStatusSearchHandle').show();
							$('#ns1blankspaceHomeSupplierStatusResults').html(ns1blankspace.xhtml.loading);
							oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.supplierStatus.show)
							fFunctionSearch(oParam);
						}});

					}
					else {
						window.setTimeout('$("#ns1blankspaceSupplierStatusMessage").fadeOut(4000)', 7000);
					}
				});
			}
			else if (oResponse === undefined)
			{
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.customer.home.supplierStatus.show)
				fFunctionSearch(oParam);
			}

			if (oResponse) {
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table class="ns1blankspaceHome">');
					aHTML.push('<tr><td class="ns1blankspaceNothing">No ' + sSupplierText + 's matching this criteria.</td></tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceHomeSupplierStatusResults').html(aHTML.join(''));
					if (bShow) {$('#ns1blankspaceHomeSupplierStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
				}
				else
				{
					if (bShow)
					{
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');

						aHTML.push('<tr><td class="ns1blankspaceCaption">' + sLabel + '</td>' + 
										'<td id="ns1blankspaceHomeTodayActions" class="ns1blankspaceHomeOptionClose">Close</td>' +
										'</tr></table>');
						
						aHTML.push('<table id="ns1blankspaceHomeActions" class="ns1blankspace">');
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceHomeSuplierStatus" class="ns1blankspace">');
					}	
					
					aHTML.push('<tr class="ns1blankspaceCaption">');

					var sBusinessColumn = (bShowLegalName) ? 'agrisubscription.contactbusiness.legalname' : 'agrisubscription.contactbusiness.tradename';
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="' + sBusinessColumn + '"' +
									' data-sortdirection="' + ((sSortColumn == sBusinessColumn) ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.subscription.contactperson.firstname"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscriptionstatuschange.subscription.contactperson.firstname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Contact</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.subscription.contactbusiness.addresslink.address.addresssuburb"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.addresslink.address.addresssuburb") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Location</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.fromstatustext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscriptionstatuschange.fromstatustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Original Status</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.tostatustext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscriptionstatuschange.tostatustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>New Status</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.changedate"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscriptionstatuschange.changedate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Date Changed</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.subscription.codeofpracticetext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscriptionstatuschange.subscription.codeofpracticetext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>COP</td>');
					aHTML.push('<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="agrisubscriptionstatuschange.subscription.membershiptext"' +
									' data-sortdirection="' + ((sSortColumn == "agrisubscriptionstatuschange.subscription.membershiptext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Membership</td>');
					aHTML.push('<td class="ns1blankspaceCaption">&nbsp;</td>');
					aHTML.push('</tr>');

					$.each(oResponse.data.rows, function() 	{
						aHTML.push(nsFreshcare.customer.home.supplierStatus.row(this, oParam));
					});
					
					aHTML.push('</table>');

					if (bShow) {$('#ns1blankspaceHomeSupplierStatusResults').show(ns1blankspace.option.showSpeedOptions)}	
					
					$.extend(true, oParam,
					{
						xhtmlElementID: 'ns1blankspaceHomeSupplierStatusResults',
						xhtmlContext: 'HomeSupplierStatus',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == 'true'),
						more: oResponse.moreid,
						rows: 20,
						functionShowRow: nsFreshcare.customer.home.supplierStatus.row,
						functionOnNewPage: nsFreshcare.customer.home.supplierStatus.bind,
						type: 'json'
					}); 	
					ns1blankspace.render.page.show(oParam);
					
					//nsFreshcare.customer.home.supplierStatus.bind(oParam);
				}
			}
		},

		row: 	function(oRow, oParam) 
		{
			var bShowLegalName = ns1blankspace.util.getParam(oParam, 'showLegalName', {'default': false}).value;
			var sBusinessName = (oRow['agrisubscriptionstatuschange.subscription.contactbusiness.tradename'] != oRow['agrisubscriptionstatuschange.subscription.contactbusiness.legalname'])
								? oRow['agrisubscriptionstatuschange.subscription.contactbusiness.legalname'] + '<br />(' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.tradename'] + ')'
								: oRow['agrisubscriptionstatuschange.subscription.contactbusiness.tradename'];
			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceRow">');
						
			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_contactbusiness-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									((bShowLegalName) ? sBusinessName : oRow['agrisubscriptionstatuschange.subscription.contactbusiness.tradename']) + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_contactperson-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow ns1blankspaceRowContact">' +
									oRow['agrisubscriptionstatuschange.subscription.contactperson.firstname'] + ' ' + oRow['agrisubscriptionstatuschange.subscription.contactperson.surname'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_location-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscriptionstatuschange.subscription.contactbusiness.addresslink.address.addresssuburb'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_fromstatus-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscriptionstatuschange.fromstatustext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_tostatus-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscriptionstatuschange.tostatustext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_changedate-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscriptionstatuschange.changedate'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_cop-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscriptionstatuschange.subscription.codeofpracticetext'] + '</td>');

			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus_membership-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceRow">' +
									oRow['agrisubscriptionstatuschange.subscription.membershiptext'] + '</td>');
		
			aHTML.push('<td id="ns1blankspaceHomeSupplierStatus-' + oRow['agrisubscriptionstatuschange.subscription.contactbusiness.id'] + '" class="ns1blankspaceMainRowOptionsSelect"></td>');

			return aHTML.join('');

		},

		bind: 	function(oParam) 
		{

			$('.ns1blankspaceMainRowOptionsSelect').button( {
				text: false,
				icons: {
					primary: "ui-icon-play"
				}
			})
			.click(function()
			{
				nsFreshcare.customer.grower.init({showHome: false});
				nsFreshcare.customer.grower.search.send(this.id, {source: 1});
			})
			.css('width', '15px')
			.css('height', '18px');

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.customer.home.supplierStatus.show(oParam);
				});
		}

	}			
}

nsFreshcare.customer.home.report = 
{
	initData: 	function (oParam)
	{
		// v1.0.24 Added Cert Expiry and Mem Status & customExportFormat to report
		var bAll = true;
		var dToday = new Date();
		var oRoot = ns1blankspace.rootnamespace;
		var sStreetAddresses = "contactbusiness.addresslink.address.address1-" +
								"contactbusiness.addresslink.address.address2-" +
								"contactbusiness.addresslink.address.addresssuburb-" +
								"contactbusiness.addresslink.address.addressstate-" + 
								"contactbusiness.addresslink.address.addresspostcode-" +
								"contactbusiness.addresslink.address.addresscountry"; 

		// 2.0.4 SUP021142 Changed showSort to true & fixed scriptOpen so opens in new tab
		if (oParam != undefined)
		{
			if (oParam.all != undefined) {bAll = oParam.all}
		}
				
		// v4.0.015 Removed applytosubsearchjoin filter parameters
		ns1blankspace.report.reports =
		[
			{
				name: "My Suppliers",
				object:  nsFreshcare.objectBusiness,
				objectName: "contactbusiness",
				method: "CONTACT_BUSINESS_SEARCH",
				returnParameters: 'contactbusiness' +
								 ',contactbusiness.relationshipbusiness' +
								 ',contactbusiness.contactperson' +
								 ',contactbusiness.address' +
								 ',contactbusiness.addresslink.address' +
								 ',contactbusiness.agrisubscription' +
								 ',contactbusiness.agrisubscription.agricertificate',
				functionSearch: nsFreshcare.customer.grower.search.send,
				windowOpen: '/#/nsFreshcare-customer.grower/id:',
				showSort: true,
				customExportFormat:
				{
					headers:
					{
						captionsAsHeaders: true,
						delimiter: ',',
						surroundWith: '"'
					},
					items:
					{
						delimiter: ',',
						surroundWith: '"'
					}
				},
				fixedParameters:
				{
					customOptions:
					[
						{name: "lastAudit", value: ",,Y"}
					],
					filters:
					[	/* v3.1.205 SUP023044 Don't show suppliers who have an end date */
						{
							name: "contactbusiness.relationshipbusiness.othercontactbusiness",
							comparison: "EQUAL_TO",
							value1: ns1blankspace.user.contactBusiness,
							value2: ""
						},
						{
							name: "contactbusiness.relationshipbusiness.type",
							comparison: "EQUAL_TO",
							value1: nsFreshcare.data.relationshipSupplier,
							value2: ""
						},
						{
							name: "contactbusiness.relationshipbusiness.startdate",
							comparison: "LESS_THAN_OR_EQUAL_TO",
							value1: dToday.toString('dd MMM yyyy'),
							value2: ""
						},
						{
							bracketBefore: '(',
							name: "contactbusiness.relationshipbusiness.enddate",
							comparison: "GREATER_THAN_OR_EQUAL_TO",
							value1: dToday.toString('dd MMM yyyy'),
							value2: ""
						},
						{
							operatorBefore: 'or',
							name: "contactbusiness.relationshipbusiness.enddate",
							comparison: "IS_NULL",
							value1: '',
							value2: "",
							bracketAfter: ')'
						},
						{
							name: "contactbusiness.contactperson.id",
							comparison: "EQUAL_TO",
							value1: "field:contactbusiness.primarycontactperson",
							value2: "",
							value3: "",
							applyToSubSearchJoin: "Y"
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: sStreetAddresses},
							name: 'contactbusiness.addresslink.object',
							comparison: 'EQUAL_TO',
							value1: nsFreshcare.objectBusiness,
							value2: ''
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: sStreetAddresses},
							name: 'contactbusiness.addresslink.objectcontext',
							comparison: 'EQUAL_TO',
							value1: 'field:id',
							value2: ''
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: sStreetAddresses},
							name: 'contactbusiness.addresslink.address.status',
							comparison: 'EQUAL_TO',
							value1: '1',
							value2: ''
						},
						{
							includeEval: ns1blankspace.report.fieldIncluded,
							includeParameters: {fields: "contactbusiness.agrisubscription.*"},
							name: 'contactbusiness.agrisubscription.membership.status',
							comparison: 'EQUAL_TO',
							value1: nsFreshcare.data.membershipStatusActive,
							value2: '',
							value3: ''
						}
					],
					customOptions:
					[
						{option: 'subsearchfilterjoinall', value: 'Y'}
					]
				},
				selectableParameters: 
				{
					fields: 
					[
						{name: "contactbusiness.tradename"},
						{name: "contactbusiness.contactperson.firstname"},
						{name: "contactbusiness.contactperson.surname"},
						{name: "contactbusiness.addresslink.address.addresssuburb"},
						{name: "contactbusiness.addresslink.address.addressstate"},
						{name: "contactbusiness.agrisubscription.codeofpracticetext"},
						{name: "contactbusiness.agrisubscription.lastauditdate"},
						{name: "contactbusiness.agrisubscription.membershiptext"},
						{name: "contactbusiness.agrisubscription.statustext"},
						{name: "contactbusiness.agrisubscription.agricertificate.certificatenumber"},
						{name: "contactbusiness.agrisubscription.agricertificate.enddate"}
					]
				}
			}
		];		

		ns1blankspace.report.dictionary =
		[ 
			
			{name: "contactbusiness.tradename", caption: "Business Name"},
			{name: "contactbusiness.contactperson.firstname", caption: "First Name"},
			{name: "contactbusiness.contactperson.surname", caption: "Surname"},
			{name: "contactbusiness.addresslink.address.addresssuburb", caption: "Location"},
			{name: "contactbusiness.addresslink.address.addressstate", caption: "State"},
			{name: "contactbusiness.agrisubscription.codeofpracticetext", caption: "COP"},
			{name: "contactbusiness.agrisubscription.lastauditdate", caption: "Last Audit Date"},
			{name: "contactbusiness.agrisubscription.statustext", caption: "Status"},
			{name: "contactbusiness.agrisubscription.membershiptext", caption: "Membership"},
			{name: "contactbusiness.agrisubscription.agricertificate.certificatenumber", caption: "Certificate Number"},
			{name: "contactbusiness.agrisubscription.agricertificate.enddate", caption: "Certificate Expiry"},
					
		];

		ns1blankspace.report.selectAttributes = 			
		[
			{	
				name: "contactbusiness.agrisubscription.membershiptext",
				columns: "title",
				methodFilter: 'status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive,
				click: 'nsFreshcare.customer.home.report.filterCOP'
			},
			{	
				name: "contactbusiness.agrisubscription.codeofpracticetext",
				columns: "code-space-membershiptext",
				methodFilter: "agricodeofpractice.membership.status-EQUAL_TO-" + nsFreshcare.data.membershipStatusActive
			}
		];
	
		// Call init function for forked app if it exists
		if (oRoot.customer && oRoot.customer.report && oRoot.customer.report.initData && $.type(oRoot.customer.report.initData) === 'function')
		{
			oRoot.customer.report.initData();
		}

	},

	filterCOP: 	function()
	{
		// Set COP to filter on selected membership
		// Update both Comparison and Input (if rendered)
		var sXHTMLElementID = ns1blankspace.xhtml.divID;
		var sCurrentFilter = $("#ns1blankspaceReport_comparison-contactbusiness_agrisubscription_codeofpracticetext-text")
				.attr('data-methodFilter');
		if (sCurrentFilter === undefined) {sCurrentFilter = ''} 
		var aCurrentFilter = sCurrentFilter.split('|'); 

		// If membership filter already exists, remove it first
		if (aCurrentFilter.length > 0)
		{
			aCurrentFilter = $.grep(aCurrentFilter, function(a) {return a.substr(0,20) != 'membership-EQUAL_TO-'});
			sCurrentFilter = aCurrentFilter.join('|');
			$("#ns1blankspaceReport_comparison-contactbusiness_agrisubscription_codeofpracticetext-text")
				.attr('data-methodFilter', sCurrentFilter);
			
			if ($('#ns1blankspaceReport_input_contactbusiness_agrisubscription_codeofpracticetext_text_1').val() != undefined)
			{
				$('#ns1blankspaceReport_input_contactbusiness_agrisubscription_codeofpracticetext_text_1')
					.attr('data-methodFilter', sCurrentFilter)
			}
		}

		if ($('#' + sXHTMLElementID).attr('data-id'))
		{
			sCurrentFilter += ((sCurrentFilter.length > 0) ? '|' : '') + 'membership-EQUAL_TO-' + $('#' + sXHTMLElementID).attr('data-id');

			$("#ns1blankspaceReport_comparison-contactbusiness_agrisubscription_codeofpracticetext-text")
				.attr('data-methodFilter', sCurrentFilter);

			if ($('#ns1blankspaceReport_input_contactbusiness_agrisubscription_codeofpracticetext_text_1').val() != undefined)
			{
				$('#ns1blankspaceReport_input_contactbusiness_agrisubscription_codeofpracticetext_text_1')
					.attr('data-methodFilter', sCurrentFilter)
					.val('');
			}
		}
	}
}
