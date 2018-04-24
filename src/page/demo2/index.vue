<template>
    <div class="loanContainer">
        <!-- <break-crumb></break-crumb> -->
        <section class="clear">
            <h4 class="clear">
                <span class="left">
                    <i class="dksqIcon"></i>
                    <span class="dksqTitle">暂存申请列表</span>
                </span>
                <div class="right">
                    <i-button type="primary" icon="plus-circled">新增贷款申请</i-button>
                </div>
            </h4>
            <div class="tableDiv">
                <Table height="420" border :columns="tableHeader" :data="tableData"></Table>
                <div style="margin-top:15px;text-align:right;">
                    <Page :total="page.pageTotal" :current="page.pageNum" :pageSize="page.pageSize" show-sizer show-elevator show-total @on-change="handlePage"></Page>
                </div>
                <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
            </div>
        </section>
    </div>
</template>

<script>
    import breakCrumb from '@/components/header/breakCrumb.vue'
    import { loadData } from '../../service/getData'
    export default {
        components: {
            breakCrumb
        },
        data() {
            return {
                spinShow: true, //加载动画
                page: { //分页参数
                    pageTotal: 12, //分页的总条数
                    pageNum: 1, //分页的当前页
                    pageSize: 10, //分页当前显示条数
                },
                tableData: [], //表格数据 
                tableHeader: [ //表头数据
                    {
                        title: 'Date',
                        key: 'date',
                        sortable: true
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        sortable: true
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
            }
        },
        mounted() {       
            loadData().then((res) => {
                console.log(res)
                this.tableData = res.data.array;
                this.spinShow = false;
            }).catch(err => {
                console.error('aaaaa', err)
            })
            this.$Spin.hide();
        },
        methods: {
            show (index) { //表格按钮
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Age：${this.tableData[index].age}<br>Address：${this.tableData[index].address}`
                })
            },
            remove (index) { //表格删除按钮
                this.tableData.splice(index, 1);
            },
            handlePage(n) { //分页点击切换
                console.log(n);
            }
        },
    }
</script>
 
 <style lang="scss" scoped>
    .loanContainer {
        background: #fff;
        border-radius: 5px;
        padding: 0 20px 20px 20px;
        margin-top: 20px;
        h4 {
            padding: 15px;
            border: 0;
            line-height: 32px;
            span {
                .dksqIcon {
                    width: 5px;
                    height: 17px;
                    background: #3e75e3;
                    float: left;
                    margin-right: 10px;
                    padding: 0;
                    margin-top: 7px;
                }
                .dksqTitle {
                    line-height: 24px;
                    color: #797979;
                    font-weight: 200;
                    font-size: 14px;
                }
            }
        }
        .tableDiv { //表格容器
            border-radius: 5px;
            border: 1px solid #ddd;
            padding: 20px;
        }
    }
 </style>
 