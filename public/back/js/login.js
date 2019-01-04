$(function () {
/*
* 1. 进行表单校验配置
*    校验要求:
*        (1) 用户名不能为空, 长度为2-6位
*        (2) 密码不能为空, 长度为6-12位
* */
    $('#form').bootstrapValidator({

        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
         //配置校验字段 注意(要先给 input 配置 name)
        fields: {
            //校验用户名
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                //长度校验
                stringLength: {
                        min: 2,
                        max: 6,
                    message: '用户名长度为2-6位'
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度为6-12位'
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }

        }
    })

//2.需要用到插件的校验功能 ,所以需要用submit按钮
//需要注册表单校验成功事件,在事件中,阻止表单的默认提交

//注册表单校验成功事件
    $("#form").on("success.form.bv",function (e) {
    
    //阻止默认提交
    e.preventDefault();

    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data:$("#form").serialize(),
        dataType:'json',
        success:function (info) {
            if(info.error === 1000){
                // alert("用户名不存在");
                $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
                return;
            }
            if (info.error === 1001) {
                // alert("密码错误");
                $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                return;
            }
            if (info.success) {
                location.href = "index.html";
                return;
            }
        }
    })
})

//3.重置功能  默认 type="reset" 按钮  只会重置表单内容
    // $('#form').data("bootstrapValidator") 创建插件实例
    //     * resetForm(); 不传参, 只重置校验状态
    //         * resetForm(true); 传true, 内容和状态都重置
    $("[type='reset']").click(function () {
        
        $('#form').data("bootstrapValidator").resetForm();
    })

}) 