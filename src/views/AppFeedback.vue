<template>
    <my-page :title="pageTitle">
        <div class="success-box" v-if="success">
            <h2>反馈成功</h2>
            <div>感谢您的反馈</div>
        </div>
        <div>
            <div>
                <div>当然，你也可以联系 QQ 1418503647 或 邮箱 1418503647@qq.com 进行反馈。</div>
            </div>
        </div>
    </my-page>
</template>

<script>
    const RatingControl = window.RatingControl

    export default {
        data () {
            return {
                pageTitle: '反馈',
                title: '',
                content: '',
                contact: '',
                success: false
            }
        },
        mounted() {
            let name = this.$route.query.name
            if (name) {
                this.pageTitle = name + '反馈'
            }

            document.querySelector('.rating-box').classList.add('clip-marker')
            this.rating = new RatingControl(document.querySelector('.rating-control'))
        },
        methods: {
            submit() {
                console.log(this.rating.selectedRating)
                if (!this.content) {
                    alert('请输入内容')
                    return
                }
                this.$http.post('/feedbacks', {
                    title: this.title || '',
                    content: this.content || '',
                    contact: this.contact
                }).then(
                    response => {
                        let data = response.data
                        console.log(data.data)
                        this.success = true
                    },
                    response => {
                        console.log('系统出错')
                        console.log(response)
//                        alert('系统出错')
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input {
        width: 100%;
        max-width: 400px;
    }
    .rating-box {
        .title {
            margin-bottom: 16px;
            color: #999;
        }
    }
    .btns {
        margin-top: 16px;
        margin-bottom: 24px;
    }
    .success-box {
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }
</style>
