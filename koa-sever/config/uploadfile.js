const multer = require('@koa/multer');
//处理form-data格式的文件上传的中间件

const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{ //设置文件存储路径
         console.log(file);
        //校验文件类型
        const fileType=["image/png","image/jpeg","image/webp"  ]//允许的文件类型
        if(!fileType.includes(file.mimetype)){
            //如果文件类型不在允许的文件类型中
            return new Error("文件类型不允许")
            
        }
        cb(null, 'image_file/'); //存储路径
    },
    filename: function (req, file, cb) { 
        const filename=file.originalname.split(".")//设置文件名
        // console.log(filename);
        const newFileName=Date.now()+"."+filename[1]
        // console.log(newFileName);
        cb(null, newFileName); //存储文件名
    }
});
const uploadFile = multer({storage }); //创建上传对象
module.exports = uploadFile;