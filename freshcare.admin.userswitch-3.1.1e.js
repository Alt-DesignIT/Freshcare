/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.userswitch = 
{
	init: 		function (oParam)
	{
		ns1blankspace.app.reset();

		ns1blankspace.object = 22;
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectName = 'userswitch';
		ns1blankspace.viewName = 'User Switch-in';
		ns1blankspace.objectMethod = "SETUP_USER";
		
		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", "nsFreshcare");
		ns1blankspace.app.set(oParam);
	},

	home:		function (oParam, oResponse)
	{
		ns1blankspace.app.context({'new': true, action: true, actionOptions: true, inContext: false});

		oParam.functionLayout = nsFreshcare.admin.userswitch.layout;

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
				aHTML.push('</table>');		
				
				$('#ns1blankspaceControl').html(aHTML.join(''));
				
				// v3.1.0 Now filters on logon groups otherwise return will have several rows for some users!
				var oSearch = new AdvancedSearch();
				oSearch.method = 'SETUP_USER_SEARCH';
				oSearch.addField('contactbusinesstext,contactpersontext,username,disabled,user.contactperson.persongroup,user.contactperson.persongrouptext');
				oSearch.addFilter('user.contactperson.persongroup', 'IN_LIST', nsFreshcare.data.allGroups.join(','))
				oSearch.rows = 40;
				oSearch.sort('lastlogon', 'desc');
				oSearch.sort('id', 'asc');
				oSearch.getResults(function (data) {nsFreshcare.admin.user.home(oParam, data)});
			}
		}
	},

	layout: 	function ()
	{
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		if (ns1blankspace.objectContext != -1)
		{
			aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
							'Summary</td></tr>');
						
		}	

		aHTML.push('</table>');					
					
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];
	
		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
				
		$('#ns1blankspaceMain').html(aHTML.join(''));
			
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: {'new': true, action: true, actionOptions: true, inContext: false}});
			nsFreshcare.admin.user.summary();
		});
	}
}									
