<template>
    <div id="app">
        <div class="hydcwiki-list">
            <table class="wikitable">
                <tbody>
                    <tr>
                        <th>PIIC</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Join Time</th>
                        <th>Status</th>
                    </tr>
                    <tr v-for="player in players" :key="player.piic">
                        <td>{{ player.piic }}</td>
                        <td>{{ player.nick }}</td>
                        <td>{{ player.type }}</td>
                        <td>{{ player.jointime }}</td>
                        <td>{{ player.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { get } from '@/api'

    export default {
        name: 'App',
        data() {
            return {
                players: []
            }
        },
        methods: {
            async fetchPlayerList() {
                try {
                    const response = await get('/info/list/player');
                    this.players = response.data.data.list;
                } catch (error) {
                    console.error('Error fetching player data:', error);
                }
            }        
        },
        created() {
            this.fetchPlayerList();
        }
    }
</script>

<style lang="scss" scoped>
</style>
