//<editor-fold defaultstate="collapsed" desc="Models">
Ext.define('susencargos.model.Zone', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idzone',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('susencargos.model.Customer', {
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
            reference: 'susencargos.model.City'
        }, {
            name: 'user',
            reference: 'susencargos.model.User'
        }, {
            name: 'contact',
            type: 'string'
        }]
});

Ext.define('susencargos.model.City', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idcity',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'zone',
            reference: 'susencargos.model.Zone'
        }]
});

Ext.define('susencargos.model.StateTracking', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idstatetracking',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('susencargos.model.Package', {
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
            reference: 'susencargos.model.City'
        }, {
            name: 'cityDestination',
            reference: 'susencargos.model.City'
        }, {
            name: 'customer',
            reference: 'susencargos.model.Customer'
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
            reference: 'susencargos.model.PayType'
        }, {
            name: 'consecutive',
            type: 'int'
        }]
});

Ext.define('susencargos.model.PayType', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idpaytype',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('susencargos.model.Tracking', {
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
            reference: 'susencargos.model.Package'
        }, {
            name: 'state',
            reference: 'susencargos.model.StateTracking'
        }]
});

Ext.define('susencargos.model.PackageType', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idpackagetype',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('susencargos.model.Receiver', {
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
            reference: 'susencargos.model.City'
        }, {
            name: 'phone',
            type: 'string'
        }, {
            name: 'customer',
            reference: 'susencargos.model.Customer'
        }]
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="MainStore">
Ext.define("susencargos.store.MainStore", {
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
        'listPackages button[action=insert]': {click: 'insert'},
        'listPackages button[action=receivers]': {click: 'receivers'},
        'listPackages button[action=clean]': {click: 'cleanFilters'},
        'listPackages actioncolumn[action=tracking]': {click: 'tracking'},
        'listPackages actioncolumn[action=rotules]': {click: 'rotules'},
        'listPackages actioncolumn[action=label]': {click: 'label'},
        'formPackage combo[name=idpackagetype]': {select: 'changePackageType'},
        'formPackage combo[name=idreceiver]': {select: 'changeReceiver'},
        'formPackage button[action=cancel]': {click: 'cancel'},
        'formPackage button[action=save]': {click: 'save'},
        'formPackage numberfield[name=shippingValue]': {change: 'changeShippingValue'},
        'formPackage numberfield[name=managementValue]': {change: 'changeManagementValue'},
        'listReceivers button[action=insert]': {click: 'insertReceiver'},
        'listReceivers': {itemdblclick: 'editDblReceiver'},
        'listReceivers actioncolumn[action=edit]': {click: 'editReceiver'},
        'listReceivers actioncolumn[action=remove]': {click: 'removeReceiver'},
        'formReceiver button[action=cancel]': {click: 'cancel'},
        'formReceiver button[action=save]': {click: 'saveReceiver'}
    },
    insert: function (b, e) {
        Ext.getStore('Receiver').load({
            start: 0,
            limit: 1000,
            callback: function () {
                Ext.getStore('City').load({
                    start: 0,
                    limit: 1000,
                    callback: function () {
                        Ext.widget('formPackage').down('form').loadRecord(Ext.create('susencargos.model.Package'));
                    }
                });
            }
        });
    },
    receivers: function (v, r, c, i, e) {
        Ext.getStore('Receiver').load();
        var panel = Ext.widget('listReceivers');
        panel.setTitle('Listado de destinatarios');
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Package').load();
    },
    changePackageType: function (c, i) {
        var form = c.up('window').down('form').getForm();
        if (c.getValue() == 1) {//Caja
            form.findField('weight').setValue(30);
        } else {//Sobre
            form.findField('weight').setValue(1);
        }
    },
    changeReceiver: function (c, i) {
        if (c.getValue() != 0) {
            var form = c.up('window').down('form').getForm();
            form.findField('idcitydestination').setValue(Ext.getStore('Receiver').findRecord('idreceiver', c.getValue()).get('city').idcity);
            form.findField('addressTo').setValue(Ext.getStore('Receiver').findRecord('idreceiver', c.getValue()).get('address'));
            form.findField('phoneTo').setValue(Ext.getStore('Receiver').findRecord('idreceiver', c.getValue()).get('phone'));
        } else {
            Ext.MessageBox.confirm('Crear destinatario', '¿Desea crear un nuevo destinatario?', function (o) {
                if (o == 'yes') {
                    Ext.getStore('City').load({
                        start: 0,
                        limit: 1000,
                        callback: function () {
                            var form = Ext.widget('formReceiver').down('form');
                            form.loadRecord(Ext.create('susencargos.model.Receiver'));
                        }
                    });
                }
            });
        }
    },
    tracking: function (v, r, c, i, e) {
        window.open('seguimiento.php?tracking=' + v.getStore().getAt(c).get('consecutive'));
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid() && b.up('form').getForm().findField('idreceiver').getValue() != 0) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idpackage').getValue());
            b.up('form').getForm().submit({
                waitMsg: 'Guardando ...',
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function () {
                            Ext.getStore('Package').load();
                        }
                    });
                    b.up('window').close();
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close();
                }
            });
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },
    changeShippingValue: function (f, v, o) {
        if (v != null) {
            var managementValue = f.up('form').getForm().findField('managementValue').getValue();
            if (managementValue != null) {
                f.up('form').getForm().findField('totalValue').setValue(v + managementValue);
            }
        }
    },
    changeManagementValue: function (f, v, o) {
        if (v != null) {
            var shippingValue = f.up('form').getForm().findField('shippingValue').getValue();
            if (shippingValue != null) {
                f.up('form').getForm().findField('totalValue').setValue(v + shippingValue);
            }
        }
    },
    rotules: function (v, r, c, i, e) {
        window.open('intranet/rotules.php?id=' + v.getStore().getAt(c).get('idpackage'));
    },
    label: function (v, r, c, i, e) {
        window.open('intranet/label.php?id=' + v.getStore().getAt(c).get('idpackage'));
    },
    insertReceiver: function (b, e) {
        Ext.getStore('City').load({
            start: 0,
            limit: 10000,
            callback: function () {
                var form = Ext.widget('formReceiver');
                form.down('form').loadRecord(Ext.create('susencargos.model.Receiver'));
                form.down('form').getForm().findField('idcustomer').setValue(Ext.getStore('Receiver').getProxy().extraParams.idcustomer);
            }
        });
    },
    editDblReceiver: function (g, r) {
        Ext.getStore('City').load({
            start: 0,
            limit: 10000,
            callback: function () {
                var form = Ext.widget('formReceiver');
                form.down('form').getForm().loadRecord(r);
                form.down('form').getForm().findField('idcustomer').setValue(Ext.getStore('Receiver').getProxy().extraParams.idcustomer);
                form.down('form').getForm().findField('idcity').setValue(r.get('city').idcity);
            }
        });
    },
    editReceiver: function (v, r, c, i, e) {
        Ext.getStore('City').load({
            start: 0,
            limit: 10000,
            callback: function () {
                var form = Ext.widget('formReceiver');
                form.down('form').getForm().loadRecord(v.getStore().getAt(c));
                form.down('form').getForm().findField('idcustomer').setValue(Ext.getStore('Receiver').getProxy().extraParams.idcustomer);
                form.down('form').getForm().findField('idcity').setValue(v.getStore().getAt(c).get('city').idcity);
            }
        });
    },
    saveReceiver: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idreceiver').getValue());
            b.up('form').getForm().submit({
                waitMsg: 'Guardando ...',
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function () {
                            Ext.getStore('Receiver').load();
                        }
                    });
                    b.up('window').close();
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close();
                }
            });
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },
    removeReceiver: function (v, c, dr, dp) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'intranet/delete/delete_object.php',
                    params: {
                        id: v.getSelectionModel().getLastSelected().get('idreceiver'),
                        object: 'receiversCustomer'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Receiver').load();
                            }
                        });
                    },
                    failed: function (t, p, o) {
                        Ext.MessageBox.show({
                            title: p.response.result.msg.title,
                            msg: p.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                });
            }
        });
    }
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Aplicación">
Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'susencargos',
    launch: function () {
        //<editor-fold defaultstate="collapsed" desc="Stores">
        Ext.create('susencargos.store.MainStore', {
            storeId: 'Package',
            model: 'susencargos.model.Package',
            object: 'packagesCustomer'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Tracking',
            model: 'susencargos.model.Tracking',
            object: 'trackings',
            autoLoad: false
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'PayType',
            model: 'susencargos.model.PayType',
            object: 'payTypes'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'PackageType',
            model: 'susencargos.model.PackageType',
            object: 'packageTypes'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'City',
            model: 'susencargos.model.City',
            object: 'cities'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Receiver',
            model: 'susencargos.model.Receiver',
            object: 'receiversCustomer'
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Genéricas">
        Ext.define('susencargos.view.MainGrid', {
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

        Ext.define('susencargos.view.MainForm', {
            extend: 'Ext.window.Window',
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
        Ext.define('susencargos.view.package.Grid', {
            extend: 'susencargos.view.MainGrid',
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

        Ext.define('susencargos.view.package.Form', {
            extend: 'susencargos.view.MainForm',
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

        Ext.define('susencargos.view.customer.GridReceivers', {
            extend: 'susencargos.view.MainGrid',
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

        Ext.define('susencargos.view.customer.FormReceiver', {
            extend: 'susencargos.view.MainForm',
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
        Ext.widget('listPackages');
        //</editor-fold>
    }
});
//</editor-fold>
