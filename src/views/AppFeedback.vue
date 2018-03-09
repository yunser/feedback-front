<template>
    <my-page class="bg-gray" :title="pageTitle">
        <section class="section" v-if="feedbacks">
            <div class="statistics">
                <div class="item solved">
                    <div class="inner">
                        <h3>已解决</h3>
                        <div class="txt-digit j-digit">{{ solvedCount }}</div>
                    </div>
                </div>
                <div class="item processing">
                    <div class="inner">
                        <h3>处理中</h3>
                        <div class="txt-digit j-digit">{{ unsolvedCount }}</div>
                    </div>
                </div>
            </div>
        </section>
        <!--<ui-raised-button label="去反馈" />-->
        <div class="feedback">
            先看看你反馈的问题是否已经解决了，没有解决？<a href="#" @click.prevent="feedback">去反馈</a>
        </div>
        <section class="section" v-if="feedbacks">
            <h2 class="section-title">反馈列表</h2>
            <ul class="feedback-list">
                <li class="item" v-for="feedback,index in feedbacks">
                    <!--游客：-->
                    <span class="content"><ui-badge class="badge" :content="'' + (index + 1)" />{{ feedback.content }}</span>
                    <span class="status" :class="{solved: feedback.status === 1}">{{ feedback.status === 1 ? '已解决' : '处理中'}}</span>
                </li>
            </ul>
        </section>
        <!--<ui-timeline>-->
            <!--<ui-timeline-item>-->
                <!--<span slot="time">2017年 6月 1日</span>-->
                <!--<span slot="des">发起第一个pr</span>-->
            <!--</ui-timeline-item>-->
            <!--<ui-timeline-item>-->
                <!--<span slot="time">2017年 6月 6日</span>-->
                <!--<span slot="des">发起第一个issue</span>-->
            <!--</ui-timeline-item>-->
        <!--</ui-timeline>-->
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                pageTitle: '反馈',
                app: null,
                feedbacks: null,
                solvedCount: 0,
                unsolvedCount: 0
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let appId = this.$route.params.id
                this.$http.get('/apps/' + appId)
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        this.app = data
                        this.pageTitle = this.app.name + ' - 反馈'
                    },
                    response => {
                        console.log(response)
                    })
                this.$http.get('/apps/' + appId + '/feedbacks')
                    .then(response => {
                        let data = response.data
                        console.log(data)
                        this.feedbacks = data
//                        this.pageTitle = this.app.name + ' - 反馈'
                        for (let feedback of this.feedbacks) {
                            console.log(feedback.status)
                            if (feedback.status === 1) {
                                this.solvedCount++
                            } else {
                                this.unsolvedCount++
                            }
                        }
                    },
                    response => {
                        console.log(response)
                    })
            },
            feedback() {
                this.$router.push(`/apps/${this.app.id}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bg-gray {
        background-color: #f1f1f1;
    }
    .statistics {
        display: flex;
        justify-content: space-around;
        /*margin-bottom: 24px;*/
        .item {
            width: 104px;
            margin-right: 16px;
            text-align: center;
            h3 {
            }
            small {
                color: #545968;
                line-height: 30px;
            }
        }
        .item .txt-digit {
            font-size: 40px;
            line-height: 50px;
            margin-bottom: 7px;
        }
        .item.solved .inner:after {
            content: url("/static/img/status_successs.png");
        }
        .item.processing .inner:after {
            content: url("/static/img/status_error.png");
        }
    }
    .feedback {
        margin-bottom: 16px;
    }
    .section {
        max-width: 750px;
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 2px;
        background-color: #fff;
        /*box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);*/
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        .section-title {
            font-size: 24px;
            margin-bottom: 16px;
        }
    }
    .feedback-list {
        background-color: #fff;
        .item {
            display: flex;
            justify-content: space-between;
            padding: 16px 0;
            border-bottom: 1px solid #e9e9e9;
            &:last-child {
                border-bottom: none;
            }
            .badge {
                margin-right: 8px;
            }
            .status {
                &:before {
                    content: '';
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin-right: 9px;
                    border-radius: 50%;
                    background-color: #ff8834;
                }
                &.solved {
                    &:before {
                        background-color: #4dbd74;;
                    }
                }
            }
        }
    }
</style>
