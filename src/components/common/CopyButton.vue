<template>
    <span class="copy-button material-icons" v-clipboard:copy="textToCopy" v-clipboard:success="onCopySuccess" v-clipboard:error="onCopyError">
        {{ icon }}
    </span>
</template>

<script>
    export default {
        props: {
            textToCopy: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                icon: 'content_copy'
            };
        },
        methods: {
            onCopySuccess() {
                this.icon = 'done';
                setTimeout(() => {
                    this.icon = 'content_copy';
                }, 3000);
            },
            onCopyError() {
                this.icon = 'close';
                setTimeout(() => {
                    this.icon = 'content_copy';
                }, 3000);
            }
        }
    };
</script>

<style scoped>
    .copy-button.material-icons {
        color: var(--color-base--subtle);
        font-size: 16px;
        opacity: 0.3;
        transition: all 250ms ease;
        cursor: pointer;
        user-select: none;

        &:hover {
            opacity: 0.8;
        }
    }
</style>