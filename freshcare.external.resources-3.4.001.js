/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

nsFreshcare.external.resources = 
{
	init: 	function(oParam) 
	{

		ns1blankspace.app.reset();
		$('#ns1blankspaceViewControlViewContainer').button(
		{
			label: 'Resources'
		});			

		ns1blankspace.objectMethod = 'DOCUMENT';
		ns1blankspace.objectParentName = 'external';
		ns1blankspace.objectName = 'resources';
		nsFreshcare.external.resources.home(); 
		nsFreshcare.external.resources.data = {};

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		//ns1blankspace.app.set(oParam);
	},

	home: 	function() 
	{
			ns1blankspace.history.view(
			{
				newDestination: 'nsFreshcare.external.resources.show();',
				move: false
			});

			if (ns1blankspace.setupView)
			{	
				$('#ns1blankspaceViewControlSetup').attr('checked', false);
				$('#ns1blankspaceViewControlSetup').button('refresh');
				ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.external.resources.show()'});
			}	

			$('#ns1blankspaceViewControlAction').button({disabled: true});
			$('#ns1blankspaceViewControlNew').button({disabled: true});
			$('#ns1blankspaceViewControlActionOptions').button({disabled: true});

			var aHTML = [];
			
			aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
			
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceControl">' +
							'<td id="ns1blankspaceControlResources" class="ns1blankspaceControl ns1blankspaceControlHome">' +
								'Resources</td>' +
							'</tr>');
			aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

			aHTML.push('</table>');					
					
			$('#ns1blankspaceControl').html(aHTML.join(''));
			
			nsFreshcare.external.resources.bind();

			ns1blankspace.xhtml.defaultElementID = 'ns1blankspaceControlResources';
			
			var aHTML = [];
			
			aHTML.push('<div id="ns1blankspaceResourcesMain" class="ns1blankspaceControlMain">');
			aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
			aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible"></td>');
			aHTML.push('</tr></table>');	
			aHTML.push('</div>');
			aHTML.push('<div id="ns1blankspaceResourcesPreview" class="ns1blankspaceControlMain">');

			$('#ns1blankspaceMain').html(aHTML.join(''));

			// v3.4.001 If no network groups and not admin user, error: config is incorrect and they must contact FC
			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin 
				|| nsFreshcare.user.networkGroups.length > 0)
			{
				$('#' + ns1blankspace.xhtml.defaultElementID).addClass('ns1blankspaceHighlight');
				$('#' + ns1blankspace.xhtml.defaultElementID).click();
			}
			else
			{
				$('#ns1blankspaceHomeColumn1').html('There is a problem with your user record and Resources cannot be displayed.' +
													' Please contact Freshcare.');
				$('#ns1blankspaceControl').html('');
			}
	},

	bind: 	function() 
	{

		$('#ns1blankspaceControlResources').click(function(event)
		{
			$('#ns1blankspaceResourcesPreview').hide();
			$('#ns1blankspaceResourcesMain').show();
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');

			ns1blankspace.xhtml.defaultElementID = this.id;
			// Here we need to find any documents linked to this network group and display them here.
			nsFreshcare.external.resources.show({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});

		});

	},

	search: function(oParam) 
	{

		var sTitleSearch = $('#ns1blankspaceDocument_Title').val();

		var oSearch = new AdvancedSearch();
		oSearch.endPoint = 'document';
		oSearch.method = 'DOCUMENT_SEARCH';
		oSearch.addField('document.title,document.summary,document.modifieddate');
		oSearch.addCustomOption('includemynetworkgroups', 'Y');
		oSearch.addCustomOption('includemydocuments', 'N');
		oSearch.addFilter('status', 'EQUAL_TO', '2');		// Approved
		if (sTitleSearch != '') {
			oSearch.addBracket('(');
			oSearch.addFilter('title', 'TEXT_IS_LIKE', sTitleSearch);
			oSearch.addOperator('or');
			oSearch.addFilter('summary', 'TEXT_IS_LIKE', sTitleSearch);
			oSearch.addBracket(')');
		}
		oSearch.sort('document.title', 'asc');		//v1.0.24 changed from modifieddate
		oSearch.getResults(function(oResponse) {

			if (oResponse.status === 'OK') {
				nsFreshcare.external.resources.show(oParam, oResponse);
			}
		});
	},

	show: 	function(oParam, oResponse)
	{
		oParam = oParam || {};
		var bShow = false;
		var sXHTMLElementID = 'ns1blankspaceHomeColumn1';
		var sLabel = 'Freshcare Resources and News';
		
		if (oParam.show != undefined) {bShow = oParam.show}
		if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
		if (oParam.label != undefined) {sLabel = oParam.label}

		var aHTML = [];
		
		// First, let's construct the display and filtering areas
		if ($('#' + sXHTMLElementID).attr('data-loading') == '1') 
		{
			$('#' + sXHTMLElementID).attr('data-loading', '');

			aHTML.push('<table id="ns1blankspaceHomeResources"><tr>');
			aHTML.push('<td id="ns1blankspaceHomeResourcesResults" class="ns1blankspaceColumn1Flexible"></td>' +
					   '<td id="ns1blankspaceHomeResourcesRibbon" class="ns1blankspaceColumn2" style="width:1px;"></td>' + 
					   '<td id="ns1blankspaceHomeResourcesFilter" class="ns1blankspaceColumn2" style="width:210px;"></td>');
			aHTML.push('</tr></table>');

			$('#' + sXHTMLElementID).html(aHTML.join(''));

			// Search criteria bar 'handle' - allows user to get the search criteria div back into view
			aHTML = [];
			aHTML.push('<span id="ns1blankspaceHomeResourcesSearchHandle" style="height:25px">Search Criteria</span>');
			$('#ns1blankspaceHomeResourcesRibbon').html(aHTML.join(''));

			aHTML = [];
			// Filtering area
			aHTML.push('<table class="ns1blankspaceColumn2" style="width:100%">');

			aHTML.push('<tr><td id="ns1blankspaceHomeResourcesSearch" class="ns1blankspaceAction">Search</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceResourcesMessage" style="color:red;font-size:0.75em;">&nbsp;</td></tr>');
			aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.825em;">Title / Summary</td></tr>');
			aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:0.75em;">Contains:</td></tr>');
			aHTML.push('<tr><td><input id="ns1blankspaceDocument_Title" class="ns1blankspaceText"></td></tr>');

			aHTML.push('</table>')

			$('#ns1blankspaceHomeResourcesFilter').html(aHTML.join(''));

			$('#ns1blankspaceHomeResourcesSearchHandle').button({
				text: false,
				icons: {
					primary: 'ui-icon-arrowthickstop-1-w'
				}
			})
			.css('width', '12px')
			.css('height', '25px')
			.click(function() {
				$('#ns1blankspaceHomeResourcesSearchHandle').hide();
				$('#ns1blankspaceHomeResourcesFilter').show('slide', {direction: 'left'}, 1000);
			});
			$('#ns1blankspaceHomeResourcesSearchHandle').hide();

			$('#ns1blankspaceDocument_Title').keypress(function(e)
			{
			    if (e.which === 13)
			    {
					$('#ns1blankspaceHomeResourcesFilter').hide({duration: 200, complete: function() {

						$('#ns1blankspaceHomeResourcesSearchHandle').show();
						$('#ns1blankspaceHomeResourcesResults').html(ns1blankspace.xhtml.loading);
						oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.external.resources.show)
						nsFreshcare.external.resources.search(oParam);
					}});
			    }
			});

			$('#ns1blankspaceHomeResourcesSearch').button({
				label: "Search"
			})
			.click(function() {

				$('#ns1blankspaceHomeResourcesFilter').hide({duration: 200, complete: function() {

					$('#ns1blankspaceHomeResourcesSearchHandle').show();
					$('#ns1blankspaceHomeResourcesResults').html(ns1blankspace.xhtml.loading);
					oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.external.resources.show)
					nsFreshcare.external.resources.search(oParam);
				}});
			});

			$('#ns1blankspaceHomeResourcesFilter').hide({duration: 200, complete: function() {

				$('#ns1blankspaceHomeResourcesSearchHandle').show();
				$('#ns1blankspaceHomeResourcesResults').html(ns1blankspace.xhtml.loading);
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.external.resources.show)
				nsFreshcare.external.resources.search(oParam);
			}});
		}

		if (oResponse) 
		{
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table class="ns1blankspaceHome">');
				aHTML.push('<tr><td class="ns1blankspaceNothing">No Resources matching this criteria.</td></tr>');
				aHTML.push('</table>');

				$('#ns1blankspaceHomeResourcesResults').html(aHTML.join(''));
				if (bShow) {$('#ns1blankspaceHomeResourcesResults').show(ns1blankspace.option.showSpeedOptions)}	
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
					aHTML.push('<table id="ns1blankspaceHomeResources" class="ns1blankspace">');
				}	
				
				aHTML.push('<tr class="ns1blankspaceCaption">');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">Title</td>');
				
				aHTML.push('<td class="ns1blankspaceHeaderCaption">Summary</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">Last Updated</td>');
				aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
				aHTML.push('</tr>');

				$.each(oResponse.data.rows, function() 	{
					aHTML.push(nsFreshcare.external.resources.row(this));
				});
				
				aHTML.push('</table>');

				if (bShow) {$('#ns1blankspaceHomeResourcesResults').show(ns1blankspace.option.showSpeedOptions)}	
				
				ns1blankspace.render.page.show(
				{
					xhtmlElementID: 'ns1blankspaceHomeResourcesResults',
					xhtmlContext: 'HomeResources',
					xhtml: aHTML.join(''),
					showMore: (oResponse.morerows == 'true'),
					more: oResponse.moreid,
					rows: 20,
					functionShowRow: nsFreshcare.external.resources.row,
					functionNewPage: 'nsFreshcare.external.resources.rowBind()',
					type: 'json'
				}); 	
				
				nsFreshcare.external.resources.rowBind();
			}
		}
	},

	row: 	function(oRow) 
	{

		var aHTML = [];
		var dDate = new Date(oRow['document.modifieddate']);

		aHTML.push('<tr class="ns1blankspaceRow">');
					
		aHTML.push('<td id="ns1blankspaceHomeResources_title-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow['document.title'] + '</td>');
	
		aHTML.push('<td id="ns1blankspaceHomeResources_summary-' + oRow.contactperson + '" class="ns1blankspaceRow">' +
								oRow['document.summary'] + '</td>');

		aHTML.push('<td id="ns1blankspaceHomeResources_modifieddate-' + oRow.contactperson + '" class="ns1blankspaceRow">' +
								dDate.toString('dd MMM yyyy') + '</td>');

		aHTML.push('<td id="ns1blankspaceHomeResources-' + oRow.id + '" class="ns1blankspaceMainRowOptionsSelect"' +
					' data-content="' + oRow['document.content'] + '"></td>');

		return aHTML.join('');

	},

	rowBind: 	function(oRow) 
	{

		$('.ns1blankspaceMainRowOptionsSelect').button( {
			text: false,
			icons: {
				primary: "ui-icon-play"
			}
		})
		.click(function()
		{
			nsFreshcare.external.resources.document.show(this.id);
			//nsFreshcare.admin.audit.search.send(this.id)
		})
		.css('width', '15px')
		.css('height', '18px');
	},

	document: 
	{
		show: 	function(sXHTMLElementID) 
		{
			// v3.1.205 SUP023042 Removed ns1blankspaceTextMulti class as was causing text to highlight when href clicked!
			var aHTML = [];
			var aElementID = sXHTMLElementID.split('-');
			$('#ns1blankspaceResourcesPreview').html('');

			aHTML.push('<table class="ns1blankspace"><tr>');
			aHTML.push('<td class="ns1blankspaceCaption">' + $('#' + aElementID[0] + '_title-' + aElementID[1]).html().formatXHTML() + '</td></tr>');
			aHTML.push('<td>' +
							'<div id="ns1blankspaceDocumentContent" class="ns1blankspaceTextMulti"' + 
								' style="background-color:#F3F3F3; width:100%; font-size:0.865em; overflow:auto; padding:5px; border:10px;">' +
								ns1blankspace.xhtml.loadingSmall + '</div>' +
							'</td></tr>');		 
			aHTML.push('<tr><td class="ns1blankspaceCaption" style="font-size:1.0em;">Related Documents</td><tr>');
			aHTML.push('<tr><td id="ns1blankspaceHomeResourceAttachments">' + ns1blankspace.xhtml.loadingSmall + '</td><tr>');
			aHTML.push('</table>');

			$('#ns1blankspaceResourcesPreview').html(aHTML.join(''));
			$('#ns1blankspaceResourcesMain').hide();
			$('#ns1blankspaceResourcesPreview').show();

			nsFreshcare.external.resources.document.search({id: aElementID[1], xhtmlElementID: 'ns1blankspaceDocumentContent'});
			nsFreshcare.external.resources.attachment.search({id: aElementID[1], xhtmlElementID: 'ns1blankspaceHomeResourceAttachments'});

		},

		search: function(oParam) 
		{
			var sID;
			var sXHTMLElementID;

			if (oParam) {
				if (oParam.id) {sID = oParam.id}
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID}
			}
			
			if (sID != undefined) {

				var oSearch = new AdvancedSearch();
				oSearch.method = 'DOCUMENT_SEARCH';
				oSearch.addField('content');
				oSearch.addCustomOption('includemynetworkgroups', 'Y');
				oSearch.addFilter('id', 'EQUAL_TO', sID);		
				oSearch.getResults(function(oResponse) {

					if (oResponse.status == 'OK') {

						var oRow = oResponse.data.rows[0];

						$('#' + sXHTMLElementID).html(oRow.content.formatXHTML());	
					}
					else {
						$('#' + sXHTMLElementID).html('');
					}
				});
			}
			else {$('#' + sXHTMLElementID).html('');}

		}
	},

	attachment: 
	{
		search: function(oParam) 
		{

			var sID;

			if (oParam) {
				if (oParam.id) {sID = oParam.id}
			}
			
			if (sID != undefined) {

				var oSearch = new AdvancedSearch();
				oSearch.method = 'DOCUMENT_SEARCH';
				oSearch.addField('document.attachment.type,document.attachment.filename,document.attachment.description' +
								',document.attachment.download,document.attachment.modifieddate,document.attachment.attachment');
				oSearch.addCustomOption('includemynetworkgroups', 'Y');
				oSearch.addFilter('id', 'EQUAL_TO', sID);		
				oSearch.rows = 40;
				oSearch.getResults(function(oResponse) {

					if (oResponse.status == 'OK') {

						nsFreshcare.external.resources.attachment.show(oParam, oResponse);
					}
				});
			}
		},

		show: 	function(oParam, oResponse) 
		{

			var sXHTMLElementID;
			var aHTML = [];

			if (oParam) {
				if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID}
			}

			if (sXHTMLElementID && oResponse) {

				if (oResponse.data.rows.length == 0) {
					$('#' + sXHTMLElementID).html('None.');
				}
				else {
					
					aHTML.push('<table class="ns1blankspace">')
					$.each(oResponse.data.rows, function() {

						aHTML.push('<tr><td class="ns1blankspaceRow">' + 
										'<a href="' + this["document.attachment.download"] + '" class="ns1blankspaceNoUnloadWarn">' + 
										this["document.attachment.filename"] + '</a>' + 
										'<td><tr>');
					});
					aHTML.push('</table>');
					$('#' + sXHTMLElementID).html(aHTML.join(''));
				}
			}
		}
	}

}
