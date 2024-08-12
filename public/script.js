document.getElementById('convertButton').addEventListener('click', () => {
    const imageInput = document.getElementById('imageInput').files[0];
    const format = document.getElementById('formatSelect').value;

    if (!imageInput) {
        alert('Please select an image.');
        return;
    }

    const formData = new FormData();
    formData.append('image', imageInput);
    formData.append('format', format);

    fetch('/convert', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = url;
        downloadLink.download = `converted_image.${format}`;
        downloadLink.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
});
