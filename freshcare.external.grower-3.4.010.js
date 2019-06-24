/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */

// v3.1.210 replaced all dialog('close') with dialog('destroy')
 
nsFreshcare.external.grower = 
{
	details: 	function ()
	{
		// 2.0.4 SUP021383
		//		 Replaced all instances of 'Category' on the UI with 'Certificate Scope'
		// 		 Replaced all instances of 'Product Group' on the UI with 'Category' - still need to switch elements
		// v3.2.020 SUP022964 eLearning Trainees logged into Freshcare

		// v3.1.001 SUP023456 Now sets flags to determine where we came from
		var bAuditorGrower = (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor && ns1blankspace.objectName == 'grower');
		var bGrowerGrower = (nsFreshcare.user.roleID == nsFreshcare.data.roles.grower && ns1blankspace.objectName == 'grower'); 
		var bTrainerGrower = (nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer && ns1blankspace.objectName == 'grower');
		var bNewGrowerFromTrainer = (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin && ns1blankspace.objectName == 'newgrower');
		var bNewGrowerELearning = (nsFreshcare.user.roleID == nsFreshcare.data.roles.admin && ns1blankspace.objectName == 'newelearning');
		var bNewTrainingCourseGrower = (ns1blankspace.objectContext == -1 && ns1blankspace.objectName == "grower" && !bAuditorGrower);

		var aHTML = [];
		var aElements = [];
		
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
			// 3.0.1 Added this section for admin - used when in New Grower from Trainer
			if (bNewGrowerELearning || bNewGrowerFromTrainer)
			{
				// v3.4.002 SUP023880 Added
				if (bNewGrowerELearning)
				{
					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew ns1blankspaceHideOnNewTrainee">' +
									'<td class="ns1blankspaceCaption">' +
									'Training Package' +
									'</td></tr>' +
									'<tr id="ns1blankspaceDetailsRowPackage" class="ns1blankspace ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceDetailsPackage" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');			
					aElements.push("Training Package");
				}

				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew ns1blankspaceHideOnNewTrainee">' +
								'<td class="ns1blankspaceCaption">' +
								'Membership' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowMembership" class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsMembership" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');			
				aElements.push("Membership");

				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew ns1blankspaceHideOnNewTrainee">' +
								'<td class="ns1blankspaceCaption">' +
								'Code of Practice' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowCOP" class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsCOP" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');			
				aElements.push("COP");

				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew ns1blankspaceHideOnNewTrainee">' +
								'<td class="ns1blankspaceCaption">' +
								'Training Date' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowTrainingDate" class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsTrainingDate" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');			
				aElements.push("TrainingDate");
			}
			else
			{
				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew ns1blankspaceHideOnNewTrainee">' +
								'<td class="ns1blankspaceCaption">' +
								'Company ID' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowReference" class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsReference" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');			
				aElements.push("Reference");
			}


			if (bNewGrowerELearning)
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Industry Role' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeIndustryRole" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSeIndustryRole" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
				aElements.push('SeIndustryRole');


				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Previous Training' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSePreviousTraining" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSePreviousTraining" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
				aElements.push('SePreviousTraining');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Register Business?' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeRegisterNewBusiness" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSeRegisterNewBusiness" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
				aElements.push('SeRegisterNewBusiness');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Existing Business?' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeExistingBusiness" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSeExistingBusiness" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
				aElements.push('SeExistingBusiness');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Certificate Number' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeCertificateNumber" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSeCertificateNumber" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
				aElements.push('SeCertificateNumber');
			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Trading Name' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowTradingName" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsTradingName" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('TradingName');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Legal Name' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowLegalName" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsLegalName" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('LegalName');				

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'ABN' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowABN" class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td id="ns1blankspaceDetailsABN" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('ABN');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Position' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowPosition" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsPosition" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('Position');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Title' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowTitle" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsTitle" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('Title');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Gender' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowGender" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsGender" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('Gender');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'First Name' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowFirstName" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsFirstName" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('FirstName');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Surname' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSurname" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsSurname" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');			
			aElements.push('Surname');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Phone' + ((ns1blankspace.objectContext === -1) ? '(include area code)' : '') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowPhone" class="ns1blankspace">' +
							'<td id="ns1blankspaceDetailsPhone" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			aElements.push('Phone');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Mobile' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowMobile" class="nsFreshcareReadOnly">' +
							'<td id="ns1blankspaceDetailsMobile" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			aElements.push('Mobile');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'Fax' + ((ns1blankspace.objectContext === -1) ? '(include area code)' : '') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowFax" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
							'<td id="ns1blankspaceDetailsFax" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			aElements.push('Fax');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							'Email' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowEmail" class="nsFreshcareReadOnly">' +
							'<td id="ns1blankspaceDetailsEmail" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			aElements.push('Email');

			// v2.0.3e No longer shows for growers
			if (bAuditorGrower)
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
								'Send Printed Certificates?' +
								'</td></tr>' +
								'<tr class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsSendPrintedCertificates" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				aElements.push('SendPrintedCertificates');
			}

			// v3.3.001 SUP023608 Added
			if (bGrowerGrower)
			{
				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
								'Receive Link Requests from Customers?' +
								'</td></tr>' +
								'<tr class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsReceiveLinkRequests" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				aElements.push('ReceiveLinkRequests');
			}

			if (bNewGrowerELearning || bNewGrowerFromTrainer)
			{
				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								'Crops' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowCrops" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsCrops" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				aElements.push('Crops');

				// v3.3.001 SUP023456 Now displays text according to Standard
				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption" id="ns1blankspaceDetailsHarvestMonthCaption">' +
								(ns1blankspace.objectContextData.membership == nsFreshcare.data.membershipSCS ? 'Operational' : 'Harvest') + ' Months' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowHarvestMonths" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsHarvestMonths" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				aElements.push('HarvestMonths');

				// v3.1.2 SUP022744 Moved so that only shows for admin when in 'New Grower from trainee'
				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								'Certificate Scope' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowScope" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsScope" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				aElements.push('Scope');

				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								'Category' +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowProductGroup" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsProductGroup" class="nsFreshcareReadOnly">&nbsp;' +
								'</td></tr>');
				aElements.push('ProductGroup');
			}

			aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'Notes' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowNotes" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
							'<td id="ns1blankspaceDetailsNotes" class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');
			aElements.push('Notes');

			aHTML.push('</table>');					
			
			if (ns1blankspace.objectContext != -1) {
				$('#ns1blankspaceDetailsColumn1').html(aHTML.join(''));
			}
			
			var aHTML = [];
				
			aHTML.push('<table class="ns1blankspace">');
			
			// 3.0.1 We also use this form to display Growers added in by trainers in admin login
			if (bNewTrainingCourseGrower || bNewGrowerELearning || bNewGrowerFromTrainer)
			{
				// If Trainer or Admin logon and a new Grower, we need to choose the Package & training course
				// v3.2.020 SUP022975 Wasn't displaying these fields if logging from admin
				var aTrainerMemberships = (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer)
							? $.map(nsFreshcare.data.trainerMemberships, function(a) {return a.membership})
							: $.map(nsFreshcare.data.memberships, function(a) {return a.id});

				var dToday = new Date();
				if (bNewTrainingCourseGrower || bNewGrowerELearning)
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
								((ns1blankspace.objectContext === -1) ? 'Training Package' : '&nbsp;') +
								'</td></tr>' +
								'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowTrainingPackageUpdate">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsTrainingPackageUpdate" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="Training Package"' +
									' data-method="AGRI_EDUCATION_TRAINING_PACKAGE_SEARCH"' +
									' data-methodFilter="title-TEXT_IS_LIKE|' + 
										'agritrainingpackage.membership-IN_LIST-' + aTrainerMemberships.join(',') + '|' +
										'availablefrom-LESS_THAN_OR_EQUAL_TO-' + dToday.toString('dd MMM yyyy') + '|' +
										'availableto-GREATER_THAN_OR_EQUAL_TO-' + dToday.toString('dd MMM yyyy') + '"' +
									' data-columns="title"' + 
									' data-click="nsFreshcare.trainer.grower.postPackageClick">' +
								'</td></tr>');	

					if (bNewTrainingCourseGrower)
					{
						aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNewTrainee" style="display: none;">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceDetailsMembershipUpdate" class="ns1blankspaceText">' +
									'</td></tr>');
					}

				}
				
				if (!bNewTrainingCourseGrower)
				{
					aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
								((ns1blankspace.objectContext === -1) ? 'Membership' : '&nbsp;') +
								'</td></tr>' +
								'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowMembershipUpdate">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsMembershipUpdate" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="Membership"' +
									' data-method="AGRI_MEMBERSHIP_SEARCH"' +
									' data-methodFilter="code-TEXT_IS_LIKE|title-TEXT_IS_LIKE|' + 
										'status-EQUAL_TO-' + nsFreshcare.data.membershipStatusActive + '"' +
									' data-columns="code-space-title" ' +
									' data-click="nsFreshcare.external.grower.postMembershipClick">' +
								'</td></tr>');	
				}	

				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
								((ns1blankspace.objectContext === -1) ? 'Code of Practice' : '&nbsp;') +
								'</td></tr>' +
								'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowCOPUpdate">' +
								'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceDetailsCOPUpdate" class="ns1blankspaceSelect"' +
									' data-mandatory="1" data-caption="Code of Practice"' +
									' data-method="AGRI_CODE_OF_PRACTICE_SEARCH"' +
									' data-parent="ns1blankspaceDetailsMembershipUpdate"' +
									' data-parent-search-id="membership"' +
									' data-parent-search-text="description"' + 
									' data-columns="code-space-description">' +
									'</td></tr>');	


				aHTML.push('<tr class="ns1blankspace">' +
								'<td class="ns1blankspaceCaption">' +
								((ns1blankspace.objectContext === -1) ? 'Training Date' : '&nbsp;') +
								'</td></tr>' +
								'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowTrainingDateUpdate">' +
								'<td class="ns1blankspaceDate">' +
								'<input id="ns1blankspaceDetailsTrainingDateUpdate" class="ns1blankspaceDate hasDatepicker" data-mandatory="1" data-caption="Training Date">' +
								'</td></tr>');

			}
			else 
			{	
				// Otherwise, just display a space for the reference number here
				aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							'&nbsp;' +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowReferenceUpdate" class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td class="nsFreshcareReadOnly">&nbsp;' +
							'</td></tr>');	
			}

			if (bNewGrowerELearning)
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Industry Role' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeIndustryRoleUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsSeIndustryRoleUpdate" class="ns1blankspaceText" data-mandatory="1" data-caption="Industry Role">' +
							'</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Previous Training' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSePreviousTrainingUpdate" class="ns1blankspaceTextMulti ns1blankspace">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="15" id="textSePreviousTraining" class="ns1blankspaceTextMulti"></textarea>' +
							'</td></tr>');	

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Register Business?' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeRegisterNewBusiness" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input type="radio" id="radioSeRegisterNewBusiness1" name="SeRegisterNewBusiness" data-text="Yes" value="Y"/>Yes' +
								'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioSeRegisterNewBusiness2" name="SeRegisterNewBusiness" data-text="No" value="N"/>No' +
							'</td></tr>');

				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Existing Business?' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeExistingBusinessUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input type="radio" id="radioSeExistingBusiness1" name="radioSeExistingBusiness" data-text="Yes" value="Y"/>Yes' +
								'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioSeExistingBusiness2" name="radioSeExistingBusiness" data-text="No" value="N"/>No' +
								'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioSeExistingBusiness3" name="radioSeExistingBusiness" data-text="Unsure" value="U"/>Unsure' +
							'</td></tr>');

				
				aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Certificate Number' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSeCertificateNumberUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsSeCertificateNumberUpdate" class="ns1blankspaceText" data-caption="Certificate Number">' +
							'</td></tr>');	
			}

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Trading Name' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowTradingNameUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTradingNameUpdate" class="ns1blankspaceText ns1blankspaceElearningBusiness"' +
								' data-mandatory="1" data-caption="Trading Name">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Legal Name' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowLegalNameUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsLegalNameUpdate" class="ns1blankspaceText ns1blankspaceElearningBusiness"' +
								' data-caption="Legal Name">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'ABN' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowABNUpdate" class="ns1blankspace ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsABNUpdate" class="ns1blankspaceText">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Position' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowPositionUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsPositionUpdate" class="ns1blankspaceText">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Title' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowTitleUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsTitleUpdate" class="ns1blankspaceSelect" data-mandatory="1" data-caption="Title"' +
							' data-method="SETUP_CONTACT_TITLE_SEARCH">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Gender' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowGenderUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsGenderUpdate" class="ns1blankspaceSelect" data-mandatory="1" data-caption="Gender"' +
							' data-method="SETUP_CONTACT_PERSON_GENDER_SEARCH">' +
							'</td></tr>');			
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'First Name' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowFirstNameUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsFirstNameUpdate" class="ns1blankspaceText" data-mandatory="1" data-caption="First Name">' +
							'</td></tr>');			

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption ns1blankspaceCaptionMandatory">' +
							((ns1blankspace.objectContext === -1) ? 'Surname' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowSurnameUpdate" class="ns1blankspace">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsSurnameUpdate" class="ns1blankspaceText" data-mandatory="1" data-caption="Surname">' +
							'</td></tr>');			

			// v1.0.24 Removed mandatory condition for all except Grower as requested by freshcare
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Phone' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowPhoneUpdate" class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsPhoneUpdate" class="ns1blankspaceText" data-caption="Phone"' +
							((nsFreshcare.user.roleID === nsFreshcare.data.roles.grower) ? ' data-mandatory="1"' : '') + 
							'>' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Mobile' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowMobileUpdate" class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsMobileUpdate" class="ns1blankspaceText">' +
							'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Fax' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowFaxUpdate" class="ns1blankspaceText ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsFaxUpdate" class="ns1blankspaceText">' +
							'</td></tr>');
							
			aHTML.push('<tr class="ns1blankspaceCaption">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Email' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowEmailUpdate" class="ns1blankspaceText">' +
							'<td class="ns1blankspaceText">' +
							'<input id="ns1blankspaceDetailsEmailUpdate" class="ns1blankspaceText">' +
							'</td></tr>');
				
			// v2.0.3d no longer shows for growers
			if (bAuditorGrower && ns1blankspace.objectContext != -1) 
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'&nbsp;' +
								'</td></tr>' +
								'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowSendPrintedCertificatesUpdate">' +
								'<td id="ns1blankspaceDetailsSendPrintedCertificatesUpdate" class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioSendPrintedCertificates1" name="radioSendPrintedCertificates" data-text="Yes" value="' + 
									$.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'Yes'}), function(y) {return y.id}).shift() +
										'"/>Yes' +
								'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioSendPrintedCertificates2" name="radioSendPrintedCertificates" data-text="No" value="' + 
									$.map($.grep(nsFreshcare.data.sendPrintedCertificatesOptions, function(x) {return x.title == 'No'}), function(y) {return y.id}).shift() +
										'"/>No' +
								'</td></tr>');
			}
				
			// v3.3.001 SUP023608 Added
			if (bGrowerGrower) 
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
								'<td class="ns1blankspaceCaption">' +
								'&nbsp;' +
								'</td></tr>' +
								'<tr class="ns1blankspace" id="ns1blankspaceDetailsRowReceiveLinkRequestsUpdate">' +
								'<td id="ns1blankspaceDetailsReceiveLinkRequestsUpdate" class="ns1blankspaceRadio">' +
								'<input type="radio" id="radioReceiveLinkRequests1" name="radioReceiveLinkRequests" data-text="Yes" value="Y"/>Yes' +
								'&nbsp;&nbsp;&nbsp;<input type="radio" id="radioReceiveLinkRequests2" name="radioReceiveLinkRequests" data-text="No" value="N"/>No' +
								'</td></tr>');
			}

			// We split out the HTML after crops/harvest months as a new Trainee page puts the product groups, etc into the second column
			var aHTML2 = [];

			// v2.0.2 Now only shown on Details tab when adding new 
			// 3.0.1 Added condition for admin
			// v3.2.020 SUP022975 Was not showing for admin when in trainer.grower
			if (bNewTrainingCourseGrower || bNewGrowerELearning || bNewGrowerFromTrainer)
			{
				// v3.3.001 SUP023456 Now looks up crop list corresponding to Standard
				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								((ns1blankspace.objectContext === -1) ? 'Crops' : '&nbsp;') +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowCropsUpdate" class="ns1blankspaceText ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceText" id="ns1blankspaceMembershipCellCrops">' +
								'<input id="ns1blankspaceMembershipCropsUpdate"' +
									' class="ns1blankspaceSelect ns1blankspaceWatermark"' +
									' data-multiselect="true"' +
									' data-method="SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH"' +
									' data-methodFilter="title-TEXT_IS_LIKE|element-EQUAL_TO-' + nsFreshcare.structureElementCrops + '"' +
									' maxlength="300"' +
									' value="Search for valid Crops">' +
								'</td></tr>');

				aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption" id="ns1blankspaceMembershipHarvestMonthsCaption">' +
								((ns1blankspace.objectContext === -1) ? 'Harvest Months' : '&nbsp;') +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowHarvestMonthsUpdate" class="ns1blankspaceText ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspace" id="ns1blankspaceDetailsHarvestMonthsUpdate">' +
								'</td></tr>');

				if (bNewTrainingCourseGrower)
				{
					aHTML.push('</table>');

					aHTML2.push('<table class="ns1blankspace">');
				}

				aHTML2.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption" id="ns1blankspaceDetailsScopeCaption">' +
								((ns1blankspace.objectContext === -1) ? 'Certification Scope' : '&nbsp;') +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowScopeUpdate" class="ns1blankspaceText ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsScopeUpdate" class="ns1blankspaceText">' +
								'</td></tr>');

				aHTML2.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
								'<td class="ns1blankspaceCaption">' +
								((ns1blankspace.objectContext === -1) 
									? 'Categories <span style="font-size:0.75em;font-weight:normal;vertical-align:bottom;">(Select 1 or more)</span>' 
									: '&nbsp;') +
								'</td></tr>' +
								'<tr id="ns1blankspaceDetailsRowProductGroupUpdate" class="ns1blankspaceText ns1blankspaceHideOnNew">' +
								'<td id="ns1blankspaceDetailsProductGroupUpdate" class="ns1blankspaceText">' +
								'<table class="ns1blankspace" style="margin-bottom:7px;">');

				$.each(nsFreshcare.data.productGroups, function() {
					aHTML2.push('<tr><td id="nsFreshcareProductGroup_' + this[0] + '" ' + 
									'class="nsFreshcareProductGroup nsFreshcareSelectable">' + this[1] + '</td>' + 
									'</tr>');
				});

				aHTML2.push('</table></td></tr>');
			}

			aHTML2.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceCaption">' +
							((ns1blankspace.objectContext === -1) ? 'Notes' : '&nbsp;') +
							'</td></tr>' +
							'<tr id="ns1blankspaceDetailsRowNotesUpdate" class="ns1blankspaceTextMulti ns1blankspaceHideOnNew">' +
							'<td class="ns1blankspaceTextMulti">' +
							'<textarea rows="10" cols="35" id="ns1blankspaceDetailsNotesUpdate" class="ns1blankspaceTextMulti"></textarea>' +
							'</td></tr>');
			
			aHTML2.push('</table>');					
				
			// If this is a new record, add this to column 1, not 2 and then hide the rows that are not needed
			// If not a new trainee record, add aHTML to aHTML2
			// v3.2.020 SUP022975 Only hide NewTrainee fields for admin when adding new trainee
			$('#ns1blankspaceDetailsColumn' + ((ns1blankspace.objectContext === -1) ? '1' : '2'))
					.html(aHTML.join('') + ((ns1blankspace.objectContext != -1) ? aHTML2.join('') : ''));

			if (bNewTrainingCourseGrower)
			{
				$('#ns1blankspaceDetailsColumn2').html(aHTML2.join(''));
				$('tr.ns1blankspaceHideOnNewTrainee').hide();
			}
			else if (ns1blankspace.objectContext === -1)
			{
				$('tr.ns1blankspaceHideOnNew').hide();
			}

			// Mask the relevant felds
			// v3.2.020 SUP023503 select entered value when move into field to avoid pre-populated blanks
			$('#ns1blankspaceDetailsABNUpdate')
				.mask('99 999 999 999', {placeholder: " "})
				.focusin(function() {this.select()});
			$('#ns1blankspaceDetailsMobileUpdate')
				.mask('9999 999 999', {placeholder: " "})
				.focusin(function() {this.select()});
			$('#ns1blankspaceDetailsPhoneUpdate')
				.mask('99 9999 9999', {placeholder: " "})
				.focusin(function() {this.select()});
			$('#ns1blankspaceDetailsFaxUpdate')
				.mask('99 9999 9999', {placeholder: " "})
				.focusin(function() {this.select()});

			if (ns1blankspace.objectContextData)
			{
				// we have to set the values on the left and right hand sides
				var aValues = [];
				$('#ns1blankspaceDetailsReference').html(ns1blankspace.objectContextData["contactbusiness.reference"].formatXHTML());
				$('#ns1blankspaceDetailsTradingName').html(ns1blankspace.objectContextData["contactbusiness.tradename"].formatXHTML());
				$('#ns1blankspaceDetailsLegalName').html(ns1blankspace.objectContextData["contactbusiness.legalname"].formatXHTML());
				$('#ns1blankspaceDetailsABN').html(ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML());
				$('#ns1blankspaceDetailsPosition').html(ns1blankspace.objectContextData["contactbusiness.contactperson.position"].formatXHTML());
				$('#ns1blankspaceDetailsTitle').html(ns1blankspace.objectContextData["contactbusiness.contactperson.titletext"].formatXHTML());
				$('#ns1blankspaceDetailsTitle').attr('data-id', ns1blankspace.objectContextData["contactbusiness.contactperson.title"].formatXHTML());
				$('#ns1blankspaceDetailsGender').html(ns1blankspace.objectContextData["contactbusiness.contactperson.gendertext"].formatXHTML());
				$('#ns1blankspaceDetailsGender').attr('data-id', ns1blankspace.objectContextData["contactbusiness.contactperson.gender"].formatXHTML());
				$('#ns1blankspaceDetailsFirstName').html(ns1blankspace.objectContextData["contactbusiness.contactperson.firstname"].formatXHTML());
				$('#ns1blankspaceDetailsSurname').html(ns1blankspace.objectContextData["contactbusiness.contactperson.surname"].formatXHTML());
				$('#ns1blankspaceDetailsEmail').html(ns1blankspace.objectContextData["contactbusiness.contactperson.email"].formatXHTML());
				$('#ns1blankspaceDetailsMobile').html(ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].formatXHTML());
				$('#ns1blankspaceDetailsPhone').html(ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].formatXHTML());
				$('#ns1blankspaceDetailsFax').html(ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].formatXHTML());
				
				$('#ns1blankspaceDetailsReferenceUpdate').val(ns1blankspace.objectContextData["contactbusiness.reference"].formatXHTML());
				$('#ns1blankspaceDetailsTradingNameUpdate').val(ns1blankspace.objectContextData["contactbusiness.tradename"].formatXHTML());
				$('#ns1blankspaceDetailsLegalNameUpdate').val(ns1blankspace.objectContextData["contactbusiness.legalname"].formatXHTML());
				$('#ns1blankspaceDetailsABN').val(ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML());
				$('#ns1blankspaceDetailsPositionUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.position"].formatXHTML());
				$('#ns1blankspaceDetailsTitleUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.titletext"].formatXHTML());
				$('#ns1blankspaceDetailsTitleUpdate').attr('data-id', ns1blankspace.objectContextData["contactbusiness.contactperson.title"].formatXHTML());
				$('#ns1blankspaceDetailsGenderUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.gendertext"].formatXHTML());
				$('#ns1blankspaceDetailsGenderUpdate').attr('data-id', ns1blankspace.objectContextData["contactbusiness.contactperson.gender"].formatXHTML());
				$('#ns1blankspaceDetailsFirstNameUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.firstname"].formatXHTML());
				$('#ns1blankspaceDetailsSurnameUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.surname"].formatXHTML());
				$('#ns1blankspaceDetailsEmailUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.email"].formatXHTML());


				if (bNewGrowerELearning)
				{
					// v3.4.002 SUP023880 Populate Training Package
					$('#ns1blankspaceDetailsPackage').html(ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.title'].formatXHTML());
					$('#ns1blankspaceDetailsTrainingPackageUpdate').val(ns1blankspace.objectContextData['agritemptrainee.setrainingpackage.title'].formatXHTML());
					$('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-id', ns1blankspace.objectContextData.setrainingpackage);
				}

				// v3.3.001 SUP023456 Populate scope list
				if (ns1blankspace.objectContextData.membership)
				{
					nsFreshcare.admin.grower.membership.defaultScopeOptions(
					{
						xhtmlElementID: "ns1blankspaceDetailsScopeUpdate", 
						membership: ns1blankspace.objectContextData.membership
					});
				}

				if (bNewGrowerELearning)
				{
					// v3.4.001 Now displays radios dynamically
					$('#ns1blankspaceDetailsSeIndustryRoleUpdate').val(ns1blankspace.objectContextData["seindustryrole"].formatXHTML());
					$('#ns1blankspaceDetailsSeIndustryRole').html(ns1blankspace.objectContextData["seindustryrole"].formatXHTML());

					if (ns1blankspace.objectContextData["seexistingbusiness"] != '')
					{
						$('[name="radioSeExistingBusiness"][value="' + ns1blankspace.objectContextData["seexistingbusiness"] + '"]').attr('checked', true);
						$('#ns1blankspaceDetailsSeExistingBusiness').html($('[name="radioSeExistingBusiness"]:checked').attr('data-text'));
					}

					if (ns1blankspace.objectContextData["seregisternewbusiness"] != '')
					{
						$('[name="SeRegisterNewBusiness"][value="' + ns1blankspace.objectContextData["seregisternewbusiness"] + '"]').attr('checked', true);
						$('#ns1blankspaceDetailsSeRegisterNewBusiness').html($('[name="SeRegisterNewBusiness"]:checked').attr('data-text'));
					}
					
					$('#ns1blankspaceDetailsSePreviousTraining').html(ns1blankspace.objectContextData["seprevioustraining"].formatXHTML());
					$('#textSePreviousTraining').val(ns1blankspace.objectContextData["seprevioustraining"].formatXHTML());


					$('#ns1blankspaceDetailsSeCertificateNumberUpdate').val(ns1blankspace.objectContextData["secertificatenumber"].formatXHTML());
					$('#ns1blankspaceDetailsSeCertificateNumber').html(ns1blankspace.objectContextData["secertificatenumber"].formatXHTML());			
				}
				
				// v2.0.3d no longer shows for growers (SUP021375)
				// v2.0.4 SUP021367 Now shows existing notes on LHS for auditors and admin
				// v3.1.0 Only shows for auditors on existing record
				if (bAuditorGrower)
				{
					$('#ns1blankspaceDetailsSendPrintedCertificates').html(ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId + "text"].formatXHTML());
					$('#ns1blankspaceDetailsSendPrintedCertificates').attr('data-id', ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId].formatXHTML());
					if (nsFreshcare.data.sendPrintedCertificatesOptions)
					{
						$('[name="radioSendPrintedCertificates"][value="' + ns1blankspace.objectContextData['contactbusiness.se'+ nsFreshcare.data.sendPrintedCertificatesId] + '"]').attr('checked', true);
					}
				}

				if (bGrowerGrower)
				{
					$('[name="radioReceiveLinkRequests"][value="' + ns1blankspace.objectContextData['contactbusiness.seallowlinkrequests'] + '"]').attr('checked', true);
					$('#ns1blankspaceDetailsReceiveLinkRequests').html($('[name="radioReceiveLinkRequests"]').attr('data-text'));
				}

				// v2.0.4 SUP021367 Now shows existing notes on LHS for auditors and admin
				// v3.1.207 SUP023035 Now finds notes on business record
				if (bAuditorGrower || bNewGrowerELearning || bNewGrowerFromTrainer)
				{
					$('#ns1blankspaceDetailsNotes').html(ns1blankspace.objectContextData["contactbusiness.notes"].formatXHTML().replace(/\r\n/g, '<br />'));
				}

				// 3.0.1 Populate Training Fields if from 'New Grower' forms
				// v3.2.020 SUP02975 Added data-course to MemberhsipUpdate
				if (bNewGrowerELearning || bNewGrowerFromTrainer)
				{
					$('#ns1blankspaceDetailsMembershipUpdate').val(ns1blankspace.objectContextData.membershiptext.formatXHTML());
					$('#ns1blankspaceDetailsMembershipUpdate').attr('data-id', ns1blankspace.objectContextData.membership);
					$('#ns1blankspaceDetailsMembershipUpdate').attr('data-cop', ns1blankspace.objectContextData.codeofpractice);
					$('#ns1blankspaceDetailsMembershipUpdate').attr('data-course', ns1blankspace.objectContextData.course);
					$('#ns1blankspaceDetailsMembership').html(ns1blankspace.objectContextData.membershiptext.formatXHTML());
					$('#ns1blankspaceDetailsMembership').attr('data-id', ns1blankspace.objectContextData.membershiptext);
					
					$('#ns1blankspaceDetailsCOPUpdate').val(ns1blankspace.objectContextData.codeofpracticetext.formatXHTML());
					$('#ns1blankspaceDetailsCOPUpdate').attr('data-id', ns1blankspace.objectContextData.codeofpractice);
					$('#ns1blankspaceDetailsCOP').html(ns1blankspace.objectContextData.codeofpracticetext.formatXHTML());
					$('#ns1blankspaceDetailsCOP').attr('data-id', ns1blankspace.objectContextData.codeofpractice);

					$('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-course', ns1blankspace.objectContextData.course);
					
					// v3.3.008 SUP023841 Was using createddate instead of coursedate when coursedate was populated
					var createddate = (ns1blankspace.objectContextData.coursedate)
									? ns1blankspace.objectContextData.coursedate 
									: ns1blankspace.objectContextData.createddate.substr(0, ns1blankspace.objectContextData.createddate.length - 8);
					$('#ns1blankspaceDetailsTrainingDateUpdate').val(createddate.formatXHTML());
					$('#ns1blankspaceDetailsTrainingDate').html(createddate.formatXHTML());

					// v3.3.001 Get scopes, crop table, etc
					nsFreshcare.external.grower.postMembershipClick({membership: ns1blankspace.objectContextData.membership});
				}

				// Mask ABN
				if (ns1blankspace.objectContextData["contactbusiness.abn"].length > 0 && ns1blankspace.objectContextData["contactbusiness.abn"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsABNUpdate').val(ns1blankspace.objectContextData["contactbusiness.abn"].substr(0,2) + ' ' + 
															ns1blankspace.objectContextData["contactbusiness.abn"].substr(2,3) + ' ' + 
															ns1blankspace.objectContextData["contactbusiness.abn"].substr(5,3) + ' ' +
															ns1blankspace.objectContextData["contactbusiness.abn"].substr(8));
				}
				else {
					$('#ns1blankspaceDetailsABNUpdate').val(ns1blankspace.objectContextData["contactbusiness.abn"].formatXHTML());
				}

				//Mask Mobile
				if (ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].length > 0 && ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsMobileUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].substr(0,4) + ' ' +
															   ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].substr(4,3) + ' ' +
															   ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].substr(7));
				}
				else {
					$('#ns1blankspaceDetailsMobileUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.mobile"].formatXHTML());
				}

				// Mask work phone
				if (ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].length > 0 && ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsPhoneUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].substr(0,2) + ' ' + 
															  ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].substr(2,4) + ' ' +
															  ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].substr(6));
				}
				else {
					$('#ns1blankspaceDetailsPhoneUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.workphone"].formatXHTML());
				}

				// Mask Fax
				if (ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].length > 0 && ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].indexOf(' ') === -1) 
				{
					$('#ns1blankspaceDetailsFaxUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].substr(0,2) + ' ' +
															ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].substr(2,4) + ' ' +
															ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].substr(6));
				}	
				else {
					$('#ns1blankspaceDetailsFaxUpdate').val(ns1blankspace.objectContextData["contactbusiness.contactperson.fax"].formatXHTML());
				}

				// List the Scopes when non-admin adding new record and for admin when on "New Growers from Trainees" page
				// v3.1.2 SUP022744 Use scopeValues instead of personGroups
				if (bNewGrowerFromTrainer || bNewGrowerELearning)
				{
					aValues = [];
					$.each(ns1blankspace.objectContextData.scopeValues, function() 
					{
						var sScopeText = this.scopetext;
						aValues.push('<span id="nsFreshcareScopeList_' + this.scope + '" ' + 
							'class="nsFreshcareScopeList" ' +
							'data-rowID="' + this.id + '">' + 
								this.scopetext + 
							'</span>');
						var sScopeId = $.map($.grep($('.nsFreshcareScope'), function(x) {return $(x).html() === sScopeText}), function(y) {return y.id}).shift();
						$('#' + sScopeId).addClass("nsFreshcareSelected");
					});

					$('#ns1blankspaceDetailsScope').height($('#ns1blankspaceDetailsScopeUpdate').height());

					if (aValues.length > 0) 
					{
						$('#ns1blankspaceDetailsScope').html(aValues.join('<br />'));
					}
					else 
					{
						$('#ns1blankspaceDetailsScope').html('None');
					}
				}

				// List the Categories (Product groups). 
				if (bNewGrowerELearning || bNewGrowerFromTrainer)
				{
					aValues = [];

					// List the categories 
					$.each(ns1blankspace.objectContextData.productGroups, function() 
					{
						var sGroupText = this.productcategorytext;
						aValues.push('<span id="nsFreshcareProductGroupList_' + this.productcategory + '" ' + 
							'class="nsFreshcareProductGroupList" ' +
							'data-rowID="' + this.id + '">' + 
								this.productcategorytext + 
							'</span>');
						var sGroupId = $.map($.grep($('.nsFreshcareProductGroup'), function(x) {return $(x).html() === sGroupText}), function(y) {return y.id}).shift();
						$('#' + sGroupId).addClass("nsFreshcareSelected");
					});
					$('#ns1blankspaceDetailsProductGroup').height($('#ns1blankspaceDetailsProductGroupUpdate').height());

					if (aValues.length > 0) 
					{
						$('#ns1blankspaceDetailsProductGroup').html(aValues.join('<br />'));
					}
					else 
					{
						$('#ns1blankspaceDetailsProductGroup').html('None');
					}
				}
					
				// Set all blanks to &nbsp; on LHS so that heights match up
				$.each(aElements, function() 
				{
					if ($('#ns1blankspaceDetails' + this).html() === '' ) {
						$('#ns1blankspaceDetails' + this).html('&nbsp;');
					}

					var iMax = Math.max($('#ns1blankspaceDetailsRow' + this + 'Update').height(), $('#ns1blankspaceDetailsRow' + this).height());
					$('#ns1blankspaceDetailsRow' + this + 'Update').height(iMax);
					$('#ns1blankspaceDetailsRow' + this).height(iMax);
				});
			}
			else 
			{
				// Set defaults

				// v3.2.020 SUP022975 Was not defaulting if adding trainer from admin portal
				if (bNewTrainingCourseGrower) 
				{
					if (ns1blankspace.data.grower && ns1blankspace.data.grower.membershipText && ns1blankspace.data.grower.membership) {
						$('#ns1blankspaceDetailsMembershipUpdate').val(ns1blankspace.data.grower.membershipText);
						$('#ns1blankspaceDetailsMembershipUpdate').attr('data-id', ns1blankspace.data.grower.membership);
						$('#ns1blankspaceDetailsMembershipUpdate').attr('disabled', true);
						$('#ns1blankspaceDetailsMembershipUpdate').addClass('nsFreshcareDisabled')
					}

					if (ns1blankspace.data.grower && ns1blankspace.data.grower.trainingPackage && ns1blankspace.data.grower.trainingPackageText) {
						$('#ns1blankspaceDetailsTrainingPackageUpdate').val(ns1blankspace.data.grower.trainingPackageText.formatXHTML());
						$('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-id', ns1blankspace.data.grower.trainingPackage);
						$('#ns1blankspaceDetailsTrainingPackageUpdate').attr('data-course', ns1blankspace.data.grower.trainingCourse);
						$('#ns1blankspaceDetailsTrainingPackageUpdate').attr('disabled', true);
						$('#ns1blankspaceDetailsTrainingPackageUpdate').addClass('nsFreshcareDisabled')
					}

					if (ns1blankspace.data.grower && ns1blankspace.data.grower.codeOfPracticeText && ns1blankspace.data.grower.codeOfPractice) {
						$('#ns1blankspaceDetailsCOPUpdate').val(ns1blankspace.data.grower.codeOfPracticeText.formatXHTML());
						$('#ns1blankspaceDetailsCOPUpdate').attr('data-id', ns1blankspace.data.grower.codeOfPractice);
					}

					if (ns1blankspace.data.grower && ns1blankspace.data.grower.trainingDate) 
					{
						$('#ns1blankspaceDetailsTrainingDateUpdate').val(ns1blankspace.data.grower.trainingDate.formatXHTML());
					}

					// v3.3.001 Set scope options, crop tables, etc
					nsFreshcare.trainer.grower.postPackageClick();
				}

				$('#ns1blankspaceDetailsGenderUpdate').val('[Unknown]');
				$('#ns1blankspaceDetailsGenderUpdate').attr('data-id', '1');

				$('#ns1blankspaceDetailsTitleUpdate').val('[NA]');
				$('#ns1blankspaceDetailsTitleUpdate').attr('data-id', '6');
			}
			
			// Show and bind the Harvest Months & Crops
			// v3.2.020 SUP022975 Was not showing these when adding new trainee in admin portal
			if (bNewTrainingCourseGrower || bNewGrowerELearning || bNewGrowerFromTrainer)
			{
				// v3.3.001 SUP023456 Get details of the Standard
				oStandard = $.grep(nsFreshcare.data.memberships, function(x) 
				{
					return x.id == (bNewTrainingCourseGrower ? ns1blankspace.data.grower.membership : ns1blankspace.objectContextData.membership)
				}).shift();

				if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer
					&& (ns1blankspace.data.grower.membership == nsFreshcare.data.membershipVIT || ns1blankspace.data.grower.membership == nsFreshcare.data.membershipWIN))
				{
					$('#ns1blankspaceMembershipCropsUpdate').val('Wine Grapes');
					$('#ns1blankspaceMembershipCrops').val('Wine Grapes');
				}
				else
				{
					nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembershipCellCrops',
																		 values: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData.crop : ''),
																		 update: true,
																		 context: 'Update',
																		 cropsTable: oStandard.secropslookup});

					nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceDetailsCrops',
																		 values: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData.crop : ''),
																		 update: false,
																		 cropsTable: oStandard.secropslookup});

				}
				nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonthsUpdate',
																		 values: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData.harvestmonth : ''),
																		 update: true,
																		 context: 'Update'});

				nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceDetailsHarvestMonths',
																		 values: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData.harvestmonth : ''),
																		 update: false,
																		 context: ''});

			}

			// Bind the Categories area
			// v3.2.020 SUP022975 Was not defaulting when adding new trainee in admin portal
			$('#ns1blankspaceMainDetails .nsFreshcareProductGroup').each(function() 
			{
				if (ns1blankspace.objectContext === -1 
					&& (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer 
						|| (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin && ns1blankspace.objectName == 'grower'))
					&& this.id.split('_')[1] === nsFreshcare.data.grower.productGroupFreshProduce) 
				{	// If new Trainee, select the Product Group 'Fresh Produce'
					$(this).addClass('nsFreshcareSelected');
				}

				$(this).click(function(event) {
					nsFreshcare.external.grower.manageMultiRows(this.id)
				});
			});

			// Call post Training Package/Course click functions if Trainer
			// v3.2.020 SUP022975 Also needs to call when adding new trainee in admin portal
			if (bNewTrainingCourseGrower) 
			{
				nsFreshcare.trainer.grower.postPackageClick();
				nsFreshcare.external.grower.setTrainingDate();
			}

			// v3.4.002 Line them up
			$('.nsFreshcareReadOnly').css('padding-bottom', '6px');
		}	
	},

	manageMultiRows: 	function(sXHTMLElementID, iMembership) 
	{

		var sRowID = sXHTMLElementID.split("_")[1];
		var sFieldName;
		var bNewTrainee = (ns1blankspace.objectContext === -1 && ns1blankspace.rootNameSpaceText === 'nsFreshcare' && nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer) ||
						  (ns1blankspace.objectContext === -1 && ns1blankspace.rootNameSpaceText === 'nsECA' && nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor);

		// v2.0.2 Now caters for passed iMembership so that ProductGroups can be maintained from multiple Membershp tabs
		// Also now caters for Membership Sites & Scope (at Membership level)
		iMembership = (iMembership) ? '-' + iMembership : '';

		if (sXHTMLElementID.indexOf('ProductGroup') > -1)
		{
			sFieldName = 'ProductGroup';
		}
		else if (sXHTMLElementID.indexOf('Scope') > -1)
		{
			sFieldName = 'Scope';
		}
		else if (sXHTMLElementID.indexOf('MembershipSite') > -1)
		{
			sFieldName = 'MembershipSite';
		}
		else if (sXHTMLElementID.indexOf('Scope') > -1)
		{
			sFieldName = 'Scope';
		}


		if ($('#' + sXHTMLElementID).hasClass("nsFreshcareSelected") === false) 
		{
			var sContext = ((iMembership === '') ? 'Details' : 'Membership');
			$('#' + sXHTMLElementID).addClass("nsFreshcareSelected");

			if ($('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).is('*')) 
			{
				// Already exists
				if ($('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).attr("data-rowID")) 
				{
					// This is an existing row - remove any strikethrough
					$('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).css('text-decoration', "none");
				}
			}
			else 
			{
				// New row added during this edit - add it to the list (remove 'None' if this is already there)
				var bAddBR = ($('#ns1blankspace' + sContext + iMembership.substr(1) + sFieldName).html() != '');
				if ($('#ns1blankspace' + sContext + iMembership.substr(1) + sFieldName).html() === 'None')
				{
					$('#ns1blankspace' + sContext + iMembership.substr(1) + sFieldName).html('');
					$('#ns1blankspace' + sContext + iMembership.substr(1) + sFieldName).height(0);
					bAddBR = false;
				}

				// v2.0.3 Added font-size style for Membership Sites
				// v3.3.001 SUP023456 Changed so that uses xXHTMLElementID so we ge tthe right source
				$('#ns1blankspace' + sContext + iMembership.substr(1) + sFieldName)
				.append('<span id="nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID + '" ' + 
						((sFieldName === 'MembershipSite') ? ' style="font-size: 0.875em;"' : '') +
						'class="nsFreshcare' + sFieldName + 'List">' + ((bAddBR) ? '<br />' : '') + 
							$('#' + sXHTMLElementID).html() + 
						'</span>');
			}
		}
		else 
		{		// We're removing the row
			$('#' + sXHTMLElementID).removeClass("nsFreshcareSelected");

			if ($('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).html() != "" 
				&& $('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).html() != undefined) 
			{
				// Already exists
				if ($('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).attr("data-rowID")) 
				{
					// This is an existing row - remove any strikethrough
					$('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).css('text-decoration', "line-through");
				}
				else 
				{
					// New row added during this edit - just remove it
					$('#nsFreshcare' + sFieldName + 'List' + iMembership + '_' + sRowID).remove();
				}
			}
		}
	},

	setTrainingDate: 	function(oParam) 
	{

		var sXHTMLElementID = ns1blankspace.xhtml.divID;

		if (oParam) {
			if (oParam.xhtmlElementID) {sXHTMLElementID = oParam.xhtmlElementID;}
		}
		
		sXHTMLElementID = (sXHTMLElementID.substr(0,1) === '#') ? sXHTMLElementID.substr(1) : sXHTMLElementID;
		
		if ($('#' + sXHTMLElementID).attr('data-id') != undefined) {

			var oSearch = new AdvancedSearch();
			oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_SEARCH';
			oSearch.addField('coursedate');
			oSearch.addFilter('id', 'EQUAL_TO', $('#' + sXHTMLElementID).attr('data-id'));
			oSearch.getResults(function(oResponse) {

				if (oResponse.status === 'OK' && oResponse.data.rows.length > 0) {

					$('#ns1blankspaceDetailsTrainingDateUpdate').val(oResponse.data.rows[0].coursedate.formatXHTML());

				}
			});
		}
	},

	postMembershipClick: function(oParam)
	{
		// v3.3.001 SUP023456 Added
		// Sets Scope list and Crops filter
		var iMembership = ns1blankspace.util.getParam(oParam, 'membership', {'default': $('#' + ns1blankspace.xhtml.divID.replace('#', '')).attr('data-id')}).value;
		var aSelectedScopes = $('#ns1blankspaceDetailsScopeUpdate .nsFreshcareSelected');
		if (aSelectedScopes.length == 0 && ns1blankspace.objectContextData)
		{
			aSelectedScopes = ns1blankspace.objectContextData.scopeValues;
		}
		else
		{
			aSelectedScopes = $.map(aSelectedScopes, function(x) {return {scope: $(x).attr('id').split('_').pop(), scopetext: $(x).html()}})
		}
		
		nsFreshcare.admin.grower.membership.defaultScopeOptions(
		{
			xhtmlElementID: "ns1blankspaceDetailsScopeUpdate", 
			membership: iMembership
		});
		$.each(aSelectedScopes, function()
		{
			$('#nsFreshcareScope-_' + this.scope).addClass('nsFreshcareSelected');
		});

		// v3.3.001 SUP023456 Set caption for Harvest Months and crops lookup table
		if (iMembership)
		{
			$('#ns1blankspaceDetailsHarvestMonthCaption').html((iMembership == nsFreshcare.data.membershipSCS ? 'Operational' : 'Harvest') + ' Months');
			nsFreshcare.admin.grower.membership.defaultCropTable({membership: iMembership, xhtmlElementID: 'ns1blankspaceMembershipCropsUpdate'});
		}
	},

	contacts: 	
	{
		search: function (oParam) 
		{
			oParam = oParam || {};
			var iContactBusiness = ns1blankspace.util.getParam(oParam, 'contactBusiness', {'default': ns1blankspace.user.contactBusiness}).value;
			var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson', {'default': ns1blankspace.user.contactPerson}).value;
			var bShowCompetencies = ns1blankspace.util.getParam(oParam, 'showCompetencies', {'default': false}).value;

			oParam.contactSearchStep = oParam.contactSearchStep || 1;

			if (iContactBusiness && ns1blankspace.objectContextData)
			{
				if (oParam.contactSearchStep === 1) 
				{
					ns1blankspace.objectContextData.contacts = [];
					var sStatusField = oParam.statusField || 'customer';
					var dToday = new Date();
					var oSearch = new AdvancedSearch();
					oSearch.method = 'CONTACT_PERSON_SEARCH';
					oSearch.addField('contactperson.firstname,contactperson.surname,contactperson.email,contactperson.mobile,customerstatus,supplierstatus,' + 
									  'contactperson.workphone,contactperson.contactbusiness.primarycontactperson,contactperson.reference');
					oSearch.addFilter("contactperson.contactbusiness", "EQUAL_TO", iContactBusiness);
					// v3.2.005 SUP023369 Filters inactive contacts so they're not shown
					oSearch.addFilter(sStatusField + 'status', 'NOT_EQUAL_TO', nsFreshcare.data.contactStatusInactive);
					oParam.statusField = sStatusField;
					oSearch.addBracket('(');
					oSearch.addBracket('(');
					oSearch.addFilter("contactperson.contactbusiness.primarycontactperson", 'NOT_EQUAL_TO', 'field:contactperson.id');
					oSearch.addOperator('and');
					oSearch.addFilter("contactperson.contactbusiness.primarycontactperson", 'IS_NOT_NULL');
					oSearch.addBracket(')');
					oSearch.addOperator('or');
					oSearch.addBracket('(');
					oSearch.addFilter("contactperson.id", 'NOT_EQUAL_TO', iContactPerson);
					oSearch.addOperator('and');
					oSearch.addFilter("contactperson.contactbusiness.primarycontactperson", 'IS_NULL');
					oSearch.addBracket(')');
					oSearch.addBracket(')');
					oSearch.sort("contactperson.surname", "asc");
					oSearch.rf = 'json';
					oSearch.rows = 1000;
					oSearch.getResults(function(oResponse) 
					{
						if (oResponse.status == 'OK')
						{
							ns1blankspace.objectContextData.contacts = oResponse.data.rows;
							oParam.contactSearchStep = 2;
							nsFreshcare.external.grower.contacts.search(oParam);
						}
						else
						{
							ns1blankspace.status.error('Error searching for contacts: ' + oResponse.error.errornotes);
						}
					});
				}
				
				// v3.4.010 SUP023940 Get acredited Standards if requested
				else if (oParam.contactSearchStep === 2)
				{
					oParam.contactSearchStep = 10;
					if (bShowCompetencies)
					{
						nsFreshcare.data.auditorMemberships = [];
						oParam.onCompleteWhenCan = oParam.onComplete;
						oParam.onComplete = nsFreshcare.external.grower.contacts.search;
						oParam.trainerBusiness = iContactBusiness;
						oParam.trainerPerson = $.map(ns1blankspace.objectContextData.contacts, function(x) {return x.id}).join(',');
						oParam.stateSearch = false;
						oParam.storeObject = 'auditorMemberships';
						nsFreshcare.control.setupTrainer(oParam);
					}
					else
					{
						nsFreshcare.external.grower.contacts.search(oParam);
					}
				} 
				
				// Call back function
				else if (oParam.contactSearchStep === 10) 
				{
					
					delete(oParam.contactSearchStep);
					ns1blankspace.util.onComplete(oParam);
				}
			}
			else
			{
				ns1blankspace.objectContextData.contacts = [];
				ns1blankspace.status.error('Unable to list Contacts. Please contact support.');
			}
		},

		show: 	function (oParam) 
		{
			oParam = oParam || {};
			oParam.contactBusiness = oParam.contactBusiness || ns1blankspace.objectContextData["contactperson.contactbusiness"];
			var bShowCompetencies = ns1blankspace.util.getParam(oParam, 'showCompetencies', {'default': false}).value;
			var aHTML = [];
			
			// v2.0.4f now correctly processes contactBusiness / contactperson parameters
			// v3.1.1 SUP022434 Added read-only reference column for Trainers
			// v3.2.005 SUP023369 Shows inactive as greyed-out for ALL types of users

			if ($('#ns1blankspaceMainContacts').attr('data-loading') == '1')
			{
				if (ns1blankspace.objectContextData.contacts === undefined) 
				{
					oParam.onComplete = nsFreshcare.external.grower.contacts.show;
					nsFreshcare.external.grower.contacts.search(oParam);
				}
				else 
				{
					$('#ns1blankspaceMainContacts').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceContactsColumn1" class="ns1blankspaceColumn1Flexible"></td>' +
									'<td id="ns1blankspaceContactsColumn2" class="ns1blankspaceColumn2Action" style="width:150px;"></td>' +
									'</table>');					
					
					$('#ns1blankspaceMainContacts').html(aHTML.join(''));
					
					var aHTML = [];
				
					aHTML.push('<table id="ns1blankspaceGrowerContacts" class="ns1blankspace">');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Name</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Email</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Mobile</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Phone</td>' + 
							        ((nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer) ? '<td class="ns1blankspaceHeaderCaption">Trainer ID</td>' : '') +
							        (bShowCompetencies ? '<td class="ns1blankspaceHeaderCaption">Standards</td>' : '') + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					$.each(ns1blankspace.objectContextData.contacts, function() 
					{	
						// v3.2.005 SUP023369 Didn't have a closing quote after class attribute
						var sThisPerson = this.id;
						aHTML.push('<tr id="ns1blankspaceContactRow_' + this.id + '" class="ns1blankspaceContactRow">');
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceContactRowEdit"' + 
										' id="ns1blankspaceContactValue_name_' + this.id + 
										'">' +
											this["contactperson.firstname"] + ' ' + this["contactperson.surname"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceContactRowEdit"' + 
										' id="ns1blankspaceContactValue_email_' + this.id + 
										'">' +
											this["contactperson.email"] + 
										'</td>');

						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceContactRowEdit"' + 
										' id="ns1blankspaceContactValue_mobile_' + this.id + 
										'">' +
											this["contactperson.mobile"] + 
										'</td>');
						
						aHTML.push('<td class="ns1blankspaceRow ns1blankspaceContactRowEdit"' + 
										' id="ns1blankspaceContactValue_phone_' + this.id + 
										'">' +
											this['contactperson.workphone'] + 
										'</td>');

						// v3.1.205 Only used for FreshcareProfile, not growers form. Only shows if starts with 'TR'
						if (nsFreshcare.user.roleID === nsFreshcare.data.roles.trainer 
							&& ns1blankspace.objectName != 'grower')
						{
							aHTML.push('<td class="ns1blankspaceRow' + 
											' id="ns1blankspaceContactValue_reference_' + this.id + 
											'">' +
												(this['contactperson.reference'].substr(0,2) == 'TR' ? this['contactperson.reference'] : '') + 
											'</td>');
						}

						// v3.4.010 SUP023940 If bShowCompetencies, show comma delimited list of Standards for this person
						if (bShowCompetencies)
						{
							var oStandards = $.grep(nsFreshcare.data.auditorMemberships, function(x) {return x.trainercontactperson === sThisPerson});
							var aStandardsText = [];

							$.each(oStandards, function()
							{
								aStandardsText.push('<span data-id="' + this.id + '">' + this['agrimembershiptrainer.membership.code'] + '</span>');
							});

							aHTML.push('<td class="ns1blankspaceRow"' + 
											' id="ns1blankspaceContactValue_standards_' + this.id + '">');
							if (aStandardsText.length > 0)
							{
								aHTML.push(aStandardsText.join(', ')) ;
							}
							aHTML.push('</td>');
						}

						aHTML.push('<td id="ns1blankspaceContactRemove_' + this.id + '" ' + 
										'class="ns1blankspaceAction ns1blankspaceContactRemove" ' + 
										'data-rowID="' + this.id + '" data-action="remove">' + 
										'</td>');
					});

					aHTML.push('</table>');

					$('#ns1blankspaceContactsColumn1').html(aHTML.join(''));

					aHTML = [];
					aHTML.push('<table class="ns1blankspaceColumn2">');
					aHTML.push('</td></tr></table>');

					$('#ns1blankspaceContactsColumn2').html(aHTML.join(''));

					// Bind remove button
					$('.ns1blankspaceContactRemove').button({
						icons: {
							primary: "ui-icon-close"
						}
					})
					.click(function(event) 
					{
						nsFreshcare.external.grower.contacts.remove(this);
					})
					.css('height', '20px')
					.css('width', '20px');
					
					// Bind Add button
					$('#ns1blankspaceContactAdd').button(
					{
						label: 'Add Contact',
						icons: {
							primary: "ui-icon-plus"
						}
					})
					.click(function() 
					{
						var aHTML = [];
						var iRowNumber = $('#ns1blankspaceGrowerContacts').children().length + 1;

						if (ns1blankspace.objectContextData.newContactCount) {
							ns1blankspace.objectContextData.newContactCount++;	
						}
						else {ns1blankspace.objectContextData.newContactCount = 1;}

						aHTML.push('<tr id="ns1blankspaceContactRow_' + ns1blankspace.objectContextData.newContactCount + '"' +
										' class="ns1blankspaceRow ns1blankspaceContactRow" data-type="new">' +
								  	'<td class="ns1blankspaceRowUpdate ns1blankspaceRow" style="width:162px;">' + 
									  	'<input id="ns1blankspaceContactFirstName_' + ns1blankspace.objectContextData.newContactCount + '" ' + 
									  		'class="ns1blankspaceText ns1blankspaceWatermark" value="First name" style="width:75px">&nbsp;' + 
									  	'<input id="ns1blankspaceContactSurname_' + ns1blankspace.objectContextData.newContactCount + '" ' + 
									  		'class="ns1blankspaceText ns1blankspaceWatermark" value="Surname" style="width:70px">' +
								  	'</td>'	 +
								  	'<td class="ns1blankspaceRowUpdate ns1blankspaceRow">' + 
									  	'<input id="ns1blankspaceContactEmail_' + ns1blankspace.objectContextData.newContactCount + '" class="ns1blankspaceText ns1blankspaceWatermark" value="Email">' +
									  	'</td>' +
								  	'<td class="ns1blankspaceRowUpdate ns1blankspaceRow ns1blankspaceWatermark">' + 
									  	'<input id="ns1blankspaceContactMobile_' + ns1blankspace.objectContextData.newContactCount + '" class="ns1blankspaceText ns1blankspaceWatermark" value="Mobile">' + 
									  	'</td>' +
								  	'<td class="ns1blankspaceRowUpdate ns1blankspaceRow ns1blankspaceWatermark">' + 
									  	'<input id="ns1blankspaceContactPhone_' + ns1blankspace.objectContextData.newContactCount + '" class="ns1blankspaceText ns1blankspaceWatermark" value="Phone">' +
									  	'</td>' +
									 '<td id="ns1blankspaceContactRemove_' + ns1blankspace.objectContextData.newContactCount + '" data-action="remove" data-type="new"' +
									 	' class="ns1blankspaceAction">&nbsp;</td>' +
								  '</tr>');
						$('#ns1blankspaceGrowerContacts').children().last().after(aHTML.join(''));
						
						$('#ns1blankspaceContactRemove_' + ns1blankspace.objectContextData.newContactCount).button({
							icons: {
								primary: 'ui-icon-close'
							}
						})
						.css("width", "20px")
						.css("height", "20px")
						.click(function(event) {
							
							nsFreshcare.external.grower.contacts.remove(this);
						});
					});

					// Bind editing of cells
					// v1.0.26 Was comparing data-mandatory to 'true'
					$('.ns1blankspaceContactRowEdit')
					.css('cursor', 'pointer')
					.click(function(event) 
					{
						nsFreshcare.util.elementEdit.start({xhtmlElementID: event.target.id,
															save: (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin),
															mandatory: ($('#' + event.target.id).attr("data-mandatory") == "1"),
															onComplete: nsFreshcare.util.elementEdit.stop
														});
					});
				}
			}
		},
		
		remove: function (oElement) 
		{

			var sID = oElement.id.split('_')[1];
			
			if ($(oElement).attr('data-action') === 'remove') {
				
				if ($(oElement).attr('data-type') === 'new') {
					// Remove row altogether
					$('#ns1blankspaceContactRow_' + sID).remove();
				}
				else {
					// Add strikethrough style to row & change button to 'reinstate'
					$('#ns1blankspaceContactRow_' + sID).children().css('text-decoration', 'line-through');

					$('#ns1blankspaceContactRemove_' + sID).button({
						icons: {
							primary: 'ui-icon-check'
						}
					})
					.attr('data-action', 'reinstate');
				}

			}
			else {

				$('#ns1blankspaceContactRow_' + sID).children().css('text-decoration', 'none');

				$('#ns1blankspaceContactRemove_' + sID).button({
					icons: {
						primary: 'ui-icon-close'
					}
				})
				.attr('data-action', 'remove');

			}
		}
	},

	address: 	
	{
		show:	function (oParam, oResponse)
		{
			// v3.1.0 Changed so that no longer in-line editing - opens div similar to CARs
			// v3.1.206 SUP023035 No longer looks at contactperson mailing addresses
			oParam = oParam || {};
			var aHTML = [];
			var oNS = ns1blankspace.rootnamespace;
			if (ns1blankspace.objectParentName) {oNS = oNS[ns1blankspace.objectParentName]}
			oNS = oNS[ns1blankspace.objectName];
			var bCanChangeStatus = ns1blankspace.util.getParam(oParam, 'canChangeStatus', {'default': true}).value;

			if ($('#ns1blankspaceMainAddress').attr('data-loading') == '1')
			{
				
				if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.sites === undefined) 
				{
					oParam.onCompleteWhenCan = oParam.onComplete;
					oParam.onComplete = nsFreshcare.external.grower.address.show;
					nsFreshcare.admin.grower.siteAddress.search(oParam);
				}
				else 
				{

					$('#ns1blankspaceMainAddress').attr('data-loading', '');
						
					aHTML.push('<table class="ns1blankspaceContainer">' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceAddressColumn1" class="ns1blankspaceColumn1"></td>' +
									'<td id="ns1blankspaceAddressColumn2" class="ns1blankspaceColumn2"></td>' +
									'</tr>' +
									'<tr class="ns1blankspaceContainer">' +
									'<td id="ns1blankspaceAddressRow2" class="ns1blankspaceColumn1Large" colspan="2" style="width:100%;"></td>' +
									'</table>');					
					$('#ns1blankspaceMainAddress').html(aHTML.join(''));
					
					var aHTML = [];
					var aElements = [];
	
					aHTML.push('<table class="ns1blankspace">');
			
					aHTML.push('<tr id="ns1blankspaceAddressRowMailingAddress1" class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Mailing' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceAddressMailingAddress1" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');
					aElements.push("MailingAddress1");
									
					aHTML.push('<tr id="ns1blankspaceAddressRowMailingAddress2" class="ns1blankspace">' +
									'<td id="ns1blankspaceAddressMailingAddress2" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');
					aElements.push('MailingAddress2');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Suburb' +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingSuburb" class="ns1blankspace">' +
									'<td id="ns1blankspaceAddressMailingSuburb" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');
					aElements.push('MailingSuburb');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'State' +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingState" class="ns1blankspace">' +
									'<td id="ns1blankspaceAddressMailingState" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');
					aElements.push('MailingState');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Post Code' +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingPostCode" class="ns1blankspace">' +
									'<td id="ns1blankspaceAddressMailingPostCode" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');				
					aElements.push('MailingPostCode');

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Country' +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingCountry" class="ns1blankspace">' +
									'<td id="ns1blankspaceAddressMailingCountry" class="nsFreshcareReadOnly">&nbsp;' +
									'</td></tr>');						
					aElements.push('MailingCountry');

					aHTML.push('</table>');					
					
					if (ns1blankspace.objectContext != -1) {
						$('#ns1blankspaceAddressColumn1').html(aHTML.join(''));
					}

					var aHTML = [];
				
					aHTML.push('<table class="ns1blankspace">');
							
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									((ns1blankspace.objectContext == -1) ? 'Mailing' : '&nbsp;') +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingAddress1Update" class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceAddressMailingAddress1Update" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Mailing Address (1st row)">' +
									'</td></tr>');
									
					aHTML.push('<tr id="ns1blankspaceAddressRowMailingAddress2Update" class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceAddressMailingAddress2Update" class="ns1blankspaceText">' +
									'</td></tr>');
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									((ns1blankspace.objectContext == -1) ? 'Suburb' : '&nbsp;') +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingSuburbUpdate" class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceAddressMailingSuburbUpdate"' + 
									' class="ns1blankspaceText ns1blankspaceSelectAddress"' +
									' data-suburbCase="upper"' +
									' data-mandatory="1" data-caption="Mailing Suburb">' +
									'</td></tr>');
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									((ns1blankspace.objectContext == -1) ? 'State' : '&nbsp;') +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingStateUpdate" class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceAddressMailingStateUpdate" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Mailing State">' +
									'</td></tr>');
									
					aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
									'<td class="ns1blankspaceCaption">' +
									((ns1blankspace.objectContext == -1) ? 'Post Code' : '&nbsp;') +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingPostCodeUpdate" class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceAddressMailingPostCodeUpdate" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Mailing Postcode">' +
									'</td></tr>');				
									
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									((ns1blankspace.objectContext == -1) ? 'Country' : '&nbsp;') +
									'</td></tr>' +
									'<tr id="ns1blankspaceAddressRowMailingCountryUpdate" class="ns1blankspace">' +
									'<td class="ns1blankspaceText">' +
									'<input id="ns1blankspaceAddressMailingCountryUpdate" class="ns1blankspaceText"' +
									' data-mandatory="1" data-caption="Mailing Country">' +
									'</td></tr>');						
					
					aHTML.push('</table>');					
					
					// If this is a new record, add this to column 1, not 2 
					$('#ns1blankspaceAddressColumn' + ((ns1blankspace.objectContext === -1) ? '1' : '2')).html(aHTML.join(''));

					aHTML = [];

					aHTML.push('<table class="ns1blankspace" id="ns1blankspaceGrowerSites">');
					aHTML.push('<tr class="ns1blankspaceCaption"><td class="nsFreshcareReadOnly" colspan="6">&nbsp;</td></tr>');
					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption" colspan="4">' +
									'Sites' +
									'</td>' +
									'<td colspan="2" style="text-align:right;">' +
									'<span id="ns1blankspaceSiteAdd" class="ns1blankspaceAction">&nbsp;</span>' +
									'</td></tr>');
					aHTML.push('<tr><td class="ns1blankspaceHeaderCaption">Street</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Suburb</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">State</td>' + 
							        '<td class="ns1blankspaceHeaderCaption">Post Code</td>' +
							        '<td class="ns1blankspaceHeaderCaption">&nbsp;</td>' +
							    '</tr>');
					
					aHTML.push('</table>');

					$('#ns1blankspaceAddressRow2').html(aHTML.join(''));

					if (oNS && oNS.readOnly == true)
					{
						$('#ns1blankspaceMainAddress input').attr('disabled', true).addClass('nsFreshcareDisabled');
					}

					aHTML = [];

					if (ns1blankspace.objectContextData != undefined)
					{
						$('#ns1blankspaceAddressMailingAddress1').html(ns1blankspace.objectContextData["contactbusiness.mailingaddress1"].formatXHTML());
						$('#ns1blankspaceAddressMailingAddress2').html(ns1blankspace.objectContextData["contactbusiness.mailingaddress2"].formatXHTML());
						$('#ns1blankspaceAddressMailingSuburb').html(ns1blankspace.objectContextData["contactbusiness.mailingsuburb"].formatXHTML());
						$('#ns1blankspaceAddressMailingState').html(ns1blankspace.objectContextData["contactbusiness.mailingstate"].formatXHTML());
						$('#ns1blankspaceAddressMailingPostCode').html(ns1blankspace.objectContextData["contactbusiness.mailingpostcode"].formatXHTML());
						$('#ns1blankspaceAddressMailingCountry').html(ns1blankspace.objectContextData["contactbusiness.mailingcountry"].formatXHTML());
						$('#ns1blankspaceAddressMailingAddress1Update').val(ns1blankspace.objectContextData["contactbusiness.mailingaddress1"].formatXHTML());
						$('#ns1blankspaceAddressMailingAddress2Update').val(ns1blankspace.objectContextData["contactbusiness.mailingaddress2"].formatXHTML());
						$('#ns1blankspaceAddressMailingSuburbUpdate').val(ns1blankspace.objectContextData["contactbusiness.mailingsuburb"].formatXHTML());
						$('#ns1blankspaceAddressMailingStateUpdate').val(ns1blankspace.objectContextData["contactbusiness.mailingstate"].formatXHTML());
						$('#ns1blankspaceAddressMailingPostCodeUpdate').val(ns1blankspace.objectContextData["contactbusiness.mailingpostcode"].formatXHTML());
						$('#ns1blankspaceAddressMailingCountryUpdate').val(ns1blankspace.objectContextData["contactbusiness.mailingcountry"].formatXHTML());

						$.each(aElements, function() 
						{
							if ($('#ns1blankspaceAddress' + this).html() === '' ) {
								$('#ns1blankspaceAddress' + this).html('&nbsp;');
							}

							var iMax = Math.max($('#ns1blankspaceAddressRow' + this + 'Update').height(), $('#ns1blankspaceAddressRow' + this).height());
							$('#ns1blankspaceAddressRow' + this + 'Update').height(iMax);
							$('#ns1blankspaceAddressRow' + this).height(iMax);
						});

						$.each(ns1blankspace.objectContextData.sites, function() 
						{
							$('#ns1blankspaceGrowerSites').children().last().after(nsFreshcare.external.grower.address.row({row: this}));
						});

						// v3.1.2 SUP022859  If readonly, can't change anything
						if (oNS == undefined || !(oNS.readOnly == true))
						{
							$('.ns1blankspaceGrowerAddressRowEdit').click(function(event) 
							{
								// Changed so that opens new div
								// Call manage first to see if we need to add 
								var iAddressID = this.id.split('-').pop();
								if (iAddressID == '1' && this.id.indexOf('--1') > -1) {iAddressID = '-1'}
								var oAddress = $.grep(ns1blankspace.objectContextData.sites, function(x) {return x.id == iAddressID}).shift();

								nsFreshcare.external.grower.address.manage({add: false, edit: true, addressID: iAddressID});
								if (oAddress)
								{	nsFreshcare.external.grower.address.details({add: false, edit: true, addressID: iAddressID});}
							});

							// v3.4.001 SUP022964 For eLearning - can only remove rows
							if (bCanChangeStatus)
							{
								$('.ns1blankspaceGrowerAddressChangeStatus').each(function()
								{
									if ($(this).attr('data-action') === 'remove')
									{
										$(this).button({text: false, label: 'Remove', icons: {primary: 'ui-icon-close'}});
									}
									else if ($(this).attr('data-action') === 'activate')
									{
										$(this).button({text: false, label: 'Activate', icons: {primary:'ui-icon-check'}});
									}
									else if ($(this).attr('data-action') === 'inactivate')
									{
										$(this).button({text: false, label: 'Inactivate', icons: {primary:'ui-icon-minus'}});
									}
								});
								$('.ns1blankspaceGrowerAddressChangeStatus')
									.css('width', "25px")
									.click(nsFreshcare.external.grower.address.manageRow);
							}

							$('#ns1blankspaceSiteAdd').button({
								icons: {primary: "ui-icon-plus"}
							})
							.click(function() 
							{

								if (ns1blankspace.objectContextData.newSiteCount) 
								{
									ns1blankspace.objectContextData.newSiteCount++;	
								}
								else {ns1blankspace.objectContextData.newSiteCount = 1;}

								// v3.3.001 SUP023795 If user tries to add a new site, make sure they save it!
								ns1blankspace.inputDetected = true;
								nsFreshcare.external.grower.address.manage({add: true, edit: true});
								nsFreshcare.external.grower.address.details({add: true, edit: true});
							});
						}

						if (oParam.onComplete)
						{
							ns1blankspace.util.onComplete(oParam);
						}
					}
				}
			}	
		},

		manage: function(oParam)
		{
			var iAddressID = ns1blankspace.util.getParam(oParam, 'addressID').value;
			var iAddressLinkID = ns1blankspace.util.getParam(oParam, 'addressLinkID').value;
			var bAdd = ns1blankspace.util.getParam(oParam, 'add', {'default': true}).value;
			var bEdit = ns1blankspace.util.getParam(oParam, 'edit', {'default': true}).value;
			var fFunctionComplete = ns1blankspace.util.getParam(oParam, 'functionComplete').value;
			var bContinue = true;
			var aHTML = [];

			if ($('#ns1blankspaceAddressManageContainer').is('*'))
			{
				// Check if we were adding and have clicked another Address by accident
				if ($('#ns1blankspaceAddressManageDetails').attr('data-id') === '-1')
				{
					if (!bAdd)
					{
						ns1blankspace.container.confirm(
						{
							title: 'Warning!',
							html: 'Are you sure you want to cancel adding the site?',
							buttons: 
							[
								{text: 'OK', click: function() {bContinue = true; $(this).dialog('destroy')}},
								{text: 'Cancel', click: function() {bContinue = false; $(this).dialog('destroy')}}
							]
						});
					}
					else
					{
						$('#ns1blankspaceAddressManageContainer').remove();
						bContinue = false;
					}
				}
				else
				{
					$('#ns1blankspaceAddressManageContainer').remove();
					bContinue = false;
				}
			}

			// Add in 'Manage' container
			if (bContinue)
			{
				aHTML.push('<tr id="ns1blankspaceAddressManageContainer">' +
								'<td id="ns1blankspaceAddressManage"' +
								' colspan="' + $('tr.ns1blankspaceRowAddress').first().children().length + 
							'">');
				aHTML.push('<table id="ns1blankspaceAddress" class="ns1blankspaceContainer nsFreshcareDetails ns1blankspaceBorder">');

				aHTML.push('<tr>' + 
							'<td id="ns1blankspaceAddressManageColumn1" class="ns1blankspaceColumn1" style="width:72%;"></td>' +
							'<td id="ns1blankspaceAddressManageColumn2" class="ns1blankspaceColumn2"></td>' +
							'</tr>');

				aHTML.push('</table>');
				aHTML.push('</td></tr>');

				if (bAdd) 
				{
					// v3.1.1i SUP022871 Cater for when there's no Site address at all
					if ($('tr.ns1blankspaceRowAddress').is('*'))
					{
						$('tr.ns1blankspaceRowAddress').first().before(aHTML.join(''));
					}
					else
					{
						$('#ns1blankspaceGrowerSites').children().last().after(aHTML.join(''));
					}
				}
				else 
				{
					$('#ns1blankspaceSiteRow_' + iAddressID).after(aHTML.join(''));
				}

				aHTML = [];

				aHTML.push('<table class="ns1blankspaceColumn2">');
				aHTML.push('<tr><td>');
				if (bEdit) 
				{
					aHTML.push('<span id="ns1blankspaceAddressSave" class="ns1blankspaceAction">Done</span><br /><br />');
				}
				aHTML.push('<span id="ns1blankspaceAddressCancel" class="ns1blankspaceAction">Cancel</span><br />');

				aHTML.push('</td></tr><tr><td>&nbsp;</td></tr>');

				// v3.4.010 SUP023755 Added History section if admin user
				if (iAddressID && nsFreshcare.user.roleID == nsFreshcare.data.roles.admin)
				{
					aHTML.push('<tr>' +
								'<td class="nsFreshcareSystem" id="nsFreshcareSystemAddressSummary-' + iAddressID + '"' +
									' style="float: left;">' +
								'</td></tr>');		
				}
				aHTML.push('</table>');

				$('#ns1blankspaceAddressManageColumn2').html(aHTML.join(''));

				$('#ns1blankspaceAddressSave')
				.button({
					label: 'Done',
					icons: {primary: 'ui-icon-check'}
				})
				.css('width', '100px')
				.click(function(event) 
				{
					//We want to update (or add) the row
					ns1blankspace.okToSave = true;
					var iStatus = ($('#ns1blankspaceAddressStatus_' + (bAdd ? ns1blankspace.objectContextData.newSiteCount : iAddressID)).is('*'))
									? $('input[name="radioAddressStatus"]:checked').val()
									: undefined;
					// First validate mandatory fields
					$('#ns1blankspaceAddressManageColumn1  input[data-mandatory]').each(function()
					{
						if ($(this).attr('data-mandatory') === '1' && $(this).val() === '') 
						{
							ns1blankspace.okToSave = false;
							ns1blankspace.status.message($(this).attr('data-caption') + ' is mandatory.');
							return false;
						}
					});

					if (ns1blankspace.okToSave)
					{
						if (bAdd)
						{
							aHTML = [];
							var oRow = 
							{
								id: ns1blankspace.objectContextData.newSiteCount,
								address1: $('#ns1blankspaceSiteAddress1_' + ns1blankspace.objectContextData.newSiteCount).val(),
								address2: $('#ns1blankspaceSiteAddress2_' + ns1blankspace.objectContextData.newSiteCount).val(),
								addresssuburb: $('#ns1blankspaceSiteSuburb_' + ns1blankspace.objectContextData.newSiteCount).val(),
								addressstate: $('#ns1blankspaceSiteState_' + ns1blankspace.objectContextData.newSiteCount).val(),
								addresspostcode: $('#ns1blankspaceSitePostCode_' + ns1blankspace.objectContextData.newSiteCount).val(),
								type: '1',	/* Street address */
								status: (iStatus ? iStatus : (ns1blankspace.objectContextData.sites.length == 0 && ns1blankspace.objectContextData.newSiteCount == 1) ? '1': '2'),
								addresscountry: 'Australia',
								'address.addresslink.id': undefined,
								'address.addresslink.object': '12',
								'address.addresslink.objectcontext': ns1blankspace.objectContext
							}
							$('#ns1blankspaceGrowerSites').children().last().after(nsFreshcare.external.grower.address.row({row: oRow}));
							$('#ns1blankspaceSiteChangeStatus-first_' + ns1blankspace.objectContextData.newSiteCount)
								.button({text: false, label: 'Remove', icons: {primary: 'ui-icon-close'}})
								.css('width', "25px")
								.click(nsFreshcare.external.grower.address.manageRow);
						}
						else
						{
							$('#ns1blankspaceSiteRow_' + iAddressID).attr('data-modified', 'true');
							if (iStatus) {$('#ns1blankspaceSiteRow_' + iAddressID).attr('data-status', iStatus);}
							$('#ns1blankspaceSiteValue_streetAddress1-' + iAddressID).html($('#ns1blankspaceSiteAddress1_' + iAddressID).val());
							$('#ns1blankspaceSiteValue_streetAddress2-' + iAddressID).html($('#ns1blankspaceSiteAddress2_' + iAddressID).val());
							$('#ns1blankspaceSiteValue_streetSuburb-' + iAddressID).html($('#ns1blankspaceSiteSuburb_' + iAddressID).val());
							$('#ns1blankspaceSiteValue_streetState-' + iAddressID).html($('#ns1blankspaceSiteState_' + iAddressID).val());
							$('#ns1blankspaceSiteValue_streetPostCode-' + iAddressID).html($('#ns1blankspaceSitePostCode_' + iAddressID).val());
						}
						$('#ns1blankspaceAddressManageContainer').remove();
					}
				});

				$('#ns1blankspaceAddressCancel')
				.button({
					label: 'Cancel',
					icons: {
						primary: 'ui-icon-close'
					}
				})
				.css('width', '100px')
				.click(function(event) 
				{
					$('#ns1blankspaceAddressManageContainer').remove();
				});
			}
		},

		details: function(oParam)
		{
			var bAdding = ns1blankspace.util.getParam(oParam, 'add', {'default': false}).value;
			var iAddressID = ns1blankspace.util.getParam(oParam, 'addressID', {'default': ns1blankspace.objectContextData.newSiteCount}).value;
			var iAddressLinkID = ns1blankspace.util.getParam(oParam, 'addressLinkID').value;
			var oAddress = $.grep(ns1blankspace.objectContextData.sites, function(x) {return x.id == iAddressID}).shift();
			var aHTML = [];

			aHTML.push('<table id="ns1blankspaceAddressManageDetails_' + iAddressID + '"' +
							' data-id="' + (iAddressID === ns1blankspace.objectContextData.newSiteCount ? '-1' : iAddressID) + '"' +
							' data-addressID="' + iAddressID + '" data-addressLinkID="' + iAddressLinkID + '"' +
							(iAddressID === ns1blankspace.objectContextData.newSiteCount ? '" data-type="new"' : '') +
							'>');

			//aHTML.push('<tr class="ns1blankspaceRowAddress" id="ns1blankspaceSiteRow_' + iAddressID + 
			aHTML.push('<tr class="ns1blankspaceCaption">' +
					  	'<td class="ns1blankspaceCaption">Site Address 1</td>' +
					  	'<tr class="ns1blankspace">' +
					  	'<td class="ns1blankspaceText">' +
					  		'<input id="ns1blankspaceSiteAddress1_' + iAddressID + '"' +
					  			' class="ns1blankspaceText"' +
					  			' data-mandatory="1" data-caption="Site Address 1"></td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
					  	'<td class="ns1blankspaceCaption">Site Address 2</td>' +
					  	'<tr class="ns1blankspace">' +
					  	'<td class="ns1blankspaceText">' +
					  		'<input id="ns1blankspaceSiteAddress2_' + iAddressID + '"' +
					  			' class="ns1blankspaceText"' +
					  			' data-caption="Site Address 2"></td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
					  	'<td class="ns1blankspaceCaption">Site Suburb</td>' +
					  	'<tr class="ns1blankspace">' +
					  	'<td class="ns1blankspaceText">' +
					  		'<input id="ns1blankspaceSiteSuburb_' + iAddressID + '"' +
					  			' class="ns1blankspaceText ns1blankspaceSelectAddress"' +
					  			' data-mandatory="1" data-caption="Site Suburb"  data-suburbcase="upper">' +
					  			'</td></tr>');

			aHTML.push('<tr class="ns1blankspaceCaption">' +
					  	'<td class="ns1blankspaceCaption">State / Post Code</td>' +
					  	'<tr class="ns1blankspace">' +
					  	'<td class="ns1blankspaceText">' +
					  		'<input id="ns1blankspaceSiteState_' + iAddressID + '"' +
					  			' class="ns1blankspaceText" size="3" style="width:47%;"' +
					  			' data-mandatory="1" data-caption="Site State">&nbsp;&nbsp;' +
					  		'<input id="ns1blankspaceSitePostCode_' + iAddressID + '"' +
					  			' class="ns1blankspaceText" size="10" style="width:47%;"' +
					  			' data-mandatory="1" data-caption="Site Post Code">' +
					  	'</td></tr>');

			// v3.1.0 Allow admin to update status manaully
			if (nsFreshcare.user.roleID === nsFreshcare.data.roles.admin)
			{
				aHTML.push('<tr class="ns1blankspaceCaption">' +
						  	'<td class="ns1blankspaceCaption">Site Status</td>' +
						  	'<tr class="ns1blankspace">' +
						  	'<td class="ns1blankspaceText">' +
								'<input id="ns1blankspaceAddressStatus_' + iAddressID + '" class="ns1blankspaceRadio"' +
									'<input type="radio" id="radioAddressStatus1" name="radioAddressStatus" data-text="Primary" value="1"/>Primary Address' +
									'&nbsp;&nbsp;&nbsp;' +
									'<input type="radio" id="radioAddressStatus2" name="radioAddressStatus" data-text="Secondary" value="2"/>Secondary Address' +
									'&nbsp;&nbsp;&nbsp;' +
									'<input type="radio" id="radioAddressStatus3" name="radioAddressStatus" data-text="Inactive" value="3"/>Inactive' +
						  	'</td></tr>');

			}

			aHTML.push('</table>');

			$('#ns1blankspaceAddressManageColumn1').html(aHTML.join(''));

			if (oAddress)
			{
				$('#ns1blankspaceSiteAddress1_' + iAddressID).val($('#ns1blankspaceSiteValue_streetAddress1-' + iAddressID).html().formatXHTML());
				$('#ns1blankspaceSiteAddress2_' + iAddressID).val($('#ns1blankspaceSiteValue_streetAddress2-' + iAddressID).html().formatXHTML());
				$('#ns1blankspaceSiteSuburb_' + iAddressID).val($('#ns1blankspaceSiteValue_streetSuburb-' + iAddressID).html().formatXHTML());
				$('#ns1blankspaceSiteState_' + iAddressID).val($('#ns1blankspaceSiteValue_streetState-' + iAddressID).html().formatXHTML());
				$('#ns1blankspaceSitePostCode_' + iAddressID).val($('#ns1blankspaceSiteValue_streetPostCode-' + iAddressID).html().formatXHTML());
				$('[name="radioAddressStatus"][value="' + $('#ns1blankspaceSiteRow_' + iAddressID).attr('data-status') + '"]').attr('checked', true);

				if ($('#nsFreshcareSystemAddressSummary-' + iAddressID).is('*'))
				{
					$('#nsFreshcareSystemAddressSummary-' + iAddressID).html('<span style="font-size:1.125em;">System Information&nbsp;</span>' +
									'<span class="ns1blankspaceSystemAction"></span>' +
									'<br /><br />' +
										'<b>Created On: </b><br />' + oAddress.createddate +
									'<br /><br />' +
										'<b>Created By: </b><br />' + oAddress.createdusertext +
									'<br /><br />' +
										'<b>Modified On: </b><br />' + oAddress.modifieddate +
									'<br /><br />' +
										'<b>Modified By: </b><br />' + oAddress.modifiedusertext);


					$('#nsFreshcareSystemAddressSummary-' + iAddressID)
						.on('click', function()
						{
							$('#ns1blankspaceMultiUseContainer').css('width', '720');
							ns1blankspace.container.show(
							{
								xhtmlElement: $('#nsFreshcareSystemAddressSummary-' + iAddressID), 
								xhtmlElementID: 'ns1blankspaceMultiUseContainer', 
								leftOffset: (707 - $('#nsFreshcareSystemAddressSummary-' + iAddressID).width()) * -1, 
								topOffset: $('#nsFreshcareSystemAddressSummary-' + iAddressID).height() * -1, 
								onShow: nsFreshcare.external.grower.address.getHistory,
								address: iAddressID,
								object: nsFreshcare.objectBusiness,
								historyFields: nsFreshcare.admin.grower.data.site.historyFields,
								auditFieldsFrom: oAddress,
								tablePrefix: '',
								xhtmlElementSystemID: 'nsFreshcareAddressSystem',
								xhtml: '<table style="background-color: #EFEFEF; border: 2px solid #B8B8B8">' +
											'<tr>' +
												'<td class="ns1blankspaceSummaryCaption">Site Address History</td>' +
												'<td style="width: 25px; padding: 5px;"><span class="ns1blankspaceSystemClose"></span></td>' +
											'</tr>' + 
											'<tr>' +
												'<td style="padding: 5px;height: 300px;" colspan="2"' +
													' id="nsFreshcareAddressSystem">' + ns1blankspace.xhtml.loading + '</td>' +
											'</tr></table>'
							});
						});
	
					$('.ns1blankspaceSystemAction')
						.button({icons: {primary: 'ui-icon-arrowthick-1-sw'}})
						.css('font-size', '0.75em')
						.css('height', '18px')
						.css('width', '18px');
				}
			}
			else
			{
				$('[name="radioAddressStatus"][value="2"]').attr('checked', true);
			}
		},

		row: function(oParam)
		{
			var aHTML = [];
			var oRow = ns1blankspace.util.getParam(oParam, 'row').value;
			var bNew = (oRow.id === ns1blankspace.objectContextData.newSiteCount);
			var bCanChangeStatus = ns1blankspace.util.getParam(oParam, 'canChangeStatus', {'default': true}).value;
			
			// v2.0.3 if inactive, can't edit the address
			var sClass = (oRow.status === '3') ? 'nsFreshcareInactive' : 'ns1blankspaceGrowerAddressRowEdit';

			aHTML.push('<tr class="ns1blankspaceRowAddress"' +
						' id="ns1blankspaceSiteRow_' + oRow.id + '"' +
						' data-status="' + oRow.status + '"' +
						(bNew ? ' data-type="new" data-modified="true"' : '') +
						'>');

			aHTML.push('<td class="ns1blankspaceRow ' + sClass + '"' +
						' id="ns1blankspaceSiteValue_streetAddress1-' + oRow.id + '"' +
						(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : '') +
						' data-default="' + oRow.status + '"' +
						' data-mandatory="1" data-caption="Site Street Address">' + 
							oRow.address1.formatXHTML() + '</td>');
			
			aHTML.push('<td class="ns1blankspaceRow ' + sClass + '"' +
						' data-default="' + oRow.status + '"' +
						(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : '') +
						' id="ns1blankspaceSiteValue_streetAddress2-' + oRow.id + '">' + 
							oRow.address2.formatXHTML() + '</td>');

			aHTML.push('<td class="ns1blankspaceRow ' + sClass + '"' +
						' id="ns1blankspaceSiteValue_streetSuburb-' + oRow.id + '"' +
						' data-default="' + oRow.status + '"' +
						(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : '') +
						' data-mandatory="1" data-caption="Site Suburb">' + 
							oRow.addresssuburb.formatXHTML() + '</td>');

			aHTML.push('<td class="ns1blankspaceRow ' + sClass + '"' +
						' id="ns1blankspaceSiteValue_streetState-' + oRow.id + '"' +
						(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : '') +
						' data-default="' + oRow.status + '"' +
						' data-mandatory="1" data-caption="Site State" style="width:75px;">' + 
							oRow.addressstate.formatXHTML() + '</td>');

			aHTML.push('<td class="ns1blankspaceRow ' + sClass + '"' +
						' id="ns1blankspaceSiteValue_streetPostCode-' + oRow.id + '"' +
						(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : '') +
						' data-default="' + oRow.status + '"' +
						' data-mandatory="1" data-caption="Site Post Code" style="width:100px;">' + 
							oRow.addresspostcode.formatXHTML() + '</td>');

			// Cannot remove 'primary' address
			// Status 1 = Primary, Status 2 = Secondary, Status 3 = Inactive
			// v2.0.3 And can't 'remove' inactive addresses but can reactivate
			// v2.0.4 Can remove or reactivate inactive addresses. If address is inactivated, change background colour - if removed, add strikethrough
			if (oRow.status != '1' && bCanChangeStatus)
			{
				aHTML.push('<td class="ns1blankspaceAction ns1blankspaceGrowerAddressChangeStatus"' +
							(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : ' data-type="new"') +
							' data-default="' + oRow.status + '"' +
							' id="ns1blankspaceSiteChangeStatus-first_' + oRow.id + '"' +
							' data-action="' + (bNew ? 'remove' : (oRow.status === '2') ? 'inactivate' : 'activate') + 
							'"></td>');

				aHTML.push('<td class="ns1blankspaceAction ns1blankspaceGrowerAddressChangeStatus"' +
							(!bNew ? ' data-linkid="' + oRow['address.addresslink.id'] + '"' : ' data-type="new"') +
							' data-default="' + oRow.status + '"' +
							' id="ns1blankspaceSiteChangeStatus-second_' + oRow.id + '"' +
							' data-action="' + ((oRow.status === '2') ? 'remove' : 'remove') + 
							'"></td>');

			}
			//else if (!bCanChangeStatus)
			//{
			//	aHTML.push('<td class="ns1blankspaceAction ns1blankspaceGrowerAddressChangeStatus"' +
			//				' id="ns1blankspaceSiteChangeStatus-first_' + oRow.id + '"' +
			//				' data-action="remove"></td>');
			//}
			else
			{
				aHTML.push('<td>&nbsp;</td>');
			}
			aHTML.push('</tr>');
			
			return aHTML.join('');
		},

		manageRow: function(oParam) 
		{
			var sXHTMLElementID = ns1blankspace.util.getParam(oParam, 'xhtmlElementID', {'default': this.id}).value;
			var sID = sXHTMLElementID.split('_').pop();
			
			// $(this).parent().children().first().css().indexOf('text-decoration') > -1
			if ($('#' + sXHTMLElementID).attr('data-action') === 'remove') 
			{
				if ($('#' + sXHTMLElementID).attr('data-type') === 'new') 
				{
					// Remove row altogether
					$('#ns1blankspaceSiteRow_' + sID).remove();
				}
				else 
				{
					// v2.0.4 SUP021404 Add strikethrough style to row & change first button to 'activate' and second button to 'inactivate'
					$('#ns1blankspaceSiteRow_' + sID).children().css('text-decoration', 'line-through');
					$('#ns1blankspaceSiteRow_' + sID).attr('data-status', '3');		// Inactive

					$('#ns1blankspaceSiteChangeStatus-first_' + sID)
						.button({
							text: false,
							label: 'Activate',
							icons: {
								primary: 'ui-icon-check'
							}
						})
						.attr('data-action', 'activate');

					$('#ns1blankspaceSiteChangeStatus-second_' + sID)
						.button({
							text: false,
							label: 'Inactivate',
							icons: {
								primary: 'ui-icon-minus'
							}
						})
						.attr('data-action', 'inactivate');
				}

			}
			else if ($('#' + sXHTMLElementID).attr('data-action') === 'activate')
			{
				$('#ns1blankspaceSiteRow_' + sID).children().removeClass('nsFreshcareInactive');
				$('#ns1blankspaceSiteRow_' + sID).children().css('text-decoration', '');
				$('#ns1blankspaceSiteRow_' + sID).children().addClass('ns1blankspaceGrowerAddressRowEdit');
				$('#ns1blankspaceSiteRow_' + sID).attr('data-status', '2');		// Secondary

					// v2.0.4 SUP021404 Add strikethrough style to row & change first button to 'inactivate' and second button to 'remove'
				$('#ns1blankspaceSiteChangeStatus-first_' + sID)
				.button({
					text: false,
					label: 'Inactivate',
					icons: {
						primary: 'ui-icon-minus'
					}
				})
				.attr('data-action', 'inactivate');

				$('#ns1blankspaceSiteChangeStatus-second_' + sID)
				.button({
					text: false,
					label: 'Remove',
					icons: {
						primary: 'ui-icon-close'
					}
				})
				.attr('data-action', 'remove');
			}
			else if ($('#' + sXHTMLElementID).attr('data-action') === 'inactivate')
			{
				// v2.0.4 SUP021404 Add strikethrough style to row & change first button to 'activate' and second button to 'remove'
				$('#ns1blankspaceSiteRow_' + sID).children().addClass('nsFreshcareInactive');
				$('#ns1blankspaceSiteRow_' + sID).attr('data-status', '3');		// Inactive

				$('#ns1blankspaceSiteChangeStatus-first_' + sID)
					.html('Activate')
					.button({
						text: false,
						label: 'Activate',
						icons: {
							primary: 'ui-icon-check'
						}
					})
					.attr('data-action', 'activate');

				$('#ns1blankspaceSiteChangeStatus-second_' + sID)
					.button({
						text: false,
						label: 'Remove',
						icons: {
							primary: 'ui-icon-close'
						}
					})
					.attr('data-action', 'remove');
			}
			else
			{

				// Shouldn't get in here
				/*
				$('#ns1blankspaceSiteRow_' + sID).children().css('text-decoration', 'none');
				$('#ns1blankspaceSiteRow_' + sID).attr('data-status', '2');

				$('#ns1blankspaceSiteChangeStatus_' + sID).button({
					icons: {
						primary: 'ui-icon-close'
					}
				})
				.attr('data-action', 'remove');
				*/

			}

		},

		getHistory: function(oParam, oResponse)
		{
			var iObject = ns1blankspace.util.getParam(oParam, 'object').value;
			var iObjectContext = ns1blankspace.util.getParam(oParam, 'xhtmlElement').value;
			iObjectContext = $(iObjectContext).attr('id').split('-').pop();
			var aHistoryFields = ns1blankspace.util.getParam(oParam, 'historyFields').value;

			nsFreshcare.util.system.data.systemRows = undefined;
			oParam.systemStep = 2;
			oParam.stripPrefix = false;

			$('.ns1blankspaceSystemClose')
				.button({icons: {primary: 'ui-icon-arrowthick-1-ne'}})
				.css('font-size', '0.75em')
				.css('height', '18px')
				.css('width', '18px')
				.on('click', function()
				{
					$(ns1blankspace.xhtml.container)
						.attr('data-initiator', '')
						.hide(ns1blankspace.option.hideSpeedOptions)
						.html();
				});

			var oSearch = new AdvancedSearch();
			oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
			oSearch.addField($.map(aHistoryFields, function(x) {return x.name}).join(','));
			oSearch = nsFreshcare.util.system.addSnapShot(oSearch, iObjectContext);
			oSearch.getResults(function(data) {nsFreshcare.util.system.show(oParam, data)});
		},
	},

	memberships: 
	{
		search: function (oParam, oResponse) 
		{
			var iContactBusiness = ns1blankspace.data.contactBusiness;
			var iStep = 1;

			if (oParam) 
			{
				iContactBusiness = (oParam.contactBusiness) ? oParam.contactBusiness : iContactBusiness;
				if (oParam.membershipStep) {iStep = oParam.membershipStep; }
			}

			if (iStep === 1 && iContactBusiness && ns1blankspace.objectContextData) 
			{

				// V2.0.2 Added Crop and HarvestMonth to this search
				// v2.0.4a SUP021493 Added issueddate
				// v3.1.2 SUP022574 Added Paid field, SUP022693 plus agrilastaudit fields and Expiry fields
				// v3.1.2 SUP022882 Added certificate audit and COP auditdueafter fields
				// v3.2.005 SUP022047 Added lastaudit.auditbusiness field
				// v3.3.001 SUP023456 Added lastaudit.resultstatus
				// v3.3.005 SUP023801 Removed jasanzDate field
				ns1blankspace.objectContextData.memberships = [];
				var sAddField = (oParam.lastAudit != undefined && oParam.lastAudit) ? ",agrisubscription.lastauditdate" : "";
				
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "agri";
				oSearch.method = 'AGRI_SUBSCRIPTION_SEARCH';
				oSearch.addField('agrisubscription.membership,agrisubscription.membershiptext,agrisubscription.status,agrisubscription.statustext,agrisubscription.firstcertified' + 
								',agrisubscription.startdate,agrisubscription.enddate,agrisubscription.agricertificate.certificatenumber,agrisubscription.agricodeofpractice.code' + 
								',agrisubscription.agricertificate.enddate,agrisubscription.codeofpractice,agrisubscription.codeofpracticetext,agrisubscription.membership.code,agrisubscription.agricertificate.id' +
								',agrisubscription.agricertificate.id,agrisubscription.agricertificate.audit,agrisubscription.agricertificate.sentdate,agrisubscription.agricertificate.dateissued' + 
								',agrisubscription.harvestmonth,agrisubscription.crop,agrisubscription.agricertificate.sent,agrisubscription.laststatuschangedate,agrisubscription.contactbusinesstext' +
								',agrisubscription.createddate,agrisubscription.createdusertext,agrisubscription.modifieddate,agrisubscription.modifiedusertext,agrisubscription.agricertificate.audittext' +
								',agrisubscription.agricertificate.createddate,agrisubscription.agricertificate.createdusertext,agrisubscription.agricertificate.modifieddate,agrisubscription.agricertificate.modifiedusertext' +
								',agrisubscription.contactbusiness,agrisubscription.contactperson,agrisubscription.agrilastaudit.paid,agrisubscription.agricodeofpractice.auditdueafter' +	
								',agrisubscription.agricertificate.audit.actualdate,agrisubscription.agricertificate.subscription' +
								',agrisubscription.agrilastaudit.actualdate,agrisubscription.agrilastaudit.type,agrisubscription.agrilastaudit.typetext,agrisubscription.agrilastaudit.auditbusiness' +
								',agrisubscription.expirymonth,agrisubscription.expirychangereason,agrisubscription.expirychangeddate,agrisubscription.expirychangedbyuser,agrisubscription.expirychangedbyusertext' +
								',agrisubscription.agrilastaudit.resultstatus' +
								sAddField);
				oSearch.addFilter("agrisubscription.contactbusiness", "EQUAL_TO", iContactBusiness);
				oSearch.addFilter("agrisubscription.membership.status", 'EQUAL_TO', nsFreshcare.data.membershipStatusActive);	// v1.0.24 Active memberships only
				// v3.1.201 SUP022976 Need to diaply in membership priorityorder
				oSearch.sort('agrisubscription.membership.priorityorder', 'asc');
				if (oParam.lastAudit != undefined && oParam.lastAudit) {
					oSearch.addCustomOption('lastaudit', ',,N');
				}
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) 
				{
					if (oResponse.status === "OK") 
					{
						ns1blankspace.objectContextData.memberships = oResponse.data.rows;
						oParam = ns1blankspace.util.setParam(oParam, 'membershipStep', 10);
						nsFreshcare.external.grower.memberships.search(oParam, oResponse);
					}
					else
					{
						ns1blankspace.status.error('Error searching for Membership: ' + oResponse.error.errornotes);
					}
				});
			}

			else if (iStep === 10) 
			{
				delete(oParam.membershipStep);
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	audits: 	
	{
		search: function (oParam, oResponse) 
		{

			var iContactBusiness = ns1blankspace.data.contactBusiness;
			var iStep = 1;
			var iAuditBusiness = ns1blankspace.util.getParam(oParam, 'auditBusiness').value;

			if (oParam) 
			{
				iContactBusiness = (oParam.contactBusiness) ? oParam.contactBusiness : iContactBusiness;
				if (oParam.auditStep) {iStep = oParam.auditStep; }
			}

			if (iStep === 1 && iContactBusiness && ns1blankspace.objectContextData) {
				// v3.1.2 SUP022574 Added audit.paid
				// v3.4.010 SUP023214 Added membershipstatus
				ns1blankspace.objectContextData.audits = [];
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "audit";
				oSearch.method = 'AUDIT_SEARCH';
				oSearch.addField('audit.reference,audit.title,audit.scheduleddate,audit.actualdate,audit.resultstatus,audit.resultstatustext' + 
								',audit.auditbusinesstext,audit.auditpersontext,audit.agrisubscription.membership,audit.subscription' +
								',audit.contactperson,audit.contactpersontext,audit.typetext,audit.codeofpractice,audit.codeofpracticetext' +
								',audit.auditbusiness,audit.auditperson,audit.paid,audit.membershipstatus');
				oSearch.addFilter("audit.contactbusiness", "EQUAL_TO", iContactBusiness);
				if (iAuditBusiness != undefined) 
				{
					oSearch.addFilter("audit.auditbusiness", 'EQUAL_TO', iAuditBusiness)
				}
				oSearch.sort('audit.actualdate', 'desc')
				oSearch.rows = 50;
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) {

					oParam = ns1blankspace.util.setParam(oParam, 'auditStep', 2);
					nsFreshcare.external.grower.audits.search(oParam, oResponse);

				});
			}
			else if (iStep === 2) 
			{
				if (oResponse.status === "OK") 
				{
					ns1blankspace.objectContextData.audits = oResponse.data.rows;
					oParam = ns1blankspace.util.setParam(oParam, 'auditStep', 3);
					nsFreshcare.external.grower.audits.search(oParam);
				}
			}
			else if (iStep === 3) 
			{
				delete(oParam.auditStep);
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	trainers: 	
	{
		search: function (oParam, oResponse) 
		{

			var iContactBusiness = ns1blankspace.data.contactBusiness;
			var dToday = new Date();
			var iStep = 1;

			if (oParam) {
				iContactBusiness = (oParam.contactBusiness) ? oParam.contactBusiness : iContactBusiness;
				if (oParam.trainerStep) {iStep = oParam.trainerStep; }
			}

			if (iStep === 1 && iContactBusiness && ns1blankspace.objectContextData) {

				ns1blankspace.objectContextData.trainers = [];
				var dToday = new Date();
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "contact";
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.tradename,contactbusiness.relationshipbusiness.id');
				oSearch.addFilter("contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", iContactBusiness);
				oSearch.addFilter("contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipTrainer);
				oSearch.addFilter("contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString('dd MMM yyyy'));
				oSearch.addBracket("(");
				oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString('dd MMM yyyy'));
				oSearch.addOperator("or");
				oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
				oSearch.addBracket(")");
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) {

					oParam = ns1blankspace.util.setParam(oParam, 'trainerStep', 2);
					nsFreshcare.external.grower.trainers.search(oParam, oResponse);
				});
			}
			else if (iStep === 2) {
				if (oResponse.status === "OK") {
					ns1blankspace.objectContextData.trainers = oResponse.data.rows;
					oParam = ns1blankspace.util.setParam(oParam, 'trainerStep', 3);
					nsFreshcare.external.grower.trainers.search(oParam);
				}
			}
			else if (iStep === 3) {
					// This is where we add in the call back function								
					ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	auditors: 	
	{
		search: function (oParam, oResponse) 
		{
			var iContactBusiness = ns1blankspace.data.contactBusiness;
			var dToday = new Date();
			var iStep = 1;

			if (oParam) {
				iContactBusiness = (oParam.contactBusiness) ? oParam.contactBusiness : iContactBusiness;
				if (oParam.auditorStep) {iStep = oParam.auditorStep; }
			}

			if (iStep === 1 && iContactBusiness && ns1blankspace.objectContextData) {

				ns1blankspace.objectContextData.auditors = [];
				var dToday = new Date();
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "contact";
				oSearch.method = 'CONTACT_BUSINESS_SEARCH';
				oSearch.addField('contactbusiness.tradename');
				oSearch.addFilter("contactbusiness.relationshipbusiness.othercontactbusiness", "EQUAL_TO", iContactBusiness);
				oSearch.addFilter("contactbusiness.relationshipbusiness.type", "EQUAL_TO", nsFreshcare.data.relationshipAuditor);
				oSearch.addFilter("contactbusiness.relationshipbusiness.startdate", "LESS_THAN_OR_EQUAL_TO", dToday.toString('dd MMM yyyy'));
				oSearch.addBracket("(");
				oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", "GREATER_THAN_OR_EQUAL_TO", dToday.toString('dd MMM yyyy'));
				oSearch.addOperator("or");
				oSearch.addFilter("contactbusiness.relationshipbusiness.enddate", 'IS_NULL');
				oSearch.addBracket(")");
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) {

					oParam = ns1blankspace.util.setParam(oParam, 'auditorStep', 2);
					nsFreshcare.external.grower.auditors.search(oParam, oResponse);
				});
			}
			else if (iStep === 2) {
				if (oResponse.status === "OK") {
					ns1blankspace.objectContextData.auditors = oResponse.data.rows;
					oParam = ns1blankspace.util.setParam(oParam, 'auditorStep', 3);
					nsFreshcare.external.grower.auditors.search(oParam);
				}
			}
			else if (iStep === 3) {
					// This is where we add in the call back function								
					ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	trainingCourses: 	
	{
		search: function (oParam, oResponse) 
		{

			var iContactBusiness = ns1blankspace.data.contactBusiness;
			var iStep = 1;

			if (oParam) {
				iContactBusiness = (oParam.contactBusiness) ? oParam.contactBusiness : iContactBusiness;
				if (oParam.courseStep) {iStep = oParam.courseStep; }
			}

			if (iStep === 1 && iContactBusiness && ns1blankspace.objectContextData) {

				ns1blankspace.objectContextData.trainingCourses = [];
				var dToday = new Date();
				var oSearch = new AdvancedSearch();
				oSearch.method = 'AGRI_EDUCATION_TRAINING_COURSE_ATTENDEE_SEARCH';
				oSearch.addField('agritrainingcourseattendee.course,agritrainingcourseattendee.coursetext,agritrainingcourseattendee.traineecontactbusiness,' + 
								 'agritrainingcourseattendee.traineecontactbusinesstext,agritrainingcourseattendee.attendingtrainee,agritrainingcourseattendee.status,' + 
								 'agritrainingcourseattendee.statustext,agritrainingcourseattendee.course.trainercontactbusinesstext,agritrainingcourseattendee.course.trainercontactpersontext,' +
								 'agritrainingcourseattendee.course.package.membership,agritrainingcourseattendee.course.package.codeofpracticetext,' + 
								 'agritrainingcourseattendee.course.package.membershiptext,agritrainingcourseattendee.course.coursedate,' +
								 'agritrainingcourseattendee.course.package.membership.code,agritrainingcourseattendee.course.id');
				oSearch.addFilter("traineecontactbusiness", "EQUAL_TO", iContactBusiness);
				oSearch.sort('agritrainingcourseattendee.course.package.membershiptext', 'asc');
				oSearch.sort('agritrainingcourseattendee.course.coursedate', 'desc')
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) {

					oParam = ns1blankspace.util.setParam(oParam, 'courseStep', 2);
					nsFreshcare.external.grower.trainingCourses.search(oParam, oResponse);
				});
			}
			else if (iStep === 2) {
				if (oResponse.status === "OK") {
					ns1blankspace.objectContextData.trainingCourses = oResponse.data.rows;
					oParam = ns1blankspace.util.setParam(oParam, 'courseStep', 3);
					nsFreshcare.external.grower.trainingCourses.search(oParam);
				}
			}
			else if (iStep === 3) {
				// This is where we add in the call back function								
				ns1blankspace.util.onComplete(oParam);
			}
		}
	},

	productGroups: 
	{
		search: function(oParam, oResponse) 
		{
			// v2.0.2 Now searched by Subscription, not ContactBusiness
			var iSubscription;
			var iMembership;

			if (oParam) {
				if (oParam.membership != undefined) {iSubscription = oParam.membership} 
			}
			else {oParam = {}}

			if (oResponse === undefined && iSubscription != undefined) 
			{
				// v3.4.010 SUP023755 Added audit fields
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "agri";
				oSearch.method = 'AGRI_PRODUCT_GROUP_SEARCH';
				oSearch.addField('subscription,productcategory,productcategorytext');
				oSearch.addField(ns1blankspace.option.auditFields);
				oSearch.addFilter("subscription", "EQUAL_TO", iSubscription);
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) 
				{
					nsFreshcare.external.grower.productGroups.search(oParam, oResponse);
				});
			}
			else if (oResponse && iSubscription) 
			{

				if (oResponse.status === "OK") 
				{
					oParam.membershipData.productGroups = oResponse.data.rows;
					if (ns1blankspace.objectContextData.memberships)
					{
						iMembership = $.grep($.map(ns1blankspace.objectContextData.memberships, function(x, index) {return {subscription: x.id, index: index}}),
										function(y) {return y.subscription === iSubscription}).shift();
						iMembership = (iMembership) ? iMembership.index : iMembership;

						if (iMembership)
						{
							ns1blankspace.objectContextData.memberships[iMembership].productGroups = oResponse.data.rows;
						}
					}
				}
				else
				{
					oParam.membershipData.productGroups = [];
				}

				if (oParam && oParam.onComplete) {
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	scopeValues: 
	{
		search: function(oParam, oResponse) 
		{
			var iSubscription = ns1blankspace.util.getParam(oParam, 'membership').value;
			var iMembership;

			if (oResponse === undefined && iSubscription != undefined) 
			{
				// v3.4.010 SUP023755 Added audit fields
				var oSearch = new AdvancedSearch();
				oSearch.endPoint = "agri";
				oSearch.method = 'AGRI_OBJECT_SCOPE_SEARCH';
				oSearch.addField('object,objectcontext,scope,scopetext');
				oSearch.addField(ns1blankspace.option.auditFields);
				oSearch.addFilter("object", "EQUAL_TO", nsFreshcare.objectSubscription);
				oSearch.addFilter("objectcontext", "EQUAL_TO", iSubscription);
				oSearch.rf = 'json';
				oSearch.getResults(function(oResponse) 
				{
					nsFreshcare.external.grower.scopeValues.search(oParam, oResponse);
				});
			}
			else if (oResponse && iSubscription) 
			{
				if (oResponse.status === "OK") 
				{
					oParam.membershipData.scopeValues = oResponse.data.rows;
					if (ns1blankspace.objectContextData.memberships)
					{
						iMembership = $.grep($.map(ns1blankspace.objectContextData.memberships, function(x, index) {return {subscription: x.id, index: index}}),
										function(y) {return y.subscription === iSubscription}).shift();
						iMembership = (iMembership) ? iMembership.index : iMembership;

						if (iMembership)
						{
							ns1blankspace.objectContextData.memberships[iMembership].scopeValues = oResponse.data.rows;
						}
					}
				}
				else
				{
					oParam.membershipData.scopeValues = [];
				}

				if (oParam && oParam.onComplete) 
				{
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	membershipSites: 
	{
		search: function(oParam, oResponse) 
		{
			var iSubscription;
			var iMembership;

			if (oParam) 
			{
				if (oParam.membership != undefined) {iSubscription = oParam.membership} 
			}
			else {oParam = {}}

			if (oResponse === undefined && iSubscription != undefined) 
			{
				// v3.4.010 SUP023755 Added audit fields
				var oSearch = new AdvancedSearch();
				oSearch.method = 'CORE_LOCATION_ADDRESS_SEARCH';
				oSearch.addField('address1,address2,addresssuburb,addressstate,addresspostcode,addresscountry,type,status,' +
									'address.addresslink.object,address.addresslink.objectcontext,address.addresslink.id');
				oSearch.addField('address.addresslink.createddate,address.addresslink.createduser,address.addresslink.createdusertext');
				oSearch.addFilter("address.addresslink.object", "EQUAL_TO", nsFreshcare.objectSubscription);
				oSearch.addFilter("address.addresslink.objectcontext", "EQUAL_TO", iSubscription);
				// v3.1.0 Added so that orphaned sites don't show on Membership tabs
				if (ns1blankspace.objectContextData && ns1blankspace.objectContextData.sites && ns1blankspace.objectContextData.sites.length > 0)
				{
					oSearch.addFilter('id', 'IN_LIST', $.map(ns1blankspace.objectContextData.sites, function(x) {return x.id}).join(','))
				}
				oSearch.sort('status', 'asc');
				oSearch.sort('addresssuburb', 'asc');
				oSearch.rf = 'json';
				oSearch.rows = 100;		// v3.3.001
				oSearch.getResults(function(oResponse) 
				{
					nsFreshcare.external.grower.membershipSites.search(oParam, oResponse);
				});
			}
			else if (oResponse && iSubscription) 
			{

				if (oResponse.status === "OK") 
				{
					oParam.membershipData.membershipSites = oResponse.data.rows;
					if (ns1blankspace.objectContextData.memberships)
					{
						iMembership = $.grep($.map(ns1blankspace.objectContextData.memberships, function(x, index) {return {subscription: x.id, index: index}}),
											function(y) {return y.subscription === iSubscription}).shift();
						iMembership = (iMembership) ? iMembership.index : iMembership;

						if (iMembership != undefined)
						{
							ns1blankspace.objectContextData.memberships[iMembership].membershipSites = oResponse.data.rows;
						}
					}
				}
				else
				{
					oParam.membershipData.membershipSites = [];
				}

				if (oParam && oParam.onComplete) {
					ns1blankspace.util.onComplete(oParam);
				}
			}
		}
	},

	membership: 
	{
		show: 	function(oParam) 
		{
			// v3.3.001 SUP023474 No longer conditionally shows Audit Re-Cert Due for JASANZ
			var aHTML = [];
			var iMembership;
			var oMembership;
			var bRenderAudits = false;
			var bRenderStatusTransactions = false;
			var aMonths = $.grep(ns1blankspace.data.search, function(x) {return x.method == 'FRESHCARE_MONTH_SEARCH'}).shift().rows;
			var oStandard;

			if (oParam) {
				if (oParam.membership) {iMembership = oParam.membership;}
				if (oParam.membershipData) {oMembership = oParam.membershipData; }
				if (oParam.renderAudits != undefined) {bRenderAudits = oParam.renderAudits}
				if (oParam.renderStatusTransactions != undefined) {bRenderStatusTransactions = oParam.renderStatusTransactions}
			}

			if (iMembership == undefined || oMembership == undefined) 
			{
				alert('Sorry can\'t find this membership.');
			}
			else if (iMembership != undefined && oMembership != undefined && oMembership.productGroups === undefined)
			{
				// Get Product Groups for this Membership
				oParam.onCompleteWhenCan = oParam.onComplete;
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.external.grower.membership.show);
				nsFreshcare.external.grower.productGroups.search(oParam);
			}
			else if (iMembership != undefined && oMembership != undefined && oMembership.scopeValues === undefined)
			{
				// v3.1.2 SUP022744 Get Scopes linked to this Membership
				if (oParam.onComplete) {oParam.onCompleteWhenCan = oParam.onComplete}
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.external.grower.membership.show);
				nsFreshcare.external.grower.scopeValues.search(oParam);
			}
			else if (iMembership != undefined && oMembership != undefined && oMembership.membershipSites === undefined)
			{
				// Get Sites linked to this Membership
				oParam.onCompleteWhenCan = oParam.onComplete;
				oParam = ns1blankspace.util.setParam(oParam, 'onComplete', nsFreshcare.external.grower.membership.show);
				nsFreshcare.external.grower.membershipSites.search(oParam);
			}
			else
			{
				if ($('#ns1blankspaceMainMembership' + iMembership).attr('data-loading') == '1')
				{
					// v3.3.001 SUP023456 Get details of Standard 
					oStandard = $.grep(nsFreshcare.data.memberships, function(x) {return x.id == oMembership['agrisubscription.membership']}).shift();

					$('#ns1blankspaceMainMembership' + iMembership).attr('data-loading', '');
					
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
									'Current Status' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Status" class="nsFreshcareReadOnly">' +
									oMembership["agrisubscription.statustext"] +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'Start Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Start" class="nsFreshcareReadOnly">' +
									oMembership["agrisubscription.startdate"] +
									'</td></tr>');		

					aHTML.push('<tr class="ns1blankspaceCaption">' +
									'<td class="ns1blankspaceCaption">' +
									'End Date' +
									'</td></tr>' +
									'<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'End" class="nsFreshcareReadOnly">' +
									oMembership["agrisubscription.enddate"] + '&nbsp;' + 
									'</td></tr>');		

					// v2.0.4 SUP021422 Added Certificate Sent date & conditional display of Certificate data
					if (oMembership["agrisubscription.agricertificate.id"] != '')
					{
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Sent Date' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceMembership' + iMembership + 'CertificateSent" class="nsFreshcareReadOnly">' +
										oMembership["agrisubscription.agricertificate.sentdate"] + '&nbsp;' +
										'</td></tr>');		
						
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Certificate Expires' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceMembership' + iMembership + 'Expires" class="nsFreshcareReadOnly">' +
										oMembership["agrisubscription.agricertificate.enddate"] + '&nbsp;' +
										'</td></tr>');		
					}
					else
					{
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'[No Certificate]' +
										'</td></tr>');		
					}

					if (nsFreshcare.user.roleID != nsFreshcare.data.roles.auditor && nsFreshcare.user.roleID != nsFreshcare.data.roles.admin)
					{
						aHTML.push('<tr class="ns1blankspaceCaption">' +
										'<td class="ns1blankspaceCaption">' +
										'Last Audit Date' +
										'</td></tr>' +
										'<tr class="ns1blankspace">' +
										'<td id="ns1blankspaceMembership' + iMembership + 'LastAudit" class="nsFreshcareReadOnly">' +
										oMembership["agrisubscription.lastauditdate"] + '&nbsp;' +
										'</td></tr>');		
					}

					$('#ns1blankspaceMembership' + iMembership + 'Column1').html(aHTML.join(''));

					
					aHTML = [];
					aHTML.push('<table class="ns1blankspace">');
					
					aHTML.push('<tr><td style="text-align:right;">');

					if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor)
					{
						// Determine which buttons to put in action area based on Membership status - Auditors only
						aHTML.push('<table class="ns1blankspace" width="150px" style="text-align:right;">');

						if (oMembership['agrisubscription.status'] === nsFreshcare.data.grower.subscriptionStatusWD)
						{
							aHTML.push('<tr><td>' + 
										'<span id="ns1blankspaceReinstateMembership' + iMembership + '"' +
											' class="ns1blankspaceAction" style="width:145px;">Notify Freshcare to Reinstate</span>' +
										'</tr></td>');

						}
						else
						{
							// v3.3.001 SUP023456 Don't allow Cert printing here if Member is Suspended
							if (oMembership['agrisubscription.agricertificate.id'] != ''
								&& oMembership['agrisubscription.status'] != nsFreshcare.data.grower.subscriptionStatusSP)
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
						}
						aHTML.push('</table>');		
					}
					else
					{
						aHTML.push('&nbsp;');
					}			
					aHTML.push('</td></tr>');
					
					$('#ns1blankspaceMembership' + iMembership + 'Column2').html(aHTML.join(''));


					// Now display fields that the CB can update
					aHTML = [];
					aHTML.push('<table class="ns1blankspace">');
					
					// Only Growers & Trainers not allowed to update
					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew" width="50%">' +
									'Re-Certification Audit Due' +
									'</td>' +
									'<td class="ns1blankspaceCaption"></td>' +
								'</tr>' +
								'<tr id="ns1blankspaceMembership' + iMembership + 'RowExpiryMonth" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'ExpiryMonth" class="nsFreshcareReadOnly">' +
										$.grep(aMonths, function(x) {return x.id == oMembership["agrisubscription.expirymonth"]}).shift().title +
									'</td>' +
									'<td class="ns1blankspaceText">');

					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.trainer || nsFreshcare.user.roleID == nsFreshcare.data.roles.grower)
					{
						aHTML.push('Updates not permitted');
					}
					else
					{
						aHTML.push('<input id="ns1blankspaceMembership' + iMembership + 'ExpiryMonthUpdate" class="ns1blankspaceSelect"' +
										' data-method="FRESHCARE_MONTH_SEARCH" data-cache="true"' +
										' data-mandatory="1" data-caption="Re-Certification Audit Due"' +
										' data-click="nsFreshcare.admin.grower.membership.expiryMonthChangeReason"' + 
										' value="' + $.grep(aMonths, function(x) {return x.id == oMembership["agrisubscription.expirymonth"]}).shift().title + '"' +
										' data-id="' + oMembership["agrisubscription.expirymonth"] + '">');

						// Now add the fields for when ExpiryMonth is changed (only shown on RHS)
						aHTML.push('</td></tr>')

						aHTML.push('<tr class="ns1blankspace ns1blankspaceExpiryMonthChange" style="display:none;">' +
										'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew">&nbsp;</td>' +
										'<td class="ns1blankspaceCaption">Re-Certification Due Change Reason</td>' +
									'</tr>' +
									'<tr class="ns1blankspace ns1blankspaceExpiryMonthChange" style="display:none;">' +
										'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew">&nbsp;</td>' +
										'<td class="ns1blankspaceText">' +
											'<textarea rows="5" cols="40"  id="ns1blankspaceMembership' + iMembership + 'ExpiryChangeReason"' +
												' class="ns1blankspaceTextMulti" style="width:' + (parseInt($('#ns1blankspaceMembership' + iMembership + 'Row2').width() /2)) + 'px;">' +
											'</textarea></td></tr>');

						// v3.3.005 Don't ask if no certificate
						if (oMembership['agrisubscription.agricertificate.id'] != '')
						{
							aHTML.push('<tr class="ns1blankspaceCaption ns1blankspaceExpiryMonthChange" style="display: none;">' +
											'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew">&nbsp;</td>' +
											'<td class="ns1blankspaceCaption">' +
											'Does this change apply to the current certificate (i.e. the expiry date of the current certificate will change)?' +
											'</td></tr>' +
											'<tr class="ns1blankspace ns1blankspaceExpiryMonthChange" style="display: none;">' +
											'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew">&nbsp;</td>' +
											'<td class="ns1blankspaceRadio" id="ns1blankspaceMembership' + iMembership + 'ExpiryChangeCertificateUpdate">' +
												'<input type="radio" id="radio' + iMembership + 'UpdateCertificateExpiryY" name="radio' + iMembership + 'UpdateCertificateExpiry" data-text="Yes" value="Y"/>Yes' +
												'&nbsp;&nbsp;&nbsp;<input type="radio" id="radio' + iMembership + 'UpdateCertificateExpiryN" name="radio' + iMembership + 'UpdateCertificateExpiry" data-text="No" value="N"/>No' +
											'');
						}
					}
					aHTML.push('</td></tr>');

					// v3.3.001 SUP023456 Now sets caption as apprpropriate
					aHTML.push('<tr class="ns1blankspace">' +
									'<td class="ns1blankspaceCaption ns1blankspaceHideOnNew" width="50%">' +
									(oMembership['agrisubscription.membership'] == nsFreshcare.data.membershipSCS ? 'Operational': 'Harvest') + ' Months' +
									'</td>' +
									'<td class="ns1blankspaceCaption" style="text-align:right;">' +
										'<span style="font-size:0.825em;"><a href="#" id="nsFreshcareMembership' + iMembership + 'HarvestMonthsAll">[ All ]</a></span>&nbsp;' +
									'</td></tr>' +
									'<tr id="ns1blankspaceMembership' + iMembership + 'RowHarvestMonths" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'HarvestMonths" class="nsFreshcareReadOnly">&nbsp;' +
									'</td>' +
									'<td class="ns1blankspaceText" id="ns1blankspaceMembership' + iMembership + 'HarvestMonthsUpdate">' +
									'</td>' + 
									'</tr>');	

					// v3.3.001 SUP023456 Now looks up crop list corresponding to Membership
					aHTML.push('<tr class="ns1blankspace">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Crops" class="ns1blankspaceCaption ns1blankspaceHideOnNew">' +
									'Crops' +
									'</td>' +
									'<td id="ns1blankspaceMembership' + iMembership + 'CellCrops" class="ns1blankspaceText">' +
									'<input id="ns1blankspaceMembership' + iMembership + 'CropsUpdate"' +
										' class="ns1blankspaceSelect ns1blankspaceWatermark"' +
										' data-multiselect="true"' +
										' data-method="SETUP_STRUCTURE_ELEMENT_OPTION_SEARCH"' +
										' data-methodFilter="title-TEXT_IS_LIKE|element-EQUAL_TO-' + oStandard.secropslookup + '"' +
										' data-membership="' + iMembership + '"' +
										' maxlength="300"' +
										' value="Search for valid Crops">' +
									'</td>' + 
									'</tr>' );

					// v3.1.2 SUP022744 Moved from Details tab
					aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
									'<td class="ns1blankspaceCaption">' +
									'Certificate Scope' +
									'</td><td class="ns1blankspaceCaption">&nbsp;</td></tr>' +
								'<tr id="ns1blankspaceMembership' + iMembership + 'RowScope" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'Scope" class="nsFreshcareReadOnly">&nbsp;' +
									'</td>' + 
									'<td id="ns1blankspaceMembership' + iMembership + 'ScopeUpdate" class="ns1blankspaceText">' +
									'<table class="ns1blankspace" style="margin-bottom:7px;">');

					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.grower)
					{
						aHTML.push('<tr><td class="nsFreshcareReadOnly">Updates not permitted</td></tr>');
					}
					aHTML.push('</table>' +
									'</td></tr>');

					// v2.0.4 SUP021383 Replaced 'Product Groups' with 'Category'
					aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
									'<td class="ns1blankspaceCaption">' +
									'Category' +
									'</td><td class="ns1blankspaceCaption">&nbsp;</td></tr>' +
								'<tr id="ns1blankspaceMembership' + iMembership + 'RowProductGroup" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'ProductGroup" class="nsFreshcareReadOnly">&nbsp;' +
									'</td>' + 
									'<td id="ns1blankspaceMembership' + iMembership + 'ProductGroupUpdate" class="ns1blankspaceText">' +
									'<table class="ns1blankspace" style="margin-bottom:7px;">');

					if (nsFreshcare.user.roleID != nsFreshcare.data.roles.grower)
					{

						$.each(nsFreshcare.data.productGroups, function() {
							aHTML.push('<tr><td id="nsFreshcareProductGroup-' + iMembership + '_' + this[0] + '" ' + 
											'class="nsFreshcareProductGroup nsFreshcareSelectable">' + this[1] + '</td>' + 
											'</tr>');
						});
					}
					else
					{
						aHTML.push('<tr><td class="nsFreshcareReadOnly">Updates not permitted</td></tr>');
					}
					aHTML.push('</table>' +
									'</td></tr>');

					aHTML.push('<tr class="ns1blankspace ns1blankspaceHideOnNew">' +
									'<td class="ns1blankspaceCaption">' +
									'Sites' +
									'</td><td class="ns1blankspaceCaption">&nbsp;</td></tr>' +
									'<tr id="ns1blankspaceMembership' + iMembership + 'RowMembershipSite" class="nsFreshcareReadOnly ns1blankspaceHideOnNew">' +
									'<td id="ns1blankspaceMembership' + iMembership + 'MembershipSite" class="nsFreshcareReadOnly">&nbsp;' +
									'<td id="ns1blankspaceMembership' + iMembership + 'MembershipSiteUpdate" class="ns1blankspaceText">' +
									'<table class="ns1blankspace" style="margin-bottom:7px;">');

					$.each(ns1blankspace.objectContextData.sites, function() 
					{
						if (this.status != '3')
						{
							var sAddress = (this.address1 + ((this.address2 != '') ? ' ' + this.address2 : '') + ' ' +
										   this.addresssuburb + ' ' + this.addressstate + ' ' + this.addresspostcode).formatXHTML();

							
							aHTML.push('<tr><td id="nsFreshcareMembershipSite-' + iMembership + '_' + this.id + '" ' + 
											'class="nsFreshcareMembershipSite nsFreshcareSelectable">' + sAddress + '</td>' + 
											'</tr>');
						}
					});
					aHTML.push('</table>' +
									'</td></tr>');

					aHTML.push('</table>');

					$('#ns1blankspaceMembership' + iMembership + 'Row2').html(aHTML.join(''));

					// v3.3.001 SUP023456 Now uses defaultScopeOptions
					if (nsFreshcare.user.roleID != nsFreshcare.data.roles.grower)
					{
						nsFreshcare.admin.grower.membership.defaultScopeOptions(
						{
							xhtmlElementID: 'ns1blankspaceMembership' + iMembership + 'ScopeUpdate', 
							membership: oMembership['agrisubscription.membership'],
							subscription: iMembership
						});
					}


					// Set editable values
					nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceMembership' + iMembership + 'HarvestMonths',
																			 values: oMembership["agrisubscription.harvestmonth"].formatXHTML(),
																			 update: false,
																			 context: iMembership,
																			 membership: iMembership});

					nsFreshcare.admin.grower.membership.harvestMonths.show({xhtmlElementId: 'ns1blankspaceMembership' + iMembership + 'HarvestMonthsUpdate',
																			 values: oMembership["agrisubscription.harvestmonth"].formatXHTML(),
																			 update: true,
																			 context: 'Update' + iMembership,
																			 membership: iMembership});

					nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembership' + iMembership + 'Crops',
																			 values: oMembership["agrisubscription.crop"].formatXHTML(),
																			 update: false,
																			 membership: iMembership,
																			 cropsTable: oStandard.secropslookup});

					nsFreshcare.admin.grower.membership.crops.show({xhtmlElementId: 'ns1blankspaceMembership' + iMembership + 'CellCrops',
																			 values: oMembership["agrisubscription.crop"].formatXHTML(),
																			 update: true,
																			 membership: iMembership,
																			 cropsTable: oStandard.secropslookup
																			});

					// v3.4.010 SUP023755 Added created date & user to Scope, Category & Sites

					// List existing Scopes
					// v3.1.2 SUP022744 Moved from Details tab
					var aValues = [];
					$.each(oMembership.scopeValues, function() 
					{
						if (this.scopetext != "") 
						{
							aValues.push('<span id="nsFreshcareScopeList-' + iMembership + '_' + this.scope + '" ' + 
								'class="nsFreshcareScopeList" ' +
								'data-rowID="' + this.id + '" ' +
								'data-createddate="' + this.createddate + '" ' +
								'data-createduser="' + this.createduser + '">' + 
									this.scopetext + 
								'</span>');
							$('#nsFreshcareScope-' + iMembership + '_' + this.scope)
								.addClass("nsFreshcareSelected")
								.attr('data-createddate', this.createddate)
								.attr('data-createduser', this.createduser);
						}
					});
					$('#ns1blankspaceMembership' + iMembership + 'Scope').html(((aValues.length > 0) ? aValues.join('<br />') : 'None'));

					
					// List existing Categories
					var aValues = [];
					$.each(oMembership.productGroups, function() 
					{
						if (this.productcategorytext != "") {
							aValues.push('<span id="nsFreshcareProductGroupList-' + iMembership + '_' + this.productcategory + '" ' + 
								'class="nsFreshcareProductGroupList" ' +
								'data-rowID="' + this.id + '" ' +
								'data-createddate="' + this.createddate + '" ' +
								'data-createduser="' + this.createduser + '">' +
									this.productcategorytext + 
								'</span>');
							$('#nsFreshcareProductGroup-' + iMembership + '_' + this.productcategory)
								.addClass("nsFreshcareSelected")
								.attr('data-createddate', this.createddate)
								.attr('data-createduser', this.createduser);
						}
					});
					$('#ns1blankspaceMembership' + iMembership + 'ProductGroup').html(((aValues.length > 0) ? aValues.join('<br />') : 'None'));

					
					// List existing Membership Sites 
					var aValues = [];
					$.each(oMembership.membershipSites, function() 
					{
						var sAddress = (this.address1 + ((this.address2 != '') ? ' ' + this.address2 : '') + ' ' +
									   this.addresssuburb + ' ' + this.addressstate + ' ' + this.addresspostcode).formatXHTML();

						// v2.0.3 - was saying 'this.categorytext'!
						if (sAddress != "") {
							aValues.push('<span id="nsFreshcareMembershipSiteList-' + iMembership + '_' + this.id + '" ' + 
								'class="nsFreshcareMembershipSiteList" ' +
								' style="font-size: 0.875em;"' +
								'data-rowID="' + this['address.addresslink.id'] + '" ' +
								'data-createddate="' + this['address.addresslink.createddate'] + '" ' +
								'data-createduser="' + this['address.addresslink.createduser'] + '">' +
									sAddress + 
								'</span>');
							$('#nsFreshcareMembershipSite-' + iMembership + '_' + this.id)
								.addClass("nsFreshcareSelected")
								.attr('data-createddate', this['address.addresslink.createddate'])
								.attr('data-createduser', this['address.addresslink.createduser']);
						}
					});
					$('#ns1blankspaceMembership' + iMembership + 'MembershipSite').html(((aValues.length > 0) ? aValues.join('<br />') : 'None'));
					
					// Remove invalid selections for VIT and WIN Memberships
					if (nsFreshcare.data.memberships)
					{	// v3.1.2 Now calls function
						nsFreshcare.admin.grower.membership.defaultWineryValues({subscription: oMembership});
					}
					
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

					// Bind the Category area
					$('#ns1blankspaceMembership' + iMembership + 'RowProductGroup .nsFreshcareProductGroup').click(function() {
						
						nsFreshcare.external.grower.manageMultiRows(this.id, iMembership)
					});

					// Bind the Membership Sites area
					$('#ns1blankspaceMembership' + iMembership + 'RowMembershipSite .nsFreshcareMembershipSite').click(function() {
						
						nsFreshcare.external.grower.manageMultiRows(this.id, iMembership)
					});

					// Bind the Print Certificate buttons for Auditors
					if (nsFreshcare.user.roleID === nsFreshcare.data.roles.auditor)
					{
						nsFreshcare.admin.grower.membership.bind({membership: oMembership});
					}

					// v3.1.207 SUP023057 Added Status rows for CB's
					if (nsFreshcare.user.roleID == nsFreshcare.data.roles.auditor)
					{
						oParam.renderStatusTransactions = true;
						oParam.showStatusRows = false;
					}

					// v3.1.0 Now adds to oParam instead of passing own oParam.
					// v3.3.001 SUP023097 Can now show training courses - but this is mutually exclusive (can't show Courses & Audits, etc together yet)
					oParam.auditBusiness = (nsFreshcare.user.roleID != nsFreshcare.data.roles.admin) ? ns1blankspace.user.contactBusiness : undefined;
					oParam.contactBusiness = ns1blankspace.objectContext;
					if (oParam.renderAudits === true)
					{
						nsFreshcare.admin.grower.membership.audits.show(oParam);
					}
					else if (oParam.renderCourses == true)
					{
						oParam.trainerBusiness = ns1blankspace.user.contactBusiness;
						nsFreshcare.admin.grower.membership.trainingCourses.show(oParam);
					}
					else if (oParam.onComplete)
					{
						ns1blankspace.util.onComplete(oParam);
					}
					//nsFreshcare.admin.grower.membership.statusTransactions.show(oParam); v3.1.0 removed as called from membership.audits.show()
				}	
			}
		}
	},

	save: 		
	{
		constructEmail: function(oParam) 
		{
			// For Trainers and Growers, all UPDATES are emailed so we construct that email here.
			var oElements = [];
			var oChangedValues = {};
			var aMessageHTML = ns1blankspace.util.getParam(oParam, 'messageHTML', {'default': []}).value;
			var sSource = ns1blankspace.util.getParam(oParam, 'source', {'default': nsFreshcare.user.role}).value;
			var sMessageTo = ns1blankspace.util.getParam(oParam, 'messageTo').value;
			var sMessageFrom = ns1blankspace.util.getParam(oParam, 'sMessageFrom').value;
			var aMessageToSourceHTML = [];
			var bSaveEmail = ns1blankspace.util.getParam(oParam, 'saveEmail', {'default': true}).value;
			//3.2.001 SUP022943 (tc) , new variables to store each data feild updated
			var aChangedFields 			= ns1blankspace.util.getParam(oParam, 'changedFields', {'default': []}).value;;
			var sChangedFieldsList 		= '';
			var bSiteAddressChanges		= 0	// 0 = false, 1 = true 


			if (aMessageHTML.length == 0)
			{
				if ($('#ns1blankspaceMainDetails').html() != '') 
				{
					oElements.push({element: 'TradingName', caption: 'Trading Name'});
					oElements.push({element: 'LegalName', caption: 'Legal Name'});
					oElements.push({element: 'ABN', caption: 'ABN'});
					oElements.push({element: 'Position', caption: 'Position'});
					oElements.push({element: 'Title', caption: 'Title'});
					oElements.push({element: 'Gender', caption: 'Gender'});
					oElements.push({element: 'FirstName', caption: 'First Name'});
					oElements.push({element: 'Surname', caption: 'Surname'});
					oElements.push({element: 'Phone', caption: 'Phone'});
					oElements.push({element: 'Mobile', caption: 'Mobile'});
					oElements.push({element: 'Fax', caption: 'Fax'});
					oElements.push({element: 'Email', caption: 'Email'});

					oChangedElements = $.grep(oElements, function(a) 
					{
						var sOriginal = ($('#ns1blankspaceDetails' + a.element).html() === '&nbsp;') ? '' : $('#ns1blankspaceDetails' + a.element).html().formatXHTML();
						return $('#ns1blankspaceDetails' + a.element + 'Update').val() != sOriginal;
					});

					if (oChangedElements.length > 0) 
					{
						$.each(oChangedElements, function() 
						{
							aChangedFields.push(this.caption);
							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: this.caption,
										 oldValue: $('#ns1blankspaceDetails' + this.element).html().formatXHTML(), 
										 newValue: $('#ns1blankspaceDetails' + this.element + 'Update').val(),
										 freshcareUpdate: true
										}));
						});
					}

					// Check if Send Printed Certificates is different
					if ($('#ns1blankspaceDetailsSendPrintedCertificates').is('*') &&
						$('input[name="radioSendPrintedCertificates"]:checked').val() != $('#ns1blankspaceDetailsSendPrintedCertificates').attr('data-id')) 
					{
						aChangedFields.push("Send Printed Certificates");
						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Send Printed Certificates?',
										oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.se" + nsFreshcare.data.sendPrintedCertificatesId + "text"].formatXHTML() : ''),
										newValue: $('input[name="radioSendPrintedCertificates"]:checked').attr('data-text')}));
					}

					// Check if Receive Link Requests is different
					if ($('#ns1blankspaceDetailsReceiveLinkRequests').is('*') &&
						$('input[name="radioReceiveLinkRequests"]:checked').attr('data-text') != $('#ns1blankspaceDetailsReceiveLinkRequests').html()) 
					{
						aChangedFields.push("Receive Link Requests");
						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Receive Link Requests?',
										oldValue: ((ns1blankspace.objectContext != -1) ? ns1blankspace.objectContextData["contactbusiness.seallowlinkrequests"] : ''),
										newValue: $('input[name="radioReceiveLinkRequests"]:checked').val()}));
					}


					if ($('#ns1blankspaceDetailsNotesUpdate').val() != '') 
					{
						aChangedFields.push("Notes");
						aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Notes',
									oldValue: '', newValue: $('#ns1blankspaceDetailsNotesUpdate').val(),
										 freshcareUpdate: true}));
					}
				}

				// v3.1.205 SUP023021 Now saves contact details
				if ($('#ns1blankspaceMainContacts').html() != '') 
				{
					$('tr.ns1blankspaceContactRow').each(function() 
					{
						var sRowID = this.id.split('_').pop();
						if ($(this).attr('data-type') === 'new') 
						{
							// A new contact

							sNewContact = $('#ns1blankspaceContactFirstName_' + sRowID).val() + 
										  $('#ns1blankspaceContactSurname_' + sRowID).val() + 
										  $('#ns1blankspaceContactSurname_' + sRowID).val() +
										  $('#ns1blankspaceContactMobile_' + sRowID).val() +
										  $('#ns1blankspaceContactPhone_' + sRowID).val(); 

							if (sNewContact.length > 0) 
							{
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
											{label: 'Contact',
											 oldValue: '[New Contact]', 
											 newValue: '<table>' +
											 			 	'<tr><td style="font-weight:bold;">Name</td>' + 
											 			 		'<td>' + $('#ns1blankspaceContactFirstName_' + sRowID).val() + ' ' + $('#ns1blankspaceContactSurname_' + sRowID).val() + '</td></tr>' +
											 			 	'<tr><td style="font-weight:bold;">Email</td>' +
											 			 		'<td>' + $('#ns1blankspaceContactEmail_' + sRowID).val() + '</td></tr>' +
											 			 	'<tr><td style="font-weight:bold;">Mobile</td>' +
											 			 		'<td>' + $('#ns1blankspaceContactMobile_' + sRowID).val() + '</td></tr>' +
											 			 	'<tr><td style="font-weight:bold;">Phone</td>' +
											 			 		'<td>' + $('#ns1blankspaceContactPhone_' + sRowID).val() + '</td></tr>' +
											 			 '</table>'
											}));
							}
						}
						else
						{
							if ($('#ns1blankspaceContactName_' + sRowID).css('text-decoration') == 'line-through') 
							{
								// A deleted record

								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
											{label: 'Contact',
											 oldValue: $('#ns1blankspaceContactName_' + sRowID).html(), 
											 newValue: 'Contact to be removed.'
											}));
							}
							else 
							{
								var sOldContact = '';
								var sNewContact = '<table>' +
								 			 	'<tr><td style="font-weight:bold;">Name</td>' + 
								 			 		'<td>' + $('#ns1blankspaceContactValue_name_' + sRowID).html() + '</td></tr>' +
											  	'<tr><td style="font-weight:bold;">Email</td>' +
											 		'<td>' + $('#ns1blankspaceContactValue_email_' + sRowID).html() + '</td></tr>' +
											  	'<tr><td style="font-weight:bold;">Mobile</td>' +
											 		'<td>' + $('#ns1blankspaceContactValue_mobile_' + sRowID).html() + '</td></tr>' +
											  	'<tr><td style="font-weight:bold;">Phone</td>' +
											 		'<td>' + $('#ns1blankspaceContactValue_phone_' + sRowID).html() + '</td></tr>' +
											   '</table>';
								
								var oContact = $.grep(ns1blankspace.objectContextData.contacts, function(a) { return a.id == sRowID;});
								
								if (oContact.length > 0) 
								{
									oContact = oContact[0];
									sOldContact = '<table>' +
									 			 	'<tr><td style="font-weight:bold;">Name</td>' + 
									 			 		'<td>' + oContact['contactperson.firstname'].formatXHTML() + ' ' + oContact['contactperson.surname'].formatXHTML() + '</td></tr>' +
												  	'<tr><td style="font-weight:bold;">Email</td>' +
											 			'<td>' + oContact['contactperson.email'].formatXHTML() + '</td></tr>' +
												  	'<tr><td style="font-weight:bold;">Mobile</td>' +
											 			'<td>' + oContact['contactperson.mobile'].formatXHTML() + '</td></tr>' +
												  	'<tr><td style="font-weight:bold;">Phone</td>' +
											 			'<td>' + oContact['contactperson.workphone'].formatXHTML() +'</td></tr>' +
											 	  '</table>';
								}

								if (sOldContact != sNewContact) 
								{

									aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
												{label: 'Contact',
												 oldValue: sOldContact, 
												 newValue: sNewContact
												}));
								}
							}
						}
					});
				}

				if ($('#ns1blankspaceMainAddress').html() != '') 
				{
					oElements = []; 
					oElements.push({element: 'MailingAddress1', caption: 'Mailing Address 1'});
					oElements.push({element: 'MailingAddress2', caption: 'Mailing Address 2'});
					oElements.push({element: 'MailingSuburb', caption: 'Mailing Suburb'});
					oElements.push({element: 'MailingState', caption: 'Mailing Post Code'});
					oElements.push({element: 'MailingCountry', caption: 'Mailing Country'});

					oChangedElements = $.grep(oElements, function(a) {
						var sOriginal = ($('#ns1blankspaceAddress' + a.element).html() === '&nbsp;') ? '' : $('#ns1blankspaceAddress' + a.element).html().formatXHTML();
						return $('#ns1blankspaceAddress' + a.element + 'Update').val() != sOriginal;
					});

					if (oChangedElements.length > 0) 
					{
						aChangedFields.push("Mailing Address");
						$.each(oChangedElements, function() {

							aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: this.caption,
										 oldValue: $('#ns1blankspaceAddress' + this.element).html().formatXHTML(), 
										 newValue: $('#ns1blankspaceAddress' + this.element + 'Update').val(),
										 freshcareUpdate: true
										}));
						});
					}

					// Site Addresses
					// All site address changes must be emailed
					$('tr.ns1blankspaceRowAddress').each(function() 
					{
						var sFirstRowElement = $(this).children().first();
						var sAddressId = $(this).attr('id').split('_').pop();
						var bChanged = false;
						var bRemoved = false;
						var bNew = ($(sFirstRowElement).attr('data-type') === 'new');
						
						var sNewAddress = '';
						var sOldAddress = '';

						sNewAddress = $('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).html().formatXHTML() + ' ' +
									  $('#ns1blankspaceSiteValue_streetAddress2-' + sAddressId).html().formatXHTML() + ' ' +
									  $('#ns1blankspaceSiteValue_streetSuburb-' + sAddressId).html().formatXHTML() + ' ' +
									  $('#ns1blankspaceSiteValue_streetState-' + sAddressId).html().formatXHTML() + ' ' +
									  $('#ns1blankspaceSiteValue_streetPostCode-' + sAddressId).html().formatXHTML();

						if ($.trim(sNewAddress) != "") 
						{
							
							if ($(sFirstRowElement).attr('data-default') === '1') 
							{
								// If we're looking at the primary business address, check if this has changed
								var oOldAddress = $.grep(ns1blankspace.objectContextData.sites, function(x) {return x.status === '1'}).shift();
								sOldAddress = oOldAddress.address1.formatXHTML() +  ' ' + 
											  oOldAddress.address2.formatXHTML() + ' ' + 
											  oOldAddress.addresssuburb.formatXHTML() +  ' ' + 
											  oOldAddress.addressstate.formatXHTML() + ' ' + 
											  oOldAddress.addresspostcode.formatXHTML();

								if (sNewAddress != sOldAddress) 
								{
									bChanged = true;
									bSiteAddressChanges = 1;
								}

							}
							else 
							{

								var oSite = $.grep(ns1blankspace.objectContextData.sites, function(a) { return a.id == sAddressId;});
								
								if (oSite.length > 0) 
								{
									// This is an existing site we've updated
									oSite = oSite.shift();
									sOldAddress = oSite.address1.formatXHTML() +  ' ' + 
												  oSite.address2.formatXHTML() + ' ' + 
												  oSite.addresssuburb.formatXHTML() + ' ' + 
												  oSite.addressstate.formatXHTML() + ' ' + 
												  oSite.addresspostcode.formatXHTML();

									if (sNewAddress != sOldAddress) 
									{
										// Users can 'remove' the extra sites - if they do this, the row will have a strikethough. DO NOT delete the actual record, 
										// let Freshcare do this (after receiving email)
										bChanged = true;
										bRemoved = ($('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).css('text-decoration').indexOf('line-through') > -1);
										if (bRemoved) {sNewAddress = "Site " + sOldAddress + " to be removed.";} 
									} 
									else
									{
										bRemoved = ($('#ns1blankspaceSiteValue_streetAddress1-' + sAddressId).css('text-decoration').indexOf('line-through') > -1);
										if (bRemoved) {sNewAddress = "Site " + sOldAddress + " to be removed."; bChanged = true;} 
									}
								}
								else 
								{
									// This is a new site that's been added
									bSiteAddressChanges = 1;
									bChanged 	= true;
									sOldAddress = '[New Site added]';
								}
							}

							if (bChanged) 
							{
								aMessageHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Site Address', 
										oldValue: sOldAddress , newValue: sNewAddress,
										 freshcareUpdate: true }));
							}
						}		// New address is not blank

						if (bRemoved)	
						{
							bSiteAddressChanges = 1;
						}

					});

					if (bSiteAddressChanges)
					{
						aChangedFields.push("Site Address Changes");
					}
				}

				//Loop through all of the Memberships to see if anything has changed on them.
				$.each(ns1blankspace.objectContextData.memberships, function(index)
				{
					var aMembershipHTML = [];
					var iMembershipId = this.id;
					if ($('#ns1blankspaceMainMembership' + this.id).html() != '')
					{
						// v3.1.2 SUP022693 See if ExpiryMotnh has changed and save reason as well. Not shown for all users so check first
						if ($('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').is('*')
							&& this['agrisubscription.expirymonth'] != $('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').attr('data-id'))
						{
							aChangedFields.push("Re-Cert Audit Due");	// v3.3.001 SUP023584 Added
							aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: 'Re-Certification Audit Due',
										 oldValue: this['agrisubscription.expirymonth'].formatXHTML(), 
										 newValue: $('#ns1blankspaceMembership' + iMembershipId + 'ExpiryMonthUpdate').val(),
										 freshcareUpdate: true
										}));

							aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: 'Re-Certification Audit Due Change Reason',
										 oldValue: '', 
										 newValue: $('#ns1blankspaceMembership' + iMembershipId + 'ExpiryChangeReason').val(),
										 freshcareUpdate: true
										}));
						}

						// Get Harvest Months before and after and store in MMM format
						if (this['agrisubscription.harvestmonth']
							!= nsFreshcare.admin.grower.membership.harvestMonths.store({xhtmlElementId: 'ns1blankspaceMembership' + iMembershipId + 'HarvestMonthsUpdate'}))
						{	
							aChangedFields.push((this['agrisubscription.membership'] == nsFreshcare.data.membershipSCS ? 'Operational' : 'Harvest') + " Months");
							// v2.0.4 newValue didn't have # in elment id
							aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: (this['agrisubscription.membership'] == nsFreshcare.data.membershipSCS ? 'Operational' : 'Harvest') + ' Months',
										 oldValue: this['agrisubscription.harvestmonth'].formatXHTML(), 
										 newValue: $.map($('#ns1blankspaceMembership' + iMembershipId + 'HarvestMonthsUpdate .nsFreshcareHarvestMonthsSelected'), function(x) {return $(x).html()}).join(','),
										 freshcareUpdate: true
										}));
						}

						// Get Crops before and after and store in comma separated format
						// 2.0.3 removed invalid crops - not relevant here
						//var sInvalidCrops = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceError'), function(x) {return $(x).html()}).join(', ');
						var sCropsAfter = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
													function(x) {return $(x).html();}
															).join(', ');
				
						// v2.0.3d Need to make sure we catch sceanrio where crops set to Wine Grapes
						sCropsAfter = (this['agrisubscription.membership'] === nsFreshcare.data.membershipWIN || this['agrisubscription.membership'] === nsFreshcare.data.membershipVIT)
										? 'Wine Grapes'
										: sCropsAfter;

						// v2.0.3 added formatXHTML()
						if (this['agrisubscription.crop'].formatXHTML() != sCropsAfter)
						{
							aChangedFields.push("Crops");
							// We want to email the sorted values, displaying erroroneous values where applicable
							var aCropsSorted = $.map($('#ns1blankspaceMembership' + this.id + 'CropsUpdate_SelectRows .ns1blankspaceMultiSelect'), 
													function(x) 
													{
														return {
																	html: (($(x).hasClass('ns1blankspaceError')) 
																			? '<span style="color:red;">' + $(x).html() + '</span>'
																			: $(x).html()), 
																	value: $(x).html(),
																	sortValue: $(x).html().toUpperCase()
																}
													})
													.sort(ns1blankspace.util.sortBy('value'));

							aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail(
										{label: 'Crops',
										 oldValue: this['agrisubscription.crop'].formatXHTML(), 
										 newValue: ((sCropsAfter === 'Wine Grapes') ? sCropsAfter : $.map(aCropsSorted, function(x) {return x.value}).join(', ').formatXHTML()),
										 freshcareUpdate: true
										}));
						}

						// Get the list of SCopes before and after the changes. For after - we only want those that don't have a strikethrough. Growers can't update these
						// v3.1.2 SUP022744 moved from Details tab and now looks at scopeValues, not personGroups
						if (nsFreshcare.user.roleID != nsFreshcare.data.roles.grower) 
						{
							var sScopesBefore = ($.map(ns1blankspace.objectContextData.memberships[index].scopeValues, function (a) {return a.scopetext.formatXHTML()})).join(', ');
							var sScopesAfter = ($.map($.grep($('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareScopeList'), function (a) {return $(a).css('text-decoration').indexOf('line-through') === -1}), function(b) {return $(b).html().replace('<br>','')})).join(', ');
							if (sScopesBefore != sScopesAfter) 
							{
								aChangedFields.push('Certificate Scope');
								aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Certificate Scope',
											oldValue: sScopesBefore, newValue:sScopesAfter,
											 freshcareUpdate: true}));
							}
						}

						// Get the list of Categories before and after the changes. Growers can't update Categories
						// Added formatXHTML()
						if (nsFreshcare.user.roleID != nsFreshcare.data.roles.grower) 
						{
							var sProductGroupsBefore = ($.map(ns1blankspace.objectContextData.memberships[index].productGroups, function (a) {return a.productcategorytext.formatXHTML()})).join(', ');
							var sProductGroupsAfter = ($.map($.grep($('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareProductGroupList'), function (a) {return $(a).css('text-decoration').indexOf('line-through') == -1}), function(b) {return $(b).html().replace('<br>','')})).join(', ');
							if (sProductGroupsBefore != sProductGroupsAfter) 
							{
								aChangedFields.push('Product Category');
								aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Categories', 
											oldValue: sProductGroupsBefore, newValue: sProductGroupsAfter,
											 freshcareUpdate: true}));
							}
						}

						// Get the list of Membership Sites before and after the changes.
						// v2.0.3 addef formatXHTML()
						var sMembershipSitesBefore = ($.map(ns1blankspace.objectContextData.memberships[index].membershipSites, function (a) 
														{
															return (a.address1 + ((a.address2) ? ' ' + a.address2 : '') + ' ' + a.addresssuburb + ' ' + a.addressstate + ' ' + a.addresspostcode).formatXHTML();
														})
													 ).join('<br />');
						
						var sMembershipSitesAfter = ($.map($.grep($('#ns1blankspaceMainMembership' + iMembershipId + ' .nsFreshcareMembershipSiteList'), function (a) 
														{
															return $(a).css('text-decoration').indexOf('line-through') == -1}
														), 
														function(b) 
														{return $(b).html().replace('<br>','')})
													).join('<br />');
						
						if (sMembershipSitesBefore != sMembershipSitesAfter) 
						{
							aChangedFields.push("Membership Sites");
							aMembershipHTML.push(nsFreshcare.external.grower.save.addToEmail({label: 'Membership\'s Sites', 
										oldValue: sMembershipSitesBefore, newValue: sMembershipSitesAfter,
										 freshcareUpdate: true}));
						}
					}

					if (aMembershipHTML.length > 0)
					{
						aMembershipHTML.unshift('<tr><td colspan="3">&nbsp;</td></tr>' +
												'<tr><td colspan="3" style="font-weight: bold;">Changes to ' + this['agrisubscription.membershiptext'] + ' Membership:</td></tr>');
						aMessageHTML.push(aMembershipHTML.join(''));
					}

					// v2.0.3 removed invalid crops - not relevant for growers and trainers
					if (1 == 0 && sInvalidCrops != '')
					{
						if (aMessageToSourceHTML.length == 0)
						{
							aMessageToSourceHTML.push('<p>'+nsFreshcare.data.growerText+' ' + ns1blankspace.data.contactBusinessText.formatXHTML() + ' has been updated recently but still contains errors.</p>');
						}
						aMessageToSourceHTML.push('<p>The following Crops values are incorrect on ' + this['agrisubscription.membershiptext'] + ' Membership: ' + sInvalidCrops + '</p>');
					}
						
				});

				if (aMessageHTML.length > 0)
				{
					oParam.messageHTML = aMessageHTML;
					oParam.messagetoSourceHTML = aMessageToSourceHTML;
					oParam.changedFields 			= aChangedFields.join(', ');
					nsFreshcare.external.grower.save.constructEmail(oParam);
				}
				else
				{
					ns1blankspace.status.message('No changes made.');
				}

			}
			
			else if (aMessageHTML.length > 0) 
			{
				// v3.1.0 SUP022053 save if we're asked to
				var sSubject;
				var oEmailParam = {from: sMessageFrom, contactBusiness: ns1blankspace.objectContext, saveEmail: bSaveEmail};
				// Now send email
				// First, check if we have any messagetoSource
				if (oParam.messagetoSourceHTML.length > 0)
				{
					oEmailParam.subject = nsFreshcare.data.growerText+' ' + ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML() + ' updated. Errors to be fixed.';
					oEmailParam.updateRows = oParam.messagetoSourceHTML;
					oEmailParam.to = ns1blankspace.user.email;
					oEmailParam.onCompleteWhenCan = oParam.onComplete;
					oEmailParam.onComplete = nsFreshcare.external.grower.save.constructEmail;
					oEmailParam.messageHTML = aMessageHTML;
				}
				else
				{
					// v3.2.001 SUP022943 
					sChangedFieldsList				= oParam.changedFields;
					//oEmailParam.subject = sSource + ' ' + ns1blankspace.user.contactBusinessText.formatXHTML() + ' has updated ' +
					//						 ((nsFreshcare.user.role.toLowerCase() === 'grower') 
					//						 		? 'their details.' 
					//						 		: 'grower ' + ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML()) ;
					oEmailParam.subject 			= (sSource.toLowerCase() == nsFreshcare.data.roles.auditor ? 'CB' : sSource) + ' Update : [Fields Updated] ' +  sChangedFieldsList ;						
					oEmailParam.updateRows = aMessageHTML;
					oEmailParam.to = sMessageTo;
					oEmailParam.onComplete = oParam.onComplete;

				}


				nsFreshcare.external.grower.save.sendEmail(oEmailParam);
			}

		},

		addToEmail: function(oParam) 
		{

			if (oParam) {
				var sStyle = (oParam.freshcareUpdate != undefined && oParam.freshcareUpdate) ? 'background-color: #DDEABB;' : '';
				return('<tr style="height:10px;border-bottom: 1px solid #888888;' + sStyle + '">' + 
							'<td style="font-weight:bold;vertical-align:top;">' + oParam.label + '</td>' + 
							((ns1blankspace.objectContext != -1) ? '<td style="vertical-align:top;">' + oParam.oldValue + '</td>' : '') +
							'<td style="vertical-align:top;">' + oParam.newValue + '</td></tr>');
			}
			else return '';
		},

		sendEmail: 	function(oParam) 
		{	// 3.1.0i Now uses rpc version as siteFrom has been set on admin account

			var aHTMLBefore = [];
			var aHTMLAfter = [];
			var sMessageData = '';
			var aHTMLMessage = [];
			var sTo = '';
			var sFrom = nsFreshcare.data.emailFromAdmin;		// v1.0.27 Default (this will stop if from sending from user's email which isn't verified)
			var sSubject = 'Changes have been made to a ' + nsFreshcare.data.GrowerText + '.';
			var sMessageOverride = '';
			var iContactBusiness;
			var sSentToText = ns1blankspace.util.getParam(oParam, 'sentToText', {'default': ns1blankspace.spaceText}).value;
			var bSaveEmail = ns1blankspace.util.getParam(oParam, 'saveEmail', {'default': true}).value;
			var iContactPerson = ns1blankspace.util.getParam(oParam, 'contactPerson').value;

			if (oParam) {
				if (oParam.updateRows) {aHTMLMessage = oParam.updateRows;}
				if (oParam.to) {sTo = oParam.to;}
				if (oParam.from) {sFrom = oParam.from;}
				if (oParam.subject) {sSubject = oParam.subject;}
				if (oParam.message) {sMessageOverride = oParam.message}
				if (oParam.contactBusiness) {iContactBusiness = oParam.contactBusiness}
			}


			// Add in the details of the changes - needs to be preceded by a table element as this hasn't been added yet
			if (sMessageOverride === '') 
			{
				// v3.1.213 SUP023254 Can't assume we have an existing record
				var sUpdatedBy = (ns1blankspace.objectContextData && ns1blankspace.objectContextData['contactbusiness.tradename']) 
								? nsFreshcare.user.role + ' ' + ns1blankspace.user.contactBusinessText + 
									', has updated the grower record for ' + 
									ns1blankspace.objectContextData['contactbusiness.tradename'].formatXHTML()
								: sSubject;

				aHTMLBefore.push('<table class="ns1blankspaceSearchMedium" style="width:800px;">');
				aHTMLBefore.push('<tr><td>' + sUpdatedBy + '. Details are:</td></tr>');
				aHTMLBefore.push('<tr><td>&nbsp;</td></tr>');

				aHTMLBefore.push('<tr><td>');
				aHTMLBefore.push('<table class="ns1blankspaceSearchMedium" style="width:800px;">');
				aHTMLBefore.push('<tr><td><b>Field Updated</b></td>' + 
								((ns1blankspace.objectContext != -1) ? '<td><b>Old Value</b></td>' : '') + 
								'<td><b>New Value</b></td></tr>');
				// aHTMLMessage will be inserted here
				aHTMLAfter.push('</table></td></tr>');
			}
			else 
			{
				aHTMLBefore.push('<tr><td>' + sMessageOverride + '</td></tr>');
			}

			// Let freshcare know that there were errors so they can update the details themselves.
			if (nsFreshcare.data.saveError.length > 0) 
			{

				aHTMLAfter.push('<tr><td><table class="ns1blankspaceSearchMedium" style="width:800px;"><tr><td>&nbsp;<td></tr>');
				aHTMLAfter.push('<tr style="font-weight:bold;"><td>There were errors when saving. You will need to update these details manually:</td><tr>');
				
				$.each(nsFreshcare.data.saveError, function() {
					aHTMLAfter.push('<tr style="background-color: #DDEABB;"><td>' + this + '</td></tr>');
				});
				
				aHTMLAfter.push('</table></td></tr>');
			}
			// v2.0.3 added an extra line at the bottom for aesthetics
			aHTMLAfter.push('<p></p>');

			//$(ns1blankspace.xhtml.container).html(aHTMLBefore.join('') + aHTMLMessage.join('') + aHTMLAfter.join(''));
			//$(ns1blankspace.xhtml.container).show();

			// Send email
			sMessageData = 'subject=' + ns1blankspace.util.fs(sSubject) +
						  '&message=' + ns1blankspace.util.fs(aHTMLBefore.join('') + aHTMLMessage.join('') + aHTMLAfter.join('')) +
						  '&to=' + ns1blankspace.util.fs(sTo) +
						  '&fromemail=' + ns1blankspace.util.fs(sFrom) +
						  '&send=Y';		// v3.1.0
			// v3.2.005 Sup023190 Added replyTo
			if (oParam.replyTo)
			{
				sMessageData += '&replyto=' + oParam.replyTo;
			}
			
			// v2.0.1 All emails to be stored against Grower's contactbusiness unless new record.
			if (ns1blankspace.object === nsFreshcare.objectBusiness && iContactBusiness === undefined && ns1blankspace.objectContext != -1)
			{
				iContactBusiness = ns1blankspace.objectContext;
			}
			
			if (bSaveEmail)		// v3.1.0 SUP022053 save if we're asked to
			{
				// v3.2.020 SUP023620 Now saves against contactbusiness / contactperson if passed
				iContactBusiness = (iContactBusiness == -1) ? undefined : iContactBusiness;
				sMessageData += '&save=Y';
				if (iContactBusiness)
				{
					sMessageData += '&saveagainstcontactbusiness=' + iContactBusiness;
					sMessageData += '&contactbusiness=' + iContactBusiness;
				}

				if (iContactPerson)
				{
					sMessageData += '&contactperson=' + iContactPerson;
				}

				// ver 3.2.022 SUP023620 Save against passed contactbusness or current user's business
				if (ns1blankspace.objectContext === -1) 
				{
					// Store against current user's business
					sMessageData += '&saveagainstobject=' + ns1blankspace.util.fs(ns1blankspace.data.object.business) +
									'&saveagainstobjectcontext=' + ns1blankspace.util.fs((iContactBusiness ? iContactBusiness : ns1blankspace.user.contactBusiness));
				} 
				else 
				{
					// Store against current record
					sMessageData += '&saveagainstobject=' + ns1blankspace.util.fs(ns1blankspace.object) +
									'&saveagainstobjectcontext=' + ns1blankspace.util.fs(ns1blankspace.objectContext);
				}
			}

			delete(oParam.to);
			delete(oParam.from);
			delete(oParam.updateRows);
			delete(oParam.message);
			delete(oParam.contactBusiness);
			delete(oParam.contactPerson);
			delete(oParam.replyTo);

			// v3.1.0 changed to rpc
			$.ajax({
				type: 'POST',
				url: ns1blankspace.util.endpointURI('MESSAGING_EMAIL_SEND'),
				data: sMessageData,
				dataType: 'json',
				success: function(oResponse) {

					if (oResponse.status === 'OK') 
					{
						oParam.response = oResponse;

						if (ns1blankspace.objectContext != -1) {
							oParam.xhtmlElementID = '-' + ns1blankspace.objectContext;
						}

						if (oParam.wait) 
						{
							window.setTimeout("ns1blankspace.status.message('Sent to " + sSentToText + ".')", 3000);	
							if (oParam.onComplete != undefined) {
								window.setTimeout('ns1blankspace.util.onComplete({onComplete: ' + oParam.onComplete + ', xhtmlElementID: ' + oParam.xhtmlElementID + '})',3000);
							}
						}
						else
						{
							ns1blankspace.status.message('Sent to ' + sSentToText + '.');	
							if (oParam.onComplete != undefined) {
								ns1blankspace.util.onComplete(oParam);
							}

						}

					}
					else 
					{
						ns1blankspace.status.error(oResponse.error.errornotes);
					}
				}
			});
		}
	}
} 