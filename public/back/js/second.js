

$(function () {
    
    
    var currentPage = 1;
    var pageSize = 5;
    //1.一进入页面,渲染第一页
    render();

    function render() {
        
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:'json',
            success:function (info) {
                
                console.log( info );
                var htmlStr = template("secondTpl",info);
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

    //2.点击添加按钮,显示模态框
    $("#addBtn").click(function () {
        $("#addModal").modal("show");

        //显示模态框,立刻发生请求 获取所有一级分类,渲染下拉框
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            dataType:'json',
            success:function (info) {
                console.log( info );
                var htmlStr = template("dropdownTpl",info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    })

    //3.给所有的下拉菜单的a 添加点击事件(通过事件委托)
    $('.dropdown-menu').on("click","a",function () {
        
        var txt = $(this).text();

        $("#dropdownText").text(txt);

        var id = $(this).data("id");
        //设置给隐藏域
        $('[name="categoryId"]').val(id);

        //手动重置隐藏域校验状态
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");

    });

    $('#fileupload').fileupload({
    dataType: "json",
    // 文件上传完成的回调函数
    done: function( e, data ) {
      console.log( data );
      var picUrl = data.result.picAddr; // 获取地址
      $('#imgBox img').attr("src", picUrl);

      // 将地址赋值给隐藏域, 专门用于提交
      $('[name="brandLogo"]').val( picUrl );

      // 给隐藏域赋值完成, 将校验状态改成成功
      $('#form').data("bootstrapValidator").updateStatus( "brandLogo", "VALID" );
    }
  });


    //5.添加表单校验
    $("#form").bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
          //配置指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级分类'
                    },
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类'
                    },
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传图片'
                    },
                }
            },
        }

    });

    //6.注册表单校验成功事件,阻止默认的表单提交,通过Ajax提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$("#form").serialize(),
            dataType:'json',
            success:function (info) {
                
                if (info.success) {
                    //关闭模态框
                    $("#addModal").modal("hide");

                    //重新渲染第一页
                    currentPage = 1;
                    render();

                    //重置内容和状态
                    $("#form").data("bootstrapValidator").resetForm(true);

                    //单独重置下拉菜单和图片的内容和状态
                    $("#dropdownText").text("请选择一级分类");
                    $("#imgBox img").attr("src","./images/none.png");
                }
            }

        })
    })
})