//<editor-fold defaultstate="collapsed" desc="Models">
﻿Ext.define('apps.model.Application', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idapplication',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('apps.model.Group', {
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

Ext.define('apps.model.User', {
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

Ext.define('apps.model.Module', {
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
            reference: 'apps.model.Application'
        }],
    idProperty: 'idmodule'
});

Ext.define('apps.model.Money', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idmoney',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'iso',
            type: 'string'
        }]
});

Ext.define('apps.model.LevelAccess', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idlevelaccess',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }]
});

Ext.define('apps.model.GroupModule', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idgroupmodule',
            type: 'int'
        }, {
            name: 'group',
            reference: 'apps.model.Group'
        }, {
            name: 'module',
            reference: 'apps.model.Module'
        }, {
            name: 'levelAccess',
            reference: 'apps.model.LevelAccess'
        }]
});

Ext.define('apps.model.TemplateMail', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idtemplatemail',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'html',
            type: 'string'
        }]
});

Ext.define('apps.model.ChangeMoney', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idchangemoney',
            type: 'int'
        }, {
            name: 'change',
            type: 'float'
        }, {
            name: 'year',
            type: 'int'
        }, {
            name: 'money',
            reference: 'apps.model.Money'
        }]
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="MainStoreRemote">
Ext.define("apps.store.MainStoreRemote", {
    extend: "Ext.data.Store",
    remoteSort: true,
    remoteFilter: true,
    object: "",
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

Ext.define("apps.store.MainStoreLocal", {
    extend: "Ext.data.Store",
    object: "",
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
        'menu menuitem[action=moneys]': {click: 'moneys'},
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
    moneys: function () {
        this.openGrid('listMoneys');
    },
    templates: function () {
        this.openGrid('listTemplates');
    },
    templatesMail: function () {
        this.openGrid('listTemplatesMail');
    },
    levelsAccess: function () {
        this.openGrid('listLevelsAccess');
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
        Ext.getStore('ModuleL').getProxy().setExtraParam('idapplication', v.getStore().getAt(c).get('idapplication'));
        Ext.getStore('ModuleTree').getProxy().setExtraParam('idapplication', v.getStore().getAt(c).get('idapplication'));
        Ext.getStore('ModuleTree').load();
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.listModules') {
                opened = true;
                panel = n;
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
    },
    insert: function (b, e) {
        Ext.widget('formApplication').down('form').loadRecord(Ext.create('apps.model.Application'));
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formApplication').down('form').loadRecord(v.getStore().getAt(c));
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
            });
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
        });
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
        Ext.getStore('ModuleL').load();
        var form = Ext.widget('formModule');
        form.down('form').loadRecord(Ext.create('apps.model.Module'));
        form.down('form').getForm().findField('idapplication').setValue(Ext.getStore('Module').getProxy().extraParams.idapplication);
    },
    cleanFiltersModules: function (b, e) {
        b.up('treepanel').filters.clearFilters();
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
            });
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
        });
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
                panel = n;
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
        Ext.getStore('GroupL').load({
            callback: function () {
                Ext.getStore('LevelAccessL').load({
                    callback: function () {
                        var form = Ext.widget('formGroupModule');
                        form.down('form').loadRecord(Ext.create('apps.model.GroupModule'));
                        form.down('form').getForm().findField('idmodule').setValue(Ext.getStore('GroupsModule').getProxy().extraParams.idmodule);
                    }
                });
            }
        });
    },
    cleanFiltersGroupsModule: function (b, e) {
        b.up('treepanel').filters.clearFilters();
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
            });
        }
    },
    editDblGroupModule: function (g, r) {
        Ext.getStore('GroupL').load({
            callback: function () {
                Ext.getStore('LevelAccessL').load({
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
        Ext.getStore('GroupL').load({
            callback: function () {
                Ext.getStore('LevelAccessL').load({
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
        });
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
        'listApplicationsGroup grid#gridSource dataview': {drop: 'removeApplication'}
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
        Ext.widget('formGroup').down('form').loadRecord(Ext.create('apps.model.Group'));
    },
    cleanFilters: function (b, e) {
        Ext.getStore('Group').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formGroup').down('form').loadRecord(v.getStore().getAt(c));
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
            });
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
                                Ext.getStore('Group').load();
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
        });
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
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listMoneys button[action=insert]': {click: 'insert'},
        'listMoneys button[action=clean]': {click: 'cleanFilters'},
        'listMoneys': {itemdblclick: 'editDbl'},
        'listMoneys actioncolumn[action=changesMoney]': {click: 'changesMoney'},
        'listMoneys actioncolumn[action=edit]': {click: 'edit'},
        'listMoneys actioncolumn[action=remove]': {click: 'remove'},
        'formMoney button[action=cancel]': {click: 'cancel'},
        'formMoney button[action=save]': {click: 'save'},
        'listChangesMoney button[action=insert]': {click: 'insertChangeMoney'},
        'listChangesMoney button[action=clean]': {click: 'cleanFilters'},
        'listChangesMoney': {itemdblclick: 'editDblChangeMoney'},
        'listChangesMoney actioncolumn[action=edit]': {click: 'editChangeMoney'},
        'listChangesMoney actioncolumn[action=remove]': {click: 'removeChangeMoney'},
        'formChangeMoney button[action=cancel]': {click: 'cancel'},
        'formChangeMoney button[action=save]': {click: 'saveChangeMoney'}
    },
    insert: function (b, e) {
        Ext.widget('formMoney').down('form').loadRecord(Ext.create('apps.model.Money'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    changesMoney: function (v, r, c, i, e) {
        Ext.getStore('ChangeMoney').getProxy().setExtraParam('idmoney', v.getStore().getAt(c).get('idmoney'));
        Ext.getStore('ChangeMoney').load();
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.listChangesMoney') {
                opened = true;
                panel = n;
            }
        });
        if (!opened) {
            panel = Ext.widget('listChangesMoney');
            content.add(panel);
        }
        panel.setTitle('Listado tasa de cambio de la moneda ' + v.getStore().getAt(c).get('name'));
        Ext.getCmp('contenido').setActiveTab(panel);
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formMoney');
        form.down('form').loadRecord(v.getStore().getAt(c));
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formMoney');
        form.down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idmoney').getValue());
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
                            Ext.getStore('Money').load();
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
                        id: v.getStore().getAt(c).get('idmoney'),
                        object: 'moneys'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Money').load();
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
    },
    insertChangeMoney: function (b, e) {
        var form = Ext.widget('formChangeMoney');
        form.down('form').loadRecord(Ext.create('apps.model.ChangeMoney'));
        form.down('form').getForm().findField('idmoney').setValue(Ext.getStore('ChangeMoney').getProxy().extraParams.idmoney);
    },
    editDblChangeMoney: function (g, r) {
        var form = Ext.widget('formChangeMoney');
        form.down('form').getForm().loadRecord(r);
        form.down('form').getForm().findField('idmoney').setValue(Ext.getStore('ChangeMoney').getProxy().extraParams.idmoney);
    },
    editChangeMoney: function (v, r, c, i, e) {
        var form = Ext.widget('formChangeMoney');
        form.down('form').getForm().loadRecord(v.getStore().getAt(c));
        form.down('form').getForm().findField('idmoney').setValue(Ext.getStore('ChangeMoney').getProxy().extraParams.idmoney);
    },
    saveChangeMoney: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idchangemoney').getValue());
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
                            Ext.getStore('ChangeMoney').load();
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
    removeChangeMoney: function (v, c, dr, dp) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.php',
                    params: {
                        id: v.getSelectionModel().getLastSelected().get('idchangemoney'),
                        object: 'changesMoney'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('ChangeMoney').load();
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
        'listTemplatesMail button[action=insert]': {click: 'insert'},
        'listTemplatesMail button[action=clean]': {click: 'cleanFilters'},
        'listTemplatesMail': {itemdblclick: 'editDbl'},
        'listTemplatesMail actioncolumn[action=edit]': {click: 'edit'},
        'listTemplatesMail actioncolumn[action=remove]': {click: 'remove'},
        'formTemplateMail button[action=cancel]': {click: 'cancel'},
        'formTemplateMail button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formTemplateMail').down('form').loadRecord(Ext.create('apps.model.TemplateMail'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('TemplateMail').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formTemplateMail').down('form').loadRecord(v.getStore().getAt(c));
    },
    editDbl: function (g, r) {
        Ext.widget('formTemplateMail').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idtemplatemail').getValue());
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
                            Ext.getStore('TemplateMail').load();
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
                        id: v.getStore().getAt(c).get('idtemplatemail'),
                        object: 'templatesMail'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('TemplateMail').load();
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
        "listGroupsUser grid#gridSource dataview": {drop: 'removeGroup'}
    },
    group: function (b, f, h, d, g) {
        Ext.getStore("GroupsUser").getProxy().setExtraParam("iduser", b.getStore().getAt(h).get("iduser"));
        Ext.getStore("GroupsUser").load();
        Ext.getStore("NoGroupsUser").getProxy().setExtraParam("iduser", b.getStore().getAt(h).get("iduser"));
        Ext.getStore("NoGroupsUser").load();
        var a = Ext.widget("listGroupsUser");
        a.setTitle("Listado grupos del usuario " + b.getStore().getAt(h).get("name"))
    },
    insert: function (a, c) {
        Ext.widget("formUser").down("form").loadRecord(Ext.create("apps.model.User"))
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
    },
    cancel: function (a, c) {
        a.up("window").close();
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formUser").down("form").loadRecord(a.getStore().getAt(g));
    },
    editDbl: function (b, a) {
        Ext.widget("formUser").down("form").loadRecord(a);
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("iduser").getValue());
            a.up("form").getForm().submit({waitMsg: "Guardando ...", success: function (b, e, g) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () {
                            Ext.getStore("User").load();
                        }});
                    a.up("window").close()
                }, failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                    a.up("window").close();
                }
            });
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
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
                                Ext.getStore("User").load();
                            }
                        });
                    },
                    failed: function (e) {
                        var p = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: p.response.result.msg.title,
                            msg: p.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                });
            }
        });
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
                                    b.up("window").close();
                                },
                                failure: function (e, f) {
                                    var g = Ext.JSON.decode(f.response.responseText);
                                    Ext.MessageBox.show({
                                        title: g.msg.title,
                                        msg: g.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                    b.up("window").close();
                                }
                            });
                        } else {
                            Ext.MessageBox.show({
                                title: "Error",
                                msg: "Ingrese los datos correctos",
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    }
                }, {
                    text: "Cancelar",
                    handler: function (b, d) {
                        b.up("window").close();
                    }
                }]
        });
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
                    });
                },
                failure: function (h, i, k) {
                    var j = Ext.JSON.decode(h.responseText);
                    Ext.MessageBox.show({
                        title: j.msg.title,
                        msg: j.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
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
                    });
                },
                failure: function (h, i, k) {
                    var j = Ext.JSON.decode(h.responseText);
                    Ext.MessageBox.show({
                        title: j.msg.title,
                        msg: j.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        });
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
                                window.location = "change_pass.php?" + f.link;
                            }
                        }
                    });
                },
                failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
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
                            window.location = "cover.php";
                        }
                    });
                },
                failure: function (b, e) {
                    var f = Ext.JSON.decode(e.response.responseText);
                    Ext.MessageBox.show({
                        title: f.msg.title,
                        msg: f.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listLevelsAccess button[action=insert]': {click: 'insert'},
        'listLevelsAccess button[action=clean]': {click: 'cleanFilters'},
        'listLevelsAccess': {itemdblclick: 'editDbl'},
        'listLevelsAccess actioncolumn[action=edit]': {click: 'edit'},
        'listLevelsAccess actioncolumn[action=remove]': {click: 'remove'},
        'formLevelAccess button[action=cancel]': {click: 'cancel'},
        'formLevelAccess button[action=save]': {click: 'save'}
    },
    insert: function (b, e) {
        Ext.widget('formLevelAccess').down('form').loadRecord(Ext.create('apps.model.LevelAccess'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formLevelAccess');
        form.down('form').loadRecord(v.getStore().getAt(c));
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formLevelAccess');
        form.down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idlevelaccess').getValue());
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
                            Ext.getStore('LevelAccess').load();
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
                        id: v.getStore().getAt(c).get('idlevelaccess'),
                        object: 'levelsAccess'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('LevelAccess').load();
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
    name: 'apps',
    launch: function () {
        //<editor-fold defaultstate="collapsed" desc="Stores">
        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'Application',
            model: 'apps.model.Application',
            object: 'apps'
        });

        Ext.create('apps.store.MainStoreLocal', {
            storeId: 'ApplicationL',
            model: 'apps.model.Application',
            object: 'apps'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'Group',
            model: 'apps.model.Group',
            object: 'groups'
        });

        Ext.create('apps.store.MainStoreLocal', {
            storeId: 'GroupL',
            model: 'apps.model.Group',
            object: 'groups'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'Module',
            model: 'apps.model.Module',
            object: 'modules'
        });

        Ext.create('apps.store.MainStoreLocal', {
            storeId: 'ModuleL',
            model: 'apps.model.Module',
            object: 'modules'
        });

        Ext.create('Ext.data.TreeStore', {
            storeId: 'ModuleTree',
            model: 'apps.model.Module',
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
                        });
                    }
                }
            }
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'User',
            model: 'apps.model.User',
            object: 'users'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'Money',
            model: 'apps.model.Money',
            object: 'moneys'
        });

        Ext.create('apps.store.MainStoreLocal', {
            storeId: 'MoneyL',
            model: 'apps.model.Money',
            object: 'moneys'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'GroupsUser',
            model: 'apps.model.Group',
            object: 'groupsUser'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'NoGroupsUser',
            model: 'apps.model.Group',
            object: 'noGroupsUser'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'NoUsersGroup',
            model: 'apps.model.User',
            object: 'noUsersGroup'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'UsersGroup',
            model: 'apps.model.User',
            object: 'usersGroup'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'ApplicationsGroup',
            model: 'apps.model.Application',
            object: 'applicationsGroup'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'GroupsApplication',
            model: 'apps.model.Group',
            object: 'groupsApplication'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'NoApplicationsGroup',
            model: 'apps.model.Application',
            object: 'noApplicationsGroup'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'NoGroupsApplication',
            model: 'apps.model.Group',
            object: 'noGroupsApplication'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'LevelAccess',
            model: 'apps.model.LevelAccess',
            object: 'levelsAccess'
        });

        Ext.create('apps.store.MainStoreLocal', {
            storeId: 'LevelAccessL',
            model: 'apps.model.LevelAccess',
            object: 'levelsAccess'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'GroupsModule',
            model: 'apps.model.GroupModule',
            object: 'groupsModule'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'TemplateMail',
            model: 'apps.model.TemplateMail',
            object: 'templatesMail'
        });

        Ext.create('apps.store.MainStoreRemote', {
            storeId: 'ChangeMoney',
            model: 'apps.model.ChangeMoney',
            object: 'changesMoney'
        });
        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="View Genericas">
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

        Ext.define('apps.view.MainForm', {
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

        Ext.define('apps.view.MainItemSelector', {
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
        Ext.define('apps.view.application.Grid', {
            extend: 'apps.view.MainGrid',
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

        Ext.define('apps.view.application.Form', {
            extend: 'apps.view.MainForm',
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

        Ext.define('apps.view.application.Groups', {
            extend: 'apps.view.MainItemSelector',
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

        Ext.define('apps.view.application.FormGroupModule', {
            extend: 'apps.view.MainForm',
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
                    store: 'GroupL',
                    valueField: 'idgroup',
                    displayField: 'name',
                    allowBlank: false,
                    autoLoadOnValue: true,
                    fieldLabel: '* Grupo',
                    queryMode: 'local',
                    anchor: '90%',
                    typeAhead: true,
                    forceSelection: true
                }, {
                    xtype: 'combo',
                    name: 'idlevelaccess',
                    value: '',
                    store: 'LevelAccessL',
                    valueField: 'idlevelaccess',
                    autoLoadOnValue: true,
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

        Ext.define('apps.view.application.GroupsModule', {
            extend: 'apps.view.MainGrid',
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
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Grupo">
        Ext.define('apps.view.group.Grid', {
            extend: 'apps.view.MainGrid',
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

        Ext.define('apps.view.group.Form', {
            extend: 'apps.view.MainForm',
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
                    autoLoadOnValue: true,
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

        Ext.define('apps.view.group.Users', {
            extend: 'apps.view.MainItemSelector',
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

        Ext.define('apps.view.group.Applications', {
            extend: 'apps.view.MainItemSelector',
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
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Módulo">
        Ext.define('apps.view.application.Modules', {
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

        Ext.define('apps.view.application.FormModule', {
            extend: 'apps.view.MainForm',
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
                    store: 'ModuleL',
                    valueField: 'idmodule',
                    autoLoadOnValue: true,
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
        Ext.define('apps.view.user.Grid', {
            extend: 'apps.view.MainGrid',
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

        Ext.define('apps.view.user.Form', {
            extend: 'apps.view.MainForm',
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
                    autoLoadOnValue: true,
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

        Ext.define('apps.view.user.Groups', {
            extend: 'apps.view.MainItemSelector',
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
        //<editor-fold defaultstate="collapsed" desc="View Monedas">
        Ext.define('apps.view.money.Grid', {
            extend: 'apps.view.MainGrid',
            iconCls: 'money',
            alias: 'widget.listMoneys',
            title: 'Listado monedas',
            store: 'Money',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idmoney'
                }, {
                    header: 'Nombre',
                    filter: 'string',
                    dataIndex: 'name',
                    flex: 3
                }, {
                    header: 'ISO',
                    filter: 'string',
                    dataIndex: 'iso',
                    flex: 2
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'changesMoney',
                    tooltip: 'Tasa de cambio',
                    icon: 'css/changesMoney.png',
                    stopSelection: false,
                    iconCls: 'changesMoney'
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

        Ext.define('apps.view.money.Form', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formMoney',
            title: 'Editar moneda',
            object: 'moneys',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idmoney',
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
                    name: 'iso',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Código ISO'
                }],
            buttons: [{
                    text: 'Guardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
        });
        
        Ext.define('apps.view.money.ChangesMoney', {
            extend: 'apps.view.MainGrid',
            iconCls: 'changesMoney',
            plugins: {
                ptype: 'gridfilters',
                menuFilterText: 'Filtros'
            },
            alias: 'widget.listChangesMoney',
            title: 'Listado tasa de cambio',
            layout: 'fit',
            store: 'ChangeMoney',
            closable: true,
            displayField: 'name',
            rootVisible: false,
            useArrows: true,
            autoScroll: true,
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idchangemoney'
                }, {
                    header: 'Tasa',
                    filter: 'number',
                    dataIndex: 'change',
                    flex: 2
                }, {
                    header: 'Año',
                    filter: 'number',
                    dataIndex: 'year',
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

        Ext.define('apps.view.money.FormChangeMoney', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formChangeMoney',
            title: 'Editar tasa de cambio',
            object: 'changesMoney',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idchangemoney',
                    value: 0
                }, {
                    xtype: 'hiddenfield',
                    name: 'idmoney',
                    value: 0
                }, {
                    xtype: 'numberfield',
                    name: 'change',
                    value: '',
                    allowBlank: false,
                    hideTrigger: true,
                    anchor: '90%',
                    fieldLabel: '* Tasa de cambio'
                }, {
                    xtype: 'numberfield',
                    name: 'year',
                    value: '',
                    hideTrigger: true,
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Año'
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
        //<editor-fold defaultstate="collapsed" desc="View Niveles de acceso">
        Ext.define('apps.view.levelAccess.Grid', {
            extend: 'apps.view.MainGrid',
            iconCls: 'levelAccess',
            alias: 'widget.listLevelsAccess',
            title: 'Listado de niveles de acceso',
            store: 'LevelAccess',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idlevelaccess'
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

        Ext.define('apps.view.levelAccess.Form', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formLevelAccess',
            title: 'Editar nivel de acceso',
            object: 'levelsAccess',
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idlevelaccess',
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
        //<editor-fold defaultstate="collapsed" desc="View Plantillas de correo">
        Ext.define('apps.view.templateMail.Grid', {
            extend: 'apps.view.MainGrid',
            iconCls: 'template',
            alias: 'widget.listTemplatesMail',
            title: 'Listado de plantillas de correo',
            store: 'TemplateMail',
            columns: [{
                    header: 'ID',
                    filter: 'number',
                    dataIndex: 'idtemplatemail'
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

        Ext.define('apps.view.templateMail.Form', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formTemplateMail',
            title: 'Editar plantilla de correo',
            object: 'templatesMail',
            width: 800,
            height: 600,
            fields: [{
                    xtype: 'hiddenfield',
                    name: 'idtemplatemail',
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
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Planilla de vuelo">
        Ext.define('apps.view.flightManifest.Form', {
            extend: 'apps.view.MainForm',
            alias: 'widget.formFlightManifest',
            title: 'Seleccionar fecha de planilla de vuelo',
            fields: [{
                    xtype: 'datefield',
                    name: 'date',
                    value: '',
                    allowBlank: false,
                    anchor: '90%',
                    fieldLabel: '* Fecha del envío',
                    format: 'Y-m-d'
                }, {
                    xtype: 'tagfield',
                    name: 'citiesSource',
                    value: '',
                    anchor: '90%',
                    fieldLabel: 'Ciudades origen',
                    store: 'CityL',
                    typeAhead: true,
                    forceSelection: true,
                    valueField: 'idcity',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Seleccionar destino',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    items: [{
                            boxLabel: 'Por municipios',
                            name: 'destinationBy',
                            checked: true,
                            id: 'fCities',
                            handler: function(b){
                                b.up('form').getForm().findField('citiesDestination').setVisible(false);
                                b.up('form').getForm().findField('zones').setVisible(true);
                            }
                        }, {
                            boxLabel: 'Por rutas',
                            name: 'destinationBy',
                            id: 'fZones',
                            handler: function(b){
                                b.up('form').getForm().findField('citiesDestination').setVisible(true);
                                b.up('form').getForm().findField('zones').setVisible(false);
                            }
                        }]
                }, {
                    xtype: 'tagfield',
                    name: 'citiesDestination',
                    value: '',
                    anchor: '90%',
                    fieldLabel: 'Ciudades destino',
                    store: 'CityL',
                    typeAhead: true,
                    forceSelection: true,
                    valueField: 'idcity',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'tagfield',
                    name: 'zones',
                    value: '',
                    hidden: true,
                    anchor: '90%',
                    fieldLabel: 'Rutas',
                    store: 'ZoneL',
                    typeAhead: true,
                    forceSelection: true,
                    valueField: 'idzone',
                    displayField: 'name',
                    queryMode: 'local'
                }],
            buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
        });
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="View Viewport principal">
        Ext.create('Ext.container.Viewport', {layout: 'border',
            items: [{
                    tbar: {defaults: {
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
