<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="restore_password.aspx.cs" Inherits="Deprisa.fb_admin.restore_password" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>.:: Restablecer contrase&ntilde;a ::.</title>
    <% if (!error)
       {%>
    <link type="text/css" rel="Stylesheet" href="js/extjs/resources/css/ext-all.css" />
    <link type="image/x-icon" rel="shortcut icon" href="css/favicon.ico" />
    <script src="js/extjs/ext-all.js" type="text/javascript"></script>
    <script type="text/javascript" src="js/extjs/locale/ext-lang-es.js"></script>
    <script type="text/javascript">
        Ext.Loader.setPath('Ext.ux', 'js/extjs/ux');
        Ext.require('Ext.ux.DataTip');
        Ext.apply(Ext.form.field.VTypes, {
            password: function (val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },

            passwordText: 'La contrase\xf1a y la confirmaci\xf3n no coinciden'
        });
        Ext.onReady(function () {
            /**
             * Formulario
             */
            Ext.create('Ext.form.Panel', {
                renderTo: 'formNewPass',
                plugins: {
                    ptype: 'datatip'
                },
                url: 'services/user_pass.aspx',
                defaults: {
                    labelAlign: 'right',
                    labelWidth: 150,
                    margin: 10
                },
                border: 0,
                width: 300,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'iduser',
                    value: <%= idUser %>
                    },{
                        xtype: 'textfield',
                        name: 'pass',
                        itemId: 'pass',
                        vtype: "alphanum",
                        value: '',
                        allowBlank: false,
                        inputType: 'password',
                        anchor: '100%',
                        fieldLabel: '* Contrase\xf1a'
                    }, {
                        xtype: 'textfield',
                        name: 'confirm',
                        value: '',
                        allowBlank: false,
                        vtype: 'password',
                        initialPassField: 'pass',
                        inputType: 'password',
                        anchor: '100%',
                        fieldLabel: '* Confirmaci\xf3n'
                    }],
                buttons: [{
                    text: 'Guardar',
                    handler: function (bu, ev) {
                        if (bu.up('form').getForm().isValid()) {
                            bu.up('form').getForm().submit({
                                waitMsg: 'Guardando ...',
                                success: function (t, p, o) {
                                    var d = Ext.JSON.decode(p.response.responseText);
                                    Ext.MessageBox.show({
                                        title: d.msg.title,
                                        msg: d.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO,
                                        fn: function(){
                                            window.location = 'index.aspx'
                                        }
                                    });
                                },
                                failure: function (t, p) {
                                    var d = Ext.JSON.decode(p.response.responseText);
                                    Ext.MessageBox.show({
                                        title: d.msg.title,
                                        msg: d.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                }
                            });
                        } else {
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: 'Ingrese los datos correctos',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            })
                        }
                    }
                }]
            });
        });
    </script>
    <% } %>
</head>
<body>
    <% if (!error)
       { %>
    <p>Ingrese la nueva contrase&ntilde;a y su respectiva confirmaci&oacute;n</p>
    <div id="formNewPass"></div>
    <% }
       else
       { %>
    <p>Error al intentar restablecer la contrase&ntilde;a, aseg&uacute;rese de tener correctamente escrita la url que fue enviada a su buz&oacute;n de correo</p>
    <% } %>
</body>
</html>
