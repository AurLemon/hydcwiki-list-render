<template>
    <div class="hydcwiki-enterprise-list">
        <table class="wikitable">
            <tbody>
                <!-- 等企业列表的 API -->
            </tbody>
        </table>
    </div>
</template>

<script>
    import { get } from '@/api'

    export default {
        name: 'EnterpriseList',
        data() {
            return {
                enterprise: []
            }
        },
        methods: {
            async fetchList() {
                try {
                    const response = await get('/info/list/enterprise');
                    this.players = response.data.data.list;
                } catch (error) {
                    console.error('Error fetching enterprise data:', error);
                }
            }        
        },
        created() {
            this.fetchList();
        }
    }
</script>