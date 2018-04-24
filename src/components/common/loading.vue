<template>
    <div class="loadingContainer">
        <row class="rowBox">
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </Col>
        </row>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .loadingContainer {
        .rowBox {
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            .demo-spin-icon-load{
                animation: ani-demo-spin 1s linear infinite;
            }
            @keyframes ani-demo-spin {
                from { transform: rotate(0deg);}
                50%  { transform: rotate(180deg);}
                to   { transform: rotate(360deg);}
            }
            .demo-spin-col{
                height: 100%;
                width:100%;
                position: relative;
                border: 1px solid #eee;
            }
        }
    }
</style>


