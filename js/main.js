$(document).ready(function () {

    console.log(window.localStorage);

    if ($('select').length) {
        $('select').select2({
            minimumResultsForSearch: -1
        });
    }
    if ($('.datetimepicker').length) {
        $('.datetimepicker').datepicker({
            endDate: new Date(),
            startView: "decade",
            autoclose: true,
            format: "dd/mm/yyyy"
        });
    }
    if ($('#login-container').length) {
        store('user', null);
        var $loginform = $('#login-container').find('form');
        $loginform.bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'UserName': {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The username is required and cannot be empty'
                        }
                    }
                },
                'Password': {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and cannot be empty'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (evt) {
            evt.preventDefault();
            var $form = $(evt.target);
            var bv = $form.data('bootstrapValidator');
            $.ajax({
                url: config.apiBaseUrl + config.apiLogin,
                type: 'POST',
                data: $form.serialize(),
                dataType: 'json'
            }).done(function (data, textStatus, jqXHR) {
                if (data.Status == "Error") {
                    bootbox.alert("Login encounter an error.<br>Response : " + data);
                    bv.resetForm(true);
                    return;
                }
                if (data.Status == "NotFound") {
                    bootbox.alert("No user is matched with password.");
                    bv.resetForm(true);
                    return;
                }
                store('user', data);
                window.location = "available.html";
            }).fail(function (jqXHR, textStatus, errorThrown) {
                bootbox.alert("Login encounter an error.<br>status : " + textStatus + "<br>error : " + errorThrown);
                bv.resetForm(true);
                return;
            });
        });
        $loginform.find('#reset-btn').click(function () {
            $loginform.data('bootstrapValidator').resetForm();
        });
    }

    if ($('#available-container').length) {
        store('salesID', null);
        $('#proceed-btn, #calculator-btn').click(function () {
            var $scope = angular.element($('[ng-controller=BookingFormController]')[0]).scope();
            var booking = store('booking');
            booking.totalLot = $scope.totalLot;
            booking.nationality = $scope.nationality;
            booking.currency = $scope.currency;
            store('booking', booking);
            console.log(store('booking'));
        });
    }

    if ($('#purchase-form-container').length) {
        store('salesID', null);
        var $purchaseform = $('#purchase-form-container').find('form');
        $purchaseform.bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'name': {
                    validators: {
                        notEmpty: {
                            message: 'The name is required and cannot be empty'
                        }
                    }
                },
                'nric': {
                    validators: {
                        notEmpty: {
                            message: 'The NRIC/Passport is required and cannot be empty'
                        }
                    }
                },
                'dob': {
                    validators: {
                        notEmpty: {
                            message: 'The birthdate is required and cannot be empty'
                        }
                    }
                },
                'address1': {
                    validators: {
                        notEmpty: {
                            message: 'The address1 is required and cannot be empty'
                        }
                    }
                },
                'address2': {
                    validators: {
                        notEmpty: {
                            message: 'The address2 is required and cannot be empty'
                        }
                    }
                },
                'postCode': {
                    validators: {
                        notEmpty: {
                            message: 'The post code is required and cannot be empty'
                        }
                    }
                },
                'mobile': {
                    validators: {
                        notEmpty: {
                            message: 'The mobile number is required and cannot be empty'
                        }
                    }
                },
                'earnestDepositDate': {
                    validators: {
                        notEmpty: {
                            message: 'The earnest deposit date is required and cannot be empty'
                        }
                    }
                },
                'paymentAmount1': {
                    validators: {
                        notEmpty: {
                            message: 'The payment amount(1) is required and cannot be empty'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (evt) {
            evt.preventDefault();
            var $form = $(evt.target);
            var bv = $form.data('bootstrapValidator');

            console.log($form.serialize());
            return;

            $.ajax({
                url: config.apiBaseUrl + config.apiLogin,
                type: 'POST',
                data: $form.serialize(),
                dataType: 'json'
            }).done(function (data, textStatus, jqXHR) {
                if (data.Status == "Error") {
                    bootbox.alert("Submit encounter an error.<br>Response : " + data);
                    bv.resetForm(true);
                    return;
                }
                if (data.Status == "Success") {
                    store('salesID', data.salesID);
                    window.location = "units.html";
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                bootbox.alert("Submit encounter an error.<br>status : " + textStatus + "<br>error : " + errorThrown);
                bv.resetForm(true);
                return;
            });
        });
        

        $('.datetimepicker').on('changeDate show', function (e) {
            // Revalidate the date when user change it
            $form = $(this).closest();
            console.log($(this).find('input').attr('name'));
            $form.bootstrapValidator('revalidateField', $(this).find('input').attr('name'));
        });
    }

    if ($('#units-container').length) {
        $('.collapse').on('show.bs.collapse', function () {
            $('.collapse.in').collapse('hide');
        });
    }
});