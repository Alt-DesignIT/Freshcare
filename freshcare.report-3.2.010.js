/*!
 * Copyright 2010, ibCom Pty Ltd ATF ibCom Unit Trust & contributors
 * Licensed under the MIT license.
 * http://1blankspace.com/license
 * 01 FEB 2010
 */
 
nsFreshcare.report = 
{
	init: function (oParam)
	{
		delete(ns1blankspace.report.reportGroups);
		ns1blankspace.report.reports = [];
		ns1blankspace.report.dictionary = [];
		ns1blankspace.report.selectAttributes = [];

		ns1blankspace.report.initData(oParam);

		// v3.1.1i Now removes access to reporting areas if user doesn't have access
		ns1blankspace.report.reports = $.grep(ns1blankspace.report.reports, function(x)
		{
			// First check if have access to financials at all
			if (x.group == 5) 
			{
				if (nsFreshcare.util.anyMatchInArray($.map(ns1blankspace.user.roles, function(y) {return y.id}), 
						[nsFreshcare.data.roles.financial, nsFreshcare.data.roles.financialLimited, nsFreshcare.data.roles.financialReadOnly]))
				{
					// Now check if access to financials is limited
					if ((x.method == 'FINANCIAL_PAYMENT_SEARCH'
						|| x.method == 'FINANCIAL_EXPENSE_SEARCH'
						|| x.method == 'FINANCIAL_CREDIT_NOTE_SEARCH') 
						&& $.inArray(nsFreshcare.data.roles.financialLimited, $.map(ns1blankspace.user.roles, function(y) {return y.id})) > -1)	
					{
						return false;
					}
					else {return true;}
				}
				else {return false;}
			}
			else 
			{
				return true;
			}
		});

		// v3.2.002 SUP023329 Add Fixed reports for Xero Super user for reconciling invoices added
		// v3.2.010 SUP023329 Only show if exportin to Xero
		if (nsFreshcare.option.exportToXero)
		{
			ns1blankspace.report.reports.push(
			{
				id: 151,
				name: "Invoices sent to Xero",
				group: 5,
				object: 5,
				objectName: "invoice",
				method: "FINANCIAL_INVOICE_SEARCH",
				returnParameters: 'invoice,invoice.lineitem,invoice.lineitem.financialaccount,invoice.invoicereceipt,invoice.contactbusinesssentto',
				functionSearch: ns1blankspace.financial.invoice.search.send,
				scriptOnNewPage: ns1blankspace.report.search.bind,
				scriptOpen: 'ns1blankspace.financial.invoice.init({id: this.id})',
				windowOpen: '/#/financial.invoice/id:',
				autoRun: true,
				customExportFormat:
				{
					headers:
					{
						captionsAsHeaders: true,
						delimiter: ',',
						surroundWith: '"'
					},
					items:
					{
						delimiter: ',',
						surroundWith: '"'
					}
				},
				fixedParameters:
				{
					fields: 
					[
						{name: 'invoice.reference', caption: 'Invoice No.'},
						{name: 'invoice.contactbusinesssentto.legalname', caption: 'Business'},
						{name: 'invoice.contactpersonsenttotext', caption:  'Person'},
						{name: 'invoice.sentdate', caption: 'Sent Date'},
						{name: 'invoice.amount', caption: 'Amount'},
						{name: 'invoice.tax',  caption: 'Tax'}
					],
					filters:
					[
						{
							name: 'invoice.sexeroinvoiceid',
							comparison: 'IS_NOT_NULL'
						},
						{
							name: 'invoice.sexeroinvoiceupdated',
							comparison: 'GREATER_THAN_OR_EQUAL_TO',
							value1: dToday.toString('dd MMM yyyy')
						}
					],
					sorts:
					[
						{name: 'invoice.reference', direction: 'asc'}
					]
				}
			});

			ns1blankspace.report.reports.push(
			{
				id: 152,
				name: "Credits sent to Xero",
				group: 5,
				object: 5,
				objectName: "invoice",
				method: "FINANCIAL_CREDIT_NOTE_SEARCH",
				returnParameters: 'creditnote,creditnote.lineitem,creditnote.lineitem.financialaccount,creditnote.contactbusiness',
				functionSearch: ns1blankspace.financial.credit.search.send,
				scriptOnNewPage: ns1blankspace.report.search.bind,
				scriptOpen: 'ns1blankspace.financial.credit.init({id: this.id})',
				windowOpen: '/#/financial.credit/id:',
				autoRun: true,
				customExportFormat:
				{
					headers:
					{
						captionsAsHeaders: true,
						delimiter: ',',
						surroundWith: '"'
					},
					items:
					{
						delimiter: ',',
						surroundWith: '"'
					}
				},
				fixedParameters:
				{
					fields: 
					[
						{name: 'creditnote.reference',  caption: 'Credit Note No.'},
						{name: 'creditnote.contactbusiness.legalname',  caption: 'Business'},
						{name: 'creditnote.contactpersontext',  caption: 'Person'},
						{name: 'creditnote.creditdate', caption: 'Credit Date'},
						{name: 'creditnote.amount', caption: 'Amount'},
						{name: 'creditnote.tax', caption: 'Tax'}
					],
					filters:
					[
						{
							name: 'creditnote.sexerocreditnoteid',
							comparison: 'IS_NOT_NULL'
						},
						{
							name: 'creditnote.sexerocreditnoteupdated',
							comparison: 'GREATER_THAN_OR_EQUAL_TO',
							value1: dToday.toString('dd MMM yyyy')
						}
					],
					sorts:
					[
						{name: 'creditnote.reference', direction: 'asc'}
					]
				}
			});
		}

		var bAll = true;

		if (oParam != undefined)
		{
			if (oParam.all != undefined) {bAll = oParam.all}
		}

		ns1blankspace.app.reset();

		ns1blankspace.objectName = 'report';

		ns1blankspace.viewName = 'Search & Reporting';

		ns1blankspace.app.set(oParam);

		ns1blankspace.app.context({all: true, inContext: false})
	}

}
