<template>
    <div class="hydcwiki-player-list">
        <table class="hydcwiki-player-table tablelist wikitable">
            <tbody>
                <tr class="hydcwiki-player-table-head">
                    <th class="hydcwiki-player-table-head__index">次序</th>
                    <th class="hydcwiki-player-table-head__info">信息</th>
                    <th class="hydcwiki-player-table-head__status">状态</th>
                    <th class="hydcwiki-player-table-head__time">时间</th>
                </tr>
                <tr class="hydcwiki-player-table-content" v-for="(player, index) in players" :key="player.piic">
                    <td class="hydcwiki-player-table__index">{{ index + 1 }}</td>
                    <td class="hydcwiki-player-table__info">
                        <div class="hydcwiki-player-table-wrapper">
                            <div class="hydcwiki-player-table__islogged" alt="在线" v-if="player.is_logged"></div>
                            <div class="hydcwiki-player-table__avatar">
                                <img :src="`https://minotar.net/helm/${ player.id }`">
                            </div>
                            <div class="hydcwiki-player-table__name">
                                <div class="hydcwiki-player-table__nick">{{ player.nick }}</div>
                                <div class="hydcwiki-player-table__id">{{ player.id }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__status">
                        <div class="hydcwiki-player-table-wrapper">
                            <div class="hydcwiki-player-table__personal">
                                <div class="hydcwiki-player-table__playertype" v-if="!(player.status === 2 || player.status === 3)">
                                    <div :class="`type ${getTypeClass(player.type)}`"></div>
                                    <div class="text">{{ executeType(player.type) }}</div>
                                </div>
                                <div class="hydcwiki-player-table__playerstatus" v-if="!(player.status === 0)">
                                    <div :class="`status ${getStatusClass(player.status)}`" v-if="player.status === 2 || player.status === 3"></div>
                                    <div class="icon" v-if="!(player.status === 2 || player.status === 3)">
                                        <span :class="`material-icons ${getStatusClass(player.status)}`">{{ getStatusIcon(player.status) }}</span>
                                    </div>
                                    <div class="text">{{ executeStatus(player.status) }}</div>
                                </div>
                            </div>
                            <div class="hydcwiki-player-table__code">
                                <div :class="`hydcwiki-player-table__pergroup ${getPerGroupClass(player.per_group)}`">{{ executePerGroup(player.per_group) }}</div>
                                <div class="dot"></div>
                                <div class="hydcwiki-player-table__piic">{{ player.piic }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__time">{{ player.jointime }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { get } from '@/api'

    export default {
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
            },
            executeType(type) {
                switch(type) {
                    case 0:
                        return '正式玩家';
                    case 1:
                        return '未确认玩家';
                    default:
                        return '未知';
                }
            },
            getTypeClass(type) {
                switch(type) {
                    case 0:
                        return 'normal';
                    case 1:
                        return 'unconfirm';
                    default:
                        return 'N/A';
                }
            },
            executeStatus(status) {
                switch(status) {
                    case 0:
                        return '正常';
                    case 1:
                        return '活跃';
                    case 2:
                        return '已离开';
                    case 3:
                        return '违规';
                    case 4:
                        return '休眠';
                    default:
                        return '未知';
                }
            },
            getStatusClass(status) {
                switch(status) {
                    case 0:
                        return 'regular';
                    case 1:
                        return 'active';
                    case 2:
                        return 'leave';
                    case 3:
                        return 'kick';
                    case 4:
                        return 'hibernate';
                    default:
                        return 'N/A';
                }
            },
            getStatusIcon(status) {
                switch(status) {
                    case 0:
                        return 'hdr_weak';
                    case 1:
                        return 'heart_broken';
                    case 2:
                        return 'delete_outline';
                    case 3:
                        return 'do_not_disturb';
                    case 4:
                        return 'bedtime';
                    default:
                        return 'done';
                }
            },
            executePerGroup(group) {
                if (group === null) {
                    return '无';
                }

                switch(group) {
                    case 'hydca1':
                        return 'A1';
                    case 'hydca2':
                        return 'A2';
                    case 'hydcb1_senior':
                        return 'B1S';
                    case 'hydcb1':
                        return 'B1';
                    case 'hydcb2':
                        return 'B2';
                    case 'hydcb3':
                        return 'B3';
                    case 'default':
                        return 'C';
                    default:
                        return 'N/A';
                }
            },
            getPerGroupClass(group) {
                if (group === null) {
                    return 'none';
                }

                switch(group) {
                    case 'hydca1':
                        return 'level-0';
                    case 'hydca2':
                    case 'hydcb1_senior':
                        return 'level-1';
                    case 'hydcb1':
                    case 'hydcb2':
                    case 'hydcb3':
                        return 'level-2';
                    case 'default':
                        return 'level-3';
                    default:
                        return 'default';
                }
            }
        },
        created() {
            this.fetchPlayerList();
        }
    }
