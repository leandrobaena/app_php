Ext.define('flybox.model.Application', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idapplication',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Authorized', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idauthorized',
        type: 'int'
    }, {
        name: 'user',
        reference: 'flybox.model.User'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.AuxReceivePackage', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'tracking',
        type: 'string'
    }],
    idProperty: 'tracking'
});

Ext.define('flybox.model.City', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idcity',
        type: 'int'
    }, {
        name: 'country',
        reference: 'flybox.model.Country'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'code',
        type: 'string'
    }, {
        name: 'isCourrier',
        type: 'boolean',
        defaultValue: false
    }]
});

Ext.define('flybox.model.Country', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idcountry',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'codeIATA',
        type: 'string'
    }, {
        name: 'minValueDeclared',
        type: 'float'
    }, {
        name: 'maxValueDeclared',
        type: 'float'
    }, {
        name: 'money',
        reference: 'flybox.model.Money'
    }, {
        name: 'measuringSystem',
        reference: 'flybox.model.MeasuringSystem'
    }, {
        name: 'maxWeight',
        type: 'int'
    }, {
        name: 'milesByDollar',
        type: 'float'
    }, {
        name: 'maxWeightDocs',
        type: 'float'
    }, {
        name: 'maxLongitude',
        type: 'float'
    }, {
        name: 'delivery',
        type: 'boolean',
        defaultValue: false
    }, {
        name: 'codeOffice',
        type: 'string'
    }]
});

Ext.define('flybox.model.Customer', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'iduser',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'lastname',
        type: 'string'
    }, {
        name: 'typeID',
        reference: 'flybox.model.TypeID'
    }, {
        name: 'id',
        type: 'string'
    }, {
        name: 'country',
        reference: 'flybox.model.Country'
    }, {
        name: 'city',
        reference: 'flybox.model.City'
    }, {
        name: 'delivery_salepoint',
        type: 'int'
    }, {
        name: 'economySector',
        reference: 'flybox.model.EconomySector'
    }, {
        name: 'address',
        type: 'string'
    }, {
        name: 'salePoint',
        reference: 'flybox.model.SalePoint'
    }, {
        name: 'homePhone',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'nameContact',
        type: 'string'
    }, {
        name: 'phoneContact',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'alternateEmail',
        type: 'string'
    }, {
        name: 'occupation',
        reference: 'flybox.model.Occupation'
    }, {
        name: 'birthday',
        type: 'date'
    }, {
        name: 'lifemiles',
        type: 'string'
    }, {
        name: 'infoMethod',
        reference: 'flybox.model.InfoMethod'
    }, {
        name: 'secretQuestion',
        reference: 'flybox.model.SecretQuestion'
    }, {
        name: 'listCustomer',
        reference: 'flybox.model.ListCustomer'
    }, {
        name: 'facebookUserID',
        type: 'string'
    }]
});

Ext.define('flybox.model.DeliveryCompany', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'iddeliverycompany',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'idcountry',
        type: 'int'
    }, {
        name: 'country',
        reference: 'flybox.model.Country'
    }]
});

Ext.define('flybox.model.Dispatch', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'iddispatch',
        type: 'int'
    }, {
        name: 'miles',
        type: 'int'
    }, {
        name: 'tracking',
        type: 'string'
    }, {
        name: 'weight',
        type: 'float'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'voucher',
        type: 'string'
    }, {
        name: 'collect',
        type: 'boolean'
    }, {
        name: 'value',
        type: 'float'
    }, {
        name: 'declared_value',
        type: 'float'
    }, {
        name: 'product',
        reference: 'flybox.model.Product'
    }, {
        name: 'locker',
        reference: 'flybox.model.Locker'
    }, {
        name: 'typePackage',
        reference: 'flybox.model.TypePackage'
    }, {
        name: 'cityOrigin',
        reference: 'flybox.model.City'
    }, {
        name: 'payment',
        reference: 'flybox.model.Payment'
    }, {
        name: 'cityDelivery',
        reference: 'flybox.model.City'
    }, {
        name: 'address',
        type: 'string'
    }, {
        name: 'dateDispatch',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'userDispatch',
        reference: 'flybox.model.User'
    }, {
        name: 'securityStamp',
        type: 'string'
    }, {
        name: 'daysStorage', type: 'int'
    }]
});

Ext.define('flybox.model.EconomySector', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ideconomysector',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.FieldTemplate', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idfield',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'template',
        reference: 'flybox.model.Template'
    }]
});

Ext.define('flybox.model.Group', {
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

Ext.define('flybox.model.GroupModule', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idgroupmodule',
        type: 'int'
    }, {
        name: 'group',
        reference: 'flybox.model.Group'
    }, {
        name: 'levelaccess',
        reference: 'flybox.model.LevelAccess'
    }]
});

Ext.define('flybox.model.GroupTracking', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idgrouptracking',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.InfoMethod', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idinfomethod',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Item', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'iditem',
        type: 'int'
    }, {
        name: 'package',
        reference: 'flybox.model.Package'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'amount',
        type: 'int',
        defaultValue: 1
    }, {
        name: 'unitValue',
        type: 'float'
    }]
});

Ext.define('flybox.model.LevelAccess', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idlevelaccess',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.ListCustomer', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idlistcustomer',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'daysStorageFree',
        type: 'int'
    }, {
        name: 'daysAbondonment',
        type: 'int'
    }, {
        name: 'dayValue',
        type: 'float'
    }]
});

Ext.define('flybox.model.Locker', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idlocker',
        type: 'int'
    }, {
        name: 'typeLocker',
        reference: 'flybox.model.TypeLocker'
    }, {
        name: 'stateLocker',
        reference: 'flybox.model.StateLocker'
    }, {
        name: 'user',
        reference: 'flybox.model.User'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'dateAdded',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'dateReject',
        type: 'date', dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'rejectionReason',
        reference: 'flybox.model.RejectionReason'
    }, {
        name: 'comments',
        type: 'string'
    }]
});

Ext.define('flybox.model.MeasuringSystem', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idmeasuringsystem',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Module', {
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
        name: 'idapplication',
        reference: 'flybox.model.Application'
    }],
    idProperty: 'idmodule'
});

Ext.define('flybox.model.Money', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idmoney',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Occupation', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idoccupation',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Package', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idpackage',
        type: 'int'
    }, {
        name: 'locker',
        reference: 'flybox.model.Locker'
    }, {
        name: 'product',
        reference: 'flybox.model.Product'
    }, {
        name: 'payment',
        reference: 'flybox.model.Payment'
    }, {
        name: 'statePackage',
        reference: 'flybox.model.StatePackage'
    }, {
        name: 'typePackage',
        reference: 'flybox.model.TypePackage'
    }, {
        name: 'cityOrigin',
        reference: 'flybox.model.City'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'tracking',
        type: 'string'
    }, {
        name: 'provide',
        reference: 'flybox.model.Provide'
    }, {
        name: 'deliveryCompany',
        reference: 'flybox.model.DeliveryCompany'
    }, {
        name: 'weight',
        type: 'float'
    }, {
        name: 'lenght',
        type: 'float'
    }, {
        name: 'height',
        type: 'float'
    }, {
        name: 'width',
        type: 'float'
    }, {
        name: 'declaredValue',
        type: 'float'
    }, {
        name: 'datePrealert',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'dateReceive',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'userReceive',
        reference: 'flybox.model.User'
    }, {
        name: 'dateEnter',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'userEnter',
        reference: 'flybox.model.User'
    }, {
        name: 'dateAuthorization',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }, {
        name: 'weightVolumen',
        type: 'float'
    }, {
        name: 'observations',
        type: 'string'
    }, {
        name: 'consolidate',
        type: 'boolean'
    }, {
        name: 'ubication',
        refecence: 'flybox.model.Ubication'
    }, {
        name: 'autodispatch',
        type: 'boolean'
    }, {
        name: 'cityDelivery',
        reference: 'flybox.model.City'
    }, {
        name: 'address',
        type: 'string'
    }]
});

Ext.define('flybox.model.Page', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idpage',
        type: 'int'
    }, {
        name: 'title',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'html',
        type: 'string'
    }, {
        name: 'idtemplate',
        type: 'int',
        defaultValue: 1
    }, {
        name: 'keywords',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }]
});

Ext.define('flybox.model.Payment', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idpayment',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'code',
        type: 'string'
    }]
});

Ext.define('flybox.model.Prealert', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idprealert',
        type: 'int'
    }, {
        name: 'locker',
        reference: 'flybox.model.Locker'
    }, {
        name: 'user',
        reference: 'flybox.model.User'
    }, {
        name: 'typePackage',
        reference: 'flybox.model.TypePackage', defaultValue: 2
    }, {
        name: 'cityOrigin',
        reference: 'flybox.model.City'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'tracking',
        type: 'string'
    }, {
        name: 'provide',
        reference: 'flybox.model.Provide'
    }, {
        name: 'deliveryCompany',
        reference: 'flybox.model.DeliveryCompany'
    }, {
        name: 'declaredValue',
        type: 'float'
    }, {
        name: 'date',
        type: 'string'
    }, {
        name: 'observations',
        type: 'string'
    }, {
        name: 'product',
        reference: 'flybox.model.Product'
    }, {
        name: 'autodispatch',
        type: 'boolean',
        defaultValue: false
    }, {
        name: 'cityDelivery',
        reference: 'flybox.model.City'
    }, {
        name: 'address',
        type: 'string'
    }, {
        name: 'payment',
        reference: 'flybox.model.Payment'
    }]
});

Ext.define('flybox.model.Printer', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idprinter',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Product', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idproduct',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'code',
        type: 'int'
    }, {
        name: 'maxConsolidate',
        type: 'int'
    }]
});

Ext.define('flybox.model.Productivity', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'iduser',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'recibidos',
        type: 'int'
    }, {
        name: 'ingresados',
        type: 'int'
    }, {
        name: 'despachados',
        type: 'int'
    }],
    idProperty: 'iduser'
});

Ext.define('flybox.model.Provide', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idprovide',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.RejectionReason', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idrejectionreason',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.RequestPending', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idrequestpending',
        type: 'int'
    }, {
        name: 'locker',
        reference: 'flybox.model.Locker'
    }, {
        name: 'tracking',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'date',
        type: 'date',
        dateFormat: 'Y-m-d H:i:s'
    }]
});

Ext.define('flybox.model.Resource', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idresource',
        type: 'int'
    }, {
        name: 'path',
        type: 'string'
    }, {
        name: 'typeResource',
        reference: 'flybox.model.TypeResource'
    }]
});

Ext.define("flybox.model.SalePoint", {
    extend: "Ext.data.Model",
    fields: [{
        name: "idsalepoint",
        type: "int"
    }, {
        name: "idcity",
        reference: "flybox.model.City"
    }, {
        name: "name",
        type: "string"
    }, {
        name: "address",
        type: "string"
    }]
});

Ext.define('flybox.model.SecretQuestion', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idsecretquestion',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.StateLocker', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idstatelocker',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.StateTracking', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idstatetracking',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'groupTracking',
        reference: 'flybox.model.GroupTracking'
    }]
});

Ext.define('flybox.model.Template', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idtemplate',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'html',
        type: 'string'
    }]
});

Ext.define('flybox.model.TypeID', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idtypeid',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.TypeLocker', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idtypelocker',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.TypePackage', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idtypepackage',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'code',
        type: 'int'
    }]
});

Ext.define('flybox.model.TypeResource', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idtyperesource',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'folder',
        type: 'string'
    }]
});

Ext.define('flybox.model.TypeUbication', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idtypeubication',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }]
});

Ext.define('flybox.model.Ubication', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idubication',
        type: 'int'
    }, {
        name: 'warehouse',
        reference: 'flybox.model.WareHouse'
    }, {
        name: 'code',
        type: 'string'
    }, {
        name: 'width',
        type: 'float'
    }, {
        name: 'height',
        type: 'float'
    }, {
        name: 'lenght',
        type: 'float'
    }, {
        name: 'limit',
        type: 'int'
    }, {
        name: 'typeUbication',
        reference: 'flybox.model.TypeUbication'
    }, {
        name: 'order',
        type: 'int'
    }]
});

Ext.define('flybox.model.User', {
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

Ext.define('flybox.model.WareHouse', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idwarehouse',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'limit',
        type: 'int'
    }, {
        name: 'order',
        type: 'int'
    }]
});

Ext.define('flybox.model.Picking', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'idconsolidate',
        type: 'int'
    }, {
        name: 'idgroup',
        type: 'int'
    }, {
        name: 'idpackage',
        type: 'int'
    }, {
        name: 'idlocker',
        type: 'int'
    }, {
        name: 'cityDelivery',
        reference: 'flybox.model.City'
    }, {
        name: 'address',
        type: 'string'
    }, {
        name: 'user',
        reference: 'flybox.model.User'
    }, {
        name: 'tracking',
        type: 'string'
    }]
});

