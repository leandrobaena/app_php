Ext.define('Ext.ux.form.TinyMCE', {
    extend: 'Ext.form.field.TextArea'
    , alias: 'widget.tinymce'

    /**
     * TinyMCE editor configuration.
     *
     * @cfg {Object}
     */
    , editorConfig: {
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        language: 'es',
        plugins: 'advlist autolink link image lists charmap print preview',
        skin: 'xenmce',
        convert_fonts_to_spans: true,
        convert_urls: false,
        relative_urls: false,
        extended_valid_elements: "b,img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]",
        content_css: "../css/flybox.completo.css",
        plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor"
        ],
        toolbar1: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | hr | table",
        toolbar2: "print preview media | forecolor backcolor emoticons | code",
        image_advtab: true,
        formats: {
            bold: { inline: 'b' }
        }
    }

    , afterRender: function () {
        this.callParent(arguments);

        var me = this,
            id = this.inputEl.id;

        var editor = tinymce.createEditor(id, Ext.apply({
            selector: '#' + id
            , resize: false
            , height: this.height
            , width: this.width
            , menubar: false
        }, this.editorConfig));

        this.editor = editor;

        // set initial value when the editor has been rendered            
        editor.on('init', function () {
            editor.setContent(me.value || '');
        });

        // render
        editor.render();

        // --- Relay events to Ext

        editor.on('focus', function () {
            me.previousContent = editor.getContent();
            me.fireEvent('focus', me);
        });

        editor.on('blur', function () {
            me.fireEvent('blur', me);
        });

        editor.on('change', function (e) {
            var content = editor.getContent(),
                previousContent = me.previousContent;
            if (content !== previousContent) {
                me.previousContent = content;
                me.fireEvent('change', me, content, previousContent);
            }
        });
    }

    , getRawValue: function () {
        var editor = this.editor,
            value = editor && editor.initialized ? editor.getContent() : ''/*Ext.value(this.rawValue, '')*/;
        this.rawValue = value;
        return value;
    }

    , setRawValue: function (value) {
        this.callParent(arguments);

        var editor = this.editor;
        if (editor && editor.initialized) {
            editor.setContent(value);
        }

        return this;
    }
});