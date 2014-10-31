var config = (new function(){
    this.apiBaseUrl = "http://salesbooking.hattengrp.com/TPSuite";
    //this.apiBaseUrl = "http://103.9.149.8/hattengrp.com/wwwroot/TPSuite";
    this.apiLogin = "/api/APILogin";
    this.apiListAvailableUnits = "/api/APIUnits";
    this.apiSubmitBooking = "/api/APIFormSubmit";
    this.apiFindSoldUnitsBySalesId = "/api/APISoldUnitWithSalesID";
    this.apiFindPDFsByUnitId = "/api/APIPDF";
    this.apiFindSoldUnitsByUserId = "/api/APISoldUnit";
}());