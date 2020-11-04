function getWeekDay(date){
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    var day = date.getDay();
    return weekdays[day];
}

function handleError(error) {
    console.error(error)
}

function loadCypher() {
    fetch('assets/cypher.asc').then(response => response.text()).then(decryptCypher);
}

function decryptCypher(cypher) {
    let passInput = document.querySelector('#password-input')
    let decrypted = CryptoJS.AES.decrypt(cypher, passInput.value)
   
    try {
        let output = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))

        data = {
            "bob": [3, 6],
            "bill": [9, 12],
            "marvin": [11, 20],
            "bender": [10, 29],
            "hugh": [1, 15],
            "will": [12, 4],
            "howard": [10, 2]
        }

        cardFormat(data)
    }
    catch(err) {
        console.log(err)
        passError()
        return
    }
}

function cardFormat(text) {
    let dataContainer = document.querySelector('.track-card-container')

    let contentData = Object.entries(text).map(dateTemplate).join('')
    dataContainer.innerHTML = contentData

    cardLoadAnimation()

    let cards = document.querySelectorAll('.track-card')
    cards.forEach(card => {
        card.addEventListener('click', cardAnimation)
    })
}

function passError() {
    var notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
          },
        types: [
            {
                type: 'error',
                background: '#FF738D'
            }
        ]
    });
    // Display an error notification
    notyf.error('Incorrect Password');
}

function passwordInputHandler() {
    let passBtn = document.querySelector('#password-btn')
    let passInput = document.querySelector('#password-input')

    passBtn.addEventListener('click', loadCypher)

    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadCypher()
        }
    })
}

function dateTemplate(person) {
    let template = `
    <div class="track-card">
        <h1 class="date-text">${dateTextFormat(person[1])}</h1>
        <h3 class="name">${person[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
        <h3 class="date">${person[1].map(num => String(num).padStart(2, '0')).join(' / ')}</h3>
    </div>
    `
    return template
}

function dateTextFormat(date) {
    let today = new Date()
    let cur_day = today.getDate()
    let cur_month = today.getMonth() + 1    
    
    let month = date[0]
    let day = date[1]

    if (month < cur_month) {
        month_diff = (12 - cur_month) + month
    } else if (month > cur_month) {
        month_diff = month - cur_month
    } else if (month == cur_month) {
        month_diff = 0
    }


    if (month_diff == 0) {
        if (day < cur_day) {
            return 'In eleven months'
        } 
        else if (day > cur_day) {
            day_diff = day - cur_day
            let new_date = new Date()

            if (day_diff > 21) {
                return "In a month"
            } 
            else if (day_diff > 14) {
                return "In three weeks"
            }
            else if (day_diff > 7) {
                return "In two weeks"
            }
            else if (day_diff == 7) {
                return "In a week"
            }
            else if (day_diff == 6) {
                new_date.setDate(new_date.getDate() + 6)
                return `Next ${getWeekDay(new_date)}`
            }
            else if (day_diff == 5) {
                new_date.setDate(new_date.getDate() + 5)
                return `Next ${getWeekDay(new_date)}`
            }
            else if (day_diff == 4) {
                new_date.setDate(new_date.getDate() + 4)
                return `Next ${getWeekDay(new_date)}`
            }
            else if (day_diff == 3) {
                new_date.setDate(new_date.getDate() + 3)
                return `Next ${getWeekDay(new_date)}`
            }
            else if (day_diff == 2) {
                new_date.setDate(new_date.getDate() + 2)
                return `Next ${getWeekDay(new_date)}`
            }
            else if (day_diff == 1) {
                return "Tomarrow"
            }
        }
        else {
            return "Today"
        }
    }
    else if (month_diff == 1) {
        return "Next month"
    } 
    else if (month_diff == 2) {
        return "In two months"
    }
    else if (month_diff == 3) {
        return "In three months"
    }
    else if (month_diff == 4) {
        return "In four months" 
    }
    else if (month_diff == 5) {
        return "In five months"
    }
    else if (month_diff == 6) {
        return "In six months"
    }
    else if (month_diff == 7) {
        return "In seven months"
    }
    else if (month_diff == 8) {
        return "In eight months"
    }
    else if (month_diff == 9) {
        return "In nine months"
    }
    else if (month_diff == 10) {
        return "In ten months"
    }
    else if (month_diff == 11) {
        return "In eleven months"
    } 
    else if (month_diff == 12) {
        return "In a year"
    }
}




function loadAnimation() {
    anime.timeline({ 
        easing: 'linear',
        direction: 'normal',
    })
    .add({
        targets: ".lock-card",
        easing: "easeOutQuad",
        duration: "900",
        translateY: [+20, 0],
        opacity: [0, 1]
    }, 500)
    .add({
        targets: "header h1",
        easing: "easeOutQuad",
        duration: '700',
        opacity: [0, 1],
        scale: [0.9, 1],
    }, '-=500')
}

function cardLoadAnimation() {
    anime.timeline({ 
        easing: 'linear',
        direction: 'normal',
    })
    .add({
        targets: "header h1",
        easing: "easeInQuad",
        duration: 250,
        translateY: [0, 40],
        opacity: [1, 0]
    })
    .add({
        targets: ".lock-card",
        easing: "easeInQuad",
        duration: 300,
        scale: [1, 0.9],
        opacity: [1, 0],
        endDelay: 400,
        complete: () => {
            document.body.classList.remove('lock')
            document.body.classList.add('home')
        }
    }, '-=50')
    .add({
        targets: "header h1",
        easing: "easeOutQuad",
        duration: 1000,
        translateY: [0, 0],
        opacity: [0, 1]
    })
    .add({
        targets: ".track-card",
        easing: "easeOutQuad",
        duration: 800,
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(200)
    }, '-=800')
}

function cardAnimation(e) {
}


loadAnimation()
passwordInputHandler()




// function encrypt(data, pass) {
//     let dataString = JSON.stringify(data)
//     let encrypted = CryptoJS.AES.encrypt(dataString, pass).toString()
//     return encrypted
// }

// let data = ''
// let pass = ''

// let cypherText = encrypt(data, pass)
// console.log(cypherText)
