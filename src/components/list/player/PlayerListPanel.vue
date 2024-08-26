<template>
    <div class="hydcwiki-list-panel">
        <div class="hydcwiki-player-panel-card hydcwiki-player-panel__overview">
            <div class="hydcwiki-player-panel__title"><span class="material-icons">info</span> 概览</div>
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
        <div class="hydcwiki-player-panel-card hydcwiki-player-panel__playershow">
            <div class="hydcwiki-player-panel__playershow__background"></div>
            <div class="hydcwiki-player-panel__playershow__foreground">
                <div class="hydcwiki-player-panel__playershow__canvas">
                    <canvas id="player-show-container"></canvas>
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
                skinViewer: Object,
                sharedData: {},
                receivedData: {},
                isLoaded: false,
                skinShowInfo: {}
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
                    this.skinShowInfo = this.receivedData.response.list[
                        Math.floor(Math.random() * this.receivedData.response.list.length)
                    ];

                    this.skinViewer.loadSkin('https://minotar.net/skin/' + this.skinShowInfo.id)
                }
            },
            handleUpdateSkin(id) {
                this.skinViewer.loadSkin('https://minotar.net/skin/' + id)
            },
            sendDataToList() {
                const data = {};
                EventBus.$emit('dataFromPlayerListPanel', data);
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
                    const someId = this.skinShowInfo.id;
                    this.receivedData.changeSkin(someId);
                    console.log(this.receivedData);
                }
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
    .hydcwiki-list-panel {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 120px;

        .hydcwiki-player-panel__title {
            display: flex;
            align-items: center;
            gap: 2px;
            color: var(--color-base--subtle);
            font-size: 12px;
            opacity: 0.6;

            .material-icons {
                font-size: 16px;
            }
        }

        .hydcwiki-player-panel-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            padding: 12px;
            background: var(--color-surface-2);
            border: 1px solid var(--border-color-subtle);
            border-radius: var(--border-radius--large);
            box-shadow: var(--box-shadow-card);
        }

        .hydcwiki-player-panel__value {
            color: var(--color-base--emphasized);
            font-size: 32px;
            font-weight: 600;
        }

        .hydcwiki-player-panel__label {
            color: var(--color-base--subtle);
            font-size: 12px;
            line-height: 1;
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
        padding: 0 !important;
        position: relative;
        overflow: hidden;

        .hydcwiki-player-panel__playershow__background {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .hydcwiki-player-panel__playershow__foreground {
            .hydcwiki-player-panel__playershow__canvas {
                display: flex;
                justify-content: center;
                width: 100%;
                height: 100%;

                canvas {
                    width: 110px !important;
                    height: 180px !important;
                    filter: opacity(0.9);
                    transform: rotate(-25deg) translate(20px, 40px);
                    transition: all 450ms ease;
                }
            }
        }

        &:hover {
            .hydcwiki-player-panel__playershow__canvas canvas {
                filter: opacity(1);
                transform: rotate(-25deg) translate(15px, 30px);
            }
        }
    }
</style>