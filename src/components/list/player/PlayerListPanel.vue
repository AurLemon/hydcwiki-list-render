<template>
    <div class="hydcwiki-list-panel">
        <div class="hydcwiki-player-panel-card hydcwiki-player-panel__control">
            <div class="hydcwiki-player-panel__pages" v-if="isLoaded">
                <div class="hydcwiki-player-panel__current">{{ listRenderData.currentPage }}</div>
                <div class="dash"></div>
                <div class="hydcwiki-player-panel__max">{{ (receivedData.response.statistics.total % receivedData.response.list.length) + 1 }}</div>
            </div>
            <div class="hydcwiki-player-panel__arrows">
                <div class="hydcwiki-player-panel__arrow hydcwiki-player-panel__left" @click="prevPage">
                    <span class="material-icons">chevron_left</span>
                </div>
                <div class="hydcwiki-player-panel__arrow hydcwiki-player-panel__right" @click="nextPage">
                    <span class="material-icons">chevron_right</span>
                </div>
            </div>
        </div>
        <div class="hydcwiki-player-panel-card hydcwiki-player-panel__filter">
            <div class="hydcwiki-player-panel-info">
                <div class="hydcwiki-player-panel__desc">
                    <span class="material-icons">table_chart</span>
                    显示字段
                </div>
                <div class="hydcwiki-player-panel-wrapper hydcwiki-player-panel__showcolumns">
                    <label>
                        <input type="checkbox" v-model="listRenderData.show.type">
                        玩家类型
                    </label>
                    <label>
                        <input type="checkbox" v-model="listRenderData.show.status">
                        玩家状态
                    </label>
                    <label>
                        <input type="checkbox" v-model="listRenderData.show.jointime">
                        入服时间
                    </label>
                    <label>
                        <input type="checkbox" v-model="listRenderData.show.contact">
                        联系方式
                    </label>
                    <label>
                        <input type="checkbox" v-model="listRenderData.show.lastlogin">
                        最近登录
                    </label>
                </div>
            </div>
            <div class="hydcwiki-player-panel-info">
                <div class="hydcwiki-player-panel__desc">
                    <span class="material-icons">merge_type</span>
                    排序字段
                </div>
                <div class="hydcwiki-player-panel-wrapper hydcwiki-player-panel__sort">
                    <label @click="updateListRender">
                        <input type="radio" value="piic" v-model="listRenderData.sort_column">
                        玩家编号
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="id" v-model="listRenderData.sort_column">
                        ID
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="nick" v-model="listRenderData.sort_column">
                        玩家昵称
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="type" v-model="listRenderData.sort_column">
                        玩家类型
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="status" v-model="listRenderData.sort_column">
                        玩家状态
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="jointime" v-model="listRenderData.sort_column">
                        入服时间
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="leavetime" v-model="listRenderData.sort_column">
                        退服时间
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="lastlogin" v-model="listRenderData.sort_column">
                        最近登录
                    </label>
                </div>
            </div>
            <div class="hydcwiki-player-panel-info">
                <div class="hydcwiki-player-panel__desc">
                    <span class="material-icons">view_column</span>
                    排序方式
                </div>
                <div class="hydcwiki-player-panel-wrapper hydcwiki-player-panel__sort">
                    <label @click="updateListRender">
                        <input type="radio" value="desc" v-model="listRenderData.sort">
                        降序
                    </label>
                    <label @click="updateListRender">
                        <input type="radio" value="asc" v-model="listRenderData.sort">
                        升序
                    </label>
                </div>
            </div>
        </div>
        <div class="hydcwiki-player-panel-card hydcwiki-player-panel__overview">
            <div class="hydcwiki-player-panel__title">
                <span class="material-icons">info</span>
                概览
            </div>
            <div class="hydcwiki-player-panel-wrapper">
                <div class="hydcwiki-player-panel__data" v-if="isLoaded">
                    <div class="hydcwiki-player-panel__value">{{ receivedData.response.statistics.total }}</div>
                    <div class="hydcwiki-player-panel__label">玩家总数</div>
                </div>
                <div class="hydcwiki-player-panel__data" v-if="isLoaded">
                    <div class="hydcwiki-player-panel__value">{{ receivedData.response.statistics.active_status_count }}</div>
                    <div class="hydcwiki-player-panel__label">活跃玩家数</div>
                </div>
                <div class="hydcwiki-player-panel__data" v-if="isLoaded">
                    <div class="hydcwiki-player-panel__value">{{ receivedData.response.statistics.leave_status_count }}</div>
                    <div class="hydcwiki-player-panel__label">离开玩家数</div>
                </div>
                <div class="hydcwiki-player-panel__data" v-if="isLoaded">
                    <div class="hydcwiki-player-panel__value">{{ receivedData.response.statistics.normal_type_count }}</div>
                    <div class="hydcwiki-player-panel__label">正式玩家数</div>
                </div>
                <div class="hydcwiki-player-panel__data" v-if="isLoaded">
                    <div class="hydcwiki-player-panel__value">{{ receivedData.response.statistics.unconfirmed_type_count }}</div>
                    <div class="hydcwiki-player-panel__label">未确认玩家数</div>
                </div>
            </div>
        </div>
        <div class="hydcwiki-player-panel-card hydcwiki-player-panel__playershow" :class="{ click: playerShowClick }" @click="handlePlayerShowClick">
            <div class="hydcwiki-player-panel__title">
                <span class="material-icons">crop_rotate</span>
                模型
            </div>
            <div class="hydcwiki-player-panel__playershow__background">
                <div class="hydcwiki-player-panel__playershow__canvas">
                    <canvas id="player-show-container"></canvas>
                </div>
            </div>
            <div class="hydcwiki-player-panel__playershow__foreground">
                <div class="hydcwiki-player-panel__playershow__info">
                    <div class="hydcwiki-player-panel__playershow__nick">{{ skinShowPlayerInfo.nick }}</div>
                    <div class="hydcwiki-player-panel__playershow__id">{{ skinShowPlayerInfo.id }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { SkinViewer } from "skinview3d"

    import { EventBus } from '@/services/player/event-bus'

    export default {
        name: 'PlayerListPanel',
        data() {
            return {
                listRenderData: {
                    currentPage: 1,
                    show: {
                        index: true,
                        avatar: true,
                        id: true,
                        nick: true,
                        type: true,
                        status: true,
                        per_group: true,
                        piic: true,
                        jointime: true,
                        contact: true,
                        lastlogin: false
                    },
                    sort: 'asc',
                    sort_column: 'piic'
                },
                skinViewer: Object,
                sharedData: {},
                receivedData: {},
                isLoaded: false,
                skinShowPlayerInfo: {},
                playerShowClick: false
            }
        },
        methods: {
            initSkinViewer() {
                this.skinViewer = new SkinViewer({
                    canvas: document.getElementById("player-show-container"),
                    width: 110,
                    height: 180,
                });

                this.skinViewer.fov = 60;
                this.skinViewer.zoom = 1;
                this.skinViewer.autoRotate = true;
            },
            loadSkinViewer() {
                if (this.isLoaded === true && this.receivedData.response?.list?.length) {
                    this.skinShowPlayerInfo = this.receivedData.response.list[
                        Math.floor(Math.random() * this.receivedData.response.list.length)
                    ];

                    this.skinViewer.loadSkin('https://minotar.net/skin/' + this.skinShowPlayerInfo.id)
                }
            },
            handleUpdateSkin(piic) {
                this.skinShowPlayerInfo = this.receivedData.response.list.find(player => player.piic === piic);
                this.skinViewer.loadSkin('https://minotar.net/skin/' + this.skinShowPlayerInfo.id);
            },
            sendDataToList() {
                const data = {
                    listRenderData: this.listRenderData
                };
                EventBus.$emit('dataFromPlayerListPanel', data);
            },
            updateListRender(renderData) {
                EventBus.$emit('update-list', renderData);
            },
            nextPage() {
                this.currentPage++;
                EventBus.$emit('next-page');
            },
            prevPage() {
                this.currentPage--;
                EventBus.$emit('prev-page');
            },
            handlePlayerShowClick() {
                this.playerShowClick ? (
                    this.playerShowClick = false,
                    this.skinViewer.zoom = 1,
                    this.skinViewer.autoRotate = true
                ) : (
                    this.playerShowClick = true,
                    this.skinViewer.autoRotate = false
                );
            }
        },
        mounted() {
            this.initSkinViewer();            
        },
        created() {
            EventBus.$on('dataFromPlayerList', (data) => {
                this.receivedData = data;
                this.isLoaded = true;
                this.loadSkinViewer();

                if (typeof this.receivedData.changeSkin === 'function') {
                    this.receivedData.changeSkin(this.skinShowInfo.id);
                }

                this.sendDataToList();
            });
            EventBus.$on('update-skin', this.handleUpdateSkin);
        },
        beforeDestroy() {
            EventBus.$off('dataFromPlayerList');
            EventBus.$off('update-skin', this.handleUpdateSkin);
        }
    }
</script>

<style lang="scss" scoped>
    $panel-value-padding: 12px;
    
    .hydcwiki-list-panel {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        gap: 1rem;
        width: 120px;
        margin-top: 36px;

        .hydcwiki-player-panel__title {
            display: flex;
            align-items: center;
            gap: 4px;
            color: var(--color-base--subtle);
            font-size: 12px;
            opacity: 0.6;
            user-select: none;

            .material-icons {
                font-size: 16px;
            }
        }

        .hydcwiki-player-panel-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            padding: $panel-value-padding;
            background: var(--color-surface-2);
            border: 1px solid var(--border-color-subtle);
            border-radius: var(--border-radius--large);
            outline: 2px solid transparent;
            box-shadow: var(--box-shadow-card);
            transition: all 300ms ease;
        }

        .hydcwiki-player-panel__value {
            font-size: 32px;
            font-weight: 500;
        }

        .hydcwiki-player-panel__label {
            color: var(--color-base--subtle);
            font-size: 12px;
            line-height: 1;
        }
    }

    .hydcwiki-player-panel__control {
        padding: 0 !important;
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none !important;
        gap: 2px !important;

        .hydcwiki-player-panel__pages {
            display: flex;
            justify-content: center;
            align-items: baseline;
            gap: 6px;
            color: var(--color-base--subtle);
            font-size: 24px;
            font-weight: bold;

            .hydcwiki-player-panel__current {
                font-size: 46px;
            }

            .dash {
                &::after {
                    content: '/';
                }
            }
        }

        .hydcwiki-player-panel__arrows {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 6px;
            user-select: none;

            .hydcwiki-player-panel__arrow {
                color: var(--color-base);
                padding: 3px;
                border-radius: var(--border-radius--large);
                background: var(--color-surface-3);
                cursor: pointer;
                transition: all 150ms ease;

                .material-icons {
                    display: block;
                    font-size: 18px;
                }

                &:hover {
                    color: var(--color-surface-0);
                    background: var(--color-primary);
                }

                &:active {
                    transform: scale(0.9);
                }
            }
        }
    }
    
    .hydcwiki-player-panel__filter {
        &.hydcwiki-player-panel-card {
            gap: 1rem;
        }

        .hydcwiki-player-panel-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .hydcwiki-player-panel-wrapper {
            display: flex;
            flex-direction: column;
            gap: 5px;

            label {
                display: inline-flex;
                align-items: center;
                gap: 2px;
                font-size: 14px;
            }

            &.hydcwiki-player-panel__sort {
                flex-direction: row;
                flex-wrap: wrap;
            }
        }

        .hydcwiki-player-panel__desc {
            display: flex;
            align-items: center;
            gap: 4px;
            color: var(--color-base--subtle);
            font-size: 12px;
            opacity: 0.6;
            user-select: none;

            .material-icons {
                font-size: 16px
            }
        }
    }

    .hydcwiki-player-panel__overview {
        .hydcwiki-player-panel-wrapper {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }

    .hydcwiki-player-panel__playershow {
        $canvas-value-width: 110px;
        $canvas-value-height: 180px;
        $canvas-value-click-duration: 450ms;
        padding: 0 !important;
        min-height: $canvas-value-height + 20px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        user-select: none;

        .hydcwiki-player-panel__title {
            position: absolute;
            top: $panel-value-padding;
            left: $panel-value-padding;
            z-index: 20;
            transition: all $canvas-value-click-duration ease;
        }

        .hydcwiki-player-panel__playershow__background {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 20;
            filter: drop-shadow(0 1px 6px var(--h2-bgColor-dark--0));

            .hydcwiki-player-panel__playershow__canvas {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;

                canvas {
                    width: 100% !important;
                    height: 100% !important;
                    transform: rotate(-25deg) translate(15px, 35px);
                    transition: all $canvas-value-click-duration ease;
                    pointer-events: none;
                }
            }
        }

        .hydcwiki-player-panel__playershow__foreground {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: $panel-value-padding;
            height: 100%;
            z-index: 10;

            .hydcwiki-player-panel__playershow__info {
                opacity: 1;
                transition: opacity $canvas-value-click-duration ease;
            }

            .hydcwiki-player-panel__playershow__nick {
                font-size: 18px;
            }

            .hydcwiki-player-panel__playershow__id {
                color: var(--color-base--subtle);
                font-size: 12px;
                font-family: 'Minecraft';
                line-height: 1;
            }
        }

        &:hover {
            outline-color: var(--color-primary);
        }

        &:active {
            transform: scale(0.95);
            transition-duration: 250ms;
        }

        &.click {
            background: radial-gradient(ellipse at 5% 0%, #bf398910 0, var(--color-surface-0) 75%),
                        radial-gradient(ellipse at 60% 0%, #096bde10 0, var(--color-surface-0) 75%);
            
            .hydcwiki-player-panel__title {
                opacity: 0;
                z-index: 5;
            }

            .hydcwiki-player-panel__playershow__foreground {
                z-index: 1;

                .hydcwiki-player-panel__playershow__info {
                    opacity: 0;
                    z-index: 5;
                }
            }

            .hydcwiki-player-panel__playershow__background {
                z-index: 5;

                .hydcwiki-player-panel__playershow__canvas {
                    canvas {
                        transform: rotate(0deg) translate(0px, 0px);
                        pointer-events: all;
                    }
                }
            }
        }
    }
</style>