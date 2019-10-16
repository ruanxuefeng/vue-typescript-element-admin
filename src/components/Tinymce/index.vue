<template>
    <div
            :class="{fullscreen: fullscreen}"
            class="tinymce-container"
            :style="{width: containerWidth}"
    >
        <tinymce-editor
                :id="id"
                v-model="tinymceContent"
                :init="initOptions"
        />
    </div>
</template>

<script lang="ts">
    // Docs: https://armour.github.io/vue-typescript-admin-docs/features/components/rich-editor.html#tinymce
    import 'tinymce/tinymce';
    import 'tinymce/themes/silver';
    import 'tinymce/themes/mobile';
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/autosave';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/directionality';
    import 'tinymce/plugins/emoticons';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/nonbreaking';
    import 'tinymce/plugins/noneditable';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/save';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/spellchecker';
    import 'tinymce/plugins/tabfocus';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/template';
    import 'tinymce/plugins/textpattern';
    import 'tinymce/plugins/visualblocks';
    import 'tinymce/plugins/visualchars';
    import 'tinymce/plugins/wordcount';
    import TinymceEditor from '@tinymce/tinymce-vue'; // TinyMCE vue wrapper
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {plugins, toolbar} from './config';

    const defaultId = () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');

    @Component({
        name: 'Tinymce',
        components: {
            TinymceEditor
        }
    })
    export default class Tinymce extends Vue {

        @Prop({required: true})
        private value!: string;
        @Prop({default: defaultId})
        private id!: string;
        @Prop({default: () => []})
        private toolbar!: string[];
        @Prop({default: () => []})
        private plugins!: string[];
        @Prop({default: 'file edit insert view format table'})
        private menubar!: string;
        @Prop({default: '360px'})
        private height!: string | number;
        @Prop({default: 'auto'})
        private width!: string | number;
        @Prop({default: false})
        private pasteAsText!: boolean;


        private hasChange = false;
        private hasInit = false;
        private fullscreen = false;

        get tinymceContent() {
            return this.value;
        }

        set tinymceContent(value) {
            this.$emit('input', value);
        }

        get containerWidth() {
            const width = this.width;
            // Test matches `100`, `'100'`
            if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
                return `${width}px`;
            }
            return width;
        }

        get initOptions() {
            return {
                selector: `#${this.id}`,
                height: this.height,
                body_class: 'panel-body ',
                object_resizing: false,
                toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                menubar: this.menubar,
                plugins: this.plugins.length > 0 ? this.plugins : plugins,
                language: 'zh_CN',
                language_url: `${process.env.BASE_URL}tinymce/langs/zh_CN.js`,
                skin_url: `${process.env.BASE_URL}tinymce/skins/`,
                emoticons_database_url: `${process.env.BASE_URL}tinymce/emojis.min.js`,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                default_link_target: '_blank',
                link_title: false,
                paste_as_text: true,
                nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                init_instance_callback: (editor: any) => {
                    if (this.value) {
                        editor.setContent(this.value);
                    }
                    this.hasInit = true;
                    editor.on('NodeChange Change KeyUp SetContent', () => {
                        this.hasChange = true;
                        this.$emit('input', editor.getContent());
                    });
                },
                setup: (editor: any) => {
                    editor.on('FullscreenStateChanged', (e: any) => {
                        this.fullscreen = e.state;
                    });
                }
            };
        }

    }
</script>

<style lang="scss" scoped>
    .tinymce-container {
        position: relative;
        line-height: normal;

        .mce-fullscreen {
            z-index: 10000;
        }
    }

    .editor-custom-btn-container {
        position: absolute;
        right: 6px;
        top: 6px;

        &.fullscreen {
            z-index: 10000;
            position: fixed;
        }
    }

    .editor-upload-btn {
        display: inline-block;
    }

    textarea {
        visibility: hidden;
        z-index: -1;
    }
</style>
