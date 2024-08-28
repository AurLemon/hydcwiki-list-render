<template>
    <div class="hydcwiki-list-table">
        <table class="hydcwiki-player-table tablelist wikitable">
            <tbody>
                <tr class="hydcwiki-player-table-head">
                    <th class="hydcwiki-player-table-head__index">
                        <div class="hydcwiki-player-table-wrapper">
                            次序
                            <span class="material-icons"
                                content="次序是数据库中的默认排序编号，以入服日期为排序依据。"
                                v-tippy="{ placement: 'left', interactive: true }"
                            >info</span>
                        </div>
                    </th>
                    <th class="hydcwiki-player-table-head__info">
                        <div class="hydcwiki-player-table-wrapper">信息</div>
                    </th>
                    <th class="hydcwiki-player-table-head__status">
                        <div class="hydcwiki-player-table-wrapper">
                            状态
                            <span class="material-icons"
                                content="状态包含玩家类型、玩家状态和玩家权限组与玩家标识码（PIIC）。"
                                v-tippy="{ placement: 'left', interactive: true }"
                            >info</span>
                        </div>
                    </th>
                    <th class="hydcwiki-player-table-head__time" v-if="isLoaded && receivedData.listRenderData.show.jointime">
                        <div class="hydcwiki-player-table-wrapper">入服时间</div>
                    </th>
                    <th class="hydcwiki-player-table-head__contact" v-if="isLoaded && receivedData.listRenderData.show.contact">
                        <div class="hydcwiki-player-table-wrapper">联系方式</div>
                    </th>
                    <th class="hydcwiki-player-table-head__lastlogin" v-if="isLoaded && receivedData.listRenderData.show.lastlogin">
                        <div class="hydcwiki-player-table-wrapper">
                            最近登录
                            <span class="material-icons"
                                content="根据玩家绑定的主ID为查询依据，只有登录才会被记录。"
                                v-tippy="{ placement: 'left', interactive: true }"
                            >info</span>
                        </div>
                    </th>
                </tr>
                <tr class="hydcwiki-player-table-content" v-for="player in players" :key="player.piic">
                    <td class="hydcwiki-player-table__index">{{ player.index }}</td>
                    <td class="hydcwiki-player-table__info">
                        <div class="hydcwiki-player-table-wrapper">
                            <div class="hydcwiki-player-table__avatar" @click="changeSkin(player.piic)">
                                <div class="hydcwiki-player-table__islogged" v-if="player.is_logged"
                                    :content="`在线（最近一次登录：${ formatDate(player.lastlogin === null ? '未知' : player.lastlogin) }）`"
                                    v-tippy="{ placement: 'left', interactive: true }"
                                >
                                </div>
                                <img :src="`https://minotar.net/helm/${ player.id }`">
                            </div>
                            <div class="hydcwiki-player-table__name">
                                <div class="hydcwiki-player-table__nick">{{ player.nick }}</div>
                                <div class="hydcwiki-player-table__id">
                                    {{ player.id }}
                                    <CopyButton :textToCopy="player.id" />
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__status">
                        <div class="hydcwiki-player-table-wrapper">
                            <div class="hydcwiki-player-table__personal">
                                <div class="hydcwiki-player-table__playertype"
                                    v-if="!(player.status === 2 || player.status === 3)"
                                    v-show="isLoaded && receivedData.listRenderData.show.type"
                                >
                                    <div :class="`type ${getTypeClass(player.type)}`"></div>
                                    <div class="text">{{ executeType(player.type) }}</div>
                                </div>
                                <div class="hydcwiki-player-table__playerstatus" 
                                    v-if="!(player.status === 0)"
                                    v-show="isLoaded && receivedData.listRenderData.show.status"
                                    :class="{
                                        pointer: (player.status === 2 || player.status === 3) &&
                                        player.leave_reason !== null
                                    }"
                                    :content="player.leave_reason"
                                    v-tippy="
                                        (
                                            (player.status === 2 || player.status === 3) &&
                                            player.leave_reason !== null 
                                        ) ? 
                                        { appendTo: 'parent', placement: 'bottom', interactive: true } :
                                        { appendTo: 'parent', theme: 'none', trigger: 'manual' }
                                    ">
                                    <div :class="`status ${getStatusClass(player.status)}`" v-if="player.status === 2 || player.status === 3"></div>
                                    <div class="icon" v-if="!(player.status === 2 || player.status === 3)">
                                        <span :class="`material-icons ${getStatusClass(player.status)}`">{{ getStatusIcon(player.status) }}</span>
                                    </div>
                                    <div class="text">{{ executeStatus(player.status) }}</div>
                                </div>
                            </div>
                            <div class="hydcwiki-player-table__code">
                                <div :class="`hydcwiki-player-table__pergroup ${getPerGroupClass(player.per_group)}`"
                                    content="玩家权限组"
                                    v-tippy="{ appendTo: 'parent', placement: 'bottom', interactive: true }"
                                >{{ executePerGroup(player.per_group) }}</div>
                                <div class="dot"></div>
                                <div class="hydcwiki-player-table__piic"
                                    content="玩家标识码"
                                    v-tippy="{ appendTo: 'parent', placement: 'bottom', interactive: true }"
                                >
                                    {{ player.piic }}
                                    <CopyButton :textToCopy="player.piic" />
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__time" v-if="isLoaded && receivedData.listRenderData.show.jointime">
                        <div class="hydcwiki-player-table-wrapper both" v-if="player.leavetime !== null">
                            <div class="diff"
                                content="在服内待过的时间"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                            >{{ differenceInDays(player.jointime, player.leavetime) }}</div>
                            <div class="time-wrapper">
                                <div class="hydcwiki-player-table__jointime">{{ player.jointime }}</div>
                                <div class="hydcwiki-player-table__leavetime">{{ player.leavetime }}</div>
                            </div>
                        </div>
                        <div class="hydcwiki-player-table-wrapper" v-else>
                            <div class="diff"
                                content="到今天的天数"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                            >{{ differenceInDays(player.jointime, serverDate) }}</div>
                            <div class="hydcwiki-player-table__jointime">{{ player.jointime }}</div>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__contact" v-if="isLoaded && receivedData.listRenderData.show.contact">
                        <div class="hydcwiki-player-table-wrapper" :class="{ disabled: player.is_hidden_contact }">
                            <span class="icon qq" :class="{ none: player.contact.qq === null }"
                                :content="player.contact.qq !== null ? player.contact.qq : '无'"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                                v-clipboard:copy="player.contact.qq !== null ? player.contact.qq : '无'"
                            ></span>
                            <span class="icon wechat" :class="{ none: player.contact.wechat === null }"
                                :content="player.contact.wechat !== null ? player.contact.wechat : '无'"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                                v-clipboard:copy="player.contact.wechat !== null ? player.contact.wechat : '无'"
                            ></span>
                            <span class="icon bilibili" :class="{ none: player.contact.bilibili === null }"
                                :content="player.contact.bilibili !== null ? player.contact.bilibili : '无'"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                                v-clipboard:copy="player.contact.bilibili !== null ? player.contact.bilibili : '无'"
                            ></span>
                            <span class="material-icons email" :class="{ none: player.contact.email === null }"
                                :content="player.contact.email !== null ? player.contact.email : '无'"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                                v-clipboard:copy="player.contact.email !== null ? player.contact.email : '无'"
                            >email</span>
                            <span class="material-icons others" :class="{ none: player.contact.others === null }"
                                :content="player.contact.others !== null ? player.contact.others : '无'"
                                v-tippy="{ appendTo: 'parent', interactive: true }"
                                v-clipboard:copy="player.contact.others !== null ? player.contact.others : '无'"
                            >more_horiz</span>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__lastlogin" v-if="isLoaded && receivedData.listRenderData.show.lastlogin">
                        {{ player.lastlogin === null ? '无记录' : formatDate(player.lastlogin) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    import { get } from '@/api'

    import { EventBus } from '@/services/player/event-bus'
    import CopyButton from '@/components/common/CopyButton.vue'
    import { debounce } from '@/utils/debounce'

    export default {
        data() {
            return {
                serverDate: null,
                players: [],
                response: {},
                receivedData: {},
                isLoaded: false,
                lastOffset: null,
                currentPage: 1
            }
        },
        components: {
            CopyButton
        },
        methods: {
            async fetchPlayerList(params = {}, callback) {
                try {
                    const response = await get('/info/list/player', params);
                    this.serverDate = dayjs(response.data.timestamp * 1000).format('YYYY-MM-DD');
                    this.players = response.data.data.list;
                    this.response = response.data.data;
                    this.sendDataToPanel();

                    if (typeof callback === 'function') {
                        callback(this.response);
                    }
                } catch (error) {
                    console.error('Error fetching player data:', error);
                }
            },
            updateFilterList: debounce(function() {
                this.receivedData.listRenderData.isFetchingPage = true;
                let params = {
                    sort: this.receivedData.listRenderData.sort,
                    sort_column: this.receivedData.listRenderData.sort_column
                };
                this.fetchPlayerList(params, () => {
                    this.receivedData.listRenderData.isFetchingPage = false;
                });
            }, 300),
            async fetchPage(page, callback) {
                if (page < 0 || page > (this.response.page.total % this.response.page.limit) - 1) {
                    page = this.currentPage;
                }
                this.receivedData.listRenderData.isFetchingPage = true;
                this.currentPage = page;

                let params = {
                    page: page,
                    sort: this.receivedData.listRenderData.sort || null,
                    sort_column: this.receivedData.listRenderData.sort_column || null
                };

                try {
                    await this.fetchPlayerList(params, () => {
                        this.receivedData.listRenderData.isFetchingPage = false;
                        if (typeof callback === 'function') {
                            callback();
                        }
                    });
                } catch (error) {
                    console.error('Error fetching player data:', error);
                    this.receivedData.listRenderData.isFetchingPage = false;
                }
            },
            nextPage: debounce(function(state) {
                let maxPages = (this.response.page.total % this.response.page.limit) - 1;

                if (state === 'max') {
                    this.fetchPage(maxPages, () => {
                        this.receivedData.listRenderData.nextPageMax = true;
                        this.receivedData.listRenderData.prevPageMax = false;
                    });
                } else {
                    if (this.currentPage > maxPages) {
                        this.receivedData.listRenderData.nextPageMax = true;
                        return;
                    }

                    this.fetchPage(++this.currentPage, () => {
                        this.receivedData.listRenderData.prevPageMax = false;

                        if (this.currentPage === maxPages) {
                            this.receivedData.listRenderData.nextPageMax = true;
                        }
                    });
                }
            }, 300),
            prevPage: debounce(function(state) {
                if (state === 'max') {
                    this.fetchPage(1, () => {
                        this.receivedData.listRenderData.prevPageMax = true;
                        this.receivedData.listRenderData.nextPageMax = false;
                    });
                } else {
                    if (this.currentPage < 1) {
                        this.receivedData.listRenderData.prevPageMax = true;
                        return;
                    }

                    this.fetchPage(--this.currentPage, () => {
                        this.receivedData.listRenderData.nextPageMax = false;

                        if (this.currentPage === 1) {
                            this.receivedData.listRenderData.prevPageMax = true;
                        }
                    });
                }
            }, 300),
            changePage(page) {
                let maxPages = (this.response.page.total % this.response.page.limit) - 1;

                if (page < 0 || page > (this.response.page.total % this.response.page.limit) - 1) {
                    page = this.currentPage;
                } else {
                    if (!/^-?\d+$/.test(page)) {
                        page = 1;
                    }                    
                }

                this.fetchPage(page, () => {
                    this.currentPage = page;
                    if (page === 1) {
                        this.receivedData.listRenderData.prevPageMax = true;
                        this.receivedData.listRenderData.nextPageMax = false;
                    } else if (page === maxPages) {
                        this.receivedData.listRenderData.prevPageMax = false;
                        this.receivedData.listRenderData.nextPageMax = true;
                    } else {
                        this.receivedData.listRenderData.prevPageMax = false;
                        this.receivedData.listRenderData.nextPageMax = false;
                    }
                });
            },
            formatDate(timestamp) {
                if (timestamp === null) 
                    return null;

                return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
            },
            differenceInDays(date1, date2) {
                return dayjs(date2).diff(dayjs(date1), 'day');
            },
            changeSkin(piic) {
                EventBus.$emit('update-skin', piic);
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
                        return 'how_to_reg';
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
            },
            sendDataToPanel() {
                const data = {
                    response: this.response
                };
                EventBus.$emit('dataFromPlayerList', data);
            }
        },
        created() {
            this.fetchPlayerList();
            EventBus.$on('dataFromPlayerListPanel', (data) => {
                this.receivedData = data;
                this.isLoaded = true;
            });
            EventBus.$on('update-list', this.updateFilterList);
            EventBus.$on('next-page', this.nextPage);
            EventBus.$on('prev-page', this.prevPage);
            EventBus.$on('change-page', this.changePage);
        },
        beforeDestory() {
            EventBus.$off('dataFromPlayerListPanel');
            EventBus.$off('update-list', this.updateFilterList);
            EventBus.$off('next-page', this.nextPage);
            EventBus.$off('prev-page', this.prevPage);
            EventBus.$off('change-page', this.changePage);
        }
    }
</script>

<style lang="scss" scoped>
    @import url(@/assets/styles/table.scss);
    @import url(@/assets/styles/reset_wiki.scss);

    .hydcwiki-list-table {
        width: 100%;
        overflow-x: auto;
    }

    .hydcwiki-player-table {
        --color-player-list-type-normal: #3791be;
        --color-player-list-type-unconfirm: #efc51b;
        --color-player-list-status-regular: #0fda7f;
        --color-player-list-status-active: #3791be;
        --color-player-list-status-leave: #fc7985;
        --color-player-list-status-kick: #af1a1a;
        --color-player-list-status-hibernate: #3791be;
        --color-player-list-pergroup-level-0: #c41111;
        --color-player-list-pergroup-level-1: #3791be;
        --color-player-list-pergroup-level-2: #3366cc;
        --color-player-list-pergroup-level-3: #1a8d00;
        --color-player-list-islogged: #008000;

        .hydcwiki-player-table-head {
            filter: drop-shadow(0 2px 6px var(--h2-bgColor-dark--1));

            [class^="hydcwiki-player-table-head__"] {
                .hydcwiki-player-table-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .material-icons {
                    display: block;
                    color: var(--color-surface-0);
                    font-size: 14px;
                    opacity: 0.4;
                    cursor: pointer;
                }
            }

            .hydcwiki-player-table-head__index {
                text-align: center;
            }

            .hydcwiki-player-table-head__info {
                min-width: 300px;
            }

            .hydcwiki-player-table-head__status {
                min-width: 350px;
            }

            .hydcwiki-player-table-head__time {
                min-width: 145px;
            }
        }

        .hydcwiki-player-table-content {
            .hydcwiki-player-table__index {
                $index-value-padding: 14px;
                color: var(--color-base--subtle);
                font-size: 16px;
                text-align: center;
                padding: 0 $index-value-padding;
            }

            .hydcwiki-player-table__avatar {
                position: relative;
                cursor: pointer;

                img {
                    $avatar-value-length: 40px;
                    display: block;
                    width: $avatar-value-length;
                    height: $avatar-value-length;
                    border-radius: 4px;
                    transition: filter 300ms ease, transform 300ms ease;

                    &:hover {
                        filter: saturate(4) brightness(1.25);
                        transform: rotate(-10deg);
                    }
                }
                
                .hydcwiki-player-table__islogged {
                    $status-value-length: 12px;
                    $status-value-offset: 4px;
                    position: absolute;
                    right: -($status-value-offset);
                    bottom: -($status-value-offset);
                    z-index: 10;
                    width: $status-value-length;
                    height: $status-value-length;
                    background-color: var(--color-player-list-islogged);
                    border-radius: 50%;
                    cursor: pointer;
                }
            }

            .hydcwiki-player-table__info {
                .hydcwiki-player-table-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    &:hover {
                        .hydcwiki-player-table__id {
                            .copy-button {
                                opacity: 1;
                            }
                        }
                    }
                }
            }

            .hydcwiki-player-table__nick {
                color: var(--color-base--subtle);
                font-size: 12px;
            }

            .hydcwiki-player-table__id {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 22px;
                font-family: 'Minecraft';
                user-select: none;

                .copy-button {
                    opacity: 0;
                }
            }

            .hydcwiki-player-table__status {
                .hydcwiki-player-table-wrapper {
                    display: flex;
                    gap: 10px;
                    user-select: none;
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

                &.pointer {
                    cursor: pointer;
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

                &:hover {
                    .hydcwiki-player-table__piic {
                        .copy-button {
                            opacity: 0.8;
                            left: calc(100% + 12px);
                        }
                    }
                }
            }

            .hydcwiki-player-table__pergroup {
                font-weight: bold;
                cursor: pointer;

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
                    opacity: 0.7;
                }

                &.default {
                    color: var(--color-base);
                }
            }

            .hydcwiki-player-table__piic {
                display: flex;
                align-items: center;
                font-family: 'JetBrains Mono';
                position: relative;
                cursor: pointer;

                .copy-button {
                    color: var(--color-surface-0);
                    font-size: 14px;
                    padding: 4px;
                    border-radius: 50%;
                    background: var(--color-base--subtle);
                    position: absolute;
                    left: calc(100% + 0px);
                    opacity: 0;
                    transition: opacity 250ms ease, left 300ms ease;
                }
            }

            .hydcwiki-player-table__time {
                white-space: nowrap;

                .hydcwiki-player-table-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    .diff {
                        color: var(--color-surface-0);
                        font-size: 10px;
                        padding: 2px 4px;
                        border-radius: var(--border-radius--pill);
                        background-color: var(--color-primary);
                        cursor: pointer;
                    }

                    &.both {
                        .diff {
                            background-color: var(--color-player-list-status-leave);
                        }
                    }
                }
            }

            .hydcwiki-player-table__contact {
                .hydcwiki-player-table-wrapper {
                    display: flex;
                    gap: 4px;

                    .icon, .material-icons  {
                        $icon-value-length: 16px;
                        display: flex;
                        justify-content: center;
                        color: var(--color-base--subtle);
                        font-size: $icon-value-length;
                        width: $icon-value-length;
                        height: $icon-value-length;
                        background-repeat: no-repeat;
                        background-size: contain;
                        background-position: center;
                        position: relative;
                        cursor: pointer;
                        user-select: none;

                        &.none {
                            filter: grayscale(1);
                            pointer-events: none;

                            &::before {
                                content: none;
                            }
                        }

                        &::before {
                            content: 'content_copy';
                            color: var(--color-base);
                            font-size: 14px;
                            font-family: "Material Icons";
                            padding: 4px;
                            border: 1px solid var(--border-color-base);
                            border-radius: 50%;
                            background: var(--color-surface-2);
                            position: absolute;
                            top: calc(100% + 0px);
                            opacity: 0;
                            transition: opacity 250ms ease, top 350ms ease;
                        }

                        &:hover {
                            &::before {
                                opacity: 0.6;
                                top: calc(100% + 12px);
                            }
                        }

                        &:active {
                            &::before {
                                content: 'done';
                                color: var(--color-surface-0);
                                background: var(--color-primary);
                            }
                        }
                    }

                    .icon {
                        &.qq {
                            background-image: url('@/assets/images/QQ_logo.svg');
                        }

                        &.wechat {
                            background-image: url('@/assets/images/WeChat_logo.svg');
                        }

                        &.bilibili {
                            background-image: url('@/assets/images/bilibili_logo.svg');
                        }
                    }

                    &.disabled {
                        cursor: not-allowed;
                        
                        .icon, .material-icons {
                            opacity: 0.15;
                            pointer-events: none;

                            &::before {
                                content: none;
                            }
                        }
                    }
                }
            }

            .hydcwiki-player-table__lastlogin {
                white-space: nowrap;
            }
        }
    }
</style>

<style lang="scss">
    .tippy-tooltip {
        &.light-modern-theme {
            max-width: 400px !important;
        }
    }
</style>