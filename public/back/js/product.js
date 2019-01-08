$(function () {


    var currentPage = 1;
    var pageSize = 2;
    //1.一进入页面,渲染第一页
    render();

    function render() {

        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {

                console.log(info);
                var htmlStr = template("productTpl", info);
                $('tbody').html(htmlStr);

                //根据后台返回的数据,进行分页初始化
                $("#paginator").bootstrapPaginator({

                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填

                    currentPage: info.page,//当前页

                    totalPages: Math.ceil(info.total / info.size),//总页数

                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                        
                    }
                });
            }
        })
    }

    //2.点击添加按钮,显示添加模态框

    $("#addBtn").click(function () {
        $("#addModal").modal("show");

        //发生ajax请求,获取二级分类的全部数据,进行下拉菜单的渲染

        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function (info) {
                console.log( info );
                var htmlStr = template("dropdownTpl",info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    //3.给下拉菜单的所有a,添加点击事件(事件委托
    //1.获取文本,设置给按钮
    //2.获取id,设置给隐藏域,用于提交
    $(".dropdown-menu").on
})