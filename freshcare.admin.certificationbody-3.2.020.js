/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.certificationbody = 
{
	data:
	{
		historyFields:
		[
			{name: 'contactbusiness.reference', caption: 'Reference'},
			{name: 'contactbusiness.tradename', caption: 'Trading Name'},
			{name: 'contactbusiness.legalname', caption: 'Legal Name'},
			{name: 'contactbusiness.abn', caption: 'ABN'},
			{name: 'contactbusiness.suplierstatustext', caption: 'Supplier Status'},
			{name: 'contactbusiness.website', caption: 'Website'},
			{name: 'contactbusiness.phonenumber', caption: 'Business Phone'},
			{name: 'contactbusiness.faxnumber', caption: 'Fax Number'},
			{name: 'contactbusiness.streetaddress1', caption: 'Street Address'},
			{name: 'contactbusiness.streetaddress2', caption: 'Street Address 2'},
			{name: 'contactbusiness.streetsuburb', caption: 'Street Suburb'},
			{name: 'contactbusiness.streetstate', caption: 'Street State'},
			{name: 'contactbusiness.streetpostcode', caption: 'Street Post Code'},
			{name: 'contactbusiness.streetcountry', caption: 'Street Country'},
			{name: 'contactbusiness.mailingaddress1', caption: 'Mailing Address'},
			{name: 'contactbusiness.mailingaddress2', caption: 'Mailing Address 2'},
			{name: 'contactbusiness.mailingsuburb', caption: 'Mailing Suburb'},
			{name: 'contactbusiness.mailingstate', caption: 'Mailing State'},
			{name: 'contactbusiness.mailingpostcode', caption: 'Mailing Post Code'},
			{name: 'contactbusiness.mailingcountry', caption: 'Mailing Country'},
			{name: 'contactbusiness.se' + nsFreshcare.data.selfCertificationDateId, caption: 'Self-Cert Date'},
			{name: 'contactbusiness.se' + nsFreshcare.data.jasanzDateId, caption: 'JASANZ Date'},
			{name: 'contactbusiness.se' + nsFreshcare.data.certificationBodyNumberId, caption: 'Cert Body No.'},
			{name: 'contactbusiness.semanualauditapproval', caption: 'Manual Audit Approval'},
			{name: 'contactbusiness.primarycontatpersontext', caption: 'Primary Contact Person'},
			{name: 'contactbusiness.notes', caption: 'Notes'},
		],
		search:
		{
			detail:
			{
				fields: 'contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference,contactbusiness.webaddress,contactbusiness.notes' + 
						',contactbusiness.phonenumber,contactbusiness.faxnumber,contactbusiness.email,contactbusiness.supplierstatus,contactbusiness.supplierstatustext' +
						',contactbusiness.mailingaddress1,contactbusiness.mailingaddress2,contactbusiness.mailingsuburb,contactbusiness.mailingstate' +
						',contactbusiness.mailingpostcode,contactbusiness.mailingcountry,contactbusiness.notes,contactbusiness.primarycontactperson' +
						',contactbusiness.streetaddress1,contactbusiness.streetaddress2,contactbusiness.streetsuburb,contactbusiness.streetstate' +
						',contactbusiness.streetpostcode,contactbusiness.streetcountry,contactbusiness.primarycontactpersontext,contactbusiness.semanualauditapproval' +
						',contactbusiness.se' + nsFreshcare.data.certificationBodyNumberId + ',contactbusiness.se' + nsFreshcare.data.selfCertificationDateId + ',contactbusiness.se' + nsFreshcare.data.jasanzDateId
			}
		}
	},

	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'certificationbody';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Certification Bodies';	
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
		}	
		nsFreshcare.admin.certificationbody.readOnly = nsFreshcare.util.objectIsReadOnly();

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
	},
	home: 		function (oParam, oResponse)
	{
		// v3.2.020
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
			
			// v3.1.2 SUP022859 ReadOnly can't add or delete CB's
			if (nsFreshcare.admin.certificationbody.readOnly == true)
			{
				ns1blankspace.app.context({all: true, inContext: false});
			}

			var aHTML = [];
						
			aHTML.push('<table>');

			aHTML.push('<tr><td><div id="ns1blankspaceViewContactLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');
			aHTML.push('<table>');
					
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			
			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';		
			oSearch.addField('contactbusiness.tradename,contactbusiness.legalname,contactbusiness.supplierstatus');
			oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupAuditor);
			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.certificationbody.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">Click New to create a new Certification Body.</td></tr>' +
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
				nsFreshcare.admin.certificationbody.search.send(event.target.id, {source: 1});
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
					nsFreshcare.admin.certificationbody.home(oParam);
				});
		}
	},

	search: 	
	{
		send: function (sXHTMLElementId, oParam)
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
			var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.admin.certificationbody.show}).value;
			var bSystemSearch = (oParam && oParam.functionShowSystem != undefined);
			var oRoot = ns1blankspace.rootnamespace;

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
				if (!bSystemSearch) {$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);}
				
				ns1blankspace.objectContext = sSearchContext;
				
				// v3.1.2 Added CB No, Self Cert & JASANZ dates & Manual Audit Approval
				// v3.1.209 Now looks for fields in oRoot.admin.certificationbody.data.search.detail.fields
				var oSearch = new AdvancedSearch();		//
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField(oRoot.admin.certificationbody.data.search.detail.fields + 
									',contactbusiness.' + ns1blankspace.option.auditFields.split(',').join(',contactbusiness.'));

				// v3.1.2 if functionShowSystem has been passed, we want to see snapshots
				if (!bSystemSearch)
				{
					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				}
				else
				{
					oSearch.addField('snapshotofid,snapshotcreateduser,snapshotcreatedusertext,snapshotmodifieduser,snapshotmodifiedusertext,snapshotcreateddate,snapshotmodifieddate');
					oSearch.addCustomOption('includesnapshots', 'Y');
					oSearch.addFilter('snapshotofid', 'EQUAL_TO', sSearchContext);
					oSearch.sort('snapshotcreateddate', 'desc');
					fFunctionShow = oParam.functionShowSystem;
				}
				oSearch.getResults(function(data) {fFunctionShow(oParam, data)});
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

					oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupAuditor);					
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.sort('contactbusiness.tradename', 'asc');
					oSearch.sort('contactbusiness.contactperson.firstname', 'asc');
					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.admin.certificationbody.search.process(oParam, data)});
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
					
				$.each(oResponse.data.rows, function()
				{
					aHTML.push(nsFreshcare.internal.entity.search.row(this));
				});
		    	
				aHTML.push('</table>');
				
				$(ns1blankspace.xhtml.searchContainer)
				.html(
					ns1blankspace.render.init(
					{
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

					nsFreshcare.admin.certificationbody.search.send(event.target.id, oParam);
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows to make sure we have matching row counts 
				ns1blankspace.render.bind(
				{
					xhtmlContext: 'EntitySearch',
					functionRow: nsFreshcare.internal.entity.search.row,
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.certificationbody.search.send
				});   
				
			}	
		}
	},						

	layout: 	function ()
	{
		// v3.2.020 SUP023422 Added Training Tab
		var aHTML = [];
		var oContext = {inContext: false, all: nsFreshcare.admin.certificationbody.readOnly};		
		var oContext = {inContext: !nsFreshcare.admin.grower.readOnly};		

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

			aHTML.push('</table>');
		
			aHTML.push('<table class="ns1blankspaceControl">');
			// v3.2.015 SUP023422 Added COP Based Training
			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)		// SUP022859
			{	
				aHTML.push('<tr><td id="ns1blankspaceControlGroups" class="ns1blankspaceControl">' +
								'Groups</td></tr>');							
				aHTML.push('<tr><td id="ns1blankspaceControlRelationships" class="ns1blankspaceControl">' +
								'Relationships</td></tr>');
				aHTML.push('<tr><td id="ns1blankspaceControlTraining" class="ns1blankspaceControl">' +
								'Training</td></tr>');
			}

			aHTML.push('<tr><td id="ns1blankspaceControlAudits" class="ns1blankspaceControl">' +
							'Audits</td></tr>');
			// v3.2.015 SUP023422 Added COP Based Training			
			if (nsFreshcare.user.roleID != nsFreshcare.data.roles.jasanz)		// SUP022859
			{
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
			}

			aHTML.push('</table>');		
		
			aHTML.push('<table class="ns1blankspaceControl">');
		
			aHTML.push('<tr><td id="ns1blankspaceControlSystem" class="ns1blankspaceControl">' +
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
		aHTML.push('<div id="ns1blankspaceMainGroups" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainTraining" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainRelationships" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainUser" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSystem" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAudits" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainInvoices" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			nsFreshcare.admin.certificationbody.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			nsFreshcare.admin.certificationbody.details();
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainContacts', refresh: true});
			nsFreshcare.internal.entity.people.show(
				{
					pageObject: 'certificationbody',
					showGoTo: !nsFreshcare.admin.certificationbody.readOnly,
					defaultOnly: false,
					showGroups: true,
					showUsers: !nsFreshcare.admin.certificationbody.readOnly,
					canAddGroup: !nsFreshcare.admin.certificationbody.readOnly,
					canRemove: !nsFreshcare.admin.certificationbody.readOnly,
					canRemoveDirectly: !nsFreshcare.admin.certificationbody.readOnly,
					canSetPrimary: !nsFreshcare.admin.certificationbody.readOnly,
					canSetPrimaryDirectly: !nsFreshcare.admin.certificationbody.readOnly,
					canUpdate: !nsFreshcare.admin.certificationbody.readOnly,
					canUpdateDirectly: !nsFreshcare.admin.certificationbody.readOnly
				});
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: oContext});
			nsFreshcare.admin.grower.address({suburbUpper: true});
		});
		
		$('#ns1blankspaceControlGroups').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainGroups', refresh: true});
			nsFreshcare.internal.entity.groups.show({contextGroup: 'Auditor'});
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
			// v3.1.2 Now calls emails.configure
			ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});
			nsFreshcare.admin.grower.emails.configure();
		});

		$('#ns1blankspaceControlActions').click(function(event)
		{
			//  v3.1.2 Now calls actions.configure
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
			ns1blankspace.show({selector: '#ns1blankspaceMainSystem', refresh: true, context: {inContext: false}});
			nsFreshcare.util.system.search({xhtmlElementID: 'ns1blankspaceMainSystem', tablePrefix: 'contactbusiness'});
		});
		
		$('#ns1blankspaceControlAudits').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAudits', refresh: true});
			nsFreshcare.admin.certificationbody.audits.show({xhtmlElementID: 'ns1blankspaceMainAudits'});
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
			nsFreshcare.admin.certificationbody.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find certification body.</td></tr></table>');
					
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
				ns1blankspace.data.contactPersonText = sName;
				
				$('#ns1blankspaceViewControlNew').button({disabled: true});
				$('#ns1blankspaceViewControlAction').button({disabled: true});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
			
				oParam.step = 2;
				oParam.contactPerson = ns1blankspace.data.contactPerson;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.certificationbody.show);
				nsFreshcare.internal.entity.user.getDetails(oParam);
			}

			else if (iStep === 2)
			{
				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br /><span style="color:#A0A0A0;font-size:0.825em;">' + ns1blankspace.data.contactPersonText.formatXHTML() + '</span>');
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.admin.certificationbody.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.' + ((oParam.contactPersonSearch)
																				? 'internal.entity.people.show'
																				: 'admin.certificationbody.summary')
																			 + '()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this certification body.</td></tr></table>');
					
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

			if (ns1blankspace.objectContextData['contactbusiness.legalname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.data.contactPersonText.formatXHTML() +
							'</td></tr>');
			}

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

			// v3.1.2 SUP022859 ReadOnly can't do any actions
			if (!(nsFreshcare.admin.certificationbody.readOnly == true))
			{
				if (ns1blankspace.objectContextData.user.length == 0)
				{
					aHTML.push('<tr><td><span id="ns1blankspaceCertificationBodyAddUser" class="ns1blankspaceAction" style="width:150px;">' +
								'Create User</span></td></tr>');
				}

				aHTML.push('<tr><td><span id="ns1blankspaceCertificationBodyAddAuditor" class="ns1blankspaceAction" style="width:150px;">' +
							'Add Auditor</span></td></tr>');
				
				aHTML.push('<tr><td><span id="ns1blankspaceCertificationBodyAddContact" class="ns1blankspaceAction" style="width:150px;">' +
							'Add Contact</span></td></tr>');
			}	

			// v3.1.2 SUP022859 JASANZ to be able to limit Grower, Audit & Certificate views to just one CB
			// v3.2.015 SUP023422 Added COP Based Training
			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz)
			{
				aHTML.push('<tr><td><span id="ns1blankspaceCertificationBodyViewFilter" class="ns1blankspaceAction" style="width:150px;">' +
							(nsFreshcare.data.viewFilter.certificationBody ? 'Revert View to all CBs' : 'Limit View to this CB') + 
							'</span></td></tr>');
				

			}

			aHTML.push('</table>');					
		
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

				
			if (!(nsFreshcare.admin.certificationbody.readOnly == true))
			{
				$('#ns1blankspaceCertificationBodyAddUser')
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
							customUserName: true,
							role: 'Auditor',
							onComplete: nsFreshcare.admin.certificationbody.search.send
						});

					});
				
				$('#ns1blankspaceCertificationBodyAddAuditor')
					.button(
					{
						label: 'Add Auditor',
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
							group: nsFreshcare.data.groupAuditor[0]
						});

					});
				
				$('#ns1blankspaceCertificationBodyAddContact')
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
							pageObject: 'certificationbody',
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
			// v3.2.015 SUP023422 Added COP Based Training
			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.jasanz)
			{
				$('#ns1blankspaceCertificationBodyViewFilter')
					.button(
					{
						label: (nsFreshcare.data.viewFilter.certificationBody ? 'Revert View to all CBs' : 'Limit View to this CB')
					})
					.on("click", function()
					{
						if (nsFreshcare.data.viewFilter.certificationBody)
						{
							delete(nsFreshcare.data.viewFilter.certificationBody);
							$('#ns1blankspaceCertificationBodyViewFilter').button({label: 'Limit View to this CB'});
						}
						else
						{
							nsFreshcare.data.viewFilter.certificationBody = ns1blankspace.objectContext;
							$('#ns1blankspaceCertificationBodyViewFilter').button({label: 'Revert View to all CBs'});
						}
					});
			}
		}
	},

	details: function (oParam)
	{
		oParam = ns1blankspace.util.setParam(oParam, 'statusColumn', 'supplierstatus');
		oParam.sourceNamespace = 'certificationbody';		// v3.1.2 added
		nsFreshcare.internal.entity.details(oParam);
	},

	audits: 
	{
		show: function(oParam)
		{
			var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
			var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'actualdate'}).value;
			var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;
			var aHTML = [];

			if (oResponse === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('reference,typetext,actualdate,resultstatustext,auditpersontext,contactbusiness,contactbusinesstext,contactpersontext');
				oSearch.addFilter('auditbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.rows = ns1blankspace.option.defaultRows;
				oSearch.sort(sSortColumn, sSortDirection);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						nsFreshcare.admin.certificationbody.audits.show(oParam, oResponse);
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
							'<td id="ns1blankspaceCertBodyAuditsColumn1" class="ns1blankspaceColumn1Large">' +
							ns1blankspace.xhtml.loading +
							'</td>' +
							'<td id="ns1blankspaceCertBodyAuditsColumn2" style="width: 100px;" class="ns1blankspaceColumn2Action">' +
							'</td>' +
							'</tr>' +
							'</table>');				
				
				$('#' + sXHTMLElementID).html(aHTML.join(''));
				
				aHTML = [];
				
				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table border="0" cellspacing="0" cellpadding="0" width="750" style="margin-top:15px); margin-bottom:15px);">');
					aHTML.push('<tr>');
					aHTML.push('<td class="ns1blankspaceNothing">No audits.</td>');
					aHTML.push('</tr>');
					aHTML.push('</table>');

					$('#ns1blankspaceCertBodyAuditsColumn1').html(aHTML.join(''));		
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
									' data-column="typetext"' +
									' data-sortdirection="' + ((sSortColumn == "typetext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Title</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="actualdate"' +
									' data-sortdirection="' + ((sSortColumn == "actualdate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Actual</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="resultstatustext"' +
									' data-sortdirection="' + ((sSortColumn == "resultstatustext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Result Status</td>');
					// v3.2.015 SUP023422 Added COP Based Training
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="contactbusinesstext"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusinesstext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>' + nsFreshcare.data.growerText + '</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
									' data-column="auditpersontext"' +
									' data-sortdirection="' + ((sSortColumn == "auditorpersontext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Auditor</td>');
					aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
					aHTML.push('</tr>');
					
					$.each(oResponse.data.rows, function()
					{
						aHTML.push(nsFreshcare.admin.certificationbody.audits.row(this));
					});
					
					aHTML.push('</table>');
					
					ns1blankspace.render.page.show(
					{
						xhtmlElementID: 'ns1blankspaceCertBodyAuditsColumn1',
						xhtmlContext: 'CertBodyAudits',
						xhtml: aHTML.join(''),
						showMore: (oResponse.morerows == "true"),
						more: oResponse.moreid,
						rows: ns1blankspace.option.defaultRows,
						functionShowRow: nsFreshcare.admin.certificationbody.audits.row,
						functionNewPage: 'nsFreshcare.admin.certificationbody.audits.bind()',
						type: 'json'
					}); 	
					
					nsFreshcare.admin.certificationbody.audits.bind();
				}
			}
		},

		row: function(oRow)
		{
			var aHTML = [];
			var sName = (oRow.auditpersontext.split(', ').length > 1) 
						? oRow.auditpersontext.split(', ').pop() + ' ' + oRow.auditpersontext.split(', ').shift()
						: oRow.auditpersontext;

			aHTML.push('<tr id="ns1blankspaceCertBodyAudits-' + oRow.id + '">');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_referencce-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.reference + '</td>');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_typetext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.typetext + '</td>');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_actualdate-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.actualdate + '</td>');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_resultstatustext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.resultstatustext + '</td>');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_contactbusinesstext-' + oRow.id + '" class="ns1blankspaceRow">' +
							oRow.contactbusinesstext + '</td>');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_auditpersontext-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceRowContact"' +
							' data-contactbusiness="' + oRow.contactbusiness + '">' +
							sName + '</td>');

			aHTML.push('<td id="ns1blankspaceCertBodyAudits_select-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceSelect">' +
							'&nbsp;</td>');

			aHTML.push('</tr>');

			return aHTML.join('');
		},

		bind: function()
		{
			$('.ns1blankspaceSelect')
				.button(
				{
					text: false,
					icons: {primary: 'ui-icon-play'}
				})
				.on('click', function(event)
				{	
					nsFreshcare.admin.audit.init({id: this.id.split('-').pop()});
				})
				.css('width', '18px')
				.css('height', '18px');

			$('.ns1blankspaceRowContact')
				.on('click', function(event)
				{	
					nsFreshcare.admin.grower.init({id: $(this).attr('data-contactbusiness')});
				})
				.css('cursor', 'pointer');

			$('.ns1blankspaceHeaderSort')
				.on('click', function(event)
				{
					var oParam = 
					{
						xhtmlElementID: 'ns1blankspaceMainAudits',
						sortColumn: $(this).attr('data-column'),
						sortDirection: $(this).attr('data-sortdirection')
					}

					$(this).attr('data-sortdirection', (($(this).attr('data-sortdirection') === 'asc') ? 'desc' : 'asc'));
					nsFreshcare.admin.certificationbody.audits.show(oParam);
				})
				.css('cursor', 'pointer')

		}
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

	save:
	{
		send: function() 
		{
			nsFreshcare.internal.entity.save.send(
				{
					businessGroup: nsFreshcare.data.businessGroupAuditor,
					functionPostSave: nsFreshcare.admin.certificationbody.search.send
				});
		}
	}
}