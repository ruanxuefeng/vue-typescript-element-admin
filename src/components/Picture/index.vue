<template>
    <el-image :src="pic">
        <i class="image-slot el-icon-picture-outline" slot="error"></i>
    </el-image>
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

    @Watch('data', {immediate: true, deep: true})
    onDataChange(newData: string | File, oldData: string | File) {
        if (!newData) {
            return;
        }
        this.load(newData);
    }

    private load(data: string | File) {
        if (typeof data === 'string') {
            request(data as string).then((resp) => {
                const {data} = resp;
                let reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        this.pic = e.target.result;
                    }
                };
                reader.readAsDataURL(data as Blob);
            });
        } else {
            this.pic = URL.createObjectURL(data);
        }
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
    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: #909399;
    }
</style>