</script>

<style lang="scss" scoped>
    @import url(@/assets/styles/table.scss);

    .hydcwiki-player-table {
        --color-player-list-type-normal: #3791be;
        --color-player-list-type-unconfirm: #efc51b;

        --color-player-list-status-regular: #0fda7f;
        --color-player-list-status-active: #e01482;
        --color-player-list-status-leave: #fc7985;
        --color-player-list-status-kick: #af1a1a;
        --color-player-list-status-hibernate: #41dcff;

        --color-player-list-pergroup-level-0: #fb5454;
        --color-player-list-pergroup-level-1: #009999;
        --color-player-list-pergroup-level-2: #3366cc;
        --color-player-list-pergroup-level-3: #1a8d00;

        --color-player-list-islogged: #008000;

        .hydcwiki-player-table-head {
            .hydcwiki-player-table-head__index {
                text-align: center;
            }
        }

        .hydcwiki-player-table-content {
            .hydcwiki-player-table__index {
                $index-value-padding: 14px;
                color: var(--color-base--subtle);
                font-size: 22px;
                font-weight: 600;
                text-align: center;
                padding: 0 $index-value-padding;
            }

            .hydcwiki-player-table__avatar {
                img {
                    $avatar-value-length: 40px;
                    display: block;
                    width: $avatar-value-length;
                    height: $avatar-value-length;
                    border-radius: 4px;
                }
            }

            .hydcwiki-player-table__info {
                .hydcwiki-player-table-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    position: relative;

                    .hydcwiki-player-table__islogged {
                        $status-value-length: 10px;
                        position: absolute;
                        left: -($status-value-length + 7px);
                        width: $status-value-length;
                        height: $status-value-length;
                        background-color: var(--color-player-list-islogged);
                        border-radius: 50%;
                    }
                }
            }

            .hydcwiki-player-table__nick {
                color: var(--color-base--subtle);
                font-size: 12px;
            }

            .hydcwiki-player-table__id {
                font-size: 22px;
                font-family: 'Minecraft';
            }

            .hydcwiki-player-table__status {
                .hydcwiki-player-table-wrapper {
                    display: flex;
                    gap: 10px;
                }
            }

            .hydcwiki-player-table__personal {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
            }

            .hydcwiki-player-table__playerstatus {
                display: flex;
                align-items: center;
                gap: 3px;

                .status {
                    $status-value-length: 10px;
                    width: $status-value-length;
                    height: $status-value-length;
                    border-radius: 50%;

                    &.regular {
                        background-color: var(--color-player-list-status-regular);
                    }

                    &.active {
                        background-color: var(--color-player-list-status-active);
                    }

                    &.leave {
                        background-color: var(--color-player-list-status-leave);
                    }

                    &.kick {
                        background-color: var(--color-player-list-status-kick);
                    }

                    &.hibernate {
                        background-color: var(--color-player-list-status-hibernate);
                    }
                }

                .icon .material-icons {
                    display: block;
                    font-size: 18px;

                    &.regular {
                        color: var(--color-player-list-status-regular);
                    }

                    &.active {
                        color: var(--color-player-list-status-active);
                    }

                    &.leave {
                        color: var(--color-player-list-status-leave);
                    }

                    &.kick {
                        color: var(--color-player-list-status-kick);
                    }

                    &.hibernate {
                        color: var(--color-player-list-status-hibernate);
                    }
                }
            }

            .hydcwiki-player-table__playertype {
                display: flex;
                align-items: center;
                gap: 3px;

                .type {
                    $type-value-length: 10px;
                    width: $type-value-length;
                    height: $type-value-length;
                    border-radius: 50%;

                    &.normal {
                        background-color: var(--color-player-list-type-normal);
                    }

                    &.unconfirm {
                        background-color: var(--color-player-list-type-unconfirm);
                    }
                }
            }

            .hydcwiki-player-table__code {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 5px;
                background-color: var(--color-surface-2);
                border-radius: 24px;
                padding: 3px 12px;

                .dot {
                    color: var(--color-surface-4);

                    &::after {
                        content: '•';
                    }
                }
            }

            .hydcwiki-player-table__pergroup {
                font-weight: bold;

                &.level-0 {
                    color: var(--color-player-list-pergroup-level-0);
                }

                &.level-1 {
                    color: var(--color-player-list-pergroup-level-1);
                }

                &.level-2 {
                    color: var(--color-player-list-pergroup-level-2);
                }

                &.level-3 {
                    color: var(--color-player-list-pergroup-level-3);
                }

                &.none {
                    color: var(--color-base--subtle);
                    opacity: 0.5;
                }

                &.default {
                    color: var(--color-base);
                }
            }

            .hydcwiki-player-table__piic {
                font-family: 'JetBrains Mono';
            }
        }
    }
</style>