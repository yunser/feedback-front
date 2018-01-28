<template>
    <my-page :title="title">
        <p>反馈功能暂未完善，麻烦联系 QQ 1418503647 或 邮箱 1418503647@qq.com 进行反馈。</p>
        <div class="form-item">
            <ui-text-field class="input" hintText="请用一句话描述您的问题" />
        </div>
        <div class="form-item">
            <ui-text-field class="input" hintText="在（）的情况下，（）网站出现了（）的异常" multiLine :rows="4"/>
        </div>
        <!--<button>添加图片</button>-->
        <!--<input type="checkbox"> 上传问题日志-->
        <ui-raised-button label="提交" primary />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                title: '反馈'
            }
        },
        mounted() {
            let name = this.$route.query.name
            if (name) {
                this.title = name + '反馈'
            }
        }
    }
</script>

<style scoped>
    .input {
        width: 320px;
    }
</style>
