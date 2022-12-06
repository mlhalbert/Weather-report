fetch('https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={1}&appid={8859b624b8b26404078207d2567fe1d2}'
,)

//set this up dumbiehttps://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={8859b624b8b26404078207d2567fe1d2
window.localStorage.setItem('name', 'Obaseki Nosa');

window.onload = () => {
 
    const target = document.getElementById('forecast');
    const aeris = new AerisWeather('CLIENT_ID', 'CLIENT_SECRET');

    const request = aeris.api().endpoint('forecasts').place('minneapolis,mn').limit(5);
    request.get().then((result) => {
        const data = result.data;
        const { periods } = data[0];
        if (periods) {
            periods.reverse().forEach(period => {
                const date = new Date(period.dateTimeISO);
                const icon = `https://cdn.aerisapi.com/wxblox/icons/${period.icon || 'na.png'}`;
                const maxTempF = period.maxTempF || 'N/A';
                const minTempF = period.minTempF || 'N/A';
                const weather = period.weatherPrimary || 'N/A';

                const html = (`
                    <div class="card">
                        <div class="card-body">
                            <p class="title">${aeris.utils.dates.format(date, 'eeee')}</p>
                            <p><img class="icon" src="${icon}"></p>
                            <p class="wx">${weather}</p>
                            <p class="temps"><span>High:</span>${maxTempF} <span>Low:</span>${minTempF}</p>
                        </div>
                    </div>
                `);

                target.insertAdjacentHTML('afterbegin', html);
            });
        }
    }); 
}
