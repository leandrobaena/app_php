Ext.onReady(function () {
    Ext.QuickTips.init();
    new Ext.Viewport({
        layout: "absolute",
        items: [{
                xtype: "form",
                height: 220,
                id: "login",
                title: "Zona administrativa  - SUSencargos.com.co",
                defaults: {
                    labelWidth: 100,
                    labelAlign: "right"
                },
                width: 500,
                url: "login.php",
                buttonAlign: "right",
                frame: true,
                items: [{
                        xtype: "component",
                        html: "<img src='css/susencargos.jpg' style='display:inline' />",
                        height: 60,
                        margin: 3
                    }, {
                        xtype: "textfield",
                        anchor: "95%",
                        allowBlank: false,
                        maxLength: 50,
                        fieldLabel: "<b>Usuario</b>",
                        blankText: "Debe ingresar su usuario",
                        vtype: 'email',
                        name: "login",
                        ref: "usuario",
                        maxLengthText: "El nombre del usuario debe ser de m\xe1ximo 50 caracteres",
                        msgTarget: "side",
                        enableKeyEvents: true,
                        listeners: {
                            keypress: function (a, c, b) {
                                if (c.getKey() === Ext.EventObject.ENTER) {
                                    a.up("form").getForm().findField("password").focus(true);
                                }
                            }
                        }
                    }, {
                        xtype: "textfield",
                        anchor: "95%",
                        inputType: "password",
                        allowBlank: false,
                        minLength: 5,
                        enforceMaxLength: true,
                        maxLength: 50,
                        fieldLabel: "<b>Contrase\xf1a</b>",
                        blankText: "Debe ingresar su contrase\xf1a",
                        name: "password",
                        ref: "password",
                        maxLengthText: "La contrase\xf1a debe ser de m\xe1ximo 50 caracteres",
                        msgTarget: "side",
                        enableKeyEvents: true,
                        listeners: {
                            keypress: function (a, c, b) {
                                if (c.getKey() === Ext.EventObject.ENTER) {
                                    if (!a.up("form").getForm().isValid()) {
                                        Ext.MessageBox.alert("Error", "Ingrese los datos correctos");
                                    } else {
                                        a.up("form").getForm().submit({
                                            waitMsg: "Validando...",
                                            waitTitle: "Espere"
                                        });
                                    }
                                }
                            }
                        }
                    }],
                buttons: [{
                        xtype: 'button',
                        text: '\xbfHas olvidado tu contrase\xf1a?',
                        handler: function () {
                            Ext.create('Ext.window.Window', {
                                title: 'Reestablecer contrase\xf1a',
                                iconCls: 'edit',
                                width: 400,
                                modal: true,
                                layout: 'fit',
                                autoShow: true,
                                items: [{
                                        xtype: 'form',
                                        url: 'recovery_pass.php',
                                        defaults: {
                                            labelAlign: 'right'
                                        },
                                        frame: true,
                                        items: [{
                                                xtype: 'textfield',
                                                name: 'login',
                                                vtype: "email",
                                                value: '',
                                                allowBlank: false,
                                                anchor: '90%',
                                                fieldLabel: 'Login'
                                            }],
                                        buttons: [{
                                                text: 'Reestablecer',
                                                handler: function (bu, ev) {
                                                    if (bu.up('form').getForm().isValid()) {
                                                        bu.up('form').getForm().submit({
                                                            waitMsg: 'Procesando ...',
                                                            success: function (t, p, o) {
                                                                var d = Ext.JSON.decode(p.response.responseText);
                                                                Ext.MessageBox.show({title: d.msg.title, msg: d.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                                                                bu.up('window').close();
                                                            },
                                                            failure: function (t, p) {
                                                                var d = Ext.JSON.decode(p.response.responseText);
                                                                Ext.MessageBox.show({
                                                                    title: d.msg.title,
                                                                    msg: d.msg.body,
                                                                    buttons: Ext.Msg.OK,
                                                                    icon: Ext.Msg.ERROR
                                                                });
                                                                bu.up('window').close();
                                                            }
                                                        })
                                                    } else {
                                                        Ext.MessageBox.show({
                                                            title: 'Error',
                                                            msg: 'Ingrese los datos correctos',
                                                            buttons: Ext.Msg.OK,
                                                            icon: Ext.Msg.ERROR
                                                        });
                                                    }
                                                }
                                            }, {
                                                text: 'Cancelar',
                                                handler: function (bu, ev) {
                                                    bu.up('window').close();
                                                }
                                            }]
                                    }]
                            })
                        }
                    }, {
                        xtype: "button",
                        text: "Ingresar",
                        handler: function (a, b) {
                            if (!a.up("form").getForm().isValid()) {
                                Ext.MessageBox.alert("Error", "Ingrese los datos correctos");
                            } else {
                                a.up("form").getForm().submit({
                                    waitMsg: "Validando...",
                                    waitTitle: "Espere"
                                });
                            }
                        }
                    }],
                listeners: {
                    actionfailed: function (a, b) {
                        Ext.MessageBox.alert(b.result.msg.title, b.result.msg.body);
                    },
                    actioncomplete: function (a, b) {
                        location = "index.php";
                    }
                }
            }],
        renderTo: Ext.getBody(),
        listeners: {
            afterrender: function (a, b) {
                Ext.getCmp("login").setPosition(this.getWidth() / 2 - Ext.getCmp("login").getWidth() / 2, this.getHeight() / 2 - Ext.getCmp("login").getHeight() / 2, true)
            }
        }
    })
});