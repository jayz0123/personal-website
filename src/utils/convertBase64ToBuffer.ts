export default function convertBase64ToBuffer(content: string): Buffer {
  return Buffer.from(content.split(',')[1], 'base64');
}
