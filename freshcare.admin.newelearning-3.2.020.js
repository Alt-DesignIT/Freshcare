/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.admin.newelearning = 
{
	data: {},

	init: function (oParam) 
	{ 
		ns1blankspace.app.reset();

		ns1blankspace.object = 21;	
		ns1blankspace.objectName = 'newelearning';
		ns1blankspace.objectMethod = 'AGRI_TEMP_TRAINEE';
		ns1blankspace.objectParentName = 'admin';
		ns1blankspace.objectContextData = undefined;
		ns1blankspace.objectContext = -1;
		ns1blankspace.viewName = 'New eLearning';
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

	home: 		function(oParam)
	{
		nsFreshcare.admin.newgrower.home(oParam);
	},

	findDuplicates: 
	{
		show: 	function()
		{
			var sTitle = 'Search for a Match';
			var aHTML = [];

			aHTML.push('<table class="ns1blankspace" style="width:25%;float:left;">');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Trading Name</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['tradename'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Legal Name</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['businessname'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Location</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['suburb'] + ' ' + ns1blankspace.objectContextData['state'] +
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Certification #</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['secertificatenumber'] + 
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">First Name</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['firstname'] + 
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Surname</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['surname'] + 
						'</td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">Mobile</td></tr>' +
						'<tr><td class="ns1blankspaceSummary">' +
						ns1blankspace.objectContextData['mobile'] + 
						'</td></tr>');

			aHTML.push('<tr class="messageDisplay" style="display:none;"><td class="ns1blankspaceRow"></td></tr>');

			aHTML.push('<tr class="messageDisplay" style="display:none;"><td class="errorDisplay" style="color:red;font-size:0.825em;"></td></tr>' +
						'<tr class="messageDisplay" style="display:none;"><td class="ns1blankspaceSummary"><span id="ns1blankspaceButtonYes">Yes</span>' +
						'<span id="ns1blankspaceButtonNo">No</span></td></tr>');

			aHTML.push('</table>');


			aHTML.push('<table class="ns1blankspace" style="width:75%">' +
							'<tr><td class="ns1blankspace">');

			aHTML.push('<table class="ns1blankspace" style="border: 1px solid #d4d4d4;">'); 

			aHTML.push('<tr>' +
						'<td class="ns1blankspaceCaption">Business Name</td>' +
						'<td class="ns1blankspaceCaption">First Name</td>' +
						'<td class="ns1blankspaceCaption">Surname</td>' +
						'<td class="ns1blankspaceCaption">Certification #</td>' +
						'<td>&nbsp;</td>' +
						'</tr>');

			aHTML.push('<tr>' +
						'<td class="ns1blankspaceText"><input class="ns1blankspaceText" id="ns1blankspaceSearchBusiness"></td>' +
						'<td class="ns1blankspaceText"><input class="ns1blankspaceText" id="ns1blankspaceSearchFirstName"></td>' +
						'<td class="ns1blankspaceText"><input class="ns1blankspaceText" id="ns1blankspaceSearchSurname"></td>' +
						'<td class="ns1blankspaceText"><input class="ns1blankspaceText" id="ns1blankspaceSearchCertificate"></td>' +
						'<td class="ns1blankspaceAction"><span id="ns1blankspaceSearchGo"></span>' +
						'</tr>');

			aHTML.push('</table></td></tr><tr><td style="height: 200px; border: 1px solid #d4d4d4;">');

			aHTML.push('<div style="height:200px; overflow:scroll;"><table class="ns1blankspace" id="ns1blankspaceSearchBusinessResults"' +
							' style="max-height: 200px; overflow-y:auto;"></div>'); 

			aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">Matching Businesses</td></tr>');

			aHTML.push('<tr>' +
						'<td class="ns1blankspaceHeaderCaption">Legal Name</td>' +
						'<td class="ns1blankspaceHeaderCaption">Trading Name</td>' +
						'<td class="ns1blankspaceHeaderCaption">Location</td>' +
						'<td class="ns1blankspaceHeaderCaption">Certification #</td>' +
						'</tr>');

			aHTML.push('</table></td></tr><tr><td style="height: 200px; border: 1px solid #d4d4d4;">');

			aHTML.push('<div style="height:200px; overflow:scroll;"><table class="ns1blankspace" id="ns1blankspaceSearchPersonResults"' +
							' style="max-height: 200px; overflow-y:auto;"></div>'); 

			aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">Matching People</td></tr>');

			aHTML.push('<tr>' +
						'<td class="ns1blankspaceHeaderCaption">First Name</td>' +
						'<td class="ns1blankspaceHeaderCaption">Surname</td>' +
						'<td class="ns1blankspaceHeaderCaption">Business</td>' +
						'<td class="ns1blankspaceHeaderCaption">Mobile</td>' +
						'</tr>');

			aHTML.push('</table></td></tr></table>');

			$('#ns1blankspaceMultiUseDialog')
				.html('<span style="font-size: 0.75em">' + aHTML.join('') + '</span>')
				.css('position', 'static')
				.dialog(
				{
					resizable: false,
					modal: true,
					title: sTitle,
					width: 850,
					height: 600,
					open: function(event, ui) 
					{ 
						$('.ui-dialog-titlebar-close').hide();
						$('.ui-dialog-buttonset').children().css('font-size', '0.625em');
						$('.ui-dialog-buttonset').css('text-align', 'center')
						$('.ui-dialog-title').css('font-size', '0.75em');
					},
					focus: function(event, ui)
					{
					},
					buttons: [{text: 'OK', click: function()
					{
						if($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length == 0 && $('.ns1blankspacePersonSearch .nsFreshcareSelected').length == 0)
					 	{
					 		nsFreshcare.admin.newelearning.data.matchingData = {};
					 		$(this).dialog('destroy');
					 	}
					 	else
					 	{
					 		nsFreshcare.admin.newelearning.findDuplicates.dialog();
					 	}	

					}}]
				});

				$('#ns1blankspaceSearchGo')
				.button({icons: {primary: 'ui-icon-search'}})
				.css('height', '20px')
				.css('width', '20px')
				.on('click', function(){

					var SearchBusiness=$('#ns1blankspaceSearchBusiness').val();
					var SearchCertificate=$('#ns1blankspaceSearchCertificate').val();
					var SearchFirstName=$('#ns1blankspaceSearchFirstName').val();
					var SearchSurname=$('#ns1blankspaceSearchSurname').val();
					if(SearchBusiness != '' || SearchCertificate != '')
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_BUSINESS_SEARCH';
						oSearch.addField('legalname,tradename,streetsuburb,streetpostcode,contactbusiness.agrisubscription.id,contactbusiness.agrisubscription.agricertificate.certificatenumber,abn' +
										',mailingaddress1,mailingsuburb,mailingstate,mailingpostcode,mailingcountry,streetaddress1,streetsuburb,streetstate,streetpostcode,streetcountry');
						oSearch.addBracket("(");
						if(SearchBusiness != '')
						{
							oSearch.addFilter('legalname', 'TEXT_IS_LIKE', SearchBusiness);
							oSearch.addOperator("or");
							oSearch.addFilter('tradename', 'TEXT_IS_LIKE', SearchBusiness);	
							oSearch.sort('legalname', 'asc');
						}
						if(SearchBusiness != '' && SearchCertificate != '')
						{
							oSearch.addOperator("or");
						}
						if(SearchCertificate != '')
						{
							oSearch.addFilter('contactbusiness.agrisubscription.agricertificate.certificatenumber', 'TEXT_IS_LIKE', SearchCertificate);
							
						}
						oSearch.addBracket(')');
						oSearch.sort('id', 'asc');
						oSearch.rows = 100;
						oSearch.getResults(function(oResponse) {
							if (oResponse.status === 'OK')
							{

								var aHTML = [];

								aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">Matching Businesses</td></tr>');

								aHTML.push('<tr>' +
											'<td class="ns1blankspaceHeaderCaption">Legal Name</td>' +
											'<td class="ns1blankspaceHeaderCaption">Trading Name</td>' +
											'<td class="ns1blankspaceHeaderCaption">Location</td>' +
											'<td class="ns1blankspaceHeaderCaption">Certification #</td>' +
											'</tr>');
				
								$.each(oResponse.data.rows, function()
								{
									
									aHTML.push('<tr class="ns1blankspaceRow ns1blankspaceBusinessSearch" data-legalname="' + this.legalname + '" data-tradename="' + this.tradename + '"' +
												'data-abn="' + this.abn + '" data-businessmailingaddress1="' + this.mailingaddress1 + '" data-businessmailingsuburb="' + this.mailingsuburb + '"' +
												'data-businessmailingstate="' + this.mailingstate + '" data-businessmailingpostcode="' + this.mailingpostcode + '" data-businessmailingcountry="' + this.mailingcountry + '"' +
												'data-businessstreetaddress1="' + this.streetaddress1 + '" data-businessstreetsuburb="' + this.streetsuburb + '" data-businessstreetstate="' + this.streetstate + '"' +
												'data-businessstreetpostcode="' + this.streetpostcode + '" data-businessstreetcountry="' + this.streetcountry + '"' +
												'data-tradename="' + this.tradename + '" data-contactbusinessid="' + this.id + '" data-agrisubscriptionid="' + this["contactbusiness.agrisubscription.id"] + '" >');
									
									aHTML.push('<td id="ns1blankspaceBusinessResults_legalname-' + this.id + '"  class="ns1blankspaceBussinessSearchRow">' +
															this["legalname"] + '</td>' +
												'<td id="ns1blankspaceBusinessResults_tradename-' + this.id + '" class="ns1blankspaceBussinessSearchRow">' +
															this["tradename"] + '</td>' +
												'<td id="ns1blankspaceBusinessResults_streetsuburb-' + this.id + '" class="ns1blankspaceBussinessSearchRow">' +
															this["streetsuburb"] + '</td>' +
												'<td id="ns1blankspaceBusinessResults_certificatenumber' + this.id + '" class="ns1blankspaceBussinessSearchRow">' +
															this["contactbusiness.agrisubscription.agricertificate.certificatenumber"] + '</td>' +
												'</tr>');
								});
								$('#ns1blankspaceSearchBusinessResults').html(aHTML.join(''));
								$('.ns1blankspaceBusinessSearch')
									.css('cursor', 'pointer')
									.click(function(event)
									{

										if($(this).hasClass( "nsFreshcareSelected" ))
										{
											$(this).removeClass('nsFreshcareSelected');
											$(this).find('td').removeClass('nsFreshcareSelected');
										}
										else
										{
											if($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0)
											{
												$('.ns1blankspaceBusinessSearch').removeClass('nsFreshcareSelected');
												$('.ns1blankspaceBussinessSearchRow').removeClass('nsFreshcareSelected');
											}
											$(this).addClass('nsFreshcareSelected');
											$(this).find('td').addClass('nsFreshcareSelected');
										}


									});
							}

						});
					}
					else
					{
						var aHTML = [];

						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">Matching Businesses</td></tr>');

						aHTML.push('<tr>' +
									'<td class="ns1blankspaceHeaderCaption">Legal Name</td>' +
									'<td class="ns1blankspaceHeaderCaption">Trading Name</td>' +
									'<td class="ns1blankspaceHeaderCaption">Location</td>' +
									'<td class="ns1blankspaceHeaderCaption">Certification #</td>' +
									'</tr>');
						$('#ns1blankspaceSearchBusinessResults').html(aHTML.join(''));
					}
					if(SearchFirstName != '' || SearchSurname != '')
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'CONTACT_PERSON_SEARCH';
						oSearch.addField('firstname,surname,contactbusiness,contactbusinesstext,mobile,position,titletext,firstname,surname,mobile' +
										',workphone,fax,email,streetsuburb,streetstate,streetpostcode,streetcountry,mailingaddress1,mailingsuburb' +
										',mailingstate,mailingpostcode,mailingcountry,streetaddress1,contactbusiness');
						
						oSearch.addBracket("(");
						if(SearchFirstName != '')
						{
							oSearch.addFilter('firstname', 'TEXT_IS_LIKE', SearchFirstName);
							oSearch.sort('firstname', 'asc');
						}
						if(SearchFirstName != '' && SearchSurname != '')
						{
							oSearch.addOperator("or");
						}
						if(SearchSurname != '')
						{
							oSearch.addFilter('surname', 'TEXT_IS_LIKE', SearchSurname);
							oSearch.sort('surname', 'asc');
						}
						oSearch.addBracket(')');
						oSearch.sort('id', 'asc');
						oSearch.rows = 100;
						oSearch.getResults(function(oResponse) {

							if (oResponse.status === 'OK')
							{
								var aHTML = [];

								aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">Matching People</td></tr>');

								aHTML.push('<tr>' +
											'<td class="ns1blankspaceHeaderCaption">First Name</td>' +
											'<td class="ns1blankspaceHeaderCaption">Surname</td>' +
											'<td class="ns1blankspaceHeaderCaption">Business</td>' +
											'<td class="ns1blankspaceHeaderCaption">Mobile</td>' +
											'</tr>');

								$.each(oResponse.data.rows, function()
								{
									
									aHTML.push('<tr class="ns1blankspaceRow ns1blankspacePersonSearch" data-contactpersonid="' + this.id + '" ' +
												'data-position="' + this.position + '" data-titletext="' + this.titletext + '" data-firstname="' + this.firstname + '"' +
												'data-surname="' + this.surname + '" data-mobile="' + this.mobile + '"' +
												'data-personmailingaddress1="' + this.mailingaddress1 + '" data-personmailingsuburb="' + this.mailingsuburb + '"' +
												'data-personmailingstate="' + this.mailingstate + '" data-personmailingpostcode="' + this.mailingpostcode + '"' +
												'data-personmailingcountry="' + this.mailingcountry + '" data-personstreetaddress1="' + this.streetaddress1 + '"' +
												'data-workphone="' + this.workphone + '"' +
												'data-contactbusiness="' + this.contactbusiness + '"' +
												'data-fax="' + this.fax + '" data-email="' + this.email + '" data-personstreetsuburb="' + this.streetsuburb + '"' +
												'data-personstreetstate="' + this.streetstate + '" data-personstreetpostcode="' + this.streetpostcode + '"' +
												'data-personstreetcountry="' + this.streetcountry + '">');
									
									aHTML.push('<td id="ns1blankspacePersonResults_firstname-' + this.id + '" class="ns1blankspacePersonSearchRow">' +
															this["firstname"] + '</td>' +
												'<td id="ns1blankspacePersonResults_surname-' + this.id + '" class="ns1blankspacePersonSearchRow">' +
															this["surname"] + '</td>' +
												'<td id="ns1blankspacePersonResults_contactbusinesstext-' + this.id + '" class="ns1blankspacePersonSearchRow">' +
															this["contactbusinesstext"] + '</td>' +
												'<td id="ns1blankspacePersonResults_mobile' + this.id + '" class="ns1blankspacePersonSearchRow">' +
															this["mobile"] + '</td>' +
												'</tr>');
								});
								$('#ns1blankspaceSearchPersonResults').html(aHTML.join(''));
								$('.ns1blankspacePersonSearch')
									.css('cursor', 'pointer')
									.click(function(event)
									{
										if($(this).hasClass( "nsFreshcareSelected" ))
										{
											$(this).removeClass('nsFreshcareSelected');
											$(this).find('td').removeClass('nsFreshcareSelected');
										}
										else
										{
											if($('.ns1blankspacePersonSearch .nsFreshcareSelected').length > 0)
											{
												$('.ns1blankspacePersonSearch').removeClass('nsFreshcareSelected');
												$('.ns1blankspacePersonSearchRow').removeClass('nsFreshcareSelected');
											}
											$(this).addClass('nsFreshcareSelected');
											$(this).find('td').addClass('nsFreshcareSelected');
										}
										
									});
							}
							
						});

					}
					else
					{
						var aHTML = [];

						aHTML.push('<tr><td class="ns1blankspaceCaption" colspan="4">Matching People</td></tr>');

						aHTML.push('<tr>' +
									'<td class="ns1blankspaceHeaderCaption">First Name</td>' +
									'<td class="ns1blankspaceHeaderCaption">Surname</td>' +
									'<td class="ns1blankspaceHeaderCaption">Business</td>' +
									'<td class="ns1blankspaceHeaderCaption">Mobile</td>' +
									'</tr>');
						$('#ns1blankspaceSearchPersonResults').html(aHTML.join(''));

					}
				});

				$('#ns1blankspaceSearchBusiness').val(ns1blankspace.objectContextData.tradename);
				$('#ns1blankspaceSearchCertificate').val(ns1blankspace.objectContextData.secertificatenumber);
				$('#ns1blankspaceSearchFirstName').val(ns1blankspace.objectContextData.firstname);
				$('#ns1blankspaceSearchSurname').val(ns1blankspace.objectContextData.surname);

				$('#ns1blankspaceButtonYes')
				.button(
				{
					label: 'Yes'
				})
				.css('font-size', '0.825em')
				.on('click', function()
				{
					nsFreshcare.admin.newelearning.data.matchingData = {};
					nsFreshcare.admin.newelearning.data.matchingData.contactBusiness = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-contactbusinessid');
					nsFreshcare.admin.newelearning.findDuplicates.nextstep();
				});

				$('#ns1blankspaceButtonNo')
				.button(
				{
					label: 'No'
				})
				.css('font-size', '0.825em')
				.on('click', function()
				{
					nsFreshcare.admin.newelearning.data.matchingData = {};
					nsFreshcare.admin.newelearning.data.matchingData.contactBusiness = undefined;
					if($('.ns1blankspacePersonSearch .nsFreshcareSelected').length == 0 && nsFreshcare.admin.newelearning.data.matchingData.contactBusiness == undefined)
				 	{
				 		$('#ns1blankspaceMultiUseDialog').dialog('destroy');
				 	}
				 	else
				 	{
				 		nsFreshcare.admin.newelearning.findDuplicates.nextstep();
				 	}
				});
		},

		dialog: function()
		{

		 	if(ns1blankspace.objectContextData['seregisternewbusiness'] == 'N')
		 	{
		 		$('.messageDisplay').show();
		 		$('.errorDisplay').text('You have chosen an existing business but the Trainee indicated that they did not have a business to register with Freshcare. Are you sure you want to associate this Trainee with the selected business?');
		 	}
		 	else
		 	{	
		 		nsFreshcare.admin.newelearning.data.matchingData = {};
		 		if($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0)
		 		{
		 			nsFreshcare.admin.newelearning.data.matchingData.contactBusiness = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-contactbusinessid');	
		 		}	 	
			 	
			 	nsFreshcare.admin.newelearning.findDuplicates.nextstep();
			}
		},

		nextstep: function()
		{
			$('.messageDisplay').hide();

		 	var sTitle = 'Choose Data to Update';
			var aHTML = [];


			aHTML.push('<table class="ns1blankspace">');

			aHTML.push('<tr><td style="height: 200px; border: 1px solid #d4d4d4;">');

			aHTML.push('<div style="height:500px; overflow:scroll;"><table class="ns1blankspace" id="ns1blankspaceSearchBusinessResults"' +
							' style="max-height: 500px; overflow-y:auto;"></div>');

			aHTML.push('<tr>' +
							'<td class="ns1blankspaceHeaderCaption ns1blankspaceCaption"></td>' +
							'<td class="ns1blankspaceHeaderCaption">Existing Data</td>' +
							'<td class="ns1blankspaceHeaderCaption">New Data</td>' +
							'<td class="ns1blankspaceHeaderCaption">Select</td>' +
							'</tr>');

			if($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0)
		 	{
		 		if(nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
		 		{
			 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetcountry = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessstreetcountry');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetpostcode = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessstreetpostcode');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetstate = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessstreetstate');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetsuburb = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessstreetsuburb');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetaddress1 = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessstreetaddress1');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingcountry = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessmailingcountry');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingpostcode = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessmailingpostcode');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingstate = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessmailingstate');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingsuburb = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessmailingsuburb');
			 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingaddress1 = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-businessmailingaddress1');
			 		
			 		nsFreshcare.admin.newelearning.data.matchingData.abn = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-abn');
			 		nsFreshcare.admin.newelearning.data.matchingData.legalname = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-legalname');
			 		nsFreshcare.admin.newelearning.data.matchingData.tradename = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-tradename');
			 		nsFreshcare.admin.newelearning.data.matchingData.contactBusiness = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-contactbusinessid');
			 		nsFreshcare.admin.newelearning.data.matchingData.subscription = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-agrisubscriptionid');

					aHTML.push('<tr><td class="ns1blankspaceCaption ns1blankspaceCaption">Business Info</td><td>' +
								'</td><td></td><td></td></tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Trading Name</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.tradename + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['tradename'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="tradename"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Legal Name</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.legalname + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['businessname'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="businessname"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">ABN</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.abn + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['abn'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="abn"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Address</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessmailingaddress1 + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingaddress1'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="mailingaddress1"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Suburb</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessmailingsuburb + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingsuburb'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="mailingsuburb"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing State</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessmailingstate + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingstate'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="mailingstate"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Postcode</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessmailingpostcode + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingpostcode'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="mailingpostcode"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Country</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessmailingcountry + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingcountry'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="mailingcountry"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Address</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessstreetaddress1 + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['address1'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="streetaddress1"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Suburb</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessstreetsuburb + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['suburb'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="streetsuburb"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location State</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessstreetstate + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['state'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="streetstate"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Postcode</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessstreetpostcode + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['postcode'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="streetpostcode"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Country</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.businessstreetcountry + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['country'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineeBussinessUpdate" value="streetcountry"></td>' +
								'</tr>');
				}
			}


			if($('.ns1blankspacePersonSearch .nsFreshcareSelected').length > 0)
		 	{
		 		nsFreshcare.admin.newelearning.data.matchingData.personstreetcountry = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personstreetcountry');
		 		nsFreshcare.admin.newelearning.data.matchingData.personstreetpostcode = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personstreetpostcode');
		 		nsFreshcare.admin.newelearning.data.matchingData.personstreetstate = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personstreetstate');
		 		nsFreshcare.admin.newelearning.data.matchingData.personstreetsuburb = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personstreetsuburb');
		 		nsFreshcare.admin.newelearning.data.matchingData.email = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-email');
		 		nsFreshcare.admin.newelearning.data.matchingData.fax = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-fax');
		 		nsFreshcare.admin.newelearning.data.matchingData.mobile = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-mobile');
		 		nsFreshcare.admin.newelearning.data.matchingData.workphone = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-workphone');
		 		nsFreshcare.admin.newelearning.data.matchingData.surname = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-surname');
		 		nsFreshcare.admin.newelearning.data.matchingData.firstname = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-firstname');
		 		nsFreshcare.admin.newelearning.data.matchingData.titletext = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-titletext');
		 		nsFreshcare.admin.newelearning.data.matchingData.position = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-position');
		 		nsFreshcare.admin.newelearning.data.matchingData.contactPerson = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-contactpersonid');
		 		nsFreshcare.admin.newelearning.data.matchingData.personmailingaddress1 = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personmailingaddress1');
		 		nsFreshcare.admin.newelearning.data.matchingData.personmailingsuburb = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personmailingsuburb');
		 		nsFreshcare.admin.newelearning.data.matchingData.personmailingstate  = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personmailingstate');
		 		nsFreshcare.admin.newelearning.data.matchingData.personmailingpostcode  = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personmailingpostcode');
		 		nsFreshcare.admin.newelearning.data.matchingData.personmailingcountry  = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personmailingcountry');
		 		nsFreshcare.admin.newelearning.data.matchingData.personstreetaddress1  = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-personstreetaddress1');
		 		nsFreshcare.admin.newelearning.data.matchingData.personBusiness  = $('tr.ns1blankspacePersonSearch.nsFreshcareSelected').attr('data-contactbusiness');

				aHTML.push('<tr><td class="ns1blankspaceCaption ns1blankspaceCaption">Contact Info</td><td>' +
							'</td><td></td><td></td></tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Position</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.position + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['jobtitle'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="position"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Title</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.titletext + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['titletext'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="title"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">First Name</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.firstname + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['firstname'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="firstname"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Surname</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.surname + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['surname'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="surname"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Phone</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.workphone + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['phone'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="workphone"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Mobile</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.mobile + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mobile'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mobile"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Fax</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.fax + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['fax'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="fax"></td>' +
							'</tr>');

				aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Email</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.email + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['email'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="email"></td>' +
							'</tr>');

				if(ns1blankspace.objectContextData['seregisternewbusiness'] == 'N')
				{

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Address</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personmailingaddress1 + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingaddress1'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingaddress1"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Suburb</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personmailingsuburb + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingsuburb'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingsuburb"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing State</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personmailingstate + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingstate'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingstate"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Postcode</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personmailingpostcode + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingpostcode'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingpostcode"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Mailing Country</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personmailingcountry + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingcountry'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingcountry"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Address</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetaddress1 + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['address1'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="streetaddress1"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
							'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Suburb</td>' +
							'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetsuburb + '</td>' +
							'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingsuburb'] + '</td>' +
							'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingsuburb"></td>' +
							'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location State</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetstate + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingstate'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingstate"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Postcode</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetpostcode + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingpostcode'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingpostcode"></td>' +
								'</tr>');

					aHTML.push('<tr>' +
								'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Country</td>' +
								'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetcountry + '</td>' +
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['mailingcountry'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="mailingcountry"></td>' +
								'</tr>');
				}
				
			}

			aHTML.push('</table></td></tr>');

			aHTML.push('</table>');

			$('#ns1blankspaceMultiUseDialog')
				.html('<span style="font-size: 0.75em">' + aHTML.join('') + '</span>')
				.css('position', 'static')
				.dialog(
				{
					resizable: false,
					modal: true,
					title: sTitle,
					width: 700,
					height: 600,
					open: function(event, ui) 
					{ 
						$('.ui-dialog-titlebar-close').hide();
						$('.ui-dialog-buttonset').children().css('font-size', '0.625em');
						$('.ui-dialog-buttonset').css('text-align', 'center')
						$('.ui-dialog-title').css('font-size', '0.75em');
					},
					focus: function(event, ui)
					{
					},
					buttons: [{text: 'OK', click: function()
					{

						nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness = [];
						nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson = [];
						if($('input[type="checkbox"]:checked').length != 0)
						{
						
						 	$('.ns1blankspaceAgriTempTraineeBussinessUpdate:checked').each(function() {
							   
							   nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.push(this.value);
							});
							$('.ns1blankspaceAgriTempTraineePersonUpdate:checked').each(function() {
							   nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson.push(this.value);
				
							});
						}
						
					 	$(this).dialog('destroy');

					}}]
				});
		}
	},


	search:
	{
		send: function(sXHTMLElementId, oParam)
		{
			nsFreshcare.admin.newgrower.search.send(sXHTMLElementId,oParam);
		}
	},
	processTrainee:
	{
		data: {},

		configure: function(oParam)
		{

			oParam = oParam || {};
			if (oParam.configureTraineeStep == undefined) {oParam.configureTraineeStep = 0; oParam.configure = {}}

			// Store the value of package id and package title 
			if (oParam.configureTraineeStep === 0)
			{
				var dToday = new Date();
			    var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH';
				oSearch.addField('AgriTrainingPackage.id,AgriTrainingPackage.title');
				oSearch.addFilter('availablefrom', 'LESS_THAN_OR_EQUAL_TO', dToday);
				oSearch.addFilter('availableto', 'GREATER_THAN_OR_EQUAL_TO', dToday);
				oSearch.addFilter('codeofpractice', 'EQUAL_TO', ns1blankspace.objectContextData.codeofpractice);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						if (oResponse.data.rows.length > 0)
						{
							oParam.configure.packageID = oResponse.data.rows[0]['agritrainingpackage.id'];
							oParam.configure.packageTitle = oResponse.data.rows[0]['agritrainingpackage.title'];
							oParam.configureTraineeStep += 1;
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
						}
						else
						{
							oParam.configureTraineeStep += 1;
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
							//ns1blankspace.status.error('There is no current Training Package for ' + ns1blankspace.objectContextData["membershiptext"] + ' ' + ns1blankspace.objectContextData["codeofpracticetext"]);
						}
					}
					else
					{
						ns1blankspace.status.error('Unable to find existing Training Package:' + oResponse.error.errornotes);
					}

				});
			}
			// if the trainee is a member or not
			else if (oParam.configureTraineeStep === 1)
			{
				if(ns1blankspace.objectContextData["seindustryrole"].toUpperCase().indexOf("GROWER") > -1 || ns1blankspace.objectContextData["seindustryrole"].toUpperCase().indexOf("PACKER") )
				{
					oParam.configure.isMember = true;
				    oParam.configureTraineeStep = 2;
				}
				else
				{
					oParam.configure.isMember = false;
					oParam.configureTraineeStep = 8;
				}
				nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			}
			// if member exists
			else if(oParam.configureTraineeStep === 2)
			{
				if(nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
				{
					console.log('Member exists');
					oParam.configure.createBusiness = false;
					if(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.length > 0)
					{
						console.log('The ContactBusiness must be updated');
						oParam.configure.updateBusiness = true;
					}
					oParam.configureTraineeStep = 3;
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
				else
				{
					oParam.configure.createBusiness = true;
					console.log('A new Member must be created including all corresonding sub-tables');
					oParam.configureTraineeStep = 6;
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}
			else if(oParam.configureTraineeStep === 3)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_BUSINESS_GROUP_LINK_SEARCH';
				oSearch.addField('group');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactBusiness);
				oSearch.addFilter('group', 'EQUAL_TO', nsFreshcare.data.businessGroupGrowerID);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.configure.createBusinessgroup = (oResponse.data.rows.length == 0);
						oParam.configureTraineeStep = 4;
						nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find existing Business Groups:' + oResponse.error.errornotes);
					}
				});
			}
			else if(oParam.configureTraineeStep === 4)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CONTACT_RELATIONSHIP_SEARCH';
				oSearch.addField('othercontactbusiness');
				oSearch.addFilter('othercontactbusiness', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactBusiness);
				oSearch.addFilter('type', 'EQUAL_TO', nsFreshcare.data.relationshipTrainer);
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', nsFreshcare.data.eLearningBusiness);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.configure.createRelationship = (oResponse.data.rows.length == 0);
						oParam.configureTraineeStep = 5;
						nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find existing Relationship:' + oResponse.error.errornotes);
					}
				});
			}
			else if(oParam.configureTraineeStep === 5)
			{
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('contactbusiness');
				oSearch.addFilter('contactbusiness', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactBusiness);
				oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.objectContextData["membership"]);
				oSearch.getResults(function(oResponse)
				{
					if (oResponse.status == 'OK')
					{
						oParam.configure.createSubscription = (oResponse.data.rows.length == 0);
						if(oResponse.data.rows.length > 0)
						{
							oParam.configure.subscriptionId = oResponse.data.rows[0].id;	
						}
						oParam.configureTraineeStep = 6;
						nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
					}
					else
					{
						ns1blankspace.status.error('Unable to find existing Subscriptions:' + oResponse.error.errornotes);
					}
				});
			}
			// if Person exists
			else if(oParam.configureTraineeStep === 6)
			{
				if(nsFreshcare.admin.newelearning.data.matchingData.contactPerson != undefined)
				{
					console.log('Person exists');
					oParam.configure.isPerson = true;
					if(nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson.length > 0)
					{
						oParam.configure.updatePerson = true;
						oParam.configure.createPerson = false;
						console.log('The ContactPerson must be updated');
					}
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_GROUP_LINK_SEARCH';
					oSearch.addField('group');
					oSearch.addFilter('contactperson', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactPerson);
					oSearch.addFilter('group', 'EQUAL_TO', nsFreshcare.data.groupTrainee);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.configure.createPersonGroup = (oResponse.data.rows.length == 0);
							oParam.configureTraineeStep = 9;
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find existing Person Groups:' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.configure.createPerson = true;
					oParam.configure.updatePerson = false;
					console.log('A new Person must be created');
					oParam.configureTraineeStep = 10;
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}

			}
			// if Business exists
			else if(oParam.configureTraineeStep === 8)
			{
				if(nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
			  	{
			  		console.log('Business exists');
			  		oParam.configure.createBusiness = true;
			  		if(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.length > 0)
			  		{
			  			oParam.configure.updateBusiness = true;
			  			oParam.configure.createBusiness = false;
			  			console.log('The ContactBusiness must be updated');
			  		}
			  	}
			  	else if(ns1blankspace.objectContextData['seregisternewbusiness'] == 'Y')
			  	{
			  		oParam.configure.createBusiness = true;
			  		console.log('A new ContactBusiness must be created ');
			  	}

			  	oParam.configureTraineeStep = 6;
				nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			}
			// New person must be created
			else if (oParam.configureTraineeStep === 9)
			{
				if(nsFreshcare.admin.newelearning.data.matchingData.personBusiness != nsFreshcare.admin.newelearning.data.matchingData.contactBusiness)
			 	{
			 		console.log('Person is already linked to another business.');
			 		console.log(' Store id of other business and person');
			 		console.log('New person must be created');
			 		oParam.configure.otherBussinessTrainee = nsFreshcare.admin.newelearning.data.matchingData.personBusiness;
			 		oParam.configure.otherPersonTrainee =  nsFreshcare.admin.newelearning.data.matchingData.contactPerson;
			 		oParam.configure.createPerson = true;
			 		oParam.configure.updatePerson = false;
			 	}
			 	oParam.configureTraineeStep = 10;
				nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			}
			else if (oParam.configureTraineeStep === 10)
			{
				delete(oParam.configureTraineeStep);
				//nsFreshcare.admin.newgrower.createNewGrower.details(oParam);
				nsFreshcare.admin.newelearning.processTrainee.send(oParam);
			}
		},

		send: function(oParam)
		{
			if (oParam === undefined) {oParam = {}}
			if (oParam.createNewGrowerStep == undefined) {oParam.createNewGrowerStep = 0;}

			if (oParam.createNewGrowerStep === 0)
			{	
				oParam.createNewGrowerStep = 1;
				nsFreshcare.admin.newelearning.processTrainee.send(oParam);
			}
			else if (oParam.createNewGrowerStep === 1)
			{

				if ($.grep(nsFreshcare.admin.grower.data.saveObjects, function(x) {return x.object == 'relationship'}).length == 0)
				{
					nsFreshcare.admin.grower.data.saveObjects = nsFreshcare.admin.grower.data.saveObjects.concat( [			
					{
						object: 'relationship',
						method: 'CONTACT_RELATIONSHIP_MANAGE',
						saveSource: 'relationshipsData',
						dataSource: '',
						dataSourcePrefix: 'relationship'
					}]);
				}

				if ($.grep(nsFreshcare.admin.grower.data.saveObjects, function(x) {return x.object == 'trainingcourse'}).length == 0)
				{
					nsFreshcare.admin.grower.data.saveObjects = nsFreshcare.admin.grower.data.saveObjects.concat( [			
					{
						object: 'trainingcourse',
						method: 'CONTACT_RELATIONSHIP_MANAGE',
						saveSource: 'trainingCourseData',
						dataSource: '',
						dataSourcePrefix: 'trainingcourse'
					}]);
				}

				oParam.functionValidate = nsFreshcare.admin.newgrower.save.validate;
				oParam.functionSaveDetails = nsFreshcare.admin.newgrower.createNewGrower.details;
				oParam.functionSaveAddress = nsFreshcare.admin.grower.save.address;
				oParam.functionSaveMore = nsFreshcare.admin.newgrower.createNewGrower.extendedTasks;
				oParam.newMembership = oParam.createSubscription;
				oParam.functionSearch = nsFreshcare.admin.newgrower.updateTempTraineeStatus;

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

				if (oParam.configure.isMember)
				{
					oParam.functionInvalidData = nsFreshcare.admin.newgrower.createNewGrower.dataError;
					nsFreshcare.admin.newgrower.data.objectContext = ns1blankspace.objectContext;
					nsFreshcare.admin.newgrower.data.objectContextData = ns1blankspace.objectContextData;
					if (oParam.configure.createBusiness)
					{
						ns1blankspace.newGrower = true; 
						ns1blankspace.objectContext = -1;
					}
					else
					{
						// Update bussiness
						console.log('Update Businesses');
						var objectBusiness = {};
						$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness, function(index, value)
						{
							objectBusiness['contactbusiness.' + value] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.' + value];
						});
						ns1blankspace.objectContext = nsFreshcare.admin.newelearning.data.matchingData.contactBusiness;
						objectBusiness.id = ns1blankspace.objectContext;
						ns1blankspace.objectContextData = objectBusiness;
					}

					if (oParam.configure.isPerson)
					{
						if (oParam.configure.createPerson)
						{
							ns1blankspace.newGrower = true; 
							ns1blankspace.objectContext = -1;
						}
						else
						{
							// Update Person
							console.log('Update Person');
							var objectPerson = {};
							$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson, function(index, value)
							{
								objectPerson['contactbusiness.contactperson.' + value] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.contactperson.' + value];
							});
							
							objectPerson['contactbusiness.contactperson.id'] = nsFreshcare.admin.newelearning.data.matchingData.contactBusiness;
							oParam.contactperson = {id: objectPerson['contactbusiness.contactperson.id']};
							$.extend(ns1blankspace.objectContext, objectPerson);
						}
					}

					if(oParam.configure.subscriptionId != undefined)
					{
						oParam.subscription = {id: oParam.configure.subscriptionId};
					}

					nsFreshcare.admin.grower.save.send(oParam);
				}
				else
				{
					// work this out later!
				}
			}
		}
	},
	save:
	{
		send: function()
		{	
			nsFreshcare.admin.newgrower.save.send();
		}
	}
}