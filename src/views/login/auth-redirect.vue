<script lang="ts">
import {Vue} from 'vue-property-decorator';

export default class AuthRedirect extends Vue {
    public static created() {
        const hash = window.location.search.slice(1);
        if (window.localStorage) {
            window.localStorage.setItem('x-admin-oauth-code', hash);
            window.close();
        }
    }

    public static render(h: () => void) {
        return h();
    }
}
</script>
