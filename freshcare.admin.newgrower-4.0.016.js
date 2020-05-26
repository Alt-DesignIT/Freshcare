/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
// v3.1.210 replaced all dialog('close') with dialog('destroy')
// v3.2.015 SUP023421 Changed 'Growers' to 'Members'

nsFreshcare.admin.newgrower = 
{
	data:
	{
	},

	init: function (oParam) 
	{ 
		ns1blankspace.app.reset();
		ns1blankspace.object = 21;	
		ns1blankspace.objectName = 'newgrower';
		ns1blankspace.objectMethod = 'AGRI_TEMP_TRAINEE';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'New ' + nsFreshcare.data.growerText + 's';
		ns1blankspace.data.contactBusiness = undefined;
		ns1blankspace.data.contactBusinessText = undefined;
		ns1blankspace.data.contactPerson = undefined;
		ns1blankspace.data.contactPersonText = undefined;

		if (oParam != undefined)
		{
			if (oParam.contactBusiness != undefined) {ns1blankspace.data.contactBusiness = oParam.contactBusiness;}
			if (oParam.contactBusinessText != undefined) {ns1blankspace.data.contactBusinessText = oParam.contactBusinessText;}
		}	

		oParam = ns1blankspace.util.setParam(oParam, "rootNamespace", nsFreshcare);
		oParam = ns1blankspace.util.setParam(oParam, "rootNameSpaceText", 'nsFreshcare');
		ns1blankspace.app.set(oParam);
	},

	home: 		function (oParam, oResponse)
	{
		// v3.1.209 Search filters now namespace dependent

		var sSortColumn = ns1blankspace.util.getParam(oParam, 'sortColumn', {'default': 'createddate'}).value;
		var sSortDirection = ns1blankspace.util.getParam(oParam, 'sortDirection', {'default': 'desc'}).value;


		ns1blankspace.app.context({'new': true, action: true, actionOptions: true, inContext: false});

		if (oParam == undefined) {oParam = {sortColumn: sSortColumn, sortDirection: sSortDirection}}

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
			oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';		

			oSearch.addField('businessname,tradename,firstname,surname,suburb,state,createduser,createdusertext,createddate,abn,mailingaddress1,mailingsuburb' +
							',seregisternewbusiness,mailingstate,mailingpostcode,mailingcountry,jobtitle,title,firstname,surname,postcode,fax,email');		//,agritemptrainee.user.contactbusinesstext
			
			oSearch.addBracket('(');
			oSearch.addFilter('course', (ns1blankspace.objectName == 'newelearning' ? 'IS_NULL' : 'IS_NOT_NULL'));
			if (ns1blankspace.objectName == 'newelearning')
			{
				oSearch.addOperator('or');
				oSearch.addFilter('agritemptrainee.agritrainingcourse.trainercontactbusiness', 'EQUAL_TO', nsFreshcare.data.eLearningBusiness);
			}
			oSearch.addBracket(')');
			oSearch.addFilter('sestatus', 'EQUAL_TO', '1');		// V3.3.001 SUP023471 New records only

			oSearch.rows = 80;
			oSearch.sort(sSortColumn, sSortDirection);
			
			oSearch.getResults(function(oResponse) {nsFreshcare.admin.newgrower.home(oParam, oResponse)});	
			
		}
		else
		{
			var aHTML = [];
			
			if (oResponse.data.rows.length == 0)
			{
				aHTML.push('<table id="ns1blankspaceMostLikely">' +
								'<tr><td class="ns1blankspaceNothing">No new ' + nsFreshcare.data.growerText + 's found</td></tr>' +
								'</table>');
			}
			else
			{
				// v4.0.001 Bootstrap
				aHTML.push('<table id="ns1blankspaceMostLikely" class="table">');
				aHTML.push('<tr>' + 
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="businessname"' +
									' data-sortdirection="' + ((sSortColumn == "businessname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' + 
									'>Legal Name</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="tradename"' +
									' data-sortdirection="' + ((sSortColumn == "tradename") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Trade name / Site</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="surname"' +
									' data-sortdirection="' + ((sSortColumn == "surname") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Contact</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="suburb"' +
									' data-sortdirection="' + ((sSortColumn == "suburb") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Location</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="createddate"' +
									' data-sortdirection="' + ((sSortColumn == "createddate") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Added On</td>' +
								'<td class="ns1blankspaceCaption ns1blankspaceHeaderSort"' +
									' data-column="createdusertext"' +
									' data-sortdirection="' + ((sSortColumn == "createdusertext") ? ((sSortDirection === 'asc') ? "desc" : "asc") : 'asc') + '"' +
									'>Added By</td>' +
							'</tr>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceRow">');
					
					aHTML.push('<td id="ns1blankspaceMostLikely_legalname-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["businessname"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_tradename-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["tradename"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_contact-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["firstname"] + ' ' + this["surname"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_location-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["suburb"] + ' ' + this["state"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_createdon-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["createddate"] + '</td>' +
								'<td id="ns1blankspaceMostLikely_createdby-' + this.id + '" class="ns1blankspaceMostLikely">' +
											this["createdusertext"] + '</td>' +
								'</tr>');
				});
				
				aHTML.push('</table>');
			}
			
			$('#ns1blankspaceMostLikely').html(aHTML.join(''));
		
			$('td.ns1blankspaceMostLikely').click(function()
			{
				nsFreshcare.admin.newgrower.search.send(this.id, {source: 1});
			});

			$('.ns1blankspaceHeaderSort')
				.css('cursor', 'pointer')
				.click(function()
				{
					oParam.sortColumn = $(this).attr('data-column');
					oParam.sortDirection = $(this).attr('data-sortdirection');

					nsFreshcare.admin.newgrower.home(oParam);
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
				if(ns1blankspace.objectName == 'newelearning')
				{
					nsFreshcare.admin.newelearning.data.matchingData = undefined;
				}
				$('#ns1blankspaceControl').html(ns1blankspace.xhtml.loading);
				
				ns1blankspace.objectContext = sSearchContext;
				// v3.4.002 SUP023880 Added setrainingpackage fields
				var oSearch = new AdvancedSearch();		
				oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';
				oSearch.addField('abn,address1,address2,businessname,auditcontactbusiness,auditcontactbusinesstext,sesubsequentcourse' +
							',category,categorytext,codeofpractice,codeofpracticetext,country,course,coursetext,crop,email,fax,firstname,gender,gendertext' +
							',harvestmonth,jobtitle,joindate,mailingaddress1,mailingaddress2,mailingcountry,mailingpostcode,mailingstate,mailingsuburb' +
							',membership,membershiptext,mobile,notes,phone,postcode,sendprintedcertificates,state,suburb,surname,title,titletext,tradename' +
							',createddate,createduser,createdusertext,modifieddate,modifieduser,modifiedusertext,sestatus' +
							',seindustryrole,seprevioustraining,seexistingbusiness,secertificatenumber,seregisternewbusiness' +
							',sepaymentreference,sepersonid,sebusinessid,agritemptrainee.sebusinessid.tradename,agritemptrainee.sebusinessid.businessgroup.group' +
							',agritemptrainee.sepersonid.firstname,agritemptrainee.sepersonid.surname,sesubscriptionid' +
							',setrainingpackage,agritemptrainee.setrainingpackage.title,agritemptrainee.setrainingpackage.codeofpractice' +
							',agritemptrainee.setrainingpackage.codeofpracticetext,agritemptrainee.setrainingpackage.membership,agritemptrainee.setrainingpackage.membershiptext');
				
				oSearch.addFilter('id', 'EQUAL_TO', sSearchContext);
				oSearch.getResults(function(data) {nsFreshcare.admin.newgrower.show(oParam, data)});
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
					oSearch.method = 'AGRI_TEMP_TRAINEE_SEARCH';
					oSearch.addField('businessname,tradename,firstname,surname');
					
					oSearch.addBracket("(");
					oSearch.addFilter('firstname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('surname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('tradename', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addOperator("or");
					oSearch.addFilter('businessname', 'TEXT_IS_LIKE', sSearchText);
					oSearch.addBracket(')');
					oSearch.addFilter('course', (ns1blankspace.objectName == 'newelearning' ? 'IS_NULL' : 'IS_NOT_NULL'));
					oSearch.addFilter('sestatus', 'EQUAL_TO', '1');		// V3.3.001 SUP023471 New records only

					oSearch.sort('businessname', 'asc');
					oSearch.getResults(function(data) {nsFreshcare.admin.newgrower.search.process(oParam, data)});
				}
			}	
		},

		process: 	function (oParam, oResponse)
		{
			var aHTML = [];
				
			ns1blankspace.search.stop();
			if (oResponse.data.rows.length == 0)
			{
				$(ns1blankspace.xhtml.searchContainer).html('<table class="ns1blankspaceSearchMedium"><tr><td class="ns1blankspaceSubNote">Nothing to show</td></tr></table>');
				//$(ns1blankspace.xhtml.container).hide();
			}
			else
			{	
				aHTML.push('<table class="ns1blankspaceSearchMedium">');
					
				$.each(oResponse.data.rows, function()
				{
					aHTML.push('<tr class="ns1blankspaceSearch">');
				
					aHTML.push('<td class="ns1blankspaceSearch" id="businessname-' + this.id + '">' +
									this["businessname"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="tradename-' + this.id + '">' +
									this["tradename"] + '</td>' +
								'<td class="ns1blankspaceSearch" id="contact-' + this.id + '">' +
									this["firstname"] + ' ' + this.surname + '</td>'); 
					
					aHTML.push('</tr>');
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
					nsFreshcare.admin.newgrower.search.send(event.target.id, {source: 1});
				});
				
				ns1blankspace.render.bind(
				{
					columns: 'businessname-column-tradename-column-firstname-space-surname',
					more: oResponse.moreid,
					rows: 20,
					startRow: parseInt(oResponse.startrow) + parseInt(oResponse.rows),
					functionSearch: nsFreshcare.admin.newgrower.search.send
				});   
				
			}	
		}
	},						

	layout: function ()
	{
		var aHTML = [];
		var oContext = {};		
		var oRoot = ns1blankspace.rootnamespace;
		var oNewGrowerRoot = (oRoot.admin && oRoot.admin.newgrower) ? oRoot.admin.newgrower : nsFreshcare.admin.newgrower;

		// v3.4.002 If revert business and personid back to normal, then SE values are now 0
		// v4.0.001 Allow user to save/update data if sesubsequentcourse is not = Y
		if (ns1blankspace.objectContextData 
			&& (((ns1blankspace.objectContextData.sepersonid == '' || ns1blankspace.objectContextData.sepersonid == '0')
				&& (ns1blankspace.objectContextData.sebusinessid == '' || ns1blankspace.objectContextData.sebusinessid == '0'))
				|| (ns1blankspace.objectContextData.sesubsequentcourse == 'Y' && ns1blankspace.objectContextData.sestatus == '1')))
		{
			oContext = {inContext: false, 'new': true, action: false, actionOptions: false};
		}
		else
		{
			oContext = {inContext: false, 'new': true, action: true, actionOptions: false};
		}

		aHTML.push('<div id="ns1blankspaceControlContext" class="ns1blankspaceControlContext"></div>');
		
		aHTML.push('<table class="ns1blankspaceControl">');
		
		aHTML.push('<tr><td id="ns1blankspaceControlSummary" class="ns1blankspaceControl ns1blankspaceHighlight">' +
						'Summary</td></tr>');
						
		aHTML.push('<tr><td id="ns1blankspaceControlDetails" class="ns1blankspaceControl">' +
						'Details</td></tr>');
						
		aHTML.push('<tr><td id="ns1blankspaceControlAddress" class="ns1blankspaceControl">' +
						'Address / Site</td></tr>');
	
		aHTML.push('</table>');					
			
		$('#ns1blankspaceControl').html(aHTML.join(''));
		
		var aHTML = [];

		aHTML.push('<div id="ns1blankspaceMainSummary" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainDetails" class="ns1blankspaceControlMain"></div>');
		aHTML.push('<div id="ns1blankspaceMainAddress" class="ns1blankspaceControlMain"></div>');
		
		$('#ns1blankspaceMain').html(aHTML.join(''));
		
		$('#ns1blankspaceControlSummary').click(function(event)
		{
			var fFunction = (oNewGrowerRoot.summary) ? oNewGrowerRoot.summary : nsFreshcare.admin.newgrower.summary;
			ns1blankspace.show({selector: '#ns1blankspaceMainSummary', context: oContext});
			fFunction();
		});
		
		$('#ns1blankspaceControlDetails').click(function(event)
		{
			var fFunction = (oNewGrowerRoot.details) ? oNewGrowerRoot.details : nsFreshcare.admin.newgrower.details;
			ns1blankspace.show({selector: '#ns1blankspaceMainDetails', context: oContext});
			fFunction();
		});
		
		$('#ns1blankspaceControlAddress').click(function(event)
		{
			var fFunction = (oNewGrowerRoot.address) ? oNewGrowerRoot.address : nsFreshcare.admin.newgrower.address;
			ns1blankspace.show({selector: '#ns1blankspaceMainAddress', context: oContext});
			fFunction();
		});
	},

	show: function (oParam, oResponse)
	{
		// v3.3.001 SUP022964 eLearning Trainees logged into Freshcare
		var aHTML = [];
		var iShowStep = 1;

		if (oParam) {if (oParam.showStep) {iShowStep = oParam.showStep;}}
		else { oParam = {showStep: 1}}
		
		$(ns1blankspace.xhtml.container).hide(ns1blankspace.option.hideSpeedOptions);

		if (iShowStep === 1) 
		{
			$('#ns1blankspaceControlContext').html(ns1blankspace.xhtml.loading);
		}
		
		if (iShowStep === 1 && oResponse && oResponse.data.rows.length == 0)
		{
			nsFreshcare.admin.newgrower.layout();
			ns1blankspace.objectContextData = undefined;
			aHTML.push('<table><tr><td class="ns1blankspaceNothing">Sorry can\'t find ' + nsFreshcare.data.growerText + '.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			// Set objectContextData & get Categories
			if (iShowStep === 1) 
			{
				ns1blankspace.objectContextData = oResponse.data.rows[0];
				nsFreshcare.admin.newgrower.layout();
				
				ns1blankspace.data.contactBusinessText = ns1blankspace.objectContextData['tradename'];
				ns1blankspace.data.contactPersonText = ns1blankspace.objectContextData['firstname'] + ' ' + ns1blankspace.objectContextData['surname'];

				$('#ns1blankspaceViewControlNew').button({disabled: true});
			
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_TRAINEE_PRODUCT_GROUP_SEARCH';
				oSearch.addField('trainee,traineetext,productcategory,productcategorytext')
				oSearch.addFilter('trainee', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === "OK")
					{	
						oParam.showStep = 2;		// v3.4.002 SUP023880 Now always to step 2
						ns1blankspace.objectContextData.productGroups = oResponse.data.rows;
						nsFreshcare.admin.newgrower.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding Categories:' + oResponse.error.errornotes);
					}
				});
			}

			// Get Membership, CodeOfPractice & trainer details for the training course if not populated as applicable
			else if (iShowStep == 2)
			{

				if (ns1blankspace.objectContextData.course != ''
					&& (ns1blankspace.objectContextData.codeofpractice === '' 
						|| ns1blankspace.objectContextData.trainercontactbusiness  == undefined 
						|| ns1blankspace.objectContextData.trainercontactperson === undefined))
				{
					// v3.1.208b SUP023149 Added coursedate
					var oSearch = new AdvancedSearch();
					oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
					oSearch.addField('trainercontactbusiness,trainercontactbusinesstext,trainercontactperson,trainercontactpersontext' +
									',agritrainingcourse.package.codeofpractice,agritrainingcourse.package.codeofpracticetext,coursedate');
					oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContextData.course);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.showStep = 3;
							if (oResponse.data.rows.length > 0)
							{
								ns1blankspace.objectContextData.coursedate = oResponse.data.rows[0]['coursedate'];
								ns1blankspace.objectContextData.codeofpractice = oResponse.data.rows[0]['agritrainingcourse.package.codeofpractice'];
								ns1blankspace.objectContextData.codeofpracticetext = oResponse.data.rows[0]['agritrainingcourse.package.codeofpracticetext'];
								ns1blankspace.objectContextData.trainercontactbusinesstext = oResponse.data.rows[0].trainercontactbusinesstext;
								ns1blankspace.objectContextData.trainercontactpersontext = oResponse.data.rows[0].trainercontactpersontext;
								ns1blankspace.objectContextData.trainercontactbusiness = oResponse.data.rows[0].trainercontactbusiness;
								ns1blankspace.objectContextData.trainercontactperson = oResponse.data.rows[0].trainercontactperson;
								nsFreshcare.admin.newgrower.show(oParam);
							}
							else
							{
								ns1blankspace.status.error('Training Course no longer exists');
							}
						}
						else
						{
							ns1blankspace.status.error('Unable to find Training Course: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					if (ns1blankspace.objectContextData.course == ''
						&& ns1blankspace.objectContextData.membership == ""
						&& ns1blankspace.objectContextData.setrainingpackage != "")
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';
						oSearch.addField('membership,membershiptext,codeofpractice,codeofpracticetext,title');
						oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContextData.setrainingpackage);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length > 0)
								{
									var oRow = oResponse.data.rows[0];
									ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.title'] = oRow.title;
									ns1blankspace.objectContextData.membership = oRow.membership;
									ns1blankspace.objectContextData.codeofpractice = oRow.codeofpractice;
									ns1blankspace.objectContextData.membershiptext = oRow.membershiptext;
									ns1blankspace.objectContextData.codeofpracticetext = oRow.codeofpracticetext;
									ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.membership'] = oRow.membership;
									ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.membershiptext'] = oRow.membershiptext;
									ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.codeofpractice'] = oRow.codeofpractice;
									ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.codeofpracticetext'] = oRow.codeofpracticetext;

									// Now back-update table
									$.ajax(
									{
										url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
										type: 'POST',
										data: {id: ns1blankspace.objectContext, membership: oRow.membership, codeofpractice: oRow.codeofpractice},
										success: function(oResponse)
										{
											if (oResponse.status != 'OK')
											{
												ns1blankspace.status.error('Error setting Memebrship & COP: ' + oResponse.error.errornotes);
											}
											oParam.showStep = 3;
											nsFreshcare.admin.newgrower.show(oParam);
										}
									});
								}
								else
								{
									ns1blankspace.status.error('Unable to find Training Package');
								}
							}
							else
							{
								ns1blankspace.status.error('Error finding Training Package: ' + oResponse.error.errornotes);
							}
						});
					}
					else
					{
						oParam.showStep = 3;
						nsFreshcare.admin.newgrower.show(oParam);
					}
				}
			}

			// Get Object Scope (replaces Person Groups)
			else if (iShowStep == 3)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('object,objectcontext,scope,scopetext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTmpTrainee);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', ns1blankspace.objectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						if(ns1blankspace.objectName == 'newelearning')
						{
							oParam.showStep = 4;
						}
						else
						{
							oParam.showStep = 10;
						}
						ns1blankspace.objectContextData.scopeValues = oResponse.data.rows; 
						// We need to map the scope values to person groups - DELETE ONCE ON SUBSCRIPTION
						// v3.1.204 SUP023020 Removed
						/*$.each(ns1blankspace.objectContextData.scopeValues, function()
						{
							var oThisScope = this;
							this.group = $.grep(nsFreshcare.data.businessGroupGrowerText, function(x) {return x.title === oThisScope.scopetext}).shift().id;
							this.grouptext = this.scopetext;
						});*/
						nsFreshcare.admin.newgrower.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find Scope values: ' + oResponse.error.errornotes);
					}
				});
			}


			else if (iShowStep == 4)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_CODE_OF_PRACTICE_SEARCH';
				oSearch.addField('membership,agricodeofpractice.membership.code,membershiptext');
				oSearch.addFilter('id', 'EQUAL_TO', ns1blankspace.objectContextData.codeofpractice);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.showStep = 5;

						if (oResponse.data.rows.length > 0)
						{
							ns1blankspace.objectContextData.membership = oResponse.data.rows[0].membership;	
							ns1blankspace.objectContextData.membershiptext = oResponse.data.rows[0].membershiptext
							ns1blankspace.objectContextData['agricodeofpractice.membership.code'] = oResponse.data.rows[0]['agricodeofpractice.membership.code'];
						}
						else
						{
							ns1blankspace.objectContextData.membership = '';
							ns1blankspace.objectContextData.membershiptext = '';
							ns1blankspace.objectContextData['agricodeofpractice.membership.code'] = '';
						}						
						nsFreshcare.admin.newgrower.show(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find Scope values: ' + oResponse.error.errornotes);
					}
				});
			}

			// Get Sites (if elearning)
			else if (iShowStep == 5)
			{
				if (ns1blankspace.objectName == 'newelearning')
				{
					if (ns1blankspace.objectContextData.sites == undefined)
					{
						oParam.object = nsFreshcare.objectTmpTrainee;
						oParam.onComplete = nsFreshcare.admin.newgrower.show;
						nsFreshcare.admin.grower.siteAddress.search(oParam);
					}
					else
					{
						// Temporarily - Primary site is stored on TmpTrainee but if user saves eLearnign record, site will be added
						// 				Check whether first site same as TmpTrainee and if not, add TnpTrainee address as primary site
						if (ns1blankspace.objectContextData.sites.length > 0)
						{
							var sTmpTrainee = ns1blankspace.objectContextData.address1.formatXHTML() + ' ' + 
											  ns1blankspace.objectContextData.address2.formatXHTML() + ' ' +
											  ns1blankspace.objectContextData.suburb.formatXHTML() + ' ' +
											  ns1blankspace.objectContextData.state.formatXHTML() + ' ' +
											  ns1blankspace.objectContextData.postcode.formatXHTML() + ' ' +
											  ns1blankspace.objectContextData.country.formatXHTML();
							var sSiteOne    = ns1blankspace.objectContextData.sites[0].address1.formatXHTML() +  ' ' + 
											  ns1blankspace.objectContextData.sites[0].address2.formatXHTML() + ' ' + 
											  ns1blankspace.objectContextData.sites[0].addresssuburb.formatXHTML() +  ' ' + 
											  ns1blankspace.objectContextData.sites[0].addressstate.formatXHTML() + ' ' + 
											  ns1blankspace.objectContextData.sites[0].addresspostcode.formatXHTML() + ' ' + 
											  ns1blankspace.objectContextData.sites[0].addresscountry.formatXHTML();
							if (sTmpTrainee != sSiteOne)
							{
								ns1blankspace.objectContextData.sites = 
									$.map(ns1blankspace.objectContextData.sites, function(x)
									{
										x.status = '2';
										return x;
									});
								// Now add Street Address as the primary address
								ns1blankspace.objectContextData.sites.unshift( 
								{
									address1: ns1blankspace.objectContextData.address1,
									address2: ns1blankspace.objectContextData.address2,
									addresspostcode: ns1blankspace.objectContextData.postcode,
									addressstate: ns1blankspace.objectContextData.state,
									addresssuburb: ns1blankspace.objectContextData.suburb,
									addresscountry: ns1blankspace.objectContextData.country,
									status: '1',
									type: '1',
									id: -1,
									"address.addresslink.id": -1,
									"address.addresslink.object": "210",
									"address.addresslink.objectcontext": ns1blankspace.objectContext
								});
							}
						}
						else
						{
							ns1blankspace.objectContextData.sites.push( 
							{
								address1: ns1blankspace.objectContextData.address1,
								address2: ns1blankspace.objectContextData.address2,
								addresspostcode: ns1blankspace.objectContextData.postcode,
								addressstate: ns1blankspace.objectContextData.state,
								addresssuburb: ns1blankspace.objectContextData.suburb,
								addresscountry: ns1blankspace.objectContextData.country,
								status: '1',
								type: '1',
								id: -1,
								"address.addresslink.id": -1,
								"address.addresslink.object": "210",
								"address.addresslink.objectcontext": ns1blankspace.objectContext
							});
						}

						oParam.showStep = 10;	
						nsFreshcare.admin.newgrower.show(oParam);
					}
				}
				else
				{
					nsFreshcare.admin.newgrower.show(oParam);
					oParam.showStep = 10;
				}
			}

			// Display
			else if (iShowStep === 10)
			{

				$('#ns1blankspaceControlContext').html(ns1blankspace.data.contactBusinessText.formatXHTML() + 
							'<br /><span style="color:#A0A0A0;font-size:0.825em;">' + ns1blankspace.data.contactPersonText.formatXHTML() + '</span>');
				ns1blankspace.history.view({
					newDestination: 'nsFreshcare.admin.' + ns1blankspace.objectName + '.init({id: ' + ns1blankspace.objectContext + '})',
					move: false
					});
				
				ns1blankspace.history.control({functionDefault: 'nsFreshcare.admin.newgrower.summary()'});
			}
		}	
	},	
		
	summary: 	function ()
	{
		var aHTML = [];
		
		if (ns1blankspace.objectContextData == undefined)
		{
			aHTML.push('<table><tr><td valign="top">Sorry can\'t find this ' + nsFreshcare.data.growerText + '.</td></tr></table>');
					
			$('#ns1blankspaceMain').html(aHTML.join(''));
		}
		else
		{
			aHTML.push('<table class="ns1blankspaceMain">' +
						'<tr class="ns1blankspaceRow">' +
						'<td id="ns1blankspaceSummaryColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
						'<td id="ns1blankspaceSummaryColumn2" class="ns1blankspaceColumn2" style="width:' + 
								(ns1blankspace.objectName == 'newelearning' ? '50%' : '170px') + ';"></td>' +
						'</tr>' +
						'</table>');				
			
			$('#ns1blankspaceMainSummary').html(aHTML.join(''));	
		
			var aHTML = [];
		
			aHTML.push('<table class="ns1blankspace" id="ns1blankspaceSummaryColumn1Table1">');
			

			if (ns1blankspace.objectContextData['businessname'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['businessname'] +
							'</td></tr>');
			}

			if (ns1blankspace.objectContextData['tradename'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trading and/or Site Name</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['tradename'] +
							'</td></tr>');
			}

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Primary Contact</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.data.contactPersonText +
						'</td></tr>');

			if (ns1blankspace.objectContextData['suburb'] != '')
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Location</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['suburb'] + ' ' + ns1blankspace.objectContextData['state'] +
							'</td></tr>');
			}				
			
			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Membership</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['membershiptext'] + ' '  + ns1blankspace.objectContextData['codeofpracticetext'] + 
						'</td></tr>');

			if (ns1blankspace.objectName == 'newelearning')
			{
				var sCreated = ns1blankspace.objectContextData['createddate'].substr(0, ns1blankspace.objectContextData['createddate'].length - 8);
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							sCreated +
							'</td></tr>');

				// v3.4.007 SUP022964 Alert user if trainee has more than one course in eLearning
				if (ns1blankspace.objectContextData.sesubsequentcourse == 'Y')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption"><span style="color:red;">PLEASE NOTE!</span>' +
									' Trainee has conducted more than one course via eLearning</td></tr>' +
									'<tr><td>&nbsp;</td></tr>');
				}

				if (ns1blankspace.objectContextData.sepaymentreference != '')
				{
					aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Payment Reference</td></tr>' +
								'<tr><td class="ns1blankspaceSummary">' +
								ns1blankspace.objectContextData.sepaymentreference +
								'</td></tr>');
				}
			}
			else
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trainer</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['trainercontactbusinesstext'] + ' (' + ns1blankspace.objectContextData['trainercontactpersontext'] + ')' +
						'</td></tr>');	
			}

			
			// v3.1.208b SUP023149 Now shows coursedate instead of join date
			if (ns1blankspace.objectContextData.coursedate)
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Course Date</td></tr>' +
							'<tr><td class="ns1blankspaceSummary">' +
							ns1blankspace.objectContextData['coursedate'] +
							'</td></tr>');
			}

			aHTML.push('</td></tr>');

			aHTML.push('</table>');					
			
			$('#ns1blankspaceSummaryColumn1').html(aHTML.join(''));	

			
			if (ns1blankspace.objectName == 'newelearning')
			{
				nsFreshcare.admin.newelearning.traineeImport.show();
			}
			else
			{
				aHTML = [];
				aHTML.push('<table class="ns1blankspaceColumn2">');

				aHTML.push('<tr><td><span id="ns1blankspaceSummaryFindDuplicates" class="ns1blankspaceAction" style="width:150px;">' +
							'Find Potential Duplicates</span></td></tr>');

				aHTML.push('<tr><td>&nbsp;</td></tr>');
				aHTML.push('<tr><td><span id="ns1blankspaceSummaryCreateGrower" class="ns1blankspaceAction" style="width:150px;">' +
							'Create ' + nsFreshcare.data.growerText + '</span></td></tr>');
				aHTML.push('</table>');					
		
				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	
			}

			nsFreshcare.admin.newgrower.summaryBind();
		}	
	},

	summaryBind: function()
	{
		$('#ns1blankspaceSummaryFindDuplicates')
			.button(
			{
				icons: {primary: 'ui-icon-search'}
			})
			.on("click", function()
			{
				if(ns1blankspace.objectName == 'newelearning')
				{
					// v3.4.007 SUP023931 Added check to ensure user chooses a Person Type if "other" is selected
					if ($('#radioTraineeType6').prop('checked') && $('#eLearningImportTraineeTypePerson_SelectRows tr').length == 0)
					{
						ns1blankspace.status.error('You must choose a Person Type');
					}
					else
					{
						// v3.4.010 SUP023971 Now passes params to findDuplicates if subsequent course
						var oFindParam = {xhtmlElementID: this.id};
						if ($('[name="radioImportAction"]').is('*'))
						{
							oFindParam.showSearch = $('[name="radioImportAction"]:checked').val() == '2' || $('[name="radioImportAction"]:checked').val() == '3';
							oFindParam.contactPerson = ns1blankspace.objectContextData.sepersonid;
							if ($('[name="radioImportAction"]:checked').val() == '1')
							{
								oFindParam.contactBusiness = ns1blankspace.objectContextData.sebusinessid;
							}
						}
						nsFreshcare.admin.newelearning.findDuplicates.show(oFindParam);
					}
				}
				else
				{
					nsFreshcare.admin.newgrower.findDuplicates.show({xhtmlElementID: this.id});		
				}

			});
			
		// v4.0.001 Bootstrap
		$('#ns1blankspaceSummaryCreateGrower')
			.button(
			{
				icons: {primary: 'ui-icon-plus'}
			})
			.on("click", function()
			{	

				if (nsFreshcare.admin.newelearning.data.matchingData == undefined && ns1blankspace.objectName == 'newelearning')
				{
					ns1blankspace.container.confirm(
					{
						title: 'Add ' + nsFreshcare.data.growerText + '?', 
						html: 'Please search for duplicates before creating the new ' + nsFreshcare.data.growerText,
						buttons: 
						[
							{
								text: "OK",
								icons: {primary: 'ui-icon-check'},
								name: 'btnOK',
								click: function() 
								{
									$('#ns1blankspaceBootstrapDialog').modal('hide');
								}
							}
						]
					});
				}
				else
				{
					ns1blankspace.container.confirm(
					{
						title: 'Add ' + nsFreshcare.data.growerText + '?', 
						html: 'Are you sure you want to create this trainee record?',
						buttons: 
						[
							{
								text: "Yes", 
								name: 'btnYes',
								click: function() 
								{
									$('#ns1blankspaceBootstrapDialog')
										.modal('hide')
										.html('')
										.on('hidden.bs.modal', function()
										{
											$('#ns1blankspaceBootstrapDialog')
												.data('modal', null)
												.off('hidden.bs.modal');
											if (ns1blankspace.objectName == 'newelearning')
											{
												// v4.0.002 configure opens another modal but this one wasn't closed stright away
												// v4.0.003 had setTimOut
												// v4.0.016 SUP024187 now using on hidden.bs.modal
												nsFreshcare.admin.newelearning.processTrainee.configure();
											}
											else
											{
												nsFreshcare.admin.newgrower.createNewGrower.checkForExactMatch({onComplete: nsFreshcare.admin.newgrower.createNewGrower.send});
											}
										});
								}
							},
							{
								text: "No",
								name: 'btnNo',
								click: function() 
								{
									$('#ns1blankspaceBootstrapDialog').modal('hide').html('');
								}
							}
						]
					});
				}
			});
	},

	details: 	function() 
	{
		var oRoot = ns1blankspace.rootnamespace;

		if (ns1blankspace.objectContextData['contactbusiness.reference'] === undefined)
		{
			ns1blankspace.objectContextData['contactbusiness.reference'] = '';
			ns1blankspace.objectContextData['contactbusiness.tradename'] = ns1blankspace.objectContextData.tradename;
			ns1blankspace.objectContextData['contactbusiness.legalname'] = ns1blankspace.objectContextData.businessname;
			ns1blankspace.objectContextData['contactbusiness.abn'] = ns1blankspace.objectContextData.abn;
			ns1blankspace.objectContextData['contactbusiness.notes'] = ns1blankspace.objectContextData.notes;
				
			ns1blankspace.objectContextData['contactbusiness.contactperson.position'] = ns1blankspace.objectContextData.jobtitle;
			ns1blankspace.objectContextData['contactbusiness.contactperson.title'] = ns1blankspace.objectContextData.title;
			ns1blankspace.objectContextData['contactbusiness.contactperson.titletext'] = ns1blankspace.objectContextData.titletext;
			ns1blankspace.objectContextData['contactbusiness.contactperson.gendertext'] = ns1blankspace.objectContextData.gendertext;
			ns1blankspace.objectContextData['contactbusiness.contactperson.gender'] = ns1blankspace.objectContextData.gender;
			ns1blankspace.objectContextData['contactbusiness.contactperson.firstname'] = ns1blankspace.objectContextData.firstname;
			ns1blankspace.objectContextData['contactbusiness.contactperson.surname'] = ns1blankspace.objectContextData.surname;
			ns1blankspace.objectContextData['contactbusiness.contactperson.email'] = ns1blankspace.objectContextData.email;
			ns1blankspace.objectContextData['contactbusiness.contactperson.notes'] = ns1blankspace.objectContextData.notes;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mobile'] = ns1blankspace.objectContextData.mobile;
			ns1blankspace.objectContextData['contactbusiness.contactperson.workphone'] = ns1blankspace.objectContextData.phone;
			ns1blankspace.objectContextData['contactbusiness.contactperson.fax'] = ns1blankspace.objectContextData.fax;
		}

		oRoot.external.grower.details();
	},

	address: function (oParam)
	{
		oParam = oParam || {};
		
		if (ns1blankspace.objectContextData['contactbusiness.streetaddress1'] === undefined)
		{
			ns1blankspace.objectContextData['contactbusiness.streetaddress1'] = ns1blankspace.objectContextData.address1;
			ns1blankspace.objectContextData['contactbusiness.streetaddress2'] = ns1blankspace.objectContextData.address2;
			ns1blankspace.objectContextData['contactbusiness.streetsuburb'] = ns1blankspace.objectContextData.suburb;
			ns1blankspace.objectContextData['contactbusiness.streetstate'] = ns1blankspace.objectContextData.state;
			ns1blankspace.objectContextData['contactbusiness.streetpostcode'] = ns1blankspace.objectContextData.postcode;
			ns1blankspace.objectContextData['contactbusiness.streetcountry'] = ns1blankspace.objectContextData.country;
			ns1blankspace.objectContextData['contactbusiness.mailingaddress1'] = ns1blankspace.objectContextData.mailingaddress1;
			ns1blankspace.objectContextData['contactbusiness.mailingaddress2'] = ns1blankspace.objectContextData.mailingaddress2;
			ns1blankspace.objectContextData['contactbusiness.mailingsuburb'] = ns1blankspace.objectContextData.mailingsuburb;
			ns1blankspace.objectContextData['contactbusiness.mailingstate'] = ns1blankspace.objectContextData.mailingstate;
			ns1blankspace.objectContextData['contactbusiness.mailingpostcode'] = ns1blankspace.objectContextData.mailingpostcode;
			ns1blankspace.objectContextData['contactbusiness.mailingcountry'] = ns1blankspace.objectContextData.mailingcountry;

			// v3.4.001 Added so that data is stored to person as well
			ns1blankspace.objectContextData['contactbusiness.contactperson.mailingaddress1'] = ns1blankspace.objectContextData.mailingaddress1;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mailingaddress2'] = ns1blankspace.objectContextData.mailingaddress2;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mailingsuburb'] = ns1blankspace.objectContextData.mailingsuburb;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mailingstate'] = ns1blankspace.objectContextData.mailingstate;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mailingpostcode'] = ns1blankspace.objectContextData.mailingpostcode;
			ns1blankspace.objectContextData['contactbusiness.contactperson.mailingcountry'] = ns1blankspace.objectContextData.mailingcountry;
		}

		if (ns1blankspace.objectName == 'newgrower')
		{
			nsFreshcare.admin.grower.address({twoLineAddress: true, suburbUpper: true});	
		}
		else
		{
			oParam.object = nsFreshcare.objectTmpTrainee;
			oParam.canChangeStatus = false;
			nsFreshcare.external.grower.address.show(oParam);
		}
	},

	findDuplicates: 
	{
		show: function(oParam)
		{
			// We need to try to find potential duplicates by looking for Growers with similar names in similar suburbs.
			var aHTML = [];
			var sXHTMLElementId = ns1blankspace.util.getParam(oParam, 'xhtmlElementID').value;

			if ($(ns1blankspace.xhtml.dropDownContainer).html() === '')
			{
				aHTML.push('<table id="ns1blankspaceSummaryDuplicateSearch" class="ns1blankspace"' +
								' style="padding:2px; border: solid 1px #D0D0D0; background-color: #DDEABB;">');

				aHTML.push('<tr><td class="ns1blankspaceCaption">Business Name</td></tr>' +
							'<tr><td class="ns1blankspace"><input id="ns1blankspaceDuplicateSearchBusinessName" class="ns1blankspaceText" style="width:140px;"/></td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceCaption">Contact Name</td></tr>' +
							'<tr><td class="ns1blankspace"><input id="ns1blankspaceDuplicateSearchContactName" class="ns1blankspaceText" style="width:140px;"/></td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceCaption">Suburb</td></tr>' +
							'<tr><td class="ns1blankspace"><input id="ns1blankspaceDuplicateSearchSuburb" class="ns1blankspaceText" style="width:140px;"/></td></tr>');

				aHTML.push('<tr><td class="ns1blankspace" style="text-align:center;"><span id="ns1blankspaceDuplicateSearch">Search</span></td></tr>');

				aHTML.push('</table>');

				$(ns1blankspace.xhtml.dropDownContainer).css('width', parseInt($('#' + sXHTMLElementId).width()) + 'px');
				$(ns1blankspace.xhtml.dropDownContainer).show();
				$(ns1blankspace.xhtml.dropDownContainer).offset(
				{ 
					top: $('#' + sXHTMLElementId).offset().top + $('#' + sXHTMLElementId).height() + 5,
					left: $('#' + sXHTMLElementId).offset().left
				});
				$(ns1blankspace.xhtml.dropDownContainer).html(aHTML.join(''));
				$('#ns1blankspaceSummaryDuplicateSearch .ns1blankspaceText').css('width', parseInt($('#' + sXHTMLElementId).width()) - 10 + 'px');

				$('#ns1blankspaceDuplicateSearch')
					.button(
					{
						label: 'Search'
					})
					.on('click', function()
					{
						nsFreshcare.admin.newgrower.findDuplicates.search(
						{
							businessName: $('#ns1blankspaceDuplicateSearchBusinessName').val(),
							contactName: $('#ns1blankspaceDuplicateSearchContactName').val(),
							suburb: $('#ns1blankspaceDuplicateSearchSuburb').val()
						});
					});
			}
			else
			{
				$(ns1blankspace.xhtml.dropDownContainer).html('');
				$(ns1blankspace.xhtml.dropDownContainer).hide();
			}
		},

		search: function(oParam)
		{
			var sBusinessName = ns1blankspace.util.getParam(oParam, 'businessName', {'default': ''}).value;
			var sContactName = ns1blankspace.util.getParam(oParam, 'contactName', {'default': ''}).value;
			var sSuburb = ns1blankspace.util.getParam(oParam, 'suburb', {'default': ''}).value;
			var oResponse = ns1blankspace.util.getParam(oParam, 'response').value;
			var aSearch = [];
			var aHTML = [];

			if (oResponse === undefined)
			{
				// v3.1.204 SUP023020 Was still looking at persongroup
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('tradename,legalname,mailingaddress1,mailingaddress2,mailingsuburb,mailingstate,mailingpostcode,primarycontactperson' + 
								',contactbusiness.contactperson.firstname,contactbusiness.contactperson.surname,contactbusiness.contactperson.id' +
								',contactbusiness.addresslink.address.address1,contactbusiness.addresslink.address.address2,contactbusiness.addresslink.address.addresssuburb' +
								',contactbusiness.addresslink.address.addressstate,contactbusiness.addresslink.address.addresspostcode');
				oSearch.addFilter('contactbusiness.businessgroup', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);
				oSearch.addFilter("contactbusiness.contactperson.id", 'EQUAL_TO', 'field:contactbusiness.primarycontactperson', '', '', 'Y');

				if (sBusinessName != "")
				{
					oSearch.addBracket('(');

					aSearch = sBusinessName.split(' ');
					$.each(aSearch, function(index, value)
					{
						oSearch.addFilter('tradename', 'STRING_IS_LIKE', value);
						oSearch.addOperator('or');
						oSearch.addFilter('legalname', 'STRING_IS_LIKE', value);
						if (index < aSearch.length - 1)
						{
							oSearch.addOperator('or');
						}
					});
					oSearch.addBracket(')');

					if (sContactName != "" || sSuburb != "")
					{
						oSearch.addOperator('and');
					}
				}

				if (sContactName != "")
				{
					oSearch.addBracket('(');

					aSearch = sContactName.split(' ');
					$.each(aSearch, function(index, value)
					{
						oSearch.addFilter('contactbusiness.contactperson.firstname', 'STRING_IS_LIKE', value);
						oSearch.addOperator('or');
						oSearch.addFilter('contactbusiness.contactperson.surname', 'STRING_IS_LIKE', value);
						if (index < aSearch.length - 1)
						{
							oSearch.addOperator('or');
						}
					});
					oSearch.addBracket(')');

					if (sSuburb != "")
					{
						oSearch.addOperator('and');
					}
				}

				if (sSuburb != "")
				{
					oSearch.addBracket('(');

					aSearch = sSuburb.split(' ');
					$.each(aSearch, function(index, value)
					{
						oSearch.addFilter('contactbusiness.mailingsuburb', 'STRING_IS_LIKE', value);
						oSearch.addOperator('or');
						oSearch.addFilter('contactbusiness.addresslink.address.addresssuburb', 'STRING_IS_LIKE', value);
						if (index < aSearch.length - 1)
						{
							oSearch.addOperator('or');
						}
					});
					oSearch.addBracket(')');
				}

				oSearch.rows = 50;
				oSearch.sort('legalname', 'asc');
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.response = oResponse;
						nsFreshcare.admin.newgrower.findDuplicates.search(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding duplicates: ' + oResponse.error.errornotes);
					}
				});
			}

			// We have a response. Display results on Summary tab and hide current SummaryColumn1 values
			else
			{
				if ($('#ns1blankspaceSummaryColumn1Table2').is('*'))
				{
					$('#ns1blankspaceSummaryColumn1Table2').remove();
				}

				aHTML.push('<table id="ns1blankspaceSummaryColumn1Table2" class="ns1blankspace"><tr>' +
								'<td id="ns1blankspaceSummaryDuplicateSearchResults"></td></tr></table>');

				$('#ns1blankspaceSummaryColumn1').html($('#ns1blankspaceSummaryColumn1').html() + aHTML.join(''));
				$('#ns1blankspaceSummaryColumn1Table1').hide();

				aHTML = [];

				aHTML.push('<table class="ns1blankspace"><tr>');

				aHTML.push('<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="legalname" data-sortDirection="asc">Legal Name</td>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="tradename" data-sortDirection="asc">Trade / Site Name</td>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="contactbusiness.contactperson.firstname" data-sortDirection="asc">Contact</td>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceHeaderSort"' +
								' data-sortColumn="contactbusiness.addresslink.address.addresssuburb" data-sortDirection="asc">Location</td>');

				$.each(oResponse.data.rows, function()
				{
					aHTML.push(nsFreshcare.admin.newgrower.findDuplicates.row(this, oParam));
				});

				aHTML.push('</table>');

				$.extend(true, oParam,
				{
					xhtmlElementID: 'ns1blankspaceSummaryDuplicateSearchResults',
					xhtmlContext: 'Duplicates',
					xhtml: aHTML.join(''),
					showMore: (oResponse.morerows === 'true'),
					more: oResponse.moreid,
					rows: 50,
					functionShowRow: nsFreshcare.admin.newgrower.findDuplicates.row,
					functionOnNewPage: nsFreshcare.admin.newgrower.findDuplicates.bind,
				});
				ns1blankspace.render.page.show(oParam);
			}	
		},

		row: function(oRow, oParam)
		{
			var aHTML = [];
			var sContact = oRow['contactbusiness.contactperson.firstname'] + 
							((oRow['contactbusiness.contactperson.firstname'] != "") ? " " : "") +
							oRow['contactbusiness.contactperson.surname'] +
							((oRow.primarycontactperson === oRow['contactbusiness.contactperson.id']) 
								? '<br /><span style="font-size:0.75em;color:#A4A4A4;">(Primary contact)</span>'
								: '');

			aHTML.push('<tr>');

			aHTML.push('<td id="ns1blankspaceDuplicates_legalname-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.legalname + '</td>');

			aHTML.push('<td id="ns1blankspaceDuplicates_tradename-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow.tradename + '</td>');
			
			aHTML.push('<td id="ns1blankspaceDuplicates_contact-' + oRow.id + '" class="ns1blankspaceRow">' +
								sContact + '</td>');

			aHTML.push('<td id="ns1blankspaceDuplicates_location-' + oRow.id + '" class="ns1blankspaceRow">' +
								oRow['contactbusiness.addresslink.address.addresssuburb'] + ' ' + oRow['contactbusiness.addresslink.address.addressstate'] + '</td>');

			aHTML.push('</tr>');

			return aHTML.join('');
		},

		bind: function(oParam)
		{

		}
	},

	remove: function(oParam)
	{
		// Here we remove the TEMP_TRAINEE record and then, if id is passed because we've just created the grower record, we open the grower record
		var oRoot = ns1blankspace.rootnamespace;
		var bGrowerCreated = (oParam.id != undefined)
		var iObjectContext = (bGrowerCreated) ? oRoot.admin.newgrower.data.objectContextData.id : ns1blankspace.objectContext;

		if (oParam.removeDataStep == undefined) {oParam.removeDataStep = 1}

		// Check for and remove child objectScope records
		if (oParam.removeDataStep === 1)
		{
			if (oParam.objectScope === undefined)
			{
				ns1blankspace.status.working('Removing source data..');

				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('objectcontext');
				oSearch.addFilter('object', 'EQUAL_TO', nsFreshcare.objectTmpTrainee);
				oSearch.addFilter('objectcontext', 'EQUAL_TO', iObjectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.objectScope = oResponse.data.rows;
						nsFreshcare.admin.newgrower.remove(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding scope: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				if (oParam.objectScopeIndex === undefined) {ns1blankspace.util.setParam(oParam, 'objectScopeIndex', 0)}

				if (oParam.objectScopeIndex < oParam.objectScope.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
						data: 'remove=1&id=' + oParam.objectScope[oParam.objectScopeIndex].id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.objectScopeIndex += 1;
								nsFreshcare.admin.newgrower.remove(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing scope: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.objectScopeIndex);
					delete(oParam.objectScope);
					oParam.removeDataStep += 1;
					nsFreshcare.admin.newgrower.remove(oParam);
				}
			}
		}

		// Remove any relationships if present
		else if (oParam.removeDataStep === 2)
		{
			if (oParam.relationships === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_BUSINESS_LINK_SEARCH';
				oSearch.addField('temptrainee');
				oSearch.addFilter('temptrainee', 'EQUAL_TO', iObjectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.relationships = oResponse.data.rows;
						nsFreshcare.admin.newgrower.remove(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding relationships: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				if (oParam.relationshipsIndex === undefined) {ns1blankspace.util.setParam(oParam, 'relationshipsIndex', 0)}

				if (oParam.relationshipsIndex < oParam.relationships.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_BUSINESS_LINK_MANAGE'),
						data: 'remove=1&id=' + oParam.relationships[oParam.relationshipsIndex].id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.relationshipsIndex += 1;
								nsFreshcare.admin.newgrower.remove(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing relationships: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.relationshipsIndex);
					delete(oParam.relationships);
					oParam.removeDataStep += 1;
					nsFreshcare.admin.newgrower.remove(oParam);
				}
			}
		}

		// Remove any product groups if present
		else if (oParam.removeDataStep === 3)
		{
			if (oParam.productGroups === undefined)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_TEMP_TRAINEE_PRODUCT_GROUP_SEARCH';
				oSearch.addField('trainee');
				oSearch.addFilter('trainee', 'EQUAL_TO', iObjectContext);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						oParam.productGroups = oResponse.data.rows;
						nsFreshcare.admin.newgrower.remove(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error finding categories: ' + oResponse.error.errornotes);
					}
				});
			}
			else
			{
				if (oParam.productGroupsIndex === undefined) {ns1blankspace.util.setParam(oParam, 'productGroupsIndex', 0)}

				if (oParam.productGroupsIndex < oParam.productGroups.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_PRODUCT_GROUP_MANAGE'),
						data: 'remove=1&id=' + oParam.productGroups[oParam.productGroupsIndex].id,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								oParam.productGroupsIndex += 1;
								nsFreshcare.admin.newgrower.remove(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error removing product groups: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.productGroupsIndex);
					delete(oParam.productGroups);
					oParam.removeDataStep= 10;
					nsFreshcare.admin.newgrower.remove(oParam);
				}
			}
		}

		// Remove the original AGRI_TEMP_TRAINEE record
		else if (oParam.removeDataStep === 10)
		{
			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
				data: 'remove=1&id=' + iObjectContext,
				success: function(oResponse)
				{
					if (oResponse.status === 'OK')
					{
						// Now we display the egg farmer record
						delete(oParam.removeDataStep);
						delete(oRoot.admin.newgrower.data.objectContextData);
						ns1blankspace.status.clear();
						if (bGrowerCreated)
						{
							oRoot.admin.grower.init(oParam);
						}
						else
						{
							nsFreshcare.admin.newgrower.init();
						}
					}
					else
					{
						ns1blankspace.status.error('Error removing new grower record: ' + oResponse.error.errornotes);
					}
				}
			});
		}
	},

	save:
	{
		validate: function(oParam)
		{
			if ($('#ns1blankspaceMainDetails').html() != '')
			{
				// v3.4.001 Need to change whether fields are mandatory based on seRegisterBusiness & seExistingBusiness if elearning
				if (ns1blankspace.objectName == 'newelearning')
				{
					// Mandatory fields change depending on values of other fields
					if ($('[name="SeRegisterNewBusiness"]:checked').val() == 'N')
					{
						$('.ns1blankspaceElearningBusiness').attr('data-mandatory', '')
					}
					else
					{
						$('.ns1blankspaceElearningBusiness').attr('data-mandatory', '1')
					}
				}

				// First validate mandatory fields
				$('#ns1blankspaceMainDetails input[data-mandatory]').each(function() 
				{
					if (($(this).attr('data-mandatory') === '1' || ($(this).attr('data-mandatory') === '2' && ns1blankspace.objectContext != -1)) 
						&& $(this).val() === '') 
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
						return false;
					}
				});

				// If Legal Name not populated, set to Trading Name
				if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsLegalNameUpdate').val() === '')
				{
					$('#ns1blankspaceDetailsLegalNameUpdate').val($('#ns1blankspaceDetailsTradingNameUpdate').val());
				}

				// v3.1.0e Need to verify the email address
				if (ns1blankspace.okToSave && $('#ns1blankspaceDetailsEmailUpdate').val() != '' && !nsFreshcare.util.validateEmail($('#ns1blankspaceDetailsEmailUpdate').val()))
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Please provide a valid email address for the ' + nsFreshcare.data.growerText);
					return false;
				}

				if (ns1blankspace.okToSave && ns1blankspace.objectContext === -1 && $('#ns1blankspaceMainAddress').html() === '')
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Please add Address details for a new ' + nsFreshcare.data.growerText);
					return false;
				}
			} 

			if (ns1blankspace.okToSave && $('#ns1blankspaceMainAddress').html() != '')
			{
				// First validate mandatory fields
				if ($('#ns1blankspaceAddressManageContainer').is('*'))
				{
					ns1blankspace.okToSave = false;
					ns1blankspace.status.message('Please confirm or Cancel the changes to the Address before continuing');
					return false;
				}

				$('#ns1blankspaceMainAddress input[data-mandatory]').each(function() 
				{
					if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
					{
						ns1blankspace.okToSave = false;
						ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
						return false;
					}
				});
				
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

			if (ns1blankspace.okToSave && oParam.onComplete)
			{
				ns1blankspace.util.onComplete(oParam);
			}
			else if (!ns1blankspace.okToSave)
			{
				if (oParam.functionInvalidData)
				{
					oParam.functionInvalidData();
				}
			}
		},

		send: function(oParam)
		{	
			var oTmpBusinessData = ns1blankspace.util.getParam(oParam, 'tmpBusinessData', {'default': {}}).value;
			var aTmpScopeData = ns1blankspace.util.getParam(oParam, 'tmpScopeData', {'default': []}).value;
			var aTmpCategoryData = ns1blankspace.util.getParam(oParam, 'tmpCategoryData', {'default': []}).value;
			var aTmpLocationData = ns1blankspace.util.getParam(oParam, 'tmpLocationData', {'default': []}).value;
			var functionValidate = ns1blankspace.util.getParam(oParam, 'functionValidate', {'default': nsFreshcare.admin.newgrower.save.validate}).value;
			var oRoot = ns1blankspace.rootnamespace;
			var aUpdatedScopes = [];
			var aUpdatedCategories = [];
			var iGrower = (nsFreshcare.data.businessGroupGrower) ? nsFreshcare.data.businessGroupGrower : nsFreshcare.data.businessGroupGrower;
			var fFunctionCollateData = (oRoot.admin && oRoot.admin.newgrower && oRoot.admin.newgrower.data && oRoot.admin.newgrower.data.functionCollateData)
										? oRoot.admin.newgrower.data.functionCollateData : undefined;


			if (oParam) {if (oParam.saveNewGrowerStep === undefined) {oParam.saveNewGrowerStep = 1}}
			else {oParam = {saveNewGrowerStep: 1}}

			// Cannot have new records here, so validation must have failed so we need to retrieve id and objectContextData
			if (ns1blankspace.objectContext === -1)
			{
				ns1blankspace.objectContextData = oRoot.admin.newgrower.data.objectContextData;
				ns1blankspace.objectContext = ns1blankspace.objectContextData.id;
			}

			// Collate data
			if (oParam.saveNewGrowerStep === 1)
			{
				ns1blankspace.okToSave = true;
				oParam.onComplete = nsFreshcare.admin.newgrower.save.send;
				oParam.saveNewGrowerStep = 2;
				functionValidate(oParam);
			}

			else if (oParam.saveNewGrowerStep === 2)
			{
				if ($('#ns1blankspaceMainDetails').html() != '')
				{
					oTmpBusinessData = 
					{
						id: ns1blankspace.objectContext,
						businessname: $('#ns1blankspaceDetailsLegalNameUpdate').val(),
						tradename: $('#ns1blankspaceDetailsTradingNameUpdate').val(),
						abn: $('#ns1blankspaceDetailsABNUpdate').val(),
						jobtitle: $('#ns1blankspaceDetailsPositionUpdate').val(),
						title: $('#ns1blankspaceDetailsTitleUpdate').attr('data-id'),
						gender: $('#ns1blankspaceDetailsGenderUpdate').attr('data-id'),
						firstname: $('#ns1blankspaceDetailsFirstNameUpdate').val(),
						surname: $('#ns1blankspaceDetailsSurnameUpdate').val(),
						phone: $('#ns1blankspaceDetailsPhoneUpdate').val(),
						mobile: $('#ns1blankspaceDetailsMobileUpdate').val(),
						fax: $('#ns1blankspaceDetailsFaxUpdate').val(),
						email: $('#ns1blankspaceDetailsEmailUpdate').val(),
						joindate: $('#ns1blankspaceDetailsJoinDateUpdate').val(),
						notes: $('#ns1blankspaceDetailsNotesUpdate').val(),
						harvestmonth: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate'}),
						auditcontactbusiness: ns1blankspace.objectContextData.auditcontactbusiness,
						codeofpractice: (ns1blankspace.objectName == 'newelearning') ? $('#ns1blankspaceDetailsCOPUpdate').attr('data-id') : ns1blankspace.objectContextData.codeofpractice,
						membership: (ns1blankspace.objectName == 'newelearning') ? $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id') : ns1blankspace.objectContextData.membership
					}

					if (ns1blankspace.objectName == 'newelearning')
					{	
					 	oTmpBusinessData.seexistingbusiness = $("input[name='radioSeExistingBusiness']:checked").val();
					 	oTmpBusinessData.seregisternewbusiness = $("input[name='SeRegisterNewBusiness']:checked").val();
					 	oTmpBusinessData.seprevioustraining = $("#textSePreviousTraining").val();
					 	oTmpBusinessData.seindustryrole = $("#ns1blankspaceDetailsSeIndustryRoleUpdate").val();	
					 	oTmpBusinessData.secertificatenumber = $('#ns1blankspaceDetailsSeCertificateNumberUpdate').val();
					 	oTmpBusinessData.setrainingpackage = $('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-id')
					}

					// Calculate sorted crops data
					var sCrops = $('#ns1blankspaceMembershipCropsUpdate').val();
					var sCropsSorted = sCrops;
					if (sCrops != 'wine grapes')
					{
						var aCropsSorted = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
												function(x) 
												{
													return {
																value: $(x).html(),
																sortValue: $(x).html().toUpperCase()
															}
												})
												.sort(ns1blankspace.util.sortBy('value'));
						sCrops = $.map(aCropsSorted, function(x) {return x.value}).join(', ');

					}
					oTmpBusinessData.crop = sCrops;
					
					// Now generate scope data
					aUpdatedScopes = $.map($('#ns1blankspaceDetailsScopeUpdate td'), function(x)
												{
													var oRow = 
													{
														id: $('#nsFreshcareScopeList_' + x.id.split('_').pop()).attr('data-rowID'), 
														scope: x.id.split('_').pop(), 
														scopetext: $(x).html(),
														selected: $(x).hasClass('nsFreshcareSelected')
													}
													return oRow;
												});
					$.each(aUpdatedScopes, function()
					{
						if ((this.id === undefined || this.id === 'undefined') && this.selected)
						{
							aTmpScopeData.push(
							{
								object: nsFreshcare.objectTmpTrainee,
								objectContext: ns1blankspace.objectContext,
								scope: this.scope
							});
						}
						else if (this.id && !this.selected)
						{
							aTmpScopeData.push(
							{
								remove: '1',
								id: this.id
							});
						}
					});


					// Now generate category (Product Group) data
					aUpdatedCategories = $.map($('#ns1blankspaceDetailsProductGroupUpdate td'), function(x)
												{
													var oRow =  
													{
														id: $('#nsFreshcareProductGroupList_' + x.id.split('_').pop()).attr('data-rowID'), 
														category: x.id.split('_').pop(), 
														selected: $(x).hasClass('nsFreshcareSelected')
													};
													return oRow;
												});
					$.each(aUpdatedCategories, function()
					{
						if (this.id === undefined && this.selected)
						{
							aTmpCategoryData.push(
							{
								trainee: ns1blankspace.objectContext,
								productGroup: this.category
							});
						}
						else if (this.id && !this.selected)
						{
							aTmpCategoryData.push(
							{
								remove: '1',
								id: this.id
							});
						}
					});
				}

				if ($('#ns1blankspaceMainAddress').html() != '')
				{
					var sNewAddress = $('#ns1blankspaceAddressMailingAddress1Update').val() + ' ' + 
									  $('#ns1blankspaceAddressMailingAddress2Update').val() + ' ' +
									  $('#ns1blankspaceAddressMailingSuburbUpdate').val() + ' ' +
									  $('#ns1blankspaceAddressMailingStateUpdate').val() + ' ' + 
									  $('#ns1blankspaceAddressMailingPostCodeUpdate').val() + ' ' + 
									  $('#ns1blankspaceAddressMailingCountryUpdate').val();
					var sOldAddress = ns1blankspace.objectContextData.mailingaddress1.formatXHTML() + ' ' + 
									  ns1blankspace.objectContextData.mailingaddress2.formatXHTML() + ' ' +
									  ns1blankspace.objectContextData.mailingsuburb.formatXHTML() + ' ' +
									  ns1blankspace.objectContextData.mailingstate.formatXHTML() + ' ' +
									  ns1blankspace.objectContextData.mailingpostcode.formatXHTML() + ' ' +
									  ns1blankspace.objectContextData.mailingcountry.formatXHTML();

					if (sNewAddress != sOldAddress)
					{
						oTmpBusinessData.mailingaddress1 = $('#ns1blankspaceAddressMailingAddress1Update').val();
						oTmpBusinessData.mailingaddress2 = $('#ns1blankspaceAddressMailingAddress2Update').val();
						oTmpBusinessData.mailingsuburb = $('#ns1blankspaceAddressMailingSuburbUpdate').val();
						oTmpBusinessData.mailingstate = $('#ns1blankspaceAddressMailingStateUpdate').val();
						oTmpBusinessData.mailingpostcode = $('#ns1blankspaceAddressMailingPostCodeUpdate').val();
						oTmpBusinessData.mailingcountry = $('#ns1blankspaceAddressMailingCountryUpdate').val();
					}
					// v3.4.001 eLearning uses site addresses so only do this for newgrower
					if ($('#ns1blankspaceAddressStreetAddress1').is('*'))
					{
						sNewAddress = $('#ns1blankspaceAddressStreetAddress1').val() + ' ' + 
									  $('#ns1blankspaceAddressStreetAddress2').val() + ' ' +
									  $('#ns1blankspaceAddressStreetSuburb').val() + ' ' + 
									  $('#ns1blankspaceAddressStreetState').val() + ' ' + 
									  $('#ns1blankspaceAddressStreetPostCode').val() + ' ' +
									  $('#ns1blankspaceAddressStreetCountry').val();
						var sOldAddress = ns1blankspace.objectContextData.address1.formatXHTML() + ' ' + 
										  ns1blankspace.objectContextData.address2.formatXHTML() + ' ' +
										  ns1blankspace.objectContextData.suburb.formatXHTML() + ' ' +
										  ns1blankspace.objectContextData.state.formatXHTML() + ' ' +
										  ns1blankspace.objectContextData.postcode.formatXHTML() + ' ' +
										  ns1blankspace.objectContextData.country.formatXHTML();
						if (sNewAddress != sOldAddress)
						{
							oTmpBusinessData.address1 = $('#ns1blankspaceAddressStreetAddress1').val();
							oTmpBusinessData.address2 = $('#ns1blankspaceAddressStreetAddress2').val();
							oTmpBusinessData.suburb = $('#ns1blankspaceAddressStreetSuburb').val();
							oTmpBusinessData.state = $('#ns1blankspaceAddressStreetState').val();
							oTmpBusinessData.postcode = $('#ns1blankspaceAddressStreetPostCode').val();
							oTmpBusinessData.country = $('#ns1blankspaceAddressStreetCountry').val();
						}
					}
					// Site Addresses
					$('tr.ns1blankspaceRowAddress').each(function(index) 
					{
						var sAddressId = $(this).attr('id').split('_').pop();
						if (sAddressId == '1' && this.id.indexOf('--1') > -1) {sAddressId = '-1'}
						var bNew = false;
						sNewAddress = '';
						sOldAddress = '';

						sNewAddress = ($('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html() + ' ' +
									  $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html() + ' ' +
									  $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html() + ' ' +
									  $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html() + ' ' +
									  $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html()).formatXHTML();
						bNew = ($(this).attr('data-type') === 'new') || sAddressId == '-1';

						if ($.trim(sNewAddress) != "") 
						{
							if (index === 0) 	// First one in the list - default address for the business also needs to be stored against ContactBusiness
							{
								// First, update the primary business and default site data
								var sOldAddress = ns1blankspace.objectContextData.sites[0].address1.formatXHTML() +  ' ' + 
												  ns1blankspace.objectContextData.sites[0].address2.formatXHTML() + ' ' + 
												  ns1blankspace.objectContextData.sites[0].addresssuburb.formatXHTML() +  ' ' + 
												  ns1blankspace.objectContextData.sites[0].addressstate.formatXHTML() + ' ' + 
												  ns1blankspace.objectContextData.sites[0].addresspostcode.formatXHTML();

								if (sNewAddress != sOldAddress || bNew) 
								{
									oTmpBusinessData.address1 = $('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html();
									oTmpBusinessData.address2 = $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html();
									oTmpBusinessData.suburb = $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html();
									oTmpBusinessData.state = $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html();
									oTmpBusinessData.postcode = $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html();
									oTmpBusinessData.country = 'Australia';

									aTmpLocationData.push({id: (bNew ? '' : sAddressId),
															 streetAddress1: $('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html().formatXHTML(),
															 streetAddress2: $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html().formatXHTML(),
															 streetSuburb: $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html().formatXHTML(),
															 streetState: $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html().formatXHTML(),
															 streetPostCode: $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html().formatXHTML(),
															 status: '1',
															 'new': false
															});
								}
							}
							else 
							{
								var oSite = $.grep(ns1blankspace.objectContextData.sites, function(a) { return a.id == sAddressId;}).shift();
								var sOldAddress = '';
								if (oSite) 
								{
									// This is an existing site we've updated
									var sOldAddress = oSite.address1.formatXHTML() +  ' ' + 
													  oSite.address2 .formatXHTML()+ ' ' + 
													  oSite.addresssuburb.formatXHTML() + ' ' + 
													  oSite.addressstate.formatXHTML() + ' ' + 
													  oSite.addresspostcode.formatXHTML();
								}

								if (sNewAddress != sOldAddress) 
								{
									aTmpLocationData.push({id: (bNew ? '' : sAddressId),
															 streetAddress1: $('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html().formatXHTML(),
															 streetAddress2: $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html().formatXHTML(),
															 streetSuburb: $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html().formatXHTML(),
															 streetState: $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html().formatXHTML(),
															 streetPostCode: $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html().formatXHTML(),
															 status: (oSite && oSite.status || '2'),
															 'new': bNew
															});
								} 
							}
						}
					});
				}

				if (Object.keys(oTmpBusinessData).length > 1 && oTmpBusinessData.id == undefined) 
				{
					oTmpBusinessData.id = ns1blankspace.objectContext;
				}
				oParam.tmpBusinessData = oTmpBusinessData;
				oParam.tmpScopeData = aTmpScopeData;
				oParam.tmpCategoryData = aTmpCategoryData;
				oParam.tmpLocationData = aTmpLocationData;
				oParam.saveNewGrowerStep = 3;

				// v3.1.0 For forking when need to specify more data
				// v3.1.209 Now uses fFunctionCollateData
				if (fFunctionCollateData)
				{
					oParam.onComplete = nsFreshcare.admin.newgrower.save.send;
					fFunctionCollateData(oParam);
				}
				else
				{
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Save AgriTmpBusiness
			else if (oParam.saveNewGrowerStep === 3)
			{
				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
					data: oTmpBusinessData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.status.message('New ' + nsFreshcare.data.growerText + ' saved');
							oParam.saveNewGrowerStep = 4;
							nsFreshcare.admin.newgrower.save.send(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error saving new ' + nsFreshcare.data.growerText + ': ' + oResponse.error.errornotes);
						}
					}
				});
			}

			// Save ObjectScope
			else if (oParam.saveNewGrowerStep === 4)
			{
				if (oParam.saveObjectIndex === undefined) {oParam.saveObjectIndex = 0}

				if (oParam.saveObjectIndex < aTmpScopeData.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
						data: aTmpScopeData[oParam.saveObjectIndex],
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message(nsFreshcare.data.growerText + ' Scope saved');
								oParam.saveObjectIndex += 1;
								nsFreshcare.admin.newgrower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving new ' + nsFreshcare.data.growerText + ' Scope: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.saveObjectIndex);
					oParam.saveNewGrowerStep = 5;
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Save Category (product groups)
			else if (oParam.saveNewGrowerStep === 5)
			{
				if (oParam.saveObjectIndex === undefined) {oParam.saveObjectIndex = 0}

				if (oParam.saveObjectIndex < aTmpCategoryData.length)
				{
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_PRODUCT_GROUP_MANAGE'),
						data: aTmpCategoryData[oParam.saveObjectIndex],
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message(nsFreshcare.data.growerText + ' Category saved');
								oParam.saveObjectIndex += 1;
								nsFreshcare.admin.newgrower.save.send(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error saving new ' + nsFreshcare.data.growerText + ' Category: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.saveObjectIndex);
					oParam.saveNewGrowerStep = 6;
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Save Sites 
			else if (oParam.saveNewGrowerStep === 6)
			{
				if (aTmpLocationData.length > 0)
				{
					var aThisSite = aTmpLocationData[0];
					var sTmpLocationSites = 'id=';

					if (aThisSite.id == '')
					{
						oParam.newSite = true;
					}
					else
					{
						sTmpLocationSites += aThisSite.id;
					}

					sTmpLocationSites += '&address1=' + ns1blankspace.util.fs(aThisSite.streetAddress1) +
										'&address2=' + ns1blankspace.util.fs(aThisSite.streetAddress2) +
										'&addresssuburb=' + ns1blankspace.util.fs(aThisSite.streetSuburb) +
										'&addressstate=' + ns1blankspace.util.fs(aThisSite.streetState) +
										'&addresspostcode=' + ns1blankspace.util.fs(aThisSite.streetPostCode) +
										'&addresscountry=Australia' +
										'&status=' + ns1blankspace.util.fs(aThisSite.status);

					aTmpLocationData.shift();
					oParam = ns1blankspace.util.setParam(oParam, 'tmpLocationData', aTmpLocationData);

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_MANAGE'),
						data: sTmpLocationSites,
						dataType: 'json',
						success: function(oResponse) 
						{
							if (oResponse.status === 'OK')
							{
								// Now create link to Business if new Site
								if (oParam.newSite == true)
								{
									var sData = 'objectcontext=' + ns1blankspace.objectContext +
												'&object=' + nsFreshcare.objectTmpTrainee + 
												'&address=' + oResponse.id;

									delete(oParam.newSite);

									$.ajax(
									{
										type: 'POST',
										url: ns1blankspace.util.endpointURI('CORE_LOCATION_ADDRESS_LINK_MANAGE'),
										data: sData,
										dataType: 'JSON',
										success: function(oResponse)
										{
											if (oResponse.status === 'OK')
											{
											}
											else
											{
												ns1blankspace.status.error(oResponse.error.errornotes);
												oParam.saveNewGrowerStep = 10;
											}
											nsFreshcare.admin.newgrower.save.send(oParam); 
										}
									});
								}
								else
								{
									nsFreshcare.admin.newgrower.save.send(oParam); 
								}
							}
							else
							{
								ns1blankspace.status.error(oResponse.error.errornotes);
								nsFreshcare.admin.newgrower.save.send(oParam); 
							}
						}
					});
				}
				else
				{
					delete(oParam.saveObjectIndex);
					oParam.saveNewGrowerStep = 10;
					nsFreshcare.admin.newgrower.save.send(oParam);
				}
			}

			// Re-display record
			else if (oParam.saveNewGrowerStep === 10)
			{
				ns1blankspace.inputDetected = false;
				nsFreshcare.admin[ns1blankspace.objectName].init({id: ns1blankspace.objectContext});
			}
		}
	},

	createNewGrower:
	{
		data: {},

		checkForExactMatch: function(oParam)
		{	// v3.4.010 SUP023918 Used by both newelearning and newgrower

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';
			oSearch.addField('tradename,legalname,abn,contactbusiness.businessgroup.grouptext');
			oSearch.addBracket('(');
			oSearch.addFilter('legalname', 'EQUAL_TO', ns1blankspace.objectContextData.businessname);
			oSearch.addOperator('or');
			oSearch.addFilter('tradename', 'EQUAL_TO', ns1blankspace.objectContextData.tradename);
			oSearch.addBracket(')');
			oSearch.rows = 100;
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK' && oResponse.data.rows.length > 0)
				{
					var aHTML = [];
					var sPrevBusiness = '';

					aHTML.push('<p>A business with the same legal or trading name already exists.' +
								' Please check below to confirm that a duplicate business is not being added before continuing.</p>');

					aHTML.push('<div style="background-color: #F0F0F0; padding:10px;"');
					aHTML.push('<p><i>Details from eLearning:</i></p>');

					aHTML.push('<p><b>Legal Name</b>: ' + 
									ns1blankspace.objectContextData.businessname + '</p>');
					aHTML.push('<p><b>Trading Name</b>: ' + 
									ns1blankspace.objectContextData.tradename + '</p>');
					aHTML.push('<p><b>ABN</b>: ' + ns1blankspace.objectContextData.abn + '</p>');
					aHTML.push('</div>');
					aHTML.push('<p style="padding:0px;margin:0px;">&nbsp;</p>');

					aHTML.push('<div style="background-color: #CDE5C0; padding:10px;"');
					aHTML.push('<p style="padding-top: 10px;"><i>Matching Businesses found:</i></p>');

					aHTML.push('<table class="ns1blankspace">');
					aHTML.push('<tr><th style="text-align:left;">Legal Name</th><th style="text-align:left;">Trading Name</th>' +
									'<th style="text-align:left;">ABN</th><th style="text-align:left;">Groups</tr>');
					$.each(oResponse.data.rows, function()
					{
						if (sPrevBusiness != this.id)
						{
							if (sPrevBusiness != '')
							{
								aHTML.push('</td></tr>');
							}
							aHTML.push('<tr><td class="ns1blankspaceRow" style="padding-top: 5px;">' + this.legalname + '</td>' +
								   '<td class="ns1blankspaceRow" style="padding-top: 5px;">' + this.tradename + '</td>' +
								   '<td class="ns1blankspaceRow" style="padding-top: 5px;">' + this.abn + '</td>' +
								   '<td class="ns1blankspaceRow" style="padding-top: 5px;">' + this['contactbusiness.businessgroup.grouptext']);
						}
						else
						{
							aHTML.push('<br />' + this['contactbusiness.businessgroup.grouptext']);
						}
						sPrevBusiness = this.id;
					});
					aHTML.push('</td></tr></table>');
					aHTML.push('</div>');
				
					ns1blankspace.container.confirm(
					{
						html: '<span style="font-size: 0.75em">' + aHTML.join('') + '</span>',
						title: 'Warning! Potential duplicates exist',
						buttons:
						[
							{
								text: 'Continue',
								click: function()
								{
									// v4.0.016 SUP024187 Now uses hidden.bs-modal
									$('#ns1blankspaceBootstrapDialog')
									.modal('hide')
									.on('hidden.bs.modal', function()
									{
										$('#ns1blankspaceBootstrapDialog')
											.data('modal', null)
											.off('hidden.bs.modal');
										if (oParam.onComplete)
										{
											ns1blankspace.util.onComplete(oParam);
										}
									});
								}
							},
							{
								text: 'Cancel',
								click: function()
								{
									delete(oParam);
									$('#ns1blankspaceBootstrapDialog').modal('hide');
								}
							}
						],
						bind: function(functionParams)
						{
							var aButtons = functionParams.buttons;
							$('#ns1blankspaceBootstrapDialog')
								.html(functionParams.html)
								.modal('show');
							$.each(aButtons, function()
							{
								$('#' + this.name).on('click', this.click);
							});
							$('.modal-dialog').css('width', '650').css('height', '450');
						}
					});
				}
				else
				{
					if (oResponse.status != 'OK')
					{
						ns1blankspace.status.error('Error searching for duplicate Business: ' + oResponse.error.errornotes);
					}
					else
					{
						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
				}
			});
		},

		send: function(oParam)
		{
			// This is the process to add the new grower to the db. We use the same code as in admin.grower.save but different functions for collecting details tab data
			oParam = oParam || {};

			// v3.4.001 Don't need to add objects to saveObjects as it's all done in the extendedTasks section
			oParam.functionValidate = nsFreshcare.admin.newgrower.save.validate;
			oParam.functionSaveDetails = nsFreshcare.admin.newgrower.createNewGrower.details;
			oParam.functionSaveAddress = nsFreshcare.admin.newgrower.createNewGrower.address;
			oParam.functionSaveMore = nsFreshcare.admin.newgrower.createNewGrower.extendedTasks;
			oParam.newMembership = true;
			oParam.functionSearch = nsFreshcare.admin.newgrower.updateTempTraineeStatus;

			// We have to render both the details and address tabs to make sure the data is picked up
			if ($('#ns1blankspaceMainDetails').html() === '')
			{
				$('#ns1blankspaceMainDetails').attr('data-loading', '1');
				nsFreshcare.admin.newgrower.details();
				$('#ns1blankspaceMainDetails').hide();
			}
			if ($('#ns1blankspaceMainAddress').html() === '')
			{
				$('#ns1blankspaceMainAddress').attr('data-loading', '1');
				nsFreshcare.admin.newgrower.address();
				$('#ns1blankspaceMainAddress').hide()
			}
			
			oParam.newGrower = true;	// v3.4.002 Need this to make sure we get nextReference
			oParam.functionInvalidData = nsFreshcare.admin.newgrower.createNewGrower.dataError;
			nsFreshcare.admin.newgrower.data.objectContext = ns1blankspace.objectContext;
			nsFreshcare.admin.newgrower.data.objectContextData = ns1blankspace.objectContextData;
			ns1blankspace.objectContext = -1;
			nsFreshcare.admin.grower.save.send(oParam);
		},

		dataError: function()
		{
			ns1blankspace.objectContext = nsFreshcare.admin.newgrower.data.objectContext;
			ns1blankspace.objectContextData = nsFreshcare.admin.newgrower.data.objectContextData;
			delete(nsFreshcare.admin.newgrower.data.objectContext);
			delete(nsFreshcare.admin.newgrower.data.objectContextData);
		},

		details: function(oParam)
		{
			var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": nsFreshcare.admin.grower.save.send}).value;			
			var oBusinessData = ns1blankspace.util.getParam(oParam, 'businessData', {"default": {}}).value;
			var oPersonData	= ns1blankspace.util.getParam(oParam, 'personData', {"default": {}}).value;
			var oAgriBusinessData = ns1blankspace.util.getParam(oParam, 'agriBusinessData', {"default": {}}).value;
			var aBusinessGroupsData = ns1blankspace.util.getParam(oParam, 'businessGroupsData', {"default": []}).value;
			var aPersonGroupsData = ns1blankspace.util.getParam(oParam, 'personGroupsData', {"default": []}).value;
			var aSubscriptionsData = ns1blankspace.util.getParam(oParam, 'subscriptionsData', {"default": []}).value;
			var aSubscriptionCategoryData = ns1blankspace.util.getParam(oParam, 'subscriptionCategoryData', {"default": []}).value;
			var aSubscriptionScopeData = ns1blankspace.util.getParam(oParam, 'subscriptionScopeData', {"default": []}).value;
			var oSubscriptionStatusChangeData = ns1blankspace.util.getParam(oParam, 'subscriptionStatusChangeData', {"default": {}}).value;
			var oTrainingCourseAttendeeData = ns1blankspace.util.getParam(oParam, 'trainingCourseAttendeeData', {'default': {}}).value;
			var aRelationshipsData = ns1blankspace.util.getParam(oParam, 'relationshipsData', {'default': []}).value;
			var aAttendeeScopeData = ns1blankspace.util.getParam(oParam, 'attendeeScopeData', {'default': []}).value;
			var aAttendeeCategoryData = ns1blankspace.util.getParam(oParam, 'attendeeCategoryData', {'default': []}).value;
			var oPersonMembershipData = ns1blankspace.util.getParam(oParam, 'personMembershipData', {'default': {}}).value;
			var sBusType = "customer";
			var sPersType = "customer";
			
			if (ns1blankspace.objectName == 'newelearning')
			{
				var oTrainingCourseData = ns1blankspace.util.getParam(oParam, 'trainingCourseData', {"default": {}}).value;
			}


			// v3.1.206 SUP023052 Was not picking up notes that Trainer had entered
			// v3.3.001 SUP022964 eLearning Trainees logged into Freshcare
			var sNotes = ($('#ns1blankspaceDetailsNotesUpdate').val() != '')
							? $('#ns1blankspaceDetailsNotes').html()  + '\r\n' + $('#ns1blankspaceDetailsNotesUpdate').val()
							: $('#ns1blankspaceDetailsNotes').html();
			sNotes = (sNotes == '&nbsp;') ? '' : sNotes;


			if (ns1blankspace.objectName == 'newgrower') 
			{
				oParam.configure = {createMember: true};
			}
			else
			{
				oParam.configure.createMember = (oParam.configure.isMember && oParam.configure.createBusiness);
				// Only Members and Customers are "customers", all others are "suppliers"
				if (oParam.configure.isMember 
					|| (oParam.configure.createBusinessGroups && oParam.configure.createBusinessGroups.indexOf(nsFreshcare.data.businessGroupCustomer) > -1))
				{}
				else {	sBusType = "supplier"}

				// v3.4.004 Switched from shift() to join() on groupCustomer as was removing this value
				if (oParam.configure.isMember 
					|| (oParam.configure.createPersonGroups && oParam.configure.createPersonGroups.indexOf(nsFreshcare.data.groupCustomer.join(',')) > -1))
				{}
				else {	sPersType = "supplier"}

				if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
				{
					ns1blankspace.objectContext = nsFreshcare.admin.newelearning.data.matchingData.contactBusiness;
				}
				else
				{
					ns1blankspace.objectContext = -1;
				}
			}

			if (oParam.configure.createMember || oParam.configure.createBusiness)
			{
				// v3.3.001 SUP023608 Now defaults allowlinkrequests
				oBusinessData = $.extend(true, oBusinessData, 
				{
					tradename: $('#ns1blankspaceDetailsTradingNameUpdate').val(),
					legalname: $('#ns1blankspaceDetailsLegalNameUpdate').val(),
					abn: $('#ns1blankspaceDetailsABNUpdate').val(),
					phonenumber: $('#ns1blankspaceDetailsPhoneUpdate').val(),
					faxnumber: $('#ns1blankspaceDetailsFaxUpdate').val(),
					notes: sNotes,
					seallowlinkrequests: 'Y'
				});
				oBusinessData[sBusType + 'status'] = nsFreshcare.data.contactStatusActive;

				if (oParam.configure.createMember)
				{
					oBusinessData.reference = oParam.nextReference;
					oBusinessData['se' + nsFreshcare.data.sendPrintedCertificatesId] = $.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'No'}),
																				function(y) {return y.id}).shift();
				}
			}
			else if (oParam.configure.updateBusiness || oParam.configure.convertBusiness)
			{
				var eLearningBusinessData = {};
				$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness, function(index, vals) 
				{	
					//var sPrefix = (vals.indexOf('street') == 0 || vals.indexOf('mailing') == 0) ? 'business' : '';
					if (vals == 'businessname') {vals = 'tradename'}
					eLearningBusinessData[vals] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.' + vals];
				});
				eLearningBusinessData[sBusType + 'status'] = nsFreshcare.data.contactStatusActive;

				// v3.4.005 Now sets mandatory Member fields when converting from non-Member- including nextReference
				if (oParam.configure.convertBusiness)
				{
					oBusinessData.reference = oParam.nextReference;
					oBusinessData.seallowlinkrequests = 'Y';
					oBusinessData['se' + nsFreshcare.data.sendPrintedCertificatesId] = $.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'No'}),
																				function(y) {return y.id}).shift();
				}

				if (ns1blankspace.objectContext != -1) 
				{
					eLearningBusinessData['id'] = ns1blankspace.objectContext;
				}
				oBusinessData = $.extend(true, oBusinessData, eLearningBusinessData);
			}
			else if (!oParam.configure.personOnly)
			{
				if (ns1blankspace.objectContext != -1) 
				{
					oBusinessData.id = ns1blankspace.objectContext
				}
			}


			if (oParam.configure.createMember || oParam.configure.createPerson)
			{	// New Person record to be created
				oPersonData = $.extend(true, oPersonData,
				{
					firstname: $('#ns1blankspaceDetailsFirstNameUpdate').val(),
					surname: $('#ns1blankspaceDetailsSurnameUpdate').val(),
					title: $('#ns1blankspaceDetailsTitleUpdate').attr('data-id'),
					position: $('#ns1blankspaceDetailsPositionUpdate').val(),
					gender: $('#ns1blankspaceDetailsGenderUpdate').attr('data-id'),
					workphone: $('#ns1blankspaceDetailsPhoneUpdate').val(),
					fax: $('#ns1blankspaceDetailsFaxUpdate').val(),
					mobile: $('#ns1blankspaceDetailsMobileUpdate').val(),
					email: $('#ns1blankspaceDetailsEmailUpdate').val(),
					notes: sNotes,
					contactbusiness: ''
				});
				oPersonData[sPersType + 'status'] = nsFreshcare.data.contactStatusActive;

				if (oBusinessData && oBusinessData.id) {oPersonData.contactbusiness = oBusinessData.id}

			}
			else if (oParam.configure.updatePerson)
			{	// Details are to be updated on the Person
				var eLearningPersonData = {};
				$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson, function(index, vals) 
				{	
					eLearningPersonData[vals] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.contactperson.' +vals];
				});
				eLearningPersonData[sPersType + 'status'] = nsFreshcare.data.contactStatusActive;

				if (nsFreshcare.admin.newelearning.data.matchingData.contactPerson != undefined) 
				{
					eLearningPersonData['id'] = nsFreshcare.admin.newelearning.data.matchingData.contactPerson
				}
				
				if (ns1blankspace.objectContext != -1)
				{
					eLearningPersonData['contactbusiness'] = ns1blankspace.objectContext;
				}
				else
				{
					eLearningPersonData['contactbusiness'] = '';
				}
				oPersonData = $.extend(true, oPersonData, eLearningPersonData);
			}
			else if (oParam.configure.isPerson && nsFreshcare.admin.newelearning.data.matchingData.contactPerson)
			{	// We have a matching Person - store the id for use elsewhere
				oPersonData.id = nsFreshcare.admin.newelearning.data.matchingData.contactPerson;
			}

			// v3.4.001 Create TrainerMembership link if required
			if (oParam.configure.createPersonMembership)
			{
				oPersonMembershipData = 
				{
					contactbusiness: (oBusinessData.id != undefined ? oBusinessData.id : ''),
					contactperson: (oPersonData.id != undefined ? oPersonData.id : ''),
					membership: $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id')
				}
			}

			// v3.4.001 In eLearning, users can now choose business groups to add
			if (oParam.configure.createMember || oParam.configure.createBusinessGroups)
			{
				// Only add business Group of 'Grower' unless there's a list already defined in createBusinessGroups 
				if (oParam.configure.createBusinessGroups)
				{
					aBusinessGroupsData = $.map(oParam.configure.createBusinessGroups, function(x) {return {group: x, contactbusiness: ''}});
				}
				else
				{
					aBusinessGroupsData.push(
					{
						group: nsFreshcare.data.businessGroupGrowerID,
						contactbusiness: ''
					});
				}
			}
			
			// v3.4.001 In eLearning, users can now choose business groups to add
			if (oParam.configure.createMember || oParam.configure.createPersonGroups)
			{
				// Only add business Group of 'Trainee' unless there's a list already defined in createPersonGroups 
				// v3.1.0 add to contactperson for easier identification. Later add to attending trainee contact
				if (oParam.configure.createPersonGroups)
				{
					aPersonGroupsData = $.map(oParam.configure.createPersonGroups, function(x) {return {group: x, contactperson: ''}});
				}
				else
				{
					aPersonGroupsData.push(
					{
						group: nsFreshcare.data.groupTrainee,
						contactperson: ''
					});
				}
			}


			if (oParam.configure.createMember || (!oParam.configure.isMember && oParam.configure.createBusiness) || oParam.configure.createRelationship)
			{
				aRelationshipsData.push( 
				{
					contactbusiness: ((ns1blankspace.objectName == 'newelearning') ? nsFreshcare.data.eLearningBusiness : ns1blankspace.objectContextData.trainercontactbusiness),
					othercontactbusiness: '',
					type: nsFreshcare.data.relationshipTrainer,
					startdate: $('#ns1blankspaceDetailsTrainingDateUpdate').val()
				});
			}

			if (oParam.configure.createMember)
			{
				// v3.12 SUP022744 Only add person Group of 'Grower'
				aPersonGroupsData.push(
				{
					group: nsFreshcare.data.grower.categoryGrower,
					contactperson: ''
				});
			}
				
			var sCrops = $('#ns1blankspaceMembershipCropsUpdate').val();
			if (sCrops.toLowerCase() != 'wine grapes')
			{
				var aCropsSorted = $.map($('#ns1blankspaceMembershipCropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
										function(x) 
										{
											return {
														value: $(x).html(),
														sortValue: $(x).html().toUpperCase()
													}
										})
										.sort(ns1blankspace.util.sortBy('value'));
				sCrops = $.map(aCropsSorted, function(x) {return x.value}).join(', ');
			}

			if (oParam.configure.createMember || oParam.configure.createSubscription)
			{
				if (oParam.configure.createMember)
				{
					oAgriBusinessData = $.extend(true, oAgriBusinessData,
					{
						contactbusiness: '',
						joindate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),	
						prioritymembership: $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id')
					});		
				}

				// Subscription data
				// v3.4.001 SUP023841 Set Status to FM if eLearning, otherwise set to TI
				aSubscriptionsData = [
				{
					contactbusiness: '',
					contactperson: '',
					membership: $('#ns1blankspaceDetailsMembershipUpdate').attr('data-id'),
					startdate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),
					codeofpractice: (ns1blankspace.objectName == 'newgrower' ? ns1blankspace.objectContextData.codeofpractice : oParam.configure.codeOfPractice),
					status: nsFreshcare.data.grower['subscriptionStatus' + (ns1blankspace.objectName == 'newelearning' ? 'FM' : 'TI')],
					laststatuschangedate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),
					crop: sCrops,
					harvestmonth: nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate'})
				}];

				// Status Change Data
				oSubscriptionStatusChangeData = 
				{
					subscription: '',
					changecontactbusiness: ns1blankspace.user.contactBusiness,
					changecontactperson: ns1blankspace.user.contactPerson,
					changedate: $('#ns1blankspaceDetailsTrainingDateUpdate').val(),
					tostatus: nsFreshcare.data.grower['subscriptionStatus' + (ns1blankspace.objectName == 'newelearning' ? 'FM' : 'TI')]
				};

				// Add Scope
				// v3.1.2 SUP022744 Now adds scope instead of persongroups
				$('.nsFreshcareScope.nsFreshcareSelected').each(function()
				{
					aSubscriptionScopeData.push(
					{
						scope: this.id.split('_').pop(), 
						object: nsFreshcare.objectSubscription,
						objectcontext: ''
					});
				});
				if (aSubscriptionScopeData.length === 0)
				{
					aSubscriptionScopeData.push(
					{
						scope: $.grep(nsFreshcare.data.scopeOptions, function(x) {return x.title == 'Grower'}).shift().id, 
						object: nsFreshcare.objectSubscription,
						objectcontext: ''
					});			
				}

				// Category data
				$('.nsFreshcareProductGroup.nsFreshcareSelected').each(function()
				{
					aSubscriptionCategoryData.push(
					{
						productcategory: this.id.split('_').pop(), 
						subscription: ''
					});
				});
			}
			else if (oParam.configure.subscriptionId)
			{
				oParam.agrisubscription = {id: oParam.configure.subscriptionId};
			}

			if(ns1blankspace.objectName == 'newelearning')
			{
				var aCourseDate = nsFreshcare.admin.newgrower.data.objectContextData['createddate'].split(' ');
				aCourseDate.pop();
				// v4.0.009 COurse Title contained ampersands
				oTrainingCourseData = 
				{
					package: oParam.configure.packageID,
					coursedate: aCourseDate.join(' '),
					location: 'eLearning',
					state: '9',
					status: '1',		// Status Scheduled
					trainercontactbusiness: nsFreshcare.data.eLearningBusiness,
					title: oParam.configure.packageTitle.formatXHTML(),
					trainercontactperson: nsFreshcare.data.eLearningPerson,
					details: 'Trainee: ' + nsFreshcare.admin.newgrower.data.objectContextData.firstname + ' '  + 
										   nsFreshcare.admin.newgrower.data.objectContextData.surname + '/r/n' +
							 'Registered: ' + aCourseDate.join(' ') + '/r/n' +
							 'Payment Reference: ' + nsFreshcare.admin.newgrower.data.objectContextData.sepaymentreference
				};

				// v3.4.001 SUP022964 Now adds scope and category data to Trainee Attendance record if eLearning and not a Member
				if (oParam.configure.isMember != true)
				{
					$('.nsFreshcareScope.nsFreshcareSelected').each(function()
					{
						aAttendeeScopeData.push(
						{
							scope: this.id.split('_').pop(), 
							object: nsFreshcare.objectTrainingCourseAttendee,
							objectcontext: ''
						});
					});
					if (aAttendeeScopeData.length === 0)
					{
						aAttendeeScopeData.push(
						{
							scope: $.grep(nsFreshcare.data.scopeOptions, function(x) {return x.title == 'Grower'}).shift().id, 
							object: nsFreshcare.objectTrainingCourseAttendee,
							objectcontext: ''
						});			
					}

					// Category data
					$('.nsFreshcareProductGroup.nsFreshcareSelected').each(function()
					{
						aAttendeeCategoryData.push(
						{
							productcategory: this.id.split('_').pop(), 
							coursetrainee: ''
						});
					});
				}

			}

			// Training Course Attendee data
			// v3.1.2 SUP022932 Was not saving first and surname to attending trainee
			oTrainingCourseAttendeeData = 
			{
				traineecontactbusiness: '',
				traineecontactperson: '',
				status: '1',
				course: $('#ns1blankspaceDetailsMembershipUpdate').attr('data-course'),
				attendingtrainee: $('#ns1blankspaceDetailsFirstNameUpdate').val() + ' ' + $('#ns1blankspaceDetailsSurnameUpdate').val(),
				firstname: $('#ns1blankspaceDetailsFirstNameUpdate').val(),
				surname: $('#ns1blankspaceDetailsSurnameUpdate').val()
			}
			if (ns1blankspace.objectName == 'newelearning')
			{
				oTrainingCourseAttendeeData.course = '';
				oTrainingCourseAttendeeData.crop = sCrops;
				oTrainingCourseAttendeeData.harvestmonth = nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate'});
				if (oPersonData && oPersonData.mobile) {oTrainingCourseAttendeeData.mobile = oPersonData.mobile}
				if (oPersonData && oPersonData.workphone) {oTrainingCourseAttendeeData.phone = oPersonData.workphone}
				if (oPersonData && oPersonData.email) {oTrainingCourseAttendeeData.email = oPersonData.email}
			}

			oParam.detailsTab = true;
			oParam.businessData = oBusinessData;
			oParam.personData = oPersonData;
			oParam.agriBusinessData = oAgriBusinessData;
			oParam.businessGroupsData = aBusinessGroupsData;
			oParam.personGroupsData = aPersonGroupsData;
			oParam.subscriptionsData = aSubscriptionsData;
			oParam.subscriptionCategoryData = aSubscriptionCategoryData;
			oParam.subscriptionScopeData = aSubscriptionScopeData;
			oParam.subscriptionStatusChangeData = oSubscriptionStatusChangeData;
			oParam.relationshipsData = aRelationshipsData;
			oParam.trainingCourseAttendeeData = oTrainingCourseAttendeeData;
			oParam.personMembershipData = oPersonMembershipData;
			if (ns1blankspace.objectName == 'newelearning')
			{
				oParam.trainingCourseData = oTrainingCourseData;
				oParam.attendeeScopeData = aAttendeeScopeData;
				oParam.attendeeCategoryData = aAttendeeCategoryData;
			}

			//nsFreshcare.admin.newgrower.data.objectContextData = ns1blankspace.objectContextData;
			ns1blankspace.objectContextData = undefined;

			fFunctionSave(oParam);
		},

		address: function(oParam)
		{	// v3.4.001 SUP022964 Forked so that can choose which fields to update if matchingData
			oParam = oParam || {};
			oParam.configure = oParam.configure || {createMember: true};
			var fFunctionSave = ns1blankspace.util.getParam(oParam, 'functionSave', {"default": nsFreshcare.admin.grower.save.send}).value;	
			var oBusinessData = ns1blankspace.util.getParam(oParam, 'businessData', {"default": {}}).value;
			var oPersonData	= ns1blankspace.util.getParam(oParam, 'personData', {"default": {}}).value;
			var aAddressLocationsData = ns1blankspace.util.getParam(oParam, 'addressLocationsData', {"default": []}).value;
			var aSubscriptionSitesLinkData = ns1blankspace.util.getParam(oParam, 'subscriptionSitesLinkData', {"default": []}).value;
			var bUpdate = $('#ns1blankspaceAddressMailingAddress1Update').is('*');
			var bBusiness = (oParam.configure.personOnly != true);

			// v3.4.001 SUP022964 Don't update business if we're only creating a person
			if (bBusiness)
			{
				if (oParam.configure.createMember || oParam.configure.createBusiness)
				{
					oBusinessData = $.extend(true, oBusinessData, 
					{
						mailingaddress1: $('#ns1blankspaceAddressMailingAddress1' + ((bUpdate) ? 'Update' : '')).val(),
						mailingaddress2: $('#ns1blankspaceAddressMailingAddress2' + ((bUpdate) ? 'Update' : '')).val(),
						mailingstate: $('#ns1blankspaceAddressMailingState' + ((bUpdate) ? 'Update' : '')).val(),
						mailingsuburb:  $('#ns1blankspaceAddressMailingSuburb' + ((bUpdate) ? 'Update' : '')).val(),
						mailingpostcode: $('#ns1blankspaceAddressMailingPostCode' + ((bUpdate) ? 'Update' : '')).val(),
						mailingcountry: $('#ns1blankspaceAddressMailingCountry' + ((bUpdate) ? 'Update' : '')).val()
					});
				}
				else if (oParam.configure.updateBusiness)
				{
					var eLearningBusinessData = {};
					$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness, function(index, vals) 
					{	
						//var sPrefix = (vals.indexOf('street') == 0 || vals.indexOf('mailing') == 0) ? 'business' : '';
						if (vals.substr(0,7) == 'mailing')
						{
							eLearningBusinessData[vals] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.' + vals];
						}
					});
					if (ns1blankspace.objectContext != -1) {eLearningBusinessData['id'] = ns1blankspace.objectContext}
					oBusinessData = $.extend(true, oBusinessData, eLearningBusinessData);
				}
			}
			else 
			{
				// v3.4.001 SUP022964 We have to set this data on the person if there's no business
				if (oParam.configure.createPerson)
				{
					oPersonData = $.extend(true, oPersonData, 
					{
						mailingaddress1: $('#ns1blankspaceAddressMailingAddress1' + ((bUpdate) ? 'Update' : '')).val(),
						mailingaddress2: $('#ns1blankspaceAddressMailingAddress2' + ((bUpdate) ? 'Update' : '')).val(),
						mailingstate: $('#ns1blankspaceAddressMailingState' + ((bUpdate) ? 'Update' : '')).val(),
						mailingsuburb:  $('#ns1blankspaceAddressMailingSuburb' + ((bUpdate) ? 'Update' : '')).val(),
						mailingpostcode: $('#ns1blankspaceAddressMailingPostCode' + ((bUpdate) ? 'Update' : '')).val(),
						mailingcountry: $('#ns1blankspaceAddressMailingCountry' + ((bUpdate) ? 'Update' : '')).val()
					}); 
				}
			}

			// Address tab either has sites or just the street & mailing address
			if ($('.ns1blankspaceRowAddress').length > 0 && bBusiness)		// sites
			{
				// New Business (non-eLearning): The first row becomes the default address and is saved against the business
				if (oParam.configure.createMember || oParam.configure.createBusiness)
				{
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
								id: undefined, 		// iRowID
								status: $(t).attr('data-status'),
								remove:  ($('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).css('text-decoration').indexOf('line-through') > -1),
								//"address.addresslink.id": $('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).attr('data-linkid'),
								"address.addresslink.object": nsFreshcare.objectBusiness,
								"address.addresslink.objectcontext": (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : '',
								"address.addresslink.remove":  ($('#ns1blankspaceSiteValue_streetAddress1-' + iRowID).css('text-decoration').indexOf('line-through') > -1)
							});
						}
					});
				}
				
				// Existing Member business - work out what needs to be added from nsFreshcare.admin.newgrower.data.objectContextData
				else if (oParam.configure.isMember && nsFreshcare.admin.newelearning.data.matchingData.contactBusiness
					&& $.grep(nsFreshcare.admin.newgrower.data.objectContextData.sites, function(x) {return x.matchingAddress != undefined}).length > 0)
				{
					// Member exists so already has a primary address - all addresses must be set to secondary
					$.each(nsFreshcare.admin.newgrower.data.objectContextData.sites, function(i, site)
					{
						if (site.matchingAddress == '')		// New address - add to business
						{
							aAddressLocationsData.push(
							{
								address1: site.address1,
								address2: site.address2,
								addresssuburb: site.addresssuburb,
								addressstate: site.addressstate,
								addresspostcode: site.addresspostcode,
								addresscountry: site.addresscountry,
								type: '1',
								status: '2',
								"address.addresslink.object": nsFreshcare.objectBusiness,
								"address.addresslink.objectcontext": ''
							});
						}
						else
						{
							var oUpdateSite = $.grep(nsFreshcare.admin.newelearning.data.matchingData.updateSites, function(x) {return x.id == site.id}).shift();
							if (site.matchingAddressReactivate)
							{
								aAddressLocationsData.push(
								{
									id: site.id,
									status: '2'
								});
							}
							else
							{
								if (oUpdateSite)
								{
									aAddressLocationsData.push(
									{
										id: oUpdateSite.matchingAddress,
										address1: oUpdateSite.address1,
										address2: oUpdateSite.address2,
										addresssuburb: oUpdateSite.addresssuburb,
										addressstate: oUpdateSite.addressstate,
										addresspostcode: oUpdateSite.addresspostcode,
										addresscountry: oUpdateSite.addresscountry,
										status: (oUpdateSite.status == '3' ? '2' : oUpdateSite.status)
									});
								}

								// We only create subsription links if the subscription doesn't exist
								if (oParam.configure.subscriptionId = undefined)
								{
									aSubscriptionSitesLinkData.push(
									{
										address: site.matchingAddress,
										object: nsFreshcare.objectSubscription,
										objectcontext: ''
									});
								}
							}
						}
					});
				}
			}
			else 	// just street & mailing. Street Address to be also added (as this only occurs on new record) to Locations as status 1
			{		// ToDo - What if we're updating? How do we update the site addresses?
				if (bBusiness)
				{
					if (oParam.configure.createMember || oParam.configure.createBusiness)
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
					else if (oParam.configure.updateBusiness)
					{
						var eLearningBusinessData = {};
						$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness, function(index, vals) 
						{	
							//var sPrefix = (vals.indexOf('street') == 0 || vals.indexOf('mailing') == 0) ? 'business' : '';
							if (vals.substr(0,6) == 'street')
							{
								eLearningBusinessData[vals] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.' + vals];
							}
						});
						if (ns1blankspace.objectContext != -1) {eLearningBusinessData['id'] = ns1blankspace.objectContext}
						oBusinessData = $.extend(true, oBusinessData, eLearningBusinessData);
					}
				}
				else
				{
					// v3.1.206 SUP023035 No longer updates person address */
					// v3.4.001 SUP022964 Only updates person if we have no business
					oPersonData = $.extend(true, oPersonData, 
					{
						streetaddress1: $('#ns1blankspaceAddressStreetAddress1').val(),
						streetaddress2: $('#ns1blankspaceAddressStreetAddress2').val(),
						streetstate: $('#ns1blankspaceAddressStreetState').val(),
						streetsuburb:  $('#ns1blankspaceAddressStreetSuburb').val(),
						streetpostcode: $('#ns1blankspaceAddressStreetPostCode').val(),
						streetcountry: $('#ns1blankspaceAddressStreetCountry').val()
					});
				}
			}
			
			aAddressLocationsData = $.map(aAddressLocationsData, function(x) 
									{
										if (x.remove == false || x.remove == undefined) {delete(x.remove);} 
										if (x["address.addresslink.remove"] == false || x["address.addresslink.remove"] == undefined) {delete(x["address.addresslink.remove"]);} 
										return x;
									});

			// v3.1.0 If user doesn't click Details tab, BusinessData.id & PersonData.id isn't populated
			if (oBusinessData.id === undefined && bBusiness)
			{
				oBusinessData.id = (ns1blankspace.objectContext != -1) ? ns1blankspace.objectContext : undefined;
			}
			if (oPersonData.id === undefined)
			{
				if (!(oParam.configure.createMember || oParam.configure.createPerson)
					&& nsFreshcare.admin.newelearning.data.matchingData.contactPerson)
				{
					oPersonData.id = nsFreshcare.admin.newelearning.data.matchingData.contactPerson;
				}
			}
			oParam.addressTab = true;
			oParam.businessData = oBusinessData;
			oParam.personData = oPersonData;
			oParam.addressLocationsData = aAddressLocationsData;
			oParam.subscriptionSitesLinkData = aSubscriptionSitesLinkData;
			
			fFunctionSave(oParam);
		},

		extendedTasks: function(oParam)
		{
			// We need to add relationship to the CB and parent business if applicable
			// Plus add trainee record to the TrainingCourse
			// v3.3.001 SUP023422 Now adds attendance link
			// v3.4.001 Need to back-update TmpTrainee record if eLearning

			var oData = {};

			if (oParam.extendedTasksStep == undefined) {oParam.extendedTasksStep = 1}

			if (oParam.extendedTasksStep === 1)
			{
				if (oParam.addRelationshipIndex === undefined) {oParam.addRelationshipIndex = 0}

				if (oParam.relationshipsData && oParam.addRelationshipIndex < oParam.relationshipsData.length)
				{
					oData.contactbusiness = oParam.relationshipsData[oParam.addRelationshipIndex].contactbusiness;
					oData.othercontactbusiness = oParam.relationshipsData[oParam.addRelationshipIndex].othercontactbusiness;
					oData.type = oParam.relationshipsData[oParam.addRelationshipIndex].type;
					oData.startdate = oParam.relationshipsData[oParam.addRelationshipIndex].startdate;

					if (oData.contactbusiness === '' || oData.contactbusiness == undefined) { oData.contactbusiness = ns1blankspace.objectContext}
					if (oData.othercontactbusiness === '' || oData.othercontactbusiness == undefined) { oData.othercontactbusiness = ns1blankspace.objectContext}

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('CONTACT_RELATIONSHIP_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('relationship added');
								oParam.addRelationshipIndex += 1;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding relationship: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.addRelationshipIndex);
					oParam.extendedTasksStep = 2;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Add Training Course if trainingCourseData defined
			else if (oParam.extendedTasksStep === 2)
			{
				if (oParam.trainingCourseData && Object.keys(oParam.trainingCourseData).length > 0)
				{
					var oData = oParam.trainingCourseData;

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('course ' + oResponse.notes.toLowerCase());
								oParam.extendedTasksStep = 3;
								oParam.course = oResponse.id;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding Training course: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					oParam.extendedTasksStep = 3;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Add Person ID and Business ID to TmpTrainee
			else if (oParam.extendedTasksStep === 3)
			{
				if (oParam.trainingCourseData && Object.keys(oParam.trainingCourseData).length > 0)
				{
					var oData = {};

					// v3.4.001 SUP023841 Now passes subscription id
					oData.id = nsFreshcare.admin.newgrower.data.objectContext;
					oData.course = oParam.course;
					oData.sepersonid = (oParam.contactperson) ? oParam.contactperson.id : '';
					oData.sebusinessid = (oParam.contactbusiness && oParam.contactbusiness.id && oParam.contactbusiness.id != -1) ? oParam.contactbusiness.id : '';
					oData.sesubscriptionid = (oParam.agrisubscription) ? oParam.agrisubscription.id : '';

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('tmptrainee ' + oResponse.notes.toLowerCase());
								oParam.extendedTasksStep = 4;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error updating the course on tmptrainee: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					oParam.extendedTasksStep = 4;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Create trainee attendance record if required
			else if (oParam.extendedTasksStep === 4)
			{
				if (oParam.trainingCourseAttendeeData)
				{
					var oData = oParam.trainingCourseAttendeeData;
					
					oData.traineecontactbusiness = (oParam.contactbusiness && oParam.contactbusiness.id && oParam.contactbusiness.id != -1) ? oParam.contactbusiness.id : '';
					oData.traineecontactperson = (oParam.contactperson) ? oParam.contactperson.id : '';
					oData.setemptraineeid = nsFreshcare.admin.newgrower.data.objectContext;

					if (ns1blankspace.objectName == 'newelearning')
					{
						oData.course = oParam.course;
					}
					
					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('attendee ' + oResponse.notes.toLowerCase());
								oParam.extendedTasksStep = 5;
								oParam.attendee = oResponse.id;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding Trainee to training course: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					oParam.extendedTasksStep = 5;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Create attendance link
			else if (oParam.extendedTasksStep === 5)
			{
				var oData = {};
				
				oData.attendee = oParam.attendee;
				oData.contactbusiness = (oParam.contactbusiness && oParam.contactbusiness.id && oParam.contactbusiness.id != -1) ? oParam.contactbusiness.id : '';
				oData.contactperson = (oParam.contactperson) ? oParam.contactperson.id : '';
				oData.subscription = (oParam.agrisubscription) ? oParam.agrisubscription.id : '';

				$.ajax(
				{
					type: 'POST',
					url: ns1blankspace.util.endpointURI('AGRI_TRAINEE_ATTENDANCE_LINK_MANAGE'),
					data: oData,
					success: function(oResponse)
					{
						if (oResponse.status === 'OK')
						{
							ns1blankspace.status.message('attendance link ' + oResponse.notes.toLowerCase());
							oParam.extendedTasksStep = 6;
							nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error adding Trainee Attendance link: ' + oResponse.error.errornotes);
						}
					}
				});
			}

			// Create Scope records on Attendee record
			else if (oParam.extendedTasksStep === 6)
			{
				if (oParam.addScopeIndex === undefined) {oParam.addScopeIndex = 0}

				if (oParam.attendeeScopeData && oParam.addScopeIndex < oParam.attendeeScopeData.length)
				{
					var oData = oParam.attendeeScopeData[oParam.addScopeIndex];
					oData.objectcontext = oParam.attendee;

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_OBJECT_SCOPE_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('attendee scope added');
								oParam.addScopeIndex += 1;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding attendee scope: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.addScopeIndex);
					oParam.extendedTasksStep = 7;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Create Category records on Attendee record
			else if (oParam.extendedTasksStep === 7)
			{
				if (oParam.addCategoryIndex === undefined) {oParam.addCategoryIndex = 0}

				if (oParam.attendeeCategoryData && oParam.addCategoryIndex < oParam.attendeeCategoryData.length)
				{
					var oData = oParam.attendeeCategoryData[oParam.addCategoryIndex];
					oData.coursetrainee = oParam.attendee;

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_PRODUCT_CATEGORY_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status === 'OK')
							{
								ns1blankspace.status.message('attendee category added');
								oParam.addCategoryIndex += 1;
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding attendee category: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					delete(oParam.addCategoryIndex);
					oParam.extendedTasksStep = 8;
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Create TrainerMembership records if applicable
			else if (oParam.extendedTasksStep == 8)
			{
				oParam.extendedTasksStep = 10;
				if (oParam.personMembershipData && Object.keys(oParam.personMembershipData).length > 0)
				{
					var oData = oParam.personMembershipData;
					oData.contactbusiness = oData.contactbusiness || (oParam.contactbusiness ? oParam.contactbusiness.id : '');
					oData.contactperson = oData.contactperson || (oParam.contactperson ? oParam.contactperson.id : '');

					$.ajax(
					{
						type: 'POST',
						url: ns1blankspace.util.endpointURI('AGRI_MEMBERSHIP_TRAINER_MANAGE'),
						data: oData,
						success: function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								delete(oParam.personMembershipData);
								nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error adding Standard: ' + oResponse.error.errornotes);
							}
						}
					});
				}
				else
				{
					nsFreshcare.admin.newgrower.createNewGrower.extendedTasks(oParam);
				}
			}

			// Finish up and call back
			else if (oParam.extendedTasksStep === 10)
			{
				delete(oParam.extendedTasksStep);
				oParam.growerChanged = true;

				if (oParam.onComplete)
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	updateTempTraineeStatus: function(oParam) 
	{
		// Update status of TempTrainee record to 2 so that it no longer shows in the list
		var oRoot = ns1blankspace.rootnamespace;
		var bHasBusiness = (oParam.id != undefined);
		oParam.updateTempTraineeStep = oParam.updateTempTraineeStep || 1;
		
		if (oParam.updateTempTraineeStep == 1)
		{
			var oData = 
			{
				sestatus: '2',
				id: nsFreshcare.admin.newgrower.data.objectContext
			};

			$.ajax(
			{
				type: 'POST',
				url: ns1blankspace.util.endpointURI('AGRI_TEMP_TRAINEE_MANAGE'),
				data: oData,
				success: function(oResponse)
				{
					
					if (oResponse.status === 'OK')
					{
						oParam.updateTempTraineeStep = 2;
						ns1blankspace.status.message('temptrainee status saved');
						nsFreshcare.admin.newgrower.updateTempTraineeStatus(oParam);
					}
					else
					{
						ns1blankspace.status.error('Error updating the status on temp trainee: ' + oResponse.error.errornotes);
					}
				}
			});
		}

		else if (oParam.updateTempTraineeStep == 2)
		{
			if (bHasBusiness)
			{
				if (oParam.isMember || ns1blankspace.objectName == 'newgrower') 	// Member was created
				{
					oRoot.admin.grower.init(oParam);
				}
				else if ($('[name="radioTraineeType"]:checked').val() == '2')
				{
					nsFreshcare.admin.certificationbody.init(oParam);
				}
				else if ($('[name="radioTraineeType"]:checked').val() == '3')
				{
					nsFreshcare.admin.trainer.init(oParam);
				}
				else 	// Non-Member business was created
				{
					ns1blankspace.contactBusiness.init(oParam);
				}
			}
			else 	//There were only updates or it's a person record
			{
				if (oParam.personID)
				{
					ns1blankspace.contactPerson.init({id: oParam.personID});
				}
				else
				{
					ns1blankspace.status.error('Unable to determine what type of record was created. Please search manually.');
				}
			}
		}
	}	
}