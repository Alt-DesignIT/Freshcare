/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.home = 
{
	init: 	function (oParam) { nsFreshcare.admin.home.show(); },

	show: 	function (oParam) 
	{
		ns1blankspace.history.view(
		{
			newDestination: 'nsFreshcare.admin.home.show();',
			move: false
		});

		if (ns1blankspace.setupView)
		{	
			$('#ns1blankspaceViewControlSetup').attr('checked', false);
			$('#ns1blankspaceViewControlSetup').button('refresh');
			ns1blankspace.setup["switch"]({viewScript: 'nsFreshcare.admin.home.show()'});
		}	

		$('#ns1blankspaceViewControlAction').button({disabled: true});
		$('#ns1blankspaceViewControlNew').button({disabled: true});
		$('#ns1blankspaceViewControlActionOptions').button({disabled: true});


		var aHTML = [];
		
		aHTML.push('<table id="ns1blankspaceHomeControlContainer">');
		
		aHTML.push('<tr class="ns1blankspaceControl" style="height=100px;"><td>&nbsp;</td></tr>');

		/*aHTML.push('<tr class="ns1blankspaceControl">' +
						'<td id="ns1blankspaceControl???" class="ns1blankspaceControl ns1blankspaceControlHome">' +
							'....</td>' +
						'</tr>');
		
		aHTML.push('<tr><td>&nbsp;</td></tr>');*/
		//aHTML.push(nsFreshcare.external.home.resources.buildElement());	v2.0.4 SUP021426 removed

		aHTML.push('</table>');					
				
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		nsFreshcare.admin.home.bind();
		ns1blankspace.xhtml.defaultElementID = '';

		var aHTML = [];
		
		aHTML.push('<div id="ns1blankspaceHomeMain" class="ns1blankspaceControlMain">');
		aHTML.push('<table id="ns1blankspaceHomeContainer"><tr>');
		aHTML.push('<td id="ns1blankspaceHomeColumn1" class="ns1blankspaceColumn1Flexible">&nbsp;</td>');
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
		
		/*$('#ns1blankspaceControl???').click(function(event)
		{
			$('#ns1blankspaceHomeColumn1').html(ns1blankspace.xhtml.loading);
			$('#ns1blankspaceHomeColumn1').attr('data-loading', '1');
			ns1blankspace.xhtml.defaultElementID = this.id;
			
			nsFreshcare.admin.home.recentCARs({
				show: false,
				xhtmlElementID: 'ns1blankspaceHomeColumn1'
				});
		});*/

		//nsFreshcare.external.home.resources.bindElement();	v2.0.4 SUP021426 removed
		
	}
}