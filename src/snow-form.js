/*
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of Cell Browser.
 *
 * Cell Browser is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * Cell Browser is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cell Browser. If not, see <http://www.gnu.org/licenses/>.
 */

SnowForm.prototype = new GenericFormPanel();

function SnowForm(args) {
    args.analysis = 'snow.default';
    args.title = 'Network enrichment analysis - SNOW';
    args.border = false;
    args.buttonConfig = {
        width: 100,
        height: undefined
    };
    GenericFormPanel.prototype.constructor.call(this, args);

    this.id = Utils.genId("SnowForm");
    this.headerWidget = this.webapp.headerWidget;
    this.opencgaBrowserWidget = this.webapp.headerWidget.opencgaBrowserWidget;

}

SnowForm.prototype.beforeRun = function () {

    if (this.testing) {
        console.log("Watch out!!! testing flag is on, so job will not launched.")
    }
    this.paramsWS['images'] = ' ';
    this.paramsWS['o-name'] = 'result';
    this.paramsWS['components'] = 'true';
    this.paramsWS['side'] = 'less'; // there is a bug, less will use greater

    if (this.paramsWS['inputSource'] === 'text') {
        this.paramsWS['list1'] = 'list1-text'
    } else {
        delete this.paramsWS['list1-text'];
    }

    delete this.paramsWS['inputSource'];

//    this.paramsWS['list1-text'] = 'HSD17B10\nCCNB1\nCDC25B';
};


SnowForm.prototype.getPanels = function () {
    return [this._getForm()];
};


//SnowForm.prototype._getExampleForm = function () {
//    var _this = this;
//
//    var example1 = Ext.create('Ext.Component', {
//        html: '<span class="s140"><span class="btn btn-default">Load</span> &nbsp; VCF file example</span>',
//        cls: 'dedo',
//        listeners: {
//            afterrender: function () {
//                this.getEl().on("click", function () {
//                    _this.loadExample1();
//                    Ext.example.msg("Example loaded", "");
//                });
//
//            }
//        }
//    });
//
//    var exampleForm = Ext.create('Ext.container.Container', {
//        bodyPadding: 10,
//        cls: 'bootstrap',
//        items: [this.note1, example1],
//        defaults: {margin: '5 0 0 0'},
//        margin: '0 0 10 0'
//    });
//
//    return exampleForm;
//};

