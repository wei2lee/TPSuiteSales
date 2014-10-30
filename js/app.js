var NationalityCodeMap = {
    0: 'Malaysian',
    1: 'Foreigner'
}
var PricePerLot = 30000;
var InterestRatePerYear = 0.06;
var InterestYearNumber = 5;
var SQF = 20;

function groupOfKey(arr, key) {
    var ret = {};
    for (var i = 0; i < arr.length; i++) {
        var keyval = arr[i][key];
        if (!ret[keyval]) ret[keyval] = [];
        ret[keyval].push(arr[i]);
    }
    return ret;
}

function arrayOfKey(arr, key) {
    var ret = [];
    for (arrkey in arr) {
        ret.push(arr[arrkey][key]);
    }
    return ret;
}

var app = angular.module('TPSuiteSalesApp', ['LocalStorageModule']);
app.controller('BookingFormController', function ($scope, $http, localStorageService) {
    var self = this;
    /*
    localStorageService.set('totalLot', 1);
    localStorageService.bind(this, 'totalLot', 1, 'totalLot');
    localStorageService.bind(this, 'nationality', 'Malaysian');
    localStorageService.bind(this, 'currency', 'MYR');
    localStorageService.bind(this, 'availableLotCounts', {'Malaysian':0,'Foreginer':0});
    //*/

    self.getCurrencyRate = function () {
        return {
            'MYR': 1,
            'SGD': self.conversionRate
        }[self.currency];
    }

    self.getAmount = function () {
        return 1 / self.getCurrencyRate() * PricePerLot * self.totalLot;
    }
    this.totalLot = 1;
    this.currency = 'MYR';
    this.nationality = 'Malaysian';

    self.conversionRate = 2.5;
    $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22SGDMYR%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=').
    success(function (data, status, headers, config) {
        self.conversionRate = data.query.results.rate.Rate;
    });

    self.availableLots = [];
    self.getAvailableLotCount = function () {
        return self.availableLotCounts[self.nationality];
    }

    this.availableLotCounts = {
        'Malaysian': 0,
        'Foreginer': 0
    };
    $http.get(config.apiBaseUrl + config.apiListAvailableUnits).
    success(function (data, status, headers, config) {
        self.availableLots = data;
        var groupByNationality = groupOfKey(self.availableLots, 'nationality')
        for (var k in groupByNationality) {
            self.availableLotCounts[NationalityCodeMap[k]] = groupByNationality[k].length;
        }
    });
    self.getTotalInterest = function () {
        return self.getAmount() * InterestRatePerYear * InterestYearNumber * self.getCurrencyRate();
    }
    self.getInterestPerYear = function () {
        return self.getAmount() / InterestRatePerYear;
    }
    self.getTotalReturn = function () {
        return self.getAmount() + self.getTotalInterest();
    }

    self.sqf = SQF;
    self.name = '';
    self.nric = '';
    self.dob = '';
    self.maritalStatus = 'Single';
    self.gender = 'Male';
    self.address1 = '';
    self.address2 = '';
    self.address3 = '';
    self.city = '';
    self.state = '';
    self.postCode = '';
    self.phone = '';
    self.mobile = '';
    self.email = '';
    self.earnestDepositAmount = 0;
    self.getEarnestDepositAmount = function () {
        var ret = 0;
        for (var i = 0; i < self.payments; i++) {
            ret += self.payments[i].paymentAmount;
        }
        return ret;
    };
    self.earnestDepositDate = '';
    self.payments = [];
    for (var i = 0; i < 4; i++) {
        self.payments.push({});
        self.payments[i].paymentType = 'N/A';
        self.payments[i].paymentAmount = 0;
        self.payments[i].paymentCCType = '';
        self.payments[i].paymentReferenceNo = '';
    }

    self.remark = '';
    self.soldBy = 0;
    self.getSoldByName = function () {
        return '';
    };
});


app.controller('UnitsController', function ($scope, $http, localStorageService) {
    var self = this;

    //self.salesId = undefined;
    //self.userId = undefined;

    //hardcode test data
    //self.salesId = 31;
    self.userId = 31;

    self.units = [];
    self.lots = [];


    var url = '';
    var id = '';


    if (self.salesId !== undefined) {
        url = config.apiBaseUrl + config.apiFindSoldUnitsBySalesId;
        id = self.salesId;
    } else {
        url = config.apiBaseUrl + config.apiFindSoldUnitsByUserId;
        id = self.userId;
    }
    $http.get(url, {
        params: {
            'id': id
        }
    }).
    success(function (data, status, headers, _config) {
        self.units = data;
        var groupBySalesID = groupOfKey(self.units, "salesID");
        for (var salesID in groupBySalesID) {
            var lots = groupBySalesID[salesID][0];
            lots.pdfs = [];
            lots['shareNo1'] = arrayOfKey(groupBySalesID[salesID], "shareNo1").join(', ');
            self.lots.push(lots);
            $http.get(config.apiBaseUrl + config.apiFindPDFsByUnitId, {
                params: {
                    id: lots.unitID
                },
                lots:lots
            }).
            success(function (data, status, headers, _config) {
                _config.lots.pdfs = data;
                console.log(self.lots);
            });
        }
    });
}); //*/





/*

<embed
    type="application/pdf"
    src="path_to_pdf_document.pdf"
    id="pdfDocument"
    width="100%"
    height="100%">
</embed>
Then you call the .print() method on the element in Javascript when the PDF is loaded:

function printDocument(documentId) {
    var doc = document.getElementById(documentId);

    //Wait until PDF is ready to print    
    if (typeof doc.print === 'undefined') {    
        setTimeout(function(){printDocument(documentId);}, 1000);
    } else {
        doc.print();
    }
}//*/