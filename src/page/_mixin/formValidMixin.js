export default {
  methods: {
    validForm(name) {
      var self = this
      const promise = new Promise(function (resolve, reject) {
        self.$refs[name].validate(valid => {
          if (valid) {
            resolve(valid)
            // self.$Message.success("提交成功!")
          } else {
            self.$Message.error("表单验证失败!")
          }
        })
      })
      return promise
    }
  }
}