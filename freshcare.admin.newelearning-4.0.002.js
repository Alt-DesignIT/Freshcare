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

	traineeImport:
	{
		show: function() 
		{
			var aHTML = [];

			// plus button(s) to go to that person/business record
			aHTML.push('<table class="ns1blankspaceColumn2">');
			
			// v3.4.002 If reverted back to original, numeric SE fields are 0, not blank
			if ((ns1blankspace.objectContextData.sepersonid == '' || ns1blankspace.objectContextData.sepersonid == '0') 
				&& (ns1blankspace.objectContextData.sebusinessid == '' || ns1blankspace.objectContextData.sebusinessid == '0'))
			{
				// Construct eLearning Import 'wizard' UI and bind
				$('#ns1blankspaceSummaryColumn2').html(nsFreshcare.admin.newelearning.traineeImport.importWizard());	

				nsFreshcare.admin.newelearning.traineeImport.bind();
			}
			
			// PersonID or BusinessID already set...
			// v3.4.010 SUP023971 If subsequent course = 'Y' and status = 1, we ask user what to do with this business
			// 			Otherwise, it's already been processed and we're just viewing the record
			else
			{
				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption" colspan="2">Linked to Business:</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceSummary">' + 
								(ns1blankspace.objectContextData.sebusinessid > 0
								? ns1blankspace.objectContextData['agritemptrainee.sebusinessid.tradename'].formatXHTML()
								: '<span style="color:#A0A0A0;">[Not linked]</span>' ) + '</td>' +
								'<td>' +
								(ns1blankspace.objectContextData.sebusinessid > 0
									? '<span class="ns1blankspaceAction" id="ns1blankspaceGoToBusiness-' + 
										ns1blankspace.objectContextData.sebusinessid + '">' +
										'</span>'
									: '&nbsp;') +
									'</td></tr>');

				aHTML.push('<tr><td class="ns1blankspaceSummaryCaption" colspan="2">Linked to Person:</td></tr>');
				aHTML.push('<tr><td class="ns1blankspaceSummary">' + 
								ns1blankspace.objectContextData['agritemptrainee.sepersonid.firstname'].formatXHTML() + ' ' + 
								ns1blankspace.objectContextData['agritemptrainee.sepersonid.surname'].formatXHTML() + '</td>' +
							'<td><span class="ns1blankspaceAction" id="ns1blankspaceGoToPerson-' + ns1blankspace.objectContextData.sepersonid + '"' +
									' data-businessID="' + ns1blankspace.objectContextData.sebusinessid + '">' +
									'</span></td></tr>');

				// Data needs to be imported, give user options on what to do with the business
				if (ns1blankspace.objectContextData.sestatus == '1' && ns1blankspace.objectContextData.sesubsequentcourse == 'Y')
				{	
					aHTML.push('<tr><td colspan="2">&nbsp;</td></tr>');
					aHTML.push('<tr><td colspan="2" class="ns1blankspaceSummaryCaption">eLearning Trainee Import</td>');
					aHTML.push('<tr><td colspan="2" class="ns1blankspaceText" style="font-size: 0.825em; color: #A6A6A6;">' +
								'<b>Choose what to do for this Trainee:</b></td>');

					aHTML.push('<tr><td class="ns1blankspaceText" colspan="2">' +
								(ns1blankspace.objectContextData.sebusinessid > 0 
									? '<input type="radio" id="radioImportAction1" name="radioImportAction" data-text="Same" value="1"/>Same Business' +
										'<br />'
									: '') +
								'<input type="radio" id="radioImportAction1" name="radioImportAction" data-text="Create new" value="2"/>Create new Business' +
									'<br />' +
								'<input type="radio" id="radioImportAction2" name="radioImportAction" data-text="Link another" value="3"/>Link to different business' +
									 '<br />' +
								'<input type="radio" id="radioImportAction3" name="radioImportAction" data-text="No" value="4"/>No Business' +
								'</td></tr>');

					aHTML.push('<tr><td colspan="2">&nbsp;</td></tr>');
					aHTML.push('<tr><td colspan="2">' +
									'<table class="ns1blankspace" id="ns1blankspaceTrainerImportOptions"><tbody></tbody></table>' +
								'</td></tr>');
				}
				aHTML.push('</table>');

				$('#ns1blankspaceSummaryColumn2').html(aHTML.join(''));	

				$('#ns1blankspaceGoToBusiness-' + ns1blankspace.objectContextData.sebusinessid)
				.button({icons: {primary: 'ui-icon-play'}})
				.css('width', '20px')
				.css('height', '20px')
				.on('click', function()
				{
					var iGroup = ns1blankspace.objectContextData['agritemptrainee.sebusinessid.businessgroup.group'];

					if (iGroup == nsFreshcare.data.businessGroupGrower)
					{
						nsFreshcare.admin.grower.init({id: $(this).attr('id').split('-').pop()});
					}
					else if (iGroup == nsFreshcare.data.businessGroupAuditor)
					{
						nsFreshcare.admin.certificationbody.init({id: $(this).attr('id').split('-').pop()});
					}
					else if (iGroup == nsFreshcare.data.businessGroupTrainer)
					{
						nsFreshcare.admin.trainer.init({id: $(this).attr('id').split('-').pop()});
					}
					else if (iGroup == nsFreshcare.data.businessGroupCustomer)
					{
						nsFreshcare.admin.customer.init({id: $(this).attr('id').split('-').pop()});
					}
					else
					{
						ns1blankspace.contactBusiness.init({id: $(this).attr('id').split('-').pop()});
					}
				});

				$('#ns1blankspaceGoToPerson-' + ns1blankspace.objectContextData.sepersonid)
				.button({icons: {primary: 'ui-icon-play'}})
				.css('width', '20px')
				.css('height', '20px')
				.on('click', function()
				{
					var iGroup = ns1blankspace.objectContextData['agritemptrainee.sebusinessid.businessgroup.group'];

					if (iGroup == nsFreshcare.data.businessGroupGrower)
					{
						nsFreshcare.admin.grower.init({id: $(this).attr('data-businessid')});
					}
					else if (iGroup == nsFreshcare.data.businessGroupAuditor)
					{
						nsFreshcare.admin.certificationbody.init({id: $(this).attr('data-businessid')});
					}
					else if (iGroup == nsFreshcare.data.businessGroupTrainer)
					{
						nsFreshcare.admin.trainer.init({id: $(this).attr('data-businessid')});
					}
					else if (iGroup == nsFreshcare.data.businessGroupCustomer)
					{
						nsFreshcare.admin.customer.init({id: $(this).attr('data-businessid')});
					}
					else
					{
						ns1blankspace.contactPerson.init({id: $(this).attr('id').split('-').pop()});
					}
				});

				$('[name="radioImportAction"]')
				.on('click', function()
				{
					var sButtonText;
		
					// Use same bus
					if ($(this).val() == '1')
					{
						sButtonText = 'Check for updated information';
					}
					
					// Create new bus
					else if ($(this).val() == '2')
					{
						sButtonText = 'Check for Duplicates';
					}

					// Link another bus
					else if ($(this).val() == '3')
					{
						sButtonText = 'Find other Business';
					}

					// No business
					else if ($(this).val() == '4')
					{
						sButtonText = 'Check for updated information';
					}

					$('#ns1blankspaceTrainerImportOptions tbody').after(nsFreshcare.admin.newelearning.traineeImport.importWizard(sButtonText));
					nsFreshcare.admin.newelearning.traineeImport.bind();
					nsFreshcare.admin.newgrower.summaryBind();
				});
			}	
		},

		importWizard: function(sButtonText)
		{
			var aHTML = [];
			sButtonText = sButtonText || 'Check for Duplicates';

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption" style="padding-bottom: 15px;">eLearning Trainee Import </td></tr>');

			// Step 1 - Choose trainee "type"
			aHTML.push('<tr style="padding-top: 20px;"><td class="nsFreshcareSelectable eLearningImportStepHeader" data-value="1"' +
						' style="background-color: #CDE5C0; border: 1px solid #CDE5C0;">Step 1 - Choose Trainee Type</td></tr>');
			aHTML.push('<tr id="eLearningImportStep1"><td style="border: 1px solid #999999;">' +
							'<table style="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceSubNote" style="font-weight: bold;">Trainee is a...</td></tr>' +
								'<tr><td class="ns1blankspaceSubNote">' +
									'<input type="radio" id="radioTraineeType1" name="radioTraineeType" data-text="Member" value="1"/>Member<br />' +
									'<input type="radio" id="radioTraineeType2" name="radioTraineeType" data-text="Auditor" value="2"/>Auditor<br/>' +
									'<input type="radio" id="radioTraineeType3" name="radioTraineeType" data-text="Trainer" value="3"/>Trainer<br />');
					if (ns1blankspace.objectContextData.businessname != '')		// Can't select business type if no business name specified
					{							
						aHTML.push('<input type="radio" id="radioTraineeType5" name="radioTraineeType" data-text="Other Business" value="5"/>Other Business Type<br />');
					}
					aHTML.push('<input type="radio" id="radioTraineeType6" name="radioTraineeType" data-text="Other Person" value="6"/>Other Person Type' +
								'</td></tr>');
					aHTML.push('<tr class="eLearningImportTraineeTypeBusiness" style="display: none;">' +
									'<td class="ns1blankspaceSubNote">Business Type(s):</td></tr>' +
									'<tr class="eLearningImportTraineeTypeBusiness" style="display: none;"><td class="ns1blankspaceSubNote">' +
										'<input class="ns1blankspaceSelect" data-multiselect="true" id="eLearningImportTraineeTypeBusiness"' +
										' data-method="SETUP_CONTACT_BUSINESS_GROUP_SEARCH"' +
										' data-methodFilter="title-TEXT_IS_LIKE|id-NOT_IN_LIST-' + nsFreshcare.data.businessGroupGrower + ',' + 
																				nsFreshcare.data.businessGroupAuditor + ',' + 
																				nsFreshcare.data.businessGroupTrainer + '">' +
								'<tr class="eLearningImportTraineeTypePerson" style="display: none;">' +
									'<td class="ns1blankspaceSubNote">Person Type(s):</td></tr>' +
									'<tr class="eLearningImportTraineeTypePerson" style="display: none;"><td class="ns1blankspaceSubNote">' +
									'<input class="ns1blankspaceSelect" data-multiselect="true" id="eLearningImportTraineeTypePerson"' +
										' data-method="SETUP_CONTACT_PERSON_GROUP_SEARCH"' +
										' data-methodFilter="title-TEXT_IS_LIKE|id-NOT_IN_LIST-' + nsFreshcare.data.groupGrower.join(',') + ',' + 
																				nsFreshcare.data.groupAuditor.join(',') + ',' + 
																				nsFreshcare.data.groupTrainer.join(',') + ',' +
																				nsFreshcare.data.groupELearningTrainee +
																				'">' +
								'</td></tr>');
			aHTML.push('</table></td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">&nbsp;</td></tr>');


			// Step 2 - Check for Duplicates and display results
			aHTML.push('<tr style="padding-top: 20px;"><td class="nsFreshcareSelectable eLearningImportStepHeader" data-value="2"' +
						' style="display: none;background-color: #CDE5C0; border: 1px solid #CDE5C0;">Step 2 - Check for existing records</td></tr>');
			aHTML.push('<tr id="eLearningImportStep2" style="display: none;"><td style="border: 1px solid #999999;">' +
							'<table id="eLearningImportContactTable" style="ns1blankspace">');
					aHTML.push('<tr style="padding-bottom: 10px;"><td colspan="2"><span id="ns1blankspaceSummaryFindDuplicates" class="ns1blankspaceAction" style="width:100%;text-align: center;">' +
								sButtonText + '</span></td></tr>');
					aHTML.push('<tr class="eLearningContactResults">' +
								'<td id="eLearningContactBusinessLabel" class="ns1blankspaceSubNote" style="color: black;font-weight: bold;">&nbsp;</td>' +
								'<td id="eLearningContactBusiness" class="ns1blankspaceSubNote" style="color: black;">&nbsp;</td></tr>');	
					aHTML.push('<tr class="eLearningContactResults" style="padding-top: 10px;">' +
								'<td id="eLearningContactPersonLabel" class="ns1blankspaceSubNote" style="color: black;font-weight: bold;">&nbsp;</td>' +
								'<td id="eLearningContactPerson" class="ns1blankspaceSubNote" style="color: black;">&nbsp;</td></tr>');
			aHTML.push('</table></td></tr>');

			aHTML.push('<tr><td class="ns1blankspaceSummaryCaption">&nbsp;</td></tr>');

			
			// Step 3 - Allow Trainee to be created
			aHTML.push('<tr style="padding-top: 20px;"><td class="nsFreshcareSelectable eLearningImportStepHeader" data-value="3"' +
						' style="display: none;background-color: #CDE5C0; border: 1px solid #CDE5C0;">Step 3 - Create Trainee</td></tr>');

			aHTML.push('<tr id="eLearningImportStep3" style="display: none;"><td style="border: 1px solid #999999;">' +
							'<table id="eLearningImportConfirm" style="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceSubNote" colspan="2">' +
									'<span id="ns1blankspaceSummaryCreateGrower" class="ns1blankspaceAction" style="width:100%;">' +
										'Import Trainee</span></td></tr>');
			aHTML.push('</table></td></tr>');

			return aHTML.join('');
		},

		bind: function()
		{
			// Bind click of "Other" Trainee types in Step 1
			$('[name="radioTraineeType"]')
			.on('click', function()
			{
				if ($(this).val() == '5')
				{
					$('.eLearningImportTraineeTypeBusiness').show();
					$('.eLearningImportTraineeTypePerson').show();
				}
				else if ($(this).val() == '6')
				{
					$('.eLearningImportTraineeTypeBusiness').hide();
					$('.eLearningImportTraineeTypePerson').show();
				}
				else
				{
					$('.eLearningImportTraineeTypeBusiness').hide();	
					$('.eLearningImportTraineeTypePerson').hide();
				}

				$('.eLearningImportStepHeader[data-value="2"]').show().click();
			});

			// Bind click of Step links
			$('.eLearningImportStepHeader')
				.on('click', function()
				{
					$('#eLearningImportStep' + $(this).attr('data-value')).show();
				});

		}
	},

	findDuplicates: 
	{
		show: 	function(oParam)
		{
			var sTitle = 'Search for a Match';
			var aHTML = [];
			var bShowSearch = ns1blankspace.util.getParam(oParam, 'showSearch', {'default': true, set: true}).value;
			var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson').value;
			var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness').value;

			// Remove displayed results if user has already clicked on Check for Duplicates
			$('.tempRow').remove();
			$('#eLearningContactBusinessLabel').html('');
			$('#eLearningContactBusiness').html('');
			$('#eLearningContactPersonLabel').html('');
			$('#eLearningContactPerson').html('');

			if (bShowSearch)
			{

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

				
				// v4.0.001 Bootstrap
				ns1blankspace.container.confirm(
				{
					title: sTitle,
					html: '<span style="font-size: 0.75em">' + aHTML.join('') + '</span>',
					buttons: 
					[
						{
							text: 'OK', 
							name: 'btnOK', 
							click: function()
							{
								if ($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length == 0 && $('.ns1blankspacePersonSearch .nsFreshcareSelected').length == 0)
							 	{
							 		nsFreshcare.admin.newelearning.data.matchingData = {};
							 		$('#ns1blankspaceBootstrapDialog').modal('hide'); 	// v4.0.002 changed from $(this)
								 	nsFreshcare.admin.newelearning.findDuplicates.displayResults();
							 	}
							 	else
							 	{
							 		nsFreshcare.admin.newelearning.findDuplicates.dialog();
							 	}
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
						$('.modal-dialog').css('width', '850px');
					}
				});

			}

			// Don't show search, just search for person and/or business
			else
			{
				nsFreshcare.admin.newelearning.data.matchingData = {};
				if (iContactBusiness)
				{
					oParam.onComplete = nsFreshcare.admin.newelearning.findDuplicates.personSearchOne;
					oParam.onCompleteWhenCan = nsFreshcare.admin.newelearning.findDuplicates.nextstep;
					nsFreshcare.admin.newelearning.findDuplicates.businessSearchOne(oParam)
				}
				else
				{
					oParam.onComplete = nsFreshcare.admin.newelearning.findDuplicates.nextstep;
					nsFreshcare.admin.newelearning.findDuplicates.personSearchOne(oParam);
				}
			}

			$('#ns1blankspaceSearchGo')
				.button({icons: {primary: 'ui-icon-search'}})
				.on('click', function()
				{

					var SearchBusiness=$('#ns1blankspaceSearchBusiness').val();
					var SearchCertificate=$('#ns1blankspaceSearchCertificate').val();
					var SearchFirstName=$('#ns1blankspaceSearchFirstName').val();
					var SearchSurname=$('#ns1blankspaceSearchSurname').val();
					if (SearchBusiness != '' || SearchCertificate != '')
					{
						var oSearch = new AdvancedSearch();
						oSearch = nsFreshcare.admin.newelearning.findDuplicates.businessSearchParams(oSearch);
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
						oSearch.getResults(function(oResponse) 
						{
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
									aHTML.push(nsFreshcare.admin.newelearning.findDuplicates.businessSearchRow(this));
								});

								if (aHTML.length == 2)		// Header rows only
								{
									aHTML.push('<tr class="ns1blankspaceRow">' +
													'<td colspan="4" class="ns1blankspaceBussinessSearchRow">No matching businesses found</td></tr>');
								}

								$('#ns1blankspaceSearchBusinessResults').html(aHTML.join(''));
								$('.ns1blankspaceBusinessSearch')
									.css('cursor', 'pointer')
									.click(function(event)
									{
										nsFreshcare.admin.newelearning.findDuplicates.businessSearchRowClick(this);
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
					
					if (SearchFirstName != '' || SearchSurname != '' || iContactPerson)
					{
						var oSearch = new AdvancedSearch();
						oSearch = nsFreshcare.admin.newelearning.findDuplicates.personSearchParams(oSearch);
						
						if (iContactPerson)
						{
							oSearch.addFilter('id', 'EQUAL_TO', iContactPerson);
						}
						else
						{
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
						}
						oSearch.sort('id', 'asc');
						oSearch.rows = 100;
						oSearch.getResults(function(oResponse) 
						{
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
												' data-position="' + this.position + '" data-titletext="' + this.titletext + '" data-firstname="' + this.firstname + '"' +
												' data-surname="' + this.surname + '" data-mobile="' + this.mobile + '"' +
												' data-personmailingaddress1="' + this.mailingaddress1 + '" data-personmailingsuburb="' + this.mailingsuburb + '"' +
												' data-personmailingstate="' + this.mailingstate + '" data-personmailingpostcode="' + this.mailingpostcode + '"' +
												' data-personmailingcountry="' + this.mailingcountry + '" data-personstreetaddress1="' + this.streetaddress1 + '"' +
												' data-workphone="' + this.workphone + '"' +
												' data-contactbusiness="' + this.contactbusiness + '"' +
												' data-fax="' + this.fax + '" data-email="' + this.email + '" data-personstreetsuburb="' + this.streetsuburb + '"' +
												' data-personstreetstate="' + this.streetstate + '" data-personstreetpostcode="' + this.streetpostcode + '"' +
												' data-personstreetcountry="' + this.streetcountry + '">');
									
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

								if (aHTML.length == 2)		// Header rows only
								{
									aHTML.push('<tr class="ns1blankspaceRow">' +
													'<td colspan="4" class="ns1blankspacePersonSearchRow">No matching people found</td></tr>');
								}

								$('#ns1blankspaceSearchPersonResults').html(aHTML.join(''));
								
								if (iContactPerson)
								{
									nsFreshcare.admin.newelearning.findDuplicates.personSearchRowClick($('.ns1blankspacePersonSearch').first(), iContactPerson);
								}

								$('.ns1blankspacePersonSearch')
								.css('cursor', 'pointer')
								.click(function(event)
								{
									nsFreshcare.admin.newelearning.findDuplicates.personSearchRowClick(this, iContactPerson);
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

			$('#ns1blankspaceSearchBusiness').val(ns1blankspace.objectContextData.tradename.formatXHTML());
			$('#ns1blankspaceSearchCertificate').val(ns1blankspace.objectContextData.secertificatenumber.formatXHTML());
			$('#ns1blankspaceSearchFirstName').val(ns1blankspace.objectContextData.firstname.formatXHTML());
			$('#ns1blankspaceSearchSurname').val(ns1blankspace.objectContextData.surname.formatXHTML());

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
				 		$('#ns1blankspaceBootstrapDialog').modal('hide');
				 		nsFreshcare.admin.newelearning.findDuplicates.displayResults();
				 	}
				 	else
				 	{
				 		nsFreshcare.admin.newelearning.findDuplicates.nextstep();
				 	}
				});
		},

		businessSearchParams: function(oSearch)
		{
			oSearch.method = 'CONTACT_BUSINESS_SEARCH';
			oSearch.addField('legalname,tradename,streetsuburb,streetpostcode,contactbusiness.agrisubscription.id,contactbusiness.agrisubscription.agricertificate.certificatenumber,abn' +
							',mailingaddress1,mailingsuburb,mailingstate,mailingpostcode,mailingcountry,streetaddress1,streetsuburb,streetstate,streetpostcode,streetcountry');
			return oSearch;
		},

		businessSearchOne: function(oParam)
		{
			var oSearch = new AdvancedSearch();
			oSearch = nsFreshcare.admin.newelearning.findDuplicates.businessSearchParams(oSearch);
			oSearch.addFilter('id', 'EQUAL_TO', oParam.contactBusiness);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					if (oResponse.data.rows.length == 0)
					{	ns1blankspace.status.error('Cannot find business');}
					else
					{
						var oRow = oResponse.data.rows[0];
						nsFreshcare.admin.newelearning.data.matchingData.contactBusiness = oParam.contactBusiness;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetcountry = oRow.streetcountry;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetpostcode = oRow.streetpostcode;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetstate = oRow.streetstate;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetsuburb = oRow.streetsuburb;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessstreetaddress1 = oRow.streetaddress1;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingcountry = oRow.mailingcountry;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingpostcode = oRow.mailingpostcode;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingstate = oRow.mailingstate;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingsuburb = oRow.mailingsuburb;
				 		nsFreshcare.admin.newelearning.data.matchingData.businessmailingaddress1 = oRow.mailingaddress1;
				 		
				 		nsFreshcare.admin.newelearning.data.matchingData.abn = oRow.abn;
				 		nsFreshcare.admin.newelearning.data.matchingData.legalname = oRow.legalname;
				 		nsFreshcare.admin.newelearning.data.matchingData.tradename = oRow.tradename;
				 		nsFreshcare.admin.newelearning.data.matchingData.subscription = oRow.agrisubscriptionid;

				 		if (oParam.onComplete)
				 		{
				 			ns1blankspace.util.onComplete(oParam);
				 		}
					}
				}
				else
				{
					ns1blankspace.status.error('Error finding business: ' + oResponse.error.errornotes);
				}
			});
		},

		businessSearchRow: function(oRow)
		{
			var aHTML = [];
			aHTML.push('<tr class="ns1blankspaceRow ns1blankspaceBusinessSearch"'+
							' data-id="' + oRow.id + '"' +
							' data-legalname="' + oRow.legalname + '"'+
							' data-tradename="' + oRow.tradename + '" ' +
							' data-abn="' + oRow.abn + '"'+
							' data-businessmailingaddress1="' + oRow.mailingaddress1 + '"'+
							' data-businessmailingsuburb="' + oRow.mailingsuburb + '"' +
							' data-businessmailingstate="' + oRow.mailingstate + '"'+
							' data-businessmailingpostcode="' + oRow.mailingpostcode + '"'+
							' data-businessmailingcountry="' + oRow.mailingcountry + '"' +
							' data-businessstreetaddress1="' + oRow.streetaddress1 + '"'+
							' data-businessstreetsuburb="' + oRow.streetsuburb + '"' +
							' data-businessstreetstate="' + oRow.streetstate + '"' +
							' data-businessstreetpostcode="' + oRow.streetpostcode + '"'+
							' data-businessstreetcountry="' + oRow.streetcountry + '"' +
							' data-tradename="' + oRow.tradename + '"'+
							' data-contactbusinessid="' + oRow.id + '"'+
							' data-agrisubscriptionid="' + oRow["contactbusiness.agrisubscription.id"] + '"' +
						'>');
			
			aHTML.push('<td id="ns1blankspaceBusinessResults_legalname-' + oRow.id + '"  class="ns1blankspaceBussinessSearchRow">' +
									oRow["legalname"] + '</td>' +
						'<td id="ns1blankspaceBusinessResults_tradename-' + oRow.id + '" class="ns1blankspaceBussinessSearchRow">' +
									oRow["tradename"] + '</td>' +
						'<td id="ns1blankspaceBusinessResults_streetsuburb-' + oRow.id + '" class="ns1blankspaceBussinessSearchRow">' +
									oRow["streetsuburb"] + '</td>' +
						'<td id="ns1blankspaceBusinessResults_certificatenumber' + oRow.id + '" class="ns1blankspaceBussinessSearchRow">' +
									oRow["contactbusiness.agrisubscription.agricertificate.certificatenumber"] + '</td>' +
						'</tr>');

			return aHTML.join('');
		},

		businessSearchRowClick: function(oElement)
		{
			if ($(oElement).hasClass( "nsFreshcareSelected" ))
			{
				$(oElement).removeClass('nsFreshcareSelected');
				$(oElement).find('td').removeClass('nsFreshcareSelected');
			}
			else
			{
				if($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0)
				{
					$('.ns1blankspaceBusinessSearch').removeClass('nsFreshcareSelected');
					$('.ns1blankspaceBussinessSearchRow').removeClass('nsFreshcareSelected');
				}
				$(oElement).addClass('nsFreshcareSelected');
				$(oElement).find('td').addClass('nsFreshcareSelected');
			}
		},

		personSearchParams: function(oSearch)
		{
			oSearch.method = 'CONTACT_PERSON_SEARCH';
			oSearch.addField('firstname,surname,contactbusiness,contactbusinesstext,mobile,position,title,titletext,firstname,surname,mobile' +
								',workphone,fax,email,streetsuburb,streetstate,streetpostcode,streetcountry,mailingaddress1,mailingsuburb' +
								',mailingstate,mailingpostcode,mailingcountry,streetaddress1,contactbusiness');

			return oSearch;
		},

		personSearchOne: function(oParam)
		{
			var oSearch = new AdvancedSearch();
			oSearch = nsFreshcare.admin.newelearning.findDuplicates.personSearchParams(oSearch);
			oSearch.addFilter('id', 'EQUAL_TO', oParam.contactPerson);
			oSearch.getResults(function(oResponse)
			{
				if (oResponse.status == 'OK')
				{
					if (oResponse.data.rows.length == 0)
					{	ns1blankspace.status.error('Cannot find person');}
					else
					{
						var oRow = oResponse.data.rows[0];
						nsFreshcare.admin.newelearning.data.matchingData.contactPerson = oParam.contactPerson;
				 		nsFreshcare.admin.newelearning.data.matchingData.personstreetcountry = oRow.streetcountry;
				 		nsFreshcare.admin.newelearning.data.matchingData.personstreetpostcode = oRow.streetpostcode;
				 		nsFreshcare.admin.newelearning.data.matchingData.personstreetstate = oRow.streetstate;
				 		nsFreshcare.admin.newelearning.data.matchingData.personstreetsuburb = oRow.streetsuburb;
				 		nsFreshcare.admin.newelearning.data.matchingData.personstreetaddress1 = oRow.streetaddress1;
				 		nsFreshcare.admin.newelearning.data.matchingData.personmailingcountry = oRow.mailingcountry;
				 		nsFreshcare.admin.newelearning.data.matchingData.personmailingpostcode = oRow.mailingpostcode;
				 		nsFreshcare.admin.newelearning.data.matchingData.personmailingstate = oRow.mailingstate;
				 		nsFreshcare.admin.newelearning.data.matchingData.personmailingsuburb = oRow.mailingsuburb;
				 		nsFreshcare.admin.newelearning.data.matchingData.personmailingaddress1 = oRow.mailingaddress1;
				 		
				 		nsFreshcare.admin.newelearning.data.matchingData.email = oRow.email;
				 		nsFreshcare.admin.newelearning.data.matchingData.fax = oRow.fax;
				 		nsFreshcare.admin.newelearning.data.matchingData.mobile = oRow.mobile;
				 		nsFreshcare.admin.newelearning.data.matchingData.workphone = oRow.workphone;
				 		nsFreshcare.admin.newelearning.data.matchingData.surname = oRow.surname;
				 		nsFreshcare.admin.newelearning.data.matchingData.firstname = oRow.firstname;
				 		nsFreshcare.admin.newelearning.data.matchingData.titletext = oRow.titletext;
				 		nsFreshcare.admin.newelearning.data.matchingData.position = oRow.position;
				 		nsFreshcare.admin.newelearning.data.matchingData.personBusiness  = oRow.contactbusiness;

				 		if (oParam.onComplete)
				 		{
				 			ns1blankspace.util.onComplete(oParam);
				 		}
					}
				}
				else
				{
					ns1blankspace.status.error('Error finding person: ' + oResponse.error.errornotes);
				}
			});
		},

		personSearchRowClick: function(oElement, iContactPerson)
		{
			// v3.4.010 SUP023936 Added so that can add business details to the top section when choose person
			// v3.4.010 SUP023971 If iContactPerson passed, highlight row and don't allow user to unselect
			if ($(this).hasClass( "nsFreshcareSelected" ))
			{
				if (iContactPerson == undefined)
				{
					$(this).removeClass('nsFreshcareSelected');
					$(this).find('td').removeClass('nsFreshcareSelected');
				}
			}
			else
			{
				if($('.ns1blankspacePersonSearch .nsFreshcareSelected').length > 0)
				{
					$('.ns1blankspacePersonSearch').removeClass('nsFreshcareSelected');
					$('.ns1blankspacePersonSearchRow').removeClass('nsFreshcareSelected');
				}
				$(oElement).addClass('nsFreshcareSelected');
				$(oElement).find('td').addClass('nsFreshcareSelected');

				// v3.4.010 Check if business is already in top section and if not, search for it's details
				var iContactBusiness = $(oElement).attr('data-contactbusiness');
				if (iContactBusiness 
					&& $('tr.ns1blankspaceBusinessSearch[data-id="' + iContactBusiness + '"]').length == 0)
				{
					var oSearch = new AdvancedSearch();
					oSearch = nsFreshcare.admin.newelearning.findDuplicates.businessSearchParams(oSearch);
					oSearch.addFilter('id', 'EQUAL_TO', iContactBusiness);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							var sHTML = nsFreshcare.admin.newelearning.findDuplicates.businessSearchRow(oResponse.data.rows[0]);
							var oFirst = $('#ns1blankspaceSearchBusinessResults tr.ns1blankspaceRow').first();
							if (oFirst.length > 0)
							{
								$(oFirst).before(sHTML);
							} 
							else
							{
								$('#ns1blankspaceSearchBusinessResults tr:last').after(sHTML);
							}
							nsFreshcare.admin.newelearning.findDuplicates.businessSearchRowClick($('tr.ns1blankspaceBusinessSearch[data-id="' + iContactBusiness + '"]'));
							//$('.ns1blankspaceBusinessSearch').removeClass('nsFreshcareSelected');
							//$('.ns1blankspaceBussinessSearchRow').removeClass('nsFreshcareSelected');
							//$('tr.ns1blankspaceBusinessSearch[data-id="' + iContactBusiness + '"]').find('td').addClass('nsFreshcareSelected');
						}
						else
						{
							ns1blankspace.status.error('Unable to fnd matching business: ' + oResponse.error.errornotes);
						}
					});
				}
				// Row is already in the top section - move it to the top of the list
				else if (iContactBusiness)
				{
					if ($('#ns1blankspaceSearchBusinessResults tr.ns1blankspaceRow').first().attr('data-id') != iContactBusiness)
					{
						$('tr.ns1blankspaceBusinessSearch[data-id="' + iContactBusiness + '"]')
							.insertBefore($('#ns1blankspaceSearchBusinessResults tr.ns1blankspaceRow').first());
					}
					if ($('tr.ns1blankspaceBusinessSearch[data-id="' + iContactBusiness + '"]').hasClass('nsFreshcareSelected') == false)
					{
						nsFreshcare.admin.newelearning.findDuplicates.businessSearchRowClick($('tr.ns1blankspaceBusinessSearch[data-id="' + iContactBusiness + '"]'));
					}
				}
			}
		},

		dialog: function()
		{
		 	if (ns1blankspace.objectContextData['seregisternewbusiness'] == 'N' && $('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0)
		 	{
		 		$('.messageDisplay').show();
		 		$('.errorDisplay').text('You have chosen an existing business but the Trainee indicated that they did not have a business to register with Freshcare. ' +
		 								'Are you sure you want to associate this Trainee with the selected business?');
		 	}
		 	else
		 	{	
		 		nsFreshcare.admin.newelearning.data.matchingData = {};
		 		if ($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0)
		 		{
		 			nsFreshcare.admin.newelearning.data.matchingData.contactBusiness = $('tr.ns1blankspaceBusinessSearch.nsFreshcareSelected').attr('data-contactbusinessid');	
		 		}	 	
			 	
			 	nsFreshcare.admin.newelearning.findDuplicates.nextstep();
			}
		},

		nextstep: function(oParam)
		{
			oParam = oParam || {};
			oParam.nextStep = oParam.nextStep || 1;
			var aHTML = ns1blankspace.util.getParam(oParam, 'html', {'default': []}).value;
			var bShowSearch = ns1blankspace.util.getParam(oParam, 'showSearch', {'default': true, set: true}).value;

			// Get business details
			if (oParam.nextStep == 1)
			{
				oParam.nextStep = 2;
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
								'<td class="ns1blankspaceHeaderCaption" width="75px">Select</td>' +
								'</tr>');

				oParam.html = aHTML;
				if ($('.ns1blankspaceBusinessSearch .nsFreshcareSelected').length > 0 || !bShowSearch)
			 	{
			 		if(nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
			 		{
				 		if (bShowSearch)
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
					 	}

						aHTML.push('<tr><td class="ns1blankspaceCaption ns1blankspaceCaption" style="padding-bottom: 10px;">Business Info</td><td>' +
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

						oParam.html = aHTML;
						// Now we need to find any sites linked to the business if user has chosen 'Member'
						if ($('[name="radioTraineeType"]:checked').val() == '1')
						{
							var oSearch = new AdvancedSearch();
							oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
							oSearch.addField('address1,address2,addresssuburb,addressstate,addresspostcode,addresscountry' +
											',status,address.addresslink.id,address.addresslink.objectcontext');
							oSearch.addFilter('address.addresslink.object', 'EQUAL_TO', nsFreshcare.objectBusiness);
							oSearch.addFilter('address.addresslink.objectcontext', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactBusiness);
							oSearch.sort('status', 'asc');
							oSearch.rows = 50;
							oSearch.getResults(function(oResponse)
							{
								if (oResponse.status == 'OK')
								{	
									nsFreshcare.admin.newelearning.data.matchingData.sites = oResponse.data.rows;
									nsFreshcare.admin.newelearning.findDuplicates.nextstep(oParam);
								}
								else
								{
									ns1blankspace.status.error('Error finding business sites: ' + oResponse.error.errornotes);
								}
							});
						}
						else
						{
							nsFreshcare.admin.newelearning.findDuplicates.nextstep(oParam);
						}
					}
					else
					{
						nsFreshcare.admin.newelearning.findDuplicates.nextstep(oParam);
					}
				}
				else
				{
					nsFreshcare.admin.newelearning.findDuplicates.nextstep(oParam);
				}
			}

			else if (oParam.nextStep == 2)
			{
				delete(oParam.nextStep);
				// If it's a member and the matching business has sites, display them to be matched as well
				if ($('[name="radioTraineeType"]:checked').val() == '1')
				{
					if ((nsFreshcare.admin.newelearning.data.matchingData.sites && nsFreshcare.admin.newelearning.data.matchingData.sites.length > 0)
						|| (ns1blankspace.objectContextData.sites && ns1blankspace.objectContextData.sites.length > 0))
					{
						nsFreshcare.admin.newelearning.data.matchingData.sites = nsFreshcare.admin.newelearning.data.matchingData.sites || [];
						var iExistingSites = (nsFreshcare.admin.newelearning.data.matchingData.sites) ? nsFreshcare.admin.newelearning.data.matchingData.sites.length : 0;
						var iNewSites = (ns1blankspace.objectContextData.sites) ? ns1blankspace.objectContextData.sites.length : 0;

						aHTML.push('<tr><td colspan="4" class="ns1blankspaceCaption ns1blankspaceCaption" style="padding-bottom: 10px;">Sites<br />' +
										'<span class="ns1blankspaceSubNote">(Match the sites up by dragging the sites on the right-hand side to ' +
											'it\'s matching site or click Add if it\'s a new site. ' +
											'To update an existing site with the data from the eLearning record, click Update.)</span>' +
									'</td></tr>');

						$.each(nsFreshcare.admin.newelearning.data.matchingData.sites, function(i, row)
						{
							var sExistingSite = row.address1 + ' ' + row.address2 + '<br />' + row.addresssuburb + ' ' + row.addressstate + ' ' + 
												row.addresspostcode + ' ' + row.addresscountry;
							var sNewSite = (ns1blankspace.objectContextData.sites && ns1blankspace.objectContextData.sites[i])
											? ns1blankspace.objectContextData.sites[i].address1 + ' ' + ns1blankspace.objectContextData.sites[i].address2 + '<br />' +
											  ns1blankspace.objectContextData.sites[i].addresssuburb + ' ' + ns1blankspace.objectContextData.sites[i].addressstate + ' ' +
											  ns1blankspace.objectContextData.sites[i].addresspostcode + ' ' + ns1blankspace.objectContextData.sites[i].addresscountry
											 : undefined;
	 
							aHTML.push(nsFreshcare.admin.newelearning.findDuplicates.siteHTML(
								{
									oldRow: row, 
									newRow: ns1blankspace.objectContextData.sites[i],
									index: i
								}));
							/*aHTML.push('<tr class="addressSites" id="addressSite-' + i + '" data-index="' + i + '">' +
										'<td class="ns1blankspaceRow" style="text-align: right;">' + 
											(row.status == '1' 
												? '[Primary]' 
												: (row.status == '3' ? '[Inactive]' : '&nbsp;')) + '</td>' +
										'<td class="ns1blankspaceRow oldAddress" data-address="' + row.id + '"' +
												' data-addressLink="' + row['address.addresslink.id'] + '">' + 
												sExistingSite.formatXHTML() + 
										'</td>');

							aHTML.push('<td class="ns1blankspaceRow newAddress"');
							if (sNewSite)
							{
								aHTML.push(' data-address="' + ns1blankspace.objectContextData.sites[i].id + '"' +
											' data-addressLink="' + ns1blankspace.objectContextData.sites[i]['address.addresslink.id'] + '">' +
											sNewSite.formatXHTML() + '</td>');
								aHTML.push('<td class="ns1blankspaceRow addressAction">' +
												'<input type="checkbox" class="ns1blankspaceAgriTempTraineeSiteUpdate" value="site-' + i + '"><br />' + 
												'<span class="addAddress" id="addAddress-' + i + '">New</span>' +
												'</td>')

							}
							else {aHTML.push('>&nbsp;</td><td class="ns1blankspaceRow addressAction"></td>');}

							aHTML.push('</tr>');*/
						});
						
						if (iNewSites > iExistingSites)
						{
							$.each(ns1blankspace.objectContextData.sites, function(i, row)
							{
								if (i > (iExistingSites - 1))
								{
									aHTML.push(nsFreshcare.admin.newelearning.findDuplicates.siteHTML({newRow: row, index: i}));
								}
							});
						}
					}
				}

				if ($('.ns1blankspacePersonSearch .nsFreshcareSelected').length > 0 || !bShowSearch)
			 	{
			 		if (bShowSearch)
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
				 	}

					aHTML.push('<tr><td class="ns1blankspaceCaption ns1blankspaceCaption" style="padding-bottom: 10px;">Contact Info</td><td>' +
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

					if (ns1blankspace.objectContextData['seregisternewbusiness'] == 'N')
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
								'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['suburb'] + '</td>' +
								'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="streetsuburb"></td>' +
								'</tr>');

						aHTML.push('<tr>' +
									'<td class="ns1blankspaceRow ns1blankspaceCaption">Location State</td>' +
									'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetstate + '</td>' +
									'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['state'] + '</td>' +
									'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="streetstate"></td>' +
									'</tr>');

						aHTML.push('<tr>' +
									'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Postcode</td>' +
									'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetpostcode + '</td>' +
									'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['postcode'] + '</td>' +
									'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="streetpostcode"></td>' +
									'</tr>');

						aHTML.push('<tr>' +
									'<td class="ns1blankspaceRow ns1blankspaceCaption">Location Country</td>' +
									'<td class="ns1blankspaceRow">' + nsFreshcare.admin.newelearning.data.matchingData.personstreetcountry + '</td>' +
									'<td class="ns1blankspaceRow">' + ns1blankspace.objectContextData['country'] + '</td>' +
									'<td class="ns1blankspaceRow"><input type="checkbox" class="ns1blankspaceAgriTempTraineePersonUpdate" value="streetcountry"></td>' +
									'</tr>');
					}
				}

				aHTML.push('</table></td></tr>');

				aHTML.push('</table>');

				// v4.0.001 Bootstrap
				ns1blankspace.container.confirm(
				{
					title: sTitle,
					html: '<span style="font-size: 0.75em">' + aHTML.join('') + '</span>',
					buttons: 
					[
						{
							name: 'btnOK',
							text: 'OK', 
							click: function()
							{
								nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness = [];
								nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson = [];
								nsFreshcare.admin.newelearning.data.matchingData.updateSites = [];
								if($('input[type="checkbox"]:checked').length != 0)
								{
								 	$('.ns1blankspaceAgriTempTraineeBussinessUpdate:checked').each(function() 
									{
									   nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.push(this.value);
									});
									$('.ns1blankspaceAgriTempTraineePersonUpdate:checked').each(function() 
									{
									   nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson.push(this.value);
									});
								}

								// Determine which sites need to be added and if any matched sites are to be reactivated or updated
								if ($('tr.addressSites').length > 0)
								{
									$('tr.addressSites .newAddress').each(function(i, newAddress)
									{
										if ($(newAddress).html() != '' && $(newAddress).html() != '&nbsp;')
										{
											// This address is new and must be added
											if ($('#'+ $(newAddress).parent().attr('id') + ' .addressAction').html() == 'To be added')
											{	
												ns1blankspace.objectContextData.sites = 
													$.map(ns1blankspace.objectContextData.sites, function(x)
													{
														if (x.id == $(newAddress).attr('data-address'))
														{
															x.matchingAddress = '';
															x.matchingAddressLink = '';
														}
														return x;
													});
											}
											
											else 
											{
												// User wants to update this address
												if ($('#'+ $(newAddress).parent().attr('id') + ' .ns1blankspaceAgriTempTraineeSiteUpdate').prop('checked'))
												{
													var oNewAddress = $.grep(ns1blankspace.objectContextData.sites, function(x) {return x.id == $(newAddress).attr('data-address')}).shift();
													nsFreshcare.admin.newelearning.data.matchingData.updateSites.push(
													{
														id: $(newAddress).attr('data-address'),
														matchingAddress: $('#'+ $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-address'),
														matchingAddressLink: $('#'+ $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-addressLink'),
														address1: oNewAddress.address1,
														address2: oNewAddress.address2,
														addresssuburb: oNewAddress.addresssuburb,
														addressstate: oNewAddress.addressstate,
														addresspostcode: oNewAddress.addresspostcode,
														addresscountry: oNewAddress.addresscountry,
														status: $(newAddress).parent().attr('data-status')
													});
												}
												
												// Existing address - add address id to data set
												else
												{	
													ns1blankspace.objectContextData.sites = 
														$.map(ns1blankspace.objectContextData.sites, function(x)
														{
															if (x.id == $(newAddress).attr('data-address'))
															{
																x.matchingAddress = $('#' + $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-address');
																x.matchingAddressLink = $('#' + $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-addresslink');
																if ($('#' + $(newAddress).parent().attr('id')).children().first().html() == '[Inactive]')
																{
																	x.matchingAddressReactivate = true;
																}
															}
															return x;
														});
												}
											}
										}
									});
								}
								
							 	// v4.0.001 Bootstrap
							 	$('#ns1blankspaceBootstrapDialog').modal('hide');

							 	// 3.4.001 Now display details to be created or updated on Trainee Import Wizard
							 	nsFreshcare.admin.newelearning.findDuplicates.displayResults();
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

						nsFreshcare.admin.newelearning.findDuplicates.bind({addAddress: 'span.addAddress', newAddress: 'td.newAddress'});
						//$('.modal-dialog').css('width', '600px');
					}
				});

				/*$('#ns1blankspaceMultiUseDialog')
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
						buttons: 
						[
							{
								text: 'OK', 
								click: function()
								{
									nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness = [];
									nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson = [];
									nsFreshcare.admin.newelearning.data.matchingData.updateSites = [];
									if($('input[type="checkbox"]:checked').length != 0)
									{
									 	$('.ns1blankspaceAgriTempTraineeBussinessUpdate:checked').each(function() 
										{
										   nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.push(this.value);
										});
										$('.ns1blankspaceAgriTempTraineePersonUpdate:checked').each(function() 
										{
										   nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson.push(this.value);
										});
									}

									// Determine which sites need to be added and if any matched sites are to be reactivated or updated
									if ($('tr.addressSites').length > 0)
									{
										$('tr.addressSites .newAddress').each(function(i, newAddress)
										{
											if ($(newAddress).html() != '' && $(newAddress).html() != '&nbsp;')
											{
												// This address is new and must be added
												if ($('#'+ $(newAddress).parent().attr('id') + ' .addressAction').html() == 'To be added')
												{	
													ns1blankspace.objectContextData.sites = 
														$.map(ns1blankspace.objectContextData.sites, function(x)
														{
															if (x.id == $(newAddress).attr('data-address'))
															{
																x.matchingAddress = '';
																x.matchingAddressLink = '';
															}
															return x;
														});
												}
												
												else 
												{
													// User wants to update this address
													if ($('#'+ $(newAddress).parent().attr('id') + ' .ns1blankspaceAgriTempTraineeSiteUpdate').prop('checked'))
													{
														var oNewAddress = $.grep(ns1blankspace.objectContextData.sites, function(x) {return x.id == $(newAddress).attr('data-address')}).shift();
														nsFreshcare.admin.newelearning.data.matchingData.updateSites.push(
														{
															id: $(newAddress).attr('data-address'),
															matchingAddress: $('#'+ $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-address'),
															matchingAddressLink: $('#'+ $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-addressLink'),
															address1: oNewAddress.address1,
															address2: oNewAddress.address2,
															addresssuburb: oNewAddress.addresssuburb,
															addressstate: oNewAddress.addressstate,
															addresspostcode: oNewAddress.addresspostcode,
															addresscountry: oNewAddress.addresscountry,
															status: $(newAddress).parent().attr('data-status')
														});
													}
													
													// Existing address - add address id to data set
													else
													{	
														ns1blankspace.objectContextData.sites = 
															$.map(ns1blankspace.objectContextData.sites, function(x)
															{
																if (x.id == $(newAddress).attr('data-address'))
																{
																	x.matchingAddress = $('#' + $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-address');
																	x.matchingAddressLink = $('#' + $(newAddress).parent().attr('id') + ' .oldAddress').attr('data-addresslink');
																	if ($('#' + $(newAddress).parent().attr('id')).children().first().html() == '[Inactive]')
																	{
																		x.matchingAddressReactivate = true;
																	}
																}
																return x;
															});
													}
												}
											}
										});
									}
									
								 	$(this).dialog('destroy');

								 	// 3.4.001 Now display details to be created or updated on Trainee Import Wizard
								 	nsFreshcare.admin.newelearning.findDuplicates.displayResults();
								}
							}
						]
					});*/

				//nsFreshcare.admin.newelearning.findDuplicates.bind({addAddress: 'span.addAddress', newAddress: 'td.newAddress'});
			}
		},

		siteHTML: function(oParam)
		{
			var oOldRow = ns1blankspace.util.getParam(oParam, 'oldRow').value;
			var oNewRow = ns1blankspace.util.getParam(oParam, 'newRow').value;
			var oXHTMLRow = ns1blankspace.util.getParam(oParam, 'xhtmlRow').value;
			var i = ns1blankspace.util.getParam(oParam, 'index').value;
			var bToBeAdded = ns1blankspace.util.getParam(oParam, 'toBeAdded', {'default': false}).value;
			var bColumn1 = ns1blankspace.util.getParam(oParam, 'column1', {'default': false}).value;
			var bColumn2 = ns1blankspace.util.getParam(oParam, 'column2', {'default': false}).value;
			var bColumn3 = ns1blankspace.util.getParam(oParam, 'column3', {'default': false}).value;
			var bColumn4 = ns1blankspace.util.getParam(oParam, 'column4', {'default': false}).value;
			var bInnerOnly = ns1blankspace.util.getParam(oParam, 'innerOnly', {'default': false}).value;
			var bOldSiteRow = ns1blankspace.util.getParam(oParam, 'oldSiteRow', {'default': false}).value;
			var bAll = (!bColumn1 && !bColumn2 && !bColumn3 && !bColumn4);	// So that can pass nothing to get whole row
			var aStatus = [{id: '1', text: 'Primary'}, {id: '2', text: '&nbsp;'}, {id: '3', text: 'Inactive'}];
			var aHTML = [];
			var oOldSite = {};
			var oNewSite = {};

			if (oNewRow || oOldRow)
			{
				if (oOldRow)
				{
					oOldSite.siteText = (oOldRow.address1 + ' ' + oOldRow.address2 + '<br />' + oOldRow.addresssuburb + ' ' + oOldRow.addressstate + ' ' + 
									oOldRow.addresspostcode + ' ' + oOldRow.addresscountry).formatXHTML();
					oOldSite.address = oOldRow.id;
					oOldSite.addressLink = oOldRow['address.addresslink.id'];
					oOldSite.status = oOldRow.status;
				}
				if (oNewRow)
				{
					oNewSite.siteText = (oNewRow.address1 + ' ' + oNewRow.address2 + '<br />' + oNewRow.addresssuburb + ' ' + oNewRow.addressstate + ' ' + 
									oNewRow.addresspostcode + ' ' + oNewRow.addresscountry).formatXHTML();
					oNewSite.address = oNewRow.id;
					oNewSite.addressLink = oNewRow['address.addresslink.id'];
				}
			}
			else if (oXHTMLRow)
			{
				var iRowID = $(oXHTMLRow).attr('id');
				if (!bToBeAdded)
				{
					oOldSite.siteText = $('#' + iRowID + ' .oldAddress').html();
					oOldSite.address = $('#' + iRowID + ' .oldAddress').attr('data-address');
					oOldSite.addressLink = $('#' + iRowID + ' .oldAddress').attr('data-addressLink');
					oOldSite.status = $(oXHTMLRow).children().first().attr('data-status');
				}
				oNewSite.siteText = $('#' + iRowID + ' .newAddress').html();
				oNewSite.address = $('#' + iRowID + ' .newAddress').attr('data-address');
				oNewSite.addressLink = $('#' + iRowID + ' .newAddress').attr('data-addressLink');
			}

			if (oParam.oldSiteRow == undefined && oOldSite.siteText && oOldSite.siteText != '' && oOldSite.siteText != '&nbsp;')
			{
				bOldSiteRow = true;
			}

			if (bAll)
			{
				aHTML.push('<tr class="addressSites" id="addressSite-' + i + '" data-index="' + i + '">');
			}

			if (bColumn1 || bAll)
			{
				if (!bInnerOnly) {aHTML.push('<td class="ns1blankspaceRow" data-status="' + (oOldSite.status ? oOldSite.status : '') + '">')} 
				aHTML.push((oOldSite.status) ? $.grep(aStatus, function(x) {return x.id == oOldSite.status}).shift().text : '&nbsp;'); 
				if (!bInnerOnly) {aHTML.push('</td>')}
			}

			if (bColumn2 || bAll)
			{
				if (!bInnerOnly) 
				{
					aHTML.push('<td class="ns1blankspaceRow oldAddress"' + 
								' data-address="' + oOldSite.address + '"' +
								' data-addressLink="' + oOldSite.addressLink + '">')
				}
				aHTML.push((oOldSite.siteText ? oOldSite.siteText : '&nbsp;')); 
				if (!bInnerOnly) {aHTML.push('</td>')}
			}

			if (bColumn3 || bAll)
			{
				if (!bInnerOnly) 
				{
					aHTML.push('<td class="ns1blankspaceRow newAddress"' +
								' data-address="' + oNewSite.address + '"' +
								' data-addressLink="' + oNewSite.addressLink + '">');
				}
				aHTML.push((oNewSite.siteText ? oNewSite.siteText : '&nbsp;'));
				if (!bInnerOnly) {aHTML.push('</td>')}
			}

			if (bColumn4 || bAll)
			{
				if (!bInnerOnly) {aHTML.push('<td class="ns1blankspaceRow addressAction">')}

				if (bToBeAdded)
				{
					aHTML.push('To be added');
				}
				else
				{
					if (bOldSiteRow)
					{
						aHTML.push('<input type="checkbox" class="ns1blankspaceAgriTempTraineeSiteUpdate" value="site-' + i + '"> Update<br />');
					}
					aHTML.push('<span class="addAddress" id="addAddress-' + i + '"></span>');
				}
				if (!bInnerOnly) {aHTML.push('</td></tr>')}
			}

			return aHTML.join('');
		},

		bind: function(oParam)
		{
			if (oParam.newAddress)
			{
				$(oParam.newAddress)
					.css('cursor', 'move')
					.draggable(
					{
						helper: function()
						{
						 	return '<div class="ns1blankspaceDragList"><img src="/site/' + nsFreshcare.site + '/move_files_small.png"></div>';
						},
						cursor: 'move'
					})
					.droppable(
					{
					 	drop: function(event, ui) 
				 		{
				 		  	// make sure we can drop it here first
				 		  	var oDragged = $(ui.draggable).first();
				 		  	var oDropped = event.target;
				 		  	if ($(oDropped).parent().hasClass('addressSites') 
				 		  		&& $(oDropped).parent().attr('id') != $(oDragged).parent().attr('id'))
				 		  	{
					 		  	nsFreshcare.admin.newelearning.findDuplicates.dropAddress(
					 		  	{
					 		  		source: oDragged, target: oDropped
					 		  	});
					 		}
					 		else
					 		{

					 		}
				 		}
					});
			}

			if (oParam.addAddress)
			{
				$(oParam.addAddress)
					.button(
					{
						label: 'Add'
					})
					.css('font-size', '0.825em')
					.css('width', '75px')
					.on('click', function()
					{
						// If the address is new, move it to the bottom of the table
						var oXHTMLRow = $(this).parent().parent();
						var iNewIndex = $('tr.addressSites').length;
						$('tr.addressSites').last().after(nsFreshcare.admin.newelearning.findDuplicates.siteHTML(
							{
								xhtmlRow: oXHTMLRow, index: iNewIndex, toBeAdded: true
							}));

						$('#' + $(oXHTMLRow).attr('id') + ' .newAddress')
							.html('')
							.removeAttr('data-address')
							.removeAttr('data-addressLink');
						$('#' + $(oXHTMLRow).attr('id') + ' .addressAction')
							.html('');
						nsFreshcare.admin.newelearning.findDuplicates.bind({newAddress: '#addressSite-' + iNewIndex + ' .newAddress'});

						$('#addAddress-' + this.id.split('-').pop())
							.button('destroy')
							.html('');
						
						// The source row is now blank - remove the whole row
						if (($('#' + oXHTMLRow.attr('id') + ' oldAddress').html() == '' || $('#' + oXHTMLRow.attr('id') + ' oldAddress') == '&nbsp;') 
							&& ($('#' + oXHTMLRow.attr('id') + ' newAddress').html() == '' || $('#' + oXHTMLRow.attr('id') + ' newAddress').html() == '&nbsp;'))
						{
							$(oXHTMLRow).remove();	
						}

					});
			}
		},

		dropAddress: function(oParam)
		{
			var oSource = ns1blankspace.util.getParam(oParam, 'source').value;
			var oTarget = ns1blankspace.util.getParam(oParam, 'target').value;
			var bSwap = false;
			oSource.opts = {};
			oTarget.opts = {};

			oSource.opts.rowIndex = $(oSource).parent().attr('id').split('-').pop();
			oSource.opts.xhtml = $(oSource).html();
			oSource.opts.address = $(oSource).attr('data-address');
			oSource.opts.addressLink = $(oSource).attr('data-addresslink');
			oSource.opts.actionXHTML = $('#addressSite-' + oSource.opts.rowIndex + ' .addressAction').html();
			oTarget.opts.rowIndex = $(oTarget).parent().attr('id').split('-').pop();
			oTarget.opts.xhtml = $(oTarget).html();
			oTarget.opts.address = $(oTarget).attr('data-address');
			oTarget.opts.addressLink = $(oTarget).attr('data-addresslink');
			oTarget.opts.actionXHTML = $('#addressSite-' + oTarget.opts.rowIndex + ' .addressAction').html();

			// If there's something in the row already we'll have to swap them
			bSwap = (oTarget.opts.xhtml != '' && oTarget.opts.xhtml != '&nbsp;');

			// If user is moving from 'To be added' to an existing row, replace action text with original content
			//if ($('#addressSite-' + oTarget.opts.rowIndex + ' .oldAddress').html() != '' && $('#addressSite-' + oTarget.opts.rowIndex + ' .oldAddress').html() != '&nbsp;')
			//{
			//	oSource.opts.actionXHTML = oSource.opts.actionXHTML.replace('To be added', '<span class="addAddress" id="addAddress-' + oSource.opts.rowIndex + '"></span>')
			//	oTarget.opts.actionXHTML= oTarget.opts.actionXHTML.replace('To be added', '<span class="addAddress" id="addAddress-' + oTarget.opts.rowIndex + '"></span>')
			//}

			// Set the values in target columns
			$(oTarget).html(oSource.opts.xhtml);
			$(oTarget).attr('data-address', oSource.opts.address);
			$(oTarget).attr('data-addresslink', oSource.opts.addressLink);
			//$('#addressSite-' + oTarget.opts.rowIndex + ' .addressAction').html(oSource.opts.actionXHTML.replace('addAddress-' + oSource.opts.rowIndex, 'addAddress-' + oTarget.opts.rowIndex));
			$('#addressSite-' + oTarget.opts.rowIndex + ' .addressAction').html(nsFreshcare.admin.newelearning.findDuplicates.siteHTML(
				{
					xhtmlRow: $(oTarget).parent(),
					innerOnly: true,
					column4: true,
					index: oTarget.opts.rowIndex
				}));
			$('#addressSite-' + oSource.opts.rowIndex + ' .addressAction').children().last().button('destroy')
			$('#addressSite-' + oSource.opts.rowIndex + ' .addressAction').html('');
			
			nsFreshcare.admin.newelearning.findDuplicates.bind({addAddress: '#addressSite-' + oTarget.opts.rowIndex + ' .addAddress'});

			$(oSource).html(oTarget.opts.xhtml);
			if (bSwap)
			{
				$(oSource).attr('data-address', oTarget.opts.address);
				$(oSource).attr('data-addresslink', oTarget.opts.addressLink);
				//$('#addressSite-' + oSource.opts.rowIndex + ' .addressAction').html(oTarget.opts.actionXHTML.replace('addAddress-' + oTarget.opts.rowIndex, 'addAddress-' + oSource.opts.rowIndex));
				$('#addressSite-' + oSource.opts.rowIndex + ' .addressAction').html(nsFreshcare.admin.newelearning.findDuplicates.siteHTML(
				{
					xhtmlRow: $(oSource).parent(),
					innerOnly: true,
					column4: true,
					index: oSource.opts.rowIndex,
					toBeAdded: (oSource.opts.actionXHTML == 'To be added')
				}));
				nsFreshcare.admin.newelearning.findDuplicates.bind({addAddress: '#addressSite-' + oSource.opts.rowIndex + ' .addAddress'});
			}
			
			// The source row is now blank - remove the whole row
			if (($(oSource).html() == '' || $(oSource).html() == '&nbsp;') 
				&& ($('#addressSite-' + oSource.opts.rowIndex + ' .oldAddress').html() == '' || $('#addressSite-' + oSource.opts.rowIndex + ' .oldAddress').html() == '&nbsp;'))
			{
				$('#addressSite-' + oSource.opts.rowIndex).remove();	
			}

			delete(oSource.opts);
			delete(oTarget.opts);
		},

		displayResults: function()
		{
			var aHTML = [];

			if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness)
			{
				$('#eLearningContactBusinessLabel').html('Training is for existing Business:');	
				$('#eLearningContactBusiness').html(nsFreshcare.admin.newelearning.data.matchingData.tradename.formatXHTML());

				// Display details being updated if any
				if (nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.length > 0)
				{
					aHTML.push('<tr class="tempRow"><td class="ns1blankspaceSubNote" colspan="2"><strong>Business details to be updated:</strong></td></tr>' +
								'<tr class="tempRow"><td class="ns1blankspaceSubNote" style="text-decoration: underline;">Existing Value</td>' +
										'<td class="ns1blankspaceSubNote" style="text-decoration: underline;">New Value</td></tr>');

					$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness, function(i, key)
					{
						var sKeyMatch = (key.substr(0,4) == 'mail' || key.substr(0,6) == 'street') ? 'business' + key : (key == 'businessname' ? 'legalname' : key);
						var sKeyContext = (key.substr(0,6) == 'street') ? key.replace('street', '') : key;
						aHTML.push('<tr class="tempRow"><td class="ns1blankspaceSubNote" style="valign: top;">' +
										nsFreshcare.admin.newelearning.data.matchingData[sKeyMatch] + '</td>' +
									'<td class="ns1blankspaceSubNote" style="valign: top;">' + 
									ns1blankspace.objectContextData[sKeyContext] + '</td></tr>');	
					});
					aHTML.push('<tr class="tempRow"><td class="ns1blankspaceSubNote">&nbsp;</td><td class="ns1blankspaceSubNote">&nbsp;</td></tr>');
					
					$('#eLearningContactBusiness').parent().after(aHTML.join(''));
				}
			}
			else
			{
				$('#eLearningContactBusinessLabel').html(ns1blankspace.objectContextData.tradename == '' 
													? 'No business to create.' : 'Create new Business:');
				$('#eLearningContactBusiness').html(ns1blankspace.objectContextData.tradename.formatXHTML());
			}

			aHTML = [];
			if (nsFreshcare.admin.newelearning.data.matchingData.contactPerson)
			{
				$('#eLearningContactPersonLabel').html('Training is for existing Person:');	
				$('#eLearningContactPerson').html(nsFreshcare.admin.newelearning.data.matchingData.firstname.formatXHTML() + ' ' +
												  nsFreshcare.admin.newelearning.data.matchingData.surname.formatXHTML());

				// Display details being updated if any
				if (nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson.length > 0)
				{
					aHTML.push('<tr class="tempRow"><td class="ns1blankspaceSubNote" colspan="2"><strong>Person details to be updated:</strong></td></tr>' +
								'<tr class="tempRow"><td class="ns1blankspaceSubNote" style="text-decoration: underline;">Existing Value</td>' +
										'<td class="ns1blankspaceSubNote" style="text-decoration: underline;">New Value</td></tr>');

					$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson, function(i, key)
					{
						key = (key == 'title') ? 'titletext' : key;
						var sKeyMatch = (key.substr(0,4) == 'mail' || key.substr(0,6) == 'street') ? 'person' + key : key;
						var sKeyContext = (key == 'position') ? 'jobtitle' : (key == 'workphone' ? 'phone' : key);
						sKeyContext = sKeyContext.replace('street', '');
						aHTML.push('<tr class="tempRow"><td class="ns1blankspaceSubNote" style="valign: top;">' +
										nsFreshcare.admin.newelearning.data.matchingData[sKeyMatch] + '</td>' +
									'<td class="ns1blankspaceSubNote" style="valign: top;">' + 
										ns1blankspace.objectContextData[sKeyContext] + '</td></tr>');	
					});
					aHTML.push('<tr class="tempRow"><td class="ns1blankspaceSubNote">&nbsp;</td><td class="ns1blankspaceSubNote">&nbsp;</td></tr>');

					$('#eLearningContactPerson').parent().after(aHTML.join(''));
				}
			}
			else
			{
				$('#eLearningContactPersonLabel').html('Create new Person:');
				$('#eLearningContactPerson').html(ns1blankspace.objectContextData.firstname.formatXHTML() + ' ' +
												  ns1blankspace.objectContextData.surname.formatXHTML());
			}

			$('.eLearningImportStepHeader[data-value="3"]').show().click();
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
			var bNoBusiness = false;
			if (oParam.configureTraineeStep == undefined) {oParam.configureTraineeStep = 0; oParam.configure = {}}

			// Get the Course Package id and title 
			if (oParam.configureTraineeStep === 0)
			{
				// v3.4.002 SUP023880 Now uses stored Traiing Pakcage details that come from eLearning
				if (ns1blankspace.objectContextData.setrainingpackage == "")
				{
					ns1blankspace.status.error("Please choose a Training Package before continuing.")
				}
				else
				{
					oParam.configure.packageID = ns1blankspace.objectContextData.setrainingpackage;
					oParam.configure.packageTitle = ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.title'];
					oParam.configure.codeOfPractice = ns1blankspace.objectContextData.codeofpractice;
					if (oParam.configure.packageTitle == "" || oParam.configure.codeOfPractice == "" )
					{	// v3.4.016 Fix typo
						ns1blankspace.status.error('The Training Package is invalid. Please choose another training package before continuing.');
					}
					else
					{
						oParam.configureTraineeStep = 1;
						nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
					}
				}
			}
			
			// Direct code depending on whether the Trainee is a Member or otherwise
			else if (oParam.configureTraineeStep === 1)
			{
				// First check if record has business details.
				bNoBusiness = (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness == undefined 
						&& (ns1blankspace.objectContextData.seregisternewbusiness == 'N'
						&& (ns1blankspace.objectContextData.businessname == '' || ns1blankspace.objectContextData.tradename == '')));
						
				if ($('[name="radioTraineeType"]:checked').val() == '1')
				{
					// Go thru steps 2, 3, 4, 5, 6 and 9
					// If not a Business, then they can't be a member
					if (bNoBusiness)
					{
						ns1blankspace.status.error('You have chosen "Member" as the trainee type but you have not chosen a matching business for this trainee. ' +
													'Please choose a matching business, or change the Register Business flag.');
						return false;
						delete(oParam.configureTraineeStep);
						delete(oParam.configure);
					}
					else
					{
						// v3.4.010 SUP023918 We need to check for exact Legal / Trading Name duplciates first
						oParam.configure.isMember = true;
					    oParam.configureTraineeStep = "1a";
					    oParam.nextStep = 2;
					 }
				}
				else
				{
					// Go thru steps 8, 3, 6 and 9
					oParam.configure.isMember = false;
					if (bNoBusiness)
					{
						oParam.configureTraineeStep = 8;
					}
					else
					{
						oParam.configureTraineeStep = "1a";
						oParam.nextStep = 8;
					}
				}
				nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			}

			// v3.4.010 SUP023918 Check for exact duplicate Trading / Legal name
			else if (oParam.configureTraineeStep === "1a")
			{
				oParam.configureTraineeStep = oParam.nextStep || oParam.configureTraineeStep;
				delete(oParam.nextStep);

				// Don't check if matching business chosen - it won't be added again so no potential for it to duplicate
				if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness == undefined)
				{
					oParam.onComplete = nsFreshcare.admin.newelearning.processTrainee.configure;
					nsFreshcare.admin.newgrower.createNewGrower.checkForExactMatch(oParam);
				}
				else
				{
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}

			// Member and the member exists
			else if (oParam.configureTraineeStep === 2)
			{
				oParam.configureTraineeStep = 3;
				if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
				{
					console.log('Member exists');
					oParam.configure.createBusiness = false;
					if(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.length > 0)
					{
						console.log('The ContactBusiness must be updated');
						oParam.configure.updateBusiness = true;
					}
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
				else
				{
					oParam.configure.createBusiness = true;
					console.log('A new Member must be created including all related sub-tables');
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}

			// Business exists - check if business has selected business groups (or Member) and flag to add if not
			else if (oParam.configureTraineeStep === 3)
			{
				ns1blankspace.status.working('Searching for business group..');
				var aBusinessGroups = (oParam.configure.isMember)
										? [nsFreshcare.data.businessGroupGrowerID]
										: $.map($('#eLearningImportTraineeTypeBusiness_SelectRows .ns1blankspaceMultiSelect'), function(x)
											{return $(x).attr('id').split('-').pop()})
				if ($('[name="radioTraineeType"]:checked').val() == '2')
				{
					aBusinessGroups.push(nsFreshcare.data.businessGroupAuditor);
				}
				else if ($('[name="radioTraineeType"]:checked').val() == '3')
				{
					aBusinessGroups.push(nsFreshcare.data.businessGroupTrainer);
				}

				if (aBusinessGroups.length > 0 && nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
				{
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_BUSINESS_GROUP_LINK_SEARCH';
					oSearch.addField('group');
					oSearch.addFilter('contactbusiness', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactBusiness);
					oSearch.addFilter('group', 'IN_LIST', aBusinessGroups.join(','));
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.configure.createBusinessGroups = nsFreshcare.util.arrayCompare(aBusinessGroups, $.map(oResponse.data.rows, function(x) {return x.group}), false);
							oParam.configureTraineeStep = (oParam.configure.isMember) ? 31 : 6;
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find existing Business Groups: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					oParam.configure.createBusinessGroups = aBusinessGroups;
					oParam.configureTraineeStep = (oParam.configure.isMember) ? 31 : 6;	// Members check relationships, non-members check person groups
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}
			
			// v3.4.005 Member and business exists - check if already a Member and if not, see if there's a primarycontact
			// v3.4.007 Need tomake sure it IS an existing business, otherwise skip this step
			else if (oParam.configureTraineeStep == 31)
			{
				// v3.4.010 SUP023977 Was converting businesses when createBusinessGroups was empty
				oParam.configure.convertBusiness = false;
				oParam.configureTraineeStep = 4;
				if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness 
					&& oParam.configure.createBusinessGroups && oParam.configure.createBusinessGroups.length > 0 
					&& $.inArray(nsFreshcare.data.businessGroupGrower, oParam.configure.createBusinessGroups) == -1)
				{
					oParam.configure.convertBusiness = true;
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_BUSINESS_SEARCH';
					oSearch.addField('tradename,primarycontactperson');
					oSearch.addFilter('id', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactBusiness);
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.configure.hasPrimaryContact = (oResponse.data.rows.length > 0 && oResponse.data.rows[0].primarycontactperson != '');
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to determine primary contact: ' + oResponse.error.errornotes);
						}
					});
				}
				else
				{
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}
			
			// Member and business exists - check if trainer relationship exists and set flag to add Relationship if not
			else if (oParam.configureTraineeStep === 4)
			{
				oParam.configureTraineeStep = 5;
				if (oParam.configure.isMember && oParam.configure.createBusiness)
				{
					oParam.configure.createRelationship = true;	
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
				else
				{
					ns1blankspace.status.working('Searching for Trainer relationship..');
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
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find Trainer Relationship:' + oResponse.error.errornotes);
						}
					});
				}
			}
			
			// Member and business exists - check to see if member already has Membership and set flag to add if not
			else if (oParam.configureTraineeStep === 5)
			{
				oParam.configureTraineeStep = 6;
				if (oParam.configure.isMember && oParam.configure.createBusiness)
				{
					oParam.configure.createSubscription = true;
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
				else
				{
					ns1blankspace.status.working('Searching for existing Membership..');
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
							nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
						}
						else
						{
							ns1blankspace.status.error('Unable to find existing Membership:' + oResponse.error.errornotes);
						}
					});
				}
			}

			// Check Person settings. Check if updates are required and if selected person groups (plus 'Trainee') exist
			else if (oParam.configureTraineeStep === 6)
			{
				var aPersonGroups = $.map($('#eLearningImportTraineeTypePerson_SelectRows .ns1blankspaceMultiSelect'), function(x)
										{return $(x).attr('id').split('-').pop()}).concat([nsFreshcare.data.groupELearningTrainee]);
				if ($('[name="radioTraineeType"]:checked').val() == '2')
				{
					aPersonGroups.push(nsFreshcare.data.groupAuditor.join(','));
				}
				else if ($('[name="radioTraineeType"]:checked').val() == '3')
				{
					aPersonGroups.push(nsFreshcare.data.groupTrainer.join(','));
				}

				if (nsFreshcare.admin.newelearning.data.matchingData.contactPerson != undefined)
				{
					ns1blankspace.status.working('Searching for person groups..');
					console.log('Person exists');
					oParam.configure.isPerson = true;
					oParam.configure.createPerson = false;
					if (nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson.length > 0)
					{
						oParam.configure.updatePerson = true;
						console.log('The ContactPerson must be updated');
					}
					else
					{
						oParam.configure.updatePerson = false;
					}
					
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_GROUP_LINK_SEARCH';
					oSearch.addField('group');
					oSearch.addFilter('contactperson', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactPerson);
					oSearch.addFilter('group', 'IN_LIST', aPersonGroups.join(','));
					oSearch.sort('group', 'asc');
					oSearch.getResults(function(oResponse)
					{
						if (oResponse.status == 'OK')
						{
							oParam.configure.createPersonGroups = nsFreshcare.util.arrayCompare(aPersonGroups, $.map(oResponse.data.rows, function(x) {return x.group}), false);
							oParam.configureTraineeStep = 7;
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
					oParam.configure.createPersonGroups = aPersonGroups;
					console.log('A new Person must be created');
					oParam.configureTraineeStep = 7;
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}

			// Check if Membership_Trainer exists (only for Auditor and Trainers)
			else if (oParam.configureTraineeStep == 7)
			{
				if ($('[name="radioTraineeType"]:checked').val() == '2' 
					|| $('[name="radioTraineeType"]:checked').val() == '3')
				{
					if (nsFreshcare.admin.newelearning.data.matchingData.contactPerson != undefined)
					{
						var oSearch = new AdvancedSearch();
						oSearch.method = 'AGRI_MEMBERSHIP_TRAINER_SEARCH';
						oSearch.addField('membership,membershiptext,trainercontactperson,trainercontactpersontext,' +
										'trainercontactbusiness,trainercontactbusinesstext,agrimembershiptrainer.membership.code');
						oSearch.addField(ns1blankspace.option.auditFields);
						oSearch.addFilter('trainercontactperson', 'EQUAL_TO', nsFreshcare.admin.newelearning.data.matchingData.contactPerson);
						oSearch.addFilter('membership', 'EQUAL_TO', ns1blankspace.objectContextData.membership);
						oSearch.getResults(function(oResponse)
						{
							if (oResponse.status == 'OK')
							{
								if (oResponse.data.rows.length == 0)
								{
									oParam.configure.createPersonMembership = true;
								}
								oParam.configureTraineeStep = 9;
								nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
							}
							else
							{
								ns1blankspace.status.error('Error finding ' + $('[name="radioTraineeType":checked]').attr('data-text') + ' Standards: ' + oResponse.error.errornotes);
							}
						});
					}
					else
					{
						oParam.configure.createPersonMembership = true;
						oParam.configureTraineeStep = 10;
						nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
					}
				}
				else
				{
					oParam.configureTraineeStep = (nsFreshcare.admin.newelearning.data.matchingData.contactPerson ? 9 : 10);
					nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
				}
			}

			// Non-Member Businesses - if exists, check if updates are required. 
			else if (oParam.configureTraineeStep === 8)
			{
				if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
			  	{
			  		console.log('Business exists');
			  		oParam.configure.createBusiness = false;
			  		if(nsFreshcare.admin.newelearning.data.matchingData.updateOnBusiness.length > 0)
			  		{
			  			oParam.configure.updateBusiness = true;
			  			console.log('The ContactBusiness must be updated');
			  		}
			  		oParam.configureTraineeStep = 3;	// Check and set Business groups to be added
			  		nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			  	}
			  	else if (ns1blankspace.objectContextData['seregisternewbusiness'] == 'Y')
			  	{
			  		oParam.configure.createBusiness = true;
			  		console.log('A new ContactBusiness must be created ');
			  		oParam.configureTraineeStep = 3;	// Check and set Business groups to be added
			  		nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			  	}
			  	else
			  	{
			  		oParam.configure.personOnly = true;
			  		// Business data has been entered but user chose for no business to be registered
			  		if (nsFreshcare.admin.newelearning.data.matchingData.contactBusiness == undefined
			  			&& ns1blankspace.objectContextData.businessname != '')
			  		{
			  			ns1blankspace.status.clear();
			  			ns1blankspace.container.confirm(
			  			{
			  				title: 'Warning!',
			  				html: 'The Trainee has indicated that they did not have a business to register but a business name ' +
			  						'has been entered.<br /><br >' +
			  					  'Please note that NO BUSINESS record will be created, only a person record. If you do not wish this to ' +
			  					  	'happen, click Cancel and adjust the data accordingly prior to creating the Trainer. ' +
			  					  	'Otherwise, click Continue to add the Trainee as a person only.',
			  				buttons:
			  				[
			  					{
			  						text: 'Cancel',
			  						click: function()
			  						{
			  							$('#ns1blankspaceBootstrapDialog').modal('hide');
			  							oParam = {};
			  						}
			  					},
			  					{
			  						text: 'Continue',
			  						click: function()
			  						{
			  							$('#eLearningContactBusinessLabel').html('No business to create.');
			  							$('#eLearningContactBusiness').html('');
			  							$('#ns1blankspaceBootstrapDialog').modal('hide');
									  	oParam.configureTraineeStep = 3;	// Check person groups
										nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			  						}
			  					}
			  				]
			  			});
			  		}
			  		else
			  		{
					  	oParam.configureTraineeStep = 3;	// Check person groups
						nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			  		}
			  	}
			}
			
			// Check if selected Person belongs to a different business to the selected business
			else if (oParam.configureTraineeStep === 9)
			{
				if (nsFreshcare.admin.newelearning.data.matchingData.personBusiness != nsFreshcare.admin.newelearning.data.matchingData.contactBusiness
					&& nsFreshcare.admin.newelearning.data.matchingData.contactBusiness != undefined)
			 	{
			 		console.log('Person is already linked to another business.');
			 		console.log('Store id of other business and person');
			 		console.log('New person must be created');
			 		oParam.configure.otherBusinessTrainee = nsFreshcare.admin.newelearning.data.matchingData.personBusiness;
			 		oParam.configure.otherPersonTrainee =  nsFreshcare.admin.newelearning.data.matchingData.contactPerson;
			 		oParam.configure.createPerson = true;
			 		oParam.configure.updatePerson = false;
			 		oParam.configure.createPersonGroups = $.map($('#eLearningImportTraineeTypePerson_SelectRows .ns1blankspaceMultiSelect'), function(x)
										{return $(x).attr('id').split('-').pop()}).concat([nsFreshcare.data.groupTrainee]);
			 	}
			 	oParam.configureTraineeStep = 10;
				nsFreshcare.admin.newelearning.processTrainee.configure(oParam);
			}

			// We've configured everything - tell the user what's going to happen and ask if they want to continue
			else if (oParam.configureTraineeStep === 10)
			{
				delete(oParam.configureTraineeStep);
				ns1blankspace.status.clear();
				var oConfig = oParam.configure;
				var sTempText = '';
				var aHTML = [];
				// isMember
				// convertBusiness
				// updateBusiness
				// createBusiness
				// createBusinessGroups
				// createRelationship
				// createSubscription
				// subscriptionId
				// isPerson
				// createPerson
				// updatePerson
				// createPersonGroups
				// personOnly

				// Now ask user to confirm what's going to happen
				aHTML.push('Trainee....' + '<br /><br /><ul>');
				
				sTempText = $.map($('#eLearningImportTraineeTypeBusiness_SelectRows .ns1blankspaceMultiSelect'), function(x)
											{return $(x).html()}).join(', ');
				if (sTempText == '')
				{
					sTempText = $.map($('#eLearningImportTraineeTypePerson_SelectRows .ns1blankspaceMultiSelect'), function(x)
											{return $(x).html()}).join(', ');
					if (sTempText == '')
					{
						sTempText = $('[name="radioTraineeType"]:checked').attr('data-text');
					}
				}
				
				if (oConfig.personOnly)
				{
					aHTML.push('<li>is NOT a business. Only the Trainee individual will be registered.</li>');
					aHTML.push('<li>is a' + (oConfig.createPerson ? ' new ' : 'n existing ') + sTempText + ' person.</li>');
					if (oConfig.updatePerson)
					{
						aHTML.push('<li>will have data updated on the Person record.</li>');
					}
					if (oConfig.createRelationship)
					{
						aHTML.push('<li>will have a relationship link to the Trainer created.</li>');
					}
					//if (oConfig.createPersonGroups && oConfig.createPersonGroups.length > 0)
					//{
					//	aHTML.push('<li>will have ' + $.map().join(', ') + ' groups added.</li>');
					//}
					if (oConfig.createPersonMembership)
					{
						aHTML.push('<li>will have a link to the ' + ns1blankspace.objectContextData.membershiptext + ' standard created.</li>');
					}
				}
				else
				{
					aHTML.push('<li>is a' + (oConfig.createBusiness ? ' new' : 'n existing') + ' ' +
								(oConfig.convertBusiness ? 'non-' + nsFreshcare.data.growerText : sTempText) + ' business' + 
								(oConfig.convertBusiness ? ' to be converted to a ' + nsFreshcare.data.growerText : '.') + '</li>');
					if (oConfig.updateBusiness)
					{
						aHTML.push('<li>will have data updated on the Business record.</li>');
					}
					
					sTempText = $.map($('#eLearningImportTraineeTypePerson_SelectRows .ns1blankspaceMultiSelect'), function(x)
											{return $(x).html()}).join(', ');
					aHTML.push('<li>is a' + (oConfig.createPerson ? ' new ' : 'n existing ') + sTempText + ' person.</li>');
					if (oConfig.updatePerson)
					{
						aHTML.push('<li>will have data updated on the Person record.</li>');
					}
					
					if (oConfig.createRelationship)
					{
						aHTML.push('<li>will have a relationship link to the Trainer created.</li>');
					}

					if (oConfig.isMember)
					{
						if (oConfig.createSubscription)
						{
							aHTML.push('<li>will have a new Membership created for ' + ns1blankspace.objectContextData.membershiptext.formatXHTML() + '.</li>');
						}
						else
						{
							aHTML.push('<li>already has the ' + ns1blankspace.objectContextData.membershiptext.formatXHTML() + ' membership.</li>');
						}
					}
					if (oConfig.createPersonMembership)
					{
						aHTML.push('<li>will have a link to the ' + ns1blankspace.objectContextData.membershiptext + ' standard created.</li>');
					}
				}
				aHTML.push('</ul>');

				/*$('#ns1blankspaceMultiUseDialog')
				.html('<span style="font-size: 0.75em">' + aHTML.join('') + '</span>')
				.css('position', 'static')
				.dialog(
				{
					modal: true,
					title: 'Confirm Import settings',
					width: 400,
					height: 300,
					open: function(event, ui) 
					{ 
						$('.ui-dialog-titlebar-close').hide();
						$('.ui-dialog-buttonset').children().css('font-size', '0.625em');
						$('.ui-dialog-buttonset').css('text-align', 'center')
						$('.ui-dialog-title').css('font-size', '0.75em');
					},
					buttons:
					[
						{
							text: 'Continue',
							click: function()
							{
								$(this).dialog('destroy');
								$('#ns1blankspaceMultiUseDialog')
								.css({'width': '', 'height': ''});
								nsFreshcare.admin.newelearning.processTrainee.send(oParam);
							}
						},
						{
							text: 'Cancel',
							click: function()
							{
								delete(oParam);
								$(this).dialog('destroy');
								$('#ns1blankspaceMultiUseDialog')
								.css({'width': '', 'height': ''});
							}
						}
					]
				});*/
				ns1blankspace.container.confirm(
				{
					title: 'Confirm Import settings',
					html: '<span style="font-size: 0.75em">' + aHTML.join('') + '</span>',
					buttons:
					[
						{
							text: 'Continue',
							name: 'btnContinue',
							click: function()
							{
								$('#ns1blankspaceBootstrapDialog').modal('hide').html('');
								nsFreshcare.admin.newelearning.processTrainee.send(oParam);
							}
						},
						{
							text: 'Cancel',
							name: 'btnCancel',
							click: function()
							{
								delete(oParam);
								$('#ns1blankspaceBootstrapDialog').modal('hide').html('');
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
						$('.modal-dialog').css('width', '400').css('height', '300');
					}
				});
			}
		},

		send: function(oParam)
		{
			oParam = oParam || {};
			oParam.createNewGrowerStep = oParam.createNewGrowerStep || 1;

			if (oParam.createNewGrowerStep === 1)
			{
				// v3.4.001 Don't need to add objects to saveObjects as it's all done in the extendedTasks section
				oParam.functionValidate = nsFreshcare.admin.newgrower.save.validate;
				oParam.functionSaveDetails = nsFreshcare.admin.newgrower.createNewGrower.details;
				oParam.functionSaveAddress = nsFreshcare.admin.newgrower.createNewGrower.address;
				oParam.functionSaveMore = nsFreshcare.admin.newgrower.createNewGrower.extendedTasks;
				oParam.newMembership = (oParam.configure.createSubscription == true);
				oParam.functionSearch = nsFreshcare.admin.newgrower.updateTempTraineeStatus;
				oParam.createNewGrowerStep = 2;

				if ($('#ns1blankspaceMainDetails').html() === '')
				{
					$('#ns1blankspaceMainDetails').attr('data-loading', '1');
					nsFreshcare.admin.newgrower.details();
					$('#ns1blankspaceMainDetails').hide();
				}
				if ($('#ns1blankspaceMainAddress').html() === '')
				{
					$('#ns1blankspaceMainAddress').attr('data-loading', '1');
					oParam.onComplete = nsFreshcare.admin.newelearning.processTrainee.send;
					nsFreshcare.admin.newgrower.address(oParam);
				}
				else
				{
					nsFreshcare.admin.newelearning.processTrainee.send(oParam);
				}

			}

			else if (oParam.createNewGrowerStep == 2)
			{
				// Now we need to construct the data to be saved
				// Add / update business and business groups
				// Add / Update person and person groups
				$('#ns1blankspaceMainAddress').hide()
				oParam.functionInvalidData = nsFreshcare.admin.newgrower.createNewGrower.dataError;
				nsFreshcare.admin.newgrower.data.objectContext = ns1blankspace.objectContext;
				nsFreshcare.admin.newgrower.data.objectContextData = ns1blankspace.objectContextData;

				if (oParam.configure.createBusiness)
				{
					console.log('Create Business');
					ns1blankspace.newGrower = (oParam.configure.isMember); 
					ns1blankspace.objectContext = -1;
				}
				else
				{
					// Update business or we're not creating one
					if (oParam.configure.personOnly != true)
					{
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
					else
					{
						console.log('No business selected');
						ns1blankspace.objectContext = '';
					}
				}

				if (oParam.configure.isPerson)
				{
					if (oParam.configure.createPerson)
					{
						ns1blankspace.newGrower = (oParam.configure.isMember); 
						ns1blankspace.objectContext = (oParam.configure.personOnly) ? '' : -1;
					}
					else
					{
						// Update Person. If no matching person selected, we need to add one
						if (nsFreshcare.admin.newelearning.data.matchingData.contactPerson != undefined)
						{
							console.log('Update Person');
							var objectPerson = {};
							$.each(nsFreshcare.admin.newelearning.data.matchingData.updateOnPerson, function(index, value)
							{
								objectPerson['contactbusiness.contactperson.' + value] = nsFreshcare.admin.newgrower.data.objectContextData['contactbusiness.contactperson.' + value];
							});
							
							objectPerson['contactbusiness.contactperson.id'] = nsFreshcare.admin.newelearning.data.matchingData.contactPerson;
							oParam.contactperson = {id: objectPerson['contactbusiness.contactperson.id']};
							$.extend(ns1blankspace.objectContextData, objectPerson);
						}
						else
						{
							console.log('Create Person');
							ns1blankspace.newGrower = (oParam.configure.isMember); 
							ns1blankspace.objectContext = -1;
						}
					}
				}

				// We're working with a Member
				if (oParam.configure.isMember)
				{
					// Add / Update Subscription & Subscription History (if new)
					// Add / update Category, Scope & Site data
					// Add / update relationships
					// Add Course
					// Back-update trainee attendance record (Business, Person, TmpTrainee) and TempTrainee record
					// Create Attendance link
					if(oParam.configure.subscriptionId != undefined)
					{
						oParam.subscription = {id: oParam.configure.subscriptionId};
					}
				}
				// For everyone
				// Add Course
				// Back-update trainee attendance record (Business, Person, TmpTrainee) and TempTrainee record
				// Create Attendance link
				nsFreshcare.admin.grower.save.send(oParam);
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