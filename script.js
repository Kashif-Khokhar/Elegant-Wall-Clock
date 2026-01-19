const numbersContainer = document.getElementById('numbers-container');

// 1. Create and position numbers 1-12
for (let i = 1; i <= 12; i++) {
    const numberDiv = document.createElement('div');
    numberDiv.className = 'number';
    
    // Rotate the container, then rotate the text back so it stays upright
    const rotation = i * 30;
    numberDiv.style.transform = `rotate(${rotation}deg)`;
    
    numberDiv.innerHTML = `<span style="display:inline-block; transform: rotate(-${rotation}deg)">${i}</span>`;
    
    numbersContainer.appendChild(numberDiv);
}

// 2. Clock Logic
function updateClock() {
    const now = new Date();
    
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

    document.getElementById('second-hand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    document.getElementById('minute-hand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock();