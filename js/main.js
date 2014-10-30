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

    if ($('#purchase-form-container').length) {}
    /*
    for (var i = 1; i < 100; i++) {
        var $get = $.ajax('http://salesbooking.hattengrp.com/TPSuite/api/APISoldUnit?id=' + i, {i:i}).done(function (data) {
            if (data && data.length) {
                console.log(this.i);
                console.log(data);
            }
        });
        $get.i = i;
    }//*/

    if ($('#units-container').length) {
        $('.collapse').on('show.bs.collapse', function () {
            $('.collapse.in').collapse('hide');
        });
    }
});