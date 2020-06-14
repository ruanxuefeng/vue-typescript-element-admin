<template>
    <div :style="{height: `${maxHeight}px`}" class="log-list app-container" ref="appContainer">
        <el-form :inline="true">
            <el-form-item label="日志级别">
                <el-select placeholder="请选择" v-model="level" @change="levelChange">
                    <el-option :value="40000" label="ERROR"/>
                    <el-option :value="30000" label="WARN"/>
                    <el-option :value="20000" label="INFO"/>
                    <el-option :value="10000" label="DEBUG"/>
                    <el-option :value="5000" label="TRACE"/>
                    <el-option :value="0" label="ALL"/>
                </el-select>
            </el-form-item>
            <el-form-item label="缓存条数">
                <el-select placeholder="请选择" v-model="maxCount" @change="maxCountChange">
                    <el-option :value="500" label="500"></el-option>
                    <el-option :value="1000" label="1000"></el-option>
                    <el-option :value="1500" label="1500"></el-option>
                    <el-option :value="2000" label="2000"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-card shadow="hover" style="height: 100%;overflow:auto;" ref="card">
            <li :key="index" class="log" v-for="(log, index) in logs">
                <el-tag :type="getLeveColor(log.level)">{{log.levelName}}</el-tag>
                {{` ${log.dateTime} ${log.message}`}}
            </li>
        </el-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {SystemLogState} from '@/store/modules/SystemLog';

@Component({
    components: {},
})
export default class SystemLog extends Vue {
    public $refs!: {
        appContainer: HTMLDivElement,
        card: Vue
    };

    private maxHeight = 800
    private level = 10000;
    private maxCount = SystemLogState.maxCount;

    get logs() {
        return SystemLogState.logs;
    }

    private mounted() {
        const appMainHeight = this.$refs.appContainer.parentElement?.offsetHeight ?? 1000;
        this.maxHeight = appMainHeight - 55;
    }

    private updated(){
        this.$nextTick(() => {
            const container = this.$refs.card.$el;
            container.scrollTop = container.scrollHeight;
        });
    }

    private levelChange(level: number) {
        SystemLogState.setLevel(level);
    }

    private maxCountChange(maxCount:number) {
        SystemLogState.setMaxCount(maxCount);
    }

    private getLeveColor(level: number) {
        switch (level) {
            case 40000:
                return 'danger';
            case 30000 :
                return 'warning';
            case 20000 :
                return 'info';
            case 10000 :
                return 'success';
            default :
                return '';
        }
    }
}
</script>

<style scoped>
    .log-list {
        font-size: 1.1em;
    }

    .log {
        margin: 10px;
    }

    /*定义滚动条高宽及背景
    高宽分别对应横竖滚动条的尺寸*/
    ::-webkit-scrollbar {
        width: 13px;
        height: 10px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道
     内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(41, 41, 41);
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    /*定义滑块
     内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #555;
    }
</style>