SnowForm.prototype._getForm = function () {
    var _this = this;

//    var note1 = Ext.create('Ext.container.Container', {
//        html: 'Please select a file from your <span class="info">server account</span> using the <span class="emph">Browse</span> button'
//    });


    var inputArea = Ext.create('Ext.form.field.TextArea', {
        fieldLabel: 'Text input list',
        labelWidth: this.labelWidth,
        flex: 1,
        enableKeyEvents: true,
        value: '',
        name: 'list1-text',
        allowBlank: false,
        listeners: {
            change: function (este) {
                este.getValue()
            }
        }
    });

    var opencgaBrowserCmp = this.createOpencgaBrowserCmp({
        fieldLabel: 'File input list',
        dataParamName: 'list1',
        id: this.id + 'list1',
        mode: 'fileSelection',
        allowedTypes: ['txt'],
        allowBlank: false
    });

    var radioInputType = Ext.create('Ext.form.RadioGroup', {
        fieldLabel: 'Select your input list from',
        labelWidth: this.labelWidth,
        width: 400,
        defaults: {
            margin: '0 0 0 10',
            name: 'inputSource'
        },
        items: [
            {
                boxLabel: 'Text area',
                checked: true,
                inputValue: 'text'
            },
            {
                boxLabel: 'File from server',
                inputValue: 'file'
            }
        ],
        listeners: {
            change: function (radiogroup, newValue, oldValue, eOpts) {
                var value = radiogroup.getValue();
                if (value['inputSource'] === 'text') {
                    formBrowser.remove(opencgaBrowserCmp, false);
                    formBrowser.insert(1, inputArea);
                } else {
                    formBrowser.remove(inputArea, false);
                    formBrowser.insert(1, opencgaBrowserCmp);
                }
            }
        }
    });

    var speciesStore = Ext.create('Ext.data.Store', {
        fields: [ 'name', 'value' ],
        data: [
            {name: "Homo sapiens", value: "hsa"},
//            {name: "Mus musculus", value: "mmusculus"},
//            {name: "Rattus norvegicus", value: "rnorvegicus"},
//            {name: "Bos taurus", value: "btaurus"},
//            {name: "Gallus gallus", value: "ggallus"},
//            {name: "Sus scrofa", value: "sscrofa"},
//            {name: "Canis familiaris", value: "cfamiliaris"},
//            {name: "Drosophila melanogaster", value: "dmelanogaster"},
//            {name: "Caenorhabditis elegans", value: "celegans"},
//            {name: "Saccharomyces cerevisiae", value: "scerevisiae"},
//            {name: "Danio rerio", value: "drerio"},
//            {name: "Schizosaccharomyces pombe", value: "spombe"},
//            {name: "Escherichia coli", value: "ecoli"},
//            {name: "Human immunodeficiency virus 1", value: "hiv-1"},
//            {name: "Influenza A virus", value: "flu-a"},
//            {name: "Clostridium botulinum", value: "cbotulinum"},
//            {name: "Arabidopsis thaliana", value: "athaliana"},
//            {name: "Plasmodium falciparum", value: "pfalciparum"},
//            {name: "Dictyostelium discoideum", value: "ddiscoideum"},
//            {name: "Mycobacterium tuberculosis", value: "mtuberculosis"},
//            {name: "Neisseria meningitidis serogroup B", value: "nmeningitidis"},
//            {name: "Chlamydia trachomatis", value: "ctrachomatis"},
//            {name: "Oryza sativa", value: "osativa"},
//            {name: "Toxoplasma gondii", value: "tgondii"},
//            {name: "Xenopus tropicalis", value: "xtropicalis"},
//            {name: "Salmonella typhimurium", value: "styphimurium"},
//            {name: "Taeniopygia guttata", value: "tguttata"},
//            {name: "Staphylococcus aureus N315", value: "saureus"}
        ]
    });

    var speciesCombo = Ext.create('Ext.form.field.ComboBox', {
        labelAlign: 'left',
        labelWidth: this.labelWidth,
        name: 'interactome',
        fieldLabel: 'Species',
        store: speciesStore,
        allowBlank: false,
        editable: false,
        displayField: 'name',
        valueField: 'value',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            afterrender: function () {
                this.select(this.getStore().getAt(0));
            },
            change: function (field, e) {
                var value = field.getValue();
                if (value != null) {
                    //?
                }
            }
        }
    });

    var natureCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Lists nature',
        labelWidth: this.labelWidth,
        labelAlign: 'left',
        name: 'type',
        store: Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name: 'Proteins', value: 'proteins'},
                {name: 'Genes', value: 'genes'}
            ]
        }),
        allowBlank: false,
        editable: false,
        displayField: 'name',
        valueField: 'value',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            afterrender: function () {
                this.select(this.getStore().getAt(0));
            },
            change: function (field, e) {
                var value = field.getValue();
                if (value != null) {
                    //?
                }
            }
        }
    });


    var interactomeReferenceCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Select interactome confidence',
        labelWidth: this.labelWidth,
        labelAlign: 'left',
        name: 'group',
        store: Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name: 'Non curated', value: 'all'},
                {name: 'Curated (detected by at least two methods)', value: 'curated'}
            ]
        }),
        allowBlank: false,
        editable: false,
        displayField: 'name',
        valueField: 'value',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            afterrender: function () {
                this.select(this.getStore().getAt(0));
            },
            change: function (field, e) {
                var value = field.getValue();
                if (value != null) {
                    //?
                }
            }
        }
    });


    var randomNetworksCombo = Ext.create('Ext.form.field.ComboBox', {
        labelAlign: 'left',
        labelWidth: this.labelWidth,
        name: 'randoms',
        fieldLabel: 'Number of simulations',
        store: Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name: '500', value: '500'},
                {name: '1000', value: '1000'},
                {name: '2000', value: '2000'}
            ]
        }),
        allowBlank: false,
        editable: false,
        displayField: 'name',
        valueField: 'value',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            afterrender: function () {
                this.select(this.getStore().getAt(0));
            },
            change: function (field, e) {
                var value = field.getValue();
                if (value != null) {
                    //?
                }
            }
        }
    });


    var minimalConnectedCombo = Ext.create('Ext.form.field.ComboBox', {
        labelAlign: 'left',
        labelWidth: this.labelWidth,
        name: 'intermediate',
        fieldLabel: 'Allow one external intermediate in the subnetwork',
        store: Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [
                {name: 'Yes', value: '1'},
                {name: 'No', value: '0'}
            ]
        }),
        allowBlank: false,
        editable: false,
        displayField: 'name',
        valueField: 'value',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            afterrender: function () {
                this.select(this.getStore().getAt(0));
            },
            change: function (field, e) {
                var value = field.getValue();
                if (value != null) {
                    //?
                }
            }
        }
    });
    var formBrowser = Ext.create('Ext.panel.Panel', {
        title: "Input parameters",
        header: this.headerFormConfig,
        border: this.border,
//        padding: "5 0 0 0",
        bodyPadding: 10,
        defaults: {
            margin: '10 0'
        },
        items: [
//            note1,
            radioInputType,
            inputArea,
            natureCombo,
            speciesCombo,
            interactomeReferenceCombo,
            randomNetworksCombo,
            minimalConnectedCombo
        ]
    });
    return formBrowser;
};


//SnowForm.prototype.loadExample1 = function () {
//    Ext.getCmp(this.id + 'vcf-file').setText('<span class="emph">Example file.vcf</span>', false);
//    Ext.getCmp(this.id + 'vcf-file' + 'hidden').setValue('example_file.vcf');
//
//    Ext.getCmp(this.id + 'ped-file').setText('<span class="emph">Example file.ped</span>', false);
//    Ext.getCmp(this.id + 'ped-file' + 'hidden').setValue('example_file.ped');
//
//
//    Ext.getCmp(this.id + 'jobname').setValue("VCF example");
//    Ext.getCmp(this.id + 'jobdescription').setValue("VCF example");
//};