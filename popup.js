const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
if (!file) return;

    const reader = new FileReader();
reader.readAsDataURL(file);

reader.onload = () => {
    const img = new Image();
img.src = reader.result;

img.onload = () => {
    const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const width = img.width / 2;
            const height = img.height / 2;
let count = 1;

for (let y = 0; y < img.height; y += height) {
    for (let x = 0; x < img.width; x += width) {
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

        const link = document.createElement('a');
        link.download = `${count++}.png`;
        link.href = canvas.toDataURL();
        link.textContent = `下载切割后的图片：${link.download}`;

        const imagePreview = document.createElement('img');
        imagePreview.src = canvas.toDataURL();
        imagePreview.style.maxWidth = '100%';
        imagePreview.style.maxHeight = '100%';

        const div = document.createElement('div');
        div.style.display = 'inline-block';
        div.style.margin = '10px';
        div.appendChild(imagePreview);
        div.appendChild(link);
        preview.appendChild(div);
}
}
};
};
});
