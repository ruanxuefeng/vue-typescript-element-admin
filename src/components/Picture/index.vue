<template>
    <img :src="pic" v-loading="loading"/>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {request} from '@/components/Picture/api';

@Component
export default class Picture extends Vue {
    @Prop({
        default: () => null
    })
    private data!: string | File | null;

    @Prop({
        default: () => PictureType.URL
    })
    private type!: PictureType;
    private pic: string | ArrayBuffer | File | null = null;
    private loading = false;

    @Watch('data', {immediate: true, deep: true})
    onDataChange() {
        this.load();
    }

    private load() {
        this.loading = true;
        switch (this.type) {
            case PictureType.URL:
                if (typeof this.data === 'string') {
                    this.pic = this.data;
                } else {
                    throw new Error(`类型${PictureType.URL}data只能是string类型`);
                }
                break;
            case PictureType.SERVER_RESOURCE: {
                request(this.data as string).then((resp) => {
                    const {data} = resp;
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        if (e.target) {
                            this.pic = e.target.result;
                        }
                    };
                    reader.readAsDataURL(data as Blob);
                });
                break;
            }
            case PictureType.FILE:
                this.pic = URL.createObjectURL(this.data);
                break;
        }
        this.loading = false;
    }

}

enum PictureType {
    /**
     * 后台服务资源
     */
    SERVER_RESOURCE = 'SERVER_RESOURCE',
    /**
     * 可访问的请求连接
     */
    URL = 'URL',
    /**
     * 文件
     */
    FILE = 'FILE'
}
</script>

<style scoped>

</style>
