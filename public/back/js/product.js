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
    })
})