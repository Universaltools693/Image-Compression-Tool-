document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const qualityInput = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const compressBtn = document.getElementById('compressBtn');
    const output = document.getElementById('output');
    const adPopUp = document.getElementById('adPopUp');

    // Update compression quality display
    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = qualityInput.value;
    });

    // Simulate Pop-up Ad on Page Load
    setTimeout(() => {
        adPopUp.style.display = 'block';
        setTimeout(() => {
            adPopUp.style.display = 'none';
        }, 3000); // Hide after 3 seconds
    }, 1000); // Show after 1 second

    // Image Compression Logic
    compressBtn.addEventListener('click', () => {
        const file = imageInput.files[0];
        if (!file) {
            output.innerHTML = '<p style="color: red;">Please select an image!</p>';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Compress image
                const quality = qualityInput.value / 100;
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

                // Display and download compressed image
                const link = document.createElement('a');
                link.href = compressedDataUrl;
                link.download = 'compressed_image.jpg';
                link.textContent = 'Download Compressed Image';
                link.style.display = 'block';
                link.style.marginTop = '10px';
                link.style.color = '#2a5298';
                link.style.textDecoration = 'none';

                output.innerHTML = `
                    <p>Image compressed successfully!</p>
                    <img src="${compressedDataUrl}" alt="Compressed Image" style="max-width: 100%; margin-top: 10px;">
                `;
                output.appendChild(link);
            };
        };
        reader.readAsDataURL(file);
    });

    // Simulate Ad Triggers on Scroll
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage >= 70) {
            console.log('Trigger interstitial or banner ads here');
            // Add ad network trigger code here
        }
    });
});
