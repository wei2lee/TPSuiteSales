var config = (new function(){
    this.apiBaseUrl = "http://salesbooking.hattengrp.com/TPSuite";
    this.apiLogin = "/api/APIlogin";
    this.apiListAvailableUnits = "/api/APIUnits";
    this.apiSubmitBooking = "/api/APIFormSubmit";
    this.apiFindSoldUnitsBySalesId = "/api/APISoldUnitWithSalesID";
    this.apiFindPDFsByUnitId = "/api/APIPDF";
    this.apiFindSoldUnitsByUserId = "/api/APISoldUnit";
}());