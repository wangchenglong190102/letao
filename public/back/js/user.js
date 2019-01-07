


$(function () {
    var currentId;
    var isDelete;

    // 1. 一进入页面, 发送 ajax 请求, 获取数据, 进行模板引擎渲染
    var currentPage = 1;
    var pageSize = 5;
    render();

   function render() {
       $.ajax({
           type: 'get',
           url: '/user/queryUser',
           data: {
               page: currentPage,
               pageSize: pageSize
           },
           dataType: "json",
           
           success: function (info) {
               console.log(info);

               var htmlStr = template("tpl", info);

               $('tbody').html(htmlStr);

                // 分页初始化
               $("#pagintor").bootstrapPaginator({

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


    // 2. 按钮事件, 通过事件委托绑定

    $('tbody').on("click",".btn",function () {
        
        $("#userModal").modal("show");
        //获取当前用户id
        currentId = $(this).parent().data("id");

        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

    });

    //3.点击模态框确认按钮,发生请求,修改用户状态
    $("#submitBtn").click(function () {
        
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id: currentId,
                isDelete: isDelete
            },
            dataType:"json",
            success:function (info) {
                console.log( info );

                if(info.success){
                    //关闭模态框
                    $("#userModal").modal("hide");

                    //重新渲染
                    render();
                }
            }
        })
    })
})