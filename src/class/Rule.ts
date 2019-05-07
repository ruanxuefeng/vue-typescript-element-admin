export default class Rule {
    public required: boolean = true;
    public trigger: string = 'blur';
    public validator?: (rule: Rule, value: string, callback: (error?: Error) => void) => void;

    constructor(validator: (rule: Rule, value: string, callback: (error?: Error) => void) => void) {
        this.validator = validator;
    }

    public setTrigger(trigger: string): Rule {
        this.trigger = trigger;
        return this;
    }

    public setValidator(validator: (rule: Rule, value: string, callback: (error?: Error) => void) => void): Rule {
        this.validator = validator;
        return this;
    }
}
