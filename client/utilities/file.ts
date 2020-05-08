import FileSaver from 'file-saver';

export async function readFileAsync(file: Blob): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function saveFile(filename: string, data: string) {
  const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, filename);
}
