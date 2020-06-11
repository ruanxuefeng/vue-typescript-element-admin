import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import Log from '../types/SystemLog';
import store from '@/store';

interface SystemLog {
    $logs: Log[]
    $level: number
    $maxCount: number
}

@Module({dynamic: true, store, name: 'systemLog'})
export default class SystemLogImpl extends VuexModule implements SystemLog{
    $logs: Array<Log> = [];
    $level: number = 20000;
    $maxCount: number = 500;

    @Action
    public addLog(log: Log) {
        if (log.level >= this.$level) {
            return;
        }

        if (this.logs.length > this.maxCount) {
            this.logs.shift();
        }
        this.logs.push(log);
    }

    get logs() {
        return this.$logs;
    }


    get level(): number {
        return this.$level;
    }

    get maxCount(): number {
        return this.$maxCount;
    }

    @Mutation
    public setLevel(level: number) {
        this.$level = level;
    }

    @Mutation
    public setMaxCount(maxCount: number) {
        this.$maxCount = maxCount;
    }
}
export const SystemLogState = getModule(SystemLogImpl);