Ext.define("flybox.store.DeprisaStore", {
    extend: "Ext.data.Store",
    remoteSort: true,
    remoteFilter: true,
    object: "",
    proxy: {
        type: "ajax",
        url: "stores/list_objects.aspx",
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
        this.callParent([a])
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

var products = 1;
var numArticles = 1;
function dispatch(group) {
    var form = Ext.widget('formDispatchPackage');
    form.down('form').getForm().findField('group').setValue(group);
    var observations = "";
    Ext.getStore('AuthorizedPackage').each(function (r) {
        if (r.get('group') == group) {
            if (observations != "") {
                observations + ",";
            }
            observations += r.get('observations');
        }
    });
    form.down('form').getForm().findField('observations').setValue(observations);
}
function disconsolidate(group) {
    var form = Ext.widget('listDisconsolidatePackage');
    Ext.getStore('GroupPackage').getProxy().setExtraParam('group', group);
    Ext.getStore('GroupPackage').load();
}
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
        'listApplications button[action=insert]': { click: 'insert' },
        'listApplications button[action=clean]': { click: 'cleanFilters' },
        'listApplications': { itemdblclick: 'editDbl' },
        'listApplications actioncolumn[action=groups]': { click: 'groups' },
        'listApplications actioncolumn[action=modules]': { click: 'modules' },
        'listApplications actioncolumn[action=edit]': { click: 'edit' },
        'listApplications actioncolumn[action=remove]': { click: 'remove' },
        'formApplication button[action=cancel]': { click: 'cancel' },
        'formApplication button[action=save]': { click: 'save' },
        'listGroupsApplication grid#gridDestination dataview': { drop: 'insertGroup' },
        'listGroupsApplication grid#gridSource dataview': { drop: 'removeGroup' },
        'listModules button[action=insert]': { click: 'insertModule' },
        'listModules button[action=clean]': { click: 'cleanFiltersModules' },
        'listModules': { itemdblclick: 'editDblModule' },
        'listModules actioncolumn[action=groups]': { click: 'groupsModule' },
        'listModules actioncolumn[action=edit]': { click: 'editModule' },
        'listModules actioncolumn[action=remove]': { click: 'removeModule' },
        'formModule button[action=cancel]': { click: 'cancel' },
        'formModule button[action=save]': { click: 'saveModule' },
        'listGroupsModule button[action=insert]': { click: 'insertGroupModule' },
        'listGroupsModule button[action=clean]': { click: 'cleanFiltersGroupsModule' },
        'listGroupsModule': { itemdblclick: 'editDblGroupModule' },
        'listGroupsModule actioncolumn[action=edit]': { click: 'editGroupModule' },
        'listGroupsModule actioncolumn[action=remove]': { click: 'removeGroupModule' },
        'formGroupModule button[action=cancel]': { click: 'cancel' },
        'formGroupModule button[action=save]': { click: 'saveGroupModule' }
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
        Ext.widget('formApplication').down('form').loadRecord(Ext.create('flybox.model.Application'));
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
                    url: 'delete/delete_object.aspx',
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
                                Ext.getStore('Application').load()
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
                url: 'update/save_object.aspx',
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
                url: 'delete/delete_object.aspx',
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
        form.down('form').loadRecord(Ext.create('flybox.model.Module'));
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
                    url: 'delete/delete_object.aspx',
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
        form.down('form').loadRecord(Ext.create('flybox.model.GroupModule'));
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
                    url: 'delete/delete_object.aspx',
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
        'listAuthorizedPackages': { itemdblclick: 'editDbl' },
        'listAuthorizedPackages actioncolumn[action=edit]': { click: 'edit' },
        'listDisconsolidatePackage button[action=cancel]': { click: 'cancel' },
        'listDisconsolidatePackage actioncolumn[action=remove]': { click: 'remove' },
        'formReportAuthorized button[action=save]': { click: 'saveReport' },
        'formReportAuthorized button[action=cancel]': { click: 'cancel' },
        'formAuthorizedPackage button[action=save]': { click: 'savePackage' },
        'formAuthorizedPackage button[action=cancel]': { click: 'cancel' },
        'formAuthorizedPackage grid': { itemdblclick: 'editDblProduct' },
        'formAuthorizedPackage actioncolumn[action=edit]': { click: 'editProduct' },
        'formAuthorizedPackage actioncolumn[action=remove]': { click: 'removeProduct' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('AuthorizedPackage').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            Ext.getStore('AuthorizedPackage').load();
                            Ext.getStore('Productivity').load();
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
    edit: function (v, r, c, i, e) {
        Ext.getStore('Product').getProxy().setExtraParam('idpackage', v.getStore().getAt(c).get('idpackage'));
        Ext.getStore('Product').load();
        Ext.getStore('TypePackage').load({
            start: 0,
            limit: 100,
            callback: function () {
                var form = Ext.widget('formAuthorizedPackage').down('form').loadRecord(v.getStore().getAt(c))
                if (v.getStore().getAt(c).get('idcityorigin') == 4) {
                    form.findField('weight').setFieldLabel('Peso (Lb.)');
                } else {
                    form.findField('weight').setFieldLabel('Peso (Kg.)');
                }
            }
        });
    },
    savePackage: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            Ext.getStore('AuthorizedPackage').load();
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
    editDbl: function (g, r) {
        Ext.getStore('Product').getProxy().setExtraParam('idpackage', r.get('idpackage'));
        Ext.getStore('Product').load();
        Ext.getStore('TypePackage').load({
            start: 0,
            limit: 100,
            callback: function () {
                var form = Ext.widget('formAuthorizedPackage').down('form').loadRecord(r);
                if (r.get('idcityorigin') == 4) {
                    form.findField('weight').setFieldLabel('Peso (Lb.)');
                } else {
                    form.findField('weight').setFieldLabel('Peso (Kg.)');
                }
            }
        });
    },
    editProduct: function (v, r, c, i, e) {
        var form = Ext.widget('formProductPackage').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDblProduct: function (v, r, c, i, e) {
        var form = Ext.widget('formProductPackage').down('form').loadRecord(r)
    },
    removeProduct: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/product_package.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idproduct')
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Product').load();
                                Ext.getStore('AuthorizedPackage').load();
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
    saveProduct: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            Ext.getStore('Product').load();
                            Ext.getStore('AuthorizedPackage').load();
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
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el paquete de este grupo?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/group_package.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idpackage')
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('GroupPackage').load();
                                Ext.getStore('AuthorizedPackage').load();
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
    saveReport: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open("./reports/" + d.msg.file, "_blank");
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
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listCountries button[action=insert]": { click: 'insert' },
        "listCountries button[action=clean]": { click: 'cleanFilters' },
        "listCountries": { itemdblclick: 'editDbl' },
        "listCountries actioncolumn[action=cities]": { click: 'cities' },
        "listCountries actioncolumn[action=groups]": { click: 'groups' },
        "listCountries actioncolumn[action=edit]": { click: 'edit' },
        "listCountries actioncolumn[action=remove]": { click: 'remove' },
        "formCountry button[action=cancel]": { click: 'cancel' },
        "formCountry button[action=save]": { click: 'save' },
        "listGroupsCountry grid#gridDestination dataview": { drop: 'insertGroup' },
        "listGroupsCountry grid#gridSource dataview": { drop: 'removeGroup' },
        "listCities button[action=insert]": { click: 'insertCity' },
        "listCities button[action=clean]": { click: 'cleanFiltersCities' },
        "listCities": { itemdblclick: 'editDblCity' },
        "listCities actioncolumn[action=edit]": { click: 'editCity' },
        "listCities actioncolumn[action=remove]": { click: 'removeCity' },
        "listCities actioncolumn[action=salesPoint]": { click: 'salesPoint' },
        "formCity button[action=cancel]": { click: 'cancel' },
        "formCity button[action=save]": { click: 'saveCity' },
        "listSalesPoint button[action=insert]": { click: 'insertSalePoint' },
        "listSalesPoint button[action=clean]": { click: 'cleanFiltersSalesPoint' },
        "listSalesPoint ": { itemdblclick: 'editDblSalePoint' },
        "listSalesPoint actioncolumn[action=edit]": { click: 'editSalePoint' },
        "listSalesPoint actioncolumn[action=remove]": { click: 'removeSalePoint' },
        "formSalePoint button[action=cancel]": { click: 'cancel' },
        "formSalePoint button[action=save]": { click: 'saveSalePoint' }
    },
    groups: function (b, f, h, d, g) {
        Ext.getStore("GroupsCountry").getProxy().setExtraParam("idcountry", b.getStore().getAt(h).get("idcountry"));
        Ext.getStore("GroupsCountry").load();
        Ext.getStore("NoGroupsCountry").getProxy().setExtraParam("idcountry", b.getStore().getAt(h).get("idcountry"));
        Ext.getStore("NoGroupsCountry").load();
        var a = Ext.widget("listGroupsCountry");
        a.setTitle("Listado grupos del pa\xeds " + b.getStore().getAt(h).get("name"))
    },
    insertGroup: function (e, b, a, c) {
        Ext.each(b.records, function (g, d, f) {
            Ext.Ajax.request({
                url: "update/save_object.aspx",
                params: {
                    idcountry: Ext.getStore("GroupsCountry").getProxy().extraParams.idcountry,
                    object: "groupsCountry",
                    idgroup: g.get("idgroup"), id: 0
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
                url: "delete/delete_object.aspx",
                params: {
                    idcountry: Ext.getStore("GroupsCountry").getProxy().extraParams.idcountry,
                    object: "groupsCountry",
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
    cities: function (b, g, k, d, h) {
        Ext.getStore("City").getProxy().setExtraParam("idcountry", b.getStore().getAt(k).get("idcountry"));
        Ext.getStore("City").load();
        var j = false;
        var f = Ext.getCmp("contenido");
        var a = null;
        Ext.each(f.items.items, function (l, c, e) {
            if (l.alias == "widget.listCities") {
                j = true;
                a = l
            }
        });
        if (!j) {
            a = Ext.widget("listCities");
            f.add(a)
        }
        a.setTitle("Listado ciudades del pa\xeds " + b.getStore().getAt(k).get("name"));
        Ext.getCmp("contenido").setActiveTab(a)
    },
    insert: function (a, c) {
        Ext.getStore("Money").load({
            callback: function () {
                Ext.getStore("MeasuringSystem").load({
                    callback: function () {
                        var b = Ext.widget("formCountry");
                        b.down("form").loadRecord(Ext.create("flybox.model.Country"))
                    }
                })
            }
        })
    },
    cleanFilters: function (a, c) {
        Ext.getStore("Country").load();
        a.up("grid").filters.clearFilters()
    },
    cleanFiltersSalesPoint: function (a, c) {
        Ext.getStore("SalePoint").load();
        a.up("grid").filters.clearFilters()
    },
    cleanFiltersCities: function (a, c) {
        Ext.getStore("City").load();
        a.up("grid").filters.clearFilters()
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.getStore("Money").load({
            callback: function () {
                Ext.getStore("MeasuringSystem").load({
                    callback: function () {
                        var c = Ext.widget("formCountry");
                        c.down("form").loadRecord(a.getStore().getAt(g));
                        c.down("form").getForm().findField("idmoney").setValue(a.getStore().getAt(g).get("money").idmoney);
                        c.down("form").getForm().findField("idmeasuringsystem").setValue(a.getStore().getAt(g).get("measuringSystem").idmeasuringsystem)
                    }
                })
            }
        })
    },
    editDbl: function (b, a) {
        Ext.getStore("Money").load({
            callback: function () {
                Ext.getStore("MeasuringSystem").load({
                    callback: function () {
                        var c = Ext.widget("formCountry");
                        c.down("form").loadRecord(a);
                        c.down("form").getForm().findField("idmoney").setValue(a.get("money").idmoney);
                        c.down("form").getForm().findField("idmeasuringsystem").setValue(a.get("measuringSystem").idmeasuringsystem)
                    }
                })
            }
        })
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idcountry").getValue());
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
                            Ext.getStore("Country").load()
                        }
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idcountry"),
                        object: "countries"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("Country").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    },
    insertCity: function (a, d) {
        var c = Ext.widget("formCity");
        c.down("form").loadRecord(Ext.create("flybox.model.City"));
        c.down("form").getForm().findField("idcountry").setValue(Ext.getStore("City").getProxy().extraParams.idcountry)
    },
    editCity: function (a, f, h, b, g) {
        var d = Ext.widget("formCity");
        d.down("form").loadRecord(a.getStore().getAt(h));
        d.down("form").getForm().findField("idcountry").setValue(Ext.getStore("City").getProxy().extraParams.idcountry)
    },
    editDblCity: function (c, b) {
        var a = Ext.widget("formCity");
        a.down("form").loadRecord(b);
        a.down("form").getForm().findField("idcountry").setValue(Ext.getStore("City").getProxy().extraParams.idcountry)
    },
    saveCity: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idcity").getValue());
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
                            Ext.getStore("City").load()
                        }
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
    removeCity: function (a, d, g, b, f) {
        Ext.MessageBox.confirm("Eliminar registro", "¿Desea eliminar el registro?", function (c) {
            if (c == "yes") {
                Ext.Ajax.request({
                    url: "stores/list_objects.aspx",
                    method: "GET",
                    params: {
                        idcity: a.getStore().getAt(g).get("idcity"),
                        object: "user_in_city"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        if (h.total > 0) {
                            Ext.MessageBox.confirm("Reubicación", "En esta ciudad se encuentra registrados " + h.total + " usuarios, ¿Desea reubicarlos?", function (i) {
                                if (i == "yes") {
                                    Ext.Ajax.request({
                                        url: "delete/delete_object.aspx",
                                        params: {
                                            id: a.getStore().getAt(g).get("idcity"),
                                            object: "user_city"
                                        },
                                        success: function (j) {
                                            var k = Ext.JSON.decode(j.responseText);
                                            Ext.MessageBox.show({
                                                title: k.msg.title,
                                                msg: k.msg.body,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.INFO,
                                                fn: function () {
                                                    Ext.Ajax.request({
                                                        url: "delete/delete_object.aspx",
                                                        params: {
                                                            id: a.getStore().getAt(g).get("idcity"),
                                                            object: "cities"
                                                        },
                                                        success: function (l) {
                                                            var m = Ext.JSON.decode(l.responseText);
                                                            Ext.MessageBox.show({
                                                                title: m.msg.title,
                                                                msg: m.msg.body,
                                                                buttons: Ext.Msg.OK,
                                                                icon: Ext.Msg.INFO,
                                                                fn: function () {
                                                                    Ext.getStore("City").load()
                                                                }
                                                            })
                                                        },
                                                        failed: function (l, m, n) {
                                                            Ext.MessageBox.show({
                                                                title: m.response.result.msg.title,
                                                                msg: m.response.result.msg.body,
                                                                buttons: Ext.Msg.OK,
                                                                icon: Ext.Msg.INFO
                                                            })
                                                        }
                                                    });
                                                    Ext.getStore("City").load()
                                                }
                                            })
                                        }, failed: function (j, k, l) {
                                            Ext.MessageBox.show({
                                                title: k.response.result.msg.title,
                                                msg: k.response.result.msg.body,
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.Msg.INFO
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            Ext.Ajax.request({
                                url: "delete/delete_object.aspx",
                                params: {
                                    id: a.getStore().getAt(g).get("idcity"),
                                    object: "cities"
                                },
                                success: function (i) {
                                    var j = Ext.JSON.decode(i.responseText);
                                    Ext.MessageBox.show({
                                        title: j.msg.title,
                                        msg: j.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO,
                                        fn: function () {
                                            Ext.getStore("City").load()
                                        }
                                    })
                                },
                                failed: function (i, j, k) {
                                    Ext.MessageBox.show({
                                        title: j.response.result.msg.title,
                                        msg: j.response.result.msg.body,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO
                                    })
                                }
                            })
                        }
                    }, failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    },
    salesPoint: function (b, g, k, d, h) {
        Ext.getStore("SalePoint").getProxy().setExtraParam("idcity", b.getStore().getAt(k).get("idcity"));
        Ext.getStore("SalePoint").load();
        var j = false;
        var f = Ext.getCmp("contenido");
        var a = null; Ext.each(f.items.items, function (l, c, e) {
            if (l.alias == "widget.listSalesPoint") {
                j = true;
                a = l
            }
        }); if (!j) {
            a = Ext.widget("listSalesPoint");
            f.add(a)
        }
        a.setTitle("Listado puntos de venta de la ciudad " + b.getStore().getAt(k).get("name"));
        Ext.getCmp("contenido").setActiveTab(a)
    },
    insertSalePoint: function (a, d) {
        var c = Ext.widget("formSalePoint");
        c.down("form").loadRecord(Ext.create("flybox.model.SalePoint"));
        c.down("form").getForm().findField("idcity").setValue(Ext.getStore("SalePoint").getProxy().extraParams.idcity)
    },
    editSalePoint: function (a, f, h, b, g) {
        var d = Ext.widget("formSalePoint");
        d.down("form").loadRecord(a.getStore().getAt(h));
        d.down("form").getForm().findField("idcity").setValue(a.getStore().getAt(h).get("city").idcity)
    },
    editDblSalePoint: function (c, b) {
        var a = Ext.widget("formSalePoint");
        a.down("form").loadRecord(b);
        a.down("form").getForm().findField("idcity").setValue(b.get("city").idcity)
    },
    saveSalePoint: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idsalepoint").getValue());
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
                            Ext.getStore("SalePoint").load()
                        }
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
    removeSalePoint: function (a, d, g, b, f) {
        Ext.MessageBox.confirm("Eliminar registro", "¿Desea eliminar el registro?", function (c) {
            if (c == "yes") {
                Ext.Ajax.request({
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idsalepoint"),
                        object: "salesPoint"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("SalePoint").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listDeliveryCompanies button[action=insert]': { click: 'insert' },
        'listDeliveryCompanies button[action=clean]': { click: 'cleanFilters' },
        'listDeliveryCompanies': { itemdblclick: 'editDbl' },
        'listDeliveryCompanies actioncolumn[action=edit]': { click: 'edit' },
        'listDeliveryCompanies actioncolumn[action=remove]': { click: 'remove' },
        'formDeliveryCompany button[action=cancel]': { click: 'cancel' },
        'formDeliveryCompany button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.getStore('Country').load({
            callback: function () {
                Ext.widget('formDeliveryCompany').down('form').loadRecord(Ext.create('flybox.model.DeliveryCompany'))
            }
        })
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('DeliveryCompany').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('Country').load({
            callback: function () {
                var record = v.getStore().getAt(c);
                var form = Ext.widget('formDeliveryCompany');
                form.down('form').loadRecord(record);
                form.down('form').getForm().findField('idcountry').setValue(record.get('country').idcountry)
            }
        })
    },
    editDbl: function (g, r) {
        Ext.getStore('Country').load({
            callback: function () {
                var form = Ext.widget('formDeliveryCompany');
                form.down('form').loadRecord(r);
                form.down('form').getForm().findField('idcountry').setValue(r.get('country').idcountry)
            }
        })
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('iddeliverycompany').getValue());
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
                            Ext.getStore('DeliveryCompany').load()
                        }
                    }); b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('iddeliverycompany'),
                        object: 'deliveryCompanies'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({ title: d.msg.title, msg: d.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore('DeliveryCompany').load() } })
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
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listDispatchedPackages actioncolumn[action=printer]': { click: 'reprintLabel' },
        'listDispatchedPackages button[action=clean]': { click: 'cleanFilters' },
        'formDispatchedPackage button[action=cancel]': { click: 'cancel' },
        'formFilterCountryMiles button[text=Buscar]': { click: 'findMiles' },
        'formMiles button[action=cancel]': { click: 'cancel' },
        'formMiles button[action=save]': { click: 'generateMiles' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('DispatchedPackage').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    findMiles: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            Ext.getStore('FE_Miles').getProxy().setExtraParam('date_begin', b.up('form').getForm().findField('date_begin').getValue());
            Ext.getStore('FE_Miles').getProxy().setExtraParam('date_end', b.up('form').getForm().findField('date_end').getValue());
            Ext.getStore('FE_Miles').load();
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    generateMiles: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open("reports/" + d.msg.file, "_blank");
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
    reprintLabel: function (v, r, c, i, e) {
        Ext.Ajax.request({
            url: 'update/save_object.aspx',
            params: {
                object: 'printLabelDispatched',
                id: v.getStore().getAt(c).get('iddispatch')
            },
            success: function (t) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
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

Ext.create("Ext.app.Controller", {
    control: {
        "listEconomySectors button[action=insert]": { click: 'insert' },
        "listEconomySectors button[action=clean]": { click: 'cleanFilters' },
        "listEconomySectors": { itemdblclick: 'editDbl' },
        "listEconomySectors actioncolumn[action=edit]": { click: 'edit' },
        "listEconomySectors actioncolumn[action=remove]": { click: 'remove' },
        "formEconomySector button[action=cancel]": { click: 'cancel' },
        "formEconomySector button[action=save]": { click: 'save' }
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
        Ext.getStore("EconomySector").load()
    },
    insert: function (a, c) {
        Ext.widget("formEconomySector").down("form").loadRecord(Ext.create("flybox.model.EconomySector"))
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formEconomySector").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formEconomySector").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("ideconomysector").getValue()); a.up("form").getForm().submit({ waitMsg: "Guardando ...", success: function (b, e, g) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore("EconomySector").load() } }); a.up("window").close() }, failure: function (b, e) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); a.up("window").close() } })
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("ideconomysector"),
                        object: "economySectors"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO, fn: function () {
                                Ext.getStore("EconomySector").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listGroups button[action=insert]': { click: 'insert' },
        'listGroups button[action=clean]': { click: 'cleanFilters' },
        'listGroups': { itemdblclick: 'editDbl' },
        'listGroups actioncolumn[action=countries]': { click: 'countries' },
        'listGroups actioncolumn[action=applications]': { click: 'applications' },
        'listGroups actioncolumn[action=users]': { click: 'users' },
        'listGroups actioncolumn[action=edit]': { click: 'edit' },
        'listGroups actioncolumn[action=remove]': { click: 'remove' },
        'formGroup button[action=cancel]': { click: 'cancel' },
        'formGroup button[action=save]': { click: 'save' },
        'listUsersGroup grid#gridDestination dataview': { drop: 'insertUser' },
        'listUsersGroup grid#gridSource dataview': { drop: 'removeUser' },
        'listApplicationsGroup grid#gridDestination dataview': { drop: 'insertApplication' },
        'listApplicationsGroup grid#gridSource dataview': { drop: 'removeApplication' },
        'listCountriesGroup grid#gridDestination dataview': { drop: 'insertCountry' },
        'listCountriesGroup grid#gridSource dataview': { drop: 'removeCountry' }
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
        Ext.widget('formGroup').down('form').loadRecord(Ext.create('flybox.model.Group'));
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
                    url: 'delete/delete_object.aspx',
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
                url: 'update/save_object.aspx',
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
                url: 'delete/delete_object.aspx',
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
                url: 'update/save_object.aspx',
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
                url: 'delete/delete_object.aspx',
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
                url: 'update/save_object.aspx',
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
                url: 'delete/delete_object.aspx',
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
        'listGroupsTracking button[action=insert]': { click: 'insert' },
        'listGroupsTracking button[action=clean]': { click: 'cleanFilters' },
        'listGroupsTracking': { itemdblclick: 'editDbl' },
        'listGroupsTracking actioncolumn[action=edit]': { click: 'edit' },
        'listGroupsTracking actioncolumn[action=remove]': { click: 'remove' },
        'formGroupTracking button[action=cancel]': { click: 'cancel' },
        'formGroupTracking button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formGroupTracking').down('form').loadRecord(Ext.create('flybox.model.GroupTracking'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('GroupTracking').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formGroupTracking').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formGroupTracking').down('form').loadRecord(r)
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idgrouptracking').getValue());
            b.up('form').getForm().submit({
                waitMsg: 'Guardando ...',
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title, msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function () {
                            Ext.getStore('GroupTracking').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    }, remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idgrouptracking'),
                        object: 'groupsTracking'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('GroupTracking').load()
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
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listInfoMethods button[action=insert]": { click: 'insert' },
        "listInfoMethods button[action=clean]": { click: 'cleanFilters' },
        "listInfoMethods": { itemdblclick: 'editDbl' },
        "listInfoMethods actioncolumn[action=edit]": { click: 'edit' },
        "listInfoMethods actioncolumn[action=remove]": { click: 'remove' },
        "formInfoMethod button[action=cancel]": { click: 'cancel' },
        "formInfoMethod button[action=save]": { click: 'save' }
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
        Ext.getStore("InfoMethod").load()
    },
    insert: function (a, c) {
        Ext.widget("formInfoMethod").down("form").loadRecord(Ext.create("flybox.model.InfoMethod"))
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formInfoMethod").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formInfoMethod").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idinfomethod").getValue());
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
                            Ext.getStore("InfoMethod").load()
                        }
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idinfomethod"),
                        object: "infoMethods"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("InfoMethod").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listLevelsAccess button[action=insert]': { click: 'insert' },
        'listLevelsAccess button[action=clean]': { click: 'cleanFilters' },
        'listLevelsAccess': { itemdblclick: 'editDbl' },
        'listLevelsAccess actioncolumn[action=edit]': { click: 'edit' },
        'listLevelsAccess actioncolumn[action=remove]': { click: 'remove' },
        'formLevelAccess button[action=cancel]': { click: 'cancel' },
        'formLevelAccess button[action=save]': { click: 'save' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    insert: function (b, e) {
        Ext.widget('formLevelAccess').down('form').loadRecord(Ext.create('flybox.model.LevelAccess'));
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
                    url: 'delete/delete_object.aspx',
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
        'listListCustomers button[action=insert]': { click: 'insert' },
        'listListCustomers button[action=clean]': { click: 'cleanFilters' },
        'listListCustomers': { itemdblclick: 'editDbl' },
        'listListCustomers actioncolumn[action=edit]': { click: 'edit' },
        'listListCustomers actioncolumn[action=remove]': { click: 'remove' },
        'formListCustomer button[action=cancel]': { click: 'cancel' },
        'formListCustomer button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formListCustomer').down('form').loadRecord(Ext.create('flybox.model.ListCustomer'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formListCustomer').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formListCustomer').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idlistcustomer').getValue());
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
                            Ext.getStore('ListCustomer').load();
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idlistcustomer'),
                        object: 'listCustomers'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('ListCustomer').load()
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
        'listLockers button[action=clean]': { click: 'cleanFilters' },
        'listLockers': { itemdblclick: 'editDbl' },
        'listLockers actioncolumn[action=user]': { click: 'user' },
        'listLockers actioncolumn[action=edit]': { click: 'edit' },
        'formLocker button[action=save]': { click: 'save' },
        'formLocker button[action=cancel]': { click: 'cancel' },
        'formLocker combo[name=idstatelocker]': { change: 'changeStateLocker' },
        'formCustomer combo[name=idtypelocker]': { change: 'changeTypeLocker' },
        'formCustomer combo[name=idcountry]': { change: 'changeCountry' },
        'formCustomer combo[name=idcity]': { change: 'changeCity' },
        'formCustomer combo[name=delivery_salepoint]': { change: 'changeDeliverySalePoint' },
        'formCustomer button[action=chageSecretQuestion]': { click: 'chageSecretQuestion' },
        'formCustomer button[action=changePassword]': { click: 'changePassword' },
        'formCustomer button[action=save]': { click: 'saveCustomer' },
        'formCustomer button[action=cancel]': { click: 'cancel' },
        'formCustomer button[action=addAuthorized]': { click: 'addAuthorizedAdmon' },
        'formCustomer grid actioncolumn[action=edit]': { click: 'editAuthorizedAdmon' },
        'formCustomer grid': { itemdblclick: 'editDblAuthorizedAdmon' },
        'formCustomer grid actioncolumn[action=remove]': { click: 'removeAuthorizedAdmon' },
        'formReportLocker button[action=save]': { click: 'saveReport' },
        'formReportLocker button[action=cancel]': { click: 'cancel' },
        'formReportBehavior button[action=save]': { click: 'saveReportBehavior' },
        'formReportBehavior button[action=cancel]': { click: 'cancel' },
        'formCustomerUserData combo[name=idtypelocker]': { change: 'changeTypeLockerUserData' },
        'formCustomerUserData combo[name=idcountry]': { change: 'changeCountryCustomer' },
        'formCustomerUserData combo[name=idcity]': { change: 'changeCityCustomer' },
        'formCustomerUserData combo[name=delivery_salepoint]': { change: 'changeDeliverySalePointCustomer' },
        'formCustomerUserData button[name=addAuthorized]': { click: 'addAuthorized' },
        'formCustomerUserData button[name=changeSecretQuestion]': { click: 'changeSecretQuestionCustomer' },
        'formCustomerUserData button[name=changePassword]': { click: 'changePasswordCustomer' },
        'formCustomerUserData button[name=save]': { click: 'saveCustomerData' },
        'formCustomerUserData grid actioncolumn[action=edit]': { click: 'editAuthorized' },
        'formCustomerUserData grid': { itemdblclick: 'editDblAuthorized' },
        'formCustomerUserData grid actioncolumn[action=remove]': { click: 'removeAuthorized' },
        'formAuthorized': { afterrender: 'afterRenderForm' },
        'formAuthorized button[action=save]': { click: 'saveAuthorized' },
        'formAuthorized button[action=cancel]': { click: 'cancel' },
        'formAuthorizedAdmon button[action=save]': { click: 'saveAuthorizedAdmon' },
        'formAuthorizedAdmon button[action=cancel]': { click: 'cancel' },
        'formChangeSecretQuestion': { afterrender: 'afterRenderForm' },
        'formChangeSecretQuestion button[action=save]': { click: 'saveChangeSecretQuestion' },
        'formChangeSecretQuestion button[action=cancel]': { click: 'cancel' },
        'formChangePasswordCustomer': { afterrender: 'afterRenderForm' },
        'formChangePasswordCustomer button[action=save]': { click: 'saveChangePassword' },
        'formChangePasswordCustomer button[action=cancel]': { click: 'cancel' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Locker').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('TypeLocker').load({
            callback: function () {
                Ext.getStore('StateLocker').load({
                    callback: function () {
                        Ext.getStore('RejectionReason').load({
                            callback: function () {
                                var form = Ext.widget('formLocker');
                                form.down('form').loadRecord(v.getStore().getAt(c));
                                form.down('form').getForm().findField('idtypelocker').setValue(v.getStore().getAt(c).get('type').idtypelocker);
                                form.down('form').getForm().findField('user').setValue(v.getStore().getAt(c).get('user').name);
                                form.down('form').getForm().findField('idstatelocker').setValue(v.getStore().getAt(c).get('stateLocker').idstatelocker);
                                form.down('form').getForm().findField('iduser').setValue(v.getStore().getAt(c).get('user').iduser);
                            }
                        })
                    }
                })
            }
        });
    },
    editDbl: function (g, r) {
        Ext.getStore('TypeLocker').load({
            callback: function () {
                Ext.getStore('StateLocker').load({
                    callback: function () {
                        Ext.getStore('RejectionReason').load({
                            callback: function () {
                                var form = Ext.widget('formLocker');
                                form.down('form').loadRecord(r);
                                form.down('form').getForm().findField('idtypelocker').setValue(r.get('type').idtypelocker);
                                form.down('form').getForm().findField('user').setValue(r.get('user').name);
                                form.down('form').getForm().findField('idstatelocker').setValue(r.get('stateLocker').idstatelocker);
                                form.down('form').getForm().findField('iduser').setValue(r.get('user').iduser);
                            }
                        })
                    }
                })
            }
        });
    },
    user: function (v, r, c, i, e) {
        var form = Ext.widget('formCustomer');
        var loadingMask = new Ext.LoadMask(form, { msg: "cargando" });
        loadingMask.show();
        Ext.getStore('Customer').getProxy().setExtraParam('iduser', v.getStore().getAt(c).get('user').iduser);
        Ext.getStore('Authorized').getProxy().setExtraParam('iduser', v.getStore().getAt(c).get('user').iduser);
        Ext.getStore('Authorized').load({
            callback: function () {
                Ext.getStore('Customer').load({
                    callback: function (s, re) {
                        Ext.getStore('TypeLocker').load({
                            callback: function () {
                                Ext.getStore('TypeID').load({
                                    callback: function () {
                                        Ext.getStore('Country').load({
                                            callback: function () {
                                                Ext.getStore('EconomySector').load({
                                                    start: 0,
                                                    limit: 100,
                                                    callback: function () {
                                                        Ext.getStore('Occupation').load({
                                                            start: 0,
                                                            limit: 100,
                                                            callback: function () {
                                                                Ext.getStore('InfoMethod').load({
                                                                    callback: function () {
                                                                        Ext.getStore('ListCustomer').load({
                                                                            callback: function () {
                                                                                form.down('form').loadRecord(s[0]);
                                                                                form.down('form').getForm().findField('idtypelocker').setValue(v.getStore().getAt(c).get('type').idtypelocker);
                                                                                form.down('form').getForm().findField('iduser').setValue(s[0].get('user').iduser);
                                                                                form.down('form').getForm().findField('id').setValue(s[0].get('user').iduser);
                                                                                form.down('form').getForm().findField('idtypeid').setValue(s[0].get('typeID').idtypeid);
                                                                                form.down('form').getForm().findField('facebookUserID').setValue(s[0].get('facebookUserID'));
                                                                                form.down('form').getForm().findField('identification').setValue(s[0].get('id'));
                                                                                form.down('form').getForm().findField('idcountry').setValue(s[0].get('country').idcountry);
                                                                                form.down('form').getForm().findField('idcity').setValue(s[0].get('city').idcity);
                                                                                form.down('form').getForm().findField('ideconomysector').setValue(s[0].get('economySector').ideconomysector);
                                                                                form.down('form').getForm().findField('delivery_salepoint').setValue((s[0].get('salePoint').idsalepoint == 0 ? 0 : 1));
                                                                                if (s[0].get('salePoint').idsalepoint != 0) {
                                                                                    Ext.getStore('SalePoint').getProxy().setExtraParam("idcity", s[0].get('city').idcity);
                                                                                    Ext.getStore('SalePoint').load({
                                                                                        callback: function () {
                                                                                            form.down('form').getForm().findField('idsalepoint').setValue(s[0].get('salePoint').idsalepoint);
                                                                                        }
                                                                                    })
                                                                                    form.down('form').getForm().findField('idsalepoint').setValue(s[0].get('salePoint').idsalepoint);
                                                                                }
                                                                                form.down('form').getForm().findField('idoccupation').setValue(s[0].get('occupation').idoccupation);
                                                                                form.down('form').getForm().findField('email').setValue(s[0].get('user').email);
                                                                                form.down('form').getForm().findField('idinfomethod').setValue(s[0].get('infoMethod').idinfomethod);
                                                                                form.down('form').getForm().findField('idlistcustomer').setValue(s[0].get('listCustomer').idlistcustomer);
                                                                                loadingMask.hide();
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
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    chageSecretQuestion: function (b, e) {
        Ext.getStore('SecretQuestion').load({
            callback: function () {
                Ext.create('Ext.window.Window', {
                    title: 'Cambiar pregunta y respuesta recreta',
                    iconCls: 'edit',
                    width: 300,
                    modal: true,
                    layout: 'fit',
                    autoShow: true,
                    items: [{
                        xtype: 'form',
                        url: 'update/save_object.aspx',
                        defaults: {
                            labelAlign: 'right'
                        },
                        frame: true,
                        items: [{
                            xtype: 'hiddenfield',
                            name: 'iduser',
                            value: b.up('form').getForm().findField('iduser').getValue()
                        }, {
                            xtype: 'hiddenfield',
                            name: 'id',
                            value: 0
                        }, {
                            xtype: 'hiddenfield',
                            name: 'object',
                            value: 'changeSecretQuestion'
                        }, {
                            xtype: 'combo',
                            name: 'idsecretquestion',
                            forceSelection: true,
                            typeAhead: true,
                            allowBlank: false,
                            store: 'SecretQuestion',
                            fieldLabel: 'Pregunta secreta *',
                            valueField: 'idsecretquestion',
                            displayField: 'name',
                            queryMode: 'local'
                        }, {
                            xtype: 'textfield',
                            name: 'secret_answer',
                            inputType: 'password',
                            value: '',
                            allowBlank: true,
                            fieldLabel: 'Respuesta secreta *'
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
            }
        });
    },
    changePassword: function (b, e) {
        Ext.create('Ext.window.Window', {
            title: 'Cambiar contrase\xf1a',
            iconCls: 'edit',
            width: 300,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                xtype: 'form',
                url: 'update/change_user_pass.aspx',
                defaults: {
                    labelAlign: 'right'
                },
                frame: true,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'iduser',
                    value: b.up('form').getForm().findField('iduser').getValue()
                }, {
                    xtype: 'textfield',
                    name: 'pass',
                    itemId: 'pass',
                    regex: /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9_-]{8,})$/,
                    regexText: 'La contrase\xf1a debe tener n\xfameros y letras y m\xednimo 8 caracteres',
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
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idlocker').getValue());
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
                            Ext.getStore('Locker').load();
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
    saveReport: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open("./reports/" + d.msg.file, "_blank");
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
    saveReportBehavior: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open("./reports/" + d.msg.file, "_blank");
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
    saveCustomer: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up("form").getForm().findField('id').setValue(b.up("form").getForm().findField('iduser').getValue());
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
                            Ext.getStore('Locker').load();
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
    changeTypeLocker: function (c, n, o, op) {
        if (n == 1) {
            c.up('form').getForm().findField('name').setVisible(true);
            c.up('form').getForm().findField('name').setFieldLabel('Nombres *');
            c.up('form').getForm().findField('lastname').setVisible(true);
            c.up('form').getForm().findField('lastname').allowBlank = false;
            c.up('form').getForm().findField('idtypeid').setVisible(true);
            c.up('form').getForm().findField('idtypeid').allowBlank = false;
            c.up('form').getForm().findField('identification').setFieldLabel('Identificaci\xf3n *');
            c.up('form').getForm().findField('identification').setVisible(true);
            c.up('form').getForm().findField('idcountry').setVisible(true);
            c.up('form').getForm().findField('idcity').setVisible(true);
            c.up('form').getForm().findField('ideconomysector').setVisible(false);
            c.up('form').getForm().findField('ideconomysector').allowBlank = true;
            c.up('form').getForm().findField('delivery_salepoint').setVisible(true);
            c.up('form').getForm().findField('address').setVisible(true);
            c.up('form').getForm().findField('homePhone').setVisible(true);
            c.up('form').getForm().findField('phone').setVisible(true);
            c.up('form').getForm().findField('nameContact').setVisible(false);
            c.up('form').getForm().findField('nameContact').allowBlank = true;
            c.up('form').getForm().findField('phoneContact').setVisible(false);
            c.up('form').getForm().findField('phoneContact').allowBlank = true;
            c.up('form').getForm().findField('idoccupation').setVisible(true);
            c.up('form').getForm().findField('email').setVisible(true);
            c.up('form').getForm().findField('alternateEmail').setVisible(true);
            c.up('form').getForm().findField('idoccupation').setVisible(true);
            c.up('form').getForm().findField('idoccupation').allowBlank = false;
            c.up('form').getForm().findField('birthday').setVisible(true);
            c.up('form').getForm().findField('birthday').allowBlank = false;
            c.up('form').getForm().findField('lifemiles').setVisible(true);
            c.up('form').getForm().findField('idinfomethod').setVisible(true);
        } else {
            c.up('form').getForm().findField('name').setVisible(true);
            c.up('form').getForm().findField('name').setFieldLabel('Nombre compa\xf1\xeda *');
            c.up('form').getForm().findField('lastname').setVisible(false);
            c.up('form').getForm().findField('lastname').allowBlank = true;
            c.up('form').getForm().findField('idtypeid').setVisible(false);
            c.up('form').getForm().findField('idtypeid').allowBlank = true;
            c.up('form').getForm().findField('identification').setFieldLabel('NIT *');
            c.up('form').getForm().findField('identification').setVisible(true);
            c.up('form').getForm().findField('idcountry').setVisible(true);
            c.up('form').getForm().findField('idcity').setVisible(true);
            c.up('form').getForm().findField('ideconomysector').setVisible(true);
            c.up('form').getForm().findField('ideconomysector').allowBlank = false;
            c.up('form').getForm().findField('delivery_salepoint').setVisible(true);
            c.up('form').getForm().findField('address').setVisible(true);
            c.up('form').getForm().findField('homePhone').setVisible(true);
            c.up('form').getForm().findField('phone').setVisible(true);
            c.up('form').getForm().findField('email').setVisible(true);
            c.up('form').getForm().findField('alternateEmail').setVisible(true);
            c.up('form').getForm().findField('nameContact').setVisible(true);
            c.up('form').getForm().findField('nameContact').allowBlank = false;
            c.up('form').getForm().findField('phoneContact').setVisible(true);
            c.up('form').getForm().findField('phoneContact').allowBlank = false;
            c.up('form').getForm().findField('idoccupation').setVisible(false);
            c.up('form').getForm().findField('idoccupation').allowBlank = true;
            c.up('form').getForm().findField('birthday').setVisible(false);
            c.up('form').getForm().findField('birthday').allowBlank = true;
            c.up('form').getForm().findField('lifemiles').setVisible(true);
            c.up('form').getForm().findField('idinfomethod').setVisible(true);
        }
    },
    changeStateLocker: function (c, n, o, op) {
        if (n == 2) {
            c.up('form').getForm().findField('dateReject').setVisible(true);
            c.up('form').getForm().findField('idrejectionreason').setVisible(true);
            c.up('form').getForm().findField('idrejectionreason').allowBlank = false;
        } else {
            c.up('form').getForm().findField('dateReject').setVisible(false);
            c.up('form').getForm().findField('idrejectionreason').setVisible(false);
            c.up('form').getForm().findField('idrejectionreason').allowBlank = true;
        }
    },
    changeCountry: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('City').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('City').load({
                start: 0,
                limit: 10000
            });
        }
    },
    changeCity: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('SalePoint').getProxy().setExtraParam('idcity', n);
            Ext.getStore('SalePoint').load();
        }
    },
    changeDeliverySalePoint: function (c, n, o, op) {
        if (n == 1) {
            c.up('form').getForm().findField('idsalepoint').setVisible(true);
            c.up('form').getForm().findField('address').setVisible(false);
            c.up('form').getForm().findField('address').allowBlank = true;
            c.up('form').getForm().findField('idsalepoint').allowBlank = false;
        } else {
            c.up('form').getForm().findField('idsalepoint').setVisible(false);
            c.up('form').getForm().findField('address').setVisible(true);
            c.up('form').getForm().findField('address').allowBlank = false;
            c.up('form').getForm().findField('idsalepoint').allowBlank = true;
        }
    },
    changeTypeLockerUserData: function (r, n, o, op) {
        if (n == 1) {
            r.up("form").getForm().findField("type_locker").setValue("<h2>Registro de cliente personal</h2>");
            r.up("form").getForm().findField("type_locker").setVisible(true);
            r.up("form").getForm().findField("basic_data").setVisible(true);
            r.up("form").getForm().findField("name").setVisible(true);
            r.up("form").getForm().findField("name").setFieldLabel("Nombres *");
            r.up("form").getForm().findField("lastname").setVisible(true);
            r.up("form").getForm().findField("lastname").allowBlank = false;
            r.up("form").getForm().findField("idtypeid").setVisible(true);
            r.up("form").getForm().findField("idtypeid").allowBlank = false;
            r.up("form").getForm().findField("identification").setFieldLabel("Identificaci\xf3n *");
            r.up("form").getForm().findField("identification").setVisible(true);
            r.up("form").getForm().findField("idcountry").setVisible(true);
            r.up("form").getForm().findField("idcity").setVisible(true);
            r.up("form").getForm().findField("ideconomysector").setVisible(false);
            r.up("form").getForm().findField("ideconomysector").allowBlank = true;
            r.up("form").getForm().findField("shipping_data").setVisible(true);
            r.up("form").getForm().findField("delivery_salepoint").setVisible(true);
            r.up("form").getForm().findField("address").setVisible(true);
            r.up("form").getForm().findField("homePhone").setVisible(true);
            r.up("form").getForm().findField("phone").setVisible(true);
            r.up("form").getForm().findField("contact_data").setValue("<h2>Datos personales</h2>");
            r.up("form").getForm().findField("contact_data").setVisible(true);
            r.up("form").getForm().findField("leyend").setVisible(true);
            r.up("form").getForm().findField("nameContact").setVisible(false);
            r.up("form").getForm().findField("nameContact").allowBlank = true;
            r.up("form").getForm().findField("phoneContact").setVisible(false);
            r.up("form").getForm().findField("phoneContact").allowBlank = true;
            r.up("form").getForm().findField("idoccupation").setVisible(true);
            r.up("form").getForm().findField("email").setVisible(true);
            r.up("form").getForm().findField("alternateEmail").setVisible(true);
            r.up("form").getForm().findField("idoccupation").setVisible(true);
            r.up("form").getForm().findField("idoccupation").allowBlank = false;
            r.up("form").getForm().findField("birthday").setVisible(true);
            r.up("form").getForm().findField("birthday").allowBlank = false;
            r.up("form").getForm().findField("lifemiles").setVisible(true);
            r.up("form").getForm().findField("idinfomethod").setVisible(true)
        } else {
            r.up("form").getForm().findField("type_locker").setValue("<h2>Registro de cliente empresarial</h2>");
            r.up("form").getForm().findField("type_locker").setVisible(true);
            r.up("form").getForm().findField("basic_data").setVisible(true);
            r.up("form").getForm().findField("name").setVisible(true);
            r.up("form").getForm().findField("name").setFieldLabel("Nombre compa\xf1\xeda *");
            r.up("form").getForm().findField("lastname").setVisible(false);
            r.up("form").getForm().findField("lastname").allowBlank = true;
            r.up("form").getForm().findField("idtypeid").setVisible(false);
            r.up("form").getForm().findField("idtypeid").allowBlank = true;
            r.up("form").getForm().findField("identification").setFieldLabel("NIT *");
            r.up("form").getForm().findField("identification").setVisible(true);
            r.up("form").getForm().findField("idcountry").setVisible(true);
            r.up("form").getForm().findField("idcity").setVisible(true);
            r.up("form").getForm().findField("ideconomysector").setVisible(true);
            r.up("form").getForm().findField("ideconomysector").allowBlank = false;
            r.up("form").getForm().findField("shipping_data").setVisible(true);
            r.up("form").getForm().findField("delivery_salepoint").setVisible(true);
            r.up("form").getForm().findField("address").setVisible(true);
            r.up("form").getForm().findField("homePhone").setVisible(true);
            r.up("form").getForm().findField("phone").setVisible(true);
            r.up("form").getForm().findField("contact_data").setValue("<h2>Datos de contacto</h2>");
            r.up("form").getForm().findField("contact_data").setVisible(true);
            r.up("form").getForm().findField("leyend").setVisible(true);
            r.up("form").getForm().findField("email").setVisible(true);
            r.up("form").getForm().findField("alternateEmail").setVisible(true);
            r.up("form").getForm().findField("nameContact").setVisible(true);
            r.up("form").getForm().findField("nameContact").allowBlank = false;
            r.up("form").getForm().findField("phoneContact").setVisible(true);
            r.up("form").getForm().findField("phoneContact").allowBlank = false;
            r.up("form").getForm().findField("idoccupation").setVisible(false);
            r.up("form").getForm().findField("idoccupation").allowBlank = true;
            r.up("form").getForm().findField("birthday").setVisible(false);
            r.up("form").getForm().findField("birthday").allowBlank = true;
            r.up("form").getForm().findField("lifemiles").setVisible(true);
            r.up("form").getForm().findField("idinfomethod").setVisible(true)
        }
    },
    changeCountryCustomer: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_City').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('FE_City').load({
                start: 0,
                limit: 10000
            });
        }
    },
    changeCityCustomer: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_SalePoint').getProxy().setExtraParam("idcity", n);
            Ext.getStore('FE_SalePoint').load()
        }
    },
    changeDeliverySalePointCustomer: function (r, q, m, p) {
        if (q == 1) {
            r.up("form").getForm().findField("idsalepoint").setVisible(true);
            r.up("form").getForm().findField("address").setVisible(false);
            r.up("form").getForm().findField("address").allowBlank = true;
            r.up("form").getForm().findField("idsalepoint").allowBlank = false
        } else {
            r.up("form").getForm().findField("idsalepoint").setVisible(false);
            r.up("form").getForm().findField("address").setVisible(true);
            r.up("form").getForm().findField("address").allowBlank = false;
            r.up("form").getForm().findField("idsalepoint").allowBlank = true
        }
    },
    addAuthorized: function (b, e) {
        if (Ext.getStore('FE_Authorized').getCount() < 3) {
            Ext.widget('formAuthorized').down('form').loadRecord(Ext.create('flybox.model.Athorized'));
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Solo puede adicionar un m\xe1ximo de 3 autorizaciones',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    editAuthorized: function (v, r, c, i, e) {
        Ext.widget('formAuthorized').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDblAuthorized: function (g, r) {
        Ext.widget('formAuthorized').down('form').loadRecord(r);
    },
    removeAuthorized: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el autorizado?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'ajax/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idauthorized'),
                        object: 'authorized'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('FE_Authorized').load()
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
    addAuthorizedAdmon: function (b, e) {
        if (Ext.getStore('Authorized').getCount() < 3) {
            var form = Ext.widget('formAuthorizedAdmon');
            form.down('form').loadRecord(Ext.create('flybox.model.Authorized'));
            form.down('form').getForm().findField('iduser').setValue(Ext.getStore('Authorized').getProxy().extraParams.iduser);
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Solo puede adicionar un m\xe1ximo de 3 autorizaciones',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    editAuthorizedAdmon: function (v, r, c, i, e) {
        var form = Ext.widget('formAuthorizedAdmon');
        form.down('form').loadRecord(v.getStore().getAt(c));
        form.down('form').getForm().findField('iduser').setValue(v.getStore().getAt(c).get('user').iduser);
    },
    editDblAuthorizedAdmon: function (g, r) {
        var form = Ext.widget('formAuthorizedAdmon');
        form.down('form').loadRecord(r);
        form.down('form').getForm().findField('iduser').setValue(r.get('user').iduser);
    },
    removeAuthorizedAdmon: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el autorizado?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idauthorized'),
                        object: 'authorizeds'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Authorized').load()
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
    afterRenderForm: function (w, o) {
        w.setPosition(Ext.getBody().getWidth() / 2 - w.getWidth() / 2, (document.documentElement || document.body).scrollTop + 100);
    },
    saveAuthorized: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idauthorized').getValue());
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
                            Ext.getStore('FE_Authorized').load();
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
    saveAuthorizedAdmon: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idauthorized').getValue());
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
                            Ext.getStore('Authorized').load();
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
    saveChangeSecretQuestion: function (o, e) {
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
    },
    changeSecretQuestionCustomer: function (b, e) {
        Ext.widget('formChangeSecretQuestion');
    },
    changePasswordCustomer: function (b, e) {
        Ext.widget('formChangePasswordCustomer');
    },
    saveChangePassword: function (o, e) {
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
    },
    saveCustomerData: function (m, n) {
        if (m.up("form").getForm().isValid()) {
            m.up("form").getForm().findField('id').setValue(m.up("form").getForm().findField('iduser').getValue());
            m.up("form").getForm().submit({
                waitMsg: "Guardando ...",
                success: function (q, r, u) {
                    var s = Ext.JSON.decode(r.response.responseText);
                    Ext.MessageBox.show({
                        title: s.msg.title,
                        msg: s.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function () {
                            window.location = 'verpaquetesporautorizar.aspx';
                        }
                    })
                },
                failure: function (o, q) {
                    var r = Ext.JSON.decode(q.response.responseText);
                    Ext.MessageBox.show({
                        title: r.msg.title,
                        msg: r.msg.body,
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
        'listMeasuringsSystem button[action=insert]': { click: 'insert' },
        'listMeasuringsSystem button[action=clean]': { click: 'cleanFilters' },
        'listMeasuringsSystem': { itemdblclick: 'editDbl' },
        'listMeasuringsSystem actioncolumn[action=group]': { click: 'group' },
        'listMeasuringsSystem actioncolumn[action=edit]': { click: 'edit' },
        'listMeasuringsSystem actioncolumn[action=remove]': { click: 'remove' },
        'formMeasuringSystem button[action=cancel]': { click: 'cancel' },
        'formMeasuringSystem button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formMeasuringSystem').down('form').loadRecord(Ext.create('flybox.model.MeasuringSystem'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('MeasuringSystem').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formMeasuringSystem').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formMeasuringSystem').down('form').loadRecord(r)
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idmeasuringsystem').getValue());
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
                            Ext.getStore('MeasuringSystem').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idmeasuringsystem'),
                        object: 'measuringsSystem'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('MeasuringSystem').load()
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
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        /*Administración*/
        'menu menuitem[action=users]': { click: 'users' },
        'menu menuitem[action=groups]': { click: 'groups' },
        'menu menuitem[action=apps]': { click: 'apps' },
        'menu menuitem[action=levelsAccess]': { click: 'levelsAccess' },
        'menu menuitem[action=typesLocker]': { click: 'typesLocker' },
        'menu menuitem[action=typesID]': { click: 'typesID' },
        'menu menuitem[action=moneys]': { click: 'moneys' },
        'menu menuitem[action=measuringsSystem]': { click: 'measuringsSystem' },
        'menu menuitem[action=countries]': { click: 'countries' },
        'menu menuitem[action=occupations]': { click: 'occupations' },
        'menu menuitem[action=economySectors]': { click: 'economySectors' },
        'menu menuitem[action=secretQuestions]': { click: 'secretQuestions' },
        'menu menuitem[action=infoMethods]': { click: 'infoMethods' },
        'menu menuitem[action=typesPackage]': { click: 'typesPackage' },
        'menu menuitem[action=templates]': { click: 'templates' },
        'menu menuitem[action=lockers]': { click: 'lockers' },
        'menu menuitem[action=rejectionReasons]': { click: 'rejectionReasons' },
        'menu menuitem[action=statesTracking]': { click: 'statesTracking' },
        'menu menuitem[action=groupsTracking]': { click: 'groupsTracking' },
        'menu menuitem[action=deliveryCompanies]': { click: 'deliveryCompanies' },
        'menu menuitem[action=wareHouses]': { click: 'wareHouses' },
        'menu menuitem[action=products]': { click: 'products' },
        'menu menuitem[action=listCustomers]': { click: 'listCustomers' },
        'menu menuitem[action=provides]': { click: 'provides' },
        'menu menuitem[action=typesUbication]': { click: 'typesUbication' },
        'menu menuitem[action=payments]': { click: 'payments' },
        'menu menuitem[action=printers]': { click: 'printers' },
        /*Operaciones*/
        'menu menuitem[action=enterPackage]': { click: 'enterPackage' },
        'menu menuitem[action=enteredPackages]': { click: 'enteredPackages' },
        'menu menuitem[action=authorizedPackages]': { click: 'authorizedPackages' },
        'menu menuitem[action=dispatchs]': { click: 'dispatchs' },
        'menu menuitem[action=receivePackages]': { click: 'receivePackages' },
        'menu menuitem[action=receivedPackages]': { click: 'receivedPackages' },
        'menu menuitem[action=pendings]': { click: 'pendingPackages' },
        'menu menuitem[action=prealerts]': { click: 'prealerts' },
        'menu menuitem[action=requestsPending]': { click: 'requestsPending' },
        'menu menuitem[action=dgPackages]': { click: 'dgPackages' },
        'menu menuitem[action=missings]': { click: 'missings' },
        'menu menuitem[action=admonPackages]': { click: 'admonPackages' },
        'menu menuitem[action=picking]': { click: 'listPackagesPicking' },
        /*Reportes*/
        'menu menuitem[action=miles]': { click: 'miles' },
        'menu menuitem[action=rptAuthorized]': { click: 'rptAuthorized' },
        'menu menuitem[action=rptAllPackage]': { click: 'rptAllPackage' },
        'menu menuitem[action=rptProductivity]': { click: 'rptProductivity' },
        'menu menuitem[action=rptLocker]': { click: 'rptLocker' },
        'menu menuitem[action=rptBehavior]': { click: 'rptBehavior' },
        'menu menuitem[action=storageAbandonment]': { click: 'storageAbandonment' },
        'menu menuitem[action=rptReceivedPackages]': { click: 'rptReceivedPackages' },
        'menu menuitem[action=rptPackageNoAuthorized]': { click: 'rptPackageNoAuthorized' },
        /*CMS*/
        'menu menuitem[action=typesResource]': { click: 'typesResource' },
        'menu menuitem[action=resources]': { click: 'resources' },
        'menu menuitem[action=pages]': { click: 'pages' },
        /*Aplicación*/
        'menu menuitem[action=changePass]': { click: 'changePass' },
        'menu menuitem[action=printerUser]': { click: 'printerUser' },
        'menu menuitem[action=logout]': { click: 'logout' }
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
                        url: 'stores/list_objects.aspx',
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
                                                                        var _package = Ext.create('flybox.model.Package', {
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
                url: 'update/user_pass.aspx',
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
                    url: "stores/list_objects.aspx",
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
        window.location = 'logout.aspx'
    },
    openGrid: function (grid) {
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.' + grid) {
                opened = true;
                panel = n
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
            url: 'stores/list_objects.aspx',
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
        url: 'stores/list_objects.aspx',
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
        'listMoneys button[action=insert]': { click: 'insert' },
        'listMoneys button[action=clean]': { click: 'cleanFilters' },
        'listMoneys': { itemdblclick: 'editDbl' },
        'listMoneys actioncolumn[action=group]': { click: 'group' },
        'listMoneys actioncolumn[action=edit]': { click: 'edit' },
        'listMoneys actioncolumn[action=remove]': { click: 'remove' },
        'formMoney button[action=cancel]': { click: 'cancel' },
        'formMoney button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formMoney').down('form').loadRecord(Ext.create('flybox.model.Money'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formMoney').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formMoney').down('form').loadRecord(r)
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
                            Ext.getStore('Money').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
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
                                Ext.getStore('Money').load()
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
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listOccupations button[action=insert]": { click: "insert" },
        "listOccupations button[action=clean]": { click: 'cleanFilters' },
        "listOccupations": { itemdblclick: 'editDbl' },
        "listOccupations actioncolumn[action=edit]": { click: 'edit' },
        "listOccupations actioncolumn[action=remove]": { click: 'remove' },
        "formOccupation button[action=cancel]": { click: 'cancel' },
        "formOccupation button[action=save]": { click: 'save' }
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
        Ext.getStore("Occupation").load()
    },
    insert: function (a, c) {
        Ext.widget("formOccupation").down("form").loadRecord(Ext.create("flybox.model.Occupation"))
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formOccupation").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formOccupation").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idoccupation").getValue()); a.up("form").getForm().submit({ waitMsg: "Guardando ...", success: function (b, e, g) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore("Occupation").load() } }); a.up("window").close() }, failure: function (b, e) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); a.up("window").close() } })
        } else {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Ingrese los datos correctos",
                buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR
            })
        }
    },
    remove: function (a, d, g, b, f) {
        Ext.MessageBox.confirm("Eliminar registro", "¿Desea eliminar el registro?", function (c) {
            if (c == "yes") {
                Ext.Ajax.request({
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idoccupation"),
                        object: "occupations"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({ title: h.msg.title, msg: h.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore("Occupation").load() } })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listPrealertPackages button[action=insert]': { click: 'insert' },
        'listPrealertPackages button[action=clean]': { click: 'cleanFilters' },
        'listPrealertPackages': { itemdblclick: 'editDbl' },
        'listPrealertPackages actioncolumn[action=edit]': { click: 'edit' },
        'formPrealertPackage button[action=cancel]': { click: 'cancel' },
        'formPrealertPackage numberfield[name=lenght]': { change: 'calcWeightVolumen' },
        'formPrealertPackage numberfield[name=height]': { change: 'calcWeightVolumen' },
        'formPrealertPackage numberfield[name=width]': { change: 'calcWeightVolumen' },
        'formPrealertPackage combo[name=idtypepackage]': { change: 'changeTypePackage' },
        'listEnteredPackages button[action=clean]': { click: 'cleanFiltersEntereds' },
        'listEnteredPackages actioncolumn[action=reallowLocker]': { click: 'reallowLocker' },
        'listEnteredPackages actioncolumn[action=print]': { click: 'printLabel' },
        'listDGPackages actioncolumn[action=print]': { click: 'printLabel' },
        'listDGPackages actioncolumn[action=reEnterDG]': { click: 'reEnterDG' },
        'listPendingPackages actioncolumn[action=print]': { click: 'printLabel' },
        'listPendingPackages button[action=export]': { click: '_export' },
        'formEnterPackage numberfield[name=idlocker]': { change: 'changeLocker' },
        'formEnterPackage numberfield[name=lenght]': { change: 'calcWeightVolumen' },
        'formEnterPackage numberfield[name=height]': { change: 'calcWeightVolumen' },
        'formEnterPackage numberfield[name=width]': { change: 'calcWeightVolumen' },
        'formEnterPackage combo[name=idcountry]': { change: 'changeCountry' },
        'formEnterPackage combo[name=idtypepackage]': { change: 'changeTypePackage' },
        'formEnterPackage button[action=cancel]': { click: 'cancel' },
        'formEnterPackage button[action=insert]': { click: 'insertItem' },
        'formEnterPackage grid actioncolumn[action=edit]': { click: 'editItem' },
        'formEnterPackage grid actioncolumn[action=remove]': { click: 'removeItem' },
        'formEnterPackage grid': { itemdblclick: 'editDblItem' },
        'formEnterPackage button[action=save]': { click: 'ubicatePackage' },
        'formEnterPackage combo[name=idtypeubication]': { change: 'changeTypeUbication' },
        'formItem button[action=save]': { click: 'saveItem' },
        'formItem button[action=saveAndNew]': { click: 'saveItemAndNew' },
        'formItem button[action=cancel]': { click: 'cancel' },
        'formUbicationPackage button[action=save]': { click: 'enterPackage' },
        'formFilterCountryAuthorizePackage combo[name=country]': { change: 'changeCountryFilter' },
        'formFilterCountryAuthorizePackage combo[name=city]': { change: 'changeCityFilter' },
        'formFilterCountryAuthorizedPackage combo[name=country]': { change: 'changeCountryFilter' },
        'formFilterCountryAuthorizedPackage combo[name=city]': { change: 'changeCityFilter1' },
        'formFilterCountryDispatchedPackage combo[name=country]': { change: 'changeCountryFilter' },
        'formFilterCountryDispatchedPackage button[text=Buscar]': { click: 'findDispatched' },
        'listEnteredPackagesCustomer actioncolumn[action=edit]': { click: 'editEnteredPackage' },
        'listEnteredPackagesCustomer button[text=Despachar]': { click: 'dispatchPackages' },
        'formEditEnteredPackage combo[name=idtypepackage]': { change: 'changeTypePackageAuthorize' },
        'formEditEnteredPackage button[action=cancel]': { click: 'cancel' },
        'formEditEnteredPackage grid': { beforerender: 'onShowGridItems' },
        'formEditEnteredPackage button[text=Guardar]': { click: 'savePackageEntered' },
        'formSecurityStamp button[action=save]': { click: 'saveAutoDispatch' },
        'formSecurityStamp button[action=cancel]': { click: 'cancel' },
        'listAuthorizedPackages button[action=clean]': { click: 'cleanFiltersAuthorizeds' },
        'listAuthorizedPackages actioncolumn[action=missing]': { click: 'missingAuthorized' },
        'listPendingPackages actioncolumn[action=allow]': { click: 'allowLocker' },
        'listPendingPackages actioncolumn[action=returnPackage]': { click: 'returnPackage1' },
        'formDispatchPackage button[action=cancel]': { click: 'cancel' },
        'formDispatchPackage button[action=save]': { click: 'saveDispatch' },
        'listDisconsolidatePackage button[text=Desconsolidar]': { click: 'disconsolidate' },
        'formReportAuthorized button[action=save]': { click: 'saveReportAuthorized' },
        'formReportAuthorized button[action=cancel]': { click: 'cancel' },
        'formReportAllPackage button[action=save]': { click: 'saveReportAllPackage' },
        'formReportAllPackage button[action=cancel]': { click: 'cancel' },
        'formReportReceivedPackages button[action=save]': { click: 'saveReportReceivedPackages' },
        'formReportReceivedPackages button[action=cancel]': { click: 'cancel' },
        'formReportProductivity button[action=save]': { click: 'saveReportProductivity' },
        'formReportProductivity button[action=cancel]': { click: 'cancel' },
        'listAdmonPackages actioncolumn[action=changeState]': { click: 'changeState' },
        'listAdmonPackages actioncolumn[action=returnPackage]': { click: 'returnPackage' },
        'listAdmonPackages actioncolumn[action=edit]': { click: 'editPackage' },
        'listAdmonPackages actioncolumn[action=remove]': { click: 'removePackage' },
        'formChangeStatePackage button[action=save]': { click: 'saveChangeStatePackage' },
        'formChangeStatePackage button[action=cancel]': { click: 'cancel' },
        'listReceivedPackages actioncolumn[action=returnPackage]': { click: 'returnPackage' },
        'formEditPackage button[action=save]': { click: 'saveEditPackage' },
        'formEditPackage button[action=cancel]': { click: 'cancel' },
        'formEditPackage numberfield[name=idlocker]': { change: 'changeLocker' },
        'formEditPackage numberfield[name=lenght]': { change: 'calcWeightVolumenEdit' },
        'formEditPackage numberfield[name=height]': { change: 'calcWeightVolumenEdit' },
        'formEditPackage numberfield[name=width]': { change: 'calcWeightVolumenEdit' },
        'formEditPackage combo[name=idtypepackage]': { change: 'changeTypePackage' },
        'formEditPackage button[action=insert]': { click: 'insertItem' },
        'formEditPackage grid actioncolumn[action=edit]': { click: 'editItem' },
        'formEditPackage grid actioncolumn[action=remove]': { click: 'removeItem' },
        'formEditPackage grid': { itemdblclick: 'editDblItem' },
        'formEditPackage combo[name=idtypeubication]': { change: 'changeTypeUbication' },
    },
    insert: function (b, e) {
        Ext.getStore('CountryOrigin').load({
            start: 0,
            limit: 100,
            callback: function () {
                Ext.getStore('TypePackage').load({
                    start: 0,
                    limit: 100,
                    callback: function () {
                        var form = Ext.widget('formEnterPackage');
                        form.down('form').loadRecord(Ext.create('flybox.model.PrealertPackage'));
                        form.down('form').getForm().findField('idlocker').setValue(Ext.getStore('PrealertPackage').getProxy().extraParams.idlocker);
                        form.down('form').getForm().findField('idcountry').select(Ext.getStore('CountryOrigin').getAt(0));
                        Ext.getStore('City').getProxy().setExtraParam('idcountry', Ext.getStore('CountryOrigin').getAt(0).get('idcountry'));
                        Ext.getStore('City').load({
                            start: 0,
                            limit: 100,
                            callback: function () {
                                form.down('form').getForm().findField('idcityorigin').select(Ext.getStore('City').getAt(0));
                                form.down('form').getForm().findField('user').setValue(Ext.util.Cookies.get('user_locker'));
                            }
                        });
                    }
                });
            }
        });
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('PrealertPackage').load();
    },
    cleanFiltersEntereds: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('EnteredPackage').load();
    },
    cleanFiltersAuthorizeds: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('AuthorizedPackage').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('Product').getProxy().setExtraParam('idpackage', v.getStore().getAt(c).get('idpackage'));
        Ext.getStore('Product').load();
        Ext.getStore('TypePackage').load({
            start: 0,
            limit: 100,
            callback: function () {
                var form = Ext.widget('formPrealertPackage').down('form').loadRecord(v.getStore().getAt(c))
                if (v.getStore().getAt(c).get('idcityorigin') == 4) {
                    form.findField('weight').setFieldLabel('Peso (Lb.)');
                } else {
                    form.findField('weight').setFieldLabel('Peso (Kg.)');
                }
                form.findField('idtypepackage').fireEvent('change', form.findField('idtypepackage'));
            }
        });
    },
    editDbl: function (g, r) {
        Ext.getStore('Product').getProxy().setExtraParam('idpackage', r.get('idpackage'));
        Ext.getStore('Product').load();
        Ext.getStore('TypePackage').load({
            start: 0,
            limit: 100,
            callback: function () {
                var form = Ext.widget('formPrealertPackage').down('form').loadRecord(r);
                if (r.get('idcityorigin') == 4) {
                    form.findField('weight').setFieldLabel('Peso (Lb.)');
                } else {
                    form.findField('weight').setFieldLabel('Peso (Kg.)');
                }
                form.findField('idtypepackage').fireEvent('change', form.findField('idtypepackage'));
            }
        });
    },
    calcWeightVolumen: function (nf, n, o, op) {
        var originalTypeUbication = nf.up('form').getForm().findField('idtypeubication').getValue();
        var lenght = nf.up('form').getForm().findField('lenght').getValue();
        var height = nf.up('form').getForm().findField('height').getValue();
        var width = nf.up('form').getForm().findField('width').getValue();
        if (nf.up('form').getForm().findField('idcityorigin').getValue() == 4) {
            nf.up('form').getForm().findField('weightVolumen').setValue(((lenght * height * width) / 5000) * 2.2);
        } else {
            nf.up('form').getForm().findField('weightVolumen').setValue((lenght * height * width) / 5000);
        }
        if ((lenght > 50 || height > 50 || width > 50) && originalTypeUbication != 3) {
            nf.up('form').getForm().findField('idtypeubication').setValue(2);
        } else {
            nf.up('form').getForm().findField('idtypeubication').setValue(originalTypeUbication);
        }
    },
    changeTypeUbication: function (c, n, o, opt) {
        if (Ext.isNumber(n)) {
            switch (n) {
                case 1:
                    c.up('window').setTitle('Ingresar paquete - Normal');
                    c.up('form').getForm().findField('idlocker').setVisible(true);
                    c.up('form').getForm().findField('lenght').minValue = 0;
                    c.up('form').getForm().findField('height').minValue = 0;
                    c.up('form').getForm().findField('width').minValue = 0;
                    c.up('form').getForm().findField('weightVolumen').minValue = 0;
                    break;
                case 2:
                    c.up('window').setTitle('Ingresar paquete - Sobredimensionado');
                    c.up('form').getForm().findField('idlocker').setVisible(true);
                    c.up('form').getForm().findField('lenght').minValue = 0;
                    c.up('form').getForm().findField('height').minValue = 0;
                    c.up('form').getForm().findField('width').minValue = 0;
                    c.up('form').getForm().findField('weightVolumen').minValue = 0;
                    break;
                case 3:
                    c.up('window').setTitle('Ingresar paquete - Pendiente');
                    c.up('form').getForm().findField('idlocker').setVisible(false);
                    c.up('form').getForm().findField('lenght').minValue = 0;
                    c.up('form').getForm().findField('height').minValue = 0;
                    c.up('form').getForm().findField('width').minValue = 0;
                    c.up('form').getForm().findField('weightVolumen').minValue = 0;
                    break;
                case 4:
                    c.up('window').setTitle('Ingresar paquete - Mercanc\xeda peligrosa');
                    c.up('form').getForm().findField('idlocker').setVisible(true);
                    c.up('form').getForm().findField('lenght').minValue = 0;
                    c.up('form').getForm().findField('height').minValue = 0;
                    c.up('form').getForm().findField('width').minValue = 0;
                    c.up('form').getForm().findField('weightVolumen').minValue = 0;
                    break;
                case 5:
                    c.up('window').setTitle('Ingresar paquete - Sobres');
                    c.up('form').getForm().findField('idlocker').setVisible(true);
                    c.up('form').getForm().findField('lenght').minValue = 0;
                    c.up('form').getForm().findField('height').minValue = 0;
                    c.up('form').getForm().findField('width').minValue = 0;
                    c.up('form').getForm().findField('weightVolumen').minValue = 0;
                    break;
                default:
                    c.up('window').setTitle('Ingresar paquete - Indeterminado');
                    c.up('form').getForm().findField('idlocker').setVisible(true);
                    c.up('form').getForm().findField('lenght').minValue = 0;
                    c.up('form').getForm().findField('height').minValue = 0;
                    c.up('form').getForm().findField('width').minValue = 0;
                    c.up('form').getForm().findField('weightVolumen').minValue = 0;
                    break;
            }
        }
    },
    changeTypePackage: function (c, n, o, opt) {
        if (n == null) {
            if (c.up('form').getForm().findField('idcityorigin').getValue() == 4) {
                c.up('form').getForm().findField('weight').setMaxValue(110);
            } else {
                c.up('form').getForm().findField('weight').setMaxValue(50);
            }
        }
        if (n == 1) {
            if (c.up('form').getForm().findField('idcityorigin').getValue() == 4) {
                c.up('form').getForm().findField('weight').setMaxValue(1);
            } else {
                c.up('form').getForm().findField('weight').setMaxValue(50);
            }
        } else {
            if (c.up('form').getForm().findField('idcityorigin').getValue() == 4) {
                c.up('form').getForm().findField('weight').setMaxValue(110);
            } else {
                c.up('form').getForm().findField('weight').setMaxValue(50);
            }
        }
    },
    changeLocker: function (c, n, o, op) {
        Ext.Ajax.request({
            url: 'stores/list_objects.aspx',
            method: 'get',
            params: {
                locker: n,
                object: 'authorizationsLocker'
            },
            success: function (t) {
                var d = Ext.JSON.decode(t.responseText);
                var authorizeds = "";
                Ext.each(d.data, function (i, ix, a) {
                    if (authorizeds != "") {
                        authorizeds += ",";
                    }
                    authorizeds += i.name;
                });
                c.up('form').getForm().findField('authorizeds').setValue(authorizeds);
            },
            failed: function (t, p, o) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'No se pudo cargar las personas autorizadas a usar este casillero',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },
    editItem: function (v, r, c, i, e) {
        var form = Ext.widget('formItem');
        form.down('form').loadRecord(v.getStore().getAt(c));
        form.down('form').getForm().findField('idpackage').setValue(v.up('form').getForm().findField('idpackage').getValue());
        form.down('form').getForm().findField('description').focus();
    },
    editDblItem: function (g, r) {
        var form = Ext.widget('formItem');
        form.down('form').loadRecord(r);
        form.down('form').getForm().findField('idpackage').setValue(g.up('form').getForm().findField('idpackage').getValue());
        form.down('form').getForm().findField('description').focus();
    },
    removeItem: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('iditem'),
                        object: 'items'
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Item').load()
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
    insertItem: function (b, e) {
        var form = Ext.widget('formItem');
        form.down('form').loadRecord(Ext.create('flybox.model.Item'));
        form.down('form').getForm().findField('idpackage').setValue(b.up('form').getForm().findField('idpackage').getValue());
        form.down('form').getForm().findField('description').focus();
    },
    saveItem: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('iditem').getValue());
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
                            Ext.getStore('Item').load();
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
    saveItemAndNew: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('iditem').getValue());
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
                            Ext.getStore('Item').load();
                        }
                    });
                    var form = Ext.widget('formItem');
                    form.down('form').loadRecord(Ext.create('flybox.model.Item'));
                    form.down('form').getForm().findField('idpackage').setValue(b.up('form').getForm().findField('idpackage').getValue());
                    form.down('form').getForm().findField('description').focus();
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
    ubicatePackage: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            Ext.util.Cookies.set('lastTypeUbication', b.up('form').getForm().findField('idtypeubication').getValue());
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idpackage').getValue());
            if (Ext.getStore('Item').getCount() < 1 && b.up('form').getForm().findField('idtypeubication').getValue() != 3) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Debe ingresar al menos un \xedtem',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            } else {
                if (b.up('form').getForm().findField('idlocker').getValue() == 0 && b.up('form').getForm().findField('idtypeubication').getValue() != 3) {//No ingresó casillero
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'Debe ingresar el n\xfamero del casillero',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                } else {
                    var values = b.up('form').getValues();
                    if (b.up('form').getForm().findField('autodispatch').getValue() == 1 && b.up('form').getForm().findField('idpayment').getValue() == 1 && b.up('form').getForm().findField('idtypeubication').getValue() != 4) {//Es despacho automático, pago en efectivo y no es DG
                        var formSecurityStamp = Ext.widget('formSecurityStamp');
                        formSecurityStamp.down('form').getForm().findField('weight').setValue(values.weight);
                        formSecurityStamp.down('form').getForm().findField('lenght').setValue(values.lenght);
                        formSecurityStamp.down('form').getForm().findField('height').setValue(values.height);
                        formSecurityStamp.down('form').getForm().findField('width').setValue(values.width);
                        formSecurityStamp.down('form').getForm().findField('idpackage').setValue(values.idpackage);
                        b.up('window').close();
                    } else {
                        Ext.getStore('WareHouse').load({
                            callback: function (s) {
                                var form = Ext.widget('formUbicationPackage');
                                form.setVisible(false);

                                form = form.down('form').getForm();
                                form.findField('idtypeubication').setValue(values.idtypeubication);
                                form.findField('id').setValue(values.idpackage);
                                form.findField('idpackage').setValue(values.idpackage);
                                form.findField('idcityorigin').setValue(values.idcityorigin);
                                form.findField('iddeliverycompany').setValue(values.iddeliverycompany);
                                form.findField('idlocker').setValue(values.idlocker);
                                form.findField('idproduct').setValue(values.idproduct);
                                form.findField('idtypepackage').setValue(values.idtypepackage);
                                form.findField('lenght').setValue(values.lenght);
                                form.findField('height').setValue(values.height);
                                form.findField('weight').setValue(values.weight);
                                form.findField('width').setValue(values.width);
                                form.findField('observations').setValue(values.observations);
                                form.findField('provide').setValue(values.provide);
                                form.findField('tracking').setValue(values.tracking);
                                form.findField('consolidate').setValue(values.consolidate);
                                Ext.Ajax.request({
                                    url: 'stores/list_objects.aspx',
                                    method: 'get',
                                    params: {
                                        object: 'ubicatePackage',
                                        lenght: values.lenght,
                                        height: values.height,
                                        width: values.width,
                                        idtypeubication: values.idtypeubication,
                                        idlocker: values.idlocker
                                    },
                                    success: function (t) {
                                        var du = Ext.JSON.decode(t.responseText);
                                        Ext.getStore('Ubication').getProxy().setExtraParam('idwarehouse', du.data[0].warehouse.idwarehouse);
                                        Ext.getStore('Ubication').load({
                                            start: 0,
                                            limit: 20000,
                                            callback: function (s) {
                                                form.findField('idwarehouse').setValue(du.data[0].warehouse.idwarehouse);
                                                form.findField('idubication').setValue(du.data[0].idubication);
                                                form.submit({
                                                    waitMsg: 'Guardando ...',
                                                    success: function (z, p, o) {
                                                        var d = Ext.JSON.decode(p.response.responseText);
                                                        Ext.MessageBox.show({
                                                            title: d.msg.title,
                                                            msg: d.msg.body,
                                                            buttons: Ext.Msg.OK,
                                                            icon: Ext.Msg.INFO
                                                        });
                                                        Ext.getStore('PendingPackage').load();
                                                        Ext.getStore('ReceivePackage').load();
                                                        Ext.MessageBox.prompt('Tracking No.',
                                                            'Ingrese el tracking al que se le desea hacer el ingreso',
                                                            function (bu, nt, opt) {
                                                                if (bu == "ok" && nt != "") {
                                                                    if (nt.substr(0, 8) == "42033126" && nt.length > 28) {
                                                                        nt = nt.substr(8, nt.length);
                                                                    }
                                                                    Ext.Ajax.request({
                                                                        url: 'stores/list_objects.aspx',
                                                                        method: 'get',
                                                                        params: {
                                                                            tracking: nt,
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
                                                                                                                        var form1 = Ext.widget('formEnterPackage');
                                                                                                                        var _package = Ext.create('flybox.model.Package', {
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
                                                                                                                        form1.down('form').loadRecord(_package);
                                                                                                                        form1.down('form').getForm().findField('idlocker').setReadOnly(_package.get('locker').idlocker != 0);
                                                                                                                        form1.down('form').getForm().findField('prealerted').setValue(_package.get('locker').idlocker != 0);
                                                                                                                        form1.down('form').getForm().findField('idcityorigin').setValue(_package.get('cityOrigin').idcity);
                                                                                                                        form1.down('form').getForm().findField('iddeliverycompany').setValue(_package.get('deliveryCompany').iddeliverycompany);
                                                                                                                        form1.down('form').getForm().findField('idpayment').setValue(_package.get('payment').idpayment);
                                                                                                                        form1.down('form').getForm().findField('idpayment').setReadOnly(true);
                                                                                                                        form1.down('form').getForm().findField('provide').setValue(_package.get('provide').idprovide);
                                                                                                                        form1.down('form').getForm().findField('provide').setReadOnly(_package.get('locker').idlocker != 0);
                                                                                                                        form1.down('form').getForm().findField('idproduct').setValue(_package.get('product').idproduct);
                                                                                                                        form1.down('form').getForm().findField('idlocker').setValue(_package.get('locker').idlocker);
                                                                                                                        form1.down('form').getForm().findField('idtypepackage').setValue(_package.get('typePackage').idtypepackage);
                                                                                                                        form1.down('form').getForm().findField('autodispatch').setReadOnly(true);
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
                                                                        failed: function (q, p, o) {
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
                        b.up('window').close();
                    }
                }
            }
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    enterPackage: function (b, e) {
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
                        icon: Ext.Msg.INFO
                    });
                    b.up('window').close();
                    Ext.getStore('PendingPackage').load();
                    Ext.getStore('ReceivePackage').load();
                    Ext.MessageBox.prompt('Tracking No.',
                        'Ingrese el tracking al que se le desea hacer el ingreso',
                        function (b, nt, opt) {
                            if (b == "ok" && nt != "") {
                                if (nt.substr(0, 8) == "42033126" && nt.length > 28) {
                                    nt = nt.substr(8, nt.length);
                                }
                                Ext.Ajax.request({
                                    url: 'stores/list_objects.aspx',
                                    method: 'get',
                                    params: {
                                        tracking: nt,
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
                                                                                    var _package = Ext.create('flybox.model.Package', {
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
                                                                                    form.down('form').getForm().findField('idtypeubication').setValue(1);
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
                                    failed: function (q, p, o) {
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
    changeCountryFilter: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_City').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('FE_City').load({
                callback: function (s) {
                    c.up('form').getForm().findField('city').setValue(s[0].get('idcity'));
                    declaredValueMax = c.findRecordByValue(n).get('maxValueDeclared');
                    idcountry = c.findRecordByValue(n).get('idcountry');
                }
            });
        }
    },
    changeCityFilter: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_EnteredPackage').getProxy().setExtraParam('idcityorigin', n);
            Ext.getStore('FE_EnteredPackage').load({
                start: 0,
                limit: 1000
            });
        }
    },
    changeCityFilter1: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_AuthorizedPackage').getProxy().setExtraParam('idcityorigin', n);
            Ext.getStore('FE_AuthorizedPackage').load();
        }
    },
    editEnteredPackage: function (v, r, c, i, e) {
        Ext.getStore('FE_TypePackage').load({
            start: 0,
            limit: 100,
            callback: function () {
                Ext.getStore('FE_Item').getProxy().setExtraParam('idpackage', v.getStore().getAt(c).get('idpackage'));
                Ext.getStore('FE_Item').load({
                    callback: function () {
                        Ext.getStore('FE_Product').load({
                            callback: function () {
                                var form = Ext.widget('formEditEnteredPackage');
                                form.down('form').getForm().findField('idtypepackage').setValue(v.getStore().getAt(c).get('typePackage').idtypepackage);
                                form.down('form').getForm().findField('observations').setValue(v.getStore().getAt(c).get('observations'));
                                form.down('form').getForm().findField('weight').setValue(v.getStore().getAt(c).get('weight'));
                                form.down('form').getForm().findField('idproduct').setValue(v.getStore().getAt(c).get('product').idproduct);
                                form.setPosition(Ext.getBody().getWidth() / 2 - form.getWidth() / 2, (document.documentElement || document.body).scrollTop + 100);
                            }
                        });
                    }
                });
            }
        });
    },
    changeTypePackageAuthorize: function (c, n, o, op) {
        if (n == 1) {
            c.up('form').down('grid').columns[2].setVisible(false);
        } else {
            c.up('form').down('grid').columns[2].setVisible(true);
        }
    },
    onShowGridItems: function (grid) {
        if (Ext.getStore('FE_Item').getAt(0).get('idtypepackage') == 1) {
            grid.headerCt.getGridColumns()[2].setVisible(false);
        } else {
            grid.headerCt.getGridColumns()[2].setVisible(true);
        }
    },
    savePackageEntered: function (b) {
        if (b.up('form').getForm().findField('idtypepackage').getValue() == 1 && b.up('form').getForm().findField('weight').getValue() > 1) {
            Ext.MessageBox.alert('Error', 'No se puede cambiar el tipo de env\xedo ya que el paquete excede el peso m\xe1ximo para documentos');
        }
        else {
            var declaredValue = 0;
            var totalDeclared = 0;
            var valid = true;
            if (b.up('form').getForm().findField('idtypepackage').getValue() != 1) {
                Ext.getStore('FE_Item').each(function (i) {
                    if (i.get('unitValue') < 1 || i.get('unitValue') > declaredValueMax) {
                        valid = false;
                    } else {
                        totalDeclared += (i.get('amount') * i.get('unitValue'));
                    }
                });
            }
            if (valid) {
                if (totalDeclared > declaredValueMax) {
                    Ext.MessageBox.alert('Error', 'La suma total del valor declarado no puede ser superior a ' +
                    (idcountry == 2 ? 'US$ ' + declaredValueMax : declaredValueMax + ' \u20AC'));
                } else {
                    Ext.getStore('FE_Item').each(function (i) {
                        declaredValue += i.get('amount') * i.get('unitValue');
                        Ext.Ajax.request({
                            url: 'ajax/save_object.aspx',
                            params: {
                                object: 'declaredValueItem',
                                iditem: i.get('iditem'),
                                id: i.get('iditem'),
                                unitValue: i.get('unitValue')
                            }
                        });
                    });
                    Ext.Ajax.request({
                        url: 'ajax/save_object.aspx',
                        params: {
                            object: 'updateTypePackageEntered',
                            idpackage: Ext.getStore('FE_Item').getProxy().extraParams.idpackage,
                            id: Ext.getStore('FE_Item').getProxy().extraParams.idpackage,
                            declaredValue: declaredValue,
                            idtypepackage: b.up('form').getForm().findField('idtypepackage').getValue(),
                            observations: b.up('form').getForm().findField('observations').getValue()
                        },
                        success: function (t) {
                            var d = Ext.JSON.decode(t.responseText);
                            Ext.MessageBox.show({
                                title: d.msg.title,
                                msg: d.msg.body,
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.INFO,
                                fn: function () {
                                    Ext.getStore('FE_EnteredPackage').load();
                                    b.up('window').close();
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
            } else {
                Ext.MessageBox.alert('Error', 'Rectifica los valores declarados');
            }
        }
    },
    dispatchPackages: function (b) {
        if (mustCompleteData) {
            Ext.MessageBox.alert('Error', 'Completa tu informaci\xf3n personal en la pesta\xf1a "Mis Datos" para poder despachar tus paquetes', function () { window.location = 'datosusuario.aspx' });
        } else {
            if (b.up('grid').getSelectionModel().getSelection().length == 0) {
                Ext.MessageBox.alert('Error', 'Debes seleccionar al menos un paquete a despachar');
            } else {
                Ext.MessageBox.confirm('Despachar paquetes', '¿Desea despachar estos paquetes?', function (o) {
                    if (o == 'yes') {
                        var valid = true;
                        var totalAutorized = 0;
                        var totalDaysStorage = 0;
                        var packages = "";
                        var hasDocuments = false;
                        var hasPackages = false;
                        var hasOthers = false;
                        var difPosAra = false;
                        var difProduct = false;
                        var actProduct = 0;
                        var notConsolidables = 0;
                        Ext.Array.each(b.up('grid').getSelectionModel().getSelection(), function (i) {
                            if (i.get('storage') < 0) {
                                totalDaysStorage += (0 - i.get('storage'));
                            }
                            if (actProduct == 0) {
                                actProduct = i.get('product').idproduct;
                            } else {
                                if (i.get('product').idproduct != actProduct) {
                                    difProduct = true;
                                }
                            }
                            if (packages != "") {
                                packages += ",";
                            }
                            packages += i.get('idpackage');
                            if (i.get('declaredValue') == 0 && i.get('typePackage').idtypepackage != 1) {
                                valid = false;
                            } else {
                                totalAutorized += i.get('declaredValue');
                            }
                            if (i.get('typePackage').idtypepackage == 1) {
                                hasDocuments = true;
                            }
                            if (i.get('typePackage').idtypepackage == 2) {
                                hasPackages = true;
                            }
                            if (i.get('typePackage').idtypepackage > 2) {
                                hasOthers = true;
                            }
                            if (hasOthers && hasDocuments) {
                                difPosAra = true;
                            }
                            if (hasOthers && hasPackages) {
                                difPosAra = true;
                            }
                            if (!i.get('consolidate')) {
                                notConsolidables++;
                            }
                        });
                        if (notConsolidables > 0 && b.up('grid').getSelectionModel().getCount() > 1) {
                            Ext.MessageBox.alert('Error', 'No puede consolidar los paquetes marcados como no consolidables');
                        } else {
                            if (difProduct) {
                                Ext.MessageBox.alert('Error', 'No puede seleccionar paquetes de distintos tipos de productos');
                            } else {
                                if (!valid) {
                                    Ext.MessageBox.alert('Error', 'Todos los paquetes seleccionados deben tener valor declarado');
                                } else {
                                    if (totalAutorized > declaredValueMax) {
                                        Ext.MessageBox.alert('Error', 'La suma total del valor declarado no puede ser superior a ' +
                                        (idcountry == 2 ? 'US$ ' + declaredValueMax : declaredValueMax + ' \u20AC'));
                                    } else {
                                        if (difPosAra) {
                                            Ext.MessageBox.alert('Error', 'Los paquetes seleccionados no deben tener diferentes tipos de env\xedo');
                                        } else {
                                            Ext.Ajax.request({
                                                url: 'ajax/save_object.aspx',
                                                params: {
                                                    id: 0,
                                                    object: 'authorizePackages',
                                                    packages: packages
                                                },
                                                success: function (response) {
                                                    var d = Ext.JSON.decode(response.responseText);
                                                    var wMessageAuthorize = Ext.create('Ext.window.MessageBox', {
                                                        modal: true,
                                                        bodyStyle: 'background: transparent; padding: 10px; margin: 3px;',
                                                        html: d.msg.body,
                                                        buttons: [{
                                                            text: 'Cambiar direcci\xf3n',
                                                            handler: function () {
                                                                Ext.getStore('FE_CityDelivery').load({
                                                                    start: 0,
                                                                    limit: 10000,
                                                                    callback: function () {
                                                                        var formChangeAddress = Ext.create('Ext.window.Window', {
                                                                            title: 'Cambiar direcci\xf3n',
                                                                            width: 400,
                                                                            //height: 400,
                                                                            modal: true,
                                                                            layout: 'fit',
                                                                            autoShow: true,
                                                                            items: [{
                                                                                xtype: 'form',
                                                                                url: 'ajax/update_address_dispatch.aspx',
                                                                                defaults: {
                                                                                    labelAlign: 'right',
                                                                                    width: 350
                                                                                },
                                                                                frame: true,
                                                                                items: [{
                                                                                    xtype: 'panel',
                                                                                    html: '* Campos obligatorios',
                                                                                    border: 0,
                                                                                    padding: 10
                                                                                }, {
                                                                                    xtype: 'combo',
                                                                                    name: 'idcity',
                                                                                    store: 'FE_CityDelivery',
                                                                                    forceSelection: true,
                                                                                    fieldLabel: 'Ciudad *',
                                                                                    valueField: 'idcity',
                                                                                    typeAhead: true,
                                                                                    displayField: 'name',
                                                                                    allowBlank: false,
                                                                                    queryMode: 'local',
                                                                                    listeners: {
                                                                                        change: function (c, n, o, op) {
                                                                                            if (Ext.isNumber(n)) {
                                                                                                Ext.getStore('FE_SalePoint').getProxy().setExtraParam('idcity', n);
                                                                                                Ext.getStore('FE_SalePoint').load({
                                                                                                    scope: this,
                                                                                                    callback: function (r, o, s) {
                                                                                                        if (r.length == 0) {
                                                                                                            formChangeAddress.down('form').getForm().findField('idsalepoint').setDisabled(true);
                                                                                                        } else {
                                                                                                            formChangeAddress.down('form').getForm().findField('idsalepoint').setDisabled(false);
                                                                                                        }
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }, {
                                                                                    xtype: 'combo',
                                                                                    name: 'idsalepoint',
                                                                                    store: 'FE_SalePoint',
                                                                                    typeAhead: true,
                                                                                    fieldLabel: 'Punto de venta',
                                                                                    valueField: 'idsalepoint',
                                                                                    displayField: 'name',
                                                                                    queryMode: 'local',
                                                                                    listeners: {
                                                                                        change: function (c, n, o, op) {
                                                                                            if (Ext.isNumber(n)) {
                                                                                                c.up('form').getForm().findField('address').setVisible(false);
                                                                                            } else {
                                                                                                c.up('form').getForm().findField('address').setVisible(true);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }, {
                                                                                    xtype: 'textfield',
                                                                                    name: 'address',
                                                                                    value: '',
                                                                                    fieldLabel: 'Direcci\xf3n *'
                                                                                }]
                                                                            }],
                                                                            buttons: [{
                                                                                text: 'Cambiar',
                                                                                handler: function (b) {
                                                                                    if (!Ext.isNumber(formChangeAddress.down('form').getForm().findField('idsalepoint').getValue()) &&
                                                                                        formChangeAddress.down('form').getForm().findField('address').getValue() == '') {
                                                                                        Ext.MessageBox.show({
                                                                                            title: 'Error',
                                                                                            msg: 'Ingrese los datos correctos',
                                                                                            buttons: Ext.Msg.OK,
                                                                                            icon: Ext.Msg.ERROR
                                                                                        })
                                                                                    } else {
                                                                                        if (formChangeAddress.down('form').getForm().isValid()) {
                                                                                            formChangeAddress.down('form').getForm().submit({
                                                                                                waitMsg: 'Guardando ...',
                                                                                                success: function (t, p, o) {
                                                                                                    var d = Ext.JSON.decode(p.response.responseText);
                                                                                                    var nameCity = d.nameCity;
                                                                                                    var address = d.address;
                                                                                                    document.getElementById('cityDelivery').innerHTML = nameCity;
                                                                                                    document.getElementById('addressDelivery').innerHTML = address;
                                                                                                    Ext.MessageBox.show({
                                                                                                        title: d.msg.title,
                                                                                                        msg: d.msg.body,
                                                                                                        buttons: Ext.Msg.OK,
                                                                                                        icon: Ext.Msg.INFO
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
                                                                                    }
                                                                                }
                                                                            }, {
                                                                                text: 'Cancelar',
                                                                                handler: function (b) {
                                                                                    b.up('window').close();
                                                                                }
                                                                            }]
                                                                        });
                                                                        formChangeAddress.show();
                                                                    }
                                                                });
                                                            }
                                                        }, {
                                                            text: 'Autorizar',
                                                            handler: function () {
                                                                Ext.Ajax.request({
                                                                    url: 'ajax/save_object.aspx',
                                                                    params: {
                                                                        confirm: 1,
                                                                        id: 0,
                                                                        object: 'authorizePackages'
                                                                    },
                                                                    success: function (response) {
                                                                        var d = Ext.JSON.decode(response.responseText);
                                                                        Ext.MessageBox.show({
                                                                            title: d.msg.title,
                                                                            msg: d.msg.body,
                                                                            buttons: Ext.Msg.OK,
                                                                            icon: Ext.Msg.INFO,
                                                                            fn: function () {
                                                                                Ext.getStore('FE_EnteredPackage').load();
                                                                            }
                                                                        });
                                                                        wMessageAuthorize.close();
                                                                        wMessageAuthorize.destroy();
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
                                                        }, {
                                                            text: 'Cancelar',
                                                            handler: function () {
                                                                wMessageAuthorize.close();
                                                                wMessageAuthorize.destroy();
                                                            }
                                                        }]
                                                    });
                                                    wMessageAuthorize.show({
                                                        title: d.msg.title,
                                                        width: 440,
                                                        height: 450
                                                    });
                                                },
                                                failed: function (t, p, o) {
                                                    var d = Ext.JSON.decode(response.responseText);
                                                    Ext.MessageBox.show({
                                                        title: d.msg.title,
                                                        msg: d.msg.body,
                                                        buttons: Ext.Msg.OK,
                                                        icon: Ext.Msg.INFO
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
        }
    },
    saveAutoDispatch: function (b, o) {
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
                        icon: Ext.Msg.INFO
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
    allowLocker: function (v, r, c, i, e) {
        Ext.Ajax.request({
            url: 'stores/list_objects.aspx',
            method: 'get',
            params: {
                idpackage: v.getStore().getAt(c).get('idpackage'),
                object: 'packagePending'
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
                                                    var form = Ext.widget('formEnterPackage');
                                                    var _package = Ext.create('flybox.model.Package', {
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
                                                    form.down('form').getForm().findField('idtypeubication').setValue(1);
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
                                                    Ext.getStore('Item').getProxy().setExtraParam('idpackage', _package.get('idpackage'));
                                                    Ext.getStore('Item').load();
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
    },
    removePending: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idpackage'),
                        object: 'pendings'
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('PendingPackage').load()
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
    saveDispatch: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('group').getValue());
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
                            Ext.getStore('AuthorizedPackage').load();
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
    disconsolidate: function (b, e) {
        Ext.MessageBox.confirm('Despachar paquetes', '¿Desea desconsolidar estos paquetes?', function (o) {
            if (o == 'yes') {
                var packagesDisconsolidated = "";
                Ext.Array.each(b.up('window').down('grid').getSelectionModel().getSelection(), function (i) {
                    if (packagesDisconsolidated != "") {
                        packagesDisconsolidated += ",";
                    }
                    packagesDisconsolidated += i.get('idpackage');
                });
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: packagesDisconsolidated,
                        object: 'groupPackage'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('GroupPackage').load();
                                Ext.getStore('AuthorizedPackage').load();
                                b.up('window').close();
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
    missingAuthorized: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Reportar paquete', '¿Desea reportar el paquete como perdido?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idpackage'),
                        object: 'missing'
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('AuthorizedPackage').load();
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
    findDispatched: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            Ext.getStore('FE_Dispatch').getProxy().setExtraParam('idcityorigin', b.up('form').getForm().findField('city').getValue());
            Ext.getStore('FE_Dispatch').getProxy().setExtraParam('date_begin', b.up('form').getForm().findField('date_begin').getValue());
            Ext.getStore('FE_Dispatch').getProxy().setExtraParam('date_end', b.up('form').getForm().findField('date_end').getValue());
            Ext.getStore('FE_Dispatch').load();
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    saveReportAuthorized: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open('reports/' + d.msg.file);
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
    printLabel: function (v, r, c, i, e) {
        Ext.Ajax.request({
            url: 'update/save_object.aspx',
            params: {
                object: 'printLabel',
                id: v.getStore().getAt(c).get('idpackage')
            },
            success: function (t) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
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
    },
    saveReportAllPackage: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open('reports/' + d.msg.file);
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
    saveReportProductivity: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open("reports/" + d.msg.file, "_blank");
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
    saveReportReceivedPackages: function (b, e) {
        if (b.up('form').getForm().isValid()) {
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
                            window.open('reports/' + d.msg.file);
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
    reallowLocker: function (v, r, c, i, e) {
        Ext.MessageBox.prompt('Reubicar paquete', 'Ingrese el casillero al que desae mover el paquete', function (b, l, o) {
            if (b == "ok" && Ext.isNumeric(l)) {
                Ext.Ajax.request({
                    url: 'update/save_object.aspx',
                    params: {
                        object: 'reallowLocker',
                        id: v.getStore().getAt(c).get('idpackage'),
                        idlocker: l
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('EnteredPackage').load();
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
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Ingrese un n\xfamero de casillero v\xe1lido',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },
    calcWeightVolumenEdit: function (nf, n, o, op) {
        var lenght = nf.up('form').getForm().findField('lenght').getValue();
        var height = nf.up('form').getForm().findField('height').getValue();
        var width = nf.up('form').getForm().findField('width').getValue();
        if (nf.up('form').getForm().findField('idcityorigin').getValue() == 4) {
            nf.up('form').getForm().findField('weightVolumen').setValue(((lenght * height * width) / 5000) * 2.2);
        } else {
            nf.up('form').getForm().findField('weightVolumen').setValue((lenght * height * width) / 5000);
        }
    },
    editPackage: function (v, r, c, i, e) {
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
                                        Ext.getStore('Item').getProxy().setExtraParam('idpackage', v.getStore().getAt(c).get('idpackage'));
                                        Ext.getStore('Item').load({
                                            callback: function () {
                                                var form = Ext.widget('formEditPackage');
                                                form.down('form').loadRecord(v.getStore().getAt(c));
                                                form.down('form').getForm().findField('idlocker').setValue(v.getStore().getAt(c).get('locker').idlocker);
                                                form.down('form').getForm().findField('idcityorigin').setValue(v.getStore().getAt(c).get('cityOrigin').idcity);
                                                form.down('form').getForm().findField('idtypepackage').setValue(v.getStore().getAt(c).get('typePackage').idtypepackage);
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
    },
    removePackage: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar paquete', '¿Desea eliminar el paquete?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idpackage'),
                        object: 'admonPackages'
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('AdmonPackage').load()
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
    saveEditPackage: function (b, e) {
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
                            Ext.getStore('AdmonPackage').load();
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
    returnPackage: function (v, r, c, i, e) {
        Ext.MessageBox.prompt('Retornar paquete', 'Ingrese el motivo por el cual se debe retornar el paquete', function (b, l, o) {
            if (b == "ok" && l != "") {
                Ext.Ajax.request({
                    url: 'update/save_object.aspx',
                    params: {
                        object: 'returnPackage',
                        id: v.getStore().getAt(c).get('idpackage'),
                        observations: l
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('AdmonPackage').load();
                                Ext.getStore('ReceivePackage').load();
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
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Ingrese el motivo',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },
    changeState: function (v, r, c, i, e) {
        var form = Ext.widget('formChangeStatePackage');
        form.down('form').getForm().findField('idpackage').setValue(v.getStore().getAt(c).get('idpackage'));
        form.down('form').getForm().findField('idstatepackage').setValue(v.getStore().getAt(c).get('statePackage').idstatepackage);
    },
    saveChangeStatePackage: function (b, e) {
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
                            Ext.getStore('AdmonPackage').load();
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
    returnPackage1: function (v, r, c, i, e) {
        Ext.MessageBox.prompt('Retornar paquete', 'Ingrese el motivo por el cual se debe retornar el paquete', function (b, l, o) {
            if (b == "ok" && l != "") {
                Ext.Ajax.request({
                    url: 'update/save_object.aspx',
                    params: {
                        object: 'returnPackage1',
                        id: v.getStore().getAt(c).get('idpackage'),
                        observations: l
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('PendingPackage').load();
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
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Ingrese el motivo',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },
    reEnterDG: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Reingresar paquete', '¿Desea reingresar el paquete como normal?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'update/save_object.aspx',
                    params: {
                        object: 'reEnterDG',
                        id: v.getStore().getAt(c).get('idpackage')
                    },
                    success: function (t) {
                        var d = Ext.JSON.decode(t.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                        Ext.getStore('DGPackage').load();
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
    _export: function () {
        Ext.Ajax.request({
            url: 'stores/list_objects.aspx',
            method: 'get',
            params: {
                object: 'rptPendings'
            },
            success: function (t, p, o) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function () {
                        window.open("./reports/" + d.msg.file, "_blank")
                    }
                });
                b.up('window').close()
            },
            failure: function (t, p) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listPages button[action=insert]': { click: 'insert' },
        'listPages button[action=clean]': { click: 'cleanFilters' },
        'listPages': { itemdblclick: 'editDbl' },
        'listPages actioncolumn[action=edit]': { click: 'edit' },
        'listPages actioncolumn[action=remove]': { click: 'remove' },
        'formPage button[action=cancel]': { click: 'cancel' },
        'formPage button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formPage').down('form').loadRecord(Ext.create('flybox.model.Page'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Page').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formPage');
        form.down('form').loadRecord(v.getStore().getAt(c));
        form.down('form').getForm().findField('html').setValue(v.getStore().getAt(c).get('html'))
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formPage');
        form.down('form').loadRecord(r);
        form.down('form').getForm().findField('html').setValue(r.get('html'))
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idpage').getValue());
            b.up('form').getForm().submit({
                waitMsg: 'Guardando ...',
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO, fn: function () {
                            Ext.getStore('Page').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idpage'),
                        object: 'pages'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Page').load()
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
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listPayments button[action=insert]": { click: 'insert' },
        "listPayments button[action=clean]": { click: 'cleanFilters' },
        "listPayments": { itemdblclick: 'editDbl' },
        "listPayments actioncolumn[action=edit]": { click: 'edit' },
        "listPayments actioncolumn[action=remove]": { click: 'remove' },
        "formPayment button[action=cancel]": { click: 'cancel' },
        "formPayment button[action=save]": { click: 'save' }
    },
    insert: function (a, c) {
        Ext.widget("formPayment").down("form").loadRecord(Ext.create("flybox.model.Payment"))
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters()
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formPayment").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formPayment").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idpayment").getValue());
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
                            Ext.getStore("Payment").load()
                        }
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idpayment"),
                        object: "payments"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("Payment").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listPrealerts button[action=clean]': { click: 'cleanFilters' },
        'listPrealerts actioncolumn[action=remove]': { click: 'remove' },
        'formPreviewValue combo[name=country]': { change: 'changeCountry' },
        'formPreviewValue button[text=Calcular]': { click: 'previewCost' },
        'formPrealert combo[name=country]': { change: 'changeCountryPrealert' },
        'formPrealert combo[name=idcitydelivery]': { change: 'changeCityDeliveryPrealert' },
        'formPrealert combo[name=typePackage]': { change: 'changeTypePackage' },
        'formPrealert combo[name=delivery_salepoint]': { change: 'changeDeliverySalePoint' },
        'formPrealert combo[name=idsalepoint]': { change: 'changeSalePoint' },
        'formPrealert #newsArticles button[name=addArticle]': { click: 'addArticle' },
        'formPrealert button[text=Prealertar]': { click: 'savePrealert' },
        'formPrealert button[text=Cancelar]': { click: 'cancelPrealert' },
        'formPrealert textfield[name=tracking]': { change: 'changeTracking' },
        'formPrealert radiofield[name=autodispatch]': { change: 'changeAutodispatch' },
        'listPrealertsCustomer button[action=clean]': { click: 'cleanFilters' },
        'listPrealertsCustomer button[action=insert]': { click: 'FE_insert' },
        'listPrealertsCustomer actioncolumn[action=remove]': { click: 'FE_remove' },
        'formFilterCountryPrealert combo[name=country]': { change: 'changeCountryFilter' },
        'formFilterCountryPrealert combo[name=city]': { change: 'changeCityFilter' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idprealert'),
                        object: 'prealerts'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Prealert').load()
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
    changeCountry: function (c, n, o, op) {
        if (n == 2) {
            c.up('form').getForm().findField('weight').setFieldLabel('Peso (Lb.) *');
            c.up('form').getForm().findField('declaredValue').setFieldLabel('Valor declarado (US$) *');
        } else {
            c.up('form').getForm().findField('weight').setFieldLabel('Peso (Kg.) *');
            c.up('form').getForm().findField('declaredValue').setFieldLabel('Valor declarado (\u20AC) *');
        }
    },
    previewCost: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().submit({
                waitMsg: 'Procesando ...',
                success: function (t, p, o) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
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
                    b.up('window').close();
                }
            });
        }
    },
    changeCountryPrealert: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_City').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('FE_City').load({
                callback: function (s) {
                    Ext.getStore('FE_DeliveryCompany').getProxy().setExtraParam('idcountry', n);
                    Ext.getStore('FE_DeliveryCompany').load({
                        callback: function (s1) {
                            c.up('form').getForm().findField('city').setValue(s[0].get('idcity'));
                        }
                    });
                }
            });
        }
    },
    changeCityDeliveryPrealert: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_SalePoint').getProxy().setExtraParam('idcity', n);
            Ext.getStore('FE_SalePoint').load({
                start: 0,
                limit: 1000
            });
        }
    },
    changeDeliverySalePoint: function (c, n, o, op) {
        if (c.up('form').getForm().findField('autodispatch').checked) {
            c.up('form').getForm().findField('idcitydelivery').setVisible(true);
            c.up('form').getForm().findField('idcitydelivery').allowBlank = false;
            if (n == 1) {
                c.up('form').getForm().findField('idsalepoint').setVisible(true);
                c.up('form').getForm().findField('idsalepoint').allowBlank = false;
                c.up('form').getForm().findField('address').setVisible(false);
                c.up('form').getForm().findField('address').allowBlank = true;
            } else {
                c.up('form').getForm().findField('idsalepoint').setVisible(false);
                c.up('form').getForm().findField('idsalepoint').allowBlank = true;
                c.up('form').getForm().findField('address').setVisible(true);
                c.up('form').getForm().findField('address').allowBlank = false;
            }
        } else {
            c.up('form').getForm().findField('idcitydelivery').setVisible(false);
            c.up('form').getForm().findField('idcitydelivery').allowBlank = true;
            c.up('form').getForm().findField('delivery_salepoint').setVisible(false);
            c.up('form').getForm().findField('address').setVisible(false);
            c.up('form').getForm().findField('address').allowBlank = true;
            c.up('form').getForm().findField('idsalepoint').setVisible(false);
            c.up('form').getForm().findField('idsalepoint').allowBlank = true;
        }
    },
    changeTypePackage: function (c, n, o, op) {
        for (i = 0; i < numArticles; i++) {
            if (n == 1) {
                if (c.up('form').getForm().findField('unit_value_' + i)) {
                    c.up('form').getForm().findField('unit_value_' + i).setDisabled(true);
                    c.up('form').getForm().findField('unit_value_' + i).minValue = 0;
                    c.up('form').getForm().findField('unit_value_' + i).setValue(0);
                }
            } else {
                if (c.up('form').getForm().findField('unit_value_' + i)) {
                    c.up('form').getForm().findField('unit_value_' + i).setDisabled(false);
                    c.up('form').getForm().findField('unit_value_' + i).minValue = 2;
                }
            }
        }
    },
    addArticle: function (b, e) {
        b.up('#newsArticles').add({
            xtype: 'fieldcontainer',
            id: 'articleDetail_' + numArticles,
            anchor: '100%',
            layout: 'hbox',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textfield',
                name: 'article_' + numArticles,
                value: '',
                allowBlank: false,
                width: 400,
                fieldLabel: 'Art\xedculo *',
                queryMode: 'local',
                inputAttrTpl: 'data-qtip="Art\xedculo prealertado"'
            }, {
                xtype: 'numberfield',
                name: 'amount_' + numArticles,
                value: 1,
                hideTrigger: true,
                minValue: 1,
                maxValue: 6,
                allowBlank: false,
                fieldLabel: 'Cantidad *',
                flex: 1,
                inputAttrTpl: 'data-qtip="Cantidad de producto prealertado"'
            }, {
                xtype: 'numberfield',
                name: 'unit_value_' + numArticles,
                value: '',
                hideTrigger: true,
                minValue: 1,
                maxValue: 2000,
                decimalPrecision: 2,
                decimalSeparator: '.',
                allowBlank: false,
                labelWidth: 120,
                flex: 1,
                fieldLabel: 'Valor a declarar *',
                inputAttrTpl: 'data-qtip="Valor por el cual se declara el producto"'
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'button',
                name: 'remove_' + numArticles,
                text: 'Eliminar',
                align: 'right',
                handler: function (bu, ev) {
                    bu.up('form').up('form').down('#newsArticles').remove('articleDetail_' + bu.up('fieldcontainer').items.items[0].name.split('_')[1], true);
                },
                tooltip: 'Eliminar este articulo'
            }]
        });
        if (b.up('form').up('form').getForm().findField('typePackage').getValue() == 1) {
            b.up('form').getForm().findField('unit_value_' + numArticles).setDisabled(true);
        } else {
            b.up('form').getForm().findField('unit_value_' + numArticles).setDisabled(false);
        }
        numArticles++;
    },
    savePrealert: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            var sumTotal = 0;
            var amount = 0;
            var unit_value = 0;
            for (i = 0; i < numArticles; i++) {
                if (b.up('form').getForm().findField('unit_value_' + i)) {
                    amount = b.up('form').getForm().findField('amount_' + i).getValue();
                    unit_value = b.up('form').getForm().findField('unit_value_' + i).getValue();
                }
                sumTotal += (amount * unit_value);
            }
            if ((sumTotal > 2000 && b.up('form').getForm().findField('country').getValue() == 2) ||
                (sumTotal > 1500 && b.up('form').getForm().findField('country').getValue() == 3)) {
                Ext.MessageBox.alert('Error', 'La suma total del valor declarado no puede ser superior a ' +
                    (b.up('form').getForm().findField('country').getValue() == 2 ? 'US$ 2.000' : 'Eur 1.500'));
            } else {
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
                                window.location = 'verpaquetesprealertados.aspx';
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
                articles = 1;
            }
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    FE_insert: function (b, e) {
        if (mustCompleteData) {
            Ext.MessageBox.alert('Error', 'Completa tu informaci\xf3n personal en la pesta\xf1a "Mis Datos" para poder agilizar tus env\xedos', function () {
                window.location = 'datosusuario.aspx'
            });
        } else {
            window.location = 'prealertarpaquetes.aspx';
        }
    },
    FE_remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'ajax/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idprealert'),
                        object: 'prealerts'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('FE_Prealert').load()
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
    changeCountryFilter: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_DeliveryCompany').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('FE_City').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('FE_City').load({
                callback: function (s) {
                    c.up('form').getForm().findField('city').setValue(s[0].get('idcity'));
                }
            });
        }
    },
    changeCityFilter: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_Prealert').getProxy().setExtraParam('idcityorigin', n);
            Ext.getStore('FE_Prealert').load();
        }
    },
    cancelPrealert: function (b, e) {
        window.location = 'verpaquetesprealertados.aspx'
    },
    changeAutodispatch: function (r, n, o) {
        if (r.getValue() && r.inputValue == 1) {
            r.up('form').getForm().findField('delivery_salepoint').setVisible(true);
            if (r.up('form').getForm().findField('delivery_salepoint').getValue() == 1) {
                r.up('form').getForm().findField('idsalepoint').setVisible(true);
                r.up('form').getForm().findField('idsalepoint').allowBlank = false;
                r.up('form').getForm().findField('address').setVisible(false);
                r.up('form').getForm().findField('address').allowBlank = true;
                r.up('form').getForm().findField('idcitydelivery').setVisible(false);
                r.up('form').getForm().findField('idcitydelivery').allowBlank = true;
            } else {
                r.up('form').getForm().findField('idsalepoint').setVisible(false);
                r.up('form').getForm().findField('idsalepoint').allowBlank = true;
                r.up('form').getForm().findField('address').setVisible(true);
                r.up('form').getForm().findField('address').allowBlank = false;
                r.up('form').getForm().findField('idcitydelivery').setVisible(true);
                r.up('form').getForm().findField('idcitydelivery').allowBlank = false;
            }
            r.up('form').getForm().findField('idpayment').setVisible(false);
            r.up('form').getForm().findField('idpayment').allowBlank = false;
        }
        if (r.getValue() && r.inputValue == 0) {
            r.up('form').getForm().findField('idcitydelivery').setVisible(false);
            r.up('form').getForm().findField('idcitydelivery').allowBlank = true;
            r.up('form').getForm().findField('delivery_salepoint').setVisible(false);
            r.up('form').getForm().findField('address').setVisible(false);
            r.up('form').getForm().findField('address').allowBlank = true;
            r.up('form').getForm().findField('idsalepoint').setVisible(false);
            r.up('form').getForm().findField('idsalepoint').allowBlank = true;
            r.up('form').getForm().findField('idpayment').setVisible(false);
            r.up('form').getForm().findField('idpayment').allowBlank = true;
        }
    },
    changeTracking: function (r, o) {
        r.setValue(r.getValue().toUpperCase().trim());
    },
    changeSalePoint: function (r, o) {
        r.up('form').getForm().findField('address').setValue('CRR - ' + Ext.getStore('FE_SalePoint').findRecord('idsalepoint', r.getValue()).get('address'));
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listPrinters button[action=insert]": { click: 'insert' },
        "listPrinters button[action=clean]": { click: 'cleanFilters' },
        "listPrinters": { itemdblclick: 'editDbl' },
        "listPrinters actioncolumn[action=edit]": { click: 'edit' },
        "listPrinters actioncolumn[action=remove]": { click: 'remove' },
        "formPrinter button[action=cancel]": { click: 'cancel' },
        "formPrinter button[action=save]": { click: 'save' }
    },
    insert: function (a, c) {
        Ext.widget("formPrinter").down("form").loadRecord(Ext.create("flybox.model.Printer"));
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters()
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formPrinter").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formPrinter").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idprinter").getValue());
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
                            Ext.getStore("Printer").load()
                        }
                    }); a.up("window").close()
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idprinter"),
                        object: "printers"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("Printer").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listProducts button[action=insert]': { click: 'insert' },
        'listProducts button[action=clean]': { click: 'cleanFilters' },
        'listProducts': { itemdblclick: 'editDbl' },
        'listProducts actioncolumn[action=edit]': { click: 'edit' },
        'listProducts actioncolumn[action=remove]': { click: 'remove' },
        'formProduct button[action=cancel]': { click: 'cancel' },
        'formProduct button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formProduct').down('form').loadRecord(Ext.create('flybox.model.Product'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formProduct').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formProduct').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idproduct').getValue());
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
                            Ext.getStore('Product').load();
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idproduct'),
                        object: 'products'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Product').load()
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
        'listProvides button[action=insert]': { click: 'insert' },
        'listProvides button[action=clean]': { click: 'cleanFilters' },
        'listProvides': { itemdblclick: 'editDbl' },
        'listProvides actioncolumn[action=edit]': { click: 'edit' },
        'listProvides actioncolumn[action=remove]': { click: 'remove' },
        'formProvide button[action=cancel]': { click: 'cancel' },
        'formProvide button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formProvide').down('form').loadRecord(Ext.create('flybox.model.Provide'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formProvide').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formProvide').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idprovide').getValue());
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
                            Ext.getStore('Provide').load();
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idprovide'),
                        object: 'provides'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Provide').load()
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
        'listReceivedPackages button[action=clean]': { click: 'cleanFilters' },
        'listReceivedPackages button[action=export]': { click: '_export' },
        'formSelectDeliveryCompany button[action=cancel]': { click: 'cancel' },
        'formSelectDeliveryCompany button[action=save]': { click: 'selectDeliveryCompany' },
        'formReceivePackage textfield[name=tracking]': { keypress: 'addTracking' },
        'formReceivePackage button[action=cancel]': { click: 'cancel' },
        'formReceivePackage button[action=save]': { click: 'save' },
        'formReceivePackage form grid actioncolumn[action=remove]': { click: 'removeTracking' },
        'formFilterCountryReceivePackage combo[name=country]': { change: 'changeCountryFilter' },
        'formFilterCountryReceivePackage combo[name=city]': { change: 'changeCityFilter' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        Ext.getStore('AuxReceivePackage').removeAll();
        b.up('window').close();
    },
    selectDeliveryCompany: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            var form = Ext.widget('formReceivePackage');
            form.down('form').getForm().findField('iddeliverycompany').setValue(b.up('form').getForm().findField('iddeliverycompany').getValue());
            form.down('form').getForm().findField('delivery_company').setValue(b.up('form').getForm().findField('iddeliverycompany').findRecordByValue(b.up('form').getForm().findField('iddeliverycompany').getValue()).get('name'));
            b.up('window').close();
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            if (Ext.getStore('AuxReceivePackage').count() > 0) {
                var trackings = '';
                var first = true;
                Ext.getStore('AuxReceivePackage').each(function (r) {
                    if (first) {
                        first = false;
                    } else {
                        trackings += ",";
                    }
                    trackings += r.get('tracking');
                });
                b.up('form').getForm().findField('trackings').setValue(trackings);
                b.up('form').getForm().findField('id').setValue(0);
                b.up('form').getForm().submit({
                    waitMsg: 'Guardando ...',
                    success: function (t, p, o) {
                        var d = Ext.JSON.decode(p.response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                        Ext.getStore('AuxReceivePackage').removeAll();
                        b.up('window').close();
                    },
                    failure: function (t, p) {
                        var d = Ext.JSON.decode(p.response.responseText);
                        Ext.MessageBox.show({
                            autoScroll: true,
                            maxHeight: 400,
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
                    msg: 'Debe ingresar al menos un tracking',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    addTracking: function (t, e) {
        if (e.getKey() === Ext.EventObject.ENTER) {
            var auxString1 = new String(t.getValue());
            t.setValue(auxString1.toUpperCase());
            if (t.getValue() != "") {
                if (t.up('form').getForm().findField('iddeliverycompany').getValue() == 2 && t.getValue().substr(0, 8) == "42033126") {
                    var auxString = new String(t.getValue());
                    t.setValue(auxString.substring(8, auxString.length));
                }
                var already = false;
                Ext.getStore('AuxReceivePackage').each(function (r) {
                    if (r.get("tracking") == t.getValue()) {
                        already = true;
                    }
                });
                if (!already) {
                    Ext.getStore('AuxReceivePackage').add({ "tracking": t.getValue() });
                }
                t.setValue("");
                t.up('window').down('grid').getView().focusRow(Ext.getStore('AuxReceivePackage').count() - 1);
                t.focus();
            }
        }
    },
    removeTracking: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.getStore('AuxReceivePackage').remove(v.getStore().getAt(c));
            }
        })
    },
    changeCountryFilter: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_City').getProxy().setExtraParam('idcountry', n);
            Ext.getStore('FE_City').load({
                callback: function (s) {
                    c.up('form').getForm().findField('city').setValue(s[0].get('idcity'));
                }
            });
        }
    },
    changeCityFilter: function (c, n, o, op) {
        if (Ext.isNumber(n)) {
            Ext.getStore('FE_ReceivePackage').getProxy().setExtraParam('idcityorigin', n);
            Ext.getStore('FE_ReceivePackage').load();
        }
    },
    _export: function () {
        Ext.Ajax.request({
            url: 'stores/list_objects.aspx',
            method: 'get',
            params: {
                object: 'rptReceiveds'
            },
            success: function (t, p, o) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function () {
                        window.open("./reports/" + d.msg.file, "_blank")
                    }
                });
            },
            failure: function (t, p) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listRejectionReasons button[action=insert]': { click: 'insert' },
        'listRejectionReasons button[action=clean]': { click: 'cleanFilters' },
        'listRejectionReasons': { itemdblclick: 'editDbl' },
        'listRejectionReasons actioncolumn[action=edit]': { click: 'edit' },
        'listRejectionReasons actioncolumn[action=remove]': { click: 'remove' },
        'formRejectionReason button[action=cancel]': { click: 'cancel' },
        'formRejectionReason button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formRejectionReason').down('form').loadRecord(Ext.create('flybox.model.RejectionReason'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formRejectionReason').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formRejectionReason').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idrejectionreason').getValue());
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
                            Ext.getStore('RejectionReason').load();
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idrejectionreason'),
                        object: 'rejectionReasons'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('RejectionReason').load()
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
        'listRequestsPending button[action=insert]': { click: 'insert' },
        'listRequestsPending button[action=clean]': { click: 'cleanFilters' },
        'listRequestsPending': { itemdblclick: 'editDbl' },
        'listRequestsPending actioncolumn[action=edit]': { click: 'edit' },
        'listRequestsPending actioncolumn[action=remove]': { click: 'remove' },
        'formFindPackageCustomer button[text=Solicitar b\xfasqueda]': { click: 'requestFinder' },
        'formRequestPending button[action=cancel]': { click: 'cancel' },
        'listRequestsPending button[action=export]': { click: '_export' }
    },
    insert: function (b, e) {
        Ext.widget('formRequestPending').down('form').loadRecord(Ext.create('flybox.model.RequestPending'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        var form = Ext.widget('formRequestPending');
        form.down('form').loadRecord(v.getStore().getAt(c));
        form.down('form').getForm().findField('locker').setValue(v.getStore().getAt(c).get('locker').idlocker)
    },
    editDbl: function (g, r) {
        var form = Ext.widget('formRequestPending');
        form.down('form').loadRecord(r);
        form.down('form').getForm().findField('locker').setValue(r.get('locker').idlocker)
    },
    requestFinder: function (b) {
        if (b.up('form').getForm().isValid()) {
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
                            b.up('form').getForm().findField('tracking').setValue('');
                            b.up('form').getForm().findField('description').setValue('')
                        }
                    })
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    })
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idrequestpending'),
                        object: 'requestsPending'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('RequestPending').load()
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
        })
    },
    _export: function () {
        Ext.Ajax.request({
            url: 'stores/list_objects.aspx',
            method: 'get',
            params: {
                object: 'rptRequestPending'
            },
            success: function (t, p, o) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function () {
                        window.open("./reports/" + d.msg.file, "_blank")
                    }
                });
                b.up('window').close()
            },
            failure: function (t, p) {
                var d = Ext.JSON.decode(t.responseText);
                Ext.MessageBox.show({
                    title: d.msg.title,
                    msg: d.msg.body,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listResources button[action=insert]': { click: 'insert' },
        'listResources button[action=clean]': { click: 'cleanFilters' },
        'listResources actioncolumn[action=remove]': { click: 'remove' },
        'formResource button[action=cancel]': { click: 'cancel' },
        'formResource button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.getStore('TypeResource').load({
            callback: function () {
                Ext.widget('formResource').down('form').loadRecord(Ext.create('flybox.model.Resource'))
            }
        })
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Resource').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idresource').getValue());
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
                            Ext.getStore('Resource').load()
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
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idresource'),
                        object: 'resources'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Resource').load()
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
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listSecretQuestions button[action=insert]": { click: 'insert' },
        "listSecretQuestions button[action=clean]": { click: 'cleanFilters' },
        "listSecretQuestions": { itemdblclick: 'editDbl' },
        "listSecretQuestions actioncolumn[action=edit]": { click: 'edit' },
        "listSecretQuestions actioncolumn[action=remove]": { click: 'remove' },
        "formSecretQuestion button[action=cancel]": { click: 'cancel' },
        "formSecretQuestion button[action=save]": { click: 'save' }
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
        Ext.getStore("SecretQuestion").load()
    },
    insert: function (a, c) {
        Ext.widget("formSecretQuestion").down("form").loadRecord(Ext.create("flybox.model.SecretQuestion"))
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formSecretQuestion").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formSecretQuestion").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idsecretquestion").getValue()); a.up("form").getForm().submit({ waitMsg: "Guardando ...", success: function (b, e, g) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore("SecretQuestion").load() } }); a.up("window").close() }, failure: function (b, e) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); a.up("window").close() } })
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idsecretquestion"),
                        object: "secretQuestions"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("SecretQuestion").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listStatesLocker button[action=insert]': { click: 'insert' },
        'listStatesLocker button[action=clean]': { click: 'cleanFilters' },
        'listStatesLocker': { itemdblclick: 'editDbl' },
        'listStatesLocker actioncolumn[action=edit]': { click: 'edit' },
        'listStatesLocker actioncolumn[action=remove]': { click: 'remove' },
        'formStateLocker button[action=cancel]': { click: 'cancel' },
        'formStateLocker button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formStateLocker').down('form').loadRecord(Ext.create('flybox.model.StateLocker'));
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('StateLocker').load();
    },
    cancel: function (b, e) {
        b.up('window').close();
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formStateLocker').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formStateLocker').down('form').loadRecord(r);
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idstatelocker').getValue());
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
                            Ext.getStore('StateLocker').load();
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idstatelocker'),
                        object: 'statesLocker'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('StateLocker').load()
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
        'listStatesTracking button[action=insert]': { click: 'insert' },
        'listStatesTracking button[action=clean]': { click: 'cleanFilters' },
        'listStatesTracking': { itemdblclick: 'editDbl' },
        'listStatesTracking actioncolumn[action=edit]': { click: 'edit' },
        'listStatesTracking actioncolumn[action=remove]': { click: 'remove' },
        'formStateTracking button[action=cancel]': { click: 'cancel' },
        'formStateTracking button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.getStore('GroupTracking').load({
            callback: function () {
                Ext.widget('formStateTracking').down('form').loadRecord(Ext.create('flybox.model.StateTracking'));
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
                    url: 'delete/delete_object.aspx',
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
        'listTemplates button[action=insert]': { click: 'insert' },
        'listTemplates button[action=clean]': { click: 'cleanFilters' },
        'listTemplates': { itemdblclick: 'editDbl' },
        'listTemplates actioncolumn[action=fields]': { click: 'fields' },
        'listTemplates actioncolumn[action=edit]': { click: 'edit' },
        'listTemplates actioncolumn[action=remove]': { click: 'remove' },
        'formTemplate button[action=cancel]': { click: 'cancel' },
        'formTemplate button[action=save]': { click: 'save' },
        'listFieldsTemplate button[action=insert]': { click: 'insertField' },
        'listFieldsTemplate button[action=clean]': { click: 'cleanFiltersField' },
        'listFieldsTemplate': { itemdblclick: 'editDblField' },
        'listFieldsTemplate actioncolumn[action=edit]': { click: 'editField' },
        'listFieldsTemplate actioncolumn[action=remove]': { click: 'removeField' },
        'formFieldTemplate button[action=cancel]': { click: 'cancel' },
        'formFieldTemplate button[action=save]': { click: 'saveField' },
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
        Ext.widget('formTemplate').down('form').loadRecord(Ext.create('flybox.model.Template'));
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
                    url: 'delete/delete_object.aspx',
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
        form.down('form').loadRecord(Ext.create('flybox.model.FieldTemplate'));
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
                    url: 'delete/delete_object.aspx',
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
        "listTypesID button[action=insert]": { click: 'insert' },
        "listTypesID button[action=clean]": { click: 'cleanFilters' },
        listTypesID: { itemdblclick: 'editDbl' },
        "listTypesID actioncolumn[action=edit]": { click: 'edit' },
        "listTypesID actioncolumn[action=remove]": { click: 'remove' },
        "formTypeID button[action=cancel]": { click: 'cancel' },
        "formTypeID button[action=save]": { click: 'save' }
    },
    insert: function (a, c) {
        Ext.widget("formTypeID").down("form").loadRecord(Ext.create("flybox.model.TypeID"))
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters()
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formTypeID").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formTypeID").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idtypeid").getValue()); a.up("form").getForm().submit({ waitMsg: "Guardando ...", success: function (b, e, g) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore("TypeID").load() } }); a.up("window").close() }, failure: function (b, e) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); a.up("window").close() } })
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
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idtypeid"),
                        object: "typesID"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("TypeID").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listTypesLocker button[action=insert]": { click: 'insert' },
        "listTypesLocker button[action=clean]": { click: 'cleanFilters' },
        listTypesLocker: { itemdblclick: 'editDbl' },
        "listTypesLocker actioncolumn[action=group]": { click: 'group' },
        "listTypesLocker actioncolumn[action=edit]": { click: 'edit' },
        "listTypesLocker actioncolumn[action=remove]": { click: 'remove' },
        "formTypeLocker button[action=cancel]": { click: 'cancel' },
        "formTypeLocker button[action=save]": { click: 'save' }
    },
    insert: function (a, c) {
        Ext.widget("formTypeLocker").down("form").loadRecord(Ext.create("flybox.model.TypeLocker"))
    },
    cleanFilters: function (a, c) {
        a.up("grid").filters.clearFilters();
        Ext.getStore("TypeLocker").load()
    },
    cancel: function (a, c) {
        a.up("window").close()
    },
    edit: function (a, d, g, b, f) {
        Ext.widget("formTypeLocker").down("form").loadRecord(a.getStore().getAt(g))
    },
    editDbl: function (b, a) {
        Ext.widget("formTypeLocker").down("form").loadRecord(a)
    },
    save: function (a, c) {
        if (a.up("form").getForm().isValid()) {
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("idtypelocker").getValue());
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
                            Ext.getStore("TypeLocker").load()
                        }
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
    }, remove: function (a, d, g, b, f) {
        Ext.MessageBox.confirm("Eliminar registro", "¿Desea eliminar el registro?", function (c) {
            if (c == "yes") {
                Ext.Ajax.request({
                    url: "delete/delete_object.aspx",
                    params: {
                        id: a.getStore().getAt(g).get("idtypelocker"),
                        object: "typesLocker"
                    },
                    success: function (e) {
                        var h = Ext.JSON.decode(e.responseText);
                        Ext.MessageBox.show({
                            title: h.msg.title,
                            msg: h.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore("TypeLocker").load()
                            }
                        })
                    },
                    failed: function (e, h, i) {
                        Ext.MessageBox.show({
                            title: h.response.result.msg.title,
                            msg: h.response.result.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listTypesPackage button[action=insert]': { click: 'insert' },
        'listTypesPackage button[action=clean]': { click: 'cleanFilters' },
        'listTypesPackage': { itemdblclick: 'editDbl' },
        'listTypesPackage actioncolumn[action=group]': { click: 'group' },
        'listTypesPackage actioncolumn[action=edit]': { click: 'edit' },
        'listTypesPackage actioncolumn[action=remove]': { click: 'remove' },
        'formTypePackage button[action=cancel]': { click: 'cancel' },
        'formTypePackage button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formTypePackage').down('form').loadRecord(Ext.create('flybox.model.TypePackage'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('TypePackage').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formTypePackage').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formTypePackage').down('form').loadRecord(r)
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) { b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idtypepackage').getValue()); b.up('form').getForm().submit({ waitMsg: 'Guardando ...', success: function (t, p, o) { var d = Ext.JSON.decode(p.response.responseText); Ext.MessageBox.show({ title: d.msg.title, msg: d.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore('TypePackage').load() } }); b.up('window').close() }, failure: function (t, p) { var d = Ext.JSON.decode(p.response.responseText); Ext.MessageBox.show({ title: d.msg.title, msg: d.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); b.up('window').close() } }) } else { Ext.MessageBox.show({ title: 'Error', msg: 'Ingrese los datos correctos', buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }) }
    },
    remove: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idtypepackage'),
                        object: 'typesPackage'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('TypePackage').load()
                            }
                        })
                    },
                    failed: function (t, p, o) {
                        Ext.MessageBox.show({
                            title: p.response.result.msg.title,
                            msg: p.response.result.msg.body,
                            buttons: Ext.Msg.OK, icon: Ext.Msg.INFO
                        })
                    }
                })
            }
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listTypesResource button[action=insert]': { click: 'insert' },
        'listTypesResource button[action=clean]': { click: 'cleanFilters' },
        'listTypesResource': { itemdblclick: 'editDbl' },
        'listTypesResource actioncolumn[action=edit]': { click: 'edit' },
        'listTypesResource actioncolumn[action=remove]': { click: 'remove' },
        'formTypeResource button[action=cancel]': { click: 'cancel' },
        'formTypeResource button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formTypeResource').down('form').loadRecord(Ext.create('flybox.model.TypeResource'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('TypeResource').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formTypeResource').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formTypeResource').down('form').loadRecord(r)
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idtyperesource').getValue());
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
                            Ext.getStore('TypeResource').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        object: "typesResource",
                        id: v.getStore().getAt(c).get('idtyperesource')
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('TypeResource').load()
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
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listTypesUbication button[action=insert]': { click: 'insert' },
        'listTypesUbication button[action=clean]': { click: 'cleanFilters' },
        'listTypesUbication': { itemdblclick: 'editDbl' },
        'listTypesUbication actioncolumn[action=edit]': { click: 'edit' },
        'listTypesUbication actioncolumn[action=remove]': { click: 'remove' },
        'formTypeUbication button[action=cancel]': { click: 'cancel' },
        'formTypeUbication button[action=save]': { click: 'save' }
    },
    insert: function (b, e) {
        Ext.widget('formTypeUbication').down('form').loadRecord(Ext.create('flybox.model.TypeUbication'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formTypeUbication').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formTypeUbication').down('form').loadRecord(r)
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idtypeubication').getValue()); b.up('form').getForm().submit({ waitMsg: 'Guardando ...', success: function (t, p, o) { var d = Ext.JSON.decode(p.response.responseText); Ext.MessageBox.show({ title: d.msg.title, msg: d.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore('TypeUbication').load() } }); b.up('window').close(); }, failure: function (t, p) { var d = Ext.JSON.decode(p.response.responseText); Ext.MessageBox.show({ title: d.msg.title, msg: d.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); b.up('window').close() } })
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
                    url: 'delete/delete_object.aspx', params: {
                        id: v.getStore().getAt(c).get('idtypeubication'),
                        object: 'typesUbication'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('TypeUbication').load()
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
        })
    }
});

Ext.create("Ext.app.Controller", {
    control: {
        "listUsers button[action=insert]": { click: 'insert' },
        "listUsers button[action=clean]": { click: 'cleanFilters' },
        "listUsers": { itemdblclick: 'editDbl' },
        "listUsers actioncolumn[action=group]": { click: 'group' },
        "listUsers actioncolumn[action=printer]": { click: 'printer' },
        "listUsers actioncolumn[action=edit]": { click: 'edit' },
        "listUsers actioncolumn[action=remove]": { click: 'remove' },
        "formUser button[action=cancel]": { click: 'cancel' },
        "formUser button[action=save]": { click: 'save' },
        "formUser button[action=changePass]": { click: 'changePass' },
        "listGroupsUser grid#gridDestination dataview": { drop: 'insertGroup' },
        "listGroupsUser grid#gridSource dataview": { drop: 'removeGroup' },
        "formCustomerRegister combo[name=idcountry]": { change: 'changeCountry' },
        "formCustomerRegister combo[name=idcity]": { change: 'changeCity' },
        "formCustomerRegister combo[name=delivery_salepoint]": { change: 'changeSalePoint' },
        "formCustomerRegister textfield[name=identification]": { blur: 'blurID' },
        "formCustomerRegister textfield[name=email]": { blur: 'blurEmail' },
        "formCustomerRegister button[text=Registrar]": { click: 'registerCustomer' },
        "formRecoveryPass combo[name=idrecoverymethod]": { change: 'changeRecoveryMethod' },
        "formRecoveryPass textfield[name=email]": { blur: 'blurEmailRecoveryPass' },
        "formRecoveryPass button[text=Continuar]": { click: 'recoveryPass' },
        "formChangePass button[text=Cambiar]": { click: 'setNewPass' },
        "formPrinterUser button[action=cancel]": { click: 'cancel' },
        "formPrinterUser button[action=save]": { click: 'savePrinter' }
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
                    url: "stores/list_objects.aspx",
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
        Ext.widget("formUser").down("form").loadRecord(Ext.create("flybox.model.User"))
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
            a.up("form").getForm().findField("id").setValue(a.up("form").getForm().findField("iduser").getValue()); a.up("form").getForm().submit({ waitMsg: "Guardando ...", success: function (b, e, g) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO, fn: function () { Ext.getStore("User").load() } }); a.up("window").close() }, failure: function (b, e) { var f = Ext.JSON.decode(e.response.responseText); Ext.MessageBox.show({ title: f.msg.title, msg: f.msg.body, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR }); a.up("window").close() } })
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
                    url: "delete/delete_object.aspx",
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
                url: "update/user_pass.aspx",
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
                url: "update/save_object.aspx", params: {
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
                url: "delete/delete_object.aspx", params: {
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
                                window.location = "Paginas/Default.aspx"
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
                url: "ajax/validate_data_register.aspx",
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
                url: "ajax/validate_data_register.aspx",
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
                url: "ajax/validate_data_register.aspx",
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
                            url: "ajax/validate_data_register.aspx",
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
                                window.location = "change_pass.aspx?" + f.link
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
                            window.location = "Ingresar.aspx"
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
        'listWareHouses button[action=insert]': { click: 'insert' },
        'listWareHouses button[action=clean]': { click: 'cleanFilters' },
        'listWareHouses': { itemdblclick: 'editDbl' },
        'listWareHouses actioncolumn[action=ubications]': { click: 'ubications' },
        'listWareHouses actioncolumn[action=edit]': { click: 'edit' },
        'listWareHouses actioncolumn[action=remove]': { click: 'remove' },
        'formWareHouse button[action=cancel]': { click: 'cancel' },
        'formWareHouse button[action=save]': { click: 'save' },
        'listUbications button[action=insert]': { click: 'insertUbication' },
        'listUbications button[action=clean]': { click: 'cleanFiltersUbication' },
        'listUbications': { itemdblclick: 'editDblUbication' },
        'listUbications actioncolumn[action=edit]': { click: 'editUbication' },
        'listUbications actioncolumn[action=remove]': { click: 'removeUbication' },
        'formUbication button[action=cancel]': { click: 'cancel' },
        'formUbication button[action=save]': { click: 'saveUbication' }
    },
    insert: function (b, e) {
        Ext.widget('formWareHouse').down('form').loadRecord(Ext.create('flybox.model.WareHouse'))
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('WareHouse').load()
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.widget('formWareHouse').down('form').loadRecord(v.getStore().getAt(c))
    },
    editDbl: function (g, r) {
        Ext.widget('formWareHouse').down('form').loadRecord(r)
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idwarehouse').getValue());
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
                            Ext.getStore('WareHouse').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
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
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idwarehouse'),
                        object: 'wareHouses'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('WareHouse').load()
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
        })
    },
    ubications: function (v, r, c, i, e) {
        Ext.getStore('Ubication').getProxy().setExtraParam('idwarehouse', v.getStore().getAt(c).get('idwarehouse'));
        Ext.getStore('Ubication').load();
        var opened = false;
        var content = Ext.getCmp('contenido');
        var panel = null;
        Ext.each(content.items.items, function (n, i, s) {
            if (n.alias == 'widget.listUbications') {
                opened = true; panel = n
            }
        }); if (!opened) {
            panel = Ext.widget('listUbications');
            content.add(panel)
        }
        Ext.getCmp('contenido').setActiveTab(panel);
        panel.setTitle('Listado ubicaciones de la bodega ' + v.getStore().getAt(c).get('name'))
    },
    insertUbication: function (b, e) {
        var form = Ext.widget('formUbication');
        form.down('form').loadRecord(Ext.create('flybox.model.Ubication'));
        form.down('form').getForm().findField('idwarehouse').setValue(Ext.getStore('Ubication').getProxy().extraParams.idwarehouse)
    },
    cleanFiltersUbication: function (b, e) {
        b.up('grid').filters.clearFilters();
        Ext.getStore('Ubication').load();
    }, editUbication: function (v, r, c, i, e) {
        Ext.getStore('TypeUbication').load({
            callback: function () {
                var form = Ext.widget('formUbication');
                form.down('form').loadRecord(v.getStore().getAt(c));
                form.down('form').getForm().findField('idwarehouse').setValue(Ext.getStore('Ubication').getProxy().extraParams.idwarehouse);
                form.down('form').getForm().findField('idtypeubication').setValue(v.getStore().getAt(c).get('typeUbication').idtypeubication)
            }
        })
    },
    editDblUbication: function (g, r) {
        Ext.getStore('TypeUbication').load({
            callback: function () {
                var form = Ext.widget('formUbication');
                form.down('form').loadRecord(r);
                form.down('form').getForm().findField('idwarehouse').setValue(Ext.getStore('Ubication').getProxy().extraParams.idwarehouse);
                form.down('form').getForm().findField('idtypeubication').setValue(r.get('typeUbication').idtypeubication)
            }
        })
    },
    saveUbication: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idubication').getValue());
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
                            Ext.getStore('Ubication').load()
                        }
                    });
                    b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    },
    removeUbication: function (v, r, c, i, e) {
        Ext.MessageBox.confirm('Eliminar registro', '¿Desea eliminar el registro?', function (o) {
            if (o == 'yes') {
                Ext.Ajax.request({
                    url: 'delete/delete_object.aspx',
                    params: {
                        id: v.getStore().getAt(c).get('idubication'),
                        object: 'ubications'
                    },
                    success: function (response) {
                        var d = Ext.JSON.decode(response.responseText);
                        Ext.MessageBox.show({
                            title: d.msg.title,
                            msg: d.msg.body,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            fn: function () {
                                Ext.getStore('Ubication').load()
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
        })
    }
});

Ext.create('Ext.app.Controller', {
    control: {
        'listPackagesPicking button[action=clean]': { click: 'cleanFilters' },
        'listPackagesPicking': { itemdblclick: 'editDbl' },
        'listPackagesPicking actioncolumn[action=edit]': { click: 'edit' },
        'formPackagePicking button[action=cancel]': { click: 'cancel' },
        'formPackagePicking button[action=save]': { click: 'save' }
    },
    cleanFilters: function (b, e) {
        b.up('grid').filters.clearFilters();
    },
    cancel: function (b, e) {
        b.up('window').close()
    },
    edit: function (v, r, c, i, e) {
        Ext.getStore('UsersPicking').load({
            start: 0,
            limit: 100000,
            callback: function () {
                var record = v.getStore().getAt(c);
                var form = Ext.widget('formPackagePicking');
                form.down('form').loadRecord(record);
                form.down('form').getForm().findField('iduser').setValue(record.get('user').iduser)
            }
        })
    },
    editDbl: function (g, r) {
        Ext.getStore('UsersPicking').load({
            start: 0,
            limit: 100000,
            callback: function () {
                var form = Ext.widget('formPackagePicking');
                form.down('form').loadRecord(r);
                form.down('form').getForm().findField('iduser').setValue(r.get('user').iduser)
            }
        })
    },
    save: function (b, e) {
        if (b.up('form').getForm().isValid()) {
            b.up('form').getForm().findField('id').setValue(b.up('form').getForm().findField('idconsolidate').getValue());
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
                            Ext.getStore('Picking').load()
                        }
                    }); b.up('window').close()
                },
                failure: function (t, p) {
                    var d = Ext.JSON.decode(p.response.responseText);
                    Ext.MessageBox.show({
                        title: d.msg.title,
                        msg: d.msg.body,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    b.up('window').close()
                }
            })
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Ingrese los datos correctos',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            })
        }
    }
});


Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.chart.*', 'Ext.ux.form.TinyMCE'],
    name: 'flybox',
    launch: function () {
        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Application',
            model: 'flybox.model.Application',
            object: 'apps'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'ApplicationsGroup',
            model: 'flybox.model.Application',
            object: 'applicationsGroup'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Authorized',
            model: 'flybox.model.Authorized',
            object: 'authorizeds'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'AuthorizedPackage',
            groupField: 'group',
            model: 'flybox.model.Package',
            object: 'authorizedPackages'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'AdmonPackage',
            model: 'flybox.model.Package',
            object: 'admonPackages'
        });

        Ext.create('Ext.data.Store', {
            storeId: 'AuxReceivePackage',
            model: 'flybox.model.AuxReceivePackage',
            remoteSort: true
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'City',
            model: 'flybox.model.City',
            object: 'cities'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'CountriesGroup',
            model: 'flybox.model.Country',
            object: 'countriesGroup'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Country',
            model: 'flybox.model.Country',
            object: 'countries'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'CountryOrigin',
            model: 'flybox.model.Country',
            object: 'countriesOrigin'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Customer',
            model: 'flybox.model.Customer',
            object: 'customers'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'DeliveryCompany',
            model: 'flybox.model.DeliveryCompany',
            object: 'deliveryCompanies'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'DeliveryCompanyReceivePackage',
            model: 'flybox.model.DeliveryCompany',
            object: 'deliveryCompaniesReceivePackage'
        });

        Ext.create('Ext.data.Store', {
            storeId: 'DeliverySalePoint',
            fields: [{
                name: 'iddeliverysalepoint',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }],
            data: [{
                iddeliverysalepoint: 0,
                name: 'No'
            }, {
                iddeliverysalepoint: 1,
                name: 'Si'
            }]
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'DGPackage',
            model: 'flybox.model.Package',
            object: 'dgPackages'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Dispatch',
            model: 'flybox.model.Dispatch',
            object: 'dispatchs'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'EconomySector',
            model: 'flybox.model.EconomySector',
            object: 'economySectors'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'EnteredPackage',
            model: 'flybox.model.Package',
            object: 'enteredPackages'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'FieldTemplate',
            model: 'flybox.model.FieldTemplate',
            object: 'fields'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Group',
            model: 'flybox.model.Group',
            object: 'groups'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'GroupPackage',
            model: 'flybox.model.Package',
            object: 'groupPackage'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'GroupsApplication',
            model: 'flybox.model.Group',
            object: 'groupsApplication'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'GroupsCountry',
            model: 'flybox.model.Group',
            object: 'groupsCountry'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'GroupsModule',
            model: 'flybox.model.GroupModule',
            object: 'groupsModule'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'GroupsUser',
            model: 'flybox.model.Group',
            object: 'groupsUser'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'GroupTracking',
            model: 'flybox.model.GroupTracking',
            object: 'groupsTracking'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'InfoMethod',
            model: 'flybox.model.InfoMethod',
            object: 'infoMethods'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Item',
            model: 'flybox.model.Item',
            object: 'items'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'LevelAccess',
            model: 'flybox.model.LevelAccess',
            object: 'levelsAccess'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'ListCustomer',
            model: 'flybox.model.ListCustomer',
            object: 'listCustomers'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Locker',
            model: 'flybox.model.Locker',
            object: 'lockers'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'MeasuringSystem',
            model: 'flybox.model.MeasuringSystem',
            object: 'measuringsSystem'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Missing',
            model: 'flybox.model.Package',
            object: 'missings'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Module',
            model: 'flybox.model.Module',
            object: 'modules'
        });

        Ext.create('Ext.data.TreeStore', {
            storeId: 'ModuleTree',
            model: 'flybox.model.Module',
            nodeParam: 'module',
            remoteSort: true,
            proxy: {
                type: 'ajax',
                url: 'stores/module_tree.aspx',
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

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Money',
            model: 'flybox.model.Money',
            object: 'moneys'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'NoApplicationsGroup',
            model: 'flybox.model.Application',
            object: 'noApplicationsGroup'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'NoCountriesGroup',
            model: 'flybox.model.Country',
            object: 'noCountriesGroup'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'NoGroupsApplication',
            model: 'flybox.model.Group',
            object: 'noGroupsApplication'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'NoGroupsCountry',
            model: 'flybox.model.Group',
            object: 'noGroupsCountry'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'NoGroupsUser',
            model: 'flybox.model.Group',
            object: 'noGroupsUser'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'NoUsersGroup',
            model: 'flybox.model.User',
            object: 'noUsersGroup'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'UsersPicking',
            model: 'flybox.model.User',
            object: 'usersPicking',
            remoteFilter: false
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Occupation',
            model: 'flybox.model.Occupation',
            object: 'occupations'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Package',
            model: 'flybox.model.Package',
            object: 'packages'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Page',
            model: 'flybox.model.Page',
            object: 'pages'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Payment',
            model: 'flybox.model.Payment',
            object: 'payments'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'PendingPackage',
            model: 'flybox.model.Package',
            object: 'pendings'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Prealert',
            model: 'flybox.model.Prealert',
            object: 'prealerts'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Printer',
            model: 'flybox.model.Printer',
            object: 'printers'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Product',
            model: 'flybox.model.Product',
            object: 'products'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Productivity',
            model: 'flybox.model.Productivity',
            object: 'productivity'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Provide',
            model: 'flybox.model.Provide',
            object: 'provides'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'ReceivePackage',
            model: 'flybox.model.Package',
            object: 'receivedPackages'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'RejectionReason',
            model: 'flybox.model.RejectionReason',
            object: 'rejectionReasons'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'RequestPending',
            model: 'flybox.model.RequestPending',
            object: 'requestsPending'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Resource',
            model: 'flybox.model.Resource',
            object: 'resources'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'SalePoint',
            model: 'flybox.model.SalePoint',
            object: 'salesPoint'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'SecretQuestion',
            model: 'flybox.model.SecretQuestion',
            object: 'secretQuestions'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'StateLocker',
            model: 'flybox.model.StateLocker',
            object: 'statesLocker'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'StateTracking',
            model: 'flybox.model.StateTracking',
            object: 'statesTracking'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Template',
            model: 'flybox.model.Template',
            object: 'templates'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'TypeID',
            model: 'flybox.model.TypeID',
            object: 'typesID'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'TypeLocker',
            model: 'flybox.model.TypeLocker',
            object: 'typesLocker'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'TypePackage',
            model: 'flybox.model.TypePackage',
            object: 'typesPackage'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'TypeResource',
            model: 'flybox.model.TypeResource',
            object: 'typesResource'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'TypeUbication',
            model: 'flybox.model.TypeUbication',
            object: 'typesUbication'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Ubication',
            model: 'flybox.model.Ubication',
            object: 'ubications'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'User',
            model: 'flybox.model.User',
            object: 'users'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'UsersGroup',
            model: 'flybox.model.User',
            object: 'usersGroup'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'WareHouse',
            model: 'flybox.model.WareHouse',
            object: 'wareHouses'
        });

        Ext.create('flybox.store.DeprisaStore', {
            storeId: 'Picking',
            model: 'flybox.model.Picking',
            object: 'picking'
        });

        Ext.create('Ext.data.Store', {
            storeId: 'StatePackage',
            fields: [{
                name: 'idstatepackage',
                type: 'int'
            }, {
                name: 'name',
                type: 'string'
            }],
            data: [{
                idstatepackage: 2,
                name: 'Normal'
            }, {
                idstatepackage: 3,
                name: 'Autorizado'
            }, {
                idstatepackage: 6,
                name: 'Pendiente'
            }, {
                idstatepackage: 7,
                name: 'DG'
            }, {
                idstatepackage: 8,
                name: 'Perdido'
            }, {
                idstatepackage: 9,
                name: 'Devuelto'
            }]
        });

        Ext.define('flybox.view.DeprisaGrid', {
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

        Ext.define('flybox.view.DeprisaForm', {
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
                url: 'update/save_object.aspx',
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

        Ext.define('flybox.view.DeprisaItemSelector', {
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

        Ext.define('flybox.view.application.Form', {
            extend: 'flybox.view.DeprisaForm',
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
            }],
        });

        Ext.define('flybox.view.application.FormGroupModule', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.application.FormModule', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.application.Grid', {
            extend: 'flybox.view.DeprisaGrid',
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

        Ext.define('flybox.view.application.Groups', {
            extend: 'flybox.view.DeprisaItemSelector',
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

        Ext.define('flybox.view.application.GroupsModule', {
            extend: 'flybox.view.DeprisaGrid',
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

        Ext.define('flybox.view.application.Modules', {
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

        Ext.define("flybox.view.country.SalesPoint", {
            extend: "flybox.view.DeprisaGrid",
            iconCls: "city",
            alias: "widget.listSalesPoint",
            title: "Listado de puntos de venta",
            store: "SalePoint",
            columns: [{
                header: "ID",
                filter: "number",
                dataIndex: "idsalepoint"
            }, {
                header: "Nombre",
                filter: "string",
                dataIndex: "name",
                flex: 2
            }, {
                header: "Direcci\xf3n",
                filter: "string",
                dataIndex: "address",
                flex: 3
            }, {
                xtype: "actioncolumn",
                width: 20,
                action: "edit",
                tooltip: "Editar",
                icon: "css/edit.png",
                stopSelection: false,
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

        Ext.define("flybox.view.country.Groups", {
            extend: "flybox.view.DeprisaItemSelector",
            alias: "widget.listGroupsCountry",
            iconCls: "group",
            storeSource: "NoGroupsCountry",
            storeFinish: "GroupsCountry",
            columns: [{
                header: "ID",
                filter: "number",
                dataIndex: "idgroup"
            }, {
                header: "Nombre",
                filter: "string",
                dataIndex: "name",
                flex: 3
            }, {
                header: "Activo",
                dataIndex: "active",
                filter: "boolean",
                renderer: function (a) {
                    if (a) {
                        return "Si"
                    } else {
                        return "No"
                    }
                },
                flex: 1
            }]
        });

        Ext.define("flybox.view.country.Grid", {
            extend: "flybox.view.DeprisaGrid",
            iconCls: "country",
            alias: "widget.listCountries",
            title: "Listado paises",
            store: "Country",
            columns: [{
                header: "ID",
                filter: "number",
                dataIndex: "idcountry"
            }, {
                header: "Nombre",
                filter: "string",
                dataIndex: "name",
                flex: 2
            }, {
                header: "IATA",
                filter: "string",
                dataIndex: "codeIATA",
                flex: 1
            }, {
                header: "M\xednimo declarado",
                filter: "number",
                dataIndex: "minValueDeclared",
                flex: 1
            }, {
                header: "M\xe1ximo declarado",
                filter: "number",
                dataIndex: "maxValueDeclared",
                flex: 1
            }, {
                header: "Moneda",
                filter: 'string',
                dataIndex: "money",
                renderer: function (a) {
                    return a.name
                },
                flex: 1
            }, {
                header: "Sistema medida",
                filter: "string",
                dataIndex: "measuringSystem",
                renderer: function (a) {
                    return a.name
                },
                flex: 1
            }, {
                header: "Peso m\xe1ximo",
                filter: "number",
                dataIndex: "maxWeight",
                flex: 1
            }, {
                header: "Millas por dolar",
                filter: "number",
                dataIndex: "milesByDollar",
                flex: 1
            }, {
                header: "Peso m\xe1ximo documentos",
                filter: "number",
                dataIndex: "maxWeightDocs",
                flex: 1
            }, {
                header: "M\xe1ximo longitud",
                filter: "number",
                dataIndex: "maxLongitude",
                flex: 1
            }, {
                header: "Pa\xeds de entrega",
                filter: "boolean",
                dataIndex: "delivery",
                renderer: function (a) {
                    if (a) {
                        return "Si"
                    } else {
                        return "No"
                    }
                },
                flex: 1
            }, {
                header: "Oficina Socrates",
                filter: "string",
                dataIndex: "codeOffice",
                flex: 1
            }, {
                xtype: "actioncolumn",
                width: 20,
                action: "groups",
                tooltip: "Grupos",
                stopSelection: false,
                icon: "css/group.png",
                iconCls: "group"
            }, {
                xtype: "actioncolumn",
                width: 20,
                action: "cities",
                stopSelection: false,
                tooltip: "Ciudades",
                icon: "css/city.png",
                iconCls: "city"
            }, {
                xtype: "actioncolumn",
                width: 20,
                action: "edit",
                tooltip: "Editar",
                stopSelection: false,
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

        Ext.define("flybox.view.country.FormSalePoint", {
            extend: "flybox.view.DeprisaForm",
            alias: "widget.formSalePoint",
            title: "Editar punto de venta",
            object: "salesPoint",
            fields: [{
                xtype: "hiddenfield",
                name: "idsalepoint",
                value: 0
            }, {
                xtype: "hiddenfield",
                name: "idcity",
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
                name: "address",
                value: "",
                allowBlank: false,
                anchor: "90%",
                fieldLabel: "* Direcci\xf3n"
            }], buttons: [{
                text: "Guardar",
                action: "save"
            }, {
                text: "Cancelar",
                action: "cancel"
            }]
        });

        Ext.define("flybox.view.country.FormCity", {
            extend: "flybox.view.DeprisaForm",
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

        Ext.define("flybox.view.country.Form", {
            extend: "flybox.view.DeprisaForm",
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

        Ext.define("flybox.view.country.Cities", {
            extend: "flybox.view.DeprisaGrid",
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

        Ext.define('flybox.view.delivery_company.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'deliveryCompany',
            alias: 'widget.listDeliveryCompanies',
            title: 'Listado empresas transportadoras',
            store: 'DeliveryCompany',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'iddeliverycompany'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 3
            }, {
                header: 'Pa\xeds',
                filter: 'string',
                dataIndex: 'country',
                renderer: function (value) {
                    return value.name
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
                icon: 'css/remove.png',
                stopSelection: false,
                iconCls: 'remove'
            }]
        });

        Ext.define('flybox.view.delivery_company.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formDeliveryCompany',
            title: 'Editar empresa transportadora',
            object: 'deliveryCompanies',
            fields: [{
                xtype: 'hiddenfield',
                name: 'iddeliverycompany',
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
                name: 'idcountry',
                forceSelection: true,
                anchor: '90%',
                allowBlank: false,
                store: 'Country',
                fieldLabel: '* Pa\xeds',
                valueField: 'idcountry',
                displayField: 'name',
                queryMode: 'local'
            }], buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.dispatch.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'dispatch',
            alias: 'widget.listDispatchedPackages',
            title: 'Listado paquetes despachados',
            store: 'Dispatch',
            columns: [{
                header: 'Casillero',
                dataIndex: 'locker',
                filter: 'string',
                renderer: function (value) {
                    return value.idlocker;
                },
                flex: 1
            }, {
                header: 'Gu\xeda socrates',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 1
            }, {
                header: 'Producto',
                filter: 'string',
                dataIndex: 'product',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                header: 'Partida arancelaria',
                dataIndex: 'typePackage',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                header: 'Sello de seguridad',
                filter: 'string',
                dataIndex: 'securityStamp',
                flex: 1
            }, {
                header: 'Fecha despacho',
                dataIndex: 'dateDispatch',
                filter: {
                    type: 'date',
                    fields: {
                        lt: {
                            text: 'Antes de'
                        },
                        gt: {
                            text: 'Depu\xe9s de '
                        },
                        eq: {
                            text: 'El d\xeda'
                        }
                    },
                    dateFormat: 'Y-m-d H:i:s'
                },
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Valor declarado',
                dataIndex: 'declaredValue',
                flex: 1
            }, {
                header: 'Peso',
                dataIndex: 'weight',
                flex: 1
            }, {
                header: 'Descripci\xf3n',
                dataIndex: 'description',
                filter: 'string',
                renderer: function (value) {
                    var str = new String(value);
                    var items = str.split(",");
                    var html = "<table border='1'><tr><th>Descripci&oacute;n</th><th>Cantidad</th><th>Valor unitario</th><th>Tracking</th></tr>";
                    for (i = 0; i < items.length; i++) {
                        var description = items[i].substr(0, items[i].indexOf("("));
                        var values = items[i].substring(items[i].indexOf("(") + 1, items[i].length - 1).split("|");
                        html += "<tr><td>" + description + "</td><td>" + values[0] + "</td><td>" + values[1] + "</td><td>" + values[2] + "</td></tr>";
                    }
                    html += "</table>";
                    return html;
                },
                flex: 4
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'printer',
                tooltip: 'Reimprimir label y factura',
                stopSelection: false,
                icon: 'css/printer.png',
                iconCls: 'printer'
            }]
        });

        Ext.define('flybox.view.dispatch.FormMiles', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formMiles',
            title: 'Seleccionar rango de fechas para generar el reporte',
            maximizable: true,
            width: 600,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                xtype: 'form',
                url: 'stores/list_objects.aspx',
                method: 'get',
                defaults: {
                    labelAlign: 'right'
                },
                frame: true,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'miles'
                }, {
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'datefield',
                    name: 'date_begin',
                    anchor: '95%',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    endDateField: 'enddt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha inicio'
                }, {
                    xtype: 'datefield',
                    name: 'date_end',
                    itemId: 'enddt',
                    anchor: '95%',
                    vtype: 'daterange',
                    startDateField: 'startdt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha fin'
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.economy_sector.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'economySector',
            alias: 'widget.listEconomySectors',
            title: 'Listado de sectores de la econom\xeda',
            store: 'EconomySector',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'ideconomysector'
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

        Ext.define('flybox.view.economy_sector.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formEconomySector',
            title: 'Editar sector de la econom\xeda',
            object: 'economySectors',
            fields: [{
                xtype: 'hiddenfield',
                name: 'ideconomysector',
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

        Ext.define('flybox.view.group.Users', {
            extend: 'flybox.view.DeprisaItemSelector',
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

        Ext.define('flybox.view.group.Grid', {
            extend: 'flybox.view.DeprisaGrid',
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
                action: 'countries',
                tooltip: 'Paises',
                icon: 'css/country.png',
                stopSelection: false,
                iconCls: 'country'
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

        Ext.define('flybox.view.group.Form', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.group.Countries', {
            extend: 'flybox.view.DeprisaItemSelector',
            alias: 'widget.listCountriesGroup',
            title: 'Listado paises del grupo',
            iconCls: 'country',
            columns: [{
                header: 'ID',
                filterable: true,
                dataIndex: 'idcountry'
            }, {
                header: 'Nombre',
                filterable: true,
                dataIndex: 'name',
                flex: 3
            }],
            storeSource: 'NoCountriesGroup',
            storeFinish: 'CountriesGroup'
        });

        Ext.define('flybox.view.group.Applications', {
            extend: 'flybox.view.DeprisaItemSelector',
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

        Ext.define('flybox.view.group_tracking.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'groupTracking',
            alias: 'widget.listGroupsTracking',
            title: 'Listado grupos de tracking',
            store: 'GroupTracking',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idgrouptracking'
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

        Ext.define('flybox.view.group_tracking.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formGroupTracking',
            title: 'Editar grupo de tracking',
            object: 'groupsTracking',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idgrouptracking',
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

        Ext.define('flybox.view.info_method.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'infoMethod',
            alias: 'widget.listInfoMethods',
            title: 'Listado de m\xe9todos de informaci\xf3n',
            store: 'InfoMethod',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idinfomethod'
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

        Ext.define('flybox.view.info_method.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formInfoMethod',
            title: 'Editar m\xe9todo de informaci\xf3n',
            object: 'infoMethods',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idinfomethod',
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

        Ext.define('flybox.view.level_access.Grid', {
            extend: 'flybox.view.DeprisaGrid',
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

        Ext.define('flybox.view.level_access.Form', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.list_customer.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'listCustomer',
            alias: 'widget.listListCustomers',
            title: 'Listado de listas de clientes',
            store: 'ListCustomer',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idlistcustomer'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 3
            }, {
                header: 'D\xedas bodegaje',
                filter: 'number',
                dataIndex: 'daysStorageFree',
                flex: 2
            }, {
                header: 'D\xedas abandono',
                filter: 'number',
                dataIndex: 'daysAbandonment',
                flex: 2
            }, {
                header: 'Valor d\xeda bodegaje',
                filter: 'number',
                dataIndex: 'dayValue',
                flex: 2
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

        Ext.define('flybox.view.list_customer.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formListCustomer',
            title: 'Editar lista de cliente',
            object: 'listCustomers',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idlistcustomer',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'name',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Nombre'
            }, {
                xtype: 'numberfield',
                name: 'daysStorageFree',
                value: 0,
                minValue: 1,
                hideTrigger: true,
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* D\xedas bodegaje'
            }, {
                xtype: 'numberfield',
                name: 'daysAbandonment',
                value: 0,
                minValue: 1,
                hideTrigger: true,
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* D\xedas abandono'
            }, {
                xtype: 'numberfield',
                name: 'dayValue',
                value: 0,
                minValue: 0,
                decimalPrecision: 2,
                decimalSeparator: '.',
                hideTrigger: true,
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Valor d\xeda bodegaje'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.locker.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'locker',
            alias: 'widget.listLockers',
            title: 'Listado casilleros',
            store: 'Locker',
            columns: [{
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'idlocker'
            }, {
                header: 'Usuario',
                filter: 'string',
                dataIndex: 'user',
                renderer: function (value) {
                    return value.name;
                },
                flex: 2
            }, {
                header: 'Email',
                filter: 'string',
                dataIndex: 'user',
                renderer: function (value) {
                    return value.email;
                },
                flex: 2
            }, {
                header: 'Tipo de casillero',
                filter: 'string',
                dataIndex: 'type',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                header: 'Estado',
                filter: 'string',
                dataIndex: 'stateLocker',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                header: 'Fecha creaci\xf3n',
                filter: 'date',
                dataIndex: 'dateAdded',
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Fecha rechazo',
                filter: 'date',
                dataIndex: 'dateReject',
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Motivo rechazo',
                filter: 'string',
                dataIndex: 'rejectionReason',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'user',
                tooltip: 'Titular',
                icon: 'css/user.png',
                iconCls: 'user',
                stopSelection: false
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'edit',
                tooltip: 'Editar',
                icon: 'css/edit.png',
                iconCls: 'edit',
                stopSelection: false
            }]
        });

        Ext.define('flybox.view.locker.FormReport', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formReportLocker',
            title: 'Generar reporte de casilleros',
            width: 600,
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            autoScroll: true,
            items: [{
                xtype: 'form',
                autoScroll: true,
                url: 'stores/list_objects.aspx',
                method: 'get',
                frame: true,
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'rptLocker'
                }, {
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'datefield',
                    name: 'date_begin',
                    anchor: '95%',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    endDateField: 'enddt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha inicio'
                }, {
                    xtype: 'datefield',
                    anchor: '95%',
                    name: 'date_end',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    startDateField: 'startdt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha fin'
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.package.FormBehavior', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formReportBehavior',
            title: 'Generar reporte de comportamiento de operaciones',
            width: 600,
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            autoScroll: true,
            items: [{
                xtype: 'form',
                autoScroll: true,
                url: 'stores/list_objects.aspx',
                method: 'get',
                frame: true,
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'rptBehavior'
                }, {
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'datefield',
                    name: 'date_begin',
                    anchor: '95%',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    endDateField: 'enddt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha inicio'
                }, {
                    xtype: 'datefield',
                    anchor: '95%',
                    name: 'date_end',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    startDateField: 'startdt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha fin'
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.locker.FormCustomer', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formCustomer',
            height: 600,
            width: 800,
            object: 'customer',
            title: 'Editar titular del casillero',
            fields: [{
                layout: 'column',
                border: false,
                defaults: {
                    layout: 'anchor',
                    style: 'margin: 3px 10px; padding: 3px 10px;',
                    anchor: '100%',
                    columnWidth: 0.5,
                    labelWidth: 135
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'iduser',
                    value: 0
                }, {
                    xtype: 'hiddenfield',
                    name: 'facebookUserID',
                    value: ''
                }, {
                    xtype: 'combo',
                    name: 'idtypelocker',
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    store: 'TypeLocker',
                    fieldLabel: 'Tipo de casillero *',
                    readOnly: true,
                    valueField: 'idtypelocker',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    value: '',
                    maxLength: 200,
                    minLength: 2,
                    allowBlank: false,
                    fieldLabel: 'Nombres *'
                }, {
                    xtype: 'textfield',
                    name: 'lastname',
                    value: '',
                    maxLength: 50,
                    minLength: 2,
                    allowBlank: false,
                    fieldLabel: 'Apellidos *'
                }, {
                    xtype: 'combo',
                    name: 'idtypeid',
                    forceSelection: true,
                    allowBlank: false,
                    typeAhead: true,
                    store: 'TypeID',
                    fieldLabel: 'Tipo de identificaci\xf3n *',
                    valueField: 'idtypeid',
                    readOnly: true,
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    name: 'identification',
                    vtype: 'alphanum',
                    readOnly: true,
                    maxLength: 50,
                    minLength: 5,
                    value: '',
                    allowBlank: false,
                    fieldLabel: 'Identificaci\xf3n *'
                }, {
                    xtype: 'combo',
                    name: 'idcountry',
                    forceSelection: true,
                    typeAhead: true,
                    store: 'Country',
                    hidden: true,
                    allowBlank: false,
                    fieldLabel: 'Pa\xeds *',
                    valueField: 'idcountry',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    name: 'idcity',
                    forceSelection: true,
                    typeAhead: true,
                    store: 'City',
                    hidden: true,
                    allowBlank: false,
                    fieldLabel: 'Ciudad *',
                    valueField: 'idcity',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    name: 'ideconomysector',
                    hidden: true,
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    store: 'EconomySector',
                    fieldLabel: 'Sector de la econom\xeda *',
                    valueField: 'ideconomysector',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    name: 'delivery_salepoint',
                    hidden: true,
                    typeAhead: true,
                    value: 0,
                    forceSelection: true,
                    allowBlank: false,
                    store: 'DeliverySalePoint',
                    fieldLabel: 'Entrega en punto de venta *',
                    valueField: 'iddeliverysalepoint',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    name: 'address',
                    hidden: true,
                    maxLength: 200,
                    value: '',
                    allowBlank: true,
                    fieldLabel: 'Direcci\xf3n de correspondencia *'
                }, {
                    xtype: 'combo',
                    name: 'idsalepoint',
                    typeAhead: true,
                    hidden: true,
                    forceSelection: true,
                    allowBlank: true,
                    store: 'SalePoint',
                    fieldLabel: 'Punto de venta *',
                    valueField: 'idsalepoint',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    name: 'homePhone',
                    hidden: true,
                    value: '',
                    allowBlank: false,
                    fieldLabel: 'Telefono fijo *'
                }, {
                    xtype: 'textfield',
                    name: 'phone',
                    hidden: true,
                    value: '',
                    vtype: 'alphanum',
                    allowBlank: false,
                    fieldLabel: 'Celular *'
                }, {
                    xtype: 'textfield',
                    name: 'nameContact',
                    value: '',
                    hidden: true,
                    fieldLabel: 'Nombre contacto *'
                }, {
                    xtype: 'textfield',
                    name: 'phoneContact',
                    value: '',
                    hidden: true,
                    fieldLabel: 'Tel\xe9fono contacto *'
                }, {
                    xtype: 'textfield',
                    name: 'email',
                    vtype: 'email',
                    value: '',
                    hidden: true,
                    allowBlank: false,
                    fieldLabel: 'Correo electr\xf3nico *'
                }, {
                    xtype: 'textfield',
                    name: 'alternateEmail',
                    vtype: 'email',
                    value: '',
                    hidden: true,
                    fieldLabel: 'Correo electr\xf3nico alterno'
                }, {
                    xtype: 'combo',
                    name: 'idoccupation',
                    hidden: true,
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    store: 'Occupation',
                    fieldLabel: 'Profesi\xf3n *',
                    valueField: 'idoccupation',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'datefield',
                    name: 'birthday',
                    hidden: true,
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha nacimiento (aaaa-mm-dd)*',
                    queryMode: 'local'
                }, {
                    xtype: 'textfield',
                    name: 'lifemiles',
                    hidden: true,
                    value: '',
                    fieldLabel: 'N\xfamero tarjeta lifemiles'
                }, {
                    xtype: 'combo',
                    name: 'idinfomethod',
                    hidden: true,
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    store: 'InfoMethod',
                    fieldLabel: 'C\xf3mo se enter\xf3 de nuestros servicios *',
                    valueField: 'idinfomethod',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'combo',
                    name: 'idlistcustomer',
                    forceSelection: true,
                    typeAhead: true,
                    allowBlank: false,
                    store: 'ListCustomer',
                    fieldLabel: 'Lista de cliente *',
                    valueField: 'idlistcustomer',
                    displayField: 'name',
                    queryMode: 'local'
                }, {
                    xtype: 'grid',
                    columnWidth: 1,
                    store: 'Authorized',
                    columns: [{
                        header: 'Nombre',
                        flex: 1,
                        dataIndex: 'name'
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
                }]
            }],
            buttons: [{
                text: 'Adicionar persona autorizada',
                action: 'addAuthorized'
            }, {
                text: 'Cambiar pregunta y respuesta secreta',
                action: 'chageSecretQuestion'
            }, {
                text: 'Cambiar contraseña',
                action: 'changePassword'
            }, {
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.locker.FormChangePassword', {
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
                url: "ajax/save_object.aspx",
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

        Ext.define('flybox.view.locker.FormAuthorizedAdmon', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formAuthorizedAdmon',
            title: 'Editar autorizado',
            object: 'authorizeds',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idauthorized',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'iduser',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'name',
                anchor: '90%',
                value: '',
                allowBlank: false,
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

        Ext.define('flybox.view.locker.FormAuthorized', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formAuthorized',
            title: 'Editar autorizado',
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                xtype: 'form',
                url: 'ajax/save_object.aspx',
                defaults: {
                    labelAlign: 'right'
                },
                frame: true,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'authorized'
                }, {
                    xtype: 'hiddenfield',
                    name: 'idauthorized',
                    value: 0
                }, {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                }, {
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'textfield',
                    name: 'name',
                    anchor: '90%',
                    value: '',
                    allowBlank: false,
                    fieldLabel: 'Nombre *'
                }],
                buttons: [{
                    text: 'Guardar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.locker.Form', {
            extend: 'flybox.view.DeprisaForm',
            iconCls: 'edit',
            alias: 'widget.formLocker',
            title: 'Editar casillero',
            object: 'lockers',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idlocker',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'iduser',
                value: 0
            }, {
                xtype: 'combo',
                anchor: '90%',
                name: 'idtypelocker',
                forceSelection: true,
                allowBlank: false,
                store: 'TypeLocker',
                fieldLabel: 'Tipo de casillero *',
                valueField: 'idtypelocker',
                displayField: 'name',
                queryMode: 'local',
                readOnly: true
            }, {
                xtype: 'textfield',
                name: 'user',
                anchor: '90%',
                value: '',
                allowBlank: false,
                fieldLabel: 'Cliente *',
                readOnly: true
            }, {
                xtype: 'datefield',
                name: 'dateAdded',
                anchor: '90%',
                value: '',
                altFormats: "Y-m-d",
                format: "Y-m-d",
                submitFormat: "Y-m-d",
                allowBlank: false,
                fieldLabel: 'Fecha creaci\xf3n *',
                readOnly: true
            }, {
                xtype: 'combo',
                name: 'idstatelocker',
                anchor: '90%',
                forceSelection: true,
                allowBlank: false,
                store: 'StateLocker',
                fieldLabel: 'Estado *',
                valueField: 'idstatelocker',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'datefield',
                name: 'dateReject',
                value: '',
                anchor: '90%',
                altFormats: "Y-m-d",
                format: "Y-m-d",
                submitFormat: "Y-m-d",
                hidden: true,
                fieldLabel: 'Fecha rechazo',
                readOnly: true
            }, {
                xtype: 'combo',
                name: 'idrejectionreason',
                forceSelection: true,
                anchor: '90%',
                hidden: true,
                store: 'RejectionReason',
                fieldLabel: 'Motivo de rechazo *',
                valueField: 'idrejectionreason',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'textfield',
                name: 'comments',
                anchor: '90%',
                value: '',
                fieldLabel: 'Comentarios'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.measuring_system.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'measuringSystem',
            alias: 'widget.listMeasuringsSystem',
            title: 'Listado sistemas de medida',
            store: 'MeasuringSystem',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idmeasuringsystem'
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
                stopSelection: false,
                icon: 'css/edit.png',
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

        Ext.define('flybox.view.measuring_system.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formMeasuringSystem',
            title: 'Editar sistema de medida',
            object: 'measuringsSystem',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idmeasuringsystem',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'name',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Nombre'
            }], buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.money.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'money',
            alias: 'widget.listMoneys',
            title: 'Listado de monedas',
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

        Ext.define('flybox.view.money.Form', {
            extend: 'flybox.view.DeprisaForm',
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
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.occupation.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'occupation',
            alias: 'widget.listOccupations',
            title: 'Listado de profesiones',
            store: 'Occupation',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idoccupation'
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

        Ext.define('flybox.view.occupation.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formOccupation',
            title: 'Editar profesi\xf3n',
            object: 'occupations',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idoccupation',
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

        Ext.define('flybox.view.package.Authorizeds', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'authorizedPackage',
            features: [{
                ftype: 'grouping',
                enableGroupingMenu: false,
                collapsible: false,
                groupHeaderTpl: 'Grupo: ({name}) Cantidad de paquetes: ({rows.length})&nbsp;|&nbsp;<a href="#" onclick="dispatch({name})">Despachar</a>&nbsp;|&nbsp;<a href="#" onclick="disconsolidate({name})">Desconsolidar</a>',
            }],
            alias: 'widget.listAuthorizedPackages',
            title: 'Listado paquetes autorizados',
            layout: 'fit',
            store: 'AuthorizedPackage',
            closable: true,
            columns: [{
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                renderer: function (value) {
                    return value.idlocker;
                }
            }, {
                header: 'Usuario',
                dataIndex: 'locker',
                renderer: function (value) {
                    return value.user.name;
                }
            }, {
                header: 'Tipo de env\xedo',
                dataIndex: 'typePackage',
                flex: 1,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Ciudad de entrega',
                dataIndex: 'cityDelivery',
                flex: 1,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Descripci\xf3n',
                dataIndex: 'description',
                flex: 3
            }, {
                header: 'Gu\xeda transportador',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Peso',
                dataIndex: 'weight',
                flex: 1
            }, {
                header: 'Empresa transportadora',
                dataIndex: 'deliveryCompany',
                flex: 1,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha de autorizaci\xf3n',
                dataIndex: 'dateAuthorization',
                flex: 2,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Fecha de ingreso',
                dataIndex: 'dateEnter',
                flex: 2,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Bodega',
                dataIndex: 'ubication',
                flex: 1,
                renderer: function (value) {
                    return value.warehouse.name;
                }
            }, {
                header: 'Ubicaci\xf3n',
                filter: 'string',
                dataIndex: 'ubication',
                flex: 1,
                renderer: function (value) {
                    return value.code;
                }
            }, {
                header: 'Usuario ingresa',
                filter: 'string',
                dataIndex: 'userEnter',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'missing',
                tooltip: 'Reportar p\xe9rdida',
                stopSelection: false,
                icon: 'css/missing.png',
                iconCls: 'edit'
            }]
        });

        Ext.define('flybox.view.package.DG', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'pending',
            alias: 'widget.listDGPackages',
            title: 'Listado paquetes DG',
            store: 'DGPackage',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpackage'
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                renderer: function (value) {
                    return value.idlocker;
                },
                flex: 1
            }, {
                header: 'Cliente',
                filter: 'string',
                dataIndex: 'locker',
                renderer: function (value) {
                    return value.user.name;
                },
                flex: 3
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Descripci\xf3n',
                filter: 'string',
                dataIndex: 'description',
                flex: 3
            }, {
                header: 'Transportadora',
                filter: 'string',
                dataIndex: 'deliveryCompany',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha recepci\xf3n',
                xtype: 'datecolumn',
                dataIndex: 'dateReceive',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario recibe',
                filter: 'string',
                dataIndex: 'userReceive',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha ingreso',
                xtype: 'datecolumn',
                dataIndex: 'dateEnter',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario ingresa',
                filter: 'string',
                dataIndex: 'userEnter',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'reEnterDG',
                tooltip: 'Reubicar en ingresados',
                stopSelection: false,
                icon: 'css/enterPackage.png',
                iconCls: 'edit'
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'print',
                tooltip: 'Imprimir',
                icon: 'css/printer.png',
                stopSelection: false,
                iconCls: 'printer'
            }]
        });

        Ext.define('flybox.view.package.Dispatch', {
            extend: 'flybox.view.DeprisaForm',
            iconCls: 'edit',
            alias: 'widget.formDispatchPackage',
            title: 'Despachar grupo de paquetes',
            width: 600,
            object: 'dispatchPackages',
            fields: [{
                xtype: 'textfield',
                fieldLabel: '* Grupo de paquetes',
                readOnly: true,
                allowBlank: false,
                anchor: '90%',
                name: 'group',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: 'Bono',
                anchor: '90%',
                name: 'voucher',
                value: ''
            }, {
                xtype: 'combo',
                name: 'collect',
                value: true,
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Collect',
                store: [[false, 'No'], [true, 'Si']],
                queryMode: 'local',
                typeAHead: true
            }, {
                xtype: 'textfield',
                fieldLabel: '* Sello de seguridad',
                allowBlank: false,
                anchor: '90%',
                name: 'securityStamp',
                value: ''
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Observaciones en paquetes',
                anchor: '90%',
                name: 'observations',
                value: ''
            }],
            buttons: [{
                text: 'Despachar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.package.Entereds', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'enteredPackage',
            alias: 'widget.listEnteredPackages',
            title: 'Listado paquetes ingresados',
            store: 'EnteredPackage',
            columns: [{
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                flex: 3,
                renderer: function (value) {
                    if (value.idlocker == 0) {
                        return "No asignado";
                    } else {
                        return value.idlocker;
                    }
                }
            }, {
                header: 'Cliente',
                dataIndex: 'locker',
                flex: 3,
                renderer: function (value) {
                    return value.user.name;
                }
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Descripci\xf3n',
                filter: 'string',
                dataIndex: 'description',
                flex: 3
            }, {
                header: 'Peso',
                filter: 'number',
                dataIndex: 'weight',
                flex: 2
            }, {
                header: 'Transportadora',
                filter: 'string',
                dataIndex: 'deliveryCompany',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Producto',
                filter: 'string',
                dataIndex: 'product',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha recepci\xf3n',
                xtype: 'datecolumn',
                dataIndex: 'dateReceive',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario recibe',
                filter: 'string',
                dataIndex: 'userReceive',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha ingreso',
                xtype: 'datecolumn',
                dataIndex: 'dateEnter',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario ingresa',
                filter: 'string',
                dataIndex: 'userEnter',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Bodega',
                dataIndex: 'ubication',
                flex: 2,
                renderer: function (value) {
                    return value.warehouse.name;
                }
            }, {
                header: 'Ubicaci\xf3n',
                filter: 'string',
                dataIndex: 'ubication',
                flex: 2,
                renderer: function (value) {
                    return value.code;
                }
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'reallowLocker',
                tooltip: 'Reasignar a casillero',
                stopSelection: false,
                icon: 'css/locker.png',
                iconCls: 'edit'
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'print',
                tooltip: 'Imprimir',
                icon: 'css/printer.png',
                stopSelection: false,
                iconCls: 'printer'
            }]
        });

        Ext.define('flybox.view.package.FormEditPackageEntered', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formEditEnteredPackage',
            title: 'Detalle de paquete',
            width: 800,
            fields: [{
                xtype: 'hiddenfield',
                name: 'weight',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'maxValueDeclared',
                value: 0
            }, {
                xtype: 'combo',
                fieldLabel: 'Tipo de env\xedo',
                store: 'FE_TypePackage',
                typeAhead: true,
                forceSelection: true,
                allowBlank: false,
                valueField: 'idtypepackage',
                displayField: 'name',
                name: 'idtypepackage',
                anchor: '95%',
                queryMode: 'local'
            }, {
                xtype: 'combo',
                hidden: true,
                fieldLabel: 'Producto',
                store: 'FE_Product',
                typeAhead: true,
                forceSelection: true,
                allowBlank: false,
                valueField: 'idproduct',
                displayField: 'name',
                name: 'idproduct',
                anchor: '95%',
                queryMode: 'local'
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Observaciones',
                name: 'observations',
                anchor: '95%'
            }, {
                xtype: 'grid',
                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 1
                }],
                store: 'FE_Item',
                columns: [{
                    header: 'Descripci\xf3n',
                    tdCls: 'cellItemNotEdit',
                    flex: 2,
                    dataIndex: 'description'
                }, {
                    header: 'Cantidad',
                    tdCls: 'cellItemNotEdit',
                    flex: 2,
                    dataIndex: 'amount'
                }, {
                    header: 'Haz clic para editar el valor declarado unitario',
                    flex: 4,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        hideTrigger: true,
                        decimalPrecision: 2,
                        decimalSeparator: '.',
                        minValue: 0
                    },
                    tdCls: 'cellEditDeclaredValue',
                    dataIndex: 'unitValue'
                }]
            }],
            buttons: ['->', {
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.package.FormEnter', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formEnterPackage',
            title: 'Ingresar paquete - Normal',
            object: 'enterPackage',
            maxHeight: 700,
            width: 800,
            fields: [{
                xtype: 'hiddenfield',
                name: 'prealerted',
                value: false
            }, {
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idcityorigin',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'iddeliverycompany',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idproduct',
                value: 0
            }, {
                xtype: 'combo',
                name: 'idtypeubication',
                labelWidth: 150,
                anchor: '95%',
                store: 'TypeUbication',
                forceSelection: true,
                cls: 'importantField',
                allowBlank: false,
                fieldLabel: '* Clasificaci\xf3n',
                valueField: 'idtypeubication',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                hideTrigger: true,
                name: 'idlocker',
                minValue: 0,
                fieldLabel: '* Casillero',
                allowBlank: false,
                value: 0
            }, {
                xtype: 'textfield',
                labelWidth: 150,
                anchor: '95%',
                name: 'authorizeds',
                fieldLabel: '* Autorizados',
                value: '',
                readOnly: true
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'autodispatch',
                value: '',
                allowBlank: false,
                anchor: '95%',
                fieldLabel: '* Despacho automático',
                cls: 'importantField',
                store: [[false, 'No'], [true, 'Si']],
                queryMode: 'local',
                typeAHead: true
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'consolidate',
                value: '',
                allowBlank: false,
                anchor: '95%',
                fieldLabel: '* Consolidable',
                store: [[false, 'No'], [true, 'Si']],
                queryMode: 'local',
                typeAHead: true
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'idpayment',
                value: '',
                allowBlank: false,
                anchor: '95%',
                fieldLabel: '* Tipo de pago',
                hidden: true,
                cls: 'importantField',
                store: 'Payment',
                valueField: 'idpayment',
                displayField: 'name',
                readOnly: true,
                queryMode: 'local',
                typeAHead: true
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'idtypepackage',
                anchor: '95%',
                store: 'TypePackage',
                hidden: true,
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Tipo de env\xedo',
                valueField: 'idtypepackage',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'provide',
                anchor: '95%',
                store: 'Provide',
                hidden: true,
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Proveedor',
                valueField: 'idprovide',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'textfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'tracking',
                allowBlank: false,
                fieldLabel: '* N\xfamero de gu\xeda',
                value: '',
                readOnly: true
            }, {
                xtype: 'textareafield',
                anchor: '95%',
                labelWidth: 150,
                name: 'observations',
                fieldLabel: 'Observaciones',
                value: ''
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'weight',
                allowBlank: false,
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0.01,
                hideTrigger: true,
                fieldLabel: '* Peso'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'lenght',
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                fieldLabel: '* Largo'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'height',
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                fieldLabel: '* Alto'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                name: 'width',
                labelWidth: 150,
                allowBlank: false,
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                fieldLabel: '* Ancho'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                name: 'weightVolumen',
                labelWidth: 150,
                decimalPrecision: 5,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                readOnly: true,
                fieldLabel: '* Peso volum\xe9trico'
            }, {
                xtype: 'grid',
                store: 'Item',
                width: 750,
                reserveScrollbar: true,
                columns: [{
                    header: 'Descripci\xf3n',
                    dataIndex: 'description',
                    flex: 3
                }, {
                    header: 'Cantidad',
                    dataIndex: 'amount',
                    flex: 1
                }, {
                    header: 'Valor unitario',
                    dataIndex: 'unitValue',
                    flex: 1
                }, {
                    xtype: 'actioncolumn',
                    width: 25,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 25,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    stopSelection: false,
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    pageSize: 25,
                    displayInfo: true,
                    store: 'Item',
                    items: ['-', {
                        xtype: 'button',
                        text: 'Insertar',
                        iconCls: 'insert',
                        tooltip: 'Insertar',
                        action: 'insert'
                    }]
                }
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.package.FormEditPackage', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formEditPackage',
            title: 'Editar paquete',
            object: 'admonPackages',
            maxHeight: 800,
            width: 800,
            fields: [{
                xtype: 'hiddenfield',
                name: 'idcityorigin',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                hideTrigger: true,
                name: 'idlocker',
                minValue: 0,
                fieldLabel: '* Casillero',
                allowBlank: false,
                value: 0
            }, {
                xtype: 'textfield',
                labelWidth: 150,
                anchor: '95%',
                name: 'authorizeds',
                fieldLabel: '* Autorizados',
                value: '',
                readOnly: true
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'idtypepackage',
                anchor: '95%',
                store: 'TypePackage',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Tipo de env\xedo',
                valueField: 'idtypepackage',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'textfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'tracking',
                allowBlank: false,
                fieldLabel: '* N\xfamero de gu\xeda',
                value: '',
                readOnly: true
            }, {
                xtype: 'textareafield',
                anchor: '95%',
                labelWidth: 150,
                name: 'observations',
                fieldLabel: 'Observaciones',
                value: ''
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'weight',
                allowBlank: false,
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0.01,
                hideTrigger: true,
                fieldLabel: '* Peso'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'lenght',
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                fieldLabel: '* Largo'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                labelWidth: 150,
                name: 'height',
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                fieldLabel: '* Alto'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                name: 'width',
                labelWidth: 150,
                allowBlank: false,
                decimalPrecision: 2,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                fieldLabel: '* Ancho'
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                name: 'weightVolumen',
                labelWidth: 150,
                decimalPrecision: 5,
                decimalSeparator: '.',
                minValue: 0,
                hideTrigger: true,
                readOnly: true,
                fieldLabel: '* Peso volum\xe9trico'
            }, {
                xtype: 'grid',
                store: 'Item',
                width: 750,
                reserveScrollbar: true,
                columns: [{
                    header: 'Descripci\xf3n',
                    dataIndex: 'description',
                    flex: 3
                }, {
                    header: 'Cantidad',
                    dataIndex: 'amount',
                    flex: 1
                }, {
                    header: 'Valor unitario',
                    dataIndex: 'unitValue',
                    flex: 1
                }, {
                    xtype: 'actioncolumn',
                    width: 25,
                    action: 'edit',
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    stopSelection: false,
                    iconCls: 'edit'
                }, {
                    xtype: 'actioncolumn',
                    width: 25,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    stopSelection: false,
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }],
                bbar: {
                    xtype: 'pagingtoolbar',
                    pageSize: 25,
                    displayInfo: true,
                    store: 'Item',
                    items: ['-', {
                        xtype: 'button',
                        text: 'Insertar',
                        iconCls: 'insert',
                        tooltip: 'Insertar',
                        action: 'insert'
                    }]
                }
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.package.FormChangeStatePackage', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formChangeStatePackage',
            title: 'Cambiar estado paquete',
            object: 'changeStatePackage',
            maxHeight: 800,
            width: 800,
            fields: [{
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'combo',
                labelWidth: 150,
                name: 'idstatepackage',
                anchor: '95%',
                store: 'StatePackage',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Tipo de env\xedo',
                valueField: 'idstatepackage',
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

        Ext.define('flybox.view.package.FormItem', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formItem',
            title: 'Ingresar \xedtem',
            object: 'items',
            fields: [{
                xtype: 'hiddenfield',
                name: 'iditem',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'textfield',
                anchor: '95%',
                name: 'description',
                fieldLabel: '* Descripci\xf3n',
                allowBlank: false,
                value: ''
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                hideTrigger: true,
                allowBlank: false,
                name: 'amount',
                maxValue: 6,
                minValue: 1,
                fieldLabel: '* Cantidad',
                value: ''
            }, {
                xtype: 'numberfield',
                anchor: '95%',
                name: 'unitValue',
                allowBlank: false,
                decimalPrecision: 2,
                decimalSeparator: '.',
                hideTrigger: true,
                fieldLabel: '* Valor unitario',
                readOnly: true
            }],
            buttons: [{
                text: 'Guardar y crear nuevo',
                action: 'saveAndNew'
            }, {
                text: 'Guardar y terminar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.package.FormReportAllPackage', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formReportAllPackage',
            title: 'Generar reporte de todos los paquetes',
            width: 600,
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            autoScroll: true,
            items: [{
                xtype: 'form',
                autoScroll: true,
                url: 'stores/list_objects.aspx',
                method: 'get',
                frame: true,
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'rptAllPackage'
                }, {
                    columnWidth: 1,
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'datefield',
                    name: 'date_begin',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    endDateField: 'enddt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha inicio'
                }, {
                    xtype: 'datefield',
                    name: 'date_end',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    startDateField: 'startdt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha fin'
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.package.FormReportAuthorizeds', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            width: 600,
            maximizable: true,
            alias: 'widget.formReportAuthorized',
            title: 'Generar reporte de paquetes autorizados',
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                xtype: 'form',
                method: 'get',
                autoScroll: true,
                url: 'stores/list_objects.aspx',
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    layout: 'column',
                    border: false,
                    defaults: {
                        layout: 'anchor',
                        style: 'margin: 3px 10px; padding: 3px 10px;',
                        anchor: '100%',
                        columnWidth: 0.5,
                        labelWidth: 100
                    },
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'object',
                        value: 'rptAuthorized'
                    }, {
                        columnWidth: 1,
                        xtype: 'panel',
                        html: '* Campos obligatorios',
                        border: 0,
                        padding: 10
                    }, {
                        xtype: 'datefield',
                        name: 'date_begin',
                        itemId: 'startdt',
                        vtype: 'daterange',
                        endDateField: 'enddt',
                        altFormats: 'Y-m-d',
                        format: 'Y-m-d',
                        submitFormat: 'Y-m-d',
                        allowBlank: false,
                        fieldLabel: 'Fecha inicio'
                    }, {
                        xtype: 'timefield',
                        name: 'time_begin',
                        format: 'H:i',
                        allowBlank: false,
                        fieldLabel: 'Hora inicio'
                    }, {
                        xtype: 'datefield',
                        name: 'date_end',
                        itemId: 'enddt',
                        vtype: 'daterange',
                        startDateField: 'startdt',
                        altFormats: 'Y-m-d',
                        format: 'Y-m-d',
                        submitFormat: 'Y-m-d',
                        allowBlank: false,
                        fieldLabel: 'Fecha fin'
                    }, {
                        xtype: 'timefield',
                        name: 'time_end',
                        format: 'H:i',
                        allowBlank: false,
                        fieldLabel: 'Hora fin'
                    }]
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.package.FormReportProductivity', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formReportProductivity',
            title: 'Generar reporte de productividad',
            width: 600,
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            autoScroll: true,
            items: [{
                xtype: 'form',
                autoScroll: true,
                method: 'get',
                url: 'stores/list_objects.aspx',
                frame: true,
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'rptProductivity'
                }, {
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'datefield',
                    name: 'date_begin',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    endDateField: 'enddt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha inicio'
                }, {
                    xtype: 'datefield',
                    name: 'date_end',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    startDateField: 'startdt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha fin'
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.package.FormReportReceivedPackages', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formReportReceivedPackages',
            title: 'Generar reporte de paquetes recibidos por transportadora',
            width: 600,
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            autoScroll: true,
            items: [{
                xtype: 'form',
                autoScroll: true,
                url: 'stores/list_objects.aspx',
                method: 'get',
                frame: true,
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'rptReceivedPackages'
                }, {
                    columnWidth: 1,
                    xtype: 'panel',
                    html: '* Campos obligatorios',
                    border: 0,
                    padding: 10
                }, {
                    xtype: 'datefield',
                    name: 'date_begin',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    endDateField: 'enddt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha inicio'
                }, {
                    xtype: 'datefield',
                    name: 'date_end',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    startDateField: 'startdt',
                    altFormats: 'Y-m-d',
                    format: 'Y-m-d',
                    submitFormat: 'Y-m-d',
                    allowBlank: false,
                    fieldLabel: 'Fecha fin'
                }],
                buttons: [{
                    text: 'Generar',
                    action: 'save'
                }, {
                    text: 'Cancelar',
                    action: 'cancel'
                }]
            }]
        });

        Ext.define('flybox.view.package.FormSecurityStamp', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formSecurityStamp',
            title: 'Asignar sello de seguridad al despacho autom\xe1tico',
            object: 'dispatchAutodispatch',
            fields: [{
                xtype: 'hiddenfield',
                name: 'weight',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'lenght',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'height',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'width',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'securityStamp',
                labelWidth: 150,
                anchor: '95%',
                allowBlank: false,
                fieldLabel: '* Sello de seguridad'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.package.FormUbication', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formUbicationPackage',
            title: 'Asignar paquete a ubicación en bodega',
            object: 'enterPackage',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtypeubication',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idcityorigin',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'iddeliverycompany',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idproduct',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idlocker',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idtypepackage',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'provide',
                value: ''
            }, {
                xtype: 'hiddenfield',
                name: 'tracking',
                value: ''
            }, {
                xtype: 'hiddenfield',
                name: 'observations',
                value: ''
            }, {
                xtype: 'hiddenfield',
                name: 'weight',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'lenght',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'height',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'width',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'consolidate',
                value: false
            }, {
                xtype: 'combo',
                name: 'idwarehouse',
                anchor: '95%',
                store: 'WareHouse',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Bodega',
                valueField: 'idwarehouse',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'combo',
                name: 'idubication',
                anchor: '95%',
                store: 'Ubication',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Ubicaci\xf3n',
                valueField: 'idubication',
                displayField: 'code',
                queryMode: 'local'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }]
        });

        Ext.define('flybox.view.package.FormUbicationEdit', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formUbicationEditPackage',
            title: 'Asignar paquete a ubicación en bodega',
            object: 'admonPackages',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtypeubication',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idpackage',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idcityorigin',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'iddeliverycompany',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idproduct',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idlocker',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idtypepackage',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'provide',
                value: ''
            }, {
                xtype: 'hiddenfield',
                name: 'tracking',
                value: ''
            }, {
                xtype: 'hiddenfield',
                name: 'observations',
                value: ''
            }, {
                xtype: 'hiddenfield',
                name: 'weight',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'lenght',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'height',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'width',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'consolidate',
                value: false
            }, {
                xtype: 'combo',
                name: 'idwarehouse',
                anchor: '95%',
                store: 'WareHouse',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Bodega',
                valueField: 'idwarehouse',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'combo',
                name: 'idubication',
                anchor: '95%',
                store: 'Ubication',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Ubicaci\xf3n',
                valueField: 'idubication',
                displayField: 'code',
                queryMode: 'local'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }]
        });

        Ext.define('flybox.view.package.GridDisconsolidate', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.listDisconsolidatePackage',
            title: 'Desconsolidar grupo de paquetes',
            width: 600,
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            autoScroll: true,
            items: [{
                xtype: 'gridpanel',
                selType: 'checkboxmodel',
                selModel: {
                    mode: 'SIMPLE'
                },
                title: 'Art\xedculo',
                store: 'GroupPackage',
                columns: [{
                    header: 'Descripci\xf3n',
                    dataIndex: 'description',
                    flex: 1
                }, {
                    header: 'Gu\xeda transportador',
                    dataIndex: 'tracking',
                    flex: 1
                }, {
                    header: 'Peso',
                    dataIndex: 'weight',
                    flex: 1
                }]
            }],
            buttons: [{
                text: 'Desconsolidar'
            }]
        });

        Ext.define('flybox.view.package.Missings', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'missing',
            alias: 'widget.listMissingPackages',
            title: 'Listado paquetes perdidos',
            store: 'Missing',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpackage'
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                flex: 3,
                renderer: function (value) {
                    if (value.idlocker == 0) {
                        return "No asignado";
                    } else {
                        return value.idlocker;
                    }
                }
            }, {
                header: 'Transportadora',
                filter: 'string',
                dataIndex: 'deliveryCompany',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Producto',
                filter: 'string',
                dataIndex: 'product',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha recepci\xf3n',
                xtype: 'datecolumn',
                dataIndex: 'dateReceive',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario recibe',
                filter: 'string',
                dataIndex: 'userReceive',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha ingreso',
                xtype: 'datecolumn',
                dataIndex: 'dateEnter',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario ingresa',
                filter: 'string',
                dataIndex: 'userEnter',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Bodega',
                dataIndex: 'ubication',
                flex: 2,
                renderer: function (value) {
                    return value.warehouse.name;
                }
            }, {
                header: 'Ubicaci\xf3n',
                filter: 'string',
                dataIndex: 'ubication',
                flex: 2,
                renderer: function (value) {
                    return value.code;
                }
            }]
        });

        Ext.define('flybox.view.package.Pendings', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'pending',
            alias: 'widget.listPendingPackages',
            title: 'Listado paquetes pendientes',
            store: 'PendingPackage',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpackage'
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Transportadora',
                filter: 'string',
                dataIndex: 'deliveryCompany',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha recepci\xf3n',
                xtype: 'datecolumn',
                dataIndex: 'dateReceive',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario recibe',
                filter: 'string',
                dataIndex: 'userReceive',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha ingreso',
                xtype: 'datecolumn',
                dataIndex: 'dateEnter',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario ingresa',
                filter: 'string',
                dataIndex: 'userEnter',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Peso',
                dataIndex: 'observations',
                flex: 3
            }, {
                header: 'Peso',
                filter: 'number',
                dataIndex: 'weight',
                flex: 2
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'allow',
                tooltip: 'Asignar a casillero',
                stopSelection: false,
                icon: 'css/locker.png',
                iconCls: 'edit'
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'returnPackage',
                tooltip: 'Devolver',
                icon: 'css/return.png',
                stopSelection: false,
                iconCls: 'edit'
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'print',
                tooltip: 'Imprimir',
                icon: 'css/printer.png',
                stopSelection: false,
                iconCls: 'printer'
            }],
            buttonsAds: ['-', {
                xtype: 'button',
                icon: 'css/excel.png',
                text: 'Exportar',
                tooltip: 'Exportar',
                action: 'export'
            }]
        });

        Ext.define('flybox.view.page.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'page',
            alias: 'widget.listPages',
            title: 'Listado de p\xe1ginas',
            store: 'Page',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpage'
            }, {
                header: 'T\xedtulo',
                filter: 'string',
                dataIndex: 'title',
                flex: 3
            }, {
                header: 'Url',
                filter: 'string',
                dataIndex: 'url',
                flex: 3
            }, {
                header: 'Plantilla',
                filter: 'number',
                dataIndex: 'idtemplate',
                flex: 2,
                renderer: function (value) {
                    return (value == 1 ? "Normal" : "Ancha")
                }
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'edit',
                tooltip: 'Editar',
                stopSelection: false,
                icon: 'css/edit.png',
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

        Ext.define('flybox.view.page.Form', {
            extend: 'flybox.view.DeprisaForm',
            width: 800,
            height: 600,
            alias: 'widget.formPage',
            title: 'Editar p\xe1gina',
            object: 'pages',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idpage',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'title',
                value: '',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: '* T\xedtulo'
            }, {
                xtype: 'textfield',
                name: 'url',
                value: '',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: '* Url'
            }, {
                xtype: 'combo',
                name: 'idtemplate',
                value: '',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: '* Plantilla',
                store: [[1, 'Normal'], [2, 'Ancha']],
                queryMode: 'local',
                typeAHead: true
            }, {
                xtype: 'textfield',
                name: 'keywords',
                value: '',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: '* Keywords'
            }, {
                xtype: 'textfield',
                name: 'description',
                value: '',
                allowBlank: false,
                anchor: '100%',
                fieldLabel: '* Descripci\xf3n'
            }, {
                xtype: "tinymce",
                fieldLabel: '* Contenido',
                name: 'html',
                id: 'tinymce_g',
                anchor: '100%',
                height: 200
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.payment.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'payment',
            alias: 'widget.listPayments',
            title: 'Listado m\xe9todos de pago',
            store: 'Payment',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpayment'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 2
            }, {
                header: 'C\xf3digo',
                filter: 'string',
                dataIndex: 'code',
                flex: 2
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

        Ext.define('flybox.view.payment.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formPayment',
            title: 'Editar m\xe9todo de pago',
            object: 'payments',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idpayment',
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
                name: 'code',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* C\xf3digo'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.prealert.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'prealert',
            alias: 'widget.listPrealerts',
            title: 'Listado prealertas',
            store: 'Prealert',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idprealert'
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                renderer: function (value) {
                    return value.idlocker;
                },
                flex: 2
            }, {
                header: 'Descripci\xf3n',
                filter: 'string',
                dataIndex: 'description',
                flex: 3
            }, {
                header: 'Valor declarado',
                filter: 'number',
                dataIndex: 'declaredValue',
                flex: 2
            }, {
                header: 'Proveedor',
                dataIndex: 'provide',
                filter: 'string',
                renderer: function (value) {
                    return value.name;
                },
                flex: 2
            }, {
                header: 'Gu\xeda',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Tipo de env\xedo',
                filter: 'string',
                dataIndex: 'typePackage',
                renderer: function (value) {
                    return value.name;
                },
                flex: 2
            }, {
                header: 'Fecha prealerta',
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                dataIndex: 'date',
                flex: 3
            }, {
                header: 'Producto',
                filter: 'string',
                dataIndex: 'product',
                renderer: function (value) {
                    return value.name;
                },
                flex: 2
            }, {
                header: 'Autodespacho',
                filter: 'boolean',
                dataIndex: 'autodispatch',
                renderer: function (value) {
                    return (value ? "Si" : "No");
                },
                flex: 2
            }, {
                header: 'Pago',
                filter: 'string',
                dataIndex: 'payment',
                renderer: function (value) {
                    return value.name;
                },
                flex: 2
            }]
        });

        Ext.define('flybox.view.printer.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'typeID',
            alias: 'widget.listPrinters',
            title: 'Listado impresoras',
            store: 'Printer',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idprinter'
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

        Ext.define('flybox.view.printer.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formPrinter',
            title: 'Editar impresora',
            object: 'printers',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idprinter',
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

        Ext.define('flybox.view.product.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'product',
            alias: 'widget.listProducts',
            title: 'Listado productos',
            store: 'Product',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idproduct'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 3
            }, {
                header: 'C\xf3digo',
                filter: 'number',
                dataIndex: 'code',
                flex: 2
            }, {
                header: 'M\xe1ximo consolidable',
                filter: 'number',
                dataIndex: 'maxConsolidate',
                flex: 2
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

        Ext.define('flybox.view.product.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formProduct',
            title: 'Editar producto',
            object: 'products',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idproduct',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'name',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Nombre'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                name: 'code',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* C\xf3digo'
            }, {
                xtype: 'numberfield',
                name: 'maxConsolidate',
                value: '',
                allowBlank: false,
                anchor: '90%',
                hideTrigger: true,
                fieldLabel: '* M\xe1ximo consolidable'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.provide.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'provide',
            alias: 'widget.listProvides',
            title: 'Listado tiendas',
            store: 'Provide',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idprovide'
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

        Ext.define('flybox.view.provide.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formProvide',
            title: 'Editar tienda',
            object: 'provides',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idprovide',
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

        Ext.define('flybox.view.receive_package.SelectDeliveryCompany', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formSelectDeliveryCompany',
            title: 'Seleccionar empresa transportadora',
            fields: [{
                xtype: 'combo',
                name: 'iddeliverycompany',
                forceSelection: true,
                anchor: '90%',
                allowBlank: false,
                store: 'DeliveryCompanyReceivePackage',
                fieldLabel: '* Empresa transportadora',
                valueField: 'iddeliverycompany',
                labelWidth: 100,
                displayField: 'name',
                queryMode: 'local'
            }],
            buttons: [{
                text: 'Seleccionar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.receive_package.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'receivedPackage',
            alias: 'widget.listReceivedPackages',
            title: 'Listado paquetes recibidos',
            store: 'ReceivePackage',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpackage'
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                flex: 3,
                renderer: function (value) {
                    if (value.idlocker == 0) {
                        return "No asignado";
                    } else {
                        return value.idlocker;
                    }
                }
            }, {
                header: 'Transportadora',
                filter: 'string',
                dataIndex: 'deliveryCompany',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Producto',
                filter: 'string',
                dataIndex: 'product',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Fecha recepci\xf3n',
                xtype: 'datecolumn',
                dataIndex: 'dateReceive',
                flex: 3,
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')

            }, {
                header: 'Usuario recibe',
                filter: 'string',
                dataIndex: 'userReceive',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'returnPackage',
                tooltip: 'Devolver',
                icon: 'css/return.png',
                stopSelection: false,
                iconCls: 'edit'
            }],
            buttonsAds: ['-', {
                xtype: 'button',
                icon: 'css/excel.png',
                text: 'Exportar',
                tooltip: 'Exportar',
                action: 'export'
            }]
        });

        Ext.define('flybox.view.package.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'admonPackage',
            alias: 'widget.listAdmonPackages',
            title: 'Listado de todos los paquetes',
            store: 'AdmonPackage',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idpackage'
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                flex: 1,
                renderer: function (value) {
                    if (value.idlocker == 0) {
                        return "No asignado";
                    } else {
                        return value.idlocker;
                    }
                }
            }, {
                header: 'Estado',
                filter: 'string',
                dataIndex: 'statePackage',
                flex: 2,
                renderer: function (value) {
                    return value.name;
                }
            }, {
                header: 'Descripci\xf3n',
                filter: 'string',
                dataIndex: 'description',
                flex: 4
            }, {
                header: 'Peso',
                filter: 'number',
                dataIndex: 'weight',
                flex: 1
            }, {
                header: 'Observaciones',
                filter: 'string',
                dataIndex: 'observations',
                flex: 4
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'changeState',
                tooltip: 'Cambiar estado',
                icon: 'css/typeLocker.png',
                stopSelection: false,
                iconCls: 'edit'
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'returnPackage',
                tooltip: 'Devolver',
                icon: 'css/return.png',
                stopSelection: false,
                iconCls: 'edit'
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

        Ext.define('flybox.view.receive_package.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formReceivePackage',
            title: 'Recepcionar paquetes',
            object: 'receivePackages',
            fields: [{
                xtype: 'hiddenfield',
                name: 'iddeliverycompany',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'trackings',
                value: ''
            }, {
                xtype: 'displayfield',
                name: 'delivery_company',
                labelWidth: 200,
                anchor: '95%',
                fieldLabel: '* Empresa transportadora',
                value: ''
            }, {
                xtype: 'textfield',
                fieldLabel: '* Tracking',
                labelWidth: 200,
                name: 'tracking',
                anchor: '95%',
                enableKeyEvents: true,
                value: ''
            }, {
                xtype: 'grid',
                height: 300,
                anchor: '100%',
                store: 'AuxReceivePackage',
                layout: 'fit',
                columns: [{
                    xtype: 'rownumberer'
                }, {
                    header: 'Tracking',
                    flex: 1,
                    dataIndex: 'tracking'
                }, {
                    xtype: 'actioncolumn',
                    width: 20,
                    action: 'remove',
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    stopSelection: false,
                    iconCls: 'remove'
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

        Ext.define('flybox.view.rejection_reason.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'rejectionReason',
            alias: 'widget.listRejectionReasons',
            title: 'Listado motivos de rechazo',
            store: 'RejectionReason',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idrejectionreason'
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

        Ext.define('flybox.view.rejection_reason.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formRejectionReason',
            title: 'Editar motivo de rechazo',
            object: 'rejectionReasons',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idrejectionreason',
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

        Ext.define('flybox.view.request_pending.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'requestPending',
            alias: 'widget.listRequestsPending',
            title: 'Listado solicitudes de ubicaci\xf3n',
            store: 'RequestPending',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idrequestpending'
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'locker',
                renderer: function (value) {
                    return value.idlocker
                },
                flex: 1
            }, {
                header: 'Tracking',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 1
            }, {
                header: 'Descripci\xf3n',
                filter: 'string',
                dataIndex: 'description',
                flex: 3
            }, {
                header: 'Fecha',
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } }, dateFormat: 'Y-m-d H:i:s'
                },
                dataIndex: 'date',
                flex: 2,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }],
            buttonsAds: ['-', {
                xtype: 'button',
                icon: 'css/excel.png',
                text: 'Exportar',
                tooltip: 'Exportar',
                action: 'export'
            }]
        });

        Ext.define('flybox.view.request_pending.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formRequestPending',
            title: 'Editar solicitud de ubicaci\xf3n',
            object: 'requestsPending',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idrequestpending',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'locker',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Casillero'
            }, {
                xtype: 'textfield',
                name: 'tracking',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Tracking'
            }, {
                xtype: 'textareafield',
                name: 'description',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Descripci\xf3n'
            }],
            buttons: [{
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.resource.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'resource',
            alias: 'widget.listResources',
            title: 'Listado recursos',
            store: 'Resource',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idresource'
            }, {
                header: 'Ruta',
                filter: 'string',
                dataIndex: 'path',
                flex: 3
            }, {
                header: 'Tipo de recurso',
                filter: 'string',
                dataIndex: 'typeResource',
                renderer: function (value) {
                    return value.name
                },
                flex: 3
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

        Ext.define('flybox.view.resource.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formResource',
            title: 'Editar recurso',
            object: 'resources',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idresource',
                value: 0
            }, {
                xtype: 'filefield',
                name: 'path',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Archivo'
            }, {
                xtype: 'combo',
                anchor: '90%',
                name: 'idtyperesource',
                forceSelection: true,
                allowBlank: false,
                store: 'TypeResource',
                fieldLabel: '* Tipo de recurso',
                valueField: 'idtyperesource',
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

        Ext.define('flybox.view.sale_point.Grid', {
            extend: 'Ext.grid.Panel',
            iconCls: 'typeID',
            features: [{
                ftype: 'filters',
                encode: true,
                local: false
            }],
            alias: 'widget.listTypesID',
            title: 'Listado tipos de identificaci\xf3n',
            layout: 'fit',
            store: 'TypeID',
            closable: true,
            columns: [{
                header: 'ID',
                filterable: true,
                dataIndex: 'idtypeid'
            }, {
                header: 'Nombre',
                filterable: true,
                dataIndex: 'name',
                flex: 3
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'edit',
                items: [{
                    tooltip: 'Editar',
                    icon: 'css/edit.png',
                    iconCls: 'edit'
                }]
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'remove',
                items: [{
                    tooltip: 'Eliminar',
                    icon: 'css/remove.png',
                    iconCls: 'remove'
                }]
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                store: 'TypeID',
                pageSize: 25,
                displayInfo: true,
                items: ['-', {
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

        Ext.define('flybox.view.sale_point.Form', {
            extend: 'Ext.window.Window',
            iconCls: 'edit',
            alias: 'widget.formTypeID',
            title: 'Editar tipo de identificaci\xf3n',
            maximizable: true,
            modal: true,
            layout: 'fit',
            autoShow: true,
            items: [{
                xtype: 'form',
                url: 'update/save_object.aspx',
                defaults: {
                    labelAlign: 'right'
                },
                frame: true,
                items: [{
                    xtype: 'hiddenfield',
                    name: 'idtypeid',
                    value: 0
                }, {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: 0
                }, {
                    xtype: 'hiddenfield',
                    name: 'object',
                    value: 'type_id'
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
                }],
                bbar: ['* Campos obligatorios']
            }]
        });

        Ext.define('flybox.view.secret_question.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'secretQuestion',
            alias: 'widget.listSecretQuestions',
            title: 'Listado de preguntas secretas',
            store: 'SecretQuestion',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idsecretquestion'
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

        Ext.define('flybox.view.secret_question.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formSecretQuestion',
            title: 'Editar pregunta secreta',
            object: 'secretQuestions',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idsecretquestion',
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

        Ext.define('flybox.view.state_locker.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'stateLocker',
            alias: 'widget.listStatesLocker',
            title: 'Listado estados de casillero',
            store: 'StateLocker',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idstatelocker'
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

        Ext.define('flybox.view.state_locker.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formStateLocker',
            title: 'Editar estado de casillero',
            object: 'statesLocker',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idstatelocker',
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

        Ext.define('flybox.view.state_tracking.Grid', {
            extend: 'flybox.view.DeprisaGrid',
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

        Ext.define('flybox.view.state_tracking.Form', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.template.Grid', {
            extend: 'flybox.view.DeprisaGrid',
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

        Ext.define('flybox.view.template.Form', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.template.FormField', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.template.Fields', {
            extend: 'flybox.view.DeprisaGrid',
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

        Ext.define('flybox.view.type_id.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'typeID',
            alias: 'widget.listTypesID',
            title: 'Listado tipos de identificaci\xf3n',
            store: 'TypeID',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idtypeid'
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

        Ext.define('flybox.view.type_id.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formTypeID',
            title: 'Editar tipo de identificaci\xf3n',
            object: 'typesID',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtypeid',
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

        Ext.define('flybox.view.type_locker.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'typeLocker',
            alias: 'widget.listTypesLocker',
            title: 'Listado tipos de casillero',
            store: 'TypeLocker',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idtypelocker'
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

        Ext.define('flybox.view.type_locker.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formTypeLocker',
            title: 'Editar tipo de casillero',
            object: 'typesLocker',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtypelocker',
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

        Ext.define('flybox.view.type_package.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'typePackage',
            alias: 'widget.listTypesPackage',
            title: 'Listado tipos de paquete',
            store: 'TypePackage',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idtypepackage'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 3
            }, {
                header: 'C\xf3digo',
                filter: 'string',
                dataIndex: 'code',
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

        Ext.define('flybox.view.type_package.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formTypePackage',
            title: 'Editar tipo de paquete',
            object: 'typesPackage',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtypepackage',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'name',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Nombre'
            }, {
                xtype: 'numberfield',
                name: 'code',
                hideTrigger: true,
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* C\xf3digo'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.type_resource.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'typeResource',
            alias: 'widget.listTypesResource',
            title: 'Listado tipos de recursos',
            store: 'TypeResource',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idtyperesource'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 3
            }, {
                header: 'Carpeta',
                filter: 'string',
                dataIndex: 'folder',
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

        Ext.define('flybox.view.type_resource.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formTypeResource',
            title: 'Editar tipo de recurso',
            object: 'typesResource',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtyperesource',
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
                name: 'folder',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Carpeta'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.type_ubication.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'typeUbication',
            alias: 'widget.listTypesUbication',
            title: 'Listado tipos de ubicaci\xf3n',
            store: 'TypeUbication',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idtypeubication'
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

        Ext.define('flybox.view.type_ubication.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formTypeUbication',
            title: 'Editar tipo de ubicaci\xf3n',
            object: 'typesUbication',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idtypeubication',
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

        Ext.define('flybox.view.user.Groups', {
            extend: 'flybox.view.DeprisaItemSelector',
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

        Ext.define('flybox.view.user.Grid', {
            extend: 'flybox.view.DeprisaGrid',
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
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } }, dateFormat: 'Y-m-d H:i:s'
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

        Ext.define('flybox.view.user.FormPrinter', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formPrinterUser',
            title: 'Editar impresora usuario',
            object: 'printerUser',
            fields: [{
                xtype: 'hiddenfield',
                name: 'iduser',
                value: 0
            }, {
                xtype: 'combo',
                name: 'idprinter',
                value: '',
                anchor: '90%',
                fieldLabel: '* Impresora',
                store: 'Printer',
                queryMode: 'local',
                valueField: 'idprinter',
                displayField: 'name',
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

        Ext.define('flybox.view.user.Form', {
            extend: 'flybox.view.DeprisaForm',
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

        Ext.define('flybox.view.warehouse.Ubications', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'ubication',
            alias: 'widget.listUbications',
            title: 'Listado ubicaciones en una bodega',
            store: 'Ubication',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idubication'
            }, {
                header: 'C\xf3digo',
                filter: 'string',
                dataIndex: 'code',
                flex: 1
            }, {
                header: 'Ancho',
                filter: 'number',
                dataIndex: 'width',
                flex: 1
            }, {
                header: 'Alto',
                filter: 'number',
                dataIndex: 'height',
                flex: 1
            }, {
                header: 'Profundo',
                filter: 'number',
                dataIndex: 'lenght',
                flex: 1
            }, {
                header: 'L\xedmite (%)',
                filter: 'number',
                dataIndex: 'limit',
                flex: 1
            }, {
                header: 'Tipo ubicaci\xf3n',
                filter: 'string',
                dataIndex: 'typeUbication',
                renderer: function (value) {
                    return value.name
                },
                flex: 1
            }, {
                header: 'Orden',
                filter: 'number',
                dataIndex: 'order',
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

        Ext.define('flybox.view.warehouse.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'wareHouse',
            alias: 'widget.listWareHouses',
            title: 'Listado bodegas',
            store: 'WareHouse',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idwarehouse'
            }, {
                header: 'Nombre',
                filter: 'string',
                dataIndex: 'name',
                flex: 3
            }, {
                header: 'L\xedmite (%)',
                filter: 'number',
                dataIndex: 'limit',
                flex: 2
            }, {
                header: 'Orden',
                filter: 'number',
                dataIndex: 'order',
                flex: 2
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'ubications',
                tooltip: 'Ubicaciones',
                icon: 'css/ubication.png',
                stopSelection: false,
                iconCls: 'ubication'
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

        Ext.define('flybox.view.warehouse.FormUbication', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formUbication',
            title: 'Editar ubicaci\xf3n en la bodega',
            object: 'ubications',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idubication',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'idwarehouse',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'code',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* C\xf3digo'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                decimalPrecision: 2,
                decimalSeparator: '.',
                name: 'width',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Ancho'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                decimalPrecision: 2,
                decimalSeparator: '.',
                name: 'height',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Alto'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                decimalPrecision: 2,
                decimalSeparator: '.',
                name: 'lenght',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Profundo'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                name: 'limit',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* L\xedmite (%)'
            }, {
                xtype: 'combo',
                name: 'idtypeubication',
                anchor: '95%',
                store: 'TypeUbication',
                forceSelection: true,
                allowBlank: false,
                fieldLabel: '* Tipo de ubicaci\xf3n',
                valueField: 'idtypeubication',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                name: 'order',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Orden'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.warehouse.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formWareHouse',
            title: 'Editar bodega',
            object: 'wareHouses', fields: [{
                xtype: 'hiddenfield',
                name: 'idwarehouse',
                value: 0
            }, {
                xtype: 'textfield',
                name: 'name',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Nombre'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                name: 'limit',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* L\xedmite (%)'
            }, {
                xtype: 'numberfield',
                hideTrigger: true,
                name: 'order',
                value: '',
                allowBlank: false,
                anchor: '90%',
                fieldLabel: '* Orden'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.rejection_reason.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'rejectionReason',
            alias: 'widget.listRejectionReasons',
            title: 'Listado motivos de rechazo',
            store: 'RejectionReason',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idrejectionreason'
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

        Ext.define('flybox.view.rejection_reason.Form', {
            extend: 'flybox.view.DeprisaForm',
            alias: 'widget.formRejectionReason',
            title: 'Editar motivo de rechazo',
            object: 'rejectionReasons',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idrejectionreason',
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

        Ext.define('flybox.view.locker.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'locker',
            alias: 'widget.listLockers',
            title: 'Listado casilleros',
            store: 'Locker',
            columns: [{
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'idlocker'
            }, {
                header: 'Usuario',
                filter: 'string',
                dataIndex: 'user',
                renderer: function (value) {
                    return value.name;
                },
                flex: 2
            }, {
                header: 'Email',
                filter: 'string',
                dataIndex: 'user',
                renderer: function (value) {
                    return value.email;
                },
                flex: 2
            }, {
                header: 'Tipo de casillero',
                filter: 'string',
                dataIndex: 'type',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                header: 'Estado',
                filter: 'string',
                dataIndex: 'stateLocker',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                header: 'Fecha creaci\xf3n',
                filter: 'date',
                dataIndex: 'dateAdded',
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Fecha rechazo',
                filter: 'date',
                dataIndex: 'dateReject',
                filter: {
                    type: 'date',
                    fields: { lt: { text: 'Antes de' }, gt: { text: 'Depu\xe9s de ' }, eq: { text: 'El d\xeda' } },
                    dateFormat: 'Y-m-d H:i:s'
                },
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')
            }, {
                header: 'Motivo rechazo',
                filter: 'string',
                dataIndex: 'rejectionReason',
                renderer: function (value) {
                    return value.name;
                },
                flex: 1
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'user',
                tooltip: 'Titular',
                icon: 'css/user.png',
                iconCls: 'user',
                stopSelection: false
            }, {
                xtype: 'actioncolumn',
                width: 20,
                action: 'edit',
                tooltip: 'Editar',
                icon: 'css/edit.png',
                iconCls: 'edit',
                stopSelection: false
            }]
        });

        Ext.define('flybox.view.locker.Form', {
            extend: 'flybox.view.DeprisaForm',
            iconCls: 'edit',
            alias: 'widget.formLocker',
            title: 'Editar casillero',
            object: 'lockers',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idlocker',
                value: 0
            }, {
                xtype: 'hiddenfield',
                name: 'iduser',
                value: 0
            }, {
                xtype: 'combo',
                anchor: '90%',
                name: 'idtypelocker',
                forceSelection: true,
                allowBlank: false,
                store: 'TypeLocker',
                fieldLabel: 'Tipo de casillero *',
                valueField: 'idtypelocker',
                displayField: 'name',
                queryMode: 'local',
                readOnly: true
            }, {
                xtype: 'textfield',
                name: 'user',
                anchor: '90%',
                value: '',
                allowBlank: false,
                fieldLabel: 'Cliente *',
                readOnly: true
            }, {
                xtype: 'datefield',
                name: 'dateAdded',
                anchor: '90%',
                value: '',
                altFormats: "Y-m-d",
                format: "Y-m-d",
                submitFormat: "Y-m-d",
                allowBlank: false,
                fieldLabel: 'Fecha creaci\xf3n *',
                readOnly: true
            }, {
                xtype: 'combo',
                name: 'idstatelocker',
                anchor: '90%',
                forceSelection: true,
                allowBlank: false,
                store: 'StateLocker',
                fieldLabel: 'Estado *',
                valueField: 'idstatelocker',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'datefield',
                name: 'dateReject',
                value: '',
                anchor: '90%',
                altFormats: "Y-m-d",
                format: "Y-m-d",
                submitFormat: "Y-m-d",
                hidden: true,
                fieldLabel: 'Fecha rechazo',
                readOnly: true
            }, {
                xtype: 'combo',
                name: 'idrejectionreason',
                forceSelection: true,
                anchor: '90%',
                hidden: true,
                store: 'RejectionReason',
                fieldLabel: 'Motivo de rechazo *',
                valueField: 'idrejectionreason',
                displayField: 'name',
                queryMode: 'local'
            }, {
                xtype: 'textfield',
                name: 'comments',
                anchor: '90%',
                value: '',
                fieldLabel: 'Comentarios'
            }],
            buttons: [{
                text: 'Guardar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.define('flybox.view.picking.Grid', {
            extend: 'flybox.view.DeprisaGrid',
            iconCls: 'picking',
            alias: 'widget.listPackagesPicking',
            title: 'Listado de paquetes en picking',
            store: 'Picking',
            columns: [{
                header: 'ID',
                filter: 'number',
                dataIndex: 'idconsolidate'
            }, {
                header: 'Grupo',
                filter: 'number',
                dataIndex: 'idgroup',
                flex: 2
            }, {
                header: 'Paquete',
                filter: 'string',
                dataIndex: 'tracking',
                flex: 3
            }, {
                header: 'Casillero',
                filter: 'number',
                dataIndex: 'idlocker',
                flex: 2
            }, {
                header: 'Ciudad',
                filter: 'string',
                dataIndex: 'cityDelivery',
                renderer: function (v) {
                    return v.name;
                },
                flex: 3
            }, {
                header: 'Direcci\xf3n',
                filter: 'string',
                dataIndex: 'address',
                flex: 3
            }, {
                header: 'Usuario asignado',
                filter: 'string',
                dataIndex: 'user',
                renderer: function (v) {
                    return (v.name == "" ? "Ninguno" : v.name);
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
            }]
        });

        Ext.define('flybox.view.picking.PackagePicking', {
            extend: 'flybox.view.DeprisaForm',
            iconCls: 'edit',
            alias: 'widget.formPackagePicking',
            title: 'Reasignar usuario a paquete en picking',
            width: 600,
            object: 'picking',
            fields: [{
                xtype: 'hiddenfield',
                name: 'idconsolidate',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: '* Grupo de paquetes',
                readOnly: true,
                allowBlank: false,
                anchor: '90%',
                name: 'idgroup',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: '* Tracking paquete',
                readOnly: true,
                allowBlank: false,
                anchor: '90%',
                name: 'tracking',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: '* Casillero',
                readOnly: true,
                allowBlank: false,
                anchor: '90%',
                name: 'idlocker',
                value: 0
            }, {
                xtype: 'combo',
                name: 'iduser',
                forceSelection: true,
                anchor: '90%',
                store: 'UsersPicking',
                fieldLabel: 'Usuario asignado *',
                valueField: 'iduser',
                displayField: 'name',
                queryMode: "local"
            }],
            buttons: [{
                text: 'Reasignar',
                action: 'save'
            }, {
                text: 'Cancelar',
                action: 'cancel'
            }]
        });

        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [{
                tbar: {
                    defaults: {
                        scale: 'medium'
                    },
                    loader: {
                        url: 'menu.aspx',
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
                    title: 'Productividad diaria',
                    border: false,
                    xtype: 'panel',
                    items: [{
                        xtype: 'panel',
                        border: false,
                        titleAlign: 'center',
                        flex: 1,
                        items: [{
                            html: 'Flybox'
                        }, {
                            xtype: 'chart',
                            border: false,
                            width: 1000,
                            height: 500,
                            animate: true,
                            store: 'Productivity',
                            shadow: true,
                            legend: {
                                position: 'bottom'
                            },
                            axes: [{
                                type: 'numeric',
                                position: 'left',
                                fields: ['recibidos', 'ingresados', 'despachados'],
                                grid: true,
                                minimum: 0,
                                title: 'Cantidad'
                            }, {
                                type: 'category',
                                position: 'bottom',
                                fields: ['name'],
                                title: 'Operador',
                                label: {
                                    rotate: {
                                        degrees: 315
                                    }
                                }
                            }],
                            series: [{
                                type: 'column',
                                axis: 'left',
                                /*tips: {
                                    trackMouse: true,
                                    width: 50,
                                    renderer: function (storeItem, item) {
                                        console.log(storeItem);
                                        console.log(item);
                                        return this.setTitle(item.value[1]);
                                    }
                                },*/
                                label: {
                                    display: 'insideEnd',
                                    stackedDisplay: 'total',
                                    field: ['recibidos', 'ingresados', 'despachados'],
                                    'text-anchor': 'middle',
                                    renderer: Ext.util.Format.numberRenderer('0'),
                                    orientation: 'vertical'
                                },
                                xField: 'name',
                                yField: ['recibidos', 'ingresados', 'despachados']
                            }]
                        }]
                    }]
                }]
            }, {
                region: 'south',
                xtype: 'panel',
                html: '<b>Deprisa &copy; - Una marca Avianca &copy;</b>'
            }]
        });
        Ext.getStore('Productivity').load();
    }
});