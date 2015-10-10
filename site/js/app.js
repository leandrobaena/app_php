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
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="MainStore">
Ext.define("susencargos.store.MainStore", {
    extend: "Ext.data.Store",
    remoteSort: true,
    remoteFilter: false,
    object: "",
    autoLoad: true,
    proxy: {
        type: "ajax",
        url: "intranet/susencargos/stores/list_objects.php",
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
        'listPackages button[action=clean]': {click: 'cleanFilters'},
        'listPackages actioncolumn[action=tracking]': {click: 'tracking'},
        'listPackages actioncolumn[action=rotules]': {click: 'rotules'},
        'listPackages actioncolumn[action=label]': {click: 'label'},
        'formPackage combo[name=idpackagetype]': {select: 'changePackageType'},
        'formPackage button[action=cancel]': {click: 'cancel'},
        'formPackage button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.getStore('City').load({
            params: {
                start: 0,
                limit: 1000
            },
            callback: function () {
                Ext.widget('formPackage').down('form').loadRecord(Ext.create('susencargos.model.Package'));
            }
        });
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
        if (i[0].get('idpackagetype') == 1) {//Caja
            form.findField('weight').setValue(30);
        } else {//Sobre
            form.findField('weight').setValue(1);
        }
    },
    tracking: function (v, r, c, i, e) {
        Ext.getStore('Tracking').getProxy().setExtraParam('idpackage', v.getStore().getAt(c).get('idpackage'));
        Ext.getStore('Tracking').load({
            callback: function () {
                var panel = Ext.widget('listTrackings');
                panel.setTitle('Seguimiento de la guía ' + v.getStore().getAt(c).get('idpackage'));
            }
        });
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
    rotules: function (v, r, c, i, e) {
        window.open('intranet/susencargos/rotules.php?id=' + v.getStore().getAt(c).get('idpackage'));
    },
    label: function (v, r, c, i, e) {
        window.open('intranet/susencargos/label.php?id=' + v.getStore().getAt(c).get('idpackage'));
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
                    url: 'intranet/susencargos/update/save_object.php',
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
            renderTo: 'packagesCustomer',
            closable: false,
            title: 'Listado remesas',
            store: 'Package',
            columns: [{
                    header: 'Número',
                    filter: 'number',
                    dataIndex: 'idpackage',
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
                    icon: 'intranet/susencargos/css/tracking.png',
                    stopSelection: false,
                    iconCls: 'rotule'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'rotules',
                    tooltip: 'Imprimir rótulos',
                    icon: 'intranet/susencargos/css/rotule.png',
                    stopSelection: false,
                    iconCls: 'rotule'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'label',
                    tooltip: 'Imprimir etiqueta',
                    icon: 'intranet/susencargos/css/label.png',
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
                        icon: 'intranet/susencargos/css/insert.png',
                        text: 'Nueva remesa',
                        tooltip: 'Nuev remesa',
                        action: 'insert'
                    }, '-', {
                        xtype: 'button',
                        icon: 'intranet/susencargos/css/clean.png',
                        text: 'Limpiar filtros',
                        tooltip: 'Limpiar filtros',
                        action: 'clean'
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
                            name: 'nameTo',
                            value: '',
                            allowBlank: false,
                            anchor: '90%',
                            fieldLabel: '* Nombre destinatario'
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

        Ext.define('susencargos.view.package.Tracking', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'tracking',
            alias: 'widget.listTrackings',
            renderTo: 'trackingsPackage',
            title: 'Seguimiento',
            store: 'Tracking',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idtracking',
                    flex: 1
                }, {
                    header: 'Fecha',
                    dataIndex: 'date',
                    filter: {
                        type: 'date',
                        fields: {lt: {text: 'Antes de'}, gt: {text: 'Depu\xe9s de '}, eq: {text: 'El d\xeda'}}, dateFormat: 'Y-m-d H:i:s'
                    },
                    flex: 2,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                }, {
                    header: 'Estado',
                    dataIndex: 'state',
                    flex: 2,
                    renderer: function (value) {
                        return value.name;
                    }
                }]
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Viewport principal">
        Ext.widget('listPackages');
        //</editor-fold>
    }
});
//</editor-fold>
