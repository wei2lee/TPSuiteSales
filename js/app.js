var NationalityCodeMap = {
    0: 'Malaysian',
    1: 'Foreigner'
}
var PricePerLot = 30000;
var InterestRatePerYear = 0.06;
var InterestYearNumber = 5;
var SQF = 20;

var app = angular.module('TPSuiteSalesApp', []);

app.controller('UserController', function ($scope, $http) {
    var storeduser = store('user');
    if (!storeuser) {
        storeuser = {
            UserName: '',
            UserID: 0,
            Name: ''
        };
    }
    this.user = storeuser;
});

app.controller('BookingFormController', function ($scope, $http) {
    var booking = store('booking');
    if (booking == null) booking = {};
    if (booking.totalLot == undefined) booking.totalLot = 1;
    if (booking.currency == undefined) booking.currency = 'MYR';
    if (booking.nationality == undefined) booking.nationality = 'Malaysian';
    store('booking', booking);


    var self = $scope;
    self.getCurrencyRate = function () {
        return {
            'MYR': 1,
            'SGD': self.conversionRate
        }[self.currency];
    }

    self.getAmount = function () {
        return 1 / self.getCurrencyRate() * PricePerLot * self.totalLot;
    }
    self.totalLot = parseInt(store('booking').totalLot);
    self.currency = store('booking').currency;
    self.nationality = store('booking').nationality;

    self.conversionRate = 2.5;
    $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%3D%22SGDMYR%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=').
    success(function (data, status, headers, config) {
        self.conversionRate = data.query.results.rate.Rate;
    });

    self.availableLots = [];
    self.getAvailableLotCount = function () {
        return self.availableLotCounts[self.nationality];
    }

    self.availableLotCounts = {
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
        return self.getAmount() * InterestRatePerYear * InterestYearNumber * 1 / self.getCurrencyRate();
    }
    self.getInterestPerYear = function () {
        return self.getTotalInterest() / InterestYearNumber;
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
        self.payments[i].paymentAmount = '';
        self.payments[i].paymentCCType = '';
        self.payments[i].paymentReferenceNo = '';
    }

    self.remark = '';
    self.soldBy = store('user').UserID;
    self.getSoldByName = function () {
        return store('user').UserName;
    };

    $scope.saveData = function () {
        store('booking', self);
    }
    $scope.getData = function () {
        return self;
    }
});

app.controller('UnitsController', function ($scope, $http) {
    var self = this;
    self.salesID = store('salesID');
    self.user = store('user');
    
    self.units = [];
    self.lots = [];

    var url = '';
    var id = '';
    if (self.salesID !== undefined && self.salesID !== null) {
        url = config.apiBaseUrl + config.apiFindSoldUnitsBySalesId;
        id = self.salesId;
    } else {
        url = config.apiBaseUrl + config.apiFindSoldUnitsByUserId;
        id = self.user.UserID;
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
                lots: lots
            }).
            success(function (data, status, headers, _config) {
                _config.lots.pdfs = data;
                console.log(self.lots);
            });
        }
    });
}); //*/