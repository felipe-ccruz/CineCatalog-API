import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT!,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!
  },
  forcePathStyle: true
})

export const storageService = {
  async upload(file: File, key: string): Promise<string> {
    const buffer = await file.arrayBuffer()

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: file.type
    }))

    return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`
  },

  async delete(key: string): Promise<void> {
    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key
    }))
  }
}