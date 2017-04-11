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
