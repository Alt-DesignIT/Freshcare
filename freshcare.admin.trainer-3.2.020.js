/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.trainer = 
{
	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'trainer';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Trainers';	
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
	},

	home: 		function (oParam, oResponse)
	{
		var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'contactbusiness.modifieddate'}).value;
		var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;

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

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
			oSearch.addField('contactbusiness.tradename,contactbusiness.legalname,contactbusiness.supplierstatus');
			oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupTrainer);
			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.trainer.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">Click New to create a new Trainer business.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY UPDATED</td></tr>');		//v1.0.24
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="contactbusiness.tradename"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.tradename") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Trading Name</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="contactbusiness.legalname"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.legalname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Legal Name</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					sClass = (this['contactbusiness.supplierstatus'] === nsFreshcare.data.contactStatusActive) ? '' : ' nsFreshcareNotCertified';
					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_tradename-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.tradename"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_legalname-' + this.id + '" class="ns1blankspaceMostLikely' + sClass + '">' +
											this["contactbusiness.legalname"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.trainer.search.send(event.target.id, {source: 1});
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
					nsFreshcare.admin.trainer.home(oParam);
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
				
				var oSearch = new AdvancedSearch();		//
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference,contactbusiness.webaddress,contactbusiness.notes' + 
								',contactbusiness.phonenumber,contactbusiness.faxnumber,contactbusiness.email,contactbusiness.supplierstatus,contactbusiness.supplierstatustext' +
								',contactbusiness.mailingaddress1,contactbusiness.mailingaddress2,contactbusiness.mailingsuburb,contactbusiness.mailingstate' +
								',contactbusiness.mailingpostcode,contactbusiness.mailingcountry,contactbusiness.notes,contactbusiness.primarycontactperson' +
								',contactbusiness.streetaddress1,contactbusiness.streetaddress2,contactbusiness.streetsuburb,contactbusiness.streetstate' +
								',contactbusiness.streetpostcode,contactbusiness.streetcountry,contactbusiness.primarycontactpersontext');

				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.admin.trainer.show(oParam, data)});
			}
			else
			{
				if (sSearchText == undefined)
				{
					sSearchText = $('#ns1blankspaceViewControlSearch').val();
				}	
				
				if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
				{
					var sSurname = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').pop() : sSearchText;
					var sFirstName = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').shift() : sSearchText;

					ns1blankspace.container.position({xhtmlElementID: sElementId});
					ns1blankspace.search.start();
					
					$('#ns1blankspaceViewControlSearch').attr('data-statuscolumn', 'supplierstatus');
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_BUSINESS_SEARCH';
					oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,tradename,contactbusiness.contactperson.id,' +
									'supplierstatus,contactbusiness.contactperson.supplierstatus');
					//oSearch.addField('contactbusiness.tradename,contactbusiness.legalname,contactbusiness.supplierstatus');
					
					oSearch.addBracket("(");
					oSearch.addFilter('contactbusiness.contactperson.firstname', 'TEXT_IS_LIKE', sFirstName);
					oSearch.addOperator("or");
					oSearch.addFilter('contactbusiness.contactperson.surname', 'TEXT_IS_LIKE', sSurname);
					oSearch.addOperator("or");
					oSearch.addFilter('contactbusiness.tradename', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('contactbusiness.legalname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addBracket(')');

					oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupTrainer);					
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.sort('contactbusiness.tradename', 'asc');
					oSearch.sort('contactbusiness.contactperson.firstname', 'asc');
					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.admin.trainer.search.process(oParam, data)});
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
				aHTML.push('<table id="ns1blankspaceEntitySearch" class="ns1blankspaceSearchMedium">');
					
				oParam.statusColumn = 'supplierstatus';
				$.each(oResponse.data.rows, function()
				{
					aHTML.push(nsFreshcare.internal.entity.search.row(this, oParam));
				});
		    	
				aHTML.push('</table>');
				
				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					var oParam = {source: 1};
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions);
					if ($(this).attr('data-contactperson'))
					{
						oParam.contactPersonSearch = $(this).attr('data-contactperson');
					}

					nsFreshcare.admin.trainer.search.send(event.target.id, oParam);
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows to make sure we have matching row counts
				ns1blankspace.render.bind(
				{
					xhtmlContext: 'EntitySearch',
					functionRow: nsFreshcare.internal.entity.search.row,
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.trainer.search.send,
					statusColumn: 'supplierstatus'
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		// v3.2.020 SUP023422 Added Training Tab
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext == -1)
		{
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Details</td></tr>');
							
			aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
							'Address</td></tr>');
		}
		else
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Summary</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Details</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlContacts" class="ns1blankspaceControl">' +
							'People</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
							'Address</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlAccreditation" class="ns1blankspaceControl">' +
							'Training Scope / Locations</td></tr>');

			aHTML.push('</table>');
		
			aHTML.push('<table class="ns1blankspaceControl">');
		
			aHTML.push('<tr><td id="ns1blankspaceControlGroups" class="ns1blankspaceControl">' +
							'Groups</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlRelationships" class="ns1blankspaceControl">' +
							'Relationships</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlTraining" class="ns1blankspaceControl">' +
							'Training</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlCourses" class="ns1blankspaceControl">' +
							'Courses</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlInvoices" class="ns1blankspaceControl">' +
							'Invoices</td></tr>');
						
			aHTML.push('</table>');		
		
			aHTML.push('<table class="ns1blankspaceControl">');
		
			aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
							'Emails</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
							'Actions</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
							'Attachments</td></tr>');

			aHTML.push('</table>');		
		
			aHTML.push('<table class="ns1blankspaceControl">');
		
			//aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
			//				'Links</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlHistory" class="ns1blankspaceControl">' +
							'System</td></tr>');
						
			aHTML.push('</table>');		
		}
				
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainContacts" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAccreditation" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainGroups" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainTraining" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainRelationships" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSystem" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainCourses" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainInvoices" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary'});
			nsFreshcare.admin.trainer.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails'});
			nsFreshcare.admin.trainer.details();
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainContacts', refresh: true});
			nsFreshcare.internal.entity.people.show(
				{
					pageObject: 'trainer',
					defaultOnly: false,
					showGroups: true,
					showUsers: true,
					canAddGroup: true,
					canRemove: true,
					canRemoveDirectly: true,
					canSetPrimary: true,
					canSetPrimaryDirectly: true,
					canUpdate: true,
					canUpdateDirectly: true,
					showMemberships: true
				});
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress'});
			nsFreshcare.admin.grower.address({suburbUpper: true});
		});
		
		$('#ns1blankspaceControlAccreditation').click(function(event)
		{
			delete(nsFreshcare.data.trainerMemberships);
			delete(nsFreshcare.data.trainerStates);
			ns1blankspace.show({selector: '#ns1blankspaceMainAccreditation', context: {new: true, actionOptions: true, inContext: false}});
			nsFreshcare.admin.trainer.accreditation();
		});
		
		$('#ns1blankspaceControlGroups').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainGroups', refresh: true});
			nsFreshcare.internal.entity.groups.show({contextGroup: 'Trainer'});
		});

		$('#ns1blankspaceControlTraining').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainTraining', refresh: true, context: {inContext: false}});
			nsFreshcare.internal.entity.training.show({xhtmlElementID: 'ns1blankspaceMainTraining'});
		});
		
		$('#ns1blankspaceControlRelationships').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainRelationships', refresh: true});
			nsFreshcare.internal.entity.relationships.show();
		});
		
		$('#ns1blankspaceControlEmails').click(function(event)
		{
			// v3.1.2 SUP022468 Now calls emails.configure to get all linked contact's emails. 
			ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});
			nsFreshcare.admin.grower.emails.configure();
		});

		$('#ns1blankspaceControlActions').click(function(event)
		{
			// v3.1.2 SUP022468 Now calls actions.configure to get all linked contact's emails. 
			ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});
			nsFreshcare.admin.grower.actions.configure();
		});
		
		$('#ns1blankspaceControlAttachments').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
			nsFreshcare.admin.grower.attachments.search(
			   	{
				   	object: nsFreshcare.objectBusiness, 
					objectContext: ns1blankspace.objectContext
			   	});
		});	

		$('#ns1blankspaceControlSystem').click(function(event)
		{
			// History records, Modified dates, etc
			ns1blankspace.show({selector: '#ns1blankspaceMainSystem', refresh: true});
			nsFreshcare.admin.trainer.system();
		});
		
		$('#ns1blankspaceControlCourses').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainCourses', refresh: true});
			nsFreshcare.admin.trainer.courses.show({xhtmlElementID: 'ns1blankspaceMainCourses'});
		});

		$('#ns1blankspaceControlInvoices').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainInvoices', refresh: true});
			nsFreshcare.internal.entity.invoices.show({xhtmlElementID: 'ns1blankspaceMainInvoices'});
		});
	},

	show: 		function (oParam, oResponse)
	{
		var aHTML = [];
		var iStep = 1;
		var sName = '';

		if (oParam) 
		{
			if (oParam.step) {iStep = oParam.step;}
		}
		else { oParam = {step: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

		if (iStep === 1) 
		{
			nsFreshcare.admin.trainer.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find trainer.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			// Set objectContextData
			if (iStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				sName = ns1blankspace.objectContextData['contactbusiness.primarycontactpersontext'].split(', ').length > 1
						? ns1blankspace.objectContextData['contactbusiness.primarycontactpersontext'].split(', ').pop() + ' ' + ns1blankspace.objectContextData['contactbusiness.primarycontactpersontext'].split(', ').shift()
						: ns1blankspace.objectContextData['contactbusiness.primarycontactpersontext'];

				ns1blankspace.data.contactBusiness = ns1blankspace.objectContext;
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactbusiness.tradename'];
				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['contactbusiness.primarycontactperson'];
				ns1blankspace.data.contactPersonText = _.trim(sName);
				
				$('#ns1blankspaceViewControlNew').button({disabled: true});
				$('#ns1blankspaceViewControlAction').button({disabled: true});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
			
				oParam.step = 2;
				oParam.contactPerson = ns1blankspace.data.contactPerson;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.trainer.show);
				nsFreshcare.internal.entity.user.getDetails(oParam);
			}

			else if (iStep === 2)
			{
				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br /><span style="color:#A0A0A0;font-size:0.825em;">' + ns1blankspace.data.contactPersonText.formatXHTML() + '</span>');
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.admin.trainer.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.' + ((oParam.contactPersonSearch)
																				? 'internal.entity.people.show'
																				: 'admin.trainer.summary')
																			 + '()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this trainer.</td></tr></table>');
					
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
			
			if (ns1blankspace.objectContextData['contactbusiness.legalname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.legalname'].formatXHTML() +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.data.contactPersonText.formatXHTML() +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Status</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['contactbusiness.supplierstatustext'] +
						'</td></tr>');

			if (ns1blankspace.objectContextData['contactbusiness.phonenumber'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.phonenumber'].formatXHTML() +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData.user.length > 0)
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">User Name' + ((ns1blankspace.objectContextData.user.length == 1) ? '' : 's') +
							'</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
				var aValues = [];
				$.each(ns1blankspace.objectContextData.user, function()
				{
					aValues.push('<span id="ns1blankspaceSummaryUser-' + this.id + '" class="ns1blankspaceSummaryUser">' + 
										this.username.formatXHTML() + '</span>' + 
									((this.disabled === 'Y') ? '&nbsp;<span style="font-color:#EE8F00;">(Disabled)</span>' : '')
								);
								
				});
				aHTML.push(aValues.join('<br />') + '</td></tr>');
			}

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			aHTML = [];
			aHTML.push('<table class="ns1blankspaceColumn2">');

			aHTML.push('<tr><td><span id="ns1blankspaceTrainerAddCourse" class="ns1blankspaceAction" style="width:150px;">' +
						'Add Training Course</span></td></tr>');

			if (ns1blankspace.objectContextData.user.length == 0)
			{
				aHTML.push('<tr><td><span id="ns1blankspaceTrainerAddUser" class="ns1blankspaceAction" style="width:150px;">' +
							'Create User</span></td></tr>');
			}

			aHTML.push('<tr><td><span id="ns1blankspaceTrainerAddTrainer" class="ns1blankspaceAction" style="width:150px;">' +
						'Add Trainer</span></td></tr>');
			
			aHTML.push('<tr><td><span id="ns1blankspaceTrainerAddContact" class="ns1blankspaceAction" style="width:150px;">' +
						'Add Contact</span></td></tr>');
			
			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

			
			$('#ns1blankspaceTrainerAddCourse')
				.button(
				{
					label: 'Add Training Course',
					icons: {primary: 'ui-icon-plus'}
				})
				.on("click", function()
				{
					nsFreshcare.admin.trainer.addTrainingCourse();
				});
			
			$('#ns1blankspaceTrainerAddUser')
				.button(
				{
					label: 'Create User',
					icons: {primary: 'ui-icon-person'}
				})
				.on("click", function()
				{
					nsFreshcare.internal.entity.user.add.show(
					{
						xhtmlElementID: this.id,
						contactBusiness: ns1blankspace.objectContext,
						contactPerson: ns1blankspace.data.contactPerson,
						role: 'Trainer'
					});

				});
			
			$('#ns1blankspaceTrainerAddTrainer')
				.button(
				{
					label: 'Add Trainer',
					icons: {primary: 'ui-icon-person'}
				})
				.on("click", function()
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainContacts', refresh: true});
					$('.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlContacts').addClass('ns1blankspaceHighlight');
					nsFreshcare.internal.entity.people.show(
					{
						addContact: true,
						contactBusiness: ns1blankspace.objectContext,
						group: nsFreshcare.data.groupTrainer[0]
					});

				});
			
			$('#ns1blankspaceTrainerAddContact')
				.button(
				{
					label: 'Add Contact',
					icons: {primary: 'ui-icon-person'}
				})
				.on("click", function()
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainContacts', refresh: true});
					$('.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlContacts').addClass('ns1blankspaceHighlight');
					nsFreshcare.internal.entity.people.show(
					{
						addContact: true,
						contactBusiness: ns1blankspace.objectContext
					});

				});
			
			$('.ns1blankspaceSummaryUser')
				.on('click', function(event)
				{
					nsFreshcare.admin.user.init({id: this.id.split('-').pop(), showHome: false});
				})
				.css('cursor', 'pointer');
		}	
	},

	details: function(oParam)
	{
		oParam = ns1blankspace.util.setParam(oParam, 'statusColumn', 'supplierstatus');
		nsFreshcare.internal.entity.details(oParam);
	},

	people: 
	{
		show: function(oParam)
		{

		},

		row: function(oRow)
		{

		},

		bind: function()
		{

		},

		manage: function(oParam)
		{

		}
	},

	accreditation: 	function(oParam) 
	{
		// v3.1.2 Added Trainee Memberships & COP
		var aHTML = [];

		if (oParam == undefined) { oParam = {}}
		if (oParam.accreditationStep == undefined) {oParam.accreditationStep = 1}

		if (oParam.accreditationStep === 1) 
		{
			if (nsFreshcare.data.validStates === undefined)
			{nsFreshcare.external.freshcareprofile.validStates({onComplete: nsFreshcare.admin.trainer.accreditation,
																			   accreditationStep: 2});}
			else
			{
				oParam.accreditationStep = 2;
				nsFreshcare.admin.trainer.accreditation(oParam);
			}
		}

		// v3.1.209b Now get trainerMemberships and trainer states if admin user or undefined
		// v3.2.015 SUP023422 Added COP Based Training
		else if (oParam.accreditationStep === 2) 
		{
			if ((nsFreshcare.data.trainerMemberships === undefined 
				|| nsFreshcare.data.trainerStates === undefined 
				|| nsFreshcare.user.roleID == nsFreshcare.data.roles.admin))
			{
				// v3.2.015 SUP023422 Added COP Based Training
				nsFreshcare.control.setupTrainer(
				{
					accreditationStep: 3,
					onComplete: nsFreshcare.admin.trainer.accreditation,
					trainerBusiness: (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin  
										? ns1blankspace.objectContext
										: ns1blankspace.user.contactBusiness),
					defaultTrainerPerson: (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin 
							? ns1blankspace.objectContextData['contactbusiness.primarycontactperson']
							: ns1blankspace.user.contactPerson)
				});}
			else
			{
				oParam.accreditationStep = 3;
				nsFreshcare.admin.trainer.accreditation(oParam);
			}
		}

		else if (oParam.accreditationStep === 3) 
		{
			aHTML = [];
			ns1blankspace.objectContextData.states = nsFreshcare.data.trainerStates;

			$('#ns1blankspaceMainAccreditation').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceAccreditationColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceAccreditationColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr></table>');					
			
			$('#ns1blankspaceMainAccreditation').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Training Scope' +
							'</td></tr>');
						
			// v3.1.209b SUP022867 Shows list of trainers and Memberships each one has. 
			var iPreviousTrainer = '';
			$.each(nsFreshcare.data.trainerMemberships, function() 
			{
				if (this.trainercontactpersontext != '')
				{
					if (iPreviousTrainer != this.trainercontactperson)
					{
						aHTML.push('<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRowSelect" style="text-align: left; cursor: auto;">' + 
											this.trainercontactpersontext.formatXHTML() +
										'</td></tr>');
					}
					aHTML.push('<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceAccreditationMemberships" class="ns1blankspaceReadOnly">' +
								this.membershiptext +
									'</td></tr>');	
				}
				iPreviousTrainer = this.trainercontactperson;
			});

			aHTML.push('<tr><td>&nbsp;</td></tr>')

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'States where Training is offered' +
							'</td></tr>' + 
							'<tr class="ns1blankspace">' +
							'<td id="ns1blankspaceAccreditationState" class="ns1blankspaceReadOnly">&nbsp;' +
							'</td></tr>');		

			aHTML.push('</table>');

			$('#ns1blankspaceAccreditationColumn1').html(aHTML.join(''));

			aHTML = [];
			// we don't allow updates to Memberships so just replicate the spacing from column 1 for memberships
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">(Go to People tab to modify)</td></tr>');
						
			iPreviousTrainer = '';
			$.each(nsFreshcare.data.trainerMemberships, function() 
			{
				if (this.trainercontactpersontext != '')
				{
					if (iPreviousTrainer != this.trainercontactperson)
					{
						aHTML.push('<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceRowSelect" style="cursor: auto;">' + 
										'&nbsp;</td></tr>');
					}
					aHTML.push('<tr class="ns1blankspace"><td class="ns1blankspaceReadOnly">&nbsp;</td></tr>');
				}
				iPreviousTrainer = this.trainercontactperson;
			});
			aHTML.push('<tr><td>&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">&nbsp;</td></tr>');

			aHTML.push('<tr class="ns1blankspace">' +
								'<td id="ns1blankspaceAccreditationStateUpdate" class="ns1blankspaceReadOnly">' +
							    '<table class="ns1blankspace" style="margin-bottom:7px;">');
			$.each(nsFreshcare.data.validStates, function() {
				aHTML.push('<tr id="ns1blankspaceAccreditationStateRow_' + this.id + '">' + 
								'<td id="ns1blankspaceAccreditationState_' + this.id + '"' + 
								' class="nsFreshcareState nsFreshcareSelectable">' + this.title + '</td>' + 
								'</tr>');
			});
			aHTML.push('</table>' +
							'</td></tr>');

			aHTML.push('</table>');

			$('#ns1blankspaceAccreditationColumn2').html(aHTML.join(''));

			// Now set and bind States areas
			var aValues = [];
			$.each(ns1blankspace.objectContextData.states, function() {
				aValues.push('<span id="nsFreshcareStateList_' + this.state + '" ' + 
					'class="nsFreshcareStateList" ' +
					'data-rowID="' + this.id + '">' + 
						this.statetext + 
					'</span>');
				$('#ns1blankspaceAccreditationState_' + this.state).addClass("nsFreshcareSelected");
			});
			
			if (aValues.length > 0) {
				$('#ns1blankspaceAccreditationState').html(aValues.join('<br />'));
			}
			else {
				$('#ns1blankspaceAccreditationState').html('None');
			}
			// Set the column 1 height to same as column 2
			$('#ns1blankspaceAccreditationState').height($('#ns1blankspaceAccreditationStateUpdate').height());

			// Bind the States selection
			$('.nsFreshcareState').each(function() {
				
				$(this).click(function(event) {
					nsFreshcare.external.freshcareprofile.manageMultiRows(this.id)
				});
			});
		}	
	},

	courses: 
	{
		show: function(oParam)
		{
			var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'coursedate'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
			var aHTML = [];

			if (oResponse === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
				oSearch.addField('coursedate,statustext,title,location,statetext,trainercontactpersontext');		//,attendeecount
				oSearch.addFilter('trainercontactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.rows = ns1blankspace.option.defaultRows;
				oSearch.sort(sSortColumn, sSortDirection);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						nsFreshcare.admin.trainer.courses.show(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}

			else
			{
				aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceTrainerCoursesColumn1" class="ns1blankspaceColumn1Large">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'<td id="ns1blankspaceTrainerCoursesColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
							'</td>' +
							'</tr>' +
							'</table>');				
				
				$('#' + sXHTMLElementID).html(aHTML.join(''));
				
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceColumn2">');
				
				aHTML.push('<tr><td>' +
								'<span id="ns1blankspaceTrainerCourseAdd" class="ns1blankspaceAction">Add</span>' +
								'</td></tr>');
								
				aHTML.push('</table>');					
				
				$('#ns1blankspaceTrainerCoursesColumn2').html(aHTML.join(''));
				
				$('#ns1blankspaceTrainerCourseAdd')
					.button(
					{
						label: "Add Course"
					})
					.click(function() 
					{
						nsFreshcare.admin.trainer.addTrainingCourse();
					});
				
				
				aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table border="0" cellspacing="0" cellpadding="0" width="750" style="margin-top:15px); margin-bottom:15px);">');
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceNothing">No training courses.</td>');
					aHTML.push('</tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceTrainerCoursesColumn1').html(aHTML.join(''));		
				}
				else
				{
				
					aHTML.push('<table border="0" cellspacing="0" cellpadding="0" class="ns1blankspace">');
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="coursedate"' +
									' data-sortdirection="' + ((sSortColumn == "coursedate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Course Date</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="statustext"' +
									' data-sortdirection="' + ((sSortColumn == "statustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Status</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="title"' +
									' data-sortdirection="' + ((sSortColumn == "title") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Title</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="location"' +
									' data-sortdirection="' + ((sSortColumn == "location") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Location</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="trainercontactpersontext"' +
									' data-sortdirection="' + ((sSortColumn == "trainercontactpersontext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Trainer</td>');
					/*aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="attendeecount"' +
									' data-sortdirection="' + ((sSortColumn == "attendeecount") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Attendees</td>');*/
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');
					
					$.each(oResponse.data.rows, function()
					{
						aHTML.push(nsFreshcare.admin.trainer.courses.row(this));
					});
					
					aHTML.push('</table>');
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceTrainerCoursesColumn1',
						xhtmlContext: 'TrainerCourses',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == "true"),
						more: oResponse.moreid,
						rows: ns1blankspace.option.defaultRows,
						functionShowRow: nsFreshcare.admin.trainer.courses.row,
						functionNewPage: 'nsFreshcare.admin.trainer.courses.bind()',
						type: 'json'
					}); 	
					
					nsFreshcare.admin.trainer.courses.bind();
				}
			}
		},

		row: function(oRow)
		{
			var aHTML = [];
			var sName = (oRow.trainercontactpersontext.split(', ').length > 1)
						? oRow.trainercontactpersontext.split(', ').pop() + ' ' + oRow.trainercontactpersontext.split(', ').shift()
						: oRow.trainercontactpersontext;

			aHTML.push('<tr id="ns1blankspaceTrainerCourses-' + oRow.id + '">');

			aHTML.push('<td id="ns1blankspaceTrainerCourses_coursedate-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.coursedate + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerCourses_statustext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.statustext + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerCourses_title-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.title + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerCourses_location-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.location + ' - ' + oRow.statetext + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerCourses_trainercontactpersontext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.trainercontactpersontext + '</td>');

			/*aHTML.push('<td id="ns1blankspaceTrainerCourses_attendeecount-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.attendeecount + '</td>');*/

			aHTML.push('<td id="ns1blankspaceTrainerCourses_select-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceSelect">' +
							'&nbsp;</td>');

			aHTML.push('</tr>');

			return aHTML.join('');
		},

		bind: function()
		{
			$('.ns1blankspaceHeaderSort')
				.on('click', function(event)
				{
					var oParam = 
					{
						xhtmlElementID: 'ns1blankspaceMainCourses',
						sortColumn: $(this).attr('data-column'),
						sortDirection: $(this).attr('data-sortdirection')
					}

					$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
					nsFreshcare.admin.trainer.courses.show(oParam);
				})
				.css('cursor', 'pointer')

			$('.ns1blankspaceSelect')
				.button(
				{
					text: false,
					label: 'Open',
					icons: {primary: 'ui-icon-play'}
				})
				.on('click', function(event)
				{
					var sCourseId = this.id.split('-').pop();

					if (sCourseId)
					{
						nsFreshcare.admin.trainingcourse.init({id: sCourseId});
					}
				})
				.css('height', '25px')
				.css('width', '25px');
		}
	},

	invoices: 
	{
		show: function(oParam)
		{
			var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'sentdate'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
			var aHTML = [];

			if (oResponse === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'FINANCIAL_INVOICE_SEARCH';
				oSearch.addField('reference,sentdate,duedate,description,amount,tax,receiptamount,creditamount');
				oSearch.addFilter('contactbusinesssentto', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.rows = ns1blankspace.option.defaultRows;
				oSearch.sort(sSortColumn, sSortDirection);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						nsFreshcare.admin.trainer.invoices.show(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}

			else
			{
				aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceTrainerInvoicesColumn1" class="ns1blankspaceColumn1Large">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'<td id="ns1blankspaceTrainerInvoicesColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
							'</td>' +
							'</tr>' +
							'</table>');				
				
				$('#' + sXHTMLElementID).html(aHTML.join(''));
				
				aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table border="0" cellspacing="0" cellpadding="0" width="750" style="margin-top:15px); margin-bottom:15px);">');
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceNothing">No invoices.</td>');
					aHTML.push('</tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceTrainerInvoicesColumn1').html(aHTML.join(''));		
				}
				else
				{
				
					aHTML.push('<table border="0" cellspacing="0" cellpadding="0" class="ns1blankspace">');
					aHTML.push('<tr class="ns1blankspaceCaption">');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="reference"' +
									' data-sortdirection="' + ((sSortColumn == "reference") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Reference</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="sentdate"' +
									' data-sortdirection="' + ((sSortColumn == "sentdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Sent</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="description"' +
									' data-sortdirection="' + ((sSortColumn == "description") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Description</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="amount"' +
									' data-sortdirection="' + ((sSortColumn == "amount") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Amount</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">Outstanding</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');
					
					$.each(oResponse.data.rows, function()
					{
						aHTML.push(nsFreshcare.admin.trainer.invoices.row(this));
					});
					
					aHTML.push('</table>');
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceTrainerInvoicesColumn1',
						xhtmlContext: 'TrainerInvoices',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == "true"),
						more: oResponse.moreid,
						rows: ns1blankspace.option.defaultRows,
						functionShowRow: nsFreshcare.admin.trainer.invoices.row,
						functionNewPage: 'nsFreshcare.admin.trainer.invoices.bind()',
						type: 'json'
					}); 	
					
					nsFreshcare.admin.trainer.invoices.bind();
				}
			}
		},

		row: function(oRow)
		{
			var aHTML = [];
			var iAmount = (nsFreshcare.util.isNumeric(oRow.amount)) ? Number(oRow.amount) : 0;
			var iReceipts = (nsFreshcare.util.isNumeric(oRow.receiptamount)) ? Number(oRow.receiptamount) : 0; 
			var iCredits = (nsFreshcare.util.isNumeric(oRow.creditamount)) ? Number(oRow.creditamount) : 0;  
			var iOutstanding = iAmount - (iReceipts + iCredits);

			aHTML.push('<tr id="ns1blankspaceTrainerInvoices-' + oRow.id + '">');

			aHTML.push('<td id="ns1blankspaceTrainerInvoices_referencce-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.reference + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerInvoices_sentdate-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.sentdate + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerInvoices_description-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.description + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerInvoices_amount-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
							(iAmount).formatMoney(2, ".", ",") + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerInvoices_outstanding-' + oRow.id + '" class="ns1blankspaceRow" style="text-align:right;">' +
							(iOutstanding).formatMoney(2, ".", ",") + '</td>');

			aHTML.push('<td id="ns1blankspaceTrainerInvoices_select-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceSelect">' +
							'&nbsp;</td>');

			aHTML.push('</tr>');

			return aHTML.join('');
		},

		bind: function()
		{
			$('.ns1blankspaceHeaderSort')
				.on('click', function(event)
				{
					var oParam = 
					{
						xhtmlElementID: 'ns1blankspaceMainCourses',
						sortColumn: $(this).attr('data-column'),
						sortDirection: $(this).attr('data-sortdirection')
					}

					$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
					nsFreshcare.admin.trainer.invoices.show(oParam);
				})
				.css('cursor', 'pointer')

			$('.ns1blankspaceSelect')
				.button(
				{
					text: false,
					label: 'Open',
					icons: {primary: 'ui-icon-play'}
				})
				.on('click', function(event)
				{
					var sInvoiceId = this.id.split('-').pop();

					if (sInvoiceId)
					{
						ns1blankspace.financial.invoice.init({id: sInvoiceId});
					}
				})
				.css('height', '25px')
				.css('width', '25px');
		}
	},

	addTrainingCourse: function(oParam)
	{
		if (oParam == undefined) {oParam = {}} 
		if (oParam.addCourseStep == undefined) {oParam.addCourseStep = 0}

		if ($(ns1blankspace.xhtml.container).is(':visible')) 
		{
			$(ns1blankspace.xhtml.container).hide();
			$(ns1blankspace.xhtml.container).html(''); 

		}
		else 
		{
			// v3.1.209b SUP022867 Find Memberships for this trainer
			if (oParam.addCourseStep === 0) 
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = "AGRI_MEMBERSHIP_TRAINER_SEARCH";
				oSearch.addField('membership');
				oSearch.addFilter('trainercontactbusiness', 'IN_LIST', ns1blankspace.objectContext);
				oSearch.rows = 100;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.memberships = [];
						$.each(oResponse.data.rows, function()
						{
							if ($.inArray(this.membership, oParam.memberships) == -1)
							{
								oParam.memberships.push(this.membership);
							}
						});
						oParam.addCourseStep = 1;
						nsFreshcare.admin.trainer.addTrainingCourse(oParam);
					}
				});
			}

			else if (oParam.addCourseStep === 1) 
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = "AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH";
				oSearch.addField('title,agritrainingpackage.membership.code,codeofpracticetext,membership');
				if (oParam.memberships && oParam.memberships.length > 0)
				{
					oSearch.addFilter('membership', 'IN_LIST', oParam.memberships.join(','));
				}
				oSearch.addFilter('availablefrom', 'LESS_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
				oSearch.addBracket('(');
				oSearch.addFilter('availableto', 'GREATER_THAN_OR_EQUAL_TO', dToday.toString('dd MMM yyyy'));
				oSearch.addOperator('or');
				oSearch.addFilter('availableto', 'IS_NULL', dToday.toString('dd MMM yyyy'));
				oSearch.addBracket(')');
				oSearch.addFilter('agritrainingpackage.membership.status', 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	
				oSearch.sort('title', 'asc');
				oSearch.rows = 40;
				oSearch.getResults(function(oResponse) 
				{
					var aHTML = [];

					if (oResponse.status === 'OK') 
					{
						$.each(oResponse.data.rows, function() 
						{
							aHTML.push('<tr id="ns1blankspacePackageSearchRow_' + this.id + '" data-membership="' + this.membership + '">');
							aHTML.push('<td id="ns1blankspacePackageTitle_' + this.id + '" class="ns1blankspaceSearch">' + this.title + '<td>');
							aHTML.push('<td id="ns1blankspacePackageLocation_' + this.id + '" class="ns1blankspaceSearch">' + this['agritrainingpackage.membership.code'] + '<td>');
							aHTML.push('<td id="ns1blankspacePackageDate_' + this.id + '" class="ns1blankspaceSearch">' + this.codeofpracticetext + '<td>');
							aHTML.push('</tr>');
						});
					}

					if (aHTML.length === 0) 
					{
						aHTML.push('<tr><td id="ns1blankspaceAddTrainingPackage" class="ns1blankspaceSearch">No available Training pakages found. Click to add a training pakage.</td></tr>')
					}
					
					aHTML.unshift('<table class="ns1blankspaceSearchMedium">');
					aHTML.push('</table>');

					ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceTrainerAddCourse', topOffset: 10, setWidth: true});
					$(ns1blankspace.xhtml.container).show();
					$(ns1blankspace.xhtml.container).html(aHTML.join(''));

					$('td.ns1blankspaceSearch').click(function() 
					{
						var sPackageId = this.id.split('_')[1];

						$(ns1blankspace.xhtml.container).hide();
						$(ns1blankspace.xhtml.container).html('');
						if (sPackageId != undefined) 
						{
							var oParam = 
							{
								functionDefault: 'nsFreshcare.admin.trainingcourse.details())',
								trainingPackage: sPackageId,
								trainingPackageText: $(this).html(),
								trainingPackageMembership: $(this).parent().attr('data-membership'),
								trainerContactBusiness: ns1blankspace.objectContext,
								trainerContactPerson: ns1blankspace.data.contactPerson,
								trainerContactBusinessText: ns1blankspace.objectContextData['contactbusiness.tradename'],
								trainerContactPersonText: ns1blankspace.data.contactPersonText,
								"new": true,
								showHome: false
							};
							nsFreshcare.admin.trainingcourse.init(oParam);
						}
					});	

					$('#ns1blankspaceAddTrainingPackage').click(function() {
						nsFreshcare.admin.trainingpackage.init({"new": true});
					});
				});
			}
		}
	},

	save:
	{
		send: function() 
		{
			nsFreshcare.internal.entity.save.send(
				{
					businessGroup: nsFreshcare.data.businessGroupTrainer,
					functionPostSave: nsFreshcare.admin.trainer.search.send
				});
		}
	}
}