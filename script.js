const imageInput = document.getElementById('imageInput');
const enhanceButton = document.getElementById('enhanceButton');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const textSizeInput = document.getElementById('textSize');
const textColorInput = document.getElementById('textColor');
const textFontSelect = document.getElementById('textFont');
const generateButton = document.getElementById('generateButton');
const downloadLink = document.getElementById('downloadLink');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let enhancedImage = null; // Здесь будет результат ИИ

// Загрузка изображения
imageInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    img.src = URL.createObjectURL(file);
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        drawImage(img);
    };
});

// Отрисовка изображения на канвасе
function drawImage(image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Улучшение качества через ИИ (заглушка, здесь будет API)
enhanceButton.addEventListener('click', async () => {
    if (!img.src) return alert('Сначала загрузите изображение!');
    enhanceButton.textContent = 'Обработка...';
    enhanceButton.disabled = true;

    // === Здесь нужно подключить реальный ИИ API ===
    // Например, отправить img на OpenAI/Replicate API для улучшения
    // В примере просто используем текущее изображение как "улучшенное"
    await new Promise(r => setTimeout(r, 1500)); // имитация обработки

    enhancedImage = new Image();
    enhancedImage.src = img.src; 
    enhancedImage.onload = () => {
        drawImage(enhancedImage);
        enhanceButton.textContent = 'Улучшить качество (ИИ)';
        enhanceButton.disabled = false;
        alert('Изображение обработано (имитация ИИ)');
    };
});

// Добавление текста
function drawText(image) {
    const textSize = parseInt(textSizeInput.value);
    const color = textColorInput.value;
    const font = textFontSelect.value;

    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = textSize / 15;
    ctx.textAlign = 'center';

    // Текст сверху
    ctx.font = `${textSize}px ${font}`;
    ctx.textBaseline = 'top';
    ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 10);
    ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 10);

    // Текст снизу
    ctx.textBaseline = 'bottom';
    ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);
    ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);
}

// Создание финального мем-изображения
generateButton.addEventListener('click', () => {
    if (!img.src) return alert('Сначала загрузите изображение!');
    drawImage(enhancedImage || img);
    drawText(enhancedImage || img);

    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.style.display = 'inline-block';
});