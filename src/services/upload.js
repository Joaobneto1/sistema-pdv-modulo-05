const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_BACKBLAZE)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadImagem = async (path, buffer, mimetype) => {
    try {
        const imagem = await s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: path,
            Body: buffer,
            ContentType: mimetype
        }).promise();

        return {
            path: imagem.Key,
            url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${imagem.Key}`
        };
    } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        throw error;
    }
};

const excluirImagem = async (path) => {
    try {
        await s3.deleteObject({
            Bucket: process.env.BUCKET_NAME,
            Key: path 
        }).promise();
        console.log(`Imagem ${path} excluída com sucesso.`);
    } catch (error) {
        console.error("Erro ao excluir a imagem:", error);
        throw error;
    }
};

module.exports = {
    uploadImagem,
    excluirImagem
}
