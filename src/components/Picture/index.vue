<template>
    <el-image v-if="pic" :src="pic">
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
    private content!: string | File | null;

    private pic: string | ArrayBuffer | File | null = null;

    private created() {
        this.load();
    }

    @Watch('content', {immediate: false, deep: false})
    private contentChange(newContent: string | File, oldContent: string | File) {
        console.log(newContent);
        this.load();
    }



    private load() {
        if (typeof this.content === 'string') {
            request(this.content as string).then((resp) => {
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
            this.pic = URL.createObjectURL(this.content);
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
