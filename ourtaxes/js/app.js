//<editor-fold defaultstate="collapsed" desc="Models">
Ext.define('apps.model.Zone', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idzone',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});
Ext.define('apps.model.Customer', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idcustomer',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'taxid',
            type: 'string'
        }, {
            name: 'address',
            type: 'string'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'city',
            reference: 'apps.model.City'
        }, {
            name: 'user',
            reference: 'apps.model.User'
        }, {
            name: 'contact',
            type: 'string'
        }]
});
Ext.define('apps.model.City', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idcity',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'zone',
            reference: 'apps.model.Zone'
        }]
});
Ext.define('apps.model.StateTracking', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idstatetracking',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});
Ext.define('apps.model.Package', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idpackage',
            type: 'int'
        }, {
            name: 'date',
            type: 'date',
            dateFormat: 'Y-m-d'
        }, {
            name: 'citySource',
            reference: 'apps.model.City'
        }, {
            name: 'cityDestination',
            reference: 'apps.model.City'
        }, {
            name: 'customer',
            reference: 'apps.model.Customer'
        }, {
            name: 'nameTo',
            type: 'string'
        }, {
            name: 'addressTo',
            type: 'string'
        }, {
            name: 'phoneTo',
            type: 'string'
        }, {
            name: 'content',
            type: 'string'
        }, {
            name: 'observations',
            type: 'string'
        }, {
            name: 'weight',
            type: 'float'
        }, {
            name: 'volumen',
            type: 'float'
        }, {
            name: 'amount',
            type: 'int'
        }, {
            name: 'declaredValue',
            type: 'float'
        }, {
            name: 'shippingValue',
            type: 'float'
        }, {
            name: 'managementValue',
            type: 'float'
        }, {
            name: 'totalValue',
            type: 'float'
        }, {
            name: 'reference',
            type: 'string'
        }, {
            name: 'payType',
            reference: 'apps.model.PayType'
        }, {
            name: 'consecutive',
            type: 'int'
        }]
});
Ext.define('apps.model.PayType', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idpaytype',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});
Ext.define('apps.model.Tracking', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idtracking',
            type: 'int'
        }, {
            name: 'date',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        }, {
            name: 'package',
            reference: 'apps.model.Package'
        }, {
            name: 'state',
            reference: 'apps.model.StateTracking'
        }]
});
Ext.define('apps.model.PackageType', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idpackagetype',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});
Ext.define('apps.model.Receiver', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idreceiver',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'address',
            type: 'string'
        }, {
            name: 'city',
            reference: 'apps.model.City'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'customer',
            reference: 'apps.model.Customer'
        }]
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="MainStore">
Ext.define("apps.store.MainStore", {
    extend: "Ext.data.Store",
    object: "",
    autoLoad: true,
    proxy: {
        type: "ajax",
        url: "intranet/stores/list_objects.php",
        extraParams: {
            object: ""
        },
        reader: {
            type: "json",
            root: "data",
            successProperty: "success"
        }
    },
    constructor: function (a) {
        a = Ext.apply({
            proxy: {
                extraParams: {
                    object: a.object
                }
            }
        }, a);
        this.callParent([a]);
    },
    listeners: {
        load: function (b, c, a, d) {
            if (!a) {
                Ext.MessageBox.show({
                    title: "Error",
                    msg: "Sesi\xf3n expirada",
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        }
    }
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Configuración inicial">
Ext.Loader.setConfig({
    enabled: true
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Controllers">
Ext.create('Ext.app.Controller', {
    control: {
        'formRegister button[action=register]': {click: 'register'}
    },
    register: function (b, e) {
        if (!b.up('form').getForm().isValid()) {
            Ext.MessageBox.alert('Error', 'Ingrese los datos correctos');
        } else {
            b.up('form').getForm().submit({
                waitMsg: 'Regitrando...',
                waitTitle: 'Espere',
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    b.up('form').getForm().findField('email').setValue("");
                    b.up('form').getForm().findField('name').setValue("");
                    b.up('form').getForm().findField('password').setValue("");
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
        }
    }
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Aplicación">
Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'apps',
    launch: function () {
        //<editor-fold defaultstate="collapsed" desc="Stores">
        /*Ext.create('apps.store.MainStore', {
         storeId: 'Package',
         model: 'apps.model.Package',
         object: 'packagesCustomer'
         });
         
         Ext.create('apps.store.MainStore', {
         storeId: 'Tracking',
         model: 'apps.model.Tracking',
         object: 'trackings',
         autoLoad: false
         });
         
         Ext.create('apps.store.MainStore', {
         storeId: 'PayType',
         model: 'apps.model.PayType',
         object: 'payTypes'
         });
         
         Ext.create('apps.store.MainStore', {
         storeId: 'PackageType',
         model: 'apps.model.PackageType',
         object: 'packageTypes'
         });
         
         Ext.create('apps.store.MainStore', {
         storeId: 'City',
         model: 'apps.model.City',
         object: 'cities'
         });
         
         Ext.create('apps.store.MainStore', {
         storeId: 'Receiver',
         model: 'apps.model.Receiver',
         object: 'receiversCustomer'
         });*/
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Genéricas">
        Ext.define('apps.view.MainGrid', {
            extend: 'Ext.grid.Panel',
            alias: '',
            plugins: {
                ptype: 'gridfilters',
                menuFilterText: 'Filtros'
            },
            layout: 'fit',
            closable: true,
            autoScroll: true,
            buttonsAds: [],
            viewConfig: {
                enableTextSelection: true
            },
            constructor: function (config) {
                this.callParent(config);
            }
        });
        Ext.define('apps.view.MainForm', {
            extend: 'Ext.form.Panel',
            iconCls: 'edit',
            width: 600,
            maximizable: true,
            object: '',
            fields: [],
            buttons: [],
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                    xtype: 'form',
                    autoScroll: true,
                    url: 'intranet/update/save_object.php',
                    defaults: {
                        labelAlign: 'right'
                    }
                }],
            initComponent: function () {
                this.items[0].items = [{
                        xtype: 'hiddenfield',
                        name: 'id', value: ''
                    }, {
                        xtype: 'hiddenfield',
                        name: 'object',
                        value: this.object
                    }, {
                        xtype: 'panel',
                        html: '* Campos obligatorios',
                        border: 0,
                        padding: 10
                    }].concat(this.fields);
                this.items[0].buttons = this.buttons;
                this.buttons = null;
                this.callParent();
            }
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Remesas">
        Ext.define('apps.view.package.Grid', {
            extend: 'apps.view.MainGrid',
            iconCls: 'package',
            alias: 'widget.listPackages',
            renderTo: 'listPackages',
            closable: false,
            title: 'Listado remesas',
            store: 'Package',
            columns: [{
                    header: 'Número',
                    filter: 'number',
                    dataIndex: 'consecutive',
                    flex: 1
                }, {
                    header: 'Fecha',
                    dataIndex: 'date',
                    filter: {
                        type: 'date',
                        fields: {lt: {text: 'Antes de'}, gt: {text: 'Depu\xe9s de '}, eq: {text: 'El d\xeda'}}, dateFormat: 'Y-m-d'
                    },
                    flex: 2,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d')
                }, {
                    header: 'Origen',
                    dataIndex: 'citySource',
                    flex: 2,
                    renderer: function (value) {
                        return value.name;
                    }
                }, {
                    header: 'Destino',
                    dataIndex: 'cityDestination',
                    flex: 2,
                    renderer: function (value) {
                        return value.name;
                    }
                }, {
                    header: 'Destinatario',
                    dataIndex: 'nameTo',
                    flex: 2
                }, {
                    header: 'Dirección',
                    dataIndex: 'addressTo',
                    flex: 2
                }, {
                    header: 'Peso',
                    dataIndex: 'weight',
                    flex: 1
                }, {
                    header: 'Cantidad',
                    dataIndex: 'amount',
                    flex: 1
                }, {
                    header: 'Valor declarado',
                    dataIndex: 'declaredValue',
                    flex: 1
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'tracking',
                    tooltip: 'Seguimiento',
                    icon: 'intranet/css/tracking.png',
                    stopSelection: false,
                    iconCls: 'rotule'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'rotules',
                    tooltip: 'Imprimir rótulos',
                    icon: 'intranet/css/rotule.png',
                    stopSelection: false,
                    iconCls: 'rotule'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'label',
                    tooltip: 'Imprimir remesa',
                    icon: 'intranet/css/label.png',
                    stopSelection: false,
                    iconCls: 'label'
                }],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: 'Package',
                displayInfo: true,
                items: [{
                        xtype: 'button',
                        icon: 'intranet/css/insert.png',
                        text: 'Nueva remesa',
                        tooltip: 'Nueva remesa',
                        action: 'insert'
                    }, '-', {
                        xtype: 'button',
                        icon: 'intranet/css/receiver.png',
                        text: 'Listado de destinatarios',
                        tooltip: 'Destinatarios',
                        action: 'receivers'
                    }]
            }
        });
        Ext.define('apps.view.package.Form', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formPackage',
            title: 'Insertar nueva remesa',
            object: 'packagesCustomer',
            fields: [{
                    xtype: 'container',
                    layout: {
                        type: 'table',
                        columns: 2
                    },
                    defaults: {
                        layout: 'anchor',
                        anchor: '100%',
                        style: "margin: 3px; padding:3px;"
                    },
                    items: [{
                            xtype: 'hiddenfield',
                            name: 'idpackage',
                            value: 0
                        }, {
                            xtype: 'datefield',
                            name: 'date',
                            value: '',
                            allowBlank: false,
                            anchor: '90%',
                            fieldLabel: '* Fecha del envío',
                            format: 'Y-m-d'
                        }, {
                            xtype: 'combo',
                            fieldLabel: '* Tipo de pago',
                            store: 'PayType',
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            valueField: 'idpaytype',
                            displayField: 'name',
                            name: 'idpaytype',
                            anchor: '90%',
                            queryMode: 'local'
                        }, {
                            xtype: 'combo',
                            fieldLabel: '* Tipo de envío',
                            store: 'PackageType',
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            valueField: 'idpackagetype',
                            displayField: 'name',
                            name: 'idpackagetype',
                            anchor: '90%',
                            queryMode: 'local'
                        }, {
                            xtype: 'combo',
                            fieldLabel: '* Destinatario',
                            store: 'Receiver',
                            typeAhead: true,
                            allowBlank: false,
                            valueField: 'idreceiver',
                            displayField: 'name',
                            autoLoadOnValue: true,
                            name: 'idreceiver',
                            anchor: '90%',
                            queryMode: 'local'
                        }, {
                            xtype: 'combo',
                            fieldLabel: '* Ciudad destino',
                            store: 'City',
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            valueField: 'idcity',
                            displayField: 'name',
                            name: 'idcitydestination',
                            anchor: '90%',
                            queryMode: 'local'
                        }, {
                            xtype: 'textfield',
                            name: 'addressTo',
                            value: '',
                            allowBlank: false,
                            anchor: '90%',
                            fieldLabel: '* Dirección destinatario'
                        }, {
                            xtype: 'textfield',
                            name: 'phoneTo',
                            value: '',
                            anchor: '90%',
                            fieldLabel: 'Teléfono destinatario'
                        }, {
                            xtype: 'textfield',
                            name: 'content',
                            value: '',
                            anchor: '90%',
                            fieldLabel: 'Dice contener'
                        }, {
                            xtype: 'textfield',
                            name: 'observations',
                            value: '',
                            anchor: '90%',
                            fieldLabel: 'Observaciones'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'weight',
                            value: 0,
                            anchor: '90%',
                            fieldLabel: 'Peso'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'volumen',
                            value: 0,
                            anchor: '90%',
                            fieldLabel: 'Volumen'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'amount',
                            allowBlank: false,
                            value: 1,
                            anchor: '90%',
                            fieldLabel: '* Cantidad'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'declaredValue',
                            allowBlank: false,
                            value: 400000,
                            anchor: '90%',
                            fieldLabel: '* Valor declarado'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'shippingValue',
                            value: 0,
                            anchor: '90%',
                            fieldLabel: 'Valor del flete'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'managementValue',
                            value: 0,
                            anchor: '90%',
                            fieldLabel: 'Valor manejo'
                        }, {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'totalValue',
                            value: 30,
                            readOnly: true,
                            anchor: '90%',
                            fieldLabel: 'Valor total'
                        }, {
                            xtype: 'textfield',
                            name: 'reference',
                            value: '',
                            anchor: '90%',
                            fieldLabel: 'Referencia'
                        }]
                }],
            buttons: [{
                    text: 'Guardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
        });
        Ext.define('apps.view.customer.GridReceivers', {
            extend: 'apps.view.MainGrid',
            iconCls: 'receiver',
            alias: 'widget.listReceivers',
            renderTo: 'listReceivers',
            title: 'Listado destinatarios',
            store: 'Receiver',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idreceiver'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Dirección',
                    filter: 'string',
                    dataIndex: 'address',
                    flex: 3
                }, {
                    header: 'Teléfono',
                    filter: 'string',
                    dataIndex: 'phone',
                    flex: 2
                }, {
                    header: 'Ciudad',
                    dataIndex: 'city',
                    flex: 2,
                    renderer: function (value) {
                        return value.name;
                    }
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'intranet/css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'intranet/css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
                }],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                store: 'Receiver',
                displayInfo: true,
                items: [{
                        xtype: 'button',
                        icon: 'intranet/css/insert.png',
                        text: 'Nuevo destinatario',
                        tooltip: 'Nuevo destinatario',
                        action: 'insert'
                    }]
            }
        });
        Ext.define('apps.view.customer.FormReceiver', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formReceiver',
            title: 'Editar destinatario',
            object: 'receiversCustomer',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idreceiver',
                    value: 0
                }, {
                    xtype: 'hiddenfield',
                    name: 'idcustomer',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
                }, {
                    xtype: 'textfield',
                    name: 'address',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Dirección'
                }, {
                    xtype: 'textfield',
                    name: 'phone',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Teléfono'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Ciudad',
                    store: 'City',
                    typeAhead: true,
                    forceSelection: true,
                    allowBlank: false,
                    autoLoadOnValue: true,
                    valueField: 'idcity',
                    displayField: 'name',
                    name: 'idcity',
                    anchor: '90%',
                    queryMode: 'local'
                }],
            buttons: [{
                    text: 'Guardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Viewport principal">
        Ext.define('apps.view.register.FormRegister', {
            extend: 'Ext.form.Panel',
            renderTo: 'formRegister',
            url: 'register.php',
            alias: 'widget.formRegister',
            border: false,
            frame: false,
            bodyStyle: "background: none repeat scroll 0 0 rgba(0, 0, 0, 0);",
            //title: 'Editar destinatario',
            //object: 'receiversCustomer',
            items: [{
                    xtype: 'textfield',
                    anchor: '95%',
                    allowBlank: false,
                    maxLength: 50,
                    fieldLabel: '<b>Nombre</b>',
                    blankText: 'Debe ingresar su usuario',
                    name: 'name',
                    maxLengthText: 'El nombre del usuario debe ser de m\xe1ximo 50 caracteres',
                    msgTarget: 'side',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: function (a, c, b) {
                            if (c.getKey() === Ext.EventObject.ENTER) {
                                a.up("form").getForm().findField('email').focus(true);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    anchor: '95%',
                    allowBlank: false,
                    fieldLabel: '<b>Correo</b>',
                    blankText: 'Debe ingresar su correo electrónico',
                    vtype: 'email',
                    name: 'email',
                    msgTarget: 'side',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: function (a, c, b) {
                            if (c.getKey() === Ext.EventObject.ENTER) {
                                a.up('form').getForm().findField('password').focus(true);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    anchor: '95%',
                    inputType: 'password',
                    allowBlank: false,
                    minLength: 5,
                    enforceMaxLength: true,
                    maxLength: 50,
                    fieldLabel: '<b>Contrase\xf1a</b>',
                    blankText: 'Debe ingresar su contrase\xf1a',
                    name: 'password',
                    maxLengthText: 'La contrase\xf1a debe ser de m\xe1ximo 50 caracteres',
                    msgTarget: 'side'
                }],
            buttons: [{
                    text: 'Registrar',
                    action: 'register'
                }]
        });
        Ext.widget('formRegister');
        //</editor-fold>
    }
});
//</editor-fold>