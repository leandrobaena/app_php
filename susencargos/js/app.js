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

Ext.define('susencargos.model.LevelAccess', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idlevelaccess',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
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
//</editor-fold>

Ext.define("susencargos.store.DeprisaStore", {
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
                })
            }
        }
    }
});

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
        'listLevelsAccess button[action=insert]': {click: 'insert'},
        'listLevelsAccess button[action=clean]': {click: 'cleanFilters'},
        'listLevelsAccess': {itemdblclick: 'editDbl'},
        'listLevelsAccess actioncolumn[action=edit]': {click: 'edit'},
        'listLevelsAccess actioncolumn[action=remove]': {click: 'remove'},
        'formLevelAccess button[action=cancel]': {click: 'cancel'},
        'formLevelAccess button[action=save]': {click: 'save'}
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    insert: function (b, e) {
        Ext.widget('formLevelAccess').down('form').loadRecord(Ext.create('susencargos.model.LevelAccess'));
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formLevelAccess').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formLevelAccess').down('form').loadRecord(r);
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
            })
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
                                Ext.getStore('LevelAccess').load()
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
        /*Administración*/
        'menu menuitem[action=users]': {click: 'users'},
        'menu menuitem[action=groups]': {click: 'groups'},
        'menu menuitem[action=apps]': {click: 'apps'},
        'menu menuitem[action=levelsAccess]': {click: 'levelsAccess'},
        'menu menuitem[action=templates]': {click: 'templates'},
        'menu menuitem[action=statesTracking]': {click: 'statesTracking'},
        /*Operaciones*/
        'menu menuitem[action=enterPackage]': {click: 'enterPackage'},
        'menu menuitem[action=picking]': {click: 'listPackagesPicking'},
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
        this.openGrid('listGroups')
    },
    apps: function () {
        this.openGrid('listApplications')
    },
    levelsAccess: function () {
        this.openGrid('listLevelsAccess')
    },
    typesLocker: function () {
        this.openGrid('listTypesLocker')
    },
    typesID: function () {
        this.openGrid('listTypesID')
    },
    moneys: function () {
        this.openGrid('listMoneys')
    },
    measuringsSystem: function () {
        this.openGrid('listMeasuringsSystem')
    },
    countries: function () {
        this.openGrid('listCountries')
    },
    occupations: function () {
        this.openGrid('listOccupations')
    },
    economySectors: function () {
        this.openGrid('listEconomySectors')
    },
    secretQuestions: function () {
        this.openGrid('listSecretQuestions')
    },
    infoMethods: function () {
        this.openGrid('listInfoMethods')
    },
    typesPackage: function () {
        this.openGrid('listTypesPackage')
    },
    templates: function () {
        this.openGrid('listTemplates')
    },
    lockers: function () {
        this.openGrid('listLockers')
    },
    rejectionReasons: function () {
        this.openGrid('listRejectionReasons')
    },
    statesTracking: function () {
        this.openGrid('listStatesTracking')
    },
    groupsTracking: function () {
        this.openGrid('listGroupsTracking')
    },
    deliveryCompanies: function () {
        this.openGrid('listDeliveryCompanies')
    },
    wareHouses: function () {
        this.openGrid('listWareHouses')
    },
    products: function () {
        this.openGrid('listProducts')
    },
    listCustomers: function () {
        this.openGrid('listListCustomers')
    },
    payments: function () {
        this.openGrid('listPayments')
    },
    typesResource: function () {
        this.openGrid('listTypesResource')
    },
    resources: function () {
        this.openGrid('listResources')
    },
    pages: function () {
        this.openGrid('listPages')
    },
    enterPackage: function () {
        Ext.MessageBox.prompt(
                'Tracking No.',
                'Ingrese el tracking al que se le desea hacer el ingreso',
                function (b, t, opt) {
                    if (b == "ok" && t != "") {
                        if (t.substr(0, 8) == "42033126" && t.length > 28) {
                            t = t.substr(8, t.length);
                        }
                        Ext.Ajax.request({
                            url: 'stores/list_objects.php',
                            method: 'get',
                            params: {
                                tracking: t,
                                object: 'packageByTracking'
                            },
                            success: function (response) {
                                var d = Ext.JSON.decode(response.responseText);
                                if (d.total == 0) {
                                    Ext.MessageBox.show({
                                        title: 'Error',
                                        msg: 'No es posible ingresar este tracking ya que no se encuentra como recibido',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                } else {
                                    Ext.getStore('Payment').load({
                                        callback: function () {
                                            Ext.getStore('TypeUbication').load({
                                                callback: function () {
                                                    Ext.getStore('Provide').load({
                                                        callback: function () {
                                                            Ext.getStore('TypePackage').load({
                                                                start: 0,
                                                                limit: 100,
                                                                callback: function () {
                                                                    Ext.getStore('Item').getProxy().setExtraParam('idpackage', d.data[0].idpackage);
                                                                    Ext.getStore('Item').load({
                                                                        callback: function () {
                                                                            var form = Ext.widget('formEnterPackage');
                                                                            var _package = Ext.create('susencargos.model.Package', {
                                                                                idpackage: d.data[0].idpackage,
                                                                                locker: d.data[0].locker,
                                                                                product: d.data[0].product,
                                                                                statePackage: d.data[0].statePackage,
                                                                                typePackage: d.data[0].typePackage,
                                                                                cityOrigin: d.data[0].cityOrigin,
                                                                                description: d.data[0].description,
                                                                                tracking: d.data[0].tracking,
                                                                                provide: d.data[0].provide,
                                                                                deliveryCompany: d.data[0].deliveryCompany,
                                                                                weight: d.data[0].weight,
                                                                                lenght: d.data[0].lenght,
                                                                                height: d.data[0].height,
                                                                                width: d.data[0].width,
                                                                                declaredValue: d.data[0].declaredValue,
                                                                                datePrealert: d.data[0].datePrealert,
                                                                                dateReceive: d.data[0].dateReceive,
                                                                                userReceive: d.data[0].userReceive,
                                                                                dateEnter: d.data[0].dateEnter,
                                                                                userEnter: d.data[0].userEnter,
                                                                                dateAuthorization: d.data[0].dateAuthorization,
                                                                                weightVolumen: d.data[0].weightVolumen,
                                                                                observations: d.data[0].observations,
                                                                                consolidate: d.data[0].consolidate,
                                                                                autodispatch: d.data[0].autodispatch,
                                                                                payment: d.data[0].payment
                                                                            });
                                                                            form.down('form').loadRecord(_package);
                                                                            form.down('form').getForm().findField('idlocker').setReadOnly(_package.get('locker').idlocker != 0);
                                                                            form.down('form').getForm().findField('prealerted').setValue(_package.get('locker').idlocker != 0);
                                                                            form.down('form').getForm().findField('idcityorigin').setValue(_package.get('cityOrigin').idcity);
                                                                            form.down('form').getForm().findField('iddeliverycompany').setValue(_package.get('deliveryCompany').iddeliverycompany);
                                                                            form.down('form').getForm().findField('idpayment').setValue(_package.get('payment').idpayment);
                                                                            form.down('form').getForm().findField('idpayment').setReadOnly(true);
                                                                            form.down('form').getForm().findField('provide').setValue(_package.get('provide').idprovide);
                                                                            form.down('form').getForm().findField('provide').setReadOnly(_package.get('locker').idlocker != 0);
                                                                            form.down('form').getForm().findField('idproduct').setValue(_package.get('product').idproduct);
                                                                            form.down('form').getForm().findField('idlocker').setValue(_package.get('locker').idlocker);
                                                                            form.down('form').getForm().findField('idtypepackage').setValue(_package.get('typePackage').idtypepackage);
                                                                            form.down('form').getForm().findField('autodispatch').setReadOnly(true);
                                                                            if (Ext.util.Cookies.get('lastTypeUbication') != null) {
                                                                                form.down('form').getForm().findField('idtypeubication').setValue(parseInt(Ext.util.Cookies.get('lastTypeUbication')));
                                                                            } else {
                                                                                form.down('form').getForm().findField('idtypeubication').setValue(1);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            },
                            failed: function (t, p, o) {
                                Ext.MessageBox.show({
                                    title: 'Error',
                                    msg: 'No es posible leer el tracking',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR
                                });
                            }
                        });
                    }
                }
        );
    },
    enteredPackages: function () {
        this.openGrid('listEnteredPackages')
    },
    pendingPackages: function () {
        this.openGrid('listPendingPackages')
    },
    dgPackages: function () {
        this.openGrid('listDGPackages')
    },
    authorizedPackages: function () {
        this.openGrid('listAuthorizedPackages')
    },
    dispatchs: function () {
        this.openGrid('listDispatchedPackages')
    },
    receivePackages: function () {
        Ext.getStore('DeliveryCompanyReceivePackage').load({
            callback: function () {
                Ext.widget('formSelectDeliveryCompany');
            }
        });
    },
    receivedPackages: function () {
        this.openGrid('listReceivedPackages')
    },
    provides: function () {
        this.openGrid('listProvides')
    },
    prealerts: function () {
        this.openGrid('listPrealerts')
    },
    requestsPending: function () {
        this.openGrid('listRequestsPending')
    },
    admonPackages: function () {
        this.openGrid('listAdmonPackages')
    },
    listPackagesPicking: function () {
        this.openGrid('listPackagesPicking')
    },
    miles: function () {
        Ext.widget('formMiles');
    },
    rptAuthorized: function () {
        Ext.widget('formReportAuthorized')
    },
    rptAllPackage: function () {
        Ext.widget('formReportAllPackage')
    },
    rptReceivedPackages: function () {
        this.openGrid('listReportReceivedPackages')
    },
    rptProductivity: function () {
        Ext.widget('formReportProductivity');
    },
    rptLocker: function () {
        Ext.widget('formReportLocker');
    },
    rptBehavior: function () {
        Ext.widget('formReportBehavior');
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
                                    })
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
    printerUser: function (a, d, g, b, f) {
        Ext.getStore('Printer').load({
            callback: function () {
                Ext.Ajax.request({
                    method: 'GET',
                    url: "stores/list_objects.php",
                    params: {
                        id: 0,
                        object: "printerUser"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        var form = Ext.widget("formPrinterUser");
                        form.down("form").getForm().findField('iduser').setValue(0);
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
    logout: function () {
        window.location = 'logout.php'
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
    },
    typesUbication: function () {
        this.openGrid('listTypesUbication')
    },
    printers: function () {
        this.openGrid('listPrinters')
    },
    missings: function () {
        this.openGrid('listMissingPackages')
    },
    storageAbandonment: function () {
        Ext.Ajax.request({
            url: 'stores/list_objects.php',
            method: 'get',
            params: {
                object: 'storageAbandonment'
            },
            success: function (response) {
                var d = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function () {
                        window.open("./reports/" + d.msg.file, "_blank");
                    }
                })
            },
            failed: function (t, p, o) {
                Ext.MessageBox.show({
                    title: p.response.result.msg.title,
                    msg: p.response.result.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                })
            }
        })
    },
    rptPackageNoAuthorized: function () {
        Ext.Ajax.request({
            url: 'stores/list_objects.php',
            method: 'get',
            params: {
                object: 'rptPackageNoAuthorized'
            },
            success: function (response) {
                var d = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function () {
                        window.open("./reports/" + d.msg.file, "_blank");
                    }
                })
            },
            failed: function (t, p, o) {
                Ext.MessageBox.show({
                    title: p.response.result.msg.title,
                    msg: p.response.result.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                })
            }
        })
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
        Ext.getStore('GroupTracking').load({
            callback: function () {
                Ext.widget('formStateTracking').down('form').loadRecord(Ext.create('susencargos.model.StateTracking'));
            }
        });
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('StateTracking').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('GroupTracking').load({
            callback: function () {
                var form = Ext.widget('formStateTracking');
                form.down('form').loadRecord(v.getStore().getAt(c));
                form.down('form').getForm().findField('idgrouptracking').setValue(v.getStore().getAt(c).get('groupTracking').idgrouptracking);
            }
        });
    },
    editDbl: function (g, r) {
        Ext.getStore('GroupTracking').load({
            callback: function () {
                var form = Ext.widget('formStateTracking');
                form.down('form').loadRecord(r);
                form.down('form').getForm().findField('idgrouptracking').setValue(r.get('groupTracking').idgrouptracking);
            }
        });
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

Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.chart.*', 'Ext.ux.form.TinyMCE'],
    name: 'susencargos',
    launch: function () {
        //<editor-fold defaultstate="collapsed" desc="Stores">
        Ext.create('susencargos.store.DeprisaStore', {
            storeId: 'Application',
            model: 'susencargos.model.Application',
            object: 'apps'
        });

        Ext.create('susencargos.store.DeprisaStore', {
            storeId: 'Group',
            model: 'susencargos.model.Group',
            object: 'groups'
        });

        Ext.create('susencargos.store.DeprisaStore', {
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
        //</editor-fold>
        /*
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'ApplicationsGroup',
         model: 'susencargos.model.Application',
         object: 'applicationsGroup'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'FieldTemplate',
         model: 'susencargos.model.FieldTemplate',
         object: 'fields'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'GroupsApplication',
         model: 'susencargos.model.Group',
         object: 'groupsApplication'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'GroupsModule',
         model: 'susencargos.model.GroupModule',
         object: 'groupsModule'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'GroupsUser',
         model: 'susencargos.model.Group',
         object: 'groupsUser'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'LevelAccess',
         model: 'susencargos.model.LevelAccess',
         object: 'levelsAccess'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'NoApplicationsGroup',
         model: 'susencargos.model.Application',
         object: 'noApplicationsGroup'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'NoGroupsApplication',
         model: 'susencargos.model.Group',
         object: 'noGroupsApplication'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'NoGroupsUser',
         model: 'susencargos.model.Group',
         object: 'noGroupsUser'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'NoUsersGroup',
         model: 'susencargos.model.User',
         object: 'noUsersGroup'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'StateTracking',
         model: 'susencargos.model.StateTracking',
         object: 'statesTracking'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'Template',
         model: 'susencargos.model.Template',
         object: 'templates'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'User',
         model: 'susencargos.model.User',
         object: 'users'
         });
         
         Ext.create('susencargos.store.DeprisaStore', {
         storeId: 'UsersGroup',
         model: 'susencargos.model.User',
         object: 'usersGroup'
         });
         
         Ext.define('susencargos.view.application.FormGroupModule', {
         extend: 'susencargos.view.DeprisaForm',
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
         
         Ext.define('susencargos.view.application.FormModule', {
         extend: 'susencargos.view.DeprisaForm',
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
         extend: 'susencargos.view.DeprisaGrid',
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
         
         Ext.define("susencargos.view.country.FormCity", {
         extend: "susencargos.view.DeprisaForm",
         alias: "widget.formCity",
         title: "Editar ciudad",
         object: "cities",
         fields: [{
         xtype: "hiddenfield",
         name: "idcity",
         value: 0
         }, {
         xtype: "hiddenfield",
         name: "idcountry",
         value: 0
         }, {
         xtype: "textfield",
         name: "name",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Nombre"
         }, {
         xtype: "textfield",
         name: "code",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* C\xf3digo"
         }, {
         xtype: "combo",
         name: "isCourrier",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Solo courrier",
         store: [[false, "No"], [true, "Si"]],
         queryMode: "local",
         typeAHead: true,
         forceSelection: true
         }],
         buttons: [{
         text: "Guardar",
         action: "save"
         }, {
         text: "Cancelar",
         action: "cancel"
         }]
         });
         
         Ext.define("susencargos.view.country.Form", {
         extend: "susencargos.view.DeprisaForm",
         alias: "widget.formCountry",
         title: "Editar pa\xeds",
         object: "countries",
         fields: [{
         xtype: "hiddenfield",
         name: "idcountry",
         value: 0
         }, {
         xtype: "textfield",
         name: "name",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Nombre"
         }, {
         xtype: "textfield",
         name: "codeIATA",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* C\xf3digo IATA"
         }, {
         xtype: "numberfield",
         name: "minValueDeclared",
         decimalPrecision: 2,
         decimalSeparator: ".",
         hideTrigger: true,
         value: 0,
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* M\xednimo declarado"
         }, {
         xtype: "numberfield",
         name: "maxValueDeclared",
         decimalPrecision: 2,
         decimalSeparator: ".",
         hideTrigger: true,
         value: 0,
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* M\xe1ximo declarado"
         }, {
         xtype: "combo",
         name: "idmoney",
         anchor: "90%",
         value: "",
         store: "Money",
         valueField: "idmoney",
         displayField: "name",
         fieldLabel: "* Moneda",
         queryMode: "local",
         forceSelection: true
         }, {
         xtype: "combo",
         name: "idmeasuringsystem",
         anchor: "90%",
         value: "",
         store: "MeasuringSystem",
         valueField: "idmeasuringsystem",
         displayField: "name",
         fieldLabel: "* Sistema de medida",
         queryMode: "local"
         }, {
         xtype: "numberfield",
         decimalPrecision: 2,
         decimalSeparator: ".",
         hideTrigger: true,
         name: "maxWeight",
         value: 0,
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Peso m\xe1ximo"
         }, {
         xtype: "numberfield",
         decimalPrecision: 2,
         decimalSeparator: ".",
         hideTrigger: true,
         name: "milesByDollar",
         value: 0,
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Millas por dolar"
         }, {
         xtype: "numberfield",
         decimalPrecision: 2,
         decimalSeparator: ".",
         hideTrigger: true,
         name: "maxWeightDocs",
         value: 0,
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Peso m\xe1ximo documentos"
         }, {
         xtype: "numberfield",
         decimalPrecision: 2,
         decimalSeparator: ".",
         hideTrigger: true,
         name: "maxLongitude",
         value: 0,
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* M\xe1ximo longitud"
         }, {
         xtype: "combo",
         name: "delivery",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* Pa\xeds de entrega",
         store: [[false, "No"], [true, "Si"]],
         queryMode: "local",
         typeAHead: true
         }, {
         xtype: "textfield",
         name: "codeOffice",
         value: "",
         allowBlank: false,
         anchor: "90%",
         fieldLabel: "* C\xf3digo oficina Socrates"
         }],
         buttons: [{
         text: "Guardar",
         action: "save"
         }, {
         text: "Cancelar",
         action: "cancel"
         }]
         });
         
         Ext.define("susencargos.view.country.Cities", {
         extend: "susencargos.view.DeprisaGrid",
         iconCls: "city",
         alias: "widget.listCities",
         title: "Listado de ciudades",
         store: "City",
         columns: [{
         header: "ID",
         filter: "number",
         dataIndex: "idcity"
         }, {
         header: "Nombre",
         filter: "string",
         dataIndex: "name",
         flex: 3
         }, {
         header: "C\xf3digo",
         filter: "string",
         dataIndex: "code",
         flex: 1
         }, {
         header: "Solo courrier",
         filter: "boolean",
         dataIndex: "isCourrier",
         renderer: function (a) {
         if (a) {
         return "Si"
         } else {
         return "No"
         }
         },
         flex: 1
         }, {
         xtype: "actioncolumn",
         width: 20,
         action: "salesPoint",
         tooltip: "Puntos de venta",
         stopSelection: false,
         icon: "css/salePoint.png",
         iconCls: "edit"
         }, {
         xtype: "actioncolumn",
         width: 20,
         action: "edit",
         stopSelection: false,
         tooltip: "Editar",
         icon: "css/edit.png",
         iconCls: "edit"
         }, {
         xtype: "actioncolumn",
         width: 20,
         action: "remove",
         tooltip: "Eliminar",
         stopSelection: false,
         icon: "css/remove.png",
         iconCls: "remove"
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
         
         Ext.define('susencargos.view.level_access.Grid', {
         extend: 'susencargos.view.DeprisaGrid',
         iconCls: 'levelAccess',
         alias: 'widget.listLevelsAccess',
         title: 'Listado niveles de acceso',
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
         stopSelection: false,
         icon: 'css/remove.png',
         iconCls: 'remove'
         }]
         });
         
         Ext.define('susencargos.view.level_access.Form', {
         extend: 'susencargos.view.DeprisaForm',
         alias: 'widget.formLevelAccess',
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
         
         Ext.define('susencargos.view.state_tracking.Grid', {
         extend: 'susencargos.view.DeprisaGrid',
         iconCls: 'stateTracking',
         alias: 'widget.listStatesTracking',
         title: 'Listado estados de tracking',
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
         header: 'Grupo',
         filter: 'string',
         dataIndex: 'groupTracking',
         renderer: function (value) {
         return value.name;
         },
         flex: 1
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
         extend: 'susencargos.view.DeprisaForm',
         alias: 'widget.formStateTracking',
         title: 'Editar estado de tracking',
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
         }, {
         xtype: 'combo',
         name: 'idgrouptracking',
         forceSelection: true,
         anchor: '90%',
         allowBlank: false,
         store: 'GroupTracking',
         fieldLabel: 'Grupo *',
         valueField: 'idgrouptracking',
         displayField: 'name',
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
         
         Ext.define('susencargos.view.template.Grid', {
         extend: 'susencargos.view.DeprisaGrid',
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
         extend: 'susencargos.view.DeprisaForm',
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
         extend: 'susencargos.view.DeprisaForm',
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
         extend: 'susencargos.view.DeprisaGrid',
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
         return "Si"
         } else {
         return "No"
         }
         },
         flex: 1
         }]
         });
         
         Ext.define('susencargos.view.user.Grid', {
         extend: 'susencargos.view.DeprisaGrid',
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
         return "Si"
         } else {
         return "No"
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
         action: 'printer',
         tooltip: 'Impresora',
         icon: 'css/printer.png',
         stopSelection: false,
         iconCls: 'printer'
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
         extend: 'susencargos.view.DeprisaForm',
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
         */

        //<editor-fold defaultstate="collapsed" desc="View Generales">
        Ext.define('susencargos.view.DeprisaGrid', {
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

        Ext.define('susencargos.view.DeprisaForm', {
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
            extend: 'susencargos.view.DeprisaGrid',
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
            extend: 'susencargos.view.DeprisaForm',
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
            extend: 'susencargos.view.DeprisaGrid',
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
            extend: 'susencargos.view.DeprisaForm',
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
        //</editor-fold>
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
    }
});