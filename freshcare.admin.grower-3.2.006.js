/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
 // v3.1.210 replaced all dialog('close') with dialog('destroy')

nsFreshcare.admin.grower = 
{
	data: 
	{
		saveObjects:
		[
			{
				object: 'contactbusiness',
				method: 'CONTACT_BUSINESS_MANAGE',
				saveSource: 'businessData',
				dataSource: '',
				dataSourcePrefix: 'contactbusiness'
			},
			{
				object: 'businessgroup',
				method: 'CONTACT_BUSINESS_GROUP_MANAGE',
				saveSource: 'businessGroupsData',
				dataSource: 'businessGroups',
				dataSourcePrefix: ''
			},
			{
				object: 'contactperson',
				method: 'CONTACT_PERSON_MANAGE',
				saveSource: 'personData',
				dataSource: '',
				dataSourcePrefix: 'contactbusiness.contactperson'
			},
			{
				object: 'persongroup',
				method: 'CONTACT_PERSON_GROUP_MANAGE',
				saveSource: 'personGroupsData',
				dataSource: 'personGroups',
				dataSourcePrefix: ''
			},
			{
				object: 'agribusiness',
				method: 'AGRI_BUSINESS_MANAGE',
				saveSource: 'agriBusinessData',
				dataSource: '',
				dataSourcePrefix: 'contactbusiness.agribusiness'
			},
			{
				object: 'address',
				method: 'CORE_LOCATION_ADDRESS_MANAGE',
				saveSource: 'addressLocationsData',
				dataSource: 'sites',
				dataSourcePrefix: ''
			},
			{
				object: 'agrisubscription',
				method: 'AGRI_SUBSCRIPTION_MANAGE',
				saveSource: 'subscriptionsData',
				dataSource: 'memberships',
				dataSourcePrefix: 'agrisubscription'
			},
			{
				object: 'addresslink',
				method: 'CORE_LOCATION_ADDRESS_LINK_MANAGE',
				saveSource: 'subscriptionSitesLinkData',
				dataSource: 'membershipSites',
				dataSourcePrefix: 'address.addresslink'
			},
			{
				object: 'objectscope',
				method: 'AGRI_OBJECT_SCOPE_MANAGE',
				saveSource: 'subscriptionScopeData',
				dataSource: 'scopeValues',
				dataSourcePrefix: ''
			},
			{
				object: 'agriproductgroupcategory',
				method: 'AGRI_PRODUCT_GROUP_MANAGE',
				saveSource: 'subscriptionCategoryData',
				dataSource: 'productGroups',
				dataSourcePrefix: ''
			},
			{
				object: 'agrisubscriptionstatuschange',
				method: 'AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE',
				saveSource: 'subscriptionStatusChangeData',
				dataSource: 'statusTransactions',
				dataSourcePrefix: ''
			},
			{
				object: 'agricertificate',
				method: 'AGRI_CERTIFICATE_MANAGE',
				saveSource: 'subscriptionCertificateData',
				dataSource: 'memberships',
				dataSourcePrefix: 'agrisubscription.agricertificate'
			}
		],

		groups: 
		[
			{
				context: 'Business',
				contactSearch :
				{
					method: 'CONTACT_BUSINESS_GROUP_SEARCH',
					fields: 'contactbusiness,contactbusinesstext,group,grouptext',
					filters : 
					[
						{name: "contactbusiness", comparison: 'EQUAL_TO', value1: 'id'}
					]
				},
				groupSearch: 
				{
					method: 'SETUP_CONTACT_BUSINESS_GROUP_TYPE_SEARCH',
					fields: 'title',
					sort: {name: 'title', direction: 'asc'}
				},
				contactManage:
				{
					method: 'CONTACT_BUSINESS_GROUP_MANAGE',
					fields:
					[
						{name: 'contactbusiness', value: 'id'}
					]
				}
			},
			{
				context: 'Person',
				contactSearch :
				{
					method: 'CONTACT_PERSON_GROUP_SEARCH',
					fields: 'contactperson,contactpersontext,group,grouptext',
					filters : 
					[
						{name: "contactperson", comparison: 'EQUAL_TO', value1: 'contactbusiness.contactperson.id'}
					]
				},
				groupSearch: 
				{
					method: 'SETUP_CONTACT_PERSON_GROUP_TYPE_SEARCH',
					fields: 'title',
					sort: {name: 'title', direction: 'asc'}
				},
				contactManage:
				{
					method: 'CONTACT_PERSON_GROUP_MANAGE',
					fields:
					[
						{name: 'contactperson', value: 'contactbusiness.contactperson.id'}
					]
				}

			}
		],

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
			{name: 'contactbusiness.mailingaddress1', caption: 'Mailing Address'},
			{name: 'contactbusiness.mailingaddress2', caption: 'Mailing Address 2'},
			{name: 'contactbusiness.mailingsuburb', caption: 'Mailing Suburb'},
			{name: 'contactbusiness.mailingstate', caption: 'Mailing State'},
			{name: 'contactbusiness.mailingpostcode', caption: 'Mailing Post Code'},
			{name: 'contactbusiness.mailingcountry', caption: 'Mailing Country'},
			{name: 'contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 'text', caption: 'Send Printed Certs?'},
			{name: 'contactbusiness.se' + nsFreshcare.data.jasanzDateId, caption: 'JASANZ Date'},
			{name: 'contactbusiness.se' + nsFreshcare.data.certificationBodyNumberId, caption: 'Cert Body No.'},
			{name: 'contactbusiness.primarycontatpersontext', caption: 'Primary Contact Person'},
			{name: 'contactbusiness.notes', caption: 'Notes'},
		]
	},

	init: 		function (oParam) 
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 12;	
		ns1blankspace.objectName = 'grower';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectMethod = 'CONTACT_BUSINESS';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'Growers';	
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		delete(nsFreshcare.admin.grower.data.newSiteCount);
		nsFreshcare.admin.grower.readOnly = nsFreshcare.util.objectIsReadOnly();

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
			
			// v3.1.2 SUP022859 ReadOnly can't add or delete Growers
			if (nsFreshcare.admin.grower.readOnly == true)
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
			oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename,contactbusiness.legalname' +
							',contactbusiness.agrisubscription.agricertificate.certificatenumber');
			oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
			oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);		// v3.1.2 SUP022744 Used to be persongroup
			// v3.1.2 SUP022859 Only show JASANZ users growers for the selected CB if set
			if (nsFreshcare.user.role.toLowerCase() == 'jasanz' && nsFreshcare.data.viewFilter.certificationBody) 
			{
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", nsFreshcare.data.viewFilter.certificationBody);
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addBracket("(");
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
				oSearch.addOperator("or");
				oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
				oSearch.addBracket(")");
			}
			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.grower.home(oParam, oResponse)});	
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">Click New to create a new Grower record.</td></tr>' +
								'</table>');
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">');
				aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY UPDATED</td></tr>');		//v1.0.24
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="contactbusiness.agrisubscription.agricertificate.certificatenumber"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.agrisubscription.agricertificate.certificatenumber") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Certificate</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="contactbusiness.tradename"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.tradename") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Business</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="contactbusiness.contactperson.surname"' +
									' data-sortdirection="' + ((sSortColumn == "contactbusiness.contactperson.surname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Contact</td>' +
							'</tr>');

				// Need to remove the duplicates caused by referencing agrisubscription.certificate
				var iPreviousGrower = '';
				$.each(oResponse.data.rows, function()
				{
					if (iPreviousGrower != this.id)
					{
						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_certificate-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.agrisubscription.agricertificate.certificatenumber"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_business-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.tradename"] + '</td>' +
									'<td id="ns1blankspaceMostLikely_name-' + this.id + '" class="ns1blankspaceMostLikely">' +
												this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>' +
									'</tr>');
					}
					iPreviousGrower = this.id;
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function(event)
			{
				nsFreshcare.admin.grower.search.send(event.target.id, {source: 1});
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.admin.grower.home(oParam);
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
			var fFunctionShow = ns1blankspace.util.getParam(oParam, 'functionShow', {'default': nsFreshcare.admin.grower.show}).value;
			var bSystemSearch = (oParam && oParam.functionShowSystem != undefined);

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
				
				// v2.0.4 SUP021367 Added person notes
				// v3.1.206 SUP0230335 No  longer searches for person mailing addresses and now searches for Business notes
				var oSearch = new AdvancedSearch();		//
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.phonenumber,contactbusiness.faxnumber,contactbusiness.contactperson.customerstatus' +
								',contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.title' +
								',contactbusiness.contactperson.titletext,contactbusiness.contactperson.position,contactbusiness.contactperson.email' + 
								',contactbusiness.contactperson.workphone,contactbusiness.contactperson.mobile,contactbusiness.contactperson.fax' + 
								',contactbusiness.contactperson.gender,contactbusiness.contactperson.gendertext,contactbusiness.primarycontactperson' + 
								',contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + ',contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId + 'text' + 
								',contactbusiness.mailingaddress1,contactbusiness.mailingaddress2,contactbusiness.mailingsuburb,contactbusiness.mailingstate,contactbusiness.mailingcountry' +
								',contactbusiness.streetaddress1,contactbusiness.streetaddress2,contactbusiness.streetsuburb,contactbusiness.streetstate,contactbusiness.streetpostcode,contactbusiness.streetcountry' +
								',contactbusiness.mailingpostcode,contactbusiness.customerstatus,contactbusiness.customerstatustext' +
								',contactbusiness.notes,contactbusiness.contactperson.preferredcommunication,contactbusiness.contactperson.preferredcommunicationtext' +
								',contactbusiness.contactperson.id,contactbusiness.tradename,contactbusiness.legalname,contactbusiness.abn,contactbusiness.reference' + 
								',contactbusiness.addresslink.address.address1,contactbusiness.addresslink.address.address2,contactbusiness.addresslink.address.addresssuburb' +
								',contactbusiness.addresslink.address.addressstate,contactbusiness.addresslink.address.addresspostcode,contactbusiness.addresslink.address.addresscountry' + 
								',contactbusiness.agribusiness.id,contactbusiness.agribusiness.joindate,contactbusiness.agribusiness.prioritymembership,contactbusiness.agribusiness.prioritymembership' +
								',contactbusiness.agribusiness.contactbusiness,contactbusiness.agribusiness.prioritymembershiptext,contactbusiness.contactperson.contactbusiness' +
								',contactbusiness.contactperson.user.id,contactbusiness.contactperson.user.username,contactbusiness.contactperson.user.disabled,contactbusiness.contactperson.user.se' + nsFreshcare.data.userPasswordId + 
								',contactbusiness.' + ns1blankspace.option.auditFields.split(',').join(',contactbusiness.'));

				// v3.1.2 if functionShowSystem has been passed, we want to see snapshots
				if (!bSystemSearch)
				{
					oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
					oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
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
					
					// v3.1.1n SUP022914 Split out first and surname
					var sSurname = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').pop() : sSearchText;
					var sFirstName = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').shift() : sSearchText;

					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_BUSINESS_SEARCH';
					oSearch.addField('contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.tradename,contactbusiness.legalname,contactbusiness.contactperson.id');
					
					oSearch.addBracket("(");
						oSearch.addBracket("(");
							oSearch.addFilter('contactbusiness.contactperson.firstname', 'TEXT_IS_LIKE', sFirstName);
							oSearch.addOperator((sFirstName != sSurname) ? 'and' : 'or');
							oSearch.addFilter('contactbusiness.contactperson.surname', 'TEXT_IS_LIKE', sSurname);
						oSearch.addBracket(')');
						oSearch.addOperator("or");
						oSearch.addBracket("(");
							oSearch.addFilter('contactbusiness.tradename', 'TEXT_IS_LIKE', sSearchText);
							oSearch.addOperator("or");
							oSearch.addFilter('contactbusiness.legalname', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addBracket(')');
					oSearch.addBracket(')');

					// v3.1.1n SUP022914 Include all contacts unless single word search (otherwise they could be searching for a contactperson)
					if (sSurname == sFirstName)
					{
						oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');
					}	
					oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);			// v3.1.2 SUP022744 used to be persongroup				
		
					// v3.1.2 SUP022859 Only show JASANZ users audits for the selected CB if set
					if (nsFreshcare.user.role.toLowerCase() == 'jasanz' && nsFreshcare.data.viewFilter.certificationBody) 
					{
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.contactbusiness", "EQUAL_TO", nsFreshcare.data.viewFilter.certificationBody);
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
						oSearch.addBracket("(");
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString("dd MMM yyyy"));
						oSearch.addOperator("or");
						oSearch.addFilter("contactbusiness.relationshipotherbusiness.enddate", 'IS_NULL');
						oSearch.addBracket(")");
					}
					
					ns1blankspace.search.advanced.addFilters(oSearch);

					oSearch.sort('contactbusiness.tradename', 'asc');
					oSearch.sort('contactbusiness.contactperson.id', 'asc');
					oSearch.rows = 40;
					oSearch.rf = 'json';
					oSearch.getResults(function(data) {nsFreshcare.admin.grower.search.process(oParam, data)});
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
					
				var sPreviousContact = '';

				$.each(oResponse.data.rows, function()
				{
					if (sPreviousContact != this['contactbusiness.contactperson.id']) 
					{
						iColumn = iColumn + 1;
						
						if (iColumn == 1)
						{
							aHTML.push('<tr class="ns1blankspaceSearch">');
						}
						
						aHTML.push('<td class="ns1blankspaceSearch" id="contactbusiness' +
										'-' + this.id + '">' +
										this["contactbusiness.tradename"] + '</td>' + 
									'<td class="ns1blankspaceSearch" id="contactbusiness' +
										'-' + this.id + '">' +
										this["contactbusiness.legalname"] +
									'</td>'); 
						
						aHTML.push('<td class="ns1blankspaceSearch" id="contactperson' +
										'-' + this.id + '">' +
										this["contactbusiness.contactperson.firstname"] + ' ' + this["contactbusiness.contactperson.surname"] + '</td>');
										
						if (iColumn == iMaximumColumns)
						{
							aHTML.push('</tr>');
							iColumn = 0;
						}	
					}
					sPreviousContact = this['contactbusiness.contactperson.id'];
				});
		    	
				aHTML.push('</table>');
				
				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.admin.grower.search.send(event.target.id, {source: 1});
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows to make sure we have matching row counts
				ns1blankspace.render.bind(
				{
					columns: 'contactbusiness.tradename-column-contactbusiness.legalname-column-contactbusiness.contactperson.firstname-space-contactbusiness.contactperson.surname',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.grower.search.send
				});   
				
			}	
		}
	},						

	remove: function(oParam)
	{	
		nsFreshcare.admin.grower['delete'].validate(oParam);
	},

	'delete': 
	{
		validate: function(oParam)
		{
			// Users must manually delete Other Contacts, Non-primary sites, Memberships before it will automatically delete the rest
			var aText = [];
			var aButtons = [];
			var oData = {};
			var sMethod = '';

			if (oParam.removeGrowerStep === undefined) 
			{
				ns1blankspace.container.confirm({title: 'Delete ' + nsFreshcare.data.growerText + '?', html: 'Are you sure you want to delete this ' + nsFreshcare.data.growerText + '?',
													buttons: 
													[
														{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
															click: function() 
															{
																oParam.removeGrowerStep = 1;
																$(this).dialog('destroy');
																nsFreshcare.admin.grower['delete'].validate(oParam);
															}
														},
														{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
															click: function() 
															{
																$(this).dialog('destroy');
																ns1blankspace.okToSave = false;
																return;
															}
														}
													]
												});
			}

			// Count people
			else if (oParam.removeGrowerStep === 1)
			{
				ns1blankspace.status.working('Finding Contacts');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_PERSON_SEARCH';
				oSearch.addField('firstname,surname');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countPeople');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countPeople = oResponse.summary.countPeople;
						oParam.people = oResponse.data.rows;
						oParam.removeGrowerStep = 2;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding contacts: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Memberships
			else if (oParam.removeGrowerStep === 2)
			{
				ns1blankspace.status.working('Finding Memberships');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('membership,membershiptext,codeofpracticetext');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countMemberships');
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countMemberships = oResponse.summary.countMemberships;
						oParam.memberships = oResponse.data.rows;
						oParam.removeGrowerStep = 3;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding memberships: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Sites
			else if (oParam.removeGrowerStep === 3)
			{
				ns1blankspace.status.working('Finding Sites');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('address1,address2,addresssuburb,address.addresslink.id');
				oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
				oSearch.addFilter('address.addresslink.objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countSites');
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countSites = oResponse.summary.countSites;
						oParam.sites = oResponse.data.rows;
						oParam.removeGrowerStep = 4;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding sites: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Audits
			else if (oParam.removeGrowerStep === 4)
			{
				ns1blankspace.status.working('Finding Audits');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('reference,actualdate,audit.agrisubscription.membershiptext');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countAudits');
				oSearch.rows = 1;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countAudits = oResponse.summary.countAudits;
						oParam.audits = oResponse.data.rows;
						oParam.removeGrowerStep = 10;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding audits: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Attachments
			else if (oParam.removeGrowerStep === 5)
			{
				ns1blankspace.status.working('Finding Attachments');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_ATTACHMENT_SEARCH';
				oSearch.addField('filename,attachment,typetext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectBusiness);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countAttachments');
				oSearch.rows = (oParam.rows) ? oParam.rows : 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countAttachments = oResponse.summary.countAttachments;
						oParam.attachments = oResponse.data.rows;
						oParam.removeGrowerStep = (oParam.nextStep) ? oParam.nextStep :6;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding attachments: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Actions
			else if (oParam.removeGrowerStep === 6)
			{
				ns1blankspace.status.working('Finding Actions / Emails');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'ACTION_SEARCH';
				oSearch.addField('subject,duedate,description,actiontypetext');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countActions');
				oSearch.rows = (oParam.rows) ? oParam.rows : 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countActions = oResponse.summary.countActions;
						oParam.actions = oResponse.data.rows;
						oParam.removeGrowerStep = (oParam.nextStep) ? oParam.nextStep :7;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding actions: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Relationships
			else if (oParam.removeGrowerStep === 7)
			{
				ns1blankspace.status.working('Finding Relationships');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
				oSearch.addField('contactbusiness,othercontactbusiness,typetext');
				oSearch.addBracket('(');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addOperator('or');
				oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addBracket(')');
				oSearch.addSummaryField('count(*) countRelationships');
				oSearch.rows = (oParam.rows) ? oParam.rows : 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countRelationships = oResponse.summary.countRelationships;
						oParam.relationships = oResponse.data.rows;
						oParam.removeGrowerStep = (oParam.nextStep) ? oParam.nextStep :8;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding relationships: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Person Groups
			else if (oParam.removeGrowerStep === 8)
			{
				ns1blankspace.status.working('Finding Person Groups');
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_PERSON_GROUP_SEARCH';
				oSearch.addField('contactpersontext,grouptext');
				oSearch.addFilter('persongroup.contactperson.contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countPersonGroups');
				oSearch.rows = (oParam.rows) ? oParam.rows : 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countPersonGroups = oResponse.summary.countPersonGroups;
						oParam.personGroups = oResponse.data.rows;
						oParam.removeGrowerStep = (oParam.nextStep) ? oParam.nextStep :9;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding person groups: ' + oResponse.error.errornotes);
					}
				});
			}

			// Count Business Groups
			else if (oParam.removeGrowerStep === 9)
			{
				ns1blankspace.status.working('Finding Business Groups');
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_GROUP_SEARCH';
				oSearch.addField('contactbusinesstext,grouptext');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.addSummaryField('count(*) countBusinessGroups');
				oSearch.rows = (oParam.rows) ? oParam.rows : 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.countBusinessGroups = oResponse.summary.countBusinessGroups;
						oParam.businessGroups = oResponse.data.rows;
						oParam.removeGrowerStep = (oParam.nextStep) ? oParam.nextStep :10;
						nsFreshcare.admin.grower['delete'].validate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding business groups: ' + oResponse.error.errornotes);
					}
				});
			}

			// Display error / confirmation message 
			else if (oParam.removeGrowerStep === 10)
			{
				ns1blankspace.status.clear();
				
				// Determine if we can actually delete - these first ones must be removed manually before we can delete the Grower
				if (parseInt(oParam.countPeople) > 1)
				{
					aText.push('<tr><td>' + (parseInt(oParam.countPeople) - 1) + ' Contact' + ((oParam.countPeople != '2') ? 's' : ''));
				}
				if (parseInt(oParam.countMemberships) > 0)
				{
					aText.push('<tr><td>' + oParam.countMemberships + ' Membership' + ((oParam.countMemberships != '1') ? 's' : ''));
				}
				else {oParam.countMemberships = undefined}

				if (parseInt(oParam.countSites) > 1)
				{
					aText.push('<tr><td>' + (parseInt(oParam.countSites) - 1) + ' Site' + ((oParam.countSites != '2') ? 's' : ''));
				}
				else {oParam.countSites = undefined}

				if (parseInt(oParam.countAudits) > 0)
				{
					aText.push('<tr><td>' + oParam.countAudits + ' Audit' + ((oParam.countAudits != '1') ? 's' : ''));
				}
				else {oParam.countAudits = undefined}
				
				// If none of the above are present, we can now delete after confirming with the user, otherwise we tell the user they can't continue
				$(ns1blankspace.xhtml.container).html('');
				$(ns1blankspace.xhtml.container).hide();
				if (aText.length > 0)
				{
					ns1blankspace.status.clear();
					oParam = {};
					aText.unshift('<table><tr><td>The following data must be removed manually prior to removing the ' + nsFreshcare.data.growerText + '</td></tr>');
					aText.push('</table>');
					ns1blankspace.container.confirm({title: 'Cannot remove ' + nsFreshcare.data.growerText,
													html: aText.join('')});
				}
				else
				{
					// We can tell that the second round of searches has been done if businessGroups has been set. If not set, then call second round
					if (oParam.countBusinessGroups == undefined)
					{
						oParam.removeGrowerStep = 5;
						nsFreshcare.admin.grower['delete'].validate(oParam);				
					}
					else
					{
						if (parseInt(oParam.countPeople) > 0)
						{
							aText.push('<tr><td>' + oParam.countPeople + ' Person (Primary Contact)');
						}
						else {oParam.countPeople = undefined}

						if (parseInt(oParam.countSites) > 0)
						{
							aText.push('<tr><td>' + oParam.countSites + ' Sites (Primary Site)');
						}
						else {oParam.countSites = undefined}

						if (parseInt(oParam.countActions) > 0)
						{
							aText.push('<tr><td>' + oParam.countActions + ' Action' + ((oParam.countActions != '1') ? 's' : ''));
						}
						else {oParam.countActions = undefined}

						if (parseInt(oParam.countAttachments) > 0)
						{
							aText.push('<tr><td>' + oParam.countAttachments + ' Attachment' + ((oParam.countAttachments != '1') ? 's' : ''));
						}
						else {oParam.countAttachments = undefined}

						if (parseInt(oParam.countRelationships) > 0)
						{
							aText.push('<tr><td>' + oParam.countRelationships + ' Relationship' + ((oParam.countRelationships != '1') ? 's' : ''));
						}
						else {oParam.countRelationships = undefined}

						if (parseInt(oParam.countPersonGroups) > 0)
						{
							aText.push('<tr><td>' + oParam.countPersonGroups + ' Person Group' + ((oParam.countPersonGroups != '1') ? 's' : ''));
						}
						else {oParam.countPersonGroups = undefined}

						if (parseInt(oParam.countBusinessGroups) > 0)
						{
							aText.push('<tr><td>' + oParam.countBusinessGroups + ' Business Group' + ((oParam.countBusinessGroups != '1') ? 's' : ''));
						}
						else {oParam.countBusinessGroups = undefined}


						// If we have something to delete, confirm it with the user and continue if they confirm
						if (aText.length > 0)
						{
							aText.unshift('<table><tr><td>The following data will be deleted when removing ' + nsFreshcare.data.growerText + '. Continue deleting?</td></tr>');
							aText.push('</table>');
							
							aButtons =  [
											{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
												click: function() 
												{
													oParam.removeGrowerStep = 11;
													$(this).dialog('destroy');
													nsFreshcare.admin.grower['delete'].send(oParam);
												}
											},
											{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
												click: function() 
												{
													oParam = {};
													$(this).dialog('destroy');
													ns1blankspace.okToSave = false;
													return;
												}
											}
										];

							ns1blankspace.container.confirm({title: 'Delete ' + nsFreshcare.data.growerText,
															html: aText.join(''),
															buttons: aButtons});
						}
						else // Just delete busines record
						{
							oParam.removeGrowerStep = 12;
							nsFreshcare.admin.grower['delete'].send(oParam);
						}
					}
				}
			}
		},

		send: function(oParam)
		{
			// Users must manually delete Other Contacts, Non-primary sites, Memberships before it will automatically delete the rest
			var aText = [];
			var aButtons = [];
			var oData = {};
			var sMethod = '';

			if (oParam.removeGrowerStep === undefined) {oParam.removeGrowerStep = 11}

			// Perform the deletion 
			else if (oParam.removeGrowerStep === 11)
			{
				// Remove each relationship 
				if (oParam.countRelationships && parseInt(oParam.countRelationships) > 0)
				{	
					// Check if we need to get more records
					if (oParam.relationships.length < parseInt(oParam.countRelationships))
					{
						oParam.rows = oParam.countRelationships;
						oParam.removeGrowerStep = 7;
						oParam.nextStep = 11;
						nsFreshcare.admin.grower['delete'].send(oParam);
					}
					else
					{
						ns1blankspace.status.working('Removing relationships');
						if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

						if (oParam.rowIndex < oParam.relationships.length)
						{
							oData.id = oParam.relationships[oParam.rowIndex].id;
							sMethod = 'CONTACT_RELATIONSHIP_MANAGE';
							oParam.currentObject = 'countRelationships'
						}
						else
						{
							delete(oParam.countRelationships);
						}
					}
				}

				// Remove each attachment 
				else if (oParam.countAttachments && parseInt(oParam.countAttachments) > 0)
				{	
					// Check if we need to get more records
					if (oParam.attachments.length < parseInt(oParam.countAttachments))
					{
						oParam.rows = oParam.countAttachments;
						oParam.removeGrowerStep = 5;
						oParam.nextStep = 11;
						nsFreshcare.admin.grower['delete'].send(oParam);
					}
					else
					{
						ns1blankspace.status.working('Removing attachments');
						if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

						if (oParam.rowIndex < oParam.attachments.length)
						{
							oData.id = oParam.attachments[oParam.rowIndex].attachment;
							sMethod = 'CORE_ATTACHMENT_MANAGE';
							oParam.currentObject = 'countAttachments'
						}
						else
						{
							delete(oParam.countAttachments);
						}
					}
				}

				// Remove each action 
				else if (oParam.countActions && parseInt(oParam.countActions) > 0)
				{	
					// Check if we need to get more records
					if (oParam.actions.length < parseInt(oParam.countActions))
					{
						oParam.rows = oParam.countActions;
						oParam.removeGrowerStep = 6;
						oParam.nextStep = 11;
						nsFreshcare.admin.grower['delete'].send(oParam);
					}
					else
					{
						ns1blankspace.status.working('Removing actions');
						if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

						if (oParam.rowIndex < oParam.actions.length)
						{
							oData.id = oParam.actions[oParam.rowIndex].id;
							sMethod = 'ACTION_MANAGE';
							oParam.currentObject = 'countActions'
						}
						else
						{
							delete(oParam.countActions);
						}
					}
				}

				// Remove each person group 
				else if (oParam.countPersonGroups && parseInt(oParam.countPersonGroups) > 0)
				{	
					// Check if we need to get more records
					if (oParam.personGroups.length < parseInt(oParam.countPersonGroups))
					{
						oParam.rows = oParam.countPersonGroups;
						oParam.removeGrowerStep = 8;
						oParam.nextStep = 11;
						nsFreshcare.admin.grower['delete'].send(oParam);
					}
					else
					{
						ns1blankspace.status.working('Removing person groups');
						if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

						if (oParam.rowIndex < oParam.personGroups.length)
						{
							oData.id = oParam.personGroups[oParam.rowIndex].id;
							sMethod = 'CONTACT_PERSON_GROUP_MANAGE';
							oParam.currentObject = 'countPersonGroups'
						}
						else
						{
							delete(oParam.countPersonGroups);
						}
					}
				}

				// Remove each business group 
				else if (oParam.countBusinessGroups && parseInt(oParam.countBusinessGroups) > 0)
				{	
					// Check if we need to get more records
					if (oParam.businessGroups.length < parseInt(oParam.countBusinessGroups))
					{
						oParam.rows = oParam.countBusinessGroups;
						oParam.removeGrowerStep = 9;
						oParam.nextStep = 11;
						nsFreshcare.admin.grower['delete'].send(oParam);
					}
					else
					{
						ns1blankspace.status.working('Removing business groups');
						if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

						if (oParam.rowIndex < oParam.businessGroups.length)
						{
							oData.id = oParam.businessGroups[oParam.rowIndex].id;
							sMethod = 'CONTACT_BUSINESS_GROUP_MANAGE';
							oParam.currentObject = 'countBusinessGroups'
						}
						else
						{
							delete(oParam.countBusinessGroups);
						}
					}
				}

				// Remove primary site link
				else if (oParam.countSites && parseInt(oParam.countSites) > 0)
				{	
					ns1blankspace.status.working('Removing primary site link');
					oData.id = oParam.sites[0]['address.addresslink.id'];
					sMethod = 'CORE_LOCATION_ADDRESS_LINK_MANAGE';
					oParam.currentObject = 'countSites';
					delete(oParam.countSites);
					// Store data for deleting site address on next call
					oParam.countSiteAddress = 1;
					oParam.siteAddress = [{id: oParam.sites[0].id}];
				}

				// Remove primary site address
				else if (oParam.countSiteAddress && parseInt(oParam.countSiteAddress) > 0)
				{	
					ns1blankspace.status.working('Removing primary site address');
					oData.id = oParam.siteAddress[0].id;
					sMethod = 'CORE_LOCATION_ADDRESS_MANAGE';
					oParam.currentObject = 'countSiteAddress';
					delete(oParam.countSiteAddress);
				}

				// Remove primary contact person
				else if (oParam.countPeople && parseInt(oParam.countPeople) > 0)
				{	
					ns1blankspace.status.working('Removing primary contact person');
					oData.id = oParam.people[0].id;
					sMethod = 'CONTACT_PERSON_MANAGE';
					oParam.currentObject = 'countPeople';
					delete(oParam.countPeople);
					oParam.removeGrowerStep = 12;
				}

				if (oData.id != undefined)
				{
					oData.remove = '1';
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI(sMethod),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								// Check if this was the last row for the object being removed and reset values if so
								if (oParam[oParam.currentObject] === undefined)
								{
									delete(oParam.rowIndex);
									delete(oParam.rows);
									delete(oParam.nextStep);
								}
								else
								{
									oParam.rowIndex += 1;
								}
								nsFreshcare.admin.grower['delete'].send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing records (' + sMethod + '):' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.rowIndex);
					delete(oParam.rows);
					delete(oParam.nextStep);
					if (oParam.countRelationships === undefined && oParam.countAttachments === undefined && oParam.countActions === undefined && oParam.countBusinessGroups === undefined
						&& oParam.countBusinessGroups === undefined && oParam.countSites == undefined && oParam.countPeople === undefined)
					{
						oParam.removeGrowerStep = 12;
					}
					nsFreshcare.admin.grower['delete'].send(oParam);
				}
			}

			// Now delete the business record
			else if (oParam.removeGrowerStep == 12)
			{
				var oRoot = ns1blankspace.rootnamespace;
				oData.remove = '1';
				oData.id = ns1blankspace.objectContext;
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.status.message(nsFreshcare.data.growerText + ' removed.');
							oRoot.admin.grower.init({showHome: true});
						}
						else
						{
							ns1blankspace.status.error('Error removing business:' + oResponse.error.errornotes);
						}
					}
				});

			}
		}
	},

	layout: 	function ()
	{
		var aHTML = [];
		var oContext = {inContext: !nsFreshcare.admin.grower.readOnly};		

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext == -1)
		{
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Details</td></tr>');
							
			aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
							'Address / Sites</td></tr>');
		
			aHTML.push('<tr><td id="ns1blankspaceControlNewMembership" class="ns1blankspaceControl">' +
							'Membership</td></tr>');
		}
		else
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Summary</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
							'Details</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlContacts" class="ns1blankspaceControl">' +
							'Contacts</td></tr>');
						
			aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
							'Address / Sites</td></tr>');
		
			if (nsFreshcare.user.role.toLowerCase() != 'jasanz')
			{
				aHTML.push('<tr><td id="ns1blankspaceControlGroups" class="ns1blankspaceControl">' +
								'Groups</td></tr>');
									
				aHTML.push('<tr><td id="ns1blankspaceControlRelationships" class="ns1blankspaceControl">' +
								'Relationships</td></tr>');
			}

			aHTML.push('</table>');		
		
			aHTML.push('<table class="ns1blankspaceControl">');
		
			aHTML.push('<tr><td id="ns1blankspaceControlEmails" class="ns1blankspaceControl">' +
							'Emails</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlActions" class="ns1blankspaceControl">' +
							'Actions</td></tr>');
						
			if (nsFreshcare.user.role.toLowerCase() != 'jasanz')
			{
				aHTML.push('<tr><td id="ns1blankspaceControlAttachments" class="ns1blankspaceControl">' +
								'Attachments</td></tr>');

				aHTML.push('</table>');		
			
				aHTML.push('<table class="ns1blankspaceControl">');
			
				//aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl">' +
				//				'Links</td></tr>');
							
				aHTML.push('<tr><td id="ns1blankspaceControlSystem" class="ns1blankspaceControl">' +
								'System</td></tr>');
			}			
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
		aHTML.push('<div id="ns1blankspaceMainRelationships" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainEmails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainActions" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAttachments" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainUser" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainSystem" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainNewMembership" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			nsFreshcare.admin.grower.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			// If change this, must change in validation section
			nsFreshcare.admin.grower.details();
		});
		
		$('#ns1blankspaceControlContacts').click(function(event)
		{
			// v3.2.001 SUP023329 Moved to People so can call back 
			nsFreshcare.admin.grower.people();
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: oContext});
			// if change this, must also change in validation section
			if (ns1blankspace.objectContext === -1)
			{
				nsFreshcare.admin.grower.address({twoLineAddress: true, suburbUpper: true, wizard: true});
			}
			else
			{
				nsFreshcare.external.grower.address.show({step: 1});
			}
		});
		
		$('#ns1blankspaceControlGroups').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainGroups', refresh: true, context: {inContext: false}});
			nsFreshcare.admin.grower.groups.show({contextGroup: 'Grower'});
		});
		
		$('#ns1blankspaceControlRelationships').click(function(event)
		{
			delete(ns1blankspace.objectContextData.relationships);
			ns1blankspace.show({selector: '#ns1blankspaceMainRelationships', refresh: true, context: {inContext: false}});
			nsFreshcare.internal.entity.relationships.show();
		});
		
		$('#ns1blankspaceControlEmails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainEmails', refresh: true});
			nsFreshcare.admin.grower.emails.configure();
		});

		$('#ns1blankspaceControlActions').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainActions', refresh: true});
			nsFreshcare.admin.grower.actions.configure();
		});
		
		$('#ns1blankspaceControlAttachments').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAttachments', refresh: true});
			nsFreshcare.admin.grower.attachments.search(
			   	{
				   	object: nsFreshcare.objectBusiness, 
					objectContext: ns1blankspace.objectContext, 
					otherObject: nsFreshcare.objectPerson,
					otherObjectContext: ns1blankspace.data.contactPerson
			   	});
		});	

		$('#ns1blankspaceControlSystem').click(function(event)
		{
			// History records, Modified dates, etc
			ns1blankspace.show({selector: '#ns1blankspaceMainSystem', refresh: true, context: {inContext: false}});
			nsFreshcare.util.system.search({xhtmlElementID: 'ns1blankspaceMainSystem', tablePrefix: 'contactbusiness'});
		});
		
		$('#ns1blankspaceControlNewMembership').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainNewMembership'});
			nsFreshcare.admin.grower.membership['new']();
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
			nsFreshcare.admin.grower.layout();
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find grower.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			// Set objectContextData & get Memberships
			if (iStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContext;
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactbusiness.tradename'];
				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['contactbusiness.contactperson.id'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['contactbusiness.contactperson.surname'];
				
				$('#ns1blankspaceViewControlNew').button({disabled: true});
				$('#ns1blankspaceViewControlAction').button({disabled: true});
				$('#ns1blankspaceViewControlActionOptions').button({disabled: true});
			
				oParam.step = 2;
				oParam.lastAudit = true;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.grower.show);
				nsFreshcare.external.grower.memberships.search(oParam);
			}

			// Get Site Addresses
			else if (iStep === 2) 
			{
				oParam.step = 3;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.grower.show);
				nsFreshcare.admin.grower.membership.layout(oParam);
				nsFreshcare.admin.grower.siteAddress.search(oParam);
			}

			// Get person groups 
			else if (iStep === 3) 
			{
				oParam.step = 4;
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.grower.show);
				nsFreshcare.person.groups.search(oParam);
			}

			// Get Relationships
			else if (iStep === 4) 
			{
				oParam.relationshipTypes = nsFreshcare.data.relationshipTrainer + ',' + nsFreshcare.data.relationshipAuditor;
				oParam.step = (nsFreshcare.user.role.toLowerCase() == 'jasanz' ? 5 : 10);
				oParam = ns1blankspace.util.setParam(oParam, "onComplete", nsFreshcare.admin.grower.show);
				nsFreshcare.internal.entity.relationships.search(oParam);
			}

			// Get CB user ds if jasanz role
			else if (iStep == 5)
			{
				ns1blankspace.objectContextData.auditorUsers = [];
				if (ns1blankspace.objectContextData.relationships.length > 0)
				{
					var oCertificationBodies = $.grep(ns1blankspace.objectContextData.relationships, 
													function(x) {return x.type === nsFreshcare.data.relationshipAuditor && x.othercontactbusiness === ns1blankspace.objectContext});
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_USER_SEARCH';
					oSearch.addField('username');
					oSearch.addFilter('contactbusiness', 'IN_LIST', $.map(oCertificationBodies, function(x) {return x.contactbusiness}).join(','));
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.objectContextData.auditorUsers = oResponse.data.rows;
							oParam.step = 10;
							nsFreshcare.admin.grower.show(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding CB users: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.step = 10;
					nsFreshcare.admin.grower.show(oParam);
				}
			}

			// Display
			else if (iStep === 10)
			{

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br /><span style="color:#A0A0A0;font-size:0.825em;">' + ns1blankspace.data.contactPersonText.formatXHTML() + '</span>');
				// v3.1.2 SUP022859 ReadOnly can't add or delete Growers
				if (nsFreshcare.admin.grower.readOnly == true)
				{
					ns1blankspace.app.context({all: true, inContext: false});
				}

				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.admin.grower.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.grower.summary()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this grower.</td></tr></table>');
					
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
							ns1blankspace.objectContextData['contactbusiness.legalname'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.data.contactPersonText +
						'</td></tr>');

			if (nsFreshcare.user.role.toLowerCase() === 'admin' && ns1blankspace.objectContextData['contactbusiness.contactperson.user.username'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">User Name</td></tr>' +
						'<tr><td class="ns1blankspaceSummary ns1blankspaceSummaryUser" id="ns1blankspaceSummaryUser-' + ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'] + '">' +
							ns1blankspace.objectContextData['contactbusiness.contactperson.user.username'] + 
							(ns1blankspace.objectContextData['contactbusiness.contactperson.user.disabled'] === 'Y' ? ' (Disabled)' : '') +
						'</td></tr>');

				// v3.1.2 SUP021103 Add initial password field to Summary page
				if (ns1blankspace.objectContextData['contactbusiness.contactperson.user.disabled'] != 'Y')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Initial Password</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.objectContextData['contactbusiness.contactperson.user.se' + nsFreshcare.data.userPasswordId] + 
							'</td></tr>');
				}
			}

			if (ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Phone</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Mobile</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'] +
							'</td></tr>');
			}				
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certificate Number</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) 
			{
				$.each(ns1blankspace.objectContextData.memberships, function() {

					if (this['agrisubscription.agricertificate.certificatenumber'] != "" ) {
						aHTML.push(this['agrisubscription.agricertificate.certificatenumber']);
						return false;		// We only want the first non-blank one as they're all the same
					}
				});
			}
			else {
				aHTML.push('No Certificate.');
			}
			aHTML.push('</td></tr>');


			// List Current Trainers
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainers</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.relationships && ns1blankspace.objectContextData.relationships.length > 0) 
			{
				var aValues = [];
				var oTrainers = $.grep(ns1blankspace.objectContextData.relationships, 
													function(x) {return x.type === nsFreshcare.data.relationshipTrainer && x.othercontactbusiness === ns1blankspace.objectContext});
				$.each(oTrainers, function() 
				{
					var dStart = (this['startdate'] != '') ? new Date(this['startdate']) : new Date(dToday.toString('dd MMM yyyy') + ' 00:00:00');
					var dEnd = (this['enddate'] != '') ? new Date(this['enddate']) : new Date(dToday.toString('dd MMM yyyy') + ' 23:59:59'); 
					if (dStart < dToday && dEnd > dToday)
					{	aValues.push( this['contactbusinesstext'] ); 	}
				});
				aHTML.push(aValues.join('<br />'));
			} 
			else 
			{
				aHTML.push('No Trainer assigned.')
			} 
			aHTML.push('</td></tr>');	
					

			// List Current Certification Bodies
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certification Bodies</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.relationships && ns1blankspace.objectContextData.relationships.length > 0) 
			{
				var aValues = [];
				var oCertificationBodies = $.grep(ns1blankspace.objectContextData.relationships, 
													function(x) {return x.type === nsFreshcare.data.relationshipAuditor && x.othercontactbusiness === ns1blankspace.objectContext});
				$.each(oCertificationBodies, function() 
				{
					var dStart = (this['startdate'] != '') ? new Date(this['startdate']) : new Date(dToday.toString('dd MMM yyyy') + ' 00:00:00');
					var dEnd = (this['enddate'] != '') ? new Date(this['enddate']) : new Date(dToday.toString('dd MMM yyyy') + ' 23:59:59'); 
					if (dStart < dToday && dEnd > dToday)
					{	aValues.push( this['contactbusinesstext'] ); 	}
				});
				aHTML.push(aValues.join('<br />'));
			} 
			else 
			{
				aHTML.push('No Certification Body assigned.')
			} 
			aHTML.push('</td></tr>');	
					
			// List Memberships
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Memberships</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">');
			if (ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length > 0) {
				aHTML.push('<table class="ns1blankspace">');

				aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Membership</td>' +
								'<td class="ns1blankspaceHeaderCaption">COP</td>' +
								'<td class="ns1blankspaceHeaderCaption">Status</td>' +
								'<td class="ns1blankspaceHeaderCaption">Last Audit</td>' +
								'<td class="ns1blankspaceHeaderCaption">Paid?</td>' +
								'<td class="ns1blankspaceHeaderCaption">Expires</td>' +
							'<tr>');
				
				$.each(ns1blankspace.objectContextData.memberships, function() {
					
					// Shade expired certificates
					// v3.1.2 SUP022574 Added Audit Paid column
					var dToday = new Date();
					var dExpiry = (this['agrisubscription.agricertificate.enddate'] != '') 
									? (new Date(this['agrisubscription.agricertificate.enddate'])) 
									: undefined;
					var bCertified = (dExpiry && dExpiry > dToday);

					aHTML.push('<tr><td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.membershiptext'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricodeofpractice.code'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.statustext'] + '</td>');
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.lastauditdate'] + '</td>');			
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">'  +
									(this['agrisubscription.agrilastaudit.paid'] == 'Y' ? 'Yes' : 'No') + '</td>');			
					aHTML.push('<td class="ns1blankspaceRow' + 
									((bCertified) ? '' : ' nsFreshcareNotCertified') + '">' + 
									this['agrisubscription.agricertificate.enddate'] + '</td>');			
					aHTML.push('</tr>');
				});
				aHTML.push('</table>');
			} 
			else {
				aHTML.push('No Memberships')
			} 
			aHTML.push('</td></tr>');	
					
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			// v3.1.2 SUP022859 Responds to ReadOnly flag
			if (!nsFreshcare.admin.grower.readOnly == true)
			{
				// Check if we have any withdrawn memberships
				// Only show Register Audit button if we have at least 1 not-WD membership
				var aWithdrawnMemberships = $.grep(ns1blankspace.objectContextData.memberships
						, function(x) {return x['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD});

				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2">');

				aHTML.push('<tr><td><span id="ns1blankspaceGrowerNewMembership" class="ns1blankspaceAction" style="width:150px;">' +
							'Add new Membership</span></td></tr>');

				if (ns1blankspace.objectContextData.memberships.length > 0 
					&& (aWithdrawnMemberships.length === 0
						|| (aWithdrawnMemberships.length > 0 && aWithdrawnMemberships.length < ns1blankspace.objectContextData.memberships.length))
					)
				{
					aHTML.push('<tr><td><span id="ns1blankspaceGrowerRegisterAudit" class="ns1blankspaceAction" style="width:150px;">' +
								'Register Audit</span></td></tr>');
				}

				aHTML.push('<tr><td>&nbsp;</td></tr>');

				// Allow admin users to create user
				if (nsFreshcare.user.role.toLowerCase() == 'admin' && ns1blankspace.objectContextData['contactbusiness.contactperson.user.username'] == '')
				{
					aHTML.push('<tr><td class="ns1blankspaceAction">' +
									'<span id="ns1blankspaceGrowerSumaryAddUser" style="width:150px;">Add User</span>' +
								'</td></tr>');
				}

				// Allow admin to re-enable user if disabled
				if (nsFreshcare.user.role.toLowerCase() == 'admin' && ns1blankspace.objectContextData['contactbusiness.contactperson.user.disabled'] == 'Y')
				{
					aHTML.push('<tr><td class="ns1blankspaceAction">' +
									'<span id="ns1blankspaceGrowerSumaryEnableUser" style="width:150px;">Enable User</span>' +
								'</td></tr>');
				}

				aHTML.push('</table>');					
			
				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

				
				$('#ns1blankspaceGrowerNewMembership')
					.button(
					{
						label: 'Add new Membership',
						icons: {primary: 'ui-icon-plus'}
					})
					.on("click", function()
					{
						var sMembershipControlHTML = '<tr><td>&nbsp;</td></tr>' + 
													'<tr><td id="ns1blankspaceControlNewMembership" class="ns1blankspaceControl ns1blankspaceMembership">' +
														'New Membership</td></tr>';
						if ($('#ns1blankspaceControlNewMembership').is('*'))
						{
							ns1blankspace.status.message('Please save the membership you\'ve added before adding another');
						}
						else
						{
							$('#ns1blankspaceControl').children().last().children().children().last().after(sMembershipControlHTML);
							$('#ns1blankspaceControlNewMembership').click(function(event)
							{
								ns1blankspace.show({selector: '#ns1blankspaceMainNewMembership'});
								nsFreshcare.admin.grower.membership['new']();
							});
						}
						
						$('td.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
						$('#ns1blankspaceControlNewMembership').addClass('ns1blankspaceHighlight');
						$('#ns1blankspaceControlNewMembership').click();
					});

				if (aWithdrawnMemberships.length === 0 
					|| (aWithdrawnMemberships.length > 0 && aWithdrawnMemberships.length < ns1blankspace.objectContextData.memberships.length))
				{

					$('#ns1blankspaceGrowerRegisterAudit').button(
					{
						label: 'Register Audit',
						icons:
						{
							primary: "ui-icon-clipboard"
						}
					})
					.click(function()
					{
						nsFreshcare.admin.audit.init(
						{
							contactBusiness: ns1blankspace.objectContext,
							contactPerson: ns1blankspace.data.contactPerson,
							contactBusinessText: ns1blankspace.data.contactBusinessText,
							contactPersonText: ns1blankspace.data.contactPersonText,
							"new": true
						});
					});
				}

				$('.ns1blankspaceSummaryUser')
					.on('click', function(event)
					{
						nsFreshcare.admin.user.init({id: this.id.split('-').pop(), showHome: false});
					})
					.css('cursor', 'pointer');

				$('#ns1blankspaceGrowerSumaryAddUser')
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
							prefix: ns1blankspace.objectContextData['contactbusiness.reference'],
							role: 'Grower',
							onComplete: nsFreshcare.admin.grower.search.send
						});

					});

				// v3.1.2 SUP022442 Now allows user to re-enable a grower if disabled
				$('#ns1blankspaceGrowerSumaryEnableUser')
					.button(
					{
						label: 'Enable User',
						icons: {primary: 'ui-icon-person'}
					})
					.on("click", function()
					{
						if (ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'] != '')
						{
							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
								data: 'disabled=N&id=' + ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'],
								success: function(oResponse)
								{
									if (oResponse.status == 'OK')
									{
										nsFreshcare.admin.grower.search.send({xhtmlElementID: '-' + ns1blankspace.objectContext, id: ns1blankspace.objectContext})
									}
									else {ns1blankspace.status.error('Error enabling user: ' + oResponse.error.errornotes)}
								}
							});
						}

					});		
			}	
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
							'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainDetails').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'Company ID' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsReference" class="ns1blankspaceText"' +
								' data-mandatory="2" data-caption="Company ID">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trading Name' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTradingName" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Trading Name">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Legal Name' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsLegalName" class="ns1blankspaceText"' +
								' data-caption="Legal Name">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'ABN' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsABN" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="ABN">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Position' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsPosition" class="ns1blankspaceText"' +
								' data-caption="Position">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Title' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTitle" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Title"' +
								' data-method="SETUP_CONTACT_TITLE_SEARCH">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Gender' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsGender" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Gender"' +
								' data-method="SETUP_CONTACT_PERSON_GENDER_SEARCH">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'First Name' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsFirstName" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="First Name">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Surname' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsSurname" class="ns1blankspaceText"' +
								' data-mandatory="1" data-caption="Surname">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Phone' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsPhone" class="ns1blankspaceText"' +
								' data-caption="Phone">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Mobile' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsMobile" class="ns1blankspaceText"' +
								' data-caption="Mobile">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Fax' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsFax" class="ns1blankspaceText"' +
								' data-caption="Fax">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Email' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsEmail" class="ns1blankspaceText"' +
								' data-caption="Email">' +
							'</td></tr>');			
				
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Join Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsJoinDate" class="ns1blankspaceDate"' +
									' data-mandatory="1" data-caption="Join Date">' +
							'</td></tr>');		

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Priority Membership' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsPriorityMembership" class="ns1blankspaceSelect"' +
									' data-method="AGRI_MEMBERSHIP_SEARCH"' +
									' data-methodFilter="code-TEXT_IS_LIKE|description-TEXT_IS_LIKE|status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive + '"' + 
									' data-mandatory="1" data-caption="Priority Membership"' +
							'></td></tr>');		

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Send Printed Certificates?' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input type="radio" id="radioSendPrintedCertificates1" name="radioSendPrintedCertificates" data-text="Yes" value="' + 
									$.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'Yes'}), function(y) {return y.id}).shift() +
										'"/>Yes' +
								'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioSendPrintedCertificates2" name="radioSendPrintedCertificates" data-text="No" value="' + 
									$.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'No'}), function(y) {return y.id}).shift() +
										'"/>No' +
							'</td></tr>');			
				
			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
			
			var aHTML = [];
				
			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Grower Notes' +
							'</td></tr>' +
							'<tr class="ns1blankspaceTextMulti">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsDescription" class="ns1blankspaceTextMulti"></textarea>' +
							'</td></tr>');
			
			aHTML.push('</table></td></tr>');

			if (ns1blankspace.objectContext === -1)
			{
				aHTML.push('<tr><td>&nbsp;</td></tr>' +
							'<tr><td class="ns1blankspaceAction" style="text-align:right;">' +
								'<span id="ns1blankspaceDetailsNext">Next</span>'+
							'</td></tr>');
			}

			aHTML.push('</table>' +
							'</td></tr>');

			aHTML.push('</table>');					
				
			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));

			if (ns1blankspace.objectContext === -1) {$('.ns1blankspaceHideOnNew').hide();}

			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

			// v3.1.2 SUP022569 Disable fields if readOnly
			if (nsFreshcare.admin.grower.readOnly == true)
			{
				$('#ns1blankspaceMainDetails input').attr('disabled', true).addClass('nsFreshcareDisabled');
				$('#ns1blankspaceMainDetails textarea').attr('disabled', true).addClass('nsFreshcareDisabled');
			}

			$('#ns1blankspaceDetailsNext')
				.button({label: 'Next'})
				.on('click', function()
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainAddress'});
					$('td.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlAddress').addClass('ns1blankspaceHighlight')
					nsFreshcare.admin.grower.address({suburbUpper: true, wizard: true});
				});

			// Mask the relevant fields
			$('#ns1blankspaceDetailsABN').mask('99 999 999 999', {placeholder: " "});
			$('#ns1blankspaceDetailsMobile').mask('9999 999 999', {placeholder: " "});
			$('#ns1blankspaceDetailsPhone').mask('99 9999 9999', {placeholder: " "});
			$('#ns1blankspaceDetailsFax').mask('99 9999 9999', {placeholder: " "});

			if (ns1blankspace.objectContextData != undefined)
			{
				$('#ns1blankspaceDetailsReference').val(ns1blankspace.objectContextData['contactbusiness.reference'].formatXHTML());
				$('#ns1blankspaceDetailsTradingName').val(ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML());
				$('#ns1blankspaceDetailsLegalName').val(ns1blankspace.objectContextData['contactbusiness.legalname'].formatXHTML());
				$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData['contactbusiness.abn'].formatXHTML());
				$('#ns1blankspaceDetailsPosition').val(ns1blankspace.objectContextData['contactbusiness.contactperson.position'].formatXHTML());
				$('#ns1blankspaceDetailsGender').attr('data-id', ns1blankspace.objectContextData['contactbusiness.contactperson.gender']);
				$('#ns1blankspaceDetailsGender').val(ns1blankspace.objectContextData['contactbusiness.contactperson.gendertext'].formatXHTML());
				$('#ns1blankspaceDetailsTitle').attr('data-id', ns1blankspace.objectContextData['contactbusiness.contactperson.title']);
				$('#ns1blankspaceDetailsTitle').val(ns1blankspace.objectContextData['contactbusiness.contactperson.titletext'].formatXHTML());
				$('#ns1blankspaceDetailsFirstName').val(ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'].formatXHTML());
				$('#ns1blankspaceDetailsSurname').val(ns1blankspace.objectContextData['contactbusiness.contactperson.surname'].formatXHTML());
				$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'].formatXHTML());
				$('#ns1blankspaceDetailsMobile').val(ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'].formatXHTML());
				$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData['contactbusiness.contactperson.fax'].formatXHTML());
				$('#ns1blankspaceDetailsEmail').val(ns1blankspace.objectContextData['contactbusiness.contactperson.email'].formatXHTML());
				$('#ns1blankspaceDetailsJoinDate').val(ns1blankspace.objectContextData['contactbusiness.agribusiness.joindate'].formatXHTML());
				$('#ns1blankspaceDetailsPriorityMembership').val(ns1blankspace.objectContextData['contactbusiness.agribusiness.prioritymembershiptext'].formatXHTML());
				$('#ns1blankspaceDetailsPriorityMembership').attr('data-id', ns1blankspace.objectContextData['contactbusiness.agribusiness.prioritymembership'].formatXHTML());
				$('#ns1blankspaceDetailsDescription').val(ns1blankspace.objectContextData['contactbusiness.notes'].formatXHTML());

				if (nsFreshcare.data.sendPrintedCertificatesOptions)
				{
					$('[name="radioSendPrintedCertificates"][value="' + ns1blankspace.objectContextData['contactbusiness.se' + nsFreshcare.data.sendPrintedCertificatesId] + '"]').attr('checked', true);

				}

				// Mask ABN
				if (ns1blankspace.objectContextData["contactbusiness.abn"].length > 0 && ns1blankspace.objectContextData["contactbusiness.abn"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData["contactbusiness.abn"].substr(0,2) + ' ' + 
															ns1blankspace.objectContextData["contactbusiness.abn"].substr(2,3) + ' ' + 
															ns1blankspace.objectContextData["contactbusiness.abn"].substr(5,3) + ' ' +
															ns1blankspace.objectContextData["contactbusiness.abn"].substr(8));
				}
				else 
				{
					$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML());
				}

				//Mask Mobile
				if (ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].length > 0 && ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsMobile').val(ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].substr(0,4) + ' ' +
															   ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].substr(4,3) + ' ' +
															   ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].substr(7));
				}
				else 
				{
					$('#ns1blankspaceDetailsMobile').val(ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].formatXHTML());
				}

				// Mask work phone
				if (ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].length > 0 && ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].substr(0,2) + ' ' + 
															  ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].substr(2,4) + ' ' +
															  ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].substr(6));
				}
				else 
				{
					$('#ns1blankspaceDetailsPhone').val(ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].formatXHTML());
				}

				// Mask Fax
				if (ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].length > 0 && ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].substr(0,2) + ' ' +
															ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].substr(2,4) + ' ' +
															ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].substr(6));
				}	
				else 
				{
					$('#ns1blankspaceDetailsFax').val(ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].formatXHTML());
				}
			}
			else
			{
				$('#ns1blankspaceDetailsJoinDate').val(dToday.toString('dd MMM yyyy'));

				$('#ns1blankspaceDetailsGender').val('[Unknown]');
				$('#ns1blankspaceDetailsGender').attr('data-id', '1');

				$('#ns1blankspaceDetailsTitle').val('[NA]');
				$('#ns1blankspaceDetailsTitle').attr('data-id', '6');

				$('[name="radioSendPrintedCertificates"][value="' + 
					$.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title === 'No'}).shift().id + 
					'"]').attr('checked', true);

			}
			
			// Bind the Categories area
			$('.nsFreshcareScope').click(function(event) 
			{
				$(this).toggleClass('nsFreshcareSelected');
			});
		}	
	},

	people: function()
	{
		ns1blankspace.show({selector: '#ns1blankspaceMainContacts', refresh: true, context: {inContext: false}});
		nsFreshcare.internal.entity.people.show(
			{
				pageObject: 'grower',
				showGoTo: !nsFreshcare.admin.grower.readOnly,
				showGroups: true,
				showUsers: !nsFreshcare.admin.grower.readOnly,
				showTrainingCourses: true,
				canAdd: !nsFreshcare.admin.grower.readOnly,
				canAddGroup: !nsFreshcare.admin.grower.readOnly,
				canRemove: !nsFreshcare.admin.grower.readOnly,
				canRemoveDirectly: !nsFreshcare.admin.grower.readOnly,
				canSetPrimary: !nsFreshcare.admin.grower.readOnly,
				canSetPrimaryDirectly: !nsFreshcare.admin.grower.readOnly,
				canUpdate: !nsFreshcare.admin.grower.readOnly,
				canUpdateDirectly: !nsFreshcare.admin.grower.readOnly,
				functionPostSave: nsFreshcare.admin.grower.people
			});
	},
	
	address: function (oParam)
	{
		// v1.0.24 Added data-suburbCase as a parameter
		var aHTML = [];
		var bTwoLineAddress = true;
		var bSuburbUpper = false;
		var bWizard = false;
		var oNS = ns1blankspace.rootnamespace;
		oNS = (ns1blankspace.objectParentName) ? oNS[ns1blankspace.objectParentName] : oNS;
		oNS = oNS[ns1blankspace.objectName];

		if (oParam)
		{
			if (oParam.twoLineAddress != undefined) {bTwoLineAddress = oParam.twoLineAddress}
			if (oParam.suburbUpper != undefined) {bSuburbUpper = oParam.suburbUpper}
			if (oParam.wizard != undefined) {bWizard = oParam.wizard}
		}

		if ($('#ns1blankspaceMainAddress').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainAddress').attr('data-loading', '');
				
			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceAddressColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceAddressColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' +
							'</table>');					
			
			$('#ns1blankspaceMainAddress').html(aHTML.join(''));
			
			var aHTML = [];
		

			aHTML.push('<table class="ns1blankspace">');
	
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Street' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetAddress1" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Street Address (Line 1)">' +
							'</td></tr>');
							
			if (bTwoLineAddress)
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceAddressStreetAddress2" class="ns1blankspaceText">' +
								'</td></tr>');
			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Suburb' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetSuburb" class="ns1blankspaceText ns1blankspaceSelectAddress"' +
							' data-suburbCase="' + ((bSuburbUpper) ? 'upper' : 'lower') + '"' +
										' data-mandatory="1" data-caption="Street Suburb">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'State' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetState" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Street State">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Post Code' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetPostCode" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Street Post Code">' +
							'</td></tr>');				
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Country' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressStreetCountry" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Street Country">' +
							'</td></tr>');						
			
			aHTML.push('<tr><td>&nbsp;</td></tr>' +
							'<tr><td id="ns1blankspaceAddressCopy" style="font-size:0.825em;">' +
							'</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceAddressColumn1').html(aHTML.join(''));

			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace">');
					
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Mailing' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingAddress1" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Mailing Address (Line 1)">' +
							'</td></tr>');
							
			if (bTwoLineAddress)
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceAddressMailingAddress2" class="ns1blankspaceText">' +
								'</td></tr>');
			}
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Suburb' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingSuburb" class="ns1blankspaceText ns1blankspaceSelectAddress"' +
							' data-suburbCase="' + ((bSuburbUpper) ? 'upper' : 'lower') + '"' +
										' data-mandatory="1" data-caption="Mailing Suburb">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'State' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingState" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Mailing State">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Post Code' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingPostCode" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Mailing Post Code">' +
							'</td></tr>');				
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Country' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceAddressMailingCountry" class="ns1blankspaceText"' +
										' data-mandatory="1" data-caption="Mailing Country">' +
							'</td></tr>');						
			
			if (ns1blankspace.objectContext === -1 && bWizard)
			{	
				aHTML.push('<tr><td>&nbsp;</td></tr>' +
								'<tr><td style="text-align:right;">' +
									'<span id="ns1blankspaceAddressBack" style="font-size:0.825em;">Back</span>&nbsp;&nbsp;' +
									'<span id="ns1blankspaceAddressNext" style="font-size:0.825em;">Next</span>' +
								'</td></tr>');
			}

			aHTML.push('</table>');					
			
			$('#ns1blankspaceAddressColumn2').html(aHTML.join(''));

			// v3.1.2 SUP022859 Disable fields if readOnly
			if (oNS.readOnly == true)
			{
				$('#ns1blankspaceMainAddress input').attr('disabled', true).addClass('nsFreshcareDisabled');
			}
			else
			{
				$('#ns1blankspaceAddressCopy').button({
					label: 'Copy to Mailing Address'
				})
				.click(function() {

					$('#ns1blankspaceAddressMailingAddress1').val($('#ns1blankspaceAddressStreetAddress1').val());
					$('#ns1blankspaceAddressMailingAddress2').val($('#ns1blankspaceAddressStreetAddress2').val());
					$('#ns1blankspaceAddressMailingSuburb').val($('#ns1blankspaceAddressStreetSuburb').val());
					$('#ns1blankspaceAddressMailingState').val($('#ns1blankspaceAddressStreetState').val());
					$('#ns1blankspaceAddressMailingPostCode').val($('#ns1blankspaceAddressStreetPostCode').val());
					$('#ns1blankspaceAddressMailingCountry').val($('#ns1blankspaceAddressStreetCountry').val());

				});
			}

			$('#ns1blankspaceAddressBack')
				.button({label: 'Back'})
				.on('click', function()
				{
					$('td.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlDetails').addClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlDetails').click();
				});
			
			$('#ns1blankspaceAddressNext')
				.button({label: 'Next'})
				.on('click', function()
				{
					$('td.ns1blankspaceControl').removeClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlNewMembership').addClass('ns1blankspaceHighlight');
					$('#ns1blankspaceControlNewMembership').click();
				});
			
			if (ns1blankspace.objectContextData != undefined)
			{
				$('#ns1blankspaceAddressStreetAddress1').val(ns1blankspace.objectContextData['contactbusiness.streetaddress1']);
				$('#ns1blankspaceAddressStreetSuburb').val(ns1blankspace.objectContextData['contactbusiness.streetsuburb']);
				$('#ns1blankspaceAddressStreetState').val(ns1blankspace.objectContextData['contactbusiness.streetstate']);
				$('#ns1blankspaceAddressStreetPostCode').val(ns1blankspace.objectContextData['contactbusiness.streetpostcode']);
				$('#ns1blankspaceAddressStreetCountry').val(ns1blankspace.objectContextData['contactbusiness.streetcountry']);
				$('#ns1blankspaceAddressMailingAddress1').val(ns1blankspace.objectContextData['contactbusiness.mailingaddress1']);
				$('#ns1blankspaceAddressMailingSuburb').val(ns1blankspace.objectContextData['contactbusiness.mailingsuburb']);
				$('#ns1blankspaceAddressMailingState').val(ns1blankspace.objectContextData['contactbusiness.mailingstate']);
				$('#ns1blankspaceAddressMailingPostCode').val(ns1blankspace.objectContextData['contactbusiness.mailingpostcode']);
				$('#ns1blankspaceAddressMailingCountry').val(ns1blankspace.objectContextData['contactbusiness.mailingcountry']);

				if (bTwoLineAddress) 
				{
					$('#ns1blankspaceAddressStreetAddress2').val(ns1blankspace.objectContextData['contactbusiness.streetaddress2']);
					$('#ns1blankspaceAddressMailingAddress2').val(ns1blankspace.objectContextData['contactbusiness.mailingaddress2']);
				}
			}
			
		}	
	},

	groups: 	
	{							
		show: function (oParam)
		{	
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMainGroups'}).value;
			var sLabel = ns1blankspace.util.getParam(oParam, 'label', {'default': "groups"}).value;
			var sContextGroup = ns1blankspace.util.getParam(oParam, 'contextGroup').value;
			var iOption = 1;
			var aHTML;
			var oGroups = nsFreshcare.admin.grower.data.groups;
			
			if (ns1blankspace.objectContextData.groupsBusiness === undefined || ns1blankspace.objectContextData.groupsPerson === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = oGroups[0].contactSearch.method;
				oSearch.addField(oGroups[0].contactSearch.fields);
				$.each(oGroups[0].contactSearch.filters, function()
				{
					oSearch.addFilter(this.name, this.comparison, ns1blankspace.objectContextData[this.value1]);
				});
				oSearch.rows = 100;
				oSearch.sort('grouptext', 'asc');
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK')
					{
						ns1blankspace.objectContextData.groupsBusiness = oResponse;

						var oSearch = new AdvancedSearch();
						oSearch.method = oGroups[1].contactSearch.method;
						oSearch.addField(oGroups[1].contactSearch.fields);
						$.each(oGroups[1].contactSearch.filters, function()
						{
							oSearch.addFilter(this.name, this.comparison, ns1blankspace.objectContextData[this.value1]);
						});
						oSearch.rows = 100;
						oSearch.sort('grouptext', 'asc');
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.objectContextData.groupsPerson = oResponse;
								nsFreshcare.admin.grower.groups.show(oParam);
							}
							else
							{
								ns1blankspace.status.error('Unable to find person groups: ' + oResponse.error.errornotes);
							}
						});
					}
					else
					{
						ns1blankspace.status.error('Unable to find business groups: ' + oResponse.error.errornotes);
					}
				});
					
			}
			else
			{
				aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceContactBusinessGroupsColumn1" class="ns1blankspaceColumn1Flexible" height="150px">' +
							ns1blankspace.xhtml.loading + '</td>' +
							'<td id="ns1blankspaceContactBusinessGroupsColumn2" style="width: 150px;" class="ns1blankspaceColumn2Action"></td>' +
							'</tr>' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceContactPersonGroupsColumn1" class="ns1blankspaceColumn1Flexible" height="150px"></td>' +
							'<td id="ns1blankspaceContactPersonGroupsColumn2" style="width: 150px;" class="ns1blankspaceColumn2Action"></td>' +
							'</tr>' +
							'</table>');				
				
				$('#ns1blankspaceMainGroups').html(aHTML.join(''));
				
				$.each(oGroups, function(i, t)
				{
					var aHTML = [];
					var sContext = t.context;
					
					aHTML.push('<table class="ns1blankspaceColumn2">');
					
					aHTML.push('<tr><td>' +
									'<span id="ns1blankspaceContact' + sContext + 'GroupsAdd"' +
										' class="ns1blankspaceAction" data-groupType="' + i + '">Add to group</span>' +
									'</td></tr>');		
					
					aHTML.push('<tr><td id="ns1blankspaceContact' + sContext + 'GroupsAddLoading">&nbsp;</td></tr>');											

					aHTML.push('</table>');					
					
					$('#ns1blankspaceContact' + sContext + 'GroupsColumn2').html(aHTML.join(''));
					
					$('#ns1blankspaceContact' + sContext + 'GroupsAdd').button(
					{
						label: "Add to group"
					})
					.click(function() 
					{
						ns1blankspace.container.position(
						{
							xhtmlElementID: 'ns1blankspaceContact' + sContext + 'GroupsAdd',
							leftOffset: -50,
							topOffset: -280
						});
						if (oParam === undefined) { var oParam = {}}
						
						oParam.sourceElementId = this.id;
						nsFreshcare.admin.grower.groups.add(oParam);
					});
				});

				$.each(oGroups, function(i, t)
				{
					var sContext = t.context;
					aHTML = [];


					if (ns1blankspace.objectContextData['groups' + sContext].data.rows.length == 0)
					{
						aHTML.push('<table>' +
										'<tr><td class="ns1blankspaceNothing">No ' + sContext + ' groups.</td></tr>' +
										'</table>');

						$('#ns1blankspaceContact' + sContext + 'GroupsColumn1').html(aHTML.join(''));		
					}
					else
					{
						aHTML.push('<table class="ns1blankspace">');

						aHTML.push('<tr class="ns1blankspace"><td class="ns1blankspaceHeaderCaption ns1blankspaceTableCaption" colspan="2">' +
											sContext + ' Groups</td></tr>');
						
						$.each(ns1blankspace.objectContextData['groups' + sContext].data.rows, function()
						{	
							if (this.grouptext != '')
							{
								aHTML.push('<tr class="ns1blankspaceRow">');
												
								aHTML.push('<td id="ns1blankspace' + sContext + 'Groups-title-' + this.id + '" class="ns1blankspaceRow">' +
														this.grouptext + '</td>');
								
								aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
												'<span id="ns1blankspace' + sContext + 'Groups_remove-' + this.id + '"' +
												' class="ns1blankspaceRow ns1blankspaceGroupsRemove"' +
												' data-context="' + sContext + '"' +
												' data-groupid="' + this.group + '">&nbsp;</span></td>');
			
								aHTML.push('</tr>');
							}					
						});
						
						aHTML.push('</table>');

						$('#ns1blankspaceContact' + sContext + 'GroupsColumn1').html(aHTML.join(''));
						
					}
				});	

				$('.ns1blankspaceGroupsRemove').button( {
					text: false,
					 icons: {
						 primary: "ui-icon-close"
					}
				})
				.click(function() 
				{
					var sContext = $(this).attr('data-context');
					var oParam = 
					{
						onComplete: ns1blankspace['contact' + sContext].groups.remove, 
						removeGroup: $(this).attr('data-groupid'),
						context: sContext,
						group: sContextGroup,
						xhtmlElementID: this.id
					};
					nsFreshcare.internal.entity.groups.remove.validate(oParam);
				})
				.css('width', '15px')
				.css('height', '20px')
			}	
		},	

		add: 		function (oParam, oResponse)
		{
			var sSourceElementId = 	ns1blankspace.util.getParam(oParam, 'sourceElementId', {"default": '0'}).value;
			var iGroupType = $('#' + sSourceElementId).attr('data-groupType');
			var oGroup = nsFreshcare.admin.grower.data.groups[iGroupType];
			var sContext = oGroup.context;

			if ($(ns1blankspace.xhtml.container).attr('data-initiator') == 'ns1blankspaceContact' + sContext + 'GroupsAdd')
			{
				$(ns1blankspace.xhtml.container).slideUp(500);
				$(ns1blankspace.xhtml.container).attr('data-initiator', '');
			}
			else
			{
				if (oResponse == undefined)
				{
					$('#ns1blankspaceContact' + sContext + 'GroupsAddLoading').html(ns1blankspace.xhtml.loadingSmall);

					var oSearch = new AdvancedSearch();
					oSearch.method = oGroup.groupSearch.method;
					oSearch.addField('title');
					if (oGroup.groupSearch.sort)
					{
						oSearch.sort(oGroup.groupSearch.sort.name, (oGroup.groupSearch.sort.direction) ? oGroup.groupSearch.sort.direction : 'asc');
					}
					oSearch.getResults(function(oResponse)
					{
						$('#ns1blankspaceContact' + sContext + 'GroupsAddLoading').html('');
						if (oResponse.status === 'OK')
						{
							nsFreshcare.admin.grower.groups.add(oParam, oResponse);
						}
						else
						{
							ns1blankspace.status.error('Error finding groups: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					ns1blankspace.container.position(
					{
						xhtmlElementID: 'ns1blankspaceContact' + sContext + 'GroupsAdd',
						topOffset: -50,
						leftOffset: -257
					});

					$(ns1blankspace.xhtml.container).attr('data-initiator', 'ns1blankspaceContact' + sContext + 'GroupsAdd')
					
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table class="ns1blankspaceSearchMedium">' + 
										'<tr><td class="ns1blankspaceNothing">No ' + sContext + ' groups.</td></tr>' + 
										'</table>');

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
					}
					else
					{
						aHTML.push('<table class="ns1blankspaceSearchMedium" style="font-size:0.875em;">');
						
						$.each(oResponse.data.rows, function()
						{	
							aHTML.push('<tr class="ns1blankspaceRow">' +
											'<td id="ns1blankspace' + sContext + 'GroupsAdd-title-' + this.id + '"' +
												' class="ns1blankspaceRowSelect ns1blankspaceGroupsAddRowSelect"' +
												' data-groupType="' + iGroupType + '">' +
													this.title + '</td>');
							
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						
						$('td.ns1blankspaceGroupsAddRowSelect').click(function(event)
						{
							nsFreshcare.admin.grower.groups.select(this.id);
						});
					}
				}
			}	
		},

		select: 	function (sXHTMLElementId)
		{

			var aSearch = sXHTMLElementId.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[2];
			var iGroupType = $('#' + sXHTMLElementId).attr('data-groupType');
			var oGroup = nsFreshcare.admin.grower.data.groups[iGroupType];
			var sContext = oGroup.context;
			
			$('#' + sXHTMLElementId).fadeOut(500);
			
			var sData = 'group=' + sSearchContext;
			$.each(oGroup.contactManage.fields, function()
			{
				sData += '&' + this.name + '=' + ns1blankspace.objectContextData[this.value];
				//sData += (sContext === 'Business') ? '&contactbusiness=' + ns1blankspace.objectContext : '&contactperson=' + ns1blankspace.objectContextData['contactbusiness.primarycontactperson'];
			});
						
			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI(oGroup.contactManage.method),
				data: sData,
				dataType: 'json',
				success: function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.showSpeedOptions);
						$(ns1blankspace.xhtml.container).html('');
						ns1blankspace.status.message(sContext + ' group added.');
						ns1blankspace.objectContextData.groupsBusiness = undefined;
						ns1blankspace.objectContextData.groupsPerson = undefined;
						nsFreshcare.admin.grower.groups.show();
					}
				}
			});
		}
	},				

	emails: 	
	{
		configure: function(oParam)
		{
			// v3.1.2 SUP022468 Added condition so that if a business, it also looks for all people's emails. 
			if (ns1blankspace.objectContextData.people == undefined)
			{
				nsFreshcare.internal.entity.people.search({onComplete: nsFreshcare.admin.grower.emails.configure});
			}
			else
			{
				if (oParam && oParam.response) 
				{
					ns1blankspace.objectContextData.people = oParam.response.data.rows;
					delete(oParam.response);
				}
				

				var oFilters = [];

				oFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: '5,9,10'});
				
				// v3.1.2 SUP022859 If JASANZ login, only show CB emails 
				if (nsFreshcare.user.role.toLowerCase() == 'jasanz')
				{
					if (ns1blankspace.objectContextData.auditorUsers == undefined) {ns1blankspace.objectContextData.auditorUsers = []}
					oFilters.push({operation: 'addFilter', name: 'actionby', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.auditorUsers, function(x) {return x.id}).join(',')});
				}

				oFilters.push({operation: 'addBracket', bracket: '('});

				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectBusiness});
				oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});
				
				oFilters.push({operation: 'addOperator', operator: 'or'});
				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});

				// v3.1.2 SUP022468 Added conditions so that it also looks for all people's emails. 
				oFilters.push({operation: 'addOperator', operator: 'or'});
				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'action.contactperson.contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});

				// Now do filter on objects linked to people but only if there are any linked people
				if (ns1blankspace.objectContextData.people && ns1blankspace.objectContextData.people.length > 0)
				{
					oFilters.push({operation: 'addOperator', operator: 'or'});
					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectPerson});
					oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.people, function(x) {return x.id}).join(',')});
					oFilters.push({operation: 'addBracket', bracket: ')'});

					oFilters.push({operation: 'addOperator', operator: 'or'});
					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'contactperson', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.people, function(x) {return x.id}).join(',')});
					oFilters.push({operation: 'addBracket', bracket: ')'});
				}

				oFilters.push({operation: 'addBracket', bracket: ')'});

				nsFreshcare.internal.entity.actions.show(
												{
													filters: oFilters,
												 	emailsOnly: true,
												 	viewInTab: true,
												 	/*actions: {add: true},*/
												 	xhtmlElementID: 'ns1blankspaceMainEmails',
												 	functionRow: nsFreshcare.internal.entity.emails.row,
												 	functionBind: nsFreshcare.internal.entity.emails.bind,
												 	functionProcess: nsFreshcare.internal.entity.actions.process,
												 	functionPostSave: nsFreshcare.admin.grower.emails.configure
												});
			}
		},

		detail: 
		{
			search: function(oParam)
			{
				var iActionId;

				if (oParam)
				{
					if (oParam.xhtmlElementID) {iActionId = oParam.xhtmlElementID.split('-').pop()}
					if (oParam.emailDetailStep === undefined) {oParam.emailDetailStep = 1}
				}

				// Find recipients
				if (oParam.emailDetailStep === 1)
				{
					ns1blankspace.status.working('Retrieving email detail..');
					var oSearch = new AdvancedSearch();
					oSearch.method = 'ACTION_EMAIL_RECIPIENT_SEARCH';
					oSearch.addField('type,name,email');
					oSearch.addFilter('action', 'EQUAL_TO', iActionId);
					oSearch.rows = 40;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.recipients = oResponse.data.rows;
							oParam.emailDetailStep = 2;
							nsFreshcare.admin.grower.emails.detail.search(oParam);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					});
				}

				// Find attachments
				else if (oParam.emailDetailStep === 2)
				{
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_ATTACHMENT_SEARCH';
					oSearch.addField('link,attachment,filename');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectAction);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', iActionId);
					oSearch.rows = 40;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.attachments = oResponse.data.rows;
							oParam.emailDetailStep = 3;
							nsFreshcare.admin.grower.emails.detail.search(oParam);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					});

				}

				else if (oParam.emailDetailStep === 3)
				{
					ns1blankspace.status.clear();
					if (oParam.message === undefined) {oParam.message = ''}
					delete(oParam.emailDetailStep);
					nsFreshcare.admin.grower.emails.detail.show(oParam);
				}

			},

			show: function(oParam)
			{
				
				var aHTML = [];
				var iActionId;

				if (oParam)
				{
					if (oParam.xhtmlElementID) {iActionId = oParam.xhtmlElementID.split('-').pop()}
					if (oParam.emailDetailStep === undefined) {oParam.emailDetailStep = 1}
				}

				if (oParam.message === undefined)
				{
					oParam.message = $('#ns1blankspaceAction_Message-' + iActionId).html();
					// v3.0.1a SUP021899 if undefined, this efrrors
					if (oParam.message) {oParam.message = oParam.message.formatXHTML()}
					oParam.date = $('#ns1blankspaceActionRow_Message-' + iActionId).attr('data-dateTime') ;

					if ($('#ns1blankspaceActionRow_Message-' + iActionId).attr('data-fullMessage') != 'true')
					{
						$('#ns1blankspaceAction_Message-' + iActionId).html(ns1blankspace.xhtml.loading);
						nsFreshcare.admin.grower.emails.detail.search(oParam);	
					}
					else
					{
						nsFreshcare.admin.grower.emails.detail.show(oParam);
					}
				}

				else if ($('#ns1blankspaceActionRow_Message-' + iActionId).attr('data-fullMessage') != 'true')
				{
					var aFrom = $.grep(oParam.recipients, function(x) {return x.type === '1'});
					var aTo = $.grep(oParam.recipients, function(x) {return x.type === '2'});
					var aCC = $.grep(oParam.recipients, function(x) {return x.type === '3'});
					var aBCC = $.grep(oParam.recipients, function(x) {return x.type === '4'});
					var aAttachments = (oParam.attachments) ? oParam.attachments : [];
					var sMessage = oParam.message;
					
					aHTML.push('<table id="ns1blankspaceMessagingEmailContainer" class="ns1blankspace">');
					/*
					aHTML.push('<tr class="ns1blankspaceHeader">' +
									'<td id="ns1blankspaceMessagingEmailSubject" colspan=2 class="ns1blankspaceHeaderCaption" style="text-align:left; font-weight:bold; color:#000000;">' +
									ns1blankspace.objectContextData.subject + '</td>');
					
					aHTML.push('</tr>');
					*/

					var sFrom = '';
					if (aFrom.length > 0) 
					{
						sFrom += aFrom[0].name;
						sFrom += (aFrom[0].name != aFrom[0].email) ? ' (' + aFrom[0].email + ')' : '';
					}

					aHTML.push('<tr class="ns1blankspaceHeader">' +
									'<td id="ns1blankspaceMessagingEmailFromEmail" style="padding-bottom:10px;font-size:0.875em;">' +
									sFrom + '</td>');
					
					if (oParam.date)
					{
						var oDate = Date.parse(oParam.date);

						var sDate = '';

						if (oDate != null)
						{
							sDate = oDate.toString("ddd, dd MMM yyyy h:mm tt");
						}	

						aHTML.push('<td id="ns1blankspaceMessagingEmailDate" class="ns1blankspaceSub" style="text-align:right; width:175px; padding-bottom:10px; font-size:0.875em;">' +
										sDate + '</td>');
					}

					aHTML.push('</tr>');
					
					aHTML.push('</table>');
					
					
					if (aTo.length > 0)
					{
						aHTML.push('<table id="ns1blankspaceMessagingEmailToContainer" class="ns1blankspaceHeader" style="border-style: solid; border-width: 1px 0px 1px 0px ;border-color: #f3f3f3;">');
						aHTML.push('<tr class="ns1blankspaceHeader">' +
										'<td id="ns1blankspaceMessagingEmailToCaption" style="text-align:center; width:20px;background-color:#CCCCCC; color:#FFFFFF; padding:4px;">To</td>' +
										'<td id="ns1blankspaceMessagingEmailTo" style="padding:4px;" class="ns1blankspaceSub">');
										
						var sTo = $.map(aTo, function(x) {return x.email.formatXHTML()}).join(';');
						aHTML.push(sTo);

						aHTML.push('</td></tr>');
						aHTML.push('</table>');
					}
					
					if (aCC.length > 0)
					{
						aHTML.push('<table id="ns1blankspaceMessagingEmailCCContainer" class="ns1blankspaceHeader" style="border-style: solid; border-width: 1px 0px 1px 0px ;border-color: #f3f3f3;">');
						aHTML.push('<tr class="ns1blankspaceHeader">' +
										'<td id="ns1blankspaceMessagingEmailCCCaption" style="text-align:center; width:20px;background-color:#CCCCCC; color:#FFFFFF; padding:4px;">Cc</td>' +
										'<td id="ns1blankspaceMessagingEmailCC" style="padding:4px;" class="ns1blankspaceSub">');
										
						var sCC = $.map(aCC, function(x) {return x.email.formatXHTML()}).join(';');
						aHTML.push(sCC);

						aHTML.push('</td></tr>');
						aHTML.push('</table>');
					}
						
					// v3.1.1i SUP022547 Wasn't showing BCC
					if (aBCC.length > 0)
					{
						aHTML.push('<table id="ns1blankspaceMessagingEmailBCCContainer" class="ns1blankspaceHeader" style="border-style: solid; border-width: 1px 0px 1px 0px ;border-color: #f3f3f3;">');
						aHTML.push('<tr class="ns1blankspaceHeader">' +
										'<td id="ns1blankspaceMessagingEmailBCCCaption" style="text-align:center; width:20px;background-color:#CCCCCC; color:#FFFFFF; padding:4px;">BCC</td>' +
										'<td id="ns1blankspaceMessagingEmailBCC" style="padding:4px;" class="ns1blankspaceSub">');
										
						var sBCC = $.map(aBCC, function(x) {return x.email.formatXHTML()}).join(';');
						aHTML.push(sBCC);

						aHTML.push('</td></tr>');
						aHTML.push('</table>');
					}
						
					if (aAttachments.length > 0)
					{
						aHTML.push('<table id="ns1blankspaceMessagingEmailAttachmentsContainer" class="ns1blankspaceHeader" style="margin-bottom:13px;border-style: solid;border-width:0px 0px 1px 0px;border-color: #f3f3f3;">');
						aHTML.push('<tr class="ns1blankspaceHeader">' +
												'<td style="width:20px; background-color:#ffffff;padding:4px;">&nbsp;</td>' +
												'<td id="ns1blankspaceMessagingEmailAttachments" style="padding:4px; font-size: 0.875em;">');

						var sAttachments = $.map(aAttachments, function(x) 
												{
													var sText = '<a target="_blank" href="' + x.link + '">' + x.filename.formatXHTML() + '</a>';
													return sText;
												})
											.join(';');
						aHTML.push(sAttachments);

						aHTML.push('</td></tr>');
						aHTML.push('</table>');
						
					}
					
					// v2.0.4 SUP021483 Remove HTML headers and footers from email
					sMessage = oParam.message.split('<body>').pop();
					sMessage = sMessage.split('</body').shift();
					aHTML.push(oParam.message);
									
					$('#ns1blankspaceAction_Message-' + iActionId).html(aHTML.join(''));
					
					$('#ns1blankspaceActionRow_Message-' + iActionId).attr('data-fullMessage', 'true');
					
					nsFreshcare.admin.grower.emails.detail.show(oParam);
				}

				else
				{
					if ($('#ns1blankspaceActionRow_Message-' + iActionId).is(':visible'))
					{
						$('#ns1blankspaceActionRow_Message-' + iActionId).hide();
					}
					else
					{
						$('#ns1blankspaceActionRow_Message-' + iActionId).show();
					}
				}

			}
		}
	},

	actions:
	{
		configure: function(oParam)
		{
			// v3.1.2 SUP022468 Only required when viewing a business record
			if (ns1blankspace.objectMethod == 'CONTACT_BUSINESS' && ns1blankspace.objectContextData.people == undefined)
			{
				nsFreshcare.internal.entity.people.search({onComplete: nsFreshcare.admin.grower.actions.configure});
			}
			else
			{
				if (oParam && oParam.response) 
				{
					ns1blankspace.objectContextData.people = oParam.response.data.rows;
					delete(oParam.response);
				}

				// We want to exclude emails & SMS as they're already on the Emails tab
				var iActionTypes = $.map($.grep(nsFreshcare.data.actionTypes, function(x)
											{
												return x.id != '5' && x.id != '9' && x.id != '10';
											}),
											function(y) {return y.id}).join(',');

				// v3.1.0c SUP022215 Actiontypes don't show email types
				var aSearchFilters = [
										{name: 'Type', title: 'Type', selectMethod: 'SETUP_ACTION_TYPE_SEARCH', methodFilter: 'title-TEXT_IS_LIKE|id-NOT_IN_LIST-5,9,10', field: 'actiontype'},
										{name: 'ActionBy', title: 'Action By', selectMethod: 'SETUP_USER_SEARCH', columns: 'username-space-contactpersontext', methodFilter: 'username-TEXT_IS_LIKE|contactpersontext-TEXT_IS_LIKE', field: 'actionby'},
										{name: 'Description', title: 'Description', field: 'description', comparison: 'TEXT_IS_LIKE'}
									 ];

				// v3.1.2 SUP022468 Added conditions so that it also looks for all people's actions. 
				var oFilters = [];
				oFilters.push({operation: 'addFilter', name: 'actiontype', comparison: 'IN_LIST', value1: iActionTypes});
				
				// v3.1.2 SUP022859 Only show CB emails if jasanz login
				if (nsFreshcare.user.role.toLowerCase() == 'jasanz')
				{
					if (ns1blankspace.objectContextData.auditorUsers == undefined) {ns1blankspace.objectContextData.auditorUsers = []}
					oFilters.push({operation: 'addFilter', name: 'actionby', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.auditorUsers, function(x) {return x.id}).join(',')});
				}

				oFilters.push({operation: 'addBracket', bracket: '('});

				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectBusiness});
				oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});
				
				oFilters.push({operation: 'addOperator', operator: 'or'});
				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});

				oFilters.push({operation: 'addOperator', operator: 'or'});
				oFilters.push({operation: 'addBracket', bracket: '('});
				oFilters.push({operation: 'addFilter', name: 'action.contactperson.contactbusiness', comparison: 'EQUAL_TO', value1: ns1blankspace.objectContext});
				oFilters.push({operation: 'addBracket', bracket: ')'});

				// Now do filter on objects linked to people but only if there are any linked people
				if (ns1blankspace.objectContextData.people && ns1blankspace.objectContextData.people.length > 0)
				{
					oFilters.push({operation: 'addOperator', operator: 'or'});
					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'object', comparison: 'EQUAL_TO', value1: nsFreshcare.objectPerson});
					oFilters.push({operation: 'addFilter', name: 'objectcontext', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.people, function(x) {return x.id}).join(',')});
					oFilters.push({operation: 'addBracket', bracket: ')'});

					oFilters.push({operation: 'addOperator', operator: 'or'});
					oFilters.push({operation: 'addBracket', bracket: '('});
					oFilters.push({operation: 'addFilter', name: 'contactperson', comparison: 'IN_LIST', value1: $.map(ns1blankspace.objectContextData.people, function(x) {return x.id}).join(',')});
					oFilters.push({operation: 'addBracket', bracket: ')'});
				}
				oFilters.push({operation: 'addBracket', bracket: ')'});
				
				// v3.1.0e Added functionBind as was not showing add button
				// v3.1.1f xhtmlElementID now set to MainActions
				nsFreshcare.internal.entity.actions.show
									({
										xhtmlElementID: 'ns1blankspaceMainActions',
										contactBusiness: ns1blankspace.objectContext, 
										contactBusinessText: ns1blankspace.data.contactBusinessText,
										object: '',
										objectContext: "",
										/*type: iActionTypes,*/
										searchFilters: aSearchFilters,
										filters: oFilters,
										actions: {add: true},
										functionProcess: nsFreshcare.internal.entity.actions.process,
										functionBind: nsFreshcare.internal.entity.actions.bind,
										functionPostSave: nsFreshcare.admin.grower.actions.configure
									});
			}
		}
	},

	attachments: 
	{
		search: function(oParam)
		{
			var sXHTMLElementID = 'ns1blankspaceMainAttachments';
			var iObject = ns1blankspace.object;
			var iObjectContext = ns1blankspace.objectContext;
			var bShowAdd = true;
			var iAttachmentType;
			var oActions = {add: true};
			var sHelpNotes;
			var oContext = {inContext: false};
			var aAttachmentTypes = ns1blankspace.util.getParam(oParam, 'attachmentTypes').value;
			var aRenderColumns = ns1blankspace.util.getParam(oParam, 'renderColumns').value;
			var sColumns = ns1blankspace.util.getParam(oParam, 'columns').value;
			
			if (oParam != undefined)
			{
				if (oParam.object != undefined) {iObject = oParam.object}
				if (oParam.objectContext != undefined) {iObjectContext = oParam.objectContext}
				if (oParam.objectName != undefined) {sObjectName = oParam.objectName}
				if (oParam.showAdd != undefined) {oParam.actions = $.extend(true, oActions, {add: oParam.showAdd})}
				if (oParam.add != undefined) {oParam.actions = $.extend(true, oActions, {add: oParam.add})}
				if (oParam.attachmentType != undefined ) {iAttachmentType = oParam.attachmentType}
				if (oParam.xhtmlElementID != undefined ) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.actions != undefined) {oActions = oParam.actions}
				if (oParam.helpNotes != undefined) {sHelpNotes = oParam.helpNotes}
				if (oParam.context != undefined) {oContext = oParam.context}
				if (oParam.actions === undefined) {oParam.actions = oActions}
			}
			
			if (oParam.xhtmlElementID === undefined) {oParam.xhtmlElementID = sXHTMLElementID}

			// SUP021820 v3.0.1 updated so that new param renderColumsn is passed instead of columns
			if (sColumns == undefined)
			{
				if (aRenderColumns === undefined)
				{
					aRenderColumns = 
					[
						{name: 'filename', caption: 'File Name'},
						{name: 'modifieddate', caption: 'Date'},
						{name: 'createdusertext', caption: 'Who'},
						{name: 'typetext', caption: 'Type'}
					];
				}
				oParam.renderColumns = aRenderColumns;
				sColumns = $.map(aRenderColumns, function(x) {return x.name}).join('-');
				oParam.columns = sColumns;
			}
			else
			{
				aRenderColumns = $.map(sColumns.split('-'), function(x) {return {name: x, caption: x}});
				oParam.renderColumns = aRenderColumns;
			}


			if (oActions.add)
			{
				if (ns1blankspace.app.context) {ns1blankspace.app.context(oContext)};

				var aHTML = [];
							
				aHTML.push('<table>' +
							'<tr>' +
							'<td id="ns1blankspaceAttachmentsColumn1" class="ns1blankspaceColumn1Flexible">' +
							ns1blankspace.xhtml.loading + '</td>' +
							'<td id="ns1blankspaceAttachmentsColumn2" class="ns1blankspaceColumn2" style="width:100px;"></td></tr>' +
							'</table>');					
					
				$('#' + sXHTMLElementID).html(aHTML.join(''));
				
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceColumn2">');
				
				aHTML.push('<tr><td class="ns1blankspaceAction">' +
								'<span id="ns1blankspaceAttachmentsAdd">Add</span>' +
								'</td></tr>');
					
				if (sHelpNotes != undefined)
				{
					aHTML.push('<tr><td class="ns1blankspaceAction">' +
								'<hr />' +
								'</td></tr>');
								
					aHTML.push('<tr><td id="ns1blankspaceAttachmentsAddHelpNotes" class="ns1blankspaceAction" style="font-size:0.75em;color:#404040;">' +
								sHelpNotes +
								'</td></tr>');
				}
				
				aHTML.push('</table>');					
				
				$('#ns1blankspaceAttachmentsColumn2').html(aHTML.join(''));
			
				$('#ns1blankspaceAttachmentsAdd').button(
				{
					label: "Add"
				})
				.click(function() 
				{
					 ns1blankspace.attachments.add(oParam);
				});
			
				oParam.xhtmlElementID = 'ns1blankspaceAttachmentsColumn1';
			}
			
			if (iObjectContext != -1)
			{	
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_ATTACHMENT_SEARCH';
				oSearch.addField('type,typetext,filename,description,download,modifieddate,createddate,attachment,createduser,createdusertext');
				oSearch.addBracket('(');
				oSearch.addFilter('object', 'EQUAL_TO', iObject);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);

				if (oParam.otherObject && oParam.otherObject != '' && oParam.otherObjectContext && oParam.otherObjectContext != '')
				{
					oSearch.addOperator('or');
					oSearch.addFilter('object', 'EQUAL_TO', oParam.otherObject);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', oParam.otherObjectContext);
				}
				oSearch.addBracket(')');
				
				if (iAttachmentType != undefined)
				{
					oSearch.addFilter('type', 'IN_LIST', iAttachmentType);
				}
				
				oSearch.rows = ns1blankspace.option.defaultRows;
				oSearch.sort('createddate', 'desc');
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === 'OK')
					{
						nsFreshcare.admin.grower.attachments.show(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}
		},

		show: function(oParam, oResponse)
		{	
			var aHTML = [];
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;
			var aColumns = ns1blankspace.util.getParam(oParam, 'renderColumns').value;
			ns1blankspace.data.attachmentTypes = oParam.attachmentTypes;

			if (oResponse.data.rows.length === 0)
			{
				aHTML.push('<table style="margin-top:5px;">');
				aHTML.push('<tr class="ns1blankspaceAttachments">');
				aHTML.push('<td class="ns1blankspaceNothing">No attachments.</td>');
				aHTML.push('</tr>');
				aHTML.push('</table>');
				
				$('#' + sXHTMLElementID).html(aHTML.join(''));
				$('#' + sXHTMLElementID).show(ns1blankspace.option.showSpeed);
			}
			else
			{
				aHTML.push('<table id="ns1blankspaceAttachments">');
			
				aHTML.push('<tr class="ns1blankspaceCaption">');
				$.each(aColumns, function()
				{
					aHTML.push('<td class="ns1blankspaceHeaderCaption" data-columnname="' + this.name + '">' + this.caption + '</td>');
				});
				aHTML.push('<td class="ns1blankspaceHeaderCaption">&nbsp;</td>');
				aHTML.push('</tr>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push(nsFreshcare.admin.grower.attachments.row(this, oParam));
				});
		    	
				aHTML.push('</table>');

				$.extend(true, oParam,
				{
					xhtmlElementID: sXHTMLElementID,
					xhtmlContext: 'Attachment',
					xhtml: aHTML.join(''),
					showMore: (oResponse.morerows === "true"),
					columns: oParam.columns,
					more: oResponse.moreid,
					rows: ns1blankspace.option.defaultRows,
					functionSearch: nsFreshcare.admin.grower.attachments.search,
					functionShowRow: nsFreshcare.admin.grower.attachments.row,
					functionOnNewPage: nsFreshcare.admin.grower.attachments.bind,
					type: 'json',
					canRemoveAll: oParam.canRemoveAll,
					canSetTypeAll: oParam.canSetTypeAll,
					canRemoveOwn: oParam.canRemoveOwn,
					canSetTypeOwn: oParam.canSetTypeOwn
				}); 	
				ns1blankspace.render.page.show(oParam);
					
				//nsFreshcare.admin.grower.attachments.bind();
			}
		},
		
		row: function(oRow, oParam)
		{
			var bCanAdd = ns1blankspace.util.getParam(oParam.actions, 'add', {'default': true}).value;
			var bCanRemoveAll = ns1blankspace.util.getParam(oParam, 'canRemoveAll', {'default': bCanAdd}).value;	// Whether user can remove other user's attachments
			var bCanSetTypeAll = ns1blankspace.util.getParam(oParam, 'canSetTypeAll', {'default': bCanAdd}).value;	// Whether user can set type on other user's attachments
			var bCanRemoveOwn = ns1blankspace.util.getParam(oParam, 'canRemoveOwn', {'default': bCanAdd}).value;	// Whether user can remove own attachments
			var bCanSetTypeOwn = ns1blankspace.util.getParam(oParam, 'canSetTypeOwn', {'default': bCanAdd}).value;	// Whether user can set type on own attachments
			var aColumns = ns1blankspace.util.getParam(oParam, 'renderColumns').value;
			var aHTML = [];

			aHTML.push('<tr class="ns1blankspaceAttachments">');
			
			$.each(aColumns, function()
			{	// v1.0.1a SUP021910 Added ns1blankspaceNoUnloadWarn class
				aHTML.push('<td id="ns1blankspaceAttachment_' + this.name + '-' + oRow.id + '" class="ns1blankspaceRow ns1blankspaceNoUnloadWarn">' + 
							((this.name === 'filename') ? '<a href="' + oRow.download + '">' + oRow.filename + '</a>' : oRow[this.name]) + 
							'</td>');
			});
			
			aHTML.push('<td style="width:55px;text-align:right;" class="ns1blankspaceRow">');

			if (bCanRemoveAll 
				|| (bCanRemoveOwn && oRow.createduser === ns1blankspace.user.id))
			{
				aHTML.push('<span id="ns1blankspaceAttachment_options_remove-' + oRow.attachment + '" class="ns1blankspaceAttachmentsRemove">&nbsp;</span>');
			}

			if (bCanSetTypeAll 
				|| (bCanSetTypeOwn && oRow.createduser === ns1blankspace.user.id))
			{
				aHTML.push('<span id="ns1blankspaceAttachment_options_attachmenttype-' + oRow.attachment + '" data-id="' + oRow.id + '" class="ns1blankspaceAttachmentsType">&nbsp;</span>');
			}
							
			aHTML.push('</td>');
			
			aHTML.push('</tr>');
			
			return aHTML.join('');
		},

		bind: function(oParam)
		{
			$('span.ns1blankspaceAttachmentsRemove:not(".ui-button")').button(
			{
				text: false,
				label: 'Remove',
				icons: {primary: "ui-icon-close"}
			})
			.click(function()
			{
				ns1blankspace.remove(
				{
					xhtmlElementID: this.id,
					method: 'CORE_ATTACHMENT_MANAGE',
					parentLevel: 2,
					ifNoneMessage: 'No attachments.'
				});
			})
			.css('width', '15px')
			.css('height', '20px');	

			if (ns1blankspace.data.attachmentTypes && ns1blankspace.data.attachmentTypes.length > 0)
			{
				$('span.ns1blankspaceAttachmentsType:not(".ui-button")').button(
				{
					text: false,
					label: 'Set Attachment Type',
					icons: {primary: "ui-icon-grip-solid-horizontal"}
				})
				.on('click', function()
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

						var iRowID = this.id.split('-').pop();			//$(this).attr("data-id");
						
						var aHTML = [];

						aHTML.push('<table class="ns1blankspaceSearchMedium" style="width:100px;">');

						$.each(ns1blankspace.data.attachmentTypes, function()
						{
							aHTML.push('<tr><td><span id="ns1blankspaceAttachmentType_' + this.type + '"' +
										' class="ns1blankspaceSetAttachmentType ns1blankspaceRow" data-attachmentid="' + iRowID + '"' +
										' data-parentid="' + ns1blankspace.xhtml.divID + '">' +
										this.typetext + '</span></td></tr>')
						});

						aHTML.push('</table>');

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show();
						$(ns1blankspace.xhtml.container).offset(
						{ 
							top: $('#' + ns1blankspace.xhtml.divID).offset().top,
							left: $('#' + ns1blankspace.xhtml.divID).offset().left + $('#' + ns1blankspace.xhtml.divID).width()
						});

						$('.ns1blankspaceSetAttachmentType')
							.css('cursor', 'pointer')
							.click(function(event) 
							{
								var sID = $(this).attr('data-attachmentid');
								var sAttachmentType = this.id.split('_').pop();
								var oParentElement = $(this).attr('data-parentid');
								$(ns1blankspace.xhtml.container).html('');
								$(ns1blankspace.xhtml.container).hide();
								
								if (sID != '' && sID != undefined)
								{
									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('CORE_ATTACHMENT_MANAGE'),
										data: 'type=' + sAttachmentType + '&id=' + sID,
										success: function(oResponse)
										{
											if (oResponse.status === 'OK')
											{
												oParam.onComplete = (oParam.functionPostUpdate) ? oParam.functionPostUpdate : oParam.onComplete;
												if (oParam.onComplete)
												{
													ns1blankspace.util.onComplete(oParam);
												}
												//$($('#' + oParentElement).parent().parent()).remove();
											}
											else
											{
												ns1blankspace.status.error('Error setting attachment type: ' + oResponse.error.errornotes);
											}
										}
									});
								}
								
							});
					}
				})
				.css('width', '15px')
				.css('height', '20px');
			}
		},

		manageType: function()
		{

		}
	},

	save: 		
	{
		validate: function(oParam)
		{
			var oRoot = ns1blankspace.rootnamespace;
			var sXHTMLTabElementID = ns1blankspace.util.getParam(oParam, 'xhtmlTabElementID', {'default': 'ns1blankspaceMainDetails'}).value;
			var fFunctionInvalidData = ns1blankspace.util.getParam(oParam, 'functionInvalidData').value;
			if (oParam === undefined) {oParam = {validateGrowerStep: 0}; ns1blankspace.okToSave = true;}
			else 
			{
				if (oParam.validateGrowerStep === undefined) 
				{
					oParam.validateGrowerStep = 0;
					if (oParam.onComplete) {oParam.functionSave = oParam.onComplete}
					ns1blankspace.okToSave = true;
				}
			}

			// v3.1.0 Added section 0 to populate Details, Address and all Membership tabs so we can cross-validate
			if (oParam.validateGrowerStep === 0)
			{
				ns1blankspace.status.working("Validating data..")
				if ($('#ns1blankspaceMainDetails').html() === '')
				{
					$('#ns1blankspaceMainDetails').attr('data-loading', '1');
					oRoot.admin.grower.details();
					$('#ns1blankspaceMainDetails').hide();
				}

				if ($('#ns1blankspaceMainAddress').html() === '')
				{
					$('#ns1blankspaceMainAddress').attr('data-loading', '1');
					$('#ns1blankspaceMainAddress').hide();
					if (ns1blankspace.objectContext === -1)
					{
						nsFreshcare.admin.grower.address({suburbUpper: true, wizard: true});
					}
					else
					{
						nsFreshcare.external.grower.address.show();
					}
				}

				if (ns1blankspace.objectContext != -1)
				{
					if (oParam.membershipShowIndex === undefined) {oParam.membershipShowIndex = 0}

					if (oParam.membershipShowIndex < ns1blankspace.objectContextData.memberships.length)
					{
						if ($('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).html() == '')
						{
							oParam.onCompleteWhenCan = oParam.onComplete;
							oParam.onComplete = nsFreshcare.admin.grower.save.validate;
							$('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).attr('data-loading', '1');
							$('#ns1blankspaceMainMembership' + ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id).hide();
							oParam.membership = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex].id;
							oParam.membershipData = ns1blankspace.objectContextData.memberships[oParam.membershipShowIndex];
							oParam.membershipShowIndex += 1;
							nsFreshcare.admin.grower.membership.show(oParam);
						}
						else
						{
							oParam.membershipShowIndex += 1;
							nsFreshcare.admin.grower.save.validate(oParam);
						}
					}
					else
					{
						delete(oParam.membership);
						delete(oParam.membershipData);
						delete(oParam.membershipShowIndex);
						oParam.onComplete = oParam.functionSave;
						oParam.validateGrowerStep = 1;
						nsFreshcare.admin.grower.save.validate(oParam);
					}
				}
				else
				{
					oParam.validateGrowerStep = 1;
					nsFreshcare.admin.grower.save.validate(oParam);
				}

			}

			// Now perform validation
			else if (oParam.validateGrowerStep === 1)
			{
				if ($('#ns1blankspaceMainDetails').html() != '')
				{
					// First validate mandatory fields
					$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
					{
						if (($(this).attr('data-mandatory') === '1') 
							&& $(this).val() === '') 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}
					});

					if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1
						&& $('#ns1blankspaceDetailsReference').is('*') && $('#ns1blankspaceDetailsReference').val() == '' 
						&& $('#ns1blankspaceDetailsReference').attr('data-newreference') == undefined)
					{
						ns1blankspace.okToSave = false;		// We don't want it to continue validating until this condition has been checked
						ns1blankspace.container.confirm(
							{
								title: 'Company ID',
								 html: 'Company ID is blank. A new Company ID will be allocated. Are you sure?',
								 buttons: 
								 [
									{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
										click: function() 
										{
											$('#ns1blankspaceDetailsReference').attr('data-newreference', '1');
											ns1blankspace.okToSave = true;
											$(this).dialog('destroy');
											nsFreshcare.admin.grower.save.validate(oParam);
										}
									},
									{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
										click: function() 
										{
											$('#ns1blankspaceDetailsReference').removeAttr('data-newreference')
											$(this).dialog('destroy');
											ns1blankspace.okToSave = false;
											if (fFunctionInvalidData) {fFunctionInvalidData()} else {return false}
										}
									}
								 ]
							});
					}

					// If Legal Name not populated, set to Trading Name
					if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsLegalName').val() === '')
					{
						$('#ns1blankspaceDetailsLegalName').val($('#ns1blankspaceDetailsTradingName').val());
					}

					if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsPhone').val() == "" && $('#ns1blankspaceDetailsFax').val() == ""
						&& $('#ns1blankspaceDetailsMobile').val() == "" && $('#ns1blankspaceDetailsEmail').val() == "")
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('At least one of Phone, Fax, Mobile or Email must be entered');
					}	

					if (ns1blankspace.okToSave && ns1blankspace.objectContext === -1 && $('#ns1blankspaceMainAddress').html() === '')
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Please add Address details for a new Grower');
					}

					// v3.1.0e Need to verify the email address
					if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsEmail').val() != '' && !nsFreshcare.util.validateEmail($('#ns1blankspaceDetailsEmail').val()))
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Please provide a valid email address for the Grower');
					}
				} 

				if (ns1blankspace.okToSave && $('#ns1blankspaceMainAddress').html() != '')
				{
					// v3.1.0 make sure user has clicked Done or Cancel on Address edit div
					if ($('#ns1blankspaceAddressManageContainer').is('*'))
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Please confirm or Cancel the changes to the Address before continuing');
					}

					// First validate mandatory fields
					if (ns1blankspace.okToSave)
					{
						$('#ns1blankspaceMainAddress input[data-mandatory]').each(function() 
						{
							if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
								return false;
							}
						});
					}

					// v3.1.0 Also validates all sites data
					if (ns1blankspace.okToSave)
					{
						$('#ns1blankspaceMainAddress .ns1blankspaceGrowerAddressRowEdit[data-mandatory]').each(function() 
						{
							if ($(this).attr('data-mandatory') === '1' && $(this).html() === '') 
							{
								ns1blankspace.okToSave = false;
								ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
								return false;
							}
						});
					}
					
					// v3.1.0 Now we need to make sure that if they're removing a site that it's not linked to a Membership
					if (ns1blankspace.okToSave)
					{
						$('#ns1blankspaceAddressRow2 .ns1blankspaceRowAddress').each(function()
						{
							var iAddressID = this.id.split('_').pop();
							if ($('#ns1blankspaceSiteValue_streetAddress1-' + iAddressID).is('*') &&
								$('#ns1blankspaceSiteValue_streetAddress1-' + iAddressID).css('text-decoration').indexOf('line-through') > -1)
							{
								$.each(ns1blankspace.objectContextData.memberships, function()
								{
									if ($.grep($('#ns1blankspaceMembership' + this.id + 'MembershipSiteUpdate .nsFreshcareSelected'), function(x)
										{
											return x.id.split('_').pop() == iAddressID;
										}).length > 0)
									{	// We need to cancel the remove as well
										ns1blankspace.okToSave = false;
										nsFreshcare.external.grower.address.manageRow({xhtmlElementID: 'ns1blankspaceSiteChangeStatus-first_' + iAddressID});			
										ns1blankspace.status.message('An address you are trying to remove is linked to a Membership. Please remove it from the Membership first');
										return false;
									}
								});

								// v3.1.0i SUP022439 Moved from outside of address row $.each
								// Now check if user is adding a new Membership and added the removed site
								if (ns1blankspace.okToSave && $('#ns1blankspaceMainNewMembership').html() != '')
								{
									if ($.grep($('#ns1blankspaceMembershipMembershipSiteUpdate .nsFreshcareSelected'), function(x)
										{
											return x.id.split('_').pop() == iAddressID;
										}).length > 0)
									{
										ns1blankspace.okToSave = false;
										ns1blankspace.status.message('An address you are trying to remove is linked to the new Membership. Please remove it from the Membership and then remove from the Grower');
										return false;
									}
								}
							}
						});
					}
				}

				if (!ns1blankspace.okToSave && fFunctionInvalidData)
				{
					fFunctionInvalidData()
				}

				if (ns1blankspace.okToSave && $('#ns1blankspaceMainNewMembership').html() != '')
				{
					oParam['new'] = true;
					oParam.sXHTMLElementID = "ns1blankspaceMainNewMembership";
					if (oParam.onComplete) {oParam.onCompleteWhenCan = oParam.onComplete}
					oParam.onComplete = nsFreshcare.admin.grower.save.validate;
					oParam.validateGrowerStep = 2;
					nsFreshcare.admin.grower.membership.save.validate(oParam);
				}
				else if (ns1blankspace.okToSave)
				{
					 if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.memberships.length > 0)
					 {
					 	$.each(ns1blankspace.objectContextData.memberships, function()
					 	{
					 		if (ns1blankspace.okToSave && $('#ns1blankspaceMainMembership' + this.id).html() != '')
					 		{
								oParam.membership = this.id;
					 			nsFreshcare.admin.grower.membership.save.validate(oParam);
					 		}
					 		if (!ns1blankspace.okToSave)
					 		{
					 			return false;
					 		}
					 	});

					 	oParam.validateGrowerStep = 2;
					 	nsFreshcare.admin.grower.save.validate(oParam);
					 }
					 else
					 {
					 	oParam.validateGrowerStep = 2;
					 	nsFreshcare.admin.grower.save.validate(oParam);
					 }
				}
				// v3.1.0e Call function if invalid
				else if (!ns1blankspace.okToSave && fFunctionInvalidData)
				{
					fFunctionInvalidData();
				}
			}

			else if (oParam.validateGrowerStep === 2)
			{
				if (ns1blankspace.okToSave)
				{
					delete(oParam.validateGrowerStep);
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
					else
					{
						nsFreshcare.admin.grower.save.send(oParam);
					}
				}
				// v3.1.0e Call function if invalid
				else if (fFunctionInvalidData)
				{
					fFunctionInvalidData();
				}
			}
		},

		send: function (oParam)
		{
			// v3.0.2 Added save function aliasing as required for newgrower
			var oBusinessData = ns1blankspace.util.getParam(oParam, 'businessData', {"default": {id: (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : ''}}).value;
			var oPersonData	= ns1blankspace.util.getParam(oParam, 'personData', {"default": {}}).value;
			var oAgriBusinessData = ns1blankspace.util.getParam(oParam, 'agriBusinessData', {"default": {}}).value;
			var aBusinessGroupsData = ns1blankspace.util.getParam(oParam, 'businessGroupsData', {"default": []}).value;
			var aPersonGroupsData = ns1blankspace.util.getParam(oParam, 'personGroupsData', {"default": []}).value;
			var aAddressLocationsData = ns1blankspace.util.getParam(oParam, 'addressLocationsData', {"default": []}).value;
			var aSubscriptionsData = ns1blankspace.util.getParam(oParam, 'subscriptionsData', {"default": []}).value;
			var aSubscriptionCertificateData = ns1blankspace.util.getParam(oParam, 'subscriptionCertificateData', {"default": []}).value;
			var aSubscriptionSitesLinkData = ns1blankspace.util.getParam(oParam, 'subscriptionSitesLinkData', {"default": []}).value;
			var aSubscriptionCategoryData = ns1blankspace.util.getParam(oParam, 'subscriptionCategoryData', {"default": []}).value;
			var aSubscriptionScopeData = ns1blankspace.util.getParam(oParam, 'subscriptionScopeData', {"default": []}).value;
			var aSubscriptionStatusChangeData = ns1blankspace.util.getParam(oParam, 'subscriptionStatusChangeData', {"default": []}).value;
			var fFunctionPostSave = ns1blankspace.util.getParam(oParam, 'functionPostSave', {"default": nsFreshcare.admin.grower.save.send}).value;
			var fFunctionSearch = ns1blankspace.util.getParam(oParam, 'functionSearch', {"default": nsFreshcare.admin.grower.search.send}).value;
			var bGrowerChanged = ns1blankspace.util.getParam(oParam, 'growerChanged', {'default': false}).value;
			var fFunctionValidate = ns1blankspace.util.getParam(oParam, 'functionValidate', {'default': nsFreshcare.admin.grower.save.validate}).value;
			var fFunctionSaveDetails = ns1blankspace.util.getParam(oParam, 'functionSaveDetails', {'default': nsFreshcare.admin.grower.save.details}).value;
			var fFunctionSaveAddress = ns1blankspace.util.getParam(oParam, 'functionSaveAddress', {'default': nsFreshcare.admin.grower.save.address}).value;
			var fFunctionSaveMembership = ns1blankspace.util.getParam(oParam, 'functionSaveMembership', {'default': nsFreshcare.admin.grower.save.membership}).value;
			var aSubscriptionsWithdrawn = ns1blankspace.util.getParam(oParam, 'subscriptionsWithdrawn', {"default": []}).value;

			if (oParam === undefined) {oParam = {saveGrowerStep: 1}} else {if (oParam.saveGrowerStep === undefined) {oParam.saveGrowerStep = 1}}
			if (oParam.saveObjectIndex == undefined) {oParam.saveObjectIndex = 0}

			// Validate data entry
			if (oParam.saveGrowerStep === 1)
			{
				ns1blankspace.status.working();
				
				ns1blankspace.okToSave = true;
				oParam.saveGrowerStep = 2;
				oParam.onComplete = nsFreshcare.admin.grower.save.send;
				fFunctionValidate(oParam);
			}
			
			// Collect data and place into relevant places
			else if (oParam.saveGrowerStep === 2)
			{
				ns1blankspace.status.working('Collecting data..');
				$('#ns1blankspaceDetailsReference').removeAttr('data-newreference');
				if (oParam.nextReference === undefined)
				{
					oParam.nextReference = $('#ns1blankspaceDetailsReference').val();
					if (oParam.nextReference == undefined) {oParam.nextReference = $('#ns1blankspaceDetailsReferenceUpdate').val()}
				}
				
				// Get next reference number if no reference number
				if (oParam.nextReference == undefined || oParam.nextReference === '')
				{
					oParam.onComplete = nsFreshcare.admin.grower.save.send;
					nsFreshcare.admin.grower.save.getNextReference(oParam);
				}

				// Details tab
				else if ($('#ns1blankspaceMainDetails').html() != '' && oParam.detailsTab != true)
				{
					$('#ns1blankspaceDetailsReference').val(oParam.nextReference);
					$('#ns1blankspaceDetailsReferenceUpdate').val(oParam.nextReference);
					oParam.savefunction = this.send;
					fFunctionSaveDetails(oParam);
				}
				
				// Address tab
				else if ($('#ns1blankspaceMainAddress').html() != '' && oParam.addressTab != true)
				{
					oParam.savefunction = this.send;
					fFunctionSaveAddress(oParam);
				}
				
				// Existing Membership tabs
				else if (($('.ns1blankspaceMembership').length > 0 || $('#ns1blankspaceControlNewMembership').is('*')) 
					&& oParam.membershipTab != true)
				{
					oParam.savefunction = this.send;
					fFunctionSaveMembership(oParam);
				}

				else
				{
					oParam.saveGrowerStep = 3;
					nsFreshcare.admin.grower.save.send(oParam);
				}
			}

			// Now start saving
			else if (oParam.saveGrowerStep === 3)
			{
				var oSaveObject = nsFreshcare.admin.grower.data.saveObjects[oParam.saveObjectIndex];
				var oUpdatedData = oParam[oSaveObject.saveSource];		// Updated Data we want to save
				var aUpdatedData = ($.type(oUpdatedData) === 'array') ? oUpdatedData : undefined;	// UpdatedData Could be either an object or an array of objects. 
				var oStoredData;			// Data stored in ns1blankspace.objectContextData
				var oManageData = {};		// Used to post to MANAGE method
				var oManageDataPost;		// Used to update addresslinks after adding / removing addresses
				var sStoredDataPrefix = (oSaveObject.dataSourcePrefix) ? oSaveObject.dataSourcePrefix + '.' : '';
				var oSavedData = {};				// Data object to save against ns1blankspace.objectContextData once saved
				var oSubscriptionSitesLinkData;		// Stores links to Membership sites when new grower & membership
				var iThisId;
				var bSaveOnNew = (oSaveObject.onNew != undefined) ? oSaveObject.onNew : true;
				var sMethod = oSaveObject.method;	// We need to change this when removing site addresses
				if (oParam.disableUserCount === undefined) {oParam.disableUserCount = 0}
				if (oParam.enableUserCount === undefined) {oParam.enableUserCount = 0}


				// If UpdatedData is an array get the first object from the array
				if (aUpdatedData != undefined)
				{
					oUpdatedData = aUpdatedData.shift();
					iThisId = (oUpdatedData) ? oUpdatedData.id : undefined;
					// v3.1.0 Need to disable user when all memberships are withdrawn
					oParam.disableUserCount += (oUpdatedData && oUpdatedData.disableUser === true ? 1 : 0) 
					oParam.enableUserCount += (oUpdatedData && oUpdatedData.enableUser === true ? 1 : 0)
				}

				// Get the data that was previously stored in the db from ns1blankspace.objectContextData
				if (ns1blankspace.objectContext != -1)
				{
					if (oSaveObject.dataSource === '')
					{
						oStoredData = ns1blankspace.objectContextData;
					}
					else
					{
						if (iThisId)
						{
							oStoredData = ns1blankspace.objectContextData[oSaveObject.dataSource];
							if ($.type(oStoredData) === 'array')
							{	// Find the correct existing record in the array
								oStoredData = $.grep(oStoredData, function(x) {return x.id === iThisId}).shift();
							}
						}
					}
				}
				// If a new record and we don't save this object on new records, force next step by setting oUpdatedData to string
				else if (!bSaveOnNew)
				{
					oUpdatedData = '';
				}
				
				// Now make sure we have a valid object and populate all of the data. If not, call again and see if we have data for the next object
				// Add id's where necessary - particularly when new grower
				if ($.type(oUpdatedData) === 'object' && Object.keys(oUpdatedData).length > 0)
				{
					if (oSaveObject.object === 'address') 
					{
						oManageDataPost = {};
						//sStoredDataPrefix = 'address.addresslink.';
						if (oParam.newGrower === true && oParam.newMembership === true)
						{
							oSubscriptionSitesLinkData = {};
						}
					};

					if ((oUpdatedData.remove === true || oUpdatedData.remove === '1') && oUpdatedData.id)
					{
						oManageData.remove = 1;
						oManageData.id = oUpdatedData.id;

						// v3.1.0 Special case when removing addresses. 
						// Need to remove the link to the business first (from addresslink) so change the method and remove it as postdata 
						if (oSaveObject.object === 'address' && oUpdatedData['address.addresslink.id'])
						{
							sMethod = 'CORE_LOCATION_ADDRESS_LINK_MANAGE';
							oManageData = {id: oUpdatedData['address.addresslink.id'], remove: '1'};
							oManageDataPost = {id: oUpdatedData.id, remove: '1'};
						}
					}
					else
					{
						$.each(oUpdatedData, function(key, value)
						{
							if (key === 'contactbusiness' && value === '' && ns1blankspace.objectContext != -1)
							{
								oManageData.contactbusiness = ns1blankspace.objectContext;
							}
							
							else if (key === 'contactperson' && value === '' && oParam.contactperson.id)
							{
								oManageData.contactperson = oParam.contactperson.id;
							}
							
							else if (key === 'subscription' && value === '' && oParam.agrisubscription.id)
							{
								oManageData.subscription = oParam.agrisubscription.id;
							}
							
							else if (key === 'othercontactbusiness' && value === '' && ns1blankspace.objectContext != -1)
							{
								oManageData.othercontactbusiness = ns1blankspace.objectContext;
							}
							
							else if ((key === 'objectcontext' || key.split('.').pop() === 'objectcontext') 
								&& value === '' 
								&& (oUpdatedData[sStoredDataPrefix + 'object'] === nsFreshcare.objectBusiness 
									|| oUpdatedData[$.grep(key.split('.'), function(x, i) {return i < key.split('.').length - 1}).join('.') + '.object'] === nsFreshcare.objectBusiness) 
								&& oParam.contactbusiness.id)
							{
								if (key.split('.').length > 1 && oUpdatedData.id === undefined)
								{	
									oManageDataPost.objectcontext = oParam.contactbusiness.id;
									if (oParam.newGrower && oParam.newMembership === true) {oSubscriptionSitesLinkData.objectcontext = ''};
								}
								else
								{	oManageData.objectcontext = oParam.contactbusiness.id;}
							}
							
							else if ((key === 'objectcontext')
								&& value === '' && oUpdatedData['object'] === nsFreshcare.objectSubscription && oParam.agrisubscription.id)
							{
								oManageData.objectcontext = oParam.agrisubscription.id;
							}
							
							// Only for address / addresslink combinations - we only create oManageDataPost for new addresses
							// And we update oSubscriptionSitesLinkData for a new Grower with a membership
							else if (key.split('.').length > 1 && oUpdatedData.id === undefined)
							{
								oManageDataPost[key.split('.').pop()] = value;
								if (oParam.newGrower === true && oParam.newMembership === true) {oSubscriptionSitesLinkData[key.split('.').pop()] = value}
							}
							
							else if (key === 'id')
							{
								oManageData.id = (value === undefined && oStoredData && oStoredData.id) ? oStoredData.id : value; 
							}

							else if (oStoredData === undefined 
								|| (oStoredData && value != oStoredData[sStoredDataPrefix + key].formatXHTML()))
							{
								oManageData[key] = (value === undefined) ? '' : value;
							}
						});
					}

					// If we have something to update, call the relevant method
					if (((oManageData.id === '' || oManageData.id == undefined) && Object.keys(oManageData).length > 0)
						|| (oManageData.id && Object.keys(oManageData).length > 1))
					{
						oManageDataPost = (oManageDataPost && Object.keys(oManageDataPost).length > 0) ? oManageDataPost : undefined;
						oParam.growerChanged = true;
						// v3.0.0c SUP021725 if contactbusiness object, need to pass checkduplciate=N
						if (oSaveObject.object === 'contactbusiness')
						{
							oManageData.checkduplicate = 'N';
						}

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI(sMethod),
							data: oManageData,
							dataType: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.working(oSaveObject.object + ' saved');

									if (ns1blankspace.objectContext === -1)
									{
										oParam.newGrower = true;
										ns1blankspace.objectContext = oResponse.id;
									}

									// If not a 'child' object Save the id of this object to oParam as we may need to use this later
									if ($.type(oParam[oSaveObject.saveSource]) === 'object') {oParam[oSaveObject.object] = {id: oResponse.id};}

									// If there's postdata we need to update the addressid 
									if (oManageDataPost && oManageDataPost.remove === undefined)
									{
										oManageDataPost.address = oResponse.id;
										if (oSubscriptionSitesLinkData) 
										{
											oSubscriptionSitesLinkData.address = oResponse.id;
											oSubscriptionSitesLinkData.object = nsFreshcare.objectSubscription;
											oParam.subscriptionSitesLinkData.push(oSubscriptionSitesLinkData);
										}
									}

									// If we're saving a new Membership, set the agrisubscription.id
									if (oSaveObject.object === 'agrisubscription' && oParam.newMembership && oUpdatedData)
									{
										oParam.agrisubscription = {id: oResponse.id};
									}

									// ToDo: Update the data stored against ns1blankspace.objectContextData if not new record

									// Check if this is an array and there are still rows on it, we call again with the same saveObjectIndex
									if (aUpdatedData != undefined && aUpdatedData.length > 0)
									{
										oParam[oSaveObject.saveSource] = aUpdatedData;
										//oParam.saveObjectIndex = iSaveObjectIndex;
									}
									else
									{
										// Now remove the saveSource from oParam so we don't save it again if any of the saves fail
										delete(oParam[oSaveObject.saveSource]);
										// Increment the saveObjectIndex
										if (oParam.saveObjectIndex + 1 < nsFreshcare.admin.grower.data.saveObjects.length) 
										{
											oParam.saveObjectIndex += 1;
										}
										else
										{
											delete(oParam.saveObjectIndex);
											oParam.saveGrowerStep = 4;
										}
									}

									if (oSaveObject.object === 'address' && oManageDataPost)
									{
										var bAddressLink = (oManageDataPost.remove) ? false : true;
										$.ajax(
										{
											type: 'POST',
											url: ns1blankspace.util.endpointURI((bAddressLink) ? 'CORE_LOCATION_ADDRESS_LINK_MANAGE' : 'CORE_LOCATION_ADDRESS_MANAGE'),
											data: oManageDataPost,
											success: function(oResponse)
											{
												if (oResponse.status === 'OK')
												{
													ns1blankspace.status.working('address' + (bAddressLink ? ' link': '') + 'saved');

													if (fFunctionPostSave)
													{
														fFunctionPostSave(oParam);
													}
												}
												else
												{
													ns1blankspace.status.error('Error saving address' + (bAddressLink ? ' link': '') + ': ' + oResponse.error.errornotes);
												}
											}
										});
									}
									else
									{
										if (fFunctionPostSave)
										{
											fFunctionPostSave(oParam);
										}
									}
								}
								else
								{
									ns1blankspace.status.error('Error saving ' + oSaveObject.object + ': ' + oResponse.error.errornotes);
								}
							}
						});
					}
					// No data to update, call back again
					else
					{
						if (aUpdatedData != undefined && aUpdatedData.length > 0)
						{
							oParam[oSaveObject.saveSource] = aUpdatedData;
							//oParam.saveObjectIndex = iSaveObjectIndex;
						}
						else
						{
							if (oParam.saveObjectIndex + 1 < nsFreshcare.admin.grower.data.saveObjects.length)
							{
								oParam.saveObjectIndex += 1;
							}
							else
							{
								delete(oParam.saveObjectIndex);
								oParam.saveGrowerStep = 4;
							}
						}
						
						fFunctionPostSave(oParam);
					}
				}
				
				// No data to update, call back again
				else
				{
					if (oParam.saveObjectIndex + 1 < nsFreshcare.admin.grower.data.saveObjects.length)
					{
						oParam.saveObjectIndex += 1;
					}
					else
					{
						delete(oParam.saveObjectIndex);
						oParam.saveGrowerStep = 4;
					}
					
					fFunctionPostSave(oParam);
				}
			}

			// if we have a new grower, set the contactbusiness.primarycontactperson field
			else if (oParam.saveGrowerStep === 4)
			{
				if (oParam.newGrower == true && oParam.contactperson.id)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_BUSINESS_MANAGE'),
						data: 'id=' + ns1blankspace.objectContext + '&primarycontactperson=' + oParam.contactperson.id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.working('primarycontactperson saved');
								oParam.saveGrowerStep = ((oParam.disableUserCount > 0) ? 5: 6);
								nsFreshcare.admin.grower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving primary contact person: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else 
				{
					oParam.saveGrowerStep = 5;
					fFunctionPostSave(oParam);
				}
			}

			// Check if user to be disabled based on disableUserCount
			else if (oParam.saveGrowerStep === 5)
			{
				if (oParam.disableUserCount > 0 && oParam.enableUserCount == 0)
				{
					var iWDSubscriptions = $.grep(ns1blankspace.objectContextData.memberships, 
											function(x) {return x['agrisubscription.status'] == nsFreshcare.data.grower.subscriptionStatusWD}).length;

					if ((iWDSubscriptions + oParam.disableUserCount) === ns1blankspace.objectContextData.memberships.length)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
							data: 'id=' + ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'] + 
									'&disabled=Y&disableddate=' + dToday.toString('dd MMM yyyy') + 
									'&disabledreason=' + ns1blankspace.util.fs('All Membership Subscriptions Withdrawn'),
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.working('user disabled');
									oParam.saveGrowerStep = 51;
									nsFreshcare.admin.grower.save.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error disabling user: ' + oResponse.error.errornotes);
								}
							}
						});
					}
					else
					{
						oParam.saveGrowerStep = 51
					}
				}
				
				// v3.1.2 SUP022442 Now re-enables when user changes to reinstated member
				else if (oParam.enableUserCount > 0)
				{	// We've already checked if user is disabled when setting this flag earlier so just enable
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
						data: 'id=' + ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'] + 
								'&disabled=N',
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.working('user re-enabled');
								oParam.saveGrowerStep = ((oParam.functionSaveMore) ? 6: 10);
								nsFreshcare.admin.grower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error enabling user: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					oParam.saveGrowerStep = 51
					fFunctionPostSave(oParam);
				}				
			}

			// v3.2.005 SUP022438 Ask user if they want a notification sent to the CB re withdrawing Grower
			else if (oParam.saveGrowerStep == 51)
			{
				if (aSubscriptionsWithdrawn.length > 0)
				{
					oParam.withdrawalNotificationStep = oParam.withdrawalNotificationStep || 1;
					if (oParam.withdrawalNotificationStep == 1)
					{
						var aButtons = 
						[
							{text: "Yes", icons: {primary: 'ui-icon-check'},
								click: function() 
								{
									oParam.withdrawalNotificationStep = 2;
									$(this).dialog('destroy');
									nsFreshcare.admin.grower.save.send(oParam);
								}
							},
							{text: "No", icons: {primary: 'ui-icon-close'}, 
								click: function() 
								{
									delete(oParam.withdrawalNotificationStep);
									delete(oParam.subscriptionsWithdrawn);
									oParam.saveGrowerStep = ((oParam.functionSaveMore) ? 6: 10);
									$(this).dialog('destroy');
									nsFreshcare.admin.grower.save.send(oParam);
								}
							}
						];

						ns1blankspace.container.confirm(
						{
							html: 'Subscription' + (aSubscriptionsWithdrawn.length > 1 ? 's':'') + ' for ' + 
									$.map(aSubscriptionsWithdrawn, function(x) {return x.membershipText.formatXHTML()}).join( ' & ') +
									(aSubscriptionsWithdrawn.length > 1 ? ' have' : ' has') + ' been withdrawn.<br /><br />' +
									'Do you want to send an email to the Certification Body notifying them of the withdrawal?',
							title: 'Subscriptions have been withdrawn!',
							buttons: aButtons
						});
					}
					// Now get CB email address(es)
					else if (oParam.withdrawalNotificationStep == 2)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_BUSINESS_SEARCH';
						oSearch.addField('contactbusiness.contactperson.email,contactbusiness.contactperson.id');
						oSearch.addFilter('id', 'IN_LIST', $.map(aSubscriptionsWithdrawn, function(x) {return x.certificationBody}).join(','))
						oSearch.addFilter('contactbusiness.primarycontactperson', 'EQUAL_TO', 'field:contactbusiness.contactperson.id');
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								var aUniqueCBs = [];
								$.each(aSubscriptionsWithdrawn, function()
								{
									if ($.inArray(this.certificationBody, aUniqueCBs) == -1)
									{
										aUniqueCBs.push(this.certificationBody);
									}

									for (var i = 0; i < oResponse.data.rows.length; i++)
									{
										if (this.certificationBody == oResponse.data.rows[i].id)
										{
											this.email = oResponse.data.rows[i]['contactbusiness.contactperson.email'];
											this.emailID = oResponse.data.rows[i]['contactbusiness.contactperson.id'];
										}
									}
								});

								oParam.uniqueCBs = aUniqueCBs;
								oParam.subscriptionsWithdrawn = aSubscriptionsWithdrawn;
								oParam.withdrawalNotificationStep = 3;
								nsFreshcare.admin.grower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Unable to find CB email address: ' + oResponse.error.errornotes);
							}
						});
					}
					// Now send notification(s)
					else if (oParam.withdrawalNotificationStep == 3)
					{
						if (oParam.uniqueCBs.length > 0)
						{
							var oData = {};
							var iThisCB = oParam.uniqueCBs.shift();
							var sWithdrawnText = ''
							var sToID = '';
							var sToEmail = '';
							$.each(aSubscriptionsWithdrawn, function()
							{
								if (this.certificationBody == iThisCB)
								{
									sWithdrawnText += '<tr><td style="padding: 5px;">' + this.membershipText.formatXHTML() + '</td>' +
														'<td style="padding: 5px;">' + this.reason.formatXHTML() + '</td></tr>';
									sToID = this.emailID;
									sToEmail = this.email;
								}
							});

							if (sWithdrawnText != '')
							{
								sWithdrawnText = 'Grower ' + ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML() + 
													' has been withdrawn from the following Membership' + (aSubscriptionsWithdrawn.length > 1 ? 's' : '') + ':<p>&nbsp;</p>' +
										'<table class="ns1blankspace"><tr><td style="padding: 5px;"><strong>Membership</strong></td><td style="padding: 5px;"><strong>Reason</strong></td></tr>' + 
										sWithdrawnText + '</table>';

								oData.message = sWithdrawnText;
								oData.subject = 'Grower ' + ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML() + ' has been withdrawn from Membership' +
												(aSubscriptionsWithdrawn.length > 1 ? 's' : '');
								oData.to = sToID;
								oData.saveagainstobject = nsFreshcare.objectBusiness;
								oData.saveagainstobjectcontext = ns1blankspace.objectContext;
								oData.save = 'Y';
								oData.send = 'Y';
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
									data: oData,
									success: function(oResponse)
									{
										if (oResponse.status == 'OK')
										{
											ns1blankspace.status.message('Message Sent..');
										}
										else
										{
											ns1blankspace.status.error('Unable to send message to ' + sToEmail + ': ' + oResponse.error.erronotes);
										}
										nsFreshcare.admin.grower.save.send(oParam);
									}
								});
							}
							else
							{
								nsFreshcare.admin.grower.save.send(oParam);
							}
						}
						else
						{
							delete(oParam.withdrawalNotificationStep);
							delete(oParam.uniqueCBs);
							oParam.saveGrowerStep = ((oParam.functionSaveMore) ? 6: 10);
							nsFreshcare.admin.grower.save.send(oParam);
						}
					}
				}
				else
				{
					oParam.saveGrowerStep = ((oParam.functionSaveMore) ? 6: 10);
					nsFreshcare.admin.grower.save.send(oParam);
				}
			}

			// Used when we need to save more details for a forked version
			else if (oParam.saveGrowerStep === 6)
			{
				var fFunctionSaveMore = oParam.functionSaveMore;
				oParam.saveGrowerStep = 10;
				if (fFunctionSaveMore)
				{
					oParam.onComplete = nsFreshcare.admin.grower.save.send;
					fFunctionSaveMore(oParam);
				}
				else
				{
					fFunctionPostSave(oParam);
				}
			}

			// Re-display record if applicable
			else if (oParam.saveGrowerStep === 10)
			{
				ns1blankspace.status.clear();
				ns1blankspace.inputDetected = false;
				delete(oParam.newGrower);
				//if (oParam.newGrower || oParam.newMembership)
				if (oParam.growerChanged)
				{
					fFunctionSearch({xhtmlElementID: '-' + ns1blankspace.objectContext, id: ns1blankspace.objectContext});
				}
				else
				{
					ns1blankspace.status.message('Nothing to save');
				}
			}	
		},

		getNextReference: function(oParam)
		{
			// v3.1.0 Filter on last 30 days so we make sure we're not getting 9999 as the highest number returned. We're sitting around 11000 now so have a lot of leeway
			var d30DaysAgo = new Date();
			d30DaysAgo = new Date(d30DaysAgo.setDate(d30DaysAgo.getDate() - 30));

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_GROUP_SEARCH';
			oSearch.addField('businessgroup.contactbusiness.reference');
			oSearch.addFilter('group', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);		// v3.1.2 SUP022744 Now uses only 'Grower' group
			oSearch.addFilter('businessgroup.contactbusiness.createddate', 'BETWEEN', d30DaysAgo.toString('dd MMM yyyy') + ' 00:00:00', dToday.toString('dd MMM yyyy' + ' 23:59:59'));
			oSearch.sort('businessgroup.contactbusiness.reference', 'desc');
			oSearch.getResults(function(oResponse)
			{
				var sNextReference = '';

				if (oResponse.status === 'OK')
				{
					if (oResponse.data.rows.length > 0)
					{
						var i = 0;
						while (!nsFreshcare.util.isNumeric({value: oResponse.data.rows[i]['businessgroup.contactbusiness.reference'].replace("BUS", ''), zeroValid: false}))
						{
							i += 1;
						}
						if (i < oResponse.data.rows.length)
						{
							sNextReference = (Number(oResponse.data.rows[i]['businessgroup.contactbusiness.reference'].replace("BUS", '')) + 1).toString();
						}
						else
						{
							sNextReference = '0000';
						}
					}
					else
					{
						sNextReference = '1001';
					}

					if (sNextReference != '')
					{
						oParam.nextReference = sNextReference;
						ns1blankspace.util.onComplete(oParam);
					}
				}
				else
				{
					ns1blankspace.status.error('Error finding next Company Id: ' + oResponse.status.error);
				}
			});
		},

		details: function(oParam)
		{
			var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": nsFreshcare.admin.grower.save.send}).value;			
			var oBusinessData = ns1blankspace.util.getParam(oParam, 'businessData', {"default": {}}).value;
			var oPersonData	= ns1blankspace.util.getParam(oParam, 'personData', {"default": {}}).value;
			var oAgriBusinessData = ns1blankspace.util.getParam(oParam, 'agriBusinessData', {"default": {}}).value;
			var aBusinessGroupsData = ns1blankspace.util.getParam(oParam, 'businessGroupsData', {"default": []}).value;
			var aPersonGroupsData = ns1blankspace.util.getParam(oParam, 'personGroupsData', {"default": []}).value;

			// v3.1.206 SUP023035 Added business.customerstatus of Active. Notes now only on business
			oBusinessData = $.extend(true, oBusinessData, 
			{
				id: (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : undefined,
				reference: $('#ns1blankspaceDetailsReference').val(),
				tradename: $('#ns1blankspaceDetailsTradingName').val(),
				legalname: $('#ns1blankspaceDetailsLegalName').val(),
				abn: $('#ns1blankspaceDetailsABN').val(),
				phonenumber: $('#ns1blankspaceDetailsPhone').val(),
				faxnumber: $('#ns1blankspaceDetailsFax').val(),
				notes: $('#ns1blankspaceDetailsDescription').val(),
				customerstatus: nsFreshcare.data.contactStatusActive,
				primarycontactperson: (ns1blankspace.objectContextData && ns1blankspace.objectContextData['contactbusiness.primarycontactperson']) 
										? ns1blankspace.objectContextData['contactbusiness.primarycontactperson'] : undefined
			});
			oBusinessData['se' + nsFreshcare.data.sendPrintedCertificatesId] = $('input[name="radioSendPrintedCertificates"]:checked').val();

			// v3.1.206 Notes no longer on person record
			oPersonData = $.extend(true, oPersonData,
			{
				firstname: $('#ns1blankspaceDetailsFirstName').val(),
				surname: $('#ns1blankspaceDetailsSurname').val(),
				title: $('#ns1blankspaceDetailsTitle').attr('data-id'),
				position: $('#ns1blankspaceDetailsPosition').val(),
				gender: $('#ns1blankspaceDetailsGender').attr('data-id'),
				workphone: $('#ns1blankspaceDetailsPhone').val(),
				fax: $('#ns1blankspaceDetailsFax').val(),
				mobile: $('#ns1blankspaceDetailsMobile').val(),
				email: $('#ns1blankspaceDetailsEmail').val(),
				contactbusiness: (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '',
				customerstatus: nsFreshcare.data.contactStatusActive,
				id: (ns1blankspace.objectContextData && ns1blankspace.objectContextData['contactbusiness.contactperson.id'] != '') ? ns1blankspace.objectContextData['contactbusiness.contactperson.id'] : undefined,
			});
		
			oAgriBusinessData = $.extend(true, oAgriBusinessData,
			{
				contactbusiness: (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '',
				joindate: $('#ns1blankspaceDetailsJoinDate').val(),	
				prioritymembership: $('#ns1blankspaceDetailsPriorityMembership').attr('data-id'),
				id: (ns1blankspace.objectContextData && ns1blankspace.objectContextData['contactbusiness.agribusiness.id'] != '') ? ns1blankspace.objectContextData['contactbusiness.agribusiness.id'] : undefined,
			}) 

			// We must have at least the business Group of 'Grower'
			// Modifying of Groups is catered for on the Groups tab so only need to add Grower for Business & Person for new records
			// v3.1.2 SUP022744 Now just adds Person Group of Grower for new records
			if (ns1blankspace.objectContext === -1)
			{
				// Business Group
				aBusinessGroupsData.push(
				{
					group: nsFreshcare.data.businessGroupGrowerID,
					contactbusiness: ''
				});

				// Person Group
				aPersonGroupsData.push(
				{
					group: nsFreshcare.data.grower.categoryGrower,
					contactperson: ''
				});
			}
			
			
			oParam.detailsTab = true;
			oParam.businessData = oBusinessData;
			oParam.personData = oPersonData;
			oParam.agriBusinessData = oAgriBusinessData;
			oParam.businessGroupsData = aBusinessGroupsData;
			oParam.personGroupsData = aPersonGroupsData;

			fFunctionSave(oParam);
		},

		address: function(oParam)
		{
			var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": nsFreshcare.admin.grower.save.send}).value;			
			var oBusinessData = ns1blankspace.util.getParam(oParam, 'businessData', {"default": {}}).value;
			var oPersonData	= ns1blankspace.util.getParam(oParam, 'personData', {"default": {}}).value;
			var aAddressLocationsData = ns1blankspace.util.getParam(oParam, 'addressLocationsData', {"default": []}).value;
			var bUpdate = $('#ns1blankspaceAddressMailingAddress1Update').is('*');

			oBusinessData = $.extend(true, oBusinessData, 
			{
				mailingaddress1: $('#ns1blankspaceAddressMailingAddress1' + ((bUpdate) ? 'Update' : '')).val(),
				mailingaddress2: $('#ns1blankspaceAddressMailingAddress2' + ((bUpdate) ? 'Update' : '')).val(),
				mailingstate: $('#ns1blankspaceAddressMailingState' + ((bUpdate) ? 'Update' : '')).val(),
				mailingsuburb:  $('#ns1blankspaceAddressMailingSuburb' + ((bUpdate) ? 'Update' : '')).val(),
				mailingpostcode: $('#ns1blankspaceAddressMailingPostCode' + ((bUpdate) ? 'Update' : '')).val(),
				mailingcountry: $('#ns1blankspaceAddressMailingCountry' + ((bUpdate) ? 'Update' : '')).val()
			});

			// v3.1.206 SUP023035 No longer updates person address */
			/*oPersonData = $.extend(true, oPersonData, 
			{
				mailingaddress1: $('#ns1blankspaceAddressMailingAddress1' + ((bUpdate) ? 'Update' : '')).val(),
				mailingaddress2: $('#ns1blankspaceAddressMailingAddress2' + ((bUpdate) ? 'Update' : '')).val(),
				mailingstate: $('#ns1blankspaceAddressMailingState' + ((bUpdate) ? 'Update' : '')).val(),
				mailingsuburb:  $('#ns1blankspaceAddressMailingSuburb' + ((bUpdate) ? 'Update' : '')).val(),
				mailingpostcode: $('#ns1blankspaceAddressMailingPostCode' + ((bUpdate) ? 'Update' : '')).val(),
				mailingcountry: $('#ns1blankspaceAddressMailingCountry' + ((bUpdate) ? 'Update' : '')).val()
			}); */

			// Address tab either has sites or just the street & mailing address
			if ($('.ns1blankspaceRowAddress').length > 0)		// sites
			{
				// The first row becomes the default address and is saved against the business
				var iRowID = $('.ns1blankspaceRowAddress').first().attr('id').split('_').pop();
				oBusinessData = $.extend(true, oBusinessData, 
				{
					streetaddress1: $('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).html(),
					streetaddress2: $('#ns1blankspaceSiteValue_streetAddress2-' + iRowID).html(),
					streetstate: $('#ns1blankspaceSiteValue_streetState-' + iRowID).html(),
					streetsuburb:  $('#ns1blankspaceSiteValue_streetSuburb-' + iRowID).html(),
					streetpostcode: $('#ns1blankspaceSiteValue_streetPostCode-' + iRowID).html(),
					streetcountry: $('#ns1blankspaceSiteValue_streetCountry-' + iRowID).html()
				});

				// Now save all of the sites to AddressLocationsData
				// v3.1.0 Now looks at html instead of val as no longer use in-line editing
				$.each($('.ns1blankspaceRowAddress'), function(i, t)
				{
					var iRowID = t.id.split('_').pop();
					if (($(t).attr('data-type') === 'new'))
					{
						aAddressLocationsData.push(
						{
							address1: $('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).html(),
							address2: $('#ns1blankspaceSiteValue_streetAddress2-' + iRowID).html(),
							addresssuburb: $('#ns1blankspaceSiteValue_streetSuburb-' + iRowID).html(),
							addressstate: $('#ns1blankspaceSiteValue_streetState-' + iRowID).html(),
							addresspostcode: $('#ns1blankspaceSiteValue_streetPostCode-' + iRowID).html(),
							addresscountry: 'Australia',
							type: '1',
							status: ($(t).attr('data-status') ? $(t).attr('data-status') : ((i === 0) ? '1' : '2')),
							"address.addresslink.object": nsFreshcare.objectBusiness,
							"address.addresslink.objectcontext": (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : ''
						});
					}
					else
					{
						aAddressLocationsData.push(
						{
							address1: $('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).html(),
							address2: $('#ns1blankspaceSiteValue_streetAddress2-' + iRowID).html(),
							addresssuburb: $('#ns1blankspaceSiteValue_streetSuburb-' + iRowID).html(),
							addressstate: $('#ns1blankspaceSiteValue_streetState-' + iRowID).html(),
							addresspostcode: $('#ns1blankspaceSiteValue_streetPostCode-' + iRowID).html(),
							addresscountry: 'Australia',
							type: '1',
							id: iRowID,
							status: $(t).attr('data-status'),
							remove:  ($('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).css('text-decoration').indexOf('line-through') > -1),
							"address.addresslink.id": $('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).attr('data-linkid'),
							"address.addresslink.object": nsFreshcare.objectBusiness,
							"address.addresslink.objectcontext": (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '',
							"address.addresslink.remove":  ($('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).css('text-decoration').indexOf('line-through') > -1)
						});
					}
				});
			}
			else 	// just street & mailing. Street Address to be also added (as this only occurs on new record) to Locations as status 1
			{
				oBusinessData = $.extend(true, oBusinessData, 
				{
					streetaddress1: $('#ns1blankspaceAddressStreetAddress1').val(),
					streetaddress2: $('#ns1blankspaceAddressStreetAddress2').val(),
					streetstate: $('#ns1blankspaceAddressStreetState').val(),
					streetsuburb:  $('#ns1blankspaceAddressStreetSuburb').val(),
					streetpostcode: $('#ns1blankspaceAddressStreetPostCode').val(),
					streetcountry: $('#ns1blankspaceAddressStreetCountry').val()
				});

				// v3.1.206 SUP023035 No longer updates person address */
				/*oPersonData = $.extend(true, oPersonData, 
				{
					streetaddress1: $('#ns1blankspaceAddressStreetAddress1').val(),
					streetaddress2: $('#ns1blankspaceAddressStreetAddress2').val(),
					streetstate: $('#ns1blankspaceAddressStreetState').val(),
					streetsuburb:  $('#ns1blankspaceAddressStreetSuburb').val(),
					streetpostcode: $('#ns1blankspaceAddressStreetPostCode').val(),
					streetcountry: $('#ns1blankspaceAddressStreetCountry').val()
				});*/

				aAddressLocationsData.push(
				{
					address1: $('#ns1blankspaceAddressStreetAddress1').val(),
					address2: $('#ns1blankspaceAddressStreetAddress2').val(),
					addresssuburb: $('#ns1blankspaceAddressStreetSuburb').val(),
					addressstate: $('#ns1blankspaceAddressStreetState').val(),
					addresspostcode: $('#ns1blankspaceAddressStreetPostCode').val(),
					addresscountry: 'Australia',
					type: '1',
					status: '1',
					"address.addresslink.object": nsFreshcare.objectBusiness,
					"address.addresslink.objectcontext": (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : ''
				});
			}
			aAddressLocationsData = $.map(aAddressLocationsData, function(x) 
									{
										if (x.remove == false || x.remove == undefined) {delete(x.remove);} 
										if (x["address.addresslink.remove"] == false || x["address.addresslink.remove"] == undefined) {delete(x["address.addresslink.remove"]);} 
										return x;
									});

			// v3.1.0 If user doesn't click Details tab, BusinessData.id & PersonData.id isn't populated
			if (oBusinessData.id === undefined)
			{
				oBusinessData.id = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : undefined;
			}
			if (oPersonData.id === undefined)
			{
				oPersonData.id = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData['contactbusiness.contactperson.id'] : undefined;
			}
			oParam.addressTab = true;
			oParam.businessData = oBusinessData;
			oParam.personData = oPersonData;
			oParam.addressLocationsData = aAddressLocationsData;
			
			fFunctionSave(oParam);
		},

		membership: function(oParam)
		{
			var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": nsFreshcare.admin.grower.save.send}).value;			
			var aSubscriptionsData = ns1blankspace.util.getParam(oParam, 'subscriptionsData', {"default": []}).value;
			var aSubscriptionSitesLinkData = ns1blankspace.util.getParam(oParam, 'subscriptionSitesLinkData', {"default": []}).value;
			var aSubscriptionCategoryData = ns1blankspace.util.getParam(oParam, 'subscriptionCategoryData', {"default": []}).value;
			var aSubscriptionScopeData = ns1blankspace.util.getParam(oParam, 'subscriptionScopeData', {"default": []}).value;
			var aSubscriptionStatusChangeData = ns1blankspace.util.getParam(oParam, 'subscriptionStatusChangeData', {"default": []}).value;
			var aSubscriptionCertificateData = ns1blankspace.util.getParam(oParam, 'subscriptionCertificateData', {"default": []}).value;
			var aSubscriptionsWithdrawn = ns1blankspace.util.getParam(oParam, 'subscriptionsWithdrawn', {"default": []}).value;

			if (ns1blankspace.objectContext != -1)
			{
				$.each(ns1blankspace.objectContextData.memberships, function()
				{
					var iSubscriptionId = this.id;
					var oSubscription = this;

					if ($('#ns1blankspaceMainMembership' + iSubscriptionId).html() != '')
					{

						var bWithdrawn = false;
						// Need to make sure we catch scenario where crops set to Wine Grapes
						var sCropsAfter = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
													function(x) {return $(x).html();}
															).join(', ');
						
						sCropsAfter = (this['agrisubscription.membership'] === nsFreshcare.data.membershipWIN || this['agrisubscription.membership'] === nsFreshcare.data.membershipVIT)
										? 'Wine Grapes'
										: sCropsAfter;

						var aCropsSorted = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
												function(x) 
												{
													return {value: $(x).html(), sortValue: $(x).html().toUpperCase()}
												})
												.sort(ns1blankspace.util.sortBy('value'));
						
						sCropsAfter = (sCropsAfter === 'Wine Grapes') ? sCropsAfter : $.map(aCropsSorted, function(x) {return x.value}).join(', '); 

						aSubscriptionsData.push(
						{
							id: this.id,
							contactbusiness: (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '',
							contactperson: (ns1blankspace.objectContextData) ? ns1blankspace.objectContextData['contactbusiness.contactperson.id'] : '',
							membership: this['agrisubscription.membership'],
							codeofpractice: $('#ns1blankspaceMembership' + iSubscriptionId + 'COP').attr('data-id'),
							status: $('#ns1blankspaceMembership' + iSubscriptionId + 'Status').attr('data-id'),
							startdate: $('#ns1blankspaceMembership' + iSubscriptionId + 'Start').val(),
							enddate: $('#ns1blankspaceMembership' + iSubscriptionId + 'End').val(),
							firstcertified: $('#ns1blankspaceMembership' + iSubscriptionId + 'FirstCertified').val(),
							expirymonth: $('#ns1blankspaceMembership' + iSubscriptionId + 'ExpiryMonth').attr('data-id'),
							expirychangereason: $('#ns1blankspaceMembership' + iSubscriptionId + 'ExpiryChangeReason').val(),
							crop: sCropsAfter,
							harvestmonth: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembership' + iSubscriptionId + 'HarvestMonthsUpdate'})
						});

						// Check if status has changed and add relevant status transaction
						if (oSubscription['agrisubscription.status'] != $('#ns1blankspaceMembership' + iSubscriptionId + 'Status').attr('data-id'))
						{
							aSubscriptionStatusChangeData.push(
							{
								subscription: iSubscriptionId,
								changedate: dToday.toString('dd MMM yyyy'),
								fromstatus: oSubscription['agrisubscription.status'],
								tostatus: $('#ns1blankspaceMembership' + iSubscriptionId + 'Status').attr('data-id'),
								changecontactbusiness: ns1blankspace.user.contactBusiness,
								changecontactperson: ns1blankspace.user.contactPerson,
								reason: $('#ns1blankspaceMembership' + iSubscriptionId + 'StatusChangeReason').val()
							});
							
							// v3.1.0 If subscription is being withdrawn, need to disable the user (checks to make sure not disabling user with active memberships are done later)
							// v3.1.2 SUP022442 If no certificate record, was erroring when trying to remove it
							// v3.1.2 SUP022966  Also set EndDate of Subscription if withdrawn
							// v3.2.005 SUP022047 Add to aSubscriptionsWithdrawn array so can email notification to CB
							if ($('#ns1blankspaceMembership' + iSubscriptionId + 'Status').attr('data-id') === nsFreshcare.data.grower.subscriptionStatusWD &&
								oSubscription['agrisubscription.status'] != nsFreshcare.data.grower.subscriptionStatusWD)
							{
								bWithdrawn = true;
								aSubscriptionStatusChangeData[aSubscriptionStatusChangeData.length -1].disableUser = (ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'] != ''
																						&& ns1blankspace.objectContextData['contactbusiness.contactperson.user.disabled'] == 'N');
								aSubscriptionsWithdrawn.push(
								{
									subscription: oSubscription.id,
									certificationBody: oSubscription['agrisubscription.agrilastaudit.auditbusiness'],
									membershipText: oSubscription['agrisubscription.membershiptext'], 
									reason: $('#ns1blankspaceMembership' + iSubscriptionId + 'StatusChangeReason').val()
								});
								aSubscriptionsData[aSubscriptionsData.length -1].enddate = dToday.toString('dd MMM yyyy');
								if (oSubscription['agrisubscription.agricertificate.id'] != '')
								{
									aSubscriptionCertificateData.push(
									{
										remove: true,
										id: oSubscription['agrisubscription.agricertificate.id']
									});
								}
							}

							// v3.1.2 SUP022442 If Membership is being reinstated and user is disabled, re-enable them. 
							// v3.1.2 SUP022966 Also remove endddate from subscription
							// v3.1.215 SUP023286 Instead of having to change to reinstated, works when changing from WD to any other status
							else if ($('#ns1blankspaceMembership' + iSubscriptionId + 'Status').attr('data-id') != nsFreshcare.data.grower.subscriptionStatusWD 
										&& oSubscription['agrisubscription.status'] == nsFreshcare.data.grower.subscriptionStatusWD)
							{
								if (ns1blankspace.objectContextData['contactbusiness.contactperson.user.id'] != ''
										&& ns1blankspace.objectContextData['contactbusiness.contactperson.user.disabled'] == 'Y')
								{
									aSubscriptionStatusChangeData[aSubscriptionStatusChangeData.length -1].enableUser = true;
								}
								// v3.1.2 SUP022433 Remove End date 
								if (oSubscription['agrisubscription.enddate'] != '')
								{
									aSubscriptionsData[aSubscriptionsData.length - 1].enddate = '';
								}
							}
						}

						if (!bWithdrawn)
						{
							// v3.1.0e Was adding certificates when certificate data didn't exist
							if ($('#ns1blankspaceMembership' + iSubscriptionId + 'CertificateNumber').is('*')
								&& ($('#ns1blankspaceMembership' + iSubscriptionId + 'CertificateNumber').val() != '' || $('#ns1blankspaceMembership' + iSubscriptionId + 'CertificateIssued').val() != '' 
									|| $('#ns1blankspaceMembership' + iSubscriptionId + 'Expires').val() != '' || $('#ns1blankspaceMembership' + iSubscriptionId + 'SentDate').val() != ''))
							{
								// v3.1.2 SUP022882 Need to check if Expiry Date needs to be updated and re-calculate if so
								if ($('input[name="radio' + iSubscriptionId + 'UpdateCertificateExpiry"]:checked').val() == 'Y')
								{
									if (nsFreshcare.data.auditor == undefined) {nsFreshcare.data.auditor = {}}
									if (nsFreshcare.data.auditor.jasanzDate == undefined)
									{
										nsFreshcare.data.auditor.jasanzDate = oSubscription['agrisubscription.agricertificate.audit.auditbusiness.se' + nsFreshcare.data.jasanzDateId];
									}
									$('#ns1blankspaceMembership' + iSubscriptionId + 'Expires').val(nsFreshcare.admin.certificate.certificateGetExpiry(
									{
										auditDate: new Date(oSubscription['agrisubscription.agricertificate.audit.actualdate']),
										expiry: new Date(oSubscription['agrisubscription.agricertificate.audit.actualdate']),
										expiryMonths: (oSubscription['agrisubscription.agricodeofpractice.auditdueafter'] != '' ? parseInt(oSubscription['agrisubscription.agricodeofpractice.auditdueafter']) : '0'),
										expiryAnniversary: ($('#ns1blankspaceMembership' + iSubscriptionId + 'ExpiryMonth').attr('data-id') != undefined ? parseInt($('#ns1blankspaceMembership' + iSubscriptionId + 'ExpiryMonth').attr('data-id')) : 0)
									}).toString('dd MMM yyyy'));
								}

								aSubscriptionCertificateData.push(
								{
									id: (oSubscription['agrisubscription.agricertificate.id'] != '') ? oSubscription['agrisubscription.agricertificate.id'] : undefined,
									subscription: iSubscriptionId,
									certificatenumber: $('#ns1blankspaceMembership' + iSubscriptionId + 'CertificateNumber').val(),
									/*startdate: $('#ns1blankspaceMembership' + iSubscriptionId + 'CertificateIssued').val(),*/
									dateissued: $('#ns1blankspaceMembership' + iSubscriptionId + 'CertificateIssued').val(),
									enddate: $('#ns1blankspaceMembership' + iSubscriptionId + 'Expires').val(),
									sent: $('input[name="radio' + iSubscriptionId + 'CertificateSent"]:checked').val(),
									sentdate: $('#ns1blankspaceMembership' + iSubscriptionId + 'SentDate').val(),
									audit: $('#ns1blankspaceMembership' + iSubscriptionId + 'Audit').attr('data-id')
								});
							}

						}

						// Now add Scope data 
						$.each($('#ns1blankspaceMembership' + iSubscriptionId + 'ScopeUpdate .nsFreshcareSelectable'), function()
						{	
							// First check if this scope was in the list before but is no longer selected
							var iScope = this.id.split('_').pop();;
							var bRemove = (oSubscription.scopeValues && !$(this).hasClass('nsFreshcareSelected'))
											? ($.grep(oSubscription.scopeValues, function(x) {return x.scope === iScope}).length > 0)
											: false;

							// v3.1.2 Only save if we're adding or removing
							if (bRemove || ($(this).hasClass('nsFreshcareSelected') && $(this).attr('data-id') == undefined))
							{
								aSubscriptionScopeData.push(
								{
									id: $(this).attr('data-id'),
									object: nsFreshcare.objectSubscription,
									objectcontext: iSubscriptionId,
									scope: this.id.split('_').pop(),
									remove: bRemove
								});
							}
						});

						// Now add Category data (product groups)
						$.each($('#ns1blankspaceMembership' + iSubscriptionId + 'ProductGroupUpdate .nsFreshcareSelectable'), function()
						{	
							// First check if this productcategory was in the list before but is no longer selected
							var iProductCategory = this.id.split('_').pop();;
							var bRemove = (oSubscription.productGroups && !$(this).hasClass('nsFreshcareSelected'))
											? ($.grep(oSubscription.productGroups, function(x) {return x.productcategory === iProductCategory}).length > 0)
											: false;

							// v3.1.2 Only save if we're adding or removing
							if (bRemove || ($(this).hasClass('nsFreshcareSelected') && $(this).attr('data-id') == undefined))
							{
								aSubscriptionCategoryData.push(
								{
									id: $(this).attr('data-id'),
									subscription: iSubscriptionId,
									productcategory: this.id.split('_').pop(),
									remove: bRemove
								});
							}
						});

						// Now add Sites data - we actually only need the details of the source address and link here
						$.each($('#ns1blankspaceMembership' + iSubscriptionId + 'MembershipSiteUpdate .nsFreshcareSelectable'), function()
						{	
							// First check if this address was in the list before but is no longer selected
							var iAddress = this.id.split('_').pop();
							var bRemove = (oSubscription.membershipSites && !$(this).hasClass('nsFreshcareSelected'))
											? ($.grep(oSubscription.membershipSites, function(x) {return x.id === iAddress}).length > 0)
											: false;

							// v3.1.2 Only save if we're adding or removing
							if (bRemove || ($(this).hasClass('nsFreshcareSelected') && $(this).attr('data-linkid') == undefined))
							{
								aSubscriptionSitesLinkData.push(
								{
									address: this.id.split('_').pop(),
									object: nsFreshcare.objectSubscription,
									objectContext: iSubscriptionId,
									id: $(this).attr('data-linkid'),
									remove: bRemove
								});
							}
						});

						// v3.1.2 SUP022693 Special checks for Freshcare. Notify user if they've updated Scope, Crops, Sites or Category and most recent audit is scopeExtension 
						if (oSubscription['agrisubscription.agrilastaudit.type'] == nsFreshcare.data.audit.typeScopeExtension  
							&& (oSubscription['agrisubscription.crop'] != sCropsAfter
								|| aSubscriptionScopeData.length > 0 || aSubscriptionCategoryData.length > 0 || aSubscriptionSitesLinkData.length > 0))
						{
							ns1blankspace.container.confirm({title: 'Membership Scope changed!', 
															 html: 'You have changed the scope of the ' + oSubscription['agrisubscription.mebershiptext'] + ' membership.<br /><br />' +
																		'Please note that the most recent audit dated ' + oSubscription['agrisubscription.agrilastaudit.actualdate'] +
																		' is a Scope Extension audit.<br /><br />' +
																		'Please check the Scope Extension tab on this Audit to ensure the certificate remains current.'});
						}

					}
				});
			}
			
			// A New Membership has been added
			if ($('#ns1blankspaceMainNewMembership').html() != '')
			{
				// Need to make sure we catch scenario where crops set to Wine Grapes
				var sCropsAfter = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
											function(x) {return $(x).html();}
													).join(', ');
				
				sCropsAfter = (this['agrisubscription.membership'] === nsFreshcare.data.membershipWIN || this['agrisubscription.membership'] === nsFreshcare.data.membershipVIT)
								? 'Wine Grapes'
								: sCropsAfter;

				var aCropsSorted = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
										function(x) 
										{
											return {value: $(x).html(), sortValue: $(x).html().toUpperCase()}
										})
										.sort(ns1blankspace.util.sortBy('value'));
				
				sCropsAfter = (sCropsAfter === 'Wine Grapes') ? sCropsAfter : $.map(aCropsSorted, function(x) {return x.value}).join(', '); 

				aSubscriptionsData.push(
				{
					contactbusiness: (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '',
					contactperson: (ns1blankspace.objectContextData) ? ns1blankspace.objectContextData['contactbusiness.contactperson.id'] : '',
					membership: $('#ns1blankspaceMembership').attr('data-id'),
					codeofpractice: $('#ns1blankspaceMembershipCOP').attr('data-id'),
					status: $('#ns1blankspaceMembershipStatus').attr('data-id'),
					startdate: $('#ns1blankspaceMembershipStart').val(),
					laststatuschangedate: $('#ns1blankspaceMembershipStart').val(),
					firstcertified: $('#ns1blankspaceMembershipFirstCertified').val(),
					harvestmonth: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembershipHarvestMonthsUpdate'}),
					crop: sCropsAfter
				});
				oParam.newMembership = true;

				aSubscriptionStatusChangeData.push( 
				{
					subscription: '',
					changedate: $('#ns1blankspaceMembershipStart').val(),
					tostatus: $('#ns1blankspaceMembershipStatus').attr('data-id'),
					changecontactbusiness: ns1blankspace.user.contactBusiness,
					changecontactperson: ns1blankspace.user.contactPerson
				});

				// Now add Scope data 
				$.each($('#ns1blankspaceMembershipScopeUpdate .nsFreshcareSelected'), function()
				{	
					aSubscriptionScopeData.push(
					{
						object: nsFreshcare.objectSubscription,
						objectcontext: '',
						scope: this.id.split('_').pop()
					});
				});

				// Now add Category data (product groups)
				$.each($('#ns1blankspaceMembershipProductGroupUpdate .nsFreshcareSelected'), function()
				{	
					aSubscriptionCategoryData.push(
					{
						subscription: '',
						productcategory: this.id.split('_').pop()
					});
				});

				// We assume that if it's a completely new grower, then ALL sites are selected and this is done in the save mechanism as we don't have the id's yet
				if (ns1blankspace.objectContext != -1)
				{
					// Now add Sites data - we actually only need the details of the source address and link here
					$.each($('#ns1blankspaceMembershipMembershipSiteUpdate .nsFreshcareSelected'), function()
					{	
						aSubscriptionSitesLinkData.push(
						{
							address: this.id.split('_').pop(),
							object: nsFreshcare.objectSubscription,
							objectcontext: ''
						});
					});
				}
			}

			//aSubscriptionCategoryData = $.map(aSubscriptionCategoryData, function(x) {if (x.remove == false || x.remove == undefined) {delete(x.remove);} return x;});
			//aSubscriptionSitesLinkData = $.map(aSubscriptionSitesLinkData, function(x) {if (x.remove == false || x.remove == undefined) {delete(x.remove);} return x;});

			oParam.membershipTab = true;
			oParam.subscriptionsData = aSubscriptionsData;
			oParam.subscriptionCategoryData = aSubscriptionCategoryData;
			oParam.subscriptionScopeData = aSubscriptionScopeData;
			oParam.subscriptionSitesLinkData = aSubscriptionSitesLinkData;
			oParam.subscriptionStatusChangeData = aSubscriptionStatusChangeData;
			oParam.subscriptionCertificateData = aSubscriptionCertificateData;
			oParam.subscriptionsWithdrawn = aSubscriptionsWithdrawn;
		
			fFunctionSave(oParam);
		}
	},				

	membership: 
	{
		layout: function (oParam) 	
		{
			var aHTMLTR = [];
			var aHTMLDIV = [];
			var sParentNamespace = ns1blankspace.util.getParam(oParam, 'parentNamespace', {'default': ns1blankspace.objectParentName}).value;
			var sNamespace = ns1blankspace.util.getParam(oParam, 'namespace', {'default': ns1blankspace.objectName}).value;
			var oNS = ns1blankspace.rootnamespace;


			if (sNamespace) 
			{
				if (sParentNamespace) 
				{
					oNS = oNS[sParentNamespace][sNamespace];
				}
				else 
				{
					oNS = oNS[sNamespace];
				}
			}	

			$(ns1blankspace.objectContextData.memberships).each(function() 
			{	
				aHTMLTR.push('<tr><td id="ns1blankspaceControl-' + this.id + '" class="ns1blankspaceControl ns1blankspaceMembership">' +
									this["agrisubscription.membershiptext"] + '</td></tr>');

				aHTMLDIV.push('<div id="ns1blankspaceMainMembership' + this.id + '" class="ns1blankspaceControlMain"></div>');
			});

			var aHTML = [];

			if (aHTMLTR.length > 0) 
			{	
				aHTML.push('<table class="ns1blankspaceControl">');
				aHTML.push(aHTMLTR.join(''));
				aHTML.push('</table>');
			}
			
			$('table.ns1blankspaceControl :last').append(aHTML.join(''));	
			$('#ns1blankspaceMain').append(aHTMLDIV.join(''));

			// Bind to specified namespace passed by oParam
			$(ns1blankspace.objectContextData.memberships).each(function()
			{
				var oMembership = this;
				$('#ns1blankspaceControl-' + this.id).click(function(event)
				{
					ns1blankspace.show({selector: '#ns1blankspaceMainMembership' + (this.id).split('-').pop(),
										context: 
										{
											new: true, 
											action: oNS.readOnly,
											actionOptions: (nsFreshcare.user.role.toLowerCase() != 'admin'), 
											inContext: false
										}});
					oNS.membership.show({membership: (this.id).split('-')[1], membershipData: oMembership});
				});
			});	
		},	

		'new': function(oParam)
		{
			// This is used to add a new membership to an existing grower and also when adding a completely new grower
			// We don't show sites for new growers as we assume that all of the sites will be added to the membership. If not, the user can change later.
			var aHTML = [];
			var sCurrentMemberships;

			if (ns1blankspace.objectContext != -1 
				&& ns1blankspace.objectContextData.memberships)
			{
				sCurrentMemberships = $.map(ns1blankspace.objectContextData.memberships, function(x) {return x['agrisubscription.membership']}).join(',');
			}

			aHTML.push('<table class="ns1blankspaceContainer">' +
							'<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceNewMembershipColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceNewMembershipColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>' + 
							'</table>');					
			
			$('#ns1blankspaceMainNewMembership').html(aHTML.join(''));
			
			aHTML = [];

			aHTML.push('<table class="ns1blankspace">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Membership' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceMembership" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Membership"' + 
								' data-method="AGRI_MEMBERSHIP_SEARCH"' +
								' data-methodFilter="code-TEXT_IS_LIKE|description-TEXT_IS_LIKE|' +
									'status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive + 
									((sCurrentMemberships) ? '|id-NOT_IN_LIST-' + sCurrentMemberships : '') + '"' + 
								' data-click="nsFreshcare.admin.grower.membership.defaultCodeOfPractice"' + 
								'>' +
							'</td></tr>');		

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Code of Practice' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceMembershipCOP" class="ns1blankspaceSelect"' +
								' data-mandatory="1" data-caption="Code of Practice"' + 
								' data-method="AGRI_CODE_OF_PRACTICE_SEARCH"' +
								' data-columns="code-space-description"' + 
								' data-parent="ns1blankspaceMembership"' + 
								' data-parent-search-id="membership"' +
								'>' +
							'</td></tr>');		

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Start Date' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceMembershipStart" class="ns1blankspaceDate"' +
								' data-mandatory="1" data-caption="Start Date"' + 
								'>' +
							'</td></tr>');		

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Current Status' +
							'</td></tr>' +
							'<tr class="ns1blankspace ns1blankspaceHideOnEdit">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceMembershipStatus" class="ns1blankspaceSelect"' +
								' data-method="SETUP_AGRI_SUBSCRIPTION_STATUS_SEARCH"' +
								' data-mandatory="1" data-caption="Current Status"' + 
								'>' +
							'</td></tr>');		

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption" style="text-align:left;">' +
								'<span style="text-align:left;">Harvest Months</span>&nbsp; ' + 
								'<span style="font-size:0.825em;text-align:right;">' + 
									'<a href="#" id="nsFreshcareMembershipHarvestMonthsAll">[ All ]</a></span>' +
							'</td></tr>' +
							'<tr id="ns1blankspaceMembershipRowHarvestMonths" class="nsFreshcareReadOnly">' +
							'<td class="ns1blankspaceText" id="ns1blankspaceMembershipHarvestMonthsUpdate">' +
							'</td>' + 
							'</tr>');	

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption style="padding-top:10px;"">' +
							'Crops' +
							'</td></tr>' +
							'<tr><td id="ns1blankspaceMembershipCellCrops" class="ns1blankspaceText">' +
							'<input id="ns1blankspaceMembershipCropsUpdate"' +
								' class="ns1blankspaceSelect ns1blankspaceWatermark"' +
								' data-mandatory="1" data-caption="Crops"' + 
								' data-multiselect="true"' +
								' data-method="SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH"' +
								' data-methodFilter="title-TEXT_IS_LIKE|element-EQUAL_TO-' + nsFreshcare.structureElementCrops + '"' +
								' data-membership=""' +
								' maxlength="300"' +
								' value="Search for valid Crops">' +
							'</td>' + 
							'</tr>' );

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption" style="padding-top:10px;">' +
							'Scope' +
							'</td></tr>' +
						'<tr class="nsFreshcareReadOnly">' +
							'<td id="ns1blankspaceMembershipScopeUpdate" class="ns1blankspaceText">' +
							'<table class="ns1blankspace" style="margin-bottom:7px;">');

			$.each(nsFreshcare.data.scopeOptions, function() 
			{
				aHTML.push('<tr><td id="nsFreshcareScope-_' + this.id + '" ' + 
								'class="nsFreshcareScope nsFreshcareSelectable">' + this.title + '</td>' + 
								'</tr>');
			});

			aHTML.push('</table>' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceCaption" style="padding-top:10px;">' +
							'Category' +
							'</td></tr>' +
						'<tr class="nsFreshcareReadOnly">' +
							'<td id="ns1blankspaceMembershipProductGroupUpdate" class="ns1blankspaceText">' +
							'<table class="ns1blankspace" style="margin-bottom:7px;">');

			$.each(nsFreshcare.data.productGroups, function() 
			{
				aHTML.push('<tr><td id="nsFreshcareProductGroup-_' + this[0] + '" ' + 
								'class="nsFreshcareProductGroup nsFreshcareSelectable">' + this[1] + '</td>' + 
								'</tr>');
			});

			aHTML.push('</table>' +
							'</td></tr>');

			if (ns1blankspace.objectContext != -1 && ns1blankspace.objectContextData.sites)
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption" style="padding-top:10px;">' +
								'Sites' +
								'</td></tr>' +
								'<tr class="nsFreshcareReadOnly">' +
								'<td id="ns1blankspaceMembershipMembershipSiteUpdate" class="ns1blankspaceText">' +
								'<table class="ns1blankspace" style="margin-bottom:7px;">');

				$.each(ns1blankspace.objectContextData.sites, function() 
				{
					if (this.status != '3')
					{
						var sAddress = (this.address1 + ((this.address2 != '') ? ' ' + this.address2 : '') + ' ' +
									   this.addresssuburb + ' ' + this.addressstate + ' ' + this.addresspostcode).formatXHTML();

						
						aHTML.push('<tr><td id="nsFreshcareMembershipSite-_' + this.id + '" ' + 
										'class="nsFreshcareMembershipSite nsFreshcareSelectable">' + sAddress + '</td>' + 
										'</tr>');
					}
				});
			}

			aHTML.push('</table>');
			
			aHTML.push('</td></tr>');

			$('#ns1blankspaceNewMembershipColumn1').html(aHTML.join(''));

			$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

			// Default to membership to Priority Membership if no Memberships exist yet
			if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.memberships && ns1blankspace.objectContextData.memberships.length === 0)
			{
				$('#ns1blankspaceMembership').attr('data-id', ns1blankspace.objectContextData['contactbusiness.agribusiness.prioritymembership']);
				$('#ns1blankspaceMembership').val(ns1blankspace.objectContextData['contactbusiness.agribusiness.prioritymembershiptext'].formatXHTML());
			}
			else if (ns1blankspace.objectContext === -1 && $('#ns1blankspaceMainDetails').html() != '')
			{
				$('#ns1blankspaceMembership').attr('data-id', $('#ns1blankspaceDetailsPriorityMembership').attr('data-id'));
				$('#ns1blankspaceMembership').val($('#ns1blankspaceDetailsPriorityMembership').val());
			}

			// Default the COP and if VIT / WIn, set Crops, Category & scope
			// v3.1.2 SUP022744 Added defaultWineryValues code
			if ($('#ns1blankspaceMembership').attr('data-id'))
			{
				ns1blankspace.xhtml.divID = 'ns1blankspaceMembership';
				nsFreshcare.admin.grower.membership.defaultCodeOfPractice();
				nsFreshcare.admin.grower.membership.defaultWineryValues({membership: $('#ns1blankspaceMembership').attr('data-id')});
			}

			// Default Membership Status to Foundation member
			$('#ns1blankspaceMembershipStatus').attr('data-id', nsFreshcare.data.grower.subscriptionStatusFM);
			$('#ns1blankspaceMembershipStatus').val('Foundation Member');

			nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceMembershipHarvestMonthsUpdate',
																	 values: '',
																	 update: true,
																	 context: 'Update'});

			if (nsFreshcare.data.memberships.length === 1)
			{
				$('$ns1blankspaceMembership').val(nsFreshcare.data.memberships[0].title);
				$('$ns1blankspaceMembership').attr('data-id', nsFreshcare.data.memberships[0].id);
			}

			// Bind the Harvest Months All button
			$('#nsFreshcareMembershipHarvestMonthsAll')
				.click(function(event)
				{
					if ($(this).html() === '[ All ]')
					{
						$.each($('.nsFreshcareHarvestMonthsUpdate'), function()
						{
							$(this).addClass('nsFreshcareHarvestMonthsSelected');
							$(this).removeClass('nsFreshcareHarvestMonths');
						});
						$(this).html('[ None ]');
					}
					else
					{
						$.each($('.nsFreshcareHarvestMonthsUpdate'), function()
						{
							$(this).addClass('nsFreshcareHarvestMonths');
							$(this).removeClass('nsFreshcareHarvestMonthsSelected');
						});
						$(this).html('[ All ]');
					}
				});

			// Bind the Scope area
			$('.nsFreshcareScope').click(function() 
			{
				nsFreshcare.external.grower.manageMultiRows(this.id)
			});

			// Bind the Category (Product Groups) area
			$('.nsFreshcareProductGroup').click(function() 
			{
				nsFreshcare.external.grower.manageMultiRows(this.id)
			});

			// Bind the Membership Sites area
			$('.nsFreshcareMembershipSite').click(function() 
			{
				nsFreshcare.external.grower.manageMultiRows(this.id)
			});

		},

		show: 	function(oParam) 
		{
			var aHTML = [];
			var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
			var oMembership = ns1blankspace.util.getParam(oParam, 'membershipData').value;
			var aMonths = $.grep(ns1blankspace.data.search, function(x) {return x.method == 'FRESHCARE_MONTH_SEARCH'}).shift().rows;

			if (iMembership == undefined || oMembership == undefined) 
			{
				alert('Sorry can\'t find this membership.');
			}
			else if (iMembership != undefined && oMembership != undefined && oMembership.productGroups === undefined)
			{
				// Get Product Groups for this Membership
				if (oParam.onComplete) {oParam.onCompleteWhenCan = oParam.onComplete}
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.show);
				nsFreshcare.external.grower.productGroups.search(oParam);
			}
			else if (iMembership != undefined && oMembership != undefined && oMembership.membershipSites === undefined)
			{
				// Get Sites linked to this Membership
				if (oParam.onComplete) {oParam.onCompleteWhenCan = oParam.onComplete}
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.show);
				nsFreshcare.external.grower.membershipSites.search(oParam);
			}
			else if (iMembership != undefined && oMembership != undefined && oMembership.scopeValues === undefined)
			{
				// v3.1.2 SUP022744 Get Scopes linked to this Membership
				if (oParam.onComplete) {oParam.onCompleteWhenCan = oParam.onComplete}
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.show);
				nsFreshcare.external.grower.scopeValues.search(oParam);
			}
			else
			{
				if ($('#ns1blankspaceMainMembership' + iMembership).attr('data-loading') == '1')
				{
					$('#ns1blankspaceMainDetails').attr('data-loading', '');
					
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Column1" class="ns1blankspaceColumn1"></td>' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Column2" class="ns1blankspaceColumn2"></td>' +
									'</tr>' + 
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Row2" class="ns1blankspaceLarge" colspan="2" style="width:100%">' +
									'</td></tr>' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Row3" class="ns1blankspaceLarge" colspan="2" style="width:100%">' +
									'</td></tr>' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Row4" class="ns1blankspaceLarge" colspan="2" style="width:100%">' +
									'</td></tr>' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Row5" class="ns1blankspaceLarge" colspan="2" style="width:100%">' +
									'</td></tr>' +
									'</table>');					
					
					$('#ns1blankspaceMainMembership' + iMembership).html(aHTML.join(''));
					
					var aHTML = [];
					var oElements = [];

					aHTML.push('<table class="ns1blankspace">');
					
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Code of Practice' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'COP" class="ns1blankspaceSelect"' +
										' data-method="AGRI_CODE_OF_PRACTICE_SEARCH"' +
										' data-columns="code-space-description"' + 
										' data-methodFilter="code-TEXT_IS_LIKE|description-TEXT_IS_LIKE|membership-EQUAL_TO-' + oMembership['agrisubscription.membership'] + '"' + 
										'>' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Current Status' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'Status" class="ns1blankspaceSelect"' +
										' data-method="SETUP_AGRI_SUBSCRIPTION_STATUS_SEARCH"' +
										' data-membership="' + iMembership + '"' +
										' data-click="nsFreshcare.admin.grower.membership.statusChangeReason"' + 
										'>' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption nsFreshcareShowOnChangeStatus" style="display:none;">' +
									'<td class="ns1blankspaceCaption">' +
									'Reason for Change' +
									'</td></tr>' +
									'<tr class="ns1blankspace nsFreshcareShowOnChangeStatus" style="display:none;">' +
									'<td class="nsFreshcareTextMulti">' +
									'<textarea rows="4" cols=39" id="ns1blankspaceMembership' + iMembership + 'StatusChangeReason" class="ns1blankspaceTextMulti"></textarea>' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption nsFreshcareShowOnChangeStatus" style="display:none;">' +
									'<td class="ns1blankspaceCaption">' +
									'Changed By Business' +
									'</td></tr>' +
									'<tr class="ns1blankspace nsFreshcareShowOnChangeStatus" style="display:none;">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'StatusChangedByBusiness" class="nsFreshcareSelectGrower"' +
										' data-method="CONTACT_BUSINESS_SEARCH"' +
										' data-methodFilter="contactbusiness.tradename-TEXT_IS_LIKE|contactbusiness.legalname-TEXT_IS_LIKE"' +
										'>' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption nsFreshcareShowOnChangeStatus" style="display:none;">' +
									'<td class="ns1blankspaceCaption">' +
									'Changed By Person' +
									'</td></tr>' +
									'<tr class="ns1blankspace nsFreshcareShowOnChangeStatus" style="display:none;">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'StatusChangedByPerson" class="nsFreshcareSelectGrower"' +
										' data-method="CONTACT_PERSON_SEARCH"' +
										' data-columns="firstname-space-surname-space-openbracket-contactbusinesstext-closebracket"' +
										' data-parent="ns1blankspaceMembership' + iMembership + 'StatusChangedByBusiness"' +
										' data-parent-search-id="contactbusiness"' +
										' data-parent-search-text="tradename"' +
										' data-methodFilter="contactperson.firstname-TEXT_IS_LIKE|contactperson.surname-TEXT_IS_LIKE|' +
															'contactperson.contactbusinesstext-TEXT_IS_LIKE"' +
										'>' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Last Status Change Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceDate"' +
										((nsFreshcare.supportAdmin)
											? '><input id="ns1blankspaceMembership' + iMembership + 'LastStatusChanged" class="ns1blankspaceDate">'
											: ' id=""ns1blankspaceMembership' + iMembership + 'LastStatusChanged"'
										) +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Start Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
										'<input id="ns1blankspaceMembership' + iMembership + 'Start" class="ns1blankspaceDate">' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'End Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceDate">' +
										'<input id="ns1blankspaceMembership' + iMembership + 'End" class="ns1blankspaceDate">' + 
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'First Certified' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceDate">' +
										'<input id="ns1blankspaceMembership' + iMembership + 'FirstCertified" class="ns1blankspaceDate">' + 
									'</td></tr>');		

					// v3.1.2 SUP022693 Added Expiry Month field
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Re-Certification Audit Due' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceSelect">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'ExpiryMonth" class="ns1blankspaceSelect"' +
										' data-method="FRESHCARE_MONTH_SEARCH"' +
										' data-cache="true" data-click="nsFreshcare.admin.grower.membership.expiryMonthChangeReason"' +
										'>' +
									'</td></tr>');		

					// v3.1.2 SUP022693 Added Expiry Change Reason fields
					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceExpiryMonthChange">' +
									'<td class="ns1blankspaceCaption" id="ns1blankspaceMembership' + iMembership + 'ExpiryChangedCaption">' +
									'Last Changed...' +
									'</td></tr>' +
									'<tr class="ns1blankspace ns1blankspaceExpiryMonthChange">' +
									'<td class="nsFreshcareReadOnly" id="ns1blankspaceMembership' + iMembership + 'ExpiryChanged">' +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceExpiryMonthChange">' +
									'<td class="ns1blankspaceCaption" id="ns1blankspaceMembership' + iMembership + 'ExpiryChangeReasonCaption">' +
									'Reason for Changing' +
									'</td></tr>' +
									'<tr class="ns1blankspace ns1blankspaceExpiryMonthChange">' +
									'<td class="nsFreshcareReadOnly" id="ns1blankspaceMembership' + iMembership + 'ExpiryChangeReasonContainer">' +
										'&nbsp;' +
									'</td></tr>');		

					// Only show Certificate fields if one exists
					if (oMembership["agrisubscription.agricertificate.id"] != '')
					{
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Number' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
											'<input  id="ns1blankspaceMembership' + iMembership + 'CertificateNumber" class="ns1blankspaceText">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Issued' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
											'<input  id="ns1blankspaceMembership' + iMembership + 'CertificateIssued" class="ns1blankspaceDate">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Expires' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceDate">' +
											'<input  id="ns1blankspaceMembership' + iMembership + 'Expires" class="ns1blankspaceDate">' +
										'</td></tr>');		

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Sent?' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceText">' +
											'<input type="radio" id="radio' + iMembership + 'CertificateSentY" name="radio' + iMembership + 'CertificateSent" value="Y"/>Yes&nbsp;&nbsp;' +
											'<input type="radio" id="radio' + iMembership + 'CertificateSentN" name="radio' + iMembership + 'CertificateSent" value="N"/>No' +
										'</td></tr>');		
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Sent Date' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceDate">' +
											'<input  id="ns1blankspaceMembership' + iMembership + 'SentDate" class="ns1blankspaceDate">' +
										'</td></tr>');		
						

						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Audit' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td class="ns1blankspaceDate">' +
											'<input  id="ns1blankspaceMembership' + iMembership + 'Audit" class="ns1blankspaceSelect"' +
											' data-method="AUDIT_SEARCH"' +
											' data-columns="actualdate-space-typetext-space-codeofpracticetext"' + 
											' data-methodFilter="membershipstatus-IS_NOT_NULL-|subscription-EQUAL_TO-' + iMembership + '|' +
																'contactbusiness-EQUAL_TO-' + ns1blankspace.objectContext + '"' + 
										'></td></tr>');	
					}
					else
					{
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'[No Certificate]' +
										'</td></tr>');		
					}

					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption" style="text-align:left;">' +
										'<span style="text-align:left;">Harvest Months</span>&nbsp; ' + 
										'<span style="font-size:0.825em;text-align:right;">' + 
											'<a href="#" id="nsFreshcareMembership' + iMembership + 'HarvestMonthsAll">[ All ]</a></span>' +
									'</td></tr>' +
									'<tr id="ns1blankspaceMembership' + iMembership + 'RowHarvestMonths" class="nsFreshcareReadOnly">' +
									'<td class="ns1blankspaceText" id="ns1blankspaceMembership' + iMembership + 'HarvestMonthsUpdate">' +
									'</td>' + 
									'</tr>');	

					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption">' +
									'Crops' +
									'</td></tr>' +
									'<tr><td id="ns1blankspaceMembership' + iMembership + 'CellCrops" class="ns1blankspaceText">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'CropsUpdate"' +
										' class="ns1blankspaceSelect ns1blankspaceWatermark"' +
										' data-multiselect="true"' +
										' data-method="SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH"' +
										' data-methodFilter="title-TEXT_IS_LIKE|element-EQUAL_TO-' + nsFreshcare.structureElementCrops + '"' +
										' data-membership="' + iMembership + '"' +
										' maxlength="300"' +
										' value="Search for valid Crops">' +
									'</td>' + 
									'</tr>' );

					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption">' +
									'Scope' +
									'</td></tr>' +
								'<tr class="nsFreshcareReadOnly">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'ScopeUpdate" class="ns1blankspaceText">' +
									'<table class="ns1blankspace" style="margin-bottom:7px;">');

					$.each(nsFreshcare.data.scopeOptions, function() 
					{
						aHTML.push('<tr><td id="nsFreshcareScope-' + iMembership + '_' + this.id + '" ' + 
										'class="nsFreshcareScope nsFreshcareSelectable">' + this.title + '</td>' + 
										'</tr>');
					});

					aHTML.push('</table>' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption">' +
									'Category' +
									'</td></tr>' +
								'<tr class="nsFreshcareReadOnly">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'ProductGroupUpdate" class="ns1blankspaceText">' +
									'<table class="ns1blankspace" style="margin-bottom:7px;">');

					$.each(nsFreshcare.data.productGroups, function() 
					{
						aHTML.push('<tr><td id="nsFreshcareProductGroup-' + iMembership + '_' + this[0] + '" ' + 
										'class="nsFreshcareProductGroup nsFreshcareSelectable">' + this[1] + '</td>' + 
										'</tr>');
					});

					aHTML.push('</table>' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption">' +
									'Sites' +
									'</td></tr>' +
									'<tr class="nsFreshcareReadOnly">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'MembershipSiteUpdate" class="ns1blankspaceText">' +
									'<table class="ns1blankspace" style="margin-bottom:7px;">');

					$.each(ns1blankspace.objectContextData.sites, function() 
					{
						if (this.status != '3')		// (3 = non-active)
						{
							var sAddress = (this.address1 + ((this.address2 != '') ? ' ' + this.address2 : '') + ' ' +
										   this.addresssuburb + ' ' + this.addressstate + ' ' + this.addresspostcode).formatXHTML();
							
							aHTML.push('<tr><td id="nsFreshcareMembershipSite-' + iMembership + '_' + this.id + '"' + 
											' data-addressid="' + this.id + '"' +
											' class="nsFreshcareMembershipSite nsFreshcareSelectable">' + sAddress + '</td>' + 
											'</tr>');
						}
					});
					aHTML.push('</table>');
					
					aHTML.push('</td></tr>');

					$('#ns1blankspaceMembership' + iMembership + 'Column1').html(aHTML.join(''));

					// v3.1.2 SUP022859 Disable fields if readonly access
					if (nsFreshcare.admin.grower.readOnly == true)
					{
						$('#ns1blankspaceMembership' + iMembership + 'Column1 input').attr('disabled', true).addClass('nsFreshcareDisabled');
					}

					// v3.1.2 SUP022693 Don't show Expiry Change fields unless they're populated
					if (oMembership['agrisubscription.expirychangereason'] != '')
					{
						$('#ns1blankspaceMainMembership' + iMembership + ' .ns1blankspaceExpiryMonthChange').show();
					}
					else
					{
						$('#ns1blankspaceMainMembership' + iMembership + ' .ns1blankspaceExpiryMonthChange').hide();
					}


					// Display Membership Actions
					aHTML = [];
					aHTML.push('<table class="ns1blankspace">');
					
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td>' +
									'&nbsp;</td>' +
									'<td class="ns1blankspaceCaption" style="text-align:right;">');

					// v3.1.2 SUP022859 Display only if not readonly
					if (!nsFreshcare.admin.grower.readOnly == true)
					{
						if (oMembership['agrisubscription.status'] != nsFreshcare.data.grower.subscriptionStatusWD)
						{
							aHTML.push('<table class="ns1blankspace" width="150px">');		

							if (oMembership['agrisubscription.agricertificate.id'] != '')
							{
								aHTML.push('<tr><td><span id="ns1blankspaceGrowerMembershipCertificatePrint-' + iMembership + '"' +
												' class="ns1blankspaceAction" style="width:145px;"' +
												' data-certificate="' + oMembership['agrisubscription.agricertificate.id'] + '">' +
											'</span></td></tr>');

								aHTML.push('<tr><td><span id="ns1blankspaceGrowerMembershipCertificateEmail-' + iMembership + '"' +
												' class="ns1blankspaceAction" style="width:145px;"' +
												' data-certificate="' + oMembership['agrisubscription.agricertificate.id'] + '">' +
											'</span></td></tr>');

								aHTML.push('<tr><td><span id="ns1blankspaceGrowerMembershipCertificateExport-' + iMembership + '"' +
												' class="ns1blankspaceAction" style="width:145px;"' +
												' data-certificate="' + oMembership['agrisubscription.agricertificate.id'] + '">' +
											'</span></td></tr>');
								
								aHTML.push('<tr><td><div id="ns1blankspaceGrowerMembershipCertificateExportDownload-' + iMembership + '"' +
												' class="ns1blankspaceAction" style="text-align: right;">' +
											'</div></td></tr>');

								aHTML.push('<tr><td>&nbsp;</td></tr>');
							}

							aHTML.push('<tr><td><span id="ns1blankspaceAuditAdd' + iMembership + '"' +
											' class="ns1blankspaceAction" style="text-align: right;width: 145px;">Register Audit' +
											'</span>');

							aHTML.push('<tr><td>&nbsp;</td></tr>');

							aHTML.push('<tr><td><span id="ns1blankspaceMembershipRemove' + iMembership + '"' +
											' class="ns1blankspaceAction" style="text-align: right;width: 145px;">Remove Membership' +
											'</span>');

							aHTML.push('</table>');		
						}
						else
						{
							aHTML.push('Membership is Withdrawn');
						}

						aHTML.push('</td></tr>');
					}

					// Display System Info
					aHTML.push('<tr><td>&nbsp;</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption" style="font-size: 0.825em;text-align:right;" colspan="2">' +
									'System Information' +
									'</td></tr>');

					aHTML.push('<tr><td>&nbsp;</td>' +
								'<td class="nsFreshcareSystem" style="text-align:right; width:145px;">' +
									'<span style="font-size:1.125em;">Subscription</span>' +
									'<br /><br />' +
										'<b>Created On: </b><br />' + oMembership['agrisubscription.createddate'] +
									'<br /><br />' +
										'<b>Created By: </b><br />' + oMembership['agrisubscription.createdusertext'] +
									'<br /><br />' +
										'<b>Modified On: </b><br />' + oMembership['agrisubscription.modifieddate'] +
									'<br /><br />' +
										'<b>Modified By: </b><br />' + oMembership['agrisubscription.modifiedusertext'] +
								'</td></tr>');		

					if (oMembership["agrisubscription.agricertificate.id"] != '')
					{
						aHTML.push('<tr><td colspan="2">&nbsp;</td></tr>');

						aHTML.push('<tr><td>&nbsp;</td>' +
									'<td class="nsFreshcareSystem" style="text-align:right;width:145px;">' +
										'<span style="font-size:1.125em;">Certificate</span>' +
										'<br /><br />' +
											'<b>Created On: </b><br />' + oMembership['agrisubscription.agricertificate.createddate'] +
										'<br /><br />' +
											'<b>Created By: </b><br />' + oMembership['agrisubscription.agricertificate.createdusertext'] +
										'<br /><br />' +
											'<b>Modified On: </b><br />' + oMembership['agrisubscription.agricertificate.modifieddate'] +
										'<br /><br />' +
											'<b>Modified By: </b><br />' + oMembership['agrisubscription.agricertificate.modifiedusertext'] +
										'</td></tr>');		

					}
					//aHTML.push('</td><tr></table>');

					aHTML.push('</table>');

					aHTML.push('</td></tr>');
					
					$('#ns1blankspaceMembership' + iMembership + 'Column2').html(aHTML.join(''));

					$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

					// Set editable values
					$('#ns1blankspaceMembership' + iMembership + 'COP').val(oMembership["agrisubscription.codeofpracticetext"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'COP').attr('data-id', oMembership["agrisubscription.codeofpractice"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'Status').val(oMembership["agrisubscription.statustext"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'Status').attr('data-id', oMembership["agrisubscription.status"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'Start').val(oMembership["agrisubscription.startdate"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'End').val(oMembership["agrisubscription.enddate"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'FirstCertified').val(oMembership["agrisubscription.firstcertified"].formatXHTML());
					$('[name="radio' + iMembership + 'CertificateSent"][value="' + oMembership["agrisubscription.agricertificate.sent"] + '"]').attr('checked', true);
					$('#ns1blankspaceMembership' + iMembership + 'SentDate').val(oMembership["agrisubscription.agricertificate.sentdate"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'CertificateNumber').val(oMembership["agrisubscription.agricertificate.certificatenumber"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'CertificateIssued').val(oMembership["agrisubscription.agricertificate.dateissued"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'Expires').val(oMembership["agrisubscription.agricertificate.enddate"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'ExpiryMonth').attr('data-id', oMembership["agrisubscription.expirymonth"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'ExpiryMonth').val($.grep(aMonths, function(x) {return x.id == oMembership["agrisubscription.expirymonth"]}).shift().title);
					$('#ns1blankspaceMembership' + iMembership + 'ExpiryChanged').html(
						'On ' + oMembership["agrisubscription.expirychangeddate"] + ' by ' + oMembership["agrisubscription.expirychangedbyusertext"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'ExpiryChangeReasonContainer').html(oMembership["agrisubscription.expirychangereason"].formatXHTML());
					
					$('#ns1blankspaceMembership' + iMembership + 'LastStatusChanged').val(oMembership["agrisubscription.laststatuschangedate"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'Audit').val(oMembership["agrisubscription.agricertificate.audittext"].formatXHTML());
					$('#ns1blankspaceMembership' + iMembership + 'Audit').attr('data-id', oMembership["agrisubscription.agricertificate.audit"].formatXHTML());


					nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceMembership' + iMembership + 'HarvestMonthsUpdate',
																			 values: oMembership["agrisubscription.harvestmonth"].formatXHTML(),
																			 update: !(nsFreshcare.admin.grower.readOnly == true),
																			 context: 'Update' + iMembership,
																			 membership: iMembership});

					nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembership' + iMembership + 'CellCrops',
																			 values: oMembership["agrisubscription.crop"].formatXHTML(),
																			 update: !(nsFreshcare.admin.grower.readOnly == true),
																			 membership: iMembership});

					// List existing Scopes 
					var aValues = [];
					$.each(oMembership.scopeValues, function() 
					{
						if (this.scopetext != "") 
						{
							$('#nsFreshcareScope-' + iMembership + '_' + this.scope)
								.addClass("nsFreshcareSelected")
								.attr('data-id', this.id);
						}
					});

					// List existing Product Groups 
					var aValues = [];
					$.each(oMembership.productGroups, function() 
					{
						if (this.productcategorytext != "") 
						{
							$('#nsFreshcareProductGroup-' + iMembership + '_' + this.productcategory)
								.addClass("nsFreshcareSelected")
								.attr('data-id', this.id);
						}
					});

					
					// List existing Membership Sites 
					var aValues = [];
					$.each(oMembership.membershipSites, function() 
					{
						var sAddress = (this.address1 + ((this.address2 != '') ? ' ' + this.address2 : '') + ' ' +
									   this.addresssuburb + ' ' + this.addressstate + ' ' + this.addresspostcode).formatXHTML();

						// v2.0.3 - was saying 'this.categorytext'!
						if (sAddress != "") 
						{
							$('#nsFreshcareMembershipSite-' + iMembership + '_' + this.id)
								.addClass("nsFreshcareSelected")
								.attr('data-linkid', this['address.addresslink.id']);
						}
					});
					
					// Remove invalid selections for VIT and WIN Memberships
					// 3.1.2 Changed to function
					if (nsFreshcare.data.memberships)
					{
						nsFreshcare.admin.grower.membership.defaultWineryValues({subscription: oMembership});
					}
					
					// v3.1.2 SUP022859 Bind only if not readonly
					if (!nsFreshcare.admin.grower.readOnly == true)
					{
						// Bind the Harvest Months All button
						$('#nsFreshcareMembership' + iMembership + 'HarvestMonthsAll')
							.click(function(event)
							{
								if ($(this).html() === '[ All ]')
								{
									$.each($('.nsFreshcareHarvestMonthsUpdate'), function()
									{
										$(this).addClass('nsFreshcareHarvestMonthsSelected');
										$(this).removeClass('nsFreshcareHarvestMonths');
									});
									$(this).html('[ None ]');
								}
								else
								{
									$.each($('.nsFreshcareHarvestMonthsUpdate'), function()
									{
										$(this).addClass('nsFreshcareHarvestMonths');
										$(this).removeClass('nsFreshcareHarvestMonthsSelected');
									});
									$(this).html('[ All ]');
								}
							});

						// Bind the Scope area
						$('.nsFreshcareScope').click(function() {
							
							nsFreshcare.external.grower.manageMultiRows(this.id, iMembership)
						});

						// Bind the Category (Product Groups) area
						$('.nsFreshcareProductGroup').click(function() {
							
							nsFreshcare.external.grower.manageMultiRows(this.id, iMembership)
						});

						// Bind the Membership Sites area
						$('.nsFreshcareMembershipSite').click(function() {
							
							nsFreshcare.external.grower.manageMultiRows(this.id, iMembership)
						});

						// Bind the Print Certificate buttons
						nsFreshcare.admin.grower.membership.bind({membership: oMembership});
					}

					// Call functions to display audits, statustransactions & training Courses
					nsFreshcare.admin.grower.membership.audits.show({membershipData: oMembership, membership: iMembership});
					nsFreshcare.admin.grower.membership.statusTransactions.show({contactBusiness: ns1blankspace.objectContext, membership: iMembership});
					nsFreshcare.admin.grower.membership.trainingCourses.show({membershipData: oMembership, membership: iMembership});
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}	
			}

		},

		bind: function(oParam)
		{
			var oMembership = ns1blankspace.util.getParam(oParam, 'membership', {"default": undefined}).value;;
			var iMembership = (oMembership) ? oMembership.id : '';
			var oRoot = ns1blankspace.rootnamespace;

			$('#ns1blankspaceReinstateMembership' + iMembership).button(
			{
				label: 'Notify Freshcare to Reinstate',
				icons:
				{
					primary: "ui-icon-notice"
				}
			})
			.click(function()
			{
				nsFreshcare.auditor.grower.reinstateWithdrawnMembership(
				{
					membershipText: oMembership['agrisubscription.membershiptext'],
					contactBusiness: ns1blankspace.data.contactBusiness,
					contactBusinessText: ns1blankspace.data.contactBusinessText,
					contactPersonText: ns1blankspace.data.contactPersonText
				});
			});

			$('#ns1blankspaceGrowerMembershipCertificatePrint-' + iMembership)
				.button(
				{
					label: 'Print Certificate',
					icons: {primary: 'ui-icon-print'}
				})
				.click(function(event)
				{
					oRoot.admin.certificate.printIndividualCertificate({xhtmlElementID: this.id,
																			  certificate: $(this).attr('data-certificate'),
																			  outputOption: '1',
																			  buttons: {
																					label: 'Print Certificate',
																					icons: {primary: 'ui-icon-print'}
																						}
																			});
				});

			$('#ns1blankspaceGrowerMembershipCertificateEmail-' + iMembership)
				.button(
				{
					label: 'Email Certificate',
					icons: {primary: 'ui-icon-mail-closed'}
				})
				.click(function()
				{
					if (ns1blankspace.objectContextData['contactbusiness.contactperson.email'] != '')
					{
						var oParam = {
										xhtmlElementID: this.id,
										certificate: $(this).attr('data-certificate'),
										outputOption: '2',
										contactBusiness: ns1blankspace.objectContext,
										contactPerson: ns1blankspace.data.contactPerson,
										growerFirstName: ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'],
										growerSurname: ns1blankspace.objectContextData['contactbusiness.contactperson.surname'],
										growerEmail: ns1blankspace.objectContextData['contactbusiness.contactperson.email'],
										buttons: {
													label: 'Email Certificate',
													icons: {primary: 'ui-icon-mail-closed'}
												 }
									}
						oRoot.admin.certificate.printIndividualCertificate(oParam);
					}
					else
					{
						ns1blankspace.status.error('Cannot email Certificate - no email address!');
					}
				});

			$('#ns1blankspaceGrowerMembershipCertificateExport-' + iMembership)
				.button(
				{
					label: 'Export Certificate Data',
					icons: {primary: 'ui-icon-arrowthickstop-1-s'}
				})
				.click(function()
				{
					oRoot.admin.certificate.printIndividualCertificate({xhtmlElementID: this.id,
																			  certificate: $(this).attr('data-certificate'),
																			  outputOption: '3',
																			  buttons:  {
																					label: 'Export Certificate Data',
																					icons: {primary: 'ui-icon-arrowthickstop-1-s'}
																						},
																			  exportElementId: 'ns1blankspaceGrowerMembershipCertificateExportDownload-' + iMembership
																			});
				});

				$('#ns1blankspaceAuditAdd' + iMembership)
					.button(
					{
						icons: {primary: "ui-icon-plus"}
					})
					.click(function() 
					{
						
						var sLastCodeOfPractice;
						var sLastCodeOfPracticeText;
						var iLastAuditTitle;

						if (ns1blankspace.objectContextData.audits)
						{
							$($.grep(ns1blankspace.objectContextData.audits, function (a) {return a["audit.subscription"] == iMembership;})).each( function() 
							{

								sLastCodeOfPractice = this['audit.codeofpractice'];
								sLastCodeOfPracticeText = this['audit.codeofpracticetext'];
								iLastAuditTitle = this['audit.type'];
							});
						}

						oRoot.admin.audit.init({
										contactBusiness: ns1blankspace.data.contactBusiness,
										contactPerson: ns1blankspace.data.contactPerson,
										contactBusinessText: ns1blankspace.data.contactBusinessText,
										contactPersonText: ns1blankspace.data.contactPersonText,
										membership: iMembership,
										membershipText: oMembership['agrisubscription.membershiptext'],
										subscription: oMembership.id,
										lastTitle: iLastAuditTitle,
										"new": true
									});
					});

				$('#ns1blankspaceMembershipRemove' + iMembership)
					.button(
					{
						icons: {primary: "ui-icon-close"}
					})
					.click(function() 
					{
						ns1blankspace.container.confirm({title: 'Remove Membership',
														 html: 'Are you sure you want to remove the ' + oMembership['agrisubscription.membershiptext'] + ' membership?',
														 buttons: 
														 [
															{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
																click: function() 
																{
																	$(this).dialog('destroy');
																	nsFreshcare.admin.grower.membership.remove.validate(oParam);
																}
															},
															{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
																click: function() 
																{
																	$(this).dialog('destroy');
																	ns1blankspace.okToSave = false;
																	return;
																}
															}
														 ]
														});
					});
		},

		remove: 
		{
			validate: function(oParam)
			{
				// Cannot delete if Audits exist
				// If no audits, then will delete subscription, certificate, scope, statushistory and sites after confirmation
				var oMembership = ns1blankspace.util.getParam(oParam, 'membership', {"default": undefined}).value;;
				var iMembership = (oMembership) ? oMembership.id : '';
				var aText = [];
				var oData = {};
				var sMethod = '';

				if (oParam.removeMembershipValidateStep == undefined) {oParam.removeMembershipValidateStep = 1}

				if (iMembership == '' || iMembership == undefined || oMembership === undefined)
				{
					ns1blankspace.status.error('No Membership ' + (oMembership ? '' : 'ID') + ' passed to remove function!');
					return;
				}

				// First find if any audits
				if (oParam.removeMembershipValidateStep == 1)
				{
					ns1blankspace.status.working('Finding Audits');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AUDIT_SEARCH';
					oSearch.addField('reference,actualdate,audit.agrisubscription.membershiptext');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addFilter('subscription', 'EQUAL_TO', iMembership);
					oSearch.addSummaryField('count(*) countAudits');
					oSearch.rows = 1;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							if (oResponse.data.rows.length > 0)
							{
								ns1blankspace.status.clear();
								oParam = {};
								ns1blankspace.container.confirm({title: 'Cannot remove Membership!', 
																 html: oResponse.data.rows.length + ' Audit' + ((oResponse.data.rows.length == 1) ? '' : 's') + 
																 		' must be removed before the Membership can be removed.'
																 });
							}
							else
							{
								oParam.removeMembershipValidateStep = 2;
								nsFreshcare.admin.grower.membership.remove.validate(oParam);	
							}
						}
						else
						{
							ns1blankspace.status.error('Error finding audits: ' + oResponse.error.errornotes);
						}
					});
				} 

				// Now determine what needs to be deleted - call other searches
				// Linked sites
				else if (oParam.removeMembershipValidateStep == 2)
				{
					ns1blankspace.status.working('Finding linked Sites');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'CORE_LOCATION_ADDRESS_LINK_SEARCH';
					oSearch.addField('objectcontext');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', iMembership);
					oSearch.addSummaryField('count(*) countSites');
					oSearch.rows = 50;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.countSites = oResponse.summary.countSites;
							oParam.sites = oResponse.data.rows;
							oParam.removeMembershipValidateStep = 3;
							nsFreshcare.admin.grower.membership.remove.validate(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding linked sites: ' + oResponse.error.errornotes);
						}
					});
				}
				
				// Scopes
				else if (oParam.removeMembershipValidateStep == 3)
				{
					ns1blankspace.status.working('Finding Scopes');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
					oSearch.addField('scopetext');
					oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectSubscription);
					oSearch.addFilter('objectcontext', 'EQUAL_TO', iMembership);
					oSearch.addSummaryField('count(*) countScopes');
					oSearch.rows = 50;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.countScopes = oResponse.summary.countScopes;
							oParam.scopes = oResponse.data.rows;
							oParam.removeMembershipValidateStep = 4;
							nsFreshcare.admin.grower.membership.remove.validate(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding scopes: ' + oResponse.error.errornotes);
						}
					});
				}
				
				// Category
				else if (oParam.removeMembershipValidateStep == 4)
				{
					ns1blankspace.status.working('Finding Categories');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
					oSearch.addField('productcategorytext');
					oSearch.addFilter('subscription', 'EQUAL_TO', iMembership);
					oSearch.addSummaryField('count(*) countCategories');
					oSearch.rows = 50;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.countCategories = oResponse.summary.countCategories;
							oParam.categories = oResponse.data.rows;
							oParam.removeMembershipValidateStep = 5;
							nsFreshcare.admin.grower.membership.remove.validate(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding categories: ' + oResponse.error.errornotes);
						}
					});
				}
				
				// Training
				else if (oParam.removeMembershipValidateStep == 5)
				{
					ns1blankspace.status.working('Finding Training Courses');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
					oSearch.addField('agritrainingcourseattendee.course.coursedate');
					oSearch.addFilter('traineecontactbusiness', 'EQUAL_TO', ns1blankspace.objectContext);
					oSearch.addFilter('agritrainingcourseattendee.course.package.membership', 'EQUAL_TO', oMembership['agrisibscription.membership']);
					oSearch.addSummaryField('count(*) countTraining');
					oSearch.rows = 50;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.countTraining = oResponse.summary.countTraining;
							oParam.trainingCourses = oResponse.data.rows;
							oParam.removeMembershipValidateStep = 6;
							nsFreshcare.admin.grower.membership.remove.validate(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding Training Courses: ' + oResponse.error.errornotes);
						}
					});
				}

				// Status Transactions
				else if (oParam.removeMembershipValidateStep == 6)
				{
					ns1blankspace.status.working('Finding Status Transactions');

					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_MEMBERSHIP_STATUS_CHANGE_SEARCH';
					oSearch.addField('changedate');
					oSearch.addFilter('subscription', 'EQUAL_TO', iMembership);
					oSearch.addSummaryField('count(*) countTransactions');
					oSearch.rows = 100;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.countTransactions = oResponse.summary.countTransactions;
							oParam.transactions = oResponse.data.rows;
							oParam.removeMembershipValidateStep = 10;
							nsFreshcare.admin.grower.membership.remove.validate(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error finding Status Transactions: ' + oResponse.error.errornotes);
						}
					});
				}

				// Display confirmation message
				else if (oParam.removeMembershipValidateStep == 10)
				{
					ns1blankspace.status.clear();

					if (parseInt(oParam.countSites) > 0)
					{
						aText.push('<tr><td>' + oParam.countSites + ' linked Site' + ((oParam.countSites != '1') ? 's' : ''));
					}
					else {oParam.countSites = undefined}

					if (parseInt(oParam.countScopes) > 0)
					{
						aText.push('<tr><td>' + oParam.countScopes + ' Scope' + ((oParam.countScopes != '1') ? 's' : ''));
					}
					else {oParam.countScopes = undefined}

					if (parseInt(oParam.countCategories) > 0)
					{
						aText.push('<tr><td>' + oParam.countCategories + ' Categor' + ((oParam.countCategories != '1') ? 'ies' : 'y'));
					}
					else {oParam.countCategories = undefined}

					if (parseInt(oParam.countTraining) > 0)
					{
						aText.push('<tr><td>' + oParam.countTraining + ' Traning Course' + ((oParam.countTraining != '1') ? 's' : ''));
					}
					else {oParam.countTraining = undefined}

					if (parseInt(oParam.countTransactions) > 0)
					{
						aText.push('<tr><td>' + oParam.countTransactions + ' Transaction' + ((oParam.countTransactions != '1') ? 's' : ''));
					}
					else {oParam.countTransactions = undefined}

					// If we have something to delete, confirm it with the user and continue if they confirm
					if (aText.length > 0)
					{
						aText.unshift('<table><tr><td>The following data will be deleted when removing ' + oMembership['agrisubscription.membershiptext'] + ' membership. Continue deleting?</td></tr>');
						aText.push('</table>');
						
						aButtons =  [
										{text: "Yes", label: "Yes", icons: {primary: 'ui-icon-check'},
											click: function() 
											{
												oParam.removeMembershipStep = 1;
												$(this).dialog('destroy');
												nsFreshcare.admin.grower.membership.remove.send(oParam);
											}
										},
										{text: "No", label: "No", icons: {primary: 'ui-icon-close'}, 
											click: function() 
											{
												$(this).dialog('destroy');
												ns1blankspace.okToSave = false;
												oParam = {};
												return;
											}
										}
									];

						ns1blankspace.container.confirm({title: 'Delete Membership?',
														html: aText.join(''),
														buttons: aButtons});
					}
					else // just delete certificate & subscription
					{
						oParam.removeMembershipStep = 2;
						nsFreshcare.admin.grower.membership.remove.send(oParam);
					}
				}

			},

			send: function(oParam)
			{
				var oMembership = ns1blankspace.util.getParam(oParam, 'membership', {"default": undefined}).value;;
				var iMembership = (oMembership) ? oMembership.id : '';
				var aText = [];
				var oData = {};
				var sMethod = '';

				if (oParam.removeMembershipStep == undefined) {oParam.removeMembershipStep = 1}

				// Perform the deletion 
				if (oParam.removeMembershipStep == 1)
				{
					// Remove each site link
					if (oParam.countSites && parseInt(oParam.countSites) > 0)
					{	
						// Check if we need to get more records
						/*if (oParam.sites.length < parseInt(oParam.countSites))
						{
							oParam.rows = oParam.countSites;
							oParam.removeMembershipStep = 2;
							oParam.nextStep = 11;
							nsFreshcare.admin.grower.membership.remove.send(oParam);
						}
						else
						{*/
							ns1blankspace.status.working('Removing sites');
							if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

							if (oParam.rowIndex < oParam.sites.length)
							{
								oData.id = oParam.sites[oParam.rowIndex].id;
								sMethod = 'CORE_LOCATION_ADDRESS_LINK_MANAGE';
								oParam.currentObject = 'countSites'
							}
							else
							{
								delete(oParam.countSites);
							}
						//}
					}

					// Remove each scope
					else if (oParam.countScopes && parseInt(oParam.countScopes) > 0)
					{	
						// Check if we need to get more records
						/*if (oParam.scopes.length < parseInt(oParam.countScopes))
						{
							oParam.rows = oParam.countScopes;
							oParam.removeMembershipStep = 3;
							oParam.nextStep = 11;
							nsFreshcare.admin.grower.membership.remove.send(oParam);
						}
						else
						{*/
							ns1blankspace.status.working('Removing scopes');
							if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

							if (oParam.rowIndex < oParam.scopes.length)
							{
								oData.id = oParam.scopes[oParam.rowIndex].id;
								sMethod = 'AGRI_OBJECT_SCOPE_MANAGE';
								oParam.currentObject = 'countScopes'
							}
							else
							{
								delete(oParam.countScopes);
							}
						//}
					}

					// Remove each Category
					else if (oParam.countCategories && parseInt(oParam.countCategories) > 0)
					{	
						// Check if we need to get more records
						/*if (oParam.categories.length < parseInt(oParam.countCategories))
						{
							oParam.rows = oParam.countCategories;
							oParam.removeMembershipStep = 3;
							oParam.nextStep = 11;
							nsFreshcare.admin.grower.membership.remove.send(oParam);
						}
						else
						{*/
							ns1blankspace.status.working('Removing categories');
							if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

							if (oParam.rowIndex < oParam.categories.length)
							{
								oData.id = oParam.categories[oParam.rowIndex].id;
								sMethod = 'AGRI_PRODUCT_GROUP_MANAGE';
								oParam.currentObject = 'countCategories'
							}
							else
							{
								delete(oParam.countCategories);
							}
						//}
					}

					// Remove each Training Course
					else if (oParam.countTraining && parseInt(oParam.countTraining) > 0)
					{	
						// Check if we need to get more records
						/*if (oParam.categories.length < parseInt(oParam.countTraining))
						{
							oParam.rows = oParam.countTraining;
							oParam.removeMembershipStep = 3;
							oParam.nextStep = 11;
							nsFreshcare.admin.grower.membership.remove.send(oParam);
						}
						else
						{*/
							ns1blankspace.status.working('Removing categories');
							if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

							if (oParam.rowIndex < oParam.trainingCourses.length)
							{
								oData.id = oParam.trainingCourses[oParam.rowIndex].id;
								sMethod = 'AGRI_PRODUCT_GROUP_MANAGE';
								oParam.currentObject = 'countTraining'
							}
							else
							{
								delete(oParam.countTraining);
							}
						//}
					}

					// Remove each status transactions
					else if (oParam.countTransactions && parseInt(oParam.countTransactions) > 0)
					{	
						// Check if we need to get more records
						/*if (oParam.transactions.length < parseInt(oParam.countTransactions))
						{
							oParam.rows = oParam.countTransactions;
							oParam.removeMembershipStep = 3;
							oParam.nextStep = 11;
							nsFreshcare.admin.grower.membership.remove.send(oParam);
						}
						else
						{*/
							ns1blankspace.status.working('Removing transactions');
							if (oParam.rowIndex === undefined) {oParam.rowIndex = 0}

							if (oParam.rowIndex < oParam.transactions.length)
							{
								oData.id = oParam.transactions[oParam.rowIndex].id;
								sMethod = 'AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE';
								oParam.currentObject = 'countTransactions'
							}
							else
							{
								delete(oParam.countTransactions);
								oParam.removeMembershipStep = 12;
							}
						//}
					}

					if (oData.id != undefined)
					{
						oData.remove = '1';
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI(sMethod),
							data: oData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									// Check if this was the last row for the object being removed and reset values if so
									if (oParam[oParam.currentObject] === undefined)
									{
										delete(oParam.rowIndex);
										delete(oParam.rows);
										delete(oParam.nextStep);
									}
									else
									{
										oParam.rowIndex += 1;
									}
									nsFreshcare.admin.grower.membership.remove.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing records (' + sMethod + '):' + oResponse.error.errornotes);
								}
							}
						});
					}
					else
					{
						delete(oParam.rowIndex);
						delete(oParam.rows);
						delete(oParam.nextStep);
						if (oParam.countSites === undefined && oParam.countScopes == undefined && oParam.countTransactions == undefined 
							&& oParam.countCategories === undefined && oParam.countTraining == undefined)
						{
							oParam.removeMembershipStep = 2;
						}
						nsFreshcare.admin.grower.membership.remove.send(oParam);
					}
				}

				// Delete the certificate record
				else if (oParam.removeMembershipStep == 2)
				{
					oData.remove = '1';
					oData.id = oMembership['agrisubscription.agricertificate.id'];
					if (oData.id != "")
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_CERTIFICATE_MANAGE'),
							data: oData,
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Certificate removed.');
									oParam.removeMembershipStep = 3;
									nsFreshcare.admin.grower.membership.remove.send(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error removing certificate:' + oResponse.error.errornotes);
								}
							}
						});
					}
					else
					{
						oParam.removeMembershipStep = 3;
						nsFreshcare.admin.grower.membership.remove.send(oParam);
					}
				}

				else if (oParam.removeMembershipStep == 3)
				{
					oData.id = oMembership.id;
					oData.remove = '1';
					var oRoot = ns1blankspace.rootnamespace;
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oRoot.admin.grower.init({id: ns1blankspace.objectContext});
							}
							else
							{
								ns1blankspace.status.error('Error removing membership:' + oResponse.error.errornotes);
							}
						}
					});
				}
			}
		},

		statusChangeReason: function()
		{
			// v3.2.005 Now only shows fields on relevant tab and looks for membershipID on current Element
			var iMembershipID = $('#' + ns1blankspace.xhtml.divID).attr('data-membership');
			var sSavedStatus = ''

			if (iMembershipID != undefined && iMembershipID != '')
			{
				sSavedStatus = $.map($.grep(ns1blankspace.objectContextData.memberships, function(x) {return x.id === iMembershipID}),
										function(y) {return y['agrisubscription.status']}).shift();

				if (sSavedStatus != '' && sSavedStatus != undefined)
				{
					if ($('#' + ns1blankspace.xhtml.divID).attr('data-id') != sSavedStatus)
					{
						$('#ns1blankspaceMainMembership' + iMembershipID + ' .nsFreshcareShowOnChangeStatus').show();
					}
				}
			}
		},

		expiryMonthChangeReason: function()
		{
			// v3.1.2 SUP022693 CHeck if ExpiryMonth has changed and display 'Change Reason' fields if so
			// v3.1.2 SUP022882 Ask user if change applies to current certificate
			var sXHTMLElementID = ns1blankspace.xhtml.divID;
			var iMembership = sXHTMLElementID.replace('ExpiryMonth', '').split('Membership').pop().replace('Update', '');
			var oMembership = $.grep(ns1blankspace.objectContextData.memberships, function(x) {return x.id == iMembership}).shift();

			if ($('#' + sXHTMLElementID).attr('data-id') != oMembership['agrisubscription.expirymonth'])
			{
				// Change caption of reason to Re-Certification Due Change Reason
				if (nsFreshcare.user.role.toLowerCase() == 'admin')
				{
					$('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReasonContainer'))
						.html('<textarea rows="5" cols="40" id="ns1blankspaceMembership' + iMembership + 'ExpiryChangeReason" class="ns1blankspaceSelect"></textarea>')
						.addClass('ns1blankspaceText')
						.removeClass('nsFreshcareReadOnly');
					$('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReasonCaption')).html('Re-Certification Due Change Reason');
					$('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReason')).val('');
				}

				if (!$('#ns1blankspaceMembership' + iMembership + 'ExpiryChangeCertificateUpdate').is('*'))
				{
					$('#ns1blankspaceMainMembership' + iMembership + ' .ns1blankspaceExpiryMonthChange').last()
						.after('<tr class="ns1blankspaceCaption ns1blankspaceExpiryMonthChange">' +
										'<td class="ns1blankspaceCaption">' +
										'Does this change apply to the current certificate (i.e. the expiry date of the current certificate will change)?' +
										'</td></tr>' +
										'<tr class="ns1blankspace ns1blankspaceExpiryMonthChange">' +
										'<td class="ns1blankspaceRadio" id="ns1blankspaceMembership' + iMembership + 'ExpiryChangeCertificateUpdate">' +
											'<input type="radio" id="radio' + iMembership + 'UpdateCertificateExpiryY" name="radio' + iMembership + 'UpdateCertificateExpiry" data-text="Yes" value="Y"/>Yes' +
											'&nbsp;&nbsp;&nbsp;<input type="radio" id="radio' + iMembership + 'UpdateCertificateExpiryN" name="radio' + iMembership + 'UpdateCertificateExpiry" data-text="No" value="N"/>No' +
										'</td></tr>');		
				}
				$('#ns1blankspaceMainMembership' + iMembership + ' .ns1blankspaceExpiryMonthChange').show();
			}
			else
			{
				// Change caption of reason to Reason for change (but only if it's not already set to that!)
				if (nsFreshcare.user.role.toLowerCase() == 'admin' && $('#ns1blankspaceMainMembership' + iMembership + ' .ns1blankspaceExpiryMonthChange:visible').length > 0
					&& $('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReasonCaption')).html() == 'Re-Certification Due Change Reason'
					 && oMembership['agrisubscription.expirychangereason'] != '')
				{
					$('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReasonContainer'))
						.html(oMembership['agrisubscription.expirychangereason'].formatXHTML())
						.addClass('nsFreshcareReadOnly')
						.removeClass('ns1blankspaceText');
					$('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReasonCaption')).html('Reason for Change');
					//$('#' + sXHTMLElementID.replace('ExpiryMonth', 'ExpiryChangeReason')).val();
				}
				else if (nsFreshcare.user.role.toLowerCase() == 'admin' && oMembership['agrisubscription.expirychangereason'] != '') {}
				else
				{
					$('#ns1blankspaceMainMembership' + iMembership + ' .ns1blankspaceExpiryMonthChange').hide();
				}
			}
		},

		defaultCodeOfPractice: function(oParam)
		{
			// v3.1.209 Was not picking up MembershipID correctly when responding to data-click. Plus ECA New grower not defaulting
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': 'ns1blankspaceMembership'}).value;	
			var iMembershipID = ns1blankspace.util.getParam(oParam, 'membership', {'default': $('#' + sXHTMLElementID).attr('data-id')}).value;	

			if (iMembershipID === undefined) 
			{
				iMembershipID = $('#' + sXHTMLElementID).attr('data-id');
				if (iMembershipID == undefined)
				{
					iMembershipID = $('#' + ns1blankspace.xhtml.divID).attr('data-id');
					oParam.xhtmlElementID = ns1blankspace.xhtml.divID;
				}
			}

			if (iMembershipID)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
				oSearch.addField('description');
				oSearch.addFilter('membership', 'EQUAL_TO', iMembershipID);
				oSearch.addFilter('isdefault', 'EQUAL_TO', 'Y');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK' && oResponse.data.rows.length > 0)
					{
						var sElementID = ($('#' + sXHTMLElementID + 'COP').is('*')) ? sXHTMLElementID + 'COP' : sXHTMLElementID.replace('Membership', 'COP');
						
						$('#' + sElementID).attr('data-id', oResponse.data.rows[0].id);
						$('#' + sElementID).val(oResponse.data.rows[0].description);
					}
				});
			}
		},

		defaultWineryValues: function(oParam)
		{
			var oSubscription = ns1blankspace.util.getParam(oParam, 'subscription').value;
			var iSubscription = (oSubscription) ? oSubscription.id : '';
			var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
			if (oSubscription && iMembership == undefined) {iMembership = oSubscription['agrisubscription.membership']}
			

			var iWineGrapes = $.map($.grep(nsFreshcare.data.productGroups, function(x) {return x[1].toLowerCase() === 'wine grapes'}),
								function(y) {return y[0]}).shift();

			var iWinery = $.map($.grep(nsFreshcare.data.scopeOptions, function(x) {return x.title == 'Winery'}),
								function(y) {return y.id}).shift();

			if (iMembership === nsFreshcare.data.membershipWIN || iMembership === nsFreshcare.data.membershipVIT)
			{
				// Set Crops to Wine Grapes and disable
				$('#ns1blankspaceMembership' + iSubscription + 'CropsUpdate').val('Wine Grapes');
				$('#ns1blankspaceMembership' + iSubscription + 'CropsUpdate').attr('disabled', true);	
				$('#ns1blankspaceMembership' + iSubscription + 'CropsUpdate').addClass('nsFreshcareDisabled');	
				
				// Hide other options for Category
				// We need to allow existing incorrect product groups to be removed as well and add Wine Grapes if not already selected
				$.each($('#ns1blankspaceMembership' + iSubscription + 'ProductGroupUpdate .nsFreshcareProductGroup'), function() 
				{
					var iProductGroup = this.id.split('_').pop();
					if (iProductGroup != iWineGrapes)
					{
						// Hide the product group and remove from the list if selected
						$(this).parent().hide();
						
						if ($(this).hasClass('nsFreshcareSelected'))
						{
							nsFreshcare.external.grower.manageMultiRows(this.id, iSubscription);
						}
					}
					else
					{
						if (!$(this).hasClass('nsFreshcareSelected'))
						{
							nsFreshcare.external.grower.manageMultiRows(this.id, iSubscription);
						}
					}
				});

				// v3.1.2 SUP022744 Hide other options for Scope
				// We need to allow existing incorrect scopes to be removed as well and add Winery if not already selected
				$.each($('#ns1blankspaceMembership' + iSubscription + 'ScopeUpdate .nsFreshcareScope'), function() 
				{
					var iScope = this.id.split('_').pop();
					if (iScope != iWinery)
					{
						// Hide the scope and remove from the list if selected
						$(this).parent().hide();
						
						if ($(this).hasClass('nsFreshcareSelected'))
						{
							nsFreshcare.external.grower.manageMultiRows(this.id, iSubscription);
						}
					}
					else
					{
						if (!$(this).hasClass('nsFreshcareSelected'))
						{
							nsFreshcare.external.grower.manageMultiRows(this.id, iSubscription);
						}
					}

				});
			}
		},

		crops: 
		{
			getList: function(oParam)
			{
				if (nsFreshcare.data.crops === undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH';
					oSearch.addField('title');
					oSearch.addFilter('element', 'EQUAL_TO', nsFreshcare.structureElementCrops);
					oSearch.rows = 500;
					oSearch.async = false;
					oSearch.sort('title', 'asc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							nsFreshcare.data.crops = $.map(oResponse.data.rows, function(x) {return {"title": x.title, "id": x.id}});
							nsFreshcare.admin.grower.membership.crops.getList(oParam);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					});
				}
				else
				{
					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
			},

			show: function(oParam)
			{
				var aHTML = [];
				var aValues = [];
				var sMembership = '';
				var bUpdate = false;
				var sXHTMLElementId;
				var oValues = [];
				var iInvalidId = 0;
				var bValidateOnly = ns1blankspace.util.getParam(oParam, 'validateOnly', {'default': false}).value;

				if (oParam)
				{
					if (oParam.values) {aValues = oParam.values.split(',')}
					if (oParam.membership) {sMembership = oParam.membership}
					if (oParam.update != undefined) {bUpdate = oParam.update}
					if (oParam.xhtmlElementId) {sXHTMLElementId = oParam.xhtmlElementId}
				}

				if (nsFreshcare.data.crops === undefined)
				{
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.crops.show);
					nsFreshcare.admin.grower.membership.crops.getList(oParam);
				}
				else
				{
					// we first need to determine if the value is valid and then list
					// If updating, show the list of crops in the Multi-select list
					// If listing existing values and value is invalid, display in red, otherwise display normal
					oValues = $.map(aValues, function(x) {return {value: $.trim(x), valid: false, suggestion: ''}});

					$.each(oValues, function()
					{
						// First check if the 'raw' lower case value is found in the list
						var sLookupValue = this.value;
						var bValid = $.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}).length > 0;
						var sId = $.map($.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}),
										function(y) {return y.id}).shift();

						// Now check if we can find it when we set to Title
						if (!bValid)
						{
							sLookupValue = nsFreshcare.util.stringToTitleCase(this.value);
							bValid = $.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}).length > 0;
						}

						// Now check if we can find it if we remove the 's' on the end
						if (!bValid)
						{
							sLookupValue = (sLookupValue.substr(sLookupValue.length - 2, 1) === 's') ? sLookupValue.substr(0, sLookupValue.length - 2) : sLookupValue;
							bValid = $.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}).length > 0;
						}

						// Now check if we can find it if we ADD the 's' on the end
						if (!bValid)
						{
							sLookupValue = this.value.toLowerCase() + 's';
							bValid = $.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}).length > 0;
						}

						// Now check if we can find it if we change the 'y' on the end to 'ies' (cherry to cherries)
						if (!bValid)
						{
							sLookupValue = (sLookupValue.substr(sLookupValue.length - 2, 1) === 'y') ? sLookupValue.substr(0, sLookupValue.length - 2) + 'ies': sLookupValue;
							bValid = $.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}).length > 0;
						}

						// Now check if we can find it if we change 'mango' (or any derivative except mangosteen) to mangoes
						if (!bValid)
						{
							sLookupValue = (sLookupValue.indexOf('mango') > -1 && sLookupValue.indexOf('mangosteen') === -1) ? 'mangoes': sLookupValue;
							bValid = $.grep(nsFreshcare.data.crops, function(x) {return x.title === sLookupValue}).length > 0;
						}

						if (bValid)
						{
							this.valid = (sLookupValue === this.value);
							this.suggestion = (!this.valid) ? sLookupValue.substr(0,1).toUpperCase() + sLookupValue.substr(1) : '';	
							this.id = (sId) ? sId : iInvalidId++;
						}
						else
						{
							this.id = iInvalidId++;
						}

					});

					if (!bValidateOnly)
					{
						$.each(oValues, function()
						{
							var sThisCrop = this.value;
							if (!bUpdate)
							{
								aHTML.push('<tr><td id="nsFreshcareCropsList-' + sMembership + '_' + this.id + '"' + 
											' class="nsFreshcareCropsList ns1blankspaceSelect' + ((!this.valid) ? ' ns1blankspaceError' : '') + '"' +
											((sMembership) ? ' data-membership="' + sMembership : '') + '"' +
											' data-valid="' + this.valid + '"' +
											((this.suggestion != '') ? ' data-suggestion="' + this.suggestion + '"' : '') +
											'>' + this.value + 
											((this.suggestion != '') ? '<span style="font-size: 0.625em;color: #B8B8B8;vertical-align: middle;"> (Try "' + this.suggestion + '")</span>' : '') +
											'</td></tr>');
							
							}
							else
							{
								aHTML.push('<tr><td id="ns1blankspaceMembership' + sMembership + 'CropsUpdate_SelectRows-' + this.id + '"' +
												' class="ns1blankspaceMultiSelect' + ((!this.valid) ? ' ns1blankspaceError' : '') + '"' +
												' style="font-size=0.875em;">' +
												this.value + '</td>' + 
												'<td class="ns1blankspaceMultiRemove">&nbsp;</td>' +
											'</tr>');
							}
						});

						if (bUpdate)
						{
							if (aHTML.length > 0)
							{
								aHTML.unshift('<table id="ns1blankspaceMembership' + sMembership + 'CropsUpdate_SelectRows" style="width: 100%; padding-bottom: 5px;">');
								aHTML.push('</table>');
							}
							aHTML.unshift($('#' + sXHTMLElementId).html());
						}
						else
						{
							aHTML.unshift($('#' + sXHTMLElementId).html() + 
											'<table id="ns1blankspaceMembership' + sMembership + 'CropsList"' +
												' style="width: 100%; font-weight: normal; padding-top: 8px;">');
							aHTML.push('</table>');
						}
						

						$('#' + sXHTMLElementId).html(aHTML.join(''));

						if (bUpdate)
						{
							$('.ns1blankspaceMultiRemove')
								.button({
										 text: false,
										 icons: {primary: "ui-icon-close"}
										})
								.css('height', '15px')
								.css('width', '15px')
								.click( function(event) {
									// remove the row
									$(this).parent().remove();
								});
						}
					}
					// v3.1.0e SUP021974 We're only validating crops here
					else
					{
						nsFreshcare.admin.certificate.data.cropsValid = $.grep(oValues, function(x) {return x.valid == false}).length == 0;
					}
				}
			}
		},

		harvestMonths: 
		{
			formatValues: function(oParam)
			{
				var aValues = [];
				var aInsertValues = [];
				var aMonthsText = $.map(nsFreshcare.data.months, function(x) {return x.text});
				var aMonthsValue = $.map(nsFreshcare.data.months, function(x) {return x.value});

				// Backward Compatibility checks for Harvest Months values
				if (oParam.values) 
				{
					// v2.0.4 now replaces 'all year' text separately from delimiters
					if (oParam.values.toLowerCase().substr(0,8) === 'all year' || oParam.values.toLowerCase().substr(0,10) === 'year round')
					{
						oParam.values = $.map(nsFreshcare.data.months, function(x) {return x.value}).join(',');
					}
					else
					{
						// Replace common delimiter errors
						oParam.values = oParam.values.replace(/ & /g, ',');			// Cater for 'Jan & Feb'
						oParam.values = oParam.values.replace(/ and /g, ',');		// Cater for 'Jan and Feb'
						oParam.values = oParam.values.replace(/\//g, ',');			// Cater for 'Jan/Feb'
						oParam.values = oParam.values.replace(/ to /g, '-');		// Cater for 'Jan to Mar'
						oParam.values = oParam.values.replace(/ , /g, ',');
						oParam.values = oParam.values.replace(/ ,/g, ',');
						oParam.values = oParam.values.replace(/, /g, ',');
						
						oParam.values = oParam.values.replace(/ - /g, '-');
						oParam.values = oParam.values.replace(/- /g, '-');
						oParam.values = oParam.values.replace(/ -/g, '-');

						oParam.values = oParam.values.replace(/ . /g, ',');
						oParam.values = oParam.values.replace(/. /g, ',');
						oParam.values = oParam.values.replace(/ ./g, ',');
						oParam.values = oParam.values.replace(/\./g, ',');
					}
				
					aValues = oParam.values.split(',');
				}


				if (aValues.length > 0)
				{
					// Remove spaces and trim to 3 characters (so that MMMM is now in MMM format)
					aValues = $.map(aValues, function(x) {
							var s = x.replace(/ /g,"");
							return ((s.indexOf('-') > -1) ? s : s.substr(0,3))});

					// See if we have any Harvest Months stored as MMM-MMM and convert to MMM,MMM,MMM. There maybe more than one occurrence of MMM-MMM in the list
					$.each($.grep(aValues, function(x) {return x.indexOf('-') > -1}), function()
					{
						var aMonths = this.split('-');
						var iReferenceStart;
						var iReferenceEnd;
						if (aMonths.length == 2)		// This is probably a MMM-MMM
						{
							iReferenceStart = $.inArray(aMonths[0].substr(0,1).toUpperCase() + aMonths[0].substr(1,2).toLowerCase(), aMonthsText);

							if (iReferenceStart > -1)		// v2.0.4 was checking for undefined
							{	
								// The values are in MMM format, not MM
								iReferenceEnd = $.inArray(aMonths[1].substr(0,1).toUpperCase() + aMonths[1].substr(1,2).toLowerCase(), aMonthsText);
								if (iReferenceEnd > -1)		// v2.0.4 was checking for undefined
								{
									if (iReferenceStart < iReferenceEnd)	// Jan-May
									{
										while (iReferenceStart <= iReferenceEnd)
										{
											aInsertValues.push(aMonthsText[iReferenceStart]);
											iReferenceStart++;
										}
									}
									else
									{
										while (iReferenceEnd <= iReferenceStart)	// Oct-Feb added 2.0.3f
										{
											aInsertValues.push(aMonthsText[iReferenceStart]);
											if (iReferenceStart === iReferenceEnd)
											{ return false;}
											else
											{	iReferenceStart = (iReferenceStart === 11) ? 0 : iReferenceStart + 1;	}
										}
									}
								}
							}
							else
							{	// The values are in MM-MM format 
								
								iReferenceStart = $.inArray(aMonths[0], aMonthsValue);
								if (iReferenceStart > -1)		// v2.0.4 was checking for undefined
								{
									iReferenceEnd = $.inArray(aMonths[1], aMonthsValue);
									if (iReferenceEnd > -1)	// v2.0.4 was checking for undefined
									{
										if (iReferenceStart < iReferenceEnd)	// Jan-May
										{
											while (iReferenceStart <= iReferenceEnd)
											{
												aInsertValues.push(aMonthsValue[iReferenceStart]);
												iReferenceStart++;
											}
										}
										else
										{
											while (iReferenceEnd <= iReferenceStart)	// Oct-Feb added 2.0.3f
											{
												aInsertValues.push(aMonthsValue[iReferenceStart]);
												if (iReferenceStart === iReferenceEnd)
												{ return false;}
												else
												{	iReferenceStart = (iReferenceStart === 11) ? 0 : iReferenceStart + 1;	}
											}
										}
									}
								}
							}
						}
					});

					$.each(aInsertValues, function()
					{	// 2.0.3f was erroring if one of these were undefined
						if (this.toString() != undefined) {aValues.push(this.toString());}
					});
					aValues = $.grep(aValues, function(x) {return x.indexOf('-') === -1});

					// Now convert to MM instead of MMM format if applicable
					if (aValues.length > 0 
						&& $.inArray(aValues[0].substr(0,1).toUpperCase() + aValues[0].substr(1,2).toLowerCase(), aMonthsText) > -1)
					{	// Format is MMM
						$.each(aValues, function(index)
						{
							var sThisValue = this.substr(0,1).toUpperCase() + this.substr(1,2).toLowerCase();
							var sValue = $.map($.grep(nsFreshcare.data.months, function(x) {return x.text === sThisValue}),
											function(y) {return y.value})
										.pop();
							aValues[index] = sValue;
						});
					}
				}

				return aValues;
			},

			show: function(oParam)
			{
				var aHTML = [];
				var aValues = [];
				var sContext = "";
				var sMembership = '';
				var bUpdate = false;
				var sXHTMLElementId;

				if (oParam)
				{
					if (oParam.context) {sContext = oParam.context}
					if (oParam.membership) {sMembership = oParam.membership}
					if (oParam.update != undefined) {bUpdate = oParam.update}
					if (oParam.xhtmlElementId) {sXHTMLElementId = oParam.xhtmlElementId}
				}

				aValues = nsFreshcare.admin.grower.membership.harvestMonths.formatValues(oParam);

				aHTML.push('<table class="ns1blankspace"><tr>');
				
				// If updating, show all months, otherwise, only show the selected months.
				$.each(nsFreshcare.data.months, function()
				{
					var sThisMonth = this.value;
					var bSelected = $.grep(aValues, function(x) {return x == sThisMonth}).length > 0;
					if (bUpdate || (!bUpdate && bSelected))
					{
						aHTML.push('<td id="nsFreshcareHarvestMonths' + sContext + '_' + sThisMonth + '"' + 
									' class="nsFreshcareHarvestMonths' + ((bUpdate) ? ' nsFreshcareHarvestMonthsUpdate ': '') + '"' +
									((sMembership) ? ' data-membership="' + sMembership + '"': '') + '>' + this.text + '</td>');
					
					}
				});

				if (!bUpdate && aValues.length < 12)
				{
					aHTML.push('<td id="nsFreshcareHarvestMonthsPadding' + sMembership + '">&nbsp;</td>');
				}

				aHTML.push('</tr></table>');

				$('#' + sXHTMLElementId).html(aHTML.join(''));

				$.each(aValues, function()
				{
					$('#nsFreshcareHarvestMonths' + sContext + '_' + this).removeClass('nsFreshcareHarvestMonths');
					$('#nsFreshcareHarvestMonths' + sContext + '_' + this).addClass('nsFreshcareHarvestMonthsSelected');
				});

				if (bUpdate)
				{
					// Set the width of the existing month values to the same as the width of the list of all months
					var iMonthWidth = $('.nsFreshcareHarvestMonthsUpdate').first().width();
					var iWidth = $('#ns1blankspaceMembership' + sMembership + 'HarvestMonths').children().first().width() - (iMonthWidth * aValues.length);
					$('#nsFreshcareHarvestMonthsPadding' + sMembership).width(iWidth);
					nsFreshcare.admin.grower.membership.harvestMonths.bind();
				}

			},

			bind: function()
			{
				$('.nsFreshcareHarvestMonthsUpdate')
					.css('cursor', 'pointer')
					.click(function()
					{
						$(this).toggleClass('nsFreshcareHarvestMonthsSelected');
						$(this).toggleClass('nsFreshcareHarvestMonths');
					});
			},

			store: function(oParam)
			{
				var sXHTMLElementId = "";
				var aReturn = [];

				if (oParam)
				{
					if (oParam.xhtmlElementId) {sXHTMLElementId = oParam.xhtmlElementId}
				}

				aReturn = $.map($('#' + sXHTMLElementId + ' .nsFreshcareHarvestMonthsSelected'), function(x) {return $(x).html()});

				return aReturn.join(',');
			}
		},

		audits: 
		{
			show: 	function(oParam) 
			{

				var aHTML = [];
				var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
				var oMembership = ns1blankspace.util.getParam(oParam, 'membershipData').value;
				var bShowRows = ns1blankspace.util.getParam(oParam, 'showAuditRows', {'default': false}).value;
				var oNS = ns1blankspace.rootnamespace;
				if (ns1blankspace.objectParentName) {oNS = oNS[ns1blankspace.objectParentName]};
				oNS = oNS[ns1blankspace.objectName];

				if (iMembership == undefined || oMembership == undefined) 
				{
					alert('Sorry can\'t find this membership.');
				}
				else if (bShowRows && ns1blankspace.objectContextData.audits === undefined) 
				{
					$('#ns1blankspaceAuditsLoading_' + iMembership).show();
					oParam = ns1blankspace.util.setParam(oParam, 'contactBusiness', ns1blankspace.objectContextData.id);
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.audits.show);
					nsFreshcare.external.grower.audits.search(oParam);
				}
				else
				{
					aHTML = [];

					if (!bShowRows || !$('ns1blankspaceMembership' + iMembership + 'Audits').is('*'))
					{
						aHTML.push('<table class="ns1blankspace" id="ns1blankspaceMembership' + iMembership + 'Audits">');
						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTableCaption">' +
										'<td class="ns1blankspaceCaption" colspan="8">' +
										'Audits' +
										'</td>' +
										'<td style="text-align:right;">' +
											'<span class="ns1blankspaceAction" id="ns1blankspaceAudits' + iMembership + 'Show">Show Audits</span>' +
										'</td></tr>');

						if ($('ns1blankspaceMembership' + iMembership + 'Audits').is('*'))
						{
							aHTML.push('<tr id="ns1blankspaceAuditsLoading_' + iMembership + '">' +
											'<td colspan="8">' + ns1blankspace.xhtml.loadingSmall + '</td></tr>');
						}

						aHTML.push('</table>');

						$('#ns1blankspaceMembership' + iMembership + 'Row4').html(aHTML.join(''));

						$('#ns1blankspaceAuditsLoading_' + iMembership).hide();

						$('#ns1blankspaceAudits' + iMembership + 'Show')
							.button(
							{
								text: false,
								label: (bShowRows ? 'Hide' : 'Show') + ' Audits',
								icons: {primary: (bShowRows ? 'ui-icon-triangle-1-n' : 'ui-icon-triangle-1-s')}
							})
							.on('click', function(event)
							{
								if ($('#ns1blankspaceMembership' + iMembership + 'AuditHeader').is('*')
									&& $('#ns1blankspaceMembership' + iMembership + 'AuditHeader').is(':visible'))
								{
									$(this).button(
									{
										text: false,
										label: 'Show Audits',
										icons: {primary: 'ui-icon-triangle-1-s'}
									});
									$('#ns1blankspaceMembership' + iMembership + 'AuditHeader').hide();
									$('.ns1blankspaceGrowerMembership' + iMembership + 'Audits').hide();
									oParam.showAuditRows = false;
								}
								else
								{
									oParam.showAuditRows = true;
									$(this).button(
									{
										text: false,
										label: 'Hide Audits',
										icons: {primary: 'ui-icon-triangle-1-n'}
									});
									if ($('#ns1blankspaceMembership' + iMembership + 'AuditHeader').is('*')) 
									{
										$('#ns1blankspaceMembership' + iMembership + 'AuditHeader').show();
										$('.ns1blankspaceGrowerMembership' + iMembership + 'Audits').show();
									}
									else
									{
										nsFreshcare.admin.grower.membership.audits.show(oParam);
									}
								}
							});
					}
					
					if (bShowRows)
					{
						// First remove any 'loading' rows that are present
						aHTML = [];
						$('#ns1blankspaceAuditsLoading_' + iMembership).remove();

						aHTML.push('<tr class="ns1blankspaceCaption" id="ns1blankspaceMembership' + iMembership + 'AuditHeader">' +
										'<td class="ns1blankspaceHeaderCaption">Reference</td>' +
										'<td class="ns1blankspaceHeaderCaption">Title</td>' +
										'<td class="ns1blankspaceHeaderCaption">Actual</td>' +
										'<td class="ns1blankspaceHeaderCaption">Result Status</td>' +
										'<td class="ns1blankspaceHeaderCaption">Paid?</td>' +
										'<td class="ns1blankspaceHeaderCaption">Cert Body</td>' +
										'<td class="ns1blankspaceHeaderCaption">Auditor</td>' +
										'<td class="ns1blankspaceHeaderCaption">Grower Contact</td>' +
										'<td class="ns1blankspaceHeaderCaption" id="ns1blankspaceAuditsRegisterAudit' + iMembership + '">&nbsp;</td>' +
										'</tr>');
						
						$('#ns1blankspaceMembership' + iMembership + 'Audits').children().last().after(aHTML.join());
						
						// List Audits from ns1blankspace.objectContextData.audits
						// v3.1.2 SUP022574 Added Paid column
						$($.grep(ns1blankspace.objectContextData.audits, function (a) {return a["audit.subscription"] == iMembership;})).each( function() 
						{
							aHTML = [];
							aHTML.push('<tr class="ns1blankspaceGrowerMembership' + iMembership + 'Audits">' + 
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_reference-' + this.id + '">' + 
								   		this["audit.reference"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_title-' + this.id + '">' + 
								   		this["audit.typetext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_actualdate-' + this.id + '">' + 
								   		this["audit.actualdate"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_resultstatustext-' + this.id + '">' + 
								   		this["audit.resultstatustext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_paid-' + this.id + '">' + 
								   		(this["audit.paid"] == "Y" ? 'Yes' : 'No') + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_auditbusinesstext-' + this.id + '">' + 
								   		this["audit.auditbusinesstext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_auditpersontext-' + this.id + '">' + 
								   		this["audit.auditpersontext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_contactpersontext-' + this.id + '">' + 
								   		this["audit.contactpersontext"] + '</td>' +
								   	'<td class="ns1blankspaceRowSelect ns1blankspaceGrowerMembershipAudits' + iMembership + 'RowSelect" id="ns1blankspaceGrowerAudit_options_view-' + this.id + '"></td>' +
								   '</tr>');
							$('#ns1blankspaceMembership' + iMembership + 'Audits').children().last().after(aHTML.join(''));
						});

						$('.ns1blankspaceGrowerMembershipAudits' + iMembership + 'RowSelect').button( {
									text: false,
									icons: {
										primary: "ui-icon-play"
									}
						})
						.click(function() 
						{
							var oRoot = ns1blankspace.rootnamespace;
							oRoot.admin.audit.init({showHome: false});
							oRoot.admin.audit.search.send(this.id)
						});

						// v3.1.0c SUP022226 Added button
						// v3.1.2 SUP022859 Only bind if not readonly
						if (oNS == undefined || !(oNS.readOnly == true))
						{
							$('#ns1blankspaceAuditsRegisterAudit' + iMembership)
								.button(
								{
									text: false,
									icons: {primary: 'ui-icon-plus'}
								})
								.css('width', '18px')
								.css('height', '18px')
								.on('click', function()
								{
									$('#ns1blankspaceAuditAdd' + iMembership).click();
								});
						}
					}

					if (oParam.renderStatusTransactions == true)
					{
						nsFreshcare.admin.grower.membership.statusTransactions.show(oParam);
					}
					else
					{
						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
				}					
			}
		},

		statusTransactions:
		{
			search: function(oParam)
			{
				var iContactBusiness;
				var iMembership;

				if (oParam)
				{
					if (oParam.contactBusiness) {iContactBusiness = oParam.contactBusiness}
					if (oParam.statusTransactionsSearchStep === undefined) {oParam.statusTransactionsSearchStep = 1}
				}
				else
				{ 	oParam = {statusTransactionsSearchStep: 1}}

				if (oParam.statusTransactionsSearchStep === 1)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_MEMBERSHIP_STATUS_CHANGE_SEARCH';
					oSearch.addField('changedate,fromstatus,fromstatustext,tostatus,tostatustext,reason,subscription,createddate,createdusertext,modifieddate,modifiedusertext' +
									',changecontactperson,changecontactpersontext,changecontactbusiness,changecontactbusinesstext');
					oSearch.addFilter('agrisubscriptionstatuschange.subscription.contactbusiness', 'EQUAL_TO', iContactBusiness);
					oSearch.sort('changedate', 'desc');
					oSearch.sort('id', 'desc');
					oSearch.rows = 100;
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							oParam.statusTransactionsSearchStep = 2;
							ns1blankspace.objectContextData.statusTransactions = oResponse.data.rows;
							nsFreshcare.admin.grower.membership.statusTransactions.search(oParam);
						}
						else
						{
							ns1blankspace.status.error(oResponse.error.errornotes);
						}
					});
				}

				else if (oParam.statusTransactionsSearchStep === 2)
				{
					if (oParam.renderTrainingCourses === true)
					{
						nsFreshcare.admin.grower.membership.trainingCourses.show(oParam);
					}
					else if (oParam.onComplete)
					{
						delete(oParam.statusTransactionsSearchStep);
						ns1blankspace.util.onComplete(oParam);
					}
				}
			},

			show: function(oParam)
			{
				var aHTML = [];
				var iMembership;
				var bShowRows = false;

				if (oParam) 
				{
					if (oParam.membership) {iMembership = oParam.membership;}
					if (oParam.showStatusRows != undefined) {bShowRows = oParam.showStatusRows}
				}

				if (iMembership == undefined) 
				{
					alert('Sorry can\'t find this membership.');
				}
				else if (bShowRows && ns1blankspace.objectContextData.statusTransactions === undefined) 
				{
					$('#ns1blankspaceStatusTransactionsLoading_' + iMembership).show();
					//oParam = ns1blankspace.util.setParam(oParam, 'contactBusiness', ns1blankspace.objectContextData["contactperson.contactbusiness"]);
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.statusTransactions.show);
					nsFreshcare.admin.grower.membership.statusTransactions.search(oParam);
				}
				else
				{
					aHTML = [];

					if (!bShowRows || !$('#ns1blankspaceMembership' + iMembership + 'StatusTransactions').is('*'))
					{
						aHTML.push('<table class="ns1blankspace" id="ns1blankspaceMembership' + iMembership + 'StatusTransactions">');
						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTableCaption">' +
										'<td class="ns1blankspaceCaption" colspan="4">' +
										'Status History' +
										'</td><td style="text-align:right;">' +
											'<span class="ns1blankspaceAction" id="ns1blankspaceStatus' + iMembership + 'Show">Show Status Transactions</span>' +
										'</td></tr>');

						if ($('ns1blankspaceMembership' + iMembership + 'StatusTransactions').is('*'))
						{
							aHTML.push('<tr id="ns1blankspaceStatusTransactionsLoading_' + iMembership + '">' +
											'<td colspan="5">' + ns1blankspace.xhtml.loadingSmall + '</td></tr>');
						}

						aHTML.push('</table>');

						$('#ns1blankspaceMembership' + iMembership + 'Row5').html(aHTML.join(''));

						$('#ns1blankspaceStatusTransactionsLoading_' + iMembership).hide();

						$('#ns1blankspaceStatus' + iMembership + 'Show')
							.button(
							{
								text: false,
								label: (bShowRows ? 'Hide' : 'Show') + ' Status Transactions',
								icons: {primary: (bShowRows ? 'ui-icon-triangle-1-n' : 'ui-icon-triangle-1-s')}
							})
							.on('click', function(event)
							{
								if ($('#ns1blankspaceMembership' + iMembership + 'StatusHeader').is('*')
									&& $('#ns1blankspaceMembership' + iMembership + 'StatusHeader').is(':visible'))
								{
									$(this).button(
									{
										text: false,
										label: 'Show Status Transactions',
										icons: {primary: 'ui-icon-triangle-1-s'}
									});
									$('#ns1blankspaceMembership' + iMembership + 'StatusHeader').hide();
									$('.ns1blankspaceMembership' + iMembership + 'StatusTransactions').hide();
									oParam.showStatusRows = false;
								}
								else
								{
									oParam.showStatusRows = true;
									$(this).button(
									{
										text: false,
										label: 'Hide Status Transactions',
										icons: {primary: 'ui-icon-triangle-1-n'}
									});
									if ($('#ns1blankspaceMembership' + iMembership + 'StatusHeader').is('*')) 
									{
										$('#ns1blankspaceMembership' + iMembership + 'StatusHeader').show();
										$('.ns1blankspaceMembership' + iMembership + 'StatusTransactions').show();
									}
									else
									{
										nsFreshcare.admin.grower.membership.statusTransactions.show(oParam);
									}
								}
							});
					}
					
					if (bShowRows)
					{
						aHTML = [];
						// First remove any rows that are present
						$('#ns1blankspaceStatusTransactionsLoading_' + iMembership).remove();

						aHTML.push('<tr class="ns1blankspaceCaption" id="ns1blankspaceMembership' + iMembership + 'StatusHeader">' +
										'<td class="ns1blankspaceHeaderCaption">Date</td>' +
										'<td class="ns1blankspaceHeaderCaption">From</td>' +
										'<td class="ns1blankspaceHeaderCaption">To</td>' +
										'<td class="ns1blankspaceHeaderCaption">Reason</td>' +
										'<td class="ns1blankspaceHeaderCaption">Source of Change</td>' +
										'</tr>');

						$('#ns1blankspaceMembership' + iMembership + 'StatusTransactions').children().last().after(aHTML.join());

						// List Status Transactions from ns1blankspace.objectContextData.statusTransactions
						$($.grep(ns1blankspace.objectContextData.statusTransactions, function (a) {return a["subscription"] == iMembership;})).each(function(i, oRow) 
						{
							// v2.0.3g SUP021400 Non-admin only see business name for source of change
							// v3.0.1 Added abilty to remove top row and modify if admin user
							var sClass = (nsFreshcare.user.role.toLowerCase() === 'admin') ? ' ns1blankspaceStatusTransaction' + iMembership + 'RowEdit' : '';
							aHTML = [];

							aHTML.push('<tr class="ns1blankspaceMembership' + iMembership + 'StatusTransactions"' +
											' id="ns1blankspace' + iMembership + 'StatusTransactionRow-' + oRow.id + '"' +
											' data-rowid="' + oRow.id + '">' + 
								   '<td class="ns1blankspaceRow' + sClass + '" id="ns1blankspaceAudit_changedate-' + oRow.id + '">' + 
								   		oRow["changedate"] + '</td>' +
								   '<td class="ns1blankspaceRow' + sClass + '" id="ns1blankspaceAudit_fromstatus-' + oRow.id + '">' + 
								   		oRow["fromstatustext"] + '</td>' +
								   '<td class="ns1blankspaceRow' + sClass + '" id="ns1blankspaceAudit_tostatus-' + oRow.id + '">' + 
								   		oRow["tostatustext"] + '</td>' +
								   '<td class="ns1blankspaceRow' + sClass + '" id="ns1blankspaceAudit_reason-' + oRow.id + '">' + 
								   		oRow["reason"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceAudit_changeperson-' + oRow.id + '">' + 
								   		oRow["changecontactbusinesstext"] + 
								   		((nsFreshcare.user.role.toLowerCase() === 'admin') ? ' (' + oRow["changecontactpersontext"]  + ')' : '') +
								   		'</td>' +
								   		'<td class="ns1blankspaceRow">');
							
							if (nsFreshcare.user.role.toLowerCase() === 'admin' && i === 0)
							{
								aHTML.push('<span class="ns1blankspaceGrowerMembership' + iMembership + 'StatusRemove"' +
									   		' id="ns1blankspaceGrowerStatus_options_remove-' + oRow.id + '"></span>');
							}
							aHTML.push('</td></tr>');

							$('#ns1blankspaceMembership' + iMembership + 'StatusTransactions').children().last().after(aHTML.join(''));
						});

						$('.ns1blankspaceGrowerMembership' + iMembership + 'StatusRemove')
							.button({text: false, label: 'Remove', icons: {primary: 'ui-icon-close'}})
							.on('click', function()
							{
								nsFreshcare.admin.grower.membership.statusTransactions.remove(
								{
									xhtmlElement: this,
									membership: iMembership
								});
							});

						$('.ns1blankspaceStatusTransaction' + iMembership + 'RowEdit')
							.css('cursor', 'pointer')
							.on('click', function()
							{
								oParam.xhtmlElement = this;
								nsFreshcare.admin.grower.membership.statusTransactions.edit(oParam);
							});
					}

					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}
			},

			edit: function(oParam)
			{
				var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
				var oElement = ns1blankspace.util.getParam(oParam, 'xhtmlElement').value;
				var iRowId = oElement.id.split('-').pop();
				var aHTML = [];
				var bContinue = false;
				var oTransaction = $.grep(ns1blankspace.objectContextData.statusTransactions, function(x) {return x.id == iRowId}).shift();
				var oCompare = [
									{elementId: 'ns1blankspace' + iMembership + 'TransactionDate', column: 'changedate'},
									{elementId: 'ns1blankspace' + iMembership + 'FromStatus', column: 'fromstatus'},
									{elementId: 'ns1blankspace' + iMembership + 'ToStatus', column: 'tostatus'},
									{elementId: 'ns1blankspace' + iMembership + 'ChangeReason', column: 'reason'},
									{elementId: 'ns1blankspace' + iMembership + 'Notes', column: 'notes'},
								];

				if (oTransaction.notes === undefined) {oTransaction.notes = ''} 

				if ($('#ns1blankspace' + iMembership + 'TransactionEditContainer').is('*')) 
				{
					// Different row, remove and then show the new row
					bContinue = ($('#ns1blankspace' + iMembership + 'TransactionEditContainer').attr('data-rowid') != iRowId)
					$('#ns1blankspace' + iMembership + 'TransactionEditContainer').remove();
				}  
				else {bContinue = true;}

				// We need to construct the editing area
				if (bContinue)
				{
					// Create columns
					aHTML.push('<tr id="ns1blankspace' + iMembership + 'TransactionEditContainer" data-rowid="' + iRowId + '">' +
									'<td id="ns1blankspace' + iMembership + 'TransactionEditManage" ' + 
										'colspan="5">');
					
					aHTML.push('<table id="ns1blankspace' + iMembership + 'TransactionEdit" class="ns1blankspaceContainer ns1blankspaceBorder nsFreshcareDetails"' +
								' data-transactionID="' + iRowId + '">');

					aHTML.push('<tr>' + 
								'<td id="ns1blankspace' + iMembership + 'TransactionEditColumn1" class="ns1blankspaceColumn1" style="width:70%;"></td>' +
								'<td id="ns1blankspace' + iMembership + 'TransactionEditColumn2" class="ns1blankspaceColumn2"></td>' +
								'</tr>');

					aHTML.push('</table>');
					aHTML.push('</td></tr>');

					$('#ns1blankspace' + iMembership + 'StatusTransactionRow-' + iRowId).after(aHTML.join(''));

					// Column1 (Editing area)
					aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn1">');

					aHTML.push('<tr><td class="ns1blankspaceCaption">Transaction Date</td></tr>' +
								'<tr><td>' +
									'<input class="ns1blankspaceDate"' +
										' id="ns1blankspace' + iMembership + 'TransactionDate"' +
										' data-mandatory="1" data-caption="Date"' +
								'></td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceCaption">Status From</td></tr>' +
								'<tr><td>' +
									'<input class="ns1blankspaceSelect"' +
										' id="ns1blankspace' + iMembership + 'FromStatus"' +
										' data-method="SETUP_AGRI_SUBSCRIPTION_STATUS_SEARCH"' +
										' data-columns="reference-space-title"' +
										' data-mandatory="1" data-caption="From Status"' +
								'></td></tr>');


					aHTML.push('<tr><td class="ns1blankspaceCaption">Status To</td></tr>' +
								'<tr><td>' +
									'<input class="ns1blankspaceSelect"' +
										' id="ns1blankspace' + iMembership + 'ToStatus"' +
										' data-method="SETUP_AGRI_SUBSCRIPTION_STATUS_SEARCH"' +
										' data-columns="reference-space-title"' +
										' data-mandatory="1" data-caption="To Status"' +
								'></td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceCaption">Reason</td></tr>' +
								'<tr><td>' +
									'<input class="ns1blankspaceText"' +
										' id="ns1blankspace' + iMembership + 'ChangeReason"' +
								'></td></tr>');

					aHTML.push('<tr><td class="ns1blankspaceCaption">Notes</td></tr>' +
								'<tr><td class="ns1blankspaceTextMulti">' +
									'<textarea  class="ns1blankspaceTextMulti" rows="3" cols="35"' +
										' id="ns1blankspace' + iMembership + 'Notes"' +
										' data-mandatory="1" data-caption="Note"' +
								'></td></tr>');

					$('#ns1blankspace' + iMembership + 'TransactionEditColumn1').html(aHTML.join(''));

					$('input.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

					$.each(oCompare, function()
					{
						if ($('#' + this.elementId).hasClass('ns1blankspaceSelect'))
						{
							$('#' + this.elementId).val(oTransaction[this.column + 'text'].formatXHTML());
							$('#' + this.elementId).attr('data-id', oTransaction[this.column ]);
						}
						else
						{
							$('#' + this.elementId).val(oTransaction[this.column].formatXHTML());
						}
					});


					// Column2 (Action & audit trail area)
					aHTML = [];

					aHTML.push('<table>');
					aHTML.push('<tr><td>&nbsp;</td></tr>');
					aHTML.push('<tr><td><span id="ns1blankspace' + iMembership + 'TransactionSave" class="ns1blankspaceAction">Save</span></td></tr>');
					aHTML.push('<tr><td id="ns1blankspace' + iMembership + 'TransactionStatusMessage"></td></tr>');
					aHTML.push('<tr><td>&nbsp;</td></tr>');

					aHTML.push('<tr>' +
								'<td class="nsFreshcareSystem">' +
									'<span style="font-size:1.125em;">System Info</span>' +
									'<br /><br />' +
										'<b>Created On: </b><br />' + oTransaction.createddate +
									'<br /><br />' +
										'<b>Created By: </b><br />' + oTransaction.createdusertext +
									'<br /><br />' +
										'<b>Modified On: </b><br />' + oTransaction.modifieddate +
									'<br /><br />' +
										'<b>Modified By: </b><br />' + oTransaction.modifiedusertext +
								'</td></tr>');		

					aHTML.push('</table>');

					$('#ns1blankspace' + iMembership + 'TransactionEditColumn2').html(aHTML.join(''));

					$('#ns1blankspace' + iMembership + 'TransactionSave')
					.button({
						label: 'Save',
						icons: {
							primary: 'ui-icon-disk'
						}
					})
					.click(function(event) 
					{
						nsFreshcare.admin.grower.membership.statusTransactions.save(
							{
								membership: iMembership,
								statusTransaction: oTransaction,
								compare: oCompare,
								id: $('#ns1blankspace' + iMembership + 'TransactionEdit').attr('data-transactionID'),
								xhtmlElement: oParam.xhtmlElement
							});
					});
				}

			},

			save: function(oParam)
			{
				var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
				var iRowId = ns1blankspace.util.getParam(oParam, 'id').value;
				var oTransaction = ns1blankspace.util.getParam(oParam, 'statusTransaction').value;
				var oCompare = ns1blankspace.util.getParam(oParam, 'compare').value;
				var oData = {};
				ns1blankspace.okToSave = true;

				delete(oTransaction.notes);
				oCompare.pop();
				$('#ns1blankspace' + iMembership + 'TransactionStatusMessage').html('');

				// First we validate
				$.each(oCompare, function()
				{
					if ($('#' + this.elementId).attr('data-mandatory') === '1'
						&& (($('#' + this.elementId).hasClass('ns1blankspaceSelect') && $('#' + this.elementId).attr('data-id') == undefined)
							|| (!$('#' + this.elementId).hasClass('ns1blankspaceSelect') && $('#' + this.elementId).val() === ''))
						)
					{
						$('#ns1blankspace' + iMembership + 'TransactionStatusMessage')
							.html('<span style="color:red;">' + $('#' + this.elementId).attr('data-caption') + ' is mandatory</span>');
						ns1blankspace.okToSave = false;
						return false;
					}
				});

				if (ns1blankspace.okToSave)
				{
					$.each(oCompare, function()
					{
						if ($('#' + this.elementId).hasClass('ns1blankspaceSelect'))
						{
							if ($('#' + this.elementId).attr('data-id') != oTransaction[this.column])
							{
								oData[this.column] = $('#' + this.elementId).attr('data-id');
							}
						}
						else if ($('#' + this.elementId).val() != oTransaction[this.column].formatXHTML())
						{
							oData[this.column] = $('#' + this.elementId).val().formatXHTML();
						}
					});

					if (Object.keys(oData).length > 0)
					{
						oData.id = iRowId;
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE'),
							data: oData, 
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Transaction saved.');
									dToday = new Date();
									var iStatusBefore = oTransaction.tostatus;
									var sChangeDateBefore = oTransaction.changedate;
									
									// Now update values saved in ns1blankspace.objectContextData.statustransctions
									oTransaction.modifieddate = dToday.toString('dd MMM yyyy HH:mm:ss');
									oTransaction.modifieduser = ns1blankspace.user.id;
									$.each(oData, function(key, value)
									{
										oTransaction[key] = value;
										if (key != 'id')
										{
											oColumn = $.grep(oCompare, function(x) {return x.column === key}).shift();
											if (oColumn && $('#' + oColumn.elementId).hasClass('ns1blankspaceSelect'))
											{
												oTransaction[key + 'text'] = $('#' + oColumn.elementId).val().substr(3); 
											}
										}
									});

									$.each(ns1blankspace.objectContextData.statusTransactions, function(i, oThis)
									{
										if (oThis.id == oData.id)
										{
											ns1blankspace.objectContextData.statusTransactions[i] = oTransaction;
										}
									});


									// Now we need to see if the change we made changed the most recent status, change the SubscriptionStatus as well
									// First get the top most record, then compare the date and id to the one that was changed
									var oSubscriptionTransactions = $.grep(ns1blankspace.objectContextData.statusTransactions, function(x) {return x.subscription === iMembership});
									var oTopTransaction = oSubscriptionTransactions[0];
									var iThisTransaction = oResponse.id;

									if (oTopTransaction.id === iThisTransaction || oData.changedate != undefined)
									{
										var dTopTransaction = new Date((oTopTransaction.id === iThisTransaction) ? sChangeDateBefore: oTopTransaction.changedate);
										var dThisTransaction = new Date((oData.changedate != undefined) ? oData.changedate : oTransaction.changedate);
										var iStatusTop = (oTopTransaction.id === iThisTransaction) ? iStatusBefore : oTopTransaction.tostatus;

										// Check if the top transaction is no longer the most recent transaction and re-order the transactions if not
										if (dTopTransaction < dThisTransaction)
										{
											ns1blankspace.objectContextData.statusTransactions.sort(function(a, b)
											{
												var aDate = new Date(a.changedate);
												var bDate = new Date(b.changedate);
												return (aDate.toString('dd MMMM yyyy HH:mm:ss') == bDate.toString('dd MMMM yyyy HH:mm:ss')) ? 0 : ((aDate > bDate) ? -1 : 1);
											});

										}

										if (iStatusTop != ns1blankspace.objectContextData.statusTransactions[0].tostatus)
										{
											oData = {id: iMembership};
											oData.laststatuschangedate = ns1blankspace.objectContextData.statusTransactions[0].changedate;
											oData.status = ns1blankspace.objectContextData.statusTransactions[0].tostatus;

											$.ajax(
											{
												type: 'POST',
												url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
												data: oData,
												success: function(oResponse)
												{
													if (oResponse.status == 'OK')
													{
														var oRoot = ns1blankspace.rootnamespace;
														ns1blankspace.status.message('Membership subscription status updated.');
														// Refresh the entire groweer view since we've changed the membership status
														oRoot.admin.grower.init({id: ns1blankspace.objectContext});
													}
													else
													{
														ns1blankspace.status.error('Error updating subscription status: ' + oResponse.error.errornotes);
													}
												}
											});
										}
										else
										{	// Just refresh the rows, not the entire subscription
											$('#ns1blankspaceMembership' + iMembership + 'StatusTransactions').remove();
											nsFreshcare.admin.grower.membership.statusTransactions.show({membership: iMembership, showStatusRows: true});
										}
									}										
									// Just refresh the rows, not the entire subscription
									else
									{
										$('#ns1blankspaceMembership' + iMembership + 'StatusTransactions').remove();
										nsFreshcare.admin.grower.membership.statusTransactions.show({membership: iMembership, showStatusRows: true});
									}
								}
								else
								{
									$('#ns1blankspace' + iMembership + 'TransactionStatusMessage').html('<span style="color:red;">Error saving Transaction: ' + oResponse.error.errornotes + '</span>');
								}
							}
						});
					}
					else
					{
						ns1blankspace.status.message('Nothing to save.');
						nsFreshcare.admin.grower.membership.statusTransactions.edit({membership: iMembership, xhtmlElement: oParam.xhtmlElement});
					}
				}
			},

			remove: function(oParam)
			{
				var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
				var oThisElement = ns1blankspace.util.getParam(oParam, 'xhtmlElement').value;
				var iRowId = oThisElement.id.split('-').pop();
				var oMembership = $.grep(ns1blankspace.objectContextData.memberships, function(x) {return x.id === iMembership}).shift();
				var oMembershipTransactions;

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_STATUS_CHANGE_MANAGE'),
					data: 'remove=1&id=' + iRowId,
					success: function(oResponse)
					{
						var oData = {id: iMembership};

						if (oResponse.status == 'OK')
						{
							ns1blankspace.status.message('Status Transaction removed.');

							// Now update current membership status and status change date to the value that's on the next row
							oMembershipTransactions = $.grep(ns1blankspace.objectContextData.statusTransactions, function(x) {return x.subscription === iMembership});

							// v3.2.006 SUP023433 Was prev updating only if status was different and blanking out otherwise (Agghh!)
							if (oMembershipTransactions.length > 1)
							{
								oData.status = oMembershipTransactions[1].tostatus;
								oData.laststatuschangedate = oMembershipTransactions[1].changedate;
							}
							else
							{
								oData.status = '';
								oData.laststatuschangedate = '';
							}

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('AGRI_SUBSCRIPTION_MANAGE'),
								data: oData,
								success: function(oResponse)
								{
									var oRoot = ns1blankspace.rootnamespace;

									if (oResponse.status == 'OK')
									{
										ns1blankspace.status.message('Membership status updated.');
										oRoot.admin.grower.init({id: ns1blankspace.objectContext});
									}
									else
									{
										ns1blankspace.status.error('Error updating membership status: ' + oResponse.error.errornotes);
									}
								}
							});
						}
						else
						{
							ns1blankspace.status.error('Error removing status transaction: ' + oResponse.error.errornotes);
						}
					}
				});
			}
		},

		trainingCourses: 
		{
			show: function(oParam)
			{
				var aHTML = [];
				var iMembership = ns1blankspace.util.getParam(oParam, 'membership').value;
				var oMembership = ns1blankspace.util.getParam(oParam, 'membershipData').value;
				var bShowRows = ns1blankspace.util.getParam(oParam, 'showTrainingRows', {'default': false}).value;
				var oNS = ns1blankspace.rootnamespace;
				if (ns1blankspace.objectParentName) {oNS = oNS[ns1blankspace.objectParentName]};
				oNS = oNS[ns1blankspace.objectName];

				if (iMembership == undefined || oMembership == undefined) 
				{
					alert('Sorry can\'t find this membership.');
				}
				else if (bShowRows && ns1blankspace.objectContextData.trainingCourses === undefined) 
				{
					$('#ns1blankspaceTrainingLoading_' + iMembership).show();
					oParam = ns1blankspace.util.setParam(oParam, 'contactBusiness', ns1blankspace.objectContextData.id);
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.admin.grower.membership.trainingCourses.show);
					nsFreshcare.external.grower.trainingCourses.search(oParam);
				}
				else
				{
					aHTML = [];

					if (!bShowRows || !$('#ns1blankspaceMembership' + iMembership + 'Training').is('*'))
					{
						aHTML.push('<table class="ns1blankspace" id="ns1blankspaceMembership' + iMembership + 'Training">');
						aHTML.push('<tr><td>&nbsp;</td></tr>');

						aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceTableCaption">' +
										'<td class="ns1blankspaceCaption" colspan="7">' +
										'Training' +
										'</td>' +
										'<td style="text-align:right;">' +
											'<span class="ns1blankspaceAction" id="ns1blankspaceTraining' + iMembership + 'Show">Show Training Courses</span>' +
										'</td></tr>');

						if ($('#ns1blankspaceMembership' + iMembership + 'Training').is('*'))
						{
							aHTML.push('<tr id="ns1blankspaceTrainingLoading_' + iMembership + '">' +
											'<td colspan="8">' + ns1blankspace.xhtml.loadingSmall + '</td></tr>');
						}

						aHTML.push('</table>');

						$('#ns1blankspaceMembership' + iMembership + 'Row3').html(aHTML.join(''));

						$('#ns1blankspaceTrainingLoading_' + iMembership).hide();

						$('#ns1blankspaceTraining' + iMembership + 'Show')
							.button(
							{
								text: false,
								label: (bShowRows ? 'Hide' : 'Show') + ' Training Courses',
								icons: {primary: (bShowRows ? 'ui-icon-triangle-1-n' : 'ui-icon-triangle-1-s')}
							})
							.on('click', function(event)
							{
								if ($('#ns1blankspaceMembership' + iMembership + 'TrainingHeader').is('*')
									&& $('#ns1blankspaceMembership' + iMembership + 'TrainingHeader').is(':visible'))
								{
									$(this).button(
									{
										text: false,
										label: 'Show Training Courses',
										icons: {primary: 'ui-icon-triangle-1-s'}
									});
									$('#ns1blankspaceMembership' + iMembership + 'TrainingHeader').hide();
									$('.ns1blankspaceGrowerMembership' + iMembership + 'Training').hide();
									oParam.showTrainingRows = false;
								}
								else
								{
									oParam.showTrainingRows = true;
									$(this).button(
									{
										text: false,
										label: 'Hide Training Courses',
										icons: {primary: 'ui-icon-triangle-1-n'}
									});
									if ($('#ns1blankspaceMembership' + iMembership + 'TrainingHeader').is('*')) 
									{
										$('#ns1blankspaceMembership' + iMembership + 'TrainingHeader').show();
										$('.ns1blankspaceGrowerMembership' + iMembership + 'Training').show();
									}
									else
									{
										nsFreshcare.admin.grower.membership.trainingCourses.show(oParam);
									}
								}
							});
					}
					
					if (bShowRows)
					{
						// First remove any 'loading' rows that are present
						aHTML = [];
						$('#ns1blankspaceTrainingLoading_' + iMembership).remove();

						aHTML.push('<tr class="ns1blankspaceCaption" id="ns1blankspaceMembership' + iMembership + 'TrainingHeader">' +
										'<td class="ns1blankspaceHeaderCaption">Trainer Business</td>' +
										'<td class="ns1blankspaceHeaderCaption">Trainer</td>' +
										'<td class="ns1blankspaceHeaderCaption">Course</td>' +
										'<td class="ns1blankspaceHeaderCaption">COP</td>' +
										'<td class="ns1blankspaceHeaderCaption">Course Date</td>' +
										'<td class="ns1blankspaceHeaderCaption">Membership</td>' +
										'<td class="ns1blankspaceHeaderCaption">Trainee</td>' +
										'<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
										'</tr>');
						
						$('#ns1blankspaceMembership' + iMembership + 'Training').children().last().after(aHTML.join());
						
						// List Training from ns1blankspace.objectContextData.audits
						$($.grep(ns1blankspace.objectContextData.trainingCourses, function (a) 
							{return a["agritrainingcourseattendee.course.package.membership"] == oMembership['agrisubscription.membership']})).each( function() 
						{
							aHTML = [];
							aHTML.push('<tr class="ns1blankspaceGrowerMembership' + iMembership + 'Training">' + 
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_business-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.course.trainercontactbusinesstext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_trainer-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.course.trainercontactpersontext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_course-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.coursetext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_cop-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.course.package.codeofpracticetext"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_coursedate-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.course.coursedate"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_membership-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.course.package.membership.code"] + '</td>' +
								   '<td class="ns1blankspaceRow" id="ns1blankspaceTraining_trainee-' + this['agritrainingcourseattendee.course'] + '">' + 
								   		this["agritrainingcourseattendee.attendingtrainee"] + '</td>' +
								   	'<td class="ns1blankspaceRowSelect ns1blankspaceMembership' + iMembership + 'TrainingRowSelect"' +
								   		' id="ns1blankspaceGrowerTraining_options_view-' + this['agritrainingcourseattendee.course'] + '"></td>' +
								   '</tr>');
							$('#ns1blankspaceMembership' + iMembership + 'Training').children().last().after(aHTML.join(''));
						});

						
						// v3.1.2 SUP022859 Only bind if not readonly
						if (oNS == undefined || !(oNS.readOnly == true))
						{
							$('.ns1blankspaceMembership' + iMembership + 'TrainingRowSelect').button( {
										text: false,
										icons: {
											primary: "ui-icon-play"
										}
							})
							.click(function() 
							{
								var oRoot = ns1blankspace.rootnamespace;
								oRoot.admin.trainingcourse.init({showHome: false, id: this.id.split('-').pop()});
							});
						}
					}

					if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
				}					
			}
		},

		save:
		{
			validate: function(oParam)
			{
				var bNew = ns1blankspace.util.getParam(oParam, 'new',{"default": false}).value;
				var iMembership = ns1blankspace.util.getParam(oParam, 'membership', {'default': ''}).value;
				var oMembership = (ns1blankspace.objectContextData && ns1blankspace.objectContextData.memberships && iMembership)
									? $.grep(ns1blankspace.objectContextData.memberships, function(x) {return x.id === iMembership}).shift()
									: undefined;

				// First validate mandatory fields
				if (ns1blankspace.okToSave)
				{
					$('#ns1blankspace' + (bNew ? "MainNewMembership" : 'Membership' + iMembership) + ' input[data-mandatory]').each(function()
					{
						if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}

						if (this.id == 'ns1blankspaceMembership' + iMembership + 'CropsUpdate' && $(this).val() == 'Search for valid Crops'
							&& !$('#ns1blankspaceMembership' + iMembership + 'CropsUpdate_SelectRows').is('*'))
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}

					});
				}
				
				// If Status has changed, validate reason for change
				if (ns1blankspace.okToSave && oMembership && oMembership['agrisubscription.status'] != $('#ns1blankspaceMembership' + iMembership + 'Status').attr('data-id')
					&& $('#ns1blankspaceMembership' + iMembership + 'StatusChangeReason').val() === '')
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Reason for change must be entered if you have changed the Status.');
				}

				// If expiry Month has changed, validate reason for change
				// v3.1.201 SUP022970 Only applies if field is displayed
				if (ns1blankspace.okToSave && oMembership && $('#ns1blankspaceMembership' + iMembership + 'ExpiryMonth').is('*')
					&& oMembership['agrisubscription.expirymonth'] != $('#ns1blankspaceMembership' + iMembership + 'ExpiryMonth').attr('data-id'))
				{
					if ($('#ns1blankspaceMembership' + iMembership + 'ExpiryChangeReason').val() === '')
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('Re-Certification Due Change Reason must be entered if you have changed the Re-Certification Audit Due.');
					}
					else if ($('input[name="radio' + iMembership + 'UpdateCertificateExpiry"]:checked').val() == undefined)
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('You must indicate if the change to the Re-Certification Audit Due will apply to the current certificate.');
					}
				}

				// Validate Scope v3.1.2 SUP022744 Moved from Details tab
				if (ns1blankspace.okToSave && $('#ns1blankspaceMembership' + iMembership + 'ScopeUpdate .nsFreshcareSelected').length === 0)
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('You must choose at least one Scope value.');
				}

				// Validate Category (ProductGroup)
				if (ns1blankspace.okToSave && $('#ns1blankspaceMembership' + iMembership + 'ProductGroupUpdate .nsFreshcareSelected').length === 0)
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('You must choose at least one Category value.');
				}

				// Validate Sites
				if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1 && $('#ns1blankspaceMembership' + iMembership + 'MembershipSiteUpdate .nsFreshcareSelected').length === 0)
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('You must choose at least one Site.');
				}

				// v3.1.0 Recursive call required if it's a new grower only
				// v3.1.2 Now does this for new Membership as well
				if (ns1blankspace.okToSave && oParam.onComplete
					&& (ns1blankspace.objectContext == -1 || bNew) )			
				{
					ns1blankspace.util.onComplete(oParam);
				}
				// v3.1.0e Call function if invalid
				else if (oParam.functionInvalidData)
				{
					oParam.functionInvalidData();
				}
			}
		}
	},

	siteAddress: 
	{
		search: function(oParam, oResponse) 
		{

			var iContactBusiness = ns1blankspace.data.contactBusiness;
			var iStep = 1;

			if (oParam) 
			{
				iContactBusiness = (oParam.contactBusiness) ? oParam.contactBusiness : iContactBusiness;
				if (oParam.sitesStep) {iStep = oParam.sitesStep; }
			}

			if (iStep === 1 && iContactBusiness && ns1blankspace.objectContextData) 
			{

				ns1blankspace.objectContextData.sites = [];
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('status,address1,address2,addresssuburb,addressstate,addresspostcode,addresscountry,type,' +
									'address.addresslink.object,address.addresslink.objectcontext,address.addresslink.id');
				oSearch.addFilter("address.addresslink.object", "EQUAL_TO", nsFreshcare.objectBusiness);
				oSearch.addFilter("address.addresslink.objectcontext", "EQUAL_TO", iContactBusiness);
				oSearch.sort('status', 'asc');
				oSearch.sort('addresssuburb', 'asc');
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) 
				{

					if (oResponse.status === "OK") 
					{
						ns1blankspace.objectContextData.sites = oResponse.data.rows;
						oParam = ns1blankspace.util.setParam(oParam, 'sitesStep', 2);
						nsFreshcare.admin.grower.siteAddress.search(oParam);
					}
					else
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				});
			}
			else if (iStep === 2) 
			{
				delete(oParam.siteStep);
				ns1blankspace.util.onComplete(oParam);
			}
		},

		remove: function(oParam)	
		{
			var iAddressId;
			var iAddressIndex = -1;
			var oThisLink;
			var sData = '';
			var iRemoveType = 3;

			if (oParam)
			{
				if (oParam.address) {iAddressId = oParam.address}
				if (oParam.addressStep === undefined) {oParam.addressStep = 1}
				if (oParam.addressIndex) {iAddressIndex = oParam.addressIndex}
				if (oParam.removeType) {iRemoveType = oParam.removeType}
			}

			// Find all links to this address
			if (oParam.addressStep === 1)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_LINK_SEARCH';
				oSearch.addField('address,object,objectcontext,addresslink.address.status');
				oSearch.addFilter('address', 'EQUAL_TO', iAddressId);
				oSearch.rows = 50;
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						if (nsFreshcare.admin.grower.data === undefined)
						{	nsFreshcare.admin.grower.data = {}}

						nsFreshcare.admin.grower.data.addressLinks = oResponse.data.rows;
						oParam.addressStep = 2;
						nsFreshcare.admin.grower.siteAddress.remove(oParam);
					}
				});
			}

			else if (oParam.addressStep === 2)
			{
				if (iAddressIndex === -1)
				{
					iAddressIndex = 0;
				}

				if (iAddressIndex < nsFreshcare.admin.grower.data.addressLinks.length)
				{
					oThisLink = nsFreshcare.admin.grower.data.addressLinks[iAddressIndex];
					// We can't remove or inactivate the 'primary' address (status === 1)
					// v2.0.4 SUP021404 removeType: 3 = inactivate, 4 = remove
					// We always remove the link to the Site, but inactivate / remove link to Business accoring to bRemoveType
					if (oThisLink['addresslink.address.status'] != '1' 
						&& (iRemoveType === 4 
							|| (iRemoveType === 3 && oThisLink.object != nsFreshcare.objectBusiness))
						)
					{
						sData = 'id=' + oThisLink.id + '&remove=1';
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
							data: sData,
							dataType: 'json',
							success: function(oResponse)
							{
								if (oResponse.status === 'OK')
								{
									ns1blankspace.status.message('Link to ' + ((oThisLink.object === nsFreshcare.objectBusiness) ? 'business' : 'site') + ' removed');
									oParam.addressIndex = iAddressIndex + 1;
									nsFreshcare.admin.grower.siteAddress.remove(oParam);
								}
								else
								{
									ns1blankspace.status.error(oResponse.error.errornotes);
									oParam.addressStep = 3;
									oParam.step = 10;
									nsFreshcare.admin.grower.siteAddress.remove(oParam);
								}
							}
						});
					}
					else
					{
						oParam.addressIndex = iAddressIndex + 1;
						nsFreshcare.admin.grower.siteAddress.remove(oParam);
					}

				}
				else
				{
					oParam.addressStep = (iRemoveType === 4) ? 3 : 4;
					nsFreshcare.admin.grower.siteAddress.remove(oParam);
				}
			}

			// Now remove the actual address (this can't happen until links to it are removed)
			else if (oParam.addressStep === 3)
			{
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_MANAGE'),
					data: '&id=' + iAddressId + '&remove=1',
					dataType: 'json',
					success: function(oResponse) 
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.status.message('Site address removed');
							oParam.addressStep = 4;
							nsFreshcare.admin.grower.siteAddress.remove(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error removing Site Address: ' + oResponse.error.errornotes)
						}
					}
				});
			}

			else if (oParam.addressStep === 4)
			{
				if (oParam.onComplete)
				{
					delete(nsFreshcare.admin.grower.data.addressLinks);
					delete(oParam.addressStep);
					delete(oParam.addressIndex);
					delete(oParam.address);
					delete(oParam.removeType);
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	}
}														
