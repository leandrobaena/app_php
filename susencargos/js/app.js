//<editor-fold defaultstate="collapsed" desc="Models">
﻿Ext.define('susencargos.model.Application', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idapplication',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('susencargos.model.Group', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idgroup',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'active',
            type: 'boolean',
            defaultValue: false
        }]
});

Ext.define('susencargos.model.User', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'iduser',
            type: 'int'
        }, {
            name: 'login',
            type: 'string'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'active',
            type: 'boolean',
            defaultValue: false
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'lastLogin',
            type: 'date',
            dateFormat: 'Y-m-d H:i:s'
        }, {
            name: 'logged',
            type: 'boolean',
            defaultValue: false
        }]
});

Ext.define('susencargos.model.Module', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idmodule',
            type: 'int',
            defaultValue: 0
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'idparent',
            type: 'int',
            allowNull: true
        }, {
            name: 'class',
            type: 'string'
        }, {
            name: 'script',
            type: 'string'
        }, {
            name: 'application',
            reference: 'susencargos.model.Application'
        }],
    idProperty: 'idmodule'
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
        }]
});

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
            name: 'stateTracking',
            reference: 'susencargos.model.StateTracking'
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
        url: "stores/list_objects.php",
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
Ext.Loader.setPath('Ext.ux', './js/extjs/build/ux');
Ext.apply(Ext.form.field.VTypes, {
    daterange: function (val, field) {
        var date = field.parseDate(val);

        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        return true;
    },
    daterangeText: 'La fecha de inicio debe ser inferior a la fecha de fin',
    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    passwordText: 'La contrase\xf1a y la confirmaci\xf3n no coinciden'
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Controllers">
Ext.create('Ext.app.Controller', {
    control: {
        /*Administración*/
        'menu menuitem[action=users]': {click: 'users'},
        'menu menuitem[action=groups]': {click: 'groups'},
        'menu menuitem[action=apps]': {click: 'apps'},
        'menu menuitem[action=customers]': {click: 'customers'},
        'menu menuitem[action=zones]': {click: 'zones'},
        'menu menuitem[action=cities]': {click: 'cities'},
        'menu menuitem[action=templates]': {click: 'templates'},
        'menu menuitem[action=statesTracking]': {click: 'statesTracking'},
        /*Operaciones*/
        'menu menuitem[action=packages]': {click: 'packages'},
        'menu menuitem[action=enterPackage]': {click: 'enterPackage'},
        /*Reportes*/
        'menu menuitem[action=miles]': {click: 'miles'},
        /*CMS*/
        'menu menuitem[action=typesResource]': {click: 'typesResource'},
        /*Aplicación*/
        'menu menuitem[action=changePass]': {click: 'changePass'},
        'menu menuitem[action=logout]': {click: 'logout'}
    },
    users: function () {
        this.openGrid('listUsers');
    },
    groups: function () {
        this.openGrid('listGroups');
    },
    apps: function () {
        this.openGrid('listApplications');
    },
    customers: function () {
        this.openGrid('listCustomers');
    },
    zones: function () {
        this.openGrid('listZones');
    },
    cities: function () {
        this.openGrid('listCities');
    },
    templates: function () {
        this.openGrid('listTemplates');
    },
    statesTracking: function () {
        this.openGrid('listStatesTracking');
    },
    packages: function () {
        this.openGrid('listPackages');
    },
    enterPackage: function () {
        Ext.getStore('City').load({
            params: {
                start: 0,
                limit: 1000
            },
            callback: function () {
                Ext.getStore('Customer').load({
                    params: {
                        start: 0,
                        limit: 1000
                    },
                    callback: function () {
                        Ext.getStore('PayType').load({
                            callback: function () {
                                Ext.getStore('PackageType').load({
                                    callback: function () {
                                        var form = Ext.widget('formPackage').down('form');
                                        form.loadRecord(Ext.create('susencargos.model.Package'));
                                        form.getForm().findField('amount').setValue(1);
                                        form.getForm().findField('declaredValue').setValue(400000);
                                        form.getForm().findField('idpackagetype').setValue(1);
                                        form.getForm().findField('weight').setValue(30);
                                        form.getForm().findField('idpaytype').setValue(1);
                                        form.getForm().findField('date').setValue(Ext.Date.format(new Date(),"Y-m-d"));
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    changePass: function () {
        Ext.create('Ext.window.Window', {
            title: 'Cambiar contrase\xf1a',
            iconCls: 'edit',
            alias: 'widget.formChangePass',
            width: 300,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                    xtype: 'form',
                    url: 'update/user_pass.php',
                    defaults: {
                        labelAlign: 'right'
                    },
                    frame: true,
                    items: [{
                            xtype: 'hiddenfield',
                            name: 'iduser',
                            value: 0
                        }, {
                            xtype: 'textfield',
                            name: 'pass',
                            itemId: 'pass',
                            vtype: "alphanum",
                            value: '',
                            allowBlank: false,
                            inputType: 'password',
                            anchor: '90%',
                            fieldLabel: '* Contrase\xf1a'
                        }, {
                            xtype: 'textfield',
                            name: 'confirm',
                            value: '',
                            allowBlank: false,
                            vtype: 'password',
                            initialPassField: 'pass',
                            inputType: 'password',
                            anchor: '90%',
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
                                                icon: Ext.Msg.INFO
                                            });
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
                                    });
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
                        }],
                    bbar: ['* Campos obligatorios']
                }]
        });
    },
    logout: function () {
        window.location = 'logout.php';
    },
    openGrid: function (grid) {
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.' + grid) {
                opened = true;
                panel = n;
            }
        });
        if (!opened) {
            panel = Ext.widget(grid);
            content.add(panel);
        }
        Ext.getCmp('contenido').setActiveTab(panel);
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listApplications button[action=insert]': {click: 'insert'},
        'listApplications button[action=clean]': {click: 'cleanFilters'},
        'listApplications': {itemdblclick: 'editDbl'},
        'listApplications actioncolumn[action=groups]': {click: 'groups'},
        'listApplications actioncolumn[action=modules]': {click: 'modules'},
        'listApplications actioncolumn[action=edit]': {click: 'edit'},
        'listApplications actioncolumn[action=remove]': {click: 'remove'},
        'formApplication button[action=cancel]': {click: 'cancel'},
        'formApplication button[action=save]': {click: 'save'},
        'listGroupsApplication grid#gridDestination dataview': {drop: 'insertGroup'},
        'listGroupsApplication grid#gridSource dataview': {drop: 'removeGroup'},
        'listModules button[action=insert]': {click: 'insertModule'},
        'listModules button[action=clean]': {click: 'cleanFiltersModules'},
        'listModules': {itemdblclick: 'editDblModule'},
        'listModules actioncolumn[action=groups]': {click: 'groupsModule'},
        'listModules actioncolumn[action=edit]': {click: 'editModule'},
        'listModules actioncolumn[action=remove]': {click: 'removeModule'},
        'formModule button[action=cancel]': {click: 'cancel'},
        'formModule button[action=save]': {click: 'saveModule'},
        'listGroupsModule button[action=insert]': {click: 'insertGroupModule'},
        'listGroupsModule button[action=clean]': {click: 'cleanFiltersGroupsModule'},
        'listGroupsModule': {itemdblclick: 'editDblGroupModule'},
        'listGroupsModule actioncolumn[action=edit]': {click: 'editGroupModule'},
        'listGroupsModule actioncolumn[action=remove]': {click: 'removeGroupModule'},
        'formGroupModule button[action=cancel]': {click: 'cancel'},
        'formGroupModule button[action=save]': {click: 'saveGroupModule'}
    },
    groups: function (v, r, c, i, e) {
        Ext.getStore('GroupsApplication').getProxy().setExtraParam('idapplication', v.getStore().getAt(c).get('idapplication'));
        Ext.getStore('GroupsApplication').load();
        Ext.getStore('NoGroupsApplication').getProxy().setExtraParam('idapplication', v.getStore().getAt(c).get('idapplication'));
        Ext.getStore('NoGroupsApplication').load();
        panel = Ext.widget('listGroupsApplication');
        panel.setTitle('Listado grupos asignados a la aplicaci\xf3n ' + v.getStore().getAt(c).get('name'));
    },
    modules: function (v, r, c, i, e) {
        Ext.getStore('Module').getProxy().setExtraParam('idapplication', v.getStore().getAt(c).get('idapplication'));
        Ext.getStore('Module').load();
        Ext.getStore('ModuleTree').getProxy().setExtraParam('idapplication', v.getStore().getAt(c).get('idapplication'));
        Ext.getStore('ModuleTree').load();
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.listModules') {
                opened = true;
                panel = n
            }
        });
        if (!opened) {
            panel = Ext.widget('listModules');
            content.add(panel);
        }
        panel.setTitle('Listado m\xf3dulos de la aplicaci\xf3n ' + v.getStore().getAt(c).get('name'));
        Ext.getCmp('contenido').setActiveTab(panel);
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Application').load();
    },
    insert: function (b, e) {
        Ext.widget('formApplication').down('form').loadRecord(Ext.create('susencargos.model.Application'));
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formApplication').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formApplication').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idapplication').getValue());
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
                            Ext.getStore('Application').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idapplication'),
                        object: 'apps'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Application').load();
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
        })
    },
    insertGroup: function (n, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'update/save_object.php',
                params: {
                    idapplication: Ext.getStore('GroupsApplication').getProxy().extraParams.idapplication,
                    object: 'groupApplication',
                    id: 0,
                    idgroup: n.get('idgroup')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    removeGroup: function (no, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'delete/delete_object.php',
                params: {
                    idapplication: Ext.getStore('GroupsApplication').getProxy().extraParams.idapplication,
                    object: 'groupApplication',
                    idgroup: n.get('idgroup')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    insertModule: function (b, e) {
        var form = Ext.widget('formModule');
        form.down('form').loadRecord(Ext.create('susencargos.model.Module'));
        form.down('form').getForm().findField('idapplication').setValue(Ext.getStore('Module').getProxy().extraParams.idapplication);
    },
    cleanFiltersModules: function (b, e) {
        b.up('treepanel').filters.clearFilters();
        Ext.getStore('Module').load();
    },
    editDblModule: function (g, r) {
        var form = Ext.widget('formModule');
        form.down('form').getForm().loadRecord(r);
        form.down('form').getForm().findField('idapplication').setValue(Ext.getStore('Module').getProxy().extraParams.idapplication);
    },
    editModule: function (v, r, c, i, e) {
        var form = Ext.widget('formModule');
        form.down('form').getForm().loadRecord(v.getStore().getAt(c));
        form.down('form').getForm().findField('idapplication').setValue(Ext.getStore('Module').getProxy().extraParams.idapplication);
    },
    saveModule: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(Ext.isNumeric(b.up('form').getForm().findField('idmodule').getValue()) ? b.up('form').getForm().findField('idmodule').getValue() : 0);
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
                            Ext.getStore('Module').load();
                            Ext.getStore('ModuleTree').load();
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
            })
        }
    },
    removeModule: function (v, c, dr, dp) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getSelectionModel().getLastSelected().get('idmodule'),
                        object: 'modules'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Module').load();
                                Ext.getStore('ModuleTree').load();
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
        })
    },
    groupsModule: function (v, r, c, i, e) {
        Ext.getStore('GroupsModule').getProxy().setExtraParam('idmodule', v.getStore().getAt(c).get('idmodule'));
        Ext.getStore('GroupsModule').load();
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.listGroupsModule') {
                opened = true;
                panel = n
            }
        });
        if (!opened) {
            panel = Ext.widget('listGroupsModule');
            content.add(panel);
        }
        panel.setTitle('Listado grupos asignados al m\xf3dulo ' + v.getStore().getAt(c).get('name'));
        Ext.getCmp('contenido').setActiveTab(panel);
    },
    insertGroupModule: function (b, e) {
        Ext.getStore('Group').load();
        Ext.getStore('LevelAccess').load();
        var form = Ext.widget('formGroupModule');
        form.down('form').loadRecord(Ext.create('susencargos.model.GroupModule'));
        form.down('form').getForm().findField('idmodule').setValue(Ext.getStore('GroupsModule').getProxy().extraParams.idmodule);
    },
    cleanFiltersGroupsModule: function (b, e) {
        b.up('treepanel').filters.clearFilters();
        Ext.getStore('Module').load();
    },
    saveGroupModule: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idgroupmodule').getValue());
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
                            Ext.getStore('GroupsModule').load();
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
            })
        }
    },
    editDblGroupModule: function (g, r) {
        Ext.getStore('Group').load({
            callback: function () {
                Ext.getStore('LevelAccess').load({
                    callback: function () {
                        var form = Ext.widget('formGroupModule');
                        form.down('form').getForm().loadRecord(r);
                        form.down('form').getForm().findField('idmodule').setValue(Ext.getStore('GroupsModule').getProxy().extraParams.idmodule);
                        form.down('form').getForm().findField('idgroup').setValue(r.get('group').idgroup);
                        form.down('form').getForm().findField('idlevelaccess').setValue(r.get('levelAccess').idlevelaccess);
                    }
                });
            }
        });
    },
    editGroupModule: function (v, r, c, i, e) {
        Ext.getStore('Group').load({
            callback: function () {
                Ext.getStore('LevelAccess').load({
                    callback: function () {
                        var form = Ext.widget('formGroupModule');
                        form.down('form').getForm().loadRecord(v.getStore().getAt(c));
                        form.down('form').getForm().findField('idmodule').setValue(Ext.getStore('GroupsModule').getProxy().extraParams.idmodule);
                        form.down('form').getForm().findField('idgroup').setValue(v.getStore().getAt(c).get('group').idgroup);
                        form.down('form').getForm().findField('idlevelaccess').setValue(v.getStore().getAt(c).get('levelAccess').idlevelaccess);
                    }
                });
            }
        });
    },
    removeGroupModule: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idgroupmodule'),
                        object: 'groupsModule'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('GroupsModule').load();
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
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listGroups button[action=insert]': {click: 'insert'},
        'listGroups button[action=clean]': {click: 'cleanFilters'},
        'listGroups': {itemdblclick: 'editDbl'},
        'listGroups actioncolumn[action=countries]': {click: 'countries'},
        'listGroups actioncolumn[action=applications]': {click: 'applications'},
        'listGroups actioncolumn[action=users]': {click: 'users'},
        'listGroups actioncolumn[action=edit]': {click: 'edit'},
        'listGroups actioncolumn[action=remove]': {click: 'remove'},
        'formGroup button[action=cancel]': {click: 'cancel'},
        'formGroup button[action=save]': {click: 'save'},
        'listUsersGroup grid#gridDestination dataview': {drop: 'insertUser'},
        'listUsersGroup grid#gridSource dataview': {drop: 'removeUser'},
        'listApplicationsGroup grid#gridDestination dataview': {drop: 'insertApplication'},
        'listApplicationsGroup grid#gridSource dataview': {drop: 'removeApplication'},
        'listCountriesGroup grid#gridDestination dataview': {drop: 'insertCountry'},
        'listCountriesGroup grid#gridSource dataview': {drop: 'removeCountry'}
    },
    countries: function (v, r, c, i, e) {
        Ext.getStore('CountriesGroup').getProxy().setExtraParam('idgroup', v.getStore().getAt(c).get('idgroup'));
        Ext.getStore('CountriesGroup').load({
            callback: function () {
                Ext.getStore('NoCountriesGroup').getProxy().setExtraParam('idgroup', v.getStore().getAt(c).get('idgroup'));
                Ext.getStore('NoCountriesGroup').load({
                    callback: function () {
                        panel = Ext.widget('listCountriesGroup');
                        panel.setTitle('Listado paises asignados al grupo ' + v.getStore().getAt(c).get('name'));
                    }
                });
            }
        });
    },
    applications: function (v, r, c, i, e) {
        Ext.getStore('ApplicationsGroup').getProxy().setExtraParam('idgroup', v.getStore().getAt(c).get('idgroup'));
        Ext.getStore('ApplicationsGroup').load();
        Ext.getStore('NoApplicationsGroup').getProxy().setExtraParam('idgroup', v.getStore().getAt(c).get('idgroup'));
        Ext.getStore('NoApplicationsGroup').load();
        panel = Ext.widget('listApplicationsGroup');
        panel.setTitle('Listado aplicaciones asignadas al grupo ' + v.getStore().getAt(c).get('name'));
    },
    users: function (v, r, c, i, e) {
        Ext.getStore('UsersGroup').getProxy().setExtraParam('idgroup', v.getStore().getAt(c).get('idgroup'));
        Ext.getStore('UsersGroup').load();
        Ext.getStore('NoUsersGroup').getProxy().setExtraParam('idgroup', v.getStore().getAt(c).get('idgroup'));
        Ext.getStore('NoUsersGroup').load();
        panel = Ext.widget('listUsersGroup');
        panel.setTitle('Listado usuarios asignados al grupo ' + v.getStore().getAt(c).get('name'));
    },
    insert: function (b, e) {
        Ext.widget('formGroup').down('form').loadRecord(Ext.create('susencargos.model.Group'));
    },
    cleanFilters: function (b, e) {
        Ext.getStore('Group').load();
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formGroup').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formGroup').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idgroup').getValue());
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
                            Ext.getStore('Group').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idgroup'),
                        object: 'groups'
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Group').load()
                            }
                        });
                    },
                    failed: function (t, p, o) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: p.response.result.msg.title,
                            msg: p.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                    }
                });
            }
        })
    },
    insertUser: function (n, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'update/save_object.php',
                params: {
                    idgroup: Ext.getStore('UsersGroup').getProxy().extraParams.idgroup,
                    id: 0,
                    object: 'userGroup',
                    iduser: n.get('iduser')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    removeUser: function (no, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'delete/delete_object.php',
                params: {
                    idgroup: Ext.getStore('UsersGroup').getProxy().extraParams.idgroup,
                    object: 'userGroup',
                    iduser: n.get('iduser')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    insertApplication: function (n, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'update/save_object.php',
                params: {
                    idgroup: Ext.getStore('ApplicationsGroup').getProxy().extraParams.idgroup,
                    object: 'applicationGroup',
                    id: 0,
                    idapplication: n.get('idapplication')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    removeApplication: function (no, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'delete/delete_object.php',
                params: {
                    idgroup: Ext.getStore('ApplicationsGroup').getProxy().extraParams.idgroup,
                    object: 'applicationGroup',
                    idapplication: n.get('idapplication')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    insertCountry: function (n, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'update/save_object.php',
                params: {
                    idgroup: Ext.getStore('CountriesGroup').getProxy().extraParams.idgroup,
                    object: 'countryGroup',
                    id: 0,
                    idcountry: n.get('idcountry')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    },
    removeCountry: function (no, d, dr, dp) {
        Ext.each(d.records, function (n, i, s) {
            Ext.Ajax.request({
                url: 'delete/delete_object.php',
                params: {
                    idgroup: Ext.getStore('CountriesGroup').getProxy().extraParams.idgroup,
                    object: 'countryGroup',
                    idcountry: n.get('idcountry')
                },
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: function (t, p, o) {
                    var d = Ext.JSON.decode(t.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listStatesTracking button[action=insert]': {click: 'insert'},
        'listStatesTracking button[action=clean]': {click: 'cleanFilters'},
        'listStatesTracking': {itemdblclick: 'editDbl'},
        'listStatesTracking actioncolumn[action=edit]': {click: 'edit'},
        'listStatesTracking actioncolumn[action=remove]': {click: 'remove'},
        'formStateTracking button[action=cancel]': {click: 'cancel'},
        'formStateTracking button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formStateTracking').down('form').loadRecord(Ext.create('susencargos.model.StateTracking'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('StateTracking').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formStateTracking');
        form.down('form').loadRecord(v.getStore().getAt(c));
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formStateTracking');
        form.down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idstatetracking').getValue());
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
                            Ext.getStore('StateTracking').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idstatetracking'),
                        object: 'statesTracking'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('StateTracking').load()
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
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listTemplates button[action=insert]': {click: 'insert'},
        'listTemplates button[action=clean]': {click: 'cleanFilters'},
        'listTemplates': {itemdblclick: 'editDbl'},
        'listTemplates actioncolumn[action=fields]': {click: 'fields'},
        'listTemplates actioncolumn[action=edit]': {click: 'edit'},
        'listTemplates actioncolumn[action=remove]': {click: 'remove'},
        'formTemplate button[action=cancel]': {click: 'cancel'},
        'formTemplate button[action=save]': {click: 'save'},
        'listFieldsTemplate button[action=insert]': {click: 'insertField'},
        'listFieldsTemplate button[action=clean]': {click: 'cleanFiltersField'},
        'listFieldsTemplate': {itemdblclick: 'editDblField'},
        'listFieldsTemplate actioncolumn[action=edit]': {click: 'editField'},
        'listFieldsTemplate actioncolumn[action=remove]': {click: 'removeField'},
        'formFieldTemplate button[action=cancel]': {click: 'cancel'},
        'formFieldTemplate button[action=save]': {click: 'saveField'},
    },
    fields: function (v, r, c, i, e) {
        Ext.getStore('FieldTemplate').getProxy().setExtraParam('idtemplate', v.getStore().getAt(c).get('idtemplate'));
        Ext.getStore('FieldTemplate').load();
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.listFieldsTemplate') {
                opened = true;
                panel = n
            }
        });
        if (!opened) {
            panel = Ext.widget('listFieldsTemplate');
            content.add(panel);
        }
        panel.setTitle('Listado campo de la plantilla ' + v.getStore().getAt(c).get('name'));
        Ext.getCmp('contenido').setActiveTab(panel);
    },
    insert: function (b, e) {
        Ext.widget('formTemplate').down('form').loadRecord(Ext.create('susencargos.model.Template'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Template').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formTemplate').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formTemplate').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idtemplate').getValue());
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
                            Ext.getStore('Template').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idtemplate'),
                        object: 'templates'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Template').load()
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
        })
    },
    insertField: function (b, e) {
        var form = Ext.widget('formFieldTemplate');
        form.down('form').loadRecord(Ext.create('susencargos.model.FieldTemplate'));
        form.down('form').getForm().findField('idtemplate').setValue(Ext.getStore('FieldTemplate').getProxy().extraParams.idtemplate);
    },
    cleanFiltersField: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('FieldTemplate').load();
    },
    editField: function (v, r, c, i, e) {
        Ext.widget('formFieldTemplate').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDblField: function (g, r) {
        Ext.widget('formFieldTemplate').down('form').loadRecord(r);
    },
    saveField: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idfield').getValue());
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
                            Ext.getStore('FieldTemplate').load();
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
            })
        }
    },
    removeField: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idfield'),
                        object: 'fields'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('FieldTemplate').load()
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
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listUsers button[action=insert]": {click: 'insert'},
        "listUsers button[action=clean]": {click: 'cleanFilters'},
        "listUsers": {itemdblclick: 'editDbl'},
        "listUsers actioncolumn[action=group]": {click: 'group'},
        "listUsers actioncolumn[action=printer]": {click: 'printer'},
        "listUsers actioncolumn[action=edit]": {click: 'edit'},
        "listUsers actioncolumn[action=remove]": {click: 'remove'},
        "formUser button[action=cancel]": {click: 'cancel'},
        "formUser button[action=save]": {click: 'save'},
        "formUser button[action=changePass]": {click: 'changePass'},
        "listGroupsUser grid#gridDestination dataview": {drop: 'insertGroup'},
        "listGroupsUser grid#gridSource dataview": {drop: 'removeGroup'},
        "formCustomerRegister combo[name=idcountry]": {change: 'changeCountry'},
        "formCustomerRegister combo[name=idcity]": {change: 'changeCity'},
        "formCustomerRegister combo[name=delivery_salepoint]": {change: 'changeSalePoint'},
        "formCustomerRegister textfield[name=identification]": {blur: 'blurID'},
        "formCustomerRegister textfield[name=email]": {blur: 'blurEmail'},
        "formCustomerRegister button[text=Registrar]": {click: 'registerCustomer'},
        "formRecoveryPass combo[name=idrecoverymethod]": {change: 'changeRecoveryMethod'},
        "formRecoveryPass textfield[name=email]": {blur: 'blurEmailRecoveryPass'},
        "formRecoveryPass button[text=Continuar]": {click: 'recoveryPass'},
        "formChangePass button[text=Cambiar]": {click: 'setNewPass'},
        "formPrinterUser button[action=cancel]": {click: 'cancel'},
        "formPrinterUser button[action=save]": {click: 'savePrinter'}
    },
    group: function (b, f, h, d, g) {
        Ext.getStore("GroupsUser").getProxy().setExtraParam("iduser", b.getStore().getAt(h).get("iduser"));
        Ext.getStore("GroupsUser").load();
        Ext.getStore("NoGroupsUser").getProxy().setExtraParam("iduser", b.getStore().getAt(h).get("iduser"));
        Ext.getStore("NoGroupsUser").load();
        var a = Ext.widget("listGroupsUser");
        a.setTitle("Listado grupos del usuario " + b.getStore().getAt(h).get("name"))
    },
    printer: function (a, d, g, b, f) {
        Ext.getStore('Printer').load({
            callback: function () {
                Ext.Ajax.request({
                    method: 'GET',
                    url: "stores/list_objects.php",
                    params: {
                        id: a.getStore().getAt(g).get("iduser"),
                        object: "printerUser"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        var form = Ext.widget("formPrinterUser");
                        form.down("form").getForm().findField('iduser').setValue(a.getStore().getAt(g).get("iduser"));
                        form.down("form").getForm().findField('idprinter').setValue((h.data[0].idprinter == 0 ? "" : h.data[0].idprinter))
                    },
                    failed: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: p.response.result.msg.title,
                            msg: p.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        })
                    }
                })
            }
        })
    },
    insert: function (a, c) {
        Ext.widget("formUser").down("form").loadRecord(Ext.create("susencargos.model.User"))
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
        Ext.getStore('User').load()
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formUser").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formUser").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("iduser").getValue());
            a.up("form").getForm().submit({waitMsg: "Guardando ...", success: function (b, e, g) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () {
                            Ext.getStore("User").load()
                        }});
                    a.up("window").close()
                }, failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                    a.up("window").close()
                }})
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    savePrinter: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("iduser").getValue());
            a.up("form").getForm().submit({
                waitMsg: "Guardando ...",
                success: function (b, e, g) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    a.up("window").close()
                },
                failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    a.up("window").close()
                }
            })
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    remove: function (a, d, g, b, f) {
        Ext.MessageBox.confirm("Eliminar registro", "¿Desea eliminar el registro?", function (c) {
            if (c == "yes") {
                Ext.Ajax.request({
                    url: "delete/delete_object.php",
                    params: {
                        id: a.getStore().getAt(g).get("iduser"),
                        object: "users"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("User").load()
                            }
                        })
                    },
                    failed: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: p.response.result.msg.title,
                            msg: p.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        })
                    }
                })
            }
        })
    },
    changePass: function (a, c) {
        Ext.create("Ext.window.Window", {
            title: "Cambiar contrase\xf1a",
            iconCls: "edit",
            alias: "widget.formChangePass",
            width: 300,
            modal: true,
            layout: "fit",
            autoShow: true,
            items: [{
                    xtype: "form",
                    url: "update/user_pass.php",
                    defaults: {
                        labelAlign: "right"
                    },
                    frame: true,
                    items: [{
                            xtype: 'panel',
                            html: '* Campos obligatorios',
                            border: 0,
                            padding: 10
                        }, {
                            xtype: "hiddenfield",
                            name: "iduser",
                            value: a.up("form").getForm().findField("iduser").getValue()
                        }, {
                            xtype: "textfield",
                            name: "pass",
                            itemId: "pass",
                            vtype: "alphanum",
                            value: "",
                            allowBlank: false,
                            inputType: "password",
                            anchor: "90%",
                            fieldLabel: "* Contrase\xf1a"
                        }, {
                            xtype: "textfield",
                            name: "confirm",
                            value: "",
                            allowBlank: false,
                            vtype: "password",
                            initialPassField: "pass",
                            inputType: "password",
                            anchor: "90%",
                            fieldLabel: "* Confirmaci\xf3n"
                        }]
                }],
            buttons: [{
                    text: "Guardar",
                    handler: function (b, d) {
                        if (b.up('window').down("form").getForm().isValid()) {
                            b.up('window').down("form").getForm().submit({
                                waitMsg: "Guardando ...",
                                success: function (e, f, h) {
                                    var g = Ext.JSON.decode(f.response.responseText);
                                    Ext.MessageBox.show({
                                        title: g.msg.title,
                                        msg: g.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                    b.up("window").close()
                                },
                                failure: function (e, f) {
                                    var g = Ext.JSON.decode(f.response.responseText);
                                    Ext.MessageBox.show({
                                        title: g.msg.title,
                                        msg: g.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                    b.up("window").close()
                                }
                            })
                        } else {
                            Ext.MessageBox.show({
                                title: "Error",
                                msg: "Ingrese los datos correctos",
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            })
                        }
                    }
                }, {
                    text: "Cancelar",
                    handler: function (b, d) {
                        b.up("window").close()
                    }
                }]
        })
    },
    insertGroup: function (e, b, a, c) {
        Ext.each(b.records, function (g, d, f) {
            Ext.Ajax.request({
                url: "update/save_object.php", params: {
                    iduser: Ext.getStore("GroupsUser").getProxy().extraParams.iduser,
                    object: "groupUser",
                    idgroup: g.get("idgroup"),
                    id: 0
                },
                success: function (h, i, k) {
                    var j = Ext.JSON.decode(h.responseText);
                    Ext.MessageBox.show({
                        title: j.msg.title,
                        msg: j.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    })
                },
                failure: function (h, i, k) {
                    var j = Ext.JSON.decode(h.responseText);
                    Ext.MessageBox.show({
                        title: j.msg.title,
                        msg: j.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    })
                }
            })
        })
    },
    removeGroup: function (c, b, a, e) {
        Ext.each(b.records, function (g, d, f) {
            Ext.Ajax.request({
                url: "delete/delete_object.php", params: {
                    iduser: Ext.getStore("GroupsUser").getProxy().extraParams.iduser,
                    object: "groupUser",
                    idgroup: g.get("idgroup")
                },
                success: function (h, i, k) {
                    var j = Ext.JSON.decode(h.responseText);
                    Ext.MessageBox.show({
                        title: j.msg.title,
                        msg: j.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    })
                },
                failure: function (h, i, k) {
                    var j = Ext.JSON.decode(h.responseText);
                    Ext.MessageBox.show({
                        title: j.msg.title,
                        msg: j.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    })
                }
            })
        })
    },
    changeCountry: function (e, d, a, b) {
        if (Ext.isNumber(d)) {
            Ext.getStore("FE_City").getProxy().setExtraParam("idcountry", d);
            Ext.getStore("FE_City").load({
                start: 0,
                limit: 10000,
                callback: function (c) {
                    e.up("form").getForm().findField("idcity").setValue(c[0].get("idcity"))
                }
            })
        }
    },
    changeCity: function (e, d, a, b) {
        if (Ext.isNumber(d)) {
            Ext.getStore("FE_SalePoint").getProxy().setExtraParam("idcity", d);
            Ext.getStore("FE_SalePoint").load()
        }
    },
    changeSalePoint: function (e, d, a, b) {
        if (d == 1) {
            e.up("form").getForm().findField("idsalepoint").setVisible(true);
            e.up("form").getForm().findField("address").setVisible(false);
            e.up("form").getForm().findField("address").allowBlank = true;
            e.up("form").getForm().findField("idsalepoint").allowBlank = false
        } else {
            e.up("form").getForm().findField("idsalepoint").setVisible(false);
            e.up("form").getForm().findField("address").setVisible(true);
            e.up("form").getForm().findField("address").allowBlank = false;
            e.up("form").getForm().findField("idsalepoint").allowBlank = true
        }
    },
    registerCustomer: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            if (!a.up("form").getForm().findField("agree_tyc").getValue()) {
                Ext.MessageBox.show({
                    title: "Error",
                    msg: "Debes aceptar los t\xe9rminos y condiciones",
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                })
            } else {
                a.up("form").getForm().submit({
                    waitMsg: "Guardando ...",
                    success: function (b, e, g) {
                        var f = Ext.JSON.decode(e.response.responseText);
                        Ext.MessageBox.show({
                            title: f.msg.title,
                            msg: f.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                window.location = "Paginas/Default.php"
                            }
                        })
                    },
                    failure: function (b, e) {
                        var f = Ext.JSON.decode(e.response.responseText);
                        Ext.MessageBox.show({
                            title: f.msg.title,
                            msg: f.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        })
                    }
                })
            }
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    blurID: function (a, b, c) {
        if (a.getValue() != "") {
            Ext.Ajax.request({
                url: "ajax/validate_data_register.php",
                params: {
                    id: a.getValue(),
                    object: "id"
                },
                success: function (e) {
                    var f = Ext.JSON.decode(e.responseText);
                    if (!f.success) {
                        Ext.MessageBox.show({
                            title: "Documento inv\xe1lido",
                            msg: "El documento ya se encuentra registrado",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        })
                    }
                }
            })
        }
    },
    blurEmail: function (a, b, c) {
        if (a.getValue() != "") {
            Ext.Ajax.request({
                url: "ajax/validate_data_register.php",
                params: {
                    email: a.getValue(),
                    object: "email"
                },
                success: function (e) {
                    var f = Ext.JSON.decode(e.responseText);
                    if (!f.success) {
                        Ext.MessageBox.show({
                            title: "Email inv\xe1lido",
                            msg: "El email ya se encuentra registrado",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        })
                    }
                }
            })
        }
    },
    changeRecoveryMethod: function (e, d, a, b) {
        if (d == 1) {
            e.up("form").getForm().findField("idsecretquestion").setVisible(true);
            e.up("form").getForm().findField("idsecretquestion").allowBlank = false;
            e.up("form").getForm().findField("secret_answer").setVisible(true);
            e.up("form").getForm().findField("secret_answer").allowBlank = false
        } else {
            e.up("form").getForm().findField("idsecretquestion").setVisible(false);
            e.up("form").getForm().findField("idsecretquestion").allowBlank = true;
            e.up("form").getForm().findField("secret_answer").setVisible(false);
            e.up("form").getForm().findField("secret_answer").allowBlank = true
        }
    },
    blurEmailRecoveryPass: function (a, b, c) {
        if (a.getValue() != "") {
            Ext.Ajax.request({
                url: "ajax/validate_data_register.php",
                params: {
                    email: a.getValue(),
                    object: "email"
                },
                success: function (e) {
                    var f = Ext.JSON.decode(e.responseText);
                    if (f.success) {
                        Ext.MessageBox.show({
                            title: "Email inv\xe1lido",
                            msg: "El email no se encuentra registrado en nuestro sistema",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR,
                            fn: function () {
                                a.focus(true)
                            }
                        })
                    } else {
                        Ext.getStore("FE_SecretQuestion").load();
                        Ext.Ajax.request({
                            url: "ajax/validate_data_register.php",
                            params: {
                                email: a.getValue(),
                                object: "secretQuestion"
                            },
                            success: function (g) {
                                var h = Ext.JSON.decode(g.responseText);
                                if (h.success) {
                                    a.up("form").getForm().findField("idsecretquestion").setValue(h.secretQuestion.idsecretquestion);
                                    a.up("form").getForm().findField("idsecretquestion").setReadOnly(true)
                                } else {
                                    Ext.MessageBox.show({
                                        title: "Error",
                                        msg: "Hubo un error al recuperar la pregunta secreta",
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    },
    recoveryPass: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().submit({
                waitMsg: "Procesando ...",
                success: function (b, e, g) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function () {
                            if (a.up("form").getForm().findField("idrecoverymethod").getValue() == 1) {
                                window.location = "change_pass.php?" + f.link
                            }
                        }
                    })
                },
                failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    })
                }
            })
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    setNewPass: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().submit({
                waitMsg: "Guardando ...",
                success: function (b, e, g) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function () {
                            window.location = "Ingresar.php"
                        }
                    })
                },
                failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    })
                }
            })
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listCustomers button[action=insert]': {click: 'insert'},
        'listCustomers button[action=clean]': {click: 'cleanFilters'},
        'listCustomers': {itemdblclick: 'editDbl'},
        'listCustomers actioncolumn[action=edit]': {click: 'edit'},
        'listCustomers actioncolumn[action=remove]': {click: 'remove'},
        'formCustomer button[action=cancel]': {click: 'cancel'},
        'formCustomer button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formCustomer').down('form').loadRecord(Ext.create('susencargos.model.Customer'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Customer').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('City').load({
            params: {
                start: 0,
                limit: 1000
            },
            callback: function () {
                var form = Ext.widget('formCustomer');
                form.down('form').loadRecord(v.getStore().getAt(c));
                form.down('form').getForm().findField('idcity').setValue(v.getStore().getAt(c).get('city').idcity);
            }
        });
    },
    editDbl: function (g, r) {
        Ext.getStore('City').load({
            params: {
                start: 0,
                limit: 1000
            },
            callback: function () {
                var form = Ext.widget('formCustomer');
                form.down('form').loadRecord(r);
                form.down('form').getForm().findField('idcity').setValue(r.get('city').idcity);
            }
        });
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idcustomer').getValue());
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
                            Ext.getStore('Customer').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idcustomer'),
                        object: 'customers'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Customer').load();
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

Ext.create('Ext.app.Controller', {
    control: {
        'listZones button[action=insert]': {click: 'insert'},
        'listZones button[action=clean]': {click: 'cleanFilters'},
        'listZones': {itemdblclick: 'editDbl'},
        'listZones actioncolumn[action=edit]': {click: 'edit'},
        'listZones actioncolumn[action=remove]': {click: 'remove'},
        'formZone button[action=cancel]': {click: 'cancel'},
        'formZone button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formZone').down('form').loadRecord(Ext.create('susencargos.model.Zone'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Zone').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formZone');
        form.down('form').loadRecord(v.getStore().getAt(c));
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formZone');
        form.down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idzone').getValue());
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
                            Ext.getStore('Zone').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idzone'),
                        object: 'zones'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Zone').load();
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

Ext.create('Ext.app.Controller', {
    control: {
        'listCities button[action=insert]': {click: 'insert'},
        'listCities button[action=clean]': {click: 'cleanFilters'},
        'listCities': {itemdblclick: 'editDbl'},
        'listCities actioncolumn[action=edit]': {click: 'edit'},
        'listCities actioncolumn[action=remove]': {click: 'remove'},
        'formCity button[action=cancel]': {click: 'cancel'},
        'formCity button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formCity').down('form').loadRecord(Ext.create('susencargos.model.City'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('City').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('Zone').load({
            callback: function () {
                var form = Ext.widget('formCity');
                form.down('form').loadRecord(v.getStore().getAt(c));
                form.down('form').getForm().findField('idzone').setValue(v.getStore().getAt(c).get('zone').idzone);
            }
        });
    },
    editDbl: function (g, r) {
        Ext.getStore('Zone').load({
            callback: function () {
                var form = Ext.widget('formCity');
                form.down('form').loadRecord(r);
                form.down('form').getForm().findField('idzone').setValue(r.get('zone').idzone);
            }
        });
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idcity').getValue());
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
                            Ext.getStore('City').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idcity'),
                        object: 'cities'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('City').load();
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

Ext.create('Ext.app.Controller', {
    control: {
        'listPackages button[action=insert]': {click: 'insert'},
        'listPackages button[action=clean]': {click: 'cleanFilters'},
        'listPackages': {itemdblclick: 'editDbl'},
        'listPackages actioncolumn[action=edit]': {click: 'edit'},
        'listPackages actioncolumn[action=remove]': {click: 'remove'},
        'formPackage combo[name=idcustomer]': {select: 'changeCustomer'},
        'formPackage combo[name=idpackagetype]': {select: 'changePackageType'},
        'formPackage button[action=cancel]': {click: 'cancel'},
        'formPackage button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formPackage').down('form').loadRecord(Ext.create('susencargos.model.Package'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('City').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    changeCustomer: function (c, i) {
        var form = c.up('window').down('form').getForm();
        form.findField('idcitysource').setValue(i[0].get('city').idcity);
    },
    changePackageType: function (c, i) {
        var form = c.up('window').down('form').getForm();
        if (i[0].get('idpackagetype') == 1) {//Caja
            form.findField('weight').setValue(30);
        } else {//Sobre
            form.findField('weight').setValue(1);
        }
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('City').load({
            params: {
                start: 0,
                limit: 1000
            },
            callback: function () {
                Ext.getStore('Customer').load({
                    params: {
                        start: 0,
                        limit: 1000
                    },
                    callback: function () {
                        Ext.getStore('PayType').load({
                            callback: function () {
                                Ext.getStore('PackageType').load({
                                    callback: function () {
                                        var form = Ext.widget('formPackage');
                                        form.down('form').loadRecord(v.getStore().getAt(c));
                                        form.down('form').getForm().findField('idcitysource').setValue(v.getStore().getAt(c).get('citySource').idcity);
                                        form.down('form').getForm().findField('idcitydestination').setValue(v.getStore().getAt(c).get('cityDestination').idcity);
                                        form.down('form').getForm().findField('idcustomer').setValue(v.getStore().getAt(c).get('customer').idcustomer);
                                        form.down('form').getForm().findField('idpaytype').setValue(v.getStore().getAt(c).get('payType').idpaytype);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    editDbl: function (g, r) {
        Ext.getStore('City').load({
            params: {
                start: 0,
                limit: 1000
            },
            callback: function () {
                Ext.getStore('Customer').load({
                    params: {
                        start: 0,
                        limit: 1000
                    },
                    callback: function () {
                        Ext.getStore('PayType').load({
                            callback: function () {
                                Ext.getStore('PackageType').load({
                                    callback: function () {
                                        var form = Ext.widget('formCity');
                                        form.down('form').loadRecord(r);
                                        form.down('form').getForm().findField('idcitysource').setValue(r.get('citySource').idcity);
                                        form.down('form').getForm().findField('idcitydestination').setValue(r.get('cityDestination').idcity);
                                        form.down('form').getForm().findField('idcustomer').setValue(r.get('customer').idcustomer);
                                        form.down('form').getForm().findField('idpaytype').setValue(r.get('payType').idpaytype);
                                    }
                                });
                            }
                        });
                    }
                });
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
                            Ext.getStore('City').load();
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
            })
        }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idcity'),
                        object: 'cities'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('City').load();
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

Ext.create('Ext.app.Controller', {
    control: {
        'listPayTypes button[action=insert]': {click: 'insert'},
        'listPayTypes button[action=clean]': {click: 'cleanFilters'},
        'listPayTypes': {itemdblclick: 'editDbl'},
        'listPayTypes actioncolumn[action=edit]': {click: 'edit'},
        'listPayTypes actioncolumn[action=remove]': {click: 'remove'},
        'formPayType button[action=cancel]': {click: 'cancel'},
        'formPayType button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formPayType').down('form').loadRecord(Ext.create('susencargos.model.PayType'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('PayType').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formPayType');
        form.down('form').loadRecord(v.getStore().getAt(c));
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formPayType');
        form.down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idpaytype').getValue());
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
                            Ext.getStore('PayType').load();
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
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getStore().getAt(c).get('idpaytype'),
                        object: 'payTypes'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('PayType').load();
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
    requires: ['Ext.container.Viewport', 'Ext.chart.*', 'Ext.ux.form.TinyMCE'],
    name: 'susencargos',
    launch: function () {
        //<editor-fold defaultstate="collapsed" desc="Stores">
        Ext.create('susencargos.store.MainStore', {
            storeId: 'Application',
            model: 'susencargos.model.Application',
            object: 'apps'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Group',
            model: 'susencargos.model.Group',
            object: 'groups'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Module',
            model: 'susencargos.model.Module',
            object: 'modules'
        });

        Ext.create('Ext.data.TreeStore', {
            storeId: 'ModuleTree',
            model: 'susencargos.model.Module',
            nodeParam: 'module',
            remoteSort: true,
            proxy: {
                type: 'ajax',
                url: 'stores/module_tree.php',
                extraParams: {
                    idapplication: 0
                },
                reader: {
                    type: 'json',
                    root: 'module',
                    successProperty: 'success'
                },
                listeners: {
                    exception: function (p, r, o, op) {
                        var d = Ext.JSON.decode(r.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        })
                    }
                }
            }
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'User',
            model: 'susencargos.model.User',
            object: 'users'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Customer',
            model: 'susencargos.model.Customer',
            object: 'customers'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Zone',
            model: 'susencargos.model.Zone',
            object: 'zones'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'City',
            model: 'susencargos.model.City',
            object: 'cities'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'GroupsUser',
            model: 'susencargos.model.Group',
            autoLoad: false,
            object: 'groupsUser'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'NoGroupsUser',
            model: 'susencargos.model.Group',
            autoLoad: false,
            object: 'noGroupsUser'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'NoUsersGroup',
            model: 'susencargos.model.User',
            autoLoad: false,
            object: 'noUsersGroup'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'UsersGroup',
            model: 'susencargos.model.User',
            autoLoad: false,
            object: 'usersGroup'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'StateTracking',
            model: 'susencargos.model.StateTracking',
            object: 'statesTracking'
        });

        Ext.create('susencargos.store.MainStore', {
            storeId: 'Package',
            model: 'susencargos.model.Package',
            object: 'packages'
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
        //</editor-fold>

        /*
         Ext.create('susencargos.store.MainStore', {
         storeId: 'ApplicationsGroup',
         model: 'susencargos.model.Application',
         object: 'applicationsGroup'
         });
         
         Ext.create('susencargos.store.MainStore', {
         storeId: 'FieldTemplate',
         model: 'susencargos.model.FieldTemplate',
         object: 'fields'
         });
         
         Ext.create('susencargos.store.MainStore', {
         storeId: 'GroupsApplication',
         model: 'susencargos.model.Group',
         object: 'groupsApplication'
         });
         
         Ext.create('susencargos.store.MainStore', {
         storeId: 'GroupsModule',
         model: 'susencargos.model.GroupModule',
         object: 'groupsModule'
         });
         
         Ext.create('susencargos.store.MainStore', {
         storeId: 'NoApplicationsGroup',
         model: 'susencargos.model.Application',
         object: 'noApplicationsGroup'
         });
         
         Ext.create('susencargos.store.MainStore', {
         storeId: 'NoGroupsApplication',
         model: 'susencargos.model.Group',
         object: 'noGroupsApplication'
         });
         
         Ext.create('susencargos.store.MainStore', {
         storeId: 'Template',
         model: 'susencargos.model.Template',
         object: 'templates'
         });
         
         Ext.define('susencargos.view.application.FormGroupModule', {
         extend: 'susencargos.view.MainForm',
         alias: 'widget.formGroupModule',
         title: 'Editar grupo de un m\xf3dulo',
         object: 'groupsModule',
         fields: [{
         xtype: 'hiddenfield',
         name: 'idgroupmodule',
         value: 0
         }, {
         xtype: 'hiddenfield',
         name: 'idmodule',
         value: 0
         }, {
         xtype: 'combo',
         name: 'idgroup',
         value: '',
         store: 'Group',
         valueField: 'idgroup',
         displayField: 'name',
         allowBlank: false,
         fieldLabel: '* Grupo',
         queryMode: 'local',
         anchor: '90%',
         typeAhead: true,
         forceSelection: true
         }, {
         xtype: 'combo',
         name: 'idlevelaccess',
         value: '',
         store: 'LevelAccess',
         valueField: 'idlevelaccess',
         displayField: 'name',
         allowBlank: false,
         fieldLabel: '* Nivel de acceso',
         queryMode: 'local',
         anchor: '90%',
         typeAhead: true,
         forceSelection: true
         }],
         buttons: [{
         text: 'Guardar',
         action: 'save'
         }, {
         text: 'Cancelar',
         action: 'cancel'
         }]
         });
         
         Ext.define('susencargos.view.application.Groups', {
         extend: 'susencargos.view.DeprisaItemSelector',
         alias: 'widget.listGroupsApplication',
         title: 'Listado grupos de la aplicaci\xf3n',
         iconCls: 'group',
         columns: [{
         header: 'ID',
         filter: 'number',
         dataIndex: 'idgroup'
         }, {
         header: 'Nombre',
         filter: 'string',
         dataIndex: 'name',
         flex: 3
         }, {
         header: 'Activo',
         dataIndex: 'active',
         filter: 'boolean',
         renderer: function (value) {
         if (value) {
         return "Si";
         } else {
         return "No";
         }
         },
         flex: 1
         }],
         storeSource: 'NoGroupsApplication',
         storeFinish: 'GroupsApplication'
         });
         
         Ext.define('susencargos.view.application.GroupsModule', {
         extend: 'susencargos.view.MainGrid',
         iconCls: 'group',
         alias: 'widget.listGroupsModule',
         title: 'Listado grupos asignados a un m\xf3dulo',
         store: 'GroupsModule',
         columns: [{
         header: 'ID',
         filter: 'number',
         dataIndex: 'idgroupmodule'
         }, {
         header: 'Grupo',
         dataIndex: 'group',
         renderer: function (v) {
         return v.name;
         },
         flex: 3
         }, {
         header: 'Nivel de acceso',
         dataIndex: 'levelAccess',
         renderer: function (v) {
         return v.name;
         },
         flex: 3
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'edit',
         tooltip: 'Editar',
         icon: 'css/edit.png',
         stopSelection: false,
         iconCls: 'edit'
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'remove',
         tooltip: 'Eliminar',
         stopSelection: false,
         icon: 'css/remove.png',
         iconCls: 'remove'
         }]
         });
         
         Ext.define('susencargos.view.group.Applications', {
         extend: 'susencargos.view.DeprisaItemSelector',
         alias: 'widget.listApplicationsGroup',
         title: 'Listado aplicaciones del grupo',
         iconCls: 'apps',
         columns: [{
         header: 'ID',
         dataIndex: 'idapplication'
         }, {
         header: 'Nombre',
         dataIndex: 'name',
         flex: 3
         }],
         storeSource: 'NoApplicationsGroup',
         storeFinish: 'ApplicationsGroup'
         });
         
         Ext.define('susencargos.view.locker.FormChangePassword', {
         extend: 'Ext.window.Window',
         alias: 'widget.formChangePasswordCustomer',
         title: "Cambiar contrase\xf1a",
         iconCls: "edit",
         width: 600,
         modal: true,
         layout: "anchor",
         autoShow: true,
         items: [{
         xtype: "form",
         url: "ajax/save_object.php",
         defaults: {
         labelAlign: "right"
         },
         frame: true,
         items: [{
         xtype: 'hiddenfield',
         name: 'object',
         value: 'change_user_pass'
         }, {
         xtype: 'hiddenfield',
         name: 'id',
         value: '0'
         }, {
         xtype: "textfield",
         name: "pass",
         itemId: "pass",
         regex: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9_-]{8,})$/,
         regexText: "La contrase\xf1a debe tener n\xfameros y letras y m\xednimo 8 caracteres",
         vtype: "alphanum",
         value: "",
         allowBlank: false,
         inputType: "password",
         anchor: "90%",
         fieldLabel: "* Contrase\xf1a"
         }, {
         xtype: "textfield",
         name: "confirm",
         value: "",
         allowBlank: false,
         vtype: "password",
         initialPassField: "pass",
         inputType: "password",
         anchor: "90%",
         fieldLabel: "* Confirmaci\xf3n"
         }, {
         xtype: 'panel',
         html: '* Campos obligatorios',
         border: 0,
         padding: 10
         }],
         buttons: [{
         text: "Guardar",
         action: 'save',
         handler: function (o, p) {
         if (o.up("form").getForm().isValid()) {
         o.up("form").getForm().submit({
         waitMsg: "Guardando ...",
         success: function (q, r, u) {
         var s = Ext.JSON.decode(r.response.responseText);
         Ext.MessageBox.show({
         title: s.msg.title,
         msg: s.msg.body,
         buttons: Ext.Msg.OK,
         icon: Ext.Msg.INFO
         });
         o.up("window").close()
         },
         failure: function (q, r) {
         var s = Ext.JSON.decode(r.response.responseText);
         Ext.MessageBox.show({
         title: s.msg.title,
         msg: s.msg.body,
         buttons: Ext.Msg.OK,
         icon: Ext.Msg.ERROR
         });
         o.up("window").close()
         }
         })
         } else {
         Ext.MessageBox.show({
         title: "Error",
         msg: "Ingrese los datos correctos",
         buttons: Ext.Msg.OK,
         icon: Ext.Msg.ERROR
         })
         }
         }
         }, {
         text: "Cancelar",
         action: 'cancel'
         }]
         }]
         });
         
         Ext.define('susencargos.view.template.Grid', {
         extend: 'susencargos.view.MainGrid',
         iconCls: 'template',
         alias: 'widget.listTemplates',
         title: 'Listado de plantillas de correo',
         store: 'Template',
         columns: [{
         header: 'ID',
         filter: 'number',
         dataIndex: 'idtemplate'
         }, {
         header: 'Nombre',
         filter: 'string',
         dataIndex: 'name',
         flex: 1
         }, {
         header: 'Contenido',
         dataIndex: 'html',
         flex: 3
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'fields',
         tooltip: 'Campos',
         icon: 'css/fieldTemplate.png',
         iconCls: 'fieldTemplate',
         stopSelection: false
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'edit',
         tooltip: 'Editar',
         icon: 'css/edit.png',
         iconCls: 'edit',
         stopSelection: false
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'remove',
         tooltip: 'Eliminar',
         icon: 'css/remove.png',
         iconCls: 'remove',
         stopSelection: false
         }]
         });
         
         Ext.define('susencargos.view.template.Form', {
         extend: 'susencargos.view.MainForm',
         alias: 'widget.formTemplate',
         title: 'Editar plantilla de correo',
         object: 'templates',
         width: 800,
         height: 600,
         fields: [{
         xtype: 'hiddenfield',
         name: 'idtemplate',
         value: 0
         }, {
         xtype: 'textfield',
         name: 'name',
         value: '',
         allowBlank: false,
         anchor: '90%',
         fieldLabel: '* Nombre'
         }, {
         xtype: "tinymce",
         fieldLabel: '* Contenido',
         name: 'html',
         id: 'tinymce_f',
         anchor: '90%',
         height: 350
         }],
         buttons: [{
         text: 'Guardar',
         action: 'save'
         }, {
         text: 'Cancelar',
         action: 'cancel'
         }]
         });
         
         Ext.define('susencargos.view.template.FormField', {
         extend: 'susencargos.view.MainForm',
         alias: 'widget.formFieldTemplate',
         title: 'Editar campo',
         object: 'fields',
         fields: [{
         xtype: 'hiddenfield',
         name: 'idfield',
         value: 0
         }, {
         xtype: 'hiddenfield',
         name: 'idtemplate',
         value: 0
         }, {
         xtype: 'textfield',
         name: 'name',
         value: '',
         allowBlank: false,
         anchor: '90%',
         fieldLabel: '* Nombre'
         }],
         buttons: [{
         text: 'Guardar',
         action: 'save'
         }, {
         text: 'Cancelar',
         action: 'cancel'
         }]
         });
         
         Ext.define('susencargos.view.template.Fields', {
         extend: 'susencargos.view.MainGrid',
         iconCls: 'fieldTemplate',
         alias: 'widget.listFieldsTemplate',
         title: 'Listado de campos',
         store: 'FieldTemplate',
         columns: [{
         header: 'ID',
         filter: 'number',
         dataIndex: 'idfield'
         }, {
         header: 'Nombre',
         filter: 'string',
         dataIndex: 'name',
         flex: 3
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'edit',
         tooltip: 'Editar',
         icon: 'css/edit.png',
         iconCls: 'edit',
         stopSelection: false
         }, {
         xtype: 'actioncolumn',
         width: 20,
         action: 'remove',
         tooltip: 'Eliminar',
         icon: 'css/remove.png',
         iconCls: 'remove',
         stopSelection: false
         }]
         });
         */

        //<editor-fold defaultstate="collapsed" desc="View Genericas">
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
            buttonsIni: ['-', {
                    xtype: 'button',
                    text: 'Insertar',
                    iconCls: 'insert',
                    tooltip: 'Insertar',
                    action: 'insert'
                }, '-', {
                    xtype: 'button',
                    icon: 'css/clean.png',
                    text: 'Limpiar filtros',
                    tooltip: 'Limpiar filtros',
                    action: 'clean'
                }],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 25,
                displayInfo: true,
                items: []
            },
            viewConfig: {
                enableTextSelection: true
            },
            constructor: function (config) {
                this.bbar.store = this.store;
                this.bbar.items = this.buttonsIni.concat(this.buttonsAds);
                this.callParent(config)
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
                    url: 'update/save_object.php',
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
                this.callParent()
            }
        });

        Ext.define('susencargos.view.DeprisaItemSelector', {
            extend: 'Ext.window.Window',
            maximizable: true,
            modal: true,
            width: Ext.getBody().getViewSize().width * 0.8,
            height: 500,
            autoShow: true,
            layout: {
                type: 'hbox',
                align: 'stretch',
                padding: 5
            },
            defaults: {
                flex: 1
            },
            columns: [],
            storeSource: '',
            storeFinish: '',
            items: [{
                    xtype: 'grid',
                    title: 'No asignados',
                    id: 'gridSource',
                    multiSelect: true,
                    plugins: {
                        ptype: 'gridfilters',
                        menuFilterText: 'Filtros'
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        pageSize: 25,
                        displayInfo: true
                    },
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragGroup: 'source',
                            dropGroup: 'destination'
                        }
                    }
                }, {
                    xtype: 'grid',
                    id: 'gridDestination',
                    multiSelect: true,
                    title: 'Asignados',
                    plugins: {
                        ptype: 'gridfilters',
                        menuFilterText: 'Filtros'
                    },
                    store: 'GroupsUser',
                    bbar: {
                        xtype: 'pagingtoolbar',
                        pageSize: 25,
                        displayInfo: true
                    },
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            dragGroup: 'destination',
                            dropGroup: 'source'
                        }
                    }
                }],
            constructor: function (config) {
                this.items[0].columns = this.columns;
                this.items[0].store = this.storeSource;
                this.items[0].bbar.store = this.storeSource;
                this.items[1].columns = this.columns;
                this.items[1].store = this.storeFinish;
                this.items[1].bbar.store = this.storeFinish;
                this.callParent(config)
            }
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Aplicación">
        Ext.define('susencargos.view.application.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'apps',
            alias: 'widget.listApplications',
            title: 'Listado aplicaciones',
            store: 'Application',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idapplication'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'groups',
                    tooltip: 'Grupos',
                    icon: 'css/group.png',
                    stopSelection: false,
                    iconCls: 'group'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'modules',
                    tooltip: 'M\xf3dulos',
                    icon: 'css/module.png',
                    stopSelection: false,
                    iconCls: 'module'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    stopSelection: false,
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.application.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formApplication',
            title: 'Editar aplicaci\xf3n',
            object: 'apps',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idapplication',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
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
        //<editor-fold defaultstate="collapsed" desc="View Grupo">
        Ext.define('susencargos.view.group.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'group',
            alias: 'widget.listGroups',
            title: 'Listado grupos',
            store: 'Group',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idgroup'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Activo',
                    dataIndex: 'active',
                    filter: 'boolean',
                    renderer: function (value) {
                        if (value) {
                            return "Si";
                        } else {
                            return "No";
                        }
                    },
                    flex: 1
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'applications',
                    tooltip: 'Aplicaciones',
                    icon: 'css/apps.png',
                    stopSelection: false,
                    iconCls: 'apps'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'users',
                    tooltip: 'Usuarios',
                    icon: 'css/user.png',
                    stopSelection: false,
                    iconCls: 'user'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.group.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formGroup',
            title: 'Editar grupo',
            object: 'groups',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idgroup',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
                }, {
                    xtype: 'combo',
                    name: 'active',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Activo',
                    store: [[false, 'No'], [true, 'Si']],
                    queryMode: 'local',
                    forceSelection: true,
                    typeAHead: true
                }],
            buttons: [{
                    text: 'Guardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
        });

        Ext.define('susencargos.view.group.Users', {
            extend: 'susencargos.view.DeprisaItemSelector',
            iconCls: 'user',
            alias: 'widget.listUsersGroup',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'iduser'
                }, {
                    header: 'Login',
                    filter: 'string',
                    dataIndex: 'login',
                    flex: 3
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Activo',
                    dataIndex: 'active',
                    filter: 'boolean',
                    renderer: function (value) {
                        if (value) {
                            return "Si";
                        } else {
                            return "No";
                        }
                    },
                    flex: 1
                }],
            storeSource: 'NoUsersGroup',
            storeFinish: 'UsersGroup'
        });

        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Módulo">
        Ext.define('susencargos.view.application.Modules', {
            extend: 'Ext.tree.Panel',
            iconCls: 'module',
            plugins: {
                ptype: 'gridfilters',
                menuFilterText: 'Filtros'
            },
            alias: 'widget.listModules',
            title: 'Listado m\xf3dulos',
            layout: 'fit',
            store: 'ModuleTree',
            closable: true,
            displayField: 'name',
            rootVisible: false,
            useArrows: true,
            autoScroll: true,
            columns: [{
                    header: 'Nombre',
                    xtype: 'treecolumn',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Clase',
                    filter: 'string',
                    dataIndex: 'class',
                    flex: 2
                }, {
                    header: 'Script/Acci\xf3n',
                    filter: 'string',
                    dataIndex: 'script',
                    flex: 3
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'groups',
                    tooltip: 'Grupos',
                    icon: 'css/group.png',
                    stopSelection: false,
                    iconCls: 'group'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    stopSelection: false,
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }],
            bbar: {
                xtype: 'toolbar',
                items: [{
                        xtype: 'button',
                        text: 'Insertar',
                        iconCls: 'insert',
                        tooltip: 'Insertar',
                        action: 'insert'
                    }, '-', {
                        xtype: 'button',
                        icon: 'css/clean.png',
                        text: 'Limpiar filtros',
                        tooltip: 'Limpiar filtros',
                        action: 'clean'
                    }]
            }
        });

        Ext.define('susencargos.view.application.FormModule', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formModule',
            title: 'Editar m\xf3dulo',
            object: 'modules',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idmodule',
                    value: 0
                }, {
                    xtype: 'combo',
                    name: 'idparent',
                    emptyText: '- Nuevo m\xf3dulo -',
                    value: '',
                    anchor: '90%',
                    store: 'Module',
                    valueField: 'idmodule',
                    displayField: 'name',
                    fieldLabel: '* M\xf3dulo padre',
                    queryMode: 'local',
                    forceSelection: true,
                    typeAhead: true
                }, {
                    xtype: 'hiddenfield',
                    name: 'idapplication',
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
                    name: 'class',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Clase'
                }, {
                    xtype: 'textfield',
                    name: 'script',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Script/Acci\xf3n'
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
        //<editor-fold defaultstate="collapsed" desc="View Usuarios">
        Ext.define('susencargos.view.user.Grid', {
            extend: 'susencargos.view.MainGrid',
            alias: 'widget.listUsers',
            title: 'Listado usuarios',
            store: 'User',
            iconCls: 'user',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'iduser'
                }, {
                    header: 'Login',
                    filter: 'string',
                    dataIndex: 'login',
                    flex: 3
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Activo',
                    dataIndex: 'active',
                    filter: 'boolean',
                    renderer: function (value) {
                        if (value) {
                            return "Si"
                        } else {
                            return "No"
                        }
                    },
                    flex: 1
                }, {
                    header: 'Ultimo ingreso',
                    dataIndex: 'lastLogin',
                    filter: {
                        type: 'date',
                        fields: {lt: {text: 'Antes de'}, gt: {text: 'Depu\xe9s de '}, eq: {text: 'El d\xeda'}}, dateFormat: 'Y-m-d H:i:s'
                    },
                    flex: 1,
                    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
                }, {
                    header: 'Logeado',
                    dataIndex: 'logged',
                    filter: 'boolean',
                    renderer: function (value) {
                        if (value) {
                            return "Si";
                        } else {
                            return "No";
                        }
                    },
                    flex: 1
                }, {
                    header: 'Email',
                    filter: 'string',
                    dataIndex: 'email',
                    flex: 3
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'group',
                    tooltip: 'Grupos',
                    icon: 'css/group.png',
                    stopSelection: false,
                    iconCls: 'group'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    iconCls: 'remove',
                    stopSelection: false
                }]
        });

        Ext.define('susencargos.view.user.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formUser',
            title: 'Editar usuario',
            object: 'users',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'iduser',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'login',
                    vtype: "email",
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Login'
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
                }, {
                    xtype: 'combo',
                    name: 'active',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Activo',
                    store: [[false, 'No'], [true, 'Si']],
                    forceSelection: true,
                    queryMode: 'local',
                    typeAHead: true
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    value: '',
                    vtype: 'email',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Email'
                }],
            buttons: [{
                    text: 'Cambiar contrase\xf1a',
                    action: 'changePass'
                }, {
                    text: 'Guardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
        });

        Ext.define('susencargos.view.user.Groups', {
            extend: 'susencargos.view.DeprisaItemSelector',
            alias: 'widget.listGroupsUser',
            iconCls: 'group',
            storeSource: 'NoGroupsUser',
            storeFinish: 'GroupsUser',
            columns: [{
                    header: 'ID',
                    dataIndex: 'idgroup'
                }, {
                    header: 'Nombre',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Activo',
                    dataIndex: 'active',
                    renderer: function (value) {
                        if (value) {
                            return "Si";
                        } else {
                            return "No";
                        }
                    },
                    flex: 1
                }]
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Clientes">
        Ext.define('susencargos.view.customer.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'customer',
            alias: 'widget.listCustomers',
            title: 'Listado clientes',
            store: 'Customer',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idcustomer'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'NIT',
                    filter: 'string',
                    dataIndex: 'taxid',
                    flex: 2
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
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.customer.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formCustomer',
            title: 'Editar cliente',
            object: 'customers',
            fields: [{
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
                    name: 'taxid',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* NIT'
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
        //<editor-fold defaultstate="collapsed" desc="View Zonas">
        Ext.define('susencargos.view.zone.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'zone',
            alias: 'widget.listZones',
            title: 'Listado rutas',
            store: 'Zone',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idzone'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.zone.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formZone',
            title: 'Editar ruta',
            object: 'zones',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idzone',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
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
        //<editor-fold defaultstate="collapsed" desc="View Ciudades">
        Ext.define('susencargos.view.city.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'city',
            alias: 'widget.listCities',
            title: 'Listado ciudades',
            store: 'City',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idcity'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'Zona',
                    dataIndex: 'zone',
                    flex: 2,
                    renderer: function (value) {
                        return value.name;
                    }
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.city.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formCity',
            title: 'Editar ciudad',
            object: 'cities',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idcity',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Ruta',
                    store: 'Zone',
                    typeAhead: true,
                    forceSelection: true,
                    allowBlank: false,
                    valueField: 'idzone',
                    displayField: 'name',
                    name: 'idzone',
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
        //<editor-fold defaultstate="collapsed" desc="View Estados remesa">
        Ext.define('susencargos.view.state_tracking.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'stateTracking',
            alias: 'widget.listStatesTracking',
            title: 'Listado estados de remesa',
            store: 'StateTracking',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idstatetracking'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    stopSelection: false,
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.state_tracking.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formStateTracking',
            title: 'Editar estado de remesa',
            object: 'statesTracking',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idstatetracking',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
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
        //<editor-fold defaultstate="collapsed" desc="View Remesas">
        Ext.define('susencargos.view.package.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'package',
            alias: 'widget.listPackages',
            title: 'Listado remesas',
            store: 'Package',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idpackage',
                    felx: 1
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
                    header: 'Cliente',
                    dataIndex: 'customer',
                    flex: 2,
                    renderer: function(value){
                        return value.name;
                    }
                }, {
                    header: 'Origen',
                    dataIndex: 'citySource',
                    flex: 2,
                    renderer: function(value){
                        return value.name;
                    }
                }, {
                    header: 'Destino',
                    dataIndex: 'cityDestination',
                    flex: 2,
                    renderer: function(value){
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
                    header: 'Tipo de pago',
                    dataIndex: 'payType',
                    flex: 2,
                    renderer: function(value){
                        return value.name;
                    }
                }, {
                    header: 'Estado remesa',
                    dataIndex: 'stateTracking',
                    flex: 2,
                    renderer: function(value){
                        return value.name;
                    }
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    stopSelection: false,
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.package.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formPackage',
            title: 'Editar remesa',
            object: 'packages',
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
                            xtype: 'combo',
                            fieldLabel: '* Remitente',
                            store: 'Customer',
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            valueField: 'idcustomer',
                            displayField: 'name',
                            name: 'idcustomer',
                            anchor: '90%',
                            queryMode: 'local'
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
                            fieldLabel: '* Ciudad origen',
                            store: 'City',
                            typeAhead: true,
                            forceSelection: true,
                            allowBlank: false,
                            valueField: 'idcity',
                            displayField: 'name',
                            name: 'idcitysource',
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
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Tipos de pago">
        Ext.define('susencargos.view.zone.Grid', {
            extend: 'susencargos.view.MainGrid',
            iconCls: 'payType',
            alias: 'widget.listPayTypes',
            title: 'Listado de tipos de pago',
            store: 'PayType',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idpaytype'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
                }]
        });

        Ext.define('susencargos.view.zone.Form', {
            extend: 'susencargos.view.MainForm',
            alias: 'widget.formPayType',
            title: 'Editar tipo de pago',
            object: 'payTypes',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idpaytype',
                    value: 0
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Nombre'
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
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                    tbar: {
                        defaults: {
                            scale: 'medium'
                        },
                        loader: {
                            url: 'menu.php',
                            renderer: 'component',
                            autoLoad: true
                        }
                    },
                    region: 'center',
                    autoScroll: true,
                    id: 'contenido',
                    tabPosition: 'bottom',
                    xtype: 'tabpanel',
                    activeTab: 0,
                    items: [{
                            xtype: 'panel',
                            title: 'Bienvenidos',
                            loader: {
                                autoLoad: true,
                                url: 'home.php'
                            }
                        }]
                }, {
                    region: 'south',
                    xtype: 'panel',
                    html: '<b>Susencargos.com.co &copy;</b>'
                }]
        });
        //</editor-fold>
    }
});
//</editor-fold>
