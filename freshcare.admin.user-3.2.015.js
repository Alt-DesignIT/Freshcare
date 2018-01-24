/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
// v3.1.207 SUPInternal users WITHOUT System Administrator role can only do the following:
// - Reset Password for non-internal user or self
// - Switch-in to non-internal user
// - Edit details page for non-internal user
// - View but not change roles
// - View but not change network groups
// - Add new non-internal user

nsFreshcare.admin.user = 
{
	init: 		function (oParam)
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 22;
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectName = 'user';
		ns1blankspace.viewName = 'Users';
		ns1blankspace.objectMethod = "SETUP_USER";
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;
		ns1blankspace.data.userRole = undefined;
		ns1blankspace.data.userRoleText = undefined;
		
		if (oParam) 
		{
			if (oParam.defaultParam) 
			{
				var sDefaultParam = ns1blankspace.util.getParam(oParam, 'defaultParam', {"default": ''}).value;
				if (oParam.defaultParam.contactBusiness) {oParam.contactBusiness = oParam.defaultParam.contactBusiness}
				if (oParam.defaultParam.roleText) {oParam.roleText = oParam.defaultParam.roleText}
			}
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness}
			if (oParam.roleText != undefined) {ns1blankspace.data.userRoleText = oParam.roleText}
		}

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
	},

	home:		function (oParam, oResponse)
	{
		// v3.1.1e SUP022638 Now processes functionSearch parameter
		var oUsers = ns1blankspace.util.getParam(oParam, 'users', {'default': []}).value;
		var fFunctionSearch = ns1blankspace.util.getParam(oParam, 'functionSearch', {'default': nsFreshcare.admin.user.search.send}).value;

		if (oParam == undefined) {oParam = {}}
		if (oParam.homeStep === undefined) {oParam.homeStep = 1}

		if (oParam.homeStep === 1) 
		{
			if (oResponse == undefined)
			{
				var aHTML = [];
							
				aHTML.push('<table class="ns1blankspaceMain">');
				aHTML.push('<tr class="ns1blankspaceMain">' +
								'<td id="ns1blankspaceMostLikely" class="ns1blankspaceMain">' +
								ns1blankspace.xhtml.loading +
								'</td>' +
								'</tr>');
				aHTML.push('</table>');					
				
				$('#ns1blankspaceMain').html(aHTML.join(''));
				
				var aHTML = [];
							
				aHTML.push('<table>');

				aHTML.push('<tr><td><div id="ns1blankspaceViewSetupUserLarge" class="ns1blankspaceViewImageLarge"></div></td></tr>');	
							
				aHTML.push('<tr><td id="ns1blankspaceControlInternal" class="ns1blankspaceControl">' +
							'Internal</td></tr>');			
						
				aHTML.push('<tr><td id="ns1blankspaceControlExternal" class="ns1blankspaceControl" style="padding-top:10px;">' +
							'Has switch-in<br />access</td></tr>');	

				aHTML.push('</table>');		
				
				$('#ns1blankspaceControl').html(aHTML.join(''));
				
				$('#ns1blankspaceControlInternal').click(function(event)
				{
					ns1blankspace.show({refresh: true});
					ns1blankspace.inputDetected = false;
					nsFreshcare.admin.user.home();
				});

				$('#ns1blankspaceControlExternal').click(function(event)
				{
					ns1blankspace.show({refresh: true});
					ns1blankspace.setup.user.external.show();
				});

				$('#ns1blankspaceControlInternal').addClass('ns1blankspaceHighlight');

				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				
				// v3.1.0 Now filters on logon groups otherwise return will have several rows for some users!
				// v3.1.204 SUP023020 Removed link to persongroups
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_USER_SEARCH';
				oSearch.addField('contactbusinesstext,contactpersontext,username,disabled,contactperson,contactbusiness');
				//oSearch.addFilter('user.contactperson.persongroup', 'IN_LIST', nsFreshcare.data.allGroups.join(','))
				oSearch.rows = 40;
				oSearch.sort('lastlogon', 'desc');
				oSearch.sort('id', 'asc');
				oSearch.getResults(function (data) {nsFreshcare.admin.user.home(oParam, data)});
			}
			else
			{
				var aHTML = [];
				var sRestriction;

				if (oResponse.data.rows.length == 0)
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">' +
									'<tr><td class="ns1blankspaceNothing">Click New to create a user.</td></tr>' +
									'</table>');
				}
				else
				{
					aHTML.push('<table id="ns1blankspaceMostLikely">');
					aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="2">MOST RECENTLY LOGGED ON</td></tr>');
					aHTML.push('<tr>' + 
									'<td class="ns1blankspaceCaption">Business</td>' +
									'<td class="ns1blankspaceCaption">Contact</td>' +
									'<td class="ns1blankspaceCaption">Logon</td>' +
									'<td class="ns1blankspaceCaption">Role</td>' +
								'</tr>');
					
					// v3.1.204 SUP023020 No longer shows dupliates as stright search
					$.each(oResponse.data.rows, function()
					{	
						var sAddClass = (this.disabled === 'Y') ? ' nsFreshcareNotCertified' : '';

						oUsers.push({id: this.id});
						if (this['user.contactperson.persongroup'] === '') {
							sRole = '';
						}
						else if ($.inArray(this['user.contactperson.persongroup'], nsFreshcare.data.groupGrower) > -1) {
							// v3.2.015 SUP023422 Added COP Based Training
							sRole = nsFreshcare.data.growerText
						}
						else if ($.inArray(this['user.contactperson.persongroup'], nsFreshcare.data.groupAuditor) > -1) {
							sRole = 'Auditor'
						}
						else if ($.inArray(this['user.contactperson.persongroup'], nsFreshcare.data.groupTrainer) > -1) {
							sRole = 'Trainer'
						}
						else if ($.inArray(this['user.contactperson.persongroup'], nsFreshcare.data.groupCustomer) > -1) {
							sRole = 'Customer'
						}
						else if ($.inArray(this['user.contactperson.persongroup'], nsFreshcare.data.groupBoard) > -1) {
							sRole = 'Board Member'
						}

						aHTML.push('<tr class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceMostLikely_business-' + this.id + 
												'" class="ns1blankspaceMostLikely' + sAddClass + '" style="width:250px;">' +
												this.contactbusinesstext + 
												'</td>');

						aHTML.push('<td id="ns1blankspaceMostLikely_person-' + this.id + 
												'" class="ns1blankspaceMostLikely' + sAddClass + '" style="width:250px;">' +
												this.contactpersontext + 
												'</td>');

						aHTML.push('<td id="ns1blankspaceMostLikely_username-' + this.id + 
												'" class="ns1blankspaceMostLikely' + sAddClass + '" style="width:250px;">' +
												this.username + 
												'</td>');

						aHTML.push('<td id="ns1blankspaceMostLikely_role-' + this.id + 
												'" class="ns1blankspaceMostLikely' + sAddClass + ' nsFreshcareRole" style="width:250px;">' +
												ns1blankspace.xhtml.loadingSmall + 
												'</td>');

						aHTML.push('</tr>');
						sPreviousId = this.id;

					});
					
					aHTML.push('</tbody></table>');
				}
				
				$('#ns1blankspaceMostLikely').html(aHTML.join(''));

				$('td.ns1blankspaceMostLikely').click(function(event)
				{
					oParam.source = 1;
					fFunctionSearch(event.target.id, oParam);
				});

				oParam.homeStep = 2;
				oParam.users = oUsers;
				nsFreshcare.admin.user.home(oParam);
			}
		}
		else if (oParam.homeStep === 2) {

			if (oResponse === undefined) {

				if (oUsers.length > 0) {

					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_USER_ROLE_SEARCH';
					oSearch.addField('role,roletext,user');
					oSearch.addFilter('user', 'IN_LIST', $.map(oUsers, function(a) {return a.id}).join(','));
					oSearch.rows = 100;
					oSearch.getResults(function(oResponse) {nsFreshcare.admin.user.home(oParam, oResponse)});

				}
				else {
					oParam.homeStep = 3;
				}
			}
			else {

				if (oResponse.status === 'OK') {

					$('.nsFreshcareRole').each(function() {

						var iUserId = this.id.split('-').pop();
						var aRoles = $.grep(oResponse.data.rows, function(a) {return a.user === iUserId});
						if (aRoles.length > 0) 
						{
							if ($.inArray('Admin', $.map(aRoles, function(x) {return x.roletext})) > -1)
							{
								$(this).html('Admin');
							}	
							else
							{
								$(this).html($.map(aRoles, function(a) {return a.roletext}).join('<br />'));
							}
							iUserId = undefined;
						}
						else {
							$(this).html('');
						}
					});
				}
			}
		}
	},

	search: 	
	{
		send: 		function (sXHTMLElementId, iSource, sSearchText, sSearchContext)
		{
			var aSearch = sXHTMLElementId.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[1];
			var oParam;
				
			if (iSource == undefined)
			{
				iSource = ns1blankspace.data.searchSource.text;
			}
			else if ($.type(iSource) == 'object')	
			{
				oParam = iSource;
				iSource = oParam.source;
			}
				
			if (sSearchContext != undefined && iSource != ns1blankspace.data.searchSource.browse)
			{
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_USER_SEARCH';
				oSearch.addField('username,contactperson,user.contactperson.firstname,user.contactperson.surname,contactbusiness,contactbusinesstext,lastlogon,passwordexpiry' + 
								',disabled,disabledreason,unrestrictedaccess,user.contactperson.email,se' + nsFreshcare.data.userPasswordId +
								',sessiontimeout,' + ns1blankspace.option.auditFields);		// systemadmin
				oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(data) {nsFreshcare.admin.user.show(data, oParam)});
			}
			else
			{
				var iMinimumLength = 3;
				var iMaximumColumns = 1;
				
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
					sElementId = 'ns1blankspaceViewControlBrowse';
				}
				
				if (sSearchText.length >= iMinimumLength || iSource == ns1blankspace.data.searchSource.browse)
				{	
					// v3.1.1i SUP022764 Added searching by first / surname
					var sSurname = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').pop() : sSearchText;
					var sFirstName = (sSearchText.split(' ').length > 1) ? sSearchText.split(' ').shift() : sSearchText;

					ns1blankspace.container.position({xhtmlElementID: sElementId});
					ns1blankspace.search.start(sElementId);
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_USER_SEARCH';
					oSearch.addField('contactbusinesstext,contactpersontext,username');
					
					if (iSource == ns1blankspace.data.searchSource.browse)
					{
						oSearch.addFilter('username', 'TEXT_STARTS_WITH', sSearchText);
					}
					else
					{	
						oSearch.addBracket('(');
						oSearch.addFilter('username', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator('or');
						oSearch.addFilter('contactbusinesstext', 'TEXT_IS_LIKE', sSearchText);
						oSearch.addOperator('or');
						oSearch.addBracket('(');
						oSearch.addFilter('user.contactperson.firstname', 'TEXT_IS_LIKE', sFirstName);
						oSearch.addOperator((sFirstName != sSurname ? 'and' : 'or'));
						oSearch.addFilter('user.contactperson.surname', 'TEXT_IS_LIKE', sSurname);
						oSearch.addBracket(')');
						oSearch.addBracket(')');
					}	
					
					oSearch.getResults(nsFreshcare.admin.user.search.process);
				}
			};	
		},

		process:	function (oResponse)
		{
			var iColumn = 0;
			var aHTML = [];
			var h = -1;
			var	iMaximumColumns = 1;		// v1.0.26 Was set to 1 causing two result rows to be displayed on each row
				
			ns1blankspace.search.stop();
			if (oResponse.data.rows.length == 0)
			{
				$(ns1blankspace.xhtml.container).hide();
			}
			else
			{	
				aHTML.push('<table class="ns1blankspaceSearchMedium">');
				
				$.each(oResponse.data.rows, function()
				{	
					var sAddClass = (this.disabled === 'Y') ? ' nsFreshcareNotCertified' : '';
					iColumn = iColumn + 1;
					
					if (iColumn == 1)
					{
						aHTML.push('<tr class="ns1blankspaceSearch">');
					}
					
					aHTML.push('<td class="ns1blankspaceSearch' + sAddClass + '" id="' +
									'-' + this.id + '">' +
									this.contactbusinesstext + '</td>');
					
					aHTML.push('<td class="ns1blankspaceSearch' + sAddClass + '" id="' +
									'-' + this.id + '">' +
									this.contactpersontext + '</td>');
					
					if (iColumn == iMaximumColumns)
					{
						aHTML.push('</tr>');
						iColumn = 0;
					}	
				});
		    	
				aHTML.push('</table>');

				// v3.1.1i SUP022764 Now paginates
				$(ns1blankspace.xhtml.searchContainer).html(
					ns1blankspace.render.init({
						html: aHTML.join(''),
						more: (oResponse.morerows === "true")
					}));		
				
				$('td.ns1blankspaceSearch').click(function(event)
				{
					$(ns1blankspace.xhtml.dropDownContainer).html('&nbsp;');
					$(ns1blankspace.xhtml.dropDownContainer).hide(ns1blankspace.option.hideSpeedOptions)
					nsFreshcare.admin.user.search.send(event.target.id, 1);
				});
				
				// v3.2.005 SUP022879 Now passes oResponse.rows to make sure we have matching row counts
				ns1blankspace.render.bind(
				{
					columns: 'contactbusinesstext-column-contactpersontext',
					more: oResponse.moreid,
					rows: oResponse.rows,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.user.search.send
				});   
			}			
		}
	},				

	layout: 	function ()
	{
		var aHTML = [];
		var oContext = nsFreshcare.admin.user.getContext();

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

			aHTML.push('<table class="ns1blankspaceControl">');

			aHTML.push('<tr><td id="ns1blankspaceControlAccess" class="ns1blankspaceControl">' +
							'Roles</td></tr>');

			aHTML.push('<tr><td id="ns1blankspaceControlNetworkGroups" class="ns1blankspaceControl">' +
							'Network Groups</td></tr>');

			aHTML.push('<table class="ns1blankspaceControl">');

			aHTML.push('<tr><td id="ns1blankspaceControlNetwork" class="ns1blankspaceControl">' +
							'Network</td></tr>');
		}	

		aHTML.push('</table>');					
					
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];
	
		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAccess" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainNetworkGroups" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainNetwork" class="ns1blankspaceControlMain"></div>');
				
		$('#ns1blankspaceMain').html(aHTML.join(''));
			

		ns1blankspace.app.context(oContext);
		$('#ns1blankspaceViewControlAction').button({disabled: oContext.action == false}); 
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			$('#ns1blankspaceViewControlAction').button({disabled: oContext.action == false}); 
			nsFreshcare.admin.user.summary();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			$('#ns1blankspaceViewControlAction').button({disabled: oContext.action == false}); 
			nsFreshcare.admin.user.details();
		});
		
		$('#ns1blankspaceControlAccess').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainAccess', context: {inContext: false}});
			nsFreshcare.admin.user.access.show();
		});

		$('#ns1blankspaceControlNetworkGroups').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainNetworkGroups', context: {inContext: false}});
			nsFreshcare.admin.user.networkGroups.show();
		});

		// v3.2.010 SUP023430 Added Network tab
		$('#ns1blankspaceControlNetwork').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainNetwork'});
			ns1blankspace.setup.user.network.show();
		});
	},

	getContext: function()
	{
		// v3.1.207 SUP022058 Determine context options
		nsFreshcare.admin.user.canSave = (ns1blankspace.objectContext == -1 || nsFreshcare.freshcareAdministrator || nsFreshcare.supportAdmin);

		var oContext = {all: false, 'new': true, action: true, actionOptions: false}

		if (!nsFreshcare.admin.user.canSave && ns1blankspace.data.userRoleText != 'Admin') 
			{ 	oContext = oContext}
		else if (nsFreshcare.admin.user.canSave)
			{ 	oContext = {}}
		else
			{ 	oContext.action = false}

		return oContext;
	},

	show:		function (oResponse, oParam)
	{
		// v3.1.1e SUP022638 Now processes functionLayout parameter
		var fFunctionLayout = ns1blankspace.util.getParam(oParam, 'functionLayout', {'default': nsFreshcare.admin.user.layout}).value;

		if (oParam == undefined) {oParam = {}}
		if (oParam.showStep === undefined) {oParam.showStep = 1}

		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

		fFunctionLayout();
		
		var aHTML = [];
		
		if (oParam.showStep === 1 && oResponse.data.rows.length == 0)
		{
			ns1blankspace.objectContextData = undefined;
			
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find this user.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			if (oParam.showStep === 1) 
			{ 
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				
				var sContext = ns1blankspace.objectContextData.username;
				var aContext = sContext.split("@");
				sContext = aContext[0];
				
				for (var i = 1; i < aContext.length; i++)
				{
					sContext += '<br />@' + aContext[i];
				}

				$('#ns1blankspaceControlContext').html(sContext);

				ns1blankspace.data.contactPerson = ns1blankspace.objectContextData['contactperson'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['user.contactperson.firstname'] + ' ' + ns1blankspace.objectContextData['user.contactperson.surname'];
				ns1blankspace.data.contactBusiness = ns1blankspace.objectContextData['contactbusiness'];
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['contactbusinesstext'];

				oParam.showStep = 2;
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_USER_ROLE_SEARCH';
				oSearch.addField('role,roletext,user');
				oSearch.addFilter('user', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status == 'OK') 
					{	
						if (oResponse.data.rows.length >= 1) 
						{
							// v3.1.1i SUP022764 Now allows multi-admin roles
							// v3.2.001 SUP023329 Now alows multi-internal roles
							// v3.2.002 SUP023329 User was unable to switch-in as data.roles was not an array;
							if ($.grep(oResponse.data.rows, function(x) {return $.inArray(x.role, nsFreshcare.data.rolesInternal) > -1}).length > 0)
							{
								ns1blankspace.data.userRole = ($.grep(oResponse.data.rows, function(x) 
																	{return x.id == nsFreshcare.data.roles.admin}).length == 0) 
																? oResponse.data.rows[0].id 
																: nsFreshcare.data.roles.admin;
								ns1blankspace.data.userRoleText = ($.grep(oResponse.data.rows, function(x) 
																	{return x.id == nsFreshcare.data.roles.admin}).length == 0) 
																? oResponse.data.rows[0].roletext 
																: 'Admin';
								ns1blankspace.data.roles = $.map(oResponse.data.rows, function(x) {return {id: x.role, title: x.roletext}});
							}
							else
							{
								ns1blankspace.data.userRole = oResponse.data.rows[0].role;
								ns1blankspace.data.userRoleText = oResponse.data.rows[0].roletext;
								ns1blankspace.data.roles = $.map([oResponse.data.rows[0]], function(x) {x.id = x.role; x.title = x.roletext; return x;});	
							}
						}
						else 
						{
							ns1blankspace.data.userRole = undefined;
							ns1blankspace.data.userRoleText = undefined;
							ns1blankspace.data.roles = undefined;
						}

						nsFreshcare.admin.user.show(oResponse, oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding user roles: ' + oResponse.error.errornotes);
					}
				});
			}

			else if (oParam.showStep === 2) 
			{

				oParam.showStep = undefined;

				var oContext = nsFreshcare.admin.user.getContext()
				ns1blankspace.app.context(oContext);				
				$('#ns1blankspaceViewControlAction').button({disabled: oContext.action == false}); 

				ns1blankspace.history.view(
				{
					newDestination: 'nsFreshcare.admin.user.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
				});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.user.summary()'});
			}
		}		
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this user.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:250px;"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];
			var sTmpClass = ''

			aHTML.push('<table class="ns1blankspaceColumn1">');
			
			if (ns1blankspace.objectContextData.disabled == 'Y')
			{
				sTmpClass = ' ns1blankspaceDisabled';
			}
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">User Name</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryUserName" class="ns1blankspaceSummary' + sTmpClass + '">' +
							ns1blankspace.objectContextData.username.formatXHTML() +
							'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Business</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryName" class="ns1blankspaceSummary">' +
							ns1blankspace.data.contactBusinessText.formatXHTML() +
							'</td></tr>');
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Contact</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryName" class="ns1blankspaceSummary">' +
							ns1blankspace.data.contactPersonText.formatXHTML() +
							'</td></tr>');
			
			if (ns1blankspace.objectContextData.lastlogon != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Last Logon</td></tr>' +
							'<tr><td id="ns1blankspaceSummaryLastLogon" class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData.lastlogon +
							'</td></tr>');
			}
			
			aHTML.push('<tr id="ns1blankspaceSummaryInitialPasswordCaptionRow"><td class="ns1blankspaceSummaryCaption">Initial / Reset Password</td></tr>' +
						'<tr id="ns1blankspaceSummaryInitialPasswordValueRow"><td id="ns1blankspaceSummaryInitialPassword" class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['se' + nsFreshcare.data.userPasswordId] +
						'</td></tr>');
			
			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));
			if (ns1blankspace.objectContextData['se' + nsFreshcare.data.userPasswordId] == '')
			{
				$('#ns1blankspaceSummaryInitialPasswordCaptionRow').hide();
				$('#ns1blankspaceSummaryInitialPasswordValueRow').hide();
			}
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspaceColumn2">');
			
			// v3.1.207 SUP023058 Not visible for admin users if selected user is admin and is self
			// v3.2.015 SUP023422 Added COP Based Training
			if (ns1blankspace.data.userRole != undefined && nsFreshcare.user.roleID == nsFreshcare.data.roles.admin 
				&& ns1blankspace.objectContext != ns1blankspace.user.id
				&& (nsFreshcare.freshcareAdministrator || ns1blankspace.data.userRoleText != 'Admin')
				)
			{
				aHTML.push('<tr><td><span style="font-size:0.75em;" id="ns1blankspaceSwitchIn">' +
								'Switch-In</span></td></tr>');
				
				aHTML.push('<tr><td>&nbsp;</td></tr>');
			}

			// v3.1.1e SUP022638 Only visible if SystemAdmin
			// v3.1.207 SUP023058 Not visible for admin users if selected user is admin and not themself
			// v3.2.015 SUP023422 Added COP Based Training
			if (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin 
				&& (nsFreshcare.freshcareAdministrator 
					|| (ns1blankspace.data.userRoleText != 'Admin' 
					|| ns1blankspace.objectContext == ns1blankspace.user.id)
					))
			{
				aHTML.push('<tr><td id="ns1blankspaceResetPasswordContainer"><span style="font-size:0.75em;" id="ns1blankspaceResetPassword">' +
								'Reset Password</span></td></tr>');
			}

			aHTML.push('</table>');								
			
			$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));
			
			$('#ns1blankspaceSwitchIn').button({})
			.click(function() {	
				nsFreshcare.admin.user.switchIn();
			});

			$('#ns1blankspaceResetPassword').button(
			{
				
			})
			.click(function()
			{	
				ns1blankspace.status.working();

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
					data: 'password=&passwordexpiry=' + Date.today().add(-1).days().toString("dd-MMM-yyyy") +'&id=' + ns1blankspace.objectContext,
					dataType: 'json',
					async: false,
					success: function(data)
						{
							if (data.status === 'OK')
							{
								ns1blankspace.status.clear();
								$('#ns1blankspaceResetPasswordContainer').html('New password is <strong>' + data.password + '</strong>');
								$('#ns1blankspaceSummaryInitialPassword').html(data.password);
								ns1blankspace.objectContextData['se' + nsFreshcare.data.userPasswordId] = data.password;
								$('#ns1blankspaceSummaryInitialPasswordCaptionRow').show();
								$('#ns1blankspaceSummaryInitialPasswordValueRow').show();
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
									data: 'id=' + ns1blankspace.objectContext + '&se' + nsFreshcare.data.userPasswordId + '=' + data.password,
									success: function(oResponse)
									{
										if (oResponse.status != 'OK')
										{
											ns1blankspace.status.error('Error updating password on user record: ' + oResponse.error.errornotes);
										}
									}
								});
							}
							else
							{
								ns1blankspace.status.error('Error resetting password: ' + oResponse.error.errornotes);
							}
						}
				});
			})
		}	
	},

	details: 	function ()
	{
		var aHTML = [];
		
		if ($('#ns1blankspaceMainDetails').attr('data-loading') == '1')
		{
			$('#ns1blankspaceMainDetails').attr('data-loading', '');
			
			aHTML.push('<table class="ns1blankspaceContainer">');
			aHTML.push('<tr class="ns1blankspaceContainer">' +
							'<td id="ns1blankspaceDetailsColumn1" class="ns1blankspaceColumn1"></td>' +
							'<td id="ns1blankspaceDetailsColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>');
			aHTML.push('</table>');					
			
			$('#ns1blankspaceMainDetails').html(aHTML.join(''));
			
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspace">');
			
			if (ns1blankspace.objectContext == -1)
			{

				if (nsFreshcare.freshcareAdministrator || nsFreshcare.supportAdmin)
				{
					aHTML.push('<tr><td><table style="width:100%;border:2px solid #C0C0C0;padding:3px;">');

					aHTML.push('<tr><td class="ns1blankspaceSub">Use this section to add a new ' + ns1blankspace.spaceText + ' staff user.</td></tr>');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'First Name' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsFirstName" class="ns1blankspaceText">' +
									'</td></tr>');	

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Last Name' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsLastName" class="ns1blankspaceText">' +
									'</td></tr>');
					aHTML.push('</table>');
				}

				aHTML.push('<table width="100%"><tr><td>&nbsp;</td></tr></table>');

				aHTML.push('<table style="width:100%;border:2px solid #C0C0C0; padding:3px;">');
				// v3.2.015 SUP023422 Added COP Based Training
				aHTML.push('<tr><td class="ns1blankspaceSub">Use this section to add external users (' + nsFreshcare.data.growersText + ',Customers, etc).</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Business' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceSelect">' +
							'<input id="ns1blankspaceSetupUserBusiness" class="ns1blankspaceSelect"' +
								' data-method="CONTACT_BUSINESS_SEARCH"' +
								' data-columns="tradename"' + 
								' data-methodFilter="tradename-TEXT_IS_LIKE|' +
									'id-NOT_EQUAL_TO-' + ns1blankspace.user.contactBusiness + '"' +
								' data-click="nsFreshcare.util.defaultContactPerson">' +
							'</td></tr>');	

			}

			// v3.1.207 SUP023043 Now allows user to change contact person (not business) for the selected user.
			// v3.1.208 Freshcare also need to be able to choose non-primarycontactperson
			if (ns1blankspace.objectContext == -1
				|| (ns1blankspace.objectContext != -1 && nsFreshcare.freshcareAdministrator))
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption">' +
								'Contact' +
								'</td></tr>' +
								'<tr class="ns1blankspaceText">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceSetupUserPerson" class="ns1blankspaceSelect"' +
									' data-method="CONTACT_PERSON_SEARCH"' +
									' data-columns="firstname-space-surname"' +
									((ns1blankspace.objectContext == -1)
									  ? ' data-methodFilter="contactperson.contactbusiness-NOT-EQUAL_TO-' + ns1blankspace.user.contactBusiness + '|' +
									  			'firstname-TEXT_IS_LIKE|surname-TEXT_IS_LIKE"' +
										' data-parent="ns1blankspaceSetupUserBusiness"' +
										' data-parent-search-id="contactbusiness"' +
										' data-parent-search-text="tradename"' +
										' data-click="nsFreshcare.admin.user.growerUserName">'
									  : 'data-methodFilter="contactbusiness-EQUAL_TO-' + ns1blankspace.objectContextData.contactbusiness + '"') +
								'</td></tr>');
			}

			if (ns1blankspace.objectContext == -1)
			{
				aHTML.push('</table></td></tr>');
			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Logon Name' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsUserName" class="ns1blankspaceText ns1blankspaceLimitedAccess">' +
							'</td></tr>');	

			if (ns1blankspace.objectContext != -1)		
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Password Expires' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsPasswordExpiry" class="ns1blankspaceDate ns1blankspaceLimitedAccess">' +
								'</td></tr>');	

				// v3.1.1i SUP022772 Added session timeout
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'Session Timeout (minutes)' +
								'</td></tr>' +
								'<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsSessionTimeout" class="ns1blankspaceDate ns1blankspaceLimitedAccess">' +
								'</td></tr>');	
			}
		
			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
			
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceColumn2">');
		
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Disabled' +
							'</td></tr>' +
							'<tr class="ns1blankspace">' +
							'<td class="ns1blankspaceRadio">' +
							'<input type="radio" id="radioDisabledN" name="radioDisabled" class="ns1blankspaceLimitedAccess" value="N"/>No&nbsp;&nbsp;' +
							'<input type="radio" id="radioDisabledY" name="radioDisabled" class="ns1blankspaceLimitedAccess" value="Y"/>Yes' +
							'</td></tr>');

			aHTML.push('<tr id="ns1blankspaceDetailsAuthenticationRow" class="ns1blankspace">' +
							'<td class="ns1blankspaceRadio">' +
							'<input type="radio" id="radioAuthenticationLevel1" name="radioAuthenticationLevel" value="1"/>Standard<br />' +
							'<input type="radio" id="radioAuthenticationLevel2" name="radioAuthenticationLevel" value="2"/>With Token<br />' +
							'<input type="radio" id="radioAuthenticationLevel3" name="radioAuthenticationLevel" value="3"/>With 2nd Factor Token' +
							'</td></tr>'); 						

			 aHTML.push('<tr id="ns1blankspaceDetailsAuthenticationDeliveryRow" class="ns1blankspace">' +
							'<td class="ns1blankspaceRadio">' +
							'<input type="radio" id="radioAuthenticationDelivery1" name="radioAuthenticationDelivery" value="1"/>Email<br />' +
							'<input type="radio" id="radioAuthenticationDelivery2" name="radioAuthenticationDelivery" value="2"/>SMS' +
							'</td></tr>');

			if (ns1blankspace.objectContext != -1)
			{		
				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Disabled Reason' +
							'</td></tr>' +
							'<tr class="ns1blankspaceTextMulti">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsDisabledReason" class="ns1blankspaceTextMultiSmall ns1blankspaceLimitedAccess"></textarea>' +
							'</td></tr>');
			}
			
			aHTML.push('</table>');					
			
			$('#ns1blankspaceDetailsColumn2').html(aHTML.join(''));
			$('#ns1blankspaceDetailsAuthenticationRow').hide();
			$('#ns1blankspaceDetailsAuthenticationDeliveryRow').hide();
			$('.ns1blankspaceDate').datepicker({dateFormat: 'dd M yy'});

			// v3.1.1i SUP022764 Disable fields if non-freshcareAdministrator and viewing an admin user
			if (!nsFreshcare.freshcareAdministrator && ns1blankspace.data.userRoleText == 'Admin')
			{
				$('.ns1blankspaceLimitedAccess')
					.addClass('nsFreshcareDisabled')
					.attr('disabled', 'disabled');
			}

			// v3.1.208 Was setting contactperson data-id to contactpersontext
			if (ns1blankspace.objectContextData != undefined)
			{
				$('#ns1blankspaceDetailsUserName').val(ns1blankspace.objectContextData.username);
				$('#ns1blankspaceDetailsPasswordExpiry').val(ns1blankspace.objectContextData.passwordexpiry);
				$('#ns1blankspaceDetailsSessionTimeout').val(ns1blankspace.objectContextData.sessiontimeout);
				$('[name="radioDisabled"][value="' + ns1blankspace.objectContextData.disabled + '"]').attr('checked', true);
				$('[name="radioDisabled"][value="' + ns1blankspace.objectContextData.systemadministrator + '"]').attr('checked', true);
				$('#ns1blankspaceDetailsDisabledReason').val(ns1blankspace.objectContextData.disabledreason);
				$('#ns1blankspaceSetupUserPerson').val(ns1blankspace.objectContextData['user.contactperson.firstname'].formatXHTML() + ' ' + 
														ns1blankspace.objectContextData['user.contactperson.surname'].formatXHTML());
				$('#ns1blankspaceSetupUserPerson').attr('data-id', ns1blankspace.objectContextData.contactperson);
			}
			else
			{
				$('[name="radioDisabled"][value="N"]').attr('checked', true);
			
				if (ns1blankspace.data.contactBusiness != undefined) {
					$('#ns1blankspaceSetupUserBusiness').attr('data-id', ns1blankspace.data.contactBusiness);
					ns1blankspace.xhtml.divID = 'ns1blankspaceSetupUserBusiness';
					nsFreshcare.util.defaultContactPerson({updateBusinessText: true});						}
			}
			$('[name="radioAuthenticationLevel"][value="1"]').attr('checked', true);
			$('[name="radioAuthenticationDelivery"][value="1"]').attr('checked', true);
		}	
	},

	growerUserName: function() 
	{
		// v3.1.207 SUP023058 Now looks at Business group, not persongroup
		// Check if this user is a grower - if so, generate user name
		if ($('#ns1blankspaceSetupUserPerson').attr('data-id') != undefined) {

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			//oSearch.addField('contactperson.persongroup,contactperson.persongrouptext,contactperson.contactbusiness.reference,contactperson.email');
			oSearch.addField('contactperson.contactbusiness.businessgroup,contactperson.contactbusiness.businessgrouptext,' +
								'contactperson.contactbusiness.reference,contactperson.email');
			oSearch.addFilter('id', 'EQUAL_TO', $('#ns1blankspaceSetupUserPerson').attr('data-id'));
			oSearch.getResults(function(oResponse) 
			{
				if (oResponse.status === 'OK') 
				{
					var aGrower = $.grep(oResponse.data.rows, function(a) {
							return a['contactperson.contactbusiness.businessgroup'] != "" 
									&& a['contactperson.contactbusiness.businessgroup'] == nsFreshcare.data.businessGroupGrowerID
						});
					
					if (aGrower.length > 0) 
					{
						// v3.2.015 SUP023422 Added COP Based Training
						$('#ns1blankspaceDetailsUserName').val(aGrower[0]['contactperson.contactbusiness.reference'] + '@' + nsFreshcare.data.userNameSuffix);
						// v3.2.015 SUP023422 Added COP Based Training
						ns1blankspace.data.userRoleText = nsFreshcare.data.growerText;
					}
					else {
						$('#ns1blankspaceDetailsUserName').val(oResponse.data.rows[0]['contactperson.email']);
						ns1blankspace.data.userRoleText = oResponse.data.rows[0]['contactperson.contactbusiness.businessgrouptext'];
					}

					/*
					var aGrower = $.grep(oResponse.data.rows, function(a) {
							return a['contactperson.persongroup'] != "" && $.inArray(a['contactperson.persongroup'], nsFreshcare.data.groupGrower) > -1
						});
					
					if (aGrower.length > 0) {
						$('#ns1blankspaceDetailsUserName').val(aGrower[0]['contactperson.contactbusiness.reference'] + '@' + nsFreshcare.data.userNameSuffix);
						ns1blankspace.data.userRoleText = 'Grower';
					}
					else {
						$('#ns1blankspaceDetailsUserName').val(oResponse.data.rows[0]['contactperson.email']);
						ns1blankspace.data.userRoleText = oResponse.data.rows[0]['contactperson.persongrouptext'];
					}
					*/
				}
			});
		}
	},

	access: 	
	{			
		layout:		function ()
		{
			var aHTML = [];

			if ($('#ns1blankspaceMainAccess').attr('data-loading') == '1')
			{
				$('#ns1blankspaceMainAccess').attr('data-loading', '');
				
				aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceAccessColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'<td id="ns1blankspaceAccessColumn2" class="ns1blankspaceColumn2" style="width:250px;"></td>' +
								'</tr>' + 
								'</table>');

				$('#ns1blankspaceMainAccess').html(aHTML.join(''));
				
				var aHTML = [];
			
				aHTML.push('<table class="interfaceMain">');
			
				/*aHTML.push('<tr class="ns1blankspaceRow">' +
								'<td id="ns1blankspaceAccessUnrestricted" class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioAccessUnrestrictedY" name="radioAccessUnrestricted" value="Y"/>Access&nbsp;to&nbsp;everything<br />' +
								'<input type="radio" id="radioAccessUnrestrictedN" name="radioAccessUnrestricted" value="N"/>Restricted by role' +
								'</td></tr>');
				*/

				aHTML.push('<tr><td style="padding-top:10px;" id="ns1blankspaceRoles"></td></tr>');
				
				aHTML.push('</table>');					
				
				$('#ns1blankspaceAccessColumn1').html(aHTML.join(''));
					
				/*if (ns1blankspace.objectContextData != undefined)
				{
					$('[name="radioAccessUnrestricted"][value="' + ns1blankspace.objectContextData.unrestrictedaccess + '"]').attr('checked', true);
				}
				else
				{
					$('[name="radioAccessUnrestricted"][value="Y"]').attr('checked', true);
				}
			*/
			}	
		},

		show:		function (oParam, oResponse)
		{
			var aHTML = [];
												
			nsFreshcare.admin.user.access.layout();

			if (ns1blankspace.objectContextData != undefined)
			{
				if (oResponse == undefined)
				{
					$('#ns1blankspaceRoles').html(ns1blankspace.xhtml.loadingSmall);

					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_USER_ROLE_SEARCH';
					oSearch.addField('roletext,role');
					oSearch.addFilter('user', 'EQUAL_TO', ns1blankspace.objectContext)
					oSearch.rows = 50;
					oSearch.sort('roletext', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.admin.user.access.show(oParam, data)})	
				}
				else
				{
					var aHTML = [];

					// v3.1.1i SUP022764 Can only add roles if administrator or non-administrator and adding roles to non-admin user
					if (nsFreshcare.freshcareAdministrator || nsFreshcare.supportAdmin
						|| (!nsFreshcare.freshcareAdministrator && ns1blankspace.data.userRoleText != 'Admin'))
					{
						aHTML.push('<table class="ns1blankspaceColumn2">');
						// v3.2.015 SUP023422 Added COP Based Training
						aHTML.push('<tr>' +
										'<td class="ns1blankspaceNothing" style="font-weight:600;">Click Add Role to define the user\'s logon, ie: ' + nsFreshcare.data.growerText + ', Trainer, etc.</td></tr>');	
										//'<td class="ns1blankspaceNothing" style="font-weight:600;">This user can access all functions within this space.</td></tr>' +
										//'<tr><td class="ns1blankspaceNothing" style="padding-bottom:15px;">If you select <em>restricted by role</em>, the user will be restricted to any predefined <em>user roles</em> assigned to them.</td></tr>');	

					aHTML.push('<table class="ns1blankspaceColumn2">' +
									'<tr><td><span class="ns1blankspaceAction" id="ns1blankspaceUserAccessRolesAdd">' +
									'Add Role</span></td></tr>' +
									'</table>');	
					}
					
					$('#ns1blankspaceAccessColumn2').html(aHTML.join(''));
					
					var aHTML = [];
					var h = -1;	
							
					aHTML.push('<table class="ns1blankspace">');
			
					if (oResponse.data.rows.length == 0)
					{
						if (ns1blankspace.objectContextData.unrestrictedaccess == 'N')
						{
							aHTML.push('<tr><td class="ns1blankspaceNothing">' +
										'This user has no roles and thus no functional access.</td></tr>');
						}
						else
						{
							aHTML.push('<tr><td class="ns1blankspaceNothing">' +
										'This user has no roles assigned to them.</td></tr>');
						}	
					}

					$(oResponse.data.rows).each(function()
					{
						aHTML.push('<tr id="ns1blankspaceUserRole" class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceUserRole_title-' + this.id + '" class="ns1blankspaceRow">' +
												this.roletext + '</td>');

						aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
										'<span id="ns1blankspaceUserAccessRole_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span>' +
										'</td>');	

						aHTML.push('</tr>');
					});
				
					aHTML.push('</table>');
						
					$('#ns1blankspaceRoles').html(aHTML.join(''));

					if (nsFreshcare.freshcareAdministrator || nsFreshcare.supportAdmin
						|| (!nsFreshcare.freshcareAdministrator && ns1blankspace.data.userRoleText != 'Admin'))
					{
						$('#ns1blankspaceUserAccessRolesAdd').button(
						{
							label: "Add Role"
						})
						.click(function() 
						{
							var oParam = (!nsFreshcare.freshcareAdministrator) ? {excludeAdminRoles: true} : {};
							// v3.1.209b Removed as was causing role button not to activate
							//ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceUserAccessRolesAdd', leftOffset: -252, topOffset: -42});
							nsFreshcare.admin.user.access.add(oParam);
						})
						.css('width', '75px')

						$('.ns1blankspaceRowRemove').button(
						{
							text: false,
						 	icons: {primary: "ui-icon-close"}
						})
						.click(function() {
							ns1blankspace.setup.user.access.remove(this.id)
						})
						.css('width', '15px')
						.css('height', '20px')
					}
				}
			}
		},

		add: function (oParam, oResponse)
		{
			if (oParam == undefined) {oParam = {}}
			if (oParam.userType == undefined) {oParam.userType = 1}
			var iUserType = ns1blankspace.util.getParam(oParam, 'userType').value;
			var bExcludeAdminRoles = ns1blankspace.util.getParam(oParam, 'excludeAdminRoles', {'default': false}).value;
			var aAdminRoles = [];

			if ($(ns1blankspace.xhtml.container).attr('data-initiator') == 'ns1blankspaceUserAccessRolesAdd')
			{
				$(ns1blankspace.xhtml.container).slideUp(500);
				$(ns1blankspace.xhtml.container).attr('data-initiator', '');
			}
			else
			{
				if (oResponse == undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_ROLE_SEARCH';
					oSearch.addField('title,notes');
					if (bExcludeAdminRoles)
					{
						$.each(nsFreshcare.data.roles, function(key, value) {aAdminRoles.push(value)})
						oSearch.addFilter('id', 'NOT_IN_LIST', aAdminRoles.join(','));
					}
					oSearch.sort('title', 'asc');
					oSearch.getResults(function(data)
					{
						nsFreshcare.admin.user.access.add(oParam, data)
					});
				}
				else
				{
					ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceUserAccessRolesAdd', leftOffset: -252, topOffset: -42});
		
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">' +
										'No roles.</td></tr></table>');

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceUserRoles" class="ns1blankspaceSearchMedium" style="font-size:0.875em;">');
						
						$.each(oResponse.data.rows, function()
						{	
							aHTML.push('<tr class="ns1blankspaceRow">');
							
							aHTML.push('<td id="ns1blankspaceUserAccessRoles-title-' + this.id + '" class="ns1blankspaceRowSelect">' +
													this.title + '</td>');
							
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');;

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						
						$('#ns1blankspaceUserRoles td.ns1blankspaceRowSelect').click(function(event)
						{
							oParam.xhtmlElementID = event.target.id;
							ns1blankspace.setup.user.access.select(oParam);
						});
					}
				}
			}	
		},

		select: function(oParam)
		{
			var sXHTMLElementID;
			var iUser = ns1blankspace.objectContext;
			var iUserType = 1;

			if (oParam != undefined)
			{
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.user != undefined) {iUser = oParam.user}
				if (oParam.userType != undefined) {iUserType = oParam.userType}
			}		

			if (sXHTMLElementID)
			{
				var aSearch = sXHTMLElementID.split('-');
				var iRole = aSearch[2];
				
				$('#' + sXHTMLElementID).fadeOut(500);
				
				var sData = 'user=' + iUser +
							'&role=' + iRole;
							
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('SETUP_USER_ROLE_MANAGE'),
					data: sData,
					dataType: 'json',
					success: function(data)
					{
						if (iUserType == 1)
						{	
							// v3.2.010 SUP023430 Now auto-adds access to Messaging when new dmin user added
							if (iRole == nsFreshcare.data.roles.admin)
							{
								nsFreshcare.admin.user.save.saveConversations({processUserStep: 5, canConverse: true});
							}
							else
							{
								ns1blankspace.setup.user.access.show();
							}
						}
						else
						{	
							ns1blankspace.setup.user.external.show({step:3, user: iUser});
						}	
					}
				});
			}	
		}
	},

	networkGroups: 	
	{			
		layout:		function ()
		{
			var aHTML = [];

			if ($('#ns1blankspaceMainNetworkGroups').attr('data-loading') == '1')
			{
				$('#ns1blankspaceMainNetworkGroups').attr('data-loading', '');
				
				aHTML.push('<table class="ns1blankspaceContainer">' +
								'<tr class="ns1blankspaceContainer">' +
								'<td id="ns1blankspaceNetworkGroupsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
								'<td id="ns1blankspaceNetworkGroupsColumn2" class="ns1blankspaceColumn2" style="width:250px;"></td>' +
								'</tr>' + 
								'</table>');

				$('#ns1blankspaceMainNetworkGroups').html(aHTML.join(''));
				
				var aHTML = [];
			
				aHTML.push('<table class="interfaceMain">');
			
				aHTML.push('<tr><td style="padding-top:10px;" id="ns1blankspaceNetworkGroups"></td></tr>');
				
				aHTML.push('</table>');					
				
				$('#ns1blankspaceNetworkGroupsColumn1').html(aHTML.join(''));
					
			}	
		},

		show:		function (oParam, oResponse)
		{
			var aHTML = [];
			
			if (oParam === undefined) {oParam = {};}

			nsFreshcare.admin.user.networkGroups.layout();

			if (ns1blankspace.objectContextData != undefined)
			{
				if (oResponse == undefined)
				{
					$('#ns1blankspaceNetworkGroups').html(ns1blankspace.xhtml.loadingSmall);

					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_USER_NETWORK_GROUP_SEARCH';
					oSearch.addField('networkgrouptext,networkgroup');
					oSearch.addFilter('user', 'EQUAL_TO', ns1blankspace.objectContext)
					oSearch.rows = 50;
					oSearch.sort('networkgrouptext', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.admin.user.networkGroups.show(oParam, data)})	
				}
				else
				{
					var aHTML = [];

					aHTML.push('<table class="ns1blankspaceColumn2">' +
									'<tr><td><span class="ns1blankspaceAction" id="ns1blankspaceUserNetworkGroupAdd">' +
									'</span></td></tr>' +
									'</table>');	

					
					$('#ns1blankspaceNetworkGroupsColumn2').html(aHTML.join(''));
					
					var aHTML = [];
							
					aHTML.push('<table class="ns1blankspace">');
			
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<tr><td class="ns1blankspaceNothing">' +
									'This user has no network groups assigned to them.</td></tr>');
					}

					$(oResponse.data.rows).each(function()
					{
						aHTML.push('<tr id="ns1blankspaceUserNetworkGroups" class="ns1blankspaceRow">');
						
						aHTML.push('<td id="ns1blankspaceUserNetworkGroups_title-' + this.id + '" class="ns1blankspaceRow">' +
												this.networkgrouptext + '</td>');

						aHTML.push('<td style="width:30px;text-align:right;" class="ns1blankspaceRow">' +
										'<span id="ns1blankspaceUserNetworkGroups_options_remove-' + this.id + '" class="ns1blankspaceRowRemove"></span>' +
										'</td>');	

						aHTML.push('</tr>');
					});
				
					aHTML.push('</table>');
						
					$('#ns1blankspaceNetworkGroups').html(aHTML.join(''));

					// v3.1.207 SUP023058 Now restricts removing network groups
					if (nsFreshcare.freshcareAdministrator || nsFreshcare.supportAdmin
						|| (!nsFreshcare.freshcareAdministrator && ns1blankspace.data.userRoleText != 'Admin'))
					{
						$('#ns1blankspaceUserNetworkGroupAdd').button(
						{
							label: "Add Network Group"
						})
						.click(function() {
							ns1blankspace.container.position({xhtmlElementID: 'ns1blankspaceUserNetworkGroupsAdd', leftOffset: -252, topOffset: -42});
							nsFreshcare.admin.user.networkGroups.add(oParam);
						})
						.css('width', '75px')

						$('.ns1blankspaceRowRemove').button(
						{
							text: false,
						 	icons: {primary: "ui-icon-close"}
						})
						.click(function() {
							nsFreshcare.admin.user.networkGroups.remove(this.id)
						})
						.css('width', '15px')
						.css('height', '20px')
					}
				}
			}
		},

		add:		function (oParam, oResponse)
		{
				
			if ($(ns1blankspace.xhtml.container).attr('data-initiator') == 'ns1blankspaceUserNetworkGroupAdd')
			{
				$(ns1blankspace.xhtml.container).slideUp(500);
				$(ns1blankspace.xhtml.container).attr('data-initiator', '');
			}
			else
			{
				if (oResponse == undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_NETWORK_GROUP_SEARCH';
					oSearch.addField('title,notes')

					oSearch.getResults(function(data)
					{
						nsFreshcare.admin.user.networkGroups.add(oParam, data)
					});
				}
				else
				{
					$(ns1blankspace.xhtml.container).attr('data-initiator', 'ns1blankspaceUserNetworkGroupAdd')
		
					var aHTML = [];
					
					if (oResponse.data.rows.length == 0)
					{
						aHTML.push('<table><tr><td class="ns1blankspaceNothing">' +
										'No network groups.</td></tr></table>');

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
					}
					else
					{
						aHTML.push('<table id="ns1blankspaceUserNetworkGroups" class="ns1blankspaceSearchMedium" style="font-size:0.875em;">');
						
						$.each(oResponse.data.rows, function()
						{	
							aHTML.push('<tr class="ns1blankspaceRow">');
							
							aHTML.push('<td id="ns1blankspaceUserNetworkGroups-title-' + this.id + '" class="ns1blankspaceRowSelect">' +
													this.title + '</td>');
							
							aHTML.push('</tr>');
						});
						
						aHTML.push('</table>');;

						$(ns1blankspace.xhtml.container).html(aHTML.join(''));
						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						
						$('#ns1blankspaceUserNetworkGroups td.ns1blankspaceRowSelect').click(function(event)
						{
							oParam.xhtmlElementID = event.target.id;
							nsFreshcare.admin.user.networkGroups.select(oParam);
						});
					}
				}
			}	
		},
							
		select:		function (oParam)
		{
			var sXHTMLElementID;
			var iUser = ns1blankspace.objectContext;

			if (oParam != undefined)
			{
				if (oParam.xhtmlElementID != undefined) {sXHTMLElementID = oParam.xhtmlElementID}
				if (oParam.user != undefined) {iUser = oParam.user}
				if (oParam.onComplete === undefined) {oParam.onComplete = nsFreshcare.admin.user.networkGroups.show}
			}		

			if (sXHTMLElementID)
			{
				var aSearch = sXHTMLElementID.split('-');
				var iNetworkGroup = aSearch[2];
				
				$('#' + sXHTMLElementID).fadeOut(500);
				
				var sData = 'user=' + iUser +
							'&networkgroup=' + iNetworkGroup;
							
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('SETUP_USER_NETWORK_GROUP_MANAGE'),
					data: sData,
					dataType: 'json',
					success: function(data)
					{
						if (oParam.onComplete) 
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
				});
			}	
		},

		remove:		function (sXHTMLElementID)
		{
			var aSearch = sXHTMLElementID.split('-');
			var sElementId = aSearch[0];
			var sSearchContext = aSearch[1];
			
			var sData = 'remove=1&id=' + sSearchContext;
						
			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('SETUP_USER_NETWORK_GROUP_MANAGE'),
				data: sData,
				dataType: 'json',
				success: function(data){$('#' + sXHTMLElementID).parent().parent().fadeOut(500)}
			});	
		},

		members: 
		{
			add: function(oParam)
			{
				var aHTML = [];
				
				aHTML.push('<table class="ns1blankspaceMain">');
				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'User' +
								'</td></tr>' +
								'<tr class="ns1blankspaceSelect">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceSetupUserName" class="ns1blankspaceText">' +
								'</td></tr>');

				aHTML.push('<tr><td style="padding-bottom:10px;" class="ns1blankspaceNothing">You need to search by the surname<br />and enter at least 3 characters.</td></tr>');

				aHTML.push('</table>');					
					
				$('#ns1blankspaceUsersColumn1').html(aHTML.join(''));
					
				$('#ns1blankspaceSetupUserName').keyup(function()
				{
					if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
			        ns1blankspace.timer.delayCurrent = setTimeout("nsFreshcare.admin.user.networkGroups.members.search('ns1blankspaceSetupUserName')", ns1blankspace.option.typingWait);
				});	
						
				var aHTML = [];

				aHTML.push('<table class="ns1blankspaceColumn2">');
						
				aHTML.push('<tr><td><span style="width:70px;" class="ns1blankspaceAction" id="ns1blankspaceSetupUserSave">' +
									'Save</span></td></tr>');

				aHTML.push('<tr><td><span style="width:70px;" class="ns1blankspaceAction" id="ns1blankspaceSetupUserCancel">' +
									'Cancel</span></td></tr>');				
				
				aHTML.push('</table>');					
				
				$('#ns1blankspaceUsersColumn2').html(aHTML.join(''));

				$('#ns1blankspaceSetupUserSave').button(
				{
					text: "Save"
				})
				.click(function() 
				{
					ns1blankspace.status.working();

					var sData = 'networkgroup=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
					sData += '&user=' + ns1blankspace.util.fs($('#ns1blankspaceSetupUserName').attr("data-id"));
				
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('SETUP_USER_NETWORK_GROUP_MANAGE'),
						data: sData,
						dataType: 'json',
						success: function() {
							ns1blankspace.setup.networkGroup.users.show(oParam);
							ns1blankspace.status.message('User Added');
						}
					});
				})
				
				$('#ns1blankspaceSetupUserCancel').button(
				{
					text: "Cancel"
				})
				.click(function() 
				{
					ns1blankspace.setup.networkGroup.users.show(oParam);
				});
			},

			search: function(sXHTMLInputElementID, oResponse)
			{
				var aHTML = [];
				var sSearchText;
				var iXHTMLElementContextID;

				if (oResponse == undefined)
				{	
					sSearchText = $('#' + sXHTMLInputElementID).val();
					
					if (sSearchText.length > 2)
					{
						ns1blankspace.status.working();
						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_USER_SEARCH';
						oSearch.addField('username,user.contactperson.firstname,user.contactperson.surname,contactbusinesstext');
						oSearch.addFilter('user.contactperson.surname', 'TEXT_IS_LIKE', sSearchText);
						oSearch.rows = 20;
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								nsFreshcare.admin.user.networkGroups.members.search(sXHTMLInputElementID, oResponse);
							}
							else
							{
								ns1blankspace.status.error('Error finding users: ' + oResponse.error.errornotes);
							}
						});
					}
				}
				else
				{	
					if (oResponse.data.rows.length == 0)
					{
						ns1blankspace.status.message('No users found');
					}
					else	
					{
						ns1blankspace.status.message('');

						aHTML.push('<table class="ns1blankspaceSearchMedium" style="width: 350px;">');

						$(oResponse.data.rows).each(function()
						{
							aHTML.push('<tr>' +
									'<td id="ns1blankspaceNetworkUser-' + this.id + '" data-usertext="' + this.username + '" class="ns1blankspaceSearch ns1blankspaceNetworkUser">' +
									this['user.contactperson.firstname'] + ' ' + this['user.contactperson.surname'] + ' (' + this.contactbusinesstext + ')' +
									'</td></tr>');
						});			
										
						aHTML.push('</table>');
						
						$(ns1blankspace.xhtml.container).html(aHTML.join(''));

						$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
						$(ns1blankspace.xhtml.container).offset({ top: $('#' + sXHTMLInputElementID).offset().top + $('#' + sXHTMLInputElementID).height() + 8, left: $('#' + sXHTMLInputElementID).offset().left});

						$('.ns1blankspaceNetworkUser').click(function(event)
						{
							var aXHTMLElementID = (event.target.id).split('-');
							iXHTMLElementContextID = aXHTMLElementID[1];

							$('#' + sXHTMLInputElementID).val($('#' + event.target.id).attr("data-usertext"))
							$('#' + sXHTMLInputElementID).attr("data-id", iXHTMLElementContextID)
							$(ns1blankspace.xhtml.container).hide();
						});
					}	
				}	
			}
		}
	},


	switchIn: 	function() 
	{

		ns1blankspace.status.working();
		// First, save current values
		nsFreshcare.data.switched.id = ns1blankspace.user.id;
		nsFreshcare.data.switched.unrestricted = ns1blankspace.user.unrestricted;
		nsFreshcare.data.switched.space = ns1blankspace.user.space;
		nsFreshcare.data.switched.spaceText = ns1blankspace.user.spaceText;
		nsFreshcare.data.switched.logonName = ns1blankspace.user.logonName;
		nsFreshcare.data.switched.contactPerson = ns1blankspace.user.contactPerson;
		nsFreshcare.data.switched.contactBusiness = ns1blankspace.user.contactBusiness;
		nsFreshcare.data.switched.contactBusinessText = ns1blankspace.user.contactBusinessText;
		nsFreshcare.data.switched.commonName = ns1blankspace.user.commonName;
		nsFreshcare.data.switched.email = ns1blankspace.user.email;
		nsFreshcare.data.switched.systemAdmin = ns1blankspace.user.systemAdmin;
		nsFreshcare.data.switched.roles = ns1blankspace.user.roles;
		nsFreshcare.data.switched.site = ns1blankspace.user.site;
		nsFreshcare.data.switched.documentEmailTemplate = nsFreshcare.data.documentEmailTemplate;

		// Now overwrite all the relevant information on the ns1blankspace.user namespace
		ns1blankspace.user.contactPerson = ns1blankspace.data.contactPerson;
		ns1blankspace.user.commonName = ns1blankspace.data.contactPersonText;
		ns1blankspace.user.contactBusiness = ns1blankspace.data.contactBusiness;
		ns1blankspace.user.contactBusinessText = ns1blankspace.data.contactBusinessText;
		ns1blankspace.user.logonName = ns1blankspace.objectContextData['username'];
		ns1blankspace.user.email = ns1blankspace.objectContextData["user.contactperson.email"];
		ns1blankspace.user.roles = ns1blankspace.data.roles;
		ns1blankspace.user.spaceText = ns1blankspace.user.contactBusinessText;
		nsFreshcare.data.auditor = {};		// 2.0.2 Need to clear these values when switching in and switching back
		delete(nsFreshcare.data.documentEmailTemplate);		// v2.0.3f Needs to be cleared when switch-in / back
		ns1blankspace.app.reset();		//v1.0.3 added

		// External logins set initial values for these - nullify so they are reset on init call
		nsFreshcare.data.growerMemberships = undefined;
		nsFreshcare.data.customerExSuppliers = undefined;
		nsFreshcare.data.trainerMemberships = undefined;
		nsFreshcare.data.groupGrower = [];

		// Update the UI
		$('#ns1blankspaceViewControlViewContainer').button({label: 'Select...'});
		$('#ns1blankspaceViewControlSearch').val('');
		
		$('#ns1blankspaceSpaceText').html(ns1blankspace.user.spaceText);
		
		$('#ns1blankspaceLogonName')
			.html(ns1blankspace.user.logonName)
			.css('color', '#EE8F00');
		//$('#ns1blankspaceLogonName').unbind('click');
		//$('#ns1blankspaceLogonName').click(nsFreshcare.admin.user.switchBackClick);

		// Call control.init to intialise the role's UI and variables
		nsFreshcare.control.init();
	},

	switchBackClick: function()
	{
		var oElement = this;
		if ($(ns1blankspace.xhtml.container).attr('data-initiator') == oElement.id)
		{
			$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
			$(ns1blankspace.xhtml.container).attr('data-initiator', '');
		}
		else
		{
			var aHTML = [];

			aHTML.push('<table style="width: 232px; font-size: 0.875em;" id="ns1blankspaceControlUser" class="ns1blankspaceViewControlContainer">');
				
			aHTML.push('<tr>' +
							'<td id="ns1blankspaceUserSwitchBack" class="ns1blankspaceViewControl">' +
							'Switch back</td></tr>');

			aHTML.push('</table>');
			
			$(ns1blankspace.xhtml.container).attr('data-initiator', oElement.id);
			$(ns1blankspace.xhtml.container).html("&nbsp;");
			$(ns1blankspace.xhtml.container).show(ns1blankspace.option.showSpeedOptions);
			$(ns1blankspace.xhtml.container).offset({ top: $(oElement).offset().top + $(oElement).height() - 3, left: $(oElement).offset().left + 220});
			$(ns1blankspace.xhtml.container).html(aHTML.join(''));
				
			$('#ns1blankspaceUserSwitchBack').click(function() {

				$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);
				$(ns1blankspace.xhtml.container).attr('data-initiator', '');
				nsFreshcare.admin.user.switchOut();
			});
		}	
	},

	switchOut: 	function() 
	{

		// Copy all the user values back
		ns1blankspace.user = nsFreshcare.data.switched;
		ns1blankspace.app.reset();			// 1.0.3 added

		// 3.1.0e SUP022237  Now resets report options
		ns1blankspace.report.reports = [];
		ns1blankspace.report.reportGroups = [];
		ns1blankspace.report.dictionary = [];
		ns1blankspace.report.selectAttributes = [];
		ns1blankspace.report.showExport = true;
		
		nsFreshcare.data.auditor = {};		// 1.0.2 Need to clear these values when switching in and switching back
		delete(nsFreshcare.data.documentEmailTemplate);		// v2.0.3f Needs to be cleared when switch-in / back
		nsFreshcare.data.switched = {};

		// Update the UI
		$('#ns1blankspaceSpaceText').html(ns1blankspace.user.spaceText);
		
		$('#ns1blankspaceViewControlViewContainer').button({label: 'Select...'});
		$('#ns1blankspaceViewControlSearch').val('');

		$('#ns1blankspaceLogonName')
			.html(ns1blankspace.user.logonName)
			.css('color', '')
			.unbind('click')
			/*.click(function(event) {
				ns1blankspace.control.user.show(this);
			})*/;

		// Call control.init to initialise the role's UI and variables
		nsFreshcare.control.init();
	},

	save: 		
	{
		validate: 	function(oParam, oResponse) 
		{

			if (oParam) {
				 if (oParam.validateStep === undefined) {oParam.validateStep = 1;}
			}
			else {oParam = {validateStep: 1}}

			if (oParam.validateStep === 1) {
				
				ns1blankspace.okToSave = true;
				if ($('#ns1blankspaceDetailsUserName').val() == '') 
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.error('Logon Name is mandatory.');
				}

				// Validate mandatory fields on new
				if (ns1blankspace.okToSave && ns1blankspace.objectContext == -1) 
				{

					// If user has typed something in top section, check that both fields are populated, and if so blank out bottom section
					if ($('#ns1blankspaceDetailsFirstName').val() != '' ||
						$('#ns1blankspaceDetailsLastName').val() != '') {

						if ($('#ns1blankspaceDetailsFirstName').val() === '') {
							ns1blankspace.okToSave = false;
							ns1blankspace.status.error('First Name is mandatory.');
							return;
						}

						if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsLastName').val() === '') {
							ns1blankspace.okToSave = false;
							ns1blankspace.status.error('Last Name is mandatory.');
							return;
						}

						if (ns1blankspace.okToSave) {
							$('#ns1blankspaceSetupUserBusiness').val('');
							$('#ns1blankspaceSetupUserBusiness').attr('data-id', undefined);
							$('#ns1blankspaceSetupUserPerson').val('');
							$('#ns1blankspaceSetupUserPerson').attr('data-id', undefined);
						}
					}
					else {

						if ($('#ns1blankspaceSetupUserBusiness').val() === '') {
							ns1blankspace.okToSave = false;
							ns1blankspace.status.error('Business is mandatory.');
							return;
						}

						if (ns1blankspace.okToSave && $('#ns1blankspaceSetupUserPerson').val() === '') {
							ns1blankspace.okToSave = false;
							ns1blankspace.status.error('Contact is mandatory.');
							return;
						}

					}

					if (ns1blankspace.okToSave && $('#ns1blankspaceSetupUserPerson').attr('data-id') != undefined) {

						var oSearch = new AdvancedSearch();
						oSearch.method = 'SETUP_USER_SEARCH';
						oSearch.addField('username');
						oSearch.addFilter('contactperson', 'EQUAL_TO', $('#ns1blankspaceSetupUserPerson').attr('data-id'));
						oSearch.getResults(function(oResponse) {
								oParam.validateStep = 2;
								nsFreshcare.admin.user.save.validate(oParam, oResponse);
						});
					}
					else 
					{
						oParam.validateStep = 3;
						nsFreshcare.admin.user.save.validate(oParam, oResponse);
					}
				}
				else if (ns1blankspace.okToSave && ns1blankspace.objectContext != -1)
				{
					if ($('#ns1blankspaceDetailsPasswordExpiry').val() == '') 
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.error('You must enter a password expiry date.');
					}
					else
					{
						oParam.validateStep = 3;
						nsFreshcare.admin.user.save.validate(oParam, oResponse);
					}
				}
			}
			
			else if (oParam.validateStep === 2) {

				if (oResponse && oResponse.status === 'OK') {
					if (oResponse.data.rows.length > 0) {
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message('This user already has a logon: ' + oResponse.data.rows[0].username);
					}
				}
				else {
					ns1blankspace.okToSave = false
				}
				oParam.validateStep = 3;
				nsFreshcare.admin.user.save.validate(oParam);
			}

			else if (oParam.validateStep === 3) {
				oParam.step = 2;
				ns1blankspace.util.onComplete(oParam);
			}
		}, 

		send: 		function (oParam, oResponse)
		{
			if (oParam) {
				 if (oParam.step === undefined) {oParam.step = 1;}
			}
			else {oParam = {step: 1}}

			if (oParam.step === 1) 
			{		
				// Validate
				ns1blankspace.status.working();

				oParam.onComplete = nsFreshcare.admin.user.save.send;
				nsFreshcare.admin.user.save.validate(oParam);
			}
			else if (oParam.step === 2) 
			{	
				// Save
				if (ns1blankspace.okToSave) 
				{
					if (ns1blankspace.objectContext != -1)
					{
						nsFreshcare.admin.user.save.process();
					}
					else
					{
						// Get the contactBusiness / contactPerson we're adding the user for
						oParam.contactBusiness = ns1blankspace.user.contactBusiness;

						if ($('#ns1blankspaceSetupUserBusiness').attr('data-id') != ''
								&& $('#ns1blankspaceSetupUserBusiness').attr('data-id') != undefined)
						{
							oParam.contactBusiness = $('#ns1blankspaceSetupUserBusiness').attr('data-id');
							oParam.contactPerson = $('#ns1blankspaceSetupUserPerson').attr('data-id');
						}

						if (oParam.contactPerson === undefined) {
							
							var oSearch = new AdvancedSearch();
							oSearch.method = 'CONTACT_PERSON_SEARCH';
							oSearch.addField('firstname');
							oSearch.addFilter('contactbusiness', 'EQUAL_TO', oParam.contactBusiness);
							oSearch.addFilter('firstname', 'EQUAL_TO', $('#ns1blankspaceDetailsFirstName').val());
							oSearch.addFilter('surname', 'EQUAL_TO', $('#ns1blankspaceDetailsLastName').val());
							oSearch.getResults(function(oResponse) {
									oParam.step = 3;
									nsFreshcare.admin.user.save.send(oParam, oResponse)});
						}
						else {

							nsFreshcare.admin.user.save.process(
							{
								contactPerson: oParam.contactPerson,
								contactBusiness: oParam.contactBusiness
							});		
						}
					}
				}
			}
			
			else if (oParam.step === 3)	
			{
				if (oResponse && oResponse.status === 'OK') 
				{
					// Check if the person already exist, if not, then create them
					if (oResponse.data.rows.length > 0)
					{
						nsFreshcare.admin.user.save.process(
						{
							contactPerson: oResponse.data.rows[0].id,
							contactBusiness: oParam.contactBusiness
						});		
					}
					else
					{
						var sData = 'contactbusiness=' + oParam.contactBusiness;
						sData += '&firstname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsFirstName').val());
						sData += '&surname=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsLastName').val());

						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('CONTACT_PERSON_MANAGE'),
							data: sData,
							dataType: 'json',
							success: function(data)
								{
									if (data.status == 'OK')
									{
										nsFreshcare.admin.user.save.process(
										{
											contactPerson: data.id,
											contactBusiness: ns1blankspace.user.contactBusiness
										});	
									}
									else
									{
										ns1blankspace.status.error('Could not add user.')
									}
								}
						});
					}	
				}
			}
		},

		process:	function (oParam, oResponse)
		{
			var sData = '_=1';
			var iContactBusiness = ns1blankspace.user.contactBusiness;
			var iContactPerson;

			if (oParam != undefined)
			{
				if (oParam.processUserStep === undefined) {oParam.processUserStep = 1}
				if (oParam.contactBusiness != undefined) {iContactBusiness = oParam.contactBusiness}
				if (oParam.contactPerson != undefined) {iContactPerson = oParam.contactPerson}
			}
			else {oParam = {processUserStep: 1}}

			if (oParam.processUserStep === 1)
			{
				// Save user
				if (ns1blankspace.objectContext != -1)
				{
					sData += '&id=' + ns1blankspace.objectContext +
							'&newsalerts=N';	
				}
				else
				{
					sData += '&contactbusiness=' + iContactBusiness;
					sData += '&contactperson=' + iContactPerson;
					sData += '&unrestrictedaccess=Y';			// ToDo: Change this when correct access setup via roles
				}
				
				if ($('#ns1blankspaceMainDetails').html() != '')
				{	// v3.1.0 Added authentication defaults
					// v3.1.206 SUP023058
					sData += '&username=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsUserName').val());
					sData += '&disabled=' + $('input[name="radioDisabled"]:checked').val();
					sData += '&disabledreason=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsDisabledReason').val());
					sData += (ns1blankspace.objectContext != -1) ? '&passwordexpiry=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsPasswordExpiry').val()) : '';
					sData += (ns1blankspace.objectContext != -1) ? '&sessiontimeout=' + ns1blankspace.util.fs($('#ns1blankspaceDetailsSessionTimeout').val()) : '';
					sData += '&authenticationlevel=1';
					sData += '&authenticationdelivery=1';

					if ($('#ns1blankspaceSetupUserPerson').is('*') && ns1blankspace.objectContext != -1)
					{
						sData += '&contactperson=' + $('#ns1blankspaceSetupUserPerson').attr('data-id');
					}
				};

				if (1 == 0 && $('#ns1blankspaceMainAccess').html() != '')
				{
					sData += '&unrestrictedaccess=' + $('input[name="radioAccessUnrestricted"]:checked').val();
					ns1blankspace.objectContextData.unrestrictedaccess = $('input[name="radioAccessUnrestricted"]:checked').val();
					// ?? interfaceSetupUserAccessRoles();
				};

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
					data: sData,
					dataType: 'json',
					success: function(data)
					{
						// v3.1.0.e SUP022229 Was not showing errors
						if (data.status == 'OK')
						{
							ns1blankspace.status.message('Saved.');
							if (ns1blankspace.objectContext == -1) {var bNew = true}
							ns1blankspace.objectContext = data.id;	
							if (bNew)
							{
								ns1blankspace.status.message('Initial password is ' + data.password, {timeout: false});
								oParam.canConverse = (ns1blankspace.data.userRole == nsFreshcare.data.roles.admin);
								oParam['new'] = true;
								$.ajax(
								{
									type: 'POST',
									url: ns1blankspace.util.endpointURI('SETUP_USER_MANAGE'),
									data: 'id=' + ns1blankspace.objectContext + '&se' + nsFreshcare.data.userPasswordId + '=' + data.password,
									success: function(oResponse)
									{
										if (oResponse.status === 'OK')
										{
											if (ns1blankspace.data.userRoleText) 
											{
												// Add Role and Network Group
												oParam.processUserStep = 2;
												nsFreshcare.admin.user.save.process(oParam);
											}
											else 
											{
												oParam.processUserStep = 4
												nsFreshcare.admin.user.save.process(oParam);
											}
										}
										else
										{
											ns1blankspace.status.error('Error updating password on user record: ' + oResponse.error.errornotes);
										}
									}
								});
							}
							else
							{
								oParam.processUserStep = 4;
								nsFreshcare.admin.user.save.process(oParam);
							}
						}
						else
						{
							ns1blankspace.status.error('Error saving user: ' + data.error.errornotes);
						}
					}	
				});
			}

			else if(oParam.processUserStep === 2)
			{
				// Add corresponding Role
				if (oResponse === undefined)
				{

					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_ROLE_SEARCH';
					oSearch.addField('title');
					oSearch.getResults(function(oResponse) {nsFreshcare.admin.user.save.process(oParam, oResponse)});

				}
				else
				{
					if (oResponse.status === "OK")
					{
						var iRole = $.map(
										$.grep(oResponse.data.rows, function(a) {return a.title.toLowerCase() === ns1blankspace.data.userRoleText.toLowerCase()}),
										function(b) {return b.id}).shift();

						if (iRole)
						{
							sData += '&user=' + ns1blankspace.objectContext +
									 '&role=' + iRole;

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_USER_ROLE_MANAGE'),
								data: sData,
								dataType: 'json',
								success: function(data)
								{
									oParam.processUserStep = 3;
									nsFreshcare.admin.user.save.process(oParam);
								}
							});
						}
						else
						{
							ns1blankspace.status.message('Role not added.');
						}
					}
				}
			}
			else if(oParam.processUserStep === 3)
			{
				// Add corresponding Network Group
				if (oResponse === undefined)
				{
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'SETUP_NETWORK_GROUP_SEARCH';
					oSearch.addField('title');
					oSearch.getResults(function(oResponse) {nsFreshcare.admin.user.save.process(oParam, oResponse)});

				}
				else
				{
					oParam.processUserStep = 4;
					if (oResponse.status === "OK")
					{
						var iNetworkGroup = $.map(
										$.grep(oResponse.data.rows, function(a) {return a.title.toLowerCase().indexOf(ns1blankspace.data.userRoleText.toLowerCase() + ' news') > -1}),
										function(b) {return b.id})[0];

						if (iNetworkGroup)
						{
							sData += '&user=' + ns1blankspace.objectContext +
									 '&networkgroup=' + iNetworkGroup;

							$.ajax(
							{
								type: 'POST',
								url: ns1blankspace.util.endpointURI('SETUP_USER_NETWORK_GROUP_MANAGE'),
								data: sData,
								dataType: 'json',
								success: function(data)
								{
									if (data.status == 'OK')
									{
										nsFreshcare.admin.user.save.process(oParam);
									}
									else
									{
										ns1blankspace.status.error('Unable to add Network Group: ' + data.error.errornotes);
										nsFreshcare.admin.user.save.process(oParam);
									}
								}
							});
						}
						else
						{
							ns1blankspace.status.message('Network group not added.');
							nsFreshcare.admin.user.save.process(oParam);
						}
					}
					else
					{
						ns1blankspace.status.error('Unable to find Network group: ' + oResponse.error.errornotes);
						nsFreshcare.admin.user.save.process(oParam);
					}
				}
			}

			else if (oParam.processUserStep == 4)
			{
				oParam.processUserStep = 5;
				if ($('#ns1blankspaceMainNetwork').html() != '')
				{
					nsFreshcare.admin.user.save.saveCanSwitch();
					nsFreshcare.admin.user.save.saveConversations(oParam);
				}
				else
				{
					nsFreshcare.admin.user.save.process(oParam);
				}					
			}

			else if (oParam.processUserStep == 5)
			{
				ns1blankspace.inputDetected = false;
				if (oParam['new'] != true)
				{
					$('#ns1blankspaceMainAccess').is(":visible")
					{
						nsFreshcare.admin.user.access.show();
					}	
				}
				else
				{
					nsFreshcare.admin.user.search.send('-' + ns1blankspace.objectContext);
				}
			}
		},

		saveCanSwitch: function()
		{
			var sData = 'canswitch=' + ns1blankspace.util.fs($('input[name="radioSwitch"]:checked').val()) +
							'&contactperson=' + ns1blankspace.objectContextData.contactperson

			//ns1blankspace.util.endpointURI('NETWORK_USER_MANAGE'),

			$.ajax(
			{
				type: 'POST',
				url: '/ondemand/network/?method=NETWORK_USER_MANAGE',
				data: sData,
				dataType: 'json'
			});
		},

		saveConversations: function(oParam)
		{

			var iID = ns1blankspace.util.getParam(oParam, 'messagingID', {'default': $('#ns1blankspaceUserConversations').attr('data-id')}).value;
			var bCan = ns1blankspace.util.getParam(oParam, 'canConverse', {'default': ($('input[name="radioConversations"]:checked').val() == 'Y')}).value;
			var oData;

			// Get messaging account id if Network tab not visible and an existing record
			if (iID == undefined && oParam['new'] == undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_MESSAGING_ACCOUNT_SEARCH';
				oSearch.addField('user');
				oSearch.addFilter('type', 'EQUAL_TO', 4);
				oSearch.addFilter('user', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.rows = 1;
				oSearch.getResults(function (data) 
				{
					if (data.status == 'OK')
					{
						oParam.messagingID = (data.data.rows.length > 0) ? data.data.rows[0].id : '';
						nsFreshcare.admin.user.save.saveConversations(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to add Conversation account: ' + data.error.errornotes);
					}
				});
			}
			else
			{
				if (bCan && (iID != '' && iID != undefined)) 
				{
					nsFreshcare.admin.user.save.process(oParam);
				}
				else
				{
					if (bCan && (iID == undefined || iID == ''))
					{
						var oData =
						{
							user: ns1blankspace.objectContext,
							type: 4,
							accountname: ns1blankspace.setup.user.util.getUsername({username: ns1blankspace.objectContextData.username}),
							title: ns1blankspace.setup.user.util.getUsername({username: ns1blankspace.objectContextData.username})
						}
					}
					else if (!bCan && (iID != '' && iID != undefined))
					{
						var oData =
						{
							id: iID,
							remove: 1
						}
					}

					if (oData !== undefined)
					{
						$.ajax(
						{
							type: 'POST',
							url: ns1blankspace.util.endpointURI('SETUP_MESSAGING_ACCOUNT_MANAGE'),
							data: oData,
							dataType: 'json',
							success: function(oResponse)
							{
								if (oResponse.status != 'OK')
								{
									ns1blankspace.status.error('Unable to add user to Conversation: ' + oResponse.error.errornotes);
								}
								nsFreshcare.admin.user.save.process(oParam);
							}
						});
					}	
					else
					{
						nsFreshcare.admin.user.save.process(oParam);
					}
				}
			}
		}
	},

	internal: 
	{
		add: function (oParam)
		{
			var aHTML = [];
			
			aHTML.push('<table class="ns1blankspaceMain">');
			
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'User' +
							'</td></tr>' +
							'<tr class="ns1blankspaceSelect">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceSetupUserName" class="ns1blankspaceText">' +
							'</td></tr>');

			aHTML.push('<tr><td style="padding-bottom:10px;" class="ns1blankspaceNothing">You need to search by the surname<br />and enter at least 3 characters.</td></tr>');

			aHTML.push('</table>');					
				
			$('#ns1blankspaceUsersColumn1').html(aHTML.join(''));
				
			$('#ns1blankspaceSetupUserName').keyup(function()
			{
				if (ns1blankspace.timer.delayCurrent != 0) {clearTimeout(ns1blankspace.timer.delayCurrent)};
		        ns1blankspace.timer.delayCurrent = setTimeout("ns1blankspace.setup.user.external.search('ns1blankspaceSetupUserName')", ns1blankspace.option.typingWait);
			});	
					
			var aHTML = [];

			aHTML.push('<table class="ns1blankspaceColumn2">');
					
			aHTML.push('<tr><td><span style="width:70px;" class="ns1blankspaceAction" id="ns1blankspaceSetupUserSave">' +
								'Save</span></td></tr>');

			aHTML.push('<tr><td><span style="width:70px;" class="ns1blankspaceAction" id="ns1blankspaceSetupUserCancel">' +
								'Cancel</span></td></tr>');				
			
			aHTML.push('</table>');					
			
			$('#ns1blankspaceUsersColumn2').html(aHTML.join(''));

			$('#ns1blankspaceSetupUserSave').button(
			{
				text: "Save"
			})
			.click(function() 
			{
				ns1blankspace.status.working();

				var sData = 'networkgroup=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
				sData += '&user=' + ns1blankspace.util.fs($('#ns1blankspaceSetupUserName').attr("data-id"));
			
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('SETUP_USER_NETWORK_GROUP_MANAGE'),
					data: sData,
					dataType: 'json',
					success: function() {
						ns1blankspace.setup.networkGroup.users.show(oParam);
						ns1blankspace.status.message('User Added');
					}
				});
			})
			
			$('#ns1blankspaceSetupUserCancel').button(
			{
				text: "Cancel"
			})
			.click(function() 
			{
				ns1blankspace.setup.networkGroup.users.show(oParam);
			});
		}
	}

}									
