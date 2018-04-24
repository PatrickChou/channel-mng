<template>
    <div class="indexContainer">
        <div class="indexTop">
            <p>当月业绩({{dateVal}})</p>
        </div>
        <row class="headData">
            <i-col span="8">
                <span>本月进件数: <i style="color:#3b77e3;"> {{headData.monthSize}}</i></span>
            </i-col>
            <i-col span="8">
                <span>本月放款数: <i style="color:#3b77e3;"> {{headData.monthNum}}</i></span>
            </i-col>
            <i-col span="8">
                <span>本月放款金额: <i style="color:#f5b85e;"> {{headData.monthMoney}}</i>元</span>
            </i-col>
        </row>
        <i-form :model="searchData" label-position="right" :label-width="60">
            <!-- 第一列数据 -->
            <row class="middleData">    
                <i-col span="8">
                    <div class="centerDiv">
                        <div class="left" style="width:84%;">
                            <FormItem label="机构名称">
                                <Input v-model="searchData.mechanism" placeholder="请输入机构名称"></Input>
                            </FormItem>
                        </div>
                        <div class="left" style="width:15%;margin-left:1%;padding-top:1px;">
                            <i-button @click="mechanismSearch(searchData)" type="success">查询</i-button>
                        </div>
                    </div>
                </i-col>
                <i-col span="8">
                    <div class="centerDiv">
                        <FormItem label="贷款产品">
                            <Select v-model="searchData.LoanProducts">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </div>
                </i-col>
                <i-col span="8">
                    <div class="centerDiv">
                        <FormItem label="状态">
                            <Select v-model="searchData.state">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </div>
                </i-col>
            </row> 
            <!-- 第二列数据 -->
            <row class="middleData">
                <i-col span="8">
                    <div class="centerDiv">
                        <FormItem label="客户名称">
                            <Input v-model="searchData.customerName" placeholder="请输入客户名称"></Input>
                        </FormItem>
                    </div>
                </i-col>
                <i-col span="8">
                    <div class="centerDiv">
                        <FormItem label="进件时间">
                            <DatePicker type="daterange" placeholder="请选择" split-panels v-model="searchData.time"></DatePicker>
                        </FormItem>
                    </div>
                </i-col>
            </row>
            <!-- 按钮列 -->
            <row class="middleData">
                <i-col span="24">
                    <div style="width:30%;margin:0 auto;text-align:center;">
                        <i-button style="margin-right:20px;" @click="searchClick(searchData)" size="large" type="success">查询</i-button>
                        <i-button type="success" icon="ios-download-outline" size="large" @click="exportData">导出报表</i-button>
                    </div>
                </i-col>
            </row>
        </i-form>
        <section>
            <div class="tableDiv">
                <Table height="280" border :columns="tableHeader" :data="tableData" ref="table"></Table>
                <div style="margin-top:10px;text-align:right;">
                    <Page :total="page.pageTotal" :current="page.pageNum" :pageSize="page.pageSize" show-sizer show-elevator show-total @on-change="handlePage"></Page>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { loadData } from '../../service/getData'
    export default {
        data() {
            return {
                dateVal:"2018/04",
                page: { //分页参数
                    pageTotal: 12, //分页的总条数
                    pageNum: 1, //分页的当前页
                    pageSize: 10, //分页当前显示条数
                },
                headData: { //本月数据
                    monthSize: 0, //本月进件数
                    monthNum: 0, //本月放款数
                    monthMoney: 0 //本月放款金额
                },
                searchData: { //进件查询数据
                    mechanism: '', //机构名称
                    LoanProducts: '', //贷款产品
                    state: '', //状态
                    customerName: '', //客户名称
                    time: '', //进件时间
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
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', 'Loading')
                    ])
                }
            });
            loadData().then((res) => {
                console.log(res)
                this.tableData = res.data.array;
                this.spinShow = false;
                this.$Spin.hide();
            }).catch(err => {
                console.error('aaaaa', err)
                this.$Spin.hide();
            })
        },
        methods: {
            mechanismSearch(n) { //机构查询
                console.log(n.mechanism);
            },
            searchClick(n) { //表格查询
                console.log(n)
            },
            show (index) { //表格按钮
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData[index].name}<br>Age：${this.tableData[index].age}<br>Address：${this.tableData[index].address}`
                })
            },
            remove (index) { //表格删除按钮
                this.tableData.splice(index, 1);
            },
            exportData() { //表格导出数据
                this.$refs.table.exportCsv({
                    filename: '数据文件',
                    original: false
                });
            },
            handlePage(n) { //分页点击切换
                console.log(n);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .indexContainer {
        .indexTop {
            height: 40px;
            line-height: 40px;
            p {
                font-size: 14px;
                color: #333;
            }
        }
        .headData {
            text-align: center;
            margin-bottom: 20px;
            span {
                font-size: 14px;
                i {
                    font-size: 24px;
                }
            }
        }
        .middleData {
            .centerDiv {
                width: 80%;
                margin: 0 auto;
                .ivu-date-picker {
                    width: 100%;
                }
            }
        }
        section {
            margin-top: 30px;
            background: #fff;
            border-radius: 5px;
            border: 1px solid #ddd;
            .tableDiv { //表格容器
                padding: 20px;
                min-height: 200px;
            }
        }
    }
</style>


