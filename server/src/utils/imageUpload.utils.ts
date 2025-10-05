import cloudinary from "../configs/cloudinary.config"



export const uploadImage = (file :Express.Multer.File):Promise<string> =>{

    return new Promise((resolve, reject)=>{
        const stream =  cloudinary.uploader.upload_stream(
            {folder:"Project-Management"},
            (error, result)=>{
                if(error) return reject(error);
                resolve(result?.secure_url || "")
            }
        )

        stream.end(file.buffer)
    })
}