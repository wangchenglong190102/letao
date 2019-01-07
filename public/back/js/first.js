

$(function () {
    // 1. 一进入发送ajax, 进行渲染
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("firstTpl", info);
                $('tbody').html(htmlStr);

                // 分页初始化
                $("#paginator").bootstrapPaginator({

                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    
                    currentPage: info.page,//当前页

                    totalPages: Math.ceil(info.total / info.size),//总页数

                    onPageClicked: function (a,b,c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }
        })  
    }

    //2.点击添加按钮,显示模态框

    $("#addBtn").click(function () {

        $("#addModal").modal("show");
    });

    //3.进行校验配置
    //使用表单校验插件
    $("#form").bootstrapValidator({
        
            //1. 配置图标
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //2. 指定校验字段
            fields: {
                //校验用户名，对应name表单的name属性
                categoryName: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请输入一级分类名称'
                        },
                        
                    }
                },
            }

        });

    //4.注册表单校验成功事件,阻止默认提交,使用Ajax提交
    $("#form").on('success.form.bv', function (e) {

        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$("#form").serialize(),
            dataType:'json',
            success:function (info) {
                console.log( info );

                if (info.success) {
                    
                    $("#addModal").modal("hide");

                    currentPage = 1;
                    render();

                    $("#form").data('bootstrapValidator').resetForm(true);
                }
            }
        })
    });
})