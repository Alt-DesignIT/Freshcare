/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
*/

// v3.2.015 SUP023421 Change 'Growers' to 'Members'

nsFreshcare.help = 
{
	init: 	function (oParam) {
				
				var sSessionId = '';
				var sURL = nsFreshcare.data.helpURL;
				
				if (true || nsFreshcare.sitesDev.indexOf(msOnDemandSiteId) > -1)	// dev or test
				{	
					sURL += "#" + nsFreshcare.user.roleLower.replace(/ /g, '');
				}
				else
				{
					var sParam = '/directory/ondemand/site.asp?rf=text&method=SITE_GET_SID&site=' + msOnDemandSiteId;
					$.ajax(
					{
						type: 'GET',
						url: sParam,
						dataType: 'text',
						async: false,
						success: function(sReturn)
						{
							if (sReturn.substr(0,2) == "OK")
							{
								var aReturn = sReturn.split('|');
								sSessionId = aReturn[1];
							}
							else
							{	alert(sReturn);	}
						}
					});		
					if (sSessionId != '')
					{	sURL += '?sid=' + sSessionId;	}
					else
					{	sURL = '';	}
				}
				
				return sURL;
			},

	show: 	function() {

				var sURL = '';

				sURL = nsFreshcare.help.init();
				if (sURL != '') {

					window.open(sURL);
				}
				else {

					$('#ns1blankspaceMain').html(nsFreshcare.help.layout());
				}
			},

	layout: function() {

				var aHTML = [];
				
				//OPTIONAL GET DOCUMENT
				
				aHTML.push('<table id="ns1blankspaceHomeContainer" class="ns1blankspace">');
					
				aHTML.push('<tr><td id="ns1blankspaceHelp" class="ns1blankspace">' +
									'Help Page' +
									'</td>' +
								'</tr>');
								
				aHTML.push('</table>');
				
				return aHTML.join('');

			}
}