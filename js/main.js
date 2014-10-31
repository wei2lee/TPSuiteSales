$(document).ready(function () {

    $('select').select2({
        minimumResultsForSearch: -1
    });
    $('.datetimepicker').datepicker({
        endDate: new Date(),
        startView: "decade",
        autoclose: true,
        format: "dd/mm/yyyy"
    });

    if ($('#login-container').length) {

        var $loginform = $('#login-container').find('form');
        $loginform.bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'username-input': {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The username is required and cannot be empty'
                        }
                    }
                },
                'password-input': {
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
            console.log(config);
            console.log(config.apiBaseUrl + config.apiLogin);
            $.ajax({
                url: config.apiBaseUrl + config.apiLogin,
                type: 'POST',
                data: $form.serialize(),
                dataType: 'json'
            }).done(function (data, textStatus, jqXHR) {
                if (data.status == "Error") {
                    bootbox.alert("Login encounter an error.<br>Response : " + data);
                    bv.resetForm(true);
                    return;
                }
                if (data.status == "NotFound") {
                    bootbox.alert("No user is matched with password.");
                    bv.resetForm(true);
                    return;
                }
                if (data.status != "Success") {
                    window.location = "admin.html";
                }
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




    }

    if ($('#purchase-form-container').length) {
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
                            message: 'The hand phone number is required and cannot be empty'
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
                'earnestDepositDate': {
//                    validators: {
//                        notEmpty: {
////                            message: 'The earnest deposit date is required and cannot be empty'
//                            message: ''
//                        }
//                    }
                },
                'paymentAmount1': {
//                    validators: {
//                        notEmpty: {
////                            message: 'The payment amount(1) is required and cannot be empty'
//                            message: ''
//                        }
//                    }
                }
            }
        }).on('success.form.bv', function (evt) {
            evt.preventDefault();
            var $form = $(evt.target);
            var bv = $form.data('bootstrapValidator');
            console.log(config);
            console.log(config.apiBaseUrl + config.apiLogin);
            $.ajax({
                url: config.apiBaseUrl + config.apiLogin,
                type: 'POST',
                data: $form.serialize(),
                dataType: 'json'
            }).done(function (data, textStatus, jqXHR) {
                if (data.status == "Error") {
                    bootbox.alert("Login encounter an error.<br>Response : " + data);
                    bv.resetForm(true);
                    return;
                }
                if (data.status == "NotFound") {
                    bootbox.alert("No user is matched with password.");
                    bv.resetForm(true);
                    return;
                }
                if (data.status != "Success") {
                    window.location = "admin.html";
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                bootbox.alert("Login encounter an error.<br>status : " + textStatus + "<br>error : " + errorThrown);
                bv.resetForm(true);
                return;
            });
        });
    }

    if ($('#units-container').length) {
        $('.collapse').on('show.bs.collapse', function () {
            $('.collapse.in').collapse('hide');
        });
    }
});